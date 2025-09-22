import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { palette } from '../../../../../assets/styles/Palette';
import { BUSINESS_MODEL_CANVAS_GRAPH_ITEMS } from '../../../../AtomStates';
import { useAtom } from 'jotai';

/**
 * 비즈니스 모델 결과 컴포넌트
 * 피그마 디자인: https://www.figma.com/design/mM7wQp9Md03OKRu60WQ9cB/Untitled?node-id=149-124
 * 
 * @param {Object} props
 * @param {Array} props.data - 비즈니스 모델 데이터 배열
 * @param {number} props.initialSelectedId - 초기 선택된 ID (기본값: 1)
 * @param {Function} props.onSelectChange - 선택된 ID가 변경될 때 호출되는 콜백
 * @param {Object} props.style - 스타일 객체
 * @returns {JSX.Element}
 */
const MoleculeBMResult = ({ 
  data = [], 
  initialSelectedId = 1, 
  onSelectChange = () => {},
  parentSelectedId = null, // 상위 컴포넌트에서 전달받은 선택된 ID
  style = {} // style prop 추가
}) => {
  // selectedId 상태를 parentSelectedId가 있으면 해당 값으로, 없으면 initialSelectedId로 초기화
  const [selectedId, setSelectedId] = useState(parentSelectedId || initialSelectedId);
  const [businessModelCanvasGraphItems, setBusinessModelCanvasGraphItems] = useAtom(BUSINESS_MODEL_CANVAS_GRAPH_ITEMS);

  // 비즈니스 영역 정의 (MoleculeBusinessModelGraph와 동일한 순서)
  const businessAreas = [
    { id: 1, title: '고객군' },
    { id: 2, title: '가치 제안' },
    { id: 3, title: '채널' },
    { id: 4, title: '고객 관계' },
    { id: 5, title: '수익원' },
    { id: 6, title: '핵심자원' },
    { id: 7, title: '핵심활동' },
    { id: 8, title: '핵심 파트너' },
    { id: 9, title: '비용구조' },
    { id: 10, title: '최종 인사이트' }
  ];

  // parentSelectedId가 변경되면 selectedId도 업데이트
  useEffect(() => {
    if (parentSelectedId) {
      setSelectedId(parentSelectedId);
    }
  }, [parentSelectedId]);

  // 선택된 영역의 정보 가져오기
  const selectedArea = businessAreas.find(area => area.id === selectedId);
  
  // 선택된 ID가 변경될 때 콜백 호출
  useEffect(() => {
    onSelectChange(selectedId);
  }, [selectedId, onSelectChange]);

  // 선택된 영역의 데이터 가져오기
  const getAreaData = (id) => {
    // 실제 데이터가 있으면 해당 데이터 사용
    if (businessModelCanvasGraphItems && businessModelCanvasGraphItems.length > 0) {
      // id에 해당하는 데이터 찾기 (id는 1-10, 배열 인덱스는 0-9)
      const areaData = businessModelCanvasGraphItems[id - 1]

    // 데이터 형식에 따라 다르게 처리
    if (areaData && Array.isArray(areaData)) {
         const isUserDefineds= areaData.map(item => item.description === "사용자가 직접 추가한 항목입니다.");
          // 나머지는 표준 형식
          return areaData
            .map((item, index) => ({
              number: index + 1,
            //   content: `${item.title}: ${item.description}`,
            content: isUserDefineds[index]
            ? `${item.title}: ` 
            : `${item.title}: ${item.description}`,
              isUserDefined: item.description== "사용자가 직접 추가한 항목입니다."
            }));
        
      }
    }
    
    // 데이터가 없으면 빈 배열 반환
    return [];
  };

  // 버튼 클릭 핸들러
  const handleButtonClick = (id) => {
    setSelectedId(id);
  };

  return (
    <ResultContainer style={style}>
      <ButtonColumn>
        {businessAreas.map((area) => (
          <ButtonFrame 
            key={area.id}
            isSelected={selectedId === area.id}
            onClick={() => handleButtonClick(area.id)}
          >
            <NumberCircle isSelected={selectedId === area.id}>
              {area.id}
            </NumberCircle>
          </ButtonFrame>
        ))}
      </ButtonColumn>
      
      <ContentFrame selectedId={selectedId}>
        <ContentHeader>
          <ContentTitle>{selectedArea?.title}</ContentTitle>
        </ContentHeader>
        <ContentBody>
          {getAreaData(selectedId)?.map((item, index) => (
            <ContentItem key={index}>
              <ItemNumber>{item.number}.</ItemNumber>
              <ItemContent>
                {item.content}
                {item.isUserDefined && (
                  <UserChip>사용자 작성</UserChip>
                )}
              </ItemContent>
            </ContentItem>
          ))}
          {getAreaData(selectedId)?.length === 0 || getAreaData(selectedId)?.length === undefined && (
            <EmptyContent>
              데이터가 없습니다. 비즈니스 모델 캔버스에서 해당 영역을 작성해주세요.
            </EmptyContent>
          )}
        </ContentBody>
      </ContentFrame>
    </ResultContainer>
  );
};

