import React, { useState } from 'react';
import styled from 'styled-components';

import EmojiInput from '../input/EmojiInput';
import TextInput from '../input/TextInput';
import NumInput from '../input/NumInput';
import TagInputSection from '../post/TagInputSection';
import DateInput from '../input/DateInput';
import ToggleSelectBox from '../../common/elem/ToggleSelectBox';
import TextButton from '../../common/elem/TextButton';

import { IPostGoal } from '../../../interfaces/interfaces';

import useTagInput from '../../../hooks/useTagInput';
import useGoalModifyInput from '../../../hooks/useGoalModifyInput';

import { dateISOStringDateTranslator } from '../../../utils/dateTranslator';

interface GoalDataInputProps {
  goalId: number;
  isEditable: boolean;
  isGroup: boolean;
  initVal: IPostGoal;
  createdAt: Date;
}

const GoalDataInput = ({ goalId, isEditable, isGroup, initVal, createdAt }: GoalDataInputProps) => {
  const [emoji, setEmoji] = useState<string>(initVal.emoji);
  const [title, setTitle] = useState<string>(initVal.title);
  const [description, setDescription] = useState<string>(initVal.description);
  const [amount, setAmount] = useState<number>(initVal.amount);
  const [headCount, setHeadCount] = useState<number>(initVal.headCount);
  const { tagList, handleTagListChange } = useTagInput({ initVal: initVal.hashTag });
  const [startDate, setStartDate] = useState<Date>(initVal.startDate);
  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
  };
  const [endDate, setEndDate] = useState<Date>(initVal.endDate);
  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
  };

  const [isManual, setIsManual] = useState<boolean>(initVal.isManual);

  const [isPrivate, setIsPrivate] = useState<boolean>(initVal.isPrivate);
  const handleSelectIsPrivate = (isTrue: boolean) => {
    setIsPrivate(isTrue);
  };

  const [isValid, setIsValid] = useState<boolean>(false);
  const handleInputErr = (isErr: boolean) => {
    setIsValid(!isErr);
  };

  const { handleSaveGoalInput } = useGoalModifyInput({ goalId });
  const handleReqModifyGoal = () => {
    handleSaveGoalInput({
      emoji,
      title,
      description,
      amount,
      hashTag: tagList.map((tag) => tag.content),
      startDate,
      endDate,
      headCount,
      isPrivate: isPrivate,
      isManual: isManual,
      accountId: 0,
    });
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <ContentBox>
          <EmojiInput initVal={initVal.emoji} changeHandler={(emoji: string) => setEmoji(emoji)} />
        </ContentBox>
        <TextInput
          type='제목'
          placeholder='목표 이름을 입력해주세요'
          initVal={title}
          min={4}
          max={25}
          isDisabled={false}
          changeHandler={(title: string) => setTitle(title)}
          errHandler={handleInputErr}
        />
        <TagInputSection changeTagListHandler={handleTagListChange} />
        <TextInput
          title='내용'
          type='설명'
          placeholder='목표내용을 입력해주세요'
          initVal={description}
          min={0}
          max={255}
          isDisabled={false}
          changeHandler={(description: string) => setDescription(description)}
          errHandler={handleInputErr}
        />
        {isGroup ? (
          <DateInput
            title='모집 기간'
            startDate={createdAt}
            initVal={dateISOStringDateTranslator(startDate)}
            min={1}
            max={3}
            isDisabled={!isEditable}
            changeHandler={handleStartDateChange}
          />
        ) : (
          <></>
        )}
        <DateInput
          title='목표 기간'
          startDate={startDate}
          initVal={dateISOStringDateTranslator(endDate)}
          min={3}
          max={7}
          isDisabled={!isEditable}
          changeHandler={handleEndDateChange}
        />
        <NumInput
          title='목표 금액'
          type='목표 금액'
          placeholder=''
          initVal={amount}
          min={1000}
          max={70000}
          isDisabled={!isEditable}
          inputWidth={20}
          changeHandler={(amount: number) => setAmount(amount)}
          errHandler={handleInputErr}
        />
        {isGroup ? (
          <NumInput
            title='모집 인원'
            type='인원'
            placeholder=''
            initVal={headCount}
            min={isGroup ? 2 : 1}
            max={100}
            isDisabled={!isEditable}
            inputWidth={10}
            changeHandler={(headCount: number) => setHeadCount(headCount)}
            errHandler={handleInputErr}
          />
        ) : (
          <></>
        )}

        {isGroup ? (
          <></>
        ) : (
          <ToggleSelectBox
            title='비공개 목표'
            description='목표를 다른이들에게 공유하지 않고 나만 봅니다.'
            initVal={isPrivate}
            selectHandler={handleSelectIsPrivate}
          />
        )}
      </ContentWrapper>
      <TextButton text={'목표 수정'} onClickHandler={handleReqModifyGoal} isDisabled={!isValid} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContentBox = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export default GoalDataInput;
