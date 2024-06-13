import { AuthContext } from "@/contexts/authContext";
import { Category } from "@/types/category";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Input, Select, SelectItem, user } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FormEvent, useContext, useEffect, useState } from "react";


export const CREATE_VEHICLE = gql`
mutation CreateVehicle($vehicleData: CreateVehicleInputType!) {
  createVehicle(vehicleData: $vehicleData) {
    brand
    id
    model
    name
    picture
    seats
    category{
        id
        wording
        creationDate
  }
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

export default function AddCar() {
    const [newVehicle, setNewVehicle] = useState({
        name: "",
        brand: "",
        model: "",
        seats: 0,
        picture: "",
    });
    const [createVehicle] = useMutation(CREATE_VEHICLE);
    const router = useRouter();
    const { currentUser } = useContext(AuthContext);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const { data } = useQuery(GET_CATEGORIES, {
        onCompleted: (data) => {
            setCategories(data.getCategories);
        },
    });



    const handleSubmit = async (event: FormEvent): Promise<void> => {
        event.preventDefault();

        try {
            await createVehicle({
                variables: {
                    vehicleData: {
                        name: newVehicle.name,
                        brand: newVehicle.brand,
                        model: newVehicle.model,
                        seats: parseInt(newVehicle.seats.toString()),
                        picture: newVehicle.picture,
                        userId: currentUser?.id,
                        categoryIds: selectedCategory
                    },
                },
                onCompleted: (data) => {
                    router.push("/profil/infos");
                }
            });
        } catch (error) {

            console.error("Incident");


        };
    }
    console.log("selectedCategory", selectedCategory)

    useEffect(() => {
        if (newVehicle.seats > 20) {
            setNewVehicle({
                ...newVehicle,
                seats: 20,
            })
        }
    }, [newVehicle.seats])

    return (
        <div className="flex flex-col w-full mt-8 gap-10 justify-center items-center">
            <h2 className="text-2xl font-black text-center">Ajouter un véhicule</h2>
            < div className="flex md:flex-row justify-center flex-col md:flex-wrap gap-4 mt-[2rem] md:items-center md:mb-[2rem] w-full md:w-3/5 md:bg-[#EFF0F6] md:shadow-xl px-4 md:px-1 md:py-4">
                <Input
                    label="Nom"
                    value={newVehicle.name}
                    placeholder="Nom"
                    classNames={{
                        inputWrapper: "bg-white",
                    }}
                    onChange={(e) => {
                        setNewVehicle({
                            ...newVehicle,
                            name: e.target.value,
                        });
                    }}
                    className="md:w-1/3 w-full px-2"
                />
                <Input
                    label="Marque"
                    value={newVehicle.brand}
                    placeholder="Marque"
                    classNames={{
                        inputWrapper: "bg-white",
                    }}
                    onChange={(e) => {
                        setNewVehicle({
                            ...newVehicle,
                            brand: e.target.value,
                        });
                    }
                    }
                    className="md:w-1/3 w-full px-2"

                />
                <Input
                    label="Modèle"
                    value={newVehicle.model}
                    placeholder="Modèle"
                    classNames={{
                        inputWrapper: "bg-white",
                    }}
                    onChange={(e) => {
                        setNewVehicle({
                            ...newVehicle,
                            model: e.target.value,
                        });
                    }
                    }
                    className="md:w-1/3 w-full px-2"

                />
                <Input
                    label="Nombre de places"
                    value={newVehicle.seats.toString()}
                    placeholder="Nombre de places"
                    classNames={{
                        inputWrapper: "bg-white",
                    }}
                    onChange={(e) => {
                        setNewVehicle({
                            ...newVehicle,
                            seats: parseInt(e.target.value),
                        });
                    }}
                    type="number"
                    min={0}
                    max={20}
                    className="md:w-1/3 w-full px-2"

                />
                <Select
                    label="Type de véhicule"
                    selectedKeys={selectedCategory?.toString()}
                    onChange={(value) => {
                        setSelectedCategory(parseInt(value.target.value));
                    }}
                    className="md:w-1/3 w-full px-2"
                >
                    {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                            {category.wording}
                        </SelectItem>
                    ))}
                </Select>
                <Input
                    label="Photo"
                    type="file"
                    value={newVehicle.picture}
                    classNames={{
                        inputWrapper: "bg-white",
                    }}
                    onChange={(e) => {
                        setNewVehicle({
                            ...newVehicle,
                            picture: e.target.value,
                        });
                    }
                    }
                    className="md:w-2/3 w-full  px-2"
                />

            </div>
            <Button
                type="submit"
                onClick={handleSubmit}
                color="primary"
                className="flex justify-center text-white ml-auto mr-auto w-60"
                radius="full"
            >Ajouter mon véhicule</Button>



        </div >
    );
}   