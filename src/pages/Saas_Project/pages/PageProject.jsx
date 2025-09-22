//프로젝트 인사이트
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { palette } from "../../../assets/styles/Palette";
import OrganismIncNavigation from "../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../Global/molecules/MoleculeHeader";
import PopupWrap from "../../../assets/styles/Popup";
import { Button } from "../../../assets/styles/ButtonStyle";
import {
  ContentsWrap,
  MainContent,
  TabContent5Item,
  TabContent5,
} from "../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../assets/styles/Images";
import {
  H1,
  Body3,
  Sub1,
  Caption1,
  Sub3,
  Body2,
  Body1,
  H3,
} from "../../../assets/styles/Typography";
import {
  getProjectListSaasByIdFromIndexedDB,
  getProjectListSaasEducationByIdFromIndexedDB,
  updateProjectOnServer,
  getProjectDeleteListOnServer,
  CreditInfo,
  UserEducationStateInfo,
  UserAdminStateInfo,
} from "../../../utils/indexedDB";
import OrganismProjectItem from "../components/organisms/OrganismProjectItem";
import OrganismProUpgradePopup from "../components/organisms/OrganismProUpgradePopup";
import {
  PROJECT_LIST,
  ACCESS_DASHBOARD,
  IS_LOGGED_IN,
  CREDIT_REQUEST_CUSTOM_PERSONA,
  CREDIT_REQUEST_BUSINESS_PERSONA,
  CREDIT_CUSTOM_THEORY,
  CREDIT_ADDITIONAL_QUESTION,
  CREDIT_INDEPTH_INTERVIEW,
  EVENT_TITLE,
  EVENT_STATE,
  TRIAL_STATE,
  CREDIT_CREATE_PERSONA_DEFAULT,
  CREDIT_CREATE_TOOL,
  CREDIT_CREATE_EXPERT,
  CREDIT_CREATE_MULTIMODAL,
  CREDIT_CREATE_INTERVIEW,
  CREDIT_CREATE_PROJECT,
  EDUCATION_STATE,
  PROJECT_EDUCATION_STATE,
  PROJECT_EDUCATION_CODE,
  CREDIT_CREATE_TOOL_LOW,
  CREDIT_CREATE_TOOL_HIGH,
  ADMIN_STATE,
} from "../../AtomStates";
import { useDynamicViewport } from "../../../assets/DynamicViewport";

