import Head from "next/head";
import { ReactNode } from "react";


export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Head>
                <title> thegoodcorner </title>
                <meta name="" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="favicon.ico" />
            </Head>

            <main className="main-content">

                {children}

            </main>

        </>
    )
}