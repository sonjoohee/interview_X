import { atom } from "jotai";

// Stage management
export const currentStageAtom = atom(1); // 1, 2, or 3
export const isTransitioningAtom = atom(false); // For transition animations between stages

// Stage 1 data
export const evaluationTypeAtom = atom(null); // 'quantitative', 'qualitative', 'comparative'
export const subOptionAtom = atom(null);
export const customInputAtom = atom("");
export const isAnalyzingAtom = atom(false);
export const analysisResultsAtom = atom(null);

// Sub-options mapping for each evaluation type
export const quantitativeOptionsAtom = atom([
  "사용성 평가",
  "디자인 품질 평가",
  "브랜드 일치성 평가",
]);
export const qualitativeOptionsAtom = atom([
  "사용자 인터뷰",
  "전문가 리뷰",
  "사용자 관찰",
]);
export const comparativeOptionsAtom = atom([
  "경쟁사 제품",
  "이전 버전",
  "업계 표준",
]);

// Stage 1 validation
export const isStage1CompleteAtom = atom((get) => {
  const evaluationType = get(evaluationTypeAtom);
  const analysisResults = get(analysisResultsAtom);

  // Complete if either an evaluation type is selected or analysis results exist
  return evaluationType !== null || analysisResults !== null;
});

// Stage 2 data
export const fileAtom = atom(null); // The uploaded file
export const filePreviewAtom = atom(null); // URL for preview
export const uploadStatusAtom = atom("empty"); // 'empty', 'dragging', 'uploading', 'uploaded'
export const uploadProgressAtom = atom(0); // 0-100
export const uploadErrorAtom = atom(null);

// Form data for stage 2
export const designTitleAtom = atom("");
export const designTypeAtom = atom("");
export const designTypeOptionsAtom = atom([
  "모바일 앱 UI",
  "웹사이트 UI",
  "제품 디자인",
  "브랜드 디자인",
]);
export const isTypeDropdownOpenAtom = atom(false);
export const designPurposeAtom = atom("");

// Modal states
export const showBackConfirmModalAtom = atom(false);

// Form validation for stage 2
export const isStage2CompleteAtom = atom((get) => {
  const uploadStatus = get(uploadStatusAtom);
  const designTitle = get(designTitleAtom);
  const designType = get(designTypeAtom);
  const designPurpose = get(designPurposeAtom);

  return (
    uploadStatus === "uploaded" &&
    designTitle.trim() !== "" &&
    designType.trim() !== "" &&
    designPurpose.trim() !== ""
  );
});

// Stage 3 data
export const isEvaluatingAtom = atom(false); // Whether evaluation is in progress
export const evaluationProgressAtom = atom(0); // 0-100 for evaluation progress
// export const evaluationResultsAtom = atom(null); // Results of the evaluation

// Evaluation Metrics for Stage 3
export const evaluationCategoriesAtom = atom([
  {
    name: "사용성",
    score: 0,
    details: [
      { name: "직관성", score: 0 },
      { name: "효율성", score: 0 },
      { name: "학습 용이성", score: 0 },
      { name: "오류 방지", score: 0 },
    ],
  },
  {
    name: "시각적 디자인",
    score: 0,
    details: [
      { name: "일관성", score: 0 },
      { name: "색상 사용", score: 0 },
      { name: "레이아웃", score: 0 },
      { name: "가독성", score: 0 },
    ],
  },
  {
    name: "브랜드 일치성",
    score: 0,
    details: [
      { name: "브랜드 가치 반영", score: 0 },
      { name: "브랜드 이미지", score: 0 },
      { name: "타겟 유저 적합성", score: 0 },
    ],
  },
]);

// Selected feedback category for Stage 3
export const selectedFeedbackCategoryAtom = atom(null);

// Feedback recommendations for Stage 3
export const feedbackRecommendationsAtom = atom([]);

// Export/Share modal states
export const showExportModalAtom = atom(false);
export const exportFormatAtom = atom("pdf"); // 'pdf' or 'ppt' or 'image'

// Stage 3 completion status
export const isStage3CompleteAtom = atom((get) => {
  const evaluationResults = get(evaluationResultsAtom);
  return evaluationResults !== null;
});

