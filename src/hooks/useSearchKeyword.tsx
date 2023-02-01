import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSearchKeyword = () => {
  const navigate = useNavigate();
  const [onFocus, setOnFocus] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearchButton = (searchKeyword: string) => {
    setSearchKeyword('');
    navigate(`/goals/lookup/search?search=${searchKeyword}`);
  };

  const handleOnKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === 'Enter' && searchKeyword) {
      handleSearchButton(searchKeyword);
    }
  };

  useEffect(() => {
    if (onFocus === true) {
      navigate('goals/lookup/search');
    }
  }, [onFocus]);

  return { onFocus, searchKeyword, setOnFocus, setSearchKeyword, handleOnKeyPress };
};

export default useSearchKeyword;
