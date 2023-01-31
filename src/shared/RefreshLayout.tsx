import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router';
import styled from 'styled-components';

const RefreshLayout = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  useEffect(() => {
    if (accessToken && refreshToken) {
      navigate('/home');
      return;
    }
    if (!accessToken && !refreshToken) {
      navigate('/');
      return;
    }
  }, [accessToken, refreshToken]);

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
