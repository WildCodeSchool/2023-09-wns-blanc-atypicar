import { AuthContext } from "@/contexts/authContext";
import { Category } from "@/types/category";
import { Vehicle } from "@/types/vehicle";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Image, Input, Select, SelectItem } from "@nextui-org/react";
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
category{
    id
    wording
    creationDate
}
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

export const GET_CATEGORIES = gql`
query Query {
  getCategories {
    id
    wording
    creationDate
  }
}
`;

export default function UpdateCarPage() {
    const router = useRouter();
    const { id } = router.query;
    const [vehicleInfos, setVehicleInfos] = useState<Vehicle | undefined>(undefined);
    const { currentUser } = useContext(AuthContext);
    const [updateVehicle] = useMutation(UPDATE_VEHICLE);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const { loading, error, data, refetch } = useQuery(GET_VEHICLE_INFOS, {
        variables: { getVehicleByIdId2: Number(id) },
        onCompleted: (data) => {
            setVehicleInfos(data.getVehicleById);
            setSelectedCategory(data.getVehicleById.category.id);
        }
    });

    const { loading: loadingCategories, error: errorCategories, data: dataCategories } = useQuery(GET_CATEGORIES, {
        onCompleted: (data) => {

            setCategories(data.getCategories);
        }

    });
    console.log("selectedCategory", selectedCategory)

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
                        userId: currentUser?.id,
                        categoryIds: selectedCategory
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
                <h2 className="text-2xl font-black text-center">Modifier mon véhicule</h2>
                <div className="flex flex-col md:flex-row justify-center items-center px-4 md:px-20 gap-6 md:gap-10">
                    <div className="w-auto md:w-1/2">
                        <Image
                            className="rounded-md object-cover w-full"
                            alt="Card background"
                            src="https://picsum.photos/500/300"
                        />
                    </div>
                    <div className="w-full md:w-[45vw] flex flex-col md:flex-row md:flex-wrap justify-center gap-6">

                        <Input
                            label="Nom"
                            value={vehicleInfos?.name}
                            onChange={(e) => setVehicleInfos({ ...vehicleInfos!, name: e.target.value })}
                            className="w-full md:w-[45%]"
                        />
                        <Input
                            label="Marque"
                            value={vehicleInfos?.brand}
                            onChange={(e) => setVehicleInfos({ ...vehicleInfos!, brand: e.target.value })}
                            className="w-full md:w-[45%]"
                        />


                        <Input
                            label="Modèle"
                            value={vehicleInfos?.model}
                            className="w-full md:w-[45%]"
                            onChange={(e) => setVehicleInfos({ ...vehicleInfos!, model: e.target.value })}
                        />
                        <Input
                            label="Nombre de places"
                            value={vehicleInfos?.seats.toString()}
                            className="w-full md:w-[45%]"
                            onChange={(e) => setVehicleInfos({ ...vehicleInfos!, seats: Number(e.target.value) })}
                        />

                        <Select
                            label="Type de véhicule"
                            className="w-full px-2"
                            selectedKeys={selectedCategory?.toString()}
                            onChange={(value) => setSelectedCategory(Number(value.target.value))}
                        >
                            {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.wording}
                                </SelectItem>
                            ))}
                        </Select>
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