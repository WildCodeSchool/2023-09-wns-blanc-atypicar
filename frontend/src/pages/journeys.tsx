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

  return (
    <div>
      <h2 className="flex justify-center pt-10 pb-5 text-xl font-bold font-montserrat">
        Tous les trajets publiés
      </h2>
      {journeys ? (
        <div className="flex justify-evenly max-w-screen-lg  mx-auto w-full flex-wrap gap-8 ">
          {journeys.map((journey) => (
            <Link href={`/journeys/${journey.id}`}>
              <JourneyCard key={journey.id} journey={journey} />
            </Link>
          ))}
        </div>
      ) : (
        <div>Aucun trajet publié</div>
      )}
    </div>
  );
};

export default MyJourneys;
