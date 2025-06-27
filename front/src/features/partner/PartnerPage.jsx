import { Box, Container, Flex, For, Grid, GridItem, Input } from '@yamada-ui/react';
import React from 'react';

function PartnerPage() {
  return (
    <Container centerContent="true" padding="0" >
      <div>PartnerPage</div>
      <Flex p="sm" rounded="md" bg="primary" color="white" width='80%'>
        <Box width='80%' bg='whiteAlpha.400'>
        <Input placeholder="basic" />
        </Box>
        <Box width='20%' bg='whiteAlpha.200'>|</Box>

      </Flex>
      {/* <Grid
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
      </Grid> */}
    </Container>
  );
}

export default PartnerPage;
