import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  SELECTED_EXPERT_INDEX,
  SELECTED_ADDITIONAL_KEYWORD,
  QUESTION_LIST,
  ADDITION_BUTTON_STATE, // BUTTON_STATE 추가
  APPROACH_PATH,
  CONVERSATION,
} from "../../../AtomStates";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";

const MoleculeAdditionalKeyword = () => {
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(
    SELECTED_ADDITIONAL_KEYWORD
  );
  const [questionList] = useAtom(QUESTION_LIST);
  const [additionButtonState, setAdditionButtonState] = useAtom(ADDITION_BUTTON_STATE); // BUTTON_STATE 가져오기

  const [randomSelections, setRandomSelections] = useState({});
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);

  const generateRandomSelections = () => {
    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    let directions;

    if (questionList && questionList[selectedExpertIndex]) {
      directions = questionList[selectedExpertIndex];
    } else {
      directions = questionList[1];
    }

    const selections = {
      방법론관련: getRandomItem(directions.방법론관련),
      사례제시: getRandomItem(directions.사례제시),
      아이디어제공: getRandomItem(directions.아이디어제공),
    };
    return selections;
  };

  const handleOtherInsightClick = () => {
    const newSelections = generateRandomSelections();
    setRandomSelections(newSelections);
  };

  const updateSelectedAdditionalKeyword = (keyword) => {
    const updatedConversation = [...conversation];

    const updatedKeywords = [...selectedAdditionalKeyword];
    updatedKeywords.push(keyword);
    setSelectedAdditionalKeyword(updatedKeywords);

    if (
      (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type ===
          "keyword") ||
      (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type ===
          "reportButton")
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: "user",
        message: `제 프로젝트와 관련된 "${keyword}"를 요청드려요`,
      },
      { type: `addition` }
    );

    setConversation(updatedConversation);
    setApproachPath(3);
    setAdditionButtonState(1); // 버튼 클릭 시 buttonState를 1로 설정
  };

  useEffect(() => {
    setRandomSelections(generateRandomSelections());
  }, []);

  return (
    <>
      <SelectButton>
        <button
          onClick={() =>
            updateSelectedAdditionalKeyword(randomSelections.방법론관련)
          }
        >
          {randomSelections.방법론관련}
        </button>
        <button
          onClick={() =>
            updateSelectedAdditionalKeyword(randomSelections.사례제시)
          }
        >
          {randomSelections.사례제시}
        </button>
        <button
          onClick={() =>
            updateSelectedAdditionalKeyword(randomSelections.아이디어제공)
          }
        >
          {randomSelections.아이디어제공}
        </button>
        <button className="other" onClick={handleOtherInsightClick}>
          <img src={images.IconRefresh} alt="" />
          다른 인사이트 확인
        </button>
      </SelectButton>
    </>
  );
};

export default MoleculeAdditionalKeyword;

const SelectButton = styled.div`
  display:flex;
  align-items:center;
  gap:12px;
  margin-top: 12px;
  margin-left: 50px;

  button {
    // display:inline-block;
    // width:fit-content;
    font-family: 'Pretendard', 'Poppins';
    font-size:0.88rem;
    color:${palette.primary};
    padding:8px 20px;
    border-radius:40px;
    border:0;
    background:rgba(4, 83, 244, 0.1);
  }

  .finish {
    color:${palette.gray500};
    background:${palette.gray100};
  }

  button.other {
    display: flex;
    align-items: center;
    background: none;
    color: ${palette.lightGray};
    font-size: 0.75rem;
    border: none;
    gap: 4px;
    padding-left: 10px;

    img {
      height: 19px;
    }
  }
`;