import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import EmojiInput from '../input/EmojiInput';
import InputBox from '../../common/elem/InputBox';
import ValidateMsg from '../../common/elem/ValidateMsg';
import TagInputSection from './TagInputSection';
import DateSelectSection, { GoalDate } from './goalInfo/DateSelectSection';
import ToggleSelectBox from '../../common/elem/ToggleSelectBox';
import AccntToggle from '../modify/AccntToggle';
import TextButton from '../../common/elem/TextButton';

import useTxtInput from '../../../hooks/useTxtInput';
import useNumInput from '../../../hooks/useNumInput';
import useTagInput from '../../../hooks/useTagInput';
import useGoalInput from '../../../hooks/useGoalPostInput';

import { IPostGoal } from '../../../interfaces/interfaces';

interface GoalInfoInputProps {
  isGroup: boolean;
  initVal: IPostGoal;
}

function GoalInfoInput({ isGroup, initVal }: GoalInfoInputProps) {
  const [emoji, setEmoji] = useState<string>(initVal.emoji);

  const {
    value: title,
    errMsg: titleErr,
    onChange: changeTitle,
  } = useTxtInput({
    initValue: initVal.title,
    minLength: 4,
    maxLength: 25,
    type: '제목',
  });

  const {
    value: description,
    errMsg: descriptionErr,
    onChange: changeDescription,
  } = useTxtInput({
    initValue: initVal.description,
    minLength: 0,
    maxLength: 255,
    type: '설명',
  });

  const {
    value: amount,
    errMsg: amountErr,
    onChange: changeAmount,
  } = useNumInput({ initValue: initVal.amount, min: 1000, max: 70000, type: '목표 금액' });

  const { tagList, handleTagListChange } = useTagInput({ initVal: initVal.hashTag });

  const [goalDate, setGoalDate] = useState<GoalDate>({
    startDate: initVal.startDate,
    endDate: initVal.endDate,
  });
  const handleGoalDateChange = (dateInfo: GoalDate) => {
    setGoalDate(dateInfo);
  };

  const {
    value: headCount,
    errMsg: headCountErr,
    onChange: changeHeadCount,
  } = useNumInput({
    initValue: isGroup && initVal.headCount < 2 ? 2 : initVal.headCount,
    min: isGroup ? 2 : 1,
    max: 100,
    type: '인원',
  });

  // TODO: 실계좌 기능 오픈
  const [isManual, setisManual] = useState<boolean>(true);
  // const handleSelectisAuto = (isTrue: boolean) => {
  //   setisManual(isTrue);
  // };

  const [isPrivate, setIsPrivate] = useState<boolean>(initVal.isPrivate);
  const handleSelectIsPrivate = (isTrue: boolean) => {
    setIsPrivate(isTrue);
  };

  const [isValid, setIsValid] = useState<boolean>(false);
  const validate = () => {
    if (emoji.length === 0) {
      setIsValid(false);
      return;
    }
    if (title.length === 0 || titleErr.length !== 0) {
      setIsValid(false);
      return;
    }
    if (description.length === 0 || descriptionErr.length !== 0) {
      setIsValid(false);
      return;
    }
    if (amountErr.length !== 0) {
      setIsValid(false);
      return;
    }
    if (headCountErr.length !== 0) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
  };

  useEffect(() => {
    validate();
  }, [emoji, title, description, amount, headCount, titleErr, descriptionErr, amountErr, headCountErr]);

  const { handleSaveGoalInput } = useGoalInput({
    type: 'post',
    inputVal: {
      emoji,
      title,
      description,
      amount,
      hashTag: tagList,
      startDate: goalDate.startDate,
      endDate: goalDate.endDate,
      headCount,
      isPrivate: isPrivate,
      isManual: isManual,
      accountId: 0,
    },
  });

  const btnRef = useRef<HTMLDivElement>(null);
  const [btnHeight, setBtnHeight] = useState(0);
  useEffect(() => {
    if (!btnRef.current) return;
    setBtnHeight(btnRef.current.clientHeight);
  }, [btnRef.current]);

  return (
    <>
      <Wrapper btnHeight={btnHeight}>
        <ContentWrapper>
          <EmojiInput initVal={emoji} changeHandler={(emoji: string) => setEmoji(emoji)} />
          <ContentBox>
            <InputWrapper>
              <InputBox
                placeholder='목표 이름을 입력해주세요'
                type='text'
                value={title}
                onChangeHandler={changeTitle}
                showTextCounter={true}
                maxLen={25}
                textLen={title.length}
              />
            </InputWrapper>
            <ValidateMsg msg={titleErr} type='error' />
          </ContentBox>
          <TagInputSection initVal={[]} changeTagListHandler={handleTagListChange} />
          <ContentBox>
            <SubTitle>내용</SubTitle>
            <InputWrapper>
              <InputBox
                placeholder='목표내용을 입력해주세요'
                type='text'
                value={description}
                onChangeHandler={changeDescription}
              />
            </InputWrapper>
            <ValidateMsg msg={descriptionErr} type='error' />
          </ContentBox>
          <DateSelectSection isGroup={isGroup} dateSelectHandler={handleGoalDateChange} />
          <ContentBox>
            <SubTitle>목표 금액</SubTitle>
            <RowContent>
              <AmountInputWrapper>
                <InputBox placeholder='' type='text' value={amount.toLocaleString()} onChangeHandler={changeAmount} />
              </AmountInputWrapper>
              <span>원</span>
            </RowContent>
            <ValidateMsg msg={amountErr} type='error' />
          </ContentBox>
          {isGroup ? (
            <>
              <SubTitle>모집 인원</SubTitle>
              <ContentBox>
                <RowContent>
                  <HeadCountInputWrapper>
                    <InputBox placeholder='' type='text' value={headCount} onChangeHandler={changeHeadCount} />
                  </HeadCountInputWrapper>
                  <span>명</span>
                </RowContent>
                <ValidateMsg msg={headCountErr} type='error' />
              </ContentBox>
            </>
          ) : (
            <></>
          )}
          {/* TODO: 실계좌 기능 오픈 */}
          {/* <AccntToggle initVal={isManual} changeHandler={handleSelectisAuto} /> */}
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
      </Wrapper>
      <BtnWrapper ref={btnRef}>
        <TextButton text={'목표 생성'} onClickHandler={handleSaveGoalInput} isDisabled={!isValid} />
      </BtnWrapper>
    </>
  );
}

const Wrapper = styled.div<{ btnHeight: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  height: ${(props) => `calc(100% - ${props.btnHeight}px)`};
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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BtnWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 20px 22px;
  width: calc(100% - 44px);
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
`;

const SubTitle = styled.div`
  font: ${(props) => props.theme.captionC1};
  color: ${(props) => props.theme.gray600};
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 30px;
`;

const AmountInputWrapper = styled(InputWrapper)`
  width: 20%;
`;

const HeadCountInputWrapper = styled(InputWrapper)`
  width: 10%;
`;

const RowContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export default GoalInfoInput;
