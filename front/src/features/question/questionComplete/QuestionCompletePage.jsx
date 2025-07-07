import { Box, Text, Container, Button, Flex, Image } from '@yamada-ui/react';
import React, { useContext } from 'react';
import { CircleCheck } from 'lucide-react';
import { useNavigate } from 'react-router';
import { context } from '../../../app/App';
import checkIcon from '/check.svg';

function QuestionCompletePage() {
  const { user } = useContext(context);
  const navigate = useNavigate();
  console.log(user);

  return (
    <Container
      centerContent="true"
      gap="none"
      color="tertiary"
      //   p="0"
    >
      <Box
        marginTop="150px"
        marginBottom="50px">
        <Image
          src={checkIcon}
          alt="完了"
          sizes="192px"
        />
      </Box>
      <Text
        fontWeight="bold"
        fontSize="22px">
        価値観の登録が完了しました!
      </Text>
      <Box
        marginTop="15px"
        textAlign="center">
        <Text
          fontSize="14px"
          fontWeight="bold">
          あなたの価値観IDは
          <Text
            as="span"
            paddingRight="5px"
            paddingLeft="5px"
            color="#175899"
            letterSpacing="1.6px"
            fontSize="16px">
            {user.searchId}
          </Text>
          です。
        </Text>
        <Text
          fontSize="14px"
          fontWeight="bold">
          ホーム画面から、いつでも確認することができます。
        </Text>
      </Box>
      <Flex
        direction="row"
        justify="end"
        marginTop="50px"
        width="100%">
        <Button
          width="101px"
          height="50px"
          variant="outline"
          color="tertiary"
          onClick={() => navigate('/home')}>
          ホームへ
        </Button>
      </Flex>
    </Container>
  );
}

export default QuestionCompletePage;
