//고객 핵심 가치 분석기

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../../assets/styles/Palette";
import OrganismIncNavigation from "../../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../../Global/molecules/MoleculeHeader";
import {
  ButtonGroup,
  Button,
  IconButton,
} from "../../../../../assets/styles/ButtonStyle";

import AtomPersonaLoader from "../../../../Global/atoms/AtomPersonaLoader";
import MoleculeCustomerValueCard from "../molecules/MoleculeCustomerValueCard";

import {
  FormBox,
  CustomTextarea,
  CustomInput,
  SelectBox,
  SelectBoxItem,
  SelectBoxTitle,
  SelectBoxList,
  CheckBoxButton,
  GenderRadioButton,
} from "../../../../../assets/styles/InputStyle";
import PopupWrap from "../../../../../assets/styles/Popup";
import {
  ContentsWrap,
  MainContent,
  TabWrapType3,
  TabButtonType3,
  TabWrapType5,
  TabButtonType5,
  TabContent5,
  TabContent5Item,
  CardGroupWrap,
  BottomBar,
  BgBoxItem,
  BoxWrap,
  ListBoxGroup,
  PersonaGroup,
  ListBoxItem,
  Badge,
  Persona,
  PersonaInfo,
  ListBox,
  ListBoxWrap,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import personaImages from "../../../../../assets/styles/PersonaImages";
import images from "../../../../../assets/styles/Images";
import {
  H4,
  H3,
  H5,
  Sub2,
  Sub3,
  Body1,
  Body2,
  Body3,
  Caption2,
  Helptext,
} from "../../../../../assets/styles/Typography";

import {
  IS_LOGGED_IN,
  TOOL_ID,
  TOOL_STEP,
  TOOL_LOADING,
  CREDIT_INDEPTH_INTERVIEW,
  PROJECT_SAAS,
  PERSONA_LIST_SAAS,
  CUSTOMER_VALUE_ANALYZER_INFO,
  CUSTOMER_VALUE_ANALYZER_PERSONA,
  CUSTOMER_VALUE_ANALYZER_SELECTED_PERSONA,
  CUSTOMER_VALUE_ANALYZER_JOURNEY_MAP,
  CUSTOMER_VALUE_ANALYZER_FACTOR,
  CUSTOMER_VALUE_ANALYZER_CLUSTERING,
  CUSTOMER_VALUE_ANALYZER_POSITIONING,
  CUSTOMER_VALUE_ANALYZER_FINAL_REPORT,
  CUSTOMER_VALUE_ANALYZER_SELECTED_FACTOR,
  SELECTED_INTERVIEW_PURPOSE_DATA,
} from "../../../../AtomStates";

import {
  createToolOnServer,
  updateToolOnServer,
  getToolOnServer,
  InterviewXCustomerValueAnalyzerPersonaRequest,
  getToolListOnServer,
  InterviewXCustomerValueAnalyzerJourneyMapRequest,
  InterviewXCustomerValueAnalyzerFactorRequest,
  InterviewXCustomerValueAnalyzerClusteringRequest,
  InterviewXCustomerValueAnalyzerPositioningRequest,
  InterviewXCustomerValueAnalyzerFinalReportRequest,
} from "../../../../../utils/indexedDB";

import { useDynamicViewport } from "../../../../../assets/DynamicViewport";
import OrganismNoPersonaMessage from "../../../public/organisms/OrganismNoPersonaMessage"; // Organism 이름으로 변경
import MoleculePersonaListItem from "../../../public/molecules/MoleculePersonaListItem";
import OrganismPersonaList from "../../../public/organisms/OrganismPersonaList";

const PageCustomerValueAnalyzer = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas, setProjectSaas] = useAtom(PROJECT_SAAS);
  const [personaListSaas, setPersonaListSaas] = useAtom(PERSONA_LIST_SAAS);
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

  const [showPopup, setShowPopup] = useState(false);
  const [showPopupMore, setShowPopupMore] = useState(false);
  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [selectedPersonas, setSelectedPersonas] = useState([]);
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [selectedPersonasSaas, setSelectedPersonasSaas] = useState([]);
  const [selectedPurposes, setSelectedPurposes] = useState({
    customerList: "",
    analysisScope: "",
  });
  const [selectedCustomers, setSelectedCustomers] = useState([]);
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
  const [targetCustomers, setTargetCustomers] = useState([""]);
  const [personaData, setPersonaData] = useState({
    personaInfo: "",
    personaScenario: "",
  });

  const [selectBoxStates, setSelectBoxStates] = useState({
    customerList: false,
    analysisScope: false,
  });

  const [dropUpStates, setDropUpStates] = useState({
    customerList: false,
    analysisScope: false,
  });

  const customerListRef = useRef(null);
  const analysisScopeRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [targetDiscoveryList, setTargetDiscoveryList] = useState([]);

  const [cardStatuses, setCardStatuses] = useState({});
  const [cardStatusesFactor, setCardStatusesFactor] = useState({});

  const [selectedBusiness, setSelectedBusiness] = useState("");

  const [apiCallCompleted, setApiCallCompleted] = useState(false);
  const [apiCallCompletedFactor, setApiCallCompletedFactor] = useState(false);
  const [completedApiCalls, setCompletedApiCalls] = useState([]);

  // 상태 관리를 위한 state 추가
  const [selectedPersonaButtons, setSelectedPersonaButtons] = useState({});

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  // 스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //저장되었던 인터뷰 로드
  useEffect(() => {
    const interviewLoading = async () => {
      if (toolLoading) {
        try {
          // 활성 탭 설정 (기본값 1)
          setActiveTab(Math.min((toolStep ?? 1) + 1, 4));

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
          }

          // 완료된 단계 설정
          const completedStepsArray = [];
          for (let i = 1; i <= (toolStep ?? 1); i++) {
            completedStepsArray.push(i);
          }
          setCompletedSteps(completedStepsArray);

          // 카드 상태 설정
          if ((toolStep ?? 0) >= 3) {
            const completedStates = (customerValueAnalyzerPersona || []).reduce(
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

            const selectedTargets = (
              customerValueAnalyzerSelectedPersona || []
            ).map((persona) => persona?.target);

            if (
              Array.isArray(customerValueAnalyzerPersona) &&
              (customerValueAnalyzerPersona?.length || 0) > 0
            ) {
              const selectedIndices = (customerValueAnalyzerPersona || [])
                .map((persona, index) => {
                  const personaTarget =
                    customerValueAnalyzerInfo?.targetList?.[index];
                  return (selectedTargets || []).includes(personaTarget)
                    ? index
                    : -1;
                })
                .filter((index) => index !== -1);

              if (selectedIndices?.length > 0) {
                setSelectedPersonas(selectedIndices);
              }
            }
          }

          // 고객 여정 맵 설정 (Step 3)

          if (Array.isArray(customerValueAnalyzerJourneyMap)) {
            setCustomerValueAnalyzerJourneyMap(customerValueAnalyzerJourneyMap);
          } else if (customerValueAnalyzerJourneyMap) {
            // 객체인 경우 배열로 변환
            setCustomerValueAnalyzerJourneyMap([
              customerValueAnalyzerJourneyMap,
            ]);
          } else {
            // undefined나 null인 경우 빈 배열로 초기화
            setCustomerValueAnalyzerJourneyMap([]);
          }

          // 고객 여정 맵이 로드된 경우 카드 상태 업데이트
          if (
            Array.isArray(customerValueAnalyzerJourneyMap) &&
            customerValueAnalyzerJourneyMap.length > 0
          ) {
            const journeyMapStates = customerValueAnalyzerJourneyMap.reduce(
              (acc, journeyMap, index) => {
                acc[index] = journeyMap ? "completed" : "waiting";
                return acc;
              },
              {}
            );
            setCardStatuses((prev) => ({
              ...prev,
              ...journeyMapStates,
            }));
            setApiCallCompleted(true);
          }

          // 구매 요인 설정 (Step 4)
          if (
            Array.isArray(customerValueAnalyzerFactor) &&
            (customerValueAnalyzerFactor?.length || 0) > 0
          ) {
            setCustomerValueAnalyzerFactor(customerValueAnalyzerFactor);
          } else if (
            (customerValueAnalyzerFactor?.length || 0) === 0 &&
            (completedStepsArray?.length || 0) === 2
          ) {
            setActiveTab(2);
            setToolStep(1);
            setCompletedSteps(completedStepsArray?.slice(0, -1) || []);
          }

          // 최종 리포트 설정 (Step 4)
          if (customerValueAnalyzerFinalReport) {
            setCustomerValueAnalyzerFinalReport(
              customerValueAnalyzerFinalReport ?? {}
            );
          }
        } catch (error) {
          console.error("Error loading interview data:", error);
        }
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

  // 타겟 탐색기 리스트 가져오기
  useEffect(() => {
    const getAllTargetDiscovery = async () => {
      try {
        let page = 1;
        const size = 10;
        let allItems = [];

        while (true) {
          const response = await getToolListOnServer(size, page, isLoggedIn);

          // Check if response exists and has data
          if (!response || !response?.data) {
            console.error("Invalid response from server");
            break;
          }

          const targetDiscoveryData = (response?.data || []).filter(
            (item) => item?.type === "ix_target_discovery_persona"
          );

          const newItems = (targetDiscoveryData || []).filter(
            (item) => (item?.target_discovery_scenario?.length || 0) > 0
          );

          allItems = [...allItems, ...(newItems || [])];

          // Check if we've reached the end of the data
          if (!response?.count || (response?.count || 0) <= page * size) {
            break;
          }

          page++;
        }

        setTargetDiscoveryList(allItems);
      } catch (error) {
        console.error("Error fetching target discovery list:", error);
        setTargetDiscoveryList([]); // Set empty array on error
      }
    };

    getAllTargetDiscovery();
  }, [isLoggedIn]);

  // 고객 여정 맵 API 호출 시작
  useEffect(() => {
    if (
      activeTab === 2 &&
      customerValueAnalyzerPersona.length > 0 &&
      toolStep < 2 &&
      !apiCallCompleted &&
      (customerValueAnalyzerJourneyMap?.length || 0) === 0
    ) {
      // 모든 카드의 상태를 waiting으로 초기화
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
        let journeyMapData = [];
        for (
          let index = 0;
          index < (customerValueAnalyzerInfo?.targetList?.length || 0);
          index++
        ) {
          try {
            // 현재 카드만 loading으로 변경
            setCardStatuses((prev) => ({
              ...(prev || {}),
              [index]: "loading",
            }));

            const data = {
              business: customerValueAnalyzerInfo?.business || "",
              target: customerValueAnalyzerInfo?.targetList?.[index] || "",
              analysis_scope: customerValueAnalyzerInfo?.analysisScope || "",
              analysis_purpose: customerValueAnalyzerPersona?.[index] || "",
            };

            const response =
              await InterviewXCustomerValueAnalyzerJourneyMapRequest(
                data,
                isLoggedIn
              );

            if (response?.response?.customer_value_journey_map) {
              const newJourneyMapItem = {
                ...(response?.response?.customer_value_journey_map || {}),
                business: customerValueAnalyzerInfo?.business || "",
                target: customerValueAnalyzerInfo?.targetList?.[index] || "",
              };

              journeyMapData.push(newJourneyMapItem);

              // 배열로 올바르게 업데이트
              setCustomerValueAnalyzerJourneyMap((prev) => {
                const currentJourneyMaps = Array.isArray(prev) ? [...prev] : [];
                currentJourneyMaps[index] = newJourneyMapItem;
                return currentJourneyMaps;
              });

              // 성공적인 응답 후 카드 상태 업데이트
              setCardStatuses((prev) => ({
                ...(prev || {}),
                [index]: "completed",
              }));
            }

            // 모든 시나리오를 한번에 저장
            await updateToolOnServer(
              toolId,
              {
                projectId: project?._id,
                customerValueJourneyMap: journeyMapData,
              },
              isLoggedIn
            );
          } catch (error) {
            console.error(`Journey Map API 호출 실패 (카드 ${index}):`, error);
            // 에러 발생 시 카드 상태 업데이트
            setCardStatuses((prev) => ({
              ...(prev || {}),
              [index]: "error",
            }));
          }
        }
        setApiCallCompleted(true); // API 호출 완료 상태로 설정
      };
      processSequentially();
    } else if (activeTab === 2 && (toolStep || 0) >= 2) {
      // 이미 완료된 단계인 경우 카드 상태만 completed로 설정
      const completedStates = (customerValueAnalyzerPersona || []).reduce(
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

      const filteredTargetCustomers = (selectedPersonasSaas || []).flatMap(
        (personaId) => {
          const prefix = personaId?.split("_")?.[0] || ""; // 접두사 추출 (예: 'macro_segment')
          return (personaListSaas || [])
            .map((persona, index) => {
              // personaType이 접두사와 일치하는지 확인
              if (persona?.personaType?.startsWith(prefix)) {
                return persona; // 인덱스 대신 persona 정보를 반환
              }
              return null; // 일치하지 않으면 null 반환
            })
            .filter((persona) => persona !== null); // null 값을 필터링
        }
      );
      const selectedCustomers = (selectedPersonasSaas || [])
        .map((personaId) => {
          const index = parseInt(personaId?.split("persona")?.[1] || "0", 10); // 숫자 추출
          const {
            personaName,
            personaCharacteristics,
            age,
            gender,
            job,
            keywords,
          } = filteredTargetCustomers?.[index] || {}; // 필요한 필드만 추출
          return {
            personaName: personaName || "",
            personaCharacteristics: personaCharacteristics || "",
            age: age || "",
            gender: gender || "",
            job: job || "",
            keywords: keywords || [],
          }; // 필요한 필드만 반환
        })
        .filter((customer) => customer !== undefined); // undefined 필터링
      const businessData = {
        business: project?.projectTitle || "",
        target_list: selectedCustomers || [],
        analysis_scope: selectedPurposes?.analysisScope || "",
        analysis_purpose: businessDescription || "",
      };
      // console.log("businessData", businessData);

      let response = await InterviewXCustomerValueAnalyzerPersonaRequest(
        businessData,
        isLoggedIn
      );

      const maxAttempts = 10;
      let attempts = 0;

      while (
        !response ||
        !response?.response ||
        !response?.response?.customer_value_persona ||
        !Array.isArray(response?.response?.customer_value_persona) ||
        (response?.response?.customer_value_persona?.length || 0) === 0
      ) {
        if (attempts >= maxAttempts) {
          setShowPopupError(true);
          return;
        }
        attempts++;

        response = await InterviewXCustomerValueAnalyzerPersonaRequest(
          businessData,
          isLoggedIn
        );
      }
      const businessUpdateData = {
        business: project?.projectTitle || "",
        targetList: selectedCustomers || [],
        analysisScope: selectedPurposes?.analysisScope || "",
        analysisPurpose: businessDescription || "",
      };
      const responseToolId = await createToolOnServer(
        {
          type: "ix_customer_value_persona",
          projectId: project?._id,
          completedStep: 1,
          customerValuePersona:
            response?.response?.customer_value_persona || [],
          ...businessUpdateData,
        },
        isLoggedIn
      );
      setToolId(responseToolId);
      setToolStep(1);

      // API 응답에서 페르소나 데이터를 추출하여 atom에 저장
      setCustomerValueAnalyzerPersona(
        response?.response?.customer_value_persona || []
      );
      // console.log("customerValueAnalyzerPersona", customerValueAnalyzerPersona);

      setCustomerValueAnalyzerInfo(businessData);
      setSelectedCustomers(selectedCustomers);
      // API 호출 성공시 다음 단계로 이동
      handleNextStep(1);
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting business info:", error);
      setShowPopupError(true);
      if (error?.response) {
        switch (error?.response?.status) {
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

  const handleTargetDiscoveryClick = (business) => {
    setBusinessDescription(business || "");
  };

  const calculateDropDirection = (ref, selectBoxId) => {
    if (ref?.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = (window?.innerHeight || 0) - rect.bottom;
      const spaceAbove = rect.top;
      const dropDownHeight = 200;

      setDropUpStates((prev) => ({
        ...(prev || {}),
        [selectBoxId]: spaceBelow < dropDownHeight && spaceAbove > spaceBelow,
      }));
    }
  };

  const handleSelectBoxClick = (selectBoxId, ref) => {
    calculateDropDirection(ref, selectBoxId);
    setSelectBoxStates((prev) => ({
      ...(prev || {}),
      [selectBoxId]: !(prev?.[selectBoxId] || false),
    }));
  };

  const handlePurposeSelect = (purpose, selectBoxId) => {
    setSelectedPurposes((prev) => ({
      ...(prev || {}),
      [selectBoxId]: purpose || "",
    }));
    handleContactInputChange("purpose", purpose || "");
    setSelectBoxStates((prev) => ({
      ...(prev || {}),
      [selectBoxId]: false,
    }));

    if (selectBoxId === "customerList") {
      setSelectedBusiness(purpose || "");
      setBusinessDescription(purpose || "");
    }
  };

  const handleContactInputChange = (field, value) => {
    setContactForm((prev) => ({
      ...(prev || {}),
      [field]: value || "",
    }));
  };

  const handleSelectPersona = () => {
    if ((selectedPersonas?.length || 0) > 0) {
      setSelectedInterviewType("multiple");
      setSelectedInterviewPurpose("product_experience_new");
    }
  };

  const handlePersonaSelectionChange = (index) => {
    // if (toolStep >= 2) return;
    setSelectedPersonasSaas((prev) => {
      const prevArray = prev || [];
      if (prevArray.includes(index)) {
        return prevArray.filter((id) => id !== index);
      } else {
        if ((prevArray?.length || 0) >= 5) return prevArray;
        return [...prevArray, index];
      }
    });
  };

  // selectedPersonasSaas가 변경될 때마다 로그 출력
  // useEffect(() => {
  //   console.log(selectedPersonasSaas);
  // }, [selectedPersonasSaas]);

  const handleCheckboxChange = (index) => {
    if ((toolStep || 0) >= 2) return;
    setSelectedPersonas((prev) => {
      const prevArray = prev || [];
      if (prevArray.includes(index)) {
        return prevArray.filter((id) => id !== index);
      } else {
        if ((prevArray?.length || 0) >= 5) return prevArray;
        return [...prevArray, index];
      }
    });
  };

  // 다음 단계로 이동하는 함수
  const handleNextStep = (currentStep) => {
    setCompletedSteps([...(completedSteps || []), currentStep]);
    setActiveTab((currentStep || 0) + 1);
    setShowPopupError(false);
  };

  // 필수 필드가 모두 입력되었는지 확인하는 함수
  const isRequiredFieldsFilled = () => {
    return (
      (businessDescription || "").trim() !== "" &&
      (targetCustomers || []).some(
        (customer) => (customer || "").trim() !== ""
      ) && // 최소 1개 이상의 고객 정보가 입력되었는지 확인
      (selectedPurposes?.analysisScope || "") !== ""
    );
  };

  // 비즈니스 설명 입력 핸들러
  const handleBusinessDescriptionChange = (e) => {
    const input = e.target.value;
    if (input.length <= 150) {
      setBusinessDescription(input);
    }
  };

  // 각 입력 필드의 변경을 처리하는 함수
  const handleTargetCustomerChange = (index, value) => {
    setTargetCustomers((prev) => {
      const newTargetCustomers = [...prev];
      newTargetCustomers[index] = value;
      return newTargetCustomers;
    });
  };

  const handleSubmitPersonas = async () => {
    await updateToolOnServer(
      toolId,
      {
        projectId: project._id,
        completedStep: 2,
      },
      isLoggedIn
    );
    setToolStep(2);
    handleNextStep(2);
    setApiCallCompletedFactor(false);
    try {
      // 배열 확인 및 변환
      // const journeyMapArray = Array.isArray(customerValueAnalyzerJourneyMap)
      //   ? customerValueAnalyzerJourneyMap
      //   : [customerValueAnalyzerJourneyMap].filter((item) => item);

      // const selectedPersonaData = selectedPersonas.map((index) => ({
      //   content: customerValueAnalyzerPersona[index],
      //   target: customerValueAnalyzerInfo.targetList[index],
      //   journeyMap: journeyMapArray[index] || {},
      // }));
      const selectedPersonaData = selectedPersonas.map((index) => ({
        content: customerValueAnalyzerPersona[index],
        target: customerValueAnalyzerInfo.target_list[index],
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
          const response = await InterviewXCustomerValueAnalyzerFactorRequest(
            requestData,
            isLoggedIn
          );

          // API 호출 성공 시 카드 상태를 'completed'로 설정
          if (response?.response?.customer_value_factor) {
            results.push(response.response.customer_value_factor);
            setCardStatusesFactor((prev) => ({
              ...prev,
              [i]: "completed",
            }));
          }
        } catch (error) {
          console.error("Error:", error);
          setCardStatusesFactor((prev) => ({
            ...prev,
            [i]: "error", // 에러 발생 시 상태를 'error'로 설정
          }));
        }
      }

      // 결과가 있는 경우에만 상태 업데이트
      if (results.length > 0) {
        setCustomerValueAnalyzerFactor(results);

        await updateToolOnServer(
          toolId,
          {
            projectId: project._id,
            customerValueFactor: results,
          },
          isLoggedIn
        );
      }

      // 모든 API 호출이 완료된 후 상태 업데이트
      setApiCallCompletedFactor(true); // API 호출 완료 상태로 설정
    } catch (error) {
      console.error("Error submitting personas:", error);
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
          completedStep: 3,
        },
        isLoggedIn
      );
      setToolStep(3);
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
        !clusteringResponse ||
        !clusteringResponse.response ||
        !clusteringResponse.response.customer_value_clustering ||
        !Array.isArray(clusteringResponse.response.customer_value_clustering) ||
        clusteringResponse.response.customer_value_clustering.length === 0
      ) {
        if (attempts >= maxAttempts) {
          setShowPopupError(true);
          return;
        }
        attempts++;

        clusteringResponse =
          await InterviewXCustomerValueAnalyzerClusteringRequest(
            clusteringData,
            isLoggedIn
          );
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
      const positioningResponse =
        await InterviewXCustomerValueAnalyzerPositioningRequest(
          positioningData,
          isLoggedIn
        );
      // console.log("Positioning response:", positioningResponse);

      let attempts2 = 0;

      while (
        !positioningResponse ||
        !positioningResponse.response ||
        !positioningResponse.response.customer_value_positioning ||
        !positioningResponse.response.customer_value_positioning.cluster_list ||
        !positioningResponse.response.customer_value_positioning.mermaid
      ) {
        if (attempts2 >= maxAttempts) {
          setShowPopupError(true);
          return;
        }
        attempts2++;

        positioningResponse =
          await InterviewXCustomerValueAnalyzerPositioningRequest(
            positioningData,
            isLoggedIn
          );
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
      // console.log("Final report response:", finalReportResponse);

      let attempts3 = 0;

      while (
        !finalReportResponse ||
        !finalReportResponse.response ||
        !finalReportResponse.response.customer_value_final_report ||
        !finalReportResponse.response.customer_value_final_report.title ||
        !finalReportResponse.response.customer_value_final_report.content_1 ||
        !finalReportResponse.response.customer_value_final_report.content_2
      ) {
        if (attempts3 >= maxAttempts) {
          setShowPopupError(true);
          return;
        }
        attempts3++;

        finalReportResponse =
          await InterviewXCustomerValueAnalyzerFinalReportRequest(
            finalReportData,
            isLoggedIn
          );
      }

      setCustomerValueAnalyzerFinalReport(
        finalReportResponse.response.customer_value_final_report
      );
      // console.log(
      //   "customerValueAnalyzerFinalReport",
      //   customerValueAnalyzerFinalReport
      // );

      setToolStep(4);
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
      console.error("Error in handleReport:", error);
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

  // const clusterList = customerValueAnalyzerPositioning?.cluster_list || [];

  const MermaidDiagram = ({ code }) => {
    const [imageUrl, setImageUrl] = useState("");
    const elementId = useRef(`mermaid-diagram-${Date.now()}`);

    useEffect(() => {
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
        } catch (error) {
          console.error("Mermaid rendering error:", error);
        }
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

  const [creditIndepthInterview] = useAtom(CREDIT_INDEPTH_INTERVIEW);

  const [isIndepthEnabled, setIsIndepthEnabled] = useState(false);

  const [selectedInterviewPurposeData] = useAtom(
    SELECTED_INTERVIEW_PURPOSE_DATA
  );

  // 버튼 클릭 핸들러 추가
  const handlePersonaButtonClick = (personaId) => {
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
      // 1. Performance API 확인
      // if (performance.navigation && performance.navigation.type === 1) {
      //   console.log("새로고침 감지: Performance API");
      //   navigate("/");
      //   return true;
      // }

      // 2. 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("customervalueanalyzer")) {
        // 세션 스토리지에서 마지막 URL 가져오기
        const lastUrl = sessionStorage.getItem("lastUrl");

        // 마지막 URL이 현재 URL과 같으면 새로고침
        if (lastUrl && lastUrl === currentUrl) {
          navigate("/");
          return true;
        }

        // 현재 URL 저장
        sessionStorage.setItem("lastUrl", currentUrl);
      }

      return false;
    };

    // 함수 실행
    detectRefresh();

    // 컴포넌트 마운트 시 한 번만 실행
  }, [navigate]);

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
              >
                <span>01</span>
                <div className="text">
                  <Body1 color={activeTab >= 1 ? "gray800" : "gray300"}>
                    페르소나 선택
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
                    고객 여정 맵 분석
                  </Body1>
                  <Body1 color={activeTab >= 2 ? "gray800" : "gray300"}>
                    Customer Journey
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
                    구매 결정 요인 분석
                  </Body1>
                  <Body1 color={activeTab >= 3 ? "gray800" : "gray300"}>
                    Key Buying Factor
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 4}
                onClick={() => completedSteps.includes(3) && setActiveTab(4)}
                disabled={!completedSteps.includes(3)}
              >
                <span>04</span>
                <div className="text">
                  <Body1 color={activeTab >= 4 ? "gray800" : "gray300"}>
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
                    <AtomPersonaLoader message="잠재 고객을 분석하고 있어요" />
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
                      <ListBoxGroup style={{ marginBottom: "24px" }}>
                        <li>
                          <Body2 color="gray500">페르소나 선택</Body2>
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
                                          src={`/ai_person/${persona.personaImg}.png`}
                                          alt={persona.persona}
                                        />
                                      </Persona>
                                    ))}
                                </>
                              ) : (
                                <Persona size="Small" Round>
                                  <img
                                    src={`/ai_person/${selectedPersonas.personaImg}.png`}
                                    alt={selectedPersonas.persona}
                                  />
                                </Persona>
                              )}
                            </PersonaGroup>
                          ) : (
                            <Body2 color="gray500">
                              페르소나가 선택되지 않았습니다. 하단에서
                              페르소나를 선택해 주세요!
                            </Body2>
                          )}
                        </li>
                        <li>
                          <Body2 color="gray500">여정 분석 범위</Body2>
                          <SelectBox>
                            <SelectBoxTitle
                              onClick={() =>
                                setIsSelectBoxOpen(!isSelectBoxOpen)
                              }
                              None
                            >
                              {selectedPurposes.analysisScope ? (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  <Body1 color="gray700" align="left">
                                    {
                                      selectedPurposes.analysisScope.split(
                                        "|"
                                      )[0]
                                    }{" "}
                                    |
                                  </Body1>
                                  <Body2 color="gray700" align="left">
                                    {
                                      selectedPurposes.analysisScope.split(
                                        "|"
                                      )[1]
                                    }
                                  </Body2>
                                </div>
                              ) : (
                                <Body2 color="gray300">
                                  고객 여정 맵의 분석 방향성을 선택하세요
                                </Body2>
                              )}
                              <images.ChevronDown
                                width="24px"
                                height="24px"
                                color={palette.gray500}
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
                        </li>
                      </ListBoxGroup>

                      <OrganismPersonaList
                        personaListSaas={personaListSaas}
                        personaImages={personaImages}
                        selectedPersonaButtons={selectedPersonaButtons}
                        handlePersonaButtonClick={handlePersonaButtonClick}
                        onNavigate={navigate}
                        onPersonaSelect={(id) =>
                          handlePersonaSelectionChange(id)
                        }
                      />
                    </div>
                    <Button
                      Other
                      Primary
                      Fill
                      Round
                      onClick={() => handleSubmitBusinessInfo()}
                      disabled={
                        selectedPurposes.analysisScope === "" ||
                        getSelectedPersonaCount() === 0 ||
                        toolStep >= 1
                      }
                    >
                      다음
                    </Button>
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

                <div className="content">
                  <CardGroupWrap column>
                    {(
                      customerValueAnalyzerInfo?.targetList || selectedCustomers
                    ).map((target, index) => {
                      return (
                        <MoleculeCustomerValueCard
                          key={index}
                          id={index}
                          title={target?.personaName || ""}
                          content={customerValueAnalyzerPersona?.[index] || ""}
                          business={
                            customerValueAnalyzerInfo?.business ||
                            "비즈니스 정보 없음"
                          }
                          status={
                            Array.isArray(customerValueAnalyzerJourneyMap) &&
                            (customerValueAnalyzerJourneyMap?.length || 0) >
                              0 &&
                            (customerValueAnalyzerJourneyMap?.length || 0) ===
                              (customerValueAnalyzerInfo?.targetList?.length ||
                                0)
                              ? "completed"
                              : cardStatuses[index] || "대기 중"
                          }
                          isSelected={(selectedPersonas || []).includes(index)}
                          onSelect={(id) => handleCheckboxChange?.(id)}
                          viewType="list"
                          journeyMapData={
                            // Array.isArray(customerValueAnalyzerJourneyMap) &&
                            // customerValueAnalyzerJourneyMap?.[index]
                            //   ? customerValueAnalyzerJourneyMap[index]
                            //   : {}

                            customerValueAnalyzerJourneyMap[index] || {}
                          }
                        />
                      );
                    })}
                  </CardGroupWrap>
                  <BottomBar W100>
                    <Body2
                      color={
                        (selectedPersonas?.length || 0) === 0
                          ? "gray300"
                          : "gray800"
                      }
                    >
                      구매 결정 요인 분석을 원하는 페르소나를 선택해주세요 (
                      {selectedPersonas?.length || 0}/5)
                    </Body2>
                    <Button
                      Large
                      Primary
                      Round
                      Fill
                      disabled={
                        (selectedPersonas?.length || 0) === 0 ||
                        (toolStep || 0) >= 2 ||
                        !Array.isArray(customerValueAnalyzerJourneyMap) ||
                        (customerValueAnalyzerJourneyMap?.length || 0) !==
                          (customerValueAnalyzerInfo?.targetList?.length || 0)
                      }
                      onClick={() => handleSubmitPersonas()}
                    >
                      다음
                      <images.ChevronRight
                        width="20"
                        height="20"
                        color={palette?.white}
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
                    각 페르소나 별로 어떤 구매 핵심 요소가 도출되었을까요?
                    우리는 어떤 요소에 집중하면 좋을까요?
                  </Body3>
                </div>

                <div className="content">
                  <CardGroupWrap column>
                    {customerValueAnalyzerSelectedPersona.map(
                      (persona, index) => {
                        return (
                          <MoleculeCustomerValueCard
                            key={index}
                            id={index}
                            title={persona.target.personaName} // title에 문자열을 전달
                            content={persona.content} // content에 문자열을 전달
                            status={
                              customerValueAnalyzerFactor.length ===
                              customerValueAnalyzerSelectedPersona.length
                                ? "completed"
                                : cardStatusesFactor[index]
                            }
                            factor={customerValueAnalyzerFactor[index]}
                            business={
                              project.projectTitle || "비즈니스 정보 없음"
                            } // 기본값 설정
                            journeyMapData={persona.journeyMap || {}} // 기본값으로 빈 객체 설정
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
                      {selectedPersonas.length}명의 페르소나에 대한 잠재고객
                      가능성을 분석해드릴게요
                    </Body2>
                    <Button
                      Large
                      Primary
                      Round
                      Fill
                      disabled={
                        !Array.isArray(customerValueAnalyzerFactor) ||
                        !customerValueAnalyzerFactor.every(
                          (factor) => factor
                        ) ||
                        customerValueAnalyzerFactor.length === 0
                        // toolStep >= 4 ||
                        // !customerValueAnalyzerFactor.every((factor) => factor)
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
                      {/* <div className="title">
                        <div>
                          <TabWrapType4>
                            <TabButtonType4>종합 분석 결과</TabButtonType4>
                            <TabButtonType4>
                              클러스터링 항목 상세 보기
                            </TabButtonType4>
                          </TabWrapType4>
                        </div>
                        <Button Primary onClick={() => setShowPopupSave(true)}>
                          리포트 저장하기
                        </Button>
                      </div> */}

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
                        <BoxWrap Column>
                          <Body3 color="gray700">
                            가로축 (X축) - 영향력 : 많은 사람들이 중요하게
                            여기는 구매 결정 요인의 영향 정도
                          </Body3>
                          <Body3 color="gray700">
                            세로축 (Y축) - 불만족도 : 사람들이 해당 구매 요인에
                            대해 불만족을 느끼는 정도{" "}
                          </Body3>
                        </BoxWrap>
                      </div>

                      <ValueMap>
                        {/* 
                        <div className="title">
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
                        */}

                        <div className="content">
                          <div className="mermaid">
                            {/* <MermaidDiagram code={customerValueAnalyzerPositioning?.mermaid} /> */}
                            <MermaidDiagram code={cleanMermaidCode} />
                            {/* <MermaidDiagram code={mermaidCode} /> */}

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
                                            {cluster.cluster_name.length > 16
                                              ? `${label} : ${cluster.cluster_name.substring(
                                                  0,
                                                  16
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

                    {/* <Button
                      Small
                      Primary
                      onClick={() => setShowPopupSave(true)}
                    >
                      리포트 저장하기
                    </Button> */}
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

const CustomerValueWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  ${(props) =>
    props.NoData &&
    css`
      gap: 20px;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      border-radius: 10px;
      border: 1px solid ${palette.outlineGray};
      transition: all 0.2s ease-in-out;
      &:hover {
        border-color: ${palette.primary};
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        transform: translateY(-2px);
      }
    `}
`;
const ToolPublicPersonaWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  ${(props) =>
    props.NoData &&
    css`
      gap: 20px;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      border-radius: 10px;
      border: 1px solid ${palette.outlineGray};
      transition: all 0.2s ease-in-out;
      &:hover {
        border-color: ${palette.primary};
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        transform: translateY(-2px);
      }
    `}
`;
const ListText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ListTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ListSubtitle = styled.div``;

const ListButton = styled.div``;

const CustomButton = styled(Button)`
  min-width: 92px;
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
