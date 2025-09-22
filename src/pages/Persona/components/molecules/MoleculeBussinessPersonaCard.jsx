//산업별 인기 페르소나 카드
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette.jsx";
import images from "../../../../assets/styles/Images.jsx";
import { Button } from "../../../../assets/styles/ButtonStyle.jsx";
import PopupWrap from "../../../../assets/styles/Popup.jsx";
import {
  H4,
  Body1,
  Body3,
  Sub3,
  Caption2,
} from "../../../../assets/styles/Typography.jsx";
import {
  ListBoxItem,
  ListSubtitle,
  ListText,
  ListTitle,
  ListButton,
  Badge,
  CardListItem,
  CardText,
  CardTitle,
  CardButton,
  InterviewPopup,
  Status,
  TabWrapType2,
  TabButtonType2,
  TabContent,
} from "../../../../assets/styles/BusinessAnalysisStyle.jsx";
import axios from "axios";
import { updateProjectOnServer } from "../../../../utils/indexedDB.js";
import { getProjectByIdFromIndexedDB } from "../../../../utils/indexedDB.js";
import { createRequestPersonaOnServer } from "../../../../utils/indexedDB.js";
import { UserCreditInfo } from "../../../../utils/indexedDB.js";
import { useAtom } from "jotai";
import {
  PROJECT_ID,
  IS_LOGGED_IN,
  BUSINESS_ANALYSIS,
  USER_CREDITS,
} from "../../../AtomStates.jsx";
import { UserCreditCheck, UserCreditUse } from "../../../../utils/indexedDB.js";
const MoleculeBussinessPersonaCard = ({
  title,
  persona_type,
  keywords = [],
  gender,
  age,
  job,
  isBasic = false,
  isCustom = false,
  isComplete = false,
  isRequest = true,
  hideCheckCircle = false,
  TitleFlex = false,
  NoLine = false,
  onSelect,
  currentSelection,
  onClick,
  checked = null,
  newLine = false,
  viewType = "list",
  personaData = {},
  isExist = false,
  eventState,
  eventTitle,
  trialState,
  creditRequestBusinessPersona,
}) => {
  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [businessAnalysis, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);

  const [isChecked, setIsChecked] = useState(false);
  const [requestStatus, setRequestStatus] = useState(isRequest);
  const [showRequestPopup, setShowRequestPopup] = useState(false);

  const [selectedPersonaForPopup, setSelectedPersonaForPopup] = useState(null);
  const [activeTab1, setActiveTab1] = useState("lifestyle");
  const [showPopup, setShowPopup] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [localPersonaData, setLocalPersonaData] = useState(personaData);

  const getCategoryColor = (category) => {
    switch (category) {
      case "전형적 사용자 페르소나":
        return "Red";
      case "극단적 사용자 페르소나":
        return "LavenderMagenta";
      case "비교 소비자 페르소나":
        return "Amethyst";
      case "비전통적 사용자 페르소나":
        return "TurkishRose";
      case "문제 해결 중심 페르소나":
        return "NavyBlue";
      case "건강 중시 페르소나":
        return "MidnightBlue";
      case "시장 트렌드 리더 페르소나":
        return "ButtonBlue";
      case "예산 중시 소비자 페르소나":
        return "MiddleBlueGreen";
      case "혁신 추구 소비자 페르소나":
        return "GreenSheen";
      case "환경/윤리 중시 페르소나":
        return "TropicalRainForest";
      case "기능/성능 중시 소비자 페르소나":
        return "DollarBill";
      case "브랜드 충성 소비자 페르소나":
        return "Olivine";
      case "감성적 소비자 페르소나":
        return "ChineseGreen";
      case "특정 상황 중심 페르소나":
        return "Jonquil";
      case "문화적/지역적 특성 중심 페르소나":
        return "PastelOrange";
      case "DIY/커스터마이징 선호 페르소나":
        return "Tangerine";
      case "트렌드 회의적 소비자 페르소나":
        return "Copper";
      case "단체 구매 소비자 페르소나":
        return "Shadow";
      case "호기심 기반 소비자 페르소나":
        return "Tuscany";
      case "브랜드 전환 의향 소비자 페르소나":
        return "VeryLightTangelo";
      default:
        return "";
    }
  };

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  useEffect(() => {
    setLocalPersonaData(personaData);
  }, [personaData]);

  const handleCheck = () => {
    if (isCustom) {
      onClick && onClick(); // 팝업 표시를 위한 콜백 실행
      return;
    }
    onSelect && onSelect();

    // 이미 선택된 상태면 항상 해제 가능
    if (isChecked && checked === null) {
      setIsChecked(false);
      onSelect(false);
    }
    // 새로 선택하는 경우, 최대 선택 개수 확인
    else if (currentSelection < 5 && checked === null) {
      setIsChecked(true);
      onSelect(true);
    }
  };

  const handleRequestClick = () => {
    setShowRequestPopup(true);
  };

  const handleRequestPersona = async () => {
    setSelectedPersonaForPopup(null);
    try {
      // 현재 서버에 저장된 requestedPersona 값을 가져옴
      const currentProject = await getProjectByIdFromIndexedDB(
        projectId,
        isLoggedIn
      );
      const currentRequestedPersona = currentProject?.businessPersonaList || [];
      // const filteredPersona = currentRequestedPersona.filter(
      //   (persona) => persona.persona !== localPersonaData.persona
      // );
      // 현재 요청된 페르소나 목록에서 동일한 페르소나가 있는지 확인하고 status 업데이트
      let filteredPersona = [];
      currentRequestedPersona.forEach((persona) => {
        if (persona.persona === localPersonaData.persona) {
          persona.status = "request";
        }
        filteredPersona.push(persona);
      });

      // localPersonaData.status가 undefined일 때만 요청을 진행
      if (localPersonaData.status === undefined) {
        // 새로운 requestedPersona 배열 생성
        const newRequestedPersona = [...filteredPersona];

        // 서버 업데이트
        await updateProjectOnServer(
          projectId,
          { businessPersonaList: newRequestedPersona },
          isLoggedIn
        );

        const requestData = {
          projectId: projectId,
          requestDate: new Date().toLocaleString("ko-KR", {
            timeZone: "Asia/Seoul",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          requestTimeStamp: Date.now(),
          businessAnalysis: businessAnalysis,
          personaRequest: { ...localPersonaData, status: "request" },
        };
        createRequestPersonaOnServer(requestData, isLoggedIn);

        // 상태 업데이트: status를 "ing"로 변경하여 뱃지에 반영
        setLocalPersonaData({ ...localPersonaData, status: "request" });
        setRequestStatus(false);
      } else {
        console.error("이미 요청된 페르소나입니다.");
      }
    } catch (error) {
      console.error("페르소나 요청 중 오류 발생:", error);
    }
  };

  // const handleCloseRequestPopup = () => {
  //   setShowRequestPopup(false);
  //   setRequestStatus(false);
  // };

  const handleDetailClick = () => {
    setShowPopup(true);
  };

  const creditUse = async () => {
    // 팝업 닫기
    setShowRequestPopup(false);

    let accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("토큰이 없습니다.");
      return;
    }

    // 크레딧 사용전 사용 확인
    const creditPayload = {
      // 기존 10 대신 additionalQuestionMount 사용
      mount: creditRequestBusinessPersona,
    };
    const creditResponse = await UserCreditCheck(creditPayload, isLoggedIn);
    // console.log("크레딧 체크 응답:", creditResponse);

    if (creditResponse?.state !== "use") {
      setShowCreditPopup(true);
      return;
    }

    // 크레딧이 사용 가능한 상태면 사용 API 호출
    const creditUsePayload = {
      title: businessAnalysis.title,
      service_type: "비즈니스 페르소나 모집 요청",
      target: "",
      state: "use",
      mount: creditRequestBusinessPersona,
    };

    const creditUseResponse = await UserCreditUse(creditUsePayload, isLoggedIn);
    // console.log("크레딧 사용 응답:", creditUseResponse);

    // 크레딧 사용 후 사용자 정보 새로고침
    accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      const userCreditValue = await UserCreditInfo(isLoggedIn);

      // 전역 상태의 크레딧 정보 업데이트
      setUserCredits(userCreditValue);
    }

    handleRequestPersona();
  };

  return (
    <>
      {/* 리스트 버전 */}
      {viewType === "list" && (
        <ListBoxItem
          TitleFlex={TitleFlex}
          $isChecked={isChecked}
          NoLine={NoLine}
        >
          <ListText>
            <ListTitle>
              <Body1>{title}</Body1>

              {localPersonaData.status === undefined ? (
                <Badge Request>
                  <img src={images.Plus} alt="요청 필요" />
                  요청 필요
                </Badge>
              ) : localPersonaData.status === "request" ? (
                <Badge Check>요청 검토 중</Badge>
              ) : localPersonaData.status === "ing" ? (
                <Badge Ing>모집 중</Badge>
              ) : localPersonaData.status === "complete" ? (
                <Badge Complete>
                  <img src={images.CheckGreen} alt="모집 완료" />
                  모집 완료
                </Badge>
              ) : (
                <></>
              )}
            </ListTitle>

            {keywords.length > 0 && (
              <ListSubtitle>
                <TagWrap>
                  <TagType color={getCategoryColor(persona_type)} />
                </TagWrap>
                {keywords.map((keyword, index) => (
                  <Badge Keyword key={index}>
                    #{keyword}
                  </Badge>
                ))}
              </ListSubtitle>
            )}
          </ListText>

          <ListButton>
            <CustomButton
              Medium
              PrimaryLightest
              Fill
              onClick={handleDetailClick}
            >
              자세히
            </CustomButton>
            {localPersonaData.status === undefined && (
              <CustomButton Medium Primary Fill onClick={handleRequestClick}>
                모집 요청
              </CustomButton>
            )}
          </ListButton>
        </ListBoxItem>
      )}

      {/* 카드 버전 */}
      {viewType === "card" && (
        <CardListItem>
          <CardText>
            <CardTitle>
              {localPersonaData.status === undefined ? (
                <Badge Request>
                  <img src={images.Plus} alt="요청 필요" />
                  요청 필요
                </Badge>
              ) : localPersonaData.status === "request" ? (
                <Badge Check>요청 검토 중</Badge>
              ) : localPersonaData.status === "ing" ? (
                <Badge Ing>
                  {/* <img src={images.PersonaCustomizing} alt="모집 중" /> */}
                  모집 중
                </Badge>
              ) : localPersonaData.status === "complete" ? (
                <Badge Complete>
                  <img src={images.CheckGreen} alt="모집 완료" />
                  모집 완료
                </Badge>
              ) : (
                <></>
              )}
              <Body1>{title}</Body1>
            </CardTitle>

            <ListSubtitle>
              {keywords.map((keyword, index) => (
                <Badge Keyword key={index}>
                  #{keyword}
                </Badge>
              ))}
            </ListSubtitle>

            <ListSubtitle TextOverflow>
              <Caption2 color="gray500">{localPersonaData.lifestyle}</Caption2>
            </ListSubtitle>
          </CardText>

          <CardButton>
            <CustomButton
              Medium
              PrimaryLightest
              Fill
              onClick={handleDetailClick}
            >
              자세히
            </CustomButton>
            {localPersonaData.status === undefined && (
              <CustomButton Medium Primary Fill onClick={handleRequestClick}>
                모집 요청
              </CustomButton>
            )}
          </CardButton>
        </CardListItem>
      )}

      {showPopup && isBasic && (
        <>
          <InterviewPopup>
            <div>
              <div className="header">
                <H4>
                  {localPersonaData.persona_view}
                  <span className="close" onClick={() => setShowPopup(false)} />
                </H4>
                <p className="info">
                  <Sub3>{localPersonaData.gender}</Sub3>
                  <Sub3>
                    {localPersonaData.age.includes("세")
                      ? localPersonaData.age
                      : `${localPersonaData.age}세`}
                  </Sub3>
                  <Sub3>{localPersonaData.residence}</Sub3>
                </p>
              </div>

              <div className="keywords">
                <Status>#{localPersonaData.persona_keyword[0]}</Status>
                <Status>#{localPersonaData.persona_keyword[1]}</Status>
                <Status>#{localPersonaData.persona_keyword[2]}</Status>
              </div>

              <div className="content">
                <TabWrapType2>
                  <TabButtonType2
                    isActive={activeTab1 === "lifestyle"}
                    onClick={() => setActiveTab1("lifestyle")}
                  >
                    라이프스타일
                  </TabButtonType2>
                  <TabButtonType2
                    isActive={activeTab1 === "interests"}
                    onClick={() => setActiveTab1("interests")}
                  >
                    관심사
                  </TabButtonType2>
                  <TabButtonType2
                    isActive={activeTab1 === "consumption"}
                    onClick={() => setActiveTab1("consumption")}
                  >
                    소비성향
                  </TabButtonType2>
                </TabWrapType2>

                {activeTab1 === "lifestyle" && (
                  <TabContent Daily>
                    <Body3 color="gray700">{localPersonaData.lifestyle}</Body3>
                  </TabContent>
                )}
                {activeTab1 === "interests" && (
                  <TabContent Daily>
                    <Body3 color="gray700">{localPersonaData.interest}</Body3>
                  </TabContent>
                )}
                {activeTab1 === "consumption" && (
                  <TabContent Daily>
                    <Body3 color="gray700">
                      {localPersonaData.consumption_pattern}
                    </Body3>
                  </TabContent>
                )}
              </div>

              {/* <Button Large Primary Fill>
                인터뷰 준비 요청하기
              </Button> */}
            </div>
          </InterviewPopup>
        </>
      )}

      {showPopup && !isBasic && (
        <>
          <InterviewPopup>
            <div>
              <div className="header">
                <H4>
                  {localPersonaData.persona}
                  <span className="close" onClick={() => setShowPopup(false)} />
                </H4>
                <p className="info">
                  <Sub3>{localPersonaData.gender}</Sub3>
                  <Sub3>
                    {localPersonaData.age.includes("세")
                      ? localPersonaData.age
                      : `${localPersonaData.age}세`}
                  </Sub3>
                  <Sub3>{localPersonaData.residence}</Sub3>
                </p>
              </div>

              <div className="keywords">
                <Status>#{localPersonaData.keyword[0]}</Status>
                <Status>#{localPersonaData.keyword[1]}</Status>
                <Status>#{localPersonaData.keyword[2]}</Status>
              </div>

              <div className="content">
                <TabWrapType2>
                  <TabButtonType2
                    isActive={activeTab1 === "lifestyle"}
                    onClick={() => setActiveTab1("lifestyle")}
                  >
                    라이프스타일
                  </TabButtonType2>
                  <TabButtonType2
                    isActive={activeTab1 === "interests"}
                    onClick={() => setActiveTab1("interests")}
                  >
                    관심사
                  </TabButtonType2>
                  <TabButtonType2
                    isActive={activeTab1 === "consumption"}
                    onClick={() => setActiveTab1("consumption")}
                  >
                    소비성향
                  </TabButtonType2>
                </TabWrapType2>

                {activeTab1 === "lifestyle" && (
                  <TabContent>
                    <Body3 color="gray700">{localPersonaData.lifestyle}</Body3>
                  </TabContent>
                )}
                {activeTab1 === "interests" && (
                  <TabContent>
                    <Body3 color="gray700">{localPersonaData.interest}</Body3>
                  </TabContent>
                )}
                {activeTab1 === "consumption" && (
                  <TabContent>
                    <Body3 color="gray700">
                      {localPersonaData.consumption_pattern}
                    </Body3>
                  </TabContent>
                )}
              </div>

              {/* <Button Large Primary Fill>
                인터뷰 준비 요청하기
              </Button> */}
            </div>
          </InterviewPopup>
        </>
      )}

      {/* 모집 요청 팝업 추가 */}
      {showRequestPopup &&
        (eventState ? (
          <PopupWrap
            Event
            title="페르소나 모집 요청"
            message={
              <>
                현재 {eventTitle} 기간으로 이벤트 크레딧이 소진됩니다.
                <br />({creditRequestBusinessPersona.toLocaleString()} 크레딧)
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => setShowRequestPopup(false)}
            onConfirm={() => {
              // handleCloseRequestPopup();
              creditUse();
            }}
          />
        ) : trialState ? (
          <PopupWrap
            Check
            title="페르소나 모집 요청"
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditRequestBusinessPersona.toLocaleString()} 크레딧)
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
              // handleCloseRequestPopup();
              creditUse();
            }}
          />
        ) : (
          <PopupWrap
            Check
            title="페르소나 모집 요청"
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditRequestBusinessPersona.toLocaleString()} 크레딧)
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => setShowRequestPopup(false)}
            onConfirm={() => {
              // handleCloseRequestPopup();
              creditUse();
            }}
          />
        ))}
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
        />
      )}
    </>
  );
};

