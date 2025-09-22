//프로젝트 생성
import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../assets/styles/Palette";
import AtomPersonaLoader from "../Global/atoms/AtomPersonaLoader";
import OrganismIncNavigation from "../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../Global/molecules/MoleculeHeader";
import { Button, IconButton } from "../../assets/styles/ButtonStyle";
import {
  FormBox,
  CustomTextarea,
  CustomInput,
  SelectBox,
  SelectBoxItem,
  SelectBoxTitle,
  SelectBoxList,
} from "../../assets/styles/InputStyle";
import PopupWrap from "../../assets/styles/Popup";
import {
  ContentsWrap,
  MainContent,
  TabWrapType5,
  TabButtonType5,
  TabContent5,
  TabContent5Item,
  BgBoxItem,
  ListBoxWrap,
  StyledDropzone,
  DropzoneStyles,
  ListBoxGroup,
  Title,
} from "../../assets/styles/BusinessAnalysisStyle";
import images from "../../assets/styles/Images";
import {
  H2,
  H4,
  H3,
  H5,
  Sub3,
  Body1,
  Body2,
  Body3,
} from "../../assets/styles/Typography";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

import { useDynamicViewport } from "../../assets/DynamicViewport";
import { useNavigate } from "react-router-dom";
import {
  InterviewXProjectAnalysisMultimodalRequest,
  InterviewXProjectAnalysisRequest,
} from "../../utils/indexedDB";

// 초기 텍스트 상수로 정의
const INITIAL_PROJECT_OVERVIEW =
  "50세 이상을 위한 국내 최초 전용 소셜 플랫폼으로, 소통 부재 및 사회적 고립 해소를 목표합니다. 핵심 가치는 시니어들이 관심사 기반 커뮤니티에서 자유롭게 소통하고, 새로운 관계를 형성하며, 건강하고 활기찬 노년 생활을 지원하는 데 있습니다. 주요 기능은 온라인 소통, 멤버 교류, 정보 제공이며, 경쟁 우위는 시니어 특화 플랫폼이라는 점입니다. 다만, 디지털 격차, 사용자 확보, 기존 커뮤니티와의 경쟁은 잠재적 위험 요소입니다. 성공적인 안착을 위해 사용자 친화적인 인터페이스와 차별화된 콘텐츠 전략이 필요합니다.";
const INITIAL_TARGET_AUDIENCE =
  "1차 타겟은 50세 이상 대한민국 거주 성인입니다. 액티브 시니어, 소셜 니즈 시니어, 건강 및 활동 관심 시니어로 세분화됩니다. 액티브 시니어는 온라인 활동에 익숙하며 새로운 관계 및 정보 습득에 적극적입니다. 소셜 니즈 시니어는 사회적 관계 단절을 경험하고 온라인 소통을 갈망합니다. 건강 및 활동 관심 시니어는 건강 관리, 취미 활동, 여행 등 활기찬 노년 생활에 높은 관심을 보입니다. 2차 타겟은 은퇴 후 사회 참여 및 자기 계발을 희망하는 50+ 세대입니다. 페르소나 기반 마케팅 전략으로 접근성을 높여야 합니다.";

