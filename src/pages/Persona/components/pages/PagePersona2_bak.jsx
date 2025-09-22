//persona step 2 맞춤 페르소나 추천
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import {
  IS_PERSONA_ACCESSIBLE,
  PERSONA_BUTTON_STATE_2,
  IS_LOGGED_IN,
  CONVERSATION_ID,
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  PERSONA_LIST,
  REPORT_LIST,
  IS_LOADING,
  PERSONA_STEP,
  BUSINESS_ANALYSIS,
  REQUEST_PERSONA_LIST,
  PROJECT_ID,
  PROJECT_LOAD_BUTTON_STATE,
  CATEGORY_COLOR,
} from "../../../AtomStates";
import {
  ContentsWrap,
  ContentSection,
  MainContent,
  AnalysisWrap,
  MainSection,
  Title,
  CardWrap,
  CustomizePersona,
  AccordionSection,
  AccordionHeader,
  AccordionIcon,
  AccordionContent,
  CustomAccordionHeader,
  CustomAccordionIcon,
  CustomAccordionContent,
  BoxWrap,
  BottomBar,
  TabWrapType3,
  TabButtonType3,
  ViewType,
  TypeButton,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { Body2, Body3 } from "../../../../assets/styles/Typography";
import {
  CustomTextarea,
  CustomInput,
} from "../../../../assets/styles/InputStyle";
import OrganismIncNavigation from "../organisms/OrganismIncNavigation";
import MoleculeHeader from "../molecules/MoleculeHeader";
import MoleculeStepIndicator from "../molecules/MoleculeStepIndicator";
import MoleculePersonaCard from "../molecules/MoleculePersonaCard";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";
import { updateProjectOnServer } from "../../../../utils/indexedDB";
// import { updateProjectReportOnServer } from "../../../../utils/indexedDB";
import OrganismBusinessAnalysis from "../organisms/OrganismBusinessAnalysis";
import AtomPersonaLoader from "../../../Global/atoms/AtomPersonaLoader";
import PopupWrap from "../../../../assets/styles/Popup";
import { getProjectByIdFromIndexedDB } from "../../../../utils/indexedDB";
import MoleculeRequestPersonaCard from "../molecules/MoleculeRequestPersonaCard";
import { createRequestPersonOnServer } from "../../../../utils/indexedDB";
import MoleculeRecreate from "../molecules/MoleculeRecreate";

const PagePersona2 = () => {
  const [customPersonaForm, setCustomPersonaForm] = useState({
    description: "", // 페르소나 특징과 역할
    purpose: "", // 사용 목적
    quantity: 1, // 모집 인원
    gender: "", // 성별 ('' | 'male' | 'female')
    ageGroups: [], // 연령대 선택 ['10s', '20s', ...]
    additionalInfo: "", // 추가 필요 정보
  });
  const [categoryColor, setCategoryColor] = useAtom(CATEGORY_COLOR);
  const [reportList, setReportList] = useAtom(REPORT_LIST);
  const [projectLoadButtonState, setProjectLoadButtonState] = useAtom(
    PROJECT_LOAD_BUTTON_STATE
  );
  const [requestPersonaListReady, setRequestPersonaListReady] = useState(false);
  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [isPersonaAccessible, setIsPersonaAccessible] = useAtom(
    IS_PERSONA_ACCESSIBLE
  );
  const [personaButtonState2, setPersonaButtonState2] = useAtom(
    PERSONA_BUTTON_STATE_2
  ); //페르소나 생성/로딩 상태 관리 setPersonaButtonState2(0) :  api 호출 완료

  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [personaStep, setPersonaStep] = useAtom(PERSONA_STEP);
  const [businessAnalysis, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [personaList, setPersonaList] = useAtom(PERSONA_LIST);
  const [requestPersonaList, setRequestPersonaList] =
    useAtom(REQUEST_PERSONA_LIST);

  const [selectedPersonas, setSelectedPersonas] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showCustomizePopup, setShowCustomizePopup] = useState(false);

  const [customizeFormState, setCustomizeFormState] = useState({
    isAccordionOpen: false,
    personaDescription: "", // 페르소나 설명
    purposeDescription: "", // 목적 설명
  });

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [regenerateCount, setRegenerateCount] = useState(0);
  const [showRegenerateButton, setShowRegenerateButton] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  // const [isLoadingPage, setIsLoadingPage] = useState(true);

  const [steps, setSteps] = useState([
    { number: 1, label: "비즈니스 분석", active: true },
    { number: 2, label: "맞춤 페르소나 추천", active: true },
    { number: 3, label: "인터뷰 방법 선택", active: false },
    { number: 4, label: "페르소나와 인터뷰", active: false },
    { number: 5, label: "의견 분석", active: false },
  ]);

  const handlePersonaSelect = (persona, isSelected) => {
    setSelectedPersonas((prev) => {
      if (isSelected) {
        // 최대 5개까지만 선택 가능
        if (prev.length >= 5) {
          return prev;
        }
        return [...prev, persona];
      } else {
        return prev.filter((p) => p !== persona);
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  useEffect(() => {
    // 접근 가능 여부를 확인하여 차단 로직 수행
    if (!isPersonaAccessible) {
      navigate("/"); // 접근이 허용되지 않으면 메인 페이지로 리다이렉트
    }

    // 페이지를 나갈 때 접근 가능 여부 초기화
    return () => {
      setIsPersonaAccessible(false); // 페이지 떠날 때 접근 불가로 설정
    };
  }, [navigate]);

  useEffect(() => {
    if (projectId) {
      setRequestPersonaListReady(true);
    }
  }, [projectId]);

  const getCategoryColor = (category) => {
    switch (category) {
      case "광고/마케팅":
        return "Red";
      case "교육":
        return "LavenderMagenta";
      case "금융/보험/핀테크":
        return "Amethyst";
      case "게임":
        return "VistaBlue";
      case "모빌리티/교통":
        return "BlueYonder";
      case "물류":
        return "MidnightBlue";
      case "부동산/건설":
        return "ButtonBlue";
      case "뷰티/화장품":
        return "ButtonBlue";
      case "AI/딥테크/블록체인":
        return "MiddleBlueGreen";
      case "소셜미디어/커뮤니티":
        return "GreenSheen";
      case "여행/레저":
        return "TropicalRainForest";
      case "유아/출산":
        return "DollarBill";
      case "인사/비즈니스":
        return "Olivine";
      case "제조/하드웨어":
        return "ChineseGreen";
      case "커머스":
        return "Jonquil";
      case "콘텐츠/예술":
        return "PastelOrange";
      case "통신/보안/데이터":
        return "Tangerine";
      case "패션":
        return "Copper";
      case "푸드/농업":
        return "Shadow";
      case "환경/에너지":
        return "Tuscany";
      case "홈리빙":
        return "VeryLightTangelo";
      case "헬스케어/바이오":
        return "Orange";
      case "피트니스/스포츠":
        return "CarnationPink";
      case "법률":
        return "TurkishRose";
      case "펫":
        return "SuperPink";
      case "기타":
        return "NavyBlue";
      default:
        return "";
    }
  };

  //특정 카테고리에 맞는 페르소나 찾는 api 호출
  useEffect(() => {
    const loadProject = async () => {
      try {
        if (projectLoadButtonState) {
          const savedProjectInfo = await getProjectByIdFromIndexedDB(
            projectId,
            projectLoadButtonState
          );
          if (savedProjectInfo) {
            setBusinessAnalysis(savedProjectInfo.businessAnalysis);
            // console.log(savedProjectInfo.requestPersonaList);
            setRequestPersonaList(savedProjectInfo.requestPersonaList);
            setCategoryColor({
              first: getCategoryColor(
                savedProjectInfo.businessAnalysis.category.first
              ),
              second: getCategoryColor(
                savedProjectInfo.businessAnalysis.category.second
              ),
              third: getCategoryColor(
                savedProjectInfo.businessAnalysis.category.third
              ),
            });
            let unselectedPersonas = [];
            let data, response;

            // 카테고리별로 페르소나 요청
            for (const category of Object.values(
              savedProjectInfo.businessAnalysis.category
            )) {
              data = {
                target: category,
              };

              response = await axios.post(
                "https://wishresearch.kr/person/find",
                data,
                axiosConfig
              );

              let newPersonas = response.response;

              // 이미 존재하는 페르소나는 제외
              for (let i = 0; i < newPersonas.length; i++) {
                let isDuplicate = false;
                for (let j = 0; j < unselectedPersonas.length; j++) {
                  if (
                    unselectedPersonas[j].persona === newPersonas[i].persona
                  ) {
                    isDuplicate = true;
                    break;
                  }
                }
                if (!isDuplicate) {
                  unselectedPersonas.push(newPersonas[i]);
                }
              }
            }

            let personaList = {
              selected: [],
              unselected: unselectedPersonas,
            };
            setPersonaList(personaList);
          }
          // setIsLoadingPage(false); // 로딩 완료
        }
        setProjectLoadButtonState(false);
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 500:
              setShowErrorPopup(true);
              break;
            case 504:
              setShowErrorPopup(true);
              break;
            default:
              setShowErrorPopup(true);
              break;
          }
          console.error("Error details:", error);
        }
      }
    };

    loadProject();
  }, [projectId, projectLoadButtonState, navigate]);

  // if (isLoadingPage) {
  //   return <div>Loading...</div>;
  // }

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  const reloadPersona = async () => {
    try {
      if (personaButtonState2) {
        setIsLoading(true);
        setShowRegenerateButton(false);

        let data, response;

        data = {
          business_idea: businessAnalysis,
        };

        // response = await axios.post(
        //   "https://wishresearch.kr/person/persona_request",
        //   data,
        //   axiosConfig
        // );
        // 페르소나 요청 API  수정 예정
        response = await InterviewXPersonaRequestRequest(data, isLoggedIn);

        let requestPersonaList = response.response;

        let retryCount = 0;
        const maxRetries = 10;

        while (
          retryCount < maxRetries &&
          (!response ||
            !response.response ||
            !requestPersonaList.hasOwnProperty("persona_spectrum") ||
            requestPersonaList.persona_spectrum.length !== 3 ||
            !requestPersonaList.persona_spectrum[0].hasOwnProperty(
              "persona_1"
            ) ||
            !requestPersonaList.persona_spectrum[1].hasOwnProperty(
              "persona_2"
            ) ||
            !requestPersonaList.persona_spectrum[2].hasOwnProperty(
              "persona_3"
            ) ||
            !requestPersonaList.persona_spectrum[0].persona_1.hasOwnProperty(
              "persona"
            ) ||
            !requestPersonaList.persona_spectrum[1].persona_2.hasOwnProperty(
              "persona"
            ) ||
            !requestPersonaList.persona_spectrum[2].persona_3.hasOwnProperty(
              "persona"
            ) ||
            !requestPersonaList.persona_spectrum[0].persona_1.persona ||
            !requestPersonaList.persona_spectrum[1].persona_2.persona ||
            !requestPersonaList.persona_spectrum[2].persona_3.persona ||
            !requestPersonaList.persona_spectrum[0].persona_1.hasOwnProperty(
              "keyword"
            ) ||
            !requestPersonaList.persona_spectrum[1].persona_2.hasOwnProperty(
              "keyword"
            ) ||
            !requestPersonaList.persona_spectrum[2].persona_3.hasOwnProperty(
              "keyword"
            ) ||
            requestPersonaList.persona_spectrum[0].persona_1.keyword.length <
              3 ||
            requestPersonaList.persona_spectrum[1].persona_2.keyword.length <
              3 ||
            requestPersonaList.persona_spectrum[2].persona_3.keyword.length < 3)
        ) {
          // response = await axios.post(
          //   "https://wishresearch.kr/person/persona_request",
          //   data,
          //   axiosConfig
          // );
          // 페르소나 요청 API  수정 예정
          response = await InterviewXPersonaRequestRequest(data, isLoggedIn);

          retryCount++;

          requestPersonaList = response.response;
        }
        if (retryCount >= maxRetries) {
          setShowErrorPopup(true);
          return;
        }
        setPersonaButtonState2(0);

        const requestPersonaData = {
          persona: requestPersonaList.persona_spectrum,
          positioning: requestPersonaList.positioning_analysis,
        };

        setRequestPersonaList(requestPersonaData);

        await updateProjectOnServer(
          projectId,
          {
            personaList: personaList.unselected.length,
            requestPersonaList: requestPersonaData,
          },
          isLoggedIn
        );
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowErrorPopup(true);
            break;
          case 504:
            if (regenerateCount >= 3) {
              setShowErrorPopup(true);
              return;
            } else {
              setShowRegenerateButton(true);
              setRegenerateCount(regenerateCount + 1);
            }
            break;
          default:
            setShowErrorPopup(true);
            break;
        }
        console.error("Error details:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadPersona = async () => {
      try {
        if (personaButtonState2) {
          setIsLoading(true);

          let unselectedPersonas = [];
          let data, response;

          // 카테고리별로 페르소나 요청
          for (const category of Object.values(businessAnalysis.category)) {
            data = {
              target: category,
            };

            response = await axios.post(
              "https://wishresearch.kr/person/find",
              data,
              axiosConfig
            );

            let newPersonas = response.response;

            // 이미 존재하는 페르소나는 제외
            for (let i = 0; i < newPersonas.length; i++) {
              let isDuplicate = false;
              for (let j = 0; j < unselectedPersonas.length; j++) {
                if (unselectedPersonas[j].persona === newPersonas[i].persona) {
                  isDuplicate = true;
                  break;
                }
              }
              if (!isDuplicate) {
                unselectedPersonas.push(newPersonas[i]);
              }
            }
          }

          let personaList = {
            selected: [],
            unselected: unselectedPersonas,
          };
          setPersonaList(personaList);

          ////////////////////////////////////////////////////////////////////////////////////////
          data = {
            business_idea: businessAnalysis,
          };

          // response = await axios.post(
          //   "https://wishresearch.kr/person/persona_request",
          //   data,
          //   axiosConfig
          // );
          // 페르소나 요청 API  수정 예정
          response = await InterviewXPersonaRequestRequest(data, isLoggedIn);

          let requestPersonaList = response.response;

          let retryCount = 0;
          const maxRetries = 10;
          // console.log(requestPersonaList);
          while (
            retryCount < maxRetries &&
            (!response ||
              !response.response ||
              !requestPersonaList.hasOwnProperty("persona_spectrum") ||
              requestPersonaList.persona_spectrum.length !== 3 ||
              !requestPersonaList.persona_spectrum[0].hasOwnProperty(
                "persona_1"
              ) ||
              !requestPersonaList.persona_spectrum[1].hasOwnProperty(
                "persona_2"
              ) ||
              !requestPersonaList.persona_spectrum[2].hasOwnProperty(
                "persona_3"
              ) ||
              !requestPersonaList.persona_spectrum[0].persona_1.hasOwnProperty(
                "persona"
              ) ||
              !requestPersonaList.persona_spectrum[1].persona_2.hasOwnProperty(
                "persona"
              ) ||
              !requestPersonaList.persona_spectrum[2].persona_3.hasOwnProperty(
                "persona"
              ) ||
              !requestPersonaList.persona_spectrum[0].persona_1.persona ||
              !requestPersonaList.persona_spectrum[1].persona_2.persona ||
              !requestPersonaList.persona_spectrum[2].persona_3.persona ||
              !requestPersonaList.persona_spectrum[0].persona_1.hasOwnProperty(
                "keyword"
              ) ||
              !requestPersonaList.persona_spectrum[1].persona_2.hasOwnProperty(
                "keyword"
              ) ||
              !requestPersonaList.persona_spectrum[2].persona_3.hasOwnProperty(
                "keyword"
              ) ||
              requestPersonaList.persona_spectrum[0].persona_1.keyword.length <
                3 ||
              requestPersonaList.persona_spectrum[1].persona_2.keyword.length <
                3 ||
              requestPersonaList.persona_spectrum[2].persona_3.keyword.length <
                3)
          ) {
            // response = await axios.post(
            //   "https://wishresearch.kr/person/persona_request",
            //   data,
            //   axiosConfig
            // );
            // 페르소나 요청 API  수정 예정
            response = await InterviewXPersonaRequestRequest(data, isLoggedIn);

            retryCount++;

            requestPersonaList = response.response;
          }
          if (retryCount >= maxRetries) {
            setShowErrorPopup(true);
            return;
          }
          setPersonaButtonState2(0);

          const requestPersonaData = {
            persona: requestPersonaList.persona_spectrum,
            positioning: requestPersonaList.positioning_analysis,
          };

          setRequestPersonaList(requestPersonaData);

          await updateProjectOnServer(
            projectId,
            {
              personaList: personaList.unselected.length,
              requestPersonaList: requestPersonaData,
            },
            isLoggedIn
          );
        }
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 500:
              setShowErrorPopup(true);
              break;
            case 504:
              if (regenerateCount >= 3) {
                setShowErrorPopup(true);
                return;
              } else {
                setShowRegenerateButton(true);
                setRegenerateCount(regenerateCount + 1);
              }
              break;
            default:
              setShowErrorPopup(true);
              break;
          }
          console.error("Error details:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPersona();
  }, [personaButtonState2]);

  const handleStartInterview = () => {
    // 선택된 페르소나들을 selected에 반영
    setPersonaList((prev) => ({
      selected: selectedPersonas,
      unselected: prev.unselected.filter(
        (persona) => !selectedPersonas.includes(persona)
      ),
    }));

    setPersonaStep(3);
    setIsPersonaAccessible(true);
    navigate(`/Persona/3`, { replace: true });
  };

  const [showTooltip, setShowTooltip] = useState(false);

  const handleCustomizeRequest = () => {
    setShowCustomizePopup(true);
  };

  const handleCustomizePopupClose = () => {
    setShowCustomizePopup(false);
  };
  const handleCustomizePopupConfirm = () => {
    submitCustomPersonaRequest();
    setShowCustomizePopup(false);
  };
  const [state, setState] = useState({
    isAccordionOpen: false,
    formState: {
      quantity: 1,
    },
  });

  // quantity 변경 핸들러 수정
  const handleQuantityChange = (type) => {
    setCustomPersonaForm((prev) => {
      const newQuantity =
        type === "up"
          ? Math.min(prev.quantity + 1, 30) // 최대 20
          : Math.max(prev.quantity - 1, 1); // 최소 1
      return {
        ...prev,
        quantity: newQuantity,
      };
    });
  };

  // 각 입력 필드의 onChange 핸들러
  const handleCustomPersonaChange = (field, value) => {
    setCustomPersonaForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 연령대 선택 핸들러
  const handleAgeGroupChange = (ageGroup) => {
    setCustomPersonaForm((prev) => ({
      ...prev,
      ageGroups: prev.ageGroups.includes(ageGroup)
        ? prev.ageGroups.filter((age) => age !== ageGroup)
        : [...prev.ageGroups, ageGroup],
    }));
  };
  const initialCustomPersonaForm = {
    description: "",
    purpose: "",
    quantity: 1,
    gender: "",
    ageGroups: [],
    additionalInfo: "",
  };

  // API 호출 함수
  const submitCustomPersonaRequest = async () => {
    try {
      const requestData = {
        projectId: projectId,
        businessAnalysis: businessAnalysis,
        requestDate: new Date().toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        personaRequest: {
          description: customPersonaForm.description,
          purpose: customPersonaForm.purpose,
          quantity: customPersonaForm.quantity,
          preferences: {
            gender: customPersonaForm.gender,
            ageGroups: customPersonaForm.ageGroups,
          },
          additionalInfo: customPersonaForm.additionalInfo,
        },
      };

      const response = await createRequestPersonOnServer(
        requestData,
        isLoggedIn
      );
      if (response) {
        // 요청 성공 시 상태 초기화
        setCustomPersonaForm({
          description: "", // 페르소나 특징과 역할
          purpose: "", // 사용 목적
          quantity: 1, // 모집 인원
          gender: "", // 성별 ('' | 'male' | 'female')
          ageGroups: [], // 연령대 선택 ['10s', '20s', ...]
          additionalInfo: "", // 추가 필요 정보
        });

        handleCustomizePopupClose();
        // 성공 메시지 표시 등 추가 처리
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowErrorPopup(true);
            break;
          case 504:
            // 재생성하기
            break;
          default:
            setShowErrorPopup(true);
            break;
        }
        console.error("Error details:", error);
      }
    }
  };

  // 폼 유효성 검사 함수 추가
  const isFormValid = () => {
    // 필수 필드 검사
    const requiredFields = {
      description: customPersonaForm.description.trim(),
      purpose: customPersonaForm.purpose.trim(),
    };

    // 모든 필수 필드가 채워져 있는지 확인
    const isRequiredFieldsFilled = Object.values(requiredFields).every(
      (field) => field.length > 0
    );

    return isRequiredFieldsFilled;
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent>
          <AnalysisWrap>
            <MainSection>
              <OrganismBusinessAnalysis personaStep={2} />
              {showRegenerateButton ? (
                <CardWrap>
                  <MoleculeRecreate Large onRegenerate={reloadPersona} />
                </CardWrap>
              ) : (
                <CardWrap>
                  <>
                    <BoxWrap>
                      <img src={images.BgUserChatDots} alt="" />
                      <Body3 color="gray700">
                        바로 대화를 원하시면 일상 페르소나와 함께 !<br />
                        맞춤형 비즈니스 대화를 원하시면 비즈니스 페르소나를
                        요청해주세요{" "}
                      </Body3>
                    </BoxWrap>

                    <CustomizePersona>
                      <Tabheader>
                        <TabWrapType3>
                          <TabButtonType3>일상 페르소나 (12)</TabButtonType3>
                          <TabButtonType3>
                            비즈니스 페르소나 (12)
                          </TabButtonType3>
                        </TabWrapType3>

                        <FillterWrap>
                          <ViewType>
                            <TypeButton List active>
                              리스트
                            </TypeButton>
                            <TypeButton Card>카드</TypeButton>
                          </ViewType>

                          <Button Large PrimaryLightest Fill>
                            <img src={images.PlusPrimary} alt="" />
                            페르소나 요청
                          </Button>
                        </FillterWrap>
                      </Tabheader>

                      <ContentSection>
                        <>
                          <PersonaCards>
                            {/* {requestPersonaList.persona.map((persona, index) => (
                            <MoleculePersonaCard
                              key={index}
                              title={persona[`persona_${index + 1}`].persona}
                              keywords={persona[`persona_${index + 1}`].keyword}
                              isCustom={true}
                              onSelect={(isSelected) =>
                                handlePersonaSelect(persona, isSelected)
                              }
                              onClick={() => setShowPopup(true)}
                              currentSelection={selectedPersonas.length}
                            />
                          ))} */}
                            {personaList.unselected.map((persona, index) => {
                              const profileArray = persona.profile
                                .replace(/['\[\]]/g, "")
                                .split(", ");
                              const age = profileArray[0].split(": ")[1];
                              const gender =
                                profileArray[1].split(": ")[1] === "남성"
                                  ? "남성"
                                  : "여성";
                              const job = profileArray[2].split(": ")[1];

                              return (
                                <MoleculePersonaCard
                                  key={index}
                                  title={persona.persona}
                                  keywords={persona.keyword.split(",")}
                                  gender={gender}
                                  age={age}
                                  job={job}
                                  isBasic={true}
                                  onSelect={(isSelected) =>
                                    handlePersonaSelect(persona, isSelected)
                                  }
                                  currentSelection={selectedPersonas.length}
                                />
                              );
                            })}
                          </PersonaCards>

                          {/* 나만의 페르소나 커스터마이징 배너 */}
                          <BannerPersona>
                            <div>
                              <h2>
                                나만의 페르소나 커스터마이징
                                <p>
                                  페르소나를 커스터마이징하여 더 정확한 인터뷰를
                                  진행해보세요.
                                </p>
                              </h2>

                              <Button
                                Large
                                Primary
                                onClick={handleCustomizeRequest}
                              >
                                요청하기
                                <img src={images.ChevronRightPrimary} alt="" />
                              </Button>
                            </div>
                            <img src={images.PersonaCustomizing} alt="" />
                          </BannerPersona>
                        </>
                        {!personaButtonState2 && (
                          <BottomBar>
                            <p>
                              {selectedPersonas.length > 0 ? (
                                <>
                                  선택하신{" "}
                                  <span>{selectedPersonas.length}명</span>의
                                  페르소나와 인터뷰 하시겠어요? (
                                  {selectedPersonas.length}/5)
                                </>
                              ) : (
                                "페르소나를 선택하고 그들의 인터뷰를 시작해 보세요 (최대 5명 선택 가능)"
                              )}
                            </p>
                            <Button
                              Large
                              Primary
                              Fill={selectedPersonas.length > 0}
                              // Edit={selectedPersonas.length === 0}
                              disabled={selectedPersonas.length === 0}
                              onClick={handleStartInterview}
                            >
                              인터뷰 시작하기
                              <img src={images.ChevronRight} alt="" />
                            </Button>
                          </BottomBar>
                        )}
                      </ContentSection>

                      {/* 
                      <Title Column>
                        <Body2>비즈니스 맞춤 페르소나</Body2>
                        <p>
                          비즈니스에 딱 맞는 페르소나를 추천해드려요. 요청을
                          보내주시면 인터뷰 참여 모집이 시작됩니다.
                        </p>
                      </Title>
                      <ContentSection row>
                        {personaButtonState2 ? (
                          <PersonaCards>
                            <AtomPersonaLoader message="최적의 페르소나를 모집하고 있습니다..." />
                          </PersonaCards>
                        ) : (
                          requestPersonaList.persona.map((persona, index) => (
                            <MoleculeRequestPersonaCard
                              key={index}
                              persona={persona[`persona_${index + 1}`]}
                              personaIndex={index + 1}
                            />
                          ))
                        )}
                      </ContentSection>
                       */}
                    </CustomizePersona>

                    {/* 산업별 인기 페르소나 */}

                    {!personaButtonState2 && (
                      <CustomizePersona>
                        <Title Column>
                          <Body2>산업별 인기 페르소나</Body2>
                          <p>
                            산업별로 자주 활용되는 페르소나를 확인하고 지금 바로
                            대화하여 인사이트를 얻어보세요.
                            <TooltipButton
                              onClick={() => setShowTooltip(!showTooltip)}
                            >
                              유형별 설명 보기
                              {showTooltip && (
                                <TooltipContent>
                                  <TooltipHeader>
                                    아이콘에 대한 정보
                                    <span />
                                  </TooltipHeader>

                                  <TooltipBody>
                                    <div>
                                      <Badge Basic>
                                        <img
                                          src={images.StatusBadgeBasic}
                                          alt="기본형"
                                        />
                                        기본형
                                      </Badge>
                                      <p>
                                        기본형은 특정 요구 사항 없이도 다양한
                                        질문과 답변을 처리할 수 있는 표준형 AI
                                        Person입니다. 범용적인 활용이 가능하며,
                                        일반적인 상황에 적합합니다.
                                      </p>
                                    </div>

                                    <div>
                                      <Badge Custom>
                                        <img
                                          src={images.StatusBadgeCustom}
                                          alt="커스터마이즈"
                                        />
                                        커스터마이즈
                                      </Badge>
                                      <p>
                                        커스터마이즈는 특정 요구 사항에 맞춰
                                        설정된 AI Person입니다. 라이프스타일,
                                        경험, 지식 등을 학습하여 원하는 목적에
                                        맞게 활용할 수 있으며, 보다 깊이 있는
                                        대화에 적합합니다.
                                      </p>
                                    </div>
                                    {/* 
                                    <div>
                                      <Badge>
                                        <img
                                          src={images.NoteArrowUp}
                                          alt="요청 필요"
                                        />
                                        요청 필요
                                      </Badge>
                                      <p>
                                        요청필요는 사용자 요청에 따라 준비되는
                                        AI Person입니다. 원하는 정보와 경험을
                                        입력하시면 맞춤 제작이 가능합니다.
                                      </p>
                                    </div> 
                                    */}
                                  </TooltipBody>
                                </TooltipContent>
                              )}
                            </TooltipButton>
                          </p>
                        </Title>

                        <ContentSection>
                          <>
                            <PersonaCards>
                              {/* {requestPersonaList.persona.map((persona, index) => (
                            <MoleculePersonaCard
                              key={index}
                              title={persona[`persona_${index + 1}`].persona}
                              keywords={persona[`persona_${index + 1}`].keyword}
                              isCustom={true}
                              onSelect={(isSelected) =>
                                handlePersonaSelect(persona, isSelected)
                              }
                              onClick={() => setShowPopup(true)}
                              currentSelection={selectedPersonas.length}
                            />
                          ))} */}
                              {personaList.unselected.map((persona, index) => {
                                const profileArray = persona.profile
                                  .replace(/['\[\]]/g, "")
                                  .split(", ");
                                const age = profileArray[0].split(": ")[1];
                                const gender =
                                  profileArray[1].split(": ")[1] === "남성"
                                    ? "남성"
                                    : "여성";
                                const job = profileArray[2].split(": ")[1];

                                return (
                                  <MoleculePersonaCard
                                    key={index}
                                    title={persona.persona}
                                    keywords={persona.keyword.split(",")}
                                    gender={gender}
                                    age={age}
                                    job={job}
                                    isBasic={true}
                                    onSelect={(isSelected) =>
                                      handlePersonaSelect(persona, isSelected)
                                    }
                                    currentSelection={selectedPersonas.length}
                                  />
                                );
                              })}
                            </PersonaCards>

                            {/* 나만의 페르소나 커스터마이징 배너 */}
                            <BannerPersona>
                              <div>
                                <h2>
                                  나만의 페르소나 커스터마이징
                                  <p>
                                    페르소나를 커스터마이징하여 더 정확한
                                    인터뷰를 진행해보세요.
                                  </p>
                                </h2>

                                <Button
                                  Large
                                  Primary
                                  onClick={handleCustomizeRequest}
                                >
                                  요청하기
                                  <img
                                    src={images.ChevronRightPrimary}
                                    alt=""
                                  />
                                </Button>
                              </div>
                              <img src={images.PersonaCustomizing} alt="" />
                            </BannerPersona>
                          </>
                          {!personaButtonState2 && (
                            <BottomBar>
                              <p>
                                {selectedPersonas.length > 0 ? (
                                  <>
                                    선택하신{" "}
                                    <span>{selectedPersonas.length}명</span>의
                                    페르소나와 인터뷰 하시겠어요? (
                                    {selectedPersonas.length}/5)
                                  </>
                                ) : (
                                  "페르소나를 선택하고 그들의 인터뷰를 시작해 보세요 (최대 5명 선택 가능)"
                                )}
                              </p>
                              <Button
                                Large
                                Primary
                                Fill={selectedPersonas.length > 0}
                                // Edit={selectedPersonas.length === 0}
                                disabled={selectedPersonas.length === 0}
                                onClick={handleStartInterview}
                              >
                                인터뷰 시작하기
                                <img src={images.ChevronRight} alt="" />
                              </Button>
                            </BottomBar>
                          )}
                        </ContentSection>
                      </CustomizePersona>
                    )}
                  </>
                </CardWrap>
              )}
            </MainSection>

            {/* 
            <Sidebar>
              <h5>Discover Your Persona</h5>

              <ProgressBar>
                <span className="icon">🚀</span>
                <Progress progress={40} />
                <span>40%</span>
              </ProgressBar>

              <MoleculeStepIndicator steps={steps} activeStep={2} />
            </Sidebar>
             */}
          </AnalysisWrap>
        </MainContent>
      </ContentsWrap>

      {showPopup && (
        <PopupWrap
          Warning
          title="요청 상태의 페르소나는 선택이 제한됩니다."
          message="인터뷰를 진행하려면 모집 요청을 먼저 진행해주세요"
          buttonType="Outline"
          closeText="확인"
          isModal={false}
          onCancel={handlePopupClose}
          show={showPopup}
        />
      )}

      {showCustomizePopup && (
        <PopupWrap
          TitleFlex
          title="📝 맞춤형 페르소나 모집 요청하기"
          buttonType="Fill"
          confirmText="맞춤 페르소나 모집하기"
          isModal={true}
          isFormValid={isFormValid()}
          onCancel={handleCustomizePopupClose}
          onConfirm={() => {
            // 여기에 확인 버튼 클릭 시 처리할 로직 추가
            handleCustomizePopupConfirm();
          }}
          body={
            <>
              <Title>
                <p className="required">어떤 페르소나가 필요하신가요?</p>
              </Title>
              <div style={{ width: "100%" }}>
                <CustomTextarea
                  rows={4}
                  placeholder="필요한 페르소나의 특징과 역할을 적어주세요."
                  value={customPersonaForm.description}
                  onChange={(e) => {
                    if (e.target.value.length <= 300) {
                      handleCustomPersonaChange("description", e.target.value);
                    }
                  }}
                />
              </div>
              <Title>
                <p className="required">
                  이 페르소나를 사용하려는 목적은 무엇인가요?
                </p>
              </Title>
              <div style={{ width: "100%" }}>
                <CustomTextarea
                  rows={4}
                  placeholder="해당 페르소나가 필요한 이유, 얻고 싶은 인사이트, 하고자 하는 목표 등을 입력해주세요."
                  value={customPersonaForm.purpose}
                  onChange={(e) => {
                    if (e.target.value.length <= 300) {
                      handleCustomPersonaChange("purpose", e.target.value);
                    }
                  }}
                />
              </div>
              <Title>
                <p className="required">
                  몇명의 페르소나를 모집하시고 싶으신가요?(최대 30명)
                </p>
              </Title>

              <Quantity>
                <span
                  className="down"
                  onClick={() => handleQuantityChange("down")}
                  disabled={customPersonaForm.quantity <= 1}
                >
                  줄이기
                </span>
                <CustomInput
                  type="number"
                  value={customPersonaForm.quantity}
                  min={1}
                  max={30}
                  onChange={(e) => {
                    const value = Math.max(
                      1,
                      Math.min(20, parseInt(e.target.value) || 1)
                    );
                    setCustomPersonaForm((prev) => ({
                      ...prev,
                      quantity: value,
                    }));
                  }}
                />
                <span
                  className="up"
                  onClick={() => handleQuantityChange("up")}
                  disabled={customPersonaForm.quantity >= 30}
                >
                  늘리기
                </span>
              </Quantity>
              <AccordionSection>
                <CustomAccordionHeader
                  None
                  onClick={() =>
                    setCustomizeFormState((prev) => ({
                      ...prev,
                      isAccordionOpen: !prev.isAccordionOpen,
                    }))
                  }
                >
                  🔍 세부 사항 설정
                  <CustomAccordionIcon
                    isOpen={customizeFormState.isAccordionOpen}
                  />
                </CustomAccordionHeader>
                {customizeFormState.isAccordionOpen && (
                  <CustomAccordionContent None>
                    <dl>
                      <dt>성별</dt>
                      <dd>
                        <input
                          type="radio"
                          id="gender1"
                          name="gender"
                          checked={customPersonaForm.gender === "male"}
                          onClick={() => {
                            // 현재 선택된 값과 같은 값을 클릭하면 선택 해제
                            if (customPersonaForm.gender === "male") {
                              handleCustomPersonaChange("gender", "");
                            } else {
                              handleCustomPersonaChange("gender", "male");
                            }
                          }}
                        />
                        <label htmlFor="gender1" className="gender men">
                          {/* <img src={images.GenderMen} alt="GenderMen" /> */}
                          <i class="icon man" />
                          man
                          <span className="check-circle" />
                        </label>
                        <input
                          type="radio"
                          id="gender2"
                          name="gender"
                          checked={customPersonaForm.gender === "female"}
                          onClick={() => {
                            // 현재 선택된 값과 같은 값을 클릭하면 선택 해제
                            if (customPersonaForm.gender === "female") {
                              handleCustomPersonaChange("gender", "");
                            } else {
                              handleCustomPersonaChange("gender", "female");
                            }
                          }}
                        />
                        <label htmlFor="gender2" className="gender women">
                          {/* <img src={images.GenderWomen} alt="GenderWomen" /> */}
                          <i class="icon woman" />
                          woman
                          <span className="check-circle" />
                        </label>
                      </dd>
                    </dl>

                    <dl>
                      <dt>연령 (다중 선택)</dt>
                      <dd>
                        <AgeGroup>
                          <div>
                            {["10s", "20s", "30s", "40s"].map((age, index) => (
                              <React.Fragment key={age}>
                                <input
                                  type="checkbox"
                                  id={`age${index + 1}`}
                                  name="age"
                                  checked={customPersonaForm.ageGroups.includes(
                                    age
                                  )}
                                  onChange={() => handleAgeGroupChange(age)}
                                />
                                <label
                                  htmlFor={`age${index + 1}`}
                                  className="age"
                                >
                                  {age.replace("s", "대")}
                                </label>
                              </React.Fragment>
                            ))}
                          </div>
                          <div>
                            {["50s", "60s", "70s"].map((age, index) => (
                              <React.Fragment key={age}>
                                <input
                                  type="checkbox"
                                  id={`age${index + 5}`}
                                  name="age"
                                  checked={customPersonaForm.ageGroups.includes(
                                    age
                                  )}
                                  onChange={() => handleAgeGroupChange(age)}
                                />
                                <label
                                  htmlFor={`age${index + 5}`}
                                  className="age"
                                >
                                  {age.replace("s", "대")}
                                </label>
                              </React.Fragment>
                            ))}
                            <div className="empty-space"></div>
                          </div>
                        </AgeGroup>
                      </dd>
                    </dl>

                    <dl>
                      <dt>필수적으로 필요한 정보가 있다면, 알려주세요</dt>
                      <dd>
                        <CustomTextarea
                          rows={3}
                          placeholder="필수로 고려해야할 정보가 있다면 작성해주세요."
                          value={customPersonaForm.additionalInfo}
                          onChange={(e) => {
                            if (e.target.value.length <= 300) {
                              handleCustomPersonaChange(
                                "additionalInfo",
                                e.target.value
                              );
                            }
                          }}
                        />
                      </dd>
                    </dl>
                  </CustomAccordionContent>
                )}
              </AccordionSection>
            </>
          }
        />
      )}

      {showErrorPopup && (
        <PopupWrap
          Warning
          title="작업이 중단되었습니다"
          message="데이터 오류로 인해 페이지가 초기화됩니다."
          message2="작업 중인 내용은 작업관리 페이지를 확인하세요."
          buttonType="Outline"
          closeText="확인"
          onConfirm={() => {
            setShowErrorPopup(false);
            window.location.href = "/Project";
          }}
          onCancel={() => {
            setShowErrorPopup(false);
            window.location.href = "/Project";
          }}
        />
      )}
    </>
  );
};

export default PagePersona2;

const AgeGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  > div {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

  .empty-space {
    width: 100%;
  }
`;

const TooltipButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 0.75rem;
  color: ${palette.gray300};
  padding: 4px 8px;
  cursor: pointer;
  z-index: 1;

  &:after {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    font-size: 0.63rem;
    color: ${palette.gray500};
    border: 1px solid ${palette.outlineGray};
    background: ${palette.chatGray};
    content: "?";
  }
`;

const TooltipContent = styled.div`
  position: absolute;
  top: -25px;
  right: -300px;
  width: 290px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  padding: 20px 20px 32px;
  border-radius: 15px;
  background: ${palette.white};
  filter: drop-shadow(0px 4px 30px rgba(0, 0, 0, 0.15));
  animation: fadeIn 0.3s ease-in-out;
  cursor: default;
  z-index: 100;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:before {
    position: absolute;
    top: 30px;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid ${palette.white};
    content: "";
  }
`;

const TooltipHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 300;
  color: ${palette.gray800};
  line-height: 1.5;
  width: 100%;

  span {
    position: relative;
    width: 16px;
    height: 16px;
    display: block;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 16px;
      display: block;
      border-radius: 5px;
      background: ${palette.gray700};
      content: "";
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`;

const TooltipBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    width: 100%;
  }

  p {
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${palette.gray700};
    text-align: left;
  }
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: ${(props) =>
    props.Basic || props.Custom ? "0.75rem" : "0.63rem"};
  color: ${(props) =>
    props.Basic
      ? palette.green
      : props.Custom
      ? palette.primary
      : palette.gray500};
  line-height: 1.2;
  padding: 4px 8px;
  border-radius: 50px;
  border: 1px solid
    ${(props) =>
      props.Basic
        ? `rgba(52, 199, 89, 0.10)`
        : props.Custom
        ? `rgba(34, 111, 255, 0.10)`
        : palette.gray200};
  background: ${(props) =>
    props.Basic
      ? `rgba(52, 199, 89, 0.10)`
      : props.Custom
      ? `rgba(34, 111, 255, 0.10)`
      : palette.white};
`;

const Sidebar = styled.div`
  position: sticky;
  top: 101px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 16px;
  width: 290px;
  padding: 16px 20px;
  margin-top: 44px;
  border-radius: 10px;
  background: ${palette.chatGray};

  h5 {
    font-size: 0.88rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${palette.gray700};
    text-align: left;
  }
`;

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  span {
    font-size: 0.75rem;
    line-height: 1.5;
    color: ${palette.gray700};
  }

  .icon {
    font-size: 1.13rem;
  }
`;

const Progress = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 20px;
  background: ${palette.outlineGray};

  &:before {
    display: block;
    width: ${(props) => props.progress}%;
    height: 100%;
    border-radius: 20px;
    background: ${palette.primary};
    content: "";
  }
`;

const PersonaCards = styled.div`
  display: flex;
  flex-direction: ${(props) => {
    if (props.row) return `row`;
    else return `column`;
  }};
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

// const BottomBar = styled.div`
//   position: sticky;
//   bottom: 40px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 24px 20px;
//   border-radius: 10px;
//   border: 1px solid ${palette.outlineGray};
//   box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
//   background: ${palette.white};

//   //   button:disabled {
//   //     cursor: default;
//   //   }

//   p {
//     font-size: 0.875rem;
//     font-weight: 300;
//     line-height: 1.5;
//     color: ${palette.gray500};

//     span {
//       font-size: 1rem;
//       font-weight: 600;
//       color: ${palette.primary};
//       // text-decoration: underline;
//     }
//   }
// `;

// const BottomBar = styled.div`
//   position: fixed;
//   bottom: 40px;
//   width: 718px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 24px 20px;
//   border-radius: 10px;
//   border: 1px solid ${palette.outlineGray};
//   box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
//   background: ${palette.white};
//   z-index: 100;

//   p {
//     font-size: 0.875rem;
//     font-weight: 300;
//     line-height: 1.5;
//     color: ${palette.gray500};

//     span {
//       font-size: 1rem;
//       font-weight: 600;
//       color: ${palette.primary};
//     }
//   }
// `;

const BannerPersona = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 26px 32px 26px 50px;
  border-radius: 10px;
  background: #f8f9fd;
  overflow: hidden;
  margin-bottom: 120px; // 하단 여백 추가하여 BottomBar가 가리지 않도록 함

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 24px;
  }

  h2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 4px;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.3;
    color: ${palette.gray800};

    p {
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      color: ${palette.gray700};
    }
  }
`;

const Quantity = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  height: 67px;

  span {
    position: relative;
    font-size: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 67px;
    height: 67px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
    background: ${palette.chatGray};
    cursor: pointer;
    &[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
    &.down:before,
    &.up:before,
    &.up:after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 11px;
      height: 2px;
      border-radius: 10px;
      background: ${palette.gray500};
      content: "";
    }

    &.up:after {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }

  input {
    font-size: 1rem;
    font-weight: 300;
    color: ${palette.gray500};
    text-align: center;
    padding: 24px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
    outline: none;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
    }
  }
`;

const Tabheader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
`;

const FillterWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
