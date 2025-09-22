import React from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { QUICK_SURVEY_STATIC_DATA } from "../../pages/AtomStates";

const GraphChartScale5 = () => {
  const [quickSurveyStaticData] = useAtom(QUICK_SURVEY_STATIC_DATA);

  const getDataFromQuickSurveyStaticData = (quickSurveyStaticData) => {
    const option1Key = Object.keys(quickSurveyStaticData)[0];
    const option2Key = Object.keys(quickSurveyStaticData)[1];
    const option3Key = Object.keys(quickSurveyStaticData)[2];
    const option4Key = Object.keys(quickSurveyStaticData)[3];
    const option5Key = Object.keys(quickSurveyStaticData)[4];

    return {
      a: [
        quickSurveyStaticData[option1Key]["성별"]["남성"],
        quickSurveyStaticData[option1Key]["성별"]["여성"],
        quickSurveyStaticData[option1Key]["연령대"]["10대"],
        quickSurveyStaticData[option1Key]["연령대"]["20대"],
        quickSurveyStaticData[option1Key]["연령대"]["30대"],
        quickSurveyStaticData[option1Key]["연령대"]["40대"],
        quickSurveyStaticData[option1Key]["연령대"]["50대"],
        quickSurveyStaticData[option1Key]["연령대"]["60대 이상"],
      ],
      b: [
        quickSurveyStaticData[option2Key]["성별"]["남성"],
        quickSurveyStaticData[option2Key]["성별"]["여성"],
        quickSurveyStaticData[option2Key]["연령대"]["10대"],
        quickSurveyStaticData[option2Key]["연령대"]["20대"],
        quickSurveyStaticData[option2Key]["연령대"]["30대"],
        quickSurveyStaticData[option2Key]["연령대"]["40대"],
        quickSurveyStaticData[option2Key]["연령대"]["50대"],
        quickSurveyStaticData[option2Key]["연령대"]["60대 이상"],
      ],
      c: [
        quickSurveyStaticData[option3Key]["성별"]["남성"],
        quickSurveyStaticData[option3Key]["성별"]["여성"],
        quickSurveyStaticData[option3Key]["연령대"]["10대"],
        quickSurveyStaticData[option3Key]["연령대"]["20대"],
        quickSurveyStaticData[option3Key]["연령대"]["30대"],
        quickSurveyStaticData[option3Key]["연령대"]["40대"],
        quickSurveyStaticData[option3Key]["연령대"]["50대"],
        quickSurveyStaticData[option3Key]["연령대"]["60대 이상"],
      ],
      d: [
        quickSurveyStaticData[option4Key]["성별"]["남성"],
        quickSurveyStaticData[option4Key]["성별"]["여성"],
        quickSurveyStaticData[option4Key]["연령대"]["10대"],
        quickSurveyStaticData[option4Key]["연령대"]["20대"],
        quickSurveyStaticData[option4Key]["연령대"]["30대"],
        quickSurveyStaticData[option4Key]["연령대"]["40대"],
        quickSurveyStaticData[option4Key]["연령대"]["50대"],
        quickSurveyStaticData[option4Key]["연령대"]["60대 이상"],
      ],
      e: [
        quickSurveyStaticData[option5Key]["성별"]["남성"],
        quickSurveyStaticData[option5Key]["성별"]["여성"],
        quickSurveyStaticData[option5Key]["연령대"]["10대"],
        quickSurveyStaticData[option5Key]["연령대"]["20대"],
        quickSurveyStaticData[option5Key]["연령대"]["30대"],
        quickSurveyStaticData[option5Key]["연령대"]["40대"],
        quickSurveyStaticData[option5Key]["연령대"]["50대"],
        quickSurveyStaticData[option5Key]["연령대"]["60대 이상"],
      ],
    };
  };

  const data = getDataFromQuickSurveyStaticData(quickSurveyStaticData);

  // 바의 너비를 계산하는 함수 - 백분율 값에 따라 가변적으로 설정
  const calculateBarWidth = (index) => {
    const total = quickSurveyStaticData["총합"]["전체총합"];
    const optionKey = Object.keys(quickSurveyStaticData)[index];
    const value = quickSurveyStaticData[optionKey]["전체총합"];

    // 백분율 계산
    const percentage = Math.round((value / total) * 100);

    return percentage;
  };
  // 그래프 바 너비 계산 - 백분율 값에 따라 가변적으로 설정
  const getBarWidth = (value) => {
    const total = quickSurveyStaticData["총합"]["전체총합"];
    // 최소 너비와 최대 너비 설정
    const minWidth = 0;
    const maxWidth = 100;

    // 백분율 값에 따라 선형적으로 너비 계산
    // 0%일 때 minWidth, 100%일 때 maxWidth가 되도록 설정
    const width = minWidth + (value / total) * (maxWidth - minWidth);

    // 소수점 반올림하여 정수 값 반환
    return Math.round(width);
  };

  // A와 B 옵션의 총합 값 가져오기
  const barWidth1 = getBarWidth(
    quickSurveyStaticData[Object.keys(quickSurveyStaticData)[0]]["전체총합"]
  );
  const barWidth2 = getBarWidth(
    quickSurveyStaticData[Object.keys(quickSurveyStaticData)[1]]["전체총합"]
  );
  const barWidth3 = getBarWidth(
    quickSurveyStaticData[Object.keys(quickSurveyStaticData)[2]]["전체총합"]
  );
  const barWidth4 = getBarWidth(
    quickSurveyStaticData[Object.keys(quickSurveyStaticData)[3]]["전체총합"]
  );
  const barWidth5 = getBarWidth(
    quickSurveyStaticData[Object.keys(quickSurveyStaticData)[4]]["전체총합"]
  );

  const barWidths = [barWidth1, barWidth2, barWidth3, barWidth4, barWidth5];
  const importanceLabels = [1, 2, 3, 4, 5];
  const importanceOptions = [
    Object.keys(quickSurveyStaticData)[0],
    Object.keys(quickSurveyStaticData)[1],
    Object.keys(quickSurveyStaticData)[2],
    Object.keys(quickSurveyStaticData)[3],
    Object.keys(quickSurveyStaticData)[4],
  ]; // A, B를 레이블로 사용
  return (
    <ChartContainer>
      <HeaderSection>
        <HeaderRow>
          <CategoryHeader>
            <EmptySpace />
            <CategoryLabels>
              <CategoryItem>보기</CategoryItem>
              <CategoryItem>계</CategoryItem>
            </CategoryLabels>
          </CategoryHeader>
          <CategoriesWrapper>
            <GenderSection>
              <GenderHeader>
                <GenderText>성별</GenderText>
                <GenderLine />
              </GenderHeader>
              <GenderItems>
                <DemographicItem>남</DemographicItem>
                <DemographicItem>여</DemographicItem>
              </GenderItems>
            </GenderSection>
            <AgeSection>
              <AgeHeader>
                <AgeText>나이(10세 단위)</AgeText>
                <AgeLine />
              </AgeHeader>
              <AgeItems>
                <DemographicItem>10대</DemographicItem>
                <DemographicItem>20대</DemographicItem>
                <DemographicItem>30대</DemographicItem>
                <DemographicItem>40대</DemographicItem>
                <DemographicItem>50대</DemographicItem>
                <DemographicItem>
                  60대
                  <br />
                  이상
                </DemographicItem>
              </AgeItems>
            </AgeSection>
          </CategoriesWrapper>
        </HeaderRow>
        <HorizontalLine marginTop="16px" marginBottom="0" fullWidth />
      </HeaderSection>

      <DataSection>
        <VerticalLine />
        <RightVerticalLine />
        <ImportanceContainer>
          {/* <ImportanceLabelsColumn>
            {Object.keys(quickSurveyStaticData)
              .slice(0, 5)
              .map((label, index) => (
                <ImportanceLabel key={`label-${index}`}>
                  {label}
                </ImportanceLabel>
              ))}
          </ImportanceLabelsColumn> */}
          <ImportanceLabelsColumn>
            {/* Render importance options and labels together */}
            {importanceOptions.map((option, index) => (
              <ImportanceLabel key={`label-${index}`}>
                <span
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {option}
                </span>
              </ImportanceLabel>
            ))}
            <ImportanceLabelsColumnIndex>
              {/* Render importance options and labels together */}
              {importanceOptions.map((option, index) => (
                <ImportanceLabel key={`label-${index}`}>
                  {`${importanceLabels[index]}`}
                </ImportanceLabel>
              ))}
              {/* Remove the separate mapping for importanceLabels if it existed or was commented out */}
            </ImportanceLabelsColumnIndex>
            {/* Remove the separate mapping for importanceLabels if it existed or was commented out */}
          </ImportanceLabelsColumn>
          {/* <BarsColumn>
            {importanceLabels.map((_, index) => {
              const barWidth = Math.min(70, calculateBarWidth(index));
              return (
                <div
                  key={`bar-container-${index}`}
                  style={{ position: "relative" }}
                >
                  <ImportanceBar key={`bar-${index}`} width={barWidth} />
                  <BarValue>
                    {index === 0
                      ? data.a[0] + data.a[1]
                      : index === 1
                      ? data.b[0] + data.b[1]
                      : index === 2
                      ? data.c[0] + data.c[1]
                      : index === 3
                      ? data.d[0] + data.d[1]
                      : data.e[0] + data.e[1]}
                  </BarValue>
                </div>
              );
            })}
          </BarsColumn> */}
          <BarsColumn>
            {importanceLabels.map((_, index) => {
              // Assuming importanceLabels ('A', 'B') map directly to barWidths and sums
              return (
                <div
                  key={`bar-container-${index}`}
                  style={{ position: "relative" }}
                >
                  <ImportanceBar
                    key={`bar-${index}`}
                    width={barWidths[index]}
                  />
                  {/* Restore original BarValue positioning and content */}
                  <BarValue width={barWidths[index]}>
                    {index === 0
                      ? data.a[0] + data.a[1]
                      : index === 1
                      ? data.b[0] + data.b[1]
                      : index === 2
                      ? data.c[0] + data.c[1]
                      : index === 3
                      ? data.d[0] + data.d[1]
                      : data.e[0] + data.e[1]}
                  </BarValue>
                </div>
              );
            })}
          </BarsColumn>
        </ImportanceContainer>

        <DataRowsContainer>
          {Object.keys(data).map((key, rowIndex) => (
            <React.Fragment key={`row-${key}`}>
              <DataRowGroup>
                <DataRowValues>
                  {data[key].map((value, index) => (
                    <DataCell key={`${key}-${index}`}>{value}</DataCell>
                  ))}
                </DataRowValues>
              </DataRowGroup>
              {rowIndex < Object.keys(data).length - 1 && (
                <DataSectionHorizontalLine />
              )}
            </React.Fragment>
          ))}
        </DataRowsContainer>
      </DataSection>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  padding: 28px 24px 24px 24px;
  border: 1px solid #e0e4eb;
  border-radius: 10px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 820px;
  box-sizing: border-box;
  position: relative;
  overflow: visible; /* 세로 라인이 컨테이너 밖으로 나갈 수 있게 변경 */
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  width: 291px;
  padding-left: 0;
`;

const EmptySpace = styled.div`
  width: 0;
`;

const CategoryLabels = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 160px;
  margin-left: 40px;
  gap: 0;
  position: relative;
`;

const CategoryItem = styled.div`
  font-family: "Pretendard", "Poppins";
  font-weight: 700;
  font-size: 14px;
  line-height: 1.2;
  text-align: center;
  letter-spacing: -0.03em;
  color: #323232;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  &:first-child {
    box-sizing: border-box;
    min-width: 25px;
    width: 25px;
    text-align: center;
    justify-content: center;
    padding: 0;
    margin-left: 20px;
  }
  &:last-child {
    width: 62px;
    margin-left: 140px;
  }
`;

const CategoriesWrapper = styled.div`
  display: flex;
  margin-left: 12px;
  gap: 4px;
  align-items: flex-end;
  width: 455px;
`;

const GenderSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const GenderHeader = styled.div`
  position: absolute;
  top: -30px;
  left: 0;
  width: 114px; /* 남성, 여성 컬럼 너비 합계 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const GenderText = styled.div`
  font-family: "Pretendard", "Poppins";
  font-weight: 700;
  font-size: 14px;
  line-height: 1.2;
  text-align: center;
  letter-spacing: -0.03em;
  color: #323232;
  padding-top: 6px;
`;

const GenderLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e4eb;
  margin-top: 12px;
`;

const GenderItems = styled.div`
  display: flex;
  gap: 4px;
`;

const AgeSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const AgeHeader = styled.div`
  position: absolute;
  top: -30px;
  left: 0;
  width: 338px; /* 10대~60대 이상 컬럼 너비 합계 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const AgeText = styled.div`
  font-family: "Pretendard", "Poppins";
  font-weight: 700;
  font-size: 14px;
  line-height: 1.2;
  text-align: center;
  letter-spacing: -0.03em;
  color: #323232;
  padding-top: 6px;
`;

const AgeLine = styled.div`
  width: 378px;
  height: 1px;
  background-color: #e0e4eb;
  margin-left: 30px;
  margin-top: 12px;
`;

const AgeItems = styled.div`
  display: flex;
  gap: 4px;
`;

const DemographicItem = styled.div`
  width: 55px;
  font-family: "Pretendard", "Poppins";
  font-weight: 700;
  font-size: 14px;
  line-height: 1.2;
  text-align: center;
  letter-spacing: -0.03em;
  color: #323232;
  white-space: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding-top: 40px;
`;

const HorizontalLine = styled.div`
  width: ${(props) => (props.fullWidth ? "calc(100% + 48px)" : "100%")};
  height: 1px;
  background-color: #e0e4eb;
  margin-top: ${(props) => props.marginTop || "4px"};
  margin-bottom: ${(props) => props.marginBottom || "4px"};
  margin-left: ${(props) => (props.fullWidth ? "-24px" : "0")};
  position: ${(props) => (props.fullWidth ? "relative" : "static")};
`;

const DataSection = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  height: 180px; /* 중요도 라벨 5개(16px) + 간격 4개(25px) = 80px + 100px = 180px */
`;

const VerticalLine = styled.div`
  position: absolute;
  height: 335px; /* 원래 지정된 335px 유지 */
  width: 1px;
  background-color: #e0e4eb; /* 테두리와 동일한 색상으로 변경 */
  left: 303px; /* ImportanceContainer 너비(291px) + 약간의 간격(12px) */
  top: -130px; /* -132px에서 2px 아래로 이동 */
  z-index: 1;
`;

const RightVerticalLine = styled.div`
  position: absolute;
  height: 335px; /* 원래 지정된 335px 유지 */
  width: 1px;
  background-color: #e0e4eb; /* 테두리와 동일한 색상으로 변경 */
  left: calc(
    303px + 55px * 2 + 4px
  ); /* 왼쪽 세로선(303px) + 남성 열 너비(55px) + 여성 열 너비(55px) + 간격(4px) */
  top: -130px; /* -132px에서 2px 아래로 이동 */
  z-index: 1;
`;

const ImportanceContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 291px;
  height: 100%;
`;

// const ImportanceLabelsColumn = styled.div`
//   position: absolute;
//   display: flex;
//   flex-direction: column;
//   gap: 25px;
//   left: 120px;
//   transform: translateX(-100%);
//   z-index: 1;
//   top: 0;
// `;

const ImportanceLabelsColumn = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 25px; // Restore original gap
  /* left: 50px; // Restore original position */
  /* transform: translateX(-80%); // Restore original transform */
  z-index: 1;
  top: 0;
`;

const ImportanceLabelsColumnIndex = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 25px; // Restore original gap
  left: 20px; // Restore original position
  /* transform: translateX(-20%); // Restore original transform */
  z-index: 1;
  top: 0;
`;

const ImportanceLabel = styled.div`
  font-family: "Pretendard", "Poppins";
  font-weight: 400;
  font-size: 14px;
  line-height: 1.55;
  letter-spacing: -0.03em;
  color: #666666;
  width: 130px;
  text-align: right;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0;
`;

const BarsColumn = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 25px;
  left: 160px;
  top: 0;
`;

const calculateBarWidth = (index) => {
  // 중요도 순서대로 막대 너비 반환 (최대값 70px로 조정)
  const barWidths = [70, 60, 50, 40, 30]; // 최대 너비 70px로 조정
  return barWidths[index] || 50; // 기본값 50px
};

const ImportanceBar = styled.div`
  height: 16px;
  width: ${(props) => props.width}px;
  background-color: #226fff;
  border-radius: 2px;
  display: flex;
  align-items: center;
`;

const BarValue = styled.div`
  font-family: "Pretendard", "Poppins";
  font-weight: 400;
  font-size: 14px;
  line-height: 1;
  text-align: right;
  letter-spacing: -0.03em;
  color: #226fff;
  position: absolute;
  /* right: -80px; */
  left: 100px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 30px;
`;

const DataRowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  position: absolute;
  left: 303px;
  width: 455px;
  top: 0;
`;

const DataRowGroup = styled.div`
  display: flex;
  width: 100%;
  height: 16px;
`;

const DataRowValues = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 55px) 58px;
  gap: 4px;
  align-items: center;
  height: 16px;
  margin-left: 0;
  width: 455px;
  justify-content: start;
`;

const DataCell = styled.div`
  font-family: "Pretendard", "Poppins";
  font-weight: 400;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.03em;
  color: #666666;
  text-align: center;
  width: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DataSectionHorizontalLine = styled(HorizontalLine)`
  width: 490px;
  margin-left: 0;
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: transparent; /* 배경색 제거 */
  border-bottom: 1px dashed #e0e4eb; /* 점선 색상을 outline 색상으로 변경 */
  height: 1px;
`;

export default GraphChartScale5;
