import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Body1, Body2, Sub2 } from "../../../assets/styles/Typography";
import { Button } from "../../../assets/styles/ButtonStyle";
import {
  Persona,
  UniqueTag,
} from "../../../assets/styles/BusinessAnalysisStyle";
import { palette } from "../../../assets/styles/Palette";
import personaImages from "../../../assets/styles/PersonaImages";
import { useAtom } from "jotai";
import { PERSONA_LIST } from "../../../AtomStates";
import {
  TabWrapType3,
  TabButtonType3,
  BoxWrap,
} from "../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../assets/styles/Images";

import MacroSegTag from "../../../components/Charts/MacroSegTag.jsx";
import StakeHolderTag from "../../../components/Charts/StakeHolderTag.jsx";
import MyPersonaTag from "../../../components/Charts/MyPersonaTag.jsx";

const MoleculePersonaSelectCard = ({
  interviewType,
  filteredPersonaList,
  selectedPersonas = [],
  onPersonaSelect,
  hideSelectButton = false,
  disabled = false,
}) => {
  const navigate = useNavigate();

  // const [personaList, setPersonaList] = useAtom(PERSONA_LIST);
  const [activeTabState, setActiveTabState] = useState("my_favorite");

  const handleTabClick = (tabName) => {
    setActiveTabState(tabName);
  };

  // const handlePersonaSelect = (persona) => {
  //   // 현재 선택된 페르소나와 동일한 페르소나를 클릭한 경우 선택 해제
  //   if (disabled) return;
  //   if (selectedPersonas?._id === persona._id) {
  //     onPersonaSelect(null);
  //   } else {
  //     // 새로운 페르소나 선택
  //     onPersonaSelect(persona);
  //   }
  // };

  const handlePersonaSelect = (persona) => {
    if (disabled) return;

    if (interviewType === "multiple") {
      // 다중 선택 모드
      const currentSelected = Array.isArray(selectedPersonas)
        ? selectedPersonas
        : [];

      if (currentSelected.some((p) => p._id === persona._id)) {
        // 이미 선택된 페르소나인 경우 선택 해제
        onPersonaSelect(currentSelected.filter((p) => p._id !== persona._id));
      } else if (currentSelected.length < 3) {
        // 새로운 선택 (최대 5개)
        onPersonaSelect([...currentSelected, persona]);
      } else {
        // 최대 선택 개수 초과 시 알림 표시
        // alert("최대 5명의 페르소나만 선택할 수 있습니다.");
        return;
      }
    } else {
      if (selectedPersonas?._id === persona._id) {
        onPersonaSelect(null);
      } else {
        // 새로운 페르소나 선택
        onPersonaSelect(persona);
      }
    }
  };

  return (
    <CardGroupWrap>
      <TabWrapType3 Border></TabWrapType3>
      {filteredPersonaList &&
        filteredPersonaList
          // 활성 탭에 따라 페르소나 필터링
          .filter((persona) => persona.favorite === true)
          .map((persona) => {
            const isSelected = Array.isArray(selectedPersonas)
              ? selectedPersonas.some((p) => p._id === persona._id)
              : selectedPersonas?._id === persona._id;

            return (
              <>
                <ListBoxItem
                  key={persona._id}
                  selected={isSelected}
                  anySelected={selectedPersonas !== null}
                  interviewType={interviewType}
                >
                  <Persona
                    size="Large"
                    icon={persona.favorite ? "OrangeTopLeftStarFill" : null}
                    Round
                    Moder
                  >
                    <img
                      src={
                        personaImages[persona.imageKey] ||
                        (persona.gender === "남성"
                          ? personaImages.persona_m_20_01 // 남성 기본 이미지
                          : personaImages.persona_f_20_01) // 여성 기본 이미지
                      }
                      alt={persona.personaName}
                    />
                  </Persona>
                  <ListText>
                    <ListTitle>
                      <Body1 color="gray800">
                        {persona.persona_view || persona.personaName}
                      </Body1>
                      {persona?.personaType === "macro_segment" && (
                        <MacroSegTag text={persona?.type || "default"} />
                      )}
                      {persona?.personaType === "key_stakeholder" && (
                        <StakeHolderTag text={persona?.type || "default"} />
                      )}
                      {persona?.personaType === "my_persona" && (
                        <MyPersonaTag text={persona?.type || "default"} />
                      )}
                      {persona?.personaType === "unique_user" && (
                        <UniqueTag color={persona?.type || "default"} />
                      )}
                    </ListTitle>
                    <ListSubtitle>
                      <PersonaInfo>
                        <span>{persona.gender}</span>
                        <span>
                          {persona.age.includes("세")
                            ? persona.age
                            : `${persona.age}세`}
                        </span>
                        <span>{persona.job}</span>
                      </PersonaInfo>
                    </ListSubtitle>
                  </ListText>
                  {!hideSelectButton && (
                    <ListButton>
                      <Button
                        Medium
                        PrimaryLightest={isSelected}
                        Fill={isSelected}
                        onClick={() => handlePersonaSelect(persona)}
                      >
                        <Sub2 color={isSelected ? "primary" : "gray500"}>
                          {isSelected ? "선택됨" : "선택"}
                        </Sub2>
                      </Button>
                    </ListButton>
                  )}
                </ListBoxItem>
              </>
            );
          })}{" "}
      {activeTabState === "my_favorite" &&
        filteredPersonaList.filter((persona) => persona.favorite === true)
          .length < 20 && (
          <>
            <div style={{ height: "16px" }}></div>
            <BoxWrap Hover NoData Border onClick={() => navigate("/AiPersona")}>
              <img src={images.PeopleStarFillPrimary} alt="" />
              <Body2 color="gray500" align="center !important">
                페르소나 리스트를 확인하려면, 먼저 관심 있는 페르소나 20명을
                즐겨찾기에 추가해 주세요. (
                {
                  filteredPersonaList.filter((item) => item.favorite === true)
                    .length
                }{" "}
                / 20)
              </Body2>
            </BoxWrap>
          </>
        )}
    </CardGroupWrap>
  );
};

