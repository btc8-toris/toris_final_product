import React, { useEffect, useState, useContext } from 'react';
import Header from '../../../components/header/Header';
import { Button, Container, Text, VStack, Flex, ScrollArea, HStack, Box } from '@yamada-ui/react';
import { useNavigate } from 'react-router';
import Footer from '../../../components/footer/Footer';
import { Accordion, AccordionItem } from '@yamada-ui/react';
import axios from 'axios';
import { format } from 'date-fns';
import { Clock4Icon } from '@yamada-ui/lucide';
import BigAvatar from '../../../components/Avatar/BigAvatar';
import { useLocation } from 'react-router';
import { context } from '../../../app/App';

const sampleLogs = [
  {
    transcript_url: 'sample',
    created_at: '2025-07-07 14:15:23',
    conversation_time: '115',
  },
];

function PartnerLogPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pastLogs, setPastLogs] = useState([]);
  const receiveAnswer = location.state.data;
  const { BASE_URL } = useContext(context);
  const [logExist, setLogExist] = useState(false);
  const [sendData, setSendData] = useState({});

  const getLog = async () => {
    const pairID = receiveAnswer.pairId;

    await axios.get(`${BASE_URL}/api/conversations/log/${pairID}`).then((res) => {
      if (res.status === 200) {
        setPastLogs(res.data);
      } else {
        if (Number(receiveAnswer.id) >= 1 && Number(receiveAnswer.id) <= 6) {
          setPastLogs(sampleLogs);
          setLogExist(false);
        } else {
          setLogExist(true);
        }
      }
    });
  };

  useEffect(() => {
    setSendData(receiveAnswer);
  }, [receiveAnswer]);

  useEffect(() => {
    setLogExist(false);
    setSendData(receiveAnswer);
    (async () => {
      await getLog();
    })();
  }, []);

  const logNav = (e) => {
    receiveAnswer.transcript_url = e.currentTarget.value;
    navigate('/actual/conversationlog', { state: { data: sendData } });
  };

  return (
    <>
      <Container
        centerContent="true"
        color="tertiary"
        gap="none"
        p="0">
        <Header title={'ふたり対話'} />
        <Container
          marginTop="60px"
          paddingTop="60px">
          <VStack
            align="center"
            marginTop="20px">
            <BigAvatar nickName={receiveAnswer.nickname} />
            <Accordion
              toggle
              variant="unstyled">
              <AccordionItem
                bg="secondary"
                color="primary"
                borderRadius="5px"
                // maxHeight="220px"
                sx={{
                  '& svg': {
                    color: 'primary', // ← ここで矢印の色を指定
                  },
                }}
                fontSize="15px"
                fontWeight="bold"
                label="過去の対話ログ">
                <ScrollArea
                  type="always"
                  maxHeight="150px">
                  <VStack
                    paddingTop="md"
                    gap="5px">
                    {logExist ? (
                      <Text textAlign="center">過去の対話ログはありません</Text>
                    ) : (
                      pastLogs.map((log, index) => {
                        const url = log.transcript_url;
                        const date = log.created_at;
                        const time = Number(log.conversation_time);
                        const min = Math.floor(time / 60);
                        const sec = ('00' + Math.trunc(time % 60)).slice(-2);
                        return (
                          <Button
                            key={index}
                            marginRight="5px"
                            marginLeft="5px"
                            variant="ghost"
                            padding="md"
                            bg="white"
                            height="50px"
                            value={url}
                            onClick={(e) => logNav(e)}>
                            <Flex
                              justify={'space-between'}
                              align="center"
                              width="100%">
                              <HStack>
                                <Text>{format(date, 'MM/dd')}</Text>
                                <Text>{format(date, 'HH:mm')}</Text>
                              </HStack>
                              <HStack gap="10px">
                                <Clock4Icon color="primary" />
                                <Text>
                                  {min}:{sec}
                                </Text>
                              </HStack>
                            </Flex>
                          </Button>
                        );
                      })
                    )}
                  </VStack>
                </ScrollArea>
              </AccordionItem>
            </Accordion>
            <Button
              fullRounded={true}
              size="xl"
              colorScheme="primary"
              marginTop="5px"
              onClick={() => navigate('/actual/approval', { state: { data: sendData } })}>
              対話する
            </Button>
          </VStack>
        </Container>
        <Footer />
      </Container>
    </>
  );
}

export default PartnerLogPage;
