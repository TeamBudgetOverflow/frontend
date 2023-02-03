import React from 'react';
import styled from 'styled-components';

import Info from '../components/common/alert/Info';
import RouteChangeTracker from '../shared/RouteChangeTracker';

const Prepare = () => {
  RouteChangeTracker();
  return (
    <Wrapper>
      <Info type='prepare'>서비스 준비 중입니다.</Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default Prepare;
