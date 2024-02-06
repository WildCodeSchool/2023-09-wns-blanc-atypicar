import { Card, CardHeader, Image, Avatar, CardBody } from "@nextui-org/react";

const JourneyCard = () => {
  return (
    <Card className="flex-row min-w-96 max-w-80 h-44 ">
      <Image
        className="h-44 w-32 max-w-none rounded-r-none object-cover"
        alt="Card background"
        src="http://placekitten.com/g/200/200"
      />
      <div className="flex-col p-2">
        <CardHeader className="w-auto grid-cols-2 pb-0 pt-2 px-4 grid">
          <p className="text font-bold">23:00</p>
          <h4 className="font-bold">Arsy</h4>
          <small className="pl-2 text-default-500">9h50</small>
          <small></small>
          <p className="text font-bold">08:50</p>
          <h4 className="font-bold">Montpellier</h4>
        </CardHeader>
        <CardBody className="flex-col items-start py-2">
          <h4 className="font-bold">50,59€</h4>
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
