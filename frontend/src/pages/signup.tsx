import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Link,
} from "@nextui-org/react";
import { errorToast, successToast } from "@/components/Toast";
import { SIGN_UP } from "@/graphql/client";
import { UserInput } from "@/types/user";

export default function SignUpPage() {
  const router = useRouter();

  const [newUser, setNewUser] = useState<UserInput | undefined>();
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const isInvalidEmail = (value: string | undefined) => {
    if (value) {
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return !regex.test(value);
    }
    return false;
  };
  const isInvalidPassword = useMemo(() => {
    if (newUser?.password && newUser.password && confirmPassword) {
      return newUser.password !== confirmPassword;
    }
  }, [newUser?.password, confirmPassword]);

  const [signUp] = useMutation(SIGN_UP, {
    variables: {
      createUserType: {
        lastName: newUser?.lastName,
        firstName: newUser?.firstName,
        email: newUser?.email,
        password: newUser?.password,
        birthday: newUser?.birthday,
        creationDate: new Date(),
      },
    },
    onCompleted() {
      successToast("Inscription réussie.");
      router.push("/signin");
    },
    onError() {
      errorToast("Une erreur s'est produite lors de l'inscription.");
    },
  });

  const isFormValid = () => {
    return (
      newUser?.firstName &&
      newUser?.lastName &&
      newUser?.email &&
      newUser?.password &&
      newUser?.birthday &&
      !isInvalidPassword &&
      !isInvalidEmail(newUser?.email)
    );
  };

  const handleSignUp = async () => signUp();

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
              value={newUser?.firstName}
              onChange={(e) => {
                setNewUser({ ...newUser, firstName: e.target.value });
              }}
              isRequired
            />
            <Input
              data-testid="last-name"
              radius="full"
              type="text"
              label="Nom de famille"
              onChange={(e) => {
                setNewUser({ ...newUser, lastName: e.target.value });
              }}
              value={newUser?.lastName}
              isRequired
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-12">
            <Input
              data-testid="password"
              radius="full"
              type="password"
              label="Mot de passe"
              onChange={(e) => {
                setNewUser({ ...newUser, password: e.target.value });
              }}
              isRequired
              isInvalid={!!newUser?.password && newUser?.password?.length < 8}
              errorMessage={
                newUser?.password &&
                newUser?.password?.length < 8 &&
                "Le mot de passe doit contenir au moins 8 caractères."
              }
              value={newUser?.password}
            />
            <Input
              data-testid="password-confirmation"
              radius="full"
              type="password"
              label="Confirmation du mot de passe"
              isInvalid={isInvalidPassword}
              errorMessage={
                isInvalidPassword && "Les mots de passe ne correspondent pas."
              }
              onValueChange={setConfirmPassword}
              isRequired
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-12">
            <Input
              data-testid="email"
              radius="full"
              type="email"
              isInvalid={isInvalidEmail(newUser?.email)}
              errorMessage={
                isInvalidEmail(newUser?.email) && "Adresse email invalide."
              }
              label="Adresse email"
              onChange={(e) => {
                setNewUser({ ...newUser, email: e.target.value });
              }}
              isRequired
            />
            <Input
              data-testid="birthday-input"
              radius="full"
              type="date"
              name="endDate"
              label="Date de naissance"
              placeholder="dd - mm - yyyy"
              onChange={(e) => {
                setNewUser({ ...newUser, birthday: e.target.value });
              }}
              isRequired
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
            isDisabled={!isFormValid()}
          >
            S&apos;inscrire
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
