import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  CONVERSATION_STAGE,
  PRICE_CONTINUE_BUTTON_STATE,
  PRICE_PRODUCT_SEGMENTATION,
  PRICE_START_BUTTON_STATE,
  PRICE_SELECTED_PRODUCT_SEGMENTATION,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import { palette } from "../../../../assets/styles/Palette";

const MoleculePriceContinueButton = () => {
  const { saveConversation } = useSaveConversation();
  const [priceSelectedProductSegmentation, setPriceSelectedProductSegmentation] = useAtom(PRICE_SELECTED_PRODUCT_SEGMENTATION);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation,] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [priceContinueButtonState, setPriceContinueButtonState] = useAtom(PRICE_CONTINUE_BUTTON_STATE);
  const [priceProductSegmentation, setPriceProductSegmentation] = useAtom(PRICE_PRODUCT_SEGMENTATION);
  const [priceStartButtonState, setPriceStartButtonState] = useAtom(PRICE_START_BUTTON_STATE);

  useEffect(() => {
    const fetchPriceProductSegmentation = async () => {
      if(priceContinueButtonState === 1) {
        /* 제품 개수를 확인하는 API */
        // setIsLoading(true);
        // setIsLoadingPrice(true);
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
        // setIsLoadingPrice(false);
        // setIsLoading(false);
      setPriceContinueButtonState(0);
      setPriceProductSegmentation(["클랜징 디바이스", "리프팅 및 탄력 디바이스", "LED 마스크 디바이스", "모공 관리 디바이스"]);

      setConversationStage(3);
      setApproachPath(3);

      await saveConversation(
        { changingConversation: { conversation: conversation, conversationStage: 3 } }
      );
    }
  }
    fetchPriceProductSegmentation();
  }, [priceContinueButtonState]);

  const handleClick = async (index) => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "priceProductSegmentation"
    ) {
      updatedConversation.pop();
    }

    setPriceSelectedProductSegmentation([...priceSelectedProductSegmentation, priceProductSegmentation[index]]);
    setPriceStartButtonState(1);

    updatedConversation.push(
      {
        type: "user",
        message:
          `${priceProductSegmentation[index]}의 가격 분석을 진행하겠습니다`,
      },
      { type: `priceReport` }
    );

    setConversation(updatedConversation);
    setConversationStage(3);
    setApproachPath(3);

    await saveConversation(
      { changingConversation: 
        { 
          conversation: updatedConversation, 
          conversationStage: 3,         
          priceSelectedProductSegmentation : [
            ...priceSelectedProductSegmentation,
            priceProductSegmentation[index],
          ],
        } 
      }
    );
  };
  return (
    <>
      <ButtonWrap>
        <>
          {priceProductSegmentation.map((product, index) => (
            <button key={index} onClick={() => handleClick(index)}>
              {product}
            </button>
          ))}
        </>
      </ButtonWrap>
    </>
  );
};

export default MoleculePriceContinueButton;

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
