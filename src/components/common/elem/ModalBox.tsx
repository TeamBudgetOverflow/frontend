import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import Icon from './Icon';

interface ModalBoxProps {
  title: string;
  closeHandler: () => void;
  children: React.ReactNode;
}

const ModalBox: FunctionComponent<ModalBoxProps> = ({ title, closeHandler, children }) => {
  return (
    <Modal>
      <ContentWrapper>
        <Button onClick={closeHandler}>
          <Icon
            size={24}
            color={'primary400'}
            path='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z'
          />
        </Button>
        <Title>{title}</Title>
        <Content>{children}</Content>
      </ContentWrapper>
    </Modal>
  );
};

const Modal = styled.div`
  padding: 5%;
  width: 80%;
  background-color: white;
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Button = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  :hover {
    cursor: pointer;
  }
`;

const Title = styled.div`
  font: ${(props) => props.theme.headingH4};
`;

const Content = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  font: ${(props) => props.theme.parag};
`;

export default ModalBox;