export default MoleculeBussinessPersonaCard;

const CustomButton = styled(Button)`
  min-width: 92px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  padding: 24px 20px;
  border-radius: 10px;
  border: 1px solid
    ${(props) => (props.$isChecked ? palette.primary : palette.outlineGray)};
  background: ${(props) =>
    props.isActive ? "rgba(34, 111, 255, 0.10)" : palette.white};
  cursor: ${(props) => (props.isClickable ? "pointer" : "default")};
  transition: all 0.2s ease-in-out;

  ${(props) =>
    props.TitleFlex &&
    css`
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
    `}

  ${(props) =>
    props.NoLine &&
    css`
      padding: 0;
      border: none;

      + div {
        padding-top: 16px;
        border-radius: 0;
        border-top: 1px solid ${palette.outlineGray};
      }
    `}
`;

const MainContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;

  > button {
    display: flex;
    align-items: center;
    gap: 12px;

    &:after {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-right: 2px solid ${palette.primary};
      border-top: 2px solid ${palette.primary};
      transform: rotate(45deg);
      content: "";
    }
  }

  ${(props) =>
    props.NoLine &&
    css`
      justify-content: space-between; // space-between으로 변경
      gap: 8px;
    `}
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  margin-right: 12px;

  ${(props) =>
    props.NoLine &&
    css`
      flex: 1; // flex: 1로 변경하여 공간을 채우도록 설정
      margin-right: 12px; // 기본값과 동일하게 유지
    `}
