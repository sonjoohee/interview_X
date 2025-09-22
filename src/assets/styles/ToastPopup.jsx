import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { palette } from "./Palette";
import images from "./Images";
import PopupWrap from "./Popup";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  IS_LOGGED_IN,
  PERSONA_STEP,
  SELECTED_INTERVIEW_PURPOSE,
  PERSONA_LIST,
  INTERVIEW_QUESTION_LIST,
  PERSONA_BUTTON_STATE_3,
  BUSINESS_ANALYSIS,
  PROJECT_ID,
  INTERVIEW_DATA,
  INTERVIEW_REPORT,
  INTERVIEW_REPORT_ADDITIONAL
} from "../../pages/AtomStates";
import { updateProjectOnServer } from "../../utils/indexedDB";
import { InterviewXPersonaBusinessInterviewModuleRequest } from "../../utils/indexedDB";
import { InterviewXPersonaInterviewModeratorRequest } from "../../utils/indexedDB";
import { InterviewXInterviewReportRequest } from "../../utils/indexedDB";
import { InterviewXInterviewReportAdditionalRequest } from "../../utils/indexedDB";
const ToastPopupWrap = ({ isActive, onClose }) => {

  const [, setInterviewReport] = useAtom(INTERVIEW_REPORT);
  const [, setInterviewReportAdditional] = useAtom(INTERVIEW_REPORT_ADDITIONAL);
  const [interviewData, setInterviewData] = useAtom(INTERVIEW_DATA);
  const [projectId, ] = useAtom(PROJECT_ID);
  const [isLoggedIn, ] = useAtom(IS_LOGGED_IN);
  const [personaButtonState3, setPersonaButtonState3] = useAtom(PERSONA_BUTTON_STATE_3);
  const [selectedInterviewPurpose, ] = useAtom(SELECTED_INTERVIEW_PURPOSE);
  const [personaList, ] = useAtom(PERSONA_LIST);
  const [interviewQuestionList, setInterviewQuestionList] = useAtom(INTERVIEW_QUESTION_LIST);
  const [businessAnalysis, ] = useAtom(BUSINESS_ANALYSIS);
  
  const navigate = useNavigate();

  const [active, setActive] = useState(isActive);
  const [showWarning, setShowWarning] = useState(false);
  const [isLoadingPrepare, setIsLoadingPrepare] = useState(true);
  const [interviewQuestionListState, setInterviewQuestionListState] = useState([]);
  const [interviewStatus, setInterviewStatus] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);

  useEffect(() => {
    const interviewLoading = async () => {
      try {
        if (personaButtonState3 === 1) {
          const existingQuestions = interviewQuestionList.find(
            (item) => item.theory_name === selectedInterviewPurpose
          );
      
          if (existingQuestions) {
            setInterviewQuestionListState(existingQuestions.questions.slice(2));
            await new Promise(resolve => setTimeout(resolve, 5000));
          } else {
            let data = {
              business_idea: businessAnalysis.input,
              business_analysis_data: {
                title: businessAnalysis.title,
                characteristics: businessAnalysis.characteristics,
                features: businessAnalysis.features,
              },
              theory_name: selectedInterviewPurpose,
            };

             // 페르소나 인터뷰 생성 API  수정 예정
            let response = await InterviewXPersonaInterviewModeratorRequest(data, isLoggedIn);
      
            let questionList = response.response;
            let retryCount = 0;
            const maxRetries = 10;
      
            while (
              retryCount < maxRetries &&
              (!response || !response.response || response.response.length !== 5)
            ) {
            
               //페르소나 인터뷰 생성 API  수정 예정
               let response = await InterviewXPersonaInterviewModeratorRequest(data, isLoggedIn);
              retryCount++;
              questionList = response.response;
            }

            if (retryCount === maxRetries) {
              throw new Error("Maximum retry attempts reached.");
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
        console.error(error);
      } finally {
        setPersonaButtonState3(0);
        setIsLoadingPrepare(false);
        const initialStatus = new Array(interviewQuestionListState.length).fill('Pre');
        setInterviewStatus(initialStatus);
      }
    }
    interviewLoading();
  }, [personaButtonState3]);

  useEffect(() => {
    const processInterview = async () => {
      if (!isLoadingPrepare && interviewStatus[currentQuestionIndex] === 'Pre') {
        const newStatus = [...interviewStatus];
        newStatus[currentQuestionIndex] = 'Ing';
        setInterviewStatus(newStatus);

        setAnswers(prev => ({
          ...prev,
          [currentQuestionIndex]: []
        }));

        try {
          let allAnswers = [];
          let personaInfoState = [];

          for (let i = 0; i < personaList.selected.length; i++) {
            setIsGenerating(true);
            
            // 현재 페르소나의 이전 답변들 수집
            const lastInterview = [];
            for (let q = 0; q < currentQuestionIndex; q++) {
              const questionAnswers = answers[q] || [];
              const personaAnswer = questionAnswers.find(
                ans => ans.persona.personIndex === personaList.selected[i].personIndex
              );
              if (personaAnswer) {
                lastInterview.push({
                  question: interviewQuestionListState[q].question,
                  answer: personaAnswer.answer
                });
              }
            }

            const personaInfo = {
              "id": personaList.selected[i].personIndex.replace(/[^1-9]/g, ''),
              "name": personaList.selected[i].persona,
              "keyword": personaList.selected[i].keyword,
              "hashtag": personaList.selected[i].tag,
              "summary": personaList.selected[i].summary
            };
            
            const data = {
              business_analysis_data: businessAnalysis,
              question: interviewQuestionListState[currentQuestionIndex],
              persona_info: personaInfo,
              last_interview: lastInterview
            };

            // 페르소나 인터뷰 수행(단건) API  수정 예정
            let response = await InterviewXPersonaBusinessInterviewModuleRequest(data, isLoggedIn);

            setIsGenerating(false);
            allAnswers.push(response.response.answer);

            personaInfoState.push(personaInfo);

            setAnswers(prev => ({
              ...prev,
              [currentQuestionIndex]: [ 
                ...prev[currentQuestionIndex],
                {
                  persona: personaList.selected[i],
                  answer: response.response.answer
                }
              ]
            }));

            if (i === personaList.selected.length - 1) {
              // 모든 페르소나의 답변이 완료되면 interviewData 업데이트
              setInterviewData(prev => {
                const newData = [...(prev || [])];
                newData[currentQuestionIndex] = {
                  [`question_${currentQuestionIndex + 1}`]: interviewQuestionListState[currentQuestionIndex].question,
                  [`answer_${currentQuestionIndex + 1}`]: allAnswers
                };
                return newData;
              });

              newStatus[currentQuestionIndex] = 'Complete';
              setInterviewStatus(newStatus);
              
              // 모든 인터뷰가 완료되었는지 확인
              const allComplete = newStatus.every(status => status === 'Complete');
              if (allComplete) {
                try {

                  await updateProjectOnServer(
                    projectId,
                    {
                      interviewData: [
                        ...interviewData,
                        {
                          [`question_${currentQuestionIndex + 1}`]: interviewQuestionListState[currentQuestionIndex].question,
                          [`answer_${currentQuestionIndex + 1}`]: allAnswers
                        }
                      ],
                    },
                    isLoggedIn
                  );

                  setIsAnalyzing(true);
                  const finalData1 = {
                    business_idea: businessAnalysis,
                    persona_info: personaInfoState,
                    interview_data: [
                      ...interviewData,
                      {
                        [`question_${currentQuestionIndex + 1}`]: interviewQuestionListState[currentQuestionIndex].question,
                        [`answer_${currentQuestionIndex + 1}`]: allAnswers
                      }
                    ],
                    theory_type: selectedInterviewPurpose
                  };

                  // 인터뷰 결과 보고서 요청 API  수정 예정
                  const response = await InterviewXInterviewReportRequest(data, isLoggedIn);

                  setInterviewReport(response.response);

                  const finalData2 = {
                    business_idea: businessAnalysis,
                    persona_info: personaInfoState,
                    report_data: response.response,
                    interview_data: [
                      ...interviewData,
                      {
                        [`question_${currentQuestionIndex + 1}`]: interviewQuestionListState[currentQuestionIndex].question,
                        [`answer_${currentQuestionIndex + 1}`]: allAnswers
                      }
                    ],
                    theory_type: selectedInterviewPurpose
                  };

                  //인터뷰 결과 추가 보고서 요청 수정 예정
                  const responseReportAdditional = await InterviewXInterviewReportAdditionalRequest(data, isLoggedIn);

                  setInterviewReportAdditional(responseReportAdditional.response);

                  if (response.response && responseReportAdditional.response) {
                    setIsAnalyzing(false);
                    setIsAnalysisComplete(true);
                    // 필요한 경우 분석 결과 저장
                  }
                } catch (error) {
                  console.error('Analysis error:', error);
                  setIsAnalyzing(false);
                }
              }

              if (currentQuestionIndex < interviewQuestionListState.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
              }
            }
          }
        } catch (error) {
          console.error('Interview process error:', error);
          setIsGenerating(false);
        }
      }
    };

    processInterview();
  }, [isLoadingPrepare, currentQuestionIndex, interviewStatus]);

  const renderAnswers = (questionIndex) => {
    const questionAnswers = answers[questionIndex] || [];
    
    return (
      <>
        {questionAnswers.map((answer, index) => (
          <AnswerItem key={index}>
            <TypeName>
              <Thumb />
              {answer.persona.persona}
            </TypeName>
            <TextContainer>
              {answer.answer}
            </TextContainer>
          </AnswerItem>
        ))}
        {isGenerating && interviewStatus[questionIndex] === 'Ing' && (
          <AnswerItem>
            <TypeName>
              <Thumb />
              {personaList.selected[questionAnswers.length].persona}
            </TypeName>
            <TextContainer>
              <Entering />
            </TextContainer>
          </AnswerItem>
        )}
      </>
    );
  };

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  const handleClose = () => {
    setShowWarning(true);
  };

  const handleWarningClose = () => {
    setIsLoadingPrepare(true);
    setShowWarning(false);
    setActive(false);
    if (onClose) {
      onClose();
    }
  };

  const handleWarningContinue = () => {
    setShowWarning(false);
  };

  useEffect(() => {
    setVisibleAnswers(prev => {
      const newVisibleAnswers = { ...prev };
      interviewStatus.forEach(async (status, index) => {
        // 진행중인 질문은 자동으로 열기
        if (status === 'Ing') {
          newVisibleAnswers[index] = true;
        }
        // 완료된 질문은 자동으로 닫기
        else if (status === 'Complete') {
          await new Promise(resolve => setTimeout(resolve, 5000));
          newVisibleAnswers[index] = false;
        }
      });
      return newVisibleAnswers;
    });
  }, [interviewStatus]);

  const handleAnswerToggle = (index) => {
    // 'Pre' 상태일 때는 토글 불가능
    if (interviewStatus[index] === 'Pre') return;
    
    setVisibleAnswers(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const renderInterviewItems = () => {
    return interviewQuestionListState.map((item, index) => (
      <InterviewItem 
        key={index} 
        status={interviewStatus[index] || 'Pre'}
        // 'Pre' 상태일 때는 커서 스타일 변경
        style={{ cursor: interviewStatus[index] === 'Pre' ? 'default' : 'pointer' }}
      >
        <QuestionWrap onClick={() => handleAnswerToggle(index)}>
          <Status status={interviewStatus[index] || 'Pre'}>
            {interviewStatus[index] === 'Ing' ? '진행 중'
            : interviewStatus[index] === 'Complete' ? '완료' 
            : '준비 중'}
          </Status>
          <QuestionText>Q{index + 1}. {item.question}</QuestionText>
        </QuestionWrap>
        {visibleAnswers[index] && (interviewStatus[index] === 'Ing' || interviewStatus[index] === 'Complete') && (
          <AnswerWrap>
            {renderAnswers(index)}
          </AnswerWrap>
        )}
      </InterviewItem>
    ));
  };

  const handleCheckResult = () => {
    navigate(`/Persona/4`, { replace: true });
    handleWarningClose();
  };

  return (
    <>
      <PopupBox isActive={active}>
        <ToastPopup isActive={active}>
          <Header>
            <Title>
              {businessAnalysis.title}의 {selectedInterviewPurpose}
              <ColseButton onClick={handleClose} />
            </Title>
            <ul>
              <li>
                <span>
                  <img src={images.FileText} alt="문항수" />문항수
                </span>
                <span>3개</span>
              </li>
              <li>
                <span>
                  <img src={images.PeopleFill} alt="참여페르소나" />참여페르소나
                </span>
                <span>{personaList.selected.length}명</span>
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

            {isLoadingPrepare &&
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
            }

            {!isLoadingPrepare && renderInterviewItems()}

            {isAnalyzing &&
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
            }

            {isAnalysisComplete &&
              <LoadingBox Complete>
                <img src={images.CheckCircleFill} alt="완료" />

              <p>
                결과 분석이 완료되었습니다. 지금 바로 확인해보세요!
                <span onClick={handleCheckResult}>지금 확인하기</span>
                </p>
              </LoadingBox>
            }
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
    </>
  );
};

export default ToastPopupWrap;

const PopupBox = styled.div`
  position: fixed;
  top: 0;
  right: 100%;
  transform: ${({ isActive }) => isActive ? 'translateX(100%)' : 'translateX(0)'};
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
  z-index: 101;
  visibility: ${({ isActive }) => isActive ? 'visible' : 'hidden'};
`;

const ToastPopup = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  transform: ${({ isActive }) => isActive ? 'translateX(0)' : 'translateX(100%)'};
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
    display:flex;
    align-items:center;
    width:100%;
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

  &:before, &:after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 100%;
    border-radius: 10px;
    background-color: ${palette.black};
    content: '';
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
      background: ${props => props.Complete ? palette.primary : palette.gray300};
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
      opacity: .7;
    }
    &:nth-child(2) {
      border: 1px solid ${palette.primary};
      background: rgba(34, 111, 255, 1);
      animation: ${move} 2s 0s linear infinite;
      opacity: .5;
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
  cursor: ${props => props.status === 'Pre' ? 'default' : 'pointer'};
`;

const QuestionWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;
  // cursor: ${props => (props.status === 'Ing' || props.status === 'Complete') ? 'pointer' : 'default'};
  cursor: inherit;

  ${props => props.complete && css`
    &:after {
      content: '';
      width: 10px;
      height: 10px;
      transform: ${props.checked ? 'rotate(45deg)' : 'rotate(225deg)'};
      border-bottom: 2px solid ${palette.gray500};
      border-right: 2px solid ${palette.gray500};
      background: rgba(0, 0, 0, 0.5);
      transition: all 0.5s;
    }
  `}
`;

// const Number = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-shrink: 0;
//   width: 30px;
//   height: 30px;
//   font-size: 0.875rem;
//   line-height: 1.5;
//   color: ${props => 
//     props.status === 'Ing' ? palette.primary 
//     : props.status === 'Complete' ? palette.green 
//     : palette.gray300};
//   border-radius: 2px;
//   border: 1px solid ${props => 
//     props.status === 'Ing' ? palette.primary 
//     : props.status === 'Complete' ? palette.green
//     : palette.gray300};
//   background: ${palette.chatGray};
// `;

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
  gap: 4px;
  max-width: 54px;
  width: 100%;
  font-size: 0.75rem;
  line-height: 1.5;
  color: ${props =>
    props.status === 'Ing' ? palette.primary
    : props.status === 'Complete' ? palette.green
    : palette.gray700
  };
  // margin-left: auto;
  padding: 2px 8px;
  border-radius: 2px;
  border: ${props =>
    props.status === 'Ing' ? `1px solid ${palette.primary}`
    : props.status === 'Complete' ? `1px solid ${palette.green}`
    : `1px solid ${palette.outlineGray}`
  };
  background: ${props =>
    props.status === 'Ing' ? `rgba(34, 111, 255, 0.04)`
    : props.status === 'Complete' ? palette.white
    : palette.chatGray
  };

  ${props => props.status === 'Complete' && css`
    &:before {
      width: 10px;
      height: 10px;
      content: '';
      background: url(${images.CheckGreen}) center no-repeat;
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

const TypeName = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${palette.gray800};
`;

const Thumb = styled.div`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${palette.gray200};
`;

const TextContainer = styled.div`
  align-self: flex-start;
  font-size: 1rem;
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
  margin:0 12px;
  border-radius: 50%;
  background: ${palette.gray500};
  box-shadow: 12px 0 ${palette.gray500}, -12px 0 ${palette.gray500};
  position: relative;
  animation: ${flash} 0.5s ease-out infinite alternate;
`;