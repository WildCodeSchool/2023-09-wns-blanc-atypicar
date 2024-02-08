import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { useEffect, useState } from "react";
import { AuthContext } from "@/contexts/authContext";
import Layout from "@/components/Layout";
import { NextUIProvider } from "@nextui-org/react";
import "../globals.css";
import { Montserrat_Alternates } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';


const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, operation }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (err.extensions.code === "UNAUTHENTICATED") {
        localStorage.removeItem("token");
        location.replace("/");
      }
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(from([errorLink, httpLink])),
  cache: new InMemoryCache(),
});

const MontserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: "400",
});

function App({ Component, pageProps }: AppProps) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <NextUIProvider className={MontserratAlternates.className}>
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </AuthContext.Provider>
    </NextUIProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });