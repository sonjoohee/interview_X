import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { palette } from "../../../../../assets/styles/Palette";
import { useAtom } from "jotai";
import {
  KANO_MODEL_GRAPH_DATA,
  KANO_MODEL_REPORT_DATA,
} from "../../../../../pages/AtomStates";

/**
 * 카노 모델(Kano Model) 그래프 컴포넌트
 * x축: 필수도 (essential)
 * y축: 매력도 (attractive)
 */
const MolculeKanoModelGraph = ({ onLegendItemClick, medianValues }) => {
  const [kanoModelGraphData] = useAtom(KANO_MODEL_GRAPH_DATA);
  const [kanoModelReportData] = useAtom(KANO_MODEL_REPORT_DATA);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [hoveredIndexCode, setHoveredIndexCode] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [legendTitleTooltip, setLegendTitleTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });

  const getQuadrantNameFromReport = (title, reportData) => {
    if (!reportData) return "Indifferent";
    if (
      reportData.one_dimensional &&
      reportData.one_dimensional.includes(title)
    )
      return "One-dimensional";
    if (reportData.attractive && reportData.attractive.includes(title))
      return "Attractive";
    if (reportData.must_be && reportData.must_be.includes(title))
      return "Must-be";
    if (reportData.indifferent && reportData.indifferent.includes(title))
      return "Indifferent";
    return "Indifferent";
  };

  const processKanoDataForGraph = (graphData, medianVals) => {
    if (
      !graphData ||
      typeof graphData !== "object" ||
      Array.isArray(graphData) ||
      Object.keys(graphData).length === 0
    ) {
      return [];
    }

    const allXValues = Object.values(graphData).map((d) => d.x);
    const allYValues = Object.values(graphData).map((d) => d.y);

    // 1. 각 축의 최소값과 최대값을 구함
    const minX = Math.min(...allXValues);
    const maxX = Math.max(...allXValues);
    const minY = Math.min(...allYValues);
    const maxY = Math.max(...allYValues);

    // 2. median 값 계산 (전달받은 값이 있으면 사용, 없으면 계산)
    const medianX =
      medianVals && medianVals.x !== undefined
        ? medianVals.x
        : allXValues.sort((a, b) => a - b)[Math.floor(allXValues.length / 2)];
    const medianY =
      medianVals && medianVals.y !== undefined
        ? medianVals.y
        : allYValues.sort((a, b) => a - b)[Math.floor(allYValues.length / 2)];

    console.log("Data range - X:", minX, "to", maxX, ", median:", medianX);
    console.log("Data range - Y:", minY, "to", maxY, ", median:", medianY);

    // 3. 50:50 스케일링 함수 - median을 50%로, 범위를 5-95%로 매핑
    const scale50_50 = (value, min, max, median) => {
      // 예외 처리: 모든 값이 같은 경우
      if (max === min) return 50;

      if (value <= median) {
        // median 이하: min~median을 5~50%로 스케일링
        if (median === min) return 50;
        return 5 + ((value - min) / (median - min)) * 45;
      } else {
        // median 초과: median~max를 50~95%로 스케일링
        if (max === median) return 50;
        return 50 + ((value - median) / (max - median)) * 45;
      }
    };

    const sortedTitles = Object.keys(graphData).sort();

    const dataPoints = sortedTitles.map((title, index) => {
      const data = graphData[title];
      const { x: rawX, y: rawY } = data;

      // 4. 50:50 스케일링 적용
      let x = scale50_50(rawX, minX, maxX, medianX);
      let y = scale50_50(rawY, minY, maxY, medianY);

      // 5. 범위 보정 (5-95% 범위 내로 제한)
      x = Math.max(5, Math.min(x, 95));
      y = Math.max(5, Math.min(y, 95));

      console.log(
        `${title}: raw(${rawX}, ${rawY}) -> scaled(${x.toFixed(1)}, ${y.toFixed(
          1
        )})`
      );

      return {
        x,
        y,
        title,
        indexCode: String.fromCharCode(65 + index),
        size: 24,
      };
    });

    return dataPoints;
  };

  const [rescaledGraphData, setRescaledGraphData] = useState([]);

  useEffect(() => {
    console.log("medianValues", medianValues);
    console.log("kanoModelGraphData", kanoModelGraphData);
    const data = processKanoDataForGraph(kanoModelGraphData, medianValues);
    setRescaledGraphData(data);
    console.log("rescaledGraphData", rescaledGraphData);
  }, [kanoModelGraphData, medianValues]);

  const sortedTitles = Object.keys(kanoModelGraphData || {}).sort();

  const legendData = sortedTitles.map((title, index) => {
    const quadrantName = getQuadrantNameFromReport(title, kanoModelReportData);
    return {
      title: title,
      indexCode: String.fromCharCode(65 + index),
      quadrantName: quadrantName,
    };
  });

  const groupedLegendData = {
    Attractive: [],
    "One-dimensional": [],
    "Must-be": [],
    Indifferent: [],
  };

  legendData.forEach((item) => {
    if (groupedLegendData[item.quadrantName]) {
      groupedLegendData[item.quadrantName].push(item);
    }
  });

  // Tooltip handlers
  const handleMouseEnter = (event, title) => {
    const graphAreaRect = event.currentTarget
      .closest("[data-graph-area]")
      .getBoundingClientRect();
    const pointRect = event.currentTarget.getBoundingClientRect();

    const relativeX = pointRect.left - graphAreaRect.left + pointRect.width / 2;
    const relativeY = pointRect.top - graphAreaRect.top - 10;

    setTooltipContent(title);
    setTooltipPosition({ x: relativeX, y: relativeY });
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const handleLegendTitleEnter = (event, title) => {
    const elem = event.currentTarget;
    if (elem.offsetWidth < elem.scrollWidth) {
      const rect = elem.getBoundingClientRect();
      setLegendTitleTooltip({
        visible: true,
        content: title,
        x: rect.left,
        y: rect.top - 30,
      });
    }
  };

  const handleLegendTitleLeave = () => {
    setLegendTitleTooltip({ visible: false, content: "", x: 0, y: 0 });
  };

  return (
    <GraphWrapper>
      <GraphContainer>
        <GraphArea data-graph-area>
          <GridLineVertical position={50} />
          <GridLineHorizontal position={50} />
          <QuadrantLabel top={`25%`} left={`25%`}>
            Attractive
          </QuadrantLabel>
          <QuadrantLabel top={`75%`} left={`25%`}>
            Indifferent
          </QuadrantLabel>
          <QuadrantLabel top={`25%`} left={`75%`}>
            One-dimensional
          </QuadrantLabel>
          <QuadrantLabel top={`75%`} left={`75%`}>
            Must-be
          </QuadrantLabel>
          <LeftAxisLine />
          <LeftAxisArrow />
          <BottomAxisLine />
          <RightAxisArrow />
          {rescaledGraphData.map((point, index) => (
            <DataPoint
              key={index}
              x={point.x}
              y={point.y}
              size={point.size}
              onMouseEnter={(e) => handleMouseEnter(e, point.title)}
              onMouseLeave={handleMouseLeave}
            >
              {point.indexCode}
            </DataPoint>
          ))}
          {tooltipVisible && (
            <Tooltip
              style={{
                left: `${tooltipPosition.x}px`,
                top: `${tooltipPosition.y}px`,
              }}
            >
              {tooltipContent}
            </Tooltip>
          )}
          {legendTitleTooltip.visible &&
            ReactDOM.createPortal(
              <Tooltip
                style={{
                  position: "fixed",
                  left: `${legendTitleTooltip.x}px`,
                  top: `${legendTitleTooltip.y}px`,
                  transform: "translateX(0)",
                }}
              >
                {legendTitleTooltip.content}
              </Tooltip>,
              document.getElementById("tooltip-root")
            )}
        </GraphArea>
      </GraphContainer>
      <LegendContainer>
        <ItemsWrapper>
          {Object.entries(groupedLegendData).map(
            ([quadrantName, items]) =>
              items.length > 0 && (
                <div key={quadrantName}>
                  <QuadrantTitle
                    style={
                      quadrantName === "One-dimensional" ||
                      quadrantName === "Must-be" ||
                      quadrantName === "Indifferent"
                        ? { marginTop: "20px" }
                        : {}
                    }
                  >
                    {quadrantName}
                  </QuadrantTitle>
                  {items.map((item, idx) => (
                    <LegendItem key={idx}>
                      <span className="index-code">{item.indexCode}</span>
                      <span
                        className="item-title"
                        onMouseEnter={(e) =>
                          handleLegendTitleEnter(e, item.title)
                        }
                        onMouseLeave={handleLegendTitleLeave}
                      >
                        {item.title}
                      </span>
                      <IconButton
                        onClick={() => onLegendItemClick(item.title)}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredIndexCode(item.indexCode);
                          setHoverPos({
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }}
                        onMouseLeave={() => setHoveredIndexCode(null)}
                      >
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <mask
                            id="path-1-outside-1_3484_4572"
                            maskUnits="userSpaceOnUse"
                            x="0.599609"
                            y="7.02869"
                            width="31"
                            height="18"
                            fill="black"
                          >
                            <rect
                              fill="white"
                              x="0.599609"
                              y="7.02869"
                              width="31"
                              height="18"
                            />
                            <path d="M24 8.02869C27.5346 8.02869 30.4004 10.8945 30.4004 14.4291C30.4002 17.9635 27.5345 20.8285 24 20.8285H22.7793L17.1123 23.9506C16.9717 24.0279 16.8177 23.8731 16.8955 23.7328L18.5088 20.8285H8C4.4655 20.8285 1.59981 17.9635 1.59961 14.4291C1.59961 10.8945 4.46538 8.02869 8 8.02869H24Z" />
                          </mask>
                          <path
                            d="M24 8.02869C27.5346 8.02869 30.4004 10.8945 30.4004 14.4291C30.4002 17.9635 27.5345 20.8285 24 20.8285H22.7793L17.1123 23.9506C16.9717 24.0279 16.8177 23.8731 16.8955 23.7328L18.5088 20.8285H8C4.4655 20.8285 1.59981 17.9635 1.59961 14.4291C1.59961 10.8945 4.46538 8.02869 8 8.02869H24Z"
                            fill="#F3F3F3"
                          />
                          <path
                            d="M24 8.02869L24 7.02869H24V8.02869ZM30.4004 14.4291L31.4004 14.4291V14.4291H30.4004ZM22.7793 20.8285V19.8285H22.5221L22.2968 19.9526L22.7793 20.8285ZM17.1123 23.9506L17.5944 24.8267L17.5948 24.8264L17.1123 23.9506ZM16.8955 23.7328L16.0213 23.2472L16.0208 23.2481L16.8955 23.7328ZM18.5088 20.8285L19.383 21.3141L20.2082 19.8285H18.5088V20.8285ZM1.59961 14.4291L0.599609 14.4291L0.599609 14.4291L1.59961 14.4291ZM24 8.02869L24 9.02869C26.9823 9.02869 29.4004 11.4467 29.4004 14.4291H30.4004H31.4004C31.4004 10.3422 28.0869 7.02869 24 7.02869L24 8.02869ZM30.4004 14.4291L29.4004 14.429C29.4002 17.4111 26.9824 19.8285 24 19.8285V20.8285V21.8285C28.0866 21.8285 31.4002 18.516 31.4004 14.4291L30.4004 14.4291ZM24 20.8285V19.8285H22.7793V20.8285V21.8285H24V20.8285ZM22.7793 20.8285L22.2968 19.9526L16.6298 23.0747L17.1123 23.9506L17.5948 24.8264L23.2618 21.7044L22.7793 20.8285ZM17.1123 23.9506L16.6302 23.0744C17.3725 22.666 18.1763 23.4846 17.7702 24.2175L16.8955 23.7328L16.0208 23.2481C15.4592 24.2617 16.5709 25.3899 17.5944 24.8267L17.1123 23.9506ZM16.8955 23.7328L17.7697 24.2184L19.383 21.3141L18.5088 20.8285L17.6346 20.3429L16.0213 23.2472L16.8955 23.7328ZM18.5088 20.8285V19.8285H8V20.8285V21.8285H18.5088V20.8285ZM8 20.8285V19.8285C5.01764 19.8285 2.59978 17.4111 2.59961 14.429L1.59961 14.4291L0.599609 14.4291C0.599838 18.516 3.91336 21.8285 8 21.8285V20.8285ZM1.59961 14.4291H2.59961C2.59961 11.4467 5.01766 9.02869 8 9.02869V8.02869V7.02869C3.91309 7.02869 0.599609 10.3422 0.599609 14.4291H1.59961ZM8 8.02869V9.02869H24V8.02869V7.02869H8V8.02869Z"
                            fill="#9E9E9E"
                            mask="url(#path-1-outside-1_3484_4572)"
                          />
                          <circle
                            cx="9.50039"
                            cy="14.4"
                            r="1.6"
                            fill="#9E9E9E"
                          />
                          <circle
                            cx="15.8998"
                            cy="14.4"
                            r="1.6"
                            fill="#9E9E9E"
                          />
                          <circle
                            cx="22.3002"
                            cy="14.4"
                            r="1.6"
                            fill="#9E9E9E"
                          />
                        </svg>
                      </IconButton>
                      {hoveredIndexCode === item.indexCode &&
                        ReactDOM.createPortal(
                          <HoverTooltip
                            style={{
                              position: "fixed",
                              left: `${hoverPos.x + 33}px`,
                              top: `${hoverPos.y - 30}px`,
                              transform: "translateX(-50%)",
                            }}
                          >
                            <svg
                              width="102"
                              height="36"
                              viewBox="0 0 102 36"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.8945 35.2109C17.526 35.948 16.474 35.948 16.1055 35.2109L12 27H5C2.23858 27 4.83208e-08 24.7614 0 22V6C2.57711e-07 3.23858 2.23858 1 5 1H97C99.7614 1 102 3.23858 102 6V22C102 24.7614 99.7614 27 97 27H22L17.8945 35.2109Z"
                                fill="#323232"
                              />
                              <path
                                d="M17.3867 8.53125V18.9492H16.4961V8.53125H17.3867ZM15.3477 8.78906V18.3984H14.4688V13.3242H13.0156V12.4922H14.4688V8.78906H15.3477ZM13.3203 9.86719V10.6289H12.4414V15.4453C12.834 15.4219 13.209 15.3867 13.5547 15.3398L13.6133 16.0195C11.9727 16.3242 9.78125 16.3711 8.42188 16.3711L8.30469 15.5859L9.40625 15.5742V10.6289H8.52734V9.86719H13.3203ZM10.25 15.5625C10.6836 15.5508 11.1406 15.5332 11.5859 15.5039V10.6289H10.25V15.5625ZM27.972 16.8633V17.6367H18.433V16.8633H27.972ZM26.765 9.32812V12.4805H20.5423V14.1914H27.0111V14.9297H19.6283V11.7305H25.8627V10.0898H19.6048V9.32812H26.765ZM37.9831 16.8281V17.5898H28.4441V16.8281H32.7097V14.2734H33.612V16.8281H37.9831ZM33.6355 10.043C33.6355 11.7891 35.698 13.3125 37.5144 13.6289L37.1042 14.3906C35.5163 14.0684 33.8405 12.9902 33.1667 11.4844C32.4812 12.9844 30.8171 14.0684 29.2292 14.3906L28.8191 13.6289C30.6355 13.3125 32.6745 11.7891 32.6745 10.043V9.24609H33.6355V10.043ZM48.2052 12.6914V13.4648H46.5177V18.9492H45.6036V8.53125H46.5177V12.6914H48.2052ZM39.8028 9.5625V15.5273C41.3263 15.5215 42.879 15.4043 44.5958 15.0469L44.713 15.832C42.92 16.1953 41.3028 16.3008 39.7208 16.3008H38.8888V9.5625H39.8028ZM54.5281 9.29297C56.1688 9.29297 57.3289 10.2891 57.3289 11.7422C57.3289 13.1953 56.1688 14.1914 54.5281 14.1914C52.8875 14.1914 51.7039 13.1953 51.7156 11.7422C51.7039 10.2891 52.8875 9.29297 54.5281 9.29297ZM54.5281 10.1016C53.4148 10.1016 52.6063 10.7695 52.618 11.7422C52.6063 12.7148 53.4148 13.3828 54.5281 13.3828C55.6297 13.3828 56.4266 12.7148 56.4266 11.7422C56.4266 10.7695 55.6297 10.1016 54.5281 10.1016ZM59.6609 8.53125V18.9727H58.7469V8.53125H59.6609ZM51.1766 15.8906C53.0984 15.8906 55.7469 15.8789 58.0555 15.5391L58.1258 16.2188C55.7469 16.6641 53.1805 16.6758 51.3055 16.6758L51.1766 15.8906ZM69.7658 8.54297V16.3125H68.84V13.793H66.0392V13.0312H68.84V11.4492H66.1798C65.4474 13.0957 63.8478 14.3496 61.715 15.0352L61.3048 14.2969C63.7423 13.4941 65.4181 11.9941 65.6173 10.1133H61.8205V9.35156H66.6252C66.6252 9.82031 66.5607 10.2715 66.4494 10.6992H68.84V8.54297H69.7658ZM70.0353 17.9531V18.7266H63.133V15.5391H64.0705V17.9531H70.0353ZM83.3309 16.8516V17.6133H73.7919V16.8516H78.0809V14.6016H74.9169V9.26953H75.8427V11.1562H81.2567V9.26953H82.1591V14.6016H78.9833V16.8516H83.3309ZM75.8427 13.8516H81.2567V11.9062H75.8427V13.8516ZM92.4163 8.53125V18.9492H91.4905V8.53125H92.4163ZM89.3342 9.66797C89.3225 12.668 87.928 15.3164 84.4358 16.9922L83.9319 16.2422C86.7502 14.9062 88.1858 12.9082 88.3967 10.418H84.4123V9.66797H89.3342Z"
                                fill="white"
                              />
                            </svg>
                          </HoverTooltip>,
                          document.getElementById("tooltip-root")
                        )}
                    </LegendItem>
                  ))}
                </div>
              )
          )}
        </ItemsWrapper>
      </LegendContainer>
    </GraphWrapper>
  );
};

