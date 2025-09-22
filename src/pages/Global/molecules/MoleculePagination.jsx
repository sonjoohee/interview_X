import React from "react";
import styled from "styled-components";
import { palette } from "../../../assets/styles/Palette";
import images from "../../../assets/styles/Images";
import { Body3, Body2 } from "../../../assets/styles/Typography";

const MoleculePagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  isLoading,
  onPageChange,
  onPrevPage,
  onNextPage
}) => {
  // 페이지 번호 렌더링 함수
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // 시작 페이지 조정
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 첫 페이지로 가는 버튼 (현재 페이지가 3 이상일 때)
    if (startPage > 1) {
      pageNumbers.push(
        <PageNumber key={1} onClick={() => onPageChange(1)}>
          <Body3 color={palette.gray700}>1</Body3>
        </PageNumber>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <Dots key="dots-start">
            <Dot />
            <Dot />
            <Dot />
          </Dots>
        );
      }
    }

    // 페이지 번호들
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PageNumber
          key={i}
          $isActive={i === currentPage}
          onClick={() => i !== currentPage && !isLoading && onPageChange(i)}
        >
          <Body3 color={palette.gray700}>{i}</Body3>
        </PageNumber>
      );
    }

    // 마지막 페이지로 가는 버튼 (현재 페이지가 totalPages-2 이하일 때)
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <Dots key="dots-end">
            <Dot />
            <Dot />
            <Dot />
          </Dots>
        );
      }
      pageNumbers.push(
        <PageNumber key={totalPages} onClick={() => onPageChange(totalPages)}>
          <Body3 color={palette.gray700}>{totalPages}</Body3>
        </PageNumber>
      );
    }

    return pageNumbers;
  };

  // 아이템 범위 계산
  const getItemRange = () => {
    if (totalItems === 0) return "0";
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    return `${startItem}-${endItem}`;
  };

  if (totalPages <= 1) return null;

  return (
    <PaginationWrapper>
      {/* 아이템 정보 */}
      <ItemInfo>
        <Body3 color={palette.gray500}>
          {getItemRange()} / {totalItems.toLocaleString()}개
        </Body3>
      </ItemInfo>

      <PaginationContainer>
        {/* 이전 버튼 */}
        <ArrowButton
          $direction="left"
          $disabled={currentPage <= 1 || isLoading}
          onClick={() => (currentPage > 1 && !isLoading) && onPrevPage()}
        >
          <images.ChevronRight width="16" height="16" color={currentPage <= 1 || isLoading ? palette.gray300 : palette.gray700} />
        </ArrowButton>

        {/* 페이지 번호들 */}
        <NumbersWrapper>
          {renderPageNumbers()}
        </NumbersWrapper>

        {/* 다음 버튼 */}
        <ArrowButton
          $direction="right"
          $disabled={currentPage >= totalPages || isLoading}
          onClick={() => (currentPage < totalPages && !isLoading) && onNextPage()}
        >
          <images.ChevronRight width="16" height="16" color={currentPage >= totalPages || isLoading ? palette.gray300 : palette.gray700} />
        </ArrowButton>
      </PaginationContainer>
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  gap: 20px;
`;

const ItemInfo = styled.div`
  flex-shrink: 0;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const ArrowButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  transition: all 0.2s ease;

  transform: ${(props) =>
    props.$direction === "left" ? "rotate(180deg)" : "rotate(0)"};

  &:hover {
    background: ${(props) => !props.$disabled ? palette.chatGray : 'transparent'};
  }
`;

const NumbersWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const PageNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border-radius: 4px;
  background: ${(props) => (props.$isActive ? "#F0F4FF" : "transparent")};
  cursor: ${(props) => (props.$isActive ? 'default' : 'pointer')};
  transition: all 0.2s ease;

  p {
    color: ${(props) => (props.$isActive ? palette.primary : palette.gray700)};
    font-weight: ${(props) => (props.$isActive ? '500' : '400')};
  }

  &:hover {
    background: ${(props) => !props.$isActive ? palette.chatGray : "#F0F4FF"};
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  padding: 0 4px;
`;

const Dot = styled.div`
  width: 3px;
  height: 3px;
  background: ${palette.gray300};
  border-radius: 50%;
`;

export default MoleculePagination;
