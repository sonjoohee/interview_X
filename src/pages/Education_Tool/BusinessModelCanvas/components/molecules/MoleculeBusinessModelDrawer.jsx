import React, { useMemo } from "react";
import styled from "styled-components";
import { BUSINESS_MODEL_CANVAS_GRAPH_ITEMS, BUSINESS_MODEL_CANVAS_FINAL_INSIGHT_DATA } from '../../../../AtomStates';
import { useAtom } from 'jotai';

/**
 * MoleculeBusinessModelDrawer
 *
 * 기능 요약
 * - 우측에서 좌측으로 슬라이드되는 드로어
 * - 10개 섹션(9개 BMC + 최종 인사이트) 버튼 그리드
 * - 버튼 상태: 비활성(disabled) / 활성(enabled) / 선택(selected)
 *   - 비활성: 배경 #F7F8FA / 테두리 #E0E4EB / 글자 #D1D1D6
 *   - 활성(평상시): 배경 #F7F8FA / 테두리 #E0E4EB / 글자 #666666
 *   - 선택: 배경 #256EF4 / 테두리 #256EF4 / 글자 #FFFFFF (요청하신 ‘고객 세그먼트’ 버튼 느낌)
 * - 외부(드로어 밖)에서 활성화된 기능 목록만 내부에서 활성 스타일로 노출
 * - 섹션별 콘텐츠를 data로 주입하면 본문에 표시. 없으면 플레이스홀더 문구 노출
 *
 * Props
 * - isOpen: boolean          드로어 열림/닫힘
 * - onClose: () => void      닫기 콜백
 * - enabledSectionIds: string[]  외부에서 ‘활성화’된 섹션 id 목록
 * - selectedSectionId: string     현재 선택된 섹션 id
 * - onSelectSection: (id) => void 섹션 버튼 클릭 콜백
 * - data: {
 *     [id: string]: {
 *       title?: string; // 섹션 헤더 제목 override (없으면 기본 라벨 사용)
 *       items?: Array<{ title: string; body: string }>; // 일반 섹션용 카드 리스트
 *       // 최종 인사이트( insights ) 전용:
 *       summary?: string;   // 1. 핵심 요약
 *       extended?: string;  // 2. 인사이트 확장
 *     }
 *   }
 *
 * 사용 예시는 파일 하단 참고
 */



const DEFAULT_SECTIONS = [
  { id: "customerSegments",    label: "고객군" },
  { id: "valueProposition",    label: "가치 제안" },
  { id: "channels",            label: "채널" },
  { id: "customerRelationships", label: "고객 관계" },
  { id: "revenueStreams",      label: "수익원" },
  { id: "keyResources",        label: "핵심 자원" },
  { id: "keyActivities",       label: "핵심 활동" },
  { id: "keyPartners",         label: "핵심 파트너" },
  { id: "costStructure",       label: "비용 구조" },
  { id: "insights",            label: "최종 인사이트" },
];