// Stage 4 data - Methodology selection
export const selectedMethodologyAtom = atom(null); // 'heuristic', 'sus', 'semantic', 'custom'
export const showMethodologyDetailModalAtom = atom(false);
export const activeDetailMethodologyAtom = atom(null);

// Methodology data
export const methodologiesAtom = atom([
  {
    id: "heuristic",
    name: "휴리스틱 평가",
    description: "사용성 전문가가 UI를 평가하는 방법",
    details: "Nielsen의 10가지 사용성 원칙 적용",
    pros: "상세한 문제점 식별 가능",
    cons: "실제 사용자 피드백 부재",
    isRecommended: true,
  },
  {
    id: "sus",
    name: "SUS 평가",
    description: "시스템 사용성 척도(SUS) 기반 평가",
    details: "10개 항목의 설문을 통한 정량적 평가",
    pros: "빠르고 신뢰도 높은 결과",
    cons: "세부적인 개선점 도출 어려움",
    isRecommended: false,
  },
  {
    id: "semantic",
    name: "시맨틱 차이 평가",
    description: "대비되는 형용사 쌍으로 평가",
    details: "감성적, 심미적 품질 측정에 효과적",
    pros: "주관적 인식 정량화 가능",
    cons: "디자인 개선 방향성 부족",
    isRecommended: false,
  },
]);

// Heuristic principles data
export const heuristicPrinciplesAtom = atom([
  { id: 1, name: "시스템 상태의 가시성", isSelected: true, weight: 20 },
  { id: 2, name: "시스템과 실제 세계의 일치", isSelected: true, weight: 15 },
  { id: 3, name: "사용자 제어 및 자유", isSelected: true, weight: 15 },
  { id: 4, name: "일관성 및 표준", isSelected: true, weight: 20 },
  { id: 5, name: "오류 방지", isSelected: true, weight: 20 },
  { id: 6, name: "인식 우선보다 회상", isSelected: false, weight: 10 },
  { id: 7, name: "사용의 유연성과 효율성", isSelected: false, weight: 10 },
  { id: 8, name: "심미적이고 미니멀한 디자인", isSelected: false, weight: 10 },
  { id: 9, name: "오류 인식, 진단, 복구", isSelected: false, weight: 10 },
  { id: 10, name: "도움말 및 설명서", isSelected: false, weight: 10 },
]);

// SUS questions data
export const susQuestionsAtom = atom([
  { id: 1, text: "나는 이 핀테크 앱을 자주 사용하고 싶다.", isSelected: true },
  { id: 2, text: "이 앱은 불필요하게 복잡하다.", isSelected: true },
  { id: 3, text: "이 앱은 사용하기 쉽다.", isSelected: true },
  {
    id: 4,
    text: "이 앱을 사용하기 위해서는 기술적인 도움이 필요하다.",
    isSelected: true,
  },
  {
    id: 5,
    text: "이 앱의 다양한 기능들이 잘 통합되어 있다.",
    isSelected: true,
  },
  { id: 6, text: "이 앱에는 일관성이 없는 부분이 많다.", isSelected: true },
  {
    id: 7,
    text: "대부분의 사람들이 이 앱 사용법을 빠르게 배울 것이다.",
    isSelected: true,
  },
  { id: 8, text: "이 앱은 사용하기에 매우 번거롭다.", isSelected: true },
  { id: 9, text: "나는 이 앱을 사용하면서 자신감을 느꼈다.", isSelected: true },
  {
    id: 10,
    text: "이 앱을 사용하기 전에 많은 것을 배워야 했다.",
    isSelected: true,
  },
]);

// Custom methodology data
export const customMethodologyAtom = atom({
  name: "",
  description: "",
  evaluationElements: "",
});

// Stage 4 completion status
export const isStage4CompleteAtom = atom((get) => {
  const selectedMethodology = get(selectedMethodologyAtom);

  if (!selectedMethodology) return false;

  if (selectedMethodology === "custom") {
    const customMethodology = get(customMethodologyAtom);
    return (
      customMethodology.name.trim() !== "" &&
      customMethodology.description.trim() !== "" &&
      customMethodology.evaluationElements.trim() !== ""
    );
  }

  return true;
});

