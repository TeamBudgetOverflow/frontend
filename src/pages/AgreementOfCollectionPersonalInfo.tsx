import React from 'react';
import styled from 'styled-components';

// TODO: media query 설정
// TODO: redirect uri, client id env 파일 설정
const AgreementOfCollectionPersonalInfo = () => {
  return <Wrapper>개인정보 수집활용 동의서</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default AgreementOfCollectionPersonalInfo;
