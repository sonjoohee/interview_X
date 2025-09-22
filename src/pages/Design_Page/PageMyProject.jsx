import React, { useState } from "react";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";
import IncNavigation from "./IncNavigation";
import Header from "./IncHeader";
import {
  ContentsWrap,
  MainContent,
} from "../../assets/styles/BusinessAnalysisStyle";
import { Badge } from "../../assets/styles/Badge";

const PageMyProject = () => {
  const [openStates, setOpenStates] = useState({});
  const [closingStates, setClosingStates] = useState({});

  const toggleView = (projectId) => {
    if (openStates[projectId]) {
      // 닫을 때
      setClosingStates((prev) => ({ ...prev, [projectId]: true }));
      setTimeout(() => {
        setOpenStates((prev) => ({ ...prev, [projectId]: false }));
        setClosingStates((prev) => ({ ...prev, [projectId]: false }));
      }, 280); // 애니메이션 시간보다 살짝 짧게
    } else {
      // 열 때
      setOpenStates((prev) => ({ ...prev, [projectId]: true }));
    }
  };

  return (
    <>
      <ContentsWrap>
        <IncNavigation />

        <Header />

        <MainContent>
          <MyProjectWrap>
            <Title>프로젝트 리스트</Title>

            <ProjectList>
              <ProjectHeader>
                <div>프로젝트 명</div>
                <div>맞춤 페르소나</div>
                <div>페르소나 모집</div>
                <div>결과 리포트</div>
              </ProjectHeader>

              <ProjectContent>
                <ProjectItem $isOpen={openStates[1]}>
                  <ProjectInfo>
                    <Name>
                      <strong>
                        쉽고 빠르게 송금 및 이체 할 수 있는 어플리케이션
                      </strong>
                      <span>생성일 - 2024. 10. 26</span>
                    </Name>
                    <Persona>
                      <div>
                        <span>기본형</span>
                        <p>4명</p>
                      </div>
                      <div>
                        <span>커스터마이즈</span>
                        <p>
                          2명
                          <Badge New />
                        </p>
                      </div>
                    </Persona>
                    <Recruit>
                      <span>3개 페르소나</span>
                      <p className="complete">1그룹 모집 완료</p>
                    </Recruit>
                    <Report>
                      <div>
                        <span>Report</span>
                        <p>4건</p>
                      </div>
                      <div>
                        <button onClick={() => toggleView(1)}>
                          자세히 보기
                        </button>
                      </div>
                    </Report>
                  </ProjectInfo>

                  {openStates[1] && (
                    <ProjectButton>
                      <p>6명의 맞춤 페르소나가 사용자님을 기다리고 있어요!</p>
                      <button>바로가기</button>
                    </ProjectButton>
                  )}
                </ProjectItem>

                {openStates[1] && (
                  <ProjectView className={closingStates[1] ? "closing" : ""}>
                    <ViewInfo>
                      <div className="title">
                        제품 경험 평가
                        <span>2024.10.12</span>
                      </div>
                      <div className="info">
                        <div>
                          <span>문항수</span>
                          <p>3개</p>
                        </div>
                        <div>
                          <span>참여페르소나</span>
                          <p>5명</p>
                        </div>
                      </div>
                      <div className="button">
                        <button className="view">자세히 보기</button>
                        <button className="analysis">결과 분석 보기</button>
                      </div>
                    </ViewInfo>
                    <ViewInfo>
                      <div className="title">
                        제품 경험 평가
                        <span>2024.10.12</span>
                      </div>
                      <div className="info">
                        <div>
                          <span>문항수</span>
                          <p>3개</p>
                        </div>
                        <div>
                          <span>참여페르소나</span>
                          <p>5명</p>
                        </div>
                      </div>
                      <div className="button">
                        <button className="view">자세히 보기</button>
                        <button className="analysis">결과 분석 보기</button>
                      </div>
                    </ViewInfo>
                  </ProjectView>
                )}

                <ProjectItem $isOpen={openStates[2]}>
                  <ProjectInfo>
                    <Name>
                      <strong>
                        쉽고 빠르게 송금 및 이체 할 수 있는 어플리케이션
                      </strong>
                      <span>생성일 - 2024. 10. 26</span>
                    </Name>
                    <Persona>
                      <div>
                        <span>기본형</span>
                        <p>4명</p>
                      </div>
                      <div>
                        <span>커스터마이즈</span>
                        <p>2명</p>
                      </div>
                    </Persona>
                    <Recruit>
                      <span>3개 페르소나</span>
                      <p className="ing">1그룹 모집 중</p>
                    </Recruit>
                    <Report>
                      <div>
                        <span>Report</span>
                        <p>4건</p>
                      </div>
                      <div>
                        <button onClick={() => toggleView(2)}>
                          자세히 보기
                        </button>
                      </div>
                    </Report>
                  </ProjectInfo>

                  {openStates[2] && (
                    <ProjectButton>
                      <p>6명의 맞춤 페르소나가 사용자님을 기다리고 있어요!</p>
                      <button>바로가기</button>
                    </ProjectButton>
                  )}
                </ProjectItem>

                {openStates[2] && (
                  <ProjectView className={closingStates[2] ? "closing" : ""}>
                    <ViewInfo>
                      <div className="title">
                        제품 경험 평가
                        <span>2024.10.12</span>
                      </div>
                      <div className="info">
                        <div>
                          <span>문항수</span>
                          <p>3개</p>
                        </div>
                        <div>
                          <span>참여페르소나</span>
                          <p>5명</p>
                        </div>
                      </div>
                      <div className="button">
                        <button className="view">자세히 보기</button>
                        <button className="analysis">결과 분석 보기</button>
                      </div>
                    </ViewInfo>
                    <ViewInfo>
                      <div className="title">
                        제품 경험 평가
                        <span>2024.10.12</span>
                      </div>
                      <div className="info">
                        <div>
                          <span>문항수</span>
                          <p>3개</p>
                        </div>
                        <div>
                          <span>참여페르소나</span>
                          <p>5명</p>
                        </div>
                      </div>
                      <div className="button">
                        <button className="view">자세히 보기</button>
                        <button className="analysis">결과 분석 보기</button>
                      </div>
                    </ViewInfo>
                  </ProjectView>
                )}

                <ProjectItem $isOpen={openStates[3]}>
                  <ProjectInfo>
                    <Name>
                      <strong>
                        쉽고 빠르게 송금 및 이체 할 수 있는 어플리케이션
                      </strong>
                      <span>생성일 - 2024. 10. 26</span>
                    </Name>
                    <Persona>
                      <div>
                        <span>기본형</span>
                        <p>4명</p>
                      </div>
                      <div>
                        <span>커스터마이즈</span>
                        <p>2명</p>
                      </div>
                    </Persona>
                    <Recruit>
                      <span>3개 페르소나</span>
                      <p>대기중</p>
                    </Recruit>
                    <Report>
                      <div>
                        <span>Report</span>
                        <p>4건</p>
                      </div>
                      <div>
                        <button onClick={() => toggleView(3)}>
                          자세히 보기
                        </button>
                      </div>
                    </Report>
                  </ProjectInfo>

                  {openStates[3] && (
                    <ProjectButton>
                      <p>6명의 맞춤 페르소나가 사용자님을 기다리고 있어요!</p>
                      <button>바로가기</button>
                    </ProjectButton>
                  )}
                </ProjectItem>

                {openStates[3] && (
                  <ProjectView className={closingStates[2] ? "closing" : ""}>
                    <ViewInfoNodata>
                      <div>
                        <img src="" alt="nodata" />

                        <div>
                          현재 리포트가 비어 있습니다.
                          <br />
                          추천 페르소나와 인터뷰를 완료하시면 결과 리포트를
                          확인할 수 있습니다.
                          <span>AI 페르소나와 인터뷰 진행하기</span>
                        </div>
                      </div>
                    </ViewInfoNodata>
                  </ProjectView>
                )}
              </ProjectContent>
            </ProjectList>
          </MyProjectWrap>
        </MainContent>
      </ContentsWrap>
      
    </>
  );
};

