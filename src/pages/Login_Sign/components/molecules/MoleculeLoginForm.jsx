// src/pages/Login_Sign/components/molecules/MoleculeLoginForm.jsx
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import styled, { css, ThemeProvider } from "styled-components";
import theme from "../../../../assets/styles/Theme";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { isValidEmail } from "../atoms/AtomValidation";
import { UserCreditInfo } from "../../../../utils/indexedDB";
import { CustomInput } from "../../../../assets/styles/InputStyle";
import images from "../../../../assets/styles/Images";
import { EMAIL, ERROR_STATUS, ACCESSABLE_EXPERT } from "../../../AtomStates";
import PopupWrap from "../../../../assets/styles/Popup";
import {
  IS_LOGGED_IN,
  LOGIN_SUCCESS,
  USER_NAME,
  USER_EMAIL,
  IS_MARKETING,
  CONVERSATION_ID,
  USER_MEMBERSHIP,
  IS_SIGNUP_POPUP_OPEN,
  USER_CREDITS,
  EDUCATION_STATE,
  ADMIN_STATE,
  USER_INFO,
} from "../../../../pages/AtomStates";
import { Link } from "react-router-dom";
import { palette } from "../../../../assets/styles/Palette";
import MoleculeResetPasswordPopup from "./MoleculeResetPasswordPopup";

