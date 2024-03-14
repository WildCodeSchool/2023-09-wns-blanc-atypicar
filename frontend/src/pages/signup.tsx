import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Link,
} from "@nextui-org/react";

const SIGN_UP = gql`
  mutation SignUp($createUserType: CreateUserType!) {
    signUp(createUserType: $createUserType) {
      id
      firstName
      lastName
      birthday
      email
    }
  }
`;

const verifyPassword = (password: string, confirmPassword: string) =>
  password === confirmPassword;

export default function SignUpPage() {
  const router = useRouter();

  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");

  const [signUp] = useMutation(SIGN_UP, {
    variables: {
      createUserType: {
        lastName: lastName,
        firstName: firstName,
        email: email,
        password: password,
        birthday: birthday,
        creationDate: new Date(),
      },
    },
    onCompleted() {
      router.push("/signin");
    },
  });

  const handleSignUp = async () => {
    if (!verifyPassword(password, confirmPassword)) {
      console.error("Les mots de passe ne sont pas identiques.");
    }
    try {
      await signUp();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      data-testid="signup-form"
      className="flex flex-col items-center mt-[5rem]"
      onSubmit={(e) => {
        e.preventDefault();
        handleSignUp();
      }}
    >
      <Card className="p-6 w-3/5">
        <CardHeader>
          <h2 className="mb-5 font-bold text-lg text-center">
            Créer un compte
          </h2>
        </CardHeader>

        <CardBody className="flex flex-col gap-12">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-12">
            <Input
              data-testid="first-name"
              radius="full"
              type="text"
              label="Prénom"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <Input
              data-testid="last-name"
              radius="full"
              type="text"
              label="Nom de famille"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-12">
            <Input
              data-testid="password"
              radius="full"
              type="password"
              label="Mot de passe"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Input
              data-testid="password-confirmation"
              radius="full"
              type="password"
              label="Confirmation du mot de passe"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-12">
            <Input
              data-testid="email"
              radius="full"
              type="email"
              label="Adresse email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              data-testid="birthday-input"
              radius="full"
              type="date"
              name="endDate"
              label="Date de naissance"
              placeholder="dd - mm - yyyy"
              onChange={(e) => {
                setBirthday(e.target.value);
              }}
            />
          </div>
        </CardBody>
        <CardFooter className="flex justify-end gap-8 pt-8">
          <Button
            color="default"
            className="text-white md:px-10"
            radius="full"
            onClick={() => router.push("/")}
          >
            Annuler
          </Button>
          <Button
            data-testid="submit-signup"
            type="submit"
            color="primary"
            className="text-white md:px-10"
            radius="full"
          >
            S'inscrire
          </Button>
        </CardFooter>
      </Card>
      <div className="mt-8">
        <span>
          Vous avez déjà un compte ? <Link href="/signin">Se connecter</Link>
        </span>
      </div>
    </form>
  );
}
