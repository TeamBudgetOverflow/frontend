import React, { useRef, useState, SetStateAction, Dispatch } from 'react';
import { Area } from 'react-easy-crop/types';
import { SetterOrUpdater } from 'recoil';

import { IUserProfile } from '../interfaces/interfaces';

interface UseUserProfileModifyInputParams {
  profile: IUserProfile;
  setShowCropper: Dispatch<SetStateAction<boolean>>;
  setCroppedImageData: SetterOrUpdater<{ cropImage: string }>;
}

const useUserProfileModifyInput = ({
  profile,
  setShowCropper,
  setCroppedImageData,
}: UseUserProfileModifyInputParams) => {
  const ref = useRef<HTMLInputElement>(null);

  const [imgURL, setImgURL] = useState<string>(profile.image);
  const [nickname, setNickname] = useState<string>(profile.nickname);
  const [description, setDescription] = useState<string>(profile.description);
  const [uploadFile, setUploadFile] = useState<File>();
  const [croppedImg, setCroppedImg] = useState<string>(profile.image);

  // const [croppedImage, setCroppedImage] = useState<void>();
  // const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({ width: 0, height: 0, x: 0, y: 0 });
  // console.log(croppedAreaPixels);

  const handleUploadedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const uploadedFile = e.target.files[0];

    if (uploadedFile?.type.indexOf('image/') === -1) {
      alert('이미지를 첨부해주세요!');
      return;
    }
    if (uploadedFile.size / (1024 * 1024) >= 4) {
      alert('이미지가 너무 큽니다.');
      return;
    }
    const imageUrl = URL.createObjectURL(uploadedFile);
    setShowCropper(true);
    setCroppedImageData({ cropImage: imageUrl });
    // console.log(uploadedFile);

    // const img = document.getElementById('myimg');
    // img.src = imageUrl;
    // img.onload = function() {
    //   URL.revokeObjectURL(img.src);
    // }

    // const imageSrc = URL.createObjectURL(croppedImage);
    // setUploadFile(uploadedFile);
    // setCroppedImg(imageSrc);
    // setImgURL(imageSrc);
  };

  const handleEditProfileImage = () => {
    if (!ref.current) return;
    ref.current.click();
  };

  const handleNicknameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNickname(e.currentTarget.value);
  };

  const handleDescriptionChange = (e: React.FormEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };

  // const handleShowCropper = () => {
  //   setShowCropper(false);
  // };

  return {
    ref,
    imgURL,
    nickname,
    description,
    uploadFile,
    croppedImg,
    handleUploadedImageChange,
    handleEditProfileImage,
    handleNicknameChange,
    handleDescriptionChange,
    setUploadFile,
  };
};

export default useUserProfileModifyInput;
