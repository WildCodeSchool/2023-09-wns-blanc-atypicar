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
            </Head>

            <Navbar />

            <main className="main-content">

                {children}

            </main>

        </>
    )
}