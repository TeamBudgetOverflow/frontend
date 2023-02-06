import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Info from '../components/common/alert/Info';

const NotFoundError = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate('/'), 3000);
  }, []);

  return (
    <Wrapper>
      <Info type='error'>
        존재하지 않는 페이지입니다. <br /> 허용된 경로로 접근해 주세요.
      </Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
export default NotFoundError;
