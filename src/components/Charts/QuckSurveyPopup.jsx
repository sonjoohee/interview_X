import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";
import { Button } from "../../assets/styles/ButtonStyle";
import { Body1, Body2, Caption1 } from "../../assets/styles/Typography";
import { useAtom } from "jotai";
import { QUICK_SURVEY_STATIC_DATA } from "../../pages/AtomStates";
import images from "../../assets/styles/Images";

/**
 * QuickSurvey 설정을 위한 팝업 컴포넌트
 */
const QuckSurveyPopup = ({ 
  isOpen = false, 
  onClose = () => {}, 
  onSave = () => {} 
}) => {
  // 팝업 상태 관리
  const [isVisible, setIsVisible] = useState(isOpen);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", "", ""]);
  
  // AI로 다듬기 버튼 상태 관리
  const [showAiButton, setShowAiButton] = useState(false);
  
  // 새로운 입력 영역 상태 관리
  const [showInputArea, setShowInputArea] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [itemList, setItemList] = useState([]);
  
  // isOpen props가 변경될 때 상태 업데이트
  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  // 입력 내용 변경시 AI 버튼 표시 여부 체크
  useEffect(() => {
    // 모든 문항(질문 및 보기)에 텍스트가 입력되어 있는지 확인
    const questionHasText = questionText.trim() !== "";
    const allOptionsHaveText = options.every(option => option.trim() !== "");
    
    setShowAiButton(questionHasText && allOptionsHaveText);
  }, [questionText, options]);

  // 옵션 추가
  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, ""]);
    }
  };

  // 옵션 텍스트 변경
  const handleChangeOption = (e, index) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  // 옵션 삭제 함수 추가
  const handleDeleteOption = (index) => {
    if (options.length > 1) {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
    }
  };

  // 입력 영역 토글
  const toggleInputArea = () => {
    setShowInputArea(!showInputArea);
    if (showInputArea) {
      setInputValue("");
    }
  };
  
  // 아이템 추가
  const addItem = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      setItemList([...itemList, trimmedValue]);
      setInputValue("");
      // Keep the input area open after adding an item
    }
  };

  // AI로 다듬기 함수 
  const handleAiRefine = () => {
    // 실제 AI 다듬기 로직은 여기에 구현
    // API 호출 또는 다른 처리 로직 추가
  };

  // 팝업 닫기 처리
  const handleClose = () => {
    setIsVisible(false);
    setQuestionText("");
    setOptions(["", "", "", "", ""]);
    setShowInputArea(false);
    setInputValue("");
    setItemList([]);
    if (onClose) {
      onClose();
    }
  };

  // 설문 생성 처리
  const handleSave = () => {
    if (questionText.trim() === "") {
      alert("질문을 입력해주세요.");
      return;
    }

    const filledOptions = options.filter(option => option.trim() !== "");
    if (filledOptions.length < 2) {
      alert("최소 2개의 보기 문항을 입력해주세요.");
      return;
    }

    onSave({
      question: questionText,
      options: filledOptions,
      items: itemList // 새로 추가된 아이템 목록 전달
    });
    
    handleClose();
  };

  const createButtonActive = questionText.trim() !== "" && options.every(opt => opt.trim() !== "");

  if (!isVisible) return null;

  return (
    <PopupOverlay>
      <PopupContainer>
        <PopupHeader>
          <HeaderTitle>
            <HeaderTitleText>직접 설정하기</HeaderTitleText>
          </HeaderTitle>
          <CloseButton onClick={handleClose}>
            <CloseButtonIcon />
          </CloseButton>
        </PopupHeader>

        <HeaderSpacer />

        <PopupContent>
          <SectionTitle>질문 문장 작성</SectionTitle>
          <InputField 
            placeholder="원하는 질문이 무엇인지 직접 작성하고, 추가해보세요!"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            style={{ marginBottom: '32px' }}
          />

          <SectionTitle>보기 문항 추가</SectionTitle>
          <OptionsContainer>
            {options.map((option, index) => (
              <OptionItemWrapper key={index}>
                <InputField 
                  placeholder="핵심 가치를 작성해주세요 (예: 안전한 송금 등)"
                  value={option}
                  onChange={(e) => handleChangeOption(e, index)}
                />
                {/* 옵션이 2개 초과일 때만 삭제 아이콘 표시 */}
                {options.length > 1 && (
                  <DeleteButton onClick={() => handleDeleteOption(index)}>
                    <img src={images.Trash} alt="삭제" />
                  </DeleteButton>
                )}
              </OptionItemWrapper>
            ))}
            {options.length < 5 && (
              <AddOptionButton onClick={handleAddOption}>
                + 추가 하기 (최대 5개)
              </AddOptionButton>
            )}
          </OptionsContainer>
          
          {/* 새로운 아이템 섹션 */}
          <SectionTitle style={{ marginTop: '24px' }}>추가 항목</SectionTitle>
          <AddButton onClick={toggleInputArea}>
            + 추가 하기
          </AddButton>
          
          {showInputArea && (
            <InputAreaContainer>
              <InputField 
                placeholder="추가할 항목을 입력하세요"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addItem();
                  }
                }}
              />
              <CheckButton onClick={addItem}>
                <CheckIcon />
              </CheckButton>
            </InputAreaContainer>
          )}
          
          {itemList.length > 0 && (
            <ItemListContainer>
              {itemList.map((item, index) => (
                <ItemBox key={index}>{item}</ItemBox>
              ))}
            </ItemListContainer>
          )}
        </PopupContent>
        
        <Spacer />
        
        <Divider />

        <ButtonContainer>
          {/* AI로 다듬기 버튼 - 모든 문항에 텍스트가 있을 때만 표시 */}
          <div>
            {showAiButton && (
              <AiRefineButton onClick={handleAiRefine}>
                <MagicWandIcon />
                <span>AI로 다듬기</span>
              </AiRefineButton>
            )}
          </div>
          <CreateButton 
            onClick={handleSave}
            style={{ 
              backgroundColor: createButtonActive ? palette.primary : palette.gray300,
              cursor: createButtonActive ? "pointer" : "default"
            }}
          >
            질문 기반 서베이 생성
          </CreateButton>
        </ButtonContainer>
      </PopupContainer>
    </PopupOverlay>
  );
};

