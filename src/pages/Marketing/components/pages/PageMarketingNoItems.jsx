import React, { useEffect, useRef, useState } from "react";
import styled, { css, ThemeProvider } from "styled-components";
import theme from "../../../../assets/styles/Theme";
import { Link } from "react-router-dom";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";
import { useAtom } from "jotai";
import {
  MARKETING_MBTI_ANSWER,
  MARKETING_MBTI_RESULT,
  MARKETING_RECOMMENDED_ITEM_BUTTON_STATE,
  MARKETING_INTEREST,
} from "../../../AtomStates";
import { useSaveConversation } from "../../../Expert_Insight/components/atoms/AtomSaveConversation";
import { useNavigate } from "react-router-dom";

const PageMarketingNoItems = () => {
  const navigate = useNavigate();
  const { saveConversation } = useSaveConversation();
  const [marketingMbtiAnswer, setMarketingMbtiAnswer] = useAtom(
    MARKETING_MBTI_ANSWER
  );
  const [marketingMbtiResult, setMarketingMbtiResult] = useAtom(
    MARKETING_MBTI_RESULT
  );
  const [
    marketingRecommendedItemButtonState,
    setMarketingRecommendedItemButtonState,
  ] = useAtom(MARKETING_RECOMMENDED_ITEM_BUTTON_STATE);
  const [marketingInterest, setMarketingInterest] = useAtom(MARKETING_INTEREST);

  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Chrome requires returnValue to be set.
      event.returnValue = "";
      window.location.href = "/MarketingLanding";
    };

    const handlePopState = () => {
      setIsExitPopupOpen(true);
    };

    const handleKeyDown = (event) => {
      // if (event.keyCode === 116)
      if (
        (event.key === "r" && (event.metaKey || event.ctrlKey)) ||
        event.key === "F5"
      ) {
        // F5 key code
        setIsExitPopupOpen(true);
        event.preventDefault();
        // navigate("/");
      }
    };

    //새로고침방지
    window.addEventListener("beforeunload", handleBeforeUnload);

    window.history.pushState(null, "", "");
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      //새로고침 방지

      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleExitCancel = () => {
    setIsExitPopupOpen(false);
  };

  const handleExitConfirm = () => {
    window.location.href = "/MarketingLanding";
  };

  const scrollableSectionRef = useRef(null);

  useEffect(() => {
    const preventDefault = (e) => {
      e.preventDefault(); // 기본 스크롤 동작 차단
    };

    // iOS에서 터치 스크롤 차단
    document.body.style.overflow = "hidden";
    document.body.addEventListener("touchmove", preventDefault, {
      passive: false,
    });

    // 특정 영역의 스크롤 허용 (모바일 터치 스크롤 허용)
    const allowTouchScroll = (el) => {
      el.addEventListener(
        "touchmove",
        (e) => {
          e.stopPropagation(); // 상위 body의 스크롤 차단 이벤트 무효화
        },
        { passive: false }
      );
    };

    if (scrollableSectionRef.current) {
      allowTouchScroll(scrollableSectionRef.current);
    }

    return () => {
      document.body.style.overflow = "";
      document.body.removeEventListener("touchmove", preventDefault);
    };
  }, []);

  // const [activeQuestion, setActiveQuestion] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [isRadioSelected, setIsRadioSelected] = useState(false);

  const questionRefs = useRef([]);
  const questions = Array.from({ length: 14 }, (_, i) => `Q${i + 1}`); // 질문 생성 갯수 설정

  // 모바일 여부 확인
  const isMobile = window.innerWidth <= 768;

  // 상태에 따라 Navbar 보여질 여부
  const [showNavbar, setShowNavbar] = useState(false);

  const tooltips = [
    "START",
    "Q1. 아침에 직장(학교)를 가기전 드는 생각은?",
    "Q2. 위험하다는 말을 들었을 때 나는?",
    "Q3. 실패 할 수도 있을 때?",
    "Q4. 기회가 오면 나는?",
    "Q5. 최신 기술 뉴스에 대한 반응은?",
    "Q6. 여유 자금이 생기면?",
    "Q7. 일할 때 나는?",
    "Q8. 내가 원하는 창업 무대는?",
    "Q9. 창업스타일 중 마음에 드는 건?",
    "Q10. 어떤 분야에 더 끌리시나요?",
    "Q11. 이루고 싶은 목표는?",
    "Q12. 신기술이나 새 아이디어에 대해 나는?",
    "Q13. 가장 관심이 가는 분야는?",
  ];

  const [tooltip, setTooltip] = useState({
    show: false,
    text: "",
    top: 0,
    left: 0,
  });

  // 특정 섹션으로 스크롤 이동
  const handleScrollToQuestion = (index) => {
    const target = questionRefs.current[index];
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100); // 딜레이를 추가하여 스크롤 안정화
    }

    setActiveQuestion(index);
    setIsRadioSelected(false);
  };

  // // 스크롤에 따라 active 클래스 업데이트
  // const updateActiveQuestion = () => {
  //   questionRefs.current.forEach((section, index) => {
  //     if (window.scrollY >= section.offsetTop - 100) {
  //       setActiveQuestion(index);
  //     }
  //   });
  // };

  // // 스크롤 이벤트 설정
  // useEffect(() => {
  //   window.addEventListener("scroll", updateActiveQuestion);
  //   return () => {
  //     window.removeEventListener("scroll", updateActiveQuestion);
  //   };
  // }, []);

  // 툴팁 표시 핸들러
  const handleMouseOver = (e, index) => {
    if (index < activeQuestion) {
      const liRect = e.target.getBoundingClientRect();
      setTooltip({
        show: true,
        text: tooltips[index],
        top: liRect.top + window.scrollY + liRect.height / 2,
        left: liRect.right + 10,
      });
    }
  };

  const handleMouseOut = () => {
    setTooltip({ ...tooltip, show: false });
  };

  // const handleRadioChange = (index) => {
  //   if (index < questions.length - 1) {
  //     setActiveQuestion(index + 1);
  //     handleScrollToQuestion(index + 1);
  //   }
  // };

  // const handleRadioChange = (index) => {
  //   if (index === activeQuestion && index < questions.length - 1) {
  //     // 다음 질문으로 이동
  //     setActiveQuestion(index + 1);
  //     // 해당 질문으로 스크롤
  //     handleScrollToQuestion(index + 1);
  //   }
  // };

  // 라디오 버튼 선택 시 동작
  const handleRadioChange = (index) => {
    if (index === activeQuestion) {
      setIsRadioSelected(true); // 선택 상태 업데이트
      if (!isMobile) {
        // 모바일이 아닐 경우만 섹션 이동
        handleScrollToQuestion(index + 1);
      }
    }
  };

  // 다음 버튼 클릭 시 동작
  const handleNextButtonClick = () => {
    if (isRadioSelected && activeQuestion < questions.length - 1) {
      handleScrollToQuestion(activeQuestion + 1);
    }
  };

  const updateMbtiAnswer = (index, newValue) => {
    setMarketingMbtiAnswer((prev) => [
      ...prev.slice(0, index),
      newValue,
      ...prev.slice(index + 1),
    ]);
  };

  const generateMbti = (category) => {
    setMarketingInterest(category);

    let mbti = "";

    if (marketingMbtiAnswer[0] < 0) mbti += "R";
    else mbti += "S";

    if (marketingMbtiAnswer[1] < 0) mbti += "O";
    else mbti += "P";

    if (marketingMbtiAnswer[2] < 0) mbti += "I";
    else mbti += "T";

    if (marketingMbtiAnswer[3] < 0) mbti += "C";
    else mbti += "A";

    const mbtiResult = {
      name: mbti,
      category:
        mbti === "ROIC"
          ? "불도저형 스타트업러"
          : mbti === "ROTC"
          ? "모험심 가득한 팀플레이 혁신가"
          : mbti === "SOIA"
          ? "기회만 보면 달려가는 신중형"
          : mbti === "RPTC"
          ? "팀플레이 혁신가"
          : mbti === "ROTA"
          ? "팀과 함께 달리는 야심가"
          : mbti === "SPIC"
          ? "차근차근형 아이디어 매니아"
          : mbti === "SOTC"
          ? "기획형 팀 도전자"
          : mbti === "RPIA"
          ? "혼자서도 멋진 현실주의 전략가"
          : mbti === "ROIA"
          ? "실용적 독고다이"
          : mbti === "SPTC"
          ? "안전지향 창의 협력자"
          : mbti === "SPIA"
          ? "독립적 실용 전략가"
          : mbti === "RPTA"
          ? "모험적 팀 실용주의자"
          : mbti === "SOIC"
          ? "안정적 독립 기회포착형"
          : mbti === "SOTA"
          ? "실용적 팀 기회주의자"
          : mbti === "RPIC"
          ? "독립적 모험 계획가"
          : mbti === "SPTA"
          ? "실용적 팀 혁신가"
          : "",
      summary:
        mbti === "ROIC"
          ? "🚜 당신은 멈추지 않는 직진 본능으로 혁신의 길을 뚫는 불도저스타일입니다."
          : mbti === "ROTC"
          ? "🧗‍♂️ 당신은 팀과 함께라면 뭐든 도전하는 혁신가 스타일입니다."
          : mbti === "SOIA"
          ? "🧐 당신은 기회와 안정성을 모두 잡는 전략가입니다."
          : mbti === "RPTC"
          ? "🤝 당신은 협력과 창의성으로 혁신을 만들어내는 팀플레이어입니다."
          : mbti === "ROTA"
          ? "🚀 당신은 팀의 성공을 자신의 성공으로 여기는 야심가입니다."
          : mbti === "SPIC"
          ? "🧩 당신은 천천히, 하지만 확실하게 나아가는 퍼즐 조각 장인정신 스타일입니다."
          : mbti === "SOTC"
          ? "🛠️ 당신은 팀과 함께 기회를 찾아 도전하는 현장 감독 스타일입니다."
          : mbti === "RPIA"
          ? "🎯 당신은 혼자서도 모든 걸 해내는 올인원 전략가입니다."
          : mbti === "ROIA"
          ? "🏗️ 당신은 효율과 실용성을 중시하는 독립형 빌더입니다."
          : mbti === "SPTC"
          ? "🌱 당신은 항의성과 안전성을 모두 잡는 정원사 스타일입니다."
          : mbti === "SPIA"
          ? "🧠 당신은 독립적으로 완벽한 계획을 실행하는 두뇌파 전략가입니다."
          : mbti === "RPTA"
          ? "⚡ 당신은 팀과 함께라면 모험도 즐기는 다이내믹 플레이어입니다."
          : mbti === "SOIC"
          ? "🔍 당신은 기회를 놓치지 않으면서도 안정적으로 성과를 만들어내는 탐정 스타일입니다."
          : mbti === "SOTA"
          ? "🛡️ 당신은 팀워크로 기회를 만들어내는 안정성의 수호자입니다."
          : mbti === "RPIC"
          ? "🗺️ 당신은 창의적 아이디어로 새로운 길을 개척하는 탐험가입니다."
          : mbti === "SPTA"
          ? "💡 당신은 팀과 함께 창의적이고 실용적인 결과를 만들어내는 발명가 스타일입니다."
          : "",
      description:
        mbti === "ROIC"
          ? '"불도저형 스타트업러"는 기회가 보이면 바로 실행에 옮기는 추진력 갑! 실패를 두려워하기보다는 "그래, 한 번 더 도전하면 되지"라는 마인드로 돌파해 나갑니다. 트렌드와 신기술에 빠르게 반응하며, 항상 다음 목표를 향해 과감하게 움직이는 스타일이에요. 예측 불가능한 상황도 "해결 방법을 찾으면 된다"는 자신감으로 유연하게 대처합니다. 높은 리스크와 보상이 공존하는 환경에서 진짜 실력을 발휘하는 유형이죠. 목표가 있다면? 당연히 직진이 답입니다.'
          : mbti === "ROTC"
          ? '"모험심 가득한 팀플레이 혁신가"는 팀워크의 중요성을 잘 아는 창의적 도전자입니다. 위험한 상황에서도 팀원들과 머리를 맞대며 해결책을 찾아내는 데 탁월하죠. 아이디어는 나누면 커진다는 신념으로 협력에 집중하고, 시너지를 통해 큰 목표를 이뤄냅니다. 팀과 함께 도전하면서도 각자의 역할을 조율하는 능력 덕분에 결과는 언제나 굿! 도전과 팀워크의 조화로 안정적이면서도 창의적인 성과를 만들어냅니다.'
          : mbti === "SOIA"
          ? '"모험심 가득한 팀플레이 혁신가"는 팀워크의 중요성을 잘 아는 창의적 도전자입니다. 위험한 상황에서도 팀원들과 머리를 맞대며 해결책을 찾아내는 데 탁월하죠. 아이디어는 나누면 커진다는 신념으로 협력에 집중하고, 시너지를 통해 큰 목표를 이뤄냅니다. 팀과 함께 도전하면서도 각자의 역할을 조율하는 능력 덕분에 결과는 언제나 굿! 도전과 팀워크의 조화로 안정적이면서도 창의적인 성과를 만들어냅니다.'
          : mbti === "RPTC"
          ? '"팀플레이 혁신가"는 팀과 함께 혁신을 만들어가는 데 진심입니다. 창의적인 아이디어를 팀원들과 공유하고 이를 현실로 바꾸는 데 탁월한 능력을 발휘하죠. 위험 요소가 있어도 철저한 계획과 협력으로 목표를 안정적으로 달성합니다. "혼자 가면 빨리 가지만, 함께 가면 멀리 간다"라는 말이 이 유형을 설명하기에 딱이죠. 긴밀한 협력을 통해 안정적이면서도 혁신적인 결과를 만들어냅니다.'
          : mbti === "ROTA"
          ? '"팀과 함께 달리는 야심가"는 팀의 성공을 자신의 성공보다 더 중요하게 여깁니다. 팀원들과 협력하며 목표를 정하고, 모든 자원을 효율적으로 활용해 빠르게 성장합니다. 높은 위험에도 불구하고 팀워크와 조직력을 믿고 돌진하는 이들의 도전정신, 대단하지 않나요? 목표 달성엔 팀이 최강이라는 믿음을 가진 타입입니다. 협력 속에서 성과를 극대화하며 도전과 성장을 함께 이루는 유형입니다.'
          : mbti === "SPIC"
          ? '"차근차근형 아이디어 매니아"는 느리지만 확실한 접근을 선호합니다. 창의적인 아이디어를 다듬고, 꼼꼼하게 검토한 후 실행에 옮기는 안정성을 갖추고 있죠. 단기 성과보다는 장기적인 성장을 목표로 하며, 작은 성공을 쌓아가며 지속 가능한 결과를 만들어냅니다. 리스크를 최소화하면서도 창의성을 발휘할 수 있는 환경에서 진가를 발휘하는 유형입니다.'
          : mbti === "SOTC"
          ? '"기회형 팀 도전자"는 팀워크와 협력을 통해 모든 문제를 해결하는 데 최적화된 유형이에요. "위험이 있다고? 팀이랑 하면 다 해결되지!"라는 마인드로 어려운 상황에서도 창의적인 아이디어를 실행합니다. 이들은 팀원들의 의견을 잘 수렴하고, 모두가 힘을 합칠 수 있는 환경을 만들어내며, 무슨 일이든 팀으로 돌파합니다. 도전과 안정성을 동시에 챙기며, 팀원들과 함께 목표를 이루는 과정에서 에너지를 얻는 진정한 협력형 플레이어입니다.'
          : mbti === "RPIA"
          ? '"혼자서도 멋진 현실주의 전략가"는 "내가 내 길을 만든다!"라는 독립적인 사고방식을 가진 전략가입니다. 혼자서도 모든 걸 척척 해내며, 현실적이고 실용적인 해결책을 찾아 실행합니다. 철저한 계획과 사전 준비는 이들의 필수 무기! 장기적인 성과를 위해 단기적인 리스크는 과감히 피하고, 효율적인 방법으로 결과를 만들어냅니다. 독립적인 환경에서 최고의 집중력을 발휘하며, "혼자 해도 이 정도면 됐지!"라고 자부할 수 있는 타입입니다.'
          : mbti === "ROIA"
          ? '"실용적 독고다이"는 "효율이 곧 진리"라는 마인드로 움직이는 실용주의자입니다. 목표가 보이면 "최소한의 리소스로 최대한의 성과를 내자"는 접근 방식으로 돌파구를 만들어냅니다. 혼자서도 필요한 모든 걸 해결하며, 주어진 조건에서 가장 현실적인 결과를 내는 데 초점을 맞춥니다. 필요하다면 리스크를 감수하지만, 이들은 "결과가 증명한다!"라는 자신감을 바탕으로 목표를 이루는 데 집중합니다.'
          : mbti === "SPTC"
          ? '"안전지향 창의 협력자"는 팀과 함께 창의적인 아이디어를 현실로 만드는 데 열정적입니다. 위험이 따르는 상황에서도 "안정적으로 가자!"를 외치며 철저한 계획을 세워 목표를 달성하죠. 팀원들과 협력하며, 각자의 아이디어를 한데 모아 멋진 결과를 만들어내는 게 이들의 특기입니다. "안정성과 창의성? 두 마리 토끼 다 잡을 수 있어!"라는 자신감으로 늘 새로운 길을 모색합니다.'
          : mbti === "SPIA"
          ? '"독립적 실용 전략가"는 "혼자서도 내가 다 한다"는 마인드로 체계적인 계획과 현실적인 접근 방식을 지향합니다. 안정적이고 실질적인 결과를 위해 최적의 전략을 세우고, 자원과 시간을 효율적으로 사용하죠. 리스크는 최소화, 성과는 극대화! 독립적인 환경에서 최고의 능력을 발휘하며, "실용적이고 전략적으로 가자"는 생각으로 목표를 차근차근 이뤄냅니다.'
          : mbti === "RPTA"
          ? '"모험적 팀 실용주의자"는 "팀이랑 같이라면 모험도 OK!"라는 마인드로 움직입니다. 실용적인 해결책과 창의적 접근을 통해 현실적인 문제를 해결하며, 필요할 경우 위험도 기꺼이 감수합니다. 팀원들과 협력하며 효율적인 방법을 찾아 목표를 달성하는 데 능숙하죠. 혁신과 안정성을 모두 잡는 이들의 모토는 "팀과 함께하면 뭐든 가능해!"입니다.'
          : mbti === "SOIC"
          ? '"안정적 독립 기회포착형"은 "위험을 줄이고 기회를 잡는다"는 철학으로 움직입니다. 모든 일을 꼼꼼히 계획하고, 철저히 분석한 후 실행에 나서며 안정적인 결과를 만들어냅니다. 장기적인 성장을 목표로 하며, 창의적이지만 현실적인 접근으로 성공 확률을 높입니다. "기회를 놓치지 않으면서도 안정적으로"라는 말이 딱 어울리는 타입이에요.'
          : mbti === "SOTA"
          ? '"실용적 팀 기회주의자"는 팀과 함께 현실적인 문제를 해결하며 기회를 놓치지 않는 유형입니다. "안정 속에서도 기회를 잡자"는 마인드로 협력과 실용성을 극대화하며, 팀원들과의 긴밀한 소통으로 효율적인 해결책을 만들어냅니다. 언제나 "팀으로 더 큰 성과를"이라는 생각으로 움직이는 효율성의 대가입니다.'
          : mbti === "RPIC"
          ? '"독립적 모험 계획가"는 "혼자서도 모험은 즐겁다!"라는 철학을 가진 창의적인 도전가입니다. 위험을 감수하면서도 철저히 계획을 세워 실행하며, 기존의 틀을 벗어난 혁신을 추구합니다. 창의적 아이디어에 대한 호기심과 열정이 넘치며, "이건 내가 해낸다!"는 자신감으로 새로운 길을 개척합니다.'
          : mbti === "SPTA"
          ? '"실용적 팀 혁신가"는 "같이 하면 더 멀리 간다"는 신념으로 팀원들과 협력해 실용적이면서도 창의적인 해결책을 만들어냅니다. 체계적인 계획과 현실적인 접근 방식을 통해 안정적이고 효율적인 성과를 만들어내며, 팀의 의견을 조율하고 함께 목표를 이루는 데 강점을 발휘합니다. 창의성과 현실성, 둘 다 잡는 완벽한 팀플레이어입니다.'
          : "",
    };

    setMarketingMbtiResult(mbtiResult);
    setMarketingRecommendedItemButtonState(1);

    saveConversation({
      changingConversation: { marketingMbtiResult: mbtiResult },
    });

    setIsRadioSelected(true);

    if (!isMobile) {
      navigate("/MarketingSetting/2/Result");
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar>
          <h1 className="pc" onClick={() => setIsExitPopupOpen(true)}>
            <img src={images.SymbolLogoWhite} alt="" />
          </h1>
          <h1
            // className="mobile"
            className={`mobile ${
              activeQuestion >= 1 ? "question1-passed" : ""
            }`}
            onClick={() => setIsExitPopupOpen(true)}
          ></h1>
          {showNavbar && (
            <ul>
              {questions.map((question, index) => (
                <li
                  key={question}
                  className={`${activeQuestion === index ? "active" : ""} ${
                    index < activeQuestion ? "disabled" : ""
                  }`}
                  // onClick={() => handleScrollToQuestion(index)}
                  // onClick={() => {
                  //   if (index <= activeQuestion) handleScrollToQuestion(index);
                  // }}
                  onMouseOver={(e) => handleMouseOver(e, index)}
                  onMouseOut={handleMouseOut}
                >
                  {question}
                  <Tooltip
                    show={tooltip.show && tooltip.text === tooltips[index]} // 해당 tooltip만 표시
                    top={tooltip.top}
                    left={tooltip.left}
                  >
                    {tooltip.text}
                  </Tooltip>
                </li>
              ))}
            </ul>
          )}
        </Navbar>

        <QuestionWrap
          id="question0"
          ref={(el) => (questionRefs.current[0] = el)}
        >
          <Question>
            <p>
              아이디어가 아직 없어도 걱정마세요 😊 <br />
              창업 성향 테스트로 함께 찾아볼까요? <br />
              새로운 기회를 발견할지 몰라요 !
            </p>
          </Question>

          <Answer>
            <StartWrap>
              <p
                onClick={() => {
                  setShowNavbar(true);
                  handleScrollToQuestion(1);
                }}
              >
                START
              </p>
              <span>내게 맞는 아이템 찾기</span>
            </StartWrap>
          </Answer>
        </QuestionWrap>

        <QuestionWrap
          id="question1"
          ref={(el) => (questionRefs.current[1] = el)}
        >
          <Question>
            <p>
              <span>Q1.</span>
              아침에 직장(학교)를 <br />
              가기전 드는 생각은?
            </p>
          </Question>

          <Answer>
            <RadioButtonWrap>
              <RadioButton
                onClick={() => updateMbtiAnswer(0, marketingMbtiAnswer[0] - 1)}
              >
                <input
                  type="radio"
                  id="q1"
                  name="question1"
                  onChange={() => handleRadioChange(1)}
                />
                <label htmlFor="q1">
                  <strong>💥</strong>
                  <span>
                    오늘은 무슨 <br />
                    대박을 터트릴까?
                  </span>
                </label>
              </RadioButton>
              <RadioButton
                onClick={() => updateMbtiAnswer(0, marketingMbtiAnswer[0] + 1)}
              >
                <input
                  type="radio"
                  id="q2"
                  name="question1"
                  onChange={() => handleRadioChange(1)}
                />
                <label htmlFor="q2">
                  <strong>📅</strong>
                  <span>
                    오늘도 차분하게, <br />
                    계획대로
                  </span>
                </label>
              </RadioButton>
            </RadioButtonWrap>

            <NextButton
              isRadioSelected={isRadioSelected}
              onClick={handleNextButtonClick}
              disabled={!isRadioSelected}
            >
              다음
            </NextButton>
          </Answer>
        </QuestionWrap>

        <QuestionWrap
          id="question2"
          ref={(el) => (questionRefs.current[2] = el)}
        >
          <Question>
            <p>
              <span>Q2.</span>
              위험하다는 말을 들었을 때 <br />
              나는?
            </p>
          </Question>

          <Answer>
            <RadioButtonWrap>
              <RadioButton
                onClick={() => updateMbtiAnswer(0, marketingMbtiAnswer[0] - 1)}
              >
                <input
                  type="radio"
                  id="q3"
                  name="question2"
                  onChange={() => handleRadioChange(2)}
                />
                <label htmlFor="q3">
                  <strong>🚀</strong>
                  <span>
                    그래도 <br />
                    도전해보자!
                  </span>
                </label>
              </RadioButton>
              <RadioButton
                onClick={() => updateMbtiAnswer(0, marketingMbtiAnswer[0] + 1)}
              >
                <input
                  type="radio"
                  id="q4"
                  name="question2"
                  onChange={() => handleRadioChange(2)}
                />
                <label htmlFor="q4">
                  <strong>🔍</strong>
                  <span>
                    그럼 다른 <br />
                    방법을 찾자
                  </span>
                </label>
              </RadioButton>
            </RadioButtonWrap>

            <NextButton
              isRadioSelected={isRadioSelected}
              onClick={handleNextButtonClick}
              disabled={!isRadioSelected}
            >
              다음
            </NextButton>
          </Answer>
        </QuestionWrap>

        <QuestionWrap
          id="question3"
          ref={(el) => (questionRefs.current[3] = el)}
        >
          <Question>
            <p>
              <span>Q3.</span>
              실패할 수도 <br />
              있을 때
            </p>
          </Question>

          <Answer>
            <RadioButtonWrap>
              <RadioButton
                onClick={() => updateMbtiAnswer(0, marketingMbtiAnswer[0] - 1)}
              >
                <input
                  type="radio"
                  id="q5"
                  name="question3"
                  onChange={() => handleRadioChange(3)}
                />
                <label htmlFor="q5">
                  <strong>💪</strong>
                  <span>
                    일단 부딪쳐 <br />
                    보자
                  </span>
                </label>
              </RadioButton>
              <RadioButton
                onClick={() => updateMbtiAnswer(0, marketingMbtiAnswer[0] + 1)}
              >
                <input
                  type="radio"
                  id="q6"
                  name="question3"
                  onChange={() => handleRadioChange(3)}
                />
                <label htmlFor="q6">
                  <strong>🤔</strong>
                  <span>
                    신중히 <br />
                    생각해보자
                  </span>
                </label>
              </RadioButton>
            </RadioButtonWrap>

            <NextButton
              isRadioSelected={isRadioSelected}
              onClick={handleNextButtonClick}
              disabled={!isRadioSelected}
            >
              다음
            </NextButton>
          </Answer>
        </QuestionWrap>

        <QuestionWrap
          id="question4"
          ref={(el) => (questionRefs.current[4] = el)}
        >
          <Question>
            <p>
              <span>Q4.</span>
              기회가 오면 <br />
              나는?
            </p>
          </Question>

          <Answer>
            <RadioButtonWrap>
              <RadioButton
                onClick={() => updateMbtiAnswer(1, marketingMbtiAnswer[1] - 1)}
              >
                <input
                  type="radio"
                  id="q7"
                  name="question4"
                  onChange={() => handleRadioChange(4)}
                />
                <label htmlFor="q7">
                  <strong>🏃🏻</strong>
                  <span>
                    지금이야! <br />
                    바로가자!
                  </span>
                </label>
              </RadioButton>
              <RadioButton
                onClick={() => updateMbtiAnswer(1, marketingMbtiAnswer[1] + 1)}
              >
                <input
                  type="radio"
                  id="q8"
                  name="question4"
                  onChange={() => handleRadioChange(4)}
                />
                <label htmlFor="q8">
                  <strong>📝</strong>
                  <span>
                    탄탄히 <br />
                    준비하고 가자
                  </span>
                </label>
              </RadioButton>
            </RadioButtonWrap>

            <NextButton
              isRadioSelected={isRadioSelected}
              onClick={handleNextButtonClick}
              disabled={!isRadioSelected}
            >
              다음
            </NextButton>
          </Answer>
        </QuestionWrap>

        <QuestionWrap
          id="question5"
          ref={(el) => (questionRefs.current[5] = el)}
        >
          <Question>
            <p>
              <span>Q5.</span>
              최신 기술 뉴스에 <br />
              대한 반응은?
            </p>
          </Question>

          <Answer>
            <RadioButtonWrap>
              <RadioButton
                onClick={() => updateMbtiAnswer(1, marketingMbtiAnswer[1] - 1)}
              >
                <input
                  type="radio"
                  id="q9"
                  name="question5"
                  onChange={() => handleRadioChange(5)}
                />
                <label htmlFor="q9">
                  <strong>💡</strong>
                  <span>
                    이걸 어디 <br />
                    써먹을 수 있을까?
                  </span>
                </label>
              </RadioButton>
              <RadioButton
                onClick={() => updateMbtiAnswer(1, marketingMbtiAnswer[1] + 1)}
              >
                <input
                  type="radio"
                  id="q10"
                  name="question5"
                  onChange={() => handleRadioChange(5)}
                />
                <label htmlFor="q10">
                  <strong>📖</strong>
                  <span>
                    재밌네 <br />좀 더 알아보자
                  </span>
                </label>
              </RadioButton>
            </RadioButtonWrap>

            <NextButton
              isRadioSelected={isRadioSelected}
              onClick={handleNextButtonClick}
              disabled={!isRadioSelected}
            >
              다음
            </NextButton>
          </Answer>
        </QuestionWrap>

        <QuestionWrap
          id="question6"
          ref={(el) => (questionRefs.current[6] = el)}
        >
          <Question>
            <p>
              <span>Q6.</span>
              여유 자금이 <br />
              생기면?
            </p>
          </Question>

          <Answer>
            <RadioButtonWrap>
              <RadioButton
                onClick={() => updateMbtiAnswer(1, marketingMbtiAnswer[1] - 1)}
              >
                <input
                  type="radio"
                  id="q11"
                  name="question6"
                  onChange={() => handleRadioChange(6)}
                />
                <label htmlFor="q11">
                  <strong>💸</strong>
                  <span>
                    새로운 기회에 <br />
                    투자해보자
                  </span>
                </label>
              </RadioButton>
              <RadioButton
                onClick={() => updateMbtiAnswer(1, marketingMbtiAnswer[1] + 1)}
              >
                <input
                  type="radio"
                  id="q12"
                  name="question6"
                  onChange={() => handleRadioChange(6)}
                />
                <label htmlFor="q12">
                  <strong>💼</strong>
                  <span>
                    일단 계획된 곳에 <br />
                    써야지
                  </span>
                </label>
              </RadioButton>
            </RadioButtonWrap>

            <NextButton
              isRadioSelected={isRadioSelected}
              onClick={handleNextButtonClick}
              disabled={!isRadioSelected}
            >
              다음
            </NextButton>
          </Answer>
        </QuestionWrap>

        <QuestionWrap
          id="question7"
          ref={(el) => (questionRefs.current[7] = el)}
        >
          <Question>
            <p>
              <span>Q7.</span>
              일할 때 <br />
              나는?
            </p>
          </Question>

          <Answer>
            <RadioButtonWrap>
              <RadioButton
                onClick={() => updateMbtiAnswer(2, marketingMbtiAnswer[2] - 1)}
              >
                <input
                  type="radio"
                  id="q13"
                  name="question7"
                  onChange={() => handleRadioChange(7)}
                />
                <label htmlFor="q13">
                  <strong>✋🏻</strong>
                  <span>
                    혼자 집중해서 <br />
                    해결하는게 좋아
                  </span>
                </label>
              </RadioButton>
              <RadioButton
                onClick={() => updateMbtiAnswer(2, marketingMbtiAnswer[2] + 1)}
              >
                <input
                  type="radio"
                  id="q14"
                  name="question7"
                  onChange={() => handleRadioChange(7)}
                />
                <label htmlFor="q14">
                  <strong>👥</strong>
                  <span>
                    팀과 함께하는게 <br />더 재밌어!
                  </span>
                </label>
              </RadioButton>
            </RadioButtonWrap>

            <NextButton
              isRadioSelected={isRadioSelected}
              onClick={handleNextButtonClick}
              disabled={!isRadioSelected}
            >
              다음
            </NextButton>
          </Answer>
        </QuestionWrap>

        <QuestionWrap
          id="question8"
          ref={(el) => (questionRefs.current[8] = el)}
        >
          <Question>
            <p>
              <span>Q8.</span>
              내가 원하는 <br />
              창업 무대는?
            </p>
          </Question>

          <Answer>
            <RadioButtonWrap>
              <RadioButton
                onClick={() => updateMbtiAnswer(2, marketingMbtiAnswer[2] - 1)}
              >
                <input
                  type="radio"
                  id="q15"
                  name="question8"
                  onChange={() => handleRadioChange(8)}
                />
                <label htmlFor="q15">
                  <strong>🎤</strong>
                  <span>
                    나 혼자 <br />
                    주도하는 무대!
                  </span>
                </label>
              </RadioButton>
              <RadioButton
                onClick={() => updateMbtiAnswer(2, marketingMbtiAnswer[2] + 1)}
              >
                <input
                  type="radio"
                  id="q16"
                  name="question8"
                  onChange={() => handleRadioChange(8)}
                />
                <label htmlFor="q16">
                  <strong>🎪</strong>
                  <span>
                    다 같이 만드는 <br />큰 무대
                  </span>
                </label>
              </RadioButton>
            </RadioButtonWrap>

            <NextButton
              isRadioSelected={isRadioSelected}
              onClick={handleNextButtonClick}
              disabled={!isRadioSelected}
            >
              다음
            </NextButton>
          </Answer>
        </QuestionWrap>

        <QuestionWrap
          id="question9"
          ref={(el) => (questionRefs.current[9] = el)}
        >
          <Question>
            <p>
              <span>Q9.</span>
              창업스타일 중 <br />
              마음에 드는 건?
            </p>
          </Question>

          <Answer>
            <RadioButtonWrap>
              <RadioButton
                onClick={() => updateMbtiAnswer(2, marketingMbtiAnswer[2] - 1)}
              >
                <input
                  type="radio"
                  id="q17"
                  name="question9"
                  onChange={() => handleRadioChange(9)}
                />
                <label htmlFor="q17">
                  <strong>🎨</strong>
                  <span>
                    혼자 자유롭게, <br />내 방식대로
                  </span>
                </label>
              </RadioButton>
              <RadioButton
                onClick={() => updateMbtiAnswer(2, marketingMbtiAnswer[2] + 1)}
              >
                <input
                  type="radio"
                  id="q18"
                  name="question9"
                  onChange={() => handleRadioChange(9)}
                />
                <label htmlFor="q18">
                  <strong>🤝</strong>
                  <span>
                    팀과 함께 <br />
                    배우며 성장
                  </span>
                </label>
              </RadioButton>
            </RadioButtonWrap>

            <NextButton
              isRadioSelected={isRadioSelected}
              onClick={handleNextButtonClick}
              disabled={!isRadioSelected}
            >
              다음
            </NextButton>
          </Answer>
        </QuestionWrap>

        <QuestionWrap
          id="question10"
          ref={(el) => (questionRefs.current[10] = el)}
        >
          <Question>
            <p>
              <span>Q10.</span>
              어떤 분야에 <br />더 끌리시나요?
            </p>
          </Question>

          <Answer>
            <RadioButtonWrap>
              <RadioButton
                onClick={() => updateMbtiAnswer(3, marketingMbtiAnswer[3] - 1)}
              >
                <input
                  type="radio"
                  id="q19"
                  name="question10"
                  onChange={() => handleRadioChange(10)}
                />
                <label htmlFor="q19">
                  <strong>🌈</strong>
                  <span>
                    남다른 창의적 <br />
                    분야
                  </span>
                </label>
              </RadioButton>
              <RadioButton
                onClick={() => updateMbtiAnswer(3, marketingMbtiAnswer[3] + 1)}
              >
                <input
                  type="radio"
                  id="q20"
                  name="question10"
                  onChange={() => handleRadioChange(10)}
                />
                <label htmlFor="q20">
                  <strong>📊</strong>
                  <span>
                    효과 확실한 <br />
                    분야
                  </span>
                </label>
              </RadioButton>
            </RadioButtonWrap>

            <NextButton
              isRadioSelected={isRadioSelected}
              onClick={handleNextButtonClick}
              disabled={!isRadioSelected}
            >
              다음
            </NextButton>
          </Answer>
        </QuestionWrap>

        <QuestionWrap
          id="question11"
          ref={(el) => (questionRefs.current[11] = el)}
        >
          <Question>
            <p>
              <span>Q11.</span>
              이루고 싶은 <br />
              목표는?
            </p>
          </Question>

          <Answer>
            <RadioButtonWrap>
              <RadioButton
                onClick={() => updateMbtiAnswer(3, marketingMbtiAnswer[3] - 1)}
              >
                <input
                  type="radio"
                  id="q21"
                  name="question11"
                  onChange={() => handleRadioChange(11)}
                />
                <label htmlFor="q21">
                  <strong>🌍✨</strong>
                  <span>
                    내 아이디어로 <br />
                    세상에 새로움 전하기
                  </span>
                </label>
              </RadioButton>
              <RadioButton
                onClick={() => updateMbtiAnswer(3, marketingMbtiAnswer[3] + 1)}
              >
                <input
                  type="radio"
                  id="q22"
                  name="question11"
                  onChange={() => handleRadioChange(11)}
                />
                <label htmlFor="q22">
                  <strong>📊</strong>
                  <span>
                    바로 성과 내며 <br />
                    성장하기
                  </span>
                </label>
              </RadioButton>
            </RadioButtonWrap>

            <NextButton
              isRadioSelected={isRadioSelected}
              onClick={handleNextButtonClick}
              disabled={!isRadioSelected}
            >
              다음
            </NextButton>
          </Answer>
        </QuestionWrap>

        <QuestionWrap
          id="question12"
          ref={(el) => (questionRefs.current[12] = el)}
        >
          <Question>
            <p>
              <span>Q12.</span>
              신기술이나 <br />새 아이디어에 대해 나는?
            </p>
          </Question>

          <Answer>
            <RadioButtonWrap>
              <RadioButton
                onClick={() => updateMbtiAnswer(3, marketingMbtiAnswer[3] - 1)}
              >
                <input
                  type="radio"
                  id="q23"
                  name="question12"
                  onChange={() => handleRadioChange(12)}
                />
                <label htmlFor="q23">
                  <strong>🧪</strong>
                  <span>
                    새로운 걸 <br />
                    만들어보고 싶어!
                  </span>
                </label>
              </RadioButton>
              <RadioButton
                onClick={() => updateMbtiAnswer(3, marketingMbtiAnswer[3] + 1)}
              >
                <input
                  type="radio"
                  id="q24"
                  name="question12"
                  onChange={() => handleRadioChange(12)}
                />
                <label htmlFor="q24">
                  <strong>🔧</strong>
                  <span>
                    실용적이어야 <br />
                    좋지
                  </span>
                </label>
              </RadioButton>
            </RadioButtonWrap>

            <NextButton
              isRadioSelected={isRadioSelected}
              onClick={handleNextButtonClick}
              disabled={!isRadioSelected}
            >
              다음
            </NextButton>
          </Answer>
        </QuestionWrap>

        <QuestionWrap
          id="question13"
          ref={(el) => (questionRefs.current[13] = el)}
        >
          <Question>
            <p>
              <span>Q13.</span>
              가장 관심이 가는 <br />
              분야는?
            </p>
          </Question>

          <Answer>
            <RadioButtonWrap ref={scrollableSectionRef}>
              <RadioButton
                onClick={() => {
                  generateMbti("IT/테크");
                }}
              >
                <input type="radio" id="q25" name="question13" />
                <label htmlFor="q25">
                  <strong>💻</strong>
                  <span>IT / 테크</span>
                </label>
              </RadioButton>
              <RadioButton
                onClick={() => {
                  generateMbti("헬스케어");
                }}
              >
                <input type="radio" id="q26" name="question13" />
                <label htmlFor="q26">
                  <strong>🏋️‍♀️</strong>
                  <span>헬스케어</span>
                </label>
              </RadioButton>
              <RadioButton
                onClick={() => {
                  generateMbti("교육/컨설팅");
                }}
              >
                <input type="radio" id="q27" name="question13" />
                <label htmlFor="q27">
                  <strong>📘</strong>
                  <span>교육 / 컨설팅</span>
                </label>
              </RadioButton>
              <RadioButton
                onClick={() => {
                  generateMbti("예술/디자인");
                }}
              >
                <input type="radio" id="q28" name="question13" />
                <label htmlFor="q28">
                  <strong>🎨</strong>
                  <span>예술 / 디자인</span>
                </label>
              </RadioButton>
              <RadioButton
                onClick={() => {
                  generateMbti("외식/소매업");
                }}
              >
                <input type="radio" id="q29" name="question13" />
                <label htmlFor="q29">
                  <strong>🍔</strong>
                  <span>외식 / 소매업</span>
                </label>
              </RadioButton>
            </RadioButtonWrap>

            <NextButton
              isRadioSelected={isRadioSelected}
              onClick={() => navigate("/MarketingSetting/2/Result")}
              disabled={!isRadioSelected}
            >
              완료
            </NextButton>
          </Answer>
        </QuestionWrap>
        {isExitPopupOpen && (
          <Popup Cancel>
            <div>
              <button
                type="button"
                className="closePopup"
                onClick={handleExitCancel}
              >
                닫기
              </button>
              <span>
                <img src={images.ExclamationMarkRed} alt="" />
              </span>
              <p>
                <strong>모든 내용이 삭제됩니다</strong>
                <span>
                  종료 또는 새로고침 할 경우, 모든 대화내역이 사라집니다.
                </span>
              </p>
              <div className="btnWrap">
                <button type="button" onClick={handleExitCancel}>
                  계속 진행하기
                </button>
                <button type="button" onClick={handleExitConfirm}>
                  종료할게요
                </button>
              </div>
            </div>
          </Popup>
        )}
      </ThemeProvider>
    </>
  );
};

