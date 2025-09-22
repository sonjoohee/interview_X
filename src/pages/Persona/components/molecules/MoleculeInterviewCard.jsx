//인터뷰 목적 선택
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import { useAtom } from "jotai";
import {
  SELECTED_INTERVIEW_PURPOSE,
  INTERVIEW_QUESTION_LIST,
  PROJECT_ID,
  IS_LOGGED_IN,
  PROJECT_TOTAL_INFO,
  PROJECT_CREATE_INFO,
} from "../../../AtomStates";
import { SkeletonLine } from "../../../../assets/styles/Skeleton";
import PopupWrap from "../../../../assets/styles/Popup";
import { updateProjectOnServer } from "../../../../utils/indexedDB";
import MoleculeRecreate from "./MoleculeRecreate";
import { InterviewXPersonaMultipleInterviewGeneratorRequest } from "../../../../utils/indexedDB";

// 전역 로딩 상태를 구독할 리스너들을 저장할 Set
const globalLoadingListeners = new Set();
// 전역 로딩 변수 (초기값 false)
let globalIsLoadingQuestion = false;

/**
 * 전역 로딩 값을 변경하고 구독 중인 모든 컴포넌트에 업데이트를 알립니다.
 */
export function setGlobalIsLoadingQuestion(value) {
  globalIsLoadingQuestion = value;
  globalLoadingListeners.forEach((listener) =>
    listener(globalIsLoadingQuestion)
  );
}

/**
 * 전역 로딩 상태를 React state로 관리하기 위한 커스텀 훅
 * 이 훅을 사용하는 컴포넌트는 글로벌 로딩 상태 변경 시 리렌더링됩니다.
 */
export function useGlobalIsLoading() {
  const [loading, setLoading] = useState(globalIsLoadingQuestion);

  useEffect(() => {
    globalLoadingListeners.add(setLoading);
    return () => {
      globalLoadingListeners.delete(setLoading);
    };
  }, []);

  return loading;
}

