import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Body1, Body2, Sub2 } from "../../../../assets/styles/Typography";
import { Button } from "../../../../assets/styles/ButtonStyle";
import {
  Persona,
  UniqueTag,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import { palette } from "../../../../assets/styles/Palette";
import personaImages from "../../../../assets/styles/PersonaImages";
import { useAtom } from "jotai";
import { PERSONA_LIST } from "../../../AtomStates";
import {
  TabWrapType3,
  TabButtonType3,
  BoxWrap,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../assets/styles/Images";

import MacroSegTag from "../../../../components/Charts/MacroSegTag.jsx";
import StakeHolderTag from "../../../../components/Charts/StakeHolderTag.jsx";
import MyPersonaTag from "../../../../components/Charts/MyPersonaTag.jsx";

const MoleculePersonaSelectCardSaas = ({
  interviewType,
  filteredPersonaList,
  businessPersonaList,
  customPersonaList,
  selectedPersonas,
  onPersonaSelect,
}) => {
  const navigate = useNavigate();

  const [personaList, setPersonaList] = useAtom(PERSONA_LIST);
  const [activeTabState, setActiveTabState] = useState("macro_segment");

  // 컴포넌트 마운트 시 초기 unselected 리스트 설정
  useEffect(() => {
    if (filteredPersonaList && filteredPersonaList.length > 0) {
      setPersonaList({
        selected: [],
        unselected: [
          ...customPersonaList,
          ...businessPersonaList,
          ...filteredPersonaList,
        ],
      });
    }
  }, [filteredPersonaList]);

  const handleTabClick = (tabName) => {
    setActiveTabState(tabName);
  };

  const handlePersonaSelect = (persona) => {
    const targetPersona = [
      ...personaList.selected,
      ...personaList.unselected,
    ].find((p) => p._id === persona._id);

    if (interviewType === "single" || interviewType === "singleLive") {
      if (
        personaList?.selected?.[0]?._id === persona._id &&
        personaList?.selected?.length > 0
      ) {
        // 선택 해제
        setPersonaList({
          selected: [],
          unselected: [...personaList.unselected, targetPersona],
        });
        onPersonaSelect(null);
      } else {
        // 새로운 선택
        const newUnselected = personaList.unselected.filter(
          (p) => p._id !== persona._id
        );
        if (personaList.selected.length > 0) {
          // 기존 선택된 항목이 있으면 unselected로 이동
          newUnselected.push(personaList.selected[0]);
        }
        setPersonaList({
          selected: [targetPersona],
          unselected: newUnselected,
        });
        onPersonaSelect(persona);
      }
    } else {
      // multiple 선택 모드
      const currentSelected = Array.isArray(selectedPersonas)
        ? selectedPersonas
        : [];

      if (currentSelected.some((p) => p._id === persona._id)) {
        // 이미 선택된 페르소나인 경우 선택 해제
        const removedPersona = personaList.selected.find(
          (p) => p._id === persona._id
        );
        setPersonaList({
          selected: personaList.selected.filter((p) => p._id !== persona._id),
          unselected: [...personaList.unselected, removedPersona],
        });
        onPersonaSelect(currentSelected.filter((p) => p._id !== persona._id));
      } else if (currentSelected.length < 5) {
        // 새로운 선택 (최대 5개)
        setPersonaList({
          selected: [...personaList.selected, targetPersona],
          unselected: personaList.unselected.filter(
            (p) => p._id !== persona._id
          ),
        });
        onPersonaSelect([...currentSelected, persona]);
      } else {
        // 최대 선택 개수 초과 시 알림 표시
        alert("최대 5명의 페르소나만 선택할 수 있습니다.");
      }
    }
  };

  const isSelected = (personaId) => {
    if (interviewType === "single" || interviewType === "singleLive") {
      return selectedPersonas === personaId;
    }
    return (
      Array.isArray(selectedPersonas) && selectedPersonas.includes(personaId)
    );
  };

  return (
    <CardGroupWrap>
      <TabWrapType3 Border>
        {/* <TabButtonType3
          className={activeTabState === "my_favorite" ? "active" : ""}
          onClick={() => handleTabClick("my_favorite")}
          isActive={activeTabState === "my_favorite"}
          style={
            activeTabState === "my_favorite"
              ? { color: "#333333" }
              : { color: "#999999" }
          }
        >
          Favorite
        </TabButtonType3> */}
        <TabButtonType3
          className={activeTabState === "macro_segment" ? "active" : ""}
          onClick={() => handleTabClick("macro_segment")}
          isActive={activeTabState === "macro_segment"}
          style={
            activeTabState === "macro_segment"
              ? { color: "#333333" }
              : { color: "#999999" }
          }
        >
          Macro Segment
        </TabButtonType3>
        <TabButtonType3
          className={activeTabState === "unique_user" ? "active" : ""}
          onClick={() => handleTabClick("unique_user")}
          isActive={activeTabState === "unique_user"}
          style={
            activeTabState === "unique_user"
              ? { color: "#333333" }
              : { color: "#999999" }
          }
        >
          Unique User
        </TabButtonType3>
        <TabButtonType3
          className={activeTabState === "key_stakeholder" ? "active" : ""}
          onClick={() => handleTabClick("key_stakeholder")}
          isActive={activeTabState === "key_stakeholder"}
          style={
            activeTabState === "key_stakeholder"
              ? { color: "#333333" }
              : { color: "#999999" }
          }
        >
          Key Stakeholder
        </TabButtonType3>
        <TabButtonType3
          className={activeTabState === "my_persona" ? "active" : ""}
          onClick={() => handleTabClick("my_persona")}
          isActive={activeTabState === "my_persona"}
          style={
            activeTabState === "my_persona"
              ? { color: "#333333" }
              : { color: "#999999" }
          }
        >
          My Persona
        </TabButtonType3>
      </TabWrapType3>
      {filteredPersonaList &&
        [...customPersonaList, ...businessPersonaList, ...filteredPersonaList]
          // 활성 탭에 따라 페르소나 필터링
          .filter((persona) => persona.status === "complete")
          .filter((persona) => {
            // if (activeTabState === "my_favorite") {
            //   return persona?.favorite === true;
            // }
            // 다른 탭에서는 personaType에 따라 필터링하고, favorite이 false인 경우 제외
            if (activeTabState === "macro_segment") {
              return (
                persona?.personaType === "macro_segment"
                // &&
                // persona?.favorite === false
              );
            }
            if (activeTabState === "unique_user") {
              return (
                persona?.personaType === "unique_user"
                // &&
                // persona?.favorite === false
              );
            }
            if (activeTabState === "key_stakeholder") {
              return (
                persona?.personaType === "key_stakeholder"
                // &&
                // persona?.favorite === false
              );
            }
            if (activeTabState === "my_persona") {
              return (
                persona?.personaType === "my_persona"
                // && persona?.favorite === false
              );
            }
            return true; // 기본적으로 false를 반환하여 다른 탭에서는 아무것도 표시되지 않도록 함
          })

          .map((persona) => {
            // 현재 persona가 선태된 상태인지 확인 (personaList.selected 에서 조회)
            const isSelected = personaList.selected.some(
              (p) => p._id === persona._id
            );

            return (
              <>
                <ListBoxItem
                  key={persona._id}
                  selected={isSelected}
                  anySelected={personaList.selected.length > 0}
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
                  <ListButton>
                    {isSelected ? (
                      <Button
                        Medium
                        PrimaryLightest={true}
                        Fill={true}
                        onClick={() => handlePersonaSelect(persona)}
                      >
                        <Sub2 color="primary">
                          {interviewType === "single" ? "선택됨" : "선택됨"}
                        </Sub2>
                      </Button>
                    ) : (
                      <Button
                        Medium
                        PrimaryLightest={false}
                        Fill={false}
                        onClick={() => handlePersonaSelect(persona)}
                        disabled={
                          interviewType === "multiple" &&
                          personaList.selected.length >= 5 &&
                          !isSelected
                        }
                      >
                        <Sub2 color="gray500">
                          {interviewType === "single" ? "선택" : "추가"}
                        </Sub2>
                      </Button>
                    )}
                  </ListButton>
                </ListBoxItem>
              </>
            );
          })}{" "}
      {activeTabState === "my_favorite" &&
        !filteredPersonaList.some(
          (persona) =>
            persona.favorite === true && persona.status === "complete"
        ) && (
          <>
            <div style={{ height: "16px" }}></div>
            <BoxWrap Hover NoData Border onClick={() => navigate("/AiPersona")}>
              <img src={images.PeopleStarFillPrimary} alt="" />
              <Body2 color="gray500" align="center !important">
                페르소나 리스트를 확인하려면, 먼저 관심 있는 페르소나 20명을
                즐겨찾기에 추가해 주세요.
              </Body2>
            </BoxWrap>
          </>
        )}
    </CardGroupWrap>
  );
};

export default MoleculePersonaSelectCardSaas;

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
