import {
  Box,
  Button,
  Container,
  Flex,
  For,
  Grid,
  GridItem,
  Input,
  Radio,
  RadioGroup,
  Avatar,
  FormControl,
  Label,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  Loading,
  HStack,
  IconButton,
} from '@yamada-ui/react';
import arrowBackIcon from '/arrow_back.svg';
import { useNavigate } from 'react-router';

const Header = ({ title }) => {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        bg="#3e4a59"
        position="fixed"
        direction="row"
        justify="space-around"
        align="center"
        width="100%"
        height="52px"
        top={0}>
        <IconButton
          onClick={() => navigate(-1)}
          zIndex={1}
          left="-42%"
          variant="ghost"
          size="30"
          icon={
            <img
              src={arrowBackIcon}
              alt="custom"
            />
          }
        />

        <Text
          zIndex={0}
          position="absolute"
          fontSize="20px"
          color="white">
          {title}
        </Text>
      </Flex>
    </>
  );
};

export default Header;
