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
  VStack,
  IconButton,
  Heading,
  HStack,
  InputGroup,
  InputRightElement,
} from '@yamada-ui/react';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Footer from '../../components/footer/Footer';
import searchIcon from '/search.svg';

//----------レンダリング時に値が消えて欲しくない変数を以下に格納---------
let searchID; //初期値設定不可、関数内への移動禁止 => 動かなくなります
const demoIniMember = [];
//----------レンダリング時に値が消えて欲しくない変数を上に格納---------

function PartnerPage() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [answer, setanswer] = useState(''); //画面遷移時に渡す質問の回答。本来はobjectだがuseeffectの初回マウントを回避させるために空文字を初期値にしている
  const [listFlag, setlistFlag] = useState(true); //ID入力中にリスト非表示にするためのフラグ true:表示　false:非表示

  useEffect(() => {
    async function get6PersonsData() {
      const response = await axios.get('/api/users/demo');
      for (let obj of response.data) {
        demoIniMember.push(obj);
      }
      setList(response.data);
    }
    get6PersonsData();
  }, []);

  useEffect(() => {
    if (answer) {
      navigate('/mode', { state: { data: answer } });
    }
  }, [answer]);

  //-------------------ボタンクリック/入力値変化時の関数はこの下に記載----------------------

  function selectPerson(e) {
    let selectArray = [];
    const id = Number(e.currentTarget.dataset.index);
    const keysToKeep = ['nickname', 'answer1', 'answer2', 'answer3', 'answer4', 'answer5'];

    const newObject = Object.fromEntries(
      Object.entries(list[id]).filter(([key]) => keysToKeep.includes(key)),
    );
    setanswer(newObject);
  }

  async function search() {
    const response = await axios.get(`/api/users/oneuser/${searchID}`);
    setList(response.data);
    setlistFlag(true);
  }

  function getSerachID(e) {
    searchID = Number(e.currentTarget.value);
    if (searchID !== 0) {
      setlistFlag(false);
    } else {
      setlistFlag(true);
      console.log('💀 ~ getSerachID ~ demoIniMember:', demoIniMember);

      setList(demoIniMember);
    }
  }

  //-------------------ボタンクリック/入力値変化時の関数はこの上に記載----------------------

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
          探す
        </Heading>
        <Avatar
          size="sm"
          marginLeft="230px"
          marginTop="5px"
          name=""
        />
      </Flex>

      <InputGroup
        maxW="315px"
        w="100%"
        mx="auto"
        borderRadius="full"
        overflow="hidden"
        height="42px">
        <Input
          onChange={getSerachID}
          variant="outline"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="ID検索"
          fontWeight="bold"
          _placeholder={{ color: 'gray.500' }}
          borderLeftRadius="full"
          borderRightRadius="0"
          borderWidth="3px"
          height="100%"
          invalid
          errorBorderColor="tertiary"
        />
        <InputRightElement
          p="0"
          h="100%"
          w="42px"
          pointerEvents="auto"
          zIndex={1}>
          <IconButton
            onClick={search}
            variant="link"
            color="white"
            backgroundColor="tertiary"
            size="sm"
            borderRadius="full"
            borderLeftRadius="0"
            w="42px"
            h="42px"
            icon={
              <img
                src={searchIcon}
                alt="search"
                width="30.74px"
                height="30.74px"
              />
            }
          />
        </InputRightElement>
      </InputGroup>

      {listFlag ? (
        <>
          <Box
            textAlign="left"
            width="100%">
            <Text
              fontSize="20px"
              paddingLeft="30px">
              ユーザーサンプル
            </Text>
          </Box>

          <VStack
            gap="sm"
            align="center">
            {list.map((obj, index) => {
              return (
                <Button
                  key={obj.id}
                  data-index={index}
                  height="50px"
                  width="315px"
                  variant="outline"
                  fontSize="14px"
                  sx={{
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                  }}
                  onClick={selectPerson}>
                  <Avatar
                    size="sm"
                    align="left"
                    name={obj.nickname}
                  />
                  {obj.nickname}
                </Button>
              );
            })}
          </VStack>
        </>
      ) : (
        ''
      )}

      <Footer onIndex={2} />
    </Container>
  );
}

export default PartnerPage;
