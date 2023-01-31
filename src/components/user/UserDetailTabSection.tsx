import React from 'react';
import styled from 'styled-components';

import MyFilteredGoals from '../goal/MyFilteredGoals';
import MyFilteredBadges from '../badge/MyFilteredBadges';

import useTab from '../../hooks/useTab';

const UserDetailTab = ({ userId }: { userId: number }) => {
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
        {tabs.map((tab) => {
          if (tab.isSelected) {
            switch (tab.title) {
              case '목표':
                return <MyFilteredGoals key={tab.title} userId={userId} />;
              case '뱃지':
                return <MyFilteredBadges key={tab.title} userId={userId} />;
            }
          }
        })}
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
