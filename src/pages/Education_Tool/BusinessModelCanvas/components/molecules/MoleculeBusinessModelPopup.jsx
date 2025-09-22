import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { palette } from "../../../../../assets/styles/Palette";
import { useAtom } from "jotai";
import {
  updateToolOnServer,
} from "../../../../../utils/indexedDB";
import { 
  BUSINESS_MODEL_CANVAS_SELECTED_POPUP_OPTIONS, 
  BUSINESS_MODEL_CANVAS_POPUP_OPTIONS ,
  BUSINESS_MODEL_CANVAS_GRAPH_ITEMS,
  BUSINESS_MODEL_CANVAS_INITIAL_GRAPH_DATA,
  TOOL_ID ,
  IS_LOGGED_IN,

} from "../../../../AtomStates";
import images from "../../../../../assets/styles/Images";
import { CheckBoxButton, RadioButton } from "../../../../../assets/styles/InputStyle";
import AtomPersonaLoader from "../../../../Global/atoms/AtomPersonaLoader";


const businessModelItems = [
  { id: 1, title: "고객군", value: "1고객군" },
  { id: 2, title: "가치 제안", value: "2가치 제안" },
  { id: 3, title: "채널", value: "3채널" },
  { id: 4, title: "고객관계", value: "4고객관계" },
  { id: 5, title: "수익원", value: "5수익원" },
  { id: 6, title: "핵심자원", value: "6핵심자원" },
  { id: 7, title: "핵심활동", value: "7핵심활동" },
  { id: 8, title: "핵심파트너십", value: "8핵심파트너십" },
  { id: 9, title: "비용구조", value: "9비용구조" }
];



