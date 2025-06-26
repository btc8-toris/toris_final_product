import { Container, For, Grid, GridItem } from '@yamada-ui/react';
import React from 'react';

function PartnerPage() {
  return (
    <Container centerContent="true" padding="0" >
      <div>PartnerPage</div>
      <Grid
        marginTop="3"
        width="90%"
        templateColumns="repeat(2, 1fr)"
        gap="md">
        <For each={['primary', 'secondary', 'tertiary', 'warning']}>
          {(bg, index) => (
            <GridItem
              key={index}
              w="full"
              h="4xs"
              rounded="md"
              bg={bg}
            >
              色{bg}
            </GridItem>
          )}
        </For>
      </Grid>
    </Container>
  );
}

export default PartnerPage;
