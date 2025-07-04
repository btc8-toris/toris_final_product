import { Container, Heading, Box, Text, Button, Flex } from '@yamada-ui/react';
import React from 'react';
import Footer from '../../../components/footer/Footer';
import { useNavigate } from 'react-router';

function QuestionIntroPage() {
    const navigate = useNavigate()


  return (
    <Container
      //   centerContent="true"
      gap="none"
      p="0">
      <Container>
        <Box
          marginTop="5"
          textAlign="">
          <Heading>価値観</Heading>
        </Box>
        <Box
          marginTop="15"
          marginBottom="5">
          <Text>あなたの価値観を見つけましょう。</Text>
          <Text>これから5つの質問に答えていただくことで、</Text>
          <Text>あなたが大切にしている考え方や、</Text>
          <Text>理想の働き方が見えてきます。</Text>
          <Text>深く考えすぎず、直感で選んでください。</Text>
          <Text>（全5問・所要時間約1分）</Text>
        </Box>
        <Flex direction='row' justify='end'>
          <Button
            colorScheme="primary"
            marginTop='10'
            width="120px"
            height="40px"
            boxShadow="5px 5px 5px 5px"
            onClick={()=>navigate('/question/form')}
            >
            回答
          </Button>
        </Flex>
      </Container>
      <Footer onIndex={3} />
      </Container>
  );
}

export default QuestionIntroPage;
