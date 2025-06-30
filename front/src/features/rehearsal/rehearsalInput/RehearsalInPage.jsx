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
  HStack,
  IconButton,
} from '@yamada-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function RehearsalInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const receiveAnswer = location.state?.data; //選択したユーザーのニックネームと質問の回答を前のページから受け継ぐ
  const [answerAndInput, setAnswerAndInput] = useState({});

  //-------------------ボタンクリック/入力値変化時の関数はこの下に記載----------------------

  function getInput(e) {
    receiveAnswer['input'] = e.target.value; //もともとの回答に今回の入力情報を追加(オブジェクトにキーを追加してその値に入力)
    setAnswerAndInput(receiveAnswer); //次ページに渡すためStateを更新
  }

  //-------------------ボタンクリック/入力値変化時の関数はこの上に記載----------------------

  return (
    <Container
      centerContent="true"
      padding="0">
      <div>RehearsalInPage</div>
      <Box>
        {' '}
        <Avatar
          size={'sm'}
          name={receiveAnswer.nickname}
        />
        {receiveAnswer.nickname}
      </Box>

      <Box>
        <FormControl label="相手に伝えたいこと">
          <Input
            onChange={getInput}
            type="email"
            placeholder=""
          />
        </FormControl>
      </Box>
      <Button onClick={() => navigate('/rehearsal/output', { state: { data: answerAndInput } })}>
        感情分析
      </Button>

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

export default RehearsalInPage;
