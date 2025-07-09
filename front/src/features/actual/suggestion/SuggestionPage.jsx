import React from 'react';
import { useEffect, useState, useContext } from 'react';
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import { context } from '../../../app/App';
import { useLocation, useNavigate } from 'react-router';
import { Container, FormControl, Label, Loading, Center, Text, ScrollArea } from '@yamada-ui/react';
import SmallAvatar from '../../../components/Avatar/SmallAvatar';
import axios from 'axios';

function SuggestionPage() {
  const location = useLocation();
  const receiveAnswer = location.state.data;
  console.log('🍓 ~ SuggestionPage ~ receiveAnswer:', receiveAnswer);

  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fbFormat = ['感じたこと', '伝わったこと', 'こう伝えて欲しかった'];
  const { BASE_URL } = useContext(context);

  // ここでAIへ壁打ちする関数をマウント時に一回呼び出す
  useEffect(() => {
    const contactAI = async () => {
      try {
        setIsLoading(true); //開始時にローディング
        const transcripts = receiveAnswer.transcript.map((obj) => {
          return { transcript: obj.transcript, speaker_label: obj.speaker_label };
        });
        console.log('🍓 ~ transcripts ~ transcripts:', transcripts);

        // 投げかけ方法を考えるtranscriptの中に会話は保存
        const res = await axios.post(
          `${BASE_URL}/api/llm/questions`,
          {
            message: `今から部下になりきってもらいます。
            まずは以下の質問への回答からあなたの価値観を認識してください。
            質問1：仕事をしていて「やりがい」を感じる瞬間はどれですか？
            質問1の回答：${receiveAnswer.answer1}
            質問2：理想の上司像に一番近いのはどれですか？
            質問2の回答：${receiveAnswer.answer2}
            質問3：あなたにとって「成果」とは何ですか？
            質問3の回答：${receiveAnswer.answer3}
            質問4：仕事とプライベートの理想の関係性は？
            質問4の回答：${receiveAnswer.answer4}
            質問5:仕事で最も大事だと思う文化・雰囲気は？
            質問5の回答：${receiveAnswer.answer5}

            上記の価値観を持つあなたと上司は以下の会話をしました。
            あなたはspeaker_labelがspk_1で上司がspk_0です
            ${transcripts}

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
        const resTextProposal = res.data.data.choices[0].message.content;

        const answer1 = resTextProposal.match(/・回答①\n([\s\S]*?)\n・回答②/); // 戻り値は配列なのに注意
        const answer2 = resTextProposal.match(/・回答②\n([\s\S]*?)\n・回答③/); // 戻り値は配列なのに注意
        const answer3 = resTextProposal.match(/・回答③([\s\S]*)$/); // 戻り値は配列なのに注意

        setAnswers([answer1[1], answer2[1], answer3[1]]);
      } catch (error) {
        console.error('contactAI', error);
      } finally {
        setIsLoading(false); //完了時にローディングOFF
      }
    };

    //
    (async () => await contactAI())();
  }, []);

  console.log(answers);

  return (
    <Container
      centerContent="true"
      color="tertiary"
      gap="none"
      p="0">
      <Header title={receiveAnswer.nickname} />
      <Container
        marginTop="60px"
        paddingTop="60px">
        {/* <SmallAvatar nickName={receiveAnswer.nickname} /> */}
        {/* AIからの解答結果を表示 */}
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
              maxHeight="480px">
              {answers.map((elm, index) => {
                return (
                  <FormControl
                    key={index}
                    // height="100px"
                    width="275px"
                    marginTop="10px"
                    marginLeft="30px"
                    marginRight="30px">
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

export default SuggestionPage;