export default PageMarketingNoItems;

const Navbar = styled.div`
  position: fixed;
  top: 50%;
  left: 40px;
  transform: translateY(-50%);
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s;
  z-index: 99;

  h1 {
    font-size: 0;
    cursor: pointer;

    &.mobile {
      display: none;
    }
  }

  ul {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 9px;
  }

  li {
    display: inline-block;
    width: 12px;
    height: 12px;
    font-size: 0;
    box-sizing: border-box;
    border-radius: 100%;
    background: ${palette.white};
    // cursor:pointer;

    &.active {
      border: 2px solid ${palette.white};
      background: none;
    }

    &.disabled {
      background: rgba(255, 255, 255, 0.3);
    }

    &:nth-child(1) {
      display: none;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    transform: none;
    align-items: flex-start;

    h1 {
      &.pc {
        display: none;
      }

      &.mobile {
        display: block;
        padding: 10px;
        margin-left: 15px;
        margin-top: 30px;

        &:before {
          width: 16px;
          height: 16px;
          transform: rotate(45deg);
          display: block;
          border-left: 3px solid ${palette.white};
          border-bottom: 3px solid ${palette.white};
          content: "";
        }

        &.question1-passed:before {
          border-color: ${palette.gray800};
        }
      }
    }

    ul {
      top: 0;
      left: 0;
      transform: none;
      width: 100%;
      flex-direction: row;
      gap: 0;
    }

    li {
      flex: 1 1 auto;
      // height:4px;
      height: 8px;
      border-radius: 0;
      background: ${palette.outlineGray};

      &.active {
        border: 0;
        background: #5547ff;
      }

      &.disabled {
        background: #5547ff;
      }
    }
  }
`;

