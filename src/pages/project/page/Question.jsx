// 문항별 결과

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import styled, { css } from "styled-components";
import { palette } from "../../../assets/styles/Palette";

import {
  Title,
  BoxWrap,
  InforList,
  SelectWrapper,
  BorderBox,
} from "../../../assets/styles/Common";
import Button from "../../../assets/styles/Button";
import Icon from "../../../assets/styles/IconList";
import { PROJECTLIST } from "../../main-dashboard/state/dashboard_data_manager";
import {
  AGE_CHANGE_STATE,
  AGE_CLICK_STATE,
  GENDER_CHANGE_STATE,
  GENDER_CLICK_STATE,
  MODULES_ALL_DATA,
  PROJECT_NOW_STATE,
  QUESTION_CLICK_STATE,
} from "../state/project_manager";
import { useAtom } from "jotai";
import BarChartDom from "../../chart/barChartDom";
import BarChartDomType2 from "../../chart/barChartDomType2";

const Question = () => {
  const { projectId } = useParams();

  var nowProject = PROJECTLIST.init.Data.find(function (pro) {
    return pro.P_Idx === parseInt(projectId);
  });

  let totalParticipants = 0;

  for (const key in nowProject.Participants) {
    if (nowProject.Participants.hasOwnProperty(key)) {
      totalParticipants += nowProject.Participants[key];
    }
  }
  const [clickAge, set_clickAge] = useAtom(AGE_CLICK_STATE);
  const [clickGender, set_clickGender] = useAtom(GENDER_CLICK_STATE);
  const [changeAge, set_ChangeAge] = useAtom(AGE_CHANGE_STATE);
  const [changeGender, set_ChangeGender] = useAtom(GENDER_CHANGE_STATE);

  const [module, set_module] = useAtom(PROJECT_NOW_STATE);
  const [clickType, set_clickType] = useAtom(QUESTION_CLICK_STATE);

  // 임의적인 데이터

  var nowModule = PROJECTLIST.init.Data.find(function (pro) {
    return pro.P_Idx === parseInt(projectId);
  });

  var modules = MODULES_ALL_DATA.init.Data.find(function (mod) {
    return mod.P_Idx === parseInt(nowModule.P_Idx) && mod.module === module;
  });

  let roof = 0;

  const handleAgeChange = (event) => {
    set_ChangeAge(event.target.value); // Update age state
  };
  const handleGenderChange = (event) => {
    set_ChangeGender(event.target.value); // Update age state
  };

  // quest 다시정렬하기.
  const outData = modules.question.product_question?.map((dataValue) => {
    roof++;
    // console.log(roof);
    const questionTitle = dataValue.title
      .replace(/{product_info}/g, modules.question.product_info)
      .replace(/{product_object}/g, modules.question.product_object)
      .replace(/{product_service}/g, modules.question.product_service);
    // 복사하여

    /// Bar Chart!!!!!!!!!!!!!
    //남여 구별 성별구별 컬러만 변경하면됩니다.
    const ageData = [];
    const genderData = [];
    const ageGroups = ["10", "20", "30", "40", "50", "60"];
    const genders = ["F", "M"];

    ageGroups.forEach((age) => {
      const total = genders.reduce(
        (acc, gender) =>
          acc + nowModule.Participants[age + gender].reduce((a, b) => a + b, 0),
        0
      );
      ageData.push({
        target: age === 60 ? age + "대 이상" : age + "대",
        value: total,
        color: "",
      });
    });

    genders.forEach((gender) => {
      const total = ageGroups.reduce(
        (acc, age) =>
          acc + nowModule.Participants[age + gender].reduce((a, b) => a + b, 0),
        0
      );
      genderData.push({
        target: gender === "F" ? "여성" : "남성",
        value: total,
        color: "",
      });
    });

    // console.log("____!!!", ageData);
    // console.log("____!!!", genderData);

    /////////////////

    // 전체 연령별 데이터 .
    let agePoint = [];
    let genderPoint = [];
    let joinPoint = [];

    // console.log("Data ::", dataValue.Participants);

    //남성찾기
    const filteredParticipantsM = Object.entries(dataValue.Participants).filter(
      ([key]) => key.endsWith("M")
    );

    // console.log("남성찾기::", filteredParticipantsM);
    // 여성찾기
    const filteredParticipantsF = Object.entries(dataValue.Participants).filter(
      ([key]) => key.endsWith("F")
    );

    //복합 데이터 찾기 !!
    const filteredParticipantsAll = Object.entries(
      dataValue.Participants
    ).filter(([key]) => key.includes(changeAge + changeGender));

    // console.log("filteredParticipantsAll!!!", filteredParticipantsAll);

    const filteredParticipants10 = Object.entries(
      dataValue.Participants
    ).filter(([key]) => key.includes("10"));

    const filteredParticipants20 = Object.entries(
      dataValue.Participants
    ).filter(([key]) => key.includes("20"));
    const filteredParticipants30 = Object.entries(
      dataValue.Participants
    ).filter(([key]) => key.includes("30"));
    const filteredParticipants40 = Object.entries(
      dataValue.Participants
    ).filter(([key]) => key.includes("40"));
    const filteredParticipants50 = Object.entries(
      dataValue.Participants
    ).filter(([key]) => key.includes("50"));
    const filteredParticipants60 = Object.entries(
      dataValue.Participants
    ).filter(([key]) => key.includes("60"));

    // console.log("tttttttttttttttt", filteredParticipantsM);
    // console.log("CKCKCK", filteredParticipants10);

    for (let i = 0; i < 7; i++) {
      const target = i + 1 + "point";
      let value = 0;
      let valueAge = 0;
      //복합 데이터
      let valueAll = 0;

      if (clickGender === 1) {
        filteredParticipantsM.forEach(([_, values]) => {
          value += values[i];
        });
        //여성찾기
      } else if (clickGender === 2) {
        filteredParticipantsF.forEach(([_, values]) => {
          value += values[i];
        });
      } else if (clickGender === 0) {
        for (const key in dataValue.Participants) {
          value += dataValue.Participants[key][i];
        }
      }

      if (clickAge === 1) {
        filteredParticipants10.forEach(([_, values]) => {
          valueAge += values[i];
        });
      } else if (clickAge === 2) {
        filteredParticipants20.forEach(([_, values]) => {
          valueAge += values[i];
        });
      } else if (clickAge === 3) {
        filteredParticipants30.forEach(([_, values]) => {
          valueAge += values[i];
        });
      } else if (clickAge === 4) {
        filteredParticipants40.forEach(([_, values]) => {
          valueAge += values[i];
        });
      } else if (clickAge === 5) {
        filteredParticipants50.forEach(([_, values]) => {
          valueAge += values[i];
        });
      } else if (clickAge === 6) {
        filteredParticipants60.forEach(([_, values]) => {
          valueAge += values[i];
        });
      } else if (clickAge === 0) {
        for (const key in dataValue.Participants) {
          valueAge += dataValue.Participants[key][i];
        }
      }

      filteredParticipantsAll.forEach(([_, values]) => {
        valueAll += values[i];
      });

      genderPoint.push({ target, value });
      agePoint.push({ target, value: valueAge });
      joinPoint.push({ target, value: valueAll });
    }

    // console.log("0=전체 // 1=남성 // 2=여성  //// 상태값:: ", clickGender);
    // console.log("agePoint", genderPoint);
    const newData = {
      ...dataValue, // Include all existing data
      title: questionTitle, // Replace the title with the updated one
      ageChart: agePoint,
      genderChart: genderPoint,
      joinChart: joinPoint,
    };

    // console.log("NENENEN ::", newData.genderChart);

    return newData;
  });

  // console.log("중요한 out데이터", outData);
  // console.log("클릭타입!!", clickType);

  return (
    <>
      <Title H3>{modules.module}</Title>
      <InforList>
        <dt>
          <Icon List></Icon>목적
        </dt>
        <dd>{modules.intent}</dd>
      </InforList>
      <InforList>
        <dt>
          <Icon List></Icon>방법
        </dt>
        <dd> {modules.analysis_method}</dd>
      </InforList>

      <BoxWrap Flex style={{ marginTop: "60px" }}>
        <QuestionWrap>
          <CategoryList>
            <div>
              <Icon List />
              행동 특성 문항
            </div>

            <ul>
              {outData?.map((value) =>
                (() => {
                  if (value.type === "페르소나") {
                    return (
                      <li
                        className={clickType === value.order ? "on" : ""}
                        key={value.title}
                        onClick={() => {
                          set_clickType(value.order);
                        }}
                      >
                        <Link to="#"></Link>
                        <p>{value.title}</p>
                      </li>
                    );
                  }
                  return null; // Return null when the condition is not met
                })()
              )}
            </ul>

            {/* 여기 디자인좀 부탁드립니다 지선님  */}
            <div>
              <Icon List />
              구매 특성 문항
            </div>
            <ul>
              {outData?.map((value) =>
                (() => {
                  if (value.type === "구매기준") {
                    return (
                      <li
                        key={value.title}
                        className={clickType === value.order ? "on" : ""}
                        onClick={() => {
                          set_clickType(value.order);
                        }}
                      >
                        <Link to="#"></Link>
                        <p>{value.title}</p>
                      </li>
                    );
                  }
                  return null; // Return null when the condition is not met
                })()
              )}
            </ul>
          </CategoryList>

          <QuestionCont>
            <div>
              <Title H4>성별 결과</Title>
              <TabResult>
                <span
                  className={clickGender === 0 ? "on" : ""}
                  onClick={() => set_clickGender(0)}
                >
                  전체
                </span>
                <span
                  className={clickGender === 1 ? "on" : ""}
                  onClick={() => set_clickGender(1)}
                >
                  남성
                </span>
                <span
                  className={clickGender === 2 ? "on" : ""}
                  onClick={() => set_clickGender(2)}
                >
                  여성
                </span>
              </TabResult>
              <div className="graphWrap">
                <BorderBox>
                  <BarChartDomType2
                    inData={outData[clickType].genderChart}
                    widthSize={650}
                    heightSize={350}
                    barWidth={80}
                  />
                </BorderBox>

                <div className="bgBox">{outData[clickType].Gender_Content}</div>
              </div>
            </div>
            <div>
              <Title H4>연령별 결과</Title>
              <TabResult>
                <span
                  className={clickAge === 0 ? "on" : ""}
                  onClick={() => set_clickAge(0)}
                >
                  전체
                </span>

                <span
                  className={clickAge === 1 ? "on" : ""}
                  onClick={() => set_clickAge(1)}
                >
                  10대
                </span>

                <span
                  className={clickAge === 2 ? "on" : ""}
                  onClick={() => set_clickAge(2)}
                >
                  20대
                </span>
                <span
                  className={clickAge === 3 ? "on" : ""}
                  onClick={() => set_clickAge(3)}
                >
                  30대
                </span>
                <span
                  className={clickAge === 4 ? "on" : ""}
                  onClick={() => set_clickAge(4)}
                >
                  40대
                </span>
                <span
                  className={clickAge === 5 ? "on" : ""}
                  onClick={() => set_clickAge(5)}
                >
                  50대
                </span>
                <span
                  className={clickAge === 6 ? "on" : ""}
                  onClick={() => set_clickAge(6)}
                >
                  60대 이상
                </span>
              </TabResult>
              <div className="graphWrap">
                <BorderBox>
                  <BarChartDomType2
                    inData={outData[clickType].ageChart}
                    widthSize={650}
                    heightSize={350}
                    barWidth={80}
                  />
                </BorderBox>
                <div className="bgBox">{outData[clickType].Age_Content}</div>
              </div>
            </div>
            <div>
              <Title H4>성별 & 연령별 조합 결과</Title>
              <TabResult NoLine>
                <select onChange={handleAgeChange}>
                  <option value="10">10대</option>
                  <option value="20">20대</option>
                  <option value="30">30대</option>
                  <option value="40">40대</option>
                  <option value="50">50대</option>
                  <option value="60">60대 이상</option>
                </select>

                <select onChange={handleGenderChange}>
                  <option value="F">여성</option>
                  <option value="M">남성</option>
                </select>
              </TabResult>
              <div className="graphWrap">
                <BorderBox>
                  <BarChartDomType2
                    inData={outData[clickType].joinChart}
                    widthSize={650}
                    heightSize={350}
                    barWidth={80}
                  />
                </BorderBox>

                <div className="bgBox">{outData[clickType].Total_Content}</div>
              </div>
            </div>
          </QuestionCont>
        </QuestionWrap>
      </BoxWrap>
    </>
  );
};

