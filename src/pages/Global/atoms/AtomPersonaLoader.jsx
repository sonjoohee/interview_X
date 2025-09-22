import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { palette } from "../../../assets/styles/Palette";

const AtomPersonaLoader = ({ message = "비즈니스를 분석하고 있어요" }) => {
  const [seconds, setSeconds] = useState(0);
  const [, setDots] = useState("."); // 점(.) 상태 추가

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
      // 점(.)을 1개 -> 2개 -> 3개 순환
      setDots((prev) => {
        if (prev === ".") return "..";
        if (prev === "..") return "...";
        return ".";
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <LoaderWrap>
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
      <p>
        {message}
        <CenterTime>{seconds}초</CenterTime>
        {/* {dots} */}
      </p>
    </LoaderWrap>
  );
};

export default AtomPersonaLoader;

const LoaderWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 70px 0 50px;

  p {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    text-align: center;
    line-height: 1.5;
    color: ${palette.gray800};
  }
`;

// const TimeText = styled.span`
//   display: block;
//   margin-top: 8px;
//   font-size: 14px;
//   color: ${palette.gray500};
// `;

const LoaderContainer = styled.div`
  position: relative;
  width: 68px;
  height: 68px;
`;

const CenterTime = styled.div`
  font-size: 0.88rem;
  color: ${palette.gray500};
`;

const Loader = styled.span`
  position: absolute;
  width: 68px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image:
    radial-gradient(circle, ${palette.primary} 10px, transparent 0),
    radial-gradient(circle, ${palette.primary} 10px, transparent 0),
    radial-gradient(circle, ${palette.primary} 10px, transparent 0),
    radial-gradient(circle, ${palette.primary} 10px, transparent 0);
  background-repeat: no-repeat;
  background-size: 20px 20px;
  animation: moveCircles 1s linear infinite;

  @keyframes moveCircles {
    0% {
      background-position: 
        calc(50% - 5px) calc(50% - 5px),
        calc(50% - 5px) calc(50% + 5px),
        calc(50% + 5px) calc(50% - 5px),
        calc(50% + 5px) calc(50% + 5px);
      transform: rotate(0deg);
    }
    25% {
      background-position: 
        calc(50% - 15px) calc(50% - 15px),
        calc(50% - 15px) calc(50% + 15px),
        calc(50% + 15px) calc(50% - 15px),
        calc(50% + 15px) calc(50% + 15px);
      transform: rotate(90deg);
    }
    50% {
      background-position: 
        calc(50% - 25px) calc(50% - 25px),
        calc(50% - 25px) calc(50% + 25px),
        calc(50% + 25px) calc(50% - 25px),
        calc(50% + 25px) calc(50% + 25px);
      transform: rotate(180deg);
    }
    75% {
      background-position: 
        calc(50% - 15px) calc(50% - 15px),
        calc(50% - 15px) calc(50% + 15px),
        calc(50% + 15px) calc(50% - 15px),
        calc(50% + 15px) calc(50% + 15px);
      transform: rotate(270deg);
    }
    100% {
      background-position: 
        calc(50% - 5px) calc(50% - 5px),
        calc(50% - 5px) calc(50% + 5px),
        calc(50% + 5px) calc(50% - 5px),
        calc(50% + 5px) calc(50% + 5px);
      transform: rotate(360deg);
    }
  }
`;
