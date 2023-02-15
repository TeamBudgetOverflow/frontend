import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useKeywordSearch = ({ pathname }: { pathname: string }) => {
  const [keyword, setKeyword] = useState('');
  const handleKeywordChange = (keyword: string) => {
    setKeyword(keyword);
  };

  const navigate = useNavigate();
  const handleKeypress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter') {
      return navigate(
        {
          pathname: '/goals/lookup/search',
          search: `?keyword=${keyword}`,
        },
        { replace: true }
      );
    }
  };

  useEffect(() => {
    if (pathname.split('keyword=')[1] === undefined) {
      setKeyword('');
    }
  }, [pathname]);

  return { keyword, handleKeywordChange, handleKeypress };
};

export default useKeywordSearch;
