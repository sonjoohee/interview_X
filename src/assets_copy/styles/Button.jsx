import React from "react";
import styled from "styled-components";
import { palette } from "./Palette";

const StyleButton = styled.button`
  width: ${props => {
    if (props.Full) return '100%';
    else return 'auto';
  }};
  font-family: 'Poppins', 'Pretendard';
  font-size: ${props => {
    if (props.ExtraSmall) return '0.875rem';
    else if (props.Small) return '1.5rem';
    else if (props.Medium) return '1.5rem';
    else return '1.125rem';
  }};
  font-weight: ${props => {
    if (props.Small) return '400';
    else return '600';
  }};
  color: ${props => {
    if (props.Blue) return palette.white;
    else if (props.LineBlue) return palette.blue;
    else if (props.Black) return palette.white;
    else return palette.gray;
  }};
  letter-spacing:-1px;
  margin: ${props => {
    if (props.Medium) return `0 auto`;
    else return `0`;
  }};
  padding: ${props => {
    if (props.Small) return `5px 15px`;
    else if (props.Medium) return '20px 30px';
    else if (props.Full) return '12px 20px';
    else return `10px 40px`;
  }};
  border: ${props => {
    if (props.Blue) return 'none';
    else if (props.LineBlue) return `1px solid ${palette.blue}`;
    else if (props.Black) return 'none';
    else return `1px solid ${palette.lineGray}`;
  }};
  border-radius:${props => (props.Round ? '50px' : '8px')}; 
  background: ${props => {
    if (props.Blue) return palette.blue;
    else if (props.Black) return palette.black;
    else return palette.white;
  }};
  transition:all .5s;

  &:hover {
    color: ${props => {
      if (props.Blue) return palette.white;
      else if (props.LineBlue) return palette.white;
      else if (props.Black) return palette.white;
      else return palette.darkGray;
    }};
    border: ${props => {
      if (props.Blue) return 'none';
      else if (props.LineBlue) return `1px solid ${palette.blue}`;
      else if (props.Black) return 'none';
      else return `1px solid ${palette.darkGray}`;
    }};

    background: ${props => {
      if (props.Blue) return 'rgba(4,83,244,.8)';
      else if (props.LineBlue) return palette.blue;
      else if (props.Black) return 'rgba(0,0,0,.8)';
      else return palette.white;
    }};
  }
`;

function Button({ children, ...rest }) {
  return <StyleButton {...rest}>{children}</StyleButton>;
};

export default Button;