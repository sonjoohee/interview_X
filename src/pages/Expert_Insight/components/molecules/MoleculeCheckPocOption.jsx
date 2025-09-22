import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  CONVERSATION_STAGE,
  TARGET_SELECT_BUTTON_STATE,
  SELECTED_POC_OPTIONS,
  APPROACH_PATH,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";
import { palette } from "../../../../assets/styles/Palette";

const MoleculeCheckPocOption = () => {
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const { saveConversation } = useSaveConversation();
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [targetSelectButtonState, setTargetSelectButtonState] = useAtom(TARGET_SELECT_BUTTON_STATE);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [selectedPocOptions, setSelectedPocOptions] = useAtom(SELECTED_POC_OPTIONS);
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [tabs, setTabs] = useState(0);

  const [options2, setOptions2] = useState([]);

  const options1 = [
    { label: "아이디어 검증 단계", value: "아이디어 검증 단계" },
    { label: "기술 가능성 검증 단계", value: "기술 가능성 검증 단계" },
    { label: "프로토타입 개발 단계", value: "프로토타입 개발 단계" },
    { label: "기능 테스트 및 개선 단계", value: "기능 테스트 및 개선 단계" },
    { label: "사용자 적합성 테스트 단계", value: "사용자 적합성 테스트 단계" },
    { label: "출시 준비 단계", value: "출시 준비 단계" },
  ];
  const options2_1 = [
    { label: "타겟 고객 그룹과 시장 세분화", value: "타겟팅 및 세분화" },
    { label: "해결하고자 하는 문제 여부 확인", value: "해결하고자 하는 문제 여부 확인" },
    { label: "시장 기회 및 크기 분석", value: "시장 기회 및 크기 분석" },
  ];
  const options2_2 = [
    { label: "기술 구현 가능성 확인", value: "기술 구현 가능성 확인" },
    { label: "예상되는 기술적 위험 요소 식별", value: "예상되는 기술적 위험 요소 식별" },
    { label: "비즈니스 목표와의 연계성 검토", value: "비즈니스 목표와의 연계성 검토" },
  ];
  const options2_3 = [
    { label: "사용자 여정 중심 접근", value: "사용자 여정 중심 접근" },
    { label: "기능 간 통합성", value: "기능 간 통합성" },
    { label: "초기 사용자 피드백 수집", value: "초기 사용자 피드백 수집" },
  ];
  const options2_4 = [
    { label: "사용자 요구와의 일치 여부 확인", value: "사용자 요구 반영" },
    { label: "성능 및 안정성 평가", value: "성능 및 안정성 평가" },
    { label: "사용자 피드백 수렴", value: "사용자 피드백 개선" },
  ];
  const options2_5 = [
    { label: "시장의 긍정적 반응 여부 확인", value: "시장의 긍정적 반응 여부 확인" },
    { label: "사용자 피드백 수집 및 분석", value: "사용자 피드백 수집 및 분석" },
    { label: "가격 모델 및 판매 전략 검토", value: "가격 모델 및 판매 전략 검토" },
  ];
  const options2_6 = [
    { label: "기술적 안정성 확보", value: "기술적 안정성 확보" },
    { label: "보안 및 시스템 확장 가능성 검토", value: "보안 및 시스템 확장 가능성 검토" },
    { label: "최종 사용자 경험 최적화 확인", value: "최종 사용자 경험 최적화 확인" },
    { label: "배포 및 운영 준비 완료", value: "배포 및 운영 준비 완료" },
  ];

  useEffect(() => {
    if (selectedPocOptions.length === 0) {
      setTabs(0);
    } else {
      setTabs(1);

      setSelectedOption1(selectedPocOptions[0]);
      setSelectedOption2(selectedPocOptions[1]);

      switch (selectedPocOptions[0]) {
        case "아이디어 검증 단계":
          setOptions2(options2_1);
          break;
        case "기술 가능성 검증 단계":
          setOptions2(options2_2);
          break;
        case "프로토타입 개발 단계":
          setOptions2(options2_3);
          break;
        case "기능 테스트 및 개선 단계":
          setOptions2(options2_4);
          break;
        case "사용자 적합성 테스트 단계":
          setOptions2(options2_5);
          break;
        case "출시 준비 단계":
          setOptions2(options2_6);
          break;
        default:
          setOptions2([]);
          break;
      }
    }
  }, [selectedPocOptions]);

  const handleOptionClick = (index, optionValue) => {
    if (selectedPocOptions.length) return;

    if (index === 1) {
      setSelectedOption1(optionValue);
      setSelectedOption2("");
    }
    else if (index === 2) {
      setSelectedOption2(optionValue);
    }
    else;
  };

  const handleConfirm = async () => {
    if (selectedPocOptions.length) return;
    
    setSelectedPocOptions([selectedOption1, selectedOption2]);
    setApproachPath(3);
    setConversationStage(3);
    setTargetSelectButtonState(1);

    const updatedConversation = [...conversation];
    updatedConversation.push(
      {
        type: "user",
        message: `*${selectedOption1}*의 *${selectedOption2}*을 위해 PoC 검증을 진행하려고 합니다`,
      },
      {
        type: "system",
        message: "PoC 설계를 위한 귀중한 정보 감사합니다. 마지막으로 타겟 유저에 대한 정보를 알려주세요.\n더욱 상세한 PoC 설계가 가능합니다. ",
        expertIndex: selectedExpertIndex,
      },
      {
        type: `pocPersona`,
      }
    );
    setConversation(updatedConversation);

    await saveConversation(
      { changingConversation: 
        { conversation: updatedConversation, 
          selectedPocOptions: [selectedOption1, selectedOption2],
          conversationStage: 3,
        }
      }
    );
  };

  const hadleTurnTab = (dir) => {
    if (dir === "prev") {
      setTabs((prevTabs) => prevTabs - 1)
    }
    else if (dir === "next") {
      switch (selectedOption1 || selectedPocOptions[0]) {
        case "아이디어 검증 단계":
          setOptions2(options2_1);
          break;
        case "기술 가능성 검증 단계":
          setOptions2(options2_2);
          break;
        case "프로토타입 개발 단계":
          setOptions2(options2_3);
          break;
        case "기능 테스트 및 개선 단계":
          setOptions2(options2_4);
          break;
        case "사용자 적합성 테스트 단계":
          setOptions2(options2_5);
          break;
        case "출시 준비 단계":
          setOptions2(options2_6);
          break;
        default:
          setOptions2([]);
          break;
      }

      setTabs((prevTabs) => prevTabs + 1)
    }
    else;
  }

  return (
    <Wrap>
      {tabs === 0 ? (
        <>
        <Progress selectedPocOptions={selectedPocOptions}>
          <div className="bar num2"></div>
        </Progress>

        <Question>Q1. PoC 단계를 알려주세요 (택 1)</Question>
        <OptionContainer>
          {options1.map((option1) => (
            <Option
              key={option1.value}
              selected={selectedOption1 === option1.value || selectedPocOptions[0] === option1.value}
              onClick={() => handleOptionClick(1, option1.value)}
              selectedPocOptions={selectedPocOptions}
            >
              {option1.label}
            </Option>
          ))}
        </OptionContainer>
        </>
      ) :
        <>
        <Progress selectedPocOptions={selectedPocOptions}>
          <div className="bar"></div>
        </Progress>

        <Question>Q2. PoC를 통해서 확인하고 싶은 내용은 무엇인가요? (택 1)</Question>
        <OptionContainer>
          {options2.map((option2) => (
            <Option
              key={option2.value}
              selected={selectedOption2 === option2.value}
              onClick={() => handleOptionClick(2, option2.value)}
              selectedPocOptions={selectedPocOptions}
            >
              {option2.label}
            </Option>
          ))}
        </OptionContainer>
        </>
        }

        <ButtonWrap selectedOption1={selectedOption1} selectedOption2={selectedOption2} selectedPocOptions={selectedPocOptions}>
          {tabs === 0 ?
            <></>
            :
            <div className="prev" onClick={() => hadleTurnTab("prev")}>
              이전
            </div>
          }
          {tabs === 0 ?
            <div 
              className="next"
              disabled={!selectedOption1 || !selectedOption2}
              onClick={() => {
                if (!selectedOption1) return;
                hadleTurnTab("next");
              }}
            >
              다음
            </div>
            :
            <div 
              className="finish" 
              disabled={!selectedOption1 || !selectedOption2}
              onClick={() => {
                if (!selectedOption1 || !selectedOption2) return; // 선택이 안됐을 경우 동작 막기
                handleConfirm();
              }}
            >
              완료
            </div>
          }        
        </ButtonWrap>
    </Wrap>
  );
};

