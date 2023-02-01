import React from 'react';
import styled from 'styled-components';

import Icon from '../elem/Icon';

interface HashTagProps {
  tag: string;
  removeHandler?: (tag: string) => void;
}

const HashTag = React.memo(function HashTag({ tag, removeHandler }: HashTagProps) {
  return (
    <Tag>
      {`#${tag}`}
      {!removeHandler ? (
        <></>
      ) : (
        <DeleteButton onClick={() => removeHandler(tag)}>
          <Icon
            width={10}
            height={10}
            color={'#ccc'}
            path='M9.77816 0.229428C9.48237 -0.0663631 9.00455 -0.0663631 8.70876 0.229428L5 3.9306L1.29124 0.221843C0.99545 -0.0739477 0.517634 -0.0739477 0.221843 0.221843C-0.0739477 0.517634 -0.0739477 0.99545 0.221843 1.29124L3.9306 5L0.221843 8.70876C-0.0739477 9.00455 -0.0739477 9.48237 0.221843 9.77816C0.517634 10.0739 0.99545 10.0739 1.29124 9.77816L5 6.0694L8.70876 9.77816C9.00455 10.0739 9.48237 10.0739 9.77816 9.77816C10.0739 9.48237 10.0739 9.00455 9.77816 8.70876L6.0694 5L9.77816 1.29124C10.0664 1.00303 10.0664 0.517634 9.77816 0.229428Z'
          />
        </DeleteButton>
      )}
    </Tag>
  );
});

const Tag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  flex: 0 0 auto;
  font: ${(props) => props.theme.captionC2};
  color: ${(props) => props.theme.primary400};
  border-radius: 16px;
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
