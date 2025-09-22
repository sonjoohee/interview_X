import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from 'styled-components';
import { palette } from '../../../../../assets/styles/Palette';
import { useAtom } from "jotai";
import { BUSINESS_MODEL_CANVAS_GRAPH_ITEMS} from "../../../../AtomStates";

// 비즈니스 모델 그래프 컴포넌트
const MoleculeBusinessModelGraph = ({ data = {}, onBoxClick, setShowPopup = () => {}, setSelectedBoxId, selectedBoxId, completedBoxes = [], onOpenDrawer = () => {} }) => {
  const [businessModelCanvasGraphItems, setBusinessModelCanvasGraphItems] = useAtom(BUSINESS_MODEL_CANVAS_GRAPH_ITEMS);
  const [isInitialRender, setIsInitialRender] = useState(true);

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

  useEffect(() => {
    setIsInitialRender(true);
  }, []);

  // 이전 박스가 채워져있는 지 확인
  const isPreviousBoxDataFilled = (id) => {
    const len = businessModelCanvasGraphItems.length;

    if ( id-1 > len) return false;
    else if (id === 1) return true; // 1번 박스는 항상 True

    if ( businessModelCanvasGraphItems[id-2] && Object.values(businessModelCanvasGraphItems[id-2]).length > 0) return true;
    else return false;
  };

  useEffect(() => {
    if (isInitialRender && selectedBoxId !== null && selectedBoxId !== 1) {
      setIsInitialRender(false);
    }
  }, [selectedBoxId, businessModelCanvasGraphItems]);

  const handleBoxClick = (id) => {
    if(id === 1) {
      setSelectedBoxId(id);
      setShowPopup(id);
      return;
    }
    else {
      const previousBox = businessModelCanvasGraphItems[id - 2];
      const isPreviousBoxFilled = previousBox && Object.values(previousBox).length > 0;

      if (!isPreviousBoxFilled) {
        return;
      }

      setSelectedBoxId(id);
      setShowPopup(id);
    }
  };

  // 이전 박스가 채워져있다면 활성화
  const isBoxActive = (id) => {
    return isPreviousBoxDataFilled(id);
  };

  const isNextActiveBox = (id) => {
    if (id-1 === businessModelCanvasGraphItems.length) return true;
    else return false;
  };

  // 모든 비즈니스 모델 항목이 채워졌는지 확인하는 함수
  const areAllBoxesFilled = () => {
    // 모든 비즈니스 모델 항목이 채워졌는지 확인 (적어도 하나의 항목이 있는지)
    return businessModelCanvasGraphItems.filter(item => item && Object.values(item).length > 0).length === 9;
  };

  // 박스가 완료되었는지 확인하는 함수
  const isBoxCompleted = (id) => {
    return completedBoxes.includes(id);
  };

  return (
    <>
      <GlobalStyle />
      <GraphContainer>
        <TopSection>
          <LeftColumn>
            <ModelBox 
              title={businessAreas[0].title} 
              id={businessAreas[0].id}
              items={
                businessModelCanvasGraphItems[7]
                  ? businessModelCanvasGraphItems[7]?.slice(0, 7).map(item => item.title)
                  : []
              }
              onClick={() => handleBoxClick(businessAreas[0].id)}
              isActive={isBoxActive(businessAreas[0].id)}
              isNextActive={isNextActiveBox(businessAreas[0].id)}
              areAllBoxesFilled={areAllBoxesFilled()}
              selectedBoxId={selectedBoxId}
              completedBoxes={completedBoxes}
              onOpenDrawer={onOpenDrawer}
              style={{

                cursor: isPreviousBoxDataFilled(businessAreas[0].id) ? 'pointer' : 'not-allowed',
                opacity: isPreviousBoxDataFilled(businessAreas[0].id) ? 1 : 0.7

              }}
            />
          </LeftColumn>

          <MiddleColumns>
            <Column>
              <ModelBox 
                title={businessAreas[1].title} 
                id={businessAreas[1].id}
                items={
                  businessModelCanvasGraphItems[6]
                    ? businessModelCanvasGraphItems[6]?.slice(0, 7).map(item => item.title)
                    : []
                }
                              onClick={() => handleBoxClick(businessAreas[1].id)}
              isActive={isBoxActive(businessAreas[1].id)}
              isNextActive={isNextActiveBox(businessAreas[1].id)}
              areAllBoxesFilled={areAllBoxesFilled()}
              selectedBoxId={selectedBoxId}
              completedBoxes={completedBoxes}
              onOpenDrawer={onOpenDrawer}
                style={{
                  cursor: isPreviousBoxDataFilled(businessAreas[1].id) ? 'pointer' : 'not-allowed',
                  opacity: isPreviousBoxDataFilled(businessAreas[1].id) ? 1 : 0.7
                }}
              />
              <ModelBox 
                title={businessAreas[2].title} 
                id={businessAreas[2].id}
                items={
                  businessModelCanvasGraphItems[5]
                    ? businessModelCanvasGraphItems[5]?.slice(0, 7).map(item => item.title)
                    : []
                }
                              onClick={() => handleBoxClick(businessAreas[2].id)}
              isActive={isBoxActive(businessAreas[2].id)}
              isNextActive={isNextActiveBox(businessAreas[2].id)}
              areAllBoxesFilled={areAllBoxesFilled()}
              selectedBoxId={selectedBoxId}
              completedBoxes={completedBoxes}
              onOpenDrawer={onOpenDrawer}
                style={{
                  cursor: isPreviousBoxDataFilled(businessAreas[2].id) ? 'pointer' : 'not-allowed',
                  opacity: isPreviousBoxDataFilled(businessAreas[2].id) ? 1 : 0.7
                }}
              />
            </Column>

            <Column>
              <ModelBox 
                title={businessAreas[3].title} 
                id={businessAreas[3].id}
                items={
                  Array.isArray(businessModelCanvasGraphItems[1])
                    ? businessModelCanvasGraphItems[1].slice(0, 7).map(item => item && item.title)
                    : []
                }
                              onClick={() => handleBoxClick(businessAreas[3].id)}
              isActive={isBoxActive(businessAreas[3].id)}
              isNextActive={isNextActiveBox(businessAreas[3].id)}
              areAllBoxesFilled={areAllBoxesFilled()}
              selectedBoxId={selectedBoxId}
              completedBoxes={completedBoxes}
              onOpenDrawer={onOpenDrawer}
                style={{
                  cursor: isPreviousBoxDataFilled(businessAreas[3].id) ? 'pointer' : 'not-allowed',
                  opacity: isPreviousBoxDataFilled(businessAreas[3].id) ? 1 : 0.7
                }}
              />  
            </Column>

            <Column>
              <ModelBox 
                title={businessAreas[4].title} 
                id={businessAreas[4].id}
                items={
                  businessModelCanvasGraphItems[3]
                    ? businessModelCanvasGraphItems[3]?.slice(0, 7).map(item => item && item.title)
                    : []
                }
                              onClick={() => handleBoxClick(businessAreas[4].id)}
              isActive={isBoxActive(businessAreas[4].id)}
              isNextActive={isNextActiveBox(businessAreas[4].id)}
              areAllBoxesFilled={areAllBoxesFilled()}
              selectedBoxId={selectedBoxId}
              completedBoxes={completedBoxes}
              onOpenDrawer={onOpenDrawer}
                style={{
                  cursor: isPreviousBoxDataFilled(businessAreas[4].id) ? 'pointer' : 'not-allowed',
                  opacity: isPreviousBoxDataFilled(businessAreas[4].id) ? 1 : 0.7
                }}
              />
              <ModelBox 
                title={businessAreas[5].title} 
                id={businessAreas[5].id}
                items={
                  businessModelCanvasGraphItems[2]
                    ? businessModelCanvasGraphItems[2].slice(0, 7).map(item => item && item.title)
                    : []
                }
                              onClick={() => handleBoxClick(businessAreas[5].id)}
              isActive={isBoxActive(businessAreas[5].id)}
              isNextActive={isNextActiveBox(businessAreas[5].id)}
              areAllBoxesFilled={areAllBoxesFilled()}
              selectedBoxId={selectedBoxId}
              completedBoxes={completedBoxes}
              onOpenDrawer={onOpenDrawer}
                style={{
                  cursor: isPreviousBoxDataFilled(businessAreas[5].id) ? 'pointer' : 'not-allowed',
                  opacity: isPreviousBoxDataFilled(businessAreas[5].id) ? 1 : 0.7
                }}
              />
            </Column>
          </MiddleColumns>

          <RightColumn>
            <ModelBox 
              title={businessAreas[6].title} 
              id={businessAreas[6].id}
              items={
                Array.isArray(businessModelCanvasGraphItems[0])
                  ? businessModelCanvasGraphItems[0].slice(0, 7).map(item => item && item.title)
                  : []
              }
                          onClick={() => handleBoxClick(businessAreas[6].id)}
            isActive={isBoxActive(businessAreas[6].id)}
            isNextActive={isNextActiveBox(businessAreas[6].id)}
            areAllBoxesFilled={areAllBoxesFilled()}
            selectedBoxId={selectedBoxId}
            completedBoxes={completedBoxes}
            onOpenDrawer={onOpenDrawer}
              style={{
                cursor: true ? 'pointer' : 'not-allowed',
                opacity: 1
              }}
            />
          </RightColumn>
        </TopSection>

        <BottomSection>
          <ModelBox 
            title={businessAreas[7].title} 
            id={businessAreas[7].id}
            items={
              businessModelCanvasGraphItems[8]
                ? businessModelCanvasGraphItems[8]?.slice(0, 7).map(item => item && item.title)
                : []
            }
                      onClick={() => handleBoxClick(businessAreas[7].id)}
          isActive={isBoxActive(businessAreas[7].id)}
          isNextActive={isNextActiveBox(businessAreas[7].id)}
          areAllBoxesFilled={areAllBoxesFilled()}
          selectedBoxId={selectedBoxId}
          completedBoxes={completedBoxes}
          onOpenDrawer={onOpenDrawer}
            style={{
              cursor: isPreviousBoxDataFilled(businessAreas[7].id) ? 'pointer' : 'not-allowed',
              opacity: isPreviousBoxDataFilled(businessAreas[7].id) ? 1 : 0.7
            }}
          />
          <ModelBox 
            title={businessAreas[8].title} 
            id={businessAreas[8].id}
            items={
              businessModelCanvasGraphItems[4]
                ? businessModelCanvasGraphItems[4]?.slice(0, 7).map(item => item && item.title)
                : []
            }
                      onClick={() => handleBoxClick(businessAreas[8].id)}
          isActive={isBoxActive(businessAreas[8].id)}
          isNextActive={isNextActiveBox(businessAreas[8].id)}
          areAllBoxesFilled={areAllBoxesFilled()}
          selectedBoxId={selectedBoxId}
          completedBoxes={completedBoxes}
          onOpenDrawer={onOpenDrawer}
            style={{
              cursor: isPreviousBoxDataFilled(businessAreas[8].id) ? 'pointer' : 'not-allowed',
              opacity: isPreviousBoxDataFilled(businessAreas[8].id) ? 1 : 0.7
            }}
          />
        </BottomSection>
      </GraphContainer>
    </>
  );
};


