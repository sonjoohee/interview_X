import React from 'react';
import styled from 'styled-components';
import {
  ListBoxItem,
  ListText,
  ListTitle,
  ListSubtitle,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import {
  Body1,
  Sub2,
} from "../../../../../assets/styles/Typography";
import { CheckBoxButton } from '../../../../../assets/styles/InputStyle';


const MoleculeDesignItem = ({ title, subtitle, isSelected, onSelect, id, disabled, FlexStart }) => {
  return (
    <ListBoxItem NoBg selected={isSelected} active={isSelected} FlexStart={FlexStart}>
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

export default MoleculeDesignItem; 

// const CheckCircle = styled.div`
//   width: 24px;
//   height: 24px;
//   border-radius: 50%;
//   cursor: pointer;
//   background-image: ${(props) =>
//     props.$isChecked
//       ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23226FFF'/%3E%3Cpath d='M6.76562 12.4155L9.9908 15.6365L17.2338 8.36426' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
//       : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='11.5' stroke='%23E0E4EB'/%3E%3C/svg%3E")`};
//   transition: background-image 0.3s ease-in-out;
//   cursor: pointer;
// `;