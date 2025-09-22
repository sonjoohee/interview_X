//직압관리/프로젝트 리스트
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { Body2 } from "../../../../assets/styles/Typography";

const OrganismEmptyProject = () => {
  const navigate = useNavigate();

  const handleNewProject = () => {
    navigate("/Project"); // 새 프로젝트 페이지로 이동
  };

  return (
    <EmptyStateWrapper>
      <EmptyStateContent>
        <EmptyIcon>
          <img src={images.FileFill} alt="빈 프로젝트" />
        </EmptyIcon>
        <EmptyText>
          <Body2 color="gray500">아직 진행 중인 프로젝트가 없습니다.</Body2>
          <Body2 color="gray500">지금 바로 새 프로젝트를 만들어보세요</Body2>
        </EmptyText>
        <Button Other Primary Round onClick={handleNewProject}>
          <Body2 color="primary">새 프로젝트 시작하기</Body2>
        </Button>
      </EmptyStateContent>
    </EmptyStateWrapper>
  );
};

const EmptyStateWrapper = styled.div`
  width: 100%;
  height: 258px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${palette.white};
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;

const EmptyStateContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  padding: 40px;
`;

const EmptyIcon = styled.div`
  width: 40px;
  height: 40px;
  margin-bottom: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const EmptyText = styled.p`
  font-size: 1rem;
  color: ${palette.gray800};
  line-height: 1.5;
  margin: 0;
`;

// const SubText = styled.span`
//   display: block;
//   font-size: 1rem;
//   color: ${palette.gray500};
//   margin-top: 4px;
// `;

export default OrganismEmptyProject;
