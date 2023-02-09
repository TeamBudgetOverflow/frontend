import React, { useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import CloseIconBtn from '../../common/elem/btn/CloseIconBtn';
import TextButton from '../../common/elem/TextButton';
import StatusFilter from './StatusFilter';
import SortFilters from './SortFilters';

import { StatusType, StatusStringtoType, SortType, SortStringtoType } from '../../../interfaces/interfaces';

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

  const [scrollTop, setScrollTop] = useState(0);
  const handleFilterSelect = (type: SearchFilterType) => {
    if (!amountRef.current) return;
    setSelectedFilter(type);
    switch (type) {
      case SearchFilterType.status:
        return setScrollTop(0);
      case SearchFilterType.amount:
        return setScrollTop(amountRef.current.offsetTop);
      case SearchFilterType.period:
        return setScrollTop(amountRef.current.offsetTop + 82);
      case SearchFilterType.member:
        return setScrollTop(amountRef.current.offsetTop + 164);
      default:
        setScrollTop(0);
    }
  };
  const amountRef = useRef<HTMLDivElement>(null);

  const bottomContent = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!bottomContent.current) return;
    bottomContent.current.scrollTop = scrollTop;
  }, [bottomContent.current, scrollTop]);

  const { status, sort, min, max, handleStatusChange, handleSortChange, handleMinChange, handleMaxChange } =
    useSearchFilterInput({
      initStatus: StatusStringtoType(savedSearchFilters.status),
      initSort: SortStringtoType(savedSearchFilters.sorted),
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

  const topContent = useRef<HTMLDivElement>(null);
  const [topContentHeight, setTopContentHeight] = useState(0);
  useEffect(() => {
    if (!topContent.current) return;
    setTopContentHeight(topContent.current.clientHeight);
  }, [topContent.current]);
  return (
    <Wrapper>
      <div ref={topContent}>
        <BtnWrapper>
          <CloseIconBtn color='black' closeHandler={closeHandler} />
        </BtnWrapper>
        <FiltersBox>
          {filters.map((filter) => (
            <FilterButton key={filter} selected={selectedFilter === filter} onClick={() => handleFilterSelect(filter)}>
              {searchFilterKR(filter)}
            </FilterButton>
          ))}
        </FiltersBox>
      </div>
      <BottomContent topContentHeight={topContentHeight} ref={bottomContent}>
        <Content>
          <ContentWrapper>
            <SubTitle>진행여부</SubTitle>
            <StatusFilter selected={status} changeHandler={handleStatusChange} />
          </ContentWrapper>
        </Content>
        <SortFilters
          initType={SortStringtoType(savedSearchFilters.sorted)}
          initMin={savedSearchFilters.min}
          initMax={savedSearchFilters.max}
          changeHandler={handleSortSelected}
          ref={amountRef}
        />
      </BottomContent>
      <TextButton text='확인' onClickHandler={handleFilterChangeSubmit} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
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
  @media screen and (max-width: 400px) {
    gap: 12px;
  }
`;

const FilterButton = styled.div<{ selected: boolean }>`
  padding: 8px 0;
  font: ${(props) => (props.selected ? props.theme.paragraphsP1M : props.theme.paragraphsP1R)};
  word-break: keep-all;
  @media screen and (max-width: 360px) {
    font: ${(props) => (props.selected ? props.theme.paragraphsP2M : props.theme.paragraphsP2R)};
  }
`;

const BottomContent = styled.div<{ topContentHeight: number }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: ${(props) => `calc(100% - ${props.topContentHeight}px)`};
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    background: transparent;
    -webkit-appearance: none;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
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
