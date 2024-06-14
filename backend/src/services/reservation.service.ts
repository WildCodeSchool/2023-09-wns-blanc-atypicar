import { DeleteResult } from "typeorm";
import { Journey } from "../entities/journey";
import { Reservation } from "../entities/reservation";
import { CreateReservationInputType } from "../types/CreateReservationInputType";

export async function searchReservations(): Promise<Reservation[]> {
  return Reservation.find({
    relations: ["journey", "journey.driver", "passenger"],
  });
}


export async function findReservation(id: number): Promise<Reservation | null> {
  return Reservation.findOne({
    relations: {
      journey: true,
    },
    where: { id },
  });
}

export async function findUserReservation(id: number): Promise<Reservation[] | null> {

  const reservation = await Reservation.find(
    {
      relations: ["journey", "journey.driver", "passenger"],
      where: {
        passenger: { id }
      },
    }
  );

  return reservation;
}

export async function addReservation(
  ReservationData: CreateReservationInputType,
  id: number
): Promise<Reservation | Error> {
  try {
    let journey = await Journey.findOne({
      relations: {
        reservation: true,
        driver: true,
      },
      where: {
        id: id,
      },
    });

    if (!journey) {
      throw new Error("Journey not found");
    } else if (journey.availableSeats === 0) {
      throw new Error("No seats available");
    }

    if (journey.driver.id === ReservationData.passenger) {
      throw new Error("You can't book your own journey");
    }
    let reservation = new Reservation();
    reservation.journey = journey;
    Object.assign(reservation, ReservationData);

    if (journey.availableSeats < reservation.seatNumber) {
      throw new Error(
        "You booked too much seat, please reduce the number of seats"
      );
    }
    journey.availableSeats -= reservation.seatNumber;
    journey.save();

    return reservation.save();
  } catch (error: any) {
    return new Error(error.message);
  }
}

export async function modifyReservation(
  ReservationData: CreateReservationInputType,
  id: number
): Promise<Reservation | Error> {
  const reservationToUpdate = await findReservation(id);

  if (!reservationToUpdate) {
    throw new Error("Reservation not found");
  }
  // TODO : Rajouter une condition qui permet de bloquer la modification si le nombre de places dispo dans le trajet n'est pas suffisant
  if (reservationToUpdate.seatNumber < ReservationData.seatNumber) {
    let diff = reservationToUpdate.seatNumber - ReservationData.seatNumber;
    reservationToUpdate.journey.availableSeats += diff;
    reservationToUpdate.journey.save();
  } else if (reservationToUpdate.seatNumber > ReservationData.seatNumber) {
    let diff = ReservationData.seatNumber - reservationToUpdate.seatNumber;
    reservationToUpdate.journey.availableSeats -= diff;
    reservationToUpdate.journey.save();
  }

  reservationToUpdate.seatNumber = ReservationData.seatNumber;

  return reservationToUpdate.save();
}

export async function deleteReservation(
  id: number
): Promise<DeleteResult | string> {
  const reservation = await findReservation(id);
  if (!reservation) {
    return "No reservation find";
  }

  reservation.journey.availableSeats += reservation.seatNumber;
  await reservation.journey.save();
  Reservation.delete({ id });

  return "Your reservation has been canceled !";
}
