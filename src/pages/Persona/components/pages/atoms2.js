// atom.js
import { atom } from "jotai";

// 현재 UI 상태 관리용 atom
export const currentPageAtom = atom("landing"); // 'landing', 'upload', 'loading', 'result'

// 업로드된 이미지 관리용 atom
export const uploadedImageAtom = atom(null);
export const imageNameAtom = atom("");
export const imageSizeAtom = atom("");

// 분석 옵션 선택용 atom
export const analysisOptionsAtom = atom({
  layout: true,
  colors: true,
  typography: true,
  accessibility: false,
  uxGuidelines: false,
});

// 로딩 상태 관리용 atom
export const loadingProgressAtom = atom(0);
export const currentAnalysisStepAtom = atom("layout"); // 'layout', 'colors', 'typography', 'accessibility'

// 분석 결과 관리용 atom
export const analysisResultAtom = atom({
  overallScore: 85,
  feedback: {
    layout: {
      score: 80,
      title: "레이아웃 평가",
      feedback: "콘텐츠와 메뉴 간의 여백을 더 넓혀 시각적 균형을 맞추세요.",
      improvements: [
        "헤더와 콘텐츠 사이 간격을 최소 48px로 설정",
        "버튼 간격을 균일하게 유지 (16px 이상)",
      ],
      icon: "🖼️",
    },
    colors: {
      score: 75,
      title: "색상 조합 평가",
      feedback:
        "메인 컬러와 보조 컬러의 대비가 부족합니다. 더 명확한 구분이 필요합니다.",
      improvements: [
        "메인 버튼 색상을 더 진한 파란색(#1D4ED8)으로 변경",
        "배경색과 텍스트 간 대비율 최소 4.5:1 유지",
      ],
      icon: "🎨",
    },
    typography: {
      score: 90,
      title: "타이포그래피 평가",
      feedback:
        "본문 텍스트가 다소 작아 모바일에서 가독성이 떨어질 수 있습니다.",
      improvements: [
        "본문 텍스트 크기를 최소 16px로 증가",
        "제목과 본문 간 크기 차이를 더 명확하게",
      ],
      icon: "📝",
    },
    accessibility: {
      score: 95,
      title: "접근성 평가",
      feedback:
        "대체로 접근성이 우수하나, 일부 컨트롤의 포커스 상태가 명확하지 않습니다.",
      improvements: [
        "포커스 상태의 아웃라인을 더 명확하게",
        "버튼과 링크의 클릭 영역을 충분히 확보 (최소 44px)",
      ],
      icon: "♿",
    },
  },
});

// PDF 다운로드 상태
export const pdfGeneratedAtom = atom(false);
