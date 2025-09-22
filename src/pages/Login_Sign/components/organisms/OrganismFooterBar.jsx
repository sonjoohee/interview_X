// src/components/organisms/OrganismFooterBar.jsx

import React from "react";
import styled from "styled-components";

import { palette } from "../../../../assets/styles/Palette";

const OrganismFooterBar = ({ onLoginClick }) => {
  return (
    <FooterBar>
      <p>이미 가입하셨나요?</p>
      <FooterButton onClick={onLoginClick}>로그인하기</FooterButton>
    </FooterBar>
  );
};

export default OrganismFooterBar;

// CSS-in-JS 스타일링
const FooterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  font-size: 1rem;
  text-align: center;
  margin: 100px auto;
`;

const FooterButton = styled.button`
  font-family: "Pretendard", "Poppins";
  font-size: 1rem;
  color: ${palette.blue};
  text-decoration: underline;
  border: 0;
  background: none;
`;
