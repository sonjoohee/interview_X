//고객 핵심 가치 분석기
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../../assets/styles/Palette";
import OrganismIncNavigation from "../../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../../Global/molecules/MoleculeHeader";
import { Button } from "../../../../../assets/styles/ButtonStyle";
import AtomPersonaLoader from "../../../../Global/atoms/AtomPersonaLoader";
import MoleculeCustomerValueCard from "../molecules/MoleculeCustomerValueCard";
import {
  SelectBox,
  SelectBoxItem,
  SelectBoxTitle,
  SelectBoxList,
} from "../../../../../assets/styles/InputStyle";
import PopupWrap from "../../../../../assets/styles/Popup";
import {
  ContentsWrap,
  MainContent,
  TabWrapType5,
  TabButtonType5,
  TabContent5,
  CardGroupWrap,
  BottomBar,
  BgBoxItem,
  BoxWrap,
  PersonaGroup,
  Persona,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import personaImages from "../../../../../assets/styles/PersonaImages";
import images from "../../../../../assets/styles/Images";
import {
  H4,
  H3,
  Sub3,
  Body1,
  Body2,
  Body3,
  Caption2,
} from "../../../../../assets/styles/Typography";
import {
  IS_LOGGED_IN,
  TOOL_ID,
  TOOL_STEP,
  CUSTOMER_VALUE_ANALYZER_INFO,
  CUSTOMER_VALUE_ANALYZER_PERSONA,
  CUSTOMER_VALUE_ANALYZER_SELECTED_PERSONA,
  CUSTOMER_VALUE_ANALYZER_JOURNEY_MAP,
  CUSTOMER_VALUE_ANALYZER_FACTOR,
  CUSTOMER_VALUE_ANALYZER_CLUSTERING,
  CUSTOMER_VALUE_ANALYZER_POSITIONING,
  CUSTOMER_VALUE_ANALYZER_FINAL_REPORT,
  TOOL_LOADING,
  PROJECT_SAAS,
  PERSONA_LIST_SAAS,
  CREDIT_CREATE_TOOL,
  USER_CREDITS,
  EDUCATION_STATE,
  EVENT_STATE,
  TRIAL_STATE,
  EVENT_TITLE,
  CREDIT_CREATE_TOOL_LOADED,
} from "../../../../AtomStates";
import {
  createToolOnServer,
  updateToolOnServer,
  InterviewXCustomerValueAnalyzerPersonaRequest,
  getToolListOnServer,
  InterviewXCustomerValueAnalyzerJourneyMapRequest,
  InterviewXCustomerValueAnalyzerFactorRequest,
  InterviewXCustomerValueAnalyzerClusteringRequest,
  InterviewXCustomerValueAnalyzerPositioningRequest,
  InterviewXCustomerValueAnalyzerFinalReportRequest,
  UserCreditCheck,
  UserCreditUse,
  UserCreditInfo,
} from "../../../../../utils/indexedDB";
import { useDynamicViewport } from "../../../../../assets/DynamicViewport";
import OrganismPersonaList from "../../../public/organisms/OrganismPersonaList";

// formatMermaidData 함수를 여기로 이동
const formatMermaidData = (mermaidString) => {
  if (!mermaidString) return "";

  const lines = mermaidString.trim().split("\n");
  let formattedLines = [];

  formattedLines.push("journey");

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith("journey")) return;

    if (trimmedLine.startsWith("section")) {
      formattedLines.push(`    ${trimmedLine}`);
    } else if (trimmedLine.startsWith("title")) {
      formattedLines.push(`    ${trimmedLine}`);
    } else {
      formattedLines.push(`        ${trimmedLine}`);
    }
  });

  return formattedLines.join("\n");
};