export function MoleculeBusinessModelDrawer({
  isOpen,
  onClose,
  enabledSectionIds = [],
  selectedSectionId = "customerSegments",
  onSelectSection,
  onGenerateInsight,
  finalInsightLoading = false,
}) {
  const [businessModelCanvasGraphItems, ] = useAtom(BUSINESS_MODEL_CANVAS_GRAPH_ITEMS);
  const [finalInsightData, ] = useAtom(BUSINESS_MODEL_CANVAS_FINAL_INSIGHT_DATA);
  const sections = DEFAULT_SECTIONS;

  const selected = useMemo(
    () => sections.find((s) => s.id === selectedSectionId) ?? sections[0],
    [sections, selectedSectionId]
  );

  // 빈 상태인지 확인 (enabledSectionIds가 비어있거나 data가 비어있을 때)
  const isEmpty = enabledSectionIds.length === 0 || Object.keys(businessModelCanvasGraphItems).length === 0;
  const isEnabled = (id) => (id !== "insights") ? (!isEmpty && enabledSectionIds.includes(id)) : (Object.keys(businessModelCanvasGraphItems).length === 9);

  const handleClickSection = (id) => {
    if (!isEnabled(id)) return;
    if (onSelectSection) onSelectSection(id);
    
    // 최종 인사이트 섹션을 클릭했고, 데이터가 없으면 생성 요청
    if (id === "insights" && finalInsightData.length === 0 && onGenerateInsight) {
      onGenerateInsight();
    }
  };

  const content = businessModelCanvasGraphItems[getSectionNumber(selected.id)-1] || {};
  const headerTitle = selected.label;

  return (
    <>
      <Overlay $open={isOpen} onClick={onClose} aria-hidden={!isOpen} />
      <Panel
        role="dialog"
        aria-modal="true"
        aria-label="Business Model 분석"
        $open={isOpen}
      >
        <Header>
          <Title>Business Model 분석</Title>
          <CloseButton onClick={onClose} aria-label="닫기">
            <CloseIcon viewBox="0 0 24 24">
              <path d="M6 6L18 18" strokeWidth="2" strokeLinecap="round" />
              <path d="M18 6L6 18" strokeWidth="2" strokeLinecap="round" />
            </CloseIcon>
          </CloseButton>
        </Header>

        <Body>
          <ButtonGrid>
            {sections.map((s) => {
              const state = !isEnabled(s.id)
                ? "disabled"
                : s.id === selected.id
                ? "selected"
                : "enabled";
              return (
                <BlockButton
                  key={s.id}
                  $state={state}
                  $isInsights={s.id === "insights"}
                  onClick={() => handleClickSection(s.id)}
                  aria-pressed={state === "selected"}
                  aria-disabled={state === "disabled"}
                >
                  {s.id !== "insights" && (
                    <ButtonNumberBadge $state={state}>
                      <ButtonBadgeText $state={state}>{getSectionNumber(s.id)}</ButtonBadgeText>
                    </ButtonNumberBadge>
                  )}
                  <BlockLabel $state={state} $isInsights={s.id === "insights"}>{s.label}</BlockLabel>
                  {s.id === "insights" && (state === "enabled" || state === "selected") && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.1071 5.448C9.7051 3.698 12.1231 3.645 12.8321 5.289L12.8921 5.449L13.6991 7.809C13.884 8.35023 14.1829 8.84551 14.5755 9.26142C14.9682 9.67734 15.4454 10.0042 15.9751 10.22L16.1921 10.301L18.5521 11.107C20.3021 11.705 20.3551 14.123 18.7121 14.832L18.5521 14.892L16.1921 15.699C15.6507 15.8838 15.1552 16.1826 14.7391 16.5753C14.323 16.9679 13.996 17.4452 13.7801 17.975L13.6991 18.191L12.8931 20.552C12.2951 22.302 9.8771 22.355 9.1691 20.712L9.1071 20.552L8.3011 18.192C8.11628 17.6506 7.81748 17.1551 7.42485 16.739C7.03221 16.3229 6.5549 15.9959 6.0251 15.78L5.8091 15.699L3.4491 14.893C1.6981 14.295 1.6451 11.877 3.2891 11.169L3.4491 11.107L5.8091 10.301C6.35034 10.1161 6.84562 9.81719 7.26153 9.42457C7.67744 9.03195 8.00432 8.55469 8.2201 8.025L8.3011 7.809L9.1071 5.448ZM19.0001 2C19.1872 2 19.3705 2.05248 19.5293 2.15147C19.688 2.25046 19.8158 2.392 19.8981 2.56L19.9461 2.677L20.2961 3.703L21.3231 4.053C21.5106 4.1167 21.6749 4.23462 21.7953 4.39182C21.9157 4.54902 21.9867 4.73842 21.9994 4.93602C22.012 5.13362 21.9657 5.33053 21.8663 5.50179C21.7669 5.67304 21.6189 5.81094 21.4411 5.898L21.3231 5.946L20.2971 6.296L19.9471 7.323C19.8833 7.51043 19.7653 7.6747 19.608 7.79499C19.4508 7.91529 19.2613 7.98619 19.0637 7.99872C18.8662 8.01125 18.6693 7.96484 18.4981 7.86538C18.3269 7.76591 18.1891 7.61787 18.1021 7.44L18.0541 7.323L17.7041 6.297L16.6771 5.947C16.4896 5.8833 16.3253 5.76538 16.2049 5.60819C16.0845 5.45099 16.0135 5.26158 16.0008 5.06398C15.9882 4.86638 16.0345 4.66947 16.1339 4.49821C16.2333 4.32696 16.3813 4.18906 16.5591 4.102L16.6771 4.054L17.7031 3.704L18.0531 2.677C18.1205 2.47943 18.2481 2.30791 18.4179 2.1865C18.5878 2.06509 18.7913 1.99987 19.0001 2Z" fill={state === "selected" ? "#FFFFFF" : "#226FFF"}/>
                    </svg>
                  )}
                </BlockButton>
              );
            })}
          </ButtonGrid>

          <SectionArea>
            <SectionHeader>
              {selected.id !== "insights" && (
                <NumberBadge>
                  <BadgeText>{getSectionNumber(selected.id)}</BadgeText>
                </NumberBadge>
              )}
              <SectionTitle>{headerTitle}</SectionTitle>
            </SectionHeader>

            {isEmpty ? (
              <EmptyState />
            ) : selected.id !== "insights" ? (
              <CardsWrap>
                {Array.isArray(content) && content.length > 0 ? (
                  content.map((item, idx) => (
                    <Card key={`${selected.id}-${idx}`}>
                      <CardTitle>
                        {idx + 1}. {item.title}
                      </CardTitle>
                      <CardBody>{item.description}</CardBody>
                    </Card>
                  ))
                ) : (
                  <Placeholder>
                    선택한 항목의 설명이 표시됩니다.
                    <br />
                    블록을 먼저 채워주세요.
                  </Placeholder>
                )}
              </CardsWrap>
            ) : finalInsightLoading ? (
              <LoadingContainer>
                <LoadingSpinner />
                <LoadingText>최종 인사이트를 생성하고 있습니다...</LoadingText>
              </LoadingContainer>
            ) : (
              <FinalInsightsScrollContainer>
                <FinalInsightsContainer>
                  {/* 첫 번째 섹션 박스 */}
                  <SectionBox>
                    <MainTitle>{finalInsightData[0].title || "본 비즈니스 모델은 마포구를 기반으로 한 소규모 카페의 B2C 홈메이드 시럽 음료 판매 모델이다."}</MainTitle>
                    
                    {finalInsightData[0].sub_sections && finalInsightData[0].sub_sections.length > 0 ? (
                      finalInsightData[0].sub_sections.map((item, index) => (
                        <div key={index}>
                          <ContentItem>
                            <SubTitle>{item.sub_title}</SubTitle>
                            <ContentDescription>{item.text}</ContentDescription>
                          </ContentItem>
                          {index < finalInsightData[0].sub_sections.length - 1 && <SectionDivider />}
                        </div>
                      ))
                    ) : (
                      <>
                        <ContentItem>
                          <SubTitle>시장 타겟과 수익 전략</SubTitle>
                          <ContentDescription>인근 30대 1인 가구를 주요 고객으로, 아늑한 소규모 공간과 홈메이드 시럽 기반 음료 가치를 인스타그램 DM과 입소문을 통해 제공하며, 주수익은 커피·음료 판매와 시럽 프리미엄 메뉴에서 발생한다.</ContentDescription>
                        </ContentItem>
                        <SectionDivider />
                        <ContentItem>
                          <SubTitle>핵심 역량 및 비용 구조</SubTitle>
                          <ContentDescription>핵심 자원은 바리스타 경험과 홈메이드 시럽 레시피, 소규모 공간이며, 주요 활동은 음료 제조와 시럽 개발, SNS 운영이다. 파트너십은 원두·디저트 공급처와 지역 커뮤니티에 의존하며, 비용 구조는 높은 임대료와 변동성 큰 원재료비, 고정 인건비가 수익성을 저해하는 치명적 요소다.</ContentDescription>
                        </ContentItem>
                      </>
                    )}
                  </SectionBox>

                  {/* 두 번째 섹션 박스 */}
                  <SectionBox>
                    <MainTitle>{finalInsightData[1].title || "비즈니스 모델 분석 및 전략적 제언"}</MainTitle>
                    
                    {finalInsightData[1].sub_sections && finalInsightData[1].sub_sections.length > 0 ? (
                      finalInsightData[1].sub_sections.map((item, index) => (
                        <div key={index}>
                          <ContentItem>
                            <SubTitle>{item.sub_title}</SubTitle>
                            <ContentDescription>{item.text}</ContentDescription>
                          </ContentItem>
                          {index < finalInsightData[1].sub_sections.length - 1 && <SectionDivider />}
                        </div>
                      ))
                    ) : (
                      <>
                        <ContentItem>
                          <SubTitle>강점 (Strengths)</SubTitle>
                          <ContentDescription>• 차별화된 제공 구조 보유: 소규모 공간과 홈메이드 시럽을 통한 독창적 가치 제공 체계 보유{'\n'}• 고객 충성도 조건 형성: 1:1 친밀한 소통과 단골 관리로 재방문 기반의 안정적 수익 조건 형성</ContentDescription>
                        </ContentItem>
                        <SectionDivider />
                        <ContentItem>
                          <SubTitle>내부 리스크 (Internal Risk)</SubTitle>
                          <ContentDescription>• 자원 집중 구조 의존: 바리스타 경험·레시피 등 핵심 역량이 특정 개인에 집중되어 지속성 리스크 발생{'\n'}• 고정비 부담 구조 내재: 임대료·인건비 등 고정비 비중이 높아 매출 변동 시 수익성 압박 구조 발생</ContentDescription>
                        </ContentItem>
                        <SectionDivider />
                        <ContentItem>
                          <SubTitle>외부 제약 (External Constraints)</SubTitle>
                          <ContentDescription>• 채널 집중 한계 발생: 인스타그램·입소문 중심의 마케팅 채널 구조로 신규 고객 유입 제약 발생{'\n'}• 공간·수요 제약 구조 형성: 소규모 좌석과 계절별 수요 변동에 따른 매출 확장성 제한 조건 형성</ContentDescription>
                        </ContentItem>
                        <SectionDivider />
                        <ContentItem>
                          <SubTitle>전략적 제언</SubTitle>
                          <ContentDescription>• 매출 다변화 전략 수립: 시럽 B2B 판매, 원데이 클래스 운영 등으로 수익원 확대 필요{'\n'}• 디지털 마케팅 강화: SNS 외 온라인 채널 다각화를 통한 신규 고객 유입 경로 확보{'\n'}• 운영 효율성 개선: 고정비 최적화 및 재료비 관리 시스템 도입으로 수익성 개선</ContentDescription>
                        </ContentItem>
                      </>
                    )}
                  </SectionBox>
                </FinalInsightsContainer>
              </FinalInsightsScrollContainer>
            )}
          </SectionArea>
        </Body>
      </Panel>
    </>
  );
}

