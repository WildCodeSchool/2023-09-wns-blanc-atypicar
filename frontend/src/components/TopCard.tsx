import { Card, CardBody } from "@nextui-org/react";
import { GoArrowRight } from "react-icons/go";

const TopCard = () => {
  return (
    <Card className="flex-row w-80 sm:w-80 h-20 ">
      <CardBody className="flex-row items-center justify-center py-2 gap-1 font-normal">
        <h4>Lille</h4>
        <GoArrowRight />
        <h4>Paris</h4>
      </CardBody>
    </Card>
  );
};

export default TopCard;
