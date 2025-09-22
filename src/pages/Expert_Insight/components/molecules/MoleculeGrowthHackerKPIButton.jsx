import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  CONVERSATION_STAGE,
  GROWTH_HACKER_KPI_BUTTON_STATE,
  BUTTON_STATE,
  GROWTH_HACKER_RECOMMENDED_SOLUTION,
  GROWTH_HACKER_SELECTED_SOLUTION,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeGrowthHackerKPIButton = () => {
  const { saveConversation } = useSaveConversation();
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [growthHackerKPIButtonState, setGrowthHackerKPIButtonState] = useAtom(GROWTH_HACKER_KPI_BUTTON_STATE);
  const [growthHackerRecommendedSolution, setGrowthHackerRecommendedSolution] = useAtom(GROWTH_HACKER_RECOMMENDED_SOLUTION);
  const [growthHackerSelectedSolution, setGrowthHackerSelectedSolution] = useAtom(GROWTH_HACKER_SELECTED_SOLUTION);

  const handleClick = async (title, index) => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "growthHackerKPIButton"
    ) {
      updatedConversation.pop();
    }

    if (title) {
      updatedConversation.push(
        {
          type: "user",
          message:
            `${title}`,
          expertIndex: selectedExpertIndex,
        },
        {
          type: "system",
          message:
            `${title}이(가) 어떻게 우리 아이템을 성장시켜 갈 수 있을까요?`,
          expertIndex: selectedExpertIndex,
        },
        {
          type: 'growthHackerReport',
        },
      );

      setGrowthHackerRecommendedSolution(
        growthHackerRecommendedSolution.filter((_, i) => i !== index)
      );
      setGrowthHackerSelectedSolution([...growthHackerSelectedSolution, growthHackerRecommendedSolution[index]]);
      setGrowthHackerKPIButtonState(1);
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
              growthHackerKPI: 1,
            },
            conversationStage: 3,
          }
        }
      );

      setButtonState({
        ...buttonState,
        growthHackerKPI : 1,
      });
    }
    setConversation(updatedConversation);
    setConversationStage(3);
    setApproachPath(3);

    await saveConversation(
      { changingConversation: { 
          conversation: updatedConversation, 
          conversationStage: 3,
          growthHackerRecommendedSolution: growthHackerRecommendedSolution.filter((_, i) => i !== index),
          growthHackerSelectedSolution: [...growthHackerSelectedSolution, growthHackerRecommendedSolution[index]],
        }
      }
    );
  };
  return (
    <>
      <SelectButton>
        {growthHackerRecommendedSolution.map((solution, index) => (
          <button key={index} onClick={() => handleClick(solution.title, index)}>
            {solution.title}
          </button>
        ))}
        {growthHackerRecommendedSolution.length < 4 && <button onClick={() => handleClick()}>이정도면 충분해요</button>}
      </SelectButton>
    </>
  );
};

export default MoleculeGrowthHackerKPIButton;

const SelectButton = styled.div`
  display:flex;
  align-items:center;
  flex-wrap:wrap;
  gap:12px;
  margin-top: 12px;
  margin-left: 50px;

  button {
    // display:inline-block;
    // width:fit-content;
    flex-shrink:0;
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
