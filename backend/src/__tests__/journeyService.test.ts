import {
  searchJourney,
  addJourney,
  findJourney,
} from "../services/journey.service";
import { Journey } from "../entities/journey";
import { Between, MoreThanOrEqual } from "typeorm";

const journeyData = {
  id: 1,
  startingPoint: "Paris",
  arrivalPoint: "Toulouse",
  description: "test",
  startDate: new Date("2024-01-01"),
  endDate: new Date("2024-01-02"),
  availableSeats: 1,
  price: 5,
};

//mock
jest.mock("../entities/journey", () => {
  const journeyDataMock = {
    id: 1,
    startingPoint: "Paris",
    arrivalPoint: "Toulouse",
    description: "test",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-02"),
    availableSeats: 1,
    price: 5,
  };

  //construct
  const mockJourneyConstructor = jest.fn().mockImplementation(() => {
    return {
      save: jest.fn().mockResolvedValue(journeyDataMock),
    };
  });

  return {
    Journey: Object.assign(mockJourneyConstructor, {
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn()
        .mockResolvedValueOnce([journeyDataMock])
        .mockResolvedValueOnce([]),
    }),
  };
});


// SEARCH JOURNEY
describe("searchJourney", () => {
  it("doit retourner des trajets correspondants aux critères de recherche", async () => {
    const start = "Paris";
    const arrival = "Toulouse";
    const date = new Date("2024-01-01");
    const seats = 1;

    const result = await searchJourney(start, arrival, date, seats);

    expect(Journey.find).toHaveBeenCalledWith({
      relations: { reservation: true, driver: true },
      where: {
        startingPoint: start,
        arrivalPoint: arrival,
        startDate: Between(date, new Date("2024-01-01T22:59:59.999Z")),
        availableSeats: MoreThanOrEqual(seats),
      },
      order: { startDate: "DESC" },
    });

    expect(result).toEqual([{ ...journeyData }]);
  });

  it("doit retourner un tableau vide", async () => {
    const start = "Paris";
    const arrival = "Marseille";
    const date = new Date("2024-01-01");
    const seats = 1;

    const result = await searchJourney(start, arrival, date, seats);

    expect(result).toEqual([]);
  });
});

//ADD JOURNEY
describe("addJourney", () => {
  it("Invalid Date", async () => {
    const invalidJourneyData = {
      startingPoint: "Paris",
      arrivalPoint: "Toulouse",
      description: "test",
      startDate: new Date(),
      endDate: new Date("2023-01-01"),
      availableSeats: 21,
      price: -1,
    };
    await expect(addJourney(invalidJourneyData, {})).rejects.toThrow(
      "La date d'arrivée ne peut pas être inférieure à la date de départ. Le nombre de places est limité (doit être compris entre 1 et 20 inclus). Le prix doit être supérieur à 0."
    );
  });

  it("Valid Data", async () => {
    const result = await addJourney(journeyData, {});
    expect(result).toBeTruthy();

    if (result instanceof Error) {
      throw result;
    }
    expect(result.endDate).toEqual(journeyData.endDate);
  });
});

//FIND JOURNEY
describe('findJourney', () => {
  it('returns a journey if it exists', async () => {
    const result = await findJourney(1);

    expect(Journey.findOne).toHaveBeenCalledWith({
      relations: {
        driver: true,
        reservation: true,
      },
      where: { id: 1 },
    });
  });

// test with wrong input
it('returns null if the journey does not exist', async () => {

  const result = await findJourney(999);
  expect(Journey.findOne).toHaveBeenCalledWith({
    relations: {
      driver: true,
      reservation: true,
    },
    where: { id: 999 },
  });
});
});
