//네비게이션 컴포넌트
//좌측 사이드바 네비게이션 컴포넌트
//로그인/로그아웃 관리, 대화 히스토리 관리, 프로젝트 관리. 사용자 계정 설정
import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { palette } from "../../../assets/styles/Palette";
import images from "../../../assets/styles/Images";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { atom, useAtom } from "jotai";
import axios from "axios";
import { SubtractiveBlending } from "three/src/constants.js";
import panelimages from "../../../assets/styles/PanelImages";
import PopupWrap from "../../../assets/styles/Popup";
import { Sub3, Caption2 } from "../../../assets/styles/Typography";
import { NoData } from "../../../assets/styles/BusinessAnalysisStyle";

import {
  PASSWORD,
  NEW_PASSWORD,
  RE_PASSWORD,
  INPUT_BUSINESS_INFO,
  IS_LOGGED_IN,
  USER_NAME,
  USER_EMAIL,
  USER_MEMBERSHIP,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  APPROACH_PATH,
  SELECTED_ADDITIONAL_KEYWORD,
  STRATEGY_REPORT_DATA,
  ADDITIONAL_REPORT_DATA, // Import the new list-based atom
  CONVERSATION_STAGE,
  CONVERSATION,
  CONVERSATION_ID,
  SELECTED_EXPERT_INDEX,
  REPORT_REFRESH_TRIGGER,
  CHAT_REFRESH_TRIGGER,
  IS_LOADING,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  SELECTED_EXPERT_LIST,
  IS_SOCIAL_LOGGED_IN,
  SAVED_TIMESTAMP,
  IS_EDITING_NOW,
  ANALYSIS_BUTTON_STATE,
  EXPERT_BUTTON_STATE,
  ADDITION_BUTTON_STATE,
  CUSTOMER_ADDITION_BUTTON_STATE,
  IS_EXPERT_INSIGHT_ACCESSIBLE,
  SELECTED_POC_OPTIONS,
  SELCTED_POC_TARGET,
  RECOMMENDED_TARGET_DATA,
  POC_DETAIL_REPORT_DATA,
  POC_PERSONA_LIST,
  IS_MOBILE,
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
  PRICE_REPORT_DATA,
  PRICE_SCRAP_DATA,
  PRICE_PRODUCT,
  PRICE_SELECTED_PRODUCT_SEGMENTATION,
  PRICE_PRODUCT_SEGMENTATION,
  CASE_REPORT_DATA,
  CASE_HASH_TAG,
  SURVEY_GOAL_SUGGESTION_LIST,
  SURVEY_GOAL_FIXED,
  SURVEY_QUESTION_LIST,
  SURVEY_GUIDELINE_REPORT_DATA,
  SURVEY_GUIDELINE_DETAIL_REPORT_DATA,
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
  NEW_ADD_CONTENT,
  IS_ADDING_NOW,
  IS_MARKETING,
  MARKETING_MBTI_RESULT,
  MARKETING_RESEARCH_REPORT_DATA,
  MARKETING_BM_REPORT_DATA,
  MARKETING_CUSTOMER_DATA,
  MARKETING_SELECTED_CUSTOMER,
  MARKETING_FINAL_CUSTOMER,
  MARKETING_FINAL_REPORT_DATA,
  MARKETING_FINAL_REPORT_BUTTON_STATE,
  MARKETING_BM_BUTTON_STATE,
  MARKETING_CUSTOMER_BUTTON_STATE,
  MARKETING_START_BUTTON_STATE,
  MARKETING_RECOMMENDED_ITEM_DATA,
  MARKETING_HAVE_IEDA,
  MARKETING_MBTI_STAGE,
  MARKETING_MBTI_ANSWER,
  MARKETING_INTEREST,
  MARKETING_RECOMMENDED_ITEM_BUTTON_STATE,
  IS_SIGNUP_POPUP_OPEN,
  IS_LOGIN_POPUP_OPEN,
  GROWTH_HACKER_RECOMMENDED_SOLUTION,
  GROWTH_HACKER_SELECTED_SOLUTION,
  STRATEGY_CONSULTANT_REPORT_DATA,
  PERSONA_STEP,
  IS_PERSONA_ACCESSIBLE,
  PROJECT_ID,
  PROJECT_REPORT_ID,
  PROJECT_LIST,
  PROJECT_REPORT_LIST,
  REPORT_LIST,
  PERSONA_LIST,
  SELECTED_PERSONA_LIST,
  CUSTOMIZE_PERSONA_LIST,
  REQUEST_PERSONA_LIST,
  INTERVIEW_QUESTION_LIST,
  SELECTED_INTERVIEW_PURPOSE,
  CATEGORY_COLOR,
  PROJECT_LOAD_BUTTON_STATE,
  REPORT_LOAD_BUTTON_STATE,
  REPORT_DESCRIPTION_LOAD_BUTTON_STATE,
  INTERVIEW_DATA,
  INTERVIEW_REPORT,
  INTERVIEW_REPORT_ADDITIONAL,
  IS_EDIT_MODE,
  IS_SHOW_TOAST,
  PROJECT_REFRESH_TRIGGER,
  CUSTOM_PERSONA_LIST,
  TARGET_DISCOVERY_INFO,
  TARGET_DISCOVERY_PERSONA,
  TARGET_DISCOVERY_SCENARIO,
  SELECTED_TARGET_DISCOVERY_SCENARIO,
  TARGET_DISCOVERY_FINAL_REPORT,
  TOOL_ID,
  TOOL_STEP,
  TOOL_LOADING,
  CUSTOMER_VALUE_ANALYZER_INFO,
  CUSTOMER_VALUE_ANALYZER_PERSONA,
  CUSTOMER_VALUE_ANALYZER_JOURNEY_MAP,
  CUSTOMER_VALUE_ANALYZER_FACTOR,
  CUSTOMER_VALUE_ANALYZER_CLUSTERING,
  CUSTOMER_VALUE_ANALYZER_POSITIONING,
  CUSTOMER_VALUE_ANALYZER_FINAL_REPORT,
  CUSTOMER_VALUE_ANALYZER_SELECTED_FACTOR,
  IDEA_GENERATOR_INFO,
  IDEA_GENERATOR_KNOW_TARGET,
  IDEA_GENERATOR_CUSTOM_TARGET,
  IDEA_GENERATOR_PERSONA,
  IDEA_GENERATOR_IDEA,
  IDEA_GENERATOR_CLUSTERING,
  IDEA_GENERATOR_FINAL_REPORT,
  IDEA_GENERATOR_SELECTED_PERSONA,
  CUSTOMER_VALUE_ANALYZER_SELECTED_PERSONA,
  DESIGN_ANALYSIS_EMOTION_ANALYSIS,
  DESIGN_ANALYSIS_BUSINESS_INFO,
  DESIGN_ANALYSIS_UPLOADED_FILES,
  DESIGN_ANALYSIS_SELECTED_PERSONA,
  DESIGN_ANALYSIS_EMOTION_TARGET,
  DESIGN_ANALYSIS_EMOTION_SCALE,
  DESIGN_ANALYSIS_FILE_NAMES,
  DESIGN_ANALYSIS_FILE_ID,
} from "../../AtomStates";
import {
  getAllConversationsFromIndexedDB,
  getToolListOnServer,
  getToolOnServer,
} from "../../../utils/indexedDB"; // IndexedDB에서 대화 내역 가져오기
import MoleculeLoginPopup from "../../Login_Sign/components/molecules/MoleculeLoginPopup"; // 로그인 팝업 컴포넌트 임포트
import MoleculeAccountPopup from "../../Login_Sign/components/molecules/MoleculeAccountPopup"; // 계정설정 팝업 컴포넌트 임포트
import MoleculeSignPopup from "../../Login_Sign/components/molecules/MoleculeSignPopup"; // 회원가입 팝업 컴포넌트 임포트
import { useSaveConversation } from "../../Expert_Insight/components/atoms/AtomSaveConversation";

