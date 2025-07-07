import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import splashIcon from '/tact_192x192_kadomaru.png';
import { Container, Flex, Image } from '@yamada-ui/react';

function SplashPage() {
  const navigate = useNavigate();
  useState(() => {
    setTimeout(() => {
      navigate('/login');
    }, '4000');
  }, []);

  return (
    <Container centerContent="true" p='0'>
      <Flex
        direction="column"
        justify="center"
        height='100vh'>
        <Image
          src={splashIcon}
          alt="splashIcon"
        />
      </Flex>
    </Container>
  );
}

export default SplashPage;
