import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import {
  SkeletonTitle,
  SkeletonLine,
} from "../../../../assets/styles/Skeleton";

import MoleculeReportController from "../molecules/MoleculeReportController";
import { useSaveConversation } from "../atoms/AtomSaveConversation";
import axios from "axios";
import {  InterviewXExpertReportRequest } from "../../../../utils/indexedDB";
import {
  SELECTED_EXPERT_INDEX,
  STRATEGY_REPORT_DATA, // Updated import
  SELECTED_TAB_COPY,
  EXPERT_BUTTON_STATE,
  CONVERSATION,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  IS_LOADING,
  IS_EDITING_NOW,
  CONVERSATION_STAGE,
  CONVERSATION_ID,
  IS_LOGGED_IN,
} from "../../../AtomStates";

const OrganismStrategyReportSection = ({ expertIndex }) => {
  const { saveConversation } = useSaveConversation();
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedTabCopy, setSelectedTabCopy] = useAtom(SELECTED_TAB_COPY);
  const [selectedTab, setSelectedTab] = useState(0); // 선택된 보고서 탭 상태관리
  const [tabs, setTabs] = useState([]);
  const [sections, setSections] = useState([]);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };
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
  const [expertButtonState, setExpertButtonState] =
    useAtom(EXPERT_BUTTON_STATE); // BUTTON_STATE 사용

  // Use the single strategyReportData atom
  const [strategyReportData, setStrategyReportData] =
    useAtom(STRATEGY_REPORT_DATA);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);

  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };

  const [isLoadingExpert, setIsLoadingExpert] = useState(false);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);

  useEffect(() => {
    const loadData = async () => {
      let finalResponse;

      try {
        const currentExpertData = strategyReportData[expertIndex];

        // Existing data handling
        if (currentExpertData && Object.keys(currentExpertData).length > 0) {
          setTabs(currentExpertData.tabs);
          setSections(currentExpertData.tabs[selectedTab].sections);
        }
        // buttonState === 1일 때만 API 호출
        else if (expertButtonState === 1) {
          setExpertButtonState(0); // 버튼 상태를 초기화
          setIsLoadingExpert(true);
          setIsLoading(true);
          setIsEditingNow(false); // 수정 상태 초기화

          const data = {
            expert_id: selectedExpertIndex,
            business_info: titleOfBusinessInfo, // DB에서 가져온 titleOfBusinessInfo 사용
            business_analysis_data: {
              명칭: analysisReportData.title,
              주요_목적_및_특징: analysisReportData.mainFeatures,
              주요기능: analysisReportData.mainCharacter,
              목표고객: analysisReportData.mainCustomer,
            },
            tabs: [],
            page_index: 1,
          };

          // let response1 = await axios.post(
          //   "https://wishresearch.kr/panels/expert",
          //   data,
          //   axiosConfig
          // );
          let response1= await InterviewXExpertReportRequest(
            data,
            isLoggedIn
          );

          // while (true) {
          //   if (!response1.data["tabs"][0].hasOwnProperty("title")) {
          //     response1 = await axios.post(
          //       "https://wishresearch.kr/panels/expert",
          //       data,
          //       axiosConfig
          //     );
          //   } else {
          //     break;
          //   }
          // }
           // finalResponse = response1.data;

          while (true) {
            if (!response1.response["tabs"][0].hasOwnProperty("title")) {
              response1= await InterviewXExpertReportRequest(
                data,
                isLoggedIn
              );
            } else {
              break;
            }
          }
          finalResponse = response1.response;

         
          // // console.log(finalResponse);

          // if (finalResponse.total_page_index === 2) {
          //   let response2 = await axios.post(
          //     "https://wishresearch.kr/panels/expert",
          //     finalResponse,
          //     axiosConfig
          //   );
          //   while (true) {
          //     if (!response2.data["tabs"][1].hasOwnProperty("title")) {
          //       response2 = await axios.post(
          //         "https://wishresearch.kr/panels/expert",
          //         finalResponse,
          //         axiosConfig
          //       );
          //     } else {
          //       break;
          //     }
          //   }
          //   finalResponse = response2.data;
          //   // console.log(finalResponse);
          // } else if (finalResponse.total_page_index === 3) {
          //   let response2 = await axios.post(
          //     "https://wishresearch.kr/panels/expert",
          //     finalResponse,
          //     axiosConfig
          //   );
          //   while (true) {
          //     if (!response2.data["tabs"][1].hasOwnProperty("title")) {
          //       response2 = await axios.post(
          //         "https://wishresearch.kr/panels/expert",
          //         finalResponse,
          //         axiosConfig
          //       );
          //     } else {
          //       break;
          //     }
          //   }
          //   let response3 = await axios.post(
          //     "https://wishresearch.kr/panels/expert",
          //     response2.data,
          //     axiosConfig
          //   );
          //   while (true) {
          //     if (!response3.data["tabs"][2].hasOwnProperty("title")) {
          //       response3 = await axios.post(
          //         "https://wishresearch.kr/panels/expert",
          //         response2.data,
          //         axiosConfig
          //       );
          //     } else {
          //       break;
          //     }
          //   }
          //   finalResponse = response3.data;
          //   // console.log(finalResponse);
          // }

          if (finalResponse.total_page_index === 2) {
            let response2 = await  InterviewXExpertReportRequest(
              finalResponse,
              isLoggedIn // isLoggedIn 변수를 추가해야 할 수 있습니다.
            );
            while (true) {
              if (!response2.response["tabs"][1].hasOwnProperty("title")) {
                response2 = await  InterviewXExpertReportRequest(
                  finalResponse,
                  isLoggedIn
                );
              } else {
                break;
              }
            }
            finalResponse = response2.response;
            // console.log(finalResponse);
          } else if (finalResponse.total_page_index === 3) {
            let response2 = await  InterviewXExpertReportRequest(
              finalResponse,
              isLoggedIn
            );
            while (true) {
              if (!response2.response["tabs"][1].hasOwnProperty("title")) {
                response2 = await InterviewXExpertReportRequest(
                  finalResponse,
                  isLoggedIn
                );
              } else {
                break;
              }
            }
            let response3 = await InterviewXExpertReportRequest(
              response2.response,
              isLoggedIn
            );
            while (true) {
              if (!response3.response["tabs"][2].hasOwnProperty("title")) {
                response3 = await InterviewXExpertReportRequest(
                  response2.response,
                  isLoggedIn
                );
              } else {
                break;
              }
            }
            finalResponse = response3.response;
            // console.log(finalResponse);
          }

          const strategyData = finalResponse;

          // Update the strategyReportData atom
          setStrategyReportData((prevData) => ({
            ...prevData,
            [expertIndex]: strategyData,
          }));
          // 바로 저장할 데이터
          const updatedStrategyReportData = {
            ...strategyReportData,
            [expertIndex]: strategyData, // 새로운 데이터를 추가한 객체를 바로 생성
          };
          setTabs(strategyData.tabs);
          setSections(strategyData.tabs[selectedTab].sections);

          setIsLoadingExpert(false);
          setIsLoading(false);

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

          setConversation(updatedConversation);
          setConversationStage(3);

          await saveConversation({
            changingConversation: {
              conversation: updatedConversation,
              conversationStage: 3,
              strategyReportData: updatedStrategyReportData,
            },
          });
        }
      } catch (error) {
      //  console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [conversationId, selectedTab, expertIndex, expertButtonState]); // buttonState 의존성 추가

  const handleTabClick = (index, expertIndex) => {
    setSelectedTab(index);
    setSelectedTabCopy((prevState) => ({
      ...prevState,
      [expertIndex]: index,
    }));
  };

  return (
    <>
      <AnalysisSection Strategy>
        {isLoadingExpert ? (
          <>
            <SkeletonTitle className="title-placeholder" />
            <SkeletonLine className="content-placeholder" />
            <SkeletonLine className="content-placeholder" />
            <Spacing /> {/* 제목과 본문 사이에 간격 추가 */}
            <SkeletonTitle className="title-placeholder" />
            <SkeletonLine className="content-placeholder" />
            <SkeletonLine className="content-placeholder" />
            <Spacing /> {/* 제목과 본문 사이에 간격 추가 */}
            <SkeletonTitle className="title-placeholder" />
            <SkeletonLine className="content-placeholder" />
            <SkeletonLine className="content-placeholder" />
          </>
        ) : (
          <>
            <TabHeader>
              {tabs &&
                tabs.length > 0 &&
                tabs.map((tab, index) => (
                  <TabButton
                    key={index}
                    active={selectedTab === index}
                    expertIndex={expertIndex}
                    onClick={() => handleTabClick(index, expertIndex)}
                  >
                    {expertIndex === "3" && index === 1
                      ? "고객 경험 최적화 방법 제시"
                      : tab.title}
                  </TabButton>
                ))}
            </TabHeader>

            {sections?.map((section, index) => (
              <Section
                key={index}
                title={section.title}
                title_text={section.text}
                content={section.content}
                isLast={index === sections.length - 1}
                expertIndex={expertIndex}
                selectedTab={selectedTab}
              />
            ))}
          </>
        )}

        {!isLoadingExpert && (
          <MoleculeReportController
            reportIndex={1}
            strategyReportID={expertIndex}
            sampleData={strategyReportData[expertIndex]}
          />
        )}
      </AnalysisSection>
    </>
  );
};

const Section = ({
  title,
  title_text,
  content,
  isLast,
  expertIndex,
  selectedTab,
}) => {
  // 서브 타이틀이 있는 항목과 없는 항목을 분리
  const subTitleItems = content.filter((item) => item.subTitle);
  const nonSubTitleItems = content.filter((item) => !item.subTitle);
  const summaryItem = content.find((item) => item.title === "총평");
  const subItems = content.filter((item) => item.subTitle);
  // subText에서 ':'로 분리하여 subTitle과 text를 따로 처리
  const splitText = (text) => {
    const [subTitle, ...rest] = text.split(":");
    return {
      subTitle: subTitle.trim(), // ':' 앞부분
      text: rest.join(":").trim(), // ':' 뒷부분
    };
  };

  // 기존 subTitle과 text를 합쳐 새로운 text 생성

  return (
    <BoxWrap
      expertIndex={expertIndex}
      isLast={isLast}
      selectedTab={selectedTab}
      title={title}
    >
      {/* "주요 차별화 요소"와 "차별화 전략 제안" 데이터를 결합하여 한 번만 렌더링 */}
      {/* 3번 전문가의 2번째 탭을 위한 조건 */}
      {expertIndex === "3" && selectedTab === 1 ? (
        <>
          <strong>
            <img src={images.Check} alt="" />
            {title}
          </strong>
          {nonSubTitleItems.length > 0 &&
            nonSubTitleItems.map((item, index) => (
              <div key={index}>
                <p>{item.text}</p>
              </div>
            ))}

          {/* subTitleItems는 DynamicGrid 스타일을 적용 */}
          {subTitleItems.length > 0 &&
            subTitleItems.map((item, index) => (
              <SubTextBox key={index}>
                <SubTitle style={{ marginBottom: "5px" }}>
                  {item.subTitle}
                </SubTitle>
                <p className="dashedLine">{item.text}</p>
              </SubTextBox>
            ))}
        </>
      ) : (
        <>
          {/* title 표시 (특정 타이틀 제외) */}
          {!isLast &&
            title &&
            !(
              title === "주요 차별화 요소" ||
              title === "차별화 전략 제안" ||
              title === "제안 사항" ||
              title === "경쟁 압박 대처 방안" ||
              title === "브랜드 전략분석" ||
              title === "브랜드 아이덴티티" ||
              title === "소비자 인식 관리 방안" ||
              title === "브랜드 신뢰도 구축 방안" ||
              title === "경쟁사 분석 및 차별화 전략" ||
              title === "고객 니즈 및 세분화 분석" ||
              title === "고객 여정 맵핑" ||
              title === "고객 여정 맵핑 터치포인트 단계 최적화 방안" ||
              title === "시장 위치 평가 및 경쟁자 분석" ||
              title === "장기적인 경쟁 우위 전략"
            ) && (
              <>
                <strong>
                  <img src={images.Check} alt="" />
                  {title}
                </strong>
              </>
            )}

          {title === "제안 사항" && (
            <>
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>
              {/* subTitle : text 형태로 넘버링 추가하여 출력 */}
              {content.map((item, index) => (
                <div key={index} style={{ marginTop: "3px" }}>
                  {" "}
                  {/* 각 요소에 마진 추가 */}
                  <p>
                    {index + 1}. {item.subTitle} : {item.text}
                  </p>
                </div>
              ))}
            </>
          )}

          {title === "브랜드 전략분석" && (
            <>
              {/* 제목과 총평 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {summaryItem && (
                <p style={{ marginBottom: "15px" }}>{summaryItem.text}</p> // 총평 텍스트를 제목 밑에 표시
              )}

              {/* subTitle : text 형태로 하얀 박스 안에 출력 */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {title === "브랜드 아이덴티티" && (
            <>
              {/* 제목과 총평 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {summaryItem && (
                <p style={{ marginBottom: "15px" }}>{summaryItem.text}</p> // 총평 텍스트를 제목 밑에 표시
              )}

              {/* subTitle : text 형태로 하얀 박스 안에 출력 */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {title === "경쟁사 분석 및 차별화 전략" && (
            <>
              {/* 제목과 총평 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {/* 총평 항목 필터링 */}
              {content
                .filter(
                  (item) => item.title === "경쟁사 분석 및 차별화 전략 설명"
                )
                .map((summaryItem, index) => (
                  <p key={index} style={{ marginBottom: "15px" }}>
                    {summaryItem.text} {/* 총평 텍스트를 제목 밑에 표시 */}
                  </p>
                ))}

              {/* subTitle : text 형태로 하얀 박스 안에 출력 */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {title === "고객 니즈 및 세분화 분석" && (
            <>
              {/* 제목과 총평 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {/* 총평 항목 필터링 */}
              {content
                .filter((item) => item.title === "고객 니즈 분석")
                .map((summaryItem, index) => (
                  <p key={index} style={{ marginBottom: "15px" }}>
                    {summaryItem.text} {/* 총평 텍스트를 제목 밑에 표시 */}
                  </p>
                ))}

              {/* subTitle : text 형태로 하얀 박스 안에 출력 */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {title === "고객 여정 맵핑" && (
            <>
              {/* 제목과 총평 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {/* 총평 항목 필터링 */}
              {content
                .filter((item) => item.title === "고객 여정 맵핑")
                .map((summaryItem, index) => (
                  <p key={index} style={{ marginBottom: "15px" }}>
                    {summaryItem.text} {/* 총평 텍스트를 제목 밑에 표시 */}
                  </p>
                ))}

              {/* subTitle : text 형태로 하얀 박스 안에 출력 */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {title === "브랜드 신뢰도 구축 방안" && (
            <>
              {/* 제목 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {/* subTitle : text 형태로 기본 박스 안에 출력 */}
              {/* <div style={{ padding: "15px", borderRadius: "10px" }}> */}
              <div>
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {title === "소비자 인식 관리 방안" && (
            <>
              {/* 제목 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {/* subTitle : text 형태로 기본 박스 안에 출력 */}
              {/* <div style={{ padding: "15px", borderRadius: "10px" }}> */}
              <div>
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* "시장 위치 평가 및 경쟁자 분석"일 때 별도의 처리 */}
          {title === "시장 위치 평가 및 경쟁자 분석" && (
            <>
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>
              {nonSubTitleItems.length > 0 && <p>{nonSubTitleItems[0].text}</p>}

              <BgStyledSection>
                <div className="flexBox">
                  {subTitleItems.map((item, index) => (
                    <div className="bgWhite" key={index}>
                      <strong className="title">
                        {/* 번호 표시를 위한 span.number */}
                        <span className="number">{index + 1}</span>
                        {item.subTitle}
                      </strong>
                      <ul>
                        {item.subText1 && (
                          <li className="dashedLine">
                            {item.subText1.startsWith("강점:")
                              ? item.subText1
                              : `강점: ${item.subText1}`}
                          </li>
                        )}
                        {item.subText2 && (
                          <li className="dashedLine">
                            {item.subText2.startsWith("약점:")
                              ? item.subText2
                              : `약점: ${item.subText2}`}
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </BgStyledSection>
            </>
          )}

          {title === "고객 여정 맵핑 터치포인트 단계 최적화 방안" && (
            <BgStyledSection>
              <h4>
                <img src={images.Check} alt="" />
                {title}
              </h4>

              <div className="flexBox">
                {content.map((item, index) => (
                  <div className="bgWhite" key={index}>
                    <strong className="title">
                      {/* 번호 표시를 위한 span.number */}
                      <span className="number">{index + 1}</span>
                      {item.subTitle}
                    </strong>
                    <p>{item.text}</p> {/* text 필드에서 데이터 출력 */}
                  </div>
                ))}
              </div>
            </BgStyledSection>
          )}

          {(title === "경쟁사 대비 차별화 전략" ||
            title === "시장 내 경쟁 우위 확보 방안" ||
            title === "주요 타겟층 특징" ||
            title === "콘텐츠 및 마케팅 전략") && (
            <>
              {title_text && <p>{title_text}</p>}

              <DoubleGrid columns={2} style={{ padding: "0" }}>
                {" "}
                {/* 2개의 컬럼을 생성하여 가로로 나열 */}
                {content.map((section, sectionIndex) => (
                  <SectionWrapper key={sectionIndex}>
                    {" "}
                    {/* 각 섹션을 감싸는 div */}
                    {/* section.title 출력 */}
                    <SubTitle>{section.title}</SubTitle>
                    {/* subContent를 하나의 DynamicGrid 안에서 출력 */}
                    {section.subContent.map((item, itemIndex) => (
                      <div key={itemIndex} style={{ marginBottom: "0" }}>
                        <p className="dashedLine">
                          {item.subTitle} : {item.text}
                        </p>
                      </div>
                    ))}
                  </SectionWrapper>
                ))}
              </DoubleGrid>
            </>
          )}

          {/* "특징" 또는 "차별화 요소" 섹션을 처리 */}
          {(title === "특징" || title === "차별화 요소") &&
            subTitleItems.length > 0 && (
              <>
                {subTitleItems.map((item, index) => (
                  <SeparateSection key={index}>
                    <SectionWrapper_2>
                      <strong>
                        <span className="number">{index + 1}</span>{" "}
                        {/* 번호 추가 */}
                        <strong_title>{`${title} : ${item.subTitle}`}</strong_title>{" "}
                        {/* 이 부분만 bold 처리 */}
                      </strong>
                      <p>{item.text}</p>

                      {/* subContent가 존재하는 경우 */}
                      {item.subContent && item.subContent.length > 0 ? (
                        <NumDynamicGrid columns={2}>
                          {item.subContent[0] && (
                            <div>
                              <SubTitle>{item.subContent[0].subTitle}</SubTitle>
                              <p>{item.subContent[0].text}</p>
                            </div>
                          )}
                          {item.subContent[1] && (
                            <div>
                              <SubTitle>{item.subContent[1].subTitle}</SubTitle>
                              <p>{item.subContent[1].text}</p>
                            </div>
                          )}
                          {item.subContent[2] && (
                            <div>
                              <SubTitle>{item.subContent[2].subTitle}</SubTitle>
                              <p>{item.subContent[2].text}</p>
                            </div>
                          )}
                        </NumDynamicGrid>
                      ) : (
                        // subContent가 없을 경우 아래 섹션 적용
                        <NumDynamicGrid columns={2}>
                          {item.subText1 && (
                            <div>
                              <SubTitle>
                                {splitText(item.subText1).subTitle}
                              </SubTitle>
                              <p>{splitText(item.subText1).text}</p>
                            </div>
                          )}
                          {item.subText2 && (
                            <div>
                              <SubTitle>
                                {splitText(item.subText2).subTitle}
                              </SubTitle>
                              <p>{splitText(item.subText2).text}</p>
                            </div>
                          )}
                          {item.subText3 && (
                            <div>
                              <SubTitle>
                                {splitText(item.subText3).subTitle}
                              </SubTitle>
                              <p>{splitText(item.subText3).text}</p>
                            </div>
                          )}
                        </NumDynamicGrid>
                      )}
                    </SectionWrapper_2>
                  </SeparateSection>
                ))}
              </>
            )}

          {/* "특징", "차별화 요소", "경쟁 분석"이 아닌 경우 기존 방식대로 처리 */}
          {title !== "특징" &&
            title !== "차별화 요소" &&
            title !== "제안 사항" &&
            title !== "시장 위치 평가 및 경쟁자 분석" &&
            title !== "주요 차별화 요소" &&
            title !== "브랜드 전략분석" &&
            title !== "브랜드 아이덴티티" &&
            title !== "브랜드 신뢰도 구축 방안" &&
            title !== "소비자 인식 관리 방안" &&
            title !== "차별화 전략 제안" &&
            title !== "경쟁사 분석 및 차별화 전략" &&
            title !== "고객 니즈 및 세분화 분석" &&
            title !== "고객 여정 맵핑" &&
            title !== "고객 여정 맵핑 터치포인트 단계 최적화 방안" &&
            title !== "경쟁사 대비 차별화 전략" &&
            title !== "경쟁 압박 대처 방안" &&
            title !== "장기적인 경쟁 우위 전략" && (
              <>
                {/* nonSubTitleItems는 일반적으로 title과 text만 표시 */}

                {nonSubTitleItems.length > 0 &&
                  nonSubTitleItems.map((item, index) => (
                    <>
                      <div key={index}>
                        <p>{item.text}</p>
                        {item.subText1 && (
                          <SubTextBox>{item.subText1}</SubTextBox>
                        )}
                        {item.subText2 && (
                          <SubTextBox>{item.subText2}</SubTextBox>
                        )}
                        {item.subText3 && (
                          <SubTextBox>{item.subText3}</SubTextBox>
                        )}
                      </div>
                    </>
                  ))}

                {/* subTitleItems는 DynamicGrid 스타일을 적용 */}
                {subTitleItems.length > 0 && (
                  <>
                    <DynamicGrid columns={subTitleItems.length}>
                      {subTitleItems.map((item, index) => (
                        <div key={index}>
                          <SubTitle>{item.subTitle}</SubTitle>
                          <p>{item.text}</p>
                          {item.subText1 && (
                            <SubTextBox>{item.subText1}</SubTextBox>
                          )}
                          {item.subText2 && (
                            <SubTextBox>{item.subText2}</SubTextBox>
                          )}
                          {item.subText3 && (
                            <SubTextBox>{item.subText3}</SubTextBox>
                          )}
                        </div>
                      ))}
                    </DynamicGrid>
                  </>
                )}
              </>
            )}
        </>
      )}
    </BoxWrap>
  );
};

export default OrganismStrategyReportSection;
const SeparateSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  padding: 20px;
  border-radius: 10px;
  background: ${palette.chatGray};

  + div {
    margin-top: 12px;
  }

  h4 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  span.number {
    width: 15px;
    height: 15px;
    font-size: 0.63rem;
    color: ${palette.blue};
    line-height: 15px;
    text-align: center;
    border: 1px solid ${palette.blue};
  }

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    font-size: 0.875rem;
    font-weight: 400;
    color: ${palette.darkGray};
  }

  strong_title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
    font-weight: 700;
    color: ${palette.darkGray};
  }

  p {
    font-size: 0.875rem;
    font-weight: 400;
    color: ${palette.darkGray};
    line-height: 1.5;
  }

  .flexBox {
    display: flex;
    gap: 12px;
    margin-top: 12px;

    > div {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid ${palette.lineGray};

      p {
        overflow: visible;
        // text-overflow: ellipsis;
        display: flex;
        // -webkit-line-clamp: 3;
        // -webkit-box-orient: vertical;
      }
    }

    .bgWhite {
      margin-top: 0 !important;
    }
  }

  .bgWhite {
    padding: 15px !important;
    margin-top: 12px;
    border-radius: 10px;
    border: 1px solid ${palette.white} !important;
    background: ${palette.white};

    .title {
      color: ${palette.black};
      font-weight: 700;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 5px;

    li {
      position: relative;
      font-size: 0.875rem;
      color: ${palette.darkGray};
      line-height: 1.5;
      padding-left: 13px;

      &:before {
        position: absolute;
        top: 8px;
        left: 0;
        width: 5px;
        height: 1px;
        background: ${palette.black};
        content: "";
      }
    }
  }
`;

const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const AnalysisSection = styled.div`
  position: relative;
  max-width: 1135px;
  // width: 91.5%;
  text-align: left;
  margin-top: 25px;
  margin-left: 50px;
  padding: 28px;
  border-radius: 15px;
  border: 1px solid ${palette.outlineGray};

  h1 {
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 20px;
  }

  > p {
    font-size: 0.875rem;
    line-height: 1.5;
    margin-top: 15px;

    span {
      color: ${palette.red};
    }
  }
`;

const BoxWrap = styled.div`
  padding: ${(props) =>
    props.title === "특징" || props.title === "차별화 요소"
      ? "0"
      : props.isLast
      ? "0"
      : "20px"};

  border-radius: 10px;
  background: ${(props) =>
    props.title === "특징" || props.title === "차별화 요소"
      ? palette.white
      : props.isLast
      ? palette.white
      : palette.chatGray};

  + div {
    margin-top: 12px;
  }

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    color: ${(props) =>
      props.expertIndex === "1"
        ? palette.darkGray // 1번 전문가일 때 글자색 파란색
        : props.expertIndex === "2"
        ? palette.darkGray // 2번 전문가일 때 글자색 빨간색
        : palette.darkGray}; // 3번 전문가일 때 글자색 녹색
  }

  p {
    font-size: 0.875rem;
    color: ${(props) =>
      props.expertIndex === "1"
        ? palette.darkGray
        : props.expertIndex === "2"
        ? palette.darkGray
        : palette.darkGray};
    line-height: 1.5;
    word-wrap: break-word; /* 단어가 긴 경우 자동 줄바꿈 */
    overflow: visible; /* 내용이 넘치면 자동으로 박스가 확장됨 */
    height: auto; /* 박스의 높이가 내용에 맞춰 자동으로 조정 */
  }

  .dashedLine {
    position: relative;
    padding-left: 12px;

    &:before {
      position: absolute;
      left: 0;
      // top:10px;
      top: 0;
      // width:5px;
      // height:1px;
      // background:${palette.darkGray};
      content: "-";
    }
  }

  /* 마지막 섹션일 경우 title을 숨기고, 내부 텍스트만 보이도록 */
  ${(props) =>
    props.isLast &&
    `
    strong {
      display: none;
    }
  `}
`;

const TabHeader = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
`;

// color: ${(props) => (props.active ? palette.black : palette.lightGray)};

const TabButton = styled.button`
  font-family: "Pretendard", "Poppins";
  font-size: 1.25rem;
  font-weight: 400;

  color: ${(props) =>
    props.active
      ? palette.black
      : props.expertIndex === "1"
      ? `rgba(0,0,0,.2)` // 1번 전문가일 때
      : props.expertIndex === "2"
      ? `rgba(0,0,0,.2)` // 2번 전문가일 때
      : `rgba(0,0,0,.2)`}; // 3번 전문가일 때
  border: none;
  border-bottom: ${(props) =>
    props.active ? `1px solid ${palette.black}` : "none"};
  background: ${palette.white};
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    color: ${palette.black};
  }

  &:focus {
    outline: none;
  }
`;

// DynamicGrid로 그리드 컬럼의 갯수를 서브 타이틀 갯수에 맞춰 동적으로 설정
const DynamicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: 10px;
  margin-top: 10px;

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
  }

  p {
    height: 64px;
    margin: 0;
    // overflow: hidden;
    // text-overflow: ellipsis;
    display: flex;
    // -webkit-line-clamp: 3;
    // -webkit-box-orient: vertical;
    overflow-y: auto;
  }
`;

const SubTitle = styled.strong`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${palette.lightGray} !important;
  text-align: left;
  margin-bottom: 0;
`;

const SubTextBox = styled.div`
  background: ${palette.white};
  padding: 16px;
  border-radius: 10px;
  margin-top: 10px;
  font-size: 0.875rem;
  color: ${palette.gray};
  border: 0 !important;
`;

const Spacing = styled.div`
  margin-bottom: 40px; /* 제목과 본문 사이의 간격 */
`;
const NumDynamicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.columns},
    1fr
  ); /* 동적 컬럼 수 설정 */
  gap: 10px;
  margin-top: 10px;

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
    position: relative; /* 번호 표시를 위한 상대적 위치 */

    /* 각 div 내에서 번호를 표시하는 span.number */
    span.number {
      width: 20px;
      height: 20px;
      font-size: 0.75rem;
      color: ${palette.blue};
      line-height: 20px;
      text-align: center;
      border: 1px solid ${palette.blue};
      position: absolute;
      top: -10px;
      left: -10px;
      background-color: ${palette.white}; /* 번호 배경색 */
      border-radius: 50%;
    }
  }

  p {
    height: 64px;
    margin: 0;
    font-size: 0.875rem;
    font-weight: 400;
    color: ${palette.darkGray};
    line-height: 1.5;
    word-wrap: break-word;
    display: flex;
    // -webkit-line-clamp: 3 ;
    // -webkit-box-orient: vertical;
    // overflow: hidden;
    // text-overflow: ellipsis;
    overflow-y: auto;
  }
`;
const BgStyledSection = styled.div`
  display: flex;
  flex-direction: column;
  // padding: 20px;
  // border-radius: 10px;
  // background: rgba(0, 0, 0, 0);

  h4 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  .flexBox {
    display: flex;
    gap: 12px;
    margin-top: 12px;

    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px; /* BgBox와 동일하게 설정 */
      padding: 12px; /* BgBox와 동일하게 설정 */
      border-radius: 10px;
      border: 1px solid ${palette.lineGray};
      background-color: ${palette.white}; /* 하얀 배경 */

      .number {
        width: 15px; /* 크기를 BgBox와 동일하게 맞춤 */
        height: 15px;
        font-size: 0.63rem;
        color: ${palette.blue};
        line-height: 15px;
        text-align: center;
        border: 1px solid ${palette.blue};
        background-color: ${palette.white}; /* 번호 배경색 */
      }

      .title {
        color: ${palette.black};
        font-weight: 700;
        margin-bottom: 8px;
        font-size: 0.875rem;
      }

      ul {
        display: flex;
        flex-direction: column;
        gap: 5px;

        li {
          font-size: 0.875rem;
          color: ${palette.darkGray};
          line-height: 1.5;
          padding-left: 13px;

          &:before {
            position: absolute;
            top: 8px;
            left: 0;
            width: 5px;
            height: 1px;
            background: ${palette.black};
            content: "";
          }
        }
      }
    }

    .bgWhite {
      border: 0;
    }
  }
`;
const DoubleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: 10px;
  margin-top: 10px;
  padding: 12px; /* 가장 큰 div에 padding 적용 */
  border-radius: 10px;

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    /* 각 개별 div에서는 border를 제거 */
  }

  p {
    margin: 0;
    /* 텍스트가 생략되지 않도록 아래 스타일을 제거 */
    overflow: visible; /* 숨기지 않도록 */
    text-overflow: unset; /* 생략하지 않음 */
    display: block; /* 줄바꿈을 정상적으로 처리 */
  }
`;
const SectionWrapper = styled.div`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${palette.lineGray}; /* 각 section에만 border 적용 */
  margin-bottom: 10px; /* 섹션 간 간격 추가 */

  div {
    margin-bottom: 8px; /* subContent 간의 간격 */
  }
`;
const SectionWrapper_2 = styled.div`
  // padding: 12px;
  // border-radius: 10px;
  // border: 1px solid ${palette.lineGray};
`;
