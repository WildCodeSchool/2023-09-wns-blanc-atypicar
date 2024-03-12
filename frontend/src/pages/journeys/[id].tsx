import { Journey } from "@/types/journey";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Divider, Image, Button } from "@nextui-org/react";
import { formatHour, calculateDuration, formatDate } from "@/utils/formatDates";
import { IoIosHome, IoIosArrowForward } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiFillTool } from "react-icons/ai";

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

const DELETE_JOURNEY = gql`
  mutation deleteJourney($id: Float!) {
    deleteJourney(id: $id)
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

  const [deleteJourney] = useMutation(DELETE_JOURNEY, {
    variables: {
      id: Number(id),
    },
    onCompleted: () => {
      router.push("/journeys");
    },
  });

  if (loading) return <p>Chargement...Veuillez patienter</p>;
  if (error) return <p>Erreur 🤯</p>;
  if (journey)
    return (
      <div id="journey-details">
        <nav className="flex pt-16 justify-center" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-secondary dark:text-gray-400 dark:hover:text-white"
              >
                <IoIosHome className="text-lg mb-1" /> &nbsp; Accueil
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <IoIosArrowForward />
                <a
                  href="/journeys"
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-secondary md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Mes trajets
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <IoIosArrowForward />
                <a
                  href="#"
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-secondary md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Détails du trajet
                </a>
              </div>
            </li>
          </ol>
        </nav>

        <div>
          <h2 className="flex justify-center pt-10 pb-5 text-xl font-bold font-montserrat">
            {formatDate(journey.startDate)}
          </h2>
          <section className=" flex flex-col md:flex-row gap-8 justify-center items-center">
            <Image
              alt="Card background"
              src="http://placekitten.com/g/450/300"
            />
            <div>
              <div className="h-36 w-auto grid-cols-2 pb-0 px-4 gap-8 grid">
                <p className="text font-bold">
                  {formatHour(journey.startDate)}
                </p>
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
              <div className="flex justify-between">
                <Button isDisabled className="inline-flex items-center px-2 py-2 bg-success hover:bg-success-800 text-white text-sm font-medium rounded-md">
                  <AiFillTool />
                  Modifier
                </Button>
                <Button
                  onClick={deleteJourney}
                  className="inline-flex items-center px-2 py-2 bg-danger hover:bg-danger-800 text-white text-sm font-medium rounded-md"
                >
                  <RiDeleteBinLine />
                  Supprimer
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
};

export default JourneyDetail;
