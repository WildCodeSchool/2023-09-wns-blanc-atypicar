import { errorToast, successToast } from "@/components/Toast";
import { AuthContext } from "@/contexts/authContext";
import { BOOK_JOURNEY, GET_JOURNEY_BY_ID } from "@/graphql/client";
import { Journey } from "@/types/journey";
import { calculateDuration, formatDate, formatHour } from "@/utils/formatDates";
import { useMutation, useQuery } from "@apollo/client";
import { Avatar, Button, Divider, Image, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export default function BookJourneyPage() {
  const router = useRouter();
  const id = router.query.idjourney;
  const [numberSeats, setNumberSeats] = useState<number>(1);
  const [journey, setJourney] = useState<Journey>();
  const [userEmail, setUserEmail] = useState<string>("");
  const { currentUser } = useContext(AuthContext);

  const { loading, error } = useQuery(GET_JOURNEY_BY_ID, {
    variables: {
      findJourneyId: Number(id),
    },
    onCompleted: (data) => {
      setJourney(data.findJourney);
    },
  });

  const [bookJourney] = useMutation(BOOK_JOURNEY, {
    variables: {
      reservationData: {
        status: "VALIDATED",
        seatNumber: numberSeats,
        creationDate: new Date(),
        passenger: Number(currentUser?.id),
      },
      bookJourneyId: Number(journey?.id),
    },
    onError: (error) => {
      console.error(error);
      errorToast("Une erreur s'est produite lors de la réservation");
    },
    onCompleted: (data) => {
      successToast("Réservation effectuée avec succès");
      router.push("/reservations");
    },
  });

  loading && <p>Chargement...Veuillez patienter</p>;
  error && <p>Erreur 🤯</p>;

  if (journey) {
    return (
      <section className="flex flex-col  items-center justify-around gap-3">
        <h1 className="   mt-10 text-xl font-bold font-montserrat px-2 text-center  ">
          Vérifiez vos informations de réservation
        </h1>
        <div className="flex flex-col  gap-4 md:items-center md:mb-[4rem] w-4/5 md:w-3/5 rounded-xl bg-[#EFF0F6] md:shadow-xl px-4 md:px-1 py-10 md:py-4">
          <p className="mx-auto"> {formatDate(journey.endDate ?? "")}</p>
          <div className="flex flex-col md:flex-row w-full gap-3 items-center justify-center">
            <Image alt="Card background" src="https://picsum.photos/400/300" />
            <div className="md:w-2/4 md:px-10">
              <div className="h-36 w-full grid-cols-2 pb-0 px-4 gap-8 grid">
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
              <Divider className=" md:my-6" />
              <div className="flex flex-col md:flex-row justify-around items-center gap-6">
                <div className="flex flex-col justify-around items-center gap-6 mt-4">
                  <p> Trajet avec </p>
                  <div className="flex items-center gap-6">
                    <Avatar
                      isBordered
                      as="button"
                      color="success"
                      size="md"
                      src={journey.driver.picture}
                    />
                    <h4>{journey.driver.firstName}</h4>
                  </div>
                </div>
                <div>
                  <p className="text-justify">
                    <span className="text-xl font-montserrat font-bold">"</span>
                    {journey.description}
                    <span className="text-xl font-montserrat font-bold">"</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs font-montserrat italic text-center mt-10">
            {" "}
            Il reste {journey.availableSeats} place
            {journey.availableSeats > 1 && "s"} disponible
            {journey.availableSeats > 1 && "s"}{" "}
          </p>
          <Divider className=" my-2 md:my-6" />
          <form
            className="flex flex-col justify-start items-start mt-5  "
            onSubmit={(e) => {
              e.preventDefault();
              bookJourney();
            }}
          >
            <div className="flex flex-col items-start justify-start gap-3 px-10 w-full">
              <p> Selectionner le nombre de passager souhaité</p>
              <Input
                data-testid="journey-seats"
                type="number"
                value={numberSeats.toString()}
                onChange={(e) => {
                  const value = parseInt(e.target.value);

                  if (
                    !isNaN(value) &&
                    value >= 1 &&
                    value <= journey.availableSeats
                  ) {
                    setNumberSeats(value);
                  }
                }}
                name="availableSeats"
                labelPlacement="outside"
                placeholder="1"
                className="shadow-sm w-20"
                classNames={{
                  inputWrapper: "bg-white ",
                }}
                max={journey.availableSeats}
                min={1}
              />
              <p>
                {" "}
                Prix pour {numberSeats} places : {journey.price * numberSeats} €{" "}
              </p>
              <Button
                type="submit"
                className="bg-default mx-auto mt-5 text-white"
              >
                Réserver
              </Button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
