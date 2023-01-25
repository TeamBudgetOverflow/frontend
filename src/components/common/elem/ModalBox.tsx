import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface ModalBoxProps {
  show: boolean;
  children: React.ReactNode;
}

const ModalBox: FunctionComponent<ModalBoxProps> = ({ show, children }) => {
  return (
    <Wrapper show={show}>
      <Modal>
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
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 22px;
  width: calc(100% - 44px);
  border-radius: 16px 16px 0 0;
  background-color: white;
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export default ModalBox;
