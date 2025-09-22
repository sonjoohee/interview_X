import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import images from "../../../../assets/styles/Images";
import personaImages from "../../../../assets/styles/PersonaImages";
import PopupWrap from "../../../../assets/styles/Popup";
import { CustomInput } from "../../../../assets/styles/InputStyle";
import {
  Body1,
  H4,
  Sub1,
  Sub2,
  Body2,
  Body3,
  ModerText,
} from "../../../../assets/styles/Typography";
import { Persona } from "../../../../assets/styles/BusinessAnalysisStyle";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  IS_LOGGED_IN,
  PERSONA_LIST,
  PERSONA_BUTTON_STATE_3,
  BUSINESS_ANALYSIS,
  PROJECT_ID,
  PROJECT_REPORT_ID,
  INTERVIEW_DATA,
  IS_PERSONA_ACCESSIBLE,
  SELECTED_PERSONA_LIST,
  SELECTED_INTERVIEW_PURPOSE_DATA,
  PURPOSE_ITEMS_SINGLE,
  // SINGLE_INTERVIEW_REPORT_TAB1,
  SINGLE_INTERVIEW_REPORT_TAB2,
  // SINGLE_INTERVIEW_REPORT_TAB3,
  TRIAL_STATE,
  CREDIT_ADDITIONAL_QUESTION,
  EVENT_STATE,
  EVENT_TITLE,
  PROJECT_TOTAL_INFO,
  PROJECT_CREATE_INFO,
  PROJECT_SAAS,
  USER_CREDITS,
  CREDIT_CREATE_INTERVIEW,
} from "../../../AtomStates";
import {
  updateProjectOnServer,
  UserCreditCheck,
  UserCreditUse,
  createProjectReportOnServer,
  UserCreditInfo,
} from "../../../../utils/indexedDB";
import { InterviewXPersonaSingleInterviewRequest } from "../../../../utils/indexedDB";
import { InterviewXPersonaSingleInterviewReportTab2 } from "../../../../utils/indexedDB";

