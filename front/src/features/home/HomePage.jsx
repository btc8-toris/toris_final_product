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
} from '@yamada-ui/react';
import React from 'react';
import { useNavigate } from 'react-router';
import Footer from '../../components/footer/Footer';
import { context } from '../../app/App';
import { useEffect, useState, useContext } from 'react';
import warningIcon from '/warning.svg';
import axios from 'axios';
import copyIcon from '/copy_icon.svg';

let myID = 0;

function HomePage() {
  const navigate = useNavigate();
  const { user } = useContext(context);
  console.log('💀 ~ HomePage ~ user:', user);
  const [circle, setCircle] = useState(0);
  const [copied, setCopied] = useState(false);
  const test = ['A君', 'B君', 'C君'];
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

  useEffect(() => {
    async function getMySearchID(id) {
      const response = await axios.get(`/api/users/myInfo/${id}`);

      console.log('💀 ~ getMySearchID ~ response.data:', response.data);

      if (response.data[0].search_id === null) {
        setIconFlag = 4;
      } else {
        setIconFlag = 1;
        myID = response.data[0].search_id;
      }
      setCircle(setIconFlag);
      console.log('💀 ~ getMySearchID ~ setIconFlag:', setIconFlag);
    }
    getMySearchID(user.userId);
  }, []);

  return (
    <Container
      centerContent="true"
      position="relative"
      p="0">
      <Flex
        direction="row"
        width="100%"
        align="center">
        <Heading
          fontSize="28px"
          marginLeft="30px">
          ホーム
        </Heading>
        <Avatar
          size="sm"
          marginLeft="203px"
          marginTop="5px"
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
              {test.map((obj, index) => {
                return (
                  <Button
                    //  key={obj.id}
                    data-index={index}
                    height="50px"
                    width="315px"
                    backgroundColor="white"
                    variant="ghost"
                    fontSize="14px"
                    sx={{
                      textAlign: 'left',
                      justifyContent: 'flex-start',
                    }}
                    //  onClick={selectPerson}
                  >
                    <Avatar
                      size="sm"
                      align="left"
                      name={obj}
                    />
                    {obj}
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
              align="center">
              {test.map((obj, index) => {
                return (
                  <Button
                    //  key={obj.id}
                    data-index={index}
                    height="50px"
                    width="315px"
                    variant="ghost"
                    backgroundColor="white"
                    fontSize="14px"
                    sx={{
                      textAlign: 'left',
                      justifyContent: 'flex-start',
                    }}
                    //  onClick={selectPerson}
                  >
                    <Avatar
                      size="sm"
                      align="left"
                      name={obj}
                    />
                    {obj}
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
