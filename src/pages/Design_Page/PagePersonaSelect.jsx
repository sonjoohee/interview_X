import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";

import AnalysisInfo from "./PageAnalysisInfo";
import OrganismIncNavigation from "../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../Global/molecules/MoleculeHeader";
import PopupWrap from "../../assets/styles/Popup";
import OrganismToastPopup from "../../assets/styles/ToastPopupChat";
import {
  Button,
  ButtonGroup,
  IconButton,
} from "../../assets/styles/ButtonStyle";
import images from "../../assets/styles/Images";
import personaImages from "../../assets/styles/PersonaImages";
import { palette } from "../../assets/styles/Palette";
import {
  RadioButton,
  CustomTextarea,
  FormBox,
} from "../../assets/styles/InputStyle";
import {
  ContentsWrap,
  MainContent,
  AnalysisWrap,
  MainSection,
  CardWrap,
  CardGroupWrap,
  ListBoxItem,
  ListBorderItem,
  ListText,
  ListTitle,
  ListSubtitle,
  ListButton,
  BoxListWrap,
  BgBoxList,
  BgBoxItem,
  TextBox,
  TextInfo,
  Badge,
  BottomBar,
  ListBoxGroup,
  PersonaGroup,
  Persona,
  Title,
  PersonaInfo,
  SwitchToggle,
  SwitchToggleItem,
  SwitchHandle,
} from "../../assets/styles/BusinessAnalysisStyle";
import {
  H5,
  Body1,
  Body2,
  Body3,
  Sub1,
  Sub2,
  Sub3,
  Caption1,
  Caption2,
} from "../../assets/styles/Typography";
import {
  SELECTED_INTERVIEW_TYPE,
  SELECTED_INTERVIEW_PURPOSE,
} from "../../AtomStates";

const FULL_DEFINITION_TEXT =
  "사용자 트렌드 민감도 분석은 사용자가 시장의 최신 트렌드에 얼마나 빠르고 효과적으로 반응하는지를 측정하는 방법론입니다. 이 분석은 사용자가 새로운 트렌드를 어떻게 인식하고, 그 트렌드에 따라 행동이 어떻게 변화하는지 파악하는 데 중점을 둡니다.";

