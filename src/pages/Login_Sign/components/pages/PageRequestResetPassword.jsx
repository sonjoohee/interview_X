import React, { useState } from "react";
import { useAtom } from "jotai";
import {
  IS_PASSWORD_RESET_POPUP_OPEN,
  IS_LOGIN_POPUP_OPEN,
} from "../../../AtomStates"; // 경로는 프로젝트 구조에 맞게 수정
import styled from "styled-components";
import MoleculePasswordResetPopup from "../molecules/MoleculePasswordResetPopup";
import { palette } from "../../../../assets/styles/Palette";

const RequestResetPassword = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useAtom(IS_PASSWORD_RESET_POPUP_OPEN);
  const [, setIsLoginPopupOpen] = useAtom(IS_LOGIN_POPUP_OPEN); // 로그인 팝업의 setter만 필요하므로 현재 값은 생략

  const handleRequestReset = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://wishresearch.kr/api/user/passwordMail/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        }
      );

      if (response.ok) {
        setMessage("비밀번호 재설정 링크가 이메일로 전송되었습니다.");
        setIsPopupOpen(true); // 팝업 열기
      } else {
        const result = await response.json();
        if (result.error === "User with this email does not exist.") {
          setMessage("존재하지 않는 사용자입니다.");
        } else {
          setMessage(
            result.error || "비밀번호 재설정 요청 중 오류가 발생했습니다."
          );
        }
      }
    } catch (error) {
      setMessage("서버와의 통신 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // 현재 팝업 닫기
    setIsLoginPopupOpen(false); // 다른 팝업도 닫기
  };

  const handleResendEmail = async () => {
    try {
      const response = await fetch(
        "https://wishresearch.kr/api/user/passwordMail/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        alert("비밀번호 재설정 이메일이 재발송되었습니다.");
      } else {
        const result = await response.json();
        if (result.error === "User with this email does not exist.") {
          setMessage("존재하지 않는 사용자입니다.");
        } else {
          setMessage(result.error || "이메일 재발송 중 오류가 발생했습니다.");
        }
      }
    } catch (error) {
      alert("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  const handleGoToLogin = () => {
    setIsPopupOpen(false); // 현재 팝업 닫기
    setIsLoginPopupOpen(false); // 다른 팝업도 닫기
    window.location.href = "/Project"; // 메인 페이지로 이동
    // setIsLoginPopupOpen(true);
  };

  return (
    <>
      <RequestResetContainer>
        <Header>
          비밀번호를 잊어버리셨나요?
          <p>가입하신 이메일 주소로 임시 비밀번호를 발급해드려요</p>
        </Header>

        <PasswordFormContainer>
          <div>
            <label htmlFor="name">
              이름<span>*</span>
            </label>
            <StyledInput
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력해 주세요"
            />
          </div>

          <div>
            <label htmlFor="email">
              이메일<span>*</span>
            </label>
            <StyledInput
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소(아이디)를 입력해주세요"
            />
          </div>

          <StyledButton
            onClick={handleRequestReset}
            disabled={isLoading || !name || !email}
          >
            {isLoading
              ? "임시 비밀번호 발급을 준비 중 입니다..."
              : "비밀번호 찾기"}
          </StyledButton>

          {message && <Message>{message}</Message>}
        </PasswordFormContainer>

        {isPopupOpen && (
          <MoleculePasswordResetPopup
            onClose={handleClosePopup}
            email={email}
            handleResendEmail={handleResendEmail}
            handleGoToLogin={handleGoToLogin}
          />
        )}
      </RequestResetContainer>

      {isLoading && (
        <LoadingOverlay>
          <div className="loader"></div>
        </LoadingOverlay>
      )}
    </>
  );
};

export default RequestResetPassword;

// CSS-in-JS 스타일링
const RequestResetContainer = styled.div`
  position: relative;
  max-width: 450px;
  width: 100%;
  // margin: 220px auto 0;
`;

const Header = styled.h2`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 2rem;
  // margin: 110px auto;
  margin-bottom: 50px;
  text-align: center;

  p {
    font-size: 1rem;
    font-weight: 300;
    color: ${palette.gray};
  }
`;

const PasswordFormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;

  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-size: 0.75rem;
      text-align: left;
      display: flex;
      align-items: flex-start;
      gap: 5px;

      span {
        color: ${palette.red};
      }
    }

    p {
      font-size: 0.63rem;
      color: ${palette.gray};
      text-align: left;
    }

    + div {
      margin-top: 20px;
    }
  }
`;

const StyledInput = styled.input`
  width: 100%;
  font-family: "Pretendard", "Poppins";
  // font-size: 1rem;
  font-size: 0.75rem;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${palette.lineGray};
  box-sizing: border-box;

  &::placeholder {
    font-size: 0.875rem;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  font-family: "Pretendard", "Poppins";
  font-size: 1rem;
  font-weight: 700;
  color: ${palette.white};
  margin-top: 50px;
  padding: 15px;
  border-radius: 8px;
  border: none;
  background-color: ${palette.blue};
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:disabled {
    background: #d6d6d6;
    pointer-events: none;
  }
`;

const Message = styled.p`
  font-size: 0.75rem;
  color: ${palette.red};
  margin-top: 20px;
  text-align: center;
`;

const LoadingOverlay = styled.div`
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

  .loader,
  .loader:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
  .loader {
    margin: 60px auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 1.1em solid rgba(255, 255, 255, 0);
    border-right: 1.1em solid rgba(255, 255, 255, 0);
    border-bottom: 1.1em solid rgba(255, 255, 255, 0);
    border-left: 1.1em solid #0453f4;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const MainContent = styled.div`
  position: relative;
  top: 40px;
  grid-area: content;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // gap:40px;
  min-width: 1px;
  max-width: 1484px;
  width: calc(100% - 40px);
  // padding-bottom: 150px;
  margin: 0 auto;

  > div {
    flex: 1;
  }

  > div:first-child {
    max-width: 1240px;
    width: 100%;
    margin: 0 20px;
    padding-bottom: 60px;
  }
`;

const ContentsWrap = styled.div`
  position: relative;
  display: flex;
`;
