//디자인 감성 분석기
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../../assets/styles/Palette";
import AtomPersonaLoader from "../../../../Global/atoms/AtomPersonaLoader";
import OrganismIncNavigation from "../../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../../Global/molecules/MoleculeHeader";
import { Button, IconButton } from "../../../../../assets/styles/ButtonStyle";
import {
  FormBox,
  CustomTextarea,
} from "../../../../../assets/styles/InputStyle";
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
  CardGroupWrap,
  BottomBar,
  BgBoxItem,
  StyledDropzone,
  DropzoneStyles,
  OCEANRangeWrap,
  RangeSlider,
  Title,
  ListBoxGroup,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import {
  IS_LOGGED_IN,
  TOOL_ID,
  TOOL_STEP,
  TOOL_LOADING,
  DESIGN_ANALYSIS_BUSINESS_INFO,
  DESIGN_ANALYSIS_EMOTION_ANALYSIS,
  DESIGN_ANALYSIS_SELECTED_PERSONA,
  DESIGN_ANALYSIS_EMOTION_TARGET,
  DESIGN_ANALYSIS_EMOTION_SCALE,
  DESIGN_ANALYSIS_FILE_NAMES,
  DESIGN_ANALYSIS_FILE_ID,
  PROJECT_SAAS,
  DESIGN_ANALYSIS_BUSINESS_TITLE,
  CREDIT_CREATE_TOOL,
  CREDIT_CREATE_TOOL_LOADED,
  USER_CREDITS,
  EDUCATION_STATE,
  EVENT_STATE,
  TRIAL_STATE,
  EVENT_TITLE,
} from "../../../../AtomStates";
import images from "../../../../../assets/styles/Images";
import {
  H4,
  H3,
  Sub3,
  Body1,
  Body2,
  Body3,
} from "../../../../../assets/styles/Typography";
import {
  InterviewXDesignEmotionAnalysisRequest,
  InterviewXDesignEmotionTargetRequest,
  InterviewXDesignEmotionScaleRequest,
  createToolOnServer,
  updateToolOnServer,
  UserCreditCheck,
  UserCreditUse,
  UserCreditInfo,
} from "../../../../../utils/indexedDB";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import AnalysisItem from "../molecules/MoleculeAnalysisItem";
import MoleculeDesignItem from "../molecules/MoleculeDesignItem";

import { useDynamicViewport } from "../../../../../assets/DynamicViewport";

