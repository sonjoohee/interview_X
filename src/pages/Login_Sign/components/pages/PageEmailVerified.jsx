import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa"; // 체크 아이콘 추가

const PageEmailVerified = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Container>
      <MessageBox>
        <Title>
          <CheckIcon />
          이메일이 인증되었습니다.
        </Title>
        <Message>다시 로그인 해주세요.</Message>
        <StyledButton onClick={handleLoginRedirect}>
          로그인 페이지로 이동
        </StyledButton>
      </MessageBox>
    </Container>
  );
};

export default PageEmailVerified;

// Styled components

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
`;

const MessageBox = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckIcon = styled(FaCheckCircle)`
  color: #28a745;
  margin-right: 10px;
  font-size: 24px;
`;

const Message = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 30px;
`;

const StyledButton = styled.button`
  background-color: #007bff;
  font-family: "Pretendard", "Poppins";
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
