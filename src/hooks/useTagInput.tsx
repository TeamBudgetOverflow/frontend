import { useState } from 'react';

const useTagInput = ({ initVal }: { initVal: Array<string> }) => {
  const [tagList, setTagList] = useState<Array<string>>(initVal);

  const handleTagListChange = (tagList: Array<string>) => {
    setTagList(tagList);
  };

  return { tagList, handleTagListChange };
};

export default useTagInput;
