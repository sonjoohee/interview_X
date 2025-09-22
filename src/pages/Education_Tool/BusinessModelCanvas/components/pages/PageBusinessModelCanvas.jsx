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
import PopupWrap from "../../../../../assets/styles/Popup";
// import MoleculeBMResult from "../molecules/MoleculeBMResult";
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
  QUICK_SURVEY_SELECTED_QUESTION,
  PERSONA_LIST_SAAS,
  IDEA_EVALUATE_SELECTED_LIST,
  IDEA_EVALUATE_LIST,
  IDEA_EVALUATE_COMPARISON_EDUCATION,
  IDEA_EVALUATE_SELECTED_LIST_INDEX,
  BUSINESS_MODEL_CANVAS_MARKDOWN,
  EVENT_STATE,
  TRIAL_STATE,
  EVENT_TITLE,
  CREDIT_CREATE_TOOL,
  CREDIT_CREATE_TOOL_LOADED,
  USER_CREDITS,
  EDUCATION_STATE,
  EDUCATION_TOOL_COMPLETED_STATUS,
  BUSINESS_MODEL_CANVAS_GRAPH_ITEMS,
  BUSINESS_MODEL_CANVAS_POPUP_OPTIONS,
  BUSINESS_MODEL_CANVAS_SELECTED_POPUP_OPTIONS,
  SELECTED_CONCEPT_DEFINITION_FINAL_REPORT,
  BUSINESS_MODEL_CANVAS_INITIAL_GRAPH_DATA,
  BUSINESS_MODEL_CANVAS_SELECTED_CONCEPT_DEFINITION,
  BUSINESS_MODEL_CANVAS_USER_OPTIONS,
  BUSINESS_MODEL_CANVAS_FINAL_INSIGHT_DATA,
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
import MoleculeBusinessModelGraph from "../molecules/MoleculeBusinessModelGraph";
import MoleculeBusinessModelPopup from "../molecules/MoleculeBusinessModelPopup";
import { MoleculeBusinessModelDrawer } from "../molecules/MoleculeBusinessModelDrawer";