const OrganismToastPopupSingleLiveChat = ({
  isActive,
  onClose,
  isComplete,
  isIndepth,
}) => {
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const project = projectSaas;
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [creditCreateInterview] = useAtom(CREDIT_CREATE_INTERVIEW);
  const [, setSelectedPersonaList] = useAtom(SELECTED_PERSONA_LIST);
  const [purposeItemsSingleAtom] = useAtom(PURPOSE_ITEMS_SINGLE);
  const [, setReportId] = useAtom(PROJECT_REPORT_ID);
  const [, setIsPersonaAccessible] = useAtom(IS_PERSONA_ACCESSIBLE);
  const [, setInterviewData] = useAtom(INTERVIEW_DATA);
  const [singleInterviewReportTab2, setSingleInterviewReportTab2] = useAtom(
    SINGLE_INTERVIEW_REPORT_TAB2
  );
  const [projectId] = useAtom(PROJECT_ID);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [personaButtonState3, setPersonaButtonState3] = useAtom(
    PERSONA_BUTTON_STATE_3
  );
  const [personaList] = useAtom(PERSONA_LIST);
  const [trialState] = useAtom(TRIAL_STATE);
  const [creditAdditionalQuestion] = useAtom(CREDIT_ADDITIONAL_QUESTION);
  const [eventState] = useAtom(EVENT_STATE);
  const [eventTitle] = useAtom(EVENT_TITLE);
  const [businessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [selectedInterviewPurposeData] = useAtom(
    SELECTED_INTERVIEW_PURPOSE_DATA
  );
  const [projectTotalInfo] = useAtom(PROJECT_TOTAL_INFO);
  const [projectCreateInfo] = useAtom(PROJECT_CREATE_INFO);

  const navigate = useNavigate();

  const [active, setActive] = useState(isActive);
  const [showWarning, setShowWarning] = useState(false);
  const [isLoadingPrepare, setIsLoadingPrepare] = useState(true);
  const [interviewQuestionListState, setInterviewQuestionListState] = useState(
    []
  );
  const [interviewDataState, setInterviewDataState] = useState([]);
  const [interviewStatus, setInterviewStatus] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [, setVisibleAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [regenerateCount2, setRegenerateCount2] = useState(0);
  const [, setShowRegenerateButton1] = useState(false);
  const [showRegenerateButton2, setShowRegenerateButton2] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showAddQuestion] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [countAdditionalQuestion] = useState(1);

  const [, setCurrentAnswerData] = useState("");
  // 추가 질문 관련 상태 추가
  const [isGeneratingIndepth, setIsGeneratingIndepth] = useState(false);
  const [isGeneratingIndepthQuestion, setIsGeneratingIndepthQuestion] =
    useState(false);
  const [indepthInterviews, setIndepthInterviews] = useState({});

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  //저장되었던 인터뷰 로드
  useEffect(() => {
    const interviewLoading = async () => {
      loadInterviewQuestion(); // 질문 생성
    };
    interviewLoading();
  }, [personaButtonState3, isComplete]);

  const loadInterviewQuestion = async () => {
    setShowRegenerateButton1(false);
    try {
      if (personaButtonState3 === 1) {
        // 빈 질문 리스트로 초기화
        setIsLoadingPrepare(false); // 여기서 로딩 상태를 해제하지만
        setInterviewQuestionListState([]);
        setInterviewStatus([]);
      }
    } catch (error) {}
  };

  const loadInterviewReport = async (lastAnswer) => {
    setShowRegenerateButton2(false);
    try {
      setIsAnalyzing(true);
      // 새로운 배열로 복사
      let reportInterviewData = [...interviewDataState];

      if (lastAnswer) {
        const lastQuestionIndex = interviewQuestionListState.length - 1;

        const newData = {
          question: interviewQuestionListState[lastQuestionIndex],
          answer: lastAnswer, // answers -> answer로 변경
        };

        const isDuplicate = reportInterviewData.some(
          (item) =>
            item.question === newData.question && item.answer === newData.answer
        );

        if (!isDuplicate) {
          reportInterviewData.push(newData);
        }
      }

      // 데이터 동기화 확인 로직 개선
      let syncAttempts = 0;
      const maxSyncAttempts = 10;

      while (syncAttempts < maxSyncAttempts) {
        if (reportInterviewData.length === interviewQuestionListState.length) {
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        syncAttempts++;
      }

      if (syncAttempts >= maxSyncAttempts) {
        throw new Error("데이터 동기화 시간 초과");
      }
      // API 요청 데이터 준비
      const data = {
        business_idea: projectCreateInfo,
        persona_info: personaList.selected[0],
        interview_data: reportInterviewData,
        theory_data: selectedInterviewPurposeData,
      };

      // Tab 1 리포트 생성
      // let responseReport1;
      let retryCount = 0;
      const maxRetries = 10;

      // while (retryCount < maxRetries) {
      //   try {
      //     responseReport1 = await InterviewXPersonaSingleInterviewReportTab1(
      //       data,
      //       isLoggedIn
      //     );

      //     // 응답 데이터 유효성 검사
      //     if (
      //       responseReport1 &&
      //       responseReport1.response &&
      //       responseReport1.response.title &&
      //       responseReport1.response.research_theory &&
      //       responseReport1.response.research_purpose &&
      //       responseReport1.response.research_insight
      //     ) {
      //       break;
      //     }
      //   } catch (error) {}

      //   retryCount++;
      //   await new Promise((resolve) => setTimeout(resolve, 1000));
      // }

      // if (retryCount >= maxRetries) {
      //   throw new Error(
      //     "Failed to generate report tab 1 after maximum retries"
      //   );
      // }

      // setSingleInterviewReportTab1(responseReport1.response);

      // Tab 2 리포트 생성
      let responseReportTab2;
      retryCount = 0;

      while (retryCount < maxRetries) {
        try {
          responseReportTab2 = await InterviewXPersonaSingleInterviewReportTab2(
            data,
            isLoggedIn
          );

          if (
            responseReportTab2 &&
            responseReportTab2.response &&
            responseReportTab2.response.title &&
            responseReportTab2.response.persona_info &&
            responseReportTab2.response.persona_attitude &&
            responseReportTab2.response.big_five_personality_traits &&
            responseReportTab2.response.summary_data &&
            responseReportTab2.response.main_insights &&
            responseReportTab2.response.thematic_analysis
          ) {
            break;
          }
        } catch (error) {}

        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      if (retryCount >= maxRetries) {
        throw new Error(
          "Failed to generate report tab 2 after maximum retries"
        );
      }

      setSingleInterviewReportTab2(responseReportTab2.response);

      // Tab 3 리포트 생성
      // let responseReportTab3;
      // retryCount = 0;

      // while (retryCount < maxRetries) {
      //   try {
      //     responseReportTab3 = await InterviewXPersonaSingleInterviewReportTab3(
      //       data,
      //       isLoggedIn
      //     );

      //     if (
      //       responseReportTab3 &&
      //       responseReportTab3.response &&
      //       responseReportTab3.response.title
      //     ) {
      //       break;
      //     }
      //   } catch (error) {}

      //   retryCount++;
      //   await new Promise((resolve) => setTimeout(resolve, 1000));
      // }

      // if (retryCount >= maxRetries) {
      //   throw new Error(
      //     "Failed to generate report tab 3 after maximum retries"
      //   );
      // }

      // setSingleInterviewReportTab3(responseReportTab3.response);

      // 분석 완료 상태 설정
      setIsAnalyzing(false);
      setIsAnalysisComplete(true);
    } catch (error) {
      // console.error("Error in loadInterviewReport:", error);
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowErrorPopup(true);
            break;
          case 504:
            if (regenerateCount2 >= 3) {
              setShowErrorPopup(true);
            } else {
              setShowRegenerateButton2(true);
              setRegenerateCount2((prev) => prev + 1);
            }
            break;
          default:
            setShowErrorPopup(true);
            break;
        }
      } else {
        setShowErrorPopup(true);
      }
      setIsAnalyzing(false);
    }
  };

  // processInterview 함수 수정
  const processInterview = async () => {
    if (!isLoadingPrepare && interviewStatus[currentQuestionIndex] === "Pre") {
      try {
        // 현재 질문 상태를 "Ing"로 변경
        const newStatus = [...interviewStatus];
        newStatus[currentQuestionIndex] = "Ing";
        setInterviewStatus(newStatus);

        // 현재 질문의 답변 초기화
        setAnswers((prev) => ({
          ...prev,
          [currentQuestionIndex]: [],
        }));

        let allAnswers = [];

        // IndepthInterview 생성 조건 (심층인터뷰 && 현재 질문이 특화질문인 경우)
        // const isSpecialQuestion =
        //   interviewQuestionListState[currentQuestionIndex].question_type ===
        //   "특화질문";
        // // "공통질문";
        // const shouldGenerateIndepth = isIndepth && isSpecialQuestion;

        // 기존 인터뷰 진행 로직 (메인 질문 처리)
        setIsGenerating(true);

        const lastInterview = [];
        for (let q = 0; q < currentQuestionIndex; q++) {
          const questionAnswers = answers[q] || [];
          const personaAnswer = questionAnswers.find(
            (ans) =>
              ans.persona.personIndex === personaList.selected[0].personIndex
          );
          if (personaAnswer) {
            lastInterview.push({
              question: interviewQuestionListState[q],
              answer: personaAnswer.answer,
            });
          }
        }

        const data = {
          business_analysis_data: projectCreateInfo,
          question: interviewQuestionListState[currentQuestionIndex],
          theory_data: purposeItemsSingleAtom,
          persona_info: {
            id: `saas_${personaList.selected[0]._id}`,
            name: personaList.selected[0].personaName,
            keyword: personaList.selected[0].keywords,
            lifestyle: personaList.selected[0].lifestyle,
            characteristics: personaList.selected[0].personaCharacteristics,
            consumption_pattern: personaList.selected[0].consumptionPattern,
            personaType: personaList.selected[0].personaType,
            typeIndex: personaList.selected[0].type,
            request_persona_type: "saas",
          },
          last_interview: lastInterview,
        };

        let response = await InterviewXPersonaSingleInterviewRequest(
          data,
          isLoggedIn
        );
        let retryCount = 0;
        const maxRetries = 10;
        while (
          retryCount < maxRetries &&
          (!response || !response.response || !response.response.answer)
        ) {
          response = await InterviewXPersonaSingleInterviewRequest(
            data,
            isLoggedIn
          );
          retryCount++;
        }
        if (retryCount >= maxRetries) {
          setShowErrorPopup(true);
          return;
        }

        // 메인 질문 응답 저장
        if (response && response.response && response.response.answer) {
          setCurrentAnswerData(response.response.answer);
          setAnswers((prev) => {
            const newAnswers = {
              ...prev,
              [currentQuestionIndex]: [
                ...(prev[currentQuestionIndex] || []),
                {
                  persona: personaList.selected[0],
                  answer: response.response.answer,
                },
              ],
            };
            return newAnswers;
          });
        }
        setIsGenerating(false);

        // interviewData 업데이트
        setInterviewData((prev) => {
          const newData = [...(prev || [])];
          const currentQuestion =
            interviewQuestionListState[currentQuestionIndex];
          const currentAnswer = response?.response?.answer || allAnswers[0];
          const existingEntry = newData[currentQuestionIndex] || {};
          newData[currentQuestionIndex] = {
            ...existingEntry,
            main: {
              question: currentQuestion,
              answer: currentAnswer,
            },
          };
          return newData;
        });

        setInterviewDataState((prev) => {
          const newData = [...(prev || [])];
          const currentQuestion =
            interviewQuestionListState[currentQuestionIndex];
          const currentAnswer = response?.response?.answer || allAnswers[0];
          const existingEntry = newData[currentQuestionIndex] || {};
          newData[currentQuestionIndex] = {
            ...existingEntry,
            main: {
              question: currentQuestion,
              answer: currentAnswer,
            },
          };
          return newData;
        });

        const indepthLastInterview = [];
        for (let q = 0; q < currentQuestionIndex; q++) {
          const questionAnswers = answers[q] || [];
          const personaAnswer = questionAnswers.find(
            (ans) =>
              ans.persona.personIndex === personaList.selected[0].personIndex
          );
          if (personaAnswer) {
            indepthLastInterview.push({
              question: interviewQuestionListState[q],
              answer: personaAnswer.answer,
            });
          }
        }

        // 다음 질문으로 이동
        if (currentQuestionIndex < interviewQuestionListState.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        }

        // 현재 질문의 상태를 "Complete"로 업데이트
        // 상태를 Complete로 변경하기 전에 답변이 저장되었는지 확인
        if (response?.response?.answer || allAnswers[0]) {
          newStatus[currentQuestionIndex] = "Complete";
          setInterviewStatus(newStatus);
        }

        // } // 모든 인터뷰가 완료되었는지 확인
        const allComplete = newStatus.every((status) => status === "Complete");
        const questionCount = interviewQuestionListState.length; // 현재 질문 개수

        if (allComplete && questionCount >= 10) {
          // 데이터가 모두 저장될 때까지 잠시 대기
          await new Promise((resolve) => setTimeout(resolve, 2000));

          // 마지막으로 interviewDataState가 모든 질문을 포함하는지 확인
          setInterviewDataState((prev) => {
            const finalData = [...prev];
            interviewQuestionListState.forEach((question, index) => {
              if (!finalData[index]) {
                finalData[index] = {
                  question: question.question,
                  answer: "", // 빈 답변으로 초기화
                };
              }
            });
            return finalData;
          });

          // 한번 더 대기하여 상태 업데이트 완료 확인
          await new Promise((resolve) => setTimeout(resolve, 1000));

          loadInterviewReport(response.response.answer);
        }
      } catch (error) {
        // console.error("Error in processInterview:", error);
        setIsGenerating(false);
        setIsGeneratingIndepth(false);
        setIsGeneratingIndepthQuestion(false);
        setShowErrorPopup(true);
      }
    }
  };

  // interviewStatus가 변경될 때마다 processInterview 실행을 체크하는 useEffect 추가
  useEffect(() => {
    const checkAndProcessInterview = async () => {
      if (
        !isLoadingPrepare
        // interviewStatus[currentQuestionIndex] === "Pre" &&
        // interviewQuestionListState.length > 0
      ) {
        await processInterview();
      }
    };

    checkAndProcessInterview();
  }, [interviewStatus, currentQuestionIndex, isLoadingPrepare]);

  // 기존 useEffect 유지
  useEffect(() => {
    renderInterviewItems();
  }, [interviewStatus]);

  useEffect(() => {
    setActive(isActive);

    // 컴포넌트가 활성화되면 입력 필드에 포커스
    if (isActive) {
      setTimeout(() => {
        const inputElement = document.querySelector('input[type="text"]');
        if (inputElement) {
          inputElement.focus();
        }
      }, 100); // 렌더링 완료 후 실행되도록 약간의 지연 추가
    }
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

  useEffect(() => {
    setVisibleAnswers((prev) => {
      const newVisibleAnswers = { ...prev };
      interviewStatus.forEach(async (status, index) => {
        // 진행중인 질문은 자동으로 열기
        if (status === "Ing") {
          newVisibleAnswers[index] = true;
        }
        // 완료된 질문은 자동으로 닫기
        else if (status === "Complete") {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          newVisibleAnswers[index] = false;
        }
      });
      return newVisibleAnswers;
    });
  }, [interviewStatus]);

  const renderInterviewItems = () => {
    return interviewQuestionListState.map((item, index) => {
      const status = interviewStatus[index] || "Pre";
      if (status === "Ing" || status === "Complete") {
        const elements = [];

        // 기존 질문/답변 렌더링
        elements.push(
          <React.Fragment key={`main-${index}`}>
            <ChatItem Moder>
              {/* <Persona Moder color="Gainsboro" size="Medium" Round>
                <img src={personaImages.persona_moderator} alt="모더" />
                <span>
                  <img src={images.PatchCheckFill} alt="" />
                  <ModerText color="primary">모더</ModerText>
                </span>
              </Persona> */}
              <ChatBox Moder>
                <Sub1 color="gray800" align="left">
                  Q{index + 1}. {item.question}
                </Sub1>
              </ChatBox>
            </ChatItem>
            {answers[index]?.map((answer, answerIndex) => (
              <ChatItem key={`answer-${answerIndex}`} Persona>
                <Persona color="Linen" size="Medium" Round>
                  <img
                    src={
                      personaImages[answer.persona.imageKey] ||
                      (answer.persona.gender === "남성"
                        ? personaImages.persona_m_20_01 // 남성 기본 이미지
                        : personaImages.persona_f_20_01) // 여성 기본 이미지
                    }
                    alt={answer.persona.persona}
                  />
                </Persona>
                <ChatBox Persona>
                  <Sub1 color="gray800" align="left">
                    {answer.answer}
                  </Sub1>
                </ChatBox>
              </ChatItem>
            ))}
            {/* 답변 생성 중인 경우 */}
            {status === "Ing" && isGenerating && (
              <ChatItem Persona>
                <Persona color="Linen" size="Medium" Round>
                  <img
                    src={
                      personaImages[
                        personaList.selected[answers[index]?.length || 0]
                          ?.imageKey
                      ]
                    }
                    alt="페르소나"
                  />
                </Persona>
                <ChatBox Persona>
                  <Entering />
                </ChatBox>
              </ChatItem>
            )}
          </React.Fragment>
        );

        // 추가 질문이 있고 기존 질문/답변이 완료된 경우에만 추가 질문 렌더링
        if (
          indepthInterviews[index] ||
          (status === "Ing" &&
            (isGeneratingIndepth || isGeneratingIndepthQuestion))
        ) {
          elements.push(
            <React.Fragment key={`indepth-${index}`}>
              {/* 인뎁스 질문 및 답변 렌더링 */}
              {indepthInterviews[index]?.question ||
              indepthInterviews[index]?.answer ||
              isGeneratingIndepthQuestion ||
              isGeneratingIndepth ? (
                <React.Fragment key={`indepth-${index}`}>
                  {/* 모더 섹션: 인뎁스 질문 */}
                  {indepthInterviews[index]?.question ? (
                    // 질문 생성 완료 → 모더 질문 표시
                    <ChatItem Moder>
                      <Persona Moder color="Gainsboro" size="Medium" Round>
                        <img src={personaImages.persona_moderator} alt="모더" />
                        <span>
                          <img src={images.PatchCheckFill} alt="" />
                          <ModerText color="primary">모더</ModerText>
                        </span>
                      </Persona>
                      <ChatBox Moder>
                        <Sub1 color="gray800" align="left">
                          Q{index + 1}-1 {indepthInterviews[index].question}
                        </Sub1>
                      </ChatBox>
                    </ChatItem>
                  ) : (
                    isGeneratingIndepthQuestion && (
                      // 질문 생성 중 → 모더 Entering 애니메이션 표시
                      <ChatItem Moder>
                        <Persona Moder color="Gainsboro" size="Medium" Round>
                          <img
                            src={personaImages.persona_moderator}
                            alt="모더"
                          />
                          <span>
                            <img src={images.PatchCheckFill} alt="" />
                            <ModerText color="primary">모더</ModerText>
                          </span>
                        </Persona>
                        <ChatBox Moder>
                          <Entering />
                        </ChatBox>
                      </ChatItem>
                    )
                  )}

                  {/* 페르소나 섹션: 인뎁스 답변 */}
                  {indepthInterviews[index]?.question &&
                    (indepthInterviews[index]?.answer ? (
                      // 답변 생성 완료 → 페르소나 답변 표시
                      <ChatItem Persona>
                        <Persona color="Linen" size="Medium" Round>
                          <img
                            src={
                              personaImages[personaList.selected[0].imageKey]
                            }
                            alt={personaList.selected[0].persona}
                          />
                        </Persona>
                        <ChatBox Persona>
                          <Sub1 color="gray800" align="left">
                            {indepthInterviews[index].answer}
                          </Sub1>
                        </ChatBox>
                      </ChatItem>
                    ) : (
                      // 답변이 아직 없고, 답변 생성 중이면 → 페르소나 Entering 애니메이션 표시
                      isGeneratingIndepth && (
                        <ChatItem Persona>
                          <Persona color="Linen" size="Medium" Round>
                            <img
                              src={
                                personaImages[personaList.selected[0].imageKey]
                              }
                              alt="페르소나"
                            />
                          </Persona>
                          <ChatBox Persona>
                            <Entering />
                          </ChatBox>
                        </ChatItem>
                      )
                    ))}
                </React.Fragment>
              ) : null}
            </React.Fragment>
          );
        }
        return elements;
      }
      return null;
    });
  };

  const handleCheckResult = async () => {
    setActive(false);
    if (onClose) {
      onClose();
    }
    setSelectedPersonaList(personaList.selected);
    setIsPersonaAccessible(true);
    try {
      // 인터뷰 완료 후 결과 저장하기 위해 새로운 리포트 생성 (나중에 리포트 조회)
      let newReportId = await createProjectReportOnServer(
        project._id,
        "interviewSingleLive"
      );
      setReportId(newReportId); // 생성된 대화 ID 설정

      const creditUsePayload = {
        title: project.projectTitle,
        service_type: "심층 인터뷰 룸",
        target: "",
        state: "use",
        mount: creditCreateInterview,
      };

      await UserCreditUse(creditUsePayload, isLoggedIn);

      // 크레딧 사용 후 사용자 정보 새로고침

      const userCreditValue = await UserCreditInfo(isLoggedIn);
      // 전역 상태의 크레딧 정보 업데이트
      setUserCredits(userCreditValue);
    } catch (error) {
      // console.error("Failed to create project on server:", error);
    }
    navigate(`/Persona/4/SingleLive`, { replace: true });
    //replace: true 현재 페이지를 대체하여 이동( 뒤로 가기 시 이전 인터뷰 화면으로 돌아감 방지)
  };

  const handleQuestionSelect = async (index, questionText) => {
    try {
      // 이미 선택된 질문인 경우 처리
      if (selectedQuestions.includes(index)) {
        setSelectedQuestions((prev) => prev.filter((item) => item !== index));
        setIsInputEnabled(true); // input 활성화
        return;
      }

      // 새로운 질문 번호 계산
      const newQuestionNumber = interviewQuestionListState.length;

      // 상태 업데이트를 순차적으로 처리
      const updatedQuestionList = [
        ...interviewQuestionListState,
        { question: questionText, question_type: "추가질문" },
      ];

      // 기존 상태 업데이트
      setInterviewQuestionListState(updatedQuestionList);
      setInterviewStatus((prev) => [...prev, "Pre"]);
      setCurrentQuestionIndex(newQuestionNumber);
      setInputValue(""); // input 값 초기화

      await updateProjectOnServer(
        projectId,
        {
          singleInterviewQuestionList: updatedQuestionList,
        },
        isLoggedIn
      );
    } catch (error) {
      setShowErrorPopup(true);
    }
  };

  // 추가: useEffect를 사용하여 isInputEnabled가 true로 변경될 때 포커스 설정
  useEffect(() => {
    if (isInputEnabled) {
      document.querySelector('input[type="text"]').focus(); // 입력 필드에 포커스
    }
  }, [isInputEnabled]); // isInputEnabled가 변경될 때마다 실행

  // isAnalyzing이 false일 때 입력 필드에 자동 포커스 설정
  useEffect(() => {
    if (
      !isAnalyzing &&
      !interviewStatus.includes("Ing") &&
      interviewQuestionListState.length > 0
    ) {
      const inputElement = document.querySelector('input[type="text"]');
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [isAnalyzing, interviewStatus, interviewQuestionListState.length]);

  // 라디오 버튼 선택 상태를 관리하기 위한 새로운 state 추가
  const [selectedRadio, setSelectedRadio] = useState(null);

  const contentsRef = useRef(null);

  // 채팅 내용이 업데이트될 때마다 스크롤을 최하단으로 이동
  useEffect(() => {
    if (contentsRef.current) {
      contentsRef.current.scrollTop = contentsRef.current.scrollHeight;
    }
  }, [
    answers,
    indepthInterviews,
    isGenerating,
    isGeneratingIndepth,
    isGeneratingIndepthQuestion,
    isAnalyzing, // 분석 중 상태 추가
    isAnalysisComplete, // 분석 완료 상태 추가
    showRegenerateButton2, // 재시도 버튼 표시 상태 추가
  ]);

  const creditUse = async () => {
    // 팝업 닫기
    setShowRequestPopup(false);

    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      // console.error("토큰이 없습니다.");
      return;
    }

    // 크레딧 사용전 사용 확인
    const creditPayload = {
      mount: creditAdditionalQuestion,
    };
    const creditResponse = await UserCreditCheck(creditPayload, isLoggedIn);
    if (creditResponse?.state !== "use") {
      setShowCreditPopup(true);
      setSelectedRadio(null);
      return;
    }

    // 크레딧이 사용 가능한 상태면 사용 API 호출
    const creditUsePayload = {
      title: businessAnalysis.title,
      service_type: "추가 질문 수행",
      target: "",
      state: "use",
      mount: creditAdditionalQuestion,
    };

    const creditUseResponse = await UserCreditUse(creditUsePayload, isLoggedIn);

    // 크레딧 사용 처리가 완료되면 입력 활성화
    setIsInputEnabled(true);
  };

  return (
    <>
      <PopupBox isActive={active}>
        <ToastPopup Wide isActive={active}>
          <QuestionListWrap>
            {/* {businessAnalysis.title}의 {selectedInterviewPurpose} */}
            <H4 color="gray700" align="left">
              문항 리스트
            </H4>

            <QuestionList>
              {/* Dynamically displaying the interview questions */}
              {interviewQuestionListState.length > 0 ? (
                interviewQuestionListState.map((item, index) => {
                  const status = interviewStatus[index] || "Pre"; // 현재 질문의 상태를 가져옴
                  return (
                    <QuestionItem
                      key={index}
                      checked={status === "Complete" ? true : item.checked} // Complete일 때 checked를 true로 설정
                      disabled={status === "Pre"}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Sub2 color="gray800">
                        Q{index + 1}. {item.question}
                      </Sub2>
                      <span>
                        {status === "Complete" ? (
                          <img src={images.CheckGreen} alt="완료" />
                        ) : status === "Ing" ? (
                          // 진행 중일 때 표시 (텍스트 제거)
                          <span></span>
                        ) : (
                          // 준비 중일 때 표시 (텍스트 제거)
                          <span></span>
                        )}
                      </span>
                    </QuestionItem>
                  );
                })
              ) : (
                <Sub2 color="gray800">
                  입력한 질문이 표시돼요
                  <br />
                  질문은 최대 10번 가능합니다.
                </Sub2> // 질문이 없을 때 메시지 표시
              )}
            </QuestionList>
          </QuestionListWrap>

          <ChatWrap>
            <Header>
              <Title>
                {projectTotalInfo.projectTitle}의 1:1 자율형 인터뷰
                <ColseButton onClick={handleClose} />
              </Title>
              <ul>
                {/* 추가된 부분: 페르소나 정보 표시 */}
                {personaList?.selected?.map((persona) => {
                  return (
                    <li key={persona?._id}>
                      <Thumb>
                        <img
                          src={
                            personaImages[persona.imageKey] ||
                            (persona.gender === "남성"
                              ? personaImages.persona_m_20_01 // 남성 기본 이미지
                              : personaImages.persona_f_20_01) // 여성 기본 이미지
                          }
                          alt={persona?.personaName}
                        />
                      </Thumb>
                      <span>
                        {persona?.request_persona_type
                          ? persona?.personaName
                          : persona?.persona_view || persona?.personaName}
                      </span>
                      <span>
                        {persona?.gender} |{" "}
                        {persona?.age?.includes("세")
                          ? persona?.age
                          : `${persona?.age}세`}{" "}
                        | {persona?.job} {/* 성별, 나이, 직업 표시 */}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Header>

            <Contents ref={contentsRef} showAddQuestion={showAddQuestion}>
              <ChatListWrap>
                <ChatItem Add>
                  <ChatBox Moder>
                    <Sub1 color="gray800" align="left">
                      반갑습니다. {projectTotalInfo.projectTitle}에 관련된
                      인터뷰를 시작하겠습니다.
                    </Sub1>
                  </ChatBox>
                </ChatItem>
                <ChatItem Persona>
                  <Persona color="Linen" size="Medium" Round>
                    <img
                      src={personaImages[personaList?.selected[0]?.imageKey]}
                      alt={personaList?.selected[0]?.persona}
                    />
                  </Persona>
                  <ChatBox Persona>
                    <Sub1 color="gray800" align="left">
                      안녕하세요. 저는 {personaList?.selected[0]?.personaName}
                      입니다. 궁금한 점을 질문해 주시면 성실하게 답변해드리도록
                      하겠습니다.
                    </Sub1>
                  </ChatBox>
                </ChatItem>
              </ChatListWrap>
              {!isLoadingPrepare && isComplete
                ? renderInterviewItems()
                : renderInterviewItems()}
              <ChatListWrap>
                {interviewStatus.length > 0 &&
                  interviewStatus.every((status) => status === "Complete") &&
                  interviewQuestionListState.length < 10 &&
                  countAdditionalQuestion !== 0 &&
                  selectedRadio !== "yes" && (
                    <ChatItem Add>
                      <ChatBox Moder>
                        <Sub1 color="gray800" align="left">
                          보고서를 생성하시겠습니까? ({" "}
                          {interviewQuestionListState.length} / 10 )
                        </Sub1>
                      </ChatBox>
                      <ChatAddButton>
                        <label
                          disabled={countAdditionalQuestion === 0}
                          onClick={() => {
                            setSelectedRadio("yes");
                            loadInterviewReport();
                          }}
                        >
                          <input type="radio" name="addQuestion" />
                          <span>네!</span>
                        </label>

                        <label
                          onClick={() => {
                            if (selectedRadio === null) {
                              setSelectedRadio("no");
                            }
                          }}
                        >
                          <input
                            type="radio"
                            name="addQuestion"
                            // checked={selectedRadio === "no"}
                            // disabled={selectedRadio !== null}
                          />
                          <span>계속 질문 할게요</span>
                        </label>
                      </ChatAddButton>
                    </ChatItem>
                  )}
              </ChatListWrap>
              {interviewQuestionListState.length == 0 && (
                <LoadingBox>
                  <p>
                    인터뷰 대상자에게 궁금한 점이 무엇인가요?
                    <br />
                    아래 입력창에 편하게 질문을 입력해주세요!
                  </p>
                </LoadingBox>
              )}
              {isAnalyzing &&
                (showRegenerateButton2 ? (
                  <ErrorInterviewItem>
                    <p>
                      분석 중 오류가 발생했어요
                      <br />
                      지금 나가시면 인터뷰 내용이 저장되지 않으니, 다시
                      시도해주세요
                    </p>
                    <Button Small Outline onClick={() => loadInterviewReport()}>
                      <img src={images.ArrowClockwise} alt="" />
                      분석 다시하기
                    </Button>
                  </ErrorInterviewItem>
                ) : (
                  <LoadingBox>
                    <Loading>
                      <div />
                      <div />
                      <div />
                    </Loading>
                    <p>
                      인터뷰 결과를 취합하고 분석 중입니다.
                      <span>잠시만 기다려주세요 ...</span>
                    </p>
                  </LoadingBox>
                ))}
              {isAnalysisComplete && (
                <LoadingBox Complete>
                  <img src={images.CheckCircleFill} alt="완료" />

                  <p>
                    결과 분석이 완료되었습니다. 지금 바로 확인해보세요!
                    <span onClick={handleCheckResult}>지금 확인하기</span>
                  </p>
                </LoadingBox>
              )}
            </Contents>

            <ChatFooter>
              <ChatInput>
                <CustomInput
                  Edit
                  type="text"
                  value={inputValue}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      !e.shiftKey &&
                      inputValue.trim() &&
                      !interviewStatus.includes("Ing") &&
                      !isAnalyzing &&
                      singleInterviewReportTab2.length === 0 // 추가된 조건
                    ) {
                      e.preventDefault(); // 기본 엔터 동작 방지
                      // DOM 이벤트 즉시 중지 및 버블링 방지
                      e.stopPropagation();

                      // 중복 호출 방지를 위해 플래그 사용
                      const isProcessing =
                        e.target.dataset.processing === "true";
                      if (isProcessing) return;

                      // 처리 중 플래그 설정
                      e.target.dataset.processing = "true";

                      // 비동기 실행
                      setTimeout(() => {
                        handleQuestionSelect(0, inputValue.trim());
                        setInputValue("");
                        // 처리 완료 후 플래그 초기화 (약간의 지연 추가)
                        setTimeout(() => {
                          e.target.dataset.processing = "false";
                        }, 300);
                      }, 0);
                    }
                  }}
                  onChange={handleInputChange}
                  placeholder={`질문을 입력해주세요. (${
                    interviewQuestionListState.length > 0
                      ? `${
                          10 - interviewQuestionListState.length
                        }번 더 질문 할 수 있습니다`
                      : "최대 10번 질문 할 수 있습니다."
                  })`}
                  style={{
                    pointerEvents: "auto",
                  }}
                  disabled={
                    isAnalyzing || singleInterviewReportTab2.length !== 0
                  }
                />
                <button
                  type="button"
                  onClick={() => {
                    if (inputValue.trim()) {
                      handleQuestionSelect(0, inputValue.trim());
                      setInputValue("");
                    }
                  }}
                  disabled={
                    !inputValue.trim() ||
                    isAnalyzing ||
                    interviewStatus.includes("Ing") ||
                    singleInterviewReportTab2.length !== 0
                  }
                >
                  <Body1 color="primary">질문하기</Body1>
                </button>
              </ChatInput>
            </ChatFooter>
          </ChatWrap>
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

      {showRequestPopup &&
        (eventState ? (
          <PopupWrap
            Event
            title="추가 질문 수행"
            message={
              <>
                현재 {eventTitle} 기간으로 이벤트 크레딧이 소진됩니다.
                <br />({creditAdditionalQuestion} 크레딧)
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => {
              setSelectedRadio(null);
              setShowRequestPopup(false);
            }}
            onConfirm={() => {
              // handleCloseRequestPopup();
              creditUse();
            }}
          />
        ) : trialState ? (
          <PopupWrap
            Check
            title="추가 질문 수행"
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditAdditionalQuestion} 크레딧)
                {/* <br />
                신규 가입 2주간 무료로 사용 가능합니다. */}
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => {
              setSelectedRadio(null);
              setShowRequestPopup(false);
            }}
            onConfirm={() => {
              // handleCloseRequestPopup();
              creditUse();
            }}
          />
        ) : (
          <PopupWrap
            Check
            title="추가 질문 수행"
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditAdditionalQuestion} 크레딧)
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => {
              setSelectedRadio(null);
              setShowRequestPopup(false);
            }}
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
          onCancel={() => {
            setSelectedRadio(null);
            setShowCreditPopup(false);
          }}
        />
      )}
    </>
  );
};

