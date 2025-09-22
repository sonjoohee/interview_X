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
  SINGLE_INTERVIEW_QUESTION_LIST,
  PURPOSE_ITEMS_SINGLE,
  SINGLE_INTERVIEW_REPORT_TAB1,
  SINGLE_INTERVIEW_REPORT_TAB2,
  SINGLE_INTERVIEW_REPORT_TAB3,
  TRIAL_STATE,
  CREDIT_ADDITIONAL_QUESTION,
  EVENT_STATE,
  EVENT_TITLE,
  PROJECT_TOTAL_INFO,
  PROJECT_CREATE_INFO,
  PROJECT_SAAS,
  CREDIT_CREATE_INTERVIEW,
  USER_CREDITS,
} from "../../../../pages/AtomStates";
import {
  updateProjectOnServer,
  UserCreditCheck,
  UserCreditUse,
  createProjectReportOnServer,
  UserCreditInfo,
} from "../../../../utils/indexedDB";
import MoleculeRecreate from "../../../../pages/Persona/components/molecules/MoleculeRecreate";
import { InterviewXPersonaSingleInterviewGeneratorRequest } from "../../../../utils/indexedDB";
import { InterviewXPersonaSingleInterviewRequest } from "../../../../utils/indexedDB";
import { InterviewXPersonaSingleInterviewRequestAddQuestion } from "../../../../utils/indexedDB";
import { InterviewXPersonaSingleInterviewReportTab1 } from "../../../../utils/indexedDB";
import { InterviewXPersonaSingleInterviewReportTab2 } from "../../../../utils/indexedDB";
import { InterviewXPersonaSingleInterviewReportTab3 } from "../../../../utils/indexedDB";
import { SkeletonLine } from "../../../../assets/styles/Skeleton";
import { InterviewXPersonaSingleIndepthInterviewGeneratorRequest } from "../../../../utils/indexedDB";

