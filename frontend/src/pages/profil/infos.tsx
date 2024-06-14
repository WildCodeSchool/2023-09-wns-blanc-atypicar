import { gql, useMutation, useQuery } from "@apollo/client";
import DefaultProfilPicture from "@/assets/images/default-profil-picture.png"
import { calculateAge, formatBirthDate } from "@/utils/formatDates";
import { Button, Divider, Image, Input, user } from "@nextui-org/react";
import { useEffect, useState } from "react";
import router from "next/router";
import { UserUpdate } from "@/types/userUpdate";



const GET_USER_PROFILE_INFOS = gql` 
query Query {
  getUserProfileInfos {
    id
    firstName
    lastName
    birthday
    email
    role
    creationDate
    verifiedLicense
    verifiedEmail
    picture
    description
    vehicle {
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
}
`;


export const DELETE_VEHCILE = gql`
mutation DeleteVehicle($deleteVehicleId: Float!) {
  deleteVehicle(id: $deleteVehicleId)
}
`;
const ProfilPage = () => {
    const [userInfos, setUserInfos] = useState<UserUpdate>();
    const { loading, error, data, refetch } = useQuery(GET_USER_PROFILE_INFOS, {
        onCompleted: (data) => {
            setUserInfos(data.getUserProfileInfos);
        },
    });

    useEffect(() => {
        refetch();
    }, [userInfos])




    const [deleteCard] = useMutation(DELETE_VEHCILE, {
        variables: {
            deleteVehicleId: parseInt(userInfos?.vehicle?.id.toString() ?? "")
        },
        onCompleted: () => {
            router.reload();
        }
    });


    return (
        <>
            <div className="flex flex-col w-full mt-8 gap-10">
                <div className="flex flex-row justify-center gap-40 items-center">
                    <div>
                        <h1 className="text-3xl font-black">{userInfos?.firstName}</h1>
                        <span>{calculateAge(userInfos?.birthday as string)} ans</span>
                    </div>
                    {userInfos?.picture ?
                        <img src={userInfos?.picture} alt="default profil picture" className="w-36 h-36 rounded-full object-contain border-double border-4 border-emerald-600" />
                        :
                        <Image src={DefaultProfilPicture.src} alt="default profil picture" className="w-36 h-36 rounded-full object-contain" width={100} height={100} />
                    }
                </div>

                <div className="flex flex-col gap-10 text-center">
                    <h2 className="text-2xl font-black">Mes informations</h2>
                    <div className="flex justify-center gap-20">
                        <span>Prénom: {userInfos?.firstName}</span>
                        <span>Nom: {userInfos?.lastName}</span>
                    </div>
                    <div className="flex justify-center gap-20 text-left">
                        <span>Date de naissance: {formatBirthDate(userInfos?.birthday as string)}</span>
                        <span>Email: {userInfos?.email}</span>
                    </div>
                    <div className="flex justify-center gap-20 text-left">
                        <span>Description: {userInfos?.description}</span>
                    </div>
                </div>

                <Button
                    type="submit"
                    color="primary"
                    className="flex justify-center text-white ml-auto mr-auto w-60"
                    radius="full"
                    onClick={() => router.push("/profil/update")}
                >Modifier mes informations</Button>
            </div>

            <Divider className="mt-10 w-2/4 mx-auto" />
            <div className="flex flex-col w-full mt-8 gap-10 px-4">
                <h2 className="text-2xl font-black text-center">Informations sur mon véhicule</h2>
                {userInfos?.vehicle ? (
                    <>
                        <div className="flex flex-col md:flex-row justify-center items-center px-4 md:px-10 gap-6 md:gap-4">
                            <div className="w-5/12 ">
                                <Image
                                    className="rounded-md object-cover w-full"
                                    alt="Card background"
                                    src={userInfos?.vehicle?.picture}
                                />
                            </div>
                            <div className="w-full md:w-[45vw] flex flex-col md:flex-row md:flex-wrap justify-center gap-6">

                                <Input
                                    label="Nom"
                                    value={userInfos?.vehicle?.name}
                                    isDisabled
                                    className="w-full md:w-[45%]"
                                />
                                <Input
                                    label="Marque"
                                    value={userInfos?.vehicle?.brand}
                                    isDisabled
                                    className="w-full md:w-[45%] "
                                />


                                <Input
                                    label="Modèle"
                                    value={userInfos?.vehicle?.model}
                                    isDisabled
                                    className="w-full md:w-[45%] "
                                />
                                <Input
                                    label="Nombre de places"
                                    value={userInfos?.vehicle?.seats.toString()}
                                    isDisabled
                                    className="w-full md:w-[45%] "
                                />

                                <Input
                                    label="Type de véhicule"
                                    value={userInfos?.vehicle?.category?.wording}
                                    isDisabled
                                    className="w-full px-2 mt-4 md:mt-0"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
                            <Button
                                type="submit"
                                color="primary"
                                className="flex justify-center text-white w-60"
                                radius="full"
                                onClick={() => router.push(`/profil/updatecar/${userInfos?.vehicle?.id}`)}
                            >
                                Modifier mon véhicule
                            </Button>
                            <Button
                                type="submit"
                                color="danger"
                                className="flex justify-center text-white w-60"
                                radius="full"
                                onClick={() => deleteCard()}
                            >
                                Supprimer mon véhicule
                            </Button>
                        </div>

                    </>
                ) : (
                    <>
                        <h3 className="text-center">Vous n'avez pas de véhicule renseigné sur votre profil.</h3>
                        <Button
                            type="submit"
                            color="primary"
                            className="flex justify-center text-white w-60 mx-auto  mt-4"
                            radius="full"
                            onClick={() => router.push(`/profil/addcar`)}
                        >
                            Ajouter un véhicule
                        </Button>
                    </>
                )}
            </div>



        </>
    )
}

export default ProfilPage;