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
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/header/Header';

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
      p="0">
      <Header title={'ひとり対話'} />
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

      <Footer onIndex={2} />
    </Container>
  );
}

export default RehearsalInPage;
