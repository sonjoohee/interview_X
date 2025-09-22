// 타겟고객 분석

import React from "react";
import { Link, useParams } from "react-router-dom";

import styled, { css } from "styled-components";
import { palette } from "../../../assets/styles/Palette";

import {
  Title,
  BoxWrap,
  InforList,
  BorderBox,
} from "../../../assets/styles/Common";
import { HashTag, Tag } from "../../../assets/styles/HashTag";
import Icon from "../../../assets/styles/IconList";
import { CheckBox } from "../../../assets/styles/Input";

import Avatar1 from "../../../assets/images/avatar1.png";
import Avatar5 from "../../../assets/images/avatar5.png";
import { PROJECTLIST } from "../../main-dashboard/state/dashboard_data_manager";
import {
  MODULES_ALL_DATA,
  PERSONAN_CLICK_STATE,
  PROJECT_NOW_STATE,
} from "../state/project_manager";

import { useAtom } from "jotai";
import LineChart from "../../chart/LineChart";
import RadarChart from "../../chart/radarChart";
import RadarChartTest from "../../chart/RadarChartTest";

const Target = () => {
  const { projectId } = useParams();

  var nowProject = PROJECTLIST.init.Data.find(function (pro) {
    return pro.P_Idx === parseInt(projectId);
  });

  const [module, set_module] = useAtom(PROJECT_NOW_STATE);
  const [clickPersona, set_clickPersona] = useAtom(PERSONAN_CLICK_STATE);

  var nowModule = PROJECTLIST.init.Data.find(function (pro) {
    return pro.P_Idx === parseInt(projectId);
  });

  var modules = MODULES_ALL_DATA.init.Data.find(function (mod) {
    return mod.P_Idx === parseInt(nowModule.P_Idx) && mod.module === module;
  });

  // console.log("타겟!!", modules);
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
        <dd>{modules.analysis_method}</dd>
      </InforList>
      <InforList>
        <dt>
          <Icon List></Icon>타겟 수
        </dt>
        <dd>{modules.target}</dd>
      </InforList>
      <InforList>
        <dt>
          <Icon List></Icon>결과 내용
        </dt>
        <dd>
          <HashTag>
            {modules.Output?.map((value) => (
              <Tag Red>{value}</Tag>
            ))}
          </HashTag>
        </dd>
      </InforList>

      <Hr />

      <AvatarWrap>
        {modules.Personas?.map((value) => (
          <AvatarList
            onClick={() => {
              set_clickPersona(value.Order);
            }}
          >
            <Link to="#"></Link>
            {clickPersona === value.Order ? (
              <div className="thumb">
                <Grade Active>
                  {value.Gender === "F" ? (
                    <img src={Avatar5} alt="" />
                  ) : (
                    <img src={Avatar1} alt="" />
                  )}
                </Grade>
                <span>{value.Name}</span>
              </div>
            ) : (
              <div className="thumb">
                <Grade>
                  {value.Gender === "F" ? (
                    <img src={Avatar5} alt="" />
                  ) : (
                    <img src={Avatar1} alt="" />
                  )}
                </Grade>
                <span>{value.Name}</span>
              </div>
            )}
          </AvatarList>
        ))}

        <AvatarList>
          <Link to="#"></Link>
          <div className="thumb">
            <Grade Add>
              <img src={Avatar1} alt="" />
            </Grade>
            <span>추가</span>
            {/* {clickPersona} */}
          </div>
        </AvatarList>
      </AvatarWrap>

      <BoxWrap style={{ marginTop: "50px" }}>
        <AvatarProfile>
          <div className="thumb">
            {modules.Personas[clickPersona].Gender === "F" ? (
              <img src={Avatar5} alt="" />
            ) : (
              <img src={Avatar1} alt="" />
            )}
          </div>
          <div className="cont">{modules.Personas[clickPersona].Comment}</div>
        </AvatarProfile>

        <ProfileInfo style={{ marginBottom: "50px" }}>
          <ul className="summary">
            <li>
              <strong>이름</strong>
              <p>{modules.Personas[clickPersona].Name}</p>
            </li>
            <li>
              <strong>나이</strong>
              <p>{modules.Personas[clickPersona].Age}세</p>
            </li>
            <li>
              <strong>성별</strong>
              <p>
                {modules.Personas[clickPersona].Gender === "M"
                  ? "남성"
                  : "여성"}
              </p>
            </li>
            <li>
              <strong>직업</strong>
              <p>{modules.Personas[clickPersona].Job}</p>
            </li>
          </ul>

          <div className="info">
            <strong>라이프스타일</strong>
            <p>{modules.Personas[clickPersona].LifeStyle}</p>
          </div>
        </ProfileInfo>

        <BoxWrap style={{ marginBottom: "50px" }}>
          <Title H3>이용 상황 및 맥락 분석</Title>

          <BgBoxWrap Flex>
            {modules.Personas[clickPersona].Usage_Context?.map((value) => (
              <BgBox>
                <strong>{value.title}</strong>
                <p>{value.content}</p>
              </BgBox>
            ))}
          </BgBoxWrap>
        </BoxWrap>

        <BoxWrap style={{ marginBottom: "50px" }}>
          <Title H3>페르소나 특성 분석</Title>

          <BoxWrap Flex NoLine>
            <div style={{ width: "100%" }}>
              <LineChart
                inData={modules.Personas[clickPersona].Persona_Analysis_chart}
                widthSize={450}
                heightSize={500}
              />
            </div>
            <BgBox>
              <ul>
                {modules.Personas[clickPersona].Persona_Analysis?.map(
                  (value, index) => (
                    <li>
                      <strong>
                        {index + 1} 순위 : {value.Importance_Title}
                      </strong>
                      <p>{value.Importance_Content}</p>
                    </li>
                  )
                )}
              </ul>
            </BgBox>
          </BoxWrap>
        </BoxWrap>

        <BoxWrap style={{ marginBottom: "50px" }}>
          <Title H3>제품관련 문제 및 불편함 정도</Title>

          <HashTag style={{ marginBottom: "20px" }}>
            {modules.Personas[clickPersona].Product_Issue?.map((issue) =>
              issue.Tag?.map((tag) => (
                <Tag Red key={tag}>
                  #{tag}
                </Tag>
              ))
            )}
          </HashTag>

          {modules.Personas[clickPersona].Product_Issue?.map((value) =>
            value.Issue?.map((issue) => (
              <InfoList>
                <p for="check1">{issue.content}</p>
              </InfoList>
            ))
          )}
        </BoxWrap>

        <BoxWrap style={{ marginBottom: "50px" }}>
          <Title H3>구매 결정 요인 분석</Title>

          <BoxWrap Flex NoLine>
            <BorderBox style={{ maxWidth: "500px", width: "100%" }}>
              <RadarChart
                inData={modules.Personas[clickPersona].Purchase_Chart}
                widthSize={450}
                heightSize={450}
              />
            </BorderBox>
            <div>
              {modules.Personas[clickPersona].Purchase?.map((value) =>
                value.Opinion_State === "긍정" ? (
                  <Emotion Positive>
                    <strong>{value.Opinion_Title}</strong>
                    <p>{value.Opinion_Content}</p>
                  </Emotion>
                ) : (
                  <Emotion Denial>
                    <strong>{value.Opinion_Title}</strong>
                    <p>{value.Opinion_Content}</p>
                  </Emotion>
                )
              )}
            </div>
          </BoxWrap>
        </BoxWrap>

        <BoxWrap style={{ marginBottom: "50px" }}>
          <Title H3>제품/서비스 차별화 요소 분석</Title>

          <HashTag style={{ marginBottom: "20px" }}>
            {modules.Personas[clickPersona].Product_Differentiator?.map(
              (issue) =>
                issue.Tag?.map((tag) => (
                  <Tag Red key={tag}>
                    #{tag}
                  </Tag>
                ))
            )}
          </HashTag>

          {modules.Personas[clickPersona].Product_Differentiator?.map((value) =>
            value.Differentiator?.map((issue) => (
              <InfoList>
                <p for="check1">{issue.content}</p>
              </InfoList>
            ))
          )}
        </BoxWrap>

        <BoxWrap style={{ marginBottom: "0" }}>
          <Title H3>제품에 대한 정보 수집 방법 </Title>

          <BgBoxWrap Flex>
            {modules.Personas[clickPersona].Info_Collection?.map((value) => (
              <BgBox>
                <strong>{value.title}</strong>
                <p>{value.content}</p>
              </BgBox>
            ))}
          </BgBoxWrap>
        </BoxWrap>
      </BoxWrap>
    </>
  );
};