export default PageMyProject;

const MyProjectWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 50px auto;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${palette.gray800};
  padding-bottom: 20px;
  border-bottom: 1px solid ${palette.outlineGray};
`;

const ProjectList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  > div {
    flex-grow: 1;
    font-weight: 300;
    color: ${palette.gray500};
    text-align: left;
  }

  > div:nth-child(1) {
    max-width: 475px;
    width: 100%;
  }

  > div:nth-child(2) {
    max-width: 220px;
    width: 100%;
  }

  > div:nth-child(3) {
    max-width: 150px;
    width: 100%;
  }
`;

const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProjectItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
  background-color: ${palette.white};
  z-index: 1;
  transition: box-shadow 0.3s ease-in-out;

  ${({ $isOpen }) =>
    $isOpen &&
    `
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.12);
  `}
`;

const ProjectInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  max-width: 440px;
  width: 100%;
  font-weight: 400;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;

  span {
    font-size: 0.75rem;
    font-weight: 300;
    color: ${palette.gray500};
  }
`;

const Persona = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  max-width: 230px;
  width: 100%;
  padding: 8px;

  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5px 24px;
    flex: 1;
    text-align: left;

    + div:before {
      position: absolute;
      top: 50%;
      left: -12px;
      transform: translateY(-50%);
      width: 1px;
      height: 19px;
      background-color: ${palette.outlineGray};
      content: "";
    }

    span {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 4px;
      font-size: 0.75rem;
      color: ${palette.gray300};
    }

    p {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 4px;
      font-size: 0.875rem;
      color: ${palette.gray700};
    }
  }
