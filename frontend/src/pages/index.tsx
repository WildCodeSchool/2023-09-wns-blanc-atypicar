

import isAuth from "@/components/secure/isAuth";
import { CancelButton, TagButton, TagButtonActive, ValidButton } from "@/components/theme/theme";
import { Button, Grid } from "@nextui-org/react";


function Home() {

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