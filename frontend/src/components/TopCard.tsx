import { Card, CardHeader, Image, Avatar, CardBody } from "@nextui-org/react";
import { GoArrowRight } from "react-icons/go";

const TopCard = () => {
    return (
        <Card className="flex-row w-80 sm:w-80 h-20 ">

            <CardBody className="flex-row items-center justify-center py-2 gap-1">
                <h4 className="font-normal">Lille</h4>
                <GoArrowRight />
                <h4 className="font-normal">Paris</h4>
            </CardBody>

        </Card>
    );
};

export default TopCard;
