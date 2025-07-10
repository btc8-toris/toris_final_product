import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Container,
  Flex,
  ScrollArea,
  Button,
  VStack,
  IconButton,
  Image,
  Loading,
  Center,
} from '@yamada-ui/react';
import './ContextFrame.css';
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import { useContext } from 'react';
import { context } from '../../../app/App';
import { useLocation, useNavigate } from 'react-router';
import analysisIcon from '/analysis.svg';
import axios from 'axios';

const sampleLogs = [
  [
    {
      transcript:
        'ゆうたろうさん、ちょっと時間あるかな？急で申し訳ないんだけど、追加でお願いしたい仕事があって。',
      speaker_label: 'spk_0',
    },
    { transcript: 'はい、大丈夫です。どういった仕事でしょうか？', speaker_label: 'spk_1' },
    {
      transcript:
        '来週のクライアント向けの企画案なんだけど、急遽方向転換があってね。新しい提案を考え直す必要が出てきたんだ。ゆうたろうさんの視点でアイデアを出してもらえないかなと思って。',
      speaker_label: 'spk_0',
    },
    {
      transcript: 'なるほど…。かなりざっくりした状態からの立て直し、って感じですね。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        'うん、そうなる。でも、これって逆にゆうたろうさんにとっては、ちょっとチャレンジのしがいがあるかなと思ってて。自由度も高いし、自分の色が出せる仕事だと思うよ。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        '確かに、難しそうだけど面白そうです。自分なりに考えて提案が形になれば、成長にもつながると思いますし。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        'そう言ってくれると助かるよ。もちろん、無理に全部一人でやる必要はない。必要なら他のメンバーとも協力して進めてもらっていいからね。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        'ありがとうございます。チームで意見出し合って進められたら、もっと良い案になりそうですね。自分でも納得できる形に仕上げたいです。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        'いいね、その姿勢。ゆうたろうさんは自分の軸を持って仕事に向き合ってくれてるから、任せがいがあるよ。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        'そう言ってもらえるの、すごく励みになります。じゃあ、ざっくり全体像を把握したら、まずはラフ案を出してみますね。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        'うん、それでいこう。何かあったらいつでも相談して。ゆうたろうさんの挑戦、全力で応援するよ。',
      speaker_label: 'spk_0',
    },
    { transcript: 'ありがとうございます。全力で取り組みます！', speaker_label: 'spk_1' },
  ],
  [
    {
      transcript:
        'Rukaさん、ちょっといいかな？急で申し訳ないんだけど、追加でお願いしたい仕事があってね。',
      speaker_label: 'spk_0',
    },
    { transcript: 'はい、大丈夫です。どんな内容でしょうか？', speaker_label: 'spk_1' },
    {
      transcript:
        '来週のクライアント向けの提案資料なんだけど、別の案件が立て込んできて、手が回らなくなってしまって。Rukaさんにまとめてほしいんだ。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        '了解しました。ただ…一つ確認してもいいですか？今週は既に他のタスクも詰まっていて…。納期や優先度を整理してもらえると助かります。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        'うん、それは大事だね。正直に言ってくれてありがとう。今のタスクの状況、少し一緒に確認しようか。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        'ありがとうございます。できれば他のメンバーにも少し協力をお願いできれば、助け合って効率的に進められると思います。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        'なるほど、チームでやる方向もありだね。じゃあ、山本さんにも声をかけてみるよ。あと、この提案資料、Rukaさんの意見や工夫も入れてもらえると嬉しい。チャレンジの場にもなると思うんだ。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        'そう言ってもらえると、モチベーション上がります。やるからには、お客様にも喜んでもらえるものにしたいですね。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        'いいね、その姿勢。じゃあ、優先順位を整理した上で、チームでどう進めるか一緒に計画しよう。無理させるつもりはないから、プライベートとのバランスも意識して。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        'ありがとうございます。助かります。じゃあ、少しタスクの整理をしてから、スケジュール案を共有しますね。',
      speaker_label: 'spk_1',
    },
    { transcript: 'よろしく頼むよ。Rukaさん、いつもありがとう。', speaker_label: 'spk_0' },
  ],
  [
    {
      transcript:
        'さるさん、今ちょっといいかな？急で申し訳ないんだけど、追加でお願いしたい仕事があって…',
      speaker_label: 'spk_0',
    },
    { transcript: 'はい、大丈夫です。内容を教えていただけますか？', speaker_label: 'spk_1' },
    {
      transcript:
        'ありがとう。実は、来週のプロジェクト説明会用の資料が急遽必要になってしまってね。別の案件とバッティングして手が回らなくて…さるさんに任せられないかと思って。',
      speaker_label: 'spk_0',
    },
    {
      transcript: '了解しました。全体のゴールや、誰向けの資料なのかは決まってますか？',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        'うん、ゴールは“新しい施策の方向性を共有して、関係部署の理解を得ること”。内容の骨子はこっちで用意するけど、資料構成や表現はある程度任せたいと思ってる。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        'なるほど…結構責任ある内容ですね。でも、会社として重要な方向性なら、関われるのはありがたいです。やりがいも感じそうですし。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        'さるさんの視点で整理してもらえると、チームとしてもすごく助かる。プレッシャーにならない範囲で、挑戦だと思ってもらえたら。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        'ありがとうございます。自分の成長にもつながると思うので、前向きに取り組みます。ただ、納期と今のタスクの兼ね合いは少し調整が必要かもしれません。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        'そこはちゃんと調整するよ。プライベートとの切り替えも大事にしてほしいから、無理なスケジュールにはしないようにしよう。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        'ありがとうございます。じゃあ、明日中に今の進捗を整理して、資料の着手タイミングを提案させてください。あと、もし必要であれば、他のメンバーにも一部協力をお願いしたいです。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        'もちろん。チームで助け合ってやろう。さるさんがこういう場面で一歩踏み出してくれるのは、本当に心強いよ。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        'そう言ってもらえると嬉しいです。全体の目標にちゃんと貢献できるように、頑張ります。',
      speaker_label: 'spk_1',
    },
  ],
  [
    {
      transcript: 'つるちゃん、今いいかな？ちょっと急なんだけど、追加でお願いしたい仕事があって。',
      speaker_label: 'spk_0',
    },
    { transcript: 'はい、大丈夫です。どんな内容ですか？', speaker_label: 'spk_1' },
    {
      transcript:
        '今動いてるA社の件なんだけど、急遽B社にも似た課題があることが分かって、同じ切り口で提案できないかと思ってるんだ。来週頭までにたたき台を作ってもらえないかな。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        '了解です。B社の方は前に一度担当したことがあるので、早めに状況整理すれば対応できそうです。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        'そうか、それは助かる。提案内容について細かい指示はしないけど、A社でやってる方向性をベースに、つるちゃんなりに展開してもらえれば。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        '任せてもらえるなら、その方がやりやすいです。クライアントの課題にきちんと向き合って、自分なりに納得いく形で仕上げたいので。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        'うん、期待してるよ。つるちゃんの仕事ぶりは信頼してるし、こういう場面での判断力にも任せたいと思ってる。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        'ありがとうございます。少し情報を整理して、必要なら他のメンバーにも確認します。チームで動いた方が速い部分もあるので。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        'それがいいね。今回もチームの連携がポイントになると思う。つるちゃんのリードに期待してる。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        'わかりました。じゃあ、今日はまずB社の資料を確認して、明日には方向性をまとめてみます。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        '助かる。仕事が充実すると、プライベートもうまく回るタイプだよね。無理しすぎず、でも全力で頼んだよ。',
      speaker_label: 'spk_0',
    },
    { transcript: 'その通りです。やるなら全力でやります。', speaker_label: 'spk_1' },
  ],
  [
    {
      transcript:
        'ポンタさん、今ちょっといい？急で申し訳ないんだけど、追加でお願いしたい仕事があって…',
      speaker_label: 'spk_0',
    },
    { transcript: 'はい、大丈夫です。何が起きたんですか？', speaker_label: 'spk_1' },
    {
      transcript:
        '実は、C社から今朝『競合が新しい提案をしてきた』って連絡があって。こっちも対抗策を早急に出す必要がある。来週の中盤までに、新しい案をまとめて提案できる状態にしたいんだ。',
      speaker_label: 'spk_0',
    },
    {
      transcript: 'なるほど…なかなか骨のあるやつですね。でも、そういうの燃えます。やります。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        'ありがとう。今回はちょっと難しいテーマかもしれないけど、ポンタさんの経験と視点が頼りになると思って。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        '難しいほうが面白いですし、成長できますからね。でも一人で抱えると視野が狭くなるので、できれば佐藤さんも一緒に現場に入ってもらえませんか？細かいニュアンスとか、その場で確認できると助かるので。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        'もちろん、そこは任せきりにはしないよ。一緒に動こう。現場の情報を拾いながら、作戦立てていこうか。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        'ありがとうございます。それなら、安心して突っ込めます。チームで動いて突破口見つけましょう。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        'うん、ポンタさんのそういう前向きな姿勢、すごくいいと思う。無理に線引きせず、仕事を楽しんでる感じが伝わってくるよ。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        'そうですね、自分にとってはほとんど趣味みたいなもんですし。やるからには、とことんやりたいです。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        '頼もしいな。それじゃ、今日中に方向性だけでも擦り合わせよう。俺も手を動かすつもりでいるから、一緒に頑張ろう。',
      speaker_label: 'spk_0',
    },
    {
      transcript: '了解です。じゃあ、すぐに今ある情報まとめて、15分後くらいに1回集まれますか？',
      speaker_label: 'spk_1',
    },
    { transcript: 'いいね、そのテンポ。よろしく頼んだよ、ポンタさん。', speaker_label: 'spk_0' },
  ],
  [
    {
      transcript:
        'ウエンツさん、ちょっといいかな？ 急なんだけど、追加でお願いしたい仕事があるんだ。',
      speaker_label: 'spk_0',
    },
    { transcript: 'はい、大丈夫です。どういった仕事でしょうか？', speaker_label: 'spk_1' },
    {
      transcript:
        '今進んでるDプロジェクトの件で、別部署から『このタイミングで一緒に提案したい』って要望が来てね。来週頭の全体会議までに、追加のプレゼン資料をまとめる必要があるんだ。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        'なるほど…。ちょっとタイトですね。でも、チームの動きに関わるなら無視できませんね。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        'うん、正直なところ大変な状況だけど、こういうタイミングでウエンツさんに任せたいと思った。資料の構成とかも、ある程度自由にやってくれていい。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        'ありがとうございます。自分にとっても成長の機会になりますし、会社の目標にも直結するならやりがいありますね。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        'そう言ってくれると助かるよ。あくまでチームで乗り越えることが大事だから、必要があれば周りにもどんどん頼っていいからね。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        'はい、仲間に声かけながら進めます。自分だけでやるより、結果的に良いものになりますし。あと、ちょっとだけ仕事の優先順位見直してもいいですか？ 全力でやる分、整理して取り組みたいので。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        'もちろん。その判断も任せるよ。プライベート含めてエネルギー使うタイプだと思うから、無理なく、でも全力で頼む。',
      speaker_label: 'spk_0',
    },
    {
      transcript:
        'はい、ありがとうございます。やるからにはしっかりやります。明日中にドラフトの方向性出せるように動きますね。',
      speaker_label: 'spk_1',
    },
    {
      transcript:
        '心強いな。じゃあ、進め方で困ったことがあればいつでも声かけて。挑戦、応援してるよ。',
      speaker_label: 'spk_0',
    },
    { transcript: 'はい、頑張ります！', speaker_label: 'spk_1' },
  ],
];

