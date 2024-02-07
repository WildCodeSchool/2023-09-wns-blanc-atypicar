import JourneyCard from "@/components/JourneyCard";
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Journey } from "@/types/journey";
import Link from "next/link";
import { IoIosHome, IoIosArrowForward } from "react-icons/io";

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
      <IoIosHome className="text-lg mb-1"/> &nbsp;
        Accueil
      </a>
    </li>
    <li>
      <div className="flex items-center">
      <IoIosArrowForward/>
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
          <Link data-testid="journey-card" href={`/journeys/${journey.id}`}>
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
