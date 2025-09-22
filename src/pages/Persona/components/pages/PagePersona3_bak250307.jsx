import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import {
  IS_PERSONA_ACCESSIBLE,
  IS_LOGGED_IN,
  PERSONA_STEP,
  SELECTED_INTERVIEW_PURPOSE,
  PERSONA_LIST,
  PERSONA_BUTTON_STATE_3,
  BUSINESS_ANALYSIS,
  REQUEST_PERSONA_LIST,
  PROJECT_LOAD_BUTTON_STATE,
  PROJECT_ID,
  SELECTED_INTERVIEW_TYPE,
  SELECTED_INTERVIEW_PURPOSE_DATA,
  PURPOSE_ITEMS_SINGLE,
  CUSTOM_THEORY_DATA,
  CREDIT_CUSTOM_THEORY,
  EVENT_STATE,
  EVENT_TITLE,
  TRIAL_STATE,
  USER_CREDITS,
} from "../../../AtomStates";
// import { SELECTED_INTERVIEW_TYPE } from "../../../../AtomStates";

import {
  ContentsWrap,
  MainContent,
  AnalysisWrap,
  MainSection,
  Title,
  CardWrap,
  CardGroupWrap,
  ListBoxItem,
  ListText,
  ListTitle,
  ListSubtitle,
  ListButton,
  BoxListWrap,
  BgBoxList,
  BgBoxItem,
  TextBox,
  TextInfo,
  Badge,
  BottomBar,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import {
  H5,
  Body1,
  Body2,
  Body3,
  Sub1,
  Caption1,
  Caption2,
} from "../../../../assets/styles/Typography";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";
import {
  RadioButton,
  CustomTextarea,
  FormBox,
} from "../../../../assets/styles/InputStyle";
import {
  Button,
  ButtonGroup,
  IconButton,
} from "../../../../assets/styles/ButtonStyle";
import OrganismIncNavigation from "../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../Global/molecules/MoleculeHeader";
import MoleculeInterviewCard from "../molecules/MoleculeInterviewCard";
import MoleculePersonaCard from "../molecules/MoleculePersonaCard";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";
import { getProjectByIdFromIndexedDB } from "../../../../utils/indexedDB";
import OrganismBusinessAnalysis from "../organisms/OrganismBusinessAnalysis";
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

const PagePersona3 = () => {
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [eventState, setEventState] = useAtom(EVENT_STATE);
  const [eventTitle, setEventTitle] = useAtom(EVENT_TITLE);
  const [trialState, setTrialState] = useAtom(TRIAL_STATE);
  const [creditCustomTheory, setCreditCustomTheory] =
    useAtom(CREDIT_CUSTOM_THEORY);
  const [showPopup, setShowPopup] = useState(false);

  const [selectedRadio1, setSelectedRadio1] = useState();
  const [selectedRadio2, setSelectedRadio2] = useState();
  const [showCustomButton, setShowCustomButton] = useState(true);
  const [customizations, setCustomizations] = useState([]);
  const [showCustomization, setShowCustomization] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);

  const [showQuestions, setShowQuestions] = useState({
    radio3: false,
    radio4: false,
    radio5: false,
  });

  const handleEditClick = (index) => {
    const newCustomizations = [...customizations];
    newCustomizations[index].isEditing = true;
    newCustomizations[index].editedDefinition =
      newCustomizations[index].definitionText;
    newCustomizations[index].editedPurpose =
      newCustomizations[index].purposeText;
    setCustomizations(newCustomizations);
  };

  const handleEditComplete = (index) => {
    const newCustomizations = [...customizations];
    newCustomizations[index].definitionText =
      newCustomizations[index].editedDefinition;
    newCustomizations[index].purposeText =
      newCustomizations[index].editedPurpose;
    newCustomizations[index].isEditing = false;
    setCustomizations(newCustomizations);
  };

  const [customTheoryData, setCustomTheoryData] = useAtom(CUSTOM_THEORY_DATA);

  const [showNewListBox, setShowNewListBox] = useState(false);

  const navigate = useNavigate();
  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const [projectLoadButtonState, setProjectLoadButtonState] = useAtom(
    PROJECT_LOAD_BUTTON_STATE
  );
  const [personaButtonState3, setPersonaButtonState3] = useAtom(
    PERSONA_BUTTON_STATE_3
  );
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [isPersonaAccessible, setIsPersonaAccessible] = useAtom(
    IS_PERSONA_ACCESSIBLE
  );
  const [businessAnalysis, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [personaStep, setPersonaStep] = useAtom(PERSONA_STEP);
  const [selectedInterviewPurpose, setSelectedInterviewPurpose] = useAtom(
    SELECTED_INTERVIEW_PURPOSE
  );
  const [personaList, setPersonaList] = useAtom(PERSONA_LIST);

  const [purposeItemsSingleAtom, setPurposeItemsSingleAtom] =
    useAtom(PURPOSE_ITEMS_SINGLE);

  const [interviewPurpose, setInterviewPurpose] = useState("");
  const [selectedInterviewType, setSelectedInterviewType] = useAtom(
    SELECTED_INTERVIEW_TYPE
  );
  const [selectedInterviewPurposeData, setSelectedInterviewPurposeData] =
    useAtom(SELECTED_INTERVIEW_PURPOSE_DATA);
  const [activeCategory, setActiveCategory] = useState(1);
  const [showInterview, setShowInterview] = useState(false);
  const [showInterviewReady, setShowInterviewReady] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showEditPersona, setShowEditPersona] = useState(false);
  const [personaListState, setPersonaListState] = useState(null);
  const [showInterviewTypeAlert, setShowInterviewTypeAlert] = useState(false);
  const [showRequestPopup, setShowRequestPopup] = useState(false);

  const [showCreditPopup, setShowCreditPopup] = useState(false);

  // 인터뷰 목적 선택 핸들러 수정
  const handleInterviewPurposeSelect = (title) => {
    if (!selectedInterviewType) {
      setShowInterviewTypeAlert(true);
      return;
    }
    setInterviewPurpose(title);
  };

  const handlePopupClose = () => {
    setShowInterviewReady(false);
    setShowToast(false);
  };
  const handleSelectPersona = () => {
    // 선택된 페르소나들을 selected에 반영
    // setPersonaList((prev) => ({
    //   selected: [],
    //   unselected: filteredProjectList,
    // }));

    setPersonaStep(3);
    setIsPersonaAccessible(true);
    navigate(`/Persona/3/Select`, { replace: true });
  };
  // const [isLoadingPage, setIsLoadingPage] = useState(true);

  const [steps, setSteps] = useState([
    { number: 1, label: "비즈니스 분석", active: true },
    { number: 2, label: "맞춤 페르소나 추천", active: true },
    { number: 3, label: "인터뷰 방법 선택", active: true },
    { number: 4, label: "페르소나와 인터뷰", active: false },
    { number: 5, label: "의견 분석", active: false },
  ]);

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  useEffect(() => {
    // 접근 가능 여부를 확인하여 차단 로직 수행
    if (!isPersonaAccessible) {
      navigate("/"); // 접근이 허용되지 않으면 메인 페이지로 리다이렉트
    }

    // 페이지를 나갈 때 접근 가능 여부 초기화
    return () => {
      setIsPersonaAccessible(false); // 페이지 떠날 때 접근 불가로 설정
    };
  }, []);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleInterviewTypeSelect = (type) => {
    setSelectedInterviewType(type);
  };

  const purposeItemsMultiple = [
    {
      id: 1,
      category: "제품 사용 경험",
      title: "제품 경험 평가",
      description:
        "사용자의 기능, 디자인, 사용성 경험을 분석해 만족도와 불만족 요인을 도출",
      expandedContent: [
        "이 제품이 현재의 시장 경쟁 제품들과 비교해 독특하다고 느껴질 수 있는 요소는 무엇인가요?",
        "이 제품이 더 많은 사람들에게 매력적으로 다가가기 위해 추가되거나 개선되어야 할 가장 중요한 요소는 무엇이라고 생각하시나요?",
        "이 제품이 사용자에게 전달하려는 메시지나 숨겨진 이야기가 있다면, 그것은 무엇일까요?",
      ],
    },
    {
      id: 2,
      category: "제품 사용 경험",
      title: "사용 맥락 조사",
      description: "사용 환경과 패턴을 이해해 사용자 문제와 제약 요인을 해결",
      expandedContent: [
        "이 제품을 사용하는 데 있어 불편하거나 부적합할 수 있는 상황은 어떤 경우일까요?",
        "이 제품을 사용할 수 있는 환경에서 가장 중요한 조건은 무엇이라고 생각하시나요?",
        "이 제품이 예상치 못한 환경에서도 효과적으로 사용될 가능성이 있다면, 어떤 환경일까요?",
      ],
    },
    {
      id: 3,
      category: "구매 및 소비 심리",
      title: "구매 전환 요인 분석",
      description:
        "소비자의 구매 결정에 영향을 미치는 핵심 요인을 파악해 최적의 전략을 설계",
      expandedContent: [
        "이 제품에 대해 소비자가 가장 많이 질문할 가능성이 있는 부분은 무엇일까요?",
        "경쟁 제품 대비 이 제품이 소비자의 선택을 받을 가능성이 높은 이유는 무엇인가요?",
        "소비자가 이 제품을 구매하지 않을 가능성이 있다면, 그 이유는 무엇일까요?",
      ],
    },
    {
      id: 4,
      category: "구매 및 소비 심리",
      title: "소비자 행동 유도 요소 분석",
      description:
        "사용자의 행동을 유도하는 요소를 파악해 전환율과 참여를 극대화",
      expandedContent: [
        "이 제품이 구매를 망설이는 소비자의 마음을 바꿀 수 있다면, 어떤 요소가 가장 중요한 역할을 할까요?",
        "소비자가 이 제품에 대해 가장 큰 불신이나 의구심을 가질 가능성이 있다면, 그 이유는 무엇일까요?",
        "이 제품이 소비자의 행동을 더 효과적으로 유도하기 위해 추가하거나 수정해야 할 요소는 무엇인가요?",
      ],
    },
    {
      id: 5,
      category: "구매 및 소비 심리",
      title: "제품 기대치 확인",
      description: "초기 기대와 실제 경험의 차이를 줄여 사용자 만족도를 증대",
      expandedContent: [
        "이 제품이 소비자에게 가장 기대감을 줄 수 있는 핵심 요소는 무엇이라고 생각하시나요?",
        "이 제품이 소비자 기대를 현실적으로 충족시키는 동시에 놀라움을 제공하려면 어떤 점을 개선하거나 추가해야 할까요?",
        "이 제품이 소비자의 기대를 충족하지 못할 가능성이 있다면, 그 이유는 무엇일까요?",
      ],
    },
    {
      id: 6,
      category: "제품 사용 경험",
      title: "소비자 여정 맵핑",
      description:
        "다양한 시나리오에서 제품의 사용 가능성을 평가하여 부적합한 환경 발견",
      expandedContent: [
        "소비자가 이 제품의 구매를 결정하기 전에 가장 궁금해할 질문은 무엇일까요?",
        "소비자가 이 제품을 구매하는 과정을 상상했을 때, 가장 큰 장벽은 무엇일까요?",
        "이 제품을 구매 후, 소비자가 기대와 실제 사용 경험 간에 느낄 수 있는 가장 큰 차이는 무엇일까요?",
      ],
    },
    {
      id: 7,
      category: "구매 및 소비 심리",
      title: "제품 이해도 테스트",
      description: "사용자 관점에서 제품의 목적과 사용법을 평가해 접근성 강화",
      expandedContent: [
        "제품 설명을 기준으로, 이 제품이 해결하고자 하는 문제는 무엇이라고 생각하시나요?",
        "이 제품을 사용할 수 있는 환경에서 가장 중요한 조건은 무엇이라고 생각하시나요?",
        "이 제품의 가장 독특하거나 주목할 만한 기능은 무엇이라고 느껴지시나요?",
      ],
    },
    {
      id: 8,
      category: "사용자 시뮬레이션",
      title: "사용자 경험 시뮬레이션",
      description: "제품 사용을 가상으로 재현해 문제를 예측하고 설계를 최적화",
      expandedContent: [
        "이 제품이 당신의 일상에서 자연스럽게 사용될 가능성이 가장 높은 순간은 언제이며, 그 이유는 무엇인가요?",
        "이 제품을 사용하기 전과 사용한 후에 당신이 느낄 가장 큰 차이점은 무엇일 것 같나요?",
        "이 제품을 사용하는 과정에서 가장 큰 장애물로 예상되는 부분은 무엇이며, 이를 극복하려면 어떤 개선이 필요할까요?",
      ],
    },
  ];
  const purposeCategoriesMultiple = [
    { id: 1, label: "전체" },
    { id: 2, label: "제품 사용 경험" },
    { id: 3, label: "구매 및 소비 심리" },
    { id: 4, label: "사용자 시뮬레이션" },
  ];
  const categoryItemsMultiple = {
    1: purposeItemsMultiple,
    2: purposeItemsMultiple.filter(
      (item) => item.category === "제품 사용 경험"
    ),
    3: purposeItemsMultiple.filter(
      (item) => item.category === "구매 및 소비 심리"
    ),
    4: purposeItemsMultiple.filter(
      (item) => item.category === "사용자 시뮬레이션"
    ),
  };

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

  // 편집 팝업 열기
  const handleEditPersonaOpen = () => {
    setPersonaListState(personaList); // 현재 상태 저장
    setShowEditPersona(true);
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
    if (showToast || showInterviewReady || showEditPersona) {
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
  }, [showToast, showInterviewReady, showEditPersona]);

  // radio6 선택 핸들러 수정
  const handlePurposeSelect = (purpose) => {
    const selectedPurpose = purposeItemsSingleAtom.find(
      (item) => item.id === purpose
    );

    // console.log("🚀 ~ handlePurposeSelect ~ selectedPurpose:", selectedPurpose);
    setSelectedInterviewPurposeData(selectedPurpose);
    // setSelectedInterviewPurpose(selectedPurpose?.view_title);
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

      const creditUseResponse = await UserCreditUse(
        creditUsePayload,
        isLoggedIn
      );
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

  return (
    <>
      <ContentsWrap
        noScroll={Boolean(showToast || showInterviewReady || showEditPersona)}
      >
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent>
          <AnalysisWrap>
            <MainSection>
              <InterviewWayTab>
                <InterviewWayTabItem active>
                  <span>1</span>
                  <H5>인터뷰 방법 선택</H5>
                </InterviewWayTabItem>
                <InterviewWayTabItem>
                  <span>2</span>
                  <H5>참여 페르소나 선택</H5>
                </InterviewWayTabItem>
              </InterviewWayTab>

              <InterviewWayContent>
                <div>
                  <Body2 color="gray800" align="left">
                    인터뷰 방식
                  </Body2>

                  <CardGroupWrap column style={{ marginBottom: "0" }}>
                    <ListBoxItem
                      FlexStart
                      active={selectedInterviewType === "multiple"}
                    >
                      <div>
                        <RadioButton
                          id="radio1"
                          name="radioGroup1"
                          checked={selectedInterviewType === "multiple"}
                          onChange={() => handleInterviewTypeSelect("multiple")}
                        />
                      </div>
                      <ListText>
                        <ListTitle>
                          <Body1
                            color={
                              selectedInterviewType === "multiple"
                                ? "primary"
                                : "gray800"
                            }
                          >
                            여러 페르소나 인터뷰 (1:N)
                          </Body1>
                        </ListTitle>
                        <ListSubtitle>
                          <Caption1
                            color={
                              selectedInterviewType === "multiple"
                                ? "gray800"
                                : "gray500"
                            }
                          >
                            여러 페르소나의 다양한 의견을 한 번에 확인 하세요.
                            폭넓은 시각과 다양한 의견을 파악하는데 적합합니다.
                          </Caption1>
                        </ListSubtitle>
                      </ListText>
                    </ListBoxItem>

                    <ListBoxItem
                      FlexStart
                      active={selectedInterviewType === "single"}
                    >
                      <div>
                        <RadioButton
                          id="radio2"
                          name="radioGroup1"
                          checked={selectedInterviewType === "single"}
                          onChange={() => handleInterviewTypeSelect("single")}
                        />
                      </div>
                      <ListText>
                        <ListTitle>
                          <Body1
                            color={
                              selectedInterviewType === "single"
                                ? "primary"
                                : "gray800"
                            }
                          >
                            한 명과 심층 인터뷰 (1:1)
                          </Body1>
                        </ListTitle>
                        <ListSubtitle>
                          <Caption1
                            color={
                              selectedInterviewType === "multiple"
                                ? "gray800"
                                : "gray500"
                            }
                          >
                            한 명의 페르소나와 깊이 있는 대화를 통해 자세한
                            인사이트를 도출하세요. 구체적인 피드백이 필요한 경우
                            유용합니다.
                          </Caption1>
                        </ListSubtitle>
                      </ListText>
                    </ListBoxItem>
                  </CardGroupWrap>
                </div>

                <div>
                  {selectedInterviewType === "multiple" ? (
                    <InterviewSelect>
                      {/* <Title>인터뷰 목적 선택</Title> */}
                      <Body2 color="gray800" align="left">
                        인터뷰 목적
                      </Body2>

                      <TabWrap>
                        {purposeCategoriesMultiple.map((category) => (
                          <TabButton
                            key={category.id}
                            isActive={activeCategory === category.id}
                            onClick={() => handleCategoryClick(category.id)}
                          >
                            {category.label}
                          </TabButton>
                        ))}
                      </TabWrap>

                      <TabContent>
                        {categoryItemsMultiple[activeCategory].map((item) => (
                          <MoleculeInterviewCard
                            NoBackground
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            isSelected={interviewPurpose === item.title}
                            onSelect={(title) =>
                              handleInterviewPurposeSelect(title)
                            }
                            interviewPurpose={interviewPurpose}
                            isActive={interviewPurpose === item.title}
                          />
                        ))}
                      </TabContent>
                    </InterviewSelect>
                  ) : selectedInterviewType === "single" ? (
                    <CardGroupWrap column>
                      <Body2 color="gray800" align="left">
                        인터뷰 목적
                      </Body2>
                      {purposeItemsSingleAtom.map((purpose) => (
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

                      <CustomizationWrap>
                        {showCustomButton &&
                          !customTheoryData?.theory_title && (
                            <Button
                              DbExLarge
                              W100
                              Outline
                              onClick={() => setShowRequestPopup(true)}
                            >
                              <span />
                              <Sub1 color="gray700">인터뷰 커스터마이징</Sub1>
                            </Button>
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
                      </CustomizationWrap>
                    </CardGroupWrap>
                  ) : (
                    <ListBoxItem>
                      <ListText style={{ textAlign: "center", width: "100%" }}>
                        <Body1 color="gray500">
                          인터뷰 방법을 선택해주세요.
                        </Body1>
                        <Caption1 color="gray500" style={{ marginTop: "8px" }}>
                          인터뷰 목적을 선택하기 전에 인터뷰 방법을 먼저
                          선택해주세요.
                        </Caption1>
                      </ListText>
                    </ListBoxItem>
                  )}
                </div>
              </InterviewWayContent>

              <BottomBar W100>
                <Body2
                  color={
                    !selectedInterviewType || !selectedInterviewPurpose
                      ? "gray300"
                      : "gray800"
                  }
                >
                  {selectedInterviewPurpose === "product_experience_new"
                    ? "제품 경험 평가"
                    : ""}{" "}
                  인터뷰에 참여할 페르소나를 선택하세요
                </Body2>
                <Button
                  Large
                  Primary
                  Round
                  Fill
                  disabled={!selectedInterviewType || !selectedInterviewPurpose}
                  onClick={handleSelectPersona}
                >
                  다음
                  <images.ChevronRight
                    width="20"
                    height="20"
                    color={palette.white}
                  />
                  {/* <img src={images.ChevronRight} alt="다음" /> */}
                </Button>
              </BottomBar>
            </MainSection>

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
          </AnalysisWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PagePersona3;

const InterviewWayTab = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  margin-bottom: 20px;
`;

const InterviewWayTabItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex: 1;
  color: ${(props) => (props.active ? palette.gray800 : palette.gray300)};
  padding: 20px 24px;
  border-radius: 15px;
  background: ${(props) => (props.active ? palette.chatGray : palette.white)};

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 0.88rem;
    font-weight: 600;
    line-height: 1.5;
    color: ${palette.white};
    border-radius: 50%;
    background: ${(props) =>
      props.active ? palette.primary : palette.gray300};
  }
`;

const InterviewWayContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  text-align: left;
  margin-bottom: 280px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
`;

const CustomizationWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;

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

const CustomizationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 24px 24px 20px 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;

const CustomTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const PersonaCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 24px 24px 24px 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;

const InterviewSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  // margin-top: 30px;
`;

const TabWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TabButton = styled.button`
  font-family: "Pretendard", "Poppins";
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 4px 16px;
  border-radius: 50px;
  cursor: pointer;

  ${({ isActive }) =>
    isActive
      ? `
    background: rgba(34, 111, 255, 0.1);
    border: 1px solid ${palette.primary};
    color: ${palette.primary};
    font-weight: 500;
  `
      : `
    background: ${palette.chatGray};
    border: 1px solid ${palette.outlineGray};
    color: ${palette.gray500};
    font-weight: 300;
  `}
`;
const TabContent = styled(PersonaCards)`
  gap: 12px;
  padding: 0;
  border-radius: 0;
  border: none;

  > div {
    padding: 14px 20px 12px;
  }
`;
