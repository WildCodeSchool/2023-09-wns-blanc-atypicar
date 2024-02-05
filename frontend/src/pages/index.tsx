import JourneyCard from "@/components/JourneyCard";
import isAuth from "@/components/secure/isAuth";
import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/react";

function Home() {
  return (
    <>
      <h1 className="font-monserrat">Hello </h1>
      <Spacer y={8} />
      <JourneyCard />
      <Spacer y={8} />
      <Button color="default">Default</Button>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="default" radius="full" className="text-white">
        Tag button
      </Button>
    </>
  );
}

export default Home;