const PageDesignAnalysis = () => {
  const navigate = useNavigate();

  const [showPopupFileSize, setShowPopupFileSize] = useState(false);
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [toolSteps, setToolSteps] = useState(0);
  const [creditCreateTool] = useAtom(CREDIT_CREATE_TOOL);
  const [creditCreateToolLoaded, setCreditCreateToolLoaded] = useAtom(
    CREDIT_CREATE_TOOL_LOADED
  );
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [educationState] = useAtom(EDUCATION_STATE);
  const [eventState] = useAtom(EVENT_STATE);
  const [trialState] = useAtom(TRIAL_STATE);
  const [eventTitle] = useAtom(EVENT_TITLE);
  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [, setDesignAnalysisBusinessTitle] = useAtom(
    DESIGN_ANALYSIS_BUSINESS_TITLE
  );
  const [designAnalysisBusinessInfo, setDesignAnalysisBusinessInfo] = useAtom(
    DESIGN_ANALYSIS_BUSINESS_INFO
  );
  const [designAnalysisEmotionAnalysis, setDesignAnalysisEmotionAnalysis] =
    useAtom(DESIGN_ANALYSIS_EMOTION_ANALYSIS);
  const [
    selectedDesignAnalysisEmotionAnalysis,
    setSelectedDesignAnalysisEmotionAnalysis,
  ] = useAtom(DESIGN_ANALYSIS_SELECTED_PERSONA);
  const [designAnalysisEmotionTarget, setDesignAnalysisEmotionTarget] = useAtom(
    DESIGN_ANALYSIS_EMOTION_TARGET
  );
  const [designAnalysisEmotionScale, setDesignAnalysisEmotionScale] = useAtom(
    DESIGN_ANALYSIS_EMOTION_SCALE
  );
  const [designAnalysisFileNames] = useAtom(DESIGN_ANALYSIS_FILE_NAMES);
  const [designAnalysisFileId, setDesignAnalysisFileId] = useAtom(
    DESIGN_ANALYSIS_FILE_ID
  );
  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [selectedPersonas, setSelectedPersonas] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [activeDesignTab, setActiveDesignTab] = useState("emotion");
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [businessDescriptionTitle, setBusinessDescriptionTitle] = useState("");
  const [state] = useState({
    isExpanded: false,
    showQuestions: false,
  });
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
          mount: creditCreateTool,
        };
        const creditResponse = await UserCreditCheck(creditPayload, isLoggedIn);

        if (creditResponse?.state !== "use") {
          setShowCreditPopup(true);
          return;
        }
        setCreditCreateToolLoaded(true);
      }

      if (designAnalysisBusinessInfo.length === 0) {
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
      }

      if (toolLoading) {
        const projectTitle = project?.projectTitle;
        // 비즈니스 정보 설정 (Step 1)
        if (project) {
          setBusinessDescriptionTitle(projectTitle);
        }

        // 활성 탭 설정 (기본값 1)
        setActiveTab(Math.min((toolStep ?? 1) + 1, 3));
        setToolSteps(toolStep ?? 1);

        // 비즈니스 정보 설정 (Step 1)
        if (designAnalysisBusinessInfo) {
          setBusinessDescription(designAnalysisBusinessInfo ?? "");
          setFileNames(designAnalysisFileNames);
        }

        // 완료된 단계 설정
        const completedStepsArray = [];
        for (let i = 1; i <= (toolStep ?? 1); i++) {
          completedStepsArray.push(i);
        }
        setCompletedSteps(completedStepsArray);

        // 페르소나 설정 (Step 2)
        if (
          Array.isArray(designAnalysisEmotionAnalysis) &&
          Array.isArray(selectedDesignAnalysisEmotionAnalysis)
        ) {
          // 이미 선택된 페르소나들의 인덱스 찾기
          const selectedIndices = (designAnalysisEmotionAnalysis ?? [])
            .map((persona, index) => {
              return (selectedDesignAnalysisEmotionAnalysis ?? []).some(
                (target) => target?.name === persona?.name
              )
                ? index
                : -1;
            })
            .filter((index) => index !== -1);

          // selectedPersonas 상태 업데이트
          setSelectedPersonas(selectedIndices);

          // 선택된 페르소나 데이터 설정
          const selectedPersonaData = selectedIndices
            .map((index) => designAnalysisEmotionAnalysis?.[index])
            .filter(Boolean);

          setSelectedDesignAnalysisEmotionAnalysis(selectedPersonaData);
        }

        // 추가된 조건 체크
        if (
          Object.keys(designAnalysisEmotionTarget).length === 0 &&
          !designAnalysisEmotionScale.length &&
          completedStepsArray.length === 2
        ) {
          // designAnalysisEmotionTarget이 빈 객체이고, designAnalysisEmotionScale이 빈 배열인 경우
          setActiveTab(2);
          setToolSteps(1);
          setCompletedSteps(completedStepsArray.slice(0, -1));
        } else {
          if (designAnalysisEmotionTarget) {
            setDesignAnalysisEmotionTarget(designAnalysisEmotionTarget ?? {});
          }

          if (designAnalysisEmotionScale) {
            setDesignAnalysisEmotionScale(designAnalysisEmotionScale ?? {});
          }
        }
        setToolStep(0);

        return;
      }
    };
    interviewLoading();
    setToolLoading(false);
  }, [toolLoading]);

  const handleCheckboxChange = (personaId) => {
    if (toolSteps >= 2) return;
    setSelectedPersonas((prev) => {
      // 하나만 선택되도록 변경, 다른 항목 선택 시 해당 항목으로 변경
      if (prev.includes(personaId)) {
        return []; // 이미 선택된 항목을 다시 클릭하면 선택 해제
      } else {
        return [personaId]; // 새 항목 선택
      }
    });
  };

  // 다음 단계로 이동하는 함수
  const handleNextStep = (currentStep) => {
    setCompletedSteps([...completedSteps, currentStep]);
    setActiveTab(currentStep + 1);
    setShowPopupError(false);
  };

  // 필수 필드가 모두 입력되었는지 확인하는 함수
  const isRequiredFieldsFilled = () => {
    return businessDescription.trim().length > 0 && uploadedFiles.length > 0;
  };

  // 비즈니스 설명 입력 핸들러
  const handleBusinessDescriptionChange = (e) => {
    const input = e.target.value;
    if (input.length <= 500) {
      setBusinessDescription(input);
    }
  };

  const handleSubmitBusinessInfo = async () => {
    setIsLoading(true);
    try {
      const timeStamp = new Date().getTime();

      // 비즈니스 데이터 추가
      const Data = {
        business: businessDescription,
        tool_id: "image_" + timeStamp,
        image: uploadedFiles[0],
      };

      setDesignAnalysisFileId(["image_" + timeStamp]);

      // API 요청
      const response = await InterviewXDesignEmotionAnalysisRequest(
        Data,
        isLoggedIn
      );
      if (
        !response?.response.design_emotion_analysis ||
        !Array.isArray(response.response.design_emotion_analysis) ||
        response.response.design_emotion_analysis.length === 0
      ) {
        setShowPopupError(true);
        return;
      }

      const responseToolId = await createToolOnServer(
        {
          projectId: project._id,
          type: "ix_design_emotion_analysis",
        },
        isLoggedIn
      );

      setToolId(responseToolId);
      setToolSteps(1);

      // 크레딧이 사용 가능한 상태면 사용 API 호출
      const creditUsePayload = {
        title: project.projectTitle,
        service_type: "디자인 감정 분석기",
        target: "",
        state: "use",
        mount: creditCreateTool,
      };

      await UserCreditUse(creditUsePayload, isLoggedIn);

      // 크레딧 사용 후 사용자 정보 새로고침

      const userCreditValue = await UserCreditInfo(isLoggedIn);
      // 전역 상태의 크레딧 정보 업데이트
      setUserCredits(userCreditValue);

      // API 응답에서 페르소나 데이터를 추출하여 atom에 저장
      setDesignAnalysisEmotionAnalysis(
        response.response.design_emotion_analysis
      );
      setDesignAnalysisBusinessInfo(businessDescription);
      setDesignAnalysisBusinessTitle(businessDescriptionTitle);
      // setDesignAnalysisUploadedFiles(uploadedFiles);
      setFileNames(uploadedFiles.map((file) => file.name));

      await updateToolOnServer(
        responseToolId,
        {
          completedStep: 1,
          designEmotionAnalysis: response.response.design_emotion_analysis,
          business: businessDescription,
          imageName: uploadedFiles.map((file) => ({
            id: "image_" + timeStamp,
            name: file.name,
          })),
        },
        isLoggedIn
      );

      handleNextStep(1);
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

  const handleSubmitPersonas = async () => {
    handleNextStep(2);
    setToolSteps(2);
    try {
      const selectedPersonaData = designAnalysisEmotionAnalysis.filter(
        (persona, index) => selectedPersonas.includes(index)
      );
      setSelectedDesignAnalysisEmotionAnalysis(selectedPersonaData);

      await updateToolOnServer(
        toolId,
        {
          completedStep: 2,
          designSelectedPersona: selectedPersonaData,
        },
        isLoggedIn
      );
      setIsLoadingReport(true);

      // 선택된 페르소나가 하나일 경우에만 시나리오 요청
      if (selectedPersonaData.length > 0) {
        const persona = selectedPersonaData[0]; // 첫 번째 페르소나 선택
        try {
          const apiRequestData = {
            business: designAnalysisBusinessInfo,
            design_emotion_selected_field: persona.name,
            design_emotion_analysis: persona,
          };

          let response = await InterviewXDesignEmotionTargetRequest(
            apiRequestData,
            isLoggedIn
          );

          const maxAttempts = 10;
          let attempt = 0;

          while (
            !response?.response?.design_emotion_target ||
            typeof response.response.design_emotion_target !== "object" ||
            Object.keys(response?.response?.design_emotion_target).length ===
              0 ||
            !response?.response?.design_emotion_target?.hasOwnProperty(
              "target_emotion"
            ) ||
            !response?.response?.design_emotion_target?.hasOwnProperty(
              "design_perspectives"
            ) ||
            !response?.response?.design_emotion_target?.hasOwnProperty(
              "designer_guidelines"
            )
          ) {
            if (attempt >= maxAttempts) {
              setShowPopupError(true);
              return;
            }

            response = await InterviewXDesignEmotionTargetRequest(
              apiRequestData,
              isLoggedIn
            );

            attempt++;
          }

          setDesignAnalysisEmotionTarget(
            response.response.design_emotion_target
          );

          const oceanData = {
            tool_id: designAnalysisFileId[0],
            business: designAnalysisBusinessInfo,
            design_emotion_selected_field: persona.name,
            design_emotion_target: response?.response?.design_emotion_target,
          };

          attempt = 0;
          let oceanResponse = null;

          while (
            !oceanResponse ||
            typeof oceanResponse.response.design_emotion_scale !== "object" ||
            Object.keys(oceanResponse?.response?.design_emotion_scale)
              .length === 0 ||
            !oceanResponse?.response?.design_emotion_scale?.hasOwnProperty(
              "conclusion"
            ) ||
            !oceanResponse?.response?.design_emotion_scale?.hasOwnProperty(
              "evaluation_analysis"
            ) ||
            !oceanResponse?.response?.design_emotion_scale?.hasOwnProperty(
              "sd_scale_analysis"
            )
          ) {
            if (attempt >= maxAttempts) {
              setShowPopupError(true);
              return;
            }

            oceanResponse = await InterviewXDesignEmotionScaleRequest(
              oceanData,
              isLoggedIn
            );

            attempt++;
          }
          setDesignAnalysisEmotionScale(
            oceanResponse.response.design_emotion_scale
          );

          await updateToolOnServer(
            toolId,
            {
              completedStep: 3,
              designEmotionTarget: response.response.design_emotion_target,
              designEmotionScale: oceanResponse.response.design_emotion_scale,
              designSelectedPersona: selectedPersonaData,
            },
            isLoggedIn
          );
        } catch (error) {}
      }

      // setToolStep(3);
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

  // 파일 업로드 핸들러
  const handleChangeStatus = ({ meta, file, remove }, status) => {
    // 20MB 크기 제한 체크
    const maxSize = 20 * 1024 * 1024; // 20MB in bytes
    if (file.size > maxSize && status !== "removed") {
      setShowPopupFileSize(true);
      remove();
      return;
    }

    // 파일 상태 업데이트
    if (status === "done" || status === "preparing" || status === "uploading") {
      setUploadedFiles((prev) => {
        // 이미 존재하는 파일이 아닌 경우에만 추가
        if (!prev.find((f) => f.name === file.name)) {
          setFileNames((prev) => [...prev, file.name]);
          return [...prev, file];
        }
        return prev;
      });
    } else if (status === "removed") {
      setUploadedFiles((prev) => prev.filter((f) => f.name !== file.name));
      setFileNames((prev) => prev.filter((name) => name !== file.name));
    }

    // 파일 크기를 KB 또는 MB 단위로 변환
    const size = file.size;
    const sizeStr =
      size > 1024 * 1024
        ? `${(size / (1024 * 1024)).toFixed(1)}MB`
        : `${(size / 1024).toFixed(1)}KB`;

    // setTimeout을 사용하여 DOM이 업데이트된 후 실행
    setTimeout(() => {
      const containers = document.querySelectorAll(".dzu-previewContainer");
      containers.forEach((container) => {
        if (!container.dataset.filename) {
          container.dataset.filename = file.name;
          container.dataset.size = sizeStr;
        }
      });
    }, 0);
  };

  const handleEditBusinessClick = () => {
    setIsEditingBusiness(true);
  };

  const handleSaveBusinessClick = () => {
    setIsEditingBusiness(false);
  };

  const handleUndoBusinessClick = () => {
    const originalText =
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

    setBusinessDescription(originalText);
  };

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("designanalysis")) {
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
                    이미지 업로드
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
                    디자인 분야 분석
                  </Body1>
                  <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    Design Sector
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
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    디자인 감성 분석
                  </Body1>
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    Sentiment Analysis
                  </Body1>
                </div>
              </TabButtonType5>
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
                    <AtomPersonaLoader message="이미지를 분석하고 있어요..." />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Image Upload</H3>
                      <Body3 color="gray800">
                        감성 분석을 원하시는 비즈니스 설명과 디자인 이미지를
                        업로드해주세요
                      </Body3>
                    </div>

                    <div className="content">
                      <TabContent5Item required>
                        <Title>
                          <Body1 color="gray700">비즈니스 설명</Body1>
                          {!isEditingBusiness ? (
                            <IconButton
                              onClick={handleEditBusinessClick}
                              disabled={toolSteps >= 1}
                            >
                              <img src={images.PencilSquare} alt="" />
                              <span>수정하기</span>
                            </IconButton>
                          ) : (
                            <IconButton onClick={handleSaveBusinessClick}>
                              <img src={images.FolderArrowDown} alt="" />
                              <span>저장하기</span>
                            </IconButton>
                          )}
                        </Title>

                        {!isEditingBusiness ? (
                          <ListBoxGroup>
                            <Body2 color="gray800" align="left">
                              {businessDescription}
                            </Body2>
                          </ListBoxGroup>
                        ) : (
                          <FormBox Large>
                            <CustomTextarea
                              Edit
                              rows={6}
                              placeholder="잠재고객을 도출하고 싶은 비즈니스에 대해서 설명해주세요 (예: 친환경 전기 자전거 공유 플랫폼 등)"
                              value={businessDescription}
                              onChange={(e) =>
                                setBusinessDescription(e.target.value)
                              }
                              status="valid"
                              disabled={toolSteps >= 1}
                            />
                            <EditButtonGroup>
                              <IconButton onClick={handleUndoBusinessClick}>
                                <img
                                  src={images.ClockCounterclockwise}
                                  alt=""
                                />
                                <span>이전으로 되돌리기</span>
                              </IconButton>
                            </EditButtonGroup>
                          </FormBox>
                        )}
                      </TabContent5Item>
                      <TabContent5Item required>
                        <div className="title">
                          <Body1 color="gray700">분석할 이미지 업로드</Body1>
                          <Body1 color="red">*</Body1>
                        </div>
                        <Dropzone
                          onChangeStatus={handleChangeStatus}
                          maxFiles={1}
                          multiple={true}
                          canRemove={true}
                          canRestart={false}
                          disabled={toolSteps >= 1}
                          accept="image/*"
                          maxSizeBytes={20 * 1024 * 1024}
                          inputWithFilesContent={
                            <>
                              <img src={images.ImagePrimary} alt="" />
                              {fileNames.length === 0 && (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  <Body2 color="gray700">
                                    이미지 첨부 또는
                                  </Body2>
                                  <Body2 color="primary">이미지 가져오기</Body2>
                                </div>
                              )}
                              {fileNames.length > 0 && (
                                <div>
                                  {fileNames.map((name, index) => (
                                    <Body2 key={index} color="gray700">
                                      {name}
                                    </Body2>
                                  ))}
                                </div>
                              )}
                            </>
                          }
                          inputContent={
                            <>
                              <img src={images.ImagePrimary} alt="" />
                              {fileNames.length === 0 && (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  <Body2 color="gray700">
                                    이미지 첨부 또는
                                  </Body2>
                                  <Body2 color="primary">이미지 가져오기</Body2>
                                </div>
                              )}
                              {fileNames.length > 0 && (
                                <div>
                                  {fileNames.map((name, index) => (
                                    <Body2 key={index} color="gray700">
                                      {name}
                                    </Body2>
                                  ))}
                                </div>
                              )}
                            </>
                          }
                          styles={StyledDropzone}
                        />
                      </TabContent5Item>
                    </div>

                    <Button
                      Other
                      Primary
                      Fill
                      Round
                      onClick={handleSubmitBusinessInfo}
                      disabled={!isRequiredFieldsFilled() || toolSteps >= 1}
                    >
                      다음
                    </Button>
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
                    <AtomPersonaLoader message="맞춤 페르소나를 찾고 있어요..." />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Design Sector Analysis</H3>
                      <Body3 color="gray800">
                        업로드된 이미지를 기반으로 가장 적합한 디자인 분야를
                        분류했습니다
                      </Body3>
                    </div>

                    <div className="content">
                      <CardGroupWrap column style={{ marginBottom: "140px" }}>
                        {designAnalysisEmotionAnalysis.length > 0 ? (
                          designAnalysisEmotionAnalysis.map(
                            (persona, index) => {
                              return (
                                <MoleculeDesignItem
                                  FlexStart
                                  key={index}
                                  id={index}
                                  title={persona.name}
                                  subtitle={persona.reason}
                                  isSelected={selectedPersonas.includes(index)}
                                  onSelect={() => handleCheckboxChange(index)}
                                  disabled={toolSteps >= 2 ? true : false}
                                />
                              );
                            }
                          )
                        ) : (
                          <Body3 color="gray700">데이터가 없습니다.</Body3>
                        )}
                      </CardGroupWrap>

                      <BottomBar W100>
                        <Body2
                          color={
                            selectedPersonas.length === 0
                              ? "gray800"
                              : "gray800"
                          }
                        >
                          가장 적합하다고 생각하시는 디자인 분야를 선택해주세요
                        </Body2>
                        <Button
                          Large
                          Primary
                          Round
                          Fill
                          disabled={
                            toolSteps >= 2 || selectedPersonas.length === 0
                          }
                          onClick={handleSubmitPersonas}
                        >
                          다음
                          <images.ChevronRight
                            width="20"
                            height="20"
                            color={palette.white}
                          />
                        </Button>
                      </BottomBar>
                    </div>
                  </>
                )}
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
                    <AtomPersonaLoader message="결과보고서를 작성하고 있습니다" />
                  </div>
                ) : (
                  <>
                    <BgBoxItem primaryLightest>
                      <H3 color="gray800">디자인 감성 분석</H3>
                      <Body3 color="gray800">
                        디자인이 사용자에게 전달하는 감정을 분석하고, 시각적
                        커뮤니케이션 효과를 극대화하세요
                      </Body3>
                    </BgBoxItem>

                    <InsightAnalysis>
                      <div className="title">
                        <div>
                          <TabWrapType4>
                            <TabButtonType4
                              active={activeDesignTab === "emotion"}
                              onClick={() => setActiveDesignTab("emotion")}
                            >
                              디자인 목표 감성
                            </TabButtonType4>
                            <TabButtonType4
                              active={activeDesignTab === "scale"}
                              onClick={() => setActiveDesignTab("scale")}
                            >
                              감정 스케일 매핑
                            </TabButtonType4>
                          </TabWrapType4>
                        </div>
                        {/* <Button Primary onClick={() => setShowPopupSave(true)}>
                          리포트 저장하기
                        </Button> */}
                      </div>
                    </InsightAnalysis>

                    <InsightAnalysis>
                      <div className="title">
                        <H4 color="gray800" align="left">
                          {activeDesignTab === "emotion" ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: `${project?.projectTitle}가(${selectedDesignAnalysisEmotionAnalysis?.[0]?.name})
                            에서 궁극적으로 달성하고자하는 주요 목표 감성은 ${designAnalysisEmotionTarget?.target_emotion} `,
                              }}
                            />
                          ) : (
                            `${designAnalysisEmotionScale?.conclusion}`
                          )}
                        </H4>
                      </div>

                      <div className="content">
                        {activeDesignTab === "emotion" ? (
                          <Body3 color="gray700">
                            {designAnalysisEmotionTarget?.designer_guidelines}
                          </Body3>
                        ) : (
                          <>
                            <Body3 color="gray700">
                              강점 :{" "}
                              {
                                designAnalysisEmotionScale?.evaluation_analysis
                                  ?.strengths
                              }
                            </Body3>
                            <Body3 color="gray700">
                              약점 및 개선 방향:{" "}
                              {
                                designAnalysisEmotionScale?.evaluation_analysis
                                  ?.weaknesses
                              }
                            </Body3>
                          </>
                        )}
                      </div>
                    </InsightAnalysis>

                    {activeDesignTab === "emotion" && (
                      <InsightAnalysis style={{ marginBottom: "240px" }}>
                        <Sub3 color="gray700" align="left">
                          💡 %는 해당 비즈니스에서 차지하는 중요도를 의미합니다.
                        </Sub3>
                        <CardGroupWrap column $isExpanded={state.isExpanded}>
                          {designAnalysisEmotionTarget?.design_perspectives?.map(
                            (perspective, index) => (
                              <AnalysisItem
                                business={designAnalysisBusinessInfo}
                                key={index}
                                percentage={perspective.weight + "%"}
                                title={perspective.name}
                                subtitle={perspective.features
                                  .map((feature) => feature.title)
                                  .join(", ")}
                                details={perspective}
                              />
                            )
                          )}
                        </CardGroupWrap>
                      </InsightAnalysis>
                    )}

                    {activeDesignTab === "scale" && (
                      <InsightAnalysis style={{ marginBottom: "240px" }}>
                        <OCEANRangeWrap report>
                          {/* OCEAN 값 슬라이더 */}
                          {designAnalysisEmotionScale?.sd_scale_analysis?.map(
                            (item, index) => (
                              <div key={index}>
                                <Body3 color="gray800" align="right">
                                  {item.opposite_emotion}
                                </Body3>
                                <RangeSlider
                                  type="range"
                                  min="1"
                                  max="7"
                                  step="1"
                                  value={item.score}
                                  // disabled={true}
                                  // style={{ flex: "2" }}
                                />
                                <Body3 color="gray800" align="left">
                                  {item.target_emotion}
                                </Body3>
                              </div>
                            )
                          )}
                        </OCEANRangeWrap>
                      </InsightAnalysis>
                    )}

                    {/* <Button
                      Small
                      Primary
                      onClick={() => setShowPopupSave(true)}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      리포트 저장하기
                    </Button> */}
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
            title="디자인 감성 분석기"
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
            title="디자인 감성 분석기"
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
            title="디자인 감성 분석기"
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

export default PageDesignAnalysis;

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
