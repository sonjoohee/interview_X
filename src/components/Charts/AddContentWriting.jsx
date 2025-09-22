import React, { useState } from 'react';
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
  padding: 8px 44px 8px 12px;
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

const CheckButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  width: 40px;
  height: 57px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none !important;
  position: absolute;
  right: 4px;
  top: 0;
`;

const CheckMarkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12L10 17L19 8"
      stroke={PRIMARY_COLOR}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round" />
  </svg>
);

const AddContentWriting = ({
  company = '',
  product = '',
  ceo = '',
  onSendChat = () => {},
}) => {
  // value: 현재 입력값, submitted: 마지막 제출값, showCheck: 체크표시 노출 여부
  const [companyState, setCompanyState] = useState({ value: company, submitted: company, showCheck: false });
  const [productState, setProductState] = useState({ value: product, submitted: product, showCheck: false });
  const [ceoState, setCeoState] = useState({ value: ceo, submitted: ceo, showCheck: false });

  // 입력값 변경 시 체크표시 노출
  const handleChange = (field, value) => {
    if (field === 'company') setCompanyState(s => ({ ...s, value, showCheck: true }));
    if (field === 'product') setProductState(s => ({ ...s, value, showCheck: true }));
    if (field === 'ceo') setCeoState(s => ({ ...s, value, showCheck: true }));
  };

  // 포커스 시 체크표시 노출
  const handleFocus = (field) => {
    if (field === 'company') setCompanyState(s => ({ ...s, showCheck: true }));
    if (field === 'product') setProductState(s => ({ ...s, showCheck: true }));
    if (field === 'ceo') setCeoState(s => ({ ...s, showCheck: true }));
  };

  // 체크 클릭 시: 체크표시 숨기고, 입력값을 submitted로 저장, onSendChat 호출
  const handleSend = (field) => {
    if (field === 'company') {
      const v = companyState.value.trim();
      if (v) {
        setCompanyState({ value: v, submitted: v, showCheck: false });
        onSendChat(field, v);
      }
    }
    if (field === 'product') {
      const v = productState.value.trim();
      if (v) {
        setProductState({ value: v, submitted: v, showCheck: false });
        onSendChat(field, v);
      }
    }
    if (field === 'ceo') {
      const v = ceoState.value.trim();
      if (v) {
        setCeoState({ value: v, submitted: v, showCheck: false });
        onSendChat(field, v);
      }
    }
  };

  // 엔터 입력 시 체크와 동일하게 동작
  const handleKeyDown = (field, e) => {
    if (e.key === 'Enter') handleSend(field);
  };

  return (
    <Wrapper>
      <FieldsFrame>
        <FieldRow>
          <Label htmlFor="company">회사명</Label>
          <InputRow>
            <ChatInputBox
              id="company"
              name="company"
              value={companyState.value}
              onChange={e => handleChange('company', e.target.value)}
              onFocus={() => handleFocus('company')}
              placeholder="회사명을 입력하세요"
              autoComplete="off"
              onKeyDown={e => handleKeyDown('company', e)}
            />
            {companyState.showCheck && (
              <CheckButton
                type="button"
                onClick={() => handleSend('company')}
                tabIndex={-1}
                aria-label="회사명 채팅 전송"
              >
                <CheckMarkIcon />
              </CheckButton>
            )}
          </InputRow>
        </FieldRow>
        <FieldRow>
          <Label htmlFor="product">제품명</Label>
          <InputRow>
            <ChatInputBox
              id="product"
              name="product"
              value={productState.value}
              onChange={e => handleChange('product', e.target.value)}
              onFocus={() => handleFocus('product')}
              placeholder="제품명을 입력하세요"
              autoComplete="off"
              onKeyDown={e => handleKeyDown('product', e)}
            />
            {productState.showCheck && (
              <CheckButton
                type="button"
                onClick={() => handleSend('product')}
                tabIndex={-1}
                aria-label="제품명 채팅 전송"
              >
                <CheckMarkIcon />
              </CheckButton>
            )}
          </InputRow>
        </FieldRow>
        <FieldRow>
          <Label htmlFor="ceo">대표자명</Label>
          <InputRow>
            <ChatInputBox
              id="ceo"
              name="ceo"
              value={ceoState.value}
              onChange={e => handleChange('ceo', e.target.value)}
              onFocus={() => handleFocus('ceo')}
              placeholder="대표자명을 입력하세요"
              autoComplete="off"
              onKeyDown={e => handleKeyDown('ceo', e)}
            />
            {ceoState.showCheck && (
              <CheckButton
                type="button"
                onClick={() => handleSend('ceo')}
                tabIndex={-1}
                aria-label="대표자명 채팅 전송"
              >
                <CheckMarkIcon />
              </CheckButton>
            )}
          </InputRow>
        </FieldRow>
      </FieldsFrame>
    </Wrapper>
  );
};

export default AddContentWriting; 