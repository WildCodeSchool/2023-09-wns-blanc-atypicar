import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Reservation } from "../entities/reservation";
import * as ReservationService from "../services/reservation.service"
import { CreateReservationInputType } from "../types/CreateReservationInputType";
import { DeleteResult } from "typeorm";

@Resolver(Reservation)
export class ReservationResolver {
    @Query(() => [Reservation])
    getReservations(): Promise<Reservation[]> {
        return ReservationService.searchReservations();
    }

    @Query(() => Reservation)
    getReservationById(@Arg("id") id: number): Promise<Reservation | null> {
        return ReservationService.findReservation(id);
    }

    @Mutation(() => Reservation)
    bookJourney(
        @Arg("ReservationData") ReservationData: CreateReservationInputType,
        @Arg("id") id: number
    ): Promise<Reservation | Error> {
        return ReservationService.addReservation(ReservationData, id);
    }

    @Mutation(() => Reservation)
    updateReservation(
        @Arg("ReservationData") ReservationData: CreateReservationInputType,
        @Arg("id") id: number
    ): Promise<Reservation | Error> {
        return ReservationService.modifyReservation(ReservationData, id);
    }

    @Mutation(() => String)
    async deleteReservation(@Arg("id") id: number): Promise<DeleteResult | String> {
        return ReservationService.deleteReservation(id);
    }
}