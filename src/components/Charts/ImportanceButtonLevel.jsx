import React, { useState } from 'react';
import styled from 'styled-components';

const ImportanceButtonLevel = ({ onChange }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleClick = (value) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  const buttons = Array.from({ length: 11 }, (_, i) => i);

  return (
    <Container>
      <Divider />
      <ButtonsWrapper>
        {buttons.map((value) => (
          <ButtonItem 
            key={value}
            isSelected={selectedValue === value}
            onClick={() => handleClick(value)}
          >
            <ButtonText isSelected={selectedValue === value}>
              {value}
            </ButtonText>
          </ButtonItem>
        ))}
      </ButtonsWrapper>
      <LabelContainer>
        <Label>전혀 추천하고 싶지 않다</Label>
        <Label>매우 추천하고 싶다</Label>
      </LabelContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 20px;
  padding: 0 0 0 36px;
  width: 772px;
  box-sizing: border-box;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #E0E4EB;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  gap: 16px;
  width: 100%;
`;

const ButtonItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  background-color: ${props => props.isSelected ? '#226FFF' : '#F7F8FA'};
  border: 1px solid #E0E4EB;
  border-radius: 10px;
  height: 64px;
  flex: 1;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.isSelected ? '#226FFF' : '#EAECF0'};
  }
`;

const ButtonText = styled.span`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 400;
  font-size: 16px;
  line-height: 1.55;
  letter-spacing: -0.03em;
  text-align: center;
  color: ${props => props.isSelected ? '#FFFFFF' : '#666666'};
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const Label = styled.span`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 400;
  font-size: 16px;
  line-height: 1.55;
  letter-spacing: -0.03em;
  color: #666666;
`;

export default ImportanceButtonLevel; 