import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import styled, { css, ThemeProvider } from "styled-components";
import theme from "../../../../assets/styles/Theme";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import Landingimages from "../../../../assets/styles/Landingimages";
import { createChatOnServer } from "../../../../utils/indexedDB";
import PopupWrap from "../../../../assets/styles/Popup";

import {
  INPUT_BUSINESS_INFO,
  IS_LOGGED_IN,
  LOGIN_SUCCESS,
  ANALYSIS_BUTTON_STATE,
  CONVERSATION_ID,
  IS_MARKETING,
  MARKETING_HAVE_IEDA,
  SELECTED_EXPERT_INDEX,
  PERSONA_STEP,
} from "../../../AtomStates";
import axios from "axios";
import { useSaveConversation } from "../../../Expert_Insight/components/atoms/AtomSaveConversation";

const PageMarketLanding = () => {
  const location = useLocation();
  const { saveConversation } = useSaveConversation();
  const navigate = useNavigate();
  const [inputBusinessInfo, setInputBusinessInfo] =
    useAtom(INPUT_BUSINESS_INFO);
  const [analysisButtonState, setAnalysisButtonState] = useAtom(
    ANALYSIS_BUTTON_STATE
  );
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [, setLoginSuccess] = useAtom(LOGIN_SUCCESS);
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [isMarketing, setIsMarketing] = useAtom(IS_MARKETING);
  const [marketingHaveIdea, setMarketingHaveIdea] =
    useAtom(MARKETING_HAVE_IEDA);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(
    SELECTED_EXPERT_INDEX
  );

  const [personaStep, setPersonaStep] = useAtom(PERSONA_STEP);
  const [isHomePopupOpen, setIsHomePopupOpen] = useState(false);
  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false);
  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const handleSubmit = async (type) => {
    if (!isLoggedIn) {
      try {
        // 로그인 요청
        const response = await axios.get(
          "https://wishresearch.kr/api/user/marketing/",
          axiosConfig
        );

        const accessToken = response.data.access_token;

        // accessToken을 세션 스토리지에 저장
        sessionStorage.setItem("accessToken", accessToken);
      } catch (error) {
       
      }
    }

    const newConversationId = await createChatOnServer();
    setConversationId(newConversationId); // 생성된 대화 ID 설정

    setIsMarketing(true);
    setMarketingHaveIdea(type);
    setSelectedExpertIndex("11");

    if (type === true) {
      navigate("/MarketingSetting/1");
    } else {
      navigate("/MarketingSetting/2");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 30) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleExitCancel = () => {
    setIsExitPopupOpen(false);
  };

  const handleExitConfirm = () => {
    window.location.href = "/";
  };

  const handleClickHome = () => {
    // console.log("test logo click");
    if (location.pathname !== "/") {
      setIsHomePopupOpen(true);
    }
  };

  const handleCloseHomePopup = () => {
    setIsHomePopupOpen(false);
  };

  const handleConfirmAndNavigate = () => {
    handleNewProjectClick();
    setIsHomePopupOpen(false);
  };
  //새작업 버튼 클릭 시 호출되는 함수
  const handleNewProjectClick = () => {
    // if (!isLoggedIn) {
    //   setIsPopupLogin(true);
    //   return;
    // }

    // if (isLoading) {
    //   setIsExitPopupOpen(true);
    //   return;
    // }

    setPersonaStep(0);

    window.location.href = "/";
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <Link onClick={() => handleClickHome()}>
          <Logo />
        </Link> */}
        <Navbar>
          <h1 className="pc" onClick={() => setIsExitPopupOpen(true)}>
            <img src={images.SymbolLogoWhite} alt="" />
          </h1>
          <h1 className="mobile" onClick={() => setIsExitPopupOpen(true)}></h1>
        </Navbar>
        <MainVisual>
          <p>
            Turn your<span>Ideas</span>
            <br />
            into <em>Reality</em>
          </p>
          <VisualImg>
            <i className="img01"></i>
            <i className="img02"></i>
            <i className="img03"></i>
            <div className="txt01">
              <span>중견기업 7년차 과장</span>
              <p>
                지금 다니는 회사에 계속
                <br />
                의존하기엔 미래가 너무 불확실해요 ㅠ
              </p>
            </div>
            <div className="txt02">
              <p>어?! 이거 창업하면 되겠는데?</p>
              <span>5년차 전역 대위</span>
            </div>
            <div className="txt03">
              <p>머릿속에만 있던 아이디어를 현실로 만들어보고 싶어요</p>
              <span>창업 동아리 팀원</span>
            </div>
          </VisualImg>

          <StartIdeaWrap isFixed={isFixed}>
            {/* <p>시작하고 싶은 아이디어가 있으신가요?</p> */}
            <p>당신의 창업 유형을 확인해 보세요!</p>
            <div>
              {/* <Link to="#" onClick={() => handleSubmit(true)}>
                <span>💡</span>네! 있어요
              </Link>
              <Link to="#" onClick={() => handleSubmit(false)}>
                <span>🔎</span>아직 없어요
              </Link> */}
              <Link to="#" onClick={() => handleSubmit(false)}>
                <span>🔎</span>
                {"  "}창업{"  "}MBTI{"  "}진단하기{"  "}
              </Link>
            </div>
          </StartIdeaWrap>
        </MainVisual>
        <Section Bg>
          <p>
            좋은 아이디어가 떠올라도 막상 실행으로 옮기지 못했나요?
            <br />
            AI와 함께 사업의 첫걸음을 내디뎌 보세요 🚀
          </p>
        </Section>
        <Section>
          <div>
            <h3>
              아이디어를
              <br />
              돈이 되는 사업으로
            </h3>
            <p>
              시장 분석부터 잠재고객 확인까지 한 번에 해결!
              <br />
              아이디어만 던져주면, 차근차근 발전시키는 과정을 알려드릴게요.
              <br />
              창업의 시작 방법을 알려드릴게요
            </p>
            <img src={Landingimages.ImgMarketing01} alt="" />
          </div>

          <div>
            <h3>
              나에게 딱 맞는
              <br />
              사업 찾기
            </h3>
            <p>
              10초 만에 확인하는 당신의 창업 DNA!
              <br />
              AI가 분석한 성향별 맞춤 사업 아이템으로 시뮬레이션하고
              <br />
              자신만의 길을 발견해보세요{" "}
            </p>
            <img src={Landingimages.ImgMarketing02} alt="" />
          </div>
        </Section>
        {isExitPopupOpen && (
          <PopupWrap
            Warning
            title="홈으로 이동하시겠습니까?"
            buttonType="Outline"
            closeText="아니요"
            confirmText="이동하기"
            isModal={false}
            onCancel={handleCloseHomePopup}
            // onClose={handleCloseHomePopup}
            onConfirm={handleConfirmAndNavigate}
          />
          // <Popup Cancel>
          //   <div>
          //     <button
          //       type="button"
          //       className="closePopup"
          //       onClick={handleExitCancel}
          //     >
          //       닫기
          //     </button>
          //     <span>
          //       <img src={images.ExclamationMarkRed} alt="" />
          //     </span>
          //     <p>
          //       <strong>모든 내용이 삭제됩니다</strong>
          //       <span>
          //         종료 또는 새로고침 할 경우, 모든 대화내역이 사라집니다.
          //       </span>
          //     </p>
          //     <div className="btnWrap">
          //       <button type="button" onClick={handleExitCancel}>
          //         계속 진행하기
          //       </button>
          //       <button type="button" onClick={handleExitConfirm}>
          //         종료할게요
          //       </button>
          //     </div>
          //   </div>
          // </Popup>
        )}
        <Copyright>
          Copyright ⓒ 2024 Userconnect Co.,Ltd All rights reserved.
        </Copyright>
      </ThemeProvider>
    </>
  );
};

