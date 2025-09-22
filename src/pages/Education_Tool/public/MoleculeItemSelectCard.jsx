import React from 'react';
import styled from 'styled-components';
import {
  ListBoxItem,
  ListText,
  ListTitle,
  ListSubtitle,
} from "../../../assets/styles/BusinessAnalysisStyle";
import {
  Body1,
  Sub2,
} from "../../../assets/styles/Typography";
import { CheckBoxButton } from "../../../assets/styles/InputStyle";


const MoleculeItemSelectCard = ({ title ,isSelected, onSelect, id, disabled, FlexStart }) => {
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
    </ListBoxItem>
  );
};

export default MoleculeItemSelectCard; 
