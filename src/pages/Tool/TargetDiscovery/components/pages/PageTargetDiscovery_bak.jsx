//타겟 탐색기리
import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../assets/styles/Palette";
import AtomPersonaLoader from "../../../Global/atoms/AtomPersonaLoader";
import OrganismIncNavigation from "../organisms/OrganismIncNavigation";
import MoleculeHeader from "../molecules/MoleculeHeader";

import {
  ButtonGroup,
  Button,
  IconButton,
} from "../../../../assets/styles/ButtonStyle";
import {
  FormBox,
  CustomTextarea,
  CustomInput,
  SelectBox,
  SelectBoxItem,
  SelectBoxTitle,
  SelectBoxList,
  CheckBoxButton,
} from "../../../../assets/styles/InputStyle";
import PopupWrap from "../../../../assets/styles/Popup";
import {
  ContentsWrap,
  MainContent,
  Badge,
  TabWrapType2,
  TabButtonType2,
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
} from "../../../../assets/styles/BusinessAnalysisStyle";
import {
  IS_LOGGED_IN,
  TARGET_DISCOVERY_INFO,
  TARGET_DISCOVERY_PERSONA,
  SELECTED_TARGET_DISCOVERY_PERSONA,
  TARGET_DISCOVERY_SCENARIO,
  TARGET_DISCOVERY_FINAL_REPORT,
  TOOL_ID,
} from "../../../AtomStates";
import images from "../../../../assets/styles/Images";
import {
  H4,
  H3,
  H5,
  Sub3,
  Body1,
  Body2,
  Body3,
} from "../../../../assets/styles/Typography";
import MoleculeToolPersonaCard from "../molecules/MoleculeToolPersonaCard";
import {
  InterviewXTargetDiscoveryPersonaRequest,
  InterviewXTargetDiscoveryScenarioRequest,
  InterviewXTargetDiscoveryFinalReportRequest,
  createToolOnServer,
} from "../../../../utils/indexedDB";

