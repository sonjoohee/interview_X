import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { useNavigate, useLocation } from "react-router-dom";
import { palette } from "../../../assets/styles/Palette";
import OrganismIncNavigation from "../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../Global/molecules/MoleculeHeader";
import PopupWrap from "../../../assets/styles/Popup";
import { Button, ButtonGroup } from "../../../assets/styles/ButtonStyle";
import { CheckBox } from "../../../assets/styles/Input";
import {
  CustomTextarea,
  SelectBox,
  SelectBoxTitle,
  SelectBoxList,
  SelectBoxItem,
  FormBox,
  CustomInput,
} from "../../../assets/styles/InputStyle";
import {
  ContentsWrap,
  MainContent,
  TabWrapType3,
  TabButtonType3,
  TabWrapType2,
  TabButtonType2,
  TabContent,
  InterviewPopup,
  PopupContent,
  BgBoxItem,
  OCEANRangeWrap,
  RangeSlider,
  BoxWrap,
  UniqueTag,
} from "../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../assets/styles/Images";
import {
  H1,
  H4,
  Body1,
  Body2,
  Body3,
  Sub1,
  Sub2,
  Sub3,
  InputText,
} from "../../../assets/styles/Typography";
import OrganismEmptyPersona from "../components/organisms/OrganismEmptyPersona";
import {
  updatePersonaOnServer,
  getPersonaListOnServer,
  InterviewXPersonaProfileRequest,
  createRequestPersonOnServer,
  UserCreditCheck,
  UserCreditInfo,
  UserCreditUse,
  createRequestPersonaOnServer,
  getProjectByIdFromIndexedDB,
  getPersonaOnServer,
  createPersonaOnServer,
} from "../../../utils/indexedDB";
import OrganismPersonaCardList from "../components/organisms/OrganismPersonaCardList";
import {
  PROJECT_ID,
  PERSONA_LIST_SAAS,
  PROJECT_SAAS,
  IS_LOGGED_IN,
  USER_CREDITS,
  CREDIT_REQUEST_BUSINESS_PERSONA,
  CREDIT_CREATE_PERSONA_DEFAULT,
  EVENT_STATE,
  TRIAL_STATE,
  EVENT_TITLE,
  PROJECT_PERSONA_LIST,
  EDUCATION_STATE,
} from "../../../pages/AtomStates";
import AtomPersonaLoader from "../../Global/atoms/AtomPersonaLoader";
import { useDynamicViewport } from "../../../assets/DynamicViewport";
import { InterviewXMyPersonaGeneratorRequest } from "../../../utils/indexedDB";

