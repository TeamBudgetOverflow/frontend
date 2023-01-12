import React from 'react';
import styled from 'styled-components';

import Icon from '../elem/Icon';

interface HashTagProps {
  tag: IHashTag;
  removeHandler: (tag: IHashTag) => void | null;
}

export interface IHashTag {
  content: string;
  bgColor: string;
}

const HashTag = React.memo(function HashTag({
  tag: { content, bgColor },
  removeHandler,
}: HashTagProps) {
  return (
    <Tag bgColor={bgColor}>
      {`#${content}`}
      {removeHandler === null ? (
        <></>
      ) : (
        <DeleteButton onClick={() => removeHandler({ content, bgColor })}>
          <Icon>
            <path
              fill='#e4f7ea'
              d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z'
            />
          </Icon>
        </DeleteButton>
      )}
    </Tag>
  );
});

const Tag = styled.div<{ bgColor: string }>`
  padding: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  flex: 0 0 auto;
  font: ${(props) => props.theme.captionC2};
  border-radius: 16px;
  background-color: ${(props) => props.bgColor};
`;

const DeleteButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;
  background-color: transparent;
  :hover {
    cursor: pointer;
  }
`;

export default HashTag;