const OrganismIncNavigation = () => {
  const [designAnalysisFileId, setDesignAnalysisFileId] = useAtom(
    DESIGN_ANALYSIS_FILE_ID
  );
  const [ideaGeneratorInfo, setIdeaGeneratorInfo] =
    useAtom(IDEA_GENERATOR_INFO);
  const [ideaGeneratorKnowTarget, setIdeaGeneratorKnowTarget] = useAtom(
    IDEA_GENERATOR_KNOW_TARGET
  );
  const [ideaGeneratorCustomTarget, setIdeaGeneratorCustomTarget] = useAtom(
    IDEA_GENERATOR_CUSTOM_TARGET
  );
  const [ideaGeneratorPersona, setIdeaGeneratorPersona] = useAtom(
    IDEA_GENERATOR_PERSONA
  );
  const [ideaGeneratorIdea, setIdeaGeneratorIdea] =
    useAtom(IDEA_GENERATOR_IDEA);
  const [ideaGeneratorClustering, setIdeaGeneratorClustering] = useAtom(
    IDEA_GENERATOR_CLUSTERING
  );
  const [ideaGeneratorFinalReport, setIdeaGeneratorFinalReport] = useAtom(
    IDEA_GENERATOR_FINAL_REPORT
  );
  const [ideaGeneratorSelectedPersona, setIdeaGeneratorSelectedPersona] =
    useAtom(IDEA_GENERATOR_SELECTED_PERSONA);

  // export const TARGET_DISCOVERY_PERSONA = atom([]);
  // export const SELECTED_TARGET_DISCOVERY_PERSONA = atom([]);
  // export const TARGET_DISCOVERY_SCENARIO = atom([]);
  // export const SELECTED_TARGET_DISCOVERY_SCENARIO = atom([]);
  // export const TARGET_DISCOVERY_FINAL_REPORT = atom({});

  // export const TOOL_ID = atom("");
  // export const TOOL_STEP = atom(0);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [targetDiscoveryInfo, setTargetDiscoveryInfo] = useAtom(
    TARGET_DISCOVERY_INFO
  );
  const [targetDiscoveryPersona, setTargetDiscoveryPersona] = useAtom(
    TARGET_DISCOVERY_PERSONA
  );
  const [targetDiscoveryScenario, setTargetDiscoveryScenario] = useAtom(
    TARGET_DISCOVERY_SCENARIO
  );
  const [selectedTargetDiscoveryScenario, setSelectedTargetDiscoveryScenario] =
    useAtom(SELECTED_TARGET_DISCOVERY_SCENARIO);
  const [targetDiscoveryFinalReport, setTargetDiscoveryFinalReport] = useAtom(
    TARGET_DISCOVERY_FINAL_REPORT
  );
  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const location = useLocation();
  const [customPersonaList, setCustomPersonaList] =
    useAtom(CUSTOM_PERSONA_LIST);
  const [, setRefreshTrigger] = useAtom(PROJECT_REFRESH_TRIGGER);
  const [projectLoadButtonState, setProjectLoadButtonState] = useAtom(
    PROJECT_LOAD_BUTTON_STATE
  );
  const [userMembership, setUserMembership] = useAtom(USER_MEMBERSHIP);
  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const [projectReportId, setProjectReportId] = useAtom(PROJECT_REPORT_ID);
  const [projectList, setProjectList] = useAtom(PROJECT_LIST);
  const [projectReportList, setProjectReportList] =
    useAtom(PROJECT_REPORT_LIST);
  const [isPersonaAccessible, setIsPersonaAccessible] = useAtom(
    IS_PERSONA_ACCESSIBLE
  );
  const [reportList, setReportList] = useAtom(REPORT_LIST);
  const [personaList, setPersonaList] = useAtom(PERSONA_LIST);
  const [selectedPersonaList, setSelectedPersonaList] = useAtom(
    SELECTED_PERSONA_LIST
  );
  const [customizePersonaList, setCustomizePersonaList] = useAtom(
    CUSTOMIZE_PERSONA_LIST
  );
  const [interviewQuestionList, setInterviewQuestionList] = useAtom(
    INTERVIEW_QUESTION_LIST
  );
  const [selectedInterviewPurpose, setSelectedInterviewPurpose] = useAtom(
    SELECTED_INTERVIEW_PURPOSE
  );
  const [categoryColor, setCategoryColor] = useAtom(CATEGORY_COLOR);
  const [reportLoadButtonState, setReportLoadButtonState] = useAtom(
    REPORT_LOAD_BUTTON_STATE
  );
  const [
    reportDescriptionLoadButtonState,
    setReportDescriptionLoadButtonState,
  ] = useAtom(REPORT_DESCRIPTION_LOAD_BUTTON_STATE);
  const [interviewData, setInterviewData] = useAtom(INTERVIEW_DATA);
  const [interviewReport, setInterviewReport] = useAtom(INTERVIEW_REPORT);
  const [interviewReportAdditional, setInterviewReportAdditional] = useAtom(
    INTERVIEW_REPORT_ADDITIONAL
  );
  const [isEditMode, setIsEditMode] = useAtom(IS_EDIT_MODE);
  const [isShowToast, setIsShowToast] = useAtom(IS_SHOW_TOAST);
  const [personaStep, setPersonaStep] = useAtom(PERSONA_STEP);
  const [strategyConsultantReportData, setStrategyConsultantReportData] =
    useAtom(STRATEGY_CONSULTANT_REPORT_DATA);
  const [growthHackerRecommendedSolution, setGrowthHackerRecommendedSolution] =
    useAtom(GROWTH_HACKER_RECOMMENDED_SOLUTION);
  const [growthHackerSelectedSolution, setGrowthHackerSelectedSolution] =
    useAtom(GROWTH_HACKER_SELECTED_SOLUTION);
  const { saveConversation } = useSaveConversation();
  const [bmModelSuggestionReportData, setBmModelSuggestionReportData] = useAtom(
    BM_MODEL_SUGGESTION_REPORT_DATA
  );
  const [bmQuestionList, setBmQuestionList] = useAtom(BM_QUESTION_LIST);
  const [bmSelectedProblemOptions, setBmSelectedProblemOptions] = useAtom(
    BM_SELECTED_PROBLEM_OPTIONS
  );
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
  const [surveyGoalSuggestionList, setSurveyGoalSuggestionList] = useAtom(
    SURVEY_GOAL_SUGGESTION_LIST
  );
  const [surveyGoalFixed, setSurveyGoalFixed] = useAtom(SURVEY_GOAL_FIXED);
  const [surveyQuestionList, setSurveyQuestionList] =
    useAtom(SURVEY_QUESTION_LIST);
  const [surveyGuidelineReportData, setSurveyGuidelineReportData] = useAtom(
    SURVEY_GUIDELINE_REPORT_DATA
  );
  const [caseReportData, setCaseReportData] = useAtom(CASE_REPORT_DATA);
  const [caseHashTag, setCaseHashTag] = useAtom(CASE_HASH_TAG);
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
  const [ideaMiroState, setIdeaMiroState] = useAtom(IDEA_MIRO_STATE);
  const [growthHackerReportData, setGrowthHackerReportData] = useAtom(
    GROWTH_HACKER_REPORT_DATA
  );
  const [growthHackerDetailReportData, setGrowthHackerDetailReportData] =
    useAtom(GROWTH_HACKER_DETAIL_REPORT_DATA);
  const [KpiQuestionList, setKpiQuestionList] = useAtom(KPI_QUESTION_LIST);
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [isEditingIdeaFeature, setIsEditingIdeaFeature] = useAtom(
    IS_EDITING_IDEA_FEATURE
  );
  const [isEditingIdeaCustomer, setIsEditingIdeaCustomer] = useAtom(
    IS_EDITING_IDEA_CUSTOMER
  );
  const [addingIdeaFeature, setAddingIdeaFeature] =
    useAtom(ADDING_IDEA_FEATURE);
  const [activeIdeaFeatureIndex, setActiveIdeaFeatureIndex] = useAtom(
    ACTIVE_IDEA_FEATURE_INDEX
  );
  const [addContentIdeaFeature, setAddContentIdeaFeature] = useAtom(
    ADD_CONTENT_IDEA_FEATURE
  );
  const [editedIdeaFeatureTitle, setEditedIdeaFeatureTitle] = useAtom(
    EDITED_IDEA_FEATURE_TITLE
  );
  const [addingIdeaCustomer, setAddingIdeaCustomer] =
    useAtom(ADDING_IDEA_CUSTOMER);
  const [activeIdeaCustomerIndex, setActiveIdeaCustomerIndex] = useAtom(
    ACTIVE_IDEA_CUSTOMER_INDEX
  );
  const [addContentIdeaCustomer, setAddContentIdeaCustomer] = useAtom(
    ADD_CONTENT_IDEA_CUSTOMER
  );
  const [editedIdeaCustomerTitle, setEditedIdeaCustomerTitle] = useAtom(
    EDITED_IDEA_CUSTOMER_TITLE
  );
  const [isMobile] = useAtom(IS_MOBILE);
  const [pocPersonaList, setPocPersonaList] = useAtom(POC_PERSONA_LIST);
  const [pocDetailReportData, setPocDetailReportData] = useAtom(
    POC_DETAIL_REPORT_DATA
  );
  const [recommendedTargetData, setRecommendedTargetData] = useAtom(
    RECOMMENDED_TARGET_DATA
  );
  const [selectedPocTarget, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET);
  const [selectedPocOptions, setSelectedPocOptions] =
    useAtom(SELECTED_POC_OPTIONS);
  const [selectedExpertList, setSelectedExpertList] =
    useAtom(SELECTED_EXPERT_LIST);
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
  const [password, setPassword] = useAtom(PASSWORD);
  const [newPassword, setNewPassword] = useAtom(NEW_PASSWORD);
  const [rePassword, setRePassword] = useAtom(RE_PASSWORD);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const navigate = useNavigate();
  const [bizName] = useAtom(INPUT_BUSINESS_INFO);
  const [isExpertInsightAccessible, setIsExpertInsightAccessible] = useAtom(
    IS_EXPERT_INSIGHT_ACCESSIBLE
  );

  const [selectedReport, setSelectedReport] = useState(null); // 선택된 보고서 상태 관리
  const [conversations, setConversations] = useState([]); // 저장된 대화 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN); // 로그인 상태 관리
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useAtom(IS_LOGIN_POPUP_OPEN); // 로그인 팝업 상태 관리
  const [reports, setReports] = useState([]); // 서버에서 가져온 보고서 리스트 상태
  const [reportRefreshTrigger, setReportRefreshTrigger] = useAtom(
    REPORT_REFRESH_TRIGGER
  ); // 리프레시 트리거 상태 구독
  const [chatRefreshTrigger, setChatRefreshTrigger] =
    useAtom(CHAT_REFRESH_TRIGGER); // 리프레시 트리거 상태 구독

  const [chatList, setChatList] = useState([]); // 서버에서 가져온 대화 리스트

  const [isAccountPopupOpen, setAccountPopupOpen] = useState(false); // 계정설정 팝업
  const [isSocialLoggedIn, setIsSocialLoggedIn] = useAtom(IS_SOCIAL_LOGGED_IN); // 소셜 로그인 상태 읽기
  const [isSignupPopupOpen, setIsSignupPopupOpen] =
    useAtom(IS_SIGNUP_POPUP_OPEN); // 회원가입 팝업 상태 관리
  const [isLogoutPopup, setIsLogoutPopup] = useState(false); // 로그아웃 팝업 상태 관리
  const [userName, setUserName] = useAtom(USER_NAME); // 아톰에서 유저 이름 불러오기
  const [userEmail, setUserEmail] = useAtom(USER_EMAIL); // 아톰에서 유저 이메일 불러오기
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false); // 삭제 경고 팝업 상태
  const [isChatDeletePopupOpen, setChatIsDeletePopupOpen] = useState(false); // 삭제 경고 팝업 상태
  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false); // 나가기 경고 팝업 상태

  const [reportIdToDelete, setReportIdToDelete] = useState(null); // 삭제하려는 reportId 저장
  const [chatIdToDelete, setChatIdToDelete] = useState(null); // 삭제하려는 reportId 저장

  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
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
  const [additionalReportCount, setAdditionalReportCount] = useState(0);
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(
    SELECTED_ADDITIONAL_KEYWORD
  );
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);

  const [additionalReportData, setAdditionalReportData] = useAtom(
    ADDITIONAL_REPORT_DATA
  ); // Use the new list-based atom

  const [strategyReportData, setStrategyReportData] =
    useAtom(STRATEGY_REPORT_DATA);

  const [
    selectedCustomerAdditionalKeyword,
    setSelectedCustomerAdditionalKeyword,
  ] = useAtom(SELECTED_CUSTOMER_ADDITIONAL_KEYWORD);
  const [customerAdditionalReportData, setCustomerAdditionalReportData] =
    useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);
  const [inputAdditionalQuestion, setInputAdditionalQuestion] = useState("");
  const insightEditBoxRef = useRef(null);
  const historyEditBoxRef = useRef(null);
  const toggleRef = useRef(null);

  const [editToggleIndex, setEditToggleIndex] = useState(null); // 특정 인덱스를 저장

  const [savedTimestamp, setSavedTimestamp] = useAtom(SAVED_TIMESTAMP);

  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);
  const [editBoxPosition, setEditBoxPosition] = useState({ top: 0, left: 0 });
  const accordionContentRef = useRef(null);
  const [insightEditBoxPosition, setInsightEditBoxPosition] = useState({
    top: 0,
    left: 0,
  });
  const insightAccordionContentRef = useRef(null);

  const [analysisButtonState, setAnalysisButtonState] = useAtom(
    ANALYSIS_BUTTON_STATE
  );
  const [expertButtonState, setExpertButtonState] =
    useAtom(EXPERT_BUTTON_STATE);
  const [additionButtonState, setAdditionButtonState] = useAtom(
    ADDITION_BUTTON_STATE
  );
  const [customerAdditionButtonState, setCustomerAdditionButtonState] = useAtom(
    CUSTOMER_ADDITION_BUTTON_STATE
  );

  const [isSection1Open, setIsSection1Open] = useState(false); // 인사이트 보관함 열림/닫힘 상태
  const [isSection2Open, setIsSection2Open] = useState(false); // 프로젝트 히스토리 열림/닫힘 상태

  // State variables for report name change
  const [isReportChangePopupOpen, setIsReportChangePopupOpen] = useState(false);
  const [reportIdToChangeName, setReportIdToChangeName] = useState(null);
  const [newReportName, setNewReportName] = useState("");

  // State variables for chat name change
  const [isChatChangePopupOpen, setIsChatChangePopupOpen] = useState(false);
  const [chatIdToChangeName, setChatIdToChangeName] = useState(null);
  const [newChatName, setNewChatName] = useState("");

  const [newAddContent, setNewAddContent] = useAtom(NEW_ADD_CONTENT);
  const [isAddingNow, setIsAddingNow] = useAtom(IS_ADDING_NOW);
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
  const [marketingFinalReportButtonState, setMarketingFinalReportButtonState] =
    useAtom(MARKETING_FINAL_REPORT_BUTTON_STATE);
  const [marketingBmButtonState, setMarketingBmButtonState] = useAtom(
    MARKETING_BM_BUTTON_STATE
  );
  const [marketingCustomerButtonState, setMarketingCustomerButtonState] =
    useAtom(MARKETING_CUSTOMER_BUTTON_STATE);
  const [marketingHaveIdea, setMarketingHaveIdea] =
    useAtom(MARKETING_HAVE_IEDA);
  const [marketingMbtiStage, setMarketingMbtiStage] =
    useAtom(MARKETING_MBTI_STAGE);
  const [marketingMbtiAnswer, setMarketingMbtiAnswer] = useAtom(
    MARKETING_MBTI_ANSWER
  );
  const [marketingInterest, setMarketingInterest] = useAtom(MARKETING_INTEREST);
  const [marketingRecommendedItemData, setMarketingRecommendedItemData] =
    useAtom(MARKETING_RECOMMENDED_ITEM_DATA);
  const [marketingStartButtonState, setMarketingStartButtonState] = useAtom(
    MARKETING_START_BUTTON_STATE
  );
  const [
    marketingRecommendedItemButtonState,
    setMarketingRecommendedItemButtonState,
  ] = useAtom(MARKETING_RECOMMENDED_ITEM_BUTTON_STATE);

  const [customerValueAnalyzerInfo, setCustomerValueAnalyzerInfo] = useAtom(
    CUSTOMER_VALUE_ANALYZER_INFO
  );
  const [customerValueAnalyzerPersona, setCustomerValueAnalyzerPersona] =
    useAtom(CUSTOMER_VALUE_ANALYZER_PERSONA);
  const [customerValueAnalyzerJourneyMap, setCustomerValueAnalyzerJourneyMap] =
    useAtom(CUSTOMER_VALUE_ANALYZER_JOURNEY_MAP);
  const [customerValueAnalyzerFactor, setCustomerValueAnalyzerFactor] = useAtom(
    CUSTOMER_VALUE_ANALYZER_FACTOR
  );
  const [customerValueAnalyzerClustering, setCustomerValueAnalyzerClustering] =
    useAtom(CUSTOMER_VALUE_ANALYZER_CLUSTERING);
  const [
    customerValueAnalyzerPositioning,
    setCustomerValueAnalyzerPositioning,
  ] = useAtom(CUSTOMER_VALUE_ANALYZER_POSITIONING);
  const [
    customerValueAnalyzerFinalReport,
    setCustomerValueAnalyzerFinalReport,
  ] = useAtom(CUSTOMER_VALUE_ANALYZER_FINAL_REPORT);
  const [
    customerValueAnalyzerSelectedFactor,
    setCustomerValueAnalyzerSelectedFactor,
  ] = useAtom(CUSTOMER_VALUE_ANALYZER_SELECTED_FACTOR);
  const [
    customerValueAnalyzerSelectedPersona,
    setCustomerValueAnalyzerSelectedPersona,
  ] = useAtom(CUSTOMER_VALUE_ANALYZER_SELECTED_PERSONA);
  // useEffect(() => {
  //   setIsSection1Open(false);
  //   setIsSection2Open(false);
  // }, [isLoggedIn]);

  const [designAnalysisEmotionAnalysis, setDesignAnalysisEmotionAnalysis] =
    useAtom(DESIGN_ANALYSIS_EMOTION_ANALYSIS);
  const [designAnalysisBusinessInfo, setDesignAnalysisBusinessInfo] = useAtom(
    DESIGN_ANALYSIS_BUSINESS_INFO
  );
  const [designAnalysisUploadedFiles, setDesignAnalysisUploadedFiles] = useAtom(
    DESIGN_ANALYSIS_UPLOADED_FILES
  );
  const [designAnalysisSelectedPersona, setDesignAnalysisSelectedPersona] =
    useAtom(DESIGN_ANALYSIS_SELECTED_PERSONA);
  const [designAnalysisEmotionTarget, setDesignAnalysisEmotionTarget] = useAtom(
    DESIGN_ANALYSIS_EMOTION_TARGET
  );
  const [designAnalysisEmotionScale, setDesignAnalysisEmotionScale] = useAtom(
    DESIGN_ANALYSIS_EMOTION_SCALE
  );
  const [designAnalysisFileNames, setDesignAnalysisFileNames] = useAtom(
    DESIGN_ANALYSIS_FILE_NAMES
  );

  const [isPopupLogin, setIsPopupLogin] = useState(false);

  const closePopupLogin = () => {
    setIsPopupLogin(false);
    setIsLoginPopupOpen(true);
  };

  const handleChangeReportNameButtonClick = (reportId) => {
    setReportIdToChangeName(reportId);
    setIsReportChangePopupOpen(true);
  };

  const handleChangeChatNameButtonClick = (chatId) => {
    setChatIdToChangeName(chatId);
    setIsChatChangePopupOpen(true);
  };

  const handleExitChatConfirm = () => {
    navigate("/");
  };
  const handleExitChatCancel = () => {
    setIsExitPopupOpen(false);
  };

  //사이드바/히스토리 섹션/ .../이름변경
  const handleChangeInsightConfirm = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const PUT_DATA = {
        id: reportIdToChangeName,
        view_name: newReportName,
      };
      await axios.put(
        `https://wishresearch.kr/panels/update_insight`,
        PUT_DATA,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // Refresh the report list after successful update
      setReportRefreshTrigger((prev) => !prev);
      // Close the pop-up and reset state
      setIsReportChangePopupOpen(false);
      setReportIdToChangeName(null);
      setNewReportName("");
    } catch (error) {
      console.error("Error updating report name on server:", error);
    }
  };

  const handleChangeChatConfirm = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const PUT_DATA = {
        id: chatIdToChangeName,
        view_name: newChatName,
      };
      await axios.put(`https://wishresearch.kr/panels/update_chat`, PUT_DATA, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Use the stored access token
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // Refresh the chat list after successful update
      setChatRefreshTrigger((prev) => !prev);
      // Close the pop-up and reset state
      setIsChatChangePopupOpen(false);
      setChatIdToChangeName(null);
      setNewChatName("");
    } catch (error) {
      console.error("Error updating conversation on server:", error);
    }
  };

  const handleChangeCancel = () => {
    setIsReportChangePopupOpen(false);
    setIsChatChangePopupOpen(false);
    setReportIdToChangeName(null);
    setChatIdToChangeName(null);
    setNewReportName("");
    setNewChatName("");
  };

  //히스토리 부분??
  //아코디언 생성 코드   //아코디언 :  클릭하면 펼처지고 다시 클릭하면 접히는 형태의 인터페이스
  //1. 높이 제한
  // 사이드바의 최대 높이 설정
  const maxSidebarHeight = 600; // 예시로 700px 설정
  //각 아이템의 높이 설정
  const ITEM_HEIGHT = 50;

  // 2. 첫 번째 아코디언(보고서)와 두 번째 아코디언(대화 내역)의 높이를 계산하는 함수
  const calculateAccordionHeight = () => {
    const reportHeight = reports.length * ITEM_HEIGHT; // 보고서 섹션 높이
    const chatHeight = chatList.length * ITEM_HEIGHT; // 대화 내역 높이

    return { reportHeight, chatHeight };
  };

  //3. 높이 초과 체크

  const exceedsSidebarHeight = () => {
    const { reportHeight, chatHeight } = calculateAccordionHeight();

    // 두 아코디언이 열렸을 때의 총 높이 계산
    const totalHeight = reportHeight + chatHeight; // 조건 없이 둘 다 더함

    return totalHeight > maxSidebarHeight; // maxSidebarHeight와 비교하여 넘는지 확인
  };

  // 첫 번째 아코디언 토글 함수
  const toggleSection1 = () => {
    setIsSection1Open((prev) => {
      const willOpen = !prev;

      // 열릴 때 사이드바 높이를 초과하면 두 번째 아코디언을 닫음
      if (willOpen && exceedsSidebarHeight()) {
        setIsSection2Open(false);
      }
      setIsSection2Open(false);

      return willOpen;
    });
  };

  // 두 번째 아코디언 토글 함수
  const toggleSection2 = () => {
    setIsSection2Open((prev) => {
      const willOpen = !prev;

      // 열릴 때 사이드바 높이를 초과하면 첫 번째 아코디언을 닫음
      if (willOpen && exceedsSidebarHeight()) {
        setIsSection1Open(false);
      }
      setIsSection1Open(false);

      return willOpen;
    });
  };

  //아코디언 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggleRef.current && !toggleRef.current.contains(event.target)) {
        // 클릭한 곳이 요소 내부가 아니면 토글을 닫음
        setIsToggle(true);
      }
    };
    // 마운트될 때 클릭 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 언마운트될 때 클릭 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        insightEditBoxRef.current &&
        !insightEditBoxRef.current.contains(event.target) && //클릭한 요소가 인사이트 편집 박스 내부가 아니면
        !event.target.closest(".toggle")
      ) {
        setInsightEditToggleIndex(null); //클릭이 컴포넌트 외부에서 발생
      }
    };
    document.addEventListener("mousedown", handleClickOutside); //문서 전체에 마우스 클릭 이벤트 적용
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [insightEditBoxRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        historyEditBoxRef.current &&
        !historyEditBoxRef.current.contains(event.target) &&
        !event.target.closest(".toggle")
      ) {
        setEditToggleIndex(null); // setInsightEditToggleIndex가 아닌 히스토리용 상태를 업데이트
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [historyEditBoxRef]);

  const editBoxToggle = (index, event, category) => {
    // console.log("editBoxPosition:", editBoxPosition);
    if (editToggleIndex === index) {
      setEditToggleIndex(null);
      return;
    }
    setEditToggleIndex(index);

    if (event && accordionContentRef.current) {
      const container = accordionContentRef.current;
      const clickedElement = event.currentTarget;

      let top = clickedElement.offsetTop - container.scrollTop;
      let left = clickedElement.offsetLeft + clickedElement.offsetWidth + 10;

      // category에 따라 이동
      if (category === "recent") {
        left -= 190; // 최근 대화면 40px 왼쪽 이동
        top += 30; // 10px 아래로 이동
      } else if (category === "7days") {
        left -= 190; // 지난 7일이면 190px 왼쪽 이동
        top += 30; // 10px 아래로 이동
      } else if (category === "30days") {
        left -= 190; // 지난 30일이면 340px 왼쪽 이동
        top += 30; // 20px 아래로 이동
      }

      setEditBoxPosition({ top, left });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editToggleIndex !== null) {
        const editBoxElement = document.getElementById(
          `edit-box-${editToggleIndex}`
        );
        const toggleElement = document.getElementById(
          `insight-toggle-${editToggleIndex}`
        );
        if (
          editBoxElement &&
          !editBoxElement.contains(event.target) &&
          toggleElement &&
          !toggleElement.contains(event.target)
        ) {
          setEditToggleIndex(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editToggleIndex]);

  // 삭제 버튼 클릭 시, 삭제 경고 팝업 열기
  const handleDeleteButtonClick = (reportId) => {
    setReportIdToDelete(reportId); // 삭제할 reportId 저장
    setIsDeletePopupOpen(true); // 팝업 열기
  };

  const handleChatDeleteButtonClick = (ChatId) => {
    setChatIdToDelete(ChatId); // 삭제할 reportId 저장
    setChatIsDeletePopupOpen(true); // 팝업 열기
  };
  const [insightEditToggleIndex, setInsightEditToggleIndex] = useState(null);

  // 인사이트 보관함용 EditBox 열기/닫기 함수
  const insightEditBoxToggle = (index, event) => {
    setInsightEditToggleIndex((prevIndex) =>
      prevIndex === index ? null : index
    );

    if (event && insightAccordionContentRef.current) {
      const container = insightAccordionContentRef.current;
      const clickedElement = event.currentTarget;

      // Calculate the position considering the scroll
      const top = clickedElement.offsetTop - container.scrollTop - 10;
      const left = clickedElement.offsetLeft + clickedElement.offsetWidth - 30;

      setInsightEditBoxPosition({ top, left });
    }
  };

  useEffect(() => {
    const loadConversations = async () => {
      const allConversations = await getAllConversationsFromIndexedDB();
      setConversations(allConversations);
    };
    loadConversations();
  }, []);

  // 대화 리스트 가져오기 (챗 리스트)
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");

        if (!accessToken || !isLoggedIn) {
          setChatList([]); // 로그아웃 상태에서는 대화 리스트를 빈 배열로 설정
          return;
        }
        const response_chat_list = await axios.get(
          "https://wishresearch.kr/panels/chat_list",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const response = await getToolListOnServer(1000, 1, isLoggedIn);

        // 두 리스트 병합
        const mergedList = [
          ...response_chat_list.data.filter((item) => item.business_info),
          ...response.data,
        ];

        // 날짜 기준으로 정렬
        const sortedChatList = mergedList.sort((a, b) => {
          const dateA = b.timestamp;
          const dateB = a.timestamp;
          return dateA - dateB;
        }); // 최근 날짜 순으로 정렬

        // console.log("🚀 ~ fetchChatList ~ sortedChatList:", sortedChatList);
        setChatList(sortedChatList);
      } catch (error) {
        console.error("대화 목록 가져오기 오류:", error);
      }
    };
    fetchChatList();
  }, [chatRefreshTrigger, isLoggedIn]);

  useEffect(() => {
    // 서버에서 보고서 목록을 가져오는 함수
    const fetchReports = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken"); // 저장된 토큰 가져오기

        if (!accessToken || !isLoggedIn) {
          setReports([]); // 로그아웃 상태에서는 대화 리스트를 빈 배열로 설정
          return;
        }
        const response = await axios.get(
          "https://wishresearch.kr/panels/insight_list",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setReports(response.data); // 보고서 리스트를 상태로 설정
      } catch (error) {
        console.error("보고서 목록 가져오기 오류:", error);
      }
    };
    fetchReports();
  }, [reportRefreshTrigger, isLoggedIn]);

  const handleConversationClick = async (conversationId, conversationType) => {
    if (isLoading) {
      return;
    }
    if (conversationType === "expert") {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const response = await axios.get(
          `https://wishresearch.kr/panels/chat/${conversationId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const chatData = response.data.chat_data;
        setSavedTimestamp(chatData.timestamp); // 대화 날짜 설정
        setSelectedExpertIndex(
          chatData.expert_index !== undefined ? chatData.expert_index : "0"
        );
        setConversationId(chatData.id); // 대화 ID 설정
        setConversation(chatData.conversation); // 이전 대화 내역 설정
        setConversationStage(chatData.conversationStage); // 대화 단계 설정
        setInputBusinessInfo(chatData.inputBusinessInfo); // 비즈니스 정보 설정
        setTitleOfBusinessInfo(chatData.analysisReportData.title); // 분석 데이터 설정
        setMainFeaturesOfBusinessInformation(
          chatData.analysisReportData.mainFeatures
        ); // 주요 특징 설정
        setMainCharacteristicOfBusinessInformation(
          chatData.analysisReportData.mainCharacter
        ); // 주요 특징 설정
        setBusinessInformationTargetCustomer(
          chatData.analysisReportData.mainCustomer
        ); // 목표 고객 설정

        // 전문가 보고서 데이터 복구
        setStrategyReportData(chatData.strategyReportData || {});

        // 필요하다면 추가 상태 업데이트
        setSelectedAdditionalKeyword(chatData.selectedAdditionalKeyword || []);
        setAdditionalReportData(chatData.additionalReportData || []);
        setCustomerAdditionalReportData(
          chatData.customerAdditionalReportData || []
        );
        setSelectedCustomerAdditionalKeyword(
          chatData.selectedCustomerAdditionalKeyword || []
        );

        setSelectedPocOptions(chatData.selectedPocOptions || []);
        setSelectedPocTarget(chatData.selectedPocTarget || {});
        setRecommendedTargetData(chatData.recommendedTargetData || {});
        setPocPersonaList(chatData.pocPersonaList || []);
        setPocDetailReportData(chatData.pocDetailReportData || {});

        setIdeaFeatureData(chatData.ideaFeatureData || []);
        setIdeaRequirementData(chatData.ideaRequirementData || []);
        setIdeaFeatureDataTemp(chatData.ideaFeatureData || []);
        setIdeaRequirementDataTemp(chatData.ideaRequirementData || []);

        setIdeaList(chatData.ideaList || []);
        setIdeaGroup(chatData.ideaGroup || {});
        setIdeaPriority(chatData.ideaPriority || []);
        setIdeaMiroState(chatData.ideaMiroState || 0);

        setButtonState(chatData.buttonState || {});

        setGrowthHackerRecommendedSolution(
          chatData.growthHackerRecommendedSolution || []
        );
        setGrowthHackerReportData(chatData.growthHackerReportData || []);
        setGrowthHackerDetailReportData(
          chatData.growthHackerDetailReportData || []
        );
        setGrowthHackerSelectedSolution(
          chatData.growthHackerSelectedSolution || []
        );
        setKpiQuestionList(chatData.KpiQuestionList || []);

        setPriceReportData(chatData.priceReportData || {});
        setPriceScrapData(chatData.priceScrapData || {});
        setPriceProduct(chatData.priceProduct || []);
        setPriceSelectedProductSegmentation(
          chatData.priceSelectedProductSegmentation || []
        );
        setPriceProductSegmentation(chatData.priceProductSegmentation || []);

        setCaseReportData(chatData.caseReportData || []);
        setCaseHashTag(chatData.caseHashTag || []);

        setSurveyGuidelineDetailReportData(
          chatData.surveyGuidelineDetailReportData || {}
        );
        setSurveyGuidelineReportData(chatData.surveyGuidelineReportData || {});
        setSurveyGoalSuggestionList(chatData.surveyGoalSuggestionList || []);
        setSurveyGoalFixed(chatData.surveyGoalFixed || []);
        setSurveyQuestionList(chatData.surveyQuestionList || []);

        setBmModelSuggestionReportData(
          chatData.bmModelSuggestionReportData || []
        );
        setBmQuestionList(chatData.bmQuestionList || []);
        setBmSelectedProblemOptions(chatData.bmSelectedProblemOptions || {});
        setBmOrLean(chatData.bmOrLean || "");
        setBmBmAutoReportData(chatData.bmBmAutoReportData || []);
        setBmLeanAutoReportData(chatData.bmLeanAutoReportData || []);
        setBmBmAdsReportData(chatData.bmBmAdsReportData || []);
        setBmLeanAdsReportData(chatData.bmLeanAdsReportData || []);
        setBmBmCustomReportData(chatData.bmBmCustomReportData || []);
        setBmLeanCustomReportData(chatData.bmLeanCustomReportData || []);

        setIsMarketing(chatData.isMarketing || false);
        setMarketingMbtiResult(chatData.marketingMbtiResult || {});
        setMarketingResearchReportData(
          chatData.marketingResearchReportData || []
        );
        setMarketingBmReportData(chatData.marketingBmReportData || []);
        setMarketingCustomerData(chatData.marketingCustomerData || []);
        setMarketingSelectedCustomer(chatData.marketingSelectedCustomer || []);
        setMarketingFinalCustomer(chatData.marketingFinalCustomer || {});
        setMarketingFinalReportData(chatData.marketingFinalReportData || []);

        setStrategyConsultantReportData(
          chatData.strategyConsultantReportData || []
        );

        if (chatData.isMarketing) {
          const updatedConversation = [...chatData.conversation];

          if (
            updatedConversation.length > 0 &&
            updatedConversation[updatedConversation.length - 1].type ===
              "marketingSignUpButton"
          ) {
            updatedConversation.pop();
            updatedConversation.pop();
          }

          setConversation(updatedConversation);
          saveConversation({
            changingConversation: {
              conversation: updatedConversation,
              conversationId: chatData.id,
              timestamp: chatData.timestamp,
              isMarketing: chatData.isMarketing,
              expert_index: chatData.expert_index,
              inputBusinessInfo: chatData.inputBusinessInfo,
              analysisReportData: chatData.analysisReportData,
              conversationStage: chatData.conversationStage,
              title: chatData.analysisReportData.title,
              mainFeatures: chatData.analysisReportData.mainFeatures,
              marketingMbtiResult: chatData.marketingMbtiResult,
              marketingResearchReportData: chatData.marketingResearchReportData,
              marketingBmReportData: chatData.marketingBmReportData,
              marketingCustomerData: chatData.marketingCustomerData,
              marketingSelectedCustomer: chatData.marketingSelectedCustomer,
              marketingFinalCustomer: chatData.marketingFinalCustomer,
              marketingFinalReportData: chatData.marketingFinalReportData,
            },
          });
        }

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

        // 페이지를 대화가 이어지는 형태로 전환
        navigate(`/conversation/${conversationId}`);
      } catch (error) {
        console.error("대화 내용 가져오기 오류:", error);
      }
    } else {
      try {
        const accessToken = sessionStorage.getItem("accessToken");

        const response = await getToolOnServer(conversationId, isLoggedIn);

        const chatData = response;

        setToolStep(1);
        setToolId("");
        setTargetDiscoveryInfo({
          type: "",
          business: "",
          target: "",
          specific_situation: "",
          country: "",
        });
        setTargetDiscoveryPersona([]);
        setTargetDiscoveryScenario([]);
        setTargetDiscoveryFinalReport({});
        setToolLoading(false);
        // console.log("🚀 ~ handleConversationClick ~ chatData:", chatData);
        setToolStep(chatData?.completed_step);
        setToolId(chatData?.id);
        setTargetDiscoveryInfo({
          type: chatData?.type,
          business: chatData?.business,
          target: chatData?.target,
          specific_situation: chatData?.specific_situation,
          country: chatData?.country,
        });
        setTargetDiscoveryPersona(chatData?.target_discovery_persona);
        setTargetDiscoveryScenario(chatData?.target_discovery_scenario);
        setTargetDiscoveryFinalReport(chatData?.target_discovery_final_report);
        setToolLoading(true);

        // customer value persona 타입일 경우

        setToolStep(1);
        setToolId("");
        setCustomerValueAnalyzerInfo({
          business: "",
          target_list: [],
          analysis_scope: "",
          analysis_purpose: "",
        });
        setCustomerValueAnalyzerPersona([]);
        setCustomerValueAnalyzerJourneyMap([]);
        setCustomerValueAnalyzerFactor([]);
        setCustomerValueAnalyzerClustering([]);
        setCustomerValueAnalyzerPositioning([]);
        setCustomerValueAnalyzerFinalReport({});
        setCustomerValueAnalyzerSelectedPersona([]);
        setToolLoading(false);
        setToolStep(chatData?.completed_step);
        setToolId(chatData?.id);
        setCustomerValueAnalyzerInfo({
          business: chatData?.business,
          target_list: chatData?.target_list,
          analysis_scope: chatData?.analysis_scope,
          analysis_purpose: chatData?.analysis_purpose,
        });
        setCustomerValueAnalyzerPersona(chatData?.customer_value_persona || []);
        setCustomerValueAnalyzerJourneyMap(
          chatData?.customer_value_journey_map || []
        );
        setCustomerValueAnalyzerSelectedPersona(
          chatData?.selected_customer_value_persona || []
        );
        setCustomerValueAnalyzerFactor(chatData?.customer_value_factor || []);
        setCustomerValueAnalyzerClustering(
          chatData?.customer_value_clustering || []
        );
        // setCustomerValueAnalyzerSelectedFactor(
        //   chatData.customer_value_selected_factor || []
        // );
        setCustomerValueAnalyzerPositioning(
          chatData?.customer_value_positioning || []
        );
        setCustomerValueAnalyzerFinalReport(
          chatData?.customer_value_final_report || {}
        );
        setToolLoading(true);
        setIdeaGeneratorInfo({});
        setIdeaGeneratorPersona([]);
        setIdeaGeneratorIdea([]);
        setIdeaGeneratorClustering([]);
        setIdeaGeneratorFinalReport({});
        setIdeaGeneratorSelectedPersona([]);
        setIdeaGeneratorKnowTarget(null);

        setIdeaGeneratorInfo({
          business: chatData?.business,
          core_value: chatData?.core_value,
        });

        setIdeaGeneratorPersona(chatData?.idea_generator_persona || []);
        setIdeaGeneratorIdea(chatData?.idea_generator_idea || []);
        setIdeaGeneratorClustering(chatData?.idea_generator_clustering || []);
        setIdeaGeneratorFinalReport(
          chatData?.idea_generator_final_report || {}
        );
        setIdeaGeneratorSelectedPersona(
          chatData?.idea_generator_selected_persona || []
        );
        setIdeaGeneratorKnowTarget(chatData?.idea_generator_know_target);

        setDesignAnalysisEmotionAnalysis([]);
        setDesignAnalysisBusinessInfo("");
        setDesignAnalysisUploadedFiles([]);
        setDesignAnalysisFileId([]);
        setDesignAnalysisSelectedPersona([]);
        setDesignAnalysisEmotionTarget({});
        setDesignAnalysisEmotionScale([]);
        setDesignAnalysisFileNames([]);
        setToolLoading(false);
        setToolStep(chatData?.completed_step);
        setToolId(chatData?.id);
        setDesignAnalysisEmotionAnalysis(
          chatData?.design_emotion_analysis || []
        );
        setDesignAnalysisBusinessInfo(chatData?.business || "");
        setDesignAnalysisSelectedPersona(
          chatData?.design_selected_persona || []
        );
        setDesignAnalysisEmotionTarget(chatData?.design_emotion_target || {});
        setDesignAnalysisEmotionScale(chatData?.design_emotion_scale || []);
        setDesignAnalysisFileNames(
          chatData?.image_name?.map((item) => item.name) || []
        );
        setDesignAnalysisFileId(
          chatData?.image_name?.map((item) => item.id) || []
        );
        setToolLoading(true);

        if (chatData.isMarketing) {
          const updatedConversation = [...chatData.conversation];

          if (
            updatedConversation.length > 0 &&
            updatedConversation[updatedConversation.length - 1].type ===
              "marketingSignUpButton"
          ) {
            updatedConversation.pop();
            updatedConversation.pop();
          }

          setConversation(updatedConversation);
          saveConversation({
            changingConversation: {
              conversation: updatedConversation,
              conversationId: chatData.id,
              timestamp: chatData.timestamp,
              isMarketing: chatData.isMarketing,
              expert_index: chatData.expert_index,
              inputBusinessInfo: chatData.inputBusinessInfo,
              analysisReportData: chatData.analysisReportData,
              conversationStage: chatData.conversationStage,
              title: chatData.analysisReportData.title,
              mainFeatures: chatData.analysisReportData.mainFeatures,
              marketingMbtiResult: chatData.marketingMbtiResult,
              marketingResearchReportData: chatData.marketingResearchReportData,
              marketingBmReportData: chatData.marketingBmReportData,
              marketingCustomerData: chatData.marketingCustomerData,
              marketingSelectedCustomer: chatData.marketingSelectedCustomer,
              marketingFinalCustomer: chatData.marketingFinalCustomer,
              marketingFinalReportData: chatData.marketingFinalReportData,
            },
          });
        }

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

        // 페이지를 대화가 이어지는 형태로 전환
        // navigate(`/TargetDiscovery`);

        if (chatData.type === "ix_customer_value_persona") {
          navigate(`/CustomerValueAnalyzer`);
        } else if (chatData.type === "ix_idea_generator_persona") {
          navigate(`/IdeaGenerator`);
        } else if (chatData.type === "ix_target_discovery_persona") {
          navigate(`/TargetDiscovery`);
        } else if (chatData.type === "ix_design_emotion_analysis") {
          navigate(`/DesignAnalysis`);
        }
      } catch (error) {
        console.error("대화 내용 가져오기 오류:", error);
      }
    }
  };

  const handleLoginClick = () => {
    setIsLoginPopupOpen(true); // 로그인 팝업 열기
  };

  const closeLoginPopup = () => {
    setIsLoginPopupOpen(false); // 로그인 팝업 닫기
  };

  const closeSignupPopup = () => {
    setIsSignupPopupOpen(false); // 회원가입 팝업 닫기
  };

  const handleAccountClick = () => {
    setAccountPopupOpen(true); // 계정설정 팝업 열기
  };

  const closeAccountPopup = () => {
    setAccountPopupOpen(false); // 계정설정 팝업 닫기
  };

  const handleLogoutClick = () => {
    // 로그아웃 버튼 클릭 시 로그아웃 팝업 열기
    setIsLogoutPopup(true);
  };

  const handleLogoutConfirm = () => {
    // 로그아웃 확인 버튼을 눌렀을 때 실행
    sessionStorage.clear(); // 세션 스토리지 모두 삭제
    setIsLoggedIn(false);
    setIsSocialLoggedIn(false);
    setUserName("");
    setUserEmail("");
    setIsLogoutPopup(false); // 로그아웃 팝업 닫기
    window.location.href = "/"; // 페이지 이동
  };

  const handleCloseLogoutPopup = () => {
    // 로그아웃 팝업 닫기
    setIsLogoutPopup(false);
  };

  const handleReportClick = async (reportId) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken"); // 저장된 토큰 가져오기
      const response = await axios.get(
        `https://wishresearch.kr/panels/insight/${reportId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSelectedReport(response.data); // 선택된 보고서의 상세 데이터 상태로 설정
    } catch (error) {
      console.error("보고서 상세 정보 가져오기 오류:", error);
    }
  };

  const closePopup = () => {
    setSelectedReport(null); // 팝업 닫기
  };

  const handleDeleteInsightConfirm = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken"); // 저장된 토큰 가져오기
      const response = await axios.delete(
        `https://wishresearch.kr/panels/insight/delete/${reportIdToDelete}`, // reportId를 이용해 URL 동적으로 생성
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // 삭제가 성공적으로 이루어진 경우 처리할 코드

      // 삭제 후에 상태 업데이트 (예: 삭제된 항목을 리스트에서 제거)
      setReports((prevReports) =>
        prevReports.filter((report) => report.id !== reportIdToDelete)
      );

      // 팝업 닫기 및 삭제할 reportId 초기화
      setIsDeletePopupOpen(false);
      setReportIdToDelete(null);
      setReportRefreshTrigger((prev) => !prev);
    } catch (error) {
      console.error("삭제 요청 오류:", error);
    }
  };

  const handleDeleteHistoryConfirm = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken"); // 저장된 토큰 가져오기
      const response = await axios.delete(
        `https://wishresearch.kr/panels/chat/delete/${chatIdToDelete}`, // reportId를 이용해 URL 동적으로 생성
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // 삭제가 성공적으로 이루어진 경우 처리할 코드

      // 삭제 후에 상태 업데이트 (예: 삭제된 항목을 리스트에서 제거)
      setReports((prevReports) =>
        prevReports.filter((chat) => chat.id !== chatIdToDelete)
      );

      // 팝업 닫기 및 삭제할 reportId 초기화
      setChatIsDeletePopupOpen(false);
      setChatIdToDelete(null);
      setChatRefreshTrigger((prev) => !prev);
      if (chatIdToDelete === conversationId) {
        navigate("/"); // / 경로로 이동
      }
    } catch (error) {
      console.error("삭제 요청 오류:", error);
    }
  };

  // 삭제 취소 처리 함수
  const handleDeleteCancel = () => {
    setIsDeletePopupOpen(false); // 팝업 닫기
    setChatIsDeletePopupOpen(false);
    setReportIdToDelete(null); // 삭제할 reportId 초기화
    setChatIdToDelete(null);
  };

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

  // 클릭 시 이동
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  // 컴포넌트가 마운트될 때 모바일 상태에 따라 초기 상태 설정
  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile, setIsOpen]);

  const [isToggle, setIsToggle] = useState(true);
  const moreProfile = (event) => {
    event.stopPropagation(); // 내부 클릭 이벤트가 외부로 전파되지 않도록 방지
    setIsToggle((prev) => !prev); // 팝업 열기/닫기
  };

  //새작업 버튼 클릭 시 호출되는 함수
  const handleNewProjectClick = () => {
    // if (!isLoggedIn) {
    //   setIsPopupLogin(true);
    //   return;
    // }

    // if (isLoading) {
    //   setIsExitPopupOpen(true);
    //   return;
    // }

    setPersonaStep(0);

    window.location.href = "/";
  };

  const [showSubNav, setShowSubNav] = useState(false);

  const handleWorkManageClick = () => {
    if (!isLoggedIn) {
      setIsPopupLogin(true);
      return;
    }

    setShowSubNav(!showSubNav);
  };

  const handleMyProjectClick = () => {
    setPersonaStep(0);
    setProjectId("");
    setProjectReportId("");
    setProjectList([]);
    setProjectReportList([]);
    setReportList([]);
    setPersonaList({
      selected: [],
      unselected: [],
    });
    setSelectedPersonaList([]);
    setCustomizePersonaList({
      selected: [],
      unselected: [],
    });
    setInterviewQuestionList([]);
    setSelectedInterviewPurpose("");
    setCategoryColor({});
    setProjectLoadButtonState(false);
    setReportLoadButtonState(false);
    setReportDescriptionLoadButtonState(false);
    setInterviewData([]);
    setInterviewReport([]);
    setInterviewReportAdditional([]);
    setIsEditMode(false);
    setIsShowToast(false);
    setCustomPersonaList([]);

    if (isLoggedIn) {
      setRefreshTrigger((prev) => prev + 1); // 트리거 증가로 새로고침 실행
      navigate("/MyProject", { replace: true });
    } else {
      if (!isLoggedIn) {
        setIsPopupLogin(true);
        return;
      }
    }
  };

  const handleCloseSubNav = () => {
    setShowSubNav(false);
  };

  const [isHomePopupOpen, setIsHomePopupOpen] = useState(false);

  const handleConfirmAndNavigate = () => {
    handleNewProjectClick();
    setIsHomePopupOpen(false);
  };

  const handleCloseHomePopup = () => {
    setIsHomePopupOpen(false);
  };

  const handleClickHome = () => {
    // console.log("test logo click");
    if (location.pathname !== "/") {
      setIsHomePopupOpen(true);
    }
  };

  //메뉴리스트-> molcules로?
  return (
    <>
      <NavigationWrap>
        <Link onClick={() => handleClickHome()}>
          <Logo />
        </Link>

        <MenuList>
          <li onClick={handleNewProjectClick} className="home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
            >
              <path
                d="M10.4703 1.67781C9.94131 1.13051 9.05869 1.13051 8.52968 1.67781L1.876 8.56168C1.05756 9.40844 1.66315 10.8143 2.84632 10.8143H3.35025V15.7309C3.35025 16.5795 4.04437 17.2673 4.90061 17.2673H8.00132V13.119C8.00132 12.2987 8.6723 11.6338 9.5 11.6338C10.3277 11.6338 10.9987 12.2987 10.9987 13.119V17.2673H14.2027C15.059 17.2673 15.7531 16.5795 15.7531 15.7309V10.8143H16.1537C17.3369 10.8143 17.9424 9.40843 17.124 8.56168L10.4703 1.67781Z"
                stroke="#666666"
                stroke-width="1.33333"
              />
            </svg>

            <span>HOME</span>
          </li>

          <li onClick={() => navigate("/DashBoard")} className="dashboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <rect
                x="3.5"
                y="3.26733"
                width="5.96754"
                height="5.96754"
                rx="0.661257"
                stroke="#666666"
              />
              <rect
                x="11.6289"
                y="3.26733"
                width="5.96754"
                height="5.96754"
                rx="0.661257"
                stroke="#666666"
              />
              <rect
                x="11.6289"
                y="11.3962"
                width="5.96754"
                height="5.96754"
                rx="0.661257"
                stroke="#666666"
              />
              <rect
                x="3.5"
                y="11.3962"
                width="5.96754"
                height="5.96754"
                rx="0.661257"
                stroke="#666666"
              />
            </svg>

            <span>대시보드</span>
          </li>

          <li onClick={() => navigate("/AiPersona")} className="persona">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
            >
              <path
                d="M4.3671 6.17358C4.47011 7.60339 5.53077 8.70483 6.68741 8.70483C7.84405 8.70483 8.90648 7.60374 9.00773 6.17358C9.1132 4.68612 8.08066 3.64233 6.68741 3.64233C5.29417 3.64233 4.26163 4.71319 4.3671 6.17358Z"
                stroke="#666"
                stroke-width="1.125"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.68764 10.9548C8.97877 10.9548 11.182 12.0928 11.734 14.3091C11.8071 14.6023 11.6232 14.8923 11.3219 14.8923H2.05299C1.7517 14.8923 1.56889 14.6023 1.64096 14.3091C2.19291 12.0573 4.39616 10.9548 6.68764 10.9548Z"
                stroke="#666"
                stroke-width="1.125"
                stroke-miterlimit="10"
              />
              <path
                d="M11.4688 6.80429C11.551 7.94616 12.4082 8.84546 13.3321 8.84546C14.256 8.84546 15.1145 7.94651 15.1953 6.80429C15.2794 5.61636 14.4451 4.76733 13.3321 4.76733C12.219 4.76733 11.3848 5.63815 11.4688 6.80429Z"
                stroke="#666"
                stroke-width="1.125"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.2575 11.0246C11.892 10.7339 12.5909 10.6221 13.3317 10.6221C15.1598 10.6221 16.9211 11.5309 17.3624 13.301C17.4204 13.5351 17.2734 13.7668 17.0329 13.7668H13.0856"
                stroke="#666"
                stroke-width="1.125"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
            </svg>

            <span>페르소나</span>
          </li>

          <li onClick={() => navigate("/Tool")} className="research">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="25"
              viewBox="0 0 27 25"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.0468 8.00732C17.7344 8.61753 17.2913 9.11436 16.8005 9.50821C16.4813 9.76433 16.1402 9.97879 15.7976 10.1558C16.5655 10.5238 17.1449 11.0936 17.5631 11.7297C17.7497 12.0133 17.9047 12.3106 18.0317 12.6101C18.308 12.1292 18.6624 11.7073 19.059 11.3464C19.4728 10.9699 19.9361 10.6557 20.4141 10.4039C19.7026 10.0837 19.1416 9.60167 18.7094 9.05924C18.4416 8.72319 18.2233 8.36469 18.0468 8.00732ZM17.4279 14.8634C17.4277 14.1931 17.2134 13.1727 16.6565 12.3258C16.1146 11.5015 15.2573 10.8479 13.916 10.8115C13.556 10.8018 13.4086 10.503 13.3831 10.3426C13.3681 10.2485 13.3736 10.1225 13.44 9.99631C13.5145 9.85469 13.6517 9.74486 13.8234 9.71151C14.4839 9.58321 15.3864 9.25175 16.1214 8.66197C16.8443 8.08188 17.3903 7.26785 17.426 6.13639C17.4377 5.7665 17.7502 5.62493 17.9097 5.60405C18.0041 5.59169 18.1278 5.60079 18.2499 5.66791C18.3862 5.74282 18.4946 5.8783 18.5268 6.05039C18.6506 6.71102 18.9592 7.63179 19.5579 8.38304C20.1431 9.11738 21.0054 9.69443 22.2969 9.72375C22.6358 9.73144 22.7981 10.0029 22.8303 10.1805C22.848 10.2788 22.8434 10.4091 22.7752 10.5383C22.6993 10.6822 22.5632 10.7863 22.4017 10.8206C21.5393 11.0042 20.5523 11.4546 19.7893 12.1489C19.0338 12.8364 18.5167 13.7425 18.5129 14.8651L18.5129 14.8778H17.4279L17.4279 14.8634ZM13.9454 9.72692L13.9474 9.72698L13.9454 9.72692ZM7.38263 8.50154C7.08301 8.50154 6.84013 8.74442 6.84013 9.04404V19.5233C6.84013 19.823 7.08301 20.0658 7.38263 20.0658H19.2113C19.5109 20.0658 19.7538 19.823 19.7538 19.5233V15.6146H20.8388V19.5233C20.8388 20.4222 20.1101 21.1508 19.2113 21.1508H7.38263C6.48379 21.1508 5.75513 20.4222 5.75513 19.5233V9.04404C5.75513 8.14519 6.48378 7.41653 7.38263 7.41653H12.6407C12.9403 7.41653 13.1832 7.65942 13.1832 7.95904C13.1832 8.25865 12.9403 8.50154 12.6407 8.50154H7.38263Z"
                fill="#666666"
              />
            </svg>

            <span>리서치툴</span>
          </li>

          <li onClick={() => navigate("")} className="storagebox">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
            >
              <path
                d="M4.30088 8.85938H1.91275C1.35364 8.85938 0.900391 9.31262 0.900391 9.87174V16.5C0.900391 17.0591 1.35364 17.5124 1.91275 17.5124H16.0858C16.6449 17.5124 17.0981 17.0591 17.0981 16.5V9.87173C17.0981 9.31262 16.6449 8.85938 16.0858 8.85938H13.6977C13.1385 8.85938 12.6853 9.31262 12.6853 9.87173V11.4249C12.6853 11.984 12.232 12.4372 11.6729 12.4372H8.99927H6.3256C5.76649 12.4372 5.31324 11.984 5.31324 11.4249V9.87173C5.31324 9.31262 4.85999 8.85938 4.30088 8.85938Z"
                stroke="#666666"
                stroke-width="1.01236"
              />
              <path
                d="M1.08789 9.24237L4.15858 1.56219C4.24528 1.34533 4.45529 1.20312 4.68884 1.20312H13.1816C13.4122 1.20312 13.6202 1.3419 13.7088 1.55489L16.9063 9.24237"
                stroke="#666666"
                stroke-width="1.0108"
              />
            </svg>

            <span>보관함</span>
          </li>

          {/* <li onClick={handleNewProjectClick}>
            <svg
              width="32"
              height="33"
              viewBox="0 0 32 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect //배경 사각형
                y="0.267578"
                width="32"
                height="32"
                rx="9.84615"
                fill="#fff"
              />
              <path //플러스 기호
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.999 13.1006C16.999 12.5483 16.5513 12.1006 15.999 12.1006C15.4467 12.1006 14.999 12.5483 14.999 13.1006V15.2676H12.833C12.2807 15.2676 11.833 15.7153 11.833 16.2676C11.833 16.8199 12.2807 17.2676 12.833 17.2676H14.999V19.4341C14.999 19.9864 15.4467 20.4341 15.999 20.4341C16.5513 20.4341 16.999 19.9864 16.999 19.4341V17.2676H19.1665C19.7188 17.2676 20.1665 16.8199 20.1665 16.2676C20.1665 15.7153 19.7188 15.2676 19.1665 15.2676H16.999V13.1006Z"
                fill="#226FFF"
              />
            </svg>

            <span>새 작업</span>
          </li>

          <li onClick={handleMyProjectClick} className="management">
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.20104 1.3291H2C1.44772 1.3291 1 1.77682 1 2.3291V13.6713C1 14.2236 1.44772 14.6713 2 14.6713H16C16.5523 14.6713 17 14.2236 17 13.6713V4.40885C17 3.85657 16.5523 3.40885 16 3.40885H8.79244C8.48312 3.40885 8.19121 3.26571 8.00181 3.02115L6.99167 1.71681C6.80227 1.47225 6.51036 1.3291 6.20104 1.3291Z"
                stroke="#666"
              />
            </svg>

            <span>작업관리</span>
          </li>

          <li onClick={handleWorkManageClick} className="history">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
            >
              <path
                d="M11.5866 11.0594C11.8059 11.29 11.7975 11.6549 11.5669 11.8764C10.4257 12.9656 8.72978 13.5899 6.91778 13.5899C6.34332 13.5899 5.77661 13.514 5.22188 13.3881L2.81153 15.1002C2.71098 15.1705 2.59356 15.2064 2.47685 15.2064C2.36013 15.2064 2.24622 15.1719 2.14778 15.1023C1.9481 14.9638 1.85598 14.7135 1.91927 14.4779L2.55489 12.1147C1.50161 11.2491 0.900391 10.0933 0.900391 8.88173C0.900391 7.79961 1.37922 6.74348 2.25039 5.90618C2.48102 5.68469 2.84594 5.69384 3.06602 5.92235C3.28751 6.15297 3.28047 6.51789 3.04984 6.73938C2.39805 7.36376 2.05422 8.10555 2.05422 8.88108C2.05422 9.84576 2.58367 10.7493 3.54133 11.4228C3.56454 11.439 3.58282 11.4608 3.60462 11.4784C3.61165 11.484 3.61727 11.4889 3.6243 11.4967C3.6693 11.5438 3.70727 11.5993 3.73399 11.6584C3.73962 11.6689 3.74313 11.6816 3.74665 11.6942C3.76985 11.7589 3.78813 11.8257 3.78813 11.896C3.78813 11.9467 3.7811 12.0022 3.76844 12.0507L3.45133 13.2263L4.75282 12.3031C4.81962 12.256 4.89696 12.2293 4.9757 12.2131C4.97922 12.2131 4.98484 12.2131 4.98836 12.211C5.0207 12.2054 5.05305 12.197 5.08539 12.197C5.09102 12.197 5.09453 12.2005 5.09945 12.2005C5.14656 12.2005 5.19297 12.204 5.24008 12.2166C5.7857 12.3608 6.34891 12.4346 6.91768 12.4346C8.43718 12.4346 9.84058 11.927 10.7694 11.0396C11 10.8202 11.3649 10.8273 11.5864 11.0593L11.5866 11.0594ZM16.8424 12.9227C16.7454 12.9874 16.6336 13.0197 16.5218 13.0197C16.3973 13.0197 16.2736 12.9804 16.1709 12.9009L12.8085 10.3323C12.047 10.5679 11.2244 10.6979 10.3659 10.6979C6.66887 10.6979 3.66092 8.35433 3.66092 5.47088C3.66092 2.58668 6.66887 0.238281 10.3659 0.238281C14.063 0.238281 17.0709 2.58533 17.0709 5.47088C17.0709 6.47917 16.7109 7.43828 16.0303 8.27153L17.0815 12.2948C17.1426 12.5339 17.047 12.7863 16.8424 12.9213L16.8424 12.9227ZM15.5388 10.9624L14.8371 8.2715C14.7851 8.07322 14.8512 7.88057 14.9791 7.74064L14.9721 7.73361C15.5894 7.06423 15.915 6.28095 15.915 5.46951C15.915 3.22161 13.4259 1.39281 10.3659 1.39281C7.30589 1.39281 4.81679 3.22161 4.81679 5.46951C4.81679 7.71741 7.30589 9.54126 10.3659 9.54126C11.1991 9.54126 11.995 9.40837 12.7312 9.1468L12.8177 9.12008L12.8212 9.12923C12.9759 9.1004 13.1398 9.12923 13.2748 9.23329L15.5389 10.9629L15.5388 10.9624Z"
                fill="#666"
              />
            </svg>

            <span>Explore</span>
          </li> */}
        </MenuList>

        <Setting className="logBtn">
          {/*v CSS에서  */}
          {isLoggedIn ? (
            // <button onClick={handleLogout}>로그아웃</button>
            <>
              <LogoutBtnWrap className="logInfo">
                {/* <div>
                  <strong>{sessionStorage.getItem("userName")}</strong>{" "}
                  <p>{sessionStorage.getItem("userEmail")}</p>{" "}
                </div> */}

                <button className="more" onMouseDown={moreProfile}>
                  {/* <img src={images.AccountSetting} alt="" /> */}
                  <span>
                    {(() => {
                      const userName = sessionStorage.getItem("userName");
                      return userName && userName.length > 1
                        ? `${userName.slice(0, 1)}`
                        : userName;
                    })()}
                  </span>
                </button>
              </LogoutBtnWrap>

              <LogoutToggle
                ref={toggleRef}
                isToggle={isToggle}
                className="AccountInfo"
              >
                <div className="info">
                  <div className="userName">
                    <strong>{sessionStorage.getItem("userName")}</strong>
                    {/* 일반일때 Grade General */}
                    {userMembership === "Normal" ? (
                      <Grade General />
                    ) : (
                      <Grade />
                    )}
                  </div>
                  {/* 유저 이름 표시 */}
                  <Caption2 color="gray500" align="left">
                    {sessionStorage.getItem("userEmail")}
                  </Caption2>
                  {/* 유저 이메일 표시 */}
                </div>

                <ul>
                  {/* 소셜 로그인 상태가 아닐 때만 비밀번호 변경 버튼을 표시 */}
                  {
                    // <li>
                    //   <button type="button" onClick={handleAccountClick}>
                    //     <img src={images.AccountSetting} alt="" />
                    //     비밀번호 변경
                    //   </button>
                    // </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => navigate("/MyProfile")}
                      >
                        <img src={images.AccountSetting} alt="" />
                        계정 설정
                      </button>
                    </li>
                  }

                  {/* <li>
                    <button type="button">
                      <img src={images.AccountInfo} alt="" />
                      정책 및 약관 정보
                    </button>
                  </li> */}

                  <li>
                    <button type="button" onClick={handleLogoutClick}>
                      <img src={images.AccountLogout} alt="" />
                      로그아웃
                    </button>
                  </li>
                </ul>
              </LogoutToggle>
            </>
          ) : (
            <>
              <button onClick={handleLoginClick} className="login">
                <img src={images.PersonCircle} alt="로그인" />
                로그인
              </button>
              {/* <Link to="/signup">회원가입</Link> */}

              {/* <div className="terms">
                <Link to="#">이용약관</Link>
                <Link to="#">개인정보처리방침</Link>
              </div> */}
            </>
          )}
        </Setting>
      </NavigationWrap>

      <SubNavigation show={showSubNav}>
        {/* 히스토리 누르면 */}
        <SubTitle>
          <div>
            <images.ClockClockwise
              width="17"
              height="17"
              color={palette.gray700}
            />
            {/* <img src={images.ClockCounterclockwise} alt="" /> */}
            Explore 사용 내역
          </div>
          <img
            src={images.ArrowBarLeft}
            alt="닫기"
            onClick={handleCloseSubNav}
          />
        </SubTitle>

        <HistoryWrap
          className="scrollbar"
          ref={accordionContentRef}
          style={{
            maxHeight: isSection2Open ? "calc(100vh - 26rem)" : "auto",
          }}
        >
          {chatList && chatList.length > 0 ? (
            <>
              <HistoryList>
                <strong>최근 사용 내역</strong>
                {true ? (
                  // chatList.some(
                  //   (chat) => Date.now() - chat.timestamp <= 604800000
                  // )
                  <>
                    <ul>
                      {chatList
                        .filter(
                          (chat) => Date.now() - chat.timestamp <= 604800000
                        )
                        .map((chat) => (
                          <li
                            key={chat.id}
                            className={`toggle ${
                              editToggleIndex === chat._id ? "active" : ""
                            }`}
                          >
                            <p
                              onClick={() =>
                                handleConversationClick(
                                  chat._id || chat.id,
                                  chat.type || "expert"
                                )
                              }
                            >
                              {chat.type === "ix_target_discovery_persona"
                                ? "타겟 탐색기 - "
                                : chat.type === "ix_idea_generator_persona"
                                ? "아이디어 생성기 - "
                                : chat.type === "ix_customer_value_persona"
                                ? "고객 핵심 가치 분석기 - "
                                : chat.type === "ix_design_emotion_analysis"
                                ? "디자인 감정 분석기 - "
                                : "전문가 챗 - "}
                              {chat.view_name ||
                                chat.business ||
                                chat.business_info}
                            </p>
                            <span
                              id={`insight-toggle-${chat._id}`}
                              style={{
                                display: "inline-block",
                                cursor: "pointer",
                              }}
                              onClick={(event) =>
                                editBoxToggle(chat._id, event, "recent")
                              }
                              className="toggle"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="3"
                                viewBox="0 0 14 3"
                                fill="none"
                              >
                                <circle
                                  cx="2.0067"
                                  cy="1.51283"
                                  r="1.49694"
                                  transform="rotate(-90 2.0067 1.51283)"
                                  fill="#A0A0A0"
                                />
                                <circle
                                  cx="7.00084"
                                  cy="1.51283"
                                  r="1.49694"
                                  transform="rotate(-90 7.00084 1.51283)"
                                  fill="#A0A0A0"
                                />
                                <circle
                                  cx="11.993"
                                  cy="1.51283"
                                  r="1.49694"
                                  transform="rotate(-90 11.993 1.51283)"
                                  fill="#A0A0A0"
                                />
                              </svg>
                            </span>

                            {editToggleIndex === chat.id && (
                              <div
                                id={`insight-edit-box-${chat.id}`}
                                className="insight-toggle"
                                ref={historyEditBoxRef}
                              >
                                <EditBox
                                  id={`insight-edit-box-${chat.id}`}
                                  isEditToggle={editToggleIndex === chat.id}
                                  style={{
                                    top: `${editBoxPosition.top}px`,
                                    left: `${editBoxPosition.left}px`,
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleChatDeleteButtonClick(chat.id)
                                    }
                                  >
                                    <img src={images.IconDelete2} alt="" />
                                    삭제
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleChangeChatNameButtonClick(chat.id)
                                    }
                                  >
                                    <img src={images.IconEdit2} alt="" />
                                    이름 변경
                                  </button>
                                </EditBox>
                              </div>
                            )}
                          </li>
                        ))}
                    </ul>
                  </>
                ) : (
                  <NoData Small>
                    <Sub3 color="gray300">사용 내역 없음</Sub3>
                  </NoData>
                )}
              </HistoryList>

              <HistoryList>
                <strong>지난 7일 사용 내역</strong>
                {chatList.some(
                  (chat) =>
                    Date.now() - chat.timestamp > 604800000 &&
                    Date.now() - chat.timestamp <= 2592000000
                ) ? (
                  <>
                    <ul>
                      {chatList
                        .filter(
                          (chat) =>
                            Date.now() - chat.timestamp > 604800000 &&
                            Date.now() - chat.timestamp <= 2592000000
                        )
                        .map((chat) => (
                          <li
                            key={chat.id}
                            className={`toggle ${
                              editToggleIndex === chat.id ? "active" : ""
                            }`}
                          >
                            <p onClick={() => handleConversationClick(chat.id)}>
                              {chat.view_name || chat.business_info}
                            </p>
                            <span
                              id={`insight-toggle-${chat.id}`}
                              style={{
                                display: "inline-block",
                                // padding: "10px",
                                cursor: "pointer",
                              }}
                              onClick={(event) =>
                                editBoxToggle(chat.id, event, "7days")
                              }
                              className="toggle"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="3"
                                viewBox="0 0 14 3"
                                fill="none"
                              >
                                <circle
                                  cx="2.0067"
                                  cy="1.51283"
                                  r="1.49694"
                                  transform="rotate(-90 2.0067 1.51283)"
                                  fill="#A0A0A0"
                                />
                                <circle
                                  cx="7.00084"
                                  cy="1.51283"
                                  r="1.49694"
                                  transform="rotate(-90 7.00084 1.51283)"
                                  fill="#A0A0A0"
                                />
                                <circle
                                  cx="11.993"
                                  cy="1.51283"
                                  r="1.49694"
                                  transform="rotate(-90 11.993 1.51283)"
                                  fill="#A0A0A0"
                                />
                              </svg>
                            </span>

                            {editToggleIndex === chat.id && (
                              <div
                                id={`insight-edit-box-${chat.id}`}
                                className="insight-toggle"
                                ref={historyEditBoxRef}
                              >
                                <EditBox
                                  id={`insight-edit-box-${chat.id}`}
                                  isEditToggle={editToggleIndex === chat.id}
                                  style={{
                                    top: `${editBoxPosition.top}px`,
                                    left: `${editBoxPosition.left}px`,
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleChatDeleteButtonClick(chat.id)
                                    }
                                  >
                                    <img src={images.IconDelete2} alt="" />
                                    삭제
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleChangeChatNameButtonClick(chat.id)
                                    }
                                  >
                                    <img src={images.IconEdit2} alt="" />
                                    이름 변경
                                  </button>
                                </EditBox>
                              </div>
                            )}
                          </li>
                        ))}
                    </ul>
                  </>
                ) : (
                  <NoData Small>
                    <Sub3 color="gray300">사용 내역 없음</Sub3>
                  </NoData>
                )}
              </HistoryList>

              <HistoryList>
                <strong>지난 30일 사용 내역</strong>
                {chatList.some(
                  (chat) => Date.now() - chat.timestamp > 2592000000
                ) ? (
                  <>
                    <ul>
                      {chatList
                        .filter(
                          (chat) => Date.now() - chat.timestamp > 2592000000
                        )
                        .map((chat) => (
                          <li
                            key={chat.id}
                            className={`toggle ${
                              editToggleIndex === chat.id ? "active" : ""
                            }`}
                          >
                            <p onClick={() => handleConversationClick(chat.id)}>
                              {chat.view_name || chat.business_info}
                            </p>
                            <span
                              id={`insight-toggle-${chat.id}`}
                              style={{
                                display: "inline-block",
                                // padding: "10px",
                                cursor: "pointer",
                              }}
                              onClick={(event) =>
                                editBoxToggle(chat.id, event, "30days")
                              }
                              className="toggle"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="3"
                                viewBox="0 0 14 3"
                                fill="none"
                              >
                                <circle
                                  cx="2.0067"
                                  cy="1.51283"
                                  r="1.49694"
                                  transform="rotate(-90 2.0067 1.51283)"
                                  fill="#A0A0A0"
                                />
                                <circle
                                  cx="7.00084"
                                  cy="1.51283"
                                  r="1.49694"
                                  transform="rotate(-90 7.00084 1.51283)"
                                  fill="#A0A0A0"
                                />
                                <circle
                                  cx="11.993"
                                  cy="1.51283"
                                  r="1.49694"
                                  transform="rotate(-90 11.993 1.51283)"
                                  fill="#A0A0A0"
                                />
                              </svg>
                            </span>

                            {editToggleIndex === chat.id && (
                              <div
                                id={`insight-edit-box-${chat.id}`}
                                className="insight-toggle"
                                ref={historyEditBoxRef}
                              >
                                <EditBox
                                  id={`insight-edit-box-${chat.id}`}
                                  isEditToggle={editToggleIndex === chat.id}
                                  style={{
                                    top: `${editBoxPosition.top}px`,
                                    left: `${editBoxPosition.left}px`,
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleChatDeleteButtonClick(chat.id)
                                    }
                                  >
                                    <img src={images.IconDelete2} alt="" />
                                    삭제
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleChangeChatNameButtonClick(chat.id)
                                    }
                                  >
                                    <img src={images.IconEdit2} alt="" />
                                    이름 변경
                                  </button>
                                </EditBox>
                              </div>
                            )}
                          </li>
                        ))}
                    </ul>
                  </>
                ) : (
                  <NoData Small>
                    <Sub3 color="gray300">사용 내역 없음</Sub3>
                  </NoData>
                )}
              </HistoryList>
            </>
          ) : (
            <ul>
              <p>최근 사용 내역이 없습니다.</p>
            </ul>
          )}
        </HistoryWrap>
      </SubNavigation>
      {isLoginPopupOpen && <MoleculeLoginPopup onClose={closeLoginPopup} />}
      {isSignupPopupOpen && <MoleculeSignPopup onClose={closeSignupPopup} />}

      {isAccountPopupOpen && (
        <MoleculeAccountPopup onClose={closeAccountPopup} />
      )}

      {isDeletePopupOpen && (
        <Popup Cancel onClick={handleDeleteCancel}>
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={handleDeleteCancel}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark} alt="" />
            </span>
            <p>정말 이 보고서를 삭제하시겠습니까?</p>
            <div className="btnWrap">
              <button type="button" onClick={handleDeleteCancel}>
                취소
              </button>
              <button type="button" onClick={handleDeleteInsightConfirm}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
      {isChatDeletePopupOpen && (
        <Popup Cancel onClick={handleDeleteCancel}>
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={handleDeleteCancel}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark} alt="" />
            </span>
            <p>정말 삭제하시겠습니까?</p>
            <div className="btnWrap">
              <button type="button" onClick={handleDeleteCancel}>
                취소
              </button>
              <button type="button" onClick={handleDeleteHistoryConfirm}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
      {isLogoutPopup && (
        <Popup Cancel onClick={handleCloseLogoutPopup}>
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={handleCloseLogoutPopup}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark} alt="" />
            </span>
            <p>
              <strong>정말 로그아웃하시겠습니까?</strong>
              <span>로그아웃하시면 모든 계정 세션이 종료됩니다.</span>
            </p>
            <div className="btnWrap">
              <button type="button" onClick={handleLogoutConfirm}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
      {/* Report Name Change Popup */}
      {isReportChangePopupOpen && (
        <ChangeNamePopup onClick={handleChangeCancel}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="closePopup"
              onClick={handleChangeCancel}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>새로운 보고서 이름을 입력하세요</p>
            <input
              type="text"
              value={newReportName}
              onChange={(e) => setNewReportName(e.target.value)}
            />
            <div className="btnWrap">
              <button type="button" onClick={handleChangeCancel}>
                취소
              </button>
              <button type="button" onClick={handleChangeInsightConfirm}>
                확인
              </button>
            </div>
          </div>
        </ChangeNamePopup>
      )}
      {isChatChangePopupOpen && (
        <ChangeNamePopup onClick={handleChangeCancel}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="closePopup"
              onClick={handleChangeCancel}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>새로운 프로젝트 이름을 입력하세요</p>
            <input
              type="text"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
            />
            <div className="btnWrap">
              <button type="button" onClick={handleChangeCancel}>
                취소
              </button>
              <button type="button" onClick={handleChangeChatConfirm}>
                확인
              </button>
            </div>
          </div>
        </ChangeNamePopup>
      )}
      {isExitPopupOpen && (
        <Popup Cancel onClick={handleExitChatCancel}>
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={handleExitChatCancel}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark} alt="" />
            </span>
            <p>
              <strong>정말 나가시겠습니까?</strong>
              <span>진행사항이 저장되지 않을 수 있습니다.</span>
            </p>
            <div className="btnWrap">
              <button type="button" onClick={handleExitChatCancel}>
                취소
              </button>
              <button type="button" onClick={handleExitChatConfirm}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
      {isPopupLogin && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePopupLogin();
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

      {isHomePopupOpen && (
        <PopupWrap
          Warning
          title="홈으로 이동하시겠습니까?"
          buttonType="Outline"
          closeText="아니요"
          confirmText="이동하기"
          isModal={false}
          onCancel={handleCloseHomePopup}
          // onClose={handleCloseHomePopup}
          onConfirm={handleConfirmAndNavigate}
        />
      )}
    </>
  );
};

export default OrganismIncNavigation;

const NavigationWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  max-width: 69px;
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  padding: 20px 8px;
  border: 1px solid ${palette.outlineGray};
  background: ${palette.chatGray};
  z-index: 101;
`;

const Logo = styled.div`
  width: 48px;
  height: 50px;
  background: url(${images.LogoVerticality}) no-repeat center;
  background-size: contain;
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 6px 6px 4px;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.5s;

    &:hover {
      background: #e5efff;

      span {
        color: ${palette.primary};
      }

      &.home path,
      &.persona path,
      &.management path,
      &.storagebox path {
        stroke: ${palette.primary};
      }

      &.dashboard rect {
        stroke: ${palette.primary};
      }

      &.research path,
      &.history path {
        fill: ${palette.primary};
      }
    }
  }

  img {
    transition: all 0.5s;
  }

  span {
    font-size: 0.75rem;
    font-weight: 300;
    color: ${palette.gray700};
    line-height: 1.5;
    letter-spacing: -1px;
  }
`;

const Setting = styled.div`
  // width: 22px;
  // height: 22px;
  margin-top: auto;

  button.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    height: 100%;
    font-family: "Pretendard", "Poppins";
    font-size: 0.75rem;
    color: ${palette.gray700};
    border: 0;
    background: none;
    // background: url(${images.Gear}) no-repeat center;
    // background-size: contain;
  }
`;

const SubNavigation = styled.div`
  position: fixed;
  top: 0;
  left: 64px;
  max-width: 400px;
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 32px;
  padding: 20px 16px;
  border-right: 1px solid ${palette.outlineGray};
  background: ${palette.white};
  overflow-y: auto;
  z-index: 100;
  transform: translateX(${(props) => (props.show ? "0" : "-100%")});
  transition: transform 0.3s ease-in-out;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;

  div {
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 1.5;
    color: ${palette.gray700};
  }

  > img {
    margin-left: auto;
    cursor: pointer;
  }
`;

const HistoryWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;

  strong {
    font-size: 0.875rem;
    font-weight: 300;
    color: #393939;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-size: 0.875rem;
    color: #393939;
    padding: 8px 12px;
    cursor: pointer;

    span {
      opacity: 0;
      visibility: hidden;
      transition: all 0.5s;
    }

    &:before {
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 2px;
      background: #cecece;
      transition: all 0.5s;
      content: "";
    }

    &:hover {
      span {
        opacity: 1;
        visibility: visible;
      }

      &:before {
        background: ${palette.primary};
      }
    }

    p {
      width: 78%;
      font-weight: 300;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    // span {
    //   width: 10px;
    //   height: 10px;
    //   display: block;
    //   margin-left: auto;
    //   background: #cecece;
    // }
  }
`;

const ChangeNamePopup = styled.div`
  /* Overlay styles */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  /* Content area */
  .popup-content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    text-align: center;
    padding: 45px 24px 24px;
    border-radius: 10px;
    background: ${palette.white};

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

    span {
      display: block;
      margin: 0 auto 20px;

      img {
        /* Adjust image styles if needed */
      }
    }

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
        color: #8c8c8c;
        display: block;
        margin-top: 8px;
      }
    }

    input {
      margin-bottom: 24px;
      padding: 12px;
      border: 1px solid ${palette.lineGray};
      border-radius: 8px;
      font-size: 1rem;
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

        &:last-child {
          color: ${palette.white};
          background: ${palette.blue};
        }
      }
    }
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
      strong {
        font-weight: 500;
        display: block;
      }

      span {
        font-size: 0.75rem !important;
        font-weight: 400;
        color: #8c8c8c;
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
            font-weight: 600;
            display: block;
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
            color: ${palette.gray};
            font-weight: 600;
            padding: 0;
            border: 0;
            background: none;

            &:last-child {
              color: ${palette.primary};
              background: none;
            }
          }
        }
      `}
  }
