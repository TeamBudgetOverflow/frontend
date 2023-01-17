import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import randomcolor from 'randomcolor';

import InputBox from '../../common/elem/InputBox';
import Icon from '../../common/elem/Icon';
import ValidateMsg from '../../common/elem/ValidateMsg';
import C3TextBox from '../../common/elem/C3TextBox';
import HashTag, { IHashTag } from '../../common/tag/HashTag';

import useTxtInput from '../../../hooks/useTxtInput';

interface TagInputSectionProps {
  changeTagListHandler: (tagList: Array<IHashTag>) => void;
}

const TagInputSection = ({ changeTagListHandler }: TagInputSectionProps) => {
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

  const [tagList, setTagList] = useState<Array<IHashTag>>([]);
  const validateTag = (tagContent: string) => {
    if (tagContent.length === 0) {
      return alert('키워드를 입력해주세요.');
    }

    if (tagList.length === 10) {
      return alert('해시태그는 최대 10개까지 추가가 가능합니다.');
    }

    for (const t of tagList) {
      if (t.content === tagContent) {
        return alert('이미 추가된 해시태그입니다');
      }
    }
  };

  const handleAddTag = () => {
    validateTag(tagContent);
    setTagList((prev) => [
      ...prev,
      {
        content: tagContent,
        // bgColor: randomcolor({ luminosity: 'light' }),
        bgColor: '#CCC',
      },
    ]);
    resetTag();
  };

  const handleDeleteTag = (tag: IHashTag) => {
    setTagList((prev) => prev.filter((v) => v.content !== tag.content));
  };

  useEffect(() => {
    changeTagListHandler(tagList);
  }, [tagList]);

  return (
    <ContentBox>
      <SubTitle>해시태그</SubTitle>
      <RowContent>
        <InputWrapper>
          <InputBox placeholder='키워드를 입력해 주세요' type='text' value={tagContent} onChangeHandler={changeTag} />
        </InputWrapper>
      </RowContent>
      <ValidateMsg msg={tagErr} type='error' />
      {/* TODO: 추가된 해시 태그 목록 보여주기 */}
      {/* <ContentBox>
        <TagInfo>
          <C3TextBox text={`${tagList.length}/10`} />
        </TagInfo>
        <TagList>
          {tagList.map((tag) => (
            <HashTag key={tag.content} tag={tag} removeHandler={() => handleDeleteTag(tag)} />
          ))}
        </TagList>
      </ContentBox> */}
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.theme.secondary200};
  :hover {
    cursor: pointer;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  flex-wrap: nowrap;
  width: 100%;
  overflow-x: auto;
`;

const TagInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;

export default TagInputSection;
