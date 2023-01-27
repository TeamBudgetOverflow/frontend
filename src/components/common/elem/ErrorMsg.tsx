import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';

const ErrorMsg = () => {
  return (
    <Wrapper>
      <Icon
        width={24}
        height={24}
        color='white'
        path='M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z'
      />
      <Text>
        문제가 발생했습니다.
        <br />
        다시 시도해주세요
      </Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const Text = styled.div`
  text-align: center;
  font: ${(props) => props.theme.captionC2};
`;

export default ErrorMsg;
