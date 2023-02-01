import React from 'react';
import { useNavigate } from 'react-router-dom';

import TextButton from '../../common/elem/TextButton';

const GoalModifyButton = ({ isGroup }: { isGroup: boolean }) => {
  const navigate = useNavigate();
  const handleModify = () => {
    navigate(`modify/data/${isGroup ? 'group' : 'personal'}`);
  };

  return <TextButton text='수정하기' onClickHandler={handleModify} />;
};

export default GoalModifyButton;
