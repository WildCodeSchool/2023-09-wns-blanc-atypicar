import { get } from 'http';
import { DeleteResult } from "typeorm";
import { Vehicle } from "../entities/vehicle";
import { CreateVehicleInputType } from "../types/CreateVehicleInputType";
import { Category } from "../entities/category";
import { User } from "../entities/user";

export async function getAllVehicles(): Promise<Vehicle[]> {
    return Vehicle.find();
}

export async function findVehicleById(id: number): Promise<Vehicle | null> {
    return Vehicle.findOne(
        { where: { id }, relations: ['category'] }
    );
}

export async function createVehicle(vehicleData: CreateVehicleInputType, ctx: any): Promise<Vehicle | Error> {
    try {
        const vehicle = Vehicle.create(vehicleData);
        const user = await User.findOne({ where: { id: ctx.user.id } });
        if (!user) {
            throw new Error("User not found");
        }
        vehicle.user = user;

        if (vehicleData.categoryIds && vehicleData.categoryIds.length > 0) {
            let category = await Category.findOne({ where: { id: vehicleData.categoryIds[0] } });
            if (!category) {
                throw new Error("Category not found");
            }
            vehicle.category = category;
        }

        await vehicle.save();
        return vehicle;
    } catch (error: any) {
        return new Error(error.message);
    }
}

export async function updateVehicle(id: number, vehicleData: CreateVehicleInputType): Promise<Vehicle | Error> {
    try {
        let vehicleToUpdate = await Vehicle.findOne({ where: { id } });
        if (!vehicleToUpdate) {
            throw new Error("Vehicle not found");
        }
        Object.assign(vehicleToUpdate, vehicleData);
        if (vehicleData.categoryIds && vehicleData.categoryIds.length > 0) {
            let category = await Category.findOne({ where: { id: vehicleData.categoryIds[0] } });
            if (!category) {
                throw new Error("Category not found");
            }
            vehicleToUpdate.category = category;
        }
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

export async function getVehiclesByUserId(userId: number): Promise<Vehicle | null> {
    return Vehicle.findOne({ where: { user: { id: userId } }, relations: ['user'] });
}