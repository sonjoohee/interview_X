import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { css, ThemeProvider } from "styled-components";
import theme from "../../../../assets/styles/Theme";
import { Link } from "react-router-dom";
import images from "../../../../assets/styles/Images";
import {
  SkeletonH1,
  SkeletonTitle,
  SkeletonLine,
} from "../../../../assets/styles/Skeleton";
import { palette } from "../../../../assets/styles/Palette";
import { useAtom } from "jotai";
import {
  MARKETING_MBTI_RESULT,
  MARKETING_INTEREST,
  MARKETING_RECOMMENDED_ITEM_BUTTON_STATE,
  MARKETING_RECOMMENDED_ITEM_DATA,
  IS_LOADING,
  IS_EXPERT_INSIGHT_ACCESSIBLE,
  CONVERSATION,
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
} from "../../../AtomStates";
import axios from "axios";
import { useSaveConversation } from "../../../Expert_Insight/components/atoms/AtomSaveConversation";
import PopupWrap from "../../../../assets/styles/Popup";

import html2canvas from "html2canvas";
import { MarketingMbtiResultRequest } from "../../../../utils/indexedDB";
import { isLoggedIn } from "../../../../utils/indexedDB";

import { Button } from "../../../../assets/styles/ButtonStyle";

const PageMarketingNoItemsResult = () => {
  const navigate = useNavigate();
  const { saveConversation } = useSaveConversation();
  const [marketingMbtiResult, setMarketingMbtiResult] = useAtom(
    MARKETING_MBTI_RESULT
  );
  const [marketingInterest, setMarketingInterest] = useAtom(MARKETING_INTEREST);
  const [
    marketingRecommendedItemButtonState,
    setMarketingRecommendedItemButtonState,
  ] = useAtom(MARKETING_RECOMMENDED_ITEM_BUTTON_STATE);
  const [marketingRecommendedItemData, setMarketingRecommendedItemData] =
    useAtom(MARKETING_RECOMMENDED_ITEM_DATA);
  const [isLoadingRecommendedItem, setIsLoadingRecommendedItem] =
    useAtom(IS_LOADING);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isExpertInsightAccessible, setIsExpertInsightAccessible] = useAtom(
    IS_EXPERT_INSIGHT_ACCESSIBLE
  );

  const [inputBusinessInfo, setInputBusinessInfo] =
    useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(
    TITLE_OF_BUSINESS_INFORMATION
  );
  const [
    mainFeaturesOfBusinessInformation,
    setMainFeaturesOfBusinessInformation,
  ] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    mainCharacteristicOfBusinessInformation,
    setMainCharacteristicOfBusinessInformation,
  ] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [
    businessInformationTargetCustomer,
    setBusinessInformationTargetCustomer,
  ] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);

  // 팝업
  const [isPopup1Open, setIsPopup1Open] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);

  const handleOpenPopup = (index) => {
    setIsPopup1Open(true);
    setPopupIndex(index);
  };

  const closePopup = () => {
    setIsPopup1Open(false);
  };

  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Chrome requires returnValue to be set.
      event.returnValue = "";
    };

    const handlePopState = () => {
      setIsExitPopupOpen(true);
    };

    const handleKeyDown = (event) => {
      // if (event.keyCode === 116)
      if (
        (event.key === "r" && (event.metaKey || event.ctrlKey)) ||
        event.key === "F5"
      ) {
        // F5 key code
        setIsExitPopupOpen(true);
        event.preventDefault();
        // navigate("/");
      }
    };

    //새로고침방지
    window.addEventListener("beforeunload", handleBeforeUnload);

    window.history.pushState(null, "", "");
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      //새로고침 방지

      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleExitCancel = () => {
    setIsExitPopupOpen(false);
  };

  const handleExitConfirm = () => {
    window.location.href = "/MarketingLanding";
  };

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  const data = {
    expert_id: "11",
    startup_mbti: marketingMbtiResult.name,
    startup_interest: marketingInterest,
  };

  useEffect(() => {
    const handleRecommendedItem = async () => {
      if (marketingRecommendedItemButtonState) {
        setIsLoading(true);
        setIsLoadingRecommendedItem(true);
        setMarketingRecommendedItemButtonState(0);

        // let response = await axios.post(
        //   "https://wishresearch.kr/panels/marketing/mbti_result",
        //   data,
        //   axiosConfig
        // );

        let response = await MarketingMbtiResultRequest(data);
        let recommendedItemData = response.response.marketing_mbti_result;

        let retryCount = 0;
        const maxRetries = 10;

        while (
          retryCount < maxRetries &&
          (!response?.response?.marketing_mbti_result ||
            typeof recommendedItemData !== "object" ||
            !recommendedItemData?.overview?.name ||
            !recommendedItemData?.overview?.description ||
            !Array.isArray(recommendedItemData?.example) ||
            recommendedItemData.example.length !== 3 ||
            recommendedItemData.example.some(
              (item) =>
                !item?.name ||
                !item?.summary ||
                !item?.description ||
                !Array.isArray(item?.mbti) ||
                item.mbti.some(
                  (contentItem) =>
                    !contentItem?.type ||
                    !contentItem?.description ||
                    !contentItem?.compatibility
                )
            ))
        ) {
          retryCount += 1;

          // response = await axios.post(
          //   "https://wishresearch.kr/panels/marketing/mbti_result",
          //   data,

          //   axiosConfig
          // );
          response = await MarketingMbtiResultRequest(data);
          recommendedItemData = response.response.marketing_mbti_result;
        }

        setMarketingRecommendedItemData(recommendedItemData);

        setIsLoadingRecommendedItem(false);
        setIsLoading(false);
      }
    };

    handleRecommendedItem();
  }, [marketingRecommendedItemButtonState]);

  const handleButtonExpert = async (index) => {
    const itemName = marketingRecommendedItemData?.example?.[index]?.summary;
    const itemDetail =
      marketingRecommendedItemData?.example?.[index]?.description;

    const updatedConversation = [...conversation];

    updatedConversation.push(
      {
        type: "system",
        message: `${marketingMbtiResult.category} 스타일 이시군요! 그 성향에 맞는 ${itemName}을 분석해드릴게요\n당신의 스타일에 딱 맞는 창업 전략을 잡는데 도움이 되었으면 좋겠어요 ✨`,
        expertIndex: 0,
      },
      {
        type: "system",
        message: `자! 이제 본격적인 준비를 시작해보겠습니다.\n먼저 시장에서 ${itemName}의 가능성을 한눈에 파악할 수 있는 시장조사를 바로 시작해볼게요`,
        expertIndex: -1,
      },
      { type: "marketingStartButton" }
    );

    const analysisReportData = {
      title: itemName,
      mainFeatures: itemDetail,
      mainCharacter: [],
      mainCustomer: [],
    };

    await saveConversation({
      changingConversation: {
        conversation: updatedConversation,
        analysisReportData: analysisReportData,
      },
    });

    setTitleOfBusinessInfo(itemName);
    setInputBusinessInfo(itemName);
    setMainFeaturesOfBusinessInformation(itemDetail);
    setConversation(updatedConversation);
    setIsExpertInsightAccessible(true);
    navigate("/ExpertInsight");
  };

  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(null);
  const [questionFlex, setQuestionFlex] = useState("1 1 100%");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true); // 모바일 화면
      } else {
        setIsMobile(false); // 데스크탑 화면
      }
    };

    checkMobile(); // 처음 로드 시 확인
    window.addEventListener("resize", checkMobile); // 화면 크기 변경 시 확인

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (isMobile) {
      setIsDragging(true);
      setStartY(e.clientY); // 마우스 위치 저장
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || startY === null) return;

    const currentY = e.clientY;

    // 위로 드래그 시 flex: 10%, 아래로 드래그 시 flex: 70%
    if (startY - currentY > 30) {
      // 위로 드래그했을 때
      setQuestionFlex("1 1 10%");
    } else if (currentY - startY > 30) {
      setQuestionFlex("1 1 70%");
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setStartY(null);
  };

  const handleTouchStart = (e) => {
    if (isMobile) {
      setIsDragging(true);
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || startY === null) return;

    const currentY = e.touches[0].clientY;

    // 위로 드래그 시 flex: 10%, 아래로 드래그 시 flex: 70%
    if (startY - currentY > 30) {
      setQuestionFlex("1 1 10%");
    } else if (currentY - startY > 30) {
      setQuestionFlex("1 1 70%");
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setStartY(null);
  };

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const captureAndShare = async () => {
    if (isCapturing) return;
    setIsCapturing(true);

    try {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      const elementToCapture = isMobile
        ? document.querySelector(".mobile-result-card")
        : document.querySelector(".capture-area");

      // 이미지 로드 대기
      const images = elementToCapture.getElementsByTagName("img");
      await Promise.all(
        [...images].map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );

      // 캡쳐 전 스타일 조정
      if (isMobile) {
        elementToCapture.style.display = "block";
        elementToCapture.style.visibility = "visible";
        elementToCapture.style.position = "absolute";
        elementToCapture.style.top = "-9999px"; // 화면 밖으로 이동
        elementToCapture.style.left = "-9999px";
        elementToCapture.style.width = "100%";
        elementToCapture.style.height = "auto";
        elementToCapture.style.background = "#5547ff";
      }

      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(elementToCapture, {
        backgroundColor: "#5547ff",
        scale: 2,
        useCORS: true,
        logging: true,
        allowTaint: true,
        imageTimeout: 0,
        onclone: (document) => {
          const clonedElement = document.querySelector(".mobile-result-card");
          if (clonedElement) {
            clonedElement.style.display = "block";
            clonedElement.style.visibility = "visible";
          }
        },
      });

      // 원래 스타일로 복원
      if (isMobile) {
        elementToCapture.style.display = "none";
        elementToCapture.style.visibility = "hidden";
        elementToCapture.style.position = "absolute";
        elementToCapture.style.left = "-9999px";
        elementToCapture.style.top = "-9999px";
      }

      // Blob 생성 및 다운로드/공유
      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            throw new Error("Canvas to Blob conversion failed");
          }

          try {
            if (isMobile && navigator.share) {
              const file = new File(
                [blob],
                `${marketingMbtiResult.name}_result.png`,
                { type: "image/png" }
              );
              downloadWithBlob(blob); // 무조건 먼저 다운로드
              try {
                await navigator.share({
                  files: [file],
                  title: "창업 MBTI 결과",
                  text: `나의 창업 MBTI는 ${marketingMbtiResult.name}입니다!`,
                });
                setShowSuccessPopup(true);
              } catch (shareError) {
                
              }
            } else {
              // 데스크톱이나 공유 불가능한 모바일의 경우
              downloadWithBlob(blob);
            }
          } catch (error) {
          
            setShowErrorPopup(true);
          }
        },
        "image/png",
        1.0
      );

      const shareUrl = `${window.location.origin}/MarketingSetting/Share/${marketingMbtiResult.name}`;

      await navigator.clipboard.writeText(shareUrl);
    } catch (err) {
    
      setShowErrorPopup(true);
    } finally {
      setIsCapturing(false);
    }
  };

  // Blob을 사용한 다운로드 함수
  const downloadWithBlob = (blob) => {
    try {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${marketingMbtiResult.name}_result.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Blob URL 해제
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 100);
      setShowSuccessPopup(true);
    } catch (error) {
      // console.error("Download failed:", error);
      setShowErrorPopup(true);
    }
  };

  // 이미지 소스 추출 함수
  const getImageSrc = (mbtiName) => {
    switch (mbtiName) {
      case "ROIC":
        return images.ImgMBTIROIC;
      case "ROIA":
        return images.ImgMBTIROIA;
      case "ROTC":
        return images.ImgMBTIROTC;
      case "ROTA":
        return images.ImgMBTIROTA;
      case "RPIA":
        return images.ImgMBTIRPIA;
      case "RPIC":
        return images.ImgMBTIRPIC;
      case "RPTA":
        return images.ImgMBTIRPTA;
      case "RPTC":
        return images.ImgMBTIRPTC;
      case "SOIA":
        return images.ImgMBTISOIA;
      case "SOIC":
        return images.ImgMBTISOIC;
      case "SOTA":
        return images.ImgMBTISOTA;
      case "SOTC":
        return images.ImgMBTISOTC;
      case "SPIA":
        return images.ImgMBTISPIA;
      case "SPIC":
        return images.ImgMBTISPIC;
      case "SPTA":
        return images.ImgMBTISPTA;
      case "SPTC":
        return images.ImgMBTISPTC;
      default:
        return "";
    }
  };

  // MBTI 설명 추출 함수
  const getMbtiDescription = (mbtiChar) => {
    switch (mbtiChar) {
      case "S":
        return "안정 추구 (Safety-seeking)";
      case "O":
        return "기회 포착형 (Opportunity-driven)";
      case "I":
        return "독립성 중시 (Independence-focused)";
      case "C":
        return "창의성 중심 (Creativity-centered)";
      case "R":
        return "고위험 추구 (Risk-seeking)";
      case "P":
        return "계획 기반형 (Planning-driven)";
      case "T":
        return "협력 중시 (Teamwork-focused)";
      case "A":
        return "실용성 중심 (Application-centered)";
      default:
        return "";
    }
  };

  const getEntrepreneursByMbti = (mbtiName) => {
    const entrepreneurs = {
      ROIC: [
        { name: "일론 머스크", company: "Tesla, SpaceX의 CEO" },
        { name: "스티브 잡스", company: "Apple 공동창립자" },
      ],
      ROTC: [
        { name: "래리 페이지", company: "Google 공동창립자" },
        { name: "벤 코헨", company: "Ben & Jerry's Icecream 공동창립자" },
      ],
      SOIA: [
        { name: "워렌 버핏", company: "Berkshire Hathaway CEO" },
        { name: "제프 베조스", company: "Amazon 창립자" },
      ],
      RPTC: [
        { name: "리드 헤이스팅스", company: "Netflix CEO" },
        { name: "사티아 나델라", company: "Microsoft CEO" },
      ],
      ROTA: [
        { name: "마윈", company: "Alibaba 창립자" },
        { name: "짐 월튼", company: "Walmart 공동창립자" },
      ],
      SPIC: [
        { name: "지미 웨일스", company: "위키피디아 창립자" },
        { name: "피터 틸", company: "PayPal 공동창립자" },
      ],
      SOTC: [
        { name: "브라이언 체스키", company: "Airbnb 공동창립자" },
        { name: "케빈 시스트롬", company: "Instagram 공동창립자" },
      ],
      RPIA: [
        { name: "마이클 블룸버그", company: "Bloomberg LP 창립자" },
        {
          name: "조지 소로스",
          company: "독자적인 투자 전략으로 성공한 투자가",
        },
      ],
      ROIA: [
        { name: "래리 엘리슨", company: "Oracle CEO" },
        { name: "마이클 델", company: "Dell 창립자" },
      ],
      SPTC: [
        { name: "순다 피차이", company: "Google CEO" },
        { name: "새티아 나델라", company: "Microsoft CEO" },
      ],
      SPIA: [
        { name: "찰스 슈왑", company: "Charles Schwab 창립자" },
        { name: "레이 달리오", company: "Bridgewater Associates 창립자" },
      ],
      RPTA: [
        { name: "리드 호프만", company: "LinkedIn 창립자" },
        { name: "잭 웰치", company: "GE 전 CEO" },
      ],
      SOIC: [
        { name: "존 보글", company: "Vanguard 창립자" },
        { name: "하워드 마크스", company: "Oaktree Capital 창립자" },
      ],
      SOTA: [
        { name: "빌 휴렛", company: "HP 공동창립자" },
        { name: "진 크란츠", company: "Intel 전 CEO" },
      ],
      RPIC: [
        { name: "닉 우드먼", company: "GoPro 창립자" },
        { name: "리처드 브랜슨", company: "Virgin Group 창립자" },
      ],
      SPTA: [
        { name: "메리 바라", company: "GM CEO" },
        { name: "인드라 누이", company: "전 PepsiCo CEO" },
      ],
    };

    return entrepreneurs[mbtiName] || [];
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar>
          <h1 className="pc" onClick={() => setIsExitPopupOpen(true)}>
            <img src={images.SymbolLogoWhite} alt="" />
          </h1>
          <h1 className="mobile" onClick={() => setIsExitPopupOpen(true)}></h1>
        </Navbar>
        <QuestionWrap>
          <Question
            className="capture-area"
            style={{
              flex: isMobile ? questionFlex : "1 1 50%",
            }}
            isDragging={isDragging}
            questionFlex={questionFlex}
          >
            <p>
              <span>
                <img src={getImageSrc(marketingMbtiResult.name)} alt="" />
              </span>
              {marketingMbtiResult.category} <br />
              {marketingMbtiResult.name}
            </p>
            <div>
              <strong>{marketingMbtiResult.summary}</strong>
              <p>{marketingMbtiResult.description}</p>

              <strong>당신과 같은 유형의 창업가는?</strong>
              <EntrepreneurList className="entrepreneur-item">
                {getEntrepreneursByMbti(marketingMbtiResult.name).map(
                  (entrepreneur, index) => (
                    <EntrepreneurBox className="entrepreneur-box" key={index}>
                      <strong>{entrepreneur.name}</strong>
                      <p>{entrepreneur.company}</p>
                    </EntrepreneurBox>
                  )
                )}
              </EntrepreneurList>

              {!isCapturing && (
                <CustomButton
                  DbExLarge
                  PrimaryLightest
                  Fill
                  onClick={captureAndShare}
                >
                  결과 공유하기
                </CustomButton>
              )}
            </div>
          </Question>

          {/* 새로운 모바일 결과 카드 추가 */}
          <MobileResultCard className="mobile-result-card">
            <div className="icon-wrapper">
              <img
                src={getImageSrc(marketingMbtiResult.name)}
                alt={`${marketingMbtiResult.name} 아이콘`}
              />
            </div>
            <div className="mbti-result">
              <h2>{marketingMbtiResult.category}</h2>
              <h3>{marketingMbtiResult.name}</h3>
            </div>

            <div className="description-card">
              <p className="light-bulb">
                <strong>{marketingMbtiResult.summary}</strong>
              </p>
              <p className="main-description">
                {marketingMbtiResult.description}
              </p>
              <div className="entrepreneurs">
                <h4>당신과 같은 유형의 창업가는?</h4>
                {getEntrepreneursByMbti(marketingMbtiResult.name).map(
                  (entrepreneur, index) => (
                    <div className="entrepreneur-box" key={index}>
                      <div className="info">
                        <div className="name">{entrepreneur.name}</div>
                        <div className="company">{entrepreneur.company}</div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </MobileResultCard>

          <Answer
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            isDragging={isDragging}
            questionFlex={questionFlex}
          >
            <ResultWrap>
              <div className="info">
                <div className="capture-area">
                  <strong>{marketingMbtiResult.summary}</strong>
                  <p>{marketingMbtiResult.description}</p>

                  <strong>당신과 같은 유형의 창업가는?</strong>
                  <EntrepreneurList>
                    {getEntrepreneursByMbti(marketingMbtiResult.name).map(
                      (entrepreneur, index) => (
                        <EntrepreneurBox key={index}>
                          <Entrepreneurs />
                          <h3>{entrepreneur.name}</h3>
                          <p>{entrepreneur.company}</p>
                          <Entrepreneurs />
                        </EntrepreneurBox>
                      )
                    )}
                  </EntrepreneurList>
                </div>
                <ShareButton onClick={captureAndShare}>
                  결과 저장/공유하기
                </ShareButton>
              </div>

              <div className="title">
                <strong>💡 추천 아이템, 내 사업으로 만들기</strong>
                <p>
                  추천된 아이템의 가능성을 분석하고, 나만의 창업 아이템으로
                  발전시켜 보세요
                </p>
              </div>

              <ListBox>
                {isLoadingRecommendedItem ? (
                  <>
                    <div
                      style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <SkeletonTitle
                        className="title-placeholder"
                        style={{ marginBottom: "0" }}
                      />
                      <SkeletonLine className="title-placeholder" />
                    </div>
                    <div
                      style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <SkeletonTitle
                        className="title-placeholder"
                        style={{ marginBottom: "0" }}
                      />
                      <SkeletonLine className="title-placeholder" />
                    </div>
                    <div
                      style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <SkeletonTitle
                        className="title-placeholder"
                        style={{ marginBottom: "0" }}
                      />
                      <SkeletonLine className="title-placeholder" />
                    </div>
                  </>
                ) : (
                  <>
                    {/* {marketingRecommendedItemData?.example?.map((item, index) => (
                      <div key={index}>
                        <p>
                          <strong>{item.name}</strong>
                          {item.summary}
                        </p>
                        <span onClick={() => handleOpenPopup(index)}>시작하기</span>
                      </div>
                    ))} */}

                    <div>
                      <p>
                        <strong>
                          {marketingRecommendedItemData?.example?.[0]?.name}
                        </strong>
                        {marketingRecommendedItemData?.example?.[0]?.summary}
                      </p>
                      <span onClick={() => handleOpenPopup(0)}>시작하기</span>
                    </div>
                    <div>
                      <p>
                        <strong>
                          {marketingRecommendedItemData?.example?.[1]?.name}
                        </strong>
                        {marketingRecommendedItemData?.example?.[1]?.summary}
                      </p>
                      <span onClick={() => handleOpenPopup(1)}>시작하기</span>
                    </div>
                    <div>
                      <p>
                        <strong>
                          {marketingRecommendedItemData?.example?.[2]?.name}
                        </strong>
                        {marketingRecommendedItemData?.example?.[2]?.summary}
                      </p>
                      <span onClick={() => handleOpenPopup(2)}>시작하기</span>
                    </div>
                  </>
                )}
              </ListBox>

              <span className="comment">
                * 위 아이템은 창업 MBTI 결과를 기반으로 구성되었으며, 현실에
                없는 아이템이 포함될 수 있습니다.
              </span>
            </ResultWrap>
          </Answer>

          {isPopup1Open && (
            <Popup
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  closePopup(); // 상태를 false로 설정
                }
              }}
            >
              <div>
                <ScrollBoxWrap>
                  <div className="header">
                    <h5>
                      {
                        marketingRecommendedItemData?.example?.[popupIndex]
                          ?.summary
                      }
                    </h5>
                    <p>
                      {
                        marketingRecommendedItemData?.example?.[popupIndex]
                          ?.description
                      }
                    </p>
                    <button className="closePopup" onClick={() => closePopup()}>
                      닫기
                    </button>
                  </div>
                  <div className="body">
                    <ScrollWrap>
                      {marketingRecommendedItemData?.example?.[
                        popupIndex
                      ]?.mbti?.map((mbtiItem, mbtiIndex) => {
                        return (
                          <div key={mbtiIndex}>
                            <strong>
                              <span>{marketingMbtiResult.name[mbtiIndex]}</span>
                              {getMbtiDescription(
                                marketingMbtiResult.name[mbtiIndex]
                              )}
                            </strong>
                            <p>{mbtiItem.compatibility}</p>
                          </div>
                        );
                      })}
                    </ScrollWrap>

                    <PopupButton>
                      <button onClick={() => handleButtonExpert(popupIndex)}>
                        사업화 가능성 확인하기
                      </button>
                    </PopupButton>
                  </div>
                </ScrollBoxWrap>
              </div>
            </Popup>
          )}
        </QuestionWrap>
        {isExitPopupOpen && (
          <ExitPopup Cancel>
            <div>
              <button
                type="button"
                className="closePopup"
                onClick={handleExitCancel}
              >
                닫기
              </button>
              <span>
                <img src={images.ExclamationMarkRed} alt="" />
              </span>
              <p>
                <strong>모든 내용이 삭제됩니다</strong>
                <span>
                  종료 또는 새로고침 할 경우, 모든 대화내역이 사라집니다.
                </span>
              </p>
              <div className="btnWrap">
                <button type="button" onClick={handleExitCancel}>
                  계속 진행하기
                </button>
                <button type="button" onClick={handleExitConfirm}>
                  종료할게요
                </button>
              </div>
            </div>
          </ExitPopup>
        )}
        {showSuccessPopup && (
          <PopupWrap
            Check
            title="저장 및 복사 완료"
            message="이미지 저장 및 URL 복사가 완료되었습니다."
            buttonType="Outline"
            confirmText="확인"
            isModal={false}
            onCancel={() => setShowSuccessPopup(false)}
            onConfirm={() => setShowSuccessPopup(false)}
          />
        )}

        {showErrorPopup && (
          <PopupWrap
            Warning
            title="저장 실패"
            message="이미지 저장에 실패했습니다. 다시 시도해주세요."
            buttonType="Outline"
            confirmText="확인"
            isModal={false}
            onCancel={() => setShowErrorPopup(false)}
            onConfirm={() => setShowErrorPopup(false)}
          />
        )}
      </ThemeProvider>
    </>
  );
};