const PagePersonaSelect = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showQuestions, setShowQuestions] = useState({
    radio3: false,
    radio4: false,
    radio5: false,
  });
  const [showCustomization, setShowCustomization] = useState(false);
  const [purposeText, setPurposeText] = useState("");
  const [showMethodology, setShowMethodology] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDefinition, setEditedDefinition] = useState("");
  const [editedPurpose, setEditedPurpose] = useState("");
  const [definitionText, setDefinitionText] = useState(
    "사용자 트렌드 민감도 분석은 사용자가 시장의 최신 트렌드에 얼마나 빠르고 효과적으로 반응하는지를 측정하는 방법론입니다. 이 분석은 사용자가 새로운 트렌드를 어떻게 인식하고, 그 트렌드에 따라 행동이 어떻게 변화하는지 파악하는 데 중점을 둡니다."
  );
  const [showNewListBox, setShowNewListBox] = useState(false);
  const [customizations, setCustomizations] = useState([]);
  const [showCustomButton, setShowCustomButton] = useState(true);
  const [selectedPersonas, setSelectedPersonas] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [selectedInterviewType] = useAtom(SELECTED_INTERVIEW_TYPE);
  const [selectedInterviewPurpose] = useAtom(SELECTED_INTERVIEW_PURPOSE);

  const handleStartInterview = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleConfirmStart = () => {
    setShowPopup(false);
    setShowToast(true);
  };

  const handleCreatePurpose = () => {
    if (!purposeText.trim()) {
      setShowPopup(true);
    } else {
      setShowMethodology(true);
    }
  };

  const handleEditClick = (index) => {
    const newCustomizations = [...customizations];
    newCustomizations[index].isEditing = true;
    newCustomizations[index].editedDefinition =
      newCustomizations[index].definitionText;
    newCustomizations[index].editedPurpose =
      newCustomizations[index].purposeText;
    setCustomizations(newCustomizations);
  };

  const handleEditComplete = (index) => {
    const newCustomizations = [...customizations];
    newCustomizations[index].definitionText =
      newCustomizations[index].editedDefinition;
    newCustomizations[index].purposeText =
      newCustomizations[index].editedPurpose;
    newCustomizations[index].isEditing = false;
    setCustomizations(newCustomizations);
  };

  const handlePersonaSelect = (personaId) => {
    setSelectedPersonas(personaId);
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent>
          <AnalysisWrap>
            <MainSection>
              {/* <AnalysisInfo showButtons={true} /> */}
              <InterviewWayTab>
                <InterviewWayTabItem>
                  <span>1</span>
                  <H5>인터뷰 방법 선택</H5>
                </InterviewWayTabItem>
                <InterviewWayTabItem active>
                  <span>2</span>
                  <H5>참여 페르소나 선택</H5>
                </InterviewWayTabItem>
              </InterviewWayTab>

              <InterviewWayContent>
                <div>
                  <Body2 color="gray800">인터뷰 정보</Body2>

                  <ListBoxGroup>
                    <li>
                      <Body2 color="gray500">인터뷰 방식</Body2>
                      {selectedInterviewType === "multiple" ? (
                        <Body2 color="gray800">
                          여러 페르소나 인터뷰 (1:N)
                        </Body2>
                      ) : selectedInterviewType === "single" ? (
                        <Body2 color="gray800">한명과 심층 인터뷰 (1:1)</Body2>
                      ) : null}
                    </li>
                    <li>
                      <Body2 color="gray500">인터뷰 목적</Body2>
                      <Body2 color="gray800">제품 경험 평가</Body2>
                    </li>
                    <li>
                      <Body2 color="gray500">페르소나 선택</Body2>
                      <PersonaGroup>
                        <span>+2</span>
                        <Persona color="Linen" size="Small" Round>
                          <img
                            src={personaImages.PersonaWomen01}
                            alt="페르소나"
                          />
                        </Persona>
                        <Persona color="PastelPink" size="Small" Round>
                          <img
                            src={personaImages.PersonaWomen02}
                            alt="페르소나"
                          />
                        </Persona>
                        <Persona color="Crayola" size="Small" Round>
                          <img
                            src={personaImages.PersonaWomen03}
                            alt="페르소나"
                          />
                        </Persona>
                      </PersonaGroup>
                    </li>
                    {selectedInterviewType === "multiple" ? (
                      <></>
                    ) : selectedInterviewType === "single" ? (
                      <li>
                        <Body2 color="gray500">인뎁스 인터뷰</Body2>
                        <SwitchToggle>
                          <SwitchToggleItem>
                            <input type="checkbox" />
                            <span data-on="ON" data-off="OFF" />
                            <SwitchHandle />
                          </SwitchToggleItem>
                          <Body2 color="gray800">인뎁스 인터뷰 수행</Body2>
                        </SwitchToggle>
                      </li>
                    ) : null}
                  </ListBoxGroup>
                </div>

                <div>
                  <Title>
                    {selectedInterviewType === "multiple" ? (
                      <>
                        <Body2 color="gray800">⭐ 페르소나 리스트</Body2>
                        <Sub3 color="gray800">2명 선택됨</Sub3>
                      </>
                    ) : selectedInterviewType === "single" ? (
                      <>
                        <Body2 color="gray800">📌 참여가능 페르소나</Body2>
                        <Sub3 color="gray800">2명 선택됨</Sub3>
                      </>
                    ) : null}
                  </Title>

                  {selectedInterviewType === "multiple" ? (
                    <CardGroupWrap>
                      <ListBoxItem>
                        <Persona color="Linen" size="Large" Round>
                          <img
                            src={personaImages.PersonaWomen01}
                            alt="페르소나"
                          />
                        </Persona>
                        <ListText>
                          <ListTitle>
                            <Body1 color="gray800">제품 경험 평가</Body1>
                            <Badge New>비즈니스</Badge>
                          </ListTitle>
                          <ListSubtitle>
                            <PersonaInfo>
                              <span>여성</span>
                              <span>25세</span>
                              <span>직업</span>
                            </PersonaInfo>
                          </ListSubtitle>
                        </ListText>

                        <ListButton>
                          <Button
                            Medium
                            PrimaryLightest={selectedPersonas === "persona1"}
                            Fill={selectedPersonas === "persona1"}
                            onClick={() => handlePersonaSelect("persona1")}
                          >
                            {selectedPersonas === "persona1" ? (
                              "Selected"
                            ) : (
                              <Sub2 color="gray500">Add</Sub2>
                            )}
                          </Button>
                        </ListButton>
                      </ListBoxItem>

                      <ListBoxItem>
                        <Persona color="Linen" size="Large" Round>
                          <img
                            src={personaImages.PersonaWomen01}
                            alt="페르소나"
                          />
                        </Persona>
                        <ListText>
                          <ListTitle>
                            <Body1 color="gray800">제품 경험 평가</Body1>
                            <Badge New>비즈니스</Badge>
                          </ListTitle>
                          <ListSubtitle>
                            <PersonaInfo>
                              <span>여성</span>
                              <span>25세</span>
                              <span>직업</span>
                            </PersonaInfo>
                          </ListSubtitle>
                        </ListText>

                        <ListButton>
                          <Button
                            Medium
                            PrimaryLightest={selectedPersonas === "persona2"}
                            Fill={selectedPersonas === "persona2"}
                            onClick={() => handlePersonaSelect("persona2")}
                          >
                            {selectedPersonas === "persona2" ? (
                              "Selected"
                            ) : (
                              <Sub2 color="gray500">Add</Sub2>
                            )}
                          </Button>
                        </ListButton>
                      </ListBoxItem>

                      <ListBoxItem>
                        <Persona color="Linen" size="Large" Round>
                          <img
                            src={personaImages.PersonaWomen01}
                            alt="페르소나"
                          />
                        </Persona>
                        <ListText>
                          <ListTitle>
                            <Body1 color="gray800">제품 경험 평가</Body1>
                            <Badge New>비즈니스</Badge>
                          </ListTitle>
                          <ListSubtitle>
                            <PersonaInfo>
                              <span>여성</span>
                              <span>25세</span>
                              <span>직업</span>
                            </PersonaInfo>
                          </ListSubtitle>
                        </ListText>

                        <ListButton>
                          <Button
                            Medium
                            PrimaryLightest={selectedPersonas === "persona3"}
                            Fill={selectedPersonas === "persona3"}
                            onClick={() => handlePersonaSelect("persona3")}
                          >
                            {selectedPersonas === "persona3" ? (
                              "Selected"
                            ) : (
                              <Sub2 color="gray500">Add</Sub2>
                            )}
                          </Button>
                        </ListButton>
                      </ListBoxItem>

                      <ListBoxItem>
                        <Persona color="Linen" size="Large" Round>
                          <img
                            src={personaImages.PersonaWomen01}
                            alt="페르소나"
                          />
                        </Persona>
                        <ListText>
                          <ListTitle>
                            <Body1 color="gray800">제품 경험 평가</Body1>
                          </ListTitle>
                          <ListSubtitle>
                            <PersonaInfo>
                              <span>여성</span>
                              <span>25세</span>
                              <span>직업</span>
                            </PersonaInfo>
                          </ListSubtitle>
                        </ListText>

                        <ListButton>
                          <Button
                            Medium
                            PrimaryLightest={selectedPersonas === "persona4"}
                            Fill={selectedPersonas === "persona4"}
                            onClick={() => handlePersonaSelect("persona4")}
                          >
                            {selectedPersonas === "persona4" ? (
                              "Selected"
                            ) : (
                              <Sub2 color="gray500">Add</Sub2>
                            )}
                          </Button>
                        </ListButton>
                      </ListBoxItem>
                    </CardGroupWrap>
                  ) : selectedInterviewType === "single" ? (
                    <CardGroupWrap style={{ gap: "8px" }}>
                      <ListBorderItem
                        selected={selectedPersonas === "persona1"}
                        anySelected={selectedPersonas !== null}
                      >
                        <Persona color="Linen" size="Large" Round>
                          <img
                            src={personaImages.PersonaWomen01}
                            alt="페르소나"
                          />
                        </Persona>
                        <ListText style={{ gap: "4px" }}>
                          <ListTitle>
                            <Body1 color="gray800">
                              가족과 함께 여가를 보내는 활동 지향형 소비자
                            </Body1>
                            <Badge New>비즈니스</Badge>
                          </ListTitle>
                          <ListSubtitle>
                            <PersonaInfo>
                              <span>여성</span>
                              <span>25세</span>
                              <span>직업</span>
                            </PersonaInfo>
                          </ListSubtitle>
                        </ListText>

                        <ListButton>
                          <Button
                            Medium
                            PrimaryLightest={selectedPersonas === "persona1"}
                            Fill={selectedPersonas === "persona1"}
                            onClick={() => handlePersonaSelect("persona1")}
                          >
                            {selectedPersonas === "persona1" ? (
                              "Selected"
                            ) : (
                              <Sub2 color="gray500">Add</Sub2>
                            )}
                          </Button>
                        </ListButton>
                      </ListBorderItem>

                      <ListBorderItem
                        selected={selectedPersonas === "persona2"}
                        anySelected={selectedPersonas !== null}
                      >
                        <Persona color="Linen" size="Large" Round>
                          <img
                            src={personaImages.PersonaWomen01}
                            alt="페르소나"
                          />
                        </Persona>
                        <ListText style={{ gap: "4px" }}>
                          <ListTitle>
                            <Body1 color="gray800">
                              가족과 함께 여가를 보내는 활동 지향형 소비자
                            </Body1>
                            <Badge New>비즈니스</Badge>
                          </ListTitle>
                          <ListSubtitle>
                            <PersonaInfo>
                              <span>여성</span>
                              <span>25세</span>
                              <span>직업</span>
                            </PersonaInfo>
                          </ListSubtitle>
                        </ListText>

                        <ListButton>
                          <Button
                            Medium
                            PrimaryLightest={selectedPersonas === "persona2"}
                            Fill={selectedPersonas === "persona2"}
                            onClick={() => handlePersonaSelect("persona2")}
                          >
                            {selectedPersonas === "persona2" ? (
                              "Selected"
                            ) : (
                              <Sub2 color="gray500">Add</Sub2>
                            )}
                          </Button>
                        </ListButton>
                      </ListBorderItem>

                      <ListBorderItem
                        selected={selectedPersonas === "persona3"}
                        anySelected={selectedPersonas !== null}
                      >
                        <Persona color="Linen" size="Large" Round>
                          <img
                            src={personaImages.PersonaWomen01}
                            alt="페르소나"
                          />
                        </Persona>
                        <ListText style={{ gap: "4px" }}>
                          <ListTitle>
                            <Body1 color="gray800">
                              가족과 함께 여가를 보내는 활동 지향형 소비자
                            </Body1>
                            <Badge New>비즈니스</Badge>
                          </ListTitle>
                          <ListSubtitle>
                            <PersonaInfo>
                              <span>여성</span>
                              <span>25세</span>
                              <span>직업</span>
                            </PersonaInfo>
                          </ListSubtitle>
                        </ListText>

                        <ListButton>
                          <Button
                            Medium
                            PrimaryLightest={selectedPersonas === "persona3"}
                            Fill={selectedPersonas === "persona3"}
                            onClick={() => handlePersonaSelect("persona3")}
                          >
                            {selectedPersonas === "persona3" ? (
                              "Selected"
                            ) : (
                              <Sub2 color="gray500">Add</Sub2>
                            )}
                          </Button>
                        </ListButton>
                      </ListBorderItem>

                      <ListBorderItem
                        selected={selectedPersonas === "persona4"}
                        anySelected={selectedPersonas !== null}
                      >
                        <Persona color="Linen" size="Large" Round>
                          <img
                            src={personaImages.PersonaWomen01}
                            alt="페르소나"
                          />
                        </Persona>
                        <ListText style={{ gap: "4px" }}>
                          <ListTitle>
                            <Body1 color="gray800">
                              가족과 함께 여가를 보내는 활동 지향형 소비자
                            </Body1>
                          </ListTitle>
                          <ListSubtitle>
                            <PersonaInfo>
                              <span>여성</span>
                              <span>25세</span>
                              <span>직업</span>
                            </PersonaInfo>
                          </ListSubtitle>
                        </ListText>

                        <ListButton>
                          <Button
                            Medium
                            PrimaryLightest={selectedPersonas === "persona4"}
                            Fill={selectedPersonas === "persona4"}
                            onClick={() => handlePersonaSelect("persona4")}
                          >
                            {selectedPersonas === "persona4" ? (
                              "Selected"
                            ) : (
                              <Sub2 color="gray500">Add</Sub2>
                            )}
                          </Button>
                        </ListButton>
                      </ListBorderItem>
                    </CardGroupWrap>
                  ) : null}
                </div>
              </InterviewWayContent>

              <BottomBar W100>
                <Body2 color="gray800">
                  5명의 페르소나와 인터뷰를 진행하시겠습니까?
                </Body2>
                <Button Large Primary Round Fill onClick={handleStartInterview}>
                  인터뷰 시작
                  <img src={images.ChevronRight} alt="인터뷰 시작" />
                </Button>
              </BottomBar>
            </MainSection>
          </AnalysisWrap>
        </MainContent>
      </ContentsWrap>

      {showPopup && (
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
          onConfirm={handleConfirmStart}
          show={showPopup}
        />
      )}

      <OrganismToastPopup isActive={showToast} autoClose={false} />
    </>
  );
};

export default PagePersonaSelect;

const InterviewWayTab = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  margin-bottom: 20px;
`;

const InterviewWayTabItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex: 1;
  color: ${(props) => (props.active ? palette.gray800 : palette.gray300)};
  padding: 20px 24px;
  border-radius: 15px;
  background: ${(props) => (props.active ? palette.chatGray : palette.white)};

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 0.88rem;
    font-weight: 600;
    line-height: 1.5;
    color: ${palette.white};
    border-radius: 50%;
    background: ${(props) =>
      props.active ? palette.primary : palette.gray300};
  }
`;

const InterviewWayContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  width: 100%;
  text-align: left;
  margin-bottom: 100px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
`;

const CustomizationWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;

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

const CustomizationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 24px 24px 20px 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;

const CustomTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
