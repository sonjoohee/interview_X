import styled from "styled-components";
import { palette } from "./Palette";

// input
export const InputField = styled.input`
  width:100%;
  height: ${props => {
    if (props.None) return `40px`;
    else return `58px`;
  }};
  font-family:Pretendard, Poppins;
  font-size: ${props => {
    if (props.Medium) return `1.25rem`;
    else return `1.125rem`;
  }};
  font-weight:400;
  color:#333;
  padding:7px 14px;
  padding: ${props => {
    if (props.None) return `0`;
    else return `7px 14px`;
  }};
  border: ${props => {
    if (props.error) return `1px solid ${palette.red}`;
    else if (props.None) return 'none';
    else return `1px solid ${palette.lineGray}`;
  }};
  border-radius:5px;
  background:transparent;
  transition:all .5s;
  outline:none;

  &:focus {
    color: ${props => (props.error ? palette.red : '#333')}; 

    border: ${props => {
      if (props.error) return `1px solid ${palette.red}`;
      else if (props.None) return 'none';
      else return `1px solid ${palette.blue}`;
    }};
  }

  &::placeholder {
    color:${palette.gray};
    font-weight:400;
  }
`;

// checkbox
export const CheckBox = styled.div`
  position:relative;
  display:flex;
  flex-wrap:wrap;
  gap:20px;
  align-items:center;

  input {
    position:absolute;
    visibility:hidden;

    + label {
      position:relative;
      display:inline-block;
      font-family:Pretendard, Poppins;
      font-size: ${props => (props.Small ? "0.875rem" : "1.125rem")};
      line-height:22px;
      padding-left:30px;
      vertical-align:top;
      cursor:pointer;

      &:before {
        position:absolute;
        top:0;
        left:0;
        width:20px;
        height:20px;
        border:1px solid ${palette.gray};
        border-radius:3px;
        background:${palette.white};
        transition:all .5s;
        content:'';
      }

      &:after {
        position:absolute;
        top:0;
        left:0;
        width:20px;
        height:20px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='11' viewBox='0 0 14 11' fill='none'%3E%3Cpath d='M4.44912 8.38963L1.13019 5.28001L0 6.33147L4.44912 10.5L14 1.55145L12.8778 0.5L4.44912 8.38963Z' fill='%230453F4'/%3E%3C/svg%3E");
        background-size:60%;
        background-repeat:no-repeat;
        background-position:center;
        transition:all .5s;
        opacity:0;
        content:'';
      }
    }

    &:checked + label:before {
      border:1px solid ${palette.blue};
    }

    &:checked + label:after {
      opacity:1;
    }
  }
`;

// radiobox
export const RadioBoxWrap = styled.div`
  position:relative;
  display:flex;
  gap:20px;
  align-items:center;

  input {
    position:absolute;
    visibility:hidden;

    + label {
      position:relative;
      font-family:Pretendard, Poppins;
      font-size: ${props => (props.Medium ? "1.25rem" : "1.125rem")};
      display:inline-block;
      padding-left:30px;
      margin-right:10px;
      transition:all .5s;
      cursor:pointer;

      &:before {
        position:absolute;
        left:0;
        top:0;
        width:22px;
        height:22px;
        border:1px solid ${palette.gray};
        border-radius:50%;
        background:${palette.white};
        transition:all .5s;
        content:'';
      }
    }

    &:checked + label {
      color:${palette.blue};

      &:before {
        border:7px solid ${palette.blue};
      }
    }
  }
`;

// select
export const SelectWrap = styled.div`
  display:flex;
  gap:10px;

  select {
    width:100%;
    height:58px;
    font-family:Pretendard, Poppins;
    font-size: ${props => (props.Medium ? "1.25rem" : "1.125rem")};
    font-weight:400;
    color:#333;
    padding:7px 14px;
    border: ${(props) => (props.None ? '0' : `1px solid ${palette.lineGray}`)};
    border-radius:5px;
    background:transparent;
    transition:all .5s;
    outline: none;

    &:focus {
      color: ${props => (props.error ? palette.red : '#333')}; 

      border: ${props => {
        if (props.error) return `1px solid ${palette.red}`;
        else if (props.None) return 'none';
        else return `1px solid ${palette.blue}`;
      }};
    }
  }
`;


// textarea
export const TextArea = styled.textarea`
  width:100%;
  height:auto;
  min-height:6.5em;
  font-family:Pretendard, Poppins;
  font-size: ${props => {
    if (props.Medium) return `1.25rem`;
    else if (props.Large) return '1.5rem';
    else if (props.ExtraLarge) return '1.875rem';
    else return `1.125rem`;
  }};
  font-weight: ${props => {
    if (props.ExtraLarge) return `800`;
    else return `400`;
  }};
  line-height:1.3em;
  padding: ${(props) => (props.None ? '0' : `20px`)};
  border: ${(props) => (props.None ? '0' : `1px solid ${palette.lineGray}`)};
  border-radius:5px;
  background: ${(props) => (props.None ? 'none' : `1px solid ${palette.white}`)};
  resize:none;
  outline:none;

  &::placeholder {
    color:${palette.gray};
  }
`;
