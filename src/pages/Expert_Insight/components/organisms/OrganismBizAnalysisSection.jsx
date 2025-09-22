import React, { useEffect, useState } from "react";
import styled, { keyframes, css, ThemeProvider } from "styled-components";
import theme from "../../../../assets/styles/Theme";
import { useAtom } from "jotai";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import { InputField } from "../../../../assets/styles/Input";
import MoleculeReportController from "../molecules/MoleculeReportController";
import Loader from "../atoms/AtomLoader";
import { getConversationByIdFromIndexedDB } from "../../../../utils/indexedDB";
import { useSaveConversation } from "../atoms/AtomSaveConversation";
import axios from "axios";
import { InterviewXBusinessAnalysisRequest, InterviewXBusinessAnalysisModifyRequest } from "../../../../utils/indexedDB";


import {
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER,
  INPUT_BUSINESS_INFO,
  IS_EDITING_NOW,
  ANALYSIS_BUTTON_STATE,
  IS_LOADING,
  CONVERSATION,
  APPROACH_PATH,
  IS_LOGGED_IN,
  SELECTED_EXPERT_INDEX,
  REPORT_REFRESH_TRIGGER,
  IS_LOADING_ANALYSIS,
  CONVERSATION_STAGE,
  CHAT_REFRESH_TRIGGER,
  BUTTON_STATE,
  CONVERSATION_ID,
  IS_ADDING_NOW,
  NEW_ADD_CONTENT,
} from "../../../AtomStates";

import { saveConversationToIndexedDB } from "../../../../utils/indexedDB";

