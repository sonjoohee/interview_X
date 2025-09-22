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
import Markdown from "markdown-to-jsx";
import images from "../../../../../assets/styles/Images";
import {
  CustomTextarea,
  FormBox,
} from "../../../../../assets/styles/InputStyle";
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
  QUICK_SURVEY_PROJECT_DESCRIPTION,
  QUICK_SURVEY_ANALYSIS,
  QUICK_SURVEY_CUSTOM_GUIDE,
  QUICK_SURVEY_PRESET_DATA,
  QUICK_SURVEY_PERSONA_GROUP,
  QUICK_SURVEY_INTERVIEW,
  QUICK_SURVEY_REPORT,
  QUICK_SURVEY_STATIC_DATA,
  QUICK_SURVEY_SELECTED_QUESTION,
  QUICK_SURVEY_SURVEY_METHOD,
  QUICK_SURVEY_DETAIL_INFO,
  QUICK_SURVEY_RECRUITING_CONDITION,
  QUICK_SURVEY_INTERVIEW_MODE_TYPE,
  QUICK_SURVEY_CUSTOM_QUESTION,
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
  CREDIT_CREATE_TOOL,
  EDUCATION_STATE,
  PRFAQ_CONCEPT_DEFINITION,
  PRFAQ_BUSINESS_MODEL_CANVAS,
  PRFAQ_KEY_CONTENT_EDUCATION,
  PRFAQ_FINAL_REPORT_EDUCATION,
  USER_CREDITS,
  PRFAQ_SELECTED_PURPOSE,
  CREDIT_CREATE_TOOL_LOADED,
  EDUCATION_TOOL_COMPLETED_STATUS,
  PRFAQ_COMPANY_INFO,
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
import MoleculeAddContentWriting from "../molecules/MoleculeAddContentWriting";

