import { Button, Container, Flex } from '@yamada-ui/react';
import React from 'react';
import { useNavigate } from 'react-router';

function HomePage() {
  const navigate = useNavigate();
  return (
    <Container
      centerContent="true"
      padding="0"
      justifyContent="center"
      height="100vh">
      <Flex
        direction="row"
        justify="space-around"
        width="100%">
        <Button
          width="32"
          height="32"
          colorScheme='primary'
          onClick={()=>navigate("/partner")}>
            
          壁打ち
        </Button>
        <Button
          width="32"
          height="32"
          colorScheme='secondary'>
          話し合い
        </Button>
      </Flex>
    </Container>
  );
}

export default HomePage;
