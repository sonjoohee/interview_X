import React, { useState } from "react";
import { useAtom } from "jotai";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import {
  Body1,
  Body2,
  Body3,
  Sub3,
  Caption1,
} from "../../../../assets/styles/Typography";
import {
  PROJECT_ID,
  PROJECT_SAAS,
  ACCESS_DASHBOARD,
  ACCESS_STATE_SAAS,
  PROJECT_TOTAL_INFO,
  PROJECT_CREATE_INFO,
  SINGLE_INTERVIEW_QUESTION_LIST,
  INTERVIEW_QUESTION_LIST,
  CUSTOM_THEORY_DATA,
} from "../../../../pages/AtomStates";
import { getProjectByIdFromIndexedDB } from "../../../../utils/indexedDB";
import PopupWrap from "../../../../assets/styles/Popup";

const OrganismProjectItem = ({ project, onClick, isNoData, onDelete }) => {
  const navigate = useNavigate();

  const [, setProjectId] = useAtom(PROJECT_ID);
  const [, setProjectSaas] = useAtom(PROJECT_SAAS);
  const [, setAccessDashboard] = useAtom(ACCESS_DASHBOARD);
  const [, setAccessStateSaas] = useAtom(ACCESS_STATE_SAAS);
  const [, setProjectTotalInfo] = useAtom(PROJECT_TOTAL_INFO);
  const [, setProjectCreateInfo] = useAtom(PROJECT_CREATE_INFO);
  const [, setSingleInterviewQuestionList] = useAtom(
    SINGLE_INTERVIEW_QUESTION_LIST
  );
  const [, setInterviewQuestionList] = useAtom(INTERVIEW_QUESTION_LIST);
  const [, setCustomTheoryData] = useAtom(CUSTOM_THEORY_DATA);

  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = async () => {
    if (onClick) {
      onClick();
    } else if (isNoData) {
      navigate("/ProjectCreate");
    } else {
      setProjectId(project._id);
      setProjectSaas(project);
      setAccessDashboard(true);
      setAccessStateSaas(true);

      const projectTotalData = {
        projectTitle: project.projectTitle,
        projectDescription: project.projectDescription,
        businessModel: project.businessModel,
        industryType: project.industryType,
        targetCountry: project.targetCountry,
        projectAnalysis: project.projectAnalysis,
        files: project?.files?.map((file, index) => ({
          id: file.id,
          name: file.name,
        })),
      };
      setProjectTotalInfo(projectTotalData || {});
      setProjectCreateInfo(project.projectAnalysis || {});
      setSingleInterviewQuestionList(project.singleInterviewQuestionList || []);
      setInterviewQuestionList(project.interviewQuestionList || []);
      setCustomTheoryData(project.customTheoryData || {});

      // 프로젝트 데이터를 state로 전달하여 DashBoard 페이지로 이동
      navigate("/DashBoard");
    }
  };

  const handleDotsClick = (e) => {
    e.stopPropagation(); // 상위 요소로의 이벤트 전파 방지
    setShowTooltip(!showTooltip);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowTooltip(false);
    if (onDelete) {
      onDelete(project);
    }
  };

  // 랜덤 썸네일 이미지를 가져오는 함수
  const getRandomThumbnail = () => {
    const randomNum = Math.floor(Math.random() * 20) + 1;
    const thumbnailKey = `ProjectThumbnail${String(randomNum).padStart(
      2,
      "0"
    )}`;
    return images[thumbnailKey];
  };

  return (
    <ProjectItem
      NoData={isNoData}
      onClick={handleClick}
      className="project-item"
    >
      {!isNoData ? (
        <>
          <div className="thumbnail">
            <img
              src={images[project?.thumbnail] || getRandomThumbnail()}
              alt=""
            />
          </div>
          <div className="content">
            <div className="info">
              <Body1 color="gray800" align="left">
                <span className="project-title-text">
                  {project?.user?.split('@')[0]?.split('_')?.pop()?.toUpperCase()?.includes('TEAM') && project?.user != sessionStorage.getItem('userEmail') ?
                    <span className="user-prefix">[{project?.user ? project?.user?.split('@')[0]?.split('_')?.pop()?.toUpperCase() : ''}]</span> 
                    : null
                  }
                  {project?.projectTitle || ""}
                </span>
                <span className="dots-wrapper" onClick={handleDotsClick}>
                  <images.ThreeDotsVertical />
                  {showTooltip && (
                    <Tooltip>
                      {/* <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M2 4.39997C2 3.76345 2.25286 3.153 2.70294 2.70291C3.15303 2.25283 3.76348 1.99997 4.4 1.99997H11.6C12.2365 1.99997 12.847 2.25283 13.2971 2.70291C13.7471 3.153 14 3.76345 14 4.39997V11.6C14 12.2365 13.7471 12.8469 13.2971 13.297C12.847 13.7471 12.2365 14 11.6 14H4.4C3.76348 14 3.15303 13.7471 2.70294 13.297C2.25286 12.8469 2 12.2365 2 11.6V4.39997Z"
                            stroke="#8C8C8C"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.90002 7.39996C6.72845 7.39996 7.40002 6.72839 7.40002 5.89996C7.40002 5.07154 6.72845 4.39996 5.90002 4.39996C5.0716 4.39996 4.40002 5.07154 4.40002 5.89996C4.40002 6.72839 5.0716 7.39996 5.90002 7.39996Z"
                            stroke="#8C8C8C"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.51562 8.37256L4.40002 14H11.6798C12.2952 14 12.8853 13.7555 13.3205 13.3204C13.7556 12.8853 14 12.2951 14 11.6798V11.6C14 11.3204 13.895 11.213 13.706 11.006L11.288 8.36896C11.1753 8.24603 11.0382 8.14794 10.8855 8.08094C10.7328 8.01395 10.5678 7.97952 10.401 7.97986C10.2343 7.9802 10.0694 8.0153 9.91695 8.08291C9.7645 8.15052 9.62782 8.24917 9.51562 8.37256Z"
                            stroke="#8C8C8C"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <Caption1 color="gray500">이미지 변경</Caption1>
                      </div> */}
                      <div onClick={handleDeleteClick}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M2.22229 4.38889H13.7778M6.55562 7.27778V11.6111M9.44451 7.27778V11.6111M2.94451 4.38889L3.66673 13.0556C3.66673 13.4386 3.81892 13.806 4.0898 14.0769C4.36069 14.3478 4.72809 14.5 5.11118 14.5H10.889C11.272 14.5 11.6394 14.3478 11.9103 14.0769C12.1812 13.806 12.3334 13.4386 12.3334 13.0556L13.0556 4.38889M5.8334 4.38889V2.22222C5.8334 2.03068 5.90949 1.84698 6.04494 1.71153C6.18038 1.57609 6.36408 1.5 6.55562 1.5H9.44451C9.63606 1.5 9.81976 1.57609 9.9552 1.71153C10.0906 1.84698 10.1667 2.03068 10.1667 2.22222V4.38889"
                            stroke="#8C8C8C"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <Caption1 color="gray500">삭제</Caption1>
                      </div>
                    </Tooltip>
                  )}
                </span>
              </Body1>
              <Body3 color="gray700" align="left" className="description">
                {project?.projectDescription ||
                  "프로젝트에 대한 개요적인 부분을 설명하는 문장을 넣는 공간입니다."}
              </Body3>
            </div>
            <div className="date">
              <Sub3 color="gray700" align="left">
                마지막 업데이트 : {project?.updateDate || project?.createDate}
              </Sub3>
            </div>
          </div>
        </>
      ) : (
        <div className="noData">
          <img src={images.PlusSquareWhite} alt="새 작업" />
          <Body2 color="primary">새 프로젝트를 시작하세요</Body2>
        </div>
      )}
    </ProjectItem>
  );
};

