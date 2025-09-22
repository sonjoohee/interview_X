import React from "react";
import { Body1, Caption1 } from "../../../../assets/styles/Typography";
import {
  ListTitle,
  ListText,
  ListSubtitle,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import { RadioButton } from "../../../../assets/styles/InputStyle";
import { Badge } from "../../../../assets/styles/Badge";

const InterviewPurposeItem = ({
  id,
  title,
  description,
  isActive,
  isSelected,
  onSelect,
  showBadge,
}) => {
  return (
    <div>
      <RadioButton
        id={id}
        name="radioGroup1"
        checked={isSelected}
        onChange={onSelect}
      />
      <ListText>
        <ListTitle>
          <Body1 color={isActive ? "primary" : "gray800"}>{title}</Body1>
          {showBadge && <Badge Complete>New</Badge>}
        </ListTitle>
        <ListSubtitle>
          <Caption1 color="gray500">{description}</Caption1>
        </ListSubtitle>
      </ListText>
    </div>
  );
};

export default InterviewPurposeItem;
