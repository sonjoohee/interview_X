import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../assets/styles/ButtonStyle";
import { palette } from "../assets/styles/Palette";
import Landingimages from "../assets/styles/Landingimages";
import images from "../assets/styles/Images";
import { media } from "../assets/styles/Breakpoints";
import { EDUCATION_STATE } from "./AtomStates";
import { useAtom } from "jotai";

const PageServiceLandingAiArtTech = () => {
  const navigate = useNavigate();
  const [educationState, setEducationState] = useAtom(EDUCATION_STATE);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [buttonColor, setButtonColor] = useState(palette.white);
  const totalSlides = 3;
  const [openFaq, setOpenFaq] = useState(null);
  const [activeSection, setActiveSection] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0); // 새로운 state 추가
  const contentRef = useRef(null);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 5000);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollPosition(scrollPosition); // 스크롤 위치 업데이트
      const isMobile = window.innerWidth <= 768; // 모바일 기준 너비 설정

      if (scrollPosition < 600) {
        setButtonColor(palette.white);
      } else if (scrollPosition < 1800) {
        setButtonColor(palette.black);
      } else {
        setButtonColor(palette.white);
      }

      const mainVisual = document.querySelector("#mainVisual");
      const section01 = document.querySelector("#section01");
      const section02 = document.querySelector("#section02");
      const section03 = document.querySelector("#section03");
      const section04 = document.querySelector("#section04");
      const section05 = document.querySelector("#section05");

      const sections = [
        mainVisual,
        section01,
        section02,
        section03,
        section04,
        section05,
      ];

      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            setActiveSection(index + 1);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    // 터치 이벤트인 경우와 마우스 이벤트인 경우를 구분
    const pageX = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
    const x = pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 2;
    const slideMove = Math.round(walk / e.currentTarget.offsetWidth);
    const newSlide = Math.max(
      0,
      Math.min(scrollLeft - slideMove, totalSlides - 1)
    );

    setCurrentSlide(newSlide);
  };

  // 자동 스크롤을 위한 useEffect 추가
  useEffect(() => {
    const scrollContent = () => {
      if (!contentRef.current) return;

      const items = contentRef.current.children;
      if (!items.length) return;

      setCurrentContentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % items.length;
        const targetItem = items[nextIndex];

        contentRef.current.scrollTo({
          left: targetItem.offsetLeft - 20, // 왼쪽 여백 20px 고려
          behavior: "smooth",
        });

        return nextIndex;
      });
    };

    const timer = setInterval(scrollContent, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Header scrollPosition={scrollPosition}>
        <div>
          <h1 className="logo">
            <images.Logo2 color="black" />
            <span> edu</span>
          </h1>
          <Nav></Nav>
          <div className="gnb">
            <Link
              to="https://interviewx-edu.tistory.com/"
              style={{ marginTop: "3px" }}
            >
              블로그
            </Link>
            <Button
              style={{
                background: "#64007C",
              }}
              Large
              Primary
              Fill
              onClick={() => {
                setEducationState(true);
                navigate("/Project");
              }}
              className="web"
            >
              바로 시작하기
            </Button>
            <Button
              Large
              Primary
              Fill
              onClick={() =>
                (window.location.href = "https://interviewx-edu.tistory.com/")
              }
              className="mobile"
            >
              블로그
            </Button>
          </div>
        </div>
      </Header>

      <MainVisual id="mainVisual">
        <div className="background-image">
          <img
            style={{
              width: "800px",
              marginTop: "120px",
              marginBottom: "-100px",
            }}
            src={Landingimages.Kyunghee}
            alt="Kyunghee"
          />
        </div>
        <div className="text">
          <h2>
            예술적 영감을 사업으로
            <br />
            AI 아트테크 아카데미
          </h2>
          <p>{""}</p>
          <Button
            // type="button"
            style={{
              paddingTop: "10px",
              background: "#64007C",
            }}
            onClick={() => {
              setEducationState(true);
              navigate("/Project");
            }}
          >
            시작하기
          </Button>
        </div>

        <div className="img">
          <img src={Landingimages.ImgLanding} alt="" />
          <span>Unique User</span>
          <span>Macro Segment</span>
          <span>Key Stakeholder</span>
        </div>
      </MainVisual>

      <Section01 id="section01">
        <div className="title">
          <span style={{ color: "#0E4194" }}>어떻게 활용할까?</span>
          <h3>InterviewX 이렇게 활용하세요!</h3>
          <p>
            다양한 기능과 직관적인 사용법으로,
            <br />
            원하는 분석을 빠르고 쉽게 수행할 수 있어요.
          </p>
        </div>

        <div className="content">
          <div className="item01">
            <img src={Landingimages.ImgLanding01} alt="" />
            <div>
              <strong>
                비즈니스 강점과 리스크
                <br />
                AI가 빠르고 정확하게 분석!
              </strong>
              <p>
                간단한 정보 입력과 파일 업로드만으로
                <br />
                핵심 내용과 숨은 의미까지 분석해 한눈에 정리{" "}
              </p>
            </div>
          </div>

          <div className="item02">
            <img src={Landingimages.ImgLanding02} alt="" />
            <div>
              <strong>
                AI가 고객이 되어
                <br />
                내가 궁금했던 질문에 답변까지
              </strong>
              <p>
                비즈니스에 꼭 필요한 고객 페르소나를 생성하고
                <br />
                실제 고객처럼 인터뷰하여 숨은 니즈와 인사이트를 파악{" "}
              </p>
            </div>
          </div>

          <div className="item03">
            <img src={Landingimages.ImgLanding03} alt="" />
            <div>
              <strong>
                인터뷰 데이터는
                <br />
                AI가 분석하고 정리해 바로 활용
              </strong>
              <p>
                AI가 인터뷰 내용을 정리하고
                <br />
                핵심 인사이트를 리포트로 자동 변환{" "}
              </p>
            </div>
          </div>
        </div>
      </Section01>

      <Section02 id="section02">
        <div>
          <div className="title" style={{ marginTop: "35px" }}>
            <span style={{ color: "#0E4194" }}>고객 서비스</span>
            <h3>
              혹시,
              <br />
              내가 놓친 고객은
              <br />
              없을까?
            </h3>
            <Button
              // type="button"
              style={{
                paddingTop: "6.5px",
                background: "#64007C",
              }}
              onClick={() => {
                setEducationState(true);
                navigate("/Project");
              }}
            >
              나의 X 만나기
            </Button>
          </div>

          <div className="content">
            <div className="item01">
              <div>
                <strong>Macro User</strong>
                <p>일반적으로 볼 수 있는 사용자 집단이에요</p>
              </div>

              <img src={Landingimages.ImgLanding04} alt="" />
            </div>

            <div className="item02">
              <div>
                <strong>Unique User</strong>
                <p>차별점을 갖고 있는 사용자 집단이에요</p>
              </div>

              <img src={Landingimages.ImgLanding05} alt="" />
            </div>

            <div className="item03">
              <div>
                <strong>Key Stakeholder</strong>
                <p>제품/서비스에 중요한 핵심 이해관계자에요</p>
              </div>

              <img src={Landingimages.ImgLanding06} alt="" />
            </div>
          </div>
        </div>
      </Section02>

      <Section03 id="section03">
        <div className="title">
          <span style={{ color: "#0E4194" }}>누구나 편하게</span>
          <h3>
            다양한 툴로
            <br />
            업무도 더 스마트하게
          </h3>
        </div>

        <div className="content">
          <div className="item01">
            <div>
              <strong>이미지 감성 분석기</strong>
              <p>
                이미지 속 감점 요소를 분석해
                <br />
                시각적 데이터를 해석하고 의미 도출{" "}
              </p>
            </div>
          </div>

          <div className="item02">
            <div>
              <strong>AI 브레인스토밍 툴</strong>
              <p>
                AI가 타겟 고객의 니즈를 바탕으로
                <br />
                창의적인 아이디어를 발산하여 기획 지원{" "}
              </p>
            </div>
          </div>

          <div className="item03">
            <div>
              <strong>고객 가치 우선순위 분석기</strong>
              <p>
                AI가 고객의 관심 요소를 분석하고
                <br />
                가장 중요한 가치를 우선순위로 정리
              </p>
            </div>
          </div>

          <div className="item04">
            <div>
              <strong>BM 모델 시뮬레이션</strong>
              <p>
                AI가 비즈니스 모델을 분석하고
                <br />
                시장에 최적화된 모델 제안{" "}
              </p>
            </div>
          </div>
        </div>
      </Section03>

      <Section04 id="section04">
        <div className="title">
          <span style={{ color: "#0E4194" }}>이런 고민이 있다면?</span>
          <h3>InterviewX가 필요한 순간</h3>
        </div>

        <div className="content" ref={contentRef}>
          <div className="item01">
            <img src={Landingimages.ImgLanding11} alt="" />
            <div>
              <strong>(마케팅)타겟 고객이 명확하지 않나요?</strong>
              <p>
                AI 분석을 통해 반응이 좋은 고객을
                <br />
                선별하고, 광고 성과를 극대화하세요.
              </p>
            </div>
          </div>

          <div className="item02">
            <img src={Landingimages.ImgLanding12} alt="" />
            <div>
              <strong>(제품 기획) 고객 요구 불확실, 어떻게 할까요?</strong>
              <p>
                실제 고객과 인터뷰하여 보이지 않는 니즈를
                <br />
                발견하고, 성공 확률이 높은 제품을 기획하세요.
              </p>
            </div>
          </div>

          <div className="item03">
            <img src={Landingimages.ImgLanding13} alt="" />
            <div>
              <strong>(스타트업 창업)우리 BM이 정말 최적일까요?</strong>
              <p>
                시장 데이터를 분석하여 비즈니스 모델을
                <br />
                정교화하고 투자 유치 가능성을 높이세요.
              </p>
            </div>
          </div>
        </div>
      </Section04>

      <Section05 id="section05">
        <FaqWrap>
          <div>
            <h3>자주 묻는 질문</h3>

            <FaqList>
              <li>
                <button
                  onClick={() => toggleFaq(0)}
                  className={`${openFaq === 0 ? "open" : ""}`}
                >
                  <p className="web">
                    InterviewX.ai는 기존 시장조사 방식과 어떻게 다른가요?
                  </p>
                  <p className="mobile">
                    기존 시장조사 방식과 어떻게 다른가요?
                  </p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 0 ? "open" : ""}`}>
                  <p className="gray">
                    기존 시장 조사는 패널 모집, 설문 설계, 데이터 분석 등에 많은
                    시간과 비용이 소요됩니다.
                    <br />
                    InterviewX.ai는 AI 페르소나와 대화형 인터뷰를 통해 즉각적인
                    인사이트 도출이 가능하며, 기존 조사 방식보다 더 정밀하고
                    신뢰도 높은 피드백을 자동으로 분석합니다.
                  </p>
                  <p>
                    ✔ 빠른 실행 – 몇 분 만에 AI 페르소나와 인터뷰 진행
                    <br />
                    ✔ 심층 분석 – 단순 응답이 아닌, 맥락과 감정을 반영한 피드백
                    제공
                    <br />✔ 자동화된 인사이트 – 인터뷰 후 AI가 주요 인사이트를
                    요약하여 제공
                  </p>
                </div>
              </li>

              <li>
                <button
                  onClick={() => toggleFaq(2)}
                  className={`${openFaq === 2 ? "open" : ""}`}
                >
                  <p>AI 페르소나는 어떻게 신뢰성을 확보하나요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 2 ? "open" : ""}`}>
                  <p className="gray">
                    AI 페르소나는 단순한 챗봇이 아니라, 공공 데이터, 학술 연구,
                    시장 조사 데이터를 기반으로 학습된 AI 모델입니다.
                  </p>
                  <p>
                    ✔ 200개 이상의 실제 프로파일 반영 – 연령, 직업, 관심사, 소비
                    패턴 등<br />
                    ✔ 실제 사용자 인터뷰 데이터 학습 – 현실적인 반응을
                    제공하도록 설계
                    <br />
                    ✔ 자동 데이터 검증 및 개선 – AI가 지속적으로 학습하며 정확도
                    향상
                    <br />
                    따라서, AI 페르소나는 실제 소비자와 유사한 피드백을
                    제공하며, 신뢰할 수 있는 조사 결과를 생성합니다.
                  </p>
                </div>
              </li>
              <li>
                <button
                  onClick={() => toggleFaq(3)}
                  className={`${openFaq === 3 ? "open" : ""}`}
                >
                  <p>InterviewX.ai를 활용하면 어떤 조사가 가능한가요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 3 ? "open" : ""}`}>
                  <p>
                    InterviewX.ai는 다양한 비즈니스 요구에 맞춰 유연한 인터뷰
                    방식을 제공합니다.
                    <br />
                    📍 1:1 심층 인터뷰 – 개별 AI 페르소나와 심층적인 대화 진행
                    <br />
                    📍 1:N 인터뷰 – 최대 5명의 AI 페르소나와 동시 인터뷰 가능
                    <br />
                    📍 퀵서베이 – 50명 이상의 AI 페르소나를 대상으로 대량 의견
                    조사
                  </p>
                  <p className="gray">
                    이를 통해 제품 기획, 마케팅 전략 수립, 소비자 인사이트 분석
                    등의 다양한 리서치를 효율적으로 수행할 수 있습니다.
                  </p>
                </div>
              </li>

              <li>
                <button
                  onClick={() => toggleFaq(5)}
                  className={`${openFaq === 5 ? "open" : ""}`}
                >
                  <p>추가 문의가 필요한 경우 어떻게 하나요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 5 ? "open" : ""}`}>
                  <p>
                    InterviewX.ai에 대한 더 자세한 정보가 필요하시거나, 맞춤형
                    사용 방법을 상담받고 싶다면, 아래의 이메일을 통해 문의해
                    주세요.
                    <br />
                    📧 이메일 문의 – info@userconnect.kr
                  </p>
                </div>
              </li>
            </FaqList>
          </div>
        </FaqWrap>
      </Section05>

      <Footer>
        <div>
          <div className="address">
            <images.Logo2 width="220" height="32" color={palette.black} />
            <strong>(주)유저커넥트</strong>

            <div>
              <p>
                사업자 등록번호: 678 - 81 - 01795
                <span>대표자: 박영수</span>
              </p>
              <p>
                통신판매업신고: 제 2025 - 경기안산 - 0424호
                <span>대표전화: 031 - 216 - 5930</span>
              </p>
              <p>
                고객센터 운영시간: 10:00 ~ 18:00
                <span>메일: info@userconnect.kr</span>
              </p>
              <p>
                주소: 경기도 안산시 상록구 해양3로 15, 1512호 ~ 1515호 (그랑시티
                시그니처타워)
              </p>
            </div>
          </div>

          <div className="copyright">
            2025 Userconnect Inc. All rights reserved.
          </div>
        </div>
      </Footer>

      {/* {isPopupOpen && (
        <Popup>
          <div>
            <span className="close" onClick={() => setIsPopupOpen(false)} />
            <img src={images.Popup01} alt="" />
          </div>
        </Popup>
      )} */}
    </>
  );
};

