// App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import GlobalStyles from "./assets/GlobalStyle";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  IS_LOGGED_IN,
  USER_NAME,
  USER_EMAIL,
  IS_SOCIAL_LOGGED_IN,
  EXPERT_DETAIL_DATA,
  IS_MOBILE,
  IS_MARKETING,
  APPROACH_PATH,
  ACCESSABLE_EXPERT,
} from "./pages/AtomStates"; // 로그인 상태 아톰 임포트
import { checkTokenValidity, getServerStatus } from "./utils/indexedDB";
import styled, { css } from "styled-components";
import images from "./assets/styles/Images";
import { palette } from "./assets/styles/Palette";

import PageLogin from "./pages/Login_Sign/components/pages/PageLogin";
import PageSignup from "./pages/Login_Sign/components/pages/PageSignup";
import PageLoginSuccess from "./pages/Login_Sign/components/pages/PageLoginSuccess";
import PageVerifyEmail from "./pages/Login_Sign/components/pages/PageVerifyEmail";
import PageEmailVerified from "./pages/Login_Sign/components/pages/PageEmailVerified";
import PageEmailVerificationFailed from "./pages/Login_Sign/components/pages/PageEmailVerificationFailed";
import PageResetPassword from "./pages/Login_Sign/components/pages/PageResetPassword";
import PageRequestResetPassword from "./pages/Login_Sign/components/pages/PageRequestResetPassword";
import PagePayTest from "./pages/Purchase_Credit/components/pages/PagePayTest";
import PageCompletedMail from "./pages/Login_Sign/components/pages/PageCompletedMail";

import PageMeetAiExpert from "./pages/Meet_Ai_Expert/components/pages/PageMeetAiExpert";
import PageExpertInsight from "./pages/Expert_Insight/components/pages/PageExpertInsight";
import PageMarketingExpertInsight from "./pages/Expert_Insight/components/pages/PageMarketingExpertInsight";
import PageMarketingLanding from "./pages/Marketing/components/pages/PageMarketingLanding";

import PageMarketingYesItems from "./pages/Marketing/components/pages/PageMarketingYesItems";
import PageMarketingNoItems from "./pages/Marketing/components/pages/PageMarketingNoItems";
import PageMarketingNoItemsResult from "./pages/Marketing/components/pages/PageMarketingNoItemsResult";

// 디자인페이지
import PageConnetWithYouTarget from "./pages/Design_Page/PageConnetWithYourTargett";
import PageBusinessAnalysis from "./pages/Design_Page/PageBusinessAnalysis";
import PageCustomizePersona from "./pages/Design_Page/PageCustomizePersona";
import PageWayInterview from "./pages/Design_Page/PageWayInterview";
import PageInterviewResult from "./pages/Design_Page/PageInterviewResult";
import PageRecreate from "./assets/styles/PageRecreate";

import PageInterviewWay from "./pages/Design_Page/PageInterviewWay";
import PagePersonaSelect from "./pages/Design_Page/PagePersonaSelect";
import PagePayment from "./pages/Persona/components/pages/PagePayment";

import PageQuickSurvey from "./pages/Tool/QuickSurvey/components/pages/PageQuickSurvey";
import PageTargetDiscovery from "./pages/Tool/TargetDiscovery/components/pages/PageTargetDiscovery";
import PageCustomerValueAnalyzer from "./pages/Tool/CustomerValueAnalyzer/components/pages/PageCustomerValueAnalyzer";
import PageIdeaGenerator from "./pages/Tool/IdeaGenerator/components/pages/PageIdeaGenerator";
import PageDesignAnalysis from "./pages/Tool/DesignEmotionAnalyzer/components/pages/PageDesignAnalysis";
import PageDesignSuitability from "./pages/Persona/components/pages/PageDesignSuitability";

