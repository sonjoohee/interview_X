import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  APPROACH_PATH,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  SURVEY_QUESTION_LIST,
  SURVEY_GUIDELINE_BUTTON_STATE,
  CONVERSATION_STAGE,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";
import { palette } from "../../../../assets/styles/Palette";

const MoleculeCheckSurveyOption = () => {
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const { saveConversation } = useSaveConversation();
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [surveyQuestionList, setsurveyQuestionList] = useAtom(SURVEY_QUESTION_LIST);
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [selectedOption4, setSelectedOption4] = useState("");

  const [surveyGuidelineButtonState, setSurveyGuidelineButtonState] = useAtom(SURVEY_GUIDELINE_BUTTON_STATE);

  const [tabs, setTabs] = useState(0);

  useEffect(() => {
    if (surveyQuestionList.length === 0) {
      setTabs(0);
    } else {
      setTabs(3);

      setSelectedOption1(surveyQuestionList[0]);
      setSelectedOption2(surveyQuestionList[1]);
      setSelectedOption3(surveyQuestionList[2]);
      setSelectedOption4(surveyQuestionList[3]);
    }
  }, [surveyQuestionList]);


  const options1 = [
    { label: "매우 짧음(1주 이내)", value: "매우 짧음(1주 이내)" },
    { label: "짧음(1~2주)", value: "짧음(1~2주)" },
    { label: "보통(2주~1개월)", value: "보통(2주~1개월)" },
    { label: "긺(1개월~2개월)", value: "긺(1개월~2개월)" },
    { label: "매우 긺", value: "매우 긺" },
  ];
  
  const options2 = [
    { label: "매우 부족함", value: "매우 부족함" },
    { label: "부족함", value: "부족함" },
    { label: "보통", value: "보통" },
    { label: "충분함", value: "충분함" },
    { label: "매우 충분함", value: "매우 충분함" }
  ];
  
  const options3 = [
    { label: "매우 적음(소규모)", value: "매우 적음(소규모)" },
    { label: "적음(중소규모)", value: "적음(중소규모)" },
    { label: "보통(중간규모)", value: "보통(중간규모)" },
    { label: "많음(중대규모)", value: "많음(중대규모)" },
    { label: "매우 많음(대규모)", value: "매우 많음(대규모)" },
  ];
  
  const options4 = [
    { label: "객관적인 수치나 통계 자료", value: "객관적인 수치나 통계 자료" },
    { label: "사람들의 의견 및 경험 설명 자료", value: "사람들의 의견 및 경험 설명 자료" },
    { label: "수치 자료와 설명 혼합 자료", value: "수치 자료와 설명 혼합 자료" },
    { label: "데이터 형태는 상관없음", value: "데이터 형태는 상관없음" }
  ];
  

  const handleOptionClick = (index, optionValue) => {
    if (surveyQuestionList.length) return;
  
    switch (index) {
      case 1:
        setSelectedOption1(optionValue);
        break;
      case 2:
        setSelectedOption2(optionValue);
        break;
      case 3:
        setSelectedOption3(optionValue);
        break;
      case 4:
        setSelectedOption4(optionValue);
        break;
      default:
        break;
    }
  };
  

  const handleConfirm = async () => {
    if (surveyQuestionList.length) return;

    setsurveyQuestionList([selectedOption1, selectedOption2, selectedOption3, selectedOption4]);
    setApproachPath(3);
    setConversationStage(3);
    setSurveyGuidelineButtonState(1);

    const updatedConversation = [...conversation];
    updatedConversation.push(
      {
        type: "user",
        message: `완료되었습니다.`,
      },
      {
        type: "system",
        message: "좋습니다. 이 목적에 맞춰 설문조사 문항을 설계해드리겠습니다.",
        expertIndex: selectedExpertIndex,
      },
      {
        type: `surveyGuidelineReport`,
      }
    );
    setConversation(updatedConversation);

    await saveConversation(
      { changingConversation: 
        { conversation: updatedConversation, 
          conversationStage: 3,
          surveyQuestionList: [selectedOption1, selectedOption2, selectedOption3, selectedOption4],
        } 
      }
    );
  };

  const hadleTurnTab = (dir) => {
    if (dir === "prev") {
      setTabs((prevTabs) => prevTabs - 1);
    } else if (dir === "next") {
      setTabs((prevTabs) => prevTabs + 1);
    }
  };

  return (
    <Wrap>
      {tabs === 0 && (
        <>
          <Progress surveyQuestionList={surveyQuestionList}>
            <div className="bar stap1"></div>
          </Progress>
          <Question>Q1. 조사를 완료해야 하는 기간은 어느 정도인가요?</Question>
          <OptionContainer>
            {options1.map((option1) => (
              <Option
                key={option1.value}
                selected={selectedOption1 === option1.value}
                onClick={() => handleOptionClick(1, option1.value)}
                surveyQuestionList={surveyQuestionList}
              >
                {option1.label}
              </Option>
            ))}
          </OptionContainer>
        </>
      )}
      {tabs === 1 && (
        <>
          <Progress surveyQuestionList={surveyQuestionList}>
            <div className="bar stap2"></div>
          </Progress>
          <Question>Q2. 조사를 위한 예산을 어느 정도로 고려하고 있나요?</Question>
          <OptionContainer>
            {options2.map((option2) => (
              <Option
                key={option2.value}
                selected={selectedOption2 === option2.value}
                onClick={() => handleOptionClick(2, option2.value)}
                surveyQuestionList={surveyQuestionList}
              >
                {option2.label}
              </Option>
            ))}
          </OptionContainer>
        </>
      )}
      {/* 각 탭별로 동일한 방식으로 설정 */}
      {tabs === 2 && (
        <>
          <Progress surveyQuestionList={surveyQuestionList}>
            <div className="bar stap3"></div>
          </Progress>
          <Question>Q3. 조사에 참여할 계획인 대상자 수는 어느정도로 생각하십니까?</Question>
          <OptionContainer>
            {options3.map((option3) => (
              <Option
                key={option3.value}
                selected={selectedOption3 === option3.value}
                onClick={() => handleOptionClick(3, option3.value)}
                surveyQuestionList={surveyQuestionList}
              >
                {option3.label}
              </Option>
            ))}
          </OptionContainer>
        </>
      )}
      {tabs === 3 && (
        <>
          <Progress surveyQuestionList={surveyQuestionList}>
            <div className="bar"></div>
          </Progress>
          <Question>Q4. 어떤 형태의 데이터가 필요하신가요?</Question>
          <OptionContainer>
            {options4.map((option4) => (
              <Option
                key={option4.value}
                selected={selectedOption4 === option4.value}
                onClick={() => handleOptionClick(4, option4.value)}
                surveyQuestionList={surveyQuestionList}
              >
                {option4.label}
              </Option>
            ))}
          </OptionContainer>
        </>
      )}


      <ButtonWrap
        selectedOption1={selectedOption1}
        selectedOption2={selectedOption2}
        selectedOption3={selectedOption3}
        selectedOption4={selectedOption4}
        surveyQuestionList={surveyQuestionList}
        tabs={tabs}
      >
        {tabs === 0 ? null : (
          <div className="prev" onClick={() => hadleTurnTab("prev")}>
            이전
          </div>
        )}

        {tabs === 3 ? (
          <div
            className="finish"
            disabled={!selectedOption1 || !selectedOption2 || !selectedOption3 || !selectedOption4}
            onClick={() => {
              if (!selectedOption1 || !selectedOption2 || !selectedOption3 || !selectedOption4) return;
              handleConfirm();
            }}
          >
            완료
          </div>
        ) : (
          <div
            className="next"
            disabled={
              (tabs === 0 && !selectedOption1) ||
              (tabs === 1 && !selectedOption2) ||
              (tabs === 2 && !selectedOption3) 
            }
            onClick={() => {
              if (
                (tabs === 0 && !selectedOption1) ||
                (tabs === 1 && !selectedOption2) ||
                (tabs === 2 && !selectedOption3) 
              )
                return;
              hadleTurnTab("next");
            }}
          >
            다음
          </div>
        )}
      </ButtonWrap>

    </Wrap>
  );
};

