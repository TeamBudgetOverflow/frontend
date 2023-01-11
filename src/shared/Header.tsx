import React from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userInfo } from '../recoil/atoms';

const Header = () => {
  const location = useLocation();
  const { isLogin } = useRecoilValue(userInfo);

  console.log(location);

  return <HeaderLayout>Header</HeaderLayout>;
};

const HeaderLayout = styled.div`
  height: 50px;
  background-color: ${(props) => props.theme.primaryMain};
`;

export default Header;
