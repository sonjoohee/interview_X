//persona step 1비즈니스 분석 첫번재 카드
import React from "react";
import styled, { css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import { useEffect, useState, useRef } from "react";
import { useAtom } from "jotai";
import {
  SkeletonTitle,
  SkeletonLine,
} from "../../../../assets/styles/Skeleton";
import {
  CustomInput,
  CustomTextarea,
  FormBox,
} from "../../../../assets/styles/InputStyle";
import {
  IS_LOADING,
  PERSONA_BUTTON_STATE_1,
  BUSINESS_ANALYSIS,
  CATEGORY_COLOR,
  PROJECT_ID,
  IS_LOGGED_IN,
  IS_EDIT_MODE,
  IS_LOADING_BUSINESS_ANALYSIS,
} from "../../../AtomStates";
import PopupWrap from "../../../../assets/styles/Popup";
import AtomPersonaLoader from "../../../Global/atoms/AtomPersonaLoader";
import { updateProjectOnServer } from "../../../../utils/indexedDB";
import MoleculeRecreate from "../molecules/MoleculeRecreate";
import { Body2, Body3, H5 } from "../../../../assets/styles/Typography";
import { Tag } from "../../../../assets/styles/BusinessAnalysisStyle";
import { IconButton } from "../../../../assets/styles/ButtonStyle";
import { InterviewXBusinessCategoryModifyRequest } from "../../../../utils/indexedDB";
import { BusinessCategoryAnalysis } from "../../../../utils/indexedDB";

const OrganismBusinessAnalysis = ({ personaStep }) => {
  const [isLoadingBusinessAnalysis, setIsLoadingBusinessAnalysis] = useAtom(
    IS_LOADING_BUSINESS_ANALYSIS
  );
  const [isProjectIdReady, setIsProjectIdReady] = useState(false);
  const [projectId] = useAtom(PROJECT_ID);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [businessAnalysis, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [personaButtonState1, setPersonaButtonState1] = useAtom(
    PERSONA_BUTTON_STATE_1
  );
  const [, setIsLoading] = useAtom(IS_LOADING);
  const [loadingState, setLoadingState] = useState(false);
  const [showCardContent, setShowCardContent] = useState(personaStep <= 2);
  const [categoryColor, setCategoryColor] = useAtom(CATEGORY_COLOR);

  const [isEditMode, setIsEditMode] = useAtom(IS_EDIT_MODE);
  const [inputs, setInputs] = useState({
    field1: {
      value: "",
      isValid: true,
      error: null,
    },
    field2: {
      value: "",
      isValid: true,
      error: null,
    },
    field3: {
      value: "",
    },
    field4: {
      value: "",
    },
  });

  const [regenerateCount1, setRegenerateCount1] = useState(0);
  const [regenerateCount2, setRegenerateCount2] = useState(0);
  const [showRegenerateButton1, setShowRegenerateButton1] = useState(false);
  const [showRegenerateButton2, setShowRegenerateButton2] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showErrorPopup2, setShowErrorPopup2] = useState(false);

  // 입력 상태 확인 함수
  const getInputStatus = (field) => {
    if (field.error) return "error";
    if (field.isValid) return "valid";
    return "normal";
  };

  // 입력 핸들러
  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value,
        isValid: value.length > 0,
        error: value.length === 0 ? "필수 입력 항목입니다." : null,
      },
    }));
  };

  const toggleCardContent = () => {
    setShowCardContent(!showCardContent);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    setInputs({
      field1: {
        value: businessAnalysis.title,
        isValid: true,
        error: null,
      },
      field2: {
        value: businessAnalysis.characteristics,
        isValid: true,
        error: null,
      },
      field3: {
        value: businessAnalysis.features,
      },
      field4: {
        value: businessAnalysis.category,
      },
    });
    setTimeout(() => {
      adjustHeight();
    }, 0);
  };

  const [isPopupRegex, setIsPopupRegex] = useState(false);

  const closePopupRegex = () => {
    setIsPopupRegex(false); // 팝업 닫기
  };

  const handleSaveClick = async () => {
    if (loadingState) {
      return;
    }
    // 입력값 유효성 검사
    const regex = /^[가-힣a-zA-Z0-9\s.,'"?!()\/\-·:\\%~@#$^&*_+<>`]*$/;
    const specialChars = /^[.,'"?!()\/\-·:\\%~@#$^&*_+<>`]+$/;

    // 단독으로 특수 문자만 사용된 경우
    if (
      specialChars.test(inputs.field1.value) ||
      specialChars.test(inputs.field2.value)
    ) {
      setIsPopupRegex(true);
      return;
    }

    // 입력 값에 대한 정규식 체크
    if (!regex.test(inputs.field1.value) || !regex.test(inputs.field2.value)) {
      setIsPopupRegex(true);
      return;
    }

    if (inputs.field1.value && inputs.field2.value) {
      // 새로운 비즈니스 분석 데이터 생성
      const updatedBusinessAnalysis = {
        input: inputs.field1.value,
        title: inputs.field1.value,
        characteristics: inputs.field2.value,
        features: inputs.field3.value,
        category: inputs.field4.value,
      };

      await updateProjectOnServer(
        projectId,
        {
          businessAnalysis: updatedBusinessAnalysis,
        },
        isLoggedIn
      );

      setCategoryColor({
        first: getCategoryColor(updatedBusinessAnalysis.category.first),
        second: getCategoryColor(updatedBusinessAnalysis.category.second),
        third: getCategoryColor(updatedBusinessAnalysis.category.third),
      });

      // 상태 업데이트
      setBusinessAnalysis(updatedBusinessAnalysis);

      // 대화 저장

      setIsEditMode(false);
    }
  };

  const handleUndoClick = () => {
    setInputs((prev) => ({
      ...prev,
      field1: {
        ...prev.field1,
        value: businessAnalysis.title,
      },
      field2: {
        ...prev.field2,
        value: businessAnalysis.characteristics,
      },
      field3: {
        ...prev.field3,
        value: businessAnalysis.features,
      },
      field4: {
        ...prev.field4,
        value: businessAnalysis.category,
      },
    }));
  };

  const handleAIDetailClick = async () => {
    // setPersonaButtonState1(1);
    setShowRegenerateButton2(false);
    let businessData;
    let categoryData;
    let attempts = 0;
    const maxAttempts = 5;

    try {
      setIsLoading(true);
      setLoadingState(true);

      const data = {
        business_analysis_data: {
          title: inputs.field1.value,
          characteristics: inputs.field2.value,
          features: inputs.field3.value,
          category: inputs.field4.value,
        },
        keyword: inputs.field2.value,
      };

      let response = await InterviewXBusinessCategoryModifyRequest(
        data,
        isLoggedIn
      );

      businessData = response.response.business_analysis;
      categoryData = response.response.category;

      if (attempts >= maxAttempts) {
        setShowErrorPopup(true);
        return;
      } else {
        setInputs((prev) => ({
          ...prev,
          field2: {
            ...prev.field2,
            value: businessData["추가_주요_목적_및_특징"],
          },
          field3: {
            value: businessData["추가_주요기능"],
          },
          field4: {
            value: categoryData,
          },
        }));
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowErrorPopup2(true);
            break;
          case 504:
            if (regenerateCount2 >= 3) {
              setShowErrorPopup2(true);
              return;
            } else {
              setShowRegenerateButton2(true);
              setRegenerateCount2(regenerateCount2 + 1);
            }
            break;
          default:
            setShowErrorPopup2(true);
            break;
        }
        console.error("Error details:", error);
      }
    } finally {
      // setPersonaButtonState1(0);
      setIsLoading(false);
      setLoadingState(false);
    }
  };

  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(Math.max(textarea.scrollHeight, 200), 500);
      textarea.style.height = newHeight + "px";
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [inputs.field2.value]);

  useEffect(() => {
    if (isEditMode) {
      adjustHeight();
    }
  }, [isEditMode]);

  const getCategoryColor = (category) => {
    switch (category) {
      case "광고/마케팅":
        return "Red";
      case "교육":
        return "LavenderMagenta";
      case "금융/보험/핀테크":
        return "Amethyst";
      case "게임":
        return "VistaBlue";
      case "모빌리티/교통":
        return "BlueYonder";
      case "물류":
        return "MidnightBlue";
      case "부동산/건설":
        return "ButtonBlue";
      case "뷰티/화장품":
        return "ButtonBlue";
      case "AI/딥테크/블록체인":
        return "MiddleBlueGreen";
      case "소셜미디어/커뮤니티":
        return "GreenSheen";
      case "여행/레저":
        return "TropicalRainForest";
      case "유아/출산":
        return "DollarBill";
      case "인사/비즈니스":
        return "Olivine";
      case "제조/하드웨어":
        return "ChineseGreen";
      case "커머스":
        return "Jonquil";
      case "콘텐츠/예술":
        return "PastelOrange";
      case "통신/보안/데이터":
        return "Tangerine";
      case "패션":
        return "Copper";
      case "푸드/농업":
        return "Shadow";
      case "환경/에너지":
        return "Tuscany";
      case "홈리빙":
        return "VeryLightTangelo";
      case "헬스케어/바이오":
        return "Orange";
      case "피트니스/스포츠":
        return "CarnationPink";
      case "법률":
        return "TurkishRose";
      case "펫":
        return "SuperPink";
      case "기타":
        return "NavyBlue";
      default:
        return "";
    }
  };

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  const data = {
    business_idea: businessAnalysis.input,
  };

  useEffect(() => {
    if (projectId) {
      setIsProjectIdReady(true);
    }
  }, [projectId]);

  //비즈니스 분석과 카테고리 정보 로드
  useEffect(() => {
    const loadBusinessAnalysis = async () => {
      if (!isProjectIdReady) return;

      let businessData;
      let categoryData;
      let attempts = 0;
      const maxAttempts = 5;

      try {
        if (personaButtonState1 === 1) {
          setIsLoadingBusinessAnalysis(true);
          // console.log("data", data);
          // 버튼 클릭으로 API 호출
          // let response = await axios.post(
          //   "https://wishresearch.kr/person/business_category",
          //   data,
          //   axiosConfig
          // );
          // 비즈니스 카테고리 분석 수정 예정
          let response = await BusinessCategoryAnalysis(data, isLoggedIn);

          // 필요한 데이터가 없을 경우 재시도, 최대 5번
          while (
            attempts < maxAttempts &&
            (!response ||
              !response.response ||
              typeof response.response !== "object" ||
              !response.response.hasOwnProperty("business_analysis") ||
              !response.response.hasOwnProperty("category") ||
              !response.response.business_analysis.hasOwnProperty("명칭") ||
              !response.response.business_analysis.hasOwnProperty(
                "주요_목적_및_특징"
              ) ||
              !response.response.business_analysis.hasOwnProperty("주요기능") ||
              !response.response.business_analysis["명칭"] ||
              !response.response.business_analysis["주요_목적_및_특징"]
                .length ||
              !response.response.business_analysis["주요기능"].length ||
              !response.response.category.hasOwnProperty("first") ||
              !response.response.category.first ||
              response.response.category.first === "기타")
          ) {
            attempts += 1;

            // response = await axios.post(
            //   "https://wishresearch.kr/person/business_category",
            //   data,
            //   axiosConfig
            // );
            // 비즈니스 카테고리 분석 수정 예정
            response = await BusinessCategoryAnalysis(data, isLoggedIn);
          }

          businessData = response.response.business_analysis;
          categoryData = response.response.category;

          const updatedBusinessAnalysis = {
            input: businessAnalysis.input,
            title: businessData["명칭"],
            characteristics: businessData["주요_목적_및_특징"],
            features: businessData["주요기능"],
            category: categoryData,
          };

          if (attempts >= maxAttempts) {
            setShowErrorPopup(true);
            return;
          } else {
            setPersonaButtonState1(0);
            setBusinessAnalysis(updatedBusinessAnalysis);
            await updateProjectOnServer(
              projectId,
              {
                businessAnalysis: updatedBusinessAnalysis,
              },
              isLoggedIn
            );
          }
        }
        setCategoryColor({
          first: getCategoryColor(categoryData.first),
          second: getCategoryColor(categoryData.second),
          third: getCategoryColor(categoryData.third),
        });
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 500:
              setShowErrorPopup2(true);
              break;
            case 504:
              if (regenerateCount1 >= 3) {
                setShowErrorPopup2(true);
                return;
              } else {
                setShowRegenerateButton1(true);
                setRegenerateCount1(regenerateCount1 + 1);
              }
              break;
            default:
              setShowErrorPopup2(true);
              break;
          }
          console.error("Error details:", error);
        }
      } finally {
        setIsLoadingBusinessAnalysis(false);
      }
    };
    if (isProjectIdReady) {
      loadBusinessAnalysis();
    }
  }, [isProjectIdReady, personaButtonState1]);

  const handleRegenerate = async () => {
    setShowRegenerateButton1(false);
    setIsLoadingBusinessAnalysis(true);
    let businessData;
    let categoryData;
    let attempts = 0;
    const maxAttempts = 5;

    try {
      setIsLoading(true);
      // 버튼 클릭으로 API 호출
      // let response = await axios.post(
      //   "https://wishresearch.kr/person/business_category",
      //   data,
      //   axiosConfig
      // );
      // 비즈니스 카테고리 분석 수정 예정
      let response = await BusinessCategoryAnalysis(data, isLoggedIn);

      // 필요한 데이터가 없을 경우 재시도, 최대 5번
      while (
        attempts < maxAttempts &&
        (!response ||
          !response.response ||
          typeof response.response !== "object" ||
          !response.response.hasOwnProperty("business_analysis") ||
          !response.response.hasOwnProperty("category") ||
          !response.response.business_analysis.hasOwnProperty("명칭") ||
          !response.response.business_analysis.hasOwnProperty(
            "주요_목적_및_특징"
          ) ||
          !response.response.business_analysis.hasOwnProperty("주요기능") ||
          !response.response.business_analysis["명칭"] ||
          !response.response.business_analysis["주요_목적_및_특징"].length ||
          !response.response.business_analysis["주요기능"].length ||
          !response.response.category.hasOwnProperty("first") ||
          !response.response.category.first ||
          response.response.category.first === "기타")
      ) {
        attempts += 1;

        // response = await axios.post(
        //   "https://wishresearch.kr/person/business_category",
        //   data,
        //   axiosConfig
        // );

        // 비즈니스 카테고리 분석 수정 예정
        let response = await BusinessCategoryAnalysis(data, isLoggedIn);
      }

      businessData = response.response.business_analysis;
      categoryData = response.response.category;

      const updatedBusinessAnalysis = {
        input: businessAnalysis.input,
        title: businessData["명칭"],
        characteristics: businessData["주요_목적_및_특징"],
        features: businessData["주요기능"],
        category: categoryData,
      };
      if (attempts >= maxAttempts) {
        setShowErrorPopup(true);
        return;
      } else {
        setPersonaButtonState1(0);
        setBusinessAnalysis(updatedBusinessAnalysis);
      }
      setCategoryColor({
        first: getCategoryColor(categoryData.first),
        second: getCategoryColor(categoryData.second),
        third: getCategoryColor(categoryData.third),
      });
      await updateProjectOnServer(
        projectId,
        {
          businessAnalysis: updatedBusinessAnalysis,
        },
        isLoggedIn
      );
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowErrorPopup2(true);
            break;
          case 504:
            if (regenerateCount1 >= 3) {
              setShowErrorPopup2(true);
              return;
            } else {
              setShowRegenerateButton1(true);
              setRegenerateCount1(regenerateCount1 + 1);
            }
            break;
          default:
            setShowErrorPopup2(true);
            break;
        }
        console.error("Error details:", error);
      }
    } finally {
      setIsLoadingBusinessAnalysis(false);
    }
  };

  return (
    <>
      <Title>
        <Body2>비즈니스 분석</Body2>
        {!personaButtonState1 &&
          !isLoadingBusinessAnalysis &&
          personaStep === 1 && (
            <ButtonGroup>
              {isEditMode ? (
                <IconButton onClick={handleSaveClick}>
                  <img src={images.FolderArrowDown} alt="저장하기" />
                  <span>저장하기</span>
                </IconButton>
              ) : (
                <>
                  <IconButton onClick={handleRegenerate}>
                    <img src={images.IconRepeatSquare} alt="재생성" />
                    <span>재생성하기</span>
                  </IconButton>
                  <IconButton onClick={handleEditClick}>
                    <img src={images.PencilSquare} alt="수정하기" />
                    <span>수정하기</span>
                  </IconButton>
                </>
              )}
            </ButtonGroup>
          )}
      </Title>
      {isLoadingBusinessAnalysis ? (
        <Card>
          <AtomPersonaLoader message="비즈니스를 분석하고 있어요" />
        </Card>
      ) : showRegenerateButton1 ? (
        <Card>
          <MoleculeRecreate Large onRegenerate={handleRegenerate} />
        </Card>
      ) : isEditMode ? (
        <Card Edit>
          <FormEdit>
            <Body3 color="gray700">비즈니스 명</Body3>
            <FormBox Medium status={getInputStatus(inputs.field1)}>
              <CustomInput
                Edit
                type="text"
                placeholder="비즈니스 명을 입력해주세요."
                value={inputs.field1.value}
                onChange={(e) => {
                  if (e.target.value.length <= 30) {
                    handleChange(e, "field1");
                  }
                }}
                status={getInputStatus(inputs.field1)}
              />
            </FormBox>
          </FormEdit>

          <FormEdit>
            <Body3 color="gray700">태그</Body3>
            <FormBox Medium>
              <TagWrap>
                <Tag color={getCategoryColor(inputs.field4.value.first)} />
                <Tag color={getCategoryColor(inputs.field4.value.second)} />
                <Tag color={getCategoryColor(inputs.field4.value.third)} />
              </TagWrap>
            </FormBox>
          </FormEdit>

          <FormEdit>
            <Body3 color="gray700">비즈니스 설명</Body3>
            {showRegenerateButton2 ? (
              <FormBox regenerate>
                <MoleculeRecreate Medium onRegenerate={handleAIDetailClick} />
              </FormBox>
            ) : (
              <FormBox status={getInputStatus(inputs.field2)}>
                {loadingState ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      <SkeletonLine />
                      <SkeletonTitle />
                      <SkeletonLine />
                      <SkeletonLine />
                      <SkeletonLine />
                    </div>
                  </>
                ) : (
                  <>
                    <CustomTextarea
                      Edit
                      ref={textareaRef}
                      value={inputs.field2.value}
                      onChange={(e) => {
                        if (e.target.value.length <= 500) {
                          handleChange(e, "field2");
                          adjustHeight();
                        }
                      }}
                      status={getInputStatus(inputs.field2)}
                    />

                    <EditButtonGroup>
                      <IconButton onClick={handleUndoClick}>
                        <img src={images.ClockCounterclockwise} alt="" />
                        <span>이전으로 되돌리기</span>
                      </IconButton>
                      <IconButton onClick={handleAIDetailClick}>
                        <img src={images.MagicStick} alt="" />
                        <span>AI로 다듬기</span>
                      </IconButton>
                    </EditButtonGroup>
                  </>
                )}
              </FormBox>
            )}
          </FormEdit>
        </Card>
      ) : (
        <Card>
          <CardTitle>
            <H5 color="gray800">{businessAnalysis.title}</H5>
            <TagWrap>
              <Tag color={categoryColor.first} />
              <Tag color={categoryColor.second} />
              <Tag color={categoryColor.third} />
            </TagWrap>
            {personaStep > 2 && (
              <ToggleButton
                showContent={showCardContent}
                onClick={toggleCardContent}
              >
                {showCardContent ? "" : ""}
              </ToggleButton>
            )}
          </CardTitle>
          {showCardContent && (
            <CardContent>
              <Body3 color="gray800">{businessAnalysis.characteristics}</Body3>
            </CardContent>
          )}
        </Card>
      )}
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
      {showErrorPopup && (
        <PopupWrap
          Warning
          title="작업이 중단되었습니다"
          message="입력된 내용에 문제가 있어 페이지가 초기화되었습니다."
          message2="다시 입력해주세요."
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
      {showErrorPopup2 && (
        <PopupWrap
          Warning
          title="작업이 중단되었습니다"
          message="데이터 오류로 인해 페이지가 초기화됩니다."
          message2="작업 중인 내용은 작업관리 페이지를 확인하세요."
          buttonType="Outline"
          closeText="확인"
          onConfirm={() => {
            setShowErrorPopup2(false);
            window.location.href = "/Project";
          }}
          onCancel={() => {
            setShowErrorPopup2(false);
            window.location.href = "/Project";
          }}
        />
      )}
    </>
  );
};