`;

const CheckCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  background-image: ${(props) =>
    props.$isChecked
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23226FFF'/%3E%3Cpath d='M6.76562 12.4155L9.9908 15.6365L17.2338 8.36426' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='11.5' stroke='%23E0E4EB'/%3E%3C/svg%3E")`};
  transition: background-image 0.3s ease-in-out;
  cursor: pointer;
`;

const TitleSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Title = styled.div`
  font-weight: 600;
  color: ${palette.gray800};
  text-align: left;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  gap: 8px;

  > p {
    flex-shrink: 0;
  }

  ${(props) =>
    props.NoLine &&
    css`
      font-weight: 400;
      line-height: 1.5;
    `}
`;

const TitleInfo = styled.div`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.3;
  color: ${palette.gray500};

  span {
    + span {
      margin-left: 6px;

      &:before {
        display: inline-block;
        width: 1px;
        height: 9px;
        margin-right: 6px;
        background: ${palette.gray500};
        content: "";
      }
    }
  }
`;

// const Badge = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 4px;
//   font-size: 0.75rem;
//   line-height: 1.2;
//   color: ${(props) => {
//     if (props.Basic) return `#34C759`;
//     else if (props.Custom) return palette.gray500;
//     else return palette.gray500;
//   }};
//   padding: 4px 8px;
//   border-radius: 50px;
//   border: 1px solid
//     ${(props) => {
//       if (props.Basic) return `#34C759`;
//       else if (props.Custom) return palette.primary;
//       else return palette.outlineGray;
//     }};
//   background: ${(props) => {
//     if (props.Basic) return `rgba(52, 199, 89, 0.10)`;
//     else if (props.Custom) return palette.primary;
//     else return palette.gray50;
//   }};
//   cursor: pointer;
//   flex-shrink: 0;
// `;

