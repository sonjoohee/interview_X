import React, { useState } from 'react';
import styled from 'styled-components';

const ImportanceButtonGroup = ({ onChange }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleClick = (value) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Container>
      <Divider />
      <ButtonsWrapper>
        <ButtonItem 
          isSelected={selectedValue === 1}
          onClick={() => handleClick(1)}
        >
          <ButtonText>
            전혀<br />
            중요하지 않음
          </ButtonText>
        </ButtonItem>
        <ButtonItem 
          isSelected={selectedValue === 2}
          onClick={() => handleClick(2)}
        >
          <ButtonText>
            중요하지<br />
            않음
          </ButtonText>
        </ButtonItem>
        <ButtonItem 
          isSelected={selectedValue === 3}
          onClick={() => handleClick(3)}
        >
          <ButtonText>보통</ButtonText>
        </ButtonItem>
        <ButtonItem 
          isSelected={selectedValue === 4}
          onClick={() => handleClick(4)}
        >
          <ButtonText>중요함</ButtonText>
        </ButtonItem>
        <ButtonItem 
          isSelected={selectedValue === 5}
          onClick={() => handleClick(5)}
        >
          <ButtonText>
            매우<br />
            중요함
          </ButtonText>
        </ButtonItem>
      </ButtonsWrapper>
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
  gap: 20px;
  width: 100%;
`;

const ButtonItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  background-color: ${props => props.isSelected ? '#226FFF' : '#F7F8FA'};
  border: 1px solid #E0E4EB;
  border-radius: 10px;
  height: 80px;
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

export default ImportanceButtonGroup; 