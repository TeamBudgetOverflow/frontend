import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

import EmojiBox from '../../common/elem/EmojiBox';
import Icon from '../../common/elem/Icon';
import InputBox from '../../common/elem/InputBox';
import ValidateMsg from '../../common/elem/ValidateMsg';
import TagInputSection from './TagInputSection';
import { IHashTag } from '../../common/tag/HashTag';

import useTxtInput from '../../../hooks/useTxtInput';
import useNumInput from '../../../hooks/useNumInput';

import { IPostGoal } from '../../../interfaces/interfaces';
import TextButton from '../../common/elem/TextButton';
import DateSelectSection, { GoalDate } from './goalInfo/DateSelectSection';
import OptionSelectSection from './goalInfo/OptionSelectSection';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { postGoal } from '../../../recoil/goalsAtoms';
import { useNavigate } from 'react-router';
import { accountApi, goalApi } from '../../../apis/client';

interface GoalInfoInputProps {
  isGroup: boolean;
}

function GoalInfoInput({ isGroup }: GoalInfoInputProps) {
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const handleShowEmojis = () => {
    setShowEmojis(!showEmojis);
  };
  const [emoji, setEmoji] = useState<string>('26f0-fe0f');
  const handleEmojiSelect = (emoji: EmojiClickData) => {
    setEmoji(emoji.unified);
  };

  const {
    value: title,
    errMsg: titleErr,
    onChange: changeTitle,
    reset: resetTitle,
  } = useTxtInput({
    initValue: '',
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
    initValue: '',
    minLength: 0,
    maxLength: 255,
    type: '설명',
  });

  const {
    value: amount,
    errMsg: amountErr,
    onChange: changeAmount,
    reset: resetAmount,
  } = useNumInput({ initValue: 1000, min: 1000, max: 70000, type: '목표 금액' });

  const [tagList, setTagList] = useState<Array<IHashTag>>([]);
  const handleTagListChange = (tagList: Array<IHashTag>) => {
    setTagList((prev) => [...prev, ...tagList]);
  };

  const [goalDate, setGoalDate] = useState<GoalDate>({ startDate: new Date(), endDate: new Date() });
  const handleGoalDateChange = (dateInfo: GoalDate) => {
    setGoalDate(dateInfo);
  };

  const {
    value: headCount,
    errMsg: headCountErr,
    onChange: changeHeadCount,
    reset: restHeadCount,
  } = useNumInput({ initValue: 2, min: 2, max: 100, type: '인원' });

  const [isAuto, setisAuto] = useState<boolean>(true);
  const handleSelectisAuto = (isTrue: boolean) => {
    setisAuto(isTrue);
  };

  const [isPrivate, setIsPrivate] = useState<boolean>(false);
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
  const savedPostGoal = useRecoilValue(postGoal);
  const navigate = useNavigate();
  const handlePostGoal = () => {
    console.log(isAuto);
    setPostGoal({
      emoji: emoji,
      title: title,
      description: description,
      hashtag: tagList,
      amount: amount,
      startDate: goalDate.startDate,
      endDate: goalDate.endDate,
      headCount: headCount,
      isPrivate: isPrivate,
      isAuto: isAuto,
      accntId: 0,
    });

    if (isAuto) {
      navigate('/goals/post/account/choose');
    } else {
      // TODO: createAccount
      // const accntId = accountApi.createAccount();
      // setPostGoal({...savedPostGoal, accntId: accntId });
      // goalApi.postGoal(savedPostGoal);
    }
  };

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
              <InputBox
                placeholder='목표 금액을 1,000원 ~ 70,000원 사이로 입력해주세요'
                type='text'
                value={amount.toLocaleString()}
                onChangeHandler={changeAmount}
              />
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
                  <InputBox
                    placeholder='모집인원을 1명 ~ 100명까지 숫자로 입력해주세요'
                    type='text'
                    value={headCount}
                    onChangeHandler={changeHeadCount}
                  />
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
  gap: 45px;
  width: 100%;
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