export default MoleculePersonaSelectCard;

const CardGroupWrap = styled.div`
  display: flex;
  flex-direction: column;
  // gap: 8px;
  width: 100%;
`;

const ListBoxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 16px;
  border-radius: 10px;
  background: ${(props) =>
    props.selected && props.interviewType === "single"
      ? palette.primaryLightest
      : props.theme.white};
  opacity: ${(props) =>
    props.interviewType === "single" && props.anySelected && !props.selected
      ? 0.5
      : 1};
  background: ${(props) =>
    props.selected && props.interviewType === "singleLive"
      ? palette.primaryLightest
      : props.theme.white};
  opacity: ${(props) =>
    props.interviewType === "singleLive" && props.anySelected && !props.selected
      ? 0.5
      : 1};

  // hover 효과 추가
  transition: background-color 0.2s ease;

  ${(props) =>
    (((props.interviewType === "single" ||
      props.interviewType === "singleLive") &&
      !props.selected) ||
      props.interviewType === "multiple") &&
    `    &:hover {
      border-radius: 10px;
      background-color: ${palette.chatGray};
      cursor: pointer;

      ${Button} {
        color: ${palette.gray500};
        border-color: ${palette.chatGray};
        background-color: #ECEFF3;
      }

      ${Sub2} {
        color: ${palette.gray500};
      }
    }
  `}

  ${(props) =>
    props.selected &&
    props.interviewType === "multiple" &&
    `
    &:hover {
      ${Button} {
        background: ${palette.primaryLightest};
      }

      ${Sub2} {
        color: ${palette.primary};
      }
    }
  `}

  ${(props) =>
    props.selected &&
    (props.interviewType === "single" ||
      props.interviewType === "singleLive") &&
    `
      ${Button} {
        color: ${palette.primary};
        border: 1px solid ${palette.primary};
      }

      ${Sub2} {
        color: ${palette.primary};
      }

      &:hover {
        background-color: ${palette.primaryLightest};
      }
    `}

  + div {
    border-top: 1px solid ${palette.outlineGray};
    border-radius: 0;
  }
`;

// const Persona = styled.div`
//   width: 48px;
//   height: 48px;
//   border-radius: 50%;
//   overflow: hidden;

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
// `;

const ListText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ListTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ListSubtitle = styled.div``;

const PersonaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${palette.gray500};
    font-size: 14px;

    + span:before {
      width: 1px;
      height: 10px;
      display: block;
      background: ${palette.gray500};
      content: "";
    }
  }
`;

const ListButton = styled.div``;
