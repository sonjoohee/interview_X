import React from "react";
import styled, { css } from "styled-components";
import { Body1, Sub3 } from "../../../../../assets/styles/Typography";
import { palette } from "../../../../../assets/styles/Palette";
import images from "../../../../../assets/styles/Images";
import { Button } from "../../../../../assets/styles/ButtonStyle";
import PersonaIcon from '../../../../../assets/images/Persona_icon_QuickSurvey.png';



const MolculePresetPersona = ({
  personaData = [],
  selectedCards = {},
  onCardSelect = () => {},
}) => {
  return (
    <CardsContainer>
      {personaData.map((persona) => (
        <CardContainer
          key={persona?._id}
          isSelected={selectedCards[persona._id]}
        >
          <ProfileImageFrame>
            <img src={PersonaIcon} alt="Persona Icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </ProfileImageFrame>

          <ContentContainer>
            <TitleFrame>
              <Title>{persona?.personaName || "제목 없음"}</Title>
            </TitleFrame>
            <DescriptionFrame>
              <Description>
                {persona?.personaCharacteristics || "설명 없음"}
              </Description>
            </DescriptionFrame>
          </ContentContainer>

          <StyledButton 
            Medium 
            isSelected={selectedCards[persona._id]}
            Primary={selectedCards[persona._id]}
            customBackground={!selectedCards[persona._id]}
            Fill
            onClick={() => onCardSelect(persona._id)}
          >
            {selectedCards[persona._id] ? '선택됨' : '선택하기'}
          </StyledButton>
        </CardContainer>
      ))}
    </CardsContainer>
  );
};

export default MolculePresetPersona;


const CardsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 24px 20px;
  width: calc((100% - 60px) / 4);  // 20px gap으로 4등분
  border-radius: 10px;
  background-color: ${palette.white};
  
  ${props => props.isSelected ? css`
    border: 1px solid ${palette.primary};
  ` : css`
    border: 1px solid #E0E4EB;
  `}
`;

const ProfileImageFrame = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  background-color: #E6EEFE;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 150px;
`;

const TitleFrame = styled.div`
  display: flex;
  width: 100%;
  height: 38px;
  align-items: center;
  overflow: hidden;
`;

const Title = styled.h3`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.2;
  text-align: center;
  letter-spacing: -0.03em;
  color: #323232;
  width: 100%;
  white-space: pre-line;
`;

const DescriptionFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const Description = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.3;
  letter-spacing: -0.03em;
  color: #8C8C8C;
  width: 150px;
  text-align: left;
  
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  height: 54px;
  margin: 0;
  padding: 0;
`;

const StyledButton = styled(Button)`
  width: 100%;
  border-radius: 4px;
  padding: 8px 12px;
  justify-content: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.2;
  letter-spacing: -0.03em;
  
  ${props => props.isSelected && css`
    color: ${palette.white};
  `}
  
  ${props => props.customBackground && css`
    background-color: #F7F8FA;
    color: #8C8C8C;
    border: none;
  `}
`;
