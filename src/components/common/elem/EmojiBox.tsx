import React from 'react';
import styled from 'styled-components';
import { Emoji } from 'emoji-picker-react';

interface Emoji {
  unicode: string;
  boxSize: number;
  emojiSize: number;
}

const EmojiBox = ({ unicode, boxSize, emojiSize }: Emoji) => {
  return (
    <Wrapper size={`${boxSize}px`}>
      <Emoji unified={unicode} size={emojiSize} />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ size: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 8px;
  background-color: ${(props) => props.theme.gray100};
`;

export default EmojiBox;
