import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import images from "../../assets/styles/Images";
import { palette } from "../../assets/styles/Palette";

const IncHeader = () => {
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleAlertToggle = () => {
    if (showAlert) {
      setIsClosing(true);
      setTimeout(() => {
        setShowAlert(false);
        setIsClosing(false);
      }, 300);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <>
      <HeaderWrap>
        {location.pathname === "/BusinessAnalysis" && (
          <h1>쉽고 빠른 개인 금융업무 지원 모바일 서비스</h1>
        )}

        <div className="gnb">
          <Notify Alarm onClick={handleAlertToggle}>
            <img src={images.IconBell} alt="" />
          </Notify>
          {/* <div className="userInfo">
            유저프로필
          </div> */}
        </div>
      </HeaderWrap>

      {showAlert && (
        <AlertToogle className={isClosing ? 'closing' : ''}>
          <AlertHeader>알림</AlertHeader>

          <AlertContent>
            <Messageox>
              <img src={images.CheckMark} alt="" />
              <Message>
                <MessageContent>
                  <p>요청하신 <strong>5명의 커스터마이즈 페르소나</strong>가 준비되었습니다.<br />바로 인터뷰를 진행해보세요. </p>
                  <span>2024.12.09 at 10:15am</span>
                </MessageContent>

                <ButtonWrap>
                  <Button>페르소나 확인</Button>
                </ButtonWrap>
              </Message>
            </Messageox>

            <Messageox>
              <img src={images.CheckMark} alt="" />
              <Message>
                <MessageContent>
                  <p>요청하신 <strong>5명의 커스터마이즈 페르소나</strong>가 준비되었습니다.<br />바로 인터뷰를 진행해보세요. </p>
                  <span>2024.12.09 at 10:15am</span>
                </MessageContent>

                <ButtonWrap>
                  <Button>페르소나 확인</Button>
                </ButtonWrap>
              </Message>
            </Messageox>
          </AlertContent>
        </AlertToogle>
      )}
    </>
  );
};

export default IncHeader;

const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display:flex;
  align-items: center;
  padding:10px 28px;
  border-bottom: 1px solid ${palette.lineGray};
  background: ${palette.white};
  z-index: 99;

  h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size:1rem;
  }

  .gnb {
    display:flex;
    align-items: center;
    gap: 24px;
    margin-left: auto;
  }

  .userInfo {
    width: 36px;
    height: 36px;
    font-size: 0;
    font-weight: 500;
    border-radius: 100px;
    background: ${palette.gray200};
  }
`;

const Notify = styled.div`
  position: relative;
  cursor: pointer;

  ${props => props.Alarm && css`
    &::after {
      position: absolute;
      top: -5px;
      right: -5px;
      width: 6px;
      height: 6px;
      background: ${palette.red};
      border-radius: 100px;
      content: '';
      animation: blink 1.5s infinite;
    }

    @keyframes blink {
      0% { opacity: 1; }
      50% { opacity: 0; }
      100% { opacity: 1; }
    }
  `}
`;

const AlertToogle = styled.div`
  position: fixed;
  top: 40px;
  right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 396px;
  width: 100%;
  margin-top: 20px;
  border-radius: 15px;
  background: ${palette.white};
  filter: drop-shadow(0px 4px 30px rgba(0, 0, 0, 0.15));
  z-index: 99;
  animation: fadeIn 0.3s ease-in-out;

  &.closing {
    animation: fadeOut 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }

  &:before {
    position: absolute;
    top: -10px;
    right: 70px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${palette.white};
    content: '';
  }
`;

const AlertHeader = styled.div`
  width: 100%;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;
  padding: 20px 16px;
  border-bottom: 1px solid ${palette.outlineGray};
`;

const AlertContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const Messageox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 16px;
  transition: all 0.5s;

  > img {
    width: 28px;
    height: 28px;
  }

  & + & {
    border-top: 1px solid ${palette.outlineGray};
  }

  &:hover {
    background: rgba(34, 111, 255, 0.04);
  }
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  p {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray800};
    text-align: left;
  }

  strong {
    font-weight: 500;
  }

  span {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray500};
    text-align: left;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

const Button = styled.div`
  font-size: 0.75rem;
  line-height: 1.2;
  color: ${palette.primary};
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid ${palette.primary};
  background: ${palette.white};
`;

