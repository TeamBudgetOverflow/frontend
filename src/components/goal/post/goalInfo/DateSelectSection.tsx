import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import DateSelectBox from '../../../common/elem/DateSelectBox';

import useDateInput from '../../../../hooks/useDateInput';
import { dateStringTranslatorWithPoint } from '../../../../utils/dateTranslator';

interface DateSelectSectionProps {
  isGroup: boolean;
  dateSelectHandler: (dateInfo: GoalDate) => void;
}

export interface GoalDate {
  startDate: Date;
  endDate: Date;
}

const DateSelectSection = ({ isGroup, dateSelectHandler }: DateSelectSectionProps) => {
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
    dateSelectHandler({
      startDate: new Date(recruitEndDate),
      endDate: new Date(goalEndDate),
    });
  }, [recruitEndDate, goalEndDate]);

  return (
    <>
      {isGroup ? (
        <ContentBox>
          <SubTitle>모집 기간</SubTitle>
          <RowContent>
            <DateText>{dateStringTranslatorWithPoint(new Date())}</DateText>
            <span>-</span>
            <InputWrapper>
              <DateSelectBox
                value={recruitEndDate}
                min={minRecruitEndDate}
                max={maxRecruitEndDate}
                onChange={changeRecruitEndDate}
              />
            </InputWrapper>
          </RowContent>
        </ContentBox>
      ) : (
        <></>
      )}
      <ContentBox>
        <SubTitle>목표 기간</SubTitle>
        <RowContent>
          <DateText>{dateStringTranslatorWithPoint(goalStartDate)}</DateText>
          <span>-</span>
          <InputWrapper>
            <DateSelectBox value={goalEndDate} min={minGoalEndDate} max={maxGoalEndDate} onChange={changeGoalEndDate} />
          </InputWrapper>
        </RowContent>
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
  color: ${(props) => props.theme.gray600};
`;

const RowContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const DateText = styled.div`
  font: ${(props) => props.theme.paragraphP2};
`;

const InputWrapper = styled.div`
  height: 30px;
`;

export default DateSelectSection;
