import { Journey } from "@/types/journey";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { Divider, Image, Button, Avatar } from "@nextui-org/react";
import { formatHour, calculateDuration, formatDate } from "@/utils/formatDates";
import { IoIosHome, IoIosArrowForward } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiFillTool } from "react-icons/ai";
import { User } from "@/types/user";
import { AuthContext } from "@/contexts/authContext";

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
      driver{
        id
        firstName
        lastName
        picture
        description
      
      }
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
  const { currentUser } = useContext(AuthContext);


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
      <div>
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
          <div className="flex flex-col items-center justify-center gap-4">
            <section className=" flex flex-col md:flex-row gap-8 justify-center items-center">
              <Image
                alt="Card background"
                src="https://picsum.photos/450/300"
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
                <div className="flex flex-col">
                  <div className="flex justify-around items-center gap-6">

                    <span className="text-xs">Prix total pour un passager</span>
                    <h4 className="font-bold">{journey.price} €</h4>
                  </div>
                  {journey.availableSeats > 0 && (
                    <p className="text-xs font-montserrat italic"> Il reste {journey.availableSeats} place{journey.availableSeats > 1 && "s"} disponible{journey.availableSeats > 1 && "s"} </p>
                  )}
                </div>


                <Divider className=" my-6" />
                {journey.driver.id == currentUser?.id &&
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
                  </div>}
              </div>
            </section>
            <div className="flex flex-row gap-4 items-center self-start w-2/5 mx-auto">
              <Avatar
                isBordered
                as="button"
                color="success"
                size="md"
                src={journey.driver.picture}
              />
              <h4>{journey.driver.firstName} </h4>
            </div>
            <Divider className=" w-2/5" />
            <p className="pt-8 px-4">{journey.description}</p>

            {journey && currentUser && journey.driver.id !== currentUser.id && (
              journey.availableSeats > 0 ? (
                <div className="flex items-center justify-center">
                  <Button className="bg-[#054652] text-white md:px-10" onClick={() => router.push(`book/${journey.id}`)} >Reserver le trajet</Button>
                </div>
              ) : <p>Le trajet est complet</p>
            )}

          </div>
        </div>
      </div>
    );
};

export default JourneyDetail;
