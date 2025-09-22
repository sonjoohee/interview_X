import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styled, { css } from "styled-components";
import { palette } from "../assets_copy/styles/Palette";
import { TextArea } from "../assets_copy/styles/Input";
import Button from "../assets_copy/styles/Button";
import { Popup, ReportWrap } from "../assets_copy/styles/Common";

import visualImage from "../assets_copy/images/main_visual.png";
import MainContents1 from "../assets_copy/images/main_contents1.png";
import Avatar1 from "../assets_copy/images/avatar1.png";
import Avatar2 from "../assets_copy/images/avatar2.png";
import Avatar3 from "../assets_copy/images/avatar3.png";
import Graph1 from "../assets_copy/images/graph1.png";
import Graph2 from "../assets_copy/images/graph2.png";
import Graph3 from "../assets_copy/images/graph3.png";

import OrganismHeader from "./AI_Panel/components/organisms/OrganismHeader";

import { useAtom } from "jotai";
import {
  AGE_AREA_VALUE,
  AI_ALL_DATA,
  GENDER_AREA_VALUE,
  PASS_SATATE,
  PASS_SATATE2,
  RANDOMSET,
  TEXT_AREA_VALUE,
} from "./Persona/state/persona_manager";

const Lending = () => {
  const [textAreaValue, setTextAreaValue] = useAtom(TEXT_AREA_VALUE);
  const [genderAreaValue, setGenderAreaValue] = useAtom(GENDER_AREA_VALUE);
  const [ageAreaValue, setAgeAreaValue] = useAtom(AGE_AREA_VALUE);
  const [aiAllData, setAiAllData] = useAtom(AI_ALL_DATA);
  const [randomSet, setRandomSet] = useAtom(RANDOMSET);

  const [isPopupOpen_1, setIsPopupOpen_1] = useState(false);
  const [isPopupOpen_2, setIsPopupOpen_2] = useState(false);
  const [isPopupOpen_3, setIsPopupOpen_3] = useState(false);
  const [isPopupOpen_4, setIsPopupOpen_4] = useState(false);

  const [passSate, setPassState] = useAtom(PASS_SATATE);
  const [passSate2, setPassState2] = useAtom(PASS_SATATE2);

  const [isBackwardPopup, setIsBackwardPopup] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen_1(false);
    setIsPopupOpen_2(false);
    setIsPopupOpen_3(false);
    setIsPopupOpen_4(false);
  };

  useEffect(() => {
    reSet_Jotai();
  }, []);

  const reSet_Jotai = () => {
    setAiAllData({});
    setAgeAreaValue("");
    setGenderAreaValue("");
    setRandomSet(9999);
    setPassState(0);
    setPassState2(0);
    setTextAreaValue("");
  };

  // 맨위로 이동
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 다음버튼 클릭시 페이지 이동
  const navigate = useNavigate();

  const LinkURL = () => {
    // console.log(textAreaValue);
    // alert(textAreaValue);

    const regex = /^[가-힣a-zA-Z0-9\s.,'"-]*$/;

    if (!regex.test(textAreaValue)) {
      setIsPopupOpen_4(true);
      return;
    }
    if (textAreaValue.length > 100) {
      setIsPopupOpen_3(true);
      return;
    }

    if (!textAreaValue) {
      setIsPopupOpen_2(true);
    } else if (textAreaValue == "") {
      alert("못들어오는거야 ?");
      setIsPopupOpen_2(true);
    } else {
      navigate("/TargetSetting");
    }
  };

  return (
    <>
      <OrganismHeader />
      <Visual>
        <VisualTitle>
          <p>
            A new way to create
            <span>Beta</span>
          </p>
          <strong>Business Persona</strong>
          <span>
            100번의 인터뷰 없이도 타겟 고객을 이해하고, 고객의 관심을 사로잡는
            방법을 알아보세요
          </span>
        </VisualTitle>

        <CaretTextarea>
          <div>
            <strong>당신의 비즈니스에 대해 설명해주세요💬</strong>
            <TextArea
              onChange={(e) => setTextAreaValue(e.target.value)}
              ExtraLarge
              None
              placeholder="예: AI 기반 인터뷰 시뮬레이션 플랫폼"
              rows="2"
            ></TextArea>
          </div>
          <Button Black Full onClick={LinkURL}>
            다음
          </Button>
          <p>
            부정확한 정보 입력 시, 테스트가 제한 될 수 있습니다.
            <br />
            저희는 비즈니스 성장을 위한 서비스를 만들어가고 있습니다. 많은 협조
            부탁드립니다.
          </p>
        </CaretTextarea>
      </Visual>

      <VisualBg></VisualBg>

      <Container>
        <h2>
          <p>
            AI 기반 페르소나 시뮬레이션으로
            <br />
            빠르게 타겟 고객 정보를 확인하세요
          </p>
          <strong>
            저희가 AI 페르소나와<span>FREE</span>비즈니스 인사이트를
            확인해드려요
          </strong>
        </h2>

        <SectionItem Flex>
          <div>
            <BoxWrap Card>
              <ProfileImg BgGray>
                <img src={Avatar1} alt="인물사진" />
              </ProfileImg>
              <div>
                <span>탈모 걱정</span>
                <strong>
                  효과적인 탈모 관리와 건강한 머리카락을 위해 다양한 제품을 찾고
                  있어요
                </strong>
                <ul>
                  <li>김현우 34세</li>
                  <li>프리랜서</li>
                </ul>
              </div>
            </BoxWrap>
            <BoxWrap Card>
              <ProfileImg BgGray>
                <img src={Avatar2} alt="인물사진" />
              </ProfileImg>
              <div>
                <span>가족과의 안전한 삶</span>
                <strong>
                  바쁜 직장 생활 속에서 자녀의 안전과 건강을 지킬 수 있어야해요
                </strong>
                <ul>
                  <li>김민지 35세</li>
                  <li>식품 마케팅 매니저</li>
                </ul>
              </div>
            </BoxWrap>
            <BoxWrap Card>
              <ProfileImg BgGray>
                <img src={Avatar3} alt="인물사진" />
              </ProfileImg>
              <div>
                <span>프로페셔널</span>
                <strong>
                  유명한 헤어 스타일리스트가 되기 위해 좋은 제품은 빠르게
                  수용해요
                </strong>
                <ul>
                  <li>이서연 29세</li>
                  <li>헤어디자이너</li>
                </ul>
              </div>
            </BoxWrap>
          </div>

          <SectionTitle Left>
            <span>1</span>
            <strong>
              맞춤형 페르소나에 대한
              <br />
              인사이트를 드려요
            </strong>
            <p>
              비즈니스에 적합한 페르소나를 선별해
              <br />
              라이프스타일과 비즈니스 인사이트를 제공해드려요
            </p>
          </SectionTitle>
        </SectionItem>

        <SectionItem>
          <SectionTitle>
            <span>2</span>
            <strong>
              100명의 사용자 의견
              <br />
              보고서를 드려요
            </strong>
            <p>
              사용자 설문조사와 심층 인터뷰를 통해 얻은 데이터로
              <br />
              성별, 연령별로 세분화된 비즈니스 인사이트를 제공해드려요
              <br />
              <span>정식버전 적용 예정</span>
            </p>
          </SectionTitle>
          <p>
            <img src={MainContents1} alt="이미지" style={{ width: "100%" }} />
          </p>
        </SectionItem>

        <SectionItem>
          <SectionTitle>
            <span>3</span>
            <strong>
              시장 현황과 경쟁사도
              <br />
              파악할 수 있어요
            </strong>
            <p>
              비즈니스에서 시장현황은 너무 중요하죠 !!
              <br />
              다양한 주제별로 실제 사용자의견도 확인할 수 있어요
              <br />
              <span>정식버전 적용 예정</span>
            </p>
          </SectionTitle>
          <HoverList>
            <li>
              <img src={Graph1} alt="이미지" />
            </li>
            <li>
              <img src={Graph2} alt="이미지" />
            </li>
            <li>
              <img src={Graph3} alt="이미지" />
            </li>
          </HoverList>
        </SectionItem>
      </Container>

      <TopMove onClick={handleScrollToTop}>맨위로 이동</TopMove>

      <Footer>
        <div>
          <strong>㈜유저커넥트</strong>
          <p>
            사업자 등록번호 : 678-81-01795 | 대표: 박영수
            <br />
            주소 : 경기도 안산시 상록구 해양3로 15, 1514호 (그랑시티
            시그니처타워)
            <br />
            대표전화 : 031-216-5930 | 메일 :{" "}
            <Link to="mailto:weneedyourthinking@gmail.com">
              weneedyourthinking@gmail.com
            </Link>
            <br />
            고객센터 운영시간 : 10:00 ~ 18:00
          </p>
          <p className="copyright">
            Copyright ⓒ 2024 Userconnect Co.,Ltd All rights reserved.
          </p>
        </div>
      </Footer>

      {/* 100회 제안 메세지 */}
      {isPopupOpen_1 && (
        <Popup
          Error
          onClick={(e) => {
            // 팝업 내용 영역인 div를 클릭할 때는 팝업을 닫지 않도록 합니다.
            if (e.target === e.currentTarget) {
              togglePopup();
            }
          }}
        >
          <div>
            <ReportWrap Error>
              <strong>일간 생성 횟수를 초과했습니다</strong>
              <p>
                하루 100명의 AI 페르소나를 생성하고 있습니다.
                <br />
                내일 다시 시도해주세요.
              </p>
              <Button Black onClick={LinkURL}>
                확인
              </Button>
            </ReportWrap>
          </div>
        </Popup>
      )}

      {/* 비즈니스 정보 미입력시 팝업 */}
      {isPopupOpen_2 && (
        <Popup
          Error
          onClick={(e) => {
            // 팝업 내용 영역인 div를 클릭할 때는 팝업을 닫지 않도록 합니다.
            if (e.target === e.currentTarget) {
              togglePopup();
            }
          }}
        >
          <div>
            <ReportWrap Error>
              <strong>
                페르소나 생성을 위해
                <br />
                비즈니스 정보를 입력해주세요
              </strong>
              <Button Black onClick={togglePopup}>
                확인
              </Button>
            </ReportWrap>
          </div>
        </Popup>
      )}

      {/* 비즈니스 설명 100자 이상 입력 시 */}
      {isPopupOpen_3 && (
        <Popup
          Error
          onClick={(e) => {
            // 팝업 내용 영역인 div를 클릭할 때는 팝업을 닫지 않도록 합니다.
            if (e.target === e.currentTarget) {
              togglePopup();
            }
          }}
        >
          한글, 영문 이외의 특수문자는 사용하실수없습니다
          <div>
            <ReportWrap Error>
              <strong>
                비즈니스 정보는 100자 이내로
                <br />
                입력해주세요
              </strong>
              <Button Black onClick={togglePopup}>
                확인
              </Button>
            </ReportWrap>
          </div>
        </Popup>
      )}

      {isPopupOpen_4 && (
        <Popup
          Error
          onClick={(e) => {
            // 팝업 내용 영역인 div를 클릭할 때는 팝업을 닫지 않도록 합니다.
            if (e.target === e.currentTarget) {
              togglePopup();
            }
          }}
        >
          <div>
            <ReportWrap Error>
              <strong>입력하신 정보를 확인해주세요</strong>
              <p>
                한글, 영문 외 특수문자는 입력할 수 없어요. <br />
                자음이나 모음만 입력한 경우 검색이 제한되니,
                <br />
                문장을 완전하게 입력해주세요
              </p>
              <Button Black onClick={togglePopup}>
                확인
              </Button>
            </ReportWrap>
          </div>
        </Popup>
      )}
    </>
  );
};