const OrganismBizAnalysisSection = () => {
  const { saveConversation } = useSaveConversation();
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN); // 로그인 상태 확인
  const [reportRefreshTrigger, setReportRefreshTrigger] = useAtom(
    REPORT_REFRESH_TRIGGER
  ); // 리프레시 트리거 상태 구독

  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [approachPath] = useAtom(APPROACH_PATH);

  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(
    SELECTED_EXPERT_INDEX
  );
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

  const [
    tempMainFeaturesOfBusinessInformation,
    setTempMainFeaturesOfBusinessInformation,
  ] = useAtom(TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    tempMainCharacteristicOfBusinessInformation,
    setTempMainCharacteristicOfBusinessInformation,
  ] = useAtom(TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [
    tempBusinessInformationTargetCustomer,
    setTempBusinessInformationTargetCustomer,
  ] = useAtom(TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [isLoadingAnalysis, setIsLoadingAnalysis] =
    useAtom(IS_LOADING_ANALYSIS);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [isLoadingAdd1, setIsLoadingAdd1] = useState(false);
  const [isLoadingAdd2, setIsLoadingAdd2] = useState(false);
  const [isLoadingAdd3, setIsLoadingAdd3] = useState(false);

  const [analysisButtonState, setAnalysisButtonState] = useAtom(
    ANALYSIS_BUTTON_STATE
  );

  const [newAddContent, setNewAddContent] = useAtom(NEW_ADD_CONTENT);
  const [isAddingNow, setIsAddingNow] = useAtom(IS_ADDING_NOW);
  const [newEditContent, setNewEditContent] = useState("");
  const [editingIndex, setEditingIndex] = useState({ section: "", index: -1 });
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);
  const [warningMessage, setWarningMessage] = useState("");

  const [isPopupOpenDelete, setIsPopupOpenDelete] = useState(false);
  const [isPopupEmpty, setIsPopupEmpty] = useState(false);

  const [deleteInfo, setDeleteInfo] = useState({ section: "", index: null });
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [chatRefreshTrigger, setChatRefreshTrigger] =
    useAtom(CHAT_REFRESH_TRIGGER);
  const [progress, setProgress] = useState(0);

  const togglePopupDelete = () => {
    setIsPopupOpenDelete(!isPopupOpenDelete);
  };

  const closePopupEmpty = () => {
    setIsPopupEmpty(false);
  };

  const confirmDelete = (section, index) => {
    setDeleteInfo({ section, index });
    togglePopupDelete();
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
  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };

  useEffect(() => {
    const loadAndSaveData = async () => {
      let businessData;
      let attempts = 0;
      const maxAttempts = 5;

      if (analysisButtonState === 1) {
        setIsLoading(true);
        setIsLoadingAnalysis(true);

        let response = await InterviewXBusinessAnalysisRequest(
          data,
          isLoggedIn
        );
        businessData = response.response.business_analysis;
        setChatRefreshTrigger((prev) => !prev);
        // 필요한 데이터가 없을 경우 재시도, 최대 5번
        while (
          (!businessData.hasOwnProperty("명칭") ||
            !businessData.hasOwnProperty("주요_목적_및_특징") ||
            !businessData.hasOwnProperty("주요기능") ||
            !businessData.hasOwnProperty("목표고객") ||
            !businessData["명칭"] ||
            !businessData["주요_목적_및_특징"].length ||
            businessData["주요기능"].length < 2 ||
            !businessData["목표고객"].length) &&
          attempts < maxAttempts
        ) {
          attempts += 1;

          response = await InterviewXBusinessAnalysisRequest(
            data,
            isLoggedIn
          );
          businessData = response.response.business_analysis;
        }

        if (attempts >= maxAttempts) {
          setIsLoadingAnalysis(false);
          setIsLoading(false);

          // 대화 업데이트 및 저장
          const updatedConversation = [...conversation];
          updatedConversation.pop();
          updatedConversation.pop();

          updatedConversation.push({
            type: "system",
            message:
              "입력하신 정보로는 분석이 어렵습니다. 아래 검색창에 다시 한번 입력해주세요.",
            expertIndex: selectedExpertIndex,
          });

          setConversation(updatedConversation);
          setConversationStage(1);
          // **API 데이터가 있을 경우에만 저장**

          await saveConversation({
            changingConversation: {
              conversation: updatedConversation,
              conversationStage: 1,
              inputBusinessInfo: "",
            },
          });

          // await saveConversationToIndexedDB(
          //   {
          //     id: conversationId,
          //     data: {
          //       conversation: updatedConversation,
          //     },
          //   },
          //   conversationId
          // );

          // setReportRefreshTrigger((prev) => !prev);
        } else {
          setAnalysisButtonState(0);

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
            title: businessData?.["명칭"] || "No title available", // '명칭' 속성이 없으면 기본값 설정
            mainFeatures: Array.isArray(businessData?.["주요_목적_및_특징"])
              ? businessData["주요_목적_및_특징"]
              : [],
            mainCharacter: Array.isArray(businessData?.["주요기능"])
              ? businessData["주요기능"]
              : [],
            mainCustomer: Array.isArray(businessData?.["목표고객"])
              ? businessData["목표고객"]
              : [],
          };

          setIsLoadingAnalysis(false);
          setIsLoading(false);

          // 대화 업데이트 및 저장
          const updatedConversation2 = [...conversation];
          if (approachPath === 1) {
            if (
              selectedExpertIndex === "1" ||
              selectedExpertIndex === "2" ||
              selectedExpertIndex === "3"
            ) {
              updatedConversation2.push(
                {
                  type: "system",
                  message:
                    "분석한 특징과 기능은 잘 확인하셨나요? \n수정이 필요하면 “수정하기” 버튼을 사용하면 수정도 가능해요.",
                  expertIndex: selectedExpertIndex,
                },
                {
                  type: "system",
                  message:
                    "이상이 없으시면, 본격적인 전략 컨설팅을 시작해볼까요? 먼저 시장 현황을 파악해보겠습니다.",
                  expertIndex: -1,
                },
                { type: "strategyButton" }
              );
            } else if (selectedExpertIndex === "4") {
              updatedConversation2.push(
                {
                  type: "system",
                  message:
                    "비즈니스 분석이 완료되었습니다. 추가 사항이 있으시면 ‘수정하기’ 버튼을 통해 수정해 주세요.\n분석 결과에 만족하신다면, 지금 바로 PoC 계획을 시작할게요.",
                  expertIndex: selectedExpertIndex,
                },
                { type: "pocPlanButton" }
              );
            } else if (selectedExpertIndex === "5") {
              updatedConversation2.push(
                {
                  type: "system",
                  message:
                    "분석한 아이템의 특징과 기능이 잘 분석되었나요? 추가하고 싶은 내용이 있으시면 “수정하기” 버튼을 통해 수정해주세요\n수정사항이 없으시다면, 구조화된 아이디어 발상을 진행하겠습니다.",
                  expertIndex: selectedExpertIndex,
                },
                { type: "ideaStartButton" }
              );
            } else if (selectedExpertIndex === "6") {
              updatedConversation2.push(
                {
                  type: "system",
                  message:
                    "분석한 특징과 기능은 잘 확인하셨나요? \n수정이 필요하면 “수정하기” 버튼을 사용하면 수정도 가능해요.",
                  expertIndex: selectedExpertIndex,
                },
                {
                  type: "system",
                  message:
                    "이제 아이템을 분석하여, 성장 가능성을 극대화할 그로스 해킹 방법을 찾아보겠습니다. 시작할까요? 🔍",
                  expertIndex: -1,
                },
                { type: "growthHackerStartButton" }
              );
            } else if (selectedExpertIndex === "7") {
              updatedConversation2.push(
                {
                  type: "system",
                  message:
                    "분석한 아이템의 특징과 기능이 잘 분석되었나요? 추가하고 싶은 내용이 있으시면 “수정하기” 버튼을 통해 수정해주세요\n분석 결과에 만족하신다면, 지금 시장 가격 분석을 진행하겠습니다.",
                  expertIndex: selectedExpertIndex,
                },
                { type: "priceStartButton" }
              );
            } else if (selectedExpertIndex === "8") {
              updatedConversation2.push(
                {
                  type: "system",
                  message:
                    "분석한 아이템의 특징과 기능이 잘 분석되었나요? 추가하고 싶은 내용이 있으시면 “수정하기” 버튼을 통해 수정해주세요\n문제가 없다면 관련된 다양한 사례를 조사하겠습니다. 🔎",
                  expertIndex: selectedExpertIndex,
                },
                { type: "caseStartButton" }
              );
            } else if (selectedExpertIndex === "9") {
              updatedConversation2.push(
                {
                  type: "system",
                  message:
                    "분석한 특징과 기능은 잘 확인하셨나요? \n수정이 필요하면 “수정하기” 버튼을 사용하면 수정도 가능해요.",
                  expertIndex: -1,
                },
                {
                  type: "system",
                  message:
                    "이상이 없으시면, 본격적인 비즈니스 모델 설계를 진행하겠습니다.\n먼저 현재 아이템을 진단해보겠습니다",
                  expertIndex: -1,
                },
                { type: "bmStartButton" }
              );
            } else if (selectedExpertIndex === "10") {
              updatedConversation2.push(
                {
                  type: "system",
                  message:
                    "분석된 아이템의 특징과 기능이 적절한가요? 수정이 필요하면 ‘수정하기’ 버튼을 사용하여 변경이 가능합니다.\n이상이 없으면 설문조사 설계를 진행하겠습니다.",
                  expertIndex: selectedExpertIndex,
                },
                { type: "surveyStartButton" }
              );
            }
          } else if (approachPath === -1) {
            updatedConversation2.push({
              type: "system",
              message:
                "비즈니스 분석이 완료되었습니다. 추가 사항이 있으시면 ‘수정하기’ 버튼을 통해 수정해 주세요.\n분석 결과에 만족하신다면, 전문가들의 의견을 확인하여 아이디어를 한 단계 더 발전시켜 보세요 🔍",
              expertIndex: selectedExpertIndex,
            });
          } else {
            // 히스토리 불러오기 로직
          }

          setConversation(updatedConversation2);
          // **API 데이터가 있을 경우에만 저장**

          await saveConversation({
            changingConversation: {
              conversation: updatedConversation2,
              conversationStage: 2,
              analysisReportData: analysisReportData,
            },
          });

          // await saveConversationToIndexedDB(
          //   {
          //     data: {
          //       inputBusinessInfo: inputBusinessInfo,
          //       conversation: updatedConversation2,
          //       analysisReportData: analysisReportData,
          //       conversationStage: 2,
          //     },
          //   },
          //   conversationId
          // );
          // setReportRefreshTrigger((prev) => !prev);
        }
      } else {
        // IndexedDB에서 기존 데이터를 가져와 적용
        const existingConversation = await getConversationByIdFromIndexedDB(
          conversationId,
          isLoggedIn
        );

        if (existingConversation && existingConversation.analysisReportData) {
          const storedData = existingConversation.analysisReportData;

          // 저장된 데이터를 각 상태에 적용
          setTitleOfBusinessInfo(storedData.title);
          setTempMainFeaturesOfBusinessInformation(storedData.mainFeatures);
          setTempMainCharacteristicOfBusinessInformation(
            storedData.mainCharacter
          );
          setTempBusinessInformationTargetCustomer(storedData.mainCustomer);

          setMainFeaturesOfBusinessInformation(storedData.mainFeatures);
          setMainCharacteristicOfBusinessInformation(storedData.mainCharacter);
          setBusinessInformationTargetCustomer(storedData.mainCustomer);
        } else {
         // console.warn("No saved analysis data found.");
        }
      }
    };

    loadAndSaveData();
  }, [
    conversationId,
    setTitleOfBusinessInfo,
    setMainFeaturesOfBusinessInformation,
    setMainCharacteristicOfBusinessInformation,
    setBusinessInformationTargetCustomer,
    setTempMainFeaturesOfBusinessInformation,
    setTempMainCharacteristicOfBusinessInformation,
    setTempBusinessInformationTargetCustomer,
  ]);

  const handleEditStart = (section, index) => {
    setEditingIndex({ section, index });

    switch (section) {
      case "mainFeatures":
        setNewEditContent(mainFeaturesOfBusinessInformation[index]);
        break;
      case "mainCharacteristic":
        setNewEditContent(mainCharacteristicOfBusinessInformation[index]);
        break;
      case "targetCustomer":
        setNewEditContent(businessInformationTargetCustomer[index]);
        break;
      default:
        break;
    }
  };

  const handleApplyChange = () => {
    if (newEditContent.trim() === "") {
      setIsPopupEmpty(true); // 비어있는 내용에 대한 경고 메시지
      return;
    }

    let updatedArray;

    switch (editingIndex.section) {
      case "mainFeatures":
        updatedArray = [...mainFeaturesOfBusinessInformation];
        updatedArray[editingIndex.index] = newEditContent;
        setMainFeaturesOfBusinessInformation(updatedArray);
        break;
      case "mainCharacteristic":
        updatedArray = [...mainCharacteristicOfBusinessInformation];
        updatedArray[editingIndex.index] = newEditContent;
        setMainCharacteristicOfBusinessInformation(updatedArray);
        break;
      case "targetCustomer":
        updatedArray = [...businessInformationTargetCustomer];
        updatedArray[editingIndex.index] = newEditContent;
        setBusinessInformationTargetCustomer(updatedArray);
        break;
      default:
        break;
    }

    setEditingIndex({ section: "", index: -1 });
    setWarningMessage("");
    setNewEditContent("");
  };

  const handleEditCancel = () => {
    setEditingIndex({ section: "", index: -1 });
    setWarningMessage("");
    setNewEditContent("");
  };

  const handleAddSave = (section) => {
    if (newAddContent.trim() === "") {
      setIsPopupEmpty(true);
      return;
    }

    if (section === "mainFeatures") {
      setMainFeaturesOfBusinessInformation([
        ...mainFeaturesOfBusinessInformation,
        newAddContent,
      ]);
    } else if (section === "mainCharacteristic") {
      setMainCharacteristicOfBusinessInformation([
        ...mainCharacteristicOfBusinessInformation,
        newAddContent,
      ]);
    } else if (section === "targetCustomer") {
      setBusinessInformationTargetCustomer([
        ...businessInformationTargetCustomer,
        newAddContent,
      ]);
    }
    setNewAddContent("");
    setIsAddingNow({ section: "", isAdding: false });
  };

  const handleDelete = () => {
    const { section, index } = deleteInfo;

    if (section === "mainFeatures") {
      setMainFeaturesOfBusinessInformation(
        mainFeaturesOfBusinessInformation.filter((_, i) => i !== index)
      );
    } else if (section === "mainCharacteristic") {
      setMainCharacteristicOfBusinessInformation(
        mainCharacteristicOfBusinessInformation.filter((_, i) => i !== index)
      );
    } else if (section === "targetCustomer") {
      setBusinessInformationTargetCustomer(
        businessInformationTargetCustomer.filter((_, i) => i !== index)
      );
    }

    togglePopupDelete();
  };

  const generateAddtionalContent = async (section) => {
    if (newAddContent.trim() === "") {
      setIsPopupEmpty(true);
      return;
    }

    try {
      setIsLoading(true);

      const data = {
        business_analysis_data: {
          business_analysis: {
            명칭: analysisReportData.title,
            주요_목적_및_특징: analysisReportData.mainFeatures,
            주요기능: analysisReportData.mainCharacter,
          },
        },
        business_analysis_data_part: "",
        keyword: newAddContent,
      };

      if (section === "mainFeatures") {
        setIsLoadingAdd1(true);
        data.business_analysis_data_part = "1";
      } else if (section === "mainCharacteristic") {
        setIsLoadingAdd2(true);
        data.business_analysis_data_part = "2";
      }

      const response = await InterviewXBusinessAnalysisModifyRequest(
        data,
        isLoggedIn
      );
    
      if (section === "mainFeatures") {
        setMainFeaturesOfBusinessInformation([
          ...mainFeaturesOfBusinessInformation,
          response.response.business_analysis.추가_주요_목적_및_특징, 
        ]);
      } else if (section === "mainCharacteristic") {
        setMainCharacteristicOfBusinessInformation([
          ...mainCharacteristicOfBusinessInformation,
          response.response.business_analysis.추가_주요기능, 
        ]);
      }
      setNewAddContent("");
      setIsAddingNow({ section: "", isAdding: false });
      setIsLoading(false);
      setIsLoadingAdd1(false);
      setIsLoadingAdd2(false);
    } catch (error) {
     // console.error("Error loading data:", error);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <>
          {isLoadingAnalysis || analysisButtonState ? (
            <AnalysisSection
              style={{
                maxWidth: "950px",
                minHeight: "532px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Loader />
            </AnalysisSection>
          ) : (
            <AnalysisSection>
              <div>
                <h1>{titleOfBusinessInfo}</h1>
                {/* 주요 특징 섹션 */}
                <BoxWrap>
                  <strong>
                    {/* <img src={images.StarChack} alt="" /> */}
                    주요 특징
                  </strong>
                  <ul>
                    {mainFeaturesOfBusinessInformation?.map(
                      (content, index) => (
                        <li key={index}>
                          {editingIndex.section === "mainFeatures" &&
                          editingIndex.index === index ? (
                            <InputField
                              type="text"
                              value={newEditContent}
                              onChange={(e) =>
                                setNewEditContent(e.target.value)
                              }
                            />
                          ) : (
                            <p>{content}</p>
                          )}
                          {editingIndex.section === "mainFeatures" &&
                          editingIndex.index === index ? (
                            <>
                              <BtnWrap>
                                <button onClick={handleEditCancel}>
                                  <img src={images.IconClose2} alt="" />
                                  취소
                                </button>
                                <button onClick={handleApplyChange}>
                                  <img src={images.IconCheck2} alt="" />
                                  적용
                                </button>
                              </BtnWrap>
                            </>
                          ) : (
                            <>
                              {isEditingNow && (
                                <>
                                  <BtnWrap>
                                    <button
                                      onClick={() =>
                                        handleEditStart("mainFeatures", index)
                                      }
                                    >
                                      <img src={images.IconEdit2} alt="" />
                                      수정
                                    </button>
                                    <button
                                      onClick={() =>
                                        confirmDelete("mainFeatures", index)
                                      }
                                    >
                                      <img src={images.IconDelete2} alt="" />
                                      삭제
                                    </button>
                                  </BtnWrap>
                                </>
                              )}
                            </>
                          )}
                        </li>
                      )
                    )}
                  </ul>
                  {isLoadingAdd1 ? (
                    <ProgressWrap>
                      <ProgressBarContainer>
                        <Progress progress={progress} />
                      </ProgressBarContainer>
                      <p>잠시만 기다려 주세요 ...</p>
                    </ProgressWrap>
                  ) : isAddingNow.section === "mainFeatures" &&
                    isAddingNow.isAdding &&
                    isEditingNow ? (
                    <AddInfo>
                      <InputField
                        value={newAddContent}
                        onChange={(e) => {
                          setNewAddContent(e.target.value);
                        }}
                        placeholder="새로운 정보를 추가해보세요"
                      />
                      <BtnWrap>
                        <button
                          onClick={() => {
                            setIsAddingNow({ section: "", isAdding: false });
                            setNewAddContent("");
                          }}
                        >
                          <img src={images.IconClose2} alt="" />
                          취소
                        </button>
                        <button onClick={() => handleAddSave("mainFeatures")}>
                          <img src={images.IconCheck2} alt="" />
                          저장
                        </button>
                        <button
                          onClick={() =>
                            generateAddtionalContent("mainFeatures")
                          }
                        >
                          <img src={images.IconMagic2} alt="" />
                          생성
                        </button>
                      </BtnWrap>
                    </AddInfo>
                  ) : (
                    isEditingNow && (
                      <button
                        className="moreButton"
                        onClick={() =>
                          setIsAddingNow({
                            section: "mainFeatures",
                            isAdding: true,
                          })
                        }
                      >
                        특징 추가하기 +
                      </button>
                    )
                  )}
                </BoxWrap>
                <BoxWrap>
                  <strong>
                    {/* <img src={images.IconSetting} alt="" /> */}
                    주요 기능
                  </strong>
                  <ul className="disc">
                    {mainCharacteristicOfBusinessInformation?.map(
                      (content, index) => (
                        <li key={index}>
                          {editingIndex.section === "mainCharacteristic" &&
                          editingIndex.index === index ? (
                            <InputField
                              type="text"
                              value={newEditContent}
                              onChange={(e) =>
                                setNewEditContent(e.target.value)
                              }
                            />
                          ) : (
                            <p>{content}</p>
                          )}
                          {editingIndex.section === "mainCharacteristic" &&
                          editingIndex.index === index ? (
                            <>
                              <BtnWrap>
                                <button onClick={handleEditCancel}>
                                  <img src={images.IconClose2} alt="" />
                                  취소
                                </button>
                                <button onClick={handleApplyChange}>
                                  <img src={images.IconCheck2} alt="" />
                                  적용
                                </button>
                              </BtnWrap>
                            </>
                          ) : (
                            <>
                              {isEditingNow && (
                                <>
                                  <BtnWrap>
                                    <button
                                      onClick={() =>
                                        handleEditStart(
                                          "mainCharacteristic",
                                          index
                                        )
                                      }
                                    >
                                      <img src={images.IconEdit2} alt="" />
                                      수정
                                    </button>
                                    <button
                                      onClick={() =>
                                        confirmDelete(
                                          "mainCharacteristic",
                                          index
                                        )
                                      }
                                    >
                                      <img src={images.IconDelete2} alt="" />
                                      삭제
                                    </button>
                                  </BtnWrap>
                                </>
                              )}
                            </>
                          )}
                        </li>
                      )
                    )}
                  </ul>
                  {isLoadingAdd2 ? (
                    <ProgressWrap>
                      <ProgressBarContainer>
                        <Progress progress={progress} />
                      </ProgressBarContainer>
                      <p>잠시만 기다려 주세요 ...</p>
                    </ProgressWrap>
                  ) : isAddingNow.section === "mainCharacteristic" &&
                    isAddingNow.isAdding &&
                    isEditingNow ? (
                    <AddInfo>
                      <InputField
                        value={newAddContent}
                        onChange={(e) => {
                          setNewAddContent(e.target.value);
                        }}
                        placeholder="새로운 정보를 추가해보세요"
                      />
                      <BtnWrap>
                        <button
                          onClick={() => {
                            setIsAddingNow({ section: "", isAdding: false });
                            setNewAddContent("");
                          }}
                        >
                          <img src={images.IconClose2} alt="" />
                          취소
                        </button>
                        <button
                          onClick={() => handleAddSave("mainCharacteristic")}
                        >
                          <img src={images.IconCheck2} alt="" />
                          저장
                        </button>
                        <button
                          onClick={() =>
                            generateAddtionalContent("mainCharacteristic")
                          }
                        >
                          <img src={images.IconMagic2} alt="" />
                          생성
                        </button>
                      </BtnWrap>
                    </AddInfo>
                  ) : (
                    isEditingNow && (
                      <button
                        className="moreButton"
                        onClick={() =>
                          setIsAddingNow({
                            section: "mainCharacteristic",
                            isAdding: true,
                          })
                        }
                      >
                        기능 추가하기 +
                      </button>
                    )
                  )}
                </BoxWrap>
              </div>
              {
                // selectedExpertIndex !== "4" && <BoxWrap>
                //   <strong>
                //     <img src={images.IconTarget} alt="" />
                //     목표 고객
                //   </strong>
                //   <ul>
                //     {businessInformationTargetCustomer?.map((content, index) => (
                //       <li key={index}>
                //         {editingIndex.section === "targetCustomer" &&
                //         editingIndex.index === index ? (
                //           <InputField
                //             type="text"
                //             value={newEditContent}
                //             onChange={(e) => setNewEditContent(e.target.value)}
                //           />
                //         ) : (
                //           <p>{content}</p>
                //         )}
                //         {editingIndex.section === "targetCustomer" &&
                //         editingIndex.index === index ? (
                //           <>
                //             <BtnWrap>
                //               <button onClick={handleEditCancel}>
                //                 <img src={images.IconClose2} alt="" />
                //                 취소
                //               </button>
                //               <button onClick={handleApplyChange}>
                //                 <img src={images.IconCheck2} alt="" />
                //                 적용
                //               </button>
                //             </BtnWrap>
                //           </>
                //         ) : (
                //           <>
                //             {isEditingNow && (
                //               <>
                //                 <BtnWrap>
                //                   <button
                //                     onClick={() =>
                //                       handleEditStart("targetCustomer", index)
                //                     }
                //                   >
                //                     <img src={images.IconEdit2} alt="" />
                //                     수정
                //                   </button>
                //                   <button
                //                     onClick={() =>
                //                       confirmDelete("targetCustomer", index)
                //                     }
                //                   >
                //                     <img src={images.IconDelete2} alt="" />
                //                     삭제
                //                   </button>
                //                 </BtnWrap>
                //               </>
                //             )}
                //           </>
                //         )}
                //       </li>
                //     ))}
                //   </ul>
                //   {isLoadingAdd3 ? (
                //     <>
                //       <SkeletonLine className="content-placeholder" />
                //     </>
                //   ) : (
                //     isAddingNow.section === "targetCustomer" &&
                //     isAddingNow.isAdding &&
                //     isEditingNow ? (
                //       <AddInfo>
                //         <InputField
                //           value={newAddContent}
                //           onChange={(e) => {
                //             setNewAddContent(e.target.value);
                //           }}
                //           placeholder="새로운 정보를 추가해보세요"
                //         />
                //         <BtnWrap>
                //           <button
                //             onClick={() => {
                //               setIsAddingNow({ section: "", isAdding: false });
                //               setNewAddContent("");
                //             }}
                //           >
                //             <img src={images.IconClose2} alt="" />
                //             취소
                //           </button>
                //           <button onClick={() => handleAddSave("targetCustomer")}>
                //             <img src={images.IconCheck2} alt="" />
                //             저장
                //           </button>
                //           {/* <button onClick={() => generateAddtionalContent("targetCustomer")}>
                //             <img src={images.IconSetting} alt="" />
                //             생성
                //           </button> */}
                //         </BtnWrap>
                //       </AddInfo>
                //     ) : (
                //       isEditingNow && (
                //         <button
                //           className="moreButton"
                //           onClick={() =>
                //             setIsAddingNow({
                //               section: "targetCustomer",
                //               isAdding: true,
                //             })
                //           }
                //         >
                //           목표 고객 추가하기 +
                //         </button>
                //       )
                //     )
                //   )}
                // </BoxWrap>
              }
              {warningMessage && (
                <WarningMessage>{warningMessage}</WarningMessage>
              )}{" "}
              {/* 경고 메시지 출력 */}
              {!isLoadingAnalysis && (
                <MoleculeReportController
                  reportIndex={0}
                  strategyReportID={selectedExpertIndex}
                />
              )}
            </AnalysisSection>
          )}
        </>

        {isPopupOpenDelete && (
          <Popup
            Cancel
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                togglePopupDelete();
              }
            }}
          >
            <div>
              <button
                type="button"
                className="closePopup"
                onClick={togglePopupDelete}
              >
                닫기
              </button>
              <span>
                <img src={images.ExclamationMark} alt="" />
              </span>
              <p>
                <strong>정말 삭제하시겠습니까?</strong>
                <span>삭제된 내용은 복구 할 수 없습니다.</span>
              </p>
              <div className="btnWrap">
                <button type="button" onClick={togglePopupDelete}>
                  취소
                </button>
                <button type="button" onClick={handleDelete}>
                  확인
                </button>
              </div>
            </div>
          </Popup>
        )}

        {isPopupEmpty && (
          <Popup
            Cancel
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closePopupEmpty(); // 상태를 false로 설정
              }
            }}
          >
            <div>
              <button
                type="button"
                className="closePopup"
                onClick={closePopupEmpty}
              >
                닫기
              </button>
              <span>
                <img src={images.ExclamationMark2} alt="" />
              </span>
              <p>내용을 입력해주세요.</p>
              <div className="btnWrap">
                <button type="button" onClick={closePopupEmpty}>
                  확인
                </button>
              </div>
            </div>
          </Popup>
        )}
      </ThemeProvider>
    </>
  );
};

