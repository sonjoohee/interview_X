import styled from "styled-components";

// Main Container
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  color: #333;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

// Header
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-bottom: 1px solid #eee;
`;

export const PersonaName = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  color: #333;
`;

export const PersonaNumber = styled.span`
  color: #666;
  font-size: 16px;
`;

// Content
export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

// Left Column
export const LeftColumn = styled.div`
  width: 25%;
  padding-right: 20px;

  @media (max-width: 1024px) {
    width: 100%;
    padding-right: 0;
    margin-bottom: 30px;
  }
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 20px;
`;

export const QuoteBox = styled.div`
  background-color: #3498db;
  color: white;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
`;

export const QuoteText = styled.p`
  margin: 0;
  font-style: italic;
  font-size: 14px;
  line-height: 1.5;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Tag = styled.span`
  display: inline-block;
  padding: 5px 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 14px;
  color: #333;

  &:not(:last-child)::after {
    content: "·";
    margin-left: 10px;
  }
`;

export const InfoList = styled.div`
  margin-bottom: 20px;
`;

export const InfoItem = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
`;

export const InfoLabel = styled.span`
  font-weight: 600;
  margin-right: 5px;
`;

export const InfoValue = styled.span``;

// Middle Column
export const MiddleColumn = styled.div`
  width: 40%;
  padding: 0 20px;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 0;
    margin-bottom: 30px;
  }
`;

export const Section = styled.section`
  margin-bottom: 30px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #3498db;
  margin-top: 0;
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
`;

export const BioText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #555;
  margin: 0;
`;

export const GoalsList = styled.ul`
  padding-left: 20px;
  margin: 0;
`;

export const GoalItem = styled.li`
  font-size: 14px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 8px;
`;

export const ScenarioText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #555;
  margin: 0;
`;

// Right Column
export const RightColumn = styled.div`
  width: 35%;
  padding-left: 20px;

  @media (max-width: 1024px) {
    width: 100%;
    padding-left: 0;
  }
`;

// Motivations
export const MotivationsSection = styled.section`
  margin-bottom: 30px;
`;

export const MotivationItem = styled.div`
  margin-bottom: 12px;
`;

export const MotivationLabel = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
  color: #555;
`;

export const ProgressBarContainer = styled.div`
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressBar = styled.div`
  height: 100%;
  width: ${(props) => props.width};
  background-color: #3498db;
  border-radius: 4px;
`;

// Personality
export const PersonalitySection = styled.section`
  margin-bottom: 30px;
`;

export const PersonalityItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const PersonalityLabel = styled.span`
  width: 80px;
  font-size: 14px;
  color: #555;
`;

export const PersonalityScale = styled.div`
  flex: 1;
  height: 3px;
  background-color: #f0f0f0;
  position: relative;
  margin: 0 10px;
`;

export const PersonalityMarker = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #3498db;
  position: absolute;
  top: 50%;
  left: ${(props) => props.position}%;
  transform: translate(-50%, -50%);
`;

// Brands
export const BrandsSection = styled.section`
  margin-bottom: 30px;
`;

export const BrandsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

export const BrandLogo = styled.img`
  height: 40px;
  width: auto;
  max-width: 120px;
  object-fit: contain;
`;
