import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import Slider from '@mui/material/Slider/Slider';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import TextButton from '../../../common/elem/TextButton';
import getCroppedImg from '../../../../utils/imageCropper';
import { useSetRecoilState } from 'recoil';
import { userProfileCropImage } from '../../../../recoil/userAtoms';

interface CropProps {
  showCropper: () => void;
  // setCroppedAreaPixels: (e: Area) => void;
  profileImage: string;
}

const Crop = ({ showCropper, profileImage }: CropProps) => {
  const setCroppedImageData = useSetRecoilState(userProfileCropImage);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  console.log();

  const onCropComplete = useCallback((croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // const blobToFile = (theBlob: Blob, fileName: string): File => {
  //   const blobData: any = theBlob;
  //   //A Blob() is almost a File() - it's just missing the two properties below which we will add
  //   blobData.lastModifiedDate = new Date();
  //   blobData.name = fileName;

  //   //Cast to a File() type
  //   return blobData as File;
  // };

  // var myBlob = new Blob();

  // //do stuff here to give the blob some data...

  // var myFile = blobToFile(myBlob, "my-image.png");e

  console.log(profileImage);

  const showCroppedImage = useCallback(async () => {
    try {
      const cropCompletedImage: any = await getCroppedImg(profileImage, croppedAreaPixels);

      console.log(cropCompletedImage);
      // const file = new File();
      setCroppedImageData({ cropImage: cropCompletedImage });
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
  height: 80px;
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
