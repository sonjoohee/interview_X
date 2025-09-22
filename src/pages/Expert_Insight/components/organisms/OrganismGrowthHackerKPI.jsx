import React, { useState, useEffect, useRef } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import axios from "axios";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import { 
  GROWTH_HACKER_REPORT_DATA, 
  GROWTH_HACKER_KPI_BUTTON_STATE,
  CONVERSATION,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  SELECTED_EXPERT_INDEX,
  CONVERSATION_STAGE,
  KPI_QUESTION_LIST,
  GROWTH_HACKER_DETAIL_REPORT_DATA,
  IS_LOADING,
  GROWTH_HACKER_BUTTON_STATE,
  GROWTH_HACKER_RECOMMENDED_SOLUTION,
  IS_LOGGED_IN,
  PROJECT_TOTAL_INFO,
  PROJECT_CREATE_INFO,
} from "../../../../pages/AtomStates";

import Loader from "../atoms/AtomLoader";

import { useAtom } from "jotai";

import { useSaveConversation } from "../atoms/AtomSaveConversation";
import {InterviewXIdeaGrowthHackerReportRequest } from "../../../../utils/indexedDB";
const OrganismGrowthHackerKPI = () => {
  const { saveConversation } = useSaveConversation();
  const [growthHackerDetailReportData, setGrowthHackerDetailReportData] = useAtom(GROWTH_HACKER_DETAIL_REPORT_DATA);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation,] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [growthHackerKPIButtonState, setGrowthHackerKPIButtonState] = useAtom(GROWTH_HACKER_KPI_BUTTON_STATE);
  const [KpiQuestionList, setKpiQuestionList] = useAtom(KPI_QUESTION_LIST);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [isModalOpen, setIsModalOpen] = useState({});
  const [selectedFormat, setSelectedFormat] = useState("Word");
  const [selectedLanguage, setSelectedLanguage] = useState("한글");
  const [isPopupOpenDownload, setIsPopupOpenDownload] = useState(false);
  const popupRef = useRef(null);
  const [loadingDownload, setLoadingDownload] = useState(false);

  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [isLoadingGrowthHacker, setIsLoadingGrowthHacker] = useState(false);
  const [growthHackerButtonState, setGrowthHackerButtonState] = useAtom(GROWTH_HACKER_BUTTON_STATE);
  const [growthHackerReportData, setGrowthHackerReportData] = useAtom(GROWTH_HACKER_REPORT_DATA);
  const [growthHackerRecommendedSolution, setGrowthHackerRecommendedSolution] = useAtom(GROWTH_HACKER_RECOMMENDED_SOLUTION);
  
  const [projectTotalInfo, setProjectTotalInfo] = useAtom(PROJECT_TOTAL_INFO);
  const [projectCreateInfo, setProjectCreateInfo] = useAtom(PROJECT_CREATE_INFO);

  const togglePopupDownload = () => {
    setIsPopupOpenDownload(!isPopupOpenDownload);
  };
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language); // 선택된 언어 상태를 설정
  };

  const steps = ['Acquisition', 'Activation', 'Retention', 'Referral', 'Revenue'];
  const labels = ['획득', '활성화', '유지', '추천', '수익'];
  const titles = ['고객 확보하기(Acquisition) 단계 집중 ', 
                  '고객에게 핵심가치 경험시키기(Activation) 단계 집중', 
                  '고객 유지하기(Retention) 단계 집중', 
                  '자발적 추천하게 만들기(Referral) 단계 집중', 
                  '고객을 통해 수익 창출하기(Revenue) 단계 집중'];

  const findStepIndex = (variable) => {
    return steps.indexOf(variable);
  };

  // 현재 선택된 단계에 따라 프로그래스바 상태 업데이트
  useEffect(() => {
    if (growthHackerReportData.length > 0) {
      const index = steps.indexOf(growthHackerReportData[0].title);
      if (index !== -1) {
        setCurrentStep(index);
      }
    }
  }, [growthHackerReportData]);

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  useEffect(() => {
    const fetchIdeaList = async () => {

      if(growthHackerButtonState) {
        setIsLoading(true);
        setIsLoadingGrowthHacker(true);
        setGrowthHackerButtonState(0);

        const data = {
          expert_id: "6",
          business_info: projectTotalInfo.projectTitle,
          business_analysis_data: projectCreateInfo,
          kpi_question_list: KpiQuestionList,
        };

        let response = await InterviewXIdeaGrowthHackerReportRequest(
          data,
          isLoggedIn
        );

        let retryCount = 0;
        const maxRetries = 10;

        while (retryCount < maxRetries && (
          !response || 
          !response.response || 
          typeof response.response !== "object" ||
          !response.response.hasOwnProperty("growth_hacker_report") || 
          !Array.isArray(response.response.growth_hacker_report) ||
          response.response.growth_hacker_report.length !== 3 ||
          !response.response.growth_hacker_report[0].hasOwnProperty("title") ||
          !response.response.growth_hacker_report[0].hasOwnProperty("detail") ||
          !response.response.growth_hacker_report[0].hasOwnProperty("point") ||
          !response.response.growth_hacker_report[1].hasOwnProperty("detail") ||
          !response.response.growth_hacker_report[1].hasOwnProperty("goal") ||
          !response.response.growth_hacker_report[1].hasOwnProperty("key") ||
          !Array.isArray(response.response.growth_hacker_report[2])
        )) 
        {
    
          response = await InterviewXIdeaGrowthHackerReportRequest(
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
        setGrowthHackerReportData(response.response.growth_hacker_report);
        setGrowthHackerRecommendedSolution(response.response.growth_hacker_report[2]);

        setIsLoading(false);
        setIsLoadingGrowthHacker(false);

        const updatedConversation = [...conversation];
        updatedConversation.push(
          {
            type: "system",
            message:
              "주목해야할 마케팅 퍼널 포인트를 파악했으니, 이제 퍼널 최적화 방법을 제시해드리겠습니다.\n아래 방법 중 하나를 선택해주세요. ",
            expertIndex: selectedExpertIndex,
          },
          { type: `growthHackerKPIButton` }
        );
        setConversationStage(3);
        setConversation(updatedConversation);

        await saveConversation(
          { changingConversation: { conversation: updatedConversation, conversationStage: 3, growthHackerReportData : response.response.growth_hacker_report, growthHackerRecommendedSolution : response.response.growth_hacker_report[2] } }
        );
      }
    };

    fetchIdeaList();
  }, [growthHackerButtonState]);

  // useEffect(() => {
  //   const fetchGrowthHackerKPI = async () => {

  //     if (growthHackerKPIButtonState) {
  //       const updatedConversation = [...conversation];

  //       updatedConversation.push(
  //         {
  //           type: "system",
  //           message:
  //             "리포트 내용을 보시고 추가로 궁금한 점이 있나요?\n아래 키워드 선택 또는 질문해주시면, 더 많은 인사이트를 제공해 드릴게요! 😊",
  //           expertIndex: selectedExpertIndex,
  //         },
  //         { type: `keyword` }
  //       );

  //       setConversation(updatedConversation);
  //       setConversationStage(3);
  //       setGrowthHackerKPIButtonState(0);

  //       await saveConversation(
  //         { changingConversation: { conversation: updatedConversation, conversationStage: 3 } }
  //       );
  //     };
  //   }

  //   fetchGrowthHackerKPI();
  // }, [growthHackerKPIButtonState]);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       popupRef.current &&
  //       !popupRef.current.contains(event.target) &&
  //       !event.target.closest(".download-button")
  //     ) {
  //       setIsPopupOpenDownload(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isModalOpen]);

  ////////////////////////////////////////////////////////////////////////////////

  // const handleDownloadDocx = async () => {
  //   setLoadingDownload(true); // 로딩 상태 시작

  //   let fileName = `AARRR 모델 기반 최적의 KPI 도출`; // 기본 파일 이름

  //   // // 목표 행위 텍스트를 파일 이름으로 설정
  //   // const content = currentExpertData.tabs[0].sections[0].content[index];
  //   // if (content && content.subContent) {
  //   //   content.subContent.forEach((subItem) => {
  //   //     if (subItem.subTitle === "목표 행위") {
  //   //       fileName = `${subItem.text} - PoC 수행 계획서`; // "목표 행위" 텍스트를 파일 이름으로 사용
  //   //     }
  //   //   });
  //   // }

  //   // 이미 저장된 데이터가 있는 경우 해당 데이터를 사용
  //   if (Object.keys(growthHackerDetailReportData).length !== 0) {
  //     generateDocx(growthHackerDetailReportData, fileName); // DOCX 생성 함수 호출
  //     return;
  //   }

  //   const data = {
  //     expert_id: "6",
  //     business_info: titleOfBusinessInfo,
  //     business_analysis_data: {
  //       명칭: titleOfBusinessInfo,
  //       주요_목적_및_특징: mainFeaturesOfBusinessInformation,
  //       주요기능: mainCharacteristicOfBusinessInformation,
  //       목표고객: businessInformationTargetCustomer,
  //     },
  //     kpi_question_list: KpiQuestionList,
  //   };

  //   try {
  //     // API 요청 보내기
  //     const response = await axios.post(
  //       "https://wishresearch.kr/panels/growth_hacker_detail",
  //       data,
  //     );

  //     // 응답으로부터 보고서 내용 가져오기
  //     const reportContent = response.data.growth_hacker_detailpersona_recommand_report;

  //     // Atom에 보고서 내용을 저장
  //     setGrowthHackerDetailReportData(reportContent);

  //     // 저장 후 DOCX 생성 함수 호출
  //     generateDocx(reportContent, fileName);

  //     await saveConversation(
  //       { changingConversation: { conversationStage: 3, growthHackerDetailReportData : reportContent } }
  //     );
  //   } catch (error) {
  //     console.error("Error fetching report:", error);
  //     setLoadingDownload(false);
  //     setTimeout(() => {
  //     }, 2000);
  //   }
  // };

  // // DOCX 파일을 생성하는 함수
  // const generateDocx = (content, fileName) => {
  //   try {
  //     // Word 문서용 전처리
  //     const cleanedContent = content
  //       .replace(/##/g, "") // 제목 표시 '##' 제거
  //       .replace(/\*\*/g, "") // 굵은 글씨 '**' 제거
  //       .replace(/\*/g, "") // 이탤릭체 '*' 제거
  //       .replace(/-\s/g, "• ") // 리스트 '-'를 '•'로 변환
  //       .replace(/<br\/>/g, "\n"); // <br/>을 줄바꿈으로 변환

  //     // 줄바꿈 기준으로 텍스트 분리
  //     const contentParagraphs = cleanedContent.split("\n").map((line) => {
  //       return new Paragraph({
  //         children: [
  //           new TextRun({
  //             text: line,
  //           }),
  //         ],
  //       });
  //     });

  //     // 문서 생성을 위한 docx Document 객체 생성
  //     const doc = new Document({
  //       sections: [
  //         {
  //           children: [
  //             ...contentParagraphs, // 분리된 각 줄을 Paragraph로 추가
  //           ],
  //         },
  //       ],
  //     });

  //     // docx 파일 패킹 및 다운로드
  //     Packer.toBlob(doc)
  //       .then((blob) => {
  //         saveAs(blob, `${fileName}.docx`);

  //         // 2초 후 상태 리셋
  //         setTimeout(() => {
  //           setLoadingDownload(false);
  //         }, 2000);
  //       })
  //       .catch((error) => {
  //         console.error("Error generating DOCX:", error);
  //         setLoadingDownload(false);
  //         setTimeout(() => {
  //         }, 2000);
  //       });
  //   } catch (error) {
  //     console.error("Error generating DOCX:", error);
  //   }
  // };

  ///////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {isLoadingGrowthHacker || growthHackerButtonState ? (
        <Wrap style={{minWidth: "520px", minHeight: "555px", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Loader />
        </Wrap>
      ) : (
      <Wrap>
        <h1>
          AARRR 모델 기반 최적의 KPI 도출
          <p>
            AARRR이란?
            <span onClick={toggleVisibility}>!</span>
          </p>
          {isVisible && 
            <ToogleBox>
              <span onClick={toggleVisibility}>닫기</span>
              <div>
                <strong>AARRR이란?</strong>
                <p>AARRR 모델은 각 성장 단계를 분석해 최적의 성장을 도출하는데 활용됩니다. 고객 여정을 따라 단계별로 개선 방안을 수립하여 효율적으로 성과를 달성할 수 있도록 도와줍니다.</p>
                <UlList>
                  <li>
                    <span>A</span>
                    Acquisition (획득) : 고객을 어떻게 유입시킬 것인가.<br />
                    지표: 방문자 수, 클릭률(CTR), 유입 경로<br />
                    이유: 잠재 고객이 서비스를 처음 인지하고 진입하는 시점에 집중
                  </li>
                  <li>
                    <span>A</span>
                    Activation (활성화): 사용자가 가치를 처음 경험하게 만듦.<br />
                    지표: 첫 사용 후 만족도, 가입 후 일정 시간 내 재방문.<br />
                    이유: 첫인상에서 성공해야 지속적인 사용을 유도할 수 있음.
                  </li>
                  <li>
                    <span>R</span>
                    Retention (유지): 고객이 서비스를 계속 사용하게 유도.<br />
                    지표: 재방문율, 이탈률.<br />
                    이유: 기존 고객의 유지가 신규 고객 유치보다 비용이 적게 듦.
                  </li>
                  <li>
                    <span>R</span>
                    Referral (추천): 고객이 자발적으로 서비스를 추천하도록 유도.<br />
                    지표: 추천 사용자 수, 바이럴 효과.<br />
                    이유: 만족한 고객이 새로운 고객을 데려오는 바이럴 성장 유도.
                  </li>
                  <li>
                    <span>R</span>
                    Revenue (수익): 서비스를 통해 수익을 창출.<br />
                    지표: 결제율, 고객당 수익.<br />
                    이유: 지속 가능한 비즈니스를 위해 수익화가 필수적.
                  </li>
                </UlList>
              </div>
            </ToogleBox>
          }
        </h1>

        <KPIWrap>
          <h4>
            <span>비즈니스와 퍼널 분석 결과</span>
            {titles[findStepIndex(growthHackerReportData[0].title)]}
          </h4>

          <Progress>
            <div
              className="progress-container"
            >
              {steps.map((step, index) => {
                const firstLetter = step.charAt(0);
                const restOfWord = step.slice(1);

                return (
                  <div 
                    key={index} 
                    className="step" 
                  >
                    <div className={`bar ${index < currentStep ? 'completed' : index === currentStep ? 'current' : ''}`}></div>
                    <div className={`label ${index <= currentStep ? 'active' : ''}`}>
                      <strong>{firstLetter}</strong>{restOfWord}
                    </div>
                  </div>
                );
              })}

              <div
                className="handle"
                style={{
                  left: currentStep === steps.length - 1 
                    ? '100%'
                    : `${(currentStep + 0.5) / steps.length * 100}%`,
                  transform: currentStep === steps.length - 1 
                    ? 'translateX(-100%)'
                    : 'translateX(-50%)',
                  transition: 'left 0.3s ease',
                }}
              >
                <img src={images.IconCheck3} alt="" />
                <span>{labels[currentStep]}</span>
              </div>
            </div>
          </Progress>

          <Content>
            <span>Why</span>
            <p>{growthHackerReportData[1].detail}</p>
            <br />
            <span>Goal</span>
            <p>{growthHackerReportData[1].key}</p>
          </Content>

          {/* <DownloadButton onClick={togglePopupDownload} className="download-button">
            <p>
              <img src={images.IconEdit3} alt="" />
              자료 (1건)
            </p>
            <div>
              <button>
                <img src={images.IconDownload2} alt="" />
                <div>
                  <strong>마케팅 전략 다운로드</strong>
                  <span>1.8 MB · Download</span>
                </div>
              </button>
            </div>
          </DownloadButton> */}
        </KPIWrap>
      </Wrap>
      )}
    </>
  );
};

