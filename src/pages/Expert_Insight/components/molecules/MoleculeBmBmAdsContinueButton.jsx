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
  IS_LOADING_CASE_HASHTAG,
  BM_BM_ADS_REPORT_BUTTON_STATE,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeBmBmAdsContinueButton = () => {
  const { saveConversation } = useSaveConversation();
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [isLoadingCaseHashTag, setIsLoadingCaseHashTag] = useAtom(IS_LOADING_CASE_HASHTAG);

  const [bmBmAdsButtonState, setBmBmAdsButtonState] = useAtom(BM_BM_ADS_REPORT_BUTTON_STATE);

  const handleClick = async (type) => {
    if (isLoading) return;

    setIsLoadingCaseHashTag(true);

    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "bmBmAdsContinueButton"
    ) {
      updatedConversation.pop();
    }

    if(type === "more") {
        updatedConversation.push(
          {
            type: "user",
            message: "비즈니스 모델 캔버스 세분화하기"
          },
          {
            type: "system",
            message:
              "제가 세분화하기 위한 여러가지 고객 세그먼트를 도출해보았어요",
            expertIndex: selectedExpertIndex,
          },
          { type: `bmBmAdsReport` }
        );
        setConversationStage(3);
        setConversation(updatedConversation);
        setBmBmAdsButtonState(1);

        saveConversation({ changingConversation: { conversation: updatedConversation, conversationStage: 3 } });
    } else {
      updatedConversation.push(
        {
          type: "system",
          message:
            "이외에 궁금한 점은 대화창에 입력해주시거나, 아래 키워드를 활용하여 추가적인 조언을 받아보세요",
          expertIndex: selectedExpertIndex,
        },
        { type: `keyword` }
      );
      setButtonState({
        ...buttonState,
        bmEnough: 1,
      });
      setConversation(updatedConversation);

      saveConversation(
        { changingConversation: 
          { conversation: updatedConversation, 
            buttonState : {
              ...buttonState,
              bmEnough: 1,
            },
            conversationStage: 3,
          }
        }
      );
    }

    setConversationStage(3);
    setApproachPath(3);
    setIsLoadingCaseHashTag(false);
  };
  return (
    <>
      <SelectButton>
          <button onClick={() => handleClick("more")}>비즈니스 모델 캔버스 세분화하기 ✂</button>
          <button onClick={() => handleClick("enough")}>이정도면 충분해요</button>
      </SelectButton>
    </>
  );
};

export default MoleculeBmBmAdsContinueButton;

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
