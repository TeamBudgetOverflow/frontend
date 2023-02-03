import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import UserDetailProfile from '../components/user/UserDetailProfile';
import TextButton from '../components/common/elem/TextButton';
import UserDetailTab from '../components/user/UserDetailTabSection';

import useUserGoalsData from '../hooks/useUserGoalsData';

import { userId } from '../recoil/userAtoms';

import RouteChangeTracker from '../shared/RouteChangeTracker';

const DetailUser = () => {
  RouteChangeTracker();
  const { id } = useParams();
  if (!id) return <>잘못된 아이디 값입니다</>;

  const { id: loginUserId } = useRecoilValue(userId);
  const { totalCnt, successCnt, workingCnt } = useUserGoalsData({ getUserId: Number(id) });

  const navigate = useNavigate();
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
          {loginUserId === Number(id) ? (
            <TextButton text='프로필 수정' bgColor='#e4e4e4' color='black' onClickHandler={handleUserEdit} />
          ) : (
            <></>
          )}
        </BtnWrapper>
      </TopContent>
      <UserContentBox topContentHeight={topContentHeight}>
        <UserDetailTab userId={Number(id)} />
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