export default OrganismGrowthHackerKPI;

const Wrap = styled.div`
  position:relative;
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
      line-height:1.5;

      span {
        width:12px;
        height:12px;
        font-size:0.63rem;
        font-weight:700;
        line-height:1.1;
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

const UlList = styled.ul`
  display:flex;
  flex-direction:column;
  gap:16px;
  padding:16px;
  border-radius:10px;
  background:${palette.gray50};

  li {
    display:flex;
    gap:8px;
    font-size:0.88rem;
    font-weight:400;
    color:${palette.gray700};

    span {
      width:20px;
      height:20px;
      display:flex;
      align-items:center;
      justify-content:center;
      flex-shrink:0;
      font-size:0.88rem;
      margin-top:2px;
      border-radius:50%;
      border:1px solid ${palette.gray700};
    }
  }
`;

const KPIWrap = styled.div`
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
    margin-bottom:16px;

    span {
      font-size:0.88rem;
      font-weight:500;
      color:${palette.gray500};
    }
  }
`;

const Progress = styled.div`
  width: 100%;
  padding: 20px;

  .progress-container {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 57px 0 0;
    cursor: pointer;
  }

  .step {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex:1;
    width: 100%;
  }

  .step:nth-child(1) .bar {
    border-radius:10px 0 0 10px;
  }

  .step:nth-child(5) .bar {
    border-radius:0 10px 10px 0;
  }

  .step:nth-child(5) .bar.current:after {
    width:100%;
  }


  .bar {
    position: relative;
    width: 100%;
    height: 7px;
    background-color: #E0E4EB;
    overflow:hidden;
  }

  .bar.completed {
    width:100%;

    &:after {
      position:absolute;
      left:0;
      top:0;
      width:100%;
      height:100%;
      background-color:${palette.primary};
      content:'';
    }
  }

  .bar.current {
    background-color:#E0E4EB;

    &:after {
      position: absolute;
      left: 0;
      top: 0;
      width: 50%;
      height: 100%;
      background-color: ${palette.primary}; /* 활성화된 색상 */
      content: '';
    }
  }

  .label {
    font-size:0.88rem;
    color: ${palette.gray500};
    margin-top: 12px;
  }

  .handle {
    position: absolute;
    bottom: 27px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border:1px solid ${palette.white};
    box-shadow:2px 2px 8px rgba(34,111,255,.5);
    background-color:${palette.primary};
    cursor: pointer;
    pointer-events: none;
    display:flex;
    align-items:center;
    justify-content: center;

    span {
      position:absolute;
      bottom:37px;
      left:50%;
      transform:translateX(-50%);
      min-width:57px;
      font-size:0.88rem;
      color:${palette.white};
      padding:8px;
      border-radius:15px;
      background:${palette.primary};
      box-shadow:2px 2px 8px rgba(34, 111, 255, .5);

      &:before {
        position:absolute;
        top:25px;
        left:50%;
        transform:translateX(-50%);
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 14px 7px 0px 7px;
        border-color: ${palette.primary} transparent transparent transparent;
        content:'';
      }
    }

    img {
      width:6px;
      height:5px;
    }
  }
