import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";

import images from "../../assets/styles/Images";
import { palette } from "../../assets/styles/Palette";
import { Button } from "../../assets/styles/ButtonStyle";
import { CustomInput, CustomTextarea } from "../../assets/styles/InputStyle";
import OrganismLeftSideBar from "../Expert_Insight/components/organisms/OrganismLeftSideBar";
import Header from "./IncHeader";
import Sidebar from "./IncSidebar";
import StepIndicator from "./IncStepIndicator";
import PersonaCard from "./PersonaCard";
import PopupWrap from "../../assets/styles/Popup";
import ToastPopupWrap from "../../assets/styles/ToastPopup";


const PageBusinessAnalysis = () => {
  const [showEditCard, setShowEditCard] = useState(false);
  const handleEditClick = () => {
    setShowEditCard(!showEditCard);
  };

  const [state, setState] = useState({
    showPersona: false,
    showInterview: false,
    showCustomizePersona: false,
    selectedInterviewType: '',
    activeCategory: 1,
    showCardContent: true,
    showEditCard: false,
    showCustomModal: false,
    showInterviewReady: false,
    progress: 25,
    steps: [
      { number: 1, label: '비즈니스 분석', active: true },
      { number: 2, label: '맞춤 페르소나 추천', active: false },
      { number: 3, label: '인터뷰 방법 선택', active: false },
      { number: 4, label: '페르소나와 인터뷰', active: false },
      { number: 5, label: '의견 분석', active: false }
    ],
    inputs: {
      field1: { value: "쉽고 빠른 개인 금융업무 지원 모바일 서비스", isValid: false, isError: false, errorMessage: "" },
      field2: { value: "이 애플리케이션은 사용자가 쉽고 빠르게 송금 및 이체를 할 수 있도록 돕는 것을 목표로 합니다.", isValid: false, isError: false, errorMessage: "" },
      field3: { value: "", isValid: false, isError: false, errorMessage: "" }
    }
  });

  const getInputStatus = (field) => {
    if (field.isError) return 'error';
    if (field.isValid) return 'valid';
    return 'default';
  }

  const handleChange = (e, fieldName) => {
    const newValue = e.target.value;
    validateInput(newValue, fieldName);
    adjustTextareaHeight(e.target);
  };

  const validateInput = (value, fieldName) => {
    setState(prev => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        [fieldName]: {
          ...prev.inputs[fieldName],
          value: value,
          isError: value.length < 3,
          isValid: value.length >= 3,
          errorMessage: value.length < 3 ? "최소 3자 이상 입력해주세요." : ""
        }
      }
    }));
  };

  const adjustTextareaHeight = (element) => {
    if (element) {
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    }
  };

  const textareaRef = useRef(null);

  const toggleCardContent = () => {
    setState(prev => ({
      ...prev,
      showCardContent: !prev.showCardContent
    }));
  };

  return (
    <>
      <ContentsWrap>
        <OrganismLeftSideBar />

        <Header />

        <MainContent>
          <AnalysisWrap>
            <MainSection>
              <Title>
                <h3>비즈니스 분석</h3>
                <ButtonGroup>
                  {showEditCard ? (
                    <IconButton onClick={handleEditClick}>
                      <img src={images.IconRepeatSquare} alt="저장하기" />
                      <span>저장하기</span>
                    </IconButton>
                  ) : (
                    <>
                      <IconButton>
                        <img src={images.IconRepeatSquare} alt="재생성" />
                        <span>재생성하기</span>
                      </IconButton>
                      <IconButton onClick={handleEditClick}>
                        <img src={images.IconRepeatSquare} alt="수정하기" />
                        <span>수정하기</span>
                      </IconButton>
                    </>
                  )}
                </ButtonGroup>
              </Title>

              <CardWrap>
                {showEditCard ? (
                  <Card Edit>
                    <FormEdit>
                      <span>비즈니스 명</span>
                      <FormBox status={getInputStatus(state.inputs.field1)}>
                        <CustomInput Edit
                          type="text" 
                          placeholder="비즈니스 명을 입력해주세요."
                          value={state.inputs.field1.value}
                          onChange={(e) => handleChange(e, 'field1')}
                          status={getInputStatus(state.inputs.field1)}
                        />
                      </FormBox>
                    </FormEdit>

                    <FormEdit>
                      <span>태그</span>
                      <FormBox>
                        <TagWrap>
                          <Tag color="Red" />
                          <Tag color="LavenderMagenta" />
                          <Tag color="Amethyst" />
                        </TagWrap>
                      </FormBox>
                    </FormEdit>

                    <FormEdit>
                      <span>비즈니스 설명</span>
                      <FormBox status={getInputStatus(state.inputs.field2)}>
                        <CustomTextarea Edit 
                          ref={textareaRef}
                          value={state.inputs.field2.value}
                          onChange={(e) => handleChange(e, 'field2')}
                          status={getInputStatus(state.inputs.field2)}
                          style={{ height: 'auto', overflow: 'hidden', resize: 'none' }}
                        />

                        <EditButtonGroup>
                          <IconButton>
                            <img src={images.ClockCounterclockwise} alt="" />
                            <span>이전으로 되돌리기</span>
                          </IconButton>
                          <IconButton>
                            <img src={images.MagicStick} alt="" />
                            <span>AI로 다듬기</span>
                          </IconButton>
                        </EditButtonGroup>
                      </FormBox>
                    </FormEdit>
                  </Card>
                ) : (
                  <Card>
                    <CardTitle>
                      <h2>쉽고 빠르게 송금 및 이체 할 수 있는 어플리케이션</h2>
                      <TagWrap>
                        <Tag color="Red" />
                        <Tag color="LavenderMagenta" />
                        <Tag color="Amethyst" />
                      </TagWrap>
                      {state.showInterview && (
                        <ToggleButton 
                          showContent={state.showCardContent}
                          onClick={toggleCardContent}
                        >
                          {state.showCardContent ? '' : ''}
                        </ToggleButton>
                      )}
                    </CardTitle>
                    {state.showCardContent && (
                      <CardContent>
                        <p>이 애플리케이션은 사용자가 쉽고 빠르게 송금 및 이체를 할 수 있도록 돕는 것을 목표로 합니다. 이를 통해 복잡한 금융 절차를 간소화하고 사용자에게 편리함을 제공합니다.</p>
                        <p>주요 특징으로는 사용 편의성을 극대화한 직관적인 UI/UX, 빠른 송금 속도, 저렴한 수수료, 그리고 사용자 맞춤형 알림 서비스 등이 있습니다. 이러한 특징들은 사용자에게 최상의 경험을 제공하며 경쟁사 대비 차별화된 가치를 제안합니다.<br />
                        주요 특징으로는 사용 편의성을 극대화한 직관적인 UI/UX, 빠른 송금 속도, 저렴한 수수료, 그리고 사용자 맞춤형 알림 서비스 등이 있습니다. 이러한 특징들은 사용자에게 최상의 경험을 제공하며 경쟁사 대비 차별화된 가치를 제안합니다.</p>
                      </CardContent>
                    )}
                  </Card>
                )}

                <CreateCard>
                  <p>
                    <img src={images.PeopleChatSquareFill} alt="" />
                    나의 비즈니스 고객은 누구일까요? 그리고 어떤 생각을 하고 있을까요?<br />당신의 타겟 고객에게 바로 물어보세요
                  </p>

                  <Button Large Primary Fill Round>
                    맞춤 페르소나 생성
                    <img src={images.MagicStickFillWhite} alt="" />
                  </Button>
                </CreateCard>
              </CardWrap>
            </MainSection>

            <Sidebar />
          </AnalysisWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PageBusinessAnalysis;

const ContentsWrap = styled.div`
  position: relative;
  // width: ${(props) => (props.isMobile ? "100%" : "calc(100% - 40px)")};
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  gap: ${(props) => (props.isMobile ? "20px" : "40px")};
  padding: ${(props) => (props.isMobile ? "20px" : "0")};
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  min-height: 100vh;
  width: 100%;
  justify-content:${props => {
    if (props.MainSearch) return `center`;
    else return `flex-start`;
  }};
  margin: 57px auto 40px;
  // padding: ${(props) => (props.isMobile ? "0" : "0 20px")};
`;

const AnalysisWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 16px;
  margin-top:44px;
  overflow: visible;
`;

const MainSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${props => {
    if (props.Column) return `column`;
    else return `row`;
  }};
  align-items: ${props => {
    if (props.Column) return `flex-start`;
    else return `center`;
  }};
  gap: ${props => {
    if (props.Column) return `8px`;
    else return `0`;
  }};
  width: 100%;

  h3 {
    font-weight: 500;
    color: ${palette.gray800};
  }

  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 0.88rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray500};

    span {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      color: ${palette.primary};
      cursor: pointer;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const EditButtonGroup = styled(ButtonGroup)`
  justify-content: end;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Pretendard', 'Poppins';
  font-size: 0.75rem;
  color: ${palette.primary};
  padding: 4px 8px;
  border: none;
  background: none;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }
