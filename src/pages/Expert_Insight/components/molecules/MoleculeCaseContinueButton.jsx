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
  CASE_HASH_TAG,
  IS_LOADING_CASE_HASHTAG,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import axios from "axios";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeCaseContinueButton = () => {
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
  const [caseHashTag, setCaseHashTag] = useAtom(CASE_HASH_TAG);
  const [isLoadingCaseHashTag, setIsLoadingCaseHashTag] = useAtom(IS_LOADING_CASE_HASHTAG);

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  const handleClick = async (type) => {
    if (isLoading) return;

    setIsLoadingCaseHashTag(true);

    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "caseContinueButton"
    ) {
      updatedConversation.pop();
    }

    if(type === "more") {
      updatedConversation.push(
        {
          type: "system",
          message:
            `"${titleOfBusinessInfo}"의 어떤 사례를 찾아드릴까요?\n아래 채팅창에 원하시는 내용을 입력해주세요.`,
          expertIndex: selectedExpertIndex,
        },
      );
  
      setConversation(updatedConversation);
      setConversationStage(3);
      setApproachPath(3);
      setButtonState({
        ...buttonState,
        caseStart : 1,
      });

      saveConversation(
        { changingConversation: 
          { conversation: updatedConversation, 
            buttonState : {
              ...buttonState,
              caseStart : 1,
            },
            conversationStage: 3,
          }
        }
      );
  
      const data = {
        expert_id: "8",
        business_info: titleOfBusinessInfo,
        business_analysis_data: {
          명칭: titleOfBusinessInfo,
          주요_목적_및_특징: mainFeaturesOfBusinessInformation,
          주요기능: mainCharacteristicOfBusinessInformation,
          목표고객: businessInformationTargetCustomer,
        }
      };
  
      let response = axios.post(
        "https://wishresearch.kr/panels/case_recommand_list",
        data,
        axiosConfig
      );
  
      let retryCount = 0;
      const maxRetries = 10;
  
      while (retryCount < maxRetries && (
        !response || 
        !response.data || 
        typeof response.data !== "object" ||
        !response.data.hasOwnProperty("case_recommand_list") || 
        !Array.isArray(response.data.case_recommand_list) ||
        response.data.case_recommand_list.some(item => 
          !item.hasOwnProperty("title") || 
          !item.hasOwnProperty("text")
        )
      )) 
      {
        response = await axios.post(
          "https://wishresearch.kr/panels/case_recommand_list",
          data,
          axiosConfig
        );
        retryCount++;
      }
      if (retryCount === maxRetries) {
        //console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
        // 에러 처리 로직 추가
        throw new Error("Maximum retry attempts reached. Empty response persists.");
      }
  
      const caseRecommandList = response.data.case_recommand_list;
      setCaseHashTag(caseRecommandList);

      saveConversation(
        { changingConversation: 
          { conversation: updatedConversation, 
            caseHashTag : caseRecommandList,
            buttonState : {
              ...buttonState,
              caseStart : 1,
            },
            conversationStage: 3,
          }
        }
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
        caseEnough: 1,
      });
      setConversation(updatedConversation);

      saveConversation(
        { changingConversation: 
          { conversation: updatedConversation, 
            buttonState : {
              ...buttonState,
              caseEnough: 1,
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
      <ButtonWrap>
          <button onClick={() => handleClick("more")}>추가 사례를 조사하겠습니다</button>
          <button onClick={() => handleClick("enough")}>이정도면 충분합니다</button>
      </ButtonWrap>
    </>
  );
};

export default MoleculeCaseContinueButton;

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

  button.none {
    cursor: default;
  }

  button.other {
    color: ${palette.lightGray};
    font-size: 0.75rem;
    border: none;
  }
`;
