import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Icon from '../../common/elem/Icon';
import AimingAmountFilter from './AmountFilter';
import HeadCountFilter from './MemberFilter';
import PeriodFilter from './PeriodFilter';
import StatusFilter from './StatusFilter';

import { showSearchFilters } from '../../../recoil/goalsAtoms';
import useSearchFilterCoditionState from '../../../hooks/useSearchFilterState';

enum SearchFilterType {
  status,
  amount,
  period,
  member,
  none,
}

const searchFilters = [
  SearchFilterType.status,
  SearchFilterType.amount,
  SearchFilterType.period,
  SearchFilterType.member,
];

const searchFilterKR = (filterType: SearchFilterType) => {
  switch (filterType) {
    case SearchFilterType.status:
      return '진행상태';
    case SearchFilterType.amount:
      return '목표금액';
    case SearchFilterType.period:
      return '진행기간';
    case SearchFilterType.member:
      return '모집인원';
    default:
      return '';
  }
};

const SearchFilterSetter = () => {
  const setShowSearchFiltersModal = useSetRecoilState(showSearchFilters);
  const [searchFilterType, setSearchFilterType] = useState<SearchFilterType>(SearchFilterType.none);

  const {
    handleFilterSortedChange,
    handleFilterOrderedChange,
    handleFilterStatusChange,
    handleRangeMinChange,
    handleRangeMaxChange,
    handlePageNumberChange,
  } = useSearchFilterCoditionState();

  return (
    <Wrapper>
      <TopWrapper>
        <FiltersBox>
          {searchFilters.map((filter) => (
            <FilterButton key={filter} selected={searchFilterType === filter}>
              {searchFilterKR(filter)}
            </FilterButton>
          ))}
        </FiltersBox>
        <Button onClick={() => setShowSearchFiltersModal(false)}>
          <Icon
            width={14}
            height={14}
            color='black'
            path='M13.3002 0.709971C12.9102 0.319971 12.2802 0.319971 11.8902 0.709971L7.00022 5.58997L2.11022 0.699971C1.72022 0.309971 1.09021 0.309971 0.700215 0.699971C0.310215 1.08997 0.310215 1.71997 0.700215 2.10997L5.59022 6.99997L0.700215 11.89C0.310215 12.28 0.310215 12.91 0.700215 13.3C1.09021 13.69 1.72022 13.69 2.11022 13.3L7.00022 8.40997L11.8902 13.3C12.2802 13.69 12.9102 13.69 13.3002 13.3C13.6902 12.91 13.6902 12.28 13.3002 11.89L8.41021 6.99997L13.3002 2.10997C13.6802 1.72997 13.6802 1.08997 13.3002 0.709971Z'
          />
        </Button>
      </TopWrapper>
      <MiddleWrapper>
        <StatusFilter />
        <AimingAmountFilter />
        <PeriodFilter />
        <HeadCountFilter />
      </MiddleWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
`;

const Button = styled.div`
  width: 14px;
  height: 14px;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const FiltersBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;
  padding: 0px 22px;
`;

const FilterButton = styled.div<{ selected: boolean }>`
  font: ${(props) => (props.selected ? props.theme.paragraphsP1R : props.theme.paragraphsP3R)};
  border-radius: 8px;
  background-color: transparent;
`;

const MiddleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

export default SearchFilterSetter;
