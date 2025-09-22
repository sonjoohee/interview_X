import styled, { css, keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0% { opacity: 0.2; }
  50% { opacity: 1; }
  100% { opacity: 0.2; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// 애니메이션 정의
const scan = keyframes`
  0% {
    top: 0;
  }
  100% {
    top: 100%;
  }
`;

// Layout components
export const Container = styled.div`
  background-color: #f8fafc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 1100px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const Header = styled.header`
  background: linear-gradient(to right, #4f46e5, #7e3af2);
  height: 70px;
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  padding: 0 24px;
  color: white;
`;

export const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin: 0;
`;

export const IconsContainer = styled.div`
  display: flex;
  margin-left: auto;
  gap: 16px;
`;

export const IconCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
`;

export const ContentArea = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  margin-bottom: 24px;
  overflow: hidden;
`;

export const ProgressBar = styled.div`
  height: 100%;
  width: ${(props) => props.progress}%;
  background-color: #4f46e5;
  border-radius: 4px;
  transition: width 0.3s ease;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  text-align: center;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #64748b;
  margin-bottom: 24px;
  text-align: center;
`;

// Stage 1 Components
export const OptionCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin-bottom: 32px;
`;

export const OptionCard = styled.div`
  width: 288px;
  height: 192px;
  border-radius: 8px;
  border: 2px solid ${({ isSelected }) => (isSelected ? "#4F46E5" : "#e2e8f0")};
  background-color: ${({ isSelected }) => (isSelected ? "#EFF6FF" : "white")};
  transition: all 0.2s ease;
`;

export const OptionCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  height: 100%;
`;

export const OptionCardTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #1e293b;
  margin-top: 8px;
`;

export const OptionCardDescription = styled.p`
  font-size: 16px;
  color: #64748b;
  margin-top: 4px;
`;

export const OptionCardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 144px;
  height: 48px;
  margin-top: 24px;
  border-radius: 24px;
  background-color: ${({ isSelected }) => (isSelected ? "#4F46E5" : "#f1f5f9")};
  border: ${({ isSelected }) => (isSelected ? "none" : "1px solid #e2e8f0")};
  color: ${({ isSelected }) => (isSelected ? "white" : "#64748b")};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? "#4338CA" : "#e2e8f0"};
  }
`;

export const OptionCardButtonDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${({ isSelected }) => (isSelected ? "white" : "#f1f5f9")};
  border: ${({ isSelected }) =>
    isSelected ? "2px solid white" : "1px solid #cbd5e1"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OptionCardButtonDotInner = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #4f46e5;
`;

export const SubOptionsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  background-color: white;
`;

export const SubOptionsTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 16px;
`;

export const SubOptionsButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
`;

export const SubOptionButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  background-color: ${({ isSelected }) => (isSelected ? "#EFF6FF" : "#f8fafc")};
  border: ${({ isSelected }) =>
    isSelected ? "2px solid #4F46E5" : "1px solid #e2e8f0"};
  color: ${({ isSelected }) => (isSelected ? "#4F46E5" : "#64748b")};
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? "#EFF6FF" : "#f1f5f9"};
  }
`;

// Stage 2 Components

export const TwoColumnLayout = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const UploadArea = styled.div`
  flex: 1;
  height: 350px;
  border-radius: 8px;
  background-color: #f8fafc;
  border: 2px solid
    ${({ isDragging, isUploaded }) =>
      isDragging ? "#3B82F6" : isUploaded ? "#e2e8f0" : "#e2e8f0"};
  border-style: ${({ isDragging, isUploaded }) =>
    isDragging || isUploaded ? "solid" : "dashed"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  transition: all 0.2s ease;
  position: relative;

  ${({ isDragging }) =>
    isDragging &&
    css`
      background-color: #eff6ff;
    `}
`;

export const UploadEmptyStateText = styled.p`
  font-size: 18px;
  color: ${({ isDragging }) => (isDragging ? "#3B82F6" : "#64748b")};
  font-weight: ${({ isDragging }) => (isDragging ? "bold" : "normal")};
  text-align: center;
  margin: 16px 0;
`;

export const UploadButton = styled.button`
  background-color: white;
  border: 2px solid #4f46e5;
  color: #4f46e5;
  font-weight: bold;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  margin: 8px 0;
  transition: all 0.2s ease;

  &:hover {
    background-color: #eff6ff;
  }
`;

export const UploadProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  margin-bottom: 24px;
`;

export const UploadProgressBar = styled.div`
  height: 100%;
  background-color: #4f46e5;
  border-radius: 10px;
  width: ${({ progress }) => `${progress}%`};
  transition: width 0.3s ease-in-out;
`;

export const FilePreview = styled.div`
  width: 400px;
  height: 260px;
  border-radius: 8px;
  background-color: #f3f4f6;
  background-image: ${({ src }) => (src ? `url(${src})` : "none")};
  background-size: cover;
  background-position: center;
  border: 1px solid #e2e8f0;
  margin-bottom: 16px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 5%;
    left: 10%;
    width: 80%;
    height: 15%;
    background-color: #4f46e5;
    opacity: 0.9;
    border-radius: 5px;
  }

  &::after {
    content: "";
    position: absolute;
    top: 25%;
    left: 10%;
    width: 80%;
    height: 45%;
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 5px;
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 0 16px;
`;

export const FileName = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #475569;
`;

export const FileActionButton = styled.button`
  background-color: #f1f5f9;
  border: 1px solid #cbd5e1;
  color: #64748b;
  padding: 6px 16px;
  border-radius: 15px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #e2e8f0;
  }
`;

export const FormContainer = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  padding: 24px;
`;

export const FormTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 24px;
`;

export const FormField = styled.div`
  margin-bottom: 24px;
  position: relative;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 16px;
  color: #475569;
  margin-bottom: 8px;
`;

export const FormInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background-color: #f8fafc;
  border: 1px solid ${({ isFocused }) => (isFocused ? "#3B82F6" : "#e2e8f0")};
  padding: 0 16px;
  font-size: 14px;
  color: #1e293b;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  height: 80px;
  border-radius: 5px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 8px 16px;
  font-size: 14px;
  color: #1e293b;
  resize: none;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownInput = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background-color: #f8fafc;
  border: 1px solid ${({ isOpen }) => (isOpen ? "#3B82F6" : "#e2e8f0")};
  padding: 0 16px;
  font-size: 14px;
  color: #1e293b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    border-color: ${({ isOpen }) => (isOpen ? "#3B82F6" : "#cbd5e1")};
  }
`;

export const DropdownText = styled.span`
  font-size: 14px;
  color: ${({ isEmpty }) => (isEmpty ? "#94a3b8" : "#1e293b")};
`;

export const DropdownArrow = styled.span`
  color: ${({ isOpen }) => (isOpen ? "#3B82F6" : "#94a3b8")};
  font-size: 16px;
`;

export const DropdownOptions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  animation: ${slideIn} 0.2s ease-out;
`;

export const DropdownOption = styled.div`
  padding: 12px 16px;
  font-size: 14px;
  color: ${({ isSelected }) => (isSelected ? "#3B82F6" : "#475569")};
  background-color: ${({ isSelected }) => (isSelected ? "#EFF6FF" : "white")};
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
  cursor: pointer;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? "#EFF6FF" : "#f8fafc"};
  }

  &:not(:last-child) {
    border-bottom: 1px solid #e2e8f0;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 24px;
`;

export const BackButton = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 25px;
  background-color: #f8fafc;
  border: 2px solid #e2e8f0;
  color: #475569;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
  }
`;

export const NextButton = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 25px;
  background: ${({ disabled }) =>
    disabled ? "#cbd5e1" : "linear-gradient(to right, #4F46E5, #7E3AF2)"};
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.9)};
  }
