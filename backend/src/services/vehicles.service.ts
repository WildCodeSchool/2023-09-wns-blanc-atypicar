import { DeleteResult } from "typeorm";
import { Vehicle } from "../entities/vehicles";
import { CreateVehicleInputType } from "../types/CreateVehicleInputType";

export async function getAllVehicles(): Promise<Vehicle[]> {
    return Vehicle.find();
}

export async function findVehicleById(id: number): Promise<Vehicle | null> {
    return Vehicle.findOne({ where: { id } });
}

export async function createVehicle(vehicleData: CreateVehicleInputType, ctx: any): Promise<Vehicle | Error> {
    try {
        const vehicle = Vehicle.create(vehicleData);
        vehicle.user = ctx.user.id;
        await vehicle.save();
        return vehicle;
    } catch (error: any) {
        return new Error(error.message);
    }
}

export async function updateVehicle(id: number, vehicleData: CreateVehicleInputType): Promise<Vehicle | Error> {
    try {
        const vehicleToUpdate = await Vehicle.findOne({ where: { id } });
        if (!vehicleToUpdate) {
            throw new Error("Vehicle not found");
        }
        Object.assign(vehicleToUpdate, vehicleData);
        await vehicleToUpdate.save();
        return vehicleToUpdate;
    } catch (error: any) {
        return new Error(error.message);
    }
}

export async function deleteVehicle(id: number): Promise<DeleteResult | string> {
    const vehicle = await Vehicle.findOne({ where: { id } });
    if (!vehicle) {
        return "Aucun véhicule trouvé";
    }
    await Vehicle.delete(id);
    return "Le véhicule a bien été supprimé";
}