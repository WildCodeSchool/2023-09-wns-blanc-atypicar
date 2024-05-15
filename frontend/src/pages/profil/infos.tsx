import { gql, useQuery } from "@apollo/client";
import DefaultProfilPicture from "@/assets/images/default-profil-picture.png"
import { calculateAge, formatBirthDate } from "@/utils/formatDates";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import { UserUpdate } from "@/types/userUpdate";

const GET_USER_INFOS = gql`
    query Query {
        getUser {
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
        }
    }
`;

const ProfilPage = () => {
    const [userInfos, setUserInfos] = useState<UserUpdate>();
    const {loading, error, data, refetch } = useQuery(GET_USER_INFOS, {
        onCompleted: (data) => {
            setUserInfos(data.getUser);
          },
    });     

    useEffect(() => {
        refetch();
    }, [userInfos])

    return (
        <div className="flex flex-col w-full mt-8 gap-10">
            <div className="flex flex-row justify-center gap-40 items-center">
                <div>
                    <h1 className="text-3xl font-black">{userInfos?.firstName}</h1>
                    <span>{calculateAge(userInfos?.birthday as string)} ans</span>
                </div>
                {userInfos?.picture ?
                    <img src={userInfos?.picture} alt="default profil picture" className="w-36 h-36 rounded-full object-contain border-double border-4 border-emerald-600" />
                :
                    <Image src={DefaultProfilPicture} alt="default profil picture" className="w-36 h-36 rounded-full object-contain" width={100} height={100}/>
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

    )
}

export default ProfilPage;