`;

const Recruit = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  max-width: 155px;
  width: 100%;

  span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 0.75rem;
    color: ${palette.gray300};
  }

  p {
    font-size: 0.875rem;
    color: ${palette.gray700};

    &.ing {
      color: ${palette.primary};
    }

    &.complete {
      color: ${palette.green};
    }
  }
`;

const Report = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 0.75rem;
    color: ${palette.gray300};
  }

  p {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 0.875rem;
    color: ${palette.gray700};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-family: "Pretendard", poppins;
    font-size: 0.75rem;
    font-weight: 400;
    color: ${palette.gray500};
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid ${palette.outlineGray};
    background-color: ${palette.chatGray};
  }
`;

const ProjectButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 12px;
  border-top: 1px solid ${palette.outlineGray};

  p {
    font-size: 0.875rem;
    color: ${palette.gray800};
  }

  button {
    font-family: "Pretendard", poppins;
    font-size: 0.75rem;
    color: ${palette.white};
    padding: 6px 10px;
    border-radius: 4px;
    border: none;
    background-color: ${palette.primary};
  }
`;

const ProjectView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
  padding: 28px 20px 20px;
  margin-top: -20px;
  border-radius: 0 0 10px 10px;
  border: 1px solid ${palette.outlineGray};
  background-color: ${palette.chatGray};
  animation: slideDown 0.3s ease-in-out;
  transform-origin: top;
  opacity: 1;

  &.closing {
    animation: slideUp 0.3s ease-in-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
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

const ViewInfoNodata = styled(ViewInfo)`
  justify-content: center;
  padding: 24px 0 16px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      line-height: 1.5;
      color: ${palette.gray500};

      span {
        font-size: 0.875rem;
        font-weight: 300;
        line-height: 1.5;
        color: ${palette.primary};
        padding: 6px 10px;
        border-radius: 6px;
        border: 1px solid ${palette.primary};
        background-color: #e9f1ff;
        cursor: pointer;
      }
    }
  }
`;
