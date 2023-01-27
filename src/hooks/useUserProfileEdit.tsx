import AWS from 'aws-sdk';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { IUserProfile } from '../interfaces/interfaces';

import { userAPI } from '../apis/client';
import { useState } from 'react';

const useUserProfileEdit = ({
  uploadFile,
  getUserId,
  userProfile,
}: {
  uploadFile: File;
  getUserId: number;
  userProfile: IUserProfile;
}) => {
  const navigate = useNavigate();

  const [uploadImage, setUploadImage] = useState<string>(userProfile.image);

  const { mutate: profileUpdate } = useMutation<IUserProfile>(
    'postEditUserProfile',
    () =>
      userAPI.patchEditUserProfile(getUserId, {
        image: uploadImage,
        nickname: userProfile.nickname,
        description: userProfile.description,
      }),
    {
      onSuccess: () => {
        setTimeout(() => navigate(`/users/${getUserId}`, { replace: true }), 500);
      },
      onError: (e) => {
        alert('프로필 수정에 실패하였습니다.');
        if (e === 401) {
          navigate('/', { replace: true });
        }
      },
    }
  );

  const { mutate: ImageUpdate, data } = useMutation(
    'postProfileImageS3',
    () => userAPI.postProfileImageS3(uploadFile, getUserId),
    {
      onSuccess: (data) => {
        console.log(data);
        // setUploadImage(data);
        setTimeout(() => profileUpdate(), 500);
      },
      onError: () => {
        alert('프로필 사진이 업로드되지 않았습니다.');
      },
    }
  );

  const handleEditProfileSubmit = () => {
    ImageUpdate();
  };

  return { handleEditProfileSubmit };
};

export default useUserProfileEdit;
