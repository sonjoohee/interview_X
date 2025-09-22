import React from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";

const AtomLoader = () => {

  return (
    <>
    <LoaderWrap>
      <Loader><em>분석중이에요 ...</em></Loader>
      {/* <p>분석중이에요 ...</p> */}
    </LoaderWrap>
    </>
  );
};

export default AtomLoader;

const LoaderWrap = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:8px;

  p {
    font-size:0.75rem;
    font-weight:300;
    line-height:2.1;
    color:${palette.gray500};
  }
`;

const Loader = styled.span`
  position: relative;
  width: 110px;
  height: 110px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius: 50%;
  border:10px solid ${palette.gray100};
  transform:rotate(45deg);

  &:before {
    position: absolute;
    inset:-10px;
    border-radius: 50%;
    border:10px solid rgba(4, 83, 244, 0.5);
    animation: loader 2s infinite linear;
    content: "";
  }

  em {
    // font-size:1.25rem;
    font-style:normal;
    // line-height:1.3;
    // color:${palette.blue};
    transform:rotate(-45deg);
    font-size:0.75rem;
    font-weight:300;
    line-height:2.1;
    color:${palette.gray500};
  }

  @keyframes loader {
    0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
    25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
    50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
    75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
    100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
  }
`;
