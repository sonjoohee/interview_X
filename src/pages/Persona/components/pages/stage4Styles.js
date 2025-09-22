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

// Methodology Card Components
export const MethodologyCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin-bottom: 32px;
`;

export const MethodologyCard = styled.div`
  width: 330px;
  height: 350px;
  border-radius: 8px;
  border: 2px solid
    ${({ isSelected, isRecommended }) =>
      isSelected ? "#3B82F6" : isRecommended ? "#10B981" : "#e2e8f0"};
  background-color: ${({ isSelected, isRecommended }) =>
    isSelected ? "#EFF6FF" : isRecommended ? "#F0FDF4" : "white"};
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s ease;
`;

export const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #1e293b;
  margin: 16px 0 8px;
  text-align: center;
`;

export const CardDescription = styled.p`
  font-size: 14px;
  color: #475569;
  text-align: center;
  margin-bottom: 8px;
`;

export const CardDetail = styled.p`
  font-size: 14px;
  color: #475569;
  text-align: center;
  margin-bottom: 8px;
`;

export const CardPros = styled.p`
  font-size: 14px;
  color: #475569;
  text-align: center;
  margin-bottom: 8px;
`;

export const CardCons = styled.p`
  font-size: 14px;
  color: #475569;
  text-align: center;
  margin-bottom: 16px;
`;

export const RecommendBadge = styled.div`
  width: 150px;
  height: 50px;
  border-radius: 25px;
  background-color: #f8fafc;
  border: 2px solid #10b981;
  color: #10b981;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const SelectButton = styled.button`
  width: 150px;
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
  background-color: ${({ isSelected }) => (isSelected ? "#3B82F6" : "#f8fafc")};
  border: 2px solid ${({ isSelected }) => (isSelected ? "#3B82F6" : "#e2e8f0")};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 16px;
  left: 16px;
`;

export const SelectionDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: white;
`;

// Custom Method Input
export const CustomMethodContainer = styled.div`
  width: 100%;
  max-width: 850px;
  margin: 0 auto 24px;
  padding: 24px;
  border-radius: 8px;
  border: 2px solid ${({ isActive }) => (isActive ? "#3B82F6" : "#e2e8f0")};
  background-color: ${({ isActive }) => (isActive ? "#f8fafc" : "#f8fafc")};
`;

export const CustomMethodLabel = styled.label`
  display: block;
  font-size: 16px;
  color: #475569;
  margin-bottom: 8px;
`;

export const CustomMethodInput = styled.input`
  width: 550px;
  height: 40px;
  border-radius: 5px;
  background-color: white;
  border: 1px solid #e2e8f0;
  padding: 0 16px;
  font-size: 14px;
  color: #1e293b;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

// AI Recommendation Notice
export const RecommendationNotice = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 24px;
  padding: 16px;
  border-radius: 8px;
  background-color: #f0fdf4;
  border: 1px solid #d1fae5;
  display: flex;
  align-items: center;
`;

export const RecommendationIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

export const RecommendationText = styled.span`
  font-size: 16px;
  color: ${({ isHighlighted }) => (isHighlighted ? "#059669" : "#1e293b")};
  font-weight: ${({ isHighlighted }) => (isHighlighted ? "bold" : "normal")};
`;

// Detail Modal
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
  width: 900px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.3s ease-out;
`;

export const ModalHeader = styled.div`
  background-color: #f8fafc;
  padding: 16px 24px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #1e293b;
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
  font-size: 20px;
  color: #64748b;
  cursor: pointer;

  &:hover {
    background-color: #e2e8f0;
  }
`;

export const ModalContent = styled.div`
  padding: 24px;
`;

export const ModalSection = styled.div`
  margin-bottom: 24px;
`;

export const ModalSectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 16px;
`;

export const ModalText = styled.p`
  font-size: 16px;
  color: #475569;
  line-height: 1.5;
  margin-bottom: 8px;
`;

