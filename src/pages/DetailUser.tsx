import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import UserDetailProfile from '../components/user/UserDetailProfile';
import TextButton from '../components/common/elem/TextButton';
import MyFilteredGoals from '../components/goal/MyFilteredGoals';
import MyFilteredBadges from '../components/badge/MyFilteredBadges';
import Alert from '../components/common/alert/Alert';
import LoadingMsg from '../components/common/elem/LoadingMsg';

import { userGoals, userId } from '../recoil/userAtoms';

import { IGoals } from '../interfaces/interfaces';

import { userAPI } from '../apis/client';

interface ITab {
  title: string;
  isSelected: boolean;
}

const DetailUser = () => {
  const { id } = useParams();
  const { id: loginUserId } = useRecoilValue(userId);
  if (!id) return <>잘못된 아이디 값입니다</>;
  const { isLoading: isLoadingGoals, data: userGoalsData } = useQuery<IGoals>('memberGoals', () =>
    userAPI.getUserGoals(Number(id))
  );
  const setUserGoals = useSetRecoilState(userGoals);
  const filterPrivateUserGoals = (userGoalsData: IGoals) => {
    const filtered = userGoalsData.result.filter((goal) => !goal.isPrivate);
    return filtered;
  };
  useEffect(() => {
    if (!userGoalsData) return;
    if (Number(id) !== loginUserId) {
      const filteredGoals = filterPrivateUserGoals(userGoalsData);
      setUserGoals(filteredGoals);
    }
    setUserGoals(userGoalsData.result);
  }, [userGoalsData]);

  const goals = useRecoilValue(userGoals);

  const handleUserEdit = () => {
    console.log('edit user');
  };

  const [tabs, setTabs] = useState<Array<ITab>>([
    { title: '목표', isSelected: true },
    { title: '뱃지', isSelected: false },
  ]);
  const handleTabClick = (selectedTab: string) => {
    setTabs((prev) => {
      const tabList = [...prev];
      tabList.map((v) => {
        if (v.title === selectedTab) {
          v.isSelected = true;
          return;
        }
        v.isSelected = false;
      });

      return tabList;
    });
  };

  const [successGoalsCnt, setSuccessGoalsCnt] = useState<number>(0);
  const [workingGoalsCnt, setWorkingGoalsCnt] = useState<number>(0);
  useEffect(() => {
    const successGoals = goals.filter(
      (goal) => new Date(goal.endDate).getTime() < new Date().getTime() && goal.attainment === 100
    );
    setSuccessGoalsCnt(successGoals.length);

    const workingGoals = goals.filter((goal) => new Date(goal.startDate).getTime() < new Date().getTime());
    setWorkingGoalsCnt(workingGoals.length);
  }, [goals]);

  const topContentRef = useRef<HTMLDivElement>(null);
  const [topContentHeight, setTopContentHeight] = useState<number>(0);
  useEffect(() => {
    if (!topContentRef.current) return;
    setTopContentHeight(topContentRef.current.clientHeight);
  }, [topContentRef]);

  const tabRef = useRef<HTMLDivElement>(null);
  const [tabHeight, setTabHeight] = useState<number>(0);
  useEffect(() => {
    if (!tabRef.current) return;
    setTabHeight(tabRef.current.clientHeight);
  }, [tabRef]);
  return (
    <Wrapper>
      <TopContent ref={topContentRef}>
        <UserDetailProfile id={Number(id)} successGoalsCnt={successGoalsCnt} workingGoalsCnt={workingGoalsCnt} />
        <BtnWrapper>
          <TextButton text='프로필 수정' onClickHandler={handleUserEdit} />
        </BtnWrapper>
      </TopContent>
      <UserContentBox topContentHeight={topContentHeight}>
        <TabList ref={tabRef}>
          {tabs.map((tab) => (
            <Tab key={tab.title} selected={tab.isSelected} onClick={() => handleTabClick(tab.title)}>
              {tab.title}
            </Tab>
          ))}
        </TabList>
        <ContentBox tabHeight={tabHeight}>
          {isLoadingGoals ? (
            <Alert height={150} showBgColor={true}>
              <LoadingMsg />
            </Alert>
          ) : (
            tabs.map((tab) => {
              if (tab.isSelected) {
                switch (tab.title) {
                  case '목표':
                    return <MyFilteredGoals key={tab.title} isOwner={Number(id) === loginUserId} goals={goals} />;
                  case '뱃지':
                    return <MyFilteredBadges key={tab.title} />;
                }
              }
            })
          )}
        </ContentBox>
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
  background-color: ${(props) => props.theme.primary50};
`;

const TabList = styled.div`
  display: flex;
  flex-direction: row;
`;

const Tab = styled.div<{ selected: boolean }>`
  padding: 8px 0;
  width: 50%;
  font: ${(props) => props.theme.paragraphsP1M};
  text-align: center;
  border-bottom: ${(props) => (props.selected ? `1px solid ${props.theme.primaryMain}` : '')};
`;

const ContentBox = styled.div<{ tabHeight: number }>`
  padding: 25px 22px 0;
  height: ${(props) => `calc(100% - ${props.tabHeight + 25}px)`};
`;

export default DetailUser;
