import { gql, useQuery } from "@apollo/client";
import { Button, Image, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export const GET_VEHICLE_INFOS = gql`
query Query($getVehicleByIdId2: Float!) {
  getVehicleById(id: $getVehicleByIdId2) {
    id
    model
    brand
    name
    seats
    picture

  }
}
`;

export default function UpdateCarPage() {
    const router = useRouter();
    const { id } = router.query;
    const [vehicleInfos, setVehicleInfos] = useState();
    const { loading, error, data, refetch } = useQuery(GET_VEHICLE_INFOS, {
        variables: { getVehicleByIdId2: Number(id) },
        onCompleted: (data) => {
            setVehicleInfos(data.getVehicleById);
        }
    });


    useEffect(() => {
        refetch();
    }, [vehicleInfos])


    return (
        <>
            <div className="flex flex-col w-full mt-8 gap-10">
                <h2 className="text-2xl font-black text-center">Informations sur mon véhicule</h2>
                <div className="flex flex-col md:flex-row justify-center items-center px-20">
                    <div className="w-1/2">
                        <Image
                            className="rounded-md object-cover "
                            alt="Card background"
                            src="https://picsum.photos/500/300"
                        />
                    </div>
                    <div className="w-1/2 flex flex-col md:flex-wrap justify-center gap-20">
                        <div className="flex flex-wrap -mx-2">
                            <Input
                                label="Nom"
                                value={vehicleInfos?.name}

                                className="w-1/2 px-2"
                            />
                            <Input
                                label="Marque"
                                value={vehicleInfos?.brand}

                                className="w-1/2 px-2"
                            />
                        </div>
                        <div className="flex flex-wrap -mx-2 mt-4">
                            <Input
                                label="Modèle"
                                value={vehicleInfos?.model}

                                className="w-1/2 px-2"
                            />
                            <Input
                                label="Nombre de places"
                                value={vehicleInfos?.seats}

                                className="w-1/2 px-2"
                            />
                        </div>
                    </div>
                </div>
                <Button
                    type="submit"
                    color="primary"
                    className="flex justify-center text-white ml-auto mr-auto w-auto"
                    radius="full"
                    onClick={() => router.push(`/profil/infos`)}
                >Modifier les informations de mon véhicules</Button>
            </div>
        </>

    )
}