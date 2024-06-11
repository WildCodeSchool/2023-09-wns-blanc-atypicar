import { DeleteResult } from "typeorm";
import { Journey } from "../entities/journey";
import { Reservation } from "../entities/reservation";
import { CreateReservationInputType } from "../types/CreateReservationInputType";

export async function searchReservations(): Promise<Reservation[]> {
  return Reservation.find({
    relations: {
      journey: true,
    },
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

export async function addReservation(
  reservationData: CreateReservationInputType,
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
      throw new Error("Trajet introuvable");
    }

    if (journey.availableSeats === 0) {
      throw new Error("Aucune place disponible");
    }

    if (journey.driver.id === reservationData.passenger) {
      throw new Error("Vous ne pouvez pas réserver votre propre trajet");
    }

    let reservation = new Reservation();
    reservation.journey = journey;
    Object.assign(reservation, reservationData);

    if (journey.availableSeats < reservation.seatNumber) {
      throw new Error("Nombre de sièges insuffisant, veuillez réduire");
    }

    journey.availableSeats -= reservation.seatNumber;
    journey.save();

    return reservation.save();
  } catch (error: any) {
    return new Error(error.message);
  }
}

export async function modifyReservation(
  reservationData: CreateReservationInputType,
  id: number
): Promise<Reservation | Error> {
  const reservationToUpdate = await findReservation(id);

  if (!reservationToUpdate) {
    throw new Error("Réservation introuvable");
  }

  // TODO : Rajouter une condition qui permet de bloquer la modification si le nombre de places dispo dans le trajet n'est pas suffisant
  if (reservationToUpdate.seatNumber < reservationData.seatNumber) {
    let diff = reservationToUpdate.seatNumber - reservationData.seatNumber;
    reservationToUpdate.journey.availableSeats += diff;
    reservationToUpdate.journey.save();
  } else if (reservationToUpdate.seatNumber > reservationData.seatNumber) {
    let diff = reservationData.seatNumber - reservationToUpdate.seatNumber;
    reservationToUpdate.journey.availableSeats -= diff;
    reservationToUpdate.journey.save();
  }

  reservationToUpdate.seatNumber = reservationData.seatNumber;

  return reservationToUpdate.save();
}

export async function deleteReservation(
  id: number
): Promise<DeleteResult | string> {
  const reservation = await findReservation(id);

  if (!reservation) {
    return "Aucune réservation trouvée";
  }

  reservation.journey.availableSeats += reservation.seatNumber;
  await reservation.journey.save();
  Reservation.delete({ id });

  return "Votre réservation a été annulée !";
}
