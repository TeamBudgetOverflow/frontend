import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EmojiPicker from 'emoji-picker-react';

import EmojiBox from '../../common/elem/EmojiBox';
import Icon from '../../common/elem/Icon';
import InputBox from '../../common/elem/InputBox';
import ValidateMsg from '../../common/elem/ValidateMsg';
import TagInputSection from './TagInputSection';
import DateSelectSection, { GoalDate } from './goalInfo/DateSelectSection';
import ToggleSelectBox from '../../common/elem/ToggleSelectBox';
import TextButton from '../../common/elem/TextButton';

import useTxtInput from '../../../hooks/useTxtInput';
import useNumInput from '../../../hooks/useNumInput';

import useEmojiSelect from '../../../hooks/useEmojiSelect';

import { IPostGoal } from '../../../interfaces/interfaces';

import useTagInput from '../../../hooks/useTagInput';
import useGoalInput from '../../../hooks/useGoalPostInput';
import AccntToggle from '../modify/AccntToggle';

interface GoalInfoInputProps {
  isGroup: boolean;
  initVal: IPostGoal;
}

function GoalInfoInput({ isGroup, initVal }: GoalInfoInputProps) {
  const { showEmojis, emoji, handleShowEmojis, handleEmojiSelect } = useEmojiSelect({ initVal: initVal.emoji });

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
      hashTag: tagList.map((tag) => tag.content),
      startDate: goalDate.startDate,
      endDate: goalDate.endDate,
      headCount,
      isPrivate: isPrivate,
      isManual: isManual,
      accountId: 0,
    },
  });

  return (
    <Wrapper>
      <ContentWrapper>
        <EmojiContentBox>
          <EmojiBox unicode={emoji} boxSize={80} emojiSize={40} />
          <Button onClick={handleShowEmojis}>
            <Icon width={24} height={24} color={'primary400'} path='' />
          </Button>
          <EmojiPickerWrapper show={showEmojis}>
            <EmojiPicker onEmojiClick={(emoji) => handleEmojiSelect(emoji)} />
          </EmojiPickerWrapper>
        </EmojiContentBox>
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
        <TagInputSection changeTagListHandler={handleTagListChange} />
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
        <DateSelectSection isGroup={isGroup} dateSelectHandler={handleGoalDateChange} isDisabled={false} />
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
      <TextButton text={'목표 생성'} onClickHandler={handleSaveGoalInput} isDisabled={!isValid} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const EmojiContentBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
`;

const Button = styled.div`
  width: 24px;
  height: 24px;
  border: 1px solid black;
`;

const EmojiPickerWrapper = styled.div<{ show: boolean }>`
  position: absolute;
  top: 110%;
  z-index: 5;
  display: ${(props) => (props.show ? '' : 'none')};
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
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
