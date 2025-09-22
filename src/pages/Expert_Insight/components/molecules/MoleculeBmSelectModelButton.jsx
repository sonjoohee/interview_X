import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  CONVERSATION_STAGE,
  BM_LEAN_AUTO_REPORT_BUTTON_STATE,
  BM_BM_AUTO_REPORT_BUTTON_STATE,
  BM_OR_LEAN,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeBmSelectModelButton = () => {
  const { saveConversation } = useSaveConversation();
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [bmLeanAutoButtonState, setBmLeanAutoButtonState] = useAtom(BM_LEAN_AUTO_REPORT_BUTTON_STATE);
  const [bmBmAutoButtonState, setBmBmAutoButtonState] = useAtom(BM_BM_AUTO_REPORT_BUTTON_STATE);
  const [bmOrLean, setBmOrLean] = useAtom(BM_OR_LEAN);


  const handleBMClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "bmSelectModelButton"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: 'user', 
        message: 'BM 모델 확인하기'
      },
      {
        type: 'bmBmAutoReport',
      }
    );
    setBmBmAutoButtonState(1);
    setConversation(updatedConversation);
    setConversationStage(3);
    setApproachPath(3);
    setBmOrLean("Bm");

    saveConversation(
      { changingConversation: 
        { conversation: updatedConversation, 
          bmOrLean : "Bm",
          conversationStage: 3,
        }
      }
    );
  };

  const handleLeanClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "bmSelectModelButton"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      { 
        type: 'user', 
        message: 'Lean 캔버스 확인하기'
      },
      {
        type: 'bmLeanAutoReport',
      }
    );
    setBmLeanAutoButtonState(1);
    setConversation(updatedConversation);
    setConversationStage(3);
    setApproachPath(3);
    setBmOrLean("Lean");

    saveConversation(
      { changingConversation: 
        { conversation: updatedConversation, 
          bmOrLean : "Lean",
          conversationStage: 3,
        }
      }
    );
  };

  return (
    
    <>
      <SelectButton>
        <button onClick={handleLeanClick}>린캔버스 만들기</button>
        <button onClick={handleBMClick}>비즈니스 모델 캔버스 만들기</button>
      </SelectButton>
    </>
  );
};

export default MoleculeBmSelectModelButton;

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
