import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { palette } from '../../../../../assets/styles/Palette';
import MoleculeBusinessModelPopup from "./MoleculeBusinessModelPopup";
import { useAtom } from 'jotai';
import { BUSINESS_MODEL_CANVAS_SELECTED_POPUP_OPTIONS } from '../../../../AtomStates';

// 비즈니스 모델 그래프 컴포넌트
const MoleculeBusinessModelGraph = ({ 
  data = {}, 
  onBoxClick, 
  setShowPopup = () => {}, 
  setSelectedBoxId, 
  selectedBoxId, 
  graphItems,
  showPopup = false // 팝업 표시 상태를 props로 받음
}) => {
  // 선택된 옵션 상태 가져오기
  const [selectedKeys] = useAtom(BUSINESS_MODEL_CANVAS_SELECTED_POPUP_OPTIONS);
  
  // 9개의 비즈니스 모델 영역 정의
  const businessAreas = [
    { id: 8, title: '핵심 파트너' },
    { id: 7, title: '핵심활동' },
    { id: 6, title: '핵심자원' },
    { id: 2, title: '가치 제안' },
    { id: 4, title: '고객 관계' },
    { id: 3, title: '채널' },
    { id: 1, title: '고객군' },
    { id: 9, title: '비용구조' },
    { id: 5, title: '수익원' }
  ];

  // 박스 클릭 핸들러
  const handleBoxClick = (id) => {
    setSelectedBoxId(id);
    setShowPopup(id);
  };

  return (
    <GraphContainer>
      <TopSection>
        {/* 상단 섹션: 핵심 파트너, 핵심활동, 핵심자원, 가치 제안, 고객 관계, 채널, 고객 세그먼트 */}
        <LeftColumn>
          {/* 핵심 파트너 */}
          <ModelBox 
            title={businessAreas[0].title} 
            id={businessAreas[0].id}
            items={data[businessAreas[0].id] || []}
            onClick={() => handleBoxClick(businessAreas[0].id)}
            isSelected={selectedBoxId === businessAreas[0].id}
            showPopup={showPopup}
            selectedKeys={selectedKeys}
          />
        </LeftColumn>

        <MiddleColumns>
          <Column>
            {/* 핵심활동 */}
            <ModelBox 
              title={businessAreas[1].title} 
              id={businessAreas[1].id}
              items={data[businessAreas[1].id] || []}
              onClick={() => handleBoxClick(businessAreas[1].id)}
              isSelected={selectedBoxId === businessAreas[1].id}
              showPopup={showPopup}
              selectedKeys={selectedKeys}
            />
            {/* 핵심자원 */}
            <ModelBox 
              title={businessAreas[2].title} 
              id={businessAreas[2].id}
              items={data[businessAreas[2].id] || []}
              onClick={() => handleBoxClick(businessAreas[2].id)}
              isSelected={selectedBoxId === businessAreas[2].id}
              showPopup={showPopup}
              selectedKeys={selectedKeys}
            />
          </Column>

          <Column>
            {/* 가치 제안 */}
            <ModelBox 
              title={businessAreas[3].title} 
              id={businessAreas[3].id}
              items={data[businessAreas[3].id] || []}
              onClick={() => handleBoxClick(businessAreas[3].id)}
              isSelected={selectedBoxId === businessAreas[3].id}
              showPopup={showPopup}
              selectedKeys={selectedKeys}
            />
          </Column>

          <Column>
            {/* 고객 관계 */}
            <ModelBox 
              title={businessAreas[4].title} 
              id={businessAreas[4].id}
              items={data[businessAreas[4].id] || []}
              onClick={() => handleBoxClick(businessAreas[4].id)}
              isSelected={selectedBoxId === businessAreas[4].id}
              showPopup={showPopup}
              selectedKeys={selectedKeys}
            />
            {/* 채널 */}
            <ModelBox 
              title={businessAreas[5].title} 
              id={businessAreas[5].id}
              items={data[businessAreas[5].id] || []}
              onClick={() => handleBoxClick(businessAreas[5].id)}
              isSelected={selectedBoxId === businessAreas[5].id}
              showPopup={showPopup}
              selectedKeys={selectedKeys}
            />
          </Column>
        </MiddleColumns>

        <RightColumn>
          {/* 고객 세그먼트 */}
          <ModelBox 
            title={businessAreas[6].title} 
            id={businessAreas[6].id}
            items={data[businessAreas[6].id] || []}
            onClick={() => handleBoxClick(businessAreas[6].id)}
            isSelected={selectedBoxId === businessAreas[6].id}
            showPopup={showPopup}
            selectedKeys={selectedKeys}
          />
        </RightColumn>
      </TopSection>

      <BottomSection>
        {/* 하단 섹션: 비용구조, 수익원 */}
        <ModelBox 
          title={businessAreas[7].title} 
          id={businessAreas[7].id}
          items={data[businessAreas[7].id] || []}
          onClick={() => handleBoxClick(businessAreas[7].id)}
          isSelected={selectedBoxId === businessAreas[7].id}
          showPopup={showPopup}
          selectedKeys={selectedKeys}
        />
        <ModelBox 
          title={businessAreas[8].title} 
          id={businessAreas[8].id}
          items={data[businessAreas[8].id] || []}
          onClick={() => handleBoxClick(businessAreas[8].id)}
          isSelected={selectedBoxId === businessAreas[8].id}
          showPopup={showPopup}
          selectedKeys={selectedKeys}
        />
      </BottomSection>
    </GraphContainer>
  );
};

