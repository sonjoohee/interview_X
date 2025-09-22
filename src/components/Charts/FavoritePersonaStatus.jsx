import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";

/**
 * 페르소나 상태 그래프 컴포넌트
 * @param {Object} props
 * @param {number} props.maxPersonaCount - 최대 페르소나 수 (기본값 20명)
 * @param {number} props.totalPersona - 개별 카테고리별 최대 수 (기본값 40명)
 * @param {Object} props.data - 각 카테고리별 데이터
 * @param {number} props.data.macroSegment - 매크로 세그먼트 페르소나 수
 * @param {number} props.data.uniqueUser - 고유 사용자 페르소나 수
 * @param {number} props.data.stakeholder - 이해관계자 페르소나 수
 * @param {number} props.data.myPersona - 내 페르소나 수
 */
const FavoritePersonaStatus = ({
  maxPersonaCount = 20, // 최대 페르소나 수 (기본값 20명)
  totalPersona = {
    macroSegment: 4,
    uniqueUser: 2,
    stakeholder: 5,
    myPersona: 1,
  }, // 개별 카테고리별 최대 수 (기본값 40명)
  data = {
    macroSegment: 4,
    uniqueUser: 2,
    stakeholder: 5,
    myPersona: 1,
  },
}) => {
  // 데이터 유효성 검사 및 조정
  const [validatedData, setValidatedData] = useState({});

  useEffect(() => {
    validateAndAdjustData();
  }, [data, maxPersonaCount]);

  // 데이터 유효성 검사 및 조정 함수
  const validateAndAdjustData = () => {
    // 입력값 복사
    let adjustedData = { ...data };

    // 음수 값 제거 (0 이상으로 설정)
    Object.keys(adjustedData).forEach((key) => {
      adjustedData[key] = Math.max(0, adjustedData[key]);
    });

    // 총합 계산
    const totalValue = Object.values(adjustedData).reduce(
      (sum, value) => sum + value,
      0
    );

    // 총합이 최대값을 초과하는 경우 데이터 조정
    if (totalValue > maxPersonaCount) {
      console.warn(
        `페르소나 총합(${totalValue})이 최대값(${maxPersonaCount})을 초과했습니다. 값을 조정합니다.`
      );

      // 순서대로 각 값을 설정하며, 남은 할당량을 계산
      let remaining = maxPersonaCount;

      // macroSegment 조정
      adjustedData.macroSegment = Math.min(
        adjustedData.macroSegment,
        remaining
      );
      remaining -= adjustedData.macroSegment;

      // uniqueUser 조정
      adjustedData.uniqueUser = Math.min(adjustedData.uniqueUser, remaining);
      remaining -= adjustedData.uniqueUser;

      // stakeholder 조정
      adjustedData.stakeholder = Math.min(adjustedData.stakeholder, remaining);
      remaining -= adjustedData.stakeholder;

      // myPersona 조정 (남은 값이 있으면 할당)
      adjustedData.myPersona = Math.min(adjustedData.myPersona, remaining);
    }

    setValidatedData(adjustedData);
  };

  // 총 값 계산 (조정된 데이터 기준)
  const totalValue = Object.values(validatedData).reduce(
    (sum, value) => sum + value,
    0
  );

  // 남은 영역 계산 (최대값 - 총합)
  const remainingValue = maxPersonaCount - totalValue;

  // 데이터가 없을 경우 표시할 빈 그래프 색상
  const emptyColor = "#F7F8FA";

  // 그래프 색상 정의
  const colors = {
    macroSegment: "#02C896",
    uniqueUser: "#00A4AA",
    stakeholder: "#4358FF",
    myPersona: "#222E84",
  };

  // 전체 너비에서 간격을 제외한 실제 사용 가능한 너비 계산
  // 각 요소 사이 4px 간격과 패딩 고려
  const calculateTotalWidth = () => {
    // 값이 있는 카테고리 + 남은 영역 (있는 경우)
    const validCount = Object.values(validatedData).filter(
      (value) => value > 0
    ).length;
    const barCount = remainingValue > 0 ? validCount + 1 : validCount;

    // 간격 수는 항상 바 개수 - 1
    const gapCount = Math.max(0, barCount - 1);

    // 고정 값으로 계산하여 일관된 결과 보장
    const gapWidth = 4; // 픽셀 단위 간격
    const containerWidth = 780; // 컨테이너 너비 고정값 (px)

    // 간격이 차지하는 비율 계산
    const gapPercentage = ((gapCount * gapWidth) / containerWidth) * 100;

    // 사용 가능한 너비 (전체 - 간격)
    return 100 - gapPercentage;
  };

  // 각 섹션의 너비 계산 (그래프 상대 비율)
  const calculateWidth = (value) => {
    if (value === 0) return 0;

    const totalUsableWidth = calculateTotalWidth();
    // 전체 최대값 중 해당 값이 차지하는 비율에 사용 가능한 너비를 곱함
    const width = (value / maxPersonaCount) * totalUsableWidth;

    // 최소 너비 보장 (가시성을 위해)
    return Math.max(width, 0.5);
  };

  // 유효한 카테고리만 필터링 (값이 0보다 큰 카테고리)
  const validCategories = [
    {
      id: "macroSegment",
      name: "Macro Segment",
      value: validatedData.macroSegment || 0,
      color: colors.macroSegment,
    },
    {
      id: "uniqueUser",
      name: "Unique User",
      value: validatedData.uniqueUser || 0,
      color: colors.uniqueUser,
    },
    {
      id: "stakeholder",
      name: "Stakeholder",
      value: validatedData.stakeholder || 0,
      color: colors.stakeholder,
    },
    {
      id: "myPersona",
      name: "My Persona",
      value: validatedData.myPersona || 0,
      color: colors.myPersona,
    },
  ].filter((category) => category.value > 0);

  // 모든 카테고리 (표시용)
  const allCategories = [
    {
      id: "macroSegment",
      name: "Macro Segment",
      value: validatedData.macroSegment || 0,
      color: colors.macroSegment,
    },
    {
      id: "uniqueUser",
      name: "Unique User",
      value: validatedData.uniqueUser || 0,
      color: colors.uniqueUser,
    },
    {
      id: "stakeholder",
      name: "Stakeholder",
      value: validatedData.stakeholder || 0,
      color: colors.stakeholder,
    },
    {
      id: "myPersona",
      name: "My Persona",
      value: validatedData.myPersona || 0,
      color: colors.myPersona,
    },
  ];

  return (
    <Container>
      {/* 헤더 정보 */}
      <HeaderBox>
        <Title>Favorite Persona</Title>
        <TotalCount>{totalValue}명</TotalCount>
      </HeaderBox>

      {/* 그래프 영역 */}
      <ContentWrapper>
        {/* 그래프 바 */}
        <GraphBarContainer className="graph-bar-container">
          <GraphBarBackground>
            <GraphBarWrapper>
              {/* 활성화된 그래프 바 */}
              {validCategories.map((category, index) => {
                const value = category.value;
                const width = calculateWidth(value);
                return (
                  width > 0 && (
                    <GraphBar
                      key={category.id}
                      width={width}
                      color={category.color}
                      data-value={value}
                    />
                  )
                );
              })}

              {/* 남은 그래프 바 */}
              {remainingValue > 0 && (
                <GraphBar
                  width={calculateWidth(remainingValue)}
                  color="#F7F8FA"
                  data-value={remainingValue}
                />
              )}
            </GraphBarWrapper>
          </GraphBarBackground>
        </GraphBarContainer>

        {/* 범례 및 상세 정보 */}
        <LegendContainer>
          {allCategories.map((category, index) => (
            <React.Fragment key={category.id}>
              {index > 0 && <Divider />}
              <CategoryItem>
                <CategoryInfo>
                  <ColorIndicator color={category.color} />
                  <CategoryName>{category.name}</CategoryName>
                </CategoryInfo>
                <CategoryValue>
                  <ValueNumber>{category.value}</ValueNumber>
                  <ValueUnit>/ {totalPersona[category.id]}명</ValueUnit>
                </CategoryValue>
              </CategoryItem>
            </React.Fragment>
          ))}
        </LegendContainer>
      </ContentWrapper>
    </Container>
  );
};

