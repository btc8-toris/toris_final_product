import { Button, Container, Flex } from '@yamada-ui/react';
import React from 'react';
import { useNavigate } from 'react-router';

function HomePage() {
  const navigate = useNavigate();
  console.log(import.meta.env.VITE_SOME_KEY) // "123"
  return (
    <Container
      centerContent="true"
      padding="0"
      justifyContent="center"
      height="100vh">
      {/* <Flex
        direction="column"
        justify="space-around"
        width="100%"> */}
        <Button
          width="75%"
          height="20"
          colorScheme='secondary'
          onClick={()=>navigate("/partner")}>
          プロフィール作成
        </Button>
        <Button
          width="75%"
          height="20"
          colorScheme='primary'
          onClick={()=>navigate("/partner")}>
          壁打ち
        </Button>
        <Button
          width="75%"
          height="20"
          colorScheme='primary'>
          話し合い
        </Button>
      {/* </Flex> */}
    </Container>
  );
}

export default HomePage;
