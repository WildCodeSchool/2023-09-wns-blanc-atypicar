import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Input, Textarea, Button } from "@nextui-org/react";
import { isInvalidCity, isInvalidSeats } from "@/utils/inputValidation";
import { JourneyInput } from "@/types/journey";
import { formatStringToDate } from "@/utils/formatDates";

interface JourneyFormProps {
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  journey?: JourneyInput;
}

const JourneyForm: React.FC<JourneyFormProps> = ({ journey, handleSubmit }) => {
  const router = useRouter();
  const [currentJourney, setCurrentJourney] = useState<
    JourneyInput | undefined
  >();

  useEffect(() => {
    if (journey) {
      setCurrentJourney(journey);
    }
  }, [journey]);

  console.log(currentJourney);
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
          <Input
            type="text"
            name="startingPoint"
            label="Ville de départ"
            labelPlacement="outside"
            placeholder=" "
            isInvalid={isInvalidCity(currentJourney?.startingPoint)}
            errorMessage={
              isInvalidCity(currentJourney?.startingPoint) &&
              "Rentrez une ville existante"
            }
            onChange={(e) =>
              setCurrentJourney({
                ...currentJourney,
                startingPoint: e.target.value,
              })
            }
            className="shadow-sm"
            classNames={{
              inputWrapper: "bg-white ",
            }}
            value={currentJourney?.startingPoint}
          />
          <Input
            type="text"
            name="arrivalPoint"
            label="Ville d'arrivée"
            labelPlacement="outside"
            placeholder=" "
            isInvalid={isInvalidCity(currentJourney?.arrivalPoint)}
            errorMessage={
              isInvalidCity(currentJourney?.arrivalPoint) &&
              "Rentrez une ville existante"
            }
            onChange={(e) =>
              setCurrentJourney({
                ...currentJourney,
                arrivalPoint: e.target.value,
              })
            }
            className="shadow-sm"
            classNames={{
              inputWrapper: "bg-white",
            }}
            value={currentJourney?.arrivalPoint}
          />
        </div>

        <div className="flex flex-col w-full lg:flex-row md:gap-16 gap-4 md:p-5">
          <Input
            type="datetime-local"
            name="startDate"
            label="Date de départ"
            placeholder="dd - mm - yyyy"
            labelPlacement="outside"
            className="shadow-sm"
            classNames={{
              inputWrapper: "bg-white",
            }}
            value={
              currentJourney?.startDate
                ? formatStringToDate(currentJourney.startDate)
                : undefined
            }
            onChange={(e) =>
              setCurrentJourney({
                ...currentJourney,
                startDate: e.target.value,
              })
            }
          />
          <Input
            type="datetime-local"
            name="endDate"
            label="Date d'arrivée (estimée)"
            labelPlacement="outside"
            placeholder="dd - mm - yyyy"
            className="shadow-sm"
            classNames={{
              inputWrapper: "bg-white",
            }}
            value={
              currentJourney?.endDate
                ? formatStringToDate(currentJourney.endDate)
                : undefined
            }
            onChange={(e) =>
              setCurrentJourney({
                ...currentJourney,
                endDate: e.target.value,
              })
            }
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