const PageProject = () => {
  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기
  const navigate = useNavigate();
  const [, setCreditRequestCustomPersona] = useAtom(
    CREDIT_REQUEST_CUSTOM_PERSONA
  );
  const [, setCreditRequestBusinessPersona] = useAtom(
    CREDIT_REQUEST_BUSINESS_PERSONA
  );
  const [, setCreditCustomTheory] = useAtom(CREDIT_CUSTOM_THEORY);
  const [, setCreditAdditionalQuestion] = useAtom(CREDIT_ADDITIONAL_QUESTION);
  const [, setCreditIndepthInterview] = useAtom(CREDIT_INDEPTH_INTERVIEW);
  const [, setCreditCreatePersonaDefault] = useAtom(
    CREDIT_CREATE_PERSONA_DEFAULT
  );
  const [, setCreditCreateTool] = useAtom(CREDIT_CREATE_TOOL);
  const [, setCreditCreateExpert] = useAtom(CREDIT_CREATE_EXPERT);
  const [, setCreditCreateMultimodal] = useAtom(CREDIT_CREATE_MULTIMODAL);
  const [, setCreditCreateInterview] = useAtom(CREDIT_CREATE_INTERVIEW);
  const [, setCreditCreateProject] = useAtom(CREDIT_CREATE_PROJECT);
  const [, setCreditCreateToolLow] = useAtom(CREDIT_CREATE_TOOL_LOW);
  const [, setCreditCreateToolHigh] = useAtom(CREDIT_CREATE_TOOL_HIGH);
  const [, setEventTitle] = useAtom(EVENT_TITLE);
  const [, setEventState] = useAtom(EVENT_STATE);
  const [, setTrialState] = useAtom(TRIAL_STATE);
  const [, setAccessDashboard] = useAtom(ACCESS_DASHBOARD);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectList, setProjectList] = useAtom(PROJECT_LIST);
  const [educationState, setEducationState] = useAtom(EDUCATION_STATE);
  const [projectEducationState, setProjectEducationState] = useAtom(
    PROJECT_EDUCATION_STATE
  );
  const [projectEducationCode, setProjectEducationCode] = useAtom(
    PROJECT_EDUCATION_CODE
  );
  const [adminState, setAdminState] = useAtom(ADMIN_STATE);

  const [isWarningPopupOpen, setIsWarningPopupOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [deletedProjects, setDeletedProjects] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isTrashModalOpen, setIsTrashModalOpen] = useState(false);
  const [showProjectList, setShowProjectList] = useState(false);

  // Pro 업그레이드 팝업 관련 상태
  const [isProUpgradePopupOpen, setIsProUpgradePopupOpen] = useState(false);
  const [dontShowProUpgradeForWeek, setDontShowProUpgradeForWeek] = useState(false);
  const handleWarningClose = () => {
    setIsWarningPopupOpen(false);
    setShowWarning(false);
  };

  // Pro 업그레이드 팝업 핸들러들
  const handleLearnMore = () => {
    window.open('https://interviewx-edu.tistory.com/', '_blank');
  };

  const handleStartTrial = () => {
    window.open('https://forms.gle/pheh3PgYNvGLyCYQA', '_blank');
  };

  const handleCloseProUpgradePopup = () => {
    setIsProUpgradePopupOpen(false);

    // "일주일간 보지 않기"가 체크되어 있다면 로컬스토리지에 저장
    if (dontShowProUpgradeForWeek) {
      localStorage.setItem('proUpgradePopupLastShown', Date.now().toString());
    }

    // 체크 상태 초기화
    setDontShowProUpgradeForWeek(false);
  };

  const handleDontShowChange = (checked) => {
    setDontShowProUpgradeForWeek(checked);
  };

  useEffect(() => {
    const fetchCreditInfo = async () => {
      try {
        if (isLoggedIn) {
          const response = await CreditInfo(isLoggedIn);
          const educationStateResponse = await UserEducationStateInfo(
            isLoggedIn
          );
          const adminStateResponse = await UserAdminStateInfo(isLoggedIn);

          // 크레딧 정보 설정
          if (response) {

            setCreditRequestCustomPersona(response.request_custom_persona);
            setCreditRequestBusinessPersona(response.request_business_persona);
            setCreditCustomTheory(response.custom_theory);
            setCreditAdditionalQuestion(response.additional_question);
            setCreditIndepthInterview(response.indepth_interview);
            setEventTitle(response.event_title);
            setEventState(response.event_state);
            setTrialState(response.trial_state);
            setCreditCreatePersonaDefault(response.create_persona_default);
            setCreditCreateTool(response.create_tool);
            setCreditCreateExpert(response.create_expert);
            setCreditCreateMultimodal(response.create_multimodal);
            setCreditCreateInterview(response.create_interview);
            setCreditCreateProject(response.create_project);
            setCreditCreateToolLow(response.create_tool_low);
            setCreditCreateToolHigh(response.create_tool_high);
          }

          // 교육 상태 설정
          if (educationStateResponse) {
            setEducationState(educationStateResponse.education_state);
            sessionStorage.setItem(
              "educationLogo",
              educationStateResponse.education_logo
            );
            sessionStorage.setItem(
              "educationLandingUrl",
              educationStateResponse.education_landing_url
            );
            sessionStorage.setItem(
              "educationName",
              educationStateResponse.education_name
            );

            if (educationStateResponse.education_state === true) {
              setProjectEducationState("education");
              setProjectEducationCode("edu_000001");
            }
          }

          // 관리자 상태 설정
          if (adminStateResponse) {
            setAdminState(adminStateResponse.is_admin);

            //   "🚀 ~ fetchCreditInfo ~ adminStateResponse:",
            //   adminStateResponse
            // );
          }

          // Pro 업그레이드 팝업 표시 함수
          checkProUpgradePopup(educationStateResponse.education_state);
        }
      } catch (error) {
        console.error("Failed to fetch credit info:", error);
      }
    };

    // Call the API every time PageMain is rendered (or when isLoggedIn changes)
    fetchCreditInfo();
  }, [isLoggedIn]);

  // 임시 삭제함 데이터 로드
  useEffect(() => {
    const loadDeletedTools = async () => {
      if (isTrashModalOpen) {
        try {
          const deletedProjectsData = await getProjectDeleteListOnServer(
            0,
            0,
            true
          );
          if (deletedProjectsData.length > 0) {
            setDeletedProjects(deletedProjectsData);
          }
        } catch (error) {
          console.error("삭제된 툴 목록을 불러오는데 실패했습니다:", error);
        }
      }
    };

    loadDeletedTools();
  }, [isTrashModalOpen, refreshTrigger]);
  // 날짜 포맷팅 함수 (년월일시분 표기)
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear().toString().slice(2)}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };
  const handleWarningContinue = async () => {
    if (selectedProject) {
      const updatedProjects = projectList.filter(
        (project) => project._id !== selectedProject._id
      );
      setProjectList(updatedProjects);

      await updateProjectOnServer(
        selectedProject._id,
        {
          deleteState: 1,
        },
        isLoggedIn
      );
    }
    setShowWarning(false);
    setSelectedProject(null);
  };

  // 툴 복구 처리
  const handleRestoreProject = async (projectId) => {
    try {
      await updateProjectOnServer(
        projectId,
        {
          deleteState: 0,
        },
        true
      );

      // 화면에서 제거
      setDeletedProjects((prev) =>
        prev.filter((project) => project._id !== projectId)
      );
      // 스토리지 박스 목록 새로고침 트리거
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("프로젝트 복구에 실패했습니다:", error);
    }
  };

  const handleStart = () => {
    setIsWarningPopupOpen(false);
    navigate("/ProjectCreate");
  };

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      //  현재 URL 확인
      const currentUrl = window.location.href;

      // 현재 URL 저장
      sessionStorage.setItem("lastUrl", currentUrl);
      const lastUrl = sessionStorage.getItem("lastUrl");
    };
    // 함수 실행
    detectRefresh();

    // 컴포넌트 마운트 시 한 번만 실행
  }, [navigate]);

  const checkProUpgradePopup = (educationState) => {
    // educationState가 false일 때만 팝업 표시
    if (!educationState) {
      // 로컬스토리지에서 마지막 팝업 표시 시간을 확인
      const lastShown = localStorage.getItem('proUpgradePopupLastShown');
      const now = Date.now();

      // 7일 = 7 * 24 * 60 * 60 * 1000 밀리초
      const sevenDays = 7 * 24 * 60 * 60 * 1000;

      // 마지막 표시 후 7일이 지났거나 처음 표시하는 경우에만 팝업 표시
      if (!lastShown || (now - parseInt(lastShown)) > sevenDays) {
        setIsProUpgradePopupOpen(true);
      }
    }
  };

  useEffect(() => {
    setAccessDashboard(false);

    const loadProjectList = async () => {
      try {
        let savedProjectListInfo;
        const educationStateResponse = await UserEducationStateInfo(isLoggedIn);

        setEducationState(educationStateResponse.education_state);

        if (educationStateResponse.education_state) {
          if (projectEducationCode) {
            savedProjectListInfo =
              await getProjectListSaasEducationByIdFromIndexedDB(
                projectEducationCode,
                true
              );
          }
        } else {
          savedProjectListInfo = await getProjectListSaasByIdFromIndexedDB(
            true
          );
        }
        if (savedProjectListInfo) {
          // saas 타입 프로젝트만 필터링
          const filteredSaasProjects = savedProjectListInfo.filter(
            (project) => {
              return project.projectType === "saas";
            }
          );

          const sortedList = [...filteredSaasProjects]
            .map((project) => ({
              ...project,
              reportList:
                project.reportList?.sort((a, b) => {
                  const dateA = a.timestamp;
                  const dateB = b.timestamp;
                  return dateB - dateA; // 최신 날짜가 위로
                }) || [],
            }))
            .sort((a, b) => {
              const dateA = a.timestamp;
              const dateB = b.timestamp;
              return dateB - dateA; // 최신 날짜가 위로
            });

          setProjectList(sortedList);
        }
      } catch (error) {}
    };
    loadProjectList();
  }, [refreshTrigger, projectEducationState]); // refreshTrigger가 변경될 때마다 데이터 다시 로드

  // 샘플 프로젝트 데이터
  const sampleProjects = projectList;

  // 프로젝트 삭제 핸들러 추가
  const handleProjectDelete = (project) => {
    setSelectedProject(project);
    setShowWarning(true);
  };

  const confirmProjectType = () => {
    setShowProjectList(true);
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />
        <MoleculeHeader />
        <MainContent Wide1030>
          <ProjectWrap>
            <HeaderWrap>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                {educationState && (
                  <LogoCard>
                    <img
                      src={`/images/Logo/${sessionStorage.getItem(
                        "educationLogo"
                      )}`}
                      alt="logo"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/Logo/interviewX_symbol.png";
                      }}
                    />
                  </LogoCard>
                )}
                <div>
                  <H1 color="gray800" align="left">
                    Project
                  </H1>
                  <div style={{ height: "10px" }}></div>
                  <Body3 color="gray700" align="left">
                    AI를 활용한 효율적인 프로젝트 인사이트를 관리하세요
                  </Body3>
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <Button
                  Large
                  Primary
                  Fill
                  onClick={() => setIsWarningPopupOpen(true)}
                >
                  <Caption1 color="white">새 프로젝트</Caption1>
                </Button>
                <Button
                  Outline
                  radius="4px"
                  onClick={() => setIsTrashModalOpen(true)}
                >
                  <img src={images.Trash} alt="" />
                  <Caption1 color="gray700">임시 삭제함</Caption1>
                </Button>
              </div>
            </HeaderWrap>

            <ProjectListWrap>
              <ProjectList>
                {sampleProjects.map((project) => (
                  <OrganismProjectItem
                    key={project._id}
                    project={project}
                    onDelete={() => handleProjectDelete(project)}
                  />
                ))}
                <OrganismProjectItem isNoData={true} />
              </ProjectList>
            </ProjectListWrap>
          </ProjectWrap>
        </MainContent>
      </ContentsWrap>
      {/* <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        {educationState ? (
          !showProjectList ? (
            // 교육 모드 초기 화면
            <MainContent Wide1030>
              <ProjectWrap style={{ marginTop: "200px" }}>
                <TabContent5>
                  <div className="content">
                    <div className="title">
                      <H3 color="gray800">회원 유형을 선택해주세요</H3>
                    </div>
                    <InterviewModeSelection>
                      <InterviewModeCard
                        isActive={projectEducationState === "basic"}
                        onClick={() => {
                          setProjectEducationState("basic");
                          setProjectEducationCode("");
                        }}
                      >
                        <CardContent>
                          <img
                            src={images.InterviewModeSelfQuestion}
                            alt="basic"
                          />
                          <div>
                            <Body2 color="gray700">
                              일반 회원으로 사용합니다
                            </Body2>
                            <Body3
                              style={{ marginTop: "10px" }}
                              color="gray500"
                            >
                              InterviewX를 개인적인 목적으로 사용합니다
                            </Body3>
                          </div>
                        </CardContent>
                        <CheckboxWrapper>
                          <CheckCircle
                            as="input"
                            type="radio"
                            id="basic"
                            name="projectEducationState"
                            checked={projectEducationState === "basic"}
                            onChange={() => setProjectEducationState("basic")}
                          />
                        </CheckboxWrapper>
                      </InterviewModeCard>

                      <InterviewModeCard
                        isActive={projectEducationState === "education"}
                        onClick={() => {
                          setProjectEducationState("education");
                          setProjectEducationCode("edu_000001");
                        }}
                      >
                        <CardContent>
                          <img
                            src={images.InterviewModeModerator}
                            alt="education"
                          />
                          <div>
                            <Body2 color="gray700">교육용으로 사용합니다</Body2>
                            <Body3
                              style={{ marginTop: "10px" }}
                              color="gray500"
                            >
                              "부산디자인진흥원 프로그램 명"으로 사용합니다
                            </Body3>
                          </div>
                        </CardContent>
                        <CheckboxWrapper>
                          <CheckCircle
                            as="input"
                            type="radio"
                            id="education"
                            name="projectEducationState"
                            checked={projectEducationState === "education"}
                            onChange={() => {
                              setProjectEducationState("education");
                              setProjectEducationCode("edu_000001");
                            }}
                          />
                        </CheckboxWrapper>
                      </InterviewModeCard>
                    </InterviewModeSelection>
                  </div>

                  <Button
                    Other
                    Primary
                    Fill
                    disabled={!projectEducationState}
                    onClick={confirmProjectType}
                  >
                    확인
                  </Button>
                </TabContent5>
              </ProjectWrap>
            </MainContent>
          ) : (
            // 교육 모드에서 확인 버튼 클릭 후 화면
            <MainContent Wide1030>
              <ProjectWrap>
                <HeaderWrap>
                  <div>
                    <H1 color="gray800" align="left">
                      Project
                    </H1>
                    <div style={{ height: "10px" }}></div>
                    <Body3 color="gray700" align="left">
                      AI를 활용한 효율적인 프로젝트 인사이트를 관리하세요
                    </Body3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <Button
                      ExLarge
                      Primary
                      Fill
                      onClick={() => setIsWarningPopupOpen(true)}
                    >
                      <Sub1 color="white">새 프로젝트</Sub1>
                    </Button>
                    <Button Outline onClick={() => setIsTrashModalOpen(true)}>
                      <img src={images.Trash} alt="" />
                      <Caption1 color="gray700">임시 삭제함</Caption1>
                    </Button>
                  </div>
                </HeaderWrap>

                <ProjectListWrap>
                  <ProjectList>
                    {sampleProjects.map((project) => (
                      <OrganismProjectItem
                        key={project._id}
                        project={project}
                        onDelete={() => handleProjectDelete(project)}
                      />
                    ))}
                    <OrganismProjectItem isNoData={true} />
                  </ProjectList>
                </ProjectListWrap>
              </ProjectWrap>
            </MainContent>
          )
        ) : (
          // 일반 모드 화면
          <MainContent Wide1030>
            <ProjectWrap>
              <HeaderWrap>
                <div>
                  <H1 color="gray800" align="left">
                    Project
                  </H1>
                  <div style={{ height: "10px" }}></div>
                  <Body3 color="gray700" align="left">
                    AI를 활용한 효율적인 프로젝트 인사이트를 관리하세요
                  </Body3>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "10px" }}
                >
                  <Button
                    ExLarge
                    Primary
                    Fill
                    onClick={() => setIsWarningPopupOpen(true)}
                  >
                    <Sub1 color="white">새 프로젝트</Sub1>
                  </Button>
                  <Button Outline onClick={() => setIsTrashModalOpen(true)}>
                    <img src={images.Trash} alt="" />
                    <Caption1 color="gray700">임시 삭제함</Caption1>
                  </Button>
                </div>
              </HeaderWrap>

              <ProjectListWrap>
                <ProjectList>
                  {sampleProjects.map((project) => (
                    <OrganismProjectItem
                      key={project._id}
                      project={project}
                      onDelete={() => handleProjectDelete(project)}
                    />
                  ))}
                  <OrganismProjectItem isNoData={true} />
                </ProjectList>
              </ProjectListWrap>
            </ProjectWrap>
          </MainContent>
        )}
      </ContentsWrap> */}
      {showWarning && (
        <PopupWrap
          Warning
          title="정말 삭제하시겠습니까?"
          message="삭제된 프로젝트는 임시 삭제함에서 복구 가능합니다."
          buttonType="Outline"
          closeText="취소"
          confirmText="확인"
          isModal={false}
          onCancel={handleWarningClose}
          onConfirm={handleWarningContinue}
        />
      )}
      {isWarningPopupOpen && (
        <PopupWrap
          Check
          title="새 프로젝트를 시작 하시겠습니까?"
          message="프로젝트 도중 이탈 시 결과값에 문제가 발생할 수 있습니다."
          buttonType="Outline"
          closeText="취소"
          confirmText="시작"
          isModal={false}
          onCancel={handleWarningClose}
          onConfirm={handleStart}
        />
      )}{" "}
      {isTrashModalOpen && (
        <PopupWrap
          Wide455
          TitleFlex
          title="임시 삭제함 (프로젝트)"
          buttonType="Fill"
          isModal={true}
          onCancel={() => setIsTrashModalOpen(false)}
          body={
            <>
              <div className="deleted-wrap">
                {deletedProjects.length > 0 ? (
                  deletedProjects.map((project) => (
                    <div key={project._id}>
                      <images.GridCircle
                        color={palette.gray700}
                        width={12}
                        height={12}
                      />
                      <div className="content">
                        <Sub3 color="gray800" align="left">
                          {project.projectTitle}
                        </Sub3>
                        <Caption1 color="gray500" align="left">
                          삭제일 : {formatDate(project.timestamp)}
                        </Caption1>
                      </div>
                      <div className="button">
                        <span onClick={() => handleRestoreProject(project._id)}>
                          <img src={images.ArrowReturn} alt="복구" />
                        </span>
                        {/* <span onClick={() => handlePermanentDelete(tool._id)}>
                          <img src={images.Trash} alt="영구삭제" />
                        </span> */}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: "20px 0", textAlign: "center" }}>
                    <Body2 color="gray500">임시 삭제된 항목이 없습니다.</Body2>
                  </div>
                )}
              </div>

              {/* <div className="delete-info">
                <Caption1 color="primary">
                  휴지통에 15일 이상 보관된 리포트는 자동으로 삭제됩니다.
                </Caption1>
              </div> */}
            </>
          }
        />
      )}

      {/* Pro 업그레이드 팝업 */}
      <OrganismProUpgradePopup
        open={isProUpgradePopupOpen}
        onClose={handleCloseProUpgradePopup}
        onLearnMore={handleLearnMore}
        onStartTrial={handleStartTrial}
        dontShowChecked={dontShowProUpgradeForWeek}
        onDontShowChange={handleDontShowChange}
      />
    </>
  );
};

