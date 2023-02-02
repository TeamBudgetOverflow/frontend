import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router';
import styled from 'styled-components';

import DesktopLayout from './DesktopLayout';

const RefreshLayout = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const isPincodeRegistered = localStorage.getItem('isPincodeRegistered') === 'true' ? true : false;

  useEffect(() => {
    if (isPincodeRegistered && accessToken && refreshToken) {
      navigate('/home');
      return;
    }

    if (!accessToken || !refreshToken) {
      navigate('/login');
      return;
    }
  }, [accessToken, refreshToken]);

  return (
    <DesktopLayout>
      <Wrapper>
        <Outlet />
      </Wrapper>
    </DesktopLayout>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default RefreshLayout;