// 스타일 컴포넌트
const Container = styled.div`
  width: 1030px;
  height: 180px;
  display: flex;
  flex-direction: row;
  gap: 32px;
  padding: 20px;
  background-color: ${palette.white};
  border: 1px solid ${palette.outlineGray};
  border-radius: 10px;
`;

const HeaderBox = styled.div`
  width: 180px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 20px;
  background-color: #f7f8fa;
  border-radius: 5px;
`;

const Title = styled.div`
  font-family: 'Pretendard', 'Poppins';

  font-size: 16px;
  font-weight: 400;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: #666666;
`;

const TotalCount = styled.div`
  font-family: 'Poppins', 'Pretendard';

  font-size: 32px;
  font-weight: 600;
  line-height: 1.2em;
  letter-spacing: -0.03em;
  color: #666666;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const GraphBarContainer = styled.div`
  width: 100%;
  margin-bottom: 0px;
`;

const GraphBarBackground = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 0 4px;
`;

const GraphBarWrapper = styled.div`
  display: flex;
  height: 38px;
  width: 100%;
  gap: 4px;
`;

const GraphBar = styled.div`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${(props) => props.color};
  border-radius: 10px;
  flex-shrink: 0;
  transition: width 0.3s ease-in-out;
  min-width: ${(props) => (props.width > 0 ? "8px" : "0")};
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 180px;
  padding: 12px;
`;

const CategoryInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const ColorIndicator = styled.div`
  width: 16px;
  height: 16px;
  background-color: ${(props) => props.color};
  border-radius: 2px;
`;

const CategoryName = styled.div`
  font-family: 'Pretendard', 'Poppins';

  font-size: 16px;
  font-weight: 400;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: #666666;
`;

const CategoryValue = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 6px;
  line-height: 1.3em;
  letter-spacing: -0.03em;
  color: #666666;
`;

const ValueNumber = styled.span`
  font-family: 'Poppins', 'Pretendard';
  font-size: 24px;
  font-weight: 600;
`;

const ValueUnit = styled.span`
  font-family: 'Pretendard', 'Poppins';
  font-size: 14px;
  font-weight: 400;
`;

const Divider = styled.div`
  width: 1px;
  height: 58px;
  background-color: ${palette.outlineGray};
`;

export default FavoritePersonaStatus;
