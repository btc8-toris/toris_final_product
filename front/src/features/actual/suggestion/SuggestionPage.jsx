import React from 'react';
import { useEffect, useState, useContext } from 'react';
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import { context } from '../../../app/App';
import { useLocation, useNavigate } from 'react-router';
import { Container } from '@yamada-ui/react';

function SuggestionPage() {
  const location = useLocation();
  const receiveAnswer = location.state.data;
  console.log('🍓 ~ SuggestionPage ~ receiveAnswer:', receiveAnswer);
  return (
    <Container
      centerContent="true"
      gap="none"
      p="0">
      <Header title={'フィードバック'} />
      <Container
        marginTop="60px"
        paddingTop="60px">
        {/* {壁打ちの画面を移植} */}
      </Container>
      <Footer />
    </Container>
  );
}

export default SuggestionPage;
