// StyledComponents.js
import styled, { createGlobalStyle, keyframes, css } from "styled-components";

// 글로벌 스타일
export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Inter', 'Pretendard', sans-serif;
  }

  body {
    background-color: #f8fafc;
    color: #1e293b;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }
`;

// 공통 컨테이너
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

// 네비게이션 바
export const Navbar = styled.nav`
  width: 100%;
  height: 70px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #3b82f6;
  cursor: pointer;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const NavLink = styled.a`
  color: #64748b;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #3b82f6;
  }
`;

export const NavButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 8px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2563eb;
  }
`;

// 히어로 섹션
export const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 0;
  gap: 48px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 48px 0;
  }
`;

export const HeroContent = styled.div`
  flex: 1;
`;

export const HeroTitle = styled.h1`
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1e293b;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 20px;
  color: #64748b;
  margin-bottom: 32px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const HeroImage = styled.div`
  flex: 1;
  background-color: #f1f5f9;
  border-radius: 8px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
`;

// 버튼 스타일
export const PrimaryButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 12px 32px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  background-color: white;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  border-radius: 24px;
  padding: 12px 32px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f0f9ff;
  }
`;

// 섹션 타이틀
export const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 32px;
  color: #1e293b;
`;

// 프로세스 섹션
export const ProcessSection = styled.section`
  padding: 64px 0;
`;

export const ProcessSteps = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-top: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ProcessStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
`;

export const StepCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #dbeafe;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: #3b82f6;
  font-size: 24px;
  font-weight: 700;
`;

export const StepTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #334155;
`;

export const StepDescription = styled.p`
  font-size: 16px;
  color: #64748b;
  line-height: 1.5;
`;

export const StepConnector = styled.div`
  flex: 1;
  height: 3px;
  background-color: #dbeafe;
  align-self: center;
  margin-top: 32px;

  @media (max-width: 768px) {
    display: none;
  }
`;

// 특징 섹션
export const FeaturesSection = styled.section`
  padding: 64px 0;
`;

export const FeatureCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #3b82f6;
`;

export const FeatureDescription = styled.p`
  font-size: 16px;
  color: #64748b;
  line-height: 1.5;
`;

// 업로드 영역
export const UploadSection = styled.section`
  padding: 48px 0;
`;

export const UploadContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const UploadArea = styled.div`
  border: 2px dashed #3b82f6;
  border-radius: 8px;
  background-color: #f8fafc;
  padding: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s ease, background-color 0.3s ease;
  margin-bottom: 32px;

  &:hover {
    border-color: #2563eb;
    background-color: #f0f9ff;
  }
`;

export const UploadIcon = styled.div`
  width: 64px;
  height: 64px;
  background-color: #dbeafe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  font-size: 32px;
  color: #3b82f6;
`;

export const UploadText = styled.p`
  font-size: 18px;
  color: #64748b;
  margin-bottom: 16px;
`;

export const UploadInfo = styled.p`
  font-size: 14px;
  color: #94a3b8;
  margin-top: 16px;
`;

export const FilePreview = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`;

export const FileThumbnail = styled.div`
  width: 64px;
  height: 64px;
  background-color: #f1f5f9;
  border-radius: 4px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
`;

export const FileInfo = styled.div`
  flex: 1;
`;

export const FileName = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 4px;
`;

export const FileSize = styled.p`
  font-size: 14px;
  color: #64748b;
`;

export const AnalysisOptions = styled.div`
  margin-bottom: 32px;
`;

export const OptionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #334155;
`;

export const OptionsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const OptionItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #64748b;
  cursor: pointer;
`;

export const OptionCheckbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: #3b82f6;
  cursor: pointer;
`;

// 로딩 화면
export const LoadingSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 70px);
  padding: 48px 0;
`;

export const LoadingCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 48px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 600px;
  text-align: center;
`;

export const LoadingTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #3b82f6;
`;

export const LoadingSubtitle = styled.p`
  font-size: 16px;
  color: #64748b;
  margin-bottom: 32px;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #e2e8f0;
  border-radius: 5px;
  margin-bottom: 48px;
  overflow: hidden;
`;

const progressAnimation = keyframes`
  0% { width: 0%; }
  100% { width: 100%; }
`;

export const ProgressBar = styled.div`
  height: 100%;
  background-color: #3b82f6;
  border-radius: 5px;
  width: ${(props) => props.progress}%;
  animation: ${(props) =>
    props.animated
      ? css`
          ${progressAnimation} 15s linear forwards
        `
      : "none"};
`;

export const LoadingSteps = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 48px;
`;

export const pulseAnimation = keyframes`
  0% { opacity: 0.2; }
  50% { opacity: 1; }
  100% { opacity: 0.2; }
`;

export const LoadingStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StepIndicator = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  opacity: ${(props) => (props.active ? 1 : 0.3)};
  animation: ${(props) =>
    props.active
      ? css`
          ${pulseAnimation} 1.5s infinite
        `
      : "none"};
`;

export const StatusMessage = styled.div`
  background-color: #f1f5f9;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  font-size: 16px;
  color: #334155;
`;

// 결과 화면
export const ResultsSection = styled.section`
  padding: 48px 0;
`;

export const ScoreCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

export const ScoreCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #dbeafe;
  border: 3px solid #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 32px;
  font-size: 36px;
  font-weight: 700;
  color: #3b82f6;
`;

export const ScoreInfo = styled.div`
  flex: 1;
`;

export const ScoreTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1e293b;
`;

export const ScoreDescription = styled.p`
  font-size: 16px;
  color: #64748b;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
`;

export const FeedbackCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #dbeafe;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  font-size: 20px;
  color: #3b82f6;
`;

export const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
`;

export const CardContent = styled.div`
  margin-bottom: 16px;
`;

export const Feedback = styled.p`
  font-size: 16px;
  color: #64748b;
  margin-bottom: 16px;
  line-height: 1.5;
`;

export const ImprovementsTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #334155;
`;

export const ImprovementsList = styled.ul`
  padding-left: 20px;
`;

export const ImprovementItem = styled.li`
  font-size: 16px;
  color: #64748b;
  margin-bottom: 8px;
  line-height: 1.5;
`;

export const ComparisonSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 32px;
`;

export const ComparisonTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1e293b;
`;

export const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ImageContainer = styled.div`
  background-color: #f1f5f9;
  border-radius: 8px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
`;

export const ResultActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 48px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
