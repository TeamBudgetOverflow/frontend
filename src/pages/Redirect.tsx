import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Info from '../components/common/alert/Info';

import { userInfo } from '../recoil/userAtoms';

const Redirect = () => {
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
  }, []);

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;
`;

export default Redirect;