export default Lending;

const Visual = styled.div`
  position: relative;
  width: 100%;
  // height: 55dvh;
  text-align: center;
  // background: url(${visualImage}) bottom center no-repeat;
  background-size: auto 45vh;
`;

const VisualTitle = styled.h1`
  position: relative;
  width: 100%;
  max-width: 1200px;
  font-size: 3.25rem;
  font-weight: 600;
  letter-spacing: -1px;
  line-height: 1.2;
  margin: 20vh auto 0;

  p > span {
    font-size: 2.13rem;
    font-weight: 500;
    color: ${palette.white};
    letter-spacing: 0;
    display: inline-block;
    padding: 15px 30px;
    margin-left: 20px;
    vertical-align: top;
    transform: rotate(-7deg);
    border-radius: 20px;
    background: ${palette.blue};
  }

  > strong {
    font-size: 5rem;
    font-weight: 700;
  }

  > span {
    display: block;
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 20px;
  }
`;

const VisualBg = styled.div`
  height: 40dvh;
  background: url(${visualImage}) bottom center no-repeat;
  background-size: auto 40dvh;
`;

const CaretTextarea = styled.div`
  max-width: 800px;
  margin: 40px auto 0;

  div {
    position: relative;
    padding: 50px 20px 20px;
    margin-bottom: 20px;
    border-radius: 20px;
    background-color: rgba(4, 83, 244, 0.1);

    &:before,
    &:after {
      position: absolute;
      left: 0;
      top: 20px;
      width: 100%;
      height: 100%;
      max-height: 20px;
      background-repeat: no-repeat;
      background-size: auto 20px;
      content: "";
    }

    &:before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='135' height='22' viewBox='0 0 135 22' fill='none'%3E%3Ccircle cx='11.4158' cy='10.9236' r='9.58763' stroke='black' stroke-opacity='0.2' stroke-width='2'/%3E%3Ccircle cx='42.5876' cy='10.9236' r='9.58763' stroke='black' stroke-opacity='0.2' stroke-width='2'/%3E%3Ccircle cx='73.7673' cy='10.9236' r='9.58763' stroke='black' stroke-opacity='0.2' stroke-width='2'/%3E%3Crect x='99.1953' y='1.33594' width='33.8906' height='19.1758' rx='3' stroke='black' stroke-opacity='0.2' stroke-width='2'/%3E%3Cline x1='123.188' y1='2.29687' x2='123.188' y2='19.5' stroke='black' stroke-opacity='0.2' stroke-width='2'/%3E%3C/svg%3E");
      background-position: left 20px center;
    }

    &:after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='20' viewBox='0 0 48 20' fill='none'%3E%3Crect x='0.140625' y='0.320312' width='47.2363' height='19.1758' rx='9.58789' fill='black' fill-opacity='0.2'/%3E%3Ccircle cx='13.5078' cy='9.91016' r='2.625' fill='black' fill-opacity='0.3'/%3E%3Ccircle cx='23.7578' cy='9.91016' r='2.625' fill='black' fill-opacity='0.3'/%3E%3Ccircle cx='34.0078' cy='9.91016' r='2.625' fill='black' fill-opacity='0.3'/%3E%3C/svg%3E");
      background-position: right 20px center;
    }
  }

  > p {
    font-size: 0.875rem;
    color: ${palette.gray};
    margin: 40px auto;
  }

  strong {
    display: block;
    font-size: 1.5rem;
    text-align: left;
    margin-bottom: 20px;
  }

  textarea {
    min-height: 10vh;
    caret-color: ${palette.blue};
  }

  button {
    width: 60%;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;

  ${(props) =>
    props.Full &&
    css`
      max-width: 100%;
      text-align: left;
      margin-top: 200px;
      padding: 200px 0;
      background: ${palette.lightGray};

      h3 {
        font-size: 3.13rem;
        margin-bottom: 40px;
      }

      > div {
        max-width: 1440px;
        margin: 0 auto;
      }
    `}

  ${(props) =>
    props.FullBg &&
    css`
      position: relative;
      max-width: 100%;
      text-align: left;
      margin-top: 200px;
      padding: 140px 0;

      &:before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${palette.blue};
        opacity: 0.08;
        z-index: -1;
        content: "";
      }

      h3 {
        font-size: 2.75rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 80px;
      }

      > div {
        width: 70%;
      }
    `}

  h2 {
    position: relative;
    font-size: 1.88rem;
    font-weight: 500;
    text-align: center;
    padding: 150px 0;

    strong {
      font-size: 2.75rem;
      font-weight: 700;
      line-height: 1.2;
      margin-top: 40px;
      display: inline-block;

      span {
        font-size: 2.13rem;
        color: ${palette.white};
        letter-spacing: 0;
        display: inline-block;
        padding: 15px 30px;
        margin: 0 15px;
        vertical-align: middle;
        transform: rotate(7deg);
        border-radius: 20px;
        background: ${palette.lightGreen};
      }
    }

    &:before {
      position: absolute;
      left: 50%;
      bottom: 1vw;
      transform: translateX(-50%);
      width: 2px;
      height: 26vh;
      background: ${palette.black};
      // content: "";
    }

    &:after {
      position: absolute;
      left: 50%;
      bottom: 1vw;
      transform: translateX(-50%) rotate(45deg);
      width: 10px;
      height: 10px;
      border-right: 2px solid ${palette.black};
      border-bottom: 2px solid ${palette.black};
      // content: "";
    }
  }
`;

