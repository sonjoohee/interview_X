import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaTimesCircle } from "react-icons/fa"; // X 아이콘 추가

const PageEmailVerificationFailed = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/signup");
  };

  return (
    <Container>
      <MessageBox>
        <Title>
          <XIcon />
          이메일 인증에 실패했습니다.
        </Title>
        <Message>링크가 만료되었거나 잘못된 인증 링크입니다.</Message>
        <StyledButton onClick={handleRetry}>다시 시도하기</StyledButton>
      </MessageBox>
    </Container>
  );
};

export default PageEmailVerificationFailed;

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

const XIcon = styled(FaTimesCircle)`
  color: #ff0000;
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
