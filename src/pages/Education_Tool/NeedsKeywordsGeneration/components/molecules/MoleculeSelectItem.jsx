import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

// 프로젝트 팔레트를 가져옵니다. assets/styles/Palette.jsx에서 import
import { palette } from '../../../../../assets/styles/Palette';
import { RadioButton } from '../../../../../assets/styles/InputStyle';
import { CheckBoxButton } from '../../../../../assets/styles/InputStyle';

/**
 * NeedsKeywordSelected 컴포넌트
 * @param {Object} props
 * @param {Object[]} props.keywords - 표시할 키워드 배열 (8개 고정)
 * @param {string} props.keywords[].id - 키워드 고유 ID
 * @param {string} props.keywords[].text - 표시할 키워드 텍스트
 * @param {string[]} props.selectedKeywords - 선택된 키워드 ID 배열
 * @param {function} props.onSelectionChange - 선택 변경 시, 키워드 선택 상태 변경 함수 (selectedIds) => void
 * @param {string} props.title - 표시할 제목 (선택사항)
 * @param {boolean} props.isSelected - 카드 자체가 선택된 상태 여부 (기본값: false)
 * @param {function} props.onCardSelect - 카드 자체의 선택 상태가 변경될 때 호출되는 함수 (isSelected) => void
 * @returns {JSX.Element}
 */
