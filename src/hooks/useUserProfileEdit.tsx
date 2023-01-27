import AWS from 'aws-sdk';
import { useMutation } from 'react-query';
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

  const { mutate } = useMutation<IUserProfile>(
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
        console.log(e);
        alert('프로필 수정에 실패하였습니다.');
        if (e === 401) {
          navigate('/', { replace: true });
        }
      },
    }
  );

  const handleEditProfileSubmit = () => {
    const region = process.env.REACT_APP_S3_REGION;
    const s3Bucket = process.env.REACT_APP_S3_BUCKET_NAME;

    AWS.config.update({
      region: region,
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_KEY,
    });

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: s3Bucket as string,
        Body: uploadFile,
        ContentType: uploadFile.type,
        Key: 'data/profile/' + getUserId + '.' + uploadFile.name.split('.').pop(),
      },
    });

    upload
      .promise()
      .then((res) => {
        console.log(res.Location);
        setUploadImage(res.Location);
        setTimeout(() => mutate(), 500);
      })
      .catch((e) => {
        console.log(e);
        alert('이미지 등록에 실패하였습니다.');
      });
  };

  return { handleEditProfileSubmit };
};

export default useUserProfileEdit;
