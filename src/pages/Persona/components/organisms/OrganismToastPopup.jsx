//인터뷰룸
import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import images from "../../../../assets/styles/Images";
import PopupWrap from "../../../../assets/styles/Popup";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  IS_LOGGED_IN,
  SELECTED_INTERVIEW_PURPOSE,
  PERSONA_LIST,
  INTERVIEW_QUESTION_LIST,
  PERSONA_BUTTON_STATE_3,
  PROJECT_ID,
  PROJECT_REPORT_ID,
  INTERVIEW_DATA,
  INTERVIEW_REPORT,
  INTERVIEW_REPORT_ADDITIONAL,
  IS_PERSONA_ACCESSIBLE,
  SELECTED_PERSONA_LIST,
  PROJECT_TOTAL_INFO,
  PROJECT_CREATE_INFO,
  PROJECT_SAAS,
  USER_CREDITS,
  CREDIT_CREATE_INTERVIEW,
} from "../../../AtomStates";
import personaImages from "../../../../assets/styles/PersonaImages";
import { updateProjectOnServer } from "../../../../utils/indexedDB";
import { createProjectReportOnServer } from "../../../../utils/indexedDB";
import MoleculeRecreate from "../molecules/MoleculeRecreate";
import { InterviewXPersonaMultipleInterviewGeneratorRequest } from "../../../../utils/indexedDB";
import { InterviewXPersonaMultipleInterviewRequest } from "../../../../utils/indexedDB";
import { InterviewXInterviewReportRequest } from "../../../../utils/indexedDB";
import { InterviewXInterviewReportAdditionalRequest } from "../../../../utils/indexedDB";
import { UserCreditUse, UserCreditInfo } from "../../../../utils/indexedDB";