const PageTargetDiscovery = () => {
  const [toolId, setToolId] = useAtom(TOOL_ID);
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
  const [specificSituation, setSpecificSituation] = useState("");
  const [processedScenarios, setProcessedScenarios] = useState([]);
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

  const handleCheckboxChange = (personaId) => {
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
    return businessDescription.trim() !== "" && targetCustomer.trim() !== "";
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
      // console.log(
      //   "🚀 ~ handleSubmitBusinessInfo ~ businessData:",
      //   businessData
      // );

      // // Validation logic
      // if (!businessData.business || !businessData.target) {
      //   setShowPopupError(true);
      //   return;
      // }

      const response = await InterviewXTargetDiscoveryPersonaRequest(
        businessData,
        isLoggedIn
      );

      // console.log("🚀 ~ handleSubmitBusinessInfo ~ response:", response);
      if (
        !response?.response.target_discovery_persona ||
        !Array.isArray(response.response.target_discovery_persona) ||
        response.response.target_discovery_persona.length === 0
      ) {
        // console.log("🚀 ~ handleSubmitBusinessInfo ~ response:", response);
        setShowPopupError(true);
        return;
      }
      const responseToolId = await createToolOnServer(
        {
          type: "ix_target_discovery_persona",
          ...businessData,
        },
        isLoggedIn
      );
      setToolId(responseToolId);

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

  const [loadingPersonas, setLoadingPersonas] = useState({});

  const handleSubmitPersonas = async () => {
    handleNextStep(2);
    try {
      // setIsLoading(true);

      const scenarioResults = []; // 각 페르소나의 시나리오를 저장할 배열

      // console.log("selectedPersonas", selectedPersonas);
      const selectedPersonaData = targetDiscoveryPersona.filter(
        (persona, index) => selectedPersonas.includes(index)
      );
      setSelectedTargetDiscoveryPersona(selectedPersonaData);
      // console.log("selectedPersonaData", selectedPersonaData);

      //  각 페르소나에 대해 순차적으로 API 호출
      for (const persona of selectedPersonaData) {
        const isDuplicate = selectedTargetDiscoveryPersona.some(
          (existingPersona) => existingPersona.title === persona.title
        );

        const dummyScenarios = {
          target_discovery_scenario: {
            potential_customer_info: {
              gender: "여성",
              age: "20",
              main_use_purpose: [
                "신혼집 인테리어 디자인 영감 얻기",
                "합리적인 가격의 고품질 인테리어 제품 구매",
                "다양한 인테리어 스타일 비교 및 선택",
                "DIY 인테리어 정보 공유 및 조언 얻기",
              ],
              pain_points: [
                "원하는 스타일의 제품을 찾기 어려움",
                "제품 가격 비교의 어려움",
                "신뢰할 수 있는 인테리어 정보 부족",
                "DIY 인테리어 관련 정보 부족 및 전문가 도움 접근 어려움",
                "온라인 플랫폼에서의 제품 실물 확인 어려움",
              ],
            },
            usage_scenario: {
              description: "30대 초반 직장인인 수진(가명)씨와 남편은...",
              key_sentence:
                "신뢰할 수 있는 정보와 전문가 도움, 실제 제품 확인이 중요하다.",
            },
          },
        };

        // setLoadingPersonas(prev => ({
        //   ...prev,
        //   [persona.title]: true
        // }));

        // const isDuplicate = selectedTargetDiscoveryPersona.some(
        //   existingPersona => existingPersona.title === persona.title
        // );

        // // 중복이 아닌 경우에만 처리
        // if (!isDuplicate) {
        //   const apiRequestData = {
        //     type: "ix_target_discovery_persona",
        //     business: targetDiscoveryInfo.business,
        //     target_discovery_persona: persona,
        //     specific_situation: targetDiscoveryInfo.specific_situation,
        //     country: targetDiscoveryInfo.country
        //   };

        //   console.log("Current persona request:", apiRequestData);

        //   // API 호출
        //   // const response = await InterviewXTargetDiscoveryScenarioRequest(apiRequestData,isLoggedIn);

        //    // 응답 데이터 유효성 검사
        //    if (!response?.target_discovery_scenario?.potential_customer_info ||
        //     !response?.target_discovery_scenario?.usage_scenario) {
        //   setShowPopupError(true);
        //   return;
        // }

        // 이전 결과를 유지하면서 새로운 결과 추가
        //  setTargetDiscoveryScenario(prev => [...prev, response?.target_discovery_scenario]);

        // 처리가 완료된 페르소나의 로딩 상태를 false로 설정
        //   setLoadingPersonas(prev => ({
        //     ...prev,
        //     [persona.title]: false
        //   }));
        // }

        if (!isDuplicate) {
          setTargetDiscoveryScenario(dummyScenarios.target_discovery_scenario);
          // setProcessedScenarios(dummyScenarios.target_discovery_scenario);
        }
      }
    } catch (error) {
      console.error("Error submitting personas:", error);
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

  const handleSubmitScenario = async () => {
    try {
      // setIsLoading(true);

      // 선택된 페르소나와 시나리오 데이터 구성
      // const scenarioData = {
      //   type: "ix_target_discovery_persona"
      //   target: targetDiscoveryInfo.target,
      //   target_discovery_persona: selectedTargetDiscoveryPersona,
      //   target_discovery_scenario: targetDiscoveryScenario
      // };

      // console.log("Submitting scenario data:", scenarioData);

      // API 호출 로직이 들어갈 자리
      // const response = await InterviewXTargetDiscoveryFinalReportRequest(scenarioData,isLoggedIn);
      // setTargetDiscoveryFinalReport(response.target_discovery_final_report);

      setIsLoading(false);
      handleNextStep(3);
    } catch (error) {
      console.error("Error submitting scenario:", error);
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

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1030>
          <TargetDiscoveryWrap>
            <TabWrapType5>
              <TabButtonType5
                isActive={activeTab >= 1}
                onClick={() => setActiveTab(1)}
              >
                <span>01</span>
                <div className="text">
                  <Body1 color={activeTab >= 1 ? "gray800" : "gray300"}>
                    비즈니스 입력
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
                    잠재고객 맥락 분석
                  </Body1>
                  <Body1 color={activeTab >= 2 ? "gray800" : "gray300"}>
                    Contextual Inquiry
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
                    시나리오 분석
                  </Body1>
                  <Body1 color={activeTab >= 3 ? "gray800" : "gray300"}>
                    Scenario Analysis
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
                      <H3 color="gray800">Find Your Potential Customers</H3>
                      <Body3 color="gray800">
                        혹시 놓치고 있는 고객은 없을까요? 잠재력있는 고객을
                        체계적으로 확인해보세요{" "}
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
                            Edit
                            rows={4}
                            placeholder="잠재고객을 도출하고 싶은 비즈니스에 대해서 설명해주세요 (예: 친환경 전기 자전거 공유 플랫폼 등)"
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
                          <Body1 color="gray700">타겟 고객</Body1>
                          <Body1 color="red">*</Body1>
                        </div>
                        <CustomInput
                          type="text"
                          placeholder="핵심 타겟 고객 군을 작성해주세요 (예: 20대 여성 등)"
                          value={targetCustomer}
                          onChange={handleTargetCustomerChange}
                        />
                      </TabContent5Item>

                      <TabContent5Item>
                        <div className="title">
                          <Body1 color="gray700">
                            분석하고자 하는 특정 상황
                          </Body1>
                        </div>
                        <CustomInput
                          type="text"
                          placeholder="특별히 분석하고자 하는 특정 상황이 있으신 경우, 입력해주세요 (예: 전기자전거의 배터리가 없는 상황 등)"
                          value={specificSituation}
                          onChange={(e) => setSpecificSituation(e.target.value)}
                        />
                      </TabContent5Item>

                      <TabContent5Item>
                        <div className="title">
                          <Body1 color="gray700">타겟 국가</Body1>
                        </div>

                        <SelectBox ref={selectBoxRef}>
                          <SelectBoxTitle onClick={handleSelectBoxClick}>
                            <Body2
                              color={selectedPurpose ? "gray800" : "gray300"}
                            >
                              {selectedPurpose ||
                                "특정 타겟 국가가 있는 경우 선택해주세요"}
                            </Body2>
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
                            <SelectBoxList dropUp={dropUp}>
                              <SelectBoxItem
                                onClick={() => handlePurposeSelect("대한민국")}
                              >
                                <Body2 color="gray700" align="left">
                                  대한민국
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() => handlePurposeSelect("미국")}
                              >
                                <Body2 color="gray700" align="left">
                                  미국
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() => handlePurposeSelect("중국")}
                              >
                                <Body2 color="gray700" align="left">
                                  중국
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() => handlePurposeSelect("일본")}
                              >
                                <Body2 color="gray700" align="left">
                                  일본
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() => handlePurposeSelect("베트남")}
                              >
                                <Body2 color="gray700" align="left">
                                  베트남
                                </Body2>
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
                      onClick={handleSubmitBusinessInfo}
                      disabled={!isRequiredFieldsFilled()}
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
                      <H3 color="gray800">Contextual Inquiry Analysis</H3>
                      <Body3 color="gray800">
                        비즈니스에 적합한 다양한 페르소나를 기반으로 잠재고객을
                        분석합니다
                      </Body3>
                    </div>

                    <div className="content">
                      <CardGroupWrap>
                        {targetDiscoveryPersona.map((persona, index) => (
                          <MoleculeToolPersonaCard
                            key={`persona-${index}`}
                            title={persona.title}
                            keywords={persona.content.keywords}
                            checked={selectedPersonas.includes(index)}
                            onSelect={() => handleCheckboxChange(index)}
                            currentSelection={selectedPersonas.length}
                            personaData={persona}
                            viewType="list"
                            popupType="basic"
                            onDetailClick={() => setShowPopup(true)}
                          />
                        ))}
                      </CardGroupWrap>
                      {/* <CardGroupWrap>

                      <MoleculeToolPersonaCard
                          title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                          keywords={['키워드1', '키워드2', '키워드3']}
                          checked={selectedPersonas.includes(0)}  // 'persona1' -> 0
                          onSelect={() => handleCheckboxChange(0)}  // 'persona1' -> 0
                          currentSelection={selectedPersonas.length}
                          personaData={{
                            persona: "가족과 함께 여가를 보내는 활동 지향형 소비자",
                            persona_view: "가족과 함께 여가를 보내는 활동 지향형 소비자",
                            keyword: ["키워드1", "키워드2", "키워드3"],
                            persona_keyword: ["키워드1", "키워드2", "키워드3"],
                            who: "30대 초반 신혼부부, 맞벌이 직장인, 인테리어에 관심이 많은 수진씨",
                            when: "신혼집 인테리어를 계획하고 준비하는 시기, DIY 인테리어 정보를 찾을 때",
                            where: "인테리어 콘텐츠 공유 커뮤니티, 커머스 플랫폼, 온라인 쇼핑몰",
                            what: "신혼집에 맞는 인테리어 디자인 영감, 합리적인 가격대의 고급 가구와 소품",
                            how: "온라인 플랫폼에서 디자인 사진과 영상 탐색, 커뮤니티 참여를 통한 정보 공유",
                            why: "신뢰할 수 있는 정보와 전문가의 조언을 통해 만족스러운 인테리어 결과물을 얻기 위해"
                          }}
                          viewType="list"
                          popupType="basic"
                          onDetailClick={() => setShowPopup(true)}
                        />

                        <MoleculeToolPersonaCard
                          title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                          keywords={['키워드1', '키워드2', '키워드3']}
                          checked={selectedPersonas.includes(1)}  // 'persona2' -> 1
                          onSelect={() => handleCheckboxChange(1)}  // 'persona2' -> 1
                          currentSelection={selectedPersonas.length}
                          personaData={{
                            persona: "가족과 함께 여가를 보내는 활동 지향형 소비자",
                            persona_view: "가족과 함께 여가를 보내는 활동 지향형 소비자",
                            keyword: ["키워드1", "키워드2", "키워드3"],
                            persona_keyword: ["키워드1", "키워드2", "키워드3"],
                            who: "30대 초반 신혼부부, 맞벌이 직장인, 인테리어에 관심이 많은 수진씨",
                            when: "신혼집 인테리어를 계획하고 준비하는 시기, DIY 인테리어 정보를 찾을 때",
                            where: "인테리어 콘텐츠 공유 커뮤니티, 커머스 플랫폼, 온라인 쇼핑몰",
                            what: "신혼집에 맞는 인테리어 디자인 영감, 합리적인 가격대의 고급 가구와 소품",
                            how: "온라인 플랫폼에서 디자인 사진과 영상 탐색, 커뮤니티 참여를 통한 정보 공유",
                            why: "신뢰할 수 있는 정보와 전문가의 조언을 통해 만족스러운 인테리어 결과물을 얻기 위해"
                          }}
                          viewType="list"
                          popupType="basic"
                          onDetailClick={() => setShowPopup(true)}
                        />
                      </CardGroupWrap>
                      */}

                      {/* 
                      <ListBoxItem 
                      NoBg
                      selected={selectedPersonas.includes('persona1')} 
                      active={selectedPersonas.includes('persona1')}
                    >
                      <div>
                        <CheckBoxButton 
                          id="persona1"
                          name="persona1"
                          checked={selectedPersonas.includes('persona1')}
                          onChange={() => handleCheckboxChange('persona1')}
                        />
                      </div>
                      <ListText>
                        <ListTitle>
                          <Body1 color={selectedPersonas.includes('persona1') ? "primary" : "gray800"}>가족과 함께 여가를 보내는 활동 지향형 소비자</Body1>
                        </ListTitle>

                        <ListSubtitle>
                            <Badge Keyword>
                              #키워드1
                            </Badge>
                            <Badge Keyword>
                              #키워드2
                            </Badge>
                            <Badge Keyword>
                              #키워드3
                            </Badge>
                        </ListSubtitle>
                      </ListText>
                      <ListButton>
                        <CustomButton
                          Medium
                          PrimaryLightest
                          Fill
                          onClick={() => setShowPopup(true)}
                        >
                          자세히
                        </CustomButton>
                      </ListButton>
                    </ListBoxItem>

                    <ListBoxItem 
                      NoBg
                      selected={selectedPersonas.includes('persona2')} 
                      active={selectedPersonas.includes('persona2')}
                    >
                      <div>
                        <CheckBoxButton 
                          id="persona2"
                          name="persona2"
                          checked={selectedPersonas.includes('persona2')}
                          onChange={() => handleCheckboxChange('persona2')}
                        />
                      </div>
                      <ListText>
                        <ListTitle>
                          <Body1 color={selectedPersonas.includes('persona2') ? "primary" : "gray800"}>가족과 함께 여가를 보내는 활동 지향형 소비자</Body1>
                        </ListTitle>

                        <ListSubtitle>
                            <Badge Keyword>
                              #키워드1
                            </Badge>
                            <Badge Keyword>
                              #키워드2
                            </Badge>
                            <Badge Keyword>
                              #키워드3
                            </Badge>
                        </ListSubtitle>
                      </ListText>
                      <ListButton>
                        <CustomButton
                          Medium
                          PrimaryLightest
                          Fill
                          onClick={() => setShowPopup(true)}
                        >
                          자세히
                        </CustomButton>
                      </ListButton>
                    </ListBoxItem>
                  </CardGroupWrap> */}

                      <BottomBar W100>
                        <Body2
                          color={
                            selectedPersonas.length === 0
                              ? "gray300"
                              : "gray800"
                          }
                        >
                          시나리오 분석을 원하는 페르소나를 선택해주세요 (
                          {selectedPersonas.length}/5)
                        </Body2>
                        <Button
                          Large
                          Primary
                          Round
                          Fill
                          disabled={selectedPersonas.length === 0}
                          // onClick={() => {
                          //   setIsLoading(false); // 다음 단계로 넘어갈 때 로딩 종료
                          //   handleNextStep(2);
                          // }}
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
              <TabContent5>
                <div className="title">
                  <H3 color="gray800">Persona Scenario Analysis</H3>
                  <Body3 color="gray800">
                    선택하신 잠재고객과 비즈니스의 연관성을 분석해드려요
                  </Body3>
                </div>

                <div className="content">
                  <CardGroupWrap>
                    {selectedTargetDiscoveryPersona.map((persona, index) => (
                      <MoleculeToolPersonaCard
                        key={index}
                        title={persona.title}
                        keywords={persona.content.keywords}
                        viewType="list"
                        hideCheckCircle={true}
                        popupType="detail"
                        // personaData={{
                        //   ...persona,
                        //   target_discovery_scenario: persona.target_discovery_scenario
                        // }}
                        personaData={persona}
                        personaScenario={targetDiscoveryScenario}
                        onDetailClick={() => setShowPopupMore(true)}
                      />
                    ))}

                    {isLoading && (
                      <Body1 color="gray800">페르소나 분석 중...</Body1>
                    )}
                  </CardGroupWrap>

                  {/* <CardGroupWrap>
                    <MoleculeToolPersonaCard
                      title="가족과 함께 여가를 보내는 활동 지향형 소비자"

                      keywords={["키워드1", "키워드2", "키워드3"]}
                      viewType="list"
                      hideCheckCircle={true}
                      popupType="detail"
                      personaData={{
                        persona: "가족과 함께 여가를 보내는 활동 지향형 소비자",
                        persona_view: "가족과 함께 여가를 보내는 활동 지향형 소비자",
                        keyword: ["키워드1", "키워드2", "키워드3"],
                        persona_keyword: ["키워드1", "키워드2", "키워드3"],
                        who: "30대 초반 신혼부부, 맞벌이 직장인, 인테리어에 관심이 많은 수진씨",
                        when: "신혼집 인테리어를 계획하고 준비하는 시기, DIY 인테리어 정보를 찾을 때",
                        where: "인테리어 콘텐츠 공유 커뮤니티, 커머스 플랫폼, 온라인 쇼핑몰",
                        what: "신혼집에 맞는 인테리어 디자인 영감, 합리적인 가격대의 고급 가구와 소품",
                        how: "온라인 플랫폼에서 디자인 사진과 영상 탐색, 커뮤니티 참여를 통한 정보 공유",
                        why: "신뢰할 수 있는 정보와 전문가의 조언을 통해 만족스러운 인테리어 결과물을 얻기 위해"
                      }}
                      
                      onDetailClick={() => setShowPopupMore(true)}
                    />
                  </CardGroupWrap> */}
                  {/* <CardGroupWrap>
                    <ListBoxItem>
                      <ListText>
                        <ListTitle>
                          <Body1 color="gray800">가족과 함께 여가를 보내는 활동 지향형 소비자</Body1>
                        </ListTitle>

                        <ListSubtitle>
                            <Badge Keyword>
                              #키워드1
                            </Badge>
                            <Badge Keyword>
                              #키워드2
                            </Badge>
                            <Badge Keyword>
                              #키워드3
                            </Badge>
                        </ListSubtitle>
                      </ListText>
                      <ListButton>
                        <CustomButton
                          Medium
                          PrimaryLightest
                          Fill
                          onClick={() => setShowPopupMore(true)}
                        >
                          자세히
                        </CustomButton>
                      </ListButton>
                    </ListBoxItem>

                    <ListBoxItem>
                      <ListText>
                        <ListTitle>
                          <Body1 color="gray800">가족과 함께 여가를 보내는 활동 지향형 소비자</Body1>
                        </ListTitle>

                        <ListSubtitle>
                            <Badge Keyword>
                              #키워드1
                            </Badge>
                            <Badge Keyword>
                              #키워드2
                            </Badge>
                            <Badge Keyword>
                              #키워드3
                            </Badge>
                        </ListSubtitle>
                      </ListText>
                      <ListButton>
                        <CustomButton
                          Medium
                          PrimaryLightest
                          Fill
                          onClick={() => setShowPopupMore(true)}
                        >
                          자세히
                        </CustomButton>
                      </ListButton>
                    </ListBoxItem>
                  </CardGroupWrap> */}

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
                      onClick={handleSubmitScenario}
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
                <BgBoxItem primaryLightest>
                  <H3 color="gray800">타겟 탐색기 인사이트 분석</H3>
                  <Body3 color="gray800">
                    잠재 고객과 시나리오 분석을 통해 새로운 전략적 방향을
                    탐색해보세요
                  </Body3>
                </BgBoxItem>

                <InsightAnalysis>
                  <div className="title">
                    <H4 color="gray800">
                      잠재력이 가장 높은 페르소나는 OOO 입니다.
                    </H4>
                    <Button Primary onClick={() => setShowPopupSave(true)}>
                      리포트 저장하기
                    </Button>
                  </div>

                  <div className="content">
                    <Body3 color="gray700">
                      인터뷰 결과, 스마트홈 스피커의 음성 인식률과 반응 속도는
                      높게 평가되었으나, 개인 맞춤형 기능 부족 및 정보 보안에
                      대한 우려가 주요 문제점으로 나타났습니다. 특히, 워킹맘
                      답변자는 자녀를 위한 교육 콘텐츠 및 안전 기능 강화의
                      필요성을 강조했고, 50대 가장 답변자는 가족 구성원 모두가
                      쉽게 사용할 수 있는 가족 친화적인 인터페이스 부족을
                      지적했습니다. 49세 남성 답변자는 개인정보 보안 및 유출에
                      대한 우려를 표명하며, 이에 대한 강화된 보안 시스템 구축의
                      필요성을 언급했습니다. 이러한 문제들은 사용자의 스마트홈
                      스피커에 대한 전반적인 만족도를 저해할 수 있는 요인으로
                      작용합니다. 따라서 사용자의 니즈를 충족하고, 불안감을
                      해소하는 것이 중요한 과제입니다.
                    </Body3>

                    <Body3 color="gray700">
                      인터뷰 데이터를 통해 도출된 문제점을 해결하고 사용자
                      경험을 개선할 수 있는 기회는 다음과 같습니다. 첫째, 가격
                      경쟁력 강화를 위해 다양한 할인 혜택 및 패키지 상품을
                      개발하고, 경쟁사 가격과 비교 분석하여 합리적인 가격 정책을
                      수립해야 합니다. 둘째, 세탁물 관리의 투명성을 높이기 위해
                      세탁 과정을 사진 또는 영상으로 촬영하여 고객에게 제공하는
                      기능을 추가하고, 세탁 전후 의류 상태 비교 사진 제공을 통해
                      고객의 불안감을 해소해야 합니다. 셋째, 세탁 사고에 대한
                      보상 체계 마련을 통해 고객의 신뢰를 확보하는 것이
                      중요합니다. 이는 보험 가입 및 명확한 보상 절차를
                      마련함으로써 이루어질 수 있습니다. 이러한 개선을 통해
                      서비스의 신뢰도를 높이고 고객 만족도를 향상시킬 수 있을
                      것입니다..
                    </Body3>
                  </div>
                </InsightAnalysis>
                {/* 

                <ListBoxWrap>
      <ListBoxItem>
        <ListBoxTitle>
          <div>
            <Body1 color="gray800">신혼집 인테리어를 준비하는 30대 초반 젊은 부부</Body1>
            <Keyword>
              <Badge Keyword>Strong Potential</Badge>
              {targetDiscoveryFinalReport?.potential_rank_1?.keywords?.map((keyword, index) => (
                <Badge key={index} Keyword>#{keyword}</Badge>
              ))}
            </Keyword>
          </div>
          <CustomButton
            Medium
            PrimaryLightest
            Fill
          >
            자세히
          </CustomButton>
        </ListBoxTitle>

        <ListBoxContent>
          <Body3 color="gray700" align="left">
            {targetDiscoveryFinalReport?.potential_rank_1?.discovery_criteria}
          </Body3>
        </ListBoxContent>
      </ListBoxItem>

      <ListBoxItem>
        <ListBoxTitle>
          <div>
            <Body1 color="gray800">고급 인테리어를 추구하는 30대 중반 싱글 남성</Body1>
            <Keyword>
              <Badge Keyword>Potential</Badge>
              {targetDiscoveryFinalReport?.potential_rank_2?.keywords?.map((keyword, index) => (
                <Badge key={index} Keyword>#{keyword}</Badge>
              ))}
            </Keyword>
          </div>
          <CustomButton
            Medium
            PrimaryLightest
            Fill
          >
            자세히
          </CustomButton>
        </ListBoxTitle>

        <ListBoxContent>
          <Body3 color="gray700" align="left">
            {targetDiscoveryFinalReport?.potential_rank_2?.rank_reason}
          </Body3>
        </ListBoxContent>
      </ListBoxItem>

      <ListBoxItem>
        <ListBoxTitle>
          <div>
            <Body1 color="gray800">트렌디한 인테리어를 선호하는 20대 후반 젊은 여성</Body1>
            <Keyword>
              <Badge Keyword>Potential</Badge>
              {targetDiscoveryFinalReport?.potential_rank_3?.keywords?.map((keyword, index) => (
                <Badge key={index} Keyword>#{keyword}</Badge>
              ))}
            </Keyword>
          </div>
          <CustomButton
            Medium
            PrimaryLightest
            Fill
          >
            자세히
          </CustomButton>
        </ListBoxTitle>

        <ListBoxContent>
          <Body3 color="gray700" align="left">
            {targetDiscoveryFinalReport?.potential_rank_3?.rank_reason}
          </Body3>
        </ListBoxContent>
      </ListBoxItem>
    </ListBoxWrap> */}

                <ListBoxWrap>
                  <ListBoxItem>
                    <ListBoxTitle>
                      <div>
                        <Body1 color="gray800">
                          가족과 함께 여가를 보내는 활동 지향형 소비자
                        </Body1>
                        <Keyword>
                          <Badge Keyword>Strong Potential</Badge>
                          <Badge Keyword>#키워드</Badge>
                          <Badge Keyword>#키워드</Badge>
                        </Keyword>
                      </div>
                      <CustomButton Medium PrimaryLightest Fill>
                        자세히
                      </CustomButton>
                    </ListBoxTitle>

                    <ListBoxContent>
                      <Body3 color="gray700" align="left">
                        인터뷰 결과, 스마트홈 스피커의 음성 인식률과 반응 속도는
                        높게 평가되었으나, 개인 맞춤형 기능 부족 및 정보 보안에
                        대한 우려가 주요 문제점으로 나타났습니다. 특히, 워킹맘
                        답변자는 자녀를 위한 교육 콘텐츠 및 안전 기능 강화의
                        필요성을 강조했고, 50대 가장 답변자는 가족 구성원 모두가
                        쉽게 사용할 수 있는 가족 친화적인 인터페이스 부족을
                        지적했습니다.
                      </Body3>
                    </ListBoxContent>
                  </ListBoxItem>

                  <ListBoxItem>
                    <ListBoxTitle>
                      <div>
                        <Body1 color="gray800">
                          가족과 함께 여가를 보내는 활동 지향형 소비자
                        </Body1>
                        <Keyword>
                          <Badge Keyword>Strong Potential</Badge>
                          <Badge Keyword>#키워드</Badge>
                          <Badge Keyword>#키워드</Badge>
                        </Keyword>
                      </div>
                      <CustomButton Medium PrimaryLightest Fill>
                        자세히
                      </CustomButton>
                    </ListBoxTitle>

                    <ListBoxContent>
                      <Body3 color="gray700" align="left">
                        인터뷰 결과, 스마트홈 스피커의 음성 인식률과 반응 속도는
                        높게 평가되었으나, 개인 맞춤형 기능 부족 및 정보 보안에
                        대한 우려가 주요 문제점으로 나타났습니다. 특히, 워킹맘
                        답변자는 자녀를 위한 교육 콘텐츠 및 안전 기능 강화의
                        필요성을 강조했고, 50대 가장 답변자는 가족 구성원 모두가
                        쉽게 사용할 수 있는 가족 친화적인 인터페이스 부족을
                        지적했습니다.
                      </Body3>
                    </ListBoxContent>
                  </ListBoxItem>

                  <ListBoxItem>
                    <ListBoxTitle>
                      <div>
                        <Body1 color="gray800">
                          가족과 함께 여가를 보내는 활동 지향형 소비자
                        </Body1>
                        <Keyword>
                          <Badge Keyword>Strong Potential</Badge>
                          <Badge Keyword>#키워드</Badge>
                          <Badge Keyword>#키워드</Badge>
                        </Keyword>
                      </div>
                      <CustomButton Medium PrimaryLightest Fill>
                        자세히
                      </CustomButton>
                    </ListBoxTitle>

                    <ListBoxContent>
                      <Body3 color="gray700" align="left">
                        인터뷰 결과, 스마트홈 스피커의 음성 인식률과 반응 속도는
                        높게 평가되었으나, 개인 맞춤형 기능 부족 및 정보 보안에
                        대한 우려가 주요 문제점으로 나타났습니다. 특히, 워킹맘
                        답변자는 자녀를 위한 교육 콘텐츠 및 안전 기능 강화의
                        필요성을 강조했고, 50대 가장 답변자는 가족 구성원 모두가
                        쉽게 사용할 수 있는 가족 친화적인 인터페이스 부족을
                        지적했습니다.
                      </Body3>
                    </ListBoxContent>
                  </ListBoxItem>
                </ListBoxWrap>

                <Button Small Primary onClick={() => setShowPopupSave(true)}>
                  리포트 저장하기
                </Button>
              </TabContent5>
            )}
          </TargetDiscoveryWrap>
        </MainContent>
      </ContentsWrap>

      {showPopup && (
        <InterviewPopup>
          <div style={{ maxWidth: "565px" }}>
            <div className="header" style={{ gap: "16px" }}>
              <H4>
                시간이 부족한 바쁜 프리랜서
                <span className="close" onClick={() => setShowPopup(false)} />
              </H4>
              <div className="keywords">
                <Status>#시간 관리</Status>
                <Status>#페르소나 키워드</Status>
                <Status>#업무 효율율</Status>
              </div>
            </div>

            <div className="content type2">
              <ListRowWrap>
                <ListRowItem>
                  <Body1 color="gray700" align="left">
                    누가
                    <br />
                    (Who){" "}
                  </Body1>
                  <Body3 color="gray700" align="left">
                    40대 이상, 자녀 독립 후 여유로운 삶을 추구하는 고소득층,
                    전원주택/별장 소유자. DIY, 인테리어, 건축 관련 취미를 가짐
                  </Body3>
                </ListRowItem>
                <ListRowItem>
                  <Body1 color="gray700" align="left">
                    언제
                    <br />
                    (When)
                  </Body1>
                  <Body3 color="gray700" align="left">
                    주택 리모델링, 증축 계획 시, 또는 새로운 공간 활용
                    아이디어를 얻고 싶을 때
                  </Body3>
                </ListRowItem>
                <ListRowItem>
                  <Body1 color="gray700" align="left">
                    어디서
                    <br />
                    (Where)
                  </Body1>
                  <Body3 color="gray700" align="left">
                    개인 주택, 별장, 세컨하우스 등
                  </Body3>
                </ListRowItem>
                <ListRowItem>
                  <Body1 color="gray700" align="left">
                    무엇을
                    <br />
                    (What)
                  </Body1>
                  <Body3 color="gray700" align="left">
                    전원적인 삶의 질을 높이고, 개성을 표현할 수 있는 인테리어
                    아이디어, 지역 특색을 살린 공간 디자인에 대한 정보
                  </Body3>
                </ListRowItem>
                <ListRowItem>
                  <Body1 color="gray700" align="left">
                    어떻게
                    <br />
                    (How)
                  </Body1>
                  <Body3 color="gray700" align="left">
                    플랫폼을 통해 전문가의 자문, 맞춤형 디자인 제안, 지역 기반의
                    시공업체 정보 획득, 커뮤니티 참여를 통한 정보 공유
                  </Body3>
                </ListRowItem>
                <ListRowItem>
                  <Body1 color="gray700" align="left">
                    왜<br />
                    (Why)
                  </Body1>
                  <Body3 color="gray700" align="left">
                    기존의 획일화된 인테리어에서 벗어나, 자신만의 취향과
                    라이프스타일을 반영한 공간을 창출하고, 지역사회와의 연결을
                    강화하고자 함.
                  </Body3>
                </ListRowItem>
              </ListRowWrap>
            </div>
          </div>
        </InterviewPopup>
      )}

      {showPopupMore && (
        <InterviewPopup>
          <div style={{ maxWidth: "565px" }}>
            <div className="header">
              <H4>
                시간이 부족한 바쁜 프리랜서
                <span
                  className="close"
                  onClick={() => setShowPopupMore(false)}
                />
              </H4>
              <p className="info">
                <Sub3>여성</Sub3>
                <Sub3>25세</Sub3>
              </p>
            </div>

            <div className="keywords">
              <Status>#시간 관리</Status>
              <Status>#페르소나 키워드</Status>
              <Status>#업무 효율율</Status>
            </div>

            <div className="content">
              <TabWrapType2>
                <TabButtonType2
                  isActive={activeTab1 === "personaInfo"}
                  onClick={() => setActiveTab1("personaInfo")}
                >
                  페르소나 정보
                </TabButtonType2>
                <TabButtonType2
                  isActive={activeTab1 === "personaScenario"}
                  onClick={() => setActiveTab1("personaScenario")}
                >
                  페르소나 시나리오
                </TabButtonType2>
              </TabWrapType2>

              {activeTab1 === "personaInfo" && (
                <TabContent>
                  <ListRowWrap>
                    <ListRowItem>
                      <Body1 color="gray700" align="left">
                        누가
                        <br />
                        (Who){" "}
                      </Body1>
                      <Body3 color="gray700" align="left">
                        40대 이상, 자녀 독립 후 여유로운 삶을 추구하는 고소득층,
                        전원주택/별장 소유자. DIY, 인테리어, 건축 관련 취미를
                        가짐
                      </Body3>
                    </ListRowItem>
                    <ListRowItem>
                      <Body1 color="gray700" align="left">
                        언제
                        <br />
                        (When)
                      </Body1>
                      <Body3 color="gray700" align="left">
                        주택 리모델링, 증축 계획 시, 또는 새로운 공간 활용
                        아이디어를 얻고 싶을 때
                      </Body3>
                    </ListRowItem>
                    <ListRowItem>
                      <Body1 color="gray700" align="left">
                        어디서
                        <br />
                        (Where)
                      </Body1>
                      <Body3 color="gray700" align="left">
                        개인 주택, 별장, 세컨하우스 등
                      </Body3>
                    </ListRowItem>
                    <ListRowItem>
                      <Body1 color="gray700" align="left">
                        무엇을
                        <br />
                        (What)
                      </Body1>
                      <Body3 color="gray700" align="left">
                        전원적인 삶의 질을 높이고, 개성을 표현할 수 있는
                        인테리어 아이디어, 지역 특색을 살린 공간 디자인에 대한
                        정보
                      </Body3>
                    </ListRowItem>
                    <ListRowItem>
                      <Body1 color="gray700" align="left">
                        어떻게
                        <br />
                        (How)
                      </Body1>
                      <Body3 color="gray700" align="left">
                        플랫폼을 통해 전문가의 자문, 맞춤형 디자인 제안, 지역
                        기반의 시공업체 정보 획득, 커뮤니티 참여를 통한 정보
                        공유
                      </Body3>
                    </ListRowItem>
                    <ListRowItem>
                      <Body1 color="gray700" align="left">
                        왜<br />
                        (Why)
                      </Body1>
                      <Body3 color="gray700" align="left">
                        기존의 획일화된 인테리어에서 벗어나, 자신만의 취향과
                        라이프스타일을 반영한 공간을 창출하고, 지역사회와의
                        연결을 강화하고자 함.
                      </Body3>
                    </ListRowItem>
                  </ListRowWrap>
                </TabContent>
              )}
              {activeTab1 === "personaScenario" && (
                <TabContent>
                  <Body1 color="gray700">
                    신뢰할 수 있는 정보와 전문가 도움, 실제 제품 확인이
                    중요하다.
                  </Body1>
                  <Body3 color="gray700">
                    30대 초반 직장인인 수진(가명)씨와 남편은 새롭게 마련한
                    신혼집 인테리어를 위해 인테리어 콘텐츠 공유 커뮤니티 및
                    커머스 플랫폼을 이용한다. 수진씨는 온라인 플랫폼에서 다양한
                    인테리어 디자인 사진과 영상을 보며 디자인 영감을 얻고,
                    마음에 드는 가구와 소품을 찾는다. 하지만, 제품의 실제
                    색감이나 재질을 확인할 수 없어 고민하고, 비슷한 스타일의
                    제품을 여러 사이트에서 비교하는 데 어려움을 느낀다. 또한,
                    합리적인 가격대의 고급 인테리어 제품을 찾고 싶지만, 제품
                    정보가 부족하거나 가격 비교가 어려워 시간이 많이 소요된다.
                    DIY 인테리어에 관심이 많아 커뮤니티에 참여하여 다른
                    사용자들과 정보를 공유하고, 조언을 구하지만 전문적인 도움이
                    부족하다고 느낀다. 특히, 전문가의 도움 없이 직접 인테리어를
                    계획하고 시공하는 데 어려움을 겪고 있으며, 실제 시공 후
                    결과물에 대한 불확실성 때문에 고민이 많다. 경쟁 플랫폼에서는
                    더욱 다양한 스타일과 제품을 제공하지만, 수진씨는 자신들의
                    취향에 맞는 신뢰할 수 있는 정보와 전문가의 조언을 원한다.
                    플랫폼에서 제품 구매 후 실제 사용 후기를 확인하고, 전문가의
                    디자인 컨설팅 서비스를 추가로 제공한다면 더욱 만족스러울
                    것이다.
                  </Body3>
                </TabContent>
              )}
            </div>
          </div>
        </InterviewPopup>
      )}

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

