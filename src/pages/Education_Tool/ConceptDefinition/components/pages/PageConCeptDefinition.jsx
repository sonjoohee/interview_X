import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../../assets/styles/Palette";
import AtomPersonaLoader from "../../../../Global/atoms/AtomPersonaLoader";
import OrganismIncNavigation from "../../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../../Global/molecules/MoleculeHeader";
import { Button } from "../../../../../assets/styles/ButtonStyle";
import Markdown from "markdown-to-jsx";
import PopupWrap from "../../../../../assets/styles/Popup";
import {
  SelectBox,
  SelectBoxItem,
  SelectBoxTitle,
  SelectBoxList,
} from "../../../../../assets/styles/InputStyle";
import {
  ContentsWrap,
  MainContent,
  TabWrapType5,
  TabButtonType5,
  TabContent5,
  CardGroupWrap,
  BgBoxItem,
  DropzoneStyles,
  ListBoxGroup,
  PersonaGroup,
  BoxWrap,
  TabContent5Item,
  Persona,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import personaImages from "../../../../../assets/styles/PersonaImages";
import {
  IS_LOGGED_IN,
  TOOL_ID,
  TOOL_STEP,
  TOOL_LOADING,
  PSST_FILE_ID,
  PROJECT_SAAS,
  PSST_BUSINESS_INFO,
  PROJECT_ANALYSIS_MULTIMODAL,
  PSST_ANALYSIS_RESULTS,
  PSST_FILE_NAMES,
  PSST_REPORT,
  PSST_SELECTED_TEMPLETE,
  PROJECT_ANALYSIS_MULTIMODAL_DESCRIPTION,
  PROJECT_ANALYSIS_MULTIMODAL_KEYMESSAGE,
  PERSONA_LIST_SAAS,
  CONCEPT_DEFINITION_FIRST_REPORT,
  CONCEPT_DEFINITION_FINAL_REPORT,
  CONCEPT_DEFINITION_SELECTED_PERSONA,
  CONCEPT_DEFINITION_SELECTED_PURPOSE,
  EVENT_STATE,
  TRIAL_STATE,
  EVENT_TITLE,
  CREDIT_CREATE_TOOL,
  USER_CREDITS,
  CREDIT_CREATE_TOOL_LOADED,
  EDUCATION_STATE,
  EDUCATION_TOOL_COMPLETED_STATUS,
} from "../../../../AtomStates";
import images from "../../../../../assets/styles/Images";
import {
  H3,
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
import MoleculeDesignItem from "../molecules/MoleculeDesignItem";
import MoleculeFileUpload from "../molecules/MoleculeFileUpload";
import MoleculePersonaSelectCard from "../../../public/MoleculePersonaSelectCard";

import { useDynamicViewport } from "../../../../../assets/DynamicViewport";

const prepareMarkdown = (text) => {
  if (!text) return "";
  // 연속된 줄바꿈('\n\n')을 <br/><br/>로 변환
  return text.replace(/\n\n/g, "\n&nbsp;\n").replace(/\n/g, "  \n");
};

const PageConceptDefinition = () => {
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
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [educationState] = useAtom(EDUCATION_STATE);
  const [personaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [conceptDefinitionFinalReport, setConceptDefinitionFinalReport] =
    useAtom(CONCEPT_DEFINITION_FINAL_REPORT);
  const [
    conceptDefinitionSelectedPersona,
    setConceptDefinitionSelectedPersona,
  ] = useAtom(CONCEPT_DEFINITION_SELECTED_PERSONA);

  const [conceptDefinitionFirstReport, setConceptDefinitionFirstReport] =
    useAtom(CONCEPT_DEFINITION_FIRST_REPORT);
  const [
    conceptDefinitionSelectedPurpose,
    setConceptDefinitionSelectedPurpose,
  ] = useAtom(CONCEPT_DEFINITION_SELECTED_PURPOSE);

  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [showPopupFileSize, setShowPopupFileSize] = useState(false);
  const [toolSteps, setToolSteps] = useState(0);
  const [selectedPersonas, setSelectedPersonas] = useState(null);
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [selectedPurposes, setSelectedPurposes] = useState({
    customerList: "",
  });
  const [kanoModelList, setKanoModelList] = useState([]);

  const [selectBoxStates, setSelectBoxStates] = useState({
    customerList: false,
  });
  const [showCreatePersonaPopup, setShowCreatePersonaPopup] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [selectedKanoModelData, setSelectedKanoModelData] = useState([]);
  // 초기 상태를 빈 배열로 설정

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  const project = projectSaas;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      if (toolLoading) {
        // 활성 탭 설정 (기본값 1)
        // setActiveTab(Math.min((toolStep ?? 1) +1 , 3));
        // setToolSteps(toolStep);
        // const completedStepsArray = [];
        // for (let i = 1; i <= toolStep; i++) {
        //   completedStepsArray.push(i);
        // }
        // setCompletedSteps(completedStepsArray);
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

        // 비즈니스 정보 설정 (Step 1)
        if (Object.keys(conceptDefinitionSelectedPurpose).length > 0) {
          setSelectedPurposes(conceptDefinitionSelectedPurpose ?? {});
        }

        if (
          conceptDefinitionSelectedPersona &&
          conceptDefinitionSelectedPersona.length > 0
        ) {
          setSelectedPersonas(conceptDefinitionSelectedPersona ?? []);
        }

        if (
          conceptDefinitionFirstReport &&
          conceptDefinitionFirstReport.length > 0
        ) {
          setConceptDefinitionFirstReport(conceptDefinitionFirstReport ?? "");
        }

        if (
          conceptDefinitionFinalReport &&
          conceptDefinitionFinalReport.length > 0
        ) {
          setConceptDefinitionFinalReport(conceptDefinitionFinalReport ?? "");
        }

        if (completedStatus) {
          setCompletedStatus(true);
        }

        return;
      }
    };
    interviewLoading();
    setToolLoading(false);
  }, [toolLoading]);

  // KanoModel 리스트 가져오기
  useEffect(() => {
    const getAllTargetDiscovery = async () => {
      try {
        let page = 1;
        const size = 10;
        let allItems = [];

        const response = await getFindToolListOnServerSaas(
          projectSaas?._id ?? "",
          "ix_kano_model_education",
          isLoggedIn
        );

        const newItems = (response || []).filter(
          (item) =>
            item?.type === "ix_kano_model_education" &&
            item?.completedStep === 4
        );

        allItems = [...allItems, ...newItems];

        setKanoModelList(allItems);
      } catch (error) {
        setKanoModelList([]); // Set empty array on error
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

  const business = {
    businessModel: project.businessModel,
    projectAnalysis: project.projectAnalysis,
    projectDescription: project.projectDescription,
    projectTitle: project.projectTitle,
    targetCountry: project.targetCountry,
  };

  // 페르소나 & 핵심가치 확인 버튼 클릭 시 함수
  const handleCheckValueButtonClick = async () => {
    setIsSelectBoxOpen(false);
    setIsLoading(true);
    await handleCheckValue();
  };

  const handleSubmitPersona = async () => {
    handleNextStep(1);
    setToolSteps(1);

    // const responseToolId = await createToolOnServer(
    //   {
    //     projectId: project._id,
    //     type: "ix_concept_definition_education",
    //     selectedPersonas: selectedPersonas,
    //     completedStep: 1,
    //   },
    //   isLoggedIn
    // );

    // setToolId(responseToolId);
  };

  // 컨셉 정의서 만들기 버튼 클릭 시
  const handleSubmitConceptClick = async () => {
    setIsSelectBoxOpen(false);
    setIsLoading(true);
    await handleReportRequest();
  };

  const handleCheckValue = async () => {
    // 새 AbortController 생성
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setIsLoading(true);

    const personaGroup = selectedPersonas.map((persona) => ({
      personaName: persona.personaName,
      personaCharacteristics: persona.personaCharacteristics,
      type: persona.type,
      age: persona.age,
      gender: persona.gender,
      job: persona.job,
      keywords: persona.keywords,
    }));

    try {
      const data = {
        type: "ix_concept_definition_report_education",
        business: business,
        persona_group: personaGroup,
        kano_model: selectedKanoModelData.kanoModelReportData,
      };

      let response = await EducationToolsRequest(data, isLoggedIn, signal);

      const maxAttempts = 10;
      let attempts = 0;

      while (attempts < maxAttempts && (!response || !response?.response)) {
        response = await EducationToolsRequest(data, isLoggedIn, signal);
        attempts++;
      }
      if (attempts >= maxAttempts) {
        setShowPopupError(true);
        return;
      }

      setConceptDefinitionFirstReport(
        response.response.concept_definition_report_education
      );

      const responseToolId = await createToolOnServer(
        {
          projectId: project._id,
          type: "ix_concept_definition_education",
          selectedPersonas: selectedPersonas,
          completedStep: 1,
        },
        isLoggedIn
      );

      setToolId(responseToolId);

      await updateToolOnServer(
        responseToolId,
        {
          completedStep: 2,
          selectedKanoModel: selectedPurposes,
          conceptDefinitionFirstReport:
            response.response.concept_definition_report_education,
        },
        isLoggedIn
      );
      // 크레딧이 사용 가능한 상태면 사용 API 호출
      const creditUsePayload = {
        title: project.projectTitle,
        service_type: "고객 여정 지도",
        target: "",
        state: "use",
        mount: creditCreateTool,
      };

      await UserCreditUse(creditUsePayload, isLoggedIn);

      // 크레딧 사용 후 사용자 정보 새로고침

      const userCreditValue = await UserCreditInfo(isLoggedIn);
      // 전역 상태의 크레딧 정보 업데이트
      setUserCredits(userCreditValue);

      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setShowPopupError(true);
      setIsLoading(false);
    }
  };

  const handleReportRequest = async () => {
    // 새 AbortController 생성
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

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
          type: "ix_concept_definition_final_report_education",
          concept_definition_report_education: conceptDefinitionFirstReport,
        };

        let response = await EducationToolsRequest(
          apiRequestData,
          isLoggedIn,
          signal
        );
        // console.log("response", response);

        const maxAttempts = 10;
        let attempts = 0;

        while (
          attempts < maxAttempts &&
          (!response ||
            !response?.response ||
            !response?.response?.concept_definition_final_report_education ||
            !response?.response?.concept_definition_final_report_education
              .length > 0 ||
            typeof response?.response
              ?.concept_definition_final_report_education !== "string" ||
            !response?.response
              ?.concept_definition_final_report_education_persona_title)
        ) {
          response = await EducationToolsRequest(
            apiRequestData,
            isLoggedIn,
            signal
          );
          attempts++;
        }
        if (attempts >= maxAttempts) {
          setShowPopupError(true);
          return;
        }
        setConceptDefinitionFinalReport(
          response.response.concept_definition_final_report_education
        );

        await updateToolOnServer(
          toolId,
          {
            completedStep: 3,
            conceptDefinitionFinalReport:
              response.response.concept_definition_final_report_education,
            completedStatus: true,
            personaTitle:
              response.response
                .concept_definition_final_report_education_persona_title,
          },
          isLoggedIn
        );
        setCompletedStatus(true);
        setCompletedSteps((prev) => [...prev, 3]);
        setIsLoadingReport(false);
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

  const handlePurposeSelect = (purpose, selectBoxId, item) => {
    setSelectedPurposes((prev) => ({
      ...prev,
      [selectBoxId]: purpose,
    }));

    setSelectBoxStates((prev) => ({
      ...prev,
      [selectBoxId]: false,
    }));

    setSelectedKanoModelData(item);
  };

  const abortControllerRef = useRef(null);

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("conceptdefinition")) {
        // 세션 스토리지에서 마지막 URL 가져오기
        const lastUrl = sessionStorage.getItem("lastUrl");
        // 마지막 URL이 현재 URL과 같으면 새로고침
        if (lastUrl && lastUrl === currentUrl) {
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
      event.preventDefault();

      event.returnValue = "";

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

    detectRefresh();

    window.addEventListener("keydown", handleKeyDown);

    return () => {
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
                    페르소나 선택
                  </Body1>
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
                    핵심가치 도출
                  </Body1>
                  {/* <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    Analyze Key Points​
                  </Body1> */}
                </div>
              </TabButtonType5>
              <TabButtonType5
                Num3
                isActive={activeTab >= 3}
                // onClick={() =>
                //   completedSteps.includes(2) ||
                //   (completedSteps.includes(3) && setActiveTab(3))
                // }
                onClick={() => completedSteps.includes(2) && setActiveTab(3)}
                disabled={
                  !completedSteps.includes(3) || isLoading || isLoadingReport
                }
              >
                <span>03</span>
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    컨셉 정의서
                  </Body1>
                </div>
              </TabButtonType5>
            </TabWrapType5>

            {activeTab === 1 && (
              <TabContent5>
                <>
                  <div className="title">
                    <H3 color="gray800">Persona Selection</H3>
                    <Body3 color="gray800">
                      컨셉정의서를 작성할 타겟 페르소나를 선택하세요
                    </Body3>
                  </div>

                  <div className="content">
                    <div>
                      <ListBoxGroup>
                        <li>
                          <Body2 color="gray500">페르소나 선택</Body2>
                          <div
                            style={{
                              paddingLeft: "8px",
                            }}
                          ></div>
                          {selectedPersonas ? (
                            <PersonaGroup>
                              {Array.isArray(selectedPersonas) ? (
                                <>
                                  {selectedPersonas.length > 3 && (
                                    <span>+{selectedPersonas.length - 3}</span>
                                  )}
                                  {selectedPersonas
                                    .slice(0, 3)
                                    .map((persona, index) => (
                                      <Persona key={index} size="Small" Round>
                                        <img
                                          src={
                                            personaImages[persona.imageKey] ||
                                            (persona.gender === "남성"
                                              ? personaImages.persona_m_20_01 // 남성 기본 이미지
                                              : personaImages.persona_f_20_01) // 여성 기본 이미지
                                          }
                                          alt={persona.persona}
                                        />
                                      </Persona>
                                    ))}
                                </>
                              ) : (
                                <Persona size="Small" Round>
                                  <img
                                    src={
                                      personaImages[
                                        selectedPersonas.imageKey
                                      ] ||
                                      (selectedPersonas.gender === "남성"
                                        ? personaImages.persona_m_20_01 // 남성 기본 이미지
                                        : personaImages.persona_f_20_01) // 여성 기본 이미지
                                    }
                                    alt={selectedPersonas.persona}
                                  />
                                </Persona>
                              )}
                            </PersonaGroup>
                          ) : (
                            <Body2 color="gray300">
                              아래 리스트에서 페르소나를 선택해주세요 (최대 3명
                              선택가능)
                            </Body2>
                          )}
                        </li>
                      </ListBoxGroup>
                    </div>

                    <div className="title">
                      <Body1
                        color="gray800"
                        style={{ textAlign: "left", marginBottom: "-20px" }}
                      >
                        Favorite 페르소나 리스트
                      </Body1>
                    </div>

                    {personaListSaas.filter((item) => item.favorite === true)
                      .length >= 20 ? (
                      <MoleculePersonaSelectCard
                        filteredPersonaList={personaListSaas}
                        selectedPersonas={selectedPersonas}
                        onPersonaSelect={(persona) => {
                          setSelectedPersonas(persona);
                        }}
                        interviewType="multiple"
                        disabled={toolSteps >= 1}
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
                          페르소나 리스트를 확인하려면, 먼저 관심 있는 페르소나
                          20명을 즐겨찾기에 추가해 주세요. (
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

                  <Button
                    Other
                    Primary
                    Fill
                    Round
                    onClick={handleSubmitPersona}
                    disabled={
                      toolSteps >= 1 ||
                      !selectedPersonas ||
                      (Array.isArray(selectedPersonas) &&
                        selectedPersonas.length === 0)
                    }
                  >
                    다음
                  </Button>
                </>
              </TabContent5>
            )}

            {activeTab === 2 && completedSteps.includes(1) && (
              <TabContent5>
                <>
                  <div className="title">
                    <H3 color="gray800">Core Value Analysis</H3>
                    <Body3 color="gray800">
                      Kano Model 결과를 기반으로 비즈니스의 주요 가치를
                      도출합니다
                    </Body3>
                  </div>

                  <div className="content">
                    <BoxWrap Column NoneV style={{ marginBottom: "24px" }}>
                      <div className="selectBoxWrap">
                        <Body2 color="gray500" style={{ width: "110px" }}>
                          페르소나 선택
                        </Body2>
                        <div
                          style={{
                            paddingLeft: "8px",
                          }}
                        ></div>
                        {selectedPersonas ? (
                          <PersonaGroup>
                            {Array.isArray(selectedPersonas) ? (
                              <>
                                {selectedPersonas.length > 3 && (
                                  <span>+{selectedPersonas.length - 3}</span>
                                )}
                                {selectedPersonas
                                  .slice(0, 3)
                                  .map((persona, index) => (
                                    <Persona key={index} size="Small" Round>
                                      <img
                                        src={
                                          personaImages[persona.imageKey] ||
                                          (persona.gender === "남성"
                                            ? personaImages.persona_m_20_01 // 남성 기본 이미지
                                            : personaImages.persona_f_20_01) // 여성 기본 이미지
                                        }
                                        alt={persona.persona}
                                      />
                                    </Persona>
                                  ))}
                              </>
                            ) : (
                              <Persona size="Small" Round>
                                <img
                                  src={
                                    personaImages[selectedPersonas.imageKey] ||
                                    (selectedPersonas.gender === "남성"
                                      ? personaImages.persona_m_20_01 // 남성 기본 이미지
                                      : personaImages.persona_f_20_01) // 여성 기본 이미지
                                  }
                                  alt={selectedPersonas.persona}
                                />
                              </Persona>
                            )}
                          </PersonaGroup>
                        ) : (
                          <Body2 color="gray300"></Body2>
                        )}
                      </div>
                      <div className="selectBoxWrap">
                        <Body2
                          color="gray500"
                          style={{ width: "110px", marginTop: "12px" }}
                        >
                          핵심 가치 선택
                        </Body2>
                        <SelectBox
                          style={{
                            paddingRight: "20px",
                            marginTop: "12px",
                            cursor:
                              toolSteps >= 2 ||
                              conceptDefinitionFirstReport ||
                              isLoading ||
                              conceptDefinitionFirstReport.length > 0
                                ? "default"
                                : "pointer",
                          }}
                        >
                          <SelectBoxTitle
                            onClick={() => {
                              if (
                                toolSteps >= 2 ||
                                conceptDefinitionFirstReport ||
                                isLoading ||
                                conceptDefinitionFirstReport.length > 0
                              ) {
                                return;
                              }
                              setIsSelectBoxOpen(!isSelectBoxOpen);
                            }}
                            None
                            style={{
                              cursor:
                                toolSteps >= 2 ||
                                conceptDefinitionFirstReport ||
                                isLoading ||
                                conceptDefinitionFirstReport.length > 0
                                  ? "default"
                                  : "pointer",
                            }}
                          >
                            {selectedPurposes?.customerList ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  paddingLeft: "20px",
                                }}
                              >
                                {/* <Body1 color="gray700" align="left">
                                    {
                                      selectedPurposes?.analysisScope?.split(
                                        "|"
                                      )[0]
                                    }{" "}
                                    |
                                  </Body1> */}
                                <Body2
                                  color={
                                    selectedPurposes.customerList
                                      ? "gray800"
                                      : "gray300"
                                  }
                                >
                                  {selectedPurposes.customerList ||
                                    "직접 문제점을 작성합니다."}
                                </Body2>
                                {/* <Body2 color="gray700" align="left">
                                    {
                                      selectedPurposes?.analysisScope?.split(
                                        "|"
                                      )[1]
                                    }
                                  </Body2> */}
                              </div>
                            ) : (
                              <Body2
                                color="gray300"
                                style={{ paddingLeft: "20px" }}
                              >
                                Kano Model 결과 중 하나를 선택하세요.
                              </Body2>
                            )}
                            {toolSteps >= 2 ||
                            conceptDefinitionFirstReport ||
                            isLoading ||
                            conceptDefinitionFirstReport.length > 0 ? null : (
                              <images.ChevronDown
                                width="24px"
                                height="24px"
                                color={
                                  toolSteps >= 1
                                    ? palette.gray300
                                    : palette.gray500
                                }
                                style={{
                                  transform: isSelectBoxOpen
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                  transition: "transform 0.3s ease",
                                }}
                              />
                            )}
                          </SelectBoxTitle>

                          {isSelectBoxOpen && (
                            <SelectBoxList>
                              {kanoModelList?.map((item, index) => (
                                <SelectBoxItem
                                  key={index}
                                  onClick={() => {
                                    // 조건 체크: 비활성화 상태면 클릭 무시
                                    if (
                                      toolSteps >= 2 ||
                                      conceptDefinitionFirstReport ||
                                      isLoading ||
                                      conceptDefinitionFirstReport.length > 0
                                    ) {
                                      return;
                                    }

                                    handlePurposeSelect(
                                      ` Kano Model 결과(${
                                        item.updateDate.split(":")[0]
                                      }:${item.updateDate.split(":")[1]})`,
                                      "customerList",
                                      item
                                    );

                                    setIsSelectBoxOpen(false);
                                  }}
                                  style={{
                                    cursor:
                                      toolSteps >= 2 ||
                                      conceptDefinitionFirstReport ||
                                      isLoading ||
                                      conceptDefinitionFirstReport.length > 0
                                        ? "not-allowed"
                                        : "pointer",
                                  }}
                                >
                                  {/* <Body1 color="gray700" align="left">
                                    상황 중심 여정 분석 |{" "}
                                  </Body1> */}
                                  <Body2 color="gray700" align="left">
                                    Kano Model 결과(
                                    {item.updateDate.split(":")[0]}:
                                    {item.updateDate.split(":")[1]})
                                  </Body2>
                                </SelectBoxItem>
                              ))}
                            </SelectBoxList>
                          )}
                        </SelectBox>
                      </div>
                    </BoxWrap>

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
                          message={`페르소나와 핵심 가치를 분석 중이에요`}
                        />
                      </div>
                    ) : (
                      <InsightAnalysis>
                        <div
                          className="markdown-body"
                          style={{
                            textAlign: "left",
                          }}
                        >
                          <Markdown>
                            {conceptDefinitionFirstReport ?? ""}
                          </Markdown>
                        </div>
                      </InsightAnalysis>
                    )}
                  </div>
                  {conceptDefinitionFirstReport &&
                  !isLoading &&
                  conceptDefinitionFirstReport.length > 0 ? (
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
                        onClick={handleSubmitConceptClick}
                        disabled={toolSteps > 2}
                      >
                        컨셉 정의서 만들기
                      </Button>
                    </div>
                  ) : (
                    !isLoading && (
                      <Button
                        Other
                        Primary
                        Fill
                        Round
                        onClick={handleCheckValueButtonClick}
                        disabled={
                          toolSteps > 2 ||
                          !selectedPurposes.customerList ||
                          isLoading
                        }
                      >
                        페르소나 & 핵심가치 확인
                      </Button>
                    )
                  )}
                </>
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
                        message={`컨셉 정의서 최종본을 작성하고 있어요`}
                      />
                    </div>
                  ) : (
                    <>
                      <BgBoxItem primaryLightest>
                        <H3 color="gray800">컨셉 정의서</H3>
                        <Body3 color="gray800">
                          사업 아이템의 실행 전략을 정리한 초안입니다. 이를
                          기반으로 세부 내용을 구체화해보세요.​
                        </Body3>
                        <style>
                          {`
                            .markdown-body {
                              margin-top: 20px;
                            }
                          `}
                        </style>
                      </BgBoxItem>

                      <InsightAnalysis>
                        <div
                          className="markdown-body"
                          style={{
                            textAlign: "left",
                          }}
                        >
                          <Markdown>
                            {conceptDefinitionFinalReport ?? ""}
                          </Markdown>
                        </div>
                      </InsightAnalysis>
                      {completedStatus && (
                        <Button
                          Primary
                          Edit
                          Large
                          style={{
                            color: palette.gray700,
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
            title="컨셉 정의서"
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
            title="컨셉 정의서"
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
            title="컨셉 정의서"
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

export default PageConceptDefinition;

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

  p {
    text-align: left;
  }

  /* GitHub Markdown 스타일 적용 */
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    color: ${palette.gray800};
    font-family: "Pretendard", "Poppins";
    line-height: 1.65;

    /* 헤딩 요소 간의 간격 조절 */
    h1 {
      margin-top: 40px; /* 대제목 위 여백 */
      margin-bottom: 24px; /* 대제목 아래 여백 */
    }

    h2 {
      margin-top: -20px; /* 중제목 위 여백 */
      margin-bottom: 16px; /* 중제목 아래 여백 */
    }

    h3 {
      margin-top: 24px; /* 소제목 위 여백 */
      margin-bottom: 12px; /* 소제목 아래 여백 */
    }

    /* 연속된 헤딩 요소 사이의 간격 조절 */
    h1 + h2,
    h2 + h3 {
      margin-top: 16px; /* 대제목 바로 다음에 오는 중제목의 상단 여백 */
    }

    /* 본문과 다음 제목 사이의 간격 */
    p + h1,
    p + h2,
    p + h3 {
      margin-top: 20px; /* 본문 다음에 오는 제목의 상단 여백 */
    }

    @media (max-width: 767px) {
      padding: 15px;
    }
  }
`;