const MoleculeSelectItem = ({ 
  keywords = [], 
  id ,
  // selectedKeywords = [], 
  // onSelectionChange, 
  title = "{페르소나}의 {고객 여정 지도 분석 씬222222222222222} 키워드",
  isSelected = false,
  onCardSelect
}) => {
  // const [selected, setSelected] = useState(selectedKeywords);

  // 외부에서 selectedKeywords가 변경될 때 내부 상태도 업데이트

  // const handleToggle = (id) => {
  //   let updatedSelection;
    
  //   if (selected.includes(id)) {
  //     // 이미 선택된 항목은 선택 해제 가능
  //     updatedSelection = selected.filter(keywordId => keywordId !== id);
  //   } else {
  //     // 제한 없이 선택 가능
  //     updatedSelection = [...selected, id];
  //   }
    
  //   setSelected(updatedSelection);
    
  //   if (onSelectionChange) {
  //     onSelectionChange(updatedSelection);
  //   }
  // };

  // 컴포넌트 선택 구현
  const handleCardSelect = () => {
    if (onCardSelect) {
      onCardSelect(!isSelected);
    }
  };
  
  // 라디오 버튼 변경 핸들러
  const handleRadioChange = () => {
    if (onCardSelect) {
      onCardSelect(true);
    }
  };

  // 키워드가 8개 미만이면 8개로 채움
  const normalizedKeywords = [...keywords];
  while (normalizedKeywords.length < 8) {
    normalizedKeywords.push({ 
      id: `empty-${normalizedKeywords.length}`, 
      text: '키워드 없음' 
    });
  }
  // onClick={(e) => e.stopPropagation()}
  // onClick={handleCardSelect}
  return (
    <Container isSelected={isSelected} >  
      <MainRow>
        <RadioContainer>
          <OptionFlex >
            <div>
              <CheckBoxButton
                id={id}
                name={id} 
                checked={isSelected}
                // onChange={() => onCardSelect(id)}
                onChange={() => onCardSelect && onCardSelect(!isSelected)} 
              />
            </div>
            </OptionFlex>
        </RadioContainer>
        <ContentContainer>
          <TitleRow>
            <Title style={{textAlign: "left"}}>{title}</Title>
          </TitleRow>
          <Divider />
          <KeywordGroupsContainer>
            <KeywordGroupsRow>
              <KeywordGroup>
                {normalizedKeywords.slice(0, 4).map((keyword) => {
                  // const isKeywordSelected = selected.includes(keyword.id);
                  const isEmptyKeyword = keyword.id ? keyword.id.toString().startsWith('empty-') : true;
                  
                  return (
                    <KeywordRow key={keyword.id}>
                      <CheckCircleSmall 
                        // isSelected={isEmptyKeyword || isKeywordSelected}
                        onClick={(e) => {
                          e.stopPropagation();
                          // if (!isEmptyKeyword) {
                          //   handleToggle(keyword.id);
                          // }
                        }}
                        isEmptyKeyword={isEmptyKeyword}
                      >
                
                          <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.76562 5.9155L4.9908 9.13654L12.2338 1.86426" stroke="#226FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                     
                      </CheckCircleSmall>
                      <KeywordText>{keyword.text}</KeywordText>
                    </KeywordRow>
                  );
                })}
              </KeywordGroup>
              <KeywordGroup>
                {normalizedKeywords.slice(4, 8).map((keyword) => {
                  // const isKeywordSelected = selected.includes(keyword.id);
                  const isEmptyKeyword = keyword.id ? keyword.id.toString().startsWith('empty-') : true;
                  
                  return (
                    <KeywordRow key={keyword.id}>
                      <CheckCircleSmall 
                        // isSelected={isEmptyKeyword || isKeywordSelected}
                        // onClick={(e) => {
                        //   e.stopPropagation();
                        //   if (!isEmptyKeyword) {
                        //     handleToggle(keyword.id);
                        //   }
                        // }}
                        isEmptyKeyword={isEmptyKeyword}
                      >
                      
                      <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.76562 5.9155L4.9908 9.13654L12.2338 1.86426" stroke="#226FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                      
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
const ExampleNeedsKeywordSelected = () => {
  // 카드 선택 상태 관리
  const [selectedCards, setSelectedCards] = useState([]);
  
  // 각 카드별 키워드 선택 상태 관리
  const [selectedKeywords1, setSelectedKeywords1] = useState(['k1', 'k3']);
  const [selectedKeywords2, setSelectedKeywords2] = useState(['k2', 'k4']);
  const [selectedKeywords3, setSelectedKeywords3] = useState(['k5', 'k8']);

  // 더미 키워드 데이터
  const dummyKeywords = [
    { id: 'k1', text: '경험 기반 쇼핑 큐레이션' },
    { id: 'k2', text: '정보 통합 & 개인화' },
    { id: 'k3', text: '경험 기반 쇼핑 큐레이션' },
    { id: 'k4', text: '경험 공유 커뮤니티' },
    { id: 'k5', text: '경험 기반 쇼핑 큐레이션' },
    { id: 'k6', text: '정보 통합 & 개인화' },
    { id: 'k7', text: '경험 기반 쇼핑 큐레이션' },
    { id: 'k8', text: '경험 공유 커뮤니티' }
  ];

  // 카드 선택/해제 처리 함수
  const handleCardSelect = (cardIndex, isSelected) => {
    if (isSelected) {
      setSelectedCards([...selectedCards, cardIndex]);
    } else {
      setSelectedCards(selectedCards.filter(index => index !== cardIndex));
    }
  };

  return (
    <ExampleContainer>
      <MoleculeSelectItem 
        title="아이디어 1" 
        keywords={dummyKeywords} 
        selectedKeywords={selectedKeywords1} 
        onSelectionChange={setSelectedKeywords1} 
        isSelected={selectedCards.includes(0)}
        onCardSelect={(isSelected) => handleCardSelect(0, isSelected)}
      />
      <MoleculeSelectItem 
        title="아이디어 2"
        keywords={dummyKeywords} 
        selectedKeywords={selectedKeywords2} 
        onSelectionChange={setSelectedKeywords2} 
        isSelected={selectedCards.includes(1)}
        onCardSelect={(isSelected) => handleCardSelect(1, isSelected)}
      />
      <MoleculeSelectItem 
        title="아이디어 3"
        keywords={dummyKeywords} 
        selectedKeywords={selectedKeywords3} 
        onSelectionChange={setSelectedKeywords3} 
        isSelected={selectedCards.includes(2)}
        onCardSelect={(isSelected) => handleCardSelect(2, isSelected)}
      />
    </ExampleContainer>
  );
};

export { ExampleNeedsKeywordSelected };
export default MoleculeSelectItem;

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
  cursor: pointer;
`;

const MainRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

const OptionFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 5px;
  cursor: pointer;
  
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* RadioButton 크기 조정 - 실제 크기 32px로 조정 */
  input[type="radio"] {
    width: 24px !important;
    height: 24px !important;
    transform: scale(1.33333333333); /* 정확히 32px가 되도록 조정 (24 * 1.33333333333 = 32) */
    transform-origin: center;
    background-size: 24px 24px !important;
    margin: 0 !important;
    padding: 0 !important;
    box-sizing: content-box !important;
  }
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
  font-family: 'Pretendard', sans-serif;
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
  width: 728px;
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
`;

const KeywordGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
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
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.55;
  letter-spacing: -0.03em;
  color: ${palette.gray800};
`; 