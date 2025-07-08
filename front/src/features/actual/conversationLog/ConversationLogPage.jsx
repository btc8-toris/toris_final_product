import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Container,
  Flex,
  ScrollArea,
  Button,
  VStack,
  IconButton,
  Image,
  Loading,
  Center,
} from '@yamada-ui/react';
import './ContextFrame.css';
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import { useContext } from 'react';
import { context } from '../../../app/App';
import { useLocation, useNavigate } from 'react-router';
import analysisIcon from '/analysis.svg';
import axios from 'axios';

function ConversationLogPage() {
  const location = useLocation();
  const receiveAnswer = location.state.data;
  const { BASE_URL } = useContext(context);
  const [transcripts, setTranscripts] = useState([]);
  const navigate = useNavigate();
  const [sendData, setSendData] = useState({});
  const [load, setLoad] = useState(true);

  console.log('🍓 ~ ConversationLogPage ~ receiveAnswer:', receiveAnswer);

  const text = async (mp3File) => {
    const data = await fetch(`${BASE_URL}/api/voices/transcription-result/${mp3File}`).then((res) =>
      res.json(),
    );

    // console.log('🍓 ~ text ~ data.text:', data.text);
    if (data.status === 'completed') {
      setLoad(false);
      setTranscripts(data.text);
      receiveAnswer.transcript = data.text;
    } else if (data.status === 'in_progress') {
      setLoad(true);
      setTimeout(async () => await text(mp3File), 5000);
    } else {
      console.error('文字起こしに失敗：', data.reason);
    }
  };

  const analysis = async () => {
    await axios
      .put(`${BASE_URL}/api/conversations/read/${receiveAnswer.transcript_url}`)
      .then((res) => console.log(res.data.message));

    navigate('/actual/suggestion', { state: { data: sendData } });
  };
  useEffect(() => {
    (async () => {
      await text(receiveAnswer.transcript_url);
    })();
    setSendData(receiveAnswer);
  }, []);
  console.log('🍓 ~ ConversationLogPage ~ transcripts:', transcripts);

  return (
    <Container
      centerContent="true"
      gap="none"
      p="0">
      <Header title={'対話ログ'} />
      <Container
        marginTop="60px"
        paddingTop="60px"
        // centerContent="true"
      >
        {load ? (
          <Center>
            <Loading
              variant="oval"
              fontSize="6xl"
              color={`red.500`}
            />
          </Center>
        ) : (
          <ScrollArea
            maxHeight="447px"
            type="scroll">
            <VStack>
              {transcripts.map((transcript) => {
                return transcript.speaker_label === 'spk_0' ? (
                  <>
                    <Flex
                      className="message-bubble"
                      direction="row"
                      justify="end">
                      <Box
                        key={transcript.id}
                        className="message-bubble--mine"
                        bg="primary"
                        margin="3"
                        rounded="lg"
                        padding="2"
                        width="80%">
                        {transcript.transcript}
                      </Box>
                    </Flex>
                  </>
                ) : (
                  <Box key={transcript.id}>
                    <Box marginBottom="2px">
                      <Avatar
                        name={receiveAnswer.nickname}
                        size="sm"
                      />
                      {receiveAnswer.nickname}
                    </Box>
                    <Flex
                      direction="row"
                      className="message-bubble"
                      marginLeft="15px">
                      <Box
                        className="message-bubble--other"
                        bg="gray.50"
                        margin="3"
                        rounded="lg"
                        padding="2"
                        width="80%">
                        {transcript.transcript}
                      </Box>
                    </Flex>
                  </Box>
                );
              })}
            </VStack>
          </ScrollArea>
        )}
        <IconButton
          colorScheme="primary"
          width="120px"
          marginLeft="auto"
          // marginBottom="10px"
          // marginTop="10px"
          onClick={analysis}
          icon={
            <Image
              src={analysisIcon}
              alt="分析"
            />
          }>
          分析
        </IconButton>
      </Container>
      <Footer />
    </Container>
  );
}

export default ConversationLogPage;