`;

export const StageLabel = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #4f46e5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

export const StageLabelsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
`;

export const StageIndicator = styled.div`
  width: ${({ isActive, isCurrent }) =>
    isCurrent ? "50px" : isActive ? "50px" : "50px"};
  height: 50px;
  border-radius: 25px;
  background-color: ${({ isActive, isCurrent }) =>
    isCurrent ? "#4F46E5" : isActive ? "#9CA3AF" : "#9CA3AF"};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.3)};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

// Transition Screen
export const TransitionScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const TransitionTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 48px;
`;

export const TransitionInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
`;

export const TransitionInfoText = styled.p`
  font-size: ${({ isTitle }) => (isTitle ? "18px" : "16px")};
  color: ${({ isTitle }) => (isTitle ? "#475569" : "#64748b")};
  text-align: center;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(30, 41, 59, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  animation: ${fadeIn} 0.2s ease-in-out;
`;

export const ModalContainer = styled.div`
  width: 500px;
  padding: 32px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.3s ease-out;
`;

export const ModalTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  color: #1e293b;
  text-align: center;
  margin-bottom: 16px;
`;

export const ModalText = styled.p`
  font-size: 16px;
  color: #475569;
  text-align: center;
  margin-bottom: 32px;
`;

export const ModalButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
`;

export const ModalCancelButton = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 25px;
  background-color: #f8fafc;
  border: 2px solid #e2e8f0;
  color: #475569;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #f1f5f9;
  }
`;

export const ModalConfirmButton = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 25px;
  background-color: #ef4444;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #dc2626;
  }
