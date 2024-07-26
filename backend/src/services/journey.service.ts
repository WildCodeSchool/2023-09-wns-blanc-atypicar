import { Between, DeleteResult, FindManyOptions, FindOperator, In, MoreThanOrEqual } from "typeorm";
import { Journey } from "../entities/journey";
import { CreateJourneyInputType } from "../types/CreateJourneyInputType";
import { UpdateJourneyInputType } from "../types/UpdateJourneyInputType";
import { User } from "../entities/user";
import * as cacheService from "./cache.service";
import { createHash } from 'crypto';

interface SearchFilter {
  relations: {
    reservation: boolean;
    driver: boolean;
  };
  where: {
    startingPoint?: string;
    arrivalPoint?: string;
    startDate?: FindOperator<Date>;
    availableSeats?: FindOperator<number>;
    driver?: {
      id: FindOperator<number>;}
  };
  order: {
    startDate: 'DESC';
  };
}

export async function searchJourney(
  start: string,
  arrival: string,
  date: Date,
  seats: number,
  categoryIds?: number[]
): Promise<Journey[] | Error> {
  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);

  const searchFilter: SearchFilter = {
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

  if (categoryIds && categoryIds.length > 0) {
    const usersWithCategory = await User.find({
      relations: ["vehicle", "vehicle.category"],
      where: {
        vehicle: {
          category: {
            id: In(categoryIds),
          },
        },
      },
    });

    const userIds = usersWithCategory.map((user) => user.id);

    if (userIds.length > 0) {
      searchFilter.where.driver = {
        id: In(userIds),
      };
    } else {
      return [];
    }
  }
  const searchFilterKey = hashString(JSON.stringify(searchFilter));

  const cacheResult = await cacheService.getValue(searchFilterKey);

  console.log(`🔥🔥🔥🔥🔥 ${cacheResult}`);

  if (cacheResult){
    return JSON.parse(cacheResult);
  } else {
    const result = await Journey.find(searchFilter as FindManyOptions<Journey>);
    await cacheService.setValue(hashString(JSON.stringify(result)), result)
    return result;
  }
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

const hashString = (input: string) => createHash('sha256').update(input).digest('hex');