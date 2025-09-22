//인터뷰룸
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { palette } from "../../../../../assets/styles/Palette";
import { Button } from "../../../../../assets/styles/ButtonStyle";
import images from "../../../../../assets/styles/Images";
import PopupWrap from "../../../../../assets/styles/Popup";
import { useAtom } from "jotai";
import {
  PERSONA_BUTTON_STATE_3,
  PROJECT_TOTAL_INFO,
  QUICK_SURVEY_INTERVIEW,
  QUICK_SURVEY_SURVEY_METHOD,
  QUICK_SURVEY_SELECTED_QUESTION,
} from "../../../../AtomStates";
import personaImages from "../../../../../assets/styles/PersonaImages";

const OrganismToastPopupQuickSurveyComplete = ({
  isActive,
  onClose,
  isComplete,
  selectedOption,
  selectedOptionIndex,
}) => {
  const [personaButtonState3, setPersonaButtonState3] = useAtom(
    PERSONA_BUTTON_STATE_3
  );
  const [quickSurveyInterview] = useAtom(QUICK_SURVEY_INTERVIEW);
  const [quickSurveySurveyMethod] = useAtom(QUICK_SURVEY_SURVEY_METHOD);
  const [projectTotalInfo] = useAtom(PROJECT_TOTAL_INFO);

  const [active, setActive] = useState(isActive);
  const [showWarning, setShowWarning] = useState(false);
  const [isLoadingPrepare, setIsLoadingPrepare] = useState(true);
  const [quickSurveySelectedQuestion] = useAtom(QUICK_SURVEY_SELECTED_QUESTION);
  const [, setInterviewStatus] = useState([]);
  const [answers, setAnswers] = useState({});
  const [visibleAnswers, setVisibleAnswers] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [filteredAnswers, setFilteredAnswers] = useState([]);

  //저장되었던 인터뷰 로드
  useEffect(() => {
    const interviewLoading = async () => {
      // 인터뷰 스크립트 보기, 인터뷰 상세보기로 진입 시 isComplete는 True
      if (isComplete) {
        // 단일 질문에 대한 Complete 상태 설정
        const completedStatus = ["Complete"];
        setInterviewStatus(completedStatus);

        // quickSurveyInterview를 기반으로 답변 구성
        const processedAnswers = quickSurveyInterview.map((interviewItem) => {
          return {
            persona: interviewItem,
            imageKey: interviewItem.imageKey,
            gender: interviewItem.gender,
            age: interviewItem.age,
            job: interviewItem.job,
            answer: {
              main: interviewItem.question_answer,
              followUp: interviewItem.follow_up_answer,
            },
          };
        });

        setAnswers(processedAnswers);

        // 모든 답변을 보이도록 설정

        setVisibleAnswers(true);
        setIsLoadingPrepare(false);

        return; // isComplete가 True일 때 API 호출 없이 종료
      }
    };
    interviewLoading();
  }, [personaButtonState3, isComplete]);

  useEffect(() => {
    // answers가 없으면 빈 배열 사용
    const questionAnswers = answers || [];
    try {
      const filtered =
        selectedOption && questionAnswers.length > 0
          ? questionAnswers.filter(
              (answer) => answer?.answer?.main === selectedOption
            )
          : questionAnswers;

      // filtered가 배열인지 확인
      setFilteredAnswers(Array.isArray(filtered) ? filtered : []);
    } catch (error) {
      // 에러 발생시 빈 배열로 설정
      setFilteredAnswers([]);
    }
  }, [selectedOption, answers]);

  const renderAnswersComplete = () => {
    // filteredAnswers가 배열인지 확인
    if (!Array.isArray(filteredAnswers)) {
      return null;
    }

    return (
      <>
        {filteredAnswers.map((answer, index) => (
          <AnswerItem key={index}>
            <TypeName>
              <Thumb>
                <img
                  src={personaImages[answer?.imageKey]}
                  alt={answer?.persona?.persona_name}
                />
              </Thumb>
              <div>
                {answer?.persona?.persona_name}
                <p>
                  <span>{answer?.gender}</span>
                  <span>
                    {answer?.age?.includes("세")
                      ? answer?.age
                      : `${answer?.age}세`}
                  </span>
                  <span>{answer?.job}</span>
                </p>
              </div>
            </TypeName>
            <TextContainer>
              <div>
                {answer?.answer?.main &&
                  quickSurveySurveyMethod?.options &&
                  (() => {
                    const index = quickSurveySurveyMethod.options.indexOf(
                      answer.answer.main
                    );

                    if (
                      quickSurveySelectedQuestion[0] === "ab_test" &&
                      selectedOptionIndex == null
                    ) {
                      return `${String.fromCharCode(
                        65 +
                          (answer.answer.main ===
                          quickSurveySurveyMethod.options[0]
                            ? 0
                            : 1)
                      )}. ${answer.answer.main}`;
                    }

                    if (
                      (quickSurveySelectedQuestion[0] === "importance" ||
                        quickSurveySelectedQuestion[0] === "single_choice" ||
                        quickSurveySelectedQuestion[0] === "custom_question") &&
                      selectedOptionIndex == null
                    ) {
                      return `${index + 1}. ${answer.answer.main}`;
                    }

                    if (quickSurveySelectedQuestion[0] === "nps") {
                      return answer.answer.main;
                    }

                    return `${
                      selectedOptionIndex ? `${selectedOptionIndex}. ` : ""
                    }${answer.answer.main}`;
                  })()}
              </div>
              <div style={{ marginTop: "16px" }}>
                {answer?.answer?.followUp}
              </div>
            </TextContainer>
          </AnswerItem>
        ))}
      </>
    );
  };

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  const handleClose = () => {
    if (isComplete) {
      setActive(false);
      if (onClose) {
        onClose();
      }
      return;
    }
    setShowWarning(true);
  };

  const handleWarningClose = () => {
    setIsLoadingPrepare(true);
    setShowWarning(false);
    setActive(false);
    if (onClose) {
      onClose();
    }
    setPersonaButtonState3(0);
    // onClose();
    window.location.href = "/Project";
  };

  const handleWarningContinue = () => {
    setShowWarning(false);
  };

  // 이미 완료된 인터뷰를 확인할 때 사용 ex)인터뷰 스크립트 보기, 인터뷰 상세보기
  const renderInterviewItemsComplete = () => {
    return (
      <InterviewItem status={"Complete"}>
        <QuestionWrap status={"Complete"} isOpen={visibleAnswers}>
          <QuestionText>Q. {quickSurveySurveyMethod?.question}</QuestionText>
        </QuestionWrap>
        {visibleAnswers && <AnswerWrap>{renderAnswersComplete()}</AnswerWrap>}
      </InterviewItem>
    );
  };

  return (
    <>
      <PopupBox isActive={active}>
        <ToastPopup isActive={active}>
          <Header>
            <Title>
              {projectTotalInfo.projectTitle}에 대한 퀵서베이 결과
              <ColseButton onClick={handleClose} />
            </Title>
            <ul>
              <li>
                <span>
                  <img src={images.PeopleFill} alt="참여 페르소나" />
                  참여 페르소나
                </span>
                <span>{filteredAnswers.length}명</span>
              </li>
            </ul>
          </Header>

          <Contents>
            {!isLoadingPrepare && isComplete && renderInterviewItemsComplete()}
          </Contents>
        </ToastPopup>
      </PopupBox>

      {showWarning && (
        <PopupWrap
          Warning
          title="인터뷰를 종료하시겠습니까?"
          message="모든 내역이 사라집니다. 그래도 중단 하시겠습니까?"
          buttonType="Outline"
          closeText="중단하기"
          confirmText="계속진행하기"
          isModal={false}
          onCancel={handleWarningClose}
          onConfirm={handleWarningContinue}
        />
      )}
      {showErrorPopup && (
        <PopupWrap
          Warning
          title="작업이 중단되었습니다"
          message="데이터 오류로 인해 페이지가 초기화됩니다."
          message2="작업 중인 내용은 작업관리 페이지를 확인하세요."
          buttonType="Outline"
          closeText="확인"
          onConfirm={() => {
            setShowErrorPopup(false);
            window.location.href = "/Project";
          }}
          onCancel={() => {
            setShowErrorPopup(false);
            window.location.href = "/Project";
          }}
        />
      )}
    </>
  );
};

