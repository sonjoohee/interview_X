import styled, { keyframes } from "styled-components";
import { palette } from "./Palette";

export const loadingAnimation = keyframes`
  0% {
    background-position: -1000px;
  }
  100% {
    background-position: 1200px;
  }
`;


export const SkeletonH1 = styled.h1`
  width: 40%;
  height: 28px;
  border-radius: 6px;
  margin-bottom: 20px;
  // animation: shimmer 1.5s infinite linear;
  animation: ${loadingAnimation} 3s infinite linear;
  background: #F9FAFB;
  background-image: -webkit-linear-gradient(to right, #F9FAFB 0%, #F2F4F7 20%, #FCFCFC 40%, #F9FAFB 100%);
  background-image: linear-gradient(to right, #F9FAFB 0%, #F2F4F7 20%, #FCFCFC 40%, #F9FAFB 100%);
  background-repeat: no-repeat;

  @keyframes shimmer {
    0% {
      background-position: -100%;
    }
    100% {
      background-position: 100%;
    }
  }
`;

export const SkeletonTitle = styled.div`
  width: 20%;
  height: 32px;
  border-radius: 6px;
  margin-bottom: 10px;
  // animation: shimmer 1.5s infinite linear;
  animation: ${loadingAnimation} 3s infinite linear;
  background: #F9FAFB;
  background-image: -webkit-linear-gradient(to right, #F9FAFB 0%, #F2F4F7 20%, #FCFCFC 40%, #F9FAFB 100%);
  background-image: linear-gradient(to right, #F9FAFB 0%, #F2F4F7 20%, #FCFCFC 40%, #F9FAFB 100%);
  background-repeat: no-repeat;

  @keyframes shimmer {
    0% {
      background-position: -100%;
    }
    100% {
      background-position: 100%;
    }
  }
`;

export const SkeletonLine = styled.div`
  width: 100%;
  height: 32px;
  border-radius: 6px;
  margin-top: 8px;
  // animation: shimmer 1.5s infinite linear;
  animation: ${loadingAnimation} 3s infinite linear;
  background: #F9FAFB;
  background-image: -webkit-linear-gradient(to right, #F9FAFB 0%, #F2F4F7 20%, #FCFCFC 40%, #F9FAFB 100%);
  background-image: linear-gradient(to right, #F9FAFB 0%, #F2F4F7 20%, #FCFCFC 40%, #F9FAFB 100%);
  background-repeat: no-repeat;

  &.white {
    background: #FFFFFF;
    background-image: -webkit-linear-gradient(to right, #FFFFFF 0%, #FAFBFC 20%, #FFFFFF 40%, #FFFFFF 100%);
    background-image: linear-gradient(to right, #FFFFFF 0%, #FAFBFC 20%, #FFFFFF 40%, #FFFFFF 100%);
  }

  @keyframes shimmer {
    0% {
      background-position: -100%;
    }
    100% {
      background-position: 100%;
    }
  }
`;

export const Spacing = styled.div`
  margin-bottom: 40px; /* 제목과 본문 사이의 간격 */
`;