const PageCustomerValueAnalyzer = () => {
  const navigate = useNavigate();

  const [creditCreateTool] = useAtom(CREDIT_CREATE_TOOL);
  const [creditCreateToolLoaded, setCreditCreateToolLoaded] = useAtom(
    CREDIT_CREATE_TOOL_LOADED
  );
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [educationState] = useAtom(EDUCATION_STATE);
  const [eventState] = useAtom(EVENT_STATE);
  const [trialState] = useAtom(TRIAL_STATE);
  const [eventTitle] = useAtom(EVENT_TITLE);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [personaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [customerValueAnalyzerInfo, setCustomerValueAnalyzerInfo] = useAtom(
    CUSTOMER_VALUE_ANALYZER_INFO
  );
  const [customerValueAnalyzerPersona, setCustomerValueAnalyzerPersona] =
    useAtom(CUSTOMER_VALUE_ANALYZER_PERSONA);
  const [
    customerValueAnalyzerSelectedPersona,
    setCustomerValueAnalyzerSelectedPersona,
  ] = useAtom(CUSTOMER_VALUE_ANALYZER_SELECTED_PERSONA);
  const [customerValueAnalyzerJourneyMap, setCustomerValueAnalyzerJourneyMap] =
    useAtom(CUSTOMER_VALUE_ANALYZER_JOURNEY_MAP);
  const [customerValueAnalyzerFactor, setCustomerValueAnalyzerFactor] = useAtom(
    CUSTOMER_VALUE_ANALYZER_FACTOR
  );
  const [, setCustomerValueAnalyzerClustering] = useAtom(
    CUSTOMER_VALUE_ANALYZER_CLUSTERING
  );
  const [
    customerValueAnalyzerPositioning,
    setCustomerValueAnalyzerPositioning,
  ] = useAtom(CUSTOMER_VALUE_ANALYZER_POSITIONING);
  const [
    customerValueAnalyzerFinalReport,
    setCustomerValueAnalyzerFinalReport,
  ] = useAtom(CUSTOMER_VALUE_ANALYZER_FINAL_REPORT);

  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [selectedPersonas, setSelectedPersonas] = useState([]);
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [selectedPersonasSaas, setSelectedPersonasSaas] = useState([]);
  const [selectedPurposes, setSelectedPurposes] = useState({
    customerList: "",
    analysisScope: "",
  });
  const [, setSelectedInterviewType] = useState(null);
  const [, setSelectedInterviewPurpose] = useState(null);
  const [, setContactForm] = useState({
    email: "",
    purpose: "",
    content: "",
  });
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [, setTargetCustomers] = useState([""]);
  const [, setSelectBoxStates] = useState({
    customerList: false,
    analysisScope: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [cardStatuses, setCardStatuses] = useState({});
  const [cardStatusesFactor, setCardStatusesFactor] = useState({});
  const [, setSelectedBusiness] = useState("");
  const [apiCallCompleted, setApiCallCompleted] = useState(false);
  const [, setApiCallCompletedFactor] = useState(false);
  // 상태 관리를 위한 state 추가
  const [selectedPersonaButtons, setSelectedPersonaButtons] = useState({});
  const [toolSteps, setToolSteps] = useState(0);
  const [showCreatePersonaPopup, setShowCreatePersonaPopup] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  // 스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //저장되었던 인터뷰 로드
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
        setCreditCreateToolLoaded(true);
      }
      if (toolLoading) {
        // 활성 탭 설정 (기본값 1)
        setActiveTab(Math.min((toolStep ?? 1) + 1, 4));
        setToolSteps(toolStep ?? 1);

        // 비즈니스 정보 설정 (Step 1)
        if (customerValueAnalyzerInfo) {
          setBusinessDescription(
            customerValueAnalyzerInfo?.analysisPurpose ?? ""
          );
          setTargetCustomers(customerValueAnalyzerInfo?.targetList ?? [""]);
          setSelectedPurposes((prev) => ({
            ...prev,
            analysisScope: customerValueAnalyzerInfo?.analysisScope ?? "",
            customerList: customerValueAnalyzerInfo?.business ?? "",
          }));
          setSelectedPersonasSaas(customerValueAnalyzerInfo?.targetList ?? []);

          const savedPersonaNames = Array.isArray(
            customerValueAnalyzerInfo?.targetList ?? []
          )
            ? customerValueAnalyzerInfo?.targetList?.map(
                (persona) => persona?.personaName
              )
            : [customerValueAnalyzerInfo?.targetList?.personaName];

          const selectedPersonaIds = savedPersonaNames
            ?.map((name) => {
              const matchedPersona = personaListSaas?.find(
                (persona) => persona?.personaName === name
              );
              return matchedPersona ? matchedPersona?._id : null;
            })
            .filter((id) => id !== null);

          // 선택된 페르소나 버튼 상태도 업데이트합니다
          const newSelectedButtons = {};
          selectedPersonaIds.forEach((id) => {
            const matchedPersona = personaListSaas.find(
              (persona) => persona._id === id
            );
            if (matchedPersona) {
              const buttonId = `${matchedPersona.personaType}_${id}`;
              newSelectedButtons[buttonId] = true;

              // favorite가 true인 경우 my_favorite 탭에서도 선택 상태로 설정
              if (matchedPersona.favorite) {
                newSelectedButtons[`my_favorite_${id}`] = true;
              }
            }
          });

          setSelectedPersonaButtons(newSelectedButtons);
        }

        // 완료된 단계 설정
        const completedStepsArray = [];
        for (let i = 1; i <= (toolStep ?? 1); i++) {
          completedStepsArray.push(i);
        }
        setCompletedSteps(completedStepsArray);

        // 카드 상태 설정
        if (toolStep ?? 0 >= 3) {
          const completedStates = customerValueAnalyzerPersona.reduce(
            (acc, _, index) => {
              acc[index] = "completed";
              return acc;
            },
            {}
          );
          setCardStatuses(completedStates);
        }
        // 페르소나 설정 (Step 2)
        if (Array.isArray(customerValueAnalyzerSelectedPersona)) {
          setCustomerValueAnalyzerSelectedPersona(
            customerValueAnalyzerSelectedPersona
          );

          const selectedTargets = customerValueAnalyzerSelectedPersona.map(
            (persona) => persona.target
          );

          if (
            Array.isArray(customerValueAnalyzerPersona) &&
            customerValueAnalyzerPersona.length > 0
          ) {
            const selectedIndices = customerValueAnalyzerPersona
              .map((persona, index) => {
                const personaTarget =
                  customerValueAnalyzerInfo?.targetList?.[index];

                // selectedTargets에 personaTarget이 포함되어 있는지 확인
                const isSelected = selectedTargets.some(
                  (target) => target.personaName === personaTarget.personaName
                );
                return isSelected ? index : -1;
              })
              .filter((index) => index !== -1);

            if (selectedIndices.length > 0) {
              setSelectedPersonas(selectedIndices);
            }
          }
        }
        // 고객 여정 맵 설정 (Step 3)
        if (Array.isArray(customerValueAnalyzerJourneyMap)) {
          const formattedJourneyMaps = customerValueAnalyzerJourneyMap.map(
            (journeyMap) => {
              if (journeyMap.mermaid) {
                const formatted = formatMermaidData(journeyMap.mermaid);
                return {
                  ...journeyMap,
                  mermaid: formatted,
                };
              }
              return journeyMap;
            }
          );

          setCustomerValueAnalyzerJourneyMap(formattedJourneyMaps);
        }
        if (
          Array.isArray(customerValueAnalyzerFactor) &&
          customerValueAnalyzerFactor.length > 0
        ) {
          setCustomerValueAnalyzerFactor(customerValueAnalyzerFactor);
        } else if (
          customerValueAnalyzerFactor.length === 0 &&
          completedStepsArray.length === 2
        ) {
          setActiveTab(2);
          setToolStep(1);
          setCompletedSteps(completedStepsArray.slice(0, -1));
        }

        // 최종 리포트 설정 (Step 4)
        if (customerValueAnalyzerFinalReport) {
          setCustomerValueAnalyzerFinalReport(
            customerValueAnalyzerFinalReport ?? {}
          );
        }
        setToolStep(0);

        return;
      }
    };

    interviewLoading();
    setToolLoading(false);
  }, [
    toolLoading,
    customerValueAnalyzerSelectedPersona,
    customerValueAnalyzerPersona,
    customerValueAnalyzerInfo,
  ]);


  // 고객 여정 맵 API 호출 시작
  useEffect(() => {
    if (
      activeTab === 2 &&
      customerValueAnalyzerPersona.length > 0 &&
      toolSteps < 2 &&
      !apiCallCompleted &&
      (customerValueAnalyzerJourneyMap?.length || 0) === 0
    ) {
      // toolSteps이 2보다 작을 때만 API 호출
      const initialLoadingStates = customerValueAnalyzerPersona.reduce(
        (acc, _, index) => {
          acc[index] = "waiting";
          return acc;
        },
        {}
      );
      setCardStatuses(initialLoadingStates);

      // 순차적으로 API 호출을 처리하는 함수
      const processSequentially = async () => {
        // targetList가 정의되어 있는지 확인
        if (
          !customerValueAnalyzerInfo.targetList ||
          !Array.isArray(customerValueAnalyzerInfo.targetList)
        ) {
          return; // 적절한 에러 처리를 추가
        }

        let journeyMapData = [];
        for (
          let index = 0;
          index < customerValueAnalyzerInfo.targetList.length;
          index++
        ) {
          try {
            // 현재 카드만 loading으로 변경
            setCardStatuses((prev) => ({
              ...prev,
              [index]: "loading",
            }));

            const data = {
              business: customerValueAnalyzerInfo.business,
              target: customerValueAnalyzerInfo.targetList[index],
              analysis_scope: customerValueAnalyzerInfo.analysisScope,
              analysis_purpose: customerValueAnalyzerPersona[index],
            };

            let response =
              await InterviewXCustomerValueAnalyzerJourneyMapRequest(
                data,
                isLoggedIn
              );

            const maxAttempts = 10;
            let attempts = 0;

            while (
              attempts < maxAttempts &&
              (!response ||
                !response?.response ||
                !response?.response?.customer_value_journey_map ||
                !response?.response?.customer_value_journey_map?.step1 ||
                !response?.response?.customer_value_journey_map?.conclusion ||
                !response?.response?.customer_value_journey_map?.mermaid ||
                !response?.response?.customer_value_journey_map?.section_1)
            ) {
              response = await InterviewXCustomerValueAnalyzerJourneyMapRequest(
                data,
                isLoggedIn
              );
              attempts++;
            }

            if (attempts >= maxAttempts) {
              setShowPopupError(true);
              return;
            }

            journeyMapData.push({
              ...response.response.customer_value_journey_map,
              business: customerValueAnalyzerInfo.business,
              target: customerValueAnalyzerInfo.targetList[index],
            });
            setCustomerValueAnalyzerJourneyMap((prev) => {
              const currentJourneyMaps = Array.isArray(prev) ? prev : [];
              const journeyMap = response.response.customer_value_journey_map;

              // mermaid 데이터 포맷팅
              if (journeyMap.mermaid) {
                journeyMap.mermaid = formatMermaidData(journeyMap.mermaid);
              }

              return [...currentJourneyMaps, journeyMap];
            });

            // 카드 상태 업데이트
            setCardStatuses((prev) => ({
              ...prev,
              [index]: "completed",
            }));

            // // 모든 시나리오를 한번에 저장
            // await updateToolOnServer(
            //   toolId,
            //   {
            //     projectId: project._id,
            //     customerValueJourneyMap: journeyMapData,
            //   },
            //   isLoggedIn
            // );
          } catch (error) {}
        }

        // 모든 시나리오를 한번에 저장
        await updateToolOnServer(
          toolId,
          {
            projectId: project._id,
            customerValueJourneyMap: journeyMapData,
          },
          isLoggedIn
        );
        setApiCallCompleted(true); // API 호출 완료 상태로 설정
      };
      processSequentially();
    } else if (activeTab === 2 && toolSteps >= 2) {
      // 이미 완료된 단계인 경우 카드 상태만 completed로 설정
      const completedStates = customerValueAnalyzerPersona.reduce(
        (acc, _, index) => {
          acc[index] = "completed";
          return acc;
        },
        {}
      );
      setCardStatuses(completedStates);
    }
  }, [activeTab, customerValueAnalyzerPersona, apiCallCompleted]);

  // 임시 데이터 설정
  useEffect(() => {
    if (!customerValueAnalyzerPositioning?.legend) {
      setCustomerValueAnalyzerPositioning({
        ...customerValueAnalyzerPositioning,
        legend: {
          A: "Key Buying Factor Name Key Buying Factor Name",
          B: "Key Buying Factor Name",
          C: "Key Buying Factor Name",
          D: "Key Buying Factor Name",
          E: "Key Buying Factor Name",
          F: "Key Buying Factor Name",
        },
      });
    }
  }, []);

  const project = projectSaas;

  const handleSubmitBusinessInfo = async () => {
    try {
      setIsLoading(true);

      const selectedPersonaObjects = selectedPersonasSaas
        .map((selectedPersona) => {
          // _id와 personaName을 사용하여 해당 페르소나 객체를 찾습니다
          return personaListSaas.filter(
            (persona) =>
              persona._id === selectedPersona._id &&
              persona.personaName === selectedPersona.personaName
          );
        })
        .flat() // 중첩 배열을 평탄화하여 모든 일치하는 페르소나 객체를 가져옵니다
        .filter((persona) => persona !== undefined);

      // 선택된 페르소나 객체에서 필요한 필드만 추출합니다
      const selectedCustomers = selectedPersonaObjects.map((persona) => ({
        personaName: persona?.personaName || "",
        personaCharacteristics: persona?.personaCharacteristics || "",
        age: persona?.age || "",
        gender: persona?.gender || "",
        job: persona?.job || "",
        keywords: persona?.keywords || [],
        imageKey: persona?.imageKey || "",
      }));

      const businessData = {
        business: project.projectTitle || "",
        target_list: selectedCustomers,
        analysis_scope: selectedPurposes.analysisScope,
        analysis_purpose: businessDescription,
      };

      let response = await InterviewXCustomerValueAnalyzerPersonaRequest(
        businessData,
        isLoggedIn
      );

      const maxAttempts = 10;
      let attempts = 0;

      while (
        attempts < maxAttempts &&
        (!response ||
          !response?.response ||
          !response?.response.customer_value_persona ||
          !Array.isArray(response.response.customer_value_persona) ||
          response.response.customer_value_persona.length === 0)
      ) {
        response = await InterviewXCustomerValueAnalyzerPersonaRequest(
          businessData,
          isLoggedIn
        );
        attempts++;
      }
      if (attempts >= maxAttempts) {
        setShowPopupError(true);
        return;
      }

      const businessUpdateData = {
        business: project.projectTitle || "",
        targetList: selectedCustomers,
        analysisScope: selectedPurposes.analysisScope,
        analysisPurpose: businessDescription,
      };
      const responseToolId = await createToolOnServer(
        {
          type: "ix_customer_value_persona",
          projectId: project._id,
          completedStep: 1,
          customerValuePersona: (
            response.response.customer_value_persona || []
          ).slice(0, selectedCustomers.length),
          ...businessUpdateData,
        },
        isLoggedIn
      );
      setToolId(responseToolId);
      setToolSteps(1);
      // 크레딧이 사용 가능한 상태면 사용 API 호출
      const creditUsePayload = {
        title: project.projectTitle,
        service_type: "고객 핵심 가치 분석기",
        target: "",
        state: "use",
        mount: creditCreateTool,
      };

      await UserCreditUse(creditUsePayload, isLoggedIn);

      // 크레딧 사용 후 사용자 정보 새로고침

      const userCreditValue = await UserCreditInfo(isLoggedIn);
      // 전역 상태의 크레딧 정보 업데이트
      setUserCredits(userCreditValue);

      setCustomerValueAnalyzerPersona(
        (response.response.customer_value_persona || []).slice(
          0,
          selectedCustomers.length
        )
      );

      setCustomerValueAnalyzerInfo(businessUpdateData);

      // API 호출 성공시 다음 단계로 이동
      handleNextStep(1);
      setIsLoading(false);
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

  const handlePurposeSelect = (purpose, selectBoxId) => {
    setSelectedPurposes((prev) => ({
      ...prev,
      [selectBoxId]: purpose,
    }));
    handleContactInputChange("purpose", purpose);
    setSelectBoxStates((prev) => ({
      ...prev,
      [selectBoxId]: false,
    }));

    if (selectBoxId === "customerList") {
      setSelectedBusiness(purpose);
      setBusinessDescription(purpose);
    }
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

  const handlePersonaSelectionChange = (_id) => {
    if (toolSteps >= 1) return;

    setSelectedPersonasSaas((prev) => {
      if (prev.includes(_id)) {
        return prev.filter((id) => id !== _id);
      } else {
        if (prev.length >= 5) return prev;
        return [...prev, _id];
      }
    });
  };

  const handleCheckboxChange = (index) => {
    if (toolSteps >= 2) return;
    setSelectedPersonas((prev) => {
      if (prev.includes(index)) {
        return prev.filter((id) => id !== index);
      } else {
        if (prev.length >= 5) return prev;
        return [...prev, index];
      }
    });
  };
  // 다음 단계로 이동하는 함수
  const handleNextStep = (currentStep) => {
    setCompletedSteps([...completedSteps, currentStep]);
    setActiveTab(currentStep + 1);
    setShowPopupError(false);
  };

  const handleSubmitPersonas = async () => {
    await updateToolOnServer(
      toolId,
      {
        projectId: project._id,
      },
      isLoggedIn
    );
    setToolSteps(2);
    handleNextStep(2);
    setApiCallCompletedFactor(false);
    try {
      const selectedPersonaData = selectedPersonas.map((index) => ({
        content: customerValueAnalyzerPersona[index],
        target: customerValueAnalyzerInfo.targetList[index],
        journeyMap: customerValueAnalyzerJourneyMap[index],
      }));
      setCustomerValueAnalyzerSelectedPersona(selectedPersonaData);

      await updateToolOnServer(
        toolId,
        {
          projectId: project._id,
          selectedCustomerValuePersona: selectedPersonaData,
        },
        isLoggedIn
      );

      // 초기 상태를 'waiting'으로 설정
      const initialLoadingStates = selectedPersonaData.reduce(
        (acc, _, index) => {
          acc[index] = "waiting";
          return acc;
        },
        {}
      );
      setCardStatusesFactor(initialLoadingStates);

      const results = [];
      for (let i = 0; i < selectedPersonaData.length; i++) {
        // API 호출 시작 시 카드 상태를 'loading'으로 설정
        setCardStatusesFactor((prev) => ({
          ...prev,
          [i]: "loading",
        }));

        const persona = selectedPersonaData[i];
        const requestData = {
          business: project.projectTitle,
          target: persona.target,
          analysis_scope: customerValueAnalyzerInfo.analysisScope,
          customer_value_journey_map: persona.journeyMap,
        };

        try {
          let response = await InterviewXCustomerValueAnalyzerFactorRequest(
            requestData,
            isLoggedIn
          );

          const maxAttempts = 10;
          let attempts = 0;

          while (
            attempts < maxAttempts &&
            (!response ||
              !response?.response ||
              !response?.response?.customer_value_factor ||
              !response?.response?.customer_value_factor?.key_buying_factors ||
              !response?.response?.customer_value_factor?.conclusion)
          ) {
            response = await InterviewXCustomerValueAnalyzerFactorRequest(
              requestData,
              isLoggedIn
            );

            attempts++;
          }

          if (attempts >= maxAttempts) {
            setShowPopupError(true);
            return;
          }

          // API 호출 성공 시 카드 상태를 'completed'로 설정
          if (response?.response?.customer_value_factor) {
            results.push(response.response.customer_value_factor);
            setCustomerValueAnalyzerFactor((prev) => {
              // prev가 undefined인 경우 빈 배열로 초기화
              const currentFactors = Array.isArray(prev) ? prev : [];
              // 새로운 factor가 존재하는 경우에만 추가
              return [
                ...currentFactors,
                response.response.customer_value_factor,
              ];
            });
            setCardStatusesFactor((prev) => ({
              ...prev,
              [i]: "completed",
            }));
          }
        } catch (error) {
          setCardStatusesFactor((prev) => ({
            ...prev,
            [i]: "error", // 에러 발생 시 상태를 'error'로 설정
          }));
        }
      }

      await updateToolOnServer(
        toolId,
        {
          projectId: project._id,
          customerValueFactor: results,
          completedStep: 2,
        },
        isLoggedIn
      );

      // 모든 API 호출이 완료된 후 상태 업데이트
      setApiCallCompletedFactor(true); // API 호출 완료 상태로 설정
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

  const handleReport = async () => {
    try {
      let clusteringResponse;
      await updateToolOnServer(
        toolId,
        {
          projectId: project._id,
        },
        isLoggedIn
      );
      setToolSteps(3);
      setIsLoading(true);
      handleNextStep(3);

      const clusteringData = {
        customer_value_factor_data: customerValueAnalyzerFactor,
      };

      // 클러스터링 요청
      clusteringResponse =
        await InterviewXCustomerValueAnalyzerClusteringRequest(
          clusteringData,
          isLoggedIn
        );

      const maxAttempts = 10;
      let attempts = 0;

      while (
        attempts < maxAttempts &&
        (!clusteringResponse ||
          !clusteringResponse.response ||
          !clusteringResponse.response.customer_value_clustering ||
          !Array.isArray(
            clusteringResponse.response.customer_value_clustering
          ) ||
          clusteringResponse.response.customer_value_clustering.length === 0)
      ) {
        clusteringResponse =
          await InterviewXCustomerValueAnalyzerClusteringRequest(
            clusteringData,
            isLoggedIn
          );
        attempts++;
      }
      if (attempts >= maxAttempts) {
        setShowPopupError(true);
        return;
      }

      setCustomerValueAnalyzerClustering(
        clusteringResponse.response.customer_value_clustering
      );

      const positioningData = {
        customer_value_factor_data: customerValueAnalyzerFactor,
        customer_value_clustering:
          clusteringResponse.response.customer_value_clustering,
      };

      // 포지셔닝 요청
      let positioningResponse;
      positioningResponse =
        await InterviewXCustomerValueAnalyzerPositioningRequest(
          positioningData,
          isLoggedIn
        );

      let attempts2 = 0;

      while (
        attempts2 < maxAttempts &&
        (!positioningResponse ||
          !positioningResponse.response ||
          !positioningResponse.response.customer_value_positioning ||
          !positioningResponse.response.customer_value_positioning
            .cluster_list ||
          !positioningResponse.response.customer_value_positioning.mermaid)
      ) {
        positioningResponse =
          await InterviewXCustomerValueAnalyzerPositioningRequest(
            positioningData,
            isLoggedIn
          );
        attempts2++;
      }
      if (attempts2 >= maxAttempts) {
        setShowPopupError(true);
        return;
      }
      setCustomerValueAnalyzerPositioning(
        positioningResponse.response.customer_value_positioning
      );

      const finalReportData = {
        business: project.projectTitle,
        customer_value_factor_data: customerValueAnalyzerFactor,
        customer_value_clustering:
          clusteringResponse.response.customer_value_clustering,
        customer_value_positioning:
          positioningResponse.response.customer_value_positioning,
      };

      // 최종 리포트 요청
      const finalReportResponse =
        await InterviewXCustomerValueAnalyzerFinalReportRequest(
          finalReportData,
          isLoggedIn
        );

      let attempts3 = 0;

      while (
        attempts3 < maxAttempts &&
        (!finalReportResponse ||
          !finalReportResponse.response ||
          !finalReportResponse.response.customer_value_final_report ||
          !finalReportResponse.response.customer_value_final_report.title ||
          !finalReportResponse.response.customer_value_final_report.content_1 ||
          !finalReportResponse.response.customer_value_final_report.content_2)
      ) {
        finalReportResponse =
          await InterviewXCustomerValueAnalyzerFinalReportRequest(
            finalReportData,
            isLoggedIn
          );
        attempts3++;
      }
      if (attempts3 >= maxAttempts) {
        setShowPopupError(true);
        return;
      }

      setCustomerValueAnalyzerFinalReport(
        finalReportResponse.response.customer_value_final_report
      );

      setToolSteps(4);
      await updateToolOnServer(
        toolId,
        {
          projectId: project._id,
          completedStep: 4,
          customerValueClustering:
            clusteringResponse.response.customer_value_clustering,
          customerValuePositioning:
            positioningResponse.response.customer_value_positioning,
          customerValueFinalReport:
            finalReportResponse.response.customer_value_final_report,
        },
        isLoggedIn
      );
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

  const mermaidCode = customerValueAnalyzerPositioning?.mermaid || "";

  const cleanMermaidCode = mermaidCode.replace(/quadrant-\d\s+[^\n]+\n/g, "");

  const MermaidDiagram = ({ code }) => {
    const [imageUrl, setImageUrl] = useState("");
    const elementId = useRef(`mermaid-diagram-${Date.now()}`);

    useEffect(() => {
      if (!code || code.trim() === "") return;
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js";
      script.async = true;

      script.onload = async () => {
        try {
          window.mermaid.initialize({
            startOnLoad: true,
            theme: "default",
            securityLevel: "loose",
            logLevel: "error",
            themeVariables: {
              background: "#ffffff",
              quadrantPointFill: "#226FFF",
              quadrantPointStroke: "#226FFF",
              quadrantXAxisTextFill: "#333333",
              quadrantYAxisTextFill: "#333333",
              quadrant1Fill: "#D3E2FF",
              // quadrant1Fill: "#E0E4EB",
              quadrant2Fill: "#E0E4EB",
              // quadrant2Fill: "#D3E2FF",
              quadrant3Fill: "#F6F6F6",
              quadrant4Fill: "#E9F1FF",
            },
          });

          const { svg: originalSvg } = await window.mermaid.render(
            elementId.current,
            code
          );

          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(originalSvg, "image/svg+xml");
          const svgElement = svgDoc.querySelector("svg");

          svgElement.setAttribute("viewBox", "0 0 500 500"); // 여백을 줄이기 위해 viewBox 조정
          svgElement.setAttribute("width", "100%");
          svgElement.setAttribute("height", "100%");
          svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");

          const modifiedSvg = svgElement.outerHTML;

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const img = new Image();

          img.onload = () => {
            const scaleFactor = 2; // 해상도를 두 배로 높이기 위한 스케일 팩터
            canvas.width = 500; // 고정된 너비
            canvas.height = 500; // 고정된 높이

            ctx.scale(scaleFactor, scaleFactor); // 스케일 적용
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
              img,
              0,
              0,
              canvas.width / scaleFactor,
              canvas.height / scaleFactor
            );

            const pngUrl = canvas.toDataURL("image/png", 1.0);
            setImageUrl(pngUrl);
          };

          img.src =
            "data:image/svg+xml;base64," +
            window.btoa(unescape(encodeURIComponent(modifiedSvg)));
        } catch (error) {}
      };

      document.body.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }, [code]);

    return (
      <DiagramContainer>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Mermaid Diagram"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        )}
      </DiagramContainer>
    );
  };

  // 버튼 클릭 핸들러 추가
  const handlePersonaButtonClick = (personaId) => {
    if (toolSteps >= 1) return;
    if (
      selectedPersonasSaas.length >= 5 &&
      !selectedPersonaButtons[personaId]
    ) {
      return; // 5명 이상 선택할 수 없도록 방지
    }
    setSelectedPersonaButtons((prev) => ({
      ...prev,
      [personaId]: !prev[personaId],
    }));
  };

  // selectedPersonaButtons 객체에서 선택된 페르소나의 수를 계산하는 함수 추가
  const getSelectedPersonaCount = () => {
    return Object.values(selectedPersonaButtons).filter((value) => value)
      .length;
  };

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("customervalueanalyzer")) {
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
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1030>
          <ValueAnalyzerWrap>
            <TabWrapType5>
              <TabButtonType5
                isActive={activeTab >= 1}
                onClick={() => setActiveTab(1)}
                disabled={
                  isLoading ||
                  Object.values(cardStatuses).some(
                    (status) => status !== "completed"
                  ) ||
                  Object.values(cardStatusesFactor).some(
                    (status) => status !== "completed"
                  )
                }
              >
                <span>01</span>
                <div className="text">
                  <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                    페르소나 선택
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 2}
                onClick={() => completedSteps.includes(1) && setActiveTab(2)}
                disabled={
                  !completedSteps.includes(1) ||
                  isLoading ||
                  Object.values(cardStatuses).some(
                    (status) => status !== "completed"
                  ) ||
                  Object.values(cardStatusesFactor).some(
                    (status) => status !== "completed"
                  )
                }
              >
                <span>02</span>
                <div className="text">
                  <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    고객 여정 맵 분석
                  </Body1>
                  <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    Customer Journey
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 3}
                onClick={() => completedSteps.includes(2) && setActiveTab(3)}
                disabled={
                  !completedSteps.includes(2) ||
                  isLoading ||
                  Object.values(cardStatuses).some(
                    (status) =>
                      status !== "completed" ||
                      Object.values(cardStatusesFactor).some(
                        (status) => status !== "completed"
                      )
                  )
                }
              >
                <span>03</span>
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    구매 결정 요인 분석
                  </Body1>
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    Key Buying Factor
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 4}
                onClick={() => completedSteps.includes(3) && setActiveTab(4)}
                disabled={
                  !completedSteps.includes(3) ||
                  isLoading ||
                  Object.values(cardStatuses).some(
                    (status) =>
                      status !== "completed" ||
                      Object.values(cardStatusesFactor).some(
                        (status) => status !== "completed"
                      )
                  )
                }
              >
                <span>04</span>
                <div className="text">
                  <Body1 color={activeTab >= 4 ? "gray700" : "gray300"}>
                    최종 인사이트 분석
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
                    <AtomPersonaLoader message="선택한 페르소나의 고객 여정을 분석하고 있어요..." />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Define Your Key Customer</H3>
                      <Body3 color="gray800">
                        고객 여정 분석을 원하는 주요 고객군을 입력하세요
                      </Body3>
                    </div>

                    <div className="content">
                      <BoxWrap Column NoneV style={{ marginBottom: "24px" }}>
                        <div className="selectBoxWrap">
                          <Body2 color="gray500" style={{ width: "110px" }}>
                            페르소나 선택
                          </Body2>
                          {selectedPersonasSaas.length === 0 ? (
                            <Body2 color="gray300">
                              아래 리스트에서 페르소나를 선택해 주세요 (5명 선택
                              가능)
                            </Body2>
                          ) : (
                            <PersonaGroup style={{ paddingLeft: "20px" }}>
                              {Array.isArray(selectedPersonasSaas) &&
                              selectedPersonasSaas.length > 0 ? (
                                <>
                                  {selectedPersonasSaas.length > 3 && (
                                    <span>
                                      +{selectedPersonasSaas.length - 3}
                                    </span>
                                  )}
                                  {selectedPersonasSaas
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
                                          alt={persona.personaName}
                                        />
                                      </Persona>
                                    ))}
                                </>
                              ) : (
                                <Persona size="Small" Round>
                                  <img
                                    src={`/Persona/${selectedPersonasSaas.imageKey}.png`}
                                    alt={selectedPersonasSaas.personaName}
                                  />
                                </Persona>
                              )}
                            </PersonaGroup>
                          )}
                        </div>
                        <div className="selectBoxWrap">
                          <Body2 color="gray500" style={{ width: "110px" }}>
                            여정 분석 범위
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
                              {selectedPurposes?.analysisScope ? (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    paddingLeft: "20px",
                                  }}
                                >
                                  <Body1 color="gray700" align="left">
                                    {
                                      selectedPurposes?.analysisScope?.split(
                                        "|"
                                      )[0]
                                    }{" "}
                                    |
                                  </Body1>
                                  <Body2 color="gray700" align="left">
                                    {
                                      selectedPurposes?.analysisScope?.split(
                                        "|"
                                      )[1]
                                    }
                                  </Body2>
                                </div>
                              ) : (
                                <Body2
                                  color="gray300"
                                  style={{ paddingLeft: "20px" }}
                                >
                                  고객 여정 맵의 분석 방향성을 선택하세요
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
                                <SelectBoxItem
                                  onClick={() => {
                                    handlePurposeSelect(
                                      "시간 흐름 기반 여정 분석 | 제품/서비스의 전체적인 사용자 여정을 기반으로 분석",
                                      "analysisScope"
                                    );
                                    setIsSelectBoxOpen(false);
                                  }}
                                >
                                  <Body1 color="gray700" align="left">
                                    시간 흐름 기반 여정 분석 |{" "}
                                  </Body1>
                                  <Body2 color="gray700" align="left">
                                    제품/서비스의 전체적인 사용자 여정을
                                    기반으로 분석
                                  </Body2>
                                </SelectBoxItem>
                                <SelectBoxItem
                                  onClick={() => {
                                    handlePurposeSelect(
                                      "상황 중심 여정 분석 | 특정 이벤트나 고객 경험을 중심으로 여정 분석",
                                      "analysisScope"
                                    );
                                    setIsSelectBoxOpen(false);
                                  }}
                                >
                                  <Body1 color="gray700" align="left">
                                    상황 중심 여정 분석 |{" "}
                                  </Body1>
                                  <Body2 color="gray700" align="left">
                                    특정 이벤트나 고객 경험을 중심으로 여정 분석
                                  </Body2>
                                </SelectBoxItem>
                                <SelectBoxItem
                                  onClick={() => {
                                    handlePurposeSelect(
                                      "목적 기반 여정 분석 | 고객이 제품/서비스를 사용하여 달성하려는 목표를 중심으로 여정 분석",
                                      "analysisScope"
                                    );
                                    setIsSelectBoxOpen(false);
                                  }}
                                >
                                  <Body1 color="gray700" align="left">
                                    목적 기반 여정 분석 |{" "}
                                  </Body1>
                                  <Body2 color="gray700" align="left">
                                    고객이 제품/서비스를 사용하여 달성하려는
                                    목표를 중심으로 여정 분석
                                  </Body2>
                                </SelectBoxItem>
                              </SelectBoxList>
                            )}
                          </SelectBox>
                        </div>
                      </BoxWrap>

                      <OrganismPersonaList
                        personaListSaas={personaListSaas}
                        personaImages={personaImages}
                        selectedPersonaButtons={selectedPersonaButtons}
                        handlePersonaButtonClick={handlePersonaButtonClick}
                        onNavigate={navigate}
                        onPersonaSelect={(_id) =>
                          handlePersonaSelectionChange(_id)
                        }
                      />
                    </div>

                    <BottomBar W100>
                      <Body2
                        color={
                          selectedPersonasSaas.length === 0
                            ? "gray300"
                            : "gray800"
                        }
                      >
                        고객 여정 분석을 원하는 페르소나를 선택해주세요 (
                        {selectedPersonasSaas.length}/5)
                      </Body2>
                      <Button
                        Large
                        Primary
                        Round
                        Fill
                        disabled={
                          selectedPurposes.analysisScope === "" ||
                          getSelectedPersonaCount() === 0 ||
                          toolSteps >= 1
                        }
                        onClick={() => handleSubmitBusinessInfo()}
                      >
                        다음
                        <images.ChevronRight
                          width="20"
                          height="20"
                          color={palette.white}
                        />
                      </Button>
                    </BottomBar>
                  </>
                )}
              </TabContent5>
            )}

            {activeTab === 2 && completedSteps.includes(1) && (
              <TabContent5>
                <div className="title">
                  <H3 color="gray800">Customer Journey Map</H3>
                  <Body3 color="gray800">
                    고객 여정 맵 분석을 통해 비즈니스와 연결되는 핵심
                    터치포인트를 도출합니다
                  </Body3>
                </div>

                <div className="content" style={{ marginBottom: "320px" }}>
                  <CardGroupWrap column>
                    {customerValueAnalyzerInfo.targetList.map(
                      (target, index) => {
                        return (
                          <MoleculeCustomerValueCard
                            key={index}
                            id={index}
                            title={target.personaName}
                            content={customerValueAnalyzerPersona[index]}
                            business={
                              customerValueAnalyzerInfo.business ||
                              "비즈니스 정보 없음"
                            }
                            status={
                              customerValueAnalyzerJourneyMap.length ===
                              customerValueAnalyzerInfo.targetList.length
                                ? "completed"
                                : cardStatuses[index] || "대기 중"
                            }
                            isSelected={selectedPersonas.includes(index)}
                            onSelect={(id) => handleCheckboxChange(id)}
                            viewType="list"
                            journeyMapData={
                              customerValueAnalyzerJourneyMap[index] || {}
                            }
                          />
                        );
                      }
                    )}
                  </CardGroupWrap>
                  <BottomBar W100>
                    <Body2
                      color={
                        selectedPersonas.length === 0 ? "gray300" : "gray800"
                      }
                    >
                      구매 결정 요인 분석을 원하는 고객을 선택해주세요 (
                      {selectedPersonas.length}/5)
                    </Body2>
                    <Button
                      Large
                      Primary
                      Round
                      Fill
                      disabled={
                        selectedPersonas.length === 0 ||
                        toolSteps >= 2 ||
                        customerValueAnalyzerJourneyMap.length !==
                          customerValueAnalyzerInfo.targetList.length
                      }
                      onClick={() => handleSubmitPersonas()}
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
              </TabContent5>
            )}

            {activeTab === 3 && completedSteps.includes(2) && (
              <TabContent5>
                <div className="title">
                  <H3 color="gray800">Key Buying Factor</H3>
                  <Body3 color="gray800">
                    각 페르소나별 핵심 구매 요인은 무엇이며, 우리는 어떤 요소에
                    집중해야 할까요?
                  </Body3>
                </div>

                <div className="content" style={{ marginBottom: "320px" }}>
                  <CardGroupWrap column>
                    {customerValueAnalyzerSelectedPersona.map(
                      (persona, index) => {
                        return (
                          <MoleculeCustomerValueCard
                            key={index}
                            id={index}
                            title={persona.target.personaName}
                            content={persona.content}
                            status={
                              customerValueAnalyzerFactor.length ===
                              customerValueAnalyzerSelectedPersona.length
                                ? "completed"
                                : cardStatusesFactor[index]
                            }
                            factor={customerValueAnalyzerFactor[index]}
                            business={
                              project.projectTitle || "비즈니스 정보 없음"
                            }
                            journeyMapData={persona.journeyMap || {}}
                            showOnlySelected={true}
                            hideCheckCircle={true}
                            activeTab={3}
                            viewType="list"
                          />
                        );
                      }
                    )}
                  </CardGroupWrap>

                  <BottomBar W100>
                    <Body2 color="gray800">
                      {selectedPersonas.length}명의 페르소나가 구매를 결정하는
                      이유를 분석해드릴게요
                    </Body2>
                    <Button
                      Large
                      Primary
                      Round
                      Fill
                      disabled={
                        toolSteps >= 3 ||
                        !Array.isArray(customerValueAnalyzerFactor) ||
                        customerValueAnalyzerFactor.length === 0 ||
                        customerValueAnalyzerFactor.length !==
                          customerValueAnalyzerSelectedPersona.length ||
                        Object.values(cardStatusesFactor).some(
                          (status) =>
                            status === "loading" || status === "waiting"
                        )
                      }
                      onClick={handleReport}
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
              </TabContent5>
            )}

            {activeTab === 4 && completedSteps.includes(3) && (
              <TabContent5 Small>
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
                    <AtomPersonaLoader message="결과보고서를 작성하고 있습니다" />
                  </div>
                ) : (
                  <>
                    <BgBoxItem primaryLightest>
                      <H3 color="gray800">고객 핵심 가치 인사이트 분석</H3>
                      <Body3 color="gray800">
                        고객의 구매 과정에서 고객의 결정 요인을 발견하고,
                        경쟁력을 향상시키세요
                      </Body3>
                    </BgBoxItem>

                    <InsightAnalysis>
                      <div className="content">
                        <H4
                          color="gray800"
                          align="left"
                          style={{ marginBottom: "12px" }}
                        >
                          {`페르소나별 고객 여정 분석 결과, ${customerValueAnalyzerInfo.business}의 핵심 구매 요소는`}
                          {(customerValueAnalyzerFinalReport.title || []).join(
                            ", "
                          )}
                          으로 분석됩니다.
                        </H4>

                        <Body3 color="gray700">
                          {customerValueAnalyzerFinalReport.content_1}
                        </Body3>

                        <Body3 color="gray700">
                          {customerValueAnalyzerFinalReport.content_2}
                        </Body3>
                      </div>
                    </InsightAnalysis>

                    <ValueMapWrap style={{ marginBottom: "240px" }}>
                      <div>
                        <H4
                          color="gray800"
                          align="left"
                          style={{ marginBottom: "12px" }}
                        >
                          고객 경험 & 핵심 가치 맵
                        </H4>
                        <BoxWrap
                          style={{
                            flexDirection: "column",
                            alignItems: "flex-start",
                          }}
                        >
                          <Body3 color="gray700">
                            가로축 (X축) - 영향력 : 많은 사람들이 중요하게
                            여기는 구매 결정 요인의 영향 정도
                          </Body3>
                          <Body3 color="gray700">
                            세로축 (Y축) - 불만족도 : 사람들이 해당 구매 요인에
                            대해 불만족을 느끼는 정도
                          </Body3>
                        </BoxWrap>
                      </div>

                      <ValueMap>
                        <div className="content">
                          <div className="mermaid">
                            <MermaidDiagram code={cleanMermaidCode} />

                            <div className="mermaid-legend">
                              <ul
                                className="legend-item"
                                style={{ textAlign: "left" }}
                              >
                                {customerValueAnalyzerPositioning?.cluster_list?.map(
                                  (cluster, index) => {
                                    const label = String.fromCharCode(
                                      65 + index
                                    ); // 인덱스를 알파벳으로 변환 (A, B, C, ...)
                                    return (
                                      <li key={index}>
                                        <TooltipWrapper>
                                          <Sub3
                                            color="gray700"
                                            align="left"
                                            style={{
                                              cursor: "help",
                                              textAlign: "left",
                                            }}
                                          >
                                            {cluster.cluster_name.length > 14
                                              ? `${label} : ${cluster.cluster_name.substring(
                                                  0,
                                                  14
                                                )}...`
                                              : `${label} : ${cluster.cluster_name}`}
                                          </Sub3>
                                          <Tooltip className="tooltip">
                                            {cluster.cluster_name}
                                          </Tooltip>
                                        </TooltipWrapper>
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                              <div className="legend-item">
                                <div>
                                  <span className="must-fix" />
                                  <Caption2 color="gray700">
                                    Must Fix : 최우선 해결 요소
                                  </Caption2>
                                </div>
                                <div>
                                  <span className="niche-pain" />
                                  <Caption2 color="gray700">
                                    Niche Pain : 니치 불편 요소
                                  </Caption2>
                                </div>
                                <div>
                                  <span className="key-strengths" />
                                  <Caption2 color="gray700">
                                    Key Strengths : 차별화 요소
                                  </Caption2>
                                </div>
                                <div>
                                  <span className="low-impact" />
                                  <Caption2 color="gray700">
                                    Low Impact : 저관여 요소
                                  </Caption2>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ValueMap>
                    </ValueMapWrap>
                  </>
                )}
              </TabContent5>
            )}
          </ValueAnalyzerWrap>
        </MainContent>
      </ContentsWrap>

      {showPopupError && (
        <PopupWrap
          Warning
          title="작업이 중단되었습니다"
          message="데이터 오류로 인해 페이지가 초기화됩니다."
          message2="작업 중인 내용은 보관함을 확인하세요."
          buttonType="Outline"
          closeText="확인"
          onConfirm={() => {
            window.location.reload();
          }}
          onCancel={() => {
            window.location.reload();
          }}
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
            title="고객 핵심 가치 분석기"
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
            title="고객 핵심 가치 분석기"
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
            title="고객 핵심 가치 분석기"
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

export default PageCustomerValueAnalyzer;

const ValueAnalyzerWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin-top: 60px;
`;

const InsightAnalysis = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
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
    gap: 20px;
    text-align: left;
  }
`;

const ValueMapWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  margin: 40px 0;
`;

const ValueMap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .mermaid {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    width: 100%;
    height: auto;
  }

  .mermaid-legend {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    max-width: 170px;
    width: 100%;

    ul {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;

      > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
      }
    }

    span {
      width: 16px;
      height: 16px;
      border-radius: 2px;

      &.must-fix {
        background-color: #d3e2ff;
      }

      &.niche-pain {
        background-color: #e0e4eb;
      }

      &.key-strengths {
        background-color: #e9f1ff;
      }

      &.low-impact {
        background-color: ${palette.gray100};
      }
    }
  }

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 12px;

    div {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    span {
      width: 16px;
      height: 16px;
      border-radius: 50%;

      &.must-fix {
        background-color: #d3e2ff;
      }

      &.niche-pain {
        background-color: #e0e4eb;
      }

      &.key-strengths {
        background-color: #e9f1ff;
      }

      &.low-impact {
        background-color: ${palette.gray100};
      }
    }
  }
`;

export const DiagramContainer = styled.div`
  width: 70%;
  min-width: 600px;
  min-height: 600px;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
`;

// 툴크을 위한 스타일 컴포넌트 추가
const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
`;

const Tooltip = styled.div`
  visibility: hidden;
  position: absolute;
  left: 0;
  top: -35px;
  padding: 8px;
  color: ${palette.gray500};
  border-radius: 4px;
  font-size: 0.75rem;
  line-height: 16px;
  white-space: nowrap;
  border: 1px solid ${palette.outlineGray};
  background: ${palette.white};
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 10;
`;
