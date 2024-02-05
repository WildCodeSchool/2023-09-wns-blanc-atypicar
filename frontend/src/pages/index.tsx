

import isAuth from "@/components/secure/isAuth";
import { CancelButton, TagButton, TagButtonActive, ValidButton } from "@/components/theme/theme";
import { Button, Grid } from "@nextui-org/react";
import Header from "../components/header";


function Home() {
  const handleSearch = (searchParams: any) => {
    // Handle search logic here
    console.log("Searching with:", searchParams);
  };

  return (
    <>
    <Header />
    </>

  );
}

export default Home;