import React, { useEffect, useState } from "react";
import styled, { css, ThemeProvider } from "styled-components";
import theme from "../../../../../assets/styles/Theme";
import { palette } from "../../../../../assets/styles/Palette";
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
  MARKETING_BM_BUTTON_STATE,
  MARKETING_BM_REPORT_DATA,
  MARKETING_RESEARCH_REPORT_DATA,
  MARKETING_FINAL_REPORT_DATA,
  MARKETING_FINAL_CUSTOMER,
  MARKETING_FINAL_REPORT_BUTTON_STATE,
  IS_LOGGED_IN,
} from "../../../../AtomStates";

import Loader from "../../atoms/AtomLoader";
import { useSaveConversation } from "../../atoms/AtomSaveConversation";
import { MarketingFinalReportRequest } from "../../../../../utils/indexedDB";
import { isLoggedIn } from "../../../../../utils/indexedDB";

const OrganismMarketingFinalReport = () => {
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
  const [isLoadingMarketingFinalReport, setIsLoadingMarketingFinalReport] = useState(false);
  const [marketingResearchReportData] = useAtom(MARKETING_RESEARCH_REPORT_DATA);
  const [marketingBmButtonState, setMarketingBmButtonState] = useAtom(MARKETING_BM_BUTTON_STATE);
  const [marketingBmReportData, setMarketingBmReportData] = useAtom(MARKETING_BM_REPORT_DATA);
  const [marketingFinalReportData, setMarketingFinalReportData] = useAtom(MARKETING_FINAL_REPORT_DATA);
  const [marketingFinalCustomer, setMarketingFinalCustomer] = useAtom(MARKETING_FINAL_CUSTOMER);
  const [marketingFinalReportButtonState, setMarketingFinalReportButtonState] = useAtom(MARKETING_FINAL_REPORT_BUTTON_STATE);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const axiosConfig = {
    timeout: 100000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  useEffect(() => {
    const fetchMarketingFinalReport = async () => {
      try {
       if(marketingFinalReportButtonState === 1) {
          setIsLoadingMarketingFinalReport(true);
          setIsLoading(true);
          setMarketingFinalReportButtonState(0);

          const data = {
            expert_id: "11",
            business_info: titleOfBusinessInfo,
            business_analysis_data: {
              명칭: titleOfBusinessInfo,
              주요_목적_및_특징: mainFeaturesOfBusinessInformation,
              주요기능: mainCharacteristicOfBusinessInformation,
              목표고객: businessInformationTargetCustomer,
            },
            marketing_research_report: marketingResearchReportData,
            marketing_bm_report: marketingBmReportData,
            marketing_selected_customer: marketingFinalCustomer
          };

          // let response = await axios.post(
          //   "https://wishresearch.kr/panels/marketing/final_report",
          //   data,
          //   axiosConfig
          // );
          let response = await MarketingFinalReportRequest(data);
          let marketingFinalReport = response.response.marketing_final_report;
            
          let retryCount = 0;
          const maxRetries = 10;

          while (retryCount < maxRetries && (
            !response?.response?.marketing_final_report ||
            !Array.isArray(marketingFinalReport) ||
            marketingFinalReport.length !== 3 ||
            !marketingFinalReport[0]?.title ||
            !marketingFinalReport[0]?.content?.purpose ||
            !marketingFinalReport[0]?.content?.target ||
            !marketingFinalReport[0]?.content?.value ||
            !marketingFinalReport[0]?.content?.elements ||
            !marketingFinalReport[0]?.content?.type ||
            !marketingFinalReport[1]?.distinctiveness?.score ||
            !marketingFinalReport[1]?.distinctiveness?.description ||
            !marketingFinalReport[1]?.potential?.score ||
            !marketingFinalReport[1]?.potential?.description ||
            !marketingFinalReport[1]?.model?.score ||
            !marketingFinalReport[1]?.model?.description ||
            !marketingFinalReport[1]?.vision?.score ||
            !marketingFinalReport[1]?.vision?.description ||
            !marketingFinalReport[1]?.barriers?.score ||
            !marketingFinalReport[1]?.barriers?.description ||
            !marketingFinalReport[1]?.scarcity?.score ||
            !marketingFinalReport[1]?.scarcity?.description ||
            !marketingFinalReport[1]?.adaptability?.score ||
            !marketingFinalReport[1]?.adaptability?.description ||
            !marketingFinalReport[1]?.total_score ||
            !marketingFinalReport[2]?.session1?.title ||
            !marketingFinalReport[2]?.session1?.content ||
            !marketingFinalReport[2]?.session2?.title ||
            !marketingFinalReport[2]?.session2?.content ||
            !marketingFinalReport[2]?.session3?.title ||
            !marketingFinalReport[2]?.session3?.content
          ))  
          {
            // response = await axios.post(
            //   "https://wishresearch.kr/panels/marketing/final_report",
            //   data,
            //   axiosConfig
            // );
            response = await MarketingFinalReportRequest(data);
            retryCount++;

            marketingFinalReport = response.response.marketing_final_report;
          }
          if (retryCount === maxRetries) {
            throw new Error("Maximum retry attempts reached. Empty response persists.");
          }

          setMarketingFinalReportData(marketingFinalReport);

          setIsLoadingMarketingFinalReport(false);
          setIsLoading(false);

          const updatedConversation = [...conversation];

          if (isLoggedIn) {
            updatedConversation.push(
              {
                type: "system",
                message:
                  `${titleOfBusinessInfo}의 시장조사부터 잠재력 지수까지 모두 확인하셨습니다. 👍🏻\n이번 분석이 창업 준비에 도움이 되었나요? 저희는 비즈니스 전문 AI 솔루션으로 전문가와 1:1 사업 상담이 가능합니다.\n창업 여정의 든든한 조력자로 함께 하겠습니다. 😊`,
                expertIndex: 0,
              },
              { type: `marketingSignUpButton` }
            );
          } else {
            updatedConversation.push(
              {
                type: "system",
                message:
                  `${titleOfBusinessInfo}의 시장조사부터 잠재력 지수까지 모두 확인하셨습니다. 👍🏻\n이번 분석이 창업 준비에 도움이 되었나요? 저희는 비즈니스 전문 AI 솔루션으로 전문가와 1:1 사업 상담이 가능합니다.\n창업 여정의 든든한 조력자로 함께 하겠습니다. 😊`,
                expertIndex: 0,
              },
              {
                type: "system",
                message:
                  "회원가입을 하시면 대화 내역을 저장할 수 있어요.\n회원가입 없이 나가시면 내역이 사라지니 참고해주세요 📌 ",
                expertIndex: -1,
              },
              { type: `marketingSignUpButton` }
            );
          }

          setConversation(updatedConversation);

          await saveConversation({ changingConversation: { conversation: updatedConversation, marketingFinalReportData: marketingFinalReport } });
        }
      } catch (error) {
        //console.error("Error fetching marketing final report:", error);
      }
    };

    fetchMarketingFinalReport();
  }, [marketingFinalReportButtonState]);

  return (
    <>
    <ThemeProvider theme={theme}>
      {isLoadingMarketingFinalReport || marketingFinalReportButtonState ? (
        <LoadingSummaryBox>
          <Loader />
        </LoadingSummaryBox>
      ) : (
        <>
          <SummaryBox>
              <h2>
                {marketingFinalReportData?.[0]?.title}
                <p>{marketingFinalReportData?.[2]?.session1?.content}</p>
              </h2>

              {isExpanded && (
                <WhiteBoxWrap>
                  <h3>
                    <span>📌</span>아이템의 핵심 내용을 다음과 같이 정리했어요
                  </h3>
                  <UlList Disc>
                    <li><strong>주요 니즈 :</strong> {marketingFinalReportData?.[0]?.content?.purpose}</li>
                    <li><strong>사용 목적 :</strong> {marketingFinalReportData?.[0]?.content?.target}</li>
                    <li><strong>제공 가치 :</strong> {marketingFinalReportData?.[0]?.content?.value}</li>
                    <li><strong>필요한 요소 :</strong> {marketingFinalReportData?.[0]?.content?.elements}</li>
                    <li><strong>프로덕트 타입 :</strong> {marketingFinalReportData?.[0]?.content?.type}</li>
                  </UlList>
                </WhiteBoxWrap>
              )}

              <ProgressWrap isExpanded={isExpanded}>
                {isExpanded && (
                  <h3>
                    <span>📌</span>아이템으로 사업을 시작하시기 전 검토해야할 내용이에요
                  </h3>
                )}

                <div>
                  <Progress>
                    <strong>아이템 차별성</strong>
                    <ProgressBar>
                      <div style={{width:`${marketingFinalReportData?.[1]?.distinctiveness?.score * 10}%`}}></div>
                    </ProgressBar>
                    <span>{marketingFinalReportData?.[1]?.distinctiveness?.score}점</span>
                  </Progress>
                  {isExpanded && (
                    <p>{marketingFinalReportData?.[1]?.distinctiveness?.description}</p>
                  )}
                </div>

                <div>
                  <Progress>
                    <strong>시장성</strong>
                    <ProgressBar>
                      <div style={{width:`${marketingFinalReportData?.[1]?.potential?.score * 10}%`}}></div>
                    </ProgressBar>
                    <span>{marketingFinalReportData?.[1]?.potential?.score}점</span>
                  </Progress>
                  {isExpanded && (
                    <p>{marketingFinalReportData?.[1]?.potential?.description}</p>
                  )}
                </div>

                <div>
                  <Progress>
                    <strong>수익모델</strong>
                    <ProgressBar>
                      <div style={{width:`${marketingFinalReportData?.[1]?.model?.score * 10}%`}}></div>
                    </ProgressBar>
                    <span>{marketingFinalReportData?.[1]?.model?.score}점</span>
                  </Progress>
                  {isExpanded && (
                    <p>{marketingFinalReportData?.[1]?.model?.description}</p>
                  )}
                </div>

                <div>
                  <Progress>
                    <strong>비전</strong>
                    <ProgressBar>
                      <div style={{width:`${marketingFinalReportData?.[1]?.vision?.score * 10}%`}}></div>
                    </ProgressBar>
                    <span>{marketingFinalReportData?.[1]?.vision?.score}점</span>
                  </Progress>
                  {isExpanded && (
                    <p>{marketingFinalReportData?.[1]?.vision?.description}</p>
                  )}
                </div>

                <div>
                  <Progress>
                    <strong>시장 진입장벽</strong>
                    <ProgressBar>
                      <div style={{width:`${marketingFinalReportData?.[1]?.barriers?.score * 10}%`}}></div>
                    </ProgressBar>
                    <span>{marketingFinalReportData?.[1]?.barriers?.score}점</span>
                  </Progress>
                  {isExpanded && (
                    <p>{marketingFinalReportData?.[1]?.barriers?.description}</p>
                  )}
                </div>

                <div>
                  <Progress>
                    <strong>희소성</strong>
                    <ProgressBar>
                      <div style={{width:`${marketingFinalReportData?.[1]?.scarcity?.score * 10}%`}}></div>
                    </ProgressBar>
                    <span>{marketingFinalReportData?.[1]?.scarcity?.score}점</span>
                  </Progress>
                  {isExpanded && (
                    <p>{marketingFinalReportData?.[1]?.scarcity?.description}</p>
                  )}
                </div>

                <div>
                  <Progress>
                    <strong>적응성</strong>
                    <ProgressBar>
                      <div style={{width:`${marketingFinalReportData?.[1]?.adaptability?.score * 10}%`}}></div>
                    </ProgressBar>
                    <span>{marketingFinalReportData?.[1]?.adaptability?.score}점</span>
                  </Progress>
                  {isExpanded && (
                    <p>{marketingFinalReportData?.[1]?.adaptability?.description}</p>
                  )}
                </div>
              </ProgressWrap>

              {isExpanded && (
                <WhiteBoxWrap>
                  <h3>
                    <span>📌</span>앞으로 이런 부분을 고려하세요
                  </h3>
                  <UlList Disc>
                    <li><strong>{marketingFinalReportData?.[2]?.session2?.title} :</strong> {marketingFinalReportData?.[2]?.session2?.content}</li>
                    <li><strong>{marketingFinalReportData?.[2]?.session3?.title} :</strong> {marketingFinalReportData?.[2]?.session3?.content}</li>
                  </UlList>
                </WhiteBoxWrap>
              )}

              <ButtonDetail onClick={handleToggle}>
                {isExpanded ? '닫기' : '상세 내용 확인하기'}
              </ButtonDetail>
          </SummaryBox>
        </>
      )}
    </ThemeProvider>
    </>
  );
};

export default OrganismMarketingFinalReport;

const SummaryBox = styled.div`
  display:flex;
  flex-direction:column;
  gap:12px;
  max-width:825px;
  width:fit-content;
  text-align:left;
  padding:32px 20px;
  border-radius:20px;
  background:${palette.chatGray};
  margin:12px 0 0 50px;

  .loading {
    min-width: 800px;
    min-height: 550px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      min-width: 150px; // 모바일일 때 크기 조정
      min-height: 150px; // 모바일일 때 크기 조정
    }
  }

  h2 {
    font-size:1.5rem;
    font-weight:600;
    line-height:1.3;
    color:${palette.gray800};

    p {
      font-size:1rem;
      font-weight:300;
      line-height:1.5;
      color:${palette.gray800};
      margin-top:16px;
    }
  }

  h3 {
    font-size:1rem;
    font-weight:500;
    color:${palette.gray800};
    line-height:1.6;
  }

  > span {
    display:flex;
    align-items:center;
    gap:4px;
    font-size:0.75rem;
    color:${palette.gray500};
    margin-top:4px;
  }

  button {
    display:flex;
    align-items:center;
    gap:5px;
    font-family: 'Pretendard', 'Poppins';
    font-size:0.75rem;
    color:${palette.gray500};
    padding:6px 0;
    margin-top:5px;
    border:0;
    background:none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left:0;
    padding:20px;
  }
`;

const LoadingSummaryBox = styled.div`
  display:flex;
  flex-direction:column;
  gap:12px;
  max-width:825px;
  text-align:left;
  padding:32px 20px;
  border-radius:20px;
  background:${palette.chatGray};
  margin:12px 0 0 50px;

  min-width: 800px;
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 150px; // 모바일일 때 크기 조정
    min-height: 150px; // 모바일일 때 크기 조정
  }

  h2 {
    font-size:1.5rem;
    font-weight:600;
    line-height:1.3;
    color:${palette.gray800};

    p {
      font-size:1rem;
      font-weight:300;
      line-height:1.5;
      color:${palette.gray800};
      margin-top:16px;
    }
  }

  h3 {
    font-size:1rem;
    font-weight:500;
    color:${palette.gray800};
    line-height:1.6;
  }

  > span {
    display:flex;
    align-items:center;
    gap:4px;
    font-size:0.75rem;
    color:${palette.gray500};
    margin-top:4px;
  }

  button {
    display:flex;
    align-items:center;
    gap:5px;
    font-family: 'Pretendard', 'Poppins';
    font-size:0.75rem;
    color:${palette.gray500};
    padding:6px 0;
    margin-top:5px;
    border:0;
    background:none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left:0;
    padding:20px;
  }
`;

const UlList = styled.ul`
  display:flex;
  flex-direction:column;
  // gap:8px;

  li {
    position:relative;
    font-weight:300;
    color:${palette.gray800};
    line-height:1.5;
    padding-left:26px;
  }

  ${props =>
    props.Disc &&
    css`
      li {
        &:before {
          position:absolute;
          left:8px;
          top:8px;
          width:3px;
          height:3px;
          display:inline-block;
          border-radius:10px;
          background:${palette.gray800};
          content:'';
        }
      }
    `
  }

  ${props =>
    props.Number &&
    css`
      counter-reset: list-counter;

      li {
        counter-increment: list-counter;

        &:before {
          position:absolute;
          left:0;
          top:0;
          width:18px;
          height:18px;
          display:flex;
          justify-content:center;
          align-items:center;
          font-size:0.69rem;
          font-weight:600;
          text-align:center;
          border-radius:50px;
          border:1px solid ${palette.gray800};
          content:counter(list-counter);
        }
      }
    `
  }

  strong {
    font-weight:500;
  }
`;

const ProgressWrap = styled.div`
  display:flex;
  flex-direction:column;
  gap: ${({ isExpanded }) => (isExpanded ? '40px' : '20px')};
  padding:20px;
  margin:20px 0;
  border-radius:10px;
  background:${palette.white};

  > div {
    display:flex;
    flex-direction:column;
    gap: 16px;
  }

  p {
    font-weight:400;
    color:${palette.gray700};
    line-height:1.5;
  }
`;

const Progress = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:35px;

  strong {
    max-width:90px;
    width:100%;
    font-weight:700;
    color:${palette.gray800};
  }

  span {
    font-weight:300;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position:relative;
    flex-direction:column;
    align-items:flex-start;
    gap:8px;

    span {
      position:absolute;
      right:0;
      top:0;
    }
  }
`;

const ProgressBar = styled.div`
  max-width:540px;
  width:100%;
  // height:16px;
  height:8px;
  border-radius:20px;
  background:${palette.gray100};
  overflow:hidden;

  > div {
    height:100%;
    border-radius:20px;
    background:${palette.blue};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height:8px;
  }
`;

const WhiteBoxWrap = styled.div`
  display:flex;
  flex-direction:column;
  gap:16px;
  padding:20px;
  border-radius:10px;
  background:${palette.white};

  h3 {
    display:flex;
    align-items:center;
    gap:12px;

    span {
      font-size:0.88rem;
    }
  }
`;

const ButtonDetail = styled.div`
  width:100%;
  font-family: 'Pretendard', 'Poppins';
  font-size:0.88rem;
  color:${palette.gray800};
  line-height:1.5;
  text-align:center;
  padding:14px 20px;
  border-radius:15px;
  border:1px solid ${palette.outlineGray};
  cursor:pointer;
`;