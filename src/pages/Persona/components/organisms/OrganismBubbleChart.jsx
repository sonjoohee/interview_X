//버블차트
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BubbleChart = ({ data, customWidth, customHeight }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateChart = () => {
      const container = containerRef.current;
      const width = customWidth || container.clientWidth;

      // 버블 최대 크기와 높이 계산
      const MAX_BUBBLE_RADIUS = Math.min(width, 400) * 0.25; // 25%로 줄임
      const calculateBubbleRadius = (value) =>
        Math.min(Math.sqrt(value * 150) + 10, MAX_BUBBLE_RADIUS);
      const maxBubbleSize =
        Math.max(...data.map((d) => calculateBubbleRadius(d.value))) * 2;
      const minHeight = maxBubbleSize + 40; // 여백 줄임
      const height =
        customHeight ||
        Math.max(minHeight, Math.min(container.clientWidth, 400)); // 최대 높이 400으로 제한

      d3.select(svgRef.current).selectAll("*").remove();

      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

      const categoryColors = {
        카테고리1: "rgba(54,26,128,.1)",
        카테고리2: "rgba(86,154,126,.1)",
        카테고리3: "rgba(161,98,109,.1)",
      };

      const simulation = d3
        .forceSimulation(data)
        .force("center", d3.forceCenter(width / 2, height / 2).strength(1)) // 중심 강도 증가
        .force(
          "collision",
          d3.forceCollide().radius((d) => calculateBubbleRadius(d.value) + 1)
        )
        .force("charge", d3.forceManyBody().strength(-20)) // 반발력 감소
        .force("x", d3.forceX(width / 2).strength(0.2)) // x축 강도 증가
        .force("y", d3.forceY(height / 2).strength(0.2)); // y축 강도 증가

      const nodes = svg
        .selectAll(".node")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "node");

      // 원 크기 증가
      nodes
        .append("circle")
        .attr("r", (d) => calculateBubbleRadius(d.value))
        .style("fill", (d) => categoryColors[d.category])
        .style("stroke", "#fff")
        .style("stroke-width", "2px");

      // 텍스트 크기는 그대로 유지
      nodes
        .append("text")
        .text((d) => `${d.name}\n${d.value}%`)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("dy", "0.35em")
        .style("font-size", (d) => {
          // const baseSize = Math.sqrt(d.value) * 3.2;
          // return `${Math.max(baseSize, 14)}px`;
          return `14px`;
        })
        .style("font-weight", "500")
        .style("fill", (d) => {
          const category = d.category;
          switch (category) {
            case "카테고리1":
              return "#361a80";
            case "카테고리2":
              return "#569a7e";
            case "카테고리3":
              return "#a1626d";
            default:
              return "#333333";
          }
        })
        .each(function (d) {
          const text = d3.select(this);
          const words = text.text().split("\n");
          text.text("");

          const lineHeight = 1.1;
          const totalLines = words.length;
          const startY = -(lineHeight * (totalLines - 1)) / 2;

          words.forEach((word, i) => {
            text
              .append("tspan")
              .text(word)
              .attr("x", 0)
              .attr("y", 0)
              .attr("dy", `${startY + i * lineHeight + 0.2}em`);
          });
        });
      simulation.on("tick", () => {
        nodes.attr("transform", (d) => {
          const r = calculateBubbleRadius(d.value);
          d.x = Math.max(r, Math.min(width - r, d.x));
          d.y = Math.max(r, Math.min(height - r, d.y));
          return `translate(${d.x},${d.y})`;
        });
      });
    };

    updateChart();

    const handleResize = () => {
      updateChart();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [customWidth, customHeight, data]);
  // >>>>>>> main

  return (
    <div
      ref={containerRef}
      style={{
        width: customWidth || "100%",
        height: customHeight || "auto",
        maxWidth: "1000px",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BubbleChart;