/* =============== EmptyState Component =============== */
const EmptyState = () => {
  return (
    <EmptyStateContainer>
      <EmptyStateCard>
        <EmptyStateIcon>
        <svg
        width={40}
        height={41}
        viewBox="0 0 40 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="0.5" width="18.5185" height="18.5185" rx="2.16706" fill="#226FFF" />
        <rect x="21.4814" y="0.5" width="18.5185" height="18.5185" rx="2.16706" fill="#226FFF" />
        <rect y="21.9805" width="18.5185" height="18.5185" rx="2.16706" fill="#226FFF" />
        <rect x="21.4814" y="21.9805" width="18.5185" height="18.5185" rx="2.16706" fill="#F0F4FF" />
      </svg>
        </EmptyStateIcon>
        <EmptyStateText>
          선택한 항목의 설명이 표시됩니다.
          <br />
          블록을 먼저 채워주세요.
        </EmptyStateText>
      </EmptyStateCard>
    </EmptyStateContainer>
  );
};

/* =============== styled =============== */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(6, 9, 19, 0.4);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 160ms ease;
  z-index: 1000;
`;

const Panel = styled.aside`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: min(800px, 100%);
  background: #FFFFFF;
  border-left: 1px solid #E0E4EB;
  transform: translateX(${({ $open }) => ($open ? "0%" : "100%")});
  transition: transform 240ms ease;
  display: flex;
  flex-direction: column;
  z-index: 1001;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 32px 40px 40px;
