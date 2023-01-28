import React from 'react';
import styled from 'styled-components';

import Icon from '../Icon';

interface ImgEditBtnProps {
  btnSize: number;
  clickHandler: () => void;
}

const ImgEditBtn = ({ btnSize, clickHandler }: ImgEditBtnProps) => {
  return (
    <Button size={`${btnSize}px`} onClick={clickHandler}>
      <Icon
        width={19}
        height={19}
        color='black'
        path='M0 15.4601V18.5001C0 18.7801 0.22 19.0001 0.5 19.0001H3.54C3.67 19.0001 3.8 18.9501 3.89 18.8501L14.81 7.94006L11.06 4.19006L0.15 15.1001C0.0500001 15.2001 0 15.3201 0 15.4601ZM17.71 5.04006C18.1 4.65006 18.1 4.02006 17.71 3.63006L15.37 1.29006C14.98 0.900059 14.35 0.900059 13.96 1.29006L12.13 3.12006L15.88 6.87006L17.71 5.04006Z'
      />
    </Button>
  );
};

const Button = styled.div<{ size: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.gray300};
`;

export default ImgEditBtn;
