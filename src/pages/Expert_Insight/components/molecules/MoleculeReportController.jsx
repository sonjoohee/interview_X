import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TITLE_OF_BUSINESS_INFORMATION,
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER,
  IS_EDITING_NOW,
  SELECTED_TAB_COPY,
  STRATEGY_REPORT_DATA,
  CONVERSATION_STAGE,
  IS_LOGGED_IN,
  IS_LOADING,
  REPORT_REFRESH_TRIGGER,
  CHAT_REFRESH_TRIGGER,
  ADDITIONAL_REPORT_DATA,
  IS_LOADING_ANALYSIS,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  RECOMMENDED_TARGET_DATA,
  IDEA_FEATURE_DATA_TEMP,
  IDEA_REQUIREMENT_DATA_TEMP,
  IDEA_FEATURE_DATA,
  IDEA_REQUIREMENT_DATA,
  ADDING_IDEA_FEATURE,
  ADD_CONTENT_IDEA_FEATURE,
  ACTIVE_IDEA_FEATURE_INDEX,
  EDITED_IDEA_FEATURE_TITLE,
  ADDING_IDEA_CUSTOMER,
  ADD_CONTENT_IDEA_CUSTOMER,
  ACTIVE_IDEA_CUSTOMER_INDEX,
  EDITED_IDEA_CUSTOMER_TITLE,
  IS_EDITING_IDEA_FEATURE,
  IS_EDITING_IDEA_CUSTOMER,
  IDEA_LIST,
  IDEA_GROUP,
  IDEA_PRIORITY,
  BUTTON_STATE,
  GROWTH_HACKER_REPORT_DATA,
  SURVEY_GUIDELINE_REPORT_DATA,
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
  IS_ADDING_NOW,
  NEW_ADD_CONTENT,
} from "../../../AtomStates";

import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import { useSaveConversation } from "../atoms/AtomSaveConversation";
import MoleculeLoginPopup from "../../../Login_Sign/components/molecules/MoleculeLoginPopup"; // 로그인 팝업 컴포넌트 임포트
import { InterviewXBusinessAnalysisRequest } from "../../../../utils/indexedDB";

