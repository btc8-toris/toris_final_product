import React, { useEffect, useState, useContext } from 'react';
import Header from '../../../components/header/Header';
import { Button, Container, Text, VStack, Flex, ScrollArea } from '@yamada-ui/react';
import { useNavigate } from 'react-router';
import Footer from '../../../components/footer/Footer';
import { Accordion, AccordionItem } from '@yamada-ui/react';
import axios from 'axios';
import { format } from 'date-fns';
import { Clock4Icon } from '@yamada-ui/lucide';
import BigAvatar from '../../../components/Avatar/BigAvatar';
import { useLocation } from 'react-router';
import { context } from '../../../app/App';

function PartnerLogPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pastLogs, setPastLogs] = useState([]);
  const receiveAnswer = location.state.data;
  const { BASE_URL } = useContext(context);
  const [logExist, setLogExist] = useState(false);
  const [sendData, setSendData] = useState({});

  console.log('🍓 ~ PartnerLogPage ~ receiveAnswer:', receiveAnswer);

  const getLog = async () => {
    // const pairID = receiveAnswer.pairId;
    const pairID = 1;
    console.log('🍓 ~ getLog ~ pairID:', pairID);
    await axios.get(`${BASE_URL}/api/conversations/log/${pairID}`).then((res) => {
      if (res.status === 200) {
        // console.log('🍓 ~ awaitaxios.get ~ res.status:', res);
        // console.log('🍓 ~ .then ~ res.data:', res.data);
        setPastLogs(res.data);
      } else {
        setLogExist(true);
      }
    });
  };

  useEffect(() => {
    setSendData(receiveAnswer);
  }, [receiveAnswer]);

  useEffect(() => {
    setLogExist(false);
    (async () => {
      await getLog();
    })();
  }, []);
  console.log(logExist);

  return (
    <>
      <Container
        centerContent="true"
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
            <Accordion toggle>
              <AccordionItem
                bg="secondary"
                color="primary"
                borderRadius="5px"
                sx={{
                  '& svg': {
                    color: 'primary', // ← ここで矢印の色を指定
                    width: '32px', // ← 幅を指定
                    height: '32px', // ← 高さを指定
                  },
                }}
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
                        console.log('🍓 ~ pastLogs.map ~ log:', log);
                        receiveAnswer.transcript_url = log.transcript_url;
                        console.log('🍓 ~ pastLogs.map ~ receiveAnswer:', sendData);
                        const date = log.created_at;
                        const time = Number(log.conversation_time);
                        const min = Math.floor(time / 60);
                        const sec = ('00' + Math.trunc(time % 60)).slice(-2);
                        return (
                          <Button
                            key={index}
                            variant="ghost"
                            padding="md"
                            bg="white"
                            height="50px"
                            onClick={() =>
                              navigate('/actual/conversationlog', { state: { data: sendData } })
                            }>
                            <Flex
                              justify={'space-between'}
                              align="center"
                              width="100%">
                              <Text>
                                {format(date, 'MM/dd')}
                                {'       '}
                                {format(date, 'HH:mm')}
                              </Text>

                              <Text>
                                <Clock4Icon color="primary" />
                                {min}:{sec}
                              </Text>
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
              onClick={() => navigate('/actual/approval')}>
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
