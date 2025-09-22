import React, { useEffect, useState } from "react";
import styled, { css, ThemeProvider } from "styled-components";
import theme from "../../../../../assets/styles/Theme";
import { palette } from "../../../../../assets/styles/Palette";
import axios from "axios";
import images from "../../../../../assets/styles/Images";
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
} from "../../../../AtomStates";

import Loader from "../../atoms/AtomLoader";
import { useSaveConversation } from "../../atoms/AtomSaveConversation";
import { MarketingBmReportRequest } from "../../../../../utils/indexedDB";
import { isLoggedIn } from "../../../../../utils/indexedDB";

const OrganismMarketingBmReport = () => {
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
  const [isLoadingMarketingBmReport, setIsLoadingMarketingBmReport] = useState(false);
  const [marketingResearchReportData] = useAtom(MARKETING_RESEARCH_REPORT_DATA);
  const [marketingBmButtonState, setMarketingBmButtonState] = useAtom(MARKETING_BM_BUTTON_STATE);
  const [marketingBmReportData, setMarketingBmReportData] = useAtom(MARKETING_BM_REPORT_DATA);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);
  
  const axiosConfig = {
    timeout: 100000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  useEffect(() => {
    const fetchMarketingBmReport = async () => {
      try {
       if(marketingBmButtonState === 1) {
          setIsLoadingMarketingBmReport(true);
          setIsLoading(true);
          setMarketingBmButtonState(0);

          const data = {
            expert_id: "11",
            business_info: titleOfBusinessInfo,
            business_analysis_data: {
              명칭: titleOfBusinessInfo,
              주요_목적_및_특징: mainFeaturesOfBusinessInformation,
              주요기능: mainCharacteristicOfBusinessInformation,
              목표고객: businessInformationTargetCustomer,
            },
            marketing_research_report: marketingResearchReportData
          };

          // let response = await axios.post(
          //   "https://wishresearch.kr/panels/marketing/bm_report",
          //   data,
          //   axiosConfig
          // );
          let response = await MarketingBmReportRequest(data);
          let marketingBmReport = response.response.marketing_bm_report;
            
          let retryCount = 0;
          const maxRetries = 10;

          while (retryCount < maxRetries && (
            !response || 
            !response.response || 
            typeof response.response !== "object" ||
            !response.response.hasOwnProperty("marketing_bm_report") || 
            !Array.isArray(marketingBmReport) ||
            marketingBmReport.length !== 10 ||
            marketingBmReport.slice(0, 9).some(item => 
              !item.hasOwnProperty("title") || 
              !item.hasOwnProperty("content") ||
              !item.content.hasOwnProperty("key_message") || 
              !item.content.hasOwnProperty("keyword") ||
              !Array.isArray(item.content.keyword) ||
              item.content.keyword.length < 3 ||
              !item.content.hasOwnProperty("summary")
              )
            ) ||
            !marketingBmReport[9].hasOwnProperty("title") ||
            !marketingBmReport[9].hasOwnProperty("content") ||
            !marketingBmReport[9].content.hasOwnProperty("conclusion") ||
            !marketingBmReport[9].content.hasOwnProperty("summary")
          ) {
            // response = await axios.post(
            //   "https://wishresearch.kr/panels/marketing/bm_report",
            //   data,
            //   axiosConfig
            // );
            response = await MarketingBmReportRequest(data);
            retryCount++;

            marketingBmReport = response.response.marketing_bm_report;
          }
          if (retryCount === maxRetries) {
            throw new Error("Maximum retry attempts reached. Empty response persists.");
          }

          setMarketingBmReportData(marketingBmReport);

          setIsLoadingMarketingBmReport(false);
          setIsLoading(false);

          const updatedConversation = [...conversation];

          updatedConversation.push(
            {
              type: "system",
              message:
                "분석 완료 ! 시장 환경 속에서 확실한 입지를 다질 수 있는 포인트가 무엇인지 확인해보세요 🎯",
              expertIndex: -1,
            },
            {
              type: "system",
              message:
                "여기까지가 기본 분석이었어요! 이제 아이템의 성공 가능성을 최대한 끌어올릴 차례입니다.\n더 정확한 타겟 분석과 최적화된 사업 전략을 만들어 봐야겠죠?!  ",
              expertIndex: -1,
            },
            { type: `marketingCustomerButton` }
          );

          setConversation(updatedConversation);

          await saveConversation({ changingConversation: { conversation: updatedConversation, marketingBmReportData: marketingBmReport } });
        }
      } catch (error) {
        //console.error("Error fetching marketing bm report:", error);
      }
    };

    fetchMarketingBmReport();
  }, [marketingBmButtonState]);

  return (
    <>
    <ThemeProvider theme={theme}>
      {isLoadingMarketingBmReport || marketingBmButtonState ? (
        <LoadingSummaryBox>
          <Loader />
        </LoadingSummaryBox>
      ) : (
        <>
          <Overlay isMenuOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />

          <SummaryBox>
            <h3>{marketingBmReportData[9]?.content?.summary}</h3>
            <UlList Number>
              <li><strong>타겟 고객군 :</strong> {marketingBmReportData[0]?.content?.summary}</li>
              <li><strong>가치 제안 :</strong> {marketingBmReportData[1]?.content?.summary}</li>
              <li><strong>채널 :</strong> {marketingBmReportData[2]?.content?.summary}</li>
              <li><strong>고객관계 :</strong> {marketingBmReportData[3]?.content?.summary}</li>
              <li><strong>수익원 :</strong> {marketingBmReportData[4]?.content?.summary}</li>
              <li><strong>핵심활동 :</strong> {marketingBmReportData[5]?.content?.summary}</li>
              <li><strong>핵심자원 :</strong> {marketingBmReportData[6]?.content?.summary}</li>
              <li><strong>파트너쉽 :</strong> {marketingBmReportData[7]?.content?.summary}</li>
              <li><strong>비용구조 :</strong> {marketingBmReportData[8]?.content?.summary}</li>
            </UlList>
            <button onClick={() => toggleMenu()}>
              <img src={images.IconDetailView} alt="" />
              상세 내용 확인하기
            </button>
          </SummaryBox>

          <Sidebar isMenuOpen={isMenuOpen}>
            <div>
              <div className="header">
              <h5>비즈니스 모델 상세 리포트</h5>
              <button className="closePopup" onClick={() => setIsMenuOpen(false)}>닫기</button>
            </div>
            <div className="body">
              <p>{marketingBmReportData[9]?.content?.conclusion}</p>
              <ScrollWrap>
                <ListBox>
                  <div>
                    <span><img src={images.IconCanvas07} alt="" /></span>
                    <div>
                      <strong>타겟 고객군</strong>
                      <p>{marketingBmReportData[0]?.content?.key_message}</p>
                      <p className="tag">
                        {marketingBmReportData[0]?.content?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas04} alt="" /></span>
                    <div>
                      <strong>가치 제안</strong>
                      <p>{marketingBmReportData[1]?.content?.key_message}</p>
                      <p className="tag">
                        {marketingBmReportData[1]?.content?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas06} alt="" /></span>
                    <div>
                      <strong>채널</strong>
                      <p>{marketingBmReportData[2]?.content?.key_message}</p>
                      <p className="tag">
                        {marketingBmReportData[2]?.content?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas05} alt="" /></span>
                    <div>
                      <strong>고객관계</strong>
                      <p>{marketingBmReportData[3]?.content?.key_message}</p>
                      <p className="tag">
                        {marketingBmReportData[3]?.content?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas09} alt="" /></span>
                    <div>
                      <strong>수익원</strong>
                      <p>{marketingBmReportData[4]?.content?.key_message}</p>
                      <p className="tag">
                        {marketingBmReportData[4]?.content?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas02} alt="" /></span>
                    <div>
                      <strong>핵심활동</strong>
                      <p>{marketingBmReportData[5]?.content?.key_message}</p>
                      <p className="tag">
                        {marketingBmReportData[5]?.content?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas03} alt="" /></span>
                    <div>
                      <strong>핵심자원</strong>
                      <p>{marketingBmReportData[6]?.content?.key_message}</p>
                      <p className="tag">
                        {marketingBmReportData[6]?.content?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas01} alt="" /></span>
                    <div>
                      <strong>핵심 파트너십</strong>
                      <p>{marketingBmReportData[7]?.content?.key_message}</p>
                      <p className="tag">
                        {marketingBmReportData[7]?.content?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas08} alt="" /></span>
                    <div>
                      <strong>비용구조</strong>
                      <p>{marketingBmReportData[8]?.content?.key_message}</p>
                      <p className="tag">
                        {marketingBmReportData[8]?.content?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                </ListBox>
              </ScrollWrap>
            </div>
          </div>
        </Sidebar>
        </>
      )}
    </ThemeProvider>
    </>
  );
};

export default OrganismMarketingBmReport;

const SummaryBox = styled.div`
  display:flex;
  flex-direction:column;
  gap:12px;
  max-width:825px;
  width:fit-content;
  text-align:left;
  padding:20px;
  border-radius:20px;
  background:${palette.chatGray};
  margin:12px 0 0 50px;

  .loading {
    min-width: 700px;
    min-height: 300px;
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
    margin:12px 0 0;
  }
`;

const LoadingSummaryBox = styled.div`
  display:flex;
  flex-direction:column;
  gap:12px;
  max-width:825px;
  text-align:left;
  padding:20px;
  border-radius:20px;
  background:${palette.chatGray};
  margin:12px 0 0 50px;

  min-width: 638px;
  min-height: 320px;
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
    margin:12px 0 0;
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
          top:10px;
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
          top:2px;
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

const Sidebar = styled.div`
  // position:absolute;
  // top: 0;
  // right: ${({ isMenuOpen }) => (isMenuOpen ? '0' : '-800px')};
  // height: 100%;
  // max-width: 800px;
  // width:100%;

  max-width: ${({ isMenuOpen }) => (isMenuOpen ? '800px' : '0')};
  width:100%;
  background:${palette.white};
  // transform: ${({ isMenuOpen }) => (isMenuOpen ? 'translateX(0)' : 'translateX(200%)')};
  transition: all .5s;
  z-index: 900;

  visibility: ${({ isMenuOpen }) => (isMenuOpen ? 'visible' : 'hidden')};
  overflow:hidden;
  flex-shrink:0;
  position:fixed;
  top:0;
  right:0;
  height:100vh;

  
  > div {
    display: flex;
    flex-direction: column;
    gap:50px;
    width: 100%;
    // max-width: 800px;
    height: 100%;
    text-align: center;
    // overflow:hidden;
    padding: 32px;
    border-radius: 10px;
    background: ${palette.white};
  }

  .header {
    position:relative;
    display:flex;
    flex-direction: column;
    gap:16px;
    align-items:center;

    h5 {
      width:100%;
      font-size:1.25rem;
      font-weight:600;
      line-height:1.3;
      color:${palette.gray800};
      text-align:left;

      p {
        font-size:1rem;
        font-weight:400;
        line-height:1.5;
        margin-top:16px;
      }
    }
  }

  .closePopup {
    position:absolute;
    top:0;
    right:0;
    width:21px;
    height:21px;
    font-size:0;
    border:0;
    background:none;

    &:before, &:after {
      position:absolute;
      top:50%;
      left:50%;
      width:3px;
      height:21px;
      display:inline-block;
      border-radius:50px;
      background:${palette.gray500};
      content:'';
    }
    &:before {
      transform:translate(-50%, -50%) rotate(45deg);
    }
    &:after {
      transform:translate(-50%, -50%) rotate(-45deg);
    }
  }

  .body {
    height:calc(100% - 80px);
    display: flex;
    flex-direction: column;
    gap:32px;

    p {
      line-height:1.5;
      color:${palette.gray800};
      text-align:left;
    }
  }


  h2 {
    margin-top: 0;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin: 20px 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    > div {
      // overflow-y:auto;
    }

    .header {
      align-items:flex-start;

      h5 {
        width:calc(100% - 35px);
      }
    }

    .body {
      height:calc(100% - 70px);
      overflow-y:auto;
    }
  }
`;

const ScrollWrap = styled.div`
  position:relative;
  flex:1 1 0%;
  // overflow-y:auto;
  overflow:hidden;

  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${palette.lineGray};
    border-radius: 10px;
  }

  > div {
    height:100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    overflow:initial;
  }
`;

const ListBox = styled.div`
  // max-height:525px;
  overflow-y:auto;
  border-radius:10px;
  border:1px solid ${palette.outlineGray};

  > div {
    display:flex;
    gap:8px;
    padding:14px 20px;

    + div {
      border-top:1px solid ${palette.outlineGray};
    }

    > span {
      width:23px;
    }

    span {
      flex-shrink:0;
      font-size:0.88rem;
      line-height:1.5;
    }

    div {
      display:flex;
      flex-direction: column;
      gap:12px;
    }

    strong, p {
      font-size:0.88rem;
      line-height:1.5;
      text-align:left;
    }

    p.tag {
      display:flex;
      align-items:center;
      gap:12px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    overflow:initial;

    > div {
      p.tag {
        flex-wrap:wrap;
        gap:0 12px;
      }
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .1);
  opacity: ${({ isMenuOpen }) => (isMenuOpen ? 1 : 0)};
  visibility: ${({ isMenuOpen }) => (isMenuOpen ? 'visible' : 'hidden')};
  transition: all .5s;
  z-index: 800;
`;