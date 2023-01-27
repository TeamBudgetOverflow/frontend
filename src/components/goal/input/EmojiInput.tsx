import React, { useEffect } from 'react';
import styled from 'styled-components';

import EmojiBox from '../../common/elem/EmojiBox';
import Icon from '../../common/elem/Icon';
import EmojiPicker from 'emoji-picker-react';

import useEmojiSelect from '../../../hooks/useEmojiSelect';

interface EmojiInputProps {
  initVal: string;
  changeHandler: (emoji: string) => void;
}

function EmojiInput({ initVal, changeHandler }: EmojiInputProps) {
  const { showEmojis, emoji, handleShowEmojis, handleEmojiSelect } = useEmojiSelect({ initVal });
  useEffect(() => {
    changeHandler(emoji);
  }, [emoji]);

  return (
    <EmojiContentBox>
      <EmojiBox unicode={emoji} boxSize={80} emojiSize={40} />
      <Button onClick={handleShowEmojis}>
        <Icon width={24} height={24} color={'primary400'} path='' />
      </Button>
      <EmojiPickerWrapper show={showEmojis}>
        <EmojiPicker onEmojiClick={(emoji) => handleEmojiSelect(emoji)} />
      </EmojiPickerWrapper>
    </EmojiContentBox>
  );
}

const EmojiContentBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
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

export default EmojiInput;
