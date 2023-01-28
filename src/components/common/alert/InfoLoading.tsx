import React from 'react';
import styled from 'styled-components';

import LoadingIcon from '../elem/LoadingIcon';

function InfoLoading() {
  return (
    <Wrapper>
      <LoadingIcon size={80} color='#2bc470' />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
`;

export default InfoLoading;
