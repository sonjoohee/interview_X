import React from "react";
import styled, { css } from "styled-components";
import { palette } from "../styles/Palette";

const getStatusColor = (props) => {
  if (props.status === "error") return palette.error;
  if (props.status === "valid") return palette.gray300;
  if (props.disabled) return palette.gray100;
  return palette.outlineGray;
};

export const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.Large ? "0" : "32px")};
  width: 100%;
  padding: ${(props) =>
    props.Small
      ? "8px 12px"
      : props.Medium
      ? "8px 16px"
      : props.Large
      ? "16px 20px"
      : "16px"};
  border-radius: 10px;
  border: 1px solid
    ${(props) =>
      props.status === "error" ? palette.error : palette.outlineGray};
  background: ${(props) => (props.disabled ? palette.gray100 : palette.white)};
  transition: all 0.5s;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "auto")};

  &:focus-within {
    border: ${(props) =>
      props.regenerate
        ? `1px solid ${palette.outlineGray}`
        : `1px solid ${palette.primary}`};
    box-shadow: ${(props) =>
      props.regenerate ? `` : `0 0 8px 0 rgba(34, 111, 255, 0.5)`};
  }
`;

export const InputWrap = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 30px;
`;

export const Label = styled.span`
  font-size: 0.75rem;
  color: ${getStatusColor};
  pointer-events: none;
  transition: all 0.5s;
`;

export const SelectBox = styled.div`
  position: relative;
  width: 100%;
 
`;

export const SelectBoxItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  cursor: pointer;
  transition: all 0.5s;
  padding: 13px 20px;


  /* Body1과 Body2를 가로로 배치하기 위한 스타일 */
  > div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
  }

  &:hover {
    background-color: ${palette.primaryLightest};
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const SelectBoxItem2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  cursor: pointer;
  transition: all 0.5s;
  padding: 13px 20px;
  white-space: nowrap;


  /* Body1과 Body2를 가로로 배치하기 위한 스타일 */
  > div {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: 4px;
    white-space: nowrap;
  }

  &:hover {
    background-color: ${palette.primaryLightest};
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const SelectBoxTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) =>
    props.None ? "0" : props.Small ? "8px 12px" : "16px 20px"};
  padding: ${(props) => (props.edit ? "15px" : "")};
  border-radius: 5px;
  border: ${(props) => (props.None ? "0" : `1px solid ${palette.outlineGray}`)};
  border-radius: ${(props) => (props.edit ? "10px" : " 5px")};
  cursor: pointer;
  z-index: 1;
  background-color: ${palette.white};

  &:hover {
    border-color: ${palette.primary};
  }
`;

export const SelectBoxList = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0px 0px 5px 5px;
  border: 1px solid ${palette.outlineGray};
  border-top: none;
  background: ${palette.white};
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.12);
  z-index: 2;

  // 드롭다운이 위로 표시될 때의 스타일
  ${(props) =>
    props.dropUp &&
    css`
      bottom: 100%;
      border-radius: 5px 5px 0 0;
      border-bottom: none;
      border-top: 1px solid ${palette.outlineGray};
      box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.12);
    `}

  // 드롭다운이 아래로 표시될 때의 스타일
  ${(props) =>
    !props.dropUp &&
    css`
      top: 100%;
      border-radius: 0 0 5px 5px;
      border-top: none;
      box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.12);
    `}

  > div {
    padding: 13px 20px;
  }
`;



export const CustomInput = styled.input`
  width: ${(props) => props.width || "100%"};
  font-family: "Pretendard";
  font-size: 1rem;
  line-height: 1.2;
  color: ${(props) =>
    props.status === "error" ? palette.error : palette.gray900};
  padding: ${(props) =>
    props.Small ? "13px 16px" : props.Medium ? "13px 20px" : "16px 20px"};
  border-radius: ${(props) => (props.Round ? "50px" : "5px")};
  border: 1px solid ${getStatusColor};
  outline: none;
  transition: all 0.5s;

  ${(props) =>
    props.Floating &&
    css`
      font-size: 0.94rem;
      line-height: 1;
      padding: 15px 12px;
      border-radius: 4px;
      border: 1px solid ${getStatusColor};

      + span {
        position: absolute;
        top: -8px;
        left: 12px;
        padding: 0 4px;
        background: ${palette.white};
      }
    `}

  ${(props) =>
    props.Edit &&
    css`
      font-size: 1rem;
      line-height: 1.3;
      padding: 0;
      border: 0;

      + span {
        position: absolute;
        top: -8px;
        left: 12px;
        padding: 0 4px;
        background: ${palette.white};
      }
    `}

  ${(props) =>
    props.NoLine &&
    css`
      font-size: 1rem;
      line-height: 1.55;
      padding: 0;
      border: 0;
    `}

  &:focus, &:hover {
    border-color: ${(props) =>
      props.status === "error"
        ? palette.error
        : props.status === "valid"
        ? palette.outlineGray
        : palette.main};

    ${(props) =>
      props.Floating &&
      `
      + span {
        color: ${(props) =>
          props.status === "error"
            ? palette.error
            : props.status === "valid"
            ? palette.gray300
            : palette.main};
      }
    `}
  }

  &:disabled {
    background: ${props => props.fix ? 'white' : palette.gray100};
    cursor: not-allowed;

    &:hover {
      border-color: ${palette.gray300};
    }
  }

  &::placeholder {
    font-size: ${(props) =>
      props.Small ? "0.875rem" : props.Medium ? "1rem" : "1rem"};
    color: ${palette.gray300};
  }
`;

