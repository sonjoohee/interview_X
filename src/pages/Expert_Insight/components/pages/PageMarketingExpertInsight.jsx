import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css, ThemeProvider } from "styled-components";
import theme from "../../../../assets/styles/Theme";
import { palette } from "../../../../assets/styles/Palette";
import { useAtom } from "jotai";
import image from "../../../../assets/styles/Images";
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  APPROACH_PATH,
  STRATEGY_REPORT_DATA,
  SELECTED_ADDITIONAL_KEYWORD,
  ADDITIONAL_REPORT_DATA,
  CONVERSATION_STAGE,
  CONVERSATION,
  IS_LOGGED_IN,
  CONVERSATION_ID,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  SELECTED_EXPERT_LIST,
  IS_LOADING,
  SAVED_TIMESTAMP,
  IS_EXPERT_INSIGHT_ACCESSIBLE,
  SELECTED_POC_OPTIONS,
  SELCTED_POC_TARGET,
  RECOMMENDED_TARGET_DATA,
  POC_DETAIL_REPORT_DATA,
  POC_PERSONA_LIST,
  IDEA_FEATURE_DATA,
  IDEA_REQUIREMENT_DATA,
  IDEA_LIST,
  IDEA_GROUP,
  IDEA_PRIORITY,
  IDEA_FEATURE_DATA_TEMP,
  IDEA_REQUIREMENT_DATA_TEMP,
  GROWTH_HACKER_REPORT_DATA,
  BUTTON_STATE,
  GROWTH_HACKER_DETAIL_REPORT_DATA,
  KPI_QUESTION_LIST,
  PRICE_SCRAP_DATA,
  PRICE_REPORT_DATA,
  PRICE_PRODUCT,
  PRICE_SELECTED_PRODUCT_SEGMENTATION,
  PRICE_PRODUCT_SEGMENTATION,
  CASE_REPORT_DATA,
  CASE_HASH_TAG,
  SURVEY_GUIDELINE_DETAIL_REPORT_DATA,
  SURVEY_GUIDELINE_REPORT_DATA,
  SURVEY_GOAL_SUGGESTION_LIST,
  SURVEY_GOAL_FIXED,
  SURVEY_QUESTION_LIST,
  BM_SELECTED_PROBLEM_OPTIONS,
  BM_OR_LEAN,
  BM_BM_AUTO_REPORT_DATA,
  BM_BM_ADS_REPORT_DATA,
  BM_BM_CUSTOM_REPORT_DATA,
  BM_LEAN_AUTO_REPORT_DATA,
  BM_LEAN_ADS_REPORT_DATA,
  BM_LEAN_CUSTOM_REPORT_DATA,
  BM_MODEL_SUGGESTION_REPORT_DATA,
  BM_QUESTION_LIST,
  IDEA_MIRO_STATE,
  IS_MARKETING,
  MARKETING_MBTI_RESULT,
  MARKETING_RESEARCH_REPORT_DATA,
  MARKETING_BM_REPORT_DATA,
  MARKETING_CUSTOMER_DATA,
  MARKETING_SELECTED_CUSTOMER,
  MARKETING_FINAL_CUSTOMER,
  MARKETING_FINAL_REPORT_DATA,
  GROWTH_HACKER_RECOMMENDED_SOLUTION,
  GROWTH_HACKER_SELECTED_SOLUTION,
  STRATEGY_CONSULTANT_REPORT_DATA,
} from "../../../AtomStates";

import { getConversationByIdFromIndexedDB } from "../../../../utils/indexedDB";
import { createChatOnServer } from "../../../../utils/indexedDB"; // 서버와 대화 ID 생성 함수
import MoleculeStrategyButton from "../molecules/MoleculeStrategyButton";
import OrganismStrategyConsultantReport from "../organisms/OrganismStrategyConsultantReport";
import OrganismLeftSideBar from "../organisms/OrganismLeftSideBar";
// import OrganismLeftSideBar from "../../../../pages/Persona/components/organisms/OrganismIncNavigation"

import OrganismRightSideBar from "../organisms/OrganismRightSideBar";
import OrganismBizAnalysisSection from "../organisms/OrganismBizAnalysisSection";
import OrganismStrategyReportSection from "../organisms/OrganismStrategyReportSection";
import OrganismPocReportSection from "../organisms/OrganismPocReportSection";
import OrganismSearchBottomBar from "../organisms/OrganismSearchBottomBar";
import MoleculeBizName from "../molecules/MoleculeBizName";
import MoleculeSystemMessage from "../molecules/MoleculeSystemMessage";
import MoleculeUserMessage from "../molecules/MoleculeUserMessage";
import OrganismBizExpertSelect from "../organisms/OrganismBizExpertSelect";
import MoleculeAdditionalKeyword from "../molecules/MoleculeAdditionalKeyword";
import OrganismAdditionalReport from "../organisms/OrganismAdditionalReport";
import MoleculeCheckReportRightAway from "../molecules/MoleculeCheckReportRightAway";
import MoleculeCheckPocRightAway from "../molecules/MoleculeCheckPocRightAway";
import MoleculeCheckPocOption from "../molecules/MoleculeCheckPocOption";
import MoleculeCheckGrowthHackerOption from "../molecules/MoleculeCheckGrowthHackerOption";
import OrganismCustomerAdditionalReport from "../organisms/OrganismCustomerAdditionalReport";
import MoleculePersonaSelect from "../molecules/MoleculePersonaSelect";
import MoleculeRecommendedTargetButton from "../molecules/MoleculeRecommendedTargetButton";
import OrganismRecommendedTargetReport from "../organisms/OrganismRecommendedTargetReport";
import MoleculeIdeaStartButton from "../molecules/MoleculeIdeaStartButton";
import MoleculeIdeaCustomerButton from "../molecules/MoleculeIdeaCustomerButton";
import MoleculeIdeaGenerateButton from "../molecules/MoleculeIdeaGenerateButton";
import MoleculeIdeaPriorityButton from "../molecules/MoleculeIdeaPriorityButton";
import OrganismIdeaFeature from "../organisms/OrganismIdeaFeature";
import OrganismIdeaCustomer from "../organisms/OrganismIdeaCustomer";
import OrganismIdeaList from "../organisms/OrganismIdeaList";
import OrganismIdeaPriority from "../organisms/OrganismIdeaPriority";
import MoleculeGrowthHackerStartButton from "../molecules/MoleculeGrowthHackerStartButton";
import OrganismGrowthHackerReport from "../organisms/OrganismGrowthHackerReport";
import MoleculeGrowthHackerKPIButton from "../molecules/MoleculeGrowthHackerKPIButton";
import OrganismGrowthHackerKPI from "../organisms/OrganismGrowthHackerKPI";
import MoleculePriceStartButton from "../molecules/MoleculePriceStartButton";
import MoleculePriceOption from "../molecules/MoleculePriceOption";
import OrganismPriceReport from "../organisms/OrganismPriceReport";
import MoleculePriceContinueButton from "../molecules/MoleculePriceContinueButton";
import MoleculePriceProductSegmentation from "../molecules/MoleculePriceProductSegmentation";
import MoleculeCaseStartButton from "../molecules/MoleculeCaseStartButton";
import MoleculeCaseContinueButton from "../molecules/MoleculeCaseContinueButton";
import OrganismCaseReport from "../organisms/OrganismCaseReport";
import MoleculeSurveyStartButton from "../molecules/MoleculeSurveyStartButton";
import MoleculeSurveyGoalSuggestion from "../molecules/MoleculeSurveyGoalSuggestion";
import MoleculeCheckSurveyOption from "../molecules/MoleculeCheckSurveyOption";
import OrganismSurveyGuidelineReport from "../organisms/OrganismSurveyGuidelineReport";