export default Target;

const Hr = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  margin: 80px auto 60px;
  background: ${palette.lineGray};

  ${(props) =>
    props.Arrow &&
    css`
      &:before {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${palette.lineGray};
        content: "";
      }
      &:after {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%, -50%) rotate(45deg);
        width: 8px;
        height: 8px;
        border-right: 2px solid ${palette.white};
        border-bottom: 2px solid ${palette.white};
        content: "";
      }
    `}
`;

const AvatarWrap = styled.div`
  display: flex;
  gap: 20px;
`;

const AvatarList = styled.div`
  position: relative;

  a {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  span {
    font-size: 0.94rem;
    font-weight: 500;
    text-align: center;
    display: block;
    margin-top: 15px;
  }
`;

const Grade = styled.div`
  position: relative;
  width: 84px;
  height: 84px;
  border-radius: 50%;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }

  &:before {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 76px;
    height: 76px;
    border-radius: 50%;
    background: ${palette.white};
    content: "";
  }

  ${(props) =>
    props.Active &&
    css`
      background-image: -webkit-linear-gradient(
        to right,
        #4070f4,
        #65bbb1,
        #4a00e0
      );
      background-image: linear-gradient(
        to right,
        #65bbb1,
        #4070f4,
        #4a00e0,
        #216671
      );
    `}

  ${(props) =>
    props.Add &&
    css`
      border: 3px dashed ${palette.lineGray};

      &:before {
        width: 12px;
        height: 2px;
        border-radius: 0;
        background: ${palette.lineGray};
      }

      &:after {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 2px;
        height: 12px;
        border-radius: 0;
        background: ${palette.lineGray};
        content: "";
      }

      img {
        display: none;
      }
    `}
