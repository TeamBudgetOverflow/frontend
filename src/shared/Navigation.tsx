import React, { useState, forwardRef, Ref, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Icon from '../components/common/elem/Icon';

import { userInfo } from '../recoil/userAtoms';

enum Menu {
  home,
  lookup,
  my,
  none,
}

interface NavProps {
  props: string;
}

const pathMenuConverter = (path: string) => {
  if (path.includes('/goals/lookup')) return Menu.lookup;
  if (path.includes('/users/')) return Menu.my;
  if (path === '/') return Menu.home;

  return Menu.none;
};

const Navigation = (props: NavProps, ref: Ref<HTMLDivElement>) => {
  const navigate = useNavigate();
  const { id } = useRecoilValue(userInfo);

  const [selectedMenu, setSelectedMenu] = useState<Menu>(Menu.home);
  const handleMenuSelect = (menu: Menu) => {
    switch (menu) {
      case Menu.home:
        setSelectedMenu(Menu.home);
        return navigate('/');
      case Menu.lookup:
        setSelectedMenu(Menu.lookup);
        return navigate('/goals/lookup');
      case Menu.my:
        setSelectedMenu(Menu.my);
        return navigate(`/users/${id}`);
    }
  };

  const [show, setShow] = useState<boolean>(true);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.includes('/goals/post')) return setShow(false);
    setShow(true);

    handleMenuSelect(pathMenuConverter(pathname));
  }, [pathname]);
  return (
    <Wrapper show={show} ref={ref}>
      <Button show={show} onClick={() => handleMenuSelect(Menu.home)}>
        <Icon
          size={show ? 24 : 0}
          color={selectedMenu === Menu.home ? 'primary400' : 'gray400'}
          path='M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z'
        />
        <Text show={show}>홈</Text>
      </Button>
      <Button show={show} onClick={() => handleMenuSelect(Menu.lookup)}>
        <Icon
          size={show ? 24 : 0}
          color={selectedMenu === Menu.lookup ? 'primary400' : 'gray400'}
          path='M4 13H10C10.55 13 11 12.55 11 12V4C11 3.45 10.55 3 10 3H4C3.45 3 3 3.45 3 4V12C3 12.55 3.45 13 4 13ZM4 21H10C10.55 21 11 20.55 11 20V16C11 15.45 10.55 15 10 15H4C3.45 15 3 15.45 3 16V20C3 20.55 3.45 21 4 21ZM14 21H20C20.55 21 21 20.55 21 20V12C21 11.45 20.55 11 20 11H14C13.45 11 13 11.45 13 12V20C13 20.55 13.45 21 14 21ZM13 4V8C13 8.55 13.45 9 14 9H20C20.55 9 21 8.55 21 8V4C21 3.45 20.55 3 20 3H14C13.45 3 13 3.45 13 4Z'
        />
        <Text show={show}>목표 조회</Text>
      </Button>
      <Button show={show} onClick={() => handleMenuSelect(Menu.my)}>
        <Icon
          size={show ? 24 : 0}
          color={selectedMenu === Menu.my ? 'primary400' : 'gray400'}
          path='M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V19C4 19.55 4.45 20 5 20H19C19.55 20 20 19.55 20 19V18C20 15.34 14.67 14 12 14Z'
        />
        <Text show={show}>마이페이지</Text>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${(props) => (props.show ? '88px' : '0')};
  background-color: white;
  transition: height 0.3s;
`;

const Button = styled.div<{ show: boolean }>`
  padding: 8px;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 85px;
  :hover {
    cursor: pointer;
  }
`;

const Text = styled.div<{ show: boolean }>`
  font: ${(props) => props.theme.paragraphP3M};
  visibility: ${(props) => (props.show ? '' : 'hidden')};
`;

export default forwardRef(Navigation);
