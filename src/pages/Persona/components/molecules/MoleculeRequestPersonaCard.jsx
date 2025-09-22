//비즈니스 맞춤 페르소나
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { palette } from "../../../../assets/styles/Palette";
import { useAtom } from "jotai";
import {
  PROJECT_ID,
  IS_LOGGED_IN,
  REQUESTED_PERSONA,
  BUSINESS_ANALYSIS,
} from "../../../AtomStates";
import images from "../../../../assets/styles/Images";
import {
  ContentSection,
  Title,
  CustomizePersona,
  InterviewPopup,
  Status,
  TabWrapType2,
  TabButtonType2,
  TabContent,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import { H4, Body3, Sub3 } from "../../../../assets/styles/Typography";
import PopupWrap from "../../../../assets/styles/Popup";
import { updateProjectOnServer } from "../../../../utils/indexedDB";
import { getProjectByIdFromIndexedDB } from "../../../../utils/indexedDB";
import { createRequestPersonaOnServer } from "../../../../utils/indexedDB";

const MoleculeRequestPersonaCard = ({ persona, personaIndex }) => {
  const [businessAnalysis, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [requestedPersona, setRequestedPersona] = useAtom(REQUESTED_PERSONA);
  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [selectedPersonaForPopup, setSelectedPersonaForPopup] = useState(null);
  const [activeTab, setActiveTab] = useState("lifestyle");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [activeTab1, setActiveTab1] = useState("lifestyle");

  //요청된 페르소나 요청 로드
  useEffect(() => {
    const loadRequestedPersona = async () => {
      try {
        const currentProject = await getProjectByIdFromIndexedDB(
          projectId,
          isLoggedIn
        );
        //currentProject에서 요청된 페르소나 목록을 가져오되, 없으면 빈 배열을 사용하여 requestedPersona 상태를 설정
        setRequestedPersona(currentProject?.requestedPersona || []);
      } catch (error) {
        console.error("요청된 페르소나 데이터 로딩 중 오류 발생:", error);
      }
    };

    loadRequestedPersona();
  }, [projectId, isLoggedIn, setRequestedPersona]);

  const isPersonaRequested = () => {
    return requestedPersona?.some(
      (persona) => persona.personaIndex === personaIndex
    );
  };
  const handleInterviewRequest = async () => {
    setSelectedPersonaForPopup(null);

    try {
      // 현재 서버에 저장된 requestedPersona 값을 가져옴
      const currentProject = await getProjectByIdFromIndexedDB(
        projectId,
        isLoggedIn
      );
      const currentRequestedPersona = currentProject?.requestedPersona || [];

      // 중복 체크
      const isDuplicate = currentRequestedPersona.some(
        (persona) => persona.personaIndex === personaIndex
      );

      if (!isDuplicate) {
        // 새로운 requestedPersona 배열 생성
        const newRequestedPersona = [
          ...currentRequestedPersona,
          {
            personaIndex: personaIndex,
          },
        ];

        // 서버 업데이트
        await updateProjectOnServer(
          projectId,
          {
            requestedPersona: newRequestedPersona,
          },
          isLoggedIn
        );

        const requestData = {
          projectId: projectId,
          requestDate: new Date().toLocaleString("ko-KR", {
            timeZone: "Asia/Seoul",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          businessAnalysis: businessAnalysis,
          personaRequest: { persona },
        };
        createRequestPersonaOnServer(requestData, isLoggedIn);
        // 로컬 상태 업데이트
        setRequestedPersona(newRequestedPersona);
        setShowSuccessPopup(true);
      } else {
        setShowSuccessPopup(true);
        // console.log("이미 요청된 페르소나입니다.");
      }
    } catch (error) {
      console.error("페르소나 요청 중 오류 발생:", error);
    }
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
  };

  return (
    <>
      <CardPersona>
        <span>
          <img
            src={
              isPersonaRequested() ? images.CheckCircleFill : images.CheckCircle
            }
            alt={isPersonaRequested() ? "요청 완료" : "요청 필요"}
          />
          {isPersonaRequested() ? "요청 완료" : "요청 필요"}
        </span>

        <div>
          <h4>{persona.persona}</h4>
          <p className="keywords">
            {persona.keyword.map((keyword, idx) => (
              <span key={idx}>#{keyword}</span>
            ))}
          </p>
          <div className="content">{persona.lifestyle}</div>
        </div>

        <Button Small Primary onClick={() => setSelectedPersonaForPopup(true)}>
          자세히 보기
          <img src={images.ChevronRightPrimary} alt="" />
        </Button>
      </CardPersona>

      {selectedPersonaForPopup && (
        <InterviewPopup>
          <div>
            <div className="header">
              <H4>
                {persona.persona}
                <span
                  className="close"
                  onClick={() => setSelectedPersonaForPopup(null)}
                />
              </H4>
              <div className="info">
                <Sub3>{persona.gender}</Sub3>
                <Sub3>{persona.age}</Sub3>
                <Sub3>{persona.residence} 거주</Sub3>
              </div>
            </div>

            <div className="keywords">
              {persona.keyword.map((keyword, idx) => (
                <Status key={idx}>#{keyword}</Status>
              ))}
            </div>

            <div className="content">
              <TabWrapType2>
                <TabButtonType2
                  className={activeTab === "lifestyle" ? "active" : ""}
                  onClick={() => setActiveTab("lifestyle")}
                >
                  라이프스타일
                </TabButtonType2>
                <TabButtonType2
                  className={activeTab === "interests" ? "active" : ""}
                  onClick={() => setActiveTab("interests")}
                >
                  관심사
                </TabButtonType2>
                <TabButtonType2
                  className={activeTab === "consumption" ? "active" : ""}
                  onClick={() => setActiveTab("consumption")}
                >
                  소비성향
                </TabButtonType2>
              </TabWrapType2>

              {activeTab === "lifestyle" && (
                <TabContent>
                  <Body3 color="gray700">{persona.lifestyle}</Body3>
                </TabContent>
              )}
              {activeTab === "interests" && (
                <TabContent>
                  <Body3 color="gray700">{persona.interest}</Body3>
                </TabContent>
              )}
              {activeTab === "consumption" && (
                <TabContent>
                  <Body3 color="gray700">{persona.consumption_pattern}</Body3>
                </TabContent>
              )}
            </div>

            {/* <Button
              Large
              Primary={!isPersonaRequested()}
              Fill={!isPersonaRequested()}
              style={{ width: "100%", marginTop: "16px" }}
              onClick={handleInterviewRequest}
              disabled={isPersonaRequested()}
            >
              {isPersonaRequested()
                ? "이미 요청한 페르소나입니다"
                : "인터뷰 준비 요청하기"}
            </Button> */}
          </div>
        </InterviewPopup>
      )}

      {showSuccessPopup && (
        <PopupWrap
          Check
          title={
            <>
              인터뷰 준비 요청이 완료되었습니다.
              <br />
              완료 후 알림을 보내드릴게요
            </>
          }
          buttonType="Outline"
          closeText="확인"
          isModal={false}
          onCancel={handleSuccessPopupClose}
          show={true}
        />
      )}
    </>
  );
};

export default MoleculeRequestPersonaCard;

const CardPersona = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-size: 0.63rem;
    line-height: 1.2;
    color: ${palette.primary};

    img {
      width: 12px;
      height: 12px;
    }
  }

  h4 {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.3;
    color: ${palette.gray700};
    text-align: left;
  }

  .keywords {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 4px;
    margin: 8px auto 20px;

    span {
      font-size: 0.75rem;
      line-height: 1.2;
      color: ${palette.gray700};
      line-height: 1.5;
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid ${palette.outlineGray};
    }
  }

  .content {
    position: relative;
    height: 95px;
    font-size: 0.75rem;
    line-height: 1.5;
    font-weight: 300;
    color: ${palette.gray500};
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    // -webkit-line-clamp: 5;
    // -webkit-box-orient: vertical;

    &:before {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 44px;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        ${palette.white} 80%
      );
      content: "";
    }
  }

  button {
    width: 100%;
    margin-top: auto;
  }
`;

// const InterviewPopup = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 200;

//   > div {
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     max-width: 450px;
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: flex-start;
//     gap: 20px;
//     padding: 32px 24px;
//     border-radius: 15px;
//     background: ${palette.white};
//     box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.15);
//   }

//   .header {
//     display: flex;
//     align-items: flex-start;
//     justify-content: flex-start;
//     flex-direction: column;
//     gap: 4px;
//     width: 100%;

//     h4 {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       gap: 10px;
//       width: 100%;
//       font-size: 1.25rem;
//       font-weight: 500;
//       line-height: 1.3;
//       color: ${palette.gray800};
//       text-align: left;

//       .close {
//         position: relative;
//         width: 16px;
//         height: 16px;
//         cursor: pointer;

//         &:before,
//         &:after {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           width: 2px;
//           height: 16px;
//           background: ${palette.gray700};
//           content: "";
//         }

//         &:before {
//           transform: translate(-50%, -50%) rotate(45deg);
//         }

//         &:after {
//           transform: translate(-50%, -50%) rotate(-45deg);
//         }
//       }
//     }

//     .info {
//       display: flex;
//       align-items: center;
//       justify-content: flex-start;
//       gap: 6px;
//       width: 100%;

//       span {
//         display: flex;
//         align-items: center;
//         justify-content: flex-start;
//         gap: 6px;
//         font-size: 0.875rem;
//         font-weight: 300;
//         line-height: 1.5;
//         color: ${palette.gray700};

//         + span:before {
//           content: "";
//           display: inline-block;
//           width: 1px;
//           height: 9px;
//           background: ${palette.gray700};
//         }
//       }
//     }
//   }

//   .keywords {
//     display: flex;
//     align-items: center;
//     justify-content: flex-start;
//     gap: 4px;
//     width: 100%;
//     flex-wrap: wrap;

//     span {
//       font-size: 0.875rem;
//       font-weight: 300;
//       line-height: 1.5;
//       color: ${palette.gray700};
//       text-align: left;
//       padding: 4px 8px;
//       border-radius: 4px;
//       border: 1px solid ${palette.outlineGray};
//     }
//   }

//   .content {
//     width: 100%;
//   }
// `;

const TabButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  padding: 4px;
  border-radius: 20px;
  background: ${palette.chatGray};

  button {
    width: 100%;
    font-family: "Pretendard", "Poppins";
    font-size: 1rem;
    font-weight: 300;
    color: ${palette.gray500};
    padding: 6px 10px;
    border-radius: 20px;
    border: 0;
    background: transparent;
    transition: all 0.5s;

    &.active {
      font-weight: 400;
      color: ${palette.gray800};
      background: ${palette.white};
    }
  }
`;

// const TabContent = styled.div`
//   width: 100%;
//   // max-height: 246px;
//   height: 246px;
//   margin-top: 18px;
//   overflow-y: auto;
//   line-height: 1.5;
//   color: ${palette.gray700};
//   text-align: left;
// `;
