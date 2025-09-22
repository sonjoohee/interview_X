import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";
import { Button } from "../../assets/styles/ButtonStyle";
import StepIndicator from "./IncStepIndicator";
import PopupWrap from "../../assets/styles/Popup";
import ToastPopupWrap from "../../assets/styles/ToastPopup";

const IncSidebar = () => {
  const [showInterview, setShowInterview] = useState(false);
  const [showInterviewReady, setShowInterviewReady] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowInterview(location.pathname === '/WayInterview');
  }, [location.pathname]);

  const getStepsAndProgress = (pathname) => {
    switch(pathname) {
      case '/BusinessAnalysis':
        return {
          progress: 20,
          steps: [
            { number: 1, label: '비즈니스 분석', active: true },
            { number: 2, label: '맞춤 페르소나 추천', active: false },
            { number: 3, label: '인터뷰 방법 선택', active: false },
            { number: 4, label: '페르소나와 인터뷰', active: false },
            { number: 5, label: '의견 분석', active: false }
          ]
        };
      case '/CustomizePersona':
        return {
          progress: 40,
          steps: [
            { number: 1, label: '비즈니스 분석', active: true },
            { number: 2, label: '맞춤 페르소나 추천', active: true },
            { number: 3, label: '인터뷰 방법 선택', active: false },
            { number: 4, label: '페르소나와 인터뷰', active: false },
            { number: 5, label: '의견 분석', active: false }
          ]
        };
      case '/WayInterview':
        return {
          progress: 60,
          steps: [
            { number: 1, label: '비즈니스 분석', active: true },
            { number: 2, label: '맞춤 페르소나 추천', active: true },
            { number: 3, label: '인터뷰 방법 선택', active: true },
            { number: 4, label: '페르소나와 인터뷰', active: false },
            { number: 5, label: '의견 분석', active: false }
          ]
        };
      case '/InterviewResult':
        return {
          progress: 80,
          steps: [
            { number: 1, label: '비즈니스 분석', active: true },
            { number: 2, label: '맞춤 페르소나 추천', active: true },
            { number: 3, label: '인터뷰 방법 선택', active: true },
            { number: 4, label: '페르소나와 인터뷰', active: true },
            { number: 5, label: '의견 분석', active: false }
          ]
        };
      default:
        return {
          progress: 0,
          steps: []
        };
    }
  };

  const { progress, steps } = getStepsAndProgress(location.pathname);

  const handlePopupClose = () => {
    setShowInterviewReady(false);
    setShowToast(false);
  }

  return (
    <>
      <Sidebar>
        <h5>Let's Start Now</h5>

        <ProgressBar>
          <span>🚀</span>
          <Progress progress={progress} />
          <span>{progress}%</span>
        </ProgressBar>

        <StepIndicator steps={steps} />

        <InterviewRoom showInterview={showInterview}>
          <ul>
            <li>
              <span>방식</span>
              <p>1:N 인터뷰</p>
            </li>
            <li>
              <span>목적</span>
              <p>제품 경험 평가</p>
            </li>
            <li>
              <span>참여자</span>
              <p>5명</p>
            </li>
          </ul>
          <Button Large Primary Fill onClick={() => setShowInterviewReady(true)}>인터뷰룸 입장</Button>
        </InterviewRoom>
      </Sidebar>

      {showInterviewReady && (
        <PopupWrap 
          Check
          title="인터뷰 준비 완료" 
          message={
            <>
              인터뷰 룸 이동 시, 바로 시작됩니다.<br />
              인터뷰를 중단하면 모든 내역이 삭제되니 주의하세요
            </> 
          }
          buttonType="Outline"
          closeText="취소"
          confirmText="시작하기"
          isModal={false}
          onCancel={handlePopupClose}
          onConfirm={() => {
            handlePopupClose();
            setShowToast(true);
          }}
        />
      )}
      
      {showToast && (
        <ToastPopupWrap 
          isActive={showToast}
          onClose={() => setShowToast(false)}
        />
      )}

    </>
  );
};

export default IncSidebar;

const Sidebar = styled.div`
  position: sticky;
  top: 101px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 16px;
  width: 290px;
  padding: 16px 20px;
  border-radius: 10px;
  background: ${palette.chatGray};

  h5{
    font-size: 0.88rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${palette.gray700};
    text-align: left;
  }

`;

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  span {
    font-size: 0.75rem;
    line-height: 1.5;
    color: ${palette.gray700};
  }
`;

const Progress = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 20px;
  background: ${palette.outlineGray};
  
  &:before {
    display: block;
    width: ${props => props.progress}%;
    height: 100%;
    border-radius: 20px;
    background: ${palette.primary};
    content: '';
  }
`;

const InterviewRoom = styled.div`
  display: ${props => props.showInterview ? 'flex' : 'none'};
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid ${palette.outlineGray};

  ul {
    display: flex;
    flex-direction: column;
    gap: 12px;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.875rem;
      line-height: 1.5;
      color: ${palette.gray700};

      span {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      
      p {
        text-align: right;
      }
    }
  }
`;
