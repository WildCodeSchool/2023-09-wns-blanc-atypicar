import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { FormEvent, useState, useMemo } from "react";
import { Input, Textarea, Button } from "@nextui-org/react";
import JourneyForm from "@/components/JourneyForm";
import { errorToast, successToast } from "@/components/Toast";

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

  const handleSubmit = async (event: FormEvent): Promise<void> => {
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
          successToast("Trajet créé avec succès");
          router.push(`/journeys/${data.createJourney.id}`);
        },
      });
    } catch (error) {
      errorToast("Une erreur est survenue lors de la création du trajet");
      console.error("Incident");
    }
  };




  return <JourneyForm handleSubmit={handleSubmit} />;
}

export default NewJourney;
