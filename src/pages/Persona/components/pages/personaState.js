import { atom } from "jotai";

// 기본 페르소나 데이터
const defaultPersona = {
  name: "김지은",
  personaNumber: 1,
  profileImage: "https://via.placeholder.com/250x300",
  quote:
    "저는 IT 개발과 육아 커뮤니티를 통해 다른 부모들에게 도움을 주는 것을 좋아합니다. 재택근무를 하며 아이를 돌보는 균형 잡힌 삶을 살고 있습니다.",

  tags: ["Clever", "Organised", "Curious"],

  age: "30",
  occupation: "육아 커뮤니티 운영자 / IT 개발자",
  family: "기혼",
  location: "서울",
  archetype: "매니저/커뮤니케이터",

  bio: "30세 여성 IT 개발자로 온라인 육아 커뮤니티 운영과 IT 개발 업무를 병행하고 있습니다. 재택근무를 하며 아이를 돌보면서 업무를 처리하는 능력이 뛰어납니다. 육아 정보 공유를 통해 부모들과 소통하는 것을 즐기며, 밀린 업무는 저녁에 처리합니다. 효율적인 시간 관리로 가정과 일의 균형을 유지하고 있습니다.",

  goals: [
    "커뮤니티 회원 증가 및 활성화",
    "스마트 육아 기술 접목하여 발전",
    "일과 육아의 균형 유지",
    "효율적인 시간 관리 시스템 구축",
    "양질의 육아 콘텐츠 지속 제작",
    "아이에게 최적의 육아 환경 제공",
  ],

  painPoints: [
    "업무와 육아를 동시에 진행하며 시간 부족",
    "자기 개발을 위한 시간 확보 어려움",
    "커뮤니티 관리에 많은 시간 소요",
    "육아 정보의 신뢰성 검증 필요",
    "육아와 업무 사이에서 오는 스트레스 관리",
  ],

  scenario:
    "김지은은 6개월 된 아이를 키우는 워킹맘입니다. 아침에 일어나 아이를 돌보면서 커뮤니티 댓글을 확인합니다. 재택근무 동안 아이가 낮잠을 자는 시간에 집중적으로 개발 업무를 처리하고, 틈틈이 커뮤니티 질문에 답변합니다. 저녁에는 아이를 재운 후 밀린 일을 마무리하고 다음 날 컨텐츠를 준비합니다. 그녀에게 필요한 것은 시간을 효율적으로 관리하고 육아 정보를 쉽게 찾을 수 있는 솔루션입니다.",

  motivations: [
    { label: "커뮤니티 기여", value: 90 },
    { label: "자기 개발", value: 75 },
    { label: "가족 케어", value: 95 },
    { label: "IT 기술 활용", value: 80 },
    { label: "워라밸 추구", value: 85 },
  ],

  personality: [
    { left: "내향적", right: "외향적", value: 45 },
    { left: "분석적", right: "창의적", value: 60 },
    { left: "충실함", right: "자유로움", value: 35 },
    { left: "수동적", right: "능동적", value: 75 },
  ],

  brands: [
    { name: "육아 앱", logo: "https://via.placeholder.com/100x40" },
    { name: "개발 툴", logo: "https://via.placeholder.com/100x40" },
    { name: "육아 용품", logo: "https://via.placeholder.com/100x40" },
  ],
};

// 페르소나 상태 atom 생성
export const personaState = atom(defaultPersona);

// 페르소나 전체 업데이트 함수
export const updatePersonaAtom = atom(
  (get) => get(personaState),
  (get, set, newPersona) => {
    set(personaState, {
      ...get(personaState),
      ...newPersona,
    });
  }
);

// 개별 필드 업데이트 함수
export const updateFieldAtom = atom(null, (get, set, { field, value }) => {
  const current = get(personaState);
  set(personaState, {
    ...current,
    [field]: value,
  });
});

// 배열 항목 업데이트 함수
export const updateArrayItemAtom = atom(
  null,
  (get, set, { field, index, value }) => {
    const current = get(personaState);
    const updatedArray = [...current[field]];
    updatedArray[index] = value;

    set(personaState, {
      ...current,
      [field]: updatedArray,
    });
  }
);

// 객체 배열 항목 업데이트 함수
export const updateObjectArrayItemAtom = atom(
  null,
  (get, set, { field, index, key, value }) => {
    const current = get(personaState);
    const updatedArray = [...current[field]];
    updatedArray[index] = {
      ...updatedArray[index],
      [key]: value,
    };

    set(personaState, {
      ...current,
      [field]: updatedArray,
    });
  }
);

// 배열에 항목 추가 함수
export const addArrayItemAtom = atom(null, (get, set, { field, item }) => {
  const current = get(personaState);
  set(personaState, {
    ...current,
    [field]: [...current[field], item],
  });
});

// 배열에서 항목 제거 함수
export const removeArrayItemAtom = atom(null, (get, set, { field, index }) => {
  const current = get(personaState);
  const updatedArray = current[field].filter((_, i) => i !== index);

  set(personaState, {
    ...current,
    [field]: updatedArray,
  });
});
