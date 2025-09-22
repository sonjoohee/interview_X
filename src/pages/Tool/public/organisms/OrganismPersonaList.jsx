import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  TabWrapType3,
  TabButtonType3,
  ListBoxWrap,
  BoxWrap,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import { Body2 } from "../../../../assets/styles/Typography";
import MoleculePersonaListItem from "../molecules/MoleculePersonaListItem";
import OrganismNoPersonaMessage from "./OrganismNoPersonaMessage";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";

const OrganismPersonaList = ({
  personaListSaas,
  personaImages,
  selectedPersonaButtons,
  handlePersonaButtonClick,
  onNavigate,
  onPersonaSelect,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("my_favorite");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // 페르소나 선택 시 탭 간 동기화를 처리하는 함수
  const handleSyncedPersonaButtonClick = (buttonId) => {
    const [tab, id] = buttonId.split("_");
    const persona = personaListSaas.find((p) => p._id === id);

    if (!persona) return handlePersonaButtonClick(buttonId);

    // 현재 선택 상태 확인 (선택되어 있지 않으면 true, 선택되어 있으면 false)
    const willBeSelected = !selectedPersonaButtons[buttonId];

    // 먼저 현재 버튼 상태 변경
    handlePersonaButtonClick(buttonId);

    // favorite가 true인 페르소나는 마이페르소나 탭에만 표시되므로
    // 마이페르소나 탭에서의 선택 상태만 변경하고 다른 탭과의 동기화는 하지 않음
    if (persona.favorite === true) {
      // onPersonaSelect 호출 (현재 탭 ID로)
      onPersonaSelect(persona);
      return;
    }

    if (tab === "my_favorite") {
      // my_favorite에서 선택/해제한 경우, 해당 personaType 탭에서도 선택/해제
      const originalTypeButtonId = `${persona.personaType}_${id}`;

      // 원래 타입의 탭에서 상태가 다르면 동기화
      const originalTabSelected = selectedPersonaButtons[originalTypeButtonId];
      if (willBeSelected !== originalTabSelected) {
        handlePersonaButtonClick(originalTypeButtonId);
      }

      // onPersonaSelect 호출 (올바른 탭 ID로)
      onPersonaSelect(persona);
    } else {
      // 그 외의 경우 onPersonaSelect 호출 (현재 탭 ID로)
      onPersonaSelect(persona);
    }
  };

  // 페르소나가 어떤 탭에서든 선택되었는지 확인하는 함수
  const isPersonaSelectedInAnyTab = (persona, index) => {
    const personaId = persona._id;
    const currentTabId = `${activeTab}_${personaId}`;

    // 현재 탭에서 선택되었는지 확인
    if (selectedPersonaButtons[currentTabId]) {
      return true;
    }

    // favorite가 true인 페르소나는 마이페르소나 탭에만 표시되므로
    // 다른 탭과의 선택 상태 동기화는 확인하지 않음
    if (persona.favorite === true) {
      return false;
    }

    // 현재 탭이 my_favorite이고 원래 타입의 탭에서 선택되었는지 확인
    if (activeTab === "my_favorite") {
      const originalTypeButtonId = `${persona.personaType}_${personaId}`;
      if (selectedPersonaButtons[originalTypeButtonId]) {
        return true;
      }
    }

    return false;
  };

  // 페르소나 선택 시 올바른 탭의 ID를 반환하는 함수
  const getCorrectTabIdForSelection = (persona, index, currentTab) => {
    const personaId = persona._id;

    // favorite가 true인 페르소나는 마이페르소나 탭에만 표시되므로
    // 현재 탭의 ID를 반환
    if (persona.favorite === true) {
      return `${currentTab}_${personaId}`;
    }

    // my_favorite 탭인 경우, 원래 타입의 ID를 반환
    if (currentTab === "my_favorite") {
      return `${persona.personaType}_${personaId}`;
    }

    // 그 외의 경우는 현재 탭의 ID를 반환
    return `${currentTab}_${personaId}`;
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
              <TabButtonType3
                className={activeTab === "my_persona" ? "active" : ""}
                onClick={() => handleTabClick("my_persona")}
                isActive={activeTab === "my_persona"}
                style={
                  activeTab === "my_persona"
                    ? { color: "#333333" }
                    : { color: "#999999" }
                }
              >
                My Persona
              </TabButtonType3>
            </TabWrapType3>
            <ListBoxWrap Border>
              {personaListSaas
                .filter((persona) => {
                  if (activeTab === "my_favorite") {
                    return persona.favorite === true;
                  }
                  // favorite가 true인 페르소나는 마이페르소나 탭에만 표시
                  if (persona.favorite === true) {
                    return false;
                  }
                  return persona.personaType === activeTab;
                })
                .map((persona, index) => (
                  <MoleculePersonaListItem
                    key={persona._id}
                    personaImage={
                      personaImages[persona.imageKey] ||
                      (persona.gender === "남성"
                        ? personaImages.persona_m_20_01 // 남성 기본 이미지
                        : personaImages.persona_f_20_01) // 여성 기본 이미지
                    }
                    personaTitle={persona.personaName || ""}
                    badgeType={persona.type || ""}
                    badgeText={persona.badgeText || ""}
                    personaId={persona._id}
                    isSelected={isPersonaSelectedInAnyTab(persona, index)}
                    personaInfo={persona || ""}
                    onPersonaButtonClick={(id) =>
                      handleSyncedPersonaButtonClick(`${activeTab}_${id}`)
                    }
                    onSelect={(id) => {
                      const correctTabId = getCorrectTabIdForSelection(
                        persona,
                        index,
                        activeTab
                      );
                      onPersonaSelect(persona);
                    }}
                  />
                ))}
            </ListBoxWrap>

            {/* Favorite 탭에서 데이터가 없을 때만 표시 */}
            {activeTab === "my_favorite" &&
              !personaListSaas.some((persona) => persona.favorite === true) && (
                <BoxWrap
                  Hover
                  NoData
                  Border
                  onClick={() => navigate("/AiPersona")}
                >
                  <img src={images.PeopleStarFillPrimary} alt="" />
                  <Body2 color="gray500" align="center !important">
                    즐겨찾기를 하시면 관심 있는 페르소나를 해당 페이지에서
                    확인하실 수 있습니다.
                  </Body2>
                </BoxWrap>
              )}
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

export default OrganismPersonaList;

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
