//보관함
import React, { useEffect, useState, useRef } from "react";
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
} from "../../../assets/styles/BusinessAnalysisStyle";
import OrganismStorageBoxToolList from "../components/organisms/OrganismStorageBoxToolList";
import {
  TOOL_LIST_SAAS,
  PROJECT_SAAS,
  EDUCATION_STATE,
} from "../../AtomStates";
import images from "../../../assets/styles/Images";
import {
  H1,
  Body3,
  Sub3,
  Caption1,
  H2,
  Body1,
  Body2,
} from "../../../assets/styles/Typography";

import {
  getToolListOnServerSaas,
  getToolDeleteListOnServer,
  updateToolOnServer,
  updateProjectReportOnServer,
  updateChatOnServer,
} from "../../../utils/indexedDB";
import axios from "axios";
import { useDynamicViewport } from "../../../assets/DynamicViewport";

const PageStorageBox = () => {
  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기
  const navigate = useNavigate();
  const [educationState, setEducationState] = useAtom(EDUCATION_STATE);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [toolListSaas, setToolListSaas] = useAtom(TOOL_LIST_SAAS);
  const project = projectSaas;
  const [isTrashModalOpen, setIsTrashModalOpen] = useState(false);
  const [deletedTools, setDeletedTools] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10; // 한 페이지당 아이템 수

  // 페이지네이션된 툴 리스트 로드 함수
  const loadToolList = async (page = 1) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const savedToolListInfo = await getToolListOnServerSaas(
        project?._id,
        itemsPerPage,
        true,
        page
      );


      if (savedToolListInfo) {
        // API 응답에서 페이지네이션 정보 추출
        let data = [];
        let totalItemsCount = 0;
        let totalPagesCount = 1;

        data = savedToolListInfo.data || [];
        totalItemsCount = savedToolListInfo.pagination.total_count || 0;
        totalPagesCount = savedToolListInfo.pagination.total_pages || 1;

        const sortedList = [...data].sort((a, b) => {
          const dateA = a.timestamp;
          const dateB = b.timestamp;
          return dateB - dateA; // 최신 날짜가 위로
        });

        setToolListSaas(sortedList);
        setTotalItems(totalItemsCount);
        setTotalPages(totalPagesCount);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("툴 리스트 로드 중 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadToolList(currentPage);
  }, [refreshTrigger, project?._id]); // refreshTrigger가 변경될 때마다 데이터 다시 로드

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("storagebox")) {
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

  // 임시 삭제함 데이터 로드
  useEffect(() => {
    const loadDeletedTools = async () => {
      if (isTrashModalOpen) {
        try {
          const deletedToolsData = await getToolDeleteListOnServer(
            project?._id,
            0,
            true
          );
          if (deletedToolsData.length > 0) {
            setDeletedTools(deletedToolsData);
          }
        } catch (error) {
          console.error("삭제된 툴 목록을 불러오는데 실패했습니다:", error);
        }
      }
    };

    loadDeletedTools();
  }, [isTrashModalOpen, refreshTrigger]);

  // 툴 복구 처리
  const handleRestoreTool = async (toolId, toolType) => {
    try {
      if (
        toolType === "interviewSingle" ||
        toolType === "interviewGroup" ||
        toolType === "interviewSingleLive"
      ) {
        await updateProjectReportOnServer(
          toolId,
          {
            deleteState: 0,
          },
          true
        );
      } else if (toolType === "chat") {
        // 서버에서 채팅 복구 (deleteState를 0으로 설정)
        await updateChatOnServer(toolId, { deleteState: 0 });
      } else {
        await updateToolOnServer(toolId, { deleteState: 0 });
      }

      // 화면에서 제거
      setDeletedTools((prev) => prev.filter((tool) => tool._id !== toolId));
      // 스토리지 박스 목록 새로고침 트리거
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("툴 복구에 실패했습니다:", error);
    }
  };

  // 툴 삭제 후 페이지네이션 상태 업데이트
  const handleToolDeleted = () => {
    // 현재 페이지의 아이템이 모두 삭제되었는지 확인
    if (toolListSaas.length === 1 && currentPage > 1) {
      // 마지막 아이템이 삭제되고 현재 페이지가 1페이지가 아닐 때
      loadToolList(currentPage - 1);
    } else {
      // 현재 페이지 새로고침
      loadToolList(currentPage);
    }
  };

  // 툴 영구 삭제 처리
  const handlePermanentDelete = async (toolId, toolType) => {
    try {
      if (
        toolType === "interviewSingle" ||
        toolType === "interviewGroup" ||
        toolType === "interviewSingleLive"
      ) {
        await updateProjectReportOnServer(
          toolId,
          {
            deleteState: 2,
          },
          true
        );
      } else if (toolType === "chat") {
        // 서버에서 채팅 영구 삭제 (deleteState를 2로 설정)
        await updateChatOnServer(toolId, { deleteState: 2 });
      } else {
        await updateToolOnServer(toolId, { deleteState: 2 });
      }

      // 화면에서 제거
      setDeletedTools((prev) => prev.filter((tool) => tool._id !== toolId));
    } catch (error) {
      console.error("툴 영구 삭제에 실패했습니다:", error);
    }
  };

  // 페이지네이션 핸들러 함수들
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && !isLoading) {
      loadToolList(page);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1 && !isLoading) {
      loadToolList(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages && !isLoading) {
      loadToolList(currentPage + 1);
    }
  };

  //출력 길이 조절 함수
  const truncateText = (text, maxLength=30) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

  // 툴 설명 가져오기 함수
  const getToolDescription = (tool) => {
    if (tool.type) {
      switch (tool.type) {
        case "ix_target_discovery_persona":
          return truncateText(tool.specificSituation) || "상세 내용 없음";
        case "ix_customer_value_persona":
          return truncateText((tool.analysisScope?.split("|")[0] || "상세 내용 없음").trim());
        case "ix_idea_generator_persona":
          return truncateText(tool.coreValue?.length > 1
            ? `${tool.coreValue[0]} 외 ${tool.coreValue.length - 1}개`
            : tool.coreValue?.[0] || "상세 내용 없음");
        case "ix_design_emotion_analysis":
          return truncateText(tool.imageName?.[0]?.name || "상세 내용 없음");
        case "ix_psst_multimodal":
          return (
            truncateText(tool.fileName?.[0]?.name[0] ||
            (tool.selectedTemplete?.[0] == 0 ? "PSST 계획서" : ""))
          );
        case "ix_quick_survey_question":
          return truncateText(tool.goal || "상세 내용 없음");
        case "ix_customer_journey_map_education":
          return (
            tool.customerJourneyMapSelectedPersona.personaName +
            (tool.selectedDirection?.name
              ? "의 " + tool.selectedDirection.name
              : "")
          );
        case "ix_idea_generation_education":
          return truncateText(
            tool.ideaGenerationSelectedStartPosition
              ?.map((item, index) =>
                index === tool.ideaGenerationSelectedStartPosition.length - 1
                  ? item.main_theme
                  : item.main_theme + ", "
              )
              .join("") || "상세 내용 없음"
          );
        case "ix_kano_model_education":
          return truncateText(
            tool.kanoModelClusteringName
              ?.map((item, index) =>
                index === tool.kanoModelClusteringName.length - 1
                  ? item
                  : item + ", "
              )
              .join("") || "상세 내용 없음"
          );
        case "ix_idea_evaluation_education":
          return truncateText(
            tool.ideaEvaluateSelectedList
              ?.map((item, index) =>
                index === tool.ideaEvaluateSelectedList.length - 1
                  ? item
                  : item + ", "
              )
              .join("") || "상세 내용 없음"
          );
        case "ix_concept_definition_education":
          return truncateText(tool.selectedPersonas?.map(persona => persona?.personaName || '').filter(name => name).join(", ") || "상세 내용 없음");
        case "ix_issue_generation_education":
          return truncateText(
            tool.issueGenerationProblemListTitle
              ?.map((item, index) =>
                index === tool.issueGenerationProblemListTitle.length - 1
                  ? item
                  : item + ", "
              )
              .join("") || "상세 내용 없음"
          );

        case "ix_needs_keywords_generation_education":
          return truncateText(
            tool.keywordsGenerationTag
              ?.map((item, index) =>
                index === tool.keywordsGenerationTag.length - 1
                  ? item.main_theme
                  : item.main_theme + ", "
              )
              .join("") || "상세 내용 없음"
          );
        case "ix_prfaq_education":
          return truncateText([tool.companyInfo?.company, tool.companyInfo?.product]
          .filter(Boolean)
          .join(" / ") || "상세 내용 없음");
        case "ix_business_model_canvas_education":
          return truncateText(tool.selectedConceptDefinition?.customerList || "상세 내용 없음");
        case "ix_nps_education":
          return truncateText(
        (tool.fileName?.length > 0 ? tool.fileName?.[0]?.name[0] : 
  `${tool?.npsSelectedConcept?.[0]?.personaTitle} (${tool?.npsSelectedConcept?.[0]?.createDate})`) || "상세 내용 없음"
        );
        default:
          return tool.type;
      }
    }
    if (tool.interviewType)
      return tool.interviewType === "single" ||
        tool.interviewType === "singleLive"
        ? tool.reportTitle
        : tool.theoryType;
    if (tool.chat_data?.expert_index) {
      switch (tool.chat_data.expert_index) {
        case "1":
          return "시장 내 경쟁 우위 방안 보고서";
        case "2":
          return "마케팅 전문가";
        case "3":
          return "고객 인사이트 전문가";
        case "4":
          return "PoC 설계 전문가";
        case "5":
          return "아이디어 디벨로퍼";
        case "6":
          return "최적화된 전략을 제시";
        case "7":
          return "제품/서비스 분석 보고서";
        case "8":
          return "사례 분석 전문가";
        case "9":
          return "린 캔버스 vs 비즈니스 모델 캔버스 매칭 분석";
        case "10":
          return "조사 설계 전문가";
        default:
          return tool.chat_data.expert_index;
      }
    }
    return "상세 내용 없음";
  };
  // 날짜 포맷팅 함수 (년월일시분 표기)
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear().toString().slice(2)}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  // 툴 이름 가져오기 함수
  const getToolName = (tool) => {
    if (tool.type) {
      switch (tool.type) {
        case "ix_target_discovery_persona":
          return "타겟 탐색기";
        case "ix_customer_value_persona":
          return "고객 핵심 가치 분석기";
        case "ix_design_emotion_analysis":
          return "디자인 감성 분석기";
        case "ix_idea_generator_persona":
          return "아이디어 생성기";
        case "ix_psst_multimodal":
          return "보고서 생성기";
        case "ix_quick_survey_question":
          return "퀵 서베이";
        case "ix_customer_journey_map_education":
          return "고객 여정 지도";
        case "ix_idea_generation_education":
          return "아이디어 발산";
        case "ix_kano_model_education":
          return "카노 모델";
        case "ix_idea_evaluation_education":
          return "아이디어 평가";
        case "ix_concept_definition_education":
          return "컨셉 정의서";
        case "ix_issue_generation_education":
          return "핵심 문제 정의";
        case "ix_needs_keywords_generation_education":
          return "통합 니즈 작성";
        case "ix_prfaq_education":
          return "PRFAQ";
        case "ix_nps_education":
          return "NPS";
        case "ix_business_model_canvas_education":
          return "비즈니스 모델 캔버스";
        default:
          return tool.type;
      }
    }
    if (tool.interviewType)
      return tool.interviewType === "single"
        ? "심층 인터뷰(모더레이터)"
        : tool.interviewType === "multiple"
        ? "그룹 인터뷰"
        : "심층 인터뷰(사용자)";
    if (tool.chat_data?.expert_index) {
      switch (tool.chat_data.expert_index) {
        case "1":
          return "전략 컨설턴트";
        case "2":
          return "마케팅 전문가";
        case "3":
          return "고객 인사이트 전문가";
        case "4":
          return "PoC 설계 전문가";
        case "5":
          return "아이디어 디벨로퍼";
        case "6":
          return "그로스 해커";
        case "7":
          return "가격 분석 전문가";
        case "8":
          return "사례 분석 전문가";
        case "9":
          return "BM 전문가";
        case "10":
          return "조사 설계 전문가";
        default:
          return tool.chat_data.expert_index;
      }
    }
    return "상세 내용 없음";
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1030>
          <StorageBoxWrap>
            <StorageBoxTitle>
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
                    Knowledge Archive
                  </H1>
                  <div style={{ height: "10px" }}></div>
                  <Body3 color="gray700" align="left">
                    해당 프로젝트를 통해 수집한 리포트들을 한 곳에 모아두었어요
                  </Body3>
                </div>
              </div>
              <Button
                Outline
                radius="4px"
                onClick={() => setIsTrashModalOpen(true)}
                style={{ marginTop: "38px" }}
              >
                <img src={images.Trash} alt="" />
                <div style={{ minHeight: "24px", marginRight: "-4px" }}></div>
                <Caption1 color="gray700">임시 삭제함</Caption1>
              </Button>
            </StorageBoxTitle>

            <DashBoardItem>
              <OrganismStorageBoxToolList
                toolListSaas={toolListSaas}
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                isLoading={isLoading}
                onPageChange={handlePageChange}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
                onToolDeleted={handleToolDeleted}
              />
            </DashBoardItem>
          </StorageBoxWrap>
        </MainContent>
      </ContentsWrap>

      {isTrashModalOpen && (
        <PopupWrap
          Wide455
          TitleFlex
          title="임시 삭제함 (리서치툴)"
          buttonType="Fill"
          isModal={true}
          onCancel={() => setIsTrashModalOpen(false)}
          body={
            <>
              <div className="deleted-wrap">
                {deletedTools.length > 0 ? (
                  deletedTools.map((tool) => (
                    <div key={tool._id}>
                      <images.GridCircle
                        color={palette.gray700}
                        width={12}
                        height={12}
                      />
                      <div className="content">
                        <Sub3 color="gray800" align="left">
                          <p>{getToolName(tool) || ""}</p>
                          <p>{getToolDescription(tool) || ""}</p>
                        </Sub3>
                        <Caption1 color="gray500" align="left">
                          삭제일 : {formatDate(tool.timestamp)}
                        </Caption1>
                      </div>
                      <div className="button">
                        <span
                          onClick={() =>
                            handleRestoreTool(tool._id, tool.toolType)
                          }
                        >
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
    </>
  );
};

export default PageStorageBox;

const StorageBoxWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 64px;
  margin: 50px auto;
`;

const StorageBoxTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const DashBoardItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .title {
    display: flex;
    align-items: center;
    gap: 12px;

    button {
      margin-left: auto;
    }
  }
`;

export const TabWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TabButton = styled.button`
  font-family: "Pretendard", "Poppins";
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 4px 16px;
  border-radius: 50px;
  cursor: pointer;

  ${({ isActive }) =>
    isActive
      ? `
    background: rgba(34, 111, 255, 0.1);
    border: 1px solid ${palette.primary};
    color: ${palette.primary};
    font-weight: 500;
  `
      : `
    background: ${palette.chatGray};
    border: 1px solid ${palette.outlineGray};
    color: ${palette.gray500};
    font-weight: 300;
  `}
`;

export const TabButtonType2 = styled(TabButton)`
  flex: 1;
  border: 0;

  ${({ isActive }) =>
    isActive
      ? `
    background: ${palette.white};
    color: ${palette.gray800};
  `
      : `
    background: transparent;
  `}
`;

export const TabWrapType2 = styled(TabWrap)`
  gap: 4px;
  width: 100%;
  padding: 4px;
  border-radius: 20px;
  background: ${palette.chatGray};
`;

export const TabWrapType3 = styled(TabWrap)`
  gap: 16px !important;
  border-bottom: ${(props) =>
    props.Border ? `1px solid ${palette.outlineGray}` : "none"};
`;

export const TabButtonType3 = styled(TabButton)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 1rem;
  padding: 0;
  border-radius: 0;
  border: 0;
  background: transparent;
  transition: all 0.5s;

  &:after {
    height: 3px;
    background: ${palette.gray800};
    content: "";
    transition: all 0.5s;
  }

  ${({ isActive }) =>
    isActive
      ? `
        color: ${palette.gray800};
        font-weight: 500;

        &:after { 
          width: 100%;
        }
      `
      : `
        &:after {
          width: 0;
        }
      `}
`;

export const TabWrapType4 = styled(TabWrap)`
  gap: 16px !important;
`;

export const TabButtonType4Main = styled(TabButton)`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid ${palette.outlineGray};
  cursor: pointer;

  ${({ isActive }) =>
    isActive
      ? `
      background: ${palette.chatGray};
    `
      : `
      background: ${palette.white};
    `}
`;

export const TabButtonType4 = styled(TabButton)`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid ${palette.outlineGray};
  cursor: pointer;

  ${({ active }) =>
    active
      ? `
      color: ${palette.gray700};
      background: ${palette.chatGray};
    `
      : `
      background: ${palette.white};
    `}
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
