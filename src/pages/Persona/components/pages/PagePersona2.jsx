//persona step 2 맞춤 페르소나 추천
import React, { useEffect, useState, useRef } from "react";
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
  FILTERED_PROJECT_LIST,
  BUSINESS_PERSONA_LIST,
  TYPES_LIST,
  SINGLE_INTERVIEW_QUESTION_LIST,
  INTERVIEW_QUESTION_LIST,
  CUSTOM_THEORY_DATA,
  All_BUSINESS_PERSONA_LIST,
  CREDIT_REQUEST_CUSTOM_PERSONA,
  EVENT_STATE,
  EVENT_TITLE,
  TRIAL_STATE,
  CREDIT_REQUEST_BUSINESS_PERSONA,
  SELECTED_INTERVIEW_TYPE,
  USER_CREDITS,
  CUSTOM_PERSONA_LIST,
} from "../../../AtomStates";
import {
  ContentsWrap,
  ContentSection,
  MainContent,
  AnalysisWrap,
  MainSection,
  CardWrap,
  CustomizePersona,
  BoxWrap,
  BottomBar,
  TabWrapType3,
  TabButtonType3,
  ViewType,
  TypeButton,
  CardGroupWrap,
  CategoryView,
  ChoiceWrap,
  Choice,
  TypeMore,
  Personnel,
  MoreButton,
  TypeList,
  TypeItemList,
  TypeItem,
  TypeListItem,
  PopupTitle,
  PopupContent,
  OCEANRangeWrap,
  RangeSlider,
  BgBoxItem,
  PopupTitle2,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import {
  Body2,
  Body3,
  Sub1,
  Sub3,
  Caption2,
  Sub2_1,
} from "../../../../assets/styles/Typography";
import {
  CustomTextarea,
  CustomInput,
  GenderRadioButton,
} from "../../../../assets/styles/InputStyle";
import { CheckBox } from "../../../../assets/styles/Input";
import OrganismIncNavigation from "../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../Global/molecules/MoleculeHeader";
import MoleculePersonaCard from "../molecules/MoleculePersonaCard";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";
import {
  updateProjectOnServer,
  UserCreditInfo,
} from "../../../../utils/indexedDB";
// import { updateProjectReportOnServer } from "../../../../utils/indexedDB";
import OrganismBusinessAnalysis from "../organisms/OrganismBusinessAnalysis";
import AtomPersonaLoader from "../../../Global/atoms/AtomPersonaLoader";
import PopupWrap, { Contents } from "../../../../assets/styles/Popup";
import { getProjectByIdFromIndexedDB } from "../../../../utils/indexedDB";
import MoleculeRequestPersonaCard from "../molecules/MoleculeRequestPersonaCard";
import { createRequestPersonOnServer } from "../../../../utils/indexedDB";
import MoleculeRecreate from "../molecules/MoleculeRecreate";
import { InterviewXInterviewReportPersonaFilter } from "../../../../utils/indexedDB";
import { InterviewXPersonaRequestType } from "../../../../utils/indexedDB";
import { InterviewXPersonaRequestRequest } from "../../../../utils/indexedDB";
import { UserCreditCheck, UserCreditUse } from "../../../../utils/indexedDB";
import MoleculeBussinessPersonaCard from "../molecules/MoleculeBussinessPersonaCard";
import MoleculeCustomPersonaCard from "../molecules/MoleculeCustomPersonaCard";

const PagePersona2 = () => {
  const [customPersonaList, setCustomPersonaList] =
    useAtom(CUSTOM_PERSONA_LIST);
  const [selectedInterviewType, setSelectedInterviewType] = useAtom(
    SELECTED_INTERVIEW_TYPE
  );
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
  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [isPersonaAccessible, setIsPersonaAccessible] = useAtom(
    IS_PERSONA_ACCESSIBLE
  );
  const [personaButtonState2, setPersonaButtonState2] = useAtom(
    PERSONA_BUTTON_STATE_2
  ); //페르소나 생성/로딩 상태 관리 setPersonaButtonState2(0) :  api 호출 완료
  const [customTheoryData, setCustomTheoryData] = useAtom(CUSTOM_THEORY_DATA);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [personaStep, setPersonaStep] = useAtom(PERSONA_STEP);
  const [businessAnalysis, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [filteredProjectList, setFilteredProjectList] = useAtom(
    FILTERED_PROJECT_LIST
  );
  const [businessPersonaList, setBusinessPersonaList] = useAtom(
    BUSINESS_PERSONA_LIST
  );
  const [personaList, setPersonaList] = useAtom(PERSONA_LIST);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // const [allBusinessPersonas, setAllBusinessPersonas] = useState([]); // 전체 비즈니스 페르소나 상태
  const [allBusinessPersonas, setAllBusinessPersonas] = useAtom(
    All_BUSINESS_PERSONA_LIST
  );
  // const [typesList, setTypesList] = useAtom(TYPES_LIST);

  const [selectedPersonas, setSelectedPersonas] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showCustomizePopup, setShowCustomizePopup] = useState(false);

  const [showInterviewPopup, setShowInterviewPopup] = useState(false);
  const [selectedPersonaForPopup, setSelectedPersonaForPopup] = useState(null);
  const [rangeValue, setRangeValue] = useState(50);

  const [isLoadingType, setIsLoadingType] = useState(false);
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const [displayedPersonas, setDisplayedPersonas] = useState([]);

  const [customizeFormState, setCustomizeFormState] = useState({
    isAccordionOpen: false,
    personaDescription: "", // 페르소나 설명
    purposeDescription: "", // 목적 설명
  });

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [regenerateCount, setRegenerateCount] = useState(0);
  // const [showRegenerateButton, setShowRegenerateButton] = useState(false);
  const [hasMorePersonas, setHasMorePersonas] = useState(true);
  const [singleInterviewQuestionList, setSingleInterviewQuestionList] = useAtom(
    SINGLE_INTERVIEW_QUESTION_LIST
  );
  const [interviewQuestionList, setInterviewQuestionList] = useAtom(
    INTERVIEW_QUESTION_LIST
  );
  //크래딧
  const [creditRequestCustomPersona] = useAtom(CREDIT_REQUEST_CUSTOM_PERSONA);
  const [creditRequestBusinessPersona] = useAtom(
    CREDIT_REQUEST_BUSINESS_PERSONA
  );
  const [eventState] = useAtom(EVENT_STATE);
  const [eventTitle] = useAtom(EVENT_TITLE);
  const [trialState] = useAtom(TRIAL_STATE);

  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  // 로딩 상태 관리
  const loadingRef = useRef(false);
  const [viewType, setViewType] = useState("list"); // 'list' 또는 'card'

  const [activeTab, setActiveTab] = useState("daily"); // 'daily' 또는 'business'
  const [findPersonas, setFindPersonas] = useState([]);
  // 새로운 상태 추가 (컴포넌트 최상단)
  const [isLoadingDaily, setIsLoadingDaily] = useState(false);
  const [isLoadingBusiness, setIsLoadingBusiness] = useState(false);

  const [showTypeList, setShowTypeList] = useState(false);

  const [selectedTypes, setSelectedTypes] = useState([]);

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [unselectedTypes, setUnselectedTypes] = useState([
    {
      index: 1,
      id: "type1",
      label: "전형적 사용자 페르소나",
      count: 1,
      wasSelected: false,
    },
    {
      index: 2,
      id: "type2",
      label: "극단적 사용자 페르소나",
      count: 2,
      wasSelected: false,
    },
    {
      index: 3,
      id: "type3",
      label: "비교 소비자 페르소나",
      count: 1,
      wasSelected: false,
    },
    {
      index: 4,
      id: "type4",
      label: "비전통적 사용자 페르소나",
      count: 1,
      wasSelected: false,
    },
    {
      index: 5,
      id: "type5",
      label: "문제 해결 중심 페르소나",
      count: 3,
      wasSelected: false,
    },
    {
      index: 6,
      id: "type6",
      label: "건강 중시 페르소나",
      count: 2,
      wasSelected: false,
    },
    {
      index: 7,
      id: "type7",
      label: "시장 트렌드 리더 페르소나",
      count: 1,
      wasSelected: false,
    },
    {
      index: 8,
      id: "type8",
      label: "예산 중시 소비자 페르소나",
      count: 1,
      wasSelected: false,
    },
    {
      index: 9,
      id: "type9",
      label: "혁신 추구 소비자 페르소나",
      count: 1,
      wasSelected: false,
    },
    {
      index: 10,
      id: "type10",
      label: "환경/윤리 중시 페르소나",
      count: 2,
      wasSelected: false,
    },
    {
      index: 11,
      id: "type11",
      label: "기능/성능 중시 소비자 페르소나",
      count: 1,
      wasSelected: false,
    },
    {
      index: 12,
      id: "type12",
      label: "브랜드 충성 소비자 페르소나",
      count: 1,
      wasSelected: false,
    },
    {
      index: 13,
      id: "type13",
      label: "감성적 소비자 페르소나",
      count: 3,
      wasSelected: false,
    },
    {
      index: 14,
      id: "type14",
      label: "특정 상황 중심 페르소나",
      count: 2,
      wasSelected: false,
    },
    {
      index: 15,
      id: "type15",
      label: "문화적/지역적 특성 중심 페르소나",
      count: 1,
      wasSelected: false,
    },
    {
      index: 16,
      id: "type16",
      label: "DIY/커스터마이징 선호 페르소나",
      count: 1,
      wasSelected: false,
    },
    {
      index: 17,
      id: "type17",
      label: "트렌드 회의적 소비자 페르소나",
      count: 1,
      wasSelected: false,
    },
    {
      index: 18,
      id: "type18",
      label: "단체 구매 소비자 페르소나",
      count: 3,
      wasSelected: false,
    },
    {
      index: 19,
      id: "type19",
      label: "호기심 기반 소비자 페르소나",
      count: 2,
      wasSelected: false,
    },
    {
      index: 20,
      id: "type20",
      label: "브랜드 전환 의향 소비자 페르소나",
      count: 1,
      wasSelected: false,
    },
  ]);

  const [originalUnselectedTypes, setOriginalUnselectedTypes] =
    useState(unselectedTypes);

  const [activeTabTlick, setActiveTabTlick] = useState(true);

  const [visibleSelectedTypes, setVisibleSelectedTypes] = useState([]);

  const [oceanValues, setOceanValues] = useState({
    openness: 0.5, // 중간값 0.5로 시작
    conscientiousness: 0.5,
    extraversion: 0.5,
    agreeableness: 0.5,
    neuroticism: 0.5,
  });

  const handleOceanChange = (trait, value) => {
    // 값을 0 또는 1로 스냅
    const snappedValue = Number(value) <= 0.5 ? 0 : 1;

    setOceanValues((prev) => ({
      ...prev,
      [trait]: snappedValue,
    }));
  };

  const handleViewTypeChange = (type) => {
    setViewType(type);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const [currentLoadingType, setCurrentLoadingType] = useState(null);
  // const [isLoadingPage, setIsLoadingPage] = useState(true);

  const [showCreditPopup, setShowCreditPopup] = useState(false);

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

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  const [currentRequestedPersona, setCurrentRequestedPersona] = useState([]);
  useEffect(() => {
    const loadProject = async () => {
      const currentProject = await getProjectByIdFromIndexedDB(
        projectId,
        isLoggedIn
      );
      const currentRequestedPersona = currentProject?.requestedPersona || [];
      setCurrentRequestedPersona(currentRequestedPersona);
    };
    loadProject();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  useEffect(() => {
    // 접근 가능 여부를 확인하여 차단 로직 수행
    if (!isPersonaAccessible) {
      navigate("/Project"); // 접근이 허용되지 않으면 메인 페이지로 리다이렉트
    }

    // 페이지를 나갈 때 접근 가능 여부 초기화
    return () => {
      setIsPersonaAccessible(false); // 페이지 떠날 때 접근 불가로 설정
    };
  }, [navigate]);

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
        setSelectedInterviewType("");
        if (projectLoadButtonState) {
          const savedProjectInfo = await getProjectByIdFromIndexedDB(
            projectId,
            projectLoadButtonState
          );

          if (savedProjectInfo) {
            setBusinessAnalysis(savedProjectInfo.businessAnalysis);
            if (savedProjectInfo.filteredPersonaList) {
              setFilteredProjectList(savedProjectInfo.filteredPersonaList);
            }
            if (savedProjectInfo.businessPersonaList) {
              setAllBusinessPersonas(savedProjectInfo.businessPersonaList);
            }
            if (savedProjectInfo.customPersonaList) {
              setCustomPersonaList(savedProjectInfo.customPersonaList);
            }
            if (savedProjectInfo.singleInterviewQuestionList) {
              setSingleInterviewQuestionList(
                savedProjectInfo.singleInterviewQuestionList
              );
            }
            if (savedProjectInfo.interviewQuestionList) {
              setInterviewQuestionList(savedProjectInfo.interviewQuestionList);
            }
            if (savedProjectInfo.customTheoryData) {
              setCustomTheoryData(savedProjectInfo.customTheoryData);
            } else {
              setCustomTheoryData([]);
            }

            let availablePersonas = [];
            let findCountPersonas = [];
            setFindPersonas([]);
            // 초기 페르소나 데이터 로드
            for (const category of Object.values(
              savedProjectInfo.businessAnalysis.category
            )) {
              const response = await axios.post(
                "https://wishresearch.kr/person/findPersonapreSet",
                { target: category },
                axiosConfig
              );

              response.data.forEach((newPersona) => {
                // 이미 필터링된 페르소나는 제외
                const isAlreadyFiltered = filteredProjectList.some(
                  (filtered) => filtered.persona_id === newPersona.persona_id
                );

                if (
                  !isAlreadyFiltered &&
                  !availablePersonas.some(
                    (p) => p.persona_id === newPersona.persona_id
                  )
                ) {
                  availablePersonas.push(newPersona);
                }
                if (
                  !findCountPersonas.some(
                    (p) => p.persona_id === newPersona.persona_id
                  )
                ) {
                  findCountPersonas.push(newPersona);
                }
              });
            }
            setFindPersonas(findCountPersonas);

            // businessPersonaList에서 고유한 persona_type 추출
            const uniqueTypes = [
              ...new Set(
                savedProjectInfo.businessPersonaList.map(
                  (persona) => persona.persona_type
                )
              ),
            ];

            // 추출된 타입들을 기반으로 selectedTypes 구성
            const typesToAdd = unselectedTypes
              .filter((type) => uniqueTypes.includes(type.label))
              .map((type) => ({
                id: type.id,
                label: type.label,
                type: type.type,
                count: type.count,
                index: type.index,
              }));
            // selectedTypes와 visibleSelectedTypes 업데이트
            setSelectedTypes(typesToAdd);
            setVisibleSelectedTypes(typesToAdd);

            // unselectedTypes에서 선택된 타입들 제거
            setUnselectedTypes((prev) => {
              const filtered = prev.filter((type) => {
                const isTypeSelected = uniqueTypes.includes(type.label);
                return !isTypeSelected;
              });
              return filtered;
            });
            // displayedPersonas 업데이트
            setDisplayedPersonas(savedProjectInfo.businessPersonaList);

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
                "https://wishresearch.kr/person/findPersonapreSet",
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

            let personfindList = {
              selected: [],
              unselected: unselectedPersonas,
            };
            setPersonaList(personfindList);
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
        }
      }
    };

    loadProject();
  }, [projectId, projectLoadButtonState, navigate]);

  const loadPersonaWithFilter = async (isInitial = true) => {
    try {
      //초기 로딩인 경우에만 전체 로딩 상태 설정
      if (isInitial) {
        setIsLoading(true);
      } else {
        setIsLoadingDaily(true);
        setIsLoadingMore(true);
      }

      let availablePersonas = [];
      let findCountPersonas = [];
      setFindPersonas([]);

      // 초기 페르소나 데이터 로드
      for (const category of Object.values(businessAnalysis.category)) {
        const response = await axios.post(
          "https://wishresearch.kr/person/findPersonapreSet",
          { target: category },
          axiosConfig
        );
        response.data.forEach((newPersona) => {
          // 이미 필터링된 페르소나는 제외
          const isAlreadyFiltered = filteredProjectList.some(
            (filtered) => filtered.persona_id === newPersona.persona_id
          );

          if (
            !isAlreadyFiltered &&
            !availablePersonas.some(
              (p) => p.persona_id === newPersona.persona_id
            )
          ) {
            availablePersonas.push(newPersona);
          }
          if (
            !findCountPersonas.some(
              (p) => p.persona_id === newPersona.persona_id
            )
          ) {
            findCountPersonas.push(newPersona);
          }
        });
      }
      setFindPersonas(findCountPersonas);

      // 초기 로드시 3번(9개), 더보기 클릭시 1번(3개) 필터링
      const filteringCount = isInitial ? 1 : 1;
      let filteredPersonas = isInitial ? [] : [...filteredProjectList]; // 기존 리스트 유지

      // let filteredPersonas = [];
      let filterResponse = null;

      // 3번의 필터링 수행
      // for (let i = 0; i < 3 && availablePersonas.length > 0; i++) {
      for (let i = 0; i < filteringCount && availablePersonas.length > 0; i++) {
        filterResponse = await InterviewXInterviewReportPersonaFilter(
          {
            business_idea: businessAnalysis.title,
            business_analysis_data: businessAnalysis,
            persona_data: availablePersonas,
          },
          isLoggedIn
        );

        let retryCount = 0;
        const maxRetries = 10;

        while (
          retryCount < maxRetries &&
          (!filterResponse?.response?.persona_1?.persona_filter ||
            !filterResponse?.response?.persona_2?.persona_filter ||
            !filterResponse?.response?.persona_3?.persona_filter ||
            !filterResponse?.response?.persona_1?.persona_reason ||
            !filterResponse?.response?.persona_2?.persona_reason ||
            !filterResponse?.response?.persona_3?.persona_reason ||
            !Array.isArray(
              filterResponse?.response?.persona_1?.persona_keyword
            ) ||
            !Array.isArray(
              filterResponse?.response?.persona_2?.persona_keyword
            ) ||
            !Array.isArray(
              filterResponse?.response?.persona_3?.persona_keyword
            ) ||
            filterResponse?.response?.persona_1?.persona_keyword?.length < 3 ||
            filterResponse?.response?.persona_2?.persona_keyword?.length < 3 ||
            filterResponse?.response?.persona_3?.persona_keyword?.length < 3)
        ) {
          filterResponse = await InterviewXInterviewReportPersonaFilter(
            {
              business_idea: businessAnalysis.title,
              business_analysis_data: businessAnalysis,
              persona_data: availablePersonas,
            },
            isLoggedIn
          );
          retryCount++;
        }

        if (retryCount >= maxRetries) {
          setShowErrorPopup(true);
          return;
        }

        // 필터된 페르소나 추가
        if (filterResponse && filterResponse.response) {
          const {
            persona_1,
            persona_2,
            persona_3,
            persona_4,
            persona_5,
            persona_6,
            persona_7,
            persona_8,
            persona_9,
          } = filterResponse.response;

          // 유효한 페르소나 응답들을 배열로 구성
          const validPersonas = [
            persona_1,
            persona_2,
            persona_3,
            persona_4,
            persona_5,
            persona_6,
            persona_7,
            persona_8,
            persona_9,
          ]
            .filter((p) => {
              return p && p.persona_filter;
            })
            .map((p) => {
              // availablePersonas에서 일치하는 페르소나 찾기
              const matchingPersona = availablePersonas.find(
                (available) => available.persona_id === p.persona_filter
              );

              if (matchingPersona) {
                // 기존 페르소나 정보에 persona_keyword 추가
                return {
                  ...matchingPersona,
                  persona_keyword: p.persona_keyword,
                  reason: p.persona_reason,
                };
              }
              return null;
            })
            .filter(Boolean); // null 값 제거

          // 필터된 페르소나 추가
          filteredPersonas.push(...validPersonas);

          // 다음 필터링을 위해 사용되지 않은 페르소나만 남김
          availablePersonas = availablePersonas.filter(
            (availablePersona) =>
              !filteredPersonas.some(
                (filteredPersona) =>
                  filteredPersona.persona_id === availablePersona.persona_id
              )
          );
        }
      }

      // 필터된 페르소나를 상태에 저장
      setFilteredProjectList(filteredPersonas);
      setHasMorePersonas(availablePersonas.length > 0);

      await updateProjectOnServer(
        projectId,
        {
          personaList: filteredPersonas.length,
          filteredPersonaList: filteredPersonas,
        },
        isLoggedIn
      );

      setPersonaButtonState2(0);
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowErrorPopup(true);
            break;
          case 504:
            if (regenerateCount >= 6) {
              setShowErrorPopup(true);
            } else {
              // setShowRegenerateButton(true);
              // setRegenerateCount((prev) => prev + 1);
              setShowErrorPopup(true);
            }
            break;
          default:
            setShowErrorPopup(true);
            break;
        }
      }
    } finally {
      if (isInitial) {
        setIsLoading(false);
        setIsLoadingDaily(false);
      } else {
        setIsLoadingMore(false);
        setIsLoadingDaily(false);
      }
    }
  };

  // 초기 로딩 (9개)
  useEffect(() => {
    if (personaButtonState2) {
      loadPersonaWithFilter(true);
    }
  }, [personaButtonState2]);

  // 더보기 버튼 핸들러
  const handleLoadMore = () => {
    loadPersonaWithFilter(false);
  };

  const loadBusinessPersona = async (personaType) => {
    try {
      setIsLoadingBusiness(true);
      setIsLoadingMore(true);
      setCurrentLoadingType(personaType); // 현재 로딩 중인 타입 설정
      // 페르소나 타입이 이미 로드되었는지 확인
      //반복문으로 전체 페르소나 조회 및 추가
      const existingPersonas = allBusinessPersonas?.filter(
        (p) => p.persona_type === personaType.label
      );
      if (existingPersonas.length > 0) {
        // 이미 존재하는 페르소나들을 UI에 업데이트
        setDisplayedPersonas((prevDisplayed) => {
          // 중복 제거를 위해 Set 사용
          const uniquePersonas = new Set([
            ...prevDisplayed,
            ...existingPersonas,
          ]);
          return Array.from(uniquePersonas);
        });
        setIsLoadingMore(false);
        return;
      }

      const requestData = {
        business_idea: businessAnalysis.title,
        business_analysis_data: businessAnalysis,
        request_persona_list: allBusinessPersonas,
        persona_type: personaType.label,
      };

      // Validation logic
      if (
        !requestData.business_idea ||
        !requestData.business_analysis_data ||
        !requestData.persona_type
      ) {
        setShowErrorPopup(true);
        return; // Exit the function if validation fails
      }

      const result = await InterviewXPersonaRequestType(
        requestData,
        isLoggedIn
      );

      if (result?.response?.persona_spectrum) {
        const newPersonas = result.response.persona_spectrum.map(
          (p) => Object.values(p)[0]
        );

        const updatedList = [...businessPersonaList, ...newPersonas]; // 누적된 리스트
        // setBusinessPersonaList(updatedList);
        // console.log("businessPersonaList:", businessPersonaList);
        // 기존 상태에 새로운 페르소나를 추가
        // setBusinessPersonaList(updatedList);

        allBusinessPersonas.push(...updatedList);
        setDisplayedPersonas((prevDisplayed) => [
          ...prevDisplayed,
          ...newPersonas,
        ]);

        // updateResponse 변수를 선언하고 값을 할당합니다.
        await updateProjectOnServer(
          projectId,
          {
            businessPersonaList: allBusinessPersonas,
          },
          isLoggedIn
        );

        setPersonaButtonState2(0);
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
            } else {
              // setShowRegenerateButton(true);
              // setRegenerateCount((prev) => prev + 1);
              setShowErrorPopup(true);
            }
            break;
          default:
            setShowErrorPopup(true);
            break;
        }
      } else {
        setShowErrorPopup(true);
      }
    } finally {
      setIsLoadingBusiness(false);
      setIsLoadingMore(false); // End loading for the current type
      setCurrentLoadingType(null); // 로딩 완료 시 초기화
    }
  };

  useEffect(() => {
    if (
      activeTab === "business" &&
      activeTabTlick &&
      selectedTypes.length < 4 &&
      allBusinessPersonas.length === 0
    ) {
      setActiveTabTlick(false);

      // 기존 데이터 초기화
      setPersonaList((prevState) => ({
        ...prevState,
        unselected: [],
      }));

      // 상위 4개 타입만 필터링
      const topFourTypes = unselectedTypes.filter((type, index) => index < 4);

      // selectedTypes 업데이트
      setSelectedTypes(
        topFourTypes.map((type) => ({
          id: type.id,
          label: type.label,
          type: type.type,
          count: type.count,
          wasSelected: false,
        }))
      );

      // 선택한 유형을 선택하지 않은 유형 목록에서 제거
      topFourTypes.forEach((type) => {
        setUnselectedTypes((prevUnselected) =>
          prevUnselected.filter(
            (unselectedType) => unselectedType.id !== type.id
          )
        );
      });

      setVisibleSelectedTypes(topFourTypes); // 선택된 유형을 visibleSelectedTypes에 설정

      // 각 타입별로 순차적으로 페르소나 요청
      const loadTopFourTypes = async () => {
        for (let i = 0; i < topFourTypes.length; i++) {
          const personaType = topFourTypes[i];
          await loadBusinessPersona(personaType);
        }
      };

      loadTopFourTypes();
    }
  }, [activeTab]);

  const handleTypeToggle = async (typeId, isSelected) => {
    if (isSelected) {
      // 선택 해제: 선택된 유형에서 제거하고 선택하지 않은 유형으로 이동
      setSelectedTypes((prev) => {
        const updatedSelected = prev.filter((type) => type.id !== typeId);

        return updatedSelected;
      });

      // visibleSelectedTypes에서도 제거
      setVisibleSelectedTypes((prev) =>
        prev.filter((type) => type.id !== typeId)
      );

      // 제거된 타입을 unselectedTypes에 추가 (count 정보와 wasSelected 플래그 포함)
      const typeToAddBack = selectedTypes.find((type) => type.id === typeId);
      if (typeToAddBack) {
        setUnselectedTypes((prevUnselected) => {
          if (!prevUnselected.some((type) => type.id === typeId)) {
            const updatedUnselected = [
              ...prevUnselected,
              { ...typeToAddBack, wasSelected: true },
            ];
            return updatedUnselected.sort((a, b) => a.index - b.index);
          }
          return prevUnselected;
        });
      }
    } else {
      // 선택: visibleSelectedTypes에는 추가하지 않고 selectedTypes에만 추가
      const typeToAdd = unselectedTypes.find((type) => type.id === typeId);
      if (typeToAdd) {
        setSelectedTypes((prev) => {
          if (!prev.some((type) => type.id === typeId)) {
            return [...prev, typeToAdd].sort((a, b) => a.index - b.index);
          }
          return prev;
        });
      }
    }
  };
  // 선택 유형 보기 버튼 클릭 핸들러 수정
  const handleTypeSelection = async () => {
    setIsLoadingMore(true);
    setShowTypeList(false); // 리스트를 바로 숨김
    setVisibleSelectedTypes(selectedTypes.sort((a, b) => a.index - b.index));

    // 선택된 타입들을 unselectedTypes에서 제거
    setUnselectedTypes((prev) =>
      prev.filter(
        (type) => !selectedTypes.some((selected) => selected.id === type.id)
      )
    );

    // 기존 displayedPersonas 초기화
    setDisplayedPersonas([]);

    // 선택된 타입들에 대한 페르소나 로드
    for (const type of selectedTypes) {
      await loadBusinessPersona(type);
    }

    setIsLoadingMore(false);
  };

  const handleStartInterview = () => {
    // 선택된 페르소나들을 selected에 반영
    setPersonaList((prev) => ({
      selected: [],
      unselected: filteredProjectList,
    }));

    setPersonaStep(3);
    setIsPersonaAccessible(true);
    // navigate(`/Persona/3`, { replace: true });
    navigate(`/Persona3Single`, { replace: true });
    // navigate(`/Persona3Multiple`, { replace: true });
  };

  const [showTooltip, setShowTooltip] = useState(false);

  const handleCustomizeRequest = () => {
    setShowCustomizePopup(true);
  };

  const handleCustomizePopupClose = () => {
    setCustomPersonaForm({
      description: "",
      purpose: "",
      quantity: 1,
      gender: "",
      ageGroups: [],
      additionalInfo: "",
    });
    setActiveTabIndex(0);
    setIgnoreOcean(false);
    setShowCustomizePopup(false);
  };
  // const handleCustomizePopupConfirm = () => {
  //   submitCustomPersonaRequest();
  //   setShowCustomizePopup(false);
  // };

  const handleCustomizePopupConfirm = async () => {
    try {
      const creditPayload = {
        mount: creditRequestCustomPersona,
      };

      const creditResponse = await UserCreditCheck(creditPayload, isLoggedIn);

      if (creditResponse?.state !== "use") {
        setShowCreditPopup(true);
        return;
      }

      // 만약 creditResponse.state가 "use"라면 아래 payload 형식으로 API 호출
      const creditUsePayload = {
        title: businessAnalysis.title,
        service_type: "맞춤 페르소나",
        target: "",
        state: "use",
        mount: creditRequestCustomPersona,
      };

      await UserCreditUse(creditUsePayload, isLoggedIn);

      // 크레딧 사용 후 사용자 정보 새로고침
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        const userCreditValue = await UserCreditInfo(isLoggedIn);
        setUserCredits(userCreditValue);
      }

      // 이후 커스텀 페르소나 요청 진행 (예: 요청 API 호출)
      await submitCustomPersonaRequest();
      setActiveTabIndex(0);

      setIgnoreOcean(false);
      // 필드에 입력된 데이터 초기화
      setCustomPersonaForm({
        description: "",
        purpose: "",
        quantity: 1,
        gender: "",
        ageGroups: [],
        additionalInfo: "",
      });

      setShowCustomizePopup(false);
    } catch (error) {
      setShowCreditPopup(true);
    }
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
      ageGroups: [ageGroup], // 단일 선택만 가능하도록 배열에 하나의 값만 저장
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
        requestTimeStamp: Date.now(),
        personaRequest: {
          preferences: {
            gender: customPersonaForm.gender,
            ageGroups: customPersonaForm.ageGroups,
          },
          additionalInfo: customPersonaForm.additionalInfo,
          ocean: {
            openness: oceanValues.openness,
            conscientiousness: oceanValues.conscientiousness,
            extraversion: oceanValues.extraversion,
            agreeableness: oceanValues.agreeableness,
            neuroticism: oceanValues.neuroticism,
          },
          ignoreOcean: ignoreOcean,
          status: "request",
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
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowErrorPopup(true);
            break;
          case 504:
            // 재생성하기
            setShowErrorPopup(true);
            break;
          default:
            setShowErrorPopup(true);
            break;
        }
      }
    }
  };

  // 폼 유효성 검사 함수 수정
  const isFormValid = () => {
    if (activeTabIndex === 0) {
      // 첫 번째 탭(필수정보)에서는 성별과 연령대 선택이 필수
      const isGenderSelected = customPersonaForm.gender !== "";
      const isAgeGroupSelected = customPersonaForm.ageGroups.length > 0;

      return isGenderSelected && isAgeGroupSelected;
    } else {
      // 두 번째 탭(OCEAN 정보)에서는 모든 OCEAN 값이 선택되어 있거나 랜덤 생성이 체크되어 있어야 함
      if (ignoreOcean) {
        return true;
      }

      // 모든 OCEAN 값이 0 또는 1인지 확인
      const isAllOceanValuesSelected = Object.values(oceanValues).every(
        (value) => value === 0 || value === 1 || value === "0" || value === "1"
      );

      return isAllOceanValuesSelected;
    }
  };

  // 마우스 드래그 스크롤 핸들러 추가
  const handleMouseDrag = (e) => {
    const slider = e.currentTarget;
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.style.cursor = "grabbing";
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.style.cursor = "grab";
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.style.cursor = "grab";
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // 스크롤 속도 조절
      slider.scrollLeft = scrollLeft - walk;
    });
  };

  const handleTypeToggle222 = async (typeId, isSelected) => {
    if (isSelected) {
      // 선택 해제: 선택된 유형에서 제거하고 선택하지 않은 유형으로 이동
      setSelectedTypes((prev) => {
        const updatedSelected = prev.filter((type) => type.id !== typeId);

        return updatedSelected;
      });

      // visibleSelectedTypes에서도 제거
      setVisibleSelectedTypes((prev) =>
        prev.filter((type) => type.id !== typeId)
      );

      // 제거된 타입을 unselectedTypes에 추가 (count 정보와 wasSelected 플래그 포함)
      const typeToAddBack = selectedTypes.find((type) => type.id === typeId);
      if (typeToAddBack) {
        setUnselectedTypes((prevUnselected) => {
          if (!prevUnselected.some((type) => type.id === typeId)) {
            const updatedUnselected = [
              ...prevUnselected,
              { ...typeToAddBack, wasSelected: true },
            ];
            return updatedUnselected.sort((a, b) => a.index - b.index);
          }
          return prevUnselected;
        });
      }
    } else {
      // 선택: visibleSelectedTypes에는 추가하지 않고 selectedTypes에만 추가
      const typeToAdd = unselectedTypes.find((type) => type.id === typeId);
      if (typeToAdd) {
        setSelectedTypes((prev) => {
          if (!prev.some((type) => type.id === typeId)) {
            return [...prev, typeToAdd].sort((a, b) => a.index - b.index);
          }
          return prev;
        });
      }
    }
  };

  const handleRemoveType = (typeId) => {
    // visibleSelectedTypes에서 제거할 타입 찾기
    const typeToRemove = visibleSelectedTypes.find(
      (type) => type.id === typeId
    );

    if (typeToRemove) {
      // visibleSelectedTypes에서 제거 (index로 정렬)
      setVisibleSelectedTypes((prev) => {
        const filtered = prev.filter((type) => type.id !== typeId);
        return filtered.sort((a, b) => a.index - b.index);
      });

      // selectedTypes에서도 제거 (index로 정렬)
      setSelectedTypes((prev) => {
        const filtered = prev.filter((type) => type.id !== typeId);
        return filtered.sort((a, b) => a.index - b.index);
      });

      // unselectedTypes에 추가 (원래 순서 유지)
      setUnselectedTypes((prev) => {
        const updatedUnselected = [
          ...prev,
          { ...typeToRemove, wasSelected: true },
        ];

        // originalUnselectedTypes의 순서를 기준으로 정렬
        return updatedUnselected.sort((a, b) => {
          const aIndex = originalUnselectedTypes.findIndex(
            (type) => type.id === a.id
          );
          const bIndex = originalUnselectedTypes.findIndex(
            (type) => type.id === b.id
          );
          return aIndex - bIndex;
        });
      });

      // displayedPersonas에서 해당 타입의 페르소나 제거
      setDisplayedPersonas((prev) => {
        const filteredPersonas = prev.filter(
          (persona) => persona.persona_type !== typeToRemove.label
        );
        return filteredPersonas;
      });
    }
  };
  // 총 인원수를 계산하는 함수 추가
  const getTotalCount = () => {
    return selectedTypes.reduce((sum, type) => sum + type.count, 0);
  };

  // 스크롤 위치에 따른 그라데이션 상태 관리
  const [showLeftGradient, setShowLeftGradient] = useState(false); // 왼쪽은 처음에 안보임
  const [showRightGradient, setShowRightGradient] = useState(false); // 오른쪽은 처음에 보임

  // 스크롤 이벤트 핸들러
  const handleScroll = (e) => {
    const container = e.target;
    const isAtStart = container.scrollLeft <= 0;
    const isAtEnd =
      container.scrollLeft + container.offsetWidth >= container.scrollWidth;

    setShowLeftGradient(!isAtStart);
    setShowRightGradient(!isAtEnd);
  };

  // 일상/비즈니스 페르소나 카운트를 구분하여 계산하는 함수
  // const getPersonaCount = (type) => {
  //   if (!personaList || !personaList.unselected) return 0;
  //   return filteredProjectList.filter(persona => persona.type === type).length;
  // };

  const getPersonaCount = (tabType) => {
    if (!filteredProjectList) return 0;

    // daily 탭일 때는 filteredProjectList의 길이 반환
    if (tabType === "daily") {
      return filteredProjectList.length;
    }

    // business 탭일 때는 personaList.unselected의 길이 반환
    if (tabType === "business") {
      return customPersonaList?.length + displayedPersonas?.length || 0;
    }

    return 0;
  };

  // "유형 더보기" 버튼 클릭 핸들러
  const handleShowTypeListToggle = () => {
    setShowTypeList((prev) => !prev); // 상태 토글
  };

  // 체크박스 상태 관리를 위한 state 추가
  const [ignoreOcean, setIgnoreOcean] = useState(false);

  // 체크박스 핸들러 추가
  const handleIgnoreOcean = (e) => {
    setIgnoreOcean(e.target.checked);
  };

  const reloadBusinessPersonaList = async () => {
    try {
      const savedProjectInfo = await getProjectByIdFromIndexedDB(
        projectId,
        projectLoadButtonState
      );
      if (savedProjectInfo?.businessPersonaList) {
        setDisplayedPersonas(
          savedProjectInfo.businessPersonaList.filter((persona) =>
            selectedTypes.some(
              (selectedType) => selectedType.label === persona.persona_type
            )
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
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
              {/* {showRegenerateButton ? ( */}
              {isLoading ? (
                <CardWrap>
                  <AtomPersonaLoader message="페르소나를 추천하기 위해 분석하고 있어요" />
                </CardWrap>
              ) : (
                // : showRegenerateButton ? (
                //   <CardWrap>
                //     <MoleculeRecreate Large onRegenerate={reloadPersona} />
                //   </CardWrap>
                // )
                <CardWrap>
                  <>
                    <BoxWrap>
                      <img src={images.BgUserChatDots} alt="" />
                      <Body3 color="gray700">
                        바로 인터뷰를 원하시면 라이브 페르소나와 함께하세요!
                        <br />
                        맞춤형 비즈니스 대화가 필요하시다면 커스텀 페르소나를
                        요청해 보세요.{" "}
                      </Body3>
                    </BoxWrap>

                    <CustomizePersona>
                      <Tabheader>
                        <TabWrapType3>
                          <TabButtonType3
                            isActive={activeTab === "daily"}
                            onClick={() => {
                              setActiveTab("daily");
                              reloadBusinessPersonaList();
                            }}
                          >
                            라이브 페르소나 ({getPersonaCount("daily")})
                          </TabButtonType3>
                          <TabButtonType3
                            isActive={activeTab === "business"}
                            onClick={() => {
                              setActiveTab("business");
                              reloadBusinessPersonaList();
                            }}
                          >
                            커스텀 페르소나 ({getPersonaCount("business")})
                          </TabButtonType3>
                        </TabWrapType3>

                        <FillterWrap>
                          <ViewType>
                            <TypeButton
                              List
                              active={viewType === "list"}
                              onClick={() => handleViewTypeChange("list")}
                            >
                              리스트
                            </TypeButton>
                            <TypeButton
                              Card
                              active={viewType === "card"}
                              onClick={() => handleViewTypeChange("card")}
                            >
                              카드
                            </TypeButton>
                          </ViewType>

                          <Button
                            Large
                            PrimaryLightest
                            Fill
                            onClick={handleCustomizeRequest}
                          >
                            <img src={images.PlusPrimary} alt="" />
                            맞춤 페르소나
                          </Button>
                        </FillterWrap>
                      </Tabheader>

                      {activeTab === "daily" ? (
                        <ContentSection>
                          <>
                            <CardGroupWrap
                              column={viewType === "list"}
                              style={{ marginBottom: "0" }}
                            >
                              {filteredProjectList.map((persona, index) => (
                                <MoleculePersonaCard
                                  key={index}
                                  title={persona.persona_view}
                                  keywords={persona.persona_keyword}
                                  gender={persona.gender}
                                  age={persona.age}
                                  job={persona.job}
                                  isRequest={false}
                                  personaData={persona}
                                  isBasic={true}
                                  onSelect={(isSelected) =>
                                    handlePersonaSelect(persona, isSelected)
                                  }
                                  currentSelection={selectedPersonas.length}
                                  viewType={viewType}
                                  isExist={currentRequestedPersona.some(
                                    (personas) =>
                                      personas.persona === persona.persona
                                  )}
                                />
                              ))}
                              {isLoadingMore && isLoadingDaily && (
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <AtomPersonaLoader message="라이브 페르소나를 추천하기 위해 분석하고 있어요" />
                                </div>
                              )}
                            </CardGroupWrap>
                            {hasMorePersonas &&
                              !isLoading &&
                              // !isLoadingMore &&
                              !isLoadingDaily &&
                              !(
                                filteredProjectList.length >=
                                findPersonas.length
                              ) && (
                                <LoadMoreButton onClick={handleLoadMore}>
                                  <Body3 color="gray700">
                                    더보기 ({filteredProjectList.length}/
                                    {findPersonas.length})
                                  </Body3>
                                </LoadMoreButton>
                              )}
                          </>
                        </ContentSection>
                      ) : (
                        <ContentSection>
                          <CategoryView
                            // isLoadingMore와 isLoadingBusiness가 동시에 true일 때, pointer-events를 비활성화하고 opacity를 조절하여 UI가 비활성화된 것처럼 보이게 합니다.
                            style={{
                              pointerEvents:
                                isLoadingMore && isLoadingBusiness
                                  ? "none"
                                  : "auto",
                              opacity:
                                isLoadingMore && isLoadingBusiness ? 0.6 : 1,
                            }}
                            showLeftGradient={showLeftGradient}
                            showRightGradient={showRightGradient}
                          >
                            <ChoiceWrap
                              onMouseDown={handleMouseDrag}
                              onScroll={handleScroll}
                            >
                              {visibleSelectedTypes.length > 0 ? (
                                visibleSelectedTypes.map((type) => (
                                  <Choice
                                    key={type.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // 현재 버튼의 위치와 크기 정보
                                      const rect =
                                        e.currentTarget.getBoundingClientRect();
                                      // 버튼 왼쪽 끝에서부터 클릭 지점까지의 거리
                                      const clickX = e.clientX - rect.left;
                                      // pseudo-element로 구현된 x 아이콘이 오른쪽에 있으므로,
                                      // 버튼의 오른쪽 20px 정도 영역을 x 아이콘 영역으로 가정
                                      if (clickX > rect.width - 20) {
                                        handleRemoveType(type.id);
                                      }
                                    }}
                                  >
                                    {type.label}
                                  </Choice>
                                ))
                              ) : (
                                <Sub2_1
                                  color="gray500"
                                  style={{ padding: "6px 10px" }}
                                >
                                  페르소나 유형을 선택해 주세요.
                                </Sub2_1>
                              )}
                            </ChoiceWrap>

                            <TypeMore style={{ zIndex: 10 }}>
                              <Personnel>
                                {selectedTypes.length > 0
                                  ? `${selectedTypes.length}개`
                                  : "0개"}
                              </Personnel>
                              <MoreButton
                                onClick={() => setShowTypeList(!showTypeList)}
                              >
                                유형 더보기
                                <images.ChevronDown
                                  width="24"
                                  height="24"
                                  color={palette.gray700}
                                />
                              </MoreButton>

                              {showTypeList && (
                                <TypeList show={showTypeList}>
                                  <TypeItem>
                                    <p>
                                      선택된 유형 ({visibleSelectedTypes.length}
                                      )
                                    </p>
                                    <TypeItemList style={{ padding: "0 12px" }}>
                                      {visibleSelectedTypes.map((type) => (
                                        <li key={type.id}>
                                          <CheckBox Round>
                                            <input
                                              type="checkbox"
                                              id={type.id}
                                              checked={true}
                                              onChange={() =>
                                                handleTypeToggle(type.id, true)
                                              }
                                            />
                                            <label htmlFor={type.id}>
                                              {type.label}
                                            </label>
                                          </CheckBox>
                                          {/* <span>{type.count}명</span> */}
                                        </li>
                                      ))}
                                    </TypeItemList>
                                  </TypeItem>

                                  <TypeItem>
                                    <p>
                                      선택하지 않은 유형 (
                                      {unselectedTypes.length})<span>?</span>
                                      <Caption2 color="white">
                                        페르소나 생성 소요
                                        <br />
                                        시간이 발생됩니다.
                                      </Caption2>
                                    </p>
                                    <TypeItemList>
                                      {unselectedTypes.map((type) => {
                                        const isTypeSelected =
                                          selectedTypes.some(
                                            (selectedType) =>
                                              selectedType.id === type.id
                                          );
                                        return (
                                          <TypeListItem
                                            key={type.id}
                                            isSelected={isTypeSelected}
                                          >
                                            <CheckBox Round>
                                              <input
                                                type="checkbox"
                                                id={type.id}
                                                checked={isTypeSelected}
                                                // onChange={() => { /* 아무것도 하지 않거나 다르게 처리 */ }}
                                                onChange={() =>
                                                  handleTypeToggle(
                                                    type.id,
                                                    isTypeSelected
                                                  )
                                                }
                                              />
                                              <label htmlFor={type.id}>
                                                {type.label}
                                              </label>
                                            </CheckBox>
                                            {type.wasSelected && (
                                              // <span>{type.count}명</span>
                                              <span>생성 완료</span>
                                            )}
                                          </TypeListItem>
                                        );
                                      })}
                                    </TypeItemList>

                                    <Button
                                      ExLarge
                                      PrimaryLightest
                                      Fill
                                      style={{ margin: "20px 12px 0" }}
                                      onClick={async () => {
                                        setShowTypeList(false); // 리스트를 바로 숨김
                                        reloadBusinessPersonaList();
                                        setIsLoadingMore(true); // 로딩 상태 시작
                                        await handleTypeSelection(); // 선택된 유형 처리
                                        setIsLoadingMore(false); // 로딩 상태 종료
                                      }}
                                    >
                                      선택 유형 보기
                                    </Button>
                                  </TypeItem>
                                </TypeList>
                              )}
                            </TypeMore>
                          </CategoryView>

                          <CardGroupWrap
                            column={viewType === "list"}
                            style={{ marginBottom: "0" }}
                          >
                            {customPersonaList.map((persona, index) => (
                              <MoleculeCustomPersonaCard
                                key={index}
                                title={persona.persona}
                                keywords={[...persona.keyword]}
                                isRequest={true}
                                personaData={persona}
                                viewType={viewType}
                              />
                            ))}

                            {displayedPersonas.map((persona, index) => (
                              <MoleculeBussinessPersonaCard
                                key={index}
                                title={persona.persona}
                                persona_type={persona.persona_type}
                                keywords={[...persona.keyword]}
                                gender={persona.gender}
                                age={persona.age}
                                job={persona.job}
                                isRequest={true}
                                personaData={persona}
                                isBasic={false} // 비즈니스페르소나랑 일상 페르소나 구분
                                eventState={eventState}
                                eventTitle={eventTitle}
                                trialState={trialState}
                                creditRequestBusinessPersona={
                                  creditRequestBusinessPersona
                                }
                                onSelect={(isSelected) =>
                                  handlePersonaSelect(persona, isSelected)
                                }
                                currentSelection={selectedPersonas.length}
                                viewType={viewType}
                              />
                            ))}
                          </CardGroupWrap>
                          {isLoadingMore && isLoadingBusiness && (
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <AtomPersonaLoader
                                message={`${
                                  currentLoadingType?.label ||
                                  "비즈니스 페르소나"
                                }를 추천하기 위해 분석하고 있어요`}
                              />
                            </div>
                          )}
                        </ContentSection>
                      )}

                      {!personaButtonState2 && (
                        <BottomBar
                          Responsive
                          Round
                          onClick={handleStartInterview}
                        >
                          <div className="responsive">
                            <Body2 color="gray800">인터뷰 진행</Body2>
                            <Body3 color="gray800">
                              💬 지금 바로 인터뷰가 가능한{" "}
                              {filteredProjectList.length}명의 페르소나가
                              기다리고 있어요
                            </Body3>
                          </div>

                          <span>
                            <images.ChevronRight
                              width="22"
                              height="22"
                              color={palette.white}
                            />
                          </span>
                        </BottomBar>
                      )}
                    </CustomizePersona>
                  </>
                </CardWrap>
              )}
            </MainSection>
          </AnalysisWrap>
        </MainContent>
      </ContentsWrap>

      {/* 크레딧 소진팝업 */}
      {/* <PopupWrap
        Warning
        title="크레딧이 모두 소진되었습니다"
        message={
          <>
            매월 1일 (서비스)크레딧이 충전됩니다<br />
            (베타서비스) 종료시 크레딧이 자동 소멸됩니다
          </>
        }
        buttonType="Outline"
        closeText="확인"
        isModal={false}
      /> */}

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
          title="📝 맞춤 페르소나 커스터마이징"
          buttonType="Fill"
          confirmText={activeTabIndex === 0 ? "다음" : "맞춤 페르소나 모집하기"}
          isModal={true}
          isFormValid={isFormValid()}
          onCancel={handleCustomizePopupClose}
          onConfirm={() => {
            if (activeTabIndex === 0) {
              setActiveTabIndex(1);
            } else {
              handleCustomizePopupConfirm();
            }
          }}
          showTabs={true}
          tabs={["필수정보", "OCEAN 정보"]}
          onTabChange={(index) => {
            // 필수정보 탭에서 OCEAN 탭으로 이동하려고 할 때 (index === 1)
            if (index === 1) {
              // 필수 입력값 검증
              const isGenderSelected = customPersonaForm.gender !== "";
              const isAgeGroupSelected = customPersonaForm.ageGroups.length > 0;

              // 필수 정보가 모두 입력되지 않았다면 탭 전환을 하지 않음
              if (!isGenderSelected || !isAgeGroupSelected) {
                return;
              }
            }
            // 필수 정보가 모두 입력되었거나, OCEAN 탭에서 필수정보 탭으로 이동할 때
            setActiveTabIndex(index);
          }}
          activeTab={activeTabIndex}
          eventState={eventState}
          eventTitle={eventTitle}
          trialState={trialState}
          creditRequestCustomPersona={creditRequestCustomPersona}
          body={
            <>
              {activeTabIndex === 0 && (
                <>
                  <div>
                    <PopupTitle2>
                      성별<span style={{ color: "red" }}>*</span>
                    </PopupTitle2>

                    <PopupContent>
                      <GenderRadioButton
                        id="gender1"
                        name="gender"
                        type="radio"
                        gender="남자"
                        icon={images.GenderMen}
                        checked={customPersonaForm.gender === "male"}
                        onChange={() =>
                          handleCustomPersonaChange("gender", "male")
                        }
                      />
                      <GenderRadioButton
                        id="gender2"
                        name="gender"
                        type="radio"
                        gender="여자"
                        icon={images.GenderWomen}
                        checked={customPersonaForm.gender === "female"}
                        onChange={() =>
                          handleCustomPersonaChange("gender", "female")
                        }
                      />
                    </PopupContent>
                  </div>

                  <div>
                    <PopupTitle2>
                      연령<span style={{ color: "red" }}>*</span>
                    </PopupTitle2>

                    <PopupContent>
                      <AgeGroup>
                        <div>
                          {["10s", "20s", "30s", "40s"].map((age, index) => (
                            <React.Fragment key={age}>
                              <input
                                type="radio" // checkbox에서 radio로 변경
                                id={`age${index + 1}`}
                                name="age" // 같은 name으로 그룹화
                                checked={customPersonaForm.ageGroups[0] === age} // 첫 번째(유일한) 값과 비교
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
                                type="radio" // checkbox에서 radio로 변경
                                id={`age${index + 5}`}
                                name="age" // 같은 name으로 그룹화
                                checked={customPersonaForm.ageGroups[0] === age} // 첫 번째(유일한) 값과 비교
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
                    </PopupContent>
                  </div>

                  <div>
                    <PopupTitle>
                      필수적으로 필요한 정보가 있다면, 알려주세요
                    </PopupTitle>

                    <PopupContent>
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
                    </PopupContent>
                  </div>
                </>
              )}

              {activeTabIndex === 1 && (
                <>
                  <div>
                    <BgBoxItem NoOutline style={{ marginBottom: "10px" }}>
                      <Sub3 color="gray500" align="left">
                        OCEAN이란?
                        <br />
                        성격 심리학에서 인간의 성격을 설명하는 다섯 요인
                        창의성(Openness), 성실성(Conscientiouseness),
                        외향성(Extraversion), 친화성(Agreeableness), 정서적
                        안정성(Neuroticism)을 평가하는 방법입니다.
                      </Sub3>
                    </BgBoxItem>

                    <PopupContent>
                      <OCEANRangeWrap>
                        <div>
                          <Body3 color="gray800">보수적</Body3>
                          <RangeSlider
                            type="range"
                            min="0"
                            max="1"
                            step="0.5"
                            value={oceanValues.openness}
                            onChange={(e) =>
                              handleOceanChange("openness", e.target.value)
                            }
                            disabled={ignoreOcean}
                            $ignored={ignoreOcean}
                          />
                          <Body3 color="gray800">개방적</Body3>
                        </div>
                        <div>
                          <Body3 color="gray800">즉흥적</Body3>
                          <RangeSlider
                            type="range"
                            min="0"
                            max="1"
                            step="0.5"
                            value={oceanValues.conscientiousness}
                            onChange={(e) =>
                              handleOceanChange(
                                "conscientiousness",
                                e.target.value
                              )
                            }
                            disabled={ignoreOcean}
                            $ignored={ignoreOcean}
                          />
                          <Body3 color="gray800">성실함</Body3>
                        </div>
                        <div>
                          <Body3 color="gray800">내향적</Body3>
                          <RangeSlider
                            type="range"
                            min="0"
                            max="1"
                            step="0.5"
                            value={oceanValues.extraversion}
                            onChange={(e) =>
                              handleOceanChange("extraversion", e.target.value)
                            }
                            disabled={ignoreOcean}
                            $ignored={ignoreOcean}
                          />
                          <Body3 color="gray800">외향적</Body3>
                        </div>
                        <div>
                          <Body3 color="gray800">독립적</Body3>
                          <RangeSlider
                            type="range"
                            min="0"
                            max="1"
                            step="0.5"
                            value={oceanValues.agreeableness}
                            onChange={(e) =>
                              handleOceanChange("agreeableness", e.target.value)
                            }
                            disabled={ignoreOcean}
                            $ignored={ignoreOcean}
                          />
                          <Body3 color="gray800">우호적</Body3>
                        </div>
                        <div>
                          <Body3 color="gray800">무던함</Body3>
                          <RangeSlider
                            type="range"
                            min="0"
                            max="1"
                            step="0.5"
                            value={oceanValues.neuroticism}
                            onChange={(e) =>
                              handleOceanChange("neuroticism", e.target.value)
                            }
                            disabled={ignoreOcean}
                            $ignored={ignoreOcean}
                          />
                          <Body3 color="gray800">신경적</Body3>
                        </div>
                      </OCEANRangeWrap>
                    </PopupContent>
                  </div>

                  <div style={{ marginTop: "12px", textAlign: "left" }}>
                    <CheckBox Fill>
                      <input
                        type="checkbox"
                        id="chk1"
                        style={{ display: "block" }}
                        checked={ignoreOcean}
                        onChange={handleIgnoreOcean}
                      />
                      <label htmlFor="chk1">
                        페르소나의 성격 유형을 랜덤으로 생성 하겠습니다.
                      </label>
                    </CheckBox>
                  </div>
                </>
              )}
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
      {isLoadingType && <div className="loading-bar">Loading...</div>}
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
          onCancel={() => setShowCreditPopup(false)}
          onConfirm={() => setShowCreditPopup(false)}
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

const LoadMoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  font-family: "Pretendard", "Poppins";
  margin: 20px auto;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.5s;

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
  }

  p:before {
    margin-bottom: 3px;
    content: "+ ";
  }

  &:hover,
  &:hover p {
    color: ${palette.primary};
  }
`;
