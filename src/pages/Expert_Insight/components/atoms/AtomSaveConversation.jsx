import { useState } from "react";
import { useAtom } from "jotai";

import {
  TITLE_OF_BUSINESS_INFORMATION,
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  STRATEGY_REPORT_DATA,
  CONVERSATION_STAGE,
  SELECTED_ADDITIONAL_KEYWORD,
  CONVERSATION,
  IS_LOGGED_IN,
  ADDITIONAL_REPORT_DATA,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  SELECTED_POC_OPTIONS,
  SELCTED_POC_TARGET,
  RECOMMENDED_TARGET_DATA,
  IDEA_FEATURE_DATA,
  IDEA_REQUIREMENT_DATA,
  POC_DETAIL_REPORT_DATA,
  POC_PERSONA_LIST,
  IDEA_LIST,
  IDEA_GROUP,
  IDEA_PRIORITY,
  BUTTON_STATE,
  CONVERSATION_ID,
  IDEA_MIRO_STATE,
  GROWTH_HACKER_REPORT_DATA,
  GROWTH_HACKER_DETAIL_REPORT_DATA,
  KPI_QUESTION_LIST,
  PRICE_SCRAP_DATA,
  PRICE_REPORT_DATA,
  PRICE_PRODUCT,
  PRICE_SELECTED_PRODUCT_SEGMENTATION,
  PRICE_PRODUCT_SEGMENTATION,
  CASE_HASH_TAG,
  CASE_REPORT_DATA,
  SURVEY_GUIDELINE_REPORT_DATA,
  SURVEY_GUIDELINE_DETAIL_REPORT_DATA,
  SURVEY_GOAL_SUGGESTION_LIST,
  SURVEY_GOAL_FIXED,
  SURVEY_QUESTION_LIST,
  BM_OR_LEAN,
  BM_BM_AUTO_REPORT_DATA,
  BM_LEAN_AUTO_REPORT_DATA,
  BM_BM_ADS_REPORT_DATA,
  BM_SELECTED_PROBLEM_OPTIONS,
  BM_LEAN_ADS_REPORT_DATA,
  BM_BM_CUSTOM_REPORT_DATA,
  BM_LEAN_CUSTOM_REPORT_DATA,
  BM_MODEL_SUGGESTION_REPORT_DATA,
  BM_QUESTION_LIST,
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
  BUSINESS_ANALYSIS
} from "../../../AtomStates";

import { saveConversationToIndexedDB } from "../../../../utils/indexedDB";

