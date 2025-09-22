//작업관리/ 프로젝트 리스트/ 자세히 보기/인터뷰 상세보기
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  IS_PERSONA_ACCESSIBLE,
  IS_LOGGED_IN,
  BUSINESS_ANALYSIS,
  PROJECT_ID,
  PROJECT_REPORT_ID,
  REPORT_LOAD_BUTTON_STATE,
  PROJECT_LOAD_BUTTON_STATE,
  REPORT_DESCRIPTION_LOAD_BUTTON_STATE,
  PERSONA_LIST,
  REPORT_LIST,
  INTERVIEW_DATA,
  SELECTED_INTERVIEW_PURPOSE,
  INTERVIEW_REPORT,
  INTERVIEW_REPORT_ADDITIONAL,
  INTERVIEW_QUESTION_LIST,
  CATEGORY_COLOR,
  SELECTED_PERSONA_LIST,
  IS_SHOW_TOAST,
} from "../../../AtomStates";
import {
  ContentsWrap,
  MainContent,
  AnalysisWrap,
  MainSection,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import Header from "../../Global/molecules/MoleculeHeader";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
// import Sidebar from "../../../Design_Page/IncSidebar";
import IncNavigation from "../../Global/organisms/OrganismIncNavigation";
import OrganismBusinessAnalysis from "../organisms/OrganismBusinessAnalysis";
import { updateProjectOnServer } from "../../../../utils/indexedDB";
import { updateProjectReportOnServer } from "../../../../utils/indexedDB";
import { getProjectReportByIdFromIndexedDB } from "../../../../utils/indexedDB";
import { getProjectByIdFromIndexedDB } from "../../../../utils/indexedDB";
import MoleculeStepIndicator from "../molecules/MoleculeStepIndicator";
import OrganismToastPopup from "../organisms/OrganismToastPopup";
import BubbleChart from "../organisms/OrganismBubbleChart";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";

const PagePersona4 = () => {
  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기
  const [
    reportDescriptionLoadButtonState,
    setReportDescriptionLoadButtonState,
  ] = useAtom(REPORT_DESCRIPTION_LOAD_BUTTON_STATE);
  const [showToast, setShowToast] = useState(false);
  const [selectedPersonaList, setSelectedPersonaList] = useAtom(
    SELECTED_PERSONA_LIST
  );
  const [categoryColor, setCategoryColor] = useAtom(CATEGORY_COLOR);
  const [projectLoadButtonState, setProjectLoadButtonState] = useAtom(
    PROJECT_LOAD_BUTTON_STATE
  );
  const [reportList, setReportList] = useAtom(REPORT_LIST);
  const [businessAnalysis, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [interviewData, setInterviewData] = useAtom(INTERVIEW_DATA);
  const [personaList, setPersonaList] = useAtom(PERSONA_LIST);
  const navigate = useNavigate();
  const [interviewQuestionList, setInterviewQuestionList] = useAtom(
    INTERVIEW_QUESTION_LIST
  );
  const [interviewReport, setInterviewReport] = useAtom(INTERVIEW_REPORT);
  const [interviewReportAdditional, setInterviewReportAdditional] = useAtom(
    INTERVIEW_REPORT_ADDITIONAL
  );
  const [isPersonaAccessible, setIsPersonaAccessible] = useAtom(
    IS_PERSONA_ACCESSIBLE
  );
  const [selectedInterviewPurpose, setSelectedInterviewPurpose] = useAtom(
    SELECTED_INTERVIEW_PURPOSE
  );
  const [reportReady, setReportReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const [reportId, setReportId] = useAtom(PROJECT_REPORT_ID);
  const [reportLoadButtonState, setReportLoadButtonState] = useAtom(
    REPORT_LOAD_BUTTON_STATE
  );
  const [openAccordion, setOpenAccordion] = useState(null);
  const [openCard, setOpenCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardRef = useRef(null);

  const [steps, setSteps] = useState([
    { number: 1, label: "비즈니스 분석", active: true },
    { number: 2, label: "맞춤 페르소나 추천", active: true },
    { number: 3, label: "인터뷰 방법 선택", active: true },
    { number: 4, label: "페르소나와 인터뷰", active: true },
    { number: 5, label: "의견 분석", active: true },
  ]);

  useEffect(() => {
    // 접근 가능 여부를 확인하여 차단 로직 수행
    if (!isPersonaAccessible) {
      navigate("/"); // 접근이 허용되지 않으면 메인 페이지로 리다이렉트
    }

    // 페이지를 나갈 때 접근 가능 여부 초기화
    return () => {
      setIsPersonaAccessible(false); // 페이지 떠날 때 접근 불가로 설정
    };
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (reportId) {
      setReportReady(true);
    }
  }, [reportId]);

  const getCategoryColor = (category) => {
    switch (category) {
      case "광고/마케팅":
        return "Red";
      case "교육":
        return "LavenderMagenta";
      case "금융/보험/핀테크":
        return "Amethyst";
      case "게임":
        return "VistaBlue";
      case "모빌리티/교통":
        return "BlueYonder";
      case "물류":
        return "MidnightBlue";
      case "부동산/건설":
        return "ButtonBlue";
      case "뷰티/화장품":
        return "ButtonBlue";
      case "AI/딥테크/블록체인":
        return "MiddleBlueGreen";
      case "소셜미디어/커뮤니티":
        return "GreenSheen";
      case "여행/레저":
        return "TropicalRainForest";
      case "유아/출산":
        return "DollarBill";
      case "인사/비즈니스":
        return "Olivine";
      case "제조/하드웨어":
        return "ChineseGreen";
      case "커머스":
        return "Jonquil";
      case "콘텐츠/예술":
        return "PastelOrange";
      case "통신/보안/데이터":
        return "Tangerine";
      case "패션":
        return "Copper";
      case "푸드/농업":
        return "Shadow";
      case "환경/에너지":
        return "Tuscany";
      case "홈리빙":
        return "VeryLightTangelo";
      case "헬스케어/바이오":
        return "Orange";
      case "피트니스/스포츠":
        return "CarnationPink";
      case "법률":
        return "TurkishRose";
      case "펫":
        return "SuperPink";
      case "기타":
        return "NavyBlue";
      default:
        return "";
    }
  };
  useEffect(() => {
    // 팝업이 열려있을 때 배경 스크롤 맊음
    if (showToast) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px"; // 스크롤바 자리만큼 패딩 추가
    }
    // 팝업이 닫혔을 때
    else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    }

    // 컴포넌트 언마운트 시 원래대로 복구
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    };
  }, [showToast]);

  useEffect(() => {
    // console.log("🚀 ~ useEffect ~ reportId:", reportId);
    const loadProjectReport = async () => {
      // 1. 로그인 여부 확인
      if (reportId && reportLoadButtonState) {
        // console.log("🚀 ~ loadProjectReport ~ reportId:", reportId);
        // 2. 로그인 상태라면 서버에서 새로운 대화 ID를 생성하거나, 저장된 대화를 불러옴
        const savedProjectInfo = await getProjectByIdFromIndexedDB(
          projectId,
          reportLoadButtonState
        );
        if (savedProjectInfo) {
          setBusinessAnalysis(savedProjectInfo.businessAnalysis);
          setReportList(savedProjectInfo.reportList);
          setCategoryColor({
            first: getCategoryColor(
              savedProjectInfo.businessAnalysis.category.first
            ),
            second: getCategoryColor(
              savedProjectInfo.businessAnalysis.category.second
            ),
            third: getCategoryColor(
              savedProjectInfo.businessAnalysis.category.third
            ),
          });
        }
        const savedProjectReportInfo = await getProjectReportByIdFromIndexedDB(
          reportId,
          reportLoadButtonState
        );
        if (savedProjectReportInfo) {
          setSelectedInterviewPurpose(savedProjectReportInfo.theory_type);
          setInterviewData(savedProjectReportInfo.interviewData);
          setSelectedPersonaList(savedProjectReportInfo.personaList);
          setInterviewReport(savedProjectReportInfo.interviewReport);
          setInterviewReportAdditional(
            savedProjectReportInfo.interviewReportAdditional
          );
        }
        // setIsLoadingPage(false); // 로딩 완료
        setReportLoadButtonState(false);
      } else {
        // 2. 새로 생성된 보고서
        if (reportId) {
          await updateProjectReportOnServer(
            reportId,
            {
              theory_type: selectedInterviewPurpose,
              interviewData: interviewData,
              personaList: personaList.selected,
              interviewReport: interviewReport,
              interviewReportAdditional: interviewReportAdditional,
            },
            isLoggedIn
          );
          const currentProject = await getProjectByIdFromIndexedDB(
            projectId,
            isLoggedIn
          );
          const currentReportList = currentProject?.reportList || [];

          await updateProjectOnServer(
            //프로젝트의 리포트 목록 업데이트하기 위해서 (나중에 모든 인터뷰 리포트 이력 확인 할 때 사용)
            projectId,
            {
              reportList: [
                ...currentReportList, // 서버의 기존 데이터 유지
                {
                  reportId: reportId,
                  reportTitle: selectedInterviewPurpose,
                  interviewData: interviewData.length,
                  selectedPersona: personaList.selected.length,
                  createDate: new Date().toLocaleString("ko-KR", {
                    timeZone: "Asia/Seoul",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }),
                },
              ],
            },
            isLoggedIn
          );
        }
      }
    };

    loadProjectReport();
  }, [reportId, navigate]);

  useEffect(() => {
    if (reportDescriptionLoadButtonState) {
      setTimeout(() => {
        setShowToast(true);
      }, 1000);
    }
  }, [reportDescriptionLoadButtonState]);

  const handleAccordionClick = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleCardClick = (index) => {
    setOpenCard(openCard === index ? null : index);
  };

  const handleSlide = (direction) => {
    const cards = document.querySelectorAll(".find-card > div > div");
    const cardWidth = 311;
    const maxSlide = Math.max(0, cards.length - 2);

    if (direction === "next" && currentSlide < maxSlide) {
      setCurrentSlide((prev) => prev + 1);
      if (cardRef.current) {
        cardRef.current.style.transform = `translateX(-${
          (currentSlide + 1) * cardWidth
        }px)`;
      }
    } else if (direction === "prev" && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
      if (cardRef.current) {
        cardRef.current.style.transform = `translateX(-${
          (currentSlide - 1) * cardWidth
        }px)`;
      }
    }
  };

  const transformInterviewDataToBubbleChart = (
    interviewData,
    questionIndex
  ) => {
    if (!interviewData?.[2]?.content?.[questionIndex]?.keyword_analysis)
      return [];

    const keywordAnalysis =
      interviewData[2].content[questionIndex].keyword_analysis;

    return keywordAnalysis
      .map((item, index) => {
        const value = parseInt(
          item[`insight_${index + 1}_frequency`].replace("%", "")
        );

        return {
          id: index + 1,
          name: item[`insight_${index + 1}_text`],
          value: value,
          category: `카테고리${index + 1}`,
        };
      })
      .filter((item) => item.value !== 0);
  };

  //작업관리 / 인터뷰 시작하기/ 바로가기 인터뷰 목적 선택
  const getInterviewPurposeDescription = (purpose) => {
    switch (purpose) {
      case "제품 경험 평가":
        return "제품이 고객에게 어떤 가치를 전달하고 있는지, 소비자들이 느끼는 장점과 개선점을 세심히 파악하기 위해 진행되었습니다. 이를 통해 제품에 대한 긍정적인 경험을 더욱 확장하고, 고객 만족과 구매 전환율을 높이는 데 기여하고자 합니다.";

      case "구매 전환 요인 분석":
        return "소비자가 구매를 결정하는 데 영향을 미치는 핵심 요인을 파악하여, 최적의 구매 환경을 설계하기 위해 수행됩니다. 이를 통해 고객의 구매 장벽을 낮추고 전환율을 높이는 전략적 개선점을 도출합니다.";

      case "소비자 여정 맵핑":
        return "소비자가 제품 또는 서비스를 이용하는 과정에서의 모든 접점과 경험을 분석하여, 고객의 니즈와 개선이 필요한 부분을 명확히 식별하는 데 활용됩니다. 이를 기반으로 고객 여정을 최적화하고 긍정적인 경험을 제공합니다.";

      case "사용 맥락 조사":
        return "제품이 사용되는 실제 환경과 상황적 요인을 이해하여, 사용자 경험에 영향을 미치는 요소를 체계적으로 분석합니다. 이를 통해 제품 사용의 편의성을 높이고 환경적 제약을 고려한 개선안을 도출합니다.";

      case "제품 이해도 테스트":
        return "소비자가 제품의 개념과 사용 방법을 얼마나 잘 이해하는지를 측정하고, 이를 바탕으로 정보 전달과 사용성 문제를 해결합니다. 이를 통해 제품과 사용자 간의 상호작용을 개선합니다.";

      case "소비자 행동 유도 요소 분석":
        return "소비자가 구매, 클릭 등의 특정 행동을 하도록 유도하는 설계 요소를 분석하여, 전환율을 높이는 전략적 개선 기회를 제공합니다. 이를 통해 사용자 참여를 극대화하고 비즈니스 성과를 향상시킵니다.";

      case "제품 기대치 확인":
        return "소비자가 제품에 대해 가지는 초기 기대와 실제 사용 경험 간의 차이를 분석하여, 기대 불일치를 줄이고 사용자 만족을 높이는 데 초점을 맞춥니다. 이를 통해 고객 신뢰를 강화하고 긍정적인 제품 이미지를 확립합니다.";

      case "사용자 경험 시뮬레이션":
        return "제품 사용 과정을 가상으로 재현하여, 발생 가능한 문제를 사전에 파악하고 개선 기회를 찾는 데 활용됩니다. 이를 통해 사용자 중심의 설계를 실현하고 제품 품질을 한 단계 끌어올립니다.";

      default:
        return "제품이 고객에게 어떤 가치를 전달하고 있는지, 소비자들이 느끼는 장점과 개선점을 세심히 파악하기 위해 진행되었습니다. 이를 통해 제품에 대한 긍정적인 경험을 더욱 확장하고, 고객 만족과 구매 전환율을 높이는 데 기여하고자 합니다.";
    }
  };

  const existingQuestions = interviewQuestionList.find(
    (item) => item.theory_name === selectedInterviewPurpose
  );

  const getCardData = (suggestionList) => {
    const viewpointMapping = {
      "브랜드 강화 관점": {
        icon: images.DiscoveryBrand,
        badge: { icon: "🌟", text: "브랜드 파워" },
      },
      "타겟팅 관점": {
        icon: images.DiscoveryInsight,
        badge: { icon: "🎯", text: "마케팅 인사이트" },
      },
      "세그먼트화 관점": {
        icon: images.DiscoveryTarget,
        badge: { icon: "🎟", text: "타겟 세분화" },
      },
      "사업 전략 관점": {
        icon: images.DiscoverySuccess,
        badge: { icon: "🚀", text: "성공 전략" },
      },
      "고객 경험 개선 관점": {
        icon: images.DiscoveryExperience,
        badge: { icon: "🤝", text: "고객 경험" },
      },
      "성장 전략 관점": {
        icon: images.DiscoveryScale,
        badge: { icon: "📈", text: "스케일업" },
      },
      "비즈니스 모델 캔버스 관점": {
        icon: images.DiscoveryBM,
        badge: { icon: "📋", text: "BM 전략" },
      },
    };

    return suggestionList?.map((suggestion) => ({
      ...viewpointMapping[suggestion.title],
      title: suggestion.title_text,
      description: suggestion.description_text,
    }));
  };

  const handleEnterInterviewRoom = () => {
    setShowToast(true);
  };

  const navigateToPersonaPage = () => {
    setReportDescriptionLoadButtonState(false);
    setProjectLoadButtonState(true);
    setIsPersonaAccessible(true);
    navigate(`/Persona/2`);
  };

  return (
    <>
      <ContentsWrap noScroll={showToast}>
        <IncNavigation />

        <Header />

        <MainContent>
          <AnalysisWrap>
            <MainSection>
              <OrganismBusinessAnalysis personaStep={4} />

              <InterviewReport>
                <div>
                  <ReportHeader>
                    <h3>{selectedInterviewPurpose || "인터뷰"} 결과 리포트</h3>
                    <p>
                      {getInterviewPurposeDescription(
                        selectedInterviewPurpose || ""
                      )}
                    </p>
                  </ReportHeader>

                  <ReportContent>
                    <div>
                      <h3>1. 조사 방법 및 범위</h3>
                      <UlList Disc>
                        <li>조사 방법 : 여러 페르소나와 인터뷰 (1:N)</li>
                        <li>조사 대상 : {interviewReport?.[0]?.text}</li>
                      </UlList>
                    </div>

                    <div>
                      <h3>2. 주요 인사이트</h3>
                      <UlList Disc Spacing>
                        <li>
                          {
                            interviewReport?.[1]?.main_insight?.[0]
                              ?.description_1
                          }
                        </li>
                        <li>
                          {
                            interviewReport?.[1]?.main_insight?.[1]
                              ?.description_2
                          }
                        </li>
                      </UlList>
                    </div>

                    <div>
                      <h3>
                        3. 문항별 결과
                        <span onClick={handleEnterInterviewRoom}>
                          <img
                            src={images.ReportSearch}
                            alt="인터뷰 스크립트 보기"
                          />
                          인터뷰 스크립트 보기
                        </span>
                      </h3>

                      <ResultAccordion>
                        <AccordionHeader
                          onClick={() => handleAccordionClick(1)}
                          isOpen={openAccordion === 1}
                        >
                          <span>1</span>
                          <p>
                            {existingQuestions?.questions[2]?.question ||
                              interviewData[0]?.question_1}
                          </p>
                        </AccordionHeader>

                        {openAccordion === 1 && (
                          <AccordionContent>
                            <div className="title">
                              <strong>인터뷰 핵심 키워드</strong>
                              <p>
                                응답자의 의견을 바탕으로 키워드 빈도수를 분석해
                                문항별 인사이트를 도출했습니다.
                              </p>
                            </div>

                            <BubbleChart
                              data={transformInterviewDataToBubbleChart(
                                interviewReport,
                                0
                              )}
                            />

                            <BgInside>
                              <strong>인터뷰 인사이트</strong>
                              <div>
                                <p>
                                  {
                                    interviewReport?.[2]?.content?.[0]
                                      ?.question_insight?.[0]?.text
                                  }
                                </p>
                                <p>
                                  {
                                    interviewReport?.[2]?.content?.[0]
                                      ?.question_insight?.[1]?.text
                                  }
                                </p>
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
                          <p>
                            {existingQuestions?.questions[3]?.question ||
                              interviewData[1]?.question_2}
                          </p>
                        </AccordionHeader>

                        {openAccordion === 2 && (
                          <AccordionContent>
                            <div className="title">
                              <strong>인터뷰 핵심 키워드</strong>
                              <p>
                                응답자의 의견을 바탕으로 키워드 빈도수를 분석해
                                문항별 인사이트를 도출했습니다.
                              </p>
                            </div>

                            <BubbleChart
                              data={transformInterviewDataToBubbleChart(
                                interviewReport,
                                1
                              )}
                            />

                            <BgInside>
                              <strong>인터뷰 인사이트</strong>
                              <div>
                                <p>
                                  {
                                    interviewReport?.[2]?.content?.[1]
                                      ?.question_insight?.[0]?.text
                                  }
                                </p>
                                <p>
                                  {
                                    interviewReport?.[2]?.content?.[1]
                                      ?.question_insight?.[1]?.text
                                  }
                                </p>
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
                          <p>
                            {existingQuestions?.questions[4]?.question ||
                              interviewData[2]?.question_3}
                          </p>
                        </AccordionHeader>

                        {openAccordion === 3 && (
                          <AccordionContent>
                            <div className="title">
                              <strong>인터뷰 핵심 키워드</strong>
                              <p>
                                응답자의 의견을 바탕으로 키워드 빈도수를 분석해
                                문항별 인사이트를 도출했습니다.
                              </p>
                            </div>

                            <BubbleChart
                              data={transformInterviewDataToBubbleChart(
                                interviewReport,
                                2
                              )}
                            />

                            <BgInside>
                              <strong>인터뷰 인사이트</strong>
                              <div>
                                <p>
                                  {
                                    interviewReport?.[2]?.content?.[2]
                                      ?.question_insight?.[0]?.text
                                  }
                                </p>
                                <p>
                                  {
                                    interviewReport?.[2]?.content?.[2]
                                      ?.question_insight?.[1]?.text
                                  }
                                </p>
                              </div>
                            </BgInside>
                          </AccordionContent>
                        )}
                      </ResultAccordion>
                    </div>
                  </ReportContent>
                </div>

                <div></div>
              </InterviewReport>

              <InterviewFind>
                <FindTitle>
                  <h3>💡 인터뷰로 이런 걸 발견했어요 !</h3>
                  <div>
                    <span
                      className="prev"
                      onClick={() => handleSlide("prev")}
                      style={{ opacity: currentSlide === 0 ? 0.4 : 1 }}
                    />
                    <span
                      className="next"
                      onClick={() => handleSlide("next")}
                      style={{ opacity: currentSlide === 3 ? 0.4 : 1 }}
                    />
                  </div>
                </FindTitle>

                <FindCard className="find-card">
                  <div
                    ref={cardRef}
                    style={{
                      display: "flex",
                      gap: "16px",
                      transition: "transform 0.3s ease-in-out",
                    }}
                  >
                    {getCardData(
                      interviewReportAdditional?.suggestion_list || []
                    ).map((item, index) => (
                      <Card key={index} onClick={() => handleCardClick(index)}>
                        {openCard !== index ? (
                          <>
                            <CardIcon>
                              <img src={item.icon} />
                            </CardIcon>
                            <CardBadge text={item.badge.text}>
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

            <SidebarWrap>
              <Sidebar>
                <h5>Key Insight</h5>

                <ProgressBar>
                  <span className="icon">🚀</span>
                  <Progress progress={100} />
                  <span>Fin</span>
                </ProgressBar>

                <MoleculeStepIndicator steps={steps} activeStep={5} />
              </Sidebar>

              <SidebarBottom>
                <strong>
                  다른 페르소나의 이야기가 궁금하시다면,
                  <br />
                  지금 바로 대화해보세요 🙌🏻
                </strong>

                <span onClick={navigateToPersonaPage}>
                  맞춤 페르소나 보러가기
                </span>
              </SidebarBottom>
            </SidebarWrap>

            {showToast && (
              <OrganismToastPopup
                isActive={showToast}
                onClose={() => setShowToast(false)}
                isComplete={true}
              />
            )}
          </AnalysisWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PagePersona4;

const InterviewReport = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  width: 100%;
  margin-top: 20px;
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
      line-height: 1.5;
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
  gap: ${(props) => (props.Spacing ? "20px" : "0")};

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
      content: "";
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
  padding-right: 32px; // 화살표 공간 + 간격(32px) 확보
  position: relative;

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
    border: 1px solid rgba(34, 111, 255, 0.5);
    background: rgba(34, 111, 255, 0.04);
  }

  &:after {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%)
      rotate(${(props) => (props.isOpen ? "225deg" : "45deg")});
    width: 12px;
    height: 12px;
    border-right: 2px solid ${palette.gray500};
    border-bottom: 2px solid ${palette.gray500};
    transition: transform 0.3s ease;
    content: "";
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
    gap: 8px;
    font-weight: 300;

    p + p {
      padding-top: 8px;
      border-top: 1px solid ${palette.outlineGray};
    }
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
  margin-bottom: 140px;
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
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid ${palette.outlineGray};
      background: ${palette.white};
      cursor: pointer;

      &:before {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 2px;
        border-radius: 50%;
        background: ${palette.gray800};
        content: "";
      }

      &.prev {
        transform: rotate(180deg);
      }

      &:after {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        width: 9px;
        height: 9px;
        border-right: 2px solid ${palette.gray800};
        border-top: 2px solid ${palette.gray800};
        content: "";
      }
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

  &:hover {
    img {
      filter: brightness(120%);
    }
  }
`;

const CardIcon = styled.div`
  align-self: flex-end;
  transition: all 0.5s;
`;

const CardBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  line-height: 1.5;
  padding: 4px 12px;
  margin-top: auto;
  border-radius: 14px;

  ${(props) => {
    switch (props.text) {
      case "브랜드 파워":
        return `
          background: #FAD6EC;
          color: #4D2D42;
        `;
      case "마케팅 인사이트":
        return `
          background: #FED6D6;
          color: #513333;
        `;
      case "타겟 세분화":
        return `
          background: #DFD3F5;
          color: #7525FF;
        `;
      case "성공 전략":
        return `
          background: #D3F3DB;
          color: #1F7534;
        `;
      case "고객 경험":
        return `
          background: #FDFCCE;
          color: #212622;
        `;
      case "스케일업":
        return `
          background: #E7EDDF;
          color: #008722;
        `;
      case "BM 전략":
        return `
          background: #D5DDE5;
          color: #2E2E2E;
        `;
      default:
        return `
          background: #D5DDE5;
          color: #2E2E2E;
        `;
    }
  }}
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
      content: "";
    }
  }
`;

const SidebarWrap = styled.div`
  position: sticky;
  top: 101px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 16px;
  margin-top: 44px;
`;

const Sidebar = styled.div`
  position: sticky;
  top: 101px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 16px;
  width: 290px;
  padding: 16px 20px;
  margin-top: 44px;
  border-radius: 10px;
  background: ${palette.chatGray};

  h5 {
    font-size: 0.88rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${palette.gray700};
    text-align: left;
  }
`;

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  span {
    font-size: 0.75rem;
    line-height: 1.5;
    color: ${palette.gray700};
  }

  .icon {
    font-size: 1.13rem;
  }
`;

const Progress = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 20px;
  background: ${palette.outlineGray};

  &:before {
    display: block;
    width: ${(props) => props.progress}%;
    height: 100%;
    border-radius: 20px;
    background: ${palette.primary};
    content: "";
  }
`;

const SidebarBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 24px;
  border-radius: 10px;
  border-left: 2px solid ${palette.primary};
  background: rgba(34, 111, 255, 0.04);
  cursor: pointer;

  strong {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${palette.gray800};
    text-align: left;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-size: 0.75rem;
    line-height: 1.5;
    color: ${palette.primary};

    &:after {
      width: 6px;
      height: 6px;
      transform: rotate(45deg);
      display: block;
      border-top: 1px solid ${palette.primary};
      border-right: 1px solid ${palette.primary};
      content: "";
    }
  }
`;
