import React from 'react';
import styled from 'styled-components';
import { palette } from "../../assets/styles/Palette";

/**
 * WaitLongLodingBar 스타일의 라디오 버튼 컴포넌트
 * @param {Object} props
 * @param {string} props.id - 라디오 버튼 ID
 * @param {string} props.name - 라디오 버튼 이름
 * @param {boolean} props.checked - 선택 여부
 * @param {function} props.onChange - 변경 핸들러
 * @param {boolean} [props.disabled=false] - 비활성화 여부
 * @param {number} [props.step=1] - 스텝 번호
 * @param {number} [props.size=24] - 버튼 크기 (픽셀)
 * @param {string} [props.baseColor="#D6E4FF"] - 배경 색상
 * @param {string} [props.primaryColor="#226FFF"] - 메인 색상
 * @returns {JSX.Element} 스텝 라디오 버튼 컴포넌트
 */
const StepRadioButton = ({
  id,
  name,
  checked,
  onChange,
  disabled = false,
  step = 1,
  size = 24,
  baseColor = "#D6E4FF",
  primaryColor = "#226FFF"
}) => {
  return (
    <StepButtonWrapper>
      <HiddenRadioInput
        type="radio"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <StepButtonLabel 
        htmlFor={id} 
        checked={checked} 
        disabled={disabled}
        size={size}
      >
        <OuterCircle 
          checked={checked} 
          baseColor={baseColor} 
          primaryColor={primaryColor}
          size={size}
        >
          {checked && (
            <InnerCircle 
              primaryColor={primaryColor}
              size={size * 0.6}
            >
              <StepText>Step {step}</StepText>
            </InnerCircle>
          )}
        </OuterCircle>
      </StepButtonLabel>
    </StepButtonWrapper>
  );
};

// 숨겨진 라디오 인풋
const HiddenRadioInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

// 버튼 래퍼
const StepButtonWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
`;

// 라디오 버튼 레이블
const StepButtonLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

// 외부 원
const OuterCircle = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.checked ? props.baseColor : 'white'};
  border: 1px solid ${props => props.checked ? props.primaryColor : palette.outlineGray};
  transition: all 0.2s ease;
`;

// 내부 원 (선택 시 표시)
const InnerCircle = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background-color: ${props => props.primaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 스텝 텍스트
const StepText = styled.span`
  color: white;
  font-family: 'Pretendard', Poppins;
  font-weight: 600;
  text-align: center;
`;

export default StepRadioButton; 