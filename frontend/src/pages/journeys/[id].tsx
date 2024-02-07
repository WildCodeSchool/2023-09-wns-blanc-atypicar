import { Journey } from "@/types/journey";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { Divider, Image } from "@nextui-org/react";
import { formatHour, calculateDuration, formatDate } from "@/utils/formatDates";

const GET_JOURNEY_BY_ID = gql`
  query findJourney($findJourneyId: Float!) {
    findJourney(id: $findJourneyId) {
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

const JourneyDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [journey, setJourney] = useState<Journey>();

  const { loading, error } = useQuery(GET_JOURNEY_BY_ID, {
    variables: {
      findJourneyId: Number(id),
    },
    onCompleted: (data) => {
      setJourney(data.findJourney);
    },
  });

  if (loading) return <p>Chargement...Veuillez patienter</p>;
  if (error) return <p>Erreur 🤯</p>;
  if (journey)
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
    <li>
      <div className="flex items-center">
        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
        <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-secondary md:ms-2 dark:text-gray-400 dark:hover:text-white">Détails du trajet</a>
      </div>
    </li>
  </ol>
</nav>

      <div>
        <h2 className="flex justify-center pt-10 pb-5 text-xl font-bold font-montserrat">
          {formatDate(journey.startDate)}
        </h2>
        <section className=" flex flex-col md:flex-row gap-8 justify-center items-center">
          <Image alt="Card background" src="http://placekitten.com/g/450/300" />
          <div>
            <div className="h-36 w-auto grid-cols-2 pb-0 px-4 gap-8 grid">
              <p className="text font-bold">{formatHour(journey.startDate)}</p>
              <h4 className="font-bold">{journey.startingPoint}</h4>
              <small className="text-default-500">
                {calculateDuration(journey.startDate, journey.endDate)}
              </small>
              <small></small>
              <p className="text font-bold">{formatHour(journey.endDate)}</p>
              <h4 className="font-bold">{journey.arrivalPoint}</h4>
            </div>
            <Divider className=" my-6" />
            <div className="flex justify-around items-center gap-6">
              <span className="text-xs">Prix total pour un passager</span>
              <h4 className="font-bold">{journey.price} €</h4>
            </div>
            <Divider className=" my-6" />
          </div>
        </section>
      </div>
      </div>
    );
};

export default JourneyDetail;
