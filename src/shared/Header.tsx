import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return <Wrapper>Header</Wrapper>;
};

const Wrapper = styled.div`
  height: 100px;
  background-color: ${(props) => props.theme.primaryMain};
`;

export default Header;
