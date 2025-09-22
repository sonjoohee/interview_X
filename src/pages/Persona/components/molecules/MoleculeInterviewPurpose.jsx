import React, { useState } from "react";
import { useAtom } from "jotai";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import {
  IS_LOGGED_IN,
  SELECTED_INTERVIEW_PURPOSE,
  SINGLE_INTERVIEW_QUESTION_LIST,
  PROJECT_ID,
  PURPOSE_ITEMS_SINGLE,
  IS_LOADING_QUESTION,
  SELECTED_INTERVIEW_PURPOSE_DATA,
  PROJECT_TOTAL_INFO,
  PROJECT_CREATE_INFO,
} from "../../../AtomStates";
import {
  ListBoxItem,
  ListText,
  ListTitle,
  ListSubtitle,
  ListButton,
  BoxListWrap,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import { SkeletonLine } from "../../../../assets/styles/Skeleton";
import { Body1, Body3, Caption1 } from "../../../../assets/styles/Typography";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { RadioButton } from "../../../../assets/styles/InputStyle";

import {
  InterviewXPersonaSingleInterviewGeneratorRequest,
  InterviewXPersonaSingleInterviewGeneratorRequestTheoryCustom,
} from "../../../../utils/indexedDB";
import { updateProjectOnServer } from "../../../../utils/indexedDB";

const MoleculeInterviewPurpose = ({
  Small,
  purpose,
  selectedPurpose,
  showQuestions,
  onPurposeSelect,
  toggleQuestions,
  setShowErrorPopup,
  regenerateCount,
  setRegenerateCount,
}) => {

  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectId] = useAtom(PROJECT_ID);
  const [singleInterviewQuestionList, setSingleInterviewQuestionList] = useAtom(
    SINGLE_INTERVIEW_QUESTION_LIST
  );
  const [isLoadingQuestion, setIsLoadingQuestion] =
    useAtom(IS_LOADING_QUESTION);
  const [, setShowRegenerateButton] = useState(false);

  const [purposeItemsSingleAtom, ] =
    useAtom(PURPOSE_ITEMS_SINGLE);
  const [, setCheckGenerateQuestion] = useState("");
  const [loadingStates, setLoadingStates] = useState({});

  const [selectedInterviewPurpose, setSelectedInterviewPurpose] = useAtom(
    SELECTED_INTERVIEW_PURPOSE
  );
  const [, setSelectedInterviewPurposeData] =
    useAtom(SELECTED_INTERVIEW_PURPOSE_DATA);

  const [projectTotalInfo, ] = useAtom(PROJECT_TOTAL_INFO);
  const [projectCreateInfo, ] = useAtom(PROJECT_CREATE_INFO);

  const loadInterviewQuestion = async (title) => {
    setShowRegenerateButton(false);

    // 현재 카드의 로딩 상태 설정
    setLoadingStates((prev) => {
      if (purpose.id === 4) {
        const newState = {
          ...prev,
          [selectedInterviewPurpose]: true,
        };
        return newState;
      } else {
        const newState = {
          ...prev,
          [purpose.id]: true,
        };
        return newState;
      }
      // console.log("loadingStates 설정:", newState);
      // return newState;
    });

    const existingQuestions = singleInterviewQuestionList?.find(
      (item) =>
        item.theory_name ===
        (purpose.id === 4 ? purpose.custom_theory_data.theory_title : title)
    );

    if (existingQuestions) {
      setCheckGenerateQuestion("");
      setLoadingStates((prev) => ({
        ...prev,
        [purpose.id]: false,
      }));
      return;
    }

    try {
      setIsLoadingQuestion(true);

      let response = {};
      if (purpose.id === 4) {
        // const generatedQuestions = purposeItemsSingleAtom.find(
        //   (item) => item.id === 4
        // );

        // if (generatedQuestions) {
        let data = {
          business_idea: projectTotalInfo.projectTitle,
          business_analysis_data: projectCreateInfo,
          custom_theory_data: purpose.custom_theory_data,
        };

        response =
          await InterviewXPersonaSingleInterviewGeneratorRequestTheoryCustom(
            data,
            isLoggedIn
          );

        // }
      } else if (purpose.id !== 4) {
        let data = {
          business_idea: projectTotalInfo.projectTitle,
          business_analysis_data: projectCreateInfo,
          theory_name: title,
        };

        response = await InterviewXPersonaSingleInterviewGeneratorRequest(
          data,
          isLoggedIn
        );
      }

      if (response.response) {
        const commonQuestions = response.response
          ?.filter((item) => item.question_type === "공통질문")
          ?.map((item) => item);

        const specialQuestions = response.response
          ?.filter((item) => item.question_type === "특화질문")
          ?.map((item) => item);

        const newQuestionData = {
          theory_name:
            purpose.id === 4
              ? purpose.custom_theory_data.theory_title
              : purpose.title,
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
      setLoadingStates((prev) => ({
        ...prev,
        [purpose.id]: false,
      }));
      setIsLoadingQuestion(false);
      setCheckGenerateQuestion("");
    }
  };

  const handleQuestionClick = () => {
    setSelectedInterviewPurpose(purpose.id);
    const selectedPurpose = purposeItemsSingleAtom?.find(
      (item) => item.id === purpose.id
    );

    setSelectedInterviewPurposeData(selectedPurpose);
    toggleQuestions(purpose.id);

    if (purpose.id !== 4 && !showQuestions[purpose.id]) {
      const existingQuestions = singleInterviewQuestionList?.find(
        (item) => item.theory_name === purpose.title
      );

      if (!existingQuestions) {
        setLoadingStates((prev) => ({
          ...prev,
          [purpose.id]: true,
        }));
        setIsLoadingQuestion(true);
        loadInterviewQuestion(purpose.title);
      }
    } else if (purpose.id === 4 && !showQuestions[purpose.id]) {
      const existingQuestions = singleInterviewQuestionList?.find(
        (item) => item.theory_name === purpose.theory_title
      );

      if (!existingQuestions) {
        setLoadingStates((prev) => ({
          ...prev,
          [selectedInterviewPurpose]: true,
        }));
        setIsLoadingQuestion(true);
        loadInterviewQuestion(purpose.theory_title);
      }
    }
  };

  return (
    <ListBoxItem
      Small={Small}
      active={selectedPurpose === purpose["id"]}
      showQuestions={showQuestions[purpose["id"]]}
    >
      <div>
        <RadioButton
          id={purpose.id}
          name="radioGroup1"
          checked={selectedPurpose === purpose["id"]}
          onChange={() => onPurposeSelect(purpose["id"])}
        />
      </div>
      <ListText>
        <ListTitle>
          <Body1
            color={selectedPurpose === purpose["id"] ? "primary" : "gray800"}
          >
            {purpose["view_title"]}
          </Body1>
        </ListTitle>
        <ListSubtitle>
          <Caption1 color="gray500">{purpose["description"]}</Caption1>
        </ListSubtitle>
      </ListText>
      <ListButton>
        <Button
          Medium
          {...(showQuestions[purpose["id"]]
            ? { PrimaryLightest: true, Fill: true }
            : { View: true })}
          disabled={isLoadingQuestion}
          onClick={handleQuestionClick}
        >
          {showQuestions[purpose["id"]] ? "문항 닫기" : "문항 보기"}
        </Button>
      </ListButton>

      {showQuestions[purpose["id"]] && (
        <BoxListWrap>
          <div>
            <Body1 color="gray800">공통 질문</Body1>
            <BgBoxList>
              {isLoadingQuestion && loadingStates[purpose.id] ? (
                <>
                  <SkeletonLine width="100%" height="20px" />
                  <SkeletonLine width="100%" height="20px" />
                  <SkeletonLine width="100%" height="20px" />
                </>
              ) : isLoadingQuestion &&
                purpose.id === 4 &&
                !singleInterviewQuestionList?.find(
                  (item) =>
                    item.theory_name === purpose.custom_theory_data.theory_title
                ) ? (
                <>
                  <SkeletonLine width="100%" height="20px" />
                  <SkeletonLine width="100%" height="20px" />
                  <SkeletonLine width="100%" height="20px" />
                </>
              ) : (
                (() => {
                  const questions = singleInterviewQuestionList?.find(
                    (item) =>
                      item.theory_name ===
                      (purpose.id === 4
                        ? purpose.custom_theory_data.theory_title
                        : purpose["title"])
                  );
                  return (
                    questions?.commonQuestions?.map((question, index) => (
                      <BgBoxItem key={index}>
                        <Body3 color="gray700" align="left">{`${String(index + 1).padStart(
                          2,
                          "0"
                        )}.`}</Body3>
                        <Body3 color="gray700" align="left">{question.question}</Body3>
                      </BgBoxItem>
                    )) || null
                  );
                })()
              )}
            </BgBoxList>
          </div>

          <div>
            <Body1 color="gray800">특화 질문</Body1>
            <BgBoxList>
              {isLoadingQuestion && loadingStates[purpose.id] ? (
                <>
                  <SkeletonLine width="100%" height="20px" />
                  <SkeletonLine width="100%" height="20px" />
                  <SkeletonLine width="100%" height="20px" />
                </>
              ) : isLoadingQuestion &&
                purpose.id === 4 &&
                !singleInterviewQuestionList?.find(
                  (item) =>
                    item.theory_name === purpose.custom_theory_data.theory_title
                ) ? (
                <>
                  <SkeletonLine width="100%" height="20px" />
                  <SkeletonLine width="100%" height="20px" />
                  <SkeletonLine width="100%" height="20px" />
                </>
              ) : (
                (() => {
                  const questions = singleInterviewQuestionList?.find(
                    (item) =>
                      item.theory_name ===
                      (purpose.id === 4
                        ? purpose.custom_theory_data.theory_title
                        : purpose["title"])
                  );
                  return (
                    questions?.specialQuestions?.map((question, index) => (
                      <BgBoxItem key={index}>
                        <Body3 color="gray700" align="left">{`${String(index + 1).padStart(
                          2,
                          "0"
                        )}.`}</Body3>
                        <Body3 color="gray700" align="left">{question.question}</Body3>
                      </BgBoxItem>
                    )) || null
                  );
                })()
              )}
            </BgBoxList>
          </div>
        </BoxListWrap>
      )}
    </ListBoxItem>
  );
};

const BgBoxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 4px;
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

export default MoleculeInterviewPurpose;