export default MoleculeCheckPocOption;

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
      props.selectedPocOptions.length !== 0
        ? palette.gray800
        : palette.blue};
    transition:all .5s;
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
      ? props.selectedPocOptions.length === 0
        ? palette.blue
        : palette.black
      : palette.gray800};
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected
      ? props.selectedPocOptions.length === 0
        ? "rgba(4,83,244,0.05)"
        : "rgba(0,0,0,0.05)"
      : palette.white};
  border: 1px solid
    ${(props) =>
      props.selected
        ? props.selectedPocOptions.length === 0
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
          ? props.selectedPocOptions.length === 0
            ? palette.blue
            : palette.gray800
          : palette.lineGray};
    background-color: ${(props) =>
      props.selected
        ? props.selectedPocOptions.length === 0
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
      props.selectedPocOptions.length === 0 ? palette.blue : "none"};
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
      props.selectedPocOptions.length !== 0
        ? palette.gray500
        : !props.selectedOption1
        ? palette.gray500
        : palette.primary};
    background: ${(props) =>
      props.selectedPocOptions.length !== 0
        ? palette.white
        : !props.selectedOption1
        ? palette.white
        : palette.white};
    cursor: ${(props) => (!props.selectedOption1 ? "default" : "pointer")};
  }

  .finish {
    color: ${(props) =>
      props.selectedPocOptions.length !== 0
        ? palette.gray500
        : !props.selectedOption1 || !props.selectedOption2
        ? palette.gray500
        : palette.primary};
    background: ${(props) =>
      props.selectedPocOptions.length !== 0
        ? palette.white
        : !props.selectedOption1 || !props.selectedOption2
        ? palette.white
        : palette.white};
    cursor: ${(props) => props.selectedPocOptions.length !== 0 
        ? "default" 
        : !props.selectedOption1 || !props.selectedOption2 
        ? "default" : "pointer"};
  }
`;