`;

const Title = styled.h2`
  margin: 0;
  color: #323232;
  font-family: Pretendard, Poppins;
  font-size: 22px;
  font-weight: 700;
  line-height: 28.6px;
`;

const CloseButton = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;
  padding: 6px;
  &:focus-visible {
    outline: 2px solid #256EF4;
    outline-offset: 2px;
  }
`;

const CloseIcon = styled.svg`
  width: 24px;
  height: 24px;
  stroke: #323232;
`;

const Body = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 40px;
  padding: 0 40px;
  overflow: hidden;
  height: 100%;
`;

const ButtonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const BlockButton = styled.button`
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 5px;
  gap: 4px;
  cursor: ${({ $state }) => ($state === "disabled" ? "not-allowed" : "pointer")};
  max-width: 147px;
  height: 44px;

  background: ${({ $state, $isInsights }) =>
    $state === "selected"
      ? "#256EF4"
      : $isInsights && $state === "enabled"
      ? "#F0F4FF"
      : "#F7F8FA"};
  border: 1px solid
    ${({ $state, $isInsights }) =>
      $state === "selected"
        ? "#256EF4"
        : $isInsights && $state === "enabled"
        ? "#C4D2FF"
        : "#E0E4EB"};

  &:focus-visible {
    outline: 3px solid #F0F4FF;
    outline-offset: 2px;
  }
