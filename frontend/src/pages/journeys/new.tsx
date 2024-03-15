import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { FormEvent, useState, useMemo } from "react";
import { Input, Textarea, Button } from "@nextui-org/react";

const CREATE_JOURNEY = gql`
  mutation CreateJourney($JourneyData: CreateJourneyInputType!) {
    createJourney(JourneyData: $JourneyData) {
      id
      startingPoint
      arrivalPoint
      startDate
      endDate
      availableSeats
      price
      description
    }
  }
`;

function NewJourney() {
  const router = useRouter();
  const [createJourney] = useMutation(CREATE_JOURNEY);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const form: EventTarget = event.target;
    const formData = new FormData(form as HTMLFormElement);

    const formDataJson = Object.fromEntries(formData.entries());

    try {
      await createJourney({
        variables: {
          JourneyData: {
            startingPoint: formDataJson.startingPoint,
            arrivalPoint: formDataJson.arrivalPoint,
            startDate: formDataJson.startDate,
            endDate: formDataJson.endDate,
            availableSeats: parseInt(formDataJson.availableSeats as string),
            price: parseInt(formDataJson.price as string),
            description: formDataJson.description,
          },
        },
        onCompleted: (data) => {
          router.push(`/journeys/${data.createJourney.id}`);
        },
      });
    } catch (error) {
      console.error("Incident");
    }
  };
  // Filter Cities
  const [value, setValue] = useState<string>("");

  const validateCity = (value: string) => {
    return /^[A-Za-z\s\u00C0-\u00FF'’]+$/u.test(value);
  };

  const isInvalidCity = React.useMemo(() => {
    if (value === "") return false;

    return validateCity(value) ? false : true;
  }, [value]);

  const [valueInt, setValueInt] = useState<number>(1);

  const validateSeats = (valueInt: number) => {
    if (valueInt > 0 && valueInt < 21) {
      return valueInt;
    } else {
      return 0;
    }
  };

  const [seats, setSeats] = useState<string>("1");

  const isInvalidSeats = useMemo(() => {
    if (valueInt === 0) return false;

    return validateSeats(valueInt) ? false : true;
  }, [valueInt]);

  return (
    <form
      data-testid="journey-form"
      onSubmit={submit}
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
            isInvalid={isInvalidCity}
            errorMessage={isInvalidCity && "Rentrez une ville existante"}
            onValueChange={setValue}
            className="shadow-sm"
            classNames={{
              inputWrapper: "bg-white ",
            }}
          />
          <Input
            type="text"
            name="arrivalPoint"
            label="Ville d'arrivée"
            labelPlacement="outside"
            placeholder=" "
            isInvalid={isInvalidCity}
            errorMessage={isInvalidCity && "Rentrez une ville existante"}
            onValueChange={setValue}
            className="shadow-sm"
            classNames={{
              inputWrapper: "bg-white",
            }}
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
            min="0.00"
          />
          <Input
            data-testid="journey-seats"
            type="number"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            name="availableSeats"
            label="Nombres de places"
            labelPlacement="outside"
            placeholder="1"
            className="shadow-sm"
            classNames={{
              inputWrapper: "bg-white",
            }}
            isInvalid={isInvalidSeats}
            errorMessage={
              isInvalidSeats &&
              "Le nombre de places doit être compris entre 1 et 20"
            }
            onValueChange={setValueInt}
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
}

export default NewJourney;
