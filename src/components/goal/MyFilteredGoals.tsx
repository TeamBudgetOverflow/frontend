import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import StateGoalCard from './StateGoalCard';

import { IGoal } from '../../interfaces/interfaces';

interface MyFilteredGoalsProps {
  isOwner: boolean;
  goals: Array<IGoal>;
}

enum FilterType {
  success,
  fail,
  recruiting,
  none,
}

const filters = [FilterType.success, FilterType.fail, FilterType.recruiting];

const filterKR = (filterType: FilterType) => {
  switch (filterType) {
    case FilterType.success:
      return '달성';
    case FilterType.fail:
      return '미달성';
    case FilterType.recruiting:
      return '모집중';
    default:
      return '';
  }
};

const MyFilteredGoals = ({ isOwner, goals }: MyFilteredGoalsProps) => {
  const [initialGoals, setInitialGoals] = useState<Array<IGoal>>([...goals]);
  const [filteredGoals, setFilteredGoals] = useState<Array<IGoal>>([...goals]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.none);
  const handleFilterType = (type: FilterType) => {
    setFilterType((prev) => {
      if (prev === type) return FilterType.none;
      return type;
    });
  };

  useEffect(() => {
    setInitialGoals([...goals]);
  }, []);

  useEffect(() => {
    setFilteredGoals(() => {
      const goals = [...initialGoals];

      const filtered = goals.filter((goal) => {
        switch (filterType) {
          case FilterType.success:
            return (
              new Date(goal.startDate).getTime() < new Date().getTime() &&
              goal.attainment === 100
            );
          case FilterType.fail:
            return (
              new Date(goal.startDate).getTime() < new Date().getTime() &&
              goal.attainment < 100
            );
          case FilterType.recruiting:
            return new Date(goal.startDate).getTime() > new Date().getTime();
          case FilterType.none:
            return goal;
        }
      });

      return filtered;
    });
  }, [filterType]);

  const [orderType, setOrderType] = useState<'asc' | 'desc'>('desc');
  const handleOrderType = () => {
    setOrderType((prev) => {
      if (prev === 'asc') return 'desc';
      return 'asc';
    });
  };

  useEffect(() => {
    setFilteredGoals((prev) => {
      const prevGoals = [...prev];
      prevGoals.sort((a, b) => {
        if (orderType === 'asc') {
          return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        }

        return (
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
      });
      return prevGoals;
    });
  }, [orderType]);
  return (
    <Wrapper>
      <TopContent>
        <Content>
          <Total>{`전체 ${goals.length}개`}</Total>
          <OrderButton onClick={handleOrderType}>
            {orderType === 'desc' ? '최신순' : '과거순'}
          </OrderButton>
        </Content>
        {isOwner ? (
          <FiltersBox>
            {filters.map((filter) => (
              <FilterButton
                key={filter}
                selected={filterType === filter}
                onClick={() => handleFilterType(filter)}>
                {filterKR(filter)}
              </FilterButton>
            ))}
          </FiltersBox>
        ) : (
          <></>
        )}
      </TopContent>
      <BottomContent>
        {filteredGoals.length === 0 ? (
          <EmptyInfo>{`아직 ${filterKR(
            filterType
          )} 목표가 없습니다`}</EmptyInfo>
        ) : (
          filteredGoals.map((goal, idx) => (
            <StateGoalCard key={idx} goal={goal} />
          ))
        )}
      </BottomContent>
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
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-bottom: 4px solid ${(props) => props.theme.primaryMain};
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Total = styled.div`
  font: ${(props) => props.theme.captionC1};
`;

const OrderButton = styled.button`
  font: ${(props) => props.theme.captionC1};
  border: none;
  background-color: transparent;
`;

const FiltersBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;
`;

const FilterButton = styled.div<{ selected: boolean }>`
  padding: 4px 10px;
  font: ${(props) => props.theme.captionC1};
  border: ${(props) =>
    props.selected ? `2px solid ${props.theme.primary900}` : ''};
  border-radius: 8px;
  background-color: ${(props) => props.theme.primaryMain};
`;

const BottomContent = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  overflow-y: auto;
`;

const EmptyInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  line-height: 100%;
  font: ${(props) => props.theme.captionC1};
  color: ${(props) => props.theme.primaryMain};
`;

export default MyFilteredGoals;
