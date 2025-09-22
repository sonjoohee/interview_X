// MoleculeLoginPopup.jsx

import React from "react";
import styled, { ThemeProvider } from "styled-components";
import MoleculeSign from "./MoleculeSign";
import { palette } from "../../../../assets/styles/Palette";
import theme from "../../../../assets/styles/Theme";

const MoleculeSignPopup = ({ onClose = () => {} }) => {


  return (
    // <LoginPopupOverlay onClick={handleOverlayClick}>
    <>
      <ThemeProvider theme={theme}>
        <SignPopupOverlay>
          <PopupContent>
            <CloseButton onClick={onClose}>닫기</CloseButton>
            <MoleculeSign onClosePopup={onClose} /> 
          </PopupContent>
        </SignPopupOverlay>
      </ThemeProvider>
    </>
  );
};

export default MoleculeSignPopup;


const SignPopupOverlay = styled.div`
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width:90%;
    padding:32px 20px;
  }
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
