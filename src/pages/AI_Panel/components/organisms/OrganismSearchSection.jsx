import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import images from "../../../../assets/styles/Images"; 
import MoleculeSearchForm from "../molecules/MoleculeSearchForm";
import { palette } from "../../../../assets/styles/Palette";
import { useAtom } from "jotai";
import { 
  CURRENT_USER_STATUS, 
  TOTAL_PANEL_COUNT,
} from "../../../AtomStates";

const OrganismSearchSection = () => {
  const [currentUserStatus] = useAtom(CURRENT_USER_STATUS);
  const [totalPanelCount, setTotalPanelCount] = useAtom(TOTAL_PANEL_COUNT);
  
  return (
    <StyledSearchSection>
      <h2>
        {totalPanelCount.toLocaleString()}명의 AI 패널 대기 중
        <p>{currentUserStatus ? `${currentUserStatus.name} 님의 비즈니스를 함께 할 패널을 찾아보세요` : "당신의 비즈니스를 함께 할 패널을 찾아보세요"}</p>
      </h2>
      <MoleculeSearchForm />
    </StyledSearchSection>
  );
};

export default OrganismSearchSection;

const StyledSearchSection = styled.section`
  text-align: left;
  padding: 60px;
  margin-bottom: 80px;
  border-radius: 15px;
  background: url(${images.BgSearch}) center no-repeat;
  background-size: cover;
  h2 {
    font-size: 2.5rem;
    color: ${palette.white};
    margin-bottom: 56px;

    p {
      font-size: 0.875rem;
      font-weight: normal;
    }
  }
`;
