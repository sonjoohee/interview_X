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
        <CenterTime>{seconds}초</CenterTime>
      </LoaderContainer>
      <p>
        {message}
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
  gap: 50px;
  padding: 70px 0 50px;
  p {
    text-align: center;
    line-height: 1.5;
    color: ${palette.gray700};
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
  width: 120px;
  height: 120px;
`;

const CenterTime = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: ${palette.gray500};
`;

const Loader = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #009dff 94%, #0000) top/14.1px
      14.1px no-repeat,
    conic-gradient(#0000 30%, #009dff);
  -webkit-mask: radial-gradient(
    farthest-side,
    #0000 calc(100% - 14.1px),
    #000 0
  );
  animation: spinner 1.2s infinite linear;

  @keyframes spinner {
    100% {
      transform: rotate(1turn);
    }
  }
`;
