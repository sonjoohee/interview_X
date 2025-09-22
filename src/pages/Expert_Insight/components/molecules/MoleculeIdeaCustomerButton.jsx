import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  CONVERSATION_STAGE,
  IDEA_CUSTOMER_BUTTON_STATE,
  BUTTON_STATE,
  IS_EDITING_IDEA_FEATURE,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeIdeaCustomerButton = () => {
  const { saveConversation } = useSaveConversation();
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [ideaCustomerButtonState, setIdeaCustomerButtonState] = useAtom(IDEA_CUSTOMER_BUTTON_STATE);
  const [isEditingIdeaFeature, setIsEditingIdeaFeature] = useAtom(IS_EDITING_IDEA_FEATURE);
  
  const handleClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "ideaCustomerButton"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: "user",
        message: "고객 니즈를 도출해주세요",
      },
      {
        type: "system",
        message: "해당 아이템과 관련된 고객 요구 사항을 살펴보았습니다.",
        expertIndex: selectedExpertIndex,
      },
      {
        type: 'ideaCustomer',
      },
    );

    setIsEditingIdeaFeature(false);
    setIdeaCustomerButtonState(1);
    setConversation(updatedConversation);
    setConversationStage(3);
    setApproachPath(3);
    setButtonState({
      ...buttonState,
      IdeaCustomer: 1
    });

    await saveConversation(
      { changingConversation: 
        { conversation: updatedConversation,
          conversationStage: 3,
          buttonState : {
            ...buttonState,
            IdeaCustomer : 1
          },
        }
      }
    );
  };
  return (
    <>
      <ButtonWrap>
        <button onClick={handleClick}>고객 요구사항 확인하기</button>
      </ButtonWrap>
    </>
  );
};

export default MoleculeIdeaCustomerButton;

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