export default PageTargetDiscovery;

const TargetDiscoveryWrap = styled.div`
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

const MyDashboardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const MyDashboardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
`;

const MyDashboardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const MyProjectWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 80px;
  margin: 50px auto;
`;

const MyProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled(H5)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: ${palette.gray800};
  padding-bottom: 20px;
  border-bottom: 1px solid ${palette.outlineGray};
`;

const ProjectList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  > p {
    flex-grow: 1;
    text-align: left;
  }

  > p:nth-child(1) {
    max-width: 440px;
    width: 100%;
  }

  > p:nth-child(2) {
    max-width: 220px;
    width: 100%;
  }

  > p:nth-child(3) {
    max-width: 165px;
    width: 100%;
  }
`;

const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProjectItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  // gap: 12px;
  gap: ${(props) => (props.Nodata ? "16px" : "12px")};
  // padding: 12px 24px;
  padding: ${(props) => (props.Nodata ? "52px 24px 40px" : "12px 24px")};
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
  background-color: ${palette.white};
  z-index: 1;
  transition: box-shadow 0.3s ease-in-out;

  ${({ $isOpen }) =>
    $isOpen &&
    `
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.12);
  `}

  ${(props) =>
    props.Nodata &&
    css`
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;

        p {
          color: ${palette.gray500};
          line-height: 1.5;
        }
      }
    `}
`;

const ProjectInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  max-width: 440px;
  width: 100%;
  font-weight: 400;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;

  span {
    font-size: 0.75rem;
    font-weight: 300;
    color: ${palette.gray500};
  }
`;

const Persona = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  max-width: 230px;
  width: 100%;
  padding: 8px;

  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5px 24px;
    flex: 1;
    text-align: left;

    + div:before {
      position: absolute;
      top: 50%;
      left: -12px;
      transform: translateY(-50%);
      width: 1px;
      height: 19px;
      background-color: ${palette.outlineGray};
      content: "";
    }

    span {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 4px;
      font-size: 0.75rem;
      color: ${palette.gray300};
    }

    p {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 4px;
      font-size: 0.875rem;
      color: ${palette.gray700};
    }
  }
`;

const Recruit = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  max-width: 155px;
  width: 100%;

  span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 0.75rem;
    color: ${palette.gray300};
  }

  p {
    font-size: 0.875rem;
    color: ${palette.gray700};

    &.ing {
      color: ${palette.primary};
    }

    &.complete {
      color: ${palette.green};
    }
  }
`;

const Report = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 0.75rem;
    color: ${palette.gray300};
  }

  p {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 0.875rem;
    color: ${palette.gray700};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-family: "Pretendard", poppins;
    font-size: 0.75rem;
    font-weight: 400;
    color: ${palette.gray500};
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid ${palette.outlineGray};
    background-color: ${palette.chatGray};
  }
`;

const ProjectButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 12px;
  border-top: 1px solid ${palette.outlineGray};

  p {
    font-size: 0.875rem;
    color: ${palette.gray800};
  }

  button {
    font-family: "Pretendard", poppins;
    font-size: 0.75rem;
    color: ${palette.white};
    padding: 6px 10px;
    border-radius: 4px;
    border: none;
    background-color: ${palette.primary};
  }
`;

const ProjectView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
  padding: 28px 20px 20px;
  margin-top: -20px;
  border-radius: 0 0 10px 10px;
  border: 1px solid ${palette.outlineGray};
  background-color: ${palette.chatGray};
  animation: slideDown 0.3s ease-in-out;
  transform-origin: top;
  opacity: 1;

  &.closing {
    animation: slideUp 0.3s ease-in-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
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

const ViewInfoNodata = styled(ViewInfo)`
  justify-content: center;
  padding: 24px 0 16px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      line-height: 1.5;
      color: ${palette.gray500};

      span {
        font-size: 0.875rem;
        font-weight: 300;
        line-height: 1.5;
        color: ${palette.primary};
        padding: 6px 10px;
        border-radius: 6px;
        border: 1px solid ${palette.primary};
        background-color: #e9f1ff;
        cursor: pointer;
      }
    }
  }
`;

const PageWrap = styled.div`
  width: 100%;
`;