// MagicWandIcon SVG 컴포넌트
const MagicWandIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.65462 11.7031L3.70855 11.6831C4.42613 11.4164 4.96104 10.8058 5.13127 10.0591L5.30566 9.29422L5.48005 10.0591C5.65028 10.8058 6.18519 11.4164 6.90277 11.6831L6.9567 11.7031L6.90277 11.7232C6.18519 11.9899 5.65028 12.6004 5.48005 13.3471L5.30566 14.112L5.13127 13.3471C4.96104 12.6004 4.42613 11.9899 3.70855 11.7232L3.65462 11.7031Z" fill="#226FFF"/>
    <path d="M11.5288 5.98047L11.5624 5.96798C12.0096 5.80175 12.343 5.42119 12.4491 4.95579L12.5578 4.47902L12.6665 4.95579C12.7726 5.4212 13.106 5.80175 13.5533 5.96798L13.5869 5.98047L13.5533 5.99296C13.106 6.15918 12.7726 6.53974 12.6665 7.00515L12.5578 7.48192L12.4491 7.00515C12.343 6.53974 12.0096 6.15918 11.5624 5.99296L11.5288 5.98047Z" fill="#226FFF"/>
    <path d="M2.22643 8.29492L2.24574 8.28775C2.50261 8.19228 2.69409 7.97372 2.75503 7.70643L2.81745 7.43261L2.87988 7.70643C2.94081 7.97372 3.1323 8.19228 3.38917 8.28775L3.40847 8.29492L3.38917 8.3021C3.1323 8.39756 2.94081 8.61612 2.87988 8.88341L2.81745 9.15723L2.75503 8.88341C2.69409 8.61612 2.50261 8.39756 2.24574 8.3021L2.22643 8.29492Z" fill="#226FFF"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.56791 3.49279C4.81292 3.28969 5.17215 3.30645 5.39721 3.53147L8.71268 6.84657L8.55502 7.00431L7.37362 8.18629L7.22089 8.3391L3.84854 4.96508C3.59166 4.70807 3.61141 4.28568 3.89115 4.05379L4.56791 3.49279ZM6.84726 8.71291L3.48694 5.35093C3.00533 4.86908 3.00533 4.08785 3.48694 3.606L3.98466 3.10803C4.46628 2.62618 5.24712 2.62618 5.72874 3.10803L17.6291 15.0142C18.1107 15.4961 18.1107 16.2773 17.6291 16.7592L17.1313 17.2571C16.6811 17.7076 15.9693 17.7369 15.485 17.3452C15.4388 17.3105 15.3945 17.2721 15.3525 17.23L7.37362 9.24721L6.84342 8.71675L6.84726 8.71291ZM7.90382 8.71675L9.08522 7.53477L17.0641 15.5176C17.2529 15.7065 17.2529 16.0127 17.0641 16.2016L16.5664 16.6996C16.3776 16.8884 16.0715 16.8884 15.8827 16.6996L7.90382 8.71675Z" fill="#226FFF"/>
    <path d="M7.35962 8.69219L9.07121 6.97975L5.44137 3.34811C5.10617 3.01274 4.5627 3.01274 4.2275 3.34811L3.72978 3.84608C3.39457 4.18145 3.39457 4.72519 3.72978 5.06055L7.35962 8.69219Z" stroke="#226FFF" stroke-width="0.75"/>
  </svg>
);