//! 교육 툴
import PageCustomerJourneyMap from "./pages/Education_Tool/CustomerJourneyMap/components/pages/PageCustomerJourneyMap";
import PageKanoModel from "./pages/Education_Tool/KanoModel/components/pages/PageKanoModel";
import PageIssueGeneration from "./pages/Education_Tool/IssueGeneration/components/pages/PageIssueGeneration";
import PageNeedsKeywordsGeneration from "./pages/Education_Tool/NeedsKeywordsGeneration/components/pages/PageNeedsKeywordsGeneration";
import PageIdeaGeneration from "./pages/Education_Tool/IdeaGeneration/components/pages/PageIdeaGeneration";
import PageNps from "./pages/Education_Tool/Nps/components/pages/PageNps";
import PageIdeaEvaluate from "./pages/Education_Tool/IdeaEvaluate/components/pages/PageIdeaEvaluate";
import PageConceptDefinition from "./pages/Education_Tool/ConceptDefinition/components/pages/PageConCeptDefinition";
import PageBusinessModelCanvas from "./pages/Education_Tool/BusinessModelCanvas/components/pages/PageBusinessModelCanvas";
import PagePRFAQ from "./pages/Education_Tool/PRFAQ/components/pages/PagePRFAQ";

import PageMyProfile from "./pages/Persona/components/pages/PageMyProfile";

import PageTerms from "./pages/PageTerms";
import PagePolicy from "./pages/PagePolicy";

//! 랜딩페이지
import PageServiceLanding from "./pages/PageServiceLanding";
import PageServiceLandingDCBeducation from "./pages/PageServiceLandingDCBeducation";
import PageServiceLandingBNKeducation from "./pages/PageServiceLandingBNKeducation";
import PageServiceLandingAiArtTech from "./pages/PageServiceLandingAiArtTech";
import PageServiceLandingKidp from "./pages/PageServiceLandingKIDP";
import PageServiceLandingCceiSeoul from "./pages/PageServiceLandingCCEISeoul";
import PageServiceLandingCceiSeoul2 from "./pages/PageServiceLandingCCEISeoul2";

import PageBlog from "./pages/PageBlog";
import PageKanoModelCCEI from "./pages/Education_Tool/KanoModelCCEI/components/pages/PageKanoModelCCEI";

import PageToolList from "./pages/Persona/components/pages/PageToolList";

//! SAAS 프로젝트
import PageProject from "./pages/Saas_Project/pages/PageProject";
import PageProjectCreate from "./pages/Saas_Project/pages/PageProjectCreate";
import PageDashBoard from "./pages/Saas_Project/pages/PageDashBoard";
import PageAiPersona from "./pages/Saas_Project/pages/PageAiPersona";
import PageStorageBox from "./pages/Saas_Project/pages/PageStorageBox";

import PageStyleGuide from "./pages/Design_Page/PageStyleGuide";

// 페르소나
import PageMain from "./pages/Persona/components/pages/PageMain";
import PagePersona from "./pages/Persona/components/pages/PagePersona";
import PagePersona2 from "./pages/Persona/components/pages/PagePersona2";
import PagePersona3 from "./pages/Persona/components/pages/PagePersona3";
import PagePersona4 from "./pages/Persona/components/pages/PagePersona4";
import PagePersona4Single from "./pages/Persona/components/pages/PagePersona4Single";
import PageMyProject from "./pages/Persona/components/pages/PageMyProject";
import PagePersona3Select from "./pages/Persona/components/pages/PagePersona3Select";
import PagePersona3Single from "./pages/Persona/components/pages/PagePersona3Single";
import PagePersona3Multiple from "./pages/Persona/components/pages/PagePersona3Multiple";
import PagePersona4SingleLive from "./pages/Persona/components/pages/PagePersona4SingleLive";

// 로그인, 회원가입
import OrganismLogin from "./pages/Global/organisms/OrganismLogin";
import OrganismSignin from "./pages/Global/organisms/OrganismSignin";
import OrganismSignupEducation from "./pages/Global/organisms/OrganismSignupEducation";

