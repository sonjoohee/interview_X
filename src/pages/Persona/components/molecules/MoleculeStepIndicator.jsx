//페르소나 진행 상황 표시 컴포넌트(인터뷰 상세보기의 오른쪽 바 혹은  분석할때 )
import React from 'react';
import styled from 'styled-components';
import { palette } from '../../../../assets/styles/Palette';

const MoleculeStepIndicator = ({ steps, activeStep }) => {
  return (
    <StepContainer>
      {steps.map((step, index) => (
        <StepItem key={index}>
          <StepNumber active={step.active} completed={step.number < activeStep}>
            {step.number < activeStep ? (
              <CheckIcon />
            ) : (
              <span>{step.number}</span>
            )}
          </StepNumber>
          <StepLabel active={step.active}>
            {step.label}
          </StepLabel>
        </StepItem>
      ))}
    </StepContainer>
  );
};

export default MoleculeStepIndicator;


const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StepNumber = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: stretch;
  border-radius: 50px;
  border: 1px solid ${props => {
    if (props.completed) return palette.primary;
    return props.active ? palette.primary : palette.gray500;
  }};
  background-color: ${props => props.completed ? palette.primary : 'transparent'};
  
  span {
    width: 100%;
    height: 100%;
    font-size: 0.67rem;
    font-weight: 500;
    color: ${props => props.active ? palette.primary : palette.gray500};
  }
`;

const StepLabel = styled.div`
  font-size: 0.88rem;
  color: ${props => props.active ? palette.gray700 : palette.gray500};
  font-weight: 300;
  line-height: 1.5;
`;

const CheckIcon = styled.span`
  color: ${palette.white};
  font-size: 0.67rem;
  font-weight: bold;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6.92 5.93'%3E%3Cpath fill='%23fff' d='M2.28,5.93c-.14,0-.28-.06-.37-.17L.13,3.79c-.18-.21-.17-.52.04-.71.21-.19.52-.17.71.04l1.39,1.55L6.04.18c.18-.21.49-.24.7-.06.21.18.24.49.06.7L2.66,5.75c-.09.11-.23.18-.37.18h0Z'/%3E%3C/svg%3E") center no-repeat;
  background-size: 7px;
`;