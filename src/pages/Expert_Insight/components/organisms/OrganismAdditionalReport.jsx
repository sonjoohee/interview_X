import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import {
  ADDITIONAL_REPORT_DATA,
  SELECTED_ADDITIONAL_KEYWORD,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  ADDITION_BUTTON_STATE,
  CONVERSATION,
  IS_LOADING,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  POC_DETAIL_REPORT_DATA,
  CONVERSATION_ID,
  SELECTED_EXPERT_LIST,
  IS_LOGGED_IN,
  PROJECT_TOTAL_INFO,
} from "../../../AtomStates";
import { palette } from "../../../../assets/styles/Palette";
import MoleculeReportController from "../molecules/MoleculeReportController";
import { useSaveConversation } from "../atoms/AtomSaveConversation";
import axios from "axios";
import Loader from "../atoms/AtomLoader"
import {InterviewXAdditionalQuestionRequest } from "../../../../utils/indexedDB";

const OrganismAdditionalReport = ({
  additionalReportCount
}) => { 
  const [selectedExpertList, setSelectedExpertList] = useAtom(SELECTED_EXPERT_LIST);
  const { saveConversation } = useSaveConversation();
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(
    SELECTED_ADDITIONAL_KEYWORD
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
  const [additionButtonState, setAdditionButtonState] = useAtom(ADDITION_BUTTON_STATE);
  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };
  const [selectedKeywords] = useAtom(SELECTED_ADDITIONAL_KEYWORD); // Access the list of selected keywords
  const [title, setTitle] = useState([]);
  const [sections, setSections] = useState([]);
  const [additionalReportData, setAdditionalReportData] = useAtom(
    ADDITIONAL_REPORT_DATA
  ); // Use the list-based atom
  const [answerDataState, setAnswerDataState] = useState([]);
  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  const [
    selectedCustomerAdditionalKeyword,
    setSelectedCustomerAdditionalKeyword,
  ] = useAtom(SELECTED_CUSTOMER_ADDITIONAL_KEYWORD);
  const [customerAdditionalReportData, setCustomerAdditionalReportData] =
    useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);
  const [pocDetailReportData, setpocDetailReportData] = useAtom(POC_DETAIL_REPORT_DATA);

  const [projectTotalInfo, setProjectTotalInfo] = useAtom(PROJECT_TOTAL_INFO);

  useEffect(() => {
    const loadData = async () => {
      let answerData;

      try {
        // 기존 데이터가 있을 때 처리
        if (additionalReportData[additionalReportCount]) {
          setAnswerDataState(additionalReportData[additionalReportCount]);
          setTitle(additionalReportData[additionalReportCount]?.title || []);
          setSections(
            additionalReportData[additionalReportCount]?.sections || []
          );
        } else if (additionButtonState === 1) {
          // 버튼 상태가 1일 때만 API 요청 실행
          setAdditionButtonState(0); // 버튼 상태 초기화
          setIsLoadingAdd(true);
          setIsLoading(true);

          const keyword = selectedKeywords[selectedKeywords.length - 1]; // Use the keyword based on expertIndex

          const data = {
            business_info: titleOfBusinessInfo,
            business_analysis_data: {
              명칭: analysisReportData.title,
              주요_목적_및_특징: analysisReportData.mainFeatures,
              주요기능: analysisReportData.mainCharacter,
              목표고객: analysisReportData.mainCustomer,
            },
            question_info: keyword,
          };

          // let response = await axios.post(
          //   "https://wishresearch.kr/panels/add_question",
          //   data,
          //   axiosConfig
          // );
          // answerData = response.data.additional_question;

          let response = await InterviewXAdditionalQuestionRequest(
            data,
            isLoggedIn
          );
          answerData = response.response.additional_question;

          while (
            !answerData.hasOwnProperty("title")
          ) {

            response = await InterviewXAdditionalQuestionRequest(
            data,
            isLoggedIn
          );
          answerData = response.response.additional_question;
            // response = await axios.post(
            //   "https://wishresearch.kr/panels/add_question",
            //   data,
            //   axiosConfig
            // );
            // answerData = response.data.additional_question;
          }
          

          setAnswerDataState(answerData);
          setTitle(answerData?.title);
          setSections(answerData?.sections);

          let updatedAdditionalReportData = [];

          if (
            additionalReportCount === 0 ||
            additionalReportData.length === 0
          ) {
            updatedAdditionalReportData.push(answerData);
          } else {
            updatedAdditionalReportData = additionalReportData;
            updatedAdditionalReportData.push(answerData);
          }
          setAdditionalReportData(updatedAdditionalReportData);
          setIsLoadingAdd(false);
          setIsLoading(false);

          const updatedConversation2 = [...conversation];

          if (selectedExpertList.length === 3) {
            updatedConversation2.push({
              type: "system",
              message: `"${projectTotalInfo.projectTitle}"과 관련된 "${
                selectedAdditionalKeyword[selectedAdditionalKeyword.length - 1]
              }" 분석 결과입니다.\n추가로 궁금한 점이 있으면 질문해 주세요 😊`,
              expertIndex: 0,
            });
          } else {
            updatedConversation2.push({
              type: "system",
              message: `"${projectTotalInfo.projectTitle}"과 관련된 "${
                selectedAdditionalKeyword[selectedAdditionalKeyword.length - 1]
              }" 분석 결과입니다.\n추가로 궁금한 점이 있으면 질문해 주세요 😊 분야별 전문가의 의견도 확인해보세요`,
              expertIndex: 0,
            });
          }
          updatedConversation2.push({ type: "keyword" });
          setConversation(updatedConversation2);

          await saveConversation(
            { changingConversation: { conversation: updatedConversation2, conversationStage: 3, additionalReportData: updatedAdditionalReportData, } }
          );
        }
      } catch (error) {
       // console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [
    conversationId,
    selectedKeywords,
    additionButtonState, // buttonState 의존성 추가
  ]);

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
              {/* <TabContent>{purpose}</TabContent> */}
            </TabHeader>
          )}

          <div>
            {sections?.map((section, index) => (
              <Section
                key={index}
                title={section.title}
                content={section.content}
                index={index - 1}
              />
            ))}
          </div>

          {!isLoadingAdd && (
            <MoleculeReportController
              reportIndex={2}
              sampleData={answerDataState}
              additionalReportCount={additionalReportCount}
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
    <>
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
            <>
              <div key={index}>
                <p>{item.text}</p>
                {item.subtext && <SubTextBox>{item.subtext}</SubTextBox>}
              </div>
            </>
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
    </>
  );
};

export default OrganismAdditionalReport;

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
  padding: ${(props) => (props.isPurpose ? "0" : "20px")};
  background: ${(props) =>
    props.isPurpose ? palette.white : palette.chatGray}; /* 흰 배경 적용 */

  font-size: 0.875rem;
  color: ${palette.gray800};
  line-height: 1.5;
  // margin:8px auto 20px;

  &:nth-child(2) {
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
  font-family: "Pretendard", "Poppins";
  font-size: 1.25rem;
  font-weight: 400;
  color: ${palette.gray800};
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

const SeparateSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0);

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
    margin-bottom: 4px;
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
