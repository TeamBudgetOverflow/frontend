import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Icon from '../Icon';

const AddGoalBtn = () => {
  const navigate = useNavigate();

  return (
    <ButtonBox onClick={() => navigate('/goals/post/type')}>
      <IconWrapper>
        <Icon
          width={20}
          height={20}
          color={'white'}
          path='M18.0001 11.3333H11.3334V18C11.3334 18.7333 10.7334 19.3333 10.0001 19.3333C9.26675 19.3333 8.66675 18.7333 8.66675 18V11.3333H2.00008C1.26675 11.3333 0.666748 10.7333 0.666748 9.99996C0.666748 9.26663 1.26675 8.66663 2.00008 8.66663H8.66675V1.99996C8.66675 1.26663 9.26675 0.666626 10.0001 0.666626C10.7334 0.666626 11.3334 1.26663 11.3334 1.99996V8.66663H18.0001C18.7334 8.66663 19.3334 9.26663 19.3334 9.99996C19.3334 10.7333 18.7334 11.3333 18.0001 11.3333Z'
        />
      </IconWrapper>
    </ButtonBox>
  );
};

const ButtonBox = styled.div`
  position: absolute;
  bottom: 12px;
  right: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.primary400};
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  :hover {
    cursor: pointer;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
`;

export default AddGoalBtn;
