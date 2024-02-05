import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "./navbar";

export default function Layout({ children }: { children: ReactNode }) {
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

      <Navbar />

      <main className="main-content">{children}</main>
    </>
  );
}
