import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { palette } from '../../assets/styles/Palette';

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
`;

const Tooltip = styled.div`
  position: fixed;
  padding: 8px 12px;
  background: ${palette.white};
  border: 1px solid ${palette.outlineGray};
  border-radius: 4px;
  pointer-events: none;
  font-size: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.2s;
`;

const BarChart = ({ data = [
  { label: "카테고리1", value: 30, description: "새로운 기술과 육아 관련 혁신적인 제품에 관심은 많지만, 수면 부족과 피로로 인해 실질적으로 시도하는 빈도는 보통 수준에 그친다." },
  { label: "카테고리2", value: 45, description: "2222222222" },
  { label: "카테고리3", value: 60, description: "3333333333" },
  { label: "카테고리4", value: 25, description: "4444444444" },
] }) => {
  const svgRef = useRef();
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    // SVG 컨테이너의 크기 설정
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = svgRef.current.clientHeight - margin.top - margin.bottom;

    // SVG 요소 초기화
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // 툴팁 선택
    const tooltip = d3.select(tooltipRef.current);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 스케일 설정
    const y = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, height])
      .padding(0.5);

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([0, width]);

    // 바 그리기
    const bars = g.selectAll(".bar")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "bar");

    // 배경 바 그리기
    bars.append("rect")
      .attr("y", d => y(d.label) + (y.bandwidth() - 20) / 2)
      .attr("x", 0)
      .attr("height", 20)
      .attr("width", width)
      .attr("fill", palette.gray200)
      .attr("rx", 10)
      .attr("ry", 10);

    // 실제 바 그리기
    bars.append("rect")
      .attr("y", d => y(d.label) + (y.bandwidth() - 20) / 2)
      .attr("x", 0)
      .attr("height", 20)
      .attr("width", d => x(d.value))
      .attr("fill", d => {
        const maxValue = d3.max(data, item => item.value);
        return d.value === maxValue ? palette.greenChip : palette.primary;
      })
      .attr("rx", 10)
      .attr("ry", 10)
      // 마우스 이벤트 추가
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(`
            <div style="font-weight: 500;">${d.label}</div>
            <div>값: ${d.value}</div>
            <div>
              ${d.description}
            </div>
          `)
          .style("left", `${event.clientX + 10}px`)
          .style("top", `${event.clientY - 28}px`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.clientX + 10}px`)
          .style("top", `${event.clientY - 28}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    // 바 위에 레이블 추가
    bars.append("text")
      .attr("class", "label")
      .attr("y", d => y(d.label) - 0)
      .attr("x", 0)
      .attr("text-anchor", "start")
      .style("font-size", "12px")
      .style("fill", palette.gray800)
      .text(d => d.label);

    // 값 레이블 추가 (레이블 우측)
    bars.append("text")
      .attr("class", "value")
      .attr("y", d => y(d.label) - 0)
      .attr("x", 60)
      .style("font-size", "12px")
      .style("font-weight", "700")
      .style("fill", palette.gray800)
      .text(d => d.value);

  }, [data]);

  return (
    <ChartContainer>
      <svg ref={svgRef} width="100%" height="100%" />
      <Tooltip ref={tooltipRef} style={{ opacity: 0 }} />
    </ChartContainer>
  );
};

export default BarChart; 