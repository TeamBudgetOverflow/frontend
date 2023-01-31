import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import CloseIconBtn from '../../common/elem/btn/CloseIconBtn';
import StatusFilter from './StatusFilter';
import SortFilters from './SortFilters';
import TextButton from '../../common/elem/TextButton';

import { StatusType, SortType } from '../../../interfaces/interfaces';

import { searchFilters } from '../../../recoil/goalsAtoms';
import useSearchFilterInput from '../../../hooks/useSearchFilterInput';

export enum SearchFilterType {
  status,
  amount,
  period,
  member,
}

export const filters = [
  SearchFilterType.status,
  SearchFilterType.amount,
  SearchFilterType.period,
  SearchFilterType.member,
];

export const searchFilterKR = (filterType: SearchFilterType) => {
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

interface FiltersModalProps {
  changeHandler: (status: StatusType, sortType: SortType, min: number, max: number) => void;
  closeHandler: () => void;
}

const FiltersModal = ({ changeHandler, closeHandler }: FiltersModalProps) => {
  const savedSearchFilters = useRecoilValue(searchFilters);
  const [selectedFilter, setSelectedFilter] = useState<SearchFilterType>(SearchFilterType.status);
  const handleSortSelected = (sortType: SortType, min: number, max: number) => {
    handleSortChange(sortType);
    handleMinChange(min);
    handleMaxChange(max);
  };

  const { status, sort, min, max, handleStatusChange, handleSortChange, handleMinChange, handleMaxChange } =
    useSearchFilterInput({
      initStatus: savedSearchFilters.status,
      initSort: savedSearchFilters.sorted,
      initMin: savedSearchFilters.min,
      initMax: savedSearchFilters.max,
    });

  useEffect(() => {
    switch (sort) {
      case SortType.amount:
        setSelectedFilter(SearchFilterType.amount);
        break;
      case SortType.period:
        setSelectedFilter(SearchFilterType.period);
        break;
      case SortType.member:
        setSelectedFilter(SearchFilterType.member);
        break;
      default:
        setSelectedFilter(SearchFilterType.status);
    }
  }, [status, sort]);

  const handleFilterChangeSubmit = () => {
    changeHandler(status, sort, min, max);
    closeHandler();
  };

  return (
    <Wrapper>
      <BtnWrapper>
        <CloseIconBtn color='black' closeHandler={closeHandler} />
      </BtnWrapper>
      <FiltersBox>
        {filters.map((filter) => (
          <FilterButton key={filter} selected={selectedFilter === filter}>
            {searchFilterKR(filter)}
          </FilterButton>
        ))}
      </FiltersBox>
      <Content>
        <ContentWrapper>
          <SubTitle>진행여부</SubTitle>
          <StatusFilter selected={status} changeHandler={handleStatusChange} />
        </ContentWrapper>
      </Content>
      <SortFilters
        initType={savedSearchFilters.sorted}
        initMin={savedSearchFilters.min}
        initMax={savedSearchFilters.max}
        changeHandler={handleSortSelected}
      />
      <TextButton text='확인' onClickHandler={handleFilterChangeSubmit} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  height: 24px;
`;

const FiltersBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: 100%;
`;

const FilterButton = styled.div<{ selected: boolean }>`
  padding: 8px 0;
  font: ${(props) => (props.selected ? props.theme.paragraphsP1M : props.theme.paragraphsP1R)};
  word-break: keep-all;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const SubTitle = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
  text-align: start;
  font: ${(props) => props.theme.captionC1};
  color: ${(props) => props.theme.gray600};
`;

export default FiltersModal;