const PageBusinessModelCanvas = () => {
  const navigate = useNavigate();

  const [completedStatus, setCompletedStatus] = useAtom(EDUCATION_TOOL_COMPLETED_STATUS);
  const [bmCanvasUserOptions, setBMCanvasUserOptions] = useAtom(BUSINESS_MODEL_CANVAS_USER_OPTIONS);
  const [selectedConceptDefinition, setSelectedConceptDefinition] = useAtom(BUSINESS_MODEL_CANVAS_SELECTED_CONCEPT_DEFINITION);
  const [bmCanvasInitialGraphData, setBMCanvasInitialGraphData] = useAtom(BUSINESS_MODEL_CANVAS_INITIAL_GRAPH_DATA);
  const [selectedConceptDefinitionFinalReport, setSelectedConceptDefinitionFinalReport] = useAtom(SELECTED_CONCEPT_DEFINITION_FINAL_REPORT);
  const [bmCanvasSelectedPopupOptions, setBMCanvasSelectedPopupOptions] = useAtom(BUSINESS_MODEL_CANVAS_SELECTED_POPUP_OPTIONS);
  const [bmCanvasPopupOptions, setBMCanvasPopupOptions] = useAtom(BUSINESS_MODEL_CANVAS_POPUP_OPTIONS);
  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [eventState] = useAtom(EVENT_STATE);
  const [trialState] = useAtom(TRIAL_STATE);
  const [eventTitle] = useAtom(EVENT_TITLE);
  const [creditCreateTool, setCreditCreateTool] = useAtom(CREDIT_CREATE_TOOL);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [creditCreateToolLoaded, setCreditCreateToolLoaded] = useAtom(CREDIT_CREATE_TOOL_LOADED);
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [educationState] = useAtom(EDUCATION_STATE);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [quickSurveyAnalysis, setQuickSurveyAnalysis] = useAtom(
    QUICK_SURVEY_ANALYSIS
  );
  const [ideaEvaluateComparisonEducation, setIdeaEvaluateComparisonEducation] = useAtom(IDEA_EVALUATE_COMPARISON_EDUCATION)
  const [ideaEvaluateSelectedList, ] = useAtom(IDEA_EVALUATE_SELECTED_LIST);
  const [businessModelCanvasMarkdown, setBusinessModelCanvasMarkdown] = useAtom(BUSINESS_MODEL_CANVAS_MARKDOWN);
  const [businessModelCanvasGraphItems, setBusinessModelCanvasGraphItems] = useAtom(BUSINESS_MODEL_CANVAS_GRAPH_ITEMS);
  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [showPopupFileSize, setShowPopupFileSize] = useState(false);
  const [toolSteps, setToolSteps] = useState(0);
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
  const [selectedKanoModelData, setSelectedKanoModelData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [conceptDefinitionList, setConceptDefinitionList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBoxId, setSelectedBoxId] = useState(null);
  const [showCreatePersonaPopup, setShowCreatePersonaPopup] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [completedBoxes, setCompletedBoxes] = useState([]); // 적용하기를 누른 박스들 추적
  const [showDrawer, setShowDrawer] = useState(false); // 드로어 열림/닫힘 상태
  const [selectedDrawerSection, setSelectedDrawerSection] = useState("customerSegments"); // 선택된 드로어 섹션
  const [finalInsightLoading, setFinalInsightLoading] = useState(false); // 최종 인사이트 로딩 상태
  const [finalInsightData, setFinalInsightData] = useAtom(BUSINESS_MODEL_CANVAS_FINAL_INSIGHT_DATA); // 최종 인사이트 데이터

  const customerListRef = useRef(null);
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
      if(!creditCreateToolLoaded){
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

        if (Object.keys(selectedConceptDefinition).length > 0) {
          setSelectedPurposes(selectedConceptDefinition);
          // setSelectedConceptDefinitionFinalReport(selectedConceptDefinition);
        }
        if (businessModelCanvasMarkdown.length > 0) {
          setBusinessModelCanvasMarkdown(businessModelCanvasMarkdown);
        }
        // 비즈니스 정보 설정 (Step 1)
        

        // 활성 탭 설정 (기본값 1)
        if (toolStep === undefined || toolStep === 1) {
          setActiveTab(1);
          setToolSteps(0);
          setCompletedSteps([]);
        } else {
          if (toolStep >= 2) {
            setActiveTab(2);  // Step 2 이상이면 항상 2번 탭으로 설정
          } else {
            setActiveTab(1);
          }
          setToolSteps(toolStep);
          const completedStepsArray = [];
          for (let i = 1; i <= toolStep; i++) {
            completedStepsArray.push(i);
          }
          setCompletedSteps(completedStepsArray);
        }
        if(completedStatus) {
          setCompletedStatus(true);
        }
        
        // 최종 인사이트 데이터가 있으면 완료 상태로 설정
        if(finalInsightData && finalInsightData.length > 0) {
          setCompletedStatus(true);
        }
        
        // if(businessModelCanvasGraphItems && businessModelCanvasGraphItems.length > 0){
        //   setBusinessModelCanvasGraphItems(businessModelCanvasGraphItems);
        // }
        if(businessModelCanvasGraphItems) {
          // 객체인지 확인
          if (!Array.isArray(businessModelCanvasGraphItems) && typeof businessModelCanvasGraphItems === 'object') {
            // 객체의 값들만 배열로 변환
            const convertedArray = Object.values(businessModelCanvasGraphItems);
   
            setBusinessModelCanvasGraphItems(convertedArray);
          } else if (Array.isArray(businessModelCanvasGraphItems) && businessModelCanvasGraphItems.length > 0) {
            // 이미 배열인 경우 그대로 설정
          setBusinessModelCanvasGraphItems(businessModelCanvasGraphItems);
        }
        }

        // 보관함에서 불러온 경우 completedBoxes 복원
        if(businessModelCanvasGraphItems && businessModelCanvasGraphItems.length > 0) {
          const completedBoxIds = [];
          businessModelCanvasGraphItems.forEach((item, index) => {
            if (item && Object.values(item).length > 0) {
              completedBoxIds.push(index + 1); // 인덱스는 0부터 시작하지만 박스 ID는 1부터 시작
            }
          });
          setCompletedBoxes(completedBoxIds);
        }
        // if(bmCanvasInitialGraphData && bmCanvasInitialGraphData.length > 0){
        //   console.log("bmCanvasInitialGraphDatasssssssssssss",bmCanvasInitialGraphData)
        //   setBMCanvasInitialGraphData(bmCanvasInitialGraphData);
        // }
        // if(bmCanvasInitialGraphData) {
        //   // 객체인지 확인
        //   if (!Array.isArray(bmCanvasInitialGraphData) && typeof bmCanvasInitialGraphData === 'object') {
        //     // 객체를 배열로 감싸기
        //     console.log("bmCanvasInitialGraphDatasssssssssssss",bmCanvasInitialGraphData)
        //     setBMCanvasInitialGraphData([bmCanvasInitialGraphData]);
        //   } else if (Array.isArray(bmCanvasInitialGraphData) && bmCanvasInitialGraphData.length > 0) {
        //     // 이미 배열인 경우 그대로 설정
        //     setBMCanvasInitialGraphData(bmCanvasInitialGraphData);
        //   }
        // }
        if(bmCanvasInitialGraphData) {
          // 객체인지 확인
          if (!Array.isArray(bmCanvasInitialGraphData) && typeof bmCanvasInitialGraphData === 'object') {
            // 객체의 값들만 배열로 변환
            const convertedArray = Object.values(bmCanvasInitialGraphData);
     
            setBMCanvasInitialGraphData(convertedArray);
          } else if (Array.isArray(bmCanvasInitialGraphData) && bmCanvasInitialGraphData.length > 0) {
            // 이미 배열인 경우 그대로 설정
          setBMCanvasInitialGraphData(bmCanvasInitialGraphData);
        }
        }
    
        if(bmCanvasPopupOptions && bmCanvasPopupOptions.length > 0){
          setBMCanvasPopupOptions(bmCanvasPopupOptions);
        }
        if(bmCanvasSelectedPopupOptions && bmCanvasSelectedPopupOptions.length > 0){
          setBMCanvasSelectedPopupOptions(bmCanvasSelectedPopupOptions);
        }
        if(bmCanvasUserOptions && bmCanvasUserOptions.length > 0){
          setBMCanvasUserOptions(bmCanvasUserOptions);
        }


        
        

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
      } catch (error) {
        setConceptDefinitionList([]); // Set empty array on error
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

  const toggleSelectBox = (type) => {
    setSelectBoxStates((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };


  const handlePurposeSelect = (purpose, selectBoxId,item) => {
    setSelectedPurposes((prev) => ({
      ...(prev || {}),
      [selectBoxId]: purpose || "",
    }));
    handleContactInputChange("purpose", purpose || "");
    setSelectBoxStates((prev) => ({
      ...(prev || {}),
      [selectBoxId]: false,
    }));

    // if (selectBoxId === "customerList") {
    //   setBusinessDescription(purpose || "");
    // }
    setSelectedKanoModelData(item);
  
    setSelectedConceptDefinitionFinalReport(item.conceptDefinitionFinalReport);

  };



  const business = {
    business_analysis: businessDescription,
    // target: project?.projectAnalysis?.target_customer || "",
    // business_model: project?.businessModel || "",
    sector: project?.industryType || "",
    country: project?.targetCountry || "",
  };

  const handleSubmitConceptButtonClick = async () => {
    setSelectBoxStates((prev) => ({
      ...prev,
      customerList: false,
    }));
    setIsLoading(true);
    await handleSubmitConcept();
  };
 
  const handleSubmitConcept = async () => {
    // 새 AbortController 생성
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setIsLoading(true);
    // setToolSteps(2);
    // setIsLoadingReport(true);

    try {

            setBusinessModelCanvasMarkdown(selectedConceptDefinitionFinalReport);


      const responseToolId = await createToolOnServer(
        {
          projectId: project._id,
          type: "ix_business_model_canvas_education",
          selectedConceptDefinition: selectedPurposes,
          businessModelCanvasMarkdown: selectedConceptDefinitionFinalReport,
          completedStep: 1,
        },
        isLoggedIn
      );
      setToolId(responseToolId);
      setSelectedConceptDefinition(selectedPurposes);

       // 크레딧이 사용 가능한 상태면 사용 API 호출
       const creditUsePayload = {
        title: project.projectTitle,
        service_type: "비즈니스 모델 캔버스",
        target: "",
        state: "use",
        mount: creditCreateTool,
      };

      await UserCreditUse(creditUsePayload, isLoggedIn);

      // 크레딧 사용 후 사용자 정보 새로고침

      const userCreditValue = await UserCreditInfo(isLoggedIn);
      // 전역 상태의 크레딧 정보 업데이트
      setUserCredits(userCreditValue);



      // setToolSteps(3);
      setToolStep(1);
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
  const handleSubmitReport = async () => {
    handleNextStep(1);
      await updateToolOnServer(
        toolId,
        {
        // bmCanvasGraphItems: response.response.business_model_canvas_report_education,
        // bmCanvasInitialGraphData: response.response.business_model_canvas_report_education,
          completedStep: 2, 
        },
        isLoggedIn
      );
  }

  const handleCheckboxChange = (ideaId) => {
    // console.log("SelectedKeys", selectedKeys)
    setSelectedKeys((prev) => {
      // prev가 배열이 아닌 경우 빈 배열로 초기화
      const currentSelected = Array.isArray(prev) ? prev : [];
 
      if (currentSelected.includes(ideaId)) {
        // 이미 선택된 아이템이면 제거
        const newSelected = currentSelected.filter((id) => id !== ideaId);
        // 선택된 옵션에서도 제거
        setBMCanvasSelectedPopupOptions(prevOptions => {
          const currentOptions = Array.isArray(prevOptions) ? prevOptions : [];
          return currentOptions.filter((_, index) => index !== currentSelected.indexOf(ideaId));
        });

        return newSelected;
      } else {
        // 새로운 아이템 추가
        // if (currentSelected.length >= 3) {
        //   return currentSelected; // 3개 이상이면 현재 상태 유지
        // }
        const newSelected = [...currentSelected, ideaId];
        // 선택된 옵션 추가
        setBMCanvasSelectedPopupOptions(prevOptions => {
          const currentOptions = Array.isArray(prevOptions) ? prevOptions : [];
          // 중복 체크
          if (currentOptions.includes(ideaId)) {
            return currentOptions; // 이미 있는 값이면 그대로 반환
          }
          const updatedOptions = [...currentOptions, ideaId];
      // console.log("updatedOptions", updatedOptions)
          return updatedOptions;
        });

        return newSelected;
      }
    });
  };
  
  // 현재 완료된 단계를 계산하는 함수
  const getCurrentCompletedStep = () => {
    // businessModelCanvasGraphItems 배열의 길이로 완료된 단계 파악
    return businessModelCanvasGraphItems ? businessModelCanvasGraphItems.length : 0;
  };

  // 팝업이 읽기 전용인지 확인하는 함수
  const isPopupReadOnly = (id) => {
    const currentStep = getCurrentCompletedStep();
    // 현재 완료된 단계보다 이전 단계이고, 다음 단계가 시작된 경우 읽기 전용
    return id < currentStep;
  };

  // 모든 9개 박스가 완료되었는지 확인하는 함수
  const areAllNineBoxesCompleted = () => {
    return businessModelCanvasGraphItems && businessModelCanvasGraphItems.length >= 9 &&
           businessModelCanvasGraphItems.slice(0, 9).every(item => item && Object.values(item).length > 0);
  };

  // 최종 인사이트 생성 핸들러
  const handleGenerateFinalInsight = async () => {
    setFinalInsightLoading(true);
    handleViewFinalInsight();
    
    try {
      // 배열 데이터를 비즈니스 모델 캔버스 구조로 변환하는 로직
      const convertArrayToBusinessModelCanvas = (businessModelCanvasGraphItems, businessDescription) => {
        // 섹션 매핑 정의
        const sectionMapping = {
          1: "customerSegments",
          2: "valueProposition", 
          3: "channels",
          4: "customerRelationships",
          5: "revenueStreams",
          6: "keyResources",
          7: "keyActivities",
          8: "keyPartners",
          9: "costStructure"
        };

        // 비즈니스 모델 캔버스 기본 구조 초기화
        const businessModel = {
          customerSegments: {},
          valueProposition: {},
          channels: {},
          customerRelationships: {},
          revenueStreams: {},
          keyResources: {},
          keyActivities: {},
          keyPartners: {},
          costStructure: {}
        };

        // 배열이 유효한지 확인
        if (!Array.isArray(businessModelCanvasGraphItems) || businessModelCanvasGraphItems.length === 0) {
          return {
            business_description: businessDescription,
            business_model: businessModel
          };
        }

        // 각 섹션 데이터를 변환
        businessModelCanvasGraphItems.forEach((sectionData, index) => {
          const sectionIndex = index + 1; // 배열 인덱스는 0부터 시작하지만 섹션은 1부터 시작
          const sectionKey = sectionMapping[sectionIndex];
          
          if (sectionKey && Array.isArray(sectionData)) {
            // 각 섹션의 항목들을 키-값 쌍으로 변환
            const sectionObject = {};
            
            sectionData.forEach((item, itemIndex) => {
              if (item && typeof item === 'object' && item.title) {
                // title을 키로, description을 값으로 사용
                let key = item.title;
                let counter = 1;
                
                // 중복된 키가 있으면 숫자를 붙여서 구분
                while (sectionObject[key]) {
                  counter++;
                  key = `${item.title}_${counter}`;
                }
                
                sectionObject[key] = item.description || item.title;
              }
            });
            
            businessModel[sectionKey] = sectionObject;
          }
        });

        return {
          business_description: businessDescription,
          business_model: businessModel
        };
      };

      const business_model_canvas = convertArrayToBusinessModelCanvas(businessModelCanvasGraphItems, businessDescription);

      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;
      const data = {
        type: "ix_business_model_canvas_final_report_education",
        business_model_canvas: business_model_canvas
      }
      
      let response = await EducationToolsRequest(data, isLoggedIn, signal);

      // 형식 오류 시 재시도
      let reportRetryCount = 0;
      const reportMaxRetries = 10;
 
      while (
        reportRetryCount < reportMaxRetries &&
        (!response ||
          !response?.response ||
          !response?.response?.business_model_canvas_final_report_education ||
          !response?.response?.business_model_canvas_final_report_education.sections ||
          !response?.response?.business_model_canvas_final_report_education.sections[0] ||
          !response?.response?.business_model_canvas_final_report_education.sections[0].title ||
          !response?.response?.business_model_canvas_final_report_education.sections[0].sub_sections ||
          !response?.response?.business_model_canvas_final_report_education.sections[0].sub_sections[0].sub_title ||
          !response?.response?.business_model_canvas_final_report_education.sections[0].sub_sections[0].text ||
          !response?.response?.business_model_canvas_final_report_education.sections[1] ||
          !response?.response?.business_model_canvas_final_report_education.sections[1].title ||
          !response?.response?.business_model_canvas_final_report_education.sections[1].sub_sections ||
          !response?.response?.business_model_canvas_final_report_education.sections[1].sub_sections[0].sub_title ||
          !response?.response?.business_model_canvas_final_report_education.sections[1].sub_sections[0].text)
      ) {
        try {
          response = await EducationToolsRequest(
            data,
            isLoggedIn,
            signal
          );
 
          reportRetryCount++;
          if (reportRetryCount >= reportMaxRetries)
            throw new Error(
              "올바른 응답을 받지 못했습니다. 최대 재시도 횟수를 초과했습니다."
            );
        } catch (error) {
          throw error;
        }
      }

      setFinalInsightData(response?.response?.business_model_canvas_final_report_education.sections);

             await updateToolOnServer(
         toolId,
         {
           bmCanvasFinalInsightData: response?.response?.business_model_canvas_final_report_education.sections,
           completedStep: 3,
           completedStatus: true,
         },  
         isLoggedIn
       );

       // 최종 인사이트 완료 시 전체 완료 상태로 설정
       setCompletedStatus(true);
       setFinalInsightLoading(false);
    } catch (error) {
      console.error("최종 인사이트 생성 중 오류:", error);
      setFinalInsightLoading(false);
      setShowPopupError(true);
    }
  };

  // 최종 인사이트 보러가기 핸들러
  const handleViewFinalInsight = () => {
    setSelectedDrawerSection("insights");
    setShowDrawer(true);
  };

  // 드로어 관련 함수들
  const handleOpenDrawer = (boxId) => {
    // boxId를 드로어 섹션 ID로 변환
    const sectionMapping = {
      1: "customerSegments",
      2: "valueProposition", 
      3: "channels",
      4: "customerRelationships",
      5: "revenueStreams",
      6: "keyResources",
      7: "keyActivities",
      8: "keyPartners",
      9: "costStructure"
    };
    
    setSelectedDrawerSection(sectionMapping[boxId] || "customerSegments");
    setShowDrawer(true);
  };

  const handleCloseDrawer = () => {
    if(!finalInsightLoading){
      setShowDrawer(false);
    }
  };

  // 박스가 완료되었는지 확인하는 함수
  const isBoxCompleted = (boxId) => {
    return completedBoxes.includes(boxId);
  };

  const handleShowPopup = async (id) => {
    setShowPopup(true);
    setSelectedKeys([])

  const existingData = bmCanvasInitialGraphData[id - 1];
  
  if (existingData) {
  // 이미 데이터가 있으면 로딩 없이 바로 보여주기
  if (id === 1 || id === 2) {
    const currentGraphItemArray = businessModelCanvasGraphItems[id - 1];
    // currentGraphItemArray가 배열일 것으로 기대하지만, 안전하게 확인
    const titles = Array.isArray(currentGraphItemArray)
      ? currentGraphItemArray.map(item => item && item.title).filter(Boolean)
      : []; // 배열이 아니면 빈 배열 사용

    setBMCanvasSelectedPopupOptions(titles);
    setSelectedKeys(titles);
  } else {
    // 다른 섹션인 경우 (title만 가져오기)
    // setBMCanvasPopupOptions(Object.values(businessModelCanvasGraphItems[id - 1]).slice(0, 7));
    setBMCanvasSelectedPopupOptions(businessModelCanvasGraphItems[id - 1]?.map(item => item.title));
    setSelectedKeys(businessModelCanvasGraphItems[id - 1]?.map(item => item.title));
  }
    return;
  }

    setIsLoading(true);
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;


   
  try {
    if(id === 1 ){
    
      const Data = {
        type: "ix_business_model_canvas_report_education",
        concept_definition_final_report: businessModelCanvasMarkdown,
        business: business,
        bm_type: "customer_segment_value_proposition"
      };

      let response = await EducationToolsRequest (Data, isLoggedIn, signal);
      
      // 형식 오류 시 재시도
      let reportRetryCount = 0;
      const reportMaxRetries = 10;
 
      while (
        reportRetryCount < reportMaxRetries &&
        (!response ||
          !response?.response ||
          !response?.response?.business_model_canvas_report_education ||
          !response?.response?.business_model_canvas_report_education.customer_segments ||
          !response?.response?.business_model_canvas_report_education.value_propositions)
      ) {
        try {
          response = await EducationToolsRequest(
            Data,
            isLoggedIn,
            signal
          );
 
          reportRetryCount++;
          if (reportRetryCount >= reportMaxRetries)
            throw new Error(
              "올바른 응답을 받지 못했습니다. 최대 재시도 횟수를 초과했습니다."
            );
        } catch (error) {
          throw error;
        }
      }

      const firstItemresponse = Object.values(response.response.business_model_canvas_report_education)
    
      // 명확하게 배열로 정의
      const firstItem = [firstItemresponse[0].slice(0, 5)] // 5개 이상이 들어왔다면 5개까지만 저장
      
      // 이전 상태와 관계없이 항상 배열 형태로 상태 업데이트
      setBMCanvasInitialGraphData(firstItem)
  

    await updateToolOnServer(
      toolId,
      {
        bmCanvasInitialGraphData: firstItem,
      },  
      isLoggedIn
    );
  
    }else if(id === 2){
  
      const Data = {
        type: "ix_business_model_canvas_report_education",
        concept_definition_final_report: businessModelCanvasMarkdown,
        business: business,
        bm_type: "customer_segment_value_proposition"
      };

      let response = await EducationToolsRequest (Data, isLoggedIn, signal);

      // 형식 오류 시 재시도
      let reportRetryCount = 0;
      const reportMaxRetries = 10;
 
      while (
        reportRetryCount < reportMaxRetries &&
        (!response ||
          !response?.response ||
          !response?.response?.business_model_canvas_report_education ||
          !response?.response?.business_model_canvas_report_education.customer_segments ||
          !response?.response?.business_model_canvas_report_education.value_propositions)
      ) {
        try {
          response = await EducationToolsRequest(
            Data,
            isLoggedIn,
            signal
          );
 
          reportRetryCount++;
          if (reportRetryCount >= reportMaxRetries)
            throw new Error(
              "올바른 응답을 받지 못했습니다. 최대 재시도 횟수를 초과했습니다."
            );
        } catch (error) {
          throw error;
        }
      }

      const firstItemresponse = Object.values(response.response.business_model_canvas_report_education)

      if (Array.isArray(businessModelCanvasGraphItems)) {
        // 기존 상태가 배열이면

        const initialUpdatedItems = [...bmCanvasInitialGraphData]  // 배열 복사
        if (initialUpdatedItems.length < 2) {  // 충분한 공간 확보
          initialUpdatedItems.length = 2
        }
        initialUpdatedItems[1] = firstItemresponse[1].slice(0, 5)  // 1번 인덱스에 직접 배열 삽입
        
        setBMCanvasInitialGraphData(initialUpdatedItems)
    
  

        await updateToolOnServer(
          toolId,
          {
              bmCanvasInitialGraphData: initialUpdatedItems,
          },  
          isLoggedIn
        );
      }
    }
     
    else{

    // 선택된 박스 ID에 따라 다른 API 요청 데이터 구성
                let apiRequest = {
                  type: "ix_business_model_canvas_report_education",
                  bm_type: "",
                  business: business
                };

              // ID에 따라 다른 요청 데이터 구성
              switch (id) {
                case 3: // 채널
                  apiRequest = {
                    ...apiRequest,
                    concept_definition_final_report: businessModelCanvasMarkdown,
                    bm_type: "channel"
                  };
                  break;
                case 4: // 고객 관계
                  apiRequest = {
                    ...apiRequest,
                    customer_segment_value_proposition: businessModelCanvasGraphItems,
                    channel: businessModelCanvasGraphItems.find(item => item.id === 3),
                    bm_type: "customer_relationship"
                  };
                  break;
                case 5: // 수익원
                  apiRequest = {
                    ...apiRequest,
                    customer_segment_value_proposition: businessModelCanvasGraphItems,
                    channel:  businessModelCanvasGraphItems.find(item => item.id === 3),
                    customer_relationship: businessModelCanvasGraphItems.find(item => item.id === 4),
                    bm_type: "revenue_stream"
                  };
                  break;
                case 6: // 핵심 자원
                  apiRequest = {
                    ...apiRequest,
                    customer_segment_value_proposition: businessModelCanvasGraphItems,
                    channel: businessModelCanvasGraphItems.find(item => item.id === 3),
                    customer_relationship: businessModelCanvasGraphItems.find(item => item.id === 4),
                    revenue_stream: businessModelCanvasGraphItems.find(item => item.id === 5),
                    bm_type: "core_resource"
                  };
                  break;
                  case 7: // 핵심 횔동
                  apiRequest = {
                    ...apiRequest,
                    customer_segment_value_proposition: businessModelCanvasGraphItems,
                    channel: businessModelCanvasGraphItems.find(item => item.id === 3),
                    customer_relationship: businessModelCanvasGraphItems.find(item => item.id === 4),
                    revenue_stream: businessModelCanvasGraphItems.find(item => item.id === 5),
                    core_resource: businessModelCanvasGraphItems.find(item => item.id === 6),
                    bm_type: "core_activity"
                  };
                  break;
                  case 8: // 핵심 파트너
                  apiRequest = {
                    ...apiRequest,
                    customer_segment_value_proposition: businessModelCanvasGraphItems,
                    channel: businessModelCanvasGraphItems.find(item => item.id === 3),
                    customer_relationship: businessModelCanvasGraphItems.find(item => item.id === 4),
                    revenue_stream: businessModelCanvasGraphItems.find(item => item.id === 5),
                    core_resource: businessModelCanvasGraphItems.find(item => item.id === 6),
                    core_activity: businessModelCanvasGraphItems.find(item => item.id === 7),
                    bm_type: "core_partnership"
                  };
                  break;
                  case 9: // 비용 구조
                  apiRequest = {
                    ...apiRequest,
                    customer_segment_value_proposition: businessModelCanvasGraphItems,
                    channel: businessModelCanvasGraphItems.find(item => item.id === 3),
                    customer_relationship: businessModelCanvasGraphItems.find(item => item.id === 4),
                    revenue_stream: businessModelCanvasGraphItems.find(item => item.id === 5),
                    core_resource: businessModelCanvasGraphItems.find(item => item.id === 6),
                    core_activity: businessModelCanvasGraphItems.find(item => item.id === 7),
                    core_partnership: businessModelCanvasGraphItems.find(item => item.id === 8),
                    bm_type: "cost_structure"
                  };
         
              }
            // //api
          let response = await EducationToolsRequest(apiRequest, isLoggedIn, signal);  
 

  // 없다면 새로운 데이터 추가

          const updatedInitialData = [
            ...bmCanvasInitialGraphData,
            response.response.business_model_canvas_report_education
          ];

    
  await updateToolOnServer(
    toolId,
    {
      bmCanvasInitialGraphData: updatedInitialData,
    },  
    isLoggedIn
  );

  // 서버 업데이트 성공 후 상태 업데이트
  setBMCanvasInitialGraphData(updatedInitialData);
              
}


  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setIsLoading(false);
  }
};


  const handleClosePopup = () => {
    // 팝업을 닫을 때 selectedBoxId는 유지 (선택 상태 유지)
    setShowPopup(false);
    // selectedBoxId 상태는 그대로 유지
  };
  
  // 팝업 저장 핸들러
  const handleSavePopup = (data) => {
    // 저장 로직 구현
    if (selectedBoxId && !completedBoxes.includes(selectedBoxId)) {
      setCompletedBoxes(prev => [...prev, selectedBoxId]);
    }
    setShowPopup(false);
  }

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
    if(businessModelCanvasMarkdown.length > 0  ){
      return;
    }
    if(isLoading){
      return;
    }
    if(ideaEvaluateComparisonEducation.length > 0){
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

  const abortControllerRef = useRef(null);

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      // console.log("currentUrl", currentUrl);
      if (currentUrl.toLowerCase().includes("businessmodelcanvas")) {
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


  const handleConfirmCredit = async () => {
    setShowCreatePersonaPopup(false);
  };


  useEffect(() => {
    if (ideaEvaluateComparisonEducation && ideaEvaluateComparisonEducation.length > 0) {
      // 각 아이디어별 선택된 횟수를 카운트
      const ideaCount = {};
      
      ideaEvaluateComparisonEducation.forEach(comparison => {
        const selectedIdea = comparison.selected_idea;
        ideaCount[selectedIdea] = (ideaCount[selectedIdea] || 0) + 1;
      });
  
      // 파레토 그래프용 데이터 형식으로 변환
      const paretoData = Object.entries(ideaCount)
        .map(([name, value]) => ({
          name,
          value
        }))
        .sort((a, b) => b.value - a.value); // 값이 큰 순서대로 정렬
  
      // 파레토 그래프 데이터 설정
      setGraphData(paretoData);
    }
  }, [ideaEvaluateComparisonEducation]);

  // MoleculeBusinessModelPopup.jsx
const businessModelItems = [
  { id: 1, title: "고객 세그먼트", value: "1고객 세그먼트" },
  { id: 2, title: "가치 제안", value: "2가치 제안" },
  { id: 3, title: "채널", value: "3채널" },
  { id: 4, title: "고객관계", value: "4고객관계" },
  { id: 5, title: "수익원", value: "5수익원" },
  { id: 6, title: "핵심자원", value: "6핵심자원" },
  { id: 7, title: "핵심활동", value: "7핵심활동" },
  { id: 8, title: "핵심파트너십", value: "8핵심파트너십" },
  { id: 9, title: "비용구조", value: "9비용구조" }
];

    // ==================== 더미 데이터 테스트 영역 (시작) ====================
  // 이 영역을 주석 처리하면 더미 데이터 기능이 비활성화됩니다.
  
  // 9개 박스 완료 시뮬레이션용 더미 데이터
  // const dummyBusinessModelCanvasGraphItems = [
  //   // 1. 고객 세그먼트
  //   [
  //     { title: "30대 1인 가구", description: "홈카페 문화를 즐기는 젊은 직장인들" },
  //     { title: "카페 애호가", description: "특별한 음료를 추구하는 고객층" }
  //   ],
  //   // 2. 가치 제안
  //   [
  //     { title: "홈메이드 시럽", description: "직접 제조한 천연 시럽으로 차별화" },
  //     { title: "아늑한 공간", description: "소규모 개인 맞춤형 공간 제공" }
  //   ],
  //   // 3. 채널
  //   [
  //     { title: "인스타그램", description: "SNS를 통한 마케팅 및 주문 접수" },
  //     { title: "직접 방문", description: "매장 방문을 통한 직접 판매" }
  //   ],
  //   // 4. 고객 관계
  //   [
  //     { title: "개인화 서비스", description: "1:1 맞춤형 서비스 제공" },
  //     { title: "커뮤니티", description: "단골 고객과의 지속적인 관계 유지" }
  //   ],
  //   // 5. 수익원
  //   [
  //     { title: "음료 판매", description: "커피 및 시럽 음료 판매 수익" },
  //     { title: "프리미엄 메뉴", description: "특별 시럽 메뉴를 통한 고부가가치 창출" }
  //   ],
  //   // 6. 핵심 자원
  //   [
  //     { title: "바리스타 기술", description: "전문적인 음료 제조 기술" },
  //     { title: "시럽 레시피", description: "독창적인 홈메이드 시럽 제조법" }
  //   ],
  //   // 7. 핵심 활동
  //   [
  //     { title: "음료 제조", description: "고품질 음료 제조 및 제공" },
  //     { title: "SNS 마케팅", description: "인스타그램을 통한 브랜드 홍보" }
  //   ],
  //   // 8. 핵심 파트너십
  //   [
  //     { title: "원두 공급업체", description: "고품질 원두 공급 파트너" },
  //     { title: "지역 커뮤니티", description: "마포구 지역 네트워크 활용" }
  //   ],
  //   // 9. 비용 구조
  //   [
  //     { title: "임대료", description: "매장 임대 및 유지 비용" },
  //     { title: "원재료비", description: "원두, 시럽 재료 등 변동비" }
  //   ]
  // ];

  // 9개 박스 완료 상태 시뮬레이션
  const dummyCompletedBoxes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  // // ==================== 더미 데이터 테스트 영역 (끝) ====================

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
                  컨셉 정의서 확인
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
                  비즈니스 모델 캔버스 도출
                  </Body1>
                  {/* <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    Participating Persona
                  </Body1> */}
                </div>
              </TabButtonType5>
             
            </TabWrapType5>

            {activeTab === 1 && (
              <TabContent5>
                <>
                  <div className="title">
                    <H3 color="gray800">Concept Selection</H3>
                    <Body3 color="gray800">
                    컨셉 정의서를 기반으로 타겟 고객과 가치 제안을 설정하세요
                    </Body3>
                  </div>

                  <div className="content">
                    <TabContent5Item required>
                     

                      <TabContent5Item>
                        <div className="title">
                          <Body1 color="gray700">컨셉 정의서 가져오기 </Body1>
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
                                toolSteps >= 1 ||
                                isLoading ||
                                businessModelCanvasMarkdown.length > 0 
                                ? "default" : "pointer",
                            }}
                            disabled={
                              toolSteps >= 1 ||
                              isLoading ||
                              businessModelCanvasMarkdown.length > 0
                            }
                          >
                            <Body2
                              color={
                                selectedPurposes?.customerList
                                  ? "gray800"
                                  : "gray300"
                              }
                            >
                              {selectedPurposes?.customerList ||
                                "컨셉 정의서를 선택하세요"}
                            </Body2>
                            {
                              toolSteps >= 1 ||
                              isLoading ||
                              businessModelCanvasMarkdown.length > 0 
                              ? null :
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
                            }
                          </SelectBoxTitle>

                          {selectBoxStates.customerList && (
                            <SelectBoxList dropUp={dropUpStates?.customerList}>
                              {conceptDefinitionList?.length === 0 ? (
                                <SelectBoxItem 
                                disabled={toolSteps >= 1 }
                                >
                                  <Body2 color="gray300" align="left">
                                    직접 문제점을 작성합니다.
                                  </Body2>
                                </SelectBoxItem>
                              ) : (
                                conceptDefinitionList?.map((item, index) => (
                                  <SelectBoxItem
                                    // disabled={
                                    //   toolSteps >= 1 
                                    // }
                                    key={index}
                                    onClick={() => {
                                      handlePurposeSelect(
                                        `${item.personaTitle} 대상 컨셉 정의서 (${item.updateDate.split(":")[0]}:${item.updateDate.split(":")[1]}) `,
                                        "customerList",
                                        item
                                      );
                                    }}

                                  >
                                    <Body2 color="gray700" align="left">
                                    {item.personaTitle} 대상 컨셉 정의서 ({item.updateDate.split(":")[0]}:{item.updateDate.split(":")[1]}) 
                                    </Body2>
                                  </SelectBoxItem>
                                ))
                              )}
                            </SelectBoxList>
                          )}
                        </SelectBox>
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
                  ) :  !businessModelCanvasMarkdown.length > 0 ? (
                    <BoxWrap
                      NoData
                      style={{ height: "300px", marginTop: "32px" }}
                    >
                      <img src={images.ListFillPrimary} alt="" />
                      <Body2 color="gray700" align="center !important">
                      컨셉 정의서를 선택하신 후, 다음을 눌러주세요
                      </Body2>
                     
                    </BoxWrap>
                  ) : (
                    <InsightAnalysis>
                    <div
                      className="markdown-body"
                      style={{
                        color: palette.gray800,
                        textAlign: "left", marginTop: "40px"
                      }}
                    >
                      <Markdown>
                        {businessModelCanvasMarkdown ?? ""}
                      </Markdown>
                    </div>
                  </InsightAnalysis>
               
                  )}
                    </TabContent5Item>
                  </div>   
                  {businessModelCanvasMarkdown.length > 0 && !isLoading ? (
                        <Button
                          Other
                          Primary
                          Fill
                          Round
                          onClick={handleSubmitReport}
                          disabled={
                           toolSteps >= 1 || isLoading
                          }
                        >
                          비즈니스 모델 캔버스 시작하기
                        </Button>
                  ):(
                    !isLoading && (
                    <Button
                          Other
                          Primary
                          Fill
                          Round
                          onClick={handleSubmitConceptButtonClick}
                          disabled={
                            !selectedPurposes?.customerList.length > 0 ||
                            toolSteps >= 1 || isLoading
                          }
                        >
                          다음
                        </Button>
                    )
                  )}
                  
             
                  
                </>
              </TabContent5>
            )}

           

            {activeTab === 2 &&
              (completedSteps.includes(1) ) && (
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
                      <AtomPersonaLoader message="결과보고서를 작성하고 있습니다" />
                    </div>
                  ) : (
                    <>
                      <BgBoxItem primaryLightest>
                        <H3 color="gray800">Business Model 분석</H3>
                        <Body3 color="gray800">
                          페르소나 그룹의 의견을 확인하여 타겟 반응을 사전에
                          확인해보세요.
                        </Body3>
                      </BgBoxItem>

                                        
                      {businessModelCanvasGraphItems && (
                        <MoleculeBusinessModelGraph
                          setShowPopup={(id) => handleShowPopup(id)}
                          setSelectedBoxId={setSelectedBoxId}
                          selectedBoxId={selectedBoxId}
                          completedBoxes={completedBoxes} // 완료된 박스들 전달
                          onOpenDrawer={handleOpenDrawer} // 드로어 열기 함수 전달
                          // graphItems={businessModelCanvasGraphItems || []} // API 응답 결과 전달
                        />
                      )} 
                      

                      {/* {selectedBoxId && businessModelCanvasGraphItems[selectedBoxId - 1] && (
                      <IdeaContainer>
                          <IdeaBox>
                          <HeaderTitle>
                            <NumberCircle>{selectedBoxId}</NumberCircle>
                            <HeaderTitleText> {businessModelItems.find(item => item.id === selectedBoxId)?.title || ''}</HeaderTitleText>
                          </HeaderTitle>
              
                          
                          <IdeaContent>
                                  <IdeaText>
                              {/* 선택된 박스 ID에 해당하는 데이터만 필터링하여 표시 */}
                              {/* {businessModelCanvasGraphItems[selectedBoxId - 1]?.
                                filter(item => item.type !== "사용자 정의")  // 사용자 정의 타입 제외
                                .map((item, index) => (
                                  <div key={index}>
                                    {index + 1}. {item.title}: {item.description}
                                  </div>
                                ))}
                                  </IdeaText>
                            </IdeaContent>
                          </IdeaBox>
               
                        </IdeaContainer>
                        
                      )}  */}

                      {/* { businessModelCanvasGraphItems &&  businessModelCanvasGraphItems.length > 0 && (
                        
                        <MoleculeBMResult
                        style={{
                          marginTop: "20px"
                        }}
                        parentSelectedId={selectedBoxId}
                      />
                      )} */}

                      {/* 모든 9개 박스가 완료되면 최종 인사이트 버튼 표시 */}
                      {areAllNineBoxesCompleted() && !finalInsightLoading && (
                        <div style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}>
                          {finalInsightData && finalInsightData.length > 0 ? (
                            <Button
                              Other
                              Primary
                              Fill
                              Round
                              onClick={handleViewFinalInsight}
                            >
                              최종 인사이트 보러가기
                            </Button>
                          ) : (
                            <Button
                              Other
                              Primary
                              Fill
                              Round
                              onClick={handleGenerateFinalInsight}
                            >
                              최종 인사이트 생성
                            </Button>
                          )}
                        </div>
                      )}

                      {/* 비즈니스 모델 캔버스 도출 단계에서 항상 리서치 툴 리스트 바로가기 버튼 표시 */}
                      <div style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}>
                        <Button
                          Primary
                          Edit
                          Large
                          style={{ color: "#666666", border: "1px solid #E0E4EB" }}
                          onClick={() => navigate("/Tool")}
                        >
                          리서치 툴 리스트 바로가기 
                        </Button>
                      </div>
                    </>
                  )}
                </TabContent5>
              )}

           
          </DesignAnalysisWrap>
        </MainContent>

                {/* ==================== 더미 데이터 테스트 영역 (UI) ====================*/}
        {/* 이 영역을 주석 처리하면 더미 데이터 테스트 버튼이 사라집니다. */}
        {/* <DummyTestArea>
          <DummyTestButton onClick={() => {
            setBusinessModelCanvasGraphItems(dummyBusinessModelCanvasGraphItems);
            setCompletedBoxes(dummyCompletedBoxes);
          }}>
            📊 9개 박스 완료 시뮬레이션
          </DummyTestButton>
          <DummyTestButton onClick={() => {
            setBusinessModelCanvasGraphItems([]);
            setCompletedBoxes([]);
            setFinalInsightData(null);
            setFinalInsightLoading(false);
          }}>
            🔄 더미 데이터 초기화
          </DummyTestButton>
        </DummyTestArea> */}
        {/* ==================== 더미 데이터 테스트 영역 (UI 끝) ====================*/}

      </ContentsWrap>
{/* 
      {showPopup && (
        <MoleculeBusinessModelPopup
          isOpen={showPopup}
          onClose={handleClosePopup}
          onSave={handleSavePopup}
          isLoading={isLoading}
          currentModelId={selectedBoxId}
        />
      )} */}

      
 {showPopup && (
        <MoleculeBusinessModelPopup
          isOpen={showPopup}
          onClose={handleClosePopup}
          onSave={handleSavePopup}
          isLoading={isLoading}
          currentModelId={selectedBoxId}
          onCardSelect={(selectedOption) => handleCheckboxChange(selectedOption)} 
          selectedKeys={selectedKeys} // selectedKeys 배열을 전체 전달
          popupOptions={bmCanvasPopupOptions}
          isReadOnly={isPopupReadOnly(selectedBoxId)} // 읽기 전용 모드 추가
        />
      )}

      {/* 비즈니스 모델 드로어 */}
      <MoleculeBusinessModelDrawer
        isOpen={showDrawer}
        onClose={handleCloseDrawer}
        enabledSectionIds={[
          ...completedBoxes.map(boxId => {
            const sectionMapping = {
              1: "customerSegments",
              2: "valueProposition", 
              3: "channels",
              4: "customerRelationships",
              5: "revenueStreams",
              6: "keyResources",
              7: "keyActivities",
              8: "keyPartners",
              9: "costStructure"
            };
            return sectionMapping[boxId];
          }).filter(Boolean),
          // 9개 박스가 모두 완료되면 최종 인사이트도 활성화
          ...(areAllNineBoxesCompleted() ? ["insights"] : [])
        ]}
        selectedSectionId={selectedDrawerSection}
        onSelectSection={setSelectedDrawerSection}
        onGenerateInsight={handleGenerateFinalInsight} // 드로어에서 인사이트 생성 함수 전달
        finalInsightLoading={finalInsightLoading} // 로딩 상태 전달
      />

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
            title="비즈니스 모델 캔버스"
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
            title="비즈니스 모델 캔버스"
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
            title="비즈니스 모델 캔버스"
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
          } }
          onConfirm={() => {
            setShowCreditPopup(false);
            navigate("/Tool");
          }}
        />
      )}
    </>
  );
};

