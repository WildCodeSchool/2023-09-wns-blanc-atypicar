import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";

const CategoryCard = () => {
  return (
    <Card className="flex-col  max-w-80 p-2" shadow="none">
      <CardHeader>
        <Image
          className="  w-screen object-cover h-26"
          alt="Card background"
          src="https://picsum.photos/200/200"
        />
      </CardHeader>
      <CardBody className="flex-col items-center justify-center py-2 gap-1">
        <h4 className="font-medium text-base font-montserrat text-center">
          Vivez le voyage le plus fou de votre vie
        </h4>
        <h4 className="font-normal font-montserrat text-center text-sm text-gray-400">
          Découvrez nos moyens de déplacement les plus atypique
        </h4>
        <Link
          href="#"
          className="font-bold font-montserrat text-center text-sm text-default "
        >
          {" "}
          Je réserve
        </Link>
      </CardBody>
    </Card>
  );
};

export default CategoryCard;