export default PageMarketLanding;
const Logo = styled.div`
  width: 48px;
  height: 50px;
  background: url(${images.LogoVerticality}) no-repeat center;
  background-size: contain;
`;

const Navbar = styled.div`
  position: fixed;
  top: 50%;
  left: 40px;
  transform: translateY(-50%);
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s;
  z-index: 99;

  h1 {
    font-size: 0;
    cursor: pointer;

    &.mobile {
      display: none;
    }
  }

  ul {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 9px;
  }

  li {
    display: inline-block;
    width: 12px;
    height: 12px;
    font-size: 0;
    box-sizing: border-box;
    border-radius: 100%;
    background: ${palette.blue};
    cursor: pointer;

    &.active {
      border: 2px solid ${palette.blue};
      background: none;
    }

    &.disabled {
      background: rgba(255, 255, 255, 0.3);
    }

    &:nth-child(1) {
      display: none;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 10px;
    left: 6px;
    transform: none;
    height: auto;

    h1 {
      &.pc {
        display: none;
      }

      &.mobile {
        display: block;
        padding: 10px;

        &:before {
          width: 13px;
          height: 13px;
          transform: rotate(45deg);
          display: block;
          border-left: 3px solid ${palette.blue};
          border-bottom: 3px solid ${palette.blue};
          content: "";
        }
      }
    }
  }
`;