`;

export const FooterLabel = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 40px;
  background-color: #f1f5f9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  font-size: 16px;
  margin-bottom: 20px;
`;

// Custom Input
export const CustomInputContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  background-color: white;
`;

export const CustomInputTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 16px;
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const CustomInputForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const CustomInputField = styled.input`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #1e293b;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #4f46e5;
  }
`;

export const AnalyzeButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  background: ${({ isAnalyzing }) =>
    isAnalyzing ? "#f1f5f9" : "linear-gradient(to right, #4F46E5, #7E3AF2)"};
  color: ${({ isAnalyzing }) => (isAnalyzing ? "#64748b" : "white")};
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: ${({ isAnalyzing }) => (isAnalyzing ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  @media (min-width: 768px) {
    min-width: 120px;
  }
`;

export const AnalyzingContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 12px;
  border: 2px solid rgba(100, 116, 139, 0.3);
  border-top: 2px solid #64748b;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Analysis Results
export const AnalysisResultsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  border-radius: 8px;
  border: 2px solid #4f46e5;
  background-color: #eff6ff;
`;

export const AnalysisResultsTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 8px;
`;

export const AnalysisResultsExplanation = styled.p`
  font-size: 16px;
  color: #475569;
  margin-bottom: 24px;
`;

export const RecommendationCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin-bottom: 24px;
`;

export const RecommendationCard = styled.div`
  width: 288px;
  height: 192px;
  border-radius: 8px;
  border: 2px solid
    ${({ isPrimary, isSecondary }) =>
      isPrimary ? "#4F46E5" : isSecondary ? "#059669" : "#94a3b8"};
  background-color: ${({ isPrimary, isSecondary }) =>
    isPrimary ? "#EFF6FF" : isSecondary ? "#ECFDF5" : "#F8FAFC"};
`;

export const RecommendationCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  height: 100%;
`;

export const RecommendationCardTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #1e293b;
  margin-top: 8px;
`;

export const RecommendationCardDescription = styled.p`
  font-size: 16px;
  color: #64748b;
  margin-top: 4px;
`;

export const RecommendationCardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 144px;
  height: 48px;
  margin-top: 24px;
  border-radius: 24px;
  background-color: ${({ isPrimary, isSecondary }) =>
    isPrimary ? "#4F46E5" : isSecondary ? "#059669" : "#f1f5f9"};
  border: ${({ isPrimary, isSecondary }) =>
    isPrimary || isSecondary ? "none" : "1px solid #e2e8f0"};
  color: ${({ isPrimary, isSecondary }) =>
    isPrimary || isSecondary ? "white" : "#64748b"};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
`;

export const RecommendationCardButtonDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${({ isNotRecommended }) =>
    isNotRecommended ? "#f1f5f9" : "white"};
  border: ${({ isNotRecommended }) =>
    isNotRecommended ? "1px solid #cbd5e1" : "2px solid white"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RecommendationCardButtonDotInner = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ isSecondary }) =>
    isSecondary ? "#059669" : "#4F46E5"};
`;

export const ResetButtonContainer = styled.div`
  text-align: center;
  margin-top: 24px;
`;

export const ResetButton = styled.button`
  color: #4f46e5;
  background: none;
  border: none;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #4338ca;
  }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const scaleUp = keyframes`
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const progressAnimation = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;
// Stage 1 Components
export const EvaluationCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin-bottom: 32px;
`;

export const EvaluationCard = styled.div`
  width: 300px;
  height: 200px;
  border-radius: 8px;
  border: 2px solid ${({ isSelected }) => (isSelected ? "#3B82F6" : "#e2e8f0")};
  background-color: ${({ isSelected }) => (isSelected ? "#EFF6FF" : "white")};
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s ease;
`;

export const CardTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  color: #1e293b;
  margin: 16px 0 8px;
  text-align: center;
`;

export const CardDescription = styled.p`
  font-size: 16px;
  color: #475569;
  text-align: center;
  margin-bottom: 16px;
`;

export const SelectButton = styled.button`
  width: 140px;
  height: 50px;
  border-radius: 25px;
  background-color: ${({ isSelected }) => (isSelected ? "#3B82F6" : "#f8fafc")};
  border: 2px solid ${({ isSelected }) => (isSelected ? "#3B82F6" : "#e2e8f0")};
  color: ${({ isSelected }) => (isSelected ? "white" : "#475569")};
  font-size: 16px;
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? "#3B82F6" : "#f1f5f9"};
  }
`;

export const SelectionIndicator = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ isSelected }) => (isSelected ? "white" : "#f1f5f9")};
  border: 2px solid ${({ isSelected }) => (isSelected ? "white" : "#cbd5e1")};
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SelectionDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #3b82f6;
`;

