import { atom } from "jotai";

// 로그인 상태
export const EMAIL = atom("");
export const PASSWORD = atom("");
export const NEW_PASSWORD = atom("");
export const RE_PASSWORD = atom("");
export const IS_LOGGED_IN = atom(false);
export const LOGIN_SUCCESS = atom(null);
export const USER_INFO = atom({});

// 회원가입 상태
export const SIGN_UP_NAME = atom("");
export const SIGN_UP_EMAIL = atom("");
export const SIGN_UP_PASSWORD = atom("");
export const CONFIRM_PASSWORD = atom("");
export const SIGN_UP_ROLE = atom("user");
export const SIGN_UP_STATUS = atom("active");
export const USER_NAME = atom("");
export const USER_EMAIL = atom("");
export const USER_MEMBERSHIP = atom("Normal");
export const EDUCATION_STATE = atom(false);
export const ADMIN_STATE = atom(false);

// 사용자 데이터 상태
export const CURRENT_USER_STATUS = atom(null);
export const ERROR_STATUS = atom(""); // 에러 상태 추가
export const SUCCESS_STATUS = atom(""); // 성공 상태 추가
export const USER_CREDITS = atom({});

// 패널 선택 상태
export const SELECTED_COUNT = atom(0);
export const SELECTED_PANELS = atom(new Set()); // 선택된 패널의 ID 저장
export const SELECTED_ALL_PANELS = atom(false);

export const VIEW_PANEL_TYPE = atom(true); // true=카드, false=목록
export const TOTAL_PANEL_COUNT = atom(0);
export const SELECTED_PANEL_COUNT = atom(0);
export const FILTERD_PANEL_COUNT = atom(0); // 필터링된 패널 개수

// 패널 리스트
export const PANEL_LIST = atom([]);
export const PANEL_LIST_PAGE_COUNT = atom(1);
export const IS_ALL_PANELS_LOADED = atom(false); // 모든 패널을 불러와서 더이상 더보기할 패널이 없는지
export const IS_PANEL_NULL = atom(true);

// 검색어 상태
export const SEARCH_BEHABIORAL_TYPE = atom("");
export const SEARCH_UTILIZATION_TIME = atom("");
export const SEARCH_GENDER = atom([]);
export const SEARCH_AGE = atom([]);
export const SEARCH_MARRIAGE = atom([]);
export const SEARCH_CHILD_M = atom("");
export const SEARCH_CHILD_F = atom("");
export const SEARCH_TAG_1 = atom([]);
export const SEARCH_TAG_2 = atom([]);
export const SEARCH_TAG_3 = atom([]);
export const SEARCH_TAG_4 = atom([]);

// 행동타입이 필터에 걸려있을때 최초검색(0)인지 재검색(1)인지
// 재검색은 패널더보기, 칩삭제
export const IS_RE_SEARCH = atom(0);

// 행동타입값 5개 저장
export const PANEL_TOTAL_VALUE = atom([]);

/////////////////////////////////////////////////////////////////////////////////////////////////////

/* Expert Insight */

export const SELECTED_EXPERT_INDEX = atom("0");

// 사용자가 입력한 비즈니스 정보
export const INPUT_BUSINESS_INFO = atom("");

// 프롬프트 진입 비즈니스 분석
export const TITLE_OF_BUSINESS_INFORMATION = atom("");
export const MAIN_FEATURES_OF_BUSINESS_INFORMATION = atom([]);
export const MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION = atom([]);
export const BUSINESS_INFORMATION_TARGET_CUSTOMER = atom([]);

export const TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION = atom([]);
export const TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION = atom([]);
export const TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER = atom([]);

export const IS_EDITING_NOW = atom(false);

export const SELECTED_TAB_COPY = atom({
  key: "selectedTabCopy",
  default: {},
});

export const STRATEGY_REPORT_DATA = atom({});

export const ADDITIONAL_REPORT_DATA = atom([]);
export const CUSTOMER_ADDITIONAL_REPORT_DATA = atom([]);

/* -1: 검색으로 시작하기, 1: AI 전문가 선택해서 시작하기*/
export const APPROACH_PATH = atom(0);

export const SELECTED_ADDITIONAL_KEYWORD = atom([]);
export const SELECTED_CUSTOMER_ADDITIONAL_KEYWORD = atom([]);

