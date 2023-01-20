import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { userInfo } from '../recoil/userAtoms';

const PublicLayout = () => {
  const { isLogin, isAccessToken, isRefreshToken } = useRecoilValue(userInfo);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate('/home');
      return;
    }
    if (!isAccessToken && isRefreshToken) {
      navigate('/pinnumber');
      return;
    }
  }, []);

  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default PublicLayout;
