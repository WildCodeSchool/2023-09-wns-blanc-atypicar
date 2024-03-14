import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import * as journeyService from "../services/journey.service";
import { Journey } from "../entities/journey";
import { CreateJourneyInputType } from "../types/CreateJourneyInputType";
import { UpdateJourneyInputType } from "../types/UpdateJourneyInputType";
import { Context } from "apollo-server-core";
import { User } from "../entities/user";

@Resolver(Journey)
export class JourneyResolver {
  @Query(() => [Journey])
  getJourneys(
    @Arg("start", { nullable: true }) start: string,
    @Arg("arrival", { nullable: true }) arrival: string,
    @Arg("date", { nullable: true }) date: Date,
    @Arg("seats", { nullable: true }) seats: number
  ): Promise<Journey[] | Error> {
    return journeyService.searchJourney(start, arrival, date, seats);
  }

  @Query(() => Journey)
  findJourney(@Arg("id") id: number): Promise<Journey | null> {
    return journeyService.findJourney(id);
  }

  @Query(() => [Journey])
  findJourneysByDriver(@Arg("driver") driver: User): Promise<Journey[]> {
    return journeyService.searchJourneysByDriver(driver);
  }

  @Mutation(() => Journey)
  // @Authorized()
  createJourney(
    @Arg("JourneyData") JourneyData: CreateJourneyInputType,
    @Ctx() ctx: Context
  ): Promise<Journey | Error> {
    return journeyService.addJourney({ ...JourneyData }, ctx);
  }

  @Mutation(() => Journey)
  // @Authorized()
  updateJourney(
    @Arg("JourneyData") JourneyData: UpdateJourneyInputType,
    @Ctx() ctx: Context
  ): Promise<Journey | Error> {
    return journeyService.updateJourney(JourneyData.id, { ...JourneyData });
  }

  @Mutation(() => String)
  // @Authorized()
  async deleteJourney(
    @Arg("id") id: number,
    @Ctx() ctx: Context
  ): Promise<string> {
    const result = await journeyService.deleteJourney(id);
    if (result.affected === 0) {
      return "No journey found";
    }
    return "OK";
  }
}
