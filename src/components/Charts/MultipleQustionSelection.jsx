import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// 벡터 이미지 임포트
import vector4963 from '../../assets/images/question-lines/vector-4963.svg';
import vector4964 from '../../assets/images/question-lines/vector-4964.svg';
import vector4965 from '../../assets/images/question-lines/vector-4965.svg';
import vector4966 from '../../assets/images/question-lines/vector-4966.svg';
import vector4967 from '../../assets/images/question-lines/vector-4967.svg';

const MultipleQustionSelection = ({ questions = [], onChange, maxHeight = '500px', width = '820px' }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const containerRef = useRef(null);
  const questionRefs = useRef([]);
  const optionRefs = useRef({});
  const [linePositions, setLinePositions] = useState({
    questionBottoms: [],
    optionCenters: []
  });

  // 컴포넌트가 마운트되거나 업데이트될 때 위치 계산
  useEffect(() => {
    const calculatePositions = () => {
      if (!containerRef.current) return;
      
      // 문제 헤더 하단 위치 계산
      const questionBottoms = [];
      questionRefs.current.forEach((ref, index) => {
        if (ref) {
          questionBottoms[index] = ref.offsetHeight;
        }
      });
      
      // 각 문항의 중앙 위치 계산
      const optionCenters = [];
      const optionElements = containerRef.current.querySelectorAll('.option-item');
      const optionGroups = {};

      // 문항들을 문제별로 그룹화
      optionElements.forEach((item) => {
        const questionIndex = parseInt(item.getAttribute('data-question-index'), 10);
        const optionIndex = parseInt(item.getAttribute('data-option-index'), 10);
        
        if (!optionGroups[questionIndex]) {
          optionGroups[questionIndex] = [];
        }
        
        // 정확한 인덱스에 아이템 저장
        optionGroups[questionIndex][optionIndex] = item;
      });

      // 각 문제별로 문항 중앙 위치 계산
      Object.keys(optionGroups).forEach(questionIndex => {
        const qIndex = parseInt(questionIndex, 10);
        if (!optionCenters[qIndex]) {
          optionCenters[qIndex] = [];
        }

        let accumulatedTop = 0;
        optionGroups[questionIndex].forEach((item, index) => {
          if (!item) return; // 항목이 없으면 건너뜀
          
          const height = item.offsetHeight;
          const rect = item.getBoundingClientRect();
          
          // 첫 번째 옵션은 0부터, 그 다음부터는 이전 옵션의 높이 + 간격(8px)을 누적
          if (index > 0 && optionGroups[questionIndex][index - 1]) {
            accumulatedTop += optionGroups[questionIndex][index - 1].offsetHeight + 8; // 8px는 gap 값
          }
          
          // 문항 요소의 실제 중앙점을 계산
          const center = accumulatedTop + (height / 2);
          optionCenters[qIndex][index] = center;
        });
      });
      
      setLinePositions({ questionBottoms, optionCenters });
    };
    
    // 렌더링 후 위치 계산
    setTimeout(calculatePositions, 100);
    
    // 창 크기 변경 시 재계산
    window.addEventListener('resize', calculatePositions);
    return () => window.removeEventListener('resize', calculatePositions);
  }, []);

  // 옵션 선택 핸들러
  const handleOptionSelect = (questionIndex, optionIndex) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [questionIndex]: optionIndex
    };
    
    setSelectedOptions(newSelectedOptions);
    
    if (onChange) {
      onChange(newSelectedOptions);
    }
  };

  // 기본 질문 형식 (데이터가 없을 경우 표시할 기본 질문들)
  const defaultQuestions = [
    {
      id: 1,
      question: '문제',
      options: ['문항', '문항', '문항', '문항', '문항']
    },
    {
      id: 2,
      question: '문제',
      options: ['문항', '문항', '문항', '문항', '문항']
    },
    {
      id: 3,
      question: '문제',
      options: ['문항', '문항', '문항', '문항', '문항']
    },
    {
      id: 4,
      question: '문제',
      options: ['문항', '문항', '문항', '문항', '문항']
    },
    {
      id: 5,
      question: '문제',
      options: ['문항', '문항', '문항', '문항', '문항']
    }
  ];

  // 표시할 질문 데이터
  const displayQuestions = questions.length > 0 ? questions : defaultQuestions;

  // ref를 저장하는 함수
  const saveQuestionRef = (el, index) => {
    questionRefs.current[index] = el;
  };

  // 라인 이미지 가져오기
  const getVectorImage = (optionCount) => {
    switch(optionCount) {
      case 1: return vector4963;
      case 2: return vector4964;
      case 3: return vector4965;
      case 4: return vector4966;
      case 5: return vector4967;
      default: return vector4967; // 기본값은 5개 라인
    }
  };

  return (
    <Container ref={containerRef} maxHeight={maxHeight} width={width}>
      <ScrollContainer>
        {displayQuestions.map((q, qIndex) => (
          <QuestionContainer key={q.id || qIndex}>
            <QuestionHeader ref={(el) => saveQuestionRef(el, qIndex)}>
              <QuestionNumber>{`${String(qIndex + 1).padStart(2, '0')}.`}</QuestionNumber>
              <QuestionText>{q.question}</QuestionText>
            </QuestionHeader>
            <ContentWrapper>
              <LineWrap>
                {/* 세로선 - 문제 헤더 바로 아래에서 시작 */}
                <VerticalLine />
                
                {/* 각 문항과 연결되는 가로선 - TopHorizontalLine 제거함 */}
                {q.options.map((_, oIndex) => (
                  <HorizontalLine 
                    key={oIndex} 
                    style={{ 
                      top: `${
                        linePositions.optionCenters[qIndex] && 
                        linePositions.optionCenters[qIndex][oIndex] !== undefined ? 
                        linePositions.optionCenters[qIndex][oIndex] + 10 : // 가로선을 2px 아래로 조정
                        20 + (oIndex * 48) + 10
                      }px`
                    }} 
                  />
                ))}
              </LineWrap>
              <OptionsContainer>
                {q.options.map((option, oIndex) => (
                  <OptionItem 
                    key={oIndex}
                    className="option-item"
                    data-question-index={qIndex}
                    data-option-index={oIndex}
                    isSelected={selectedOptions[qIndex] === oIndex}
                    onClick={() => handleOptionSelect(qIndex, oIndex)}
                    ref={el => optionRefs.current[`${qIndex}-${oIndex}`] = el}
                  >
                    <OptionContent>
                      <OptionPrefix isSelected={selectedOptions[qIndex] === oIndex}>{`${String.fromCharCode(65 + oIndex)}.`}</OptionPrefix>
                      <OptionText isSelected={selectedOptions[qIndex] === oIndex}>{option}</OptionText>
                    </OptionContent>
                  </OptionItem>
                ))}
              </OptionsContainer>
            </ContentWrapper>
          </QuestionContainer>
        ))}
      </ScrollContainer>
    </Container>
  );
};

