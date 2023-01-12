import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Menu onClick={() => navigate('/')}>
        <SVGIcon viewBox='0 0 24 24'>
          <path
            fill='#e4f7ea'
            d='M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z'
          />
        </SVGIcon>
        <Text>홈</Text>
      </Menu>
      <Menu onClick={() => navigate('/goals/lookup')}>
        <SVGIcon viewBox='0 0 24 24'>
          <path
            fill='#e4f7ea'
            d='M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z'
          />
        </SVGIcon>
        <Text>목표 조회</Text>
      </Menu>
      <Menu>
        <SVGIcon viewBox='0 0 24 24'>
          <path
            fill='#e4f7ea'
            d='M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z'
          />
        </SVGIcon>
        <Text>마이페이지</Text>
      </Menu>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 88px;
  background-color: ${(props) => props.theme.primaryMain};
`;

const Menu = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 85px;
  :hover {
    cursor: pointer;
  }
`;

const SVGIcon = styled.svg`
  width: 24px;
  height: 24px;
`;

const Text = styled.div`
  font: ${(props) => props.theme.paragraphP3M};
`;

export default Navigation;
