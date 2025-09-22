//디자인 감성 분석기
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../../assets/styles/Palette";
import AtomPersonaLoader from "../../../../Global/atoms/AtomPersonaLoader";
import OrganismIncNavigation from "../../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../../Global/molecules/MoleculeHeader";
import { Button } from "../../../../../assets/styles/ButtonStyle";
import images from "../../../../../assets/styles/Images";
import PopupWrap from "../../../../../assets/styles/Popup";
import {
  ContentsWrap,
  MainContent,
  TabWrapType4,
  TabButtonType4,
  TabWrapType5,
  TabButtonType5,
  TabContent5,
  TabContent5Item,
  BgBoxItem,
  DropzoneStyles,
  Title,
  ListBoxGroup,
  BoxWrap,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import {
  IS_LOGGED_IN,
  TOOL_ID,
  TOOL_STEP,
  TOOL_LOADING,
  PROJECT_SAAS,
  QUICK_SURVEY_ANALYSIS,
  QUICK_SURVEY_REPORT,
  PERSONA_LIST_SAAS,
  IDEA_EVALUATE_SELECTED_LIST,
  IDEA_EVALUATE_LIST,
  IDEA_EVALUATE_COMPARISON_EDUCATION,
  IDEA_EVALUATE_SELECTED_KANO_MODEL,
  IDEA_EVALUATE_SELECTED_KANO_MODEL_INDEX,
  IDEA_EVALUATE_SELECTED_LIST_INDEX,
  EVENT_STATE,
  TRIAL_STATE,
  EVENT_TITLE,
  CREDIT_CREATE_TOOL_HIGH,
  EDUCATION_STATE,
  USER_CREDITS,
  CREDIT_CREATE_TOOL_LOADED,
  IDEA_EVALUATE_GRAPH_DATA,
  EDUCATION_TOOL_COMPLETED_STATUS,
} from "../../../../AtomStates";
import {
  SelectBox,
  SelectBoxItem,
  SelectBoxTitle,
  SelectBoxList,
} from "../../../../../assets/styles/InputStyle";
import {
  H4,
  H3,
  Sub3,
  Body1,
  Body2,
  Body3,
  Caption1,
} from "../../../../../assets/styles/Typography";
import {
  createToolOnServer,
  updateToolOnServer,
  getFindToolListOnServerSaas,
  EducationToolsRequest,
  UserCreditCheck,
  UserCreditUse,
  UserCreditInfo,
} from "../../../../../utils/indexedDB";
import "react-dropzone-uploader/dist/styles.css";
import { useDynamicViewport } from "../../../../../assets/DynamicViewport";
import OrganismToastPopupQuickSurveyComplete from "../organisms/OrganismToastPopupQuickSurveyComplete";
import MoleculePersonaSelectCard from "../../../public/MoleculePersonaSelectCard";
import MoleculeItemSelectCard from "../../../public/MoleculeItemSelectCard";
import ParetoCurveGraph from "../../../../../components/Charts/ParetoCurveGraph";
import ResultTable from "../../../../../components/Charts/ResultTable";

const PageIdeaEvaluate = () => {
  const navigate = useNavigate();

  const [completedStatus, setCompletedStatus] = useAtom(
    EDUCATION_TOOL_COMPLETED_STATUS
  );
  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [eventState] = useAtom(EVENT_STATE);
  const [trialState] = useAtom(TRIAL_STATE);
  const [eventTitle] = useAtom(EVENT_TITLE);
  const [creditCreateToolHigh] = useAtom(CREDIT_CREATE_TOOL_HIGH);
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [creditCreateToolLoaded, setCreditCreateToolLoaded] = useAtom(
    CREDIT_CREATE_TOOL_LOADED
  );
  const [educationState] = useAtom(EDUCATION_STATE);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [personaListSaas, setPersonaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const [quickSurveyAnalysis, setQuickSurveyAnalysis] = useAtom(
    QUICK_SURVEY_ANALYSIS
  );
  const [ideaEvaluateSelectedListIndex, setIdeaEvaluateSelectedListIndex] =
    useAtom(IDEA_EVALUATE_SELECTED_LIST_INDEX);
  const [ideaEvaluateComparisonEducation, setIdeaEvaluateComparisonEducation] =
    useAtom(IDEA_EVALUATE_COMPARISON_EDUCATION);

  const [quickSurveyReport, setQuickSurveyReport] =
    useAtom(QUICK_SURVEY_REPORT);
  const [ideaEvaluateSelectedKanoModel, setIdeaEvaluateSelectedKanoModel] =
    useAtom(IDEA_EVALUATE_SELECTED_KANO_MODEL);
  const [ideaEvaluateSelectedList, setIdeaEvaluateSelectedList] = useAtom(
    IDEA_EVALUATE_SELECTED_LIST
  );
  const [ideaEvaluateList, setIdeaEvaluateList] = useAtom(IDEA_EVALUATE_LIST);
  const [
    ideaEvaluateSelectedKanoModelIndex,
    setIdeaEvaluateSelectedKanoModelIndex,
  ] = useAtom(IDEA_EVALUATE_SELECTED_KANO_MODEL_INDEX);
  const [ideaEvaluateGraphData, setIdeaEvaluateGraphData] = useAtom(
    IDEA_EVALUATE_GRAPH_DATA
  );
  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeDesignTab, setActiveDesignTab] = useState("emotion");
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [isLoadingDetailSetting, setIsLoadingDetailSetting] = useState(false);
  const [showPopupFileSize, setShowPopupFileSize] = useState(false);
  const [toolSteps, setToolSteps] = useState(0);
  const [projectDescription, setProjectDescription] = useState("");
  const [quickSurveyCustomQuestion, setQuickSurveyCustomQuestion] = useState(
    []
  );

  const [selectBoxStates, setSelectBoxStates] = useState({
    customerList: false,
  });
  const [selectedPurposes, setSelectedPurposes] = useState({
    customerList: "",
  });
  const [dropUpStates, setDropUpStates] = useState({
    customerList: false,
  });
  const [, setContactForm] = useState({
    email: "",
    purpose: "",
    content: "",
  });

  const [interviewModeType, setInterviewModeType] = useState("");
  const [isLoadingPreset, setIsLoadingPreset] = useState(false);
  const [shouldRegenerate, setShouldRegenerate] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [customerJourneyList, setCustomerJourneyList] = useState([]);
  const [selectedKanoModelData, setSelectedKanoModelData] = useState([]);
  const [showKanoModelList, setshowKanoModelList] = useState(false);
  const [ideaEvaluateSelect, setIdeaEvaluateSelect] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [showCreatePersonaPopup, setShowCreatePersonaPopup] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);

  const customerListRef = useRef(null);
  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  const project = projectSaas;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // 팝업이 열려있을 때 배경 스크롤 맊음
    if (showToast) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px"; // 스크롤바 자리만큼 패딩 추가
    }
    // 팝업이 닫혔을 때
    else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    }

    // 컴포넌트 언마운트 시 원래대로 복구
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    };
  }, [showToast]);

  useEffect(() => {
    const interviewLoading = async () => {
      // 비즈니스 정보 설정 (Step 1)
      if (!creditCreateToolLoaded) {
        setShowCreatePersonaPopup(true);
        // 크레딧 사용전 사용 확인
        const creditPayload = {
          // 기존 10 대신 additionalQuestionMount 사용
          mount: creditCreateToolHigh,
        };
        const creditResponse = await UserCreditCheck(creditPayload, isLoggedIn);

        if (creditResponse?.state !== "use") {
          setShowCreditPopup(true);
          return;
        }
      }

      const projectAnalysis =
        (project?.projectAnalysis?.business_analysis
          ? project?.projectAnalysis?.business_analysis
          : "") +
        (project?.projectAnalysis?.business_analysis &&
        project?.projectAnalysis?.file_analysis
          ? "\n"
          : "") +
        (project?.projectAnalysis?.file_analysis
          ? project?.projectAnalysis?.file_analysis
          : "");

      if (project) {
        setBusinessDescription(projectAnalysis);
      }

      if (toolLoading) {
        // 비즈니스 정보 설정 (Step 1)
        if (Object.keys(ideaEvaluateSelectedKanoModel).length > 0) {
          setSelectedKanoModelData(ideaEvaluateSelectedKanoModel);
          setshowKanoModelList(true);
        }
        if (Object.keys(ideaEvaluateSelectedKanoModelIndex).length > 0) {
          setSelectedPurposes(ideaEvaluateSelectedKanoModelIndex);
        }
        if (ideaEvaluateList && ideaEvaluateList.length > 0) {
          setIdeaEvaluateList(ideaEvaluateList);
        }
        if (ideaEvaluateSelectedList && ideaEvaluateSelectedList.length > 0) {
          setIdeaEvaluateSelectedList(ideaEvaluateSelectedList);
        }
        if (Object.keys(ideaEvaluateSelectedListIndex).length > 0) {
          setIdeaEvaluateSelect(ideaEvaluateSelectedListIndex);
        }

        if (
          ideaEvaluateComparisonEducation &&
          ideaEvaluateComparisonEducation.length > 0
        ) {
          setIdeaEvaluateComparisonEducation(ideaEvaluateComparisonEducation);
        }
        if (ideaEvaluateGraphData && ideaEvaluateGraphData.length > 0) {
          setGraphData(ideaEvaluateGraphData);
        }
        if (completedStatus) {
          setCompletedStatus(true);
        }

        // 활성 탭 설정 (기본값 1)
        if (toolStep === undefined || toolStep === 1) {
          setActiveTab(1);
          setToolSteps(0);
          setCompletedSteps([]);
        } else {
          setActiveTab(Math.min(toolStep, 3));
          setToolSteps(toolStep);
          const completedStepsArray = [];
          for (let i = 1; i <= toolStep; i++) {
            completedStepsArray.push(i);
          }
          setCompletedSteps(completedStepsArray);
        }
      }
    };
    interviewLoading();
    setToolLoading(false);
  }, [toolLoading]);

  // 고객핵심가치분석 리스트 가져오기
  //! 로딩 추가

  useEffect(() => {
    const getAllTargetDiscovery = async () => {
      try {
        let page = 1;
        const size = 10;
        let allItems = [];

        const response = await getFindToolListOnServerSaas(
          projectSaas?._id ?? "",
          "ix_kano_model_education",
          isLoggedIn
        );

        const newItems = (response || []).filter(
          (item) =>
            item?.type === "ix_kano_model_education" &&
            item?.completedStep === 4
          // &&
          // item?.deleteState === 0 &&
          // item?.deleteState === null
        );

        allItems = [...allItems, ...newItems];
        // console.log("🚀 ~ getAllTargetDiscovery ~ allItems:", allItems);

        setCustomerJourneyList(allItems);
      } catch (error) {
        setCustomerJourneyList([]); // Set empty array on error
      }
    };

    getAllTargetDiscovery();
  }, [isLoggedIn, projectSaas]);

  const handleCheckboxChange = (ideaId) => {
    setIdeaEvaluateSelect((prev) => {
      if (prev.includes(ideaId)) {
        // 이미 선택된 아이템이면 제거
        return prev.filter((id) => id !== ideaId);
      } else {
        // 새로운 아이템 추가 (최대 9개 제한 확인)
        if (prev.length < 9) {
          return [...prev, ideaId];
        }
        return prev; // 9개 이상이면 변경 없음
      }
    });
    // ideaEvaluateSelectedList 업데이트 로직 제거
  };

  // useEffect를 사용하여 ideaEvaluateSelect 변경 시 ideaEvaluateSelectedList 업데이트
  useEffect(() => {
    // ideaEvaluateSelect 상태가 변경될 때마다 실행
    const selectedItems = ideaEvaluateSelect
      .map((ideaId) => {
        const parts = ideaId.split("-");
        const index = parseInt(parts.pop()); // 마지막 부분을 인덱스로 사용
        const categoryKey = parts.join("_"); // 나머지 부분을 카테고리 키로 사용 (예: 'one_dimensional')

        // categoryKey와 index를 사용하여 데이터 접근
        return selectedKanoModelData?.kanoModelReportData?.[categoryKey]?.[
          index
        ];
      })
      .filter((item) => item !== undefined); // 유효한 아이템만 필터링

    setIdeaEvaluateSelectedList(selectedItems);
  }, [ideaEvaluateSelect, selectedKanoModelData]); // ideaEvaluateSelect 또는 selectedKanoModelData 변경 시 실행

  // 다음 단계로 이동하는 함수
  const handleNextStep = (currentStep) => {
    setCompletedSteps([...completedSteps, currentStep]);
    setActiveTab(currentStep + 1);
    setShowPopupError(false);
  };

  const toggleSelectBox = (type) => {
    setSelectBoxStates((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handlePurposeSelect = (purpose, selectBoxId, item) => {
    setSelectedPurposes((prev) => ({
      ...(prev || {}),
      [selectBoxId]: purpose || "",
    }));
    handleContactInputChange("purpose", purpose || "");
    setSelectBoxStates((prev) => ({
      ...(prev || {}),
      [selectBoxId]: false,
    }));

    if (selectBoxId === "customerList") {
      setBusinessDescription(purpose || "");
      // 카노모델 재선택 시 이전 선택 속성들 초기화
      setIdeaEvaluateSelect([]);
      setIdeaEvaluateSelectedList([]);
    }
    setSelectedKanoModelData(item);
  };

  const business = {
    business_analysis: businessDescription,
    target: project?.projectAnalysis?.target_customer || "",
    business_model: project?.businessModel || "",
    sector: project?.industryType || "",
    country: project?.targetCountry || "",
  };

  const handleCuratedIdea = async () => {
    if (!ideaEvaluateSelectedList.length > 0) {
      setshowKanoModelList(true);
    } else {
      handleNextStep(1);

      const responseToolId = await createToolOnServer(
        {
          projectId: project._id,
          type: "ix_idea_evaluation_education",
        },
        isLoggedIn
      );
      setToolId(responseToolId);

      // 크레딧이 사용 가능한 상태면 사용 API 호출
      const creditUsePayload = {
        title: project.projectTitle,
        service_type: "고객 여정 지도",
        target: "",
        state: "use",
        mount: creditCreateToolHigh,
      };

      await UserCreditUse(creditUsePayload, isLoggedIn);

      // 크레딧 사용 후 사용자 정보 새로고침

      const userCreditValue = await UserCreditInfo(isLoggedIn);
      // 전역 상태의 크레딧 정보 업데이트
      setUserCredits(userCreditValue);

      await updateToolOnServer(
        responseToolId,
        {
          selectedKanoModelIdea: {
            kanoModelReportData: selectedKanoModelData.kanoModelReportData,
            kanoModelClustering: selectedKanoModelData.kanoModelClustering,
          },
          selectedKanoModelIdeaIndex: selectedPurposes,
          ideaEvaluateSelectedList: ideaEvaluateSelectedList,
          ideaEvaluateSelectedListIndex: ideaEvaluateSelect,
          completedStep: 2,
        },
        isLoggedIn
      );

      setToolSteps(1);
    }
  };

  const handleSubmitReport = async () => {
    // 새 AbortController 생성
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    handleNextStep(2);
    // setToolSteps(2);
    setIsLoadingReport(true);

    try {
      const persona_group = personaListSaas
        .filter((persona) => persona?.favorite === true)
        .map((persona) => ({
          personaName: persona.personaName,
          personaCharacteristics: persona.personaCharacteristics,
          type: persona.type,
          age: persona.age,
          gender: persona.gender,
          job: persona.job,
          keywords: persona.keywords,
          // userExperience: persona.userExperience,
          // consumptionPattern: persona.consumptionPattern,
          // interests: persona.interests,
          // lifestyle: persona.lifestyle,
        }));

      const Data = {
        type: "ix_idea_evaluation_comparison_education",
        business: business,
        idea_list: ideaEvaluateSelectedList,
        persona: persona_group,
      };

      let response = await EducationToolsRequest(Data, isLoggedIn, signal);

      let retryCount = 0;
      const maxRetries = 10;
      while (
        retryCount < maxRetries &&
        (!response ||
          !response?.response ||
          !response?.response?.idea_evaluation_comparison_education ||
          !Array.isArray(
            response?.response?.idea_evaluation_comparison_education
          ))
      ) {
        response = await EducationToolsRequest(Data, isLoggedIn, signal);
        maxRetries++;
      }
      if (retryCount >= maxRetries) {
        setShowPopupError(true);
        return;
      }

      setIdeaEvaluateComparisonEducation(
        response.response.idea_evaluation_comparison_education
      );

      setGraphData(response.response.pareto_chart_data);
      setIdeaEvaluateGraphData(response.response.pareto_chart_data);

      await updateToolOnServer(
        toolId,
        {
          ideaEvaluateComparisonEducation:
            response.response.idea_evaluation_comparison_education,
          paretoChartData: response.response.pareto_chart_data,
          completedStep: 3,
          completedStatus: true,
        },
        isLoggedIn
      );
      setCompletedStatus(true);

      setToolSteps(3);
      setCompletedSteps([...completedSteps, 3]);
    } catch (error) {
      setShowPopupError(true);
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowPopupError(true);
            break;
          case 504:
            setShowPopupError(true);
            break;
          default:
            setShowPopupError(true);
            break;
        }
      } else {
        setShowPopupError(true);
      }
    } finally {
      setIsLoadingReport(false);
    }
  };

  const handleEnterInterviewRoom = () => {
    setSelectedOption(null);
    setSelectedOptionIndex(null);
    setShowToast(true);
  };

  const handleContactInputChange = (field, value) => {
    setContactForm((prev) => ({
      ...(prev || {}),
      [field]: value || "",
    }));
  };

  const handleSelectBoxClick = (selectBoxId, ref) => {
    // Don't open dropdown if toolSteps >= 1 for customerList
    if (toolSteps >= 1) {
      return;
    }
    // if(selectedKanoModelData.kanoModelClustering.length > 0){
    //   return;
    // }

    calculateDropDirection(ref, selectBoxId);
    setSelectBoxStates((prev) => ({
      ...(prev || {}),
      [selectBoxId]: !prev?.[selectBoxId],
    }));
  };

  const calculateDropDirection = (ref, selectBoxId) => {
    if (ref?.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropDownHeight = 200;

      setDropUpStates((prev) => ({
        ...(prev || {}),
        [selectBoxId]: spaceBelow < dropDownHeight && spaceAbove > spaceBelow,
      }));
    }
  };

  const getTableData = () => {
    const matchingIdea = ideaEvaluateSelectedList.reduce((obj, key, index) => {
      obj[key] = ideaEvaluateSelect[index];
      return obj;
    }, {});

    const tableData =
      ideaEvaluateGraphData?.map((data, index) => {
        const indexInfo = matchingIdea[data.name];

        let kanoAttribute = "Attractive";
        if (indexInfo) {
          if (indexInfo.includes("one_dimensional")) {
            kanoAttribute = "One-dementional";
          } else if (indexInfo.includes("must_be")) {
            kanoAttribute = "Must-be";
          }
        }

        return {
          rank: index + 1,
          ideaName: data.name,
          kanoAttribute: kanoAttribute,
          percentage: Math.round(data.value * 100),
        };
      }) || [];
    return tableData;
  };

  const abortControllerRef = useRef(null);

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      // console.log("currentUrl", currentUrl);
      if (currentUrl.toLowerCase().includes("ideaevaluate")) {
        // 세션 스토리지에서 마지막 URL 가져오기
        // console.log("세션 스토리지에서 마지막 URL 가져오기");

        const lastUrl = sessionStorage.getItem("lastUrl");

        // 마지막 URL이 현재 URL과 같으면 새로고침
        if (lastUrl && lastUrl === currentUrl) {
          // console.log("새로고침 감지: URL 비교");
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

    // 컴포넌트가 마운트될 때 새 AbortController 생성
    abortControllerRef.current = new AbortController();

    // 함수 실행
    detectRefresh();

    // 이벤트 리스너 등록
    // window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      // window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);

      // 진행 중인 모든 API 요청 중단
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [navigate]);

  // handleInputChange 함수 수정
  const handleInputChange = (field, value) => {
    // formData 대신 개별 상태 업데이트
    if (field === "projectDescription") {
      setProjectDescription(value);
    }
  };

  const handleAnswerChange = (id, option) => {
    setQuickSurveyAnalysis((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        answer: option,
      },
    }));
  };

  const handleConfirmCredit = async () => {
    setShowCreatePersonaPopup(false);
  };

  return (
    <>
      <DropzoneStyles />
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1030>
          <DesignAnalysisWrap>
            <TabWrapType5>
              <TabButtonType5
                Num3
                isActive={activeTab >= 1}
                onClick={() => setActiveTab(1)}
                disabled={isLoading || isLoadingReport}
              >
                <span>01</span>
                <div className="text">
                  <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                    아이디어 입력
                  </Body1>
                  {/* <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                    Question Select
                  </Body1> */}
                </div>
              </TabButtonType5>
              <TabButtonType5
                Num3
                isActive={activeTab >= 2}
                onClick={() => completedSteps.includes(1) && setActiveTab(2)}
                disabled={
                  !completedSteps.includes(1) || isLoading || isLoadingReport
                }
              >
                <span>02</span>
                <div className="text">
                  <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    페르소나 선택 및 확인
                  </Body1>
                  {/* <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    Participating Persona
                  </Body1> */}
                </div>
              </TabButtonType5>
              <TabButtonType5
                Num3
                isActive={activeTab >= 3}
                onClick={() =>
                  (completedSteps.includes(2) || completedSteps.includes(3)) &&
                  setActiveTab(3)
                }
                disabled={
                  !completedSteps.includes(3) || isLoading || isLoadingReport
                }
              >
                <span>03</span>
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    아이디어 평가
                  </Body1>
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    {/* Sentiment Analysis */}
                  </Body1>
                </div>
              </TabButtonType5>
            </TabWrapType5>

            {activeTab === 1 && (
              <TabContent5>
                <>
                  <div className="title">
                    <H3 color="gray800">Curated Ideas</H3>
                    <Body3 color="gray800">
                      선별된 아이디어를 사용자 기준으로 우선순위를 도출하세요
                    </Body3>
                  </div>

                  <div className="content">
                    <TabContent5Item required>
                      <TabContent5Item>
                        <div className="title">
                          <Body1 color="gray700">
                            kano Model 결과 가져오기{" "}
                          </Body1>
                        </div>

                        {showKanoModelList ? (
                          <div className="content">
                            <BoxWrap
                              Column
                              NoneV
                              style={{ marginBottom: "0px" }}
                            >
                              <div className="selectBoxWrap">
                                <Body2
                                  color="gray500"
                                  style={{ width: "110px" }}
                                >
                                  핵심 가치
                                </Body2>

                                <SelectBox style={{ paddingRight: "20px" }}>
                                  <SelectBoxTitle
                                    onClick={() =>
                                      toolSteps >= 1
                                        ? null
                                        : setIsSelectBoxOpen(!isSelectBoxOpen)
                                    }
                                    None
                                    style={{
                                      cursor:
                                        toolSteps >= 1
                                          ? "not-allowed"
                                          : "pointer",
                                    }}
                                  >
                                    {selectedPurposes?.customerList ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "4px",
                                          paddingLeft: "20px",
                                        }}
                                      >
                                        <Body2
                                          color={
                                            selectedPurposes.customerList
                                              ? "gray800"
                                              : "gray300"
                                          }
                                        >
                                          {selectedPurposes.customerList ||
                                            "불러올 핵심키워드 리스트를 선택해주세요.  "}
                                        </Body2>
                                      </div>
                                    ) : (
                                      <Body2
                                        color="gray300"
                                        style={{ paddingLeft: "20px" }}
                                      >
                                        불러올 핵심키워드 리스트를 선택해주세요.
                                      </Body2>
                                    )}
                                    <images.ChevronDown
                                      width="24px"
                                      height="24px"
                                      color={
                                        toolSteps >= 1
                                          ? palette.gray300
                                          : palette.gray500
                                      }
                                      style={{
                                        transform: isSelectBoxOpen
                                          ? "rotate(180deg)"
                                          : "rotate(0deg)",
                                        transition: "transform 0.3s ease",
                                      }}
                                    />
                                  </SelectBoxTitle>

                                  {isSelectBoxOpen && (
                                    <SelectBoxList noBorder={true}>
                                      {customerJourneyList?.map(
                                        (item, index) => (
                                          <SelectBoxItem
                                            key={index}
                                            onClick={() => {
                                              handlePurposeSelect(
                                                `${
                                                  item.updateDate.split(":")[0]
                                                }:${
                                                  item.updateDate.split(":")[1]
                                                } - kano기반 아이디어 선택기 
                                          `,
                                                "customerList",
                                                item
                                              );
                                            }}
                                          >
                                            <Body2 color="gray500" align="left">
                                              {item.updateDate.split(":")[0]}:
                                              {item.updateDate.split(":")[1]}{" "}
                                              kano기반 아이디어 선택기
                                            </Body2>
                                          </SelectBoxItem>
                                        )
                                      )}
                                    </SelectBoxList>
                                  )}
                                </SelectBox>
                              </div>

                              <div
                                className="selectBoxWrap"
                                style={{ marginTop: "12px" }}
                              >
                                <Body2
                                  color="gray500"
                                  style={{
                                    width: "110px",
                                    alignSelf: "flex-start",
                                  }}
                                >
                                  평가 아이디어
                                </Body2>
                                <li
                                  style={{
                                    alignSelf: "flex-start",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                  }}
                                >
                                  <Body2
                                    color={
                                      ideaEvaluateSelect?.length > 0
                                        ? "gray800"
                                        : "gray300"
                                    }
                                    style={{
                                      maxWidth: "658px",
                                      overflow: "hidden",
                                      whiteSpace: "normal",
                                      wordBreak: "keep-all",
                                      // wordWrap: "break-word",
                                      textAlign: "left",
                                      marginLeft: "20px",
                                      marginTop: "0",
                                      paddingTop: "0",
                                      display: "block",
                                      alignSelf: "flex-start",
                                    }}
                                  >
                                    {/* {ideaEvaluateSelectedList.length === 0 ? (
                                        <Body2 color="red" style={{ marginLeft: "20px" }}>
                                          최소 7개 ~ 최대 9개를 선택해주세요
                                        </Body2>
                                      ) : ideaEvaluateSelectedList.length < 7 || ideaEvaluateSelectedList.length > 9 ? (
                                        <Body2 color="red" style={{ marginLeft: "20px" }}>
                                          최소 7개 ~ 최대 9개를 선택해주세요
                                        </Body2>
                                      ) : (
                                        ideaEvaluateSelectedList.map((idea, index) => {
                                          const isLast = index === ideaEvaluateSelectedList.length - 1;
                                          const totalText = ideaEvaluateSelectedList
                                            .slice(0, index + 1)
                                            .map((i) => i)
                                            .join(", ");

                                          if (totalText.length > 100 && !isLast) {
                                            return null;
                                          }
                                          if (totalText.length > 100) {
                                            return idea + "...";
                                          }
                                          return idea + (isLast ? "" : ", ");
                                        })
                                      )} */}

                                    {ideaEvaluateSelectedList.length > 0 && (
                                      <span>
                                        {ideaEvaluateSelectedList.join(", ")}
                                      </span>
                                    )}
                                    {!ideaEvaluateSelectedList.length > 0 && (
                                      <span
                                        style={{
                                          color: "grey300",
                                          marginLeft: "0px",
                                        }}
                                      >
                                        최소 5개 ~ 최대 9개를 선택해주세요
                                      </span>
                                    )}
                                  </Body2>
                                </li>
                              </div>
                            </BoxWrap>
                          </div>
                        ) : (
                          <SelectBox ref={customerListRef}>
                            <SelectBoxTitle
                              onClick={() =>
                                handleSelectBoxClick(
                                  "customerList",
                                  customerListRef
                                )
                              }
                              style={{
                                cursor:
                                  toolSteps >= 1 ? "not-allowed" : "pointer",
                              }}
                            >
                              <Body2
                                color={
                                  selectedPurposes.customerList
                                    ? "gray800"
                                    : "gray300"
                                }
                              >
                                {selectedPurposes.customerList ||
                                  "Kano Model 결과를 선택하세요"}
                              </Body2>
                              <images.ChevronDown
                                width="24px"
                                height="24px"
                                color={palette.gray500}
                                style={{
                                  transform: selectBoxStates.customerList
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                  transition: "transform 0.3s ease",
                                }}
                              />
                            </SelectBoxTitle>

                            {selectBoxStates.customerList && (
                              <SelectBoxList dropUp={dropUpStates.customerList}>
                                {customerJourneyList?.length === 0 ? (
                                  <SelectBoxItem
                                    disabled={
                                      toolSteps >= 1 ||
                                      selectedKanoModelData?.kanoModelClustering
                                        ?.attractive.length > 0 ||
                                      customerJourneyList?.length === 0
                                    }
                                  >
                                    <Body2 color="gray300" align="left">
                                      카노 모델 진행을 완료하신 경우, 정보를
                                      가져올 수 있습니다.
                                    </Body2>
                                  </SelectBoxItem>
                                ) : (
                                  customerJourneyList?.map((item, index) => (
                                    <SelectBoxItem
                                      // disabled={
                                      //   toolSteps >= 1
                                      // }
                                      key={index}
                                      onClick={() => {
                                        handlePurposeSelect(
                                          `Kano Model 결과 (${
                                            item.updateDate.split(":")[0]
                                          }:${item.updateDate.split(":")[1]})
                                      `,
                                          "customerList",
                                          item
                                        );
                                      }}
                                    >
                                      <Body2 color="gray700" align="left">
                                        Kano Model 결과 (
                                        {item.updateDate.split(":")[0]}:
                                        {item.updateDate.split(":")[1]})
                                      </Body2>
                                    </SelectBoxItem>
                                  ))
                                )}
                              </SelectBoxList>
                            )}
                          </SelectBox>
                        )}
                      </TabContent5Item>

                      {isLoading ? (
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            minHeight: "200px",
                            alignItems: "center",
                          }}
                        >
                          <AtomPersonaLoader message="로딩 중..." />
                        </div>
                      ) : !showKanoModelList ? (
                        <BoxWrap
                          NoData
                          style={{ height: "300px", marginTop: "32px" }}
                        >
                          <img src={images.ListFillPrimary} alt="" />
                          <Body2 color="gray700" align="center !important">
                            Kano Model 결과가 보여집니다.
                          </Body2>
                        </BoxWrap>
                      ) : (
                        <div className="content" style={{ marginTop: "40px" }}>
                          {/* Attractive Features 섹션 */}
                          <div
                            className="title"
                            style={{ textAlign: "left", marginBottom: "-20px" }}
                          >
                            <Body1 color="gray800">
                              Attractive (매력적 속성)
                            </Body1>
                          </div>

                          {selectedKanoModelData.kanoModelReportData.attractive.map(
                            (title, index) => (
                              <MoleculeItemSelectCard
                                FlexStart
                                key={`attractive-${index}`}
                                id={`attractive-${index}`}
                                title={title}
                                isSelected={ideaEvaluateSelect.includes(
                                  `attractive-${index}`
                                )}
                                onSelect={() => {
                                  const isCurrentlySelected =
                                    ideaEvaluateSelect.includes(
                                      `attractive-${index}`
                                    );
                                  if (
                                    !isCurrentlySelected &&
                                    ideaEvaluateSelect.length >= 9
                                  ) {
                                    return;
                                  }
                                  handleCheckboxChange(`attractive-${index}`);
                                }}
                                disabled={
                                  toolSteps >= 1 ||
                                  (!ideaEvaluateSelect.includes(
                                    `attractive-${index}`
                                  ) &&
                                    ideaEvaluateSelect.length >= 9)
                                }
                              />
                            )
                          )}

                          <div
                            className="title"
                            style={{
                              textAlign: "left",
                              marginBottom: "-20px",
                              marginTop: "20px",
                            }}
                          >
                            <Body1 color="gray800">
                              One-Dimensional (일차원 속성){" "}
                            </Body1>
                          </div>
                          {selectedKanoModelData.kanoModelReportData.one_dimensional.map(
                            (title, index) => (
                              <MoleculeItemSelectCard
                                FlexStart
                                key={`one-dimensional-${index}`}
                                id={`one-dimensional-${index}`}
                                title={title}
                                isSelected={ideaEvaluateSelect.includes(
                                  `one_dimensional-${index}`
                                )}
                                onSelect={() => {
                                  const isCurrentlySelected =
                                    ideaEvaluateSelect.includes(
                                      `one_dimensional-${index}`
                                    );
                                  if (
                                    !isCurrentlySelected &&
                                    ideaEvaluateSelect.length >= 9
                                  ) {
                                    return;
                                  }
                                  handleCheckboxChange(
                                    `one_dimensional-${index}`
                                  );
                                }}
                                disabled={
                                  toolSteps >= 1 ||
                                  (!ideaEvaluateSelect.includes(
                                    `one_dimensional-${index}`
                                  ) &&
                                    ideaEvaluateSelect.length >= 9)
                                }
                              />
                            )
                          )}

                          <div
                            className="title"
                            style={{
                              textAlign: "left",
                              marginBottom: "-20px",
                              marginTop: "20px",
                            }}
                          >
                            <Body1 color="gray800">
                              Must-Be (당연적 속성){" "}
                            </Body1>
                          </div>

                          {selectedKanoModelData.kanoModelReportData.must_be.map(
                            (title, index) => (
                              <MoleculeItemSelectCard
                                FlexStart
                                key={`must-be-${index}`}
                                id={`must-be-${index}`}
                                title={title}
                                isSelected={ideaEvaluateSelect.includes(
                                  `must_be-${index}`
                                )}
                                onSelect={() => {
                                  const isCurrentlySelected =
                                    ideaEvaluateSelect.includes(
                                      `must_be-${index}`
                                    );
                                  if (
                                    !isCurrentlySelected &&
                                    ideaEvaluateSelect.length >= 9
                                  ) {
                                    return;
                                  }
                                  handleCheckboxChange(`must_be-${index}`);
                                }}
                                disabled={
                                  toolSteps >= 1 ||
                                  (!ideaEvaluateSelect.includes(
                                    `must_be-${index}`
                                  ) &&
                                    ideaEvaluateSelect.length >= 9)
                                }
                              />
                            )
                          )}
                        </div>
                      )}
                    </TabContent5Item>
                  </div>
                  <Button
                    Other
                    Primary
                    Fill
                    Round
                    style={{ marginTop: "20px" }}
                    onClick={handleCuratedIdea}
                    disabled={
                      !showKanoModelList
                        ? selectedKanoModelData.length === 0 || toolSteps >= 1
                        : ideaEvaluateSelect.length < 5 ||
                          toolSteps >= 1 ||
                          ideaEvaluateSelect.length > 9
                    }
                  >
                    다음
                  </Button>
                </>
              </TabContent5>
            )}

            {activeTab === 2 && completedSteps.includes(1) && (
              <TabContent5>
                {isLoading ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      minHeight: "200px",
                      alignItems: "center",
                    }}
                  >
                    <AtomPersonaLoader message="로딩 중..." />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Participating Persona</H3>
                      <Body3 color="gray800">
                        아이디어 우선순위를 평가할 페르소나를 확인해보세요
                      </Body3>
                    </div>

                    <div className="content">
                      <ListBoxGroup>
                        <li>
                          <Body2
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "8px",
                              marginRight: "50px",
                              alignSelf: "flex-start",
                              color: palette.gray500,
                            }}
                          >
                            평가할 아이디어 리스트
                          </Body2>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              textAlign: "left",
                              alignItems: "flex-start",
                              justifyContent: "flex-start",
                              alignSelf: "flex-start",
                              marginTop: "0",
                              paddingTop: "0",
                            }}
                          >
                            <span
                              style={{
                                color: palette.gray800,

                                marginBottom: "4px",
                                alignSelf: "flex-start",
                                display: "block",
                              }}
                            >
                              {ideaEvaluateSelectedList.map((idea, index) => {
                                const isLast =
                                  index === ideaEvaluateSelectedList.length - 1;
                                const text = idea;

                                // 전체 텍스트가 30자를 넘으면 말줄임표 처리
                                const totalText = ideaEvaluateSelectedList
                                  .slice(0, index + 1)
                                  .map((i) => i)
                                  .join(", ");

                                if (totalText.length > 100 && !isLast) {
                                  return null;
                                }

                                if (totalText.length > 100) {
                                  return text + "..."; // 마지막 아이템에서 말줄임표 추가
                                }

                                return text + (isLast ? "" : ", "); // 마지막이 아니면 쉼표 추가
                              })}
                            </span>
                          </div>
                        </li>
                      </ListBoxGroup>

                      <div className="title">
                        <Body1
                          color="gray800"
                          style={{ textAlign: "left", marginBottom: "-20px" }}
                        >
                          아이디어 평가 참여 페르소나
                        </Body1>
                      </div>

                      {personaListSaas.filter((item) => item.favorite === true)
                        .length >= 20 ? (
                        <MoleculePersonaSelectCard
                          filteredPersonaList={personaListSaas}
                          hideSelectButton={true}
                        />
                      ) : (
                        <BoxWrap
                          Hover
                          NoData
                          Border
                          onClick={() => navigate("/AiPersona")}
                        >
                          <img src={images.PeopleStarFillPrimary} alt="" />
                          <Body2 color="gray500" align="center !important">
                            페르소나 리스트를 확인하려면, 먼저 관심 있는
                            페르소나 20명을 즐겨찾기에 추가해 주세요. (
                            {
                              personaListSaas.filter(
                                (item) => item.favorite === true
                              ).length
                            }{" "}
                            / 20)
                          </Body2>
                        </BoxWrap>
                      )}
                    </div>

                    {isLoadingDetailSetting || isLoadingPreset ? (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          minHeight: "200px",
                          alignItems: "center",
                        }}
                      >
                        {/* <AtomPersonaLoader message="로딩 중..." /> */}
                      </div>
                    ) : (
                      <Button
                        Other
                        Primary
                        Fill
                        Round
                        onClick={() => {
                          handleSubmitReport(); //마지막 보고서 함수
                        }}
                        disabled={
                          toolSteps >= 3 ||
                          personaListSaas.filter(
                            (item) => item.favorite === true
                          ).length < 20
                        }
                      >
                        다음
                      </Button>
                    )}
                  </>
                )}
              </TabContent5>
            )}

            {activeTab === 3 &&
              (completedSteps.includes(2) || completedSteps.includes(3)) && (
                <TabContent5 Small>
                  {isLoadingReport ? (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        minHeight: "200px",
                        alignItems: "center",
                      }}
                    >
                      <AtomPersonaLoader message="페르소나가 아이디어를 평가하고 있습니다" />
                    </div>
                  ) : (
                    <>
                      <BgBoxItem primaryLightest>
                        <H3 color="gray800">아이디어 우선순위 평가</H3>
                        <Body3 color="gray800">
                          아이디어에 대해 선호도를 평가한 결과입니다. 어떤
                          아이디어가 더 매력적인지 확인해보세요.
                        </Body3>
                      </BgBoxItem>

                      <div></div>
                      <InsightAnalysis>
                        <div className="title">
                          <H4 color="gray800" align="left">
                            아이디어 평가 결과
                          </H4>
                        </div>
                        <ResultTable data={getTableData()} />
                      </InsightAnalysis>

                      <InsightAnalysis>
                        <div className="title">
                          <div>
                            {/* <TabWrapType4>
                              <TabButtonType4
                                active={activeDesignTab === "emotion"}
                                onClick={() => setActiveDesignTab("emotion")}
                              >
                                결과 개요
                              </TabButtonType4>
                              <TabButtonType4
                                active={activeDesignTab === "scale"}
                                onClick={() => setActiveDesignTab("scale")}
                              >
                                항목별 통계
                              </TabButtonType4>
                            </TabWrapType4> */}
                          </div>
                          {/* <Button Primary onClick={handleEnterInterviewRoom}>
                            <img
                              src={images.ReportSearch}
                              alt="인터뷰 스크립트 보기"
                            />
                            응답자 의견 확인
                          </Button> */}
                        </div>
                      </InsightAnalysis>

                      <InsightAnalysis>
                        <div className="title">
                          <H4 color="gray800" align="left">
                            아이디어 우선순위 비중 그래프
                          </H4>
                        </div>

                        <ParetoCurveGraph data={graphData} />

                        {activeDesignTab === "emotion" && (
                          <>
                            {/* Insight 섹션 */}
                            <div className="content">
                              {quickSurveyReport?.[0] && (
                                <InsightContainer>
                                  <InsightSection>
                                    <InsightLabel color="gray700">
                                      총평
                                    </InsightLabel>
                                    <InsightContent color="gray700">
                                      {selectedQuestion[0] === "nps" ? (
                                        <>
                                          <div>
                                            {
                                              quickSurveyReport[0]
                                                ?.total_insight
                                                ?.nps_score_interpretation
                                            }
                                          </div>
                                          <br />
                                          <div>
                                            {
                                              quickSurveyReport[0]
                                                ?.total_insight
                                                ?.group_response_analysis
                                            }
                                          </div>
                                          <br />
                                          <div>
                                            {
                                              quickSurveyReport[0]
                                                ?.total_insight
                                                ?.enhancement_and_improvement_insight
                                            }
                                          </div>
                                        </>
                                      ) : (
                                        // 기존 non-NPS 로직
                                        <>
                                          {
                                            quickSurveyReport[0]?.total_insight
                                              ?.statistic
                                          }
                                          <br />
                                          <br />
                                          {
                                            quickSurveyReport[0]?.total_insight
                                              ?.insight
                                          }
                                        </>
                                      )}
                                    </InsightContent>
                                  </InsightSection>

                                  <InsightSection>
                                    <InsightLabel color="gray700">
                                      성별 의견 정리
                                    </InsightLabel>
                                    <InsightContent color="gray700">
                                      <>
                                        {
                                          quickSurveyReport[0]?.gender_insight
                                            ?.statistic
                                        }
                                        <br />
                                        <br />
                                        {
                                          quickSurveyReport[0]?.gender_insight
                                            ?.insight
                                        }
                                      </>
                                    </InsightContent>
                                  </InsightSection>

                                  <InsightSection>
                                    <InsightLabel color="gray700">
                                      연령별 의견 정리
                                    </InsightLabel>
                                    <InsightContent color="gray700">
                                      <>
                                        {
                                          quickSurveyReport[0].age_insight
                                            .statistic
                                        }
                                        <br />
                                        <br />
                                        {
                                          quickSurveyReport[0].age_insight
                                            .insight
                                        }
                                      </>
                                    </InsightContent>
                                  </InsightSection>
                                </InsightContainer>
                              )}
                            </div>
                          </>
                        )}
                      </InsightAnalysis>
                      {completedStatus && (
                        <Button
                          Primary
                          Edit
                          Large
                          style={{
                            color: palette.gray700,
                            border: `1px solid ${palette.outlineGray}`,
                          }}
                          onClick={() => navigate("/Tool")}
                        >
                          리서치 툴 리스트 바로가기
                        </Button>
                      )}
                    </>
                  )}
                </TabContent5>
              )}

            {showToast && (
              <OrganismToastPopupQuickSurveyComplete
                isActive={showToast}
                onClose={() => setShowToast(false)}
                isComplete={true}
                selectedOption={selectedOption}
                selectedOptionIndex={selectedOptionIndex}
              />
            )}
          </DesignAnalysisWrap>
        </MainContent>
      </ContentsWrap>

      {showPopupError && (
        <PopupWrap
          Warning
          title="다시 입력해 주세요."
          message="현재 입력하신 정보는 목적을 생성할 수 없습니다."
          buttonType="Outline"
          confirmText="확인"
          isModal={false}
          onConfirm={() => window.location.reload()}
        />
      )}

      {showPopupFileSize && (
        <PopupWrap
          Warning
          title="파일 크기 초과"
          message="파일 크기는 20MB를 초과할 수 없습니다."
          buttonType="Outline"
          confirmText="확인"
          isModal={false}
          onConfirm={() => setShowPopupFileSize(false)}
        />
      )}

      {showPopupSave && (
        <PopupWrap
          Check
          title="리포트가 저장되었습니다."
          message="저장된 리포트는 '보관함'을 확인해주세요"
          buttonType="Outline"
          closeText="보관함 바로가기"
          confirmText="리포트 계속 확인"
          isModal={false}
          onCancel={() => setShowPopupSave(false)}
          onConfirm={() => setShowPopupSave(false)}
        />
      )}
      {showCreatePersonaPopup &&
        (eventState && !educationState ? (
          <PopupWrap
            Event
            title="아이디어 평가"
            message={
              <>
                현재 {eventTitle} 기간으로 이벤트 크레딧이 소진됩니다.
                <br />({creditCreateToolHigh} 크레딧)
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
            title="아이디어 평가"
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditCreateToolHigh} 크레딧)
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
            title="아이디어 평가"
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditCreateToolHigh} 크레딧)
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
          onCancel={() => {
            setShowCreditPopup(false);
            navigate("/Tool");
          }}
          onConfirm={() => {
            setShowCreditPopup(false);
            navigate("/Tool");
          }}
        />
      )}
    </>
  );
};

