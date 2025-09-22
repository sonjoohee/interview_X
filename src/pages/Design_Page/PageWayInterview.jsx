import React, { useState } from "react";
import styled from "styled-components";

import { palette } from "../../assets/styles/Palette";
import images from "../../assets/styles/Images";
import PopupWrap from "../../assets/styles/Popup";

import { 
  ContentsWrap, 
  ContentSection,
  MainContent, 
  AnalysisWrap, 
  MainSection, 
  Title,
  CardWrap,
  CustomizePersona,
} from "../../assets/styles/BusinessAnalysisStyle";


import Header from "./IncHeader";
import PersonaCard from "./PersonaCard";
import AnalysisInfo from "./PageAnalysisInfo";
import Sidebar from "./IncSidebar";
import IncNavigation from "./IncNavigation";


const PageWayInterview = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [, setShowCustomModal] = useState(false);

  const handleTypeSelect = (type) => {
    if (type === 'single') return;
    setSelectedType(type);
  };

  const handleEditClick = () => {
    setShowPopup(true);
  };

  // 인터뷰 목적 데이터 정의
  const interviewPurposes = [
    {
      id: 1,
      title: "가족과 함께 여가를 보내는 활동 지향형 소비자",
      description: "다양한 시나리오에서 제품의 사용 가능성을 평가하여 부적합한 환경 발견",
      expandedContent: [
        "제품 사용 시 가장 불편했던 점은 무엇인가요?",
        "제품의 어떤 기능이 가장 유용했나요?",
        "제품을 사용하면서 개선되었으면 하는 점이 있다면 무엇인가요?"
      ]
    },
    {
      id: 2,
      title: "가족과 함께 여가를 보내는 활동 지향형 소비자",
      description: "다양한 시나리오에서 제품의 사용 가능성을 평가하여 부적합한 환경 발견",
      expandedContent: [
        "제품의 가격대비 만족도는 어떠신가요?",
        "비슷한 제품과 비교했을 때 차별화된 장점은 무엇인가요?",
        "주변 지인들에게 추천하고 싶은 정도를 평가한다면?"
      ]
    },
    {
      id: 3,
      title: "가족과 함께 여가를 보내는 활동 지향형 소비자",
      description: "다양한 시나리오에서 제품의 사용 가능성을 평가하여 부적합한 환경 발견",
      expandedContent: [
        "제품을 처음 접했을 때의 첫인상은 어땠나요?",
        "제품 사용법을 익히는데 어려움은 없었나요?",
        "앞으로도 계속 사용할 의향이 있으신가요?"
      ]
    }
  ];

 

  const handleConfirm = () => {
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <>
      <ContentsWrap>
        <IncNavigation />

        <Header />

        <MainContent>
          <AnalysisWrap>
            <MainSection>
              <AnalysisInfo />

              <CustomizePersona>
                <CardWrap>
                  <Title>인터뷰 방식 선택</Title>

                  <InterviewTypeCards>
                    <InterviewTypeCard 
                      isActive={selectedType === 'multiple'}
                      onClick={() => handleTypeSelect('multiple')}
                    >
                      <CheckBox isActive={selectedType === 'multiple'} />
                      <strong>
                        (1:N) 다양한 페르소나와 인터뷰
                      </strong>
                      <p>
                        다양한 타겟 페르소나의 의견을 수집하여 인사이트를 얻어보세요.
                      </p>
                    </InterviewTypeCard>

                    <InterviewTypeCard 
                      isActive={selectedType === 'single'}
                      onClick={() => handleTypeSelect('single')}
                      disabled={true}
                    >
                      <CheckBox isActive={selectedType === 'single'} />
                      <strong>
                        (1:1) 심층 인터뷰
                        <span>준비중</span>
                      </strong>
                      <p>
                        한 명의 타겟 페르소나에게 개인화된 질문으로 심층적인 인사이트를 얻어보세요
                      </p>
                    </InterviewTypeCard>
                  </InterviewTypeCards>
                </CardWrap>
              </CustomizePersona>

              <InterviewSelect>
                <Title>인터뷰 목적</Title>

                <TabWrap>
                  <TabButton>전체</TabButton>
                  <TabButton>제품 사용 경험</TabButton>
                  <TabButton>구매 및 소비 심리</TabButton>
                  <TabButton>사용자 시뮬레이션</TabButton>
                </TabWrap>

                <TabContent>
                  {interviewPurposes.map((item) => (
                    <PersonaCard 
                      key={item.id}
                      title={item.title}
                      description={item.description}
                      expandedContent={item.expandedContent}
                    />
                  ))}
                </TabContent>
              </InterviewSelect>

              <CustomizePersona>
                <Title Column>
                  인터뷰 참여 페르소나
                  <p>
                    참여 페르소나를 확인하세요. 변경은 편집하기 버튼을 통해 가능합니다
                    <span onClick={handleEditClick} style={{ cursor: 'pointer' }}>
                      <img src={images.PencilSquare} alt="" />
                      편집하기
                    </span>
                  </p>
                </Title>
              
                <ContentSection>
                  <PersonaCards>
                    <PersonaCard 
                      title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                      isBasic={true}
                      hideCheckCircle={true}
                    />
                    <PersonaCard 
                      title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                      isBasic={true}
                      hideCheckCircle={true}
                    />
                  </PersonaCards>
                </ContentSection>
              </CustomizePersona>
            </MainSection>

            <Sidebar />
          </AnalysisWrap>
        </MainContent>
      </ContentsWrap>

      {showPopup && (
        <PopupWrap 
          TitleFlex
          title="📝 맞춤형 페르소나 모집 요청하기" 
          onConfirm={() => {
            setShowCustomModal(false);
            handleConfirm();
          }} 
          onCancel={() => {
            setShowCustomModal(false);
            handleCancel();
          }}
          buttonType="Fill"
          closeText="닫기"
          confirmText="편집완료"
          isModal={true}
          isFormValid={true}
          body={
            <>
              <Title>
                <p>
                  Selected
                  <span onClick={() => setShowCustomModal(true)}>
                    <img src={images.ClockCounterclockwise} alt="" />
                    이전으로 되돌리기
                  </span>
                </p>
              </Title>
              <PersonaCard 
                TitleFlex
                title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                keywords={['키워드1', '키워드2', '키워드3']}
                isBasic={true}
                checked={true}
              />
              <PersonaCard 
                TitleFlex
                title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                keywords={['키워드1', '키워드2', '키워드3']}
                isBasic={true}
                checked={true}
              />

              <Title style={{marginTop: '20px'}}>
                <p>
                  available
                </p>
              </Title>
              <PersonaCard 
                TitleFlex
                title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                keywords={['키워드1', '키워드2', '키워드3']}
                isBasic={true}
                checked={true}
              />
              <PersonaCard 
                TitleFlex
                title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                keywords={['키워드1', '키워드2', '키워드3']}
                isBasic={true}
                checked={true}
              />
              
            </>
          }
        />
      )}
    </>
  );
};

