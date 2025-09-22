//작업관리/ 프로젝트 리스트
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { palette } from "../../../../assets/styles/Palette";
import OrganismIncNavigation from "../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../Global/molecules/MoleculeHeader";
import MoleculeAccountPopup from "../../../Login_Sign/components/molecules/MoleculeAccountPopup";
import PopupWrap from "../../../../assets/styles/Popup";
import {
  CustomTextarea,
} from "../../../../assets/styles/InputStyle";
import {
  IS_LOGGED_IN,
  USER_NAME,
  USER_EMAIL,
  USER_CREDIT_DATA,
  USER_MEMBERSHIP,
  IS_SOCIAL_LOGGED_IN,
  ADMIN_STATE,
  EDUCATION_STATE,
} from "../../../AtomStates";
import {
  ButtonGroup,
  Button,
  IconButton,
} from "../../../../assets/styles/ButtonStyle";
import {
  ContentsWrap,
  MainContent,
  ToggleBox,
  ToggleList,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../assets/styles/Images";
import {
  H2,
  H4,
  H5,
  Body2,
  Body3,
  Sub3,
  Caption2,
  InputText,
} from "../../../../assets/styles/Typography";
import axios from "axios";
import { unixDay } from "d3";

const PageMyProfile = () => {
  const navigate = useNavigate();
  const [educationState, setEducationState] = useAtom(EDUCATION_STATE);
  const [userMembership, setUserMembership] = useAtom(USER_MEMBERSHIP);
  const [adminState, setAdminState] = useAtom(ADMIN_STATE);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [isSocialLoggedIn, setIsSocialLoggedIn] = useAtom(IS_SOCIAL_LOGGED_IN);
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isAccountPopupOpen, setAccountPopupOpen] = useState(false); // 계정설정 팝업
  const [isMemberDeletePopupOpen, setIsMemberDeletePopupOpen] = useState(false); // 회원탈퇴 팝업
  const [memberDeleteForm, setMemberDeleteForm] = useState({
    reason: "",
  });

  const [userName, setUserName] = useAtom(USER_NAME); // 아톰에서 유저 이름 불러오기
  const [userEmail, setUserEmail] = useAtom(USER_EMAIL); // 아톰에서 유저 이메일 불러오기
  const handleAccountClick = () => {
    setAccountPopupOpen(true); // 계정설정 팝업 열기
  };

  const closeAccountPopup = () => {
    setAccountPopupOpen(false); // 계정설정 팝업 닫기
  };

  const closeServiceMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsServiceMenuOpen(false);
      setIsClosing(false);
    }, 300); // 애니메이션 시간과 동일하게 설정
  };




  const closeMemberDeletePopup = () => {
    setIsMemberDeletePopupOpen(false);
  };



  const handleMemberDeleteInputChange = (field, value) => {
    setMemberDeleteForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };



  const isMemberDeleteFormValid = () => {
    return memberDeleteForm.reason;
  };

  const token = sessionStorage.getItem("accessToken");

  const axiosConfig = {
    timeout: 100000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  };



  const handleMemberDeleteSubmit = async () => {
    if (isMemberDeleteFormValid()) {
      // TODO: 회원탈퇴 제출 로직 구현
      try {
        const response = await axios.post(
          "https://wishresearch.kr/api/user/leave/",
          {
            leave_comment: memberDeleteForm.reason,
          },
          axiosConfig
        );
        closeMemberDeletePopup();

        let url_address = "/";
        if (educationState) {
          const educationLandingUrl = sessionStorage.getItem(
            "educationLandingUrl"
          );
          url_address = `/${educationLandingUrl}`;
        }
        // sessionStorage.removeItem("accessToken"); // 세션 스토리지에서 토큰 삭제
        // sessionStorage.removeItem("userName");
        // sessionStorage.removeItem("userEmail");
        // sessionStorage.removeItem("isSocialLogin");
        // localStorage.removeItem("userName");
        // localStorage.removeItem("userEmail");
        sessionStorage.clear(); // 세션 스토리지 모두 삭제
        setIsLoggedIn(false);
        setIsSocialLoggedIn(false);
        setUserName("");
        setUserEmail("");
        window.location.href = url_address; // 페이지 이동
      } catch (error) {
        // console.error("회원탈퇴 제출 실패:", error);
      }
    }
  };



  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide>
          <MyProfileWrap>
            <MyProfileHeader>
              <H2 color="gray800" align="left">
                내 프로필
              </H2>

              <ButtonGroup>
                {adminState === true ? (
                  <>
                    <Button Primary onClick={() => navigate("/Project")}>
                      <images.CoinSmall
                        width="12px"
                        height="8px"
                        color={palette.primary}
                      />
                      <Sub3 color="primary">SaaS 프로젝트</Sub3>
                    </Button>
                    <Button
                      Primary
                      onClick={() => navigate("/AIDesignEvaluationSystem")}
                    >
                      <images.CoinSmall
                        width="12px"
                        height="8px"
                        color={palette.primary}
                      />
                      <Sub3 color="primary">AI 디자인 평가 시스템</Sub3>
                    </Button>
                    <Button Primary onClick={() => navigate("/DesignLens")}>
                      <images.CoinSmall
                        width="12px"
                        height="8px"
                        color={palette.primary}
                      />
                      <Sub3 color="primary">디자인 렌즈</Sub3>
                    </Button>
                  </>
                ) : null}

                <div style={{ position: "relative" }}>
                  <Button
                    Primary
                    onClick={() => {
                      if (isServiceMenuOpen) {
                        closeServiceMenu();
                      } else {
                        setIsServiceMenuOpen(true);
                      }
                    }}
                  >
                    <img src={images.Headset} alt="고객 서비스" />
                    <Sub3 color="primary">고객 서비스</Sub3>
                  </Button>

                  {(isServiceMenuOpen || isClosing) && (
                    <ToggleBox $isClosing={isClosing}>
                      <Body3>고객 서비스</Body3>
                      <ToggleList>
                        <IconButton onClick={() => navigate("/Terms")}>
                          <img src={images.ExclamationCircle} alt="이용약관" />
                          <Sub3 color="gray700">이용약관</Sub3>
                        </IconButton>
                        <IconButton onClick={() => navigate("/Policy")}>
                          <img src={images.Lock} alt="개인정보 이용 정책" />
                          <Sub3 color="gray700">개인정보 이용 정책</Sub3>
                        </IconButton>
                      </ToggleList>
                    </ToggleBox>
                  )}
                </div>
              </ButtonGroup>
            </MyProfileHeader>

            <ProfileInfoWrap>
              <ProfileInfo>
                <div className="thumb">
                  <img src={images.NoUserThumb} alt="" />
                </div>
                <div className="text">
                  <div className="name">
                    <H4 color="gray800">{userName}</H4>
                    {userMembership === "Normal" ? (
                      <Grade General />
                    ) : (
                      <Grade />
                    )}
                  </div>
                  {sessionStorage.getItem("userCreatedAt") !== undefined && (
                    <Caption2 color="gray500" align="left">
                      가입 날짜{" "}
                      {sessionStorage.getItem("userCreatedAt").split("T")[0]}
                    </Caption2>
                  )}
                </div>
              </ProfileInfo>

              <Button Large Outline Round onClick={() => navigate("/Payment")}>
                <images.CoinSmall
                  width="12px"
                  height="8"
                  color={palette.gray800}
                />
                <InputText>크레딧 충전</InputText>
              </Button>
            </ProfileInfoWrap>

            <ProfileInfoWrap column>
              <ProfileTitle>
                <Body2>사용자 정보</Body2>
              </ProfileTitle>

              <ProfileContent>
                <ProfileContentItem>
                  <div>
                    <Sub3 color="gray500">이름 (Name)</Sub3>
                    <Sub3 color="gray800">{userName}</Sub3>
                  </div>
                  <div>
                    <Sub3 color="gray500">이메일 주소 (E-mail adress)</Sub3>
                    <Sub3 color="gray800">{userEmail}</Sub3>
                  </div>
                </ProfileContentItem>

                <ProfileContentItem>
                  <div>
                    <Sub3 color="gray500">요금제 </Sub3>
                    <Sub3 color="gray800">
                      {userMembership === "Normal"
                        ? "일반 사용자"
                        : "구독 사용자"}
                    </Sub3>
                  </div>
                </ProfileContentItem>
              </ProfileContent>
            </ProfileInfoWrap>

            <ProfileInfoWrap column>
              <ProfileTitle>
                <Button Large Outline Round onClick={handleAccountClick}>
                  <img src={images.Repeat} alt="" />
                  <InputText>비밀번호 변경</InputText>
                </Button>
              </ProfileTitle>
            </ProfileInfoWrap>

            <WithdrawalButton onClick={() => setIsMemberDeletePopupOpen(true)}>
              <Sub3 color="gray500">회원 탈퇴하기</Sub3>
            </WithdrawalButton>
          </MyProfileWrap>
        </MainContent>
      </ContentsWrap>

      {isAccountPopupOpen && (
        <MoleculeAccountPopup onClose={closeAccountPopup} />
      )}
      {isMemberDeletePopupOpen && (
        <PopupWrap
          TitleFlex
          TitleBorder
          Wide
          title="회원탈퇴"
          buttonType="Fill"
          confirmText="이 버튼을 누르면, 바로 탈퇴가 진행됩니다."
          isModal={true}
          onClose={closeMemberDeletePopup}
          onCancel={closeMemberDeletePopup}
          onConfirm={handleMemberDeleteSubmit}
          isFormValid={isMemberDeleteFormValid()}
          body={
            <>
              <ContactUsWrap>
                <div>
                  <H5 color="gray800" align="left">
                    더 나은 서비스를 위해, 탈퇴하시는 이유를 간단히 알려주세요
                  </H5>
                  <CustomTextarea
                    placeholder={"탈퇴하시는 이유를 설명해주세요"}
                    rows="8"
                    value={memberDeleteForm.reason}
                    onChange={(e) =>
                      handleMemberDeleteInputChange("reason", e.target.value)
                    }
                  />
                </div>{" "}
                <BgBoxItem NoOutline style={{ marginBottom: "10px" }}>
                  <Sub3 color="gray500" align="left">
                    🚩 탈퇴 시, 주의사항 안내
                    <br /> - 회원 탈퇴 시, 생성된 모든 데이터가 영구적으로
                    삭제됩니다.
                    <br /> - 보유하신 크레딧 역시 함께 삭제되며, 복구가
                    불가능합니다.
                    <br /> - 탈퇴 후에는 계정 및 관련 데이터 복원이 불가능하니
                    신중하게 결정해 주세요.
                    <br /> - 삭제된 데이터는 서비스 이용 기록, 설정 정보 등을
                    포함할 수 있습니다.
                    <br /> - 궁금한 점이 있으시면 고객센터로 문의해 주세요.
                  </Sub3>
                </BgBoxItem>
              </ContactUsWrap>
            </>
          }
        />
      )}
    </>
  );
};

