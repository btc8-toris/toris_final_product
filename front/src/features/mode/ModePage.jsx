import {
  Box,
  Button,
  Container,
  Text,
  Flex,
  For,
  Grid,
  GridItem,
  Input,
  Radio,
  RadioGroup,
  Avatar,
  HStack,
  IconButton,
  VStack,
} from '@yamada-ui/react';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Header from '../../components/header/Header';
import { useLocation } from 'react-router-dom';
import BigAvatar from '../../components/Avatar/BigAvatar';

function ModePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const receiveAnswer = location.state?.data; //選択したユーザーのニックネームと質問の回答を前のページから受け継ぐ
  const [sendAnswer, setsendAnswer] = useState(receiveAnswer);

  return (
    <Container
      centerContent="true"
      p="0">
      <Header title={'ユーザー選択'} />
      <VStack
        align="center"
        marginTop="150px">
        <BigAvatar nickName={receiveAnswer.nickname} />

        <Flex
          marginTop="50px"
          direction="row"
          justify="space-around"
          align="center"
          width="100%">
          <Button
            fullRounded={true}
            size="xl"
            colorScheme="primary"
            onClick={() => navigate('/rehearsal/input', { state: { data: sendAnswer } })}>
            ひとり対話
          </Button>

          <Button
            fullRounded={true}
            size="xl"
            colorScheme="primary"
            onClick={() => navigate('/actual/partnerlog', { state: { data: sendAnswer } })}>
            ふたり対話
          </Button>
        </Flex>
      </VStack>
    </Container>
  );
}

export default ModePage;
