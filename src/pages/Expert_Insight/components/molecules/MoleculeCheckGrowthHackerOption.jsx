import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  CONVERSATION_STAGE,
  GROWTH_HACKER_BUTTON_STATE,
  KPI_QUESTION_LIST,
  APPROACH_PATH,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeCheckGrowthHackerOption = () => {
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const { saveConversation } = useSaveConversation();
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [KpiQuestionList, setKpiQuestionList] = useAtom(KPI_QUESTION_LIST);

  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [selectedOption4, setSelectedOption4] = useState("");
  const [selectedOption5, setSelectedOption5] = useState("");
  const [selectedOption6, setSelectedOption6] = useState("");
  const [growthHackerButtonState, setGrowthHackerButtonState] = useAtom(GROWTH_HACKER_BUTTON_STATE);

  const [tabs, setTabs] = useState(0);

  useEffect(() => {
    if (KpiQuestionList.length === 0) {
      setTabs(0);
    } else {
      setTabs(5);

      setSelectedOption1(KpiQuestionList[0]);
      setSelectedOption2(KpiQuestionList[1]);
      setSelectedOption3(KpiQuestionList[2]);
      setSelectedOption4(KpiQuestionList[3]);
      setSelectedOption5(KpiQuestionList[4]);
      setSelectedOption6(KpiQuestionList[5]);
    }
  }, [KpiQuestionList]);

  const options1 = [
    { label: "아이디어 단계", value: "아이디어 단계" },
    { label: "프로토타입 단계", value: "프로토타입 단계" },
    { label: "베타 테스트 단계", value: "베타 테스트 단계" },
    { label: "출시 후 단계", value: "출시 후 단계" },
    { label: "기타", value: "기타" },
  ];

  const options2 = [
    { label: "아직 구현되지 않음", value: "아직 구현되지 않음" },
    { label: "일부 기능만 구현됨", value: "일부 기능만 구현됨" },
    { label: "대부분 기능이 구현됨", value: "대부분 기능이 구현됨" },
    { label: "모든 기능이 완전히 구현됨", value: "모든 기능이 완전히 구현됨" },
  ];

  const options3 = [
    { label: "가격", value: "가격" },
    { label: "성능/기능", value: "성능/기능" },
    { label: "사용자 경험(UX)", value: "사용자 경험(UX)" },
    { label: "고객 지원", value: "고객 지원" },
    { label: "기타", value: "기타" },
  ];
  
  const options4 = [
    { label: "안정적", value: "안정적" },
    { label: "불안정함", value: "불안정함" },
    { label: "아직 수익을 창출하지 않음", value: "아직 수익을 창출하지 않음" },
  ];
  
  const options5 = [
    { label: "아직 사용자 확보 전", value: "아직 사용자 확보 전" },
    { label: "감소하고 있음", value: "감소하고 있음" },
    { label: "정체중", value: "정체중" },
    { label: "점차 증가하고 있음", value: "점차 증가하고 있음" },
    { label: "빠르게 증가하고 있음", value: "빠르게 증가하고 있음" },
  ];
  
  const options6 = [
    { label: "B2B (기업 대상)", value: "B2B (기업 대상)" },
    { label: "B2C (개인 고객 대상)", value: "B2C (개인 고객 대상)" },
    { label: "기타", value: "기타" },
  ];
  

  const handleOptionClick = (index, optionValue) => {
    if (KpiQuestionList.length) return;
  
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
      case 6:
        setSelectedOption6(optionValue);
        break;
      default:
        break;
    }
  };
  

  const handleConfirm = async () => {
    if (KpiQuestionList.length) return;

    setKpiQuestionList([selectedOption1, selectedOption2, selectedOption3, selectedOption4, selectedOption5, selectedOption6]);
    setApproachPath(3);
    setConversationStage(3);
    setGrowthHackerButtonState(1);

    const updatedConversation = [...conversation];
    updatedConversation.push(
      {
        type: "user",
        message: `응답이 완료되었습니다.`,
      },
      {
        type: "system",
        message: "아이템을 진단한 결과, 마케팅 퍼널에서 주목해야할 포인트를 확인했습니다.\n다음 내용을 참고하여 성장 전략을 도출해보세요 ",
        expertIndex: selectedExpertIndex,
      },
      {
        type: `growthHackerKPI`,
      }
    );
    setConversation(updatedConversation);

    await saveConversation(
      { changingConversation: 
        { conversation: updatedConversation, 
          KpiQuestionList: [selectedOption1, selectedOption2, selectedOption3, selectedOption4, selectedOption5, selectedOption6],
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
        (tabs === 3 && !selectedOption4) ||
        (tabs === 4 && !selectedOption5)
      )
        return;
      setTabs((prevTabs) => prevTabs + 1);
    }
  };

  return (
    <Wrap>
      {tabs === 0 && (
        <>
          <Progress KpiQuestionList={KpiQuestionList}>
            <div className="bar stap1"></div>
          </Progress>

          <Question>Q1. 현재 제품/서비스는 어느 단계에 있습니까?</Question>
          <OptionContainer>
            {options1.map((option1) => (
              <Option
                key={option1.value}
                selected={selectedOption1 === option1.value}
                onClick={() => handleOptionClick(1, option1.value)}
                KpiQuestionList={KpiQuestionList}
              >
                {option1.label}
              </Option>
            ))}
          </OptionContainer>
        </>
      )}
      {tabs === 1 && (
        <>
          <Progress KpiQuestionList={KpiQuestionList}>
            <div className="bar stap2"></div>
          </Progress>

          <Question>Q2. 현재 기능들이 얼마나 잘 구현되어 있습니까?</Question>
          <OptionContainer>
            {options2.map((option2) => (
              <Option
                key={option2.value}
                selected={selectedOption2 === option2.value}
                onClick={() => handleOptionClick(2, option2.value)}
                KpiQuestionList={KpiQuestionList}
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
          <Progress KpiQuestionList={KpiQuestionList}>
            <div className="bar stap3"></div>
          </Progress>

          <Question>Q3. 경쟁사 대비 귀사의 아이템이 제공하는 가장 큰 차별점은 무엇인가요?</Question>
          <OptionContainer>
            {options3.map((option3) => (
              <Option
                key={option3.value}
                selected={selectedOption3 === option3.value}
                onClick={() => handleOptionClick(3, option3.value)}
                KpiQuestionList={KpiQuestionList}
              >
                {option3.label}
              </Option>
            ))}
          </OptionContainer>
        </>
      )}
      {tabs === 3 && (
        <>
          <Progress KpiQuestionList={KpiQuestionList}>
            <div className="bar stap4"></div>
          </Progress>

          <Question>Q4. 현재 귀사의 수익구조는 어떠한가요?</Question>
          <OptionContainer>
            {options4.map((option4) => (
              <Option
                key={option4.value}
                selected={selectedOption4 === option4.value}
                onClick={() => handleOptionClick(4, option4.value)}
                KpiQuestionList={KpiQuestionList}
              >
                {option4.label}
              </Option>
            ))}
          </OptionContainer>
        </>
      )}

      {tabs === 4 && (
        <>
          <Progress KpiQuestionList={KpiQuestionList}>
            <div className="bar stap5"></div>
          </Progress>

          <Question>Q5. 제품/서비스의 사용자 수는 어떠한가요?</Question>
          <OptionContainer>
            {options5.map((option5) => (
              <Option
                key={option5.value}
                selected={selectedOption5 === option5.value}
                onClick={() => handleOptionClick(5, option5.value)}
                KpiQuestionList={KpiQuestionList}
              >
                {option5.label}
              </Option>
            ))}
          </OptionContainer>
        </>
      )}

      {tabs === 5 && (
        <>
          <Progress KpiQuestionList={KpiQuestionList}>
            <div className="bar"></div>
          </Progress>

          <Question>Q6. 주요 고객층은 누구입니까?</Question>
          <OptionContainer>
            {options6.map((option6) => (
              <Option
                key={option6.value}
                selected={selectedOption6 === option6.value}
                onClick={() => handleOptionClick(6, option6.value)}
                KpiQuestionList={KpiQuestionList}
              >
                {option6.label}
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
        selectedOption6={selectedOption6}
        KpiQuestionList={KpiQuestionList}
        tabs={tabs}
      >
        {tabs === 0 ? null : (
          <div className="prev" onClick={() => hadleTurnTab("prev")}>
            이전
          </div>
        )}

        {/* 각 탭에 대한 조건을 추가 */}
        {tabs === 5 ? (
          <div
            className="finish"
            disabled={!selectedOption1 || !selectedOption2 || !selectedOption3 || !selectedOption4 || !selectedOption5 || !selectedOption6}
            onClick={() => {
              if (
                !selectedOption1 ||
                !selectedOption2 ||
                !selectedOption3 ||
                !selectedOption4 ||
                !selectedOption5 ||
                !selectedOption6
              )
                return;
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
              (tabs === 3 && !selectedOption4) ||
              (tabs === 4 && !selectedOption5)
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

export default MoleculeCheckGrowthHackerOption;


const Wrap = styled.div`
  max-width:570px;
  width:100%;
  min-height:325px;
  display:flex;
  flex-direction:column;
  padding: 32px 40px;
  margin:24px 0 0 50px;
  border-radius:15px;
  border:1px solid ${palette.outlineGray};
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
      props.KpiQuestionList?.length !== 0
        ? palette.gray800
        : palette.blue};
    transition:all .5s;
  }

  .bar.stap1 {
    width:16.66%
  }

  .bar.stap2 {
    width:33.33%
  }

  .bar.stap3 {
    width:50%
  }

  .bar.stap4 {
    width:66.64%
  }

  .bar.stap5 {
    width:83%
  }

  .bar.num2 {
    width:50%;
  }

  .bar.num3 {
    width:33%;
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
      ? props.KpiQuestionList?.length === 0
        ? palette.blue
        : palette.black
      : palette.gray800};
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected
      ? props.KpiQuestionList?.length === 0
        ? "rgba(4,83,244,0.05)"
        : "rgba(0,0,0,0.05)"
      : palette.white};
  border: 1px solid
    ${(props) =>
      props.selected
        ? props.KpiQuestionList?.length === 0
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
          ? props.KpiQuestionList?.length === 0
            ? palette.blue
            : palette.gray800
          : palette.lineGray};
    background-color: ${(props) =>
      props.selected
      ? props.KpiQuestionList?.length === 0
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
      props.KpiQuestionList?.length === 0 ? palette.blue : "none"};
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
      props.KpiQuestionList.length !== 0
        ? palette.gray500
        : props.tabs === 0 && props.selectedOption1
        || props.tabs === 1 && props.selectedOption2
        || props.tabs === 2 && props.selectedOption3
        || props.tabs === 3 && props.selectedOption4
        || props.tabs === 4 && props.selectedOption5
        || props.tabs === 5 && props.selectedOption6
        ? palette.primary
        : palette.gray500};
    background: ${palette.white};
    cursor: ${(props) => (
      props.tabs === 0 && props.selectedOption1 
      || props.tabs === 1 && props.selectedOption2 
      || props.tabs === 2 && props.selectedOption3 
      || props.tabs === 3 && props.selectedOption4 
      || props.tabs === 4 && props.selectedOption5 
      || props.tabs === 5 && props.selectedOption6 
      ? "pointer" : "default")};
  }

  .finish {
    color: ${(props) =>
      props.KpiQuestionList.length !== 0
        ? palette.gray500
        : !props.selectedOption1 || !props.selectedOption2 || !props.selectedOption3 || !props.selectedOption4 || !props.selectedOption5 || !props.selectedOption6
        ? palette.gray500
        : palette.primary};
    background: ${palette.white};
    cursor: ${(props) => props.KpiQuestionList.length !== 0 
        ? "default" 
        : props.selectedOption1 
        && props.selectedOption2 
        && props.selectedOption3 
        && props.selectedOption4 
        && props.selectedOption5 
        && props.selectedOption6 
        ? "pointer" : "default"};
  }
`;