import MoleculeBmStartButton from "../molecules/MoleculeBmStartButton";
import MoleculeCheckBmOption from "../molecules/MoleculeCheckBmOption";
import MoleculeBmModelSuggestion from "../molecules/MoleculeBmModelSuggestion";
import MoleculeBmSelectModelButton from "../molecules/MoleculeBmSelectModelButton";
import MoleculeBmBmAdsContinueButton from "../molecules/MoleculeBmBmAdsContinueButton";
import MoleculeBmLeanAdsContinueButton from "../molecules/MoleculeBmLeanAdsContinueButton";

import OrganismBmLeanAutoReport from "../organisms/OrganismBmLeanAutoReport";
import OrganismBmLeanAdsReport from "../organisms/OrganismBmLeanAdsReport";
import OrganismBmLeanCustomReport from "../organisms/OrganismBmLeanCustomReport";
import OrganismBmBmAutoReport from "../organisms/OrganismBmBmAutoReport";
import OrganismBmBmAdsReport from "../organisms/OrganismBmBmAdsReport";
import OrganismBmBmCustomReport from "../organisms/OrganismBmBmCustomReport";

import MoleculeMarketingStartButton from "../molecules/Marketing/MoleculeMarketingStartButton";
import OrganismMarketingResearchReport from "../organisms/Marketing/OrganismMarketingResearchReport";
import MoleculeMarketingBmButton from "../molecules/Marketing/MoleculeMarketingBmButton";
import OrganismMarketingBmReport from "../organisms/Marketing/OrganismMarketingBmReport";
import MoleculeMarketingCustomerButton from "../molecules/Marketing/MoleculeMarketingCustomerButton";
import MoleculeMarketingCustomer from "../molecules/Marketing/MoleculeMarketingCustomer";
import OrganismMarketingSegmentReport from "../organisms/Marketing/OrganismMarketingSegmentReport";
import OrganismMarketingFinalReport from "../organisms/Marketing/OrganismMarketingFinalReport";
import MoleculeMarketingSignUpButton from "../molecules/Marketing/MoleculeMarketingSignUpButton";
import images from "../../../../assets/styles/Images";

