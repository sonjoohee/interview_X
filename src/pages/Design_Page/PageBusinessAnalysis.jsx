import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";

import { Button } from "../../assets/styles/ButtonStyle";
import images from "../../assets/styles/Images";
import { palette } from "../../assets/styles/Palette";
import {
  ContentsWrap,
  MainContent,
  AnalysisWrap,
  MainSection,
  CardWrap,
} from "../../assets/styles/BusinessAnalysisStyle";

import OrganismLeftSideBar from "../Expert_Insight/components/organisms/OrganismLeftSideBar";
import Header from "./IncHeader";
import Sidebar from "./IncSidebar";
import AnalysisInfo from "./PageAnalysisInfo";
import PopupWrap from "../../assets/styles/Popup";
import ToastPopupWrap from "../../assets/styles/ToastPopup";
import IncNavigation from "./IncNavigation";

const PageBusinessAnalysis = () => {
  const [state, setState] = useState({
    showPersona: false,
    showInterview: false,
    showCustomizePersona: false,
    selectedInterviewType: "",
    activeCategory: 1,
    showCardContent: true,
    showEditCard: false,
    showCustomModal: false,
    showInterviewReady: false,
    progress: 25,
    steps: [
      { number: 1, label: "비즈니스 분석", active: true },
      { number: 2, label: "맞춤 페르소나 추천", active: false },
      { number: 3, label: "인터뷰 방법 선택", active: false },
      { number: 4, label: "페르소나와 인터뷰", active: false },
      { number: 5, label: "의견 분석", active: false },
    ],
    inputs: {
      field1: {
        value: "쉽고 빠른 개인 금융업무 지원 모바일 서비스",
        isValid: false,
        isError: false,
        errorMessage: "",
      },
      field2: {
        value:
          "이 애플리케이션은 사용자가 쉽고 빠르게 송금 및 이체를 할 수 있도록 돕는 것을 목표로 합니다.",
        isValid: false,
        isError: false,
        errorMessage: "",
      },
      field3: { value: "", isValid: false, isError: false, errorMessage: "" },
    },
  });

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [state.inputs.field2.value]);

  const [showToast, setShowToast] = useState(false);
  const [showInterviewReady, setShowInterviewReady] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const handlePopupClose = () => {
    setShowPopup(false);
    setShowInterviewReady(false);
  };

  const handleButtonClick = () => {
    window.location.href = "/CustomizePersona"; // 버튼 클릭 시 이동할 경로
  };

  // 부모 스크롤 비활성화
  useEffect(() => {
    if (showToast) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showToast]);

  return (
    <>
      <ContentsWrap>
        <IncNavigation />

        <Header />

        <MainContent>
          <AnalysisWrap>
            <MainSection>
              <AnalysisInfo showButtons={true} />

              <CardWrap>
                <CreateCard>
                  <p>
                    <img src={images.PeopleChatSquareFill} alt="" />
                    나의 비즈니스 고객은 누구일까요? 그리고 어떤 생각을 하고
                    있을까요?
                    <br />
                    당신의 타겟 고객에게 바로 물어보세요
                  </p>

                  <Button Large Primary Fill Round onClick={handleButtonClick}>
                    페르소나 추천 받기
                    <img src={images.MagicStickFillWhite} alt="" />
                  </Button>
                </CreateCard>
              </CardWrap>
            </MainSection>

            <Sidebar />

            {showPopup && (
              <PopupWrap
                Warning
                title="Request 상태의 페르소나는 선택이 제한됩니다."
                message="인터뷰를 진행하려면 모집 요청을 먼저 진행해주세요"
                buttonType="Outline"
                closeText="확인"
                isModal={false}
                onCancel={handlePopupClose}
              />
            )}

            {showInterviewReady && (
              <PopupWrap
                Check
                title="인터뷰 준비 완료"
                message={
                  <>
                    인터뷰 룸 이동 시, 바로 시작됩니다.
                    <br />
                    인터뷰를 중단하면 모든 내역이 삭제되니 주의하세요
                  </>
                }
                buttonType="Outline"
                closeText="취소"
                confirmText="시작하기"
                isModal={false}
                onCancel={handlePopupClose}
                onConfirm={() => {
                  handlePopupClose(); // 팝업 닫기
                  setShowToast(true); // ToastPopupWrap 보이기
                }}
              />
            )}

            {showToast && <ToastPopupWrap />}

            {/* 
<PopupWrap 
  TitleFlex
  title="📝 맞춤형 페르소나 모집 요청하기" 
  onConfirm={() => {
    setState(prev => ({ ...prev, showCustomModal: false }));
    handleConfirm();
  }} 
  onCancel={() => {
    setState(prev => ({ ...prev, showCustomModal: false }));
    handleCancel();
  }}
  buttonType="Fill"
  closeText="닫기"
  confirmText="편집완료"
  isModal={true}
  body={
    <>
      <Title>
        <p>
          Selected
          <span onClick={() => setState(prev => ({ ...prev, showCustomModal: true }))}>
            <img src={images.ClockCounterclockwise} alt="" />
            이전으로 되돌리기
          </span>
        </p>
      </Title>
      <PersonaCard 
        TitleFlex
        title="가족과 함께 여가를 보내는 활동 지향형 소비자"
        keywords={['키워드1', '키워드2', '키워드3']}
        isBasic={true}
        checked={true}
      />
      <PersonaCard 
        TitleFlex
        title="가족과 함께 여가를 보내는 활동 지향형 소비자"
        keywords={['키워드1', '키워드2', '키워드3']}
        isBasic={true}
        checked={true}
      />

      <Title style={{marginTop: '20px'}}>
        <p>
          available
        </p>
      </Title>
      <PersonaCard 
        TitleFlex
        title="가족과 함께 여가를 보내는 활동 지향형 소비자"
        keywords={['키워드1', '키워드2', '키워드3']}
        isBasic={true}
        checked={true}
      />
      <PersonaCard 
        TitleFlex
        title="가족과 함께 여가를 보내는 활동 지향형 소비자"
        keywords={['키워드1', '키워드2', '키워드3']}
        isBasic={true}
        checked={true}
      />
      
    </>
  }
/> */}
          </AnalysisWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PageBusinessAnalysis;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 24px;
  border-radius: 15px;
  border: 1px solid ${palette.outlineGray};
  background: ${palette.white};
`;

const CreateCard = styled(Card)`
  align-items: center;
  padding: 44px 24px;

  p {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    line-height: 1.5;
    color: ${palette.gray500};
  }
`;
