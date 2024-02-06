import JourneyCard from "@/components/JourneyCard";
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Journey } from "@/types/journey";
import Link from "next/link";

const GET_ALL_JOURNEYS = gql`
  query Journeys {
    getJourneys {
      id
      startingPoint
      arrivalPoint
      description
      startDate
      endDate
      availableSeats
      price
    }
  }
`;
export const MyJourneys = () => {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const { loading, error, data } = useQuery(GET_ALL_JOURNEYS, {
    onCompleted: (data) => {
      setJourneys(data.getJourneys);
    },
  });

  loading && <p>Chargement...Veuillez patienter</p>;
  error && <p>Erreur 🤯</p>;

  return (
    <div className="pt-24">
      <h2 className="flex justify-center pt-10 pb-5 text-xl font-bold font-montserrat">
        Mes trajets publiés Mes trajets publiés
      </h2>
      <div className="flex justify-evenly max-w-screen-lg  mx-auto w-full flex-wrap gap-8 ">
        {journeys.map((journey) => (
          <Link href={`/journeys/${journey.id}`}>
            <JourneyCard key={journey.id} journey={journey} />
          </Link>
        ))}
      </div>
      {journeys.length < 1 && (
        <div className="p-8 text-center">Aucun trajet disponible.</div>
      )}
    </div>
  );
};

export default MyJourneys;