// 스타일 컴포넌트
const ResultContainer = styled.div`
  display: flex;
  width: 820px;
  height: 444px;
  gap: 0;
  /* margin-top: 80px; */ /* 이 줄을 제거하거나 주석 처리 */
`;

const ButtonColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 44px;
  height: 444px; /* 전체 높이 명시 */
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1px;
    background-color: ${palette.outlineGray};
    z-index: 1;
  }
`;

const ButtonFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px 0 0 10px;
  cursor: pointer;
  background-color: ${props => props.isSelected ? palette.white : palette.gray100};
  border-top: 1px solid ${palette.outlineGray};
  border-bottom: 1px solid ${palette.outlineGray};
  border-left: 1px solid ${palette.outlineGray};
  border-right: none;
  position: relative;
  z-index: ${props => props.isSelected ? '2' : '1'};
  height: 44px; /* 444px - (8 * 6px 간격) / 9개 버튼 = 44px */
  padding: 0; /* 패딩 제거하고 높이로 통일 */
  
  &:hover {
    background-color: ${props => props.isSelected ? palette.white : palette.gray100};
  }
`;

const NumberCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.isSelected ? palette.black : palette.gray300};
  display: flex;
  align-items: center;
  justify-content: center;
  
  color: white;
  font-family: 'Pretendard', 'Poppins', sans-serif;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  line-height: 1;
  letter-spacing: -0.03em;
`;

const ContentFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  padding: 12px 20px;
  border: 1px solid ${palette.outlineGray};
  border-left: none;
  border-radius: 0 10px 10px 0;
  background-color: ${palette.white};
  overflow: hidden; /* 내용이 넘치지 않도록 설정 */
  position: relative;
  width: calc(100% - 44px); // ButtonColumn 너비(44px)를 제외한 너비
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContentTitle = styled.div`
  font-family: 'Pretendard', poppins;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: ${palette.gray800};
`;

const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto; // 세로 스크롤만 허용
  overflow-x: hidden; // 가로 스크롤 비활성화
  height: 100%;
  width: 100%; // 너비 100% 설정
  
  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${palette.gray300};
    border-radius: 4px;
  }
`;

const ContentItem = styled.div`
  display: flex;
  font-family: 'Pretendard', poppins;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: ${palette.gray700};
  text-align: left;
  align-items: flex-start;
  width: 100%; // 너비 100% 설정
  overflow-wrap: break-word; // 긴 단어 줄바꿈
  word-break: break-word; // 긴 단어 줄바꿈
`;

const ItemNumber = styled.div`
  flex-shrink: 0;
  width: 20px;
  margin-right: 4px;
`;

const ItemContent = styled.div`
  flex: 1;
  white-space: pre-wrap; /* 줄바꿈 유지 */
  line-height: 155%; /* 행간 간격을 155%로 설정 */
  overflow: hidden; // 내용이 넘치지 않도록 설정
  text-overflow: ellipsis; // 넘치는 텍스트는 ...으로 표시
  word-break: break-word; // 긴 단어 줄바꿈
  overflow-wrap: break-word; // 긴 단어 줄바꿈
`;

const UserChip = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  margin-left: 8px;
  background-color: ${palette.chatGray};
  border-radius: 12px;
  color: ${palette.gray200};
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  flex-shrink: 0;
`;

const EmptyContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${palette.gray500};
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
`;

export default MoleculeBMResult;