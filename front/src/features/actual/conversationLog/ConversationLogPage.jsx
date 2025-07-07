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
} from '@yamada-ui/react';
import './ContextFrame.css';
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import { useContext } from 'react';
import { context } from '../../../app/App';
import { useLocation, useNavigate } from 'react-router';
import analysisIcon from '/analysis.svg';

const yourContext = [
  '今日中にやらないといけない仕事が残っているんですけど、、、今日はゲームの発売日なので定時で帰ります。',
  '遅れた分は来週頑張りますし。今日も定時まで頑張りますので、今日は定時で帰ります。',
];

const myContext = ['え？ちょっと待って、納期が今日までなんだよね？遅れたら、責任取れるの？'];

const usertype = {
  answer1: '自分の成長を実感できたとき',
  answer2: '部下の挑戦を応援してくれる人',
  answer3: '自分の中で納得できること',
  answer4: 'どちらも全力。仕事が充実すればプライベートも充実する',
  answer5: '助け合いやチームワークが強い',
  character: '',
  created_at: '2025-06-27T10:35:25.232Z',
  hash: 'aaa',
  id: 1,
  nickname: 'ゆうたろう',
  org_code: '99999',
  salt: '111',
  search_id: 1001,
};

function ConversationLogPage() {
  const location = useLocation();
  const receiveAnswer = location.state.data;
  const { BASE_URL } = useContext(context);
  const [transcripts, setTranscripts] = useState([]);
  const navigate = useNavigate();
  const [sendData, setSendData] = useState({});

  console.log('🍓 ~ ConversationLogPage ~ receiveAnswer:', receiveAnswer);

  const text = async (mp3File) => {
    const data = await fetch(`${BASE_URL}/api/voices/transcription-result/${mp3File}`).then((res) =>
      res.json(),
    );

    // console.log('🍓 ~ text ~ data:', data.status);
    // console.log('🍓 ~ text ~ data.text:', data.text);
    if (data.status === 'completed') {
      setTranscripts(data.text);
      receiveAnswer.transcript = data.text;
    } else if (data.status === 'in_progress') {
      setTimeout(async () => await text(mp3File), 5000);
    } else {
      console.error('文字起こしに失敗：', data.reason);
    }
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
        paddingTop="60px">
        <ScrollArea
          type="always"
          maxHeight="507px">
          <VStack>
            {transcripts.map((transcript) => {
              return transcript.speaker_label === 'spk_0' ? (
                <>
                  <Flex
                    className="message-bubble"
                    direction="row"
                    justify="end">
                    <Box
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
                <>
                  <Box marginBottom="2px">
                    <Avatar
                      name={usertype.nickname}
                      size="sm"
                    />
                    {usertype.nickname}
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
                </>
              );
            })}

            <IconButton
              colorScheme="primary"
              width="120px"
              marginLeft="auto"
              marginBottom="10px"
              marginTop="10px"
              onClick={() => navigate('/actual/suggestion', { state: { data: sendData } })}
              icon={
                <Image
                  src={analysisIcon}
                  alt="分析"
                />
              }>
              分析
            </IconButton>
          </VStack>
        </ScrollArea>
      </Container>
      <Footer />
    </Container>
  );
}

export default ConversationLogPage;