`;

const AvatarProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 75px;
  margin-bottom: 40px;

  .thumb {
    position: relative;
    width: 270px;
    height: 270px;
    flex-shrink: 0;
    border-radius: 50%;
    overflow: hidden;
    background: ${palette.lightGray};

    img {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 100%;
    }
  }
  .cont {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.2;
    flex-grow: 1;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  gap: 80px;
  padding: 40px;
  border-radius: 20px;
  border: 1px solid ${palette.lineGray};

  .summary {
    position: relative;
    max-width: 300px;
    width: 100%;
    font-size: 1.25rem;
    flex-shrink: 0;

    li {
      display: flex;
      gap: 40px;

      + li {
        margin-top: 20px;
      }
    }

    &:after {
      position: absolute;
      right: -40px;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 100%;
      background: ${palette.lineGray};
      content: "";
    }
  }

  .info {
    font-size: 1.25rem;
    line-height: 1.2;
    flex-grow: 1;

    strong {
      display: block;
      font-weight: 700;
      margin-bottom: 15px;
    }

    p {
      font-size: 1.125rem;
      line-height: 1.3;
    }
  }
`;

const BgBoxWrap = styled.div`
  ${(props) =>
    props.Flex &&
    css`
      display: flex;
      gap: 20px;
      text-align: center;

      > div {
        padding: 60px 30px;
        flex: 1;
      }

      strong {
        font-size: 1.25rem;
        font-weight: 700;
        color: ${palette.blue};
        display: inline-block;
        margin-bottom: 15px;
      }

      p {
        font-size: 1.125rem;
        line-height: 1.2;
        color: ${palette.darkGray};
      }
    `}
`;

const BgBox = styled.div`
  padding: 30px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.04);

  li {
    font-size: 1.25rem;
    + li {
      margin-top: 20px;
    }
    p {
      color: ${palette.darkGray};
    }
  }
`;

const InfoList = styled.div`
  position: relative;

  p {
    position: relative;
    font-size: 1.125rem;
    color: ${palette.darkGray};
    line-height: 22px;
    padding-left: 20px;

    &:before {
      position: absolute;
      left: 0;
      top: 5px;
      width: 10px;
      height: 10px;
      border: 2px solid ${palette.skyBlue};
      border-radius: 50%;
      content: "";
    }
  }
`;

