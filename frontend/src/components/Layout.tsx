import Head from "next/head";
import { ReactNode, useContext, useEffect } from "react";
import CustomNavbar from "./customnavbar";
import BigFooter from "./BigFooter";
import { gql, useQuery } from "@apollo/client";
import { AuthContext } from "@/contexts/authContext";
import { User } from "@/types/user";

const GET_USER = gql`
  query Query {
    getUser {
      id
      role
      firstName
    }
  }
`;


export default function Layout({ children }: { children: ReactNode }) {
  const { setCurrentUser } = useContext(AuthContext);
  const { currentUser } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_USER);

  useEffect(() => {
    if (data && !loading) {
      setCurrentUser({ ...data.getUser });
    }
  }, [data, loading]);

  return (
    <>
      <Head>
        <title>Atypi'Car</title>
        <meta name="" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <CustomNavbar />
      <main className="py-24">{children}</main>
      <BigFooter />
    </>
  );
}
