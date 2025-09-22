import React from "react";
import { Body1 } from "../../../../assets/styles/Typography";
import { BgBoxList } from "../../../../assets/styles/BusinessAnalysisStyle";
import InterviewQuestion from "../atoms/InterviewQuestion";

const MoleculeQuestionList = ({ title, questions }) => {
  return (
    <div>
      <Body1 color="gray800">{title}</Body1>
      <BgBoxList>
        {questions.map((question, index) => (
          <InterviewQuestion
            key={index}
            number={String(index + 1).padStart(2, "0")}
            text={question}
          />
        ))}
      </BgBoxList>
    </div>
  );
};

export default MoleculeQuestionList;
