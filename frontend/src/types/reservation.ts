import { Vehicle } from "./vehicle";

export type Reservation = {
  id: number;
  status: string;
  dateTime: string;
  creationDate: string;
  seatNumber: number;
  passenger: {
    id: number;
    firstName: string;
    lastName: string;
  };
  journey: {
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
  };
};