export const QUESTION_LIST = atom({
  1: {
    방법론관련: [
      "우리 산업의 강점과 약점 파악하기", // input : SWOT방법론 기반 고객 산업의 강점과 약점 제시
      "스타와 캐시카우 찾기", // input : BCG모델기반 스타와 캐시카우 찾는 방법 제시
      "차별화 전략 세우기", // input : 차별화 전략 세우는 방법 제시
      "KPI 설정과 관리법", // input : KPI 설정과 관리법 제시
      "애자일로 전략 수정하기", // input : 애자일로 전략 수정 방법 제시
      "프로덕트-마켓 핏 확인", // input : 프로덕트-마켓 핏 확인 방법 제시
      "스타트업 비용 절감 팁", // input : 스타트업 비용 절감 팁 제시
    ],
    사례제시: [
      "혁신으로 성공한 전통 기업들", // input : 혁신으로 성공한 전통 기업 사례 제시
      "독보적 시장 지위 전략", // input : 독보적 시장 지위 전략 사례 제시
      "위기를 기회로 바꾼 사례", // input : 위기를 기회로 바꾼 사례 제시
      "틈새 시장 성공 스토리", // input : 틈새 시장 성공 스토리 사례 제시
      "변화에 대응한 스타트업", // input : 변화에 대응한 스타트업 사례 제시
    ],
    아이디어제공: [
      "우리 제품 기능 우선순위 설정 해보기", // input : 고객 제품 기능 우선순위 설정 해주기
      "새 수익 창출 기회 찾아보기", // input : 새 수익 창출 기회 찾아주기
      "파트너십 기회 발굴해보기", // input : 파트너십 기회 발굴 해주기
      "비즈니스 모델 혁신 방법 제안받기", // input : 비즈니스 모델 혁신 방법 제안해주기
      "제품 개선 아이디어 받아보기", // input : 제품 개선 아이디어 제안해주기
    ],
  },
  2: {
    방법론관련: [
      "타겟팅 제대로 하고 있을까?", // input : 적합한 타겟팅 방법 제시
      "4P 전략 업그레이드", // input : 4P 전략을 활용한 마케팅 전략 향상 방법 제시
      "콘텐츠로 브랜드 강화하기", // input : 콘텐츠 마케팅을 활용한 브랜드 인지도 향상 방법 제시
      "성과 중심 광고 캠페인", // input : 성과 기반 광고 캠페인 관리 팁 제시
      "맞춤형 마케팅 자동화", // input : 고객 여정에 맞춤 마케팅 자동화 설정 가이드 제시
      "소셜 미디어로 고객 참여", // input : 고객 참여를 이끄는 소셜 미디어 전략 제시
      "데이터 기반 마케팅 자동화", // input : 데이터 기반 마케팅 자동화 기법 제시
      "사용자 콘텐츠 활용 팁", // input : 사용자 콘텐츠 활용 팁 제시
    ],
    사례제시: [
      "성공적인 인플루언서 활용 사례", // input : 성공적인 인플루언서 활용 사례 제시
      "바이럴 마케팅 사례 톱3", // input : 바이럴 마케팅 사례 톱 3 제시
      "리브랜딩 성공 사례", // input : 리브랜딩 성공 사례 제시
      "사용자 콘텐츠로 충성도 강화 사례", // input : 사용자 콘텐츠로 충성도 강화 사례 제시
      "감성 마케팅 성공 사례", // input : 감성 마케팅 성공 사례 제시
      "리텐션으로 재구매 유도 사례", // input : 리텐션으로 재구매 유도 사례 제시
      "게릴라 마케팅 성공", // input : 게릴라 마케팅 성공 사례 제시
      "소셜 미디어로 바이럴 성공한 사례", // input : 소셜 미디어로 바이럴 성공한 사례 제시
    ],
    아이디어제공: [
      "SNS 광고 카피 제안받기", // input : SNS 광고 카피 제안해주기
      "소비자 행동 메시지 제안받기", // input : 소비자 행동 메세지 제안해주기
      "감성 캠페인 아이디어 받기", // input : 감성 캠페인 아이디어 제안해주기
      "신제품 론칭 이벤트 아이디어 받기", // input : 신제품 론칭 이벤트 아이디어 제안해주기
      "브랜드 스토리 강화해보기", // input : 소비자 행동 메세지 제안해주기
      "타겟 맞춤 프로모션 제안받기", // input : 타겟 맞춤 프로모션 제안해주기
    ],
  },
  3: {
    방법론관련: [
      "효과적인 고객 세분화", // input : 효과적인 고객 세분화를 위한 데이터 분석 방법 제시
      "고객 페르소나 개발 꿀팁", // input : 고객 페르소나 개발 꿀팁 제시
      "심리적 세분화 활용하기", // input : 심리적 세분화를 통한 맞춤형 마케팅 전략
      "구매 패턴으로 충성도 높이기", // input : 구매 패턴 분석으로 고객 충성도 향상 방법 제시
      "고객 여정 맵핑 전략", // input : 고객 여정 맵핑을 통한 맞춤형 경험 설계 방법 제시
      "피드백 루프 활용법", // input : 고객 피드백 루프 구축과 활용 방법 제시
    ],
    사례제시: [
      "니치 마켓 성공 사례", // input : 니치 마켓으로 성공한 사례 제시
      "생애 가치 극대화 브랜드", // input : 고객의 생애 가치를 극대화한 리테일 브랜드 사례 제시
      "SNS 데이터로 세분화 성공 사례", // input : 소셜 미디어 데이터를 활용한 고객 세분화 성공 사례 제시
      "추천 시스템으로 매출 증대한 사례", // input : 고객의 취향에 맞춘 추천 시스템으로 매출을 증대시킨 사례 제시
      "AI 고객 세분화 혁신 사례", // input : 인공지능을 활용한 고객 세분화 성공 사례 제시
      "로열티 프로그램 성공 사례", // input : 고객 로열티 프로그램으로 혁신한 사례 제시
    ],
    아이디어제공: [
      "고객 유형별 분석해보기", // input : 고객에 적합한 고객 유형 분석해주기
      "페르소나로 마음 읽어보기", // input : 고객에 적합한 페르소나 만들어주기
      "세그먼트 맞춤 프로모션 제안받기", // input : 고객 세그먼트에 맞춘 프로모션 아이디어 만들어주기
      "새로운 고객 세그먼트 찾기", // input : 새로운 고객 세그먼트를 발굴하는 창의적인 아이디어 제안해주기
      "피드백으로 전략 개선 방법 확인하기", // input : 고객 피드백을 활용한 세분화 전략 개선 아이디어 알려주기
      "잠재 고객 혜택 제안받기", // input : 잠재 고객을 유인할 수 있는 매력적 혜택 제안 아이디어 주기
    ],
  },
});

