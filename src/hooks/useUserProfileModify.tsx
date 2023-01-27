import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import AWS from 'aws-sdk';

import { IUpdateUserProfile } from '../interfaces/interfaces';

import { userAPI } from '../apis/client';

const useUserProfileModify = ({ userId, userProfile }: IUpdateUserProfile) => {
  const [imgURL, setImgURL] = useState<string>('');
  const navigate = useNavigate();
  const { mutate: profileUpdate } = useMutation<unknown, unknown, IUpdateUserProfile>(
    'postEditUserProfile',
    userAPI.patchEditUserProfile,
    {
      onSuccess: () => {
        setTimeout(() => navigate(`/users/${userId}`, { replace: true }), 500);
      },
      onError: (e) => {
        alert('프로필 수정에 실패하였습니다.');
        if (e === 401) {
          navigate('/', { replace: true });
        }
      },
    }
  );

  const handleProfileModify = (uploadFile?: File) => {
    if (uploadFile) {
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
          Key: 'data/profile/' + userId + '.' + uploadFile.name.split('.').pop(),
        },
      });

      upload
        .promise()
        .then((data) => {
          setImgURL(data.Location);
          profileUpdate({
            userId,
            userProfile: { ...userProfile, image: uploadFile ? data.Location : userProfile.image },
          });
          return;
        })
        .catch(() => {
          alert('프로필 사진이 업로드되지 않았습니다.');
          return;
        });

      return;
    }

    profileUpdate({ userId, userProfile });
  };

  return { imgURL, handleProfileModify };
};

export default useUserProfileModify;
