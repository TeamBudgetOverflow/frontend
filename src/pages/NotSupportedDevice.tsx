import React from 'react';
import styled from 'styled-components';

const NotSuppoertedDevice = () => {
  return (
    <Wrapper>
      <Text>
        화면을 지원하지 않는 기기 입니다. <br /> 다른 기기에서 접속해 주세요.{' '}
      </Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: calc(100% - 200px);
  background-color: white;
  overflow: hidden;
`;

const Text = styled.div`
  font: ${(props) => props.theme.headingH2};
  text-align: center;
`;

export default NotSuppoertedDevice;
