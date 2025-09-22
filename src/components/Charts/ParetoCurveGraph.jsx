import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import { palette } from "../../assets/styles/Palette";

// 범례 스타일 컴포넌트 추가
const LegendContainer = styled.div`
  width: 200px; // 범례 너비 설정
  height: 100%;
  padding: 20px 10px 20px 20px; // 안쪽 여백
  box-sizing: border-box;
  overflow-y: auto; // 내용 많으면 스크롤
  border-left: 1px solid ${palette.outlineGray}; // 구분선
  background-color: ${palette.white}; // 배경색
  border-radius: 0 8px 8px 0; // 오른쪽 모서리 둥글게
`;

const LegendList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LegendItem = styled.li`
  margin-bottom: 8px;
  font-size: 14px;
  color: ${palette.gray700};
  display: flex;
  align-items: center;
`;

const LegendIndex = styled.span`
  font-weight: bold;
  color: ${palette.primary};
  margin-right: 8px;
  min-width: 20px; // 인덱스 공간 확보
  text-align: left; // 왼쪽 정렬로 수정
`;

const LegendName = styled.span`
  word-break: keep-all; // 단어 단위 줄바꿈
  text-align: left; // 왼쪽 정렬로 수정
`;

/**
 * 파레토 커브(Pareto Curve) 그래프 컴포넌트
 * 각 단계마다 이전 단계의 값이 누적되는 형태로 표시
 * 7~9단계까지 가능하도록 설정, 가로 너비 820px로 조정
 * 바 크기는 일정하게 유지하면서 간격만 조절됨
 * X축 레이블은 알파벳 인덱스로 표시, 오른쪽에 범례 추가
 */
