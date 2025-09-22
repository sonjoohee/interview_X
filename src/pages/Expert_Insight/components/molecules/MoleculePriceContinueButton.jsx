import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  CONVERSATION_STAGE,
  BUTTON_STATE,
  PRICE_CONTINUE_BUTTON_STATE,
  PRICE_PRODUCT,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import { palette } from "../../../../assets/styles/Palette";

const MoleculePriceContinueButton = () => {
  const { saveConversation } = useSaveConversation();
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation,] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [priceContinueButtonState, setPriceContinueButtonState] = useAtom(PRICE_CONTINUE_BUTTON_STATE);
  const [priceProduct, setPriceProduct] = useAtom(PRICE_PRODUCT);

  const handleClick = async (type, index) => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "priceContinueButton"
    ) {
      updatedConversation.pop();
    }

    if(type === "more") {
      setPriceContinueButtonState(1);

      updatedConversation.push(
        {
          type: "user",
          message:
            `${titleOfBusinessInfo} 시장 가격 분석을 진행해주세요`,
        },
        {
          type: "system",
          message:
            `총 4가지 제품군으로 세분화된 ${titleOfBusinessInfo}의 가격 분석을 진행할 수 있습니다.\n원하는 제품군을 선택해 주세요.`,
          expertIndex: selectedExpertIndex,
        },
        { type: `priceProductSegmentation` },
      );

      setConversation(updatedConversation);

      await saveConversation(
        { changingConversation: { conversation: updatedConversation, conversationStage: 3 } }
      );
    } else {
      updatedConversation.push(
        {
          type: "system",
          message:
            "리포트 내용을 보시고 추가로 궁금한 점이 있나요?\n아래 키워드 선택 또는 질문해주시면, 더 많은 인사이트를 제공해 드릴게요! 😊",
          expertIndex: selectedExpertIndex,
        },
        { type: `keyword` }
      );
      setButtonState({
        ...buttonState,
        priceEnough: 1,
      });
      setConversation(updatedConversation);

      await saveConversation(
        { changingConversation: 
          { conversation: updatedConversation, 
            conversationStage: 3,
            buttonState : {
              ...buttonState,
              priceEnough: 1,
            },
          }
        }
      );

    }

    setConversationStage(3);
    setApproachPath(3);
  };
  return (
    <>
      <SelectButton>
        {priceProduct.length === 1 ? (
          <>
            <button className="none">"{titleOfBusinessInfo}"을 더 세분화하여 분석할래요 (준비중)</button>
            <button onClick={() => handleClick("enough")}>이정도면 충분해요</button>
          </>
        ) : (
          <>
            {priceProduct.map((product, index) => (
              <button key={index} onClick={() => handleClick("more", index)}>
                "{product}"의 시장 가격을 분석할래요
              </button>
            ))}
            <button onClick={() => handleClick("enough")}>이정도면 충분해요</button>
          </>
        )}
      </SelectButton>
    </>
  );
};

export default MoleculePriceContinueButton;

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

  button.none {
    cursor: default;
  }

  .finish {
    color:${palette.gray500};
    background:${palette.gray100};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left:0;
  }
`;
