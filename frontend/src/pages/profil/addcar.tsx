import { AuthContext } from "@/contexts/authContext";
import { Category } from "@/types/category";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Input, Select, SelectItem, user } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useContext, useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import NoPicture from "@/assets/images/no-picture.png";
import Image from "next/image";



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
    const [file, setFile] = useState<File>();
    const [imageUrl, setImageUrl] = useState<string>();
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
                        picture: imageUrl,
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

    useEffect(() => {
        if (newVehicle.seats > 20) {
            setNewVehicle({
                ...newVehicle,
                seats: 20,
            })
        }
    }, [newVehicle.seats])


    const loadPicture = async (e: any) => {
        e.preventDefault();
        const url = "http://localhost:8000/upload";

        if (file) {
            const formData = new FormData();
            formData.append("file", file, file?.name);
            try {
                const response = await axios.post(url, formData);
                setImageUrl(response.data.filename);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="flex flex-col w-full mt-8 gap-10 justify-center items-center">
            <h2 className="text-2xl font-black text-center">Ajouter un véhicule</h2>
            < div className="flex rounded-xl md:flex-row justify-center flex-col md:flex-wrap gap-4 mt-[2rem] md:items-center md:mb-[2rem] w-full md:w-3/5 md:bg-[#EFF0F6] md:shadow-xl px-4 md:px-7 md:py-8">
                <div className="w-[50vw] h-[35vh] mx-auto flex justify-center items-center">
                    {imageUrl ? (
                        <img
                            className="rounded-md object-cover w-full h-full"
                            alt="Card background"
                            src={imageUrl}
                        />
                    ) : (
                        <Image
                            className="rounded-md object-cover "
                            alt="Card background"
                            src={NoPicture}
                            width={300}
                            height={200}
                        />
                    )}
                </div>
                < div className="flex md:flex-row justify-center flex-col md:flex-wrap gap-4">

                    <Input
                        label="Nom"
                        value={newVehicle.name}
                        placeholder="Nom"

                        onChange={(e) => {
                            setNewVehicle({
                                ...newVehicle,
                                name: e.target.value,
                            });
                        }}
                        className="md:w-[25vw] w-full px-2"
                    />
                    <Input
                        label="Marque"
                        value={newVehicle.brand}
                        placeholder="Marque"

                        onChange={(e) => {
                            setNewVehicle({
                                ...newVehicle,
                                brand: e.target.value,
                            });
                        }
                        }
                        className="md:w-[25vw] w-full px-2"

                    />
                    <Input
                        label="Modèle"
                        value={newVehicle.model}
                        placeholder="Modèle"

                        onChange={(e) => {
                            setNewVehicle({
                                ...newVehicle,
                                model: e.target.value,
                            });
                        }
                        }
                        className="md:w-[25vw] w-full px-2"

                    />
                    <Input
                        label="Nombre de places"
                        value={newVehicle.seats.toString()}
                        placeholder="Nombre de places"

                        onChange={(e) => {
                            setNewVehicle({
                                ...newVehicle,
                                seats: parseInt(e.target.value),
                            });
                        }}
                        type="number"
                        min={0}
                        max={20}
                        className="md:w-[25vw] w-full px-2"

                    />
                    <Select
                        label="Type de véhicule"
                        selectedKeys={selectedCategory?.toString()}
                        onChange={(value) => {
                            setSelectedCategory(parseInt(value.target.value));
                        }}

                        className="md:w-[50vw] w-full px-2"
                    >
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                                {category.wording}
                            </SelectItem>
                        ))}
                    </Select>
                    <div className=" w-full md:w-[50vw] flex flex-col md:flex-row gap-4 items-center justify-center">
                        <Input
                            radius="sm"
                            type="file"
                            name="picture"
                            onChange={(e) => e.target.files && setFile(e.target.files[0])}
                        />
                        <Button
                            color="primary"
                            onClick={loadPicture}
                            className="text-white w-14 h-14  p-0"
                        >
                            <FaImage className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
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