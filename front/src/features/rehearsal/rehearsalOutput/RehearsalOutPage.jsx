import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, ScrollArea, FormControl, Label, Text, Loading, Center } from '@yamada-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/header/Header';
import { context } from '../../../app/App';
let resTextProposal = '';
let answer1 = '';
const answers = [];

function RehearsalOutPage() {
  const location = useLocation();
  const receiveAnswerInput = location.state?.data; //選択したユーザーのニックネームと質問の回答を前のページから受け継ぐ
  const [isLoading, setIsLoading] = useState(false);
  const fbFormat = ['感じたこと', '伝わったこと', 'こう伝えて欲しかった'];
  const { BASE_URL } = useContext(context);

  // ここでAIへ壁打ちする関数をマウント時に一回呼び出す
  useEffect(() => {
    const contactAI = async () => {
      try {
        setIsLoading(true); //開始時にローディング

        const res = await axios.post(
          `${BASE_URL}/api/llm/questions`,
          {
            message: `今から部下になりきってもらいます。
            まずは以下の質問への回答からあなたの価値観を認識してください。
            質問1：仕事をしていて「やりがい」を感じる瞬間はどれですか？
            質問1の回答：${receiveAnswerInput.answer1}
            質問2：理想の上司像に一番近いのはどれですか？
            質問2の回答：${receiveAnswerInput.answer2}
            質問3：あなたにとって「成果」とは何ですか？
            質問3の回答：${receiveAnswerInput.answer3}
            質問4：仕事とプライベートの理想の関係性は？
            質問4の回答：${receiveAnswerInput.answer4}
            質問5:仕事で最も大事だと思う文化・雰囲気は？
            質問5の回答：${receiveAnswerInput.answer5}

            上記の価値観を持つあなたに対して以下の言葉を投げかけます。
            投げかける言葉：${receiveAnswerInput.input}

            その投げかけに関して、以下に関して回答を返してください。
            ①きっとあなた自身はこう思った
            ②きっとこれはあなた自身に伝わった
            ③もっとこうして伝えて欲しかった

            回答のフォーマットは必ず以下にしてください。
            ・回答①
            ここに①の回答を100字程度で記入してください。
            
            ・回答②
            ここに②の回答を100字程度で記入してください

            ・回答③
            ここに③の回答を100字程度で記入してください

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
    (async () => await contactAI())();
  }, []);

  return (
    <Container
      color="tertiary"
      centerContent="true"
      p="0">
      <Header title={receiveAnswerInput.nickname} />
      <Container
        marginTop="60px"
        paddingTop="60px">
        {isLoading ? (
          <Center>
            <Loading
              variant="oval"
              fontSize="6xl"
              color={`red.500`}
            />
          </Center>
        ) : (
          <>
            <Text
              height="20px"
              fontSize="18px"
              fontWeight="bold"
              marginLeft="30px">
              心の声
            </Text>
            <ScrollArea
              type="always"
              maxHeight="460px">
              {answers.map((elm, index) => {
                return (
                  <FormControl
                    key={index}
                    width="275px"
                    marginLeft="30px"
                    marginRight="30px"
                    marginTop="10px">
                    <Label
                      fontWeight="bold"
                      fontSize="16px">
                      {fbFormat[index]}
                    </Label>
                    <Text
                      fontSize="14px"
                      height="100%"
                      width="100%">
                      {elm}
                    </Text>
                  </FormControl>
                );
              })}
            </ScrollArea>
          </>
        )}
      </Container>
      <Footer />
    </Container>
  );
}

export default RehearsalOutPage;