`;

const CardWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 24px;
  border-radius: 15px;
  border: 1px solid ${palette.outlineGray};
  background: ${palette.white};
`;

const CreateCard = styled(Card)`
  align-items: center;
  padding: 44px 24px;

  p {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    line-height: 1.5;
    color: ${palette.gray500};
  }
`;

const CardTitle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  h2 {
    font-size: 1.25rem;
    font-weight: 500;
    color: ${palette.gray800};
  }
`;

const FormEdit = styled.div`
  display: flex;
  flex-direction:column;
  align-items:flex-start;
  gap:8px;

  > span {
    font-weight: 300;
    line-height:1.5;
    color:${palette.gray700};
  }
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap:32px;
  width:100%;
  padding:16px;
  border-radius:10px;
  border: 1px solid ${props => 
    props.status === 'error' ? palette.error : palette.outlineGray};
  transition: all .5s;

  &:focus-within {
    border: 1px solid ${palette.primary};
    box-shadow: 0 0 8px 0 rgba(34, 111, 255, 0.5);
  }
`;

const TagWrap = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.span`
  font-size: 0.88rem;
  line-height: 1.5;
  padding: 4px 12px;
  border-radius: 15px;

  &::before {
    content: "${props => {
      switch(props.color) {
        case 'Red': return '광고, 마케팅';
        case 'LavenderMagenta': return '교육';
        case 'Amethyst': return '금융, 보험, 핀테크';
        case 'VistaBlue': return '게임';
        case 'BlueYonder': return '모빌리티, 교통';
        case 'MidnightBlue': return '물류';
        case 'ButtonBlue': return '부동산, 건설';
        case 'ButtonBlue': return '뷰티, 화장품';
        case 'MiddleBlueGreen': return 'AI, 딥테크, 블록체인';
        case 'GreenSheen': return '소셜미디어, 커뮤니티';
        case 'TropicalRainForest': return '여행, 레저';
        case 'DollarBill': return '유아, 출산';
        case 'Olivine': return '인사, 비즈니스, 법률';
        case 'ChineseGreen': return '제조, 하드웨어';
        case 'Jonquil': return '커머스';
        case 'PastelOrange': return '콘텐츠, 예술';
        case 'Tangerine': return '통신, 보안, 데이터';
        case 'Copper': return '패션';
        case 'Shadow': return '푸드, 농업';
        case 'Tuscany': return '환경, 에너지';
        case 'VeryLightTangelo': return '홈리빙, 펫';
        case 'Orange': return '헬스케어, 바이오';
        case 'CarnationPink': return '피트니스, 스포츠';
        default: return '';
      }
    }}";
  }
  
  ${({ color }) => {
    switch(color) {
      case 'Red':
        return `
          color: #E90102;
          background: rgba(233, 1, 2, 0.06);
        `;
      case 'LavenderMagenta':
        return `
          color: #ED7EED;
          background: rgba(237, 126, 237, 0.06);
        `;
      case 'Amethyst':
        return `
          color: #8B61D1;
          background: rgba(139, 97, 209, 0.06);
        `;
      case 'VistaBlue':
        return `
          color: #8B61D1;
          background: rgba(125, 140, 225, 0.06);
        `;
      case 'BlueYonder':
        return `
          color: #8B61D1;
          background: rgba(84, 113, 171, 0.06);
        `;
      case 'MidnightBlue':
        return `
          color: #03458F;
          background: rgba(3, 69, 143, 0.06);
        `;
      case 'ButtonBlue':
        return `
          color: #20B1EA;
          background: rgba(32, 177, 234, 0.06);
        `;
      case 'CeruleanFrost':
        return `
          color: #5E9EBF;
          background: rgba(94, 158, 191, 0.06);
        `;
      case 'MiddleBlueGreen':
        return `
          color: #7DCED2;
          background: rgba(125, 206, 210, 0.06);

        `;
      case 'GreenSheen':
        return `
          color: #74B49C;
          background: rgba(116, 180, 156, 0.06);
        `;
      case 'TropicalRainForest':
        return `
          color: #027355;
          background: rgba(2, 115, 85, 0.06);
        `;
      case 'DollarBill':
        return `
          color: #8DC955;
          background: rgba(141, 201, 85, 0.06);
        `;
      case 'Olivine':
        return `
          color: #AABC76;
          background: rgba(170, 188, 118, 0.06);
        `;
      case 'ChineseGreen':
        return `
          color: #C7D062;
          background: rgba(199, 208, 98, 0.06);
        `;
      case 'Jonquil':
        return `
          color: #F7CD17;
          background: rgba(247, 205, 23, 0.06);
        `; 
      case 'PastelOrange':
        return `
          color: #FFBB52;
          background: rgba(255, 187, 82, 0.06);
        `;
      case 'Tangerine':
        return `
          color: #F48D0B;
          background: rgba(244, 141, 11, 0.06);
        `;
      case 'Copper':
        return `
          color: #BC742F;
          background: rgba(188, 116, 47, 0.06);
        `;
      case 'Shadow':
        return `
          color: #8C725B;
          background: rgba(140, 114, 91, 0.06);
        `;
      case 'Tuscany':
        return `
          color: #B1A098;
          background: rgba(177, 160, 152, 0.06);
        `;
      case 'VeryLightTangelo':
        return `
          color: #FAAD80;
          background: rgba(250, 173, 128, 0.06);
        `;
      case 'Orange':
        return `
          color: #FC6602;
          background: rgba(252, 102, 2, 0.06);
        `;
      case 'CarnationPink':
        return `
          color: #FFA8B9;
          background: rgba(255, 168, 185, 0.06);
        `;
      default:
        return '';
    }
  }}
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Pretendard', 'Poppins';
  font-size: 0.75rem;
  color: ${palette.primary};
  padding: 4px 8px;
  border-radius: 100px;
  border: none;
  background: ${palette.chatGray};
  cursor: pointer;

  &:before {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: ${props => props.showContent 
      ? 'translate(-50%, -50%) rotate(225deg)' 
      : 'translate(-50%, -50%) rotate(45deg)'};
    width: 10px;
    height: 10px;
    border-bottom: 2px solid ${palette.gray300};
    border-right: 2px solid ${palette.gray300};
    transition: all .5s;
    content: '';
  }
`;

const CardContent = styled.div`
  font-weight: 300;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;

  p + p {
    margin-top: 20px;
  }
`;
