import {
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Separator,
  Text,
  FormControl,
} from '@yamada-ui/react';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import appLogo from '/appLogo.png';
import { useNavigate } from 'react-router';
import { IdCard, LockKeyhole, Eye, EyeOff } from 'lucide-react';
import { context } from '../../app/App';

function LoginPage() {
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [nickNameError, setNickNameError] = useState(false);
  const [nickNameErrorMessage, setNickNameErrorMessage] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const navigate = useNavigate();

  const { user, setUser } = useContext(context);

  const loginBorderBottom = isLogin ? 'solid 3px' : 'solid 1px';
  const newAccountBorderBottom = isLogin ? 'solid 1px' : 'solid 3px';

  const handleLogin = async (e) => {
    e.preventDefault();
    setPasswordError(false);
    setNickNameError(false);

    const data = { nickName, password };
    await axios
      .post('/api/auth/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setUser(response.data.data)
        navigate('/partner');
      })
      .catch(function (error) {
        const errorMessage = error.response.data.error;

        if (errorMessage === 'パスワードが間違ってます') {
          setPasswordErrorMessage(errorMessage);
          setPasswordError(true);
        } else if (errorMessage === 'ニックネームが存在しません') {
          setNickNameErrorMessage(errorMessage);
          setNickNameError(true);
        }
      });
  };
  

  return (
    <Container
      centerContent="true"
      gap="none"
      p="0">
      <Box
        // height="61px"
        width="100%">
        <Image src={appLogo} />
      </Box>
      <Flex
        dir="row"
        width="100%"
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
      {isLogin && (
        <Container
          centerContent="true"
          p="0"
          bg="blackAlpha.50">
          <Box
            width="85%"
            paddingTop="5">
            <form onSubmit={(e) => handleLogin(e)}>
              <FormControl
                marginTop="4"
                invalid={nickNameError}
                label="ニックネーム*"
                errorMessage={nickNameErrorMessage}>
                <InputGroup>
                  <InputLeftElement>
                    <IdCard />
                  </InputLeftElement>
                  <Input
                    placeholder="ニックネーム"
                    onChange={(e) => setNickName(e.target.value)}
                    autoComplete="username"
                    size="lg"
                  />
                </InputGroup>
              </FormControl>
              <FormControl
                invalid={passwordError}
                marginTop="4"
                label="パスワード*"
                errorMessage={passwordErrorMessage}>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={isShow ? 'text' : 'password'}
                    placeholder="your password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    size="lg"
                  />
                  <InputLeftElement>
                    <LockKeyhole />
                  </InputLeftElement>

                  <InputRightElement
                    w="4.5rem"
                    clickable>
                    <IconButton
                      icon={isShow ? <Eye /> : <EyeOff />}
                      variant="primary"
                      h="1.75rem"
                      size="sm"
                      onClick={() => setIsShow(!isShow)}>
                      {isShow ? 'Hide' : 'Show'}
                    </IconButton>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                type="submit"
                width="100%"
                marginTop="15"
                color="white"
                bg="gray.300"
                rounded="50"
                disabled={!(nickName && password)}>
                ログイン
              </Button>
            </form>

            {/* <Flex
              marginTop="3"
              direction="row">
              <Box
                hight="46px"
                width="5px"
                bg="primary.600"></Box>
              <Box
                paddingLeft="3"
                bg="white">
                <Text>ニックネームまたはパスワードに誤りがあります。</Text>
              </Box>
            </Flex> */}
          </Box>
          <Box width="85%">
            <Flex align="center">
              <Separator
                variant="solid"
                borderColor="gray.500"
                borderWidth="1px"
              />
              <Text
                width="32"
                margin="3">
                または
              </Text>
              <Separator
                variant="solid"
                borderColor="gray.500"
                borderWidth="1px"
              />
            </Flex>

            <Button
              width="100%"
              marginTop="5"
              marginBottom="5"
              color="white"
              bg="gray.600"
              rounded="50"
              onClick={() => navigate('/partner')}>
              ゲストログイン
            </Button>
          </Box>
        </Container>
      )}
    </Container>
  );
}

export default LoginPage;
