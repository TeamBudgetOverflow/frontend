import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userId } from '../recoil/userAtoms';

export enum Menu {
  home,
  lookup,
  search,
  my,
  none,
}

const pathMenuConverter = (path: string, userId: number) => {
  if (path.includes('/goals/lookup/search')) return Menu.search;
  if (path === '/goals/lookup') return Menu.lookup;
  if (path === '/home') return Menu.home;
  if (path.includes('/users') && !path.includes('/edit') && !path.includes('/settings')) return Menu.my;

  return Menu.none;
};

interface useNavigateStateProps {
  pathname: string;
  userId: number;
}

const useNavigateState = ({ pathname, userId }: useNavigateStateProps) => {
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(true);
  const [selectedMenu, setSelectedMenu] = useState<Menu>(Menu.home);
  const handleMenuSelect = (menu: Menu) => {
    switch (menu) {
      case Menu.home:
        return setSelectedMenu(Menu.home);
      case Menu.lookup:
        return setSelectedMenu(Menu.lookup);
      case Menu.search:
        return setSelectedMenu(Menu.search);
      case Menu.my:
        return setSelectedMenu(Menu.my);
    }
  };

  const handlePageNavigate = (menu: Menu) => {
    switch (menu) {
      case Menu.home:
        return navigate('/home');
      case Menu.lookup:
        return navigate('/goals/lookup');
      case Menu.my:
        return navigate(`/users/${userId}`);
    }
  };

  useEffect(() => {
    if (pathname.includes('/goals/') && !pathname.includes('lookup')) return setShow(false);
    if (pathname.includes('/accounts')) return setShow(false);
    if (pathname.includes('/users/edit')) return setShow(false);
    if (pathname.includes('/users/') && pathname !== `/users/${userId}`) return setShow(false);
    if (pathname.includes('/chats')) return setShow(false);

    setShow(true);
    handleMenuSelect(pathMenuConverter(pathname, userId));
    handlePageNavigate(pathMenuConverter(pathname, userId));
  }, [pathname]);

  return { selectedMenu, show, handleMenuSelect, handlePageNavigate };
};

export default useNavigateState;
