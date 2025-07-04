import React from 'react';
import { Avatar, Box, Container, Flex } from '@yamada-ui/react';
import './ContextFrame.css';
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';

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
  return (
    <Container
      centerContent="true"
      gap="none"
      p="0">
      <Header title={'対話ログ'} />
      <Container
        marginTop="60px"
        paddingTop="60px">
        <Box>
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
              {yourContext[0]}
            </Box>
          </Flex>
          <Flex
            className="message-bubble"
            direction="row"
            justify="end">
            <Box
              className="message-bubble--mine"
              bg="green.300"
              margin="3"
              rounded="lg"
              padding="2"
              width="80%">
              {myContext[0]}
            </Box>
          </Flex>
        </Box>
      </Container>
      <Footer />
    </Container>
  );
}

export default ConversationLogPage;
