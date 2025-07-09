import { Box, Flex } from '@yamada-ui/react';
import React from 'react';

function LoginOrSignup({ isLogin, setIsLogin }) {
  const loginBorderBottom = isLogin ? 'solid 3px' : 'solid 1px';
  const newAccountBorderBottom = isLogin ? 'solid 1px' : 'solid 3px';

  return (
    <Flex
      dir="row"
      width="100%"
      color="tertiary"
      justify="center">
      <Box
        as="button"
        width="50%"
        borderBottom={loginBorderBottom}
        // borderBottom="solid 3px"
        paddingTop="3"
        paddingBottom="3"
        textAlign="center"
        onClick={() => setIsLogin(true)}>
        ログイン
      </Box>
      <Box
        as="button"
        width="50%"
        borderBottom={newAccountBorderBottom}
        paddingTop="3"
        paddingBottom="3"
        textAlign="center"
        onClick={() => setIsLogin(false)}>
        新規アカウント登録
      </Box>
    </Flex>
  );
}

export default LoginOrSignup;