export default OrganismBizAnalysisSection;

const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

// const AnalysisSection = styled.div`
//   position: relative;
//   max-width: 1135px;
//   // width: 91.5%;
//   text-align: left;
//   margin-top: 25px;
//   margin-left: 50px;
//   padding: 28px;
//   border-radius: 15px;
//   border: 1px solid ${palette.outlineGray};

//   h1 {
//     font-size: 1.25rem;
//     font-weight: 400;
//     margin-bottom: 20px;
//   }

//   > p {
//     font-size: 0.875rem;
//     line-height: 1.5;
//     margin-top: 30px;

//     span {
//       color: ${palette.red};
//     }
//   }
// `;

const AnalysisSection = styled.div`
  position: relative;
  max-width: 986px;
  // width:100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
  margin-top: 25px;
  margin-left: 50px;
  padding: 28px;
  border-radius: 15px;
  background: ${palette.chatGray};

  h1 {
    font-size: 1.25rem;
    font-weight: 300;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left: 0;
  }
`;

const BoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  strong {
    font-weight: 600;
    line-height: 1.2;
  }

  ul {
    position: relative;
    font-weight: 300;
    line-height: 1.6;
    color: ${palette.gray800};
    padding-left: 20px;

    &:before {
      position: absolute;
      left: 0;
      top: 0;
      width: 2px;
      height: 100%;
      background: ${palette.gray200};
      content: "";
    }

    li {
      display: flex;
      gap: 10px;
    }

    &.disc li {
      position: relative;
      padding-left: 13px;

      &:before {
        position: absolute;
        left: 0;
        top: 11px;
        width: 3px;
        height: 3px;
        border-radius: 100%;
        background: ${palette.gray800};
        content: "";
      }
    }
  }

  button {
    flex-shrink: 0;
    font-family: "Pretendard";
    font-size: 0;
    color: ${palette.gray};
    padding: 5px 8px;
    border-radius: 5px;
    border: 0;
    background: ${palette.white};

    img {
      width: 14px;
      height: 14px;
    }

    &.add {
      color: ${palette.white};
      border: 1px solid ${palette.black};
      background: ${palette.black};
    }
  }

  .moreButton {
    width: 100%;
    font-size: 0.75rem;
    margin-top: 4px;
    padding: 8px;
    border: 0;
  }
