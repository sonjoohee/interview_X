import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  CONVERSATION_STAGE,
  IS_EDITING_NOW,
  SELECTED_EXPERT_INDEX,
  CREDIT_CREATE_TOOL,
  USER_CREDITS,
  IS_LOGGED_IN,
  PROJECT_SAAS,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";
import { UserCreditUse, UserCreditInfo } from "../../../../utils/indexedDB";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeGrowthHackerStartButton = () => {
  const { saveConversation } = useSaveConversation();
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [creditCreateTool] = useAtom(CREDIT_CREATE_TOOL);
  const [project] = useAtom(PROJECT_SAAS);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);

  const handleClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "growthHackerStartButton"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: "user",
        message: "아이템 진단하기",
      },
      {
        type: "system",
        message: "마케팅 퍼널 분석을 시작하려면 몇가지 질문에 응답해 주셔야 합니다. ",
        expertIndex: selectedExpertIndex,
      },
      {
        type: 'growthHackerOption',
      },
    );
    setIsEditingNow(false);
    setConversation(updatedConversation);
    setConversationStage(3);
    setApproachPath(3);

    await saveConversation(
      { changingConversation: { conversation: updatedConversation, conversationStage: 3 } }
    );
     // 크레딧이 사용 가능한 상태면 사용 API 호출
     const creditUsePayload = {
      title: project.projectTitle,
      service_type: "그로스 해커",
      target: "",
      state: "use",
      mount: creditCreateTool,
    };

    await UserCreditUse(creditUsePayload, isLoggedIn);

    // 크레딧 사용 후 사용자 정보 새로고침

    const userCreditValue = await UserCreditInfo(isLoggedIn);
    // 전역 상태의 크레딧 정보 업데이트
    setUserCredits(userCreditValue);
  };
  return (
    <>
      <SelectButton>
        <button onClick={handleClick}>아이템 진단하기 🛠</button>
      </SelectButton>
    </>
  );
};

export default MoleculeGrowthHackerStartButton;

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
`;