export const CONVERSATION_STAGE = atom(1); // 초기값 1

export const ANALYSIS_BUTTON_STATE = atom(0);
export const EXPERT_BUTTON_STATE = atom(0);
export const ADDITION_BUTTON_STATE = atom(0);
export const CUSTOMER_ADDITION_BUTTON_STATE = atom(0);
export const TARGET_REPORT_BUTTON_STATE = atom(0);
export const TARGET_SELECT_BUTTON_STATE = atom(0);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 아이디어 디벨로퍼 */

export const IDEA_FEATURE_BUTTON_STATE = atom(0);
export const IDEA_CUSTOMER_BUTTON_STATE = atom(0);
export const IDEA_PRIORITY_BUTTON_STATE = atom(0);
export const IDEA_LIST_BUTTON_STATE = atom(0);
export const IDEA_GENERATE_BUTTON_STATE = atom(0);

export const IDEA_FEATURE_DATA = atom([]);
export const IDEA_REQUIREMENT_DATA = atom([]);

export const IDEA_FEATURE_DATA_TEMP = atom([]);
export const IDEA_REQUIREMENT_DATA_TEMP = atom([]);

export const IS_EDITING_IDEA_FEATURE = atom(false);
export const IS_EDITING_IDEA_CUSTOMER = atom(false);

export const ADDING_IDEA_FEATURE = atom(false);
export const ACTIVE_IDEA_FEATURE_INDEX = atom(0);
export const ADD_CONTENT_IDEA_FEATURE = atom("");
export const EDITED_IDEA_FEATURE_TITLE = atom("");

export const ADDING_IDEA_CUSTOMER = atom(false);
export const ACTIVE_IDEA_CUSTOMER_INDEX = atom(0);
export const ADD_CONTENT_IDEA_CUSTOMER = atom("");
export const EDITED_IDEA_CUSTOMER_TITLE = atom("");

export const IDEA_LIST = atom([]);
export const IDEA_GROUP = atom({});
export const IDEA_PRIORITY = atom([]);
export const IDEA_MIRO_STATE = atom(0);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 그로스 해커 */

export const GROWTH_HACKER_BUTTON_STATE = atom(0);
export const GROWTH_HACKER_KPI_BUTTON_STATE = atom(0);
export const KPI_QUESTION_LIST = atom([]);
export const GROWTH_HACKER_REPORT_DATA = atom([]);
export const GROWTH_HACKER_RECOMMENDED_SOLUTION = atom([]);
export const GROWTH_HACKER_SELECTED_SOLUTION = atom([]);
export const GROWTH_HACKER_DETAIL_REPORT_DATA = atom([]);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 가격 분석 전문가 */

export const PRICE_START_BUTTON_STATE = atom(0);
export const PRICE_PRODUCT = atom([]);
export const PRICE_SCRAP_DATA = atom({});
export const PRICE_REPORT_DATA = atom({});
export const PRICE_CONTINUE_BUTTON_STATE = atom(0);
export const PRICE_PRODUCT_SEGMENTATION = atom([]);
export const PRICE_SELECTED_PRODUCT_SEGMENTATION = atom([]);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* BM 전문가 */

export const BM_OR_LEAN = atom("");

export const BM_OPTION_BUTTON_STATE = atom(0);
// export const BM_USER_GOAL_INPUT = atom("");
export const BM_QUESTION_LIST = atom([]);

export const BM_MODEL_SUGGESTION_REPORT_DATA = atom([]);
export const BM_MODEL_SUGGESTION_BUTTON_STATE = atom(0);

export const BM_BM_AUTO_REPORT_DATA = atom([]);
export const BM_BM_AUTO_REPORT_BUTTON_STATE = atom(0);

export const BM_LEAN_AUTO_REPORT_DATA = atom([]);
export const BM_LEAN_AUTO_REPORT_BUTTON_STATE = atom(0);

export const BM_BM_ADS_REPORT_DATA = atom([]);
export const BM_BM_ADS_REPORT_BUTTON_STATE = atom(0);

export const BM_SELECTED_PROBLEM_OPTIONS = atom({});
export const BM_LEAN_ADS_REPORT_DATA = atom([]);
export const BM_LEAN_ADS_REPORT_BUTTON_STATE = atom(0);

// export const SELECTED_BM_LEAN_PROBLEM = atom("");
// export const SELECTED_BM_BM_TARGET = atom("");

export const BM_BM_CUSTOM_REPORT_DATA = atom([]);
export const BM_BM_CUSTOM_REPORT_BUTTON_STATE = atom(0);

