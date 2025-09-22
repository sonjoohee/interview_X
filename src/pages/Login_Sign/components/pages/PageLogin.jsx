// src/components/pages/PageLogin.jsx

import React from "react";
import styled from "styled-components";
import MoleculeLogin from "../molecules/MoleculeLogin";
// import OrganismFooterBar from '../organisms/OrganismFooterBar';
// AI_Panel 페이지의 헤더 가져옴 - 나중에 전역으로 뺄 수도 있음
import OrganismHeader from "../../../../pages/AI_Panel/components/organisms/OrganismHeader";

const PageLogin = () => {
  return (
    <>
      <OrganismHeader />
      <SignupPageContainer>
        <SignupHeader>
          {/* 지금 바로 가입하고 수천명의 AI 패널을 만나보세요 */}
        </SignupHeader>
        <FormContainer>
          <MoleculeLogin />
        </FormContainer>
        {/* <OrganismFooterBar /> */}
        <FooterText>
          {/* 이미 가입하셨나요? <a href="/login">로그인하기</a> */}
        </FooterText>
      </SignupPageContainer>
    </>
  );
};

export default PageLogin;

// CSS-in-JS 스타일링
const SignupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

const SignupHeader = styled.h2`
  font-size: 18px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-width: 600px;
`;

const FooterText = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #333;
  text-align: center;

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    text-decoration: underline;
  }
`;
