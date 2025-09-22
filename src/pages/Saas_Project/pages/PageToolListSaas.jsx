import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import axios from "axios";
import { useAtom } from "jotai";
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  APPROACH_PATH,
  ANALYSIS_BUTTON_STATE,
  IS_LOGGED_IN,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  STRATEGY_REPORT_DATA,
  SELECTED_ADDITIONAL_KEYWORD,
  ADDITIONAL_REPORT_DATA,
  CONVERSATION_STAGE,
  CONVERSATION,
  CONVERSATION_ID,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  IS_EDITING_NOW,
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
  IS_EDITING_IDEA_FEATURE,
  IS_EDITING_IDEA_CUSTOMER,
  ADDING_IDEA_FEATURE,
  ACTIVE_IDEA_FEATURE_INDEX,
  ADD_CONTENT_IDEA_FEATURE,
  EDITED_IDEA_FEATURE_TITLE,
  ADDING_IDEA_CUSTOMER,
  ACTIVE_IDEA_CUSTOMER_INDEX,
  ADD_CONTENT_IDEA_CUSTOMER,
  EDITED_IDEA_CUSTOMER_TITLE,
  IDEA_FEATURE_DATA_TEMP,
  IDEA_REQUIREMENT_DATA_TEMP,
  BUTTON_STATE,
  IDEA_MIRO_STATE,
  GROWTH_HACKER_REPORT_DATA,
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
  BM_MODEL_SUGGESTION_REPORT_DATA,
  BM_QUESTION_LIST,
  BM_SELECTED_PROBLEM_OPTIONS,
  BM_OR_LEAN,
  BM_BM_AUTO_REPORT_DATA,
  BM_LEAN_AUTO_REPORT_DATA,
  BM_BM_ADS_REPORT_DATA,
  BM_LEAN_ADS_REPORT_DATA,
  BM_BM_CUSTOM_REPORT_DATA,
  BM_LEAN_CUSTOM_REPORT_DATA,
  IS_LOGIN_POPUP_OPEN,
  IS_MARKETING,
  MARKETING_MBTI_RESULT,
  MARKETING_RESEARCH_REPORT_DATA,
  MARKETING_BM_REPORT_DATA,
  MARKETING_CUSTOMER_DATA,
  MARKETING_SELECTED_CUSTOMER,
  MARKETING_FINAL_CUSTOMER,
  MARKETING_FINAL_REPORT_DATA,
  MARKETING_HAVE_IEDA,
  GROWTH_HACKER_RECOMMENDED_SOLUTION,
  GROWTH_HACKER_SELECTED_SOLUTION,
  STRATEGY_CONSULTANT_REPORT_DATA,
  IS_PERSONA_ACCESSIBLE,
  PERSONA_BUTTON_STATE_1,
  BUSINESS_ANALYSIS,
  PERSONA_STEP,
  CREDIT_CUSTOM_THEORY,
  CREDIT_ADDITIONAL_QUESTION,
  CREDIT_INDEPTH_INTERVIEW,
  CREDIT_REQUEST_CUSTOM_PERSONA,
  CREDIT_REQUEST_BUSINESS_PERSONA,
  EVENT_TITLE,
  EVENT_STATE,
  TRIAL_STATE,
  TOOL_LOADING,
  TOOL_STEP,
  TOOL_ID,
  TARGET_DISCOVERY_INFO,
  TARGET_DISCOVERY_PERSONA,
  TARGET_DISCOVERY_SCENARIO,
  TARGET_DISCOVERY_FINAL_REPORT,
  CUSTOMER_VALUE_ANALYZER_INFO,
  CUSTOMER_VALUE_ANALYZER_PERSONA,
  CUSTOMER_VALUE_ANALYZER_JOURNEY_MAP,
  CUSTOMER_VALUE_ANALYZER_FACTOR,
  CUSTOMER_VALUE_ANALYZER_CLUSTERING,
  CUSTOMER_VALUE_ANALYZER_POSITIONING,
  CUSTOMER_VALUE_ANALYZER_FINAL_REPORT,
  CUSTOMER_VALUE_ANALYZER_SELECTED_PERSONA,
  IDEA_GENERATOR_INFO,
  IDEA_GENERATOR_PERSONA,
  IDEA_GENERATOR_IDEA,
  IDEA_GENERATOR_CLUSTERING,
  IDEA_GENERATOR_FINAL_REPORT,
  IDEA_GENERATOR_SELECTED_PERSONA,
  IDEA_GENERATOR_KNOW_TARGET,
  IDEA_GENERATOR_CUSTOM_TARGET,
  DESIGN_ANALYSIS_EMOTION_ANALYSIS,
  DESIGN_ANALYSIS_BUSINESS_INFO,
  DESIGN_ANALYSIS_UPLOADED_FILES,
  DESIGN_ANALYSIS_FILE_ID,
  DESIGN_ANALYSIS_SELECTED_PERSONA,
  DESIGN_ANALYSIS_EMOTION_TARGET,
  DESIGN_ANALYSIS_EMOTION_SCALE,
  DESIGN_ANALYSIS_FILE_NAMES,
  EXPERT_BUTTON_STATE,
  ADDITION_BUTTON_STATE,
  CUSTOMER_ADDITION_BUTTON_STATE,
  PSST_BUSINESS_INFO,
  PROJECT_ANALYSIS_MULTIMODAL,
  PSST_ANALYSIS_RESULTS,
  PSST_FILE_NAMES,
  PSST_REPORT,
  PSST_SELECTED_TEMPLETE,
  QUICK_SURVEY_PROJECT_DESCRIPTION,
  QUICK_SURVEY_ANALYSIS,
  QUICK_SURVEY_SELECTED_QUESTION,
  QUICK_SURVEY_DETAIL_INFO,
  QUICK_SURVEY_RECRUITING_CONDITION,
  QUICK_SURVEY_SURVEY_METHOD,
  QUICK_SURVEY_CUSTOM_GUIDE,
  QUICK_SURVEY_PRESET_DATA,
  QUICK_SURVEY_PERSONA_GROUP,
  QUICK_SURVEY_INTERVIEW,
  QUICK_SURVEY_REPORT,
  QUICK_SURVEY_STATIC_DATA,
  QUICK_SURVEY_INTERVIEW_MODE_TYPE,
  PROJECT_EDUCATION_STATE,
  IDEA_GENERATION_PROBLEM_LIST,
  KANO_MODEL_SELECTED_IDEA,
  KANO_MODEL_CLUSTERING,
  KANO_MODEL_CLUSTERING_NAME,
  KANO_MODEL_EVALUATION,
  KANO_MODEL_PRODUCT_ANALYSIS,
  CUSTOMER_JOURNEY_MAP_SELECTED_PERSONA,
  CUSTOMER_JOURNEY_MAP_MOMENT_ANALYSIS,
  CUSTOMER_JOURNEY_MAP_SELECTED_DIRECTION,
  CUSTOMER_JOURNEY_MAP_REPORT,
  CUSTOMER_JOURNEY_MAP_SELECTED_DIRECTION_INDEX,
  IDEA_GENERATION_SELECTED_START_POSITION,
  ISSUE_GENERATION_SELECTED_PURPOSE,
  ISSUE_GENERATION_PROBLEM_LIST,
  ISSUE_GENERATION_PROBLEM_LIST_TITLE,
  ISSUE_GENERATION_START_POSITION,
  ISSUE_GENERATION_SELECTED_START_POSITION,
  KEYWORDS_GENERATION_SELECTED_ISSUE,
  KEYWORDS_GENERATION_TAG,
  IDEA_GENERATION_START_POSITION,
  CONCEPT_DEFINITION_FIRST_REPORT,
  CONCEPT_DEFINITION_FINAL_REPORT,
  BUSINESS_MODEL_CANVAS_MARKDOWN,
  CREDIT_CREATE_TOOL_LOADED,
  IDEA_EVALUATE_SELECTED_LIST,
  IDEA_EVALUATE_SELECTED_KANO_MODEL_INDEX,
  IDEA_EVALUATE_COMPARISON_EDUCATION,
  IDEA_EVALUATE_GRAPH_DATA,
  EDUCATION_TOOL_COMPLETED_STATUS,
  ADMIN_STATE,
  EDUCATION_STATE,
  BUSINESS_MODEL_CANVAS_GRAPH_ITEMS,
  BUSINESS_MODEL_CANVAS_POPUP_OPTIONS,
  BUSINESS_MODEL_CANVAS_SELECTED_POPUP_OPTIONS,
  BUSINESS_MODEL_CANVAS_SELECTED_CONCEPT_DEFINITION,
  BUSINESS_MODEL_CANVAS_INITIAL_GRAPH_DATA,
  KANO_MODEL_INSIGHT,
  PRFAQ_COMPANY_INFO,
  SINGLE_INTERVIEW_REPORT_TAB2,
  KANO_MODEL_SELECTED_IDEA_ID,
  KANO_MODEL_MODIFIED_IDEA_DATA,
  BUSINESS_MODEL_CANVAS_FINAL_INSIGHT_DATA,
} from "../../AtomStates";
import {
  ContentsWrap,
  TabWrapType4,
  TabButtonType4Main,
  ExploreList,
  ExploreCard,
  MainContent,
} from "../../../assets/styles/BusinessAnalysisStyle";
import { H1, Body1, Body3, Caption1 } from "../../../assets/styles/Typography";
import images from "../../../assets/styles/Images";
import { palette } from "../../../assets/styles/Palette";
import OrganismIncNavigation from "../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../Global/molecules/MoleculeHeader";
import { useDynamicViewport } from "../../../assets/DynamicViewport";
import { CreditInfo, createChatOnServer } from "../../../utils/indexedDB";

