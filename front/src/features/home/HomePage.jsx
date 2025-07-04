import {
  Button,
  Container,
  Flex,
  Heading,
  Avatar,
  Box,
  Text,
  rgbaTo,
  VStack,
} from '@yamada-ui/react';
import React from 'react';
import { useNavigate } from 'react-router';
import Footer from '../../components/footer/Footer';
import { context } from '../../app/App';
import { useEffect, useState, useContext } from 'react';

function HomePage() {
  const navigate = useNavigate();
  const { user } = useContext(context);

  console.log(import.meta.env.VITE_SOME_KEY) // "123"
  return (
    <Container
      centerContent="true"
      p="0">
      <Flex
        direction="row"
        width="100%"
        align="center">
        <Heading
          fontSize="28px"
          marginLeft="30px">
          ホーム
        </Heading>
        <Avatar
          size="sm"
          marginLeft="203px"
          marginTop="5px"
          name={user.nickName}
        />
      </Flex>

      <VStack
        align="left"
        marginLeft="25px">
        <Box
          width="203px"
          display="flex"
          height="76px"
          align="center"
          justifyContent="center"
          flexDirection="column"
          marginTop="10px"
          backgroundColor="rgba(255, 150, 115, 0.3)">
          <Text fontSize="20px">あなたの価値観ID</Text>
          <Text fontSize="15px">⚠️価値観が未設定です</Text>
        </Box>
      </VStack>
      <Footer onIndex={1} />
    </Container>
  );
}

export default HomePage;