const MoleculeLoginForm = ({ onClosePopup, onShowEducationPopup }) => {
  const [, setUserCredits] = useAtom(USER_CREDITS);
  const [email, setEmail] = useAtom(EMAIL);
  const [, setUserMembership] = useAtom(USER_MEMBERSHIP);
  const [educationState, setEducationState] = useAtom(EDUCATION_STATE);
  const [adminState, setAdminState] = useAtom(ADMIN_STATE);
  const [password, setPassword] = useState("");
  const [errorStatus, setErrorStatus] = useAtom(ERROR_STATUS);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [, setLoginSuccess] = useAtom(LOGIN_SUCCESS);
  const [, setUserName] = useAtom(USER_NAME);
  const [, setUserEmail] = useAtom(USER_EMAIL);
  const [isMarketing] = useAtom(IS_MARKETING);
  const [conversationId] = useAtom(CONVERSATION_ID);
  const [userInfo, setUserInfo] = useAtom(USER_INFO);

  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [, setAccessableExpert] = useAtom(ACCESSABLE_EXPERT);
  const [isSignPopupOpen] = useAtom(IS_SIGNUP_POPUP_OPEN); // 회원가입 팝업 상태 관리
  const [isPasswordRestPopupOpen, setIsPasswordRestPopupOpen] = useState(false); // 비밀번호 리셋 팝업 상태 관리
  const [, setIsExitPopupOpen] = useState(false);
  const [showEducationPopup, setShowEducationPopup] = useState(false);
  const [letLogin, setLetLogin] = useState(false);

  useEffect(() => {
    setErrorStatus("");
  }, [setErrorStatus]);

  const validateForm = () => {
    if (!email || !password) {
      setErrorStatus("모든 필드를 입력해주세요.");
      return false;
    }
    if (!isValidEmail(email)) {
      setErrorStatus("유효한 이메일 주소를 입력해주세요.");
      return false;
    }
    return true;
  };

  // const isIOSDevice = () => {
  //   const isIOS =
  //     /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  //   const isAppleDevice = navigator.userAgent.includes("Macintosh");
  //   const isTouchScreen = navigator.maxTouchPoints >= 1; // iOS 13 이상 체크

  //   return isIOS || (isAppleDevice && isTouchScreen);
  // };

  // 모바일 감지 함수 추가
  // const isMobileDevice = () => {
  //   if (isIOSDevice()) {
  //     return true;
  //   }
  //   const toMatch = [
  //     /Android/i,
  //     /webOS/i,
  //     /iPhone/i,
  //     /iPad/i,
  //     /iPod/i,
  //     /BlackBerry/i,
  //     /Windows Phone/i,
  //   ];

  //   return toMatch.some((toMatchItem) => {
  //     return navigator.userAgent.match(toMatchItem);
  //   });
  // };

  const handleExitCancel = () => {
    setIsExitPopupOpen(false);
  };

  const handleLogin = async () => {
    setErrorStatus("");
    if (!validateForm()) return;

    try {
      let response;

      // 로그인 요청
      if (isMarketing) {
        response = await fetch(
          "https://wishresearch.kr/api/user/defaultLogin_marketing/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              password,
              chatGetId: conversationId,
            }),
          }
        );
      } else {
        console.log("🚀 ~ handleLogin ~ response:");
        response = await fetch(
          "https://wishresearch.kr/api/user/login/normal/",
          // "http://127.0.0.1:8000/api/user/login/normal/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );
        console.log("🚀 ~ handleLogin ~ response:", response);
      }

      if (response.ok) {
        const result = await response.json();
        const accessToken = result.access_token;
        sessionStorage.setItem("accessToken", accessToken);

        const userInfoResponse = await fetch(
          "https://wishresearch.kr/api/user/userInfo/",
          // "http://127.0.0.1:8000/api/user/userInfo/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json();
          setUserInfo(userInfo);
          // console.log("🚀 ~ handleLogin ~ userInfo:", userInfo);

          // if (
          //   userInfo.email === "yspark@userconnect.kr" ||
          //   userInfo.email === "jsjun0319@hanyang.ac.kr" ||
          //   userInfo.email === "sjjjang00@gmail.com" ||
          //   userInfo.email === "sungeun_lee@userconnect.kr" ||
          //   userInfo.email === "okhyund@userconnect.kr" ||
          //   userInfo.email === "hsb4557@naver.com" ||
          //   userInfo.email === "choi9110@nate.com" ||
          //   userInfo.email === "gusrms2346@naver.com" ||
          //   userInfo.email === "08doyun@naver.com" ||
          //   userInfo.email === "ehdbs08@hanyang.ac.kr" ||
          //   userInfo.email === "suauncle@gmail.com" ||
          //   userInfo.email === "pleasure4ur@gmail.com" ||
          //   userInfo.email === "r_pleasure4u@naver.com" ||
          //   userInfo.email === "lhm1186@naver.com" ||
          //   userInfo.email === "pixelweb@naver.com" ||
          //   userInfo.email === "hyeeun@userconnect.kr" ||
          //   userInfo.email === "pasrk0821@naver.com" ||
          //   userInfo.email === "okhyund@gmail.com" ||
          //   userInfo.email === "sunbin12325@gmail.com" ||
          //   userInfo.email === "yspark.uc@gmail.com" ||
          //   userInfo.email === "uvaluator@naver.com" ||
          //   userInfo.email === "jungmin_lee@userconnect.kr" ||
          //   userInfo.email === "syyoon@userconnect.kr" ||
          //   userInfo.email === "star7613son@gmail.com"
          // ) {
          //   setAccessableExpert(true);
          // }

          // // 유저 정보 저장
          // setUserName(userInfo.name);
          // setUserEmail(userInfo.email);
          // setUserMembership(userInfo.membership);
          // setEducationState(userInfo.education_state);
          // setAdminState(userInfo.is_admin);
          // sessionStorage.setItem("userName", userInfo.name);
          // sessionStorage.setItem("userEmail", userInfo.email);
          // sessionStorage.setItem("userCreatedAt", userInfo.signup_date); // 서버 토큰 저장

          // const accessToken = sessionStorage.getItem("accessToken");
          // if (accessToken) {
          //   const userCreditValue = await UserCreditInfo(true);

          //   // 전역 상태의 크레딧 정보 업데이트
          //   setUserCredits(userCreditValue);
          // }

          // if (userInfo.education_state) {
          // 교육 사용자 리스트 정의
          const edu_user_list = [
            "ghkim.2048@gmail.com",
            "macogroup@naver.com",
            "yuung12@naver.com",
            "eunjin.nam@koreanartist.com",
            "junhoo34@naver.com",
            "uisky1028@gmail.com",
            "idkhs04@naver.com",
            "sihwang@signlab.kr",
            "admin@hooaah.ai",
            "wetree.corp@gmail.com",
            "info@bravo6.kr",
            "ghit@ghit.co.kr",
            "debby@slashbslash.com",
            "chris@bluelions.kr",
            "iljoogns@i-gns.co.kr",
            "leeshaki@hanmail.net",
            "jh826@hanyang.ac.kr",
          ];
          // 교육 사용자인지 확인
          if (edu_user_list.includes(userInfo.email)) {
            setShowEducationPopup(true);
          } else {
            // 유저 정보 저장
            setUserName(userInfo.name);
            setUserEmail(userInfo.email);
            setUserMembership(userInfo.membership);
            setEducationState(userInfo.education_state);
            setAdminState(userInfo.is_admin);
            sessionStorage.setItem("userName", userInfo.name);
            sessionStorage.setItem("userEmail", userInfo.email);
            sessionStorage.setItem("userCreatedAt", userInfo.signup_date); // 서버 토큰 저장

            const accessToken = sessionStorage.getItem("accessToken");
            if (accessToken) {
              const userCreditValue = await UserCreditInfo(true);
              // 전역 상태의 크레딧 정보 업데이트
              setUserCredits(userCreditValue);
            }

            setIsLoggedIn(true);
            setLoginSuccess(true);
            navigate("/Project");
          }
          // }
          // setIsLoggedIn(true);

          // 모바일 기기 체크 후 처리 수정
          // if (isMobileDevice()) {
          //   console.log("🚀 ~ handleLogin ~ 모바일 기기 체크 후 처리 수정");
          //   setShowMobileWarning(true); // 모바일 경고창 표시
          //   setLoginSuccess(false); // 로그인 성공 상태를 false로 유지
          // } else {
          // console.log("🚀 ~ handleLogin ~ PC에서는 바로 로그인 성공 처리");
          // setLoginSuccess(true); // PC에서는 바로 로그인 성공 처리
          // navigate("/Project");
          // }
        } else {
          setErrorStatus("유저 정보를 불러오는 중 오류가 발생했습니다.");
        }
      } else {
        const result = await response.json();
        setErrorStatus(result.message || "로그인 중 오류가 발생했습니다.");
      }
    } catch (error) {
      setErrorStatus("로그인 중 오류가 발생했습니다.");
    }
  };
  // const validateEmail = (email) => {
  //   if (!isValidEmail(email)) {
  //     setErrorStatus("유효한 이메일 주소를 입력해주세요.");
  //     setIsEmailValid(false);
  //     setIsCommercialEmail(false);
  //     return;
  //   }

  //   // 상용 이메일 체크 로직 추가
  //   const commonEmailDomains = [
  //     "gmail.com",
  //     "yahoo.com",
  //     "yahoo.co.jp",
  //     "hotmail.com",
  //     "outlook.com",
  //     "aol.com",
  //     "zoho.com",
  //     "mail.com",
  //     "mail.ru",
  //     "gmx.com",
  //     "yandex.com",
  //     "protonmail.com",
  //     "icloud.com",
  //     "fastmail.com",
  //     "hushmail.com",
  //     "inbox.com",
  //     "lycos.com",
  //     "rediffmail.com",
  //     "mail.ru",
  //     "qq.com",
  //     "163.com",
  //     "126.com",
  //     "sina.com",
  //     "sohu.com",
  //     "yeah.net",
  //     "21cn.com",
  //     "tom.com",
  //     "foxmail.com",
  //     "live.com",
  //     "msn.com",
  //     "naver.com",
  //     "daum.net",
  //     "nate.com",
  //     "kakao.com",
  //     "hanmail.net",
  //     "korea.com",
  //     "hanmir.com",
  //     "empal.com",
  //     "hitel.net",
  //     "kebi.com",
  //     "netian.com",
  //     "dreamwiz.com",
  //     "tistory.com",
  //     "naver.com",
  //     "daum.net",
  //     "nate.com",
  //     "orgio.net",
  //     "wail.co.kr",
  //     "lycos.co.kr",
  //     "chol.com",
  //     "chollian.net",
  //     "intizen.com",
  //     "freechal.com",
  //     "teramail.com",
  //     "metq.com",
  //     "paran.com",
  //     "cyworld.com",
  //     "hanafos.com",
  //     "unitel.co.kr",
  //   ];
  //   const emailDomain = email.split("@")[1];
  //   if (commonEmailDomains.includes(emailDomain)) {
  //     setErrorStatus("상용 이메일은 사용할 수 없습니다.");
  //     setIsEmailValid(false);
  //     setIsCommercialEmail(true);
  //     return;
  //   }

  //   setIsEmailValid(true);
  //   setIsCommercialEmail(false);
  //   setErrorStatus("");
  // };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordReset = (event) => {
    // event.preventDefault(); // 기본 동작 방지
    navigate("/request-reset-password");
  };

  const handleMobileWarningConfirm = () => {
    // console.log("🚀 ~ handleMobileWarningConfirm ~ handleMobileWarningConfirm");
    setShowMobileWarning(false);
    setLoginSuccess(true); // 확인 버튼 클릭 시 로그인 성공 처리
    navigate("/Project");
  };

  // const handleSignupClick = (e) => {
  //   e.preventDefault();
  //   setIsSignupPopupOpen(true);
  // };

  // const handleClosePopup = () => {
  //   setIsSignupPopupOpen(false);
  // };

  // const handleSignClick = () => {
  //   setIsSignPopupOpen(true); // 회원가입 팝업 열기
  //   setIsLoginPopupOpen(false);
  //   onClosePopup();
  // };
  // const closeSignPopup = () => {
  //   setIsSignPopupOpen(false); // 회원가입 팝업 닫기
  //   setErrorStatus("");
  //   setSignUpName("");
  //   setEmail("");
  //   setSignupEmail("");
  //   setPassword("");
  //   setSignupPassword("");
  //   setConfirmPassword("");
  // };

  const handlePasswordRestClick = () => {
    setIsPasswordRestPopupOpen(true); // 비밀번호 리셋 팝업 열기
  };
  const closePasswordRestPopup = () => {
    setIsPasswordRestPopupOpen(false); // 비밀번호 리셋 팝업 닫기
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* 팝업이 열리면 로그인 폼은 숨기고 팝업만 표시 */}
        {isSignPopupOpen || isPasswordRestPopupOpen ? null : (
          <LoginFormContainer>
            <div>
              <label htmlFor="email">
                이메일<span>*</span>
              </label>
              <CustomInput
                Small
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력해주세요"
              />
            </div>

            <div>
              <label htmlFor="password">
                비밀번호<span>*</span>
              </label>
              <CustomInput
                Small
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="비밀번호를 입력해주세요"
              />

              <TogglePasswordButton onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </TogglePasswordButton>
            </div>

            <PasswordResetLink>
              <a onClick={handlePasswordRestClick}>비밀번호 찾기</a>
            </PasswordResetLink>

            <StyledLoginButton
              onClick={handleLogin}
              disabled={!email || !password}
            >
              로그인
            </StyledLoginButton>

            {errorStatus && <ErrorMessage>{errorStatus}</ErrorMessage>}

            <JoinWrap>
              <p>아직 회원이 아니신가요?</p>
              <a
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (educationState) {
                    window.location.href = "/SignupEducation";
                  } else {
                    window.location.href = "/Signin";
                  }
                }}
              >
                회원가입하기
              </a>
            </JoinWrap>
          </LoginFormContainer>
        )}
        {/* 비밀번호 재설정 팝업 */}
        {isPasswordRestPopupOpen && (
          <MoleculeResetPasswordPopup onClose={closePasswordRestPopup} />
        )}{" "}
        {/* 모바일 경고 팝업 */}
        {showMobileWarning && (
          <Popup Cancel>
            <div>
              <button
                type="button"
                className="closePopup"
                onClick={handleExitCancel}
              >
                닫기
              </button>
              <span>
                <img src={images.ExclamationMark} alt="" />
              </span>
              <p>
                <strong>본 서비스는 웹 전용으로 운영되고 있습니다.</strong>
                <span>웹에서 최적의 작업을 진행하세요</span>
              </p>
              <div className="btnWrap">
                <button type="button" onClick={handleMobileWarningConfirm}>
                  확인
                </button>
              </div>
            </div>
          </Popup>
        )}
      </ThemeProvider>

      {showEducationPopup && (
        <PopupWrap
          Warning
          title="부산디자인진흥원 교육 과정 종료 안내"
          message={
            <>
              본 계정은 2025년 5월 31일자로 사용이 종료되며
              <br />
              이후 모든 계정 정보는 초기화되어 삭제됩니다
            </>
          }
          // message2="작업 중인 내용은 보관함을 확인하세요."
          messageBox="보다 자세한 서비스 종료 안내는 발송된 메일을 확인해주세요"
          buttonType="Outline"
          closeText="확인"
          onConfirm={async () => {
            // 비동기 함수로 변경
            console.log("🚀 ~ handleLoginEducation ~ onConfirm ~ onConfirm");
            // setLetLogin(true); // 로그인 허용

            // 사용자 정보 저장

            setUserName(userInfo.name);
            setUserEmail(userInfo.email);
            setUserMembership(userInfo.membership);
            setEducationState(userInfo.education_state);
            setAdminState(userInfo.is_admin);
            sessionStorage.setItem("userName", userInfo.name);
            sessionStorage.setItem("userEmail", userInfo.email);
            sessionStorage.setItem("userCreatedAt", userInfo.signup_date); // 서버 토큰 저장

            const accessToken = sessionStorage.getItem("accessToken");
            if (accessToken) {
              const userCreditValue = await UserCreditInfo(true); // await 사용 가능
              // 전역 상태의 크레딧 정보 업데이트
              setUserCredits(userCreditValue);
            }

            setIsLoggedIn(true); // 로그인 상태 설정
            setLoginSuccess(true); // 로그인 성공 처리
            setShowEducationPopup(false); // 팝업 닫기
            navigate("/Project"); // 프로젝트 페이지로 이동
          }}
          onCancel={async () => {
            // 비동기 함수로 변경
            console.log(
              "🚀 ~ handleLoginEducation ~ onConfirm ~ onConfirmssssssssssssss"
            );
            // setLetLogin(true); // 로그인 허용
            // 사용자 정보 저장

            setUserName(userInfo.name);
            setUserEmail(userInfo.email);
            setUserMembership(userInfo.membership);
            setEducationState(userInfo.education_state);
            setAdminState(userInfo.is_admin);
            sessionStorage.setItem("userName", userInfo.name);
            sessionStorage.setItem("userEmail", userInfo.email);
            sessionStorage.setItem("userCreatedAt", userInfo.signup_date); // 서버 토큰 저장

            const accessToken = sessionStorage.getItem("accessToken");
            if (accessToken) {
              const userCreditValue = await UserCreditInfo(true); // await 사용 가능
              // 전역 상태의 크레딧 정보 업데이트
              setUserCredits(userCreditValue);
            }

            setIsLoggedIn(true); // 로그인 상태 설정
            setLoginSuccess(true); // 로그인 성공 처리
            setShowEducationPopup(false); // 팝업 닫기
            navigate("/Project"); // 프로젝트 페이지로 이동
          }}
        />
      )}
    </>
  );
};
export default MoleculeLoginForm;