`;

// const BoxWrap = styled.div`
//   padding: 20px;
//   border-radius: 10px;
//   background: ${palette.chatGray};

//   + div {
//     margin-top: 12px;
//   }

//   strong {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     margin-bottom: 10px;
//   }

//   li {
//     position: relative;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     gap: 5px;
//     padding-left: 10px;

//     &:before {
//       position: absolute;
//       left: 0;
//       top: 10px;
//       // top:50%;
//       // transform:translateY(-50%);
//       width: 5px;
//       height: 1px;
//       background: ${palette.darkGray};
//       content: "";
//     }

//     + li {
//       margin-top: 5px;
//     }

//     input[type="text"] {
//       height: 30px;
//       font-size: 0.875rem;
//       padding: 4px 12px;
//       border: 0;
//     }
//   }

//   p {
//     font-size: 0.875rem;
//     color: ${palette.darkGray};
//     line-height: 1.5;
//   }

//   button {
//     flex-shrink: 0;
//     font-family: "Pretendard";
//     font-size: 0;
//     color: ${palette.gray};
//     padding: 5px 8px;
//     border-radius: 5px;
//     border: 0;
//     background: ${palette.white};

//     img {
//       width: 14px;
//       height: 14px;
//     }

//     &.add {
//       color: ${palette.white};
//       border: 1px solid ${palette.black};
//       background: ${palette.black};
//     }
//   }