export default OrganismProjectItem;

const ProjectItem = styled.div`
  max-width: 31.9%;
  // max-height: 350px;
  max-height: 330px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // justify-content: space-around;
  // overflow: hidden;
  border: 1px solid ${palette.outlineGray};
  border-radius: 20px;
  background: ${palette.chatGray};
  cursor: pointer;
  height: ${(props) => (props.NoData ? "100%" : "auto")};
  min-height: ${(props) => (props.NoData ? "300px" : "auto")};
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${palette.primary};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }

  .thumbnail {
    width: 100%;
    max-height: 200px;
    height: 100%;
    border-radius: 20px 20px 0 0;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .info {
      display: flex;
      flex-direction: column;
      // gap: 8px;

      ${Body1} {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;

        .user-prefix {
          color: ${palette.gray600};
          margin-right: 4px;
        }

        .project-title-text {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          min-width: 0;
          flex-grow: 1;
        }

        .dots-wrapper {
          position: relative;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }
      }

      .description {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .date {
      padding-top: 12px;
      border-top: 1px solid ${palette.outlineGray};
    }
  }

  .noData {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: 0;
  left: 20px;
  min-width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 8px 0;
  border-radius: 4px;
  background: ${palette.white};

  > div {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    width: 100%;
    padding: 2px 8px;
    transition: all 0.5s;

    &:hover {
      background: rgba(34, 111, 255, 0.1);

      ${Caption1} {
        color: ${palette.primary};
      }

      svg {
        path {
          stroke: ${palette.primary};
        }
      }
    }

    + div {
      &:before {
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        content: "";
        display: block;
        width: calc(100% - 16px);
        height: 1px;
        background: ${palette.outlineGray};
      }
    }
  }
`;
