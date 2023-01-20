import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Info from '../components/common/alert/Info';

import { userInfo } from '../recoil/userAtoms';

const Redirect = () => {
  const setUserInfo = useSetRecoilState(userInfo);
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const checkToken = () => {
    if (!accessToken && refreshToken) {
      setUserInfo({
        id: 0,
        isLogin: false,
        isAccessToken: false,
        isRefreshToken: true,
      });
    }

    if (!accessToken && !refreshToken) {
      setUserInfo({
        id: 0,
        isLogin: false,
        isAccessToken: false,
        isRefreshToken: false,
      });
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  const { isLogin, isAccessToken, isRefreshToken } = useRecoilValue(userInfo);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate('/home');
      return;
    } else if (!isAccessToken && isRefreshToken) {
      setTimeout(() => navigate('/pinnumber'), 3000);
      return;
    } else if (!isAccessToken && !isRefreshToken) {
      setTimeout(() => navigate('/login'), 3000);
      return;
    }
  }, [isLogin, isAccessToken, isRefreshToken]);

  return (
    <Wrapper>
      {!isRefreshToken ? (
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
