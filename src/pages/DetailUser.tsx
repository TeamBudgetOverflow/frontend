import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import UserDetailProfile from '../components/user/UserDetailProfile';
import TextButton from '../components/common/elem/TextButton';

import useUserGoalsData from '../hooks/useUserGoalsData';
import UserDetailTab from '../components/user/UserDetailTabSection';

const DetailUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) return <>잘못된 아이디 값입니다</>;

  // TODO: get user badges data
  const {
    isLoading: isLoadingGoals,
    isError: isErrorGoals,
    totalCnt,
    successCnt,
    workingCnt,
    data: goals,
  } = useUserGoalsData({ getUserId: Number(id) });

  const handleUserEdit = () => {
    navigate(`/users/edit/${id}`);
  };

  const [topContentHeight, setTopContentHeight] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    setTopContentHeight(ref.current.clientHeight);
  }, [ref.current]);
  return (
    <Wrapper>
      <TopContent ref={ref}>
        <UserDetailProfile id={Number(id)} totalCnt={totalCnt} successCnt={successCnt} workingCnt={workingCnt} />
        <BtnWrapper>
          <TextButton text='프로필 수정' bgColor='gray' onClickHandler={handleUserEdit} />
        </BtnWrapper>
      </TopContent>
      <UserContentBox topContentHeight={topContentHeight}>
        <UserDetailTab
          isLoadingGoals={isLoadingGoals}
          isLoadingBadges={false}
          isErrorGoals={isErrorGoals}
          isErrorBadges={false}
          goals={goals}
          badges={[]}
        />
      </UserContentBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const BtnWrapper = styled.div`
  padding: 20px 22px;
`;

const UserContentBox = styled.div<{ topContentHeight: number }>`
  height: ${(props) => `calc(100% - ${props.topContentHeight}px)`};
`;

export default DetailUser;