// 비즈니스 모델 박스 컴포넌트
const ModelBox = ({ 
  title, 
  id, 
  items = [], 
  onClick, 
  isSelected,
  showPopup,
  selectedKeys = []
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // 상태에 따른 렌더링
  const hasItems = items.length > 0;

  // 팝업이 열려있고 현재 박스가 선택된 경우, 선택된 항목만 표시
  const shouldFilterItems = showPopup && isSelected;

  return (
    <BoxWrapper 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <ModelHeader>
        <NumberCircle>{id}</NumberCircle>
        <Title>{title}</Title>
      </ModelHeader>
      
      <ContentBox 
        hasItems={hasItems} 
        isHovered={isHovered}
        isSelected={isSelected && !hasItems}
      >
        {hasItems ? (
          <ItemList>
            {shouldFilterItems ? (
              // 팝업이 열려있고 현재 박스가 선택된 경우, 선택된 항목만 표시
              selectedKeys.length > 0 ? (
                // 선택된 항목이 있을 경우
                items
                  .filter(item => selectedKeys.includes(item))
                  .map((item, index) => (
                    <ItemRow key={index}>
                      <CheckMarkIcon />
                      <ItemText>{item}</ItemText>
                    </ItemRow>
                  ))
              ) : (
                // 선택된 항목이 없을 경우 메시지 표시
                <EmptyText>
                  선택한 항목이 여기에 표시됩니다
                </EmptyText>
              )
            ) : (
              // 팝업이 닫혀있거나 현재 박스가 선택되지 않은 경우, 모든 항목 표시
              items.map((item, index) => (
                <ItemRow key={index}>
                  <CheckMarkIcon />
                  <ItemText>{item}</ItemText>
                </ItemRow>
              ))
            )}
          </ItemList>
        ) : (
          <EmptyText isHovered={isHovered} isSelected={isSelected}>
            여기를 눌러<br />
            내용을 작성하세요
          </EmptyText>
        )}
      </ContentBox>
    </BoxWrapper>
  );
};

// 체크마크 아이콘 컴포넌트
const CheckMarkIcon = () => (
  <CheckMark>
    <img src="/images/business-model/checkmark.svg" alt="✓" />
  </CheckMark>
);

// 스타일 컴포넌트
const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 820px;
  height: 608px;
`;

const TopSection = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  height: 400px;
`;

const BottomSection = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  height: 192px; /* 608 - 400 - 16(gap) = 192 */
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MiddleColumns = styled.div`
  flex: 3;
  display: flex;
  gap: 16px;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  cursor: pointer;
`;

const ModelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NumberCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${palette.black};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  
  color: white;s
  font-family: 'Pretendard', 'Poppins', sans-serif;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  line-height: 1.55em;
  letter-spacing: -0.03em;
`;

const Title = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: ${palette.gray700};
`;

const ContentBox = styled.div`
  display: flex;
  flex: 1;
  align-items: ${props => props.hasItems ? 'flex-start' : 'center'};
  justify-content: ${props => props.hasItems ? 'flex-start' : 'center'};
  padding: 12px;
  border-radius: 10px;
  transition: all 0.2s ease;
  overflow-y: auto;
  
  /* 상태에 따른 스타일 변화 */
  background-color: ${props => {
    if (props.hasItems) return palette.white;
    if (props.isSelected) return palette.white; 
    if (props.isHovered) return palette.brightBlue;
    return palette.chatGray;
  }};
  
  /* 테두리 색상 */
  border: 1px solid ${props => {
    if (props.isSelected) return palette.outlineGray;
    if (props.isHovered) return palette.primary;
    return palette.outlineGray;
  }};
  
  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${palette.gray300};
    border-radius: 4px;
  }
`;

const EmptyText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  text-align: center;
  
  /* 상태에 따른 텍스트 색상 변화 */
  color: ${props => {
    if (props.isSelected) return palette.gray700;
    if (props.isHovered) return palette.blue500;
    return palette.gray300;
  }};
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
`;

const ItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
`;

const CheckMark = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 12px;
    height: 12px;
  }
`;

const ItemText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: ${palette.gray700};
  flex: 1;
`;

export default MoleculeBusinessModelGraph; 