const PageMarketingExpertInsight = () => {
  const [strategyConsultantReportData, setStrategyConsultantReportData] =
    useAtom(STRATEGY_CONSULTANT_REPORT_DATA);
  const [growthHackerSelectedSolution, setGrowthHackerSelectedSolution] =
    useAtom(GROWTH_HACKER_SELECTED_SOLUTION);
  const [growthHackerRecommendedSolution, setGrowthHackerRecommendedSolution] =
    useAtom(GROWTH_HACKER_RECOMMENDED_SOLUTION);
  const [bmModelSuggestionReportData, setBmModelSuggestionReportData] = useAtom(
    BM_MODEL_SUGGESTION_REPORT_DATA
  );
  const [bmQuestionList, setBmQuestionList] = useAtom(BM_QUESTION_LIST);
  const [bmOrLean, setBmOrLean] = useAtom(BM_OR_LEAN);
  const [bmBmAutoReportData, setBmBmAutoReportData] = useAtom(
    BM_BM_AUTO_REPORT_DATA
  );
  const [bmLeanAutoReportData, setBmLeanAutoReportData] = useAtom(
    BM_LEAN_AUTO_REPORT_DATA
  );
  const [bmBmAdsReportData, setBmBmAdsReportData] = useAtom(
    BM_BM_ADS_REPORT_DATA
  );
  const [bmSelectedProblemOptions, setBmSelectedProblemOptions] = useAtom(
    BM_SELECTED_PROBLEM_OPTIONS
  );
  const [bmLeanAdsReportData, setBmLeanAdsReportData] = useAtom(
    BM_LEAN_ADS_REPORT_DATA
  );
  const [bmBmCustomReportData, setBmBmCustomReportData] = useAtom(
    BM_BM_CUSTOM_REPORT_DATA
  );
  const [bmLeanCustomReportData, setBmLeanCustomReportData] = useAtom(
    BM_LEAN_CUSTOM_REPORT_DATA
  );
  const [surveyGuidelineDetailReportData, setSurveyGuidelineDetailReportData] =
    useAtom(SURVEY_GUIDELINE_DETAIL_REPORT_DATA);
  const [surveyGuidelineReportData, setSurveyGuidelineReportData] = useAtom(
    SURVEY_GUIDELINE_REPORT_DATA
  );
  const [surveyGoalSuggestionList, setSurveyGoalSuggestionList] = useAtom(
    SURVEY_GOAL_SUGGESTION_LIST
  );
  const [surveyGoalFixed, setSurveyGoalFixed] = useAtom(SURVEY_GOAL_FIXED);
  const [surveyQuestionList, setSurveyQuestionList] =
    useAtom(SURVEY_QUESTION_LIST);

  const [priceScrapData, setPriceScrapData] = useAtom(PRICE_SCRAP_DATA);
  const [priceReportData, setPriceReportData] = useAtom(PRICE_REPORT_DATA);
  const [priceProduct, setPriceProduct] = useAtom(PRICE_PRODUCT);
  const [
    priceSelectedProductSegmentation,
    setPriceSelectedProductSegmentation,
  ] = useAtom(PRICE_SELECTED_PRODUCT_SEGMENTATION);
  const [priceProductSegmentation, setPriceProductSegmentation] = useAtom(
    PRICE_PRODUCT_SEGMENTATION
  );
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [pocPersonaList, setPocPersonaList] = useAtom(POC_PERSONA_LIST);
  const [selectedPocTarget, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET);
  const [isLoadingPage, setIsLoadingPage] = useState(true); // 로딩 상태 추가
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);

  const navigate = useNavigate();
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [isExpertInsightAccessible, setIsExpertInsightAccessible] = useAtom(
    IS_EXPERT_INSIGHT_ACCESSIBLE
  );

  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [inputBusinessInfo, setInputBusinessInfo] =
    useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(
    TITLE_OF_BUSINESS_INFORMATION
  );
  const [
    mainFeaturesOfBusinessInformation,
    setMainFeaturesOfBusinessInformation,
  ] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    mainCharacteristicOfBusinessInformation,
    setMainCharacteristicOfBusinessInformation,
  ] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [
    businessInformationTargetCustomer,
    setBusinessInformationTargetCustomer,
  ] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(
    SELECTED_EXPERT_INDEX
  );
  const [sections, setSections] = useState([]);

  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(
    SELECTED_ADDITIONAL_KEYWORD
  );

  const [
    selectedCustomerAdditionalKeyword,
    setSelectedCustomerAdditionalKeyword,
  ] = useAtom(SELECTED_CUSTOMER_ADDITIONAL_KEYWORD);

  const [customerAdditionalReportData, setCustomerAdditionalReportData] =
    useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);

  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);

  const [additionalReportData, setAdditionalReportData] = useAtom(
    ADDITIONAL_REPORT_DATA
  ); // Use the new list-based atom

  const [strategyReportData, setStrategyReportData] =
    useAtom(STRATEGY_REPORT_DATA); // 변경된 부분

  const [isLoggedIn] = useAtom(IS_LOGGED_IN); // 로그인 상태 확인
  const [advise, setAdvise] = useState(""); // 새로운 advise 상태 추가

  const [selectedExpertList, setSelectedExpertList] =
    useAtom(SELECTED_EXPERT_LIST);

  const [savedTimestamp, setSavedTimestamp] = useAtom(SAVED_TIMESTAMP);

  const [selectedPocOptions, setSelectedPocOptions] =
    useAtom(SELECTED_POC_OPTIONS);
  const [recommendedTargetData, setRecommendedTargetData] = useAtom(
    RECOMMENDED_TARGET_DATA
  );

  const [pocDetailReportData, setpocDetailReportData] = useAtom(
    POC_DETAIL_REPORT_DATA
  );

  const [ideaFeatureData, setIdeaFeatureData] = useAtom(IDEA_FEATURE_DATA);
  const [ideaRequirementData, setIdeaRequirementData] = useAtom(
    IDEA_REQUIREMENT_DATA
  );
  const [ideaFeatureDataTemp, setIdeaFeatureDataTemp] = useAtom(
    IDEA_FEATURE_DATA_TEMP
  );
  const [ideaRequirementDataTemp, setIdeaRequirementDataTemp] = useAtom(
    IDEA_REQUIREMENT_DATA_TEMP
  );
  const [ideaList, setIdeaList] = useAtom(IDEA_LIST);
  const [ideaGroup, setIdeaGroup] = useAtom(IDEA_GROUP);
  const [ideaPriority, setIdeaPriority] = useAtom(IDEA_PRIORITY);
  const [ideaMiroState, setIdeaMiroState] = useAtom(IDEA_MIRO_STATE);
  const [growthHackerReportData, setGrowthHackerReportData] = useAtom(
    GROWTH_HACKER_REPORT_DATA
  );
  const [growthHackerDetailReportData, setGrowthHackerDetailReportData] =
    useAtom(GROWTH_HACKER_DETAIL_REPORT_DATA);
  const [KpiQuestionList, setKpiQuestionList] = useAtom(KPI_QUESTION_LIST);

  const [caseReportData, setCaseReportData] = useAtom(CASE_REPORT_DATA);
  const [caseHashTag, setCaseHashTag] = useAtom(CASE_HASH_TAG);

  const [isMarketing, setIsMarketing] = useAtom(IS_MARKETING);
  const [marketingMbtiResult, setMarketingMbtiResult] = useAtom(
    MARKETING_MBTI_RESULT
  );
  const [marketingResearchReportData, setMarketingResearchReportData] = useAtom(
    MARKETING_RESEARCH_REPORT_DATA
  );
  const [marketingBmReportData, setMarketingBmReportData] = useAtom(
    MARKETING_BM_REPORT_DATA
  );
  const [marketingCustomerData, setMarketingCustomerData] = useAtom(
    MARKETING_CUSTOMER_DATA
  );
  const [marketingSelectedCustomer, setMarketingSelectedCustomer] = useAtom(
    MARKETING_SELECTED_CUSTOMER
  );
  const [marketingFinalCustomer, setMarketingFinalCustomer] = useAtom(
    MARKETING_FINAL_CUSTOMER
  );
  const [marketingFinalReportData, setMarketingFinalReportData] = useAtom(
    MARKETING_FINAL_REPORT_DATA
  );

  let additionalReportCount = 0;
  let customerAdditionalReportCount = 0;
  let caseReportCount = 0;
  let marketingCustomerCount = 0;
  let marketingSegmentReportCount = 0;
  let growthHackerReportCount = 0;
  let strategyConsultantCount = 0;

  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isMarketing && approachPath !== 2) {
      const handleBeforeUnload = (event) => {
        // Cancel the event as stated by the standard.
        event.preventDefault();
        // Chrome requires returnValue to be set.
        event.returnValue = "";
      };

      const handlePopState = () => {
        setIsExitPopupOpen(true);
      };

      const handleKeyDown = (event) => {
        // if (event.keyCode === 116)
        if (
          (event.key === "r" && (event.metaKey || event.ctrlKey)) ||
          event.key === "F5"
        ) {
          // F5 key code
          setIsExitPopupOpen(true);
          event.preventDefault();
          // navigate("/");
        }
      };

      //새로고침방지
      window.addEventListener("beforeunload", handleBeforeUnload);

      window.history.pushState(null, "", "");
      window.addEventListener("popstate", handlePopState);
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        //새로고침 방지

        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, []);

  const handleExitCancel = () => {
    setIsExitPopupOpen(false);
  };

  const handleExitConfirm = () => {
    window.location.href = "/MarketingLanding";
  };

  // 대화 아이템을 단계별로 렌더링하기 위한 상태 변수
  const [renderedItems, setRenderedItems] = useState([]);
  const [lastRenderedIndex, setLastRenderedIndex] = useState(-1);

  useEffect(() => {
    let totalDelay = 0;
    const timers = [];
    const newRenderedItems = [...renderedItems];

    // conversation과 renderedItems를 비교하여 제거된 항목 찾기
    newRenderedItems.forEach((item, index) => {
      if (!conversation.includes(item)) {
        newRenderedItems.splice(index, 1);
      }
    });

    // 제거된 항목을 반영한 renderedItems 업데이트
    setRenderedItems(newRenderedItems);
    setLastRenderedIndex(newRenderedItems.length - 1);

    // 새로 추가된 항목만 렌더링
    for (
      let index = newRenderedItems.length;
      index < conversation.length;
      index++
    ) {
      const item = conversation[index];

      if (!newRenderedItems.includes(item)) {
        // 중복 방지
        if (item.type === "user") {
          setRenderedItems((prevItems) => [...prevItems, item]);
          setLastRenderedIndex(index);
        } else {
          let delay = 0;
          if (index > 0 && conversation[index - 1].type === "system") {
            const prevMessageLength = conversation[index - 1].message.length;
            delay = prevMessageLength * 15;
          }

          totalDelay += delay;

          const timer = setTimeout(() => {
            setRenderedItems((prevItems) => [...prevItems, item]);
            setLastRenderedIndex(index);
          }, totalDelay);

          timers.push(timer);
        }
      }
    }

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [conversation]);

  useEffect(() => {
    // 접근 가능 여부를 확인하여 차단 로직 수행
    if (!isExpertInsightAccessible) {
      navigate("/MarketingLanding"); // 접근이 허용되지 않으면 메인 페이지로 리다이렉트
    }

    // 페이지를 나갈 때 접근 가능 여부 초기화
    return () => {
      setIsExpertInsightAccessible(false); // 페이지 떠날 때 접근 불가로 설정
    };
  }, [navigate]);

  useEffect(() => {
    const loadConversation = async () => {
      // 1. 로그인 여부 확인
      if (isLoggedIn && !isMarketing) {
        // 2. 로그인 상태라면 서버에서 새로운 대화 ID를 생성하거나, 저장된 대화를 불러옴
        if (!conversationId && isExpertInsightAccessible) {
          try {
            // 서버에서 새로운 대화 ID 생성
            // console.log("서버에서 새로운 대화 ID 생성");
            const newConversationId = await createChatOnServer();
            setConversationId(newConversationId); // 생성된 대화 ID 설정
            setIsExpertInsightAccessible(true);
            setIsLoadingPage(false); // 로딩 완료
            // 새로운 대화 ID로 경로 변경
            navigate(`/conversation/${newConversationId}`, { replace: true });
          } catch (error) {
            setIsLoadingPage(false); // 로딩 완료
            setIsExpertInsightAccessible(true);
            //console.error("Failed to create conversation on server:", error);
            navigate(`/conversation/${conversationId}`, { replace: true });
          }
        } else {
          // 3. 대화 ID가 이미 존재하면 IndexedDB에서 대화 불러오기
          const savedConversation = await getConversationByIdFromIndexedDB(
            conversationId,
            isLoggedIn
          );

          if (savedConversation) {
            setSelectedExpertIndex(
              savedConversation.expert_index !== undefined
                ? savedConversation.expert_index
                : "0"
            );
            const analysisData = savedConversation.analysisReportData || {};
            setTitleOfBusinessInfo(analysisData.title || "");
            setMainFeaturesOfBusinessInformation(
              analysisData.mainFeatures || []
            );
            setMainCharacteristicOfBusinessInformation(
              analysisData.mainCharacter || []
            );
            setBusinessInformationTargetCustomer(
              analysisData.mainCustomer || []
            );

            // 복구된 데이터를 로컬 상태로 설정
            setConversation(savedConversation.conversation);
            setConversationStage(savedConversation.conversationStage);
            setInputBusinessInfo(savedConversation.inputBusinessInfo);

            // 전략 보고서 데이터 복구
            setStrategyReportData(savedConversation.strategyReportData || {}); // 변경된 부분
            setAdditionalReportData(
              savedConversation.additionalReportData || []
            );
            setSelectedAdditionalKeyword(
              savedConversation.selectedAdditionalKeyword || []
            );
            setSelectedCustomerAdditionalKeyword(
              savedConversation.selectedCustomerAdditionalKeyword || []
            );
            setCustomerAdditionalReportData(
              savedConversation.customerAdditionalReportData || []
            );

            setSelectedPocOptions(savedConversation.selectedPocOptions || []);
            setSelectedPocTarget(savedConversation.selectedPocTarget || {});
            setRecommendedTargetData(
              savedConversation.recommendedTargetData || {}
            );
            setpocDetailReportData(savedConversation.pocDetailReportData || {});
            setPocPersonaList(savedConversation.pocPersonaList || []);
            setIdeaFeatureData(savedConversation.ideaFeatureData || []);
            setIdeaRequirementData(savedConversation.ideaRequirementData || []);
            setIdeaFeatureDataTemp(savedConversation.ideaFeatureData || []);
            setIdeaRequirementDataTemp(
              savedConversation.ideaRequirementData || []
            );
            setIdeaList(savedConversation.ideaList || []);
            setIdeaGroup(savedConversation.ideaGroup || {});
            setIdeaPriority(savedConversation.ideaPriority || []);
            setIdeaMiroState(savedConversation.ideaMiroState || 0);
            setButtonState(savedConversation.buttonState || {});

            setGrowthHackerReportData(
              savedConversation.growthHackerReportData || []
            );
            setGrowthHackerDetailReportData(
              savedConversation.growthHackerDetailReportData || []
            );
            setGrowthHackerRecommendedSolution(
              savedConversation.growthHackerRecommendedSolution || []
            );
            setGrowthHackerSelectedSolution(
              savedConversation.growthHackerSelectedSolution || []
            );
            setKpiQuestionList(savedConversation.KpiQuestionList || []);

            setPriceScrapData(savedConversation.priceScrapData || {});
            setPriceReportData(savedConversation.priceReportData || {});
            setPriceProduct(savedConversation.priceProduct || []);
            setPriceSelectedProductSegmentation(
              savedConversation.priceSelectedProductSegmentation || []
            );
            setPriceProductSegmentation(
              savedConversation.priceProductSegmentation || []
            );

            setCaseReportData(savedConversation.caseReportData || []);
            setCaseHashTag(savedConversation.caseHashTag || []);

            setSurveyGuidelineDetailReportData(
              savedConversation.surveyGuidelineDetailReportData || {}
            );
            setSurveyGuidelineReportData(
              savedConversation.surveyGuidelineReportData || {}
            );
            setSurveyGoalSuggestionList(
              savedConversation.surveyGoalSuggestionList || []
            );
            setSurveyGoalFixed(savedConversation.surveyGoalFixed || []);
            setSurveyQuestionList(savedConversation.surveyQuestionList || []);

            setBmModelSuggestionReportData(
              savedConversation.bmModelSuggestionReportData || []
            );
            setBmQuestionList(savedConversation.bmQuestionList || []);
            setBmSelectedProblemOptions(
              savedConversation.bmSelectedProblemOptions || {}
            );
            setBmOrLean(savedConversation.bmOrLean || "");
            setBmBmAutoReportData(savedConversation.bmBmAutoReportData || []);
            setBmLeanAutoReportData(
              savedConversation.bmLeanAutoReportData || []
            );
            setBmBmAdsReportData(savedConversation.bmBmAdsReportData || []);
            setBmLeanAdsReportData(savedConversation.bmLeanAdsReportData || []);
            setBmBmCustomReportData(
              savedConversation.bmBmCustomReportData || []
            );
            setBmLeanCustomReportData(
              savedConversation.bmLeanCustomReportData || []
            );

            setIsMarketing(savedConversation.isMarketing || false);
            setMarketingMbtiResult(savedConversation.marketingMbtiResult || {});
            setMarketingResearchReportData(
              savedConversation.marketingResearchReportData || []
            );
            setMarketingBmReportData(
              savedConversation.marketingBmReportData || []
            );
            setMarketingCustomerData(
              savedConversation.marketingCustomerData || []
            );
            setMarketingSelectedCustomer(
              savedConversation.marketingSelectedCustomer || []
            );
            setMarketingFinalCustomer(
              savedConversation.marketingFinalCustomer || {}
            );
            setMarketingFinalReportData(
              savedConversation.marketingFinalReportData || []
            );
            setStrategyConsultantReportData(
              savedConversation.strategyConsultantReportData || []
            );
          }

          setIsLoadingPage(false); // 로딩 완료
        }
      } else if (isMarketing) {
        // 마케팅으로 진입 시
        setIsExpertInsightAccessible(true);
        setIsLoadingPage(false);
        navigate(`/conversation/${conversationId}`, { replace: true });
      } else {
        // 4. 비로그인 상태인 경우, 새로운 로컬 대피 ID 생성 또는 기존 대화 로드
        // if (!conversationId) {
        //   setConversationId(nanoid()); // 비로그인 시 로컬에서 새로운 ID 생성
        //   setIsLoadingPage(false); // 로딩 완료
        //   setIsExpertInsightAccessible(true);
        //   navigate(`/conversation/${conversationId}`, { replace: true });
        // } else {
        //   const savedConversation = await getConversationByIdFromIndexedDB(conversationId, isLoggedIn);
        //   if (savedConversation) {
        //     const analysisData = savedConversation.analysisReportData || {};
        //     setTitleOfBusinessInfo(analysisData.title || "");
        //     setMainFeaturesOfBusinessInformation(analysisData.mainFeatures || []);
        //     setMainCharacteristicOfBusinessInformation(analysisData.mainCharacter || []);
        //     setBusinessInformationTargetCustomer(analysisData.mainCustomer || []);
        //     // 복구된 데이터를 로컬 상태로 설정
        //     setConversation(savedConversation.conversation);
        //     setConversationStage(savedConversation.conversationStage);
        //     setInputBusinessInfo(savedConversation.inputBusinessInfo);
        //     // 전략 보고서 데이터 복구
        //     setStrategyReportData(savedConversation.strategyReportData || {}); // 변경된 부분
        //     setAdditionalReportData(savedConversation.additionalReportData || []);
        //     setSelectedAdditionalKeyword(savedConversation.selectedAdditionalKeyword || []);
        //     // 대화 단계가 초기 상태라면 초기 시스템 메시지 설정
        //     if (savedConversation.conversationStage === 1) {
        //       const initialMessage = getInitialSystemMessage();
        //       setConversation([
        //         {
        //           type: "system",
        //           message: initialMessage,
        //           expertIndex: selectedExpertIndex,
        //         },
        //       ]);
        //     }
        //   } else {
        //     // 저장된 대화가 없으면 초기 메시지 설정
        //     if (selectedExpertIndex) {
        //       const initialMessage = getInitialSystemMessage();
        //       setConversation([
        //         {
        //           type: "system",
        //           message: initialMessage,
        //           expertIndex: selectedExpertIndex,
        //         },
        //       ]);
        //     }
        //   }
        //   setIsLoadingPage(false); // 로딩 완료
        // }
      }
    };

    loadConversation();
  }, [conversationId, isLoggedIn, navigate]);

  // 스크롤
  // const [isScrolled, setIsScrolled] = useState(false);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 160) {
  //       setIsScrolled(true); // 스크롤이 내려가면 상태를 true로 변경
  //     } else {
  //       setIsScrolled(false); // 스크롤이 최상단에 있을 때 상태를 false로 변경
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll); // 메모리 누수 방지
  //   };
  // }, []);

  const chatEndRef = useRef(null); // 스크롤을 위한 ref 추가

  useEffect(() => {
    if (chatEndRef.current && approachPath !== 2) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [renderedItems]);

  if (isLoadingPage) {
    return <div>Loading...</div>;
  }

  // 히스토로 진입할 때는 즉시 렌더링
  const itemsToRender = approachPath === 2 ? conversation : renderedItems;

  return (
    <>
      <ThemeProvider theme={theme}>
        {isMarketing && approachPath !== 2 && (
          <ProjectName>
            <div className="inner">
              <div>
                <p>
                  <span>
                    <img src={images.Graph} alt="" />
                  </span>
                  {titleOfBusinessInfo}
                </p>
                {/* <button>아이템 핵심 정리</button> */}
              </div>
            </div>
          </ProjectName>
        )}
        {isPopupVisible && (
          <AutosavePopup>
            <div>
              <strong>달콤한 베트남 망고 젤리</strong>
              <p>
                프리랜서 업무 관리 플랫폼은 프리랜서들이 업무를 효율적으로
                관리하고 일정을 체계적으로 계획할 수 있도록 지원하는
                서비스입니다. 프로젝트 관리, 시간 기록, 청구서 발행, 고객 관리
                등 프리랜서 업무에 필요한 다양한 기능을 제공하여 업무 효율성을
                높이고, 시간 관리를 개선하며, 수익 관리를 용이하게 합니다.
              </p>
            </div>
          </AutosavePopup>
        )}

        <ContentsWrap>
          {(!isMarketing || approachPath === 2) && <OrganismLeftSideBar />}

          <MainContent>
            <div>
              <ChatWrap>
                {(!isMarketing || (isMarketing && approachPath === 2)) && (
                  <MoleculeBizName date={savedTimestamp} />
                )}

                {itemsToRender.map((item, index) => {
                  if (item.type === "user") {
                    return (
                      <MoleculeUserMessage key={index} message={item.message} />
                    );
                  } else if (item.type === "system") {
                    // console.log(item);
                    return <MoleculeSystemMessage key={index} item={item} />;
                  } else if (item.type === "analysis") {
                    return <OrganismBizAnalysisSection />;
                  } else if (item.type.startsWith("strategy_")) {
                    const expertIndex = item.type.split("_")[1];
                    return (
                      <OrganismStrategyReportSection
                        key={`strategy_${expertIndex}_${index}`}
                        expertIndex={expertIndex}
                      />
                    );
                  } else if (item.type === "addition") {
                    const currentAdditionalReportCount =
                      additionalReportCount++;
                    return (
                      <OrganismAdditionalReport
                        additionalReportCount={currentAdditionalReportCount}
                      />
                    );
                  } else if (item.type === "customerAddition") {
                    const currentCustomerAdditionalReportCount =
                      customerAdditionalReportCount++;
                    return (
                      <OrganismCustomerAdditionalReport
                        customerAdditionalReportCount={
                          currentCustomerAdditionalReportCount
                        }
                      />
                    );
                  } else if (item.type === "keyword") {
                    return <MoleculeAdditionalKeyword />;
                  } else if (item.type === "reportButton") {
                    return <MoleculeCheckReportRightAway />;
                  } else if (item.type === "strategyButton") {
                    return <MoleculeStrategyButton />;
                  } else if (item.type === "strategyConsultant") {
                    const currentStrategyConsultantCount =
                      strategyConsultantCount++;
                    return (
                      <OrganismStrategyConsultantReport
                        strategyConsultantCount={currentStrategyConsultantCount}
                      />
                    );
                  } else if (item.type.startsWith("poc_")) {
                    /* PoC */
                    const expertIndex = item.type.split("_")[1];
                    return (
                      <>
                        <OrganismPocReportSection
                          key={`poc_${expertIndex}_${index}`}
                          expertIndex={expertIndex}
                        />
                      </>
                    );
                  } else if (item.type === "addition") {
                    const currentAdditionalReportCount =
                      additionalReportCount++;
                    return (
                      <OrganismAdditionalReport
                        additionalReportCount={currentAdditionalReportCount}
                      />
                    );
                  } else if (item.type === "customerAddition") {
                    const currentCustomerAdditionalReportCount =
                      customerAdditionalReportCount++;
                    return (
                      <OrganismCustomerAdditionalReport
                        customerAdditionalReportCount={
                          currentCustomerAdditionalReportCount
                        }
                      />
                    );
                  } else if (item.type === "keyword") {
                    return <MoleculeAdditionalKeyword />;
                  } else if (item.type === "reportButton") {
                    return <MoleculeCheckReportRightAway />;
                  } else if (item.type === "strategyButton") {
                    return <MoleculeStrategyButton />;
                  } else if (item.type === "strategyConsultant") {
                    const currentStrategyConsultantCount =
                      strategyConsultantCount++;
                    return (
                      <OrganismStrategyConsultantReport
                        strategyConsultantCount={currentStrategyConsultantCount}
                      />
                    );
                  } else if (item.type.startsWith("poc_")) {
                    /* PoC */
                    const expertIndex = item.type.split("_")[1];
                    return (
                      <>
                        <OrganismPocReportSection
                          key={`poc_${expertIndex}_${index}`}
                          expertIndex={expertIndex}
                        />
                      </>
                    );
                  } else if (item.type === "addition") {
                    const currentAdditionalReportCount =
                      additionalReportCount++;
                    return (
                      <OrganismAdditionalReport
                        additionalReportCount={currentAdditionalReportCount}
                      />
                    );
                  } else if (item.type === "customerAddition") {
                    const currentCustomerAdditionalReportCount =
                      customerAdditionalReportCount++;
                    return (
                      <OrganismCustomerAdditionalReport
                        customerAdditionalReportCount={
                          currentCustomerAdditionalReportCount
                        }
                      />
                    );
                  } else if (item.type === "keyword") {
                    return <MoleculeAdditionalKeyword />;
                  } else if (item.type === "reportButton") {
                    return <MoleculeCheckReportRightAway />;
                  } else if (item.type.startsWith("poc_")) {
                    /* PoC */
                    const expertIndex = item.type.split("_")[1];
                    return (
                      <>
                        <OrganismPocReportSection
                          key={`poc_${expertIndex}_${index}`}
                          expertIndex={expertIndex}
                        />
                      </>
                    );
                  } else if (item.type.startsWith("pocTarget_")) {
                    const expertIndex = item.type.split("_")[1];
                    return (
                      <>
                        <OrganismRecommendedTargetReport
                          key={`pocTarget_${expertIndex}_${index}`}
                          expertIndex={expertIndex}
                        />
                      </>
                    );
                  } else if (item.type === "pocPlanButton") {
                    return <MoleculeCheckPocRightAway />;
                  } else if (item.type === "pocTargetButton") {
                    return <MoleculeRecommendedTargetButton />;
                  } else if (item.type === "pocOption") {
                    return <MoleculeCheckPocOption />;
                  } else if (item.type === "pocPersona") {
                    return <MoleculePersonaSelect />;
                  } else if (item.type === "ideaStartButton") {
                    /* 아이디어 디벨로퍼 */
                    return <MoleculeIdeaStartButton />;
                  } else if (item.type === "ideaCustomerButton") {
                    return <MoleculeIdeaCustomerButton />;
                  } else if (item.type === "ideaGenerateButton") {
                    return <MoleculeIdeaGenerateButton />;
                  } else if (item.type === "ideaPriorityButton") {
                    return <MoleculeIdeaPriorityButton />;
                  } else if (item.type === "ideaFeature") {
                    return <OrganismIdeaFeature />;
                  } else if (item.type === "ideaCustomer") {
                    return <OrganismIdeaCustomer />;
                  } else if (item.type === "ideaList") {
                    return <OrganismIdeaList />;
                  } else if (item.type === "ideaPriority") {
                    return <OrganismIdeaPriority />;
                  } else if (item.type === "growthHackerStartButton") {
                    /* 그로스 해커 */
                    return <MoleculeGrowthHackerStartButton />;
                  } else if (item.type === "growthHackerOption") {
                    return <MoleculeCheckGrowthHackerOption />;
                  } else if (item.type === "growthHackerReport") {
                    const currentGrowthHackerReportCount =
                      growthHackerReportCount++;
                    return (
                      <OrganismGrowthHackerReport
                        growthHackerReportCount={currentGrowthHackerReportCount}
                      />
                    );
                  } else if (item.type === "growthHackerKPIButton") {
                    return <MoleculeGrowthHackerKPIButton />;
                  } else if (item.type === "growthHackerKPI") {
                    return <OrganismGrowthHackerKPI />;
                  } else if (item.type === "priceStartButton") {
                    /* 가격 분석 전문가 */
                    return <MoleculePriceStartButton />;
                  } else if (item.type === "priceOption") {
                    return <MoleculePriceOption />;
                  } else if (item.type === "priceReport") {
                    return <OrganismPriceReport />;
                  } else if (item.type === "priceContinueButton") {
                    return <MoleculePriceContinueButton />;
                  } else if (item.type === "priceProductSegmentation") {
                    return <MoleculePriceProductSegmentation />;
                  } else if (item.type === "caseStartButton") {
                    /* 사례 분석 전문가 */
                    return <MoleculeCaseStartButton />;
                  } else if (item.type === "caseContinueButton") {
                    return <MoleculeCaseContinueButton />;
                  } else if (item.type === "caseReport") {
                    const currentCaseReportCount = caseReportCount++;
                    return (
                      <OrganismCaseReport
                        caseReportCount={currentCaseReportCount}
                      />
                    );
                  } else if (item.type === "bmStartButton") {
                    /* BM 전문가 */
                    return <MoleculeBmStartButton />;
                  } else if (item.type === "bmOption") {
                    return <MoleculeCheckBmOption />;
                  } else if (item.type === "bmModelSuggestion") {
                    return <MoleculeBmModelSuggestion />;
                  } else if (item.type === "bmSelectModelButton") {
                    return <MoleculeBmSelectModelButton />;
                  } else if (item.type === "bmBmAdsContinueButton") {
                    return <MoleculeBmBmAdsContinueButton />;
                  } else if (item.type === "bmLeanAdsContinueButton") {
                    return <MoleculeBmLeanAdsContinueButton />;
                  } else if (item.type === "bmBmAutoReport") {
                    return <OrganismBmBmAutoReport />;
                  } else if (item.type === "bmLeanAutoReport") {
                    return <OrganismBmLeanAutoReport />;
                  } else if (item.type === "bmLeanAdsReport") {
                    return <OrganismBmLeanAdsReport />;
                  } else if (item.type === "bmBmAdsReport") {
                    return <OrganismBmBmAdsReport />;
                  } else if (item.type === "bmLeanCustomReport") {
                    return <OrganismBmLeanCustomReport />;
                  } else if (item.type === "bmBmCustomReport") {
                    return <OrganismBmBmCustomReport />;

                    /* 설문조사 전문가 */
                  } else if (item.type === "surveyStartButton") {
                    return <MoleculeSurveyStartButton />;
                  } else if (item.type === "surveyGoalSuggestion") {
                    return <MoleculeSurveyGoalSuggestion />;
                  } else if (item.type === "surveyOption") {
                    return <MoleculeCheckSurveyOption />;
                  } else if (item.type === "surveyGuidelineReport") {
                    return <OrganismSurveyGuidelineReport />;
                  } else if (item.type === "marketingStartButton") {
                    /* 마케팅 */
                    return <MoleculeMarketingStartButton />;
                  } else if (item.type === "marketingResearchReport") {
                    return <OrganismMarketingResearchReport />;
                  } else if (item.type === "marketingBmButton") {
                    return <MoleculeMarketingBmButton />;
                  } else if (item.type === "marketingBmReport") {
                    return <OrganismMarketingBmReport />;
                  } else if (item.type === "marketingCustomerButton") {
                    return <MoleculeMarketingCustomerButton />;
                  } else if (item.type === "marketingCustomer") {
                    const currentMarketingCustomerCount =
                      marketingCustomerCount++;
                    return (
                      <MoleculeMarketingCustomer
                        marketingCustomerCount={currentMarketingCustomerCount}
                      />
                    );
                  } else if (item.type === "marketingSegmentReport") {
                    const currentMarketingSegmentReportCount =
                      marketingSegmentReportCount++;
                    return (
                      <OrganismMarketingSegmentReport
                        marketingSegmentReportCount={
                          currentMarketingSegmentReportCount
                        }
                      />
                    );
                  } else if (item.type === "marketingFinalReport") {
                    return <OrganismMarketingFinalReport />;
                  } else if (item.type === "marketingSignUpButton") {
                    return <MoleculeMarketingSignUpButton />;
                  }

                  return null;
                })}
                <div ref={chatEndRef} />

                {selectedExpertIndex === "0" ||
                selectedExpertIndex === "2" ||
                selectedExpertIndex === "3" ? (
                  <>
                    {/* 검색해서 시작 */}
                    {(approachPath === -1 || approachPath === 3) &&
                      titleOfBusinessInfo && <OrganismBizExpertSelect />}

                    {/* 전문가 선택하고 시작 */}
                    {/* {approachPath === 1 &&
                      Object.keys(strategyConsultantReportData).length !== 0 &&
                      !isLoading && <OrganismBizExpertSelect />} */}

                    {/* 히스토리로 진입 시 */}
                    {/* {approachPath === 2 &&
                      titleOfBusinessInfo &&
                      conversation.length > 0 &&
                      conversation[conversation.length - 1].type !==
                        "reportButton" &&
                      !isLoading && <OrganismBizExpertSelect />} */}
                  </>
                ) : selectedExpertIndex === "1" ? (
                  <>
                    {strategyConsultantReportData.length === 3 && (
                      <OrganismBizExpertSelect />
                    )}
                  </>
                ) : selectedExpertIndex === "4" ? (
                  <>
                    {Object.keys(recommendedTargetData).length !== 0 && (
                      <OrganismBizExpertSelect />
                    )}
                  </>
                ) : selectedExpertIndex === "5" ? (
                  <>
                    {ideaPriority.length !== 0 && <OrganismBizExpertSelect />}
                  </>
                ) : // ) : selectedExpertIndex === "6" ? (
                //   <>
                //     {buttonState.growthHackerKPI === 1 && (
                //       <OrganismBizExpertSelect />
                //     )}
                //   </>
                // ) : selectedExpertIndex === "7" ? (
                //   <>
                //     {buttonState.priceEnough === 1 && (
                //       <OrganismBizExpertSelect />
                //     )}
                //   </>
                selectedExpertIndex === "8" ? (
                  <>
                    {buttonState.caseEnough === 1 && (
                      <OrganismBizExpertSelect />
                    )}
                  </>
                ) : // ) : selectedExpertIndex === "9" ? (
                //   <>
                //     {buttonState.bmEnough === 1 && <OrganismBizExpertSelect />}
                //   </>
                selectedExpertIndex === "10" ? (
                  <>
                    {buttonState.surveyEnd === 1 && <OrganismBizExpertSelect />}
                  </>
                ) : null}
              </ChatWrap>

              {conversationStage === 1 && !isMarketing ? (
                <OrganismSearchBottomBar isBlue={false} />
              ) : selectedExpertIndex === "2" || selectedExpertIndex === "3" ? (
                <OrganismSearchBottomBar isBlue={true} />
              ) : selectedExpertIndex === "1" ? (
                strategyConsultantReportData.length === 3 && (
                  <OrganismSearchBottomBar isBlue={true} />
                )
              ) : selectedExpertIndex === "4" ? (
                Object.keys(recommendedTargetData).length !== 0 && (
                  <OrganismSearchBottomBar isBlue={true} />
                ) // 4번 전문가 끝났을 때 활성화
              ) : selectedExpertIndex === "5" ? (
                ideaPriority.length !== 0 && (
                  <OrganismSearchBottomBar isBlue={true} />
                ) // 5번 전문가 끝났을 때 활성화
              ) : selectedExpertIndex === "6" ? (
                buttonState.growthHackerKPI === 1 && (
                  <OrganismSearchBottomBar isBlue={true} />
                ) // 6번 전문가 끝났을 때 활성화
              ) : selectedExpertIndex === "7" ? (
                buttonState.priceEnough === 1 && (
                  <OrganismSearchBottomBar isBlue={true} />
                ) // 7번 전문가 끝났을 때 활성화
              ) : selectedExpertIndex === "8" ? (
                buttonState.caseEnough === 1 ? (
                  <OrganismSearchBottomBar isBlue={true} /> // 사례 조사 끝났을 때 활성화
                ) : (
                  buttonState.caseStart === 1 &&
                  !isLoading &&
                  conversation[conversation.length - 1].type !==
                    "caseContinueButton" && (
                    <OrganismSearchBottomBar isBlue={true} isHashTag={true} />
                  )
                ) // 사례 조사 시작했을 때 활성화
              ) : selectedExpertIndex === "9" ? (
                buttonState.bmEnough === 1 && (
                  <OrganismSearchBottomBar isBlue={true} />
                )
              ) : selectedExpertIndex === "10" ? (
                buttonState.surveyEnd === 1 ? (
                  <OrganismSearchBottomBar isBlue={true} /> // 설문조사 끝났을 때 활성화
                ) : (
                  buttonState.surveyGoalInputStart === 1 && (
                    <OrganismSearchBottomBar isBlue={true} isHashTag={true} />
                  )
                ) // 설문조사 목적 입력 시 활성화
              ) : null}
            </div>

            {/* {!isMarketing && <OrganismRightSideBar />} */}
          </MainContent>
        </ContentsWrap>
        {isExitPopupOpen && (
          <Popup Cancel>
            <div>
              <button
                type="button"
                className="closePopup"
                onClick={handleExitCancel}
              >
                닫기
              </button>
              <span>
                <img src={images.ExclamationMarkRed} alt="" />
              </span>
              <p>
                <strong>정말 종료하시겠습니까?</strong>
                <span>
                  종료 또는 새로고침 할 경우, 모든 대화내역이 사라집니다.
                </span>
              </p>
              <div className="btnWrap">
                <button type="button" onClick={handleExitCancel}>
                  대화를 저장할래요
                </button>
                <button type="button" onClick={handleExitConfirm}>
                  종료할게요
                </button>
              </div>
            </div>
          </Popup>
        )}
      </ThemeProvider>
    </>
  );
};