function ConversationLogPage() {
  const location = useLocation();
  const receiveAnswer = location.state.data;
  const { BASE_URL } = useContext(context);
  const [transcripts, setTranscripts] = useState([]);
  const navigate = useNavigate();
  const [sendData, setSendData] = useState({});
  const [load, setLoad] = useState(true);

  const text = async (mp3File) => {
    const data = await fetch(`${BASE_URL}/api/voices/transcription-result/${mp3File}`).then((res) =>
      res.json(),
    );

    if (data.status === 'completed') {
      setLoad(false);
      setTranscripts(data.text);
      receiveAnswer.transcript = data.text;
    } else if (data.status === 'in_progress') {
      setLoad(true);
      setTimeout(async () => await text(mp3File), 5000);
    } else {
      console.error('文字起こしに失敗：', data.reason);
    }
  };

  const analysis = async () => {
    await axios.put(`${BASE_URL}/api/conversations/read/${receiveAnswer.transcript_url}`);

    navigate('/actual/suggestion', { state: { data: sendData } });
  };
  useEffect(() => {
    if (receiveAnswer.transcript_url === 'sample') {
      setLoad(false);
      setTranscripts(sampleLogs[receiveAnswer.id - 1]);
      receiveAnswer.transcript = sampleLogs[receiveAnswer.id - 1];
    } else {
      (async () => {
        await text(receiveAnswer.transcript_url);
      })();
    }
    setSendData(receiveAnswer);
  }, []);

  return (
    <Container
      color="tertiary"
      centerContent="true"
      gap="none"
      p="0">
      <Header title={'対話ログ'} />
      <Container
        marginTop="60px"
        paddingTop="60px">
        {load ? (
          <Center>
            <Loading
              variant="oval"
              fontSize="6xl"
              color={`red.500`}
            />
          </Center>
        ) : (
          <ScrollArea
            maxHeight="427px"
            type="scroll">
            <VStack>
              {transcripts.map((transcript, index) => {
                return transcript.speaker_label === 'spk_0' ? (
                  <React.Fragment key={index}>
                    <Flex
                      className="message-bubble"
                      direction="row"
                      justify="end">
                      <Box
                        key={index}
                        className="message-bubble--mine"
                        bg="#D2F1E7"
                        margin="3"
                        rounded="lg"
                        padding="2"
                        width="80%">
                        {transcript.transcript}
                      </Box>
                    </Flex>
                  </React.Fragment>
                ) : (
                  <Box key={index}>
                    <Box marginBottom="2px">
                      <Avatar
                        name={receiveAnswer.nickname}
                        size="sm"
                        bg="#c4c4c4"
                        color="tertiary"
                      />
                      {receiveAnswer.nickname}
                    </Box>
                    <Flex
                      direction="row"
                      className="message-bubble"
                      marginLeft="15px">
                      <Box
                        className="message-bubble--other"
                        bg="gray.50"
                        margin="3"
                        rounded="lg"
                        padding="2"
                        width="80%">
                        {transcript.transcript}
                      </Box>
                    </Flex>
                  </Box>
                );
              })}
            </VStack>
          </ScrollArea>
        )}
        <IconButton
          colorScheme="primary"
          width="120px"
          marginLeft="auto"
          onClick={analysis}
          icon={
            <Image
              src={analysisIcon}
              alt="分析"
            />
          }>
          分析
        </IconButton>
      </Container>
      <Footer />
    </Container>
  );
}

export default ConversationLogPage;
