//디자인 감성 분석기
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../../assets/styles/Palette";
import AtomPersonaLoader from "../../../../Global/atoms/AtomPersonaLoader";
import OrganismIncNavigation from "../../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../../Global/molecules/MoleculeHeader";
import { Button } from "../../../../../assets/styles/ButtonStyle";
import images from "../../../../../assets/styles/Images";
import PopupWrap from "../../../../../assets/styles/Popup";
import Markdown from "markdown-to-jsx";
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
  InterviewPopup,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import {
  IS_LOGGED_IN,
  TOOL_ID,
  TOOL_STEP,
  TOOL_LOADING,
  PROJECT_SAAS,
  QUICK_SURVEY_PROJECT_DESCRIPTION,
  NPS_CONCEPT_DEFINITION,
  PERSONA_LIST_SAAS,
  NPS_SELECTED_CONCEPT,
  EVENT_STATE,
  TRIAL_STATE,
  EVENT_TITLE,
  CREDIT_CREATE_TOOL,
  USER_CREDITS,
  CREDIT_CREATE_TOOL_LOADED,
  EDUCATION_STATE,
  NPS_SELECTED_MODE_TYPE,
  NPS_FILE_NAME,
  NPS_SURVEY_METHOD,
  EDUCATION_TOOL_COMPLETED_STATUS,
  NPS_PERSONA_LIST,
  NPS_INTERVIEW,
  NPS_REPORT,
  NPS_STATIC_DATA,
  NPS_SELECTED_CONCEPT_INDEX,
} from "../../../../AtomStates";
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
  InterviewXQuickSurveyRequest,
  createToolOnServer,
  updateToolOnServer,
  getFindToolListOnServerSaas,
  EducationToolsRequest,
  InterviewXNPSConceptboardMultimodalRequest,
  UserCreditCheck,
  UserCreditUse,
  UserCreditInfo,
} from "../../../../../utils/indexedDB";
import "react-dropzone-uploader/dist/styles.css";

import { useDynamicViewport } from "../../../../../assets/DynamicViewport";
import OrganismToastPopupQuickSurveyComplete from "../organisms/OrganismToastPopupQuickSurveyComplete";
import MoleculeFileUpload from "../molecules/MoleculeFileUpload";
import MoleculeItemSelectCard from "../../../public/MoleculeItemSelectCard";
import MoleculePersonaSelectCard from "../../../public/MoleculePersonaSelectCard";
import WaitLongLodingBar from "../../../../../components/Charts/WaitLongLodingBar";
import MoleculeGraphChartScale11 from "../molecules/MoleculeGraphChartScale11";
import MoleculeBarChartLikertScale11 from "../molecules/MoleculeBarChartLikertScale11";
import MoleculeConceptSelectCard from "../molecules/MoleculeConceptSelectCard";

const GlobalStyle = createGlobalStyle`
  .markdown-body p {
    margin-bottom: 12px !important;
  }
`;

