import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import axios from "axios";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  IDEA_PRIORITY_BUTTON_STATE,
  IDEA_LIST,
  IDEA_PRIORITY,
  CONVERSATION_STAGE,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import {
  SkeletonTitle,
  SkeletonLine,
  Spacing,
} from "../../../../assets/styles/Skeleton";

import images from "../../../../assets/styles/Images";
import MoleculeReportController from "../molecules/MoleculeReportController";

const OrganismIdeaPriority = () => {
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const { saveConversation } = useSaveConversation();
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [
    mainFeaturesOfBusinessInformation,
    setMainFeaturesOfBusinessInformation,
  ] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    mainCharacteristicOfBusinessInformation,
    setMainCharacteristicOfBusinessInformation,
  ] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [
    businessInformationTargetCustomer,
    setBusinessInformationTargetCustomer,
  ] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);

  const [ideaPriorityButtonState, setIdeaPriorityButtonState] = useAtom(IDEA_PRIORITY_BUTTON_STATE);
  const [ideaList, setIdeaList] = useAtom(IDEA_LIST);
  const [ideaPriority, setIdeaPriority] = useAtom(IDEA_PRIORITY);
  const [isLoadingIdeaPriority, setIsLoadingIdeaPriority] = useState(false);

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  useEffect(() => {
    const fetchIdeaList = async () => {

      if(ideaPriorityButtonState) {
        setIsLoading(true);
        setIsLoadingIdeaPriority(true);
        setIdeaPriorityButtonState(0);

        const data = {
          expert_id: "5",
          business_info: titleOfBusinessInfo,
          business_analysis_data: {
            명칭: titleOfBusinessInfo,
            주요_목적_및_특징: mainFeaturesOfBusinessInformation,
            주요기능: mainCharacteristicOfBusinessInformation,
            목표고객: businessInformationTargetCustomer,
          },
          dev_report: ideaList,
        };

        let response = await axios.post(
          "https://wishresearch.kr/panels/idea_priority",
          data,
          axiosConfig
        );

        let retryCount = 0;
        const maxRetries = 10;

        while (retryCount < maxRetries && (
          !response || !response.data || typeof response.data !== "object" ||
          !response.data.hasOwnProperty("dev_persona_recommand_report") ||
          !Array.isArray(response.data.dev_persona_recommand_report) ||
          response.data.dev_persona_recommand_report.some(item => 
            !item.hasOwnProperty("title") || 
            !item.hasOwnProperty("content") ||
            !item.content[0].hasOwnProperty("title") ||
            !item.content[0].hasOwnProperty("text") ||
            item.content.slice(1).some(subItem => 
              !subItem.hasOwnProperty("subTitle") ||
              !subItem.hasOwnProperty("text")
            )
          )
        )) {
          response = await axios.post(
            "https://wishresearch.kr/panels/idea_priority",
            data,
            axiosConfig
          );
          retryCount++;
        }
        if (retryCount === maxRetries) {
         // console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
          // 에러 처리 로직 추가
          throw new Error("Maximum retry attempts reached. Empty response persists.");
        }

        setIdeaPriority(response.data.dev_persona_recommand_report);

        setIsLoading(false);
        setIsLoadingIdeaPriority(false);

        const updatedConversation = [...conversation];
        updatedConversation.push(
          {
            type: "system",
            message:
              "리포트 내용을 보시고 추가로 궁금한 점이 있나요?\n아래 키워드 선택 또는 질문해주시면, 더 많은 인사이트를 제공해 드릴게요! 😊",
            expertIndex: selectedExpertIndex,
          },
          { type: `keyword` }
        );
        setConversationStage(3);
        setConversation(updatedConversation);

        await saveConversation(
          { changingConversation: { conversation: updatedConversation, conversationStage: 3, ideaPriority : response.data.dev_persona_recommand_report, } }
        );
      }
    };

    fetchIdeaList();
  }, [ideaPriorityButtonState]);

  return (
    <Wrap>
      {isLoadingIdeaPriority ? (
        <>
          <SkeletonTitle className="title-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <Spacing />
          <SkeletonTitle className="title-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <Spacing />
          <SkeletonTitle className="title-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <SkeletonLine className="content-placeholder" />
        </>
      ) : (
        <>
          <h1>페르소나별 아이디어 우선순위 선별</h1>

      {ideaPriority.map((persona, index) => (
        <SeparateSection key={index}>
          <h3>
            <span className="number">{index + 1}</span>
            페르소나 : {persona.title}
          </h3>
          <p>{persona.content[0].text}</p>
          <div>
            <ol className="list-decimal">
              {persona.content.map((contentItem, index) => (
                contentItem.subTitle && (
                  <li key={index}>{contentItem.subTitle} : {contentItem.text}</li>
                )
              ))}
            </ol>
          </div>
          </SeparateSection>
        ))}
      
      <MoleculeReportController
        reportIndex={5}
        sampleData={ideaPriority}
        />
      </>
      )}

    </Wrap>
  );
};

export default OrganismIdeaPriority;

const Wrap = styled.div`
  max-width:986px;
  // width:100%;
  display:flex;
  flex-direction:column;
  padding: 28px;
  margin:24px 0 0 50px;
  border-radius:15px;
  border:1px solid ${palette.outlineGray};

  h1 {
    font-size:1.25rem;
    font-weight:400;
    text-align:left;
    margin-bottom:20px;
  }
`;

const SeparateSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap:12px;
  margin-top: 12px;
  padding: 20px;
  border-radius: 10px;
  background: ${palette.chatGray};

  h3 {
    display:flex;
    align-items:center;
    gap:12px;
    font-size:1rem;
    font-weight:700;

    span {
      width: 15px;
      height: 15px;
      font-size: 0.63rem;
      color: ${palette.primary};
      line-height: 15px;
      text-align: center;
      border: 1px solid ${palette.primary};
    }
  }

  p {
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray700};
    text-align:left;
  }

  div {
    padding:16px;
    border-radius:10px;
    background:${palette.white};
  }

  .list-decimal li {
    list-style-type:decimal;
    list-style-position:inside;
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray800};
    line-height:1.5;
    text-align:left;
  }
`;
