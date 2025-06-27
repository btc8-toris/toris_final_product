import { Box, Container } from '@yamada-ui/react';
import React from 'react';

const yourContext = [
  '今日中にやらないといけない仕事が残っているんですけど、、、今日はゲームの発売日なので定時で帰ります。',
  '遅れた分は来週頑張りますし。今日も定時まで頑張りますので、今日は定時で帰ります。',
];

const myContext = ['え？ちょっと待って、納期が今日までなんだよね？遅れたら、責任取れるの？'];
function ListenConversationPage() {
  return (
  <Container>
    ListenConversationPagea
    <Box>
      <Box>
        アイコンyutaro
      </Box>
      <Box>
        {yourContext[0]}
      </Box>
      <Box>
        {myContext[0]}
      </Box>
    </Box>
  </Container>
  )
}

export default ListenConversationPage;
