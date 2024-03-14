export type Reservation = {
    id: number;
    status: string;
    dateTime: string;
    creationDate: string;
    seatNumber: number;
    journey: {
        arrivalPoint: string;
        availableSeats: number;
        description: string;
        endDate: string;
        id: number;
        price: number;
        startDate: string;
        startingPoint: string;
    }

};
