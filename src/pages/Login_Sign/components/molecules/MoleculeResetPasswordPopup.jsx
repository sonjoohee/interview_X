// MoleculeLoginPopup.jsx

import React from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import MoleculeResetPassword from "./MoleculeResetPassword";

const MoleculeResetPasswordPopup = ({ onClose = () => {} }) => {
  // 기본값으로 빈 함수 설정
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <LoginPopupOverlay onClick={handleOverlayClick}>
      <PopupContent>
        <CloseButton onClick={onClose}>닫기</CloseButton>
        <MoleculeResetPassword onClosePopup={onClose} /> {/* 함수 전달 */}
      </PopupContent>
    </LoginPopupOverlay>
  );
};

export default MoleculeResetPasswordPopup;

// CSS-in-JS 스타일링
const LoginPopupOverlay = styled.div`
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
