import { Reservation } from "@/types/reservation";
import { formatHour, calculateDuration } from "@/utils/formatDates";
import {
  Card,
  CardHeader,
  Image,
  Avatar,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { MdAirlineSeatReclineExtra } from "react-icons/md";

type ReservationCardProps = {
  reservation: Reservation;
};

const ReservationCard = ({ reservation }: ReservationCardProps) => {
  const { journey } = reservation;

  const totalPrice = journey.price * reservation.seatNumber;

  console.log(journey);
  return (
    <Card isPressable className="flex flex-row">
      <Image
        className="h-52 w-32 max-w-none rounded-r-none object-cover"
        alt="Card background"
        src="https://www.largus.fr/images/images/bmw-m3-competition-2020-3.jpg"
      />
      <div className="flex flex-col justify-between items-center p-2 h-52">
        <div className="flex flex-col md:flex-row">
          <CardHeader className="grid grid-cols-[60px_20px_minmax(0,_1fr)] justify-items-start font-bold font-montserrat w-52">
            <p>{formatHour(journey.startDate)}</p>
            <div className="w-3 h-3 border-solid border-2 border-black rounded-full"></div>
            <h4>{journey.startingPoint}</h4>

            <small className="pl-2 text-default-500 font-normal">
              {calculateDuration(journey.startDate, journey.endDate)}
            </small>
            <div className="h-9 -mb-1.5 -mt-2 ml-1 w-1 border-solid border-2 border-black "></div>
            <div></div>

            <p>{formatHour(journey.endDate)}</p>
            <div className="w-3 h-3 border-solid border-2 border-black rounded-full"></div>
            <h4>{journey.arrivalPoint}</h4>
          </CardHeader>
          <CardBody className="py-1 ml-0 md:ml-4 md:p-3 w-auto">
            <button
              className={`px-4 py-1 text-white rounded-full ${reservation.status === "VALIDATED"
                ? "bg-green-500"
                : reservation.status === "CANCELED"
                  ? "bg-red-500"
                  : ""
                }`}
            >
              {reservation.status === "VALIDATED"
                ? "Validé"
                : reservation.status === "CANCELED"
                  ? "Refusé"
                  : reservation.status}
            </button>

            <div className="flex items-center mt-5 ml-auto border rounded-full p-2">
              {[...Array(reservation.seatNumber)].map((_, index) => (
                <MdAirlineSeatReclineExtra key={index} />
              ))}
            </div>
          </CardBody>
        </div>
        <CardFooter className="flex justify-start gap-6 items-center w-full pt-2">
          <Avatar
            isBordered
            as="button"
            color="success"
            size="md"
            src="https://i.pravatar.cc/300"
          />
          <h4>{journey.driver.firstName}</h4>
          <h4 className="ml-auto">{totalPrice}€</h4>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ReservationCard;