import {
  Button,
  Flex,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Separator,
  Text,
  Container,
  Box,
} from '@yamada-ui/react';
import axios from 'axios';
import { Eye, EyeOff, IdCard, LockKeyhole } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { context } from '../../app/App';

function LoginForm() {
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [nickNameError, setNickNameError] = useState(false);
  const [nickNameErrorMessage, setNickNameErrorMessage] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const navigate = useNavigate();

  const { login, JSON_HEADER, BASE_URL } = useContext(context);

  const handleLogin = async (e) => {
    e.preventDefault();
    setPasswordError(false);
    setNickNameError(false);

    const data = { nickName, password };
    await axios
      .post(`${BASE_URL}/api/auth/login`, data, JSON_HEADER)
      .then((response) => {
        login(JSON.stringify(response.data.data));
        navigate('/home');
      })
      .catch((error) => {
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

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    //ランダムパスワード生成
    let password;
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!#$%&()';
    const string = letters + letters.toUpperCase() + numbers + symbols;

    for (let i = 0; i < 12; i++) {
      password += string.charAt(Math.floor(Math.random() * string.length));
    }
    const data = { nickName: 'ゲスト', password };
    //アカウント登録
    await axios
      .post(`${BASE_URL}/api/auth/register`, data, JSON_HEADER)
      .then(
        //登録したアカウントでlogin
        async () => await axios.post(`${BASE_URL}/api/auth/login`, data, JSON_HEADER),
      )
      .then((response) => {
        login(JSON.stringify(response.data.data));
        navigate('/home');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <Container
      centerContent="true"
      color="tertiary"
      p="0">
      <Box
        width="85%"
        paddingTop="5">
        <form onSubmit={async (e) => await handleLogin(e)}>
          <FormControl
            marginTop="4"
            invalid={nickNameError || passwordError}
            label="ニックネーム"
            errorBorderColor="danger">
            <InputGroup errorBorderColor="danger">
              <InputLeftElement>
                <IdCard />
              </InputLeftElement>
              <Input
                placeholder="ニックネーム"
                onChange={(e) => setNickName(e.target.value)}
                autoComplete="username"
                size="lg"
                errorBorderColor="danger"
              />
            </InputGroup>
          </FormControl>
          <FormControl
            invalid={nickNameError || passwordError}
            marginTop="4"
            label="パスワード"
            errorBorderColor="danger">
            <InputGroup
              size="md"
              errorBorderColor="danger">
              <Input
                pr="4.5rem"
                type={isShow ? 'text' : 'password'}
                placeholder="パスワード"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                size="lg"
                errorBorderColor="danger"
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
            rounded="50"
            colorScheme="primary"
            disabled={!(nickName && password)}>
            ログイン
          </Button>
        </form>

        {(nickNameError || passwordError) && (
          <Flex
            marginTop="3"
            direction="row">
            <Box
              hight="46px"
              width="5px"
              bg="mysticRed.500"></Box>
            <Box
              paddingLeft="3"
              bg="white">
              <Text color="mysticRed.500">ニックネームまたはパスワードに誤りがあります。</Text>
            </Box>
          </Flex>
        )}
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
          colorScheme="primary"
          rounded="50"
          onClick={(e) => handleGuestLogin(e)}>
          ゲストログイン
        </Button>
      </Box>
    </Container>
  );
}

export default LoginForm;
