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
    );
};

export default JourneyDetail;
