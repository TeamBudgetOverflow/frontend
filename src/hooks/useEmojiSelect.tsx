import { useState } from 'react';
import { EmojiClickData } from 'emoji-picker-react';

const useEmojiSelect = ({ initVal }: { initVal: string }) => {
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const handleShowEmojis = () => {
    setShowEmojis(!showEmojis);
  };
  const [emoji, setEmoji] = useState<string>(initVal);
  const handleEmojiSelect = (emoji: EmojiClickData) => {
    setShowEmojis(false);
    setEmoji(emoji.unified);
  };

  return { showEmojis, emoji, handleShowEmojis, handleEmojiSelect };
};

export default useEmojiSelect;