export default PageMarketingNoItemsResult;

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
    background: ${palette.white};
    cursor: pointer;

    &.active {
      border: 2px solid ${palette.white};
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
          border-left: 3px solid ${palette.white};
          border-bottom: 3px solid ${palette.white};
          content: "";
        }
      }
    }
  }
`;

const QuestionWrap = styled.section`
  position: relative;
  height: 100vh;
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

// const Question = styled.div`
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   gap: 64px;
//   flex: 1 1 50%;
//   background: #5547ff;
//   transition: all 0.5s;

//   // 모바일 스타일 조정
//   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
//     flex: 1 1 100%; // 전체 너비 사용
//     padding: 20px; // 여백 추가
//     text-align: center; // 텍스트 중앙 정렬

//     > p {
//       font-size: 1.5rem; // 폰트 크기 조정
//       color: ${palette.white}; // 텍스트 색상
//     }

//     div {
//       display: flex;
//       flex-direction: column;
//       gap: 16px;
//       max-width: 100%; // 최대 너비 100%
//       text-align: center; // 텍스트 중앙 정렬
//       padding: 16px; // 여백 추가
//       margin: 0 auto; // 중앙 정렬
//       border-radius: 20px;
//       background: ${palette.white};

//       strong {
//         font-size: 1.25rem; // 폰트 크기 조정
//         color: #5547ff; // 텍스트 색상
//       }

