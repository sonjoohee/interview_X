import React, { useState } from "react";
import styled, { css, ThemeProvider } from "styled-components";
import theme from "../../../../../assets/styles/Theme";
import { useAtom } from "jotai";
import {
  CONVERSATION,
  ERROR_STATUS,
  SIGN_UP_NAME,
  EMAIL,
  SIGN_UP_EMAIL,
  SIGN_UP_PASSWORD,
  CONFIRM_PASSWORD,
  IS_LOGGED_IN,
  IS_LOGIN_POPUP_OPEN,
  IS_SIGNUP_POPUP_OPEN,
} from "../../../../AtomStates";

import { useNavigate } from "react-router-dom";
import { useSaveConversation } from "../../atoms/AtomSaveConversation";
import MoleculeSignPopup from "../../../../Login_Sign/components/molecules/MoleculeSignPopup";
import MoleculeLoginPopup from "../../../../Login_Sign/components/molecules/MoleculeLoginPopup";
import { palette } from "../../../../../assets/styles/Palette";
import images from "../../../../../assets/styles/Images";

const MoleculeMarketingSignUpButton = () => {
  const navigate = useNavigate();
  const { saveConversation } = useSaveConversation();

  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [, setErrorStatus] = useAtom(ERROR_STATUS);
  const [, setSignUpName] = useAtom(SIGN_UP_NAME);
  const [, setEmail] = useAtom(EMAIL);
  const [, setSignupEmail] = useAtom(SIGN_UP_EMAIL);
  const [, setPassword] = useState("");
  const [, setSignupPassword] = useAtom(SIGN_UP_PASSWORD);
  const [, setConfirmPassword] = useAtom(CONFIRM_PASSWORD);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);

  const [isSignPopupOpen, setIsSignPopupOpen] = useAtom(IS_SIGNUP_POPUP_OPEN);
  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useAtom(IS_LOGIN_POPUP_OPEN);

  const closeSignPopup = () => {
    setIsSignPopupOpen(false);
    setErrorStatus("");
    setSignUpName("");
    setEmail("");
    setSignupEmail("");
    setPassword("");
    setSignupPassword("");
    setConfirmPassword("");
  };

  const closeLoginPopup = () => {
    setIsLoginPopupOpen(false);
  };

  const handleExitChatCancel = () => {
    setIsExitPopupOpen(false);
  };

  const handleExitChatCancel2 = () => {
    setIsExitPopupOpen(false);
    setIsSignPopupOpen(true);
  };

  const [showMobileWarning, setShowMobileWarning] = useState(false);

  const isIOSDevice = () => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAppleDevice = navigator.userAgent.includes("Macintosh");
    const isTouchScreen = navigator.maxTouchPoints >= 1; // iOS 13 이상 체크

    return isIOS || (isAppleDevice && isTouchScreen);
  };

  // 모바일 감지 함수 추가
  const isMobileDevice = () => {
    if (isIOSDevice()) {
      return true;
    }
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  };

  const handleMobileWarningConfirm = () => {
    setShowMobileWarning(false);
    navigate("/Project");
  };

  const handleNavigateToMain = () => {
    if (isMobileDevice()) {
      setShowMobileWarning(true);
    } else {
      navigate("/Project");
    }
  };

  const handleExitChatConfirm = () => {
    const updatedConversation = [...conversation];

    if (
      updatedConversation.length > 0 &&
      updatedConversation[updatedConversation.length - 1].type ===
        "marketingSignUpButton"
    ) {
      updatedConversation.pop();
      updatedConversation.pop();
    }

    setConversation(updatedConversation);
    saveConversation({
      changingConversation: { conversation: updatedConversation },
    });

    window.location.href = "/MarketingLanding";
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <SelectButton>
          {!isLoggedIn ? (
            <>
              <button onClick={() => setIsSignPopupOpen(true)}>
                회원가입하고 대화내용 평생 간직 💌
              </button>
              <button
                className="finish"
                onClick={() => setIsExitPopupOpen(true)}
              >
                저장하지 않고 종료하기 😱
              </button>
            </>
          ) : (
            <>
              <button onClick={handleNavigateToMain}>
                메인 페이지로 돌아가기
              </button>
            </>
          )}
        </SelectButton>
        {isSignPopupOpen && <MoleculeSignPopup onClose={closeSignPopup} />}
        {isLoginPopupOpen && <MoleculeLoginPopup onClose={closeLoginPopup} />}
        {isExitPopupOpen && (
          <Popup Cancel>
            <div>
              <button
                type="button"
                className="closePopup"
                onClick={handleExitChatCancel}
              >
                닫기
              </button>
              <span>
                <img src={images.ExclamationMarkRed} alt="" />
              </span>
              <p>
                <strong>정말 종료하시겠습니까?</strong>
                <span>
                  종료 또는 새로고침 할 경우, 모든 대화내역이 사라집니다.
                </span>
              </p>
              <div className="btnWrap">
                <button type="button" onClick={handleExitChatCancel2}>
                  대화를 저장할래요
                </button>
                <button type="button" onClick={handleExitChatConfirm}>
                  종료할게요
                </button>
              </div>
            </div>
          </Popup>
        )}
        {showMobileWarning && (
          <Popup Cancel>
            <div>
              <button
                type="button"
                className="closePopup"
                onClick={() => setShowMobileWarning(false)}
              >
                닫기
              </button>
              <span>
                <img src={images.ExclamationMark} alt="" />
              </span>
              <p>
                <strong>본 서비스는 웹 전용으로 운영되고 있습니다.</strong>
                <span>웹에서 최적의 작업을 진행하세요</span>
              </p>
              <div className="btnWrap">
                <button type="button" onClick={handleMobileWarningConfirm}>
                  확인
                </button>
              </div>
            </div>
          </Popup>
        )}
      </ThemeProvider>
    </>
  );
};

export default MoleculeMarketingSignUpButton;

const SelectButton = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  margin-left: 50px;

  button {
    // display:inline-block;
    // width:fit-content;
    font-family: "Pretendard", "Poppins";
    font-size: 0.88rem;
    color: ${palette.primary};
    padding: 8px 20px;
    border-radius: 40px;
    border: 0;
    background: rgba(4, 83, 244, 0.1);
  }

  .finish {
    color: ${palette.gray500};
    background: ${palette.gray100};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left: 0;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
  z-index: 9999;

  .closePopup {
    position: absolute;
    right: 24px;
    top: 24px;
    width: 16px;
    height: 16px;
    font-size: 0;
    padding: 9px;
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
      background: ${palette.gray500};
      content: "";
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    text-align: center;
    // overflow:hidden;
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
        font-size: 0.75rem !important;
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

      button {
        flex: 1;
        font-family: "Pretendard", "Poppins";
        font-size: 0.875rem;
        font-weight: 600;
        color: ${palette.blue};
        padding: 12px 20px;
        border-radius: 12px;
        border: 1px solid ${palette.blue};
        background: ${palette.white};

        // &:last-child {
        //   color: ${palette.white};
        //   background: ${palette.blue};
        // }
      }
    }

    ${(props) =>
      props.Cancel &&
      css`
        p {
          strong {
            font-weight: 600;
            display: block;
            color: ${palette.gray800};
          }
          span {
            font-size: 1rem;
            display: block;
            margin-top: 8px;
          }
        }

        .btnWrap {
          padding-top: 16px;
          border-top: 1px solid ${palette.lineGray};

          button {
            color: ${palette.gray700};
            font-weight: 400;
            padding: 0;
            border: 0;
            background: none;
          }
        }
      `}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    > div {
      width: 90%;
    }
  }
`;