`;

const EditBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 217px;
  width: 100%;
  padding: 20px;
  border-radius: 15px;
  background: ${palette.white};
  box-shadow: 0 4px 28px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  transition: all 0.5s;
  visibility: ${(props) => (props.isEditToggle ? "visible" : "hidden")};
  opacity: ${(props) => (props.isEditToggle ? "1" : "0")};

  button {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: "Pretendard", "Poppins";
    font-size: 0.875rem;
    color: ${palette.gray};
    border: 0;
    background: none;
  }
`;

const LogoutBtnWrap = styled.div`
  justify-content: space-between !important;

  > div {
    width: 85%;
    flex-direction: column;
    gap: 4px;
    font-size: 0.75rem;
    color: ${palette.gray};

    strong {
      display: flex;
      width: 100%;
    }

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
      width: 100%;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    font-family: "Pretendard", "Poppins";
    font-size: 1.25rem;
    font-weight: 600;
    color: ${palette.white};
    padding: 0;
    border: 0;
    flex-shrink: 0;
    border-radius: 50%;
    background: #9eb0d1;
    // background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.86724 2.23147L8.51621 1.47925C8.30624 1.02933 7.66602 1.03062 7.45787 1.48139L7.10987 2.23502C6.67141 3.18455 5.57856 3.63981 4.59565 3.28238L3.81553 2.9987C3.34892 2.82902 2.89712 3.28264 3.06868 3.74857L3.3555 4.52753C3.71689 5.509 3.26604 6.60367 2.31828 7.04596L1.56606 7.39699C1.11613 7.60695 1.11742 8.24718 1.56819 8.45533L2.32182 8.80333C3.27136 9.24179 3.72661 10.3346 3.36918 11.3175L3.0855 12.0977C2.91582 12.5643 3.36945 13.0161 3.83537 12.8445L4.61434 12.5577C5.5958 12.1963 6.69047 12.6472 7.13276 13.5949L7.48379 14.3471C7.69376 14.7971 8.33398 14.7958 8.54213 14.345L8.89013 13.5914C9.32859 12.6418 10.4214 12.1866 11.4044 12.544L12.1845 12.8277C12.6511 12.9974 13.1029 12.5437 12.9313 12.0778L12.6445 11.2989C12.2831 10.3174 12.734 9.22272 13.6817 8.78044L14.4339 8.4294C14.8839 8.21944 14.8826 7.57921 14.4318 7.37106L13.6782 7.02307C12.7286 6.5846 12.2734 5.49175 12.6308 4.50884L12.9145 3.72873C13.0842 3.26212 12.6306 2.81032 12.1646 2.98188L11.3857 3.2687C10.4042 3.63008 9.30953 3.17923 8.86724 2.23147ZM9.16348 1.1772C8.69645 0.176413 7.27237 0.179282 6.80938 1.18194L6.46138 1.93557C6.17858 2.548 5.47371 2.84163 4.83975 2.6111L4.05963 2.32742C3.02174 1.95 2.01679 2.959 2.39839 3.99537L2.68521 4.77434C2.9183 5.40737 2.62751 6.11341 2.01622 6.39868L1.264 6.74971C0.263217 7.21674 0.266087 8.64082 1.26874 9.10381L2.02237 9.45181C2.63481 9.73461 2.92844 10.4395 2.6979 11.0734L2.41422 11.8536C2.0368 12.8915 3.04581 13.8964 4.08218 13.5148L4.86114 13.228C5.49417 12.9949 6.20022 13.2857 6.48549 13.897L6.83652 14.6492C7.30355 15.65 8.72763 15.6471 9.19062 14.6445L9.53862 13.8908C9.82142 13.2784 10.5263 12.9848 11.1603 13.2153L11.9404 13.499C12.9783 13.8764 13.9832 12.8674 13.6016 11.831L13.3148 11.0521C13.0817 10.419 13.3725 9.71298 13.9838 9.42771L14.736 9.07668C15.7368 8.60965 15.7339 7.18557 14.7313 6.72258L13.9776 6.37458C13.3652 6.09178 13.0716 5.38691 13.3021 4.75295L13.5858 3.97283C13.9632 2.93493 12.9542 1.92998 11.9178 2.31158L11.1389 2.59841C10.5058 2.83149 9.79978 2.5407 9.51452 1.92941L9.16348 1.1772Z' fill='%238C8C8C'/%3E%3Cpath d='M10.7611 7.91279C10.7611 9.43735 9.52524 10.6732 8.00068 10.6732C6.47613 10.6732 5.24023 9.43735 5.24023 7.91279C5.24023 6.38824 6.47613 5.15234 8.00068 5.15234C9.52524 5.15234 10.7611 6.38824 10.7611 7.91279Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.00068 9.95896C9.13075 9.95896 10.0468 9.04286 10.0468 7.91279C10.0468 6.78273 9.13075 5.86663 8.00068 5.86663C6.87062 5.86663 5.95452 6.78273 5.95452 7.91279C5.95452 9.04286 6.87062 9.95896 8.00068 9.95896ZM8.00068 10.6732C9.52524 10.6732 10.7611 9.43735 10.7611 7.91279C10.7611 6.38824 9.52524 5.15234 8.00068 5.15234C6.47613 5.15234 5.24023 6.38824 5.24023 7.91279C5.24023 9.43735 6.47613 10.6732 8.00068 10.6732Z' fill='%238C8C8C'/%3E%3C/svg%3E") center no-repeat !important;
    // background: url(${images.Gear}) center no-repeat;
    background-size: contain;
  }
`;