export default OrganismToastPopupSingleLiveChat;

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
  max-width: ${({ Wide }) => (Wide ? "1175px" : "800px")};
  height: 100vh;
  display: flex;
  flex-direction: ${({ Wide }) => (Wide ? "row" : "column")};
  align-items: ${({ Wide }) => (Wide ? "flex-start" : "center")};
  justify-content: flex-start;
  gap: ${({ Wide }) => (Wide ? "0" : "40px")};
  padding: ${({ Wide }) => (Wide ? "0 0 0 32px" : "32px")};
  border-radius: 15px 0 0 15px;
  background: ${palette.white};
  transition: transform 0.3s ease;
`;

const QuestionListWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 40px;
  max-width: 340px;
  width: 100%;
  height: 100%;
  padding: 32px 20px 32px 0;
  border-right: 1px solid ${palette.outlineGray};
`;

const QuestionList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  overflow-y: auto;
`;

const QuestionItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
  padding: 17px 12px;
  border-radius: 8px;
  border: ${({ checked }) =>
    checked ? `1px solid ${palette.outlineGray}` : "none"};
  background: ${({ checked }) =>
    checked ? palette.white : `rgba(34, 111, 255, 0.10)`};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  filter: ${({ disabled }) =>
    disabled ? "grayscale(1) opacity(0.3)" : "grayscale(0) opacity(1)"};

  > div {
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  span {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
  }

  img {
    width: 12px;
    opacity: 0;
  }

  ${({ checked }) =>
    checked &&
    `
    img {
      opacity: 1;
    }
  `}
`;

const ChatWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ChatListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
`;

const ChatItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${(props) =>
    props.Persona
      ? "row"
      : props.Moder
      ? "row-reverse"
      : props.Add
      ? "column"
      : "none"};
  align-items: ${({ Add }) => (Add ? "flex-end" : "flex-start")};
  justify-content: flex-start;
  gap: ${({ Add }) => (Add ? "8px" : "12px")};
  width: 100%;
`;

const ChatBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;
  max-width: 624px;
  padding: ${(props) =>
    props.Persona ? "12px" : props.Moder ? "14px 20px" : "0"};
  border-radius: ${(props) =>
    props.Persona
      ? "0 15px 15px 15px"
      : props.Moder
      ? "15px 0 15px 15px"
      : "0"};
  background: ${(props) =>
    props.Persona
      ? `rgba(34, 111, 255, 0.06)`
      : props.Moder
      ? palette.white
      : "none"};

  &:before {
    content: attr(data-time);
    position: absolute;
    right: 102%;
    bottom: 0;
    font-size: 0.75rem;
    color: ${palette.gray500};
    white-space: nowrap;
  }

  span {
    font-size: 0.88rem;
    font-weight: 400;
    color: ${palette.gray500};
  }
`;

const ChatAddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;

  label {
    span {
      font-family: "Pretendard", "Poppins";
      font-size: 0.88rem;
      color: ${palette.gray700};
      font-weight: 400;
      line-height: 1.55;
      letter-spacing: -0.42px;
      padding: 5px 12px;
      border-radius: 40px;
      border: 1px solid ${palette.gray700};
      outline: none;
      background: transparent;
      transition: all 0.5s;
      cursor: pointer;

      &:hover {
        color: ${palette.white};
        border: 1px solid ${palette.gray800};
        background: ${palette.gray800};
      }
    }

    input[type="radio"] {
      display: none;

      &:checked {
        + span {
          color: ${palette.white};
          border: 1px solid ${palette.gray800};
          background: ${palette.gray800};
        }
      }
    }

    &[disabled] {
      cursor: not-allowed;

      span {
        opacity: 0.5;
        cursor: not-allowed;

        &:hover {
          color: ${palette.gray700};
          border: 1px solid ${palette.gray700};
          background: transparent;
        }
      }

      input[type="radio"]:checked + span {
        color: ${palette.white};
        border: 1px solid ${palette.gray800};
        background: ${palette.gray800};
        opacity: 0.5;

        &:hover {
          color: ${palette.white};
          border: 1px solid ${palette.gray800};
          background: ${palette.gray800};
        }
      }
    }
  }

  button {
    flex-shrink: 0;
    font-family: "Pretendard", "Poppins";
    font-size: 1rem;
    border: 0;
    filter: grayscale(1) opacity(0.3);
    transition: all 0.5s;
    background: none;
    cursor: pointer;

    &:disabled {
      opacity: 1;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      filter: grayscale(0) opacity(1);
    }
  }
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 32px;
  border-bottom: 1px solid ${palette.outlineGray};

  ul {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 0.88rem;
    color: ${palette.gray500};
    font-weight: 300;
    line-height: 1.5;
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

const ChatFooter = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 12px 14px 12px 20px;
  border-top: 1px solid ${palette.outlineGray};
  background: ${palette.white};
  z-index: 1;

  input {
    width: 100%;
    font-size: 1rem;
    line-height: 1.55;

    &::placeholder {
      color: ${palette.gray300};
    }

    &:disabled {
      background: ${palette.white};
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

const ChatInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  padding: 12px 14px 12px 20px;
  border-radius: 50px;

  border: ${(props) =>
    props.isInputEnabled
      ? `1px solid ${palette.primary}`
      : `1px solid ${palette.outlineGray}`};
  background: ${palette.white};
  transition: all 0.3s ease;

  &:has(input:hover),
  &:has(input:focus) {
    border-color: ${palette.primary};

    button {
      filter: grayscale(0) opacity(1);
    }
  }

  button {
    flex-shrink: 0;
    font-family: "Pretendard", "Poppins";
    font-size: 1rem;
    border: 0;
    filter: grayscale(1) opacity(0.3);
    transition: all 0.5s;
    background: none;
    cursor: pointer;

    &:disabled {
      opacity: 1;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      filter: grayscale(0) opacity(1);
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
  height: ${({ showAddQuestion }) =>
    showAddQuestion ? "calc(100% - 58px)" : "100%"};
  padding: 40px 32px;
  overflow-y: auto;
  background: ${palette.chatGray};
  transition: all 0.3s ease-in-out;
  scroll-behavior: smooth; // 부드러운 스크롤 효과 추가
`;

const LoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 40px 20px 24px;
  border-radius: 10px;
  background: ${palette.chatGray};

  p {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${palette.gray700};

    span {
      color: ${palette.white};
      padding: 8px 16px;
      border-radius: 10px;
      background: ${(props) =>
        props.Complete ? palette.primary : palette.gray300};
      cursor: pointer;
    }
  }
`;

const move = keyframes`
  0% {
    -webkit-transform:scale(0);
    transform:scale(0);
    opacity:0
  }
  5% {
    opacity:1
  }
  100% {
    -webkit-transform:scale(6);
    transform:scale(6);
    opacity:0
  }
`;

const moveCircle = keyframes`
  0% {
    -webkit-transform:scale(1);
    transform:scale(1);
  }
  50% {
    -webkit-transform:scale(1.2);
    transform:scale(1.2);
  }
  100% {
    -webkit-transform:scale(1);
    transform:scale(1);
  }
`;

const Loading = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    position: absolute;
    top: 42%;
    left: 42%;
    transform: translate(-50%, -50%);
    width: 13px;
    height: 13px;
    border-radius: 50%;

    &:nth-child(1) {
      border: 1px solid ${palette.primary};
      background: rgba(34, 111, 255, 1);
      animation: ${move} 2s 0s linear infinite;
      animation-delay: -3s;
      opacity: 0.7;
    }
    &:nth-child(2) {
      border: 1px solid ${palette.primary};
      background: rgba(34, 111, 255, 1);
      animation: ${move} 2s 0s linear infinite;
      opacity: 0.5;
    }
    &:nth-child(3) {
      background: ${palette.primary};
      animation: ${moveCircle} 2s 0s linear infinite;
    }
  }
`;

const InterviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
  // cursor: ${(props) => (props.status === "Pre" ? "default" : "pointer")};
`;

const ErrorInterviewItem = styled(InterviewItem)`
  gap: 12px;
  padding: 73px 0;
  border: 0;
  background: ${palette.chatGray};

  p {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${palette.gray700};
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

const flash = keyframes`
  0% {
    background-color: ${palette.gray300};
    box-shadow: 12px 0 ${palette.gray300}, -12px 0 ${palette.gray500};
  }
  50% {
    background-color: ${palette.gray500};
    box-shadow: 12px 0 ${palette.gray500}, -12px 0 ${palette.gray300};
  }
  100% {
    background-color: ${palette.gray300};
    box-shadow: 12px 0 ${palette.gray505}, -12px 0 ${palette.gray300};
  }
`;

const Entering = styled.div`
  width: 6px;
  height: 6px;
  margin: 0 12px;
  border-radius: 50%;
  background: ${palette.gray500};
  box-shadow: 12px 0 ${palette.gray500}, -12px 0 ${palette.gray500};
  position: relative;
  animation: ${flash} 0.5s ease-out infinite alternate;
`;

const AddQuestion = styled.div`
  position: sticky;
  bottom: ${({ show }) => (show ? "58px" : "-100%")};
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
  height: ${({ show }) => (show ? "auto" : "0")};
  padding: ${({ show }) => (show ? "20px 20px 12px 20px" : "0")};
  border-top: ${({ show }) =>
    show ? `1px solid ${palette.outlineGray}` : "none"};
  background: ${palette.white};
  transform: translateY(${({ show }) => (show ? "0" : "100%")});
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  transition: all 0.3s ease-in-out;
  z-index: 1;
  /* overflow: hidden; */

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    width: 100%;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
    background: ${palette.chatGray};
    transition: all 0.5s;
    cursor: pointer;

    div ${Body2} {
      &:before {
        content: "Select";
      }
    }

    &:hover {
      border-color: ${palette.primary};
      background: ${palette.white};

      div ${Body2} {
        &:before {
          // content: "Done";
        }
      }
    }

    &.selected {
      opacity: 0.3;
      background: ${palette.white};

      div ${Body2} {
        &:before {
          content: "Done";
        }
      }

      &:hover {
        opacity: 1;
      }
    }

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;

      &:hover {
        border-color: ${palette.outlineGray};
        background: ${palette.chatGray};
      }
    }
  }
`;

const AddQuestionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
