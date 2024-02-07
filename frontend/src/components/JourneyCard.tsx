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
        className="h-52 w-32 max-w-none rounded-r-none object-cover"
        alt="Card background"
        src="http://placekitten.com/g/200/200"
      />
      <div className="flex flex-col justify-between items-center p-2 h-52">
        <div className="flex flex-col md:flex-row">
          <CardHeader className="grid-cols-2 grid justify-items-start font-bold font-montserrat w-52">
            <p>{formatHour(journey.startDate)}</p>
            <h4>{journey.startingPoint}</h4>
            <small className="pl-2 text-default-500 font-normal">
              {calculateDuration(journey.startDate, journey.endDate)}
            </small>
            <small></small>
            <p>{formatHour(journey.endDate)}</p>
            <h4>{journey.arrivalPoint}</h4>
          </CardHeader>
          <CardBody className="py-1 ml-0 md:ml-4 md:p-3 w-auto">
            <h4>{journey.price}€</h4>
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
          <h4>username</h4>
        </CardFooter>
      </div>
    </Card>
  );
};

export default JourneyCard;