export default OrganismBusinessAnalysis;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${(props) => {
    if (props.Column) return `column`;
    else return `row`;
  }};
  align-items: ${(props) => {
    if (props.Column) return `flex-start`;
    else return `center`;
  }};
  gap: ${(props) => {
    if (props.Column) return `8px`;
    else return `0`;
  }};
  width: 100%;

  div {
    font-weight: 500;
    color: ${palette.gray800};
  }

  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 0.88rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray500};

    span {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      color: ${palette.primary};
      cursor: pointer;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const EditButtonGroup = styled(ButtonGroup)`
  justify-content: end;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 24px;
  border-radius: 15px;
  border: 1px solid ${palette.outlineGray};
  background: ${palette.white};
`;

const CreateCard = styled(Card)`
  align-items: center;
  padding: 44px 24px;

  p {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    line-height: 1.5;
    color: ${palette.gray500};
  }
`;

const CardTitle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  h2 {
    font-size: 1.25rem;
    font-weight: 500;
    color: ${palette.gray800};
  }
`;

const FormEdit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  > span {
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray700};
  }
`;

const TagWrap = styled.div`
  display: flex;
  gap: 8px;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: "Pretendard", "Poppins";
  font-size: 0.75rem;
  color: ${palette.primary};
  padding: 4px 8px;
  border-radius: 100px;
  border: none;
  background: ${palette.white};
  cursor: pointer;

  &:before {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: ${(props) =>
      props.showContent
        ? "translate(-50%, -50%) rotate(225deg)"
        : "translate(-50%, -50%) rotate(45deg)"};
    width: 10px;
    height: 10px;
    border-bottom: 2px solid ${palette.gray500};
    border-right: 2px solid ${palette.gray500};
    transition: all 0.5s;
    content: "";
  }
`;

const CardContent = styled.div`
  // font-weight: 300;
  // line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;

  p + p {
    margin-top: 20px;
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
      line-height: 1.5;
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