const SectionItem = styled.section`
  + section {
    margin-top: 200px;
  }

  ${(props) =>
    props.Flex &&
    css`
      display: flex;
      justify-content: space-between;

      > div:first-child {
        width: 50%;
      }
      > div:last-child {
        width: 40%;
      }
    `}
`;

const SectionTitle = styled.div`
  font-size: 2rem;
  line-height: 1.3;
  text-align: ${(props) => (props.Left ? "left" : "center")};

  > span {
    position: relative;
    width: 80px;
    height: 80px;
    display: inline-block;
    font-size: 2.25rem;
    font-weight: 900;
    line-height: 80px;
    text-align: center;
    color: ${palette.white};
    border-radius: 50%;
    background: ${palette.blue};
  }

  strong {
    display: block;
    font-size: 2.75rem;
    font-weight: 700;
    margin: 50px auto 40px;
  }

  p {
    font-size: 1.5rem;
    font-weight: 300;
    margin-bottom: 100px;

    span {
      display: inline-block;
      margin-top: 30px;
      padding: 8px 20px;
      border-radius: 50px;
      background: rgba(217, 217, 217, 1);
    }
  }
`;

const BoxWrap = styled.div`
  text-align: left;
  padding: 30px 50px;
  border-radius: 30px;

  ${(props) =>
    props.Card &&
    css`
      display: flex;
      align-items: center;
      gap: 40px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

      + div {
        margin-top: 45px;
      }

      span {
        display: inline-block;
        font-size: 0.875rem;
        font-weight: 500;
        color: ${palette.white};
        padding: 8px 20px;
        border-radius: 50px;
        background: ${palette.lightGreen};
      }

      strong {
        display: block;
        font-size: 1.5rem;
        font-weight: 500;
        line-height: 1.2;
        margin: 20px auto 50px;
      }

      li {
        display: inline-block;

        + li:before {
          display: inline-block;
          width: 1px;
          height: 15px;
          margin: 0 20px;
          vertical-align: middle;
          background: rgba(0, 0, 0, 0.3);
          content: "";
        }
      }
    `}

  ${(props) =>
    props.Profile &&
    css`
      max-width: 440px;
      width: 100%;
      text-align: center;
      padding: 40px;
      border: 1px solid ${palette.lightGray};
    `}
`;