// Detailed view states
export const showHeuristicDetailsAtom = atom(false);
export const showSusDetailsAtom = atom(false);

// Stage 4 transition state
export const isStage4TransitioningAtom = atom(false);

// ==========================================
// STAGE 5: AI Evaluation Design Auto-Generation
// ==========================================
export const stage5GenerationProgressAtom = atom(45); // 0-100
export const isStage5GeneratingAtom = atom(true);
export const stage5EvaluationDesignAtom = atom({
  overview:
    "핀테크 모바일 앱 UI/UX의 사용성 및 일관성 평가를 위한 휴리스틱 평가 방법론 적용",
  items: [
    {
      id: 1,
      title: "시스템 상태의 가시성",
      description: "사용자가 현재 앱의 상태를 이해할 수 있는가",
      weight: 20,
      isEditing: false,
      details:
        "- 사용자가 현재 어디에 있는지 명확히 인지할 수 있는가\n- 진행 중인 작업 상태가 시각적으로 표시되는가\n- 시스템 피드백이 적절한 시간 내에 제공되는가",
    },
    {
      id: 2,
      title: "시스템과 실제 세계의 일치",
      description: "금융 용어와 디자인이 사용자에게 친숙한가",
      weight: 15,
      isEditing: false,
      details:
        "- 금융 용어가 일반 사용자가 이해하기 쉽게 설명되는가\n- UI 요소가 실제 세계의 메타포를 적절히 활용하는가\n- 정보 구성이 논리적이고 자연스러운가",
    },
    {
      id: 3,
      title: "사용자 제어 및 자유",
      description: "핀테크 앱에서 실수 복구나 작업 취소가 용이한가",
      weight: 15,
      isEditing: false,
      details:
        "- 사용자가 작업을 쉽게 취소하거나 이전 상태로 돌아갈 수 있는가\n- 중요한 액션 전에 확인 단계가 있는가\n- 다양한 내비게이션 경로를 제공하는가",
    },
    {
      id: 4,
      title: "일관성 및 표준",
      description: "앱 전체에서 디자인 요소와 패턴이 일관되게 사용되는가",
      weight: 20,
      isEditing: false,
      details:
        "- 버튼, 아이콘, 레이블 등 UI 요소가 일관되게 사용되는가\n- 색상 체계가 앱 전체에서 일관되게 적용되는가\n- 사용자 인터페이스 패턴이 업계 표준을 따르는가",
    },
    {
      id: 5,
      title: "오류 방지",
      description: "금융 거래에서 사용자 오류를 방지하는 디자인인가",
      weight: 30,
      isEditing: false,
      details:
        "- 중요한 금융 거래 전 확인 단계가 있는가\n- 오류가 발생하기 쉬운 상황에서 적절한 안내가 제공되는가\n- 사용자의 실수를 방지하는 디자인 패턴을 사용하는가",
    },
  ],
});

export const showEditItemModalAtom = atom(false);
export const currentEditingItemAtom = atom(null);
export const showEditOverviewModalAtom = atom(false);
export const editingOverviewAtom = atom("");
export const showAddItemModalAtom = atom(false);
export const newItemAtom = atom({
  title: "",
  description: "",
  weight: 10,
  details: "",
});

export const suggestedItemsAtom = atom([
  {
    title: "인식 우선보다 회상",
    description: "사용자가 정보를 기억하기보다 화면에서 인식할 수 있는가",
    weight: 10,
  },
  {
    title: "심미적이고 미니멀한 디자인",
    description: "불필요한 요소 없이 중요 정보가 강조되는가",
    weight: 10,
  },
]);

