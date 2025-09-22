import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

// 프로젝트 팔레트를 가져옵니다. assets/styles/Palette.jsx에서 import
import { palette } from '../../assets/styles/Palette';

/**
 * NeedsKeywordResult 컴포넌트
 * @param {Object} props
 * @param {Object[]} props.keywords - 표시할 키워드 배열 (20개 고정)
 * @param {string} props.keywords[].id - 키워드 고유 ID
 * @param {string} props.keywords[].text - 표시할 키워드 텍스트
 * @param {string[]} props.selectedKeywords - 선택된 키워드 ID 배열
 * @param {function} props.onSelectionChange - 선택 변경 시, 키워드 선택 상태 변경 함수 (selectedIds) => void
 * @param {string} props.title - 표시할 제목 (선택사항)
 * @param {boolean} props.isSelected - 카드 자체가 선택된 상태 여부 (기본값: false)
 * @returns {JSX.Element}
 */
const NeedsKeywordResult = ({ 
  keywords = [], 
  selectedKeywords = [], 
  onSelectionChange, 
  title = "{페르소나}의 {고객 여정 지도 분석 씬} 키워드",
  isSelected = false
}) => {
  const [selected, setSelected] = useState(selectedKeywords);

  // 외부에서 selectedKeywords가 변경될 때 내부 상태도 업데이트
  useEffect(() => {
    setSelected(selectedKeywords);
  }, [selectedKeywords]);

  const handleToggle = (id) => {
    let updatedSelection;
    
    if (selected.includes(id)) {
      // 이미 선택된 항목은 선택 해제 가능
      updatedSelection = selected.filter(keywordId => keywordId !== id);
    } else {
      // 제한 없이 선택 가능
      updatedSelection = [...selected, id];
    }
    
    setSelected(updatedSelection);
    
    if (onSelectionChange) {
      onSelectionChange(updatedSelection);
    }
  };

  // 키워드가 20개 미만이면 20개로 채움
  const normalizedKeywords = [...keywords];
  while (normalizedKeywords.length < 20) {
    normalizedKeywords.push({ 
      id: `empty-${normalizedKeywords.length}`, 
      text: '키워드 없음' 
    });
  }

  return (
    <Container isSelected={isSelected}>
      <MainRow>
        <ContentContainer>
          <TitleRow>
            <Title>{title}</Title>
          </TitleRow>
          <Divider />
          <KeywordGroupsContainer>
            <KeywordGroupsRow>
              <KeywordGroup>
                {normalizedKeywords.slice(0, 10).map((keyword) => {
                  const isKeywordSelected = selected.includes(keyword.id);
                  const isEmptyKeyword = keyword.id.startsWith('empty-');
                  
                  return (
                    <KeywordRow key={keyword.id}>
                      <CheckCircleSmall 
                        isSelected={isEmptyKeyword || isKeywordSelected}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isEmptyKeyword) {
                            handleToggle(keyword.id);
                          }
                        }}
                        isEmptyKeyword={isEmptyKeyword}
                      >
                        {isEmptyKeyword ? (
                          <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.76562 5.9155L4.9908 9.13654L12.2338 1.86426" stroke="#226FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5L4.33333 8.33333L11 1.66667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </CheckCircleSmall>
                      <KeywordText>{keyword.text}</KeywordText>
                    </KeywordRow>
                  );
                })}
              </KeywordGroup>
              <KeywordGroup>
                {normalizedKeywords.slice(10, 20).map((keyword) => {
                  const isKeywordSelected = selected.includes(keyword.id);
                  const isEmptyKeyword = keyword.id.startsWith('empty-');
                  
                  return (
                    <KeywordRow key={keyword.id}>
                      <CheckCircleSmall 
                        isSelected={isEmptyKeyword || isKeywordSelected}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isEmptyKeyword) {
                            handleToggle(keyword.id);
                          }
                        }}
                        isEmptyKeyword={isEmptyKeyword}
                      >
                        {isEmptyKeyword ? (
                          <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.76562 5.9155L4.9908 9.13654L12.2338 1.86426" stroke="#226FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5L4.33333 8.33333L11 1.66667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </CheckCircleSmall>
                      <KeywordText>{keyword.text}</KeywordText>
                    </KeywordRow>
                  );
                })}
              </KeywordGroup>
            </KeywordGroupsRow>
          </KeywordGroupsContainer>
        </ContentContainer>
      </MainRow>
    </Container>
  );
};

