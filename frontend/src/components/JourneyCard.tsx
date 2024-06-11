import { Journey } from "@/types/journey";
import { formatHour, calculateDuration } from "@/utils/formatDates";
import {
  Card,
  CardHeader,
  Image,
  Avatar,
  CardBody,
  CardFooter,
} from "@nextui-org/react";

type JourneyCardProps = {
  journey: Journey;
};

const JourneyCard = ({ journey }: JourneyCardProps) => {
  return (
    <Card isPressable className="flex flex-row">
      <Image
        className="h-56 w-32 max-w-none rounded-r-none object-cover"
        alt="Card background"
        src="https://picsum.photos/200/200"
      />

      <div className="flex flex-col justify-between items-center p-2 h-52">
        <div className="flex flex-col md:flex-row">
          {journey.availableSeats == 0 && (
            <div className="absolute bottom-0 right-0 bg-danger text-white p-2 text-xs rounded-md w-auto">
              Trajet complet
            </div>
          )}
          <CardHeader className="grid grid-cols-[60px_20px_minmax(0,_1fr)] justify-items-start font-bold font-montserrat w-52">
            <p>{formatHour(journey.startDate)}</p>
            <div className="w-3 h-3 border-solid border-2 border-black rounded-full"></div>

            <h4 className={`whitespace-nowrap overflow-hidden max-w-[8ch] md:max-w-[11ch] ${journey.startingPoint.length > 8 ? "fade-out" : ""} md:${journey.startingPoint.length > 11 ? "fade-out" : ""}`}>{journey.startingPoint}</h4>

            <small className="pl-2 text-default-500 font-normal">
              {calculateDuration(journey.startDate, journey.endDate)}
            </small>
            <div className="h-9 -mb-1.5 -mt-2 ml-1 w-1 border-solid border-2 border-black "></div>
            <div></div>

            <p>{formatHour(journey.endDate)}</p>
            <div className="w-3 h-3 border-solid border-2 border-black rounded-full"></div>
            <h4 className={`whitespace-nowrap overflow-hidden max-w-[8ch] md:max-w-[11ch] ${journey.arrivalPoint.length > 8 ? "fade-out" : ""} md:${journey.arrivalPoint.length > 11 ? "fade-out" : ""}`}>{journey.arrivalPoint}</h4>

          </CardHeader>
          <CardBody className="py-1 ml-0 md:ml-4 md:p-3 w-auto">
            <h4>{journey.price}€</h4>
          </CardBody>
        </div>
        <CardFooter className="flex justify-start gap-6 items-center w-full pt-2 h-auto pb-4">
          <Avatar
            isBordered
            as="button"
            color="success"
            size="md"
            src={journey.driver.picture}
          />
          <h4>{journey.driver.firstName}</h4>
        </CardFooter>
      </div>
    </Card>
  );
};

export default JourneyCard;
