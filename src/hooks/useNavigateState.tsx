import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export enum Menu {
  home,
  lookup,
  my,
  none,
}

const pathMenuConverter = (path: string) => {
  if (path.includes('/goals/lookup')) return Menu.lookup;
  if (path === '/home') return Menu.home;

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
        setSelectedMenu(Menu.home);
        return navigate('/home');
      case Menu.lookup:
        setSelectedMenu(Menu.lookup);
        return navigate('/goals/lookup');
      case Menu.my:
        setSelectedMenu(Menu.my);
        return navigate(`/users/${userId}`);
    }
  };

  useEffect(() => {
    if (pathname.includes('/goals/') && !pathname.includes('lookup')) return setShow(false);
    if (pathname.includes('/accounts')) return setShow(false);
    if (pathname.includes('/users/edit')) return setShow(false);
    if (pathname.includes('/chats')) return setShow(false);

    setShow(true);
    handleMenuSelect(pathMenuConverter(pathname));
  }, [pathname]);

  return { selectedMenu, show, handleMenuSelect };
};

export default useNavigateState;
