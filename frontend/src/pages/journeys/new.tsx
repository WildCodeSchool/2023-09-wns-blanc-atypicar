import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import JourneyForm from "@/components/JourneyForm";
import { errorToast, successToast } from "@/components/Toast";
import { CREATE_JOURNEY } from "@/graphql/client";

function NewJourney() {
  const router = useRouter();
  const [createJourney] = useMutation(CREATE_JOURNEY);
  const [endDate, setEndDate] = useState<string>("0000-00-00T00:00");

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
            endDate: endDate,
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
    }
  };

  return (
    <JourneyForm
      handleSubmit={handleSubmit}
      endDate={endDate}
      setEndDate={setEndDate}
    />
  );
}

export default NewJourney;
