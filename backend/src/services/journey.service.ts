import { Journey } from "../entities/journey";
import { CreateJourneyInputType } from "../types/CreateJourneyInputType";

export async function searchJourney():Promise<Journey[]> {
  return Journey.find();
}

export async function addJourney(JourneyData: CreateJourneyInputType):Promise<Journey | Error> {
  try {
    let journey = new Journey();
    Object.assign(journey, JourneyData);
  
    return journey.save();
  } catch (error) {
    return new Error();
  }
}