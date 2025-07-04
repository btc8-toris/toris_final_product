import React, { useEffect, useState, useContext } from 'react';
import Header from '../../../components/header/Header';
import { Button, Container, Text, VStack, Flex } from '@yamada-ui/react';
import { useNavigate } from 'react-router';
import Footer from '../../../components/footer/Footer';
import { Accordion, AccordionItem } from '@yamada-ui/react';
import axios from 'axios';
import { format } from 'date-fns';
import { Clock4Icon } from '@yamada-ui/lucide';
import BigAvatar from '../../../components/Avatar/BigAvatar';

function PartnerLogPage() {
  const navigate = useNavigate();
  const [pastLogs, setPastLogs] = useState([]);

  const getLog = async () => {
    const pairID = 1;
    const data = await axios.get(`/api/conversations/log/${pairID}`);
    setPastLogs(data.data);
  };

  useEffect(() => {
    (async () => {
      await getLog();
    })();
  }, []);

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
            marginTop="150px">
            <BigAvatar nickName="Ruka"/>
            {/* つるちゃん作成のコンポーネントを入れる予定　bigavator */}
            <Accordion
              toggle
              // variant="card"
            >
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
                <VStack paddingTop="md">
                  {pastLogs.map((log, index) => {
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
                        // onClick={() => navigate('')}
                      >
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
                  })}
                </VStack>
              </AccordionItem>
            </Accordion>
            <Button
              fullRounded={true}
              size="xl"
              colorScheme="primary"
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
