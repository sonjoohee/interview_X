import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  CONVERSATION_ID,
  SELECTED_EXPERT_INDEX,
  TITLE_OF_BUSINESS_INFORMATION,
  CONVERSATION_STAGE,
  PRICE_START_BUTTON_STATE,
  PRICE_PRODUCT,
  IS_EDITING_NOW,
  PROJECT_TOTAL_INFO,
  CREDIT_CREATE_TOOL,
  USER_CREDITS,
  IS_LOGGED_IN,
  PROJECT_SAAS,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";
import { UserCreditUse, UserCreditInfo } from "../../../../utils/indexedDB";

import { palette } from "../../../../assets/styles/Palette";

const MoleculePriceStartButton = () => {
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [creditCreateTool] = useAtom(CREDIT_CREATE_TOOL);
  const [project] = useAtom(PROJECT_SAAS);
  const { saveConversation } = useSaveConversation();
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [priceStartButtonState, setPriceStartButtonState] = useAtom(PRICE_START_BUTTON_STATE);
  const [priceProduct, setPriceProduct] = useAtom(PRICE_PRODUCT);
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);

  const [projectTotalInfo, setProjectTotalInfo] = useAtom(PROJECT_TOTAL_INFO);
  
  const handleClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "priceStartButton"
    ) {
      updatedConversation.pop();
    }

    /* 제품 개수를 확인하는 API */

    // const data = {
    //   expert_id: "7",
    //   business_info: titleOfBusinessInfo,
    //   business_analysis_data: {
    //     명칭: titleOfBusinessInfo,
    //     주요_목적_및_특징: mainFeaturesOfBusinessInformation,
    //     주요기능: mainCharacteristicOfBusinessInformation,
    //     목표고객: businessInformationTargetCustomer,
    //   }
    // };

    // let response = await axios.post(
    //   "https://wishresearch.kr/panels/growth_hacker",
    //   data,
    //   axiosConfig
    // );

    // let retryCount = 0;
    // const maxRetries = 10;

    // while (retryCount < maxRetries && (
    //   !response || 
    //   !response.data || 
    //   typeof response.data !== "object" ||
    //   !response.data.hasOwnProperty("growth_hacker_report") || 
    //   !Array.isArray(response.data.growth_hacker_report) ||
    //   !response.data.growth_hacker_report[0].hasOwnProperty("content") ||
    //   !Array.isArray(response.data.growth_hacker_report[0].content) ||
    //   !response.data.growth_hacker_report[0].content[0].hasOwnProperty("text") ||
    //   !response.data.growth_hacker_report[0].content[1].hasOwnProperty("text") ||
    //   response.data.growth_hacker_report[1].content.some(item => 
    //     !item.hasOwnProperty("title") || 
    //     !item.hasOwnProperty("text") || 
    //     !item.hasOwnProperty("subcontent") || 
    //     !Array.isArray(item.subcontent) || 
    //     item.subcontent.some(contentItem => 
    //       !contentItem.hasOwnProperty("subTitle") || 
    //       !contentItem.hasOwnProperty("text")
    //     )
    //   )
    // )) 
    // {
    //   response = await axios.post(
    //     "https://wishresearch.kr/panels/growth_hacker",
    //     data,
    //     axiosConfig
    //   );
    //   retryCount++;
    // }
    // if (retryCount === maxRetries) {
    //   console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
    //   // 에러 처리 로직 추가
    //   throw new Error("Maximum retry attempts reached. Empty response persists.");
    // }
    
    const product = ["기능성 화장품"];
    setPriceProduct(product);

    updatedConversation.push(
      {
        type: "user",
        message:
          "시장 가격 분석하기를 진행하겠습니다",
        expertIndex: selectedExpertIndex,
      },
    );

    if(product.length === 1) {
      setPriceStartButtonState(1);

      updatedConversation.push(
        {
          type: "system",
          message:
            `${projectTotalInfo.projectTitle}에 관련된 제품 가격 정보를 확인하여 시장 가격 분석을 진행하겠습니다.`,
          expertIndex: selectedExpertIndex,
        },
        {
          type: 'priceReport',
        },
      );
    } else {
      updatedConversation.push(
        {
          type: "system",
          message:
            `시장 가격 분석을 위해 조사할 제품군을 확인해주세요`,
          expertIndex: selectedExpertIndex,
        },
        {
          type: 'priceOption',
        },
      );
    }

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
      service_type: "가격 분석 전문가",
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
        <button onClick={handleClick}>시장 가격 분석하기</button>
      </SelectButton>
    </>
  );
};

export default MoleculePriceStartButton;

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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left:0;
  }
`;
