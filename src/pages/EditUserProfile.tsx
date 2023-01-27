import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/common/elem/Button';
import Icon from '../components/common/elem/Icon';
import InputBox from '../components/common/elem/InputBox';
import ProfileImg from '../components/common/elem/ProfileImg';
import TextButton from '../components/common/elem/TextButton';

import useUserProfileData from '../hooks/useUserProfileData';
import useUserProfileEdit from '../hooks/useUserProfileEdit';

const EditUserProfile = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { id } = useParams();

  const { isLoading, isError, profile } = useUserProfileData({ getUserId: Number(id) });

  const [initialProfileImage, setInitialProfileImage] = useState<string>('');
  const [initialUserNickName, setInitialUserNickName] = useState<string>('홍길동');
  const [initialUserDesc, setInitialUserDesc] = useState<string>('아버지를 아버지라 부르지 못하고');
  const [uploadFile, setUploadFile] = useState<File>();

  useEffect(() => {
    if (isLoading && !profile) return;
    if (isError || !profile) return;

    setInitialProfileImage(profile.image);
    setInitialUserNickName(profile.nickname);
    setInitialUserDesc(profile.description);
  }, [profile]);

  const handleUploadedImageChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    setInitialProfileImage(imageSrc);
  };

  const handleEditProfileImage = () => {
    if (!ref.current) return;
    ref.current.click();
  };

  const handleUserNickNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInitialUserNickName(e.currentTarget.value);
  };

  const handleUserDescChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInitialUserDesc(e.currentTarget.value);
  };

  const { handleEditProfileSubmit } = useUserProfileEdit({
    uploadFile: uploadFile as File,
    getUserId: Number(id),
    userProfile: { image: initialProfileImage, nickname: initialUserNickName, description: initialUserDesc },
  });

  return (
    <Wrapper>
      <TopContent>
        <ProfileImgBox>
          <ProfileImg url={initialProfileImage} size={85} />
          <ProfileImgInputWrapper>
            <input
              ref={ref}
              type='file'
              name='profileImage'
              accept='image/jpeg, image/jpg, image/png image/gif'
              onChange={handleUploadedImageChange}
            />
          </ProfileImgInputWrapper>
          <ImageUploaderButtonWrapper>
            <Button borderRadius='50%' width='32px' height='32px' background='#E4E4E4' onClick={handleEditProfileImage}>
              <Icon
                width={18}
                height={18}
                color={'black'}
                path={
                  'M0 15.4601V18.5001C0 18.7801 0.22 19.0001 0.5 19.0001H3.54C3.67 19.0001 3.8 18.9501 3.89 18.8501L14.81 7.94006L11.06 4.19006L0.15 15.1001C0.0500001 15.2001 0 15.3201 0 15.4601ZM17.71 5.04006C18.1 4.65006 18.1 4.02006 17.71 3.63006L15.37 1.29006C14.98 0.900059 14.35 0.900059 13.96 1.29006L12.13 3.12006L15.88 6.87006L17.71 5.04006Z'
                }
              />
            </Button>
          </ImageUploaderButtonWrapper>
        </ProfileImgBox>
      </TopContent>
      <MiddleWrapper>
        <UserContentBox>
          <LabelBox>
            <Label>이름</Label>
            <InputBox type='text' placeholder={initialUserNickName} onChangeHandler={handleUserNickNameChange} />
          </LabelBox>
          <LabelBox>
            <Label>소개</Label>
            <InputBox type='text' placeholder={initialUserDesc} onChangeHandler={handleUserDescChange} />
          </LabelBox>
        </UserContentBox>
        <SubmitButtonWrapper>
          <TextButton text='프로필 수정 완료' onClickHandler={handleEditProfileSubmit} />
        </SubmitButtonWrapper>
      </MiddleWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 15%;
`;

const MiddleWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ProfileImgBox = styled.div`
  width: 85px;
  height: 85px;
`;

const ProfileImgInputWrapper = styled.div`
  height: 0px;
  overflow: hidden;
  width: 0px;
`;

const ImageUploaderButtonWrapper = styled.div`
  position: relative;
  bottom: 40px;
  left: 50px;
  z-index: 2;
`;

const UserContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 20px;
`;

const LabelBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
`;

const Label = styled.div`
  font: ${(props) => props.theme.captionC1};
`;

const SubmitButtonWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0px;
  padding: 20px 22px;
`;

export default EditUserProfile;
