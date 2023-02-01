import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import InputBox from '../../common/elem/InputBox';
import Icon from '../../common/elem/Icon';
import ValidateMsg from '../../common/elem/ValidateMsg';
import C3TextBox from '../../common/elem/C3TextBox';
import HashTag from '../../common/tag/HashTag';

import useTxtInput from '../../../hooks/useTxtInput';

interface TagInputSectionProps {
  initVal: Array<string>;
  changeTagListHandler: (tagList: Array<string>) => void;
}

const TagInputSection = ({ initVal, changeTagListHandler }: TagInputSectionProps) => {
  const {
    value: tagContent,
    errMsg: tagErr,
    onChange: changeTag,
    reset: resetTag,
  } = useTxtInput({
    initValue: '',
    minLength: 0,
    maxLength: 15,
    type: '해시태그',
  });

  const [tagList, setTagList] = useState<Array<string>>(initVal);
  const validateTag = (tagContent: string): boolean => {
    if (tagContent.length === 0) {
      alert('키워드를 입력해주세요.');
      return false;
    }

    if (tagList.length === 10) {
      alert('해시태그는 최대 10개까지 추가가 가능합니다.');
      return false;
    }

    for (const t of tagList) {
      if (t === tagContent) {
        alert('이미 추가된 해시태그입니다');
        return false;
      }
    }

    return true;
  };

  const handleAddTag = () => {
    if (!validateTag(tagContent)) return;
    setTagList((prev) => {
      return [...prev, tagContent];
    });
    resetTag();
  };

  const handleDeleteTag = (tag: string) => {
    setTagList((prev) => prev.filter((v) => v !== tag));
  };

  useEffect(() => {
    changeTagListHandler(tagList);
  }, [tagList]);

  return (
    <ContentBox>
      <SubTitle>해시태그</SubTitle>
      <RowContent>
        <InputWrapper>
          <InputBox
            placeholder='+ 버튼으로 해시태그를 등록해 주세요'
            type='text'
            value={tagContent}
            onChangeHandler={changeTag}
          />
          <IconButton onClick={handleAddTag}>
            <Icon width={14} height={14} color='#2bc470' path='M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z' />
          </IconButton>
        </InputWrapper>
      </RowContent>
      <ValidateMsg msg={tagErr} type='error' />
      <TagListRowContent>
        <TagList>
          {tagList.map((tag) => (
            <HashTag key={tag} tag={tag} removeHandler={() => handleDeleteTag(tag)} />
          ))}
        </TagList>
        <TagInfo>
          <C3TextBox text={`${tagList.length}/10`} />
        </TagInfo>
      </TagListRowContent>
    </ContentBox>
  );
};

const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const SubTitle = styled.div`
  font: ${(props) => props.theme.captionC1};
  color: ${(props) => props.theme.gray600};
`;

const InputWrapper = styled.div`
  position: relative;
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

const IconButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: 1px solid ${(props) => props.theme.primary400};
  border-radius: 8px;
  :hover {
    cursor: pointer;
  }
`;

const TagListRowContent = styled(RowContent)`
  gap: 10px;
`;

const TagList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  flex-wrap: nowrap;
  width: 100%;
  overflow-x: auto;
`;

const TagInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export default TagInputSection;
