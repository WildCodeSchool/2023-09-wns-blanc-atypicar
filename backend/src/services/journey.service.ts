import { DeleteResult } from "typeorm";
import { Journey } from "../entities/journey";
import { CreateJourneyInputType } from "../types/CreateJourneyInputType";
import { UpdateJourneyInputType } from "../types/UpdateJourneyInputType";

export async function searchJourney(): Promise<Journey[]> {
  return Journey.find();
}

export function findJourney(id: number): Promise<Journey | null> {
  return Journey.findOne({
    where: { id },
  });
}

export async function addJourney(
  JourneyData: CreateJourneyInputType
): Promise<Journey | Error> {
  try {
    let journey = new Journey();
    Object.assign(journey, JourneyData);

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
