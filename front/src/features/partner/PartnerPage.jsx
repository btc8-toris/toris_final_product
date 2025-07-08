import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  Input,
  Avatar,
  VStack,
  IconButton,
  Heading,
  InputGroup,
  InputRightElement,
} from '@yamada-ui/react';
import React from 'react';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Footer from '../../components/footer/Footer';
import searchIcon from '/search.svg';
import { context } from '../../app/App';

//----------レンダリング時に値が消えて欲しくない変数を以下に格納---------
const demoIniMember = [];
const color = ['#69C0D9', '#EDEB68', '#EDBE6D', '#BBBBFA', '#90EE90', '#F28989'];
//----------レンダリング時に値が消えて欲しくない変数を上に格納---------

function PartnerPage() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [answer, setanswer] = useState(''); //画面遷移時に渡す質問の回答。本来はobjectだがuseeffectの初回マウントを回避させるために空文字を初期値にしている
  const [listFlag, setlistFlag] = useState(true); //ID入力中にリスト非表示にするためのフラグ true:表示　false:非表示
  const [searchFlag, setsearchFlag] = useState(false); //検索結果表示中にサンプルユーザーを消すためのフラグ　true:非表示　false:表示
  const { user, BASE_URL } = useContext(context);
  const [noIDFlag, setnoIDFlag] = useState(true);
  const [oneColor, setColor] = useState('');
  const [searchID, setSearchID] = useState('');

  useEffect(() => {
    async function get6PersonsData() {
      demoIniMember.length = 0;
      const response = await axios.get(`${BASE_URL}/api/users/demo`);
      for (let obj of response.data) {
        demoIniMember.push(obj);
        console.log('💀 ~ get6PersonsData ~ demoIniMember:', demoIniMember);
      }

      setList(response.data);
    }
    (async () => await get6PersonsData())();

    // get6PersonsData();
  }, []);

  useEffect(() => {
    console.log('💀 ~ useEffect ~ searchID:', searchID);
    switch (searchID) {
      case 1001:
        setColor('#69C0D9');
        break;

      case 1002:
        setColor('#EDEB68');
        break;

      case 1003:
        setColor('#EDBE6D');
        break;

      case 1004:
        setColor('#BBBBFA');
        break;

      case 1005:
        setColor('#90EE90');
        break;

      case 1006:
        setColor('#F28989');
        break;
      default:
        setColor('#c4c4c4');
    }
  }, [searchID]);

  useEffect(() => {
    if (answer) {
      console.log('💀 ~ useEffect ~ answer:', answer);

      navigate('/mode', { state: { data: answer } });
    }
  }, [answer]);

  //-------------------ボタンクリック/入力値変化時の関数はこの下に記載----------------------

  async function selectPerson(e) {
    const id = Number(e.currentTarget.dataset.index);
    const keysToKeep = ['id', 'nickname', 'answer1', 'answer2', 'answer3', 'answer4', 'answer5'];
    const newObject = Object.fromEntries(
      Object.entries(list[id]).filter(([key]) => keysToKeep.includes(key)),
    );

    const response = await axios.get(`${BASE_URL}/api/pairs/${user.userId}`);

    const matchId = response.data.filter((obj) => obj.partner_id === newObject.id);

    if (matchId.length === 0) {
      await axios.post(
        `${BASE_URL}/api/pairs`,
        {
          user_id: user.userId,
          partner_id: newObject.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    setanswer(newObject);
  }

  async function search() {
    const response = await axios.get(`${BASE_URL}/api/users/oneuser/${searchID}`);
    if (response.data.length === 0) {
      setnoIDFlag(false);
    } else {
      setnoIDFlag(true);
    }
    setList(response.data);
    setlistFlag(true);
    setsearchFlag(true);
  }

  function getSerachID(e) {
    setnoIDFlag(true);
    setSearchID(Number(e.currentTarget.value));
    if (searchID !== 0) {
      setlistFlag(false);
    } else {
      setList(demoIniMember);
      setlistFlag(true);
      setsearchFlag(false);
    }
  }

  //-------------------ボタンクリック/入力値変化時の関数はこの上に記載----------------------
  return (
    <Container
      color="tertiary"
      centerContent="true"
      p="0">
      <Flex
        direction="row"
        width="100%"
        height="52px"
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
          bg="#c4c4c4"
          color="tertiary"
          name={user.nickName}
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

      {
        listFlag === true && noIDFlag === true ? (
          <>
            <Box
              textAlign="left"
              width="100%">
              {searchFlag ? (
                ''
              ) : (
                <Text
                  fontSize="20px"
                  paddingLeft="30px">
                  ユーザーサンプル
                </Text>
              )}
            </Box>
            {searchFlag ? (
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
                        bg={oneColor}
                        color="tertiary"
                        name={obj.nickname}
                      />
                      {obj.nickname}
                    </Button>
                  );
                })}
              </VStack>
            ) : (
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
                        bg={color[index]}
                        color="tertiary"
                        name={obj.nickname}
                      />
                      {obj.nickname}
                    </Button>
                  );
                })}
              </VStack>
            )}
          </>
        ) : //三項演算子の後半開始
        noIDFlag ? (
          ''
        ) : (
          <Box
            align="center"
            marginTop="100px">
            <Text fontSize="18px">入力されたIDでは見つかりませんでした</Text>
            <Text fontSize="14px">IDに間違いがないかご確認ください。</Text>
          </Box>
        )

        // '' //三項演算子の後半終了
      }

      <Footer onIndex={2} />
    </Container>
  );
}

export default PartnerPage;
