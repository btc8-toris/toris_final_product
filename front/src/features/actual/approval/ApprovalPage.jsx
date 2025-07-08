import React, { useEffect, useState, useContext } from 'react';
import unapprovedIcon from '/unapproved.svg';
import approvedIcon from '/approved.svg';
import { Text, IconButton, Center, VStack, Container, Image } from '@yamada-ui/react';
import Header from '../../../components/header/Header';
import { useNavigate, useLocation } from 'react-router';
import Footer from '../../../components/footer/Footer';
import { context } from '../../../app/App';

function ApprovalPage() {
  const [pairArrow, setPairArrow] = useState(false);
  const [userArrow, setUserArrow] = useState(false);
  const [sendData, setSendData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { BASE_URL } = useContext(context);

  const receiveAnswer = location.state.data;

  const pairClick = () => {
    setPairArrow(!pairArrow);
  };
  const userClick = () => {
    setUserArrow(!userArrow);
  };

  useEffect(() => {
    setPairArrow(false);
    setUserArrow(false);
  }, []);

  useEffect(() => {
    setSendData(receiveAnswer);
    if (pairArrow && userArrow) {
      setTimeout(() => navigate('/actual/listen', { state: { data: sendData } }), 800);
    }
  }, [userArrow, pairArrow]);

  return (
    <>
      <Container
        centerContent="true"
        gap="none"
        p="0">
        <Header title={'ふたり対話'} />
        <Container
          marginTop="60px"
          paddingTop="60px">
          <VStack
            marginTop="15px"
            align="center"
            gap="60px">
            <IconButton
              height="105px"
              width="235px"
              variant="unstyle"
              onClick={pairClick}
              icon={
                <Image
                  style={{ transform: 'scale(-1,-1)' }}
                  src={pairArrow ? approvedIcon : unapprovedIcon}
                  alt="承認"
                />
              }></IconButton>
            <Text
              fontSize="18px"
              textAlign="center"
              color="#FF5500">
              -注意-
              <br />
              相手の承認なしに録音した内容を
              <br />
              不正に利用したり、公開したりすると
              <br />
              プライバシー侵害や名誉毀損などの罪に
              <br />
              問われる可能性があります。
            </Text>
            <IconButton
              height="105px"
              width="235px"
              variant="unstyle"
              onClick={userClick}
              icon={
                <Image
                  src={userArrow ? approvedIcon : unapprovedIcon}
                  alt="承認"
                />
              }></IconButton>
          </VStack>
        </Container>
        <Footer />
      </Container>
    </>
  );
}

export default ApprovalPage;
