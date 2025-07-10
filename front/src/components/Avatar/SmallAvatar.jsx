import { Flex, Avatar, Text } from '@yamada-ui/react';

const SmallAvatar = ({ nickName }) => {
  return (
    <Flex
      paddingTop="70px"
      paddingLeft="30px"
      align="left"
      width="100%">
      {' '}
      <Avatar
        size={'md'}
        name={nickName}
        bg="#c4c4c4"
        color="tertiary"
      />
      <Text
        fontSize="16px"
        marginLeft="10px"
        marginTop="13px"
        color="tertiary">
        {nickName}
      </Text>
    </Flex>
  );
};

export default SmallAvatar;