export default PageMarketingExpertInsight;

const ProjectName = styled.div`
  // position: fixed;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 60px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${palette.gray200};
  background: ${palette.white};
  z-index: 2;

  .inner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1030px;
    width: 100%;
  }

  p {
    display: flex;
    align-items: center;
    gap: 16px;
    font-weight: 500;
    line-height: 1.5;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 4px;
      background: ${palette.black};

      img {
        width: 12px;
      }
    }
  }

  button {
    font-family: "Pretendard", "Poppins";
    font-size: 0.75rem;
    line-height: 1.5;
    color: ${palette.gray700};
    padding: 8px 12px;
    border-radius: 5px;
    border: 0;
    background: ${palette.gray100};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    .inner {
      padding: 0;
    }

    div {
      padding: 0 20px;
    }

    p {
      font-size: 0.88rem;
      font-weight: 600;
      text-align: left;

      span {
        display: none;
      }
    }

    button {
      display: none;
    }
  }
`;

const AutosavePopup = styled.div`
  position: absolute;
  right: -100px;
  top: 80px;
  max-width: 304px;
  max-height: ${(props) => (props.isPopupVisible ? "0" : "1000px")};
  flex-direction: column;
  gap: 20px !important;
  text-align: left;
  padding: ${(props) => (props.isPopupVisible ? "0" : "24px")};
  border-radius: 20px;
  background: ${palette.white};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  visibility: ${(props) => (props.isPopupVisible ? "hidden" : "visible")};
  opacity: ${(props) => (props.isPopupVisible ? "0" : "1")};
  z-index: 1;

  &:before {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0px 20px 12px 20px;
    border-color: transparent transparent ${palette.white} transparent;
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.2));
    content: "";
    z-index: 0;
  }

  strong {
    font-size: 0.75rem;
    font-weight: 700;
    color: ${palette.gray};
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    margin-top: 5px;
  }

  span {
    font-size: 0.63rem;
    font-weight: 300;
    color: ${palette.gray};
  }

  p {
    font-size: 0.75rem;
    line-height: 1.5;
    margin-top: 20px;
  }
`;