export default PageServiceLandingAiArtTech;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  padding: 15px 20px;
  border-bottom: 1px solid #e0e4eb;
  background: #fff;
  transition: background 0.3s ease;

  ${media.mobile} {
    top: 0;
    left: 0;
    transform: none;
    width: 100%;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
  }

  .logo {
    display: flex;
    align-items: flex-end;
    gap: 4px;
    font-size: 0.88rem;
    font-weight: 400;
    line-height: 1.25;
    letter-spacing: -0.42px;
    color: ${palette.gray800};
  }

  .logo svg {
    ${media.mobile} {
      width: 155px;
      height: 24px;
    }
  }

  .gnb {
    display: flex;
    align-items: center;
    gap: 20px;

    a {
      position: relative;
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.3;
      letter-spacing: -0.48px;
      transition: color 0.3s ease;

      ${media.mobile} {
        display: none;
      }
    }

    .web {
      display: block;

      ${media.mobile} {
        display: none;
      }
    }

    .mobile {
      display: none;

      ${media.mobile} {
        display: block;
      }
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 44px;
`;

const MainVisual = styled.div`
  position: relative;
  width: 100%;
  padding-top: 68px;
  overflow: hidden;

  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 145px;

    ${media.mobile} {
      margin-top: 110px;
    }

    h2 {
      position: relative;
      font-size: 3.13rem;
      font-weight: 700;
      line-height: 1.3;
      letter-spacing: -0.5px;

      ${media.mobile} {
        font-size: 2rem;
      }

      span {
        // position: absolute;
        // left: 220px;
        // top: 0;
        // width: 66.657px;
        // height: 71.058px;
        // display: inline-block;
        display: inline-flex;
        align-items: center;
        // background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='78' height='86' viewBox='0 0 78 86' fill='none'%3E%3CforeignObject x='14.882' y='-4.0317' width='30.113' height='38.6553'%3E%3Cdiv xmlns='http://www.w3.org/1999/xhtml' style='backdrop-filter:blur(2.66px);clip-path:url(%23bgblur_0_797_4856_clip_path);height:100%25;width:100%25'%3E%3C/div%3E%3C/foreignObject%3E%3Cg filter='url(%23filter0_i_797_4856)' data-figma-bg-blur-radius='5.32894'%3E%3Cpath d='M39.6656 25.5483L38.0444 26.6426L35.9176 29.2947L20.2109 1.29722L25.0962 1.76355C26.5179 1.89925 27.7772 2.73779 28.4506 3.99718L33.8073 14.0151L39.6656 25.5483Z' fill='url(%23paint0_linear_797_4856)' fill-opacity='0.1'/%3E%3C/g%3E%3CforeignObject x='14.882' y='-4.0317' width='30.113' height='38.6553'%3E%3Cdiv xmlns='http://www.w3.org/1999/xhtml' style='backdrop-filter:blur(2.66px);clip-path:url(%23bgblur_1_797_4856_clip_path);height:100%25;width:100%25'%3E%3C/div%3E%3C/foreignObject%3E%3Cg filter='url(%23filter1_i_797_4856)' data-figma-bg-blur-radius='5.32894'%3E%3Cpath d='M39.6656 25.5483L38.0444 26.6426L35.9176 29.2947L20.2109 1.29722L25.0962 1.76355C26.5179 1.89925 27.7772 2.73779 28.4506 3.99718L33.8073 14.0151L39.6656 25.5483Z' fill='url(%23paint1_linear_797_4856)' fill-opacity='0.1'/%3E%3C/g%3E%3CforeignObject x='7.34098' y='43.6205' width='33.3923' height='34.06'%3E%3Cdiv xmlns='http://www.w3.org/1999/xhtml' style='backdrop-filter:blur(2.66px);clip-path:url(%23bgblur_2_797_4856_clip_path);height:100%25;width:100%25'%3E%3C/div%3E%3C/foreignObject%3E%3Cg filter='url(%23filter2_i_797_4856)' data-figma-bg-blur-radius='5.32894'%3E%3Cpath d='M35.4048 53.3372L34.0199 51.9559L32.4332 48.9494L12.6695 71.8659L17.5549 72.3322C18.9766 72.4679 20.3717 71.8828 21.2712 70.7735L28.4265 61.9499L35.4048 53.3372Z' fill='url(%23paint2_linear_797_4856)' fill-opacity='0.2'/%3E%3C/g%3E%3CforeignObject x='7.34098' y='43.6205' width='33.3923' height='34.06'%3E%3Cdiv xmlns='http://www.w3.org/1999/xhtml' style='backdrop-filter:blur(2.66px);clip-path:url(%23bgblur_3_797_4856_clip_path);height:100%25;width:100%25'%3E%3C/div%3E%3C/foreignObject%3E%3Cg filter='url(%23filter3_i_797_4856)' data-figma-bg-blur-radius='5.32894'%3E%3Cpath d='M35.4048 53.3372L34.0199 51.9559L32.4332 48.9494L12.6695 71.8659L17.5549 72.3322C18.9766 72.4679 20.3717 71.8828 21.2712 70.7735L28.4265 61.9499L35.4048 53.3372Z' fill='url(%23paint3_linear_797_4856)' fill-opacity='0.2'/%3E%3C/g%3E%3CforeignObject x='36.4504' y='34.5153' width='32.9118' height='47.347'%3E%3Cdiv xmlns='http://www.w3.org/1999/xhtml' style='backdrop-filter:blur(2.66px);clip-path:url(%23bgblur_4_797_4856_clip_path);height:100%25;width:100%25'%3E%3C/div%3E%3C/foreignObject%3E%3Cg filter='url(%23filter4_i_797_4856)' data-figma-bg-blur-radius='5.32894'%3E%3Cpath d='M63.7897 73.1987C64.593 74.8207 63.3027 76.6943 61.5009 76.5223L56.6127 76.0557L41.7792 39.8442L47.5441 40.3945L63.7897 73.1987Z' fill='url(%23paint4_linear_797_4856)' fill-opacity='0.2'/%3E%3C/g%3E%3CforeignObject x='36.4504' y='34.5153' width='32.9118' height='47.347'%3E%3Cdiv xmlns='http://www.w3.org/1999/xhtml' style='backdrop-filter:blur(2.66px);clip-path:url(%23bgblur_5_797_4856_clip_path);height:100%25;width:100%25'%3E%3C/div%3E%3C/foreignObject%3E%3Cg filter='url(%23filter5_i_797_4856)' data-figma-bg-blur-radius='5.32894'%3E%3Cpath d='M63.7897 73.1987C64.5929 74.8207 63.3027 76.6943 61.5009 76.5223L56.6127 76.0557L41.7792 39.8442L47.5437 40.3944L63.7897 73.1987Z' fill='url(%23paint5_linear_797_4856)' fill-opacity='0.2'/%3E%3C/g%3E%3CforeignObject x='38.2804' y='-0.0100932' width='38.904' height='45.7306'%3E%3Cdiv xmlns='http://www.w3.org/1999/xhtml' style='backdrop-filter:blur(2.66px);clip-path:url(%23bgblur_6_797_4856_clip_path);height:100%25;width:100%25'%3E%3C/div%3E%3C/foreignObject%3E%3Cg filter='url(%23filter6_i_797_4856)' data-figma-bg-blur-radius='5.32894'%3E%3Cpath d='M71.3684 9.65002C72.4843 8.21205 71.5754 6.10851 69.7635 5.93555L63.3024 5.31881L68.0787 8.46099L57.8511 22.4002L43.609 40.0189L47.5126 40.3916L71.3684 9.65002Z' fill='url(%23paint6_linear_797_4856)' fill-opacity='0.5'/%3E%3C/g%3E%3CforeignObject x='38.5402' y='-0.0100932' width='38.6442' height='45.7306'%3E%3Cdiv xmlns='http://www.w3.org/1999/xhtml' style='backdrop-filter:blur(2.66px);clip-path:url(%23bgblur_7_797_4856_clip_path);height:100%25;width:100%25'%3E%3C/div%3E%3C/foreignObject%3E%3Cg filter='url(%23filter7_i_797_4856)' data-figma-bg-blur-radius='5.32894'%3E%3Cpath d='M71.3684 9.65002C72.4843 8.21205 71.5754 6.10851 69.7635 5.93555L63.3024 5.31881L67.5056 7.02912C68.0746 7.26067 68.3209 7.93175 68.0366 8.47637L66.4851 11.449L43.8683 40.0437L47.5126 40.3916L71.3684 9.65002Z' fill='url(%23paint7_linear_797_4856)' fill-opacity='0.5'/%3E%3C/g%3E%3CforeignObject x='-1.08778' y='-3.3716' width='73.4724' height='83.2023'%3E%3Cdiv xmlns='http://www.w3.org/1999/xhtml' style='backdrop-filter:blur(1.78px);clip-path:url(%23bgblur_8_797_4856_clip_path);height:100%25;width:100%25'%3E%3C/div%3E%3C/foreignObject%3E%3Cpath data-figma-bg-blur-radius='3.55263' d='M67.0281 5.67404C67.5987 5.7285 68.0549 5.97597 68.3966 6.41646C68.732 6.92431 68.8739 7.44768 68.8225 7.98658C68.8032 8.18867 68.7522 8.38774 68.6695 8.58377C68.5869 8.77981 68.5042 8.97585 68.4215 9.17188L44.2814 39.9043L60.8801 73.0979C61.0317 73.5202 61.0882 73.9334 61.0496 74.3376C60.9982 74.8765 60.763 75.3299 60.3441 75.6978C59.9187 76.133 59.4207 76.3234 58.8502 76.2689L47.154 75.1525C46.3299 75.0738 45.7185 74.7775 45.3197 74.2636C44.8576 73.7437 44.519 73.2695 44.304 72.8411L33.4812 51.517L18.7246 70.3995C18.4324 70.7794 18.0103 71.181 17.4581 71.6041C16.906 72.0273 16.2178 72.1995 15.3937 72.1208L4.26809 71.0588C3.76093 71.0104 3.33969 70.7323 3.00433 70.2244C2.59916 69.7779 2.4223 69.2852 2.47374 68.7463C2.51875 68.2747 2.68409 67.8827 2.96981 67.5701L25.5389 38.2172L7.56338 3.3627C7.45589 3.14851 7.41181 2.94038 7.4311 2.73829C7.387 2.53015 7.37457 2.32504 7.39386 2.12294C7.4453 1.58404 7.68372 1.09698 8.1091 0.661742C8.52804 0.293873 9.02277 0.137164 9.59331 0.191625L21.6698 1.34438C22.494 1.42305 23.1371 1.72235 23.5992 2.24231C23.998 2.7562 24.3081 3.19366 24.5295 3.55468L36.3873 26.0992L52.2009 6.19604C52.4232 5.87738 52.8105 5.50648 53.3626 5.08336C53.8514 4.65417 54.5395 4.48194 55.4271 4.56666L67.0281 5.67404Z' fill='url(%23paint8_linear_797_4856)' fill-opacity='0.2'/%3E%3CforeignObject x='-1.08778' y='-3.3716' width='73.4724' height='83.2023'%3E%3Cdiv xmlns='http://www.w3.org/1999/xhtml' style='backdrop-filter:blur(1.78px);clip-path:url(%23bgblur_9_797_4856_clip_path);height:100%25;width:100%25'%3E%3C/div%3E%3C/foreignObject%3E%3Cg filter='url(%23filter9_i_797_4856)' data-figma-bg-blur-radius='3.55263'%3E%3Cpath d='M67.0281 5.67404C67.5987 5.7285 68.0549 5.97597 68.3966 6.41646C68.732 6.92431 68.8739 7.44768 68.8225 7.98658C68.8032 8.18867 68.7522 8.38774 68.6695 8.58377C68.5869 8.77981 68.5042 8.97585 68.4215 9.17189L44.2814 39.9043L60.8801 73.0979C61.0317 73.5202 61.0882 73.9334 61.0496 74.3376C60.9982 74.8765 60.763 75.3299 60.3441 75.6978C59.9187 76.133 59.4207 76.3234 58.8502 76.2689L47.154 75.1525C46.3299 75.0738 45.7185 74.7775 45.3197 74.2636C44.8576 73.7437 44.519 73.2695 44.304 72.8411L33.4812 51.517L18.7246 70.3995C18.4324 70.7794 18.0103 71.181 17.4581 71.6041C16.906 72.0273 16.2178 72.1995 15.3937 72.1208L4.26809 71.0588C3.76093 71.0104 3.33969 70.7323 3.00433 70.2244C2.59916 69.7779 2.4223 69.2852 2.47374 68.7463C2.51875 68.2747 2.68409 67.8827 2.96981 67.5701L25.5389 38.2172L7.56338 3.36271C7.45589 3.14851 7.41181 2.94038 7.4311 2.73829C7.387 2.53015 7.37457 2.32504 7.39386 2.12294C7.4453 1.58404 7.68372 1.09698 8.1091 0.661742C8.52804 0.293873 9.02276 0.137163 9.59331 0.191625L21.6698 1.34438C22.494 1.42305 23.1371 1.72236 23.5992 2.24231C23.998 2.75621 24.3081 3.19366 24.5295 3.55468L36.3873 26.0992L52.2009 6.19604C52.4232 5.87738 52.8105 5.50649 53.3626 5.08336C53.8514 4.65418 54.5395 4.48194 55.4271 4.56666L67.0281 5.67404Z' fill='url(%23paint9_linear_797_4856)' fill-opacity='0.5'/%3E%3C/g%3E%3CforeignObject x='1.15262' y='-1.12228' width='76.1959' height='86.6363'%3E%3Cdiv xmlns='http://www.w3.org/1999/xhtml' style='backdrop-filter:blur(0.65px);clip-path:url(%23bgblur_10_797_4856_clip_path);height:100%25;width:100%25'%3E%3C/div%3E%3C/foreignObject%3E%3Cg filter='url(%23filter10_di_797_4856)' data-figma-bg-blur-radius='1.30246'%3E%3Cpath d='M67.0184 5.67318C67.5889 5.72764 68.0451 5.97512 68.3869 6.4156C68.7222 6.92345 68.8642 7.44682 68.8127 7.98573C68.7934 8.18782 68.7425 8.38689 68.6598 8.58292C68.5771 8.77896 68.4944 8.97499 68.4117 9.17103L44.2716 39.9034L60.8703 73.097C61.0219 73.5193 61.0785 73.9326 61.0399 74.3368C60.9884 74.8757 60.7532 75.3291 60.3343 75.6969C59.9089 76.1322 59.411 76.3225 58.8404 76.2681L47.1442 75.1516C46.3201 75.073 45.7087 74.7767 45.31 74.2628C44.8478 73.7428 44.5092 73.2687 44.2942 72.8403L33.4715 51.5162L18.7148 70.3986C18.4227 70.7786 18.0005 71.1801 17.4484 71.6033C16.8962 72.0264 16.208 72.1986 15.3839 72.12L4.25832 71.058C3.75117 71.0096 3.32992 70.7314 2.99457 70.2236C2.58939 69.7771 2.41254 69.2843 2.46398 68.7454C2.50899 68.2739 2.67432 67.8818 2.96005 67.5692L25.5291 38.2163L7.55362 3.36185C7.44612 3.14766 7.40205 2.93953 7.42134 2.73744C7.37724 2.5293 7.36481 2.32418 7.3841 2.12209C7.43554 1.58319 7.67396 1.09612 8.09933 0.660888C8.51827 0.293019 9.013 0.136309 9.58354 0.19077L21.6601 1.34353C22.4842 1.42219 23.1273 1.7215 23.5895 2.24145C23.9882 2.75535 24.2983 3.19281 24.5197 3.55383L36.3775 26.0984L52.1911 6.19519C52.4135 5.87652 52.8007 5.50564 53.3529 5.0825C53.8416 4.65332 54.5298 4.48109 55.4173 4.56581L67.0184 5.67318Z' fill='url(%23paint10_linear_797_4856)' fill-opacity='0.2' shape-rendering='crispEdges'/%3E%3C/g%3E%3Cg filter='url(%23filter11_i_797_4856)'%3E%3Cpath d='M67.0184 5.67318C67.5889 5.72764 68.0451 5.97512 68.3869 6.4156C68.7222 6.92345 68.8642 7.44682 68.8127 7.98573C68.7934 8.18782 68.7425 8.38689 68.6598 8.58292C68.5771 8.77896 68.4944 8.97499 68.4117 9.17103L44.2716 39.9034L60.8703 73.097C61.0219 73.5193 61.0785 73.9326 61.0399 74.3368C60.9884 74.8757 60.7532 75.3291 60.3343 75.6969C59.9089 76.1322 59.411 76.3225 58.8404 76.2681L47.1442 75.1516C46.3201 75.073 45.7087 74.7767 45.31 74.2628C44.8478 73.7428 44.5092 73.2687 44.2942 72.8403L33.4715 51.5162L18.7148 70.3986C18.4227 70.7786 18.0005 71.1801 17.4484 71.6033C16.8962 72.0264 16.208 72.1986 15.3839 72.12L4.25832 71.058C3.75117 71.0096 3.32992 70.7314 2.99457 70.2236C2.58939 69.7771 2.41254 69.2843 2.46398 68.7454C2.50899 68.2739 2.67432 67.8818 2.96005 67.5692L25.5291 38.2163L7.55361 3.36185C7.44612 3.14766 7.40205 2.93953 7.42134 2.73744C7.37723 2.5293 7.36481 2.32418 7.3841 2.12209C7.43554 1.58319 7.67396 1.09612 8.09933 0.660888C8.51827 0.293018 9.013 0.136309 9.58354 0.19077L21.6601 1.34353C22.4842 1.42219 23.1273 1.72151 23.5895 2.24145C23.9882 2.75535 24.2983 3.1928 24.5197 3.55383L36.3775 26.0984L52.1911 6.19519C52.4135 5.87652 52.8007 5.50564 53.3529 5.0825C53.8416 4.65333 54.5298 4.48109 55.4173 4.56581L67.0184 5.67318Z' fill='%235470FF' fill-opacity='0.3'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_i_797_4856' x='14.882' y='-4.0317' width='30.113' height='38.6553' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation='0.177631'/%3E%3CfeComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/%3E%3CfeBlend mode='normal' in2='shape' result='effect1_innerShadow_797_4856'/%3E%3C/filter%3E%3CclipPath id='bgblur_0_797_4856_clip_path' transform='translate(-14.882 4.0317)'%3E%3Cpath d='M39.6656 25.5483L38.0444 26.6426L35.9176 29.2947L20.2109 1.29722L25.0962 1.76355C26.5179 1.89925 27.7772 2.73779 28.4506 3.99718L33.8073 14.0151L39.6656 25.5483Z'/%3E%3C/clipPath%3E%3Cfilter id='filter1_i_797_4856' x='14.882' y='-4.0317' width='30.113' height='38.6553' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation='0.177631'/%3E%3CfeComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/%3E%3CfeBlend mode='normal' in2='shape' result='effect1_innerShadow_797_4856'/%3E%3C/filter%3E%3CclipPath id='bgblur_1_797_4856_clip_path' transform='translate(-14.882 4.0317)'%3E%3Cpath d='M39.6656 25.5483L38.0444 26.6426L35.9176 29.2947L20.2109 1.29722L25.0962 1.76355C26.5179 1.89925 27.7772 2.73779 28.4506 3.99718L33.8073 14.0151L39.6656 25.5483Z'/%3E%3C/clipPath%3E%3Cfilter id='filter2_i_797_4856' x='7.34098' y='43.6205' width='33.3923' height='34.06' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation='0.177631'/%3E%3CfeComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/%3E%3CfeBlend mode='normal' in2='shape' result='effect1_innerShadow_797_4856'/%3E%3C/filter%3E%3CclipPath id='bgblur_2_797_4856_clip_path' transform='translate(-7.34098 -43.6205)'%3E%3Cpath d='M35.4048 53.3372L34.0199 51.9559L32.4332 48.9494L12.6695 71.8659L17.5549 72.3322C18.9766 72.4679 20.3717 71.8828 21.2712 70.7735L28.4265 61.9499L35.4048 53.3372Z'/%3E%3C/clipPath%3E%3Cfilter id='filter3_i_797_4856' x='7.34098' y='43.6205' width='33.3923' height='34.06' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation='0.177631'/%3E%3CfeComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/%3E%3CfeBlend mode='normal' in2='shape' result='effect1_innerShadow_797_4856'/%3E%3C/filter%3E%3CclipPath id='bgblur_3_797_4856_clip_path' transform='translate(-7.34098 -43.6205)'%3E%3Cpath d='M35.4048 53.3372L34.0199 51.9559L32.4332 48.9494L12.6695 71.8659L17.5549 72.3322C18.9766 72.4679 20.3717 71.8828 21.2712 70.7735L28.4265 61.9499L35.4048 53.3372Z'/%3E%3C/clipPath%3E%3Cfilter id='filter4_i_797_4856' x='36.4504' y='34.5153' width='32.9118' height='47.347' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation='0.177631'/%3E%3CfeComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/%3E%3CfeBlend mode='normal' in2='shape' result='effect1_innerShadow_797_4856'/%3E%3C/filter%3E%3CclipPath id='bgblur_4_797_4856_clip_path' transform='translate(-36.4504 -34.5153)'%3E%3Cpath d='M63.7897 73.1987C64.593 74.8207 63.3027 76.6943 61.5009 76.5223L56.6127 76.0557L41.7792 39.8442L47.5441 40.3945L63.7897 73.1987Z'/%3E%3C/clipPath%3E%3Cfilter id='filter5_i_797_4856' x='36.4504' y='34.5153' width='32.9118' height='47.347' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation='0.177631'/%3E%3CfeComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/%3E%3CfeBlend mode='normal' in2='shape' result='effect1_innerShadow_797_4856'/%3E%3C/filter%3E%3CclipPath id='bgblur_5_797_4856_clip_path' transform='translate(-36.4504 -34.5153)'%3E%3Cpath d='M63.7897 73.1987C64.5929 74.8207 63.3027 76.6943 61.5009 76.5223L56.6127 76.0557L41.7792 39.8442L47.5437 40.3944L63.7897 73.1987Z'/%3E%3C/clipPath%3E%3Cfilter id='filter6_i_797_4856' x='38.2804' y='-0.0100932' width='38.904' height='45.7306' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation='0.177631'/%3E%3CfeComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/%3E%3CfeBlend mode='normal' in2='shape' result='effect1_innerShadow_797_4856'/%3E%3C/filter%3E%3CclipPath id='bgblur_6_797_4856_clip_path' transform='translate(-38.2804 0.0100932)'%3E%3Cpath d='M71.3684 9.65002C72.4843 8.21205 71.5754 6.10851 69.7635 5.93555L63.3024 5.31881L68.0787 8.46099L57.8511 22.4002L43.609 40.0189L47.5126 40.3916L71.3684 9.65002Z'/%3E%3C/clipPath%3E%3Cfilter id='filter7_i_797_4856' x='38.5402' y='-0.0100932' width='38.6442' height='45.7306' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation='0.177631'/%3E%3CfeComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/%3E%3CfeBlend mode='normal' in2='shape' result='effect1_innerShadow_797_4856'/%3E%3C/filter%3E%3CclipPath id='bgblur_7_797_4856_clip_path' transform='translate(-38.5402 0.0100932)'%3E%3Cpath d='M71.3684 9.65002C72.4843 8.21205 71.5754 6.10851 69.7635 5.93555L63.3024 5.31881L67.5056 7.02912C68.0746 7.26067 68.3209 7.93175 68.0366 8.47637L66.4851 11.449L43.8683 40.0437L47.5126 40.3916L71.3684 9.65002Z'/%3E%3C/clipPath%3E%3CclipPath id='bgblur_8_797_4856_clip_path' transform='translate(1.08778 3.3716)'%3E%3Cpath d='M67.0281 5.67404C67.5987 5.7285 68.0549 5.97597 68.3966 6.41646C68.732 6.92431 68.8739 7.44768 68.8225 7.98658C68.8032 8.18867 68.7522 8.38774 68.6695 8.58377C68.5869 8.77981 68.5042 8.97585 68.4215 9.17188L44.2814 39.9043L60.8801 73.0979C61.0317 73.5202 61.0882 73.9334 61.0496 74.3376C60.9982 74.8765 60.763 75.3299 60.3441 75.6978C59.9187 76.133 59.4207 76.3234 58.8502 76.2689L47.154 75.1525C46.3299 75.0738 45.7185 74.7775 45.3197 74.2636C44.8576 73.7437 44.519 73.2695 44.304 72.8411L33.4812 51.517L18.7246 70.3995C18.4324 70.7794 18.0103 71.181 17.4581 71.6041C16.906 72.0273 16.2178 72.1995 15.3937 72.1208L4.26809 71.0588C3.76093 71.0104 3.33969 70.7323 3.00433 70.2244C2.59916 69.7779 2.4223 69.2852 2.47374 68.7463C2.51875 68.2747 2.68409 67.8827 2.96981 67.5701L25.5389 38.2172L7.56338 3.3627C7.45589 3.14851 7.41181 2.94038 7.4311 2.73829C7.387 2.53015 7.37457 2.32504 7.39386 2.12294C7.4453 1.58404 7.68372 1.09698 8.1091 0.661742C8.52804 0.293873 9.02277 0.137164 9.59331 0.191625L21.6698 1.34438C22.494 1.42305 23.1371 1.72235 23.5992 2.24231C23.998 2.7562 24.3081 3.19366 24.5295 3.55468L36.3873 26.0992L52.2009 6.19604C52.4232 5.87738 52.8105 5.50648 53.3626 5.08336C53.8514 4.65417 54.5395 4.48194 55.4271 4.56666L67.0281 5.67404Z'/%3E%3C/clipPath%3E%3Cfilter id='filter9_i_797_4856' x='-1.08778' y='-3.3716' width='73.4724' height='83.2023' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation='0.355263'/%3E%3CfeComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/%3E%3CfeBlend mode='normal' in2='shape' result='effect1_innerShadow_797_4856'/%3E%3C/filter%3E%3CclipPath id='bgblur_9_797_4856_clip_path' transform='translate(1.08778 3.3716)'%3E%3Cpath d='M67.0281 5.67404C67.5987 5.7285 68.0549 5.97597 68.3966 6.41646C68.732 6.92431 68.8739 7.44768 68.8225 7.98658C68.8032 8.18867 68.7522 8.38774 68.6695 8.58377C68.5869 8.77981 68.5042 8.97585 68.4215 9.17189L44.2814 39.9043L60.8801 73.0979C61.0317 73.5202 61.0882 73.9334 61.0496 74.3376C60.9982 74.8765 60.763 75.3299 60.3441 75.6978C59.9187 76.133 59.4207 76.3234 58.8502 76.2689L47.154 75.1525C46.3299 75.0738 45.7185 74.7775 45.3197 74.2636C44.8576 73.7437 44.519 73.2695 44.304 72.8411L33.4812 51.517L18.7246 70.3995C18.4324 70.7794 18.0103 71.181 17.4581 71.6041C16.906 72.0273 16.2178 72.1995 15.3937 72.1208L4.26809 71.0588C3.76093 71.0104 3.33969 70.7323 3.00433 70.2244C2.59916 69.7779 2.4223 69.2852 2.47374 68.7463C2.51875 68.2747 2.68409 67.8827 2.96981 67.5701L25.5389 38.2172L7.56338 3.36271C7.45589 3.14851 7.41181 2.94038 7.4311 2.73829C7.387 2.53015 7.37457 2.32504 7.39386 2.12294C7.4453 1.58404 7.68372 1.09698 8.1091 0.661742C8.52804 0.293873 9.02276 0.137163 9.59331 0.191625L21.6698 1.34438C22.494 1.42305 23.1371 1.72236 23.5992 2.24231C23.998 2.75621 24.3081 3.19366 24.5295 3.55468L36.3873 26.0992L52.2009 6.19604C52.4232 5.87738 52.8105 5.50649 53.3626 5.08336C53.8514 4.65418 54.5395 4.48194 55.4271 4.56666L67.0281 5.67404Z'/%3E%3C/clipPath%3E%3Cfilter id='filter10_di_797_4856' x='1.15262' y='-1.12228' width='76.1959' height='86.6363' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dx='4.97368' dy='5.6842'/%3E%3CfeGaussianBlur stdDeviation='1.77631'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.133333 0 0 0 0 0.435294 0 0 0 0 1 0 0 0 0.16 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_797_4856'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_797_4856' result='shape'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dx='0.355263'/%3E%3CfeGaussianBlur stdDeviation='0.177631'/%3E%3CfeComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0'/%3E%3CfeBlend mode='normal' in2='shape' result='effect2_innerShadow_797_4856'/%3E%3C/filter%3E%3CclipPath id='bgblur_10_797_4856_clip_path' transform='translate(-1.15262 1.12228)'%3E%3Cpath d='M67.0184 5.67318C67.5889 5.72764 68.0451 5.97512 68.3869 6.4156C68.7222 6.92345 68.8642 7.44682 68.8127 7.98573C68.7934 8.18782 68.7425 8.38689 68.6598 8.58292C68.5771 8.77896 68.4944 8.97499 68.4117 9.17103L44.2716 39.9034L60.8703 73.097C61.0219 73.5193 61.0785 73.9326 61.0399 74.3368C60.9884 74.8757 60.7532 75.3291 60.3343 75.6969C59.9089 76.1322 59.411 76.3225 58.8404 76.2681L47.1442 75.1516C46.3201 75.073 45.7087 74.7767 45.31 74.2628C44.8478 73.7428 44.5092 73.2687 44.2942 72.8403L33.4715 51.5162L18.7148 70.3986C18.4227 70.7786 18.0005 71.1801 17.4484 71.6033C16.8962 72.0264 16.208 72.1986 15.3839 72.12L4.25832 71.058C3.75117 71.0096 3.32992 70.7314 2.99457 70.2236C2.58939 69.7771 2.41254 69.2843 2.46398 68.7454C2.50899 68.2739 2.67432 67.8818 2.96005 67.5692L25.5291 38.2163L7.55362 3.36185C7.44612 3.14766 7.40205 2.93953 7.42134 2.73744C7.37724 2.5293 7.36481 2.32418 7.3841 2.12209C7.43554 1.58319 7.67396 1.09612 8.09933 0.660888C8.51827 0.293019 9.013 0.136309 9.58354 0.19077L21.6601 1.34353C22.4842 1.42219 23.1273 1.7215 23.5895 2.24145C23.9882 2.75535 24.2983 3.19281 24.5197 3.55383L36.3775 26.0984L52.1911 6.19519C52.4135 5.87652 52.8007 5.50564 53.3529 5.0825C53.8416 4.65332 54.5298 4.48109 55.4173 4.56581L67.0184 5.67318Z'/%3E%3C/clipPath%3E%3Cfilter id='filter11_i_797_4856' x='-0.759145' y='-1.53408' width='69.5814' height='77.8113' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dx='-3.4285' dy='-1.71425'/%3E%3CfeGaussianBlur stdDeviation='1.60711'/%3E%3CfeComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0'/%3E%3CfeBlend mode='normal' in2='shape' result='effect1_innerShadow_797_4856'/%3E%3C/filter%3E%3ClinearGradient id='paint0_linear_797_4856' x1='36.7344' y1='26.2499' x2='21.5461' y2='1.42468' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%233F3F3F'/%3E%3Cstop offset='0.2' stop-color='%239D9D9D'/%3E%3Cstop offset='1' stop-color='%239D9D9D'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_797_4856' x1='36.7344' y1='26.2499' x2='21.5461' y2='1.42468' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%233F3F3F'/%3E%3Cstop offset='0.2' stop-color='%239D9D9D'/%3E%3Cstop offset='1' stop-color='%239D9D9D'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint2_linear_797_4856' x1='33.6154' y1='50.4898' x2='14.0048' y2='71.9933' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%239D9D9D'/%3E%3Cstop offset='0.5' stop-color='%23003599'/%3E%3Cstop offset='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint3_linear_797_4856' x1='33.6154' y1='50.4898' x2='14.0048' y2='71.9933' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%239D9D9D'/%3E%3Cstop offset='0.5' stop-color='%23003599'/%3E%3Cstop offset='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint4_linear_797_4856' x1='59.5652' y1='76.3375' x2='47.8449' y2='40.4232' gradientUnits='userSpaceOnUse'%3E%3Cstop/%3E%3Cstop offset='0.5' stop-color='%23003599'/%3E%3Cstop offset='1' stop-color='%23737373'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint5_linear_797_4856' x1='59.5652' y1='76.3375' x2='47.8449' y2='40.4232' gradientUnits='userSpaceOnUse'%3E%3Cstop/%3E%3Cstop offset='0.5' stop-color='%23003599'/%3E%3Cstop offset='1' stop-color='%23737373'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint6_linear_797_4856' x1='66.2645' y1='5.60155' x2='46.5749' y2='39.7395' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23CECECE'/%3E%3Cstop offset='0.5' stop-color='%239D9D9D'/%3E%3Cstop offset='1' stop-color='%23737373'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint7_linear_797_4856' x1='66.2645' y1='5.60155' x2='46.5749' y2='39.7395' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23CECECE'/%3E%3Cstop offset='0.5' stop-color='%239D9D9D'/%3E%3Cstop offset='1' stop-color='%23737373'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint8_linear_797_4856' x1='39.9658' y1='74.4663' x2='29.025' y2='-2.23606' gradientUnits='userSpaceOnUse'%3E%3Cstop/%3E%3Cstop offset='0.14' stop-color='%23226FFF'/%3E%3Cstop offset='0.345' stop-color='%23226FFF'/%3E%3Cstop offset='0.54' stop-color='white'/%3E%3Cstop offset='1' stop-color='white'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint9_linear_797_4856' x1='39.9658' y1='74.4663' x2='29.539' y2='-3.88217' gradientUnits='userSpaceOnUse'%3E%3Cstop/%3E%3Cstop offset='0.14' stop-color='%23226FFF'/%3E%3Cstop offset='0.345' stop-color='%23226FFF' stop-opacity='0.5'/%3E%3Cstop offset='0.54' stop-color='white' stop-opacity='0.2'/%3E%3Cstop offset='1' stop-color='white' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint10_linear_797_4856' x1='39.9561' y1='74.4655' x2='29.2262' y2='-4.44726' gradientUnits='userSpaceOnUse'%3E%3Cstop/%3E%3Cstop offset='0.14' stop-color='%23226FFF'/%3E%3Cstop offset='0.345' stop-color='%23226FFF' stop-opacity='0.5'/%3E%3Cstop offset='0.54' stop-color='white' stop-opacity='0.2'/%3E%3Cstop offset='1' stop-color='white' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
        background-size: cover;
        content: "";
      }

      ${media.mobile} {
        // left: 143px;
        // width: 36.953px;
        // height: 39.391px;

        &:after {
          width: 36.953px;
          height: 39.391px;
        }
      }
    }
  }

  p {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.4;
    color: ${palette.gray800};
    margin: 12px auto 40px;

    ${media.mobile} {
      font-size: 1rem;
      margin: 8px auto 16px;
    }
  }

  button {
    font-family: "Pretendard", "Poppins";
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.55;
    letter-spacing: -0.48px;
    color: ${palette.white};
    padding: 8px 32px;
    border-radius: 8px;
    border: 0;
    background: ${palette.primary};
  }
  .img {
    position: relative;
    max-width: 1250px;
    margin: 0 auto;

    ${media.mobile} {
      margin-top: 20px;
      padding: 40px 0 20px;
    }

    img {
      ${media.tablet} {
        width: 100%;
        scale: 1.4;
      }
    }

    span {
      position: absolute;
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1.4;
      letter-spacing: -0.2px;
      color: ${palette.white};
      padding: 12px 20px;
      border-radius: 50px;

      ${media.mobile} {
        font-size: 0.7rem;
        padding: 7px 11px;
      }

      &:nth-child(2) {
        top: 90px;
        left: 10vw;
        background: #af52de;

        ${media.tablet} {
          top: 70px;
          left: 13vw;
        }

        ${media.mobile} {
          top: 30px;
          left: 30vw;
        }
      }

      &:nth-child(3) {
        top: 255px;
        left: 13vw;
        background: #00c7be;

        ${media.tablet} {
          top: 200px;
          left: 14vw;
        }

        ${media.mobile} {
          top: 280px;
          left: 28vw;
        }
      }

      &:nth-child(4) {
        bottom: 300px;
        right: 8vw;
        background: #ff9500;

        ${media.tablet} {
          bottom: 240px;
          right: 5vw;
        }

        ${media.mobile} {
          bottom: 90px;
          right: 6vw;
        }
      }
    }
  }
`;

const Section01 = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 64px;
  margin-top: 50px;
  margin-bottom: 140px;

  ${media.mobile} {
    gap: 44px;
    margin-bottom: 110px;
  }

  .title {
    display: flex;
    flex-direction: column;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-weight: 600;
      line-height: 1.4;
      color: ${palette.primary};

      ${media.mobile} {
        font-size: 0.75rem;
      }

      &:before {
        width: 24px;
        height: 24px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z' fill='%230E4194'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.4524 15.908C17.4792 15.9584 17.4872 16.0166 17.4749 16.0723C17.4626 16.128 17.4309 16.1776 17.3854 16.212C15.8318 17.3754 13.9424 18.0029 12.0014 18C10.0605 18.0029 8.17107 17.3754 6.61744 16.212C6.57196 16.1776 6.54024 16.128 6.52796 16.0723C6.51569 16.0166 6.52365 15.9584 6.55044 15.908C7.50044 14.192 9.58344 13 12.0014 13C14.4194 13 16.5024 14.191 17.4524 15.908Z' fill='%230E4194'/%3E%3Cpath d='M17 4H17.502C18.713 4 19.319 4 19.783 4.232C20.2094 4.44497 20.555 4.79064 20.768 5.217C21 5.68 21 6.287 21 7.498V8M17 20H17.502C18.713 20 19.319 20 19.783 19.768C20.2094 19.555 20.555 19.2094 20.768 18.783C21 18.319 21 17.713 21 16.502V16M7 4H6.498C5.287 4 4.681 4 4.217 4.232C3.79064 4.44497 3.44497 4.79064 3.232 5.217C3 5.68 3 6.287 3 7.498V8M7 20H6.498C5.287 20 4.681 20 4.217 19.768C3.79064 19.555 3.44497 19.2094 3.232 18.783C3 18.32 3 17.713 3 16.502V16' stroke='%230E4194' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
        background-size: cover;
        content: "";

        ${media.mobile} {
          width: 16px;
          height: 16px;
        }
      }
    }

    h3 {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.4;
      word-break: keep-all;
      margin: 7px auto 16px;

      ${media.mobile} {
        width: 60%;
        font-size: 2rem;
        margin: 4px auto 12px;
      }
    }

    p {
      font-size: 1.25rem;
      font-weight: 300;
      line-height: 1.4;
      color: #525252;

      ${media.mobile} {
        font-size: 1rem;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 40px;
    max-width: 1024px;
    width: 100%;

    ${media.mobile} {
      gap: 20px;
      width: calc(100% - 40px);
    }

    > div {
      display: flex;
      align-items: flex-end;
      gap: 40px;
      padding: 0 0 0 44px;
      border-radius: 30px;
      background: ${palette.gray100};

      ${media.mobile} {
        align-items: flex-start;
        flex-direction: column-reverse;
        gap: 50px;
        padding: 48px 15px 26px 32px;
      }

      img {
        ${media.mobile} {
          width: 100%;
        }
      }

      &.item02 {
        background: #ebf4ff;
      }

      > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 25px;
        padding: 85px;

        ${media.mobile} {
          gap: 12px;
          padding: 0;
        }
        padding: 85px 0 85px 55px;
      }

      strong {
        font-size: 1.88rem;
        font-weight: 700;
        line-height: 1.4;
        text-align: left;

        ${media.mobile} {
          font-size: 1.5rem;
        }
      }

      p {
        font-size: 1.25rem;
        line-height: 1.4;
        color: #4d4d4d;
        text-align: left;

        ${media.mobile} {
          font-size: 1rem;
        }
      }
    }
  }
`;

const Section02 = styled.div`
  position: relative;
  width: 100%;
  padding: 80px 0 95px;
  background: linear-gradient(
    94deg,
    rgba(45, 255, 132, 0.1) 1.63%,
    rgba(63, 130, 255, 0.1) 107.07%
  );

  ${media.mobile} {
    padding: 70px 0;
  }

  > div {
    display: flex;
    justify-content: space-between;
    max-width: 820px;
    width: 100%;
    margin: 0 auto;

    ${media.mobile} {
      flex-direction: column;
      align-items: center;
      gap: 64px;
    }
  }

  .title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    ${media.mobile} {
      align-items: center;
      margin-top: 0 !important;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 4px;
      font-weight: 600;
      line-height: 1.4;
      color: ${palette.primary};

      ${media.mobile} {
        font-size: 0.75rem;
      }

      &:before {
        width: 24px;
        height: 24px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z' fill='%230E4194'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.4524 15.908C17.4792 15.9584 17.4872 16.0166 17.4749 16.0723C17.4626 16.128 17.4309 16.1776 17.3854 16.212C15.8318 17.3754 13.9424 18.0029 12.0014 18C10.0605 18.0029 8.17107 17.3754 6.61744 16.212C6.57196 16.1776 6.54024 16.128 6.52796 16.0723C6.51569 16.0166 6.52365 15.9584 6.55044 15.908C7.50044 14.192 9.58344 13 12.0014 13C14.4194 13 16.5024 14.191 17.4524 15.908Z' fill='%230E4194'/%3E%3Cpath d='M17 4H17.502C18.713 4 19.319 4 19.783 4.232C20.2094 4.44497 20.555 4.79064 20.768 5.217C21 5.68 21 6.287 21 7.498V8M17 20H17.502C18.713 20 19.319 20 19.783 19.768C20.2094 19.555 20.555 19.2094 20.768 18.783C21 18.319 21 17.713 21 16.502V16M7 4H6.498C5.287 4 4.681 4 4.217 4.232C3.79064 4.44497 3.44497 4.79064 3.232 5.217C3 5.68 3 6.287 3 7.498V8M7 20H6.498C5.287 20 4.681 20 4.217 19.768C3.79064 19.555 3.44497 19.2094 3.232 18.783C3 18.32 3 17.713 3 16.502V16' stroke='%230E4194' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
        background-size: cover;
        content: "";

        ${media.mobile} {
          width: 16px;
          height: 16px;
        }
      }
    }

    h3 {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.4;
      text-align: left;
      margin: 7px auto 16px;

      ${media.mobile} {
        font-size: 2rem;
        line-height: 1.3;
        text-align: center;
        margin: 4px auto 32px;
      }
    }

    button {
      font-size: 0.88rem;
      font-weight: 600;
      line-height: 1.55;
      letter-spacing: -0.42px;
      color: ${palette.white};
      padding: 8px 12px;
      border-radius: 8px;
      border: 0;
      background: ${palette.primary};
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    max-width: 330px;
    width: 100%;

    ${media.mobile} {
      max-width: 100%;
      width: calc(100% - 40px);
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 20px;
      border-radius: 20px;
      border: 1px solid rgba(22, 22, 22, 0.1);
      background: ${palette.white};

      div {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        gap: 4px;
      }

      strong {
        font-size: 1.25rem;
        font-weight: 700;
        line-height: 1.4;
        color: ${palette.gray800};

        ${media.mobile} {
          font-size: 1rem;
        }
      }

      p {
        font-size: 0.88rem;
        font-weight: 400;
        line-height: 1.5;
        color: #686868;

        ${media.mobile} {
          font-size: 0.75rem;
        }
      }
    }
  }
`;

const Section03 = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 64px;
  margin-top: 190px;
  margin-bottom: 140px;

  ${media.mobile} {
    gap: 44px;
    margin-top: 110px;
    margin-bottom: 110px;
  }

  .title {
    display: flex;
    flex-direction: column;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-weight: 600;
      line-height: 1.4;
      color: #0e4194;

      ${media.mobile} {
        font-size: 0.75rem;
      }

      &:before {
        width: 24px;
        height: 24px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z' fill='%230E4194'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.4524 15.908C17.4792 15.9584 17.4872 16.0166 17.4749 16.0723C17.4626 16.128 17.4309 16.1776 17.3854 16.212C15.8318 17.3754 13.9424 18.0029 12.0014 18C10.0605 18.0029 8.17107 17.3754 6.61744 16.212C6.57196 16.1776 6.54024 16.128 6.52796 16.0723C6.51569 16.0166 6.52365 15.9584 6.55044 15.908C7.50044 14.192 9.58344 13 12.0014 13C14.4194 13 16.5024 14.191 17.4524 15.908Z' fill='%230E4194'/%3E%3Cpath d='M17 4H17.502C18.713 4 19.319 4 19.783 4.232C20.2094 4.44497 20.555 4.79064 20.768 5.217C21 5.68 21 6.287 21 7.498V8M17 20H17.502C18.713 20 19.319 20 19.783 19.768C20.2094 19.555 20.555 19.2094 20.768 18.783C21 18.319 21 17.713 21 16.502V16M7 4H6.498C5.287 4 4.681 4 4.217 4.232C3.79064 4.44497 3.44497 4.79064 3.232 5.217C3 5.68 3 6.287 3 7.498V8M7 20H6.498C5.287 20 4.681 20 4.217 19.768C3.79064 19.555 3.44497 19.2094 3.232 18.783C3 18.32 3 17.713 3 16.502V16' stroke='%230E4194' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
        background-size: cover;
        content: "";

        ${media.mobile} {
          width: 16px;
          height: 16px;
        }
      }
    }

    h3 {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.4;
      margin: 7px auto 16px;

      ${media.mobile} {
        font-size: 2rem;
        margin: 4px auto 0;
      }
    }
  }

  .content {
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
    max-width: 1024px;
    width: 100%;

    ${media.mobile} {
      gap: 20px;
      width: calc(100% - 40px);
    }

    > div {
      display: flex;
      gap: 40px;
      flex: 1 1 auto;
      max-width: 492px;
      width: 100%;
      border-radius: 30px;
      background-color: ${palette.gray100};

      &.item03,
      &.item04 {
        background-color: #ebf4ff;
      }

      &.item01 {
        background-image: url(${Landingimages.ImgLanding07});
        background-size: auto;
        background-position: right top 20px;
        background-repeat: no-repeat;

        ${media.mobile} {
          background-position: right -10px top 10px;
          background-size: 260px;
        }
      }

      &.item02 {
        background-image: url(${Landingimages.ImgLanding08});
        background-size: auto;
        background-position: right -30px top;
        background-repeat: no-repeat;

        ${media.mobile} {
          background-size: 290px;
          background-position: right -20px top -20px;
        }
      }

      &.item03 {
        background-image: url(${Landingimages.ImgLanding09});
        background-size: auto;
        background-position: right top;
        background-repeat: no-repeat;

        ${media.mobile} {
          background-size: 220px;
        }
      }

      &.item04 {
        background-image: url(${Landingimages.ImgLanding10});
        background-size: auto;
        background-position: right top 70px;
        background-repeat: no-repeat;

        ${media.mobile} {
          background-size: 280px;
          background-position: right top 50px;
        }
      }

      > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        padding: 210px 50px 35px;

        ${media.mobile} {
          padding: 170px 20px 30px;
        }
      }

      strong {
        font-size: 1.25rem;
        font-weight: 800;
        line-height: 1.4;
        text-align: left;
      }

      p {
        font-size: 1.25rem;
        line-height: 1.4;
        color: #4d4d4d;
        text-align: left;

        ${media.mobile} {
          font-size: 1rem;
        }
      }
    }
  }
