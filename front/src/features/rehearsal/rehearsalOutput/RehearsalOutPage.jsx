import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  For,
  Grid,
  GridItem,
  Input,
  Radio,
  RadioGroup,
  Avatar,
  FormControl,
  Label,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  Loading,
  HStack,
  IconButton,
} from '@yamada-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/header/Header';
let resTextProposal = '';
let answer1 = '';
const answers = [];

function RehearsalOutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const receiveAnswerInput = location.state?.data; //選択したユーザーのニックネームと質問の回答を前のページから受け継ぐ
  const [isLoading, setIsLoading] = useState(false);
  const fbFormat = [
    'きっと私はこう思った',
    'きっとこれは私に伝わった',
    'もっとこうして伝えて欲しかった',
  ];

  // ここでAIへ壁打ちする関数をマウント時に一回呼び出す
  useEffect(() => {
    const contactAI = async () => {
      try {
        setIsLoading(true); //開始時にローディング

        const res = await axios.post(
          '/api/llm/questions',
          {
            message: `あなたの部下は以下のような価値観を持っています。まずは質問への回答から部下の価値観を認識してください。
            質問1：仕事をしていて「やりがい」を感じる瞬間はどれですか？
            質問1の回答：${receiveAnswerInput.answer1}
            質問2：理想の上司像に一番近いのはどれですか？
            質問2の回答：${receiveAnswerInput.answer2}
            質問3：あなたにとって「成果」とは何ですか？
            質問3の回答：${receiveAnswerInput.answer3}
            質問4：仕事とプライベートの理想の関係性は？
            質問4の回答：${receiveAnswerInput.answer4}
            質問5:仕事で最も大事だと思う文化・雰囲気は？
            質問5の回答：${receiveAnswerInput.answer4}

            上記の価値観を持つ部下に対して以下の言葉を投げかけます。
            投げかける言葉：${receiveAnswerInput.input}

            その投げかけに関して、以下に関して回答を返してください。
            ①きっと部下はこう思った
            ②きっとこれは部下に伝わった
            ③もっとこうして伝えて欲しかった

            回答のフォーマットは必ず以下にしてください。
            ・回答①
            この部下は、以下の感情を抱いたと考えられます。
            ここに①の回答を記入してください

            ・回答②
            この投げかけは、以下のメッセージが伝わったと考えられます。
            ここに②の回答を記入してください

            ・回答③
            この部下の価値観を尊重し、より効果的なコミュニケーションを実現するためには、以下の点を意識して伝えて欲しかったと考えられます。
            ここに③の回答を記入してください

          `,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        resTextProposal = res.data.data.choices[0].message.content;

        const answer1 = resTextProposal.match(/・回答①\n([\s\S]*?)\n・回答②/); // 戻り値は配列なのに注意
        const answer2 = resTextProposal.match(/・回答②\n([\s\S]*?)\n・回答③/); // 戻り値は配列なのに注意
        const answer3 = resTextProposal.match(/・回答③([\s\S]*)$/); // 戻り値は配列なのに注意

        answers[0] = answer1[1];
        answers[1] = answer2[1];
        answers[2] = answer3[1];
      } catch (error) {
        console.error('contactAI', error);
      } finally {
        setIsLoading(false); //完了時にローディングOFF
      }
    };

    contactAI();
  }, []);

  return (
    <Container
      centerContent="true"
      p="0">
      <Header title={'フィードバック'} />
      <Box>
        {' '}
        <Avatar
          size={'sm'}
          name={receiveAnswerInput.nickname}
        />
        {receiveAnswerInput.nickname}
      </Box>

      {isLoading ? (
        <Loading
          variant="oval"
          fontSize="6xl"
          color={`red.500`}
        />
      ) : (
        <>
          {answers.map((elm, index) => {
            return (
              <Card key={index}>
                <CardHeader>
                  <Heading size="md">{fbFormat[index]}</Heading>
                </CardHeader>

                <CardBody>
                  <Text>{elm}</Text>
                </CardBody>
              </Card>
            );
          })}
        </>
      )}

      <Footer onIndex={2} />
    </Container>
  );
}

export default RehearsalOutPage;
