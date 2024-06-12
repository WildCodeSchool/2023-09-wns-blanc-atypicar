import { AuthContext } from "@/contexts/authContext";
import { Vehicle } from "@/types/vehicle";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Image, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FormEvent, useContext, useEffect, useState } from "react";
import { RiCoinsLine } from "react-icons/ri";


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

export const UPDATE_VEHICLE = gql`
mutation Mutation($vehicleData: CreateVehicleInputType!, $updateVehicleId: Float!) {
  updateVehicle(vehicleData: $vehicleData, id: $updateVehicleId) {
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
    const [vehicleInfos, setVehicleInfos] = useState<Vehicle>();
    const { currentUser } = useContext(AuthContext);

    const { loading, error, data, refetch } = useQuery(GET_VEHICLE_INFOS, {
        variables: { getVehicleByIdId2: Number(id) },
        onCompleted: (data) => {
            setVehicleInfos(data.getVehicleById);
        }
    });


    const [updateVehicle] = useMutation(UPDATE_VEHICLE);
    console.log(vehicleInfos)
    const handleSubmit = async (event: FormEvent): Promise<void> => {
        event.preventDefault();

        try {
            await updateVehicle({
                variables: {
                    vehicleData: {
                        name: vehicleInfos?.name,
                        brand: vehicleInfos?.brand,
                        model: vehicleInfos?.model,
                        seats: parseInt(vehicleInfos?.seats?.toString() ?? ''),
                        picture: vehicleInfos?.picture,
                        userId: currentUser?.id
                    },
                    updateVehicleId: Number(id)
                },
                onCompleted: (data) => {
                    router.push("/profil/infos");
                }
            });
        } catch (error) {

            console.error("Incident");


        };
    }

    useEffect(() => {
        refetch();
    }, [vehicleInfos])


    return (
        <>
            <div className="flex flex-col w-full mt-8 gap-10">
                <h2 className="text-2xl font-black text-center">Modi sur mon véhicule</h2>
                <div className="flex flex-col md:flex-row justify-center items-center px-20">
                    <div className="w-1/2">
                        <Image
                            className="rounded-md object-cover w-full "
                            alt="Card background"
                            src="https://picsum.photos/500/300"
                        />
                    </div>
                    <div className="w-1/2 flex flex-col md:flex-wrap justify-center gap-20">
                        <div className="flex flex-wrap -mx-2">
                            <Input
                                label="Nom"
                                value={vehicleInfos?.name}
                                onChange={(e) => setVehicleInfos({ ...vehicleInfos, name: e.target.value })}
                                className="w-1/2 px-2"
                            />
                            <Input
                                label="Marque"
                                value={vehicleInfos?.brand}
                                onChange={(e) => setVehicleInfos({ ...vehicleInfos, brand: e.target.value })}
                                className="w-1/2 px-2"
                            />
                        </div>
                        <div className="flex flex-wrap -mx-2 mt-4">
                            <Input
                                label="Modèle"
                                value={vehicleInfos?.model}
                                className="w-1/2 px-2"
                                onChange={(e) => setVehicleInfos({ ...vehicleInfos, model: e.target.value })}
                            />
                            <Input
                                label="Nombre de places"
                                value={vehicleInfos?.seats.toString()}
                                className="w-1/2 px-2"
                                onChange={(e) => setVehicleInfos({ ...vehicleInfos, seats: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <Button
                    type="submit"
                    color="primary"
                    className="flex justify-center text-white ml-auto mr-auto w-auto"
                    radius="full"
                    onClick={handleSubmit}
                >Modifier les informations de mon véhicules</Button>
            </div>
        </>

    )
}