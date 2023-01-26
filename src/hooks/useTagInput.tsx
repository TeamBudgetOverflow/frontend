import { useState } from 'react';

import { IHashTag } from '../components/common/tag/HashTag';

const useTagInput = ({ initVal }: { initVal: Array<string> }) => {
  const [tagList, setTagList] = useState<Array<IHashTag>>(
    initVal
      ? [...initVal].map((v) => {
          return { content: v, bgColor: '#ccc' };
        })
      : []
  );

  const handleTagListChange = (tagList: Array<IHashTag>) => {
    setTagList((prev) => [...prev, ...tagList]);
  };

  return { tagList, handleTagListChange };
};

export default useTagInput;