const PagePRFAQ = () => {
  const navigate = useNavigate();

  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [prfaqCompanyInfo] = useAtom(PRFAQ_COMPANY_INFO);
  const [completedStatus, setCompletedStatus] = useAtom(
    EDUCATION_TOOL_COMPLETED_STATUS
  );
  const [creditCreateToolLoaded] = useAtom(CREDIT_CREATE_TOOL_LOADED);
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [eventState] = useAtom(EVENT_STATE);
  const [trialState] = useAtom(TRIAL_STATE);
  const [eventTitle] = useAtom(EVENT_TITLE);
  const [creditCreateTool] = useAtom(CREDIT_CREATE_TOOL);
  const [educationState] = useAtom(EDUCATION_STATE);
  const [toolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [ideaEvaluateComparisonEducation] = useAtom(
    IDEA_EVALUATE_COMPARISON_EDUCATION
  );
  const [ideaEvaluateSelectedList] = useAtom(IDEA_EVALUATE_SELECTED_LIST);
  const [prfaqConceptDefinition, setPrfaqConceptDefinition] = useAtom(
    PRFAQ_CONCEPT_DEFINITION
  );
  const [prfaqBusinessModelCanvas, setPrfaqBusinessModelCanvas] = useAtom(
    PRFAQ_BUSINESS_MODEL_CANVAS
  );
  const [prfaqKeyContentEducation, setPrfaqKeyContentEducation] = useAtom(
    PRFAQ_KEY_CONTENT_EDUCATION
  );
  const [prfaqFinalReport, setPrfaqFinalReport] = useAtom(
    PRFAQ_FINAL_REPORT_EDUCATION
  );
  const [prfaqSelectedPurpose] = useAtom(PRFAQ_SELECTED_PURPOSE);
  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeDesignTab, setActiveDesignTab] = useState("PR");
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [showPopupFileSize, setShowPopupFileSize] = useState(false);
  const [toolSteps, setToolSteps] = useState(0);
  const [selectBoxStates, setSelectBoxStates] = useState({
    customerList: false,
    businessModelCanvas: false,
  });
  const [selectedPurposes, setSelectedPurposes] = useState({
    customerList: "",
    businessModelCanvas: "",
  });
  const [dropUpStates, setDropUpStates] = useState({
    customerList: false,
    businessModelCanvas: false,
  });
  const [companyInfo, setCompanyInfo] = useAtom(PRFAQ_COMPANY_INFO);
  const [selectedKanoModelData, setSelectedKanoModelData] = useState([]);
  const [showKanoModelList, setshowKanoModelList] = useState(false);
  const [ideaEvaluateSelect, setIdeaEvaluateSelect] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [conceptDefinitionList, setConceptDefinitionList] = useState([]);
  const [businessModelCanvasReport, setBusinessModelCanvasReport] = useState(
    []
  );
  const [showCreatePersonaPopup, setShowCreatePersonaPopup] = useState(false);

  const customerListRef = useRef(null);
  const businessModelCanvasRef = useRef(null);
  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  const project = projectSaas;

  const prepareMarkdown = (text) => {
    if (!text) return "";
    // 연속된 줄바꿈('\n\n')을 <br/><br/>로 변환
    return text.replace(/\n\n/g, "\n&nbsp;\n").replace(/\n/g, "  \n");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interviewLoading = async () => {
      // 비즈니스 정보 설정 (Step 1)
      if (!creditCreateToolLoaded) {
        setShowCreatePersonaPopup(true);
        // 크레딧 사용전 사용 확인
        const creditPayload = {
          // 기존 10 대신 additionalQuestionMount 사용
          mount: creditCreateTool,
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
        if (prfaqKeyContentEducation && prfaqKeyContentEducation.length > 0) {
          setPrfaqKeyContentEducation(prfaqKeyContentEducation || []);
        }
        if (Object.keys(prfaqCompanyInfo).length > 0) {
          setCompanyInfo(prfaqCompanyInfo || {});
        }
        if (Object.keys(prfaqSelectedPurpose).length > 0) {
          setSelectedPurposes(prfaqSelectedPurpose || {});
        }
        if (prfaqConceptDefinition && prfaqConceptDefinition.length > 0) {
          setPrfaqConceptDefinition(prfaqConceptDefinition || []);
        }
        if (prfaqBusinessModelCanvas && prfaqBusinessModelCanvas.length > 0) {
          setPrfaqBusinessModelCanvas(prfaqBusinessModelCanvas || []);
        }
        if (prfaqFinalReport) {
          setPrfaqFinalReport(prfaqFinalReport || "");
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
        // setActiveTab(Math.min((toolStep ?? 1) + 1, 3));
        // setToolSteps(toolStep ?? 1);

        // 완료된 단계 설정
        // const completedStepsArray = [];
        // for (let i = 1; i <= (toolStep ?? 1); i++) {
        //   completedStepsArray.push(i);
        // }
        // setCompletedSteps(completedStepsArray);

        // 페르소나 설정 (Step 2)

        // if (quickSurveySurveyMethod && quickSurveySurveyMethod.length > 0) {
        //   setQuickSurveySurveyMethod(quickSurveySurveyMethod);
        // }
      }
    };
    interviewLoading();
    setToolLoading(false);
  }, [toolLoading]);

  // 고객핵심가치분석 리스트 가져오기
  useEffect(() => {
    const getAllTargetDiscovery = async () => {
      try {
        let page = 1;
        const size = 10;
        let allItems = [];
        let bmAllItems = [];

        const response = await getFindToolListOnServerSaas(
          projectSaas?._id ?? "",
          "ix_concept_definition_education",
          isLoggedIn
        );

        const newItems = (response || []).filter(
          (item) =>
            item?.type === "ix_concept_definition_education" &&
            item?.completedStep === 3
        );

        allItems = [...allItems, ...newItems];

        setConceptDefinitionList(allItems);

        const bmResponse = await getFindToolListOnServerSaas(
          projectSaas?._id ?? "",
          "ix_business_model_canvas_education",
          isLoggedIn
        );
        const bmNewItems = (bmResponse || []).filter(
          (item) =>
            item?.type === "ix_business_model_canvas_education" &&
            item?.completedStep === 3
        );

        bmAllItems = [...bmAllItems, ...bmNewItems];

        setBusinessModelCanvasReport(bmAllItems);
      } catch (error) {
        setConceptDefinitionList([]); // Set empty array on error
        setBusinessModelCanvasReport([]);
      }
    };

    getAllTargetDiscovery();
  }, [isLoggedIn, projectSaas]);

  // 다음 단계로 이동하는 함수
  const handleNextStep = (currentStep) => {
    setCompletedSteps([...completedSteps, currentStep]);
    setActiveTab(currentStep + 1);
    setShowPopupError(false);
  };

  const handleConceptDefinitionSelect = (displayText, listType, item) => {
    setSelectedPurposes((prev) => ({
      ...prev,
      [listType]: displayText,
    }));
    setPrfaqConceptDefinition(item);
    // 다른 필요한 로직들...
    setSelectBoxStates((prev) => ({
      ...prev,
      [listType]: false,
    }));
  };

  // 비즈니스 모델 캔버스용 핸들러
  const handleBusinessModelCanvasSelect = (displayText, listType, item) => {
    setSelectedPurposes((prev) => ({
      ...prev,
      [listType]: displayText,
    }));
    setPrfaqBusinessModelCanvas(item);
    // 다른 필요한 로직들...
    setSelectBoxStates((prev) => ({
      ...prev,
      [listType]: false,
    }));
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

      await updateToolOnServer(
        responseToolId,
        {
          selectedKanoModelIdea: selectedKanoModelData,
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

  const handleSubmit = async () => {
    // 새 AbortController 생성
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    handleNextStep(1);
    setIsLoading(true);
    // setToolSteps(2);
    // setIsLoadingReport(true);

    try {
      const Data = {
        type: "ix_prfaq_key_content_education",
        concept_definition_final_report:
          prfaqConceptDefinition.conceptDefinitionFinalReport,
        business_model_canvas_report:
          prfaqBusinessModelCanvas.bmCanvasGraphItems,
        company_info: companyInfo,
      };

      let response = await EducationToolsRequest(Data, isLoggedIn, signal);

      //  let retryCount = 0;
      // const maxRetries = 10;
      //   while (retryCount < maxRetries &&
      //     (!response ||
      //      !response?.response ||
      //      !response?.response?.idea_evaluation_comparison_education ||
      //      !Array.isArray(response?.response?.idea_evaluation_comparison_education)
      //     )
      //    ) {
      //      response = await EducationToolsRequest(Data, isLoggedIn, signal);
      //      maxRetries++;

      //    }
      //      if (retryCount >= maxRetries) {
      //      setShowPopupError(true);
      //      return;
      //    }

      // setIdeaEvaluateComparisonEducation(response.response.idea_evaluation_comparison_education)
      setPrfaqKeyContentEducation(
        response.response.prfaq_key_content_education
      );

      const responseToolId = await createToolOnServer(
        {
          projectId: project._id,
          type: "ix_prfaq_education",
          completedStep: 2,
          prfaqKeyContentEducation:
            response.response.prfaq_key_content_education,
          selectedConceptDefinition:
            prfaqConceptDefinition.conceptDefinitionFinalReport,
          selectedBusinessModelCanvas:
            prfaqBusinessModelCanvas.bmCanvasGraphItems,
          selectedPurposes: selectedPurposes,
          companyInfo: companyInfo,
        },
        isLoggedIn
      );
      setToolId(responseToolId);

      const creditUsePayload = {
        title: project.projectTitle,
        service_type: "prfaq",
        target: "",
        state: "use",
        mount: creditCreateTool,
      };

      await UserCreditUse(creditUsePayload, isLoggedIn);

      // 크레딧 사용 후 사용자 정보 새로고침

      const userCreditValue = await UserCreditInfo(isLoggedIn);
      // 전역 상태의 크레딧 정보 업데이트
      setUserCredits(userCreditValue);

      setToolSteps(1);
      // setCompletedSteps([...completedSteps, 3]);
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
      setIsLoading(false);
    }
  };

  const handleReportRequest = async () => {
    setIsLoadingReport(true);
    handleNextStep(2);
    // setToolSteps(2);
    try {
      // await updateToolOnServer(
      //   toolId,
      //   {
      //     completedStep: 2,
      //   },
      //   isLoggedIn
      // );

      try {
        const apiRequestData = {
          type: "ix_prfaq_final_report_education",
          business_description: businessDescription,
          prfaq_key_content: prfaqKeyContentEducation,
          company_info: companyInfo,
        };

        let response = await EducationToolsRequest(apiRequestData, isLoggedIn);

        setPrfaqFinalReport(response.response.prfaq_final_report_education);

        // const maxAttempts = 10;
        // let attempts = 0;

        // while (attempts < maxAttempts && (!response || !response?.response)) {
        //   response = await InterviewXPsstAnalysisRequest(
        //     apiRequestData,
        //     isLoggedIn
        //   );
        //   attempts++;
        // }
        // if (attempts >= maxAttempts) {
        //   setShowPopupError(true);
        //   return;
        // }

        setIsLoadingReport(false);

        await updateToolOnServer(
          toolId,
          {
            completedStep: 3,
            prfaqFinalReportEducation:
              response.response.prfaq_final_report_education,
          },
          isLoggedIn
        );

        setCompletedStatus(true);
        setCompletedSteps((prev) => [...prev, 3]);
      } catch (error) {}
      setToolSteps(3);
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

  const handleSelectBoxClick = (selectBoxId, ref) => {
    // Don't open dropdown if toolSteps >= 1 for customerList
    if (toolSteps >= 1) {
      return;
    }

    calculateDropDirection(ref, selectBoxId);
    setSelectBoxStates((prev) => {
      const newState = {};
      Object.keys(prev || {}).forEach((key) => {
        newState[key] = key === selectBoxId ? !prev?.[key] : false;
      });
      return newState;
    });
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

  const abortControllerRef = useRef(null);

  // 외부 클릭 감지 함수
  const handleClickOutside = useCallback((event) => {
    // customerListRef와 businessModelCanvasRef가 모두 존재하는지 확인
    if (customerListRef.current && businessModelCanvasRef.current) {
      // 클릭된 요소가 두 select box 내부에 있는지 확인
      const isClickInsideCustomerList = customerListRef.current.contains(
        event.target
      );
      const isClickInsideBusinessModelCanvas =
        businessModelCanvasRef.current.contains(event.target);

      // 클릭된 요소가 두 select box 모두 외부에 있다면 모든 select box 닫기
      if (!isClickInsideCustomerList && !isClickInsideBusinessModelCanvas) {
        setSelectBoxStates((prev) => {
          const newState = {};
          Object.keys(prev || {}).forEach((key) => {
            newState[key] = false;
          });
          return newState;
        });
      }
    }
  }, []);

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      // console.log("currentUrl", currentUrl);
      if (currentUrl.toLowerCase().includes("prfaq")) {
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

    // 외부 클릭 감지 이벤트 리스너 추가
    document.addEventListener("click", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      // window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);

      // 진행 중인 모든 API 요청 중단
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [navigate, handleClickOutside]);

  useEffect(() => {
    if (
      ideaEvaluateComparisonEducation &&
      ideaEvaluateComparisonEducation.length > 0
    ) {
      // 각 아이디어별 선택된 횟수를 카운트
      const ideaCount = {};

      ideaEvaluateComparisonEducation.forEach((comparison) => {
        const selectedIdea = comparison.selected_idea;
        ideaCount[selectedIdea] = (ideaCount[selectedIdea] || 0) + 1;
      });

      // 파레토 그래프용 데이터 형식으로 변환
      const paretoData = Object.entries(ideaCount)
        .map(([name, value]) => ({
          name,
          value,
        }))
        .sort((a, b) => b.value - a.value); // 값이 큰 순서대로 정렬

      // 파레토 그래프 데이터 설정
      setGraphData(paretoData);
    }
  }, [ideaEvaluateComparisonEducation]);

  const handleConfirmCredit = async () => {
    setShowCreatePersonaPopup(false);
  };

  // useEffect(() => {
  //   // 페이지에 들어왔을 때 입력란 초기화
  //   setCompanyInfo({
  //     company: '',
  //     product: '',
  //     ceo: ''
  //   });

  //   // 주의: 여기서는 setPrfaqCompanyInfo({})와 같은 전역 상태는
  //   // 초기화하지 않음 (그것이 저장된 데이터일 수 있음)
  // }, []);

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
                    기초 정보 분석
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
                    핵심 내용 확인
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
                    PRFAQ 도출
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
                      선별된 아이디어를 사용자 의견으로 다시 평가하여 우선순위를
                      도출하세요
                    </Body3>
                  </div>

                  <div className="content">
                    <TabContent5Item required>
                      <TabContent5Item>
                        <div className="title">
                          <Body1 color="gray700">컨셉 정의서 </Body1>
                        </div>

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
                                "컨셉 정의서를 불러 올 수 있습니다"}
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
                            <SelectBoxList
                              dropUp={dropUpStates.customerList}
                              style={{ zIndex: "1000" }}
                            >
                              {conceptDefinitionList.length === 0 ? (
                                <SelectBoxItem disabled={toolSteps >= 1}>
                                  <Body2 color="gray300" align="left">
                                    직접 문제점을 작성합니다.
                                  </Body2>
                                </SelectBoxItem>
                              ) : (
                                conceptDefinitionList.map((item, index) => (
                                  <SelectBoxItem
                                    // disabled={
                                    //   toolSteps >= 1
                                    // }
                                    key={index}
                                    onClick={() => {
                                      handleConceptDefinitionSelect(
                                        `${item.personaTitle} (${
                                          item.updateDate.split(":")[0]
                                        }:${item.updateDate.split(":")[1]}) `,
                                        "customerList",
                                        item
                                      );
                                    }}
                                  >
                                    <Body2 color="gray700" align="left">
                                      {item.personaTitle} (
                                      {item.updateDate.split(":")[0]}:
                                      {item.updateDate.split(":")[1]})
                                    </Body2>
                                  </SelectBoxItem>
                                ))
                              )}
                            </SelectBoxList>
                          )}
                        </SelectBox>
                        <div className="title" style={{ marginTop: "50px" }}>
                          <Body1 color="gray700">비즈니스 모델 캔버스 </Body1>
                        </div>

                        <SelectBox
                          ref={businessModelCanvasRef}
                          style={{ marginBottom: "60px" }}
                        >
                          <SelectBoxTitle
                            onClick={() =>
                              handleSelectBoxClick(
                                "businessModelCanvas",
                                businessModelCanvasRef
                              )
                            }
                            style={{
                              cursor:
                                toolSteps >= 1 ? "not-allowed" : "pointer",
                            }}
                          >
                            <Body2
                              color={
                                selectedPurposes.businessModelCanvas
                                  ? "gray800"
                                  : "gray300"
                              }
                            >
                              {selectedPurposes.businessModelCanvas ||
                                "비즈니스 모델 캔버스를 불러 올 수 있습니다"}
                            </Body2>
                            <images.ChevronDown
                              width="24px"
                              height="24px"
                              color={palette.gray500}
                              style={{
                                transform: selectBoxStates.businessModelCanvas
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                              }}
                            />
                          </SelectBoxTitle>

                          {selectBoxStates.businessModelCanvas && (
                            <SelectBoxList
                              dropUp={dropUpStates.businessModelCanvas}
                            >
                              {businessModelCanvasReport.length === 0 ? (
                                <SelectBoxItem disabled={toolSteps >= 1}>
                                  <Body2 color="gray300" align="left">
                                    직접 문제점을 작성합니다.
                                  </Body2>
                                </SelectBoxItem>
                              ) : (
                                businessModelCanvasReport.map((item, index) => (
                                  <SelectBoxItem
                                    // disabled={
                                    //   toolSteps >= 1
                                    // }
                                    key={index}
                                    onClick={() => {
                                      handleBusinessModelCanvasSelect(
                                        ` 비즈니스 모델 캔버스 (${
                                          item.updateDate.split(":")[0]
                                        }:${item.updateDate.split(":")[1]})`,
                                        "businessModelCanvas",
                                        item
                                      );
                                    }}
                                  >
                                    <Body2 color="gray700" align="left">
                                      비즈니스 모델 캔버스 (
                                      {item.updateDate.split(":")[0]}:
                                      {item.updateDate.split(":")[1]})
                                    </Body2>
                                  </SelectBoxItem>
                                ))
                              )}
                            </SelectBoxList>
                          )}
                        </SelectBox>
                      </TabContent5Item>
                      <div className="title">
                        <Body1 color="gray700">
                          완성도 높은 결과물을 위해 아래 기본 정보를
                          입력해주세요{" "}
                        </Body1>
                      </div>

                      <MoleculeAddContentWriting
                        style={{ marginTop: "50px" }}
                        company={companyInfo.company || ""}
                        product={companyInfo.product || ""}
                        ceo={companyInfo.ceo || ""}
                        // onSendChat={(field, value) => {
                        //   console.log(`Field ${field} updated with value: ${value}`);
                        //   setCompanyInfo(prev => {
                        //     const newState = {
                        //       ...prev,
                        //       [field]: value
                        //     };
                        //     console.log('Updated companyInfo:', newState);
                        //     return newState;
                        //   });
                        // }}
                        onSendChat={(field, value) => {
                          setCompanyInfo((prev) => ({
                            ...prev,
                            [field]: value,
                          }));
                        }}
                        disabled={toolSteps >= 1}
                      />
                    </TabContent5Item>
                  </div>
                  <Button
                    Other
                    Primary
                    Fill
                    Round
                    onClick={handleSubmit}
                    disabled={
                      !selectedPurposes.customerList ||
                      !selectedPurposes.businessModelCanvas ||
                      toolSteps >= 1 ||
                      !companyInfo.company?.trim() ||
                      !companyInfo.product?.trim() ||
                      !companyInfo.ceo?.trim()
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
                    <AtomPersonaLoader
                      message={`컨셉 정의서와 비즈니스 모델 캔버스를 통합 분석하고 있어요`}
                    />
                  </div>
                ) : (
                  prfaqKeyContentEducation && (
                    <>
                      <div className="title">
                        <H3 color="gray800">Core Value Analysis</H3>
                        <Body3 color="gray800">
                          Kano Model 결과를 기반으로 비즈니스의 주요 가치를
                          도출합니다
                        </Body3>
                      </div>
                      <div className="content">
                        <TabContent5Item>
                          <BoxWrap
                            Column
                            NoneV
                            style={{ marginBottom: "24px" }}
                          >
                            <div
                              className="selectBoxWrap"
                              // style={{ marginTop: "12px" }}
                            >
                              <Body2
                                color="gray500"
                                style={{
                                  width: "110px",
                                  alignSelf: "flex-start",
                                }}
                              >
                                회사명
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
                                    companyInfo.company?.length > 0
                                      ? "gray800"
                                      : "gray300"
                                  }
                                  style={{
                                    whiteSpace: "normal",
                                    wordBreak: "keep-all",
                                    wordWrap: "break-word",
                                    overflow: "visible",
                                    maxWidth: "94%",
                                    textAlign: "left",
                                    marginLeft: "20px",
                                    marginTop: "0",
                                    paddingTop: "0",
                                    display: "block",
                                    alignSelf: "flex-start",
                                  }}
                                >
                                  {companyInfo.company?.length > 0
                                    ? companyInfo.company
                                    : "선택해주세요"}
                                </Body2>
                              </li>
                            </div>

                            <div
                              className="selectBoxWrap"
                              style={{ marginTop: "8px" }}
                            >
                              <Body2
                                color="gray500"
                                style={{
                                  width: "110px",
                                  alignSelf: "flex-start",
                                }}
                              >
                                제품명
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
                                    companyInfo.product?.length > 0
                                      ? "gray800"
                                      : "gray300"
                                  }
                                  style={{
                                    whiteSpace: "normal",
                                    wordBreak: "keep-all",
                                    wordWrap: "break-word",
                                    overflow: "visible",
                                    maxWidth: "94%",
                                    textAlign: "left",
                                    marginLeft: "20px",
                                    marginTop: "0",
                                    paddingTop: "0",
                                    display: "block",
                                    alignSelf: "flex-start",
                                  }}
                                >
                                  {companyInfo.product?.length > 0
                                    ? companyInfo.product
                                    : "선택해주세요"}
                                </Body2>
                              </li>
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
                                대표자명
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
                                    companyInfo.ceo?.length > 0
                                      ? "gray800"
                                      : "gray300"
                                  }
                                  style={{
                                    whiteSpace: "normal",
                                    wordBreak: "keep-all",
                                    wordWrap: "break-word",
                                    overflow: "visible",
                                    maxWidth: "94%",
                                    textAlign: "left",
                                    marginLeft: "20px",
                                    marginTop: "0",
                                    paddingTop: "0",
                                    display: "block",
                                    alignSelf: "flex-start",
                                  }}
                                >
                                  {companyInfo.ceo?.length > 0
                                    ? companyInfo.ceo
                                    : "선택해주세요"}
                                </Body2>
                              </li>
                            </div>
                          </BoxWrap>
                        </TabContent5Item>
                      </div>

                      <div className="content" style={{ marginTop: "-20px" }}>
                        <IdeaContainer>
                          <IdeaBox>
                            <IdeaTitle>제목</IdeaTitle>
                            <IdeaContent>
                              <IdeaText>
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                  }}
                                >
                                  "{prfaqKeyContentEducation?.heading?.title}"
                                </div>
                                {prfaqKeyContentEducation?.heading?.content.map(
                                  (item, idx) => (
                                    <div key={idx}>• {item}</div>
                                  )
                                )}
                              </IdeaText>
                            </IdeaContent>
                          </IdeaBox>
                        </IdeaContainer>

                        <IdeaContainer>
                          <IdeaBox>
                            <IdeaTitle>부제</IdeaTitle>
                            <IdeaContent>
                              <IdeaText>
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                  }}
                                >
                                  "
                                  {prfaqKeyContentEducation?.sub_heading?.title}
                                  "
                                </div>
                                {prfaqKeyContentEducation?.sub_heading?.content.map(
                                  (item, idx) => (
                                    <div key={idx}>• {item}</div>
                                  )
                                )}
                              </IdeaText>
                            </IdeaContent>
                          </IdeaBox>
                        </IdeaContainer>

                        <IdeaContainer>
                          <IdeaBox>
                            <IdeaTitle>문제정의</IdeaTitle>
                            <IdeaContent>
                              <IdeaText>
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                  }}
                                >
                                  "{prfaqKeyContentEducation?.problem?.title}"
                                </div>
                                {prfaqKeyContentEducation?.problem?.content.map(
                                  (item, idx) => (
                                    <div key={idx}>• {item}</div>
                                  )
                                )}
                              </IdeaText>
                            </IdeaContent>
                          </IdeaBox>
                        </IdeaContainer>

                        <IdeaContainer>
                          <IdeaBox>
                            <IdeaTitle>솔루션 소개</IdeaTitle>
                            <IdeaContent>
                              <IdeaText>
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                  }}
                                >
                                  "{prfaqKeyContentEducation?.solution?.title}"
                                </div>
                                {prfaqKeyContentEducation?.solution?.content.map(
                                  (item, idx) => (
                                    <div key={idx}>• {item}</div>
                                  )
                                )}
                              </IdeaText>
                            </IdeaContent>
                          </IdeaBox>
                        </IdeaContainer>

                        <IdeaContainer>
                          <IdeaBox>
                            <IdeaTitle>내부 인용문</IdeaTitle>
                            <IdeaContent>
                              <IdeaText>
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                  }}
                                >
                                  "
                                  {
                                    prfaqKeyContentEducation?.internal_quote
                                      ?.title
                                  }
                                  "
                                </div>
                                {prfaqKeyContentEducation?.internal_quote?.content.map(
                                  (item, idx) => (
                                    <div key={idx}>• {item}</div>
                                  )
                                )}
                              </IdeaText>
                            </IdeaContent>
                          </IdeaBox>
                        </IdeaContainer>

                        <IdeaContainer>
                          <IdeaBox>
                            <IdeaTitle>고객 후기</IdeaTitle>
                            <IdeaContent>
                              <IdeaText>
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                  }}
                                >
                                  "
                                  {
                                    prfaqKeyContentEducation?.customer_quote
                                      ?.title
                                  }
                                  "
                                </div>
                                {prfaqKeyContentEducation?.customer_quote?.content.map(
                                  (item, idx) => (
                                    <div key={idx}>• {item}</div>
                                  )
                                )}
                              </IdeaText>
                            </IdeaContent>
                          </IdeaBox>
                        </IdeaContainer>

                        <IdeaContainer>
                          <IdeaBox>
                            <IdeaTitle>이용 방법</IdeaTitle>
                            <IdeaContent>
                              <IdeaText>
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                  }}
                                >
                                  "
                                  {
                                    prfaqKeyContentEducation?.how_to_start
                                      ?.title
                                  }
                                  "
                                </div>
                                {prfaqKeyContentEducation?.how_to_start?.content.map(
                                  (item, idx) => (
                                    <div key={idx}>• {item}</div>
                                  )
                                )}
                              </IdeaText>
                            </IdeaContent>
                          </IdeaBox>
                        </IdeaContainer>

                        <IdeaContainer>
                          <IdeaBox>
                            <IdeaTitle>closing</IdeaTitle>
                            <IdeaContent>
                              <IdeaText>
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                  }}
                                >
                                  "{prfaqKeyContentEducation?.closing?.title}"
                                </div>
                                {prfaqKeyContentEducation?.closing?.content.map(
                                  (item, idx) => (
                                    <div key={idx}>• {item}</div>
                                  )
                                )}
                              </IdeaText>
                            </IdeaContent>
                          </IdeaBox>
                        </IdeaContainer>

                        <IdeaContainer>
                          <IdeaBox>
                            <IdeaTitle>FAQ</IdeaTitle>
                            <IdeaContent>
                              <IdeaText>
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                  }}
                                >
                                  "{prfaqKeyContentEducation?.faq?.title}"
                                </div>
                                {prfaqKeyContentEducation?.faq?.content.map(
                                  (item, idx) => (
                                    <div key={idx}>• {item}</div>
                                  )
                                )}
                              </IdeaText>
                            </IdeaContent>
                          </IdeaBox>
                        </IdeaContainer>
                      </div>
                    </>
                  )
                )}

                {!isLoading && prfaqKeyContentEducation && (
                  <Button
                    Other
                    Primary
                    Fill
                    Round
                    onClick={handleReportRequest}
                    disabled={toolSteps > 2}
                  >
                    다음
                  </Button>
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
                      <AtomPersonaLoader
                        message={`핵심 내용을 기반으로 PRFAQ 최종본을 작성하고 있어요.`}
                      />
                    </div>
                  ) : (
                    <>
                      <BgBoxItem primaryLightest>
                        <H3 color="gray800">PRFAQ</H3>
                        <Body3 color="gray800">
                          사업 아이템의 실행 전략을 정리한 초안입니다. 이를
                          기반으로 세부 내용을 구체화해보세요.​
                        </Body3>
                      </BgBoxItem>

                      <InsightAnalysis>
                        <div className="title">
                          <div
                            style={{
                              marginBottom: "20px",
                            }}
                          >
                            <TabWrapType4>
                              <TabButtonType4
                                active={activeDesignTab === "PR"}
                                onClick={() => setActiveDesignTab("PR")}
                              >
                                PR
                              </TabButtonType4>
                              <TabButtonType4
                                active={activeDesignTab === "FAQ"}
                                onClick={() => setActiveDesignTab("FAQ")}
                              >
                                FAQ
                              </TabButtonType4>
                            </TabWrapType4>
                          </div>
                        </div>

                        {activeDesignTab === "PR" && (
                          <div
                            className="markdown-body"
                            style={{
                              textAlign: "left",
                            }}
                          >
                            <Markdown>
                              {prepareMarkdown(
                                prfaqFinalReport.prfaq_final_report_pr ??
                                  prfaqFinalReport ??
                                  ""
                              )}
                            </Markdown>
                          </div>
                        )}

                        {activeDesignTab === "FAQ" && (
                          <div
                            className="markdown-body"
                            style={{
                              textAlign: "left",
                            }}
                          >
                            <Markdown>
                              {prepareMarkdown(
                                prfaqFinalReport.prfaq_final_report_fqa ??
                                  prfaqFinalReport ??
                                  ""
                              )}
                            </Markdown>
                          </div>
                        )}
                      </InsightAnalysis>

                      {completedStatus && (
                        <Button
                          Primary
                          Edit
                          Large
                          style={{
                            color: "#666666",
                            border: "1px solid #E0E4EB",
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
            title="PRFAQ"
            message={
              <>
                현재 {eventTitle} 기간으로 이벤트 크레딧이 소진됩니다.
                <br />({creditCreateTool} 크레딧)
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
            title="PRFAQ"
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditCreateTool} 크레딧)
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
            title="PRFAQ"
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditCreateTool} 크레딧)
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

export default PagePRFAQ;

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
  text-align: left;

  /* GitHub Markdown 스타일 적용 */
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    color: ${palette.gray800};
    font-family: "Pretendard";
    line-height: 1.55;

    /* 모든 텍스트 요소에 동일한 line-height 적용 */
    p,
    li,
    span,
    div,
    ul,
    ol {
      line-height: 1.55;
    }

    /* 헤딩 요소 간의 간격 조절 */
    h1 {
      margin-top: 40px;
      margin-bottom: 24px;
    }

    // ... 기존 스타일 유지 ...
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

const IdeaContainer = styled.div`
  display: flex;
  flex-direction: column;
  // gap: 16px;
  width: 100%;
  // padding: 20px;
`;

const IdeaBox = styled.div`
  display: flex;
  flex-direction: column;
  // gap: 12px;
  padding: 20px;
  background: ${palette.white};
  border: 1px solid ${palette.outlineGray};
  border-radius: 8px;
  text-align: left;
  margin-bottom: -15px;
`;

const IdeaTitle = styled.h3`
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: ${palette.gray800};
  margin: 0;
  margin-bottom: 12px;
`;

const IdeaContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
`;

const IdeaText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: ${palette.gray600};
  margin: 0;
`;
