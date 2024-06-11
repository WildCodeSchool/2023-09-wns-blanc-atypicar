import { Between, DeleteResult, MoreThanOrEqual } from "typeorm";
import { Journey } from "../entities/journey";
import { CreateJourneyInputType } from "../types/CreateJourneyInputType";
import { UpdateJourneyInputType } from "../types/UpdateJourneyInputType";

export async function searchJourney(
  start: string,
  arrival: string,
  date: Date,
  seats: number
): Promise<Journey[] | Error> {
  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);

  const searchFilter: any = {
    relations: { reservation: true, driver: true },
    where: {
      ...(start && { startingPoint: start }),
      ...(arrival && { arrivalPoint: arrival }),
      ...(date && {
        startDate: Between(date, endDate),
      }),
      ...(seats && { availableSeats: MoreThanOrEqual(seats) }),
    },
    order: { startDate: "DESC" },
  };

  const journeys = await Journey.find(searchFilter);

  if (!journeys || journeys.length === 0) {
    throw new Error("Aucun voyage trouvé.");
  }

  return journeys;
}

export function searchJourneysByDriver(driverId: number): Promise<Journey[]> {
  try {
    return Journey.find({
      relations: ["driver"],
      where: { driver: { id: driverId } },
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

export function findJourney(id: number): Promise<Journey | null> {
  return Journey.findOne({
    relations: {
      driver: true,
      reservation: true,
    },
    where: { id },
  });
}

export async function addJourney(
  journeyData: CreateJourneyInputType,
  ctx: any
): Promise<Journey | Error> {
  try {
    if (journeyData.endDate < journeyData.startDate) {
      throw new Error(
        "La date d'arrivée ne peut pas être inférieur à la date de départ"
      );
    }

    let journey = new Journey();
    Object.assign(journey, journeyData);
    journey.driver = ctx.user.id;

    return journey.save();
  } catch (error) {
    return new Error();
  }
}

export async function updateJourney(
  id: number,
  journeyData: UpdateJourneyInputType
): Promise<Journey> {
  if (!journeyData) {
    throw new Error("Les données de mise à jour ne peuvent pas être vides.");
  }

  if (journeyData.endDate < journeyData.startDate) {
    throw new Error("La date de fin ne peut pas être antérieure à la date de début.");
  }

  if (journeyData.availableSeats < 1) {
    throw new Error("Le nombre de places disponibles doit être supérieur ou égal à 1.");
  }

  const journeyToUpdate = await findJourney(id);

  if (!journeyToUpdate) {
    throw new Error("Voyage non trouvé.");
  }

  journeyToUpdate.startingPoint = journeyData.startingPoint;
  journeyToUpdate.arrivalPoint = journeyData.arrivalPoint;
  journeyToUpdate.description = journeyData.description;
  journeyToUpdate.startDate = journeyData.startDate;
  journeyToUpdate.endDate = journeyData.endDate;
  journeyToUpdate.availableSeats = journeyData.availableSeats;
  journeyToUpdate.price = journeyData.price;

  try {
    const updatedJourney = await journeyToUpdate.save();
    return updatedJourney;
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour du voyage.');
  }
}

export function deleteJourney(id: number): Promise<DeleteResult> {
  return Journey.delete({ id });
}
