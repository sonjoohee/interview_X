import React from "react";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";
import { useAtom } from "jotai";
import { QUICK_SURVEY_STATIC_DATA } from "../../pages/AtomStates";

// 컴포넌트 이름 변경
const BarChartLikertScale4 = ({
  onOptionSelect = () => {},
  onOptionSelectIndex = () => {},
  onBarClick,
}) => {
  const [quickSurveyStaticData] = useAtom(QUICK_SURVEY_STATIC_DATA);

  const calculatePercentage = (value, total) => {
    return Math.round((value / total) * 100);
  };

  const processData = () => {
    const total = quickSurveyStaticData["총합"]["전체총합"] || 0;

    // 4개 항목만 사용
    return [
      {
        category: Object.keys(quickSurveyStaticData)[0] || "0",
        value: calculatePercentage(
          quickSurveyStaticData[Object.keys(quickSurveyStaticData)[0]][
            "전체총합"
          ],
          total
        ),
      },
      {
        category: Object.keys(quickSurveyStaticData)[1] || "0",
        value: calculatePercentage(
          quickSurveyStaticData[Object.keys(quickSurveyStaticData)[1]][
            "전체총합"
          ],
          total
        ),
      },
      {
        category: Object.keys(quickSurveyStaticData)[2] || "0",
        value: calculatePercentage(
          quickSurveyStaticData[Object.keys(quickSurveyStaticData)[2]][
            "전체총합"
          ],
          total
        ),
      },
      {
        category: Object.keys(quickSurveyStaticData)[3] || "0",
        value: calculatePercentage(
          quickSurveyStaticData[Object.keys(quickSurveyStaticData)[3]][
            "전체총합"
          ],
          total
        ),
      },
    ];
  };

  const data = processData();

  return (
    <GraphContainer>
      <BarContainer>
        {data.map((item, index) => (
          <CategoryItem
            key={index}
            onClick={() => {
              onOptionSelect(item.category || "0");
              onOptionSelectIndex(index + 1);
              if (onBarClick) onBarClick();
            }}
          >
            <BarGroup>
              <BarBackground />

              <BarFill width={item.value} />
              <BarValue width={item.value}>{item.value}%</BarValue>
            </BarGroup>
            <CategoryLabel>
              {/* 1-4까지만 표시 */}
              {index === 0
                ? "1"
                : index === 1
                ? "2"
                : index === 2
                ? "3"
                : "4"}
            </CategoryLabel>
            <SubCategoryLabel>{item.category || "더미데이터"}</SubCategoryLabel>
          </CategoryItem>
        ))}
      </BarContainer>
    </GraphContainer>
  );
};

// 컴포넌트 이름 변경
export default BarChartLikertScale4;

const GraphContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  gap: 66px; // 간격 66 px로 변경
  height: 320px;
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 60px;
  width: auto;
  max-width: 100%;
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100px; // 너비 100px로 변경
  cursor: pointer;
`;

const BarGroup = styled.div`
  position: relative;
  width: 102px; // 너비 102px로 변경
  height: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  border-radius: 5px;
`;

// 나머지 스타일 컴포넌트는 동일하게 유지
const BarBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 5px;
`;

const BarFill = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${(props) => props.width}%;
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

const CategoryLabel = styled.div`
  font-family: "Pretendard", "Poppins";
  font-weight: 400;
  font-size: 14px;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  text-align: center;
  color: #666666;
  width: 100%;
`;

const SubCategoryLabel = styled.div`
  font-family: "Pretendard", "Poppins";
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5em;
  letter-spacing: -0.03em;
  text-align: center;
  color: #666666;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: -22px;
  padding-top: 5px;
`;
