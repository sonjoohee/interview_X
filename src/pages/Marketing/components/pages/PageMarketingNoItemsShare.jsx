import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../../../assets/styles/Theme";
import images from "../../../../assets/styles/Images";
import { useAtom } from "jotai";
import { MARKETING_MBTI_RESULT } from "../../../AtomStates";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";

const PageMarketingNoItemsShare = () => {
  const { mbtiType } = useParams();
  const [marketingMbtiResult, setMarketingMbtiResult] = useAtom(
    MARKETING_MBTI_RESULT
  );
  const navigate = useNavigate();

  const [isDragging, setIsDragging] = useState(false);
  const [questionFlex, setQuestionFlex] = useState("1 1 100%");
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const mbtiResult = {
      name: mbtiType,
      category:
        mbtiType === "ROIC"
          ? "불도저형 스타트업러"
          : mbtiType === "ROTC"
          ? "모험심 가득한 팀플레이 혁신가"
          : mbtiType === "SOIA"
          ? "기회만 보면 달려가는 신중형"
          : mbtiType === "RPTC"
          ? "팀플레이 혁신가"
          : mbtiType === "ROTA"
          ? "팀과 함께 달리는 야심가"
          : mbtiType === "SPIC"
          ? "차근차근형 아이디어 매니아"
          : mbtiType === "SOTC"
          ? "기획형 팀 도전자"
          : mbtiType === "RPIA"
          ? "혼자서도 멋진 현실주의 전략가"
          : mbtiType === "ROIA"
          ? "실용적 독고다이"
          : mbtiType === "SPTC"
          ? "안전지향 창의 협력자"
          : mbtiType === "SPIA"
          ? "독립적 실용 전략가"
          : mbtiType === "RPTA"
          ? "모험적 팀 실용주의자"
          : mbtiType === "SOIC"
          ? "안정적 독립 기회포착형"
          : mbtiType === "SOTA"
          ? "실용적 팀 기회주의자"
          : mbtiType === "RPIC"
          ? "독립적 모험 계획가"
          : mbtiType === "SPTA"
          ? "실용적 팀 혁신가"
          : "",
      summary:
        mbtiType === "ROIC"
          ? "🚜 당신은 멈추지 않는 직진 본능으로 혁신의 길을 뚫는 불도저스타일입니다."
          : mbtiType === "ROTC"
          ? "🧗‍♂️ 당신은 팀과 함께라면 뭐든 도전하는 혁신가 스타일입니다."
          : mbtiType === "SOIA"
          ? "🧐 당신은 기회와 안정성을 모두 잡는 전략가입니다."
          : mbtiType === "RPTC"
          ? "🤝 당신은 협력과 창의성으로 혁신을 만들어내는 팀플레이어입니다."
          : mbtiType === "ROTA"
          ? "🚀 당신은 팀의 성공을 자신의 성공으로 여기는 야심가입니다."
          : mbtiType === "SPIC"
          ? "🧩 당신은 천천히, 하지만 확실하게 나아가는 퍼즐 조각 장인정신 스타일입니다."
          : mbtiType === "SOTC"
          ? "🛠️ 당신은 팀과 함께 기회를 찾아 도전하는 현장 감독 스타일입니다."
          : mbtiType === "RPIA"
          ? "🎯 당신은 혼자서도 모든 걸 해내는 올인원 전략가입니다."
          : mbtiType === "ROIA"
          ? "🏗️ 당신은 효율과 실용성을 중시하는 독립형 빌더입니다."
          : mbtiType === "SPTC"
          ? "🌱 당신은 항의성과 안전성을 모두 잡는 정원사 스타일입니다."
          : mbtiType === "SPIA"
          ? "🧠 당신은 독립적으로 완벽한 계획을 실행하는 두뇌파 전략가입니다."
          : mbtiType === "RPTA"
          ? "⚡ 당신은 팀과 함께라면 모험도 즐기는 다이내믹 플레이어입니다."
          : mbtiType === "SOIC"
          ? "🔍 당신은 기회를 놓치지 않으면서도 안정적으로 성과를 만들어내는 탐정 스타일입니다."
          : mbtiType === "SOTA"
          ? "🛡️ 당신은 팀워크로 기회를 만들어내는 안정성의 수호자입니다."
          : mbtiType === "RPIC"
          ? "🗺️ 당신은 창의적 아이디어로 새로운 길을 개척하는 탐험가입니다."
          : mbtiType === "SPTA"
          ? "💡 당신은 팀과 함께 창의적이고 실용적인 결과를 만들어내는 발명가 스타일입니다."
          : "",
      description:
        mbtiType === "ROIC"
          ? '"불도저형 스타트업러"는 기회가 보이면 바로 실행에 옮기는 추진력 갑! 실패를 두려워하기보다는 "그래, 한 번 더 도전하면 되지"라는 마인드로 돌파해 나갑니다. 트렌드와 신기술에 빠르게 반응하며, 항상 다음 목표를 향해 과감하게 움직이는 스타일이에요. 예측 불가능한 상황도 "해결 방법을 찾으면 된다"는 자신감으로 유연하게 대처합니다. 높은 리스크와 보상이 공존하는 환경에서 진짜 실력을 발휘하는 유형이죠. 목표가 있다면? 당연히 직진이 답입니다.'
          : mbtiType === "ROTC"
          ? '"모험심 가득한 팀플레이 혁신가"는 팀워크의 중요성을 잘 아는 창의적 도전자입니다. 위험한 상황에서도 팀원들과 머리를 맞대며 해결책을 찾아내는 데 탁월하죠. 아이디어는 나누면 커진다는 신념으로 협력에 집중하고, 시너지를 통해 큰 목표를 이뤄냅니다. 팀과 함께 도전하면서도 각자의 역할을 조율하는 능력 덕분에 결과는 언제나 굿! 도전과 팀워크의 조화로 안정적이면서도 창의적인 성과를 만들어냅니다.'
          : mbtiType === "SOIA"
          ? '"모험심 가득한 팀플레이 혁신가"는 팀워크의 중요성을 잘 아는 창의적 도전자입니다. 위험한 상황에서도 팀원들과 머리를 맞대며 해결책을 찾아내는 데 탁월하죠. 아이디어는 나누면 커진다는 신념으로 협력에 집중하고, 시너지를 통해 큰 목표를 이뤄냅니다. 팀과 함께 도전하면서도 각자의 역할을 조율하는 능력 덕분에 결과는 언제나 굿! 도전과 팀워크의 조화로 안정적이면서도 창의적인 성과를 만들어냅니다.'
          : mbtiType === "RPTC"
          ? '"팀플레이 혁신가"는 팀과 함께 혁신을 만들어가는 데 진심입니다. 창의적인 아이디어를 팀원들과 공유하고 이를 현실로 바꾸는 데 탁월한 능력을 발휘하죠. 위험 요소가 있어도 철저한 계획과 협력으로 목표를 안정적으로 달성합니다. "혼자 가면 빨리 가지만, 함께 가면 멀리 간다"라는 말이 이 유형을 설명하기에 딱이죠. 긴밀한 협력을 통해 안정적이면서도 혁신적인 결과를 만들어냅니다.'
          : mbtiType === "ROTA"
          ? '"팀과 함께 달리는 야심가"는 팀의 성공을 자신의 성공보다 더 중요하게 여깁니다. 팀원들과 협력하며 목표를 정하고, 모든 자원을 효율적으로 활용해 빠르게 성장합니다. 높은 위험에도 불구하고 팀워크와 조직력을 믿고 돌진하는 이들의 도전정신, 대단하지 않나요? 목표 달성엔 팀이 최강이라는 믿음을 가진 타입입니다. 협력 속에서 성과를 극대화하며 도전과 성장을 함께 이루는 유형입니다.'
          : mbtiType === "SPIC"
          ? '"차근차근형 아이디어 매니아"는 느리지만 확실한 접근을 선호합니다. 창의적인 아이디어를 다듬고, 꼼꼼하게 검토한 후 실행에 옮기는 안정성을 갖추고 있죠. 단기 성과보다는 장기적인 성장을 목표로 하며, 작은 성공을 쌓아가며 지속 가능한 결과를 만들어냅니다. 리스크를 최소화하면서도 창의성을 발휘할 수 있는 환경에서 진가를 발휘하는 유형입니다.'
          : mbtiType === "SOTC"
          ? '"기회형 팀 도전자"는 팀워크와 협력을 통해 모든 문제를 해결하는 데 최적화된 유형이에요. "위험이 있다고? 팀이랑 하면 다 해결되지!"라는 마인드로 어려운 상황에서도 창의적인 아이디어를 실행합니다. 이들은 팀원들의 의견을 잘 수렴하고, 모두가 힘을 합칠 수 있는 환경을 만들어내며, 무슨 일이든 팀으로 돌파합니다. 도전과 안정성을 동시에 챙기며, 팀원들과 함께 목표를 이루는 과정에서 에너지를 얻는 진정한 협력형 플레이어입니다.'
          : mbtiType === "RPIA"
          ? '"혼자서도 멋진 현실주의 전략가"는 "내가 내 길을 만든다!"라는 독립적인 사고방식을 가진 전략가입니다. 혼자서도 모든 걸 척척 해내며, 현실적이고 실용적인 해결책을 찾아 실행합니다. 철저한 계획과 사전 준비는 이들의 필수 무기! 장기적인 성과를 위해 단기적인 리스크는 과감히 피하고, 효율적인 방법으로 결과를 만들어냅니다. 독립적인 환경에서 최고의 집중력을 발휘하며, "혼자 해도 이 정도면 됐지!"라고 자부할 수 있는 타입입니다.'
          : mbtiType === "ROIA"
          ? '"실용적 독고다이"는 "효율이 곧 진리"라는 마인드로 움직이는 실용주의자입니다. 목표가 보이면 "최소한의 리소스로 최대한의 성과를 내자"는 접근 방식으로 돌파구를 만들어냅니다. 혼자서도 필요한 모든 걸 해결하며, 주어진 조건에서 가장 현실적인 결과를 내는 데 초점을 맞춥니다. 필요하다면 리스크를 감수하지만, 이들은 "결과가 증명한다!"라는 자신감을 바탕으로 목표를 이루는 데 집중합니다.'
          : mbtiType === "SPTC"
          ? '"안전지향 창의 협력자"는 팀과 함께 창의적인 아이디어를 현실로 만드는 데 열정적입니다. 위험이 따르는 상황에서도 "안정적으로 가자!"를 외치며 철저한 계획을 세워 목표를 달성하죠. 팀원들과 협력하며, 각자의 아이디어를 한데 모아 멋진 결과를 만들어내는 게 이들의 특기입니다. "안정성과 창의성? 두 마리 토끼 다 잡을 수 있어!"라는 자신감으로 늘 새로운 길을 모색합니다.'
          : mbtiType === "SPIA"
          ? '"독립적 실용 전략가"는 "혼자서도 내가 다 한다"는 마인드로 체계적인 계획과 현실적인 접근 방식을 지향합니다. 안정적이고 실질적인 결과를 위해 최적의 전략을 세우고, 자원과 시간을 효율적으로 사용하죠. 리스크는 최소화, 성과는 극대화! 독립적인 환경에서 최고의 능력을 발휘하며, "실용적이고 전략적으로 가자"는 생각으로 목표를 차근차근 이뤄냅니다.'
          : mbtiType === "RPTA"
          ? '"모험적 팀 실용주의자"는 "팀이랑 같이라면 모험도 OK!"라는 마인드로 움직입니다. 실용적인 해결책과 창의적 접근을 통해 현실적인 문제를 해결하며, 필요할 경우 위험도 기꺼이 감수합니다. 팀원들과 협력하며 효율적인 방법을 찾아 목표를 달성하는 데 능숙하죠. 혁신과 안정성을 모두 잡는 이들의 모토는 "팀과 함께하면 뭐든 가능해!"입니다.'
          : mbtiType === "SOIC"
          ? '"안정적 독립 기회포착형"은 "위험을 줄이고 기회를 잡는다"는 철학으로 움직입니다. 모든 일을 꼼꼼히 계획하고, 철저히 분석한 후 실행에 나서며 안정적인 결과를 만들어냅니다. 장기적인 성장을 목표로 하며, 창의적이지만 현실적인 접근으로 성공 확률을 높입니다. "기회를 놓치지 않으면서도 안정적으로"라는 말이 딱 어울리는 타입이에요.'
          : mbtiType === "SOTA"
          ? '"실용적 팀 기회주의자"는 팀과 함께 현실적인 문제를 해결하며 기회를 놓치지 않는 유형입니다. "안정 속에서도 기회를 잡자"는 마인드로 협력과 실용성을 극대화하며, 팀원들과의 긴밀한 소통으로 효율적인 해결책을 만들어냅니다. 언제나 "팀으로 더 큰 성과를"이라는 생각으로 움직이는 효율성의 대가입니다.'
          : mbtiType === "RPIC"
          ? '"독립적 모험 계획가"는 "혼자서도 모험은 즐겁다!"라는 철학을 가진 창의적인 도전가입니다. 위험을 감수하면서도 철저히 계획을 세워 실행하며, 기존의 틀을 벗어난 혁신을 추구합니다. 창의적 아이디어에 대한 호기심과 열정이 넘치며, "이건 내가 해낸다!"는 자신감으로 새로운 길을 개척합니다.'
          : mbtiType === "SPTA"
          ? '"실용적 팀 혁신가"는 "같이 하면 더 멀리 간다"는 신념으로 팀원들과 협력해 실용적이면서도 창의적인 해결책을 만들어냅니다. 체계적인 계획과 현실적인 접근 방식을 통해 안정적이고 효율적인 성과를 만들어내며, 팀의 의견을 조율하고 함께 목표를 이루는 데 강점을 발휘합니다. 창의성과 현실성, 둘 다 잡는 완벽한 팀플레이어입니다.'
          : "",
    };

    setMarketingMbtiResult(mbtiResult);
  }, [mbtiType, setMarketingMbtiResult]);

  const getMbtiImage = (mbtiName) => {
    switch (mbtiName) {
      case "ROIC":
        return images.ImgMBTIROIC;
      case "ROIA":
        return images.ImgMBTIROIA;
      case "ROTC":
        return images.ImgMBTIROTC;
      case "ROTA":
        return images.ImgMBTIROTA;
      case "RPIA":
        return images.ImgMBTIRPIA;
      case "RPIC":
        return images.ImgMBTIRPIC;
      case "RPTA":
        return images.ImgMBTIRPTA;
      case "RPTC":
        return images.ImgMBTIRPTC;
      case "SOIA":
        return images.ImgMBTISOIA;
      case "SOIC":
        return images.ImgMBTISOIC;
      case "SOTA":
        return images.ImgMBTISOTA;
      case "SOTC":
        return images.ImgMBTISOTC;
      case "SPIA":
        return images.ImgMBTISPIA;
      case "SPIC":
        return images.ImgMBTISPIC;
      case "SPTA":
        return images.ImgMBTISPTA;
      case "SPTC":
        return images.ImgMBTISPTC;
      default:
        return "";
    }
  };


  const getEntrepreneursByMbti = (mbtiName) => {
    const entrepreneurs = {
      ROIC: [
        { name: "일론 머스크", company: "Tesla, SpaceX의 CEO" },
        { name: "스티브 잡스", company: "Apple 공동창립자" },
      ],
      ROTC: [
        { name: "래리 페이지", company: "Google 공동창립자" },
        { name: "벤 코헨", company: "Ben & Jerry's Icecream 공동창립자" },
      ],
      SOIA: [
        { name: "워렌 버핏", company: "Berkshire Hathaway CEO" },
        { name: "제프 베조스", company: "Amazon 창립자" },
      ],
      RPTC: [
        { name: "리드 헤이스팅스", company: "Netflix CEO" },
        { name: "사티아 나델라", company: "Microsoft CEO" },
      ],
      ROTA: [
        { name: "마윈", company: "Alibaba 창립자" },
        { name: "짐 월튼", company: "Walmart 공동창립자" },
      ],
      SPIC: [
        { name: "지미 웨일스", company: "위키피디아 창립자" },
        { name: "피터 틸", company: "PayPal 공동창립자" },
      ],
      SOTC: [
        { name: "브라이언 체스키", company: "Airbnb 공동창립자" },
        { name: "케빈 시스트롬", company: "Instagram 공동창립자" },
      ],
      RPIA: [
        { name: "마이클 블룸버그", company: "Bloomberg LP 창립자" },
        { name: "조지 소로스", company: "독자적인 투자 전략으로 성공한 투자가" },
      ],
      ROIA: [
        { name: "래리 엘리슨", company: "Oracle CEO" },
        { name: "마이클 델", company: "Dell 창립자" },
      ],
      SPTC: [
        { name: "순다 피차이", company: "Google CEO" },
        { name: "새티아 나델라", company: "Microsoft CEO" },
      ],
      SPIA: [
        { name: "찰스 슈왑", company: "Charles Schwab 창립자" },
        { name: "레이 달리오", company: "Bridgewater Associates 창립자" },
      ],
      RPTA: [
        { name: "리드 호프만", company: "LinkedIn 창립자" },
        { name: "잭 웰치", company: "GE 전 CEO" },
      ],
      SOIC: [
        { name: "존 보글", company: "Vanguard 창립자" },
        { name: "하워드 마크스", company: "Oaktree Capital 창립자" },
      ],
      SOTA: [
        { name: "빌 휴렛", company: "HP 공동창립자" },
        { name: "진 크란츠", company: "Intel 전 CEO" },
      ],
      RPIC: [
        { name: "닉 우드먼", company: "GoPro 창립자" },
        { name: "리처드 브랜슨", company: "Virgin Group 창립자" },
      ],
      SPTA: [
        { name: "메리 바라", company: "GM CEO" },
        { name: "인드라 누이", company: "전 PepsiCo CEO" },
      ],
    };
  
    return entrepreneurs[mbtiName] || [];
  };

  return (
    <ThemeProvider theme={theme}>
      <QuestionWrap>
        <Question
          // style={{ flex: questionFlex }}
          style={{
            flex: isMobile ? questionFlex : "1 1 50%",
          }}
          isDragging={isDragging}
          questionFlex={questionFlex}
        >
          {/* <div className="result-content"> */}
          <p>
            <span>
              <img src={getMbtiImage(mbtiType)} alt="" />
            </span>
            {marketingMbtiResult?.category} <br />
            {marketingMbtiResult?.name}
          </p>
          <div>
            <strong>{marketingMbtiResult?.summary}</strong>
            <p>{marketingMbtiResult?.description}</p>
            <strong>당신과 같은 유형의 창업가는?</strong>
              <EntrepreneurList className="entrepreneur-item">
                {getEntrepreneursByMbti(marketingMbtiResult.name).map(
                  (entrepreneur, index) => (
                    <EntrepreneurBox className="entrepreneur-box" key={index}>
                      {/* <Entrepreneurs/> */}
                      <strong>{entrepreneur.name}</strong>
                      <p>{entrepreneur.company}</p>
                      {/* <Entrepreneurs/> */}
                    </EntrepreneurBox>
                  )
                )}
              </EntrepreneurList>

            <CustomButton DbExLarge PrimaryLightest Fill onClick={() => navigate("/MarketingLanding")}>
              창업해보기
            </CustomButton>
          </div>
          {/* </div> */}
        </Question>

        {/* <Answer> */}
        <ResultWrap>
          <div className="info">
            <strong>{marketingMbtiResult.summary}</strong>
            <p>{marketingMbtiResult.description}</p>
            <strong>당신과 같은 유형의 창업가는?</strong>
              <EntrepreneurList className="entrepreneur-item">
                {getEntrepreneursByMbti(marketingMbtiResult.name).map(
                  (entrepreneur, index) => (
                    <EntrepreneurBox className="entrepreneur-box" key={index}>
                      {/* <Entrepreneurs/> */}
                      <strong>{entrepreneur.name}</strong>
                      <p>{entrepreneur.company}</p>
                      {/* <Entrepreneurs/> */}
                    </EntrepreneurBox>
                  )
                )}
              </EntrepreneurList>
            <Button ExLarge onClick={() => navigate("/MarketingLanding")}>
              창업해보기
            </Button>
          </div>
        </ResultWrap>
        {/* </Answer> */}
      </QuestionWrap>
    </ThemeProvider>
  );
};

