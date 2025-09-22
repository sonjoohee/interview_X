import React from 'react';
import styled from 'styled-components';
import { palette } from '../../assets/styles/Palette';

const StepIndicator = ({ steps }) => {
  const activeStep = steps.find(step => step.active)?.number || 1;

  return (
    <StepContainer>
      {steps.map((step, index) => (
        <StepItem key={index}>
          <StepNumber active={step.active} completed={step.number < activeStep}>
            {step.number < activeStep ? (
              <CheckIcon>✓</CheckIcon>
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

export default StepIndicator;


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
`;