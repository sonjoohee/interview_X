import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";

const MoleculePasswordResetPopup = ({ onClose, email,handleResendEmail, handleGoToLogin}) => {

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <PasswordResetPopupOverlay onClick={handleOverlayClick}>
      <PopupContent>
        <CloseButton onClick={onClose}>X</CloseButton>

        <span>
          <img src={images.CheckMark} alt="" />
        </span>

        <p>
          <strong>임시 비밀번호가 발송되었습니다.</strong>
          <span>
            이메일을 확인하여 임시 비밀번호로 로그인해주세요<br />
            메일을 받지 못하셨다면 스팸함을 확인하거나 메일 재발송을 해주세요
          </span>
        </p>

        <div className="btnWrap">
          <button type="button" onClick={handleResendEmail}>
            재발송하기
          </button>
          <button type="button" onClick={handleGoToLogin}>
            로그인 바로가기
          </button>
        </div>

        {/* 
        <Content>
          <Title>비밀번호 재설정 요청이 완료되었습니다.</Title>
          <Description>
            재설정 링크가 <strong>{email}</strong>으로 발송되었습니다. 메일에
            기재된 링크를 클릭하여 비밀번호를 재설정해 주세요.
            <br />
            메일을 받지 못한 경우, 스팸편지함 확인 또는 아래 버튼을 클릭하여
            재전송 해주세요.
          </Description>
          <ButtonGroup>
            <ActionButton onClick={handleGoToLogin}>
              메인 화면 바로가기
            </ActionButton>
            <ActionButton onClick={handleResendEmail} primary>
              메일 재발송
            </ActionButton>
          </ButtonGroup>
        </Content>
         */}
      </PopupContent>
    </PasswordResetPopupOverlay>
  );
};

export default MoleculePasswordResetPopup;

// Styled Components
const PasswordResetPopupOverlay = styled.div`
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
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
display: flex;
flex-direction: column;
width: 100%;
max-width: 400px;
text-align: center;
padding: 45px 24px 24px;
border-radius: 10px;
background: ${palette.white};

p {
  font-family: "Pretendard", "Poppins";
  font-size: 0.875rem;
  font-weight: 500;
  margin: 20px auto 24px;
  strong {
    font-weight: 500;
    display: block;
  }
  span {
    font-size: 0.75rem;
    font-weight: 400;
    color: #8c8c8c;
    display: block;
    margin-top: 8px;
  }
}
.btnWrap {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid ${palette.lineGray};
  button {
    flex: 1;
    font-family: "Pretendard", "Poppins";
    color: ${palette.gray};
    font-weight: 600;
    font-size: 0.875rem;
    padding: 0;
    border: 0;
    background: none;
    &:last-child {
      color: ${palette.blue};
      background: none;
    }
  }
  a {
    flex: 1;
    font-family: "Pretendard", "Poppins";
    color: ${palette.gray};
    font-weight: 600;
    font-size: 0.75rem;
    padding: 0;
    border: 0;
    background: none;
    &:last-child {
      color: ${palette.blue};
      background: none;
    }
  }
}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  font-family: "Pretendard", "Poppins";
`;

const Content = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 40px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background: ${(props) => (props.primary ? "#000" : "#fff")};
  color: ${(props) => (props.primary ? "#fff" : "#000")};
  font-weight: bold;
  font-family: "Pretendard", "Poppins";

  &:hover {
    background: ${(props) => (props.primary ? "#333" : "#f7f7f7")};
  }
`;
