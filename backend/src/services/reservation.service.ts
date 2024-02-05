import { DeleteResult } from "typeorm";
import { Journey } from "../entities/journey";
import { Reservation } from "../entities/reservation";
import { CreateReservationInputType } from "../types/CreateReservationInputType";

export async function searchReservations(): Promise<Reservation[]> {
    return Reservation.find({
        relations: {
            journey: true
        }
    });
}

export async function findReservation(id: number): Promise<Reservation | null> {
    return Reservation.findOne({
        relations: {
            journey: true
        },
        where: { id }
    })
}

export async function addReservation(ReservationData: CreateReservationInputType, id: number): Promise<Reservation | Error> {
    try {
        let journey = await Journey.findOne({
            where: {
                id: id
            }
        })

        if (!journey) {
            throw new Error("Journey not found");
        } else if (journey.availableSeats === 0){
            throw new Error("No seats available")
        }
        
        let reservation = new Reservation();
        reservation.journey = journey;
        Object.assign(reservation, ReservationData)

        if(journey.availableSeats < reservation.seatNumber){
            throw new Error("You booked too much seat, please reduce the number of seats")
        }
        journey.availableSeats -= reservation.seatNumber;
        journey.save();
        
        return reservation.save();
    } catch (error) {
        return new Error();
    }
}

export async function modifyReservation(ReservationData: CreateReservationInputType, id: number): Promise<Reservation | Error> {
    const reservationToUpdate = await findReservation(id);
    const dateTime = new Date(ReservationData.dateTime);

    if(!reservationToUpdate){
        throw new Error("Reservation not found")
    }    
    const newSeatNumber = reservationToUpdate.seatNumber;
    const oldSeatNumber = reservationToUpdate.journey.availableSeats;

    console.log(newSeatNumber);
    console.log(oldSeatNumber);
    console.log(ReservationData.seatNumber);
    

    reservationToUpdate.dateTime = dateTime;
    reservationToUpdate.seatNumber = ReservationData.seatNumber;    

    return reservationToUpdate.save();
}

export async function deleteReservation(id: number): Promise<DeleteResult | string> {
    const reservation = await findReservation(id);        
    if(!reservation){
        return "No reservation find"
    }
    
    reservation.journey.availableSeats += reservation.seatNumber;
    await reservation.journey.save();
    Reservation.delete({ id });    

    return "Your reservation has been canceled !"
}