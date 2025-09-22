import React from "react";
import styled from "styled-components";
import { Body1, Sub2 } from "../../../../assets/styles/Typography";
import { Button } from "../../../../assets/styles/ButtonStyle";
import {
  Persona,
  PersonaInfo,
  UniqueTag,
} from "../../../../assets/styles/BusinessAnalysisStyle";

const MoleculePersonaListItem = ({
  personaImage,
  personaTitle,
  badgeType,
  personaId,
  personaInfo,
  isSelected,
  onPersonaButtonClick,
  onSelect,
}) => {
  return (
    <ListBoxItem NoBorder>
      <Persona
        size="Large"
        icon={personaInfo.favorite ? "OrangeTopLeftStarFill" : null}
        Round
        Moder
      >
        <img src={personaImage} />
      </Persona>
      <ListText>
        <ListTitle>
          <Body1 color="gray800">{personaTitle}</Body1>
          <UniqueTag color={badgeType || "default"} />
        </ListTitle>
        <ListSubtitle>
          <PersonaInfo None>
            <span>#{personaInfo.gender}</span>
            <span>#{personaInfo.age}</span>
            <span>#{personaInfo.job}</span>
          </PersonaInfo>
        </ListSubtitle>
      </ListText>
      <ListButton>
        <Button
          Medium
          PrimaryLightest={isSelected}
          Fill={isSelected}
          onClick={() => {
            onPersonaButtonClick(personaId);
            onSelect(personaId);
          }}
        >
          <Sub2 color={isSelected ? "primary" : "gray500"}>
            {isSelected ? "Selected" : "Add"}
          </Sub2>
        </Button>
      </ListButton>
    </ListBoxItem>
  );
};

export default MoleculePersonaListItem;

const ListBoxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-bottom: ${(props) =>
    props.NoBorder ? "none" : "1px solid var(--outline-gray, #EAECEE)"};
`;

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

const ListButton = styled.div``;
