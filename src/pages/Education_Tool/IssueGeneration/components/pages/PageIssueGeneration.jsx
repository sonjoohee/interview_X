//디자인 감성 분석기
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../../assets/styles/Palette";
import AtomPersonaLoader from "../../../../Global/atoms/AtomPersonaLoader";
import OrganismIncNavigation from "../../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../../Global/molecules/MoleculeHeader";
import { Button, IconButton } from "../../../../../assets/styles/ButtonStyle";
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
  IDEA_GENERATION_MANDALART_DATA,
  IDEA_GENERATION_SELECTED_MANDALART,
  IDEA_GENERATION_POSSSESSION_TECH,
  ISSUE_GENERATION_SELECTED_PURPOSE,
  ISSUE_GENERATION_PROBLEM_LIST,
  ISSUE_GENERATION_PROBLEM_LIST_TITLE,
  ISSUE_GENERATION_SELECTED_START_POSITION,
  ISSUE_GENERATION_START_POSITION,
  EVENT_STATE,
  TRIAL_STATE,
  EVENT_TITLE,
  CREDIT_CREATE_TOOL_LOW,
  USER_CREDITS,
  CREDIT_CREATE_TOOL_LOADED,
  EDUCATION_STATE,
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
  H4,
  H3,
  Sub3,
  Body1,
  Body2,
  Body3,
  Caption1,
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
import MoleculeDeleteForm from "../../../public/MoleculeDeleteForm";
import { useDynamicViewport } from "../../../../../assets/DynamicViewport";
import MoleculeTagList from "../molecules/MoleculeTagList";
import MoleculeSelectedTagList from "../molecules/MoleculeSelectedTagList";

