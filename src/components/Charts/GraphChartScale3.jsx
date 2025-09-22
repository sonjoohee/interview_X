// src/components/Charts/GraphChartScale4.jsx
// src/components/Charts/GraphChartScale3.jsx
import React from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { QUICK_SURVEY_STATIC_DATA } from "../../pages/AtomStates";

const GraphChartScale3 = () => {
  const [quickSurveyStaticData] = useAtom(QUICK_SURVEY_STATIC_DATA);

  const getDataFromQuickSurveyStaticData = (quickSurveyStaticData) => {
    const option1Key = Object.keys(quickSurveyStaticData)[0];
    const option2Key = Object.keys(quickSurveyStaticData)[1];
    const option3Key = Object.keys(quickSurveyStaticData)[2];

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

  // 옵션의 총합 값 가져오기
  const barWidth1 = getBarWidth(
    quickSurveyStaticData[Object.keys(quickSurveyStaticData)[0]]["전체총합"]
  );
  const barWidth2 = getBarWidth(
    quickSurveyStaticData[Object.keys(quickSurveyStaticData)[1]]["전체총합"]
  );
  const barWidth3 = getBarWidth(
    quickSurveyStaticData[Object.keys(quickSurveyStaticData)[2]]["전체총합"]
  );

  const barWidths = [barWidth1, barWidth2, barWidth3];
  const importanceLabels = [1, 2, 3];
  const importanceOptions = [
    Object.keys(quickSurveyStaticData)[0],
    Object.keys(quickSurveyStaticData)[1],
    Object.keys(quickSurveyStaticData)[2],
  ];
  
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
          <ImportanceLabelsColumn>
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
              {importanceOptions.map((option, index) => (
                <ImportanceLabel key={`label-${index}`}>
                  {`${importanceLabels[index]}`}
                </ImportanceLabel>
              ))}
            </ImportanceLabelsColumnIndex>
          </ImportanceLabelsColumn>
          
          <BarsColumn>
            {importanceLabels.map((_, index) => {
              return (
                <div
                  key={`bar-container-${index}`}
                  style={{ position: "relative" }}
                >
                  <ImportanceBar
                    key={`bar-${index}`}
                    width={barWidths[index]}
                  />
                  <BarValue width={barWidths[index]}>
                    {index === 0
                      ? data.a[0] + data.a[1]
                      : index === 1
                      ? data.b[0] + data.b[1]
                      : data.c[0] + data.c[1]}
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
  overflow: visible;
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
  height: 120px; /* 중요도 라벨 3개(16px) + 간격 2개(25px) = 48px + 72px = 120px */
`;

const VerticalLine = styled.div`
  position: absolute;
  height: 335px;
  width: 1px;
  background-color: #e0e4eb;
  left: 303px;
  top: -130px;
  z-index: 1;
`;

const RightVerticalLine = styled.div`
  position: absolute;
  height: 335px;
  width: 1px;
  background-color: #e0e4eb;
  left: calc(303px + 55px * 2 + 4px);
  top: -130px;
  z-index: 1;
`;

const ImportanceContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 291px;
  height: 100%;
`;

const ImportanceLabelsColumn = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 25px;
  z-index: 1;
  top: 0;
`;

const ImportanceLabelsColumnIndex = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 25px;
  left: 20px;
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
  background-color: transparent;
  border-bottom: 1px dashed #e0e4eb;
  height: 1px;
`;

export default GraphChartScale3;