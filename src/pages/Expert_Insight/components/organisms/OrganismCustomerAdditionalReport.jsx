import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  SELECTED_EXPERT_INDEX,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  CONVERSATION,
  APPROACH_PATH,
  IS_LOADING,
  POC_DETAIL_REPORT_DATA,
  CONVERSATION_STAGE,
  SELECTED_ADDITIONAL_KEYWORD,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  ADDITIONAL_REPORT_DATA,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  CUSTOMER_ADDITION_BUTTON_STATE,
  CUSTOMER_ADDITION_QUESTION_INPUT,
  SELECTED_EXPERT_LIST,
  CONVERSATION_ID,
  STRATEGY_REPORT_DATA,
  IS_LOGGED_IN,
  PROJECT_TOTAL_INFO,
} from "../../../AtomStates";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import MoleculeReportController from "../molecules/MoleculeReportController";
import { useSaveConversation } from "../atoms/AtomSaveConversation";
import axios from "axios";
import Loader from "../atoms/AtomLoader"
import {InterviewXCustomerAdditionalQuestionRequest } from "../../../../utils/indexedDB";

const OrganismCustomerAdditionalReport = ({
  customerAdditionalReportCount
}) => {
  const { saveConversation } = useSaveConversation();
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [selectedExpertList, setSelectedExpertList] =
    useAtom(SELECTED_EXPERT_LIST);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [approachPath] = useAtom(APPROACH_PATH);
  const [customerAdditionQuestionInput, setCustomerAdditionQuestionInput] = useAtom(
    CUSTOMER_ADDITION_QUESTION_INPUT
  );
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);

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
  const [customerAdditionButtonState, setCustomerAdditionButtonState] = useAtom(CUSTOMER_ADDITION_BUTTON_STATE);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(
    SELECTED_EXPERT_INDEX
  );
  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };
  const [strategyReportData, setStrategyReportData] = useAtom(STRATEGY_REPORT_DATA);

  const [title, setTitle] = useState([]);
  const [sections, setSections] = useState([]);
  const [answerData, setAnswerData] = useState("");
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  const [additionalReportData, setAdditionalReportData] = useAtom(
    ADDITIONAL_REPORT_DATA
  );
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(
    SELECTED_ADDITIONAL_KEYWORD
  );
  const [
    selectedCustomerAdditionalKeyword,
    setSelectedCustomerAdditionalKeyword,
  ] = useAtom(SELECTED_CUSTOMER_ADDITIONAL_KEYWORD);
  const [customerAdditionalReportData, setCustomerAdditionalReportData] =
    useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);

  const [advise, setAdvise] = useState(""); // 새로운 advise 상태 추가
  const [pocDetailReportData, setpocDetailReportData] = useAtom(POC_DETAIL_REPORT_DATA);

  const [projectTotalInfo, setProjectTotalInfo] = useAtom(PROJECT_TOTAL_INFO);

  useEffect(() => {
    const loadData = async () => {
      let answerData;
      try {

        setAnswerData(
          customerAdditionalReportData[customerAdditionalReportCount]
        );
        // 기존 데이터가 있을 때 처리
        if (customerAdditionalReportData[customerAdditionalReportCount]) {
          setTitle(
            customerAdditionalReportData[customerAdditionalReportCount]
              ?.title || []
          );
          setSections(
            customerAdditionalReportData[customerAdditionalReportCount]
              ?.sections || []
          );
          if (
            customerAdditionalReportData[customerAdditionalReportCount].advise
          ) {
            setAdvise(
              customerAdditionalReportData[customerAdditionalReportCount].advise
            ); // advise가 있을 경우 상태에 저장
          }
        } else if (customerAdditionButtonState === 1) {
          // 버튼 상태가 1일 때만 API 요청 실행
          setCustomerAdditionButtonState(0); // 버튼 상태 초기화
          setIsLoadingAdd(true);
          setIsLoading(true);

          const data = {
            business_info: titleOfBusinessInfo,
            business_analysis_data: {
              명칭: analysisReportData.title,
              주요_목적_및_특징: analysisReportData.mainFeatures,
              주요기능: analysisReportData.mainCharacter,
              목표고객: analysisReportData.mainCustomer,
            },
            question_info: customerAdditionQuestionInput,
            last_conversation: {
              user: selectedCustomerAdditionalKeyword,
              model: customerAdditionalReportData,
            }
          };

          // let response = await axios.post(
          //   "https://wishresearch.kr/panels/customer_add_question",
          //   data,
          //   axiosConfig
          // );
          // answerData = response.data.additional_question;

          let response = await InterviewXCustomerAdditionalQuestionRequest(
            data,
            isLoggedIn
          );
          answerData = response.response.additional_question;
          //response.data찾아볼것

          if (answerData.advise) {
            setAdvise(answerData.advise);
          } else {
            while (
              !answerData.hasOwnProperty("title")
            ) {
              response = await InterviewXCustomerAdditionalQuestionRequest(
            data,
            isLoggedIn
          );
          answerData = response.response.additional_question;
              // response = await axios.post(
              //   "https://wishresearch.kr/panels/customer_add_question",
              //   data,
              //   axiosConfig
              // );
              // answerData = response.data.additional_question;
            }
          }

          

          // 임시로 키워드 설정
          const updatedKeywords = [...selectedCustomerAdditionalKeyword];
          updatedKeywords.push(customerAdditionQuestionInput);
          setSelectedCustomerAdditionalKeyword(updatedKeywords);

          setAnswerData(answerData);
          setTitle(answerData?.title);
          setSections(answerData?.sections);

          let updatedAdditionalReportData = [];

          if (
            customerAdditionalReportCount === 0 ||
            customerAdditionalReportData.length === 0
          ) {
            updatedAdditionalReportData.push(answerData);
          } else {
            updatedAdditionalReportData = customerAdditionalReportData;
            updatedAdditionalReportData.push(answerData);
          }

          setCustomerAdditionalReportData(updatedAdditionalReportData);
          setIsLoadingAdd(false);
          setIsLoading(false);

          const updatedConversation2 = [...conversation];

          if (approachPath !== -1) {
            if (conversationStage === 2) {
              if (answerData.advise) {
                // advise 상태일 경우
                updatedConversation2.push({
                  type: "system",
                  message:
                    "사실, 저는 비즈니스 전문가이기 때문에 더 이상 구체적인 도움을 드리기 어려워요. 하지만 귀하가 비즈니스 관련 고민을 공유해주신다면, 저는 귀하께 더욱 도움을 줄 수 있어요!",
                  expertIndex: 0,
                });
              } else {
                // 일반적인 결과일 경우
                updatedConversation2.push(
                  {
                    type: "system",
                    message: `"${projectTotalInfo.projectTitle}"과 관련된 "${response.response.additional_question.title}" 분석 결과입니다.\n추가로 궁금한 점이 있으면 질문해 주세요 😊 분석 결과에 만족하신다면, 지금 바로 전략 보고서를 준비해드려요.`,
                    expertIndex: selectedExpertIndex,
                  },
                  { type: "reportButton" }
                );
              }
            } else if (conversationStage === 3) {
              if (answerData.advise) {
                // advise 상태일 경우
                updatedConversation2.push({
                  type: "system",
                  message:
                    "사실, 저는 비즈니스 전문가이기 때문에 더 이상 구체적인 도움을 드리기 어려워요. 하지만 귀하가 비즈니스 관련 고민을 공유해주신다면, 저는 귀하께 더욱 도움을 줄 수 있어요!",
                  expertIndex: 0,
                });
              } else {
                if (selectedExpertList.length === 3) {
                  updatedConversation2.push({
                    type: "system",
                    message: `"${projectTotalInfo.projectTitle}"과 관련된 "${response.response.additional_question.title}" 분석 결과입니다.\n추가로 궁금한 점이 있으면 질문해 주세요 😊`,
                    expertIndex: 0,
                  });
                } else {
                  updatedConversation2.push({
                    type: "system",
                    message: `"${projectTotalInfo.projectTitle}"과 관련된 "${response.response.additional_question.title}" 분석 결과입니다.\n추가로 궁금한 점이 있으면 질문해 주세요 😊 분야별 전문가의 의견도 확인해보세요`,
                    expertIndex: 0,
                  });
                }
                updatedConversation2.push({ type: "keyword" });
              }
            }
          } else if (approachPath !== 1) {
            if (conversationStage === 2) {
              if (answerData.advise) {
                // advise 상태일 경우
                updatedConversation2.push({
                  type: "system",
                  message:
                    "사실, 저는 비즈니스 전문가이기 때문에 더 이상 구체적인 도움을 드리기 어려워요. 하지만 귀하가 비즈니스 관련 고민을 공유해주신다면, 저는 귀하께 더욱 도움을 줄 수 있어요!",
                  expertIndex: 0,
                });
              } else {
                updatedConversation2.push({
                  type: "system",
                  message: `"${projectTotalInfo.projectTitle}"과 관련된 "${response.response.additional_question.title}" 분석 결과입니다.\n추가로 궁금한 점이 있으면 질문해 주세요 😊 분야별 전문가의 의견도 확인해보세요`,
                  expertIndex: 0,
                });
              }
            } else if (conversationStage === 3) {
              if (answerData.advise) {
                // advise 상태일 경우
                updatedConversation2.push({
                  type: "system",
                  message:
                    "사실, 저는 비즈니스 전문가이기 때문에 더 이상 구체적인 도움을 드리기 어려워요. 하지만 귀하가 비즈니스 관련 고민을 공유해주신다면, 저는 귀하께 더욱 도움을 줄 수 있어요!",
                  expertIndex: 0,
                });
              } else {
                if (selectedExpertList.length === 3) {
                  updatedConversation2.push({
                    type: "system",
                    message: `"${projectTotalInfo.projectTitle}"과 관련된 "${response.response.additional_question.title}" 분석 결과입니다.\n추가로 궁금한 점이 있으면 질문해 주세요 😊`,
                    expertIndex: 0,
                  });
                } else {
                  updatedConversation2.push({
                    type: "system",
                    message: `"${projectTotalInfo.projectTitle}"과 관련된 "${response.response.additional_question.title}" 분석 결과입니다.\n추가로 궁금한 점이 있으면 질문해 주세요 😊 분야별 전문가의 의견도 확인해보세요`,
                    expertIndex: 0,
                  });
                }
                updatedConversation2.push({ type: "keyword" });
              }
            }
          }

          setConversation(updatedConversation2);

          await saveConversation(
            { changingConversation: { conversation: updatedConversation2, customerAdditionalReportData: updatedAdditionalReportData, selectedCustomerAdditionalKeyword: updatedKeywords } }
          );
        }
      } catch (error) {
       // console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [
    conversationId,
    selectedCustomerAdditionalKeyword,
    customerAdditionButtonState, // buttonState 의존성 추가
  ]);

  // const [currentReport, setCurrentReport] = useState(null);

  // useEffect(() => {
  //   if (customerAdditionalReportData && customerAdditionalReportData[customerAdditionalReportCount]) {
  //     setCurrentReport(customerAdditionalReportData[customerAdditionalReportCount]);
  //   }
  // }, [customerAdditionalReportData, customerAdditionalReportCount]);

  if (answerData && answerData.advise) {
    return null;
  }

  return (
    <>
      {isLoadingAdd ? (
        <AnalysisSection Strategy style={{minWidth: "950px", minHeight: "532px", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Loader />
        </AnalysisSection>
      ) : (
        <AnalysisSection Strategy>
          {title && (
            <TabHeader>
              <TabTitle>{title}</TabTitle>
            </TabHeader>
          )}

          {sections?.map((section, index) => (
            <Section
              key={index}
              title={section.title}
              content={section.content}
              index={index - 1}
            />
          ))}

          {!isLoadingAdd && (
            <MoleculeReportController
              reportIndex={3}
              sampleData={answerData}
              additionalReportCount={customerAdditionalReportCount}
            />
          )}
        </AnalysisSection>
      )}
    </>
  );
};

// ... (아래 부분은 동일)

const Section = ({ title, content, index }) => {
  // 서브 타이틀이 있는 항목과 없는 항목을 분리
  const subTitleItems = content.filter((item) => item.subTitle);
  const nonSubTitleItems = content.filter((item) => !item.subTitle);

  // subText에서 ':'로 분리하여 subTitle과 text를 따로 처리
  const splitText = (text) => {
    const [subTitle, ...rest] = text.split(":");
    return {
      subTitle: subTitle.trim(), // ':' 앞부분
      text: rest.join(":").trim(), // ':' 뒷부분
    };
  };

  return (
    <BoxWrap title={title} isPurpose={title === "목적"}>
      {" "}
      {/* 타이틀이 "목적"인지 확인 */}
      {title && title !== "목적" && (
        <strong>
          {/* 번호 표시 */}
          {index + 1}. {title}
        </strong>
      )}
      {/* nonSubTitleItems는 일반적으로 title과 text만 표시 */}
      {nonSubTitleItems.length > 0 &&
        nonSubTitleItems?.map((item, index) => (
          <div key={index}>
            <p>{item.text}</p>
            {item.subtext && <SubTextBox>{item.subtext}</SubTextBox>}
          </div>
        ))}
      {/* subTitleItems는 DynamicGrid 스타일을 적용 */}
      <>
        {subTitleItems.map((item, index) => (
          <SeparateSection key={index}>
            <strong>
              {/* <strong_title>{`${item.subTitle}`}</strong_title> */}{" "}
              {/* 차후 추가할수도 있음*/}
            </strong>
            <p>
              {item.subTitle} : {item.text}
            </p>

            {/* subText1, subText2, subText3를 한 줄씩 표시 */}
            <div>
              {item.subText1 && (
                <p>
                  {item.subTitle}: {splitText(item.subText1).text}
                </p>
              )}
              {item.subText2 && (
                <p>
                  {item.subTitle}: {splitText(item.subText2).text}
                </p>
              )}
              {item.subText3 && (
                <p>
                  {item.subTitle}: {splitText(item.subText3).text}
                </p>
              )}
            </div>
          </SeparateSection>
        ))}
      </>
    </BoxWrap>
  );
};

export default OrganismCustomerAdditionalReport;

const AnalysisSection = styled.div`
  position: relative;
  max-width: 1135px;
  // width: 91.5%;
  text-align: left;
  margin-top: 25px;
  margin-left:50px;
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
  // padding: 20px;
  // border-radius: 10px;
  // background: ${(props) =>
    props.isPurpose ? palette.white : "rgba(0, 0, 0, 0.04)"}; /* 흰 배경 적용 */
  padding: ${(props) => (props.isPurpose ? "0" : "20px")};
  background: ${(props) =>
    props.isPurpose ? palette.white : palette.chatGray}; /* 흰 배경 적용 */

  font-size: 0.875rem;
  color: ${palette.gray800};
  line-height: 1.5;
  // margin:8px auto 20px;

  &:nth-child(3) {
    border-radius: 10px 10px 0 0;
  }
  &:last-child {
    border-radius: 0 0 10px 10px;
  }
  &:nth-child(n + 3) {
    margin-top: 0;
  }

  + div {
    margin-top: 12px;
  }

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
  }

  // p {
  //   font-size: 0.875rem;
  //   margin-bottom: 10px;
  // }
`;
const TabHeader = styled.div`
  gap: 40px;
  margin-bottom: 20px;
`;

const TabTitle = styled.div`
  font-family: "Pretendard";
  font-size: 1.25rem;
  font-weight: 500;
  color: ${palette.black};
  border: none;
  border-bottom: none;
  background: ${palette.white};
  margin-bottom: 10px;
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
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .loader {
    border: 12px solid #f3f3f3; /* Light grey */
    border-top: 12px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spacing = styled.div`
  margin-bottom: 40px; /* 제목과 본문 사이의 간격 */
`;

const SeparateSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0; /* 위아래 5px, 좌우 20px */
  border-radius: 10px;
  background: rgba(0, 0, 0, 0);

  h4 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
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
    position: relative;
    font-size: 0.875rem;
    font-weight: 400;
    color: ${palette.darkGray};
    line-height: 1.5;
    padding-left: 13px;
    margin-left: 8px;

    &:before {
      position: absolute;
      top: 8px;
      left: 0;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: ${palette.gray800};
      content: "";
    }
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
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: ${palette.gray800};
        content: "";
      }
    }
  }
`;