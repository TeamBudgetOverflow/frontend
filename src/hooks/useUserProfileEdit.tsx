import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import AWS from 'aws-sdk';

import { IUserProfile } from '../interfaces/interfaces';

import { userAPI } from '../apis/client';

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

  const handleEditProfileSubmit = () => {
    AWS.config.update({
      region: process.env.REACT_APP_S3_REGION,
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_KEY,
    });

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: process.env.REACT_APP_S3_BUCKET_NAME as string,
        Body: uploadFile,
        ContentType: uploadFile.type,
        Key: 'data/profile/' + getUserId + '.' + uploadFile.name.split('.').pop(),
      },
    });

    upload
      .promise()
      .then((data) => {
        setUploadImage(data.Location);
        setTimeout(() => profileUpdate(), 500);
        return;
      })
      .catch(() => {
        alert('프로필 사진이 업로드되지 않았습니다.');
        return;
      });
  };

  return { handleEditProfileSubmit };
};

export default useUserProfileEdit;