export default MoleculeCheckSurveyOption;


const Wrap = styled.div`
  max-width:570px;
  width:100%;
  min-height:325px;
  display:flex;
  flex-direction:column;
  padding: 32px 40px;
  margin:24px 0 0 44px;
  border-radius:15px;
  border:1px solid ${palette.lineGray};
`;

const Progress = styled.div`
  width:100%;
  height:3px;
  margin-bottom:30px;
  border-radius:10px;
  background:#ECEFF3;

  .bar {
    width:100%;
    height:3px;
    border-radius:10px;
    background:${(props) =>
      props.surveyQuestionList?.length !== 0
        ? palette.gray800
        : palette.blue};
    transition:all .5s;
  }

  .bar.stap1 {
    width:25%;
  }

  .bar.stap2 {
    width:50%;
  }

  .bar.stap3 {
    width:75%;
  }
`;

const Question = styled.div`
  font-size: 0.88rem;
  font-weight:700;
  text-align:left;
  margin-bottom: 20px;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content:space-between;
  gap: 8px 0;
`;

const Option = styled.div`
  position:relative;
  display:flex;
  gap:8px;
  align-items:center;
  // flex: 1 1 40%;
  width:49%;
  font-size:0.88rem;
  color: ${(props) =>
    props.selected
      ? props.surveyQuestionList?.length === 0
        ? palette.blue
        : palette.black
      : palette.gray800};
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected
      ? props.surveyQuestionList?.length === 0
        ? "rgba(4,83,244,0.05)"
        : "rgba(0,0,0,0.05)"
      : palette.white};
  border: 1px solid
    ${(props) =>
      props.selected
        ? props.surveyQuestionList?.length === 0
          ? palette.blue
          : palette.black
        : palette.lineGray};
  transition:all .5s;

  &:before {
    width:20px;
    height:20px;
    border-radius:50%;
    border: 1px solid
      ${(props) =>
        props.selected
          ? props.surveyQuestionList?.length === 0
            ? palette.blue
            : palette.gray800
          : palette.lineGray};
    background-color: ${(props) =>
      props.selected
      ? props.surveyQuestionList?.length === 0
      ? palette.blue
          : palette.gray800
        : palette.white};
    transition:all .5s;
    content:'';
  }

  &:after {
    position:absolute;
    left:12px;
    top:8px;
    width:20px;
    height:20px;
    background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8' fill='none'%3E%3Cpath d='M9 0.914062L3.4 6.91406L1 4.51406' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center no-repeat;
    content:'';
  }

  &:hover {
    border-color: ${(props) =>
      props.surveyQuestionList?.length === 0 ? palette.blue : "none"};
  }
`;

