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
  HStack,
  IconButton,
} from '@yamada-ui/react';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

//----------レンダリング時に値が消えて欲しくない変数を以下に格納---------
let searchID; //初期値設定不可、関数内への移動禁止 => 動かなくなります

//----------レンダリング時に値が消えて欲しくない変数を上に格納---------

function PartnerPage() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [selectFlag, setselectFlag] = useState([]); //選択されたボタンの色を変更するための配列
  const [answer, setanswer] = useState({}); //画面遷移時に渡す質問の回答

  useEffect(() => {
    async function get6PersonsData() {
      const response = await axios.get('/api/users/demo');
      setList(response.data);
    }
    get6PersonsData();
  }, []);

  //-------------------ボタンクリック/入力値変化時の関数はこの下に記載----------------------

  function selectPerson(e) {
    let selectArray = [];
    const id = Number(e.currentTarget.dataset.index);
    const keysToKeep = ['nickname', 'answer1', 'answer2', 'answer3', 'answer4', 'answer5'];

    const newObject = Object.fromEntries(
      Object.entries(list[id]).filter(([key]) => keysToKeep.includes(key)),
    );

    for (let i = 0; i < list.length; i++) {
      if (i === id) {
        selectArray.push(true);
      } else {
        selectArray.push(false);
      }
    }
    setselectFlag(selectArray);
    setanswer(newObject);
  }

  async function search() {
    const response = await axios.get(`/api/users/oneuser/${searchID}`);
    setselectFlag([]);
    setList(response.data);
  }

  function getSerachID(e) {
    searchID = e.currentTarget.value;
  }

  //-------------------ボタンクリック/入力値変化時の関数はこの上に記載----------------------

  return (
    <Container
      centerContent="true"
      padding="0">
      <div>PartnerPage</div>
      <Flex
        p="sm"
        rounded="md"
        bg="primary"
        color="white"
        width="80%">
        <Box
          width="80%"
          bg="whiteAlpha.400">
          <Input
            onChange={getSerachID}
            type="number"
            placeholder="検索用のIDを入力"
          />
        </Box>
        <Button
          width="20%"
          bg="whiteAlpha.200"
          onClick={search}>
          |🔍
        </Button>
      </Flex>

      {list.length !== 0 ? (
        list.map((obj, index) => {
          if (selectFlag[index] === true) {
            return (
              <Button
                key={obj.id}
                data-index={index}
                colorScheme="primary"
                onClick={selectPerson}>
                <Avatar name={obj.nickname} />

                {obj.nickname}
              </Button>
            );
          } else {
            return (
              <Button
                key={obj.id}
                data-index={index}
                onClick={selectPerson}>
                <Avatar name={obj.nickname} />
                {obj.nickname}
              </Button>
            );
          }
        })
      ) : (
        <Box>IDが存在しません</Box>
      )}

      <Button onClick={() => navigate('/rehearsal/input', { state: { data: answer } })}>
        実行
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
          onClick={() => window.location.reload()} //同じページの遷移はnavigateだと初期化されないので
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

      {/* <Grid
        marginTop="3"
        width="90%"
        templateColumns="repeat(2, 1fr)"
        gap="md">
        <For each={['primary', 'secondary', 'tertiary', 'warning']}>
          {(bg, index) => (
            <GridItem
              key={index}
              w="full"
              h="4xs"
              rounded="md"
              bg={bg}
            >
              色{bg}
            </GridItem>
          )}
        </For>
      </Grid> */}
    </Container>
  );
}

export default PartnerPage;