const PageAiPersona = () => {
  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기
  const navigate = useNavigate();
  const location = useLocation();
  const [educationState, setEducationState] = useAtom(EDUCATION_STATE);
  const [project] = useAtom(PROJECT_SAAS);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectId] = useAtom(PROJECT_ID);
  const [personaListSaas, setPersonaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const [, setUserCredits] = useAtom(USER_CREDITS);
  const [creditRequestBusinessPersona] = useAtom(
    CREDIT_REQUEST_BUSINESS_PERSONA
  );
  const [creditCreatePersonaDefault] = useAtom(CREDIT_CREATE_PERSONA_DEFAULT);
  const [, setProjectPersonaList] = useAtom(PROJECT_PERSONA_LIST);
  const [eventState] = useAtom(EVENT_STATE);
  const [trialState] = useAtom(TRIAL_STATE);
  const [eventTitle] = useAtom(EVENT_TITLE);

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isCustomizePopupOpen, setIsCustomizePopupOpen] = useState(false);
  const [isPersonaConfirmPopupOpen, setIsPersonaConfirmPopupOpen] =
    useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [activeTab2, setActiveTab2] = useState("lifestyle");
  const [showPopup, setShowPopup] = useState(false);
  const [isPersonaEditPopupOpen, setIsPersonaEditPopupOpen] = useState(false);
  const [currentPersona, setCurrentPersona] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTabIndex1, setActiveTabIndex1] = useState(0);
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "macro_segment"
  );
  const [, setPersonaStats] = useState({
    active: 0,
    inactive: 0,
    generating: 0,
  });
  const [customPersonaForm, setCustomPersonaForm] = useState({
    gender: "",
    ageGroups: [],
    purpose: "",
    additionalInfo: "",
  });
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [loadingTabs, setLoadingTabs] = useState({
    macro_segment: false,
    unique_user: false,
    key_stakeholder: false,
    my_persona: false,
  });
  const [oceanValues, setOceanValues] = useState({
    openness: 0.5,
    conscientiousness: 0.5,
    extraversion: 0.5,
    agreeableness: 0.5,
    neuroticism: 0.5,
  });
  const [ignoreOcean, setIgnoreOcean] = useState(false);
  const [selectBoxStates, setSelectBoxStates] = useState({
    gender: false,
    ageGroup: false,
    business: false,
    uniqueUser: false,
    keyStakeholder: false,
  });
  const [selectBoxStates1, setSelectBoxStates1] = useState({
    experienceDepth: false,
    usageDepth: false,
    consumptionPattern: false,
  });
  const [selectedValues, setSelectedValues] = useState({
    gender: "",
    ageGroup: "",
    business: "",
    uniqueUser: "",
    keyStakeholder: "",
  });
  const [showTooltip, setShowTooltip] = useState(false);

  // 상태값을 분리합니다
  const [showPersonaTypeTooltip, setShowPersonaTypeTooltip] = useState(false);
  const [showUniqueUserTooltip, setShowUniqueUserTooltip] = useState(false);

  // 즐겨찾기된 페르소나 개수 계산
  const favoriteCount = personaListSaas.filter(
    (persona) => persona?.favorite === true
  ).length;

  // 즐겨찾기 페르소나 다운로드 함수
  const handleDownloadFavoritePersonas = () => {
    // 즐겨찾기 페르소나 필터링
    const favoritePersonas = personaListSaas.filter(
      (persona) => persona?.favorite === true
    );

    // TXT 파일 내용 생성
    let content = "";
    favoritePersonas.forEach((persona) => {
      content += `페르소나명: ${persona?.personaName || ""}\n`;
      content += `성격: ${persona?.personaCharacteristics || ""}\n`;
      content += `유형: ${persona?.type || ""}\n`;
      content += `나이: ${persona?.age || ""}\n`;
      content += `성별: ${persona?.gender || ""}\n`;
      content += `직업: ${persona?.job || ""}\n`;

      // 키워드가 있는 경우
      if (persona?.keywords && persona.keywords.length > 0) {
        content += `키워드: ${persona.keywords.join(", ")}\n`;
      }

      // 프로필이 생성된 페르소나인 경우 추가 정보 포함
      if (persona?.status === "complete" || persona?.consumptionPattern) {
        if (persona?.lifestyle) {
          content += `라이프스타일: ${persona.lifestyle}\n`;
        }
        if (persona?.interests) {
          content += `관심사: ${persona.interests}\n`;
        }
        if (persona?.consumptionPattern) {
          content += `소비성향: ${persona.consumptionPattern}\n`;
        }
        if (persona?.userExperience) {
          content += `사용경험: ${persona.userExperience}\n`;
        }
        if (persona?.family) {
          content += `가족: ${persona.family}\n`;
        }
        if (persona?.monthlyIncome) {
          content += `월 소득: ${persona.monthlyIncome}\n`;
        }
        if (persona?.residence) {
          content += `거주지: ${persona.residence}\n`;
        }
      }

      // 페르소나 구분선 추가
      content += "\n----------------------------------------------\n\n";
    });

    // 파일 다운로드
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "favorite_personas.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleEditClose = () => {
    setIsEditPopupOpen(false);
  };

  const handleEditConfirmClose = () => {
    setIsPersonaConfirmPopupOpen(false);
  };

  const handleEditContinue = () => {
    setIsEditPopupOpen(false);
    setShowPopup(false);
    setActiveTabIndex(0);

    setTimeout(() => {
      setIsPersonaEditPopupOpen(true);
      setActiveTabIndex1(0);
    }, 100);
  };

  const handleCreateContinue = () => {
    setIsCreatePopupOpen(false);
  };

  const handleCustomizePopupClose = () => {
    setIsCustomizePopupOpen(false);
    setActiveTabIndex(0);
    // OCEAN 값 초기화
    setOceanValues({
      openness: 0.5,
      conscientiousness: 0.5,
      extraversion: 0.5,
      agreeableness: 0.5,
      neuroticism: 0.5,
    });
    // ignoreOcean 초기화
    setIgnoreOcean(false);
    // customPersonaForm 초기화
    setCustomPersonaForm({
      gender: "",
      ageGroups: [],
      purpose: "",
      additionalInfo: "",
    });
    // selectedValues 초기화
    setSelectedValues({
      gender: "",
      ageGroup: "",
      business: "",
      uniqueUser: "",
      keyStakeholder: "",
    });
  };

  const handleCustomizePopupConfirm = () => {
    if (activeTabIndex === 0) {
      if (isCustomizeFormValid()) {
        setActiveTabIndex(1);
      }
    } else if (activeTabIndex === 1) {
      // OCEAN 정보 탭
      setActiveTabIndex(2); // 요청사항확인 탭으로 이동
    } else {
      setIsCustomizePopupOpen(false);
    }
  };

  const handlePersonaEditClose = () => {
    setIsPersonaEditPopupOpen(false);
    setActiveTabIndex1(0);
  };

  const handlePersonaEditContinue = () => {
    if (activeTabIndex1 < 4) {
      // 마지막 탭이 아닐 경우
      setActiveTabIndex1(activeTabIndex1 + 1); // 다음 탭으로 이동
    } else {
      // 마지막 탭일 경우
      setIsPersonaEditPopupOpen(false); // 편집 팝업 닫기
      setIsPersonaConfirmPopupOpen(true); // 확인 팝업 열기
    }
  };

  // const handleTabChange = (index) => {
  //   setActiveTabIndex1(index);
  //   setActiveTabIndex(index);

  // };
  const handleTabChange = (index) => {
    setActiveTabIndex1(index);

    const isRequiredFieldsFilled =
      customPersonaForm.gender !== "" &&
      customPersonaForm.ageGroups.length > 0 &&
      customPersonaForm.purpose.trim() !== "";

    // 필수 정보가 모두 입력되었거나, 이전 탭으로 이동하는 경우에만 탭 변경 허용
    if ((isRequiredFieldsFilled || index < activeTabIndex) && index !== 2) {
      setActiveTabIndex(index);
    }
    if (index === 2) {
      if (
        oceanValues.openness !== 0.5 ||
        oceanValues.conscientiousness !== 0.5 ||
        oceanValues.extraversion !== 0.5 ||
        oceanValues.agreeableness !== 0.5 ||
        oceanValues.neuroticism !== 0.5
      ) {
        setActiveTabIndex(index);
      }
    }
  };

  const handlePersonaEditUpdate = async () => {
    if (currentPersona) {
      const updatedPersona = {
        id: currentPersona._id,
        imageKey: `persona_${currentPersona.gender === "남성" ? "m" : "f"}_${
          Math.floor(parseInt(currentPersona.age.replace("세", "")) / 10) * 10
        }_${String(Math.floor(Math.random() * 10) + 1).padStart(2, "0")}`,
        ...Object.fromEntries(
          Object.entries(currentPersona).filter(
            ([key]) => key !== "_id" && key !== "imageKey"
          )
        ),
      };

      // 서버에 업데이트된 페르소나 저장
      await updatePersonaOnServer(updatedPersona, true);

      // 페르소나 리스트 새로고침
      await refreshPersonaList();

      setCurrentPersona({ ...updatedPersona });
      // 활성 탭 설정
      setActiveTab2("lifestyle");
    }
  };

  const handleOceanChange = (trait, value) => {
    // 값을 0 또는 1로 스냅
    const snappedValue = Number(value) <= 0.5 ? 0 : 1;

    setOceanValues((prev) => ({
      ...prev,
      [trait]: snappedValue,
    }));
  };

  const handleRandomOcean = (e) => {
    setIgnoreOcean(e.target.checked);

    // 체크박스가 선택되면 모든 OCEAN 값을 랜덤으로 설정
    if (e.target.checked) {
      setOceanValues({
        openness: Math.random() < 0.5 ? 0 : 1,
        conscientiousness: Math.random() < 0.5 ? 0 : 1,
        extraversion: Math.random() < 0.5 ? 0 : 1,
        agreeableness: Math.random() < 0.5 ? 0 : 1,
        neuroticism: Math.random() < 0.5 ? 0 : 1,
      });
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleCurrentPersonaChange = (field, value) => {
    setCurrentPersona((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const loadPersonaList = async () => {
      try {
        const savedPersonaListInfo = await getPersonaListOnServer(
          projectId,
          true
        );

        if (savedPersonaListInfo) {
          const sortedList = [...savedPersonaListInfo].sort((a, b) => {
            const dateA = a.timestamp;
            const dateB = b.timestamp;
            return dateA - dateB;
          });

          setPersonaListSaas(sortedList);
        }
      } catch (error) {}
    };
    loadPersonaList();
  }, []);

  const toggleSelectBox = (type) => {
    setSelectBoxStates((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handlePurposeSelect = (value, type) => {
    setSelectedValues((prev) => ({
      ...prev,
      [type]: value,
    }));
    setSelectBoxStates((prev) => ({
      ...prev,
      [type]: false,
    }));

    // customPersonaForm도 함께 업데이트
    if (type === "gender") {
      handleFormChange("gender", value === "남성" ? "male" : "female");
    } else if (type === "age") {
      handleFormChange("ageGroups", value.split(", "));
    }
  };

  const handleFormChange = (field, value) => {
    setCustomPersonaForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isCustomizeFormValid = () => {
    if (activeTabIndex === 0) {
      return (
        customPersonaForm.gender !== "" &&
        customPersonaForm.ageGroups.length > 0 &&
        customPersonaForm.purpose.trim() !== ""
        // additionalInfo는 더 이상 필수 항목이 아님
      );
    } else if (activeTabIndex === 1) {
      // OCEAN 정보 탭에서는 값이 하나라도 0.5인 경우 비활성화
      if (!ignoreOcean) {
        const hasDefaultValue = Object.values(oceanValues).some(
          (value) => value === 0.5
        );
        return !hasDefaultValue;
      }
      return true; // ignoreOcean이 true인 경우 항상 유효
    }
    return true;
  };

  const updatePersonaList = async (updatedList) => {
    // 업데이트된 리스트가 배열인 경우 직접 설정
    if (Array.isArray(updatedList)) {
      setPersonaListSaas(updatedList);
      return;
    }

    // 그렇지 않은 경우 서버에서 최신 데이터 다시 불러오기
    try {
      const refreshedData = await getPersonaListOnServer(projectId, true);
      if (refreshedData) {
        const sortedList = [...refreshedData].sort((a, b) => {
          const dateA = a.timestamp;
          const dateB = b.timestamp;
          return dateA - dateB; // 최신 날짜가 위로
        });

        setPersonaListSaas(sortedList);
      }
    } catch (error) {}
  };

  const isPersonaEditFormValid = () => {
    if (activeTabIndex1 === 0) {
      return (
        currentPersona?.gender?.trim() !== "" &&
        currentPersona?.age?.trim() !== "" &&
        currentPersona?.personaCharacteristics?.trim() !== ""
      );
    } else if (activeTabIndex1 === 1) {
      return currentPersona?.lifestyle?.trim() !== "";
    } else if (activeTabIndex1 === 2) {
      return currentPersona?.interests?.trim() !== "";
    } else if (activeTabIndex1 === 3) {
      return currentPersona?.consumptionPattern?.trim() !== "";
    } else if (activeTabIndex1 === 4) {
      return (
        currentPersona?.experienceDepth &&
        currentPersona?.usageDepth &&
        currentPersona?.userExperience?.trim() !== ""
      );
    }
    return true;
  };

  const handlePrevTab = () => {
    setActiveTabIndex1(activeTabIndex1 - 1);
  };

  const handlePrevTab2 = () => {
    setActiveTabIndex(activeTabIndex - 1);
  };

  const handleRequestClick = (persona) => {
    setSelectedPersona(persona); // 선택된 페르소나 설정
    setShowRequestPopup(true);
  };

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const openPersonaPopup = async (persona) => {
    setCurrentPersona(persona);
    setShowPopup(true);
    setIsLoading(true);

    const persona_info = {
      personaType: persona.type,
      personaName: persona.personaName,
      personaCharacteristics: persona.personaCharacteristics || "",
      keywords: persona.keywords || [],
      age: persona.age || "",
      gender: persona.gender || "",
      job: persona.job || "",
    };
    try {
      if (persona.status !== "default") {
        setIsLoading(false);
        return;
      }
      // 페르소나 기초 데이터로 프로필 정보 생성 API 호출
      const isLoggedIn = sessionStorage.getItem("accessToken") !== null;
      let profileData = await InterviewXPersonaProfileRequest(
        {
          business_description:
            project.projectAnalysis.business_analysis +
            (project.projectAnalysis.file_analysis || ""),
          persona_info,
          persona_type: persona.personaType,
        },
        isLoggedIn
      );

      const max_attempt = 10;
      let attempt = 0;

      while (
        !profileData ||
        !profileData.response ||
        !profileData.response.persona_profile ||
        !profileData.response.persona_profile.experience_depth ||
        !profileData.response.persona_profile.lifestyle ||
        !profileData.response.persona_profile.monthly_income ||
        !profileData.response.persona_profile.residence ||
        !profileData.response.persona_profile.user_experience ||
        !profileData.response.persona_profile.interests ||
        !profileData.response.persona_profile.consumption_pattern ||
        !profileData.response.persona_profile.usage_depth
      ) {
        profileData = await InterviewXPersonaProfileRequest(
          {
            business_description:
              project.projectAnalysis.business_analysis +
              (project.projectAnalysis.file_analysis || ""),
            persona_info,
            persona_type: persona.personaType,
          },
          isLoggedIn
        );
        attempt++;

        if (attempt >= max_attempt) {
          throw new Error("프로필 정보 생성에 실패했습니다.");
        }
      }

      if (profileData) {
        const updatedPersona = {
          id: persona._id,
          family: profileData.response.persona_profile.family,
          experienceDepth:
            profileData.response.persona_profile.experience_depth,
          lifestyle: profileData.response.persona_profile.lifestyle,
          monthlyIncome: profileData.response.persona_profile.monthly_income,
          residence: profileData.response.persona_profile.residence,
          userExperience: profileData.response.persona_profile.user_experience,
          interests: profileData.response.persona_profile.interests,
          consumptionPattern:
            profileData.response.persona_profile.consumption_pattern,
          usageDepth: profileData.response.persona_profile.usage_depth,
          status: "profile",
        };

        const personaInfo = await getPersonaOnServer(persona._id, isLoggedIn);

        if (personaInfo.status === "default") {
          // 서버에 업데이트된 페르소나 저장
          await updatePersonaOnServer(updatedPersona, true);

          // 페르소나 리스트 새로고침
          await refreshPersonaList();
          setCurrentPersona({ ...persona, ...updatedPersona });
          // 활성 탭 설정
          setActiveTab2("lifestyle");
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // 페르소나 타입별 상태 카운트 함수 추가
  const countPersonasByTypeAndStatus = (personaList, type) => {
    if (!personaList || !Array.isArray(personaList)) {
      return { total: 0, active: 0, generating: 0, inactive: 0 };
    }

    // 해당 타입의 페르소나만 필터링
    const filteredPersonas = personaList.filter(
      (persona) => persona?.personaType === type
    );

    const total = filteredPersonas.length;

    // 활성 페르소나 (status가 complete인 경우)
    const active = filteredPersonas.filter(
      (persona) => persona?.status === "complete"
    ).length;

    // 생성 중인 페르소나 (status가 ing인 경우)
    const generating = filteredPersonas.filter(
      (persona) => persona?.status === "ing" || persona?.status === "request"
    ).length;

    // 비활성 페르소나 (status가 complete나 ing가 아닌 경우)
    const inactive = filteredPersonas.filter(
      (persona) =>
        persona?.status !== "complete" &&
        persona?.status !== "ing" &&
        persona?.status !== "request"
    ).length;

    return { total, active, generating, inactive };
  };
  // 컴포넌트 내부에서 사용
  const macroSegmentStats = countPersonasByTypeAndStatus(
    personaListSaas,
    "macro_segment"
  );
  const uniqueUserStats = countPersonasByTypeAndStatus(
    personaListSaas,
    "unique_user"
  );
  const keyStakeholderStats = countPersonasByTypeAndStatus(
    personaListSaas,
    "key_stakeholder"
  );
  const myPersonaStats = countPersonasByTypeAndStatus(
    personaListSaas,
    "my_persona"
  );

  // 현재 선택된 탭에 따라 표시할 통계 정보 결정
  const getCurrentTabStats = () => {
    switch (activeTab) {
      case "macro_segment":
        return macroSegmentStats;
      case "unique_user":
        return uniqueUserStats;
      case "key_stakeholder":
        return keyStakeholderStats;
      case "my_persona":
        return myPersonaStats;
      case "my_favorite":
        // 즐겨찾기된 페르소나만 필터링 (다양한 형태의 isStarred 값 처리)
        const starredPersonas = personaListSaas.filter(
          (persona) => persona?.favorite === true
        );

        // 즐겨찾기된 페르소나 중 활성 페르소나 수
        const activeStarred = starredPersonas.filter(
          (persona) => persona?.status === "complete"
        ).length;

        // 즐겨찾기된 페르소나 중 생성 중인 페르소나 수
        const generatingStarred = starredPersonas.filter(
          (persona) =>
            persona?.status === "ing" || persona?.status === "request"
        ).length;

        // 즐겨찾기된 페르소나 중 비활성 페르소나 수
        const inactiveStarred = starredPersonas.filter(
          (persona) =>
            persona?.status !== "complete" &&
            persona?.status !== "ing" &&
            persona?.status !== "request"
        ).length;

        return {
          active: activeStarred,
          generating: generatingStarred,
          inactive: inactiveStarred,
          total: starredPersonas.length,
        };
      default:
        return macroSegmentStats;
    }
  };

  // 현재 탭의 통계 정보
  const currentTabStats = getCurrentTabStats();

  // refreshPersonaList 함수 수정 - 전체 통계와 함께 탭별 통계도 업데이트
  const refreshPersonaList = async () => {
    try {
      const refreshedData = await getPersonaListOnServer(projectId, true);
      if (refreshedData) {
        const sortedList = [...refreshedData].sort((a, b) => {
          const dateA = a.timestamp;
          const dateB = b.timestamp;
          return dateA - dateB; // 최신 날짜가 위로
        });
        setPersonaListSaas(sortedList);
        // 전체 페르소나 통계 업데이트
        const activeCount = sortedList.filter(
          (persona) => persona?.status === "complete"
        ).length;

        const generatingCount = sortedList.filter(
          (persona) =>
            persona?.status === "ing" || persona?.status === "request"
        ).length;

        const inactiveCount = sortedList.filter(
          (persona) =>
            persona?.status !== "complete" &&
            persona?.status !== "ing" &&
            persona?.status !== "request"
        ).length;

        setPersonaStats({
          active: activeCount,
          inactive: inactiveCount,
          generating: generatingCount,
        });
      }
    } catch (error) {}
  };

  const mapExperienceDepth = (level) => {
    // Key Stakeholder인 경우 다른 설명 사용
    if (currentPersona?.personaType === "key_stakeholder") {
      switch (level) {
        case "1":
        case "1단계":
        case 1:
          return "조언 제공 가능하나 최종 결정권 없음";
        case "2":
        case "2단계":
        case 2:
          return "제한된 영역에서 피드백 및 일부 결정권 보유";
        case "3":
        case "3단계":
        case 3:
          return "특정 분야 운영 및 성장 방향 결정 가능";
        case "4":
        case "4단계":
        case 4:
          return "기업 전략 수립 및 장기적 방향 설정";
        case "5":
        case "5단계":
        case 5:
          return "기업 전략, 투자, 정책 수립을 직접 결정";
        default:
          return "선택해주세요";
      }
    } else {
      // 기존 코드 유지
      switch (level) {
        case "1":
        case "1단계":
        case 1:
          return "이 제품/서비스를 들어본 적도 없음";
        case "2":
        case "2단계":
        case 2:
          return "들어본 적은 있지만, 사용해본 적은 없음";
        case "3":
        case "3단계":
        case 3:
          return "사용해본 적은 있지만, 한두 번 경험한 수준";
        case "4":
        case "4단계":
        case 4:
          return "몇 번 사용해봤고, 기능을 어느 정도 이해하고 있음";
        case "5":
        case "5단계":
        case 5:
          return "정기적으로 사용하고 있고, 익숙한 사용자";
        default:
          return "선택해주세요";
      }
    }
  };

  const mapUsageDepth = (level) => {
    // Key Stakeholder인 경우 다른 설명 사용
    if (currentPersona?.personaType === "key_stakeholder") {
      switch (level) {
        case "1":
        case "1단계":
        case 1:
          return "기본 개념 이해, 보조적 역할 수행";
        case "2":
        case "2단계":
        case 2:
          return "실무 경험 보유, 특정 업무 수행 가능";
        case "3":
        case "3단계":
        case 3:
          return "시장 트렌드 이해, 주요 의견 제시 가능";
        case "4":
        case "4단계":
        case 4:
          return "연구 및 혁신 주도, 신기술 개발 영향";
        case "5":
        case "5단계":
        case 5:
          return "업계 방향 설정, 산업 정책 수립 주도";
        default:
          return "선택해주세요";
      }
    } else {
      // 기존 코드 유지
      switch (level) {
        case "1":
        case "1단계":
        case 1:
          return "기본적인 기능도 잘 모름";
        case "2":
        case "2단계":
        case 2:
          return "몇 가지 주요 기능만 사용";
        case "3":
        case "3단계":
        case 3:
          return "대부분의 기능을 사용해 봤지만, 특정 기능은 모름";
        case "4":
        case "4단계":
        case 4:
          return "거의 모든 기능을 능숙하게 사용";
        default:
          return "선택해주세요";
      }
    }
  };

  const handleCustomPersonaRequestPopup = async () => {
    setShowRequestPopup(true);
  }

  const handleCustomPersonaRequest = async () => {
    setIsCustomizePopupOpen(false);

    let accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      return;
    }

    // 크레딧 사용전 사용 확인
    const creditPayload = {
      mount: creditCreatePersonaDefault,
    };
    const creditResponse = await UserCreditCheck(creditPayload, isLoggedIn);

    if (creditResponse?.state !== "use") {
      setShowCreditPopup(true);
      return;
    }

    // 로딩 상태 시작
    setLoadingTabs((prev) => ({
      ...prev,
      my_persona: true,
    }));
    setActiveTabIndex(0);
    // OCEAN 값 초기화
    setOceanValues({
      openness: 0.5,
      conscientiousness: 0.5,
      extraversion: 0.5,
      agreeableness: 0.5,
      neuroticism: 0.5,
    });
    // ignoreOcean 초기화
    setIgnoreOcean(false);
    // customPersonaForm 초기화
    setCustomPersonaForm({
      gender: "",
      ageGroups: [],
      purpose: "",
      additionalInfo: "",
    });
    // selectedValues 초기화
    setSelectedValues({
      gender: "",
      ageGroup: "",
      business: "",
      uniqueUser: "",
      keyStakeholder: "",
    });

    try {
      const requestData = {
        business_description:
          project.projectAnalysis.business_analysis +
          (project.projectAnalysis.file_analysis || ""),
        persona_gender: customPersonaForm.gender === "male" ? "남성" : "여성",
        persona_age:
          customPersonaForm.ageGroups[0] === "10대"
            ? "10~19세"
            : customPersonaForm.ageGroups[0] === "20대"
            ? "20~29세"
            : customPersonaForm.ageGroups[0] === "30대"
            ? "30~39세"
            : customPersonaForm.ageGroups[0] === "40대"
            ? "40~49세"
            : customPersonaForm.ageGroups[0] === "50대"
            ? "50~59세"
            : customPersonaForm.ageGroups[0] === "60대"
            ? "60~69세"
            : customPersonaForm.ageGroups[0] === "70대"
            ? "70세 이상"
            : customPersonaForm.ageGroups[0],
        persona_reason: customPersonaForm.purpose,
        persona_additional_info: customPersonaForm.additionalInfo,
        persona_ocean: {
          type_o: oceanValues.openness === 0 ? "보수적" : "개방적",
          type_c: oceanValues.conscientiousness === 0 ? "즉흥적" : "성실함",
          type_e: oceanValues.extraversion === 0 ? "내향적" : "외향적",
          type_a: oceanValues.agreeableness === 0 ? "독립적" : "우호적",
          type_n: oceanValues.neuroticism === 0 ? "무던함" : "신경적",
        },
      };
      const response = await InterviewXMyPersonaGeneratorRequest(requestData);

      // 매핑 함수 정의
      const mapPersonaData = (persona) => ({
        projectId: project?._id,
        _id: persona._id,
        personaName: persona.name,
        personaCharacteristics:
          `${customPersonaForm.purpose || ""}${
            customPersonaForm.additionalInfo
              ? " " + customPersonaForm.additionalInfo
              : ""
          }` || "",
        type: persona.type,
        age: persona.age,
        gender: persona.gender,
        job: persona.job,
        keywords: persona.keywords,
        personaType: "my_persona",
        favorite: persona.favorite,
        customData: {
          // customData 추가
          persona_gender: customPersonaForm.gender === "male" ? "남성" : "여성",
          persona_age: customPersonaForm.ageGroups
            .map((age) => age.trim())
            .join(", "),
          persona_reason: customPersonaForm.purpose,
          persona_additional_info: customPersonaForm.additionalInfo,
          persona_ocean: {
            type_o: oceanValues.openness === 0 ? "보수적" : "개방적",
            type_c: oceanValues.conscientiousness === 0 ? "즉흥적" : "성실함",
            type_e: oceanValues.extraversion === 0 ? "내향적" : "외향적",
            type_a: oceanValues.agreeableness === 0 ? "독립적" : "우호적",
            type_n: oceanValues.neuroticism === 0 ? "무던함" : "신경적",
          },
        },
        family: persona.family,
        experienceDepth: persona.experience_depth,
        lifestyle: persona.lifestyle,
        monthlyIncome: persona.monthly_income,
        residence: persona.residence,
        userExperience: persona.user_experience,
        interests: persona.interests,
        consumptionPattern: persona.consumption_pattern,
        usageDepth: persona.usage_depth,
        status: "profile",
        imageKey: `persona_${persona.gender === "남성" ? "m" : "f"}_${
          Math.floor(
            (persona.age ? parseInt(persona.age.replace("세", "")) : 20) / 10
          ) * 10
        }_${String(Math.floor(Math.random() * 10) + 1).padStart(2, "0")}`,
      });

      let personas = response.response.my_persona_generator.map(mapPersonaData);

      const updatedPersonas = [];
      for (const persona of personas) {
        try {
          const insertedId = await createPersonaOnServer(persona, isLoggedIn);
          if (insertedId) {
            updatedPersonas.push({ ...persona, _id: insertedId });
          } else {
            updatedPersonas.push(persona);
          }
        } catch (error) {
          updatedPersonas.push(persona);
        }
      }

      // 서버에서 최신 데이터 가져오기
      const savedPersonaListInfo = await getPersonaListOnServer(
        project?._id,
        true
      );
      if (savedPersonaListInfo) {
        const sortedList = savedPersonaListInfo
          .filter((persona) => persona.personaType === "my_persona")
          .sort((a, b) => a.timestamp - b.timestamp);

        if (sortedList.length > 0) {
          setProjectPersonaList((prev) => {
            const filteredPrev = prev.filter(
              (p) => p.personaType !== "my_persona"
            );
            return [...filteredPrev, ...sortedList];
          });

          setPersonaListSaas((prev) => {
            const filteredPrev = prev.filter(
              (p) => p.personaType !== "my_persona"
            );
            return [...filteredPrev, ...sortedList];
          });
        } else {
          // console.log("No my_persona data found in sortedList");
        }
      }

      if (!response) {
        throw new Error("페르소나 요청에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      // 로딩 상태 종료
      setLoadingTabs((prev) => ({
        ...prev,
        my_persona: false,
      }));
    }

    // 크레딧이 사용 가능한 상태면 사용 API 호출
    const creditUsePayload = {
      title: project.projectTitle,
      service_type: "페르소나 모집 요청",
      target: "",
      state: "use",
      mount: creditCreatePersonaDefault,
    };

    await UserCreditUse(creditUsePayload, isLoggedIn);

    // 크레딧 사용 후 사용자 정보 새로고침
    accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      const userCreditValue = await UserCreditInfo(isLoggedIn);
      setUserCredits(userCreditValue);
    }
  };

  // 크레딧 사용 함수
  const creditUse = async (selectedPersona) => {
    // 팝업 닫기
    setShowRequestPopup(false);

    let accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      return;
    }

    // 크레딧 사용전 사용 확인
    const creditPayload = {
      mount: creditRequestBusinessPersona,
    };
    const creditResponse = await UserCreditCheck(creditPayload, isLoggedIn);

    if (creditResponse?.state !== "use") {
      setShowCreditPopup(true);
      return;
    }

    // 크레딧이 사용 가능한 상태면 사용 API 호출
    const creditUsePayload = {
      title: project.projectTitle,
      service_type: "페르소나 모집 요청",
      target: "",
      state: "use",
      mount: creditRequestBusinessPersona,
    };

    await UserCreditUse(creditUsePayload, isLoggedIn);

    // 크레딧 사용 후 사용자 정보 새로고침
    accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      const userCreditValue = await UserCreditInfo(isLoggedIn);
      setUserCredits(userCreditValue);
    }

    handleRequestPersona(selectedPersona);
  };

  // 페르소나 요청 처리 함수
  const handleRequestPersona = async (persona) => {
    if (!persona) {
      return;
    }

    try {
      const projectId =
        persona.projectId || localStorage.getItem("currentProjectId");
      const currentProject = await getProjectByIdFromIndexedDB(
        projectId,
        isLoggedIn
      );

      if (persona.status === "profile" || persona.status === "default") {
        // 새로운 requestedPersona 배열 생성
        const newRequestedPersona = {
          id: persona._id,
          ...Object.fromEntries(
            Object.entries(persona).filter(([key]) => key !== "_id")
          ),
          status: "request",
        };

        await updatePersonaOnServer(newRequestedPersona, true);

        const requestData = {
          projectId: projectId,
          requestDate: new Date().toLocaleString("ko-KR", {
            timeZone: "Asia/Seoul",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          requestTimeStamp: Date.now(),
          businessAnalysis: {
            businessModel: currentProject.businessModel,
            projectAnalysis: currentProject.projectAnalysis,
            projectDescription: currentProject.projectDescription,
            projectTitle: currentProject.projectTitle,
            targetCountry: currentProject.targetCountry,
          },
          projectType: currentProject.projectType,
          personaRequest: { ...persona },
          status: "request",
          requestPersonaType: "saas",
        };
        createRequestPersonaOnServer(requestData, isLoggedIn);
        // 페르소나 요청 완료 후 페르소나 목록 새로고침
        await refreshPersonaList();

        // 상태 업데이트
        setPersonaStats((prevStats) => ({
          ...prevStats,
          active: prevStats.active + 1,
          generating: prevStats.generating - 1,
        }));
      } else {
      }
    } catch (error) {
    } finally {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("aipersona")) {
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

    // beforeunload 이벤트 핸들러
    const handleBeforeUnload = (event) => {
      // 이벤트 취소 (표준에 따라)
      event.preventDefault();
      // Chrome은 returnValue 설정 필요
      event.returnValue = "";

      // 새로고침 시 루트 페이지로 이동
      navigate("/Project");
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

  // 자식 컴포넌트에 전달할 핸들러 함수
  const handleCustomizePopup = () => {
    setActiveTabIndex(0);
    setSelectedPersona(null);
    setIsCustomizePopupOpen(true);
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />
        <MoleculeHeader />

        <MainContent Wide1030>
          <AiPersonaWrap>
            <AiPersonaTitle>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                {educationState && (
                  <LogoCard>
                    <img
                      src={`/images/Logo/${sessionStorage.getItem(
                        "educationLogo"
                      )}`}
                      alt="logo"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/Logo/interviewX_symbol.png";
                      }}
                    />
                  </LogoCard>
                )}
                <div>
                  <H1 color="gray800" align="left">
                    AI Persona
                    <TooltipButtonType2
                      onClick={() =>
                        setShowPersonaTypeTooltip(!showPersonaTypeTooltip)
                      }
                    >
                      {showPersonaTypeTooltip && (
                        <TooltipContent>
                          <TooltipHeader>
                            <Body2 color="gray800" align="left">
                              페르소나 종류 알아보기
                            </Body2>
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowPersonaTypeTooltip(false);
                              }}
                            />
                          </TooltipHeader>

                          <TooltipBody>
                            <div>
                              <Sub1 color="gray800">Macro Segment</Sub1>
                              <Sub3 color="gray700" align="left">
                                제품/서비스의 주요 특성에 따라 나뉜 비슷한
                                특성의 고객 그룹을 제시합니다. 제품의 성격에
                                맞는 크고 대표적인 사용자 군을 확인할 수 있어요.
                              </Sub3>
                            </div>

                            <div>
                              <Sub1 color="gray800">Unique User</Sub1>
                              <Sub3 color="gray700" align="left">
                                제품을 일반적인 방식과 다르게, 자신만의 방식으로
                                활용하는 특별한 사용자를 제시합니다. 창의적이고
                                독특한 사용 사례를 통해 새로운 인사이트를 얻을
                                수 있어요.
                              </Sub3>
                            </div>

                            <div>
                              <Sub1 color="gray800">Key Stakeholder</Sub1>
                              <Sub3 color="gray700" align="left">
                                제품이나 프로젝트에 직접적인 영향을 주는 전문가
                                및 주요 의사결정자를 제시합니다. 기획부터
                                운영까지, 중요한 의견과 판단을 내릴 수 있는 핵심
                                인물들이에요.
                              </Sub3>
                            </div>

                            <div>
                              <Sub1 color="gray800">My Persona</Sub1>
                              <Sub3 color="gray700" align="left">
                                원하는 사용자 유형을 입력하면, 그에 적합한
                                페르소나를 자동으로 제시합니다. 아이디어
                                단계에서 목표 사용자를 빠르게 그려볼 수 있어요.
                              </Sub3>
                            </div>
                          </TooltipBody>
                        </TooltipContent>
                      )}
                    </TooltipButtonType2>
                  </H1>
                  <div style={{ height: "10px" }}></div>
                  <Body3 color="gray700" align="left">
                    AI Persona를 탐색하고, 비즈니스에 맞는 인사이트를 찾아보세요
                  </Body3>
                </div>
              </div>

              {/* <Button
                ExLarge
                PrimaryLightest
                Fill
                onClick={() => {
                  setActiveTabIndex(0);
                  setIsCustomizePopupOpen(true);
                }}
              >
                <img src={images.PlusPrimary} width="14" height="14" />
                <Sub2 color="primary">나만의 AI Persona 요청</Sub2>
              </Button> */}
            </AiPersonaTitle>

            {personaListSaas && personaListSaas.length > 0 ? (
              <AiPersonaContent>
                <TabWrapType3 Border>
                  <TabButtonType3
                    className={activeTab === "macro_segment" ? "active" : ""}
                    onClick={() => handleTabClick("macro_segment")}
                    isActive={activeTab === "macro_segment"}
                    style={
                      activeTab === "macro_segment"
                        ? { color: "#333333" }
                        : { color: "#999999" }
                    }
                  >
                    Macro Segment
                  </TabButtonType3>
                  <TabButtonType3
                    className={activeTab === "unique_user" ? "active" : ""}
                    onClick={() => handleTabClick("unique_user")}
                    isActive={activeTab === "unique_user"}
                    style={
                      activeTab === "unique_user"
                        ? { color: "#333333" }
                        : { color: "#999999" }
                    }
                  >
                    Unique User
                  </TabButtonType3>
                  <TabButtonType3
                    className={activeTab === "key_stakeholder" ? "active" : ""}
                    onClick={() => handleTabClick("key_stakeholder")}
                    isActive={activeTab === "key_stakeholder"}
                    style={
                      activeTab === "key_stakeholder"
                        ? { color: "#333333" }
                        : { color: "#999999" }
                    }
                  >
                    Key Stakeholder
                  </TabButtonType3>
                  <TabButtonType3
                    className={activeTab === "my_persona" ? "active" : ""}
                    onClick={() => handleTabClick("my_persona")}
                    isActive={activeTab === "my_persona"}
                    style={
                      activeTab === "my_persona"
                        ? { color: "#333333" }
                        : { color: "#999999" }
                    }
                  >
                    My Persona
                  </TabButtonType3>
                  <TabButtonType3
                    className={activeTab === "my_favorite" ? "active" : ""}
                    onClick={() => handleTabClick("my_favorite")}
                    isActive={activeTab === "my_favorite"}
                    style={
                      activeTab === "my_favorite"
                        ? { color: "#333333" }
                        : { color: "#999999" }
                    }
                  >
                    Favorite
                    {educationState && ` (${favoriteCount} / 20)`}
                  </TabButtonType3>
                </TabWrapType3>

                <AiPersonaInfo>
                  <div>
                    <div>
                      <span className="inactive" />
                      <InputText color="gray500">
                        비활성 페르소나{" "}
                        <strong>({currentTabStats.inactive})</strong>
                        <div style={{ width: "6px" }}></div>
                      </InputText>
                    </div>
                    <div>
                      <span className="generating">
                        <images.ArrowClockwise2
                          width="14"
                          height="14"
                          color={palette.primary}
                        />
                      </span>
                      <InputText color="gray700">
                        생성 중 <strong>({currentTabStats.generating})</strong>
                      </InputText>
                      <div style={{ width: "6px" }}></div>
                    </div>
                    <div>
                      <span className="active">
                        <img src={images.IconCheck3} width="8" />
                      </span>
                      <InputText color="gray700">
                        활성 페르소나{" "}
                        <strong>({currentTabStats.active})</strong>
                      </InputText>
                      <div style={{ width: "6px" }}></div>
                    </div>
                  </div>

                  {activeTab === "unique_user" && (
                    <TooltipButton
                      onClick={() =>
                        setShowUniqueUserTooltip(!showUniqueUserTooltip)
                      }
                    >
                      <Sub3 color="gray500">Unique User 칩 알아보기</Sub3>
                      {showUniqueUserTooltip && (
                        <TooltipContentUniqueUser>
                          <TooltipHeader>
                            Unique User 칩 알아보기
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowUniqueUserTooltip(false);
                              }}
                            />
                          </TooltipHeader>

                          <TooltipBody>
                            <div>
                              <UniqueTag color="Hacker" />
                              <Sub3 color="gray700" align="left">
                                제품을 남들과는 다르게, 창의적으로 사용하는
                                사용자!
                                <br />
                                기능을 파고들어 더 똑똑하게, 자유롭게 사용하는
                                하는 사용자 유형입니다
                              </Sub3>
                            </div>

                            <div>
                              <UniqueTag color="LeadUser" />
                              <Sub3 color="gray700" align="left">
                                아직 세상에 없는 기능까지 바라는, 미래형 사용자!
                                <br />
                                제품 개발에 큰 영향을 줄 수 있는 아이디어를
                                보유하고 있는 사용자 유형입니다.
                              </Sub3>
                            </div>

                            <div>
                              <UniqueTag color="SuperUser" />
                              <Sub3 color="gray700" align="left">
                                제품을 깊이 있게 잘 아는 전문가급 사용자. 오랜
                                사용 경험으로 다른 사람도 도와줄 수 있는 정도의
                                지식이 있는 사용자 유형입니다.
                              </Sub3>
                            </div>

                            <div>
                              <UniqueTag color="EarlyAdopter" />
                              <Sub3 color="gray700" align="left">
                                새로운 걸 보면 무조건 써보는 얼리 얼리버드!
                                새로운 걸 두려워하지 않고 잘 받아들이는 사용자
                                유형입니다.
                              </Sub3>
                            </div>

                            <div>
                              <UniqueTag color="Innovator" />
                              <Sub3 color="gray700" align="left">
                                누구보다 먼저 새로운 걸 시도하는 실험가!
                                <br />
                                신기술이나 신제품을 가장 먼저 써보는 사용자
                                유형입니다.
                              </Sub3>
                            </div>

                            <div>
                              <UniqueTag color="CreativeAdopter" />
                              <Sub3 color="gray700" align="left">
                                누구보다 남다른 방식으로 재해석하는 창의적
                                적응자!
                                <br />
                                남다른 방식으로 기술과 제품을 새롭게
                                조합·활용하는 사용자 유형입니다.
                              </Sub3>
                            </div>

                            <div>
                              <UniqueTag color="NonUser" />
                              <Sub3 color="gray700" align="left">
                                변화보단 익숙함을 선호하는 사용자.
                                <br />
                                새로운 기술이나 서비스에 관심이 적고, 변화에
                                신중한 사용자 유형입니다.
                              </Sub3>
                            </div>

                            <div>
                              <UniqueTag color="Critic" />
                              <Sub3 color="gray700" align="left">
                                제품의 단점과 문제를 날카롭게 지적하는 비판적
                                사용자. 작은 불편도 그냥 넘기지 않고, 기대치가
                                높아 불만과 피드백을 자주 표현하는 사용자
                                유형입니다.
                              </Sub3>
                            </div>
                          </TooltipBody>
                        </TooltipContentUniqueUser>
                      )}
                    </TooltipButton>
                  )}

                  {activeTab === "my_persona" && (
                    <Button
                      ExLarge
                      PrimaryLightest
                      Fill
                      onClick={() => {
                        setActiveTabIndex(0);
                        setSelectedPersona(null);
                        setIsCustomizePopupOpen(true);
                      }}
                    >
                      <img src={images.PlusPrimary} width="14" height="14" />
                      <Sub2 color="primary">My Persona 요청</Sub2>
                    </Button>
                  )}

                  {activeTab === "my_favorite" && favoriteCount > 0 && (
                    <Button
                      ExLarge
                      PrimaryLightest
                      Fill
                      onClick={() => {
                        handleDownloadFavoritePersonas();
                      }}
                    >
                      <img src={images.IconDownload2} width="14" height="14" />
                      <Sub2 color="primary">다운로드</Sub2>
                    </Button>
                  )}
                </AiPersonaInfo>

                <div style={{ position: "relative" }}>
                  <OrganismPersonaCardList
                    personaData={personaListSaas}
                    setIsStarred={updatePersonaList}
                    setShowPopup={openPersonaPopup}
                    activeTab={activeTab}
                    setPersonaStats={setPersonaStats}
                    onCustomizeRequest={handleCustomizePopup}
                    loadingTabs={loadingTabs}
                    setLoadingTabs={setLoadingTabs}
                  />
                  {activeTab === "my_persona" && loadingTabs.my_persona && (
                    <div className="more">
                      <AtomPersonaLoader message="페르소나를 생성하고 있습니다." />
                    </div>
                  )}
                </div>
              </AiPersonaContent>
            ) : (
              <OrganismEmptyPersona />
            )}
          </AiPersonaWrap>
        </MainContent>
      </ContentsWrap>

      {showPopup && (
        <>
          <InterviewPopup>
            <div style={{ maxWidth: "560px" }}>
              <div className="header">
                <H4>
                  {currentPersona?.personaName || "시간이 부족한 바쁜 프리랜서"}
                  <span className="close" onClick={() => setShowPopup(false)} />
                </H4>
                <p className="info noLine">
                  <Sub3>#{currentPersona?.gender || "남성"}</Sub3>
                  <Sub3>#{currentPersona?.age || "20세"}</Sub3>
                  <Sub3>
                    #{currentPersona?.keywords[0] || "은퇴 후 건강 관리에 집중"}
                  </Sub3>
                  <Sub3>
                    #{currentPersona?.keywords[1] || "부드러운 기상 선호"}
                  </Sub3>
                </p>
              </div>

              <div className="content">
                {isLoading ? (
                  <AtomPersonaLoader message="페르소나 프로필을 생성하고 있습니다." />
                ) : (
                  <>
                    <TabWrapType2>
                      <TabButtonType2
                        isActive={activeTab2 === "lifestyle"}
                        onClick={() => setActiveTab2("lifestyle")}
                        style={{ padding: "4px 10px" }}
                      >
                        {currentPersona.personaType === "key_stakeholder"
                          ? "역할 및 기여"
                          : "라이프스타일"}
                      </TabButtonType2>
                      <TabButtonType2
                        isActive={activeTab2 === "interests"}
                        onClick={() => setActiveTab2("interests")}
                        style={{ padding: "4px 10px" }}
                      >
                        {currentPersona.personaType === "key_stakeholder"
                          ? "전문 분야"
                          : "관심사"}
                      </TabButtonType2>
                      <TabButtonType2
                        isActive={activeTab2 === "consumption"}
                        onClick={() => setActiveTab2("consumption")}
                        style={{ padding: "4px 10px" }}
                      >
                        {currentPersona.personaType === "key_stakeholder"
                          ? "의사결정권"
                          : "소비성향"}
                      </TabButtonType2>
                      <TabButtonType2
                        isActive={activeTab2 === "experience"}
                        onClick={() => setActiveTab2("experience")}
                        style={{ padding: "4px 10px" }}
                      >
                        {currentPersona.personaType === "key_stakeholder"
                          ? "관련경험"
                          : "사용경험"}
                      </TabButtonType2>
                      {currentPersona.personaType === "my_persona" && (
                        <TabButtonType2
                          isActive={activeTab2 === "requestinfo"}
                          onClick={() => setActiveTab2("requestinfo")}
                          style={{ padding: "4px 10px" }}
                        >
                          요청정보
                        </TabButtonType2>
                      )}
                    </TabWrapType2>

                    {activeTab2 === "lifestyle" && (
                      <TabContent style={{ height: "470px" }}>
                        <Body3 color="gray700">
                          {currentPersona.lifestyle ||
                            "학업과 여가를 균형 있게 추구하며, 문화적 호기심이 많습니다. 대학 근처의 문화 공간을 자주 방문하며, 예술 전시와 독립영화를 감상하거나 워크숍에 참여합니다."}
                        </Body3>
                      </TabContent>
                    )}
                    {activeTab2 === "interests" && (
                      <TabContent style={{ height: "470px" }}>
                        <Body3 color="gray700">
                          {currentPersona.interests ||
                            "학업과 여가를 균형 있게 추구하며, 문화적 호기심이 많습니다. 대학 근처의 문화 공간을 자주 방문하며, 예술 전시와 독립영화를 감상하거나 워크숍에 참여합니다."}
                        </Body3>
                      </TabContent>
                    )}
                    {activeTab2 === "consumption" && (
                      <TabContent style={{ height: "470px" }}>
                        <Body3 color="gray700">
                          {currentPersona.consumptionPattern ||
                            "학업과 여가를 균형 있게 추구하며, 문화적 호기심이 많습니다. 대학 근처의 문화 공간을 자주 방문하며, 예술 전시와 독립영화를 감상하거나 워크숍에 참여합니다."}
                        </Body3>
                      </TabContent>
                    )}
                    {activeTab2 === "experience" && (
                      <>
                        <BoxWrap Column Small>
                          <SelectBox>
                            <SelectBoxTitle None>
                              <div style={{ display: "flex", gap: "10px" }}>
                                <div style={{ width: "60px" }}>
                                  <Body2 color="gray300">
                                    {currentPersona.personaType ===
                                    "key_stakeholder"
                                      ? "영향력"
                                      : "경험여부"}
                                  </Body2>
                                </div>
                                <Body2
                                  color={
                                    currentPersona.experienceDepth
                                      ? "gray700"
                                      : "gray300"
                                  }
                                >
                                  {mapExperienceDepth(
                                    currentPersona.experienceDepth
                                  )}
                                </Body2>
                              </div>
                            </SelectBoxTitle>
                          </SelectBox>

                          <SelectBox>
                            <SelectBoxTitle None>
                              <div style={{ display: "flex", gap: "10px" }}>
                                <div style={{ width: "60px" }}>
                                  <Body2 color="gray300">
                                    {currentPersona.personaType ===
                                    "key_stakeholder"
                                      ? "이해수준"
                                      : "사용수준"}
                                  </Body2>
                                </div>
                                <Body2
                                  color={
                                    currentPersona.usageDepth
                                      ? "gray700"
                                      : "gray300"
                                  }
                                >
                                  {mapUsageDepth(currentPersona.usageDepth)}
                                </Body2>
                              </div>
                            </SelectBoxTitle>
                          </SelectBox>
                        </BoxWrap>
                        <TabContent style={{ height: "358px" }}>
                          <Body3 color="gray700">
                            {currentPersona.userExperience ||
                              "학업과 여가를 균형 있게 추구하며, 문화적 호기심이 많습니다. 대학 근처의 문화 공간을 자주 방문하며, 예술 전시와 독립영화를 감상하거나 워크숍에 참여합니다."}
                          </Body3>
                        </TabContent>
                      </>
                    )}
                    {activeTab2 === "requestinfo" && (
                      <TabContent style={{ height: "470px" }}>
                        <ListWrap>
                          <div className="flex">
                            <div>
                              <Body3 color="gray500" align="left">
                                성별
                              </Body3>
                              <Body2 color="gray800" align="left">
                                {currentPersona.customData.persona_gender}
                              </Body2>
                            </div>

                            <div>
                              <Body3 color="gray500" align="left">
                                연령
                              </Body3>
                              <Body2 color="gray800" align="left">
                                {currentPersona.customData.persona_age}
                              </Body2>
                            </div>
                          </div>

                          <div>
                            <Body3 color="gray500" align="left">
                              이유, 목적
                            </Body3>
                            <Body2 color="gray800" align="left">
                              {currentPersona.customData.persona_reason ||
                                "*해당정보 없음"}
                            </Body2>
                          </div>

                          <div>
                            <Body3 color="gray500" align="left">
                              추가정보
                            </Body3>
                            <Body2 color="gray800" align="left">
                              {currentPersona.customData
                                .persona_additional_info || "*해당정보 없음"}
                            </Body2>
                          </div>

                          <div style={{ gap: "12px" }}>
                            <Body3 color="gray500" align="left">
                              성격(OCEAN)
                            </Body3>
                            <div className="box-list">
                              <div>
                                <Body2 color="gray800" align="center">
                                  {
                                    currentPersona.customData.persona_ocean
                                      .type_o
                                  }
                                </Body2>
                                <Sub3 color="gray300" align="center">
                                  {currentPersona.customData.persona_ocean
                                    .type_o === "보수적"
                                    ? "conservative"
                                    : "open mind"}
                                </Sub3>
                              </div>
                              <div>
                                <Body2 color="gray800" align="center">
                                  {
                                    currentPersona.customData.persona_ocean
                                      .type_c
                                  }
                                </Body2>
                                <Sub3 color="gray300" align="center">
                                  {currentPersona.customData.persona_ocean
                                    .type_c === "즉흥적"
                                    ? "impromptu"
                                    : "conscientious"}
                                </Sub3>
                              </div>
                              <div>
                                <Body2 color="gray800" align="center">
                                  {
                                    currentPersona.customData.persona_ocean
                                      .type_e
                                  }
                                </Body2>
                                <Sub3 color="gray300" align="center">
                                  {currentPersona.customData.persona_ocean
                                    .type_e === "내향적"
                                    ? "introvert"
                                    : "extrovert"}
                                </Sub3>
                              </div>
                              <div>
                                <Body2 color="gray800" align="center">
                                  {
                                    currentPersona.customData.persona_ocean
                                      .type_a
                                  }
                                </Body2>
                                <Sub3 color="gray300" align="center">
                                  {currentPersona.customData.persona_ocean
                                    .type_a === "독립적"
                                    ? "independent"
                                    : "friendly"}
                                </Sub3>
                              </div>
                              <div>
                                <Body2 color="gray800" align="center">
                                  {
                                    currentPersona.customData.persona_ocean
                                      .type_n
                                  }
                                </Body2>
                                <Sub3 color="gray300" align="center">
                                  {currentPersona.customData.persona_ocean
                                    .type_n === "무던함"
                                    ? "simple"
                                    : "neurotic"}
                                </Sub3>
                              </div>
                            </div>
                          </div>
                        </ListWrap>
                      </TabContent>
                    )}
                  </>
                )}
              </div>

              {!isLoading && (
                <ButtonGroup>
                  {["request", "ing"].includes(currentPersona.status) ? (
                    <Button DbExLarge Disabled Fill W100>
                      <Sub1 color="gray700">생성 중인 페르소나 입니다.</Sub1>
                    </Button>
                  ) : currentPersona.status === "complete" ? (
                    <Button
                      DbExLarge
                      Primary
                      Fill
                      W100
                      onClick={() => {
                        navigate("/Persona3Single");
                      }}
                    >
                      {/* <Sub1>인터뷰 가능한 활성 페르소나 입니다.</Sub1> */}
                      <Sub1>활성 페르소나와 심층 인터뷰 하러가기</Sub1>
                    </Button>
                  ) : (
                    <>
                      <Button
                        DbExLarge
                        PrimaryLightest
                        Fill
                        W100
                        onClick={() => setIsEditPopupOpen(true)}
                      >
                        페르소나 편집
                      </Button>
                      <Button
                        DbExLarge
                        Primary
                        Fill
                        W100
                        onClick={() => handleRequestClick(currentPersona)}
                      >
                        인터뷰 활성화 요청
                      </Button>
                    </>
                  )}
                </ButtonGroup>
              )}
            </div>
          </InterviewPopup>
        </>
      )}

      {isEditPopupOpen && (
        <PopupWrap
          Warning
          title="편집을 진행하시겠습니까?"
          message="편집한 페르소나 정보는 되돌릴 수 없으니, 다시 한 번 내용을 확인해주세요."
          buttonType="Outline"
          closeText="취소"
          confirmText="페르소나 편집"
          isModal={false}
          onCancel={handleEditClose}
          onConfirm={() => {
            setIsEditPopupOpen(false);
            setShowPopup(false);
            setIsCreatePopupOpen(false);
            setIsCustomizePopupOpen(false);
            setIsPersonaEditPopupOpen(true);
          }}
        />
      )}

      {isCreatePopupOpen && (
        <PopupWrap
          Warning
          title="사용경험에 대한 내용을 입력해주세요"
          message="사용경험에 대한 내용은 필수입력 항목입니다"
          buttonType="Outline"
          confirmText="확인"
          isModal={false}
          onConfirm={handleCreateContinue}
        />
      )}

      {isCustomizePopupOpen && (
        <PopupWrap
          TitleFlex
          title="📝 My Persona"
          buttonType="Fill"
          confirmText={
            activeTabIndex === 0
              ? "다음"
              : activeTabIndex === 1
              ? "다음"
              : "마이 페르소나 요청하기"
          }
          showPrevButton={activeTabIndex === 2} // 마지막 탭에서만 이전 버튼 표시
          prevText="이전"
          onPrev={handlePrevTab2}
          isModal={true}
          onCancel={handleCustomizePopupClose}
          onConfirm={
            activeTabIndex === 2
              ? handleCustomPersonaRequestPopup
              : handleCustomizePopupConfirm
          }
          showTabs={true}
          tabs={["기본정보", "OCEAN 정보", "요청사항확인"]}
          onTabChange={handleTabChange}
          activeTab={activeTabIndex}
          eventState={false}
          creditRequestCustomPersona={100}
          isFormValid={isCustomizeFormValid()}
          body={
            <div>
              {activeTabIndex === 0 && (
                <>
                  <div className="flex">
                    <div className="column">
                      <Body2 color="gray700" align="left">
                        성별<span style={{ color: "red" }}>*</span>
                      </Body2>

                      <SelectBox>
                        <SelectBoxTitle
                          Small
                          onClick={() => toggleSelectBox("gender")}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            {customPersonaForm.gender && (
                              <img
                                src={
                                  customPersonaForm.gender === "male"
                                    ? images.GenderMenPrimary
                                    : images.GenderWomenPrimary
                                }
                                alt="성별"
                                style={{ width: "25px", height: "25px" }}
                              />
                            )}
                            <Body2
                              color={
                                customPersonaForm.gender ? "primary" : "gray300"
                              }
                            >
                              {customPersonaForm.gender === "male"
                                ? "남성"
                                : customPersonaForm.gender === "female"
                                ? "여성"
                                : "선택해주세요"}
                            </Body2>
                          </div>
                          <images.ChevronDown
                            width="24px"
                            height="24px"
                            color={palette.gray500}
                            style={{
                              transform: selectBoxStates.gender
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </SelectBoxTitle>

                        {selectBoxStates.gender && (
                          <SelectBoxList>
                            <SelectBoxItem
                              onClick={() => {
                                handleFormChange("gender", "male");
                                handlePurposeSelect("남성", "gender");
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                남성
                              </Body2>
                            </SelectBoxItem>
                            <SelectBoxItem
                              onClick={() => {
                                handleFormChange("gender", "female");
                                handlePurposeSelect("여성", "gender");
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                여성
                              </Body2>
                            </SelectBoxItem>
                          </SelectBoxList>
                        )}
                      </SelectBox>
                    </div>

                    <div className="column">
                      <Body2 color="gray700" align="left">
                        연령<span style={{ color: "red" }}>*</span>
                      </Body2>

                      <SelectBox>
                        <SelectBoxTitle
                          Small
                          onClick={() => toggleSelectBox("age")}
                        >
                          <Body2
                            color={selectedValues.age ? "primary" : "gray300"}
                          >
                            {selectedValues.age || "선택해주세요"}
                          </Body2>
                          <images.ChevronDown
                            width="24px"
                            height="24px"
                            color={palette.gray500}
                            style={{
                              transform: selectBoxStates.age
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </SelectBoxTitle>

                        {selectBoxStates.age && (
                          <SelectBoxList>
                            {[
                              "10대",
                              "20대",
                              "30대",
                              "40대",
                              "50대",
                              "60대",
                              "70대",
                            ].map((ageGroup) => (
                              <SelectBoxItem
                                key={ageGroup}
                                onClick={() => {
                                  const newAgeGroups = [ageGroup]; // 선택한 항목만 배열에 포함
                                  handleFormChange("ageGroups", newAgeGroups);
                                  handlePurposeSelect(ageGroup, "age"); // 단일 값만 전달
                                }}
                              >
                                <Body2 color="gray700" align="left">
                                  {ageGroup}
                                </Body2>
                              </SelectBoxItem>
                            ))}
                          </SelectBoxList>
                        )}
                      </SelectBox>
                    </div>
                  </div>

                  <div className="column">
                    <Body2 color="gray700" align="left">
                      맞춤 페르소나를 생성하는 이유와 목적이 무엇인가요?
                      <span style={{ color: "red" }}>*</span>
                    </Body2>
                    <PopupContent>
                      <CustomTextarea
                        width="100%"
                        rows={5}
                        placeholder="이유와 목적을 알려주시면 상황에 걸맞은 최적의 페르소나를 생성해 드려요!(현재는 B2C 페르소나만 요청 가능합니다)"
                        value={customPersonaForm.purpose}
                        onChange={(e) =>
                          handleFormChange("purpose", e.target.value)
                        }
                      />
                    </PopupContent>
                  </div>

                  <div className="column">
                    <Body2 color="gray700" align="left">
                      추가로 고려해야할 정보가 있다면 작성해주세요.{" "}
                      {/* <span style={{ color: "red" }}>*</span> */}
                    </Body2>
                    <PopupContent>
                      <CustomTextarea
                        width="100%"
                        rows={5}
                        placeholder="추가로 고려해야할 정보가 있다면 작성해주세요."
                        value={customPersonaForm.additionalInfo}
                        onChange={(e) =>
                          handleFormChange("additionalInfo", e.target.value)
                        }
                      />
                    </PopupContent>
                  </div>
                </>
              )}

              {activeTabIndex === 1 && (
                <>
                  <BgBoxItem NoOutline style={{ marginBottom: "10px" }}>
                    <Sub3 color="gray500" align="left">
                      OCEAN이란?
                      <br />
                      성격 심리학에서 인간의 성격을 설명하는 다섯 요인
                      창의성(Openness), 성실성(Conscientiouseness),
                      외향성(Extraversion), 친화성(Agreeableness), 정서적
                      안정성(Neuroticism)을 평가하는 방법입니다.
                    </Sub3>
                  </BgBoxItem>

                  <OCEANRangeWrap>
                    <div>
                      <Body3 color="gray800">보수적</Body3>
                      <RangeSlider
                        type="range"
                        min="0"
                        max="1"
                        step="0.5"
                        value={oceanValues.openness}
                        onChange={(e) =>
                          handleOceanChange("openness", e.target.value)
                        }
                        disabled={ignoreOcean}
                        $ignored={ignoreOcean}
                      />
                      <Body3 color="gray800">개방적</Body3>
                    </div>
                    <div>
                      <Body3 color="gray800">즉흥적</Body3>
                      <RangeSlider
                        type="range"
                        min="0"
                        max="1"
                        step="0.5"
                        value={oceanValues.conscientiousness}
                        onChange={(e) =>
                          handleOceanChange("conscientiousness", e.target.value)
                        }
                        disabled={ignoreOcean}
                        $ignored={ignoreOcean}
                      />
                      <Body3 color="gray800">성실함</Body3>
                    </div>
                    <div>
                      <Body3 color="gray800">내향적</Body3>
                      <RangeSlider
                        type="range"
                        min="0"
                        max="1"
                        step="0.5"
                        value={oceanValues.extraversion}
                        onChange={(e) =>
                          handleOceanChange("extraversion", e.target.value)
                        }
                        disabled={ignoreOcean}
                        $ignored={ignoreOcean}
                      />
                      <Body3 color="gray800">외향적</Body3>
                    </div>
                    <div>
                      <Body3 color="gray800">독립적</Body3>
                      <RangeSlider
                        type="range"
                        min="0"
                        max="1"
                        step="0.5"
                        value={oceanValues.agreeableness}
                        onChange={(e) =>
                          handleOceanChange("agreeableness", e.target.value)
                        }
                        disabled={ignoreOcean}
                        $ignored={ignoreOcean}
                      />
                      <Body3 color="gray800">우호적</Body3>
                    </div>
                    <div>
                      <Body3 color="gray800">무던함</Body3>
                      <RangeSlider
                        type="range"
                        min="0"
                        max="1"
                        step="0.5"
                        value={oceanValues.neuroticism}
                        onChange={(e) =>
                          handleOceanChange("neuroticism", e.target.value)
                        }
                        disabled={ignoreOcean}
                        $ignored={ignoreOcean}
                      />
                      <Body3 color="gray800">신경적</Body3>
                    </div>
                  </OCEANRangeWrap>

                  <div style={{ marginTop: "12px", textAlign: "left" }}>
                    <CheckBox Fill>
                      <input
                        type="checkbox"
                        id="chk1"
                        checked={ignoreOcean}
                        onChange={handleRandomOcean}
                        style={{ display: "block" }}
                      />
                      <label htmlFor="chk1">
                        페르소나의 성격 유형을 랜덤으로 생성 하겠습니다.
                      </label>
                    </CheckBox>
                  </div>
                </>
              )}

              {activeTabIndex === 2 && (
                <>
                  <BgBoxItem
                    NoOutline
                    style={{ marginBottom: "10px", alignItems: "flex-start" }}
                  >
                    <Sub3 color="gray500" align="left">
                      💡 맞춤 페르소나 요청이 많은 경우,
                      <br />
                      페르소나 생성 시간이 다소 길어질 수 있는 점 양해
                      부탁드립니다.
                      <br />
                      보다 정확하고 정교한 페르소나를 제공해 드릴 수 있도록
                      최선을 다하겠습니다. 😊
                    </Sub3>
                  </BgBoxItem>

                  <div className="flex">
                    <div>
                      <Body3 color="gray500" align="left">
                        성별
                      </Body3>
                      <Body2 color="gray800" align="left">
                        {customPersonaForm.gender === "male" ? "남성" : "여성"}
                      </Body2>
                    </div>

                    <div>
                      <Body3 color="gray500" align="left">
                        연령
                      </Body3>
                      <Body2 color="gray800" align="left">
                        {customPersonaForm.ageGroups}
                      </Body2>
                    </div>
                  </div>

                  <div>
                    <Body3 color="gray500" align="left">
                      이유, 목적
                    </Body3>
                    <Body2 color="gray800" align="left">
                      {customPersonaForm.purpose || "*해당정보 없음"}
                    </Body2>
                  </div>

                  <div>
                    <Body3 color="gray500" align="left">
                      추가정보
                    </Body3>
                    <Body2 color="gray800" align="left">
                      {customPersonaForm.additionalInfo || "*해당정보 없음"}
                    </Body2>
                  </div>

                  <div>
                    <Body3 color="gray500" align="left">
                      성격(OCEAN)
                    </Body3>
                    <div className="box-list">
                      <div>
                        <Body2 color="gray800">
                          {oceanValues.openness === 0 ? "보수적" : "개방적"}
                        </Body2>
                        <Sub3 color="gray300">
                          {oceanValues.openness === 0
                            ? "conservative"
                            : "open mind"}
                        </Sub3>
                      </div>
                      <div>
                        <Body2 color="gray800">
                          {oceanValues.conscientiousness === 0
                            ? "즉흥적"
                            : "성실함"}
                        </Body2>
                        <Sub3 color="gray300">
                          {oceanValues.conscientiousness === 0
                            ? "impromptu"
                            : "conscientious"}
                        </Sub3>
                      </div>
                      <div>
                        <Body2 color="gray800">
                          {oceanValues.extraversion === 0 ? "내향적" : "외향적"}
                        </Body2>
                        <Sub3 color="gray300">
                          {oceanValues.extraversion === 0
                            ? "introvert"
                            : "extrovert"}
                        </Sub3>
                      </div>
                      <div>
                        <Body2 color="gray800">
                          {oceanValues.agreeableness === 0
                            ? "독립적"
                            : "우호적"}
                        </Body2>
                        <Sub3 color="gray300">
                          {oceanValues.agreeableness === 0
                            ? "independent"
                            : "friendly"}
                        </Sub3>
                      </div>
                      <div>
                        <Body2 color="gray800">
                          {oceanValues.neuroticism === 0 ? "무던함" : "신경적"}
                        </Body2>
                        <Sub3 color="gray300">
                          {oceanValues.neuroticism === 0
                            ? "simple"
                            : "neurotic"}
                        </Sub3>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          }
        />
      )}

      {isPersonaEditPopupOpen && (
        <PopupWrap
          TitleFlex
          title={currentPersona.personaName || ""}
          buttonType="Fill"
          confirmText={activeTabIndex1 === 4 ? "변경사항 저장하기" : "다음"}
          showPrevButton={activeTabIndex1 !== 0}
          prevText={activeTabIndex1 !== 0 ? "뒤로" : ""}
          prevTextSmall
          onPrev={handlePrevTab}
          isModal={true}
          onCancel={handlePersonaEditClose}
          onConfirm={() => {
            if (activeTabIndex1 === 4) {
              setIsPersonaConfirmPopupOpen(true);
            } else {
              handlePersonaEditContinue();
            }
          }}
          showTabs={true}
          tabs={
            currentPersona.personaType === "key_stakeholder"
              ? [
                  "기본정보",
                  "역할 및 기여",
                  "전문 분야",
                  "의사결정권",
                  "관련경험",
                ]
              : ["기본정보", "라이프스타일", "관심사", "소비성향", "사용경험"]
          }
          onTabChange={handleTabChange}
          activeTab={activeTabIndex1}
          eventState={false}
          creditRequestCustomPersona={100}
          isFormValid={isPersonaEditFormValid()}
          bottomText={
            activeTabIndex1 === 4
              ? "AI Persona의 제품 경험은 경험여부와 사용수준에 따라 달라질 수 있습니다"
              : null
          }
          body={
            <div>
              {activeTabIndex1 === 0 && (
                <>
                  <div>
                    <Body1 color="gray700" align="left">
                      성별
                    </Body1>
                    <PopupContent>
                      <SelectBox>
                        <SelectBoxTitle
                          edit
                          onClick={() => toggleSelectBox("gender")}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <Body2
                              color={
                                currentPersona.gender ? "gray700" : "gray300"
                              }
                            >
                              {currentPersona.gender === "남성"
                                ? "남성"
                                : currentPersona.gender === "여성"
                                ? "여성"
                                : "성별"}
                            </Body2>
                          </div>
                          <images.ChevronDown
                            width="24px"
                            height="24px"
                            color={palette.gray500}
                            style={{
                              transform: selectBoxStates.gender
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </SelectBoxTitle>

                        {selectBoxStates.gender && (
                          <SelectBoxList>
                            <SelectBoxItem
                              onClick={() => {
                                handleCurrentPersonaChange("gender", "남성");
                                toggleSelectBox("gender");
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                남성
                              </Body2>
                            </SelectBoxItem>
                            <SelectBoxItem
                              onClick={() => {
                                handleCurrentPersonaChange("gender", "여성");
                                toggleSelectBox("gender");
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                여성
                              </Body2>
                            </SelectBoxItem>
                          </SelectBoxList>
                        )}
                      </SelectBox>
                    </PopupContent>
                  </div>

                  <div>
                    <Body1 color="gray700" align="left">
                      나이
                    </Body1>
                    <PopupContent>
                      <FormBox>
                        <CustomInput
                          Edit
                          type="text"
                          placeholder="나이"
                          value={currentPersona.age || ""}
                          onChange={(e) =>
                            handleCurrentPersonaChange("age", e.target.value)
                          }
                          status="valid"
                        />
                      </FormBox>
                    </PopupContent>
                  </div>

                  <div>
                    <Body1 color="gray700" align="left">
                      주요 특징
                    </Body1>
                    <PopupContent>
                      <FormBox>
                        <CustomInput
                          Edit
                          type="text"
                          placeholder="주요 특징 1"
                          value={
                            currentPersona.keywords &&
                            currentPersona.keywords[0]
                              ? currentPersona.keywords[0]
                              : ""
                          }
                          onChange={(e) => {
                            const updatedKeywords = [
                              ...(Array.isArray(currentPersona.keywords)
                                ? currentPersona.keywords
                                : []),
                            ];
                            updatedKeywords[0] = e.target.value;
                            handleCurrentPersonaChange(
                              "keywords",
                              updatedKeywords
                            );
                          }}
                          status="valid"
                        />
                      </FormBox>
                      <FormBox>
                        <CustomInput
                          Edit
                          type="text"
                          placeholder="주요 특징 2"
                          value={
                            currentPersona.keywords &&
                            currentPersona.keywords[1]
                              ? currentPersona.keywords[1]
                              : ""
                          }
                          onChange={(e) => {
                            const updatedKeywords = [
                              ...(Array.isArray(currentPersona.keywords)
                                ? currentPersona.keywords
                                : []),
                            ];
                            updatedKeywords[1] = e.target.value;
                            handleCurrentPersonaChange(
                              "keywords",
                              updatedKeywords
                            );
                          }}
                          status="valid"
                        />
                      </FormBox>
                    </PopupContent>
                  </div>

                  <div>
                    <Body1 color="gray700" align="left">
                      관련 정보
                    </Body1>
                    <PopupContent>
                      <FormBox>
                        <CustomTextarea
                          Edit
                          placeholder="관련 정보"
                          value={currentPersona.personaCharacteristics || ""}
                          onChange={(e) =>
                            handleCurrentPersonaChange(
                              "personaCharacteristics",
                              e.target.value
                            )
                          }
                          status="valid"
                        />
                      </FormBox>
                    </PopupContent>
                  </div>
                </>
              )}

              {activeTabIndex1 === 1 && (
                <>
                  <div>
                    <PopupContent>
                      <FormBox>
                        <CustomTextarea
                          Edit
                          rows={16}
                          placeholder={
                            currentPersona.personaType === "key_stakeholder"
                              ? "역할 및 기여"
                              : "라이프스타일"
                          }
                          value={currentPersona.lifestyle || ""}
                          onChange={(e) =>
                            handleCurrentPersonaChange(
                              "lifestyle",
                              e.target.value
                            )
                          }
                          status="valid"
                        />
                      </FormBox>
                    </PopupContent>
                  </div>
                </>
              )}

              {activeTabIndex1 === 2 && (
                <>
                  <div>
                    <PopupContent>
                      <FormBox>
                        <CustomTextarea
                          Edit
                          rows={16}
                          placeholder={
                            currentPersona.personaType === "key_stakeholder"
                              ? "전문 분야"
                              : "관심사"
                          }
                          value={currentPersona.interests || ""}
                          onChange={(e) =>
                            handleCurrentPersonaChange(
                              "interests",
                              e.target.value
                            )
                          }
                          status="valid"
                        />
                      </FormBox>
                    </PopupContent>
                  </div>
                </>
              )}

              {activeTabIndex1 === 3 && (
                <>
                  <div>
                    <PopupContent>
                      <FormBox>
                        <CustomTextarea
                          Edit
                          rows={16}
                          placeholder={
                            currentPersona.personaType === "key_stakeholder"
                              ? "의사결정권"
                              : "소비성향"
                          }
                          value={currentPersona.consumptionPattern || ""}
                          onChange={(e) =>
                            handleCurrentPersonaChange(
                              "consumptionPattern",
                              e.target.value
                            )
                          }
                          status="valid"
                        />
                      </FormBox>
                    </PopupContent>
                  </div>
                </>
              )}

              {activeTabIndex1 === 4 && (
                <>
                  <BoxWrap Column NoneV>
                    <div className="selectBoxWrap">
                      <div style={{ width: "90px", paddingLeft: "20px" }}>
                        <Body2 color="gray300">
                          {currentPersona.personaType === "key_stakeholder"
                            ? "영향력"
                            : "경험여부"}
                        </Body2>
                      </div>
                      <SelectBox style={{ paddingRight: "10px" }}>
                        <SelectBoxTitle
                          None
                          onClick={() => {
                            setSelectBoxStates1((prev) => ({
                              ...prev,
                              experienceDepth: !prev.experienceDepth,
                            }));
                          }}
                        >
                          <div style={{ display: "flex", gap: "10px" }}>
                            <Body2
                              color={
                                currentPersona.experienceDepth
                                  ? "gray700"
                                  : "gray300"
                              }
                            >
                              {mapExperienceDepth(
                                currentPersona.experienceDepth
                              )}
                            </Body2>
                          </div>
                          <images.ChevronDown
                            width="24px"
                            height="24px"
                            color={palette.gray500}
                            style={{
                              transform: selectBoxStates1.experienceDepth
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </SelectBoxTitle>

                        {selectBoxStates1.experienceDepth && (
                          <SelectBoxList>
                            <SelectBoxItem
                              onClick={() => {
                                handleCurrentPersonaChange(
                                  "experienceDepth",
                                  "1단계"
                                );
                                setSelectBoxStates1((prev) => ({
                                  ...prev,
                                  experienceDepth: false,
                                }));
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                {currentPersona.personaType ===
                                "key_stakeholder"
                                  ? "조언 제공 가능하나 최종 결정권 없음"
                                  : "이 제품/서비스를 들어본 적도 없음"}
                              </Body2>
                            </SelectBoxItem>
                            <SelectBoxItem
                              onClick={() => {
                                handleCurrentPersonaChange(
                                  "experienceDepth",
                                  "2단계"
                                );
                                setSelectBoxStates1((prev) => ({
                                  ...prev,
                                  experienceDepth: false,
                                }));
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                {currentPersona.personaType ===
                                "key_stakeholder"
                                  ? "제한된 영역에서 피드백 및 일부 결정권 보유"
                                  : "들어본 적은 있지만, 사용해본 적은 없음"}
                              </Body2>
                            </SelectBoxItem>
                            <SelectBoxItem
                              onClick={() => {
                                handleCurrentPersonaChange(
                                  "experienceDepth",
                                  "3단계"
                                );
                                setSelectBoxStates1((prev) => ({
                                  ...prev,
                                  experienceDepth: false,
                                }));
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                {currentPersona.personaType ===
                                "key_stakeholder"
                                  ? "특정 분야 운영 및 성장 방향 결정 가능"
                                  : "사용해본 적은 있지만, 한두 번 경험한 수준"}
                              </Body2>
                            </SelectBoxItem>
                            <SelectBoxItem
                              onClick={() => {
                                handleCurrentPersonaChange(
                                  "experienceDepth",
                                  "4단계"
                                );
                                setSelectBoxStates1((prev) => ({
                                  ...prev,
                                  experienceDepth: false,
                                }));
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                {currentPersona.personaType ===
                                "key_stakeholder"
                                  ? "기업 전략 수립 및 장기적 방향 설정"
                                  : "몇 번 사용해봤고, 기능을 어느 정도 이해하고 있음"}
                              </Body2>
                            </SelectBoxItem>
                            <SelectBoxItem
                              onClick={() => {
                                handleCurrentPersonaChange(
                                  "experienceDepth",
                                  "5단계"
                                );
                                setSelectBoxStates1((prev) => ({
                                  ...prev,
                                  experienceDepth: false,
                                }));
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                {currentPersona.personaType ===
                                "key_stakeholder"
                                  ? "기업 전략, 투자, 정책 수립을 직접 결정"
                                  : "정기적으로 사용하고 있고, 익숙한 사용자"}
                              </Body2>
                            </SelectBoxItem>
                          </SelectBoxList>
                        )}
                      </SelectBox>
                    </div>

                    <div className="selectBoxWrap">
                      <div style={{ width: "90px", paddingLeft: "20px" }}>
                        <Body2 color="gray300">
                          {currentPersona.personaType === "key_stakeholder"
                            ? "이해수준"
                            : "사용수준"}
                        </Body2>
                      </div>
                      <SelectBox style={{ paddingRight: "10px" }}>
                        <SelectBoxTitle
                          None
                          onClick={() => {
                            setSelectBoxStates1((prev) => ({
                              ...prev,
                              usageDepth: !prev.usageDepth,
                            }));
                          }}
                        >
                          <div style={{ display: "flex", gap: "10px" }}>
                            <Body2
                              color={
                                currentPersona.usageDepth
                                  ? "gray700"
                                  : "gray300"
                              }
                            >
                              {mapUsageDepth(currentPersona.usageDepth)}
                            </Body2>
                          </div>
                          <images.ChevronDown
                            width="24px"
                            height="24px"
                            color={palette.gray500}
                            style={{
                              transform: selectBoxStates1.usageDepth
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </SelectBoxTitle>

                        {selectBoxStates1.usageDepth && (
                          <SelectBoxList>
                            <SelectBoxItem
                              onClick={() => {
                                handleCurrentPersonaChange(
                                  "usageDepth",
                                  "1단계"
                                );
                                setSelectBoxStates1((prev) => ({
                                  ...prev,
                                  usageDepth: false,
                                }));
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                {currentPersona.personaType ===
                                "key_stakeholder"
                                  ? "기본 개념 이해, 보조적 역할 수행"
                                  : "기본적인 기능도 잘 모름"}
                              </Body2>
                            </SelectBoxItem>
                            <SelectBoxItem
                              onClick={() => {
                                handleCurrentPersonaChange(
                                  "usageDepth",
                                  "2단계"
                                );
                                setSelectBoxStates1((prev) => ({
                                  ...prev,
                                  usageDepth: false,
                                }));
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                {currentPersona.personaType ===
                                "key_stakeholder"
                                  ? "실무 경험 보유, 특정 업무 수행 가능"
                                  : "몇 가지 주요 기능만 사용"}
                              </Body2>
                            </SelectBoxItem>
                            <SelectBoxItem
                              onClick={() => {
                                handleCurrentPersonaChange(
                                  "usageDepth",
                                  "3단계"
                                );
                                setSelectBoxStates1((prev) => ({
                                  ...prev,
                                  usageDepth: false,
                                }));
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                {currentPersona.personaType ===
                                "key_stakeholder"
                                  ? "시장 트렌드 이해, 주요 의견 제시 가능"
                                  : "대부분의 기능을 사용해 봤지만, 특정 기능은 모름"}
                              </Body2>
                            </SelectBoxItem>
                            <SelectBoxItem
                              onClick={() => {
                                handleCurrentPersonaChange(
                                  "usageDepth",
                                  "4단계"
                                );
                                setSelectBoxStates1((prev) => ({
                                  ...prev,
                                  usageDepth: false,
                                }));
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                {currentPersona.personaType ===
                                "key_stakeholder"
                                  ? "연구 및 혁신 주도, 신기술 개발 영향"
                                  : "거의 모든 기능을 능숙하게 사용"}
                              </Body2>
                            </SelectBoxItem>
                            {currentPersona.personaType ===
                              "key_stakeholder" && (
                              <SelectBoxItem
                                onClick={() => {
                                  handleCurrentPersonaChange(
                                    "usageDepth",
                                    "5단계"
                                  );
                                  setSelectBoxStates1((prev) => ({
                                    ...prev,
                                    usageDepth: false,
                                  }));
                                }}
                              >
                                <Body2 color="gray700" align="left">
                                  업계 방향 설정, 산업 정책 수립 주도
                                </Body2>
                              </SelectBoxItem>
                            )}
                          </SelectBoxList>
                        )}
                      </SelectBox>
                    </div>
                  </BoxWrap>

                  <CustomTextarea
                    None
                    rows={12}
                    placeholder="사용경험"
                    value={currentPersona.userExperience || ""}
                    onChange={(e) =>
                      handleCurrentPersonaChange(
                        "userExperience",
                        e.target.value
                      )
                    }
                    status="valid"
                  />
                </>
              )}
            </div>
          }
        />
      )}

      {isPersonaConfirmPopupOpen && (
        <PopupWrap
          Warning
          title={
            <>
              페르소나 프로필을
              <br />
              변경하시겠습니까?
            </>
          }
          message="편집 후에는 복구 할 수 없으니, 변경 전 확인해주세요"
          buttonType="Outline"
          confirmText="변경하기"
          closeText="취소"
          onCancel={handleEditConfirmClose}
          isModal={false}
          onConfirm={() => {
            handlePersonaEditUpdate();
            setIsPersonaEditPopupOpen(false);
            setIsPersonaConfirmPopupOpen(false);
          }}
        />
      )}

      {showRequestPopup &&
        (eventState ? (
          <PopupWrap
            Event
            title={selectedPersona !== null ? "페르소나 활성화 요청" : "나의 페르소나 생성 요청"}
            message={
              <>
                현재 {eventTitle} 기간으로 이벤트 크레딧이 소진됩니다.
                <br />({selectedPersona !== null ? creditRequestBusinessPersona.toLocaleString() : creditCreatePersonaDefault.toLocaleString()} 크레딧)
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => setShowRequestPopup(false)}
            onConfirm={() => {
              if(selectedPersona !== null){
                creditUse(selectedPersona);
              }else{
                handleCustomPersonaRequest();
              }
              setShowRequestPopup(false);
            }}
          />
        ) : trialState ? (
          <PopupWrap
            Check
            title={selectedPersona !== null ? "페르소나 활성화 요청" : "나의 페르소나 생성 요청"}
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({selectedPersona !== null ? creditRequestBusinessPersona.toLocaleString() : creditCreatePersonaDefault.toLocaleString()} 크레딧)
                {/* <br />
                신규 가입 2주간 무료로 사용 가능합니다. */}
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => setShowRequestPopup(false)}
            onConfirm={() => {
              if(selectedPersona !== null){
                creditUse(selectedPersona);
              }else{
                handleCustomPersonaRequest();
              }
              setShowRequestPopup(false);
            }}
          />
        ) : (
          <PopupWrap
            Check
            title={selectedPersona !== null ? "페르소나 활성화 요청" : "나의 페르소나 생성 요청"}
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({selectedPersona !== null ? creditRequestBusinessPersona.toLocaleString() : creditCreatePersonaDefault.toLocaleString()} 크레딧)
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => setShowRequestPopup(false)}
            onConfirm={() => {
              if(selectedPersona !== null){
                creditUse(selectedPersona);
                setShowPopup(false);
              }else{
                handleCustomPersonaRequest();
              }
              setShowRequestPopup(false); // 팝업 닫기
            }}
          />
        ))}
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
        />
      )}
    </>
  );
};

export default PageAiPersona;

const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 100%;

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .flex {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 12px;
    width: 100%;

    > div {
      width: 100%;
    }
  }

  .box-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;

    > div {
      max-width: 97px;
      width: 100%;
      padding: 8px 0;
      border-radius: 5px;
      border: 1px solid ${palette.outlineGray};
    }
  }
`;

const AiPersonaWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 54px;
  margin: 50px auto;
`;

const AiPersonaTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  ${H1} {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const AiPersonaContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const AiPersonaInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  height: 28px;

  div {
    display: flex;
    align-items: center;
    gap: 6px;

    ${InputText} {
      strong {
        font-size: 0.75rem;
        font-weight: 700;
      }
    }
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 4px;
    border-radius: 5px;

    &.active {
      width: 22px;
      height: 22px;
      background: ${palette.primary};
    }

    &.generating {
      border: 1px solid ${palette.white};
      background: #f0f4ff;
    }

    &.inactive {
      position: relative;
      background: ${palette.gray100};

      &:before,
      &:after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        content: "";
        display: block;
        width: 10px;
        height: 2px;
        background: ${palette.gray500};
      }

      &:before {
        transform: translate(-50%, -50%) rotate(90deg);
      }
    }
  }
`;

const PersonaStatusWrap = styled.div`
  display: flex;
  gap: 24px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 24px;
    // max-width: calc(100% / 3);
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  ${(props) =>
    props.NoData &&
    `
    > div {
      align-items: center;
      gap: 8px;
      padding: 44px 24px;

      button {
        margin-top: 4px;
      }
    }
  `}
`;

const TooltipButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${palette.chatGray};
  cursor: pointer;
  z-index: 1;

  &:before {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    font-size: 0.75rem;
    color: ${palette.gray500};
    border: 1px solid ${palette.gray500};
    content: "!";
  }
`;

const TooltipButtonType2 = styled(TooltipButton)`
  padding: 0;
  background: none;
  cursor: pointer;

  &:before {
    width: 20px;
    height: 20px;
    color: ${palette.primary};
    border: 1px solid ${palette.primary};
    content: "?";
    transition: all 0.2s ease-in-out;
  }
`;

const TooltipContent = styled.div`
  position: absolute;
  top: ${(props) => (props.Top ? "35px" : "-25px")};
  right: ${(props) => (props.Top ? "-160px" : "-310px")};
  width: ${(props) => (props.Top ? "240px" : "290px")};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px !important;
  padding: ${(props) => (props.Top ? "16px 20px" : "20px 20px 32px")};
  border-radius: 15px;
  background: ${palette.white};
  filter: drop-shadow(0px 4px 30px rgba(0, 0, 0, 0.15));
  animation: fadeIn 0.3s ease-in-out;
  cursor: default;
  z-index: 100;

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

  &:before {
    position: absolute;
    top: ${(props) => (props.Top ? "-15px" : "24px")};
    left: ${(props) => (props.Top ? "65px" : "-10px")};
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid ${palette.white};
    transform: ${(props) => (props.Top ? "rotate(90deg)" : "none")};
    content: "";
  }
`;

const TooltipContentUniqueUser = styled.div`
  position: absolute;
  top: ${(props) => (props.Top ? "35px" : "35px")};
  right: ${(props) => (props.Top ? "0px" : "0px")};
  width: ${(props) => (props.Top ? "240px" : "290px")};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px !important;
  padding: ${(props) => (props.Top ? "16px 20px" : "20px 20px 32px")};
  border-radius: 15px;
  background: ${palette.white};
  filter: drop-shadow(0px 4px 30px rgba(0, 0, 0, 0.15));
  animation: fadeIn 0.3s ease-in-out;
  cursor: default;
  z-index: 100;

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

const TooltipHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 300;
  color: ${palette.gray800};
  line-height: 1.5;
  width: 100%;

  span {
    position: relative;
    width: 16px;
    height: 16px;
    display: block;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 16px;
      display: block;
      border-radius: 5px;
      background: ${palette.gray700};
      content: "";
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`;

const TooltipBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px !important;
  width: 100%;
  max-height: 255px;
  overflow-y: auto;

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    width: 100%;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 12px;

    &:before {
      width: 5px;
      height: 18px;
      border-radius: 1px;
      content: "";
    }

    &.start:before {
      background: ${palette.outlineGray};
    }

    &.ing:before {
      background: #32ade6;
    }

    &.complete:before {
      background: ${palette.primary};
    }
  }

  p {
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${palette.gray700};
    text-align: left;
  }
`;

const LogoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 5px;
  border: 1px solid ${palette.outlineGray};
  background: ${palette.white};
  overflow: hidden; /* 컨테이너를 넘는 이미지 숨김 */

  img {
    width: 100%;
    height: 100%;
    object-fit: fill-box; /* 비율 유지하면서 컨테이너에 맞춤 */
    object-position: center; /* 중앙 정렬 */
  }
`;
