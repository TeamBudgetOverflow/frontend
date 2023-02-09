import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ModalBox from '../../common/elem/ModalBox';
import ImgEditBtn from '../../common/elem/btn/ImgEditBtn';
import Crop from './imageCroper/Crop';
import TextButton from '../../common/elem/TextButton';

const ImageEdit = () => {
  const navigate = useNavigate();

  const [showCropper, setShowCropper] = useState(false);

  const handleCropperModal = () => {
    setShowCropper(true);
  };

  //   const handleLogoutButton = () => {
  //     mutate();
  //   };

  return (
    <>
      <ImgEditBtn btnSize={32} clickHandler={handleCropperModal} />
      <ModalBox show={showCropper} bgColor={'white'} maxScreenHeight={500}>
        <div>hello</div>
        <CancleButtonWrapper>
          <TextButton
            bgColor='white'
            color='green'
            text='취소'
            font='600 18px "SUIT"'
            onClickHandler={() => setShowCropper(false)}
          />
        </CancleButtonWrapper>
      </ModalBox>
    </>
  );
};

const CancleButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 0px;
  width: 100%;
  border-radius: 8px;
  background-color: white;
`;

export default ImageEdit;
