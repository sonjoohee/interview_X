import React, { useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../assets/styles/Palette';

// 비즈니스 모델 그래프 컴포넌트
const BusinessModelGraph = ({ data = {}, onBoxClick }) => {
  // 9개의 비즈니스 모델 영역 정의
  const businessAreas = [
    { id: 8, title: '핵심 파트너십' },
    { id: 7, title: '핵심활동' },
    { id: 6, title: '핵심자원' },
    { id: 2, title: '가치 제안' },
    { id: 4, title: '고객 관계' },
    { id: 3, title: '채널' },
    { id: 1, title: '고객 세그먼트' },
    { id: 9, title: '비용구조' },
    { id: 5, title: '수익원' }
  ];

  // 선택된 박스 ID 상태 관리
  const [selectedBoxId, setSelectedBoxId] = useState(null);

  // 박스 클릭 핸들러
  const handleBoxClick = (id) => {
    setSelectedBoxId(id);
    if (onBoxClick) {
      onBoxClick(id);
    }
  };

  return (
    <GraphContainer>
      <TopSection>
        {/* 상단 섹션: 핵심 파트너십, 핵심활동, 핵심자원, 가치 제안, 고객 관계, 채널, 고객 세그먼트 */}
        <LeftColumn>
          {/* 핵심 파트너십 */}
          <ModelBox 
            title={businessAreas[0].title} 
            id={businessAreas[0].id}
            items={data[businessAreas[0].id] || []}
            onClick={() => handleBoxClick(businessAreas[0].id)}
            isSelected={selectedBoxId === businessAreas[0].id}
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
            />
            {/* 핵심자원 */}
            <ModelBox 
              title={businessAreas[2].title} 
              id={businessAreas[2].id}
              items={data[businessAreas[2].id] || []}
              onClick={() => handleBoxClick(businessAreas[2].id)}
              isSelected={selectedBoxId === businessAreas[2].id}
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
            />
            {/* 채널 */}
            <ModelBox 
              title={businessAreas[5].title} 
              id={businessAreas[5].id}
              items={data[businessAreas[5].id] || []}
              onClick={() => handleBoxClick(businessAreas[5].id)}
              isSelected={selectedBoxId === businessAreas[5].id}
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
        />
        <ModelBox 
          title={businessAreas[8].title} 
          id={businessAreas[8].id}
          items={data[businessAreas[8].id] || []}
          onClick={() => handleBoxClick(businessAreas[8].id)}
          isSelected={selectedBoxId === businessAreas[8].id}
        />
      </BottomSection>
    </GraphContainer>
  );
};

// 비즈니스 모델 박스 컴포넌트
const ModelBox = ({ title, id, items = [], onClick, isSelected }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // 상태에 따른 렌더링
  const hasItems = items.length > 0;

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
            {items.map((item, index) => (
              <ItemRow key={index}>
                <CheckMarkIcon />
                <ItemText>{item}</ItemText>
              </ItemRow>
            ))}
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
  height: 800px;
`;

const TopSection = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  height: 523px;
`;

const BottomSection = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  height: 261px;
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
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  
  color: white;
  font-family: 'Pretendard', 'Poppins';
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  line-height: 1.55em;
  letter-spacing: -0.03em;
`;

const Title = styled.div`
  font-family: 'Pretendard', Poppins;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: #666666;
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
    if (props.hasItems) return '#FFFFFF';
    if (props.isSelected) return '#FFFFFF'; 
    if (props.isHovered) return '#E9F1FF';
    return '#F7F8FA';
  }};
  
  /* 테두리 색상 */
  border: 1px solid ${props => {
    if (props.isSelected) return '#E0E4EB';
    if (props.isHovered) return '#226FFF';
    return '#E0E4EB';
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
  font-family: 'Pretendard', Poppins;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  text-align: center;
  
  /* 상태에 따른 텍스트 색상 변화 */
  color: ${props => {
    if (props.isSelected) return '#666666';
    if (props.isHovered) return '#226FFF';
    return '#CCCCCC';
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
  font-family: 'Pretendard', Poppins;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: #666666;
  flex: 1;
`;

export default BusinessModelGraph; 