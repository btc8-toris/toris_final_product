import { Box, Button, Container, Flex, Image, Separator, Text } from '@yamada-ui/react';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import appLogo from '/appLogo.png';
import { useNavigate } from 'react-router';

function LoginPage() {
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate()

  const loginBorderBottom = isLogin ? 'solid 3px' : 'solid 1px'
  const newAccountBorderBottom = isLogin ? 'solid 1px' : 'solid 3px'
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async() =>{
    const data = { nickName: { nickName }, password: { password } };
    console.log(data);
    
    // response = await axios
    //   .post('/api/login', data)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

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
          onClick={()=>setIsLogin(true)}
          >
          ログイン
        </Box>
        <Box
          as="button"
          width="50%"
          borderBottom={newAccountBorderBottom}
          paddingTop="3"
          paddingBottom="3"
          textAlign="center"
          onClick={()=>setIsLogin(false)}
          >
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
              <form onSubmit={handleLogin}>

            <TextField
              required
              color="black"
              id="outlined-required"
              label="ニックネーム"
              fullWidth
              margin="normal"
              onChange={(e) => setNickName(e.target.value)}
            />

            <FormControl
              sx={{ marginBottom: '10px' }}
              variant="outlined"
              margin="normal"
              fullWidth>
              <InputLabel
                htmlFor="outlined-adornment-password"
                color="black">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                required
                label="password"
                color="black"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                inputProps={{
                  autoComplete: 'current-password', // OutlinedInputの場合、inputPropsを使用します
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'hide the password' : 'display the password'}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
            type='submit'
              width="100%"
              marginTop="5"
              color="white"
              bg="gray.300"
              rounded="50"
              onClick={handleLogin}
              >
              ログイン
            </Button>
            </form>

            <Flex
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
            </Flex>
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
              marginTop="1"
              marginBottom="5"
              color="white"
              bg="gray.600"
              rounded="50"
              onClick={()=>navigate('/partner')}>
              ゲストログイン
            </Button>
          </Box>
        </Container>
      )}
    </Container>
  );
}

export default LoginPage;
