

import isAuth from "@/components/secure/isAuth";
import { CancelButton, TagButton, TagButtonActive, ValidButton } from "@/components/theme/theme";
import { Button, Grid } from "@nextui-org/react";

function Home() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <>
      <Grid.Container gap={2}>
        <Grid>
          <CancelButton auto>
            Cancel Button
          </CancelButton>
        </Grid>
        <Grid>
          <TagButton auto>
            Tag Button
          </TagButton>
        </Grid>
        <Grid>
          <TagButtonActive auto>
            Tag Button Active
          </TagButtonActive>
        </Grid>
        <Grid>
          <ValidButton auto>
            Valid Button
          </ValidButton>
        </Grid>

      </Grid.Container>
    </>

  );
}

export default Home;