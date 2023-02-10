import React, { useState, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import Slider from '@mui/material/Slider/Slider';

import TextButton from '../../../common/elem/TextButton';

import getCroppedImg from '../../../../utils/imageCropper';

import { userProfileCropImage } from '../../../../recoil/userAtoms';

interface CropProps {
  showCropper: () => void;
  setUploadFile: (e: File) => void;
  profileImage: string;
}

const Crop = ({ showCropper, setUploadFile, profileImage }: CropProps) => {
  const setCroppedImage = useSetRecoilState(userProfileCropImage);

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getFileFromBase64 = (base64: string, fileName: string) => {
    const trimmedString = base64.replace('data:image/jpeg;base64,', '');
    const imageContent = atob(trimmedString);
    const buffer = new ArrayBuffer(imageContent.length);
    const view = new Uint8Array(buffer);

    for (let n = 0; n < imageContent.length; n++) {
      view[n] = imageContent.charCodeAt(n);
    }
    const type = 'image/jpeg';
    const blob = new Blob([buffer], { type });

    return new File([blob], fileName, { lastModified: new Date().getTime(), type });
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const cropCompletedImage = await getCroppedImg(profileImage, croppedAreaPixels);

      const myFile = getFileFromBase64(cropCompletedImage as string, 'myCroppedImage.jpeg');

      setUploadFile(myFile);
      setCroppedImage({ cropImage: cropCompletedImage as string });
    } catch (e) {
      console.error(e);
    } finally {
      showCropper();
    }
  }, [croppedAreaPixels]);

  return (
    <Wrapper>
      <CropContainer>
        <Cropper
          image={profileImage}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape='round'
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </CropContainer>
      <Contoller>
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby='Zoom'
          onChange={(e, zoom) => setZoom(Number(zoom))}
          classes={{ root: 'slider' }}
        />
        <ButtonWrapper>
          <TextButton
            bgColor='white'
            color='green'
            text='완료'
            font='600 18px "SUIT"'
            onClickHandler={showCroppedImage}
          />
          <TextButton bgColor='white' color='red' text='취소' font='600 18px "SUIT"' onClickHandler={showCropper} />
        </ButtonWrapper>
      </Contoller>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const CropContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 120px;
`;

const Contoller = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 90%;
  transform: translateX(-50%);
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 6px 0px;
  width: 100%;
`;

export default Crop;
