import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../../assets/styles/ButtonStyle';
import { Body2 } from '../../../assets/styles/Typography';
import {
    CustomInput,
  } from "../../../assets/styles/InputStyle";
import images from "../../../assets/styles/Images";

const MoleculeDeleteForm = ({
  items = [],
  setItems,
  disabled = false,
  maxItems = 10,
  placeholder = "핵심 가치를 작성해주세요 (예: 안전한 송금 등)",
  addButtonText = "+ 추가하기",
  initialItemCount = 7,
  edit = true,
  showTool = true
}) => {
  const [initialItems, setInitialItems] = useState([]);


  useEffect(() => {
    if (!items.length) {
      const newItems = new Array(initialItemCount).fill("");
      setItems(newItems);
      setInitialItems(newItems); // 초기 아이템 저장
    } else {
      setInitialItems(items); // 이미 있는 아이템도 초기 아이템으로 저장
    }
  }, []);

  const handleChange = (index, value) => {
    setItems(prev => {
      const newItems = [...prev];
      newItems[index] = value;
      return newItems;
    });
  };

  const handleDelete = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
    setInitialItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    setItems(prev => [...prev, ""]);
  };

  return (
    <FormContainer>
      {items.map((item, index) => (
        <DeleteFormWrap key={index}>
          <CustomInput
            disabled={!edit && index < initialItems.length} 
            type="text"
            placeholder={placeholder}
            value={item}
            onChange={(e) => handleChange(index, e.target.value)}
            fix
          />
          {showTool && (
            <DeleteButton 
              onClick={() => handleDelete(index)}
              disabled={disabled}
            />
          )}
        </DeleteFormWrap>
      ))}
      {items.length < maxItems && !disabled && showTool && (
        <Button
          DbExLarge
          More
          onClick={handleAdd}
        >
          <Body2 color="gray300">{addButtonText}</Body2>
        </Button>
      )}
    </FormContainer>
  );
};

// // Styled Components
// const DeleteFormWrap = styled.div`
//   display: flex;
//   gap: 8px;
//   margin-bottom: 8px;
// `;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DeleteFormWrap = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: none;
  background: url(${images.Trash}) no-repeat center;
  background-size: contain;
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export default MoleculeDeleteForm;
