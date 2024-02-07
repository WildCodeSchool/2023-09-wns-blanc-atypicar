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
<div>
    <nav className="flex pt-16 justify-center" aria-label="Breadcrumb">
  <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
    <li className="inline-flex items-center">
      <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-secondary dark:text-gray-400 dark:hover:text-white">
        <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
        </svg>
        Accueil
      </a>
    </li>
    <li>
      <div className="flex items-center">
        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
        <a href="/journeys" className="ms-1 text-sm font-medium text-gray-700 hover:text-secondary md:ms-2 dark:text-gray-400 dark:hover:text-white">Mes trajets</a>
      </div>
    </li>
  </ol>
</nav>

    <div className="pt-10">
      <h2 className="flex justify-center pt-3 pb-8 text-xl font-bold font-montserrat">
        Tous mes trajets publiés
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
  </div>
  );
};

export default MyJourneys;
