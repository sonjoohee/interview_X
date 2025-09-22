import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import axios from "axios";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  CONVERSATION_STAGE,
  IDEA_FEATURE_BUTTON_STATE,
  IS_EDITING_IDEA_FEATURE,
  IDEA_FEATURE_DATA,
  IDEA_REQUIREMENT_DATA,
  IDEA_FEATURE_DATA_TEMP,
  IDEA_REQUIREMENT_DATA_TEMP,
  ADDING_IDEA_FEATURE,
  ADD_CONTENT_IDEA_FEATURE,
  ACTIVE_IDEA_FEATURE_INDEX,
  EDITED_IDEA_FEATURE_TITLE,
  IS_LOGGED_IN,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";
import MoleculeReportController from "../molecules/MoleculeReportController";
import { InterviewXBusinessAnalysisModifyRequest } from "../../../../utils/indexedDB";
import {
  SkeletonTitle,
  SkeletonLine,
  Spacing,
} from "../../../../assets/styles/Skeleton";

import images from "../../../../assets/styles/Images";

const OrganismIdeaFeature = () => {
  const { saveConversation } = useSaveConversation();
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [
    mainFeaturesOfBusinessInformation,
    setMainFeaturesOfBusinessInformation,
  ] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    mainCharacteristicOfBusinessInformation,
    setMainCharacteristicOfBusinessInformation,
  ] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [
    businessInformationTargetCustomer,
    setBusinessInformationTargetCustomer,
  ] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [isLoadingIdeaFeature, setIsLoadingIdeaFeature] = useState(false);

  const [ideaFeatureButtonState, setIdeaFeatureButtonState] = useAtom(IDEA_FEATURE_BUTTON_STATE);
  const [ideaFeatureData, setIdeaFeatureData] = useAtom(IDEA_FEATURE_DATA);
  const [ideaRequirementData, setIdeaRequirementData] = useAtom(IDEA_REQUIREMENT_DATA);
  const [ideaFeatureDataTemp, setIdeaFeatureDataTemp] = useAtom(IDEA_FEATURE_DATA_TEMP);
  const [ideaRequirementDataTemp, setIdeaRequirementDataTemp] = useAtom(IDEA_REQUIREMENT_DATA_TEMP);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [isEditingIdeaFeature, setIsEditingIdeaFeature] = useAtom(IS_EDITING_IDEA_FEATURE);
  const [addingIdeaFeature, setAddingIdeaFeature] = useAtom(ADDING_IDEA_FEATURE);
  const [addContentIdeaFeature, setAddContentIdeaFeature] = useAtom(ADD_CONTENT_IDEA_FEATURE);
  const [activeIdeaFeatureIndex, setActiveIdeaFeatureIndex] = useAtom(ACTIVE_IDEA_FEATURE_INDEX);
  const [editedIdeaFeatureTitle, setEditedIdeaFeatureTitle] = useAtom(EDITED_IDEA_FEATURE_TITLE);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isPopupOpenDelete, setIsPopupOpenDelete] = useState(false);

  const togglePopupDelete = () => {
    setIsPopupOpenDelete(!isPopupOpenDelete);
  };

  const hadleAddFeature = () => {
    setAddingIdeaFeature(true);
    setActiveIdeaFeatureIndex(null);
    setEditedIdeaFeatureTitle("");
  };

  const handleAddSave = () => {
    if (addContentIdeaFeature.trim() === "") {
      setAddingIdeaFeature(false);
      return;
    }

    setIdeaFeatureData([
      ...ideaFeatureData,
      {
        title: addContentIdeaFeature,
        text: addContentIdeaFeature,
      },
    ]);

    setAddContentIdeaFeature("");
    setAddingIdeaFeature(false);
  };

  const handleFeatureClick = (index, title) => {
    if (activeIdeaFeatureIndex === index) {
      setActiveIdeaFeatureIndex(null);
    } else {
      setActiveIdeaFeatureIndex(index);
      setEditedIdeaFeatureTitle(title);
      setAddingIdeaFeature(false);
    }
  };

  const handleTitleChange = (index) => {
    const updatedFeatures = JSON.parse(JSON.stringify(ideaFeatureData)); // 깊은 복사
    updatedFeatures[index].title = editedIdeaFeatureTitle;
    updatedFeatures[index].text = editedIdeaFeatureTitle;
    setIdeaFeatureData(updatedFeatures);
    setActiveIdeaFeatureIndex(null);
  };

  const confirmDelete = (index) => {
    if(ideaFeatureData.length <= 5) return;
    
    setDeleteIndex(index);
    togglePopupDelete();
  };

  const handleDelete = () => {
    setActiveIdeaFeatureIndex(null);
    setEditedIdeaFeatureTitle("");

    setIdeaFeatureData(
      ideaFeatureData.filter((_, i) => i !== deleteIndex)
    );

    togglePopupDelete();
  };

  const generateAddtionalContent = async (index) => {

    if(index === null) {
      if (addContentIdeaFeature.trim() === "") {
        // setIsPopupEmpty(true);
        return;
      }
    } else {
      if (editedIdeaFeatureTitle.trim() === "") {
         // setIsPopupEmpty(true);
        return;
      }
    }

    try {
      setIsLoading(true);

      const data = {
        business_analysis_data: {
          business_analysis: {
            명칭: analysisReportData.title,
            주요_목적_및_특징: analysisReportData.mainFeatures,
            주요기능: analysisReportData.mainCharacter,
          }
        },
        business_analysis_data_part: "1",
        keyword: addContentIdeaFeature
      };

      // 임시로 전문가보고서 api 사용
      // const response = await axios.post(
      //   "https://wishresearch.kr/panels/business_analysis_modify",
      //   data,
      //   axiosConfig
      // );

      const response = await InterviewXBusinessAnalysisModifyRequest(
        data,
        isLoggedIn
      );
      if(index === null) {
        setIdeaFeatureData([
          ...ideaFeatureData,
          {
            title: response.response.business_analysis.추가_주요_목적_및_특징,
            text: response.response.business_analysis.추가_주요_목적_및_특징, 
          },
        ]);
      } else {
        const updatedFeatures = [...ideaFeatureData];

        updatedFeatures[index] = {
          title: response.response.business_analysis.추가_주요_목적_및_특징,
          text: response.response.business_analysis.추가_주요_목적_및_특징, 
        };


      // 응답받은 데이터가 들어가는지 확인
      // if(index === null) {
      //   setIdeaFeatureData([
      //     ...ideaFeatureData,
      //     {
      //       title: response.data.generate_data.추가_주요_목적_및_특징,
      //       text: response.data.generate_data.추가_주요_목적_및_특징, 
      //     },
      //   ]);
      // } else {
      //   const updatedFeatures = [...ideaFeatureData];

      //   updatedFeatures[index] = {
      //     title: response.data.generate_data.추가_주요_목적_및_특징,
      //     text: response.data.generate_data.추가_주요_목적_및_특징, 
      //   };

        setIdeaFeatureData(updatedFeatures);
      }

      setActiveIdeaFeatureIndex(null);
      setEditedIdeaFeatureTitle("");
      setAddContentIdeaFeature("");
      setAddingIdeaFeature(false);
      setIsLoading(false);

    } catch (error) {
      //console.error("Error loading data:", error);
    }
  };

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  useEffect(() => {
    const fetchIdeaFeature = async () => {
      try {
        if(ideaFeatureButtonState) {
          setIsLoading(true);
          setIsLoadingIdeaFeature(true);
          setIdeaFeatureButtonState(0);

          const data = {
            expert_id: "5",
            business_info: titleOfBusinessInfo,
            business_analysis_data: {
              명칭: titleOfBusinessInfo,
              주요_목적_및_특징: mainFeaturesOfBusinessInformation,
              주요기능: mainCharacteristicOfBusinessInformation,
              목표고객: businessInformationTargetCustomer,
            },
            tabs: [],
            page_index: 1
        };

          let response = await axios.post(
            "https://wishresearch.kr/panels/idea_feature_list",
            data,
            axiosConfig
          );

          let retryCount = 0;
          const maxRetries = 10;

          while (retryCount < maxRetries && (
            !response || !response.data || typeof response.data !== "object" ||
            !response.data.hasOwnProperty("feature_requirements_list") ||
            !response.data.feature_requirements_list.hasOwnProperty("feature") ||
            !response.data.feature_requirements_list.hasOwnProperty("requirements")) ||
            !Array.isArray(response.data.feature_requirements_list.feature) ||
            response.data.feature_requirements_list.feature.some(item => 
              !item.hasOwnProperty("title") || 
              !item.hasOwnProperty("text")
            ) ||
            !Array.isArray(response.data.feature_requirements_list.requirements) ||
            response.data.feature_requirements_list.requirements.some(item => 
              !item.hasOwnProperty("title") || 
              !item.hasOwnProperty("text")
            )
          ) {
            response = await axios.post(
              "https://wishresearch.kr/panels/idea_feature_list",
              data,
              axiosConfig
            );
            retryCount++;
          }
          if (retryCount === maxRetries) {
           // console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
            // 에러 처리 로직 추가
            throw new Error("Maximum retry attempts reached. Empty response persists.");
          }

          let updatedFeatureRequirementList = response.data.feature_requirements_list;

          setIdeaFeatureData(updatedFeatureRequirementList.feature);
          setIdeaRequirementData(updatedFeatureRequirementList.requirements);
          setIdeaFeatureDataTemp(updatedFeatureRequirementList.feature);
          setIdeaRequirementDataTemp(updatedFeatureRequirementList.requirements);
          setEditedIdeaFeatureTitle(updatedFeatureRequirementList.feature[0].title);

          setIsLoading(false);
          setIsLoadingIdeaFeature(false);

          const updatedConversation = [...conversation];

          updatedConversation.push(
            {
              type: "system",
              message: "주요 기능 및 특성을 확인하셨다면, 고객의 요구사항을 확인해보겠습니다.",
              expertIndex: selectedExpertIndex,
            },
            {
              type: 'ideaCustomerButton',
            },
          );
          setConversation(updatedConversation);
          setConversationStage(3);

          await saveConversation(
            { changingConversation: { conversation: updatedConversation, conversationStage: 3, ideaFeatureData : updatedFeatureRequirementList.feature, ideaRequirementData : updatedFeatureRequirementList.requirements, } }
          );
        }
      } catch (error) {
      //  console.error("Error loading Idea Feature:", error);
      }
    };

    fetchIdeaFeature();
  }, [ideaFeatureButtonState]);

  return (
    <Wrap>
      {isLoadingIdeaFeature ? (
        <>
          <SkeletonTitle className="title-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <Spacing />
          <SkeletonTitle className="title-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <SkeletonLine className="content-placeholder" />
        </>
      ) : (
        <>
        <h1>{titleOfBusinessInfo}의 기능 및 특성</h1>

        {isEditingIdeaFeature ?
        <>
          <p>최소 5개 ~ 최대 10개까지 입력이 가능합니다</p>
          <IdeaList>
          {ideaFeatureData.map((feature, index) => (
            <IdeaListDiv None
              key={index} 
              isActive={activeIdeaFeatureIndex === index}
            >
            {activeIdeaFeatureIndex === index ? (
                <input
                  value={editedIdeaFeatureTitle}
                  onChange={(e) => setEditedIdeaFeatureTitle(e.target.value)}
                  autoFocus
                />
              ) : (
                <div onClick={() => handleFeatureClick(index, feature.title)}>
                  {feature.title}
                </div>
              )}
              {activeIdeaFeatureIndex === index && (
                <>
                  {/* <button onClick={() => generateAddtionalContent(index)}>
                    <img src={images.IconMagic} alt="" />
                  </button> */}
                  <button onClick={() => handleTitleChange(index)}>
                    <img src={images.IconEdit2} alt="" />
                  </button>
                  <button onClick={() => confirmDelete(index)}>
                    <img src={images.IconDelete2} alt="" />
                  </button>
                </>
              )}
            </IdeaListDiv>
          ))}
          {ideaFeatureData.length < 10 && 
            <>
            {addingIdeaFeature ? (
              <IdeaListDiv None
                isActive={addingIdeaFeature}
              >
                <input
                  value={addContentIdeaFeature}
                  onChange={(e) => setAddContentIdeaFeature(e.target.value)}
                  placeholder="새로운 기능 및 특성을 추가해보세요"
                  autoFocus
                />
                  {/* <button onClick={() => generateAddtionalContent(null)}>
                    <img src={images.IconMagic} alt="" />
                  </button> */}
                  <button onClick={() => handleAddSave()}>
                    <img src={images.IconEdit2} alt="" />
                  </button>
                  <button onClick={() => {
                      setAddingIdeaFeature(false);
                      setAddContentIdeaFeature("");
                    }}
                  >
                    <img src={images.IconDelete2} alt="" />
                  </button>
              </IdeaListDiv>
            ) : (
                <button
                  onClick={() => hadleAddFeature()}
                >
                  + 추가하기
                </button>
            )
          }
          </>
          }
          </IdeaList>
          {isPopupOpenDelete && (
            <Popup
              Cancel
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  togglePopupDelete();
                }
              }}
            >
              <div>
                <button
                  type="button"
                  className="closePopup"
                  onClick={togglePopupDelete}
                >
                  닫기
                </button>
                <span>
                  <img src={images.ExclamationMark} alt="" />
                </span>
                <p>
                  <strong>정말 삭제하시겠습니까?</strong>
                  <span>삭제된 내용은 복구 할 수 없습니다.</span>
                </p>
                <div className="btnWrap">
                  <button type="button" onClick={togglePopupDelete}>
                    취소
                  </button>
                  <button type="button" onClick={handleDelete}>
                    확인
                  </button>
                </div>
              </div>
            </Popup>
          )}
        </>
        :
        <>
          <p>총 {ideaFeatureData.length}개의 주요 기능을 도출하였습니다</p>
          <IdeaList>
          {ideaFeatureData.map((feature, index) => (
            <div key={index}>
              <span>{index + 1}</span>
              {feature.title}
            </div>
          ))}
          </IdeaList>
        </>
        }

        {!isLoadingIdeaFeature && (
          <MoleculeReportController
            reportIndex={5}
            ideaFeatureRequirement={"feature"}
          />
        )}
        </>
      )}
    </Wrap>
  );
};

