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
  PERSONA_LIST_SAAS,
  KANO_MODEL_IDEA_GENERATION,
  KANO_MODEL_SELECTED_IDEA,
  KANO_MODEL_IDEA_GENERATION_NAME,
  KANO_MODEL_PRODUCT_ANALYSIS,
  KANO_MODEL_CLUSTERING,
  KANO_MODEL_EVALUATION,
  KANO_MODEL_CLUSTERING_NAME,
  KANO_MODEL_GRAPH_DATA,
  KANO_MODEL_REPORT_DATA,
  EVENT_STATE,
  TRIAL_STATE,
  EVENT_TITLE,
  CREDIT_CREATE_TOOL_HIGH,
  EDUCATION_STATE,
  USER_CREDITS,
  CREDIT_CREATE_TOOL_LOADED,
  EDUCATION_TOOL_COMPLETED_STATUS,
  KANO_MODEL_INSIGHT,
  KANO_MODEL_SELECTED_IDEA_ID,
  KANO_MODEL_MODIFIED_IDEA_DATA,
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
  EducationToolsRequest,
  getFindToolListOnServerSaas,
  UserCreditCheck,
  UserCreditUse,
  UserCreditInfo,
} from "../../../../../utils/indexedDB";
import "react-dropzone-uploader/dist/styles.css";
import { useDynamicViewport } from "../../../../../assets/DynamicViewport";
import OrganismToastPopupQuickSurveyComplete from "../organisms/OrganismToastPopupQuickSurveyComplete";
import MolculeQuickSurveyPopup from "../molecules/MolculeQuickSurveyPopup";
import MoleculeDeleteForm from "../../../../../pages/Education_Tool/public/MoleculeDeleteForm";
import OrganismToastPopupKanoOpinions from "../organisms/OrganismToastPopupKanoOpinions";
import MoleculePersonaSelectCard from "../../../public/MoleculePersonaSelectCard";
import MoleculeItemSelectCard from "../../../public/MoleculeItemSelectCard";
import KanoModelGraph from "../../../../../components/Charts/KanoModelGraph";
import { MoleculeIdeaData } from "../molecules/MoleculeIdeaData";
import MoleculeIdeaSelectForm from "../molecules/MoleculeIdeaSelectForm";
import { DetachedBindMode } from "three/src/constants.js";

// Helper functions moved from KanoModelGraph.jsx
const transformKanoData = (kanoModelGraphData) => {
  if (
    !kanoModelGraphData ||
    typeof kanoModelGraphData !== "object" ||
    Array.isArray(kanoModelGraphData)
  ) {
    return [];
  }

  return Object.entries(kanoModelGraphData).map(([title, data], index) => {
    const xValue = data.CSP * 100;
    const yValue = (data.CSM + 1) * 100;
    const indexCode = String.fromCharCode(65 + index);

    return {
      x: xValue,
      y: yValue,
      title: title,
      indexCode: indexCode,
      size: 24,
    };
  });
};

const transformAverageKanoData = (kanoModelGraphData) => {
  if (
    !kanoModelGraphData ||
    typeof kanoModelGraphData !== "object" ||
    Array.isArray(kanoModelGraphData)
  ) {
    return { avgCSP: 0, avgCSM: 0 };
  }

  const dataEntries = Object.values(kanoModelGraphData);
  const numberOfEntries = dataEntries.length;

  if (numberOfEntries === 0) {
    return { avgCSP: 0, avgCSM: 0 };
  }

  const sumCSP = dataEntries.reduce((sum, data) => sum + data.CSP, 0);
  const sumCSM = dataEntries.reduce((sum, data) => sum + data.CSM, 0);

  const avgCSP = (sumCSP / numberOfEntries) * 100;
  const avgCSM = (sumCSM / numberOfEntries + 1) * 100;

  return { avgCSP, avgCSM };
};

const rescaleCoordinate = (coord, average) => {
  if (average === 0) {
    return 50 + (coord / 100) * 50;
  } else if (average === 100) {
    return (coord / 100) * 50;
  }

  if (coord <= average) {
    return (coord / average) * 50;
  } else {
    return 50 + ((coord - average) / (100 - average)) * 50;
  }
};

const rescaleDataPoints = (dataPoints, averages) => {
  const { avgCSP, avgCSM } = averages;
  const clampedAvgCSP = Math.max(0, Math.min(100, avgCSP));
  const clampedAvgCSM = Math.max(0, Math.min(100, avgCSM));

  return dataPoints.map((point) => ({
    ...point,
    x: rescaleCoordinate(point.x, clampedAvgCSP),
    y: rescaleCoordinate(point.y, clampedAvgCSM),
  }));
};

const getQuadrantName = (x, y) => {
  if (x > 50 && y > 50) return "one_dimensional";
  if (x <= 50 && y > 50) return "attractive";
  if (x > 50 && y <= 50) return "must_be";
  if (x <= 50 && y <= 50) return "indifferent";
  return ""; // Should ideally not happen
};

const runKanoEvaluation = async (
  kanoType,
  businessAnalysis,
  personaGroup,
  kanoModelClustering,
  isLoggedIn,
  signal
) => {
  const allResponses = [];
  for (let i = 0; i < 5; i++) {
    const startIndex = i * 4;
    const endIndex = Math.min(startIndex + 4, personaGroup.length);
    if (startIndex >= endIndex) continue;

    const currentPersonaGroup = personaGroup.slice(startIndex, endIndex);

    const evaluteData = {
      type: "ix_kano_model_evaluation_education",
      business_analysis: businessAnalysis,
      persona_group: currentPersonaGroup,
      idea_list: kanoModelClustering,
      kano_type: kanoType,
    };

    let responseEvalute = await EducationToolsRequest(
      evaluteData,
      isLoggedIn,
      signal
    );

    let evaluteRetryCount = 0;
    const evaluteMaxRetries = 10;

    const isResponseInvalid = (res) => {
      if (!res?.response?.kano_model_evaluation_education) return true;
      const evaluations = res.response.kano_model_evaluation_education;
      if (!Array.isArray(evaluations) || evaluations.length === 0) return true;

      for (const persona of evaluations) {
        if (
          !persona.name ||
          !Array.isArray(persona.answers) ||
          persona.answers.length === 0
        )
          return true;
        for (const answer of persona.answers) {
          if (!answer.idea_title) return true;
          if (kanoType === "attractive") {
            if (
              typeof answer.attractive_answer !== "number" ||
              !answer.attractive_reason
            )
              return true;
          } else if (kanoType === "essential") {
            if (
              typeof answer.essential_answer !== "number" ||
              !answer.essential_reason
            )
              return true;
          }
        }
      }
      return false;
    };

    while (
      evaluteRetryCount < evaluteMaxRetries &&
      isResponseInvalid(responseEvalute)
    ) {
      responseEvalute = await EducationToolsRequest(
        evaluteData,
        isLoggedIn,
        signal
      );
      evaluteRetryCount++;
    }

    if (evaluteRetryCount >= evaluteMaxRetries) {
      throw new Error(
        `Failed to get valid response for kano_type: ${kanoType}`
      );
    }

    allResponses.push(
      ...responseEvalute.response.kano_model_evaluation_education
    );
  }
  return allResponses;
};