const Tooltip = styled.div`
  position: absolute;
  // left: ${(props) => props.left}px;
  // top: ${(props) => props.top}px;
  // top:0;
  left: 200%;
  font-size: 0.63rem;
  color: ${palette.white};
  line-height: 1.5;
  padding: 8px 14px;
  margin-top: -8px;
  border-radius: 8px;
  white-space: nowrap;
  pointer-events: none;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  background: #333;
  z-index: 999;
`;

const QuestionWrap = styled.section`
  position: relative;
  height: 100dvh;
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;

    &#question0 {
      background: #5547ff;
    }

    &#question0 p {
      color: ${palette.white};
      text-align: center;
      padding: 0;
    }

    &#question0 br {
      display: block;
    }
  }
`;

const Question = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 50%;
  background: #5547ff;

  p {
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.4;
    color: ${palette.white};
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex: 1 1 20%;
    align-items: flex-end;
    padding-top: 100px;
    background: none;

    p {
      width: 100%;
      font-size: 1.25rem;
      color: ${palette.gray800};
      text-align: left;
      gap: 5px;
      padding: 0 20px;
    }

    br {
      display: none;
    }
  }
`;

const Answer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex: 1 1 50%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: relative;
    flex: 1 1 80%;
    padding: 0 20px 85px;
  }
`;