`;

const Section04 = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 64px;
  margin-top: 190px;
  margin-bottom: 140px;

  ${media.mobile} {
    gap: 44px;
    margin-top: 110px;
    margin-bottom: 110px;
    padding: 0 20px;
  }

  .title {
    display: flex;
    flex-direction: column;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-weight: 600;
      line-height: 1.4;
      color: #ff9500;

      ${media.mobile} {
        font-size: 0.75rem;
      }

      &:before {
        width: 24px;
        height: 24px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z' fill='%230E4194'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.4524 15.908C17.4792 15.9584 17.4872 16.0166 17.4749 16.0723C17.4626 16.128 17.4309 16.1776 17.3854 16.212C15.8318 17.3754 13.9424 18.0029 12.0014 18C10.0605 18.0029 8.17107 17.3754 6.61744 16.212C6.57196 16.1776 6.54024 16.128 6.52796 16.0723C6.51569 16.0166 6.52365 15.9584 6.55044 15.908C7.50044 14.192 9.58344 13 12.0014 13C14.4194 13 16.5024 14.191 17.4524 15.908Z' fill='%230E4194'/%3E%3Cpath d='M17 4H17.502C18.713 4 19.319 4 19.783 4.232C20.2094 4.44497 20.555 4.79064 20.768 5.217C21 5.68 21 6.287 21 7.498V8M17 20H17.502C18.713 20 19.319 20 19.783 19.768C20.2094 19.555 20.555 19.2094 20.768 18.783C21 18.319 21 17.713 21 16.502V16M7 4H6.498C5.287 4 4.681 4 4.217 4.232C3.79064 4.44497 3.44497 4.79064 3.232 5.217C3 5.68 3 6.287 3 7.498V8M7 20H6.498C5.287 20 4.681 20 4.217 19.768C3.79064 19.555 3.44497 19.2094 3.232 18.783C3 18.32 3 17.713 3 16.502V16' stroke='%230E4194' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
        background-size: cover;
        content: "";

        ${media.mobile} {
          width: 16px;
          height: 16px;
        }
      }
    }

    h3 {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.4;
      margin: 7px auto 16px;
      word-break: keep-all;

      ${media.mobile} {
        width: 60%;
        font-size: 2rem;
        margin: 4px auto 0;
      }
    }
  }

  .content {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    max-width: 1024px;
    width: 100%;

    ${media.mobile} {
      gap: 0;
      flex-wrap: nowrap;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 0;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    > div {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 330px;
      width: 100%;
      padding: 16px 16px 20px;
      border-radius: 30px;
      border: 1px solid rgba(22, 22, 22, 0.1);
      background: ${palette.white};

      ${media.mobile} {
        min-width: 100%;
        scroll-snap-align: start;
        margin-left: 16px;

        &:first-child {
          margin-left: 20px; // 첫 번째 아이템에만 왼쪽 마진 20px 적용
        }
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }

      strong {
        font-size: 1rem;
        font-weight: 600;
        line-height: 1.2;
        letter-spacing: -0.48px;
        color: #222;
        text-align: left;
      }

      p {
        font-size: 1rem;
        line-height: 1.5;
        color: #686868;
        text-align: left;
      }
    }
  }
`;