const MainVisual = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // height:100vh;
  height: 890px;
  background: repeating-linear-gradient(
    90deg,
    ${palette.gray100},
    ${palette.gray100} 2px,
    ${palette.white} 0,
    ${palette.white} 30px
  );
  overflow: hidden;

  > p {
    position: relative;
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.3;

    &:before {
      position: absolute;
      left: -40px;
      top: -30px;
      width: 50px;
      height: 54px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='54' viewBox='0 0 50 54' fill='none'%3E%3Cpath d='M45.198 4.5V22.5' stroke='%23E6DEC7' stroke-opacity='0.5' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M18.698 20L30.9008 32.2028' stroke='%23E6DEC7' stroke-opacity='0.5' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M4.698 45L21.4654 49.5646' stroke='%23E6DEC7' stroke-opacity='0.5' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-size: 100%;
      content: "";
    }

    span {
      padding: 3px 15px;
      margin-left: 10px;
      border-radius: 50px;
      background: #1affe4;
    }

    em {
      position: relative;
      font-family: "Poly";
      font-weight: 400;
      font-style: italic;
      // box-shadow:inset 0 -9px 0px rgba(187, 255, 0, 1);
      z-index: 1;

      &:before {
        position: absolute;
        bottom: 6px;
        left: 50%;
        width: 105%;
        transform: translateX(-50%);
        height: 10px;
        background: #bbff00;
        z-index: -1;
        content: "";
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 90vh;

    > p {
      font-size: 2rem;

      &:before {
        left: -30px;
        top: -21px;
        width: 40px;
        height: 44px;
      }

      em {
        font-size: 2.4rem;
      }
    }
  }
`;

const VisualImg = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 970px;
  width: 100%;
  height: 75%;

  i {
    position: absolute;
    display: block;
    background-size: cover;
  }

  .img01 {
    top: 0;
    left: 50%;
    width: 133px;
    height: 65px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='133' height='65' viewBox='0 0 133 65' fill='none'%3E%3Cpath opacity='0.5' d='M125.073 4.57306C125.457 10.4107 129.716 14.5994 127.981 20.6315C127.219 23.2799 124.398 26.1138 122.663 28.2109C119.583 31.9346 113.683 30.9991 110.242 28.1529C107.109 25.5607 104.561 21.579 102.893 17.9165C102.196 16.388 100.263 15.2538 100.673 13.4823C101.039 11.8998 103.305 14.4673 103.692 15.3451C106.317 21.2868 104.695 27.9493 100.583 32.9201C98.6079 35.3077 96.8553 36.8679 94.4675 38.7425C91.4181 41.1366 87.7012 40.6528 84.0765 40.2776C79.718 39.8264 77.0538 39.1438 73.7773 36.4333C71.3725 34.4438 68.9677 32.4544 66.5629 30.465C65.5606 29.6358 65.732 28.2692 65.9413 27.0643C66.3646 24.6279 68.3786 27.291 69.425 28.1567C71.4942 29.8686 71.4343 32.4505 72.3531 34.7355C73.4168 37.381 72.9533 39.6306 72.5624 42.2979C72.2704 44.2905 69.5079 46.7052 68.1926 48.2081C65.9548 50.7651 61.605 51.6177 58.4402 52.3207C52.9554 53.5392 46.1072 49.3917 42.1184 46.0918C40.5372 44.7836 40.4713 43.9122 39.7804 42.0794C39.6102 41.6278 40.3598 41.0347 40.3213 40.4486C40.2605 39.5247 40.2292 38.8138 41.2239 39.6367C43.3931 41.4312 45.2745 45.9528 43.9267 48.5114C41.7919 52.564 38.0867 57.0729 33.8954 59.0321C30.7756 60.4904 27.0897 60.529 23.6049 60.7946C21.2881 60.9712 17.2927 60.6383 15.3757 59.2978C13.0949 57.7029 10.2201 56.7993 8.44457 54.4875C7.26737 52.9547 6.44617 51.391 4.83507 50.0582' stroke='%23AEBE91' stroke-width='8' stroke-linecap='round'/%3E%3C/svg%3E");
  }

  .img02 {
    right: 0;
    bottom: 15%;
    width: 127px;
    height: 90px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='127' height='90' viewBox='0 0 127 90' fill='none'%3E%3Cpath d='M5.3192 14.4156C17.8933 10.3534 43.6525 -1.43387 55.544 11.7181C65.8201 23.0835 55.8508 50.0609 52.684 62.1577C51.4643 66.8168 47.3003 87.0307 37.9813 84.2664C30.1949 81.9568 33.4805 63.6651 34.756 58.3573C37.6342 46.3795 49.658 36.4345 59.9426 30.8872C76.381 22.0206 88.2467 18.8206 102.393 33.5479C106.067 37.3729 105.849 42.0672 105.465 47.0219C104.729 56.5222 114.03 59.6367 121.046 64.3024' stroke='%23E6DEC7' stroke-opacity='0.5' stroke-width='10' stroke-linecap='round'/%3E%3C/svg%3E");
  }

  .img03 {
    left: 10%;
    bottom: 0;
    width: 63px;
    height: 59px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='63' height='59' viewBox='0 0 63 59' fill='none'%3E%3Cpath opacity='0.5' fill-rule='evenodd' clip-rule='evenodd' d='M18.4767 4.5089C17.9233 2.6533 18.979 0.700467 20.8346 0.147125C22.6902 -0.406216 24.6431 0.649475 25.1964 2.50508C25.4706 3.4247 25.7221 4.37589 25.9604 5.27752L26.0115 5.47062C26.2706 6.45036 26.5191 7.38044 26.7954 8.28524C27.3529 10.1114 27.9642 11.6257 28.774 12.8294C29.6872 14.187 30.4843 15.6258 31.1717 17.0006C31.6949 18.0471 32.0838 19.107 32.4037 20.0081C34.9693 14.5312 37.4029 9.01041 39.7483 3.36939C40.4916 1.58142 42.5437 0.734609 44.3317 1.47799C46.1196 2.22136 46.9664 4.27342 46.2231 6.06139C44.2656 10.7694 42.2464 15.398 40.1411 19.9893C45.4124 18.5264 50.777 17.3756 56.1549 16.5577C58.0693 16.2666 59.8571 17.5825 60.1483 19.4968C60.4394 21.4112 59.1235 23.199 57.2092 23.4902C52.8085 24.1594 48.4149 25.0643 44.0788 26.1918C44.3027 26.264 44.5264 26.3376 44.7498 26.4126C46.087 26.8616 47.3173 27.3978 48.6483 28.2949C52.0743 30.6041 55.3502 33.2495 58.4687 35.7678L58.4702 35.769L58.4715 35.7701C59.4215 36.5372 60.3569 37.2926 61.2775 38.023C62.7944 39.2266 63.0484 41.4319 61.8448 42.9488C60.6412 44.4657 58.4359 44.7197 56.919 43.5161C55.8916 42.7008 54.8874 41.8902 53.8956 41.0895L53.8955 41.0895C50.8284 38.6135 47.88 36.2333 44.7291 34.1095C44.0512 33.6526 43.4284 33.3658 42.5179 33.06C41.1767 32.6097 39.8062 32.2119 38.4001 31.8353C38.777 32.4989 39.1482 33.2173 39.4705 33.9846C40.3609 36.1046 40.9755 38.2533 41.5215 40.2006L41.6207 40.5545L41.6207 40.5546L41.6207 40.5547C42.1429 42.4194 42.6108 44.0902 43.2346 45.7049C43.5383 46.4909 43.76 47.2774 43.9376 47.9351C43.983 48.1033 44.025 48.261 44.0649 48.4107C44.194 48.8952 44.3008 49.2957 44.4274 49.6979C44.4973 49.9199 44.5415 50.1316 44.569 50.2899C44.6865 50.419 44.7958 50.5585 44.8956 50.7082C45.9697 52.3193 45.5343 54.4961 43.9232 55.5702C43.4674 55.874 42.6645 56.2845 41.6073 56.2545C40.4436 56.2215 39.5476 55.6752 38.9814 55.0869C38.1302 54.2024 37.9046 53.1084 37.8452 52.8205L37.8409 52.7995C37.7532 52.378 37.7081 51.9483 37.685 51.7274L37.6811 51.6909L37.6736 51.6213L37.6684 51.5748C37.5181 51.0777 37.3823 50.5672 37.2651 50.1267C37.231 49.9988 37.1986 49.8767 37.1678 49.7626C36.9997 49.14 36.8565 48.6534 36.6937 48.2321C35.9434 46.2902 35.3897 44.3103 34.8875 42.5144L34.7697 42.0936C34.2186 40.1278 33.7063 38.3688 33.0054 36.6999C32.9027 36.4554 32.7886 36.2119 32.6629 35.9647C31.9982 37.4779 31.2832 39.0604 30.4568 40.6325C29.512 42.4299 28.4738 44.2447 27.4744 45.9916C26.9492 46.9096 26.4347 47.809 25.9501 48.6772C25.5556 49.384 25.3038 50.1238 24.9478 51.1701C24.8452 51.4713 24.734 51.7981 24.6083 52.1567C24.49 52.494 24.3569 52.8351 24.2472 53.1159L24.2472 53.116L24.2274 53.1667C24.1053 53.4795 24.0068 53.7339 23.9225 53.9765C23.7604 54.4426 23.7357 54.6363 23.7321 54.6645L23.7316 54.6681C23.7315 54.6682 23.7315 54.6682 23.7315 54.668C23.7315 54.6678 23.7315 54.6675 23.7315 54.6671C23.7315 56.6034 22.1618 58.1731 20.2254 58.1731C18.2891 58.1731 16.7194 56.6034 16.7194 54.6671C16.7194 53.4779 17.0476 52.3972 17.2994 51.6732C17.4331 51.2888 17.5779 50.9175 17.6952 50.6171L17.6953 50.6167C17.8214 50.2937 17.9144 50.0554 17.991 49.8369C18.0577 49.6466 18.1296 49.4329 18.2075 49.2014L18.2075 49.2012C18.5791 48.0965 19.0875 46.5848 19.8271 45.2597C20.3913 44.2488 20.943 43.2852 21.4837 42.3408L21.4838 42.3407L21.4839 42.3404L21.4842 42.34C22.4374 40.675 23.3565 39.0696 24.2499 37.3699C24.9604 36.0184 25.5924 34.6248 26.2409 33.1489C25.7128 33.4671 25.1783 33.7935 24.6325 34.1267L24.6325 34.1267C23.4853 34.8271 22.2888 35.5577 21.0003 36.3053C20.3288 36.695 19.7253 37.1638 18.9224 37.7876C18.6482 38.0006 18.3508 38.2317 18.0195 38.4839C16.8708 39.3581 15.3394 40.4547 13.4788 41.0749C11.6418 41.6872 9.65625 40.6944 9.04392 38.8575C8.43159 37.0205 9.42437 35.0349 11.2614 34.4226C11.9474 34.1939 12.699 33.7211 13.7728 32.9039C13.9557 32.7647 14.1569 32.6078 14.3729 32.4394C15.2442 31.76 16.3561 30.893 17.481 30.2402C18.4638 29.67 19.4717 29.0535 20.5092 28.4188L20.5094 28.4186C21.0756 28.0723 21.6507 27.7205 22.2353 27.3679C22.201 27.3569 22.1668 27.3459 22.1326 27.335L22.1321 27.3348L22.1318 27.3347C19.5538 26.5083 17.0743 25.7134 14.4115 25.015L14.3305 24.9938C10.4183 23.9676 6.18918 22.8584 2.20478 21.2646C0.406929 20.5455 -0.467541 18.5051 0.251602 16.7072C0.970745 14.9093 3.01117 14.0349 4.80903 14.754C8.34762 16.1695 12.1793 17.1802 16.1906 18.2323C18.9647 18.9599 21.8345 19.8766 24.5957 20.7587L24.5961 20.7588L25.2781 20.9765C25.1564 20.6798 25.0327 20.4023 24.8998 20.1365C24.3004 18.9377 23.652 17.7782 22.9558 16.7434C21.5766 14.6931 20.7234 12.4111 20.0888 10.3328C19.7691 9.28532 19.4897 8.23609 19.2325 7.26374L19.1887 7.09813L19.1886 7.09806L19.1886 7.09786C18.943 6.16899 18.7182 5.31879 18.4767 4.5089Z' fill='%23AEBE91'/%3E%3C/svg%3E");
  }

  .txt01 {
    position: absolute;
    right: 6%;
    top: 20%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    font-size: 0.88rem;
    font-weight: 300;
    line-height: 1.5;

    span {
      padding: 7px 20px;
      margin-left: 10px;
      transform: rotate(-0.4deg);
      background: #b791be;
      z-index: 1;
    }

    p {
      padding: 7px 20px;
      transform: rotate(4.5deg);
      color: ${palette.gray700};
      background: #eef0eb;
    }
  }

  .txt02 {
    position: absolute;
    right: 0;
    top: 43%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    font-size: 0.88rem;
    font-weight: 300;
    line-height: 1.5;

    span {
      padding: 7px 20px;
      margin-left: 10px;
      transform: rotate(0.4deg);
      background: #b5d3bf;
      z-index: 1;
    }

    p {
      padding: 12px 20px;
      transform: rotate(-4.5deg);
      color: ${palette.gray700};
      background: #f7f8fa;
    }
  }

  .txt03 {
    position: absolute;
    left: 0;
    bottom: 20%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    font-size: 0.88rem;
    font-weight: 300;
    line-height: 1.5;

    span {
      padding: 7px 20px;
      margin-top: -16px;
      margin-right: 20px;
      transform: rotate(-1.55deg);
      background: #e6dec7;
      z-index: 1;
    }

    p {
      padding: 12px 20px;
      transform: rotate(-3.31deg);
      color: ${palette.gray700};
      background: #eef0eb;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 80%;

    .img01 {
      left: 15%;
      width: 120px;
      height: 59px;
    }

    .img02 {
      right: -4%;
      bottom: 26%;
      width: 115px;
      height: 81px;
    }

    .img03 {
      bottom: 4%;
      width: 50px;
      height: 47px;
    }

    .txt01,
    .txt02,
    .txt03 {
      font-size: 0.75rem;

      span {
        padding: 4px 15px;
      }

      p {
        padding: 7px 14px;
      }
    }

    .txt01 {
      right: 12%;
      top: 7%;
    }

    .txt02 {
      right: 8%;
      top: 24%;
    }

    .txt03 {
      left: 4%;
      bottom: 23%;
    }
  }
`;

const StartIdeaWrap = styled.div`
  position: fixed;
  // bottom:40px;
  left: 50%;
  transform: translateX(-50%);
  top: ${(props) => (props.isFixed ? "calc(100dvh - 150px)" : "700px")};

  display: flex;
  flex-direction: column;
  gap: 16px;
  // transition:all .5s ease;
  // transition: transform 0.5s ease, bottom 0.5s ease;
  transition: top 0.5s ease;

  p {
    font-size: 0.88rem;
    font-weight: 400;
    line-height: 1.2;
    text-decoration: underline;
    color: ${palette.gray700};
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.5);
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-width: 120px;
    padding: 10px;
    font-size: 0.88rem;
    line-height: 1.2;
    color: ${palette.gray300};
    border-radius: 10px;
    background: none;
    transition: all 0.5s;

    &:hover {
      color: ${palette.white};
      background: ${palette.black};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: ${(props) => (props.isFixed ? "calc(100dvh - 140px)" : "75%")};
  }
`;

const Section = styled.section`
  padding: ${(props) => {
    if (props.Bg) return `127px 0`;
    else return `0`;
  }};
  background: ${(props) => {
    if (props.Bg) return `#FBFAF9`;
    else return palette.white;
  }};

  > p {
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 1.5;
    color: ${palette.gray800};
    word-break: keep-all;
  }

  > div {
    max-width: 870px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin: 0 auto;
    padding: 105px 0;

    h3 {
      font-size: 2rem;
      line-height: 1.2;
      font-weight: 600;
    }

    p {
      font-size: 0.88rem;
      font-weight: 300;
      line-height: 1.5;
      color: ${palette.gray800};
      margin-bottom: 55px;
    }

    + div {
      border-top: 1px solid ${palette.gray200};
      background: url(${Landingimages.ImgMarketing03}) bottom 105px center
        no-repeat;
      background-size: 100% auto;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${(props) => {
      if (props.Bg) return `100px 0`;
      else return `0`;
    }};

    > p {
      max-width: 60%;
      font-size: 1.13rem;
      margin: 0 auto;
    }

    > div {
      width: 72%;
      padding: 80px 0;

      h3 {
        font-size: 1.5rem;
      }

      p {
        font-size: 0.88rem;
      }

      img {
        width: 100%;
      }
    }
  }
`;

const Copyright = styled.p`
  font-size: 0.94rem;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.6);
  // margin:0 0 150px;
  margin: 30px 0 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.75rem;
    margin-top: 40px;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
  z-index: 9999;

  .closePopup {
    position: absolute;
    right: 24px;
    top: 24px;
    width: 16px;
    height: 16px;
    font-size: 0;
    padding: 9px;
    border: 0;
    background: none;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 100%;
      border-radius: 10px;
      background: ${palette.gray500};
      content: "";
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    text-align: center;
    // overflow:hidden;
    padding: 45px 24px 24px;
    border-radius: 10px;
    background: ${palette.white};

    p {
      font-family: "Pretendard", "Poppins";
      font-size: 0.875rem;
      font-weight: 500;
      margin: 20px auto 24px;
      strong {
        font-weight: 500;
        display: block;
      }

      span {
        font-size: 0.75rem !important;
        font-weight: 400;
        color: #f40404;
        display: block;
        margin-top: 8px;
      }
    }

    .btnWrap {
      display: flex;
      align-items: center;
      gap: 16px;

      button {
        flex: 1;
        font-family: "Pretendard", "Poppins";
        font-size: 0.875rem;
        font-weight: 600;
        color: ${palette.blue};
        padding: 12px 20px;
        border-radius: 12px;
        border: 1px solid ${palette.blue};
        background: ${palette.white};

        // &:last-child {
        //   color: ${palette.white};
        //   background: ${palette.blue};
        // }
      }
    }

    ${(props) =>
      props.Cancel &&
      css`
        p {
          strong {
            font-weight: 600;
            display: block;
            color: ${palette.gray800};
          }
          span {
            font-size: 1rem;
            display: block;
            margin-top: 8px;
          }
        }

        .btnWrap {
          padding-top: 16px;
          border-top: 1px solid ${palette.lineGray};

          button {
            color: ${palette.gray700};
            font-weight: 400;
            padding: 0;
            border: 0;
            background: none;
          }
        }
      `}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    > div {
      width: 90%;
    }
  }
`;
