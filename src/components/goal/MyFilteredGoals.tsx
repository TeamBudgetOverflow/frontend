import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

import StateGoalCard from './StateGoalCard';
import Icon from '../common/elem/Icon';
import ModalBox from '../common/elem/ModalBox';
import CloseIconBtn from '../common/elem/btn/CloseIconBtn';

import useGoalsFilter, { FilterType } from '../../hooks/useGoalsFilter';

import { IGoal } from '../../interfaces/interfaces';

const filters = [FilterType.success, FilterType.fail, FilterType.waiting, FilterType.working];

const filterKR = (filterType: FilterType) => {
  switch (filterType) {
    case FilterType.success:
      return '달성';
    case FilterType.fail:
      return '미달성';
    case FilterType.waiting:
      return '진행 예정';
    case FilterType.working:
      return '진행 중';
    default:
      return '';
  }
};

interface MyFilteredGoalsProps {
  isLoading: boolean;
  isError: boolean;
  goals: Array<IGoal>;
}

const MyFilteredGoals = ({ isLoading, isError, goals }: MyFilteredGoalsProps) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const handleFilterModal = () => {
    setShowFilters(!showFilters);
  };

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error</>;

  const { filterType, orderType, filtered, handleFilterType, handleOrderType } = useGoalsFilter({ goals });

  return (
    <Wrapper>
      <TopContent>
        <Content>
          <Total>{`전체 ${goals.length}개`}</Total>
          <BtnWrapper>
            <FilterButton onClick={handleFilterModal}>
              <Label>필터</Label>
              <IconWrapper>
                <Icon width={18} height={12} color='black' path='M7 12H11V10H7V12ZM0 0V2H18V0H0ZM3 7H15V5H3V7Z' />
              </IconWrapper>
            </FilterButton>
            <OrderButton onClick={handleOrderType}>
              <Label>{orderType === 'desc' ? '최근순' : '과거순'}</Label>
              <IconWrapper>
                <Icon
                  width={14}
                  height={18}
                  color='black'
                  path='M11 14.01V8.00002C11 7.45002 10.55 7.00002 10 7.00002C9.45003 7.00002 9.00003 7.45002 9.00003 8.00002V14.01H7.21003C6.76003 14.01 6.54003 14.55 6.86003 14.86L9.65003 17.64C9.85003 17.83 10.16 17.83 10.36 17.64L13.15 14.86C13.47 14.55 13.24 14.01 12.8 14.01H11ZM3.65003 0.35002L0.860031 3.14002C0.540031 3.45002 0.76003 3.99002 1.21003 3.99002H3.00003V10C3.00003 10.55 3.45003 11 4.00003 11C4.55003 11 5.00003 10.55 5.00003 10V3.99002H6.79003C7.24003 3.99002 7.46003 3.45002 7.14003 3.14002L4.35003 0.35002C4.16003 0.16002 3.84003 0.16002 3.65003 0.35002Z'
                />
              </IconWrapper>
            </OrderButton>
          </BtnWrapper>
        </Content>
        {filterType !== FilterType.none ? (
          <SelectedFilters>
            <FilterTag>
              <Label>{filterKR(filterType)}</Label>
              <CloseIconBtn color='black' closeHandler={() => handleFilterType(FilterType.none)} />
            </FilterTag>
          </SelectedFilters>
        ) : (
          <></>
        )}
      </TopContent>
      <BottomContent>
        {filtered.length === 0 ? (
          <EmptyInfo>{`아직 ${filterKR(filterType)} 목표가 없습니다`}</EmptyInfo>
        ) : (
          filtered.map((goal, idx) => <StateGoalCard key={idx} goal={goal} />)
        )}
      </BottomContent>
      <ModalBox show={showFilters}>
        <CloseIconBtn closeHandler={() => setShowFilters(false)} />
        <FiltersBox>
          {filters.map((filter) => (
            <Filter key={filter}>
              <CheckBox onClick={() => handleFilterType(filter)}>
                <CheckedBox selected={filterType === filter}>
                  <Icon
                    width={18}
                    height={14}
                    color='white'
                    path='M6 10.6998L2.5 7.19982C2.11 6.80982 1.49 6.80982 1.1 7.19982C0.709995 7.58982 0.709995 8.20982 1.1 8.59982L5.29 12.7898C5.68 13.1798 6.31 13.1798 6.7 12.7898L17.3 2.19982C17.69 1.80982 17.69 1.18982 17.3 0.799824C16.91 0.409824 16.29 0.409824 15.9 0.799824L6 10.6998Z'
                  />
                </CheckedBox>
              </CheckBox>
              <Label>{filterKR(filter)}</Label>
            </Filter>
          ))}
        </FiltersBox>
      </ModalBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 100%;
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Total = styled.div`
  font: ${(props) => props.theme.captionC1};
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const OrderButton = styled.button`
  padding: 4px 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  border: none;
  border-radius: 8px;
  background-color: white;
`;

const FilterButton = styled(OrderButton)``;

const Label = styled.div`
  font: ${(props) => props.theme.captionC1};
  white-space: nowrap;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`;

const SelectedFilters = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const FilterTag = styled.div`
  padding: 4px 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.gray300};
`;

const BottomContent = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: calc(100% - 40px);
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

const FiltersBox = styled.div`
  width: 100%;
`;

const Filter = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
`;

const CheckBox = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.gray200};
`;

const CheckedBox = styled(CheckBox)<{ selected: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  display: ${(props) => (props.selected ? 'flex' : 'none')};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.primary400};
`;

export default MyFilteredGoals;
