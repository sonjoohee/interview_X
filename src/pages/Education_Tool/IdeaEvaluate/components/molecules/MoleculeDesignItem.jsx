import React, { useState } from 'react';
import styled from 'styled-components';
import {
  ListBoxItem,
  ListText,
  ListTitle,
  ListSubtitle,
  ListButton,
  BoxListWrap,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import {
  Body1,
  Body3,
  Caption1,
} from "../../../../../assets/styles/Typography";
import { Button } from "../../../../../assets/styles/ButtonStyle";
import { CheckBoxButton } from '../../../../../assets/styles/InputStyle';
import { palette } from '../../../../../assets/styles/Palette';



const MoleculeDesignItem = ({ title, subtitle, isSelected, onSelect, id, disabled, question, onAnswerChange }) => {
  const [showQuestions, setShowQuestions] = useState(false);

  const handleQuestionClick = () => {
    setShowQuestions(!showQuestions);
  };

  const details = id === 'ab_test' 
    ? question[id].options
    : id === 'single_choice' || id === 'custom_question'
    ? question[id].options
    : [question[id].options];

  return (
    <ListBoxItem 
      selected={isSelected} 
      active={isSelected} 
      Small 
      style={{ 
        marginBottom: '-26px',
        position: 'relative',
        padding: '16px'
      }}
      showQuestions={showQuestions}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        position: 'relative',
        width: '100%',
        minHeight: '48px'
      }}>
        <div style={{ 
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '100%'
        }}>
          <CheckBoxButton
            id={id}
            name={id}
            checked={isSelected}
            onChange={() => onSelect(id)}
            disabled={disabled}
            style={{ 
              cursor: 'pointer',
              margin: 0
            }}
          />
        </div>
        <ListText style={{ 
          flex: 1, 
          minWidth: 0, 
          paddingRight: '120px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <ListTitle style={{ marginBottom: '0' }}>
            <Caption1 
              style={{ 
                fontSize: '14px', 
                lineHeight: '1.3' 
              }} 
              color={isSelected ? "primary" : "gray500"}
            >
              {title}
            </Caption1>
          </ListTitle>
          <ListSubtitle>
            <Body1 
              style={{ 
                fontSize: '14px',
                textAlign: 'left',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap'
              }} 
              color="gray800"
            >
              {subtitle}
            </Body1>
          </ListSubtitle>
        </ListText>
        <ListButton style={{ 
          position: 'absolute',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '86px'
        }}>
          <Button
            Medium
            {...(showQuestions
              ? { PrimaryLightest: true, Fill: true }
              : { View: true })}
            onClick={handleQuestionClick}
            style={{
              width: '100%'
            }}
          >
            {showQuestions ? "문항 닫기" : "문항 보기"}
          </Button>
        </ListButton>
      </div>

      {showQuestions && (
        <BoxListWrap style={{ marginTop: '16px' }}>
          <div>
            <BgBoxList>
              {id === 'ab_test' ? (
              // A/B 테스트일 때
              details.map((detail, index) => (
                <BgBoxItem key={index}>
                  <Body3 color="gray700" align="left">
                    {index === 0 ? 'A : ' : 'B : '}
                  </Body3>
                  <Body3 color="gray700" align="left">{detail}</Body3>
                </BgBoxItem>
              ))
            ) : id === 'nps' ? (
              <NPSContainer>
                <NPSButtonsWrapper>
                  {[...Array(11)].map((_, index) => {
                    const isOptionSelected = question[id].answer === index;
                    
                    return (
                      <NPSButton
                        key={index}
                        isSelected={isOptionSelected}
                        onClick={() => onAnswerChange(id, index)}
                      >
                        <NPSButtonText isSelected={isOptionSelected}>
                          {index}
                        </NPSButtonText>
                      </NPSButton>
                    );
                  })}
                </NPSButtonsWrapper>
                <NPSLabelContainer>
                  <NPSLabel>전혀 추천하고 싶지 않다</NPSLabel>
                  <NPSLabel>매우 추천하고 싶다</NPSLabel>
                </NPSLabelContainer>
              </NPSContainer>
            ) : id === 'importance' ? (
              <ImportanceContainer>
                <ImportanceButtonsWrapper>
                  {question[id].options.map((option) => {
                    const isOptionSelected = question[id].answer === option;
                    const formattedText = option === '전혀 중요하지 않음' ? '전혀\n중요하지 않음' :
                                        option === '중요하지 않음' ? '중요하지\n않음' :
                                        option === '매우 중요함' ? '매우\n중요함' :
                                        option;
                    
                    return (
                      <ImportanceButton
                        key={option}
                        isSelected={isOptionSelected}
                        onClick={() => onAnswerChange(id, option)}
                      >
                        <ImportanceButtonText isSelected={isOptionSelected}>
                          {formattedText}
                        </ImportanceButtonText>
                      </ImportanceButton>
                    );
                  })}
                </ImportanceButtonsWrapper>
              </ImportanceContainer>
            ) : (
              // single_choice일 때
              details.map((detail, index) => (
                <BgBoxItem key={index}>
                  <Body3 color="gray700" align="left">{`${String(index + 1).padStart(2, "0")}.`}</Body3>
                  <Body3 color="gray700" align="left">{detail}</Body3>
                </BgBoxItem>
              ))
            )}
                      </BgBoxList>
          </div>
        </BoxListWrap>
      )}
    </ListBoxItem>
  );
};

const BgBoxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 4px;
`;

const BgBoxItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  background: ${palette.chatGray};
`;

export default MoleculeDesignItem;


const ImportanceContainer = styled.div`
   display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
`;

const ImportanceDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #E0E4EB;
`;

const ImportanceButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  gap: 20px;
  width: 100%;
`;

const ImportanceButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  background-color: ${props => props.isSelected ? palette.primary : palette.chatGray};
  border: 1px solid ${palette.outlineGray};
  border-radius: 10px;
  height: 80px;
  flex: 1;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.isSelected ? '#226FFF' : '#EAECF0'};
  }
`;

const ImportanceButtonText = styled.span`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 400;
  font-size: 16px;
  line-height: 1.55;
  letter-spacing: -0.03em;
  text-align: center;
  color: ${props => props.isSelected ? palette.white : palette.gray700};
  white-space: pre-line;
`;

const NPSContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
`;

const NPSDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${palette.outlineGray};
`;

const NPSButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  gap: 16px;
  width: 100%;
`;

const NPSButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  background-color: ${props => props.isSelected ? palette.primary : palette.chatGray};
  border: 1px solid ${palette.outlineGray};
  border-radius: 10px;
  height: 64px;
  flex: 1;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.isSelected ? '#226FFF' : '#EAECF0'};
  }
`;

const NPSButtonText = styled.span`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 400;
  font-size: 16px;
  line-height: 1.55;
  letter-spacing: -0.03em;
  text-align: center;
  color: ${props => props.isSelected ? palette.white : palette.gray700};
`;

const NPSLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const NPSLabel = styled.span`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 400;
  font-size: 16px;
  line-height: 1.55;
  letter-spacing: -0.03em;
  color: ${palette.gray700};
`;