export default PageBusinessModelCanvas;

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
  
  /* 마크다운 스타일 추가 */
  .markdown-body {
    h1, h2, h3, h4, h5, h6 {
      margin-top: 0px;       /* 타이틀 위 여백 */
      margin-bottom: 8px;    /* 타이틀 아래 여백 */
    }
    
    /* 첫 번째 헤딩은 상단 여백 없음 */
    h1:first-child, h2:first-child, h3:first-child {
      margin-top: 0;
    }
    
    /* 헤딩과 바로 아래 단락 사이 여백 */
    h1 + p, h2 + p, h3 + p, h4 + p, h5 + p, h6 + p {
      margin-top: 12px;       /* 타이틀과 본문 사이 여백 */
    }
    
    /* 단락 사이 여백 */
    p {
      margin-bottom: 8px;    /* 단락 아래 여백 */
    }

    p, li, span {
      line-height: 1.55; /* 또는 1.6, 1.55 등 원하는 값 */
    }
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




const IdeaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 820px; /* MoleculeBusinessModelGraph와 동일한 너비로 설정 */
  margin: 0 auto; /* 중앙 정렬 */
  padding: 20px 0; /* 좌우 패딩 제거, 상하 패딩만 유지 */
`;

const IdeaBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: ${palette.white};
  border: 1px solid ${palette.outlineGray};
  border-radius: 8px;
  text-align: left;
`;

const IdeaTitle = styled.h3`
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: ${palette.gray800};
  margin: 0;
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

const HeaderTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;
`;

const NumberCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${palette.gray700};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  font-family: "Pretendard", "Poppins";
  font-size: 12px;
  font-weight: 600;
  color: white;
  flex-shrink: 0;
`;

const HeaderTitleText = styled.div`
  font-family: "Pretendard", "Poppins";
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3em;
  letter-spacing: -0.03em;
  color: ${palette.gray700};
`;

// ==================== 더미 데이터 테스트 영역 (스타일) ====================
// 이 영역을 주석 처리하면 더미 데이터 테스트 스타일이 비활성화됩니다.

// 더미 테스트 영역 스타일
const DummyTestArea = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DummyTestButton = styled.button`
  padding: 12px 20px;
  background: #226FFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(34, 111, 255, 0.3);
  transition: all 0.2s ease;

  &:hover {
    background: #1e5ce6;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(34, 111, 255, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

// ==================== 더미 데이터 테스트 영역 (스타일 끝) ====================