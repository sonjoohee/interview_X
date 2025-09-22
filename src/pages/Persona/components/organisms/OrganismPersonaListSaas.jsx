import React, { useState } from "react";
import styled, { css } from "styled-components";
import {
  TabWrapType3,
  TabButtonType3,
  ListBoxWrap,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import MoleculePersonaListItemSaas from "../molecules/MoleculePersonaListItemSaas";
import OrganismNoPersonaMessage from "../../../Tool/public/organisms/OrganismNoPersonaMessage";
import { palette } from "../../../../assets/styles/Palette";
import { useAtom } from "jotai";
import { PERSONA_LIST } from "../../../AtomStates";

const OrganismPersonaListSaas = ({
  personaListSaas,
  personaImages,
  selectedPersonaButtons,
  handlePersonaButtonClick,
  selectedPersonas,
  onNavigate,
  onPersonaSelect,
  interviewType,
}) => {


  const [activeTab, setActiveTab] = useState("my_favorite");

  const [personaList, setPersonaList] = useAtom(PERSONA_LIST);
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // 페르소나 선택 시 탭 간 동기화를 처리하는 함수
  const handleSyncedPersonaButtonClick = (buttonId) => {
    const [tab, id] = buttonId.split("_");
    const persona = personaListSaas.find(
      (p) => p.id === id || `persona${personaListSaas.indexOf(p)}` === id
    );

    if (!persona) return handlePersonaButtonClick(buttonId);

    // 현재 선택 상태 토글
    const isCurrentlySelected = !selectedPersonaButtons[buttonId];

    if (tab === "my_favorite" && isCurrentlySelected) {
      // my_favorite에서 선택한 경우, 해당 personaType 탭에서도 선택
      const originalTypeButtonId = `${persona.personaType}_${id}`;
      handlePersonaButtonClick(buttonId); // 현재 버튼 상태 변경

      // 원래 타입의 탭에서도 선택되도록 함
      if (!selectedPersonaButtons[originalTypeButtonId]) {
        handlePersonaButtonClick(originalTypeButtonId);
      }
    } else if (
      tab !== "my_favorite" &&
      persona.favorite &&
      isCurrentlySelected
    ) {
      // 다른 탭에서 favorite이 true인 페르소나를 선택한 경우, my_favorite 탭에서도 선택
      const myPersonaButtonId = `my_favorite_${id}`;
      handlePersonaButtonClick(buttonId); // 현재 버튼 상태 변경

      // my_favorite 탭에서도 선택되도록 함
      if (!selectedPersonaButtons[myPersonaButtonId]) {
        handlePersonaButtonClick(myPersonaButtonId);
      }
    } else if (
      tab !== "my_favorite" &&
      persona.favorite &&
      !isCurrentlySelected
    ) {
      // 다른 탭에서 favorite이 true인 페르소나 선택 해제 시, my_favorite 탭에서도 선택 해제
      const myPersonaButtonId = `my_favorite_${id}`;
      handlePersonaButtonClick(buttonId); // 현재 버튼 상태 변경

      // my_favorite 탭에서도 선택 해제되도록 함
      if (selectedPersonaButtons[myPersonaButtonId]) {
        handlePersonaButtonClick(myPersonaButtonId);
      }
    } else if (tab === "my_favorite" && !isCurrentlySelected) {
      // my_favorite에서 선택 해제한 경우, 해당 personaType 탭에서도 선택 해제
      const originalTypeButtonId = `${persona.personaType}_${id}`;
      handlePersonaButtonClick(buttonId); // 현재 버튼 상태 변경

      // 원래 타입의 탭에서도 선택 해제되도록 함
      if (selectedPersonaButtons[originalTypeButtonId]) {
        handlePersonaButtonClick(originalTypeButtonId);
      }
    } else {
      // 그 외의 경우는 기존 로직 사용
      handlePersonaButtonClick(buttonId);
    }
  };

  // 페르소나가 어떤 탭에서든 선택되었는지 확인하는 함수
  const isPersonaSelectedInAnyTab = (persona, index) => {
    const personaId = persona.id || `persona${index}`;

    // 현재 탭에서 선택되었는지 확인
    if (selectedPersonaButtons[`${activeTab}_${personaId}`]) {
      return true;
    }

    // my_favorite 탭이 아닌 경우, my_favorite 탭에서도 확인
    if (activeTab !== "my_favorite" && persona.favorite) {
      if (selectedPersonaButtons[`my_favorite_${personaId}`]) {
        return true;
      }
    }

    // my_favorite 탭인 경우, 원래 타입의 탭에서도 확인
    if (activeTab === "my_favorite") {
      if (selectedPersonaButtons[`${persona.personaType}_${personaId}`]) {
        return true;
      }
    }

    return false;
  };

  // 페르소나 선택 시 올바른 탭의 ID를 반환하는 함수
  const getCorrectTabIdForSelection = (persona, index, currentTab) => {
    const personaId = persona.id || `persona${index}`;

    // my_favorite 탭인 경우, 원래 타입의 ID를 반환
    if (currentTab === "my_favorite") {
      return `${persona.personaType}_${personaId}`;
    }

    // 그 외의 경우는 현재 탭의 ID를 반환
    return `${currentTab}_${personaId}`;
  };

  const handlePersonaSelect = (persona) => {
    // console.log("🚀 ~ handlePersonaSelect ~ persona:", persona);
    const targetPersona = [
      ...personaList.selected,
      ...personaList.unselected,
    ].find((p) => p._id === persona._id);

    if (interviewType === "single") {
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

  return (
    <>
      {personaListSaas && personaListSaas.length > 0 ? (
        <ToolPublicPersonaWrap>
          <AiPersonaContent>
            <TabWrapType3 Border>
              <TabButtonType3
                className={activeTab === "my_favorite" ? "active" : ""}
                onClick={() => handleTabClick("my_favorite")}
                isActive={activeTab === "my_favorite"}
                style={
                  activeTab === "my_favorite"
                    ? { color: "#333333" }
                    : { color: "#999999" }
                }
              >
                Favorite
              </TabButtonType3>
              <TabButtonType3
                className={activeTab === "macro_segment" ? "active" : ""}
                onClick={() => handleTabClick("macro_segment")}
                isActive={activeTab === "macro_segment"}
                style={
                  activeTab === "macro_segment"
                    ? { color: "#333333" }
                    : { color: "#999999" }
                }
              >
                Macro Segment
              </TabButtonType3>
              <TabButtonType3
                className={activeTab === "unique_user" ? "active" : ""}
                onClick={() => handleTabClick("unique_user")}
                isActive={activeTab === "unique_user"}
                style={
                  activeTab === "unique_user"
                    ? { color: "#333333" }
                    : { color: "#999999" }
                }
              >
                Unique User
              </TabButtonType3>
              <TabButtonType3
                className={activeTab === "key_stakeholder" ? "active" : ""}
                onClick={() => handleTabClick("key_stakeholder")}
                isActive={activeTab === "key_stakeholder"}
                style={
                  activeTab === "key_stakeholder"
                    ? { color: "#333333" }
                    : { color: "#999999" }
                }
              >
                Key Stakeholder
              </TabButtonType3>
            </TabWrapType3>
            <ListBoxWrap Border>
              {personaListSaas
                .filter((persona) => {
                  if (activeTab === "my_favorite") {
                    return persona?.favorite === true;
                  } // favorite가 true인 페르소나는 마이페르소나 탭에만 표시
                  if (persona?.favorite === true) {
                    return false;
                  }
                  return persona?.personaType === activeTab;
                })
                .filter((persona) => persona.status === "complete")
                .map((persona, index) => (
                 
                  <MoleculePersonaListItemSaas
                    key={persona?._id || `persona${index}`}
                    personaImage={
                      personaImages[persona?.imageKey] ||
                      personaImages.PersonaWomen01
                    }
                    personaTitle={persona?.personaName || ""}
                    badgeType={persona?.badgeType || ""}
                    badgeText={persona?.badgeText || ""}
                    personaId={persona?._id || `persona${index}`}
                    isSelected={isPersonaSelectedInAnyTab(persona, index)}
                    personaInfo={persona || ""}
                    onPersonaButtonClick={(id) => {
                      handleSyncedPersonaButtonClick(`${activeTab}_${id}`);
                      handlePersonaSelect(persona);
                    }}
                    onSelect={(id) => {
                      const correctTabId = getCorrectTabIdForSelection(
                        persona,
                        index,
                        activeTab
                      );
                      onPersonaSelect(correctTabId);
                    }}
                  />
                ))}
            </ListBoxWrap>
          </AiPersonaContent>
        </ToolPublicPersonaWrap>
      ) : (
        <ToolPublicPersonaWrap NoData onClick={() => onNavigate("/AiPersona")}>
          <OrganismNoPersonaMessage />
        </ToolPublicPersonaWrap>
      )}
      <div style={{ height: "60px" }}></div>
    </>
  );
};

export default OrganismPersonaListSaas;

const ToolPublicPersonaWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  ${(props) =>
    props.NoData &&
    css`
      gap: 20px;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      border-radius: 10px;
      border: 1px solid ${palette.outlineGray};
      transition: all 0.2s ease-in-out;
      &:hover {
        border-color: ${palette.primary};
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        transform: translateY(-2px);
      }
    `}
`;
const AiPersonaContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
