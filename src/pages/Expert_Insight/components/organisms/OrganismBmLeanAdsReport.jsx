import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import axios from "axios";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CONVERSATION,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  CONVERSATION_STAGE,
  IDEA_LIST,
  IDEA_GROUP,
  BM_QUESTION_LIST,
  BM_LEAN_ADS_REPORT_BUTTON_STATE,
  BM_LEAN_ADS_REPORT_DATA,
  BM_SELECTED_PROBLEM_OPTIONS,
  BM_LEAN_CUSTOM_REPORT_BUTTON_STATE,
  APPROACH_PATH,
  IS_LOGGED_IN,
  PROJECT_TOTAL_INFO,
  PROJECT_CREATE_INFO,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";
import {InterviewXBmLeanAdsReportRequest} from "../../../../utils/indexedDB";

import Loader from "../atoms/AtomLoader";

const OrganismBmLeanAdsReport = () => {
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const { saveConversation } = useSaveConversation();
  const [conversation, setConversation] = useAtom(CONVERSATION);
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
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [bmLeanAdsButtonState, setBmLeanAdsButtonState] = useAtom(BM_LEAN_ADS_REPORT_BUTTON_STATE);
  const [ideaList, setIdeaList] = useAtom(IDEA_LIST);
  const [ideaGroup, setIdeaGroup] = useAtom(IDEA_GROUP);
  const [isLoadingIdeaPriority, setIsLoadingIdeaPriority] = useState(false);
  const [bmLeanAdsReportData, setBmLeanAdsReportData] = useAtom(BM_LEAN_ADS_REPORT_DATA);
  const [bmQuestionList, setbmQuestionList] = useAtom(BM_QUESTION_LIST);
  const [bmSelectedProblemOptions, setBmSelectedProblemOptions] = useAtom(BM_SELECTED_PROBLEM_OPTIONS); // 문제 선택 아톰
  const [problemOptions, setProblemOptions] = useState("");
  const [bmLeanCustomButtonState, setBmLeanCustomButtonState] = useAtom(BM_LEAN_CUSTOM_REPORT_BUTTON_STATE);

  const [projectTotalInfo, setProjectTotalInfo] = useAtom(PROJECT_TOTAL_INFO);
  const [projectCreateInfo, setProjectCreateInfo] = useAtom(PROJECT_CREATE_INFO);

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지를 상태로 관리

  useEffect(() => {
    if(Object.keys(bmSelectedProblemOptions).length > 0) {
      setProblemOptions(bmSelectedProblemOptions.problemOptions);
      setCurrentPage(bmSelectedProblemOptions.currentPage);
    }
  }, [bmSelectedProblemOptions]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  useEffect(() => {
    const fetchBmLeanAdsReport = async () => {

      if(bmLeanAdsButtonState) {
        setIsLoading(true);
        setIsLoadingIdeaPriority(true);
        setBmLeanAdsButtonState(0);

        const data = {
          expert_id: "9",
          business_info: projectTotalInfo.projectTitle,
          business_analysis_data: projectCreateInfo,
          bm_question_list: bmQuestionList,
        };

        let response = await InterviewXBmLeanAdsReportRequest(
          data,
          isLoggedIn
        );

        let retryCount = 0;
        const maxRetries = 10;

        while (retryCount < maxRetries && (
          !response || !response.response || typeof response.response !== "object" ||
          !response.response.hasOwnProperty("bm_lean_ads_report") ||
          !Array.isArray(response.response.bm_lean_ads_report) ||
          response.response.bm_lean_ads_report.some(keywordSection => 
            !Array.isArray(keywordSection.keywords) || 
            keywordSection.keywords.some(keyword => 
              !keyword.hasOwnProperty("title") || 
              !keyword.hasOwnProperty("description") || 
              !Array.isArray(keyword.examples) || 
              !Array.isArray(keyword.related_blocks) || 
              !keyword.hasOwnProperty("action")
            )
          )
        )) {
    
          response = await InterviewXBmLeanAdsReportRequest(
            data,
            isLoggedIn
          );
          retryCount++;
        }
        if (retryCount === maxRetries) {
         // console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
          // 에러 처리 로직 추가
          throw new Error("Maximum retry attempts reached. Empty response persists.");
        }
        setBmLeanAdsReportData(response.response.bm_lean_ads_report);


        const updatedConversation = [...conversation];
        updatedConversation.push(
          // {
          //   type: "system",
          //   message:
          //     "목표로 하는 문제(Problem)를 골라주시면, 해당 문제에 특화된 린 캔버스를 작성하겠습니다.",
          //   expertIndex: selectedExpertIndex,
          // },
          // { type: `bmLeanAdsReport`}
        );
        setConversationStage(3);
        setConversation(updatedConversation);

        await saveConversation(
          { changingConversation: { conversation: updatedConversation, conversationStage: 3, bmLeanAdsReportData : response.response.bm_lean_ads_report, } }
        );
        setIsLoading(false);
        setIsLoadingIdeaPriority(false);
      }
    };

    fetchBmLeanAdsReport();
  }, [bmLeanAdsButtonState]);

  const examplesPerPage = 5; // 페이지당 표시할 예시 개수

  // 전체 예시를 하나의 배열로 모으기
  const allExamples = bmLeanAdsReportData.reduce((acc, section) => {
    section.keywords.forEach((keywordItem) => {
      if (keywordItem.examples) {
        // 예시 문자열에서 ':' 이후의 텍스트만 추출하여 추가
        const extractedExamples = keywordItem.examples.map(example => {
          const parts = example.split(':');
          return parts.length > 1 ? parts[1].trim() : example;
        });
        acc.push(...extractedExamples);
      }
    });
    return acc;
  }, []);
  
  // 현재 페이지에 표시할 예시 목록 계산
  const paginatedExamples = (examples) => {
    const startIndex = (currentPage - 1) * examplesPerPage;
    return examples.slice(startIndex, startIndex + examplesPerPage);
  };

  const handleExampleClick = (example) => {
    if (Object.keys(bmSelectedProblemOptions).length > 0) return;
    
    setProblemOptions(example); // 클릭된 example을 bmSelectedProblemOptions에 저장
  };

  const handleConfirm = async () => {
    if (!problemOptions) return;
    
    setBmSelectedProblemOptions({
      problemOptions: problemOptions,
      currentPage: currentPage,
    });
    setApproachPath(3);
    setConversationStage(3);
    setBmLeanCustomButtonState(1);

    const updatedConversation = [...conversation];
    updatedConversation.push(
      {
        type: "user",
        message: `${problemOptions}로 세분화 해주세요`,
      },
      {
        type: `bmLeanCustomReport`,
      }
    );
    setConversation(updatedConversation);

    await saveConversation(
      { changingConversation: { 
          conversation: updatedConversation, 
          conversationStage: 3,
          bmSelectedProblemOptions : {
            problemOptions: problemOptions,
            currentPage: currentPage,
          },
        }
      }
    );
    
    };
  return (
    <>
      {isLoadingIdeaPriority ? (
        <Wrap style={{minWidth: "518px", minHeight: "419px", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Loader />
        </Wrap>
      ) : (
        <Wrap>
          <h1>하나의 핵심 문제를 선정해주세요.</h1>
          <OptionContainer>
            <ul>
              {allExamples.length > 0 ? (
                paginatedExamples(allExamples).map((example, exampleIndex) => (
                  <Option
                    key={exampleIndex}
                    onClick={() => handleExampleClick(example)} // 클릭 시 handleExampleClick 호출
                    selected={problemOptions === example}
                    bmSelectedProblemOptions={bmSelectedProblemOptions.problemOptions}
                  >
                    <Label
                      bmSelectedProblemOptions={bmSelectedProblemOptions.problemOptions}
                      selected={problemOptions === example}
                    >
                      {example}
                    </Label>
                  </Option>
                ))
              ) : (
                <li>예시 없음</li>
              )}
            </ul>
          </OptionContainer>

          <PaginationWrap>
            {/* 총 1개의 페이지네이션 */}
            {allExamples.length > examplesPerPage && (
              <Pagination bmSelectedProblemOptions={bmSelectedProblemOptions.problemOptions}>
                {Array.from({
                  length: Math.ceil(allExamples.length / examplesPerPage),
                }).map((_, pageIndex) => (
                  <li key={pageIndex}>
                    <a
                      onClick={() => handlePageChange(pageIndex + 1)}
                      className={currentPage === pageIndex + 1 ? 'active' : ''}
                    >
                      {pageIndex + 1}
                    </a>
                  </li>
                ))}
              </Pagination>
            )}

            <ButtonWrap>
              <Button 
                bmSelectedProblemOptions={bmSelectedProblemOptions.problemOptions} problemOptions={problemOptions}
                disabled={!problemOptions} // 선택이 안됐을 경우 버튼 비활성화
                onClick={() => {
                  handleConfirm();
                }}
              >
                완료
              </Button>
            </ButtonWrap>
          </PaginationWrap>
        </Wrap>
      )}
    </>
  );
};
export default OrganismBmLeanAdsReport;

const Wrap = styled.div`
  max-width:540px;
  width:100%;
  display:flex;
  flex-direction:column;
  gap:20px;
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
  }
`;

const OptionContainer = styled.div`
  display:flex;
  flex-direction:column;
  flex-wrap:wrap;
  justify-content:space-between;
  gap:8px;
`;

const Option = styled.li`
  position:relative;
  display:flex;
  gap:8px;
  align-items:center;
  color: ${palette.gray800};
  font-size:0.88rem;
  text-align: left;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected
      ? props.bmSelectedProblemOptions
        ? "rgba(0,0,0,0.05)"
        : "rgba(4,83,244,0.05)"
      : palette.white};
  border: 1px solid ${(props) => (props.selected ? (props.bmSelectedProblemOptions ? palette.gray800 : palette.blue) : palette.lineGray)};
  transition:all .5s;

  + li {
    margin-top:8px;
  }

  p {
    color: ${(props) => (props.selected ? palette.gray800 : palette.gray500)};
    line-height:1.3;
  }
  
  img {
    margin-bottom: 5px;
    background-color: ${(props) => (!props.selected || props.bmSelectedProblemOptions ? "rgba(246, 246, 246, 1)" : "rgba(255, 255, 255, 1)")};
    border-radius: 50%;
    padding: 10px;
    width: 34px;
    height: 34px;
  }

  &:hover {
    border-color: ${(props) =>
      props.bmSelectedProblemOptions
        ? "none" 
        : palette.blue};
  }
`;

const Label = styled.label`
  position:relative;
  display:flex;
  gap:8px;
  align-items:flex-start;
  width:100%;
  color: ${(props) => (props.selected ? (props.bmSelectedProblemOptions ? palette.gray800 : palette.blue) : palette.gray800)};
  cursor:pointer;

  &:before {
    width:20px;
    height:20px;
    flex-shrink:0;
    border-radius:50%;
    border:1px solid ${(props) => (props.selected ? (props.bmSelectedProblemOptions ? palette.gray800 : palette.blue) : palette.lineGray)};
    background-color: ${(props) => (props.selected ? (props.bmSelectedProblemOptions ? palette.gray800 : palette.blue) : palette.white)};
    transition:all .5s;
    content:'';
  }

  &:after {
    position:absolute;
    left:0;
    top:0;
    width:20px;
    height:20px;
    background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8' fill='none'%3E%3Cpath d='M9 0.914062L3.4 6.91406L1 4.51406' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center no-repeat;
    content:'';
  }
`;

const PaginationWrap = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
`;

const Pagination = styled.ul`
  display:flex;
  align-items:center;

  li + li:before {
    display:inline-block;
    width:1px;
    height:8px;
    background:${palette.gray300};
    content:'';
  }

  a {
    font-size:0.88rem;
    color:${palette.gray300};
    padding:0 10px;
    transition:all .5s;
    cursor: pointer;

    &:hover {
      color:${palette.gray700};
    }

    &.active {
      font-weight:500;
      color:${(props) => props.bmSelectedProblemOptions ? palette.gray800 : palette.primary};
    }
  }
`;

const ButtonWrap = styled.div`
  display:flex;
  justify-content:end;
  align-items:center;
`;

const Button = styled.button`
  font-family: Pretendard, Poppins;
  font-size:0.88rem;
  font-weight:400;
  color: ${(props) => (props.problemOptions ? palette.primary : palette.gray500)};
  line-height:22px;
  padding:8px 0 8px 20px;
  margin-left:auto;
  border-radius:8px;
  border:0;
  background:${palette.white};
  transition:all .5s;
  cursor: ${(props) => (
    props.problemOptions ? 'pointer' : 'default')};
  display: ${(props) => (
    props.bmSelectedProblemOptions ? 'none' : 'block')};
`;