export default PageWayInterview;

const InterviewTypeCards = styled.div`
  display: flex;
  align-items: stretch;
  gap: 16px;
  width: 100%;
`;

const InterviewTypeCard = styled.div`
  position: relative;
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 10px;
  border: 1px solid ${props => props.isActive 
    ? palette.primary 
    : palette.outlineGray};
  background: ${props => props.isActive 
    ? 'rgba(34, 111, 255, 0.10)' 
    : 'white'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: all 0.2s ease-in-out;

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    line-height: 1.5;
    color: ${props => props.isActive 
      ? palette.primary 
      : palette.gray800};
    text-align: left;

    span {
      font-size: 0.75rem;
      font-weight: 400;
      color: ${palette.gray300};
      padding: 2px 8px;
      border-radius: 15px;
      background: ${palette.gray100};
    }
  }

  p {
    font-size: 0.75rem;
    line-height: 1.5;
    color: ${props => props.isActive 
      ? palette.gray800 
      : palette.gray500};
    text-align: left;
  }
`;

const CheckBox = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border: 1px solid ${props => props.isActive ? palette.primary : palette.outlineGray};
  background: ${props => props.isActive ? palette.primary : 'white'};
  
  ${props => props.isActive && `
    &:after {
      content: '';
      position: absolute;
      left: 8px;
      top: 5px;
      width: 6px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  `}
`;

const TabWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TabButton = styled.button`
  font-family: 'Pretendard', 'Poppins';
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 4px 16px;
  border-radius: 50px;
  cursor: pointer;

  ${({ isActive }) => isActive ? `
    background: rgba(34, 111, 255, 0.1);
    border: 1px solid ${palette.primary};
    color: ${palette.primary};
    font-weight: 600;
  ` : `
    background: ${palette.chatGray};
    border: 1px solid ${palette.outlineGray};
    color: ${palette.gray500};
    font-weight: 400;
  `}
`;

const InterviewSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  margin-top: 30px;
`;

const PersonaCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const TabContent = styled(PersonaCards)`
  gap: 12px;
`;

const CustomAccordionIcon = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 8px;
    height: 8px;
    border-right: 2px solid ${palette.gray500};
    border-bottom: 2px solid ${palette.gray500};
    transform: translate(-50%, -50%) ${props => props.isOpen ? 'rotate(-135deg)' : 'rotate(45deg)'};
    transition: transform 0.3s ease;
  }
`;

const CustomAccordionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: ${palette.chatGray};
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.875rem;
  color: ${palette.gray700};
  transition: background 0.3s ease;

  &:hover {
    background: ${palette.gray100};
  }
`;

const CustomAccordionContent = styled.div`
  padding: 20px 16px;
  border: 1px solid ${palette.outlineGray};
  border-radius: 10px;
  margin-top: 12px;
  background: ${palette.white};
`;