const ReadyIcon = styled.div`
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 4px 0 4px 6px;
  border-color: transparent transparent transparent #34c759;
  transform: rotate(0deg);
`;

const KeywordGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Description = styled.div`
  width: 100%;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.5;
  color: ${palette.gray500};
  text-align: left;
  word-break: keep-all;
  white-space: pre-wrap;
`;

const KeywordTag = styled.div`
  padding: 4px 10px;
  color: #666666;
  font-size: 0.75rem;
  line-height: 1.6;
  border-radius: 20px;
  background: ${palette.chatGray};
`;

const ToggleButton = styled.button`
  position: relative;
  width: 20px;
  height: 20px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
  border: none;
  background: none;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    transform: ${(props) =>
      props.$isExpanded
        ? "translate(-50%, -50%) rotate(45deg)"
        : "translate(-50%, -50%) rotate(-135deg)"};
    // margin-top: 2px;
    border-top: 1px solid ${palette.gray500};
    border-left: 1px solid ${palette.gray500};
    transition: all 0.5s;
  }
`;

const DescriptionSection = styled.div`
  width: 100%;
  font-weight: 300;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;
  border-radius: 10px;
  border: ${(props) =>
    props.$isTabContent ? `1px solid ${palette.outlineGray}` : "none"};

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    line-height: 1.5;
    color: ${palette.gray800};
    padding: 20px;
    border-radius: 10px;
    background: ${(props) =>
      props.$isTabContent ? "transparent" : palette.chatGray};
    cursor: pointer;
  }
`;