const OrganismToastPopupSingleChat = ({
  isActive,
  onClose,
  isComplete,
  isIndepth,
}) => {
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [creditCreateInterview] = useAtom(CREDIT_CREATE_INTERVIEW);
  const project = projectSaas;
  const [selectedPersonaList, setSelectedPersonaList] = useAtom(
    SELECTED_PERSONA_LIST
  );
  const [purposeItemsSingleAtom] = useAtom(PURPOSE_ITEMS_SINGLE);
  const [, setReportId] = useAtom(PROJECT_REPORT_ID);
  const [, setIsPersonaAccessible] = useAtom(IS_PERSONA_ACCESSIBLE);
  const [interviewData, setInterviewData] = useAtom(INTERVIEW_DATA);
  const [, setSingleInterviewReportTab1] = useAtom(
    SINGLE_INTERVIEW_REPORT_TAB1
  );
  const [, setSingleInterviewReportTab2] = useAtom(
    SINGLE_INTERVIEW_REPORT_TAB2
  );
  const [, setSingleInterviewReportTab3] = useAtom(
    SINGLE_INTERVIEW_REPORT_TAB3
  );
  const [projectId] = useAtom(PROJECT_ID);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [personaButtonState3, setPersonaButtonState3] = useAtom(
    PERSONA_BUTTON_STATE_3
  );
  const [personaList] = useAtom(PERSONA_LIST);
  const [singleInterviewQuestionList, setSingleInterviewQuestionList] = useAtom(
    SINGLE_INTERVIEW_QUESTION_LIST
  );
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
  const [regenerateCount1, setRegenerateCount1] = useState(0);
  const [regenerateCount2, setRegenerateCount2] = useState(0);
  const [showRegenerateButton1, setShowRegenerateButton1] = useState(false);
  const [showRegenerateButton2, setShowRegenerateButton2] = useState(false);
  const [interviewAdditionalQuestion, setInterviewAdditionalQuestion] =
    useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [countAdditionalQuestion, setCountAdditionalQuestion] = useState(1);
  const [addQuestionLoading, setAddQuestionLoading] = useState(false);
  const [, setCurrentAnswerData] = useState("");
  // 추가 질문 관련 상태 추가
  const [isGeneratingIndepth, setIsGeneratingIndepth] = useState(false);
  const [isGeneratingIndepthQuestion, setIsGeneratingIndepthQuestion] =
    useState(false);
  const [indepthInterviews, setIndepthInterviews] = useState({});

  // contentsRef 및 상태 관리
  const contentsRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isNewContentAdded, setIsNewContentAdded] = useState(false);
  const [allContentLoaded, setAllContentLoaded] = useState(false);
  const [prevInterviewDataLength, setPrevInterviewDataLength] = useState(0);
  const [hasScroll, setHasScroll] = useState(false);

  // 파일 상단에 다음 추가 (다른 상태 변수들 근처에)
  const questionRefs = useRef({});

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddQuestionGenerate = async () => {
    if (!inputValue.trim()) {
      return; // 빈 입력값인 경우 처리하지 않음
    }
    try {
      if (inputValue.length > 0) {
        const lastInterview = [];
        // 현재 질문 이전 질문들 수집
        for (let q = 0; q <= currentQuestionIndex; q++) {
          // <=로 변경하여 추가된 질문도 포함
          // 각 질문에 대해서 answers 배열에서 해당 질문의 답변들을 찾음
          const questionAnswers = answers[q] || [];
          // 페르소나 매칭
          const personaAnswer = questionAnswers.find(
            (ans) =>
              ans.persona.personIndex === personaList.selected[0].personIndex
          );
          if (personaAnswer) {
            // 찾은 답변이 있다면 질문과 답변을 쌍으로 배열에 추가
            lastInterview.push({
              question: interviewQuestionListState[q],
              answer: personaAnswer.answer,
            });
          }
        }
        setShowAddQuestion(true);
        setAddQuestionLoading(true);
        // 생성된 질문이 없다면 API 요청
        let data = {
          business_idea: projectTotalInfo.projectTitle,
          business_analysis_data: projectCreateInfo,
          answer_list: lastInterview,
          theory_data: selectedInterviewPurposeData,
          input_data: inputValue,
        };

        let response = await InterviewXPersonaSingleInterviewRequestAddQuestion(
          data,
          isLoggedIn
        );

        let retryCount = 0;
        const maxRetries = 10;

        while (
          retryCount < maxRetries &&
          (!response ||
            !response.response ||
            !response.response.moderator_question_1 ||
            !response.response.moderator_question_2 ||
            !response.response.moderator_question_3 ||
            !response.response.check_inputdata)
        ) {
          response = await InterviewXPersonaSingleInterviewRequestAddQuestion(
            data,
            isLoggedIn
          );
          retryCount++;
        }

        if (retryCount >= maxRetries) {
          setShowErrorPopup(true);
          return;
        } else {
          if (response.response) {
            if (response.response.check_inputdata === 0) {
              setShowErrorPopup(true);
            } else {
              let addInputQuestion = {
                ...response.response,
                moderator_question_4: inputValue,
              };
              setInterviewAdditionalQuestion(addInputQuestion);
            }
          }
        }
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowErrorPopup(true);
            break;
          case 504:
            if (regenerateCount1 >= 3) {
              setShowErrorPopup(true);
              return;
            } else {
              setShowRegenerateButton1(true);
              setRegenerateCount1(regenerateCount1 + 1);
            }
            break;
          default:
            setShowErrorPopup(true);
            break;
        }
      }
    } finally {
      setAddQuestionLoading(false);
    }
  };

  //저장되었던 인터뷰 로드
  useEffect(() => {
    const interviewLoading = async () => {
      // 인터뷰 스크립트 보기, 인터뷰 상세보기로 진입 시 isComplete는 True
      if (isComplete) {
        const questions = interviewData.map((item) => {
          // 모든 question 키를 찾아서 값이 있는 첫 번째 question을 반환
          const questionKeys = Object.keys(item.question).filter((key) =>
            key.startsWith("question")
          );
          const question = questionKeys
            .map((key) => item[key].question)
            .find((q) => q);
          return { question };
        });

        setInterviewQuestionListState(questions);
        // 모든 질문을 Complete 상태로 설정
        const completedStatus = new Array(interviewData.length).fill(
          "Complete"
        );
        setInterviewStatus(completedStatus);

        const newAnswers = {};

        questions.forEach((_, index) => {
          const answers = interviewData[index].answer;
          newAnswers[index] = (
            selectedPersonaList.length
              ? selectedPersonaList
              : personaList.selected
          ).map((persona, pIndex) => {
            // Ensure that answers[pIndex] exists
            const answer =
              answers && answers[pIndex] !== undefined ? answers[pIndex] : null;
            return {
              persona: persona,
              answer: answer,
            };
          });
        });
        setAnswers(newAnswers);

        // 모든 답변을 보이도록 설정
        const allVisible = {};
        questions.forEach((_, index) => {
          allVisible[index] = true;
        });
        setVisibleAnswers(allVisible);
        setIsLoadingPrepare(false);

        return; // isComplete가 True일 때 API 호출 없이 종료
      }

      loadInterviewQuestion(); // 질문 생성
    };
    interviewLoading();
  }, [personaButtonState3, isComplete]);

  // 인터뷰 질문 생성 단계
  const loadInterviewQuestion = async () => {
    setShowRegenerateButton1(false);
    try {
      if (personaButtonState3 === 1) {
        // selectedInterviewPurpose와 같은 view_title을 가진 질문 찾기

        const existingQuestions = singleInterviewQuestionList.find(
          (item) => item.theory_name === selectedInterviewPurposeData.title
        );

        if (
          existingQuestions &&
          existingQuestions.commonQuestions &&
          existingQuestions.specialQuestions
        ) {
          // 이미 질문이 생성된 상태면 상태값 설정 후 5초 대기
          const combinedQuestions = [
            ...existingQuestions.commonQuestions,
            ...existingQuestions.specialQuestions,
          ];
          // setInterviewQuestionListState(combinedQuestions.slice(0, 1)); // 질문 한개 테스트
          setInterviewQuestionListState(combinedQuestions);

          await new Promise((resolve) => setTimeout(resolve, 5000));
          setIsLoadingPrepare(false);
          // setInterviewStatus(["Pre"]); // 테스트 하나
          setInterviewStatus(Array(combinedQuestions.length).fill("Pre"));
        } else {
          // 생성된 질문이 없다면 API 요청
          let data = {
            business_idea: projectTotalInfo.projectTitle,
            business_analysis_data: projectCreateInfo,
            theory_name: selectedInterviewPurposeData?.title || "",
          };

          let response = await InterviewXPersonaSingleInterviewGeneratorRequest(
            data,
            isLoggedIn
          );

          let retryCount = 0;
          const maxRetries = 10;

          while (
            retryCount < maxRetries &&
            (!response || !response.response || response.response.questions)
          ) {
            response = await InterviewXPersonaSingleInterviewGeneratorRequest(
              data,
              isLoggedIn
            );
            retryCount++;
          }

          if (retryCount >= maxRetries) {
            setShowErrorPopup(true);
            return;
          } else {
            if (response.response) {
              const commonQuestions = response.response
                .filter((item) => item.question_type === "공통질문")
                .map((item) => item);

              const specialQuestions = response.response
                .filter((item) => item.question_type === "특화질문")
                .map((item) => item);

              const newQuestionData = {
                theory_name: selectedInterviewPurposeData.title,
                commonQuestions,
                specialQuestions,
              };
              setSingleInterviewQuestionList((prev) => {
                const newState = [...prev, newQuestionData];
                return newState;
              });

              const combinedQuestions = [
                ...newQuestionData.commonQuestions,
                ...newQuestionData.specialQuestions,
              ];
              setInterviewQuestionListState(combinedQuestions);
              setIsLoadingPrepare(false);
              setInterviewStatus(Array(combinedQuestions.length).fill("Pre"));

              await updateProjectOnServer(
                projectId,
                {
                  singleInterviewQuestionList: [
                    ...singleInterviewQuestionList,
                    newQuestionData,
                  ],
                },
                isLoggedIn
              );
            }
          }
        }
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowErrorPopup(true);
            break;
          case 504:
            if (regenerateCount1 >= 3) {
              setShowErrorPopup(true);
              return;
            } else {
              setShowRegenerateButton1(true);
              setRegenerateCount1(regenerateCount1 + 1);
            }
            break;
          default:
            setShowErrorPopup(true);
            break;
        }
      }
    }
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
      let responseReport1;
      let retryCount = 0;
      const maxRetries = 10;

      while (retryCount < maxRetries) {
        try {
          responseReport1 = await InterviewXPersonaSingleInterviewReportTab1(
            data,
            isLoggedIn
          );

          // 응답 데이터 유효성 검사
          if (
            responseReport1 &&
            responseReport1.response &&
            responseReport1.response.title &&
            responseReport1.response.research_theory &&
            responseReport1.response.research_purpose &&
            responseReport1.response.research_insight
          ) {
            break;
          }
        } catch (error) {}

        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      if (retryCount >= maxRetries) {
        throw new Error(
          "Failed to generate report tab 1 after maximum retries"
        );
      }

      setSingleInterviewReportTab1(responseReport1.response);

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
            responseReportTab2.response.product_service_usage_pattern &&
            responseReportTab2.response.purchase_and_usage_motivation &&
            responseReportTab2.response.problems_and_requirements
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
      let responseReportTab3;
      retryCount = 0;

      while (retryCount < maxRetries) {
        try {
          responseReportTab3 = await InterviewXPersonaSingleInterviewReportTab3(
            data,
            isLoggedIn
          );

          if (
            responseReportTab3 &&
            responseReportTab3.response &&
            responseReportTab3.response.title
          ) {
            break;
          }
        } catch (error) {}

        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      if (retryCount >= maxRetries) {
        throw new Error(
          "Failed to generate report tab 3 after maximum retries"
        );
      }

      setSingleInterviewReportTab3(responseReportTab3.response);

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
        const isSpecialQuestion =
          interviewQuestionListState[currentQuestionIndex].question_type ===
          "특화질문"; 
        // "공통질문";
        const shouldGenerateIndepth = isIndepth && isSpecialQuestion;

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
        // console.log(
        //   "personaList.selected[0] 정보 보기",
        //   personaList.selected[0]
        // );
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

        // 특화질문 데이터(현재 질문과 응답)를 인자로 전달하여 인뎁스 인터뷰 진행
        if (shouldGenerateIndepth) {
          await processIndepthInterview(
            currentQuestionIndex,
            indepthLastInterview,
            interviewQuestionListState[currentQuestionIndex],
            response.response.answer
          );
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

        if (allComplete && countAdditionalQuestion === 0) {
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
        !isLoadingPrepare &&
        interviewStatus[currentQuestionIndex] === "Pre" &&
        interviewQuestionListState.length > 0
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

  const handleAnswerToggle = (index) => {
    // 'Pre', 'Ing' 상태일 때는 토글 불가능
    if (
      interviewStatus[index] === "Pre" ||
      interviewStatus[index] === "Ing" ||
      interviewStatus[index] === undefined
    )
      return;
    setVisibleAnswers((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const scrollToQuestion = (index) => {
    // 해당 문항의 상태가 Pre인 경우 스크롤하지 않음
    if (interviewStatus[index] === "Pre") return;

    // 해당 문항 요소가 있으면 스크롤
    if (questionRefs.current[index]) {
      questionRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const renderInterviewItems = () => {
    return interviewQuestionListState.map((item, index) => {
      const status = interviewStatus[index] || "Pre";
      if (status === "Ing" || status === "Complete") {
        const elements = [];

        elements.push(
          <React.Fragment key={`main-${index}`}>
            <ChatItem
              Moder
              ref={(el) => (questionRefs.current[index] = el)} // ref 추가
            >
              <Persona Moder color="Gainsboro" size="Medium" Round>
                <img src={personaImages.persona_moderator} alt="모더" />
                <span>
                  <img src={images.PatchCheckFill} alt="" />
                  <ModerText color="primary">모더</ModerText>
                </span>
              </Persona>
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
                    src={personaImages[answer.persona.imageKey]}
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
        "interviewSingle"
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
    navigate(`/Persona/4/Single`, { replace: true });
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
      setSelectedQuestions((prev) => [...prev, index]);
      setCountAdditionalQuestion((prev) => prev - 1);
      setIsInputEnabled(false); // input 비활성화
      setInputValue(""); // input 값 초기화
      setShowAddQuestion(false); // AddQuestion 컴포넌트 숨기기
    } catch (error) {
      // console.error("Error in handleQuestionSelect:", error);
      setShowErrorPopup(true);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Enter 키가 눌렸을 때의 동작을 여기에 추가하세요.
      handleAddQuestionGenerate(); // 예시: 질문 추가 함수 호출
    }
  };

  // 추가: useEffect를 사용하여 isInputEnabled가 true로 변경될 때 포커스 설정
  useEffect(() => {
    if (isInputEnabled) {
      document.querySelector('input[type="text"]').focus(); // 입력 필드에 포커스
    }
  }, [isInputEnabled]); // isInputEnabled가 변경될 때마다 실행

  // 라디오 버튼 선택 상태를 관리하기 위한 새로운 state 추가
  const [selectedRadio, setSelectedRadio] = useState(null);

  async function processIndepthInterview(
    currentQuestionIndex,
    indepthLastInterview,
    specialQuestion,
    specialAnswer
  ) {
    setIsGeneratingIndepthQuestion(true);

    // 특화질문 데이터 객체 생성
    const specialQA = {
      question: specialQuestion,
      answer: specialAnswer,
    };

    // 인뎁스 질문 생성 API 호출
    let responseIndepthInterview =  
          await InterviewXPersonaSingleIndepthInterviewGeneratorRequest(
            {
              business_idea: businessAnalysis.title,
              business_analysis_data: businessAnalysis,
              theory_data: selectedInterviewPurposeData.title,
              last_interview: specialQA,
            },
            isLoggedIn
          );


    let retryCountIndepthQuestion = 0;
    const maxRetry = 10;

     while (retryCountIndepthQuestion < maxRetry &&
      (!responseIndepthInterview ||
        !responseIndepthInterview.response ||
        !responseIndepthInterview.response.question ||
        typeof responseIndepthInterview.response.question === 'object')
    ) {
      responseIndepthInterview = await InterviewXPersonaSingleIndepthInterviewGeneratorRequest(
         {
              business_idea: businessAnalysis.title,
              business_analysis_data: businessAnalysis,
              theory_data: selectedInterviewPurposeData.title,
              last_interview: specialQA,
            },
            isLoggedIn
          );
      retryCountIndepthQuestion++;
    }

    if (retryCountIndepthQuestion >= maxRetry) {
      setShowErrorPopup(true);
      setIsGeneratingIndepth(false);
      setIsGeneratingIndepthQuestion(false);
      return;
    }


    const indepthInterview = responseIndepthInterview.response;
    // console.log("indepthInterview", indepthInterview)
    // 질문 생성 완료되면 질문만 바로 업데이트 (답변은 아직 없음)
    setIndepthInterviews((prev) => ({
      ...prev,
      [currentQuestionIndex]: {
        question: indepthInterview.question, // 질문만 업데이트
        answer: prev[currentQuestionIndex]?.answer, // 기존 답변은 그대로
      },
    }));

    setIsGeneratingIndepthQuestion(false);

    // 이제 인뎁스 답변 생성을 시작
    setIsGeneratingIndepth(true);
    let indepthResponse = await InterviewXPersonaSingleInterviewRequest(
      {
        business_analysis_data: businessAnalysis,
        question: indepthInterview.question,
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
        last_interview: indepthLastInterview,
      },
      isLoggedIn
    );

    let retryCountIndepth = 0;
    const maxRetries = 10;
    while (
      retryCountIndepth < maxRetries &&
      (!indepthResponse ||
        !indepthResponse.response ||
        !indepthResponse.response.answer)
    ) {
      indepthResponse = await InterviewXPersonaSingleInterviewRequest(
        {
          business_analysis_data: businessAnalysis,
          question: indepthInterview.question,
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
          last_interview: indepthLastInterview,
        },
        isLoggedIn
      );
      retryCountIndepth++;
    }

    if (retryCountIndepth >= maxRetries) {
      setShowErrorPopup(true);
      setIsGeneratingIndepth(false);
      setIsGeneratingIndepthQuestion(false);
      return;
    }

    // 답변 생성 완료되면 업데이트 (이미 질문은 업데이트된 상태)
    if (
      indepthResponse &&
      indepthResponse.response &&
      indepthResponse.response.answer
    ) {
      setIndepthInterviews((prev) => ({
        ...prev,
        [currentQuestionIndex]: {
          question: indepthInterview.question,
          answer: indepthResponse.response.answer,
        },
      }));
      setInterviewData((prev) => {
        const newData = [...(prev || [])];
        const existingEntry = newData[currentQuestionIndex] || {};
        newData[currentQuestionIndex] = {
          ...existingEntry,
          indepth: {
            question: indepthInterview.question,
            answer: indepthResponse.response.answer,
          },
        };
        return newData;
      });
      setInterviewDataState((prev) => {
        const newData = [...(prev || [])];
        const existingEntry = newData[currentQuestionIndex] || {};
        newData[currentQuestionIndex] = {
          ...existingEntry,
          indepth: {
            question: indepthInterview.question,
            answer: indepthResponse.response.answer,
          },
        };
        return newData;
      });
    }
    setIsGeneratingIndepth(false);
  }

  // 스크롤 가능한지와 현재 스크롤 위치 확인하는 함수
  const checkScrollPosition = () => {
    if (!contentsRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = contentsRef.current;

    // 스크롤이 필요한지 확인 (콘텐츠가 화면보다 큰지)
    const needsScroll = scrollHeight > clientHeight;
    setHasScroll(needsScroll);

    // 스크롤 위치 확인 (상단에 있는지)
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;

    // 스크롤이 필요하고 상단에 있을 때만 버튼 표시
    if (needsScroll && !isAtBottom) {
      setShowScrollButton(true);
    } else if (isAtBottom || !needsScroll) {
      setShowScrollButton(false);
    }
  };

  // 스크롤 이벤트 및 콘텐츠 변경 시 스크롤 체크
  useEffect(() => {
    const contentElement = contentsRef.current;
    if (contentElement) {
      // 초기 로드 및 업데이트 시 스크롤 체크
      checkScrollPosition();

      // 스크롤 이벤트 리스너
      contentElement.addEventListener("scroll", checkScrollPosition);

      // 창 크기 변경 시에도 스크롤 체크
      window.addEventListener("resize", checkScrollPosition);

      return () => {
        contentElement.removeEventListener("scroll", checkScrollPosition);
        window.addEventListener("resize", checkScrollPosition);
      };
    }
  }, [interviewDataState, interviewStatus]);

  // 새 문항이 추가되었는지 감지
  useEffect(() => {
    // 모든 콘텐츠가 로딩 완료되었는지 확인
    const allComplete =
      interviewStatus.length > 0 &&
      interviewStatus.every((status) => status === "Complete");

    if (allComplete) {
      setAllContentLoaded(true);
    }

    // 새 메시지가 추가되었는지 확인
    if (!isLoadingPrepare && interviewDataState.length > prevInterviewDataLength) {
  
      // 스크롤이 있고 사용자가 상단에 위치할 때만 애니메이션 표시
      if (hasScroll && showScrollButton) {
        // 기존 애니메이션이 있다면 제거 후 재설정
        setIsNewContentAdded(false);

        // 약간의 딜레이 후 애니메이션 트리거
        setTimeout(() => {
          setIsNewContentAdded(true);

          // 애니메이션 완료 후 상태 리셋 (버튼은 계속 유지)
          setTimeout(() => {
            setIsNewContentAdded(false);
          }, 2100);
        }, 50);
      }

      setPrevInterviewDataLength(interviewDataState.length);

      // 콘텐츠가 변경되었으므로 스크롤 상태 다시 확인
      checkScrollPosition();
    }
  }, [
    interviewDataState.length,
    isLoadingPrepare,
    hasScroll,
    showScrollButton,
  ]);

  // 스크롤 버튼 클릭 시 하단으로 이동하는 함수
  const scrollToBottom = () => {
    if (contentsRef.current) {
      contentsRef.current.scrollTo({
        top: contentsRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

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
              {interviewQuestionListState.length > 0 ? (
                interviewQuestionListState.map((item, index) => {
                  const status = interviewStatus[index] || "Pre";
                  return (
                    <QuestionItem
                      key={index}
                      checked={status === "Complete" ? true : item.checked}
                      disabled={status === "Pre"}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        cursor: status !== "Pre" ? "pointer" : "default", // 클릭 가능할 때 커서 변경
                      }}
                      onClick={() =>
                        status !== "Pre" && scrollToQuestion(index)
                      } // 클릭 이벤트 추가
                    >
                      <Sub2 color="gray800">
                        Q{index + 1}. {item.question}
                      </Sub2>
                      <span>
                        {status === "Complete" ? (
                          <img src={images.CheckGreen} alt="완료" />
                        ) : status === "Ing" ? (
                          <span></span>
                        ) : (
                          <span></span>
                        )}
                      </span>
                    </QuestionItem>
                  );
                })
              ) : (
                <Sub2 color="gray800">질문 문항을 불러오는 중입니다.</Sub2>
              )}
            </QuestionList>
          </QuestionListWrap>

          <ChatWrap>
            <Header>
              <Title>
                {projectTotalInfo.projectTitle}의{" "}
                {selectedInterviewPurposeData.title}
                <ColseButton onClick={handleClose} />
              </Title>
              <ul>
                {/* 추가된 부분: 페르소나 정보 표시 */}
                {personaList?.selected?.map((persona) => {
                  return (
                    <li key={persona?._id}>
                      <Thumb>
                        <img
                          src={personaImages[persona.imageKey]}
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
              {/* <LoadingBox Complete>
                <img src={images.CheckCircleFill} alt="완료" />

                <p>
                  페르소나 입장 완료! 인터뷰를 시작하겠습니다
                  <span>지금 시작하기</span>
                </p>
              </LoadingBox> */}

              {/* 대화중단 에러 */}
              {/* <ErrorAnswerItem>
                <strong>앗! 대화가 잠시 중단되었네요</strong>
                <div>
                  <p>
                    잠시 대화가 중단되었어요. 대화를 이어가시려면 아래 '다시
                    이어하기' 버튼을 눌러주세요
                  </p>
                  <Button Small Outline>
                    <img src={images.ArrowClockwise} alt="" />
                    다시 이어하기
                  </Button>
                </div>
              </ErrorAnswerItem> */}

              {isLoadingPrepare &&
                (showRegenerateButton1 ? (
                  <LoadingBox>
                    <MoleculeRecreate
                      Medium
                      onRegenerate={loadInterviewQuestion}
                    />
                  </LoadingBox>
                ) : (
                  <LoadingBox>
                    <Loading>
                      <div />
                      <div />
                      <div />
                    </Loading>
                    <p>
                      페르소나가 인터뷰 룸으로 입장 중이에요
                      <span>잠시만 기다려주세요 ...</span>
                    </p>
                  </LoadingBox>
                ))}

              {!isLoadingPrepare && isComplete
                ? renderInterviewItems()
                : renderInterviewItems()}

              <ChatListWrap>
                {/* {renderInterviewItems()} */}
                {/* 모든 질문이 Complete 상태일 때만 추가 질문 메시지 표시 */}
                {interviewStatus.length > 0 &&
                  interviewStatus.every((status) => status === "Complete") &&
                  countAdditionalQuestion !== 0 && (
                    <ChatItem Add>
                      <ChatBox Moder>
                        <Sub1 color="gray800" align="left">
                          추가로 질문 하실 부분이 있으신가요?
                          <span>({creditAdditionalQuestion} 크레딧 소모)</span>
                        </Sub1>
                      </ChatBox>
                      <ChatAddButton>
                        <label
                          disabled={
                            countAdditionalQuestion === 0 ||
                            selectedRadio !== null
                          }
                          onClick={() => {
                            if (selectedRadio === null) {
                              setSelectedRadio("yes");
                              setInputValue("");
                              setShowRequestPopup(true);
                            }
                          }}
                        >
                          <input
                            type="radio"
                            name="addQuestion"
                            checked={selectedRadio === "yes"}
                            disabled={selectedRadio !== null}
                          />
                          <span>네, 있습니다!</span>
                        </label>

                        <label
                          disabled={selectedRadio !== null}
                          onClick={() => {
                            if (selectedRadio === null) {
                              setSelectedRadio("no");
                              loadInterviewReport();
                            }
                          }}
                        >
                          <input
                            type="radio"
                            name="addQuestion"
                            checked={selectedRadio === "no"}
                            disabled={selectedRadio !== null}
                          />
                          <span>아니요, 괜찮습니다.</span>
                        </label>
                      </ChatAddButton>
                    </ChatItem>
                  )}
              </ChatListWrap>
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

              {/* 스크롤 버튼 - SVG 아이콘 변경 */}
              {(showScrollButton || (isNewContentAdded && hasScroll)) && (
                <ScrollToBottomButton
                  onClick={scrollToBottom}
                  isAnimating={isNewContentAdded}
                  style={{
                    marginBottom: "12px",
                  }}
                >
                  {/* 새로운 SVG 디자인 적용 */}
                  <svg
                    width="16"
                    height="25"
                    viewBox="0 0 16 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.99985 1V23.5M7.99985 23.5L1 16.5M7.99985 23.5L14.9999 16.5"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </ScrollToBottomButton>
              )}
            </Contents>

            <AddQuestion show={showAddQuestion}>
              <AddQuestionTitle>
                {addQuestionLoading ? (
                  <Body1 color="gray800">
                    요청하신 질문의 의도를 분석 중입니다.
                  </Body1>
                ) : (
                  <Body1 color="gray800">
                    요청하신 질문의 의도를 반영하여 아래와 같이 다듬었습니다.
                  </Body1>
                )}
                <Body3 color="gray800">
                  {countAdditionalQuestion}회 사용가능
                </Body3>
              </AddQuestionTitle>

              <ul>
                {addQuestionLoading ? (
                  <>
                    <SkeletonLine width="100%" height="20px" />
                    <SkeletonLine width="100%" height="20px" />
                    <SkeletonLine width="100%" height="20px" />
                    <SkeletonLine width="100%" height="20px" />
                  </>
                ) : (
                  interviewAdditionalQuestion &&
                  Object.entries(interviewAdditionalQuestion)
                    .filter(
                      ([key, value]) =>
                        key.startsWith("moderator_question_") && value !== "0"
                    )
                    .map(([key, value], index) => (
                      <li
                        key={key}
                        onClick={() =>
                          countAdditionalQuestion > 0 &&
                          handleQuestionSelect(index, value)
                        }
                        className={`
                          ${selectedQuestions.includes(index) ? "selected" : ""}
                          ${countAdditionalQuestion === 0 ? "disabled" : ""}
                        `}
                      >
                        <Body3 color="gray800" align="left">
                          Q. {value}
                        </Body3>
                        <div style={{ width: "46px" }}>
                          <Body2 color="gray800" />
                        </div>
                      </li>
                    ))
                )}
              </ul>
            </AddQuestion>
            <ChatFooter>
              <ChatInput>
                <CustomInput
                  Edit
                  type="text"
                  value={inputValue}
                  onKeyPress={handleKeyPress} // 여기에 handleKeyPress 사용
                  onChange={handleInputChange}
                  placeholder="현재 Beta 버전으로 추가 질문이 1회만 가능합니다."
                  disabled={!isInputEnabled}
                  style={{
                    pointerEvents: isInputEnabled ? "auto" : "none",
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddQuestionGenerate}
                  disabled={
                    !isInputEnabled ||
                    !inputValue.trim() ||
                    countAdditionalQuestion === 0 ||
                    addQuestionLoading
                  }
                >
                  <Body1 color="primary">
                    {showAddQuestion ? "재생성" : "질문 생성"}
                  </Body1>
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

export default OrganismToastPopupSingleChat;

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
    font-size: 0.88rem;
    color: ${palette.gray700};
    font-weight: 400;
    line-height: 1.55;
    letter-spacing: -0.42px;
    padding: 4px 12px;
    border-radius: 40px;
    border: 1px solid ${palette.gray700};
    outline: none;
    background: transparent;
    transition: all 0.5s;

    &:hover:not(:disabled) {
      color: ${palette.primary};
      border-color: ${palette.primary};
      background: rgba(34, 111, 255, 0.04);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:hover {
      color: ${palette.white};
      background: ${palette.gray800};
    }

    &[type="button"]:active {
      color: ${palette.primary};
      border-color: ${palette.primary};
      background: rgba(34, 111, 255, 0.04);
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

  button {
    flex-shrink: 0;
    // width: 32px;
    // height: 32px;
    // font-size: 0;
    font-family: "Pretendard", "Poppins";
    font-size: 1rem;
    border: 0;
    // background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='33' height='32' viewBox='0 0 33 32' fill='none'%3E%3Cg clip-path='url(%23clip0_690_5724)'%3E%3Cpath d='M5.64515 11.6483L25.4734 5.18259C26.7812 4.75614 28.0145 6.00577 27.571 7.30785L20.9018 26.8849C20.4086 28.3327 18.39 28.41 17.7875 27.0042L15.036 20.5839C14.7672 19.9567 14.9072 19.229 15.3896 18.7463L20.4659 13.6676C20.8353 13.298 20.8353 12.6989 20.4657 12.3294C20.083 11.9466 19.4625 11.9466 19.0797 12.3294L14.036 17.373C13.5486 17.8605 12.8116 17.9982 12.1811 17.7195L5.488 14.7621C4.08754 14.1433 4.1895 12.123 5.64515 11.6483Z' fill='%23226FFF'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_690_5724'%3E%3Crect width='32' height='32' fill='white' transform='translate(0.5)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")
    //   center no-repeat;
    // background-size: 100%;
    filter: grayscale(1) opacity(0.3);
    transition: all 0.5s;
    background: none;
    cursor: pointer;

    &:disabled {
      // opacity: 0.3;
      opacity: 1;
      cursor: not-allowed;

      // &:hover {
      //   opacity: 0.3;
      // }
    }

    &:not(:disabled):hover {
      // background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='33' height='32' viewBox='0 0 33 32' fill='none'%3E%3Cg clip-path='url(%23clip0_690_5724)'%3E%3Cpath d='M5.64515 11.6483L25.4734 5.18259C26.7812 4.75614 28.0145 6.00577 27.571 7.30785L20.9018 26.8849C20.4086 28.3327 18.39 28.41 17.7875 27.0042L15.036 20.5839C14.7672 19.9567 14.9072 19.229 15.3896 18.7463L20.4659 13.6676C20.8353 13.298 20.8353 12.6989 20.4657 12.3294C20.083 11.9466 19.4625 11.9466 19.0797 12.3294L14.036 17.373C13.5486 17.8605 12.8116 17.9982 12.1811 17.7195L5.488 14.7621C4.08754 14.1433 4.1895 12.123 5.64515 11.6483Z' fill='%23226FFF'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_690_5724'%3E%3Crect width='32' height='32' fill='white' transform='translate(0.5)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")
      //   center no-repeat;
      filter: grayscale(0) opacity(1);
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

// 스타일 컴포넌트 추가 (파일 하단)
const poke = keyframes`
  0%, 100% { transform: translate(-50%, 0); }
  50% { transform: translate(-50%, 5px); }
`;

// 스크롤 버튼 스타일
const ScrollToBottomButton = styled.button`
  position: absolute;
  left: 50%;
  bottom: 80px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  /* 기존 배경색 코드 유지 */
  background: ${(props) => {
    // palette.primary 색상에 불투명도 70% 적용
    const color = palette.gray800;
    if (color.startsWith("#")) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, 0.6)`;
    } else if (color.startsWith("rgb")) {
      return color.replace(/rgba?\(([^)]+)\)/, "rgba($1, 0.7)");
    }
    return color;
  }};

  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s ease;

  /* 애니메이션 적용 */
  animation: ${(props) =>
    props.isAnimating
      ? css`
          ${poke} 0.5s ease-in-out 2
        `
      : "none"};

  /* 호버 효과 수정 - 검은색 80% 불투명도로 */
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  /* SVG 스타일 */
  svg {
    width: 16px;
    height: 25px;
    /* margin-left 제거하거나 필요에 따라 조정 */
  }
`;