//   .moreButton {
//     width: 100%;
//     font-size: 0.75rem;
//     margin-top: 4px;
//     padding: 8px;
//     border: 0;
//   }
// `;

const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 5px;
  border-radius: 5px;
  // background:${palette.white};

  input[type="text"] {
    height: 30px;
    font-size: 0.875rem;
    padding: 4px 12px;
    border: 0;
  }
`;

const AddInfo = styled.div`
  display: flex;
  align-items: stretch;
  gap: 10px;
  margin-top: 20px;

  input {
    font-size: 0.875rem;
    height: 40px;
    padding: 4px 10px;
    border: 1px solid ${palette.lineGray}; /* 테두리 색상 */
    background-color: ${palette.white}; /* 배경색 */
  }
`;

const WarningMessage = styled.div`
  color: ${palette.red};
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
`;

const Spacing = styled.div`
  margin-bottom: 40px; /* 제목과 본문 사이의 간격 */
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

const fillAnimation = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: ${palette.gray100};
  border-radius: 5px;
  overflow: hidden;
  margin-top: 20px;
  position: relative;
`;

const Progress = styled.div`
  width: ${({ progress }) => progress}%;
  height: 8px;
  background-color: ${palette.gray500};
  animation: ${fillAnimation} 5s ease-in-out forwards;
  border-radius: 5px;
`;

const ProgressWrap = styled.div`
  position: relative;
  text-align: center;
  p {
    font-family: "Pretendard";
    font-size: 0.75rem;
    margin-top: 8px;
    color: ${palette.gray500};
  }
`;
