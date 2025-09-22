import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Body1, Body2, Sub2 } from "../../../../../assets/styles/Typography";
import { Button } from "../../../../../assets/styles/ButtonStyle";
import { Persona } from "../../../../../assets/styles/BusinessAnalysisStyle";
import { palette } from "../../../../../assets/styles/Palette";
import personaImages from "../../../../../assets/styles/PersonaImages";
import { useAtom } from "jotai";
import { PERSONA_LIST } from "../../../../AtomStates";
import {
  TabWrapType3,
  TabButtonType3,
  BoxWrap,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../../assets/styles/Images";

const MoleculePersonaSelect = ({
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
      {filteredPersonaList?.map((persona) => {
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
                    {persona.persona_view || persona.name}
                  </Body1>
                </ListTitle>
                <ListSubtitle>
                  <PersonaInfo>
                    <span>{persona.gender}</span>
                    <span>
                      {persona.age.includes("세") || persona.age.endsWith("대")
                        ? persona.age
                        : `${persona.age}세`}
                    </span>
                    <span>{persona.job}</span>
                  </PersonaInfo>
                </ListSubtitle>
              </ListText>
            </ListBoxItem>
          </>
        );
      })}{" "}
    </CardGroupWrap>
  );
};

export default MoleculePersonaSelect;

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

  //   // hover 효과 추가
  //   transition: background-color 0.2s ease;

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

const KeywordSection = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const KeywordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const KeywordTag = styled.div`
  padding: 4px 8px;
  background-color: ${palette.chatGray};
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
`;