const MoleculeReportController = ({
  reportIndex,
  ideaFeatureRequirement,
  strategyReportID,
  sampleData,
  report,
  additionalReportCount, // 추가 보고서 복사기능을 위한 인덱스
}) => {
  const { saveConversation } = useSaveConversation();
  const [surveyGuidelineReportData, setSurveyGuidelineReportData] = useAtom(SURVEY_GUIDELINE_REPORT_DATA);
  const [growthHackerReportData, setGrowthHackerReportData] = useAtom(GROWTH_HACKER_REPORT_DATA);
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [ideaList, setIdeaList] = useAtom(IDEA_LIST);
  const [ideaGroup, setIdeaGroup] = useAtom(IDEA_GROUP);
  const [ideaPriority, setIdeaPriority] = useAtom(IDEA_PRIORITY);
  const [recommendedTargetData, setRecommendedTargetData] = useAtom(RECOMMENDED_TARGET_DATA);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(
    TITLE_OF_BUSINESS_INFORMATION
  );
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo, setInputBusinessInfo] =
    useAtom(INPUT_BUSINESS_INFO);
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
  const [
    tempMainFeaturesOfBusinessInformation,
    setTempMainFeaturesOfBusinessInformation,
  ] = useAtom(TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    tempMainCharacteristicOfBusinessInformation,
    setTempMainCharacteristicOfBusinessInformation,
  ] = useAtom(TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [
    tempMusinessInformationTargetCustomer,
    setTempBusinessInformationTargetCustomer,
  ] = useAtom(TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN); // 로그인 상태 관리
  const token = sessionStorage.getItem("accessToken");
  const [reportRefreshTrigger, setReportRefreshTrigger] = useAtom(
    REPORT_REFRESH_TRIGGER
  ); // 리프레시 트리거 상태 구독
  const [chatRefreshTrigger, setChatRefreshTrigger] = useAtom(
    CHAT_REFRESH_TRIGGER
  ); // 리프레시 트리거 상태 구독
  
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);

  const [selectedTabCopy, setSelectedTabCopy] = useAtom(SELECTED_TAB_COPY);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenCancel, setIsPopupOpenCancel] = useState(false);

  const [isPopupSave, setIsPopupSave] = useState(false);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false); // 로그인 팝업 상태 관리

  const [isPopupCopy, setIsPopupCopy] = useState(false);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useAtom(IS_LOADING_ANALYSIS);
  const [additionalReportData, setAdditionalReportData] = useAtom(
    ADDITIONAL_REPORT_DATA
  );
  const [customerAdditionalReportData, setCustomerAdditionalReportData] = useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);
  const [ideaFeatureDataTemp, setIdeaFeatureDataTemp] = useAtom(IDEA_FEATURE_DATA_TEMP);
  const [ideaRequirementDataTemp, setIdeaRequirementDataTemp] = useAtom(IDEA_REQUIREMENT_DATA_TEMP);
  const [ideaFeatureData, setIdeaFeatureData] = useAtom(IDEA_FEATURE_DATA);
  const [ideaRequirementData, setIdeaRequirementData] = useAtom(IDEA_REQUIREMENT_DATA);

  const [addingIdeaFeature, setAddingIdeaFeature] = useAtom(ADDING_IDEA_FEATURE);
  const [addContentIdeaFeature, setAddContentIdeaFeature] = useAtom(ADD_CONTENT_IDEA_FEATURE);
  const [activeIdeaFeatureIndex, setActiveIdeaFeatureIndex] = useAtom(ACTIVE_IDEA_FEATURE_INDEX);
  const [editedIdeaFeatureTitle, setEditedIdeaFeatureTitle] = useAtom(EDITED_IDEA_FEATURE_TITLE);
  const [addingIdeaCustomer, setAddingIdeaCustomer] = useAtom(ADDING_IDEA_CUSTOMER);
  const [addContentIdeaCustomer, setAddContentIdeaCustomer] = useAtom(ADD_CONTENT_IDEA_CUSTOMER);
  const [activeIdeaCustomerIndex, setActiveIdeaCustomerIndex] = useAtom(ACTIVE_IDEA_CUSTOMER_INDEX);
  const [editedIdeaCustomerTitle, setEditedIdeaCustomerTitle] = useAtom(EDITED_IDEA_CUSTOMER_TITLE);
  const [isEditingIdeaFeature, setIsEditingIdeaFeature] = useAtom(IS_EDITING_IDEA_FEATURE);
  const [isEditingIdeaCustomer, setIsEditingIdeaCustomer] = useAtom(IS_EDITING_IDEA_CUSTOMER);
  const [isAddingNow, setIsAddingNow] = useAtom(IS_ADDING_NOW);
  const [newAddContent, setNewAddContent] = useAtom(NEW_ADD_CONTENT);

  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/signup");
  };
  const handleLoginClick = () => {
    setLoginPopupOpen(true); // 로그인 팝업 열기
  };
  const closeLoginPopup = () => {
    setLoginPopupOpen(false); // 로그인 팝업 닫기
  };
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const closePopupCopy = () => {
    setIsPopupCopy(false); // 팝업 닫기
  };
  const closePopupSave = () => {
    setIsPopupSave(false); // 팝업 닫기
  };

  const togglePopupCancel = () => {
    setIsPopupOpenCancel(!isPopupOpenCancel);
  };
  const handleEditCancel = (reportIndex) => {
    if(reportIndex === 5) {
      if(ideaFeatureRequirement === "feature") {
        setIdeaFeatureData(ideaFeatureDataTemp);
        setAddingIdeaFeature(false);
        setAddContentIdeaFeature("");
        setActiveIdeaFeatureIndex(0);
        setEditedIdeaFeatureTitle("");
        setIsEditingIdeaFeature(false);
      }
      else if(ideaFeatureRequirement === "customer") {
        setIdeaRequirementData(ideaRequirementDataTemp);
        setAddingIdeaCustomer(false);
        setAddContentIdeaCustomer("");
        setActiveIdeaCustomerIndex(0);
        setEditedIdeaCustomerTitle("");
        setIsEditingIdeaCustomer(false);
      }
    }
    else {
      setMainFeaturesOfBusinessInformation(tempMainFeaturesOfBusinessInformation);
      setMainCharacteristicOfBusinessInformation(
      tempMainCharacteristicOfBusinessInformation
      );
      setBusinessInformationTargetCustomer(tempMusinessInformationTargetCustomer);
      setIsEditingNow(false);
      setIsAddingNow({ section: "", isAdding: false });
      setNewAddContent("");
    }
    
    togglePopupCancel();
  };
  const [strategyReportData, setStrategyReportData] = useAtom(STRATEGY_REPORT_DATA);
  const [selectedTabCopyByExpert, setSelectedTabCopyByExpert] = useState({});
  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };

  const handleEditConfirm = async (reportIndex) => {

    if(reportIndex === 5) {
      if(ideaFeatureRequirement === "feature") {  
        setIsEditingIdeaFeature(false);
        setIdeaFeatureDataTemp(ideaFeatureData);
        setAddingIdeaFeature(false);
        setAddContentIdeaFeature("");
        setActiveIdeaFeatureIndex(0);
        setEditedIdeaFeatureTitle("");  
      }
      else if(ideaFeatureRequirement === "customer") {
        setIsEditingIdeaCustomer(false);
        setIdeaRequirementDataTemp(ideaRequirementData);
        setAddingIdeaCustomer(false);
        setAddContentIdeaCustomer("");
        setActiveIdeaCustomerIndex(0);
        setEditedIdeaCustomerTitle("");
      }

      await saveConversation(
        { changingConversation: {} }
      );
    } 
    else {
      setIsEditingNow(false);
      setIsAddingNow({ section: "", isAdding: false });
      setNewAddContent("");

      setTempMainFeaturesOfBusinessInformation(mainFeaturesOfBusinessInformation);
      setTempMainCharacteristicOfBusinessInformation(
        mainCharacteristicOfBusinessInformation
      );
      setTempBusinessInformationTargetCustomer(businessInformationTargetCustomer);
      
      await saveConversation(
        { changingConversation: { conversationStage: 2 } }
      );
    }
  };

  const toggleSave = async () => {
    if (!isLoggedIn) {
      // 로그인 상태가 아닐 경우 팝업을 띄움
      setIsPopupOpen(true); // 팝업 열기
      return; // 로그인 상태가 아닐 경우 함수를 종료
    }

    setIsPopupSave(true); // 저장 팝업 열기

    let reportData;
    let business_info;

    if (reportIndex === 0) {
      // 비즈니스 분석 리포트 데이터 저장 (이 부분은 기존 로직을 유지합니다)
      reportData = {
        title: titleOfBusinessInfo,
        mainFeatures: mainFeaturesOfBusinessInformation,
        mainCharacter: mainCharacteristicOfBusinessInformation,
        mainCustomer: selectedExpertIndex !== "4" ? businessInformationTargetCustomer : [],
      };
      business_info = reportData.title;
    } else if (reportIndex === 1) {
      // 전략 보고서 데이터 저장 - sampleData 사용
      reportData = sampleData; // sampleData를 그대로 저장합니다
      business_info = reportData?.business_info || "Unknown Title";
    } else if (reportIndex === 4 || reportIndex === 5 || reportIndex === 6 || reportIndex === 8 || reportIndex === 10) {
      reportData = sampleData; // sampleData를 그대로 저장합니다
      business_info = titleOfBusinessInfo || "Unknown Title";
    } else {
      reportData = sampleData;
      business_info = reportData?.title || "Unknown Title";
    }

    // API에 저장 요청
    try {
      const accessToken = sessionStorage.getItem("accessToken"); // 저장된 토큰을 가져옴

      const postData = {
        business_info: business_info,
        title: business_info,
        date: new Date().toLocaleDateString(),
        content: reportData,
        reportIndex: reportIndex, // 보고서 인덱스를 추가하여 저장
      };

      // API로 보고서 저장 요청
      const response = await axios.post(
        "https://wishresearch.kr/panels/insight",
        postData, // 요청 본문에 보낼 데이터
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Bearer 토큰을 헤더에 추가
            "Content-Type": "application/json", // 필요에 따라 Content-Type 설정
          },
          withCredentials: true, // 쿠키와 함께 자격 증명을 전달 (optional)
        }
      );

      if (response.status === 200) {
        setReportRefreshTrigger((prev) => !prev); // 트리거 상태를 반전시켜 OrganismLeftSideBar가 새로고침되도록 설정
      } else {
        //console.error("API 응답 에러", response.status);
      }
    } catch (error) {
      //console.error("API 요청 실패", error);
    }
  };

  const toggleCopy = () => {
    let contentToCopy = '';
  
    const extractTextContent = (data) => {
      let textContent = '';
      if (typeof data === "string") {
        return data + "\n";
      }
      if (Array.isArray(data)) {
        data.forEach((item) => {
          textContent += extractTextContent(item);
        });
      } else if (typeof data === "object" && data !== null) {
        Object.values(data).forEach((value) => {
          textContent += extractTextContent(value);
        });
      }
      return textContent;
    };

    const getSelectedTabIndex = () => {
      const expertIndex = report?.content?.expert_id || strategyReportID;
      return selectedTabCopy[expertIndex] || 0; // 기본값
    };
  
    const findGoalActionText = (index) => {
      const currentExpertData = strategyReportData[selectedExpertIndex];
      if (currentExpertData && currentExpertData.tabs[0] && currentExpertData.tabs[0].sections[0]) {
        const content = currentExpertData.tabs[0].sections[0].content[index];
        if (content && content.title) {
          return `목표 : ${content.text}`;
        }
      }
      return "목표 : 설정되지 않음"; // 기본값
    };
  
    if (report && report.content) {
      switch (reportIndex) {
        case 0: // 비즈니스 분석 리포트
contentToCopy = `
${report.content.title}\n
주요 특징
${report.content.mainFeatures.map(feature => `- ${feature}`).join('\n')}\n
주요 기능
${report.content.mainCharacter.map(character => `- ${character}`).join('\n')}`.trim();
          break;
          case 1: // 전략 보고서
          if (report.content.tabs) {
            const selectedTabIndex = getSelectedTabIndex();
            const selectedTabData = report.content.tabs[selectedTabIndex];
            let rawContent = extractTextContent(selectedTabData);
            
            // 전문가 인덱스가 4일 때만 특별 처리
            if (report.content.expert_id === "4") {
              // 줄 단위로 분리
              let lines = rawContent.split('\n');
              
              // 수정된 내용을 저장할 배열
              let modifiedLines = [];
              
              // 가설 검증 문장의 위치 (예: 5, 15, 25번째 줄)
              const hypothesisLines = [4, 16, 30];
              
              for (let i = 0; i < lines.length; i++) {
                // 가설 검증 문장 줄이면 건너뛰기
                if (hypothesisLines.includes(i + 1)) {
                  continue;
                }
                
                // 가설 검증 문장 다음 줄에 "목표 : " 추가
                if (hypothesisLines.includes(i)) {
                  modifiedLines.push(`목표 : ${lines[i].trim()}`);
                } else {
                  modifiedLines.push(lines[i].trim());
                }
              }
              
              // 수정된 내용을 다시 문자열로 합치기
              contentToCopy = modifiedLines.join('\n');
            } else {
              contentToCopy = rawContent;
            }
            
          } else {
            contentToCopy = JSON.stringify(report.content, null, 2);
          }
          break;
          case 2: // 추가 질문
          {/* reportindex의 경우 사용하는 css가 동일하여 2로 같게 처리하였음 */}
          if (report.content && report.content.title && report.content.sections) {
            contentToCopy = `${report.content.title}\n`;
            report.content.sections.forEach(section => {
              contentToCopy += `${section.title}\n`;
              section.content.forEach(item => {
                if (item.subTitle) {
                  contentToCopy += `${item.subTitle}\n`;
                }
                contentToCopy += `${item.text}\n`;
              });
            });
          } else {
            contentToCopy = JSON.stringify(report.content, null, 2);
          }
          break;
          case 4: // PoC 목적별 추천 타겟 및 예상 인사이트
          if (report.content.poc_persona) {
            contentToCopy = "PoC 목적별 추천 타겟 및 예상 인사이트\n\n";
            Object.entries(report.content.poc_persona).forEach(([key, value], index) => {
              const goalActionText = value.goalActionText || findGoalActionText(index);
              contentToCopy += `${goalActionText}\n`;
              contentToCopy += `1. 추천 페르소나 : ${value[0]["추천 가상 페르소나"]}\n`;
              contentToCopy += `2. 이유 및 예상 인사이트 : ${value[1]["이유 및 예상 인사이트"]}\n\n`;
            });
          } else {
            contentToCopy = JSON.stringify(report.content, null, 2);
          }
          break;

          case 5: // 아이디어 우선순위
          contentToCopy = extractTextContent(report.content);
          break;

          case 6: // 마케팅 분석과 개선 솔루션 제안
          contentToCopy = "마케팅 분석과 개선 솔루션 제안\n" + extractTextContent(report.content);
          break;

          case 8: // 사례 분석
          contentToCopy = extractTextContent(report.content);
          break;

          case 10: // 조사 설계
          contentToCopy = "맞춤형 조사 설계 보고서\n\n";
          contentToCopy += `${report.content.method_1.title}\n`;
          contentToCopy += `조사 목표: ${report.content.method_1.survey_goal}\n`;
          contentToCopy += `대상 및 채널: ${report.content.method_1.survey_target.target_person}, ${report.content.method_1.channels_and_collection_methods.channels}\n`;
          contentToCopy += `데이터 수집 및 분석: ${report.content.method_1.channels_and_collection_methods.collection_methods}\n\n`;
          contentToCopy += `${report.content.method_2.title}\n`;
          contentToCopy += `조사 목표: ${report.content.method_2.survey_goal}\n`;
          contentToCopy += `대상 및 채널: ${report.content.method_2.survey_target.target_person}, ${report.content.method_2.channels_and_collection_methods.channels}\n`;
          contentToCopy += `데이터 수집 및 분석: ${report.content.method_2.channels_and_collection_methods.collection_methods}\n\n`;
          contentToCopy += `${report.content.method_3.title}\n`;
          contentToCopy += `조사 목표: ${report.content.method_3.survey_goal}\n`;
          contentToCopy += `대상 및 채널: ${report.content.method_3.survey_target.target_person}, ${report.content.method_3.channels_and_collection_methods.channels}\n`;
          contentToCopy += `데이터 수집 및 분석: ${report.content.method_3.channels_and_collection_methods.collection_methods}\n\n`;
          break;

        default:
          contentToCopy = JSON.stringify(report, null, 2);
          
      }
    } else {
      if (reportIndex === 0) {
contentToCopy = `
${titleOfBusinessInfo}\n
주요 특징
${mainFeaturesOfBusinessInformation?.map((feature) => `- ${feature}`).join("\n")}\n
주요 기능
${mainCharacteristicOfBusinessInformation
  ?.map((character) => `- ${character}`)
  .join("\n")}`;
      } else if (reportIndex === 1) {
        // 전략 보고서 복사 기능
        const expertIndex = report?.content?.expert_id || strategyReportID;
        const selectedTabIndex = selectedTabCopy[expertIndex] || 0;
        const reportData = strategyReportData[expertIndex];
        
        if (reportData && reportData.tabs && reportData.tabs[selectedTabIndex]) {
          const selectedTabData = reportData.tabs[selectedTabIndex];
          let rawContent = extractTextContent(selectedTabData);
          // 전문가 인덱스가 4일 때만 특별 처리
          if (expertIndex === "4") {
            // 줄 단위로 분리
            let lines = rawContent.split('\n');
            // 수정된 내용을 저장할 배열
            let modifiedLines = [];
            
            // 가설 검증 문장의 위치 (예: 5, 15, 25번째 줄)
            const hypothesisLines = [4, 16, 30];
            
            for (let i = 0; i < lines.length; i++) {
              // 가설 검증 문장 줄이면 건너뛰기
              if (hypothesisLines.includes(i + 1)) {
                continue;
              }
              
              // 가설 검증 문장 다음 줄에 "목표 : " 추가
              if (hypothesisLines.includes(i)) {
                modifiedLines.push(`목표 : ${lines[i].trim()}`);
              } else {
                modifiedLines.push(lines[i].trim());
              }
            }
            
            // 수정된 내용을 다시 문자열로 합치기
            contentToCopy = modifiedLines.join('\n');
          } else {
            contentToCopy = rawContent;
          }
        
        } else {
          contentToCopy = "전략 보고서 데이터를 찾을 수 없습니다.";
        }
      } else if (reportIndex === 2) {
        // 추가 질문 복사 기능
        contentToCopy = extractTextContent(additionalReportData[additionalReportCount]);
      } else if (reportIndex === 3) {
        contentToCopy = extractTextContent(customerAdditionalReportData[additionalReportCount]);
      } else if (reportIndex === 4) {
        if (recommendedTargetData && recommendedTargetData.poc_persona) {
          contentToCopy = "PoC 목적별 추천 타겟 및 예상 인사이트\n\n";
          Object.entries(recommendedTargetData.poc_persona).forEach(([key, value], index) => {
            const goalActionText = findGoalActionText(index);
            contentToCopy += `${goalActionText}\n`;
            contentToCopy += `1. 추천 페르소나 : ${value[0]["추천 가상 페르소나"]}\n`;
            contentToCopy += `2. 이유 및 예상 인사이트 : ${value[1]["이유 및 예상 인사이트"]}\n\n`;
          });
        }
      }
      else if (reportIndex === 5) {
        contentToCopy = extractTextContent(ideaPriority);
      }
      else if (reportIndex === 6) {
        contentToCopy = "마케팅 분석과 개선 솔루션 제안\n" + extractTextContent(growthHackerReportData);
      }
      else if (reportIndex === 8) {
        contentToCopy = extractTextContent(sampleData);
      }
      else if (reportIndex === 10) {
        contentToCopy = "맞춤형 조사 설계 보고서\n\n";
        contentToCopy += `${surveyGuidelineReportData.method_1.title}\n`;
        contentToCopy += `조사 목표: ${surveyGuidelineReportData.method_1.survey_goal}\n`;
        contentToCopy += `대상 및 채널: ${surveyGuidelineReportData.method_1.survey_target.target_person}, ${surveyGuidelineReportData.method_1.channels_and_collection_methods.channels}\n`;
        contentToCopy += `데이터 수집 및 분석: ${surveyGuidelineReportData.method_1.channels_and_collection_methods.collection_methods}\n\n`;
        contentToCopy += `${surveyGuidelineReportData.method_2.title}\n`;
        contentToCopy += `조사 목표: ${surveyGuidelineReportData.method_2.survey_goal}\n`;
        contentToCopy += `대상 및 채널: ${surveyGuidelineReportData.method_2.survey_target.target_person}, ${surveyGuidelineReportData.method_2.channels_and_collection_methods.channels}\n`;
        contentToCopy += `데이터 수집 및 분석: ${surveyGuidelineReportData.method_2.channels_and_collection_methods.collection_methods}\n\n`;
        contentToCopy += `${surveyGuidelineReportData.method_3.title}\n`;
        contentToCopy += `조사 목표: ${surveyGuidelineReportData.method_3.survey_goal}\n`;
        contentToCopy += `대상 및 채널: ${surveyGuidelineReportData.method_3.survey_target.target_person}, ${surveyGuidelineReportData.method_3.channels_and_collection_methods.channels}\n`;
        contentToCopy += `데이터 수집 및 분석: ${surveyGuidelineReportData.method_3.channels_and_collection_methods.collection_methods}\n\n`;
      }
    }
  
    navigator.clipboard
      .writeText(contentToCopy.trim())
      .then(() => {
        setIsPopupCopy(true); // 복사 팝업 열기
      })
      .catch((error) => {
       // console.error("복사 실패", error);
      });
  };

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  const data = {
    business_idea: inputBusinessInfo,
  };

  // 기초 보고서 재생성
  const regenerateReport = async () => {
    let businessData;

    setIsLoading(true);
    setIsLoadingAnalysis(true);

    // 버튼 클릭으로 API 호출
    // const response = await axios.post(
    //   "https://wishresearch.kr/panels/business",
    //   data,
    //   axiosConfig
    // );
    // businessData = response.data.business_analysis;

    const response = await InterviewXBusinessAnalysisRequest(
      data,
      isLoggedIn
    );
    businessData = response.response.business_analysis;

    // 데이터를 받아온 직후 아톰에 값을 설정합니다.
    if (Array.isArray(businessData["주요_목적_및_특징"])) {
      setTempMainFeaturesOfBusinessInformation(
        businessData["주요_목적_및_특징"]?.map((item) => item)
      );
      setMainFeaturesOfBusinessInformation(
        businessData["주요_목적_및_특징"]?.map((item) => item)
      );
    } else {
      setTempMainFeaturesOfBusinessInformation(
        businessData["주요_목적_및_특징"]
          ? [businessData["주요_목적_및_특징"]]
          : []
      );
      setMainFeaturesOfBusinessInformation(
        businessData["주요_목적_및_특징"]
          ? [businessData["주요_목적_및_특징"]]
          : []
      );
    }

    if (Array.isArray(businessData["주요기능"])) {
      setTempMainCharacteristicOfBusinessInformation(
        businessData["주요기능"]?.map((item) => item)
      );
      setMainCharacteristicOfBusinessInformation(
        businessData["주요기능"]?.map((item) => item)
      );
    } else {
      setTempMainCharacteristicOfBusinessInformation(
        businessData["주요기능"] ? [businessData["주요기능"]] : []
      );
      setMainCharacteristicOfBusinessInformation(
        businessData["주요기능"] ? [businessData["주요기능"]] : []
      );
    }

    if (Array.isArray(businessData["목표고객"])) {
      setTempBusinessInformationTargetCustomer(
        businessData["목표고객"]?.map((item) => item)
      );
      setBusinessInformationTargetCustomer(
        businessData["목표고객"]?.map((item) => item)
      );
    } else {
      setTempBusinessInformationTargetCustomer(
        businessData["목표고객"] ? [businessData["목표고객"]] : []
      );
      setBusinessInformationTargetCustomer(
        businessData["목표고객"] ? [businessData["목표고객"]] : []
      );
    }

    // 명칭은 배열이 아니므로 기존 방식 유지
    setTitleOfBusinessInfo(businessData["명칭"]);

    // 아톰이 업데이트된 후에 analysisReportData를 생성합니다.
    const analysisReportData = {
      title: businessData["명칭"],
      mainFeatures: Array.isArray(businessData["주요_목적_및_특징"])
        ? businessData["주요_목적_및_특징"]
        : [],
      mainCharacter: Array.isArray(businessData["주요기능"])
        ? businessData["주요기능"]
        : [],
      mainCustomer: Array.isArray(businessData["목표고객"])
        ? businessData["목표고객"]
        : [],
    };

    await saveConversation(
      { changingConversation: { conversationStage: 2 } }
    );

    setChatRefreshTrigger((prev) => !prev);
    // setReportRefreshTrigger((prev) => !prev);
    setIsLoadingAnalysis(false);
    setIsLoading(false);
  };

  const handleEditStart = (ideaFeatureRequirement) => {
    if(ideaFeatureRequirement === "feature") {
      setIsEditingIdeaFeature(true);
      setEditedIdeaFeatureTitle(ideaFeatureData[0].title);
    }
    else if(ideaFeatureRequirement === "customer") {
      setIsEditingIdeaCustomer(true);
      setEditedIdeaCustomerTitle(ideaRequirementData[0].title);
    }
    else {
      setIsEditingNow(true); 
    }
    
  };

  if ((reportIndex === 5 && !sampleData) || report) {
    if (report) {
      return (
        <>
          <ButtonWrap>
            <div>
              <button type="button" onClick={toggleCopy}>
                <img src={images.IconCopy} alt="" />
                복사하기
              </button>
            </div>
          </ButtonWrap>
          {isPopupCopy && (
          <Popup
            Cancel
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closePopupCopy();
              }
            }}
          >
            <div>
              <button
                type="button"
                className="closePopup"
                onClick={closePopupCopy}
              >
                닫기
              </button>
              <span>
                <img src={images.CheckMark} alt="" />
              </span>
              <p>복사가 완료되었습니다</p>
              <div className="btnWrap">
                <button type="button" onClick={closePopupCopy}>
                  확인
                </button>
              </div>
            </div>
          </Popup>
        )}
        </>
      )
    }
    else if (ideaFeatureRequirement === "feature" && buttonState.IdeaCustomer !== 1 && ideaList.length === 0) {
      return (
        <>
          {!isEditingIdeaFeature ? (
            <ButtonWrap>
              <div />
              <div>
                {!report && (
                  <button type="button" onClick={() => handleEditStart(ideaFeatureRequirement)}>
                    <img src={images.IconEdit} alt="" />
                    수정하기
                  </button>
                )}
              </div>
            </ButtonWrap>
          ) : (
            <ButtonWrap>
              <div>
                <button type="button" className="lineBtn" onClick={togglePopupCancel}>
                  취소하기
                </button>
                <button type="button" className="lineBtn" onClick={() => handleEditConfirm(reportIndex)}>
                  수정 완료하기
                </button>
              </div>
            </ButtonWrap>
          )}
          
          {isPopupOpenCancel && (
            <Popup
              Cancel
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  togglePopupCancel();
                }
              }}
            >
              <div>
                <button type="button" className="closePopup" onClick={togglePopupCancel}>
                  닫기
                </button>
                <span>
                  <img src={images.ExclamationMark} alt="" />
                </span>
                <p>
                  <strong>정말 취소하시겠습니까?</strong>
                  <span>취소 시 수정하신 내용은 저장되지 않습니다</span>
                </p>
                <div className="btnWrap">
                  <button type="button" onClick={togglePopupCancel}>
                    아니오
                  </button>
                  <button type="button" onClick={() => handleEditCancel(reportIndex)}>
                    네, 취소할게요
                  </button>
                </div>
              </div>
            </Popup>
          )}
        </>
      );
    }
    else if (ideaFeatureRequirement === "customer" && buttonState.IdeaGenerate !== 1 && ideaList.length === 0) {
      return (
        <>
          {!isEditingIdeaCustomer ? (
            <ButtonWrap>
              <div />
              <div>
                {!report && (
                  <button type="button" onClick={() => handleEditStart(ideaFeatureRequirement)}>
                    <img src={images.IconEdit} alt="" />
                    수정하기
                  </button>
                )}
              </div>
            </ButtonWrap>
          ) : (
            <ButtonWrap>
              <div>
                <button type="button" className="lineBtn" onClick={togglePopupCancel}>
                  취소하기
                </button>
                <button type="button" className="lineBtn" onClick={() => handleEditConfirm(reportIndex)}>
                  수정 완료하기
                </button>
              </div>
            </ButtonWrap>
          )}

          {isPopupOpenCancel && (
            <Popup
              Cancel
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  togglePopupCancel();
                }
              }}
            >
              <div>
                <button type="button" className="closePopup" onClick={togglePopupCancel}>
                  닫기
                </button>
                <span>
                  <img src={images.ExclamationMark} alt="" />
                </span>
                <p>
                  <strong>정말 취소하시겠습니까?</strong>
                  <span>취소 시 수정하신 내용은 저장되지 않습니다</span>
                </p>
                <div className="btnWrap">
                  <button type="button" onClick={togglePopupCancel}>
                    아니오
                  </button>
                  <button type="button" onClick={() => handleEditCancel(reportIndex)}>
                    네, 취소할게요
                  </button>
                </div>
              </div>
            </Popup>
          )}
        </>
      );
    }
  }

  else {
    return (
      <>
        {reportIndex === 0 ? (
          <>
            {conversationStage > 2 ? (
              <ButtonWrap>
                <div>
                  <button type="button" onClick={toggleCopy}>
                    <img src={images.IconCopy} alt="" />
                    복사하기
                  </button>
                  {/* {!report &&              
                    <button type="button" onClick={toggleSave}>
                      <img src={images.IconSave} alt="" />
                      저장하기
                    </button>
                  } */}
                </div>
              </ButtonWrap>
            ) : (
              <>
              {!isEditingNow ? (
                <ButtonWrap style={{alignItems:"flex-start"}}>
                  <div>
                    {!report && (
                      <>
                        <button type="button" onClick={regenerateReport}>
                          <img src={images.IconRefresh} alt="" />
                          재생성하기
                        </button>
                        <button type="button" onClick={() => setIsEditingNow(true)}>
                          <img src={images.IconEdit} alt="" />
                          수정하기
                        </button>
                      </>
                    )}
                    <button type="button" onClick={toggleCopy}>
                      <img src={images.IconCopy} alt="" />
                      복사하기
                    </button>
                    {/* {!report && (
                      <button type="button" onClick={toggleSave}>
                        <img src={images.IconSave} alt="" />
                        저장하기
                      </button>
                    )} */}
                  </div>
                </ButtonWrap>
                ) : (
                  <ButtonWrap>
                    <div>
                      <button
                        type="button"
                        className="lineBtn"
                        onClick={togglePopupCancel}
                      >
                        취소하기
                      </button>
                      <button
                        type="button"
                        className="lineBtn"
                        onClick={() => handleEditConfirm(reportIndex)}
                      >
                        수정 완료하기
                      </button>
                    </div>
                  </ButtonWrap>
                )}
              </>
            )}
          </>
      ) : (
        <>
          <ButtonWrap>
            <div>
              {report ? (
                // report 값이 있는 경우 복사하기 버튼만 표시
                <button type="button" onClick={toggleCopy}>
                  <img src={images.IconCopy} alt="" />
                  복사하기
                </button>
              ) : (
                // report 값이 없는 경우 기존 버튼들 표시
                <>
                  {/* {selectedAdditionalKeyword.length === 0 && (
                    <button type="button" onClick={regenerateReport}>
                      <img src={images.IconRefresh} alt="" />
                      재생성하기
                    </button>
                  )} */}
                  <button type="button" onClick={toggleCopy}>
                    <img src={images.IconCopy} alt="" />
                    복사하기
                  </button>
                  {/* <button type="button" onClick={toggleSave}>
                    <img src={images.IconSave} alt="" />
                    저장하기
                  </button> */}
                </>
              )}
            </div>
          </ButtonWrap>
        </>
      )}
  
        {isPopupOpen && (
          <Popup
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                togglePopup();
              }
            }}
          >
            <div>
              <button type="button" className="closePopup" onClick={togglePopup}>
                닫기
              </button>
              <span>
                <img src={images.CheckMark} alt="" />
              </span>
              <p>
                해당 기능을 사용하시려면 로그인이 필요해요
                <br />
                로그인 하시겠습니까?
              </p>
              <div className="btnWrap">
                <button type="button" onClick={handleSignupClick}>
                  회원가입
                </button>
                <button type="button" onClick={handleLoginClick}>
                  로그인
                </button>
              </div>
            </div>
          </Popup>
        )}
  
        {isPopupOpenCancel && (
          <Popup
            Cancel
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                togglePopupCancel();
              }
            }}
          >
            <div>
              <button
                type="button"
                className="closePopup"
                onClick={togglePopupCancel}
              >
                닫기
              </button>
              <span>
                <img src={images.ExclamationMark} alt="" />
              </span>
              <p>
                <strong>정말 취소하시겠습니까?</strong>
                <span>취소 시 수정하신 내용은 저장되지 않습니다</span>
              </p>
              <div className="btnWrap">
                <button type="button" onClick={togglePopupCancel}>
                  아니오
                </button>
                <button type="button" onClick={() => handleEditCancel(reportIndex)}>
                  네, 취소할게요
                </button>
              </div>
            </div>
          </Popup>
        )}
  
        {isPopupSave && (
          <Popup
            Cancel
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closePopupSave(); // 상태를 false로 설정
              }
            }}
          >
            <div>
              <button
                type="button"
                className="closePopup"
                onClick={closePopupSave}
              >
                닫기
              </button>
              <span>
                <img src={images.CheckMark} alt="" />
              </span>
              <p>
                저장되었습니다.
                <br />
                인사이트 보관함을 확인해주세요
              </p>
              <div className="btnWrap">
                <button type="button" onClick={closePopupSave}>
                  확인
                </button>
              </div>
            </div>
          </Popup>
        )}
  
        {isPopupCopy && (
          <Popup
            Cancel
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closePopupCopy(); // 상태를 false로 설정
              }
            }}
          >
            <div>
              <button
                type="button"
                className="closePopup"
                onClick={closePopupCopy}
              >
                닫기
              </button>
              <span>
                <img src={images.CheckMark} alt="" />
              </span>
              <p>복사가 완료되었습니다</p>
              <div className="btnWrap">
                <button type="button" onClick={closePopupCopy}>
                  확인
                </button>
              </div>
            </div>
          </Popup>
        )}
  
        {isLoginPopupOpen && <MoleculeLoginPopup onClose={closeLoginPopup} />}
      </>
    );
  }
};

export default MoleculeReportController;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  // align-items: center;
  align-items:flex-end;
  gap: 16px;
  margin-top: 20px !important;
  // padding-top: 20px;
  // border-top: 1px solid ${palette.lineGray};

  button {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: "Pretendard";
    font-size: 0.75rem;
    color: ${palette.gray};
    padding: 4px 8px;
    border-radius: 5px;
    border: 0;
    background: none;
    transition: all 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.03);
    }
  }

  .lineBtn {
    padding: 8px 16px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
  }

  > button {
    padding: 8px 16px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
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
      text-align:center;
      margin: 20px auto 24px;
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
