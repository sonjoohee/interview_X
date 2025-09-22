import React from "react";
import { useAtom } from "jotai";
import { IS_LOGIN_POPUP_OPEN } from "../../../AtomStates"; // 경로는 프로젝트 구조에 맞게 수정
import MoleculeLoginPopup from "./MoleculeLoginPopup";
import { useNavigate } from "react-router-dom";

const MoleculeLoginPopupManager = ({ children }) => {
  const [isLoginPopupOpen, setLoginPopupOpen] = useAtom(IS_LOGIN_POPUP_OPEN);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setLoginPopupOpen(true);
  };

  const handleClosePopup = () => {
    setLoginPopupOpen(false);
  };

  const handleLoginSuccess = () => {
    setLoginPopupOpen(false);
    navigate("/Project");
  };

  return (
    <>
      {children(handleLoginClick)}
      {isLoginPopupOpen && (
        <MoleculeLoginPopup
          onClose={handleClosePopup}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default MoleculeLoginPopupManager;