const ListUL = styled.div`
  padding: 20px;
  border-radius: 15px;
  border: 1px solid ${palette.outlineGray};

  ul {
    display: flex;
    flex-direction: column;
  }

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${palette.gray800};

    + li {
      padding-top: 8px;
      margin-top: 8px;
      border-top: 1px solid ${palette.outlineGray};
    }
  }

  .number {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: ${palette.primary};
    border-radius: 2px;
    border: 1px solid rgba(34, 111, 255, 0.5);
    background: rgba(34, 111, 255, 0.04);
  }
`;

const RecruitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: 4px;
  background: ${palette.primary};
  color: ${palette.white};
  font-size: 0.875rem;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${palette.primaryDark};
  }

  img {
    width: 16px;
    height: 16px;
  }
`;

const TagWrap = styled.div`
  display: flex;
  gap: 8px;
`;

export const TagType = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 4px 10px;
  border-radius: 15px;

  &::before {
    content: "${(props) => {
      switch (props.color) {
        case "Red":
          return "전형적 사용자 페르소나";
        case "LavenderMagenta":
          return "극단적 사용자 페르소나";
        case "Amethyst":
          return "비교 소비자 페르소나";
        case "TurkishRose":
          return "비전통적 사용자 페르소나";
        case "NavyBlue":
          return "문제 해결 중심 페르소나";
        case "MidnightBlue":
          return "건강 중시 페르소나";
        case "ButtonBlue":
          return "시장 트렌드 리더 페르소나";
        case "MiddleBlueGreen":
          return "예산 중시 소비자 페르소나";
        case "GreenSheen":
          return "혁신 추구 소비자 페르소나";
        case "TropicalRainForest":
          return "환경/윤리 중시 페르소나";
        case "DollarBill":
          return "기능/성능 중시 소비자 페르소나";
        case "Olivine":
          return "브랜드 충성 소비자 페르소나";
        case "ChineseGreen":
          return "감성적 소비자 페르소나";
        case "Jonquil":
          return "특정 상황 중심 페르소나";
        case "PastelOrange":
          return "문화적/지역적 특성 중심 페르소나";
        case "Tangerine":
          return "DIY/커스터마이징 선호 페르소나";
        case "Copper":
          return "트렌드 회의적 소비자 페르소나";
        case "Shadow":
          return "단체 구매 소비자 페르소나";
        case "Tuscany":
          return "호기심 기반 소비자 페르소나";
        case "VeryLightTangelo":
          return "브랜드 전환 의향 소비자 페르소나";
        default:
          return "";
      }
    }}";
  }

  ${({ color }) => {
    switch (color) {
      case "Red":
        return `
          color: #E90102;
          background: rgba(233, 1, 2, 0.06);
        `;
      case "LavenderMagenta":
        return `
          color: #ED7EED;
          background: rgba(237, 126, 237, 0.06);
        `;
      case "Amethyst":
        return `
          color: #8B61D1;
          background: rgba(139, 97, 209, 0.06);
        `;
      case "VistaBlue":
        return `
          color: #8B61D1;
          background: rgba(125, 140, 225, 0.06);
        `;
      case "BlueYonder":
        return `
          color: #8B61D1;
          background: rgba(84, 113, 171, 0.06);
        `;
      case "MidnightBlue":
        return `
          color: #03458F;
          background: rgba(3, 69, 143, 0.06);
        `;
      case "ButtonBlue":
        return `
          color: #20B1EA;
          background: rgba(32, 177, 234, 0.06);
        `;
      case "CeruleanFrost":
        return `
          color: #5E9EBF;
          background: rgba(94, 158, 191, 0.06);
        `;
      case "MiddleBlueGreen":
        return `
          color: #7DCED2;
          background: rgba(125, 206, 210, 0.06);
        `;
      case "GreenSheen":
        return `
          color: #74B49C;
          background: rgba(116, 180, 156, 0.06);
        `;
      case "TropicalRainForest":
        return `
          color: #027355;
          background: rgba(2, 115, 85, 0.06);
        `;
      case "DollarBill":
        return `
          color: #8DC955;
          background: rgba(141, 201, 85, 0.06);
        `;
      case "Olivine":
        return `
          color: #AABC76;
          background: rgba(170, 188, 118, 0.06);
        `;
      case "ChineseGreen":
        return `
          color: #C7D062;
          background: rgba(199, 208, 98, 0.06);
        `;
      case "Jonquil":
        return `
          color: #F7CD17;
          background: rgba(247, 205, 23, 0.06);
        `;
      case "PastelOrange":
        return `
          color: #FFBB52;
          background: rgba(255, 187, 82, 0.06);
        `;
      case "Tangerine":
        return `
          color: #F48D0B;
          background: rgba(244, 141, 11, 0.06);
        `;
      case "Copper":
        return `
          color: #BC742F;
          background: rgba(188, 116, 47, 0.06);
        `;
      case "Shadow":
        return `
          color: #8C725B;
          background: rgba(140, 114, 91, 0.06);
        `;
      case "Tuscany":
        return `
          color: #B1A098;
          background: rgba(177, 160, 152, 0.06);
        `;
      case "VeryLightTangelo":
        return `
          color: #FAAD80;
          background: rgba(250, 173, 128, 0.06);
        `;
      case "Orange":
        return `
          color: #FC6602;
          background: rgba(252, 102, 2, 0.06);
        `;
      case "CarnationPink":
        return `
          color: #FFA8B9;
          background: rgba(255, 168, 185, 0.06);
        `;
      case "TurkishRose":
        return `
          color: #B47489;
          background: rgba(180, 116, 137, 0.06);
        `;
      case "SuperPink":
        return `
          color: #D161AC;
          background: rgba(209, 97, 172, 0.06);
        `;
      case "NavyBlue":
        return `
          color: #020273;
          background: rgba(2, 2, 115, 0.06);
        `;
      default:
        return "display: none;";
    }
  }}
`;
