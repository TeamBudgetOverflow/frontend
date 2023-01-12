import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import DateSelectBox from '../../common/elem/DateSelectBox';

import useDateInput from '../../../hooks/useDateInput';
import { IGoalDateInfo } from '../../../pages/PostGoal';

interface DateSelectSectionProps {
  isGroup: boolean;
  changeDateSelectHandler: (dateInfo: IGoalDateInfo) => void;
}

const DateSelectSection = ({ isGroup, changeDateSelectHandler }: DateSelectSectionProps) => {
  const {
    minDate: minRecruitEndDate,
    maxDate: maxRecruitEndDate,
    value: recruitEndDate,
    onChange: changeRecruitEndDate,
  } = useDateInput({ startDate: new Date(), minDays: 1, maxDays: 3 });

  const [goalStartDate, setGoalStartDate] = useState<Date>(new Date());
  useEffect(() => {
    if (isGroup) {
      return setGoalStartDate(new Date(new Date().setDate(new Date(recruitEndDate).getDate() + 1)));
    }
    setGoalStartDate(new Date());
  }, [isGroup, recruitEndDate]);

  const {
    minDate: minGoalEndDate,
    maxDate: maxGoalEndDate,
    value: goalEndDate,
    onChange: changeGoalEndDate,
  } = useDateInput({ startDate: goalStartDate, minDays: 3, maxDays: 7 });

  useEffect(() => {
    changeDateSelectHandler({
      startDate: new Date(recruitEndDate),
      endDate: new Date(goalEndDate),
    });
  }, [recruitEndDate, goalEndDate]);

  return (
    <>
      {isGroup ? (
        <ContentBox>
          <SubTitle>모집 마감 날짜</SubTitle>
          <InputWrapper>
            <DateSelectBox
              value={recruitEndDate}
              min={minRecruitEndDate}
              max={maxRecruitEndDate}
              onChange={changeRecruitEndDate}
            />
          </InputWrapper>
        </ContentBox>
      ) : (
        <></>
      )}
      <ContentBox>
        <SubTitle>목표 마감 날짜</SubTitle>
        <InputWrapper>
          <DateSelectBox value={goalEndDate} min={minGoalEndDate} max={maxGoalEndDate} onChange={changeGoalEndDate} />
        </InputWrapper>
      </ContentBox>
    </>
  );
};

const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const SubTitle = styled.div`
  font: ${(props) => props.theme.captionC1};
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 30px;
`;

export default DateSelectSection;