export const BM_LEAN_CUSTOM_REPORT_DATA = atom([]);
export const BM_LEAN_CUSTOM_REPORT_BUTTON_STATE = atom(0);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 설문조사 전문가 */

export const SURVEY_GUIDELINE_BUTTON_STATE = atom(0);
export const SURVEY_USER_GOAL_INPUT = atom("");
export const SURVEY_GOAL_SUGGESTION_BUTTON_STATE = atom(0);
export const SURVEY_GOAL_FIXED = atom([]);
export const SURVEY_GOAL_SUGGESTION_LIST = atom([]);
export const SURVEY_QUESTION_LIST = atom([]);
export const SURVEY_GUIDELINE_REPORT_DATA = atom({});
export const SURVEY_GUIDELINE_DETAIL_REPORT_DATA = atom({});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 사례 분석 전문가 */

export const CASE_REPORT_BUTTON_STATE = atom(0);
export const CASE_QUESTION_INPUT = atom("");
export const CASE_REPORT_DATA = atom([]);
export const CASE_HASH_TAG = atom([]);
export const IS_LOADING_CASE_HASHTAG = atom(false);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CUSTOMER_ADDITION_QUESTION_INPUT = atom("");

export const CONVERSATION_ID = atom("");
export const CONVERSATION = atom([]);
export const IS_LOADING = atom(false);
export const IS_LOADING_ANALYSIS = atom(false);
export const REPORT_REFRESH_TRIGGER = atom(false); // 새로고침 트리거 상태 추가
export const CHAT_REFRESH_TRIGGER = atom(false); // 새로고침 트리거 상태 추가

export const SELECTED_EXPERT_LIST = atom([]); // 전문가 선택영역 표시 관련, 선택된 전문가 인덱스 관리

// 팝업 관련 atom 추가
export const IS_LOGIN_POPUP_OPEN = atom(false);
export const IS_SIGNUP_POPUP_OPEN = atom(false);
export const IS_PASSWORD_RESET_POPUP_OPEN = atom(false);

// 소셜 로그인 상태 관리 아톰 추가
export const IS_SOCIAL_LOGGED_IN = atom(false); // 소셜 로그인 여부를 나타내는 아톰

export const SAVED_TIMESTAMP = atom(0); // 지난 프로젝트의 타임스탬프

export const IS_EXPERT_INSIGHT_ACCESSIBLE = atom(false); // Expert Insight 접근 가능 여부를 나타내는 아톰

export const SELECTED_POC_OPTIONS = atom([]);
export const SELCTED_POC_TARGET = atom({});

export const RECOMMENDED_TARGET_DATA = atom({});

export const POC_DETAIL_REPORT_DATA = atom({});

export const POC_PERSONA_LIST = atom([]);
export const EXPERT_DETAIL_DATA = atom([]);
export const IS_MOBILE = atom(false);

export const USER_CREDIT = atom(0);

export const BUTTON_STATE = atom({}); // 버튼 클릭 여부 확인 -> 버튼 클릭 시 MoleculeReportController 비활성화

export const IS_ADDING_NOW = atom({
  section: "",
  isAdding: false,
});

export const NEW_ADD_CONTENT = atom("");

export const USER_CREDIT_DATA = atom([]);
export const USER_PAGE_CNT = atom([]);
export const USER_PROJECT_LIST = atom([]);
export const USER_CREDIT_LIST = atom([]);
export const USER_PERSONA_LIST = atom([]);

export const CREDIT_TARGET_PAGE = atom(1);
export const PROJECT_TARGET_PAGE = atom(1);
export const PERSONA_TARGET_PAGE = atom(1);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 마케팅 */

export const IS_MARKETING = atom(false);

export const MARKETING_HAVE_IEDA = atom(false);
export const MARKETING_MBTI_STAGE = atom(0);
export const MARKETING_MBTI_ANSWER = atom([0, 0, 0, 0]);
export const MARKETING_MBTI_RESULT = atom({});
export const MARKETING_INTEREST = atom("");
export const MARKETING_RECOMMENDED_ITEM_DATA = atom({});
export const MARKETING_RECOMMENDED_ITEM_BUTTON_STATE = atom(0);

export const MARKETING_START_BUTTON_STATE = atom(0);
export const MARKETING_RESEARCH_REPORT_DATA = atom([]);
export const MARKETING_BM_BUTTON_STATE = atom(0);
export const MARKETING_BM_REPORT_DATA = atom([]);
export const MARKETING_CUSTOMER_BUTTON_STATE = atom(0);
export const MARKETING_CUSTOMER_DATA = atom([]);
export const MARKETING_SELECTED_CUSTOMER = atom([]);
export const MARKETING_FINAL_CUSTOMER = atom({});
export const MARKETING_FINAL_REPORT_BUTTON_STATE = atom(0);
export const MARKETING_FINAL_REPORT_DATA = atom([]);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const STRATEGY_BUTTON_STATE = atom(0);
export const STRATEGY_CONSULTANT_REPORT_DATA = atom([]);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 페르소나 */

export const PROJECT_ID = atom("");

export const PROJECT_REPORT_ID = atom("");
export const FILTERED_PROJECT_LIST = atom([]);
export const BUSINESS_PERSONA_LIST = atom([]);
export const PROJECT_LIST = atom([]);
export const PROJECT_REPORT_LIST = atom([]);
export const REPORT_LIST = atom([]);
export const REQUESTED_PERSONA = atom([]);

