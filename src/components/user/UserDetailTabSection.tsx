import React from 'react';
import styled from 'styled-components';

import MyFilteredGoals from '../goal/MyFilteredGoals';
import MyFilteredBadges from '../badge/MyFilteredBadges';
import Alert from '../common/alert/Alert';
import LoadingMsg from '../common/elem/LoadingMsg';

import { IBadge, IGoal } from '../../interfaces/interfaces';

import useTab from '../../hooks/useTab';

interface UserDetailTabProps {
  isLoadingGoals: boolean;
  isLoadingBadges: boolean;
  isErrorGoals: boolean;
  isErrorBadges: boolean;
  goals?: Array<IGoal>;
  badges: Array<IBadge>;
}

const UserDetailTab = ({
  isLoadingGoals,
  isLoadingBadges,
  isErrorGoals,
  isErrorBadges,
  goals,
  badges,
}: UserDetailTabProps) => {
  const { tabs, handleTabClick } = useTab();

  return (
    <Wrapper>
      <TabList>
        {tabs.map((tab) => (
          <Tab key={tab.title} selected={tab.isSelected} onClick={() => handleTabClick(tab.title)}>
            {tab.title}
          </Tab>
        ))}
      </TabList>
      <ContentBox>
        {isLoadingGoals || !goals ? (
          <Alert height={150} showBgColor={true}>
            <LoadingMsg />
          </Alert>
        ) : (
          tabs.map((tab) => {
            if (tab.isSelected) {
              switch (tab.title) {
                case '목표':
                  return (
                    <MyFilteredGoals key={tab.title} isLoading={isLoadingGoals} isError={isErrorGoals} goals={goals} />
                  );
                case '뱃지':
                  return <MyFilteredBadges key={tab.title} />;
              }
            }
          })
        )}
      </ContentBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const TabList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 45px;
`;

const Tab = styled.div<{ selected: boolean }>`
  padding: 8px 0;
  width: 50%;
  font: ${(props) => props.theme.paragraphsP1M};
  text-align: center;
  color: ${(props) => (props.selected ? props.theme.primary400 : '')};
  border-bottom: ${(props) => (props.selected ? `2px solid ${props.theme.primary400}` : '')};
`;

const ContentBox = styled.div`
  padding: 20px 22px 0;
  height: calc(100% - 65px);
  background-color: ${(props) => props.theme.gray100};
`;

export default UserDetailTab;