const PageToolListSaas = () => {
  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기
  const [educationTools, setEducationTools] = useState([]);

  useEffect(() => {
    // TODO: 추후 API 연결 필요
    const toolsData = [
      {
        tool_id: "1",
        tool_type: "공감하기",
        tool_name: "심층 인터뷰 룸",
        tool_path: "/Persona3Single",
        tool_description:
          "1:1 인터뷰를 통해 개별 사용자의 심층적인 인사이트와 핵심 니즈를 탐색하는 도구",
        tool_image: "ImgExplore12",
        is_active: true,
        overlay_message: null,
      },
      {
        tool_id: "2",
        tool_type: "공감하기",
        tool_name: "그룹 인터뷰 룸",
        tool_path: "/Persona3Multiple",
        tool_description:
          "소규모 그룹과의 대화를 통해 다양한 관점을 수집하고 핵심 인사이트를 도출하는 도구",
        tool_image: "ImgExplore13",
        is_active: true,
        overlay_message: null,
      },
      {
        tool_id: "3",
        tool_type: "공감하기",
        tool_name: "고객 여정 지도",
        tool_path: "/CustomerJourneyMap",
        tool_description:
          "다양한 유형의 고객이 언제, 어디서, 어떤 생각과 불편을 겪는지 흐름을 따라 정리해요",
        tool_image: "ImgExplore16",
        is_active: true,
        overlay_message: null,
      },
      {
        tool_id: "4",
        tool_type: "문제정의",
        tool_name: "핵심 문제 정의",
        tool_path: "/IssueGeneration",
        tool_description: "고객의 문제와 요구를 식별하고 우선순위를 정하는 툴",
        tool_image: "ImgExplore17",
        is_active: true,
        overlay_message: null,
      },
      {
        tool_id: "5",
        tool_type: "문제정의",
        tool_name: "통합 니즈 작성",
        tool_path: "/NeedsKeywordsGeneration",
        tool_description: "고객의 니즈를 키워드로 정리하는 툴",
        tool_image: "ImgExplore18",
        is_active: true,
        overlay_message: null,
      },
      {
        tool_id: "6",
        tool_type: "솔루션 탐색",
        tool_name: "아이디어 발산",
        tool_path: "/IdeaGeneration",
        tool_description:
          "고객의 불편과 니즈를 기반으로 다양한 AI 페르소나와 함께 아이디어를 발산해 보세요",
        tool_image: "ImgExplore19",
        is_active: true,
        overlay_message: null,
      },
      {
        tool_id: "7",
        tool_type: "솔루션 탐색",
        tool_name: "카노 모델",
        tool_path: "/KanoModelCCEI",
        tool_description:
          "도출된 아이디어가 정말 매력적인지, 꼭 필요한지 고객 입장에서 하나하나 반응을 확인하세요",
        tool_image: "ImgExplore20",
        is_active: true,
        overlay_message: null,
      },
      {
        tool_id: "8",
        tool_type: "솔루션 탐색",
        tool_name: "아이디어 평가",
        tool_path: "/IdeaEvaluate",
        tool_description:
          "고객이 가장 원하고 효과가 큰 아이디어를 선별하여 실행 순서를 정하세요",
        tool_image: "ImgExplore21",
        is_active: true,
        overlay_message: null,
      },
      {
        tool_id: "9",
        tool_type: "비즈니스 모델링",
        tool_name: "컨셉 정의서",
        tool_path: "/ConceptDefinition",
        tool_description:
          "컨셉 정의를 통해 비즈니스 아이디어를 정의하고 평가해드려요",
        tool_image: "ImgExplore22",
        is_active: true,
        overlay_message: null,
      },
      {
        tool_id: "10",
        tool_type: "비즈니스 모델링",
        tool_name: "NPS",
        tool_path: "/NPS",
        tool_description:
          "완성된 아이디어나 제품 개념을 보여주고, 고객이 얼마나 추천하고 싶은지 확인하세요",
        tool_image: "ImgExplore23",
        is_active: true,
        overlay_message: null,
      },
      {
        tool_id: "11",
        tool_type: "비즈니스 모델링",
        tool_name: "비즈니스 모델 캔버스",
        tool_path: "/BusinessModelCanvas",
        tool_description:
          "누구에게, 어떤 가치를, 어떤 방식으로 전달할지를 정리해 실제 사업 모델을 그려보세요",
        tool_image: "ImgExplore24",
        is_active: true,
        overlay_message: null,
      },
      {
        tool_id: "12",
        tool_type: "비즈니스 모델링",
        tool_name: "PRFAQ",
        tool_path: "/PRFAQ",
        tool_description:
          "비즈니스 모델 캔버스를 통해 정의한 비즈니스 모델을 기반으로 작성한 PR FAQ를 확인해 보세요",
        tool_image: "ImgExplore25",
        is_active: true,
        overlay_message: null,
      },
    ];
    const eduName = sessionStorage.getItem("educationName");

    if (
      eduName === "서울창조경제혁신센터" ||
      eduName === "서울창조경제혁신센터-02"
    ) {
      setEducationTools([
        {
          tool_id: "1",
          tool_type: "공감하기",
          tool_name: "심층 인터뷰 룸",
          tool_path: "/Persona3Single",
          tool_description:
            "1:1 인터뷰를 통해 개별 사용자의 심층적인 인사이트와 핵심 니즈를 탐색하는 도구",
          tool_image: "ImgExplore12",
          is_active: true,
          overlay_message: null,
        },
        {
          tool_id: "2",
          tool_type: "공감하기",
          tool_name: "그룹 인터뷰 룸",
          tool_path: "/Persona3Multiple",
          tool_description:
            "소규모 그룹과의 대화를 통해 다양한 관점을 수집하고 핵심 인사이트를 도출하는 도구",
          tool_image: "ImgExplore13",
          is_active: true,
          overlay_message: null,
        },
        {
          tool_id: "7",
          tool_type: "솔루션 탐색",
          tool_name: "카노 모델",
          tool_path: "/KanoModelCCEI",
          tool_description:
            "도출된 아이디어가 정말 매력적인지, 꼭 필요한지 고객 입장에서 하나하나 반응을 확인하세요",
          tool_image: "ImgExplore20",
          is_active: true,
          overlay_message: null,
        },
        {
          tool_id: "9",
          tool_type: "비즈니스 모델링",
          tool_name: "컨셉 정의서",
          tool_path: "/ConceptDefinition",
          tool_description:
            "컨셉 정의를 통해 비즈니스 아이디어를 정의하고 평가해드려요",
          tool_image: "ImgExplore22",
          is_active: true,
          overlay_message: null,
        },
        {
          tool_id: "10",
          tool_type: "비즈니스 모델링",
          tool_name: "NPS",
          tool_path: "/NPS",
          tool_description:
            "완성된 아이디어나 제품 개념을 보여주고, 고객이 얼마나 추천하고 싶은지 확인하세요",
          tool_image: "ImgExplore23",
          is_active: true,
          overlay_message: null,
        },
        {
          tool_id: "11",
          tool_type: "비즈니스 모델링",
          tool_name: "비즈니스 모델 캔버스",
          tool_path: "/BusinessModelCanvas",
          tool_description:
            "누구에게, 어떤 가치를, 어떤 방식으로 전달할지를 정리해 실제 사업 모델을 그려보세요",
          tool_image: "ImgExplore24",
          is_active: true,
          overlay_message: null,
        },
        {
          tool_id: "12",
          tool_type: "비즈니스 모델링",
          tool_name: "PRFAQ",
          tool_path: "/PRFAQ",
          tool_description:
            "비즈니스 모델 캔버스를 통해 정의한 비즈니스 모델을 기반으로 작성한 PR FAQ를 확인해 보세요",
          tool_image: "ImgExplore25",
          is_active: true,
          overlay_message: null,
        },
      ]);
    } else {
      setEducationTools(toolsData);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [adminState, setAdminState] = useAtom(ADMIN_STATE);
  const [projectEducationState] = useAtom(PROJECT_EDUCATION_STATE);
  const [educationState, setEducationState] = useAtom(EDUCATION_STATE);
  const [, setCreditCreateToolLoaded] = useAtom(CREDIT_CREATE_TOOL_LOADED);

  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [, setToolLoading] = useAtom(TOOL_LOADING);
  const [, setIsPersonaAccessible] = useAtom(IS_PERSONA_ACCESSIBLE);
  const [, setPersonaButtonState1] = useAtom(PERSONA_BUTTON_STATE_1);
  const [, setExpertButtonState] = useAtom(EXPERT_BUTTON_STATE);
  const [, setPersonaStep] = useAtom(PERSONA_STEP);

  const [, setStrategyConsultantReportData] = useAtom(
    STRATEGY_CONSULTANT_REPORT_DATA
  );

  const [, setGrowthHackerRecommendedSolution] = useAtom(
    GROWTH_HACKER_RECOMMENDED_SOLUTION
  );
  const [, setGrowthHackerSelectedSolution] = useAtom(
    GROWTH_HACKER_SELECTED_SOLUTION
  );

  const [, setBmModelSuggestionReportData] = useAtom(
    BM_MODEL_SUGGESTION_REPORT_DATA
  );
  const [, setBmQuestionList] = useAtom(BM_QUESTION_LIST);
  const [, setBmSelectedProblemOptions] = useAtom(BM_SELECTED_PROBLEM_OPTIONS);
  const [, setBmOrLean] = useAtom(BM_OR_LEAN);
  const [, setBmBmAutoReportData] = useAtom(BM_BM_AUTO_REPORT_DATA);
  const [, setBmLeanAutoReportData] = useAtom(BM_LEAN_AUTO_REPORT_DATA);
  const [, setBmBmAdsReportData] = useAtom(BM_BM_ADS_REPORT_DATA);
  const [, setBmLeanAdsReportData] = useAtom(BM_LEAN_ADS_REPORT_DATA);
  const [, setBmBmCustomReportData] = useAtom(BM_BM_CUSTOM_REPORT_DATA);
  const [, setBmLeanCustomReportData] = useAtom(BM_LEAN_CUSTOM_REPORT_DATA);
  const [, setSurveyGuidelineDetailReportData] = useAtom(
    SURVEY_GUIDELINE_DETAIL_REPORT_DATA
  );
  const [, setSurveyGuidelineReportData] = useAtom(
    SURVEY_GUIDELINE_REPORT_DATA
  );
  const [, setSurveyGoalSuggestionList] = useAtom(SURVEY_GOAL_SUGGESTION_LIST);
  const [, setSurveyGoalFixed] = useAtom(SURVEY_GOAL_FIXED);
  const [, setSurveyQuestionList] = useAtom(SURVEY_QUESTION_LIST);
  const [, setCaseReportData] = useAtom(CASE_REPORT_DATA);
  const [, setCaseHashTag] = useAtom(CASE_HASH_TAG);

  const [, setPriceScrapData] = useAtom(PRICE_SCRAP_DATA);
  const [, setPriceReportData] = useAtom(PRICE_REPORT_DATA);
  const [, setPriceProduct] = useAtom(PRICE_PRODUCT);
  const [, setPriceSelectedProductSegmentation] = useAtom(
    PRICE_SELECTED_PRODUCT_SEGMENTATION
  );
  const [, setPriceProductSegmentation] = useAtom(PRICE_PRODUCT_SEGMENTATION);
  const [, setButtonState] = useAtom(BUTTON_STATE);
  const [, setIsEditingIdeaFeature] = useAtom(IS_EDITING_IDEA_FEATURE);
  const [, setIsEditingIdeaCustomer] = useAtom(IS_EDITING_IDEA_CUSTOMER);
  const [, setAddingIdeaFeature] = useAtom(ADDING_IDEA_FEATURE);
  const [, setActiveIdeaFeatureIndex] = useAtom(ACTIVE_IDEA_FEATURE_INDEX);
  const [, setAddContentIdeaFeature] = useAtom(ADD_CONTENT_IDEA_FEATURE);
  const [, setEditedIdeaFeatureTitle] = useAtom(EDITED_IDEA_FEATURE_TITLE);
  const [, setAddingIdeaCustomer] = useAtom(ADDING_IDEA_CUSTOMER);
  const [, setActiveIdeaCustomerIndex] = useAtom(ACTIVE_IDEA_CUSTOMER_INDEX);
  const [, setAddContentIdeaCustomer] = useAtom(ADD_CONTENT_IDEA_CUSTOMER);
  const [, setEditedIdeaCustomerTitle] = useAtom(EDITED_IDEA_CUSTOMER_TITLE);
  const [, setIdeaFeatureData] = useAtom(IDEA_FEATURE_DATA);
  const [, setIdeaRequirementData] = useAtom(IDEA_REQUIREMENT_DATA);
  const [, setIdeaFeatureDataTemp] = useAtom(IDEA_FEATURE_DATA_TEMP);
  const [, setIdeaRequirementDataTemp] = useAtom(IDEA_REQUIREMENT_DATA_TEMP);
  const [, setIdeaList] = useAtom(IDEA_LIST);
  const [, setIdeaGroup] = useAtom(IDEA_GROUP);
  const [, setIdeaPriority] = useAtom(IDEA_PRIORITY);

  const [, setPocPersonaList] = useAtom(POC_PERSONA_LIST);
  const [, setRecommendedTargetData] = useAtom(RECOMMENDED_TARGET_DATA);
  const [, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET);
  const [, setSelectedPocOptions] = useAtom(SELECTED_POC_OPTIONS);
  const [, setAnalysisButtonState] = useAtom(ANALYSIS_BUTTON_STATE);
  const [, setIsExpertInsightAccessible] = useAtom(
    IS_EXPERT_INSIGHT_ACCESSIBLE
  );

  const [, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO); // 상태값으로 설정
  const [, setApproachPath] = useAtom(APPROACH_PATH);

  useEffect(() => {
    setSelectedExpertIndex(SELECTED_EXPERT_INDEX);
  }, []);

  const [, setConversationId] = useAtom(CONVERSATION_ID);
  const [, setConversation] = useAtom(CONVERSATION);
  const [, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [, setTitleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [, setMainFeaturesOfBusinessInformation] = useAtom(
    MAIN_FEATURES_OF_BUSINESS_INFORMATION
  );
  const [, setMainCharacteristicOfBusinessInformation] = useAtom(
    MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION
  );
  const [, setBusinessInformationTargetCustomer] = useAtom(
    BUSINESS_INFORMATION_TARGET_CUSTOMER
  );
  const [, setSelectedAdditionalKeyword] = useAtom(SELECTED_ADDITIONAL_KEYWORD);

  const [, setAdditionalReportData] = useAtom(ADDITIONAL_REPORT_DATA);

  const [, setStrategyReportData] = useAtom(STRATEGY_REPORT_DATA);

  const [, setSelectedCustomerAdditionalKeyword] = useAtom(
    SELECTED_CUSTOMER_ADDITIONAL_KEYWORD
  );
  const [, setCustomerAdditionalReportData] = useAtom(
    CUSTOMER_ADDITIONAL_REPORT_DATA
  );

  const [, setIsEditingNow] = useAtom(IS_EDITING_NOW);

  const [, setPocDetailReportData] = useAtom(POC_DETAIL_REPORT_DATA);
  const [, setIdeaMiroState] = useAtom(IDEA_MIRO_STATE);
  const [, setGrowthHackerReportData] = useAtom(GROWTH_HACKER_REPORT_DATA);
  const [, setGrowthHackerDetailReportData] = useAtom(
    GROWTH_HACKER_DETAIL_REPORT_DATA
  );
  const [, setKpiQuestionList] = useAtom(KPI_QUESTION_LIST);

  const [, setIsMarketing] = useAtom(IS_MARKETING);
  const [, setMarketingMbtiResult] = useAtom(MARKETING_MBTI_RESULT);
  const [, setMarketingResearchReportData] = useAtom(
    MARKETING_RESEARCH_REPORT_DATA
  );
  const [, setMarketingBmReportData] = useAtom(MARKETING_BM_REPORT_DATA);
  const [, setMarketingCustomerData] = useAtom(MARKETING_CUSTOMER_DATA);
  const [, setMarketingSelectedCustomer] = useAtom(MARKETING_SELECTED_CUSTOMER);
  const [, setMarketingFinalCustomer] = useAtom(MARKETING_FINAL_CUSTOMER);
  const [, setMarketingFinalReportData] = useAtom(MARKETING_FINAL_REPORT_DATA);
  const [, setMarketingHaveIdea] = useAtom(MARKETING_HAVE_IEDA);

  const [businessAnalysis, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);

  // 크레딧 관련
  const [, setCreditRequestCustomPersona] = useAtom(
    CREDIT_REQUEST_CUSTOM_PERSONA
  );
  const [, setCreditRequestBusinessPersona] = useAtom(
    CREDIT_REQUEST_BUSINESS_PERSONA
  );
  const [, setCreditCustomTheory] = useAtom(CREDIT_CUSTOM_THEORY);
  const [, setCreditAdditionalQuestion] = useAtom(CREDIT_ADDITIONAL_QUESTION);
  const [, setCreditIndepthInterview] = useAtom(CREDIT_INDEPTH_INTERVIEW);
  const [, setEventTitle] = useAtom(EVENT_TITLE);
  const [, setEventState] = useAtom(EVENT_STATE);
  const [, setTrialState] = useAtom(TRIAL_STATE);

  // 각 툴 페이지 (예: TargetDiscovery.jsx, CustomerValueAnalyzer.jsx 등)의 최상단에 추가

  // 필요한 atom들을 import
  const [, setToolStep] = useAtom(TOOL_STEP);
  const [, setToolId] = useAtom(TOOL_ID);

  const [, setTargetDiscoveryInfo] = useAtom(TARGET_DISCOVERY_INFO);
  const [, setTargetDiscoveryPersona] = useAtom(TARGET_DISCOVERY_PERSONA);
  const [, setTargetDiscoveryScenario] = useAtom(TARGET_DISCOVERY_SCENARIO);
  const [, setTargetDiscoveryFinalReport] = useAtom(
    TARGET_DISCOVERY_FINAL_REPORT
  );

  const [, setCustomerValueAnalyzerInfo] = useAtom(
    CUSTOMER_VALUE_ANALYZER_INFO
  );
  const [, setCustomerValueAnalyzerPersona] = useAtom(
    CUSTOMER_VALUE_ANALYZER_PERSONA
  );
  const [, setCustomerValueAnalyzerJourneyMap] = useAtom(
    CUSTOMER_VALUE_ANALYZER_JOURNEY_MAP
  );
  const [, setCustomerValueAnalyzerFactor] = useAtom(
    CUSTOMER_VALUE_ANALYZER_FACTOR
  );
  const [, setCustomerValueAnalyzerClustering] = useAtom(
    CUSTOMER_VALUE_ANALYZER_CLUSTERING
  );
  const [, setCustomerValueAnalyzerPositioning] = useAtom(
    CUSTOMER_VALUE_ANALYZER_POSITIONING
  );
  const [, setCustomerValueAnalyzerFinalReport] = useAtom(
    CUSTOMER_VALUE_ANALYZER_FINAL_REPORT
  );
  const [, setCustomerValueAnalyzerSelectedPersona] = useAtom(
    CUSTOMER_VALUE_ANALYZER_SELECTED_PERSONA
  );

  const [, setIdeaGeneratorInfo] = useAtom(IDEA_GENERATOR_INFO);
  const [, setIdeaGeneratorPersona] = useAtom(IDEA_GENERATOR_PERSONA);
  const [, setIdeaGeneratorIdea] = useAtom(IDEA_GENERATOR_IDEA);
  const [, setIdeaGeneratorClustering] = useAtom(IDEA_GENERATOR_CLUSTERING);
  const [, setIdeaGeneratorFinalReport] = useAtom(IDEA_GENERATOR_FINAL_REPORT);
  const [, setIdeaGeneratorSelectedPersona] = useAtom(
    IDEA_GENERATOR_SELECTED_PERSONA
  );
  const [, setIdeaGeneratorKnowTarget] = useAtom(IDEA_GENERATOR_KNOW_TARGET);
  const [, setIdeaGeneratorCustomTarget] = useAtom(
    IDEA_GENERATOR_CUSTOM_TARGET
  );

  const [, setDesignAnalysisEmotionAnalysis] = useAtom(
    DESIGN_ANALYSIS_EMOTION_ANALYSIS
  );
  const [, setDesignAnalysisBusinessInfo] = useAtom(
    DESIGN_ANALYSIS_BUSINESS_INFO
  );
  const [, setDesignAnalysisUploadedFiles] = useAtom(
    DESIGN_ANALYSIS_UPLOADED_FILES
  );
  const [, setDesignAnalysisFileId] = useAtom(DESIGN_ANALYSIS_FILE_ID);
  const [, setDesignAnalysisSelectedPersona] = useAtom(
    DESIGN_ANALYSIS_SELECTED_PERSONA
  );
  const [, setDesignAnalysisEmotionTarget] = useAtom(
    DESIGN_ANALYSIS_EMOTION_TARGET
  );
  const [, setDesignAnalysisEmotionScale] = useAtom(
    DESIGN_ANALYSIS_EMOTION_SCALE
  );
  const [, setDesignAnalysisFileNames] = useAtom(DESIGN_ANALYSIS_FILE_NAMES);
  const [, setAdditionButtonState] = useAtom(ADDITION_BUTTON_STATE);
  const [, setCustomerAdditionButtonState] = useAtom(
    CUSTOMER_ADDITION_BUTTON_STATE
  );

  const [, setPsstBusinessInfo] = useAtom(PSST_BUSINESS_INFO);
  const [, setProjectAnalysisMultimodal] = useAtom(PROJECT_ANALYSIS_MULTIMODAL);
  const [, setPsstAnalysisResults] = useAtom(PSST_ANALYSIS_RESULTS);
  const [, setPsstFileNames] = useAtom(PSST_FILE_NAMES);
  const [, setPsstReport] = useAtom(PSST_REPORT);
  const [, setPsstSelectedTemplte] = useAtom(PSST_SELECTED_TEMPLETE);

  const [checkRefresh, setCheckRefresh] = useState(false);
  const [, setShowHint] = useState(true);
  const [, setIsPopupRegex] = useState(false);
  const [, setIsPopupRegex2] = useState(false);
  const [isPopupLogin, setIsPopupLogin] = useState(false); // 로그인 상태가 아닐 때 팝업을 띄우기 위한 상태
  const [, setLoginPopupOpen] = useAtom(IS_LOGIN_POPUP_OPEN); // 로그인 팝업 상태 관리
  const [isComingSoon, setIsComingSoon] = useState(false);
  const [, setFloatingText] = useState("창업 MBTI 테스트");

  const [, setQuickSurveyProjectDescription] = useAtom(
    QUICK_SURVEY_PROJECT_DESCRIPTION
  );
  const [, setQuickSurveyAnalysis] = useAtom(QUICK_SURVEY_ANALYSIS);
  const [, setQuickSurveySelectedQuestion] = useAtom(
    QUICK_SURVEY_SELECTED_QUESTION
  );
  const [, setQuickSurveyDetailInfo] = useAtom(QUICK_SURVEY_DETAIL_INFO);
  const [, setQuickSurveyRecruitingCondition] = useAtom(
    QUICK_SURVEY_RECRUITING_CONDITION
  );
  const [, setQuickSurveySurveyMethod] = useAtom(QUICK_SURVEY_SURVEY_METHOD);
  const [, setQuickSurveyCustomGuide] = useAtom(QUICK_SURVEY_CUSTOM_GUIDE);
  const [, setQuickSurveyPresetData] = useAtom(QUICK_SURVEY_PRESET_DATA);
  const [, setQuickSurveyPersonaGroup] = useAtom(QUICK_SURVEY_PERSONA_GROUP);
  const [, setQuickSurveyInterview] = useAtom(QUICK_SURVEY_INTERVIEW);
  const [, setQuickSurveyReport] = useAtom(QUICK_SURVEY_REPORT);
  const [, setQuickSurveyStaticData] = useAtom(QUICK_SURVEY_STATIC_DATA);
  const [, setQuickSurveyInterviewModeType] = useAtom(
    QUICK_SURVEY_INTERVIEW_MODE_TYPE
  );
  //!교육툴
  const [, setCompletedStatus] = useAtom(EDUCATION_TOOL_COMPLETED_STATUS);
  const [, setIdeaGenerationProblemList] = useAtom(
    IDEA_GENERATION_PROBLEM_LIST
  );
  const [, setIdeaGenerationSelectedStartPosition] = useAtom(
    IDEA_GENERATION_SELECTED_START_POSITION
  );
  const [, setIdeaGenerationStartPosition] = useAtom(
    IDEA_GENERATION_START_POSITION
  );
  const [, setSelectedKanoModelIdea] = useAtom(KANO_MODEL_SELECTED_IDEA);
  const [, setKanoModelClustering] = useAtom(KANO_MODEL_CLUSTERING);
  const [, setKanoModelClusteringName] = useAtom(KANO_MODEL_CLUSTERING_NAME);
  const [, setKanoModelInsight] = useAtom(KANO_MODEL_INSIGHT);
  const [, setKanoModelEvaluation] = useAtom(KANO_MODEL_EVALUATION);
  const [, setKanoModelProductAnalysis] = useAtom(KANO_MODEL_PRODUCT_ANALYSIS);
  const [, setKanoModelSelectedIdeaId] = useAtom(KANO_MODEL_SELECTED_IDEA_ID);
  const [, setKanoModelModifiedIdeaData] = useAtom(
    KANO_MODEL_MODIFIED_IDEA_DATA
  );
  const [, setCustomerJourneyMapSelectedPersona] = useAtom(
    CUSTOMER_JOURNEY_MAP_SELECTED_PERSONA
  );
  const [, setCustomerJourneyMapMomentAnalysis] = useAtom(
    CUSTOMER_JOURNEY_MAP_MOMENT_ANALYSIS
  );
  const [, setCustomerJourneyMapSelectedDirection] = useAtom(
    CUSTOMER_JOURNEY_MAP_SELECTED_DIRECTION
  );
  const [, setCustomerJourneyMapReport] = useAtom(CUSTOMER_JOURNEY_MAP_REPORT);
  const [, setCustomerJourneyMapSelectedDirectionIndex] = useAtom(
    CUSTOMER_JOURNEY_MAP_SELECTED_DIRECTION_INDEX
  );
  const [, setIssueGenerationSelectedPurpose] = useAtom(
    ISSUE_GENERATION_SELECTED_PURPOSE
  );
  const [, setIssueGenerationProblemList] = useAtom(
    ISSUE_GENERATION_PROBLEM_LIST
  );
  const [, setIssueGenerationProblemListTitle] = useAtom(
    ISSUE_GENERATION_PROBLEM_LIST_TITLE
  );
  const [, setIssueGenerationStartPosition] = useAtom(
    ISSUE_GENERATION_START_POSITION
  );
  const [, setIssueGenerationSelectedStartPosition] = useAtom(
    ISSUE_GENERATION_SELECTED_START_POSITION
  );
  const [, setKeywordsGenerationSelectedIssue] = useAtom(
    KEYWORDS_GENERATION_SELECTED_ISSUE
  );
  const [, setKeywordsGenerationTag] = useAtom(KEYWORDS_GENERATION_TAG);
  const [, setConceptDefinitionFirstReport] = useAtom(
    CONCEPT_DEFINITION_FIRST_REPORT
  );
  const [, setConceptDefinitionFinalReport] = useAtom(
    CONCEPT_DEFINITION_FINAL_REPORT
  );
  const [, setBusinessModelCanvasMarkdown] = useAtom(
    BUSINESS_MODEL_CANVAS_MARKDOWN
  );
  const [, setIdeaEvaluateSelectedList] = useAtom(IDEA_EVALUATE_SELECTED_LIST);
  const [, setIdeaEvaluateSelectedKanoModelIndex] = useAtom(
    IDEA_EVALUATE_SELECTED_KANO_MODEL_INDEX
  );
  const [, setIdeaEvaluateComparisonEducation] = useAtom(
    IDEA_EVALUATE_COMPARISON_EDUCATION
  );
  const [, setIdeaEvaluateGraphData] = useAtom(IDEA_EVALUATE_GRAPH_DATA);
  const [, setBusinessModelCanvasGraphItems] = useAtom(
    BUSINESS_MODEL_CANVAS_GRAPH_ITEMS
  );
  const [, setBMCanvasPopupOptions] = useAtom(
    BUSINESS_MODEL_CANVAS_POPUP_OPTIONS
  );
  const [, setBMCanvasSelectedPopupOptions] = useAtom(
    BUSINESS_MODEL_CANVAS_SELECTED_POPUP_OPTIONS
  );
  const [, setBusinessModelCanvasSelectedConceptDefinition] = useAtom(
    BUSINESS_MODEL_CANVAS_SELECTED_CONCEPT_DEFINITION
  );
  const [, setBMCanvasInitialGraphData] = useAtom(
    BUSINESS_MODEL_CANVAS_INITIAL_GRAPH_DATA
  );
  const [, setPrfaqCompanyInfo] = useAtom(PRFAQ_COMPANY_INFO);
  const [singleInterviewReportTab2, setSingleInterviewReportTab2] = useAtom(
    SINGLE_INTERVIEW_REPORT_TAB2
  );
  const [, setBusinessModelCanvasFinalInsightData] = useAtom(
    BUSINESS_MODEL_CANVAS_FINAL_INSIGHT_DATA
  );
  // 초기화 useEffect
  useEffect(() => {
    setCreditCreateToolLoaded(false);
    // !chat 초기화
    setSelectedExpertIndex("0");
    setConversationId(""); // 대화 ID 설정
    setConversation([]); // 이전 대화 내역 설정
    setConversationStage(0); // 대화 단계 설정
    setInputBusinessInfo(""); // 비즈니스 정보 설정
    setTitleOfBusinessInfo(""); // 분석 데이터 설정
    setMainFeaturesOfBusinessInformation([]); // 주요 특징 설정
    setMainCharacteristicOfBusinessInformation([]); // 주요 특징 설정
    setBusinessInformationTargetCustomer([]); // 목표 고객 설정

    // 전문가 보고서 데이터 복구
    setStrategyReportData({});

    // 필요하다면 추가 상태 업데이트
    setSelectedAdditionalKeyword([]);
    setAdditionalReportData([]);
    setCustomerAdditionalReportData([]);
    setSelectedCustomerAdditionalKeyword([]);

    setSelectedPocOptions([]);
    setSelectedPocTarget({});
    setRecommendedTargetData({});
    setPocPersonaList([]);
    setPocDetailReportData({});

    setIdeaFeatureData([]);
    setIdeaRequirementData([]);
    setIdeaFeatureDataTemp([]);
    setIdeaRequirementDataTemp([]);

    setIdeaList([]);
    setIdeaGroup({});
    setIdeaPriority([]);
    setIdeaMiroState(0);

    setButtonState({});

    setGrowthHackerRecommendedSolution([]);
    setGrowthHackerReportData([]);
    setGrowthHackerDetailReportData([]);
    setGrowthHackerSelectedSolution([]);
    setKpiQuestionList([]);
    setKanoModelInsight({});

    setPriceReportData({});
    setPriceScrapData({});
    setPriceProduct([]);
    setPriceSelectedProductSegmentation([]);
    setPriceProductSegmentation([]);

    setCaseReportData([]);
    setCaseHashTag([]);

    setSurveyGuidelineDetailReportData({});
    setSurveyGuidelineReportData({});
    setSurveyGoalSuggestionList([]);
    setSurveyGoalFixed([]);
    setSurveyQuestionList([]);

    setBmModelSuggestionReportData([]);
    setBmQuestionList([]);
    setBmSelectedProblemOptions({});
    setBmOrLean("");
    setBmBmAutoReportData([]);
    setBmLeanAutoReportData([]);
    setBmBmAdsReportData([]);
    setBmLeanAdsReportData([]);
    setBmBmCustomReportData([]);
    setBmLeanCustomReportData([]);

    setIsMarketing(false);
    setMarketingMbtiResult({});
    setMarketingResearchReportData([]);
    setMarketingBmReportData([]);
    setMarketingCustomerData([]);
    setMarketingSelectedCustomer([]);
    setMarketingFinalCustomer({});
    setMarketingFinalReportData([]);

    setStrategyConsultantReportData([]);

    // 어프로치 패스 추가 필요(보고서만 뽑고 나온 뒤에 들어가면 버튼만 추가되어 보이게)
    // set어프로치패스(2)
    setApproachPath(2);

    setIsEditingNow(false);
    setIsEditingIdeaFeature(false);
    setIsEditingIdeaCustomer(false);
    setAddingIdeaFeature(false);
    setActiveIdeaFeatureIndex(0);
    setAddContentIdeaFeature("");
    setEditedIdeaFeatureTitle("");
    setAddingIdeaCustomer(false);
    setActiveIdeaCustomerIndex(0);
    setAddContentIdeaCustomer("");
    setEditedIdeaCustomerTitle("");
    setAnalysisButtonState(0);
    setExpertButtonState(0);
    setAdditionButtonState(0);
    setCustomerAdditionButtonState(0);
    setIsExpertInsightAccessible(true); // 접근 가능 상태로 설정

    //!tool 초기화
    // 모든 관련 atom 상태 초기화
    setToolStep(0);
    setToolId("");
    setCreditCreateToolLoaded(false);
    setToolLoading(false);

    //인터뷰 초기화
    setSingleInterviewReportTab2([]);

    // Target Discovery 관련 atom 초기화
    setTargetDiscoveryInfo({});
    setTargetDiscoveryPersona([]);
    setTargetDiscoveryScenario([]);
    setTargetDiscoveryFinalReport({});

    // Customer Value Analyzer 관련 atom 초기화
    setCustomerValueAnalyzerInfo({});
    setCustomerValueAnalyzerPersona([]);
    setCustomerValueAnalyzerJourneyMap([]);
    setCustomerValueAnalyzerFactor([]);
    setCustomerValueAnalyzerClustering([]);
    setCustomerValueAnalyzerPositioning([]);
    setCustomerValueAnalyzerFinalReport({});
    setCustomerValueAnalyzerSelectedPersona([]);

    // Idea Generator 관련 atom 초기화
    setIdeaGeneratorInfo({});
    setIdeaGeneratorPersona([]);
    setIdeaGeneratorIdea([]);
    setIdeaGeneratorClustering([]);
    setIdeaGeneratorFinalReport({});
    setIdeaGeneratorSelectedPersona([]);
    setIdeaGeneratorKnowTarget(null);
    setIdeaGeneratorCustomTarget({});

    // Design Analysis 관련 atom 초기화
    setDesignAnalysisEmotionAnalysis([]);
    setDesignAnalysisBusinessInfo("");
    setDesignAnalysisUploadedFiles([]);
    setDesignAnalysisFileId([]);
    setDesignAnalysisSelectedPersona([]);
    setDesignAnalysisEmotionTarget({});
    setDesignAnalysisEmotionScale([]);
    setDesignAnalysisFileNames([]);

    setPsstBusinessInfo({});
    setProjectAnalysisMultimodal("");
    setPsstAnalysisResults([]);
    setPsstFileNames([]);
    setPsstReport("");
    setPsstSelectedTemplte([]);

    // Quick Survey 관련 atom 초기화
    setQuickSurveyProjectDescription("");
    setQuickSurveyAnalysis([]);
    setQuickSurveySelectedQuestion([]);
    setQuickSurveyDetailInfo({});
    setQuickSurveyRecruitingCondition("");
    setQuickSurveySurveyMethod([]);
    setQuickSurveyCustomGuide([]);
    setQuickSurveyPresetData([]);
    setQuickSurveyPersonaGroup([]);
    setQuickSurveyInterview([]);
    setQuickSurveyReport([]);
    setQuickSurveyStaticData([]);
    setQuickSurveyInterviewModeType("");

    //!교육툴
    setCompletedStatus(false);
    //customer journey map 초기화
    setCustomerJourneyMapSelectedPersona([]);
    setCustomerJourneyMapMomentAnalysis([]);
    setCustomerJourneyMapSelectedDirection([]);
    setCustomerJourneyMapReport([]);
    setCustomerJourneyMapSelectedDirectionIndex([]);

    //issue generation 초기화
    setIssueGenerationSelectedPurpose({});
    setIssueGenerationProblemList([]);
    setIssueGenerationProblemListTitle([]);
    setIssueGenerationStartPosition([]);
    setIssueGenerationSelectedStartPosition([]);

    setKeywordsGenerationSelectedIssue([]);
    setKeywordsGenerationTag([]);

    //idea generation education 초기화
    setIdeaGenerationProblemList([]);
    setIdeaGenerationStartPosition([]);
    setIdeaGenerationSelectedStartPosition([]);

    //kano model education 초기화
    setSelectedKanoModelIdea([]);
    setKanoModelClustering([]);
    setKanoModelClusteringName([]);
    setKanoModelEvaluation([]);
    setKanoModelProductAnalysis([]);
    setKanoModelInsight({});
    setKanoModelSelectedIdeaId("");
    setKanoModelModifiedIdeaData({});

    setIdeaEvaluateSelectedList([]);
    setIdeaEvaluateSelectedKanoModelIndex([]);
    setIdeaEvaluateComparisonEducation([]);
    setIdeaEvaluateGraphData([]);

    //concept definition education 초기화
    setConceptDefinitionFirstReport("");
    setConceptDefinitionFinalReport("");

    //business model canvas education 초기화
    setBusinessModelCanvasSelectedConceptDefinition({});
    setBusinessModelCanvasMarkdown("");
    setBusinessModelCanvasGraphItems([]);
    setBMCanvasInitialGraphData([]);
    setBMCanvasPopupOptions([]);
    setBMCanvasSelectedPopupOptions([]);
    setBusinessModelCanvasFinalInsightData([]);

    //prfaq education 초기화
    setPrfaqCompanyInfo({});
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  useEffect(() => {
    const fetchCreditInfo = async () => {
      try {
        if (isLoggedIn) {
          const response = await CreditInfo(isLoggedIn);

          if (response) {
            setCreditRequestCustomPersona(response.request_custom_persona);
            setCreditRequestBusinessPersona(response.request_business_persona);
            setCreditCustomTheory(response.custom_theory);
            setCreditAdditionalQuestion(response.additional_question);
            setCreditIndepthInterview(response.indepth_interview);
            setEventTitle(response.event_title);
            setEventState(response.event_state);
            setTrialState(response.trial_state);
          }
        }
      } catch (error) {}
    };

    // Call the API every time PageMain is rendered (or when isLoggedIn changes)
    fetchCreditInfo();
  }, [isLoggedIn]);

  const closePopupLogin = () => {
    setIsPopupLogin(false); // 로그인 필요 팝업 닫기
    setLoginPopupOpen(true);
  };

  const closeComingSoonPopup = () => {
    setIsComingSoon(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const checkboxes = document.querySelectorAll(".accordion-toggle");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          checkboxes.forEach((otherCheckbox) => {
            if (otherCheckbox !== this) {
              otherCheckbox.checked = false;
            }
          });
        }
      });
    });

    // Cleanup 이벤트 리스너
    return () => {
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener("change", () => {});
      });
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 기본 엔터 동작 방지
      handledSearch(); // 검색 함수 호출
    }
  };

  const handledSearch = async () => {
    // 로그인 상태인지 확인 후 처리
    if (isLoggedIn) {
      const regex = /^[가-힣a-zA-Z0-9\s.,'"?!()\/\-·:\\%~@#$^&*_+<>`]*$/;
      const specialChars = /^[.,'"?!()\/\-·:\\%~@#$^&*_+<>`]+$/;
      // const consecutiveSpecialChars = /[.,'"?!()\/\-·:\\%]{2,}/; // 특수문자가 2번 이상 연속되는 패턴

      // 단독으로 특수 문자만 사용된 경우
      if (specialChars.test(businessAnalysis.input.trim())) {
        setIsPopupRegex(true);
        return;
      }

      // 입력 값에 대한 정규식 및 빈 값 체크
      if (!regex.test(businessAnalysis.input)) {
        setIsPopupRegex(true);
        return;
      }
      if (businessAnalysis.input.trim() === "") {
        setIsPopupRegex2(true);
        return;
      }

      // const updatedConversation = [...conversation];

      // updatedConversation.push(
      //   {
      //     type: "system",
      //     message: `아이디어를 입력해 주셔서 감사합니다!\n지금부터 아이디어를 세분화하여 주요한 특징과 목표 고객을 파악해보겠습니다 🙌🏻`,
      //     expertIndex: 0,
      //   },
      //   { type: "analysis" }
      // );

      // await saveConversation({
      //   changingConversation: {
      //     conversation: updatedConversation,
      //     conversationStage: 2,
      //   },
      // });

      // setConversation(updatedConversation);
      // setConversationStage(2);
      setIsPersonaAccessible(true);
      setPersonaButtonState1(1);
      setPersonaStep(1);
      // saveConversation({changingConversation: {inputBusinessInfo: inputBusinessInfo}});
      // setApproachPath(-1); // 검색을 통해 들어가는 경우
      // setSelectedExpertIndex("0");
      navigate("/Persona"); //pagepersona
    } else {
      setIsPopupLogin(true); // 로그인 상태가 아니라면 로그인 팝업 띄우기
    }
  };

  //전문가 부분 누르면
  const getInitialSystemMessage = (index) => {
    switch (index) {
      case "1":
        return "안녕하세요! 저는 전략 컨설턴트 김도원입니다. \n고객 요구와 시장 현황을 파악하여, 성장을 위한 전략적 인사이트와 맞춤형 개선 방향을 지원하고 있습니다.";
      case "2":
        return "안녕하세요! 마케팅 전문가 이지현입니다. 😄 여러분의 아이디어를 효과적으로 시장에 알릴 수 있는 전략을 함께 고민해 보아요. 아이디어나 비즈니스 아이템을 여기에 작성해 주세요. 제가 분석하고, 효과적인 마케팅 전략 리포트를 준비해 드리겠습니다!";
      case "3":
        return "반갑습니다! 저는 고객 인사이트 전문가 박서연입니다. 😊 여러분의 비즈니스가 목표 고객에게 잘 다가갈 수 있도록 돕겠습니다. 아이디어나 비즈니스 아이템을 작성해 주세요. 분석 후, 타겟 고객을 정의하고 세분화 방법에 대한 리포트를 제공해 드리겠습니다!";
      case "4":
        return "안녕하세요! 저는 PoC 설계 전문가 장석훈입니다. 😊 여러분의 사업 목표에 맞춘 가설 설정과 PoC 전략을 설계하고, 성공적인 검증 과정을 지원해드립니다. 맞춤형 PoC 설계를 위해 몇가지 질문에 응답 부탁드립니다!";
      case "5":
        return "안녕하세요. 저는 아이디어 디벨로퍼 윤재민입니다.\n혼자 아이디어를 고민하다보면, 한정된 생각에 갇히기 쉽습니다. 제가 다각도로 사업 아이디어 발산을 돕고 우선순위 높은 아이디어를 선별해드려요. 아이템에 대한 설명을 해주세요 📝";
      case "6":
        return "안녕하세요. 저는 그로스 해커 김세준입니다.\n비즈니스에 적합한 성장을 목표로 데이터를 기반으로 실험하고 최적화된 전략을 제시하고 있습니다.";
      case "7":
        return "안녕하세요! 저는 가격 분석 전문가 한준혁입니다. 다양한 데이터 소스를 활용해 시장의 가격 변동을 분석하고, 적정 가격을 도출해드립니다. 경쟁사 동향과 시장 트렌드를 파악해 최적의 가격 전략을 세울 수 있도록 도와드려요.";
      case "8":
        return "안녕하세요! 저는 사례 분석 전문가 이민호입니다. 최신 데이터와 글로벌 사례등을 분석해 비즈니스에 도움을 드립니다.\n정확한 사례 분석을 위해 비즈니스 정보를 입력해 주세요 🔎";
      case "9":
        return "안녕하세요! 저는 BM 전문가 김소윤입니다.\n아이템에 최적화된 비즈니스 모델을 정의하고, 비즈니스 성과를 극대화 할 수 있도록 전략을 제안드립니다.";
      case "10":
        return "안녕하세요! 저는 조사 설계 전문가 김현우입니다.\n고객 요구와 시장 반응을 파악해 비즈니스 인사이트를 제공하고, 이를 통해 비즈니스 성장을 돕는 맞춤형 조사를 설계해드립니다. 조사 결과를 기반으로 전략적 개선 방향을 제시해 비즈니스 성과를 향상시킬 수 있습니다.\n먼저 분석이 필요한 제품이나 서비스에 대해서 알려주세요 📝";
      default:
        return "비즈니스(아이디어)를 입력해주세요.";
    }
  };

  const hadleToolSelect = (index) => {
    if (isLoggedIn) {
      setToolLoading(false);
      switch (index) {
        case "1":
          navigate("/TargetDiscovery");
          break;
        case "2":
          navigate("/CustomerValueAnalyzer");
          break;
        case "3":
          navigate("/IdeaGenerator");
          break;
        case "4":
          navigate("/DesignAnalysis");
          break;
      }
    } else {
      setIsPopupLogin(true);
    }
  };

  //전문가 부분 누르면
  const handledExpertSelect = (index) => {
    if (isLoggedIn) {
      const initialMessage = getInitialSystemMessage(index);

      setConversation(
        [
          {
            type: "system",
            message: initialMessage,
            expertIndex: index,
          },
          {
            type: "expertBusinessAnalysis",
          },
          index === "1"
            ? [
                {
                  type: "system",
                  message:
                    "본격적인 전략 컨설팅을 시작해볼까요? 먼저 시장 현황을 파악해보겠습니다.",
                  expertIndex: -1,
                },
                { type: "strategyButton" },
              ]
            : index === "7"
            ? [
                {
                  type: "system",
                  message: "지금 바로 시장 가격 분석을 진행하겠습니다.",
                  expertIndex: -1,
                },
                { type: "priceStartButton" },
              ]
            : index === "9"
            ? [
                {
                  type: "system",
                  message:
                    "본격적인 비즈니스 모델 설계를 진행하겠습니다.\n먼저 현재 아이템을 진단해보겠습니다",
                  expertIndex: -1,
                },
                { type: "bmStartButton" },
              ]
            : index === "6"
            ? [
                {
                  type: "system",
                  message:
                    "아이템을 분석하여, 성장 가능성을 극대화할 그로스 해킹 방법을 찾아보겠습니다. 시작할까요? 🔍",
                  expertIndex: -1,
                },
                { type: "growthHackerStartButton" },
              ]
            : null,
        ]
          .flat()
          .filter(Boolean)
      );

      setAnalysisButtonState(1);
      setIsExpertInsightAccessible(true);
      setApproachPath(1);
      setBusinessAnalysis({
        input: "",
        title: "",
        characteristics: "",
        features: [],
        category: {},
      });
      setSelectedExpertIndex(index);

      setToolLoading(true);
      navigate("/ExpertInsight");
    } else {
      setIsPopupLogin(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // 10초 동안 보여주고, 3초 동안 숨김
      setShowHint(true);

      const timeout = setTimeout(() => {
        setShowHint(false);
      }, 10000); // 10초 뒤에 숨김 상태로 변경

      return () => clearTimeout(timeout);
    }, 13000); // 13초 후 다시 반복 (10초 보여짐 + 3초 숨김)

    return () => clearInterval(interval);
  }, []);

  // 검색어 목록과 현재 표시할 검색어 인덱스를 위한 state 추가
  const [searchKeywords] = useState([
    {
      prefix: "패션 브랜드 운영자들은 '",
      keyword: "개인 스타일 추천을 위한 코디 서비스",
      suffix: "' 키워드로 검색했어요.",
    },
    {
      prefix: "교육 스타트업 창업자들은 '",
      keyword: "AI 기반 영어 회화 튜터 앱",
      suffix: "' 키워드로 검색했어요.",
    },
    {
      prefix: "피트니스 전문가들은 '",
      keyword: "홈트레이닝에 최적화된 운동 코치",
      suffix: "' 키워드로 검색했어요.",
    },
    {
      prefix: "모빌리티 스타트업은 '",
      keyword: "실시간 도로 환경 인식 및 위험 예측 AI 모델",
      suffix: "' 키워드로 검색했어요.",
    },
    {
      prefix: "마케팅 담당자들은 '",
      keyword: "SNS에서 자연스럽게 확산되는 바이럴 광고",
      suffix: "' 키워드로 검색했어요.",
    },
    {
      prefix: "행사 주최자들은 '",
      keyword: "스마트 홈 가전 신제품 출시 체험회",
      suffix: "' 키워드로 검색했어요.",
    },
    {
      prefix: "축제 기획자들은 '",
      keyword: "지역 문화와 예술을 만나는 전통 축제",
      suffix: "' 키워드로 검색했어요.",
    },
  ]);
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);

  // 검색어 자동 순환을 위한 useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeywordIndex((prev) => (prev + 1) % searchKeywords.length);
    }, 5000); // 5초마다 변경

    return () => clearInterval(interval);
  }, [searchKeywords.length]);

  // 탭 상태 관리를 위한 state 추가
  const [activeTab, setActiveTab] = useState("all");

  // 카드 필터링 함수 수정
  const filterCards = (card) => {
    if (activeTab === "all") return true;

    if (card.props.Expert) return activeTab === "expert";
    if (card.props.Research) return activeTab === "research";
    if (card.props.AiPersona) return activeTab === "interview";
    if (card.props.Report) return activeTab === "report";

    return false;
  };

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  // 3초마다 텍스트 변경하는 useEffect 추가
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingText((prev) =>
        prev === "창업 MBTI 테스트"
          ? "내 아이템 잠재력 확인"
          : "창업 MBTI 테스트"
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("tool")) {
        // 세션 스토리지에서 마지막 URL 가져오기
        const lastUrl = sessionStorage.getItem("lastUrl");

        // 마지막 URL이 현재 URL과 같으면 새로고침
        if (lastUrl && lastUrl === currentUrl) {
          if (checkRefresh) {
            navigate("/Project");
          } else {
            setCheckRefresh(true);
          }
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
    // window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      // window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1030>
          <ToolListWrap>
            <ToolListTitle>
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
                    {sessionStorage.getItem("educationName") ==
                    "서울창조경제혁신센터"
                      ? "Business Tools"
                      : "Expert & Business Tool"}
                  </H1>
                  <div style={{ height: "10px" }}></div>
                  <Body3 color="gray700" align="left">
                    {sessionStorage.getItem("educationName") ==
                    "서울창조경제혁신센터"
                      ? "AI 페르소나와 함께하는 워크숍을 통해 비즈니스 데이터를 기반으로 다양한 툴을 활용해 최적의 전략을 도출합니다."
                      : "당신의 비즈니스 데이터를 기반으로 다양한 AI 전문가와 툴을 활용하여 최적의 전략을 도출할 수 있습니다."}
                  </Body3>
                </div>
              </div>
            </ToolListTitle>
            <ExploreWrap>
              {!educationState ? (
                <TabWrapType4>
                  <TabButtonType4Main
                    isActive={activeTab === "all"}
                    onClick={() => setActiveTab("all")}
                  >
                    <Caption1 color="gray700">All</Caption1>
                  </TabButtonType4Main>
                  <TabButtonType4Main
                    isActive={activeTab === "interview"}
                    onClick={() => setActiveTab("interview")}
                  >
                    <Caption1 color="gray700">AI Person Interview</Caption1>
                  </TabButtonType4Main>
                  <TabButtonType4Main
                    isActive={activeTab === "research"}
                    onClick={() => setActiveTab("research")}
                  >
                    <Caption1 color="gray700">Research Tool</Caption1>
                  </TabButtonType4Main>
                  <TabButtonType4Main
                    isActive={activeTab === "expert"}
                    onClick={() => setActiveTab("expert")}
                  >
                    <Caption1 color="gray700">Business Expert</Caption1>
                  </TabButtonType4Main>
                  <TabButtonType4Main
                    isActive={activeTab === "report"}
                    onClick={() => setActiveTab("report")}
                  >
                    <Caption1 color="gray700">Report</Caption1>
                  </TabButtonType4Main>
                </TabWrapType4>
              ) : (
                <></>
              )}

              <ExploreList>
                {!educationState ? (
                  <>
                    {[
                      // Expert 카드들

                      <ExploreCard AiPersona key="analysis-1">
                        <span>
                          <images.GridCircle color={palette.gray700} />
                          Interveiw
                        </span>
                        <p>
                          <img src={images.ImgExplore12} alt="" />
                        </p>
                        <Body1 color="gray800">
                          <em>준비중</em>
                          심층 인터뷰 룸
                        </Body1>

                        <div
                          className="overlay"
                          onClick={() => {
                            navigate("/Persona3Single");
                          }}
                        >
                          <span>
                            <images.GridCircle color={palette.gray700} />
                            Interveiw
                          </span>

                          <div className="text">
                            <Body1 color="white">
                              <em>준비중</em>
                              심층 인터뷰 룸
                            </Body1>
                            <Caption1 color="white" align="left">
                              1:1 인터뷰를 통해 개별 사용자의 심층적인
                              인사이트와 핵심 니즈를 탐색하는 도구
                            </Caption1>
                            <i />
                          </div>
                        </div>
                      </ExploreCard>,

                      <ExploreCard AiPersona key="analysis-2">
                        <span>
                          <images.GridCircle color={palette.gray700} />
                          Interveiw
                        </span>
                        <p>
                          <img src={images.ImgExplore13} alt="" />
                        </p>
                        <Body1 color="gray800">
                          <em>준비중</em>
                          그룹 인터뷰 룸
                        </Body1>

                        <div
                          className="overlay"
                          onClick={() => {
                            navigate("/Persona3Multiple");
                          }}
                        >
                          <span>
                            <images.GridCircle color={palette.gray700} />
                            Interveiw
                          </span>

                          <div className="text">
                            <Body1 color="white">
                              <em>준비중</em>
                              그룹 인터뷰 룸
                            </Body1>
                            <Caption1 color="white" align="left">
                              소규모 그룹과의 대화를 통해 다양한 관점을 수집하고
                              핵심 인사이트를 도출하는 도구
                            </Caption1>
                            <i />
                          </div>
                        </div>
                      </ExploreCard>,

                      <ExploreCard AiPersona key="analysis-3">
                        <span>
                          <images.GridCircle color={palette.gray700} />
                          Interveiw
                        </span>
                        <p>
                          <img src={images.ImgExplore15} alt="" />
                        </p>
                        <Body1 color="gray800">
                          <em>준비중</em>퀵 서베이
                        </Body1>

                        <div
                          className="overlay"
                          onClick={() => {
                            navigate("/QuickSurvey");
                          }}
                        >
                          <span>
                            <images.GridCircle color={palette.gray700} />
                            Interveiw
                          </span>

                          <div className="text">
                            <Body1 color="white">
                              <em>준비중</em>퀵 서베이
                            </Body1>
                            <Caption1 color="white" align="left">
                              핵심 페르소나 그룹의 빠른 의견을 수집하고
                              인사이트를 도출할 수 있는 빠른 리서치 도구
                            </Caption1>
                            <i />
                          </div>
                        </div>
                      </ExploreCard>,

                      <ExploreCard
                        Research
                        key="research-1"
                        {...{ Ready: false }}
                      >
                        <span>
                          <images.GridTool color={palette.gray700} />
                          Tool
                        </span>
                        <p>
                          <img src={images.ImgExplore05} alt="" />
                        </p>
                        <Body1 color="gray800">
                          <em>준비중</em>
                          타겟 탐색기
                        </Body1>

                        <div
                          className="overlay"
                          onClick={() => {
                            hadleToolSelect("1");
                          }}
                        >
                          <span>
                            <images.GridTool color={palette.gray700} />
                            Tool
                          </span>

                          <div className="text">
                            <Body1 color="white">
                              <em>준비중</em>타겟 탐색기
                            </Body1>
                            <Caption1 color="white" align="left">
                              맥락적 조사 및 시나리오 분석 기법을 활용해 제품 및
                              서비스의 잠재고객 탐색 툴
                            </Caption1>
                            <i />
                          </div>
                        </div>
                      </ExploreCard>,

                      <ExploreCard
                        Research
                        key="research-2"
                        // {...(!accessableExpert && { Ready: true })}
                      >
                        <span>
                          <images.GridTool color={palette.gray700} />
                          Tool
                        </span>
                        <p>
                          <img src={images.ImgExplore06} alt="" />
                        </p>
                        <Body1 color="gray800">
                          <em>준비중</em>
                          고객 핵심 가치 분석기
                        </Body1>

                        <div
                          className="overlay"
                          onClick={() => {
                            hadleToolSelect("2");
                          }}
                        >
                          <span>
                            <images.GridTool color={palette.gray700} />
                            Tool
                          </span>

                          <div className="text">
                            <Body1 color="white">
                              <em>준비중</em>고객 핵심 가치 분석기
                            </Body1>
                            <Caption1 color="white" align="left">
                              고객여정맵을 기반으로 핵심 구매 요인을 도출하고
                              고객 중심의 경쟁력을 강화하는 툴
                            </Caption1>
                            <i />
                          </div>
                        </div>
                      </ExploreCard>,

                      <ExploreCard
                        Research
                        // Ready
                        key="research-3"
                        // {...(!accessableExpert && { Ready: true })}
                      >
                        <span>
                          <images.GridTool color={palette.gray700} />
                          Tool
                        </span>
                        <p>
                          <img src={images.ImgExplore07} alt="" />
                        </p>
                        <Body1 color="gray800">
                          <em>준비중</em>
                          아이디어 생성기
                        </Body1>

                        <div
                          className="overlay"
                          onClick={() => {
                            hadleToolSelect("3");
                          }}
                        >
                          <span>
                            <images.GridTool color={palette.gray700} />
                            Tool
                          </span>

                          <div className="text">
                            <Body1 color="white">
                              <em>준비중</em>아이디어 생성기
                            </Body1>
                            <Caption1 color="white" align="left">
                              만다라트 기법을 활용하여 창의적이고 구조적인
                              아이디어를 발산하고 구체화 하는 툴
                            </Caption1>
                            <i />
                          </div>
                        </div>
                      </ExploreCard>,

                      <ExploreCard
                        Research
                        // {...(!accessableExpert && { Ready: true })}
                        key="research-4"
                      >
                        <span>
                          <images.GridTool color={palette.gray700} />
                          Tool
                        </span>
                        <p>
                          <img src={images.ImgExplore10} alt="" />
                        </p>
                        <Body1 color="gray800">
                          <em>준비중</em>
                          디자인 감성 분석기
                        </Body1>

                        <div
                          className="overlay"
                          onClick={() => {
                            hadleToolSelect("4");
                          }}
                        >
                          <span>
                            <images.GridTool color={palette.gray700} />
                            Tool
                          </span>

                          <div className="text">
                            <Body1 color="white">
                              <em>준비중</em>디자인 감성 분석기
                            </Body1>
                            <Caption1 color="white" align="left">
                              디자인 분야별 평가 기준을 적용해 감성적인 특징을
                              정량적으로 분석하는 툴
                            </Caption1>
                            <i />
                          </div>
                        </div>
                      </ExploreCard>,

                      // <ExploreCard Research Ready key="research-5">
                      //   <span>
                      //     <images.LightningChargeFill color={palette.gray700} />
                      //     Tool
                      //   </span>
                      //   <p>
                      //     <img src={images.ImgExplore11} alt="" />
                      //   </p>
                      //   <Body1 color="gray800">
                      //     <em>준비중</em>
                      //     디자인 적합성 분석기
                      //   </Body1>

                      //   <div
                      //     className="overlay"
                      //     onClick={() => {
                      //       setIsComingSoon(true);
                      //     }}
                      //   >
                      //     <span>
                      //       <images.LightningChargeFill color={palette.white} />
                      //       Tool
                      //     </span>

                      //     <div className="text">
                      //       <Body1 color="white">
                      //         <em>준비중</em>디자인 적합성 분석기
                      //       </Body1>
                      //       <Caption1 color="white" align="left">
                      //         이미지가 마케팅 활용에 적합한지 다양한 기준으로 평가하여
                      //         적합성을 판단하는 툴
                      //       </Caption1>
                      //       <i />
                      //     </div>
                      //   </div>
                      // </ExploreCard>,

                      <ExploreCard
                        Expert
                        // Ready
                        key="expert-1"
                        // {...(!accessableExpert && { Ready: true })}
                      >
                        <span>
                          <images.LightningChargeFill color={palette.gray700} />
                          Expert
                        </span>
                        <p>
                          <img src={images.ImgExplore01} alt="" />
                        </p>
                        <Body1 color="gray800">
                          <em>준비중</em>
                          전략 컨설턴트
                        </Body1>

                        <div
                          className="overlay"
                          onClick={() => {
                            handledExpertSelect("1");
                          }}
                        >
                          <span>
                            <images.LightningChargeFill
                              color={palette.gray700}
                            />
                            Expert
                          </span>

                          <div className="text">
                            <Body1 color="white">
                              <em>준비중</em>
                              전략 컨설턴트
                            </Body1>
                            <Caption1 color="white" align="left">
                              차별화된 비즈니스 전략과 리스크 분석을 통해 시장
                              경쟁력을 강화하는 방법을 제시드려요
                            </Caption1>
                            <i />
                          </div>
                        </div>
                      </ExploreCard>,

                      <ExploreCard
                        Expert
                        // Ready
                        key="expert-2"
                        // {...(!accessableExpert && { Ready: true })}
                      >
                        <span>
                          <images.LightningChargeFill color={palette.gray700} />
                          Expert
                        </span>
                        <p>
                          <img src={images.ImgExplore02} alt="" />
                        </p>
                        <Body1 color="gray800">
                          <em>준비중</em>
                          가격 분석 전문가
                        </Body1>

                        <div
                          className="overlay"
                          onClick={() => {
                            handledExpertSelect("7");
                          }}
                        >
                          <span>
                            <images.LightningChargeFill
                              color={palette.gray700}
                            />
                            Expert
                          </span>

                          <div className="text">
                            <Body1 color="white">
                              <em>준비중</em>가격 분석 전문가
                            </Body1>
                            <Caption1 color="white" align="left">
                              시장 데이터 기반 최적 가격을 분석하여 수익성과
                              경쟁력을 극대화할 수 있어요 (제품 한정)
                            </Caption1>
                            <i />
                          </div>
                        </div>
                      </ExploreCard>,

                      <ExploreCard
                        Expert
                        // Ready
                        key="expert-3"
                        // {...(!accessableExpert && { Ready: true })}
                      >
                        <span>
                          <images.LightningChargeFill color={palette.gray700} />
                          Expert
                        </span>
                        <p>
                          <img src={images.ImgExplore03} alt="" />
                        </p>
                        <Body1 color="gray800">
                          <em>준비중</em>
                          BM 전문가
                        </Body1>

                        <div
                          className="overlay"
                          onClick={() => {
                            handledExpertSelect("9");
                          }}
                        >
                          <span>
                            <images.LightningChargeFill
                              color={palette.gray700}
                            />
                            Expert
                          </span>

                          <div className="text">
                            <Body1 color="white">
                              <em>준비중</em>BM 전문가
                            </Body1>
                            <Caption1 color="white" align="left">
                              비즈니스 모델을 설계하고 최적화하여 지속 가능한
                              수익 구조를 구축하는 방향을 설정해드려요{" "}
                            </Caption1>
                            <i />
                          </div>
                        </div>
                      </ExploreCard>,

                      <ExploreCard Expert key="expert-4">
                        <span>
                          <images.LightningChargeFill color={palette.gray700} />
                          Expert
                        </span>
                        <p>
                          <img src={images.ImgExplore04} alt="" />
                        </p>
                        <Body1 color="gray800">
                          <em>준비중</em>
                          그로스 해커
                        </Body1>

                        <div
                          className="overlay"
                          onClick={() => {
                            handledExpertSelect("6");
                          }}
                        >
                          <span>
                            <images.LightningChargeFill
                              color={palette.gray700}
                            />
                            Expert
                          </span>

                          <div className="text">
                            <Body1 color="white">
                              <em>준비중</em>그로스 해커
                            </Body1>
                            <Caption1 color="white" align="left">
                              사용자 여정을 분석하여 각 마케팅 퍼널 단계별
                              최적의 전략을 도출하고 실행 방안을 제시드려요
                            </Caption1>
                            <i />
                          </div>
                        </div>
                      </ExploreCard>,
                      <ExploreCard Report key="report-1">
                        <span>
                          <images.GridReport color={palette.gray700} />
                          Report
                        </span>
                        <p>
                          <img src={images.ImgExplore14} alt="" />
                        </p>
                        <Body1 color="gray800">
                          <em>준비중</em>
                          보고서 생성기
                        </Body1>

                        <div
                          className="overlay"
                          onClick={() => {
                            navigate("/PsstReport");
                          }}
                        >
                          <span>
                            <images.GridReport color={palette.gray700} />
                            Report
                          </span>

                          <div className="text">
                            <Body1 color="white">
                              <em>준비중</em>보고서 생성기
                            </Body1>
                            <Caption1 color="white" align="left">
                              여러가지 기획서 및 계획서를 원하는 사업 타입에
                              맞춰 작성을 도와주는 툴
                            </Caption1>
                            <i />
                          </div>
                        </div>
                      </ExploreCard>,
                      <ExploreCard
                        Report
                        Ready
                        key="report-2"
                        style={{ cursor: "default" }}
                      >
                        <span>
                          <images.GridReport color={palette.gray700} />
                          Report
                        </span>
                        <p>
                          <img src={images.ImgExploreNoData} alt="" />
                        </p>
                        <div style={{ height: "10px" }}></div>
                        <Body1 color="gray300">Coming Soon</Body1>
                      </ExploreCard>,
                    ].filter(filterCards)}
                  </>
                ) : (
                  // <ExploreCard Research key="research-4">
                  //   <span>
                  //     <images.LightningChargeFill color={palette.gray700} />
                  //     Tool
                  //   </span>
                  //   <p><img src={images.ImgExplore08} alt="" /></p>
                  //   <Body1 color="gray800">
                  //     <em>준비중</em>
                  //     컨셉 검증 플래너
                  //   </Body1>

                  //   <div className="overlay" onClick={() => { setIsComingSoon(true); }}>
                  //     <span>
                  //       <images.LightningChargeFill color={palette.white} />
                  //       Tool
                  //     </span>

                  //     <div className="text">
                  //       <Body1 color="white">컨셉 검증 플래너</Body1>
                  //       <Caption1 color="white" align="left">MVP/PoC 검증을 위한 체계저인 플랜을 수립하여 실행 가능성을 높이는 플랜 제시 툴</Caption1>
                  //       <i />
                  //     </div>
                  //   </div>
                  // </ExploreCard>,

                  // <ExploreCard Research key="research-5">
                  //   <span>
                  //     <images.LightningChargeFill color={palette.gray700} />
                  //     Tool
                  //   </span>
                  //   <p><img src={images.ImgExplore09} alt="" /></p>
                  //   <Body1 color="gray800">
                  //     <em>준비중</em>
                  //     사용자 시뮬레이터
                  //   </Body1>

                  //   <div className="overlay" onClick={() => { setIsComingSoon(true); }}>
                  //     <span>
                  //       <images.LightningChargeFill color={palette.white} />
                  //       Tool
                  //     </span>

                  //     <div className="text">
                  //       <Body1 color="white">사용자 시뮬레이터</Body1>
                  //       <Caption1 color="white" align="left">특정 AI Persona 그룹을 대상으로 핵심적인 질문을 제시하여 응답 패턴과 경향성을 분석하는 툴</Caption1>
                  //       <i />
                  //     </div>
                  //   </div>
                  // </ExploreCard>,

                  // <ExploreCard Analysis key="analysis-1">
                  //   <span>
                  //     <images.LightningChargeFill color={palette.gray700} />
                  //     Tool
                  //   </span>
                  //   <p><img src={images.ImgExplore02} alt="" /></p>
                  //   <Body1 color="gray800">
                  //     <em>준비중</em>
                  //     Analysis Tool
                  //   </Body1>

                  //   <div className="overlay" onClick={() => { setIsComingSoon(true); }}>
                  //     <span>
                  //       <images.LightningChargeFill color={palette.white} />
                  //       Tool
                  //     </span>

                  //     <div className="text">
                  //       <Body1 color="white">Analysis Tool</Body1>
                  //       <Caption1 color="white" align="left">Analysis Tool</Caption1>
                  //       <i />
                  //     </div>
                  //   </div>
                  // </ExploreCard>,

                  // <ExploreCard Analysis key="analysis-2">
                  //   <span>
                  //     <images.LightningChargeFill color={palette.gray700} />
                  //     Tool
                  //   </span>
                  //   <p><img src={images.ImgExplore02} alt="" /></p>
                  //   <Body1 color="gray800">
                  //     <em>준비중</em>
                  //     Analysis Tool2
                  //   </Body1>

                  //   <div className="overlay" onClick={() => { setIsComingSoon(true); }}>
                  //     <span>
                  //       <images.LightningChargeFill color={palette.white} />
                  //       Tool
                  //     </span>

                  //     <div className="text">
                  //       <Body1 color="white">Analysis Tool</Body1>
                  //       <Caption1 color="white" align="left">Analysis Tool</Caption1>
                  //       <i />
                  //     </div>
                  //   </div>
                  // </ExploreCard>,

                  // !Edu 툴 추가
                  <>
                    {educationTools.map((tool) => {
                      return (
                        <ExploreCard
                          ReadyEducation={!tool.is_active}
                          anything
                          key={tool.tool_id}
                        >
                          <span>{tool.tool_type}</span>
                          <p>
                            <img src={images[tool.tool_image]} alt="" />
                          </p>
                          <Body1 color="gray800">{tool.tool_name}</Body1>
                          <div
                            className="overlay"
                            onClick={() => {
                              if (tool.is_active) {
                                navigate(tool.tool_path);
                              }
                            }}
                          >
                            <span>{tool.tool_type}</span>
                            <div className="text">
                              <Body1 color="white">{tool.tool_name}</Body1>
                              <Caption1 color="white" align="left">
                                {tool.tool_description}
                              </Caption1>
                              <i />
                            </div>
                          </div>
                          {!tool.is_active && (
                            <div className="overlayEducation">
                              <div className="text">
                                <Body1 color="white">
                                  {tool.overlay_message}
                                </Body1>
                              </div>
                            </div>
                          )}
                        </ExploreCard>
                      );
                    })}
                  </>
                )}
              </ExploreList>
            </ExploreWrap>
          </ToolListWrap>
        </MainContent>
      </ContentsWrap>

      {isPopupLogin && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePopupLogin(); // 팝업 닫기
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closePopupLogin}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>로그인 후 사용해 주세요.</p>
            <div className="btnWrap">
              <button type="button" onClick={closePopupLogin}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}

      {isComingSoon && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeComingSoonPopup();
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closeComingSoonPopup}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>
              전문가가 곧 공개됩니다
              <br />
              조금만 기다려 주세요!
            </p>
            <div className="btnWrap">
              <button type="button" onClick={closeComingSoonPopup}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

export default PageToolListSaas;

const ToolListWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 54px;
  margin: 50px auto;
`;

const ToolListTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

const ExploreWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 100%;

  > h4 {
    margin-bottom: 12px;
  }
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
    padding: 11px;
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
      background: ${palette.black};
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
      line-height: 1.5;
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
        border-radius: 8px;
        border: 1px solid ${palette.blue};
        background: ${palette.white};

        &:last-child {
          color: ${palette.white};
          background: ${palette.blue};
        }
      }
    }

    ${(props) =>
      props.Cancel &&
      css`
        p {
          strong {
            font-weight: 500;
            display: block;
          }
          span {
            font-size: 0.75rem;
            font-weight: 400;
            color: ${palette.gray500};
            display: block;
            margin-top: 8px;
          }
        }

        .btnWrap {
          padding-top: 16px;
          border-top: 1px solid ${palette.lineGray};

          button {
            font-family: "Pretendard", "Poppins";
            color: ${palette.gray};
            font-weight: 600;
            padding: 0;
            border: 0;
            background: none;

            &:last-child {
              color: ${palette.blue};
              background: none;
            }
          }
        }
      `}
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
