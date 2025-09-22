//디자인 적합성성 분석기기
import React, { useEffect, useState, useRef, useCallback } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../assets/styles/Palette";
import AtomPersonaLoader from "../../../Global/atoms/AtomPersonaLoader";
import OrganismIncNavigation from "../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../Global/molecules/MoleculeHeader";

import { Button } from "../../../../assets/styles/ButtonStyle";
import { FormBox, CustomTextarea } from "../../../../assets/styles/InputStyle";
import PopupWrap from "../../../../assets/styles/Popup";
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
  ListBoxItem,
  ListText,
  ListTitle,
  ListSubtitle,
  PercentBadge,
  UlList,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import {
  IS_LOGGED_IN,
  TARGET_DISCOVERY_INFO,
  TARGET_DISCOVERY_PERSONA,
  SELECTED_TARGET_DISCOVERY_PERSONA,
  TARGET_DISCOVERY_SCENARIO,
  TARGET_DISCOVERY_FINAL_REPORT,
  TOOL_ID,
  TOOL_STEP,
  SELECTED_TARGET_DISCOVERY_SCENARIO,
  TOOL_LOADING,
} from "../../../../pages/AtomStates";
import images from "../../../../assets/styles/Images";
import {
  H4,
  H3,
  H5,
  Sub1,
  Sub2,
  Sub3,
  Body1,
  Body2,
  Body2_1,
  Body3,
  Caption1,
} from "../../../../assets/styles/Typography";
import MoleculeToolPersonaCard from "../molecules/MoleculeToolPersonaCard";
import {
  InterviewXTargetDiscoveryPersonaRequest,
  InterviewXTargetDiscoveryScenarioRequest,
  InterviewXTargetDiscoveryFinalReportRequest,
  createToolOnServer,
  updateToolOnServer,
} from "../../../../utils/indexedDB";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import RadarChart from "../../../../components/Charts/RadarChart";