const Emotion = styled.div`
  font-size: 1.25rem;
  line-height: 1.3;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid ${palette.lineGray};

  + div {
    margin-top: 12px;
  }

  strong {
    position: relative;
    font-weight: 700;
    display: block;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.125rem;
    line-height: 1.3;
    color: ${palette.darkGray};
  }

  ${(props) =>
    props.Positive &&
    css`
      strong {
        padding-left: 35px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='26' viewBox='0 0 25 26' fill='none'%3E%3Cpath d='M0 12.8828C0 5.98806 5.61527 0.376801 12.508 0.382817C19.4068 0.388834 25.014 6.01012 25 12.8988C24.9839 19.7856 19.3927 25.3748 12.508 25.3828C5.61727 25.3908 0 19.7755 0 12.8828Z' fill='%2300C01E'/%3E%3Cpath d='M9.07473 12.2401C9.07273 13.285 8.29662 14.1052 7.30592 14.1052C6.32124 14.1052 5.53511 13.2749 5.53711 12.2361C5.53711 11.1973 6.32325 10.373 7.30993 10.373C8.30063 10.3751 9.07473 11.1933 9.07473 12.2401Z' fill='black'/%3E%3Cpath d='M15.9248 12.2342C15.9228 11.1894 16.7009 10.3691 17.6916 10.3691C18.6803 10.3691 19.4624 11.1934 19.4624 12.2322C19.4624 13.269 18.6743 14.0993 17.6916 14.0993C16.7069 14.1033 15.9268 13.2791 15.9248 12.2342Z' fill='black'/%3E%3Cpath d='M8.28387 16.3312C8.28387 16.1066 8.39016 15.9562 8.57467 15.862C8.77521 15.7597 8.96974 15.7878 9.1402 15.9302C9.36481 16.1167 9.57539 16.3212 9.80601 16.4997C11.3442 17.6869 12.9606 17.701 14.6291 16.7965C15.0563 16.5659 15.4393 16.2731 15.8083 15.9582C16.067 15.7396 16.3578 15.7557 16.5624 15.9743C16.7609 16.1849 16.7689 16.5218 16.5303 16.7283C14.8778 18.1602 13.0388 18.9283 10.8248 18.2485C9.90228 17.9657 9.14421 17.4062 8.45835 16.7404C8.34003 16.6261 8.27585 16.4877 8.28387 16.3312Z' fill='black'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: auto 22px;
        background-position: 0px 2px;
      }
    `}

  ${(props) =>
    props.Denial &&
    css`
      strong {
        padding-left: 35px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='26' viewBox='0 0 25 26' fill='none'%3E%3Cpath d='M0 12.8828C0 5.98806 5.61527 0.376801 12.508 0.382817C19.4068 0.388834 25.014 6.01012 25 12.8989C24.9839 19.7856 19.3927 25.3748 12.508 25.3828C5.61727 25.3908 0 19.7756 0 12.8828Z' fill='%23FC3030'/%3E%3Cpath d='M9.07473 12.2401C9.07273 13.285 8.29662 14.1052 7.30592 14.1052C6.32124 14.1052 5.53511 13.2749 5.53711 12.2361C5.53711 11.1973 6.32325 10.373 7.30993 10.373C8.30063 10.3751 9.07473 11.1933 9.07473 12.2401Z' fill='black'/%3E%3Cpath d='M15.9258 12.2342C15.9238 11.1894 16.7019 10.3691 17.6926 10.3691C18.6813 10.3691 19.4634 11.1934 19.4634 12.2322C19.4634 13.269 18.6753 14.0993 17.6926 14.0993C16.7079 14.1033 15.9278 13.2791 15.9258 12.2342Z' fill='black'/%3E%3Cpath d='M16.7078 17.9726C16.7078 18.1972 16.6015 18.3476 16.417 18.4418C16.2164 18.5441 16.0219 18.516 15.8515 18.3737C15.6268 18.1871 15.4163 17.9826 15.1856 17.8041C13.6475 16.6169 12.0311 16.6028 10.3625 17.5073C9.93537 17.7379 9.55233 18.0307 9.18333 18.3456C8.92462 18.5642 8.63383 18.5481 8.42928 18.3295C8.23074 18.119 8.22271 17.782 8.46136 17.5755C10.1139 16.1436 11.9529 15.3755 14.1669 16.0554C15.0894 16.3381 15.8474 16.8976 16.5333 17.5635C16.6516 17.6758 16.7158 17.8141 16.7078 17.9726Z' fill='black'/%3E%3Cpath d='M6.47901 7.24023C7.86076 7.30641 8.96978 7.99429 9.94042 8.95089C10.153 9.15945 10.1229 9.48434 9.92437 9.68288C9.7118 9.89546 9.42301 9.89746 9.17032 9.66884C8.66696 9.2136 8.13551 8.80048 7.49978 8.54378C7.03251 8.35527 6.55923 8.26101 6.04984 8.34925C5.62268 8.42345 5.38202 8.27705 5.31985 7.95016C5.25769 7.61124 5.45422 7.37259 5.87737 7.29438C6.06388 7.26029 6.2564 7.26029 6.47901 7.24023Z' fill='black'/%3E%3Cpath d='M18.5394 7.24414C18.8021 7.26018 19.0608 7.25818 19.3115 7.34241C19.6003 7.44067 19.7206 7.64724 19.6805 7.94204C19.6444 8.21679 19.4238 8.41533 19.129 8.36318C17.8936 8.14659 16.9531 8.72015 16.0687 9.46418C15.9744 9.5444 15.8862 9.63264 15.7899 9.70884C15.5512 9.89535 15.3106 9.88933 15.088 9.68678C14.8794 9.49827 14.8493 9.16537 15.0599 8.9588C16.0245 7.99819 17.1315 7.31233 18.5394 7.24414Z' fill='black'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: auto 22px;
        background-position: 0px 2px;
      }
    `}
`;
