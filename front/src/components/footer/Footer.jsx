import { Flex, IconButton } from '@yamada-ui/react';
import homeOffIcon from '/home_off_icon.svg';
import homeOnIcon from '/home_on_icon.svg';
import serchOffIcon from '/serch_off_icon.svg';
import serchOnIcon from '/serch_on_icon.svg';
import valuesOffIcon from '/values_off_icon.svg';
import valuesOnIcon from '/values_on_icon.svg';
import valuesOffMaruIcon from '/values_off_icon_maru.svg';
import { useNavigate } from 'react-router';

const Footer = ({ onIndex }) => {
  const homeIcon = onIndex === 1 || onIndex === 4 ? homeOnIcon : homeOffIcon;
  const serchIcon = onIndex === 2 ? serchOnIcon : serchOffIcon;
  let valueIcon;

  if (onIndex === 3) {
    valueIcon = valuesOnIcon;
  } else if (onIndex === 4) {
    valueIcon = valuesOffMaruIcon;
  } else {
    valueIcon = valuesOffIcon;
  }
  const navigate = useNavigate();

  return (
    <>
      <Flex
        bg="#3e4a59"
        direction="row"
        justify="space-around"
        align="center"
        width="100%"
        height="67px"
        rounded="16px 16px 0 0"
        position="fixed"
        bottom={0}>
        <IconButton
          onClick={() => navigate('/home')}
          variant="link"
          colorScheme="warning"
          size="40px"
          icon={
            <img
              src={homeIcon}
              alt="custom"
            />
          }
        />
        <IconButton
          onClick={() => navigate('/partner')}
          variant="link"
          colorScheme="warning"
          size="40px"
          icon={
            <img
              src={serchIcon}
              alt="custom"
            />
          }
        />
        <IconButton
          onClick={() => navigate('/question/intro')}
          variant="link"
          colorScheme="warning"
          size="40px"
          icon={
            <img
              src={valueIcon}
              alt="custom"
            />
          }
        />
      </Flex>
    </>
  );
};

export default Footer;
