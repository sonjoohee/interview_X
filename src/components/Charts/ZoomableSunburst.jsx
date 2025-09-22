import React, { useEffect, useRef } from 'react';
import { palette } from '../../assets/styles/Palette';
import * as d3 from 'd3';

const ZoomableSunburst = ({ data, width, height, colors }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    // 기본 설정
    const radius = width / 6;

    // 색상 스케일 생성
    const color = colors 
      ? d3.scaleOrdinal().domain(data.children.map(d => d.name)).range(colors)
      : d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

    // 계층 구조 생성 및 파티션 레이아웃 계산
    const hierarchy = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
    
    const root = d3.partition()
      .size([2 * Math.PI, hierarchy.height + 1])
      (hierarchy);
    
    root.each(d => d.current = d);

    // arc 생성기 설정
    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius * 1.5)
      .innerRadius(d => d.y0 * radius)
      .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));

    // SVG 컨테이너 생성
    const svg = d3.select(svgRef.current)
      .attr("viewBox", [-width / 2, -height / 2, width, width])
      .style("font", "10px sans-serif");

    svg.selectAll('*').remove();

    // 아크 그리기
    const path = svg.append("g")
      .selectAll("path")
      .data(root.descendants().slice(1))
      .join("path")
        .attr("fill", d => { 
          while (d.depth > 1) d = d.parent; 
          return color(d.data.name); 
        })
        .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 1 : 0.6) : 0)
        .attr("pointer-events", d => arcVisible(d.current) ? "auto" : "none")
        .attr("d", d => arc(d.current));

    // 클릭 가능한 요소 설정
    path.filter(d => d.children)
      .style("cursor", "pointer")
      .on("click", clicked);

    // // 툴팁 추가
    // const format = d3.format(",d");
    // path.append("title")
    //   // .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
    //   .text(d => `${d.data.name}`);

    // 레이블 추가
    const label = svg.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .style("user-select", "none")
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
        .attr("dy", "0.35em")
        .attr("fill-opacity", d => +labelVisible(d.current))
        .attr("transform", d => labelTransform(d.current))
        .each(function(d) {
          const text = d3.select(this);
          if (d.depth === 1) {
            // depth가 1인 경우 줄바꿈 처리
            const words = d.data.name.split(' ');
            const lineHeight = 1.1;
            
            text.text(''); // 기존 텍스트 삭제
            words.forEach((word, i) => {
              text.append("tspan")
                .attr("x", 0)
                .attr("dy", i === 0 ? `-${(words.length - 1) * lineHeight / 2}em` : `${lineHeight}em`)
                .text(word);
            });
          } else {
            // depth가 1이 아닌 경우 ...으로 처리
            const name = d.data.name;
            text.text(name.length > 10 ? name.slice(0, 10) + '...' : name);
          }
        });

    // 중앙 원 추가
    const parent = svg.append("circle")
      .datum(root)
      .attr("r", radius)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("click", clicked);

    // 클릭 이벤트 핸들러
    function clicked(event, p) {
      parent.datum(p.parent || root);

      root.each(d => d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth)
      });

      const t = svg.transition().duration(750);

      path.transition(t)
        .tween("data", d => {
          const i = d3.interpolate(d.current, d.target);
          return t => d.current = i(t);
        })
        .filter(function(d) {
          return +this.getAttribute("fill-opacity") || arcVisible(d.target);
        })
        .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 1 : 0.6) : 0)
        .attr("pointer-events", d => arcVisible(d.target) ? "auto" : "none")
        .attrTween("d", d => () => arc(d.current));

      label.filter(function(d) {
        return +this.getAttribute("fill-opacity") || labelVisible(d.target);
      }).transition(t)
        .attr("fill-opacity", d => +labelVisible(d.target))
        .attrTween("transform", d => () => labelTransform(d.current))
        .style('fill', d => {
          const currentDepth = d.depth - p.depth;
          return currentDepth === 1 ? palette.gray800 : palette.gray800;
        })
        .each(function(d) {
          const text = d3.select(this);
          const currentDepth = d.depth - p.depth;
          
          if (currentDepth === 1) {
            // 현재 depth가 1인 경우 줄바꿈 처리
            const words = d.data.name.split(' ');
            const lineHeight = 1.1;
            
            text.text(''); // 기존 텍스트 삭제
            words.forEach((word, i) => {
              text.append("tspan")
                .attr("x", 0)
                .attr("dy", i === 0 ? `-${(words.length - 1) * lineHeight / 2}em` : `${lineHeight}em`)
                .text(word);
            });
          } else {
            // 그 외의 경우 ...으로 처리
            const name = d.data.name;
            text.text(name.length > 10 ? name.slice(0, 10) + '...' : name);
          }
        });
    }

    function arcVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }

    function labelTransform(d) {
      const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
      const y = (d.y0 + d.y1) / 2 * radius;
      // y0가 2보다 작은 경우(안쪽 원)는 수평 유지
      if (d.y0 < 2) {
        return `rotate(${x - 90}) translate(${y},0) rotate(${90 - x})`;
      }
      // 바깥쪽 원은 기존 로직 유지
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }

    // text 요소에 스타일 적용
    svg.selectAll('text')
      .style('font-family', 'Pretendard, Poppins')
      .style('font-size', d => {
        // depth가 1이면 0.88rem, 그 외에는 0.75rem
        return d.depth === 1 ? '0.88rem' : '0.75rem';
      })
      .style('font-weight', '500')
      .style('fill', d => {
        // depth가 1이면 gray800, 그 외에는 gray800
        return d.depth === 1 ? palette.gray800 : palette.gray800;
      });
  }, [data, width, height, colors]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default ZoomableSunburst; 