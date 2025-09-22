import React from "react";
import {
  ListBoxItem,
  ListButton,
  BoxListWrap,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import InterviewPurposeItem from "../molecules/InterviewPurposeItem";
import MoleculeQuestionList from "../molecules/MoleculeQuestionList";
import { Button } from "../../../../assets/styles/ButtonStyle";

const OrganismInterviewPurposeSection = ({
  purpose,
  isActive,
  showQuestions,
  onQuestionToggle,
  commonQuestions,
  specialQuestions,
}) => {
  return (
    <ListBoxItem active={isActive} showQuestions={showQuestions}>
      <InterviewPurposeItem {...purpose} />

      <ListButton>
        <Button
          Medium
          {...(showQuestions
            ? { PrimaryLightest: true, Fill: true }
            : { View: true })}
          onClick={onQuestionToggle}
        >
          {showQuestions ? "문항 닫기" : "문항 보기"}
        </Button>
      </ListButton>

      {showQuestions && (
        <BoxListWrap>
          <MoleculeQuestionList title="공통 질문" questions={commonQuestions} />
          <MoleculeQuestionList
            title="특화 질문"
            questions={specialQuestions}
          />
        </BoxListWrap>
      )}
    </ListBoxItem>
  );
};

export default OrganismInterviewPurposeSection;
