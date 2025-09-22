import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../assets/styles/Palette";
import AtomPersonaLoader from "../../Global/atoms/AtomPersonaLoader";
import MoleculeHeader from "../../Global/molecules/MoleculeHeader";
import { Button, IconButton } from "../../../assets/styles/ButtonStyle";
import {
  FormBox,
  CustomTextarea,
  CustomInput,
  SelectBox,
  SelectBoxItem,
  SelectBoxItem2,
  SelectBoxTitle,
  SelectBoxList,
} from "../../../assets/styles/InputStyle";
import PopupWrap from "../../../assets/styles/Popup";
import {
  ContentsWrap,
  MainContent,
  TabWrapType5,
  TabButtonType5,
  TabContent5,
  TabContent5Item,
  StyledDropzone,
  DropzoneStyles,
  ListBoxGroup,
  Title,
} from "../../../assets/styles/BusinessAnalysisStyle";
import {
  IS_LOGGED_IN,
  PROJECT_ID,
  PROJECT_CREATE_INFO,
  PROJECT_TOTAL_INFO,
  PROJECT_EDUCATION_STATE,
  PROJECT_EDUCATION_CODE,
} from "../../AtomStates";
import images from "../../../assets/styles/Images";
import { H2, Sub3, Body1, Body2 } from "../../../assets/styles/Typography";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

import { useDynamicViewport } from "../../../assets/DynamicViewport";
import { useNavigate } from "react-router-dom";
import {
  createProjectOnServerSaas,
  InterviewXProjectAnalysisMultimodalRequest,
  InterviewXProjectAnalysisRequest,
} from "../../../utils/indexedDB";

