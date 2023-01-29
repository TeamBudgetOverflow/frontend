import { useEffect, useState } from 'react';

const useInfiniteScroll = ({ handleOnScrollEndEvent }: any) => {
  const [isEnd, setIsEnd] = useState(false);
  const [pageNum, setPageNum] = useState(2);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      setIsEnd(true);
      setPageNum((prev) => prev + 1);
      console.log(isEnd);
      if (handleOnScrollEndEvent) handleOnScrollEndEvent(pageNum);
      setIsEnd(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { isEnd, pageNum };
};

export default useInfiniteScroll;
