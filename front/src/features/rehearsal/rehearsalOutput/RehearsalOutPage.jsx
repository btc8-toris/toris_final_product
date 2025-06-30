import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  For,
  Grid,
  GridItem,
  Input,
  Radio,
  RadioGroup,
  Avatar,
  FormControl,
  Label,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  Loading,
  HStack,
  IconButton,
} from '@yamada-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function RehearsalOutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const receiveAnswerInput = location.state?.data; //選択したユーザーのニックネームと質問の回答を前のページから受け継ぐ
  const [isLoading, setIsLoading] = useState(false);
  const test = [
    'きっと私はこう思ったの回答',
    'きっとこれは私に伝わったの回答',
    'もっとこうして伝えて欲しかったの回答',
  ]; //🚀開発中の一時的なもの。どこかで削除
  const fbFormat = [
    'きっと私はこう思った',
    'きっとこれは私に伝わった',
    'もっとこうして伝えて欲しかった',
  ];

  // ここでAIへ壁打ちする関数をマウント時に一回呼び出す
  useEffect(() => {
    const contactAI = async () => {
      try {
        setIsLoading(true); //開始時にローディング

        const res = await axios.post(
          '/api/llm/questions',
          {
            weather: '晴れ',
            maxTemperture: '40度',
            minTemperture: '25度',
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const resTextProposal = res.data.contactResult;
        console.log('💀 ~ contactAI ~ resTextProposal:', resTextProposal);
      } catch (error) {
        console.error('contactAI', error);
      } finally {
        setIsLoading(false); //完了時にローディングOFF
      }
    };

    contactAI();
  }, []);

  return (
    <Container
      centerContent="true"
      padding="0">
      <div>RehearsalOutPage</div>
      <Box>
        {' '}
        <Avatar
          size={'sm'}
          name={receiveAnswerInput.nickname}
        />
        {receiveAnswerInput.nickname}
      </Box>

      {isLoading ? (
        <Loading
          variant="oval"
          fontSize="6xl"
          color={`red.500`}
        />
      ) : (
        <>
          {test.map((elm, index) => {
            return (
              <Card key={index}>
                <CardHeader>
                  <Heading size="md">{fbFormat[index]}</Heading>
                </CardHeader>

                <CardBody>
                  <Text>{elm}</Text>
                </CardBody>
              </Card>
            );
          })}
        </>
      )}

      <HStack>
        <IconButton
          onClick={() => navigate('/home')}
          colorScheme="warning"
          size="md"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5">
              <path
                fillRule="evenodd"
                d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
        <IconButton
          onClick={() => navigate('/partner')}
          colorScheme="warning"
          size="md"
          icon={
            <img
              src="/person_search.png"
              alt="custom"
            />
          }
        />
        <IconButton
          onClick={() => navigate('/questionPage')}
          colorScheme="warning"
          size="md"
          icon={
            <img
              src="/psychiatry.png"
              alt="custom"
            />
          }
        />
      </HStack>
    </Container>
  );
}

export default RehearsalOutPage;
