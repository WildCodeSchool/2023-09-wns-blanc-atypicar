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
  };
  reservation: {
    id: number;
    status: string;
    creationDate: string;
    seatNumber: number;
    passenger: {
      id: number;
      firstName: string;
      lastName: string;
      picture: string;
      description: string;
    };
  };
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
