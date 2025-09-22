import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  CONVERSATION_STAGE,
  IDEA_FEATURE_BUTTON_STATE,
  IS_EDITING_NOW,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeIdeaStartButton = () => {
  const { saveConversation } = useSaveConversation();
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [ideaFeatureButtonState, setIdeaFeatureButtonState] = useAtom(IDEA_FEATURE_BUTTON_STATE);
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);

  const handleClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "ideaStartButton"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: "user",
        message: "체계적인 방법으로 많은 아이디어 발상 부탁드립니다.",
      },
      {
        type: "system",
        message: "구조화된 아이디어 발상을 위해, 먼저 아이템의 기능 및 특성을 살펴보겠습니다.",
        expertIndex: selectedExpertIndex,
      },
      {
        type: 'ideaFeature',
      },
    );

    setIsEditingNow(false);
    setIdeaFeatureButtonState(1);
    setConversation(updatedConversation);
    setConversationStage(3);
    setApproachPath(3);

    await saveConversation(
      { changingConversation: { conversation: updatedConversation, conversationStage: 3 } }
    );
  };
  return (
    <>
      <ButtonWrap>
        <button onClick={handleClick}>구조화된 아이디어 발상 시작하기</button>
      </ButtonWrap>
    </>
  );
};

export default MoleculeIdeaStartButton;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  margin-left:50px;
  padding-bottom: 15px;

  button {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: "Pretendard";
    font-size: 0.875rem;
    color: ${palette.darkGray};
    border: 0;
    background: none;
    margin-right: 10px;
  }

  > button {
    padding: 8px 16px;
    border-radius: 40px;
    border: 1px solid ${palette.buttonLineGray};
  }

  button.other {
    color: ${palette.lightGray};
    font-size: 0.75rem;
    border: none;
  }
`;