const Section05 = styled.div`
  position: relative;
  width: 100%;
  margin-top: 220px;
  margin-bottom: 180px;
  overflow: hidden;

  ${media.mobile} {
    width: calc(100% - 40px);
    margin: 110px auto 72px;
  }

  .title {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 80px;
    padding: 370px 0 280px;

    &:before {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 130px;
      border-radius: 10px;
      background: ${palette.white};
      content: "";

      ${media.mobile} {
        height: 55px;
      }
    }

    &:after {
      position: absolute;
      bottom: 120px;
      left: 40%;
      width: 900px;
      height: 900px;
      border-radius: 50%;
      background: radial-gradient(
        50% 50% at 50% 50%,
        rgba(34, 111, 255, 0.45) 0%,
        rgba(0, 0, 0, 0.45) 76%
      );
      content: "";

      ${media.mobile} {
        width: 320px;
        height: 320px;
        bottom: 140px;
        left: -5%;
      }
    }

    h3 {
      font-size: 5.75rem;
      font-weight: 500;
      color: ${palette.white};
      line-height: 1.25;
      letter-spacing: -2.76px;
      z-index: 1;

      ${media.mobile} {
        font-size: 2.75rem;
      }
    }

    button {
      font-family: Pretendard, "Poppins";
      font-size: 1.75rem;
      font-weight: 500;
      color: ${palette.white};
      letter-spacing: -0.84px;
      line-height: 1;
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 28px 42px;
      border-radius: 50px;
      border: 2px solid ${palette.white};
      background: transparent;
      z-index: 1;
      transition: all 0.3s;

      ${media.mobile} {
        font-size: 1rem;
        padding: 12px 16px;
      }

      span {
        position: relative;
        width: 41px;
        height: 16px;

        ${media.mobile} {
          width: 20px;
          height: 8px;
        }

        &::before {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          border-radius: 4px;
          background: ${palette.white};
          content: "";
        }

        &::after {
          position: absolute;
          bottom: 5px;
          right: 0;
          transform: rotate(40deg);
          width: 16px;
          height: 2px;
          border-radius: 4px;
          background: ${palette.white};
          content: "";

          ${media.mobile} {
            bottom: 3px;
            width: 12px;
            height: 2px;
          }
        }
      }

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
`;