// ==========================================
// STAGE 6: AI Evaluation Process and Results
// ==========================================
export const stage6EvaluationProgressAtom = atom(33); // 0-100
export const isStage6EvaluatingAtom = atom(true);
export const currentEvaluatingItemAtom = atom("시스템 상태의 가시성");
export const completedItemsAtom = atom(["금융 정보 명확성", "오류 방지"]);
export const evaluationResultsAtom = atom({
  overallScore: 82,
  categoryScores: [
    { name: "시스템 상태의 가시성", score: 80 },
    { name: "시스템과 실제 세계의 일치", score: 90 },
    { name: "일관성 및 표준", score: 85 },
  ],
  strengths: [
    {
      title: "색상 대비가 뛰어나 가독성이 좋음",
      description:
        "주요 텍스트와 배경 간의 색상 대비가 7:1 이상으로 WCAG 2.1 AA 기준을 충족하며, 중요 정보가 눈에 잘 띄어 핀테크 앱에서 중요한 정확한 정보 인식에 도움이 됩니다.",
    },
    {
      title: "일관된 디자인 언어로 학습 용이성 높음",
      description:
        "버튼, 카드, 아이콘 등의 UI 요소가 앱 전체에서 일관되게 적용되어 사용자가 새로운 기능을 직관적으로 이해하고 학습할 수 있는 환경을 제공합니다.",
    },
    {
      title: "명확한 시각적 계층 구조",
      description:
        "중요한 금융 정보와 액션이 시각적 계층 구조를 통해 잘 구분되어 있어, 사용자가 중요도에 따라 정보를 쉽게 인식할 수 있습니다.",
    },
  ],
  weaknesses: [
    {
      title: "오류 상태에 대한 피드백 부족",
      description:
        "거래 오류나 입력 오류 발생 시 사용자에게 명확한 피드백이 제공되지 않아, 사용자가 문제를 인식하고 해결하는 데 어려움이 있을 수 있습니다.",
      suggestion:
        "오류 발생 시 토스트 메시지 또는 인라인 알림으로 명확한 피드백 제공",
    },
    {
      title: "일부 버튼의 터치 영역이 작음",
      description:
        "주요 기능 버튼의 일부는 터치 영역이 44px x 44px 미만으로 모바일 환경에서 사용자가 정확히 터치하기 어려울 수 있습니다. (WCAG 2.1 AA 권장 사항 미충족)",
      suggestion: "모든 상호작용 요소의 최소 크기를 44px x 44px로 확대",
    },
  ],
  detailedResults: {
    "일관성 및 표준": {
      score: 85,
      subScores: [
        { name: "UI 요소의 일관성", score: 90 },
        { name: "색상 체계 일관성", score: 85 },
      ],
      positives: [
        {
          title: "우수: 버튼, 카드, 아이콘 등 UI 요소의 일관된 사용",
          description:
            "핵심 UI 요소들이 앱 전체에서 일관된 스타일로 사용되어 사용자가 쉽게 인식하고 동작을 예측할 수 있습니다. 특히 버튼 디자인과 카드 컴포넌트의 일관성이 뛰어납니다.",
        },
      ],
      negatives: [
        {
          title: "개선 필요: 일부 페이지에서 네비게이션 패턴 불일치",
          description:
            "계좌 이체 화면과 기본 금융 정보 화면에서 네비게이션 패턴이 일관되지 않아 사용자에게 혼란을 줄 수 있습니다. 뒤로가기와 취소 기능의 위치를 통일할 필요가 있습니다.",
        },
      ],
    },
  },
});

export const showHeatmapDetailModalAtom = atom(false);
export const showStrengthsDetailModalAtom = atom(false);
export const showWeaknessesDetailModalAtom = atom(false);
export const selectedTabAtom = atom("strengths"); // 'strengths' or 'weaknesses'
export const showDetailedResultsAtom = atom(false);
export const selectedCategoryAtom = atom("일관성 및 표준");

// ==========================================
// STAGE 7: Evaluation Results Modification and Feedback
// ==========================================
export const stage7ScoresAtom = atom([
  { name: "시스템 상태의 가시성", score: 80, isAdjusting: false },
  { name: "시스템과 실제 세계의 일치", score: 90, isAdjusting: false },
  { name: "일관성 및 표준", score: 85, isAdjusting: false },
]);

export const showAddFeedbackAtom = atom(false);
export const feedbackTextAtom = atom("");

// Stage validation atoms
export const isStage5CompleteAtom = atom((get) => {
  return !get(isStage5GeneratingAtom);
});

export const isStage6CompleteAtom = atom((get) => {
  return !get(isStage6EvaluatingAtom);
});

export const isStage7CompleteAtom = atom(false);
