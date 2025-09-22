import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";

const MoleculeTabMenu = ({ activeTab, onSelectTab }) => (
  <StyledTabMenu>
    <Link
      to="#"
      className={activeTab === "aiPanel" ? "active" : ""}
      onClick={() => onSelectTab("aiPanel")}
    >
      <img src={images.Filter} alt="" />
      <span>AI 패널 필터</span>
    </Link>
    <Link
      to="/"
      className={activeTab === "biz" ? "active" : ""}
      onClick={() => onSelectTab("biz")}
    >
      <img src={images.Filter} alt="" />
      <span>비즈니스 맞춤 패널</span>
    </Link>
    <Link
      // to="#"
      // className={activeTab === "instruction" ? "active" : ""}
      // onClick={() => onSelectTab("instruction")}
    >
      <img src={images.Filter} alt="" />
      <span>산업별 프리셋 패널</span>
    </Link>
  </StyledTabMenu>
);

export default MoleculeTabMenu;

const StyledTabMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 56px auto 40px;

  a {
    position: relative;
    color: ${palette.lightGray};
    padding: 0 56px;
    transition: all 0.5s;

    img {
      opacity: 0.3;
      transition: all 0.5s;
    }

    &:hover,
    &.active {
      color: ${palette.black};

      img {
        opacity: 1;
      }
    }

    & + a:before {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 90%;
      background: ${palette.lineGray};
      content: '';
    }
  }

  span {
    display: block;
    margin-top: 8px;
  }
`;