const FaqWrap = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 285px;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;

  > div {
    display: flex;
    flex-direction: column;
    gap: 44px;
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
  }

  h3 {
    font-size: 4rem;
    font-weight: 500;
    line-height: 1.25;
    letter-spacing: -1.92px;
    z-index: 1;
    display: flex;

    ${media.mobile} {
      font-size: 2rem;
      font-weight: 700;
      line-height: 1.3;
      letter-spacing: -0.96px;
    }
  }
`;

const FaqList = styled.ul`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #c3c3c3;
  width: 100%;

  li {
    border-bottom: 1px solid #c3c3c3;

    button {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 32px 0;
      text-align: left;
      background: transparent;
      border: none;
      cursor: pointer;

      ${media.mobile} {
        padding: 24px 0;
      }

      p {
        font-family: Pretendard, "Poppins";
        font-size: 1.25rem;
        font-weight: 500;
        line-height: 1.25;
        letter-spacing: -0.6px;

        ${media.mobile} {
          font-size: 1rem;
        }

        &.mobile {
          display: none;

          ${media.mobile} {
            display: block;
          }
        }

        &.web {
          display: block;

          ${media.mobile} {
            display: none;
          }
        }
      }

      i {
        width: 24px;
        height: 24px;
        position: relative;
        transition: transform 0.3s ease;

        &::before,
        &::after {
          content: "";
          position: absolute;
          background-color: ${palette.black};
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        &::before {
          width: 2px;
          height: 12px;
          transition: opacity 0.3s ease;
        }

        &::after {
          width: 12px;
          height: 2px;
        }
      }

      &.open i:before {
        opacity: 0;
      }
    }

    .answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
      padding: 0 32px 0 0;
      display: flex;
      flex-direction: column;
      gap: 8px;

      &.open {
        max-height: 500px;
        padding-bottom: 16px;

        & + button i::before {
          opacity: 0;
        }
      }

      p {
        font-size: 1rem;
        font-weight: 400;
        color: ${palette.lightGray};
        line-height: 1.5;
        letter-spacing: -0.48px;
        text-align: left;

        &.gray {
          color: ${palette.lightGray};
        }
      }

      ul {
        display: flex;
        align-items: flex-start;
        flex-direction: column;

        li {
          position: relative;
          font-size: 1rem;
          font-weight: 400;
          color: ${palette.white};
          line-height: 1.25;
          letter-spacing: -0.48px;
          text-align: left;
          padding-left: 24px;
          border: 0;

          &::before {
            position: absolute;
            top: 9px;
            left: 9px;
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background: ${palette.white};
            content: "";
          }
        }
      }
    }
  }
