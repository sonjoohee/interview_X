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
import PopupWrap from "../../../../../assets/styles/Popup";
import {
  ContentsWrap,
  MainContent,
  TabWrapType5,
  TabButtonType5,
  TabContent5,
  TabContent5Item,
  CardGroupWrap,
  DropzoneStyles,
  Title,
  BoxWrap,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import {
  IS_LOGGED_IN,
  TOOL_ID,
  TOOL_STEP,
  TOOL_LOADING,
  PROJECT_SAAS,
  IDEA_GENERATION_START_POSITION,
  IDEA_GENERATION_PROBLEM_LIST,
  PERSONA_LIST_SAAS,
  IDEA_GENERATION_MANDALART_DATA,
  IDEA_GENERATION_PROBLEM_LIST_TITLE,
  IDEA_GENERATION_SELECTED_START_POSITION,
  IDEA_GENERATION_SELECTED_MANDALART,
  IDEA_GENERATION_POSSSESSION_TECH,
  IDEA_GENERATION_SELECTED_PURPOSE,
  EVENT_STATE,
  TRIAL_STATE,
  EVENT_TITLE,
  CREDIT_CREATE_TOOL_HIGH,
  EDUCATION_STATE,
  USER_CREDITS,
  CREDIT_CREATE_TOOL_LOADED,
  IDEA_GENERATION_ADDITIONAL_DATA,
  EDUCATION_TOOL_COMPLETED_STATUS,
} from "../../../../AtomStates";
import {
  SelectBox,
  SelectBoxItem,
  SelectBoxTitle,
  SelectBoxList,
} from "../../../../../assets/styles/InputStyle";
import images from "../../../../../assets/styles/Images";
import {
  H3,
  Body1,
  Body2,
  Body3,
} from "../../../../../assets/styles/Typography";
import {
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
import MoleculeTagList from "../molecules/MoleculeTagList";
import MoleculePersonaSelectCard from "../../../public/MoleculePersonaSelectCard";
import MoleculeMandalArtGraph from "../molecules/MoleculeMandalArtGraph";
import OrganismToastPopupQuickSurveyComplete from "../molecules/OrganismToastPopupQuickSurveyComplete";
const PageIdeaGeneration = () => {
  const navigate = useNavigate();

  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [eventState] = useAtom(EVENT_STATE);
  const [trialState] = useAtom(TRIAL_STATE);
  const [eventTitle] = useAtom(EVENT_TITLE);
  const [creditCreateToolHigh] = useAtom(CREDIT_CREATE_TOOL_HIGH);
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [creditCreateToolLoaded, setCreditCreateToolLoaded] = useAtom(
    CREDIT_CREATE_TOOL_LOADED
  );
  const [completedStatus, setCompletedStatus] = useAtom(
    EDUCATION_TOOL_COMPLETED_STATUS
  );
  const [educationState] = useAtom(EDUCATION_STATE);
  const [toolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [personaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const [
    ideaGenerationSelectedStartPosition,
    setIdeaGenerationSelectedStartPosition,
  ] = useAtom(IDEA_GENERATION_SELECTED_START_POSITION);
  const [ideaGenerationStartPosition, setIdeaGenerationStartPosition] = useAtom(
    IDEA_GENERATION_START_POSITION
  );

  const [ideaGenerationPossessionTech, setIdeaGenerationPossessionTech] =
    useAtom(IDEA_GENERATION_POSSSESSION_TECH);
  const [ideaGenerationSelectedPurpose, setIdeaGenerationSelectedPurpose] =
    useAtom(IDEA_GENERATION_SELECTED_PURPOSE);
  const [ideaGenerationAdditionalData, setIdeaGenerationAdditionalData] =
    useAtom(IDEA_GENERATION_ADDITIONAL_DATA);
  const [ideaGenerationProblemList, setIdeaGenerationProblemList] = useAtom(
    IDEA_GENERATION_PROBLEM_LIST
  );
  const [ideaGenerationMandalArtData, setIdeaGenerationMandalArtData] = useAtom(
    IDEA_GENERATION_MANDALART_DATA
  );
  const [ideaGenerationProblemListTitle, setIdeaGenerationProblemListTitle] =
    useAtom(IDEA_GENERATION_PROBLEM_LIST_TITLE);
  const [ideaGenerationSelectedMandalart, setIdeaGenerationSelectedMandalart] =
    useAtom(IDEA_GENERATION_SELECTED_MANDALART);

  const [showPopupSave, setShowPopupSave] = useState(false);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [customerJourneyList, setCustomerJourneyList] = useState([]);
  const [showPopupError, setShowPopupError] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const customerListRef = useRef(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [businessDescriptionTitle, setBusinessDescriptionTitle] = useState("");
  const [showPopupFileSize, setShowPopupFileSize] = useState(false);
  const [toolSteps, setToolSteps] = useState(0);
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [selectedPurposes, setSelectedPurposes] = useState({
    customerList: "",
  });
  const [selectBoxStates, setSelectBoxStates] = useState({
    customerList: false,
  });
  const [dropUpStates, setDropUpStates] = useState({
    customerList: false,
  });
  const [, setContactForm] = useState({
    email: "",
    purpose: "",
    content: "",
  });
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedJourneyMapData, setSelectedJourneyMapData] = useState([]);
  const [
    customerJourneyMapSelectedPersona,
    setCustomerJourneyMapSelectedPersona,
  ] = useState([]);
  const [customerJourneyMapReport, setCustomerJourneyMapReport] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showCreatePersonaPopup, setShowCreatePersonaPopup] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  const project = projectSaas;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        (project?.projectAnalysis.business_analysis
          ? project?.projectAnalysis.business_analysis
          : "") +
        (project?.projectAnalysis.business_analysis &&
        project?.projectAnalysis.file_analysis
          ? "\n"
          : "") +
        (project?.projectAnalysis.file_analysis
          ? project?.projectAnalysis.file_analysis
          : "");
      const projectTitle = project?.projectTitle;

      if (project) {
        setBusinessDescriptionTitle(projectTitle);
        setBusinessDescription(projectAnalysis);
      }

      if (toolLoading) {
        // 활성 탭 설정 (기본값 1)
        setActiveTab(Math.min((toolStep ?? 1) + 1, 3));
        setToolSteps(toolStep ?? 1);

        if (Object.keys(ideaGenerationSelectedPurpose).length > 0) {
          setSelectedPurposes(ideaGenerationSelectedPurpose ?? {});
        }
        if (ideaGenerationProblemList) {
          setIdeaGenerationProblemList(ideaGenerationProblemList ?? []);
        }
        if (ideaGenerationProblemListTitle) {
          setIdeaGenerationProblemListTitle(
            ideaGenerationProblemListTitle ?? []
          );
        }
        if (ideaGenerationStartPosition) {
          setIdeaGenerationStartPosition(ideaGenerationStartPosition ?? []);
        }
        if (ideaGenerationSelectedStartPosition) {
          setIdeaGenerationSelectedStartPosition(
            ideaGenerationSelectedStartPosition ?? []
          );
        }
        if (ideaGenerationPossessionTech) {
          setProjectDescription(ideaGenerationPossessionTech ?? "");
        }
        if (ideaGenerationMandalArtData) {
          setIdeaGenerationMandalArtData(ideaGenerationMandalArtData ?? []);
        }
        if (ideaGenerationAdditionalData) {
          setIdeaGenerationAdditionalData(ideaGenerationAdditionalData ?? []);
        }
        if (completedStatus) {
          setCompletedStatus(true);
        }

        // 완료된 단계 설정
        const completedStepsArray = [];
        for (let i = 1; i <= (toolStep ?? 1); i++) {
          completedStepsArray.push(i);
        }
        setCompletedSteps(completedStepsArray);

        return;
      }
    };
    interviewLoading();
    setToolLoading(false);
  }, [toolLoading]);

  const business = {
    business: businessDescription,
    business_model: project?.businessModel || "",
    sector: project?.industryType || "",
    country: project?.targetCountry || "",
  };

  // 고객핵심가치분석 리스트 가져오기
  useEffect(() => {
    const getAllTargetDiscovery = async () => {
      try {
        let page = 1;
        const size = 10;
        let allItems = [];

        const response = await getFindToolListOnServerSaas(
          projectSaas?._id ?? "",
          "ix_needs_keywords_generation_education",
          isLoggedIn
        );

        const newItems = (response || []).filter(
          (item) =>
            item?.type === "ix_needs_keywords_generation_education" &&
            item?.completedStep === 2
        );

        allItems = [...allItems, ...newItems];

        setCustomerJourneyList(allItems);
      } catch (error) {
        setCustomerJourneyList([]); // Set empty array on error
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

  const handleSubmitIdea = async () => {
    handleNextStep(1);
    setToolSteps(1);

    const responseToolId = await createToolOnServer(
      {
        projectId: project._id,
        type: "ix_idea_generation_education",
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

    await updateToolOnServer(
      responseToolId,
      {
        completedStep: 1,
        ideaGenerationStartPosition: ideaGenerationStartPosition,
        ideaGenerationSelectedStartPosition:
          ideaGenerationSelectedStartPosition,
        selectedPurposes: selectedPurposes,
      },
      isLoggedIn
    );
  };

  const handlePurposeSelect = (purpose, selectBoxId, item) => {
    setSelectedPurposes((prev) => ({
      ...(prev || {}),
      [selectBoxId]: purpose || "",
    }));

    handleContactInputChange("purpose", purpose || "");
    setSelectBoxStates((prev) => ({
      ...(prev || {}),
      [selectBoxId]: false,
    }));

    setIdeaGenerationStartPosition(item.keywordsGenerationTag);
  };

  const handleMandalArt = async () => {
    handleNextStep(2);
    setToolSteps(2);
    setIsLoadingReport(true);
    const selectedStartPosition = ideaGenerationSelectedStartPosition.map(
      (item) => item.main_theme
    );

    // 새 AbortController 생성
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    const persona_group = personaListSaas
      .filter((persona) => persona?.favorite === true)
      .map((persona) => ({
        name: persona.personaName,
        personaCharacteristics: persona.personaCharacteristics,
        type: persona.type,
        age: persona.age,
        gender: persona.gender,
        job: persona.job,
        keywords: persona.keywords,
      }));

    const persona_group_interview = personaListSaas
      .filter((persona) => persona?.favorite === true)
      .map((persona) => ({
        name: persona.personaName,
        age: persona.age,
        gender: persona.gender,
        job: persona.job,
        keywords: persona.keywords,
        imageKey: persona.imageKey,
      }));

    try {
      const apiResults = [];
      const apiResultsAdditional = [];

      //8번의 API 호출을 순차적으로 실행
      for (let i = 0; i < 8; i++) {
        const interviewData = {
          type: "ix_idea_generation_interview_education",
          business: business,
          idea_theme: ideaGenerationSelectedStartPosition[i],
          persona_group: persona_group,
        };

        let interviewResponse = await EducationToolsRequest(
          interviewData,
          isLoggedIn,
          signal
        );

        let interivewReportRetryCount = 0;
        const reportMaxRetries = 10;
        while (
          interivewReportRetryCount < reportMaxRetries &&
          (!interviewResponse ||
            !interviewResponse?.response ||
            !interviewResponse?.response?.idea_generation_interview_education ||
            !interviewResponse?.response?.idea_generation_interview_education[0]
              ?.persona_name ||
            !interviewResponse?.response?.idea_generation_interview_education[0]
              ?.answer)
        ) {
          interviewResponse = await EducationToolsRequest(
            interviewData,
            isLoggedIn,
            signal
          );
          interivewReportRetryCount++;
        }

        if (interivewReportRetryCount >= reportMaxRetries) {
          setShowPopupError(true);
          return;
        }

        const data = {
          type: "ix_idea_generation_report_education",
          business: business,
          idea_content: ideaGenerationSelectedStartPosition[i], // i 인덱스의 아이템만 선택
          interview_list:
            interviewResponse.response.idea_generation_interview_education,
        };

        let reportResponse = await EducationToolsRequest(
          data,
          isLoggedIn,
          signal
        );

        let reportRetryCount = 0;
        while (
          reportRetryCount < reportMaxRetries &&
          (!reportResponse ||
            !reportResponse?.response ||
            !reportResponse?.response?.idea_generation_report_education ||
            !reportResponse?.response?.idea_generation_report_education
              ?.core_ideas ||
            !(
              Array.isArray(
                reportResponse?.response?.idea_generation_report_education
                  ?.detailed_execution_ideas
              ) &&
              reportResponse.response.idea_generation_report_education.detailed_execution_ideas.every(
                (item) =>
                  typeof item === "object" &&
                  item !== null &&
                  "idea_title" in item &&
                  "idea_description" in item
              )
            ))
        ) {
          reportResponse = await EducationToolsRequest(
            data,
            isLoggedIn,
            signal
          );
          reportRetryCount++;
        }

        if (reportRetryCount >= reportMaxRetries) {
          setShowPopupError(true);
          return;
        }

        const reportData =
          reportResponse.response.idea_generation_report_education;
        const reportDataAdditional =
          reportResponse.response.idea_generation_additional_report_education;

        reportData.core_ideas = reportData?.core_ideas?.map((coreIdea) => {
          // persona_name과 일치하는 persona 찾기
          const matchingPersona = persona_group_interview.find(
            (persona) => persona.name === coreIdea.persona_name
          );

          return {
            ...coreIdea,
            // 매칭된 persona의 정보 추가
            age: matchingPersona?.age,
            gender: matchingPersona?.gender,
            job: matchingPersona?.job,
            keywords: matchingPersona?.keywords,
            imageKey: matchingPersona?.imageKey,
          };
        });

        apiResults.push(reportData);
        apiResultsAdditional.push(reportDataAdditional);
      }

      setIdeaGenerationMandalArtData(apiResults);

      setIdeaGenerationAdditionalData(apiResultsAdditional);

      await updateToolOnServer(
        toolId,
        {
          completedStep: 3,
          ideaGenerationMandalArtData: apiResults,
          completedStatus: true,
          ideaGenerationAdditionalData: apiResultsAdditional,
        },
        isLoggedIn
      );
      setCompletedStatus(true);
    } catch (error) {
      console.error("Error in handleMandalArt:", error);
      setShowPopupError(true);
    } finally {
      setIsLoadingReport(false);
    }
  };

  const handleContactInputChange = (field, value) => {
    setContactForm((prev) => ({
      ...(prev || {}),
      [field]: value || "",
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

  const handleEnterInterviewRoom = () => {
    // setSelectedOption(null);
    // setSelectedOptionIndex(null);
    setShowToast(true);
  };

  const abortControllerRef = useRef(null);

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("ideageneration")) {
        // 세션 스토리지에서 마지막 URL 가져오기
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
                <div className="text" style={{ whiteSpace: "nowrap" }}>
                  <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                    키워드 가져오기
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
                <div className="text" style={{ whiteSpace: "nowrap" }}>
                  <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    페르소나 확인
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                Num3
                isActive={activeTab >= 3}
                onClick={() => completedSteps.includes(2) && setActiveTab(3)}
                disabled={
                  !completedSteps.includes(2) || isLoading || isLoadingReport
                }
              >
                <span>03</span>
                <div className="text" style={{ whiteSpace: "nowrap" }}>
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    아이디어 발산
                  </Body1>
                </div>
              </TabButtonType5>
            </TabWrapType5>

            {activeTab === 1 && (
              <TabContent5>
                {isContentLoading ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      minHeight: "200px",
                      alignItems: "center",
                    }}
                  >
                    <AtomPersonaLoader message="문제점 & 니즈 리스트를 불러오고 있어요..." />
                  </div>
                ) : (
                  <div className="content">
                    <div className="title">
                      <H3 color="gray800">Select Idea Theme</H3>

                      <Body3 color="gray800" style={{ marginBottom: "24px" }}>
                        정리된 키워드를 기반으로 아이디어 발산을 위한 주제어를
                        선택하세요.
                      </Body3>
                    </div>

                    <TabContent5Item>
                      <BoxWrap Column NoneV style={{ marginBottom: "24px" }}>
                        <div className="selectBoxWrap">
                          <Body2 color="gray500" style={{ width: "110px" }}>
                            핵심 키워드
                          </Body2>
                          <SelectBox style={{ paddingRight: "20px" }}>
                            <SelectBoxTitle
                              onClick={() =>
                                toolSteps >= 1
                                  ? null
                                  : setIsSelectBoxOpen(!isSelectBoxOpen)
                              }
                              None
                              style={{
                                cursor:
                                  toolSteps >= 1 ? "not-allowed" : "pointer",
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
                                  <Body2
                                    color={
                                      selectedPurposes.customerList
                                        ? "gray800"
                                        : "gray300"
                                    }
                                  >
                                    {selectedPurposes.customerList ||
                                      "불러올 핵심키워드 리스트를 선택해주세요.  "}
                                  </Body2>
                                </div>
                              ) : (
                                <Body2
                                  color="gray300"
                                  style={{ paddingLeft: "20px" }}
                                >
                                  불러올 핵심키워드 리스트를 선택해주세요.
                                </Body2>
                              )}
                              <images.ChevronDown
                                width="24px"
                                height="24px"
                                color={
                                  toolSteps >= 1
                                    ? palette.gray300
                                    : palette.gray800
                                }
                                style={{
                                  transform: isSelectBoxOpen
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                  transition: "transform 0.3s ease",
                                }}
                              />
                            </SelectBoxTitle>

                            {isSelectBoxOpen && (
                              <SelectBoxList>
                                {customerJourneyList?.map((item, index) => (
                                  <SelectBoxItem
                                    key={index}
                                    onClick={() => {
                                      handlePurposeSelect(
                                        `${
                                          item?.keywordsGenerationTag?.length ||
                                          0
                                        }개의 고객 여정 지도 기반 핵심 키워드
                                        (${item.updateDate.split(":")[0]}:${
                                          item.updateDate.split(":")[1]
                                        })`,
                                        "customerList",
                                        item
                                      );
                                      setIsSelectBoxOpen(false);
                                    }}
                                  >
                                    <Body2 color="gray500" align="left">
                                      {item?.keywordsGenerationTag?.length || 0}
                                      개의 고객 여정 지도 기반 핵심 키워드 (
                                      {item.updateDate.split(":")[0]}:
                                      {item.updateDate.split(":")[1]})
                                    </Body2>
                                  </SelectBoxItem>
                                ))}
                              </SelectBoxList>
                            )}
                          </SelectBox>
                        </div>

                        <div
                          className="selectBoxWrap"
                          style={{ marginTop: "12px" }}
                        >
                          <Body2
                            color="gray500"
                            style={{ width: "110px", alignSelf: "flex-start" }}
                          >
                            주제어 선택
                          </Body2>
                          <li
                            style={{
                              alignSelf: "flex-start",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <Body2
                              color={
                                ideaGenerationSelectedStartPosition?.length > 0
                                  ? "gray800"
                                  : "gray300"
                              }
                              style={{
                                whiteSpace: "normal",
                                wordBreak: "keep-all",
                                wordWrap: "break-word",
                                overflow: "visible",
                                maxWidth: "94%",
                                textAlign: "left",
                                marginLeft: "20px",
                                marginTop: "0",
                                paddingTop: "0",
                                display: "block",
                                alignSelf: "flex-start",
                              }}
                            >
                              {ideaGenerationSelectedStartPosition?.length > 0
                                ? ideaGenerationSelectedStartPosition
                                    .map((item) => item.main_theme)
                                    .join(", ")
                                : "선택해주세요"}
                            </Body2>
                          </li>
                        </div>
                      </BoxWrap>

                      {ideaGenerationStartPosition?.length === 0 ? (
                        <BoxWrap
                          NoData
                          style={{ height: "300px", marginTop: "20px" }}
                        >
                          <img src={images.ListFillPrimary} alt="" />
                          <Body2 color="gray700" align="center !important">
                            핵심 키워드 리스트를 선택해주세요
                          </Body2>
                        </BoxWrap>
                      ) : (
                        <div className="content">
                          <Title
                            style={{ marginTop: "28px", marginBottom: "-20px" }}
                          >
                            <Body1 color="gray700">
                              아이디어 발산의 주제어를 선택하세요 (8개 필수
                              선택)
                            </Body1>
                          </Title>

                          <CardGroupWrap ideaGeneration>
                            <MoleculeTagList
                              items={ideaGenerationStartPosition}
                              disabled={toolSteps >= 1}
                            />
                          </CardGroupWrap>
                        </div>
                      )}
                    </TabContent5Item>
                  </div>
                )}

                <Button
                  Other
                  Primary
                  Fill
                  Round
                  onClick={handleSubmitIdea}
                  disabled={
                    isContentLoading ||
                    toolSteps >= 1 ||
                    ideaGenerationSelectedStartPosition.length < 8
                  }
                >
                  아이디어 키워드 추출
                </Button>
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
                    <AtomPersonaLoader message="아이디어 발산을 위한 핵심 키워드를 추출하고 있어요 " />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Participating Persona</H3>
                      <Body3 color="gray800">
                        함께 아이디에이션에 참여하는 페르소나들을 확인해보세요
                      </Body3>
                    </div>

                    <div className="content">
                      <BoxWrap Column NoneV style={{ marginBottom: "0px" }}>
                        <div className="selectBoxWrap">
                          <Body2 color="gray500" style={{ width: "110px" }}>
                            핵심 키워드
                          </Body2>
                          <SelectBox style={{ paddingRight: "20px" }}>
                            <SelectBoxTitle
                              onClick={() =>
                                toolSteps >= 1
                                  ? null
                                  : setIsSelectBoxOpen(!isSelectBoxOpen)
                              }
                              None
                              style={{
                                cursor:
                                  toolSteps >= 1 ? "not-allowed" : "pointer",
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
                                  <Body2
                                    color={
                                      selectedPurposes.customerList
                                        ? "gray800"
                                        : "gray300"
                                    }
                                  >
                                    {selectedPurposes.customerList ||
                                      "불러올 핵심키워드 리스트를 선택해주세요.  "}
                                  </Body2>
                                </div>
                              ) : (
                                <Body2
                                  color="gray300"
                                  style={{ paddingLeft: "20px" }}
                                >
                                  불러올 핵심키워드 리스트를 선택해주세요.
                                </Body2>
                              )}
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
                            </SelectBoxTitle>

                            {isSelectBoxOpen && (
                              <SelectBoxList>
                                {customerJourneyList?.map((item, index) => (
                                  <SelectBoxItem
                                    key={index}
                                    onClick={() => {
                                      handlePurposeSelect(
                                        `${
                                          item?.keywordsGenerationTag?.length ||
                                          0
                                        }개의 여정 지도 기반 핵심 키워드
                                        (${item.updateDate.split(":")[0]}:${
                                          item.updateDate.split(":")[1]
                                        })`,
                                        "customerList",
                                        item
                                      );
                                      setIsSelectBoxOpen(false);
                                    }}
                                  >
                                    <Body2 color="gray500" align="left">
                                      {item?.keywordsGenerationTag?.length || 0}
                                      개의 여정 지도 기반 핵심 키워드 ($
                                      {item.updateDate.split(":")[0]}:$
                                      {item.updateDate.split(":")[1]})
                                    </Body2>
                                  </SelectBoxItem>
                                ))}
                              </SelectBoxList>
                            )}
                          </SelectBox>
                        </div>

                        <div
                          className="selectBoxWrap"
                          style={{ marginTop: "12px" }}
                        >
                          <Body2
                            color="gray500"
                            style={{ width: "110px", alignSelf: "flex-start" }}
                          >
                            주제어 선택
                          </Body2>
                          <li
                            style={{
                              alignSelf: "flex-start",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <Body2
                              color={
                                ideaGenerationSelectedStartPosition?.length > 0
                                  ? "gray800"
                                  : "gray300"
                              }
                              style={{
                                whiteSpace: "normal",
                                wordBreak: "keep-all",
                                wordWrap: "break-word",
                                overflow: "visible",
                                maxWidth: "94%",
                                textAlign: "left",
                                marginLeft: "20px",
                                marginTop: "0",
                                paddingTop: "0",
                                display: "block",
                                alignSelf: "flex-start",
                              }}
                            >
                              {ideaGenerationSelectedStartPosition?.length > 0
                                ? ideaGenerationSelectedStartPosition
                                    .map((item) => item.main_theme)
                                    .join(", ")
                                : "선택해주세요"}
                            </Body2>
                          </li>
                        </div>
                      </BoxWrap>
                    </div>

                    <div className="content">
                      <TabContent5Item style={{ marginTop: "-4px" }}>
                        <div className="title">
                          <Body1 color="gray800">
                            아이데이션 참여 페르소나{" "}
                            {
                              personaListSaas.filter(
                                (item) => item.favorite === true
                              ).length
                            }
                            명
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
                  </>
                )}
                <Button
                  Other
                  Primary
                  Fill
                  Round
                  onClick={handleMandalArt}
                  disabled={
                    toolSteps >= 2 ||
                    personaListSaas.filter((item) => item.favorite === true)
                      .length < 20
                  }
                >
                  아이디에이션 시작하기
                </Button>
              </TabContent5>
            )}

            {activeTab === 3 && completedSteps.includes(2) && (
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
                        <span>
                          참여 페르소나들이 8개의 주제어를 바탕으로 아이디어를
                          발산하고 있어요.
                          <br />
                          (5분 정도 걸려요)
                        </span>
                      }
                    />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Define Your Key Customer</H3>
                      <Body3 color="gray800">
                        고객 여정 분석을 원하는 주요 고객군을 선택하세요
                        <Title style={{ marginTop: "28px" }}></Title>
                      </Body3>
                    </div>

                    <div className="content">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          minHeight: "100%", // 페이지 높이의 80% 정도로 설정
                        }}
                      >
                        <MoleculeMandalArtGraph
                          mandalartData={ideaGenerationMandalArtData}
                        />
                      </div>
                    </div>

                    <Button
                      Primary
                      onClick={handleEnterInterviewRoom}
                      style={{
                        visibility:
                          ideaGenerationSelectedMandalart === null
                            ? "hidden"
                            : "visible",
                      }} // 메인에서는 가리고 세부 보기에선 보여주기
                    >
                      <img
                        src={images.ReportSearch}
                        alt="인터뷰 스크립트 보기"
                      />
                      응답자 의견 확인
                    </Button>

                    <div className="content">
                      {ideaGenerationSelectedMandalart === null ? (
                        <IdeaContainer>
                          <IdeaBox>
                            <IdeaContent>
                              각 아이디어 주제를 클릭해보세요. 주제별로 연관된
                              아이디어 8가지가 제시됩니다.
                            </IdeaContent>
                          </IdeaBox>
                        </IdeaContainer>
                      ) : (
                        <IdeaContainer>
                          <IdeaBox>
                            <IdeaTitle>아이디어 발산 Theme 정의 </IdeaTitle>
                            <IdeaContent>
                              <IdeaText>
                                {
                                  ideaGenerationAdditionalData[
                                    ideaGenerationSelectedMandalart - 1
                                  ]?.theme_definition
                                }
                              </IdeaText>
                            </IdeaContent>

                            <Divider />
                            <IdeaTitle>아이디어 별 설명</IdeaTitle>
                            <IdeaContent>
                              {ideaGenerationAdditionalData[
                                ideaGenerationSelectedMandalart - 1
                              ]?.priority_ideas?.map((idea, index) => (
                                <IdeaText>
                                  {idea.title} : {idea.description}
                                </IdeaText>
                              ))}
                            </IdeaContent>

                            <Divider />
                            <IdeaTitle>전략적 제언</IdeaTitle>
                            <IdeaContent>
                              <IdeaText>
                                {
                                  ideaGenerationAdditionalData[
                                    ideaGenerationSelectedMandalart - 1
                                  ]?.strategic_recommendations
                                }
                              </IdeaText>
                            </IdeaContent>
                          </IdeaBox>
                        </IdeaContainer>
                      )}
                    </div>

                    {completedStatus && (
                      <Button
                        Primary
                        Edit
                        Large
                        style={{
                          color: palette.gray700,
                          border: `1px solid ${palette.outlineGray}`,
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
                // selectedOption={selectedOption}
                // selectedOptionIndex={selectedOptionIndex}
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
            title="아이디어 발산"
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
            title="아이디어 발산"
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
            title="아이디어 발산"
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
    </>
  );
};

export default PageIdeaGeneration;

const DesignAnalysisWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin-top: 60px;
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
