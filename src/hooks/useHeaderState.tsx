import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useHeaderState = ({ pathname }: { pathname: string }) => {
  const navigate = useNavigate();
  const [showSearchBtn, setShowSearchBtn] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const handleSearchClick = () => {
    setShowSearchBar(true);
    setShowSearchBtn(false);
    setShowPrevBtn(true);
  };

  const [showChatBtn, setShowChatBtn] = useState<boolean>(false);
  const handleChatClick = () => {
    console.log('채팅 페이지로 이동');
  };

  const [showPrevBtn, setShowPrevBtn] = useState<boolean>(false);
  const handlePrevClick = () => {
    if (pathname !== '/goals/lookup') {
      return navigate(-1);
    }

    setShowSearchBar(false);
    setShowSearchBtn(true);
    setShowPrevBtn(false);
  };

  useEffect(() => {
    if (pathname === '/home') {
      setShowPrevBtn(false);
      setShowSearchBar(false);
      setShowSearchBtn(false);
      setShowChatBtn(true);
      return;
    }
    if (pathname.includes('/goals/post')) {
      setShowPrevBtn(true);
      setShowSearchBar(false);
      setShowSearchBtn(false);
      setShowChatBtn(false);
      return;
    }
    if (pathname.includes('/goals/') && !pathname.includes('lookup') && !pathname.includes('post')) {
      setShowPrevBtn(true);
      setShowSearchBar(false);
      setShowSearchBtn(false);
      setShowChatBtn(true);
      return;
    }
    if (pathname.includes('/users')) {
      setShowPrevBtn(false);
      setShowSearchBar(false);
      setShowSearchBtn(false);
      setShowChatBtn(true);
      return;
    }

    setShowPrevBtn(false);
    setShowSearchBar(false);
    setShowSearchBtn(true);
    setShowChatBtn(true);
  }, [pathname]);

  return {
    showSearchBtn,
    showChatBtn,
    showPrevBtn,
    showSearchBar,
    handleSearchClick,
    handleChatClick,
    handlePrevClick,
  };
};

export default useHeaderState;
