//헤더 컴포넌트
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import images from "../../../assets/styles/Images";
import { palette } from "../../../assets/styles/Palette";
import {
  Body2,
  Sub1,
  Sub2,
  Sub3,
  Caption2,
} from "../../../assets/styles/Typography";
import {
  CreditTotal,
  CreditDashBoardItem,
  CreditNoData,
} from "../../../assets/styles/BusinessAnalysisStyle";
import { useAtom } from "jotai";
import {
  PERSONA_STEP,
  USER_CREDITS,
  IS_LOGGED_IN,
  PROJECT_SAAS,
  EDUCATION_STATE,
  USER_EMAIL,
} from "../../../pages/AtomStates";
import { UserCreditInfo } from "../../../utils/indexedDB";
import { AlarmList } from "../../../utils/indexedDB";
import { useDynamicViewport } from "../../../assets/DynamicViewport";
import PopupWrap from "../../../assets/styles/Popup";
import {
  CustomInput,
  CustomTextarea,
  SelectBox,
  SelectBoxItem,
  SelectBoxTitle,
  SelectBoxList,
} from "../../../assets/styles/InputStyle";
import {
  H5,
} from "../../../assets/styles/Typography";
import axios from "axios";
const MoleculeHeader = () => {
  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기
  const navigate = useNavigate();

  const [personaStep] = useAtom(PERSONA_STEP);
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showRedDot, setShowRedDot] = useState(false);
  const [showCreditToggle, setShowCreditToggle] = useState(false);
  const [isClosingCreditToggle, setIsClosingCreditToggle] = useState(false);
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [isLoggedInState, setIsLoggedInState] = useState(false);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [alarms, setAlarms] = useState([]);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [educationState, setEducationState] = useAtom(EDUCATION_STATE);
  const [userEmail] = useAtom(USER_EMAIL);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    email: "",
    purpose: "",
    content: "",
  });
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState("");

  // Persona/3 경로 체크를 위한 조건 수정
  // const isPersona3Page =
  //   /^\/Persona\/(3\/[^/]+|3\/Select\/[^/]+|4\/[^/]+|4\/Single\/[^/]+)$/.test(
  //     location.pathname
  //   );

  // 첫 페이지 체크 (루트 경로 확인)
  // const isRootPage = location.pathname === "/";
  const isRootPage = location.pathname === "/Project";

  const isBlogPage = location.pathname === "/Blog";
  // MyProject 경로 체크 추가
  // const isMyProjectPage = location.pathname === "/MyProject";

  // // MyProfile 경로 체크 추가
  // const isMyProfilePage = location.pathname === "/MyProfile";

  // // Payment 경로 체크 추가
  // const isPaymentPage = location.pathname === "/Payment";

  // TargetDiscovery 경로 체크 추가
  const isTargetDiscoveryPage = location.pathname === "/TargetDiscovery";

  // CustomerValueAnalyzer 경로 체크 추가
  const isCustomerValueAnalyzerPage =
    location.pathname === "/CustomerValueAnalyzer";

  const isDesignAnalysisPage = location.pathname === "/DesignAnalysis";

  const isDashBoardPage = location.pathname === "/DashBoard";

  // IdeaGenerator 경로 체크 추가
  const isIdeaGeneratorPage = location.pathname === "/IdeaGenerator";

  // const isPersona2Page = location.pathname === "/Persona/2";

  // const isPersona3Page = location.pathname === "/Persona/3";

  // const isPersona3PageSelect = location.pathname === "/Persona/3/Select";

  // const isPersona3SinglePage = location.pathname === "/Persona3Single";

  // const isPersona3MultiplePage = location.pathname === "/Persona3Multiple";

  // const isPersona4PageSingle = location.pathname === "/Persona/4/Single";

  // const isPersona4Page = location.pathname === "/Persona/4";

  const isProjectCreatePage = location.pathname === "/ProjectCreate";

  const handleAlertToggle = () => {
    if (showAlert) {
      if (isLoggedIn) {
        // const timestamp = Math.floor(new Date().getTime() / 1000); // 현재 유닉스 타임스탬프 생성
        // console.log(timestamp);
        // sessionStorage.setItem('alertTimestamp', timestamp); // 세션에 저장
        // 로그인 상태일 때 추가 작업
      }
      setIsClosing(true);
      setTimeout(() => {
        fetchAlarms();
        setShowAlert(false);
        setIsClosing(false);
      }, 300);
    } else {
      setShowAlert(true);
      setShowCreditToggle(false);
      setShowRedDot(false);
    }
  };

  // const handleBusinessAnalysisToggle = () => {
  //   setShowBusinessAnalysis(!showBusinessAnalysis);
  // };

  const handleCreditToggle = () => {
    if (showCreditToggle) {
      setIsClosingCreditToggle(true);
      setTimeout(() => {
        setShowCreditToggle(false);
        setIsClosingCreditToggle(false);
      }, 300);
    } else {
      setShowCreditToggle(true);
      setShowAlert(false);
    }
  };

  const handleContactClick = () => {
    setIsContactPopupOpen(true);
  };

  const closeContactPopup = () => {
    setIsContactPopupOpen(false);
  };

  const handleContactInputChange = (field, value) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isContactFormValid = () => {
    return contactForm.email && contactForm.purpose && contactForm.content;
  };

  const handleSelectBoxClick = () => {
    setIsSelectBoxOpen(!isSelectBoxOpen);
  };

  const handlePurposeSelect = (purpose) => {
    setSelectedPurpose(purpose);
    handleContactInputChange("purpose", purpose);
    setIsSelectBoxOpen(false);
  };

  const getPlaceholderText = (purpose) => {
    switch (purpose) {
      case "환불 요청하기":
        return (
          "아래의 요건이 충족 되신 분들은 환불 요청이 가능합니다.\n" +
          "- 구매하신 유료 서비스는 계약 체결일 또는 서비스 이용 시작일로부터 7일 이내에 취소 가능합니다.\n" +
          "- 환불 요청은 InterviewX 계정과 연결된 이메일 주소를 통해 요청하셔야 합니다. 연결된 이메일 주소를 사용하지 않으시면 환불이 제한됩니다.\n" +
          "- InterviewX에서 구매한 크레딧은 구매일로부터 7일 이내에만 환불이 가능하며, 이는 크레딧이 사용되지 않았을 경우에 한합니다.\n" +
          "- 구독 해지는 구독 관리 페이지에서 처리하실 수 있습니다."
        );

      case "서비스 이용 관련 문의":
        return (
          "- 서비스 이용 중 발생한 문제나 사용 방법에 대한 어려움이 있으시면 문의해 주세요.\n" +
          "- 보다 나은 서비스를 위해 소중한 의견과 개선 제안을 남겨 주세요.\n"
        );

      case "결제 및 청구 관련 문의":
        return (
          "- 결제 오류, 청구 내역 확인, 결제 수단 변경 등의 문제가 있으시면 문의해 주세요.\n" +
          "- 결제와 관련된 정확한 정보를 제공해 주시면 보다 빠르게 도와드릴 수 있습니다.\n"
        );

      case "버그 리포트":
        return (
          "- 서비스 사용 중 오류나 버그가 발생한 경우 알려 주세요.\n" +
          "- 빠른 해결을 위해 버그 리포트 작성 시, 아래 내용을 포함해 주시면 보다 정확하게 버그 상황을 진단할 수 있습니다. \n" +
          "  * 사용 중인 브라우저 및 기기 정보 (예: Chrome, iPhone 13)\n" +
          "  * 인터넷 환경 (Wi-Fi 또는 모바일 데이터)\n" +
          "  * 오류 발생 단계\n"
        );
      default:
        return (
          "문의 내용을 작성해 주세요.\n" +
          "- 문의 요청은 InterviewX 계정과 연결된 이메일 주소를 통해 요청하셔야 합니다. 연결된 이메일 주소를 사용하지 않으시면 문의 사항 답변이 제한됩니다."
        );
    }
  };

  const token = sessionStorage.getItem("accessToken");

  const axiosConfig = {
    timeout: 100000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  };

  const handleContactSubmit = async () => {
    if (isContactFormValid()) {
      try {
        const response = await axios.post(
          "https://wishresearch.kr/api/user/support/",
          {
            email: contactForm.email,
            purpose: contactForm.purpose,
            content: contactForm.content,
            supportTime: new Date().toISOString(),
          },
          axiosConfig
        );
        closeContactPopup();
        // 폼 초기화
        setContactForm({
          email: "",
          purpose: "",
          content: "",
        });
        setSelectedPurpose("");
      } catch (error) {
        // console.error("문의하기 제출 실패:", error);
      }
    }
  };

  useEffect(() => {
    const fetchUserCredits = async () => {
      try {
        if (isLoggedIn) {
          const credits = await UserCreditInfo(true);

          if (credits) {
            setUserCredits(credits);
            setIsLoggedInState(true);
          } else {
            setUserCredits({
              additional_credit: 0,
              regular_credit: 0,
              event_credit: 0,
            });
            setIsLoggedInState(false);
          }
        }
      } catch (error) {
        // console.error("유저 크레딧 정보 조회 오류 발생:", error);
        setUserCredits({
          additional_credit: 0,
          regular_credit: 0,
          event_credit: 0,
        });
        setIsLoggedInState(false);
      }
    };

    fetchUserCredits();
  }, []);

  const fetchAlarms = async () => {
    if (!isLoggedIn) {
      return;
    }
    try {
      const response = await AlarmList(isLoggedIn); // AlarmCreate API 호출

      const userInfo = await UserCreditInfo(true);

      const readTimeStamp = userInfo?.read_timestamp;

      if (response && response.status === "success") {
        setAlarms(response.alarms); // Store alarms in state
        const createTimeStamp = response?.alarms[0]?.createTimeStamp;

        if (readTimeStamp < createTimeStamp) {
          setShowRedDot(true);
        } else {
          setShowRedDot(false);
        }
      }
      // if (response && response.status === "success") {
      //   const hasNewAlerts = response.alarms.some((alarm) => alarm.isNew); // isNew가 true인 알림이 있는지 확인
      //   setShowRedDot(hasNewAlerts); // 빨간 점 상태 업데이트
      //   setAlarms(response.alarms); // Store alarms in state
      //   // console.log(alarms);
      // } else {
      //   setShowRedDot(false);
      // }
    } catch (error) {
      // console.error("알림 조회 오류 발생:", error);
      setShowRedDot(false);
    }
  };

  useEffect(() => {
    fetchAlarms();
  }, [location, isLoggedIn]);

  const handleLinkNavigation = async (item) => {
    const link = item.link;
    // const projectId = item.projectId;
    if (!link) return;
    try {
      // const url = new URL(link);
      // if (url.hostname === "www.interviewx.ai") {
      //   // interviewx.ai 도메인인 경우 pathname으로 내부 이동
      //   navigate(url.pathname);
      // } else
      if (link === "dashboard") {
        // const project = await getProjectByIdFromIndexedDB(projectId, true);
        // console.log("🚀 ~ handleLinkNavigation ~ project:", project);
        // setProjectId(projectId);
        // setProjectSaas(project);
        // setAccessDashboard(true);
        // setAccessStateSaas(true);
        // const projectTotalData = {
        //   projectTitle: project.projectTitle,
        //   projectDescription: project.projectDescription,
        //   businessModel: project.businessModel,
        //   industryType: project.industryType,
        //   targetCountry: project.targetCountry,
        //   projectAnalysis: project.projectAnalysis,
        //   files: project?.files?.map((file, index) => ({
        //     id: file.id,
        //     name: file.name,
        //   })),
        // };
        // setProjectTotalInfo(projectTotalData || {});
        // setProjectCreateInfo(project.projectAnalysis || {});
        // setSingleInterviewQuestionList(
        //   project.singleInterviewQuestionList || []
        // );
        // setInterviewQuestionList(project.interviewQuestionList || []);
        // setCustomTheoryData(project.customTheoryData || {});

        // // 페르소나 리스트 불러오기
        // try {
        //   const savedPersonaListInfo = await getPersonaListOnServer(
        //     projectId,
        //     true
        //   );

        //   if (savedPersonaListInfo) {
        //     const sortedList = [...savedPersonaListInfo].sort((a, b) => {
        //       const dateA = a.timestamp;
        //       const dateB = b.timestamp;
        //       return dateB - dateA; // 최신 날짜가 위로
        //     });

        //     setPersonaListSaas(sortedList);
        //   }
        // } catch (error) {
        //   console.error("페르소나 리스트 불러오기 오류:", error);
        // }

        // // 툴 리스트 불러오기
        // try {
        //   const savedToolListInfo = await getToolListOnServerSaas(
        //     projectId,
        //     5,
        //     true
        //   );

        //   if (savedToolListInfo) {
        //     const sortedList = [...savedToolListInfo].sort((a, b) => {
        //       const dateA = a.timestamp;
        //       const dateB = b.timestamp;
        //       return dateB - dateA; // 최신 날짜가 위로
        //     });

        //     setToolListSaas(sortedList);
        //   }
        // } catch (error) {
        //   console.error("툴 리스트 불러오기 오류:", error);
        // }

        navigate("/Project");
        // navigate("/DashBoard");
      } else {
        // 다른 외부 링크는 새 창에서 열기
        window.open(link, "_blank");
      }
    } catch (e) {
      // URL 파싱 실패시 (상대 경로인 경우) 직접 이동
      if (link.startsWith("/Project")) {
        navigate(link);
      } else {
        window.open(link, "_blank");
      }
    }
  };

  return (
    <>
      <HeaderWrap>
        {!isRootPage && !isDashBoardPage && (
          <>
            <Title>
              {isTargetDiscoveryPage && projectSaas.projectTitle
                ? `타겟 탐색기 - ${projectSaas.projectTitle}`
                : isIdeaGeneratorPage && projectSaas.projectTitle
                ? `아이디어 생성기 - ${projectSaas.projectTitle}`
                : isIdeaGeneratorPage
                ? "아이디어 생성기"
                : isCustomerValueAnalyzerPage && projectSaas.projectTitle
                ? `고객 핵심 가치 분석기 - ${projectSaas.projectTitle}`
                : isCustomerValueAnalyzerPage
                ? "고객 핵심 가치 분석기"
                : isDesignAnalysisPage && projectSaas.projectTitle
                ? `디자인 감정 분석기 - ${projectSaas.projectTitle}`
                : isDesignAnalysisPage
                ? "디자인 감정 분석기"
                : isProjectCreatePage
                ? "새 프로젝트 생성"
                : projectSaas.projectTitle}
              {/* {(isPersona3Page ||
                isPersona3SinglePage ||
                isPersona3MultiplePage ||
                isPersona3PageSelect ||
                isPersona4Page ||
                isPersona4PageSingle) && (
                <>
                  <images.ChatPlus
                    color={palette.primary}
                    onClick={handleBusinessAnalysisToggle}
                  />
                  {showBusinessAnalysis && (
                    <>
                      <div className="businessAnalysis">
                        <OrganismBusinessAnalysis personaStep={2} />
                        <CloseButton onClick={handleBusinessAnalysisToggle} />
                      </div>
                    </>
                  )}
                </>
              )} */}
            </Title>
          </>
        )}

        {isProjectCreatePage && (
          <images.Logo2 color={palette.black} width="170px" height="26px" />
        )}

        {isLoggedIn && (
          <div className="gnb">
            <Sub2
              style={{ cursor: "pointer", color: palette.gray800 }}
              onClick={handleContactClick}
            >
              문의하기
            </Sub2>
            {(isRootPage || isBlogPage) && (
              <Sub2
                style={{ cursor: "pointer", color: palette.gray800 }}
                onClick={() => {
                  if (educationState) {
                    const educationLandingUrl = sessionStorage.getItem(
                      "educationLandingUrl"
                    );
                    navigate(`/${educationLandingUrl}`);
                  } else {
                    navigate("/");
                  }
                }}
              >
                서비스 소개
              </Sub2>
            )}

            <TotalCreditToggle>
              <CreditTotal
                onClick={handleCreditToggle}
                style={{ cursor: "pointer" }}
              >
                <div>
                  <span>
                    <images.CoinSmall
                      width="12px"
                      height="8px"
                      color={palette.white}
                    />
                  </span>
                  <Sub2 color="gray800">
                    {isLoggedIn
                      ? (
                          (userCredits.regular_credit || 0) +
                          (userCredits.additional_credit || 0) +
                          (userCredits.event_credit || 0)
                        ).toLocaleString()
                      : 0}
                  </Sub2>
                </div>
                <images.ChevronDown
                  width="20px"
                  height="20px"
                  color={palette.gray300}
                  style={{
                    transform: showCreditToggle
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </CreditTotal>

              {showCreditToggle && (
                <CreditToggle
                  className={isClosingCreditToggle ? "closing" : ""}
                >
                  <div className="title">
                    <Sub1 color="gray700">크레딧 내역</Sub1>
                    {isLoggedInState && (
                      <button onClick={() => navigate("/Payment")}>
                        <Caption2 color="primary">충전하기</Caption2>
                      </button>
                    )}
                  </div>

                  {isLoggedIn ? (
                    <ul>
                      <li>
                        <CreditDashBoardItem NoLine>
                          <div className="icon yellow">
                            <images.CoinFill
                              width="9.6"
                              height="6.1"
                              color="#FFD54A"
                            />
                          </div>
                          <Sub3 color="gray500" align="left">
                            일반 크레딧
                          </Sub3>
                        </CreditDashBoardItem>
                        <Sub3 color="gray500" align="right">
                          {userCredits.additional_credit.toLocaleString()}
                        </Sub3>
                      </li>
                      <li>
                        <CreditDashBoardItem NoLine>
                          <div className="icon green">
                            <images.CoinFill
                              width="9.6"
                              height="6.1"
                              color="#34C759"
                            />
                          </div>
                          <Sub3 color="gray500" align="left">
                            구독 크레딧
                          </Sub3>
                        </CreditDashBoardItem>
                        <Sub3 color="gray500" align="right">
                          {userCredits.regular_credit.toLocaleString()}
                        </Sub3>
                      </li>
                      <li>
                        <CreditDashBoardItem NoLine>
                          <div className="icon red">
                            <images.CoinFill
                              width="9.6"
                              height="6.1"
                              color="#FF5322"
                            />
                          </div>
                          <Sub3 color="gray500" align="left">
                            이벤트 크레딧
                          </Sub3>
                        </CreditDashBoardItem>
                        <Sub3 color="gray500" align="right">
                          {userCredits.event_credit.toLocaleString()}
                        </Sub3>
                      </li>
                    </ul>
                  ) : (
                    <CreditNoData>
                      <Sub3 color="gray500">
                        크레딧 내역은 로그인 후,
                        <br />
                        확인 가능합니다.
                      </Sub3>
                    </CreditNoData>
                  )}
                </CreditToggle>
              )}
            </TotalCreditToggle>

            <Notify Alarm={showRedDot} onClick={handleAlertToggle}>
              <img src={images.IconBell} alt="" />
            </Notify>
          </div>
        )}
      </HeaderWrap>

      {showAlert && (
        <AlertToogle className={isClosing ? "closing" : ""}>
          <AlertHeader>알림</AlertHeader>
          <AlertContent style={{ width: "100%" }}>
            {!isLoggedIn ? ( // 로그인 안한 상태
              <Messageox NoAlarm style={{ width: "100%" }}>
                <Sub3 color="gray500">알림은 로그인 후, 확인 가능합니다.</Sub3>
              </Messageox>
            ) : alarms.length === 0 ? ( // 로그인 했지만 알림이 없는 상태
              <Messageox NoAlarm style={{ width: "100%" }}>
                <>
                  <img src={images.NoAlarm} alt="" />
                  <p>알림이 없습니다.</p>
                </>
              </Messageox>
            ) : (
              // 로그인 상태이고 알림이 있는 경우
              <React.Fragment>
                {alarms.map((item, index) => (
                  <Messageox key={index}>
                    <img src={images.CheckMark} alt="" />
                    <Message>
                      <MessageContent>
                        <p>{item.title}</p>
                        <span>
                          {new Date(item.createTime).toLocaleString()}
                        </span>
                      </MessageContent>

                      {item.linkText && (
                        <ButtonWrap>
                          <Button onClick={() => handleLinkNavigation(item)}>
                            {item.linkText}
                          </Button>
                        </ButtonWrap>
                      )}
                    </Message>
                  </Messageox>
                ))}
              </React.Fragment>
            )}
          </AlertContent>
        </AlertToogle>
      )}

      {isContactPopupOpen && (
        <PopupWrap
          TitleFlex
          TitleBorder
          Wide
          title="문의하기"
          buttonType="Fill"
          confirmText="문의 등록하기"
          isModal={true}
          onClose={closeContactPopup}
          onCancel={closeContactPopup}
          onConfirm={handleContactSubmit}
          isFormValid={isContactFormValid()}
          body={
            <>
              <ContactUsWrap>
                <div>
                  <H5 color="gray800" align="left">
                    답변 받으실 Email 주소
                  </H5>
                  <CustomInput
                    type="text"
                    placeholder="입력하신 이메일로 답변이 발송되니, 다시 한번 확인 부탁드립니다."
                    value={contactForm.email}
                    onChange={(e) =>
                      handleContactInputChange("email", e.target.value)
                    }
                  />
                </div>
                <div>
                  <H5 color="gray800" align="left">
                    문의 목적
                  </H5>
                  <SelectBox>
                    <SelectBoxTitle onClick={handleSelectBoxClick}>
                      <Body2 color={selectedPurpose ? "gray800" : "gray500"}>
                        {selectedPurpose ||
                          "문의 하시려는 목적을 선택해 주세요."}
                      </Body2>
                      <images.ChevronDown
                        width="24px"
                        height="24px"
                        color={palette.gray500}
                        style={{
                          transform: isSelectBoxOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </SelectBoxTitle>

                    {isSelectBoxOpen && (
                      <SelectBoxList>
                        <SelectBoxItem
                          onClick={() => handlePurposeSelect("문의사항 남기기")}
                        >
                          <Body2 color="gray700" align="left">
                            문의사항 남기기
                          </Body2>
                        </SelectBoxItem>
                        <SelectBoxItem
                          onClick={() =>
                            handlePurposeSelect("서비스 이용 관련 문의")
                          }
                        >
                          <Body2 color="gray700" align="left">
                            서비스 이용 관련 문의
                          </Body2>
                        </SelectBoxItem>
                        <SelectBoxItem
                          onClick={() =>
                            handlePurposeSelect("결제 및 청구 관련 문의")
                          }
                        >
                          <Body2 color="gray700" align="left">
                            결제 및 청구 관련 문의
                          </Body2>
                        </SelectBoxItem>
                        <SelectBoxItem
                          onClick={() => handlePurposeSelect("버그 리포트")}
                        >
                          <Body2 color="gray700" align="left">
                            버그 리포트
                          </Body2>
                        </SelectBoxItem>
                        <SelectBoxItem
                          onClick={() => handlePurposeSelect("환불 요청하기")}
                        >
                          <Body2 color="gray700" align="left">
                            환불 요청하기
                          </Body2>
                        </SelectBoxItem>
                      </SelectBoxList>
                    )}
                  </SelectBox>
                </div>
                <div>
                  <H5 color="gray800" align="left">
                    문의 내용
                  </H5>
                  <CustomTextarea
                    placeholder={getPlaceholderText(selectedPurpose)}
                    rows="8"
                    value={contactForm.content}
                    onChange={(e) =>
                      handleContactInputChange("content", e.target.value)
                    }
                  />
                </div>
              </ContactUsWrap>
            </>
          }
        />
      )}
    </>
  );
};

export default MoleculeHeader;

const TotalCreditToggle = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
`;

const CreditToggle = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 240px;
  padding: 16px;
  border-radius: 5px;
  background: ${palette.white};
  box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-in-out;
  z-index: 100;

  &.closing {
    animation: fadeOut 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      font-family: "Pretendard", "Poppins";
      padding: 2px 4px;
      border-radius: 5px;
      border: 0;
      background: ${palette.chatGray};
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;

      + li {
        padding-top: 8px;
        border-top: 1px solid ${palette.chatGray};
      }
    }
  }
`;

const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  min-height: 50px;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 28px;
  border-bottom: 1px solid ${palette.lineGray};
  background: ${palette.white};
  z-index: 99;

  h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1rem;
  }

  .gnb {
    display: flex;
    align-items: center;
    gap: 32px;
    margin-left: auto;
  }

  .userInfo {
    width: 36px;
    height: 36px;
    font-size: 0;
    font-weight: 500;
    border-radius: 100px;
    background: ${palette.gray200};
  }
`;

const Title = styled(Body2)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    cursor: pointer;

    &:hover {
      path {
        fill: #0b45b1;
      }
    }
  }

  .businessAnalysis {
    position: absolute;
    top: 30px;
    // left: 77px;
    left: 50%;
    transform: none;
    width: 816px;
    margin-left: -408px;
    z-index: 100;
    animation: fadeIn 0.3s ease-in-out;
    border-radius: 15px;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
    overflow: hidden;

    > div:nth-child(1) {
      display: none;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 32px;
  right: 24px;
  width: 16px;
  height: 16px;
  cursor: pointer;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;
    height: 2px;
    background: ${palette.gray700};
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

const Notify = styled.div`
  position: relative;
  cursor: pointer;

  ${(props) =>
    props.Alarm &&
    css`
      &::after {
        position: absolute;
        top: -5px;
        right: -5px;
        width: 6px;
        height: 6px;
        background: ${palette.red};
        border-radius: 100px;
        content: "";
        animation: blink 1.5s infinite;
      }

      @keyframes blink {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    `}
`;

const AlertToogle = styled.div`
  position: fixed;
  top: 40px;
  right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 396px;
  width: 100%;
  // margin-top: 20px;
  margin-top: 3px;
  border-radius: 15px;
  background: ${palette.white};
  filter: drop-shadow(0px 4px 30px rgba(0, 0, 0, 0.15));
  z-index: 99;
  animation: fadeIn 0.3s ease-in-out;

  &.closing {
    animation: fadeOut 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }

  &:before {
    position: absolute;
    top: -10px;
    right: 70px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${palette.white};
    // content: '';
  }
`;

const AlertHeader = styled.div`
  width: 100%;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;
  padding: 20px 16px;
  border-bottom: 1px solid ${palette.outlineGray};
`;

const AlertContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  overflow-y: auto;
  max-height: 460px;
`;

const Messageox = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.NoAlarm ? "column" : "row")};
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: ${(props) => (props.NoAlarm ? "38px 0" : "16px")};
  // padding: 16px;
  transition: all 0.5s;

  > p {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${palette.gray500};
  }

  > img {
    width: 28px;
    height: 28px;
  }

  & + & {
    border-top: 1px solid ${palette.outlineGray};
  }

  &:hover {
    background: ${(props) =>
      props.NoAlarm ? "transparent" : "rgba(34, 111, 255, 0.04)"};
    // background: rgba(34, 111, 255, 0.04);
  }
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  p {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray800};
    text-align: left;
  }

  strong {
    font-weight: 500;
  }

  span {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray500};
    text-align: left;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

const Button = styled.div`
  font-size: 0.75rem;
  line-height: 1.2;
  color: ${palette.primary};
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid ${palette.primary};
  background: ${palette.white};
  cursor: pointer; /* 추가된 부분 */
`;

const ContactUsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid ${palette.outlineGray};

  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
`;