export const All_BUSINESS_PERSONA_LIST = atom([]);
// export const BUSINESS_ = atom([]);

export const BUSINESS_ANALYSIS = atom({
  input: "",
  title: "",
  characteristics: "",
  features: [],
  category: {},
});

export const PERSONA_LIST = atom({
  selected: [],
  unselected: [],
});

export const SELECTED_PERSONA_LIST = atom([]);

export const CUSTOMIZE_PERSONA_LIST = atom({
  selected: [],
  unselected: [],
});

export const REQUEST_PERSONA_LIST = atom({
  persona: [],
  positioning: {},
});

export const INTERVIEW_QUESTION_LIST = atom([]);
export const SINGLE_INTERVIEW_QUESTION_LIST = atom([]);

export const IS_PERSONA_ACCESSIBLE = atom(false);
export const PERSONA_STEP = atom(0);
export const PERSONA_BUTTON_STATE_1 = atom(0);
export const PERSONA_BUTTON_STATE_2 = atom(0);
export const PERSONA_BUTTON_STATE_3 = atom(0);

// export const SELECTED_INTERVIEW_PURPOSE = atom("");
export const CATEGORY_COLOR = atom({});

export const PROJECT_LOAD_BUTTON_STATE = atom(false);
export const REPORT_LOAD_BUTTON_STATE = atom(false);
export const REPORT_DESCRIPTION_LOAD_BUTTON_STATE = atom(false);

export const INTERVIEW_DATA = atom([]);
export const INTERVIEW_REPORT = atom([]);
export const INTERVIEW_REPORT_ADDITIONAL = atom([]);
export const SINGLE_INTERVIEW_REPORT_TAB1 = atom([]);
export const SINGLE_INTERVIEW_REPORT_TAB2 = atom([]);
export const SINGLE_INTERVIEW_REPORT_TAB3 = atom([]);

export const IS_EDIT_MODE = atom(false);

export const IS_SHOW_TOAST = atom(false);

export const IS_LOADING_BUSINESS_ANALYSIS = atom(false);

export const PROJECT_LOADING = atom({
  isLoading: false,
  lastLoadTime: null,
  error: null,
});
export const PROJECT_REFRESH_TRIGGER = atom(0);

export const TYPES_LIST = atom({
  unselected: [
    { id: "type1", label: "전형적 사용자 페르소나", count: 1 },
    { id: "type2", label: "극단적 사용자 페르소나", count: 2 },
    { id: "type3", label: "비교 소비자 페르소나", count: 1 },
    { id: "type4", label: "비전통적 사용자 페르소나", count: 1 },
    { id: "type5", label: "문제 해결 중심 페르소나", count: 3 },
    { id: "type6", label: "건강 중시 페르소나", count: 2 },
    { id: "type7", label: "시장 트렌드 리더 페르소나", count: 1 },
    { id: "type8", label: "예산 중시 소비자 페르소나", count: 1 },
    { id: "type9", label: "혁신 추구 소비자 페르소나", count: 1 },
    { id: "type10", label: "환경/윤리 중시 페르소나", count: 2 },
    { id: "type11", label: "기능/성능 중시 소비자 페르소나", count: 1 },
    { id: "type12", label: "브랜드 충성 소비자 페르소나", count: 1 },
    { id: "type13", label: "감성적 소비자 페르소나", count: 3 },
    { id: "type14", label: "특정 상황 중심페르소나", count: 2 },
    { id: "type15", label: "문화적/지역적 특성 중심 페르소나", count: 1 },
    { id: "type16", label: "DIY/커스터마이징 선호 페르소나", count: 1 },
    { id: "type17", label: "트렌드 회의적 소비자 페르소나", count: 1 },
    { id: "type18", label: "단체 구매 소비자 페르소나", count: 3 },
    { id: "type19", label: "호기심 기반 소비자 페르소나", count: 2 },
    { id: "type20", label: "브랜드 전환 의향 소비자 페르소나", count: 1 },
  ],
  selected: [],
});

export const SELECTED_INTERVIEW_TYPE = atom("");

export const SELECTED_INTERVIEW_PURPOSE = atom("");
export const SELECTED_PURPOSE_INDEX = atom(0);
export const SELECTED_INTERVIEW_PURPOSE_DATA = atom({});

export const PURPOSE_ITEMS_SINGLE = atom([]);
export const CUSTOM_THEORY_DATA = atom({});

export const IS_LOADING_QUESTION = atom(false);

export const CREDIT_CUSTOM_THEORY = atom(0);
export const CREDIT_ADDITIONAL_QUESTION = atom(0);
export const CREDIT_INDEPTH_INTERVIEW = atom(0);
export const CREDIT_REQUEST_CUSTOM_PERSONA = atom(0);
export const CREDIT_REQUEST_BUSINESS_PERSONA = atom(0);
export const CREDIT_CREATE_PERSONA_DEFAULT = atom(0);
export const CREDIT_CREATE_TOOL = atom(0);
export const CREDIT_CREATE_EXPERT = atom(0);
export const CREDIT_CREATE_MULTIMODAL = atom(0);
export const CREDIT_CREATE_INTERVIEW = atom(0);
export const CREDIT_CREATE_PROJECT = atom(0);
export const CREDIT_CREATE_TOOL_LOW = atom(0);
export const CREDIT_CREATE_TOOL_HIGH = atom(0);
export const CREDIT_CREATE_TOOL_LOADED = atom(false);

