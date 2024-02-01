

import isAuth from "@/components/secure/isAuth";
import { Button, Grid } from "@nextui-org/react";

function Home() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <>
      <Grid.Container gap={2}>
        <Grid>
          <Button color="primary" auto>
            Primary
          </Button>
        </Grid>
        <Grid>
          <Button color="secondary" auto>
            Secondary
          </Button>
        </Grid>
        <Grid>
          <Button color="success" auto>
            Success
          </Button>
        </Grid>
        <Grid>
          <Button color="warning" auto>
            Warning
          </Button>
        </Grid>
        <Grid>
          <Button color="error" auto>
            Error
          </Button>
        </Grid>
        <Grid>
          <Button color="gradient" auto>
            Gradient
          </Button>
        </Grid>
      </Grid.Container>
    </>

  );
}

export default Home;