`;

const Footer = styled.div`
  position: relative;
  width: 100%;
  padding: 100px 0 120px;
  background: ${palette.gray100};

  ${media.mobile} {
    padding: 40px 20px;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 100px;
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;

    ${media.mobile} {
      gap: 24px;
    }
  }

  .address {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    text-align: left;

    svg {
      position: absolute;
      bottom: 0;
      right: 0;

      ${media.mobile} {
        position: relative;
        bottom: auto;
        right: auto;
        width: 100px;
      }
    }

    strong {
      font-size: 1rem;
      font-weight: 600;
      color: ${palette.gray700};
      line-height: 1.2;
      letter-spacing: -0.48px;

      ${media.mobile} {
        display: none;
      }
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 10px;

      ${media.mobile} {
        gap: 8px;
      }

      p {
        display: flex;
        align-items: center;
        gap: 20px;
        font-size: 1rem;
        font-weight: 400;
        font-family: Pretendard;
        color: ${palette.gray700};
        line-height: 1.2;
        letter-spacing: -0.48px;

        ${media.mobile} {
          font-size: 0.75rem;
          font-family: Pretendard;
          color: ${palette.gray700};
          gap: 8px;
          flex-wrap: wrap;
        }

        span {
          display: flex;
          align-items: center;
          gap: 20px;

          ${media.mobile} {
            gap: 10px;
          }

          &:before {
            width: 1px;
            height: 12px;
            background: ${palette.gray700};
            content: "";

            ${media.mobile} {
              color: ${palette.gray700};
            }
          }
        }
      }
    }
  }

  .copyright {
    font-size: 1rem;
    font-weight: 400;
    color: ${palette.gray700};
    line-height: 1.2;
    letter-spacing: -0.48px;
    text-align: left;

    ${media.mobile} {
      font-size: 0.75rem;
    }
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 999;
  background: rgba(0, 0, 0, 0.6);

  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 438px;
    height: auto;
    overflow: hidden;

    ${media.mobile} {
      width: calc(100vw - 40px);
    }
  }

  img {
    border-radius: 15px;

    ${media.mobile} {
      width: 100%;
    }
  }

  .close {
    position: absolute;
    top: 32px;
    right: 32px;
    width: 16px;
    height: 16px;
    cursor: pointer;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 2px;
      border-radius: 4px;
      background: ${palette.gray700};
      content: "";
    }

    &:before {
      transform: rotate(45deg);
    }

    &:after {
      transform: rotate(-45deg);
    }
  }
