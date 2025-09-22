import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import MoleculeAccount from "./MoleculeAccount";
import { useAtom } from "jotai";
import { palette } from "../../../../assets/styles/Palette";
import {
  PASSWORD,
  NEW_PASSWORD,
  RE_PASSWORD,
} from "../../../../pages/AtomStates";
import images from "../../../../assets/styles/Images";

const MoleculeAccountPopup = ({ onClose = () => {} }) => {
  const [, setPassword] = useAtom(PASSWORD);
  const [, setNewPassword] = useAtom(NEW_PASSWORD);
  const [, setRePassword] = useAtom(RE_PASSWORD);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태 관리

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      resetPasswordState();
      onClose();
    }
  };

  const resetPasswordState = () => {
    setPassword("");
    setNewPassword("");
    setRePassword("");
  };

  const handleClose = () => {
    resetPasswordState(); // 팝업 닫을 때 상태 초기화
    onClose(); // 팝업 닫기 함수 호출
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true); // 비밀번호 변경 성공 시 팝업 열기
  };

  return (
    <>
      {!isPopupOpen ? ( // 팝업이 열려있지 않으면 렌더링
        <AccountPopupOverlay onClick={handleOverlayClick}>
          <PopupContent>
            <CloseButton onClick={handleClose}>닫기</CloseButton>
            <MoleculeAccount onOpenPopup={handleOpenPopup} /> {/* 비밀번호 변경 성공 시 팝업 열기 */}
          </PopupContent>
        </AccountPopupOverlay>
      ) : ( // 팝업이 열려있을 때 다른 요소들이 안 보이도록 조건부 렌더링
        <Popup onClick={handleClose}>
          <div>
            <button type="button" className="closePopup" onClick={handleClose}>
              닫기
            </button>
            <span>
              <img src={images.CheckMark} alt="" />
            </span>
            <p>비밀번호 변경이 완료되었습니다</p>
            <div className="btnWrap">
              <button type="button" onClick={handleClose}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

export default MoleculeAccountPopup;

// CSS-in-JS 스타일링
const AccountPopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const PopupContent = styled.div`
  position: relative;
  max-width: 690px;
  width: 100%;
  border-radius: 20px;
  padding: 64px 144px;
  background: ${palette.white};
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  font-family: "Pretendard", "Poppins";
  font-size: 1rem;
  color: ${palette.white};
  padding: 5px 26px 5px 0;
  border: none;
  outline: none;
  background: none;
  cursor: pointer;

  &:before,
  &:after {
    position: absolute;
    top: 50%;
    right: 6px;
    width: 2px;
    height: 18px;
    border-radius: 5px;
    background: ${palette.white};
    content: "";
  }

  &:before {
    transform: translateY(-50%) rotate(45deg);
  }

  &:after {
    transform: translateY(-50%) rotate(-45deg);
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
        border-radius: 8px;
        border: 1px solid ${palette.blue};
        background: ${palette.white};

        &:last-child {
          color: ${palette.white};
          background: ${palette.blue};
        }
      }
    }

    ${(props) =>
      props.Cancel &&
      css`
        p {
          strong {
            font-weight: 500;
            display: block;
          }
          span {
            font-size: 0.75rem;
            font-weight: 400;
            color: ${palette.gray500};
            display: block;
            margin-top: 8px;
          }
        }

        .btnWrap {
          padding-top: 16px;
          border-top: 1px solid ${palette.lineGray};

          button {
            font-family: "Pretendard", "Poppins";
            color: ${palette.gray};
            font-weight: 600;
            padding: 0;
            border: 0;
            background: none;

            &:last-child {
              color: ${palette.blue};
              background: none;
            }
          }
        }
      `}
  }
`;