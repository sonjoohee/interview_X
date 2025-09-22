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
  SELECTED_PERSONA_LIST,
  IS_SHOW_TOAST,
  SELECTED_INTERVIEW_TYPE,
  SINGLE_INTERVIEW_REPORT_TAB1,
  SINGLE_INTERVIEW_REPORT_TAB2,
  SINGLE_INTERVIEW_REPORT_TAB3,
  SELECTED_INTERVIEW_PURPOSE_DATA,
  PERSONA_LIST_SAAS,
} from "../../../AtomStates";
import {
  ContentsWrap,
  Title,
  MainContent,
  AnalysisWrap,
  MainSection,
  Persona,
  TabButtonType3,
  TabWrap,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import {
  H2,
  H4,
  H6,
  Body1,
  Body2,
  Body2_1,
  Body3,
  Sub1,
  Sub2_1,
  Sub3,
  Caption1,
} from "../../../../assets/styles/Typography";
import MoleculeHeader from "../../../Global/molecules/MoleculeHeader";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import personaImages from "../../../../assets/styles/PersonaImages";
import ExpandIcon from "../../../../assets/images/Profile_Up.png";
import { Button } from "../../../../assets/styles/ButtonStyle";
import OrganismIncNavigation from "../../../Global/organisms/OrganismIncNavigation";
import { updateProjectOnServer } from "../../../../utils/indexedDB";
import { updateProjectReportOnServer } from "../../../../utils/indexedDB";
import { getProjectReportByIdFromIndexedDB } from "../../../../utils/indexedDB";
import { getProjectByIdFromIndexedDB } from "../../../../utils/indexedDB";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";
import OrganismToastPopupSingleChaComplete from "../organisms/OrganismToastPopupSingleChaComplete";
import * as d3 from "d3";

const PagePersona4Single = () => {
  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기
  const [
    reportDescriptionLoadButtonState,
    setReportDescriptionLoadButtonState,
  ] = useAtom(REPORT_DESCRIPTION_LOAD_BUTTON_STATE);
  const [showToast, setShowToast] = useState(false);
  const [selectedPersonaList, setSelectedPersonaList] = useAtom(
    SELECTED_PERSONA_LIST
  );
  const [, setProjectLoadButtonState] = useAtom(PROJECT_LOAD_BUTTON_STATE);
  const [, setReportList] = useAtom(REPORT_LIST);
  const [, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [interviewData, setInterviewData] = useAtom(INTERVIEW_DATA);
  const [personaList] = useAtom(PERSONA_LIST);
  const [personaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const navigate = useNavigate();
  const [interviewQuestionList] = useAtom(INTERVIEW_QUESTION_LIST);
  const [, setInterviewReport] = useAtom(INTERVIEW_REPORT);
  const [, setInterviewReportAdditional] = useAtom(INTERVIEW_REPORT_ADDITIONAL);
  const [singleInterviewReportTab1, setSingleInterviewReportTab1] = useAtom(
    SINGLE_INTERVIEW_REPORT_TAB1
  );
  const [singleInterviewReportTab2, setSingleInterviewReportTab2] = useAtom(
    SINGLE_INTERVIEW_REPORT_TAB2
  );
  const [singleInterviewReportTab3, setSingleInterviewReportTab3] = useAtom(
    SINGLE_INTERVIEW_REPORT_TAB3
  );
  const [isPersonaAccessible, setIsPersonaAccessible] = useAtom(
    IS_PERSONA_ACCESSIBLE
  );
  const [selectedInterviewPurpose, setSelectedInterviewPurpose] = useAtom(
    SELECTED_INTERVIEW_PURPOSE
  );
  const [selectedInterviewPurposeData, setSelectedInterviewPurposeData] =
    useAtom(SELECTED_INTERVIEW_PURPOSE_DATA);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectId] = useAtom(PROJECT_ID);
  const [reportId] = useAtom(PROJECT_REPORT_ID);
  const [reportLoadButtonState, setReportLoadButtonState] = useAtom(
    REPORT_LOAD_BUTTON_STATE
  );
  const [selectedInterviewType] = useAtom(SELECTED_INTERVIEW_TYPE);

  const [, setReportReady] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [openCard, setOpenCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardRef = useRef(null);
  const [activeTab, setActiveTab] = useState(1);
  const [expandedThematicIndex, setExpandedThematicIndex] = useState(null);

  const personaCount = personaListSaas.filter(
    (persona) => persona.status === "complete"
  ).length;

  useEffect(() => {
    // 접근 가능 여부를 확인하여 차단 로직 수행
    if (!isPersonaAccessible) {
      navigate("/Project"); // 접근이 허용되지 않으면 메인 페이지로 리다이렉트
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
          // setCategoryColor({
          //   first: getCategoryColor(
          //     savedProjectInfo.businessAnalysis.category.first
          //   ),
          //   second: getCategoryColor(
          //     savedProjectInfo.businessAnalysis.category.second
          //   ),
          //   third: getCategoryColor(
          //     savedProjectInfo.businessAnalysis.category.third
          //   ),
          // });
        }
        const savedProjectReportInfo = await getProjectReportByIdFromIndexedDB(
          reportId,
          reportLoadButtonState
        );
        if (savedProjectReportInfo) {
          setSelectedInterviewPurpose(savedProjectReportInfo.theory_type);
          setSelectedInterviewPurposeData(savedProjectReportInfo.purposeData);
          setInterviewData(savedProjectReportInfo.interviewData);
          setSelectedPersonaList(savedProjectReportInfo.personaList);
          setInterviewReport(savedProjectReportInfo.interviewReport);
          setInterviewReportAdditional(
            savedProjectReportInfo.interviewReportAdditional
          );
          setSingleInterviewReportTab1(
            savedProjectReportInfo.singleInterviewReportTab1
          );
          setSingleInterviewReportTab2(
            savedProjectReportInfo.singleInterviewReportTab2
          );
          setSingleInterviewReportTab3(
            savedProjectReportInfo.singleInterviewReportTab3
          );
        }
        // setIsLoadingPage(false); // 로딩 완료
        setReportLoadButtonState(false);
      } else {
        // 2. 새로 생성된 보고서
        if (reportId) {
          if (selectedInterviewType === "single") {
            await updateProjectReportOnServer(
              reportId,
              {
                interviewType: selectedInterviewType,
                reportTitle: selectedInterviewPurposeData.title,
                interviewData: interviewData,
                personaList: personaList.selected,
                purposeData: selectedInterviewPurposeData,
                singleInterviewReportTab1: singleInterviewReportTab1,
                singleInterviewReportTab2: singleInterviewReportTab2,
                singleInterviewReportTab3: singleInterviewReportTab3,
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
                    interviewType: selectedInterviewType,
                    theoryType: selectedInterviewPurposeData.title,
                    interviewData: interviewData.length,
                    selectedPersona: personaList.selected.length,
                    createTimestamp: new Date().getTime(),
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
    const cardWidth = 718;
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

  const toggleThematicExpand = (index) => {
    setExpandedThematicIndex(expandedThematicIndex === index ? null : index);
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
    navigate(`/AiPersona`);
  };

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const RadarChart = ({ data, maxValue = 3 }) => {
    // maxValue 파라미터 추가
    const svgRef = useRef();

    useEffect(() => {
      if (!data) return;

      // SVG 크기 설정
      const width = 300;
      const height = 300;
      const margin = 50;
      const radius = Math.min(width, height) / 2 - margin;

      // SVG 요소 초기화
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

      svg.selectAll("*").remove();

      const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      // 각도 스케일 설정
      const angleScale = d3
        .scaleLinear()
        .domain([0, data.length])
        .range([0, 2 * Math.PI]);

      // 반지름 스케일 설정 - maxValue 파라미터 사용
      const radiusScale = d3
        .scaleLinear()
        .domain([0, maxValue])
        .range([0, radius]);

      // 배경 다각형 그리기 - maxValue에 맞춰 조정
      const backgroundPolygons = Array.from(
        { length: maxValue },
        (_, i) => maxValue - i
      ).map((value) => {
        const points = data.map((_, i) => {
          const angle = angleScale(i) - Math.PI / 2;
          const r = radiusScale(value);
          return [r * Math.cos(angle), r * Math.sin(angle)];
        });

        return g
          .append("polygon")
          .attr("points", points.map((p) => p.join(",")).join(" "))
          .attr("fill", "none")
          .attr("stroke", palette.outlineGray)
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "4,4");
      });

      // 축 그리기
      const axes = g
        .selectAll(".axis")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "axis");

      axes
        .append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", (d, i) => radius * Math.cos(angleScale(i) - Math.PI / 2))
        .attr("y2", (d, i) => radius * Math.sin(angleScale(i) - Math.PI / 2))
        .attr("stroke", palette.outlineGray)
        .attr("stroke-width", 1);

      // 데이터 경로 그리기 - 애니메이션 추가
      const line = d3
        .lineRadial()
        .angle((d, i) => angleScale(i))
        .radius((d) => radiusScale(d.value))
        .curve(d3.curveLinearClosed);

      const path = g
        .append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", `${palette.primary}33`)
        .attr("stroke", palette.primary)
        .attr("stroke-width", 2)
        .style("opacity", 0);

      // 데이터 포인트 그리기
      g.selectAll(".data-point")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "data-point")
        .attr(
          "cx",
          (d, i) => radiusScale(d.value) * Math.cos(angleScale(i) - Math.PI / 2)
        )
        .attr(
          "cy",
          (d, i) => radiusScale(d.value) * Math.sin(angleScale(i) - Math.PI / 2)
        )
        .attr("r", 4)
        .attr("fill", palette.primary);

      // 라벨 추가
      axes
        .append("text")
        .attr(
          "x",
          (d, i) => (radius + 30) * Math.cos(angleScale(i) - Math.PI / 2)
        )
        .attr(
          "y",
          (d, i) => (radius + 30) * Math.sin(angleScale(i) - Math.PI / 2)
        )
        .attr("dy", "0.35em")
        .attr("text-anchor", (d, i) => {
          const angle = angleScale(i);
          if (angle < Math.PI / 2 || angle > (3 * Math.PI) / 2) return "start";
          if (angle === Math.PI / 2 || angle === (3 * Math.PI) / 2)
            return "middle";
          return "end";
        })
        .each(function (d) {
          const text = d3.select(this);
          const words = d.label.split(" (");
          if (words.length > 1) {
            text.text("");
            text
              .append("tspan")
              .text(words[0])
              .attr("x", text.attr("x"))
              .attr("dy", "-0.6em");
            text
              .append("tspan")
              .text(`(${words[1]}`)
              .attr("x", text.attr("x"))
              .attr("dy", "1.2em");
          } else {
            text.text(d.label);
          }
        })
        .style("font-size", "12px")
        .style("fill", palette.gray700)
        .style("font-weight", "500");

      // 값 라벨 추가
      axes
        .append("text")
        .attr(
          "x",
          (d, i) => (radius - 20) * Math.cos(angleScale(i) - Math.PI / 2)
        )
        .attr(
          "y",
          (d, i) => (radius - 20) * Math.sin(angleScale(i) - Math.PI / 2)
        )
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text((d) => d.value)
        .style("font-size", "11px")
        .style("fill", palette.primary)
        .style("font-weight", "600");

      // 애니메이션 적용
      path.transition().duration(800).style("opacity", 0.5);
    }, [data, maxValue]); // maxValue 의존성 추가

    return <svg ref={svgRef} className="radar-chart" />;
  };

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("persona/4/single")) {
        // 세션 스토리지에서 마지막 URL 가져오기
        const lastUrl = sessionStorage.getItem("lastUrl");

        // 마지막 URL이 현재 URL과 같으면 새로고침
        if (lastUrl && lastUrl === currentUrl) {
          navigate("/Project");
          return true;
        }

        // 현재 URL 저장
        sessionStorage.setItem("lastUrl", currentUrl);
      }

      return false;
    };

    // beforeunload 이벤트 핸들러
    const handleBeforeUnload = (event) => {
      // 이벤트 취소 (표준에 따라)
      event.preventDefault();
      // Chrome은 returnValue 설정 필요
      event.returnValue = "";

      // 새로고침 시 루트 페이지로 이동
      navigate("/Project");
    };

    // F5 키 또는 Ctrl+R 감지
    const handleKeyDown = (event) => {
      if (
        (event.key === "r" && (event.metaKey || event.ctrlKey)) ||
        event.key === "F5"
      ) {
        // F5 키 코드
        event.preventDefault();
        navigate("/Project");
      }
    };

    // 함수 실행
    detectRefresh();

    // 이벤트 리스너 등록
    // window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      // window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <>
      <ContentsWrap noScroll={showToast}>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide>
          <AnalysisWrap>
            <MainSection>
              {/* <OrganismBusinessAnalysis personaStep={4} /> */}

              <InterviewReport>
                <div>
                  <ReportHeader>
                    <Title>
                      <H2>
                        {selectedInterviewPurposeData?.title || "인터뷰"} 결과
                        리포트
                      </H2>
                      <Button Primary onClick={handleEnterInterviewRoom}>
                        <img
                          src={images.ReportSearch}
                          alt="인터뷰 스크립트 보기"
                        />
                        인터뷰 스크립트 보기
                      </Button>
                    </Title>
                    {/* <p>
                      {getInterviewPurposeDescription(
                        selectedInterviewPurpose || ""
                      )}
                    </p> */}
                  </ReportHeader>

                  <TabWrapType3>
                    <TabButtonType3
                      isActive={activeTab === 1}
                      onClick={() => handleTabClick(1)}
                    >
                      조사 개요
                    </TabButtonType3>
                    <TabButtonType3
                      isActive={activeTab === 2}
                      onClick={() => handleTabClick(2)}
                    >
                      페르소나 행동 패턴 분석
                    </TabButtonType3>
                    <TabButtonType3
                      isActive={activeTab === 3}
                      onClick={() => handleTabClick(3)}
                    >
                      {selectedInterviewPurposeData.id === 1
                        ? "소비자 가치 분석"
                        : selectedInterviewPurposeData.id === 2
                        ? "감정 요인 분석"
                        : selectedInterviewPurposeData.id === 3
                        ? "구매 장벽 요인 분석"
                        : selectedInterviewPurposeData.id === 4
                        ? "요인 분석"
                        : ""}
                    </TabButtonType3>
                    <TabButtonType3
                      isActive={activeTab === 4}
                      onClick={() => handleTabClick(4)}
                    >
                      인터뷰 요약
                    </TabButtonType3>
                  </TabWrapType3>

                  <ReportContent
                    section={1}
                    style={{ display: activeTab === 1 ? "flex" : "none" }}
                  >
                    <div>
                      <H4>1. 조사 방법 및 범위</H4>
                      <UlList Disc>
                        <li>
                          조사 방법 :{" "}
                          {
                            singleInterviewReportTab1?.research_theory
                              ?.research_type
                          }
                        </li>
                        <li>
                          조사 대상 :{" "}
                          {
                            singleInterviewReportTab1?.research_theory
                              ?.research_target
                          }
                        </li>
                      </UlList>
                    </div>

                    <div>
                      <H4>2. 조사 목적</H4>
                      <UlList Disc Spacing>
                        <li>{singleInterviewReportTab1?.research_purpose}</li>
                      </UlList>
                    </div>

                    <div>
                      <H4>3. 주요 인사이트</H4>
                      <UlList Disc Spacing>
                        <li>
                          {
                            singleInterviewReportTab1?.research_insight
                              ?.insight_1
                          }
                        </li>
                        <li>
                          {
                            singleInterviewReportTab1?.research_insight
                              ?.insight_2
                          }
                        </li>
                      </UlList>
                    </div>
                  </ReportContent>

                  <ReportContent
                    section={2}
                    style={{ display: activeTab === 2 ? "flex" : "none" }}
                  >
                    <div>
                      <H4>1. 페르소나 정보</H4>
                      <PersonaInformationWrap>
                        <PersonaInformation>
                          <Persona size="Large" Round>
                            <img
                              src={
                                personaImages[selectedPersonaList[0]?.imageKey]
                              }
                              alt="페르소나"
                            />
                          </Persona>
                          <div className="info">
                            <Body1>
                              {selectedPersonaList[0]?.personaName || ""}
                            </Body1>
                            <PersonaInfo>
                              <Body3 color="gray500">
                                {selectedPersonaList[0]?.gender || ""}
                              </Body3>
                              <Body3 color="gray500">
                                {selectedPersonaList[0]?.age || ""}
                              </Body3>
                              <Body3 color="gray500">
                                {selectedPersonaList[0]?.job || ""}
                              </Body3>
                            </PersonaInfo>
                          </div>
                        </PersonaInformation>
                        <div className="content">
                          <Body3 color="gray700">
                            {singleInterviewReportTab2?.persona_info}
                          </Body3>
                        </div>
                      </PersonaInformationWrap>
                    </div>

                    <div>
                      <CategoryGraphWrap>
                        <CategoryGraph>
                          <Sub1>활용 수준</Sub1>
                          <UsageLevelGraphWrap>
                            <UsageLevelGraph>
                              <div className="title">
                                <Sub3 color="gray800">관심도</Sub3>
                                <Sub2_1 color="gray800">
                                  {singleInterviewReportTab2
                                    ?.persona_attitude?.[0]?.interest_score ||
                                    0}
                                </Sub2_1>
                              </div>
                              <div className="graph">
                                <div
                                  className="bar"
                                  style={{
                                    width: `${
                                      (singleInterviewReportTab2
                                        ?.persona_attitude?.[0]
                                        ?.interest_score /
                                        7) *
                                        100 || 0
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            </UsageLevelGraph>
                            <UsageLevelGraph>
                              <div className="title">
                                <Sub3 color="gray800">
                                  품질과 브랜드 선호도
                                </Sub3>
                                <Sub2_1 color="gray800">
                                  {singleInterviewReportTab2
                                    ?.persona_attitude?.[1]
                                    ?.quality_preference_score || 0}
                                </Sub2_1>
                              </div>
                              <div className="graph">
                                <div
                                  className="bar"
                                  style={{
                                    width: `${
                                      (singleInterviewReportTab2
                                        ?.persona_attitude?.[1]
                                        ?.quality_preference_score /
                                        7) *
                                        100 || 0
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            </UsageLevelGraph>
                            <UsageLevelGraph>
                              <div className="title">
                                <Sub3 color="gray800">정보 탐색 행동</Sub3>
                                <Sub2_1 color="gray800">
                                  {singleInterviewReportTab2
                                    ?.persona_attitude?.[2]
                                    ?.search_behavior_score || 0}
                                </Sub2_1>
                              </div>
                              <div className="graph">
                                <div
                                  className="bar"
                                  style={{
                                    width: `${
                                      (singleInterviewReportTab2
                                        ?.persona_attitude?.[2]
                                        ?.search_behavior_score /
                                        7) *
                                        100 || 0
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            </UsageLevelGraph>
                            <UsageLevelGraph>
                              <div className="title">
                                <Sub3 color="gray800">가격 민감도</Sub3>
                                <Sub2_1 color="gray800">
                                  {singleInterviewReportTab2
                                    ?.persona_attitude?.[3]
                                    ?.price_sensitivity_score || 0}
                                </Sub2_1>
                              </div>
                              <div className="graph">
                                <div
                                  className="bar"
                                  style={{
                                    width: `${
                                      (singleInterviewReportTab2
                                        ?.persona_attitude?.[3]
                                        ?.price_sensitivity_score /
                                        7) *
                                        100 || 0
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            </UsageLevelGraph>
                            <UsageLevelGraph>
                              <div className="title">
                                <Sub3 color="gray800">
                                  제품/서비스 사용 빈도
                                </Sub3>
                                <Sub2_1 color="gray800">
                                  {singleInterviewReportTab2
                                    ?.persona_attitude?.[4]
                                    ?.product_service_usage_frequency_score ||
                                    0}
                                </Sub2_1>
                              </div>
                              <div className="graph">
                                <div
                                  className="bar"
                                  style={{
                                    width: `${
                                      (singleInterviewReportTab2
                                        ?.persona_attitude?.[4]
                                        ?.product_service_usage_frequency_score /
                                        7) *
                                        100 || 0
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            </UsageLevelGraph>
                          </UsageLevelGraphWrap>
                        </CategoryGraph>
                        <CategoryGraph>
                          <Sub1>행동 패턴</Sub1>
                          <RadarChart
                            maxValue={3} // 행동 패턴은 0-3 범위
                            data={[
                              {
                                label: "개방성",
                                value:
                                  singleInterviewReportTab2
                                    ?.big_five_personality_traits?.[0]
                                    ?.openness_score || 0,
                              },
                              {
                                label: "성실성",
                                value:
                                  singleInterviewReportTab2
                                    ?.big_five_personality_traits?.[1]
                                    ?.conscientiousness_score || 0,
                              },

                              {
                                label: "외향성",
                                value:
                                  singleInterviewReportTab2
                                    ?.big_five_personality_traits?.[2]
                                    ?.extraversion_score || 0,
                              },
                              {
                                label: "친화성",
                                value:
                                  singleInterviewReportTab2
                                    ?.big_five_personality_traits?.[3]
                                    ?.agreeableness_score || 0,
                              },
                              {
                                label: "신경성",
                                value:
                                  singleInterviewReportTab2
                                    ?.big_five_personality_traits?.[4]
                                    ?.neuroticism_score || 0,
                              },
                            ]}
                          />
                        </CategoryGraph>
                      </CategoryGraphWrap>
                    </div>

                    <div>
                      <H4>2. 제품 관련 행동 패턴</H4>
                      <UlList Disc>
                        <li>
                          {
                            singleInterviewReportTab2?.product_service_usage_pattern
                          }
                        </li>
                      </UlList>
                    </div>

                    <div>
                      <H4>3. 구매 및 활용 동기</H4>
                      <UlList Disc>
                        <li>
                          {
                            singleInterviewReportTab2?.purchase_and_usage_motivation
                          }
                        </li>
                      </UlList>
                    </div>

                    <div>
                      <H4>4. 문제점 및 요구 사항</H4>
                      <UlList Disc>
                        <li>
                          {singleInterviewReportTab2?.problems_and_requirements}
                        </li>
                      </UlList>
                    </div>
                  </ReportContent>

                  <ReportContent
                    section={3}
                    style={{ display: activeTab === 3 ? "flex" : "none" }}
                  >
                    <BgBoxItem>
                      <H6 color="gray800">
                        {singleInterviewReportTab3?.persona_summary}
                      </H6>
                    </BgBoxItem>

                    <div>
                      <ResultTitle>
                        <Body2 color="primary">
                          #
                          {singleInterviewReportTab3?.insight_1?.keyword_1 ||
                            ""}
                        </Body2>
                        <H4 color="gray800">
                          {singleInterviewReportTab3?.insight_1
                            ?.insight_1_sentence || ""}
                        </H4>
                      </ResultTitle>

                      <UlList Disc Spacing>
                        {singleInterviewReportTab3?.insight_1
                          ?.insight_1_context && (
                          <li>
                            {
                              singleInterviewReportTab3?.insight_1
                                ?.insight_1_context
                            }
                          </li>
                        )}
                        {singleInterviewReportTab3?.insight_1
                          ?.insight_1_solution && (
                          <li>
                            {singleInterviewReportTab3?.insight_1
                              ?.insight_1_solution || ""}
                          </li>
                        )}
                      </UlList>
                    </div>

                    <div>
                      <ResultTitle>
                        <Body2 color="primary">
                          #
                          {singleInterviewReportTab3?.insight_2?.keyword_2 ||
                            ""}
                        </Body2>
                        <H4 color="gray800">
                          {singleInterviewReportTab3?.insight_2
                            ?.insight_2_sentence || ""}
                        </H4>
                      </ResultTitle>

                      <UlList Disc Spacing>
                        {singleInterviewReportTab3?.insight_2
                          ?.insight_2_context && (
                          <li>
                            {singleInterviewReportTab3?.insight_2
                              ?.insight_2_context || ""}
                          </li>
                        )}
                        {singleInterviewReportTab3?.insight_2
                          ?.insight_2_solution && (
                          <li>
                            {
                              singleInterviewReportTab3?.insight_2
                                ?.insight_2_solution
                            }
                          </li>
                        )}
                      </UlList>
                    </div>

                    <div>
                      <ResultTitle>
                        <Body2 color="primary">
                          #
                          {singleInterviewReportTab3?.insight_3?.keyword_3 ||
                            ""}
                        </Body2>
                        <H4 color="gray800">
                          {singleInterviewReportTab3?.insight_3
                            ?.insight_3_sentence || ""}
                        </H4>
                      </ResultTitle>

                      <UlList Disc Spacing>
                        {singleInterviewReportTab3?.insight_3
                          ?.insight_3_context && (
                          <li>
                            {singleInterviewReportTab3?.insight_3
                              ?.insight_3_context || ""}
                          </li>
                        )}
                        {singleInterviewReportTab3?.insight_3
                          ?.insight_3_solution && (
                          <li>
                            {
                              singleInterviewReportTab3?.insight_3
                                ?.insight_3_solution
                            }
                          </li>
                        )}
                      </UlList>
                    </div>
                  </ReportContent>
                  {/* 4. 심층 인터뷰 */}
                  <ReportContent
                    section={4}
                    style={{ display: activeTab === 4 ? "flex" : "none" }}
>
                    <div>
                      <H4 style={{ marginBottom: "-12px" }}>1. 인터뷰 핵심 내용 정리</H4>

                      {/* 데이터가 있으면 사용, 없으면 더미 데이터 표시 */}
                      {(() => {
                       
                  
                        return (
                          <ThematicGrid>
                            {singleInterviewReportTab2?.thematic_analysis ?.map((theme, index) => (
                              <ThematicCard key={index}>
                                {/* 제목과 태그를 포함한 헤더 */}
                                <ThematicHeader>
                                  <ThematicTitleArea>
                                    <h3
                                      style={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        color: "#333",
                                        marginBottom: "10px",
                                      }}
                                    >
                                      {theme.theme}
                                    </h3>
                                    {/* 키워드 태그 - 항상 표시 */}
                                    <div>
                                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                        {(theme.keywords || theme.keyword_list || [])
                                          .slice(0, 3)
                                          .map((keyword, kidx) => (
                                            <KeywordTag key={kidx}>#{keyword}</KeywordTag>
                                          ))}
                                      </div>
                                    </div>
                                  </ThematicTitleArea>
                                  <ThematicIconButton
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleThematicExpand(index);
                                    }}
                                  >
                                    {expandedThematicIndex === index ? (
                                      // 펼쳐진 상태: ↑ 위로 향한 PNG
                                      <img
                                        src={ExpandIcon}
                                        alt="collapse"
                                        width={24}
                                        height={24}
                                        style={{ filter: "brightness(0) saturate(100%) invert(40%) sepia(0%) saturate(0%) hue-rotate(157deg) brightness(98%) contrast(89%)" }}
                                      />
                                    ) : (
                                      // 접힌 상태: ↓ 아래로 향한 SVG
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.57727 10.209L12.5 16.3995L18.4227 10.209" stroke="#666666" strokeWidth="1.37143" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    )}
                                  </ThematicIconButton>
                                </ThematicHeader>
                  
                                {/* 펼쳐진 상태에서만 표시되는 추가 내용 */}
                                {expandedThematicIndex === index && (
                                  <>
                                    <Divider />
                      
                                    {/* 이유/해석 */}
                                    <p style={{ color: "#666666", lineHeight: "1.6" }}>
                                      {theme.reason || theme.reason_text}
                                    </p>
                      
                                    {/* 인용구(페르소나 응답) */}
                                    <div>
                                      <InterviewSection>
                                        <InterviewTitle>페르소나 응답</InterviewTitle>
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "6px",
                                          }}
                                        >
                                          {(theme.interview_reference ||
                                            theme.references ||
                                            []
                                          ).map((ref, ridx) => (
                                            <InterviewQuote key={ridx}>"{ref}"</InterviewQuote>
                                          ))}
                                        </div>
                                      </InterviewSection>
                                    </div>
                                  </>
                                )}
                              </ThematicCard>
                            ))}
                          </ThematicGrid>
                        );
                      })()}
                    </div>
                  </ReportContent>
                </div>
              </InterviewReport>
            </MainSection>

            <SidebarWrap>
              {/* <Sidebar>
                <h5>Key Insight</h5>
                <ProgressBar>
                  <span className="icon">🚀</span>
                  <Progress progress={100} />
                  <span>Fin</span>
                </ProgressBar>

                <MoleculeStepIndicator steps={steps} activeStep={5} />
              </Sidebar> */}

              <Sidebar>
                <PersonaInfoWrap>
                  <PersonaInfoTitle>
                    <Body2_1 color="gray800" align="left">
                      참여 페르소나 정보
                    </Body2_1>
                    <Sub3 color="gray700" align="left">
                      {selectedPersonaList?.length || 0}명의 페르소나가
                      참여했어요
                    </Sub3>
                  </PersonaInfoTitle>

                  <PersonaInfoContent>
                    {selectedPersonaList?.[0] ? (
                      <>
                        <Persona size="Large" Round>
                          <img
                            src={
                              personaImages[selectedPersonaList[0]?.imageKey]
                            }
                            alt="페르소나"
                          />
                        </Persona>
                        <PersonaText>
                          <Caption1 color="gray800" align="left">
                            {selectedPersonaList[0].personaName ||
                              "성향 정보 없음"}
                          </Caption1>
                          <PersonaInfo>
                            <span>
                              {selectedPersonaList[0].gender || "성별"}
                            </span>
                            <span>
                              {selectedPersonaList[0].age?.includes("세")
                                ? selectedPersonaList[0].age
                                : `${selectedPersonaList[0].age || "나이"}세`}
                            </span>
                            <span className="job">
                              {selectedPersonaList[0].job || "직업"}
                            </span>
                          </PersonaInfo>
                        </PersonaText>
                      </>
                    ) : (
                      <Caption1 color="gray700" align="center">
                        선택된 페르소나가 없습니다
                      </Caption1>
                    )}
                  </PersonaInfoContent>

                  {/* <Button Medium PrimaryLightest Fill>
                    같은 페르소나에게 다른 질문하기
                  </Button> */}
                </PersonaInfoWrap>

                <WaitPersonaWrap>
                  <WaitPersonaTitle>
                    <Body2_1 color="gray800" align="left">
                      👀 기다리는 페르소나가 있어요
                    </Body2_1>
                    <Sub3 color="gray700" align="left">
                      지금 바로 인터뷰가 가능한 {personaCount || 0}명의
                      페르소나가 인터뷰를 기다리고 있어요
                    </Sub3>
                  </WaitPersonaTitle>

                  <Button
                    Medium
                    PrimaryLightest
                    Fill
                    onClick={navigateToPersonaPage}
                  >
                    <img src={images.ListUserSearch} alt="" />
                    비즈니스 페르소나 보러가기
                  </Button>
                </WaitPersonaWrap>
              </Sidebar>

              {/* <SidebarBottom>
                <strong>
                  다른 페르소나의 이야기가 궁금하시다면,
                  <br />
                  지금 바로 대화해보세요 🙌🏻
                </strong>

                <span onClick={navigateToPersonaPage}>
                  맞춤 페르소나 보러가기
                </span>
              </SidebarBottom> */}
            </SidebarWrap>

            {showToast && (
              <OrganismToastPopupSingleChaComplete
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

export default PagePersona4Single;

const TabWrapType3 = styled(TabWrap)`
  gap: 16px !important;
  margin-top: 40px;
  border-bottom: 1px solid ${palette.outlineGray};
`;

const PersonaInformationWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  .content {
    margin-left: 56px;
  }
`;

const PersonaInformation = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;

  .thumb {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
`;

const CategoryGraphWrap = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  padding-left: 56px;
`;

const CategoryGraph = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 50%;

  .radar-chart {
    width: 100%;
    height: 300px;
  }
`;

const UsageLevelGraphWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
  width: 100%;
`;

const UsageLevelGraph = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .graph {
    position: relative;
    width: 100%;
    height: 8px;
    border-radius: 2px;
    background: ${palette.chatGray};
    overflow: hidden;
  }

  .bar {
    height: 100%;
    border-radius: 2px;
    background: ${palette.primary};
  }
`;

const BgBoxItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px 32px;
  margin-bottom: 8px;
  border-radius: 15px;
  background: ${palette.chatGray};
`;

const ResultTitle = styled(Title)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px !important;
  width: 100%;
`;

const InterviewReport = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 80px;
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


const ThematicGrid = styled.div`
  display: grid;
  gap: 20px;
  padding: 20px;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
`;

const ThematicCard = styled.div`
  background-color: ${palette.white};
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #e0e4eb;
  display: flex;
  flex-direction: column;
`;

const ThematicHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ThematicTitleArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  flex: 1;
`;

const ThematicIconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  flex-shrink: 0;
  align-self: center;
`;

const InterviewSection = styled.div`
  background-color: #f7f8fa;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`;

const InterviewTitle = styled.h4`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
`;

const KeywordTag = styled.span`
  display: inline-flex;
  align-items: center;
  color: ${palette.gray700};
  font-size: 14px;
  line-height: 1;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${palette.outlineGray};
  margin: 16px 0;
`;

const InterviewQuote = styled.blockquote`
  padding-bottom: 10px;
  border-bottom: 1px solid ${palette.outlineGray};
  color: ${palette.gray700};
  font-size: 14px;
  text-align: left;
  line-height: 1.2;

  /* 마지막 인용문은 구분선 제거 */
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
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

  div {
    display: flex;
    flex-direction: column;
    gap: 8px;

    p + p {
      padding-top: 8px;
      border-top: 1px solid ${palette.outlineGray};
    }
  }
`;

const InterviewInsight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  padding: 32px 32px 44px;
  border-radius: 10px;
  background: ${palette.gray50};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: ${palette.chatGray};
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const InterviewFind = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 140px;
  animation: slideDown 0.5s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
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
`;

const FindCard = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 718px;
  overflow: hidden;
  position: relative;
`;

const FindCardButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  z-index: 1;

  span {
    position: relative;
    right: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    // border: 1px solid ${palette.outlineGray};
    // background: ${palette.white};
    background: ${palette.chatGray};
    cursor: pointer;

    &:before {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 2px;
      border-radius: 50%;
      background: ${palette.gray800};
      // content: "";
    }

    &.prev {
      left: -15px;
      transform: rotate(180deg);
    }

    &:after {
      position: absolute;
      // left: 50%;
      left: 45%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      width: 9px;
      height: 9px;
      border-right: 2px solid ${palette.gray500};
      border-top: 2px solid ${palette.gray500};
      content: "";
    }
  }
`;

const CardWrap = styled.div`
  display: flex;
  // gap: 16px;
  transition: transform 0.3s ease-in-out;
  flex-shrink: 0;
`;

const Card = styled.div`
  // width: 295px;
  max-width: 718px;
  height: 250px;
  display: flex;
  // flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  gap: 32px;
  padding: 32px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
  // background: ${palette.chatGray};
  cursor: pointer;
  transition: all 0.5s;

  // &:hover {
  //   background: ${palette.outlineGray};
  // }

  // &:hover {
  //   img {
  //     filter: brightness(120%);
  //   }
  // }
`;

const CardIcon = styled.div`
  // align-self: flex-end;
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
      // content: "";
    }
  }
`;

const SidebarWrap = styled.div`
  position: sticky;
  top: 101px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 20px;
  // margin-top: 44px;
`;

const Sidebar = styled.div`
  position: sticky;
  top: 101px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 16px;
  width: 290px;
  // padding: 16px 20px;
  // margin-top: 44px;
  // border-radius: 10px;
  // background: ${palette.chatGray};

  h5 {
    font-size: 0.88rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${palette.gray700};
    text-align: left;
  }
`;

const PersonaInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 20px 20px 12px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;

const PersonaInfoTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const PersonaInfoContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const PersonaText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
`;

const PersonaInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  width: 100%;

  span {
    font-size: 0.75rem;
    line-height: 1.3;
    color: ${palette.gray500};
    letter-spacing: -0.36px;

    + span:before {
      display: inline-block;
      width: 1px;
      height: 9px;
      margin-right: 6px;
      background: ${palette.gray500};
      content: "";
    }

    &.job {
      max-width: 130px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  p + p:before {
    display: inline-block;
    width: 1px;
    height: 9px;
    margin-right: 6px;
    background: ${palette.gray500};
    content: "";
  }
`;

const WaitPersonaWrap = styled(PersonaInfoWrap)`
  gap: 24px;
  padding: 20px 20px 20px;
`;

const WaitPersonaTitle = styled(PersonaInfoTitle)`
  gap: 12px;
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
