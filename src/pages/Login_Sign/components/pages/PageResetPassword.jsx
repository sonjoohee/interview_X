// src/pages/PageResetPassword.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (!token) {
      setError("잘못된 접근입니다.");
      navigate("/login");
    }
  }, [navigate]);

  const handleResetPassword = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("https://wishresearch.kr/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      if (response.ok) {
        navigate("/Project"); // 비밀번호 변경 후 로그인 페이지로 이동
      } else {
        const result = await response.json();
        setError(result.error || "비밀번호 재설정 중 오류가 발생했습니다.");
      }
    } catch (error) {
      setError("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <ResetPasswordContainer>
      <ResetPasswordHeader>비밀번호 재설정</ResetPasswordHeader>
      <ResetPasswordInput
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="새 비밀번호를 입력하세요"
      />
      <ResetPasswordInput
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호를 다시 입력하세요"
      />
      <ResetPasswordButton onClick={handleResetPassword}>
        비밀번호 재설정
      </ResetPasswordButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </ResetPasswordContainer>
  );
};

export default ResetPassword;

// CSS-in-JS 스타일링
const ResetPasswordContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ResetPasswordHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const ResetPasswordInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
`;

const ResetPasswordButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-family: "Pretendard", "Poppins";
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 20px;
`;
