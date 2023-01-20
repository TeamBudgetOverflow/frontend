import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface InfoProps {
  children: React.ReactNode;
}

const Info: FunctionComponent<InfoProps> = ({ children }: InfoProps) => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Img></Img>
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
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Img = styled.div`
  width: 120px;
  height: 120px;
  border: 1px solid black;
`;

const Text = styled.div`
  text-align: center;
  white-space: pre-wrap;
  font: ${(props) => props.theme.headingH2};
`;

export default Info;
