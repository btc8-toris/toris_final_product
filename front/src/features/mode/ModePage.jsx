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
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Header from '../../components/header/Header';
import { useLocation } from 'react-router-dom';
import BigAvatar from '../../components/Avatar/BigAvatar';
import { context } from '../../app/App';
import Footer from '../../components/footer/Footer';

function ModePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const receiveAnswer = location.state?.data; //選択したユーザーのニックネームと質問の回答を前のページから受け継ぐ
  const [sendAnswer, setsendAnswer] = useState({});
  const { user, BASE_URL } = useContext(context);

  useEffect(() => {
    async function addPairsId() {
      const response = await axios.get(`${BASE_URL}/api/pairs/${user.userId}`); //自分と会話したことがあるペアIDを全取得
      for (let obj of response.data) {
        if (obj.partner_id === receiveAnswer.id) {
          // receiveAnswer['pairId'] = 1;
          receiveAnswer['pairId'] = obj.id;

          break;
        }
      }
      setsendAnswer(receiveAnswer);
    }
    (async () => await addPairsId())();

    // addPairsId();
  }, []);

  return (
    <Container
      centerContent="true"
      color="tertiary"
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
      <Footer onIndex={0} />
    </Container>
  );
}

export default ModePage;
