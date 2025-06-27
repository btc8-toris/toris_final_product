import { Box, Button, Card, Container, Flex, For, Radio, RadioGroup, Text, VStack, Wrap } from '@yamada-ui/react';
import React from 'react';
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
    'どちらも全力。仕事が充実すればプラ',
    'イベートも充実する',
    'プライベート優先。仕事は生活の手段',
    '仕事優先。やりたいことだから全力を',
    '注ぎたい',
    '完全に切り分けたい',
    '融合している（趣味＝仕事など）],',
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
  return (
    <Container>
      QuestionPage
      <Box>
        質問に答えることで、あなたの大切にしている 価値観や理想の働き方を確認させて頂きます。
        直感で選んでください。＜全５問＞
      </Box>
      <For each={questions}>
        {(question, qIndex) => (
          <Card key={qIndex}>
            <Text>{`【質問 ${qIndex+1}】`}</Text>
            <Text>{question}</Text>
            <VStack>
              <RadioGroup>
                <For each={answers[qIndex]}>
                  {(answer, aIndex) => (
                    <Radio
                    key={aIndex}
                      size="sm"
                      value={String(qIndex) +String(aIndex)}>
                      {answer}
                    </Radio>
                  )}
                </For>
              </RadioGroup>
            </VStack>
          </Card>
        )}
      </For>
      <Flex direction='row' justify='center' >
        <Button>
            戻る
        </Button>
        <Button>
            登録
        </Button>
      </Flex>
    </Container>
  );
}

export default QuestionPage;
