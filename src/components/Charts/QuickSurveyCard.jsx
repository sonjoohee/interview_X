import React, { useState } from 'react';
import styled from 'styled-components';
import minusIcon from '../../assets/images/quicksurvey/minus_icon.svg';
import arrowIcon from '../../assets/images/quicksurvey/arrow_icon.svg';
import circleIcon from '../../assets/images/quicksurvey/circle_icon.svg';

const QuickSurveyCard = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <CardContainer 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      isHovered={isHovered}
    >
      <DefaultContent isHovered={isHovered}>
        <TopSection>
          <LogoSection>
            <Union isHovered={false}>
              <Dot isHovered={false} />
              <Dot isHovered={false} />
              <Dot isHovered={false} />
              <Dot isHovered={false} />
            </Union>
            <LogoText isHovered={false}>Interview</LogoText>
          </LogoSection>
        </TopSection>
        <BottomSection>
          <CircleContainer>
            <CircleImage src={circleIcon} alt="Circle Icon" />
          </CircleContainer>
          <TitleContainer>
            <Title isHovered={isHovered}>Quick Survey</Title>
          </TitleContainer>
        </BottomSection>
      </DefaultContent>
      
      {isHovered && (
        <HoverContent>
          <HoverTopSection>
            <LogoBadge>
              <LogoIconWrapper>
                <Union isHovered={true}>
                  <Dot isHovered={true} />
                  <Dot isHovered={true} />
                  <Dot isHovered={true} />
                  <Dot isHovered={true} />
                </Union>
                <LogoText isHovered={true}>Interview</LogoText>
              </LogoIconWrapper>
            </LogoBadge>
          </HoverTopSection>
          <HoverBottomSection>
            <Title isHovered={isHovered}>Quick Survey</Title>
            <Description>
              핵심 페르소나 그룹의 빠른 의견을 수집하고 인사이트를 도출할 수 있는 빠른 리서치 도구
            </Description>
            <ArrowIcon src={arrowIcon} alt="Arrow" />
          </HoverBottomSection>
        </HoverContent>
      )}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 190px;
  height: 290px;
  border-radius: 20px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
`;

const DefaultContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 34.5px 40px 34.5px 40px;
  gap: 48px;
  background-color: #F7F8FA;
  opacity: ${({ isHovered }) => (isHovered ? 0.7 : 1)};
  transition: opacity 0.3s ease;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const Union = styled.div`
  position: relative;
  width: 7px;
  height: 7px;
`;

const Dot = styled.div`
  position: absolute;
  width: 3.5px;
  height: 3.5px;
  background-color: ${({ isHovered }) => (isHovered ? '#FFFFFF' : '#666666')};
  border-radius: 50%;
  
  &:nth-child(1) {
    top: 0;
    left: 0;
  }
  
  &:nth-child(2) {
    top: 0;
    right: 0;
  }
  
  &:nth-child(3) {
    bottom: 0;
    left: 0;
  }
  
  &:nth-child(4) {
    bottom: 0;
    right: 0;
  }
`;

const LogoText = styled.span`
  font-family: 'Poppins', Poppins;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: ${({ isHovered }) => (isHovered ? '#FFFFFF' : '#666666')};
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  width: 110px;
`;

const CircleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 109px;
  height: 109px;
`;

const CircleImage = styled.img`
  width: 110px;
  height: 98px;
  filter: drop-shadow(0px 0px 10px rgba(90, 129, 255, 0.5));
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 101px;
`;

const Title = styled.h3`
  font-family: 'Pretendard', Poppins;
  font-weight: 900;
  font-size: 16px;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: ${({ isHovered }) => (isHovered ? '#FFFFFF' : '#323232')};
  margin: 0;
`;

// Hover state components
const HoverContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(50, 50, 50, 0.9);
  z-index: 1;
`;

const HoverTopSection = styled.div`
  padding: 30px 20px 20px 20px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const LogoBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  background-color: #AF52DE;
  border-radius: 5px;
  width: 85px;
  height: 27px;
`;

const LogoIconWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 2px;
`;

const HoverBottomSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  width: 100%;
`;

const Description = styled.p`
  font-family: 'Pretendard', Poppins;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5em;
  letter-spacing: -0.03em;
  color: #FFFFFF;
  text-align: left;
  width: 100%;
  margin: 0;
`;

const ArrowIcon = styled.img`
  width: 66px;
  height: 13px;
  display: block;
  margin: 8px auto 0;
`;

export default QuickSurveyCard;