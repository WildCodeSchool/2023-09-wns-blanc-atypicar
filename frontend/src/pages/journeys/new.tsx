import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { FormEvent, useState, useMemo } from "react";
import { Input, Textarea, Button } from "@nextui-org/react";
import JourneyForm from "@/components/JourneyForm";

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

    createJourney({
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
  };

  return <JourneyForm handleSubmit={handleSubmit} />;
}

export default NewJourney;
