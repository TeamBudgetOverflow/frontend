import React from 'react';
import styled from 'styled-components';

const Contact = () => {
  return <Wrapper>sonewdim@naver.com</Wrapper>;
};

const Wrapper = styled.div`
  text-align: center;
  font: ${(props) => props.theme.paragraphsP3R};
`;

export default Contact;
