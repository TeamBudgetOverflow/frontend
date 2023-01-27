import React, { useRef, useState } from 'react';

import { IUserProfile } from '../interfaces/interfaces';

const useUserProfileEditData = ({ profile }: { profile: IUserProfile }) => {
  const ref = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState<string>(profile.image);
  const [profileNickName, setProfileNickName] = useState<string>(profile.nickname);
  const [profileDesc, setProfileDesc] = useState<string>(profile.description);
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
    setProfileImage(imageSrc);
  };

  const handleEditProfileImage = () => {
    if (!ref.current) return;
    ref.current.click();
  };

  const handleUserNickNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setProfileNickName(e.currentTarget.value);
  };

  const handleUserDescChange = (e: React.FormEvent<HTMLInputElement>) => {
    setProfileDesc(e.currentTarget.value);
  };

  return {
    ref,
    profileImage,
    profileNickName,
    profileDesc,
    uploadFile,
    handleUploadedImageChange,
    handleEditProfileImage,
    handleUserNickNameChange,
    handleUserDescChange,
  };
};

export default useUserProfileEditData;
