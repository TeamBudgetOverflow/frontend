import React from 'react';
import styled from 'styled-components';

interface ValidateMsgProps {
  msg: string;
  type: 'error' | 'success';
}

const ValidateMsg = ({ msg, type }: ValidateMsgProps) => {
  return <Msg type={type}>{msg}</Msg>;
};

const Msg = styled.p<{ type: 'error' | 'success' }>`
  font: ${(props) => props.theme.captionC3};
  color: ${(props) => (props.type === 'error' ? 'red' : 'blue')};
`;

export default ValidateMsg;
