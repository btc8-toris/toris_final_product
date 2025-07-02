import { Box, Text, Container, Button, Flex } from '@yamada-ui/react';
import React, { useContext } from 'react';
import { CircleCheck } from 'lucide-react';
import { useNavigate } from 'react-router';
import { context } from '../../../app/App';

function QuestionCompletePage() {
  const { user } = useContext(context);
  const navigate = useNavigate();
  console.log(user);

  return (
    <Container
      centerContent="true"
      gap="none"
      //   p="0"
    >
      <Box marginTop="150px">
        <CircleCheck
          fill="#16D998"
          color="#fff"
          size={192}
        />
      </Box>
      <Box>価値観の登録が完了しました</Box>
      <Box textAlign="center">
        <Text>あなたの価値観IDは{user.searchId}です。</Text>
        <Text>ホーム画面から、いつでも確認することができます。</Text>
      </Box>
      <Flex
        direction="row"
        justify="end"
        marginTop="50px"
        width="100%">
        <Button
          width="120px"
          colorScheme="primary"
          onClick={() => navigate('/home')}>
          ホームに戻る
        </Button>
      </Flex>
    </Container>
  );
}

export default QuestionCompletePage;