`;

const Content = styled.div`
  display:flex;
  flex-direction:column;
  gap:8px;
  font-size:0.88rem;
  color:${palette.gray800};
  line-height:1.3;
  text-align:left;
  margin-top: 10px;
  padding-top:20px;
  border-top:1px solid ${palette.lineGray};

  span {
    font-weight:500;
    color:${palette.gray500};
  }
`;

const DownloadButton = styled.div`
  display:flex;
  flex-direction:column;
  gap:8px;

  p {
    display:flex;
    align-items:center;
    gap:8px;
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray500};
    line-height:22px;
  }

  div {
    display:flex;
    gap:12px;
  }

  button {
    display:flex;
    align-items:center;
    gap:8px;
    padding:6px 8px;
    border-radius:6px;
    border:1px solid ${palette.lineGray};
    background:${palette.white};
    font-family: 'Pretendard';

    div {
      display:flex;
      flex-direction:column;
      gap:4px;
      min-width:160px;
      text-align:left;
    }

    strong {
      font-size:0.88rem;
      font-weight:400;
      color:${palette.gray800};
    }

    span {
      font-size:0.88rem;
      color:${palette.gray500};
    }
  }
`;

const DownloadPopup = styled.div`
  position: absolute;
  bottom:20px;
  max-width: 288px;
  width: 100%;
  max-height: 400px; /* 팝업의 최대 높이를 적절히 설정 */
  overflow-y: auto; /* 내용이 많을 경우 스크롤 가능하게 설정 */
  padding: ${(props) => (props.isAutoSaveToggle ? "0" : "24px 20px 20px")};
  border-radius: 15px;
  background: ${palette.white};
  box-shadow: 0 4px 28px rgba(0, 0, 0, 0.05);
  visibility: ${(props) => (props.isAutoSaveToggle ? "hidden" : "visible")};
  opacity: ${(props) => (props.isAutoSaveToggle ? "0" : "1")};
  transition: opacity 0.3s ease, visibility 0.3s ease; /* 트랜지션 추가 */
  z-index: 99;

  .close {
    position:absolute;
    right:20px;
    top:20px;
    width:12px;
    height:12px;
    cursor:pointer;

    &:before, &:after {
      position:absolute;
      top:50%;
      left:50%;
      width:2px;
      height:100%;
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

  &:before {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0px 20px 12px 20px;
    border-color: transparent transparent ${palette.white} transparent;
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.2));
    // content: "";
    z-index: 0;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align:left;
  }

  h3 {
    font-size: 0.88rem;
    font-weight: 600;
    color: ${palette.gray800};
  }

  label {
    font-size: 0.88rem;
    color: ${palette.gray};
  }

  select {
    margin-left: 10px;
    padding: 5px;
    border-radius: 5px;
  }

  button {
    width: 100%;
    font-family: Pretendard, Poppins;
    font-size: 0.88rem;
    color: ${palette.white};
    margin-top: 16px;
    padding: 15px 0;
    border-radius: 8px;
    border: none;
    background-color: ${palette.blue};
    cursor: pointer;

    &:disabled {
      background-color: ${palette.lineGray};
      cursor: not-allowed;
    }
  }
`;

const SelectBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SelectBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    min-width: 120px;
    font-size: 0.88rem;
    text-align: center;
    color: ${palette.gray700};
    padding: 13px 0;
    border-radius: 10px;
    border: 1px solid ${palette.gray100};
    cursor: pointer;
    transition: all 0.5s;

    img {
      width: 40px;
      height: 40px;
    }

    &.selected {
      font-weight: 700;
      color: ${palette.gray800};
      border: 1px solid ${palette.blue};
      background: rgba(4, 83, 244, 0.05);
    }
  }
  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .disabled img {
    filter: grayscale(100%);
  }

  .disabled span {
    color: ${palette.gray300};
  }
`;