export default Question;

const QuestionWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  width: 100%;
`;

const CategoryList = styled.div`
  max-width: 400px;
  width: 100%;

  > div {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.125rem;
    font-weight: 700;
    padding: 20px;
    border-radius: 15px;
    border: 1px solid ${palette.lineGray};

    ~ div {
      margin-top: 60px;
    }

    &:after {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
      width: 10px;
      height: 10px;
      border-right: 2px solid ${palette.gray};
      border-bottom: 2px solid ${palette.gray};
      content: "";
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 15px;
  }

  li {
    position: relative;
    padding: 20px;
    border-radius: 15px;
    border: 1px solid ${palette.lineGray};
    transition: all 0.5s;

    a {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    p {
      font-size: 1.125rem;
      color: ${palette.gray};
      transition: all 0.5s;
    }

    span {
      font-size: 0.875rem;
      color: ${palette.gray};
      display: block;
      margin-top: 10px;
      transition: all 0.5s;
    }

    &:hover,
    &:active,
    &.on {
      border: 1px solid ${palette.blue};
      background: rgba(4, 83, 244, 0.06);

      > span,
      > p {
        font-weight: 700;
        color: ${palette.darkGray};
      }
    }
  }
`;

const QuestionCont = styled.div`
  width: 100%;
  padding: 20px;

  > div + div {
    margin-top: 80px;
  }

  &.graphWrap {
  }

  .bgBox {
    font-size: 1.125rem;
    color: ${palette.darkGray};
    margin-top: 30px;
    padding: 25px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.04);
  }
`;

const TabResult = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  margin-bottom: 30px;
  border-radius: 10px;
  border: 1px solid ${palette.lineGray};

  > span {
    display: inline-block;
    font-size: 1.125rem;
    padding: 8px 12px;
    border-radius: 10px;
    transition: all 0.5s;
    cursor: pointer;

    &:hover,
    &.on {
      color: ${palette.white};
      background: ${palette.black};
    }
  }

  ${(props) =>
    props.NoLine &&
    css`
      border: none;
      padding: 0;
    `}
`;