const LoginFormContainer = styled.div`
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
    }
  }
`;

// const StyledAtomInput = styled.input`
//   width: 100%;
//   font-family: "Pretendard", "Poppins", sans-serif;
//   // font-size: 1rem;
//   font-size: 0.75rem;
//   padding: 12px 16px;
//   border-radius: 8px;
//   border: 1px solid ${palette.lineGray};
//   box-sizing: border-box;

//   &::placeholder {
//     font-size: 0.75rem;
//   }
// `;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 0;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-family: "Pretendard", "Poppins";
  color: #888;

  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  font-size: 0.75rem;
  color: ${palette.red};
  margin-top: 20px;
  text-align: center;
`;

const PasswordResetLink = styled.div`
  margin: 20px auto 40px;
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
  padding: 17px;
  border-radius: 8px;
  border: none;
  background-color: ${palette.primary};
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    background: #d6d6d6;
    pointer-events: none;
  }
`;

const JoinWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row !important;
  gap: 12px;
  font-size: 1rem;
  color: ${palette.gray};
  margin-top: 40px;

  a {
    color: ${palette.blue};
    text-decoration: underline;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 20px;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
  z-index: 9999;

  .closePopup {
    position: absolute;
    right: 24px;
    top: 24px;
    width: 16px;
    height: 16px;
    font-size: 0;
    padding: 9px;
    border: 0;
    background: none;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 100%;
      border-radius: 10px;
      background: ${palette.gray500};
      content: "";
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    text-align: center;
    // overflow:hidden;
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
        font-size: 0.75rem !important;
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

      button {
        flex: 1;
        font-family: "Pretendard", "Poppins";
        font-size: 0.875rem;
        font-weight: 600;
        color: ${palette.blue};
        padding: 12px 20px;
        border-radius: 12px;
        border: 1px solid ${palette.blue};
        background: ${palette.white};

        // &:last-child {
        //   color: ${palette.white};
        //   background: ${palette.blue};
        // }
      }
    }

    ${(props) =>
      props.Cancel &&
      css`
        p {
          strong {
            font-weight: 600;
            display: block;
            color: ${palette.gray800};
          }
          span {
            font-size: 1rem;
            display: block;
            margin-top: 8px;
          }
        }

        .btnWrap {
          padding-top: 16px;
          border-top: 1px solid ${palette.lineGray};

          button {
            color: ${palette.gray700};
            font-weight: 400;
            padding: 0;
            border: 0;
            background: none;
          }
        }
      `}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    > div {
      width: 90%;
    }
  }
`;
