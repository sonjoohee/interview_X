import React, { useEffect, useState } from "react";
import styled, { keyframes, css, ThemeProvider } from "styled-components";
import theme from "../../../../assets/styles/Theme";
import { useAtom } from "jotai";
import { palette } from "../../../../assets/styles/Palette";


import {
  PROJECT_CREATE_INFO,
  PROJECT_TOTAL_INFO
} from "../../../AtomStates";

const OrganismExpertBusinessAnalysis = () => {
  const [projectCreateInfo] = useAtom(PROJECT_CREATE_INFO);
  const [projectTotalInfo] = useAtom(PROJECT_TOTAL_INFO);

  return (
    <>
      <ThemeProvider theme={theme}>
        <>
            <AnalysisSection>
              <div>
                <h1>{projectTotalInfo.projectTitle}</h1>
                <BoxWrap>
                  <strong>
                    {/* <img src={images.StarChack} alt="" /> */}
                    프로젝트 개요
                  </strong>
                  <ul className={projectCreateInfo.file_analysis ? "disc" : ""}>
                    <li>
                      <p>{projectCreateInfo.business_analysis}</p>
                    </li>
                    {projectCreateInfo.file_analysis && (
                      <li>
                        <p>{projectCreateInfo.file_analysis}</p>
                      </li>
                    )}
                  </ul>
                </BoxWrap>
                <BoxWrap>
                  <strong>
                    {/* <img src={images.IconSetting} alt="" /> */}
                    주요 타겟 고객군
                  </strong>
                  <ul>
                    <li>
                      <p>{projectCreateInfo.target_customer}</p>
                    </li>
                  </ul>
                </BoxWrap>
              </div>
            </AnalysisSection>
        </>
      </ThemeProvider>
    </>
  );
};

export default OrganismExpertBusinessAnalysis;

const AnalysisSection = styled.div`
  position: relative;
  max-width: 986px;
  // width:100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
  margin-top: 25px;
  margin-left: 50px;
  padding: 28px;
  border-radius: 15px;
  background: ${palette.chatGray};

  h1 {
    font-size: 1.25rem;
    font-weight: 300;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left: 0;
  }
`;

const BoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  strong {
    font-weight: 600;
    line-height: 1.2;
  }

  ul {
    position: relative;
    font-weight: 300;
    line-height: 1.6;
    color: ${palette.gray800};
    padding-left: 20px;

    &:before {
      position: absolute;
      left: 0;
      top: 0;
      width: 2px;
      height: 100%;
      background: ${palette.gray200};
      content: "";
    }

    li {
      display: flex;
      gap: 10px;
    }

    &.disc li {
      position: relative;
      padding-left: 13px;

      &:before {
        position: absolute;
        left: 0;
        top: 11px;
        width: 3px;
        height: 3px;
        border-radius: 100%;
        background: ${palette.gray800};
        content: "";
      }
    }
  }

  button {
    flex-shrink: 0;
    font-family: "Pretendard";
    font-size: 0;
    color: ${palette.gray};
    padding: 5px 8px;
    border-radius: 5px;
    border: 0;
    background: ${palette.white};

    img {
      width: 14px;
      height: 14px;
    }

    &.add {
      color: ${palette.white};
      border: 1px solid ${palette.black};
      background: ${palette.black};
    }
  }

  .moreButton {
    width: 100%;
    font-size: 0.75rem;
    margin-top: 4px;
    padding: 8px;
    border: 0;
  }
`;