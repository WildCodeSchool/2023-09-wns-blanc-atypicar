import { UserUpdate } from "@/types/userUpdate";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Input, Avatar } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";

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

const UPDATE_USER_INFO = gql`
  mutation Mutation($user: UpdateUserType!) {
    updateProfile(user: $user) {
      firstName
      lastName
      birthday
      email
      picture
      description
    }
  }
`;

const UpdateProfilePage = () => {
  const [userInfos, setUserInfos] = useState<UserUpdate>();
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();

  const router = useRouter();
  useQuery(GET_USER_INFOS, {
    onCompleted: (data) => {
      setUserInfos(data.getUser);
    },
  });

  useEffect(() => {
    if (userInfos) {
      setEditableFields({
        firstName: userInfos.firstName,
        lastName: userInfos.lastName,
        birthday: userInfos.birthday,
        email: userInfos.email,
        picture: userInfos.picture,
        description: userInfos.description,
      });
    }
  }, [userInfos]);

  const [editableFields, setEditableFields] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    email: "",
    picture: "",
    description: "",
  });
  const [updateProfile] = useMutation(UPDATE_USER_INFO, {
    variables: {
      user: {
        firstName: editableFields.firstName,
        lastName: editableFields.lastName,
        birthday: editableFields.birthday,
        email: editableFields.email,
        picture: imageUrl,
        description: editableFields.description,
      },
    },
    onCompleted: () => {
      router.push("/profil/infos");
    },
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditableFields((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await updateProfile({ variables: editableFields });
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations:", error);
    }
  };
  console.log(editableFields)
  return (
    <div className="flex flex-col gap-10 mt-8 text-center">
      <h2>Modifier mes informations</h2>
      <div className="flex justify-center gap-20">
        <Input
          radius="full"
          type="text"
          label="Prénom"
          name="firstName"
          value={editableFields.firstName}
          onChange={(e) => {
            handleInputChange(e)
          }}
        />
        <Input
          radius="full"
          type="text"
          label="Nom"
          name="lastName"
          value={editableFields.lastName}
          onChange={(e) => {
            handleInputChange(e)
          }}
        />
      </div>
      <div className="flex justify-center gap-20 text-left">
        <Input
          radius="full"
          type="date"
          label="Date de naissance"
          name="birthday"

          value={editableFields.birthday}
          onChange={(e) => {
            handleInputChange(e)
          }}
        />
        <Input
          radius="full"
          type="email"
          label="Email"
          name="email"
          value={editableFields.email}
          onChange={(e) => {
            handleInputChange(e)
          }}
        />
      </div>
      <div className="flex justify-center gap-20 text-left">
        <Input
          radius="full"
          type="text"
          label="Description"
          name="description"
          value={editableFields.description}
          onChange={(e) => {
            handleInputChange(e)
          }}
        />
        <Input
          radius="full"
          type="text"
          label="Photo de profil"
          name="picture"
          value={editableFields.picture}
          onChange={(e) => {
            handleInputChange(e)
          }}
        />
      </div>

      <div className="flex flex-row justify-center gap-8">
        <Button
          type="submit"
          color="default"
          className="flex justify-center text-white w-60"
          radius="full"
          onClick={() => router.push('/profil/infos')}>
          Annuler
        </Button>
        <Button
          type="submit"
          color="primary"
          className="flex justify-center text-white w-60"
          radius="full"
          onClick={handleSubmit}
        >
          Valider
        </Button>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
