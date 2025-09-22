import React from "react";
import { Body3 } from "../../../../assets/styles/Typography";
import { BgBoxItem } from "../../../../assets/styles/BusinessAnalysisStyle";
const InterviewQuestion = ({ number, text }) => {
  return (
    <BgBoxItem white>
      <Body3 color="gray800">{number}.</Body3>
      <Body3 color="gray800">{text}</Body3>
    </BgBoxItem>
  );
};

export default InterviewQuestion;