export const TwoColumnLayout = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
`;

export const Column = styled.div`
  flex: 1;
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
  background-color: ${({ isPrimary }) =>
    isPrimary ? "linear-gradient(to right, #4F46E5, #7E3AF2)" : "#f8fafc"};
  background: ${({ isPrimary }) =>
    isPrimary ? "linear-gradient(to right, #4F46E5, #7E3AF2)" : "#f8fafc"};
  color: ${({ isPrimary }) => (isPrimary ? "white" : "#475569")};
  font-size: 16px;
  font-weight: ${({ isPrimary }) => (isPrimary ? "bold" : "normal")};
  border: ${({ isPrimary }) => (isPrimary ? "none" : "1px solid #e2e8f0")};
  cursor: pointer;

  &:hover {
    opacity: ${({ isPrimary }) => (isPrimary ? 0.9 : 1)};
    background-color: ${({ isPrimary }) => (isPrimary ? "" : "#f1f5f9")};
  }
`;

// Heuristic Principles Components
export const PrinciplesContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 32px;
  padding: 24px;
  border-radius: 8px;
  background-color: white;
  border: 2px solid #e2e8f0;
`;

export const PrincipleItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const PrincipleCheckbox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${({ isSelected }) => (isSelected ? "#3B82F6" : "#f1f5f9")};
  border: 1px solid ${({ isSelected }) => (isSelected ? "#3B82F6" : "#e2e8f0")};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
`;

export const PrincipleName = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${({ isDisabled }) => (isDisabled ? "#94a3b8" : "#1e293b")};
  width: 220px;
`;

export const SliderContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0 16px;
`;

export const Slider = styled.div`
  flex: 1;
  height: 10px;
  background-color: #f1f5f9;
  border-radius: 5px;
  position: relative;
`;

export const SliderFill = styled.div`
  height: 100%;
  background-color: ${({ isDisabled }) => (isDisabled ? "#94a3b8" : "#3B82F6")};
  border-radius: 5px;
  width: ${({ value }) => `${value * 2}%`};
`;

export const SliderThumb = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid ${({ isDisabled }) => (isDisabled ? "#94a3b8" : "#3B82F6")};
  position: absolute;
  top: 50%;
  left: ${({ value }) => `${value * 2}%`};
  transform: translate(-50%, -50%);
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
`;

export const WeightValue = styled.span`
  font-size: 16px;
  color: ${({ isDisabled }) => (isDisabled ? "#94a3b8" : "#1e293b")};
  width: 40px;
  text-align: right;
`;

// SUS Questions Components
export const QuestionsContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 32px;
  padding: 24px;
  border-radius: 8px;
  background-color: white;
  border: 2px solid #e2e8f0;
`;

export const QuestionItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const QuestionCheckbox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${({ isSelected }) => (isSelected ? "#3B82F6" : "#f1f5f9")};
  border: 1px solid ${({ isSelected }) => (isSelected ? "#3B82F6" : "#e2e8f0")};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
`;

export const QuestionText = styled.span`
  font-size: 16px;
  color: #1e293b;
  flex: 1;
`;

export const EditButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  cursor: pointer;

  &:hover {
    background-color: #f1f5f9;
  }
`;

// Custom Methodology Form
export const CustomFormContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 32px;
  padding: 24px;
  border-radius: 8px;
  background-color: white;
  border: 2px solid #3b82f6;
`;

export const FormField = styled.div`
  margin-bottom: 24px;
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
  border: 1px solid #e2e8f0;
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

export const LoadingDotsContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 48px;
`;

export const LoadingDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #4f46e5;
  opacity: ${({ index }) => 0.2 + index * 0.3};
  animation: ${pulse} 1.5s infinite;
  animation-delay: ${({ index }) => index * 0.25}s;
`;

export const MethodInfo = styled.div`
  width: 500px;
  padding: 24px;
  border-radius: 8px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  margin-bottom: 32px;
`;

export const MethodInfoTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
  text-align: center;
  margin-bottom: 16px;
`;

export const MethodInfoText = styled.p`
  font-size: 14px;
  color: #475569;
  text-align: center;
  margin-bottom: 8px;
`;

export const StageLabelsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
`;

export const StageIndicator = styled.div`
  width: 50px;
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

// Action Buttons
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

export const ResetButton = styled.button`
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

export const StageLabel = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
`;

// Show More Button
export const ShowMoreButton = styled.button`
  width: 150px;
  height: 40px;
  border-radius: 20px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #475569;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #f1f5f9;
  }
`;

// Add Question Button
export const AddQuestionButton = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 20px;
  background-color: #f8fafc;
  border: 1px solid #3b82f6;
  color: #3b82f6;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #eff6ff;
  }
`;