export const useSaveConversation = () => {

  const [bmModelSuggestionReportData, setBmModelSuggestionReportData] = useAtom(BM_MODEL_SUGGESTION_REPORT_DATA);
  const [bmQuestionList, setBmQuestionList] = useAtom(BM_QUESTION_LIST);
  const [bmOrLean, setBmOrLean] = useAtom(BM_OR_LEAN);
  const [bmBmAutoReportData, setBmBmAutoReportData] = useAtom(BM_BM_AUTO_REPORT_DATA);
  const [bmLeanAutoReportData, setBmLeanAutoReportData] = useAtom(BM_LEAN_AUTO_REPORT_DATA);
  const [bmBmAdsReportData, setBmBmAdsReportData] = useAtom(BM_BM_ADS_REPORT_DATA);
  const [bmSelectedProblemOptions, setBmSelectedProblemOptions] = useAtom(BM_SELECTED_PROBLEM_OPTIONS);
  const [bmLeanAdsReportData, setBmLeanAdsReportData] = useAtom(BM_LEAN_ADS_REPORT_DATA);
  const [bmBmCustomReportData, setBmBmCustomReportData] = useAtom(BM_BM_CUSTOM_REPORT_DATA);
  const [bmLeanCustomReportData, setBmLeanCustomReportData] = useAtom(BM_LEAN_CUSTOM_REPORT_DATA);
  const [surveyGuidelineReportData, setSurveyGuidelineReportData] = useAtom(SURVEY_GUIDELINE_REPORT_DATA);
  const [surveyGuidelineDetailReportData, setSurveyGuidelineDetailReportData] = useAtom(SURVEY_GUIDELINE_DETAIL_REPORT_DATA);
  const [surveyGoalSuggestionList, setSurveyGoalSuggestionList] = useAtom(SURVEY_GOAL_SUGGESTION_LIST);
  const [surveyGoalFixed, setSurveyGoalFixed] = useAtom(SURVEY_GOAL_FIXED);
  const [surveyQuestionList, setSurveyQuestionList] = useAtom(SURVEY_QUESTION_LIST);
  const [caseHashTag, setCaseHashTag] = useAtom(CASE_HASH_TAG);
  const [caseReportData, setCaseReportData] = useAtom(CASE_REPORT_DATA);
  const [priceScrapData, setPriceScrapData] = useAtom(PRICE_SCRAP_DATA);
  const [priceReportData, setPriceReportData] = useAtom(PRICE_REPORT_DATA);
  const [priceProduct, setPriceProduct] = useAtom(PRICE_PRODUCT);
  const [priceSelectedProductSegmentation, setPriceSelectedProductSegmentation] = useAtom(PRICE_SELECTED_PRODUCT_SEGMENTATION);
  const [priceProductSegmentation, setPriceProductSegmentation] = useAtom(PRICE_PRODUCT_SEGMENTATION);
  const [ideaMiroState, setIdeaMiroState] = useAtom(IDEA_MIRO_STATE);
  const [growthHackerReportData, setGrowthHackerReportData] = useAtom(GROWTH_HACKER_REPORT_DATA);
  const [growthHackerDetailReportData, setGrowthHackerDetailReportData] = useAtom(GROWTH_HACKER_DETAIL_REPORT_DATA);
  const [growthHackerRecommendedSolution, setGrowthHackerRecommendedSolution] = useAtom(GROWTH_HACKER_RECOMMENDED_SOLUTION);
  const [growthHackerSelectedSolution, setGrowthHackerSelectedSolution] = useAtom(GROWTH_HACKER_SELECTED_SOLUTION);
  const [KpiQuestionList, setKpiQuestionList] = useAtom(KPI_QUESTION_LIST);
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [ideaList, setIdeaList] = useAtom(IDEA_LIST);
  const [ideaGroup, setIdeaGroup] = useAtom(IDEA_GROUP);
  const [ideaPriority, setIdeaPriority] = useAtom(IDEA_PRIORITY);
  const [recommendedTargetData, setRecommendedTargetData] = useAtom(RECOMMENDED_TARGET_DATA);
  const [selectedPocTarget, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET);
  const [selectedPocOptions, setSelectedPocOptions] = useAtom(SELECTED_POC_OPTIONS);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(SELECTED_ADDITIONAL_KEYWORD);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [additionalReportData, setAdditionalReportData] = useAtom(ADDITIONAL_REPORT_DATA);
  const [selectedCustomerAdditionalKeyword, setSelectedCustomerAdditionalKeyword] = useAtom(SELECTED_CUSTOMER_ADDITIONAL_KEYWORD);
  const [customerAdditionalReportData, setCustomerAdditionalReportData] = useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);
  const [ideaFeatureData, setIdeaFeatureData] = useAtom(IDEA_FEATURE_DATA);
  const [ideaRequirementData, setIdeaRequirementData] = useAtom(IDEA_REQUIREMENT_DATA);
  const [pocDetailReportData, setPocDetailReportData] = useAtom(POC_DETAIL_REPORT_DATA);
  const [pocPersonaList, setPocPersonaList] = useAtom(POC_PERSONA_LIST);
  const [strategyReportData, setStrategyReportData] = useAtom(STRATEGY_REPORT_DATA);
  const [isMarketing, setIsMarketing] = useAtom(IS_MARKETING);
  const [marketingMbtiResult, setMarketingMbtiResult] = useAtom(MARKETING_MBTI_RESULT);
  const [marketingResearchReportData, setMarketingResearchReportData] = useAtom(MARKETING_RESEARCH_REPORT_DATA);
  const [marketingBmReportData, setMarketingBmReportData] = useAtom(MARKETING_BM_REPORT_DATA);
  const [marketingCustomerData, setMarketingCustomerData] = useAtom(MARKETING_CUSTOMER_DATA);
  const [marketingSelectedCustomer, setMarketingSelectedCustomer] = useAtom(MARKETING_SELECTED_CUSTOMER);
  const [marketingFinalCustomer, setMarketingFinalCustomer] = useAtom(MARKETING_FINAL_CUSTOMER);
  const [marketingFinalReportData, setMarketingFinalReportData] = useAtom(MARKETING_FINAL_REPORT_DATA);
  const [strategyConsultantReportData, setStrategyConsultantReportData] = useAtom(STRATEGY_CONSULTANT_REPORT_DATA);
  const [businessAnalysis, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);


  const saveConversation = async ({ changingConversation }) => {

    const analysisReportData = {
        title: titleOfBusinessInfo,
        mainFeatures: mainFeaturesOfBusinessInformation,
        mainCharacter: mainCharacteristicOfBusinessInformation,
        mainCustomer: businessInformationTargetCustomer,
    };

    await saveConversationToIndexedDB(
        {
            timestamp: Date.now(),
            id: changingConversation.hasOwnProperty('conversationId') ? changingConversation.conversationId : conversationId,
            inputBusinessInfo: changingConversation.hasOwnProperty('inputBusinessInfo') ? changingConversation.inputBusinessInfo : inputBusinessInfo,
            analysisReportData: changingConversation.hasOwnProperty('analysisReportData') ? changingConversation.analysisReportData : analysisReportData,
            strategyReportData: changingConversation.hasOwnProperty('strategyReportData') ? changingConversation.strategyReportData : strategyReportData,
            conversation: changingConversation.hasOwnProperty('conversation') ? changingConversation.conversation : conversation,
            conversationStage: changingConversation.hasOwnProperty('conversationStage') ? changingConversation.conversationStage : conversationStage,
            selectedAdditionalKeywords: changingConversation.hasOwnProperty('selectedAdditionalKeyword') ? changingConversation.selectedAdditionalKeyword : selectedAdditionalKeyword,
            selectedCustomerAdditionalKeyword: changingConversation.hasOwnProperty('selectedCustomerAdditionalKeyword') ? changingConversation.selectedCustomerAdditionalKeyword : selectedCustomerAdditionalKeyword,
            additionalReportData: changingConversation.hasOwnProperty('additionalReportData') ? changingConversation.additionalReportData : additionalReportData,
            customerAdditionalReportData: changingConversation.hasOwnProperty('customerAdditionalReportData') ? changingConversation.customerAdditionalReportData : customerAdditionalReportData,
            expert_index: changingConversation.hasOwnProperty('selectedExpertIndex') ? changingConversation.selectedExpertIndex : selectedExpertIndex,
            selectedPocOptions: changingConversation.hasOwnProperty('selectedPocOptions') ? changingConversation.selectedPocOptions : selectedPocOptions,
            pocPersonaList: changingConversation.hasOwnProperty('pocPersonaList') ? changingConversation.pocPersonaList : pocPersonaList,
            selectedPocTarget: changingConversation.hasOwnProperty('selectedPocTarget') ? changingConversation.selectedPocTarget : selectedPocTarget,
            recommendedTargetData: changingConversation.hasOwnProperty('recommendedTargetData') ? changingConversation.recommendedTargetData : recommendedTargetData,
            pocDetailReportData : changingConversation.hasOwnProperty('pocDetailReportData') ? changingConversation.pocDetailReportData : pocDetailReportData,
            ideaFeatureData : changingConversation.hasOwnProperty('ideaFeatureData') ? changingConversation.ideaFeatureData : ideaFeatureData,
            ideaRequirementData : changingConversation.hasOwnProperty('ideaRequirementData') ? changingConversation.ideaRequirementData : ideaRequirementData,
            ideaList : changingConversation.hasOwnProperty('ideaList') ? changingConversation.ideaList : ideaList,
            ideaGroup : changingConversation.hasOwnProperty('ideaGroup') ? changingConversation.ideaGroup : ideaGroup,
            ideaPriority : changingConversation.hasOwnProperty('ideaPriority') ? changingConversation.ideaPriority : ideaPriority,
            ideaMiroState : changingConversation.hasOwnProperty('ideaMiroState') ? changingConversation.ideaMiroState : ideaMiroState,
            buttonState : changingConversation.hasOwnProperty('buttonState') ? changingConversation.buttonState : buttonState,
            growthHackerReportData : changingConversation.hasOwnProperty('growthHackerReportData') ? changingConversation.growthHackerReportData : growthHackerReportData,
            growthHackerDetailReportData : changingConversation.hasOwnProperty('growthHackerDetailReportData') ? changingConversation.growthHackerDetailReportData : growthHackerDetailReportData,
            growthHackerRecommendedSolution : changingConversation.hasOwnProperty('growthHackerRecommendedSolution') ? changingConversation.growthHackerRecommendedSolution : growthHackerRecommendedSolution,
            growthHackerSelectedSolution : changingConversation.hasOwnProperty('growthHackerSelectedSolution') ? changingConversation.growthHackerSelectedSolution : growthHackerSelectedSolution,
            KpiQuestionList : changingConversation.hasOwnProperty('KpiQuestionList') ? changingConversation.KpiQuestionList : KpiQuestionList,
            priceScrapData : changingConversation.hasOwnProperty('priceScrapData') ? changingConversation.priceScrapData : priceScrapData,
            priceReportData : changingConversation.hasOwnProperty('priceReportData') ? changingConversation.priceReportData : priceReportData,
            priceProduct : changingConversation.hasOwnProperty('priceProduct') ? changingConversation.priceProduct : priceProduct,
            priceSelectedProductSegmentation : changingConversation.hasOwnProperty('priceSelectedProductSegmentation') ? changingConversation.priceSelectedProductSegmentation : priceSelectedProductSegmentation,
            priceProductSegmentation : changingConversation.hasOwnProperty('priceProductSegmentation') ? changingConversation.priceProductSegmentation : priceProductSegmentation,
            caseHashTag : changingConversation.hasOwnProperty('caseHashTag') ? changingConversation.caseHashTag : caseHashTag,
            caseReportData : changingConversation.hasOwnProperty('caseReportData') ? changingConversation.caseReportData : caseReportData,
            bmOrLean : changingConversation.hasOwnProperty('bmOrLean') ? changingConversation.bmOrLean : bmOrLean,
            bmQuestionList : changingConversation.hasOwnProperty('bmQuestionList') ? changingConversation.bmQuestionList : bmQuestionList,
            bmModelSuggestionReportData : changingConversation.hasOwnProperty('bmModelSuggestionReportData') ? changingConversation.bmModelSuggestionReportData : bmModelSuggestionReportData,
            bmBmAutoReportData : changingConversation.hasOwnProperty('bmBmAutoReportData') ? changingConversation.bmBmAutoReportData : bmBmAutoReportData,
            bmLeanAutoReportData : changingConversation.hasOwnProperty('bmLeanAutoReportData') ? changingConversation.bmLeanAutoReportData : bmLeanAutoReportData,
            bmBmAdsReportData : changingConversation.hasOwnProperty('bmBmAdsReportData') ? changingConversation.bmBmAdsReportData : bmBmAdsReportData,
            bmSelectedProblemOptions : changingConversation.hasOwnProperty('bmSelectedProblemOptions') ? changingConversation.bmSelectedProblemOptions : bmSelectedProblemOptions,
            bmLeanAdsReportData : changingConversation.hasOwnProperty('bmLeanAdsReportData') ? changingConversation.bmLeanAdsReportData : bmLeanAdsReportData,
            bmBmCustomReportData : changingConversation.hasOwnProperty('bmBmCustomReportData') ? changingConversation.bmBmCustomReportData : bmBmCustomReportData,
            bmLeanCustomReportData : changingConversation.hasOwnProperty('bmLeanCustomReportData') ? changingConversation.bmLeanCustomReportData : bmLeanCustomReportData,
            surveyGuidelineReportData : changingConversation.hasOwnProperty('surveyGuidelineReportData') ? changingConversation.surveyGuidelineReportData : surveyGuidelineReportData,
            surveyGuidelineDetailReportData : changingConversation.hasOwnProperty('surveyGuidelineDetailReportData') ? changingConversation.surveyGuidelineDetailReportData : surveyGuidelineDetailReportData,
            surveyGoalSuggestionList: changingConversation.hasOwnProperty('surveyGoalSuggestionList') ? changingConversation.surveyGoalSuggestionList : surveyGoalSuggestionList,
            surveyGoalFixed: changingConversation.hasOwnProperty('surveyGoalFixed') ? changingConversation.surveyGoalFixed : surveyGoalFixed,
            surveyQuestionList: changingConversation.hasOwnProperty('surveyQuestionList') ? changingConversation.surveyQuestionList : surveyQuestionList,
            isMarketing: changingConversation.hasOwnProperty('isMarketing') ? changingConversation.isMarketing : isMarketing,
            marketingMbtiResult: changingConversation.hasOwnProperty('marketingMbtiResult') ? changingConversation.marketingMbtiResult : marketingMbtiResult,
            marketingResearchReportData: changingConversation.hasOwnProperty('marketingResearchReportData') ? changingConversation.marketingResearchReportData : marketingResearchReportData,
            marketingBmReportData: changingConversation.hasOwnProperty('marketingBmReportData') ? changingConversation.marketingBmReportData : marketingBmReportData,
            marketingCustomerData: changingConversation.hasOwnProperty('marketingCustomerData') ? changingConversation.marketingCustomerData : marketingCustomerData,
            marketingSelectedCustomer: changingConversation.hasOwnProperty('marketingSelectedCustomer') ? changingConversation.marketingSelectedCustomer : marketingSelectedCustomer,
            marketingFinalCustomer: changingConversation.hasOwnProperty('marketingFinalCustomer') ? changingConversation.marketingFinalCustomer : marketingFinalCustomer,
            marketingFinalReportData: changingConversation.hasOwnProperty('marketingFinalReportData') ? changingConversation.marketingFinalReportData : marketingFinalReportData,
            strategyConsultantReportData: changingConversation.hasOwnProperty('strategyConsultantReportData') ? changingConversation.strategyConsultantReportData : strategyConsultantReportData,
            businessAnalysis: changingConversation.hasOwnProperty('businessAnalysis') ? changingConversation.businessAnalysis : businessAnalysis,
          },
        isMarketing ? true : isLoggedIn,
        changingConversation.hasOwnProperty('conversationId') ? changingConversation.conversationId : conversationId
    );
  };

  return { saveConversation };
};
