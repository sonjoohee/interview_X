import React, { useState } from 'react';
import styled from 'styled-components';
import {
  ListBoxItem,
  ListText,
  ListTitle,
  ListSubtitle,
  InterviewPopup,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import {
  Body1,
  Sub2,
} from "../../../../../assets/styles/Typography";
import { CheckBoxButton } from "../../../../../assets/styles/InputStyle";
import { Button } from "../../../../../assets/styles/ButtonStyle";
import {
    H1,
    H4,
  } from "../../../../../assets/styles/Typography";

const MoleculeConceptSelectCard = ({ title ,isSelected, onSelect, id, disabled, FlexStart, onShowPopup, currentPersona }) => {


  const handleQuestionClick = () => {
    onShowPopup && onShowPopup(true, id);
  };

  return (
    <ListBoxItem Small NoBg selected={isSelected} active={isSelected} FlexStart={FlexStart} 
    style={{ 
        marginBottom: '-26px',
        position: 'relative',
        padding: '16px'
      }}>
      <div>
      <CheckBoxButton
        id={id}
        name={id}
        checked={isSelected}
        onChange={() => onSelect(id)}
        disabled={disabled}
        style={{ cursor: 'pointer' }}
        
      />
      </div>
      <ListText>
        <ListTitle>
          <Body1 color="gray800" align="left">{title}</Body1>
        </ListTitle>
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
            // {...(showPopup
            //   ? { PrimaryLightest: true, Fill: true }
            //   : { View: true })}
            View
            onClick={handleQuestionClick}
            style={{
              width: '100%'
            }}
          >
            내용보기
            {/* {showPopup ? "문항 닫기" : "문항 보기"} */}
          </Button>
        </ListButton>
       
    </ListBoxItem>

    
  );
};

export default MoleculeConceptSelectCard; 

export const ListButton = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`;
