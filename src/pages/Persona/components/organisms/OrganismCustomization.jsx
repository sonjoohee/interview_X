import React, { useState } from "react";
import styled, { css } from "styled-components";
import {
  TextInfo,
  TextBox,
} from "../../../../assets/styles/BusinessAnalysisStyle"; // Adjust the import path as necessary
import { Body1, Body3, Caption2 } from "../../../../assets/styles/Typography";
import { CustomTextarea, FormBox } from "../../../../assets/styles/InputStyle";
import { palette } from "../../../../assets/styles/Palette";

import { Button } from "../../../../assets/styles/ButtonStyle";
import { InterviewXPersonaSingleInterviewTheoryCustom } from "../../../../utils/indexedDB";
import { InterviewXPersonaSingleInterviewGeneratorRequestTheoryCustom } from "../../../../utils/indexedDB";
import {
  updateProjectOnServer,
  UserCreditInfo,
} from "../../../../utils/indexedDB";
import { useAtom } from "jotai";
import AtomPersonaLoader from "../../../Global/atoms/AtomPersonaLoader";
import PopupWrap from "../../../../assets/styles/Popup";
import {
  PROJECT_ID,
  IS_LOGGED_IN,
  BUSINESS_ANALYSIS,
  SINGLE_INTERVIEW_QUESTION_LIST,
  PURPOSE_ITEMS_SINGLE,
  IS_LOADING_QUESTION,
  SELECTED_INTERVIEW_PURPOSE,
  SELECTED_INTERVIEW_PURPOSE_DATA,
  USER_CREDITS,
  PROJECT_TOTAL_INFO,
  PROJECT_CREATE_INFO,
  CUSTOM_THEORY_DATA,
} from "../../../AtomStates";

