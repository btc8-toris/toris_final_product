import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  For,
  Radio,
  RadioGroup,
  Text,
  VStack,
  Wrap,
} from '@yamada-ui/react';
import React, { useContext, useState } from 'react';
import Header from '../../components/header/Header';
import { context } from '../../app/App';
import axios from 'axios';
import { useNavigate } from 'react-router';
const answers = [
  [
    '自分の成長を実感できたとき',
    'お客様や同僚から感謝されたとき',
    'チームで何かを成し遂げたとき',
    '難しい課題を乗り越えたとき',
    '数値や実績で成果が出たとき',
  ],
  [
    '部下の挑戦を応援してくれる人',
    '困ったときに手を差し伸べてくれる人',
    '結果を出すために厳しく導く人',
    '一緒に現場で動いてくれる人',
    '余計なことは言わず任せてくれる人',
  ],
  [
    '周囲から評価されること',
    '自分の中で納得できること',
    'チームや会社の目標を達成すること',
    'クライアントの課題を解決すること',
    '成長し続けられること',
  ],
  [
    '仕事もプライベートも両方全力',
    'プライベート優先。仕事は生活の手段',
    '仕事優先。やりたい事に全力を注ぎたい',
    '完全に切り分けたい',
    '融合している（趣味＝仕事など）',
  ],
  [
    'フラットで自由に意見が言える',
    '厳しくても結果を出す',
    '助け合いやチームワークが強い',
    '個人の裁量が大きい',
    '明るくて楽しい雰囲気',
  ],
];
const questions = [
  '仕事をしていて「やりがい」を感じる瞬間はどれですか？',
  '理想の上司像に一番近いのはどれですか？',
  'あなたにとって「成果」とは何ですか？',
  '仕事とプライベートの理想の関係性は？',
  '職場で最も大事だと思う文化・雰囲気は？',
];

function QuestionPage() {
  const [answerValue, setAnswerValue] = useState(['', '', '', '', '']);
  const [answerword, setAnswerWord] = useState(['', '', '', '', '']);
  const { user, login, JSON_HEADER, BASE_URL } = useContext(context);
  const navigate = useNavigate();

  const createAnswer = (selectedVal, index) => {
    const newValue = answerValue.map((val, i) => (i === index ? selectedVal : val));
    const newVword = answerword.map((val, i) => (i === index ? answers[index][selectedVal] : val));
    console.log('💀 ~ createAnswer ~ newVword:', newVword);
    console.log('💀 ~ createAnswer ~ newValue:', newValue);

    setAnswerValue(newValue);
    setAnswerWord(newVword);
  };

  const sendAnsewer = async () => {
    const data = {
      answer: {
        answer1: answerValue[0],
        answer2: answerValue[1],
        answer3: answerValue[2],
        answer4: answerValue[3],
        answer5: answerValue[4],
      },
    };
    const sendData = {
      answer: {
        answer1: answerword[0],
        answer2: answerword[1],
        answer3: answerword[2],
        answer4: answerword[3],
        answer5: answerword[4],
      },
    };

    await axios
      .put(`${BASE_URL}/api/users/ans_all/${user.userId}`, sendData, JSON_HEADER)
      .then((respose) => {
        console.log('response', respose.data);
        login(JSON.stringify(respose.data));
        navigate('/question/complete');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Container
      centerContent="true"
      gap="none"
      p="0">
      <Header title={'価値観分析'} />
      <Container
        marginTop="60px"
        paddingTop="60px">
        {/* <Box>
          質問に答えることで、あなたの大切にしている 価値観や理想の働き方を確認させて頂きます。
          直感で選んでください。＜全５問＞
        </Box> */}
        <For each={questions}>
          {(question, qIndex) => (
            <Card
              variant="subtle"
              bg="#D2F1E7"
              key={qIndex}
              p="5">
              {/* <Text>{`【質問 ${qIndex + 1}】`}</Text> */}
              <Text marginBottom="15px">{question}</Text>
              <VStack>
                <RadioGroup
                  gap="3px"
                  value={answerValue[qIndex]}
                  onChange={(selectedVal) => createAnswer(selectedVal, qIndex)}>
                  <For each={answers[qIndex]}>
                    {(answer, aIndex) => (
                      <Radio
                        border="1px #000000"
                        key={String(qIndex) + String(aIndex)}
                        size="sm"
                        fontSize="15px"
                        letterSpacing="0.45px"
                        colorScheme="tertiary"
                        value={String(aIndex)}>
                        {answer}
                      </Radio>
                    )}
                  </For>
                </RadioGroup>
              </VStack>
            </Card>
          )}
        </For>
        <Flex
          direction="row"
          justify="right">
          <Button
            width="101px"
            height="50px"
            variant="outline"
            color="tertiary"
            disabled={!answerValue.every((val) => val !== '')}
            onClick={() => {
              sendAnsewer();
            }}>
            完了する
          </Button>
        </Flex>
      </Container>
    </Container>
  );
}

export default QuestionPage;
