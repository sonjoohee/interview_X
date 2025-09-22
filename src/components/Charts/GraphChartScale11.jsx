import React from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { QUICK_SURVEY_STATIC_DATA } from "../../pages/AtomStates";

const GraphChartScale11 = () => {
  const [quickSurveyStaticData] = useAtom(QUICK_SURVEY_STATIC_DATA);

  const getDataFromQuickSurveyStaticData = (quickSurveyStaticData) => {
    const result = {};
    const labels = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];

    for (let i = 0; i < 11; i++) {
      result[labels[i]] = [
        quickSurveyStaticData[i]["성별"]["남성"],
        quickSurveyStaticData[i]["성별"]["여성"],
        quickSurveyStaticData[i]["연령대"]["10대"],
        quickSurveyStaticData[i]["연령대"]["20대"],
        quickSurveyStaticData[i]["연령대"]["30대"],
        quickSurveyStaticData[i]["연령대"]["40대"],
        quickSurveyStaticData[i]["연령대"]["50대"],
        quickSurveyStaticData[i]["연령대"]["60대 이상"],
      ];
    }

    return result;
  };

  const data = getDataFromQuickSurveyStaticData(quickSurveyStaticData);

  // 바의 너비를 계산하는 함수 - 백분율 값에 따라 가변적으로 설정
  const calculateBarWidth = (index) => {
    const total = quickSurveyStaticData["총합"]["전체총합"];
    const value = quickSurveyStaticData[index]["전체총합"];

    // 백분율 계산
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

    return percentage;
  };

  return (
    <ChartContainer>
      <HeaderSection>
        <HeaderRow>
          <CategoryHeader>
            <EmptySpace />
            <CategoryLabels>
              <CategoryItem>점수</CategoryItem>
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
            {importanceLabels.map((label, index) => (
              <ImportanceLabel key={`label-${index}`}>{label}</ImportanceLabel>
            ))}
          </ImportanceLabelsColumn>

          <BarsColumn>
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
                      : index === 4
                      ? data.e[0] + data.e[1]
                      : index === 5
                      ? data.f[0] + data.f[1]
                      : index === 6
                      ? data.g[0] + data.g[1]
                      : index === 7
                      ? data.h[0] + data.h[1]
                      : index === 8
                      ? data.i[0] + data.i[1]
                      : index === 9
                      ? data.j[0] + data.j[1]
                      : data.k[0] + data.k[1]}
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

const importanceLabels = [
  "(전혀 추천하지 않음) 0점",
  "1점",
  "2점",
  "3점",
  "4점",
  "5점",
  "6점",
  "7점",
  "8점",
  "9점",
  "(매우 추천함) 10점",
];

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
  margin-left: 60px;
  gap: 0;
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
  height: 44px;
  &:first-child {
    width: 60px;
  }
  &:last-child {
    width: 62px;
    margin-left: 110px;
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
  padding-top: 18px;
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
  margin-top: 36px;
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
  padding-top: 18px;
`;

const AgeLine = styled.div`
  width: 378px;
  height: 1px;
  background-color: #e0e4eb;
  margin-left: 26px;
  margin-top: 12px;
`;

const AgeItems = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 36px;
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
  padding-top: 8px;
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
  height: 426px; /* 중요도 라벨 11개(16px) + 간격 10개(25px) = 176px + 250px = 426px */
`;

const VerticalLine = styled.div`
  position: absolute;
  height: calc(
    100% + 130px + 24px + 17px
  ); /* DataSection 높이(100%) + 상단 확장(130px) + 하단 패딩(24px) + 추가 높이(17px) */
  width: 1px;
  background-color: #e0e4eb;
  left: 303px;
  top: -147px; /* 기존 -130px에서 17px 더 위로 확장 */
  z-index: 1;
`;

const RightVerticalLine = styled.div`
  position: absolute;
  height: calc(
    100% + 130px + 24px + 17px
  ); /* DataSection 높이(100%) + 상단 확장(130px) + 하단 패딩(24px) + 추가 높이(17px) */
  width: 1px;
  background-color: #e0e4eb;
  left: calc(
    303px + 55px * 2 + 4px
  ); /* 왼쪽 세로선(303px) + 남성 열 너비(55px) + 여성 열 너비(55px) + 간격(4px) */
  top: -147px; /* 기존 -130px에서 17px 더 위로 확장 */
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
  left: 50px;
  transform: translateX(-50%);
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
  width: 140px;
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
  left: 130px;
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
  left: calc(${(props) => props.width || 70}px + 62px);
  top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  min-width: 30px;
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

export default GraphChartScale11;