export default MolculeKanoModelGraph;

// 스타일 컴포넌트
const GraphContainer = styled.div`
  width: 500px;
  height: 500px;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const GraphArea = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 8px;
  background-color: ${palette.white};
`;

// 좌측 라인 - 위로 22px 확장
const LeftAxisLine = styled.div`
  position: absolute;
  left: 1px; /* 좌측 원의 중앙에 맞춤 */
  top: -22px; /* 위로 22px 확장 */
  width: 2px;
  height: calc(100% + 22px); /* 전체 높이 + 22px */
  background-color: ${palette.gray700};
  z-index: 2;
`;

// 하단 라인 - 우측으로 22px 확장
const BottomAxisLine = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: calc(100% + 22px); /* 우측으로 22px 확장 */
  height: 2px;
  background-color: ${palette.gray700};
  z-index: 2;
`;

// 그리드 라인 z-index 조정
const GridLineVertical = styled.div`
  position: absolute;
  left: ${(props) => props.position}%;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: transparent;
  z-index: 1; /* SVG 라인 아래에 표시되도록 z-index 조정 */
  border-left: 2px dashed ${palette.outlineGray};
`;

const GridLineHorizontal = styled.div`
  position: absolute;
  left: 0;
  top: ${(props) => props.position}%;
  width: 100%;
  height: 2px;
  background-color: transparent;
  z-index: 1; /* SVG 라인 아래에 표시되도록 z-index 조정 */
  border-top: 2px dashed ${palette.outlineGray};