`;

const BlockLabel = styled.span`
  font-family: Pretendard, Poppins;
  font-size: 16px;
  font-weight: 600;
  line-height: 30px;
  color: ${({ $state, $isInsights }) =>
    $isInsights && $state === "enabled"
      ? "#226FFF"
      : $state === "selected"
      ? "#FFFFFF"
      : $state === "disabled"
      ? "#D1D1D6"
      : "#666666"};
  white-space: nowrap;
`;

const ButtonNumberBadge = styled.div`
  width: 20px;
  height: 20px;
  background: ${({ $state }) =>
    $state === "selected"
      ? "#FFFFFF"
      : $state === "disabled"
      ? "rgba(76, 76, 76, 0.1)"
      : "#4C4C4C"};
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ButtonBadgeText = styled.span`
  color: ${({ $state }) =>
    $state === "selected"
      ? "#4C4C4C"
      : "#FFFFFF"};
  font-family: Pretendard, Poppins;
  font-size: 12px;
  font-weight: 500;
`;

const SectionArea = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 20px;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NumberBadge = styled.div`
  width: 26px;
  height: 26px;
  background: #4C4C4C;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const BadgeText = styled.span`
  color: #FFFFFF;
  font-family: Pretendard, Poppins;
  font-size: 16px;
  font-weight: 500;
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: #323232;
  font-family: Pretendard, Poppins;
  font-size: 22px;
  font-weight: 700;
  line-height: 33px;
`;

const CardsWrap = styled.div`
  overflow-y: auto;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
`;

const Card = styled.div`
  border-radius: 10px;
  border: 1px solid #e9ecf1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #FFFFFF;
  text-align: left;
  width: 100%;
  flex-shrink: 0;
`;

const CardTitle = styled.div`
  color: #323232;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const CardBody = styled.div`
  color: #8c8c8c;
  font-size: 16px;
  font-weight: 600;
  line-height: 25.6px;
`;

const Placeholder = styled.div`
  border: 1px solid #e9ecf1;
  border-radius: 10px;
  padding: 16px;
  color: #323232;
  font-size: 16px;
  line-height: 24px;
  background: #FFFFFF;
  text-align: left;
`;

const InsightsWrap = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 16px;
  height: 100%;
`;