const ProfileImg = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 50%;
  flex-shrink: 0;
  overflow: hidden;

  img {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
  }

  ${(props) =>
    props.BgGray &&
    css`
      width: 230px;
      height: 230px;
      background: ${palette.lightGray};
    `}

  ${(props) =>
    props.BgLightGreen &&
    css`
      width: 270px;
      height: 270px;
      background: ${palette.lightGreen};
    `}
`;

const HoverList = styled.ul`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;

  li {
    position: relative;
    padding: 40px;
    border: 1px solid ${palette.lightGray};
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.5s;

    &:hover {
      margin-top: -60px;
      box-shadow: 0 0 30px rgba(4, 83, 244, 0.3);
    }
  }
`;

const TopMove = styled.div`
  position: relative;
  display: inline-block;
  margin: 100px auto;
  color: ${palette.gray};
  padding-right: 30px;
  cursor: pointer;

  &:after {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' id='Outline' viewBox='0 0 24 24' width='512' height='512' fill='%23ADB5BD'%3E%3Cpath d='M6,6.21a1,1,0,0,0,1.41,0L11,2.58V23a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V2.59l3.62,3.62a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.41L14.13.88a3,3,0,0,0-4.24,0L6,4.8A1,1,0,0,0,6,6.21Z'/%3E%3C/svg%3E");
    background-size: auto 100%;
    background-repeat: no-repeat;
    content: "";
  }
`;

const Footer = styled.div`
  padding: 60px;
  background: rgba(173, 181, 189, 0.2);

  div {
    max-width: 1200px;
    font-size: 0.875rem;
    text-align: left;
    color: ${palette.darkGray};
    line-height: 1.5;
    margin: 0 auto;
  }

  strong {
    display: block;
    margin-bottom: 30px;
  }

  .copyright {
    margin-top: 60px;
  }
`;