`;

// 데이터 포인트
const DataPoint = styled.div`
  position: absolute;
  width: ${(props) => props.size}px; /* props로 크기 조절 */
  height: ${(props) => props.size}px; /* props로 크기 조절 */
  border-radius: 50%;
  background-color: ${palette.primary};
  border: 1px solid ${palette.primaryDark}; /* 테두리 추가 */
  left: ${(props) => props.x}%;
  top: ${(props) => 100 - props.y}%; /* y축 반전 */
  transform: translate(-50%, -50%);
  z-index: 3;
  /* 추가: 텍스트 중앙 정렬 및 스타일 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${palette.white};
  font-size: 12px; /* 폰트 크기 조절 */
  font-weight: bold;
  cursor: default; /* 기본 커서 유지 */
`;
// 좌측 상단 화살표 - 좌측으로 4px 이동
const LeftAxisArrow = styled.div`
  position: absolute;
  left: -7px; /* 기존 1px에서 4px 좌측으로 이동: 1px - 4px = -3px */
  top: -24px;
  width: 10px;
  height: 10px;
  z-index: 3;
  transform: rotate(-90deg);
  transform-origin: center;

  &:before {
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: ${palette.gray700};
    bottom: 0;
    right: 0;
    transform: translateY(-3px) rotate(45deg);
  }

  &:after {
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: ${palette.gray700};
    bottom: 0;
    right: 0;
    transform: translateY(3px) rotate(-45deg);
  }
