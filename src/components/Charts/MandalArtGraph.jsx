import React, { useState } from "react";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";

const MandalArtGraph = () => {
  // 상세 뷰 상태 관리
  const [selectedItem, setSelectedItem] = useState(null);

  // 상세 화면으로 전환 (특정 항목 클릭 시)
  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
  };

  // 기본 화면으로 돌아가기
  const handleBackClick = () => {
    setSelectedItem(null);
  };

  // 만달라트 버튼 데이터 (9개 버튼)
  const mandalartButtons = [
    { id: 1, text: "항목 1", isCenter: false, detail: "항목 1에 대한 상세 내용입니다." },
    { id: 2, text: "항목 2", isCenter: false, detail: "항목 2에 대한 상세 내용입니다." },
    { id: 3, text: "항목 3", isCenter: false, detail: "항목 3에 대한 상세 내용입니다." },
    { id: 4, text: "항목 4", isCenter: false, detail: "항목 4에 대한 상세 내용입니다." },
    { id: 5, text: "메인 주제", isCenter: true, detail: "메인 주제입니다." },
    { id: 6, text: "항목 6", isCenter: false, detail: "항목 6에 대한 상세 내용입니다." },
    { id: 7, text: "항목 7", isCenter: false, detail: "항목 7에 대한 상세 내용입니다." },
    { id: 8, text: "항목 8", isCenter: false, detail: "항목 8에 대한 상세 내용입니다." },
    { id: 9, text: "항목 9", isCenter: false, detail: "항목 9에 대한 상세 내용입니다." },
  ];

  // 선택된 항목 찾기
  const selectedButton = mandalartButtons.find(button => button.id === selectedItem);

  // 선택된 항목에 따라 상세 화면용 버튼 데이터 생성
  const generateDetailButtons = () => {
    if (!selectedButton) return [];

    return [
      { id: 1, text: `${selectedButton.text}의 상세 항목 1`, isCenter: false },
      { id: 2, text: `${selectedButton.text}의 상세 항목 2`, isCenter: false },
      { id: 3, text: `${selectedButton.text}의 상세 항목 3`, isCenter: false },
      { id: 4, text: `${selectedButton.text}의 상세 항목 4`, isCenter: false },
      { id: 5, text: selectedButton.text, isCenter: true }, // 중앙 버튼의 텍스트를 선택된 항목의 텍스트로 변경
      { id: 6, text: `${selectedButton.text}의 상세 항목 6`, isCenter: false },
      { id: 7, text: `${selectedButton.text}의 상세 항목 7`, isCenter: false },
      { id: 8, text: `${selectedButton.text}의 상세 항목 8`, isCenter: false },
      { id: 9, text: `${selectedButton.text}의 상세 항목 9`, isCenter: false },
    ];
  };

  return (
    <ChartContainer>
      {!selectedItem ? (
        // 기본 화면 (3x3 그리드)
        <MandalartGrid>
          {mandalartButtons.map((button, index) => (
            <MandalartButton 
              key={index}
              isCenterBox={button.isCenter}
              onClick={!button.isCenter ? () => handleItemClick(button.id) : undefined}
              hasOutline={true}
            >
              {button.text}
            </MandalartButton>
          ))}
        </MandalartGrid>
      ) : (
        // 상세 화면 (선택된 항목에 따라 다른 내용의 3x3 그리드)
        <MandalartGrid>
          {generateDetailButtons().map((button, index) => (
            <MandalartButton 
              key={index}
              isCenterBox={button.isCenter}
              isDetailView={true}
              onClick={button.isCenter ? handleBackClick : undefined}
              hasOutline={true}
            >
              {button.text}
              {button.isCenter && (
                <BackNavigationText>
                  <BackIcon viewBox="0 0 12 13" width="12" height="13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_42_615)">
                      <path d="M0.929993 9.44996H7.94999C8.77747 9.44996 9.57105 9.12125 10.1562 8.53613C10.7413 7.95102 11.07 7.15744 11.07 6.32996C11.07 5.50249 10.7413 4.7089 10.1562 4.12379C9.57105 3.53867 8.77747 3.20996 7.94999 3.20996H5.60999" stroke="#8C8C8C" strokeWidth="0.78" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3.26999 7.10986L0.929993 9.44986L3.26999 11.7899" stroke="#8C8C8C" strokeWidth="0.78" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_42_615">
                        <rect width="12" height="12" fill="white" transform="translate(0 0.5)"/>
                      </clipPath>
                    </defs>
                  </BackIcon>
                  되돌아가기
                </BackNavigationText>
              )}
            </MandalartButton>
          ))}
        </MandalartGrid>
      )}
    </ChartContainer>
  );
};

// 스타일 컴포넌트
const ChartContainer = styled.div`
  width: 560px;
  height: 452px;
  background-color: ${palette.white};
  border-radius: 10px;
  overflow: hidden;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MandalartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 176px);
  grid-template-rows: repeat(3, 140px);
  gap: 16px;
  width: 100%;
  height: 100%;
`;

const MandalartButton = styled.div`
  width: 176px;
  height: 140px;
  background-color: ${props => {
    if (props.isCenterBox && !props.isDetailView) return palette.primary;
    if (props.isCenterBox && props.isDetailView) return "#F4F8FF";
    if (!props.isCenterBox && props.isDetailView) return "#FFFFFF";
    return "#F4F8FF";
  }};
  border: ${props => {
    // F4F8FF 색상인 경우 테두리 없음, 나머지는 항상 동일한 색상 테두리
    const bgColor = props.isCenterBox && !props.isDetailView 
      ? palette.primary 
      : props.isCenterBox && props.isDetailView
        ? "#F4F8FF"
        : !props.isCenterBox && props.isDetailView
          ? "#FFFFFF"
          : "#F4F8FF";
    
    return bgColor === "#F4F8FF" ? "none" : "1px solid #E0E4EB";
  }};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  font-family: "Pretendard", "Poppins";
  font-weight: ${props => props.isCenterBox ? "600" : "500"};
  font-size: 16px;
  text-align: center;
  color: ${props => {
    if (props.isCenterBox && !props.isDetailView) return palette.white;
    return palette.gray800;
  }};
  cursor: ${props => {
    if (props.isCenterBox && !props.isDetailView) return "default";
    if (props.isCenterBox && props.isDetailView) return "pointer";
    if (!props.isCenterBox && !props.isDetailView) return "pointer";
    return "default";
  }};
  transition: background-color 0.2s ease;
  
  &:hover {
    ${props => {
      if ((props.isCenterBox && props.isDetailView) || (!props.isCenterBox && !props.isDetailView)) {
        return `
          background-color: #E6F0FF;
        `;
      }
      return '';
    }}
  }
`;

const BackNavigationText = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  font-family: "Pretendard", Poppins;
  font-weight: 400;
  font-size: 12px;
  color: #8C8C8C;
`;

const BackIcon = styled.svg`
  margin-right: 4px;
`;

export default MandalArtGraph; 