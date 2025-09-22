import React from 'react';
import styled, { css } from 'styled-components';
import { palette } from '../../assets/styles/Palette';
import { Button } from '../../assets/styles/ButtonStyle';
import PersonaIcon from '../../assets/images/Persona_icon_QuickSurvey.png';

// 선택 여부에 따라 다른 디자인을 표시하는 카드 컴포넌트
const CardPersonaSelected = ({ 
  title = '고양이를 위해 투잡을\n뛰는 캣러버',
  description = '이러한 특성을 보유한 사람들이 모여있는 페르소나 그룹군',
  isSelected = false,
  onToggleSelect = () => {},
}) => {
  return (
    <CardContainer isSelected={isSelected}>
      <ProfileImageFrame>
        <ProfileImage src={PersonaIcon} alt="Persona Icon" />
      </ProfileImageFrame>

      <ContentContainer>
        <TitleFrame>
          <Title>{title}</Title>
        </TitleFrame>
        <DescriptionFrame>
          <Description>{description}</Description>
        </DescriptionFrame>
      </ContentContainer>

      <StyledButton 
        Medium 
        isSelected={isSelected}
        Primary={isSelected}
        customBackground={!isSelected}
        Fill
        onClick={onToggleSelect}
      >
        {isSelected ? '선택됨' : '선택하기'}
      </StyledButton>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 24px 20px;
  width: fit-content;
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

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  font-family: 'Pretendard', Poppins;
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
  font-family: 'Pretendard', Poppins;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.3;
  letter-spacing: -0.03em;
  color: #8C8C8C;
  width: 150px;
  text-align: left;
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

export default CardPersonaSelected;