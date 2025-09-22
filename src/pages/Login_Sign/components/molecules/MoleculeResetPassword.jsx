// src/pages/Login_Sign/components/molecules/MoleculeLogin.jsx
import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import MoleculePasswordResetForm from "../pages/PageRequestResetPassword";
import { LOGIN_SUCCESS } from "../../../../pages/AtomStates"; // 아톰 임포트
import { palette } from "../../../../assets/styles/Palette";

const MoleculeResetPassword = ({ onClosePopup = () => {} }) => {
  const [loginSuccess, setLoginSuccess] = useAtom(LOGIN_SUCCESS);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginSuccess) {
      // navigate('/');    // 페이지 이동
      if (onClosePopup) onClosePopup(); // 팝업 닫기
      setLoginSuccess(null); // 상태 초기화
    }
  }, [loginSuccess, navigate, setLoginSuccess]);

  return (
    <LoginContainer>
      <MoleculePasswordResetForm />
    </LoginContainer>
  );
};

export default MoleculeResetPassword;


const LoginContainer = styled.div`
  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-size: 2rem;
    font-weight: 400;
  }

  min-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  text-align: center;
`;

const Separator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 32px 0;

  hr {
    flex: 1;
    border: none;
    border-top: 1px solid ${palette.lineGray};
  }

  span {
    margin: 0 15px;
    font-size: 1rem;
    color: ${palette.gray};
  }
`;
