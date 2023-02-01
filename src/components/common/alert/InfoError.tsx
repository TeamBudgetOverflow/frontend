import React from 'react';
import styled from 'styled-components';

import Icon from '../elem/Icon';
import Contact from '../elem/Contact';

const InfoError = () => {
  return (
    <Wrapper>
      <IconWrapper>
        <Icon
          width={80}
          height={80}
          color='#FF6666'
          path='M40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0ZM40.2223 19.5553C42.8723 19.5553 44.9904 21.7388 44.8852 24.362L44.091 44.1774C44.01 46.1982 42.3328 47.7951 40.2914 47.7951C38.2602 47.7951 36.5876 46.2135 36.493 44.2033L35.5608 24.3939C35.4368 21.7589 37.5598 19.5553 40.2223 19.5553ZM40.304 60.4442C37.794 60.4442 36.4159 58.7283 36.4159 56.5711C36.4159 54.4138 37.794 52.6979 40.304 52.6979C42.814 52.6979 44.192 54.4138 44.192 56.5711C44.192 58.7283 42.814 60.4442 40.304 60.4442Z'
        />
      </IconWrapper>
      <TextWrapper>
        <Text>
          문제가 발생했습니다.
          <br />
          관리자에게 문의해주세요
        </Text>
        <Contact />
      </TextWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TextWrapper = styled.div`
  position: absolute;
  top: calc(50% + 120px);
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const Text = styled.div`
  line-height: 150%;
  text-align: center;
  font: ${(props) => props.theme.headingH2};
`;

export default InfoError;
