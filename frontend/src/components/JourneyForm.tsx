import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Input, Textarea, Button } from "@nextui-org/react";
import { isInvalidCity, isInvalidSeats } from "@/utils/inputValidation";
import { JourneyInput } from "@/types/journey";
import { formatStringToDate } from "@/utils/formatDates";

interface JourneyFormProps {
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  journey?: JourneyInput;
  endDate?: string;
  setEndDate?: any;
}

const JourneyForm: React.FC<JourneyFormProps> = ({ journey, handleSubmit, endDate, setEndDate }) => {
  const router = useRouter();
  const [currentJourney, setCurrentJourney] = useState<
    JourneyInput | undefined
  >();
  const [citySuggestionsStart, setCitySuggestionsStart] = useState<any>();
  const [citySuggestionsEnd, setCitySuggestionsEnd] = useState<any>();
  const [journeyDuration, setJourneyDuration] = useState<number>()
  useEffect(() => {
    if (journey) {
      setCurrentJourney(journey);
    }
  }, [journey]);
  const [coordinatesStart, setCoordinatesStart] = useState<string>();
  const [coordinatesEnd, setCoordinatesEnd] = useState<string>();


  const getCitySuggestions = async (input: any) => {
    try {
      const response = await fetch(`https://us1.locationiq.com/v1/autocomplete?q=${encodeURIComponent(input)}&key=pk.41ec9155202c25b414d024e5ca533173&limit=5&dedupe=1&countrycodes=FR`);
      if (!response.ok) {

      }
      const data = await response.json();
      setCitySuggestionsStart(data);
      return data;
    } catch (error) {
      console.error('Error fetching city suggestions:', error);

    }
  };

  const getCitySuggestionsEnd = async (input: any) => {
    try {
      const response = await fetch(`https://us1.locationiq.com/v1/autocomplete?q=${encodeURIComponent(input)}&key=pk.41ec9155202c25b414d024e5ca533173&limit=5&dedupe=1&countrycodes=FR`);
      if (!response.ok) {
        console.error("error");
      }
      const data = await response.json();

      setCitySuggestionsEnd(data);
      return data;
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
  };

  const fetchJourneyDuration = async () => {

    const response = await fetch(`https://us1.locationiq.com/v1/directions/driving/${coordinatesStart};${coordinatesEnd}?key=pk.41ec9155202c25b414d024e5ca533173&steps=true&alternatives=true&geometries=polyline&overview=full&`);

    if (!response.ok) {
      console.error('Failed to fetch journey duration');
    }

    const data = await response.json();

    const duration = data.routes[0].duration;


    setJourneyDuration(duration);

  };

  useEffect(() => {
    if (coordinatesStart && coordinatesEnd) {
      fetchJourneyDuration();
    }
  }, [coordinatesStart, coordinatesEnd]);
  useEffect(() => {
    if (currentJourney?.startDate && journeyDuration) {
      const seconds = (new Date(currentJourney.startDate)).getTime() / 1000;
      const arrivalDateSecond = seconds + journeyDuration;
      const milliseconds = arrivalDateSecond * 1000;
      const arrivalDateMS = new Date(milliseconds);
      const year = arrivalDateMS.getFullYear();
      const month = ('0' + (arrivalDateMS.getMonth() + 1)).slice(-2);
      const day = ('0' + arrivalDateMS.getDate()).slice(-2);
      const hours = ('0' + arrivalDateMS.getHours()).slice(-2);
      const minutes = ('0' + arrivalDateMS.getMinutes()).slice(-2);
      const formattedDate = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;

      setEndDate(formattedDate);

    }
  }, [currentJourney?.startDate, journeyDuration]);
  return (
    <form
      data-testid="journey-form"
      onSubmit={handleSubmit}
      className="flex flex-col items-center"
    >
      <div className="flex flex-col  gap-4 mt-[5rem] md:items-center md:mb-[4rem] w-full md:w-3/5 md:bg-[#EFF0F6] md:shadow-xl px-4 md:px-1 md:py-4">
        <div className="w-4/5 md:border-b-4 md:border-grey700">
          <h1 className="mb-5 font-bold text-lg text-center">
            Poster un trajet
          </h1>
        </div>
        <div className="flex flex-col w-full gap-4 md:gap-16 md:flex-row md:p-5">
          <div className="flex flex-col w-full gap-4">
            <Input
              type="text"
              name="startingPoint"
              label="Ville de départ"
              labelPlacement="outside"
              placeholder=" "
              value={currentJourney?.startingPoint}
              isInvalid={isInvalidCity(currentJourney?.startingPoint)}
              errorMessage={
                isInvalidCity(currentJourney?.startingPoint) &&
                "Rentrez une ville existante"
              }
              onChange={(e) => {
                setCurrentJourney({
                  ...currentJourney,
                  startingPoint: e.target.value,
                });
                getCitySuggestions(e.target.value);
              }}
              className="shadow-sm"
              classNames={{
                inputWrapper: "bg-white ",
              }}
            />
            {citySuggestionsStart?.length > 0 && (
              <div className="absolute top-[19rem] md:top-[21.5rem] bg-white border border-gray-200 rounded-b-xl  w-96 z-50">
                {citySuggestionsStart.map((city: any, index: number) => (
                  <div data-testid="select-city-start" key={index} className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={() => {
                    setCurrentJourney({
                      ...currentJourney,
                      startingPoint: city.address.name
                    });
                    setCitySuggestionsStart([]);
                    setCoordinatesStart(city.lon + ',' + city.lat);
                  }}>
                    {city.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Input
            type="text"
            name="arrivalPoint"
            label="Ville d'arrivée"
            labelPlacement="outside"
            placeholder=" "
            value={currentJourney?.arrivalPoint}
            isInvalid={isInvalidCity(currentJourney?.arrivalPoint)}
            errorMessage={
              isInvalidCity(currentJourney?.arrivalPoint) &&
              "Rentrez une ville existante"
            }
            onChange={(e) => {
              setCurrentJourney({
                ...currentJourney,
                arrivalPoint: e.target.value,
              });
              getCitySuggestionsEnd(e.target.value);

            }}
            className="shadow-sm"
            classNames={{
              inputWrapper: "bg-white",
            }}
          />
          {citySuggestionsEnd?.length > 0 && (
            <div className="absolute top-96 md:top-[21.5rem] bg-white border border-gray-200 rounded-b-xl  w-96 z-50 md:right-[21rem]">
              {citySuggestionsEnd.map((city: any, index: number) => (
                <div data-testid="select-city-end" key={index} className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={() => {
                  setCurrentJourney({ ...currentJourney, arrivalPoint: city.address.name }); setCoordinatesEnd(city.lon + ',' + city.lat);
                  ; setCitySuggestionsEnd([])
                }}>
                  {city.display_name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col w-full lg:flex-row md:gap-16 gap-4 md:p-5 ">
          <Input
            type="datetime-local"
            name="startDate"
            label="Date de départ"
            value={currentJourney?.startDate}
            placeholder="dd - mm - yyyy"
            labelPlacement="outside"
            className="shadow-sm"
            classNames={{
              inputWrapper: "bg-white",
            }}
            onChange={(e) => {
              setCurrentJourney({
                ...currentJourney,
                startDate: e.target.value,
              });

            }}
          />
          <Input
            type="datetime-local"
            isDisabled
            name="endDate"
            label="Date d'arrivée (estimée)"
            labelPlacement="outside"
            value={endDate}

            className="shadow-sm"
            classNames={{
              inputWrapper: "bg-white",
            }}
            readOnly
          />
        </div>

        <div className="flex flex-col w-full md:gap-16 md:flex-row md:p-5">
          <Input
            data-testid="journey-price"
            type="number"
            name="price"
            label="Prix"
            labelPlacement="outside"
            placeholder="0"
            className="shadow-sm"
            classNames={{
              inputWrapper: "bg-white ",
            }}
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">€</span>
              </div>
            }
            value={currentJourney?.price?.toString()}
            min="0.00"
            onChange={(e) =>
              setCurrentJourney({
                ...currentJourney,
                price: Number(e.target.value),
              })
            }
          />
          <Input
            data-testid="journey-seats"
            type="number"
            value={currentJourney?.availableSeats?.toString()}
            onChange={(e) =>
              setCurrentJourney({
                ...currentJourney,
                availableSeats: Number(e.target.value),
              })
            }
            name="availableSeats"
            label="Nombres de places"
            labelPlacement="outside"
            placeholder="1"
            className="shadow-sm"
            classNames={{
              inputWrapper: "bg-white",
            }}
            isInvalid={isInvalidSeats(currentJourney?.availableSeats)}
            errorMessage={
              isInvalidSeats(currentJourney?.availableSeats) &&
              "Le nombre de places doit être compris entre 1 et 20"
            }
          />
        </div>

        <Textarea
          label="Description"
          name="description"
          placeholder="Décrivez votre trajet en quelques mots..."
          labelPlacement="outside"
          size="lg"
          classNames={{
            inputWrapper: "bg-white ",
          }}
          className="w-full p-4 shadow-sm"
          value={currentJourney?.description}
          onChange={(e) =>
            setCurrentJourney({
              ...currentJourney,
              description: e.target.value,
            })
          }
        />

        <div className="flex flex-col-reverse m-auto w-1/2 md:flex-row justify-end md:w-full gap-4 md:mb-5 mt-5 md:px-7">
          <Button
            className="bg-[#054652] text-white md:px-10"
            radius="full"
            onClick={() => router.push("/")}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            color="primary"
            className="text-white md:px-10"
            radius="full"
            data-testid="confirm-journey"
          >
            Valider
          </Button>
        </div>
      </div>
    </form>
  );
};

export default JourneyForm;