// 테스트 라우트 추가
import PageMarketingNoItemsShare from "./pages/Marketing/components/pages/PageMarketingNoItemsShare";

//테스트 페이지
import DesignLens from "./pages/Persona/components/pages/DesignLens";
import AIDesignEvaluationSystem from "./pages/Persona/components/pages/AIDesignEvaluationSystem";
import PageToolListSaas from "./pages/Saas_Project/pages/PageToolListSaas";
import PageModelDrawerTest from "./pages/Education_Tool/BusinessModelCanvas/components/pages/PageModelDrawerTest";

// 프로젝트 라우터
import AtomProjectRouter from "./pages/Global/atoms/AtomProjectRouter";
import PagePsstReport from "./pages/Tool/psst_report/components/pages/PagePsstReport";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN); // 로그인 상태를 위한 아톰
  const [, setUserName] = useAtom(USER_NAME); // 유저 이름 아톰
  const [, setUserEmail] = useAtom(USER_EMAIL); // 유저 이메일 아톰
  const [, setIsSocialLoggedIn] = useAtom(IS_SOCIAL_LOGGED_IN); // 소셜 로그인 상태 아톰
  const [isServerDown, setIsServerDown] = useState(false); // 서버 상태 관리
  const [, setExpertDetail] = useAtom(EXPERT_DETAIL_DATA); // 화면 크기를 체크하는 useEffect
  const [, setIsMobile] = useAtom(IS_MOBILE);
  const [isMarketing, setIsMarketing] = useAtom(IS_MARKETING);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);

  // 토큰 존재 여부 확인 컴포넌트
  function RequireToken({ children }) {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      return <Navigate to="/Login" replace />;
    }
    return children;
  }

  // 로그인 상태에서 로그인/회원가입 페이지 접근 제한 컴포넌트
  function RedirectIfLoggedIn({ children }) {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      return <Navigate to="/Project" replace />;
    }
    return children;
  }

  const [accessableExpert, setAccessableExpert] = useAtom(ACCESSABLE_EXPERT);

  // useEffect(() => {
  //   const userEmail = sessionStorage.getItem("userEmail");
  //   if (
  //     userEmail === "yspark@userconnect.kr" ||
  //     userEmail === "jsjun0319@hanyang.ac.kr" ||
  //     userEmail === "sjjjang00@gmail.com" ||
  //     userEmail === "sungeun_lee@userconnect.kr" ||
  //     userEmail === "okhyund@userconnect.kr" ||
  //     userEmail === "hsb4557@naver.com" ||
  //     userEmail === "choi9110@nate.com" ||
  //     userEmail === "gusrms2346@naver.com" ||
  //     userEmail === "08doyun@naver.com" ||
  //     userEmail === "ehdbs08@hanyang.ac.kr" ||
  //     userEmail === "suauncle@gmail.com" ||
  //     userEmail === "pleasure4ur@gmail.com" ||
  //     userEmail === "r_pleasure4u@naver.com" ||
  //     userEmail === "lhm1186@naver.com" ||
  //     userEmail === "pixelweb@naver.com" ||
  //     userEmail === "hyeeun@userconnect.kr" ||
  //     userEmail === "pasrk0821@naver.com" ||
  //     userEmail === "okhyund@gmail.com" ||
  //     userEmail === "sunbin12325@gmail.com" ||
  //     userEmail === "yspark.uc@gmail.com" ||
  //     userEmail === "uvaluator@naver.com" ||
  //     userEmail === "jungmin_lee@userconnect.kr" ||
  //     userEmail === "syyoon@userconnect.kr" ||
  //     userEmail === "star7613son@gmail.com"
  //   ) {
  //     setAccessableExpert(true);
  //   }
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      // 뷰포트 너비가 768px 이하일 경우 모바일로 간주
      setIsMobile(window.innerWidth <= 768);
    };

    // 페이지 로드 시 및 창 크기 변경 시 화면 크기 체크
    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 로드 시에도 체크

    // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 애플리케이션이 로드될 때 로그인 상태 확인
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken"); // sessionStorage에서 토큰 확인
    const storedUserName = sessionStorage.getItem("userName");
    const storedUserEmail = sessionStorage.getItem("userEmail");
    const isSocialLogin = sessionStorage.getItem("isSocialLogin"); // 소셜 로그인 여부 확인

    if (token && storedUserName) {
      setIsLoggedIn(true); // 토큰이 있으면 로그인 상태로 설정
    } else {
      setIsLoggedIn(false); // 토큰이 없으면 로그아웃 상태로 설정
    }

    if (storedUserName) {
      setUserName(storedUserName); // 이름 아톰 업데이트
    }

    if (storedUserEmail) {
      setUserEmail(storedUserEmail); // 이메일 아톰 업데이트
    }
    if (isSocialLogin === "true") {
      setIsSocialLoggedIn(true); // 소셜 로그인 상태 업데이트
    } else {
      setIsSocialLoggedIn(false); // 일반 로그인 상태로 설정
    }
  }, [setIsLoggedIn, setUserName, setUserEmail]);

  // 10분마다 서버 상태 체크
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    const checkServerStatus = async () => {
      if (token) {
        try {
          await checkTokenValidity();
        } catch (error) {
          sessionStorage.clear(); // 세션 스토리지 모두 삭제 
          setIsLoggedIn(false);
          setUserName("");
          setUserEmail("");
          window.location.reload();
        }
      } else {
        try {
          const response = await getServerStatus();
          // 서버가 정상일 경우
          if (response.status === 200) {
            setIsServerDown(false);
          }
        } catch (error) {
          if (window.location.pathname !== "/ServiceLanding") {
            // 서버가 응답하지 않거나 에러 발생 시 서버 다운 처리
            setIsServerDown(true);

            sessionStorage.clear(); // 세션 스토리지 모두 삭제
            setIsLoggedIn(false);
            setUserName("");
            setUserEmail("");
          }
        }
      }
    };

    // 처음 실행
    checkServerStatus();

    // 10분마다 실행
    const intervalId = setInterval(() => {
      checkServerStatus();
    }, 600000); // 600초마다 서버 상태 확인

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 정리
  }, []);

  return (
    <div className="App">
      {/* 스타일 컴퍼넌트 적용 */}
      <GlobalStyles />

      {/* 서버 점검 중 경고창 */}
      {isServerDown && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              window.location.href = "/Project";
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={() => (window.location.href = "/Project")}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>
              서버가 점검 중입니다
              <br />
              잠시 후 다시 시도해 주세요
            </p>
            <div className="btnWrap">
              <button
                type="button"
                onClick={() => (window.location.href = "/Project")}
              >
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}

      <BrowserRouter>
        {/* PROJECT_SAAS가 빈 객체일 때 리다이렉션하는 컴포넌트 */}
        <AtomProjectRouter />

        <Routes>
          <Route
            path="/"
            element={
              // <RequireToken>
              <PageServiceLanding />
              // </RequireToken>
            }
          />
          <Route
            path="/DCB-education"
            element={
              // <RequireToken>
              <PageServiceLandingDCBeducation />
              // </RequireToken>
            }
          />
          <Route
            path="/BNK-education"
            element={
              // <RequireToken>
              <PageServiceLandingBNKeducation />
              // </RequireToken>
            }
          />

          <Route
            path="/ai-art-tech"
            element={
              // <RequireToken>
              <PageServiceLandingAiArtTech />
              // </RequireToken>
            }
          />
          <Route
            path="/kidp"
            element={
              // <RequireToken>
              <PageServiceLandingKidp />
              // </RequireToken>
            }
          />

          <Route
            path="/ccei-seoul"
            element={
              // <RequireToken>
              <PageServiceLandingCceiSeoul />
              // </RequireToken>
            }
          />

<Route
            path="/ccei-seoul2"
            element={
              // <RequireToken>
              <PageServiceLandingCceiSeoul2 />
              // </RequireToken>
            }
          />

          <Route
            path="*"
            element={
              // <RequireToken>
              <PageServiceLanding />
              // </RequireToken>
            }
          />

          {/* <Route path="/ServiceLanding" element={<PageServiceLanding />} /> */}
          <Route
            path="/Project"
            element={
              <RequireToken>
                <PageProject />
              </RequireToken>
            }
          />
          {/* <Route path="/MeetAiExpert" element={<PageMeetAiExpert />} /> */}
          <Route
            path="/ExpertInsight"
            element={
              // <RequireToken>
              <PageExpertInsight />
              // </RequireToken>
            }
          ></Route>
          <Route
            path="/MarketingExpertInsight"
            element={
              // <RequireToken>
              <PageMarketingExpertInsight />
              // </RequireToken>
            }
          ></Route>
          {isMarketing && approachPath !== 2 ? (
            <Route
              path="/conversation/:conversationId"
              element={
                // <RequireToken>
                <PageMarketingExpertInsight />
                // </RequireToken>
              }
            />
          ) : (
            <Route
              path="/conversation/:conversationId"
              element={
                // <RequireToken>
                <PageExpertInsight />
                // </RequireToken>
              }
            />
          )}

          {/* 테스트 라우트 추가
        <Route path="/interview-test" element={<InterviewTest />} /> */}

          {/* 마케팅 */}
          <Route
            path="/MarketingLanding"
            element={<PageMarketingLanding />}
          ></Route>
          <Route
            path="/MarketingSetting/1"
            element={
              <RequireToken>
                <PageMarketingYesItems />
              </RequireToken>
            }
          ></Route>
          <Route
            path="/MarketingSetting/2"
            element={
              <RequireToken>
                <PageMarketingNoItems />
              </RequireToken>
            }
          ></Route>
          <Route
            path="/MarketingSetting/2/Result"
            element={
              <RequireToken>
                <PageMarketingNoItemsResult />
              </RequireToken>
            }
          ></Route>

          {/* 마케팅 쉐어 */}
          <Route
            path="/MarketingSetting/Share/:mbtiType"
            element={<PageMarketingNoItemsShare />}
          />

          {/* 페르소나 */}
          <Route
            path="/Persona"
            element={
              <RequireToken>
                <PagePersona />
              </RequireToken>
            }
          ></Route>
          <Route path="/" element={<PageMain />}></Route>
          {/* <Route
            path="/Persona"
            element={
              <RequireToken>
                <PagePersona />
              </RequireToken>
            }
          ></Route>
          <Route
            path="/Persona/2"
            element={
              <RequireToken>
                <PagePersona2 />
              </RequireToken>
            }
          ></Route> */}
          {/* <Route
            path="/Persona/3"
            element={
              <RequireToken>
                <PagePersona3 />
              </RequireToken>
            }
          ></Route> */}
          <Route
            path="/Persona/3/Select"
            element={
              <RequireToken>
                <PagePersona3Select />
              </RequireToken>
            }
          ></Route>
          <Route
            path="/Persona/4"
            element={
              <RequireToken>
                <PagePersona4 />
              </RequireToken>
            }
          ></Route>
          <Route
            path="/Persona/4/Single"
            element={
              <RequireToken>
                <PagePersona4Single />
              </RequireToken>
            }
          ></Route>

          <Route
            path="/Persona/4/SingleLive"
            element={
              <RequireToken>
                <PagePersona4SingleLive />
              </RequireToken>
            }
          ></Route>

          <Route
            path="/QuickSurvey"
            element={
              <RequireToken>
                <PageQuickSurvey />
              </RequireToken>
            }
          ></Route>

          <Route
            path="/TargetDiscovery"
            element={
              <RequireToken>
                <PageTargetDiscovery />
              </RequireToken>
            }
          ></Route>

          <Route
            path="/CustomerValueAnalyzer"
            element={
              <RequireToken>
                <PageCustomerValueAnalyzer />
              </RequireToken>
            }
          ></Route>

          <Route
            path="/IdeaGenerator"
            element={
              <RequireToken>
                <PageIdeaGenerator />
              </RequireToken>
            }
          ></Route>

          <Route
            path="/DesignAnalysis"
            element={
              <RequireToken>
                <PageDesignAnalysis />
              </RequireToken>
            }
          ></Route>

          <Route
            path="/CustomerJourneyMap"
            element={
              <RequireToken>
                <PageCustomerJourneyMap />
              </RequireToken>
            }
          ></Route>

          <Route
            path="/IssueGeneration"
            element={
              <RequireToken>
                <PageIssueGeneration />
              </RequireToken>
            }
          ></Route>

          <Route
            path="/NeedsKeywordsGeneration"
            element={
              <RequireToken>
                <PageNeedsKeywordsGeneration />
              </RequireToken>
            }
          ></Route>

          <Route
            path="/IdeaGeneration"
            element={
              <RequireToken>
                <PageIdeaGeneration />
              </RequireToken>
            }
          ></Route>

          <Route
            path="/KanoModel"
            element={
              <RequireToken>
                <PageKanoModel />
              </RequireToken>
            }
          ></Route>

          <Route
            path="/KanoModelCCEI"
            element={
              <RequireToken>
                <PageKanoModelCCEI />
              </RequireToken>
            }
          ></Route>

          <Route
            path="/Nps"
            element={
              <RequireToken>
                <PageNps />
              </RequireToken>
            }
          ></Route>

          <Route
            path="/IdeaEvaluate"
            element={
              <RequireToken>
                <PageIdeaEvaluate />
              </RequireToken>
            }
          ></Route>

          <Route
            path="/ConceptDefinition"
            element={
              <RequireToken>
                <PageConceptDefinition />
              </RequireToken>
            }
          ></Route>

          <Route
            path="/PRFAQ"
            element={
              <RequireToken>
                <PagePRFAQ />
              </RequireToken>
            }
          ></Route>
          <Route
            path="/BusinessModelCanvas"
            element={
              <RequireToken>
                <PageBusinessModelCanvas />
              </RequireToken>
            }
          ></Route>

          <Route
            path="/DesignSuitability"
            element={
              <RequireToken>
                <PageDesignSuitability />
              </RequireToken>
            }
          ></Route>

          <Route
            path="/Persona3Single"
            element={
              <RequireToken>
                <PagePersona3Single />
              </RequireToken>
            }
          ></Route>

          <Route
            path="/Persona3Multiple"
            element={
              <RequireToken>
                <PagePersona3Multiple />
              </RequireToken>
            }
          ></Route>

          {/* <Route
            path="/MyProject"
            element={
              <RequireToken>
                <PageMyProject />
              </RequireToken>
            }
          /> */}

          {/* SAAS 프로젝트 */}

          <Route
            path="/Login"
            element={
              <RedirectIfLoggedIn>
                <OrganismLogin />
              </RedirectIfLoggedIn>
            }
          />

          <Route
            path="/Signin"
            element={
              <RedirectIfLoggedIn>
                <OrganismSignin />
              </RedirectIfLoggedIn>
            }
          />

          <Route
            path="/SignupEducation"
            element={
              <RedirectIfLoggedIn>
                <OrganismSignupEducation />
              </RedirectIfLoggedIn>
            }
          />

          <Route
            path="/ProjectCreate"
            element={
              <RequireToken>
                <PageProjectCreate />
              </RequireToken>
            }
          />

          <Route
            path="/DashBoard"
            element={
              <RequireToken>
                <PageDashBoard />
              </RequireToken>
            }
          />
          <Route
            path="/ModelDrawer"
            element={
              <RequireToken>
                <PageModelDrawerTest />
              </RequireToken>
            }
          />

          <Route
            path="/AiPersona"
            element={
              <RequireToken>
                <PageAiPersona />
              </RequireToken>
            }
          />

          <Route
            path="/Tool"
            element={
              <RequireToken>
                <PageToolListSaas />
              </RequireToken>
            }
          />

          <Route
            path="/StorageBox"
            element={
              <RequireToken>
                <PageStorageBox />
              </RequireToken>
            }
          />

          <Route
            path="/PsstReport"
            element={
              <RequireToken>
                <PagePsstReport />
              </RequireToken>
            }
          />
          
          {/* <Route
            path="/CuratorStoryboard"
            element={<CuratorStoryboard />}
          ></Route> */}
          {/* <Route path="/MarketingLandingPage" element={<MarketingLandingPage />}></Route> */}
          {/* <Route path="/SamplePage" element={<SamplePage />}></Route> */}

          {/* AI 패널 */}
          {/* <Route path="/AI_Panel" element={<PageAIPanelList />} />
            <Route path="/QuickReport" element={<BusinessTool />} />
            <Route path="/PageAIPanelList" element={<PageAIPanelList />}></Route> */}

          {/* 디자인페이지 */}
          {/* <Route
            path="/ConnectWithYourTarget"
            element={<PageConnetWithYouTarget />}
          />
          <Route path="/BusinessAnalysis" element={<PageBusinessAnalysis />} />
          <Route path="/CustomizePersona" element={<PageCustomizePersona />} />
          <Route path="/WayInterview" element={<PageWayInterview />} />
          <Route path="/InterviewResult" element={<PageInterviewResult />} />
          <Route path="/PersonaLoader" element={<PagePersonaLoader />} />
          <Route path="/Recreate" element={<PageRecreate />} />
          <Route path="/InterviewWay" element={<PageInterviewWay />} /> */}
          <Route
            path="/PersonaSelect"
            element={
              <RequireToken>
                <PagePersonaSelect />
              </RequireToken>
            }
          />
          <Route
            path="/Payment"
            element={
              <RequireToken>
                <PagePayment />
              </RequireToken>
            }
          />

          <Route
            path="/MyProfile"
            element={
              <RequireToken>
                <PageMyProfile />
              </RequireToken>
            }
          />

          <Route path="/Terms" element={<PageTerms />} />
          <Route path="/Policy" element={<PagePolicy />} />

          <Route
            path="/blog"
            element={
              // <RequireToken>
              <PageBlog />
              // </RequireToken>
            }
          />

          <Route path="/style_guide" element={<PageStyleGuide />} />

          {/* 테스트 페이지 */}
          <Route path="/DesignLens" element={<DesignLens />} />
          <Route path="/Payment" element={<PagePayment />} />
          <Route
            path="/AIDesignEvaluationSystem"
            element={<AIDesignEvaluationSystem />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

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
    padding: 11px;
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
      background: ${palette.black};
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
      line-height: 1.5;
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
        border-radius: 8px;
        border: 1px solid ${palette.blue};
        background: ${palette.white};

        &:last-child {
          color: ${palette.white};
          background: ${palette.blue};
        }
      }
    }

    ${(props) =>
      props.Cancel &&
      css`
        p {
          strong {
            font-weight: 500;
            display: block;
          }
          span {
            font-size: 0.75rem;
            font-weight: 400;
            color: ${palette.gray500};
            display: block;
            margin-top: 8px;
          }
        }

        .btnWrap {
          padding-top: 16px;
          border-top: 1px solid ${palette.lineGray};

          button {
            font-family: "Pretendard", "Poppins";
            color: ${palette.gray};
            font-weight: 600;
            padding: 0;
            border: 0;
            background: none;

            &:last-child {
              color: ${palette.blue};
              background: none;
            }
          }
        }
      `}
  }
`;
