import React from 'react';
import styled from 'styled-components';

const C3TextBox = ({ text }: { text: string }) => {
  return <TextBox>{text}</TextBox>;
};

const TextBox = styled.div`
  font: ${(props) => props.theme.captionC3};
`;

export default C3TextBox;
