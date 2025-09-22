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
  IDEA_CUSTOMER_BUTTON_STATE,
  IS_EDITING_IDEA_CUSTOMER,
  IDEA_REQUIREMENT_DATA,
  ADDING_IDEA_CUSTOMER,
  ADD_CONTENT_IDEA_CUSTOMER,
  ACTIVE_IDEA_CUSTOMER_INDEX,
  EDITED_IDEA_CUSTOMER_TITLE,
  IS_LOGGED_IN,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";
import MoleculeReportController from "../molecules/MoleculeReportController";
import { InterviewXBusinessAnalysisModifyRequest } from "../../../../utils/indexedDB";

import {
  SkeletonTitle,
  SkeletonLine,
} from "../../../../assets/styles/Skeleton";

import images from "../../../../assets/styles/Images";

const OrganismIdeaCustomer = () => {
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
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [isLoadingIdeaCustomer, setIsLoadingIdeaCustomer] = useState(false);
  const [ideaCustomerButtonState, setIdeaCustomerButtonState] = useAtom(IDEA_CUSTOMER_BUTTON_STATE);
  const [ideaRequirementData, setIdeaRequirementData] = useAtom(IDEA_REQUIREMENT_DATA);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);

  const [isEditingIdeaCustomer, setIsEditingIdeaCustomer] = useAtom(IS_EDITING_IDEA_CUSTOMER);
  const [addingIdeaCustomer, setAddingIdeaCustomer] = useAtom(ADDING_IDEA_CUSTOMER);
  const [addContentIdeaCustomer, setAddContentIdeaCustomer] = useAtom(ADD_CONTENT_IDEA_CUSTOMER);
  const [activeIdeaCustomerIndex, setActiveIdeaCustomerIndex] = useAtom(ACTIVE_IDEA_CUSTOMER_INDEX);
  const [editedIdeaCustomerTitle, setEditedIdeaCustomerTitle] = useAtom(EDITED_IDEA_CUSTOMER_TITLE);

  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isPopupOpenDelete, setIsPopupOpenDelete] = useState(false);

  const togglePopupDelete = () => {
    setIsPopupOpenDelete(!isPopupOpenDelete);
  };

  const hadleAddCustomer = () => {
    setAddingIdeaCustomer(true);
    setActiveIdeaCustomerIndex(null);
    setEditedIdeaCustomerTitle("");
  };

  const handleAddSave = () => {
    if (addContentIdeaCustomer.trim() === "") {
      setAddingIdeaCustomer(false);
      return;
    }

    setIdeaRequirementData([
      ...ideaRequirementData,
      {
        title: addContentIdeaCustomer,
        text: addContentIdeaCustomer,
      },
    ]);

    setAddContentIdeaCustomer("");
    setAddingIdeaCustomer(false);
  };

  const handleCustomerClick = (index, title) => {
    if (activeIdeaCustomerIndex === index) {
      setActiveIdeaCustomerIndex(null);
    } else {
      setActiveIdeaCustomerIndex(index);
      setEditedIdeaCustomerTitle(title);
      setAddingIdeaCustomer(false);
    }
  };

  const handleTitleChange = (index) => {
    const updatedFeatures = JSON.parse(JSON.stringify(ideaRequirementData)); // 깊은 복사
    updatedFeatures[index].title = editedIdeaCustomerTitle;
    updatedFeatures[index].text = editedIdeaCustomerTitle;
    setIdeaRequirementData(updatedFeatures);
    setActiveIdeaCustomerIndex(null);
  };

  const confirmDelete = (index) => {
    if(ideaRequirementData.length <= 5) return;

    setDeleteIndex(index);
    togglePopupDelete();
  };

  const handleDelete = () => {
    setActiveIdeaCustomerIndex(null);
    setEditedIdeaCustomerTitle("");

    setIdeaRequirementData(
      ideaRequirementData.filter((_, i) => i !== deleteIndex)
    );

    togglePopupDelete();
  };

  const generateAddtionalContent = async (index) => {

    if(index === null) {
      if (addContentIdeaCustomer.trim() === "") {
        // setIsPopupEmpty(true);
        return;
      }
    } else {
      if (editedIdeaCustomerTitle.trim() === "") {
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
        keyword: addContentIdeaCustomer
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
        setIdeaRequirementData([
          ...ideaRequirementData,
          {
            title: response.response.business_analysis.추가_주요_목적_및_특징, // 데이터 구조에 맞게 수정
            text: response.response.business_analysis.추가_주요_목적_및_특징, 
          },
        ]);
      } else {
        const updatedFeatures = [...ideaRequirementData];

        updatedFeatures[index] = {
          title: response.response.business_analysis.추가_주요_목적_및_특징, // 데이터 구조에 맞게 수정
          text: response.response.business_analysis.추가_주요_목적_및_특징, 
        };


      // 응답받은 데이터가 들어가는지 확인
      // if(index === null) {
      //   setIdeaRequirementData([
      //     ...ideaRequirementData,
      //     {
      //       title: response.data.generate_data.추가_주요_목적_및_특징,
      //       text: response.data.generate_data.추가_주요_목적_및_특징, 
      //     },
      //   ]);
      // } else {
      //   const updatedFeatures = [...ideaRequirementData];

      //   updatedFeatures[index] = {
      //     title: response.data.generate_data.추가_주요_목적_및_특징,
      //     text: response.data.generate_data.추가_주요_목적_및_특징, 
      //   };

        setIdeaRequirementData(updatedFeatures);
      }

      setActiveIdeaCustomerIndex(null);
      setEditedIdeaCustomerTitle("");
      setAddContentIdeaCustomer("");
      setAddingIdeaCustomer(false);
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

      if(ideaCustomerButtonState) {
        setIdeaCustomerButtonState(0);

        const updatedConversation = [...conversation];

        updatedConversation.push(
          {
            type: "system",
            message: "고객 요구사항을 확인하셨다면, 이제 주요 기능 및 특성과 고객 요구 사항을 기반으로 다양한 아이디어를 발상하는 단계입니다.\n제가 최대한 많은 아이디어를 도출해볼게요 🙌🏻",
            expertIndex: selectedExpertIndex,
          },
          {
            type: 'ideaGenerateButton',
          },
        );
        setConversation(updatedConversation);

        await saveConversation(
          { changingConversation: { conversation: updatedConversation, conversationStage: 3 } }
        );
      }
    };

    fetchIdeaFeature();
  }, [ideaCustomerButtonState]);

  return (
    <Wrap>
        <h1>{titleOfBusinessInfo}의 고객 요구 사항</h1>

        {isEditingIdeaCustomer ?
        <>
          <p>최소 5개 ~ 최대 10개까지 입력이 가능합니다</p>
          <IdeaList>
          {ideaRequirementData.map((requirement, index) => (
            <IdeaListDiv None
              key={index} 
              isActive={activeIdeaCustomerIndex === index}
            >
              {activeIdeaCustomerIndex === index ? (
                <input
                  value={editedIdeaCustomerTitle}
                  onChange={(e) => setEditedIdeaCustomerTitle(e.target.value)}
                  autoFocus
                />
              ) : (
                <div onClick={() => handleCustomerClick(index, requirement.title)}>
                  {requirement.title}
                </div>
              )}
              {activeIdeaCustomerIndex === index && (
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
          {ideaRequirementData.length < 10 && 
            <>
            {addingIdeaCustomer ? (
              <IdeaListDiv None
                isActive={addingIdeaCustomer}
              >
                <input
                  value={addContentIdeaCustomer}
                  onChange={(e) => setAddContentIdeaCustomer(e.target.value)}
                  placeholder="새로운 고객 요구 사항을 추가해보세요"
                  autoFocus
                />
                  {/* <button onClick={() => generateAddtionalContent(null)}>
                    <img src={images.IconMagic} alt="" />
                  </button> */}
                  <button onClick={() => handleAddSave()}>
                    <img src={images.IconEdit2} alt="" />
                  </button>
                  <button onClick={() => {
                      setAddingIdeaCustomer(false);
                      setAddContentIdeaCustomer("");
                    }}
                  >
                    <img src={images.IconDelete2} alt="" />
                  </button>
                </IdeaListDiv>
            ) : (
                <button
                  onClick={() => hadleAddCustomer()}
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
          <p>총 {ideaRequirementData.length}개의 고객 요구 사항을 도출하였습니다</p>
          <IdeaList>
          {ideaRequirementData.map((requirement, index) => (
            <div key={index}>
              <span>{index + 1}</span>
              {requirement.title}
            </div>
          ))}
          </IdeaList>
        </>
        }

        {!isLoadingIdeaCustomer && (
          <MoleculeReportController
            reportIndex={5}
            ideaFeatureRequirement={"customer"}
          />
        )}
    </Wrap>
  );
};

export default OrganismIdeaCustomer;

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