const OrganismToastPopup = ({ isActive, onClose, isComplete }) => {
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const project = projectSaas;
  const [selectedPersonaList, setSelectedPersonaList] = useAtom(
    SELECTED_PERSONA_LIST
  );
  const [, setReportId] = useAtom(PROJECT_REPORT_ID);
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [creditCreateInterview] = useAtom(CREDIT_CREATE_INTERVIEW);
  const [, setIsPersonaAccessible] = useAtom(IS_PERSONA_ACCESSIBLE);
  const [, setInterviewReport] = useAtom(INTERVIEW_REPORT);
  const [, setInterviewReportAdditional] = useAtom(INTERVIEW_REPORT_ADDITIONAL);
  const [interviewData, setInterviewData] = useAtom(INTERVIEW_DATA);
  const [projectId] = useAtom(PROJECT_ID);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [personaButtonState3, setPersonaButtonState3] = useAtom(
    PERSONA_BUTTON_STATE_3
  );
  const [selectedInterviewPurpose] = useAtom(SELECTED_INTERVIEW_PURPOSE);
  const [personaList] = useAtom(PERSONA_LIST);
  const [interviewQuestionList, setInterviewQuestionList] = useAtom(
    INTERVIEW_QUESTION_LIST
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
  const [interviewStatus, setInterviewStatus] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [regenerateCount1, setRegenerateCount1] = useState(0);
  const [regenerateCount2, setRegenerateCount2] = useState(0);
  const [showRegenerateButton1, setShowRegenerateButton1] = useState(false);
  const [showRegenerateButton2, setShowRegenerateButton2] = useState(false);

  //저장되었던 인터뷰 로드
  useEffect(() => {
    const interviewLoading = async () => {
      // 인터뷰 스크립트 보기, 인터뷰 상세보기로 진입 시 isComplete는 True
      if (isComplete) {
        const questions = interviewData.map((item) => ({
          question: item.question_1 || item.question_2 || item.question_3,
        }));
        setInterviewQuestionListState(questions);
        // 모든 질문을 Complete 상태로 설정
        const completedStatus = new Array(interviewData.length).fill(
          "Complete"
        );
        setInterviewStatus(completedStatus);

        const newAnswers = {};

        questions.forEach((_, index) => {
          const answers = interviewData[index][`answer_${index + 1}`];
          newAnswers[index] = (
            selectedPersonaList.length
              ? selectedPersonaList
              : personaList.selected
          ).map((persona, pIndex) => {
            // profile 문자열에서 정보 추출

            const age = persona.age;
            const gender = persona.gender;
            const job = persona.job;

            return {
              persona: persona,
              imageKey: persona.imageKey,
              gender: gender,
              age: age,
              job: job,
              answer: answers[pIndex],
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
        const existingQuestions = interviewQuestionList.find(
          (item) => item.theory_name === selectedInterviewPurpose
        );

        if (existingQuestions) {
          // 이미 질문이 생성된 상태하면 상태값 설정 후 5초 대기
          setInterviewQuestionListState(existingQuestions.questions.slice(2));
          await new Promise((resolve) => setTimeout(resolve, 5000));
          setIsLoadingPrepare(false);
          setInterviewStatus(["Pre", "Pre", "Pre"]);
        } else {
          // 생성된 질문이 없다면 API 요청
          let data = {
            business_idea: projectTotalInfo.projectTitle,
            business_analysis_data: projectCreateInfo,
            theory_name: selectedInterviewPurpose,
          };

          let response =
            await InterviewXPersonaMultipleInterviewGeneratorRequest(
              data,
              isLoggedIn
            );
          let questionList = response.response; //응답 반환하는 부분 (질문 받아옴)
          let retryCount = 0;
          const maxRetries = 10;

          while (
            retryCount < maxRetries &&
            (!response || !response.response || response.response.length !== 5)
          ) {
            response = await InterviewXPersonaMultipleInterviewGeneratorRequest(
              data,
              isLoggedIn
            );

            retryCount++;
            questionList = response.response;
          }

          if (retryCount >= maxRetries) {
            setShowErrorPopup(true);
            return;
          }

          const newQuestionList = [
            ...interviewQuestionList,
            {
              theory_name: selectedInterviewPurpose,
              questions: questionList,
            },
          ];

          setInterviewQuestionList(newQuestionList);
          setInterviewQuestionListState(questionList.slice(2));

          setPersonaButtonState3(0);
          setIsLoadingPrepare(false);
          const initialStatus = new Array(questionList.slice(2).length).fill(
            "Pre"
          );
          setInterviewStatus(initialStatus);

          await updateProjectOnServer(
            projectId,
            {
              interviewQuestionList: newQuestionList,
            },
            isLoggedIn
          );
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
        // console.error("Error details:", error);
      }
    }
  };

  // 결과 보고서 생성 함수
  const loadInterviewReport = async (personaInfoState, allAnswers) => {
    setShowRegenerateButton2(false);
    try {
      setIsAnalyzing(true);
      const finalData1 = {
        business_idea: projectCreateInfo,
        persona_info: personaInfoState,
        interview_data: [
          ...interviewData,
          {
            [`question_${currentQuestionIndex + 1}`]:
              interviewQuestionListState[currentQuestionIndex].question,
            [`answer_${currentQuestionIndex + 1}`]: allAnswers,
          },
        ],
        theory_type: selectedInterviewPurpose,
      };

      let response;
      let retryCount = 0;
      const maxRetries = 10;

      while (retryCount < maxRetries) {
        // 인터뷰 결과 보고서 요청 API  수정 예정
        response = await InterviewXInterviewReportRequest(
          finalData1,
          isLoggedIn
        );

        // 응답 데이터가 유효한지 확인
        if (
          response &&
          response.response &&
          response.response.length > 0 &&
          response.response[0].title &&
          response.response[0].text
        ) {
          break;
        }

        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      if (retryCount >= maxRetries) {
        setShowErrorPopup(true);
        return;
      }

      setInterviewReport(response.response);

      const finalData2 = {
        business_idea: projectCreateInfo,
        persona_info: personaInfoState,
        report_data: response.response,
        interview_data: [
          ...interviewData,
          {
            [`question_${currentQuestionIndex + 1}`]:
              interviewQuestionListState[currentQuestionIndex].question,
            [`answer_${currentQuestionIndex + 1}`]: allAnswers,
          },
        ],
        theory_type: selectedInterviewPurpose,
      };

      let responseReportAdditional;
      retryCount = 0;

      while (retryCount < maxRetries) {
        //인터뷰 결과 추가 보고서 요청 수정 예정
        responseReportAdditional =
          await InterviewXInterviewReportAdditionalRequest(
            finalData2,
            isLoggedIn
          );

        // 응답 데이터의 유효성 검사

        if (
          responseReportAdditional &&
          responseReportAdditional.response &&
          responseReportAdditional.response.title &&
          responseReportAdditional.response.suggestion_list &&
          responseReportAdditional.response.suggestion_list.length === 5 &&
          responseReportAdditional.response.suggestion_list.every(
            (item) =>
              (item.title &&
                item.title_text &&
                item.description_text &&
                item.title === "브랜드 강화 관점") ||
              item.title === "타겟팅 관점" ||
              item.title === "세그먼트화 관점" ||
              item.title === "사업 전략 관점" ||
              item.title === "고객 경험 개선 관점" ||
              item.title === "성장 전략 관점" ||
              item.title === "비즈니스 모델 캔버스 관점"
          )
        ) {
          break;
        }

        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 대기
      }

      if (retryCount >= maxRetries) {
        setShowErrorPopup(true);
        return;
      }

      setInterviewReportAdditional(responseReportAdditional.response);

      if (response.response && responseReportAdditional.response) {
        setIsAnalyzing(false);
        setIsAnalysisComplete(true);
        // 필요한 경우 분석 결과 저장
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowErrorPopup(true);
            break;
          case 504:
            if (regenerateCount2 >= 3) {
              setShowErrorPopup(true);
              return;
            } else {
              setShowRegenerateButton2(true);
              setRegenerateCount2(regenerateCount2 + 1);
            }
            break;
          default:
            setShowErrorPopup(true);
            break;
        }
        // console.error("Error details:", error);
      }
    }
  };

  let allAnswers = [];
  let personaInfoState = [];

  useEffect(() => {
    // 인터뷰 진행 함수
    const processInterview = async () => {
      if (
        !isLoadingPrepare &&
        interviewStatus[currentQuestionIndex] === "Pre"
      ) {
        const newStatus = [...interviewStatus];
        newStatus[currentQuestionIndex] = "Ing";
        setInterviewStatus(newStatus);

        setAnswers((prev) => ({
          ...prev,
          [currentQuestionIndex]: [],
        }));

        try {
          allAnswers = [];
          personaInfoState = [];

          // 선택된 페르소나 수 만큼 반복
          for (let i = 0; i < personaList.selected.length; i++) {
            setIsGenerating(true);

            // 현재 페르소나의 이전 답변들 수집(저장):  AI가 답변을 생성할때 맥락 정보로 활용
            const lastInterview = [];
            // 현재 질문 이전 질문들 수집
            for (let q = 0; q < currentQuestionIndex; q++) {
              //각 질문에 대해서 answers 배열에서 해당 질문의 답변들을 찾음
              const questionAnswers = answers[q] || [];
              //페르소나 매칭
              const personaAnswer = questionAnswers.find(
                (ans) =>
                  ans.persona.personIndex ===
                  personaList.selected[i].personIndex
              );
              if (personaAnswer) {
                //찾은 답변이 있다면 질문과 답변을 쌍으로 배열에 추가
                lastInterview.push({
                  question: interviewQuestionListState[q].question,
                  answer: personaAnswer.answer,
                });
              }
            }

            const personaInfo = {
              id: `saas_${personaList.selected[i]._id}`,
              name: personaList.selected[i].personaName,
              keyword: personaList.selected[i].keywords,
              lifestyle: personaList.selected[i].lifestyle,
              characteristics: personaList.selected[i].personaCharacteristics,
              consumption_pattern: personaList.selected[i].consumptionPattern,
              personaType: personaList.selected[i].personaType,
              typeIndex: personaList.selected[i].type,
              request_persona_type: "saas",
            };

            //수집된 답변들 api요청에 포함
            const data = {
              business_analysis_data: projectTotalInfo,
              question: interviewQuestionListState[currentQuestionIndex],
              persona_info: personaInfo,
              last_interview: lastInterview,
            };

            let response = await InterviewXPersonaMultipleInterviewRequest(
              data,
              isLoggedIn
            );

            let retryCount = 0;
            const maxRetries = 10;

            // //에러시 실행
            while (
              retryCount < maxRetries &&
              (!response.response ||
                !response.response.hasOwnProperty("answer") ||
                !response.response.answer)
            ) {
              response = await InterviewXPersonaMultipleInterviewRequest(
                data,
                isLoggedIn
              );
              retryCount++;
            }

            if (retryCount >= maxRetries) {
              setShowErrorPopup(true);
              return;
            }

            setIsGenerating(false);
            allAnswers.push(response.response.answer);

            personaInfoState.push(personaInfo);

            //페르소나 정보 처리 (나이, 성별, 직업 정보 추출 )

            const age = personaList.selected[i].age;
            const gender = personaList.selected[i].gender;
            const job = personaList.selected[i].job;

            //답변 상태 업데이트 ( 현재 질문에 대한 각 페르소나의 답변 저장 )
            //각 질문에 대해 모든 페르소나의 답변을 받고 나서야 다음 질문으로 넘어
            setAnswers((prev) => ({
              ...prev,
              [currentQuestionIndex]: [
                ...prev[currentQuestionIndex],
                {
                  persona: personaList.selected[i],
                  gender: gender,
                  age: age,
                  job: job,
                  answer: response.response.answer,
                },
              ],
            }));

            // 한 질문에 대한 모든 페르소나의 답변이 완료되면 interviewData 업데이트
            if (i === personaList.selected.length - 1) {
              setInterviewData((prev) => {
                const newData = [...(prev || [])];
                newData[currentQuestionIndex] = {
                  [`question_${currentQuestionIndex + 1}`]:
                    interviewQuestionListState[currentQuestionIndex].question,
                  [`answer_${currentQuestionIndex + 1}`]: allAnswers,
                };
                return newData;
              });

              newStatus[currentQuestionIndex] = "Complete";
              setInterviewStatus(newStatus); // 해당 질문 완료로 업데이트

              // 모든 인터뷰가 완료되었는지 확인
              const allComplete = newStatus.every(
                (status) => status === "Complete"
              );
              if (allComplete) {
                loadInterviewReport(personaInfoState, allAnswers); // 결과 보고서 생성 함수 호출
              }

              if (
                currentQuestionIndex <
                interviewQuestionListState.length - 1
              ) {
                setCurrentQuestionIndex((prev) => prev + 1);
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
                setShowErrorPopup(true);
                break;
              default:
                setShowErrorPopup(true);
                break;
            }
            // console.error("Error details:", error);
          }
          setIsGenerating(false);
        }
      }
    };

    processInterview();
    // 인터뷰 준비완료, 다음 질문 세팅, 인터뷰 상태 변경 시 마다 useEffect 실행
  }, [isLoadingPrepare, currentQuestionIndex, interviewStatus]);

  const renderAnswers = (questionIndex) => {
    const questionAnswers = answers[questionIndex] || [];

    return (
      <>
        {questionAnswers.map((answer, index) => (
          <AnswerItem key={index}>
            <TypeName>
              <Thumb>
                <img
                  src={personaImages[answer.persona.imageKey]}
                  alt={answer.persona.persona}
                />
              </Thumb>

              <div>
                {answer.persona.request_persona_type
                  ? answer.persona.personaName
                  : answer.persona.personaName}
                <p>
                  <span>{answer.gender}</span>
                  <span>
                    {answer.age.includes("세") ? answer.age : `${answer.age}세`}
                  </span>
                  <span>{answer.job}</span>
                </p>
              </div>
            </TypeName>
            <TextContainer>{answer.answer}</TextContainer>
          </AnswerItem>
        ))}
        {isGenerating && interviewStatus[questionIndex] === "Ing" && (
          <AnswerItem>
            <TypeName>
              <Thumb>
                <img
                  src={
                    personaImages[
                      personaList.selected[questionAnswers.length].imageKey
                    ]
                  }
                  alt={personaList.selected[questionAnswers.length].persona}
                />
              </Thumb>
              <div>
                {personaList.selected[questionAnswers.length].persona}
                <p>
                  <span>
                    {personaList.selected[questionAnswers.length].gender}
                  </span>
                  <span>
                    {personaList.selected[questionAnswers.length].age.includes(
                      "세"
                    )
                      ? personaList.selected[questionAnswers.length].age
                      : `${personaList.selected[questionAnswers.length].age}세`}
                  </span>
                  <span>
                    {personaList.selected[questionAnswers.length].job}
                  </span>
                </p>
              </div>
            </TypeName>
            <TextContainer>
              <Entering />
            </TextContainer>
          </AnswerItem>
        )}
      </>
    );
  };

  const renderAnswersComplete = (questionIndex) => {
    const questionAnswers = answers[questionIndex] || [];

    return (
      <>
        {questionAnswers.map((answer, index) => (
          <AnswerItem key={index}>
            <TypeName>
              <Thumb>
                <img
                  src={personaImages[answer.persona.imageKey]}
                  alt={answer.persona.persona}
                />
              </Thumb>
              <div>
                {answer.persona.request_persona_type
                  ? answer.persona.personaName
                  : answer.persona.personaName}
                <p>
                  <span>{answer.gender}</span>
                  <span>
                    {answer.age.includes("세") ? answer.age : `${answer.age}세`}
                  </span>
                  <span>{answer.job}</span>
                </p>
              </div>
            </TypeName>
            <TextContainer>{answer.answer}</TextContainer>
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

  // 인터뷰를 진행할 때 사용
  const renderInterviewItems = () => {
    return interviewQuestionListState.map((item, index) => (
      <InterviewItem key={index} status={interviewStatus[index] || "Pre"}>
        <QuestionWrap
          onClick={() => handleAnswerToggle(index)}
          status={interviewStatus[index] || "Pre"}
          $isOpen={visibleAnswers[index]}
        >
          <Status status={interviewStatus[index] || "Pre"}>
            {interviewStatus[index] === "Ing"
              ? "진행 중"
              : interviewStatus[index] === "Complete"
              ? "완료"
              : "준비 중"}
          </Status>
          <QuestionText>
            Q{index + 1}. {item.question}
          </QuestionText>
        </QuestionWrap>
        {visibleAnswers[index] && (
          <AnswerWrap>{renderAnswers(index)}</AnswerWrap>
        )}
      </InterviewItem>
    ));
  };

  // 이미 완료된 인터뷰를 확인할 때 사용 ex)인터뷰 스크립트 보기, 인터뷰 상세보기
  const renderInterviewItemsComplete = () => {
    return interviewQuestionListState.map((item, index) => (
      <InterviewItem key={index} status={"Complete"}>
        <QuestionWrap
          onClick={() => handleAnswerToggle(index)}
          status={"Complete"}
          style={{ cursor: "pointer" }}
          isOpen={visibleAnswers[index]}
        >
          <Status status={"Complete"}>완료</Status>
          <QuestionText>
            Q{index + 1}. {item.question}
          </QuestionText>
        </QuestionWrap>
        {visibleAnswers[index] && (
          <AnswerWrap>{renderAnswersComplete(index)}</AnswerWrap>
        )}
      </InterviewItem>
    ));
  };

  const handleCheckResult = async () => {
    setActive(false);
    if (onClose) {
      onClose();
    }
    setIsPersonaAccessible(true);
    try {
      // 인터뷰 완료 후 결과 저장하기 위해 새로운 리포트 생성 (나중에 리포트 조회)
      let newReportId = await createProjectReportOnServer(
        project._id,
        "interviewGroup"
      );
      setReportId(newReportId); // 생성된 대화 ID 설정

      const creditUsePayload = {
        title: project.projectTitle,
        service_type: "그룹 인터뷰 룸",
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
    setSelectedPersonaList(personaList.selected);
    navigate(`/Persona/4`, { replace: true });
  };

  return (
    <>
      <PopupBox isActive={active}>
        <ToastPopup isActive={active}>
          <Header>
            <Title>
              {projectTotalInfo.projectTitle}의 {selectedInterviewPurpose}
              <ColseButton onClick={handleClose} />
            </Title>
            <ul>
              <li>
                <span>
                  <img src={images.FileText} alt="문항수" />
                  문항수
                </span>
                <span>3개</span>
              </li>
              <li>
                <span>
                  <img src={images.PeopleFill} alt="참여 페르소나" />
                  참여 페르소나
                </span>
                <span>
                  {personaList.selected.length || selectedPersonaList.length}명
                </span>
              </li>
            </ul>
          </Header>

          <Contents>
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
                  잠시 대화가 중단되었어요. 대화를 이어가시려면 아래 ‘다시
                  이어하기’ 버튼을 눌러주세요
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
              ? renderInterviewItemsComplete()
              : renderInterviewItems()}

            {isAnalyzing &&
              (showRegenerateButton2 ? (
                <ErrorInterviewItem>
                  <p>
                    분석 중 오류가 발생했어요
                    <br />
                    지금 나가시면 인터뷰 내용이 저장되지 않으니, 다시
                    시도해주세요
                  </p>
                  <Button
                    Small
                    Outline
                    onClick={() =>
                      loadInterviewReport(personaInfoState, allAnswers)
                    }
                  >
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

export default OrganismToastPopup;

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

const QuestionWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;
  cursor: inherit;
  position: relative;
  padding-right: 56px;
  cursor: ${(props) => (props.status === "Complete" ? "pointer" : "default")};

  ${(props) =>
    props.status === "Complete" &&
    css`
      &:after {
        content: "";
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
        width: 8px;
        height: 8px;
        border-right: 2px solid ${palette.gray500};
        border-bottom: 2px solid ${palette.gray500};
        transition: transform 0.3s ease;
      }
    `}

  ${(props) =>
    props.status === "Complete" &&
    props.isOpen &&
    css`
      &:after {
        transform: translateY(-50%) rotate(225deg);
      }
    `}
`;

const Number = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${(props) =>
    props.status === "Ing"
      ? palette.primary
      : props.status === "Complete"
      ? palette.green
      : palette.gray300};
  border-radius: 2px;
  border: 1px solid
    ${(props) =>
      props.status === "Ing"
        ? palette.primary
        : props.status === "Complete"
        ? palette.green
        : palette.gray300};
  background: ${palette.chatGray};
`;

const QuestionText = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;
`;

const Status = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  gap: 8px;
  max-width: 55px;
  width: 100%;
  font-size: 0.75rem;
  line-height: 1.5;
  color: ${(props) =>
    props.status === "Ing"
      ? palette.primary
      : props.status === "Complete"
      ? palette.green
      : palette.gray700};
  // margin-left: auto;
  padding: 2px 8px;
  border-radius: 2px;
  border: ${(props) =>
    props.status === "Ing"
      ? `1px solid ${palette.primary}`
      : props.status === "Complete"
      ? `1px solid ${palette.green}`
      : `1px solid ${palette.outlineGray}`};
  background: ${(props) =>
    props.status === "Ing"
      ? `rgba(34, 111, 255, 0.04)`
      : props.status === "Complete"
      ? palette.white
      : palette.chatGray};

  ${(props) =>
    props.status === "Complete" &&
    css`
      &:before {
        content: "";
        width: 8px;
        height: 8px;
        background: url(${images.CheckGreen}) center no-repeat;
        background-size: contain;
      }
    `}
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
  border-top: 1px solid ${palette.outlineGray};
`;

const AnswerItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  width: 100%;
`;

const ErrorAnswerItem = styled(AnswerItem)`
  align-items: flex-start;
  margin-top: 24px;
  padding: 20px;
  border-radius: 15px;
  border: 1px solid ${palette.error};
  background: rgba(255, 59, 48, 0.06);

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${palette.error};

    &:before {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      background: url(${images.ExclamationCircleFill}) center no-repeat;
      background-size: 100%;
      content: "";
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-left: 28px;
  }

  p {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray700};
  }

  button {
    font-size: 0.875rem;
    color: ${palette.gray800};
    border-radius: 8px;
    border: 1px solid ${palette.gray500};
  }
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
    box-shadow: 12px 0 ${palette.gray500}, -12px 0 ${palette.gray300};
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
