import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import {
  IS_PERSONA_ACCESSIBLE,
  IS_LOGGED_IN,
  PERSONA_STEP,
  SELECTED_INTERVIEW_PURPOSE,
  PERSONA_LIST,
  PERSONA_BUTTON_STATE_3,
  BUSINESS_ANALYSIS,
  REQUEST_PERSONA_LIST,
  PROJECT_LOAD_BUTTON_STATE,
  PROJECT_ID,
} from "../../../AtomStates";
import {
  ContentsWrap,
  ContentSection,
  MainContent,
  AnalysisWrap,
  MainSection,
  Title,
  CardWrap,
  CustomizePersona,
  AccordionSection,
  // AccordionHeader,  // 제거
  // AccordionIcon,    // 제거
  // AccordionContent, // 제거
} from "../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import OrganismIncNavigation from "../organisms/OrganismIncNavigation";
import MoleculeHeader from "../../molecules/MoleculeHeader";
import MoleculeStepIndicator from "../molecules/MoleculeStepIndicator";
import MoleculeInterviewCard from "../molecules/MoleculeInterviewCard";
import MoleculePersonaCard from "../molecules/MoleculePersonaCard";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";
import { getProjectByIdFromIndexedDB } from "../../../../utils/indexedDB";
import OrganismBusinessAnalysis from "../organisms/OrganismBusinessAnalysis";
import PopupWrap from "../../../../assets/styles/Popup";
import OrganismToastPopup from "../organisms/OrganismToastPopup";

