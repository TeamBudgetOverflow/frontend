import React, { useRef, useState, SetStateAction, Dispatch } from 'react';
import { SetterOrUpdater } from 'recoil';

import { IUserProfile } from '../interfaces/interfaces';

import { readFile } from '../utils/imageCropper';

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

  const [nickname, setNickname] = useState<string>(profile.nickname);
  const [description, setDescription] = useState<string>(profile.description);

  const handleUploadedImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const imageDataUrl = await readFile(uploadedFile);

    setShowCropper(true);
    setCroppedImageData({ cropImage: imageDataUrl as string });
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
    nickname,
    description,
    handleUploadedImageChange,
    handleEditProfileImage,
    handleNicknameChange,
    handleDescriptionChange,
  };
};

export default useUserProfileModifyInput;
