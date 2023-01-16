import React from 'react';
import styled from 'styled-components';
import { Emoji } from 'emoji-picker-react';

interface Emoji {
  unicode: string;
}

const EmojiBox = ({ unicode }: Emoji) => {
  return (
    <Wrapper>
      <Emoji unified={unicode} size={20} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.gray100};
`;

export default EmojiBox;
