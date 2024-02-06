import { Journey } from "@/types/journey";
import { Card, CardHeader, Image, Avatar, CardBody } from "@nextui-org/react";

type JourneyCardProps = {
  journey: Journey;
};

const JourneyCard = ({ journey }: JourneyCardProps) => {
  const FormatDate = (date: string) => {
    let dateObj = new Date(date);
    return dateObj.toLocaleTimeString("fr-FR", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInSeconds = (end.getTime() - start.getTime()) / 1000;
    const hours = Math.floor(differenceInSeconds / 3600);
    const minutes = Math.floor((differenceInSeconds % 3600) / 60);
    return `${formatTime(hours)}h${formatTime(minutes)}`;
  };

  const formatTime = (time: number) => time.toString().padStart(2, "0");

  return (
    <Card className="flex-row min-w-96 max-w-80 h-44 ">
      <Image
        className="h-44 w-32 max-w-none rounded-r-none object-cover"
        alt="Card background"
        src="http://placekitten.com/g/200/200"
      />
      <div className="flex-col p-2">
        <CardHeader className="w-auto grid-cols-2 pb-0 pt-2 px-4 grid">
          <p className="text font-bold">{FormatDate(journey.startDate)}</p>
          <h4 className="font-bold">{journey.startingPoint}</h4>
          <small className="pl-2 text-default-500">
            {calculateDuration(journey.startDate, journey.endDate)}
          </small>
          <small></small>
          <p className="text font-bold">{FormatDate(journey.endDate)}</p>
          <h4 className="font-bold">{journey.arrivalPoint}</h4>
        </CardHeader>
        <CardBody className="flex-col items-start py-2">
          <h4 className="font-bold">{journey.price} €</h4>
          <div className="grid grid-cols-2 items-center w-full pt-2">
            <Avatar
              isBordered
              as="button"
              color="success"
              size="md"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
            <h4 className="font-bold">Mohamed</h4>
          </div>
        </CardBody>
      </div>
    </Card>
  );
};

export default JourneyCard;
