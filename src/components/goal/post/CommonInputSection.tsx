import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import InputBox from '../../common/elem/InputBox';
import ValidateMsg from '../../common/elem/ValidateMsg';
import TagInputSection from './TagInputSection';
import { IHashTag } from '../../common/tag/HashTag';
import { IGoalCommonInfo } from '../../../pages/PostGoal';

import useTxtInput from '../../../hooks/useTxtInput';
import useNumInput from '../../../hooks/useNumInput';

interface CommonInputSectionProps {
  changeGoalDataHandler: (goalInfo: IGoalCommonInfo) => void;
}

function CommonInputSection({ changeGoalDataHandler }: CommonInputSectionProps) {
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
  } = useNumInput({ initValue: 0, min: 1000, max: 70000, type: '목표 금액' });

  const [tagList, setTagList] = useState<Array<IHashTag>>([]);
  const handleTagListChange = (tagList: Array<IHashTag>) => {
    setTagList((prev) => [...prev, ...tagList]);
  };

  useEffect(() => {
    changeGoalDataHandler({
      title: title,
      description: description,
      amount: Number(amount),
      hashtag: tagList.map((tag) => tag.content),
    });
  }, [title, description, amount, tagList]);

  return (
    <>
      <ContentBox>
        <SubTitle>목표명</SubTitle>
        <InputWrapper>
          <InputBox placeholder='목표명을 입력해주세요' type='text' value={title} onChangeHandler={changeTitle} />
        </InputWrapper>
        <ValidateMsg msg={titleErr} type='error' />
      </ContentBox>
      <ContentBox>
        <SubTitle>목표 상세 설명</SubTitle>
        <InputWrapper>
          <InputBox
            placeholder='목표 설명을 입력해주세요'
            type='text'
            value={description}
            onChangeHandler={changeDescription}
          />
        </InputWrapper>
        <ValidateMsg msg={descriptionErr} type='error' />
      </ContentBox>
      <ContentBox>
        <SubTitle>목표 금액</SubTitle>
        <RowContent>
          <InputWrapper>
            <InputBox
              placeholder='목표 금액을 1,000원 ~ 70,000원 사이로 입력해주세요'
              type='text'
              value={amount.toLocaleString()}
              onChangeHandler={changeAmount}
            />
          </InputWrapper>
          <span>원</span>
        </RowContent>
        <ValidateMsg msg={amountErr} type='error' />
      </ContentBox>
      <TagInputSection changeTagListHandler={handleTagListChange} />
    </>
  );
}

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

const RowContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

export default CommonInputSection;
