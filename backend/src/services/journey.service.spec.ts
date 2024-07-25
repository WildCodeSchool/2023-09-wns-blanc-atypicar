import * as journeyService from "../services/journey.service";
import { Journey } from "../entities/journey";
import { UpdateJourneyInputType } from "../types/UpdateJourneyInputType";
import { CreateJourneyInputType } from "../types/CreateJourneyInputType";
import { DeleteResult } from "typeorm";

jest.mock("../entities/journey");

describe("Journey Service", () => {
  beforeEach(() => {
    (Journey.find as jest.Mock).mockClear();
    (Journey.findOne as jest.Mock).mockClear();
    (Journey.delete as jest.Mock).mockClear();
  });

  it("searches for a journey", async () => {
    const mockJourney = new Journey();
    (Journey.find as jest.Mock).mockResolvedValue([mockJourney]);
    const result = await journeyService.searchJourney(
      "start",
      "arrival",
      new Date(),
      2
    );
    expect(result).toEqual([mockJourney]);
    expect(Journey.find).toHaveBeenCalled();
  });

  it("searches for journeys by driver", async () => {
    const mockJourney = new Journey();
    (Journey.find as jest.Mock).mockResolvedValue([mockJourney]);
    const result = await journeyService.searchJourneysByDriver(1);
    expect(result).toEqual([mockJourney]);
    expect(Journey.find).toHaveBeenCalled();
  });

  it("finds a journey", async () => {
    const mockJourney = new Journey();
    (Journey.findOne as jest.Mock).mockResolvedValue(mockJourney);
    const result = await journeyService.findJourney(1);
    expect(result).toEqual(mockJourney);
    expect(Journey.findOne).toHaveBeenCalled();
  });

  it("adds a journey", async () => {
    const mockJourney = new Journey();
    const mockInput: CreateJourneyInputType = {
      startingPoint: "start",
      arrivalPoint: "arrival",
      startDate: new Date(),
      endDate: new Date(),
      availableSeats: 2,
      price: 100,
    };
    const mockCtx = { user: { id: 1 } };
    (Journey.prototype.save as jest.Mock).mockResolvedValue(mockJourney);
    const result = await journeyService.addJourney(mockInput, mockCtx);
    expect(result).toEqual(mockJourney);
    expect(Journey.prototype.save).toHaveBeenCalled();
  });

  it("updates a journey", async () => {
    const mockJourney = new Journey();
    const mockInput: UpdateJourneyInputType = {
      id: 1,
      startingPoint: "start",
      arrivalPoint: "arrival",
      startDate: new Date(),
      endDate: new Date(),
      availableSeats: 4,
      price: 100,
    };
    (Journey.findOne as jest.Mock).mockResolvedValue(mockJourney);
    (Journey.prototype.save as jest.Mock).mockResolvedValue(mockJourney);
    const result = await journeyService.updateJourney(1, mockInput);

    expect(result).toEqual(mockJourney);
    expect(Journey.findOne).toHaveBeenCalled();
    expect(Journey.prototype.save).toHaveBeenCalled();
  });

  it("deletes a journey", async () => {
    const mockDeleteResult: DeleteResult = { raw: [], affected: 1 };
    (Journey.delete as jest.Mock).mockResolvedValue(mockDeleteResult);
    const result = await journeyService.deleteJourney(1);
    expect(result).toEqual(mockDeleteResult);
    expect(Journey.delete).toHaveBeenCalled();
  });
});