const LogoutToggle = styled.div`
  position: absolute;
  min-width: 300px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: ${(props) => (props.isToggle ? "0" : "1000px")};
  padding: ${(props) => (props.isToggle ? "0" : "20px")};
  overflow: hidden;
  border-radius: 15px;
  background: ${palette.white};
  box-shadow: 0 4px 28px rgba(0, 0, 0, 0.05);
  visibility: ${(props) => (props.isToggle ? "hidden" : "visible")};
  opacity: ${(props) => (props.isToggle ? "0" : "1")};
  // transition: max-height 0.5s ease, padding 0.5s ease;
  transform: translateX(45px);
  transition: all 0.5s;

  .info {
    font-size: 0.75rem;
    color: ${palette.gray};
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid ${palette.lineGray};
  }

  .userName {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 1rem;
    font-weight: 600;
    color: ${palette.gray700};
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
    text-align: left;
    word-wrap: break-word;
    word-break: break-word;
  }

  li {
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;

    button {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: "Pretendard", "Poppins";
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
      padding: 0;
      border: 0;
      background: none;
    }
  }
`;

const Grade = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${(props) =>
    props.General ? palette.primaryLightest : palette.primary};

  &:before {
    font-size: 0.63rem;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.3px;
    color: ${(props) => (props.General ? palette.primary : palette.white)};
    content: "${(props) => (props.General ? "일반" : "구독")}";
  }
`;
