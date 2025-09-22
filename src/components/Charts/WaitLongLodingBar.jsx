import React from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * Figma 디자인에 맞는 Step 로딩 컴포넌트
 * @param {Object} props
 * @param {number} [props.size=200] - 로딩 컴포넌트의 전체 크기 (픽셀)
 * @param {string} [props.baseColor="#D6E4FF"] - 원형 베이스 색상
 * @param {string} [props.primaryColor="#226FFF"] - 중앙 원과 라인 색상
 * @param {number} [props.duration=4] - 회전 애니메이션 지속 시간 (초)
 * @param {number} [props.step=1] - 현재 스텝 번호
 * @param {number} [props.centerSize=72] - 중앙 원의 크기 (픽셀)
 * @returns {JSX.Element} 로딩 컴포넌트
 */
const WaitLongLodingBar = ({ 
  size = 240, 
  baseColor = "#D6E4FF",
  primaryColor = "#226FFF", 
  duration = 4,
  step = 1,
  centerSize = 92,
  className
}) => {
  // 아이디 고유성 보장
  const uniqueId = `paint_linear_${Math.random().toString(36).substring(2, 9)}`;
  
  return (
    <LoadingContainer className={className} size={size} centerSize={centerSize} duration={duration}>
      <LoadingWrapper size={size}>
        {/* 기본 원형 배경 */}
        <BaseCircle baseColor={baseColor} />
        
        {/* 회전하는 레이더 레이어 */}
        <RadarLayer duration={duration} />
        
        {/* 회전하는 SVG 아크 - 투명한 부분이 시작점, 진한 파란색이 끝점 */}
        <RotatingSvgWrapper duration={duration} startAngle={-90}>
          <svg 
            width={size} 
            height={size} 
            viewBox="0 0 200 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M0 100C0 44.5 44.5 0 100 0" 
              stroke={`url(#${uniqueId})`} 
              strokeWidth="1.33333" 
              strokeLinecap="round"
            />
            <defs>
              <linearGradient 
                id={uniqueId} 
                x1="0" 
                y1="100" 
                x2="100" 
                y2="0" 
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#70A2FF" stopOpacity="0"/>
                <stop offset="0.97" stopColor={primaryColor}/>
                <stop offset="1" stopColor={primaryColor}/>
              </linearGradient>
            </defs>
          </svg>
        </RotatingSvgWrapper>
        
        {/* 가운데 고정된 스텝 표시 원 */}
        <CenterCircle centerSize={centerSize} primaryColor={primaryColor}>
          <StepText>Step {step}</StepText>
        </CenterCircle>
      </LoadingWrapper>
    </LoadingContainer>
  );
};

// 회전 애니메이션 (시계방향)
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// 로딩 컴포넌트 외부 컨테이너 (360x360 고정 영역)
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 360px;
  height: 360px;
`;

// 실제 로딩 컴포넌트 영역 (size에 따라 조절)
const LoadingWrapper = styled.div`
  position: relative;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 기본 베이스 원
const BaseCircle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${props => props.baseColor};
`;

// 회전하는 레이더 레이어
const RadarLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 1) 100%
  );
  animation: ${rotate} ${props => props.duration}s linear infinite;
`;

// 회전하는 SVG 래퍼 - 시작 각도 지정 가능
const RotatingSvgWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(${props => props.startAngle || 0}deg);
  animation: ${rotate} ${props => props.duration}s linear infinite;
`;

// 가운데 고정된 스텝 표시 원
const CenterCircle = styled.div`
  width: ${props => props.centerSize}px;
  height: ${props => props.centerSize}px;
  border-radius: 50%;
  background-color: ${props => props.primaryColor};
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

// 스텝 텍스트 스타일
const StepText = styled.div`
  color: white;
  font-family: 'Pretendard', Poppins;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.03em;
  line-height: 1.55em;
`;

export default WaitLongLodingBar; 