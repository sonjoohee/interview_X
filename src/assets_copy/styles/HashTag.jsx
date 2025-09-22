import styled from "styled-components";
import { palette } from "./Palette";

export const HashTag = styled.div`
  display:flex;
  flex-wrap:wrap;
  gap:10px;
`;

export const Tag = styled.span`
  font-size:1rem;
  display:inline-flex;
  gap:10px;
  align-items:center;
  color:${props => {
    if (props.White) return palette.darkGray;
    else return palette.black;
  }};
  padding:7px 14px;
  border-radius:5px;

  background: ${props => {
    if (props.Gray) return 'rgba(52,58,64,.08)';
    else if (props.Red) return 'rgba(252,48,48,.08)';
    else if (props.Green) return 'rgba(81,216,136,.2)';
    else if (props.Blue) return 'rgba(4,83,244,.08)';
    else if (props.White) return palette.white;
    else return 'none';
  }};
`;

