import { VStack, Avatar, Text } from '@yamada-ui/react';

const BigAvatar = ({ nickName }) => {
  return (
    <VStack align="center">
      <Avatar
        size={'2xl'}
        name={nickName}
      />
      <Text fontSize="23px">{nickName}</Text>
    </VStack>
  );
};

export default BigAvatar;
