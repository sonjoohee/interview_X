import styled, { css } from "styled-components";
import { palette } from "./Palette";

export const Table = styled.table`
  width:100%;
  font-size:1.25rem;
  border-collapse:collapse;
  border-spacing:0;
  border-top:1px solid ${palette.lineGray};
`;

export const Th = styled.th`
  font-weight:500;
  color:${palette.navy};
  padding:20px 0px;
  border-bottom:1px solid ${palette.lineGray};
  opacity:0.4;
`;

export const Td = styled.td`
  font-size:1.125rem;
  padding:15px 0;
  border-bottom:1px solid ${palette.lineGray};
  text-left:left;
`;
