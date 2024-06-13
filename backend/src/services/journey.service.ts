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
    return [];
  }

  return journeys;
}

export function searchJourneysByDriver(driverId: number): Promise<Journey[]> {
  try {
    return Journey.find({
      relations: ["driver", "driver.vehicle", "driver.vehicle.category"],
      where: { driver: { id: driverId } },
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

export function findJourney(id: number): Promise<Journey | null> {
  return Journey.findOne({
    relations: [
      "driver",
      "reservation",
      "reservation.passenger",
      "driver.vehicle",
      "driver.vehicle.category",
    ],
    where: { id },
  });
}

export async function addJourney(
  JourneyData: CreateJourneyInputType,
  ctx: any
): Promise<Journey | Error> {
  try {
    if (JourneyData.endDate < JourneyData.startDate) {
      throw new Error(
        "La date d'arrivée ne peut pas être inférieur à la date de départ"
      );
    }

    let journey = new Journey();
    Object.assign(journey, JourneyData);
    journey.driver = ctx.user.id;

    return journey.save();
  } catch (error) {
    return new Error();
  }
}

export async function updateJourney(
  id: number,
  JourneyData: UpdateJourneyInputType
): Promise<Journey | Error> {
  const journeyToUpdate = await findJourney(id);

  if (!journeyToUpdate) {
    throw new Error("Journey not found");
  }

  journeyToUpdate.startingPoint = JourneyData.startingPoint;
  journeyToUpdate.arrivalPoint = JourneyData.arrivalPoint;
  journeyToUpdate.description = JourneyData.description;
  journeyToUpdate.startDate = JourneyData.startDate;
  journeyToUpdate.endDate = JourneyData.endDate;
  journeyToUpdate.availableSeats = JourneyData.availableSeats;
  journeyToUpdate.price = JourneyData.price;

  return journeyToUpdate.save();
}

export function deleteJourney(id: number): Promise<DeleteResult> {
  return Journey.delete({ id });
}
