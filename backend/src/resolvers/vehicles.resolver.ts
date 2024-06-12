import { Context } from 'apollo-server-core';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Vehicle } from "../entities/vehicles";
import * as VehicleService from "../services/vehicles.service";
import { CreateVehicleInputType } from "../types/CreateVehicleInputType";
import { DeleteResult } from "typeorm";

@Resolver(Vehicle)
export class VehicleResolver {
    @Query(() => [Vehicle])
    async getVehicles(): Promise<Vehicle[]> {
        return VehicleService.getAllVehicles();
    }

    @Query(() => Vehicle)
    async getVehicleById(@Arg("id") id: number): Promise<Vehicle | null> {
        return VehicleService.findVehicleById(id);
    }

    @Mutation(() => Vehicle)
    @Authorized()
    async createVehicle(
        @Arg("vehicleData") vehicleData: CreateVehicleInputType,
        @Ctx() ctx: Context
    ): Promise<Vehicle | Error> {
        return VehicleService.createVehicle(vehicleData, ctx);
    }

    @Mutation(() => Vehicle)
    async updateVehicle(
        @Arg("id") id: number,
        @Arg("vehicleData") vehicleData: CreateVehicleInputType
    ): Promise<Vehicle | Error> {
        return VehicleService.updateVehicle(id, vehicleData);
    }

    @Mutation(() => String)
    async deleteVehicle(@Arg("id") id: number): Promise<DeleteResult | String> {
        return VehicleService.deleteVehicle(id);
    }
}