export const OptionsContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 32px auto;
  padding: 24px;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  background-color: white;
`;

export const OptionsTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 16px;
`;

export const SubOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 16px;
`;

export const SubOption = styled.button`
  width: 220px;
  height: 50px;
  border-radius: 8px;
  background-color: ${({ isSelected }) => (isSelected ? "#EFF6FF" : "#f8fafc")};
  border: 2px solid ${({ isSelected }) => (isSelected ? "#3B82F6" : "#e2e8f0")};
  color: ${({ isSelected }) => (isSelected ? "#3B82F6" : "#475569")};
  font-size: 16px;
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? "#EFF6FF" : "#f1f5f9"};
  }
`;
export const CustomInput = styled.input`
  flex: 1;
  height: 50px;
  border-radius: 8px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 0 16px;
  font-size: 16px;
  color: #1e293b;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const LoadingCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #3b82f6;
  animation: ${rotate} 1s linear infinite;
  margin: 0 auto;
`;

export const AnalysisResultContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 32px auto;
  padding: 24px;
  border-radius: 8px;
  border: 2px solid #3b82f6;
  background-color: #eff6ff;
`;

export const AnalysisTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 16px;
`;

export const AnalysisText = styled.p`
  font-size: 16px;
  color: #475569;
  margin-bottom: 8px;
  line-height: 1.5;
`;

export const RecommendationCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin: 24px 0;
`;

export const RecommendButton = styled.button`
  width: 140px;
  height: 50px;
  border-radius: 25px;
  background-color: ${({ type }) =>
    type === "primary"
      ? "#3B82F6"
      : type === "secondary"
      ? "#16A34A"
      : "#f8fafc"};
  border: 2px solid
    ${({ type }) =>
      type === "primary"
        ? "#3B82F6"
        : type === "secondary"
        ? "#16A34A"
        : "#e2e8f0"};
  color: ${({ type }) =>
    type === "primary" || type === "secondary" ? "white" : "#475569"};
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
`;
// Stage 3 Components
export const EvaluationContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 16px;
`;

export const EvaluationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const EvaluationStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StatusIndicator = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ status }) =>
    status === "completed"
      ? "#10B981"
      : status === "in-progress"
      ? "#3B82F6"
      : "#9CA3AF"};
`;

export const StatusText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${({ status }) =>
    status === "completed"
      ? "#10B981"
      : status === "in-progress"
      ? "#3B82F6"
      : "#9CA3AF"};
`;

export const EvaluationProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  margin-bottom: 24px;
`;

export const EvaluationProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const EvaluationProgressText = styled.p`
  font-size: 16px;
  color: #475569;
  font-weight: ${({ isBold }) => (isBold ? "bold" : "normal")};
`;

export const EvaluationProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: #f1f5f9;
  border-radius: 10px;
  overflow: hidden;
`;

export const EvaluationProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(to right, #4f46e5, #7e3af2);
  border-radius: 10px;
  width: ${({ progress }) => `${progress}%`};
  transition: width 0.5s ease-in-out;
  animation: ${progressAnimation} 5s ease-in-out;
`;

export const ResultsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ResultsCard = styled.div`
  background-color: white;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  padding: 24px;
  height: 100%;
  animation: ${scaleUp} 0.3s ease-out;
  animation-fill-mode: both;
  animation-delay: ${({ index }) => index * 0.1}s;
`;

export const ResultsCardTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ScoreCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ score }) =>
    score >= 85
      ? "#10B981"
      : score >= 70
      ? "#3B82F6"
      : score >= 50
      ? "#F59E0B"
      : "#EF4444"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin-right: 16px;
`;

export const ScoreBar = styled.div`
  width: 100%;
  height: 12px;
  background-color: #f1f5f9;
  border-radius: 6px;
  margin-bottom: 16px;
  overflow: hidden;
`;

export const ScoreFill = styled.div`
  height: 100%;
  width: ${({ score }) => `${score}%`};
  background-color: ${({ score }) =>
    score >= 85
      ? "#10B981"
      : score >= 70
      ? "#3B82F6"
      : score >= 50
      ? "#F59E0B"
      : "#EF4444"};
  border-radius: 6px;
  transition: width 1s ease-out;
`;

export const ScoreItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const ScoreLabel = styled.p`
  font-size: 16px;
  color: #475569;
`;

export const ScoreValue = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${({ score }) =>
    score >= 85
      ? "#10B981"
      : score >= 70
      ? "#3B82F6"
      : score >= 50
      ? "#F59E0B"
      : "#EF4444"};
`;

export const FeedbackSection = styled.div`
  margin-top: 24px;
`;

