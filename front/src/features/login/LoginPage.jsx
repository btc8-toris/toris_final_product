import { Box, Container,  Image } from '@yamada-ui/react';
import React, { useState } from 'react';
import appLogo from '/appLogo.png';
import LoginForm from './LoginForm';
import SignupForm from './SignUpForm';
import LoginOrSignup from './LoginOrSignup';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Container
      centerContent="true"
      gap="none"
      p="0">
      <Box
        width="100%">
        <Image src={appLogo} />
      </Box>
      <LoginOrSignup isLogin={isLogin} setIsLogin={setIsLogin}/>
      {isLogin ? <LoginForm /> : <SignupForm />}
    </Container>
  );
}

export default LoginPage;
