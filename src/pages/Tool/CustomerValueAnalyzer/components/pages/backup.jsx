//고객 핵심 가치 분석기
import React, { useEffect, useState, useRef } from "react";
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
  Badge,
  TabWrapType2,
  TabButtonType2,
  TabWrapType3,
  TabButtonType3,
  TabWrapType4,
  TabButtonType4,
  TabContent,
  TabWrapType5,
  TabButtonType5,
  TabContent5,
  TabContent5Item,
  CardGroupWrap,
  ListText,
  ListTitle,
  ListSubtitle,
  ListButton,
  BottomBar,
  BgBoxItem,
  ListBoxWrap,
  ListBoxItem,
  ListBoxTitle,
  ListBoxContent,
  Keyword,
  InterviewPopup,
  Status,
  ListRowWrap,
  ListRowItem,
  BoxWrap,
  PopupContent,
  PopupTitle,
  PopupTitle2,
  TextWrap,
  ListBox,
  ListGroup,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../../assets/styles/Images";
import {
  H4,
  H3,
  H5,
  Sub1,
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
  CUSTOMER_VALUE_ANALYZER_SELECTED_FACTOR,
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

const PageCustomerValueAnalyzer = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
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
  const [selectedPurposes, setSelectedPurposes] = useState({
    customerList: "",
    analysisScope: "",
  });
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

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  // 스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //저장되었던 인터뷰 로드
  useEffect(() => {
    const interviewLoading = async () => {
      // console.log("toolLoading", toolLoading);
      if (toolLoading) {
        // 활성 탭 설정 (기본값 1)
        setActiveTab(Math.min((toolStep ?? 1) + 1, 4));

        // 비즈니스 정보 설정 (Step 1)
        // console.log("customerValueAnalyzerInfo", customerValueAnalyzerInfo);
        if (customerValueAnalyzerInfo) {
          setBusinessDescription(
            customerValueAnalyzerInfo?.analysis_purpose ?? ""
          );
          setTargetCustomers(customerValueAnalyzerInfo?.target_list ?? [""]);
          setSelectedPurposes((prev) => ({
            ...prev,
            analysisScope: customerValueAnalyzerInfo?.analysis_scope ?? "",
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
        if (toolStep >= 3) {
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

          // 선택된 페르소나의 target을 기반으로 selectedPersonas 설정
          const selectedTargets = customerValueAnalyzerSelectedPersona.map(
            (persona) => persona.target
          );

          // customerValueAnalyzerPersona가 있는지 확인하고 매칭
          if (
            Array.isArray(customerValueAnalyzerPersona) &&
            customerValueAnalyzerPersona.length > 0
          ) {
            const selectedIndices = customerValueAnalyzerPersona
              .map((persona, index) => {
                // content 객체에서 target 값을 찾아 비교
                const personaTarget =
                  customerValueAnalyzerInfo?.target_list?.[index];
                return selectedTargets.includes(personaTarget) ? index : -1;
              })
              .filter((index) => index !== -1);

            // console.log("Selected Targets:", selectedTargets);
            // console.log("Selected Indices:", selectedIndices);

            if (selectedIndices.length > 0) {
              setSelectedPersonas(selectedIndices);
            }
          }
        }
        // 고객 여정 맵 설정 (Step 3)
        if (Array.isArray(customerValueAnalyzerJourneyMap)) {
          setCustomerValueAnalyzerJourneyMap(customerValueAnalyzerJourneyMap);
        }

        // if (Array.isArray(customerValueAnalyzerFactor)) {
        //   setCustomerValueAnalyzerFactor(customerValueAnalyzerFactor);
        // }

        // ... existing code ...
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

        // console.log("customerValueAnalyzerFactor", customerValueAnalyzerFactor);
        // console.log("completedStepsArray", completedStepsArray);

        // 최종 리포트 설정 (Step 4)
        if (customerValueAnalyzerFinalReport) {
          setCustomerValueAnalyzerFinalReport(
            customerValueAnalyzerFinalReport ?? {}
          );
        }

        return;
      }
    };
    interviewLoading();
    setToolLoading(false);
  }, [toolLoading]);

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
          if (!response || !response.data) {
            console.error("Invalid response from server");
            break;
          }

          const targetDiscoveryData = response.data.filter(
            (item) => item.type === "ix_target_discovery_persona"
          );

          const newItems = targetDiscoveryData.filter(
            (item) => item?.target_discovery_scenario?.length > 0
          );

          allItems = [...allItems, ...newItems];

          // Check if we've reached the end of the data
          if (!response.count || response.count <= page * size) {
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
    // console.log("customerValueAnalyzerJourneyMap", customerValueAnalyzerJourneyMap);
    if (
      activeTab === 2 &&
      customerValueAnalyzerPersona.length > 0 &&
      toolStep < 2 &&
      !apiCallCompleted &&
      Object.keys(customerValueAnalyzerJourneyMap).length === 0
    ) {
      // console.log("customerValueAnalyzerJourneyMap", customerValueAnalyzerJourneyMap);
      // toolStep이 2보다 작을 때만 API 호출
      // 모든 카드의 상태를 waiting으로 초기화
      // console.log("customerValueAnalyzerPersona", customerValueAnalyzerPersona);
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
        // console.log("customerValueAnalyzerInfo.target_list", customerValueAnalyzerInfo.target_list);
        let journeyMapData = [];
        for (
          let index = 0;
          index < customerValueAnalyzerInfo.target_list.length;
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
              target: customerValueAnalyzerInfo.target_list[index],
              analysis_scope: customerValueAnalyzerInfo.analysis_scope,
              analysis_purpose: customerValueAnalyzerPersona[index],
            };
            // console.log("data", data);

            const response =
              await InterviewXCustomerValueAnalyzerJourneyMapRequest(
                data,
                isLoggedIn
              );
            // console.log("Journey Map 응답:", response);

            if (response?.response?.customer_value_journey_map) {
              journeyMapData.push({
                ...response.response.customer_value_journey_map,
                business: customerValueAnalyzerInfo.business,
                target: customerValueAnalyzerInfo.target_list[index],
              });
            }

            // setCustomerValueAnalyzerJourneyMap(journeyMapData);

            setCustomerValueAnalyzerJourneyMap((prev) => {
              // prev가 undefined인 경우 빈 배열로 초기화
              const currentJourneyMaps = Array.isArray(prev) ? prev : [];
              // 새로운 journey map이 존재하는 경우에만 추가
              if (response?.response?.customer_value_journey_map) {
                return [
                  ...currentJourneyMaps,
                  response.response.customer_value_journey_map,
                ];
              }
              return currentJourneyMaps;
            });

            // 성공적인 응답 후 카드 상태 업데이트
            if (response?.response?.customer_value_journey_map) {
              setCardStatuses((prev) => ({
                ...prev,
                [index]: "completed",
              }));
            }

            // 모든 시나리오를 한번에 저장
            await updateToolOnServer(
              toolId,
              {
                customer_value_journey_map: journeyMapData,
              },
              isLoggedIn
            );
          } catch (error) {
            console.error(`Journey Map API 호출 실패 (카드 ${index}):`, error);
          }
        }
        setApiCallCompleted(true); // API 호출 완료 상태로 설정
      };
      processSequentially();
    } else if (activeTab === 2 && toolStep >= 2) {
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

  const handleSubmitBusinessInfo = async () => {
    try {
      setIsLoading(true);

      // targetCustomers 배열에서 빈 값을 제거합니다.
      const filteredTargetCustomers = targetCustomers.filter(
        (customer) => customer.trim() !== ""
      );

      const businessData = {
        business: selectedBusiness || businessDescription,
        target_list: filteredTargetCustomers, // 필터링된 리스트를 사용합니다.
        analysis_scope: selectedPurposes.analysisScope,
        analysis_purpose: businessDescription,
      };
      // console.log("businessData", businessData);

      const response = await InterviewXCustomerValueAnalyzerPersonaRequest(
        businessData,
        isLoggedIn
      );

      const maxAttempts = 10;
      let attempts = 0;

      while (
        !response ||
        !response?.response ||
        !response?.response.customer_value_persona ||
        !Array.isArray(response.response.customer_value_persona) ||
        response.response.customer_value_persona.length === 0
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

      const responseToolId = await createToolOnServer(
        {
          type: "ix_customer_value_persona",
          completed_step: 1,
          customer_value_persona: response.response.customer_value_persona,
          ...businessData,
        },
        isLoggedIn
      );
      setToolId(responseToolId);
      setToolStep(1);

      // API 응답에서 페르소나 데이터를 추출하여 atom에 저장
      setCustomerValueAnalyzerPersona(
        response.response.customer_value_persona || []
      );
      // console.log("customerValueAnalyzerPersona", customerValueAnalyzerPersona);

      setCustomerValueAnalyzerInfo(businessData);

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

  const handleTargetDiscoveryClick = (business) => {
    setBusinessDescription(business);
  };

  const calculateDropDirection = (ref, selectBoxId) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropDownHeight = 200;

      setDropUpStates((prev) => ({
        ...prev,
        [selectBoxId]: spaceBelow < dropDownHeight && spaceAbove > spaceBelow,
      }));
    }
  };

  const handleSelectBoxClick = (selectBoxId, ref) => {
    calculateDropDirection(ref, selectBoxId);
    setSelectBoxStates((prev) => ({
      ...prev,
      [selectBoxId]: !prev[selectBoxId],
    }));
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

  const handleCheckboxChange = (index) => {
    if (toolStep >= 2) return;
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

  // 필수 필드가 모두 입력되었는지 확인하는 함수
  const isRequiredFieldsFilled = () => {
    return (
      businessDescription.trim() !== "" &&
      targetCustomers.some((customer) => customer.trim() !== "") && // 최소 1개 이상의 고객 정보가 입력되었는지 확인
      selectedPurposes.analysisScope !== ""
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
        completed_step: 2,
      },
      isLoggedIn
    );
    setToolStep(2);
    handleNextStep(2);
    setApiCallCompletedFactor(false);
    try {
      const selectedPersonaData = selectedPersonas.map((index) => ({
        content: customerValueAnalyzerPersona[index],
        target: customerValueAnalyzerInfo.target_list[index],
        journeyMap: customerValueAnalyzerJourneyMap[index],
      }));
      setCustomerValueAnalyzerSelectedPersona(selectedPersonaData);

      await updateToolOnServer(
        toolId,
        {
          selected_customer_value_persona: selectedPersonaData,
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
          business: customerValueAnalyzerInfo.business,
          target: persona.target,
          analysis_scope: customerValueAnalyzerInfo.analysis_scope,
          customer_value_journey_map: persona.journeyMap,
        };

        try {
          const response = await InterviewXCustomerValueAnalyzerFactorRequest(
            requestData,
            isLoggedIn
          );

          const maxAttempts = 10;
          let attempts = 0;

          // while (
          //   !response ||
          //   !response?.response ||
          //   !response?.response?.customer_value_factor ||
          //   !Array.isArray(response.response.customer_value_factor) ||
          //   response.response.customer_value_factor.length === 0 ||
          //   response?.response?.customer_value_factor.some(factor => !factor.key_buying_factors || !factor.conclusion)
          // ) {
          //   if (attempts >= maxAttempts) {
          //     setShowPopupError(true);
          //     return;
          //   }
          //   attempts++;

          //   response = await InterviewXCustomerValueAnalyzerFactorRequest(
          //     requestData,
          //     isLoggedIn
          //   );
          // }

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

      setCustomerValueAnalyzerFactor(results);

      await updateToolOnServer(
        toolId,
        {
          customer_value_factor: results,
        },
        isLoggedIn
      );

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
      await updateToolOnServer(
        toolId,
        {
          completed_step: 3,
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
      const clusteringResponse =
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
        business: customerValueAnalyzerInfo.business,
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
          completed_step: 4,
          customer_value_clustering:
            clusteringResponse.response.customer_value_clustering,
          customer_value_positioning:
            positioningResponse.response.customer_value_positioning,
          customer_value_final_report:
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
                    고객 정보 입력
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
                      <TabContent5Item borderBottom>
                        <div className="title">
                          <Body1 color="gray700">고객 리스트 불러오기</Body1>
                        </div>

                        <SelectBox ref={customerListRef}>
                          <SelectBoxTitle
                            onClick={() =>
                              handleSelectBoxClick(
                                "customerList",
                                customerListRef
                              )
                            }
                          >
                            <Body2
                              color={
                                selectedPurposes.customerList
                                  ? "gray800"
                                  : "gray300"
                              }
                            >
                              {selectedPurposes.customerList ||
                                "타겟 탐색기를 진행이 완료된 경우, 정보를 가져올 수 있습니다."}
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
                              {targetDiscoveryList.length === 0 ? (
                                <SelectBoxItem
                                  disabled={toolStep >= 1}
                                  // onClick={() =>
                                  //   handlePurposeSelect(
                                  //     "진행된 프로젝트가 없습니다. 타겟 탐색기를 먼저 진행해주세요",
                                  //     "customerList"
                                  //   )
                                  // }
                                >
                                  <Body2 color="gray300" align="left">
                                    진행된 프로젝트가 없습니다. 타겟
                                    디스커버리를 먼저 진행해주세요
                                  </Body2>
                                </SelectBoxItem>
                              ) : (
                                targetDiscoveryList.map((item, index) => (
                                  <SelectBoxItem
                                    disabled={toolStep >= 1}
                                    key={index}
                                    onClick={() => {
                                      handlePurposeSelect(
                                        item.business,
                                        "customerList"
                                      );
                                      setTargetCustomers(
                                        item.target_discovery_scenario.map(
                                          (persona) => persona.title
                                        )
                                      );
                                    }}
                                  >
                                    <Body2 color="gray700" align="left">
                                      {item.business}
                                    </Body2>
                                  </SelectBoxItem>
                                ))
                              )}
                            </SelectBoxList>
                          )}
                        </SelectBox>

                        <Sub3 color="gray700">
                          💡 타겟 탐색기를 진행하신 경우, 더 디테일한 분석이
                          가능합니다
                        </Sub3>
                      </TabContent5Item>

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
                          <Body1 color="gray700">
                            고객 여정 분석을 원하는 고객 정보 (최대 5명 입력)
                          </Body1>
                          <Body1 color="red">*</Body1>
                        </div>
                        {targetCustomers.map((customer, index) => (
                          <CustomInput
                            disabled={toolStep >= 1}
                            key={index}
                            type="text"
                            placeholder="핵심 타겟 고객 군을 작성해주세요 (예: 20대 여성 등)"
                            value={customer}
                            onChange={(e) =>
                              handleTargetCustomerChange(index, e.target.value)
                            }
                          />
                        ))}
                        <Button
                          DbExLarge
                          More
                          onClick={() => {
                            if (targetCustomers.length < 5) {
                              setTargetCustomers((prev) => [...prev, ""]);
                            }
                          }}
                          disabled={
                            targetCustomers.length >= 5 || toolStep >= 1
                          }
                        >
                          <Body2 color="gray300">+ 추가하기</Body2>
                        </Button>
                      </TabContent5Item>

                      <TabContent5Item required>
                        <div className="title">
                          <Body1 color="gray700">고객 여정 맵 분석 범위</Body1>
                          <Body1 color="red">*</Body1>
                        </div>

                        <SelectBox ref={analysisScopeRef}>
                          <SelectBoxTitle
                            disabled={toolStep >= 1}
                            onClick={() =>
                              handleSelectBoxClick(
                                "analysisScope",
                                analysisScopeRef
                              )
                            }
                          >
                            <Body2
                              color={
                                selectedPurposes.analysisScope
                                  ? "gray800"
                                  : "gray300"
                              }
                            >
                              {selectedPurposes.analysisScope ||
                                "고객 여정 맵의 분석 방향성을 선택하세요"}
                            </Body2>
                            <images.ChevronDown
                              width="24px"
                              height="24px"
                              color={palette.gray500}
                              style={{
                                transform: selectBoxStates.analysisScope
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                              }}
                            />
                          </SelectBoxTitle>

                          {selectBoxStates.analysisScope && (
                            <SelectBoxList dropUp={dropUpStates.analysisScope}>
                              <SelectBoxItem
                                disabled={toolStep >= 1}
                                onClick={() =>
                                  handlePurposeSelect(
                                    "시간 흐름 기반 여정 분석 | 제품/서비스의 전체적인 사용자 여정을 기반으로 분석",
                                    "analysisScope"
                                  )
                                }
                              >
                                <Body1
                                  color="gray700"
                                  align="left"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  시간 흐름 기반 여정 분석
                                  <Body2 color="gray700">
                                    　|　제품/서비스의 전체적인 사용자 여정을
                                    기반으로 분석
                                  </Body2>
                                </Body1>
                              </SelectBoxItem>
                              <SelectBoxItem
                                disabled={toolStep >= 1}
                                onClick={() =>
                                  handlePurposeSelect(
                                    "상황 중심 여정 분석 | 특정 이벤트나 고객 경험을 중심으로 여정 분석",
                                    "analysisScope"
                                  )
                                }
                              >
                                <Body1
                                  color="gray700"
                                  align="left"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  상황 중심 여정 분석
                                  <Body2 color="gray700">
                                    　|　특정 이벤트나 고객 경험을 중심으로 여정
                                    분석
                                  </Body2>
                                </Body1>
                              </SelectBoxItem>
                              <SelectBoxItem
                                disabled={toolStep >= 1}
                                onClick={() =>
                                  handlePurposeSelect(
                                    "목적 기반 여정 분석 | 고객이 제품/서비스를 사용하여 달성하려는 목표를 중심으로 여정 분석",
                                    "analysisScope"
                                  )
                                }
                              >
                                <Body1
                                  color="gray700"
                                  align="left"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  목적 기반 여정 분석
                                  <Body2 color="gray700">
                                    　|　고객이 제품/서비스를 사용하여
                                    달성하려는 목표를 중심으로 여정 분석
                                  </Body2>
                                </Body1>
                              </SelectBoxItem>
                            </SelectBoxList>
                          )}
                        </SelectBox>
                      </TabContent5Item>
                    </div>

                    <Button
                      Other
                      Primary
                      Fill
                      Round
                      onClick={() => handleSubmitBusinessInfo()}
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
                <div className="title">
                  <H3 color="gray800">Customer Journey Map</H3>
                  <Body3 color="gray800">
                    고객 여정 맵 분석을 통해 비즈니스와 연결되는 핵심
                    터치포인트를 도출합니다
                  </Body3>
                </div>

                <div className="content">
                  <CardGroupWrap column>
                    {customerValueAnalyzerInfo.target_list.map(
                      (target, index) => {
                        return (
                          <MoleculeCustomerValueCard
                            key={index}
                            id={index}
                            title={target}
                            content={customerValueAnalyzerPersona[index]}
                            business={customerValueAnalyzerInfo.business}
                            status={
                              customerValueAnalyzerJourneyMap.length ===
                              customerValueAnalyzerInfo.target_list.length
                                ? "completed"
                                : cardStatuses[index]
                            }
                            isSelected={selectedPersonas.includes(index)}
                            onSelect={(id) => handleCheckboxChange(id)}
                            viewType="list"
                            journeyMapData={
                              customerValueAnalyzerJourneyMap[index]
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
                      구매 결정 요인 분석을 원하는 페르소나를 선택해주세요 (
                      {selectedPersonas.length}/5)
                    </Body2>
                    <Button
                      Large
                      Primary
                      Round
                      Fill
                      disabled={
                        selectedPersonas.length === 0 ||
                        toolStep >= 2 ||
                        // Object.values(cardStatuses).some(
                        //   (status) =>
                        //     status === "loading" || status === "waiting"
                        // )
                        customerValueAnalyzerJourneyMap.length !==
                          customerValueAnalyzerInfo.target_list.length
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
                    각 페르소나 별로 어떤 구매 핵심 요소가 도출되었을까요?
                    우리는 어떤 요소에 집중하면 좋을까요?
                  </Body3>
                </div>

                <div className="content">
                  <CardGroupWrap column>
                    {customerValueAnalyzerSelectedPersona.map(
                      (persona, index) => (
                        <MoleculeCustomerValueCard
                          key={index}
                          id={index}
                          title={persona.target}
                          content={persona.content}
                          status={
                            customerValueAnalyzerFactor.length ===
                            customerValueAnalyzerSelectedPersona.length
                              ? "completed"
                              : cardStatusesFactor[index]
                          }
                          factor={customerValueAnalyzerFactor[index]}
                          business={customerValueAnalyzerInfo.business}
                          journeyMapData={persona.journeyMap}
                          showOnlySelected={true}
                          hideCheckCircle={true}
                          activeTab={3}
                          viewType="list"
                        />
                      )
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
                        <H4 color="gray800">
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
      {/* 
      {showPopupMore && (
        <PopupWrap
          Wide1000
          title={
            <>
              <H4 color="gray800" align="left">
                (Persona name)의 (Business)
                <br />
                고객 여정 분석
              </H4>
            </>
          }
          buttonType="Fill"
          isModal={true}
          showTabs={true}
          activeTab={activeTabIndex}
          onTabChange={(index) => setActiveTabIndex(index)}
          eventState={false}
          creditRequestCustomPersona={1}
          customAlertBox={
            <TextWrap>
              <Body2 color="gray800" align="left">
                이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다.
                특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이
                증가하는 상황에서 유망한 성장 기회를 가집니다. 다만, 참신함이 곧
                블루 오션을 의미하지 않으므로, 진입 전략은 사용자 친화적 디자인,
                가족의 참여를 유도하는 마케팅, 맞춤형 프로그램으로 보강해야
                합니다.
              </Body2>
            </TextWrap>
          }
          body={
            <>
              <ListGroup>
                <div>
                  <Body1 color="gray800" align="left">
                    뛰어난 지속력
                  </Body1>
                  <Sub3 color="gray800" align="left">
                    시간에 민감한 페르소나에게 수정 화장은 시간 낭비이자 업무
                    효율 저하의 원인입니다. 하루 종일 지속되는 메이크업은 그녕의
                    프로페셔널한 이미지 유지와 업무 집중도 향상에 직결됩니다.
                  </Sub3>
                </div>
                <div>
                  <Body1 color="gray800" align="left">
                    뛰어난 지속력
                  </Body1>
                  <Sub3 color="gray800" align="left">
                    시간에 민감한 페르소나에게 수정 화장은 시간 낭비이자 업무
                    효율 저하의 원인입니다. 하루 종일 지속되는 메이크업은 그녕의
                    프로페셔널한 이미지 유지와 업무 집중도 향상에 직결됩니다.
                  </Sub3>
                </div>
                <div>
                  <Body1 color="gray800" align="left">
                    뛰어난 지속력
                  </Body1>
                  <Sub3 color="gray800" align="left">
                    시간에 민감한 페르소나에게 수정 화장은 시간 낭비이자 업무
                    효율 저하의 원인입니다. 하루 종일 지속되는 메이크업은 그녕의
                    프로페셔널한 이미지 유지와 업무 집중도 향상에 직결됩니다.
                  </Sub3>
                </div>
                <div>
                  <Body1 color="gray800" align="left">
                    뛰어난 지속력
                  </Body1>
                  <Sub3 color="gray800" align="left">
                    시간에 민감한 페르소나에게 수정 화장은 시간 낭비이자 업무
                    효율 저하의 원인입니다. 하루 종일 지속되는 메이크업은 그녕의
                    프로페셔널한 이미지 유지와 업무 집중도 향상에 직결됩니다.
                  </Sub3>
                </div>
                <div>
                  <Body1 color="gray800" align="left">
                    뛰어난 지속력
                  </Body1>
                  <Sub3 color="gray800" align="left">
                    시간에 민감한 페르소나에게 수정 화장은 시간 낭비이자 업무
                    효율 저하의 원인입니다. 하루 종일 지속되는 메이크업은 그녕의
                    프로페셔널한 이미지 유지와 업무 집중도 향상에 직결됩니다.
                  </Sub3>
                </div>
                <div>
                  <Body1 color="gray800" align="left">
                    뛰어난 지속력
                  </Body1>
                  <Sub3 color="gray800" align="left">
                    시간에 민감한 페르소나에게 수정 화장은 시간 낭비이자 업무
                    효율 저하의 원인입니다. 하루 종일 지속되는 메이크업은 그녕의
                    프로페셔널한 이미지 유지와 업무 집중도 향상에 직결됩니다.
                  </Sub3>
                </div>
                <div>
                  <Body1 color="gray800" align="left">
                    뛰어난 지속력
                  </Body1>
                  <Sub3 color="gray800" align="left">
                    시간에 민감한 페르소나에게 수정 화장은 시간 낭비이자 업무
                    효율 저하의 원인입니다. 하루 종일 지속되는 메이크업은 그녕의
                    프로페셔널한 이미지 유지와 업무 집중도 향상에 직결됩니다.
                  </Sub3>
                </div>
              </ListGroup>
            </>
          }
        />
      )} */}

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

// 툴팁을 위한 스타일 컴포넌트 추가
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