export const FeedbackTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 16px;
`;

export const FeedbackCategories = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

export const FeedbackCategoryButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  border: none;
  background-color: ${(props) => (props.isActive ? "#3b82f6" : "#e2e8f0")};
  color: ${(props) => (props.isActive ? "white" : "#1e293b")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.isActive ? "#2563eb" : "#cbd5e1")};
  }
`;

export const FeedbackItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FeedbackItem = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.type === "positive"
      ? "#ecfdf5"
      : props.type === "improvement"
      ? "#eff6ff"
      : "#fef2f2"};
`;

export const FeedbackItemIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.type === "positive"
      ? "#10b981"
      : props.type === "improvement"
      ? "#3b82f6"
      : "#ef4444"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

export const FeedbackItemContent = styled.div`
  flex: 1;
`;

export const FeedbackItemTitle = styled.h4`
  font-size: 16px;
  margin-bottom: 8px;
`;

export const FeedbackItemDescription = styled.p`
  font-size: 14px;
  line-height: 1.5;
`;

export const SummarySection = styled.div`
  margin-top: 24px;
  padding: 16px;
  background-color: #f8fafc;
  border-radius: 8px;
`;

export const SummaryTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 12px;
`;

export const SummaryText = styled.p`
  font-size: 14px;
  line-height: 1.6;
`;

export const CategoryLabel = styled.span`
  font-size: 14px;
  width: 80px;
`;

export const CategoryScore = styled.span`
  font-size: 14px;
  font-weight: 500;
  width: 30px;
  text-align: right;
  margin-right: 8px;
`;

export const CategoryBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
`;

export const CategoryBarFill = styled.div`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: #3b82f6;
  border-radius: 4px;
`;

export const LoadingDotsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

export const LoadingDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #3b82f6;
  animation: pulse 1.5s infinite ease-in-out;
  animation-delay: ${(props) => props.index * 0.3}s;

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.5);
      opacity: 1;
    }
  }
`;

// 디자인 미리보기 관련 스타일 컴포넌트
export const DesignPreviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background-color: #f8fafc;
  border-radius: 12px;
`;

export const DesignPreviewTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
`;

export const DesignPreview = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

export const DesignInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`;

export const DesignInfoItem = styled.div`
  display: flex;
  align-items: center;
`;

export const DesignInfoLabel = styled.span`
  font-weight: 500;
  width: 100px;
  font-size: 14px;
`;

export const DesignInfoValue = styled.span`
  font-size: 14px;
`;

// 평가 옵션 관련 스타일 컴포넌트
export const EvaluationOptionsSection = styled.div`
  padding: 20px;
  background-color: #f8fafc;
  border-radius: 12px;
`;

export const EvaluationOptionsTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 16px;
`;

export const EvaluationOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const EvaluationOption = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const EvaluationOptionCheckbox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid ${(props) => (props.isChecked ? "#3b82f6" : "#cbd5e1")};
  background-color: ${(props) => (props.isChecked ? "#3b82f6" : "white")};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
`;

export const EvaluationOptionLabel = styled.span`
  font-size: 14px;
`;

export const ProgressSteps = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
`;

export const ProgressStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 80px;
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
`;

export const ProgressStepIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(props) => (props.isCompleted ? "#10b981" : "#3b82f6")};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

export const ProgressStepText = styled.span`
  font-size: 12px;
  text-align: center;
`;

export const ProgressPercentage = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 16px;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

export const ActionButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) =>
    props.variant === "primary" ? "#3b82f6" : "#e2e8f0"};
  color: ${(props) => (props.variant === "primary" ? "white" : "#1e293b")};

  &:hover {
    background-color: ${(props) =>
      props.variant === "primary" ? "#2563eb" : "#cbd5e1"};
  }
`;

export const ScoreOverview = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 20px;
  background-color: #f8fafc;
  border-radius: 12px;
`;

export const ScoreCategories = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

export const ScoreCategory = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

// ==========================================
// STAGE 5: AI Evaluation Design Auto-Generation
// ==========================================

// Stage 5: Loading/Generation Screen
export const GenerationContainer = styled.div`
  background-color: #f8fafc;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

export const GenerationTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 16px;
  text-align: center;
`;

export const ProgressCircleContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 24px 0;
`;

export const ProgressCircle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 8px solid #e2e8f0;
`;

export const ProgressCircleFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 8px solid transparent;
  border-top-color: #4f46e5;
  animation: ${rotate} 2s linear infinite;
`;

export const ProgressText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
  color: #4f46e5;
`;

export const MethodInfoContainer = styled.div`
  background-color: #eff6ff;
  border-radius: 8px;
  border: 1px solid #dbeafe;
  padding: 16px 24px;
  margin: 24px 0;
`;

export const MethodInfoTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 8px;
`;

