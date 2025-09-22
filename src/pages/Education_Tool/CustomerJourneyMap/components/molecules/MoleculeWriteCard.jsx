import React, { useState, useRef } from "react";
import styled from "styled-components";
import { palette } from "../../../../../assets/styles/Palette";

const MoleculeWriteCard = ({ 
  placeholder = "직접 입력",
  onSubmit,
  value,
  onChange,
  buttonText = "등록"
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <InputContainer>
      <CardContent>
        <InputField
          ref={inputRef}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
      </CardContent>
      <IconContainer>
        <RegisterButton 
          onClick={onSubmit}
          active={value.trim() !== ""}
          disabled={!value.trim()}
        >
          {buttonText}
        </RegisterButton>
      </IconContainer>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 56px;
  padding: 16px 20px;
  border: 1px solid ${palette.outlineGray};
  border-radius: 10px;
  background-color: ${palette.white};
  box-sizing: border-box;
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  height: 24px;
`;

const InputField = styled.textarea`
  width: 100%;
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.55;
  letter-spacing: -0.03em;
  color: ${palette.gray700};
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  padding: 0;
  margin: 0;
  height: 24px;
  max-height: 120px;
  overflow-y: hidden;
  display: block;

  &::placeholder {
    color: ${palette.gray300};
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
`;

const RegisterButton = styled.button`
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.2;
  letter-spacing: -0.03em;
  background-color: ${props => props.active ? palette.brightBlue : palette.chatGray};
  color: ${props => props.active ? palette.primary : palette.gray500};
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: ${props => props.active ? 'pointer' : 'default'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${props => props.active ? palette.brightBlue : palette.chatGray};
  }
`;

export default MoleculeWriteCard;