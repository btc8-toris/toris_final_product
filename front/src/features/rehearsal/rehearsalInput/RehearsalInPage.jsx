import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  Text,
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
  Textarea,
} from '@yamada-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/header/Header';
import SmallAvatar from '../../../components/Avatar/SmallAvatar';

function RehearsalInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const receiveAnswer = location.state?.data; //選択したユーザーのニックネームと質問の回答を前のページから受け継ぐ
  const [answerAndInput, setAnswerAndInput] = useState({});
  const [inputValue, setInputValue] = useState(''); //感情分析のSWを10文字以上入力時に有効になるようにするために追加

  //-------------------ボタンクリック/入力値変化時の関数はこの下に記載----------------------

  function getInput(e) {
    setInputValue(e.target.value);
    receiveAnswer['input'] = e.target.value; //もともとの回答に今回の入力情報を追加(オブジェクトにキーを追加してその値に入力)

    setAnswerAndInput(receiveAnswer); //次ページに渡すためStateを更新
  }

  //-------------------ボタンクリック/入力値変化時の関数はこの上に記載----------------------

  return (
    <Container
      color="tertiary"
      centerContent="true"
      p="0">
      <Header title={receiveAnswer.nickname} />

      {/* <SmallAvatar nickName={receiveAnswer.nickname} /> */}

      <Box
        marginTop="120px"
        paddingLeft="5px"
        align="left">
        <FormControl
          height="276px"
          width="315px">
          <Label fontSize="18px">相手に伝えたいこと</Label>
          <Textarea
            onChange={getInput}
            fontSize="17px"
            height="100%"
            width="100%"
            placeholder="10文字以上で入力してください"
          />
        </FormControl>
        <Button
          colorScheme="primary"
          height="40px"
          width="120px"
          marginTop="100px"
          marginLeft="195px"
          disabled={inputValue.length < 10}
          onClick={() => navigate('/rehearsal/output', { state: { data: answerAndInput } })}>
          感情分析
        </Button>
      </Box>

      <Footer onIndex={2} />
    </Container>
  );
}

export default RehearsalInPage;
