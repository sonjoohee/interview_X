// src/pages/Login_Sign/components/molecules/MoleculeGoogleLoginForm.jsx

import React from "react";
import { auth, provider } from "../../../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../../../assets/styles/Theme";
import images from "../../assets/styles/Images"; // Images.jsx 임포트
import { useAtom } from "jotai";
import {
  IS_LOGGED_IN,
  LOGIN_SUCCESS,
  USER_NAME,
  USER_EMAIL,
  IS_SOCIAL_LOGGED_IN,
  IS_MARKETING,
  CONVERSATION_ID,
  USER_CREDITS,
  USER_MEMBERSHIP,
  ACCESSABLE_EXPERT,
} from "../../../../pages/AtomStates"; // 아톰 임포트

import firebase from "firebase/app";
import "firebase/auth";
import {
  UserCreditInfo,
  googleLogin,
  googleLoginMarketing,
} from "../../../../utils/indexedDB";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeGoogleLoginForm = () => {
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [accessableExpert, setAccessableExpert] = useAtom(ACCESSABLE_EXPERT);

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [, setLoginSuccess] = useAtom(LOGIN_SUCCESS);
  const [, setUserName] = useAtom(USER_NAME); // 유저 이름 아톰
  const [, setUserEmail] = useAtom(USER_EMAIL); // 유저 이메일 아톰
  const [, setIsSocialLoggedIn] = useAtom(IS_SOCIAL_LOGGED_IN); // 소셜 로그인 아톰
  const [isMarketing, setIsMarketing] = useAtom(IS_MARKETING);
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [, setUserMembership] = useAtom(USER_MEMBERSHIP);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      let response;
      // 'https://wishresearch.kr/google-login'
      // 'https://wishresearch.kr/api/user/login/google/'
      // Firebase 인증 후 사용자 정보를 서버에 저장

      if (isMarketing) {
        response = await googleLoginMarketing({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          chatGetId: conversationId,
        });
      } else {
        response = await googleLogin({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        });
      }
      if (response.status === 200) {
        const accessToken = response.data.access_token;
        sessionStorage.setItem("accessToken", accessToken);

        const userInfoResponse = await fetch(
          "https://wishresearch.kr/api/user/userInfo/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (userInfoResponse.status === 200) {
          const userInfo = await userInfoResponse.json();

          // 유저 정보 저장
          setUserMembership(userInfo.membership);
          sessionStorage.setItem("userCreatedAt", userInfo.signup_date);
        } else {
          console.error("유저 정보를 불러오는 중 오류가 발생했습니다.");
        }
      } else {
        const result = await response.json();
        console.error(result.message || "로그인 중 오류가 발생했습니다.");
      }

      const userName = user.displayName;
      const userEmail = user.email;

      //   if (userEmail === "yspark@userconnect.kr"
      //     || userEmail === "jsjun0319@hanyang.ac.kr"
      //     || userEmail === "sjjjang00@gmail.com"
      //     || userEmail === "sungeun_lee@userconnect.kr"
      //     || userEmail === "okhyund@userconnect.kr"
      //     || userEmail === "hsb4557@naver.com"
      //     || userEmail === "choi9110@nate.com"
      //     || userEmail === "gusrms2346@naver.com"
      //     || userEmail === "08doyun@naver.com"
      //     || userEmail === "ehdbs08@hanyang.ac.kr"
      //     || userEmail === "suauncle@gmail.com"
      //     || userEmail === "pleasure4ur@gmail.com"
      //     || userEmail === "r_pleasure4u@naver.com"
      //     || userEmail === "lhm1186@naver.com"
      //     || userEmail === "pixelweb@naver.com"
      //     || userEmail === "hyeeun@userconnect.kr"
      //     || userEmail === "pasrk0821@naver.com"
      //     || userEmail === "okhyund@gmail.com"
      //     || userEmail === "sunbin12325@gmail.com"
      //     || userEmail === "yspark.uc@gmail.com"
      //     || userEmail === "uvaluator@naver.com"
      //     || userEmail === "jungmin_lee@userconnect.kr"
      //     || userEmail === "syyoon@userconnect.kr"
      //     || userEmail === "star7613son@gmail.com"
      //   ) {
      //   setAccessableExpert(true);
      // }

      sessionStorage.setItem("userName", userName); // 서버 토큰 저장
      sessionStorage.setItem("userEmail", userEmail); // 서버 토큰 저장
      sessionStorage.setItem("isSocialLogin", "true"); // 소셜 로그인 여부 저장
      //api 호출 타임스탬프 저장
      // sessionStorage.setItem("apiTimestamp", response.data.timestamp);

      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        const userCreditValue = await UserCreditInfo(true);

        // 전역 상태의 크레딧 정보 업데이트
        setUserCredits(userCreditValue);
      }

      // 로그인 성공 시 처리
      setIsLoggedIn(true); // 아톰 업데이트
      setUserName(userName); // 유저 이름 업데이트
      setUserEmail(userEmail); // 유저 이메일 업데이트
      setIsSocialLoggedIn(true); // 소셜 로그인 상태를 true로 업데이트
      setLoginSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/Project");
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GoogleLoginForm>
          <LoginButton onClick={handleGoogleLogin}>
            <GoogleIconStyled src={images.GoogleIcon} alt="Google Icon" />
            Google 계정으로 시작하기
          </LoginButton>
        </GoogleLoginForm>
      </ThemeProvider>
    </>
  );
};

export default MoleculeGoogleLoginForm;

// CSS-in-JS 스타일링
const GoogleLoginForm = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 52px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.88rem;
    margin-top: 32px;
  }
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-family: "Pretendard", "Poppins";
  font-size: 1rem;
  font-weight: 700;
  color: ${palette.gray};
  padding: 14px 16px;
  border-radius: 8px;
  border: 1px solid ${palette.lineGray};
  background-color: ${palette.white};
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 10px;
  }
`;

const GoogleIconStyled = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;
