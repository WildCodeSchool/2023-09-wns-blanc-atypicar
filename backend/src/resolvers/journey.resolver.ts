import { Arg, Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import * as journeyService from '../services/journey.service'
import { Context } from "apollo-server-core";
import { User } from "../entities/user";
import { Journey } from "../entities/journey";
import { CreateJourneyInputType } from "../types/CreateJourneyInputType";

@Resolver(Journey)
export class JourneyResolver {

  @Query(() => [Journey])
  getJourneys(): Promise<Journey[]> {
    return journeyService.searchJourney();
  }
  
  @Mutation(() => Journey)
  createJourney(
    @Arg("JourneyData") JourneyData: CreateJourneyInputType
  ): Promise<Journey | Error> {
    return journeyService.addJourney({...JourneyData});
  }
}