const MoleculeBusinessModelPopup = ({ 
  isOpen = false, 
  
  onClose = () => {}, 
  onSave = () => {},
  currentModelId = 3, // 기본값으로 채널(id: 3) 설정
  isLoading,
  onCardSelect,
  selectedKeys = [],
  isReadOnly = false, // 읽기 전용 모드 추가
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentModel, setCurrentModel] = useState(businessModelItems.find(item => item.id === currentModelId) || businessModelItems[2]);
  const [userOptions, setUserOptions] = useState([]);
  const [inputFields, setInputFields] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [bmCanvasSelectedPopupOptions, setBMCanvasSelectedPopupOptions] = useAtom(BUSINESS_MODEL_CANVAS_SELECTED_POPUP_OPTIONS);
  const [BMCanvasPopupOptions, setBMCanvasPopupOptions] = useAtom(BUSINESS_MODEL_CANVAS_POPUP_OPTIONS);
  const [businessModelCanvasGraphItems, setBusinessModelCanvasGraphItems] = useAtom(BUSINESS_MODEL_CANVAS_GRAPH_ITEMS);
  const [bmCanvasInitialGraphData, setBMCanvasInitialGraphData] = useAtom(BUSINESS_MODEL_CANVAS_INITIAL_GRAPH_DATA);
  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  
const getTitles = (data, currentModelId) => {
  if (data[currentModelId - 1] && data[currentModelId - 1]) {

    return data[currentModelId - 1]?.map(item => item.title);
  }
  return [];
};

const titles = getTitles(bmCanvasInitialGraphData, currentModelId);


  // isOpen props가 변경될 때 상태 업데이트
  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  // 모델 ID가 변경될 때 현재 모델 업데이트
  useEffect(() => {
    const model = businessModelItems.find(item => item.id === currentModelId) || businessModelItems[2];
    setCurrentModel(model);
    setSelectedOption(null); // 모델 변경 시 선택 초기화
    setUserOptions([]); // 사용자 정의 옵션 초기화
    setInputFields([]); // 입력 필드 초기화
    setInputValues({}); // 입력 값 초기화
  }, [currentModelId]);

const handleClose = () => {
  if (isLoading) {
    return;
  }
  onClose();
}

const setData = async () => {
  // 적용하지 않고 닫을 때만 선택 초기화 (현재 작동안함)
  if (!Array.isArray(bmCanvasSelectedPopupOptions) || bmCanvasSelectedPopupOptions.length === 0) {
 
    setIsVisible(false);
    setSelectedOption(null);
    setUserOptions([]);
    setInputFields([]);
    setInputValues({});
    setBMCanvasSelectedPopupOptions([]);

    const newGraphItems = businessModelCanvasGraphItems.filter((item, index) => 
      index !== currentModelId - 1
    );



  setBusinessModelCanvasGraphItems(newGraphItems);

  await updateToolOnServer(
    toolId,
    {
      bmCanvasGraphItems: newGraphItems,
      // bmCanvasInitialGraphData: bmCanvasInitialGraphData,
    },
    isLoggedIn
  );
    
    if (onClose) {
      onClose(true); // true는 선택 초기화가 필요함을 나타냄
    }
  } else {
    // 이미 선택하고 적용한 항목이 있으면 선택 유지
    setIsVisible(false);
    setSelectedOption(null);
    setUserOptions([]);
    setInputFields([]);
    setInputValues({});
    setBMCanvasSelectedPopupOptions([]);
    if (onClose) {
      onClose(false); // false는 선택을 유지함을 나타냄
    }
  }
};


  // 옵션 선택 처리
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // 새 입력 필드 추가
  const handleAddInputField = () => {
    // 3개 모두 추가된 상태가 아니라면 입력 필드 추가
    if (userOptions.length < 3) {
      const newId = Date.now(); // 고유 ID 생성
      setInputFields([...inputFields, newId]);
      setInputValues({...inputValues, [newId]: ""}); // 새 입력 필드의 값 초기화
    }
  };

  // 입력 필드 값 변경 처리
  const handleInputChange = (id, value) => {
    setInputValues({...inputValues, [id]: value});
  };



  const handleAddUserOption = async (id) => {
    const value = inputValues[id]?.trim();

    if (value) {

  
      const updatedInitialGraphData = [...bmCanvasInitialGraphData];
      
      // business_model_canvas_report_education 처리
      if (!updatedInitialGraphData[currentModelId - 1]) {
        updatedInitialGraphData[currentModelId - 1] = {
          business_model_canvas_report_education: []
        };
      }
  
      const newItem = {
        title: value,
        description: "사용자가 직접 추가한 항목입니다."
      };
  
      if (!updatedInitialGraphData[currentModelId - 1]) {
        updatedInitialGraphData[currentModelId - 1] = [];
      }
  
      updatedInitialGraphData[currentModelId - 1].push(newItem);
      // userOptions 상태 업데이트 (화면 표시용 - 사용자 추가 항목의 "title" 문자열 배열)
      const userAddedItemTitles = updatedInitialGraphData[currentModelId - 1]
      .filter(item => item && item.description === "사용자가 직접 추가한 항목입니다.") // 사용자 추가 항목 필터링
      .map(item => item.title); // title만 추출
    setUserOptions(userAddedItemTitles);
      
      setBMCanvasInitialGraphData(updatedInitialGraphData);
      
      try {
        await updateToolOnServer(
          toolId,
          {
            bmCanvasInitialGraphData: updatedInitialGraphData,
          },
          isLoggedIn
        );
      } catch (error) {
        console.error("Error updating tool on server:", error);
      }
      
      setInputFields(inputFields.filter(fieldId => fieldId !== id));
      const newInputValues = { ...inputValues };
      delete newInputValues[id];
      setInputValues(newInputValues);
    }
  };




const handleDeleteUserOption = async (titleToDelete) => {

  const newUserOptionTitles = userOptions.filter(title => title !== titleToDelete);
  setUserOptions(newUserOptionTitles); // 필터링된 title 문자열 배열로 상태 업데이트

  const updatedInitialGraphData = bmCanvasInitialGraphData ? [...bmCanvasInitialGraphData] : [];

  if (updatedInitialGraphData[currentModelId - 1] && Array.isArray(updatedInitialGraphData[currentModelId - 1])) {
    const newModelData = updatedInitialGraphData[currentModelId - 1].filter(item => {

      return !(item.title === titleToDelete && item.description === "사용자가 직접 추가한 항목입니다.");
    });

    updatedInitialGraphData[currentModelId - 1] = newModelData;
    setBMCanvasInitialGraphData(updatedInitialGraphData);


    try {
      await updateToolOnServer(
        toolId,
        {
          bmCanvasInitialGraphData: updatedInitialGraphData,
        },
        isLoggedIn
      );
    } catch (error) {
    }
  } else {
    console.warn(`bmCanvasInitialGraphData for model ID ${currentModelId} not found or not an array. Cannot update after deletion.`);
  }
};


 // 현재 모델의 데이터 가져오기
 const handleApply = async () => {
  if (bmCanvasSelectedPopupOptions.length === 0) {
    return;
  }

  try {
    const newGraphItems = [...businessModelCanvasGraphItems];
    
    if (currentModelId === 1 || currentModelId === 2) {
      // customer_segments인 경우 (기존 로직 유지)
      const newItemsArray = bmCanvasSelectedPopupOptions.map(option => {
   
        let selectedTitle = typeof option === 'string' ? option : (option && option.title);
    
        const initialDataItems = Array.isArray(bmCanvasInitialGraphData[currentModelId - 1]) ? bmCanvasInitialGraphData[currentModelId - 1] : [];

        const originalItem = initialDataItems.find(item => item && item.title === selectedTitle);
        
        return originalItem || { 
          title: selectedTitle || "제목 없음", // option이 객체이고 title이 없을 수도 있으니 대비
          description: (originalItem && originalItem.description) || "설명 없음"
        };
      });

      // newGraphItems[0] (또는 currentModelId - 1)에 배열 자체를 할당합니다.
      newGraphItems[currentModelId - 1] = newItemsArray; 
    } else {
      // 다른 섹션인 경우 business_model_canvas_report_education 구조로 저장
      const newItems = bmCanvasSelectedPopupOptions.map(option => {
        const originalItem = bmCanvasInitialGraphData[currentModelId - 1]?.find(item => item.title === option);
        return originalItem || { 
          type: option.type || "",
          approach: option.approach || "",
          title: option.title || option,
          description: option.description || ""
        };
      });

      newGraphItems[currentModelId - 1] = newItems;
    }

    // 서버 업데이트
    await updateToolOnServer(
      toolId,
      {
        bmCanvasGraphItems: newGraphItems,
      },
      isLoggedIn
    );
    // handleClose();
    setIsVisible(false);
    setData();

    // 상태 업데이트
    setBusinessModelCanvasGraphItems(newGraphItems);
    
    // 적용 완료를 부모 컴포넌트에 알림
    if (onSave) {
      onSave({ modelId: currentModelId, data: newGraphItems });
    }
  } catch (error) {
    console.error('Error applying changes:', error);
  }
};


  // 엔터키 입력시 옵션 추가
  const handleKeyDown = (id, e) => {
    if (e.key === 'Enter' && inputValues[id]?.trim()) {
      handleAddUserOption(id);
    }
  };

  // 입력 필드 값이 존재하는지 확인하는 함수
  const isInputFieldEmpty = (id) => !inputValues[id]?.trim();

  const savedUserOptions = bmCanvasInitialGraphData[currentModelId - 1]
  ? bmCanvasInitialGraphData[currentModelId - 1]?.filter(item => item.description === "사용자가 직접 추가한 항목입니다.")
  : [];


const hideAddButton =
  userOptions?.length + inputFields?.length >= 3 ||
  savedUserOptions?.length + inputFields?.length >= 3;

  if (!isVisible) return null;
  const validSelectedKeys = Array.isArray(selectedKeys) ? selectedKeys : [];
// console.log("validSelectedKeys", validSelectedKeys)

  // 각 ID에 따른 안내 문구 설정
  const getPromptByModelId = (id) => {
    switch (id) {
      case 1:
        return '주요 타겟 페르소나는 누구인가요?';
      case 2:
        return '고객이 기대하는 가치와 차별화된 가치는 무엇인가요?';
      case 3:
        return '고객에게 가치를 전달하는 방식과 접점은 무엇인가요?';
      case 4:
        return '고객과 어떤 관계를 맺고 유지할 계획인가요?';
      case 5:
        return '수익은 어떤 방식과 구조로 발생하나요?';
      case 6:
        return '비즈니스 운영에 꼭 필요한 자산은 무엇인가요?';
      case 7:
        return '비즈니스를 위해 꼭 수행해야 할 핵심 활동은 무엇인가요?';
      case 8:
        return '비즈니스에 필요한 외부 협력자나 파트너는 누구인가요?';
      case 9:
        return '주로 발생하는 핵심 비용은 무엇인가요?';
      default:
        return '원하는 항목을 선택하세요';
    }
  };

  return (
    <PopupOverlay>

      <PopupContainer>
        <PopupHeader>
          <HeaderTitle>
            <NumberCircle>{currentModel.id}</NumberCircle>
            <HeaderTitleText>{currentModel.title}</HeaderTitleText>
          </HeaderTitle>
          <CloseButton onClick={handleClose}>
            <CloseButtonIcon />
          </CloseButton>
        </PopupHeader>

        <HeaderSpacer />

        {isLoading ? (
         <div
         style={{
           width: "100%",
           display: "flex",
           justifyContent: "center",
           minHeight: "200px",
           alignItems: "center",
           marginTop: "50px",
         }}
       >
          <AtomPersonaLoader message="구성 요소 선별 중입니다 " />
        </div>
        ) : (
          <>
            <PopupContent>
              <SectionTitle>{getPromptByModelId(currentModel.id)}</SectionTitle>
              <OptionsContainer>
               
                     {titles?.map((title, index) => (
                      
                  <OptionItem key={`title-${index}`} onClick={isReadOnly ? undefined : () => handleOptionSelect(title)}>
                    <OptionFlex>
                      <div>
                        <CheckBoxButton
                          id={index}
                          name={index}
                          // checked={selectedKeys?.includes(title)}
                          checked={validSelectedKeys.includes(title)}
                          onChange={isReadOnly ? undefined : () => onCardSelect && onCardSelect(title)}
                          disabled={isReadOnly}
                        />
                      </div>
                      <OptionText>{title}</OptionText>
                      {userOptions.includes(title) && !isReadOnly && (
                      <DeleteButton 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteUserOption(title);
                        }}
                      />
                      )}
                    </OptionFlex>
                  </OptionItem>
                ))}
                    
                {/* 입력 필드 */}
                {!isReadOnly && inputFields.map(id => (
                  <OptionItem key={`input-${id}`} as="div">
                    <OptionFlex>
                      <InputField 
                        placeholder={`${currentModel.title} 항목을 직접 입력하세요`}
                        value={inputValues[id] || ""}
                        onChange={(e) => handleInputChange(id, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(id, e)}
                        autoFocus
                        disabled={isReadOnly}
                      />
                      <CheckButton 
                        onClick={() => handleAddUserOption(id)}
                        disabled={isReadOnly || isInputFieldEmpty(id)}
                        active={!isReadOnly && !isInputFieldEmpty(id)}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L10 17L19 8" 
                            stroke={isInputFieldEmpty(id) ? "#E0E4EB" : "#226FFF"} 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"/>
                        </svg>
                      </CheckButton>
                      {/* <DeleteButton 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteUserOption(id);
                        }}
                      />   */}
                    </OptionFlex>
                  </OptionItem>
                ))}
                
                {!hideAddButton && !isReadOnly && (
                  <AddOptionItem onClick={handleAddInputField}>
                    + 직접 추가하기 (최대 3개)
                  </AddOptionItem>
                )}
              </OptionsContainer>
            </PopupContent>
            
            <BottomSpacer />
            
            <Divider />

            <ButtonContainer>
              <div></div> {/* 왼쪽 공간 유지용 */}
              {/* <ApplyButton 
                isActive={!!selectedOption}
                onClick={handleApply}ㄴㄴ
                disabled={!selectedOption}
              > */}
               <ApplyButton 
                isActive={!isReadOnly && selectedKeys.length > 0}
                onClick={isReadOnly ? undefined : handleApply}
                disabled={isReadOnly || selectedKeys.length === 0}
              >
                {isReadOnly ? "확인" : "적용하기"}
              </ApplyButton>
            </ButtonContainer>
          </>
        )}
      </PopupContainer>
          
    </PopupOverlay>
  );
};