const ParetoCurveGraph = ({
  data = [
    { name: "품질 관련 문제점", value: 175 },
    { name: "배송 지연 및 오배송", value: 50 },
    { name: "가격 불만족 사항", value: 35 },
    { name: "결제 시스템 오류", value: 20 },
    { name: "재고 부족 현상", value: 15 },
    { name: "고객 서비스 불량", value: 10 },
    { name: "애플리케이션 기능 오류", value: 8 },
    { name: "기타 불편사항", value: 5 },
  ],
  width = 820, // 전체 컨테이너 너비 (그래프 + 범례)
  graphWidth = 620, // 그래프 영역 너비
  height = 520,
  animate = true,
  animationDuration = 1000,
  barWidth = 30, // 그래프 바의 고정 너비 설정
  sideMargin = 20, // 그래프 좌우 여백 설정 (양쪽 각각 적용) - 값 줄임
}) => {
  const svgRef = useRef(null);
  const [processedData, setProcessedData] = useState([]);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // 데이터 처리 함수: 누적 값 계산 및 알파벳 인덱스 할당
  useEffect(() => {
    if (!data || data.length === 0) return;

    const sortedData = [...data].sort((a, b) => b.value - a.value);
    const limitedData = sortedData.slice(0, Math.min(9, sortedData.length));
    const total = limitedData.reduce((sum, item) => sum + item.value, 0);

    let cumulativeValue = 0;
    const processed = limitedData.map((item, index) => {
      cumulativeValue += item.value;
      const indexLabel = `${index + 1}`; // 1, 2, 3... 할당

      return {
        name: item.name || `${index + 1}단계`, // 원본 이름 유지
        indexLabel: indexLabel, // 알파벳 인덱스
        originalValue: item.value,
        cumulativeValue: cumulativeValue,
        cumulativePercentage: total > 0 ? (cumulativeValue / total) * 100 : 0,
      };
    });

    setProcessedData(processed);
  }, [data]);

  // D3 그래프 렌더링
  useEffect(() => {
    if (!processedData.length || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 40, right: 92, bottom: 60, left: 60 };
    // 그래프 너비(graphWidth) 사용
    const innerWidth = graphWidth - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const stageCount = processedData.length;
    const totalBarsWidth = barWidth * stageCount;
    const usableWidth = innerWidth - sideMargin * 2; // sideMargin 변경 반영
    const totalSpacing = usableWidth - totalBarsWidth;
    const spacingWidth = stageCount > 1 ? totalSpacing / (stageCount - 1) : 0;

    const xPositions = {};
    processedData.forEach((d, i) => {
      // indexLabel을 키로 사용
      xPositions[d.indexLabel] = sideMargin + i * (barWidth + spacingWidth); // sideMargin 변경 반영
    });

    // x 스케일은 indexLabel을 받아서 위치 반환
    const x = (indexLabel) => xPositions[indexLabel];
    x.bandwidth = () => barWidth;

    const totalCumulativeValue =
      d3.max(processedData, (d) => d.cumulativeValue) || 0;

    const y1 = d3
      .scaleLinear()
      .domain([0, totalCumulativeValue > 0 ? totalCumulativeValue : 1]) // 0일 경우 방지
      .range([innerHeight, 0]);

    const y2 = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);

    // X축용 스케일 (indexLabel 사용)
    const xAxisScale = d3
      .scaleBand()
      .domain(processedData.map((d) => d.indexLabel)) // indexLabel로 도메인 설정
      .range([0, innerWidth])
      .padding(0);

    const xAxisGen = d3.axisBottom(xAxisScale).tickSize(0);
    const y1Axis = d3.axisLeft(y1).ticks(5).tickSize(-innerWidth);
    const y2Axis = d3
      .axisRight(y2)
      .ticks(5)
      .tickSize(0)
      .tickFormat((d) => `${d}%`);

    // X축 추가 - 레이블 및 툴팁 로직 수정
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxisGen)
      .call((g) => {
        g.selectAll(".tick").attr(
          "transform",
          (
            d // d는 이제 indexLabel ("A", "B"...)
          ) => `translate(${x(d) + barWidth / 2}, 0)`
        );

        // 기존 텍스트 제거 (renderAxisLabelsAndTooltips에서 새로 그림)
        g.selectAll("text").remove();

        // X축 도메인 라인 설정
        g.select(".domain")
          .attr("stroke", palette.gray700)
          .attr("stroke-width", 1);
      });

    // Y축 추가 (왼쪽 - 값)
    g.append("g")
      .attr("class", "y-axis")
      .call(y1Axis)
      .selectAll("text")
      .attr("font-size", "16px")
      .attr("font-family", "'Pretendard', 'Poppins'")
      .attr("fill", palette.gray700);

    g.selectAll(".y-axis line")
      .attr("stroke", palette.outlineGray)
      .attr("stroke-dasharray", "2,2");

    g.selectAll(".y-axis path").attr("stroke", "none");

    // Y축 추가 (오른쪽 - 백분율)
    g.append("g")
      .attr("class", "y-axis-percentage")
      .attr("transform", `translate(${innerWidth}, 0)`)
      .call(y2Axis)
      .selectAll("text")
      .attr("font-size", "16px")
      .attr("font-family", "'Pretendard', 'Poppins'")
      .attr("fill", palette.gray700)
      .attr("dx", "4px");

    // 축 제목 추가
    g.append("text")
      .attr("class", "y-axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", -45)
      .attr("x", -innerHeight / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-family", "'Pretendard', 'Poppins'")
      .attr("fill", palette.gray700)
      .text("누적 값");

    g.append("text")
      .attr("class", "y-axis-percentage-title")
      .attr("transform", "rotate(-90)")
      .attr("y", innerWidth + 62)
      .attr("x", -innerHeight / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-family", "'Pretendard', 'Poppins'")
      .attr("fill", palette.gray700)
      .text("누적 백분율 (%)");

    // 누적 막대 생성 (x 위치 기준: indexLabel)
    const bars = g
      .selectAll(".bar")
      .data(processedData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.indexLabel)) // indexLabel 사용
      .attr("width", barWidth)
      .attr("y", innerHeight)
      .attr("height", 0)
      .attr("fill", "#A3C3FF")
      .attr("rx", 2)
      .attr("ry", 2);

    // 파레토 라인 생성 함수 수정 (x 위치 기준: indexLabel)
    const createLine = (dataSlice) => {
      return d3
        .line()
        .x((d) => x(d.indexLabel) + barWidth / 2) // indexLabel 사용
        .y((d) => y2(d.cumulativePercentage))
        .curve(d3.curveMonotoneX)(dataSlice);
    };

    const path = g
      .append("path")
      .attr("class", "line")
      .attr("fill", "none")
      .attr("style", `stroke: ${palette.gray800} !important`)
      .attr("stroke-width", 2)
      .attr("d", createLine([]))
      .attr("opacity", 1);

    // 라인 점 생성 (cx 위치 기준: indexLabel)
    const points = g
      .selectAll(".point")
      .data(processedData)
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("cx", (d) => x(d.indexLabel) + barWidth / 2) // indexLabel 사용
      .attr("cy", (d) => y2(d.cumulativePercentage))
      .attr("r", 5)
      .attr("fill", palette.gray800)
      .attr("opacity", 0);

    // 누적 값 텍스트 추가 (x 위치 기준: indexLabel)
    const valueTexts = g
      .selectAll(".value-text")
      .data(processedData)
      .enter()
      .append("text")
      .attr("class", "value-text")
      .attr("x", (d) => x(d.indexLabel) + barWidth / 2) // indexLabel 사용
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .attr("font-family", "'Pretendard', 'Poppins'")
      .attr("opacity", 0)
      .each(function (d) {
        const barHeight = innerHeight - y1(d.cumulativeValue);
        const text = d3.select(this);
        if (barHeight >= 40) {
          text
            .attr("y", y1(d.cumulativeValue) + 20)
            .attr("fill", palette.white);
        } else {
          text
            .attr("y", y1(d.cumulativeValue) - 10)
            .attr("fill", palette.gray800);
        }
      })
      .text((d) => d.cumulativeValue.toFixed(0));

    // 백분율 텍스트 추가 (x 위치 기준: indexLabel)
    const percentTexts = g
      .selectAll(".percent-text")
      .data(processedData)
      .enter()
      .append("text")
      .attr("class", "percent-text")
      .attr("x", (d) => x(d.indexLabel) + barWidth / 2 + 5) // indexLabel 사용
      .attr("y", (d) => y2(d.cumulativePercentage) - 10)
      .attr("text-anchor", "start")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .attr("font-family", "'Pretendard', 'Poppins'")
      .attr("fill", palette.gray800)
      .attr("opacity", 0)
      .text((d) => `${d.cumulativePercentage.toFixed(0)}%`);

    // 애니메이션 적용
    if (animate) {
      processedData.forEach((_, i) => {
        const delay = i * (animationDuration / processedData.length);
        const duration = animationDuration / processedData.length;

        bars
          .filter((d, j) => j === i)
          .transition()
          .delay(delay)
          .duration(duration)
          .attr("y", (d) => y1(d.cumulativeValue))
          .attr("height", (d) => innerHeight - y1(d.cumulativeValue));

        const currentSlice = processedData.slice(0, i + 1);
        path
          .transition()
          .delay(delay)
          .duration(duration / 2)
          .attr("d", createLine(currentSlice));

        points
          .filter((d, j) => j === i)
          .transition()
          .delay(delay)
          .duration(duration / 2)
          .attr("opacity", 1);

        valueTexts
          .filter((d, j) => j === i)
          .transition()
          .delay(delay + duration * 0.7)
          .duration(duration * 0.3)
          .attr("opacity", 1);

        percentTexts
          .filter((d, j) => j === i)
          .transition()
          .delay(delay + duration * 0.7)
          .duration(duration * 0.3)
          .attr("opacity", 1);
      });
    } else {
      bars
        .attr("y", (d) => y1(d.cumulativeValue))
        .attr("height", (d) => innerHeight - y1(d.cumulativeValue));
      path.attr("d", createLine(processedData));
      points.attr("opacity", 1);
      valueTexts.attr("opacity", 1);
      percentTexts.attr("opacity", 1);
    }

    if (isInitialRender) {
      setIsInitialRender(false);
    }

    // X축 라벨과 툴팁 렌더링 함수 (수정됨)
    const renderAxisLabelsAndTooltips = () => {
      g.select(".x-axis").selectAll(".tick text").remove(); // 기존 텍스트 제거

      g.select(".x-axis")
        .selectAll(".tick")
        // .data(processedData) // 데이터를 다시 바인딩해야 정확한 정보 사용 가능
        .each(function (indexLabel, i) {
          // indexLabel은 "A", "B"..., i는 0, 1...
          const tick = d3.select(this);
          const currentData = processedData[i]; // 현재 데이터 항목 가져오기

          // 기본 텍스트 (알파벳 인덱스)
          const textElement = tick
            .append("text")
            .attr("class", "x-axis-label")
            .attr("font-size", "16px")
            .attr("font-family", "Pretendard, Poppins")
            .attr("fill", palette.gray700)
            .attr("dy", "20px")
            .attr("text-anchor", "middle")
            .text(indexLabel); // 알파벳 인덱스 표시

          // 툴팁 생성을 위한 임시 텍스트 (원본 이름 기준)
          const tempText = g
            .append("text")
            .attr("font-size", "14px")
            .attr("font-family", "Pretendard, Poppins")
            .attr("opacity", 0)
            .text(currentData.name); // 원본 이름 사용

          const textWidth = tempText.node().getComputedTextLength();
          tempText.remove();

          const sidePadding = 12;
          const verticalPadding = 10;
          const tooltipWidth = textWidth + sidePadding * 2;
          const tooltipHeight = 36;

          // 툴팁 그룹 생성 (위치 조정됨)
          const tooltipGroup = g
            .append("g")
            .attr("class", `tooltip-group tooltip-for-${indexLabel}`) // 고유 클래스
            .attr(
              "transform",
              `translate(${x(indexLabel) + barWidth / 2}, ${innerHeight})` // 각 tick 위치 기준으로
            )
            .style("opacity", 0)
            .style("pointer-events", "none");

          tooltipGroup
            .append("rect")
            .attr("x", -tooltipWidth / 2)
            .attr("y", -50)
            .attr("width", tooltipWidth)
            .attr("height", tooltipHeight)
            .attr("fill", "white")
            .attr("stroke", palette.primary)
            .attr("stroke-width", 1)
            .attr("rx", 6)
            .attr("ry", 6);

          tooltipGroup
            .append("text")
            .attr("x", 0)
            .attr("y", -50 + tooltipHeight / 2)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("font-size", "14px")
            .attr("font-family", "Pretendard, Poppins")
            .attr("fill", "#333")
            .text(currentData.name); // 툴팁에는 원본 이름 표시

          // 호버 이벤트 (항상 활성화, 툴팁 표시용)
          textElement
            .style("cursor", "pointer")
            .on("mouseover", function () {
              d3.select(this)
                .transition()
                .duration(200)
                .attr("fill", palette.primary)
                .attr("font-weight", "bold");

              // 해당 툴팁만 보이게 함
              g.select(`.tooltip-for-${indexLabel}`)
                .transition()
                .duration(200)
                .style("opacity", 1);
            })
            .on("mouseout", function () {
              d3.select(this)
                .transition()
                .duration(200)
                .attr("fill", palette.gray700)
                .attr("font-weight", "normal");

              // 해당 툴팁 숨김
              g.select(`.tooltip-for-${indexLabel}`)
                .transition()
                .duration(200)
                .style("opacity", 0);
            });
        });
    };

    renderAxisLabelsAndTooltips(); // 함수 호출
  }, [
    processedData,
    graphWidth, // graphWidth 사용
    height,
    animate,
    animationDuration,
    isInitialRender,
    barWidth,
    sideMargin, // sideMargin 의존성 추가
  ]);

  // 컴포넌트 언마운트 시 툴팁 제거 (필요 없을 수 있음, D3가 관리)
  useEffect(() => {
    return () => {
      d3.selectAll(".tooltip-group").remove(); // 생성된 모든 툴팁 그룹 제거
    };
  }, []);

  return (
    // 전체 컨테이너에 너비 설정, flex 레이아웃 적용
    <GraphContainer width={width}>
      {/* SVG 영역 */}
      <SvgWrapper width={graphWidth} height={height}>
        <svg ref={svgRef} width="100%" height="100%" />
      </SvgWrapper>
      {/* 범례 영역 */}
      <LegendContainer>
        <LegendList>
          {processedData.map((item) => (
            <LegendItem key={item.indexLabel}>
              <LegendIndex>{item.indexLabel}:</LegendIndex>
              <LegendName>{item.name}</LegendName>
            </LegendItem>
          ))}
        </LegendList>
      </LegendContainer>
    </GraphContainer>
  );
};

export default ParetoCurveGraph;

// 스타일 컴포넌트 수정
const GraphContainer = styled.div`
  width: ${(props) => props.width}px; // props로 전체 너비 받기
  height: 480px;
  display: flex; // flex 레이아웃 사용
  position: relative;
  box-sizing: border-box;
  margin: 20px auto; // 위아래 여백 추가
  background-color: ${palette.white};

  border-radius: 8px;
  font-family: "Pretendard", "Poppins";

  color: ${palette.gray800};
  /* border: 1px solid ${palette.outlineGray}; // 전체 테두리 제거 */
`;

// SVG를 감싸는 div 추가 (그래프 영역 크기 지정)
const SvgWrapper = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  box-sizing: border-box;
`;
