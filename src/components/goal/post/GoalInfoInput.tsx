import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

import EmojiBox from '../../common/elem/EmojiBox';
import Icon from '../../common/elem/Icon';
import InputBox from '../../common/elem/InputBox';
import ValidateMsg from '../../common/elem/ValidateMsg';
import TagInputSection from './TagInputSection';
import DateSelectSection, { GoalDate } from './goalInfo/DateSelectSection';
import OptionSelectSection from './goalInfo/OptionSelectSection';
import TextButton from '../../common/elem/TextButton';
import Info from '../../common/alert/Info';

import useTxtInput from '../../../hooks/useTxtInput';
import useNumInput from '../../../hooks/useNumInput';

import { IHashTag } from '../../common/tag/HashTag';

import { postGoal, postGoalType } from '../../../recoil/goalsAtoms';
import { userInfo } from '../../../recoil/userAtoms';

import { accountApi, goalApi } from '../../../apis/client';

interface GoalInfoInputProps {
  isGroup: boolean;
}

function GoalInfoInput({ isGroup }: GoalInfoInputProps) {
  const savedPostGoal = useRecoilValue(postGoal);
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const handleShowEmojis = () => {
    setShowEmojis(!showEmojis);
  };
  const [emoji, setEmoji] = useState<string>(savedPostGoal.emoji);
  const handleEmojiSelect = (emoji: EmojiClickData) => {
    setEmoji(emoji.unified);
  };

  const {
    value: title,
    errMsg: titleErr,
    onChange: changeTitle,
    reset: resetTitle,
  } = useTxtInput({
    initValue: savedPostGoal.title,
    minLength: 4,
    maxLength: 25,
    type: '제목',
  });

  const {
    value: description,
    errMsg: descriptionErr,
    onChange: changeDescription,
    reset: resetDescription,
  } = useTxtInput({
    initValue: savedPostGoal.description,
    minLength: 0,
    maxLength: 255,
    type: '설명',
  });

  const {
    value: amount,
    errMsg: amountErr,
    onChange: changeAmount,
    reset: resetAmount,
  } = useNumInput({ initValue: savedPostGoal.amount, min: 1000, max: 70000, type: '목표 금액' });

  const [tagList, setTagList] = useState<Array<IHashTag>>(
    savedPostGoal.hashTag
      ? [...savedPostGoal.hashTag].map((v) => {
          return { content: v, bgColor: '#ccc' };
        })
      : []
  );
  const handleTagListChange = (tagList: Array<IHashTag>) => {
    setTagList((prev) => [...prev, ...tagList]);
  };

  const [goalDate, setGoalDate] = useState<GoalDate>({
    startDate: savedPostGoal.startDate,
    endDate: savedPostGoal.endDate,
  });
  const handleGoalDateChange = (dateInfo: GoalDate) => {
    setGoalDate(dateInfo);
  };

  const {
    value: headCount,
    errMsg: headCountErr,
    onChange: changeHeadCount,
    reset: resetHeadCount,
  } = useNumInput({
    initValue: isGroup && savedPostGoal.headCount < 2 ? 2 : savedPostGoal.headCount,
    min: isGroup ? 2 : 1,
    max: 100,
    type: '인원',
  });

  const [isManual, setisManual] = useState<boolean>(false);
  const handleSelectisAuto = (isTrue: boolean) => {
    setisManual(isTrue);
  };

  const [isPrivate, setIsPrivate] = useState<boolean>(savedPostGoal.isPrivate);
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
  }, [emoji, title, description, amount, headCount]);

  const setPostGoal = useSetRecoilState(postGoal);
  const setPostGoalType = useSetRecoilState(postGoalType);
  const navigate = useNavigate();
  const [isPosted, setIsPosted] = useState<boolean>(false);
  const [isPostError, setIsPostError] = useState<boolean>(false);
  const { id } = useRecoilValue(userInfo);
  const handlePostGoal = async () => {
    if (isManual) {
      try {
        const accountId = await accountApi.createManualAccount(id);
        const goalId = await goalApi.postGoal({
          emoji,
          title,
          description,
          hashTag: [...tagList].map((v) => v.content),
          amount,
          startDate: goalDate.startDate,
          endDate: goalDate.endDate,
          headCount,
          isPrivate,
          isManual,
          accountId,
        });
        setPostGoalType({ isGroup: false });
        setTimeout(() => setIsPosted(true), 1000);
        setIsPostError(false);
        setTimeout(() => navigate(`/goals/${goalId}`, { replace: true }), 3000);
      } catch (e) {
        alert(e);
        setIsPosted(false);
        setIsPostError(true);
      }
    } else {
      setPostGoal({
        emoji: emoji,
        title: title,
        description: description,
        hashTag: [...tagList].map((v) => v.content),
        amount: amount,
        startDate: goalDate.startDate,
        endDate: goalDate.endDate,
        headCount: headCount,
        isPrivate: isPrivate,
        isManual: isManual,
        accountId: 0,
      });
      navigate('/goals/post/account/choose');
    }
  };

  if (isPosted)
    return (
      <Wrapper>
        <Info>목표 생성이 완료되었습니다.</Info>
      </Wrapper>
    );

  if (isPostError)
    return (
      <Wrapper>
        <Info>
          목표 생성이 실패했습니다.
          <br />
          다시 시도해주세요.
        </Info>
      </Wrapper>
    );

  return (
    <Wrapper>
      <ContentWrapper>
        <EmojiContentBox>
          <EmojiBox unicode={emoji} boxSize={80} emojiSize={40} />
          <Button onClick={handleShowEmojis}>
            <Icon size={24} color={'primary400'} path='' />
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
        <OptionSelectSection
          title='계좌 잔액 직접 입력'
          description='계좌를 연결하지 않고 계좌 잔액을 직접 입력합니다.'
          selectHandler={handleSelectisAuto}
        />
        {isGroup ? (
          <></>
        ) : (
          <OptionSelectSection
            title='비공개 목표'
            description='목표를 다른이들에게 공유하지 않고 나만 봅니다.'
            selectHandler={handleSelectIsPrivate}
          />
        )}
      </ContentWrapper>
      <TextButton text='목표 생성' onClickHandler={handlePostGoal} isDisabled={!isValid} />
    </Wrapper>
  );
}

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