// CloseButtonIcon SVG 컴포넌트
const CloseButtonIcon = () => (
  <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M15.6767 2.47245C16.1079 2.02132 16.1079 1.28988 15.6767 0.838745C15.2455 0.387609 14.5464 0.387609 14.1152 0.838745L7.99942 7.23754L1.8846 0.839765C1.45341 0.388629 0.754327 0.388629 0.323143 0.839765C-0.10804 1.2909 -0.10804 2.02234 0.323144 2.47347L6.43797 8.87124L1.03279 14.5265C0.601602 14.9777 0.601602 15.7091 1.03279 16.1602C1.46397 16.6114 2.16306 16.6114 2.59424 16.1602L7.99943 10.505L13.4056 16.1613C13.8368 16.6124 14.5359 16.6124 14.967 16.1613C15.3982 15.7101 15.3982 14.9787 14.967 14.5276L9.56088 8.87124L15.6767 2.47245Z" fill="#666666"/>
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
  height: 576px;
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
  gap: 0;
`;

const NumberCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${palette.gray800};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  font-family: "Pretendard", "Poppins";
  font-size: 12px;
  font-weight: 600;
  color: white;
  flex-shrink: 0;
`;

const HeaderTitleText = styled.div`
  font-family: "Pretendard", "Poppins";
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3em;
  letter-spacing: -0.03em;
  color: ${palette.gray700};
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 0;
  width: 100%;
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

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-height: 320px; /* 350에서 30 줄임 */
  overflow-y: auto;
  overflow-x: hidden; // 가로 스크롤 방지
  padding-right: 8px;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${palette.gray300};
    border-radius: 4px;
  }
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-radius: 8px;
  border: 1px solid ${palette.outlineGray};
  background-color: ${palette.white};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${palette.primary};
    background-color: ${palette.gray50};
  }
`;

const AddOptionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-radius: 8px;
  border: 1px solid ${palette.outlineGray};
  background-color: ${palette.gray100};
  color: ${palette.gray300};
  font-family: "Pretendard", "Poppins";
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: ${palette.gray200};
    border-color: ${palette.outlineGray}; /* 호버 시 테두리 색상 변경 없음 */
  }
  
  /* 명시적으로 아웃라인 제거 */
  outline: none !important;
  
  &:focus, &:active {
    outline: none !important;
    border-color: ${palette.outlineGray}; /* 포커스/활성화 시에도 테두리 색상 변경 없음 */
  }
