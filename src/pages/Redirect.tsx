import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import Info from '../components/common/alert/Info';

const Redirect = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const navigate = useNavigate();
  useEffect(() => {
    if (accessToken && refreshToken) {
      navigate('/home');
      return;
    } else if (!accessToken && refreshToken) {
      setTimeout(() => navigate('/pinnumber'), 3000);
      return;
    } else if (!accessToken && !refreshToken) {
      setTimeout(() => navigate('/login'), 3000);
      return;
    }
  }, [accessToken, refreshToken]);

  return (
    <Wrapper>
      {!refreshToken ? (
        <Info>
          로그인 정보가 만료되었습니다.
          <br />
          로그인 화면으로 이동합니다.
        </Info>
      ) : (
        <Info>
          로그인이 만료되었습니다.
          <br />
          핀번호를 다시 입력해주세요.
        </Info>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default Redirect;