const NextButton = styled.button`
  display: none;
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  font-family: "Pretendard", "Poppins";
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.6;
  color: ${palette.white};
  padding: 15px 0;
  border-radius: 100px;
  border: 0;
  background: ${(props) =>
    props.isRadioSelected ? "#5547FF" : palette.gray200};
  cursor: ${(props) => (props.isRadioSelected ? "pointer" : "not-allowed")};
  transition: all 0.5s;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }
`;

const StartWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;

  p {
    width: 190px;
    height: 190px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.5;
    color: ${palette.white};
    border-radius: 100%;
    background: #5547ff;
    cursor: pointer;
  }

  span {
    font-size: 1.25rem;
    font-weight: 300;
    color: ${palette.gray800};
    line-height: 1.3;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    p {
      color: #5547ff !important;
      background: ${palette.white};
    }

    span {
      font-size: 0.88rem;
      color: ${palette.white};
    }
  }
`;

const RadioButtonWrap = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 100px;
  max-width: 60%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 50px;
    max-width: 100%;
    max-height: 60dvh;
    overflow-y: auto;
  }
`;

const RadioButton = styled.div`
  input[type="radio"] {
    display: none;
  }

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 48px;
    cursor: pointer;
  }

  strong {
    font-size: 3.75rem;
    font-weight: 300;
    line-height: 1.5;
    opacity: 0.4;
    transition: all 0.5s;
  }

  span {
    font-size: 1.25rem;
    line-height: 1.6;
    color: ${palette.gray300};
    text-align: center;
    transition: all 0.5s;
  }

  input[type="radio"]:checked + label,
  input[type="radio"]:hover + label {
    strong {
      opacity: 1;
    }

    span {
      font-weight: 500;
      color: #5547ff;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    label {
      gap: 40px;
    }

    strong {
      font-size: 3.13rem;
    }

    span {
      font-size: 1rem;
      line-height: 1.5;
    }
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
  z-index: 9999;

  .closePopup {
    position: absolute;
    right: 24px;
    top: 24px;
    width: 16px;
    height: 16px;
    font-size: 0;
    padding: 9px;
    border: 0;
    background: none;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 100%;
      border-radius: 10px;
      background: ${palette.gray500};
      content: "";
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    text-align: center;
    // overflow:hidden;
    padding: 45px 24px 24px;
    border-radius: 10px;
    background: ${palette.white};

    p {
      font-family: "Pretendard", "Poppins";
      font-size: 0.875rem;
      font-weight: 500;
      margin: 20px auto 24px;
      strong {
        font-weight: 500;
        display: block;
      }

      span {
        font-size: 0.75rem !important;
        font-weight: 400;
        color: #f40404;
        display: block;
        margin-top: 8px;
      }
    }

    .btnWrap {
      display: flex;
      align-items: center;
      gap: 16px;

      button {
        flex: 1;
        font-family: "Pretendard", "Poppins";
        font-size: 0.875rem;
        font-weight: 600;
        color: ${palette.blue};
        padding: 12px 20px;
        border-radius: 12px;
        border: 1px solid ${palette.blue};
        background: ${palette.white};

        // &:last-child {
        //   color: ${palette.white};
        //   background: ${palette.blue};
        // }
      }
    }

    ${(props) =>
      props.Cancel &&
      css`
        p {
          strong {
            font-weight: 600;
            display: block;
            color: ${palette.gray800};
          }
          span {
            font-size: 1rem;
            display: block;
            margin-top: 8px;
          }
        }

        .btnWrap {
          padding-top: 16px;
          border-top: 1px solid ${palette.lineGray};

          button {
            color: ${palette.gray700};
            font-weight: 400;
            padding: 0;
            border: 0;
            background: none;
          }
        }
      `}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    > div {
      width: 90%;
    }
  }
`;
