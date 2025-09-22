import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  CONVERSATION_STAGE,
  IDEA_LIST_BUTTON_STATE,
  BUTTON_STATE,
  IS_EDITING_IDEA_CUSTOMER,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeIdeaGenerateButton = () => {
  const { saveConversation } = useSaveConversation();
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [ideaListButtonState, setIdeaListButtonState] = useAtom(IDEA_LIST_BUTTON_STATE);
  const [isEditingIdeaCustomer, setIsEditingIdeaCustomer] = useAtom(IS_EDITING_IDEA_CUSTOMER);

  const handleClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "ideaGenerateButton"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: "user",
        message: "다양한 관점의 아이디어들이 기대됩니다. ",
      },
      {
        type: "system",
        message: "구조화된 방법론으로 아이디어를 도출했습니다.\n아이디어 리스트는 다운로드 하거나 Miro에서 확인 가능합니다. 파일에서 상세 설명을 확인하고 Miro로 팀원들과 우선순위를 논의해보세요.",
        expertIndex: selectedExpertIndex,
      },
      {
        type: 'ideaList',
      },
    );
    setIsEditingIdeaCustomer(false);
    setIdeaListButtonState(1);
    setConversation(updatedConversation);
    setConversationStage(3);
    setApproachPath(3);
    setButtonState({
      ...buttonState,
      IdeaGenerate: 1
    });

    await saveConversation(
      { changingConversation: 
        { 
          conversation: updatedConversation,
          conversationStage: 3,
          buttonState : {
            ...buttonState,
            IdeaGenerate : 1
          },
        }
      }
    );
  };
  return (
    <>
      <ButtonWrap>
        <button onClick={handleClick}>아이디어 생성하기</button>
      </ButtonWrap>
    </>
  );
};

export default MoleculeIdeaGenerateButton;

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