export const MethodInfoText = styled.p`
  font-size: 14px;
  color: #475569;
  margin-bottom: 8px;
`;

// Stage 5: Evaluation Design Items
export const EvaluationItem = styled.div`
  background-color: #f8fafc;
  border-radius: 5px;
  border: 1px solid #e2e8f0;
  padding: 12px 16px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s ease;

  ${(props) =>
    props.isNew &&
    css`
      background-color: #eff6ff;
      border: 1px solid #dbeafe;
    `}
`;

export const ItemContent = styled.div`
  flex: 1;
`;

export const ItemTitle = styled.div`
  font-size: 14px;
  color: #475569;
`;

export const ItemWeight = styled.div`
  font-size: 14px;
  color: #475569;
  margin-left: 16px;
`;

export const EditButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f1f5f9;
  border: 1px solid #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  cursor: pointer;
  margin-left: 8px;

  &:hover {
    background-color: #e2e8f0;
  }
`;

export const AddItemButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f5f9;
  border: 1px solid #cbd5e1;
  color: #64748b;
  padding: 8px 16px;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    background-color: #e2e8f0;
  }
`;

// Stage 5: Modal Components

export const ModalHeader = styled.div`
  background-color: #f8fafc;
  padding: 16px 24px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: #e2e8f0;
  }
`;

export const ModalContent = styled.div`
  padding: 24px;
`;

export const ModalFormGroup = styled.div`
  margin-bottom: 24px;
`;

export const ModalLabel = styled.label`
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 8px;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid ${(props) => (props.focused ? "#3B82F6" : "#e2e8f0")};
  background-color: #f8fafc;
  font-size: 14px;
  color: #1e293b;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const ModalTextArea = styled.textarea`
  width: 100%;
  height: ${(props) => props.height || "100px"};
  padding: 12px;
  border-radius: 5px;
  border: 1px solid ${(props) => (props.focused ? "#3B82F6" : "#e2e8f0")};
  background-color: #f8fafc;
  font-size: 14px;
  color: #1e293b;
  resize: none;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const SliderContainer = styled.div`
  margin: 16px 0;
`;

export const Slider = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f1f5f9;
  border-radius: 5px;
  position: relative;
  margin-bottom: 16px;
`;

export const SliderFill = styled.div`
  height: 100%;
  background-color: #3b82f6;
  border-radius: 5px;
  width: ${(props) => `${props.value}%`};
`;

export const SliderThumb = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid #3b82f6;
  position: absolute;
  top: 50%;
  left: ${(props) => `${props.value}%`};
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

export const SliderValue = styled.div`
  text-align: end;
  font-size: 16px;
  color: #1e293b;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

export const SuggestedItemsContainer = styled.div`
  margin-top: 24px;
`;

export const SuggestedItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background-color: ${(props) => (props.isActive ? "#EFF6FF" : "#f8fafc")};
  border: 1px solid ${(props) => (props.isActive ? "#DBEAFE" : "#e2e8f0")};
  border-radius: 5px;
  margin-bottom: 8px;
`;

export const SuggestedItemText = styled.div`
  font-size: 14px;
  color: ${(props) => (props.isActive ? "#3B82F6" : "#475569")};
`;

export const UseButton = styled.button`
  color: #3b82f6;
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    text-decoration: underline;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 24px;
`;

export const ModalButton = styled.button`
  padding: 12px 24px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.primary ? "linear-gradient(to right, #4F46E5, #7E3AF2)" : "#f8fafc"};
  background: ${(props) =>
    props.primary ? "linear-gradient(to right, #4F46E5, #7E3AF2)" : "#f8fafc"};
  color: ${(props) => (props.primary ? "white" : "#475569")};
  font-size: 16px;
  border: ${(props) => (props.primary ? "none" : "1px solid #e2e8f0")};
  font-weight: ${(props) => (props.primary ? "bold" : "normal")};
  cursor: pointer;

  &:hover {
    opacity: ${(props) => (props.primary ? "0.9" : "1")};
    background-color: ${(props) => (props.primary ? "" : "#f1f5f9")};
  }
`;

// ==========================================
// STAGE 6: AI Evaluation Process and Results
// ==========================================

// Stage 6: Evaluation Progress

export const Column = styled.div`
  flex: ${(props) => props.flex || "1"};
`;

export const DesignPreviewContainer = styled.div`
  background-color: #f3f4f6;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  height: 380px;
  position: relative;
  overflow: hidden;
`;

export const AppPreviewPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f3f4f6;

  &::before {
    content: "";
    position: absolute;
    top: 5%;
    left: 10%;
    width: 80%;
    height: 15%;
    background-color: #4f46e5;
    opacity: 0.9;
    border-radius: 5px;
  }

  &::after {
    content: "";
    position: absolute;
    top: 25%;
    left: 10%;
    width: 80%;
    height: 45%;
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 5px;
  }
`;

