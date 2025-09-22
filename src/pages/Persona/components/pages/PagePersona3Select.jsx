import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import OrganismIncNavigation from "../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../Global/molecules/MoleculeHeader";
import PopupWrap from "../../../../assets/styles/Popup";
import OrganismToastPopup from "../../../Persona/components/organisms/OrganismToastPopup";
import OrganismToastPopupSingleChat from "../../../Persona/components/organisms/OrganismToastPopupSingleChat";
import OrganismToastPopupSingleLiveChat from "../../../Persona/components/organisms/OrganismToastPopupSingleLiveChat";
import { Button } from "../../../../assets/styles/ButtonStyle";
import images from "../../../../assets/styles/Images";
import personaImages from "../../../../assets/styles/PersonaImages";
import MoleculePersonaSelectCardSaas from "../../../Persona/components/molecules/MoleculePersonaSelectCardSaas";
import {
  ContentsWrap,
  MainContent,
  BottomBar,
  ListBoxGroup,
  PersonaGroup,
  Persona,
  SwitchToggle,
  SwitchToggleItem,
  SwitchHandle,
  Tooltip,
  TabWrapType5,
  TabButtonType5,
  TabContent5,
  BoxWrap,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import {
  H3,
  Body1,
  Body2,
  Body3,
  Sub3,
  Caption1,
  Caption2,
} from "../../../../assets/styles/Typography";
import {
  SELECTED_INTERVIEW_TYPE,
  SELECTED_INTERVIEW_PURPOSE,
  SELECTED_INTERVIEW_PURPOSE_DATA,
  IS_PERSONA_ACCESSIBLE,
  PERSONA_BUTTON_STATE_3,
  CREDIT_INDEPTH_INTERVIEW,
  EVENT_STATE,
  EVENT_TITLE,
  TRIAL_STATE,
  USER_CREDITS,
  All_BUSINESS_PERSONA_LIST,
  CUSTOM_PERSONA_LIST,
  PERSONA_LIST_SAAS,
} from "../../../../pages/AtomStates.jsx";
import {
  UserCreditCheck,
  UserCreditUse,
  UserCreditInfo,
} from "../../../../utils/indexedDB";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";

const PagePersona3Select = () => {
  const [customPersonaList] = useAtom(CUSTOM_PERSONA_LIST);
  const [allBusinessPersonas] = useAtom(All_BUSINESS_PERSONA_LIST);
  const [, setUserCredits] = useAtom(USER_CREDITS);
  const [personaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const [selectedInterviewType] = useAtom(SELECTED_INTERVIEW_TYPE);
  const [selectedInterviewPurpose] = useAtom(SELECTED_INTERVIEW_PURPOSE);
  const [selectedInterviewPurposeData] = useAtom(
    SELECTED_INTERVIEW_PURPOSE_DATA
  );
  const [isPersonaAccessible, setIsPersonaAccessible] = useAtom(
    IS_PERSONA_ACCESSIBLE
  );
  const [, setPersonaButtonState3] = useAtom(PERSONA_BUTTON_STATE_3);
  const [creditIndepthInterview] = useAtom(CREDIT_INDEPTH_INTERVIEW);
  const [eventState] = useAtom(EVENT_STATE);
  const [eventTitle] = useAtom(EVENT_TITLE);
  const [trialState] = useAtom(TRIAL_STATE);

  const navigate = useNavigate();

  const [purposeText] = useState("");
  const [, setShowMethodology] = useState(false);
  const [selectedPersonas, setSelectedPersonas] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [isLoggedIn] = useState(true);
  const [businessAnalysis] = useState({
    title: "맞춤 페르소나 인터뷰",
  });
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [isIndepthEnabled, setIsIndepthEnabled] = useState(false);

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  useEffect(() => {
    // 접근 가능 여부를 확인하여 차단 로직 수행
    if (!isPersonaAccessible) {
      navigate("/Project"); // 접근이 허용되지 않으면 메인 페이지로 리다이렉트
    }

    // 페이지를 나갈 때 접근 가능 여부 초기화
    return () => {
      setIsPersonaAccessible(false); // 페이지 떠날 때 접근 불가로 설정
    };
  }, [navigate]);

  // 배경 scroll 방지
  useEffect(() => {
    if (showToast) {
      // body와 html 모두 scroll을 막도록 설정
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    // 컴포넌트 언마운트 시 원상 복구
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [showToast]);

  // 모집 요청 팝업 닫기 함수
  const handleCloseRequestPopup = () => {
    setShowRequestPopup(false);
  };

  // 크레딧 체크 및 사용 함수
  const creditUse = async () => {
    try {
      const creditPayload = {
        // 기존 10 대신 additionalQuestionMount 사용
        mount: creditIndepthInterview,
      };

      const creditResponse = await UserCreditCheck(creditPayload, isLoggedIn);

      if (creditResponse?.state !== "use") {
        setShowCreditPopup(true);
        return;
      }

      // 크레딧이 사용 가능한 상태면 사용 API 호출
      const creditUsePayload = {
        title: businessAnalysis.title,
        service_type: "인뎁스 인터뷰",
        target: "",
        state: "use",
        mount: creditIndepthInterview,
      };

      await UserCreditUse(creditUsePayload, isLoggedIn);

      // 이후 인터뷰 시작 등 추가 로직 처리 (예를 들어 인터뷰 준비 팝업 표시)
      setShowPopup(true);

      // 크레딧 사용 후 사용자 정보 새로고침
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        const userCreditValue = await UserCreditInfo(isLoggedIn);

        // 전역 상태의 크레딧 정보 업데이트
        setUserCredits(userCreditValue);
      }
    } catch (error) {
      // console.error("크레딧 체크 실패:", error);
      setShowCreditPopup(true);
      return;
    }
  };

  const handleStartInterview = () => {
    if (isIndepthEnabled) {
      setShowRequestPopup(true);
    } else {
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleConfirmStart = () => {
    setPersonaButtonState3(1);
    setShowPopup(false);
    setShowToast(true);
  };

  const getSelectedCount = () => {
    if (!selectedPersonas) return 0;
    return Array.isArray(selectedPersonas) ? selectedPersonas.length : 1;
  };

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("persona/3/select")) {
        // 세션 스토리지에서 마지막 URL 가져오기
        const lastUrl = sessionStorage.getItem("lastUrl");

        // 마지막 URL이 현재 URL과 같으면 새로고침
        if (lastUrl && lastUrl === currentUrl) {
          navigate("/Project");
          return true;
        }

        // 현재 URL 저장
        sessionStorage.setItem("lastUrl", currentUrl);
      }

      return false;
    };

    // F5 키 또는 Ctrl+R 감지
    const handleKeyDown = (event) => {
      if (
        (event.key === "r" && (event.metaKey || event.ctrlKey)) ||
        event.key === "F5"
      ) {
        // F5 키 코드
        event.preventDefault();
        navigate("/Project");
      }
    };

    // 함수 실행
    detectRefresh();

    // 이벤트 리스너 등록
    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1030>
          <PersonaSingleWrap>
            <TabWrapType5>
              <TabButtonType5 isActive>
                <span>01</span>
                <div className="text">
                  <Body1 color="gray800">인터뷰 목표 설정</Body1>
                  <Body1 color="gray800">Interview Define</Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5 isActive>
                <span>02</span>
                <div className="text">
                  <Body1 color="gray800">페르소나 선택</Body1>
                  <Body1 color="gray800">Persona Selection</Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5>
                <span>03</span>
                <div className="text">
                  <Body1 color="gray300">
                    {selectedInterviewType === "multiple"
                      ? "그룹 인터뷰"
                      : "심층 인터뷰"}
                  </Body1>
                  <Body1 color="gray300">
                    {selectedInterviewType === "multiple"
                      ? "Group Interview"
                      : "Indepth Interview"}
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5>
                <span>04</span>
                <div className="text">
                  <Body1 color="gray300">최종 인사이트 분석</Body1>
                </div>
              </TabButtonType5>
            </TabWrapType5>

            <TabContent5>
              <div className="title">
                <H3 color="gray800">Persona Selection</H3>
                <Body3 color="gray800">
                  인터뷰에 참여할 최적의 페르소나를 선정하세요{" "}
                </Body3>
              </div>

              <div className="content">
                <div>
                  <Body2 color="gray800" align="left">
                    인터뷰 정보
                  </Body2>

                  <ListBoxGroup>
                    {selectedInterviewType !== "singleLive" && (
                      <li>
                        <Body2 color="gray500">인터뷰 목적</Body2>
                        {selectedInterviewType === "multiple" ? (
                          <Body2 color="gray800">
                            {selectedInterviewPurpose}
                          </Body2>
                        ) : selectedInterviewType === "single" ? (
                          <Body2 color="gray800">
                            {selectedInterviewPurposeData?.view_title || ""}
                          </Body2>
                        ) : null}
                      </li>
                    )}
                    <li>
                      <Body2 color="gray500">페르소나 선택</Body2>
                      {selectedPersonas ? (
                        <PersonaGroup>
                          {Array.isArray(selectedPersonas) ? (
                            <>
                              {selectedPersonas.length > 3 && (
                                <span>+{selectedPersonas.length - 3}</span>
                              )}
                              {selectedPersonas
                                .slice(0, 3)
                                .map((persona, index) => (
                                  <Persona key={index} size="Small" Round>
                                    <img
                                      src={
                                        personaImages[persona.imageKey] ||
                                        (persona.gender === "남성"
                                          ? personaImages.persona_m_20_01 // 남성 기본 이미지
                                          : personaImages.persona_f_20_01) // 여성 기본 이미지
                                      }
                                      alt={persona.persona}
                                    />
                                  </Persona>
                                ))}
                            </>
                          ) : (
                            <Persona size="Small" Round>
                              <img
                                src={
                                  personaImages[selectedPersonas.imageKey] ||
                                  (selectedPersonas.gender === "남성"
                                    ? personaImages.persona_m_20_01 // 남성 기본 이미지
                                    : personaImages.persona_f_20_01) // 여성 기본 이미지
                                }
                                alt={selectedPersonas.persona}
                              />
                            </Persona>
                          )}
                        </PersonaGroup>
                      ) : (
                        <Body2 color="gray300">
                          페르소나가 선택되지 않았습니다. 하단에서 페르소나를
                          선택해 주세요!(최소 1명)
                        </Body2>
                      )}
                    </li>
                    {selectedInterviewType === "multiple" ? (
                      <></>
                    ) : selectedInterviewType === "single" ? (
                      <li style={{ alignItems: "center" }}>
                        <Body2 color="gray500">
                          인뎁스 인터뷰
                          <Tooltip>
                            <span>?</span>
                            <Caption2 align="left" color="white">
                              인뎁스 인터뷰란?
                              <br />
                              페르소나의 답변에 맞춰, 모더레이터가 자동으로 추가
                              질문을 제시하는 맞춤형 인터뷰 방식 입니다.
                            </Caption2>
                          </Tooltip>
                        </Body2>
                        <SwitchToggle>
                          <SwitchToggleItem style={{ marginBottom: "6px" }}>
                            <input
                              type="checkbox"
                              checked={isIndepthEnabled}
                              onChange={(e) =>
                                setIsIndepthEnabled(e.target.checked)
                              }
                            />
                            <span data-on="ON" data-off="OFF" />
                            <SwitchHandle />
                          </SwitchToggleItem>
                          <Body2
                            color={isIndepthEnabled ? "gray800" : "gray300"}
                          >
                            인뎁스 인터뷰 수행
                            {!isIndepthEnabled ? (
                              <Sub3 color="gray300" style={{ width: "auto" }}>
                                ({creditIndepthInterview} 크레딧 소모)
                              </Sub3>
                            ) : (
                              <Sub3 color="gray800" style={{ width: "auto" }}>
                                ({creditIndepthInterview} 크레딧 소모)
                              </Sub3>
                            )}
                          </Body2>
                        </SwitchToggle>
                      </li>
                    ) : null}
                  </ListBoxGroup>
                </div>

                {personaListSaas &&
                personaListSaas.some(
                  (persona) => persona?.status === "complete"
                ) ? (
                  <MoleculePersonaSelectCardSaas
                    interviewType={selectedInterviewType}
                    filteredPersonaList={personaListSaas}
                    businessPersonaList={allBusinessPersonas.filter(
                      (persona) => persona?.status === "complete"
                    )}
                    customPersonaList={customPersonaList}
                    selectedPersonas={selectedPersonas}
                    onPersonaSelect={setSelectedPersonas}
                  />
                ) : (
                  <BoxWrap
                    NoData
                    style={{ height: "300px" }}
                    onClick={() => navigate("/AiPersona")}
                  >
                    <img src={images.PeopleFillPrimary2} alt="" />

                    <Body2 color="gray700" align="center !important">
                      대화 가능한 페르소나가 없습니다.
                      <br />
                      [프로필 보기]에서 ‘인터뷰 활성화 요청’을 먼저 진행해
                      주세요.
                    </Body2>

                    <Button
                      Medium
                      Outline
                      Fill
                      onClick={() => navigate("/AiPersona")}
                    >
                      <Caption1 color="gray700">
                        AI Persona 활성화 하기
                      </Caption1>
                    </Button>
                  </BoxWrap>
                )}
              </div>
              <BottomBar W100>
                <Body2 color="gray800">
                  {selectedInterviewType === "multiple"
                    ? `선택한 ${getSelectedCount()}명의 페르소나와 인터뷰를 진행하시겠습니까?`
                    : getSelectedCount() === 0
                    ? "인터뷰할 페르소나를 선택해주세요"
                    : "선택한 페르소나와 인터뷰를 진행하시겠습니까?"}
                </Body2>
                <Button
                  Large
                  Primary
                  Round
                  Fill
                  disabled={getSelectedCount() === 0}
                  onClick={handleStartInterview}
                >
                  인터뷰 시작
                  <images.ChevronRight
                    width="20px"
                    height="20px"
                    color="white"
                  />
                </Button>
              </BottomBar>
            </TabContent5>
          </PersonaSingleWrap>
        </MainContent>
      </ContentsWrap>

      {showPopup && (
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
          onConfirm={handleConfirmStart}
          show={showPopup}
        />
      )}

      {selectedInterviewType === "multiple" ? (
        <OrganismToastPopup isActive={showToast} autoClose={false} />
      ) : selectedInterviewType === "single" ? (
        <OrganismToastPopupSingleChat
          isActive={showToast}
          autoClose={false}
          isIndepth={isIndepthEnabled}
        />
      ) : selectedInterviewType === "singleLive" ? (
        <OrganismToastPopupSingleLiveChat
          isActive={showToast}
          autoClose={false}
        />
      ) : null}

      {showCreditPopup && (
        <PopupWrap
          Warning
          title="크레딧이 모두 소진되었습니다"
          message={
            <>
              보유한 크레딧이 부족합니다.
              <br />
              크레딧을 충전한 후 다시 시도해주세요.
            </>
          }
          buttonType="Outline"
          closeText="확인"
          isModal={false}
          onCancel={() => setShowCreditPopup(false)}
          onConfirm={() => setShowCreditPopup(false)}
        />
      )}

      {/* 모집 요청 팝업 추가 */}
      {showRequestPopup &&
        (eventState ? (
          <PopupWrap
            Event
            title="인뎁스 인터뷰"
            message={
              <>
                현재 {eventTitle} 기간으로 이벤트 크레딧이 소진됩니다.
                <br />({creditIndepthInterview} 크레딧)
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => setShowRequestPopup(false)}
            onConfirm={() => {
              handleCloseRequestPopup();
              creditUse();
            }}
          />
        ) : trialState ? (
          <PopupWrap
            Check
            title="인뎁스 인터뷰"
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditIndepthInterview} 크레딧)
                {/* <br />
                신규 가입 2주간 무료로 사용 가능합니다. */}
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => setShowRequestPopup(false)}
            onConfirm={() => {
              handleCloseRequestPopup();
              creditUse();
            }}
          />
        ) : (
          <PopupWrap
            Check
            title="인뎁스 인터뷰"
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditIndepthInterview} 크레딧)
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => setShowRequestPopup(false)}
            onConfirm={() => {
              handleCloseRequestPopup();
              creditUse();
            }}
          />
        ))}
      <div style={{ height: "100px" }}></div>
    </>
  );
};

export default PagePersona3Select;

const PersonaSingleWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin-top: 60px;
`;
