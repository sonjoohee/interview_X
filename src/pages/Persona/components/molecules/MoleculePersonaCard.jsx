//산업별 인기 페르소나 카드
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import PopupWrap from "../../../../assets/styles/Popup";
import {
  H4,
  Body1,
  Body3,
  Sub3,
  Caption2,
} from "../../../../assets/styles/Typography";
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
} from "../../../../assets/styles/BusinessAnalysisStyle";
import axios from "axios";
import { updateProjectOnServer } from "../../../../utils/indexedDB";
import { getProjectByIdFromIndexedDB } from "../../../../utils/indexedDB";
import { createRequestPersonaOnServer } from "../../../../utils/indexedDB";
import { UserCreditInfo } from "../../../../utils/indexedDB";
import { useAtom } from "jotai";
import {
  PROJECT_ID,
  IS_LOGGED_IN,
  BUSINESS_ANALYSIS,
  USER_CREDITS,
  CREDIT_REQUEST_BUSINESS_PERSONA,
  EVENT_STATE,
  EVENT_TITLE,
  TRIAL_STATE,
} from "../../../../pages/AtomStates.jsx";

const MoleculePersonaCard = ({
  title,
  keywords = [],
  isBasic = false,
  isCustom = false,
  isRequest = true,
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
}) => {
  const [, setUserCredits] = useAtom(USER_CREDITS);
  const [projectId, ] = useAtom(PROJECT_ID);
  const [isLoggedIn, ] = useAtom(IS_LOGGED_IN);
  const [businessAnalysis, ] = useAtom(BUSINESS_ANALYSIS);
  const [creditRequestBusinessPersona] = useAtom(
    CREDIT_REQUEST_BUSINESS_PERSONA
  );

  const [isChecked, setIsChecked] = useState(false);
  const [, setRequestStatus] = useState(isRequest);
  const [showRequestPopup, setShowRequestPopup] = useState(false);

  const [, setSelectedPersonaForPopup] = useState(null);
  const [activeTab1, setActiveTab1] = useState("lifestyle");
  const [showPopup, setShowPopup] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);


  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);





  const handleRequestPersona = async () => {
    setSelectedPersonaForPopup(null);

    try {
      // 현재 서버에 저장된 requestedPersona 값을 가져옴
      const currentProject = await getProjectByIdFromIndexedDB(
        projectId,
        isLoggedIn
      );
      const currentRequestedPersona = currentProject?.requestedPersona || [];

      // 중복 체크
      const isDuplicate = currentRequestedPersona.some(
        (persona) => persona.persona === personaData.persona
      );

      if (!isDuplicate) {
        // 새로운 requestedPersona 배열 생성
        const newRequestedPersona = [
          ...currentRequestedPersona,
          { ...personaData, status: "ing" },
        ];

        // 서버 업데이트
        await updateProjectOnServer(
          projectId,
          {
            businessPersonaList: newRequestedPersona,
          },
          isLoggedIn
        );
        const checkDate = new Date().toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        const requestData = {
          projectId: projectId,
          requestDate: checkDate,
          businessAnalysis: businessAnalysis,
          personaRequest: { ...personaData, status: "ing" },
        };
        createRequestPersonaOnServer(requestData, isLoggedIn);
        setRequestStatus(false);
      } else {
        console.error("이미 요청된 페르소나입니다.");
      }
    } catch (error) {
      console.error("페르소나 요청 중 오류 발생:", error);
    }
  };



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
    try {
      const response = await axios.post(
        "https://wishresearch.kr/api/user/credit/check",
        {
          // target: eventState ? "event_credit" : "business_credit",
          target: "event_credit",
          mount: creditRequestBusinessPersona,
          // mount: 10,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
      setShowCreditPopup(true);
      return;
    }

    // 크레딧 소모 API 요청
    try {
      const response = await axios.post(
        "https://wishresearch.kr/api/user/credit/use",
        {
          title: "현재 미정 어떻게받을지 정해야함!",
          service_type: "페르소나 모집 요청",
          target: "",
          state: "use",
          mount: creditRequestBusinessPersona,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      // console.error("크레딧 소모 중 오류 발생:", error);
      return;
    }

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
            </ListTitle>

            {keywords.length > 0 && (
              <ListSubtitle>
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
          </ListButton>
        </ListBoxItem>
      )}

      {/* 카드 버전 */}
      {viewType === "card" && (
        <CardListItem>
          <CardText>
            <CardTitle>
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
              <Caption2 color="gray500">{personaData.lifestyle}</Caption2>
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
          </CardButton>
        </CardListItem>
      )}

      {showPopup && isBasic && (
        <>
          <InterviewPopup>
            <div>
              <div className="header">
                <H4>
                  {personaData.persona_view}
                  <span className="close" onClick={() => setShowPopup(false)} />
                </H4>
                <p className="info">
                  <Sub3>{personaData.gender}</Sub3>
                  <Sub3>
                    {personaData.age.includes("세")
                      ? personaData.age
                      : `${personaData.age}세`}
                  </Sub3>
                  <Sub3>{personaData.residence}</Sub3>
                </p>
              </div>

              <div className="keywords">
                <Status>#{personaData.persona_keyword[0]}</Status>
                <Status>#{personaData.persona_keyword[1]}</Status>
                <Status>#{personaData.persona_keyword[2]}</Status>
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
                    <Body3 color="gray700">{personaData.lifestyle}</Body3>
                  </TabContent>
                )}
                {activeTab1 === "interests" && (
                  <TabContent Daily>
                    <Body3 color="gray700">{personaData.interest}</Body3>
                  </TabContent>
                )}
                {activeTab1 === "consumption" && (
                  <TabContent Daily>
                    <Body3 color="gray700">
                      {personaData.consumption_pattern}
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
                  {personaData.persona}
                  <span className="close" onClick={() => setShowPopup(false)} />
                </H4>
                <p className="info">
                  <Sub3>{personaData.gender}</Sub3>
                  <Sub3>
                    {personaData.age.includes("세")
                      ? personaData.age
                      : `${personaData.age}세`}
                  </Sub3>
                  <Sub3>{personaData.residence}</Sub3>
                </p>
              </div>

              <div className="keywords">
                <Status>#{personaData.keyword[0]}</Status>
                <Status>#{personaData.keyword[1]}</Status>
                <Status>#{personaData.keyword[2]}</Status>
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
                    <Body3 color="gray700">{personaData.lifestyle}</Body3>
                  </TabContent>
                )}
                {activeTab1 === "interests" && (
                  <TabContent>
                    <Body3 color="gray700">{personaData.interest}</Body3>
                  </TabContent>
                )}
                {activeTab1 === "consumption" && (
                  <TabContent>
                    <Body3 color="gray700">
                      {personaData.consumption_pattern}
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
      {showRequestPopup && (
        <PopupWrap
          Event
          title="페르소나 모집 요청"
          message={
            <>
              현재 베타서비스 기간으로 이벤트 크레딧이 소진됩니다.
              {/* 현재 {eventTitle} 기간으로 이벤트 크레딧이 소진됩니다. */}
              <br />
              (10 크레딧)
              {/* ({creditRequestBusinessPersona} 크레딧) */}
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
      )}
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

export default MoleculePersonaCard;

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