// CloseButtonIcon SVG 컴포넌트 추가
const CloseButtonIcon = () => (
  <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6767 2.47245C16.1079 2.02132 16.1079 1.28988 15.6767 0.838745C15.2455 0.387609 14.5464 0.387609 14.1152 0.838745L7.99942 7.23754L1.8846 0.839765C1.45341 0.388629 0.754327 0.388629 0.323143 0.839765C-0.10804 1.2909 -0.10804 2.02234 0.323144 2.47347L6.43797 8.87124L1.03279 14.5265C0.601602 14.9777 0.601602 15.7091 1.03279 16.1602C1.46397 16.6114 2.16306 16.6114 2.59424 16.1602L7.99943 10.505L13.4056 16.1613C13.8368 16.6124 14.5359 16.6124 14.967 16.1613C15.3982 15.7101 15.3982 14.9787 14.967 14.5276L9.56088 8.87124L15.6767 2.47245Z" fill="#666666"/>
  </svg>
);

// CheckIcon SVG 컴포넌트 추가
const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12L10 17L19 8" stroke="#226FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// CloseButton 스타일 수정
const CloseButton = styled.div`
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default QuckSurveyPopup;

// 스타일 컴포넌트
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const PopupContainer = styled.div`
  width: 640px;
  height: 600px;
  background: ${palette.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px;
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const HeaderTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const HeaderTitleText = styled.div`
  font-family: "Pretendard", "Poppins";
  font-size: 20px;
  font-weight: 500;
  line-height: 1.3em;
  letter-spacing: -0.03em;
  color: ${palette.gray800};
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 0;
`;

const SectionTitle = styled.div`
  font-family: "Pretendard", "Poppins";
  font-size: 16px;
  font-weight: 500;
  line-height: 1.3em;
  letter-spacing: -0.03em;
  color: ${palette.gray700};
  margin-bottom: 12px;
  text-align: left;
`;

const InputField = styled.input`
  width: 100%;
  height: 41px;
  padding: 0 12px;
  border: 1px solid ${palette.outlineGray};
  border-radius: 10px;
  font-family: "Pretendard", "Poppins";
  font-size: 16px;
  font-weight: 500;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: ${palette.gray800};
  box-sizing: border-box;

  &::placeholder {
    color: ${palette.gray300};
  }

  &:focus {
    outline: none;
    border-color: ${palette.primary};
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 8px;
  height: 160px;
  box-sizing: border-box;
  overflow: hidden;
`;

const AddOptionButton = styled.div`
  width: 100%;
  height: 41px;
  padding: 0 12px;
  border: 1px solid ${palette.outlineGray};
  border-radius: 10px;
  background-color: ${palette.gray100};
  font-family: "Pretendard", "Poppins";
  font-size: 16px;
  font-weight: 500;
  line-height: 41px;
  letter-spacing: -0.03em;
  color: ${palette.gray300};
  text-align: left;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: ${palette.gray200};
  }
`;

// 추가 버튼
const AddButton = styled.button`
  background: none;
  border: 1px solid ${palette.outlineGray};
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  color: ${palette.gray700};
  margin-top: 8px;
  
  &:hover {
    background-color: ${palette.gray50};
  }
`;

// 입력 영역 컨테이너
const InputAreaContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 12px;
  gap: 8px;
`;

// 체크 버튼
const CheckButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  
  &:hover {
    opacity: 0.8;
  }
`;

// 아이템 리스트 컨테이너
const ItemListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 16px;
  gap: 8px;
`;

// 아이템 박스
const ItemBox = styled.div`
  padding: 8px 12px;
  background-color: ${palette.gray50};
  border-radius: 8px;
  font-size: 14px;
  color: ${palette.gray900};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${palette.outlineGray};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  margin-top: 32px;
`;

const CreateButton = styled.button`
  width: 200px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${palette.primary};
  color: ${palette.white};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${palette.primaryLight};
  }
`;

const Spacer = styled.div`
  width: 100%;
  flex: 1;
`;

const HeaderSpacer = styled.div`
  width: 100%;
  height: 32px;
`;

// 보기 문항에 휴지통 아이콘을 추가하기 위한 래퍼 컴포넌트
const OptionItemWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 41px;
`;

// 삭제 버튼 스타일
const DeleteButton = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 16px;
    height: 16px;
  }
  
  &:hover {
    opacity: 0.7;
  }
`;

// AI로 다듬기 버튼 스타일
const AiRefineButton = styled.button`
  width: 126px;
  height: 40px;
  background-color: ${palette.white};
  border: 1px solid ${palette.outlineGray};
  border-radius: 4px;
  padding: 0 12px;
  font-family: "Pretendard", "Poppins";
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${palette.primaryLightest};
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
  
  span {
    white-space: nowrap;
    color: ${palette.gray700};
  }
`; 