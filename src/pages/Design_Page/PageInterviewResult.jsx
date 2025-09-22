import React, { useState, useRef } from "react";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";

import { 
  ContentsWrap, 
  MainContent, 
  AnalysisWrap, 
  MainSection,
} from '../../assets/styles/BusinessAnalysisStyle';
import OrganismLeftSideBar from '../Expert_Insight/components/organisms/OrganismLeftSideBar';
import Header from './IncHeader';
import AnalysisInfo from './PageAnalysisInfo';
import Sidebar from './IncSidebar';
import IncNavigation from './IncNavigation';

const PageInterviewResult = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [openCard, setOpenCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardRef = useRef(null);

  const handleAccordionClick = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleCardClick = (index) => {
    setOpenCard(openCard === index ? null : index);
  };

  const handleSlide = (direction) => {
    const cards = document.querySelectorAll('.find-card > div > div');
    const cardWidth = 311;
    const maxSlide = Math.max(0, cards.length - 2);

    if (direction === 'next' && currentSlide < maxSlide) {
      setCurrentSlide(prev => prev + 1);
      if (cardRef.current) {
        cardRef.current.style.transform = `translateX(-${(currentSlide + 1) * cardWidth}px)`;
      }
    } else if (direction === 'prev' && currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      if (cardRef.current) {
        cardRef.current.style.transform = `translateX(-${(currentSlide - 1) * cardWidth}px)`;
      }
    }
  };

  return (
    <>
      <ContentsWrap>
        <IncNavigation />

        <Header />

        <MainContent>
          <AnalysisWrap>
            <MainSection>
              <AnalysisInfo />

              <InterviewReport>
                <div>
                  <ReportHeader>
                    <h3>제품 경험 평가 결과 리포트</h3>
                    <p>제품이 고객에게 어떤 가치를 전달하고 있는지, 소비자들이 느끼는 장점과 개선점을 세심히 파악하기 위해 진행되었습니다. 이를 통해 제품에 대한 긍정적인 경험을 더욱 확장하고, 고객 만족과 구매 전환율을 높이는 데 기여하고자 합니다.</p>
                  </ReportHeader>

                  <ReportContent>
                    <div>
                      <h3>1. 조사 방법 및 범위</h3>
                      <UlList Disc>
                        <li>조사 방법 : 여러 페르소나와 인터뷰 (1:N)</li>
                        <li>조사 대상 : OO에 관심있는 페르소나 5명</li>
                      </UlList>
                    </div>

                    <div>
                      <h3>2. 주요 인사이트</h3>
                      <UlList Disc Spacing>
                        <li>인터뷰 결과, 스마트홈 스피커의 음성 인식률과 반응 속도는 높게 평가되었으나, 개인 맞춤형 기능 부족 및 정보 보안에 대한 우려가 주요 문제점으로 나타났습니다. 특히, 워킹맘 답변자는 자녀를 위한 교육 콘텐츠 및 안전 기능 강화의 필요성을 강조했고, 50대 가장 답변자는 가족 구성원 모두가 쉽게 사용할 수 있는 가족 친화적인 인터페이스 부족을 지적했습니다. 49세 남성 답변자는 개인정보 보안 유출에 대한 우려를 표명하며, 이에 대한 강화된 보안 시스템 구축의 필요성을 언급했습니다. 이러한 문제들은 사용자의 스마트홈 스피커에 대한 전반적인 만족도를 저해할 수 있는 요인으로 작용합니다. 따라서 사용자의 니즈를 충족하고, 불안감을 해소하는 것이 중요한 과제입니다.</li>
                        <li>인터뷰 데이터를 통해 도출된 문제점을 해결하고 사용자 경험을 개선할 수 있는 기회는 다음과 같습니다. 첫째, 가격 경쟁력 강화를 위해 다양한 할인 혜택 및 패키지 상품을 개발하고, 경쟁사 가격과 비교 분석하여 합리적인 가격 정책을 수립해야 합니다. 둘째, 세탁물 관리의 투명성을 높이기 위해 세탁 과정을 사진 또는 영상으로 촬영하여 고객에게 제공하는 기능을 추가하고, 세탁 전후 의류 상태 비교 사진 제공을 통해 고객의 불안감을 해소해야 합니다. 셋째, 세탁 사고에 대한 보상 체계 마련을 통해 고객의 신뢰를 확보하는 것이 중요합니다. 이는 보험 가입 및 명확한 보상 절차를 마련함으로써 이루어질 수 있습니다. 이러한 개선을 통해 서비스의 신뢰도를 높이고 고객 만족도를 향상시킬 수 있을 것입니다..</li>
                      </UlList>
                    </div>

                    <div>
                      <h3>
                        3. 문항별 결과
                        <span>
                          인터뷰 스크립트 보이기
                        </span>
                      </h3>

                      <ResultAccordion>
                        <AccordionHeader 
                          onClick={() => handleAccordionClick(1)} 
                          isOpen={openAccordion === 1}
                        >
                          <span>1</span>
                          <p>제품이 고객에게 전달하는 가치는 무엇인가요?</p>
                        </AccordionHeader>

                        {openAccordion === 1 && (
                          <AccordionContent>
                            <div className="title">
                              <strong>인터뷰 핵심 키워드</strong>
                              <p>응답자의 의견을 바탕으로 키워드 빈도수를 분석해 문항별 인사이트를 도출했습니다.</p>
                            </div>

                            <GraphWrap />

                            <BgInside>
                              <strong>인터뷰 인사이드</strong>
                              <div>
                                <p>비대면 방식과 모바일 앱을 통한 편리한 예약 및 관리 시스템이 가장 큰 차별점으로 인식됩니다. 바쁜 현대인의 시간 부족 문제를 효과적으로 해결하며, 실시간 진행 상황 확인 기능은 투명성을 제공합니다. 다양한 세탁 옵션 또한 고객 맞춤형 서비스를 제공하는 강점으로 작용합니다.</p>
                                <p>시간 절약과 편리성 외에도, 세탁 옵션의 다양성과 정확한 세탁 의뢰 및 배송 추적 시스템이 높은 평가를 받고 있습니다. 특히, 개인의 시간 관리가 중요한 직장인들에게 업무 효율 향상에 기여하는 점이 큰 장점으로 인식됩니다.</p>
                              </div>
                            </BgInside>
                          </AccordionContent>
                        )}
                      </ResultAccordion>

                      <ResultAccordion>
                        <AccordionHeader 
                          onClick={() => handleAccordionClick(2)} 
                          isOpen={openAccordion === 2}
                        >
                          <span>2</span>
                          <p>경쟁 제품 사용자가 지금의 브랜드를 바꿔야 한다고 느낄 만한 상황은 어떤 경우일까요?</p>
                        </AccordionHeader>

                        {openAccordion === 2 && (
                          <AccordionContent>
                            <div className="title">
                              <strong>인터뷰 핵심 키워드</strong>
                              <p>응답자의 의견을 바탕으로 키워드 빈도수를 분석해 문항별 인사이트를 도출했습니다.</p>
                            </div>

                            <GraphWrap />

                            <BgInside>
                              <strong>인터뷰 인사이드</strong>
                              <div>
                                <p>비대면 방식과 모바일 앱을 통한 편리한 예약 및 관리 시스템이 가장 큰 차별점으로 인식됩니다. 바쁜 현대인의 시간 부족 문제를 효과적으로 해결하며, 실시간 진행 상황 확인 기능은 투명성을 제공합니다. 다양한 세탁 옵션 또한 고객 맞춤형 서비스를 제공하는 강점으로 작용합니다.</p>
                                <p>시간 절약과 편리성 외에도, 세탁 옵션의 다양성과 정확한 세탁 의뢰 및 배송 추적 시스템이 높은 평가를 받고 있습니다. 특히, 개인의 시간 관리가 중요한 직장인들에게 업무 효율 향상에 기여하는 점이 큰 장점으로 인식됩니다.</p>
                              </div>
                            </BgInside>
                          </AccordionContent>
                        )}
                      </ResultAccordion>

                      <ResultAccordion>
                        <AccordionHeader 
                          onClick={() => handleAccordionClick(3)} 
                          isOpen={openAccordion === 3}
                        >
                          <span>3</span>
                          <p>경쟁 제품 사용자가 지금의 브랜드를 바꿔야 한다고 느낄 만한 상황은 어떤 경우일까요?</p>
                        </AccordionHeader>

                        {openAccordion === 3 && (
                          <AccordionContent>
                            <div className="title">
                              <strong>인터뷰 핵심 키워드</strong>
                              <p>응답자의 의견을 바탕으로 키워드 빈도수를 분석해 문항별 인사이트를 도출했습니다.</p>
                            </div>

                            <GraphWrap />

                            <BgInside>
                              <strong>인터뷰 인사이드</strong>
                              <div>
                                <p>비대면 방식과 모바일 앱을 통한 편리한 예약 및 관리 시스템이 가장 큰 ��별점으로 인식됩니다. 바쁜 현대인의 시간 부족 문제를 효과적으로 해결하며, 실시간 진행 상황 확인 기능은 투명성을 제공합니다. 다양한 세탁 옵션 또한 고객 맞춤형 서비스를 제공하는 강점으로 작용합니다.</p>
                                <p>시간 절약과 편리성 외에도, 세탁 옵션의 다양성과 정확한 세탁 의뢰 및 배송 추적 시스템이 높은 평가를 받고 있습니다. 특히, 개인의 시간 관리가 중요한 직장인들에게 업무 효율 향상에 기여하는 점이 큰 장점으로 인식됩니다.</p>
                              </div>
                            </BgInside>
                          </AccordionContent>
                        )}
                      </ResultAccordion>
                    </div>
                  </ReportContent>
                </div>

                <div>
                </div>
              </InterviewReport>

              <InterviewFind>
                <FindTitle>
                  <h3>💡 인터뷰로 이런 걸 발견했어요 !</h3>
                  <div>
                    <span 
                      className="prev" 
                      onClick={() => handleSlide('prev')}
                      style={{ opacity: currentSlide === 0 ? 0.5 : 1 }}
                    />
                    <span 
                      className="next" 
                      onClick={() => handleSlide('next')}
                      style={{ opacity: currentSlide === 2 ? 0.5 : 1 }}
                    />
                  </div>
                </FindTitle>

                <FindCard className="find-card">
                  <div ref={cardRef} style={{ display: 'flex', gap: '16px', transition: 'transform 0.3s ease-in-out' }}>
                    {[
                      {
                        icon: "💡",
                        badge: { icon: "🎯", text: "사용자 경험" },
                        title: "개인화된 기능 강화 필요",
                        description: "사용자들은 개인 맞춤형 기능이 부족하다고 느끼고 있습니다. 특히 가족 구성원별 설정, 사용 패턴 학습을 통한 자동화 기능 등이 요구됩니다. 개인화 기능을 강화하여 사용자 만족도를 높일 수 있습니다."
                      },
                      {
                        icon: "🔒",
                        badge: { icon: "🛡️", text: "보안" },
                        title: "정보 보안 강화 필요",
                        description: "개인정보 보안에 대한 우려가 높게 나타났습니다. 강화된 보안 시스템 구축과 함께, 사용자들에게 보안 정책을 명확하게 전달하고 정기적인 보안 업데이트를 제공하는 것이 중요합니다."
                      },
                      {
                        icon: "👨‍👩‍👧‍👦",
                        badge: { icon: "✨", text: "사용성" },
                        title: "가족 친화적 UX 개선",
                        description: "모든 연령대가 쉽게 사용할 수 있는 직관적인 인터페이스가 필요합니다. 특히 고령자를 위한 큰 글씨 모드, 음성 안내 기능 등 접근성을 고려한 UI/UX 개선이 요구됩니다."
                      },
                      {
                        icon: "📱",
                        badge: { icon: "⚡", text: "성능" },
                        title: "반응 속도 최적화",
                        description: "전반적인 음성 인식률과 반응 속도는 긍정적으로 평가되었으나, 일부 복잡한 명령어 처리 시 지연이 발생합니다. 성능 최적화를 통해 더 빠르고 정확한 응답 시스템 구축이 필요합니다."
                      }
                    ].map((item, index) => (
                      <Card key={index} onClick={() => handleCardClick(index)}>
                        {openCard !== index ? (
                          <>
                            <CardIcon>
                              <span>{item.icon}</span>
                            </CardIcon>
                            <CardBadge>
                              <span>{item.badge.icon}</span>
                              {item.badge.text}
                            </CardBadge>
                            <CardTitle>{item.title}</CardTitle>
                          </>
                        ) : (
                          <CardDescription>
                            <strong>{item.title}</strong>
                            <p>{item.description}</p>
                          </CardDescription>
                        )}
                      </Card>
                    ))}
                  </div>
                </FindCard>
              </InterviewFind>

            </MainSection>

            <Sidebar />
          </AnalysisWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PageInterviewResult;

const InterviewReport = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  width: 100%;
`;

const ReportHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  text-align: left;

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${palette.gray800};
  }

  p {
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray700};
  }
`;

const ReportContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  text-align: left;
  margin-top: 40px;
  padding-top: 40px;
  border-top: 1px solid ${palette.outlineGray};

  > div {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  h3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-weight: 500;
    line-height: 1.3;
    color: ${palette.gray800};

    span {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.875rem;
      font-weight: 300;
      color: ${palette.primary};
      padding: 4px 16px;
      border-radius: 10px;
      border: 1px solid ${palette.primary};
      cursor: pointer;
    }
  }
`;

const UlList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${props => props.Spacing ? '20px' : '0'};

  li {
    position: relative;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray700};
    padding-left: 10px;

    &:before {
      position: absolute;
      left: 0;
      top: 10px;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: ${palette.gray700};
      content: '';
    }
  }
`;

const ResultAccordion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 24px 20px 24px 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;

const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  font-weight: 600;
  color: ${palette.gray800};
  cursor: pointer;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    font-size: 0.875rem;
    color: ${palette.primary};
    line-height: 1.5;
    border-radius: 2px;
    border: 1px solid rgba(34, 111, 255, 0.50);
    background: rgba(34, 111, 255, 0.04);
  }

  &:after {
    width: 12px;
    height: 12px;
    margin-left: auto;
    border-right: 2px solid ${palette.gray500};
    border-bottom: 2px solid ${palette.gray500};
    transition: transform 0.3s ease;
    transform: rotate(${props => props.isOpen ? '225deg' : '45deg'});
    content: '';
  }
`;

const AccordionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 16px 0;
  border-top: 1px solid ${palette.outlineGray};

  .title {
    display: flex;
    flex-direction: column;
    line-height: 1.5;

    strong {
      font-size: 0.875rem;
      font-weight: 500;
      color: ${palette.gray800};
    }

    p {
      font-size: 0.75rem;
      font-weight: 300;
      color: ${palette.gray700};
    }
  }
`;

const GraphWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
`;

const BgInside = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  color: ${palette.gray800};
  line-height: 1.5;
  padding: 20px;
  border-radius: 10px;
  background: ${palette.chatGray};

  strong {
    font-weight: 600;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-weight: 300;
  }
`;

const InterviewFind = styled.div`
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;

const FindTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;

  h3 {
    font-size: 1.25rem;
    color: ${palette.gray800};
    font-weight: 500;
    line-height: 1.3;
    text-align: left;
  }

  div {
    display: flex;
    align-items: center;
    gap: 12px;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: ${palette.gray200};
      cursor: pointer;
    }
  }
`;

const FindCard = styled.div`
  display: flex;
  width: 100%;
  max-width: 718px;
  overflow: hidden;
  position: relative;

  > div {
    display: flex;
    gap: 16px;
    transition: transform 0.3s ease-in-out;
    flex-shrink: 0;
  }
`;

const Card = styled.div`
  width: 295px;
  min-width: 295px;
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  gap: 16px;
  padding: 24px;
  border-radius: 15px;
  background: ${palette.chatGray};
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    background: ${palette.outlineGray};
  }
`;

const CardIcon = styled.div`
  align-self: flex-end;
`;

const CardBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  line-height: 1.5;
  color: #4D2D42;
  padding: 4px 12px;
  margin-top: auto;
  border-radius: 14px;
  background: #FAD6EC;
`;

const CardTitle = styled.div`
  font-size: 1.25rem;
  color: ${palette.gray800};
  font-weight: 500;
  line-height: 1.3;
  text-align: left;
  word-wrap: break-word;
`;

const CardDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-weight: 300;
  line-height: 1.5;
  color: ${palette.gray700};
  text-align: left;
  animation: slideIn 0.5s ease;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &.closing {
    animation: slideOut 0.5s;
  }

  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }

  strong {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    font-weight: 600;
    color: ${palette.gray800};

    &:after {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10px;
      height: 10px;
      padding: 5px;
      border-right: 2px solid ${palette.gray500};
      border-bottom: 2px solid ${palette.gray500};
      transform: rotate(45deg);
      content: '';
    }
  }
`;
