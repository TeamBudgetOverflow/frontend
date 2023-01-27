import React from 'react';
import styled from 'styled-components';

import Info from '../components/common/alert/Info';

const Prepare = () => {
  return (
    <Wrapper>
      <Info>서비스 준비 중입니다.</Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default Prepare;