const PageProjectCreate = () => {
  const navigate = useNavigate();

  const [projectTotalInfo, setProjectTotalInfo] = useAtom(PROJECT_TOTAL_INFO);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [, setprojectId] = useAtom(PROJECT_ID);
  const [projectCreateInfo, setProjectCreateInfo] =
    useAtom(PROJECT_CREATE_INFO);
  const [projectEducationState, setProjectEducationState] = useAtom(
    PROJECT_EDUCATION_STATE
  );
  // console.log(
  //   "🚀 ~ PageProjectCreate ~ projectEducationState:",
  //   projectEducationState
  // );
  const [projectEducationCode, setProjectEducationCode] = useAtom(
    PROJECT_EDUCATION_CODE
  );
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showPopupError, setShowPopupError] = useState(false);
  const [showPopupError2, setShowPopupError2] = useState(false);
  const [isLoading] = useState(false);
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [showPopupSave, setShowPopupSave] = useState(false);
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [, setShowPopupFileSize] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [editingTargetText, setEditingTargetText] = useState("");
  const targetTextareaRef = useRef(null);
  const [isSkipped, setIsSkipped] = useState(false);

  // 각 셀렉트박스의 열림/닫힘 상태를 개별적으로 관리
  const [selectBoxStates, setSelectBoxStates] = useState({
    business: false,
    industry: false,
    country: false,
  });

  // 각 셀렉트박스의 방향 상태 추가
  const [dropUpStates, setDropUpStates] = useState({
    business: false,
    industry: false,
    country: false,
  });

  // 각 셀렉트박스 ref 생성
  const businessRef = useRef(null);
  const industryRef = useRef(null);
  const countryRef = useRef(null);

  // 각 셀렉트박스의 선택된 값을 관리하는 state 추가
  const [selectedValues, setSelectedValues] = useState({
    business: "",
    industry: "",
    country: "",
  });

  // 각 필드의 값을 관리하는 state 추가
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [business, setBusiness] = useState("");
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("");

  // isLoadingScenario를 state로 변경
  const [isLoadingScenario, setIsLoadingScenario] = useState(false);

  // textarea ref 추가
  const textareaRef = useRef(null);

  // textarea 높이 자동 조절 함수
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  // textarea 내용이 변경될 때와 editing 모드가 변경될 때마다 높이 조절
  useEffect(() => {
    if (isEditing) {
      // setTimeout을 사용하여 DOM 업데이트 후 높이 조절
      setTimeout(() => {
        adjustTextareaHeight();
      }, 0);
    }
  }, [editingText, isEditing]);

  // handleInputChange 함수 수정
  const handleInputChange = (field, value) => {
    // formData 대신 개별 상태 업데이트
    if (field === "projectName") {
      setProjectName(value);
    } else if (field === "projectDescription") {
      setProjectDescription(value);
    } else if (field === "business") {
      setBusiness(value);
    } else if (field === "industry") {
      setIndustry(value);
    } else if (field === "country") {
      setCountry(value);
    }
  };

  // 셀렉트박스 토글 함수 수정
  const toggleSelectBox = (boxName, event) => {
    if (completedSteps.includes(2)) return;
    const selectBox = event.currentTarget;
    const rect = selectBox.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceNeeded = 250; // 셀렉트박스 드롭다운의 대략적인 높이

    // 아래 공간이 부족하면 위로 표시
    setDropUpStates((prev) => ({
      ...prev,
      [boxName]: spaceBelow < spaceNeeded,
    }));

    setSelectBoxStates((prev) => ({
      ...prev,
      [boxName]: !prev[boxName],
    }));
  };
  const getRandomThumbnail = () => {
    const randomNum = Math.floor(Math.random() * 20) + 1;
    const thumbnailKey = `ProjectThumbnail${String(randomNum).padStart(
      2,
      "0"
    )}`;
    return thumbnailKey;
  };

  // 외부 클릭 감지 핸들러
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (businessRef.current && !businessRef.current.contains(event.target)) {
        setSelectBoxStates((prev) => ({ ...prev, business: false }));
      }
      if (industryRef.current && !industryRef.current.contains(event.target)) {
        setSelectBoxStates((prev) => ({ ...prev, industry: false }));
      }
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setSelectBoxStates((prev) => ({ ...prev, country: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectBoxClick = () => {
    setIsSelectBoxOpen(!isSelectBoxOpen);
    setDropUp(!dropUp);
  };

  // handleSubmitBusinessInfo 함수 수정
  const handleSubmitBusinessInfo = async () => {
    if (activeTab === 1) {
      // setCompletedSteps((prev) => [...prev, 1]);
      setActiveTab(2);
    } else if (activeTab === 2) {
      setCompletedSteps((prev) => [...prev, 2]);
      setActiveTab(3);
      setIsLoadingScenario(true);

      // API 전송 및 이미지 업로드 처리s
      try {
        const timeStamp = new Date().getTime();

        const data = {
          project_name: projectName,
          product_description: projectDescription,
          business_model: business,
          industry_type: industry,
          target_country: country,
          tool_id: Date.now(),
          files: uploadedFiles,
        };

        let response = await InterviewXProjectAnalysisMultimodalRequest(
          data,
          isLoggedIn
        );
        let RetryCount = 0;
        const MaxRetries = 10;

        while (
          RetryCount < MaxRetries &&
          (!response ||
            !response.response ||
            !response.response.project_analysis_multimodal ||
            !response.response.project_analysis_multimodal.business_analysis ||
            !response.response.project_analysis_multimodal.file_analysis ||
            !response.response.project_analysis_multimodal.target_customer)
        ) {
          response = await InterviewXProjectAnalysisMultimodalRequest(
            data,
            isLoggedIn
          );
          RetryCount++;
        }

        if (RetryCount >= MaxRetries) {
          setShowPopupError(true);
          return;
        }

        // setFileNames(
        //   uploadedFiles.map((file, index) => ({
        //     id: "file_" + timeStamp + "_" + (index + 1),
        //     name: file.name,
        //   }))
        // );

        setProjectCreateInfo(response.response.project_analysis_multimodal);

        setEditingText({
          business_analysis:
            response.response.project_analysis_multimodal.business_analysis,
          file_analysis:
            response.response.project_analysis_multimodal.file_analysis,
        });
        setEditingTargetText(
          response.response.project_analysis_multimodal.target_customer
        );

        const projectTotalData = {
          projectTitle: projectName,
          projectDescription: projectDescription,
          businessModel: business,
          industryType: industry,
          targetCountry: country,
          projectAnalysis: response.response.project_analysis_multimodal,
          files: uploadedFiles.map((file, index) => ({
            id: "file_" + timeStamp + "_" + (index + 1),
            name: file.name,
          })),
          thumbnail: getRandomThumbnail(),
          projectEducationState: projectEducationState,
          projectEducationCode: projectEducationCode,
        };
        setProjectTotalInfo(projectTotalData);
      } catch (error) {
      } finally {
        setIsLoadingScenario(false);
      }
    }
  };

  // handlePurposeSelect 함수 수정
  const handlePurposeSelect = (value, field) => {
    setSelectedValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    handleInputChange(field, value);
    setSelectBoxStates((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  // isRequiredFieldsFilled 함수 수정
  const isRequiredFieldsFilled = () => {
    if (activeTab === 1) {
      // 탭 1의 모든 필수 필드가 채워져 있는지 확인
      return (
        projectName.trim() !== "" &&
        projectDescription.trim() !== "" &&
        business !== "" &&
        industry !== "" &&
        country !== ""
      );
    }
    // 탭 2의 경우 파일 업로드 여부 확인
    else if (activeTab === 2) {
      return fileNames.length > 0;
    }
    // 다른 탭의 경우
    return true;
  };

  // 파일 업로드 핸들러
  const handleChangeStatus = ({ meta, file, remove }, status) => {
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize && status !== "removed") {
      setShowPopupFileSize(true);
      remove();
      return;
    }

    // 파일 상태 업데이트
    if (status === "done" || status === "preparing" || status === "uploading") {
      setUploadedFiles((prev) => {
        if (!prev.find((f) => f.name === file.name)) {
          setFileNames((prev) => [...prev, file.name]);
          return [...prev, file];
        }
        return prev;
      });
    } else if (status === "removed") {
      setUploadedFiles((prev) => prev.filter((f) => f.name !== file.name));
      setFileNames((prev) => prev.filter((name) => name !== file.name));
    }

    // 파일 크기를 KB 또는 MB 단위로 변환
    const size = file.size;
    const sizeStr =
      size > 1024 * 1024
        ? `${(size / (1024 * 1024)).toFixed(1)}MB`
        : `${(size / 1024).toFixed(1)}KB`;

    // setTimeout을 사용하여 DOM이 업데이트된 후 실행
    setTimeout(() => {
      const containers = document.querySelectorAll(".dzu-previewContainer");
      containers.forEach((container) => {
        if (!container.dataset.filename) {
          container.dataset.filename = file.name;
          container.dataset.size = sizeStr;

          // 이미지 파일인 경우 PDF처럼 파일명 요소 추가
          if (file.type.startsWith("image/")) {
            // 기존 dzu-previewFileName이 없는 경우에만 추가
            if (!container.querySelector(".dzu-previewFileName")) {
              const nameSpan = document.createElement("span");
              nameSpan.className = "dzu-previewFileName";
              nameSpan.textContent = `${file.name}, ${sizeStr}`;

              // 컨테이너의 첫 번째 자식으로 추가
              if (container.firstChild) {
                container.insertBefore(nameSpan, container.firstChild);
              } else {
                container.appendChild(nameSpan);
              }
            }
          }
        }
      });
    }, 0);
  };

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  // 스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 다음 단계로 이동하는 함수
  const handleNextStep = (currentStep) => {
    setCompletedSteps([...completedSteps, currentStep]);
    setActiveTab(currentStep + 1);
    setShowPopupError(false);
  };

  // handleSkip 함수 수정
  const handleSkip = async () => {
    if (activeTab === 2) {
      setCompletedSteps((prev) => [...prev, 2]);
      setIsSkipped(true);
      setActiveTab(3);
      setFileNames([]);
      setIsLoadingScenario(true);

      // API 전송 및 이미지 업로드 처리
      try {
        const datas = {
          project_name: projectName,
          product_description: projectDescription,
          business_model: business,
          industry_type: industry,
          target_country: country,
        };

        let response = await InterviewXProjectAnalysisRequest(
          datas,
          isLoggedIn
        );

        let RetryCount = 0;
        const MaxRetries = 10;

        while (
          RetryCount < MaxRetries &&
          (!response ||
            !response.response ||
            !response.response.project_analysis ||
            !response.response.project_analysis.business_analysis ||
            !response.response.project_analysis.target_customer)
        ) {
          response = await InterviewXProjectAnalysisRequest(datas, isLoggedIn);
          RetryCount++;
        }

        if (RetryCount >= MaxRetries) {
          setShowPopupError(true);
          return;
        }

        setProjectCreateInfo(response.response.project_analysis);

        setEditingText({
          business_analysis:
            response.response.project_analysis.business_analysis,
        });
        setEditingTargetText(
          response.response.project_analysis.target_customer
        );

        const projectTotalData = {
          projectTitle: response.project_name,
          projectDescription: response.product_description,
          businessModel: response.business_model,
          industryType: response.industry_type,
          targetCountry: response.target_country,
          projectAnalysis: response.response.project_analysis,
          thumbnail: getRandomThumbnail(),
          projectEducationState: projectEducationState,
          projectEducationCode: projectEducationCode,
        };
        setProjectTotalInfo(projectTotalData);
      } catch (error) {
      } finally {
        setIsLoadingScenario(false);
      }
    }
  };

  // 수정하기 버튼 클릭 핸들러 추가
  const handleEditClick = () => {
    setEditingText(
      projectCreateInfo.business_analysis +
        (projectCreateInfo.file_analysis ? projectCreateInfo.file_analysis : "")
    );
    setIsEditing(!isEditing);
  };

  // 타겟 고객군 수정하기 버튼 클릭 핸들러
  const handleEditTargetClick = () => {
    setIsEditingTarget(!isEditingTarget);
  };

  // 타겟 textarea 높이 자동 조절
  useEffect(() => {
    if (isEditingTarget && targetTextareaRef.current) {
      setTimeout(() => {
        targetTextareaRef.current.style.height = "auto";
        targetTextareaRef.current.style.height =
          targetTextareaRef.current.scrollHeight + "px";
      }, 0);
    }
  }, [editingTargetText, isEditingTarget]);

  const handleCreateProject = async () => {
    // 필수 필드 검사
    if (
      !projectTotalInfo.projectTitle ||
      !projectTotalInfo.projectDescription ||
      !projectTotalInfo.businessModel ||
      !projectTotalInfo.industryType ||
      !projectTotalInfo.targetCountry ||
      !projectTotalInfo.projectAnalysis?.business_analysis ||
      !projectTotalInfo.projectAnalysis?.target_customer
      // 건너뛰기 하지 않은 경우에만 파일 관련 검증
      // (!isSkipped &&
      //   (!projectTotalInfo.files ||
      //     !projectTotalInfo.projectAnalysis?.file_analysis))
      //교육 여부 확인용
    ) {
      setShowPopupError2(true);
      return;
    }

    try {
      const newProjectId = await createProjectOnServerSaas(
        projectTotalInfo,
        //교육 여부 확인""
        isLoggedIn
      );
      setprojectId(newProjectId);
      navigate(`/Project`, { replace: true });
    } catch (error) {
      setShowPopupError(true);
      console.error("프로젝트 생성 오류:", error);
    }
  };

  const handleSaveClick = async () => {
    setIsEditing(false);

    setProjectCreateInfo({
      business_analysis: editingText,
      target_customer: editingTargetText,
    });

    setProjectTotalInfo({
      ...projectTotalInfo,
      projectAnalysis: {
        business_analysis: editingText,
        target_customer: editingTargetText,
      },
    });
  };

  const handleSaveTargetClick = async () => {
    setIsEditingTarget(false);

    if (editingText.file_analysis) {
      setProjectCreateInfo({
        business_analysis: editingText.business_analysis,
        target_customer: editingTargetText,
        file_analysis: editingText.file_analysis,
      });
      setProjectTotalInfo({
        ...projectTotalInfo,
        projectAnalysis: {
          business_analysis: editingText.business_analysis,
          target_customer: editingTargetText,
          file_analysis: editingText.file_analysis,
        },
      });
    } else {
      setProjectCreateInfo({
        business_analysis:
          typeof editingText === "object"
            ? editingText.business_analysis
            : editingText,
        target_customer: editingTargetText,
      });
      setProjectTotalInfo({
        ...projectTotalInfo,
        projectAnalysis: {
          business_analysis:
            typeof editingText === "object"
              ? editingText.business_analysis
              : editingText,
          target_customer: editingTargetText,
        },
      });
    }
  };

  const handleUndoClick = () => {
    setEditingText(
      projectCreateInfo.business_analysis +
        (projectCreateInfo.file_analysis ? projectCreateInfo.file_analysis : "")
    );
  };

  const handleUndoTargetClick = () => {
    setEditingTargetText(projectCreateInfo.target_customer);
  };

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("projectcreate")) {
        // 세션 스토리지에서 마지막 URL 가져오기
        const lastUrl = sessionStorage.getItem("lastUrl");

        // 마지막 URL이 현재 URL과 같으면 새로고침
        if (lastUrl && lastUrl === currentUrl) {
          navigate("/Project");
          return true;
        }

        // 현재 URL 저장
        sessionStorage.setItem("lastUrl", currentUrl);
      }

      return false;
    };

    // beforeunload 이벤트 핸들러
    const handleBeforeUnload = (event) => {
      // 이벤트 취소 (표준에 따라)
      event.preventDefault();
      // Chrome은 returnValue 설정 필요
      event.returnValue = "";

      // 새로고침 시 루트 페이지로 이동
      navigate("/Project");
    };

    // F5 키 또는 Ctrl+R 감지
    const handleKeyDown = (event) => {
      if (
        (event.key === "r" && (event.metaKey || event.ctrlKey)) ||
        event.key === "F5"
      ) {
        // F5 키 코드
        event.preventDefault();
        navigate("/Project");
      }
    };

    // 함수 실행
    detectRefresh();

    // 이벤트 리스너 등록
    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <>
      <DropzoneStyles />

      <ContentsWrap>
        <MoleculeHeader />

        <MainContent>
          <ProjectCreateWrap>
            <BackButton onClick={() => navigate("/Project")}>
              <images.ChevronRight width="20px" height="20px" />
              <Sub3 color="gray500">뒤로</Sub3>
            </BackButton>

            <TabWrapType5>
              <TabButtonType5
                Num3
                isActive={activeTab >= 1}
                onClick={() => {
                  setActiveTab(1);
                  setFileNames([]); // 파일 목록 초기화
                }}
                disabled={isLoadingScenario}
              >
                <span>01</span>
                <div className="text">
                  <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                    프로젝트 정보 입력
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                Num3
                isActive={activeTab >= 2}
                onClick={() => completedSteps.includes(2) && setActiveTab(2)}
                disabled={isLoadingScenario}
              >
                <span>02</span>
                <div className="text">
                  <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    데이터 등록
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                Num3
                isActive={activeTab >= 3}
                onClick={() => completedSteps.includes(2) && setActiveTab(3)}
                disabled={!completedSteps.includes(2)}
              >
                <span>03</span>
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    프로젝트 분석 확인
                  </Body1>
                </div>
              </TabButtonType5>
            </TabWrapType5>

            {activeTab === 1 && (
              <TabContent5>
                {isLoading ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      minHeight: "200px",
                      alignItems: "center",
                    }}
                  >
                    <AtomPersonaLoader message="잠재 고객을 분석하고 있어요..." />
                  </div>
                ) : (
                  <>
                    <div className="content">
                      <H2 color="gray800" align="left">
                        새 프로젝트 정보를 입력하세요
                      </H2>
                      <TabContent5Item required>
                        <div className="title">
                          <Body1 color="gray700">
                            프로젝트 이름을 입력하세요
                          </Body1>
                        </div>
                        <CustomInput
                          type="text"
                          placeholder="프로젝트 이름"
                          value={projectName}
                          onChange={(e) =>
                            handleInputChange("projectName", e.target.value)
                          }
                          disabled={completedSteps.includes(2)}
                        />
                      </TabContent5Item>

                      <TabContent5Item required>
                        <div className="title">
                          <Body1 color="gray700">제품 / 서비스 설명</Body1>
                        </div>
                        <FormBox Large>
                          <CustomTextarea
                            Edit
                            rows={3}
                            placeholder="제품 / 서비스의 주요 설명을 입력하세요"
                            maxLength={150}
                            status="valid"
                            value={projectDescription}
                            onChange={(e) => {
                              handleInputChange(
                                "projectDescription",
                                e.target.value
                              );
                              setDescriptionLength(e.target.value.length);
                            }}
                            disabled={completedSteps.includes(2)}
                          />
                          <Body2 color="gray300" align="right">
                            {descriptionLength} / 150
                          </Body2>
                        </FormBox>
                      </TabContent5Item>

                      <TabContent5Item>
                        <div className="title">
                          <Body1 color="gray700">사업 모델</Body1>
                        </div>

                        <SelectBox ref={businessRef}>
                          <SelectBoxTitle
                            onClick={(e) => toggleSelectBox("business", e)}
                          >
                            <Body2
                              color={
                                selectedValues.business ? "gray800" : "gray300"
                              }
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              {selectedValues.business && (
                                <images.ProjectTag
                                  color={
                                    selectedValues.business === "B2C"
                                      ? "#AF52DE"
                                      : selectedValues.business === "B2B"
                                      ? "#5856D6"
                                      : selectedValues.business === "B2G"
                                      ? "#007AFF"
                                      : selectedValues.business === "B2B2C"
                                      ? "#32ADE6"
                                      : selectedValues.business === "B2B2B"
                                      ? "#30B0C7"
                                      : "#AF52DE"
                                  }
                                />
                              )}
                              {selectedValues.business || "선택해주세요"}
                            </Body2>
                            <images.ChevronDown
                              width="24px"
                              height="24px"
                              color={palette.gray500}
                              style={{
                                transform: selectBoxStates.business
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                              }}
                            />
                          </SelectBoxTitle>

                          {selectBoxStates.business && (
                            <SelectBoxList dropUp={dropUpStates.business}>
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect("B2C", "business")
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  <images.ProjectTag color="#AF52DE" />
                                  B2C
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect("B2B", "business")
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  <images.ProjectTag color="#5856D6" />
                                  B2B
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect("B2G", "business")
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  <images.ProjectTag color="#007AFF" />
                                  B2G
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect("B2B2C", "business")
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  <images.ProjectTag color="#32ADE6" />
                                  B2B2C
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect("B2B2B", "business")
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  <images.ProjectTag color="#30B0C7" />
                                  B2B2B
                                </Body2>
                              </SelectBoxItem>
                            </SelectBoxList>
                          )}
                        </SelectBox>
                      </TabContent5Item>

                      <TabContent5Item>
                        <div className="title">
                          <Body1 color="gray700">업종 선택</Body1>
                        </div>

                        <SelectBox ref={industryRef}>
                          <SelectBoxTitle
                            onClick={(e) => toggleSelectBox("industry", e)}
                          >
                            <Body2
                              color={
                                selectedValues.industry ? "gray800" : "gray300"
                              }
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                flexWrap: "nowrap",
                              }}
                            >
                              {selectedValues.industry && (
                                <img
                                  src={
                                    selectedValues.industry ===
                                    "정보통신 및 기술"
                                      ? images.ProjectInformation
                                      : selectedValues.industry ===
                                        "금융 및 법률"
                                      ? images.ProjectBanking
                                      : selectedValues.industry ===
                                        "제조 및 생산"
                                      ? images.ProjectProduction
                                      : selectedValues.industry ===
                                        "건설 및 인프라"
                                      ? images.ProjectBuild
                                      : selectedValues.industry ===
                                        "의료 및 헬스케어"
                                      ? images.ProjectMedical
                                      : selectedValues.industry ===
                                        "교육 및 공공 서비스"
                                      ? images.ProjectEducation
                                      : selectedValues.industry ===
                                        "소비재 및 라이프스타일"
                                      ? images.ProjectConsumer
                                      : images.ProjectEtc
                                  }
                                  alt=""
                                />
                              )}
                              {selectedValues.industry || "선택해주세요"}
                            </Body2>
                            <images.ChevronDown
                              width="24px"
                              height="24px"
                              color={palette.gray500}
                              style={{
                                transform: selectBoxStates.industry
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                              }}
                            />
                          </SelectBoxTitle>

                          {selectBoxStates.industry && (
                            <SelectBoxList dropUp={dropUpStates.industry}>
                              <SelectBoxItem2
                                onClick={() =>
                                  handlePurposeSelect(
                                    "정보통신 및 기술",
                                    "industry"
                                  )
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  <img src={images.ProjectInformation} alt="" />
                                  정보통신 및 기술
                                </Body2>
                              </SelectBoxItem2>
                              <SelectBoxItem2
                                onClick={() =>
                                  handlePurposeSelect(
                                    "금융 및 법률",
                                    "industry"
                                  )
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  <img src={images.ProjectBanking} alt="" />
                                  금융 및 법률
                                </Body2>
                              </SelectBoxItem2>
                              <SelectBoxItem2
                                onClick={() =>
                                  handlePurposeSelect(
                                    "제조 및 생산",
                                    "industry"
                                  )
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  <img src={images.ProjectProduction} alt="" />
                                  제조 및 생산
                                </Body2>
                              </SelectBoxItem2>
                              <SelectBoxItem2
                                onClick={() =>
                                  handlePurposeSelect(
                                    "건설 및 인프라",
                                    "industry"
                                  )
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  <img src={images.ProjectBuild} alt="" />
                                  건설 및 인프라
                                </Body2>
                              </SelectBoxItem2>
                              <SelectBoxItem2
                                onClick={() =>
                                  handlePurposeSelect(
                                    "의료 및 헬스케어",
                                    "industry"
                                  )
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  <img src={images.ProjectMedical} alt="" />
                                  의료 및 헬스케어
                                </Body2>
                              </SelectBoxItem2>
                              <SelectBoxItem2
                                onClick={() =>
                                  handlePurposeSelect(
                                    "교육 및 공공 서비스",
                                    "industry"
                                  )
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  <img src={images.ProjectEducation} alt="" />
                                  교육 및 공공 서비스
                                </Body2>
                              </SelectBoxItem2>
                              <SelectBoxItem2
                                onClick={() =>
                                  handlePurposeSelect(
                                    "소비재 및 라이프스타일",
                                    "industry"
                                  )
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  <img src={images.ProjectConsumer} alt="" />
                                  소비재 및 라이프스타일
                                </Body2>
                              </SelectBoxItem2>
                              <SelectBoxItem2
                                onClick={() =>
                                  handlePurposeSelect("기타", "industry")
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  <img src={images.ProjectEtc} alt="" />
                                  기타
                                </Body2>
                              </SelectBoxItem2>
                            </SelectBoxList>
                          )}
                        </SelectBox>
                      </TabContent5Item>

                      <TabContent5Item>
                        <div className="title">
                          <Body1 color="gray700">타겟 국가</Body1>
                        </div>

                        <SelectBox ref={countryRef}>
                          <SelectBoxTitle
                            onClick={(e) => toggleSelectBox("country", e)}
                          >
                            <Body2
                              color={
                                selectedValues.country ? "gray800" : "gray300"
                              }
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              {selectedValues.country && (
                                <img
                                  src={
                                    selectedValues.country === "대한민국"
                                      ? images.ProjectKorea
                                      : selectedValues.country === "미국"
                                      ? images.ProjectUsa
                                      : // : selectedValues.country === "중국"
                                      selectedValues.country === "일본"
                                      ? images.ProjectJapan
                                      : selectedValues.country === "대만"
                                      ? images.ProjectTaiwan
                                      : images.ProjectKorea
                                  }
                                  alt=""
                                />
                              )}
                              {selectedValues.country || "선택해주세요"}
                            </Body2>
                            <images.ChevronDown
                              width="24px"
                              height="24px"
                              color={palette.gray500}
                              style={{
                                transform: selectBoxStates.country
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                              }}
                            />
                          </SelectBoxTitle>

                          {selectBoxStates.country && (
                            <SelectBoxList dropUp={dropUpStates.country}>
                              <SelectBoxItem2
                                onClick={() =>
                                  handlePurposeSelect("대한민국", "country")
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  <img src={images.ProjectKorea} alt="" />
                                  대한민국
                                </Body2>
                              </SelectBoxItem2>
                              <SelectBoxItem2
                                onClick={() =>
                                  handlePurposeSelect("미국", "country")
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  <img src={images.ProjectUsa} alt="" />
                                  미국
                                </Body2>
                              </SelectBoxItem2>
                              {/* <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect("중국", "country")
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  <img src={images.ProjectChina} alt="" />
                                  중국
                                </Body2>
                              </SelectBoxItem> */}
                              <SelectBoxItem2
                                onClick={() =>
                                  handlePurposeSelect("일본", "country")
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  <img src={images.ProjectJapan} alt="" />
                                  일본
                                </Body2>
                              </SelectBoxItem2>
                              <SelectBoxItem2
                                onClick={() =>
                                  handlePurposeSelect("대만", "country")
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  <img src={images.ProjectTaiwan} alt="" />
                                  대만
                                </Body2>
                              </SelectBoxItem2>
                            </SelectBoxList>
                          )}
                        </SelectBox>
                      </TabContent5Item>
                    </div>

                    <Button
                      DbExLarge
                      Primary
                      Fill
                      style={{ minWidth: "190px" }}
                      onClick={handleSubmitBusinessInfo}
                      disabled={
                        !isRequiredFieldsFilled() || completedSteps.includes(2)
                      }
                    >
                      다음
                    </Button>
                  </>
                )}
              </TabContent5>
            )}

            {activeTab === 2 && (
              <TabContent5>
                <>
                  <div className="content">
                    <H2 color="gray800" align="left">
                      정확한 프로젝트 분석을 위해 관련 문서, 데이터, 보고서 등을
                      업로드해주세요.
                    </H2>

                    <TabContent5Item required>
                      <div className="title">
                        <Body1 color="gray700">파일 업로드 (20MB)</Body1>
                      </div>
                      <Dropzone
                        onChangeStatus={handleChangeStatus}
                        maxFiles={5}
                        multiple={true}
                        canRemove={true}
                        canRestart={false}
                        disabled={completedSteps.includes(2)}
                        accept="image/jpg, image/jpeg, image/png, image/gif, image/bmp, application/pdf"
                        maxSizeBytes={20 * 1024 * 1024}
                        inputWithFilesContent={
                          <>
                            <img src={images.ImagePrimary} alt="" />
                            {fileNames.length === 0 && (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  gap: "12px",
                                }}
                              >
                                <div>
                                  <Body2 color="gray800">
                                    업로드하려는 파일을 드래그하여 놓아주세요
                                  </Body2>
                                  <Sub3 color="gray500">
                                    jpg, png, PDF 파일만 업로드가 가능합니다
                                    (20MB 이하)
                                  </Sub3>
                                </div>
                                <div className="browse-button">
                                  파일 찾아보기
                                </div>
                              </div>
                            )}
                            {fileNames.length > 0 && (
                              <div>
                                {fileNames.map((name, index) => (
                                  <Body2 key={index} color="gray700">
                                    {name}
                                  </Body2>
                                ))}
                              </div>
                            )}
                          </>
                        }
                        inputContent={
                          <>
                            <img src={images.ImagePrimary} alt="" />
                            {fileNames.length === 0 && (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  gap: "12px",
                                }}
                              >
                                <div>
                                  <Body2 color="gray800">
                                    업로드하려는 파일을 드래그하여 놓아주세요
                                  </Body2>
                                  <Sub3 color="gray500">
                                    jpg, png, PDF 파일만 업로드가 가능합니다
                                    (20MB 이하)
                                  </Sub3>
                                </div>
                                <div className="browse-button">
                                  파일 찾아보기
                                </div>
                              </div>
                            )}
                            {fileNames.length > 0 && (
                              <div>
                                {fileNames.map((name, index) => (
                                  <Body2 key={index} color="gray700">
                                    {name}
                                  </Body2>
                                ))}
                              </div>
                            )}
                          </>
                        }
                        styles={StyledDropzone}
                      />
                    </TabContent5Item>
                  </div>

                  <ButtonWrap>
                    <Body1
                      color="gray500"
                      onClick={!completedSteps.includes(2) ? handleSkip : null}
                      // disabled={completedSteps.length >= 2}
                    >
                      건너뛰기
                    </Body1>

                    <Button
                      DbExLarge
                      Primary
                      Fill
                      style={{ minWidth: "190px" }}
                      onClick={handleSubmitBusinessInfo}
                      disabled={
                        !isRequiredFieldsFilled() || completedSteps.includes(2)
                      }
                    >
                      다음
                    </Button>
                  </ButtonWrap>
                </>
              </TabContent5>
            )}

            {activeTab === 3 && completedSteps.includes(2) && (
              <TabContent5 Small>
                {isLoadingScenario ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      minHeight: "200px",
                      alignItems: "center",
                    }}
                  >
                    <AtomPersonaLoader message="프로젝트 개요를 분석하고 있습니다." />
                  </div>
                ) : (
                  <>
                    <div className="content">
                      <H2 color="gray800" align="left">
                        입력하신 정보를 분석하여 프로젝트 주요 내용을
                        정리했습니다.
                      </H2>

                      <SummaryWrap>
                        <Body1 color="gray700" align="left">
                          프로젝트 정보
                        </Body1>
                        <ListBoxGroup Small>
                          <li>
                            <Body2 color="gray500">사업모델</Body2>
                            <Body2 color="gray800">
                              {selectedValues.business || "-"}
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray500">업종</Body2>
                            <Body2 color="gray800">
                              {selectedValues.industry || "-"}
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray500">타겟 국가</Body2>
                            <Body2 color="gray800">
                              {selectedValues.country || "-"}
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray500">업로드 파일</Body2>
                            {/* <Body2 color="gray800">
                              {uploadedFiles.length === 0
                                ? "-"
                                : uploadedFiles.map((file) => (
                                    <div key={file.id}>{file.name}</div>
                                  ))}
                            </Body2> */}
                            <Body2 color="gray800">
                              {isSkipped
                                ? "-"
                                : uploadedFiles.length === 0
                                ? "-"
                                : uploadedFiles.map((file) => (
                                    <div key={file.id}>{file.name}</div>
                                  ))}
                            </Body2>
                          </li>
                        </ListBoxGroup>
                      </SummaryWrap>

                      <SummaryWrap>
                        <Title>
                          <Body1 color="gray700" align="left">
                            프로젝트 개요
                          </Body1>
                          {!isEditing ? (
                            <IconButton onClick={handleEditClick}>
                              <img src={images.PencilSquare} alt="" />
                              <span>수정하기</span>
                            </IconButton>
                          ) : (
                            <IconButton onClick={handleSaveClick}>
                              <img src={images.FolderArrowDown} alt="" />
                              <span>저장하기</span>
                            </IconButton>
                          )}
                        </Title>
                        {!isEditing && (
                          <ListBoxGroup>
                            <Body2 color="gray800" align="left">
                              {typeof editingText === "object" ? (
                                <>
                                  {editingText.business_analysis}
                                  {editingText.file_analysis && (
                                    <>
                                      <br />
                                      <br />
                                      {editingText.file_analysis}
                                    </>
                                  )}
                                </>
                              ) : (
                                editingText
                              )}
                            </Body2>
                          </ListBoxGroup>
                        )}

                        {isEditing && (
                          <FormBox>
                            <CustomTextarea
                              Edit
                              ref={textareaRef}
                              style={{
                                height: "auto",
                                overflow: "hidden",
                                resize: "none",
                              }}
                              value={editingText}
                              onChange={(e) => {
                                setEditingText(e.target.value);
                                adjustTextareaHeight();
                              }}
                            />
                            <EditButtonGroup>
                              <IconButton onClick={handleUndoClick}>
                                <img
                                  src={images.ClockCounterclockwise}
                                  alt=""
                                />
                                <span>이전으로 되돌리기</span>
                              </IconButton>
                              {/* <IconButton>
                                <img src={images.MagicStick} alt="" />
                                <span>AI로 다듬기</span>
                              </IconButton> */}
                            </EditButtonGroup>
                          </FormBox>
                        )}
                      </SummaryWrap>

                      <SummaryWrap>
                        <Title>
                          <Body1 color="gray700" align="left">
                            주요 타겟 고객군
                          </Body1>
                          {!isEditingTarget ? (
                            <IconButton onClick={handleEditTargetClick}>
                              <img src={images.PencilSquare} alt="" />
                              <span>수정하기</span>
                            </IconButton>
                          ) : (
                            <IconButton onClick={handleSaveTargetClick}>
                              <img src={images.FolderArrowDown} alt="" />
                              <span>저장하기</span>
                            </IconButton>
                          )}
                        </Title>
                        {!isEditingTarget && (
                          <ListBoxGroup>
                            <Body2 color="gray800" align="left">
                              {editingTargetText}
                            </Body2>
                          </ListBoxGroup>
                        )}

                        {isEditingTarget && (
                          <FormBox>
                            <CustomTextarea
                              Edit
                              ref={targetTextareaRef}
                              style={{
                                height: "auto",
                                overflow: "hidden",
                                resize: "none",
                              }}
                              value={editingTargetText}
                              onChange={(e) => {
                                setEditingTargetText(e.target.value);
                              }}
                            />
                            <EditButtonGroup>
                              <IconButton onClick={handleUndoTargetClick}>
                                <img
                                  src={images.ClockCounterclockwise}
                                  alt=""
                                />
                                <span>이전으로 되돌리기</span>
                              </IconButton>
                              {/* <IconButton>
                                <img src={images.MagicStick} alt="" />
                                <span>AI로 다듬기</span>
                              </IconButton> */}
                            </EditButtonGroup>
                          </FormBox>
                        )}
                      </SummaryWrap>
                    </div>

                    <Button
                      DbExLarge
                      Primary
                      Fill
                      style={{ minWidth: "190px" }}
                      onClick={handleCreateProject}
                    >
                      프로젝트 생성하기
                    </Button>
                  </>
                )}
              </TabContent5>
            )}
          </ProjectCreateWrap>
        </MainContent>
      </ContentsWrap>

      {showPopupError && (
        <PopupWrap
          Warning
          title="다시 입력해 주세요."
          message="현재 입력하신 정보는 프로젝트를 생성할 수 없습니다."
          buttonType="Outline"
          confirmText="확인"
          isModal={false}
          onConfirm={() => setShowPopupError(false)}
        />
      )}

      {showPopupError2 && (
        <PopupWrap
          Warning
          title="다시 입력해 주세요."
          message="현재 입력하신 정보는 프로젝트를 생성할 수 없습니다."
          buttonType="Outline"
          confirmText="확인"
          isModal={false}
          onConfirm={() => {
            setShowPopupError2(false);
            navigate("/Project", { replace: true });
          }}
        />
      )}

      {showPopupSave && (
        <PopupWrap
          Check
          title="리포트가 저장되었습니다."
          message="저장된 리포트는 '보관함'을 확인해주세요"
          buttonType="Outline"
          closeText="보관함 바로가기"
          confirmText="리포트 계속 확인"
          isModal={false}
          onCancel={() => setShowPopupSave(false)}
          onConfirm={() => setShowPopupSave(false)}
        />
      )}
    </>
  );
};

export default PageProjectCreate;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  cursor: pointer;

  svg {
    transform: rotate(180deg);
  }
`;

const ProjectCreateWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  margin-top: 60px;
`;

const SummaryWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const ButtonWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  > div {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const EditButtonGroup = styled(ButtonGroup)`
  justify-content: end;
`;

const ViewInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: $space-between;
  gap: 4px;
  width: 100%;
  font-size: 0.875rem;
  color: ${palette.gray800};

  + div {
    padding-top: 16px;
    border-top: 1px solid ${palette.outlineGray};
  }

  .title {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 8px;
    font-size: 0.875rem;
    color: ${palette.black};

    span {
      font-size: 0.75rem;
      font-weight: 300;
      color: ${palette.gray500};
    }
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;

    div {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 7px;
      font-size: 0.875rem;
      font-weight: 300;
      color: ${palette.gray500};
      line-height: 1.5;

      + div:before {
        position: absolute;
        top: 50%;
        left: -16px;
        transform: translateY(-50%);
        width: 1px;
        height: 12px;
        background-color: ${palette.outlineGray};
        content: "";
      }
    }
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    button {
      font-family: "Pretendard", poppins;
      font-size: 0.75rem;
      font-weight: 300;
      padding: 6px 10px;
      border-radius: 6px;

      &.view {
        color: ${palette.black};
        border: 1px solid ${palette.outlineGray};
        background: ${palette.chatGray};
      }

      &.analysis {
        color: ${palette.primary};
        border: 1px solid ${palette.primary};
        background: #e9f1ff;
      }
    }
  }
`;