const OrganismCustomization = ({
  customizations,
  setCustomizations,
  setShowPopup,
  setShowNewListBox,
  setShowCustomization,
  setShowCustomButton,
  setShowQuestions,
}) => {
  const [projectTotalInfo] = useAtom(PROJECT_TOTAL_INFO);
  const [projectCreateInfo] = useAtom(PROJECT_CREATE_INFO);
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [projectId] = useAtom(PROJECT_ID);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [businessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [purposeItemsSingleAtom, setPurposeItemsSingleAtom] =
    useAtom(PURPOSE_ITEMS_SINGLE);
  const [singleInterviewQuestionList, setSingleInterviewQuestionList] = useAtom(
    SINGLE_INTERVIEW_QUESTION_LIST
  );
  const [selectedInterviewPurpose, setSelectedInterviewPurpose] = useAtom(
    SELECTED_INTERVIEW_PURPOSE
  );
  const [selectedInterviewPurposeData, setSelectedInterviewPurposeData] =
    useAtom(SELECTED_INTERVIEW_PURPOSE_DATA);
  const [isLoadingQuestion, setIsLoadingQuestion] =
    useAtom(IS_LOADING_QUESTION);
  const [apiResponse, setApiResponse] = useState(null);
  const [regenerateCount, setRegenerateCount] = useState(0);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showCustomErrorPopup, setShowCustomErrorPopup] = useState(false);
  const [showCustomInterviewPurpose, setShowCustomInterviewPurpose] =
    useState(false);
  const [currentPurposeData, setCurrentPurposeData] = useState(null);
  const [showResults, setShowResults] = useState(true);
  const [showOrganismCustomization, setShowOrganismCustomization] =
    useState(true);
  const [selectedTheory, setSelectedTheory] = useState(null);
  const [customTheoryData, setCustomTheoryData] = useAtom(CUSTOM_THEORY_DATA);

  const handleEditComplete = (index) => {
    const newCustomizations = [...customizations];
    newCustomizations[index].definitionText =
      newCustomizations[index].editedDefinition;
    newCustomizations[index].purposeText =
      newCustomizations[index].editedPurpose;
    newCustomizations[index].isEditing = false;
    setCustomizations(newCustomizations);
  };

  const handlePurposeGeneration = async (custom, index) => {
    try {
      setIsLoadingQuestion(true);
      let result = await InterviewXPersonaSingleInterviewTheoryCustom(
        { input_data: custom.purposeText },
        isLoggedIn
      );

      let retryCount = 0;
      const maxRetries = 10;

      while (
        retryCount < maxRetries &&
        (
          !result ||
          !result.response ||
          !result.response.check_validity
        )
      ) {
        result = await InterviewXPersonaSingleInterviewTheoryCustom(
          { input_data: custom.purposeText },
          isLoggedIn
        );

        retryCount++;
      }

      if (result.response.check_validity.check_index === 0) {
        setShowCustomErrorPopup(true);
        // 이전 상태로 되돌리기
        const newCustomizations = [...customizations];
        newCustomizations[index].showMethodology = false;
        setCustomizations(newCustomizations);
        return;
      }

      setApiResponse(result);
      setCustomTheoryData(result?.response?.custom_theory_data);

      // Update project on server with the new data

      // if (result?.response?.custom_theory_data?.theory_title) {
      //   const generatedQuestions = {
      //     id: 4,
      //     title: result?.response?.custom_theory_data?.theory_title || "",
      //     theory_title: result?.response?.custom_theory_data?.theory_title || "",
      //     view_title: result?.response?.custom_theory_data?.theory_title || "",
      //     definition: result?.response?.custom_theory_data?.definition || "",
      //     objective: result?.response?.custom_theory_data?.objective || "",
      //     characteristic: result?.response?.custom_theory_data?.characteristic || [],
      //     description: "사용자 커스텀 방법론" || "",
      //     custom_theory_data: result?.response?.custom_theory_data || "",
      //     question_list: result?.response?.custom_theory_data?.question_list || [],
      //   };
      //   setPurposeItemsSingleAtom((prev) => [...prev, generatedQuestions]);
      // }

      await updateProjectOnServer(
        projectId,
        {
          customTheoryData: result?.response?.custom_theory_data,
        },
        isLoggedIn
      );
      setShowResults(true);
      // 새로운 카드 추가
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowPopup(true); // Show error popup for 500 status
            break;
          case 504:
            // Handle 504 error if needed
            setShowPopup(true); // Show error popup for 504 status
            break;
          default:
            setShowPopup(true); // Show error popup for other statuses
            break;
        }
        console.error("Error details:", error);
      }
    } finally {
      setIsLoadingQuestion(false);

      // 크레딧 사용 후 사용자 정보 새로고침
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        const userCreditValue = await UserCreditInfo(isLoggedIn);

        // 전역 상태의 크레딧 정보 업데이트
        setUserCredits(userCreditValue);
      }
    }
  };

  const handleGenerateQuestions = async (generatedCustomInfo) => {
    try {
      setIsLoadingQuestion(true);
      setSelectedInterviewPurpose(4); // 커스텀 방법론의 ID

      const selectedPurpose = {
        id: 4,
        title: customTheoryData?.theory_title || "",
        theory_title: customTheoryData?.theory_title || "",
        view_title: customTheoryData?.theory_title || "",
        definition: customTheoryData?.definition || "",
        objective: customTheoryData?.objective || "",
        characteristic: customTheoryData?.characteristic || [],
        description: "사용자 커스텀 방법론" || "",
        custom_theory_data: customTheoryData || "",
      };

      setSelectedInterviewPurposeData(selectedPurpose);

      // 2. 카드 열기
      setShowQuestions((prev) => ({
        ...prev,
        4: true,
      }));

      // 3. PURPOSE_ITEMS_SINGLE 업데이트
      // const generatedQuestions = generatedCustomInfo

      setPurposeItemsSingleAtom((prev) => {
        const updatedItems = prev.filter((item) => item.id !== 4);
        return [...updatedItems, generatedCustomInfo];
      });

      // 4. OrganismCustomization 닫기
      setShowOrganismCustomization(false);

      // 5. API 호출
      const data = {
        business_idea: projectTotalInfo.projectTitle,
        business_analysis_data: projectCreateInfo,
        custom_theory_data: customTheoryData,
      };

      const result =
        await InterviewXPersonaSingleInterviewGeneratorRequestTheoryCustom(
          data,
          true
        );

      if (result?.response) {
        const commonQuestions = result.response
          .filter((item) => item.question_type === "공통질문")
          .map((item) => item);

        const specialQuestions = result.response
          .filter((item) => item.question_type === "특화질문")
          .map((item) => item);

        const newQuestionList = {
          theory_name: customTheoryData.theory_title,
          commonQuestions,
          specialQuestions,
        };

        setSingleInterviewQuestionList((prev) => {
          const filtered = prev.filter(
            (item) => item.theory_name !== customTheoryData.theory_title
          );
          return [...filtered, newQuestionList];
        });

        await updateProjectOnServer(
          projectId,
          {
            singleInterviewQuestionList: [
              ...singleInterviewQuestionList,
              newQuestionList,
            ],
          },
          isLoggedIn
        );
      }
    } catch (error) {
      console.error("Error in handleGenerateQuestions:", error);
      setShowErrorPopup(true);
      setShowQuestions((prev) => ({
        ...prev,
        4: false,
      }));
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  const loadInterviewQuestions = (title) => {
    // 질문 로딩 로직을 여기에 추가합니다.
    // console.log("Loading interview questions for:", title);
    // 실제 질문 로딩 로직을 여기에 추가
  };

  return (
    <>
      {showOrganismCustomization && (
        <>
          {customizations?.map((custom, index) => (
            <div key={custom.id}>
              {!custom.showMethodology ? (
                <CustomizationBox>
                  <Body1 color="gray800" style={{ alignSelf: "flex-start" }}>
                    인터뷰 목적
                  </Body1>
                  <CustomTextarea
                    rows={4}
                    placeholder="페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다."
                    value={custom.purposeText}
                    onChange={(e) => {
                      const newCustomizations = [...customizations];
                      newCustomizations[index].purposeText = e.target.value;
                      setCustomizations(newCustomizations);
                    }}
                  />
                  <Button
                    Medium
                    Primary
                    disabled={isLoadingQuestion}
                    onClick={async () => {
                      if (!custom.purposeText.trim()) {
                        setShowPopup(true);
                      } else {
                        const newCustomizations = [...customizations];
                        newCustomizations[index].showMethodology = true;
                        setCustomizations(newCustomizations);
                        setShowResults(false);

                        // Call the new function to handle the API request
                        await handlePurposeGeneration(custom, index);
                      }
                    }}
                  >
                    목적 생성
                  </Button>
                </CustomizationBox>
              ) : (
                <CustomizationBox>
                  {isLoadingQuestion ? (
                    <AtomPersonaLoader message="입력하신 데이터를 분석하고 있어요" />
                  ) : (
                    <>
                      {showResults && (
                        <>
                          <Body1
                            color="gray800"
                            style={{ alignSelf: "flex-start" }}
                          >
                            {apiResponse?.response?.custom_theory_data
                              ?.theory_title || custom.definitionText}
                          </Body1>
                          <TextInfo>
                            <Body3 color="gray700" align="left">
                              정의
                            </Body3>
                            <TextBox>
                              <Body3 color="gray700" align="left">
                                {apiResponse?.response?.custom_theory_data
                                  ?.definition || custom.definitionText}
                              </Body3>
                            </TextBox>
                          </TextInfo>

                          <TextInfo>
                            <Body3 color="gray700" align="left">
                              목적
                            </Body3>
                            <TextBox>
                              <Body3 color="gray700" align="left">
                                {apiResponse?.response?.custom_theory_data
                                  ?.objective || custom.purposeText}
                              </Body3>
                            </TextBox>
                          </TextInfo>

                          <TextInfo style={{ width: "100%" }}>
                            <Body3 color="gray700" align="left">주요 특징</Body3>

                            {apiResponse?.response?.custom_theory_data?.characteristic?.map(
                              (char, idx) => (
                                <TextBox key={idx}>
                                  <Body3 color="gray700" align="left">{char}</Body3>
                                </TextBox>
                              )
                            ) || (
                              <Body3 color="gray700">특징이 없습니다.</Body3>
                            )}
                          </TextInfo>

                          <Caption2
                            color="gray500"
                            style={{ alignSelf: "flex-start" }}
                          >
                            * 본 서비스는 B2C 페르소나를 타겟으로 진행되어,
                            질문문항이 소비자 중심으로 되지 않았을 경우, 적합한
                            결과 도출이 나오지 않을 수 있습니다.
                          </Caption2>
                          <Button
                            Medium
                            Primary
                            disabled={isLoadingQuestion}
                            onClick={() => {
                              const generatedCustomInfo = {
                                id: 4,
                                theory_title:
                                  apiResponse?.response?.custom_theory_data
                                    ?.theory_title || "",
                                title:
                                  apiResponse?.response?.custom_theory_data
                                    ?.theory_title || "",
                                view_title:
                                  apiResponse?.response?.custom_theory_data
                                    ?.theory_title || "",
                                definition:
                                  apiResponse?.response?.custom_theory_data
                                    ?.definition || "",
                                objective:
                                  apiResponse?.response?.custom_theory_data
                                    ?.objective || "",
                                characteristic:
                                  apiResponse?.response?.custom_theory_data
                                    ?.characteristic || [],
                                description: "사용자 커스텀 방법론" || "",

                                custom_theory_data:
                                  apiResponse?.response?.custom_theory_data ||
                                  "",
                                isQuestionVisible: true,
                              };

                              if (purposeItemsSingleAtom.length < 4) {
                                setPurposeItemsSingleAtom((prev) => {
                                  const updatedItems = [...prev];
                                  if (
                                    !updatedItems.some(
                                      (item) =>
                                        item.id === generatedCustomInfo.id
                                    )
                                  ) {
                                    updatedItems.push(generatedCustomInfo);
                                  }
                                  return updatedItems.slice(0, 4);
                                });
                              }

                              handleGenerateQuestions(generatedCustomInfo);
                              setShowOrganismCustomization(false);
                            }}
                          >
                            질문 생성하기
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </CustomizationBox>
              )}
            </div>
          ))}
        </>
      )}

      {showCustomErrorPopup && (
        <PopupWrap
          Warning
          title="다시 입력해 주세요."
          message="현재 입력하신 정보는 목적을 생성할 수 없습니다."
          buttonType="Outline"
          closeText="확인"
          isModal={false}
          onCancel={() => setShowCustomErrorPopup(false)}
          show={showCustomErrorPopup}
        />
      )}
      {showErrorPopup && (
        <PopupWrap
          Warning
          title="오류가 발생했습니다"
          message="질문 생성 중 문제가 발생했습니다. 다시 시도해주세요."
          buttonType="Outline"
          closeText="확인"
          isModal={false}
          onCancel={() => setShowErrorPopup(false)}
          show={showErrorPopup}
        />
      )}
    </>
  );
};

export default OrganismCustomization;

const CustomizationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 24px 24px 20px 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;