//       p {
//         font-size: 1rem; // 폰트 크기 조정
//       }
//     }
//   }
// `;

const Question = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 64px;
  flex: 1 1 50%;
  background: #5547ff;
  transition: all 0.5s;

  > p {
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.4;
    color: ${palette.white};
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 12px;

    span {
      font-size: 1.25rem;
      font-weight: 300;
      line-height: 1.2;

      img {
        max-width: 100px;
      }
    }

    br {
      display: ${(props) =>
        props.questionFlex === "1 1 10%" ? "none" : "inline"};
    }
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 680px;
    text-align: left;
    padding: 32px;
    margin: 0 10%;
    border-radius: 20px;
    background: ${palette.white};

    strong {
      font-size: 1.13rem;
      font-weight: 500;
      color: #5547ff;
      line-height: 1.5;
    }

    p {
      font-size: 1.25rem;
      line-height: 1.6;
    }

    .entrepreneur-item {
      display: flex;
      flex-direction: row;
      background: white;
      border-radius: 12px;
      white-space: nowrap;
      justify-content: space-between;
      padding: 0px;
      margin-left: 0px;
      margin-bottom: 10px;
    }

    .entrepreneur-box {
      border-radius: 12px;
      flex: 0 0 53%;
      margin-left: 0px;
      margin-right: 0px;
      // text-align: center;

      strong {
        font-weight: 600;
        color: black;
        font-size: 24px;
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex: 1 1 100%;
    // justify-content:end;
    // padding-bottom:76px;
    justify-content: ${(props) =>
      props.questionFlex === "1 1 10%" ? "center" : "end"};
    padding-bottom: ${(props) =>
      props.questionFlex === "1 1 10%" ? "0" : "76px"};

    > p {
      font-size: 1.25rem;

      span {
        // display: ${(props) => (props.isSmallFlex ? "none" : "inline-block")};
        display: ${(props) =>
          props.questionFlex === "1 1 10%" ? "none" : "block"};

        img {
          max-width: 100%;
        }
      }
    }

    div {
      display: none;
    }

    ${(props) =>
      props.isDragging &&
      `
      ${Question} {
        flex: 1 1 10%;
      }
    `}
  }
`;

const CustomButton = styled(Button)`
  color: #5547ff;
  background: rgba(85, 71, 255, 0.05);
`;

const Answer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex: 1 1 50%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex: 1 1 70%;
    overflow: hidden;
    justify-content: flex-start;
    overflow-y: ${(props) =>
      props.questionFlex === "1 1 10%" ? "auto" : "hidden"};

    ${(props) =>
      props.isDragging &&
      `
      overflow-y: auto;
    `}
  }
`;

const ResultWrap = styled.div`
  max-width: 566px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 10%;

  .info {
    display: none;
    flex-direction: column;
    gap: 16px;
    text-align: left;
    padding-bottom: 32px;
    margin-bottom: 10px;
    border-bottom: 4px solid ${palette.chatGray};

    strong {
      font-size: 1.13rem;
      font-weight: 500;
      color: #5547ff;
      margin-bottom: 12px;
      display: block;
    }

    p {
      font-weight: 300;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    strong:nth-of-type(2) {
      display: block;
      margin-bottom: 1px;
    }
  }

  .title {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;

    strong {
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1.5;
    }

    p {
      font-weight: 300;
      line-height: 1.5;
      margin-left: 22px;
    }
  }

  .comment {
    font-size: 0.88rem;
    font-weight: 300;
    color: ${palette.gray500};
    line-height: 1.5;
    text-align: left;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 44px 20px;
    margin: 0 auto;

    .info {
      display: flex;
    }

    .title {
      strong {
        font-size: 1.13rem;
      }

      p {
        font-size: 0.88rem;
      }
    }

    .comment {
      font-size: 0.75rem;
      letter-spacing: -0.5px;
    }
  }
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px;
    border-radius: 20px;
    border: 1px solid ${palette.gray200};
  }

  p {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-weight: 300;
    color: ${palette.gray800};
    line-height: 1.5;
    text-align: left;

    strong {
      font-weight: 600;
      color: #5547ff;
    }
  }

  span {
    flex-shrink: 0;
    font-size: 0.88rem;
    color: #0453f4;
    line-height: 1.5;
    padding: 8px 20px;
    border-radius: 5px;
    background: rgba(4, 83, 244, 0.1);
    cursor: pointer;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 8px;

    > div {
      padding: 16px 20px;
      border-radius: 15px;
    }

    p {
      font-size: 0.88rem;

      strong {
        font-size: 1rem;
      }
    }

    span {
      padding: 8px 12px;
    }
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
    right: 0;
    top: 0;
    width: 16px;
    height: 16px;
    font-size: 0;
    padding: 11px;
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
      background: ${palette.black};
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
    gap: 32px;
    width: 100%;
    max-width: 686px;
    text-align: center;
    padding: 32px;
    border-radius: 20px;
    background: ${palette.white};
    max-height: 90vh; // 화면을 벗어나지 않도록 최대 높이 설정
  }

  .header {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 1rem;
    text-align: left;
    padding-bottom: 32px;
    margin-bottom: 32px;
    border-bottom: 1px solid ${palette.gray200};

    h5 {
      font-size: 1rem;
      font-weight: 500;
      color: #5547ff;
      line-height: 1.7;
    }

    p {
      font-weight: 400;
      line-height: 1.6;
      color: ${palette.gray800};
    }
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 32px;
    overflow-y: auto; // 내용이 넘칠 경우 스크롤 추가
    // max-height: calc(90vh - 64px);
    // max-height:570px;
    max-height: 40dvh;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    background: rgba(0, 0, 0, 0.6);

    > div {
      top: auto;
      bottom: 0;
      transform: translateX(-50%);
      height: 83%;
      // padding:56px 0 0;
      // padding: 56px 0 84px;
      padding: 20px 0 84px;
      overflow: hidden;
      border-radius: 20px 20px 0 0;
    }

    .closePopup {
      right: 20px;
      top: 0;
    }

    .header {
      padding: 0 20px;
      gap: 16px;
      padding-bottom: 32px;
      padding-top: 30px;

      h5 {
        font-size: 1.13rem;
        line-height: 1.5;
      }

      p {
        font-weight: 300;
      }
    }

    .body {
      padding: 0 20px 30px;
      max-height: 100%;
      overflow: initial;
    }
  }
`;

const ScrollBoxWrap = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    overflow-y: auto;
  }
`;

const ScrollWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  // max-height: 580px;
  overflow-y: auto;

  > div {
    display: flex;
    flex-direction: column;
    gap: 12px;

    strong {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 300;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        font-weight: 400;
        color: ${palette.blue};
        border-radius: 5px;
        background: rgba(4, 83, 244, 0.1);
      }
    }

    p {
      font-weight: 300;
      line-height: 1.6;
      color: ${palette.gray700};
      text-align: left;
      padding-left: 44px;
    }
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${palette.lineGray};
    border-radius: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 20px;
    overflow: initial;

    > div {
      text-align: left;

      p {
        font-size: 0.88rem;
      }
    }
  }
`;

const PopupButton = styled.div`
  display: flex;
  gap: 12px;
  align-itesm: center;

  button {
    width: 100%;
    font-family: Pretendard, Poppins;
    font-weight: 600;
    font-size: 1rem;
    color: ${palette.white};
    line-height: 1.5;
    padding: 12px;
    border-radius: 8px;
    border: 0;
    background: ${palette.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    width: calc(100% - 40px);
  }
`;

const ExitPopup = styled.div`
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

const ShareButton = styled.button`
  padding: 16px 48px;
  background: ${palette.white};
  color: #5547ff;
  border: none;
  border-radius: 50px;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 10px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 12px 32px;
    font-size: 1rem;
  }
