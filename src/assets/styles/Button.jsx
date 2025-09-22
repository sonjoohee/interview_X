import React from "react";
import styled, { css } from "styled-components"
import { palette } from "./Palette";

const StyleButton = styled.button`
  position:relative;
  width: ${props => {
    if (props.Full) return '100%';
    else if (props.SelectBtn) return '100%';
    else return 'auto';
  }};
  height: ${props => {
    if (props.SelectBtn) return `40px`;
    else return `auto`;
  }};
  font-size: ${props => {
    if (props.ExtraSmall) return '0.875rem';
    else if (props.Small) return '1rem';
    else if (props.Medium) return '1.25rem';
    else return '1rem';
  }};
  font-weight: ${props => {
    if (props.Small) return '400';
    else return '600';
  }};
  color: ${props => {
    if (props.Black) return palette.white;
    else if (props.Blue) return palette.white;
    else return palette.gray;
  }};
  text-align: ${props => {
    if (props.SelectBtn) return 'left';
    else return 'center';
  }};
  padding: ${props => {
    if (props.Small) return `5px 15px`;
    else if (props.Medium) return '20px 30px';
    else if (props.Full) return '12px 20px';
    else if (props.SelectBtn) return '6px 0';
    else return `10px 40px`;
  }};
  border-radius:${props => (props.Round ? '50px' : '8px')}; 
  border: ${props => {
    if (props.Blue) return 'none';
    else if (props.LineBlue) return `1px solid ${palette.blue}`;
    else if (props.Black) return 'none';
    else if (props.SelectBtn) return 'none';
    else return `1px solid ${palette.lineGray}`;
  }};
  background: ${props => {
    if (props.Blue) return 'rgba(4,83,244,.8)';
    else if (props.LineBlue) return palette.blue;
    else if (props.Black) return palette.black;
    else return palette.white;
  }};
  transition:all .5s;

  ${props =>
    props.SelectBtn &&
    css`
      &:before {
        position:absolute;
        right:10px;
        top:50%;
        transform:translateY(-50%) rotate(45deg);
        width:10px;
        height:10px;
        border-right:2px solid ${palette.black};
        border-bottom:2px solid ${palette.black};
        content:'';
      }
    `
  }

  &:hover {
    background: ${props => {
      if (props.Blue) return 'rgba(4,83,244,.7) !important';
      else if (props.LineBlue) return palette.blue;
      else if (props.Black) return palette.black;
      else return palette.white;
    }};
  }

`;

function Button({ children, ...rest }) {
  return <StyleButton {...rest}>{children}</StyleButton>;
};

export default Button;