export const EVENT_STATE = atom(false);
export const EVENT_TITLE = atom("");
export const TRIAL_STATE = atom(false);

export const CUSTOM_PERSONA_LIST = atom([]);

export const ACCESSABLE_EXPERT = atom(false);

export const TARGET_DISCOVERY_INFO = atom({});

export const TARGET_DISCOVERY_PERSONA = atom([]);
export const SELECTED_TARGET_DISCOVERY_PERSONA = atom([]);
export const TARGET_DISCOVERY_SCENARIO = atom([]);
export const SELECTED_TARGET_DISCOVERY_SCENARIO = atom([]);
export const TARGET_DISCOVERY_FINAL_REPORT = atom({});

export const TOOL_ID = atom("");
export const TOOL_STEP = atom(0);

export const CUSTOMER_VALUE_ANALYZER_INFO = atom({});
export const CUSTOMER_VALUE_ANALYZER_PERSONA = atom([]);
export const CUSTOMER_VALUE_ANALYZER_SELECTED_PERSONA = atom([]);
export const CUSTOMER_VALUE_ANALYZER_SELECTED_FACTOR = atom([]);
export const CUSTOMER_VALUE_ANALYZER_JOURNEY_MAP = atom([]);
export const CUSTOMER_VALUE_ANALYZER_FACTOR = atom({});
export const CUSTOMER_VALUE_ANALYZER_CLUSTERING = atom([]);
export const CUSTOMER_VALUE_ANALYZER_POSITIONING = atom([]);
export const CUSTOMER_VALUE_ANALYZER_FINAL_REPORT = atom({});

export const TOOL_LOADING = atom(false);

export const IDEA_GENERATOR_INFO = atom({});
export const IDEA_GENERATOR_KNOW_TARGET = atom(null);
export const IDEA_GENERATOR_CUSTOM_TARGET = atom("");
export const IDEA_GENERATOR_PURPOSE = atom("");
export const IDEA_GENERATOR_PERSONA = atom([]);
export const IDEA_GENERATOR_IDEA = atom([]);
export const IDEA_GENERATOR_CLUSTERING = atom([]);
export const IDEA_GENERATOR_FINAL_REPORT = atom({});
export const IDEA_GENERATOR_SELECTED_PERSONA = atom([]);
export const IDEA_GENERATOR_EDITING_BUSINESS_TEXT = atom("");

export const DESIGN_ANALYSIS_EMOTION_ANALYSIS = atom([]);
export const DESIGN_ANALYSIS_BUSINESS_TITLE = atom("");
export const DESIGN_ANALYSIS_BUSINESS_INFO = atom("");
export const DESIGN_ANALYSIS_UPLOADED_FILES = atom([]);
export const DESIGN_ANALYSIS_SELECTED_PERSONA = atom([]);
export const DESIGN_ANALYSIS_EMOTION_TARGET = atom({});
export const DESIGN_ANALYSIS_EMOTION_SCALE = atom([]);
export const DESIGN_ANALYSIS_FILE_NAMES = atom([]);
export const DESIGN_ANALYSIS_FILE_ID = atom([]);

export const PSST_BUSINESS_INFO = atom({});
export const PROJECT_ANALYSIS_MULTIMODAL = atom("");
export const PROJECT_ANALYSIS_MULTIMODAL_KEYMESSAGE = atom("");
export const PSST_ANALYSIS_RESULTS = atom([]);
export const PSST_FILE_NAMES = atom([]);
export const PSST_FILE_ID = atom([]);
export const PSST_REPORT = atom("");
export const PSST_SELECTED_TEMPLETE = atom([]);
export const PROJECT_ANALYSIS_MULTIMODAL_DESCRIPTION = atom("");

export const QUICK_SURVEY_PROJECT_DESCRIPTION = atom("");
export const QUICK_SURVEY_ANALYSIS = atom([]);
export const QUICK_SURVEY_SELECTED_QUESTION = atom([]);
export const QUICK_SURVEY_DETAIL_INFO = atom({});
export const QUICK_SURVEY_RECRUITING_CONDITION = atom("");
export const QUICK_SURVEY_SURVEY_METHOD = atom([]);
export const QUICK_SURVEY_CUSTOM_GUIDE = atom([]);
export const QUICK_SURVEY_PRESET_DATA = atom([]);
export const QUICK_SURVEY_PERSONA_GROUP = atom([]);
export const QUICK_SURVEY_INTERVIEW = atom([]);
export const QUICK_SURVEY_REPORT = atom([]);
export const QUICK_SURVEY_STATIC_DATA = atom({});
export const QUICK_SURVEY_INTERVIEW_MODE_TYPE = atom("");

//Education Tool
export const EDUCATION_TOOL_COMPLETED_STATUS = atom(false);