export default PageIdeaEvaluate;

const DesignAnalysisWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin-top: 60px;
`;

const InsightAnalysis = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-align: left;
  }
`;

const ViewInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: $space-between;
  gap: 4px;
  width: 100%;
  font-size: 0.875rem;
  color: ${palette.gray800};

  + div {
    padding-top: 16px;
    border-top: 1px solid ${palette.outlineGray};
  }

  .title {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 8px;
    font-size: 0.875rem;
    color: ${palette.black};

    span {
      font-size: 0.75rem;
      font-weight: 300;
      color: ${palette.gray500};
    }
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;

    div {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 7px;
      font-size: 0.875rem;
      font-weight: 300;
      color: ${palette.gray500};
      line-height: 1.5;

      + div:before {
        position: absolute;
        top: 50%;
        left: -16px;
        transform: translateY(-50%);
        width: 1px;
        height: 12px;
        background-color: ${palette.outlineGray};
        content: "";
      }
    }
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    button {
      font-family: "Pretendard", poppins;
      font-size: 0.75rem;
      font-weight: 300;
      padding: 6px 10px;
      border-radius: 6px;

      &.view {
        color: ${palette.black};
        border: 1px solid ${palette.outlineGray};
        background: ${palette.chatGray};
      }

      &.analysis {
        color: ${palette.primary};
        border: 1px solid ${palette.primary};
        background: #e9f1ff;
      }
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const EditButtonGroup = styled(ButtonGroup)`
  justify-content: end;
`;

const TagButton = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  background-color: #f7f8fa;
  border: none;
  margin-right: 10px;
  transition: all 0.2s ease;
  &:hover {
    background-color: ${(props) => (props.isSelected ? "#226FFF" : "#EAECF0")};
  }
`;

const InterviewModeSelection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  justify-content: center;
  margin-bottom: 48px;

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

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  height: 100%;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 8px;
  flex: 1;
  padding: 0;

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
  height: 100%;
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
const InsightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #e0e4e8;
  border-radius: 10px;
  padding: 16px;
`;

const InsightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-bottom: 1px solid #e0e4e8;
  padding-bottom: 16px;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const InsightContent = styled(Body3)`
  // border-bottom: 1px solid #E0E4E8;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;

  // &:last-child {
  //   border-bottom: none;
  // }
`;

const InsightLabel = styled(Body3)`
  font-size: 16px;
  font-weight: 700; /* 400에서 700으로 변경하여 bold 적용 */
  color: ${palette.gray800}; /* 직접 색상 지정 */
`;

const TooltipButton = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 4px;
  padding: 12px;
  border-radius: 15px;
  background: ${palette.chatGray};
  z-index: 1;
  width: 100%;
  text-align: left;

  &:before {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    font-size: 0.63rem;
    color: ${palette.gray500};
    border: 1px solid ${palette.gray500};
    content: "!";
    margin-top: 3.5px; // 아래로 내리기 위해 추가
  }
`;

const CustomButton = styled.button`
  width: 100%;
  padding: 16px;
  background: ${palette.white};
  border: 1px solid ${palette.outlineGray};
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  margin-top: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${palette.gray50};
    border-color: ${palette.primary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;

const ButtonTitle = styled.div`
  font-family: "Pretendard", "Poppins";
  font-size: 16px;
  font-weight: 500;
  color: ${palette.gray700};
`;

const PlusIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PlusIcon = styled.span`
  font-size: 16px;
  color: ${palette.gray700};
`;
