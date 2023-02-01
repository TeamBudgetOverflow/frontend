import React from 'react';
import styled from 'styled-components';
import { Emoji } from 'emoji-picker-react';

interface Emoji {
  unicode: string;
  boxSize: number;
  emojiSize: number;
  showBg?: boolean;
}

const EmojiBox = ({ unicode, boxSize, emojiSize, showBg = true }: Emoji) => {
  return (
    <Wrapper size={`${boxSize}px`} showBg={showBg}>
      <Emoji unified={!unicode ? '26f0-fe0f' : unicode} size={emojiSize} />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ size: string; showBg: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 8px;
  background-color: ${(props) => (props.showBg ? props.theme.gray100 : 'transparent')};
`;

export default EmojiBox;