const MainContent = styled.div`
  position: relative;
  top: 40px;
  // top: 70px;
  grid-area: content;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // gap:40px;
  min-width: 1px;
  max-width: 1484px;
  width: calc(100% - 40px);
  // padding-bottom: 150px;
  // margin: 0 auto;
  margin: 0 auto;
  padding: 0 40px;
  // justify-content:center;

  > div {
    flex: 1;
  }

  > div:first-child {
    max-width: 1030px;
    // max-width: 1240px;
    // max-width:800px;
    width: 100%;
    height: calc(100% - 60px);
    // margin: 0 20px;
    margin: 0 auto;
    // padding-bottom: 60px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0;
  }
`;

const ContentsWrap = styled.div`
  position: relative;
  display: flex;
`;

const ChatWrap = styled.div`
  position: relative;
  // height: calc(100% - 55px);
  min-height: 90%;
  padding-bottom: 60px;

  &:before {
    // position: sticky;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    // height: 0;
    height: 40px;
    display: block;
    // height:170px;
    background: rgb(255, 255, 255);
    // background: linear-gradient(
    //   0deg,
    //   rgba(255, 255, 255, 0) 0%,
    //   rgba(255, 255, 255, 1) 30%
    // );
    background: ${palette.white};
    z-index: 1;
    content: "";
  }

  // &.scrolled:before {
  //   height: 180px;
  // }
`;

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
    padding: 9px;
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
      background: ${palette.gray500};
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
      strong {
        font-weight: 500;
        display: block;
      }

      span {
        font-size: 0.75rem !important;
        font-weight: 400;
        color: #f40404;
        display: block;
        margin-top: 8px;
      }
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
        border-radius: 12px;
        border: 1px solid ${palette.blue};
        background: ${palette.white};

        // &:last-child {
        //   color: ${palette.white};
        //   background: ${palette.blue};
        // }
      }
    }

    ${(props) =>
      props.Cancel &&
      css`
        p {
          strong {
            font-weight: 600;
            display: block;
            color: ${palette.gray800};
          }
          span {
            font-size: 1rem;
            display: block;
            margin-top: 8px;
          }
        }

        .btnWrap {
          padding-top: 16px;
          border-top: 1px solid ${palette.lineGray};

          button {
            color: ${palette.gray700};
            font-weight: 400;
            padding: 0;
            border: 0;
            background: none;
          }
        }
      `}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    > div {
      width: 90%;
    }
  }
`;