export const CustomTextarea = styled.textarea`
  width: ${(props) => props.width || "100%"};
  font-family: "Pretendard";
  font-size: 1rem;
  line-height: 1.5;
  color: ${(props) =>
    props.status === "error" ? palette.error : palette.gray800};
  padding: ${(props) => (props.None ? "0" : "16px")};
  border-radius: 10px;
  border: ${(props) =>
    props.None ? "0" : `1px solid ${getStatusColor(props)}`};
  outline: none;
  resize: none;
  overflow: auto;
  transition: all 0.5s;
  margin-bottom: 10px;
  /* height: 320px !important; // 고정 높이 */

  ${(props) =>
    props.Edit &&
    css`
      font-size: 1rem;
      line-height: 1.5;
      padding: 0;
      margin: 0;
      border-radius: 0;
      border: 0;

      &::placeholder {
        font-weight: 300;
        color: ${palette.gray300} !important;
      }
    `}

  &:disabled {
    background: ${palette.gray100};
    cursor: not-allowed;
  }

  &::placeholder {
    font-weight: 300;
    // line-height: 1.5;
    color: ${palette.gray300};
  }

  &:focus,
  &:hover {
    border-color: ${(props) =>
      props.status === "error"
        ? palette.error
        : props.status === "valid"
        ? palette.outlineGray
        : palette.main};
  }
`;

export const ErrorMessage = styled.p`
  color: ${palette.error};
  font-size: 0.75rem;
  margin-left: ${(props) => (props.floating ? "14px" : "0")};
`;

// 라디오박스
export const CheckCircle = styled.input`
  appearance: none;
  display: block !important;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  margin-left: auto;
  border-radius: 50%;
  cursor: pointer;
  background-image: ${(props) =>
    props.checked
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23226FFF'/%3E%3Cpath d='M6.76562 12.4155L9.9908 15.6365L17.2338 8.36426' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='11.5' stroke='%23E0E4EB'/%3E%3C/svg%3E")`};
  transition: background-image 0.3s ease-in-out;

  + label {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;

    + label {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

// 라디오 버튼 컴포넌트
export const RadioButton = ({ id, name, checked, onChange, disabled }) => {
  return (
    <CheckCircle
      as="input"
      type="radio"
      id={id}
      name={name}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

// 체크박스 버튼 컴포넌트
export const CheckBoxButton = ({ id, name, checked, onChange, disabled }) => {
  return (
    <CheckCircle
      as="input"
      type="checkbox"
      id={id}
      name={name}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

// 성별 선택 라디오 버튼 스타일
export const RadioRightBox = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 200px;
  width: 100%;
  // padding: 8px 12px;
  padding: 11px 12px;
  border-radius: 10px;
  border: 1px solid
    ${(props) => (props.checked ? palette.primary : palette.outlineGray)};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: ${palette.primary};
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      border-color: ${(props) =>
        props.checked ? palette.primary : palette.outlineGray};
    }
  }
`;

export const GenderLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${(props) => (props.checked ? palette.primary : palette.gray800)};
  transition: all 0.3s;

  .icon-wrapper {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      transition: all 0.3s;
      filter: ${(props) =>
        props.checked
          ? "brightness(0) saturate(100%) invert(36%) sepia(98%) saturate(1900%) hue-rotate(210deg) brightness(98%) contrast(106%)"
          : ""};
    }
  }

  .check-circle {
    display: inline-block;
    width: 24px;
    height: 24px;
  }
`;

// 성별 선택 라디오 버튼 컴포넌트
export const GenderRadioButton = ({
  id,
  name,
  gender,
  checked,
  onChange,
  disabled,
  icon: Icon,
}) => {
  return (
    <RadioRightBox
      htmlFor={id}
      checked={checked}
      className={disabled ? "disabled" : ""}
    >
      <GenderLabel className={`gender ${gender}`} checked={checked}>
        {Icon && (
          <div className="icon-wrapper">
            {typeof Icon === "string" ? (
              <img src={Icon} alt={`Gender${gender}`} />
            ) : (
              Icon
            )}
          </div>
        )}
        {gender}
      </GenderLabel>
      <RadioButton
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    </RadioRightBox>
  );
};
