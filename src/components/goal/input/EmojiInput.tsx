import React, { useEffect } from 'react';
import styled from 'styled-components';

import EmojiBox from '../../common/elem/EmojiBox';
import ImgEditBtn from '../../common/elem/btn/ImgEditBtn';
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
      <BoxWrapper>
        <EmojiBox unicode={emoji} boxSize={80} emojiSize={40} />
        <BtnWrapper>
          <ImgEditBtn btnSize={32} clickHandler={handleShowEmojis} />
        </BtnWrapper>
      </BoxWrapper>
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

const BoxWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;

const BtnWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: -20px;
`;

const EmojiPickerWrapper = styled.div<{ show: boolean }>`
  position: absolute;
  top: 110%;
  z-index: 5;
  display: ${(props) => (props.show ? '' : 'none')};
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
`;

export default EmojiInput;
