// MoleculeSignupPopup.jsx
import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  SIGN_UP_EMAIL,
  IS_LOGIN_POPUP_OPEN,
  IS_MARKETING,
  IS_LOGGED_IN,
  USER_NAME,
  USER_EMAIL,
} from "../../../AtomStates";

import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";

const MoleculeSignupPopup = ({ onClose, email }) => {
  const navigate = useNavigate();
  const [, setSignUpEmail] = useAtom(SIGN_UP_EMAIL);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useAtom(IS_LOGIN_POPUP_OPEN);
  const [isMarketing, setIsMarketing] = useAtom(IS_MARKETING);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [userName, setUserName] = useAtom(USER_NAME);
  const [userEmail, setUserEmail] = useAtom(USER_EMAIL);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleResendEmail = async () => {
    try {
      const response = await fetch(
        "https://wishresearch.kr/resend-verification-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        alert("인증 이메일이 재발송되었습니다.");
      } else {
        const result = await response.json();
        if (result.error === "User with this email already exists.") {
          alert("이미 사용 중인 이메일 주소입니다.");
        } else {
          alert(result.error || "이메일 재발송 중 오류가 발생했습니다.");
        }
      }
    } catch (error) {
      alert("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  const handleGoToLogin = () => {
    if (isMarketing) {
      sessionStorage.clear(); // 세션 스토리지 모두 삭제
      setIsLoggedIn(false);
      setUserName("");
      setUserEmail("");
    }
    navigate("/Project");
    setSignUpEmail(""); // 이메일 상태를 초기화합니다.
    // setIsLoginPopupOpen(true);
  };

  return (
    <SignupPopupOverlay onClick={handleOverlayClick}>
      <PopupContent>
        <CloseButton onClick={onClose}>X</CloseButton>

        <span>
          <img src={images.CheckMark} alt="" />
        </span>
        <p>
          <strong>이메일 인증 후, 회원가입이 완료됩니다.</strong>
          <span>
            인증 메일이 발송되었습니다.
            <br />
            받지 못하셨다면, 스팸함 확인 또는 메일 재발송을 해주세요.
          </span>
        </p>

        <div className="btnWrap">
          <button type="button" onClick={handleResendEmail}>
            재발송하기
          </button>
          <a href="/Project" onClick={handleGoToLogin}>
            로그인 바로가기
          </a>
        </div>

        {/* 
        <Content>
          <Title>이메일 인증 후 이 완료됩니다.</Title>
          <Description>
            인증 메일은 <strong>{email}</strong>으로 발송했습니다. 메일에 기재된 링크를 클릭하여 인증을 완료해 주세요.<br />
            메일을 받지 못한 경우, 스팸편지함 확인 또는 아래 버튼을 클릭하여 재전송 해주세요.
          </Description>
          <ButtonGroup>
            <ActionButton onClick={handleGoToLogin}>로그인 화면 바로가기</ActionButton>
            <ActionButton onClick={handleResendEmail} primary>메일 재발송</ActionButton>
          </ButtonGroup>
        </Content> */}
      </PopupContent>
    </SignupPopupOverlay>
  );
};

export default MoleculeSignupPopup;

// Styled Components
const SignupPopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  text-align: center;
  padding: 45px 24px 24px;
  border-radius: 10px;
  background: ${palette.white};

  p {
    font-family: "Pretendard", "Poppins";
    font-size: 0.875rem;
    font-weight: 500;
    margin: 20px auto 24px;

    strong {
      font-weight: 500;
      display: block;
    }

    span {
      font-size: 0.75rem;
      font-weight: 400;
      color: #8c8c8c;
      display: block;
      margin-top: 8px;
    }
  }

  .btnWrap {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-top: 16px;
    border-top: 1px solid ${palette.lineGray};

    button {
      flex: 1;
      font-family: "Pretendard", "Poppins";
      color: ${palette.gray};
      font-weight: 600;
      font-size: 0.75rem;
      padding: 0;
      border: 0;
      background: none;

      &:last-child {
        color: ${palette.blue};
        background: none;
      }
    }
    a {
      flex: 1;
      font-family: "Pretendard", "Poppins";
      color: ${palette.gray};
      font-weight: 600;
      font-size: 0.75rem;
      padding: 0;
      border: 0;
      background: none;

      &:last-child {
        color: ${palette.blue};
        background: none;
      }
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 24px;
  top: 24px;
  width: 16px;
  font-family: "Pretendard", "Poppins";
  height: 16px;
  font-size: 0;
  padding: 11px;
  border: 0;
  background: none;

  &:before,
  &:after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 100%;
    border-radius: 10px;
    background: ${palette.black};
    content: "";
  }
  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const Content = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 40px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background: ${(props) => (props.primary ? "#000" : "#fff")};
  font-family: "Pretendard", "Poppins";
  color: ${(props) => (props.primary ? "#fff" : "#000")};
  font-weight: bold;

  &:hover {
    background: ${(props) => (props.primary ? "#333" : "#f7f7f7")};
  }
`;
