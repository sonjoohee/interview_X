import React from "react";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";
import { useAtom } from "jotai";
import { QUICK_SURVEY_STATIC_DATA } from "../../pages/AtomStates";
import { QUICK_SURVEY_SURVEY_METHOD } from "../../pages/AtomStates";

const ABGraph = ({
  onOptionSelect = () => {},
  onOptionSelectIndex = () => {},
  onBarClick,
}) => {
  const [quickSurveyStaticData] = useAtom(QUICK_SURVEY_STATIC_DATA);
  const [quickSurveySurveyMethod] = useAtom(QUICK_SURVEY_SURVEY_METHOD);

  const getBarHeight = (value) => {
    // console.log("getBarHeight value:", value);
    // 최소 높이와 최대 높이 설정
    const minHeight = 0;
    const maxHeight = 200;

    // 백분율 값에 따라 선형적으로 높이 계산
    // 0%일 때 minHeight, 100%일 때 maxHeight가 되도록 설정
    const height = minHeight + (value / 100) * (maxHeight - minHeight);
    // console.log("getBarHeight height:", height);
    // 소수점 반올림하여 정수 값 반환
    return Math.round(height);
  };

  // 백분율 계산 함수
  const calculatePercentage = (value, total) => {
    return Math.round((value / total) * 100);
  };

  // 데이터 계산
  const getABData = () => {
    const totalSum = quickSurveyStaticData["총합"]["전체총합"] || 0;
    const aValue =
      quickSurveyStaticData[Object.keys(quickSurveyStaticData)[0]][
        "전체총합"
      ] || 0;
    const bValue =
      quickSurveyStaticData[Object.keys(quickSurveyStaticData)[1]][
        "전체총합"
      ] || 0;

    return {
      a: calculatePercentage(aValue, totalSum),
      b: calculatePercentage(bValue, totalSum),
    };
  };

  const calculatedData = getABData();

  return (
    <GraphContainer>
      <BarContainer>
        <BarWrapper>
          <BarItem
            onClick={() => {
              onOptionSelect(quickSurveySurveyMethod.options[0] || "A");
              onOptionSelectIndex("A");
              onBarClick();
            }}
          >
            <BarGroup>
              <BarBackground />
              <BarFill height={getBarHeight(calculatedData.a)} />
              <BarValue>{calculatedData.a}%</BarValue>
            </BarGroup>
            <BarLabel>A</BarLabel>
            <BarSubtitle>{Object.keys(quickSurveyStaticData)[0]}</BarSubtitle>
          </BarItem>
        </BarWrapper>

        <BarWrapper>
          <BarItem
            onClick={() => {
              onOptionSelect(quickSurveySurveyMethod.options[1] || "B");
              onOptionSelectIndex("B");
              onBarClick();
            }}
          >
            <BarGroup>
              <BarBackground />
              <BarFill height={getBarHeight(calculatedData.b)} />
              <BarValue>{calculatedData.b}%</BarValue>
            </BarGroup>
            <BarLabel>B</BarLabel>
            <BarSubtitle>{Object.keys(quickSurveyStaticData)[1]}</BarSubtitle>
          </BarItem>
        </BarWrapper>
      </BarContainer>
    </GraphContainer>
  );
};

const GraphContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  min-height: 380px;
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  gap: 272px;
`;

const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 240px;
`;

const BarItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const BarGroup = styled.div`
  position: relative;
  width: 143px;
  height: ${(props) => props.height || 200}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  border-radius: 5px;
`;

const BarBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${palette.background};
  border-radius: 5px;
`;

const BarFill = styled.div`
  width: 143px;
  height: ${(props) => props.height}px;
  background-color: ${palette.primary};
  border-radius: 5px;
`;

const BarValue = styled.span`
  position: absolute;
  top: -30px; /* 바 상단으로부터 위쪽 간격 */
  left: 0;
  width: 100%;
  font-family: "Pretendard", "Poppins";
  font-weight: 600;
  font-size: 20px;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: ${palette.primary};
  text-align: center;
`;

const BarLabel = styled.span`
  font-family: "Pretendard", "Poppins";
  font-weight: 400;
  font-size: 16px;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: #666666;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 0;
`;

const BarSubtitle = styled.span`
  font-family: "Pretendard", "Poppins";
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
  letter-spacing: -0.03em;
  color: #666666;
  text-align: center;
  max-width: 240px;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  word-break: keep-all;
  padding: 0;
  box-sizing: border-box;
  overflow-y: auto;
`;

export default ABGraph;
