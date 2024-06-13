import { Reservation } from "./reservation";
import { Vehicle } from "./vehicle";

export type Journey = {
  arrivalPoint: string;
  availableSeats: number;
  description: string;
  endDate: string;
  id: number;
  price: number;
  startDate: string;
  startingPoint: string;
  driver: {
    id: number;
    firstName: string;
    lastName: string;
    picture: string;
    description: string;
    vehicle: Vehicle;
  };
  reservation: Reservation[];
};

export type JourneyInput = {
  arrivalPoint?: string;
  availableSeats?: number;
  description?: string;
  endDate?: string;
  id?: number;
  price?: number;
  startDate?: string;
  startingPoint?: string;
};