export default PageMyProfile;

const ContactUsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid ${palette.outlineGray};

  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
`;

const MyProfileWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 50px auto;
`;

const MyProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileInfoWrap = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  justify-content: space-between;
  align-items: ${(props) => (props.column ? "flex-start" : "center")};
  gap: 9px;
  padding-top: 32px;
  border-top: 1px solid ${palette.outlineGray};
`;

const ProfileInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;

  .thumb {
    flex-shrink: 0;
    width: 64px;
    height: 64px;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .text {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 4px;
  }

  .name {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
  }

  .date {
    font-size: 0.875rem;
    color: ${palette.gray500};
  }
`;

const ProfileTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ProfileContent = styled.div`
  display: flex;
  width: 100%;
`;

const ProfileContentItem = styled.div`
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

const Grade = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  border-radius: 5px;
  background: ${(props) =>
    props.General ? palette.primaryLightest : palette.primary};

  &:before {
    font-size: 0.88rem;
    font-weight: 400;
    line-height: 1.55;
    letter-spacing: -0.42px;
    color: ${(props) => (props.General ? palette.primary : palette.white)};
    content: "${(props) => (props.General ? "일반" : "구독")}";
  }
`;

const WithdrawalButton = styled.div`
  position: fixed;
  bottom: 50px;
  display: flex;

  justify-content: flex-start;
  align-items: flex-end;
  margin-top: 68px;
  cursor: pointer;
`;

export const BgBoxItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  width: 100%;
  padding: ${(props) => (props.NoOutline ? "12px" : "8px 12px")};
  border-radius: 10px;
  border: ${(props) =>
    props.NoOutline ? "0" : `1px solid ${palette.outlineGray}`};
  background: ${(props) => (props.white ? palette.white : palette.chatGray)};
`;