export const CUSTOMER_JOURNEY_MAP_MOMENT_ANALYSIS = atom([]);
export const CUSTOMER_JOURNEY_MAP_SELECTED_PERSONA = atom({});
export const CUSTOMER_JOURNEY_MAP_REPORT = atom([]);
export const CUSTOMER_JOURNEY_MAP_SELECTED_DIRECTION = atom([]);
export const CUSTOMER_JOURNEY_MAP_SELECTED_DIRECTION_INDEX = atom(0);

export const ISSUE_GENERATION_SELECTED_PURPOSE = atom({});
export const ISSUE_GENERATION_PROBLEM_LIST = atom([]);
export const ISSUE_GENERATION_PROBLEM_LIST_TITLE = atom([]);
export const ISSUE_GENERATION_START_POSITION = atom([]);
export const ISSUE_GENERATION_SELECTED_START_POSITION = atom([]);

export const ISSUE_GENERATION_LIST = atom([]);
export const KEYWORDS_GENERATION_SELECTED_ISSUE = atom([]);
export const KEYWORDS_GENERATION_SELECTED_ISSUE_INDEX = atom([]);
export const KEYWORDS_GENERATION_TAG = atom([]);

export const IDEA_GENERATION_SELECTED_PURPOSE = atom({});
export const IDEA_GENERATION_PROBLEM_LIST = atom([]);
export const IDEA_GENERATION_PROBLEM_LIST_TITLE = atom([]);
export const IDEA_GENERATION_START_POSITION = atom([]);
export const IDEA_GENERATION_IDEA_LIST = atom([]);
export const IDEA_GENERATION_MANDALART_DATA = atom([]);
export const IDEA_GENERATION_SELECTED_START_POSITION = atom([]);
export const IDEA_GENERATION_SELECTED_MANDALART = atom(null);
export const IDEA_GENERATION_POSSSESSION_TECH = atom("");
export const IDEA_GENERATION_ADDITIONAL_DATA = atom([]);

export const KANO_MODEL_IDEA_GENERATION = atom([]);
export const KANO_MODEL_IDEA_GENERATION_NAME = atom([]);
export const KANO_MODEL_SELECTED_IDEA = atom(null);
export const KANO_MODEL_PRODUCT_ANALYSIS = atom([]);
export const KANO_MODEL_CLUSTERING = atom([]);
export const KANO_MODEL_CLUSTERING_NAME = atom([]);
export const KANO_MODEL_EVALUATION = atom([]);
export const KANO_MODEL_GRAPH_DATA = atom({});
export const KANO_MODEL_REPORT_DATA = atom([]);
export const KANO_MODEL_INSIGHT = atom({});
export const KANO_MODEL_SELECTED_IDEA_ID = atom("");
export const KANO_MODEL_MODIFIED_IDEA_DATA = atom({});

export const IDEA_EVALUATE_SELECTED_KANO_MODEL = atom({});
export const IDEA_EVALUATE_SELECTED_KANO_MODEL_INDEX = atom({});
export const IDEA_EVALUATE_LIST = atom([]);
export const IDEA_EVALUATE_SELECTED_LIST = atom([]);
export const IDEA_EVALUATE_SELECTED_LIST_INDEX = atom({});
export const IDEA_EVALUATE_COMPARISON_EDUCATION = atom([]);
export const IDEA_EVALUATE_GRAPH_DATA = atom([]);

export const NPS_SELECTED_CONCEPT = atom([]);
export const NPS_SELECTED_CONCEPT_INDEX = atom([]);
export const NPS_SELECTED_MODE_TYPE = atom("");
export const NPS_FILE_NAME = atom([]);
export const NPS_SURVEY_METHOD = atom({});
export const NPS_PERSONA_LIST = atom([]);
export const NPS_INTERVIEW = atom([]);
export const NPS_REPORT = atom([]);
export const NPS_STATIC_DATA = atom([]);

export const CONCEPT_DEFINITION_SELECTED_PURPOSE = atom({});
export const CONCEPT_DEFINITION_SELECTED_PERSONA = atom([]);
export const CONCEPT_DEFINITION_FIRST_REPORT = atom("");
export const CONCEPT_DEFINITION_FINAL_REPORT = atom("");

export const BUSINESS_MODEL_CANVAS_SELECTED_CONCEPT_DEFINITION = atom({});
export const BUSINESS_MODEL_CANVAS_MARKDOWN = atom("");
export const BUSINESS_MODEL_CANVAS_GRAPH_ITEMS = atom([]);
export const BUSINESS_MODEL_CANVAS_INITIAL_GRAPH_DATA = atom([]);
export const BUSINESS_MODEL_CANVAS_POPUP_OPTIONS = atom([]);
export const BUSINESS_MODEL_CANVAS_SELECTED_POPUP_OPTIONS = atom([]);
export const SELECTED_CONCEPT_DEFINITION_FINAL_REPORT = atom([]);
export const BUSINESS_MODEL_CANVAS_USER_OPTIONS = atom([]);
export const BUSINESS_MODEL_CANVAS_FINAL_INSIGHT_DATA = atom([]);

export const PRFAQ_CONCEPT_DEFINITION = atom([]);
export const PRFAQ_BUSINESS_MODEL_CANVAS = atom([]);
export const PRFAQ_KEY_CONTENT_EDUCATION = atom([]);
export const PRFAQ_SELECTED_PURPOSE = atom({});
export const PRFAQ_FINAL_REPORT_EDUCATION = atom("");
export const PRFAQ_COMPANY_INFO = atom({});