export default OrganismIdeaFeature;

const Wrap = styled.div`
  max-width:657px;
  // width:100%;
  display:flex;
  flex-direction:column;
  padding: 20px;
  margin:24px 0 0 50px;
  border-radius:15px;
  border:1px solid ${palette.outlineGray};

  h1 {
    font-size:1rem;
    font-weight:700;
    text-align:left;
    padding-bottom:8px;
    margin-bottom:16px;
    border-bottom:1px solid ${palette.lineGray};
  }

  p {
    font-size:0.88rem;
    color:${palette.gray500};
    text-align:left;
  }
`;

const IdeaList = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
  gap:4px;
  margin-top:16px;

  > div {
    display:flex;
    align-items:center;
    gap:12px;
    width:49.5%;
    min-height:35px;
    font-size:0.88rem;
    color:${palette.gray700};
    padding:4px 6px;
    border-radius:12px;
    background:${palette.chatGray};  
  }

  span {
    width:27px;
    height:27px;
    line-height:26px;
    text-align:center;
    border-radius:100%;
    border:1px solid ${palette.lineGray};
    background:${palette.white};
  }

  > button {
    display:flex;
    align-items:center;
    width:49.5%;
    min-height:35px;
    font-family: Pretendard, Poppins;
    font-size:0.88rem;
    color:${palette.gray500};
    padding:4px 16px;
    border-radius:12px;
    border:1px solid ${palette.lineGray};
    background:${palette.gray50};
  }
`;

const IdeaListDiv = styled.div`
  gap:5px !important;
  padding:4px 10px 4px 16px !important;
  border: ${props => (
    props.isActive 
    ? '2px solid blue' 
    : `1px solid ${palette.lineGray}`
  )}; 
  background:${palette.white} !important;
  
  > * {
    flex:1 1 auto;
    text-align:left;
  }

  input {
    width:inherit;
    font-family: Pretendard, Poppins;
    border:0;
    outline:none;
  }

  button {
    max-width:21px;
    height:21px;
    text-align:center;
    border:0;
    background:none;
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
      text-align:center;
      margin: 20px auto 24px;
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