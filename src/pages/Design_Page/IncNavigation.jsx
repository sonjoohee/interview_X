import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { palette } from "../../assets/styles/Palette";
import images from "../../assets/styles/Images";
import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import axios from "axios";
import { SubtractiveBlending } from "three/src/constants.js";

const IncNavigation = () => {
  const [showSubNav, setShowSubNav] = useState(false);

  const handleWorkManageClick = () => {
    setShowSubNav(!showSubNav);
  };

  const handleCloseSubNav = () => {
    setShowSubNav(false);
  };

  return (
    <>
      <NavigationWrap>
        <Logo />

        <MenuList>
          <li>
            <img src={images.PlusSquareWhite} alt="새작업" />
            <span>새작업</span>
          </li>

          <li>
            <img src={images.Folder} alt="작업관리" />
            <span>작업관리</span>
          </li>

          <li onClick={handleWorkManageClick}>
            <img src={images.Clock} alt="대화내역" />
            <span>대화내역</span>
          </li>
        </MenuList>

        <Setting />
      </NavigationWrap>

      <SubNavigation show={showSubNav}>
        <SubTitle>
          <div>
            <img src={images.ClockCounterclockwise} alt="" />
            Explore 사용 내역
          </div>
          <img src={images.IconClose2} alt="닫기" onClick={handleCloseSubNav} />
        </SubTitle>

        <HistoryWrap>
          <HistoryList>
            <strong>최근 대화</strong>
            <ul>
              <li>
                <p>홈케어 뷰티 디바이스와 기능성</p>
                <span />
              </li>
              <li>
                <p>홈케어 뷰티 디바이스와 기능성</p>
                <span />
              </li>
            </ul>
          </HistoryList>

          <HistoryList>
            <strong>지난 7일 대화</strong>
            <ul>
              <li>
                <p>홈케어 뷰티 디바이스와 기능성</p>
                <span />
              </li>
            </ul>
          </HistoryList>
        </HistoryWrap>
      </SubNavigation>
    </>
  );
};

export default IncNavigation;

const NavigationWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  max-width: 64px;
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  padding: 20px 8px;
  border: 1px solid ${palette.outlineGray};
  background: ${palette.chatGray};
  z-index: 101;
`;

const Logo = styled.div`
  width: 32px;
  height: 50px;
  background: url(${images.LogoVerticality}) no-repeat center;
  background-size: cover;
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  span {
    font-size: 0.63rem;
    font-weight: 300;
    color: ${palette.gray700};
  }
`;

const Setting = styled.div`
  width: 22px;
  height: 22px;
  margin-top: auto;
  background: ${palette.primary};
`;

const SubNavigation = styled.div`
  position: fixed;
  top: 0;
  left: 64px;
  max-width: 250px;
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 32px;
  padding: 20px 16px;
  border-right: 1px solid ${palette.outlineGray};
  background: ${palette.white};
  z-index: 100;
  transform: translateX(${(props) => (props.show ? "0" : "-100%")});
  transition: transform 0.3s ease-in-out;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;

  div {
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 1.5;
    color: ${palette.gray700};
  }

  > img {
    margin-left: auto;
    cursor: pointer;
  }
`;

const HistoryWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;

  strong {
    font-size: 0.875rem;
    font-weight: 300;
    color: #393939;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.875rem;
    color: #393939;
    padding: 8px 12px;
    cursor: pointer;

    &:before {
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 2px;
      background: #cecece;
      transition: all 0.5s;
      content: "";
    }

    &:hover {
      &:before {
        background: ${palette.primary};
      }
    }

    p {
      width: 78%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    span {
      width: 10px;
      height: 10px;
      display: block;
      margin-left: auto;
      background: #cecece;
    }
  }
`;
