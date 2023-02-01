import React, { useRef, useState } from 'react';

import { IUserProfile } from '../interfaces/interfaces';

const useUserProfileModifyInput = ({ profile }: { profile: IUserProfile }) => {
  const ref = useRef<HTMLInputElement>(null);

  const [imgURL, setImgURL] = useState<string>(profile.image);
  const [nickname, setNickname] = useState<string>(profile.nickname);
  const [description, setDescription] = useState<string>(profile.description);
  const [uploadFile, setUploadFile] = useState<File>();

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

    const imageSrc = URL.createObjectURL(uploadedFile);
    setUploadFile(uploadedFile);
    setImgURL(imageSrc);
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

  return {
    ref,
    imgURL,
    nickname,
    description,
    uploadFile,
    handleUploadedImageChange,
    handleEditProfileImage,
    handleNicknameChange,
    handleDescriptionChange,
  };
};

export default useUserProfileModifyInput;
