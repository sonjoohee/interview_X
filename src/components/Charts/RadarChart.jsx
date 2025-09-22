import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RadarChart = ({ data, width = 500, height = 500 }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const radius = Math.min(chartWidth, chartHeight) / 2;

    // SVG 초기화
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width/2},${height/2})`);

    // 특성 목록
    const features = ['strength', 'luck', 'intelligence', 'charisma', 'dexterity'];
    const angleSlice = (Math.PI * 2) / features.length;

    // 스케일 설정
    const rScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, radius]);

    // 축 그리기
    features.forEach((feature, i) => {
      const angle = i * angleSlice;
      
      // 축 선 그리기
      svg.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', radius * Math.cos(angle - Math.PI/2))
        .attr('y2', radius * Math.sin(angle - Math.PI/2))
        .style('stroke', '#ddd')
        .style('stroke-width', '1px');

      // 라벨 추가
      svg.append('text')
        .attr('x', (radius + 20) * Math.cos(angle - Math.PI/2))
        .attr('y', (radius + 20) * Math.sin(angle - Math.PI/2))
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'middle')
        .style('font-family', 'Pretendard')
        .style('font-size', '0.88rem')
        .style('font-weight', '500')
        .style('fill', '#8c8c8c')
        .text(feature);
    });

    // 동심원 대신 오각형 레벨 라인 그리기
    const levels = 5;
    for (let level = 0; level < levels; level++) {
      const levelRadius = radius * ((level + 1) / levels);
      
      // 오각형의 각 꼭지점 좌표 계산
      const points = features.map((_, i) => {
        const angle = i * angleSlice - Math.PI/2;
        return {
          x: levelRadius * Math.cos(angle),
          y: levelRadius * Math.sin(angle)
        };
      });
      
      // // 오각형 경로 생성
      // const lineGenerator = d3.lineRadial()
      //   .radius(() => levelRadius)
      //   .angle((_, i) => i * angleSlice);

      // 오각형 그리기
      svg.append('path')
        .datum(points)
        .attr('d', d => {
          let path = 'M';
          d.forEach((p, i) => {
            if (i === 0) path += `${p.x},${p.y}`;
            else path += `L${p.x},${p.y}`;
          });
          path += 'Z';
          return path;
        })
        .style('fill', 'none')
        .style('stroke', '#ddd')
        .style('stroke-width', '0.5px');
    }

    // 데이터 포인트 생성
    // const dataPoints = features.map(feature => ({
    //   value: data[feature] || 0
    // }));

    // 데이터 경로 생성 및 그리기
    const points = features.map((feature, i) => {
      const value = data[feature] || 0;
      const angle = i * angleSlice - Math.PI/2;
      return {
        x: rScale(value) * Math.cos(angle),
        y: rScale(value) * Math.sin(angle)
      };
    });

    // 영역 그리기
    svg.append('path')
      .datum(points)
      .attr('d', d => {
        let path = 'M';
        d.forEach((p, i) => {
          if (i === 0) path += `${p.x},${p.y}`;
          else path += `L${p.x},${p.y}`;
        });
        path += 'Z'; // 경로를 닫아서 처음 지점으로 돌아감
        return path;
      })
      .style('fill', 'rgba(34, 111, 255, 0.2)')
      .style('stroke', '#226FFF')
      .style('stroke-width', '1px');

  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default RadarChart; 