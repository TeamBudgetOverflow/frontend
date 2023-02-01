import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userId } from '../recoil/userAtoms';

const useHeaderState = ({ pathname }: { pathname: string }) => {
  const navigate = useNavigate();
  const [showSearchBtn, setShowSearchBtn] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const handleKeywordChange = (keyword: string) => {
    setKeyword(keyword);
  };
  const handleKeypress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter') {
      handleSearchClick();
    }
  };
  const handleSearchClick = () => {
    if (pathname.includes('/goals/lookup'))
      return navigate({
        pathname: '/goals/lookup/search',
        search: `?keyword=${keyword}`,
      });
    navigate('/goals/lookup');
  };

  const [showChatBtn, setShowChatBtn] = useState<boolean>(false);
  const handleChatClick = () => {
    navigate('/chats');
  };

  const [showPrevBtn, setShowPrevBtn] = useState<boolean>(false);
  const handlePrevClick = () => {
    if (pathname !== '/goals/lookup') {
      setKeyword('');
      return navigate(-1);
    }

    setShowSearchBar(false);
    setShowSearchBtn(true);
    setShowPrevBtn(false);
  };

  const { id } = useRecoilValue(userId);

  const [showSettingsBtn, setShowSettingsBtn] = useState<boolean>(false);
  const handleSettingsClick = () => {
    navigate(`/users/settings/${id}`);
  };

  const showPrevOnly = () => {
    setShowPrevBtn(true);
    setShowSearchBar(false);
    setShowSearchBtn(false);
    setShowChatBtn(false);
    setShowSettingsBtn(false);
  };

  const showChatOnly = () => {
    setShowPrevBtn(false);
    setShowSearchBar(false);
    setShowSearchBtn(false);
    setShowChatBtn(true);
    setShowSettingsBtn(false);
  };

  const showSettingsOnly = () => {
    setShowPrevBtn(false);
    setShowSearchBar(false);
    setShowSearchBtn(false);
    setShowChatBtn(false);
    setShowSettingsBtn(true);
  };

  useEffect(() => {
    if (pathname === '/home') {
      showChatOnly();
      return;
    }
    if (pathname === `/users/${id}`) {
      showSettingsOnly();
      return;
    }
    if (pathname.includes('/users') && !pathname.includes('/edit') && !pathname.includes('/settings')) {
      setShowSearchBar(false);
      setShowPrevBtn(true);
      setShowSearchBtn(false);
      setShowChatBtn(false);
      setShowSettingsBtn(true);
      return;
    }
    if (pathname.includes('/edit')) {
      showPrevOnly();
      return;
    }
    if (pathname.includes('/settings')) {
      showPrevOnly();
      return;
    }
    if (pathname.includes('/goals/post')) {
      showPrevOnly();
      return;
    }
    if (pathname.includes('/accounts')) {
      showPrevOnly();
      return;
    }
    if (pathname.includes('/goals/') && !pathname.includes('lookup') && !pathname.includes('post')) {
      showPrevOnly();
      return;
    }
    if (pathname.includes('/chats')) {
      showPrevOnly();
      return;
    }
    if (pathname === '/goals/lookup/search') {
      setShowSearchBar(true);
      setShowPrevBtn(true);
      setShowSearchBtn(false);
      setShowChatBtn(false);
      setShowSettingsBtn(false);
      return;
    }

    setShowPrevBtn(false);
    setShowSearchBar(false);
    setShowSearchBtn(true);
    setShowChatBtn(true);
    setShowSettingsBtn(false);
  }, [pathname]);

  return {
    showSearchBtn,
    showChatBtn,
    showPrevBtn,
    showSearchBar,
    keyword,
    showSettingsBtn,
    handleSearchClick,
    handleChatClick,
    handlePrevClick,
    handleKeywordChange,
    handleKeypress,
    handleSettingsClick,
  };
};

export default useHeaderState;
