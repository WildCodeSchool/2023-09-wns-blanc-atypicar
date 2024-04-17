import {
  searchReservations,
  findReservation,
  addReservation,
  modifyReservation,
} from "../services/reservation.service";
import { Journey } from "../entities/journey";
import { Reservation } from "../entities/reservation";
import "reflect-metadata";

jest.mock("../services/reservation.service", () => ({
  findReservation: jest.fn().mockResolvedValue({
    id: 1,
    journey: { id: 1, startingPoint: "A", destination: "B" },
  }),
  Reservation: jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue(true),
  })),
  modifyReservation: jest.fn().mockResolvedValue({
    dateTime: new Date(),
    seatNumber: 2,
  }),
  addReservation: jest.fn().mockResolvedValue({
    status: "confirmed",
    passenger: 123,
    dateTime: new Date(),
    creationDate: new Date(),
    seatNumber: 2,
  }),
  searchReservations: jest
    .fn()
    .mockResolvedValue([
      { id: 1, journey: { id: 1, startingPoint: "A", destination: "B" } },
    ]),
  deleteReservation: jest.fn(),
}));

describe("searchReservations", () => {
  it("should return a list of reservations", async () => {
    const mockReservations = [
      {
        id: 1,
        journey: { id: 1, startingPoint: "A", destination: "B" },
      },
    ];

    const reservations = await searchReservations();

    expect(reservations).toEqual(mockReservations);
  });
});

describe("findReservation", () => {
  it("should return a reservation if it exists", async () => {
    const mockReservation = {
      id: 1,
      journey: {
        id: 1,
        startingPoint: "A",
        destination: "B",
      },
    };

    Reservation.findOne = jest.fn().mockResolvedValue(mockReservation);

    const reservation = await findReservation(1);

    expect(reservation).toEqual(mockReservation);
  });
});

describe("addReservation", () => {
  it("should successfully create a reservation", async () => {
    Journey.findOne = jest.fn().mockResolvedValue({
      id: 1,
      availableSeats: 5,
      save: jest.fn(),
    });
    Reservation.prototype.save = jest.fn().mockResolvedValue({
      id: 1,
      journey: { id: 1 },
      seatNumber: 2,
    });

    const reservationData = {
      status: "confirmed",
      passenger: 123,
      dateTime: new Date(),
      creationDate: new Date(),
      seatNumber: 2,
    };
    const response = await addReservation(reservationData, 1);
    expect(response).toHaveProperty("seatNumber", 2);
  });

  it("should throw error if no seats are available", async () => {
    Journey.findOne = jest.fn().mockResolvedValue({
      id: 1,
      availableSeats: 0,
    });

    const reservationData = {
      status: "confirmed",
      passenger: 123,
      dateTime: new Date(),
      creationDate: new Date(),
      seatNumber: 2,
    };

    try {
      await addReservation(reservationData, 1);
    } catch (error) {
      const err = error as Error;
      expect(err.message).toEqual("No seats available");
    }
  });
});

describe("modifyReservation", () => {
  it("should successfully update a reservation", async () => {
    const reservationData = {
      status: "confirmed",
      passenger: 123,
      dateTime: new Date(),
      creationDate: new Date(),
      seatNumber: 2,
    };
    const response = await modifyReservation(reservationData, 1);
    expect(response).toHaveProperty("seatNumber", 2);
  });

  describe("deleteReservation", () => {
    it("should increase available seats and delete reservation if found", async () => {
      const mockSave = jest.fn();
      const reservationToUpdate = {
        seatNumber: 5,
        journey: {
          availableSeats: 50,
          save: mockSave,
        },
      };
      const ReservationData = { seatNumber: 10 };

      let diff = reservationToUpdate.seatNumber - ReservationData.seatNumber;
      reservationToUpdate.journey.availableSeats += diff;
      reservationToUpdate.journey.save();

      // 50 - (5 - 10) = 45
      expect(reservationToUpdate.journey.availableSeats).toBe(45);
      expect(mockSave).toHaveBeenCalled();
    });
  });
});
