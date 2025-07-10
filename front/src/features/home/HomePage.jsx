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
  Accordion,
  AccordionItem,
  Icon,
  Image,
  IconButton,
  HStack,
} from '@yamada-ui/react';
import React from 'react';
import { useNavigate } from 'react-router';
import Footer from '../../components/footer/Footer';
import { context } from '../../app/App';
import { useEffect, useState, useContext } from 'react';
import warningIcon from '/warning.svg';
import axios from 'axios';
import copyIcon from '/copy_icon.svg';
import { format } from 'date-fns';
import { Clock4Icon } from '@yamada-ui/lucide';

function HomePage() {
  const navigate = useNavigate();
  const { user, BASE_URL } = useContext(context);
  const [circle, setCircle] = useState(0);
  const [copied, setCopied] = useState(false);
  const [myID, setMyID] = useState(null);
  const [talkPersons, setTalkPersons] = useState([]);
  const [waitingItems, setWaitingItems] = useState([]);
  const [answer, setanswer] = useState(''); //最近話した人からの画面遷移時に渡す質問の回答。本来はobjectだがuseeffectの初回マウントを回避させるために空文字を初期値にしている
  const [answerWaiting, setAnswerWaiting] = useState(''); //フィードバック待ちからの画面遷移時に渡す質問の回答。本来はobjectだがuseeffectの初回マウントを回避させるために空文字を初期値にしている

  let setIconFlag = 0;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(myID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2秒後にメッセージを消す
    } catch (err) {
      console.error('コピーに失敗しました:', err);
    }
  };

  //--------------初回読み込み時にのみ作動するuseefect一覧開始-------------------------
  useEffect(() => {
    async function getMySearchID(id) {
      const response = await axios.get(`${BASE_URL}/api/users/myInfo/${id}`);

      if (response.data[0].search_id === null || response.data[0].search_id === undefined) {
        setIconFlag = 4;
        setCircle(setIconFlag);
      } else {
        setIconFlag = 1;
        setMyID(response.data[0].search_id);
        setCircle(setIconFlag);
      }
    }
    (async () => await getMySearchID(user.userId))();
  }, []);

  //---------------最近話した人の取得------------------------
  useEffect(() => {
    async function getTalkPersons(id) {
      const preTalkPersons = [];
      const response = await axios.get(`${BASE_URL}/api/conversations/recentpair/${id}`);
      if (response.data.length > 1) {
        for (const obj of response.data) {
          const temporary = await axios.get(`${BASE_URL}/api/users/myInfo/${obj.partner_id}`);
          preTalkPersons.push(temporary.data[0]);
        }
      } else if (response.data.length === 1) {
        const temporary = await axios.get(
          `${BASE_URL}/api/users/myInfo/${response.data[0].partner_id}`,
        );

        preTalkPersons.push(temporary.data[0]);
      } else {
        preTalkPersons.length = 0;
      }
      setTalkPersons(preTalkPersons);
    }
    (async () => await getTalkPersons(user.userId))();
  }, []);

  //------------------フィードバック待ちの取得---------------------
  useEffect(() => {
    async function getWaitingAna(id) {
      const preWaitingInfo = [];
      const response = await axios.get(`${BASE_URL}/api/conversations/feedback/${id}`);

      if (response.data.length > 1) {
        for (const obj of response.data) {
          const res = await axios.get(`${BASE_URL}/api/users/myInfo/${obj.partner_id}`);
          const temporary = { ...res.data[0], ...obj };
          preWaitingInfo.push(temporary);
        }
      } else if (response.data.length === 1) {
        const res = await axios.get(`${BASE_URL}/api/users/myInfo/${response.data[0].partner_id}`);
        const temporary = { ...res.data[0], ...response.data[0] };
        preWaitingInfo.push(temporary);
      } else {
        preWaitingInfo.length = 0;
      }
      setWaitingItems(preWaitingInfo);
    }
    (async () => await getWaitingAna(user.userId))();
  }, []);
  //--------------初回読み込み時にのみ作動するuseefect一覧終了-------------------------

  useEffect(() => {
    if (answer) {
      navigate('/mode', { state: { data: answer } });
    }
  }, [answer]);

  useEffect(() => {
    if (answerWaiting) {
      navigate('/actual/conversationlog', { state: { data: answerWaiting } });
    }
  }, [answerWaiting]);

  //-------------------ボタンクリック/入力値変化時の関数はこの下に記載----------------------
  function selectPerson(e) {
    const id = Number(e.currentTarget.dataset.index);
    const keysToKeep = ['id', 'nickname', 'answer1', 'answer2', 'answer3', 'answer4', 'answer5'];
    const newObject = Object.fromEntries(
      Object.entries(talkPersons[id]).filter(([key]) => keysToKeep.includes(key)),
    );

    setanswer(newObject);
  }

  function selectFB(e) {
    const id = Number(e.currentTarget.dataset.index);

    const keysToKeep = [
      'id',
      'nickname',
      'answer1',
      'answer2',
      'answer3',
      'answer4',
      'answer5',
      'pairId',
      'transcript_url',
    ];
    const newObject = Object.fromEntries(
      Object.entries(waitingItems[id]).filter(([key]) => keysToKeep.includes(key)),
    );

    setAnswerWaiting(newObject);
  }

  //-------------------ボタンクリック/入力値変化時の関数はこの上に記載----------------------

  return (
    <Container
      color="tertiary"
      centerContent="true"
      position="relative"
      p="0">
      <Flex
        direction="row"
        width="100%"
        align="center"
        height="52px">
        <Heading
          fontSize="28px"
          marginLeft="30px">
          ホーム
        </Heading>
        <Avatar
          size="sm"
          marginLeft="203px"
          marginTop="5px"
          bg="#c4c4c4"
          color="tertiary"
          name={user.nickName}
        />
      </Flex>

      <VStack
        width="100%"
        overflow="hidden">
        {circle === 4 ? (
          <Box
            width="203px"
            display="flex"
            height="76px"
            align="center"
            justifyContent="center"
            flexDirection="column"
            borderRadius="5px"
            marginTop="10px"
            marginLeft="18px"
            backgroundColor="rgba(255, 150, 115, 0.3)">
            <Text
              fontSize="20px"
              fontWeight="bold">
              あなたの価値観ID
            </Text>
            <Flex
              direction="row"
              paddingLeft="20px">
              <Image
                src={warningIcon}
                alt="custom"
              />
              <Text
                fontSize="15px"
                letterSpacing="1.5px">
                価値観が未設定です
              </Text>
            </Flex>
          </Box>
        ) : (
          <Box
            width="203px"
            display="flex"
            height="76px"
            align="center"
            justifyContent="center"
            flexDirection="column"
            borderRadius="5px"
            marginTop="10px"
            marginLeft="18px"
            backgroundColor="secondary">
            <Text
              fontSize="20px"
              fontWeight="bold">
              あなたの価値観ID
            </Text>
            <Flex
              direction="row"
              paddingLeft="40px">
              <Text
                fontSize="20px"
                letterSpacing="1.5px"
                color="#175899"
                fontWeight="bold">
                {myID}
              </Text>
              <IconButton
                onClick={handleCopy}
                variant="link"
                colorScheme="#175899"
                size="40px"
                icon={
                  <img
                    src={copyIcon}
                    alt="custom"
                  />
                }
              />
              {copied && (
                <Text
                  fontSize="10px"
                  color="#175899">
                  コピーしました！
                </Text>
              )}
            </Flex>
          </Box>
        )}

        <Accordion
          toggle
          width="100%"
          variant="unstyled"
          marginLeft="18px">
          <AccordionItem
            width="339px"
            fontSize="15px"
            backgroundColor="secondary"
            borderRadius="5px"
            sx={{
              '& svg': {
                color: 'primary', // ← ここで矢印の色を指定
                width: '32px', // ← 幅を指定
                height: '32px', // ← 高さを指定
              },
            }}
            color="primary"
            marginTop="30px"
            label="最近話した人">
            <VStack
              gap="sm"
              align="center">
              {talkPersons.map((obj, index) => {
                return (
                  <Button
                    key={obj.id}
                    data-index={index}
                    height="50px"
                    width="315px"
                    bg="white"
                    variant="ghost"
                    fontSize="14px"
                    sx={{
                      textAlign: 'left',
                      justifyContent: 'flex-start',
                    }}
                    onClick={selectPerson}>
                    <Avatar
                      size="sm"
                      align="left"
                      bg="#c4c4c4"
                      color="tertiary"
                      name={obj.nickname}
                    />
                    {obj.nickname}
                  </Button>
                );
              })}
            </VStack>
          </AccordionItem>

          <AccordionItem
            width="339px"
            backgroundColor="secondary"
            color={'primary'}
            label="フィードバック待ち"
            marginTop="30px"
            borderRadius="5px"
            sx={{
              '& svg': {
                color: 'primary', // ← ここで矢印の色を指定
                width: '32px', // ← 幅を指定
                height: '32px', // ← 高さを指定
              },
            }}>
            <VStack
              gap="sm"
              align="left"
              marginLeft="-10px">
              {waitingItems.map((log, index) => {
                const date = log.created_at;
                const time = Number(log.conversation_time);
                const min = Math.floor(time / 60);
                const sec = ('00' + Math.trunc(time % 60)).slice(-2);
                return (
                  <Button
                    key={log.id}
                    data-index={index}
                    marginRight="5px"
                    marginLeft="5px"
                    variant="ghost"
                    padding="md"
                    bg="white"
                    fontSize="14px"
                    height="50px"
                    onClick={selectFB}>
                    <Avatar
                      size="sm"
                      align="left"
                      bg="#c4c4c4"
                      color="tertiary"
                      name={log.nickname}
                    />
                    {log.nickname}
                    <Flex
                      justify={'space-between'}
                      align="center"
                      width="100%">
                      <HStack>
                        <Text>{format(date, 'MM/dd')}</Text>
                        <Text>{format(date, 'HH:mm')}</Text>
                      </HStack>
                      <HStack gap="10px">
                        <Clock4Icon style={{ width: '16px', height: '16px', color: 'primary' }} />
                        <Text>
                          {min}:{sec}
                        </Text>
                      </HStack>
                    </Flex>
                  </Button>
                );
              })}
            </VStack>
          </AccordionItem>
        </Accordion>
      </VStack>

      <Footer onIndex={circle} />
    </Container>
  );
}

export default HomePage;
