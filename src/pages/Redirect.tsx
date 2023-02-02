import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import DesktopLayout from '../shared/DesktopLayout';
import Info from '../components/common/alert/Info';
import LogoTitle from '../components/common/elem/LogoTitle';

const Redirect = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const isRefreshExpire = localStorage.getItem('isRefreshExpire');
  const isPincodeRegistered = localStorage.getItem('isPincodeRegistered') === 'true' ? true : false;
  const navigate = useNavigate();
  useEffect(() => {
    if (accessToken && refreshToken) {
      navigate('/home');
      return;
    } else if ((!isPincodeRegistered && accessToken && refreshToken) || (!accessToken && refreshToken)) {
      setTimeout(() => navigate('/pinnumber'), 3000);
      return;
    } else if (!accessToken && !refreshToken) {
      setTimeout(() => navigate('/login'), 3000);
      return;
    }
  }, [accessToken, refreshToken]);

  return (
    <DesktopLayout>
      <Wrapper>
        {isRefreshExpire ? (
          <>
            {!refreshToken ? (
              <Info type=''>
                로그인 정보가 만료되었습니다.
                <br />
                로그인 화면으로 이동합니다.
              </Info>
            ) : (
              <Info type=''>
                로그인이 만료되었습니다.
                <br />
                핀번호를 다시 입력해주세요.
              </Info>
            )}
          </>
        ) : (
          <Info type=''>
            <LogoTitle width={180} height={135} />
          </Info>
        )}
      </Wrapper>
    </DesktopLayout>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: hidden;
`;

export default Redirect;
