import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@yamada-ui/react';
import axios from 'axios';
import { Eye, EyeOff, IdCard, LockKeyhole } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { context } from '../../app/App';
import { useNavigate } from 'react-router';

function SignupForm() {
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [isHaveAccount, setIsHaveAccount] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { login, JSON_HEADER, BASE_URL } = useContext(context);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      password.length !== 0 &&
      !/^(?=.*?[a-z])(?=.*?[\d])(?=.*?[!-\/:-@[-`{-~])[!-~]{8,16}$/.test(password)
    ) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [password]);

  const handleSignupAndLogin = async (e) => {
    e.preventDefault();
    const data = { nickName, password };
    //すでに登録済のアカウントか確認
    await axios
      .post(`${BASE_URL}/api/auth/login`, data, JSON_HEADER)
      .then((response) => {
        setIsHaveAccount(true);
      })
      .catch(async () => {
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
      });
  };

  //アカウント登録

  return (
    <Container
      centerContent="true"
      p="0"
      color="tertiary"
      // bg="blackAlpha.50"
    >
      <Box
        width="85%"
        paddingTop="5">
        <Heading>ようこそ！</Heading>
        <form onSubmit={async (e) => await handleSignupAndLogin(e)}>
          <FormControl
            marginTop="4"
            label="ニックネーム">
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
            label="パスワード"
            errorMessage="パスワード規則を満たしていません">
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={isShow ? 'text' : 'password'}
                placeholder="パスワード"
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
          <Text size="xs">半角英数字と記号を含む8文字以上</Text>
          <Button
            type="submit"
            width="100%"
            marginTop="15"
            marginBottom="15"
            color="white"
            colorScheme="primary"
            rounded="50"
            disabled={!(nickName && password && !passwordError)}>
            登録してログイン
          </Button>
        </form>
        {isHaveAccount && (
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
              <Text color="mysticRed.500">アカウント登録できませんでした。</Text>
            </Box>
          </Flex>
        )}
      </Box>
    </Container>
  );
}

export default SignupForm;