export default PageProject;

const ProjectWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 54px;
  margin: 50px auto;
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ProjectListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProjectList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const BgBoxItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  width: 100%;
  padding: ${(props) => (props.NoOutline ? "12px" : "8px 12px")};
  border-radius: 10px;
  border: ${(props) =>
    props.NoOutline ? "0" : `1px solid ${palette.outlineGray}`};
  background: ${(props) => (props.white ? palette.white : palette.chatGray)};
`;

const InterviewModeSelection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  justify-content: center;
  margin-bottom: 30px;

  .button-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 20px;
  }
`;

const InterviewModeCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 30px;
  border-radius: 10px;
  border: 1px solid
    ${(props) => (props.isActive ? palette.primary : palette.outlineGray)};
  cursor: pointer;
  background-color: ${(props) =>
    props.isActive ? "rgba(34, 111, 255, 0.05)" : "white"};
  position: relative;
  width: calc(50% - 10px);

  &:hover {
    border-color: ${palette.primary};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;

  img {
    width: 48px;
    height: 48px;
    margin-bottom: 4px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  margin-left: 0;
`;

const CustomizationWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  cursor: pointer;

  > div {
    width: 100%;
  }

  button span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid ${palette.gray700};

    &::before,
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 1px;
      background: ${palette.gray700};
      content: "";
    }

    &::after {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
`;

export const CheckCircle = styled.input`
  appearance: none;
  display: block !important;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  background-image: ${(props) =>
    props.checked
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23226FFF'/%3E%3Cpath d='M6.76562 12.4155L9.9908 15.6365L17.2338 8.36426' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='11.5' stroke='%23E0E4EB'/%3E%3C/svg%3E")`};
  transition: background-image 0.3s ease-in-out;

  + label {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;

    + label {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

const LogoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 5px;
  border: 1px solid ${palette.outlineGray};
  background: ${palette.white};
  overflow: hidden; /* 컨테이너를 넘는 이미지 숨김 */

  img {
    width: 100%;
    height: 100%;
    object-fit: fill-box; /* 비율 유지하면서 컨테이너에 맞춤 */
    object-position: center; /* 중앙 정렬 */
  }
`;
