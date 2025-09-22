import React from "react";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";
import images from "../../assets/styles/Images";
import { Body3 } from "../../assets/styles/Typography";

const Pagination = ({ currentPage, totalPages }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= 5; i++) {
      pageNumbers.push(
        <PageNumber key={i} $isActive={i === currentPage}>
          <Body3 color={palette.gray700}>{i}</Body3>
        </PageNumber>
      );
    }
    return pageNumbers;
  };

  return (
    <PaginationWrapper>
      {/* <ArrowButton $direction="left">
        <images.ChevronRight width="24" height="24" color={palette.gray500} />
      </ArrowButton>
       */}
      <NumbersWrapper>
        {renderPageNumbers()}
        <Dots>
          <Dot />
          <Dot />
          <Dot />
        </Dots>
        <PageNumber>
          <Body3 color={palette.gray700}>11</Body3>
        </PageNumber>
      </NumbersWrapper>

      {/* <ArrowButton $direction="right">
        <images.ChevronRight width="24" height="24" color={palette.gray500} />
      </ArrowButton> */}
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 64px;
`;

const ArrowButton = styled.div`
  transform: ${(props) =>
    props.$direction === "left" ? "rotate(180deg)" : "rotate(0)"};
  cursor: pointer;
`;

const NumbersWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const PageNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 9px;
  border-radius: 2px;
  background: ${(props) => (props.$isActive ? "#F0F4FF" : "transparent")};
  cursor: pointer;

  p {
    color: ${(props) => (props.$isActive ? palette.primary : palette.gray700)};
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;

const Dot = styled.div`
  width: 3px;
  height: 3px;
  background: ${palette.gray300};
  border-radius: 50%;
`;

export default Pagination;