`;

// 우측 하단 화살표 - 2px 우측으로 이동
const RightAxisArrow = styled.div`
  position: absolute;
  right: -24px; /* 2px 우측으로 이동 */
  bottom: 0px;
  width: 10px;
  height: 10px;
  z-index: 3;

  &:before {
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: ${palette.gray700};
    bottom: 0;
    right: 0;
    transform: translateY(-3px) rotate(45deg);
  }

  &:after {
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: ${palette.gray700};
    bottom: 0;
    right: 0;
    transform: translateY(3px) rotate(-45deg);
  }
`;

// Add Tooltip styled component
const Tooltip = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 10; /* Ensure tooltip is above other elements */
  transform: translate(
    -50%,
    -100%
  ); /* Position tooltip centered above the cursor/point */
  pointer-events: none; /* Prevent tooltip from blocking mouse events */
  transition: opacity 0.2s ease-in-out; /* Optional: add transition */
`;

// Add QuadrantLabel styled component
const QuadrantLabel = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transform: translate(-50%, -50%); /* Center the label */
  font-family: "Pretendard", "Poppins", sans-serif;
  font-size: 14px; /* Adjust font size as needed */
  font-weight: 600; /* Make labels slightly bolder */
  color: ${palette.gray500}; /* Use a less prominent color */
  padding: 4px;
  border-radius: 4px;
  /* Optional: Add background for better readability if needed */
  /* background-color: rgba(255, 255, 255, 0.7); */
  z-index: 0; /* Ensure labels are behind grid lines and data points */
  pointer-events: none; /* Labels should not interfere with mouse events */
