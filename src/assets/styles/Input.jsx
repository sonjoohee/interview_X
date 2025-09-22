import styled from "styled-components";
import { palette } from "./Palette";
import images from "./Images";

// input
export const InputField = styled.input`
  width:100%;
  height:${props => {
    if (props.None) return `40px`;
    else return `50px`;
  }};
  font-family: 'Pretendard', 'Poppins';
  font-size:1rem;
  padding:${props => {
    if (props.None) return `6px 0`;
    else return `8px 16px`;
  }};
  border:${props => {
    if (props.None) return `0`;
    else return `1px solid ${palette.lineGray}`;
  }};
  outline:0;
  border-radius:5px;
  background:${props => {
    if (props.None) return `none`;
    else return `${palette.white}`;
  }};
  transition:all .5s;

  &::placeholder {
    color:${palette.lightGray};
    font-weight:400;
  }
`;

// checkbox
export const CheckBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;

  input[type="checkbox"] {
    appearance: none;
    position: relative;
    border: 1px solid ${palette.outlineGray};
    border-radius: ${(props) => (props.Round ? "50px" : "4px")};
    background: ${palette.white};
    width: ${(props) => (props.Round ? "15px" : "20px")};
    height: ${(props) => (props.Round ? "15px" : "20px")};
    cursor: pointer;

    &:checked {
      border-color: ${palette.primary};
      background: ${props => props.Fill 
        ? palette.primary 
        : `url(${images.Check}) no-repeat center / auto 6px`
      };

      &:before {
        content: "";
        position: absolute;
        // top: 3px;
        // left: 3px;
        top: ${(props) => (props.Round ? "0" : "3px")};
        left: ${(props) => (props.Round ? "0" : "3px")};
        // width: 12px;
        // height: 12px;
        width: ${(props) => (props.Round ? "100%" : "12px")};
        height: ${(props) => (props.Round ? "100%" : "12px")};
        // background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M10 3L4.5 8.5L2 6' stroke='%23226FFF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center no-repeat;
        background: ${(props) =>
          props.Round
          ? `url(${images.CheckCircleFill})` 
          : props.Fill
          ? `url(${images.IconCheck3}) no-repeat center`
          : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M10 3L4.5 8.5L2 6' stroke='%23226FFF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center no-repeat`
        };
        background-size: ${(props) => (props.Fill ? "10px" : "100%")};
      }
    }
  }

  label {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray700};
    cursor: pointer;
  }
`;

