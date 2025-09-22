import React from "react";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";
import { useAtom } from "jotai";
import { QUICK_SURVEY_STATIC_DATA } from "../../pages/AtomStates";

const BarChartLikertScale3 = ({
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

    // 3개 항목만 사용
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
    ];
  };

  const data = processData();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <GraphContainer>
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
              {/* 1-3까지만 표시 */}
              {index === 0 ? "1" : index === 1 ? "2" : "3"}
            </CategoryLabel>
            <SubCategoryLabel>{item.category || "더미데이터"}</SubCategoryLabel>
          </CategoryItem>
        ))}
      </GraphContainer>
    </div>
  );
};

export default BarChartLikertScale3;

const GraphContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 110px; // 간격 110px로 변경
  height: 320px;
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 118px; // 너비 118px로 변경
  cursor: pointer;
`;

const BarGroup = styled.div`
  position: relative;
  width: 118px; // 너비 118px로 변경
  height: 110px;
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