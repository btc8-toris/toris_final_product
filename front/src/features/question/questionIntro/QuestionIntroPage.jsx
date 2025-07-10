import { Container, Heading, Box, Text, Button, Flex } from '@yamada-ui/react';
import React from 'react';
import Footer from '../../../components/footer/Footer';
import { useNavigate } from 'react-router';

function QuestionIntroPage() {
  const navigate = useNavigate();

  return (
    <Container
      color="tertiary"
      p="0">
      <Flex
        direction="row"
        width="100%"
        height="52px"
        align="center">
        <Heading
          fontSize="28px"
          marginLeft="30px">
          価値観
        </Heading>
      </Flex>
      <Container>
        <Box
          marginTop="15"
          marginBottom="5"
          marginLeft="20px"
          marginRight="20px"
          fontSize="17px">
          <Text
            letterSpacing="2px"
            lineHeight="27px">
            あなたの価値観を見つけましょう。これから5つの質問に答えていただくことで、あなたが大切にしている考え方や、理想の働き方が見えてきます。
          </Text>
          <Text
            letterSpacing="2px"
            as="ins"
            fontWeight="bold">
            深く考えすぎず、直感で選んでください。
          </Text>
          <Text letterSpacing="2px">（全5問・所要時間約1分）</Text>
          <Text
            marginTop="15px"
            letterSpacing="1.3px"
            fontSize="13px"
            fontWeight="bold">
            ※このアンケートの結果は他のユーザーや外部の方には共有されません。
          </Text>
        </Box>
        <Flex
          direction="row"
          justify="end">
          <Button
            variant="outline"
            color="tertiary"
            marginTop="10"
            width="101px"
            height="50px"
            fontWeight="nomal"
            onClick={() => navigate('/question/form')}>
            はじめる
          </Button>
        </Flex>
      </Container>
      <Footer onIndex={3} />
    </Container>
  );
}

export default QuestionIntroPage;
