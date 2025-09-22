//재생성 버튼 컴포넌트
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";

const MoleculeRecreate = ({ Small, Medium, Large, onRegenerate }) => {
  return (
    <>
      <RecreateBox Small={Small} Medium={Medium} Large={Large}>
        <Button Small Outline onClick={onRegenerate}>
          <img src={images.ArrowClockwise} alt="재생성" />
          재생성하기
        </Button>
        <p>앗! 작은 문제가 발생했어요. 재생성 버튼으로 바로 다시 시작하세요 🙏🏻</p>
      </RecreateBox>
    </>
  );
};

export default MoleculeRecreate;

const RecreateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  height: ${props => {
    if (props.Small) return `180px`;
    else if (props.Medium) return `250px`;
    else if (props.Large) return `290px`;
    else return `276px`;
  }};

  p {
    font-size: 0.75rem;
    font-weight: 400;
    color: ${palette.gray500};
    line-height: 2;
  }
`;
