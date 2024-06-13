import JourneyCard from "@/components/JourneyCard";
import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { Journey } from "@/types/journey";
import { IoIosHome, IoIosArrowForward } from "react-icons/io";
import { AuthContext } from "@/contexts/authContext";
import { FIND_JOURNEY_BY_DRIVER } from "@/graphql/client";
import { Link } from "@nextui-org/react";

export const MyJourneys = () => {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const { currentUser } = useContext(AuthContext);

  const { loading, error } = useQuery(FIND_JOURNEY_BY_DRIVER, {
    variables: {
      driverId: currentUser?.id,
    },
    onCompleted: (data) => {
      setJourneys(data.findJourneysByDriver);
    },
  });

  loading && <p>Chargement...Veuillez patienter</p>;
  error && <p>Erreur 🤯</p>;

  return (
    <div>
      <nav className="flex pt-16 justify-center" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-secondary dark:text-gray-400 dark:hover:text-white"
            >
              <IoIosHome className="text-lg mb-1" /> &nbsp; Accueil
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <IoIosArrowForward />
              <Link
                href="/journeys"
                className="ms-1 text-sm font-medium text-gray-700 hover:text-secondary md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >
                Mes trajets
              </Link>
            </div>
          </li>
        </ol>
      </nav>

      <div className="pt-10">
        <h1
          data-testid="journey-title"
          className="flex justify-center pt-3 pb-8 text-xl font-bold font-montserrat"
        >
          Tous mes trajets publiés
        </h1>
        <div className="flex justify-evenly max-w-screen-lg  mx-auto w-full flex-wrap gap-8 ">
          {journeys &&
            journeys.map((journey) => (
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
