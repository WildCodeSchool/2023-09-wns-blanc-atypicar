import isAuth from "@/components/secure/isAuth";
// import {
//   CancelButton,
//   TagButton,
//   TagButtonActive,
//   ValidButton,
// } from "@/components/theme/theme";
import { Button } from "@nextui-org/button";

function Home() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <>
      <h1 className="font-monserrat">Hello </h1>
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

// const TagButton = styled(Button, {
//   borderRadius: "50px",
//   fontSize: "15px",

//   [`.${theme} &`]: {
//     color: "$blue",
//     backgroundColor: "$grey",
//     fontWeight: "medium",
//   },

//   "&:hover": {
//     backgroundColor: "$darkergrey",
//   },
// });

export default Home;