`;

const OptionFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  position: relative;
`;


const OptionText = styled.div`
  font-family: "Pretendard", "Poppins";
  font-size: 16px;
  font-weight: 400;
  color: ${palette.gray800};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 44px); // 휴지통 아이콘(20px) + 간격(24px)
`;


const DeleteButton = styled.button`
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: none;
  background: url(${images.Trash}) no-repeat center;
  background-size: contain;
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;


const CheckButton = styled.button`
  position: absolute;
  right: 0;
  background: none;
  border: none;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.active ? 'pointer' : 'default'};
  
  /* 아웃라인 제거 */
  outline: none !important;
  
  &:focus, &:active {
    outline: none !important;
  }
  
  svg {
    /* 체크 아이콘 자체에 마진 제거 */
    display: block;
    margin: 0;
    padding: 0;
  }
`;

const InputField = styled.input`
  width: calc(100% - 24px); /* 체크버튼 공간 확보 */
  height: 100%;
  padding: 0;
  border: none;
  font-family: "Pretendard", "Poppins";
  font-size: 16px;
  font-weight: 400;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: ${palette.gray800};
  background: transparent;
  
  &::placeholder {
    color: ${palette.gray300};
  }

  &:focus {
    outline: none;
  }
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

const ApplyButton = styled.button`
  width: 220px;
  height: 40px;
  border-radius: 4px;
  background-color: ${props => props.isActive ? palette.primary : palette.gray300};
  font-family: "Pretendard", "Poppins";
  font-size: 16px;
  font-weight: 500;
  line-height: 1.2em;
  letter-spacing: -0.03em;
  color: ${palette.white};
  border: none;
  cursor: ${props => props.isActive ? 'pointer' : 'default'};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.isActive ? `${palette.primaryDark}` : palette.gray300};
  }
`;

const HeaderSpacer = styled.div`
  width: 100%;
  height: 32px;
`;

// 하단 여백 추가
const BottomSpacer = styled.div`
  width: 100%;
  height: 30px; // 리스트 영역에서 줄인 30px 만큼 하단 여백 추가
`;






export default MoleculeBusinessModelPopup; 