`;

const Section06 = styled.div`
  position: relative;
  width: 100%;
  height: 316px;
  margin-bottom: 0; /* 180px에서 0으로 변경 */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${require("../assets/images/Landing/landing_bottom_background.png")});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${media.mobile} {
    width: 100%;
    height: 180px;
    margin: 0 auto 0; /* 마지막 0으로 변경 */
    background-size: cover;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 2;
    gap: 20px;
    max-width: 1200px;
    width: 100%;
    padding: 0 20px;

    ${media.mobile} {
      gap: 20px;
      padding: 0 24px; /* 모바일에서의 좌우 패딩 */
    }
  }

  h3 {
    font-size: 28px;
    font-weight: 500; /* 기본 폰트 굵기를 medium(500)으로 변경 */
    color: #ffffff;
    line-height: 1.3;
    letter-spacing: -0.5px;

    .bold-text {
      font-weight: 700; /* InterviewX만 bold(700)로 설정 */
    }

    ${media.mobile} {
      font-size: 18px;
      letter-spacing: -0.3px;
      width: 100%;
    }
  }

  button {
    font-family: Pretendard, "Poppins";
    font-size: 1.125rem;
    font-weight: 500;
    color: #ffffff;
    background-color: transparent;
    border: 2px solid #ffffff;
    border-radius: 50px;
    padding: 16px 42px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 12px;

    ${media.mobile} {
      font-size: 14px;
      padding: 12px 24px;
      border-width: 1px;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    /* 기존 .arrow-icon 스타일 코드 제거하고 아래 svg 스타일 추가 */
    svg {
      width: 32px;
      height: 21px;

      ${media.mobile} {
        width: 24px;
        height: 16px;
      }
    }
  }
`;
