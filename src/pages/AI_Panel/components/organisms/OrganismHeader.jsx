// OrganismHeader.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAtom } from 'jotai';
import { IS_LOGGED_IN } from "../../../../pages/AtomStates"; // Jotai 상태 임포트
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import MoleculeLoginPopup from "../../../Login_Sign/components/molecules/MoleculeLoginPopup"; // 경로 수정
import NotificationIcon from '../../../../assets/images/btnNotification.svg'; // 알림 아이콘 경로

const HeaderWrap = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  border-bottom: 1px solid ${palette.lineGray};
  background: ${palette.white};
  z-index: 99;

  h1 {
    width:250px;
    height:40px;
    font-size:0;
    background:url(${images.Logo}) left center no-repeat;
    background-size:auto 100%;
  a {
      display: block;
      width: 100%;
      height: 100%;
      padding: 0; /* Optional, adjust if needed */
    }
  }

  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 50px;

    a {
      font-size:0.875rem;
      color: ${palette.gray};
    }
  }

  .gnbWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  
    .button, .join {
      padding: 10px 20px;
      border-radius: 30px;
      transition: all 0.5s;
      text-decoration: none;
      color: ${palette.gray};
      font-weight: 700;
      cursor: pointer;
  
      &:hover {
        color: ${palette.white};
        background: ${palette.black};
      }
    }
  
    img {
      width: 20px;
      height: 20px;
    }
  }
`;

const OrganismHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN); // Jotai의 로그인 상태 및 상태 업데이트 함수 구독
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setLoginPopupOpen(true);
  };

  const handleClosePopup = () => {
    setLoginPopupOpen(false);
  };

  const handleLogout = () => {
    // 로그아웃 시 Jotai 상태 업데이트
    setIsLoggedIn(false);
    // 로그아웃 후 추가적인 처리 (예: 리디렉션)
  };

  return (
    <HeaderWrap>
      <h1><a href="/AI_Panel"></a></h1>
      <ul>
        <li><Link to="">맞춤패널 생성</Link></li>
        <li><Link to="">Template</Link></li>
        <li><Link to="">Price</Link></li>
        <li><Link to="">Contents</Link></li>
      </ul>
      <div className="gnbWrap">
        {isLoggedIn ? (
          <>
            <button className="button" onClick={handleLogout}>로그아웃</button>
            <button className="button">
              <img src={NotificationIcon} alt="알림 아이콘" />
            </button>
            <Link to="/myprofile" className="button">내 정보</Link>
          </>
        ) : (
          <>
            <Link to="#" className="button" onClick={handleLoginClick}>로그인</Link>
            <Link to="/signup" className="button">회원가입</Link>
          </>
        )}
      </div>
      {isLoginPopupOpen && <MoleculeLoginPopup onClose={handleClosePopup} />}
    </HeaderWrap>
  );
};

export default OrganismHeader;