// 더미 데이터로 컴포넌트 사용 예제 추가
const ExampleNeedsKeywordResult = () => {
  // 키워드 선택 상태 관리
  const [selectedKeywords, setSelectedKeywords] = useState(['k1', 'k3', 'k12', 'k15']);

  // 더미 키워드 데이터
  const dummyKeywords = [
    { id: 'k1', text: '경험 기반 쇼핑 큐레이션' },
    { id: 'k2', text: '정보 통합 & 개인화' },
    { id: 'k3', text: '경험 기반 쇼핑 큐레이션' },
    { id: 'k4', text: '경험 공유 커뮤니티' },
    { id: 'k5', text: '경험 기반 쇼핑 큐레이션' },
    { id: 'k6', text: '정보 통합 & 개인화' },
    { id: 'k7', text: '경험 기반 쇼핑 큐레이션' },
    { id: 'k8', text: '경험 공유 커뮤니티' },
    { id: 'k9', text: '경험 기반 쇼핑 큐레이션' },
    { id: 'k10', text: '정보 통합 & 개인화' },
    { id: 'k11', text: '경험 기반 쇼핑 큐레이션' },
    { id: 'k12', text: '정보 통합 & 개인화' },
    { id: 'k13', text: '경험 기반 쇼핑 큐레이션' },
    { id: 'k14', text: '경험 공유 커뮤니티' },
    { id: 'k15', text: '경험 기반 쇼핑 큐레이션' },
    { id: 'k16', text: '정보 통합 & 개인화' },
    { id: 'k17', text: '경험 기반 쇼핑 큐레이션' },
    { id: 'k18', text: '경험 공유 커뮤니티' },
    { id: 'k19', text: '경험 기반 쇼핑 큐레이션' },
    { id: 'k20', text: '정보 통합 & 개인화' }
  ];

  return (
    <ExampleContainer>
      <NeedsKeywordResult 
        title="페르소나의 구매 여정 분석 키워드" 
        keywords={dummyKeywords} 
        selectedKeywords={selectedKeywords} 
        onSelectionChange={setSelectedKeywords}
        isSelected={true}
      />
    </ExampleContainer>
  );
};

export { ExampleNeedsKeywordResult };
export default NeedsKeywordResult;

// 스타일 컴포넌트
const ExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${palette.white};
  border-radius: 10px;
  width: 820px;
  border: 1px solid ${props => props.isSelected ? palette.primary : palette.outlineGray};
  padding: 20px 24px 24px 20px;
`;

const MainRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-family: 'Pretendard', Poppins;
  font-weight: 600;
  font-size: 20px;
  line-height: 1.55;
  letter-spacing: -0.03em;
  color: ${palette.gray800};
  margin: 0;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${palette.outlineGray};
  width: 772px;
  margin-left: auto;
  margin-bottom: 0px;
`;

const KeywordGroupsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-top: 0;
`;

const KeywordGroupsRow = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: space-between;
`;

const KeywordGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 0 0 376px;
  width: 376px;
`;

const KeywordRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const CheckCircleSmall = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.isEmptyKeyword ? palette.white : props.isSelected ? palette.primary : palette.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: ${props => props.isEmptyKeyword ? 'default' : 'pointer'};
`;

const KeywordText = styled.span`
  font-family: 'Pretendard', Poppins;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.55;
  letter-spacing: -0.03em;
  color: ${palette.gray800};
`; 