//!saas
// 프로젝트 생성 페이지
export const PROJECT_CREATE_INFO = atom({});
export const PROJECT_TOTAL_INFO = atom({});
export const PROJECT_EDUCATION_STATE = atom("basic");
export const PROJECT_EDUCATION_CODE = atom("");

export const PROJECT_PERSONA_LIST = atom([]);

export const PERSONA_LIST_SAAS = atom([]);
export const TOOL_LIST_SAAS = atom([]);
export const DASHBOARD_TOOL_LIST_SAAS = atom([]);
export const PROJECT_SAAS = atom({});
export const ACCESS_DASHBOARD = atom(false);
export const ACCESS_STATE_SAAS = atom(false);

// setConversation([]);
// setConversationStage(1);
// setInputBusinessInfo("");
// setTitleOfBusinessInfo("");
// setMainFeaturesOfBusinessInformation([]);

// setMainCharacteristicOfBusinessInformation([]);
// setBusinessInformationTargetCustomer([]);
// setSelectedExpertIndex("0");
// setSections([]);
// setAdditionalReportCount(0);
// setSelectedAdditionalKeyword([]);
// setApproachPath(0);
// setAdditionalReportData([]);
// setCustomerAdditionalReportData([]);
// setSelectedCustomerAdditionalKeyword([]);
// setStrategyReportData({});
// setInputAdditionalQuestion("");
// setConversationId(null);
// setPassword("");
// setNewPassword("");
// setRePassword("");
// setSelectedExpertList([]);
// setIsEditingNow(false);
// setIsSection1Open(false);
// setIsSection2Open(false);
// setSelectedPocOptions([]);
// setSelectedPocTarget({});
// setRecommendedTargetData({});
// setPocDetailReportData({});
// setPocPersonaList([]);

// setIsEditingIdeaFeature(false);
// setIsEditingIdeaCustomer(false);
// setAddingIdeaFeature(false);
// setActiveIdeaFeatureIndex(0);
// setAddContentIdeaFeature("");
// setEditedIdeaFeatureTitle("");
// setAddingIdeaCustomer(false);
// setActiveIdeaCustomerIndex(0);
// setAddContentIdeaCustomer("");
// setEditedIdeaCustomerTitle("");
// setIdeaFeatureData([]);
// setIdeaRequirementData([]);
// setIdeaFeatureDataTemp([]);
// setIdeaRequirementDataTemp([]);
// setIdeaList([]);
// setIdeaGroup({});
// setIdeaPriority([]);
// setButtonState({});

// setIdeaMiroState(0);
// setGrowthHackerReportData([]);
// setGrowthHackerDetailReportData([]);
// setGrowthHackerRecommendedSolution([]);
// setGrowthHackerSelectedSolution([]);
// setKpiQuestionList([]);

// setPriceReportData({});
// setPriceScrapData({});
// setPriceProduct([]);
// setPriceSelectedProductSegmentation([]);
// setPriceProductSegmentation([]);

// setCaseReportData([]);
// setCaseHashTag([]);

// setSurveyGuidelineDetailReportData({});
// setSurveyGuidelineReportData({});
// setSurveyGoalSuggestionList([]);
// setSurveyGoalFixed([]);
// setSurveyQuestionList([]);

// setBmModelSuggestionReportData([]);
// setBmQuestionList([]);
// setBmSelectedProblemOptions({});
// setBmOrLean("");
// setBmBmAutoReportData([]);
// setBmLeanAutoReportData([]);
// setBmBmAdsReportData([]);
// setBmLeanAdsReportData([]);
// setBmBmCustomReportData([]);
// setBmLeanCustomReportData([]);

// setNewAddContent("");
// setIsAddingNow(false);
// setIsLoading(false);

// setMarketingMbtiResult({});
// setMarketingResearchReportData([]);
// setMarketingBmReportData([]);
// setMarketingCustomerData([]);
// setMarketingSelectedCustomer([]);
// setMarketingFinalCustomer({});
// setMarketingFinalReportData([]);

// setIsMarketing(false);
// setMarketingHaveIdea(false);
// setMarketingMbtiStage(0);
// setMarketingMbtiAnswer([0, 0, 0, 0]);
// setMarketingInterest("");
// setMarketingRecommendedItemData({});
// setMarketingStartButtonState(0);
// setMarketingBmButtonState(0);
// setMarketingFinalReportButtonState(0);
// setMarketingRecommendedItemButtonState(0);

// setStrategyConsultantReportData([]);

// setProjectId("");
// setProjectReportId("");
// setProjectList([]);
// setProjectReportList([]);
// setReportList([]);
// setPersonaList({
//   selected: [],
//   unselected: [],
// });
// setSelectedPersonaList([]);
// setCustomizePersonaList({
//   selected: [],
//   unselected: [],
// });
// setInterviewQuestionList([]);
// setSelectedInterviewPurpose("");
// setCategoryColor({});
// setProjectLoadButtonState(false);
// setReportLoadButtonState(false);
// setReportDescriptionLoadButtonState(false);
// setInterviewData([]);
// setInterviewReport([]);
// setInterviewReportAdditional([]);
// setIsEditMode(false);
// setIsShowToast(false);
