import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import Icon from '../elem/Icon';
import LoadingIcon from '../elem/LoadingIcon';

interface InfoProps {
  type: 'loading' | 'error' | 'accntSuccess' | 'goalSuccess' | 'success' | 'prepare' | '';
  children: React.ReactNode;
}

const Info: FunctionComponent<InfoProps> = ({ type, children }: InfoProps) => {
  const setIcon = () => {
    switch (type) {
      case 'loading':
        return <LoadingIcon size={80} color='#2bc470' />;
      case 'error':
        return (
          <Icon
            width={80}
            height={80}
            color='#FF6666'
            path='M40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0ZM40.2223 19.5553C42.8723 19.5553 44.9904 21.7388 44.8852 24.362L44.091 44.1774C44.01 46.1982 42.3328 47.7951 40.2914 47.7951C38.2602 47.7951 36.5876 46.2135 36.493 44.2033L35.5608 24.3939C35.4368 21.7589 37.5598 19.5553 40.2223 19.5553ZM40.304 60.4442C37.794 60.4442 36.4159 58.7283 36.4159 56.5711C36.4159 54.4138 37.794 52.6979 40.304 52.6979C42.814 52.6979 44.192 54.4138 44.192 56.5711C44.192 58.7283 42.814 60.4442 40.304 60.4442Z'
          />
        );
      case 'accntSuccess':
        return <Img width='280px' height='280px' src={require('../../../assets/icons/accntSuccess.png')} />;
      case 'goalSuccess':
        return <Img width='334px' height='124px' src={require('../../../assets/icons/goalSuccess.png')} />;
      case 'success':
        return <Img width='80px' height='80px' src={require('../../../assets/icons/success.png')} />;
      case 'prepare':
        return <Img width='280px' height='280px' src={require('../../../assets/icons/prepare.png')} />;
      default:
        return <></>;
    }
  };

  return (
    <Wrapper>
      <ContentWrapper>
        {setIcon()}
        <Text>{children}</Text>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Img = styled.img<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
  white-space: pre-wrap;
  font: ${(props) => props.theme.headingH2};
`;

export default Info;