const InsightBlock = styled.div`
  border-radius: 10px;
  border: 1px solid #e9ecf1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #FFFFFF;
  text-align: left;
  width: 100%;
  flex-shrink: 0;
`;

const InsightTitle = styled.div`
  color: #323232;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const InsightBody = styled.div`
  color: #8c8c8c;
  font-size: 16px;
  font-weight: 600;
  line-height: 25.6px;
`;

/* =============== Loading Styles =============== */
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 20px;
  padding: 40px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #226FFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  color: #666666;
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 600;
  text-align: center;
`;

/* =============== Final Insights Styles =============== */
const FinalInsightsScrollContainer = styled.div`
  overflow-y: auto;
  height: 100%;
  padding-bottom: 16px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #E0E4EB;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background-color: #F7F8FA;
    border-radius: 3px;
  }
`;

const FinalInsightsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SectionBox = styled.div`
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #E9ECF1;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MainTitle = styled.div`
  color: #323232;
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
  margin-bottom: 20px;
`;

const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const SubTitle = styled.div`
  color: #666666;
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 600;
  word-wrap: break-word;
  align-self: stretch;
  text-align: left;
`;

const ContentDescription = styled.div`
  color: #949494;
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 400;
  line-height: 22.4px;
  word-wrap: break-word;
  white-space: pre-wrap;
  align-self: stretch;
  padding-left: 16px;
  text-align: left;
`;

const SectionDivider = styled.div`
  width: 681px;
  height: 1px;
  background-color: #E9ECF1;
  margin: 12px 0;
`;

/* =============== EmptyState Styles =============== */
const EmptyStateContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-bottom: 40px;
`;

const EmptyStateCard = styled.div`
  align-self: stretch;
  flex: 1 1 0;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid #E9ECF1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  display: flex;
  height: 100%;
`;

const EmptyStateIcon = styled.div`
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  display: flex;
`;

const EmptyStateText = styled.div`
  width: 690px;
  padding-left: 18px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: inline-flex;
  color: #666666;
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 1.55;
  word-wrap: break-word;
  text-align: center;
`;

/* =============== utils =============== */
function getSectionNumber(id) {
  const order = [
    "customerSegments",
    "valueProposition",
    "channels",
    "customerRelationships",
    "revenueStreams",
    "keyResources",
    "keyActivities",
    "keyPartners",
    "costStructure",
    "insights",
  ];
  const idx = order.indexOf(id);
  return idx >= 0 ? idx + 1 : 1;
}



/* ======================= 사용 예시 =======================

import React, { useState } from "react";
import { MoleculeBusinessModelDrawer } from "./MoleculeBusinessModelDrawer";

export default function DemoPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("customerSegments");

  // 외부에서 ‘활성화’된 섹션(= 파란 버튼 가능한 것들)
  const enabled = [
    "customerSegments",
    "valueProposition",
    "channels",
    "insights",
  ];

  // 실제 데이터 (예시)
  const bmData = {
    customerSegments: {
      items: [
        {
          title: "합리적 분쟁 해결 희망",
          body:
            "개인화된 법률 정보, AI 상담, 자동 문서 작성 등으로 시간과 장소 제약 없이 이용.",
        },
        {
          title: "시간 절약형 문제 해결 추구",
          body:
            "앱/웹 중심 셀프 서비스와 가벼운 전문가 연계로 대기·조율 시간을 단축.",
        },
      ],
    },
    insights: {
      summary:
        "핵심 고객은 30대 직장인 1인가구. 홈메이드 시럽·바리스타 퀄리티로 소규모 공간 경쟁 우위 확보.",
      extended:
        "규모의 경제 한계와 고정비 비중이 리스크. 시럽 B2B 판매, 클래스 운영 등으로 매출 다변화 필요.",
    },
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>드로어 열기</button>

      <MoleculeBusinessModelDrawer
        isOpen={open}
        onClose={() => setOpen(false)}
        enabledSectionIds={enabled}
        selectedSectionId={selected}
        onSelectSection={setSelected}
        data={bmData}
      />
    </div>
  );
}

========================================================= */
