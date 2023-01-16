import React from 'react';
import styled from 'styled-components';

// TODO : 공통 버튼 컴포넌트 리팩터링
// TODO : 수정하기 페이지 이동
const GroupGoalWithDrawButton = () => {
  return <WithdrawButton>그만하기</WithdrawButton>;
};

const WithdrawButton = styled.button`
  max-width: 370px;
  width: 100%;
  height: 51px;
  border-radius: 8px;
  padding: 12px 16.5px;
`;

export default GroupGoalWithDrawButton;
