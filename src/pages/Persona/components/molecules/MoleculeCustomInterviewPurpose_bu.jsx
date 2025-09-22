import React, { useState } from "react";
import { useAtom } from "jotai";
import styled, { css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import {
  IS_PERSONA_ACCESSIBLE,
  IS_LOGGED_IN,
  PERSONA_STEP,
  SELECTED_INTERVIEW_PURPOSE,
  SINGLE_INTERVIEW_QUESTION_LIST,
  PERSONA_LIST,
  PERSONA_BUTTON_STATE_3,
  BUSINESS_ANALYSIS,
  REQUEST_PERSONA_LIST,
  PROJECT_LOAD_BUTTON_STATE,
  PROJECT_ID,
  PURPOSE_ITEMS_SINGLE,
  SELECTED_INTERVIEW_PURPOSE_DATA,
} from "../../../AtomStates";
import {
  ListBoxItem,
  ListText,
  ListTitle,
  ListSubtitle,
  ListButton,
  BoxListWrap,
  Badge,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import { SkeletonLine } from "../../../../assets/styles/Skeleton";
import { Body1, Body3, Caption1 } from "../../../../assets/styles/Typography";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { RadioButton } from "../../../../assets/styles/InputStyle";

import { InterviewXPersonaSingleInterviewGeneratorRequestTheoryCustom } from "../../../../utils/indexedDB";
import { updateProjectOnServer } from "../../../../utils/indexedDB";
import MoleculeRecreate from "./MoleculeRecreate";

const MoleculeCustomInterviewPurpose = ({
  id,
  purpose,
  selectedPurpose,
  onPurposeSelect,
  setShowErrorPopup,
  regenerateCount,
  setRegenerateCount,
  NoBackground,
}) => {
  // console.log("🚀 ~ purpose:", purpose);
  const [selectedInterviewPurposeData, setSelectedInterviewPurposeData] =
    useAtom(SELECTED_INTERVIEW_PURPOSE_DATA);
  const [businessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectId] = useAtom(PROJECT_ID);

  const [singleInterviewQuestionList, setSingleInterviewQuestionList] = useAtom(
    SINGLE_INTERVIEW_QUESTION_LIST
  );
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [showRegenerateButton, setShowRegenerateButton] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const [purposeItemsSingle, setPurposeItemsSingle] =
    useAtom(PURPOSE_ITEMS_SINGLE);
  // console.log("purpose", purpose);

  if (!purpose) {
    return null;
  }
  const loadInterviewQuestion = async (title) => {
    setShowRegenerateButton(false);

    const existingQuestions = singleInterviewQuestionList.find(
      (item) => item.theory_name === title
    );

    if (existingQuestions) {
      // console.log("이미 존재하는 질문입니다:", existingQuestions);
      return;
    }

    try {
      setIsLoadingQuestion(true);
      let data = {
        business_idea: businessAnalysis.input,
        business_analysis_data: {
          title: businessAnalysis.title,
          characteristics: businessAnalysis.characteristics,
          features: businessAnalysis.features,
        },
        custom_theory_data: purpose,
      };

      // console.log("API 요청 데이터:", data);

      let response =
        await InterviewXPersonaSingleInterviewGeneratorRequestTheoryCustom(
          data,
          isLoggedIn
        );

      // console.log("API 응답:", response);

      if (response.response) {
        const commonQuestions = response.response
          .filter((item) => item.question_type === "공통질문")
          .map((item) => item);

        const specialQuestions = response.response
          .filter((item) => item.question_type === "특화질문")
          .map((item) => item);

        const newQuestionData = {
          theory_name: title,
          commonQuestions,
          specialQuestions,
        };

        setSingleInterviewQuestionList((prev) => {
          const newState = [...prev, newQuestionData];
          return newState;
        });

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
      setSelectedInterviewPurposeData(purpose);
    } catch (error) {
      console.error("질문 로딩 중 에러 발생:", error);
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
      }
    } finally {
      setIsLoadingQuestion(false);
    }

    // id: 4에 대한 새로운 항목 추가
    const newPurposeItem = {
      id: 4,
      category: "새로운 카테고리", // 적절한 카테고리로 변경
      title: title, // 전달받은 title 사용
      view_title: "새로운 항목 보기 제목", // 적절한 보기 제목으로 변경
      description: "새로운 항목에 대한 설명", // 적절한 설명으로 변경
    };

    // purposeItemsSingle에 새로운 항목 추가
    setPurposeItemsSingle((prev) => {
      const updatedList = [...prev, newPurposeItem];
      return updatedList;
    });
  };

  return (
    <ListBoxItem active={selectedPurpose === id} showQuestions={isQuestionOpen}>
      <Button
        Medium
        onClick={(e) => {
          e.preventDefault();
          setIsQuestionOpen(!isQuestionOpen);
          setShowQuestions(true);
          setShowRegenerateButton(false);
          if (!isQuestionOpen) {
            loadInterviewQuestion(purpose?.theory_title);
          }
        }}
      >
        {isQuestionOpen ? null : "문항 생성"}
      </Button>

      {isQuestionOpen && (
        <CardContainer
          $isSelected={selectedPurpose === id}
          NoBackground={NoBackground}
        >
          <MainContent>
            <CheckCircle
              $isSelected={false}
              onClick={() => {
                onPurposeSelect(id);
              }}
            />
            <ContentWrapper>
              <TitleSection>
                <Title>{purpose?.theory_title}</Title>
              </TitleSection>
              {purpose?.description && (
                <Description>{purpose.description}</Description>
              )}
            </ContentWrapper>

            <ToggleButton
              $isExpanded={showQuestions}
              onClick={() => setShowQuestions(!showQuestions)}
            />
          </MainContent>

          {showQuestions && (
            <DescriptionSection $isTabContent={showQuestions}>
              {!showQuestions ? (
                <span
                  onClick={async () => {
                    setShowQuestions(true);
                    await loadInterviewQuestion(purpose?.theory_title);
                  }}
                >
                  <img src={images.FileSearch} alt="문항보기" />
                  문항보기
                </span>
              ) : showRegenerateButton ? (
                <ListUL>
                  <MoleculeRecreate
                    Small
                    onRegenerate={loadInterviewQuestion}
                  />
                </ListUL>
              ) : (
                <div>
                  <Body1 color="gray800">공통 질문</Body1>
                  <BgBoxList>
                    {isLoadingQuestion ? (
                      <>
                        <SkeletonLine width="100%" height="20px" />
                        <SkeletonLine width="100%" height="20px" />
                        <SkeletonLine width="100%" height="20px" />
                      </>
                    ) : (
                      (() => {
                        const questions = singleInterviewQuestionList.find(
                          (item) => item.theory_name === purpose?.theory_title
                        );
                        return (
                          questions?.commonQuestions?.map((question, index) => (
                            <BgBoxItem key={index}>
                              <Body3 color="gray700">{`${String(
                                index + 1
                              ).padStart(2, "0")}.`}</Body3>
                              <Body3 color="gray700">{question}</Body3>
                            </BgBoxItem>
                          )) || null
                        );
                      })()
                    )}
                  </BgBoxList>
                  <Body1 color="gray800">특화 질문</Body1>
                  <BgBoxList>
                    {isLoadingQuestion ? (
                      <>
                        <SkeletonLine width="100%" height="20px" />
                        <SkeletonLine width="100%" height="20px" />
                        <SkeletonLine width="100%" height="20px" />
                      </>
                    ) : (
                      (() => {
                        const questions = singleInterviewQuestionList.find(
                          (item) => item.theory_name === purpose?.theory_title
                        );
                        return (
                          questions?.specialQuestions?.map(
                            (question, index) => (
                              <BgBoxItem key={index}>
                                <Body3 color="gray700">{`${String(
                                  index + 1
                                ).padStart(2, "0")}.`}</Body3>
                                <Body3 color="gray700">{question}</Body3>
                              </BgBoxItem>
                            )
                          ) || null
                        );
                      })()
                    )}
                  </BgBoxList>
                </div>
              )}
            </DescriptionSection>
          )}
        </CardContainer>
      )}
    </ListBoxItem>
  );
};

const BgBoxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 12px;
`;

const BgBoxItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  background: ${palette.chatGray};
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
    ${(props) => (props.$isSelected ? palette.primary : palette.outlineGray)};
  background: ${(props) => {
    if (props.NoBackground) {
      return props.$isSelected ? palette.white : palette.white;
    }
    return props.$isSelected ? "rgba(34, 111, 255, 0.10)" : palette.white;
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
    font-weight: 600;
    color: ${palette.primary};
  }
`;

export default MoleculeCustomInterviewPurpose;