const PageIssueGeneration = () => {
  const navigate = useNavigate();

  const [eventState] = useAtom(EVENT_STATE);
  const [trialState] = useAtom(TRIAL_STATE);
  const [eventTitle] = useAtom(EVENT_TITLE);
  const [creditCreateToolLow] = useAtom(CREDIT_CREATE_TOOL_LOW);
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [creditCreateToolLoaded, setCreditCreateToolLoaded] = useAtom(
    CREDIT_CREATE_TOOL_LOADED
  );
  const [educationState] = useAtom(EDUCATION_STATE);
  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [toolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);

  const [ideaGenerationPossessionTech, setIdeaGenerationPossessionTech] =
    useAtom(IDEA_GENERATION_POSSSESSION_TECH);

  const [ideaGenerationMandalArtData, setIdeaGenerationMandalArtData] = useAtom(
    IDEA_GENERATION_MANDALART_DATA
  );
  const [completedStatus, setCompletedStatus] = useAtom(
    EDUCATION_TOOL_COMPLETED_STATUS
  );

  const [issueGenerationSelectedPurpose, setIssueGenerationSelectedPurpose] =
    useAtom(ISSUE_GENERATION_SELECTED_PURPOSE);
  const [issueGenerationProblemList, setIssueGenerationProblemList] = useAtom(
    ISSUE_GENERATION_PROBLEM_LIST
  );
  const [issueGenerationProblemListTitle, setIssueGenerationProblemListTitle] =
    useAtom(ISSUE_GENERATION_PROBLEM_LIST_TITLE);
  const [
    issueGenerationSelectedStartPosition,
    setIssueGenerationSelectedStartPosition,
  ] = useAtom(ISSUE_GENERATION_SELECTED_START_POSITION);
  const [issueGenerationStartPosition, setIssueGenerationStartPosition] =
    useAtom(ISSUE_GENERATION_START_POSITION);

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
  const [shouldSubmit, setShouldSubmit] = useState(false);
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
          mount: creditCreateToolLow,
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

        if (Object.keys(issueGenerationSelectedPurpose).length > 0) {
          setSelectedPurposes(issueGenerationSelectedPurpose ?? {});
        }
        if (issueGenerationProblemList) {
          setIssueGenerationProblemList(issueGenerationProblemList ?? []);
        }
        if (issueGenerationProblemListTitle) {
          setIssueGenerationProblemListTitle(
            issueGenerationProblemListTitle ?? []
          );
        }
        if (issueGenerationStartPosition) {
          setIssueGenerationStartPosition(issueGenerationStartPosition ?? []);
        }
        if (issueGenerationSelectedStartPosition) {
          setIssueGenerationSelectedStartPosition(
            issueGenerationSelectedStartPosition ?? []
          );
        }
        if (ideaGenerationPossessionTech) {
          setProjectDescription(ideaGenerationPossessionTech ?? "");
        }
        if (ideaGenerationMandalArtData) {
          setIdeaGenerationMandalArtData(ideaGenerationMandalArtData ?? []);
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
          "ix_customer_journey_map_education",
          isLoggedIn
        );

        const newItems = (response || []).filter(
          (item) =>
            item?.type === "ix_customer_journey_map_education" &&
            item?.completedStep === 3
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

  // handleInputChange 함수 수정
  const handleInputChange = (field, value) => {
    // formData 대신 개별 상태 업데이트
    if (field === "projectDescription") {
      setProjectDescription(value);
    }
  };

  const handleSubmitProblem = async () => {
    // 새 AbortController 생성
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    handleNextStep(1);

    const currentProblemList = [...issueGenerationProblemList];

    // 각 title을 currentProblemList의 해당 인덱스에 할당
    // 만약 currentProblemList가 더 짧다면 새 객체를 생성하여 추가
    const updatedProblemList = issueGenerationProblemListTitle.map(
      (title, index) => {
        if (index < currentProblemList.length) {
          // 기존 항목이 있으면 title만 업데이트
          return {
            ...currentProblemList[index],
            title: title,
          };
        } else {
          // 기존 항목이 없으면 새 객체 생성
          return { title: title };
        }
      }
    );

    // 업데이트된 리스트로 상태 설정
    setIssueGenerationProblemList(updatedProblemList);

    await updateToolOnServer(
      toolId,
      {
        // completedStep: 1,
        selectedPurposes: selectedPurposes,
        issueGenerationProblemList: issueGenerationProblemList,
        issueGenerationProblemListTitle: issueGenerationProblemListTitle,
      },
      isLoggedIn
    );
    try {
      setIsLoading(true);
      // 빈 문자열이나 공백만 있는 항목 제거
      // const validItems = issueGenerationProblemList.filter(
      //   (item) => item.trim() !== ""
      // );

      // if (validItems.length === 0) {
      //   // 유효한 항목이 없는 경우 처리
      //   return;
      // }

      const Data = {
        type: "ix_idea_generation_keyword_education",
        business_info: business,
        info: customerJourneyMapSelectedPersona,
        problem_needs: issueGenerationProblemListTitle.map((title) => {
          // 기존 issueGenerationProblemList에서 일치하는 title을 가진 객체 찾기
          const existingItem = issueGenerationProblemList.find(
            (item) => item.title === title
          );
          // 있으면 그 객체 반환, 없으면 새 객체 생성
          return existingItem || { title };
        }),
        is_load: true,
      };

      const response = await EducationToolsRequest(Data, isLoggedIn, signal);

      setIssueGenerationStartPosition(
        response.response.idea_generation_keyword_education
      );

      setIsLoading(false);
      await updateToolOnServer(
        toolId,
        {
          completedStep: 1,
          issueGenerationStartPosition:
            response.response.idea_generation_keyword_education,
        },
        isLoggedIn
      );

      setToolSteps(1);
    } catch (error) {
      console.error("Error submitting problems:", error);
      setShowPopupError(true);
    }
  };

  const handleSubmitTheme = async () => {
    handleNextStep(2);
    setToolSteps(2);

    await updateToolOnServer(
      toolId,
      {
        completedStep: 3,
        issueGenerationStartPosition: issueGenerationStartPosition,
        issueGenerationSelectedStartPosition:
          issueGenerationSelectedStartPosition,
        possessionTech: projectDescription,
        completedStatus: true,
      },
      isLoggedIn
    );
    setCompletedStatus(true);
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

    if (selectBoxId === "customerList" && item) {
      setSelectedJourneyMapData(item);

      const persona = item.customerJourneyMapSelectedPersona;
      const Customer = {
        personaName: persona?.personaName || "",
        personaCharacteristics: persona?.personaCharacteristics || "",
        age: persona?.age || "",
        gender: persona?.gender || "",
        job: persona?.job || "",
        keywords: persona?.keywords || [],
        type: persona?.type || "",
      };

      setCustomerJourneyMapSelectedPersona(Customer);
      setCustomerJourneyMapReport(item.customerJourneyMapReport);

      // handleSubmitCustomerJourney ();
      setShouldSubmit(true);
    }
  };

  useEffect(() => {
    if (shouldSubmit) {
      handleSubmitCustomerJourney();
      setShouldSubmit(false); // Reset the flag
    }
  }, [selectedPurposes, shouldSubmit]);

  const handleSubmitCustomerJourney = async () => {
    // 새 AbortController 생성
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setIsContentLoading(true);

    setIssueGenerationSelectedPurpose(selectedPurposes);

    try {
      if (selectedJourneyMapData) {
        // setSelectedJourneyMapData(item);

        const data = {
          type: "ix_idea_generation_problem_education",
          customer_journey_map_persona: customerJourneyMapSelectedPersona,
          customer_journey_map_report: customerJourneyMapReport,
        };

        const response = await EducationToolsRequest(data, isLoggedIn, signal);

        setIssueGenerationProblemList(
          response.response.idea_generation_problem_education
        );

        setIssueGenerationProblemListTitle(
          response.response.idea_generation_problem_education.map(
            (item) => item.title
          )
        );

        const responseToolId = await createToolOnServer(
          {
            projectId: project._id,
            type: "ix_issue_generation_education",
          },
          isLoggedIn
        );
        setToolId(responseToolId);
    
        const creditUsePayload = {
          title: project.projectTitle,
          service_type: "핵심 문제 도출",
          target: "",
          state: "use",
          mount: creditCreateToolLow,
        };
    
        await UserCreditUse(creditUsePayload, isLoggedIn);
    
        // 크레딧 사용 후 사용자 정보 새로고침
    
        const userCreditValue = await UserCreditInfo(isLoggedIn);
        // 전역 상태의 크레딧 정보 업데이트
        setUserCredits(userCreditValue);        

        await updateToolOnServer(
          responseToolId,
          {
            completedStep: 0,
            selectedPurposes: selectedPurposes,
            issueGenerationProblemList:
              response.response.idea_generation_problem_education,
            issueGenerationProblemListTitle:
              response.response.idea_generation_problem_education.map(
                (item) => item.title
              ),
          },
          isLoggedIn
        );
      }

      //       await updateToolOnServer(
      //         responseToolId,
      //         {
      //           completedStep: 0,
      //           selectedPurposes: selectedPurposes,
      //           issueGenerationProblemList: issueGenerationProblemList,
      //           issueGenerationProblemListTitle: issueGenerationProblemListTitle,
      //         },
      //         isLoggedIn
      //       );
    } catch (error) {
      console.error("Error in handlePurposeSelect:", error);
      setShowPopupError(true);
    } finally {
      setTimeout(() => {
        setIsContentLoading(false);
      }, 500);
    }
  };

  const handleContactInputChange = (field, value) => {
    setContactForm((prev) => ({
      ...(prev || {}),
      [field]: value || "",
    }));
  };

  const handleSelectBoxClick = (selectBoxId, ref) => {
    // Don't open dropdown if toolSteps >= 1 for customerList
    if (toolSteps >= 1) {
      return;
    }
    if (issueGenerationProblemList.length > 0) {
      return;
    }

    calculateDropDirection(ref, selectBoxId);
    setSelectBoxStates((prev) => ({
      ...(prev || {}),
      [selectBoxId]: !prev?.[selectBoxId],
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
      if (currentUrl.toLowerCase().includes("issuegeneration")) {
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

    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
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
                <div className="text" style={{ whiteSpace: "nowrap" }}>
                  <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                    MoT 정의
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
                    키워드 추출
                  </Body1>
                  {/* <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    Design Sector
                  </Body1> */}
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
                    핵심 문제 정의
                  </Body1>
                </div>
              </TabButtonType5>
              {/* <TabButtonType5
                isActive={activeTab >= 4}
                onClick={() => completedSteps.includes(3) && setActiveTab(4)}
                disabled={!completedSteps.includes(3) || isLoading}
              >
                <span>04</span>
                <div className="text" style={{ whiteSpace: "nowrap" }}>
                  <Body1 color={activeTab >= 4 ? "gray700" : "gray300"}>
                    아이디어 결과 보기
                  </Body1>
                </div>
              </TabButtonType5> */}
            </TabWrapType5>

            {activeTab === 1 && (
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
                    <AtomPersonaLoader message="문제점 & 니즈 리스트를 불러오고 있어요..." />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Identify MoT Moment</H3>
                      <Body3 color="gray800">
                        고객 여정에서 MoT를 찾아, 아이디어의 기회를 포착하세요​
                      </Body3>
                    </div>

                    <div className="content">
                      <TabContent5Item>
                        <div className="title">
                          <Body1 color="gray700">
                            고객 여정 지도 가져오기{" "}
                          </Body1>
                        </div>

                        <SelectBox ref={customerListRef}>
                          <SelectBoxTitle
                            onClick={() =>
                              handleSelectBoxClick(
                                "customerList",
                                customerListRef
                              )
                            }
                            style={{
                              cursor:
                                toolSteps >= 1 || isContentLoading
                                  ? "not-allowed"
                                  : "pointer",
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
                                "고객 여정 지도 결과를 불러 올 수 있습니다"}
                            </Body2>
                            <images.ChevronDown
                              width="24px"
                              height="24px"
                              color={palette.gray500}
                              style={{
                                transform: selectBoxStates.customerList
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                              }}
                            />
                          </SelectBoxTitle>

                          {selectBoxStates.customerList && (
                            <SelectBoxList dropUp={dropUpStates.customerList}>
                              {customerJourneyList.length === 0 ? (
                                <SelectBoxItem
                                  disabled={
                                    toolSteps >= 1 ||
                                    issueGenerationProblemList.length > 0
                                  }
                                >
                                  <Body2 color="gray300" align="left">
                                    고객 여정 지도 진행을 완료하신 경우, 정보를
                                    가져올 수 있습니다.
                                  </Body2>
                                </SelectBoxItem>
                              ) : (
                                customerJourneyList.map((item, index) => (
                                  <SelectBoxItem
                                    disabled={
                                      toolSteps >= 1 || isContentLoading
                                    }
                                    key={index}
                                    onClick={() => {
                                      handlePurposeSelect(
                                        `${
                                          item.customerJourneyMapSelectedPersona
                                            .personaName || "페르소나"
                                        }의 ${
                                          item.selectedDirection.name ||
                                          "선택한 방향성"
                                        } ${`(${item.updateDate.split(":")[0]}:${item.updateDate.split(":")[1]})`.replace(/ /g, '\u00A0')}`,
                                        "customerList",
                                        item
                                      );
                                    }}
                                  >
                                    <Body2 color="gray700" textAlign="left">
                                      {item.customerJourneyMapSelectedPersona
                                        .personaName || "페르소나"}
                                      의{" "}
                                      {item.selectedDirection.name ||
                                        "선택한 방향성"}
                                      <span style={{ whiteSpace: 'nowrap' }}>
                                        ({item.updateDate.split(":")[0]}:
                                        {item.updateDate.split(":")[1]})
                                      </span>
                                    </Body2>
                                  </SelectBoxItem>
                                ))
                              )}
                            </SelectBoxList>
                          )}
                        </SelectBox>
                      </TabContent5Item>

                      <TabContent5Item required>
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
                            <AtomPersonaLoader message="선택하신 고객 여정에서 MoT 순간을 분석하고 있어요" />
                          </div>
                        ) : (
                          <>
                            {selectedPurposes.customerList.length === 0 ? (
                              <BoxWrap
                                NoData
                                style={{ height: "300px" }}
                                onClick={() => navigate("/CustomerJourneyMap")}
                              >
                                <img src={images.ListFillPrimary} alt="" />
                                <Body2
                                  color="gray700"
                                  align="center !important"
                                >
                                  분석할 고객 여정 지도를 선택하고, <br /> 핵심
                                  MoT를 도출하세요
                                </Body2>
                              </BoxWrap>
                            ) : (
                              <>
                                <div className="title">
                                  <Body1 color="gray700">
                                    고객 여정에서 드러난​ 핵심 문제와 니즈
                                    항목입니다.
                                  </Body1>
                                </div>
                                <MoleculeDeleteForm
                                  items={issueGenerationProblemListTitle || []}
                                  setItems={setIssueGenerationProblemListTitle}
                                  disabled={toolSteps >= 1}
                                  maxItems={13}
                                  placeholder="문제점 작성"
                                  initialItemCount={8}
                                  edit={false}
                                />
                              </>
                            )}
                          </>
                        )}
                      </TabContent5Item>
                    </div>

                    {issueGenerationProblemListTitle.length > 0 &&
                      !isContentLoading &&
                      selectedPurposes.customerList.length > 0 && (
                        <Button
                          Other
                          Primary
                          Fill
                          Round
                          onClick={handleSubmitProblem}
                          disabled={
                            isContentLoading ||
                            toolSteps >= 1 ||
                            selectedPurposes.customerList.length === 0
                          }
                        >
                          키워드 추출
                        </Button>
                      )}
                  </>
                )}
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
                    {issueGenerationStartPosition.length > 0 && (
                      <>
                        <div className="title">
                          <H3 color="gray800">Defining Key Needs</H3>
                          <Body3 color="gray800">
                            문제 정의를 통해 도출된 니즈를 바탕으로 아이디어
                            방향을 설정합니다.
                          </Body3>
                        </div>

                        <div className="content">
                          <ListBoxGroup style={{ alignItems: "flex-start" }}>
                            <li style={{ alignItems: "flex-start" }}>
                              <Body2
                                color="gray500"
                                style={{
                                  alignSelf: "flex-start",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                고객 여정 맵
                              </Body2>

                              <Body2
                                color="gray800"
                                style={{
                                  alignSelf: "flex-start",

                                  whiteSpace: "normal",
                                  wordBreak: "keep-all",
                                  wordWrap: "break-word",
                                  overflow: "visible",
                                  maxWidth: "100%",
                                  textAlign: "left",
                                  marginLeft: "20px",
                                  textAlign: "left",
                                }}
                              >
                                {selectedPurposes.customerList}
                              </Body2>
                            </li>

                            <li style={{ alignItems: "flex-start" }}>
                              <Body2
                                color="gray500"
                                style={{
                                  alignSelf: "flex-start",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                분석 장면 선택
                              </Body2>

                              <Body2
                                color={
                                  issueGenerationSelectedStartPosition?.length >
                                  0
                                    ? "gray800"
                                    : "gray300"
                                }
                                style={{
                                  whiteSpace: "normal",
                                  wordBreak: "keep-all",
                                  wordWrap: "break-word",
                                  overflow: "visible",
                                  maxWidth: "100%",
                                  textAlign: "left",
                                  alignSelf: "flex-start",

                                  marginLeft: "20px",
                                }}
                              >
                                {issueGenerationSelectedStartPosition?.length >
                                0
                                  ? issueGenerationSelectedStartPosition
                                      .map((item) => item.theme)
                                      .join(", ")
                                  : "선택해주세요"}
                              </Body2>
                            </li>
                          </ListBoxGroup>
                          <div className="content">
                            <Title
                              style={{
                                marginBottom: "-18px",
                                marginTop: "20px",
                              }}
                            >
                              <Body1 color="gray700">
                                MoT 기반으로 도출한 방향성 중, 아이디어 발산
                                키워드를 선택하세요. (8개 필수 선택)
                              </Body1>
                            </Title>

                            <CardGroupWrap ideaGeneration>
                              <MoleculeTagList
                                items={Array.from(
                                  new Set(
                                    issueGenerationStartPosition
                                      .map((item) => item.content)
                                      .flat() // 모든 content 배열을 하나로 합침
                                      .map((item) => JSON.stringify(item))
                                  )
                                ).map((item) => JSON.parse(item))}
                                disabled={toolSteps >= 2}
                              />
                            </CardGroupWrap>
                          </div>
                        </div>
                        {!isLoading && (
                          <Button
                            Other
                            Primary
                            Fill
                            Round
                            onClick={handleSubmitTheme}
                            disabled={
                              issueGenerationSelectedStartPosition.length < 8 ||
                              toolSteps >= 2
                            }
                          >
                            다음
                          </Button>
                        )}
                      </>
                    )}
                  </>
                )}
              </TabContent5>
            )}

            {activeTab === 3 && completedSteps.includes(2) && (
              <TabContent5>
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
                    <AtomPersonaLoader message="결과보고서를 작성하고 있습니다" />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Selected Keywords</H3>
                      <Body3 color="gray800">
                        고객 여정과 MoT 분석을 통해 최종 선택한 니즈 키워드를
                        확인하세요
                      </Body3>
                    </div>

                    <div className="content">
                      <ListBoxGroup style={{ alignItems: "flex-start" }}>
                        <li style={{ alignItems: "flex-start" }}>
                          <Body2 color="gray500">고객 여정 맵</Body2>

                          <Body2
                            color="gray800"
                            style={{
                              flex: "1",
                              whiteSpace: "normal",
                              wordBreak: "keep-all",
                              overflowWrap: "break-word",
                              overflow: "visible",
                              maxWidth: "calc(100% - 120px)",
                              marginLeft: "20px",
                              textAlign: "left",
                              lineHeight: "1.5",
                              minWidth: 0,
                            }}
                          >
                            <span dangerouslySetInnerHTML={{
                              __html: selectedPurposes.customerList.replace(/(\([^)]+\))/g, '<span style="white-space: nowrap;">$1</span>')
                            }} />
                          </Body2>
                        </li>

                        <li style={{ alignItems: "flex-start" }}>
                          <Body2 color="gray500">분석 장면 선택</Body2>

                          <Body2
                            color={
                              issueGenerationSelectedStartPosition?.length > 0
                                ? "gray800"
                                : "gray300"
                            }
                            style={{
                              whiteSpace: "normal",
                              wordBreak: "keep-all",
                              wordWrap: "break-word",
                              overflow: "visible",
                              maxWidth: "100%",
                              textAlign: "left",
                              alignSelf: "flex-start",

                              marginLeft: "20px",
                              textAlign: "left",
                            }}
                          >
                            {issueGenerationSelectedStartPosition?.length > 0
                              ? issueGenerationSelectedStartPosition
                                  .map((item) => item.theme)
                                  .join(", ")
                              : "선택해주세요"}
                          </Body2>
                        </li>
                      </ListBoxGroup>
                    </div>

                    <div className="content">
                      <TabContent5Item style={{ marginTop: "0px" }}>
                        <div className="title">
                          <Body1 color="gray800">
                            해당 니즈 키워드는 아이디어 발산하는 데 활용됩니다.{" "}
                          </Body1>
                        </div>

                        <MoleculeSelectedTagList
                          items={Array.from(
                            new Set(
                              issueGenerationStartPosition
                                .map((item) => item.content)
                                .flat() // 모든 content 배열을 하나로 합침
                                .map((item) => JSON.stringify(item))
                            )
                          ).map((item) => JSON.parse(item))}
                          disabled={toolSteps >= 1}
                        />
                      </TabContent5Item>
                    </div>

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
            title="핵심 문제 정의"
            message={
              <>
                현재 {eventTitle} 기간으로 이벤트 크레딧이 소진됩니다.
                <br />({creditCreateToolLow} 크레딧)
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
            title="핵심 문제 정의"
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditCreateToolLow} 크레딧)
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
            title="핵심 문제 정의"
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditCreateToolLow} 크레딧)
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

export default PageIssueGeneration;

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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background: ${palette.white};
  border-radius: 10px;
  padding: 24px;
  margin-top: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  margin-bottom: 140px;
`;
