import JourneyForm from "@/components/JourneyForm";
import { GET_ONE_JOURNEY, UPDATE_JOURNEY } from "@/graphql/client";
import { JourneyInput } from "@/types/journey";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

const UpdateJourney = () => {
  const router = useRouter();
  const { id } = router.query;
  const [journey, setJourney] = useState<JourneyInput>();

  const [updateJourney] = useMutation(UPDATE_JOURNEY);
  const [findJourney, { loading, error }] = useLazyQuery(GET_ONE_JOURNEY, {
    variables: {
      findJourneyId: Number(id),
    },
    onCompleted: (data) => {
      setJourney(data.findJourney);
    },
  });

  useEffect(() => {
    if (id) {
      findJourney();
    }
  }, [id]);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (id) {
      const form: EventTarget = e.target;
      const formData = new FormData(form as HTMLFormElement);
      const formDataJson = Object.fromEntries(formData.entries());

      updateJourney({
        variables: {
          journeyData: {
            id: Number(id),
            startingPoint: formDataJson.startingPoint,
            arrivalPoint: formDataJson.arrivalPoint,
            startDate: formDataJson.startDate,
            endDate: formDataJson.endDate,
            availableSeats: parseInt(formDataJson.availableSeats as string),
            price: parseInt(formDataJson.price as string),
            description: formDataJson.description,
          },
        },
        onCompleted: () => {
          router.push(`/journeys`);
        },
        onError: (error) => {
          console.error(error);
        },
      });
    }
  };

  loading && <div>Chargement...</div>;
  error && <div>Une erreur est survenue</div>;
  return <JourneyForm journey={journey} handleSubmit={handleSubmit} />;
};

export default UpdateJourney;
