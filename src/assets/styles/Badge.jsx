import styled from "styled-components";
import { palette } from "./Palette";

export const Badge = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.5;
  color: ${props => {
    if (props.New) return palette.green;
    else if (props.Hot) return palette.error;
    else return palette.white;
  }};
  padding: 0 8px;
  border-radius: 15px;
  background: ${props => {
    if (props.New) return `rgba(52, 199, 89, 0.06)`;
    else if (props.Hot) return palette.error;
    else return palette.gray700;
  }};
  font-weight: 500;

  &:before {
    position: relative;
    font-size: 0.63rem;
    font-weight: 400;
    color: inherit;
    content: ${props => {
      if (props.New) return `"new"`;
      else if (props.Hot) return `"hot"`;
      else return `"완료"`;
    }};
  } 
`;
