import { AuthContext } from "@/contexts/authContext";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { errorToast, successToast } from "@/components/Toast";


const SIGN_IN = gql`
  mutation Login($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;

export default function SignInPage() {
  const { setAuthenticated, setCurrentUser, currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const token = localStorage.getItem("token");


  useEffect(() => {
    if (token) {
      router.push("/");
    }
  });
  const [signIn] = useMutation(SIGN_IN, {
    variables: {
      email,
      password,
    },
    onError(error) {

      console.error("Erreur lors de la connexion :", error.message);

      errorToast("Une erreur est survenue lors de la connexion.");
    },
    onCompleted(data: any) {

      localStorage.setItem("token", data.login);
      setAuthenticated(true);
      successToast("Vous êtes connecté.");
      router.push("/");

    },
  });

  return (
    <div className="flex flex-col items-center mt-8">
      <Card className="p-6 w-5/5">
        <CardHeader>
          <h2 className="mb-5 font-bold text-lg text-center">Se connecter</h2>
        </CardHeader>

        <CardBody className="flex flex-col">
          <div className="flex flex-col gap-8">
            <Input
              radius="full"
              type="email"
              label="Adresse email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              radius="full"
              type="password"
              label="Mot de passe"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-12"></div>
        </CardBody>
        <CardFooter className="flex justify-end gap-8 pt-8">
          <Button
            type="submit"
            color="primary"
            className="text-white md:px-10"
            radius="full"
            onClick={() => signIn()}
          >
            Se connecter
          </Button>
          <Button
            color="default"
            className="text-white md:px-10"
            radius="full"
            onClick={() => router.push("/")}
          >
            Annuler
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
