import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { palette } from "../../../../../assets/styles/Palette.jsx";
import images from "../../../../../assets/styles/Images.jsx";
import { Button } from "../../../../../assets/styles/ButtonStyle.jsx";
import PopupWrap from "../../../../../assets/styles/Popup.jsx";
import {
  H4,
  Body1,
  Body3,
  Sub3,
  Caption2,
  H5,
} from "../../../../../assets/styles/Typography.jsx";
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
  ListRowWrap,
  ListRowItem,
  ListBoxContent,
} from "../../../../../assets/styles/BusinessAnalysisStyle.jsx";
import axios from "axios";
import { updateProjectOnServer } from "../../../../../utils/indexedDB.js";
import { getProjectByIdFromIndexedDB } from "../../../../../utils/indexedDB.js";
import { createRequestPersonaOnServer } from "../../../../../utils/indexedDB.js";
import { UserCreditInfo } from "../../../../../utils/indexedDB.js";
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
} from "../../../../AtomStates.jsx";

const MoleculeToolPersonaCard = ({
  title,
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
  // personaData={},
  // personaScenario={},
  personaData,
  personaScenario,
  isExist = false,
  onDetailClick,
  popupType = "basic",
  key,
  selectedIndex,
  buttonText = "자세히",
  disabled = false,
  additionalContent,
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const [showBasicPopup, setShowBasicPopup] = useState(false);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [activeTab1, setActiveTab1] = useState("personaInfo");

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

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

  const handleDetailClick = () => {
    if (popupType === "basic") {
      setShowBasicPopup(true);
    } else {
      setShowDetailPopup(true);
    }
  };

  return (
    <>
      {viewType === "list" && (
        <ListBoxItem
          TitleFlex={TitleFlex}
          $isChecked={isChecked}
          NoLine={NoLine}
        >
          <MainContent>
            {!hideCheckCircle && (
              <CheckCircle $isChecked={isChecked} onClick={handleCheck} />
            )}
            <ListText>
              <ListTitle>
                <Body1 color="gray800">{title}</Body1>
              </ListTitle>
              <ListSubtitle>
                {keywords?.map((keyword, index) =>
                  keyword === "Strong Potential" ? (
                    <StrongPotentialBadge key={index}>
                      {keyword}
                    </StrongPotentialBadge>
                  ) : (
                    <Badge key={index} Keyword>
                      #{keyword}
                    </Badge>
                  )
                )}
              </ListSubtitle>
            </ListText>
            <ListButton>
              <CustomButton
                Medium
                PrimaryLightest
                Fill
                onClick={handleDetailClick}
                disabled={buttonText === "대기중" || buttonText === "호출중"}
                $loading={buttonText === "대기중" || buttonText === "호출중"}
              >
                {buttonText}
              </CustomButton>
            </ListButton>
          </MainContent>
          {additionalContent && (
            <ListBoxContent>{additionalContent}</ListBoxContent>
          )}
        </ListBoxItem>
      )}

      {/* 기본 정보 팝업 */}
      {showBasicPopup && (
        <InterviewPopup>
          <div style={{ maxWidth: "565px" }}>
            <div className="header" style={{ gap: "16px" }}>
              <H4 align="left">
                {/* {isBasic ? personaData?.persona_view : personaData?.persona} */}
                {isBasic ? personaData?.title : personaData?.title}
                <span
                  className="close"
                  onClick={() => setShowBasicPopup(false)}
                />
              </H4>
              <div className="keywords">
                {isBasic ? (
                  <>
                    <Status>
                      #{personaData?.content?.keywords?.[0] || ""}
                    </Status>
                    <Status>
                      #{personaData?.content?.keywords?.[1] || ""}
                    </Status>
                    <Status>
                      #{personaData?.content?.keywords?.[2] || ""}
                    </Status>
                  </>
                ) : (
                  <>
                    <Status>
                      #{personaData?.content?.keywords?.[0] || ""}
                    </Status>
                    <Status>
                      #{personaData?.content?.keywords?.[1] || ""}
                    </Status>
                    <Status>
                      #{personaData?.content?.keywords?.[2] || ""}
                    </Status>
                  </>
                )}
              </div>
            </div>

            <div className="content type2">
              <ListRowWrap>
                <ListRowItem>
                  <Body1 color="gray700" align="left">
                    누가
                    <br />
                    (Who){" "}
                  </Body1>
                  <Body3 color="gray700" align="left">
                    {personaData?.content?.who || ""}
                  </Body3>
                </ListRowItem>
                <ListRowItem>
                  <Body1 color="gray700" align="left">
                    언제
                    <br />
                    (When)
                  </Body1>
                  <Body3 color="gray700" align="left">
                    {personaData?.content?.when || ""}
                  </Body3>
                </ListRowItem>
                <ListRowItem>
                  <Body1 color="gray700" align="left">
                    어디서
                    <br />
                    (Where)
                  </Body1>
                  <Body3 color="gray700" align="left">
                    {personaData?.content?.where || ""}
                  </Body3>
                </ListRowItem>
                <ListRowItem>
                  <Body1 color="gray700" align="left">
                    무엇을
                    <br />
                    (What)
                  </Body1>
                  <Body3 color="gray700" align="left">
                    {personaData?.content?.what || ""}
                  </Body3>
                </ListRowItem>
                <ListRowItem>
                  <Body1 color="gray700" align="left">
                    어떻게
                    <br />
                    (How)
                  </Body1>
                  <Body3 color="gray700" align="left">
                    {personaData?.content?.how || ""}
                  </Body3>
                </ListRowItem>
                <ListRowItem>
                  <Body1 color="gray700" align="left">
                    왜<br />
                    (Why)
                  </Body1>
                  <Body3 color="gray700" align="left">
                    {personaData?.content?.why || ""}
                  </Body3>
                </ListRowItem>
              </ListRowWrap>
            </div>
          </div>
        </InterviewPopup>
      )}

      {/* 상세 정보 팝업 */}
      {showDetailPopup && (
        <InterviewPopup>
          <div style={{ maxWidth: "565px" }}>
            <div className="header">
              <H4>
                {personaData?.title}
                <span
                  className="close"
                  onClick={() => setShowDetailPopup(false)}
                />
              </H4>
              <p className="info">
                <Sub3>
                  {personaScenario?.potential_customer_info?.gender ||
                    personaScenario?.scenario?.potential_customer_info
                      ?.gender ||
                    ""}{" "}
                  |{" "}
                  {personaScenario?.potential_customer_info?.age ||
                    personaScenario?.scenario?.potential_customer_info?.age
                    ? `${(personaScenario?.potential_customer_info?.age ||
                        personaScenario?.scenario?.potential_customer_info?.age).includes('세') 
                        ? (personaScenario?.potential_customer_info?.age ||
                           personaScenario?.scenario?.potential_customer_info?.age) 
                        : (personaScenario?.potential_customer_info?.age ||
                           personaScenario?.scenario?.potential_customer_info?.age) + '세'}`
                    : ""}
                </Sub3>
              </p>
            </div>

            <div className="keywords">
              {isBasic ? (
                <>
                  <Status>#{personaData?.content?.keywords?.[0] || ""}</Status>
                  <Status>#{personaData?.content?.keywords?.[1] || ""}</Status>
                  <Status>#{personaData?.content?.keywords?.[2] || ""}</Status>
                </>
              ) : (
                <>
                  <Status>#{personaData?.content?.keywords?.[0] || ""}</Status>
                  <Status>#{personaData?.content?.keywords?.[1] || ""}</Status>
                  <Status>#{personaData?.content?.keywords?.[2] || ""}</Status>
                </>
              )}
            </div>

            <div className="content">
              <TabWrapType2>
                <TabButtonType2
                  isActive={activeTab1 === "personaInfo"}
                  onClick={() => setActiveTab1("personaInfo")}
                >
                  페르소나 정보
                </TabButtonType2>
                <TabButtonType2
                  isActive={activeTab1 === "personaScenario"}
                  onClick={() => setActiveTab1("personaScenario")}
                >
                  페르소나 시나리오
                </TabButtonType2>
              </TabWrapType2>

              {activeTab1 === "personaInfo" && (
                <TabContent>
                  <ListRowWrap>
                    <ListRowItem>
                      <Body1 color="gray700" align="left">
                        누가
                        <br />
                        (Who){" "}
                      </Body1>
                      <Body3 color="gray700" align="left">
                        {personaData?.content?.who || ""}
                      </Body3>
                    </ListRowItem>
                    <ListRowItem>
                      <Body1 color="gray700" align="left">
                        언제
                        <br />
                        (When)
                      </Body1>
                      <Body3 color="gray700" align="left">
                        {personaData?.content?.when || ""}
                      </Body3>
                    </ListRowItem>
                    <ListRowItem>
                      <Body1 color="gray700" align="left">
                        어디서
                        <br />
                        (Where)
                      </Body1>
                      <Body3 color="gray700" align="left">
                        {personaData?.content?.where || ""}
                      </Body3>
                    </ListRowItem>
                    <ListRowItem>
                      <Body1 color="gray700" align="left">
                        무엇을
                        <br />
                        (What)
                      </Body1>
                      <Body3 color="gray700" align="left">
                        {personaData?.content?.what || ""}
                      </Body3>
                    </ListRowItem>
                    <ListRowItem>
                      <Body1 color="gray700" align="left">
                        어떻게
                        <br />
                        (How)
                      </Body1>
                      <Body3 color="gray700" align="left">
                        {personaData?.content?.how || ""}
                      </Body3>
                    </ListRowItem>
                    <ListRowItem>
                      <Body1 color="gray700" align="left">
                        왜<br />
                        (Why)
                      </Body1>
                      <Body3 color="gray700" align="left">
                        {personaData?.content?.why || ""}
                      </Body3>
                    </ListRowItem>
                  </ListRowWrap>
                </TabContent>
              )}
              {activeTab1 === "personaScenario" && (
                <TabContent>
                  <Body1 color="gray700">
                    {personaScenario?.usage_scenario?.key_sentence ||
                      personaScenario?.scenario?.usage_scenario?.key_sentence ||
                      ""}
                  </Body1>
                  <Body3 color="gray700">
                    {personaScenario?.usage_scenario?.description ||
                      personaScenario?.scenario?.usage_scenario?.description ||
                      ""}
                  </Body3>
                </TabContent>
              )}
            </div>
          </div>
        </InterviewPopup>
      )}
    </>
  );
};

export default MoleculeToolPersonaCard;

const CustomButton = styled(Button)`
  min-width: 92px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  ${(props) =>
    props.$loading &&
    css`
      position: relative;
      justify-content: ${props.children === "호출중"
        ? "center"
        : "center"};
      // border: 1px solid ${palette.outlineGray} !important;
      border: ${props.children === "호출중" 
        ? `1px solid ${palette.outlineGray}` 
        : `0`};
      background: ${palette.chatGray} !important;
      color: ${palette.gray700} !important;
      // opacity: 1;
      opacity: ${(props) => (props.children === "호출중" ? 1 : 0.5)};

      ${props.children === "호출중" &&
      css`
        font-size: 0;
        line-height: 0;
        min-height: 30px;
        border: 1px solid ${palette.primaryLightest} !important;
        background: ${palette.primaryLightest} !important;

        &:after {
          // width: 12px;
          // height: 12px;
          // border: 2px solid ${palette.primary};
          // border-top: 2px solid transparent;
          // border-radius: 50%;
          // margin-left: 8px;
          // animation: spin 1s linear infinite;

          content: "";
          width: 3px;
          height: 3px;
          border-radius: 50%;
          display: block;
          position: relative;
          // margin-right: 8px;
          background: ${palette.white};
          box-shadow: -10px 0 ${palette.white}, 10px 0 ${palette.white};
          box-sizing: border-box;
          animation: shadowPulse 2s linear infinite;
        }

        &:before {
          position: absolute;
          left: 0;
          top: 0;
          width: 0;
          height: 100%;
          border-radius: 4px;
          background: ${palette.primary};
          animation: prog 5s linear infinite;
          content: '';
        }

        @keyframes prog {
          to  {
            width: 100%;
          }
        }

        @keyframes shadowPulse {
          33% {
            background: ${palette.white};
            box-shadow: -10px 0 ${palette.primary}, 10px 0 ${palette.white};
          }
          66% {
            background: ${palette.primary};
            box-shadow: -10px 0 ${palette.white}, 10px 0 ${palette.white};
          }
          100% {
            background: ${palette.white};
            box-shadow: -10px 0 ${palette.white}, 10px 0 ${palette.primary};
          }
        }
      `}
    `}
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

const StrongPotentialBadge = styled(Badge)`
  color: #ed7eed;
  background-color: rgba(237, 126, 237, 0.06);
`;
