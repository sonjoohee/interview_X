import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import axios from "axios";
import { useAtom } from "jotai";
import {
  EXPERT_BUTTON_STATE,
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  CONVERSATION_STAGE,
  TARGET_SELECT_BUTTON_STATE,
  SELECTED_POC_OPTIONS,
  SELCTED_POC_TARGET,
  POC_PERSONA_LIST,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import {
  SkeletonTitle,
  SkeletonLine,
} from "../../../../assets/styles/Skeleton";

import images from "../../../../assets/styles/Images";

const MoleculePersonaSelect = () => {
  const { saveConversation } = useSaveConversation();
  const [selectedPocOptions, setSelectedPocOptions] =
    useAtom(SELECTED_POC_OPTIONS);
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
  const [expertButtonState, setExpertButtonState] = useAtom(EXPERT_BUTTON_STATE);
  const [targetSelectButtonState, setTargetSelectButtonState] = useAtom(TARGET_SELECT_BUTTON_STATE);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [selectedPocTargetState, setSelectedPocTargetState] = useState({}); // 현재 선택한 상태를 저장
  const [selectedPocTarget, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET); // 확인 버튼을 눌렀을 때만 저장 -> 히스토리 저장
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [isLoadingTarget, setIsLoadingTarget] = useState(false);
  const [pocPersonaList, setPocPersonaList] = useAtom(POC_PERSONA_LIST);

  useEffect(() => {
    if(Object.keys(selectedPocTarget).length) {
      setSelectedPocTargetState(selectedPocTarget);
    }
  }, [selectedPocTarget]);

  const handleOptionClick = (index) => {
    if (Object.keys(selectedPocTarget).length) return;
    
    if (index === 5) {
      setSelectedPocTargetState({
        job: "아직 타겟 고객이 확실하지 않아요",
        target: "아직 타겟 고객이 확실하지 않아요",
        index: 5,
      });
    } else {
      // 선택된 옵션을 상태로 저장
      const selectedPersona = pocPersonaList[index];
      
      // 선택된 persona의 job과 target 값을 상태에 저장
      setSelectedPocTargetState({
        job: selectedPersona[`persona_${index + 1}`][1]["job"],
        target: selectedPersona[`persona_${index + 1}`][4]["target"],
        index: index,
      });
    }
  };

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  useEffect(() => {
    const fetchPersonaSelect = async () => {

      if(targetSelectButtonState) {
        setIsLoading(true);
        setIsLoadingTarget(true);
        setTargetSelectButtonState(0);

        const data = {
          product_info: titleOfBusinessInfo,
          product_analysis_report: {
            명칭: titleOfBusinessInfo,
            주요_목적_및_특징: mainFeaturesOfBusinessInformation,
            주요기능: mainCharacteristicOfBusinessInformation,
          },
          goal : selectedPocOptions[0],
          standpoint : selectedPocOptions[1],
        };

        let response = await axios.post(
          "https://wishresearch.kr/panels/persona_list",
          data,
          axiosConfig
        );
        let updatedPersonaList = response.data.persona_list;

        let retryCount = 0;
        const maxRetries = 10;

        while ((retryCount < maxRetries &&
          !Array.isArray(updatedPersonaList) ||
          updatedPersonaList.length !== 5 ||
          !updatedPersonaList[0].hasOwnProperty("persona_1")
        )) {
          response = await axios.post(
            "https://wishresearch.kr/panels/persona_list",
            data,
            axiosConfig
          );
          retryCount++;
          await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기
          updatedPersonaList = response.data.persona_list;
        }
        if (retryCount === maxRetries) {
          console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
          // 에러 처리 로직 추가
          throw new Error("Maximum retry attempts reached. Empty response persists.");
        }
        setPocPersonaList(updatedPersonaList);

        await saveConversation(
          { changingConversation: { conversation: conversation, conversationStage: 3, pocPersonaList: updatedPersonaList, } }
        );

        setIsLoading(false);
        setIsLoadingTarget(false);
      }
    };

    fetchPersonaSelect();
  }, [targetSelectButtonState]);

  const handleConfirm = async () => {
    if (Object.keys(selectedPocTarget).length || Object.keys(selectedPocTargetState).length === 0) return;

    setConversationStage(3);
    setApproachPath(3);
    setSelectedPocTarget(selectedPocTargetState);

    const updatedConversation = [...conversation];
    updatedConversation.push(
      {
        type: "user",
        message: selectedPocTargetState.job === "아직 타겟 고객이 확실하지 않아요" ? "아직 비즈니스 타겟 고객을 확실하게 설정하지 못했어요" : `비즈니스 타겟은 *${selectedPocTargetState.job}* 입니다.`,
        expertIndex: selectedExpertIndex,
      },
      {
        type: "system",
        message: "소중한 정보 감사합니다. PoC를 설계해보겠습니다.",
        expertIndex: selectedExpertIndex,
      },
      {
        type: `poc_${selectedExpertIndex}`,
      }
    );
    setConversation(updatedConversation);

    await saveConversation(
      { changingConversation: { conversation: updatedConversation, conversationStage: 3, selectedPocTarget: selectedPocTargetState } }
    );
    setExpertButtonState(1);
  };

  return (
    <Wrapper>
      {isLoadingTarget ?
      <>
        <SkeletonTitle className="title-placeholder" />
        <SkeletonLine className="content-placeholder" />
        <SkeletonLine className="content-placeholder" />
        <Spacing />
        <SkeletonTitle className="title-placeholder" />
        <SkeletonLine className="content-placeholder" />
        <SkeletonLine className="content-placeholder" />
      </>
      :
      <>
        <Question>
          Q. 생각하고 계시는 비즈니스의 타겟 고객은 누구입니까?
        </Question>
        <OptionsContainer>
            {pocPersonaList.map((personaObj, index) => {
              const personaKey = `persona_${index + 1}`;
              const personaData = personaObj[personaKey];
              const jobObj = personaData.find(item => 'job' in item);
              const targetObj = personaData.find(item => 'target' in item);

              return (
                <Option
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  selected={selectedPocTargetState.index === index}
                  selectedPocTarget={selectedPocTarget}
                >
                  <Label
                    selectedPocTarget={selectedPocTarget} 
                    selected={selectedPocTargetState.index === index} 
                    htmlFor={personaKey}>
                      {jobObj?.job || "직업 정보 없음"}
                  </Label>
                  <p>{targetObj?.target || "타겟 정보 없음"}</p>
                </Option>
              );
            })}
          <Option
            key={5}
            onClick={() => handleOptionClick(5)}
            selected={selectedPocTargetState.job === "아직 타겟 고객이 확실하지 않아요"}
            selectedPocTarget={selectedPocTarget}
            isTargetUnknown
          >
            <img src={selectedPocTargetState.job !== "아직 타겟 고객이 확실하지 않아요" || Object.keys(selectedPocTarget).length ? images.iconQuestionMark : images.iconQuestionMark2} alt="" />
            아직 타겟 고객이 확실하지 않아요
          </Option>          
        </OptionsContainer>

        <ButtonWrap>
          <Button selectedPocTargetState={selectedPocTargetState} selectedPocTarget={selectedPocTarget} onClick={handleConfirm}>확인</Button>
        </ButtonWrap>
      </>
    }
    </Wrapper>
  );
};

export default MoleculePersonaSelect;

const Wrapper = styled.div`
  max-width:968px;
  // width:91.5%;
  padding: 32px 40px;
  margin:24px 0 0 50px;
  border-radius:15px;
  border:1px solid ${palette.outlineGray};
`;

const Question = styled.h2`
  font-size: 0.88rem;
  font-weight:700;
  text-align:left;
  margin-bottom: 20px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Option = styled.div`
  position:relative;
  display:flex;
  gap:12px;
  align-items:center;
  color: ${palette.gray800};
  justify-content: ${(props) => (props.isTargetUnknown ? "center" : "")};
  flex-direction:column;
  flex:1 1 30%;
  font-size:0.88rem;
  text-align: ${(props) => (props.isTargetUnknown ? "center" : "left")};
  padding: 20px;
  border-radius: 8px;
  cursor: ${(props) => (Object.keys(props.selectedPocTarget).length ? "default" : "pointer")};
  background-color: ${(props) =>
    props.selected
      ? Object.keys(props.selectedPocTarget).length
        ? "rgba(0,0,0,0.05)"
        : "rgba(4,83,244,0.05)"
      : palette.white};
  border: 1px solid ${(props) => (props.selected ? (Object.keys(props.selectedPocTarget).length ? palette.gray800 : palette.blue) : palette.lineGray)};
  transition:all .5s;

  p {
    color: ${(props) => (props.selected ? palette.gray800 : palette.gray500)};
    line-height:1.3;
  }
  
  img {
    margin-bottom: 5px;
    background-color: ${(props) => (!props.selected || Object.keys(props.selectedPocTarget).length ? "rgba(246, 246, 246, 1)" : "rgba(255, 255, 255, 1)")};
    border-radius: 50%;
    padding: 10px;
    width: 34px;
    height: 34px;
  }

  &:hover {
    border-color: ${(props) =>
      Object.keys(props.selectedPocTarget).length 
        // ? palette.gray800 
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
  color: ${(props) => (props.selected ? (Object.keys(props.selectedPocTarget).length ? palette.gray800 : palette.blue) : palette.gray800)};
  cursor: ${(props) => (Object.keys(props.selectedPocTarget).length ? "default" : "pointer")};

  &:before {
    width:20px;
    height:20px;
    flex-shrink:0;
    border-radius:50%;
    border:1px solid ${(props) => (props.selected ? (Object.keys(props.selectedPocTarget).length ? palette.gray800 : palette.blue) : palette.lineGray)};
    background-color: ${(props) => (props.selected ? (Object.keys(props.selectedPocTarget).length ? palette.gray800 : palette.blue) : palette.white)};
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

const ButtonWrap = styled.div`
  display:flex;
  justify-content:end;
  align-items:center;
`;

const Button = styled.button`
  min-width:100px;
  font-family: Pretendard, Poppins;
  font-size:0.88rem;
  color:${palette.white};
  line-height:22px;
  padding:8px 20px;
  margin-left:auto;
  margin-top: ${(props) => (
    props.selectedPocTarget && Object.keys(props.selectedPocTarget).length ? '0' : '32px'
  )};
  border-radius:8px;
  border:0;
  background: ${(props) => (
    !props.selectedPocTargetState.job 
    ? palette.lineGray 
    : (Object.keys(props.selectedPocTarget).length 
    ? palette.gray800 
    : palette.blue))};
  transition:all .5s;

  display: ${(props) => (
    Object.keys(props.selectedPocTarget).length ? 'none' : 'block')};
`;

const Spacing = styled.div`
  margin-bottom: 40px;
`;