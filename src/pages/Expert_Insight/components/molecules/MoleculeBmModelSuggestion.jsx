import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import axios from "axios";
import Loader from "../atoms/AtomLoader";
import images from "../../../../assets/styles/Images";

import {
  IS_LOADING,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  CONVERSATION_STAGE,
  BM_MODEL_SUGGESTION_BUTTON_STATE,
  BM_QUESTION_LIST,
  BM_MODEL_SUGGESTION_REPORT_DATA,
  IS_LOGGED_IN,
  PROJECT_TOTAL_INFO,
  PROJECT_CREATE_INFO,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import { palette } from "../../../../assets/styles/Palette";

import { InterviewXBmCheckStageRequest } from "../../../../utils/indexedDB";

const MoleculeBmModelSuggestion = () => {
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
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);

  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);

  const [modelSuggestionButtonState, setModelSuggestionButtonState] = useAtom(BM_MODEL_SUGGESTION_BUTTON_STATE);
  const [bmModelSuggestionReportData, setBmModelSuggestionReportData] = useAtom(BM_MODEL_SUGGESTION_REPORT_DATA);

  const [isLoadingBmModelSuggestionReport, setIsLoadingBmModelSuggestionReport] = useState(false);
  const [bmQuestionList, setbmQuestionList] = useAtom(BM_QUESTION_LIST);

  const [projectTotalInfo, setProjectTotalInfo] = useAtom(PROJECT_TOTAL_INFO);
  const [projectCreateInfo, setProjectCreateInfo] = useAtom(PROJECT_CREATE_INFO);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  useEffect(() => {
    const fetchModelSuggestion = async () => {

      if(modelSuggestionButtonState) {
        setIsLoading(true);
        setIsLoadingBmModelSuggestionReport(true);
        setModelSuggestionButtonState(0);

        const data = {
          expert_id: "9",
          business_info: projectTotalInfo.projectTitle,
          business_analysis_data: projectCreateInfo,
          bm_question_list: bmQuestionList,
        };

        let response = await InterviewXBmCheckStageRequest(
          data,
          isLoggedIn
        );
        //console.log("bm 모델 제안 response", response);
        let retryCount = 0;
        const maxRetries = 10;

        while (retryCount < maxRetries && (
          !response || 
          !response.response || 
          typeof response.response !== "object" ||
          !Array.isArray(response.response.bm_check_stage_report) ||
          response.response.bm_check_stage_report.some(item =>
            !item.hasOwnProperty("title") || 
            !item.hasOwnProperty("content") ||
            !item.hasOwnProperty("model") ||
            !(item.model === "BM" || item.model === "Lean")
          )
        )) {
    
          response = await InterviewXBmCheckStageRequest(
            data,
            isLoggedIn
          );
          retryCount++;
        }
        if (retryCount === maxRetries) {
        //  console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
          // 에러 처리 로직 추가
          throw new Error("Maximum retry attempts reached. Empty response persists.");
        }
        setBmModelSuggestionReportData(response.response.bm_check_stage_report);

        setIsLoading(false);
        setIsLoadingBmModelSuggestionReport(false);

        const updatedConversation = [...conversation];
        updatedConversation.push(
          {
            type: "system",
            message:
              "아래 두개의 캔버스 중, 필요하신 캔버스를 선택해주세요",
            expertIndex: -1,
          },
          { type: `bmSelectModelButton` },
        );
        setConversationStage(3);
        setConversation(updatedConversation);

        saveConversation(
          { changingConversation: 
            { conversation: updatedConversation, 
              bmModelSuggestionReportData : response.response.bm_check_stage_report,
              conversationStage: 3,
            }
          }
        );
      }
    };

    fetchModelSuggestion();
  }, [modelSuggestionButtonState]);
  return (
    <>
    {isLoadingBmModelSuggestionReport ? (
      <Wrap style={{minWidth: "518px", minHeight: "530px", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Loader />
      </Wrap>

    ) : (
      <Wrap>
        <h1>린 캔버스 vs 비즈니스 모델 캔버스 매칭 분석
        <p>
            캔버스 알아보기
            <span onClick={toggleVisibility}>!</span>
          </p>
          {isVisible && 
            <ToogleBox>
              <span onClick={toggleVisibility}>닫기</span>
              <div>
                <strong>린캔버스와 비즈니스 모델 캔버스는 무엇일까요?</strong>
                <p>린 캔버스와 비즈니스 모델 캔버스는 스타트업이나 사업 아이디어를 정리하고 구체화하는 도구입니다. 특히, 린캔버스는 문제 해결과 빠른 실행을 위해, 비즈니스 모델 캔버스는 전체 비즈니스 구조 설계에 중점을 둔 도구입니다.</p>
                
                <TabWrap>
                  <input type="radio" id="tab1" name="tabs" checked />
                  <label htmlFor="tab1">린 캔버스</label>
                  <input type="radio" id="tab2" name="tabs" />
                  <label htmlFor="tab2">비즈니스 모델 캔버스</label>

                  <TabContents id="tab-content1">
                    <p>린 캔버스는 스타트업이나 신규 사업 아이디어를 빠르게 검증하고 실행하기 위한 도구입니다. 애쉬 모리야(Ash Maurya)가 개발한 이 캔버스는 복잡한 계획보다는 간단하고 핵심적인 요소들만을 다룹니다. 린 캔버스는 다음과 같은 9가지 요소로 구성됩니다</p>
                    <ol>
                      <li>문제: 해결하려는 주요 문제를 명확히 정의합니다.</li>
                      <li>고객 세그먼트: 문제를 겪고 있는 타겟 고객 그룹을 설정합니다.</li>
                      <li>독특한 가치 제안: 고객에게 제시할 차별화된 해결책을 설명합니다.</li>
                      <li>해결책: 문제를 해결하기 위한 구체적인 방법을 제시합니다.</li>
                      <li>채널: 고객에게 도달할 방법과 경로를 결정합니다.</li>
                      <li>수익 흐름: 수익을 창출하는 방법을 정의합니다.</li>
                      <li>비용 구조: 사업을 운영하는 데 드는 주요 비용을 파악합니다.</li>
                      <li>핵심 지표: 성공 여부를 판단할 수 있는 중요한 지표를 설정합니다.</li>
                      <li>무형 자산: 경쟁 우위에 있는 비밀 병기나 자원을 포함합니다</li>
                    </ol>
                  </TabContents>

                  <TabContents id="tab-content2">
                    <p>비즈니스 모델 캔버스(Business Model Canvas)는 사업의 전반적인 구조와 전략을 체계적으로 시각화하는 도구입니다. 이 캔버스는 사업의 9가지 핵심 요소를 다루며, 각 요소가 상호 연결되어 비즈니스 모델을 설명합니다. 구성 요소는 다음과 같습니다</p>
                    <ol>
                      <li>고객 세그먼트: 가치를 제공할 주요 고객 그룹.</li>
                      <li>가치 제안: 고객이 얻는 고유한 혜택과 차별화된 서비스.</li>
                      <li>채널: 고객에게 가치를 전달하는 경로(유통 및 소통 방법).</li>
                      <li>고객 관계: 고객과의 관계를 구축하고 유지하는 방식.</li>
                      <li>수익원: 수익을 창출하는 방식(판매, 구독, 수수료 등).</li>
                      <li>핵심 자원: 사업 운영에 필수적인 자원(인프라, 인력 등).</li>
                      <li>핵심 활동: 가치 제공을 위해 수행해야 하는 주요 활동.</li>
                      <li>핵심 파트너: 협력 관계를 통해 사업을 지원하는 파트너.</li>
                      <li>비용 구조: 운영에 필요한 주요 비용 항목(고정비, 변동비 등).</li>
                    </ol>
                  </TabContents>
                </TabWrap>
              </div>
            </ToogleBox>
          }
        </h1>
        {bmModelSuggestionReportData.map((suggestion, index) => (
        <CanvasWrap>
          <h4>
            <span>아이템의 단계 및 상황을 검토한 결과</span>
            {suggestion.title}
          </h4>
          {suggestion.model === "BM" ?
            <ImageBox>
              <img src={images.ImgCanvasBusiness} alt="" />
              <p>Business Model Canvas</p>
            </ImageBox>
          :
            <ImageBox>
              <img src={images.ImgCanvasLean} alt="" />
              <p>Lean Canvas</p>
            </ImageBox>
          }

          <Content>
            <span>매칭 분석 내용</span>
            <p>{suggestion.content}</p>
          </Content>
        </CanvasWrap>
        ))}
    </Wrap>
    )}
  </>
  );
};

// {bmModelSuggestionReportData.map((suggestion, index) => (
//   <SeparateSection key={index}>
//     <h3>
//       <span className="number">{index + 1}</span>
//       {suggestion.title}
//     </h3>
//     <p>{suggestion.content}</p>
//   </SeparateSection>
// ))}
export default MoleculeBmModelSuggestion;
const Spacing = styled.div`
  margin-bottom: 40px;
`;
const Wrap = styled.div`
  max-width:540px;
  // width:100%;
  display:flex;
  flex-direction:column;
  padding:20px;
  margin:24px 0 0 50px;
  border-radius:15px;
  border:1px solid ${palette.outlineGray};

  h1 {
    position:relative;
    display:flex;
    align-items:center;
    justify-content:space-between;
    font-size:1rem;
    font-weight:700;
    text-align:left;
    padding-bottom:8px;
    margin-bottom:32px;
    border-bottom:1px solid ${palette.lineGray};
    z-index:1;

    p {
      display:flex;
      align-items:center;
      gap:4px;
      font-size:0.88rem;
      font-weight:300;
      color:${palette.gray500};

      span {
        width:12px;
        height:12px;
        font-size:0.63rem;
        font-weight:700;
        color:${palette.primary};
        text-align:center;
        border-radius:50%;
        border:1px solid ${palette.primary};
        cursor:pointer;
      }
    }
  }
`;

const ToogleBox = styled.div`
  position:absolute;
  top:30px;
  right:0;
  max-width:360px;
  width:100%;
  padding:40px 20px 20px;
  border-radius:15px;
  box-shadow:0 4px 32px rgba(0,0,0,.15);
  background:${palette.white};

  > div {
    display:flex;
    flex-direction:column;
    gap:12px;

    strong, p {
      font-size:0.88rem;
      font-weight:400;
      color:${palette.gray800};
      line-height:1.5;
    }
  }

  > span {
    position:absolute;
    top:16px;
    right:20px;
    width:16px;
    height:16px;
    text-indent:-99em;
    cursor:pointer;

    &:before, &:after {
      position:absolute;
      top:50%;
      left:50%;
      width:2px;
      height:100%;
      border-radius:10px;
      background:${palette.gray300};
      content:'';
    }

    &:before {
      transform:translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform:translate(-50%, -50%) rotate(-45deg);
    }
  }
`;

const TabWrap = styled.div`
  margin-top:10px;

  input[type=radio] {
    display:none;
  }

  label {
    position:relative;
    display:inline-block;
    font-size:0.88rem;
    font-weight:400;
    color:${palette.gray700};
    padding-bottom:3px;
    transition:all .5s;
    cursor:pointer;

    ~ label {
      margin-left:16px;
    }

    &:before {
      position:absolute;
      bottom:0;
      left:0;
      width:0;
      height:1px;
      background:${palette.gray700};
      transition:all .5s;
      content:'';
    }

    &:hover {
      font-weight:700;
    }
  }

  input:checked + label:before {
    width:100%;
  }

  #tab1:checked ~ #tab-content1,
  #tab2:checked ~ #tab-content2 {
    display:block;
  }
`;

const TabContents = styled.div`
  display:none;
  width:100%;
  padding:16px;
  margin-top:8px;
  border-radius:10px;
  background:${palette.gray50};

  p {
    font-size:0.88rem !important;
    color:${palette.gray700} !important;
    line-height:1.3;
  }

  ol {
    margin-top:8px;
    padding-top:8px;
    border-top:1px solid ${palette.gray100};

    li {
      font-size:0.88rem;
      font-weight:400;
      color:${palette.gray700};
      line-height:1.3;
      list-style:decimal;
      list-style-position: inside;

      + li {
        margin-top:4px;
      }
    }
  }
`;

const CanvasWrap = styled.div`
  display:flex;
  flex-direction:column;

  h4 {
    display:flex;
    flex-direction:column;
    gap:6px;
    font-size:1.25rem;
    font-weight:600;
    color:${palette.gray800};
    text-align:left;

    span {
      font-size:0.88rem;
      font-weight:500;
      color:${palette.gray500};
    }
  }
`;

const ImageBox = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:20px;
  margin:32px auto;
  font-size:1.25rem;
  font-weight:500;
  padding:20px;
  border-radius:10px;
  background:${palette.chatGray};
`;

const Content = styled.div`
  display:flex;
  flex-direction:column;
  gap:8px;
  font-size:0.88rem;
  color:${palette.gray800};
  line-height:1.3;
  text-align:left;
  margin:32px auto 0;
  padding-top:20px;
  border-top:1px solid ${palette.lineGray};

  span {
    font-weight:500;
    color:${palette.gray500};
  }

  p {
    font-weight:300;
    line-height:1.5;
  }
`;