export const AppPreviewButton = styled.div`
  position: absolute;
  bottom: 10%;
  left: 20%;
  width: 60%;
  height: 15%;
  background-color: #4f46e5;
  opacity: 0.9;
  border-radius: 25px;
`;

export const ScanLine = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: #3b82f6;
  opacity: 0.7;
  animation: ${scan} 3s infinite;
`;

export const EvaluationProgressCircle = styled.div`
  width: 140px;
  height: 140px;
  position: relative;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CurrentItemContainer = styled.div`
  background-color: #eff6ff;
  border-radius: 8px;
  border: 1px solid #dbeafe;
  padding: 16px;
  margin-bottom: 24px;
`;

export const CurrentItemText = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #3b82f6;
`;

export const ItemProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f1f5f9;
  border-radius: 5px;
  margin: 16px 0;
`;

export const ItemProgressFill = styled.div`
  height: 100%;
  background-color: #3b82f6;
  border-radius: 5px;
  width: ${(props) => `${props.progress}%`};
`;

export const EvaluationStatusText = styled.p`
  font-size: 14px;
  color: #475569;
  margin-bottom: 8px;
`;

// Stage 6: Evaluation Results
export const ScoreCardContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ScoreCardTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 16px;
  align-self: flex-start;
`;

export const OverallScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px 0;
`;

export const OverallScoreText = styled.div`
  font-size: 60px;
  font-weight: bold;
  color: #4f46e5;
  line-height: 1;
  margin-bottom: 8px;
`;

export const ScoreBadge = styled.div`
  background-color: #4f46e5;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 4px 12px;
  border-radius: 15px;
`;

export const CategoryScoreRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
`;

export const CategoryName = styled.div`
  font-size: 14px;
  color: #475569;
  width: 200px;
`;

export const ScoreBarFill = styled.div`
  height: 100%;
  background-color: #4f46e5;
  border-radius: 7.5px;
  width: ${(props) => `${props.score}%`};
`;

export const ScoreText = styled.div`
  font-size: 14px;
  color: #475569;
  width: 40px;
  text-align: right;
`;

export const HeatmapContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  padding: 24px;
  margin-bottom: 24px;
`;

export const HeatmapPreview = styled.div`
  width: 100%;
  height: 150px;
  background-color: #f3f4f6;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
  margin: 16px 0;
  position: relative;
  overflow: hidden;
`;

export const HeatmapPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 10%;
    left: 30%;
    width: 40%;
    height: 40%;
    background-color: rgba(239, 68, 68, 0.5);
    border-radius: 50%;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 20%;
    right: 30%;
    width: 40%;
    height: 40%;
    background-color: rgba(34, 197, 94, 0.5);
    border-radius: 50%;
  }
`;

export const HeatmapOverlay = styled.div`
  position: absolute;
  top: 30%;
  left: 30%;
  width: 40%;
  height: 40%;
  background-color: rgba(251, 191, 36, 0.5);
  border-radius: 50%;
`;

export const HeatmapLegend = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  margin-top: 16px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LegendColor = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  opacity: 0.7;
`;

export const LegendText = styled.span`
  font-size: 14px;
  color: #475569;
`;

export const DetailButton = styled.button`
  background-color: #f8fafc;
  border: 1px solid #3b82f6;
  color: #3b82f6;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 15px;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    background-color: #eff6ff;
  }
`;

export const StrengthsWeaknessesContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  margin-bottom: 24px;
  overflow: hidden;
`;

export const StrengthsWeaknessesHeader = styled.div`
  background-color: #f1f5f9;
  padding: 16px 24px;
`;

export const StrengthItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
`;

export const StrengthBullet = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #10b981;
  margin-right: 16px;
  flex-shrink: 0;
  margin-top: 2px;
`;

export const WeaknessBullet = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #ef4444;
  margin-right: 16px;
  flex-shrink: 0;
  margin-top: 2px;
`;

export const ItemTextContent = styled.div`
  flex: 1;
`;

export const ItemTextTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 4px;
`;

export const ItemTextDescription = styled.div`
  font-size: 14px;
  color: #475569;
`;

// Heatmap Detail Modal Components
export const HeatmapDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const HeatmapLarge = styled.div`
  width: 500px;
  height: 350px;
  background-color: #f3f4f6;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
  margin: 0 auto 24px;
  position: relative;
  overflow: hidden;
`;

export const AnnotationLine = styled.div`
  position: absolute;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  width: ${(props) => props.width}px;
  height: 2px;
  background-color: ${(props) => props.color};
  transform-origin: left center;
  transform: rotate(${(props) => props.angle || 0}deg);

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: -8px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    border: 1px solid white;
  }
