import React, { useEffect, useState, useContext } from 'react';
import Header from '../../../components/header/Header';
import {
  Button,
  Center,
  Container,
  IconButton,
  Text,
  VStack,
  Avatar,
  Flex,
  Spacer,
  GridItem,
  Grid,
} from '@yamada-ui/react';
import { context } from '../../../app/App';
import { useNavigate } from 'react-router';
import Footer from '../../../components/footer/Footer';
import { Accordion, AccordionItem } from '@yamada-ui/react';
import axios from 'axios';
import { format } from 'date-fns';
import { Clock4Icon } from '@yamada-ui/lucide';

function PartnerLogPage() {
  const { user } = useContext(context);
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
            {/* つるちゃん作成のコンポーネントを入れる予定　bigavator */}
            <Accordion
              toggle
              variant="card">
              <AccordionItem
                color="primary"
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
              onClick={() => navigate('/actual/listen')}>
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
