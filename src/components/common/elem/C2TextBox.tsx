import React from 'react';
import styled from 'styled-components';

const C2TextBox = ({ text }: { text: string }) => {
  return <TextBox>{text}</TextBox>;
};

const TextBox = styled.div`
  font: ${(props) => props.theme.captionC2};
`;

export default C2TextBox;