`;

export const AnnotationText = styled.div`
  position: absolute;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  width: 200px;
`;

export const AnnotationTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.color};
  margin-bottom: 4px;
`;

export const AnnotationDescription = styled.div`
  font-size: 14px;
  color: #475569;
`;

// Tab Components
export const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

export const Tab = styled.button`
  padding: 12px 24px;
  background-color: ${(props) =>
    props.active ? (props.negative ? "#FEF2F2" : "#EFF6FF") : "#f8fafc"};
  border: 1px solid
    ${(props) =>
      props.active ? (props.negative ? "#FECACA" : "#DBEAFE") : "#e2e8f0"};
  color: ${(props) =>
    props.active ? (props.negative ? "#EF4444" : "#3B82F6") : "#475569"};
  font-size: 16px;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border-radius: 8px;
  cursor: pointer;
  margin-right: 16px;

  &:hover {
    background-color: ${(props) =>
      props.active ? (props.negative ? "#FEF2F2" : "#EFF6FF") : "#f1f5f9"};
  }
`;

export const ImprovementSuggestion = styled.div`
  background-color: #ecfdf5;
  border: 1px solid #d1fae5;
  border-radius: 4px;
  padding: 8px 16px;
  margin-top: 8px;
`;

export const SuggestionText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #059669;
`;

// Category Detail Components
export const CategoryTabs = styled.div`
  display: flex;
  overflow-x: auto;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 24px;
`;

export const CategoryTab = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => (props.active ? "#EFF6FF" : "transparent")};
  border: 1px solid ${(props) => (props.active ? "#DBEAFE" : "transparent")};
  color: ${(props) => (props.active ? "#3B82F6" : "#64748b")};
  font-size: 14px;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  margin-right: 8px;

  &:hover {
    background-color: ${(props) => (props.active ? "#EFF6FF" : "#f1f5f9")};
  }
`;

export const DetailRow = styled.div`
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;

  ${(props) =>
    props.positive &&
    css`
      border-left: 8px solid #10b981;
    `}

  ${(props) =>
    props.negative &&
    css`
      border-left: 8px solid #ef4444;
    `}
`;

export const SummaryContainer = styled.div`
  width: 600px;
  padding: 24px;
  border-radius: 8px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  margin-bottom: 32px;
`;

// ==========================================
// STAGE 7: Evaluation Results Modification and Feedback
// ==========================================

export const ScoreSliderContainer = styled.div`
  margin-bottom: 24px;
`;

export const ScoreSliderRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  ${(props) =>
    props.active &&
    css`
      & ${ScoreName} {
        font-weight: bold;
        color: #4f46e5;
      }

      & ${ScoreValue} {
        font-weight: bold;
        color: #4f46e5;
      }
    `}
`;

export const ScoreName = styled.div`
  font-size: 14px;
  color: #475569;
  width: 200px;
`;

export const ScoreSlider = styled.div`
  flex: 1;
  height: 10px;
  background-color: #f1f5f9;
  border-radius: 5px;
  margin: 0 16px;
  position: relative;
`;

export const ScoreSliderFill = styled.div`
  height: 100%;
  background-color: #4f46e5;
  border-radius: 5px;
  width: ${(props) => `${props.value}%`};
`;

export const ScoreSliderThumb = styled.div`
  width: ${(props) => (props.active ? "28px" : "20px")};
  height: ${(props) => (props.active ? "28px" : "20px")};
  border-radius: 50%;
  background-color: white;
  border: ${(props) => (props.active ? "3px" : "2px")} solid #4f46e5;
  position: absolute;
  top: 50%;
  left: ${(props) => `${props.value}%`};
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.2s ease;
`;

export const FeedbackContainer = styled.div`
  background-color: ${(props) => (props.active ? "#EFF6FF" : "white")};
  border-radius: 8px;
  border: 1px solid ${(props) => (props.active ? "#3B82F6" : "#4F46E5")};
  padding: ${(props) => (props.active ? "16px" : "0")};
  margin-top: 24px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    !props.active &&
    css`
      border-style: dashed;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    `}
`;

export const FeedbackTextArea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #e2e8f0;
  background-color: white;
  font-size: 14px;
  color: #1e293b;
  resize: none;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const FeedbackNote = styled.p`
  font-size: 12px;
  color: #64748b;
  margin-top: 16px;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 24px;
`;

export const CardContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 24px;
  margin-bottom: 24px;
`;
export const CardContent = styled.div`
  padding: 24px;
`;
export const CardHeader = styled.div`
  background-color: #f1f5f9;
  padding: 16px 24px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const SuccessIcon = styled.div`
  background-color: #10b981;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;
