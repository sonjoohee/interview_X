import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AtomButton from "../atoms/AtomButton";
import { isValidEmail } from "../atoms/AtomValidation";
import { updatePassword } from "../../../../utils/indexedDB";
import {
  EMAIL,
  ERROR_STATUS,
  NEW_PASSWORD,
  RE_PASSWORD,
} from "../../../AtomStates";
import {
  IS_LOGGED_IN,
  LOGIN_SUCCESS,
  USER_NAME,
  USER_EMAIL,
} from "../../../../pages/AtomStates"; // 아톰 임포트
import { isValidPassword } from "../atoms/AtomValidation"; // isValidPassword 가져오기
import { Link } from "react-router-dom";
import { palette } from "../../../../assets/styles/Palette";

const MoleculeAccountForm = ({ onOpenPopup = () => {} }) => {
  // onOpenPopup  함수 받기
  const [email, setEmail] = useAtom(EMAIL);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useAtom(NEW_PASSWORD);
  const [rePassword, setRePassword] = useAtom(RE_PASSWORD);
  const [errorStatus, setErrorStatus] = useAtom(ERROR_STATUS);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [, setLoginSuccess] = useAtom(LOGIN_SUCCESS);
  const [, setUserName] = useAtom(USER_NAME); // 유저 이름 아톰
  const [, setUserEmail] = useAtom(USER_EMAIL); // 유저 이메일 아톰
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태 관리
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setErrorStatus("");
  }, [setErrorStatus]);

  const validateCheckPasswordForm = () => {
    if (!newPassword || !password || !rePassword) {
      setErrorStatus("모든 필드를 입력해주세요.");
      return false;
    }
    if (newPassword == password) {
      setErrorStatus("기존 비밀번호와 다른 비밀번호를 입력해주세요.");
      return false;
    }
    if (newPassword != rePassword) {
      setErrorStatus("동일한 비밀번호를 입력해주세요.");
      return false;
    }
    // 비밀번호 유효성 검사 추가
    if (!isValidPassword(newPassword)) {
      setErrorStatus(
        "비밀번호는 8-16자 길이여야 하며, 문자, 숫자, 특수문자 중 최소 두 가지를 포함해야 합니다."
      );
      return false;
    }
    return true;
  };

  const handleChangPassword = async () => {
    setErrorStatus("");
    if (!validateCheckPasswordForm()) return;

    try {
      setIsLoading(true);
      // 유저 정보를 요청하기 위해 accessToken을 사용
      await updatePassword({
        password: newPassword,
        current_password: password,
      });
      setErrorStatus("비밀번호가 변경되었습니다.");
      setIsPopupOpen(true); // 팝업 열기

      // 비밀번호 변경 성공 시, 입력된 비밀번호 정보 초기화
      setPassword("");
      setNewPassword("");
      setRePassword("");
      onOpenPopup();
      // navigate("/Project");
      setIsLoading(false);
    } catch (error) {
      const serverErrorMessage =
        error.response?.data?.message ||
        "비밀번호 변경 중 오류가 발생했습니다.";

      setErrorStatus(serverErrorMessage);
      setPassword("");
      setNewPassword("");
      setRePassword("");
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordReset = (event) => {
    // event.preventDefault(); // 기본 동작 방지
    navigate("/request-reset-password");
  };

  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);

  const handleSignupClick = (e) => {
    e.preventDefault();
    setIsSignupPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsSignupPopupOpen(false);
  };

  return (
    <AccountFormContainer>
      <div>
        <label htmlFor="nowPassword">
          기존 비밀번호<span>*</span>
        </label>
        <StyledAtomInput
          type={showPassword ? "text" : "password"}
          id="nowPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="기존 비밀번호를 입력해주세요"
        />
        <TogglePasswordButton onClick={togglePasswordVisibility}>
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </TogglePasswordButton>
      </div>

      <div>
        <label htmlFor="password">
          비밀번호<span>*</span>
        </label>
        <div>
          <StyledAtomInput
            type={showPassword ? "text" : "password"}
            id="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
          />
          <TogglePasswordButton onClick={togglePasswordVisibility}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </TogglePasswordButton>
        </div>

        <div>
          <StyledAtomInput
            type={showPassword ? "text" : "password"}
            id="password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            placeholder="비밀번호 다시 입력해주세요"
          />
          <TogglePasswordButton onClick={togglePasswordVisibility}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </TogglePasswordButton>
        </div>

        <p>영문/숫자/특수문자 2가지 이상 혼합. 8~16자</p>
        <p> </p>
      </div>
      {errorStatus && <ErrorMessage>{errorStatus}</ErrorMessage>}
      <div>{errorStatus && <p> </p>}</div>
      {/* 
      <PasswordResetLink>
        <a onClick={handlePasswordReset}>비밀번호 찾기</a>
      </PasswordResetLink>
 */}
      <StyledLoginButton
        onClick={handleChangPassword}
        disabled={isLoading || !password}
      >
        {isLoading ? "비밀번호를 변경 중 입니다..." : "변경하기"}
      </StyledLoginButton>
      {/* 
      <WithdrawalWrap>
        <Link to="#">회원탈퇴</Link>
      </WithdrawalWrap> */}
    </AccountFormContainer>
  );
};

export default MoleculeAccountForm;

// CSS-in-JS 스타일링
const AccountFormContainer = styled.div`
  width: 100%;

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

    + div {
      margin-top: 20px;

      div {
        position: relative;
      }

      p {
        font-size: 0.63rem;
        color: ${palette.gray};
        text-align: left;
      }
    }
  }
`;

const StyledAtomInput = styled.input`
  width: 100%;
  font-family: "Pretendard", "Poppins";
  font-size: 1rem;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${palette.lineGray};
  box-sizing: border-box;

  &::placeholder {
    font-size: 0.875rem;
  }
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 0;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #888;
  font-family: "Pretendard", "Poppins";

  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  font-size: 0.75rem;
  color: ${palette.red};
  /* margin-top: 10px; */
  margin-bottom: 10px;
  text-align: center;
`;

const PasswordResetLink = styled.div`
  margin: 20px auto 30px;
  text-align: right;
  cursor: pointer;

  a {
    color: ${palette.gray};
    font-size: 0.75rem;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const StyledLoginButton = styled.button`
  width: 100%;
  font-family: "Pretendard", "Poppins";
  color: ${palette.white};
  padding: 15px;
  border-radius: 8px;
  border: none;
  background-color: ${palette.blue};
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    background: #d6d6d6;
    pointer-events: none;
  }
`;

const WithdrawalWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row !important;
  gap: 12px;
  font-size: 1rem;
  color: ${palette.gray};
  margin-top: 50px;

  a {
    color: ${palette.gray500};
    text-decoration: underline;
  }
`;
