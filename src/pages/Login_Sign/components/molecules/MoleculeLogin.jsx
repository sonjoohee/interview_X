// src/pages/Login_Sign/components/molecules/MoleculeLogin.jsx

import React, { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../../../assets/styles/Theme";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import MoleculeGoogleLoginForm from "./MoleculeGoogleLoginForm";
import MoleculeLoginForm from "./MoleculeLoginForm";
import { LOGIN_SUCCESS } from "../../../../pages/AtomStates"; // 아톰 임포트
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";

const MoleculeLogin = ({ onClosePopup = () => {} }) => {
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
    <>
    <ThemeProvider theme={theme}>
      <LoginContainer>
        <h1>
          <img src={images.Logo} alt="" />
          <span>시작하기</span>
        </h1>

        <MoleculeGoogleLoginForm />
        <Separator>
          <hr />
          <span>or</span>
          <hr />
        </Separator>
        <MoleculeLoginForm onClosePopup={onClosePopup} />
      </LoginContainer>
    </ThemeProvider>
    </>
  );
};

export default MoleculeLogin;

// CSS-in-JS 스타일링
const LoginContainer = styled.div`
  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-size: 2rem;
    font-weight: 400;
  }

  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    h1 {
      font-size:1.5rem;

      img {
        height:23px;
      }
    }
  }
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
