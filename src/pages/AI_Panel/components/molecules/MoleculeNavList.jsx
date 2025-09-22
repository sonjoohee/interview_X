// src/AI_List_Page/components/molecules/MoleculeNavList.jsx
import React from "react";
import styled from "styled-components";
import AtomLink from "../atoms/AtomLink";

const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
`;

const MoleculeNavList = () => (
  <NavList>
    <li><AtomLink to="#">맞춤패널 생성</AtomLink></li>
    <li><AtomLink to="#">Template</AtomLink></li>
    <li><AtomLink to="#">Price</AtomLink></li>
    <li><AtomLink to="#">Contents</AtomLink></li>
  </NavList>
);

export default MoleculeNavList;
