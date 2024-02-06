import { Arg, Mutation, Query, Resolver } from "type-graphql";
import * as journeyService from "../services/journey.service";
import { Journey } from "../entities/journey";
import { CreateJourneyInputType } from "../types/CreateJourneyInputType";
import { UpdateJourneyInputType } from "../types/UpdateJourneyInputType";

@Resolver(Journey)
export class JourneyResolver {
  @Query(() => [Journey])
  getJourneys(): Promise<Journey[]> {
    return journeyService.searchJourney();
  }

  @Query(() => Journey)
  findJourney(@Arg("id") id: number): Promise<Journey | null> {
    return journeyService.findJourney(id);
  }

  @Mutation(() => Journey)
  createJourney(
    @Arg("JourneyData") JourneyData: CreateJourneyInputType
  ): Promise<Journey | Error> {
    return journeyService.addJourney({ ...JourneyData });
  }

  @Mutation(() => Journey)
  updateJourney(
    @Arg("JourneyData") JourneyData: UpdateJourneyInputType
  ): Promise<Journey | Error> {
    return journeyService.updateJourney(JourneyData.id, { ...JourneyData });
  }

  @Mutation(() => String)
  async deleteJourney(@Arg("id") id: number): Promise<string> {
    const result = await journeyService.deleteJourney(id);
    if (result.affected === 0) {
      return "No journey found";
    }
    return "OK";
  }
}
