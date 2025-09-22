import React, { useEffect, useState } from "react";
import styled, { css, ThemeProvider } from "styled-components";
import theme from "../../../../assets/styles/Theme";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CONVERSATION,
  TITLE_OF_BUSINESS_INFORMATION,
  STRATEGY_CONSULTANT_REPORT_DATA,
  APPROACH_PATH,
  IS_LOGGED_IN,
  PROJECT_CREATE_INFO,
  PROJECT_TOTAL_INFO,
} from "../../../AtomStates";

import Loader from "../atoms/AtomLoader"
import { useSaveConversation } from "../../../Expert_Insight/components/atoms/AtomSaveConversation";
import { MarketingResearchReportRequest } from "../../../../utils/indexedDB";
import {  InterviewXExpertReportRequest } from "../../../../utils/indexedDB";

const OrganismStrategyConsultantReport = ({ strategyConsultantCount }) => {
  const { saveConversation } = useSaveConversation();
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [, setIsLoading] = useAtom(IS_LOADING);
  const [isLoadingStrategyConsultantReport, setIsLoadingStrategyConsultantReport] = useState(false);
  const [strategyConsultantReportData, setStrategyConsultantReportData] = useAtom(STRATEGY_CONSULTANT_REPORT_DATA);
  const [approachPath] = useAtom(APPROACH_PATH);
  const [projectCreateInfo, ] = useAtom(PROJECT_CREATE_INFO);
  const [projectTotalInfo, ] = useAtom(PROJECT_TOTAL_INFO);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);


  useEffect(() => {
    const fetchStrategyConsultantReport = async () => {
      try {
        if (strategyConsultantReportData.length === strategyConsultantCount && approachPath !== 2) {
          setIsLoadingStrategyConsultantReport(true);
          setIsLoading(true);

          const data = {
            expert_id: "1",
            business_info: projectTotalInfo.projectTitle,
            business_analysis_data: projectCreateInfo,
            button_state: strategyConsultantReportData.length,
            standpoint: "",
            goal: "",
            target: "",
            tabs: [],
            page_index: 1
          };

          let response = await  InterviewXExpertReportRequest(
            data,
            isLoggedIn
          );
        //  console.log("전략 컨설팅 response", response);
            
          if (response && response.response && response.response.tabs) {
            let strategyConsultantReport = response.response.tabs[0];

            
            
            let retryCount = 0;
            const maxRetries = 10;

            while (retryCount < maxRetries && (
              !response || 
              !response.response || 
              typeof response.response !== "object" ||
              !response.response.hasOwnProperty("tabs") || 
              !Array.isArray(response.response.tabs) ||
              response.response.tabs.length === 0 ||
              !response.response.tabs[0].hasOwnProperty("title") ||
              !response.response.tabs[0].hasOwnProperty("sections") ||
              !Array.isArray(response.response.tabs[0].sections) ||
              response.response.tabs[0].sections.length === 0
            )) {
              response = await MarketingResearchReportRequest(data);
              retryCount++;

            }
            if (retryCount === maxRetries) {
              throw new Error("Maximum retry attempts reached. Empty response persists.");
            }

            setStrategyConsultantReportData([...strategyConsultantReportData, strategyConsultantReport]);

            setIsLoadingStrategyConsultantReport(false);
            setIsLoading(false);

            const updatedConversation = [...conversation];

            let system_message1, system_message2;
          
            const system_message_1 = `시장 분석이 완료되었습니다. 🚀\n분석된 인사이트와 잠재력을 파악하는데 도움이 될 것입니다.  `;
            const system_message_1_2 = "이제 다음 단계로 비즈니스 성공을 위해 주요 고객을 파악하는 것이 중요합니다.\n핵심 타겟에 대한 이해를 기반으로, 더 높은 성장 가치를 지닌 아이템으로 발전 시킬 수 있어요. ";
            
            const system_message_2 = "고객 분석과 가치 제안 리포트가 완료되었습니다.";
            const system_message_2_2 = "이제 우리 비즈니스가 시장에서 어떤 경쟁 우위를 가질 수 있는지 알아볼 시간입니다.\n함께 방법을 확인해 보아요";
          
            const system_message_3 = `이렇게 ${titleOfBusinessInfo}의 전략 수립에 필요한 기본 정보를 함께 정리해 보았습니다.\n이제 이를 활용해 비즈니스의 가능성을 더 확장해 보세요. `;
            const system_message_3_2 = "이외에 궁금한 점은 대화창에 입력해주시거나, 아래 키워드를 활용하여 추가적인 조언을 받아보세요";
          
            if (strategyConsultantReportData.length === 0) {
              system_message1 = system_message_1;
              system_message2 = system_message_1_2;
            } else if (strategyConsultantReportData.length === 1) {
              system_message1 = system_message_2;
              system_message2 = system_message_2_2;
            } else if (strategyConsultantReportData.length === 2) {
              system_message1 = system_message_3;
              system_message2 = system_message_3_2;
            }

            updatedConversation.push(
              {
                type: "system",
                message: system_message1,
                expertIndex: -1,
              },
              {
                type: "system",
                message: system_message2,
                expertIndex: -1,
              },
              { type: strategyConsultantReportData.length === 2 ? `keyword` : `strategyButton` }
            );

            setConversation(updatedConversation);
  

            await saveConversation({ changingConversation: { conversation: updatedConversation, strategyConsultantReportData: [...strategyConsultantReportData, strategyConsultantReport] } });
          } else {
           // console.error("Invalid response structure:", response);
          }
        }
      } catch (error) {
       // console.error("Error fetching strategy consultant report:", error);
      }
    };

    fetchStrategyConsultantReport();
  }, [strategyConsultantCount]);

  return (
    <>
    <ThemeProvider theme={theme}>
    
      {isLoadingStrategyConsultantReport ? (
        <SummaryBox style={{minWidth: "700px", minHeight: "200px", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Loader />
        </SummaryBox>
      ) : (
        <>
          <Overlay isMenuOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />

          <SummaryBox>
            <h3>{strategyConsultantCount === 0 ? "시장 기회 탐색 리포트" : strategyConsultantCount === 1 ? "고객 분석과 가치 제안 리포트" : "시장 내 경쟁 우위 방안 리포트 "}</h3>
            <UlList Disc>
              {strategyConsultantCount === 0 &&
                <>
                  <li><strong>타겟 시장 :</strong> {strategyConsultantReportData?.[0]?.sections?.[6]?.content?.[0]}</li>
                  <li><strong>불편 요소 :</strong> {strategyConsultantReportData?.[0]?.sections?.[6]?.content?.[1]}</li>
                  <li><strong>기회 및 니즈 :</strong> {strategyConsultantReportData?.[0]?.sections?.[6]?.content?.[2]}</li>
                  <li><strong>시장 포지셔닝 :</strong> {strategyConsultantReportData?.[0]?.sections?.[6]?.content?.[3]}</li>
                </>
              }
              {strategyConsultantCount === 1 &&
                <>
                  <li><strong>주요 특징 :</strong> {strategyConsultantReportData?.[1]?.sections?.[5]?.content?.[0]}</li>
                  <li><strong>핵심 가치 :</strong> {strategyConsultantReportData?.[1]?.sections?.[5]?.content?.[1]}</li>
                  <li><strong>가치 제안 전략 :</strong> {strategyConsultantReportData?.[1]?.sections?.[5]?.content?.[2]}</li>
                </>
              }
              {strategyConsultantCount === 2 &&
                <>
                  <li><strong>시장 선점 방법 :</strong> {strategyConsultantReportData?.[2]?.sections?.[5]?.content?.[0]}</li>
                  <li><strong>성장 가속화 방법 :</strong> {strategyConsultantReportData?.[2]?.sections?.[5]?.content?.[1]}</li>
                </>
              }
            </UlList>
            <button onClick={() => toggleMenu()}>
              <img src={images.IconDetailView} alt="" />
              상세 내용 확인하기
            </button>
          </SummaryBox>

          <Sidebar isMenuOpen={isMenuOpen}>
          <div>
            <div className="header">
              <h5>{strategyConsultantCount === 0 ? "시장 기회 탐색 리포트" : strategyConsultantCount === 1 ? "고객 가치 제안 상세 리포트" : "시장 내 경쟁 우위 상세 리포트"}</h5>
              <button className="closePopup" onClick={() => setIsMenuOpen(false)}>닫기</button>
            </div>
            <div className="body">
              {strategyConsultantCount === 2 || strategyConsultantCount === 2 && <p>{strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[4]?.content?.[0]?.text}</p>}
              <ScrollWrap>
                {strategyConsultantCount === 0 && (
                  <ListBox>
                  <div>
                    <span>👉🏻</span>
                    <div>
                      <strong>타겟 시장 세그먼트</strong>
                      <p>{strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[0]?.content?.[0]?.text}</p>
                    </div>
                  </div>
                  <div>
                    <span>👁‍</span>
                    <div>
                      <strong>기회 및 고려사항</strong>
                      <p>• 강점 파악 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[1]?.content?.[0]?.text}</p>
                      <p>• 고려 사항 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[1]?.content?.[1]?.text}</p>
                    </div>
                  </div>
                  <div>
                    <span>🔎</span>
                    <div>
                      <strong>잠재력 및 리스크</strong>
                      <p>• 기회 요소 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[2]?.content?.[0]?.text}</p>
                      <p>• 리스크 요소 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[2]?.content?.[1]?.text}</p>
                    </div>
                  </div>
                  <div>
                    <span>💬</span>
                    <div>
                      <strong>핵심가치와 경쟁과제</strong>
                      <p>• 핵심 가치 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[3]?.content?.[0]?.text}</p>
                      <p>• 경쟁 과제 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[3]?.content?.[1]?.text}</p>
                    </div>
                  </div>
                  <div>
                    <span>📌</span>
                    <div>
                      <strong>이상적인 시장 포지셔닝</strong>
                      <p>{strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[4]?.content?.[0]?.text}</p>
                    </div>
                  </div>
                </ListBox>
                )}
                {strategyConsultantCount === 1 && (
                  <ListBox>
                  <div>
                    <span>👉🏻</span>
                    <div>
                      <strong>고객 중심의 강점과 개선 과제</strong>
                      <p>• 필수 기대 요소 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[3]?.content?.[0]?.text}</p>
                      <p>• 우려 사항 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[3]?.content?.[1]?.text}</p>
                    </div>
                  </div>
                  <div>
                    <span>📌</span>
                    <div>
                      <strong>핵심 요소 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[0]?.title}</strong>
                      <p>• 장점 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[0]?.content?.[0]?.text}</p>
                      <p>• 도전 과제 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[0]?.content?.[1]?.text}</p>
                    </div>
                  </div>
                  <div>
                    <span>📌</span>
                    <div>
                      <strong>핵심 요소 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[1]?.title}</strong>
                      <p>• 가치 제안 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[1]?.content?.[0]?.text}</p>
                      <p>• 위험 요소 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[1]?.content?.[1]?.text}</p>
                    </div>
                  </div>
                  <div>
                    <span>📌</span>
                    <div>
                      <strong>핵심 요소 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[2]?.title}</strong>
                      <p>• 우선 요소 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[2]?.content?.[0]?.text}</p>
                      <p>• 잠재적 영향 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[2]?.content?.[1]?.text}</p>
                    </div>
                  </div>
                </ListBox>
                )}
                {strategyConsultantCount === 2 && (
                  <ListBox>
                  <div>
                    <span>👉🏻</span>
                    <div>
                      <strong>시장 내 유리한 위치 평가</strong>
                      <p>• 유리한 위치 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[2]?.content?.[0]?.text}</p>
                      <p>• 지속 가능성 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[2]?.content?.[1]?.text}</p>
                    </div>
                  </div>
                  <div>
                    <span>📌</span>
                    <div>
                      <strong>차별점 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[0]?.title}</strong>
                      <p>• 경쟁력 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[0]?.content?.[0]?.text}</p>
                      <p>• 경쟁 압박 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[0]?.content?.[1]?.text}</p>
                    </div>
                  </div>
                  <div>
                    <span>📌</span>
                    <div>
                      <strong>차별점 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[1]?.title}</strong>
                      <p>• 고유 강점 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[1]?.content?.[0]?.text}</p>
                      <p>• 위험 요소 : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[1]?.content?.[1]?.text}</p>
                    </div>
                  </div>
                  <div>
                    <span>💌</span>
                    <div>
                      <strong>제안 사항</strong>
                      <p>• {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[3]?.content?.[0]?.subTitle} : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[3]?.content?.[0]?.text}</p>
                      <p>• {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[3]?.content?.[1]?.subTitle} : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[3]?.content?.[1]?.text}</p>
                      <p>• {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[3]?.content?.[2]?.subTitle} : {strategyConsultantReportData?.[strategyConsultantCount]?.sections?.[3]?.content?.[2]?.text}</p>
                    </div>
                  </div>
                </ListBox>
                )}
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

export default OrganismStrategyConsultantReport;

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

    h2 {
      font-size:1.25rem;
    }
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
  z-index: 99999999;

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
    align-items:revert;

    h5 {
      width:90%;
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
`;

const ScrollWrap = styled.div`
  position:relative;
  flex:1 1 0%;
  overflow-y:auto;

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