export default OrganismToastPopupQuickSurveyComplete;

const PopupBox = styled.div`
  position: fixed;
  top: 0;
  right: 100%;
  transform: ${({ isActive }) =>
    isActive ? "translateX(100%)" : "translateX(0)"};
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
  z-index: 101;
  visibility: ${({ isActive }) => (isActive ? "visible" : "hidden")};
`;

const ToastPopup = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  transform: ${({ isActive }) =>
    isActive ? "translateX(0)" : "translateX(100%)"};
  width: 100%;
  max-width: 800px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  padding: 32px;
  border-radius: 15px 0 0 15px;
  background: ${palette.white};
  transition: transform 0.3s ease;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  border-bottom: 1px solid ${palette.lineGray};

  ul {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 0.88rem;
    color: ${palette.gray500};
    font-weight: 300;
    line-height: 1.5;
    margin-bottom: 40px;
  }

  li {
    display: flex;
    align-items: center;
    gap: 16px;

    + li {
      margin-left: 20px;
      padding-left: 20px;
      border-left: 1px solid ${palette.lineGray};
    }

    span {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 1.38rem;
  font-weight: 600;
  color: ${palette.gray800};
  line-height: 1.3;
  word-wrap: break-word;
`;

export const ColseButton = styled.button`
  position: relative;
  width: 15px;
  height: 15px;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;

  &:before,
  &:after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 100%;
    border-radius: 10px;
    background-color: ${palette.black};
    content: "";
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding-right: 10px;
  overflow-y: auto;
`;

const InterviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
  padding: 10px;
  // padding: 20px;
  // padding-top:10px;
  border-radius: 10px;
`;

const QuestionWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;
  position: relative;
`;

const QuestionText = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;
`;

const AnswerWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 24px;
  width: 100%;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;
  padding-top: 32px;
`;

const AnswerItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  width: 100%;
`;

const TypeName = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${palette.gray800};

  p {
    display: flex;
    align-items: center;
    gap: 6px;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-size: 0.75rem;
      font-weight: 300;
      line-height: 1.3;
      color: ${palette.gray500};

      + span:before {
        display: inline-block;
        width: 1px;
        height: 9px;
        background: ${palette.gray500};
        content: "";
      }
    }
  }
`;

const Thumb = styled.div`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background: ${palette.gray200};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TextContainer = styled.div`
  align-self: flex-start;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${palette.gray800};
  margin-left: 44px;
  padding: 12px;
  border-radius: 0 15px 15px 15px;
  background: rgba(34, 111, 255, 0.06);
`;