const PagePersona3 = () => {
  const navigate = useNavigate();
  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const [projectLoadButtonState, setProjectLoadButtonState] = useAtom(
    PROJECT_LOAD_BUTTON_STATE
  );
  const [personaButtonState3, setPersonaButtonState3] = useAtom(
    PERSONA_BUTTON_STATE_3
  );
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [isPersonaAccessible, setIsPersonaAccessible] = useAtom(
    IS_PERSONA_ACCESSIBLE
  );
  const [businessAnalysis, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [personaStep, setPersonaStep] = useAtom(PERSONA_STEP);
  const [selectedInterviewPurpose, setSelectedInterviewPurpose] = useAtom(
    SELECTED_INTERVIEW_PURPOSE
  );
  const [personaList, setPersonaList] = useAtom(PERSONA_LIST);
  const [requestPersonaList, setRequestPersonaList] =
    useAtom(REQUEST_PERSONA_LIST);

  const [interviewPurpose, setInterviewPurpose] = useState("");
  const [selectedInterviewType, setSelectedInterviewType] = useState("");
  const [activeCategory, setActiveCategory] = useState(1);
  const [showInterview, setShowInterview] = useState(false);
  const [showInterviewReady, setShowInterviewReady] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showEditPersona, setShowEditPersona] = useState(false);
  const [personaListState, setPersonaListState] = useState(null);
  const [showInterviewTypeAlert, setShowInterviewTypeAlert] = useState(false);

  // 인터뷰 목적 선택 핸들러 수정
  const handleInterviewPurposeSelect = (title) => {
    if (!selectedInterviewType) {
      setShowInterviewTypeAlert(true);
      return;
    }
    setInterviewPurpose(title);
  };

  const handlePopupClose = () => {
    setShowInterviewReady(false);
    setShowToast(false);
  };

  // const [isLoadingPage, setIsLoadingPage] = useState(true);

  const [steps, setSteps] = useState([
    { number: 1, label: "비즈니스 분석", active: true },
    { number: 2, label: "맞춤 페르소나 추천", active: true },
    { number: 3, label: "인터뷰 방법 선택", active: true },
    { number: 4, label: "페르소나와 인터뷰", active: false },
    { number: 5, label: "의견 분석", active: false },
  ]);

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  useEffect(() => {
    // 접근 가능 여부를 확인하여 차단 로직 수행
    if (!isPersonaAccessible) {
      navigate("/"); // 접근이 허용되지 않으면 메인 페이지로 리다이렉트
    }

    // 페이지를 나갈 때 접근 가능 여부 초기화
    return () => {
      setIsPersonaAccessible(false); // 페이지 떠날 때 접근 불가로 설정
    };
  }, []);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleInterviewTypeSelect = (type) => {
    setSelectedInterviewType(type);
  };

  const purposeItems = [
    {
      id: 1,
      category: "제품 사용 경험",
      title: "제품 경험 평가",
      description:
        "사용자의 기능, 디자인, 사용성 경험을 분석해 만족도와 불만족 요인을 도출",
      expandedContent: [
        "이 제품이 현재의 시장 경쟁 제품들과 비교해 독특하다고 느껴질 수 있는 요소는 무엇인가요?",
        "이 제품이 더 많은 사람들에게 매력적으로 다가가기 위해 추가되거나 개선되어야 할 가장 중요한 요소는 무엇이라고 생각하시나요?",
        "이 제품이 사용자에게 전달하려는 메시지나 숨겨진 이야기가 있다면, 그것은 무엇일까요?",
      ],
    },
    {
      id: 2,
      category: "제품 사용 경험",
      title: "사용 맥락 조사",
      description: "사용 환경과 패턴을 이해해 사용자 문제와 제약 요인을 해결",
      expandedContent: [
        "이 제품을 사용하는 데 있어 불편하거나 부적합할 수 있는 상황은 어떤 경우일까요?",
        "이 제품을 사용할 수 있는 환경에서 가장 중요한 조건은 무엇이라고 생각하시나요?",
        "이 제품이 예상치 못한 환경에서도 효과적으로 사용될 가능성이 있다면, 어떤 환경일까요?",
      ],
    },
    {
      id: 3,
      category: "구매 및 소비 심리",
      title: "구매 전환 요인 분석",
      description:
        "소비자의 구매 결정에 영향을 미치는 핵심 요인을 파악해 최적의 전략을 설계",
      expandedContent: [
        "이 제품에 대해 소비자가 가장 많이 질문할 가능성이 있는 부분은 무엇일까요?",
        "경쟁 제품 대비 이 제품이 소비자의 선택을 받을 가능성이 높은 이유는 무엇인가요?",
        "소비자가 이 제품을 구매하지 않을 가능성이 있다면, 그 이유는 무엇일까요?",
      ],
    },
    {
      id: 4,
      category: "구매 및 소비 심리",
      title: "소비자 행동 유도 요소 분석",
      description:
        "사용자의 행동을 유도하는 요소를 파악해 전환율과 참여를 극대화",
      expandedContent: [
        "이 제품이 구매를 망설이는 소비자의 마음을 바꿀 수 있다면, 어떤 요소가 가장 중요한 역할을 할까요?",
        "소비자가 이 제품에 대해 가장 큰 불신이나 의구심을 가질 가능성이 있다면, 그 이유는 무엇일까요?",
        "이 제품이 소비자의 행동을 더 효과적으로 유도하기 위해 추가하거나 수정해야 할 요소는 무엇인가요?",
      ],
    },
    {
      id: 5,
      category: "구매 및 소비 심리",
      title: "제품 기대치 확인",
      description: "초기 기대와 실제 경험의 차이를 줄여 사용자 만족도를 증대",
      expandedContent: [
        "이 제품이 소비자에게 가장 기대감을 줄 수 있는 핵심 요소는 무엇이라고 생각하시나요?",
        "이 제품이 소비자 기대를 현실적으로 충족시키는 동시에 놀라움을 제공하려면 어떤 점을 개선하거나 추가해야 할까요?",
        "이 제품이 소비자의 기대를 충족하지 못할 가능성이 있다면, 그 이유는 무엇일까요?",
      ],
    },
    {
      id: 6,
      category: "제품 사용 경험",
      title: "소비자 여정 맵핑",
      description:
        "다양한 시나리오에서 제품의 사용 가능성을 평가하여 부적합한 환경 발견",
      expandedContent: [
        "소비자가 이 제품의 구매를 결정하기 전에 가장 궁금해할 질문은 무엇일까요?",
        "소비자가 이 제품을 구매하는 과정을 상상했을 때, 가장 큰 장벽은 무엇일까요?",
        "이 제품을 구매 후, 소비자가 기대와 실제 사용 경험 간에 느낄 수 있는 가장 큰 차이는 무엇일까요?",
      ],
    },
    {
      id: 7,
      category: "구매 및 소비 심리",
      title: "제품 이해도 테스트",
      description: "사용자 관점에서 제품의 목적과 사용법을 평가해 접근성 강화",
      expandedContent: [
        "제품 설명을 기준으로, 이 제품이 해결하고자 하는 문제는 무엇이라고 생각하시나요?",
        "이 제품을 사용할 수 있는 환경에서 가장 중요한 조건은 무엇이라고 생각하시나요?",
        "이 제품의 가장 독특하거나 주목할 만한 기능은 무엇이라고 느껴지시나요?",
      ],
    },
    {
      id: 8,
      category: "사용자 시뮬레이션",
      title: "사용자 경험 시뮬레이션",
      description: "제품 사용을 가상으로 재현해 문제를 예측하고 설계를 최적화",
      expandedContent: [
        "이 제품이 당신의 일상에서 자연스럽게 사용될 가능성이 가장 높은 순간은 언제이며, 그 이유는 무엇인가요?",
        "이 제품을 사용하기 전과 사용한 후에 당신이 느낄 가장 큰 차이점은 무엇일 것 같나요?",
        "이 제품을 사용하는 과정에서 가장 큰 장애물로 예상되는 부분은 무엇이며, 이를 극복하려면 어떤 개선이 필요할까요?",
      ],
    },
  ];
  const purposeCategories = [
    { id: 1, label: "전체" },
    { id: 2, label: "제품 사용 경험" },
    { id: 3, label: "구매 및 소비 심리" },
    { id: 4, label: "사용자 시뮬레이션" },
  ];
  const categoryItems = {
    1: purposeItems,
    2: purposeItems.filter((item) => item.category === "제품 사용 경험"),
    3: purposeItems.filter((item) => item.category === "구매 및 소비 심리"),
    4: purposeItems.filter((item) => item.category === "사용자 시뮬레이션"),
  };

  const handleEnterInterviewRoom = () => {
    setPersonaStep(4);
    setPersonaButtonState3(1);
    handlePopupClose();
    setShowToast(true);
  };

  // 페르소나 선택/해제 처리 함수 추가
  const handlePersonaToggle = (persona, isCurrentlySelected) => {
    if (isCurrentlySelected) {
      // selected에서 제거하고 unselected로 이동
      if (personaListState.selected.length > 1) {
        setPersonaListState({
          selected: personaListState.selected.filter(
            (p) => p.persona !== persona.persona
          ),
          unselected: [...personaListState.unselected, persona],
        });
      }
    } else {
      // 선택 개수가 5개 미만일 때만 추가 허용
      if (personaListState.selected.length < 5) {
        setPersonaListState({
          selected: [...personaListState.selected, persona],
          unselected: personaListState.unselected.filter(
            (p) => p.persona !== persona.persona
          ),
        });
      }
    }
  };

  // 편집 팝업 열기
  const handleEditPersonaOpen = () => {
    setPersonaListState(personaList); // 현재 상태 저장
    setShowEditPersona(true);
  };

  // 이전으로 되돌리기
  const handleRevertPersonaList = () => {
    setPersonaListState(personaList);
  };

  // 편집 완료
  const handleConfirmEditPersona = () => {
    setPersonaList(personaListState);
    setShowEditPersona(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // 팝업이 열려있을 때
    if (showToast || showInterviewReady || showEditPersona) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px"; // 스크롤바 자리만큼 패딩 추가하여 레이아웃 밀림 방지
    }
    // 팝업이 닫혔을 때
    else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    }

    // 컴포넌트가 언마운트될 때 원래대로 복구
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    };
  }, [showToast, showInterviewReady, showEditPersona]);

  return (
    <>
      <ContentsWrap
        noScroll={showToast || showInterviewReady || showEditPersona}
      >
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent>
          <AnalysisWrap>
            <MainSection>
              <OrganismBusinessAnalysis personaStep={personaStep} />

              {/* 인터뷰 방식 선택 */}
              <>
                <CustomizePersona>
                  <CardWrap>
                    <Title>인터뷰 방식 선택</Title>

                    <InterviewTypeCards>
                      <InterviewTypeCard
                        isActive={selectedInterviewType === "multiple"}
                        onClick={() => handleInterviewTypeSelect("multiple")}
                      >
                        <CheckBox
                          isActive={selectedInterviewType === "multiple"}
                        />
                        <strong isActive={selectedInterviewType === "multiple"}>
                          여러 페르소나 인터뷰 (1:N)
                        </strong>
                        <p isActive={selectedInterviewType === "multiple"}>
                          여러 페르소나의 다양한 의견을 한 번에 확인 하세요.
                          폭넓은 시각과 다양한 의견을 파악하는데 적합합니다.
                        </p>
                      </InterviewTypeCard>

                      <InterviewTypeCard
                        isActive={selectedInterviewType === "single"}
                        // onClick={() => handleInterviewTypeSelect('single')}
                        disabled={true}
                      >
                        <CheckBox
                          isActive={selectedInterviewType === "single"}
                        />
                        <strong isActive={selectedInterviewType === "single"}>
                          한 명과 심층 인터뷰 (1:1)
                          <span>준비중</span>
                        </strong>
                        <p isActive={selectedInterviewType === "single"}>
                          한 명의 페르소나와 깊이 있는 대화를 통해 자세한
                          인사이트를 도출하세요. 구체적인 피드백이 필요한 경우
                          유용합니다.
                        </p>
                      </InterviewTypeCard>
                    </InterviewTypeCards>
                  </CardWrap>
                </CustomizePersona>

                <InterviewSelect>
                  <Title>인터뷰 목적 선택</Title>

                  <TabWrap>
                    {purposeCategories.map((category) => (
                      <TabButton
                        key={category.id}
                        isActive={activeCategory === category.id}
                        onClick={() => handleCategoryClick(category.id)}
                      >
                        {category.label}
                      </TabButton>
                    ))}
                  </TabWrap>

                  <TabContent>
                    {categoryItems[activeCategory].map((item) => (
                      <MoleculeInterviewCard
                        NoBackground
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        isSelected={interviewPurpose === item.title}
                        onSelect={(title) =>
                          handleInterviewPurposeSelect(title)
                        }
                        interviewPurpose={interviewPurpose}
                        isActive={interviewPurpose === item.title}
                      />
                    ))}
                  </TabContent>
                </InterviewSelect>

                <CustomizePersona style={{ marginBottom: "140px" }}>
                  <Title Column>
                    참여 페르소나 확인
                    <p>
                      인터뷰 참여 페르소나를 확인하세요. 변경은 편집하기 버튼을
                      통해 가능합니다
                      <span onClick={() => handleEditPersonaOpen()}>
                        <img src={images.PencilSquare} alt="" />
                        편집하기
                      </span>
                    </p>
                  </Title>
                  <ContentSection>
                    <PersonaCards>
                      {personaList.selected.map((persona, index) => {
                        const profileArray = persona.profile
                          .replace(/['\[\]]/g, "")
                          .split(", ");
                        const age = profileArray[0].split(": ")[1];
                        const gender =
                          profileArray[1].split(": ")[1] === "남성"
                            ? "남성"
                            : "여성";
                        const job = profileArray[2].split(": ")[1];

                        return (
                          <MoleculePersonaCard
                            NoLine
                            key={index}
                            title={persona.persona}
                            isBasic={true}
                            hideCheckCircle={true}
                            gender={gender}
                            age={age}
                            job={job}
                          />
                        );
                      })}
                    </PersonaCards>
                  </ContentSection>
                </CustomizePersona>
              </>
            </MainSection>

            <Sidebar>
              <h5>Start Your Interview</h5>

              <ProgressBar>
                <span className="icon">🚀</span>
                <Progress progress={60} />
                <span>60%</span>
              </ProgressBar>

              <MoleculeStepIndicator steps={steps} activeStep={3} />

              <InterviewRoom>
                <ul>
                  <li>
                    <span>방식</span>
                    <p>
                      {selectedInterviewType === "multiple"
                        ? "1:N 인터뷰"
                        : selectedInterviewType === "single"
                        ? "1:1 인터뷰"
                        : ""}
                    </p>
                  </li>
                  <li>
                    <span>목적</span>
                    <p>{interviewPurpose}</p>
                  </li>
                  <li>
                    <span>참여자</span>
                    <p>{personaList.selected.length}명</p>
                  </li>
                </ul>
                <Button
                  Large
                  Primary
                  Fill
                  disabled={!selectedInterviewType || !interviewPurpose}
                  style={{
                    cursor:
                      !selectedInterviewType || !interviewPurpose
                        ? "default"
                        : "pointer",
                  }}
                  onClick={() => setShowInterviewReady(true)}
                >
                  인터뷰룸 입장
                </Button>
              </InterviewRoom>
            </Sidebar>

            {showEditPersona && (
              <PopupWrap
                TitleFlex
                title="📝 페르소나 편집하기"
                buttonType="Fill"
                closeText="닫기"
                confirmText="편집완료"
                isModal={true}
                isFormValid={true}
                onCancel={() => setShowEditPersona(false)}
                onConfirm={() => {
                  handleConfirmEditPersona();
                }}
                body={
                  <>
                    <Title>
                      <p>
                        Selected
                        <span onClick={handleRevertPersonaList}>
                          <img src={images.ClockCounterclockwise} alt="" />
                          이전으로 되돌리기
                        </span>
                      </p>
                    </Title>
                    {personaListState.selected.map((persona, index) => {
                      const profileArray = persona.profile
                        .replace(/['\[\]]/g, "")
                        .split(", ");
                      const age = profileArray[0].split(": ")[1];
                      const gender =
                        profileArray[1].split(": ")[1] === "남성"
                          ? "남성"
                          : "여성";
                      const job = profileArray[2].split(": ")[1];

                      return (
                        <MoleculePersonaCard
                          key={index}
                          TitleFlex
                          title={persona.persona}
                          keywords={persona.keywords || []}
                          isBasic={true}
                          checked={true}
                          onSelect={() => handlePersonaToggle(persona, true)}
                          gender={gender}
                          age={age}
                          job={job}
                          newLine={true}
                        />
                      );
                    })}

                    <Title style={{ marginTop: "20px" }}>
                      <p>Available</p>
                    </Title>
                    {personaListState.unselected.map((persona, index) => {
                      const profileArray = persona.profile
                        .replace(/['\[\]]/g, "")
                        .split(", ");
                      const age = profileArray[0].split(": ")[1];
                      const gender =
                        profileArray[1].split(": ")[1] === "남성"
                          ? "남성"
                          : "여성";
                      const job = profileArray[2].split(": ")[1];

                      return (
                        <MoleculePersonaCard
                          key={index}
                          TitleFlex
                          title={persona.persona}
                          keywords={persona.keywords || []}
                          isBasic={true}
                          checked={false}
                          onSelect={() => handlePersonaToggle(persona, false)}
                          gender={gender}
                          age={age}
                          job={job}
                          newLine={true}
                        />
                      );
                    })}
                  </>
                }
              />
            )}

            {showInterviewReady && (
              <PopupWrap
                Check
                title="인터뷰 준비 완료"
                message={
                  <>
                    인터뷰 룸 이동 시, 바로 시작됩니다.
                    <br />
                    인터뷰를 중단하면 모든 내역이 삭제되니 주의하세요
                  </>
                }
                buttonType="Outline"
                closeText="취소"
                confirmText="시작하기"
                isModal={false}
                onCancel={handlePopupClose}
                onConfirm={() => {
                  handleEnterInterviewRoom();
                }}
              />
            )}

            {showToast && (
              <OrganismToastPopup
                isActive={showToast}
                onClose={() => setShowToast(false)}
              />
            )}

            {showInterviewTypeAlert && (
              <PopupWrap
                Warning
                title="인터뷰 방식을 선택해주세요"
                message="인터뷰 목적을 선택하기 전에 인터뷰 방식을 먼저 선택해주세요."
                buttonType="Outline"
                confirmText="확인"
                isModal={false}
                onCancel={() => setShowInterviewTypeAlert(false)}
                onConfirm={() => setShowInterviewTypeAlert(false)}
              />
            )}
          </AnalysisWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PagePersona3;

const InterviewRoom = styled.div`
  // display: ${(props) => (props.showInterview ? "flex" : "none")};
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${palette.outlineGray};

  ul {
    display: flex;
    flex-direction: column;
    gap: 12px;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.875rem;
      line-height: 1.5;
      color: ${palette.gray700};

      span {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      p {
        text-align: right;
      }
    }
  }
`;

const Sidebar = styled.div`
  position: sticky;
  top: 101px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 16px;
  width: 290px;
  padding: 16px 20px;
  margin-top: 44px;
  border-radius: 10px;
  background: ${palette.chatGray};

  h5 {
    font-size: 0.88rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${palette.gray700};
    text-align: left;
  }
`;

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  span {
    font-size: 0.75rem;
    line-height: 1.5;
    color: ${palette.gray700};
  }

  .icon {
    font-size: 1.13rem;
  }
`;

const Progress = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 20px;
  background: ${palette.outlineGray};

  &:before {
    display: block;
    width: ${(props) => props.progress}%;
    height: 100%;
    border-radius: 20px;
    background: ${palette.primary};
    content: "";
  }
`;

const InterviewTypeCards = styled.div`
  display: flex;
  align-items: stretch;
  gap: 16px;
  width: 100%;
`;

const InterviewTypeCard = styled.div`
  position: relative;
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 10px;
  border: 1px solid
    ${(props) => (props.isActive ? palette.primary : palette.outlineGray)};
  background: ${(props) =>
    props.isActive ? "rgba(34, 111, 255, 0.10)" : "white"};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  transition: all 0.2s ease-in-out;

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    line-height: 1.5;
    color: ${(props) => (props.isActive ? palette.primary : palette.gray800)};
    text-align: left;

    span {
      font-size: 0.75rem;
      font-weight: 400;
      color: ${palette.gray300};
      padding: 2px 8px;
      border-radius: 15px;
      background: ${palette.gray100};
    }
  }

  p {
    font-size: 0.75rem;
    line-height: 1.5;
    color: ${(props) => (props.isActive ? palette.gray800 : palette.gray500)};
    text-align: left;
  }
`;

const CheckBox = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border: 1px solid
    ${(props) => (props.isActive ? palette.primary : palette.outlineGray)};
  background: ${(props) => (props.isActive ? palette.primary : "white")};

  ${(props) =>
    props.isActive &&
    `
    &:after {
      content: '';
      position: absolute;
      left: 8px;
      top: 5px;
      width: 6px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  `}
`;

const TabWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TabButton = styled.button`
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

const InterviewSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  margin-top: 30px;
`;

const PersonaCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 24px 24px 24px 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;

const TabContent = styled(PersonaCards)`
  gap: 12px;
  padding: 0;
  border-radius: 0;
  border: none;

  > div {
    padding: 14px 20px 12px;
  }
`;

const CustomAccordionIcon = styled.div`
  width: 24px;
  height: 24px;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 8px;
    height: 8px;
    border-right: 2px solid ${palette.gray500};
    border-bottom: 2px solid ${palette.gray500};
    transform: translate(-50%, -50%)
      ${(props) => (props.isOpen ? "rotate(-135deg)" : "rotate(45deg)")};
    transition: transform 0.3s ease;
  }
`;

const CustomAccordionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: ${palette.chatGray};
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.875rem;
  color: ${palette.gray700};
  transition: background 0.3s ease;

  &:hover {
    background: ${palette.gray100};
  }
`;

const CustomAccordionContent = styled.div`
  padding: 20px 16px;
  border: 1px solid ${palette.outlineGray};
  border-radius: 10px;
  margin-top: 12px;
  background: ${palette.white};
`;
