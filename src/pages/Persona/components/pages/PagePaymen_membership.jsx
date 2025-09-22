//작업관리/ 프로젝트 리스트
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import { palette } from "../../../../assets/styles/Palette";
import OrganismIncNavigation from "../../../Global/organisms/OrganismIncNavigation";
// import Header from "../../../Design_Page/IncHeader";
import MoleculeHeader from "../../../Global/molecules/MoleculeHeader";
import {
  ButtonGroup,
  Button,
  IconButton,
} from "../../../../assets/styles/ButtonStyle";
import {
  ContentsWrap,
  MainContent,
  PaymentWrap,
  PaymentCard,
  PaymentPlan,
  PlanTitle,
  PlanList,
  PaymentCredit,
  ToggleList,
  Title,
  PaymentPrice,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../assets/styles/Images";
import { useNavigate } from "react-router-dom";
import {
  IS_LOGGED_IN,
  PROJECT_REPORT_LIST,
  PROJECT_ID,
  PROJECT_REPORT_ID,
  PROJECT_LIST,
  REPORT_LIST,
  PERSONA_LIST,
  SELECTED_PERSONA_LIST,
  CUSTOMIZE_PERSONA_LIST,
  REQUEST_PERSONA_LIST,
  INTERVIEW_QUESTION_LIST,
  SELECTED_INTERVIEW_PURPOSE,
  CATEGORY_COLOR,
  PROJECT_LOAD_BUTTON_STATE,
  REPORT_LOAD_BUTTON_STATE,
  REPORT_DESCRIPTION_LOAD_BUTTON_STATE,
  INTERVIEW_DATA,
  INTERVIEW_REPORT,
  INTERVIEW_REPORT_ADDITIONAL,
  IS_EDIT_MODE,
  IS_SHOW_TOAST,
  IS_PERSONA_ACCESSIBLE,
  PROJECT_LOADING,
  PROJECT_REFRESH_TRIGGER,
  USER_EMAIL,
} from "../../../AtomStates";
import OrganismProjectCard from "../organisms/OrganismProjectCard";
import { getProjectListByIdFromIndexedDB } from "../../../../utils/indexedDB";
import OrganismEmptyProject from "../organisms/OrganismEmptyProject";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";
import { useLocation } from "react-router-dom";
import {
  H2,
  H3,
  H4,
  H5,
  H6,
  Body2,
  Body3,
  Sub3,
  Caption2,
} from "../../../../assets/styles/Typography";
import PopupWrap from "../../../../assets/styles/Popup";

const PagePayment = () => {
  const [userEmail, setUserEmail] = useAtom(USER_EMAIL);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // URL의 쿼리 파라미터 확인
    const queryParams = new URLSearchParams(location.search);

    // 결제 후 리다이렉트된 경우의 파라미터 체크
    const tid = queryParams.get("tid");
    const orderId = queryParams.get("orderId");
    const status = queryParams.get("status");
    const mou = queryParams.get("mou");

    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    if (tid && orderId) {
      const verifyPayment = async () => {
        try {
          // const response = await fetch("http://localhost:8000/payment/onePay", {
          const response = await fetch(
            "https://wishresearch.kr/payment/onePay",
            {
              method: "POST",

              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              withCredentials: true,

              body: JSON.stringify({
                tid: tid,
                orderId: orderId,
                status: status,
                amount: mou,
                // 필요한 다른 데이터들도 추가
              }),
            }
          );

          const result = await response.json();

          if (result.resultCode === "0000") {
            setShowSuccessPopup(true);
          } else {
            setShowFailPopup(true);
            // 이미 사용된 OrderId입니다 ==> 중복결제 오류 안내이후 확인누를시 새로고침 필요 ( 상단에 결제데이터 남아있음. )

            // 결제 실패시 데이터 전달해서 결제 실패 사유를  사용자가 알아야할거같아요.
            // 실패 이후 확인시 네비게이터로  / Payment 로 이동
          }
        } catch (error) {
          alert("결제 처리 중 오류가 발생했습니다.");
        }
      };

      verifyPayment();
    }

    // 스크립트 로드
    const script = document.createElement("script");
    script.src = "https://pay.nicepay.co.kr/v1/js/";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [location]);

  const onePayments = (e) => {
    if (window.AUTHNICE) {
      // 상품 가격 추출
      const priceElement = e.currentTarget.querySelector("[data-price]");
      const price = priceElement.getAttribute("data-price");
      // 상품 이름 추출 + 충전할 크레딧 추출
      const creditElement = e.currentTarget.querySelector("[credit-name]");
      const credit = creditElement.getAttribute("credit-name");

      const createdOrderId = "UC_" + uuidv4();
      const goodsItem = "Credit" + credit;

      window.AUTHNICE.requestPay({
        clientId: "S2_9fea099793f145afa7800b21958ab376",
        method: "card",
        orderId: createdOrderId,
        amount: price,
        goodsName: goodsItem,
        // returnUrl: "http://localhost:8000/payment/onePayCall",
        returnUrl: "https://wishresearch.kr/payment/onePayCall",
        fnError: function (result) {
          alert("개발자확인용 : " + result.errorMsg + "");
        },
      });
    } else {
      // console.error("AUTHNICE is not loaded");
    }
  };

  const [isProPlan, setIsProPlan] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailPopup, setShowFailPopup] = useState(false);

  const handlePlanChange = () => {
    setShowSuccessPopup(true);
  };

  const handlePlanChange2 = () => {
    setShowFailPopup(true);
  };

  const handlePopupConfirm = () => {
    setShowSuccessPopup(false);
    setShowFailPopup(false);
    setIsProPlan(true);
    // navigate(0);
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide>
          <PaymentWrap>
            <Title Column>
              <H2 color="gray800">크레딧 충전</H2>
              <H6 color="gray800">
                필요한 만큼, 원하는 만큼 자유롭게 선택하세요
              </H6>
            </Title>

            <PaymentWrap>
              <PaymentCard>
                <PaymentCredit onClick={onePayments}>
                  <images.CoinSmall color={palette.gray700} />
                  <div>
                    <p credit-name="50">50</p>
                    <H6 color="gray700">Credit</H6>
                  </div>

                  <PaymentPrice>
                    <Button Large PrimaryLightest Fill Round W100>
                      <H5 data-price="1100">￦1,100</H5>
                    </Button>

                    <H6 color="gray700">5% 할인</H6>
                  </PaymentPrice>
                </PaymentCredit>
                <PaymentCredit onClick={onePayments}>
                  <images.CoinMedium color={palette.gray700} />
                  <div>
                    <p credit-name="160">160</p>
                    <H6 color="gray700">Credit</H6>
                  </div>

                  <PaymentPrice>
                    <Button Large PrimaryLightest Fill Round W100>
                      <H5 data-price="3300">￦3,300</H5>
                    </Button>

                    <H6 color="gray700">10% 할인</H6>
                  </PaymentPrice>
                </PaymentCredit>
                <PaymentCredit onClick={onePayments}>
                  <images.CoinLarge
                    width="34px"
                    height="32px"
                    color={palette.gray700}
                  />
                  <div>
                    <p credit-name="300">300</p>
                    <H6 color="gray700">Credit</H6>
                  </div>

                  <PaymentPrice>
                    <Button Large PrimaryLightest Fill Round W100>
                      <H5 data-price="5500">￦5,500</H5>
                    </Button>

                    <H6 color="gray700">20% 할인</H6>
                  </PaymentPrice>
                </PaymentCredit>
                <PaymentCredit onClick={handlePlanChange}>
                  <images.ClockClockwise
                    width="39px"
                    height="36px"
                    color={palette.gray700}
                  />
                  <div>
                    <p credit-name="1000">
                      1,000<span>/월</span>
                    </p>
                    <H6 color="gray700">Credit</H6>
                  </div>

                  <PaymentPrice>
                    <Button Large PrimaryLightest Fill Round W100>
                      <H5 data-price="12900">구독 플랜</H5>
                      {/* 
                      *************

                      카드 입력 받는곳이 필요함, 
                      받아서 보낼 데이터. 
                      POST 처리.  개인 토큰 필수
                      http://127.0.0.1:8000/payment/billingKey
                      {
                      "cardNo":"9410108017544293",
                      "expYear":"29",
                      "expMonth":"03",
                      "idNo":"910410",
                      "cardPw":"19"
                      }
                      
                      카드 입력받고 
                      
                      {
	"resultCode": "0000",
	"resultMsg": "정상 처리되었습니다.",
	"tid": "UT0018097m01162501151405351046",
	"orderId": "0755e3e2-7725-42a2-89e4-ea6c59c57c8e",
	"bid": "BIKYUT0018097m2501151405350001",
	"authDate": "2025-01-15T00:00:00.000+0900",
	"cardCode": "04",
	"cardName": "삼성",
	"messageSource": "nicepay",
	"status": "issued"
}
  이와 같이 리턴 받음. 
  그러면 바로 데이터 그대로 
  POST 로 토큰넣어서 발송
  http://127.0.0.1:8000/payment/billingPay

  그럼 정상처리됨. 
  


  ==> 
    {
	"resultCode": "0000",
	"resultMsg": "정상 처리되었습니다.",
	"tid": "UT0018097m01162501151405351046",
	"orderId": "0755e3e2-7725-42a2-89e4-ea6c59c57c8e",
	"bid": "BIKYUT0018097m2501151405350001",
	"authDate": "2025-01-15T00:00:00.000+0900",
	"cardCode": "04",
	"cardName": "삼성",
	"messageSource": "nicepay",
	"status": "issued"
}
  해당데이터 그대로 보내면 

  백엔드에서 구독 가격 잡고 결제처리할꺼임. 


                      
                      
                      
                      
                      
                      */}
                    </Button>

                    <H6 color="gray700">35% 할인</H6>
                  </PaymentPrice>
                </PaymentCredit>
              </PaymentCard>
            </PaymentWrap>

            {/* <PaymentCard>
              <PaymentPlan>
                <PlanTitle>
                  <H2>Basic Plan</H2>
                  <h1>FREE</h1>
                </PlanTitle>

                <PlanList>
                  <li>
                    <img src={images.CheckGreen} alt="" />
                    <H6 color="gray500">비즈니스 페르소나 요청 1건 / My Persona 요청 불가</H6>
                  </li>
                  <li>
                    <img src={images.CheckGreen} alt="" />
                    <H6 color="gray500">인터뷰 커스터마이징 3건</H6>
                  </li>
                  <li>
                    <img src={images.CheckGreen} alt="" />
                    <H6 color="gray500">인뎁스 인터뷰 사용 불가능</H6>
                  </li>
                  <li>
                    <img src={images.CheckGreen} alt="" />
                    <H6 color="gray500">인터뷰 룸 추가질문 1건 가능</H6>
                  </li>
                </PlanList>

                {isProPlan ? (
                  <>
                    <Button DbExLarge Round Outline W100>
                      <Body2 color="gray500">다운그레이드 하기</Body2>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button DbExLarge Round W100>
                      <Body2 color="gray500">시작하기</Body2>
                    </Button>
                  </>
                )}
              </PaymentPlan>

              <PaymentPlan>
                <PlanTitle>
                  <H2>Pro Plan</H2>
                  <h1 className="price">12,900</h1>
                </PlanTitle>

                <PlanList>
                  <li>
                    <img src={images.CheckGreen} alt="" />
                    <H6 color="gray500">비즈니스 페르소나 요청 10건</H6>
                  </li>
                  <li>
                    <img src={images.CheckGreen} alt="" />
                    <H6 color="gray500">인터뷰 커스터마이징 무제한</H6>
                  </li>
                  <li>
                    <img src={images.CheckGreen} alt="" />
                    <H6 color="gray500">인뎁스 인터뷰 1건 가능</H6>
                  </li>
                  <li>
                    <img src={images.CheckGreen} alt="" />
                    <H6 color="gray500">인터뷰 룸 추가질문 3건 가능 </H6>
                  </li>
                </PlanList>

                {isProPlan ? (
                  <Button DbExLarge Round W100>
                    <Body2 color="gray500">현재 플랜</Body2>
                  </Button>
                ) : (
                  <Button DbExLarge Primary Fill Round W100 onClick={handlePlanChange}>
                    <Body2 color="white">시작하기</Body2>
                  </Button>
                )}
              </PaymentPlan>
            </PaymentCard> */}
          </PaymentWrap>

          {showSuccessPopup && (
            <PopupWrap
              Success
              title="결제 완료!"
              message="성공적으로 Pro 업그레이드에 성공 하셨습니다!"
              buttonType="Outline"
              confirmText="확인"
              isModal={false}
              onConfirm={handlePopupConfirm}
              onCancel={handlePopupConfirm}
            />
          )}

          {showFailPopup && (
            <PopupWrap
              Fail
              title="결제 실패"
              message={
                <>
                  현재 (문제명)로 인하여 결제에 실패했습니다.
                  <br />
                  다시 시도해주세요
                </>
              }
              buttonType="Outline"
              confirmText="확인"
              isModal={false}
              onConfirm={handlePopupConfirm}
              onCancel={handlePopupConfirm}
            />
          )}
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PagePayment;