const ButtonWrap = styled.div`
  // margin-top:40px;
  margin-top:auto;
  display:flex;
  justify-content:space-between;
  align-items:center;

  .prev {
    font-size:0.88rem;
    color:${palette.gray500};
    cursor:pointer;
  }

  .next, .finish {
    // min-width:100px;
    font-size:0.88rem;
    // color:${palette.white};
    // line-height:22px;
    // padding:8px 20px;
    margin-left:auto;
    border-radius:8px;
    background:none;
    transition:all .5s;
  }

  .next {
    color: ${(props) =>
      props.surveyQuestionList.length !== 0
        ? palette.gray500
        : props.tabs === 0 && props.selectedOption1
        || props.tabs === 1 && props.selectedOption2
        || props.tabs === 2 && props.selectedOption3
        || props.tabs === 3 && props.selectedOption4
        ? palette.primary
        : palette.gray500};
    background: ${palette.white};
    cursor: ${(props) => (
      props.tabs === 0 && props.selectedOption1 ||
      props.tabs === 1 && props.selectedOption2 ||
      props.tabs === 2 && props.selectedOption3 ||
      props.tabs === 3 && props.selectedOption4
      ? "pointer" : "default")};
  }

  .finish {
    color: ${(props) =>
      props.surveyQuestionList.length !== 0
        ? palette.gray500
        : !props.selectedOption1 || !props.selectedOption2 || !props.selectedOption3 || !props.selectedOption4
        ? palette.gray500
        : palette.primary};
    background: ${palette.white};
    cursor: ${(props) => props.surveyQuestionList.length !== 0 
      ? "default" 
      : props.selectedOption1 && props.selectedOption2 && props.selectedOption3 && props.selectedOption4
      ? "pointer" : "default"};
  }
`;
