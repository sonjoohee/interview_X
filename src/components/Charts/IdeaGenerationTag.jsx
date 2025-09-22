import React, { useState } from "react";
import styled, { css } from "styled-components";
import { palette } from "../../assets/styles/Palette";

const TagContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.selected ? '13px 25px' : '12px 24px'};
  margin: 0px;
  background-color: ${props => props.selected ? palette.gray800 : palette.chatGray};
  border: ${props => props.selected ? 'none' : `1px solid ${palette.outlineGray}`};
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    background-color: ${props => props.selected ? palette.gray900 : palette.gray100};
  }
`;

const TagText = styled.span`
  font-family: 'Pretendard', Poppins;
  font-size: 16px;
  font-weight: ${props => props.selected ? '600' : '400'};
  line-height: 155%;
  letter-spacing: -0.03em;
  color: ${props => props.selected ? palette.white : palette.gray500};
  white-space: nowrap;
`;

const CheckIcon = styled.svg`
  margin-right: 8px;
  flex-shrink: 0;
`;

const IdeaGenerationTag = ({ text, onClick, initialSelected = false }) => {
  const [selected, setSelected] = useState(initialSelected);

  const handleClick = (e) => {
    setSelected(!selected);
    if (onClick) {
      onClick(e, !selected);
    }
  };

  return (
    <TagContainer selected={selected} onClick={handleClick}>
      {selected && (
        <CheckIcon width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.77777 8.49989L6.22063 12.9443L14.2178 4.94434" stroke="white" strokeWidth="1.77778" strokeLinecap="round" strokeLinejoin="round"/>
        </CheckIcon>
      )}
      <TagText selected={selected}>{text}</TagText>
    </TagContainer>
  );
};

export default IdeaGenerationTag; 