const PageProjectCreate = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showPopupError, setShowPopupError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const selectBoxRef = useRef(null);
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [showPopupSave, setShowPopupSave] = useState(false);
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [showPopupFileSize, setShowPopupFileSize] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(INITIAL_PROJECT_OVERVIEW);
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [editingTargetText, setEditingTargetText] = useState(
    INITIAL_TARGET_AUDIENCE
  );
  const targetTextareaRef = useRef(null);

  // 각 셀렉트박스의 열림/닫힘 상태를 개별적으로 관리
  const [selectBoxStates, setSelectBoxStates] = useState({
    business: false, // 사업 목적
    industry: false, // 업종
    country: false, // 타겟 국가
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
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    business: "",
    industry: "",
    country: "",
  });

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

  // handleInputChange 함수 추가
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 셀렉트박스 토글 함수 수정
  const toggleSelectBox = (boxName, event) => {
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
    try {
      const datas = {
        project_name: formData.projectName,
        product_description: formData.projectDescription,
        business_model: formData.business,
        industry_type: formData.industry,
        target_country: formData.country,
        tool_id: "1",
        files: uploadedFiles,
      };
      const response = await InterviewXProjectAnalysisMultimodalRequest(
        datas,
        isLoggedIn
      );

      const data = await response.json();
      // API 응답 처리 (예: 성공 메시지 표시)

      if (activeTab === 1) {
        setCompletedSteps((prev) => [...prev, 1]);
        setActiveTab(2);
      } else if (activeTab === 2) {
        setCompletedSteps((prev) => [...prev, 2]);
        setActiveTab(3);
        setIsLoadingScenario(true);
        setTimeout(() => {
          setIsLoadingScenario(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      // 에러 처리 (예: 사용자에게 에러 메시지 표시)
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  // 파일 업로드 상태를 체크하는 함수 추가
  const isFileUploaded = () => {
    return uploadedFiles.length > 0;
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
        formData.projectName.trim() !== "" &&
        formData.projectDescription.trim() !== "" &&
        formData.business !== "" &&
        formData.industry !== "" &&
        formData.country !== ""
      );
    }
    // 탭 2의 경우 파일 업로드 여부 확인
    else if (activeTab === 2) {
      return uploadedFiles.length > 0;
    }
    // 다른 탭의 경우
    return true;
  };

  const toolStep = [
    {
      title: "프로젝트 정보 입력",
      description: "프로젝트 정보를 입력하세요",
      isRequired: true,
    },
  ];

  const targetDiscoveryFinalReport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
  const handleSkip = () => {
    if (activeTab === 2) {
      setCompletedSteps((prev) => [...prev, 2]);
      setActiveTab(3);
      // 탭 3으로 이동할 때 로딩 시작
      setIsLoadingScenario(true);
      setTimeout(() => {
        setIsLoadingScenario(false);
      }, 3000);
    }
  };

  // 수정하기 버튼 클릭 핸들러 추가
  const handleEditClick = () => {
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

  return (
    <>
      <DropzoneStyles />

      <ContentsWrap>
        {/* <OrganismIncNavigation /> */}

        <MoleculeHeader />

        <MainContent>
          <ProjectCreateWrap>
            <BackButton onClick={() => navigate("/")}>
              <images.ChevronRight width="20px" height="20px" />
              <Sub3 color="gray500">HOME</Sub3>
            </BackButton>

            <TabWrapType5>
              <TabButtonType5
                isActive={activeTab >= 1}
                onClick={() => setActiveTab(1)}
              >
                <span>01</span>
                <div className="text">
                  <Body1 color={activeTab >= 1 ? "gray800" : "gray300"}>
                    프로젝트 정보 입력
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 2}
                onClick={() => completedSteps.includes(1) && setActiveTab(2)}
                disabled={!completedSteps.includes(1)}
              >
                <span>02</span>
                <div className="text">
                  <Body1 color={activeTab >= 2 ? "gray800" : "gray300"}>
                    데이터 등록
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 3}
                onClick={() => completedSteps.includes(2) && setActiveTab(3)}
                disabled={!completedSteps.includes(2)}
              >
                <span>03</span>
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray800" : "gray300"}>
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
                          value={formData.projectName}
                          onChange={(e) =>
                            handleInputChange("projectName", e.target.value)
                          }
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
                            value={formData.projectDescription}
                            onChange={(e) => {
                              handleInputChange(
                                "projectDescription",
                                e.target.value
                              );
                              setDescriptionLength(e.target.value.length);
                            }}
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
                            >
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
                                  B2C
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect("B2B", "business")
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  B2B
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect("B2G", "business")
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  B2G
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect("B2B2C", "business")
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  B2B2C
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect("B2B2B", "business")
                                }
                              >
                                <Body2 color="gray700" align="left">
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
                            >
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
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect(
                                    "정보통신 및 기술",
                                    "industry"
                                  )
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  정보통신 및 기술 (IT, 소프트웨어, 커뮤니티,
                                  광고, 마케팅 등)
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect(
                                    "금융 및 법률",
                                    "industry"
                                  )
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  금융 및 법률
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect(
                                    "제조 및 생산",
                                    "industry"
                                  )
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  제조 및 생산 (의류, 뷰티, 식음료, 환경/에너지
                                  등)
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect(
                                    "건설 및 인프라",
                                    "industry"
                                  )
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  건설 및 인프라
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect(
                                    "의료 및 헬스케어",
                                    "industry"
                                  )
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  의료 및 헬스케어
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect(
                                    "교육 및 공공 서비스",
                                    "industry"
                                  )
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  교육 및 공공 서비스 (교육, 정부 및 공공기관
                                  등)
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect(
                                    "소비재 및 라이프스타일 (커머서, 리빙, 유아, 펫, 여행, 콘텐츠, 게임 등)",
                                    "industry"
                                  )
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  소비재 및 라이프스타일 (커머스, 리빙, 유아,
                                  펫, 여행, 콘텐츠, 게임 등)
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect("기타", "industry")
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  기타
                                </Body2>
                              </SelectBoxItem>
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
                            >
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
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect("대한민국", "country")
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  대한민국
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect("미국", "country")
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  미국
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect("중국", "country")
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  중국
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect("일본", "country")
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  일본
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() =>
                                  handlePurposeSelect("베트남", "country")
                                }
                              >
                                <Body2 color="gray700" align="left">
                                  베트남
                                </Body2>
                              </SelectBoxItem>
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
                      disabled={!isRequiredFieldsFilled()}
                    >
                      다음
                    </Button>
                  </>
                )}
              </TabContent5>
            )}

            {activeTab === 2 && completedSteps.includes(1) && (
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
                    <AtomPersonaLoader message="맞춤 페르소나를 찾고 있어요..." />
                  </div>
                ) : (
                  <>
                    <div className="content">
                      <H2 color="gray800" align="left">
                        정확한 프로젝트 분석을 위해 관련 문서, 데이터, 보고서
                        등을 업로드해주세요.
                      </H2>

                      <TabContent5Item required>
                        <div className="title">
                          <Body1 color="gray700">파일 업로드 (20MB)</Body1>
                        </div>
                        <Dropzone
                          onChangeStatus={handleChangeStatus}
                          maxFiles={1}
                          multiple={true}
                          canRemove={true}
                          canRestart={false}
                          disabled={toolStep >= 1}
                          accept="image/*"
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
                                      jpg, png, doc, PDF 파일만 업로드가
                                      가능합니다 (20MB 아하)
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
                                      jpg, png, doc, PDF 파일만 업로드가
                                      가능합니다 (20MB 아하)
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
                      <Body1 color="gray500" onClick={handleSkip}>
                        건너뛰기
                      </Body1>

                      <Button
                        DbExLarge
                        Primary
                        Fill
                        style={{ minWidth: "190px" }}
                        onClick={handleSubmitBusinessInfo}
                        disabled={!isRequiredFieldsFilled()}
                      >
                        다음
                      </Button>
                    </ButtonWrap>
                  </>
                )}
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
                    <AtomPersonaLoader message="결과보고서를 작성하고 있습니다" />
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
                          프로젝트 개요
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
                            <Body2 color="gray800">
                              {uploadedFiles.length > 0
                                ? uploadedFiles[0].name
                                : "-"}
                            </Body2>
                          </li>
                        </ListBoxGroup>
                      </SummaryWrap>

                      <SummaryWrap>
                        <Title>
                          <Body1 color="gray700" align="left">
                            프로젝트 개요
                          </Body1>
                          <IconButton onClick={handleEditClick}>
                            <img src={images.PencilSquare} alt="" />
                            <span>수정하기</span>
                          </IconButton>
                        </Title>
                        {!isEditing && (
                          <ListBoxGroup>
                            <Body2 color="gray800" align="left">
                              {editingText}
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
                              <IconButton>
                                <img
                                  src={images.ClockCounterclockwise}
                                  alt=""
                                />
                                <span>이전으로 되돌리기</span>
                              </IconButton>
                              <IconButton>
                                <img src={images.MagicStick} alt="" />
                                <span>AI로 다듬기</span>
                              </IconButton>
                            </EditButtonGroup>
                          </FormBox>
                        )}
                      </SummaryWrap>

                      <SummaryWrap>
                        <Title>
                          <Body1 color="gray700" align="left">
                            주요 타겟 고객군
                          </Body1>
                          <IconButton onClick={handleEditTargetClick}>
                            <img src={images.PencilSquare} alt="" />
                            <span>수정하기</span>
                          </IconButton>
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
                              <IconButton>
                                <img
                                  src={images.ClockCounterclockwise}
                                  alt=""
                                />
                                <span>이전으로 되돌리기</span>
                              </IconButton>
                              <IconButton>
                                <img src={images.MagicStick} alt="" />
                                <span>AI로 다듬기</span>
                              </IconButton>
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
          message="현재 입력하신 정보는 목적을 생성할 수 없습니다."
          buttonType="Outline"
          confirmText="확인"
          isModal={false}
          onConfirm={() => handleNextStep(1)}
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