const PageDesignSuitability = () => {
  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [targetDiscoveryInfo, setTargetDiscoveryInfo] = useAtom(
    TARGET_DISCOVERY_INFO
  );
  const [targetDiscoveryPersona, setTargetDiscoveryPersona] = useAtom(
    TARGET_DISCOVERY_PERSONA
  );
  const [selectedTargetDiscoveryPersona, setSelectedTargetDiscoveryPersona] =
    useAtom(SELECTED_TARGET_DISCOVERY_PERSONA);
  const [targetDiscoveryScenario, setTargetDiscoveryScenario] = useAtom(
    TARGET_DISCOVERY_SCENARIO
  );
  const [targetDiscoveryFinalReport, setTargetDiscoveryFinalReport] = useAtom(
    TARGET_DISCOVERY_FINAL_REPORT
  );
  const [selectedTargetDiscoveryScenario, setSelectedTargetDiscoveryScenario] =
    useAtom(SELECTED_TARGET_DISCOVERY_SCENARIO);

  const [showPopup, setShowPopup] = useState(false);
  const [showPopupMore, setShowPopupMore] = useState(false);
  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [selectedPersonas, setSelectedPersonas] = useState([]);
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [selectedInterviewType, setSelectedInterviewType] = useState(null);
  const [selectedInterviewPurpose, setSelectedInterviewPurpose] =
    useState(null);
  const [activeTab1, setActiveTab1] = useState("personaInfo");
  const [contactForm, setContactForm] = useState({
    email: "",
    purpose: "",
    content: "",
  });
  const [dropUp, setDropUp] = useState(false);
  const selectBoxRef = useRef(null);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [targetCustomer, setTargetCustomer] = useState("");
  const [personaData, setPersonaData] = useState({
    personaInfo: "",
    personaScenario: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingScenario, setIsLoadingScenario] = useState(false); // 시나리오 단계용 로딩 상태 추가
  const [specificSituation, setSpecificSituation] = useState("");
  const [loadingPersonas, setLoadingPersonas] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = (key) => {
    setState((prevState) => ({ ...prevState, [key]: !prevState[key] }));
  };

  const [state, setState] = useState({
    isExpanded: false,
    showQuestions: false,
  });

  // OCEAN 값들을 관리하기 위한 상태
  const [oceanValues, setOceanValues] = useState({
    Comfortable: 3, // 편안한
    Satisfying: 3, // 만족스러운
    Trustworthy: 3, // 신뢰가는
    Anticipated: 3, // 기대되는
    Attractive: 3, // 매력적인
    Practical: 3, // 실용적인
    Beautiful: 3, // 아름다운
    Efficient: 3, // 효율적인
    Easy: 3, // 사용하기 쉬운
  });

  // OCEAN 무시 여부를 관리하는 상태
  const [ignoreOcean, setIgnoreOcean] = useState(false);

  const calculateDropDirection = () => {
    if (selectBoxRef.current) {
      const rect = selectBoxRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropDownHeight = 200; // 예상되는 드롭다운 높이

      setDropUp(spaceBelow < dropDownHeight && spaceAbove > spaceBelow);
    }
  };

  const handleSelectBoxClick = () => {
    if (toolStep >= 1) return;
    calculateDropDirection();
    setIsSelectBoxOpen(!isSelectBoxOpen);
  };

  const handlePurposeSelect = (purpose) => {
    setSelectedPurpose(purpose);
    handleContactInputChange("purpose", purpose);
    setIsSelectBoxOpen(false);
  };

  const handleContactInputChange = (field, value) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelectPersona = () => {
    if (selectedPersonas.length > 0) {
      setSelectedInterviewType("multiple");
      setSelectedInterviewPurpose("product_experience_new");
    }
  };

  //저장되었던 인터뷰 로드
  useEffect(() => {
    const interviewLoading = async () => {
      if (toolLoading) {
        // 활성 탭 설정 (기본값 1)
        setActiveTab(Math.min((toolStep ?? 1) + 1, 4));

        // 비즈니스 정보 설정 (Step 1)
        if (targetDiscoveryInfo) {
          setBusinessDescription(targetDiscoveryInfo?.business ?? "");
          setTargetCustomer(targetDiscoveryInfo?.target ?? "");
          setSpecificSituation(targetDiscoveryInfo?.specific_situation ?? "");
          setSelectedPurpose(targetDiscoveryInfo?.country ?? "");
        }

        // 완료된 단계 설정
        const completedStepsArray = [];
        for (let i = 1; i <= (toolStep ?? 1); i++) {
          completedStepsArray.push(i);
        }
        setCompletedSteps(completedStepsArray);

        // 페르소나 설정 (Step 2)
        if (
          Array.isArray(targetDiscoveryPersona) &&
          Array.isArray(selectedTargetDiscoveryPersona)
        ) {
          // 이미 선택된 페르소나들의 인덱스 찾기
          const selectedIndices = (targetDiscoveryPersona ?? [])
            .map((persona, index) => {
              // targetDiscoveryScenario에 있는 페르소나만 선택
              return (targetDiscoveryScenario ?? []).some(
                (scenario) => scenario?.title === persona?.title
              )
                ? index
                : -1;
            })
            .filter((index) => index !== -1);

          // selectedPersonas 상태 업데이트
          setSelectedPersonas(selectedIndices);

          // 선택된 페르소나 데이터 설정
          const selectedPersonaData = selectedIndices
            .map((index) => targetDiscoveryPersona?.[index])
            .filter(Boolean);

          setSelectedTargetDiscoveryPersona(selectedPersonaData);
        }

        // 시나리오 설정 (Step 3)
        if (
          Array.isArray(targetDiscoveryScenario) &&
          Array.isArray(targetDiscoveryPersona)
        ) {
          const matchedScenarioData = (targetDiscoveryScenario ?? [])
            .map((scenario) => {
              const matchedPersona = (targetDiscoveryPersona ?? []).find(
                (persona) => persona?.title === scenario?.title
              );

              if (!matchedPersona) return null;

              return {
                ...(matchedPersona ?? {}),
                title: scenario?.title ?? "",
                content: matchedPersona?.content ?? {},
                keywords: matchedPersona?.content?.keywords ?? [],
                scenario: scenario ?? {},
              };
            })
            .filter((item) => item?.title);

          setSelectedTargetDiscoveryScenario(matchedScenarioData);
        }

        // 최종 리포트 설정 (Step 4)
        if (targetDiscoveryFinalReport) {
          setTargetDiscoveryFinalReport(targetDiscoveryFinalReport ?? {});
        }

        return;
      }
    };
    interviewLoading();
    setToolLoading(false);
  }, [toolLoading]);

  const handleCheckboxChange = (personaId) => {
    if (toolStep >= 2) return;
    setSelectedPersonas((prev) => {
      if (prev.includes(personaId)) {
        return prev.filter((id) => id !== personaId);
      } else {
        // 최대 5개까지만 선택 가능
        if (prev.length >= 5) return prev;
        return [...prev, personaId];
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
    // console.log('Business Description:', businessDescription.trim());
    // console.log('Uploaded Files:', uploadedFiles);
    return businessDescription.trim().length > 0 && uploadedFiles.length > 0;
  };

  // 비즈니스 설명 입력 핸들러
  const handleBusinessDescriptionChange = (e) => {
    const input = e.target.value;
    if (input.length <= 150) {
      setBusinessDescription(input);
    }
  };

  // 타겟 고객 입력 핸들러
  const handleTargetCustomerChange = (e) => {
    setTargetCustomer(e.target.value);
  };

  const handleSubmitBusinessInfo = async () => {
    try {
      setIsLoading(true);

      const businessData = {
        business: businessDescription,
        target: targetCustomer,
        specific_situation: specificSituation,
        country: selectedPurpose,
      };

      const response = await InterviewXTargetDiscoveryPersonaRequest(
        businessData,
        isLoggedIn
      );

      if (
        !response?.response.target_discovery_persona ||
        !Array.isArray(response.response.target_discovery_persona) ||
        response.response.target_discovery_persona.length === 0
      ) {
        setShowPopupError(true);
        return;
      }
      const responseToolId = await createToolOnServer(
        {
          type: "ix_target_discovery_persona",
          completed_step: 1,
          target_discovery_persona: response.response.target_discovery_persona,
          ...businessData,
        },
        isLoggedIn
      );
      setToolId(responseToolId);
      setToolStep(1);
      // API 응답에서 페르소나 데이터를 추출하여 atom에 저장
      setTargetDiscoveryPersona(
        response.response.target_discovery_persona || []
      );
      setTargetDiscoveryInfo(businessData);

      // API 호출 성공시 다음 단계로 이동
      handleNextStep(1);
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting business info:", error);
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
    try {
      const selectedPersonaData = targetDiscoveryPersona.filter(
        (persona, index) => selectedPersonas.includes(index)
      );
      setSelectedTargetDiscoveryPersona(selectedPersonaData);

      let allScenarios = []; // 모든 시나리오를 저장할 배열
      // 각 페르소나에 대해 개별적으로 시나리오 요청 및 상태 업데이트
      for (const persona of selectedPersonaData) {
        // 현재 페르소나의 로딩 상태를 true로 설정
        setLoadingPersonas((prev) => ({
          ...prev,
          [persona.title]: true,
        }));

        try {
          const isDuplicate = selectedTargetDiscoveryPersona.some(
            (existingPersona) => existingPersona.title === persona.title
          );

          if (!isDuplicate) {
            const apiRequestData = {
              business: targetDiscoveryInfo.business,
              target_discovery_persona: persona,
              specific_situation: targetDiscoveryInfo.specific_situation,
              country: targetDiscoveryInfo.country,
            };

            const response = await InterviewXTargetDiscoveryScenarioRequest(
              apiRequestData,
              isLoggedIn
            );

            if (
              !response?.response?.target_discovery_scenario
                ?.potential_customer_info ||
              !response?.response?.target_discovery_scenario?.usage_scenario
            ) {
              // console.log("🚀 ~ handleSubmitPersonas ~ response:", response);
              setShowPopupError(true);
              return;
            }

            // 개별 시나리오 데이터 업데이트
            setTargetDiscoveryScenario((prev) => {
              const currentScenarios = prev || [];
              return [
                ...currentScenarios,
                response?.response?.target_discovery_scenario,
              ].filter(Boolean);
            });

            // 현재 페르소나의 로딩 상태를 false로 설정
            setLoadingPersonas((prev) => ({
              ...prev,
              [persona.title]: false,
            }));

            // 개별 시나리오 데이터를 selectedTargetDiscoveryScenario에 추가
            setSelectedTargetDiscoveryScenario((prev) => [
              ...(prev || []),
              {
                ...persona,
                scenario: response.response.target_discovery_scenario,
              },
            ]);
            allScenarios.push({
              ...persona, // 기존 페르소나 데이터 유지
              scenario: response.response.target_discovery_scenario, // 시나리오 데이터 추가
            });
          }
        } catch (error) {
          // 에러 발생 시 현재 페르소나의 로딩 상태를 false로 설정
          setLoadingPersonas((prev) => ({
            ...prev,
            [persona.title]: false,
          }));
          console.error(`Error processing persona ${persona.title}:`, error);
        }
      }

      setSelectedTargetDiscoveryScenario(allScenarios);
      // 모든 시나리오를 서버에 저장
      await updateToolOnServer(
        toolId,
        {
          completed_step: 2,
          target_discovery_scenario: allScenarios,
          updateDate: new Date().toLocaleString("ko-KR", {
            timeZone: "Asia/Seoul",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        },
        isLoggedIn
      );

      setToolStep(2);
    } catch (error) {
      console.error("Error submitting personas:", error);
      // 에러 발생 시 모든 로딩 상태 초기화
      setLoadingPersonas({});
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
    }
  };

  const handleSubmitScenario = async () => {
    try {
      setIsLoadingScenario(true);
      handleNextStep(3);

      const scenarioData = {
        business: targetDiscoveryInfo.business,
        target: targetDiscoveryInfo.target,
        target_discovery_persona: selectedTargetDiscoveryPersona,
        target_discovery_scenario: targetDiscoveryScenario,
      };
      // console.log(
      //   "🚀 ~ handleSubmitScenario ~ scenarioData.targetDiscoveryScenario:",
      //   targetDiscoveryScenario
      // );

      const response = await InterviewXTargetDiscoveryFinalReportRequest(
        scenarioData,
        isLoggedIn
      );
      // console.log("🚀 ~ handleSubmitScenario ~ response:", response);

      if (
        !response?.response?.target_discovery_final_report?.potential_rank_1
          ?.title ||
        !response?.response?.target_discovery_final_report?.potential_rank_1
          ?.discovery_criteria ||
        !response?.response?.target_discovery_final_report?.potential_rank_1
          ?.selection_criteria
      ) {
        setIsLoadingScenario(false);
        return;
      }
      setTargetDiscoveryFinalReport(
        response.response.target_discovery_final_report
      );

      // 모든 시나리오를 한번에 저장
      await updateToolOnServer(
        toolId,
        {
          completed_step: 4,
          target_discovery_final_report:
            response.response.target_discovery_final_report,
          updateDate: new Date().toLocaleString("ko-KR", {
            timeZone: "Asia/Seoul",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        },
        isLoggedIn
      );
      setToolStep(3);

      setIsLoadingScenario(false);
      handleNextStep(3);
    } catch (error) {
      console.error("Error submitting scenario:", error);
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
      setIsLoadingScenario(false);
    }
  };

  const getButtonText = (persona, hasScenarioData, isLoading) => {
    if (isLoading) {
      return "호출중";
    } else if (hasScenarioData) {
      return "자세히";
    }
    return "대기중";
  };

  // 파일 업로드 핸들러
  const handleChangeStatus = ({ meta, file }, status) => {
    // console.log(status, meta, file);

    // 파일 상태 업데이트
    if (status === "done" || status === "preparing" || status === "uploading") {
      setUploadedFiles((prev) => {
        // 이미 존재하는 파일이 아닌 경우에만 추가
        if (!prev.find((f) => f.name === file.name)) {
          return [...prev, file];
        }
        return prev;
      });
    } else if (status === "removed") {
      setUploadedFiles((prev) => prev.filter((f) => f.name !== file.name));
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

  // 업로드 파라미터 설정
  const getUploadParams = () => {
    return { url: "/" }; // 실제 업로드 URL로 변경 필요
  };

  // 파일 제출 핸들러
  const handleSubmit = (files) => {
    const validFiles = files.filter((f) => f.meta.status === "done");
    setUploadedFiles(validFiles.map((f) => f.file));
  };

  // OCEAN 값 변경을 처리하는 핸들러
  const handleOceanChange = (trait, value) => {
    if (!ignoreOcean) {
      const numValue = parseFloat(value);
      // 값이 3에 가까울 때 자동으로 3으로 스냅
      const snapValue = Math.abs(numValue - 3) < 0.2 ? 3 : numValue;

      setOceanValues((prev) => ({
        ...prev,
        [trait]: snapValue,
      }));
    }
  };

  // OCEAN 값들을 초기화하는 함수
  const resetOceanValues = () => {
    setOceanValues({
      openness: 0.5,
      conscientiousness: 0.5,
      extraversion: 0.5,
      agreeableness: 0.5,
      neuroticism: 0.5,
    });
  };

  // OCEAN 값들을 서버에 저장하는 함수
  const saveOceanValues = async () => {
    try {
      // API 호출 로직
      const response = await fetch("/api/save-ocean", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(oceanValues),
      });

      if (!response.ok) {
        throw new Error("OCEAN 값 저장에 실패했습니다");
      }

      // 성공 처리
      // console.log('OCEAN 값이 성공적으로 저장되었습니다');
    } catch (error) {
      console.error("OCEAN 값 저장 중 오류 발생:", error);
    }
  };

  const [activeDesignTab, setActiveDesignTab] = useState("emotion"); // 'emotion' 또는 'scale'

  // 레이더 차트 데이터
  const chartData = {
    strength: Math.round(oceanValues.Trustworthy * 16.67), // 6점 -> 100점 변환 (100/6)
    luck: Math.round(oceanValues.Anticipated * 16.67), // 6점 -> 100점 변환
    intelligence: Math.round(oceanValues.Attractive * 16.67), // 6점 -> 100점 변환
    charisma: Math.round(oceanValues.Beautiful * 16.67), // 6점 -> 100점 변환
    dexterity: Math.round(oceanValues.Efficient * 16.67), // 6점 -> 100점 변환
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
                isActive={activeTab >= 1}
                onClick={() => setActiveTab(1)}
              >
                <span>01</span>
                <div className="text">
                  <Body1 color={activeTab >= 1 ? "gray800" : "gray300"}>
                    이미지 업로드
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 2}
                onClick={() => completedSteps.includes(1) && setActiveTab(2)}
                disabled={!completedSteps.includes(1)}
              >
                <span>02</span>
                <div className="text">
                  <Body1 color={activeTab >= 2 ? "gray800" : "gray300"}>
                    이미지 평가
                  </Body1>
                  <Body1 color={activeTab >= 2 ? "gray800" : "gray300"}>
                    Image Evaluation
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 3}
                onClick={() => completedSteps.includes(2) && setActiveTab(3)}
                disabled={!completedSteps.includes(2)}
              >
                <span>03</span>
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray800" : "gray300"}>
                    페르소나 최적화
                  </Body1>
                  <Body1 color={activeTab >= 3 ? "gray800" : "gray300"}>
                    Persona Optimization
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
                    <AtomPersonaLoader message="잠재 고객을 분석하고 있어요..." />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Image Upload</H3>
                      <Body3 color="gray800">
                        적합성 분석을 원하시는 비즈니스 설명과 디자인 이미지를
                        업로드해주세요
                      </Body3>
                    </div>

                    <div className="content">
                      <TabContent5Item required>
                        <div className="title">
                          <Body1 color="gray700">비즈니스 설명</Body1>
                          <Body1 color="red">*</Body1>
                        </div>
                        <FormBox Large>
                          <CustomTextarea
                            disabled={toolStep >= 1}
                            Edit
                            rows={4}
                            placeholder="비즈니스에 대해서 설명해주세요 (예: 친환경 전기 자전거 공유 플랫폼 등)"
                            onChange={handleBusinessDescriptionChange}
                            value={businessDescription}
                            maxLength={150}
                            status="valid"
                          />
                          <Body2 color="gray300" align="right">
                            {businessDescription.length} / 150
                          </Body2>
                        </FormBox>
                      </TabContent5Item>

                      <TabContent5Item required>
                        <div className="title">
                          <Body1 color="gray700">분석할 이미지 업로드</Body1>
                          <Body1 color="red">*</Body1>
                        </div>
                        <Dropzone
                          onChangeStatus={handleChangeStatus}
                          onSubmit={handleSubmit}
                          getUploadParams={getUploadParams}
                          maxFiles={3}
                          multiple={true}
                          canRemove={true}
                          canRestart={false}
                          accept="image/*"
                          inputWithFilesContent={
                            <>
                              <img src={images.ImagePrimary} alt="" />
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                <Body2 color="gray700">이미지 첨부 또는</Body2>
                                <Body2 color="primary">이미지 가져오기</Body2>
                              </div>
                            </>
                          }
                          inputContent={
                            <>
                              <img src={images.ImagePrimary} alt="" />
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                <Body2 color="gray700">이미지 첨부 또는</Body2>
                                <Body2 color="primary">이미지 가져오기</Body2>
                              </div>
                            </>
                          }
                          styles={StyledDropzone}
                          submitButtonContent="업로드"
                        />
                      </TabContent5Item>
                    </div>

                    <Button
                      Other
                      Primary
                      Fill
                      Round
                      onClick={handleSubmitBusinessInfo}
                      disabled={!isRequiredFieldsFilled() || toolStep >= 1}
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
                      <H3 color="gray800">Image Evaluation</H3>
                      <Body3 color="gray800">
                        업로드된 이미지의 시각적 요소를 종합적으로 분석하여
                        효과성을 평가했습니다.
                      </Body3>
                    </div>

                    <div className="content">
                      <ChartWrap>
                        <RadarChart data={chartData} width={480} height={450} />

                        <CardGroupWrap
                          column
                          $isExpanded={state.isExpanded}
                          style={{ marginBottom: "140px" }}
                        >
                          <ListBoxItem FlexStart>
                            <PercentBadge primary>
                              <Caption1>5점</Caption1>
                            </PercentBadge>

                            <ListText Small>
                              <ListTitle>
                                <Sub1 color="gray800" align="left">
                                  브랜드 일관성
                                </Sub1>
                              </ListTitle>
                              <ListSubtitle>
                                <Sub3 color="gray500" align="left">
                                  브랜드 로고의 위치와 크기를 조정하고, 핵심
                                  가치를 나타내는 이미지를 추가하여 브랜드
                                  일관성을 강화할 수 있습니다
                                </Sub3>
                              </ListSubtitle>
                            </ListText>

                            <ToggleButton
                              className="toggleButton"
                              $isExpanded={state.isExpanded}
                              onClick={() => handleToggle("isExpanded")}
                            />

                            {state.isExpanded && (
                              <ToggleContent $isExpanded={state.isExpanded}>
                                <div>
                                  <ul>
                                    <li>
                                      <Body3 color="gray800" align="left">
                                        긍정적 측면 : 이미지의 색상, 폰트,
                                        레이아웃이 전반적으로 깔끔하고 정돈된
                                        느낌을 주어 전문적인 이미지를
                                        연출합니다. "MAN AESTHETIC" 텍스트는
                                        브랜드의 성격을 명확히 드러냅니다.
                                        모델의 깨끗한 피부는 남성 피부 관리에
                                        대한 전문성을 시각적으로 강조합니다.
                                      </Body3>
                                    </li>
                                    <li>
                                      <Body3 color="gray800" align="left">
                                        개선점 : 브랜드 로고가 작고, 브랜드명을
                                        명확히 인식하기 어렵습니다. 브랜드의
                                        핵심 가치를 시각적으로 더 구체화할 수
                                        있는 요소 (예: 특정 시술 장면, 신뢰감을
                                        주는 이미지 등)가 부족합니다.
                                      </Body3>
                                    </li>
                                  </ul>
                                </div>
                              </ToggleContent>
                            )}
                          </ListBoxItem>
                        </CardGroupWrap>
                      </ChartWrap>

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
                            selectedPersonas.length === 0 || toolStep >= 2
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
                {isLoadingScenario ? (
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
                      <H3 color="gray800">페르소나별 디자인 최적화</H3>
                      <Body3 color="gray800">
                        페르소나에 최적화된 디자인 전략으로 더욱 직관적인
                        결과물을 만들어 보세요
                      </Body3>
                    </BgBoxItem>

                    <InsightAnalysis>
                      <div className="title">
                        <H4 color="gray800" align="left">
                          현재 이미지는 20대 후반 ~ 40대 남성을 타겟으로 하는 데
                          가장 적합합니다.
                          <br />
                          하지만 각 타겟 그룹의 특징을 고려하여 이미지, 카피,
                          CTA, 가격 전략 등을 다르게 구성해야 합니다.
                        </H4>
                      </div>

                      <div className="content">
                        <ReportContent>
                          <div>
                            <Body1 color="gray700" align="left">
                              주요 개선 방향
                            </Body1>
                            <UlList Disc>
                              <li>
                                타겟 맞춤형 이미지 : 각 그룹의 관심사를 반영하여
                                모델, 배경, 톤, 스타일 등을 변경
                              </li>
                              <li>
                                구체적인 정보 제공 : 제품/서비스 내용, 가격,
                                혜택, 시술 후기, 비포/애프터 사진 등
                              </li>
                              <li>
                                강력한 CTA : 각 그룹에 맞는 행동 유도 (상담
                                신청, 예약, 구매 등)
                              </li>
                              <li>
                                다양한 채널 활용 : 각 그룹이 주로 사용하는 채널
                                (SNS, 웹사이트, 오프라인 등)에 맞는 광고 제작
                              </li>
                              <li>
                                A/B 테스트 : 다양한 버전의 광고를 제작하여
                                효과를 비교 분석하고, 지속적으로 개선
                              </li>
                            </UlList>
                          </div>

                          <div>
                            <Body1 color="gray700" align="left">
                              주요 이미지 개선 가이드{" "}
                            </Body1>
                            <UlList Disc>
                              <li>
                                모델 : 깨끗하고, 건강한 피부를 가진 남성 모델
                                (연령대 고려 필요)
                              </li>
                              <li>
                                배경 : 깔끔하고, 전문적인 느낌의 배경 (색상,
                                레이아웃)
                              </li>
                              <li>
                                텍스트 : 간결하고 명확한 메시지 전달 (폰트,
                                크기, 색상 등 고려 필요)
                              </li>
                              <li>
                                시각 요소 : 시선 유도, 시술 관련 이미지,
                                긍정적인 결과 암시
                              </li>
                              <li>브랜드 로고 : 명확하게 노출</li>
                              <li>
                                CTA : 명확하고 눈에 띄는 버튼 또는 문구 추가
                                필요
                              </li>
                            </UlList>
                          </div>
                        </ReportContent>
                      </div>
                    </InsightAnalysis>

                    <InsightAnalysis>
                      <CardGroupWrap column $isExpanded={state.isExpanded}>
                        <ListBoxItem FlexStart>
                          <PercentBadge primary>
                            <Caption1>적합</Caption1>
                          </PercentBadge>

                          <ListText Small>
                            <ListTitle>
                              <Sub1 color="gray800" align="left">
                                20대 남성 (피부 고민 시작)
                              </Sub1>
                            </ListTitle>
                            <ListSubtitle>
                              <Sub3 color="gray500" align="left">
                                외모 관리, 패션, 자기 계발, 소셜 미디어 관심사의
                                내용을 줄글로 입력
                              </Sub3>
                            </ListSubtitle>
                          </ListText>

                          <ToggleButton
                            className="toggleButton"
                            $isExpanded={state.isExpanded}
                            onClick={() => handleToggle("isExpanded")}
                          />

                          {state.isExpanded && (
                            <ToggleContent $isExpanded={state.isExpanded}>
                              <Body3 color="gray700" align="left">
                                광고 상품에 대한 기대 요소를 줄글로 나타냅니다.
                                광고 상품에 대한 기대 요소를 줄글로 나타냅니다.
                                광고 상품에 대한 기대 요소를 줄글로 나타냅니다.
                                광고 상품에 대한 기대 요소를 줄글로 나타냅니다.
                                광고 상품에 대한 기대 요소를 줄글로 나타냅니다.
                                광고 상품에 대한 기대 요소를 줄글로 나타냅니다.
                              </Body3>

                              <div className="bgContent">
                                <div>
                                  <Body2_1 color="gray800" align="left">
                                    디자인 개선 방향
                                  </Body2_1>
                                  <ul>
                                    <li>
                                      <Body3 color="gray800" align="left">
                                        좀 더 트렌디하고, 밝고 활기찬 느낌으로
                                        변경 필요
                                      </Body3>
                                    </li>
                                    <li>
                                      <Body3 color="gray800" align="left">
                                        시술 후 긍정적 변화를 강조하는 이미지
                                        추가 필요 (예: 톤 개선, 피부결 개선)
                                      </Body3>
                                    </li>
                                    <li>
                                      <Body3 color="gray800" align="left">
                                        소셜 미디어 친화적인 디자인 (세로형,
                                        릴스/스토리 형식) 추가
                                      </Body3>
                                    </li>
                                    <li>
                                      <Body3 color="gray800" align="left">
                                        합리적인 가격 강조
                                      </Body3>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </ToggleContent>
                          )}
                        </ListBoxItem>

                        <ListBoxItem FlexStart>
                          <PercentBadge green>
                            <Caption1>적합</Caption1>
                          </PercentBadge>

                          <ListText Small>
                            <ListTitle>
                              <Sub1 color="gray800" align="left">
                                10대 후반 남성 (외모 관심 증가)
                              </Sub1>
                            </ListTitle>
                            <ListSubtitle>
                              <Sub3 color="gray500" align="left">
                                외모 관리, 패션, 자기 계발, 소셜 미디어 관심사의
                                내용을 줄글로 입력
                              </Sub3>
                            </ListSubtitle>
                          </ListText>

                          <ToggleButton
                            className="toggleButton"
                            $isExpanded={state.isExpanded}
                            onClick={() => handleToggle("isExpanded")}
                          />

                          {state.isExpanded && (
                            <ToggleContent $isExpanded={state.isExpanded}>
                              <Body3 color="gray700" align="left">
                                광고 상품에 대한 기대 요소를 줄글로 나타냅니다.
                                광고 상품에 대한 기대 요소를 줄글로 나타냅니다.
                                광고 상품에 대한 기대 요소를 줄글로 나타냅니다.
                                광고 상품에 대한 기대 요소를 줄글로 나타냅니다.
                                광고 상품에 대한 기대 요소를 줄글로 나타냅니다.
                                광고 상품에 대한 기대 요소를 줄글로 나타냅니다.
                              </Body3>

                              <div className="bgContent">
                                <div>
                                  <Body2_1 color="gray800" align="left">
                                    디자인 개선 방향
                                  </Body2_1>
                                  <ul>
                                    <li>
                                      <Body3 color="gray800" align="left">
                                        좀 더 트렌디하고, 밝고 활기찬 느낌으로
                                        변경 필요
                                      </Body3>
                                    </li>
                                    <li>
                                      <Body3 color="gray800" align="left">
                                        시술 후 긍정적 변화를 강조하는 이미지
                                        추가 필요 (예: 톤 개선, 피부결 개선)
                                      </Body3>
                                    </li>
                                    <li>
                                      <Body3 color="gray800" align="left">
                                        소셜 미디어 친화적인 디자인 (세로형,
                                        릴스/스토리 형식) 추가
                                      </Body3>
                                    </li>
                                    <li>
                                      <Body3 color="gray800" align="left">
                                        합리적인 가격 강조
                                      </Body3>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </ToggleContent>
                          )}
                        </ListBoxItem>

                        <ListBoxItem FlexStart>
                          <PercentBadge>
                            <Caption1>부적합</Caption1>
                          </PercentBadge>

                          <ListText Small>
                            <ListTitle>
                              <Sub1 color="gray800" align="left">
                                여성 (남편/남자친구 선물)
                              </Sub1>
                            </ListTitle>
                            <ListSubtitle>
                              <Sub3 color="gray500" align="left">
                                외모 관리, 패션, 자기 계발, 소셜 미디어 관심사의
                                내용을 줄글로 입력
                              </Sub3>
                            </ListSubtitle>
                          </ListText>

                          <ToggleButton
                            className="toggleButton"
                            $isExpanded={state.isExpanded}
                            onClick={() => handleToggle("isExpanded")}
                          />

                          {state.isExpanded && (
                            <ToggleContent $isExpanded={state.isExpanded}>
                              <Body3 color="gray700" align="left">
                                광고 상품에 대한 기대 요소를 줄글로 나타냅니다.
                                광고 상품에 대한 기대 요소를 줄글로 나타냅니다.
                                광고 상품에 대한 기대 요소를 줄글로 나타냅니다.
                                광고 상품에 대한 기대 요소를 줄글로 나타냅니다.
                                광고 상품에 대한 기대 요소를 줄글로 나타냅니다.
                                광고 상품에 대한 기대 요소를 줄글로 나타냅니다.
                              </Body3>

                              <div className="bgContent">
                                <div>
                                  <Body2_1 color="gray800" align="left">
                                    디자인 개선 방향
                                  </Body2_1>
                                  <ul>
                                    <li>
                                      <Body3 color="gray800" align="left">
                                        좀 더 트렌디하고, 밝고 활기찬 느낌으로
                                        변경 필요
                                      </Body3>
                                    </li>
                                    <li>
                                      <Body3 color="gray800" align="left">
                                        시술 후 긍정적 변화를 강조하는 이미지
                                        추가 필요 (예: 톤 개선, 피부결 개선)
                                      </Body3>
                                    </li>
                                    <li>
                                      <Body3 color="gray800" align="left">
                                        소셜 미디어 친화적인 디자인 (세로형,
                                        릴스/스토리 형식) 추가
                                      </Body3>
                                    </li>
                                    <li>
                                      <Body3 color="gray800" align="left">
                                        합리적인 가격 강조
                                      </Body3>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </ToggleContent>
                          )}
                        </ListBoxItem>
                      </CardGroupWrap>
                    </InsightAnalysis>

                    <Button
                      Small
                      Primary
                      onClick={() => setShowPopupSave(true)}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      리포트 저장하기
                    </Button>
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
          onConfirm={() => handleNextStep(1)}
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
    </>
  );
};

export default PageDesignSuitability;

const DesignAnalysisWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin-top: 60px;
`;

const ChartWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80px;
`;

const ToggleButton = styled.button`
  position: relative;
  width: 20px;
  height: 20px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-bottom: 6px;
  border: none;
  background: none;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    transform: ${(props) =>
      props.$isExpanded
        ? "translate(-50%, -50%) rotate(45deg)"
        : "translate(-50%, -50%) rotate(-135deg)"};
    margin-top: 2px;
    border-top: 1px solid ${palette.gray500};
    border-left: 1px solid ${palette.gray500};
    transition: all 0.5s;
  }
`;

const ToggleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding-top: 16px;
  border-top: 1px solid ${palette.outlineGray};

  .bgContent {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    background: ${palette.chatGray};

    > div {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 8px;

      + div {
        padding-top: 8px;
        border-top: 1px solid ${palette.outlineGray};
      }
    }
  }

  li {
    display: flex;
    align-items: flex-start;
    gap: 10px;

    &:before {
      flex-shrink: 0;
      width: 3px;
      height: 3px;
      margin-top: 10px;
      border-radius: 50%;
      background: ${palette.gray800};
      content: "";
    }
  }
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

const ReportContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  text-align: left;
  margin-top: 40px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;
