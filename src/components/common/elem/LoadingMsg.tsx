import React from 'react';
import styled from 'styled-components';
import LoadingIcon from './LoadingIcon';

const LoadingMsg = () => {
  return (
    <Wrapper>
      <LoadingIcon size={30} color='white' />
      <Text>데이터를 불러오는 중 입니다</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Text = styled.div`
  font: ${(props) => props.theme.captionC2};
`;

export default LoadingMsg;
