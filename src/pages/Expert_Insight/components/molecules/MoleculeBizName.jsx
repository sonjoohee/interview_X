// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\molecules\MoleculeBizName.jsx
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";

import { useAtom } from "jotai";
import {
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
} from "../../../AtomStates";

const MoleculeBizName = ({ date }) => {
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(
    TITLE_OF_BUSINESS_INFORMATION
  );

  const [isAutoSaveToggle, setIsAutoSaveToggle] = useState(false); // 팝업이 처음에는 닫힌 상태
  const popupRef = useRef(null); // 팝업을 감지하기 위한 ref

  const autoSaveToggle = (event) => {
    event.stopPropagation(); // 내부 클릭 이벤트가 외부로 전파되지 않도록 방지
    setIsAutoSaveToggle((prev) => !prev); // 팝업 열기/닫기
  };

  const formatDate = (lang, timestamp) => {
    let dateObj;
    if (!timestamp) dateObj = new Date(Date.now()); // 새 프로젝트 시작
    else dateObj = new Date(timestamp); // 지난 프로젝트 열기

    const year = dateObj.getFullYear();

    if (lang === "ko") {
      const month = String(dateObj.getMonth() + 1);
      const day = String(dateObj.getDate());
      return `${year}년 ${month}월 ${day}일`;
    } else {
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      return `${year}.${month}.${day}`;
    }
  };

  // 팝업 외부 클릭 시 닫히도록 처리하는 useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsAutoSaveToggle(false); // 외부 클릭 시 팝업 닫기
      }
    };

    if (isAutoSaveToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAutoSaveToggle]);

  return (
    <>
      <BizNameContainer>
        <div>
          <span>
            <img src={images.Graph} alt="" />
          </span>
          <NameTitle Nodata={!inputBusinessInfo}>
            <div>
              <strong>
                {!inputBusinessInfo
                  ? "아이템(아이디어)를 설명해주시면, 분석된 내용이 적용됩니다"
                  : !titleOfBusinessInfo
                  ? inputBusinessInfo
                  : titleOfBusinessInfo}
              </strong>
              {titleOfBusinessInfo && <Badge>Edited by AI</Badge>}
            </div>
            <p>{formatDate("en", date)}</p>
          </NameTitle>
        </div>
        {titleOfBusinessInfo && (
          <button type="button" onMouseDown={autoSaveToggle}>
            내가 쓴 설명 보기
            <img src={images.IconMagic} alt="" />
          </button>
        )}

        {isAutoSaveToggle && (
          <AutosavePopup ref={popupRef}>
            <div>
              <span>일시 : {formatDate("ko", date)}</span>
              <strong>{titleOfBusinessInfo}</strong>
              <p>{inputBusinessInfo}</p>
            </div>
          </AutosavePopup>
        )}
      </BizNameContainer>
    </>
  );
};

export default MoleculeBizName;

const BizNameContainer = styled.div`
  position: sticky;
  // top: 40px;
  top: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // flex-wrap:wrap;
  gap: 20px;
  padding: 16px 20px;
  margin-bottom: 47px;
  text-align: center;
  border-radius: 15px;
  border: 1px solid ${palette.lineGray};
  background: ${palette.white};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  z-index: 98;

  &:before {
    position:absolute;
    left:0;
    top:-41px;
    width:100%;
    height:40px;
    background:${palette.white};
    z-index:-1
    content:'';
  }

  > div {
    display: flex;
    align-items: center;
    gap: 16px;

    > span {
      position: relative;
      flex-shrink: 0;
      width: 42px;
      height: 42px;
      border-radius: 8px;
      background: ${palette.black};

      > img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  > button {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: 8px;
    font-family: "Pretendard", "Poppins";
    font-size: 0.75rem;
    color: ${palette.gray};
    letter-spacing: -1px;
    padding: 8px 16px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
    background: none;
  }
`;

const NameTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  > div {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    font-weight: 700;
    text-align: left;
    color: ${(props) => {
      if (props.Nodata) return palette.gray;
      else return palette.black;
    }};

    strong {
      width: 100%;
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      // word-break: keep-all;
      word-wrap: break-word;
      word-break: break-word;
    }
  }

  p {
    font-size: 0.75rem;
    // color: ${palette.gray};
    color:${palette.gray500};
    text-align: left;
  }
`;

const Badge = styled.div`
  flex-shrink: 0;
  font-size: 0.63rem;
  font-weight: 400;
  color: ${palette.blue};
  text-align: center;
  padding: 2px 6px;
  border-radius: 10px;
  background: #e2e8fe;
`;

const AutosavePopup = styled.div`
  position: absolute;
  // right: ${(props) => (props.isAutoSaveToggle ? "0" : "-70px")};
  right: ${(props) => (props.isAutoSaveToggle ? "0" : "0")};
  top: 70px;
  max-width: 304px;
  max-height: ${(props) => (props.isAutoSaveToggle ? "0" : "1000px")};
  flex-direction: column;
  gap: 20px !important;
  text-align: left;
  padding: ${(props) => (props.isAutoSaveToggle ? "0" : "24px")};
  border-radius: 20px;
  background: ${palette.white};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  visibility: ${(props) => (props.isAutoSaveToggle ? "hidden" : "visible")};
  opacity: ${(props) => (props.isAutoSaveToggle ? "0" : "1")};

  &:before {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0px 20px 12px 20px;
    border-color: transparent transparent ${palette.white} transparent;
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.2));
    content: "";
    zindex: 0;
  }

  strong {
    font-size: 0.75rem;
    font-weight: 700;
    color: ${palette.gray};
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    margin-top: 5px;
  }

  span {
    font-size: 0.63rem;
    font-weight: 300;
    color: ${palette.gray};
  }

  p {
    font-size: 0.75rem;
    line-height: 1.5;
    margin-top: 20px;
  }
`;