const PageNps = () => {
  const navigate = useNavigate();

  const [completedStatus, setCompletedStatus] = useAtom(
    EDUCATION_TOOL_COMPLETED_STATUS
  );
  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [eventState] = useAtom(EVENT_STATE);
  const [trialState] = useAtom(TRIAL_STATE);
  const [eventTitle] = useAtom(EVENT_TITLE);
  const [creditCreateTool, setCreditCreateTool] = useAtom(CREDIT_CREATE_TOOL);
  const [creditCreateToolLoaded, setCreditCreateToolLoaded] = useAtom(
    CREDIT_CREATE_TOOL_LOADED
  );
  const [, setUserCredits] = useAtom(USER_CREDITS);
  const [educationState] = useAtom(EDUCATION_STATE);
  const [personaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [quickSurveyProjectDescription, setQuickSurveyProjectDescription] =
    useAtom(QUICK_SURVEY_PROJECT_DESCRIPTION);
  const [npsSelectedConcept, setNPSSelectedConcept] =
    useAtom(NPS_SELECTED_CONCEPT);
  const [npsSelectedModeType, setNpsSelectedModeType] = useAtom(
    NPS_SELECTED_MODE_TYPE
  );
  const [npsInterview, setNpsInterview] = useAtom(NPS_INTERVIEW);
  const [npsReport, setNpsReport] = useAtom(NPS_REPORT);
  const [npsStaticData, setNpsStaticData] = useAtom(NPS_STATIC_DATA);
  const [npsPersonaList, setNpsPersonaList] = useAtom(NPS_PERSONA_LIST);
  const [npsFileName, setNpsFileName] = useAtom(NPS_FILE_NAME);
  const [npsSurveyMethod, setNpsSurveyMethod] = useAtom(NPS_SURVEY_METHOD);
  const [npsSelectedConceptIndex, setNpsSelectedConceptIndex] = useAtom(
    NPS_SELECTED_CONCEPT_INDEX
  );
  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
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
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [selectedConcept, setSelectedConcept] = useState([]);
  const [interviewModeType, setInterviewModeType] = useState("explanation");
  const [isLoadingPreset, setIsLoadingPreset] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [npsConceptDefinition, setNpsConceptDefinition] = useState([]);
  const [npsSavedConceptDefinition, setNpsSavedConceptDefinition] = useState(
    []
  );
  const [showCreatePersonaPopup, setShowCreatePersonaPopup] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [
    npsSelectedConceptDefinitionFinalReport,
    setNpsSelectedConceptDefinitionFinalReport,
  ] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedConceptId, setSelectedConceptId] = useState(null);
  const [selectedPersona, setSelectedPersona] = useState(null);

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
      // 비즈니스 정보 설정 (Step 1)

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
        if (quickSurveyProjectDescription) {
          setProjectDescription(quickSurveyProjectDescription);
        }
        if (npsFileName) {
          setFileNames(npsFileName ?? []);
          setUploadedFiles(npsFileName ?? []);
        }

        if (npsSelectedModeType) {
          setInterviewModeType(npsSelectedModeType);
        }

        if (npsSelectedConcept) {
          setNpsConceptDefinition(npsSelectedConcept);
        }

        if (npsSelectedConceptIndex) {
          setSelectedConcept(npsSelectedConceptIndex);
        }

        if (Object.keys(npsSurveyMethod).length > 0) {
          setNpsSurveyMethod(npsSurveyMethod);
        }
        if (npsPersonaList) {
          setNpsPersonaList(npsPersonaList);
        }

        if (npsReport && npsReport.length > 0) {
          setNpsReport(npsReport);
        }

        if (npsInterview && npsInterview.length > 0) {
          setNpsInterview(npsInterview);
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

        if (npsStaticData && Object.keys(npsStaticData).length > 0) {
          setNpsStaticData(npsStaticData);
          // setNpsStaticDataState(npsStaticData);
        }
      }
      if (completedStatus) {
        setCompletedStatus(true);
      }
    };
    interviewLoading();
    setToolLoading(false);
  }, [toolLoading]);

  // Concept 리스트 가져오기
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

        setNpsConceptDefinition(allItems);
      } catch (error) {
        setNpsConceptDefinition([]); // Set empty array on error
      }
    };

    getAllTargetDiscovery();
  }, [isLoggedIn, projectSaas]);

  const handleCheckboxChange = (ideaId) => {
    if (toolSteps > 1) {
      return;
    }

    setSelectedConcept((prev) => {
      if (prev.includes(ideaId)) {
        // 이미 선택된 아이템을 클릭하면 선택 해제
        const newSelected = [];
        setNPSSelectedConcept([]);
        setNpsSelectedConceptDefinitionFinalReport("");
        return newSelected;
      } else {
        // 새 아이템 선택 시 이전 선택은 모두 지우고 새 아이템만 선택
        const newSelected = [ideaId];
        // 하나의 데이터만 업데이트
        const selectedData = npsConceptDefinition[ideaId];
        setNPSSelectedConcept([selectedData]);
        setNpsSelectedConceptDefinitionFinalReport(
          npsConceptDefinition[ideaId].conceptDefinitionFinalReport
        );
        return newSelected;
      }
    });
  };

  // 다음 단계로 이동하는 함수
  const handleNextStep = (currentStep) => {
    setCompletedSteps([...completedSteps, currentStep]);
    setActiveTab(currentStep + 1);
    setShowPopupError(false);
  };

  const business = {
    business: businessDescription,
    target: project?.projectAnalysis?.target_customer || "",
    business_model: project?.businessModel || "",
    sector: project?.industryType || "",
    country: project?.targetCountry || "",
  };

  const handleSubmitConcept = async () => {
    // 새 AbortController 생성
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    const timeStamp = new Date().getTime();

    handleNextStep(1);
    let response;
    // let responseToolId;
    let conceptBoardSurveyMethod;
    let descriptionSurveyMethod;

    try {
      // 컨셉 보드로 평가받기
      if (interviewModeType === "conceptBoard") {
        // 비즈니스 데이터 추가
        setIsLoading(true);

        const Data = {
          business: businessDescription,
          tool_id: "file_" + timeStamp,
          files: uploadedFiles,
        };

        // setPsstFileId(["file_" + timeStamp]);
        setFileNames(uploadedFiles.map((file) => file.name));

        // setQuickSurveyProjectDescription(projectDescription);

        // API 요청
        let retryCount = 0;
        const maxRetries = 10;

        while (retryCount < maxRetries) {
          try {
            response = await InterviewXNPSConceptboardMultimodalRequest(
              Data,
              isLoggedIn
            );

            if (
              response.response &&
              response.response.nps_conceptboard_multimodal &&
              response.response.nps_conceptboard_multimodal.question &&
              response.response.nps_conceptboard_multimodal.options &&
              response.response.nps_conceptboard_multimodal.follow_up
            ) {
              break; // 올바른 응답 형식이면 루프 종료
            }

            retryCount++;
          } catch (error) {
            retryCount++;
            if (retryCount >= maxRetries) throw error;
          }
        }

        if (retryCount >= maxRetries) {
          throw new Error(
            "올바른 응답을 받지 못했습니다. 최대 재시도 횟수를 초과했습니다."
          );
        }

        // setNpsSurveyMethod(response.response.nps_conceptboard_multimodal);
        setNpsSurveyMethod({
          ...response.response.nps_conceptboard_multimodal,
          options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        });
        // setNpsConceptboardMultimodal(response.response.nps_conceptboard_multimodal);
        conceptBoardSurveyMethod = {
          ...response.response.nps_conceptboard_multimodal,
          options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        };
        //  responseToolId = await createToolOnServer(
        //   {
        //     projectId: project._id,
        //     type: "ix_nps_education",
        //     completedStep: 1,
        //     // npsSurveyMethod: {
        //     //   ...response.response.nps_conceptboard_multimodal,
        //     //   options: ["0","1","2","3","4","5","6","7","8","9","10"]
        //     // },
        //     npsSurveyMethod: conceptBoardSurveyMethod,
        //   },
        //   isLoggedIn
        // );
        // setToolId(responseToolId);
      } else {
        // 설명만으로 평가받기
        setIsLoading(true);

        const Data = {
          type: "ix_nps_description_education",
          business: businessDescription,
          // concept_definition: projectDescription,
          concept_definition: npsSelectedConceptDefinitionFinalReport,
        };

        let retryCount = 0;
        const maxRetries = 10;

        while (retryCount < maxRetries) {
          response = await EducationToolsRequest(Data, isLoggedIn, signal);

          if (
            response.response &&
            response.response.nps_description_education &&
            response.response.nps_description_education.question &&
            response.response.nps_description_education.options &&
            response.response.nps_description_education.follow_up
          ) {
            break; // 올바른 응답 형식이면 루프 종료
          }

          retryCount++;
          if (retryCount >= maxRetries) {
            throw new Error(
              "응답 형식이 올바르지 않습니다. 최대 재시도 횟수를 초과했습니다."
            );
          }
        }

        setNpsSurveyMethod({
          ...response.response.nps_description_education,
          options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        });
        descriptionSurveyMethod = {
          ...response.response.nps_description_education,
          options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        };

        // responseToolId = await createToolOnServer(
        //   {
        //     projectId: project._id,
        //     type: "ix_nps_education",
        //     completedStep: 1,
        //     // npsSurveyMethod: {
        //     //   ...response.response.nps_description_education,
        //     //   options: ["0","1","2","3","4","5","6","7","8","9","10"]
        //     // },
        //     npsSurveyMethod: descriptionSurveyMethod,
        //     selectedConceptIndex:selectedConcept,
        //   },
        //   isLoggedIn
        // );
        // setToolId(responseToolId);
      }

      const favoritePersonaList = personaListSaas
        .filter((persona) => persona.favorite === true)
        .map((persona) => ({
          personaName: persona.personaName,
          age: persona.age,
          gender: persona.gender,
          // lifestyle: persona.job,
          // keywords: persona.keywords,
          // consumptionPattern: persona.consumptionPattern,
          // interests: persona.interests,
        }));

      // 페르소나 생성
      const Data = {
        type: "ix_nps_persona_generation_education",
        business: businessDescription,
        business_model: project?.businessModel || "",
        persona_list: favoritePersonaList,
      };

      let responses = [];

      // 2번의 API 호출을 위한 for문
      for (let apiCall = 0; apiCall < 2; apiCall++) {
        let retryCount = 0;
        const maxRetries = 10;
        let currentResponse;

        while (retryCount < maxRetries) {
          currentResponse = await EducationToolsRequest(
            Data,
            isLoggedIn,
            signal
          );

          if (
            currentResponse.response &&
            Array.isArray(
              currentResponse.response.nps_persona_generation_education
            ) &&
            currentResponse.response.nps_persona_generation_education.length > 0
          ) {
            // 각 응답의 페르소나에 imageKey 추가
            currentResponse.response.nps_persona_generation_education =
              currentResponse.response.nps_persona_generation_education.map(
                (persona) => ({
                  ...persona,
                  imageKey: `persona_${persona.gender === "남성" ? "m" : "f"}_${
                    Math.floor(
                      (persona.age
                        ? parseInt(persona.age.replace("세", ""))
                        : 20) / 10
                    ) * 10
                  }_${String(Math.floor(Math.random() * 10) + 1).padStart(
                    2,
                    "0"
                  )}`,
                })
              );

            responses.push(currentResponse);
            break;
          }

          retryCount++;
          if (retryCount >= maxRetries) {
            throw new Error(
              `응답 형식이 올바르지 않습니다. API 호출 ${
                apiCall + 1
              } 최대 재시도 횟수를 초과했습니다.`
            );
          }
        }
      }

      // 두 응답 결과 합치기
      if (responses.length === 2) {
        response = {
          ...responses[0],
          response: {
            ...responses[0].response,
            nps_persona_generation_education: [
              ...responses[0].response.nps_persona_generation_education,
              ...responses[1].response.nps_persona_generation_education,
            ],
          },
        };
      }

      // 모든 응답을 하나로 합치기

      setNpsPersonaList(response.response.nps_persona_generation_education);
      // setNpsPersonaList([
      //   ...response.response.nps_persona_generation_education,
      //   ...favoritePersonaList
      // ]);

      const favoritePersonas = personaListSaas
        .filter((persona) => persona.favorite === true)
        .map((persona) => ({
          name: persona.personaName,
          age: persona.age,
          gender: persona.gender,
          job: persona.job,
          imageKey: persona.imageKey,
        }));

      setNpsPersonaList([
        ...response.response.nps_persona_generation_education,
        ...favoritePersonas,
      ]);

      const responseToolId = await createToolOnServer(
        {
          projectId: project._id,
          type: "ix_nps_education",
          completedStep: 1,
          // npsSurveyMethod: {
          //   ...response.response.nps_description_education,
          //   options: ["0","1","2","3","4","5","6","7","8","9","10"]
          // },
          // npsSurveyMethod: descriptionSurveyMethod,
          selectedConceptIndex: selectedConcept,
        },
        isLoggedIn
      );
      setToolId(responseToolId);

      await updateToolOnServer(
        responseToolId,
        {
          completedStep: 2,
          npsSelectedConcept: npsSelectedConcept,

          fileName: uploadedFiles.map((file) => ({
            id: "file_" + timeStamp,
            name: fileNames,
          })),
          interviewModeType:
            interviewModeType == "conceptBoard"
              ? "conceptBoard"
              : "explanation",
          npsSurveyMethod:
            interviewModeType == "conceptBoard"
              ? conceptBoardSurveyMethod
              : descriptionSurveyMethod,
          npsPersonaList: [
            ...response.response.nps_persona_generation_education,
            ...favoritePersonas,
          ],
        },
        isLoggedIn
      );

      const creditUsePayload = {
        title: project.projectTitle,
        service_type: "nps",
        target: "",
        state: "use",
        mount: creditCreateTool,
      };

      await UserCreditUse(creditUsePayload, isLoggedIn);

      // 크레딧 사용 후 사용자 정보 새로고침

      const userCreditValue = await UserCreditInfo(isLoggedIn);
      // 전역 상태의 크레딧 정보 업데이트
      setUserCredits(userCreditValue);

      setToolSteps(2);
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
    handleNextStep(2);
    // setToolSteps(2);
    setIsLoadingReport(true);

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    let isBreak = false;
    try {
      let responses = [];
      const chunkSize = 20; // 한 번에 처리할 페르소나 수

      // npsPersonaList를 20개씩 나누어 처리
      for (let i = 0; i < npsPersonaList.length; i += chunkSize) {
        let personaChunk;

        if (isBreak) {
          break;
        }

        if (i == 80) {
          let restPersonas = 0;
          if (npsPersonaList.length > 100) {
            restPersonas = npsPersonaList.length % chunkSize;
            personaChunk = npsPersonaList.slice(
              i,
              i + chunkSize + restPersonas
            );
          } else if (npsPersonaList.length < 100) {
            restPersonas = 100 - npsPersonaList.length;
            personaChunk = npsPersonaList.slice(
              i,
              i + chunkSize - restPersonas
            );
          } else {
            personaChunk = npsPersonaList.slice(i, i + chunkSize);
          }
          isBreak = true;
        } else {
          personaChunk = npsPersonaList.slice(i, i + chunkSize);
        }

        const Data = {
          type: "ix_quick_survey_interview",
          business: business,
          survey_method: {
            ...npsSurveyMethod,
            type: "nps",
          },
          persona_group: personaChunk,
          survey_type: "nps",
        };

        let retryCount = 0;
        const maxRetries = 10;
        let currentResponse;

        while (retryCount < maxRetries) {
          currentResponse = await EducationToolsRequest(
            Data,
            isLoggedIn,
            signal
          );

          if (
            currentResponse.response &&
            Array.isArray(currentResponse.response.quick_survey_interview) &&
            currentResponse.response.quick_survey_interview.length > 0
          ) {
            responses.push(currentResponse);
            break;
          }
          // console.log(`API call chunk ${i/chunkSize + 1}, response:`, currentResponse);

          retryCount++;
          if (retryCount >= maxRetries) {
            throw new Error(
              `응답 형식이 올바르지 않습니다. API 호출 ${
                i / chunkSize + 1
              } 최대 재시도 횟수를 초과했습니다.`
            );
          }
        }
      }

      const combinedInterviews = responses
        .map((response) => {
          // quick_survey_interview가 배열인 경우 각 항목에 대해 처리
          return response.response.quick_survey_interview.map((interview) => {
            const matchedPersona = npsPersonaList.find(
              (persona) => persona.name === interview.persona_name
            );

            if (matchedPersona) {
              const { name, ...personaInfoWithoutName } = matchedPersona;
              return {
                ...interview,
                ...personaInfoWithoutName,
              };
            }
            return interview;
          });
        })
        .flat(); // 중첩 배열을 평탄화

      setNpsInterview(combinedInterviews);

      const reportData = {
        type: "ix_quick_survey_report",
        business: business,
        goal: projectDescription,
        survey_method: {
          ...npsSurveyMethod,
          type: "nps",
        },
        persona_group: npsPersonaList,
        quick_survey_interview: combinedInterviews,
        survey_type: "nps",
      };
      console.log("reportData", reportData);

      let responseReport;
      let reportRetryCount = 0;
      const reportMaxRetries = 10;

      while (reportRetryCount < reportMaxRetries) {
        try {
          responseReport = await InterviewXQuickSurveyRequest(
            reportData,
            isLoggedIn
          );

          console.log("responseReport", responseReport);

          // 응답 형식 검증
          if (
            responseReport.response &&
            responseReport.response.quick_survey_report &&
            responseReport.response.statistics_data
          ) {
            break; // 올바른 응답 형식이면 루프 종료
          }
          reportRetryCount++;
        } catch (error) {
          reportRetryCount++;
          if (reportRetryCount >= reportMaxRetries) throw error;
        }
      }

      if (reportRetryCount >= reportMaxRetries) {
        throw new Error(
          "올바른 응답을 받지 못했습니다. 최대 재시도 횟수를 초과했습니다."
        );
      }

      setNpsReport(responseReport.response.quick_survey_report);

      setNpsStaticData(responseReport.response.statistics_data);

      await updateToolOnServer(
        toolId,
        {
          // quickSurveyInterview: response.response.quick_survey_interview,
          npsInterview: combinedInterviews,
          npsReport: responseReport.response.quick_survey_report,
          npsStaticData: responseReport.response.statistics_data,
          completedStep: 3,
          completedStatus: true,
        },
        isLoggedIn
      );

      setToolSteps(3);
      setCompletedStatus(true);
      setCompletedSteps((prev) => [...prev, 3]);
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

  // 파일 업로드 핸들러
  const handleChangeStatus = ({ meta, file, remove }, status) => {
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize && status !== "removed") {
      setShowPopupFileSize(true);
      remove();
      return;
    }

    // 파일 상태 업데이트
    if (status === "done" || status === "preparing" || status === "uploading") {
      setUploadedFiles((prev) => {
        if (!prev.find((f) => f.name === file.name)) {
          setFileNames((prev) => [...prev, file.name]);
          return [...prev, file];
        }
        return prev;
      });
    } else if (status === "removed") {
      setUploadedFiles((prev) => prev.filter((f) => f.name !== file.name));
      setFileNames((prev) => prev.filter((name) => name !== file.name));
    }

    // 파일 크기를 KB 또는 MB 단위로 변환
    const size = file.size;
    const sizeStr =
      size > 1024 * 1024
        ? `${(size / (1024 * 1024)).toFixed(1)}MB`
        : `${(size / 1024).toFixed(1)}KB`;

    // setTimeout을 사용하여 DOM이 업데이트된 후 실행
    setTimeout(() => {
      const containers = document.querySelectorAll(".dzu-previewContainer");
      containers.forEach((container) => {
        if (!container.dataset.filename) {
          container.dataset.filename = file.name;
          container.dataset.size = sizeStr;

          // 이미지 파일인 경우 PDF처럼 파일명 요소 추가
          if (file.type.startsWith("image/")) {
            // 기존 dzu-previewFileName이 없는 경우에만 추가
            if (!container.querySelector(".dzu-previewFileName")) {
              const nameSpan = document.createElement("span");
              nameSpan.className = "dzu-previewFileName";
              nameSpan.textContent = `${file.name}, ${sizeStr}`;

              // 컨테이너의 첫 번째 자식으로 추가
              if (container.firstChild) {
                container.insertBefore(nameSpan, container.firstChild);
              } else {
                container.appendChild(nameSpan);
              }
            }
          }
        }
      });
    }, 0);
  };

  const abortControllerRef = useRef(null);

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      // console.log("currentUrl", currentUrl);
      if (currentUrl.toLowerCase().includes("nps")) {
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
                    컨셉 입력
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
                    NPS 분석
                  </Body1>
                </div>
              </TabButtonType5>
            </TabWrapType5>

            {activeTab === 1 && (
              <TabContent5>
                <>
                  <div className="title">
                    <H3 color="gray800">Upload Your Concept </H3>
                    <Body3 color="gray800">
                      페르소나의 추천 의향을 시뮬레이션할 컨셉 자료를
                      선택해주세요
                      <Title style={{ marginBottom: "18px" }}></Title>
                    </Body3>
                  </div>

                  <div className="content">
                    <TabContent5Item required>
                      {/* <Title>
                        <Body1 color="gray700">
                          Quick Survey로 확인하고 싶은 내용이 무엇인가요?
                        </Body1>
                      </Title> */}

                      {/* <TabContent5Item> */}
                      <InterviewModeSelection style={{ marginTop: "-20px" }}>
                        <InterviewModeCard
                          isActive={interviewModeType === "explanation"}
                          // onClick={() => {
                          //   setInterviewModeType("explanation");
                          //   // if (
                          //   //   !quickSurveyPresetData ||
                          //   //   quickSurveyPresetData.length === 0
                          //   // ) {
                          //   //   handlePresetPersona();
                          //   // }
                          // }}

                          onClick={() => {
                            if (toolSteps >= 1 || isLoadingPreset) return; // 여기서 조건 체크
                            setInterviewModeType("explanation");
                          }}
                          disabled={toolSteps >= 1 || isLoadingPreset}
                        >
                          <CardWrapper>
                            <CheckboxWrapper>
                              <CheckCircle
                                as="input"
                                type="radio"
                                id="explanation"
                                name="interviewMode"
                                checked={interviewModeType === "explanation"}
                                onChange={() => {}} // 빈 함수로 변경
                              />
                            </CheckboxWrapper>
                            <CardContent>
                              <div>
                                <Body2
                                  color={
                                    interviewModeType === "explanation"
                                      ? "primary"
                                      : "gray800"
                                  }
                                  style={{ fontWeight: "700" }}
                                >
                                  설명만으로 평가받기
                                </Body2>
                                <Body3
                                  style={{ marginTop: "0px" }}
                                  color={
                                    interviewModeType === "explanation"
                                      ? "gray800"
                                      : "gray500"
                                  }
                                >
                                  작성된 컨셉 정의서 중 하나를 선택하여
                                  페르소나의 추천 가능성을 시뮬레이션해보세요.
                                </Body3>
                              </div>
                            </CardContent>
                          </CardWrapper>
                        </InterviewModeCard>
                        <InterviewModeCard
                          isActive={interviewModeType === "conceptBoard"}
                          onClick={() => {
                            if (toolSteps >= 1 || isLoadingPreset) return; // 여기서 조건 체크
                            setInterviewModeType("conceptBoard");
                          }}
                          disabled={toolSteps >= 1 || isLoadingPreset}
                        >
                          <CardWrapper>
                            <CheckboxWrapper>
                              <CheckCircle
                                as="input"
                                type="radio"
                                id="conceptBoard"
                                name="interviewMode"
                                checked={interviewModeType === "conceptBoard"}
                                onChange={() => {
                                  if (toolSteps >= 2 || isLoadingPreset) return; // onChange에도 조건 체크
                                  setInterviewModeType("conceptBoard");
                                }}
                                disabled={toolSteps >= 2 || isLoadingPreset}
                              />
                            </CheckboxWrapper>
                            <CardContent>
                              <div>
                                <Body2
                                  color={
                                    interviewModeType === "conceptBoard"
                                      ? "primary"
                                      : "gray800"
                                  }
                                  style={{ fontWeight: "700" }}
                                >
                                  컨셉 보드로 평가받기
                                </Body2>
                                <Body3
                                  style={{ marginTop: "0px" }}
                                  color={
                                    interviewModeType === "conceptBoard"
                                      ? "gray800"
                                      : "gray500"
                                  }
                                >
                                  아이디어가 담긴 컨셉보드를 업로드하고, 타겟
                                  페르소나의 추천 의향을 평가받아보세요.
                                  {/* 원하는 질문을 직접 입력하여 Persona에게
                                      <br/>
                                      답을 얻을 수 있습니다. */}
                                </Body3>
                              </div>
                            </CardContent>
                          </CardWrapper>
                        </InterviewModeCard>
                      </InterviewModeSelection>

                      {interviewModeType === "conceptBoard" && (
                        <div className="content">
                          {/* <div className="title"> 
                            <Body1 color="gray700"> 
                            NPS 평가를 받을 컨셉보드를 업로드해주세요
                            </Body1>
                          </div> */}

                          <MoleculeFileUpload
                            fileNames={fileNames ?? []}
                            handleChangeStatus={handleChangeStatus}
                            toolSteps={toolSteps}
                          />
                        </div>
                      )}
                    </TabContent5Item>

                    {interviewModeType === "explanation" && (
                      <>
                        <div
                          className="title"
                          style={{
                            textAlign: "left",
                            marginBottom: "-20px",
                            marginTop: "-30px",
                          }}
                        >
                          <Body1 color="gray700">
                            NPS 평가를 받을 컨셉정의서를 선택해주세요.{" "}
                          </Body1>
                        </div>
                        {npsConceptDefinition.length === 0 ? (
                          <BoxWrap NoData style={{ height: "300px" }}>
                            <img src={images.ListFillPrimary} alt="" />
                            <Body2 color="gray700" align="center !important">
                              컨셉정의서 툴을 먼저 완료해주세요​
                            </Body2>
                          </BoxWrap>
                        ) : (
                          <>
                            {npsConceptDefinition.map((idea, index) => (
                              <MoleculeConceptSelectCard
                                style
                                FlexStart
                                key={index}
                                id={index}
                                title={` ${idea.personaTitle} ( ${
                                  idea.updateDate.split(":")[0]
                                }:${idea.updateDate.split(":")[1]}  )`}
                                isSelected={selectedConcept.includes(index)}
                                onShowPopup={(show, conceptId) => {
                                  setShowPopup(show);
                                  setSelectedConceptId(conceptId);
                                }}
                                onSelect={() => handleCheckboxChange(index)}
                              />
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </div>

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
                      <Button
                        Other
                        Primary
                        Fill
                        Round
                        onClick={handleSubmitConcept}
                        disabled={
                          interviewModeType === "conceptBoard"
                            ? toolSteps >= 1 || !uploadedFiles.length > 0
                            : !selectedConcept.length > 0 || toolSteps >= 1
                        }
                      >
                        다음
                      </Button>
                    </>
                  )}
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
                    <AtomPersonaLoader message="NPS 평가에 참여할 페르소나를 모집하고 있어요 (100명 내외)" />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Participating Persona</H3>
                      <Body3 color="gray800">
                        NPS 시뮬레이션 대상 페르소나를 확인해주세요
                      </Body3>
                    </div>

                    <div className="content">
                      <ListBoxGroup>
                        <li>
                          <Body2 color="gray500">설문 문항</Body2>
                          <Body2 color="gray800">
                            제시된 컨셉을 다른 사람에게 추천할 가능성은 얼마나
                            되시나요?
                          </Body2>
                        </li>

                        <li>
                          <Body2 color="gray500">페르소나 선택</Body2>
                          <Body2 color="gray800">
                            Favorite 페르소나에 기반한 유사 패널 100명을
                            무작위로 모집해 진행합니다.
                          </Body2>
                        </li>
                      </ListBoxGroup>

                      <div className="content">
                        <TabContent5Item style={{ marginTop: "20px" }}>
                          <div className="title">
                            <Body1
                              color="gray800"
                              style={{ textAlign: "left" }}
                            >
                              Favorite 페르소나를 확인하세요
                            </Body1>
                          </div>

                          {personaListSaas.filter(
                            (item) => item.favorite === true
                          ).length >= 20 ? (
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
                        </TabContent5Item>
                      </div>
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
                          handleSubmitReport();
                        }}
                        disabled={toolSteps >= 3}
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
                      <AtomPersonaLoader
                        message={
                          <span>참여 페르소나가 NPS 평가를 하고 있어요</span>
                        }
                      />
                    </div>
                  ) : (
                    <>
                      <BgBoxItem primaryLightest>
                        <H3 color="gray800">NPS 결과 분석</H3>
                        <Body3 color="gray800">
                          페르소나의 점수와 의견을 종합하여 결과를 정리했습니다.
                        </Body3>
                      </BgBoxItem>

                      <InsightAnalysis>
                        <div className="title">
                          <div>
                            <TabWrapType4>
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
                            </TabWrapType4>
                          </div>
                          <Button Primary onClick={handleEnterInterviewRoom}>
                            <img
                              src={images.ReportSearch}
                              alt="인터뷰 스크립트 보기"
                            />
                            응답자 의견 확인
                          </Button>
                        </div>
                      </InsightAnalysis>

                      <InsightAnalysis>
                        <div className="title">
                          <li>
                            <H4 color="gray800">
                              제시된 컨셉을 다른 사람에게 추천할 가능성은 얼마나
                              되시나요?
                            </H4>
                          </li>
                        </div>

                        {activeDesignTab === "emotion" && (
                          <>
                            <MoleculeBarChartLikertScale11
                              onOptionSelect={setSelectedOption}
                              onOptionSelectIndex={setSelectedOptionIndex}
                              onBarClick={() => setShowToast(true)}
                            />

                            {/* Insight 섹션 */}
                            <div className="content">
                              {npsReport?.[0] && (
                                <InsightContainer>
                                  <InsightSection>
                                    <InsightLabel color="gray700">
                                      총평
                                    </InsightLabel>
                                    <InsightContent color="gray700">
                                      <>
                                        <div>
                                          {
                                            npsReport[0]?.total_insight
                                              ?.nps_score_interpretation
                                          }
                                        </div>
                                        <br />
                                        <div>
                                          {
                                            npsReport[0]?.total_insight
                                              ?.group_response_analysis
                                          }
                                        </div>
                                        <br />
                                        <div>
                                          {
                                            npsReport[0]?.total_insight
                                              ?.enhancement_and_improvement_insight
                                          }
                                        </div>
                                      </>
                                    </InsightContent>
                                  </InsightSection>

                                  <InsightSection>
                                    <InsightLabel color="gray700">
                                      성별 의견 정리
                                    </InsightLabel>
                                    <InsightContent color="gray700">
                                      <>
                                        {
                                          npsReport[0]?.gender_insight
                                            ?.statistic
                                        }
                                        <br />
                                        <br />
                                        {npsReport[0]?.gender_insight?.insight}
                                      </>
                                    </InsightContent>
                                  </InsightSection>

                                  <InsightSection>
                                    <InsightLabel color="gray700">
                                      연령별 의견 정리
                                    </InsightLabel>
                                    <InsightContent color="gray700">
                                      <>
                                        {npsReport[0].age_insight.statistic}
                                        <br />
                                        <br />
                                        {npsReport[0].age_insight.insight}
                                      </>
                                    </InsightContent>
                                  </InsightSection>

                                  <InsightSection>
                                    <InsightLabel color="gray700">
                                      페르소나별 의견 정리
                                    </InsightLabel>
                                    <InsightContent color="gray700">
                                      <>
                                        {npsReport[0].persona_insight.statistic}
                                        <br />
                                        <br />
                                        {npsReport[0].persona_insight.insight}
                                      </>
                                    </InsightContent>
                                  </InsightSection>
                                </InsightContainer>
                              )}
                            </div>
                          </>
                        )}
                        {activeDesignTab === "scale" && (
                          <>
                            <MoleculeGraphChartScale11 />
                          </>
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

      {showPopup && (
        <>
          <StyledInterviewPopup>
            <div
              style={{
                maxWidth: "700px", // 기존 450px에서 변경 (원하는 크기로 조정)
                width: "100%",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: "20px",
                padding: "32px 32px",
                borderRadius: "15px",
                background: "#FFFFFF",
                boxShadow: "4px 4px 30px rgba(0, 0, 0, 0.15)",
              }}
            >
              <div className="header">
                <H4
                  style={{
                    fontSize: "16px",
                    marginBottom: "16px",
                  }}
                >
                  {npsConceptDefinition[selectedConceptId]?.personaTitle ||
                    "컨셉 정보"}{" "}
                  대상 컨셉정의 내용 보기
                  <span className="close" onClick={() => setShowPopup(false)} />
                </H4>
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#E0E4EB",
                    marginBottom: "16px",
                  }}
                />
              </div>

              <div
                className="content"
                style={{
                  maxHeight: "500px", // 기존 400px에서 변경 (원하는 높이로 조정)
                  overflowY: "auto",
                }}
              >
                <div>
                  <div
                    className="markdown-body core-value-section"
                    style={{
                      color: palette.gray800,
                      textAlign: "left",
                      "& h1, & h2, & h3, & h4, & h5, & h6": {
                        marginBottom: "0px",
                        marginTop: "0px",
                      },
                      "& h1 + p, & h2 + p, & h3 + p, & h4 + p, & h5 + p, & h6 + p":
                        {
                          marginTop: "12px",
                        },
                    }}
                  >
                    <Markdown>
                      {npsConceptDefinition[selectedConceptId]
                        ?.conceptDefinitionFinalReport || "내용 없음"}
                    </Markdown>
                  </div>
                </div>
              </div>
            </div>
          </StyledInterviewPopup>
        </>
      )}

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
            title="NPS "
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
            title="NPS "
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
            title="NPS "
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

export default PageNps;

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
  gap: 32px;
  border: 1px solid #e0e4e8;
  border-radius: 10px;
  padding: 16px;
`;

const InsightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-bottom: 1px solid #e0e4e8;
  padding-bottom: 32px; // 원하는 값으로 변경

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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled(Body2)`
  margin-top: 12px;
  text-align: center;
`;

const StyledInterviewPopup = styled(InterviewPopup)`
  .markdown-body {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 0px;
      margin-bottom: 12px;
      color: ${palette.gray800};
      font-weight: 600;
    }
    p,
    li,
    span {
      line-height: 1.55; /* 원하는 행간 값으로 통일 */
    }
    p {
      margin-bottom: 8px;
    }
    h1 {
      font-size: 24px;
    }
    h2 {
      font-size: 20px;
    }
    h3 {
      font-size: 18px;
    }
  }
  /* 핵심 가치 섹션의 마지막 p 태그에 마진 추가 */
  .core-value-section h2:nth-of-type(4) ~ p:last-of-type {
    margin-bottom: 12px !important;
  }

  /* 4번 영역과 5번 영역 사이의 간격 명시적 지정 */
  h2:nth-of-type(4) ~ h2:nth-of-type(5) {
    margin-top: 20px; /* 4번 영역 하단과 5번 영역 상단 사이 간격 */
  }
`;
