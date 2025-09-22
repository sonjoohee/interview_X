import React, { useState } from "react";
import styled, { css } from "styled-components";
import images from "../../../../assets/styles/Images"; // Search.svg 이미지 import
import { palette } from "../../../../assets/styles/Palette";
import { InputField } from "../../../../assets/styles/Input";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CUSTOMER_ADDITION_BUTTON_STATE,
  CUSTOMER_ADDITION_QUESTION_INPUT,
  CONVERSATION_STAGE,
  CONVERSATION,
  INPUT_BUSINESS_INFO,
  SELECTED_EXPERT_INDEX,
  IS_LOGGED_IN,
  CONVERSATION_ID,
  CASE_REPORT_BUTTON_STATE,
  CASE_QUESTION_INPUT,
  CASE_HASH_TAG,
  SURVEY_USER_GOAL_INPUT,
  SURVEY_GOAL_SUGGESTION_BUTTON_STATE,
  IS_LOADING_CASE_HASHTAG,
} from "../../../AtomStates";

const OrganismSearchBottomBar = ({ isBlue, isHashTag }) => {
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [inputBusinessInfo, setInputBusinessInfo] =
    useAtom(INPUT_BUSINESS_INFO);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(
    SELECTED_EXPERT_INDEX
  );
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [customerAdditionButtonState, setCustomerAdditionButtonState] = useAtom(
    CUSTOMER_ADDITION_BUTTON_STATE
  );
  const [customerAdditionQuestionInput, setCustomerAdditionQuestionInput] =
    useAtom(CUSTOMER_ADDITION_QUESTION_INPUT);

  const [caseReportButtonState, setCaseReportButtonState] = useAtom(
    CASE_REPORT_BUTTON_STATE
  );
  const [caseQuestionInput, setCaseQuestionInput] =
    useAtom(CASE_QUESTION_INPUT);
  const [caseHashTag, setCaseHashTag] = useAtom(CASE_HASH_TAG);

  const [inputValue, setInputValue] = useState("");
  const [isPopupRegex, setIsPopupRegex] = useState(false);
  const [isPopupRegex2, setIsPopupRegex2] = useState(false);
  const [surveyUserGoalInput, setSurveyUserGoalInput] = useAtom(
    SURVEY_USER_GOAL_INPUT
  );
  const [surveyGoalSuggestionButtonState, setSurveyGoalSuggestionButtonState] =
    useAtom(SURVEY_GOAL_SUGGESTION_BUTTON_STATE);
  const [isLoadingCaseHashTag, setIsLoadingCaseHashTag] = useAtom(
    IS_LOADING_CASE_HASHTAG
  );

  const closePopupRegex = () => {
    setIsPopupRegex(false);
  };
  const closePopupRegex2 = () => {
    setIsPopupRegex2(false);
  };

  const handleInputChange = (e) => {
    if (e.target.value.length <= 30) {
      setInputValue(e.target.value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출 방지
      handleSearch(inputValue);
    }
  };

  const getInitialSystemMessage = (index) => {
    switch (index) {
      case "1":
        return "아이디어를 입력해주셔서 감사합니다 😄\n관련된 시장과 고객을 분석하는데 많은 도움이 될 것 같아요.";
      case "6":
        return "아이디어를 입력해주셔서 감사합니다 😄\n빠른 성장 전략을 도출하기 위해서, 아이템에 대한 정확한 분석이 필수적입니다.";
      case "9":
        return "아이디어를 입력해주셔서 감사합니다 😄\n비즈니스 모델을 효과적으로 설계하려면, 비즈니스에 대한 정확한 이해가 중요합니다. 제가 분석한 비즈니스 내용을 확인해 보시고, 아이디어가 어떻게 발전 할 수 있을지 함께 살펴보아요.";
      default:
        return `아이디어를 입력해 주셔서 감사합니다!\n지금부터 아이디어를 세분화하여 주요한 특징과 목표 고객을 파악해보겠습니다 🙌🏻`;
    }
  };

  const handleSearch = async (inputValue) => {
    if (isLoggedIn) {
      if (!conversationId) {
        try {
          return;
        } catch (error) {
         // console.error("Failed to create conversation on server:", error);
          return;
        }
      }
    }
    if (isLoading) return;

    const regex = /^[가-힣a-zA-Z0-9\s.,'"?!()\/\-·:\\%~@#$^&*_+<>`]*$/;
    const specialChars = /^[.,'"?!()\/\-·:\\%~@#$^&*_+<>`]+$/;
    // const consecutiveSpecialChars = /[.,'"?!()\/\-·:\\%]{2,}/; // 특수문자가 2번 이상 연속되는 패턴

    // 단독으로 특수 문자만 사용된 경우
    if (specialChars.test(inputValue.trim())) {
      setIsPopupRegex(true);
      return;
    }

    // 연속된 특수문자 체크
    // if (consecutiveSpecialChars.test(inputValue.trim())) {
    //   setIsPopupRegex(true);
    //   return;
    // }

    // 입력 값에 대한 정규식 및 빈 값 체크
    if (!regex.test(inputValue)) {
      setIsPopupRegex(true);
      return;
    }
    if (inputValue.trim() === "") {
      setIsPopupRegex2(true);
      return;
    }

    setInputValue("");

    const updatedConversation = [...conversation];

    if (conversationStage === 1) {
      setInputBusinessInfo(inputValue);

      const initialMessage = getInitialSystemMessage(selectedExpertIndex);

      updatedConversation.push(
        { type: "user", message: inputValue },
        {
          type: "system",
          message: initialMessage,
          expertIndex: selectedExpertIndex,
        },
        { type: "analysis" }
      );

      setConversationStage(2);
    } else if (isHashTag && selectedExpertIndex === "8") {
      updatedConversation.push(
        { type: "user", message: `${inputValue}을 찾아주세요` },
        {
          type: "system",
          message: `"${inputValue}"에 대한 사례를 조사합니다.`,
          expertIndex: selectedExpertIndex,
        },
        { type: "caseReport" }
      );
      setCaseReportButtonState(1);
      setCaseQuestionInput(inputValue);
    }
    // else if (isHashTag && selectedExpertIndex === "9") {
    //   updatedConversation.push(
    //     { type: "user", message: `비즈니스 목표는 ${inputValue}입니다.` },
    //     { type: "bmModelSuggestion" }
    //   );
    //   setBmLeanAdsButtonState(1);
    //   setBmBmAdsButtonState(1);
    //   setBmUserGoalInput(inputValue);
    // }
    else if (isHashTag && selectedExpertIndex === "10") {
      updatedConversation.push(
        { type: "user", message: `${inputValue}` },
        {
          type: "system",
          message: `제가 세분화하기 위한 여러가지 문제점을 도출해보았어요`,
          expertIndex: selectedExpertIndex,
        },
        { type: "surveyGoalSuggestion" }
      );
      setSurveyGoalSuggestionButtonState(1);
      setSurveyUserGoalInput(inputValue);
    } else {
      if (
        (updatedConversation.length > 0 &&
          updatedConversation[updatedConversation.length - 1].type ===
            "keyword") ||
        (updatedConversation.length > 0 &&
          updatedConversation[updatedConversation.length - 1].type ===
            "reportButton") ||
        (updatedConversation.length > 0 &&
          updatedConversation[updatedConversation.length - 1].type ===
            "pocTargetButton") ||
        (updatedConversation.length > 0 &&
          updatedConversation[updatedConversation.length - 1].type ===
            "caseContinueButton")
      ) {
        updatedConversation.pop();
      }
      //  else if (updatedConversation.length > 0 &&
      //   updatedConversation[updatedConversation.length - 1].type === 'getUserSurveyGoal') {
      //   updatedConversation.pop(); // 마지막 메시지를 제거하고 새로운 흐름을 추가
      //   setSurveyUserGoalInput(inputValue); // 사용자가 입력한 값을 user_goal_input에 저장

      //   updatedConversation.push(
      //     {
      //       type: "user",
      //       message: inputValue,
      //     },
      //     {
      //       type: "surveyGoalSuggestion",
      //     }
      //   );

      //   setSurveyGoalSuggestionButtonState(1);
      //   setConversationStage(3);
      //   setApproachPath(3);
      // }

      updatedConversation.push(
        {
          type: "user",
          message: inputValue,
        },
        {
          type: `customerAddition`,
        }
      );

      setCustomerAdditionButtonState(1);
      setCustomerAdditionQuestionInput(inputValue);
    }
    setConversation(updatedConversation);
  };

  const handleHashTagClick = async (inputValue) => {
    if (isLoggedIn) {
      if (!conversationId) {
        try {
          return;
        } catch (error) {
        //  console.error("Failed to create conversation on server:", error);
          return;
        }
      }
    }

    if (isLoading) return;

    const updatedConversation = [...conversation];

    if (isHashTag && selectedExpertIndex === "8") {
      updatedConversation.push(
        { type: "user", message: `${inputValue}을 찾아주세요` },
        {
          type: "system",
          message: `"${inputValue}"에 대한 사례를 조사합니다.`,
          expertIndex: selectedExpertIndex,
        },
        { type: "caseReport" }
      );
      setCaseReportButtonState(1);
      setCaseQuestionInput(inputValue);
    }
    // else if (isHashTag && selectedExpertIndex === "9") {
    //   updatedConversation.push(
    //     { type: "user", message: `비즈니스 목표는 ${inputValue}입니다.` },
    //     { type: "bmModelSuggestion" }
    //   );
    //   setBmLeanAdsButtonState(1);
    //   setBmBmAdsButtonState(1);
    //   setBmUserGoalInput(inputValue);
    // }
    // else if (isHashTag && selectedExpertIndex === "10") {
    //   updatedConversation.push(
    //     { type: "user", message: `설문조사의 목적은 ${inputValue}입니다.` },
    //     { type: "surveyGoalSuggestion" }
    //   );
    //   setSurveyGoalSuggestionButtonState(1);
    //   setSurveyUserGoalInput(inputValue);
    // }

    setConversation(updatedConversation);
  };

  return (
    <>
      <BottomBar>
        {isBlue && isHashTag && !isLoadingCaseHashTag && (
          <TagList>
            {selectedExpertIndex === "8" &&
              caseHashTag.slice(0, 3).map((tag, index) => (
                <button
                  key={index}
                  onClick={() => handleHashTagClick(tag.title)}
                >
                  # {tag.title}
                </button> // 최대 3개까지 표시
              ))}
            {/* {selectedExpertIndex === "9" && caseHashTag.slice(0, 3).map((tag, index) => (
          <button key={index} onClick={() => handleHashTagClick(tag.title)}># {tag.title}</button>
        ))} */}
          </TagList>
        )}

        <SearchBar isBlue={isBlue}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 24.9987C0 25.1828 0.149218 25.332 0.333286 25.332C0.3388 25.332 0.344283 25.3319 0.349731 25.3316H24.3298C24.5139 25.3316 24.6631 25.1824 24.6631 24.9983C24.6631 24.8143 24.5139 24.6651 24.3298 24.6651H0.666571L0.66657 1.00223C0.66657 0.818163 0.517353 0.668945 0.333285 0.668945C0.149217 0.668945 0 0.818163 0 1.00223V24.9983V24.9987ZM3.93314 17.1281C3.93314 16.5758 4.38086 16.1281 4.93314 16.1281H5.74395C6.29624 16.1281 6.74395 16.5758 6.74395 17.1281V21.3984H3.93314V17.1281ZM9.50121 3.1281C8.94893 3.1281 8.50121 3.57582 8.50121 4.1281V21.3984H11.312V4.1281C11.312 3.57582 10.8643 3.1281 10.312 3.1281H9.50121ZM13.0685 13.2635C13.0685 12.7112 13.5163 12.2635 14.0685 12.2635H14.8794C15.4316 12.2635 15.8793 12.7112 15.8793 13.2635V21.3986H13.0685V13.2635ZM18.6359 6.29073C18.0836 6.29073 17.6359 6.73845 17.6359 7.29073V21.3988H20.4467V7.29073C20.4467 6.73844 19.999 6.29073 19.4467 6.29073H18.6359Z"
              fill="black"
            />
          </svg>

          <InputField
            None
            isBlue
            placeholder={
              isBlue && isHashTag
                ? selectedExpertIndex === "8"
                  ? "어떤 사례를 찾고 계신가요? 구체적으로 입력해주세요"
                  : selectedExpertIndex === "9"
                  ? "비즈니스의 목표가 무엇인가요? 구체적으로 입력해주세요"
                  : selectedExpertIndex === "10"
                  ? "설문조사의 목적이 무엇인가요? 구체적으로 입력해주세요"
                  : ""
                : isBlue
                ? "더 알고 싶은 내용이 있으신가요? 추가 질문으로 더 많은 인사이트를 얻어보세요"
                : "당신의 아이템 또는 프로젝트 아이디어를 적어 주세요 (예: 원격 근무자를 위한 생산성 관리 툴)"
            }
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress} // 여기에 키 입력 이벤트 핸들러 추가
          />

          <button type="button" onClick={() => handleSearch(inputValue)}>
            검색
          </button>
        </SearchBar>

        <p>
          아이템이나 프로젝트와 관련 없는 질문은 정확한 답변이 어려울 수
          있습니다.
        </p>
      </BottomBar>

      {isPopupRegex && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePopupRegex(); // 상태를 false로 설정
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closePopupRegex}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>
              한글, 영문 외 특수문자는 입력할 수 없어요. 자음이나 모음만 입력한
              경우 검색이 제한되니, 문장을 완전하게 입력해주세요.
            </p>
            <div className="btnWrap">
              <button type="button" onClick={closePopupRegex}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}

      {isPopupRegex2 && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePopupRegex2(); // 상태를 false로 설정
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closePopupRegex2}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            {isBlue ? (
              <p>내용을 입력해주세요</p>
            ) : (
              <p>비즈니스 분석을 위해 내용을 입력해주세요</p>
            )}
            <div className="btnWrap">
              <button type="button" onClick={closePopupRegex2}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

export default OrganismSearchBottomBar;

// 스타일 정의는 그대로 사용

const BottomBar = styled.div`
  position: fixed;
  bottom: 40px;
  left: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1030px;
  color: white;
  display: flex;
  flex-direction: column;
  flex-basis: 100% !important;
  align-items: center;
  // margin:0 20px;
  // margin-top: 40px;
  z-index: 99;
  flex: auto !important;

  > p {
    font-size: 0.75rem;
    color: ${palette.gray};
    padding-top: 10px;
  }

  &:before {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    background: ${palette.white};
    // background: linear-gradient(
    //   0deg,
    //   rgba(255, 255, 255, 0) 0%,
    //   rgba(255, 255, 255, 1) 30%
    // );
    content: "";
    z-index: -1;
  }
`;

const TagList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  > button {
    font-family: "Pretendard", "Poppins";
    font-size: 1rem;
    color: ${palette.gray700};
    padding: 12px 16px;
    border-radius: 50px;
    border: 0;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.08);
    background: ${palette.white};
    font-size: 0.875rem;
  }
`;

const SearchBar = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 14px 32px;
  border-radius: 50px;
  border: ${(props) => {
    if (props.isBlue) return `1px solid ${palette.lineGray}`;
    else return `2px solid ${palette.black}`;
  }};
  box-shadow: ${(props) => {
    if (props.isBlue) return `none`;
    else return `0 4px 15px rgba(0, 0, 0, 0.15)`;
  }};
  background: ${(props) => {
    if (props.isBlue) return `#F5F9FF`;
    else return `#F6F6F6`;
  }};

  svg {
    display: ${(props) => {
      if (props.isBlue) return `none`;
      else return `inline-block`;
    }};
  }

  svg path {
    fill: ${(props) => {
      if (props.isBlue) return `${palette.blue}`;
      else return `${palette.black}`;
    }};
  }

  input {
    font-family: "Pretendard", "Poppins";
    color: ${palette.black};

    &:placeholder {
      font-size: 1rem;

      color: ${(props) => {
        if (props.isBlue) return `${palette.gray}`;
        else return `${palette.lightGray}`;
      }};
    }
  }

  > button {
    width: 34px;
    height: 31px;
    font-size: 0;
    margin-left: auto;
    border: 0;
    background: ${(props) => {
      if (props.isBlue)
        return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.88734 14.7221C0.259917 14.1099 0.567134 11.6721 2.35637 11.0006L28.5477 1.17031C30.0984 0.588283 31.4234 1.9042 30.8519 3.45886L21.2006 29.7167C20.5413 31.5104 18.1056 31.8343 17.4823 30.2111L13.1637 18.9639L1.88734 14.7221ZM15.5225 18.1533L19.3606 28.149L28.3608 3.66279L3.93658 12.8298L13.9582 16.5996L21.6131 8.89233C22.0023 8.50047 22.6354 8.49831 23.0273 8.8875L23.1726 9.03181C23.5644 9.421 23.5666 10.0542 23.1774 10.446L15.5225 18.1533Z' fill='%23226FFF'/%3E%3C/svg%3E")`;

      else
        return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' '0 0 32 32' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.88734 14.7221C0.259917 14.1099 0.567134 11.6721 2.35637 11.0006L28.5477 1.17031C30.0984 0.588283 31.4234 1.9042 30.8519 3.45886L21.2006 29.7167C20.5413 31.5104 18.1056 31.8343 17.4823 30.2111L13.1637 18.9639L1.88734 14.7221ZM15.5225 18.1533L19.3606 28.149L28.3608 3.66279L3.93658 12.8298L13.9582 16.5996L21.6131 8.89233C22.0023 8.50047 22.6354 8.49831 23.0273 8.8875L23.1726 9.03181C23.5644 9.421 23.5666 10.0542 23.1774 10.446L15.5225 18.1533Z' fill='black'/%3E%3C/svg%3E")`;
    }};
    background-size: auto;
    transition: all 0.5s;

    &:hover {
      background: ${(props) => {
        if (props.isBlue)
          return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Cpath d='M28.5746 1.14516C30.1253 0.563137 31.4504 1.87962 30.8789 3.43428L21.2273 29.6918C20.5679 31.4855 18.1327 31.8094 17.5095 30.1863L13.8151 20.563L20.7522 11.2781L11.718 18.3843L1.91447 14.6976C0.28705 14.0854 0.594801 11.6471 2.38403 10.9756L28.5746 1.14516Z' fill='%23226FFF'/%3E%3C/svg%3E")`;
        else
          return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Cpath d='M28.5746 1.14516C30.1253 0.563137 31.4504 1.87962 30.8789 3.43428L21.2273 29.6918C20.5679 31.4855 18.1327 31.8094 17.5095 30.1863L13.8151 20.563L20.7522 11.2781L11.718 18.3843L1.91447 14.6976C0.28705 14.0854 0.594801 11.6471 2.38403 10.9756L28.5746 1.14516Z' fill='black'/%3E%3C/svg%3E")`;
      }};
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
    right: 24px;
    top: 24px;
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
        border-radius: 8px;
        border: 1px solid ${palette.blue};
        background: ${palette.white};

        &:last-child {
          color: ${palette.white};
          background: ${palette.blue};
        }
      }
    }

    ${(props) =>
      props.Cancel &&
      css`
        p {
          strong {
            font-weight: 500;
            display: block;
          }
          span {
            font-size: 0.75rem;
            font-weight: 400;
            color: ${palette.gray500};
            display: block;
            margin-top: 8px;
          }
        }

        .btnWrap {
          padding-top: 16px;
          border-top: 1px solid ${palette.lineGray};

          button {
            font-family: "Pretendard", "Poppins";
            color: ${palette.gray};
            font-weight: 600;
            padding: 0;
            border: 0;
            background: none;

            &:last-child {
              color: ${palette.blue};
              background: none;
            }
          }
        }
      `}
  }
`;
