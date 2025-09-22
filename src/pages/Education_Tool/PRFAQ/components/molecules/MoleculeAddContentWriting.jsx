import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PRIMARY_COLOR = '#226FFF';
const GRAY_COLOR = '#E0E4EB';

// Figma 스타일 변수 반영
const Wrapper = styled.div`
  background: #fff;
  border: 1px solid #E0E4EB;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 32px 24px;
  width: 820px;
  height: 374px;
  box-sizing: border-box;
`;

const FieldsFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 20px;
  width: 100%;
`;

const FieldRow = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 12px;
`;

const Label = styled.label`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 500;
  font-size: 16px;
  line-height: 1.3;
  letter-spacing: -0.03em;
  color: #666666;
  text-align: left;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
`;

const ChatInputBox = styled.input`
  flex: 1;
  height: 57px;
  background: #fff;
  border: 1px solid #E0E4EB;
  border-radius: 10px;
  padding: 8px 12px;
  font-family: 'Pretendard', Poppins;
  font-size: 16px;
  color: #222;
  box-sizing: border-box;
  outline: none;
  transition: border 0.2s;
  text-align: left;
  &::placeholder {
    color: #cccccc;
  }
  &:focus {
    border: 1.5px solid #226FFF;
  }
`;

const MoleculeAddContentWriting = ({
  company = '',
  product = '',
  ceo = '',
  onSendChat = () => {},
  disabled = false,
}) => {
  // 각 필드의 입력값 관리
  const [companyValue, setCompanyValue] = useState(company);
  const [productValue, setProductValue] = useState(product);
  const [ceoValue, setCeoValue] = useState(ceo);

  // 입력값이 변경될 때 처리
  const handleChange = (field, value) => {
    if (field === 'company') {
      setCompanyValue(value);
      onSendChat(field, value);  // 입력값이 변경될 때마다 바로 상위 컴포넌트에 전달
    }
    if (field === 'product') {
      setProductValue(value);
      onSendChat(field, value);  // 입력값이 변경될 때마다 바로 상위 컴포넌트에 전달
    }
    if (field === 'ceo') {
      setCeoValue(value);
      onSendChat(field, value);  // 입력값이 변경될 때마다 바로 상위 컴포넌트에 전달
    }
  };

  // company, product, ceo props가 변경되면 내부 상태도 업데이트
  useEffect(() => {
    setCompanyValue(company);
    setProductValue(product);
    setCeoValue(ceo);
  }, [company, product, ceo]);

  return (
    <Wrapper>
      <FieldsFrame>
        <FieldRow>
          <Label htmlFor="company">회사명</Label>
          <InputRow>
            <ChatInputBox
              id="company"
              name="company"
              value={companyValue}
              onChange={e => handleChange('company', e.target.value)}
              placeholder="회사명을 입력하세요"
              autoComplete="off"
              disabled={disabled}
            />
          </InputRow>
        </FieldRow>
        <FieldRow>
          <Label htmlFor="product">제품명</Label>
          <InputRow>
            <ChatInputBox
              id="product"
              name="product"
              value={productValue}
              onChange={e => handleChange('product', e.target.value)}
              placeholder="제품명을 입력하세요"
              autoComplete="off"
              disabled={disabled}
            />
          </InputRow>
        </FieldRow>
        <FieldRow>
          <Label htmlFor="ceo">대표자명</Label>
          <InputRow>
            <ChatInputBox
              id="ceo"
              name="ceo"
              value={ceoValue}
              onChange={e => handleChange('ceo', e.target.value)}
              placeholder="대표자명을 입력하세요"
              autoComplete="off"
              disabled={disabled}
            />
          </InputRow>
        </FieldRow>
      </FieldsFrame>
    </Wrapper>
  );
};

export default MoleculeAddContentWriting; 