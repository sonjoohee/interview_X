import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";

import images from "../../assets/styles/Images";
import { palette } from "../../assets/styles/Palette";
import IncNavigation from "./IncNavigation";
import Header from "./IncHeader";

const PageConnetWithYouTarget  = () => {
  return (
    <>
      <ContentsWrap>
        <IncNavigation />

        <Header />

        <MainContent MainSearch>
          <MainSearchWrap MainSearch>
            <Title>
              Connet with Your Target
              <p>타겟 페르소나와 소통하고, 비즈니스 인사이트를 확인하세요</p>
            </Title>

            <InputWrap>
              <div className="inputWrap">
                <textarea
                  rows={4}
                  placeholder="비즈니스 설명을 입력하면, 최적의 페르소나를 제안해드려요"
                  onInput={(e) => {
                    // 입력값을 최대 300자로 제한
                    if (e.target.value.length > 300) {
                      e.target.value = e.target.value.substring(0, 300);
                    }

                    // 글자 수 표시
                    const currentLength = e.target.value.length;
                    document.getElementById(
                      "letterCount"
                    ).innerText = `${currentLength}/300`;
                  }}
                ></textarea>
                <button type="button">
                  검색
                </button>
              </div>
              <div className="maxLetter">
                <span id="letterCount">0/300</span>
              </div>
            </InputWrap>
          </MainSearchWrap>

          <ExpertSelectWrap>
            <ExpertSelectBox>
              <ExpertCard>
                <strong>PoC 설계 전문가</strong>
                <p>아이템 및 PoC 목적에 따른 가설 검증 방법 제시</p>
                <span>
                <img src={images.ImgPoC} alt="" />
                </span>
              </ExpertCard>

              <ExpertCard>
                <strong>마케팅 전략가</strong>
                <p>아이템 및 PoC 목적에 따른 가설 검증 방법 제시</p>
                <span>
                <img src={images.ImgMarketing} alt="" />
                </span>
              </ExpertCard>

              <ExpertCard>
                <strong>고객 세분화 전문가</strong>
                <p>고객 세분화와 맞춤 전략 제시</p>
                <span>
                  <img src={images.ImgClient} alt="" />
                </span>
              </ExpertCard>

              <ExpertCard>
                <strong>전략 컨설턴트</strong>
                <p>마케팅 방향성과 실행 방안 제시</p>
                <span>
                  <img src={images.ImgStrategy} alt="" />
                </span>
              </ExpertCard>
            </ExpertSelectBox>
          </ExpertSelectWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PageConnetWithYouTarget;

// 스타일 정의는 기존대로 유지
const ContentsWrap = styled.div`
  position: relative;
  // width: ${(props) => (props.isMobile ? "100%" : "calc(100% - 40px)")};
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  gap: ${(props) => (props.isMobile ? "20px" : "40px")};
  padding: ${(props) => (props.isMobile ? "20px" : "0")};
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  width: 100%;
  justify-content:${props => {
    if (props.MainSearch) return `center`;
    else return `flex-start`;
  }};
  margin: 57px auto 0;
  // padding: ${(props) => (props.isMobile ? "0" : "0 20px")};
`;

const MainSearchWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:${props => {
    if (props.MainSearch) return `center`;
    else return `flex-start`;
  }};
  gap:22px;
  height:85dvh;
`;

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  font-size: ${(props) => (props.isMobile ? "1.5rem" : "2.25rem")};
  font-weight: 600;
  // margin: ${(props) => (props.isMobile ? "40px auto 30px" : "120px auto 55px")};

  p {
    font-size: ${(props) => (props.isMobile ? "0.75rem" : "0.875rem")};
    font-weight: 300;
  }
`;

const InputWrap = styled.div`
  // max-width:1000px;
  max-width: ${(props) => (props.isMobile ? "100%" : "608px")};
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border-radius: 20px;
  border: 1px solid ${palette.lineGray};
  background: ${palette.white};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  .inputWrap {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    // padding:28px 38px;
    padding: ${(props) => (props.isMobile ? "20px" : "28px")};

    textarea {
      width: 100%;
      height: 40px;
      font-family: "Pretendard", "Poppins";
      font-size: 1rem;
      outline: 0;
      border: 0;
      resize: none;

      &::placeholder {
        font-size: 1rem;
        color: #A9A9A9;
      }
    }

    button {
      flex-shrink: 0;
      width: 27px;
      height: 27px;
      font-family: "Pretendard", "Poppins";
      font-size: 0;
      border: 0;
      background: url(${images.IconSearch}) center no-repeat;
      transition: all 0.5s;

      &:hover {
        background: url(${images.IconSearchHover}) center no-repeat;
      }
    }
  }

  .maxLetter {
    display: flex;
    justify-content: flex-end;
    font-size: 0.75rem;
    color: ${palette.gray500};
    padding: 15px 35px;
    border-top: 1px solid ${palette.lineGray};
    background: #ebf3fe;
  }
`;

const ExpertSelectWrap = styled.div`
  position: relative;
  // max-width: 1040px;
  max-width: 815px;
  width: 100%;
  margin: 0 auto 40px;

  h2 {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 22px;
  }

  a {
    font-size: 1.25rem;
    text-decoration: underline;
    color: ${palette.black};

    &:hover {
      color: ${palette.black};
    }
  }
`;

const ExpertSelectBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  justify-content: space-between;
  gap: ${(props) => (props.isMobile ? "10px" : "15px")};
  // margin-bottom:30px;

  > div {
    flex: ${(props) => (props.isMobile ? "1 1 auto" : "1 1 18%")};
  }
`;

const ExpertCard = styled.div`
  visibility: ${(props) => (props.Empty ? "hidden" : "visible")};
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: ${(props) => (props.isMobile ? "auto" : "215px")};
  text-align: left;
  padding: ${(props) => (props.isMobile ? "20px 15px" : "26px 20px")};
  border-radius: 16px;

  border: ${(props) => {
    if (props.select) return `1px solid ${palette.blue}`;
    else if (props.Coming) return `none`;
    // else if (props.PoC) return `1px solid #E2E7EA`;
    // else if (props.Marketing) return `1px solid #F0EDE6`;
    // else if (props.Client) return `1px solid #E2E7EA`;
    // else if (props.Strategy) return `1px solid #E0E5DF`;
    // else if (props.Idea) return `1px solid #DAE1F1`;
    // else if (props.Hacker) return `1px solid #EDE9DE`;
    // else if (props.Biz) return `1px solid #CCDAE0`;
    // else if (props.BM) return `1px solid #EEE7E7`;
    // else if (props.Price) return `1px solid #E8E2EA`;
    // else if (props.Survey) return `1px solid #E7E9EE`;
    // else return `1px solid ${palette.gray100}`;
    else return `1px solid ${palette.chatGray}`;
  }};
  background: ${(props) => {
    if (props.select) return palette.blue;
    else if (props.Coming) return `rgba(0,0,0,.03)`;
    // else if (props.PoC) return `#E2E7EA`;
    // else if (props.Marketing) return `#F0EDE6`;
    // else if (props.Client) return `#E2E7EA`;
    // else if (props.Strategy) return `#E0E5DF`;
    // else if (props.Idea) return `#DAE1F1`;
    // else if (props.Hacker) return `#EDE9DE`;
    // else if (props.Biz) return `#CCDAE0`;
    // else if (props.BM) return `#EEE7E7`;
    // else if (props.Price) return `#E8E2EA`;
    // else if (props.Survey) return `#E7E9EE`;
    // else return palette.gray100;
    else return palette.chatGray;
  }};

  box-shadow: ${(props) => {
    if (props.select) return `0 4px 30px rgba(0, 0, 0, 0.1)`;
    else return `none`;
  }};
  cursor: ${(props) => {
    if (props.Coming) return `auto`;
    else return `pointer`;
  }};
  pointer-events: ${(props) => {
    if (props.Coming) return `auto`;
    else return `auto`;
  }};
  transition: all 0.5s;

  span {
    position: relative;
    width: 70px;
    height: 70px;
    margin: 0 auto;
    margin-top: auto;
    // border-radius: 100px;
    // border: 1px solid ${palette.lineGray};
    // background: ${palette.white};

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  p {
    font-size: 0.75rem;
    font-weight: 400;
    color: ${(props) => (props.select ? palette.white : palette.gray500)};
  }

  strong {
    font-family: "Pretendard", "Poppins";
    font-size: 1rem;
    font-weight: 700;
    color: ${(props) => (props.select ? palette.white : palette.darkGray)};
    letter-spacing: -1px;
    line-height: 1.2rem;
    min-height: 1.2rem;
  }

  &:hover {
    border: 1px solid ${palette.blue};
    background: ${palette.blue};

    p,
    strong {
      color: ${palette.white};
    }
  }

  ${(props) =>
    props.More &&
    css`
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 16px;
        height: 100%;

        span {
          position: relative;
          font-size: 0;
          border: 0;

          &:before,
          &:after {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 5px;
            border-radius: 2px;
            background: #e8e8e8;
            content: "";
          }
          &:before {
            width: 20px;
            height: 5px;
          }
          &:after {
            width: 5px;
            height: 20px;
          }
        }

        p {
          color: ${palette.gray};
          margin-top: 0;
        }
      }

      &:hover {
        border: none;
        background: rgba(0, 0, 0, 0.03);

        p,
        strong {
          color: ${palette.gray};
        }
      }
    `}

  ${(props) =>
    props.Coming &&
    css`
      align-items: center;

      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin: auto;
      }

      span {
        position: relative;
        font-size: 0;
        border: 0;
      }

      &:hover {
        border: none;
        background: rgba(0, 0, 0, 0.03);

        p,
        strong {
          color: ${palette.gray};
        }
      }
    `}
`;
