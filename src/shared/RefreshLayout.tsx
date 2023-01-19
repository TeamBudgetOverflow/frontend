import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Outlet } from 'react-router';
import styled from 'styled-components';

import { userInfo } from '../recoil/userAtoms';

const RefreshLayout = () => {
  const { isLogin, isAccessToken, isRefreshToken } = useRecoilValue(userInfo);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate('/goals/lookup');
      return;
    }
    if (!isAccessToken && !isRefreshToken) {
      navigate('/login');
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

export default RefreshLayout;