const ModelBox = ({ title, id, items = [], onClick, isActive, isNextActive, style, completedBoxes = [], onOpenDrawer = () => {} }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [businessModelCanvasGraphItems, setBusinessModelCanvasGraphItems] = useAtom(BUSINESS_MODEL_CANVAS_GRAPH_ITEMS);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const hasItems = items.length > 0;
  const areAllBoxesFilled = () => {
    // 모든 비즈니스 모델 항목이 채워졌는지 확인 (적어도 하나의 항목이 있는지)
    return businessModelCanvasGraphItems.filter(item => item && Object.values(item).length > 0).length === 9;
  };
  const isFirstBoxFilled = () => {
    // 첫 번째 박스(인덱스 0) 데이터 확인
    const firstBoxData = businessModelCanvasGraphItems[0];
    return firstBoxData && Object.values(firstBoxData).length > 0;
  };

  // 박스가 완료되었는지 확인하는 함수
  const isBoxCompleted = (id) => {
    return completedBoxes.includes(id);
  };

  // 드로어 버튼 클릭 핸들러
  const handleDrawerClick = (e, id) => {
    e.stopPropagation(); // 박스 클릭 이벤트 방지
    onOpenDrawer(id);
  };

  // 헤더 클릭 핸들러 (완료된 박스인 경우만 드로어 열기)
  const handleHeaderClick = (e, id) => {
    e.stopPropagation(); // 박스 클릭 이벤트 방지
    if (isBoxCompleted(id)) {
      onOpenDrawer(id);
    }
  };

  // 컨텐츠 클릭 핸들러 (항상 팝업 열기)
  const handleContentClick = (e, id) => {
    e.stopPropagation(); // 박스 클릭 이벤트 방지
    onClick();
  };

  // 툴팁 관련 이벤트 핸들러
  const handleMouseEnterTitle = (event) => {
    if (isBoxCompleted(id)) {
      try {
        // NumberCircle을 기준으로 위치 계산
        const headerElement = event.currentTarget.closest('[data-model-header]');
        if (!headerElement) {
          console.warn('Header element not found');
          return;
        }
        
        const numberCircle = headerElement.querySelector('[data-number-circle]');
        if (!numberCircle) {
          console.warn('Number circle not found');
          return;
        }
        
        const numberRect = numberCircle.getBoundingClientRect();
        
        setTooltipPosition({
          x: numberRect.left + numberRect.width / 0.3,  // NumberCircle의 중앙
          y: numberRect.top - 38  // NumberCircle 위쪽
        });
        setTooltipVisible(true);
      } catch (error) {
        console.error('Tooltip position calculation error:', error);
      }
    }
  };

  const handleMouseLeaveTitle = () => {
    setTooltipVisible(false);
  };
  

  return (
    <BoxWrapper 
      isActive={isActive}
      style={{
        ...style,
      }}
    >
      <ModelHeader
        data-model-header
        onClick={(e) => handleHeaderClick(e, id)}
        onMouseEnter={() => isBoxCompleted(id) && setIsHovered(true)}
        onMouseLeave={() => isBoxCompleted(id) && setIsHovered(false)}
        style={{
          cursor: isBoxCompleted(id) ? 'pointer' : 'default'
        }}
      >
        <NumberCircle data-number-circle>{id}</NumberCircle>

        <Title 
          $isHovered={isBoxCompleted(id) && isHovered}
          onMouseEnter={handleMouseEnterTitle}
          onMouseLeave={handleMouseLeaveTitle}
        >
          {title}
        </Title>

        {isBoxCompleted(id) && (
          <DrawerButton onClick={(e) => handleDrawerClick(e, id)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.259 2.92578C11.7558 2.92598 12.1582 3.32941 12.1584 3.82617C12.1584 4.32311 11.7559 4.72637 11.259 4.72656H5.91235C5.25659 4.7268 4.72515 5.25831 4.72485 5.91406V18.2588C4.72497 18.9147 5.25648 19.446 5.91235 19.4463H18.2571C18.9131 19.4462 19.4445 18.9148 19.4446 18.2588V12.9121C19.445 12.4155 19.8483 12.0128 20.345 12.0127C20.8418 12.0127 21.245 12.4154 21.2454 12.9121V18.2588C21.2452 19.9089 19.9072 21.247 18.2571 21.2471H5.91235C4.26237 21.2468 2.92419 19.9088 2.92407 18.2588V5.91406C2.92437 4.2642 4.26248 2.92602 5.91235 2.92578H11.259ZM18.8831 4.01367C19.2345 3.66261 19.8042 3.66248 20.1555 4.01367C20.5069 4.36514 20.5069 4.93566 20.1555 5.28711L12.6057 12.8369H15.6506C16.1475 12.8371 16.5499 13.2395 16.55 13.7363C16.55 14.2333 16.1476 14.6366 15.6506 14.6367H10.4329C9.93582 14.6367 9.53249 14.2334 9.53247 13.7363V8.34082C9.53267 7.84394 9.93593 7.44141 10.4329 7.44141C10.9297 7.44146 11.333 7.84397 11.3333 8.34082V11.5635L18.8831 4.01367Z" fill="#226FFF"/>
            </svg>
          </DrawerButton>
        )}
      </ModelHeader>
      
      <ContentBox 
        hasItems={hasItems} 
        isHovered={(areAllBoxesFilled() || (id === 1 && isFirstBoxFilled())) ? false : (isHovered && isActive)}
        isActive={isActive}
        isNextActive={isNextActive}
        onClick={(e) => handleContentClick(e, id)}
        style={{
          cursor: isActive ? 'pointer' : 'not-allowed'
        }}
      >
        {hasItems ? (
          <ItemList>
            {items.map((item, index) => (
              <ItemRow key={index} style={{textAlign: "left"}}>
                <ItemText>
                  {item}
                </ItemText>
              </ItemRow>
            ))}
          </ItemList>
        ) : (
          <div style={{
            fontFamily: 'Pretendard, Poppins',
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '1.55em',
            letterSpacing: '-0.03em',
            textAlign: 'center',
            color: 
                  !isActive ? palette.gray500 : 
                  (isActive && isHovered) ? palette.primary : 
                  isActive ? palette.primary : palette.gray700
          }}>
            {isActive ? "여기를 눌러\n내용을 작성하세요" : "이전 단계를 먼저 완료해주세요"}
          </div>
        )}
      </ContentBox>
      
      {/* 툴팁 렌더링 */}
      {tooltipVisible && ReactDOM.createPortal(
        <HoverTooltip
          style={{
            position: "fixed",
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: "translateX(-50%)",
          }}
        >
          <svg
            width="102"
            height="36"
            viewBox="0 0 102 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.8945 35.2109C17.526 35.948 16.474 35.948 16.1055 35.2109L12 27H5C2.23858 27 4.83208e-08 24.7614 0 22V6C2.57711e-07 3.23858 2.23858 1 5 1H97C99.7614 1 102 3.23858 102 6V22C102 24.7614 99.7614 27 97 27H22L17.8945 35.2109Z"
              fill="#323232"
            />
            <text
              x="51"
              y="18"
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontFamily="Pretendard, sans-serif"
            >
              상세 내용 보기
            </text>
          </svg>
        </HoverTooltip>,
        document.body
      )}
    </BoxWrapper>
  );
};

const CheckMarkIcon = () => (
  <CheckMark>
    <img src="/images/CheckMark.svg" alt="✓" />
  </CheckMark>
);

const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 820px;
  height: 780px;
  overflow: hidden;
`;

const TopSection = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  flex: 2;
  min-height: 0;
  max-height: 100%;
`;

const BottomSection = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  flex: 1;
  min-height: 0;
  max-height: 100%;
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  max-height: 100%;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  max-height: 100%;
`;

const MiddleColumns = styled.div`
  flex: 3;
  display: flex;
  gap: 16px;
  min-height: 0;
  max-height: 100%;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
  max-height: 100%;
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  cursor: pointer;
  opacity: 1;
  min-height: 0;
  max-height: 100%;
`;

const ModelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
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
  
  color: white;
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
  color: ${({ $isHovered }) => $isHovered ? '#226FFF' : palette.gray700};
  transition: color 0.2s ease;
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
  overflow-x: hidden;
  min-height: 0;
  max-height: 100%;
  box-sizing: border-box;
  
  background-color: ${props => {
    if (props.hasItems) return palette.white;
    if (props.isActive && props.isHovered) return palette.brightBlue;
    return palette.chatGray;
  }};
  
  border: 1px solid ${props => {
    // 채워진 박스는 회색 테두리
    if (props.hasItems) return '#E0E4EB';
    
    // 활성화된 박스 중 호버 상태인 경우 파란색 테두리
    if (props.isActive && props.isHovered) return '#226FFF';

    // 다음 차례 박스는 파란색 테두리
    if (props.isActive && props.isNextActive) return '#226FFF';


    return '#E0E4EB';
  }};
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${palette.gray300};
    border-radius: 4px;
  }
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  gap: 0;
  overflow-x: hidden;
  max-width: 100%;
`;

const ItemRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid ${palette.outlineGray};
  
  &:last-child {
    border-bottom: none;
  }
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
  font-family: 'Pretendard', 'Poppins';
  font-size: 16px;
  font-weight: 500;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: ${palette.gray700};
  flex: 1;
  padding-left: 4px;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const GlobalStyle = createGlobalStyle`
  #box-1 *, #box-2 * {
    color: ${palette.black} !important;
    font-weight: 600 !important;
  }
`;

const DrawerButton = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  margin-left: auto; /* 우측 끝에 배치 */
  
  &:hover {
    background-color: rgba(34, 111, 255, 0.1);
  }
  
  &:focus-visible {
    outline: 2px solid #226FFF;
    outline-offset: 2px;
  }
`;

// 툴팁 스타일 컴포넌트
const HoverTooltip = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 9999;
  font-family: 'Pretendard', sans-serif;
`;

export default MoleculeBusinessModelGraph; 