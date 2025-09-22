import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../../../../assets/styles/Theme";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CONVERSATION,
  MARKETING_BM_BUTTON_STATE,
  TITLE_OF_BUSINESS_INFORMATION,
} from "../../../../AtomStates";

import { useSaveConversation } from "../../atoms/AtomSaveConversation";

import { palette } from "../../../../../assets/styles/Palette";

const MoleculeMarketingBmButton = () => {
  const { saveConversation } = useSaveConversation();
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [marketingBmButtonState, setMarketingBmButtonState] = useAtom(MARKETING_BM_BUTTON_STATE);

  const handleClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "marketingBmButton"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: 'user',
        message: 'BM분석 시작하기',
      },
      {
        type: 'system',
        message: `BM 분석을 진행 중입니다! ${titleOfBusinessInfo}의 시장 성공 가능성을 구체화하는 중이에요.\n곧 나올 비즈니스 모델 전략, 과연 대박 전략일까요? 신박한 발견 일까요? 👀`,
        expertIndex: 0,
      },
      {
        type: 'marketingBmReport',
      }
    );

    setConversation(updatedConversation);
    setMarketingBmButtonState(1);

    saveConversation({ changingConversation: { conversation: updatedConversation } });
  };
  return (
    <>
    <ThemeProvider theme={theme}>
      <SelectButton>
        <button onClick={handleClick}>BM분석 시작하기 📈</button>
      </SelectButton>
    </ThemeProvider>
    </>
  );
};

export default MoleculeMarketingBmButton;

const SelectButton = styled.div`
  display:flex;
  align-items:center;
  gap:12px;
  margin-top: 12px;
  margin-left: 50px;

  button {
    // display:inline-block;
    // width:fit-content;
    font-family: 'Pretendard', 'Poppins';
    font-size:0.88rem;
    color:${palette.primary};
    padding:8px 20px;
    border-radius:40px;
    border:0;
    background:rgba(4, 83, 244, 0.1);
  }

  .finish {
    color:${palette.gray500};
    background:${palette.gray100};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left:0;
  }
`;