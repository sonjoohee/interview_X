import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  IS_PERSONA_ACCESSIBLE,
  IS_LOGGED_IN,
  PERSONA_STEP,
  SELECTED_INTERVIEW_PURPOSE,
  PERSONA_LIST,
  PERSONA_BUTTON_STATE_3,
  BUSINESS_ANALYSIS,
  SELECTED_INTERVIEW_TYPE,
  SELECTED_INTERVIEW_PURPOSE_DATA,
  PURPOSE_ITEMS_SINGLE,
  CUSTOM_THEORY_DATA,
  CREDIT_CUSTOM_THEORY,
  EVENT_STATE,
  EVENT_TITLE,
  TRIAL_STATE,
  USER_CREDITS,
  CREDIT_CREATE_TOOL_LOADED,
  CREDIT_CREATE_INTERVIEW,
  EDUCATION_STATE,
} from "../../../AtomStates";
import {
  ContentsWrap,
  MainContent,
  Title,
  TabWrapType5,
  TabButtonType5,
  TabContent5,
  TabContent5Item,
  BoxWrap,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import { H3, Body1, Body2, Body3 } from "../../../../assets/styles/Typography";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import OrganismIncNavigation from "../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../Global/molecules/MoleculeHeader";
import MoleculePersonaCard from "../molecules/MoleculePersonaCard";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";
import PopupWrap from "../../../../assets/styles/Popup";
import OrganismToastPopup from "../organisms/OrganismToastPopup";
import MoleculeInterviewPurpose from "../molecules/MoleculeInterviewPurpose.jsx";
import OrganismCustomization from "../organisms/OrganismCustomization.jsx";
import {
  UserCreditCheck,
  UserCreditUse,
  UserCreditInfo,
} from "../../../../utils/indexedDB";

const FULL_DEFINITION_TEXT =
  "사용자 트렌드 민감도 분석은 사용자가 시장의 최신 트렌드에 얼마나 빠르고 효과적으로 반응하는지를 측정하는 방법론입니다. 이 분석은 사용자가 새로운 트렌드를 어떻게 인식하고, 그 트렌드에 따라 행동이 어떻게 변화하는지 파악하는 데 중점을 둡니다.";

const PagePersona3Single = () => {
  const navigate = useNavigate();

  const [, setUserCredits] = useAtom(USER_CREDITS);
  const [creditCreateToolLoaded] = useAtom(CREDIT_CREATE_TOOL_LOADED);
  const [creditCreateInterview] = useAtom(CREDIT_CREATE_INTERVIEW);
  const [educationState] = useAtom(EDUCATION_STATE);
  const [eventState] = useAtom(EVENT_STATE);
  const [eventTitle] = useAtom(EVENT_TITLE);
  const [trialState] = useAtom(TRIAL_STATE);
  const [creditCustomTheory] = useAtom(CREDIT_CUSTOM_THEORY);
  const [customTheoryData] = useAtom(CUSTOM_THEORY_DATA);
  const [, setPersonaButtonState3] = useAtom(PERSONA_BUTTON_STATE_3);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [, setIsPersonaAccessible] = useAtom(IS_PERSONA_ACCESSIBLE);
  const [businessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [, setPersonaStep] = useAtom(PERSONA_STEP);
  const [selectedInterviewPurpose, setSelectedInterviewPurpose] = useAtom(
    SELECTED_INTERVIEW_PURPOSE
  );
  const [personaList, setPersonaList] = useAtom(PERSONA_LIST);
  const [, setSelectedInterviewPurposeData] = useAtom(
    SELECTED_INTERVIEW_PURPOSE_DATA
  );
  const [purposeItemsSingleAtom, setPurposeItemsSingleAtom] =
    useAtom(PURPOSE_ITEMS_SINGLE);
  const [selectedInterviewType, setSelectedInterviewType] = useAtom(
    SELECTED_INTERVIEW_TYPE
  );

  const [, setShowPopup] = useState(false);
  const [showCustomButton, setShowCustomButton] = useState(true);
  const [customizations, setCustomizations] = useState([]);
  const [, setShowCustomization] = useState(false);
  const [showQuestions, setShowQuestions] = useState({
    radio3: false,
    radio4: false,
    radio5: false,
  });
  const [, setShowNewListBox] = useState(false);
  const [showInterviewReady, setShowInterviewReady] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showEditPersona, setShowEditPersona] = useState(false);
  const [personaListState, setPersonaListState] = useState(null);
  const [showInterviewTypeAlert, setShowInterviewTypeAlert] = useState(false);
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [activeTab] = useState(1);
  const [interviewModeType, setInterviewModeType] = useState("");
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [interviewModeStep, setInterviewModeStep] = useState(true);
  const [showCreatePersonaPopup, setShowCreatePersonaPopup] = useState(false);
  const [showCreditLessPopup, setShowCreditLessPopup] = useState(false);

  useEffect(() => {
    const checkCredit = async () => {
      if (!creditCreateToolLoaded) {
        setShowCreatePersonaPopup(true);
        // 크레딧 사용전 사용 확인
        const creditPayload = {
          // 기존 10 대신 additionalQuestionMount 사용
          mount: creditCreateInterview,
        };
        const creditResponse = await UserCreditCheck(creditPayload, isLoggedIn);

        if (creditResponse?.state !== "use") {
          setShowCreditLessPopup(true);
          return;
        }
      }
    };
    checkCredit();
  }, []);

  const handlePopupClose = () => {
    setShowInterviewReady(false);
    setShowToast(false);
    setShowConfirmationPopup(false);
  };
  const handleSelectPersona = () => {
    // 선택된 페르소나들을 selected에 반영
    setPersonaStep(3);
    setIsPersonaAccessible(true);
    navigate(`/Persona/3/Select`, { replace: true });
  };

  const handleConfirmInterviewMode = () => {
    if (interviewModeType === "selfQuestion") {
      // 내가 질문하기를 선택한 경우 페르소나 선택으로 이동
      setSelectedInterviewType("singleLive");

      const selectedPurpose = {
        id: 5,
        theory_title: "자율 인터뷰",
        title: "자율 인터뷰",
        view_title: "자율 인터뷰",
        definition:
          "자율 인터뷰는 사용자가 직접 질문을 구성하고 진행하는 방식으로, 페르소나와의 자유로운 대화를 통해 심층적인 인사이트를 도출하는 방법론입니다. 사용자의 관심사와 목적에 맞춘 맞춤형 질문을 통해 더욱 구체적이고 실질적인 피드백을 얻을 수 있습니다.",
        objective:
          "사용자가 직접 설계한 질문을 통해 페르소나의 경험과 니즈를 심층적으로 이해하고, 자유로운 대화 흐름 속에서 예상하지 못한 인사이트를 발견하여 서비스 개선에 활용합니다.",
        characteristic: [
          "사용자 주도의 자유로운 질문 설계",
          "페르소나와의 자연스러운 대화 흐름",
          "예상치 못한 인사이트 발견 가능",
          "구체적이고 깊이 있는 피드백 수집",
        ],
        description: "사용자 커스텀 방법론",
        custom_theory_data: {
          theory_title: "자율 인터뷰",
          definition:
            "자율 인터뷰는 사용자가 직접 질문을 구성하고 진행하는 방식으로, 페르소나와의 자유로운 대화를 통해 심층적인 인사이트를 도출하는 방법론입니다. 사용자의 관심사와 목적에 맞춘 맞춤형 질문을 통해 더욱 구체적이고 실질적인 피드백을 얻을 수 있습니다.",
          objective:
            "사용자가 직접 설계한 질문을 통해 페르소나의 경험과 니즈를 심층적으로 이해하고, 자유로운 대화 흐름 속에서 예상하지 못한 인사이트를 발견하여 서비스 개선에 활용합니다.",
          characteristic: [
            "사용자 주도의 자유로운 질문 설계",
            "페르소나와의 자연스러운 대화 흐름",
            "예상치 못한 인사이트 발견 가능",
            "구체적이고 깊이 있는 피드백 수집",
          ],
          expected_result:
            "사용자의 관심사와 목적에 최적화된 인터뷰를 통해 더욱 실질적이고 구체적인 인사이트를 도출하며, 자유로운 대화 속에서 새로운 관점과 개선 기회를 발견합니다.",
          interview_purpose:
            "사용자가 직접 설계한 질문을 통해 페르소나의 경험과 니즈를 심층적으로 이해하고 새로운 인사이트 도출",
          question_list: [
            {
              question_type: "특화질문",
              question:
                "자율 인터뷰에서 어떤 유형의 질문이 가장 효과적인 답변을 이끌어내나요?",
            },
            {
              question_type: "특화질문",
              question:
                "자유로운 대화 흐름 속에서 발견한 예상치 못한 인사이트는 무엇이었나요?",
            },
            {
              question_type: "특화질문",
              question:
                "자율 인터뷰를 통해 얻은 피드백이 기존 인터뷰 방식과 비교했을 때 어떤 차이가 있나요?",
            },
            {
              question_type: "특화질문",
              question:
                "자율 인터뷰 진행 시 가장 중요하게 고려해야 할 점은 무엇이라고 생각하나요?",
            },
          ],
        },
      };
      setSelectedInterviewPurposeData(selectedPurpose);

      handleSelectPersona();
    } else {
      // 모더레이터에게 요청하기를 선택한 경우 기존 플로우 진행
      setSelectedInterviewType("single");
      setShowConfirmationPopup(false);
      setInterviewModeStep(false);
    }
  };

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  const purposeItemsSingle = [
    {
      id: 1,
      category: "제품 사용 경험",
      title: "소비자 가치 우선순위 분석",
      view_title: "소비자 중요 가치 분석",
      description: "고객이 가장 원하는 가치를 이해하고 효과적인 전략 수립",
      theory_data:
        "(1) 정의: 소비자가 제품/서비스에서 중요하게 여기는 핵심 가치를 식별하고, 각 요소의 우선순위를 분석하는 방법론.\n(2) 방법론 목적: 소비자 중심의 가치 기반 전략 수립 및 차별화된 브랜드 포지셔닝 강화.\n(3) 주요 특징: 소비자의 주요 가치 요소(가격, 품질, 지속 가능성 등) 탐구, 가치 간 우선순위를 식별하고, 중요도를 기반으로 개선 방향 제안.\n(4) 기대 결과: 소비자의 핵심 니즈를 충족시키고, 브랜드의 차별성을 강화하는 데 필요한 전략 도출.\n(5) 인터뷰 목적: 소비자가 제품/서비스에서 가장 중요하게 여기는 가치를 식별하고, 이를 기반으로 개선 및 차별화 전략을 도출.",
    },
    {
      id: 2,
      category: "제품 사용 경험",
      title: "감성적 가치 평가",
      view_title: "감성적 매력 평가",
      description: "고객이 제품/서비스에 느끼는 감정을 분석하여 매력 향상",
      theory_data:
        "(1) 정의: 감성적 가치 평가는 소비자가 제품/서비스에서 기대하는 감정(감성)과 실제 느낀 감정(감성)을 탐구하여, 두 감정 간의 차이를 분석하고 개선 방안을 도출하는 방법론.\n(2) 방법론 목적: 소비자가 제품/서비스에서 기대하는 감정(감성)과 실제 느낀 감정(감성)의 차이를 탐구하고, 이러한 갭 차이를 완화하여 소비자 경험의 정서적 가치를 극대화하고, 제품/서비스의 만족도를 높임.\n(3) 주요 특징: 소비자가 제품/서비스에서 기대하는 감정과 실제 느낀 감정을 비교 분석, 제품/서비스 경험에서 감성적 갭 차이를 식별하고 개선 방안을 도출.\n(4) 기대 결과: 기대 감정과 실제 감정의 차이를 줄여 소비자 경험의 품질을 향상, 감성적 경험을 바탕으로 소비자 만족도를 극대화하기 위한 실질적 개선 방향 제안.\n(5) 인터뷰 목적: 소비자가 제품/서비스에서 느끼는 기대 감정(감성)과 실제 감정(감성)을 탐구하여 갭 차이를 완화하기 위한 개선 방안을 도출.",
    },
    {
      id: 3,
      category: "구매 및 소비 심리",
      title: "구매 장벽 및 유인 요소 분석",
      view_title: "구매 요인과 장애물 분석",
      description: "구매 결정을 방해하는 요인과 구매를 이끄는 핵심 발굴",
      theory_data:
        "(1) 정의: 소비자가 제품/서비스를 구매하지 않는 주요 이유(장벽)를 분석하고, 구매를 유도할 수 있는 요소(유인 요소)를 파악하는 방법론.\n(2) 방법론 목적: 구매 결정 과정에서 발생하는 장애물을 제거하고, 구매를 촉진할 수 있는 전략을 개발.\n(3) 주요 특징: 구매 의사결정을 저해하는 주요 요소(가격, 신뢰도, 정보 부족 등) 탐구, 구매를 유도하는 핵심 요인(프로모션, 후기, 브랜드 이미지 등) 분석\n(4) 기대 결과: 구매 전환율을 높이고, 구매 장벽을 제거하기 위한 실행 가능한 개선안 제안.\n(5) 인터뷰 목적: 소비자가 구매를 망설이는 이유 파악, 구매 결정을 이끌어낼 유인 요소 탐구.",
    },
  ];

  useEffect(() => {
    setPurposeItemsSingleAtom(purposeItemsSingle);
    if (customTheoryData?.theory_title) {
      const generatedQuestions = {
        id: 4,
        title: customTheoryData?.theory_title || "",
        theory_title: customTheoryData?.theory_title || "",
        view_title: customTheoryData?.theory_title || "",
        definition: customTheoryData?.definition || "",
        objective: customTheoryData?.objective || "",
        characteristic: customTheoryData?.characteristic || [],
        description: "사용자 커스텀 방법론" || "",
        custom_theory_data: customTheoryData || "",
      };
      setPurposeItemsSingleAtom((prev) => [...prev, generatedQuestions]);
    }
  }, [setPurposeItemsSingleAtom]);

  const handleEnterInterviewRoom = () => {
    setPersonaStep(4);
    setPersonaButtonState3(1);
    handlePopupClose();
    setShowToast(true);
  };

  // 페르소나 선택/해제 처리 함수 추가
  const handlePersonaToggle = (persona, isCurrentlySelected) => {
    if (isCurrentlySelected) {
      // selected에서 제거하고 unselected로 이동
      if (personaListState.selected.length > 1) {
        setPersonaListState({
          selected: personaListState.selected.filter(
            (p) => p.persona !== persona.persona
          ),
          unselected: [...personaListState.unselected, persona],
        });
      }
    } else {
      // 선택 개수가 5개 미만일 때만 추가 허용
      if (personaListState.selected.length < 5) {
        setPersonaListState({
          selected: [...personaListState.selected, persona],
          unselected: personaListState.unselected.filter(
            (p) => p.persona !== persona.persona
          ),
        });
      }
    }
  };

  // 이전으로 되돌리기
  const handleRevertPersonaList = () => {
    setPersonaListState(personaList);
  };

  // 편집 완료
  const handleConfirmEditPersona = () => {
    setPersonaList(personaListState);
    setShowEditPersona(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // 팝업이나 토스트가 열려있을 때
    if (
      showToast ||
      showInterviewReady ||
      showEditPersona ||
      showConfirmationPopup
    ) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px"; // 스크롤바 자리만큼 패딩 추가
    }
    // 팝업이나 토스트가 닫혔을 때
    else {
      document.body.style.overflow = "auto"; // "hidden"에서 "auto"로 변경
      document.body.style.paddingRight = "0";
    }

    // 컴포넌트가 언마운트될 때 원래대로 복구
    return () => {
      document.body.style.overflow = "auto"; // "hidden"에서 "auto"로 변경
      document.body.style.paddingRight = "0";
    };
  }, [showToast, showInterviewReady, showEditPersona, showConfirmationPopup]);

  // radio6 선택 핸들러 수정
  const handlePurposeSelect = (purpose) => {
    const selectedPurpose = purposeItemsSingleAtom.find(
      (item) => item.id === purpose
    );

    setSelectedInterviewPurposeData(selectedPurpose);
    setSelectedInterviewPurpose(purpose);
  };

  const handleCloseRequestPopup = async () => {
    try {
      const creditPayload = {
        mount: creditCustomTheory,
      };

      const creditResponse = await UserCreditCheck(creditPayload, isLoggedIn);

      if (creditResponse?.state !== "use") {
        setShowRequestPopup(false);
        setShowCreditPopup(true);
        return;
      }

      // 만약 creditResponse.state가 "use"라면 아래 payload 형식으로 API 호출
      const creditUsePayload = {
        title: businessAnalysis.title,
        service_type: "커스텀 방법론",
        target: "",
        state: "use",
        mount: creditCustomTheory,
      };

      await UserCreditUse(creditUsePayload, isLoggedIn);

      setShowRequestPopup(false);
      setShowCustomButton(false);
      setCustomizations((prev) => [
        ...prev,
        {
          id: Date.now(),
          purposeText: "",
          showMethodology: false,
          isEditing: false,
          definitionText: FULL_DEFINITION_TEXT,
          editedDefinition: "",
          editedPurpose: "",
        },
      ]);
      // 크레딧 사용 후 사용자 정보 새로고침
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        const userCreditValue = await UserCreditInfo(isLoggedIn);

        // 전역 상태의 크레딧 정보 업데이트
        setUserCredits(userCreditValue);
      }
    } catch (error) {
      console.error("크레딧 체크 실패:", error);
      setShowCreditPopup(true);
    }
  };

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("persona3single")) {
        // 세션 스토리지에서 마지막 URL 가져오기
        const lastUrl = sessionStorage.getItem("lastUrl");

        // 마지막 URL이 현재 URL과 같으면 새로고침
        if (lastUrl && lastUrl === currentUrl) {
          navigate("/Project");
          return true;
        }

        // 현재 URL 저장
        sessionStorage.setItem("lastUrl", currentUrl);
      }

      return false;
    };

    // F5 키 또는 Ctrl+R 감지
    const handleKeyDown = (event) => {
      if (
        (event.key === "r" && (event.metaKey || event.ctrlKey)) ||
        event.key === "F5"
      ) {
        // F5 키 코드
        event.preventDefault();
        navigate("/Project");
      }
    };

    // 함수 실행
    detectRefresh();

    // 이벤트 리스너 등록
    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  const handleConfirmCredit = async () => {
    setShowCreatePersonaPopup(false);
  };

  return (
    <>
      <ContentsWrap
        noScroll={Boolean(
          showToast ||
            showInterviewReady ||
            showEditPersona ||
            showConfirmationPopup
        )}
      >
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1030>
          <PersonaSingleWrap>
            <TabWrapType5>
              <TabButtonType5 isActive>
                <span>01</span>
                <div className="text">
                  <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                    인터뷰 목표 설정
                  </Body1>
                  <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                    Interview Define
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5>
                <span>02</span>
                <div className="text">
                  <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    페르소나 선택
                  </Body1>
                  <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    Persona Selection
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5>
                <span>03</span>
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    {selectedInterviewType === "multiple"
                      ? "그룹 인터뷰"
                      : "심층 인터뷰"}
                  </Body1>
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    {selectedInterviewType === "multiple"
                      ? "Group Interview"
                      : "Indepth Interview"}
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5>
                <span>04</span>
                <div className="text">
                  <Body1 color={activeTab >= 4 ? "gray700" : "gray300"}>
                    최종 인사이트 분석
                  </Body1>
                </div>
              </TabButtonType5>
            </TabWrapType5>

            <TabContent5>
              <div className="title">
                <H3 color="gray800">Interview Method Select</H3>
                <Body3 color="gray800">
                  상황에 알맞은 방식을 선택해, 인사이트를 보다 효과적으로
                  얻어보세요.
                </Body3>
              </div>

              {interviewModeStep && (
                <div className="content">
                  <TabContent5Item>
                    {/* <div className="title">
                      <Body1 color="gray700">인터뷰 방식 선택</Body1>
                    </div> */}

                    <InterviewModeSelection>
                      <InterviewModeCard
                        isActive={interviewModeType === "selfQuestion"}
                        onClick={() => setInterviewModeType("selfQuestion")}
                      >
                        <CardContent>
                          <img
                            src={images.InterviewModeSelfQuestion}
                            alt="self question"
                          />
                          <div>
                            <Body2 color="gray700">내가 질문하기</Body2>
                            <Body3
                              style={{ marginTop: "10px" }}
                              color="gray500"
                            >
                              원하는 질문을 직접 입력하여 Persona에게
                              <br />
                              답을 얻을 수 있습니다.
                            </Body3>
                          </div>
                        </CardContent>
                        <CheckboxWrapper>
                          <CheckCircle
                            as="input"
                            type="radio"
                            id="selfQuestion"
                            name="interviewMode"
                            checked={interviewModeType === "selfQuestion"}
                            onChange={() =>
                              setInterviewModeType("selfQuestion")
                            }
                          />
                        </CheckboxWrapper>
                      </InterviewModeCard>

                      <InterviewModeCard
                        isActive={interviewModeType === "moderator"}
                        onClick={() => setInterviewModeType("moderator")}
                      >
                        <CardContent>
                          <img
                            src={images.InterviewModeModerator}
                            alt="moderator"
                          />
                          <div>
                            <Body2 color="gray700">
                              AI 모더레이터에게 요청하기
                            </Body2>
                            <Body3
                              style={{ marginTop: "10px" }}
                              color="gray500"
                            >
                              원하는 사항을 요청, Moderator가 직접
                              <br />
                              적합한 질문을 하여 답을 얻을 수 있습니다.
                            </Body3>
                          </div>
                        </CardContent>
                        <CheckboxWrapper>
                          <CheckCircle
                            as="input"
                            type="radio"
                            id="moderator"
                            name="interviewMode"
                            checked={interviewModeType === "moderator"}
                            onChange={() => setInterviewModeType("moderator")}
                          />
                        </CheckboxWrapper>
                      </InterviewModeCard>
                    </InterviewModeSelection>
                  </TabContent5Item>
                </div>
              )}

              {interviewModeStep && (
                <Button
                  Other
                  Primary
                  Fill
                  disabled={!interviewModeType}
                  onClick={() => setShowConfirmationPopup(true)}
                >
                  확인
                </Button>
              )}

              {!interviewModeStep && (
                <div className="content">
                  <TabContent5Item>
                    <div className="title">
                      <Body1 color="gray700">맞춤형 인터뷰 문항 생성</Body1>
                    </div>

                    <CustomizationWrap>
                      {showCustomButton &&
                        (!customTheoryData ||
                          Object.keys(customTheoryData).length === 0) && (
                          <BoxWrap
                            NoData
                            onClick={() => setShowRequestPopup(true)}
                          >
                            <img src={images.NoData} alt="no data" />
                            <Body2 color="gray700" align="center">
                              페르소나에게 어떤 인사이트를 얻고 싶은가요? 원하는
                              목적을 직접 입력하세요
                            </Body2>
                          </BoxWrap>
                        )}

                      <OrganismCustomization
                        customizations={customizations}
                        setCustomizations={setCustomizations}
                        setShowPopup={setShowPopup}
                        setShowNewListBox={setShowNewListBox}
                        setShowCustomization={setShowCustomization}
                        setShowCustomButton={setShowCustomButton}
                        setShowQuestions={setShowQuestions}
                      />

                      {purposeItemsSingleAtom.slice(3).map((purpose) => (
                        <MoleculeInterviewPurpose
                          Small
                          key={purpose.id}
                          purpose={purpose}
                          selectedPurpose={selectedInterviewPurpose}
                          showQuestions={showQuestions}
                          onPurposeSelect={handlePurposeSelect}
                          toggleQuestions={(id) =>
                            setShowQuestions((prev) => ({
                              ...prev,
                              [id]: !prev[id],
                            }))
                          }
                        />
                      ))}
                    </CustomizationWrap>
                  </TabContent5Item>
                </div>
              )}

              {!interviewModeStep && (
                <div className="content">
                  <TabContent5Item>
                    <Body1 color="gray700" align="left">
                      추천 질문 템플릿
                    </Body1>

                    {purposeItemsSingleAtom.slice(0, 3).map((purpose) => (
                      <MoleculeInterviewPurpose
                        Small
                        key={purpose.id}
                        purpose={purpose}
                        selectedPurpose={selectedInterviewPurpose}
                        showQuestions={showQuestions}
                        onPurposeSelect={handlePurposeSelect}
                        toggleQuestions={(id) =>
                          setShowQuestions((prev) => ({
                            ...prev,
                            [id]: !prev[id],
                          }))
                        }
                      />
                    ))}
                  </TabContent5Item>
                </div>
              )}

              {!interviewModeStep && (
                <Button
                  Other
                  Primary
                  Fill
                  disabled={!selectedInterviewPurpose}
                  onClick={handleSelectPersona}
                >
                  다음
                </Button>
              )}
            </TabContent5>

            {/* 인터뷰 모드 확인 팝업 */}
            {showConfirmationPopup && (
              <PopupWrap
                Check
                title="인터뷰 방식 선택 확인"
                message={
                  <>
                    {interviewModeType === "selfQuestion"
                      ? "내가 질문하기 방식으로 인터뷰를 진행합니다."
                      : "모더레이터에게 요청하기 방식으로 인터뷰를 진행합니다."}
                  </>
                }
                buttonType="Outline"
                closeText="취소"
                confirmText="확인"
                isModal={false}
                onCancel={handlePopupClose}
                onConfirm={handleConfirmInterviewMode}
              />
            )}

            {/* 크레딧 소진팝업 */}
            {showCreditPopup && (
              <PopupWrap
                Warning
                title="크레딧이 모두 소진되었습니다"
                message={
                  <>
                    보유한 크레딧이 부족합니다.
                    <br />
                    크레딧을 충전한 후 다시 시도해주세요.
                  </>
                }
                buttonType="Outline"
                closeText="확인"
                isModal={false}
                onCancel={() => setShowCreditPopup(false)}
                onConfirm={() => setShowCreditPopup(false)}
              />
            )}

            {/* 인터뷰 커스터마이징 하기 팝업 */}
            {showRequestPopup &&
              (eventState ? (
                <PopupWrap
                  Event
                  title="인터뷰 커스터마이징 하기"
                  message={
                    <>
                      현재 {eventTitle} 기간으로 이벤트 크레딧이 소진됩니다.
                      <br />({creditCustomTheory} 크레딧)
                    </>
                  }
                  buttonType="Outline"
                  closeText="취소"
                  confirmText="시작하기"
                  isModal={false}
                  onCancel={() => setShowRequestPopup(false)}
                  onConfirm={handleCloseRequestPopup}
                />
              ) : trialState ? (
                <PopupWrap
                  Check
                  title="인터뷰 커스터마이징 하기"
                  message={
                    <>
                      해당 서비스 사용시 크레딧이 소진됩니다.
                      <br />({creditCustomTheory} 크레딧)
                      {/* <br />
                      신규 가입 2주간 무료로 사용 가능합니다. */}
                    </>
                  }
                  buttonType="Outline"
                  closeText="취소"
                  confirmText="시작하기"
                  isModal={false}
                  onCancel={() => setShowRequestPopup(false)}
                  onConfirm={handleCloseRequestPopup}
                />
              ) : (
                <PopupWrap
                  Check
                  title="인터뷰 커스터마이징 하기"
                  message={
                    <>
                      해당 서비스 사용시 크레딧이 소진됩니다.
                      <br />({creditCustomTheory} 크레딧)
                    </>
                  }
                  buttonType="Outline"
                  closeText="취소"
                  confirmText="시작하기"
                  isModal={false}
                  onCancel={() => setShowRequestPopup(false)}
                  onConfirm={handleCloseRequestPopup}
                />
              ))}

            {showEditPersona && (
              <PopupWrap
                TitleFlex
                title="📝 페르소나 편집하기"
                buttonType="Fill"
                closeText="닫기"
                confirmText="편집완료"
                isModal={true}
                isFormValid={true}
                onCancel={() => setShowEditPersona(false)}
                onConfirm={() => {
                  handleConfirmEditPersona();
                }}
                body={
                  <>
                    <Title>
                      <p>
                        Selected
                        <span onClick={handleRevertPersonaList}>
                          <img src={images.ClockCounterclockwise} alt="" />
                          이전으로 되돌리기
                        </span>
                      </p>
                    </Title>
                    {personaListState.selected.map((persona, index) => {
                      const profileArray = persona.profile
                        .replace(/['\[\]]/g, "")
                        .split(", ");
                      const age = profileArray[0].split(": ")[1];
                      const gender =
                        profileArray[1].split(": ")[1] === "남성"
                          ? "남성"
                          : "여성";
                      const job = profileArray[2].split(": ")[1];

                      return (
                        <MoleculePersonaCard
                          key={index}
                          TitleFlex
                          title={persona.persona}
                          keywords={persona.keywords || []}
                          isBasic={true}
                          checked={true}
                          onSelect={() => handlePersonaToggle(persona, true)}
                          gender={gender}
                          age={age}
                          job={job}
                          newLine={true}
                        />
                      );
                    })}

                    <Title style={{ marginTop: "20px" }}>
                      <p>Available</p>
                    </Title>
                    {personaListState.unselected.map((persona, index) => {
                      const profileArray = persona.profile
                        .replace(/['\[\]]/g, "")
                        .split(", ");
                      const age = profileArray[0].split(": ")[1];
                      const gender =
                        profileArray[1].split(": ")[1] === "남성"
                          ? "남성"
                          : "여성";
                      const job = profileArray[2].split(": ")[1];

                      return (
                        <MoleculePersonaCard
                          key={index}
                          TitleFlex
                          title={persona.persona}
                          keywords={persona.keywords || []}
                          isBasic={true}
                          checked={false}
                          onSelect={() => handlePersonaToggle(persona, false)}
                          gender={gender}
                          age={age}
                          job={job}
                          newLine={true}
                        />
                      );
                    })}
                  </>
                }
              />
            )}

            {showInterviewReady && (
              <PopupWrap
                Check
                title="인터뷰 준비 완료"
                message={
                  <>
                    인터뷰 룸 이동 시, 바로 시작됩니다.
                    <br />
                    인터뷰를 중단하면 모든 내역이 삭제되니 주의하세요
                  </>
                }
                buttonType="Outline"
                closeText="취소"
                confirmText="시작하기"
                isModal={false}
                onCancel={handlePopupClose}
                onConfirm={() => {
                  handleEnterInterviewRoom();
                }}
              />
            )}

            {showToast && (
              <OrganismToastPopup
                isActive={showToast}
                onClose={() => setShowToast(false)}
              />
            )}

            {showInterviewTypeAlert && (
              <PopupWrap
                Warning
                title="인터뷰 방식을 선택해주세요"
                message="인터뷰 목적을 선택하기 전에 인터뷰 방식을 먼저 선택해주세요."
                buttonType="Outline"
                confirmText="확인"
                isModal={false}
                onCancel={() => setShowInterviewTypeAlert(false)}
                onConfirm={() => setShowInterviewTypeAlert(false)}
              />
            )}

            {showCreatePersonaPopup &&
              (eventState && !educationState ? (
                <PopupWrap
                  Event
                  title="심층 인터뷰 룸"
                  message={
                    <>
                      현재 {eventTitle} 기간으로 이벤트 크레딧이 소진됩니다.
                      <br />({creditCreateInterview} 크레딧)
                    </>
                  }
                  buttonType="Outline"
                  closeText="취소"
                  confirmText="시작하기"
                  isModal={false}
                  onCancel={() => {
                    setShowCreatePersonaPopup(false);
                    navigate("/Tool");
                  }}
                  onConfirm={handleConfirmCredit}
                />
              ) : trialState && !educationState ? (
                <PopupWrap
                  Check
                  title="심층 인터뷰 룸"
                  message={
                    <>
                      해당 서비스 사용시 크레딧이 소진됩니다.
                      <br />({creditCreateInterview} 크레딧)
                      {/* <br />
                신규 가입 2주간 무료로 사용 가능합니다. */}
                    </>
                  }
                  buttonType="Outline"
                  closeText="취소"
                  confirmText="시작하기"
                  isModal={false}
                  onCancel={() => {
                    setShowCreatePersonaPopup(false);
                    navigate("/Tool");
                  }}
                  onConfirm={handleConfirmCredit}
                />
              ) : (
                <PopupWrap
                  Check
                  title="심층 인터뷰 룸"
                  message={
                    <>
                      해당 서비스 사용시 크레딧이 소진됩니다.
                      <br />({creditCreateInterview} 크레딧)
                    </>
                  }
                  buttonType="Outline"
                  closeText="취소"
                  confirmText="시작하기"
                  isModal={false}
                  onCancel={() => {
                    setShowCreatePersonaPopup(false);
                    navigate("/Tool");
                  }}
                  onConfirm={handleConfirmCredit}
                />
              ))}
            {showCreditLessPopup && (
              <PopupWrap
                Warning
                title="크레딧이 모두 소진되었습니다"
                message={
                  <>
                    보유한 크레딧이 부족합니다.
                    <br />
                    크레딧을 충전한 후 다시 시도해주세요.
                  </>
                }
                buttonType="Outline"
                closeText="확인"
                isModal={false}
                onCancel={() => {
                  setShowCreditLessPopup(false);
                  navigate("/Tool");
                }}
                onConfirm={() => {
                  setShowCreditLessPopup(false);
                  navigate("/Tool");
                }}
              />
            )}
          </PersonaSingleWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PagePersona3Single;

const PersonaSingleWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin-top: 60px;
`;

const InterviewModeSelection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  justify-content: center;
  margin-bottom: 30px;

  .button-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 20px;
  }
`;

const InterviewModeCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 30px;
  border-radius: 10px;
  border: 1px solid
    ${(props) => (props.isActive ? palette.primary : palette.outlineGray)};
  cursor: pointer;
  background-color: ${(props) =>
    props.isActive ? "rgba(34, 111, 255, 0.05)" : "white"};
  position: relative;
  width: calc(50% - 10px);

  &:hover {
    border-color: ${palette.primary};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;

  img {
    width: 48px;
    height: 48px;
    margin-bottom: 4px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  margin-left: 0;
`;

const CustomizationWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  cursor: pointer;

  > div {
    width: 100%;
  }

  button span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid ${palette.gray700};

    &::before,
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 1px;
      background: ${palette.gray700};
      content: "";
    }

    &::after {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
`;

export const CheckCircle = styled.input`
  appearance: none;
  display: block !important;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  background-image: ${(props) =>
    props.checked
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23226FFF'/%3E%3Cpath d='M6.76562 12.4155L9.9908 15.6365L17.2338 8.36426' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='11.5' stroke='%23E0E4EB'/%3E%3C/svg%3E")`};
  transition: background-image 0.3s ease-in-out;

  + label {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;

    + label {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;
