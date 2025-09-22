import React from "react";
import styled from "styled-components"
import { palette } from "./Palette";

const StyleButton = styled.button`
  width: ${props => {
    if (props.Full) return '100%';
    else return 'auto';
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
  padding: ${props => {
    if (props.Small) return `5px 15px`;
    else if (props.Medium) return '20px 30px';
    else if (props.Full) return '12px 20px';
    else return `10px 40px`;
  }};
  border-radius:${props => (props.Round ? '50px' : '8px')}; 
  border: ${props => {
    if (props.Blue) return 'none';
    else if (props.LineBlue) return `1px solid ${palette.blue}`;
    else if (props.Black) return 'none';
    else return `1px solid ${palette.lineGray}`;
  }};
  background: ${props => {
    if (props.Blue) return 'rgba(4,83,244,.8)';
    else if (props.LineBlue) return palette.blue;
    else if (props.Black) return palette.black;
    else return palette.white;
  }};
  transition:all .5s;
`;

function Button({ children, ...rest }) {
  return <StyleButton {...rest}>{children}</StyleButton>;
};

export default Button;