const MoleculeInterviewCard = ({
  title,
  description,
  isSelected,
  NoBackground,
  onSelect,
  interviewPurpose,
  isActive,
  ...props
}) => {
  const [projectTotalInfo] = useAtom(PROJECT_TOTAL_INFO);
  const [projectCreateInfo] = useAtom(PROJECT_CREATE_INFO);
  const [projectId] = useAtom(PROJECT_ID);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [, setSelectedInterviewPurpose] = useAtom(SELECTED_INTERVIEW_PURPOSE);
  const [, setInterviewQuestionListState] = useState([]);
  const [interviewQuestionList, setInterviewQuestionList] = useAtom(
    INTERVIEW_QUESTION_LIST
  );
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [state, setState] = useState({
    isExpanded: false,
    isChecked: false,
    showPopup: false,
    showRequestBadge: false,
    showCustomModal: false,
    customTextarea: "",
    isTextareaValid: false,
    isRadioSelected: false,
    showQuestions: false,
    showCustomPopup: false,
    isAccordionOpen: false,
    formState: {
      purpose: "",
      personaCount: "",
      gender: "",
      age: "",
      additionalInfo: "",
    },
  });
  const [regenerateCount, setRegenerateCount] = useState(0);
  const [showRegenerateButton, setShowRegenerateButton] = useState(false);

  const loadInterviewQuestion = async () => {
    //재생성 버튼 숨기기
    setShowRegenerateButton(false);

    //이미 해당하는 title에 대한 질문이 있는지 확인
    const existingQuestions = interviewQuestionList?.find(
      (item) => item.theory_name === title
    );

    // 이미 존재하는 경우 함수 종료
    if (existingQuestions) {
      return;
    }
    try {
      setIsLoadingQuestion(true);
      //API 요청 데이터 생성
      let data = {
        business_idea: projectTotalInfo.projectTitle,
        business_analysis_data: projectCreateInfo,
        theory_name: title,
      };

      let response = await InterviewXPersonaMultipleInterviewGeneratorRequest(
        data,
        isLoggedIn
      );
      let questionList = response.response;
      let retryCount = 0;
      const maxRetries = 10;

      //응답이 없거나, 데이터가 없거나 질문이 5개인 경우 재시도
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
      //최대 재시도 횟수를 초과한 경우 에러 팝업 표시
      if (retryCount >= maxRetries) {
        setShowErrorPopup(true);
        return;
      }
      //성공적으로 데이터를 받아온 경우 로컬 상태 없데이트
      setInterviewQuestionListState((prev) => [
        ...prev,
        {
          theory_name: title,
          questions: questionList,
        },
      ]);

      // interviewQuestionList가 undefined나 null인 경우 빈 배열로 초기화
      const currentList = interviewQuestionList || [];

      // 새로운 데이터를 포함한 전체 리스트를 생성
      const newQuestionList = [
        ...currentList,
        {
          theory_name: title,
          questions: questionList,
        },
      ];

      // 상태 업데이트와 서버 업데이트를 순차적으로 실행
      setInterviewQuestionList(newQuestionList);

      // 서버 업데이트 시 새로운 리스트를 직접 전달
      await updateProjectOnServer(
        projectId,
        {
          interviewQuestionList: newQuestionList,
        },
        isLoggedIn
      );
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowErrorPopup(true);
            break;
          case 504:
            if (regenerateCount >= 3) {
              setShowErrorPopup(true);
              return;
            } else {
              setShowRegenerateButton(true);
              setRegenerateCount(regenerateCount + 1);
            }
            break;
          default:
            setShowErrorPopup(true);
            break;
        }
        console.error("Error details:", error);
      }
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  // 전역 로딩 상태를 사용 (여러 카드에서 공유)
  const globalLoading = useGlobalIsLoading();

  return (
    <>
      <CardContainer
        $isSelected={isSelected}
        $isExpanded={isExpanded}
        // NoBackground={NoBackground}
        {...props}
      >
        <MainContent>
          <CheckCircle
            $isSelected={isSelected}
            onClick={() => {
              setSelectedInterviewPurpose(title);
              onSelect(title);
            }}
          />
          <ContentWrapper>
            <TitleSection>
              <Title>{title}</Title>
            </TitleSection>
            {description && <Description>{description}</Description>}
          </ContentWrapper>

          <ToggleButton
            $isExpanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </MainContent>

        {isExpanded && (
          <DescriptionSection $isExpanded={isExpanded}>
            {!state.showQuestions ? (
              <span
                style={{
                  pointerEvents: globalLoading ? "none" : "auto",
                  opacity: globalLoading ? 0.6 : 1,
                  cursor: globalLoading ? "not-allowed" : "pointer",
                }}
                onClick={async () => {
                  // 전역 혹은 현재 카드의 로딩 상태가 true면 클릭 이벤트 무시
                  if (globalLoading || isLoadingQuestion) return;

                  // 전역 로딩 상태 시작
                  setGlobalIsLoadingQuestion(true);
                  setState((prev) => ({ ...prev, showQuestions: true }));
                  await loadInterviewQuestion();
                  // 전역 로딩 상태 종료 (이 시점에 구독 중인 모든 카드가 리렌더링되어 스타일이 갱신됨)
                  setGlobalIsLoadingQuestion(false);
                }}
              >
                <img src={images.FileSearch} alt="문항보기" />
                문항보기
              </span>
            ) : showRegenerateButton ? (
              <ListUL>
                <MoleculeRecreate Small onRegenerate={loadInterviewQuestion} />
              </ListUL>
            ) : (
              <ListUL>
                <ul>
                  {isLoadingQuestion ? (
                    <>
                      <li>
                        <span className="number">Q1.</span>
                        <SkeletonLine width="100%" height="20px" />
                      </li>
                      <li>
                        <span className="number">Q2.</span>
                        <SkeletonLine width="100%" height="20px" />
                      </li>
                      <li>
                        <span className="number">Q3.</span>
                        <SkeletonLine width="100%" height="20px" />
                      </li>
                    </>
                  ) : (
                    // 실제 질문 데이터
                    interviewQuestionList
                      ?.find((item) => item.theory_name === title)
                      ?.questions.slice(2, 5)
                      ?.map((item, index) => (
                        <li key={index}>
                          <span className="number">Q{index + 1}.</span>
                          {item.question}
                        </li>
                      ))
                  )}
                </ul>
              </ListUL>
            )}
          </DescriptionSection>
        )}
      </CardContainer>
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

export default MoleculeInterviewCard;

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
    ${(props) => (props.$isSelected ? palette.primary : palette.outlineGray)};
  background: ${(props) => {
    if (props.NoBackground) {
      return props.$isSelected ? "rgba(34, 111, 255, 0.10)" : palette.white;
    }
    return props.$isSelected && !props.$isExpanded
      ? "rgba(34, 111, 255, 0.10)"
      : palette.white;
  }};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${(props) =>
    props.TitleFlex &&
    css`
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
    `}
`;

const MainContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
`;

const CheckCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;

  background-image: ${(props) =>
    props.$isSelected
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
// `;

// const ReadyIcon = styled.div`
//   width: 0px;
//   height: 0px;
//   border-style: solid;
//   border-width: 4px 0 4px 6px;
//   border-color: transparent transparent transparent #34c759;
//   transform: rotate(0deg);
// `;

// const KeywordGroup = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 4px;
// `;

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

// const KeywordTag = styled.div`
//   padding: 4px 10px;
//   color: #666666;
//   font-size: 0.75rem;
//   line-height: 1.6;
//   border-radius: 20px;
//   background: ${palette.chatGray};
// `;

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
    margin-top: 2px;
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
    props.$isExpanded ? `1px solid ${palette.outlineGray}` : "none"};
  background: ${palette.white};

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
      props.$isExpanded ? "transparent" : palette.chatGray};
    cursor: pointer;
  }
`;

const ListUL = styled.div`
  padding: 20px;
  border-radius: 10px;
  background: ${palette.chatGray};

  ul {
    display: flex;
    flex-direction: column;
  }

  li {
    display: flex;
    align-items: flex-start;
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
    width: 22px;
    // height: 20px;
    font-weight: 600;
    color: ${palette.primary};
    // border-radius: 2px;
    // border: 1px solid rgba(34, 111, 255, 0.5);
    // background: rgba(34, 111, 255, 0.04);
  }
`;