const QuestionWrap = styled.section`
  position: relative;
  height: 100dvh;
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Question = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 64px;
  flex: 1 1 50%;
  background: #5547ff;
  transition: all 0.5s;

  > p {
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.4;
    color: ${palette.white};
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 12px;

    span {
      font-size: 1.25rem;
      font-weight: 300;
      line-height: 1.2;

      img {
        max-width: 100px;
      }
    }

    br {
      display: ${(props) =>
        props.questionFlex === "1 1 10%" ? "none" : "inline"};
    }
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 680px;
    text-align: left;
    padding: 32px;
    margin: 0 10%;
    border-radius: 20px;
    background: ${palette.white};

    strong {
      font-size: 1.13rem;
      font-weight: 500;
      color: #5547ff;
      line-height: 1.5;
    }

    p {
      font-size: 1.25rem;
      line-height: 1.6;
    }
    StartButton {
      display: none;
    }
  }


   .entrepreneur-item {
      display: flex;
      flex-direction: row;
      background: white;
      border-radius: 12px;
      white-space: nowrap;
      justify-content: flex-start;
      padding: 0px;
      margin-left: 0px;
      margin-bottom: 10px;
    }

    .entrepreneur-box {
      border-radius: 12px;
      flex:0 0 55%;
      margin-left: 0px;
      margin-right:0px;
      // text-align: center;

      strong{
      font-weight: 600;
      color: black;
      font-size: 24px;
  
      }
      

    }

    
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex: 1 1 100%;
    // justify-content:end;
    // padding-bottom:76px;
    justify-content: ${(props) =>
      props.questionFlex === "1 1 10%" ? "center" : "end"};
    padding-bottom: ${(props) =>
      props.questionFlex === "1 1 10%" ? "0" : "76px"};

    > p {
      font-size: 1.25rem;

      span {
        // display: ${(props) => (props.isSmallFlex ? "none" : "inline-block")};
        display: ${(props) =>
          props.questionFlex === "1 1 10%" ? "none" : "block"};

        img {
          max-width: 100%;
        }
      }
    }

    div {
      display: none;
    }

    ${(props) =>
      props.isDragging &&
      `
      ${Question} {
        flex: 1 1 10%;
      }
    `}
  }
`;

const StartButton = styled.button`
  padding: 16px 48px;
  background: ${palette.white};
  color: #5547ff;
  border: none;
  border-radius: 50px;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 12px 32px;
    font-size: 1rem;
  }
`;

const CustomButton = styled(Button)`
  color: #5547ff;
  background: rgba(85, 71, 255, .05);
`;

export default PageMarketingNoItemsShare;

const ResultWrap = styled.div`
  .info {
    display: none;
    flex-direction: column;
    gap: 16px;
    text-align: left;
    padding-bottom: 32px;
    margin-bottom: 10px;
    border-bottom: 4px solid ${palette.chatGray};

    strong {
      font-size: 1.13rem;
      font-weight: 500;
      line-height: 1.5;
      color: #5547ff;
    }

    p {
      font-weight: 300;
      line-height: 1.6;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 44px 20px;
    margin: 0 auto;

    .info {
      display: flex;
      flex-direction: column;
    }
  }
`;



const EntrepreneurList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

`;

const EntrepreneurBox = styled.div`
  border-radius: 12px; 
  padding: 16px; 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Entrepreneurs = styled.div`


 h3{
    font-weight: 600;
    color: black;
    font-size: 24px;
  }

`;

