// 프로젝트 개요

import React from "react";

import styled from "styled-components";
import { palette } from "../../../assets/styles/Palette";

import {
  Title,
  InfoList,
  BoxWrap,
  BorderBox,
} from "../../../assets/styles/Common";
import Icon from "../../../assets/styles/IconList";
import { HashTag, Tag } from "../../../assets/styles/HashTag";
import { useParams } from "react-router-dom";
import { PROJECTLIST } from "../../main-dashboard/state/dashboard_data_manager";
import { useAtom } from "jotai";
import { MODULES_ALL_DATA, PROJECT_NOW_STATE } from "../state/project_manager";

import PieChart from "../../chart/pieChart";

import Avatar1 from "../../../assets/images/avatar1.png";
import Avatar5 from "../../../assets/images/avatar5.png";
import OnlineSurvey from "../../../assets/images/onlineSurvey.png";
import Interview from "../../../assets/images/Interview.png";
import BarChartDom from "../../chart/barChartDom";

const Summary = () => {
  const { projectId } = useParams();

  var nowProject = PROJECTLIST.init.Data.find(function (pro) {
    return pro.P_Idx === parseInt(projectId);
  });

  let totalParticipants = 0;

  // 객체 안의 배열 값 합친것.
  for (const key in nowProject.Participants) {
    if (nowProject.Participants.hasOwnProperty(key)) {
      totalParticipants += nowProject.Participants[key].reduce(
        (acc, curr) => acc + curr,
        0
      );
      // totalParticipants += nowProject.Participants[key];
    }
  }

  const [module, set_module] = useAtom(PROJECT_NOW_STATE);

  var nowModule = PROJECTLIST.init.Data.find(function (pro) {
    return pro.P_Idx === parseInt(projectId);
  });

  // console.log("MODMODMOD", module);
  var modules = MODULES_ALL_DATA.init.Data.find(function (mod) {
    return mod.P_Idx === parseInt(nowModule.P_Idx) && mod.module === module;
  });
  //전체 배열의 값들 합친것.,

  //

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
  return (
    <>
      <BoxWrap>
        <InfoList>
          <div>
            <p>조사내용</p>
            <strong>{nowProject.Title}</strong>
          </div>
          <div>
            <p>참여인원</p>
            <strong>총 {totalParticipants}명</strong>
          </div>
        </InfoList>

        <BorderBox style={{ marginBottom: "40px" }}>
          <h3>
            <Icon List></Icon>조사 목적
          </h3>
          <p>{nowProject.Purpose}</p>
        </BorderBox>

        <BoxWrap NoLine Flex>
          <BorderBox>
            <Title H4>성별</Title>
            <PieChart
              inData={genderData}
              widthSize={250}
              heightSize={236}
              barWidth={20}
            />
          </BorderBox>

          <BorderBox>
            <Title H4>연령별</Title>
            <BarChartDom
              inData={ageData}
              widthSize={350}
              heightSize={280}
              barWidth={40}
            />
          </BorderBox>

          <BorderBox>
            <Title H4>조사방법</Title>
            <Method>
              <div>
                <img src={OnlineSurvey} alt="" />
                <span>온라인 설문조사</span>
              </div>
              <div>
                <img src={Interview} alt="" />
                <span>
                  FGI
                  <br />
                  <em>(Focus Group Interview)</em>
                </span>
              </div>
            </Method>
          </BorderBox>
        </BoxWrap>
      </BoxWrap>

      <BoxWrap>
        <Title H3>
          {modules.personas.length} 명의 타겟 페르소나를 찾았어요
        </Title>

        <WebzineWrap>
          {modules.personas?.map((value) => (
            <WebzineList>
              <div className="thumb">
                {value.gender === "F" ? (
                  <img src={Avatar5} alt="" />
                ) : (
                  <img src={Avatar1} alt="" />
                )}
              </div>
              <div className="cont">
                <strong>{value.title}</strong>
                <p>{value.content}</p>
                <HashTag>
                  {value.tag?.map((tagValue, index) => (
                    <Tag key={index} Green>
                      {tagValue}
                    </Tag>
                  ))}
                </HashTag>
              </div>
            </WebzineList>
          ))}
        </WebzineWrap>
      </BoxWrap>
    </>
  );
};

export default Summary;

const Method = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;

  > div {
    width: 100%;
    text-align: center;

    + div {
      padding-top: 20px;
      margin-top: 10px;
      border-top: 1px solid ${palette.lineGray};
    }
  }

  img {
    max-width: 70px;
  }

  span {
    display: block;
    font-size: 1rem;
    font-weight: 700;

    em {
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 300;
      color: ${palette.gray};
    }
  }
`;

const ChartBarWrap = styled.div`
  height: 100%;
  svg {
    height: 100%;
  }
  .tooltipBar {
    display: none;
  }
`;

const WebzineWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const WebzineList = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid ${palette.lineGray};

  .thumb {
    position: relative;
    flex-shrink: 0;
    max-width: 240px;
    width: 100%;
    max-height: 240px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    background: ${palette.lightGray};

    > img {
      width: 100%;
    }
  }

  .cont {
    flex-grow: 1;

    strong {
      font-size: 1.75rem;
      line-height: 1.2;
      display: block;
    }

    p {
      font-size: 1.125rem;
      line-height: 1.3;
      color: ${palette.DimGray};
      margin: 20px auto 30px;
    }
  }
`;