const PageKanoModel = () => {
  const navigate = useNavigate();

  const [kanoModelInsight, setKanoModelInsight] = useAtom(KANO_MODEL_INSIGHT);
  const [completedStatus, setCompletedStatus] = useAtom(
    EDUCATION_TOOL_COMPLETED_STATUS
  );
  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [eventState] = useAtom(EVENT_STATE);
  const [trialState] = useAtom(TRIAL_STATE);
  const [eventTitle] = useAtom(EVENT_TITLE);
  const [creditCreateToolHigh] = useAtom(CREDIT_CREATE_TOOL_HIGH);
  const [creditCreateToolLoaded, setCreditCreateToolLoaded] = useAtom(
    CREDIT_CREATE_TOOL_LOADED
  );
  const [educationState] = useAtom(EDUCATION_STATE);
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [toolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [personaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const [kanoModelIdeaGeneration, setKanoModelIdeaGeneration] = useAtom(
    KANO_MODEL_IDEA_GENERATION
  );

  const [selectedKanoModelIdea, setSelectedKanoModelIdea] = useAtom(
    KANO_MODEL_SELECTED_IDEA
  );
  const [kanoModelProductAnalysis, setKanoModelProductAnalysis] = useAtom(
    KANO_MODEL_PRODUCT_ANALYSIS
  );
  const [kanoModelClustering, setKanoModelClustering] = useAtom(
    KANO_MODEL_CLUSTERING
  );
  const [kanoModelEvaluation, setKanoModelEvaluation] = useAtom(
    KANO_MODEL_EVALUATION
  );
  const [kanoModelClusteringName, setKanoModelClusteringName] = useAtom(
    KANO_MODEL_CLUSTERING_NAME
  );
  const [kanoModelGraphData, setKanoModelGraphData] = useAtom(
    KANO_MODEL_GRAPH_DATA
  );
  const [kanoModelReportData, setKanoModelReportData] = useAtom(
    KANO_MODEL_REPORT_DATA
  );
  const [kanoModelModifiedIdeaData, setKanoModelModifiedIdeaData] = useAtom(
    KANO_MODEL_MODIFIED_IDEA_DATA
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
  const [isLoadingPreset, setIsLoadingPreset] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [medianValues, setMedianValues] = useState({ x: 0, y: 0 });

  // 팝업 관련 상태들
  const [showReasonPopup, setShowReasonPopup] = useState(false);
  const [selectedIdeaForReason, setSelectedIdeaForReason] = useState("");
  const [personaOpinions, setPersonaOpinions] = useState([]);

  // 새로운 상태 변수들
  const [selectedIdeaDataId, setSelectedIdeaDataId] = useState(null);
  const [ideaDataItems, setIdeaDataItems] = useState([]);
  const [selectedSubIdeas, setSelectedSubIdeas] = useState([]);
  const [subIdeaList, setSubIdeaList] = useState([]);
  // 전역 선택 상태 관리 - 각 테마별 선택된 아이디어들
  const [globalSelectedIdeas, setGlobalSelectedIdeas] = useState({});
  // 수정된 아이디어 데이터를 저장하는 상태
  const [modifiedIdeaData, setModifiedIdeaData] = useState({});
  // AI 다듬기 로딩 상태
  const [aiRefineLoading, setAiRefineLoading] = useState({});
  // 20개 선택 완료 팝업 상태
  const [showMaxSelectionPopup, setShowMaxSelectionPopup] = useState(false);

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기
  const [selectedIdea, setSelectedIdea] = useAtom(KANO_MODEL_SELECTED_IDEA_ID);
  // 상태 추가
  const [showCreatePersonaPopup, setShowCreatePersonaPopup] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);

  const project = projectSaas;

  // 선택된 아이디어의 테마별 아이디어 리스트 / 중 평가 대상으로 선택된 아이디어 리스트
  const [kanoModelIdeaList, setKanoModelIdeaList] = useState([]);
  const [kanoModelSelectedIdeaList, setKanoModelSelectedIdeaList] = useState(
    []
  );

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
        if (selectedKanoModelIdea) {
          setSelectedKanoModelIdea(selectedKanoModelIdea);
        }
        if (kanoModelClustering) {
          setKanoModelClustering(kanoModelClustering);
        }
        if (kanoModelClusteringName) {
          setKanoModelClusteringName(kanoModelClusteringName);
        }
        if (kanoModelEvaluation && kanoModelEvaluation.length > 0) {
          setKanoModelEvaluation(kanoModelEvaluation);
        }
        if (kanoModelProductAnalysis && kanoModelProductAnalysis.length > 0) {
          setKanoModelProductAnalysis(kanoModelProductAnalysis);
        }
        if (kanoModelGraphData && kanoModelGraphData.length > 0) {
          // console.log(
          //   "🚀 ~ interviewLoading ~ kanoModelGraphData:",
          //   kanoModelGraphData
          // );

          setKanoModelGraphData(kanoModelGraphData);
        }
        if (kanoModelReportData && kanoModelReportData.medianValues) {
          setMedianValues(kanoModelReportData.medianValues);
        }
        if (completedStatus) {
          setCompletedStatus(true);
        }
        if (kanoModelModifiedIdeaData) {
          setModifiedIdeaData(kanoModelModifiedIdeaData);
        }

        // 활성 탭 설정 (기본값 1)

        if (toolStep === undefined || toolStep === 1) {
          setActiveTab(1);
          setToolSteps(0);
          setCompletedSteps([]);
        } else if (completedStatus) {
          // 완료된 경우 4번 탭으로 설정
          setActiveTab(4);
          setToolSteps(4);
          setCompletedSteps([1, 2, 3, 4]);
        } else {
          setActiveTab(Math.min(toolStep, 4));
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
  useEffect(() => {
    const getAllTargetDiscovery = async () => {
      try {
        let page = 1;
        const size = 10;
        let allItems = [];

        const response = await getFindToolListOnServerSaas(
          projectSaas?._id ?? "",
          "ix_idea_generation_education",
          isLoggedIn
        );

        const newItems = (response || []).filter(
          (item) =>
            item?.type === "ix_idea_generation_education" &&
            item?.completedStep === 3
        );

        allItems = [...allItems, ...newItems];

        setKanoModelIdeaGeneration(allItems);
      } catch (error) {
        setKanoModelIdeaGeneration([]); // Set empty array on error
      }
    };

    getAllTargetDiscovery();
  }, [isLoggedIn, projectSaas]);

  // kanoModelIdeaGeneration이 업데이트될 때 setIdeaListData 호출
  useEffect(() => {
    if (selectedIdea && kanoModelIdeaGeneration.length > 0) {
      setIdeaListData();
    }
  }, [kanoModelIdeaGeneration, selectedIdea]);

  // subIdeaList가 변경될 때 modifiedIdeaData 업데이트
  useEffect(() => {
    if (selectedIdeaDataId && subIdeaList.length > 0) {
      const newModifiedData = {
        ...modifiedIdeaData,
        [selectedIdeaDataId]: [...subIdeaList],
      };
      setModifiedIdeaData(newModifiedData);
      setKanoModelModifiedIdeaData(newModifiedData); // 전역 상태도 동기화

      // ideaDataItems의 numberOfIdeas 업데이트
      const ideaIndex = parseInt(selectedIdeaDataId.split("-")[1]);
      setIdeaDataItems((prevItems) =>
        prevItems.map((item, idx) =>
          idx === ideaIndex
            ? { ...item, numberOfIdeas: subIdeaList.length }
            : item
        )
      );
    }
  }, [subIdeaList, selectedIdeaDataId]);

  // 현재 편집 중인 데이터를 저장하는 함수
  const saveCurrentIdeaData = () => {
    if (selectedIdeaDataId && subIdeaList.length > 0) {
      setModifiedIdeaData((prev) => ({
        ...prev,
        [selectedIdeaDataId]: [...subIdeaList],
      }));
    }
  };

  // MoleculeIdeaData 선택 시 하위 아이디어 업데이트
  const handleIdeaDataSelect = (ideaId) => {
    // 현재 편집 중인 데이터를 먼저 저장
    saveCurrentIdeaData();

    setSelectedIdeaDataId(ideaId);

    // 선택된 아이디어의 인덱스 찾기
    const ideaIndex = parseInt(ideaId.split("-")[1]);

    if (kanoModelIdeaGeneration.length > 0) {
      const selectedItem = kanoModelIdeaGeneration.find(
        (item) => item._id === selectedIdea
      );
      if (selectedItem?.ideaGenerationMandalArtData?.[ideaIndex]) {
        // 수정된 데이터가 있으면 그것을 사용, 없으면 원본 데이터 사용
        let subIdeas;
        if (modifiedIdeaData[ideaId]) {
          subIdeas = modifiedIdeaData[ideaId];
        } else {
          subIdeas =
            selectedItem.ideaGenerationMandalArtData[
              ideaIndex
            ]?.detailed_execution_ideas?.map((idea, idx) => ({
              title: idea.idea_title || `아이디어 ${idx + 1}`,
              description:
                idea.idea_description || `아이디어 ${idx + 1}에 대한 설명`,
              isCompleted: true,
            })) || [];
        }
        setSubIdeaList(subIdeas);

        if (kanoModelClustering.length > 0) {
          // 이전 선택 상태 복원
          const mainTheme =
            selectedItem?.ideaGenerationSelectedStartPosition?.[ideaIndex]
              ?.main_theme;

          // 2) kanoModelClustering(=ideaList)에서 main_theme가 같은 클러스터 찾기
          const ideaList = kanoModelClustering || []; // 외부에서 주입되는 리스트 가정
          const matchedCluster = ideaList.find(
            (cluster) => cluster?.main_theme === mainTheme
          );

          // 3) 해당 클러스터의 ideas 배열에서 title만 추출하되, 수정된 데이터가 있는 경우 현재 subIdeas의 title과 매칭
          const previousSelection =
            matchedCluster?.ideas
              ?.map((it) => {
                // 수정된 데이터에서 매칭되는 title 찾기
                const currentIdea = subIdeas.find(
                  (sub) => sub.title === it?.title
                );
                return currentIdea ? currentIdea.title : it?.title;
              })
              ?.filter(Boolean) || [];

          setSelectedSubIdeas(previousSelection);
        } else {
          // kanoModelClustering이 없을 경우 globalSelectedIdeas에서 가져오기
          const ideaKey = `idea-${ideaIndex}`;
          const previousSelection = globalSelectedIdeas[ideaKey] || [];
          // 수정된 데이터에 맞춰 선택 상태 조정
          const adjustedSelection = previousSelection.filter((title) =>
            subIdeas.some((idea) => idea.title === title)
          );
          setSelectedSubIdeas(adjustedSelection);
          console.log(
            "🚀 ~ handleIdeaDataSelect ~ adjustedSelection from globalSelectedIdeas:",
            adjustedSelection
          );
        }
      }
    }
  };

  const setIdeaListData = () => {
    // 아이디어 데이터 아이템 초기화 (8개 테마 데이터)
    console.log(
      "🚀 ~ setIdeaListData ~ kanoModelIdeaGeneration:",
      kanoModelIdeaGeneration
    );
    if (kanoModelIdeaGeneration.length > 0) {
      const selectedItem = kanoModelIdeaGeneration.find(
        (item) => item._id === selectedIdea
      );
      if (selectedItem?.ideaGenerationSelectedStartPosition) {
        const ideaList = kanoModelClustering || []; // Tool이 저장되었다면 선택된 아이템 불러오기
        const ideaItems = selectedItem.ideaGenerationSelectedStartPosition.map(
          (item, index) => {
            const ideaKey = `idea-${index}`;
            // 수정된 데이터가 있으면 그 개수를 사용, 없으면 원본 데이터 개수 사용
            const numberOfIdeas = modifiedIdeaData[ideaKey]
              ? modifiedIdeaData[ideaKey].length
              : selectedItem.ideaGenerationAdditionalData[index].priority_ideas
                  .length;

            return {
              id: ideaKey,
              title: item.main_theme || `테마 ${index + 1}`,
              selectedCount:
                ideaList.find(
                  (cluster) => cluster?.main_theme === item.main_theme
                )?.ideas?.length || 0, // 초기값
              numberOfIdeas: numberOfIdeas,
            };
          }
        );
        setIdeaDataItems(ideaItems);
        console.log("🚀 ~ setIdeaListData ~ ideaItems:", ideaItems);

        // 첫 번째 아이템을 기본 선택
        let subIdeas = [];
        if (ideaItems.length > 0) {
          setSelectedIdeaDataId(ideaItems[0].id);
          // 수정된 데이터가 있으면 그것을 사용, 없으면 원본 데이터 사용
          if (modifiedIdeaData[ideaItems[0].id]) {
            subIdeas = modifiedIdeaData[ideaItems[0].id];
          } else {
            subIdeas =
              selectedItem.ideaGenerationMandalArtData[0]?.detailed_execution_ideas?.map(
                (idea, idx) => ({
                  title: idea.idea_title || `아이디어 ${idx + 1}`,
                  description:
                    idea.idea_description || `아이디어 ${idx + 1}에 대한 설명`,
                  isCompleted: true,
                })
              ) || [];
          }
          setSubIdeaList(subIdeas);
          console.log("🚀 ~ setIdeaListData ~ subIdeas:", subIdeas);
        }

        if (kanoModelClustering.length > 0) {
          // 이전 선택 상태 복원
          const mainTheme =
            selectedItem?.ideaGenerationSelectedStartPosition?.[0]?.main_theme;

          // 2) kanoModelClustering(=ideaList)에서 main_theme가 같은 클러스터 찾기
          const ideaList = kanoModelClustering || []; // 외부에서 주입되는 리스트 가정
          const matchedCluster = ideaList.find(
            (cluster) => cluster?.main_theme === mainTheme
          );

          // 3) 해당 클러스터의 ideas 배열에서 title만 추출하되, 수정된 데이터가 있는 경우 현재 subIdeas의 title과 매칭
          const previousSelection =
            matchedCluster?.ideas
              ?.map((it) => {
                // 수정된 데이터에서 매칭되는 title 찾기
                const currentIdea = subIdeas.find(
                  (sub) => sub.title === it?.title
                );
                return currentIdea ? currentIdea.title : it?.title;
              })
              ?.filter(Boolean) || [];

          setSelectedSubIdeas(previousSelection);
        }
      }
    }
  };

  const handleCheckboxChange = (ideaId) => {
    setSelectedIdea(kanoModelIdeaGeneration[ideaId]._id); // 항상 하나만 선택되도록 배열에 하나만 저장
  };

  // 다음 단계로 이동하는 함수
  const handleNextStep = (currentStep) => {
    setCompletedSteps([...completedSteps, currentStep]);
    setActiveTab(currentStep + 1);
    setShowPopupError(false);
  };

  const setIdeaSelectionList = async () => {
    // 선택된 데이터 업데이트
    const selectedIdeaData = kanoModelIdeaGeneration.find(
      (item) => item._id === selectedIdea
    );
    console.log(
      "🚀 ~ setIdeaSelectionList ~ selectedIdeaData:",
      selectedIdeaData
    );

    // 선택된 아이디어의 main theme 8개와 각각의 ideas 8개
    const listOfSelectedIdea =
      selectedIdeaData.ideaGenerationSelectedStartPosition.map(
        (startPosition, index) => ({
          main_theme: startPosition.main_theme,
          ideas: selectedIdeaData.ideaGenerationAdditionalData[
            index
          ].priority_ideas.map((idea) => ({
            title: idea.title,
            description: idea.description,
          })),
        })
      );

    // 평가 항목 선택 단계에서 체크한 아이디어 리스트
    const base = selectedIdeaData.ideaGenerationSelectedStartPosition.map(
      (startPosition, index) => ({
        main_theme: startPosition.main_theme,
        ideas: [],
      })
    );

    setKanoModelIdeaList(listOfSelectedIdea);
    setKanoModelSelectedIdeaList(base);

    handleNextStep(1);
  };

  const business = {
    business_description: businessDescription,
    business_model: project?.businessModel || "",
    target_country: project?.targetCountry || "",
  };

  const handleSubmitIdeaList = async () => {
    // 새 AbortController 생성
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    // handleNextStep(1);
    setIsLoading(true);

    const ideaList =
      selectedKanoModelIdea?.map((idea) => idea?.ideaGenerationMandalArtData) ||
      [];

    const flattenedIdeaList =
      ideaList?.flatMap((idea) =>
        idea?.flatMap((subIdea) =>
          subIdea?.detailed_execution_ideas.map((detail) => detail?.idea_title)
        )
      ) || [];

    try {
      const clusteringData = {
        type: "ix_kano_model_clustering_education",
        business: {
          business: businessDescription,
          business_model: project?.businessModel || "",
          sector: project?.industryType || "",
        },
        idea_list: flattenedIdeaList,
      };

      let responseReport = await EducationToolsRequest(
        clusteringData,
        isLoggedIn,
        signal
      );

      let reportRetryCount = 0;
      const reportMaxRetries = 10;

      while (
        reportRetryCount < reportMaxRetries &&
        !responseReport &&
        !responseReport?.response &&
        !responseReport?.response?.kano_model_evaluation_education &&
        !responseReport?.response?.kano_model_evaluation_education.attractive &&
        responseReport?.response?.kano_model_evaluation_education.attractive
          .length === 0 &&
        !responseReport?.response?.kano_model_evaluation_education.must_be &&
        responseReport?.response?.kano_model_evaluation_education.must_be
          .length === 0 &&
        !responseReport?.response?.kano_model_evaluation_education
          .one_dimensional &&
        responseReport?.response?.kano_model_evaluation_education
          .one_dimensional.length === 0 &&
        !responseReport?.response?.kano_model_evaluation_education
          .indifferent &&
        responseReport?.response?.kano_model_evaluation_education.indifferent
          .length === 0
      ) {
        try {
          responseReport = await EducationToolsRequest(
            clusteringData,
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
      setKanoModelClustering(
        responseReport.response.kano_model_evaluation_education
      );
      setKanoModelClusteringName(
        Object.values(
          responseReport.response.kano_model_evaluation_education || {}
        ).reduce((acc, category) => {
          // 각 카테고리의 아이템들에서 name만 추출하여 배열에 추가
          return [...acc, ...category.map((item) => item.name)];
        }, [])
      );

      const responseToolId = await createToolOnServer(
        {
          type: "ix_kano_model_education",
          projectId: project._id,
          completedStep: 1,
          kanoModelSelectedIdea: selectedKanoModelIdea,
          kanoModelClustering:
            responseReport.response.kano_model_evaluation_education,
          kanoModelClusteringName: Object.values(
            responseReport.response.kano_model_evaluation_education || {}
          ).reduce((acc, category) => {
            // 각 카테고리의 아이템들에서 name만 추출하여 배열에 추가
            return [...acc, ...category.map((item) => item.name)];
          }, []),
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

  const handleSubmitClustering = async () => {
    // 현재 편집 중인 데이터 마지막으로 저장
    saveCurrentIdeaData();

    // 새 AbortController 생성
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    handleNextStep(2);
    setIsLoading(true);

    const ideaList = Object.entries(globalSelectedIdeas).map(
      ([ideaKey, selectedTitles]) => {
        // idea-N에서 N 추출
        const ideaIndex = parseInt(ideaKey.split("-")[1]);
        console.log("🚀 ~ handleSubmitClustering ~ ideaIndex:", ideaIndex);

        // 수정된 데이터 또는 원본 데이터에서 아이디어들 가져오기
        let currentThemeIdeas;
        if (modifiedIdeaData[ideaKey]) {
          // 수정된 데이터가 있으면 그것을 사용
          currentThemeIdeas = {
            main_theme: kanoModelIdeaList[ideaIndex].main_theme,
            ideas: modifiedIdeaData[ideaKey].map((idea) => ({
              title: idea.title,
              description: idea.description,
            })),
          };
        } else {
          // 원본 데이터 사용
          currentThemeIdeas = kanoModelIdeaList[ideaIndex];
        }

        console.log(
          "🚀 ~ handleSubmitClustering ~ currentThemeIdeas:",
          currentThemeIdeas
        );

        // 선택된 제목들에 따라 아이디어 객체 필터링
        const selectedIdeas = selectedTitles
          .map((selectedTitle) => {
            return currentThemeIdeas.ideas.find(
              (idea) => idea.title === selectedTitle
            );
          })
          .filter(Boolean); // undefined 값 제거

        return {
          main_theme: currentThemeIdeas.main_theme,
          ideas: selectedIdeas,
        };
      }
    );

    console.log("🚀 ~ handleSubmitClustering ~ ideaList:", ideaList);

    const flattenedIdeaList = ideaList.flatMap((theme) =>
      theme.ideas.map((idea) => idea.title)
    );
    try {
      setKanoModelClustering(ideaList);
      setKanoModelClusteringName(flattenedIdeaList);

      const responseToolId = await createToolOnServer(
        {
          type: "ix_kano_model_education",
          projectId: project._id,
          completedStep: 2,
          kanoModelSelectedIdea: selectedKanoModelIdea,
          kanoModelClustering: ideaList,
          kanoModelClusteringName: flattenedIdeaList,
          selectedIdeaGenerationId: selectedIdea,
          modifiedIdeaData: modifiedIdeaData, // 수정된 아이디어 데이터 저장
        },
        isLoggedIn
      );

      setToolId(responseToolId);

      // 전역 상태에 수정된 아이디어 데이터 저장
      setKanoModelModifiedIdeaData(modifiedIdeaData);

      // 크레딧이 사용 가능한 상태면 사용 API 호출
      const creditUsePayload = {
        title: project.projectTitle,
        service_type: "카노 모델",
        target: "",
        state: "use",
        mount: creditCreateToolHigh,
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
    // 새 AbortController 생성
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    await updateToolOnServer(
      toolId,
      {
        completedStep: 3,
      },
      isLoggedIn
    );

    handleNextStep(3);
    setIsLoadingReport(true);

    try {
      const Data = {
        type: "ix_kano_model_business_analysis_ccei",
        business: business,
      };

      let response = await EducationToolsRequest(Data, isLoggedIn, signal);

      setKanoModelProductAnalysis(
        response.response.kano_model_business_analysis
      );

      const persona_group = personaListSaas
        .filter((persona) => persona?.favorite === true)
        .map((persona) => ({
          personaName: persona.personaName,
          // personaCharacteristics: persona.personaCharacteristics,
          // type: persona.type,
          age: persona.age,
          gender: persona.gender,
          // job: persona.job,
          // keywords: persona.keywords,
          // userExperience: persona.userExperience,
          // consumptionPattern: persona.consumptionPattern,
          // interests: persona.interests,
          // lifestyle: persona.lifestyle,
        }));

      console.log(
        "🚀 ~ handleSubmitReport ~ persona_group:",
        kanoModelClustering
      );

      const attractiveEvaluations = await runKanoEvaluation(
        "attractive",
        response.response.kano_model_business_analysis,
        persona_group,
        kanoModelClustering,
        isLoggedIn,
        signal
      );

      const essentialEvaluations = await runKanoEvaluation(
        "essential",
        response.response.kano_model_business_analysis,
        persona_group,
        kanoModelClustering,
        isLoggedIn,
        signal
      );

      // // 아이디어 제목들 추출
      // const ideaTitles = kanoModelClustering.map(cluster =>
      //   cluster.ideas?.map(idea => idea.title) || []
      // ).flat();

      const ideaEvaluationMap = new Map();

      attractiveEvaluations.flat().forEach((persona) => {
        persona.answers.forEach((answer) => {
          if (kanoModelClusteringName.includes(answer.idea_title)) {
            const key = answer.idea_title;
            if (!ideaEvaluationMap.has(key)) {
              ideaEvaluationMap.set(key, {});
            }
            const ideaPersonas = ideaEvaluationMap.get(key);
            if (!ideaPersonas[persona.name]) {
              ideaPersonas[persona.name] = {};
            }
            ideaPersonas[persona.name].attractive_answer =
              answer.attractive_answer;
            ideaPersonas[persona.name].attractive_reason =
              answer.attractive_reason;
          }
        });
      });

      essentialEvaluations.flat().forEach((persona) => {
        persona.answers.forEach((answer) => {
          if (kanoModelClusteringName.includes(answer.idea_title)) {
            const key = answer.idea_title;
            if (!ideaEvaluationMap.has(key)) {
              ideaEvaluationMap.set(key, {});
            }
            const ideaPersonas = ideaEvaluationMap.get(key);
            if (!ideaPersonas[persona.name]) {
              ideaPersonas[persona.name] = {};
            }
            ideaPersonas[persona.name].essential_answer =
              answer.essential_answer;
            ideaPersonas[persona.name].essential_reason =
              answer.essential_reason;
          }
        });
      });

      const flattenedEvaluation = [];
      ideaEvaluationMap.forEach((personas, idea_title) => {
        Object.keys(personas).forEach((persona_name) => {
          flattenedEvaluation.push({
            idea_title: idea_title.trim(),
            persona_name,
            ...personas[persona_name],
          });
        });
      });

      setKanoModelEvaluation(flattenedEvaluation);

      const ideasData = flattenedEvaluation.reduce((acc, curr) => {
        const ideaTitle = curr.idea_title.trim();
        if (!acc[ideaTitle]) {
          acc[ideaTitle] = { attractive: [], essential: [] };
        }
        if (typeof curr.attractive_answer === "number") {
          acc[ideaTitle].attractive.push(curr.attractive_answer);
        }
        if (typeof curr.essential_answer === "number") {
          acc[ideaTitle].essential.push(curr.essential_answer);
        }
        return acc;
      }, {});

      const graphData = Object.entries(ideasData).reduce(
        (acc, [idea, data]) => {
          const attractiveAvg =
            data.attractive.length > 0
              ? data.attractive.reduce((a, b) => a + b, 0) /
                data.attractive.length
              : 0;
          const essentialAvg =
            data.essential.length > 0
              ? data.essential.reduce((a, b) => a + b, 0) /
                data.essential.length
              : 0;
          acc[idea] = {
            y: parseFloat(attractiveAvg.toFixed(2)),
            x: parseFloat(essentialAvg.toFixed(2)),
          };
          return acc;
        },
        {}
      );

      setKanoModelGraphData(graphData);

      const getQuadrantNameByMedians = (y, x, medianY, medianX) => {
        if (y >= medianY && x >= medianX) return "one_dimensional";
        if (y >= medianY && x < medianX) return "attractive";
        if (y < medianY && x >= medianX) return "must_be";
        if (y < medianY && x < medianX) return "indifferent";
        return "indifferent";
      };

      const xValues = Object.values(graphData)
        .map((d) => d.x)
        .sort((a, b) => a - b);
      const yValues = Object.values(graphData)
        .map((d) => d.y)
        .sort((a, b) => a - b);

      const getMedian = (arr) => {
        const mid = Math.floor(arr.length / 2);
        return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
      };

      const medianX = getMedian(xValues);
      const medianY = getMedian(yValues);
      setMedianValues({ x: medianX, y: medianY });

      const calculatedGroupedLegendData = {
        one_dimensional: [],
        attractive: [],
        must_be: [],
        indifferent: [],
      };

      Object.entries(graphData).forEach(([title, data]) => {
        const quadrantName = getQuadrantNameByMedians(
          data.y,
          data.x,
          medianY,
          medianX
        );
        if (quadrantName && calculatedGroupedLegendData[quadrantName]) {
          calculatedGroupedLegendData[quadrantName].push(title);
        }
      });

      setKanoModelReportData(calculatedGroupedLegendData);

      const clusteringData = {
        type: "ix_kano_model_clustering_education",
        kano_model_evaluation_result: calculatedGroupedLegendData,
      };

      let responseReport = await EducationToolsRequest(
        clusteringData,
        isLoggedIn,
        signal
      );

      let reportRetryCount = 0;
      const reportMaxRetries = 10;

      while (
        reportRetryCount < reportMaxRetries &&
        (!responseReport ||
          !responseReport?.response ||
          !responseReport?.response?.kano_model_insight ||
          !responseReport?.response?.kano_model_insight.total_summary ||
          !responseReport?.response?.kano_model_insight.detailed_analysis ||
          !responseReport?.response?.kano_model_insight.total_evaluation)
      ) {
        try {
          responseReport = await EducationToolsRequest(
            clusteringData,
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
      setKanoModelInsight(responseReport.response.kano_model_insight);

      const reportDataWithMedians = {
        ...calculatedGroupedLegendData,
        medianValues: { x: medianX, y: medianY },
      };

      await updateToolOnServer(
        toolId,
        {
          kanoModelProductAnalysis:
            response.response.kano_model_business_analysis,
          kanoModelEvaluation: flattenedEvaluation,
          kanoModelGraphData: graphData,
          kanoModelReportData: reportDataWithMedians,
          kanoModelInsight: responseReport.response.kano_model_insight,
          modifiedIdeaData: modifiedIdeaData, // 수정된 아이디어 데이터 저장
          completedStep: 4,
          completedStatus: true,
        },
        isLoggedIn
      );

      // 전역 상태에 수정된 아이디어 데이터 저장
      setKanoModelModifiedIdeaData(modifiedIdeaData);

      setCompletedStatus(true);

      setToolSteps(4);
      setCompletedSteps([...completedSteps, 4]);
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

  const abortControllerRef = useRef(null);

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      // console.log("currentUrl", currentUrl);
      if (currentUrl.toLowerCase().includes("kanomodel")) {
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

  const handleLegendItemClick = (ideaTitle) => {
    const opinions = kanoModelEvaluation
      .filter((evaluation) => evaluation.idea_title === ideaTitle)
      .map((evaluation) => {
        const personaInfo = personaListSaas.find(
          (p) => p.personaName === evaluation.persona_name
        );
        return {
          persona_name: evaluation.persona_name,
          gender: personaInfo?.gender,
          age: personaInfo?.age,
          imageKey: personaInfo?.imageKey,
          attractive_reason: evaluation.attractive_reason,
          essential_reason: evaluation.essential_reason,
        };
      })
      .filter(Boolean);

    setPersonaOpinions(opinions);
    setSelectedIdeaForReason(ideaTitle);
    setShowReasonPopup(true);
  };

  const handleConfirmCredit = async () => {
    setShowCreatePersonaPopup(false);
  };

  // AI 다듬기 기능
  const handleAiRefine = async (ideaIndex) => {
    if (
      !subIdeaList[ideaIndex] ||
      !subIdeaList[ideaIndex].title ||
      !subIdeaList[ideaIndex].description
    )
      return;

    // 새 AbortController 생성
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    // 로딩 상태 시작
    setAiRefineLoading((prev) => ({ ...prev, [ideaIndex]: true }));

    try {
      const selectedIdea = subIdeaList[ideaIndex];
      const apiData = {
        type: "ix_kano_model_refining_description_ccei",
        business: businessDescription,
        idea: {
          title: selectedIdea.title,
          description: selectedIdea.description,
        },
      };

      const response = await EducationToolsRequest(apiData, isLoggedIn, signal);

      if (response?.response?.refining_description) {
        // 해당 아이디어의 설명을 업데이트
        const newSubIdeaList = [...subIdeaList];
        newSubIdeaList[ideaIndex] = {
          ...newSubIdeaList[ideaIndex],
          description: response.response.refining_description,
        };
        setSubIdeaList(newSubIdeaList);
      }
    } catch (error) {
      console.error("AI 다듬기 실패:", error);
      // 에러 처리 - 필요시 팝업 등으로 사용자에게 알림
    } finally {
      // 로딩 상태 종료
      setAiRefineLoading((prev) => ({ ...prev, [ideaIndex]: false }));
    }
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
                Num4
                isActive={activeTab >= 1}
                onClick={() => setActiveTab(1)}
                disabled={isLoading || isLoadingReport}
              >
                <span>01</span>
                <div className="text">
                  <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                    아이디어 선택
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                Num4
                isActive={activeTab >= 2}
                onClick={() => completedSteps.includes(1) && setActiveTab(2)}
                disabled={
                  !completedSteps.includes(1) || isLoading || isLoadingReport
                }
              >
                <span>02</span>
                <div className="text">
                  <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    평가 항목 선택
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                Num4
                isActive={activeTab >= 3}
                onClick={() => completedSteps.includes(2) && setActiveTab(3)}
                disabled={
                  !completedSteps.includes(2) || isLoading || isLoadingReport
                }
              >
                <span>03</span>
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    페르소나 확인
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                Num4
                isActive={activeTab >= 4}
                onClick={() =>
                  (completedSteps.includes(3) ||
                    completedSteps.includes(4) ||
                    completedStatus) &&
                  setActiveTab(4)
                }
                disabled={
                  !(completedSteps.includes(4) || completedStatus) ||
                  isLoading ||
                  isLoadingReport
                }
              >
                <span>04</span>
                <div className="text">
                  <Body1 color={activeTab >= 4 ? "gray700" : "gray300"}>
                    결과 및 인사이트
                  </Body1>
                </div>
              </TabButtonType5>
            </TabWrapType5>

            {activeTab === 1 && (
              <TabContent5>
                <>
                  <div className="title">
                    <H3 color="gray800">Idea Screening</H3>
                    <Body3 color="gray800">
                      발상한 아이디어 결과 중에서 Kano Model 평가 대상으로
                      고려할 아이디어를 선정해주세요{" "}
                    </Body3>
                  </div>

                  <div className="content">
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
                        <AtomPersonaLoader message="평가를 위해 발산된 아이디어를 정리하고 있어요" />
                      </div>
                    ) : (
                      <>
                        {kanoModelIdeaGeneration.length === 0 ? (
                          <BoxWrap
                            NoData
                            style={{ height: "300px", cursor: "pointer" }}
                            onClick={() => navigate("/IdeaGeneration")}
                          >
                            <img src={images.ListFillPrimary} alt="" />
                            <Body2 color="gray700" align="center !important">
                              아이디어 발산 툴을 먼저 완료해주세요​
                            </Body2>
                            {/* <Button
                              Medium
                              Outline
                              Fill
                              onClick={() => navigate("/IdeaGeneration")}
                            >
                              <Caption1 color="gray700">
                                아이디어 가져오기
                              </Caption1>
                            </Button> */}
                          </BoxWrap>
                        ) : (
                          <>
                            <div
                              className="title"
                              style={{
                                textAlign: "left",
                                marginBottom: "-20px",
                              }}
                            ></div>
                            {kanoModelIdeaGeneration.map((idea, index) => (
                              <MoleculeItemSelectCard
                                FlexStart
                                key={index}
                                id={index}
                                title={`${
                                  idea.ideaGenerationSelectedStartPosition[0]
                                    .main_theme
                                } 외 7개 아이디어 발산 (${
                                  idea.updateDate.split(":")[0]
                                }:${idea.updateDate.split(":")[1]})`}
                                isSelected={idea._id === selectedIdea}
                                onSelect={() => handleCheckboxChange(index)}
                                disabled={completedSteps.includes(1)}
                              />
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <>
                    {/* 버튼들을 content div 바깥으로 이동 */}
                    {kanoModelIdeaGeneration.length > 0 && !isLoading && (
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          Other
                          Primary
                          Fill
                          Round
                          onClick={() => {
                            setIdeaSelectionList();
                          }}
                          disabled={
                            selectedIdea === null ||
                            isLoading ||
                            completedSteps.includes(1)
                          }
                        >
                          다음
                        </Button>
                      </div>
                    )}
                  </>
                </>
              </TabContent5>
            )}

            {activeTab === 2 && completedSteps.includes(1) && (
              <TabContent5>
                <>
                  <div className="title">
                    <H3 color="gray800">Idea Selection</H3>
                    <Body3 color="gray800">
                      Kano Model 평가할 아이디어를 선택하세요
                    </Body3>
                  </div>

                  <div className="title" style={{ marginBottom: "-48px", width: "820px", textAlign: "left" }}>
                  <Body1 color="gray700">
                  평가할 아이디어 20개를 선택해 주세요. ({Object.values(globalSelectedIdeas).flat().length}/20)
                  </Body1>

                  </div>
                  <div className="content">
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
                        <AtomPersonaLoader message="평가를 위해 발산된 아이디어를 정리하고 있어요" />
                      </div>
                    ) : (
                      <>
                        {/* MoleculeIdeaData 컴포넌트 */}
                        <MoleculeIdeaData
                          items={ideaDataItems}
                          selectedItemId={selectedIdeaDataId}
                          onSelect={handleIdeaDataSelect}
                          badgeTotal={subIdeaList.length}
                        />

                        {/* MoleculeIdeaSelectForm 컴포넌트 */}
                        {selectedIdeaDataId && subIdeaList.length > 0 && (
                          <div style={{ marginTop: "-8px" }}>
                            <MoleculeIdeaSelectForm
                              ideas={subIdeaList}
                              setIdeas={setSubIdeaList}
                              selectedIdeas={selectedSubIdeas}
                              onSelectionChange={(ideaTitle) => {
                                !completedSteps.includes(2) &&
                                  setSelectedSubIdeas((prev) => {
                                    const isCurrentlySelected =
                                      prev.includes(ideaTitle);

                                    // 전체 선택된 아이디어 개수 계산
                                    const totalSelected =
                                      Object.values(globalSelectedIdeas).flat()
                                        .length;

                                    // 선택 해제하는 경우
                                    if (isCurrentlySelected) {
                                      const newSelected = prev.filter(
                                        (title) => title !== ideaTitle
                                      );

                                      // 전역 상태 업데이트
                                      setGlobalSelectedIdeas((prevGlobal) => ({
                                        ...prevGlobal,
                                        [selectedIdeaDataId]: newSelected,
                                      }));

                                      // MoleculeIdeaData의 카운트 업데이트
                                      const ideaIndex = parseInt(
                                        selectedIdeaDataId.split("-")[1]
                                      );
                                      setIdeaDataItems((prevItems) =>
                                        prevItems.map((item, idx) =>
                                          idx === ideaIndex
                                            ? {
                                                ...item,
                                                selectedCount:
                                                  newSelected.length,
                                              }
                                            : item
                                        )
                                      );

                                      return newSelected;
                                    }

                                    // 선택하는 경우 - 20개 제한 확인
                                    if (totalSelected >= 20) {
                                      setShowMaxSelectionPopup(true);
                                      return prev;
                                    }

                                    const newSelected = [...prev, ideaTitle];

                                    // 전역 상태 업데이트
                                    setGlobalSelectedIdeas((prevGlobal) => ({
                                      ...prevGlobal,
                                      [selectedIdeaDataId]: newSelected,
                                    }));

                                    // MoleculeIdeaData의 카운트 업데이트
                                    const ideaIndex = parseInt(
                                      selectedIdeaDataId.split("-")[1]
                                    );
                                    setIdeaDataItems((prevItems) =>
                                      prevItems.map((item, idx) =>
                                        idx === ideaIndex
                                          ? {
                                              ...item,
                                              selectedCount: newSelected.length,
                                            }
                                          : item
                                      )
                                    );

                                    return newSelected;
                                  });
                                console.log(
                                  "🚀 ~ onSelectionChange ~ globalSelectedIdeas:",
                                  globalSelectedIdeas
                                );
                              }}
                              onAiRefine={handleAiRefine}
                              aiRefineLoading={aiRefineLoading}
                              readOnly={completedSteps.includes(2)}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {!isLoading && (
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        justifyContent: "flex-end",
                        marginTop: "20px",
                      }}
                    >
                      <Button
                        Other
                        Primary
                        Fill
                        Round
                        onClick={() => {
                          handleSubmitClustering();
                        }}
                        disabled={
                          Object.values(globalSelectedIdeas).flat().length >
                            20 ||
                          Object.values(globalSelectedIdeas).flat().length <
                            5 ||
                          isLoading ||
                          completedSteps.includes(2)
                        }
                      >
                        아이디어 방향성으로 전환
                      </Button>
                    </div>
                  )}
                </>
              </TabContent5>
            )}

            {activeTab === 3 && completedSteps.includes(2) && (
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
                        아이디어에 대한 기대와 반응을 평가할 페르소나를
                        선택해주세요
                      </Body3>
                    </div>

                    <div className="content">
                      <ListBoxGroup>
                        <li>
                          <Body2
                            color="gray500"
                            style={{
                              alignSelf: "flex-start",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              whiteSpace: "nowrap",
                            }}
                          >
                            평가할 아이디어 리스트
                          </Body2>
                          <div
                            style={{
                              whiteSpace: "normal",
                              wordBreak: "keep-all",
                              wordWrap: "break-word",
                              overflow: "visible",
                              maxWidth: "100%",
                              textAlign: "left",
                              marginLeft: "50px",
                              marginTop: "-2px",
                              paddingTop: "0",
                              display: "block",
                              alignSelf: "flex-start",
                            }}
                          >
                            {kanoModelClusteringName.map((idea, index) => (
                              <span
                                key={index}
                                style={{
                                  color: "gray800",
                                  marginBottom: "4px",
                                }}
                              >
                                {index < 5
                                  ? // 처음 5개 항목은 상세 정보 표시
                                    idea +
                                    (index <
                                    Math.min(
                                      4,
                                      kanoModelClusteringName.length - 1
                                    )
                                      ? ", "
                                      : "")
                                  : index === 5
                                  ? // 6번째 항목에서 외 N개 표시
                                    ` 외 ${
                                      kanoModelClusteringName.length - 5
                                    }개`
                                  : null}
                              </span>
                            ))}
                          </div>
                        </li>
                      </ListBoxGroup>

                      <div className="title">
                        <Body1
                          color="gray800"
                          style={{ textAlign: "left", marginBottom: "-20px" }}
                        >
                          Kano Model 평가 참여 페르소나 (AI 페르소나
                          Favorite에서 설정 가능)
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
                        onClick={handleSubmitReport}
                        disabled={
                          toolSteps >= 4 ||
                          personaListSaas.filter(
                            (item) => item.favorite === true
                          ).length < 20
                        }
                      >
                        Kano Model 평가 받기
                      </Button>
                    )}
                  </>
                )}
              </TabContent5>
            )}

            {activeTab === 4 &&
              (completedSteps.includes(3) ||
                completedSteps.includes(4) ||
                completedStatus) && (
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
                      <AtomPersonaLoader message="페르소나들이 아이디어를 평가하고 있어요 " />
                    </div>
                  ) : (
                    <>
                      <BgBoxItem primaryLightest>
                        <H3 color="gray800">KANO Model 결과</H3>
                        <Body3 color="gray800">
                          아이디어별 만족 유형을 분석한 결과입니다. 페르소나가
                          느낀 매력, 기본, 무관심 요소를 확인해보세요
                        </Body3>
                      </BgBoxItem>

                      <InsightAnalysis>
                        <KanoModelGraph
                          medianValues={medianValues}
                          onLegendItemClick={handleLegendItemClick}
                        />
                      </InsightAnalysis>

                      <IdeaContainer>
                        <IdeaBox>
                          <IdeaTitle>총평</IdeaTitle>
                          <IdeaContent>
                            <IdeaText>
                              {kanoModelInsight?.total_summary}
                            </IdeaText>
                          </IdeaContent>

                          <Divider />
                          <IdeaTitle>상세분석</IdeaTitle>
                          <IdeaContent>
                            <IdeaText>
                              {kanoModelInsight?.detailed_analysis?.must_be}
                            </IdeaText>
                            <IdeaText>
                              {
                                kanoModelInsight?.detailed_analysis
                                  ?.one_dimensional
                              }
                            </IdeaText>
                            <IdeaText>
                              {kanoModelInsight?.detailed_analysis?.attractive}
                            </IdeaText>
                            <IdeaText>
                              {kanoModelInsight?.detailed_analysis?.indifferent}
                            </IdeaText>
                          </IdeaContent>

                          <Divider />
                          <IdeaTitle>전략적 제언</IdeaTitle>
                          <IdeaContent>
                            <IdeaText>
                              {kanoModelInsight?.total_evaluation}
                            </IdeaText>
                          </IdeaContent>
                        </IdeaBox>
                      </IdeaContainer>
                    </>
                  )}
                  {completedStatus && (
                    <Button
                      Primary
                      Edit
                      Large
                      style={{ color: "#666666", border: "1px solid #E0E4EB" }}
                      onClick={() => navigate("/Tool")}
                    >
                      리서치 툴 리스트 바로가기
                    </Button>
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

            {showReasonPopup && (
              <OrganismToastPopupKanoOpinions
                isActive={showReasonPopup}
                onClose={() => setShowReasonPopup(false)}
                title={`${selectedIdeaForReason}에 대한 페르소나 의견`}
                opinions={personaOpinions}
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
            title="카노 모델"
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
            title="카노 모델"
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
            title="카노 모델"
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

      {showMaxSelectionPopup && (
        <PopupWrap
          Warning
          title="최대 20개까지만 선택할 수 있습니다."
          message="다음 단계를 진행하세요."
          buttonType="Outline"
          confirmText="확인"
          isModal={false}
          onConfirm={() => setShowMaxSelectionPopup(false)}
        />
      )}
    </>
  );
};

export default PageKanoModel;

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

const ValueMap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .mermaid {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    width: 100%;
    height: auto;
  }

  .mermaid-legend {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    max-width: 170px;
    width: 100%;

    ul {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;

      > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
      }
    }

    span {
      width: 16px;
      height: 16px;
      border-radius: 2px;

      &.must-fix {
        background-color: #d3e2ff;
      }

      &.niche-pain {
        background-color: #e0e4eb;
      }

      &.key-strengths {
        background-color: #e9f1ff;
      }

      &.low-impact {
        background-color: ${palette.gray100};
      }
    }
  }

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 12px;

    div {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    span {
      width: 16px;
      height: 16px;
      border-radius: 50%;

      &.must-fix {
        background-color: #d3e2ff;
      }

      &.niche-pain {
        background-color: #e0e4eb;
      }

      &.key-strengths {
        background-color: #e9f1ff;
      }

      &.low-impact {
        background-color: ${palette.gray100};
      }
    }
  }
`;

export const DiagramContainer = styled.div`
  width: 70%;
  min-width: 600px;
  min-height: 600px;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
`;

const IdeaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 20px;
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

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${palette.outlineGray};
`;
