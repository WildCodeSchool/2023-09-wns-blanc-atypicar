import { Journey } from "@/types/journey";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { Divider, Image, Button, Avatar, Chip } from "@nextui-org/react";
import { formatHour, calculateDuration, formatDate } from "@/utils/formatDates";
import { IoIosHome, IoIosArrowForward } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiFillTool } from "react-icons/ai";
import { AuthContext } from "@/contexts/authContext";
import { DELETE_JOURNEY, GET_JOURNEY_BY_ID } from "@/graphql/client";
import { MdAirlineSeatReclineExtra } from "react-icons/md";

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
      id: parseInt(id?.toString() ?? ""),
    },
    onCompleted: () => {
      router.push("/journeys");
    },
  });

  if (loading) return <p>Chargement...Veuillez patienter</p>;
  if (error) return <p>Erreur 🤯</p>;
  if (journey) {
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
        {journey.driver.id == currentUser?.id && (
          <div className="flex justify-end gap-4 px-12 mt-12">
            <Link href={`/journeys/update/${id}`}>
              <Button className="inline-flex items-center px-2 py-2 bg-success hover:bg-success-800 text-white text-sm font-medium rounded-md">
                <AiFillTool />
                Modifier
              </Button>
            </Link>

            <Button
              onClick={() => deleteJourney()}
              className="inline-flex items-center px-2 py-2 bg-danger hover:bg-danger-800 text-white text-sm font-medium rounded-md"
            >
              <RiDeleteBinLine />
              Supprimer
            </Button>
          </div>
        )}
        <div className="-mt-10">
          <h2 className="flex justify-center pt-10 pb-5 text-xl font-bold font-montserrat">
            {formatDate(journey.startDate)}
          </h2>
          <div className="flex flex-col items-center justify-center gap-4">
            <section className=" flex flex-col md:flex-row gap-8 justify-center items-center  w-2/3">
              <Image
                alt="Card background"
                src={journey.driver.vehicle.picture}
              />
              <div>
                {/* first line */}
                <div className=" grid grid-cols-[60px_20px_minmax(0,_1fr)] justify-items-start align-baseline font-bold font-montserrat w-80">
                  <p className="text font-bold">
                    {formatHour(journey.startDate)}
                  </p>
                  <div className="w-3 h-3 border-solid border-2 border-black rounded-full"></div>
                  <h4 className="font-bold">{journey.startingPoint}</h4>
                  {/* second line */}
                  <small className="pl-2 text-default-500 font-normal self-center">
                    {calculateDuration(journey.startDate, journey.endDate)}
                  </small>
                  <div className="h-16  -mt-3 ml-1 w-1 border-solid border-2 border-black "></div>
                  <div></div>
                  {/* third line */}
                  <p className="text font-bold -mt-1.5">
                    {formatHour(journey.endDate)}
                  </p>
                  <div className="w-3 h-3 border-solid border-2 border-black rounded-full"></div>
                  <h4 className="font-bold -mt-1.5">{journey.arrivalPoint}</h4>
                </div>
                <Divider className=" my-6" />
                <div className="flex flex-col">
                  <div className="flex justify-around items-center gap-6">
                    <span className="text-xs">Prix total pour un passager</span>
                    <h4 className="font-bold">{journey.price} €</h4>
                  </div>
                  {journey.availableSeats > 0 && (
                    <p className="text-xs font-montserrat italic">
                      {" "}
                      Il reste {journey.availableSeats} place
                      {journey.availableSeats > 1 && "s"} disponible
                      {journey.availableSeats > 1 && "s"}{" "}
                    </p>
                  )}
                </div>
                <Divider className=" my-6" />
                <div className="flex justify-between">
                  <span>
                    {journey.driver.vehicle.brand}{" "}
                    {journey.driver.vehicle.model}
                  </span>
                  <Chip className="text-white">
                    {journey.driver.vehicle.category.wording}
                  </Chip>
                </div>
              </div>
            </section>
            <section className="flex flex-col pt-12 justify-start align-start">
              <div className="flex flex-row gap-4 items-center">
                <Avatar
                  isBordered
                  as="button"
                  color="success"
                  size="md"
                  src={journey.driver.picture}
                />
                <h4>{journey.driver.firstName} </h4>
              </div>
              <p className="pt-8 px-4 text-right">{journey.description}</p>
            </section>
            <Divider className=" w-2/5" />
            <p className="text-xl font-bold underline underline-offset-4 pt-8 px-4">
              Utilisateurs ayant réservé
            </p>
            {journey.reservation.map((reservation) => (
              <div
                key={reservation.id}
                className="flex flex-row gap-4 items-center self-start w-2/5 mx-auto"
              >
                <Avatar
                  isBordered
                  as="button"
                  color="success"
                  size="md"
                  src={journey.driver.picture}
                />
                <span>
                  {reservation.passenger.firstName}{" "}
                  {reservation.passenger.lastName}
                </span>
                {[...Array(reservation.seatNumber)].map((_, index) => (
                  <MdAirlineSeatReclineExtra key={index} />
                ))}
              </div>
            ))}

            {journey &&
              currentUser &&
              journey.driver.id !== currentUser.id &&
              (journey.availableSeats > 0 ? (
                <div className="flex items-center justify-center">
                  <Button
                    className="bg-[#054652] text-white md:px-10"
                    onClick={() => router.push(`book/${journey.id}`)}
                  >
                    Reserver le trajet
                  </Button>
                </div>
              ) : (
                <p>Le trajet est complet</p>
              ))}
          </div>
        </div>
      </div>
    );
  }
};

export default JourneyDetail;
