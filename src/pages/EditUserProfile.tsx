import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import ImgEditBtn from '../components/common/elem/btn/ImgEditBtn';

import InputBox from '../components/common/elem/InputBox';
import ProfileImg from '../components/common/elem/ProfileImg';
import TextButton from '../components/common/elem/TextButton';
import Crop from '../components/user/editUserProfile/imageCroper/Crop';
import ImageEdit from '../components/user/editUserProfile/ImageEdit';
import useUserProfileModify from '../hooks/useUserProfileModify';
import useUserProfileModifyInput from '../hooks/useUserProfileModifyInput';

import { userId, userProfile, userProfileCropImage } from '../recoil/userAtoms';

import RouteChangeTracker from '../shared/RouteChangeTracker';

const EditUserProfile = () => {
  RouteChangeTracker();
  const savedUserProfile = useRecoilValue(userProfile);
  const cropImageData = useRecoilValue(userProfileCropImage);
  const setCroppedImageData = useSetRecoilState(userProfileCropImage);

  useEffect(() => {
    if (!savedUserProfile) return;
    setCroppedImageData({ cropImage: savedUserProfile.image });
  }, []);

  console.log(cropImageData);

  const savedDescription = !savedUserProfile.description ? '' : savedUserProfile.description;

  const [showCropper, setShowCropper] = useState(false);

  const {
    ref,
    imgURL,
    nickname,
    description,
    uploadFile,
    croppedImg,
    handleUploadedImageChange,
    handleEditProfileImage,
    handleDescriptionChange,
    handleNicknameChange,
    // setCroppedAreaPixels,
  } = useUserProfileModifyInput({ profile: savedUserProfile, setShowCropper, setCroppedImageData });

  const { id } = useRecoilValue(userId);
  const { handleProfileModify } = useUserProfileModify({
    userId: id,
    userProfile: { image: imgURL, nickname: nickname, description: description },
  });

  return (
    <>
      {showCropper ? (
        <>
          <CropperWrapper>
            <Crop
              showCropper={() => setShowCropper(false)}
              profileImage={cropImageData.cropImage}
              // setCroppedAreaPixels={setCroppedAreaPixels}
            />
          </CropperWrapper>
        </>
      ) : (
        <Wrapper show={!showCropper}>
          <TopContent>
            <ProfileImgBox>
              <ProfileImg url={cropImageData.cropImage} size={85} />
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
                <ImgEditBtn btnSize={32} clickHandler={handleEditProfileImage} />
              </ImageUploaderButtonWrapper>
            </ProfileImgBox>
            <UserContentBox>
              <LabelBox>
                <Label>이름</Label>
                <InputBox
                  type='text'
                  placeholder='닉네임을 입력해주세요'
                  value={nickname}
                  onChangeHandler={handleNicknameChange}
                />
              </LabelBox>
              <LabelBox>
                <Label>소개</Label>
                <InputBox
                  type='text'
                  placeholder='내용을 입력해주세요'
                  value={description}
                  onChangeHandler={handleDescriptionChange}
                />
              </LabelBox>
            </UserContentBox>
          </TopContent>
          <TextButton
            text='프로필 수정 완료'
            onClickHandler={() => handleProfileModify(uploadFile)}
            isDisabled={
              nickname.length === 0 ||
              (nickname === savedUserProfile.nickname && description === savedDescription && !uploadFile)
            }
          />
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div<{ show: boolean }>`
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 44px);
  height: calc(100% - 40px);
  display: ${(props) => (props.show ? '' : 'none')};
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const ProfileImgBox = styled.div`
  width: 85px;
  height: 85px;
`;

const ProfileImgInputWrapper = styled.div`
  width: 0px;
  height: 0px;
  overflow: hidden;
`;

const ImageUploaderButtonWrapper = styled.div`
  position: relative;
  bottom: 35px;
  left: 55px;
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
  color: ${(props) => props.theme.gray600};
`;

const CropperWrapper = styled.div`
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 44px);
  height: calc(100% - 40px);
`;

export default EditUserProfile;