`;

// 전체 레이아웃을 위한 Wrapper 추가
const GraphWrapper = styled.div`
  display: flex;
  align-items: flex-start; /* 상단 정렬 */
  gap: 40px; /* 그래프와 범례 사이 간격 */
  justify-content: center; /* 중앙 정렬 */
  padding: 20px;
`;

// 범례 컨테이너 스타일
const LegendContainer = styled.div`
  width: 250px; /* 범례 너비 조절 */
  max-height: 500px; /* 그래프 높이와 맞춤 */
  padding: 16px; /* 10px에서 16px로 패딩 늘림 */
  border: 1px solid ${palette.outlineGray};
  border-radius: 8px;
  background-color: ${palette.white};
  overflow-y: auto; /* 세로 스크롤 활성화 */

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${palette.gray100};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${palette.gray300};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${palette.gray400};
  }
`;

const ItemsWrapper = styled.div`
  /* LegendContainer에서 스크롤 처리하므로 여기서는 기본 설정만 */
  width: 100%;
`;

// 범례 아이템 스타일 수정
const LegendItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;

  .index-code {
    font-weight: bold;
    margin-right: 4px;
  }

  .item-title {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }
`;

// 사분면 그룹 타이틀 스타일
const QuadrantTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${palette.gray800};
  margin: 12px 0 8px 0;
  padding-bottom: 4px;
  border-bottom: 1px solid ${palette.outlineGray};
  text-align: left; /* 왼쪽 정렬 추가 */

  &:first-child {
    margin-top: 0;
  }
`;

// 아이콘 hover 시 뜨는 툴팁 컨테이너
const HoverTooltip = styled.div`
  position: absolute;
  /* 아이콘(=버튼) 영역 바로 위에 붙입니다. */
  bottom: calc(100% + 0px);
  /* left: 아이콘 가로 중앙 기준 */
  left: 108%;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 9990;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0px;
  margin-left: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  color: ${palette.gray600}; /* SVG에 currentColor 적용 시 */
`;
