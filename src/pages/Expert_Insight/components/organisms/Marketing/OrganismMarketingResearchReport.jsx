import React, { useEffect, useState } from "react";
import styled, { css, ThemeProvider } from "styled-components";
import theme from "../../../../../assets/styles/Theme";
import { palette } from "../../../../../assets/styles/Palette";
import images from "../../../../../assets/styles/Images";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CONVERSATION,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  MARKETING_START_BUTTON_STATE,
  MARKETING_RESEARCH_REPORT_DATA,
} from "../../../../AtomStates";
import { MarketingResearchReportRequest } from "../../../../../utils/indexedDB";
import Loader from "../../atoms/AtomLoader";
import { useSaveConversation } from "../../atoms/AtomSaveConversation";

const OrganismMarketingResearchReport = () => {

  const { saveConversation } = useSaveConversation();
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [, setIsLoading] = useAtom(IS_LOADING);
  const [isLoadingMarketingResearchReport, setIsLoadingMarketingResearchReport] = useState(false);
  const [marketingStartButtonState, setMarketingStartButtonState] = useAtom(MARKETING_START_BUTTON_STATE);
  const [marketingResearchReportData, setMarketingResearchReportData] = useAtom(MARKETING_RESEARCH_REPORT_DATA);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);


  useEffect(() => {
    const fetchMarketingResearchReport = async () => {
      try {
      if(marketingStartButtonState === 1) {
          setIsLoadingMarketingResearchReport(true);
          setIsLoading(true);
          setMarketingStartButtonState(0);

          const data = {
            expert_id: "11",
            business_info: titleOfBusinessInfo,
            business_analysis_data: {
              명칭: titleOfBusinessInfo,
              주요_목적_및_특징: mainFeaturesOfBusinessInformation,
              주요기능: mainCharacteristicOfBusinessInformation,
              목표고객: businessInformationTargetCustomer,
            },
          };

          let response = await MarketingResearchReportRequest(data);

          let marketingResearchReport = response.response.marketing_research_report;
            
          let retryCount = 0;
          const maxRetries = 10;

          while (retryCount < maxRetries && (
            !response || 
            !response.response || 
            typeof response.response !== "object" ||
            !response.response.hasOwnProperty("marketing_research_report") || 
            !Array.isArray(marketingResearchReport) ||
            marketingResearchReport.length !== 6 ||
            marketingResearchReport.slice(0, 5).some(item => 
              !item.hasOwnProperty("title") || 
              !item.content.hasOwnProperty("key_content") || 
              !item.content.hasOwnProperty("specific_data") ||
              !item.content.hasOwnProperty("keywords") ||
              !Array.isArray(item.content.keywords) ||
              item.content.keywords.length < 3 ||
              !item.content.hasOwnProperty("message") ||
              !item.content.hasOwnProperty("summary")
            ) ||
            !marketingResearchReport[5].hasOwnProperty("title") ||
            !marketingResearchReport[5].hasOwnProperty("content") ||
            !marketingResearchReport[5].content.hasOwnProperty("conclusion") ||
            !marketingResearchReport[5].content.hasOwnProperty("summary") ||
            !marketingResearchReport[0].content.hasOwnProperty("sources") ||
            !marketingResearchReport[1].content.hasOwnProperty("company_cases") ||
            !marketingResearchReport[3].content.hasOwnProperty("company_cases")
          )) 
          {
            
            response = await MarketingResearchReportRequest(data);
            retryCount++;

            marketingResearchReport = response.response.marketing_research_report;
          }
          if (retryCount === maxRetries) {
            throw new Error("Maximum retry attempts reached. Empty response persists.");
          }

          setMarketingResearchReportData(marketingResearchReport);

          setIsLoadingMarketingResearchReport(false);
          setIsLoading(false);

          const updatedConversation = [...conversation];

          updatedConversation.push(
            {
              type: "system",
              message:
                "시장조사 완료! 🎉 아이템의 시장 현황은 어떤 것 같으신가요?",
              expertIndex: -1,
            },
            {
              type: "system",
              message:
                "지금 확인하신 시장조사 결과를 기반으로, 이제 비즈니스 모델(BM) 분석을 진행해볼 예정이에요.\n이 분석을 통해 비즈니스 모델과 전략을 조금 더 구체적으로 세워볼 수 있을거에요 📊",
              expertIndex: -1,
            },
            { type: `marketingBmButton` }
          );

          setConversation(updatedConversation);

          await saveConversation({ changingConversation: { conversation: updatedConversation, marketingResearchReportData: marketingResearchReport } });
        }
      } catch (error) {
        //console.error("Error fetching marketing research report:", error);
      }
    };

    fetchMarketingResearchReport();
  }, [marketingStartButtonState]);

  return (
    <>
    <ThemeProvider theme={theme}>
    
      {isLoadingMarketingResearchReport || marketingStartButtonState ? (
        <LoadingSummaryBox>
          <Loader />
        </LoadingSummaryBox>
      ) : (
        <>
          <Overlay isMenuOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />

          <SummaryBox>
            <h3>{marketingResearchReportData?.[5]?.content?.summary}</h3>
            <UlList Disc>
              <li><strong>시장 현황 :</strong> {marketingResearchReportData?.[0]?.content?.summary}</li>
              <li><strong>업계 변화 :</strong> {marketingResearchReportData?.[1]?.content?.summary}</li>
              <li><strong>고객의 변화 :</strong> {marketingResearchReportData?.[2]?.content?.summary}</li>
              <li><strong>경쟁사 상황 :</strong> {marketingResearchReportData?.[3]?.content?.summary}</li>
              <li><strong>추가 요인 :</strong> {marketingResearchReportData?.[4]?.content?.summary}</li>
            </UlList>
            <button onClick={() => toggleMenu()}>
              <img src={images.IconDetailView} alt="" />
              상세 내용 확인하기
            </button>
          </SummaryBox>

          <Sidebar isMenuOpen={isMenuOpen}>
            <div>
              <div className="header">
                <h5>시장조사 상세 리포트</h5>
                <button className="closePopup" onClick={() => setIsMenuOpen(false)}>닫기</button>
              </div>
              <div className="body">
                <p>{marketingResearchReportData?.[5]?.content?.conclusion}</p>
                <ScrollWrap>
                  <ListBox>
                    <div>
                      <span>📌</span>
                      <div>
                        <strong>시장에 이슈가 있는 걸까?</strong>
                        <p>{marketingResearchReportData?.[0]?.content?.key_content}</p>
                      </div>
                    </div>
                    <div>
                      <span>⏰</span>
                      <div>
                        <strong>업계에 변화가 생긴 걸까?</strong>
                        <p>{marketingResearchReportData?.[1]?.content?.key_content}</p>
                      </div>
                    </div>
                    <div>
                      <span>👩🏻‍🦰</span>
                      <div>
                        <strong>고객의 소비가 변한 걸까?</strong>
                        <p>{marketingResearchReportData?.[2]?.content?.key_content}</p>
                      </div>
                    </div>
                    <div>
                      <span>🤝🏻</span>
                      <div>
                        <strong>경쟁사 상황은 어떠할까?</strong>
                        <p>{marketingResearchReportData?.[3]?.content?.key_content}</p>
                      </div>
                    </div>
                    <div>
                      <span>🔎</span>
                      <div>
                        <strong>다른 요인이 더 있을까?</strong>
                        <p>{marketingResearchReportData?.[4]?.content?.key_content}</p>
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

export default OrganismMarketingResearchReport;

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
    width:800px;
    height: 300px;
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
 
  min-width: 805px;
  min-height: 250px;
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

const Sidebar = styled.div`
  // position:absolute;
  // top: 0;
  // right: ${({ isMenuOpen }) => (isMenuOpen ? '0' : '-800px')};
  // height: 100%;
  // max-width: 800px;
  // width:100%;

  max-width: ${({ isMenuOpen }) => (isMenuOpen ? '800px' : '0')};

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