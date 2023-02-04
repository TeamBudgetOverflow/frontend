import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface ModalBoxProps {
  show: boolean;
  bgColor?: string;
  children: React.ReactNode;
}

const ModalBox: FunctionComponent<ModalBoxProps> = ({ show, children, bgColor }) => {
  return (
    <Wrapper show={show}>
      <Modal bgColor={bgColor}>
        <ContentWrapper>{children}</ContentWrapper>
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: ${(props) => (props.show ? '' : 'none')};
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div<{ bgColor?: string }>`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 22px;
  width: calc(100% - 44px);
  max-height: 616px;
  border-radius: 16px 16px 0 0;
  background-color: ${(props) => (props.bgColor ? `${props.bgColor}` : 'white')};
  @media screen and (max-height: 700px) {
    height: calc(100% - 100px);
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export default ModalBox;
