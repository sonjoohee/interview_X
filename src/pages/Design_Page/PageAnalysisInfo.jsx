import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";
import images from "../../assets/styles/Images";
import { CustomInput, CustomTextarea } from "../../assets/styles/InputStyle";

const PageAnalysisInfo = ({ showButtons = false }) => {
  // 상태 관리
  const [isEditMode, setIsEditMode] = useState(false);
  const [showCardContent, setShowCardContent] = useState(true);
  const [showInterview, setShowInterview] = useState(true);
  const [inputs, setInputs] = useState({
    field1: {
      value: '쉽고 빠르게 송금 및 이체 할 수 있는 어플리케이션',
      isValid: true,
      error: null
    },
    field2: {
      value: '이 애플리케이션은 사용자가 쉽고 빠르게 송금 및 이체를 할 수 있도록 돕는 것을 목표로 합니다. 이를 통해 복잡한 금융 절차를 간소화하고 사용자에게 편리함을 제공합니다.\n\n주요 특징으로는 사용 편의성을 극대화한 직관적인 UI/UX, 빠른 송금 속도, 저렴한 수수료, 그리고 사용자 맞춤형 알림 서비스 등이 있습니다. 이러한 특징들은 사용자에게 최상의 경험을 제공하며 경쟁사 대비 차별화된 가치를 제안합니다.',
      isValid: true,
      error: null
    }
  });

  // 입력 상태 확인 함수
  const getInputStatus = (field) => {
    if (field.error) return 'error';
    if (field.isValid) return 'valid';
    return 'normal';
  };

  // 입력 핸들러
  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setInputs(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value,
        isValid: value.length > 0,
        error: value.length === 0 ? '필수 입력 항목입니다.' : null
      }
    }));
  };

  // 토글 핸들러
  const toggleCardContent = () => {
    setShowCardContent(prev => !prev);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    setInputs({
      field1: {
        value: '쉽고 빠르게 송금 및 이체 할 수 있는 어플리케이션',
        isValid: true,
        error: null
      },
      field2: {
        value: '이 애플리케이션은 사용자가 쉽고 빠르게 송금 및 이체를 할 수 있도록 돕는 것을 목표로 합니다. 이를 통해 복잡한 금융 절차를 간소화하고 사용자에게 편리함을 제공합니다.\n \n주요 특징으로는 사용 편의성을 극대화한 직관적인 UI/UX, 빠른 송금 속도, 저렴한 수수료, 그리고 사용자 맞춤형 알림 서비스 등이 있습니다. 이러한 특징들은 사용자에게 최상의 경험을 제공하며 경쟁사 대비 차별화된 가치를 제안합니다.',
        isValid: true,
        error: null
      }
    });
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
  };

  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(Math.max(textarea.scrollHeight, 200), 500);
      textarea.style.height = newHeight + 'px';
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [inputs.field2.value]);

  return (
    <>
      <Title>
        <h3>비즈니스 분석</h3>
        {showButtons && (
          <ButtonGroup>
            {isEditMode ? (
              <IconButton onClick={handleSaveClick}>
                <img src={images.FolderArrowDown} alt="저장하기" />
                <span>저장하기</span>
              </IconButton>
            ) : (
              <>
                <IconButton>
                  <img src={images.IconRepeatSquare} alt="재생성" />
                  <span>재생성하기</span>
                </IconButton>
                <IconButton onClick={handleEditClick}>
                  <img src={images.PencilSquare} alt="수정하기" />
                  <span>수정하기</span>
                </IconButton>
              </>
            )}
          </ButtonGroup>
        )}
      </Title>

      {isEditMode ? (
        <Card Edit>
          <FormEdit>
            <span>비즈니스 명</span>
            <FormBox status={getInputStatus(inputs.field1)}>
              <CustomInput Edit
                type="text" 
                placeholder="비즈니스 명을 입력해주세요."
                value={inputs.field1.value}
                onChange={(e) => handleChange(e, 'field1')}
                status={getInputStatus(inputs.field1)}
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
            <FormBox status={getInputStatus(inputs.field2)}>
              <CustomTextarea Edit 
                ref={textareaRef}
                value={inputs.field2.value}
                onChange={(e) => {
                  handleChange(e, 'field2');
                  adjustHeight();
                }}
                status={getInputStatus(inputs.field2)}
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
            {showInterview && (
              <ToggleButton 
                showContent={showCardContent}
                onClick={toggleCardContent}
              >
                {showCardContent ? '' : ''}
              </ToggleButton>
            )}
          </CardTitle>
          {showCardContent && (
            <CardContent>
              <p>{inputs.field2.value}</p>
            </CardContent>
          )}
        </Card>
      )}
    </>
  );
};

export default PageAnalysisInfo;

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
        case 'Olivine': return '인사, 비즈니스';
        case 'ChineseGreen': return '제조, 하드웨어';
        case 'Jonquil': return '커머스';
        case 'PastelOrange': return '콘텐츠, 예술';
        case 'Tangerine': return '통신, 보안, 데이터';
        case 'Copper': return '패션';
        case 'Shadow': return '푸드, 농업';
        case 'Tuscany': return '환경, 에너지';
        case 'VeryLightTangelo': return '홈리빙';
        case 'Orange': return '헬스케어, 바이오';
        case 'CarnationPink': return '피트니스, 스포츠';
        case 'TurkishRose': return '법률';
        case 'SuperPink': return '펫';
        case 'NavyBlue': return '기타';
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