`;

const EntrepreneurList = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between; // 세로 중앙 정렬
  gap: 12px;
  margin-top: 12px; // 상단 간격 추가
`;

const EntrepreneurBox = styled.div`
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  justify-content: space-between; // 세로 중앙 정렬

  h3 {
    font-weight: 600;
    color: black;
    font-size: 20px;
    text-align: left;
    margin-bottom: 4px;
    margin-top: 10px;
  }

  p {
    text-align: left;
    color: #666;
    font-size: 16px;
  }
`;

const Entrepreneurs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; // 세로 중앙 정렬

  h3 {
    font-weight: 600;
    color: black;
    font-size: 20px;
    text-align: left;
    margin-bottom: 8px;
  }

  p {
    text-align: left;
    color: #666;
    font-size: 16px;
  }
`;

// 새로운 모바일 카드 컴포넌트 추가
const MobileResultCard = styled.div`
  // 기본적으로 숨김 상태
  display: none;
  visibility: hidden;
  position: absolute;
  left: -9999px;
  top: -9999px; // top 위치도 화면 밖으로 이동

  // 나머지 스타일은 동일하게 유지
  background: #5547ff;
  padding: 40px 20px;
  padding-bottom: 0;
  text-align: center;
  color: ${palette.white};
  width: 100%;
  max-width: 500px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
    visibility: hidden;
    position: absolute;
    left: -9999px;
    top: -9999px;
  }

  .icon-wrapper {
    margin-bottom: 20px;
    img {
      width: 180px;
      height: 120px;
      object-fit: contain;
    }
  }

  .mbti-result {
    margin-bottom: 32px;
    h2 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    h3 {
      font-size: 32px;
      font-weight: 700;
    }
  }

  .description-card {
    background: ${palette.white};
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 0; // 마진 제거

    .light-bulb {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #5547ff;
      font-size: 14px;
      margin-bottom: 16px;

      strong {
        flex: 1;
      }
    }

    .main-description {
      color: #333;
      font-size: 16px;
      line-height: 1.6;
      text-align: left;
      margin-bottom: 24px;
    }

    .entrepreneurs {
      display: flex;
      flex-direction: column;
      gap: 12px;

      h4 {
        color: #5547ff;
        font-size: 16px;
        font-weight: 500;
        text-align: left;
        font-weight: 500;
      }

      .entrepreneur-box {
        display: flex;
        justify-content: space-between;
        background: #f8f9fa;
        padding: 16px;
        border-radius: 12px;

        .info {
          text-align: left;

          .name {
            font-weight: 600;
            font-size: 16px;
            color: #333;
            margin-bottom: 4px;
          }

          .company {
            font-size: 14px;
            color: #666;
          }
        }
      }
    }
  }
`;
