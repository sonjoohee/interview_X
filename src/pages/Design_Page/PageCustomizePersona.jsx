import React, { useState } from "react";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";
import { Button } from "../../assets/styles/ButtonStyle";
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

import PopupWrap from "../../assets/styles/Popup";
import { useNavigate } from 'react-router-dom';

const PageCustomizePersona = () => {
  const navigate = useNavigate();
  const [checkedPersonas, setCheckedPersonas] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
 

  const handlePersonaCheck = (isChecked, isCustom) => {
    if (isCustom) {
      setShowPopup(true);
    } else {
      setCheckedPersonas(prev => isChecked ? prev + 1 : prev - 1);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };


  const handleStartInterview = () => {
    if (checkedPersonas > 0) {
      navigate('/WayInterview');
    }
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
                  <Title Column>
                    <h3>맞춤 페르소나</h3>
                    <p>
                      추천된 페르소나와 인터뷰하세요. 그룹 또는 한 명의 타겟을 선택할 수 있습니다.
                      {/* <span onClick={handleRecruitClick}>
                        <img src={images.PencilSquare} alt="" />
                        편집하기
                      </span> */}
                    </p>
                  </Title>
                  
                  <ContentSection>
                    <PersonaCards>
                      <PersonaCard 
                        title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                        keywords={['키워드1', '키워드2', '키워드3']}
                        isBasic={true}
                        onCheckChange={(isChecked) => handlePersonaCheck(isChecked, false)}
                      />
                      <PersonaCard 
                        title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                        keywords={['키워드1', '키워드2', '키워드3']}
                        isBasic={true}
                        onCheckChange={(isChecked) => handlePersonaCheck(isChecked, false)}
                      />
                      <PersonaCard 
                        title="도심에 거주하며 전문직에 종사하는 바쁜 생활인"
                        keywords={['키워드1', '키워드2', '키워드3']}
                        isCustom={true}
                        onCheckChange={(isChecked) => handlePersonaCheck(isChecked, true)}
                      />
                    </PersonaCards>
                    
                    <BottomBar>
                      <p>
                        {checkedPersonas > 0 ? (
                          <>선택하신 <span>{checkedPersonas}명</span>의 페르소나와 인터뷰 하시겠어요?</>
                        ) : (
                          '페르소나를 선택하고 그들의 인터뷰를 시작해 보세요'
                        )}
                      </p>
                      <Button 
                        Large 
                        Primary 
                        Fill={checkedPersonas > 0} 
                        Edit={checkedPersonas === 0} 
                        disabled={checkedPersonas === 0}
                        onClick={handleStartInterview}
                      >
                        인터뷰 시작하기
                      </Button>
                    </BottomBar>
                  </ContentSection>
                </CardWrap>
              </CustomizePersona> 
            </MainSection>

            <Sidebar />
          </AnalysisWrap>
        </MainContent>
      </ContentsWrap>

      {showPopup && (
        <PopupWrap 
          Warning
          title="요청 상태의 페르소나는 선택이 제한됩니다." 
          message="인터뷰를 진행하려면 모집 요청을 먼저 진행해주세요"
          buttonType="Outline"
          closeText="확인"
          isModal={false}
          onCancel={handlePopupClose}
          show={showPopup}
        />
      )}
    </>
  );
};

export default PageCustomizePersona;

const PersonaCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const BottomBar = styled.div`
  position: sticky;
  bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  background: ${palette.white};

  p {
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${palette.gray500};

    span {
      color: ${palette.primary};
      text-decoration: underline;
    }
  }

  button {
    gap: 16px;

    &:after {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-right: 2px solid ${palette.white};
      border-top: 2px solid ${palette.white};
      transform: rotate(45deg);
      content: '';
    }
  }
`;
