import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  APPROACH_PATH,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  BM_QUESTION_LIST,
  BM_MODEL_SUGGESTION_BUTTON_STATE,
  CONVERSATION_STAGE,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeCheckBmOption = () => {
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const { saveConversation } = useSaveConversation();
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [modelSuggestionButtonState, setModelSuggestionButtonState] = useAtom(BM_MODEL_SUGGESTION_BUTTON_STATE);

  const [bmQuestionList, setbmQuestionList] = useAtom(BM_QUESTION_LIST);
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [selectedOption4, setSelectedOption4] = useState("");
  const [selectedOption5, setSelectedOption5] = useState("");

  const [tabs, setTabs] = useState(0);

  useEffect(() => {
    if (bmQuestionList.length === 0) {
      setTabs(0);
    } else {
      setTabs(4);

      setSelectedOption1(bmQuestionList[0]);
      setSelectedOption2(bmQuestionList[1]);
      setSelectedOption3(bmQuestionList[2]);
      setSelectedOption4(bmQuestionList[3]);
      setSelectedOption5(bmQuestionList[4]);
    }
  }, [bmQuestionList]);


  const options1 = [
    { label: "아이디어 단계", value: "아이디어 단계" },
    { label: "프로토타입 단계", value: "프로토타입 단계" },
    { label: "베타 테스트/초기 시장 진입 단계", value: "베타 테스트/초기 시장 진입 단계" },
    { label: "제품 출시 후 안정화 단계", value: "제품 출시 후 안정화 단계" },
    { label: "성숙한 비즈니스 단계", value: "성숙한 비즈니스 단계" }
  ];
  
  const options2 = [
    { label: "제품 시장 적합성 검증", value: "제품 시장 적합성 검증" },
    { label: "초기 고객 확보", value: "초기 고객 확보" },
    { label: "BM 전체 분석 및 최적화", value: "BM 전체 분석 및 최적화" },
    { label: "수익 모델 다각화", value: "수익 모델 다각화" }
  ];
  
  const options3 = [
    { label: "문제 정의가 필요함", value: "문제 정의가 필요함" },
    { label: "이미 명확하게 정의되어, 해결책을 구체화 중", value: "이미 명확하게 정의되어, 해결책을 구체화 중" }
  ];
  
  const options4 = [
    { label: "핵심 문제 해결과 고객 피드백", value: "핵심 문제 해결과 고객 피드백" },
    { label: "전체 비즈니스 운영 최적화와 성장 전략", value: "전체 비즈니스 운영 최적화와 성장 전략" }
  ];
  
  const options5 = [
    { label: "아직 비즈니스 요소들이 복잡하지 않음", value: "아직 비즈니스 요소들이 복잡하지 않음" },
    { label: "다양한 파트너십, 비용 구조, 자원관리가 복잡함", value: "다양한 파트너십, 비용 구조, 자원관리가 복잡함" }
  ];
  
  const handleOptionClick = (index, optionValue) => {
    if (bmQuestionList.length) return;
  
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
      case 5:
        setSelectedOption5(optionValue);
        break;
      default:
        break;
    }
  };
  

  const handleConfirm = async () => {
    if (bmQuestionList.length) return;

    setbmQuestionList([selectedOption1, selectedOption2, selectedOption3, selectedOption4, selectedOption5]);
    setApproachPath(3);
    setConversationStage(3);
    setModelSuggestionButtonState(1);

    const updatedConversation = [...conversation];
    updatedConversation.push(
      {
        type: "user",
        message: `완료되었습니다.`,
      },
      {
        type: "system",
        message: "응답하신 내용을 분석하여 린캔버스 vs 비즈니스 모델 캔버스 매칭 분석을 진행하겠습니다.",
        expertIndex: selectedExpertIndex,
      },
      {
        type: `bmModelSuggestion`,
      }
    );
    setConversation(updatedConversation);

    await saveConversation(
      { changingConversation: 
        { conversation: updatedConversation, 
          bmQuestionList: [selectedOption1, selectedOption2, selectedOption3, selectedOption4],
          conversationStage: 3,
        }
      }
    );
  };

  const hadleTurnTab = (dir) => {
    if (dir === "prev") {
      setTabs((prevTabs) => prevTabs - 1);
    } else if (dir === "next") {
      if (
        (tabs === 0 && !selectedOption1) ||
        (tabs === 1 && !selectedOption2) ||
        (tabs === 2 && !selectedOption3) ||
        (tabs === 3 && !selectedOption4)
      )
        return;
      setTabs((prevTabs) => prevTabs + 1);
    }
  };

  return (
    <Wrap>
      {tabs === 0 && (
        <>
          <Progress bmQuestionList={bmQuestionList}>
            <div className="bar num1"></div>
          </Progress>
          <Question>Q1. 현재 스타트업의 단계는 무엇입니까?</Question>
          <OptionContainer>
            {options1.map((option1) => (
              <Option
                key={option1.value}
                selected={selectedOption1 === option1.value}
                onClick={() => handleOptionClick(1, option1.value)}
                bmQuestionList={bmQuestionList}
              >
                {option1.label}
              </Option>
            ))}
          </OptionContainer>
        </>
      )}
      {tabs === 1 && (
        <>
          <Progress bmQuestionList={bmQuestionList}>
            <div className="bar num2"></div>
          </Progress>
          <Question>Q2. 현재 가장 중요한 목표는 무엇입니까?</Question>
          <OptionContainer>
            {options2.map((option2) => (
              <Option
                key={option2.value}
                selected={selectedOption2 === option2.value}
                onClick={() => handleOptionClick(2, option2.value)}
                bmQuestionList={bmQuestionList}
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
          <Progress bmQuestionList={bmQuestionList}>
            <div className="bar num3"></div>
          </Progress>
          <Question>Q3. 고객의 문제는 명확하게 정의되었습니까?</Question>
          <OptionContainer>
            {options3.map((option3) => (
              <Option W100
                key={option3.value}
                selected={selectedOption3 === option3.value}
                onClick={() => handleOptionClick(3, option3.value)}
                bmQuestionList={bmQuestionList}
              >
                {option3.label}
              </Option>
            ))}
          </OptionContainer>
        </>
      )}
      {tabs === 3 && (
        <>
          <Progress bmQuestionList={bmQuestionList}>
            <div className="bar num4"></div>
          </Progress>
          <Question>Q4. 현재 비즈니스의 핵심 초점은 무엇입니까?</Question>
          <OptionContainer>
            {options4.map((option4) => (
              <Option W100
                key={option4.value}
                selected={selectedOption4 === option4.value}
                onClick={() => handleOptionClick(4, option4.value)}
                bmQuestionList={bmQuestionList}
              >
                {option4.label}
              </Option>
            ))}
          </OptionContainer>
        </>
      )}
      {tabs === 4 && (
        <>
          <Progress bmQuestionList={bmQuestionList}>
            <div className="bar"></div>
          </Progress>
          <Question>Q5. 파트너십, 자원, 비용 구조 등 비즈니스의 요소들이 복잡한가요?</Question>
          <OptionContainer>
            {options5.map((option5) => (
              <Option W100
                key={option5.value}
                selected={selectedOption5 === option5.value}
                onClick={() => handleOptionClick(5, option5.value)}
                bmQuestionList={bmQuestionList}
              >
                {option5.label}
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
        selectedOption5={selectedOption5}
        bmQuestionList={bmQuestionList}
        tabs={tabs}
      >
        {tabs === 0 ? null : (
          <div className="prev" onClick={() => hadleTurnTab("prev")}>
            이전
          </div>
        )}

        {tabs === 4 ? ( // 탭이 4로 변경됨
          <div
            className="finish"
            disabled={!selectedOption1 || !selectedOption2 || !selectedOption3 || !selectedOption4 || !selectedOption5}
            onClick={() => {
              if (!selectedOption1 || !selectedOption2 || !selectedOption3 || !selectedOption4 || !selectedOption5) return;
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
              (tabs === 2 && !selectedOption3) ||
              (tabs === 3 && !selectedOption4)
            }
            onClick={() => {
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

export default MoleculeCheckBmOption;


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
      props.bmQuestionList?.length !== 0
        ? palette.gray800
        : palette.blue};
    transition:all .5s;
  }

  .bar.num1 {
    width: 20%;
  }

  .bar.num2 {
    width: 40%;
  }

  .bar.num3 {
    width: 60%;
  }

  .bar.num4 {
    width: 80%;
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
  // width:49%;
  width:${props => {
    if (props.W100) return `100%`;
    else return `49%`;
  }};
  font-size:0.88rem;
  color: ${(props) =>
    props.selected
      ? props.bmQuestionList?.length === 0
        ? palette.blue
        : palette.black
      : palette.gray800};
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected
      ? props.bmQuestionList?.length === 0
        ? "rgba(4,83,244,0.05)"
        : "rgba(0,0,0,0.05)"
      : palette.white};
  border: 1px solid
    ${(props) =>
      props.selected
        ? props.bmQuestionList?.length === 0
          ? palette.blue
          : palette.black
        : palette.lineGray};
  transition:all .5s;

  &:before {
    width:20px;
    height:20px;
    flex-shrink:0;
    border-radius:50%;
    border: 1px solid
      ${(props) =>
        props.selected
          ? props.bmQuestionList?.length === 0
            ? palette.blue
            : palette.gray800
          : palette.lineGray};
    background-color: ${(props) =>
      props.selected
      ? props.bmQuestionList?.length === 0
      ? palette.blue
          : palette.gray800
        : palette.white};
    transition:all .5s;
    content:'';
  }

  &:after {
    position:absolute;
    left:12px;
    // top:8px;
    width:20px;
    height:20px;
    background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8' fill='none'%3E%3Cpath d='M9 0.914062L3.4 6.91406L1 4.51406' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center no-repeat;
    content:'';
  }

  &:hover {
    border-color: ${(props) =>
      props.bmQuestionList?.length === 0 ? palette.blue : "none"};
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
      props.bmQuestionList.length !== 0
        ? palette.gray500
        : props.tabs === 0 && props.selectedOption1 
        || props.tabs === 1 && props.selectedOption2 
        || props.tabs === 2 && props.selectedOption3 
        || props.tabs === 3 && props.selectedOption4
        || props.tabs === 4 && props.selectedOption5
        ? palette.primary
        : palette.gray500};
    background: ${palette.white};
    cursor: ${(props) => ( 
      props.tabs === 0 && props.selectedOption1 
      || props.tabs === 1 && props.selectedOption2 
      || props.tabs === 2 && props.selectedOption3 
      || props.tabs === 3 && props.selectedOption4 
      || props.tabs === 4 && props.selectedOption5 
      ? "pointer" : "default")};
  }

  .finish {
    color: ${(props) =>
      props.bmQuestionList.length !== 0
        ? palette.gray500
        : !props.selectedOption1 || !props.selectedOption2 || !props.selectedOption3 || !props.selectedOption4 || !props.selectedOption5
        ? palette.gray500
        : palette.primary};
    background: ${palette.white};
    cursor: ${(props) =>
      props.bmQuestionList.length !== 0
        ? "default"
        : props.selectedOption1 &&
          props.selectedOption2 &&
          props.selectedOption3 &&
          props.selectedOption4 &&
          props.selectedOption5
        ? "pointer"
        : "default"};
  }
`;