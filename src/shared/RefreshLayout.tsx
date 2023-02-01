import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router';
import styled from 'styled-components';

import DesktopLayout from './DesktopLayout';

const RefreshLayout = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const IsNewComer = localStorage.getItem('isNewComer');

  useEffect(() => {
    if (!IsNewComer) {
      if (accessToken && refreshToken) {
        navigate('/home');
        return;
      }
      if (!accessToken && !refreshToken) {
        navigate('/login');
        return;
      }
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
  min-width: 414px;
  height: 100%;
`;

export default RefreshLayout;