MultipleQustionSelection.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ),
  onChange: PropTypes.func,
  maxHeight: PropTypes.string,
  width: PropTypes.string
};

// 스타일 컴포넌트
const Container = styled.div`
  width: ${props => props.width};
  height: ${props => props.maxHeight};
  position: relative;
  overflow: hidden;
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-right: 8px; /* 스크롤과의 간격 추가 */
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #E0E4EB;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  align-items: flex-end;
  position: relative;
  margin-bottom: 8px;
`;

const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #FFFFFF;
  border-radius: 10px;
  border: 1px solid #E0E4EB;
  gap: 4px;
  width: 728px; /* 8px 줄임 */
  position: relative;
  height: 40px;
  z-index: 3; /* 헤더가 항상 최상단에 보이도록 */
`;

const QuestionNumber = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #666666;
  letter-spacing: -0.03em;
`;

const QuestionText = styled.span`
  font-family: 'Pretendard', Poppins;
  font-weight: 400;
  font-size: 16px;
  color: #666666;
  letter-spacing: -0.03em;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 728px; /* 8px 줄임 */
  position: relative;
`;

const LineWrap = styled.div`
  position: absolute;
  left: 20px;
  top: -12px; /* 문제 헤더 하단에 맞닿도록 올림 */
  width: 33px; /* 문항까지 닿는 길이 */
  z-index: 1; /* 라인을 가장 아래 레이어로 설정 */
  height: calc(100% + 12px - 22px); /* 헤더 높이만큼 늘리고 하단에서 22px 줄임 */
`;

const VerticalLine = styled.div`
  position: absolute;
  left: 0;
  width: 1px;
  background-color: #E0E4EB;
  top: 0;
  height: 100%;
`;

const HorizontalLine = styled.div`
  position: absolute;
  left: 0;
  width: 33px; /* 문항 좌측 끝까지 연결 */
  height: 1px;
  background-color: #E0E4EB;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 675px; /* 8px 줄임 */
  padding-right: 0;
  margin-left: 53px;
  position: relative;
  z-index: 2; /* 문항이 라인보다 위에 위치하도록 */
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: ${props => props.isSelected ? '#226FFF' : '#F7F8FA'};
  border-radius: 10px;
  border: ${props => props.isSelected ? 'none' : '1px solid #E0E4EB'};
  cursor: pointer;
  transition: background-color 0.2s ease;
  min-height: 40px;
  box-sizing: border-box;
  
  &:hover {
    background-color: ${props => props.isSelected ? '#226FFF' : '#F0F0F0'};
  }
`;

const OptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const OptionPrefix = styled.span`
  font-family: 'Pretendard', Poppins;
  font-weight: 400;
  font-size: 16px;
  color: ${props => props.isSelected ? '#FFFFFF' : '#666666'};
  letter-spacing: -0.03em;
`;

const OptionText = styled.span`
  font-family: 'Pretendard', Poppins;
  font-weight: 400;
  font-size: 16px;
  color: ${props => props.isSelected ? '#FFFFFF' : '#666666'};
  letter-spacing: -0.03em;
`;

export default MultipleQustionSelection; 