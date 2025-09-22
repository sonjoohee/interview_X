import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../../../../assets/styles/Theme";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CONVERSATION,
  MARKETING_START_BUTTON_STATE,
} from "../../../../AtomStates";

import { useSaveConversation } from "../../atoms/AtomSaveConversation";

import { palette } from "../../../../../assets/styles/Palette";

const MoleculeMarketingStartButton = () => {
  const { saveConversation } = useSaveConversation();
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [marketingStartButtonState, setMarketingStartButtonState] = useAtom(MARKETING_START_BUTTON_STATE);

  const handleClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "marketingStartButton"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: 'user',
        message: '시장조사 시작하기',
      },
      {
        type: 'system',
        message: '시장조사가 진행 중 입니다... 🔍 잠시 후 시장조사 결과가 도착합니다.\n과연 내가 선택한 아이템의 가능성은 ?!',
        expertIndex: 0,
      },
      {
        type: 'marketingResearchReport',
      }
    );

    setConversation(updatedConversation);
    setMarketingStartButtonState(1);

    saveConversation({ changingConversation: { conversation: updatedConversation } });
  };
  return (
    <>
    <ThemeProvider theme={theme}>
      <SelectButton>
        <button onClick={handleClick}>시장조사 시작하기 🚀</button>
      </SelectButton>
    </ThemeProvider>
    </>
  );
};

export default MoleculeMarketingStartButton;

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