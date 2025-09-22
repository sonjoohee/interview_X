import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
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
  KPI_QUESTION_LIST,
  GROWTH_HACKER_KPI_BUTTON_STATE,
  GROWTH_HACKER_REPORT_DATA,
  CONVERSATION_STAGE,
  GROWTH_HACKER_SELECTED_SOLUTION,
  GROWTH_HACKER_RECOMMENDED_SOLUTION,
  GROWTH_HACKER_DETAIL_REPORT_DATA,
  BUTTON_STATE,
  IS_LOGGED_IN,
  PROJECT_TOTAL_INFO,
  PROJECT_CREATE_INFO,
} from "../../../AtomStates";

import Loader from "../atoms/AtomLoader";
import { useSaveConversation } from "../atoms/AtomSaveConversation";

import {
  SkeletonTitle,
  SkeletonLine,
  Spacing,
} from "../../../../assets/styles/Skeleton";

import images from "../../../../assets/styles/Images";
import MoleculeReportController from "../molecules/MoleculeReportController";
import {InterviewXIdeaGrowthHackerdetail_reportRequest } from "../../../../utils/indexedDB";

const OrganismGrowthHackerReport = ({ growthHackerReportCount }) => {
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
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

  const [KpiQuestionList, setKpiQuestionList] = useAtom(KPI_QUESTION_LIST);
  const [isLoadingGrowthHacker, setIsLoadingGrowthHacker] = useState(false);
  const [growthHackerKPIButtonState, setGrowthHackerKPIButtonState] = useAtom(GROWTH_HACKER_KPI_BUTTON_STATE);
  const [growthHackerReportData, setGrowthHackerReportData] = useAtom(GROWTH_HACKER_REPORT_DATA);
  const [growthHackerDetailReportData, setGrowthHackerDetailReportData] = useAtom(GROWTH_HACKER_DETAIL_REPORT_DATA);
  const [growthHackerSelectedSolution, setGrowthHackerSelectedSolution] = useAtom(GROWTH_HACKER_SELECTED_SOLUTION);
  const [growthHackerRecommendedSolution, setGrowthHackerRecommendedSolution] = useAtom(GROWTH_HACKER_RECOMMENDED_SOLUTION);
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);

  const [projectTotalInfo, setProjectTotalInfo] = useAtom(PROJECT_TOTAL_INFO);
  const [projectCreateInfo, setProjectCreateInfo] = useAtom(PROJECT_CREATE_INFO);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);
  
  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  useEffect(() => {
    const fetchIdeaList = async () => {

      if(growthHackerKPIButtonState && growthHackerDetailReportData.length <= growthHackerReportCount) {
        setIsLoading(true);
        setIsLoadingGrowthHacker(true);
        setGrowthHackerKPIButtonState(0);

        const data = {
          expert_id: "6",
          business_info: projectTotalInfo.projectTitle,
          business_analysis_data: projectCreateInfo,
          kpi_question_list: KpiQuestionList,
          kpi_report_data: growthHackerReportData,
          recommended_solution: growthHackerSelectedSolution[growthHackerReportCount].title,
        };

        let response = await InterviewXIdeaGrowthHackerdetail_reportRequest(
          data,
          isLoggedIn
        );

        let retryCount = 0;
        const maxRetries = 10;

        while (retryCount < maxRetries && (
          !response || 
          !response.response || 
          typeof response.response !== "object" ||
          !response.response.hasOwnProperty("growth_hacker_detail_report") || 
          !Array.isArray(response.response.growth_hacker_detail_report) ||
          response.response.growth_hacker_detail_report.length !== 2 ||
          !response.response.growth_hacker_detail_report[0].hasOwnProperty("name") ||
          !response.response.growth_hacker_detail_report[0].hasOwnProperty("reason") ||
          !response.response.growth_hacker_detail_report[0].hasOwnProperty("summary") ||
          !Array.isArray(response.response.growth_hacker_detail_report[1]) ||
          response.response.growth_hacker_detail_report[1].length !== 3
        )) 
        {
    
          response = await InterviewXIdeaGrowthHackerdetail_reportRequest(
            data,
            isLoggedIn
          );
          retryCount++;
        }
        if (retryCount === maxRetries) {
          //console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
          // 에러 처리 로직 추가
          throw new Error("Maximum retry attempts reached. Empty response persists.");
        }
        setGrowthHackerDetailReportData([...growthHackerDetailReportData, response.response.growth_hacker_detail_report]);

        setIsLoading(false);
        setIsLoadingGrowthHacker(false);

        const updatedConversation = [...conversation];

        if (growthHackerRecommendedSolution.length === 0) {
          updatedConversation.push(
            {
              type: "system",
              message:
                "이외에 궁금한 점은 대화창에 입력해주시거나, 아래 키워드를 활용하여 추가적인 조언을 받아보세요",
              expertIndex: selectedExpertIndex,
            },
            { type: `keyword` }
          );
    
          setButtonState({
            ...buttonState,
            growthHackerKPI : 1,
          });
    
          await saveConversation(
            { changingConversation: { 
                conversation: updatedConversation, 
                conversationStage: 3,
                buttonState : {
                  ...buttonState,
                  growthHackerKPI : 1,
                },
              }
            }
          );
        } else {
          updatedConversation.push(
            {
              type: "system",
              message:
                "추천 드린 방법은 도움이 되셨나요?",
              expertIndex: -1,
            },
            {
              type: "system",
              message:
                "다른 방법도 선택하여 최적화 가능성을 다각도로 검토해 보세요 ✔",
              expertIndex: -1,
            },
            { type: `growthHackerKPIButton` }
          );
          
          await saveConversation(
            { changingConversation: { conversation: updatedConversation, conversationStage: 3, growthHackerDetailReportData : [...growthHackerDetailReportData, response.response.growth_hacker_detail_report], } }
          );
        }
        setConversationStage(3);
        setConversation(updatedConversation);
      }
    };

    fetchIdeaList();
  }, [growthHackerKPIButtonState]);
  
  return (
    <>
      {isLoadingGrowthHacker ? (
        <SummaryBox style={{minWidth: "805px", minHeight: "150px", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Loader />
        </SummaryBox>
      ) : (
      <>
      <Overlay isMenuOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />

      <SummaryBox>
        <h3>{growthHackerSelectedSolution[growthHackerReportCount].title}</h3>
        <UlList>
          <li>이유 : {growthHackerDetailReportData?.[growthHackerReportCount]?.[0]?.summary}</li>
        </UlList>
        <button onClick={() => toggleMenu()}>
          <img src={images.IconDetailView} alt="" />
          상세 내용 확인하기
        </button>
      </SummaryBox>

      <Sidebar isMenuOpen={isMenuOpen}>
        <div>
          <div className="header">
            <h5>{growthHackerDetailReportData?.[growthHackerReportCount]?.[0]?.name}</h5>
            <button className="closePopup" onClick={() => setIsMenuOpen(false)}>닫기</button>
          </div>
          <div className="body">
            <ScrollWrap>
              <ListBox>
                <div>
                  <span>1️⃣</span>
                  <div>
                    <strong>{growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[0]?.summary?.[1]}</strong>
                    <p>• {growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[0]?.summary?.[2]} {growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[0]?.example?.[0]}</p>
                    <p>• {growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[0]?.summary?.[3]} {growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[0]?.example?.[1]}</p>
                    <p>• {growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[0]?.summary?.[4]} {growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[0]?.example?.[2]}</p>
                  </div>
                </div>
                <div>
                  <span>2️⃣</span>
                  <div>
                    <strong>{growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[1]?.summary?.[1]}</strong>
                    <p>• {growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[1]?.summary?.[2]} {growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[1]?.example?.[0]}</p>
                    <p>• {growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[1]?.summary?.[3]} {growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[1]?.example?.[1]}</p>
                    <p>• {growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[1]?.summary?.[4]} {growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[1]?.example?.[2]}</p>
                  </div>
                </div>
                <div>
                  <span>3️⃣</span>
                  <div>
                    <strong>{growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[2]?.summary?.[1]}</strong>
                    <p>• {growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[2]?.summary?.[2]} {growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[2]?.example?.[0]}</p>
                    <p>• {growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[2]?.summary?.[3]} {growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[2]?.example?.[1]}</p>
                    <p>• {growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[2]?.summary?.[4]} {growthHackerDetailReportData?.[growthHackerReportCount]?.[1]?.[2]?.example?.[2]}</p>
                  </div>
                </div>
              </ListBox>
            </ScrollWrap>
          </div>
        </div>
      </Sidebar>
      </>
      )}

    </>
  );
};

export default OrganismGrowthHackerReport;

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
  // padding-left:26px;
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
width:100%;
background:${palette.white};
// transform: ${({ isMenuOpen }) => (isMenuOpen ? 'translateX(0)' : 'translateX(200%)')};
transition: all .5s;
z-index: 999;

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