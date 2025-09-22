import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  CONVERSATION_STAGE,
  BUTTON_STATE,
  IS_EDITING_NOW,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeSurveyStartButton = () => {
  const { saveConversation } = useSaveConversation();
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);

  const handleClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "surveyStartButton"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: "user",
        message: "설문조사를 설계 해주세요.",
      },
      {
        type: "system",
        message: "설문조사를 위해 어떤 내용을 확인하고 싶으신가요? \n아래 채팅창에 설문조사의 목적을 입력해주세요",
        expertIndex: selectedExpertIndex,
      }
    );

    setIsEditingNow(false);
    setConversation(updatedConversation);
    setConversationStage(3);
    setApproachPath(3);
    setButtonState({
      ...buttonState,
      surveyGoalInputStart : 1,
    });

    await saveConversation(
      { changingConversation: { 
          conversationStage: 3, 
          buttonState : {
            ...buttonState,
            surveyGoalInputStart : 1,
          },
        }
      }
    );
  };
  return (
    <>
      <ButtonWrap>
        <button onClick={handleClick}>설문조사 설계 진행하기</button>
      </ButtonWrap>
    </>
  );
};

export default MoleculeSurveyStartButton;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  padding-bottom: 15px;
  margin-left:50px;

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
    border: 1px solid ${palette.lineGray};
  }

  button.other {
    color: ${palette.lightGray};
    font-size: 0.75rem;
    border: none;
  }
`;
