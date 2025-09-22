//대시보드
import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { palette } from "../../assets/styles/Palette";
import OrganismIncNavigation from "../Global/organisms/OrganismIncNavigation";
// import Header from "../../../Design_Page/IncHeader";
import MoleculeHeader from "../Global/molecules/MoleculeHeader";
import MoleculeAccountPopup from "../Login_Sign/components/molecules/MoleculeAccountPopup";
import PopupWrap from "../../assets/styles/Popup";
import { Button } from "../../assets/styles/ButtonStyle";
import {
  ContentsWrap,
  MainContent,
  Tag,
  Table,
  TableHeader,
  TableBody,
} from "../../assets/styles/BusinessAnalysisStyle";
import images from "../../assets/styles/Images";
import {
  H1,
  H2,
  H4,
  Body1,
  Body2,
  Body3,
  Sub1,
  Sub2,
  Sub3,
  Caption1,
  InputText,
} from "../../assets/styles/Typography";
import * as d3 from "d3";

const PageDashBoard = () => {
  const navigate = useNavigate();

  const [showTooltip, setShowTooltip] = useState(false);

  const macroChartRef = useRef();
  const uniqueChartRef = useRef();
  const stakeholderChartRef = useRef();

  const createPieChart = (ref, data) => {
    if (ref.current) {
      // 이전 차트 제거
      d3.select(ref.current).selectAll("*").remove();

      const width = 88;
      const height = 88;
      const radius = Math.min(width, height) / 2;

      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const pie = d3
        .pie()
        .value((d) => d.value)
        .sort(null)
        .startAngle(-0.5 * Math.PI)
        .endAngle(1.5 * Math.PI);

      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      const arcs = svg.selectAll("arc").data(pie(data)).enter().append("g");

      arcs
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => d.data.color)
        .attr("stroke", "none");
    }
  };

  useEffect(() => {
    // Macro Segment 데이터 (총 15명)
    const macroData = [
      { label: "비활성 페르소나", value: 10, color: palette.outlineGray },
      { label: "생성 중", value: 3, color: "#32ADE6" },
      { label: "활성 페르소나", value: 2, color: palette.primary },
    ];

    // Unique User 데이터 (총 10명)
    const uniqueData = [
      { label: "비활성 페르소나", value: 5, color: palette.outlineGray },
      { label: "생성 중", value: 3, color: "#32ADE6" },
      { label: "활성 페르소나", value: 2, color: palette.primary },
    ];

    // Key Stakeholder 데이터 (총 14명)
    const stakeholderData = [
      { label: "비활성 페르소나", value: 1, color: palette.outlineGray },
      { label: "생성 중", value: 10, color: "#32ADE6" },
      { label: "활성 페르소나", value: 3, color: palette.primary },
    ];

    // 각각의 차트 생성
    createPieChart(macroChartRef, macroData);
    createPieChart(uniqueChartRef, uniqueData);
    createPieChart(stakeholderChartRef, stakeholderData);
  }, []);

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1240>
          <DashBoardWrap>
            <DashBoardItem>
              <div className="title">
                <H1 color="gray800" align="left">
                  Dash Board
                </H1>

                <Button ExLarge Primary Fill>
                  <Sub1 color="white">팀원 초대</Sub1>
                </Button>
              </div>

              <Card>
                <CardTitle>
                  <div>
                    <H4 color="gray800">
                      쉽고 빠르게 송금 및 이체 할 수 있는 어플리케이션
                    </H4>
                    <TagWrap>
                      <Tag color="Amethyst" />
                      <Tag color="Amethyst" />
                      <Tag color="Amethyst" />
                    </TagWrap>
                  </div>

                  <Button ExLarge PrimaryLightest Fill>
                    자세히보기
                    <images.ChevronRight
                      width="14px"
                      height="14px"
                      color={palette.primary}
                    />
                  </Button>
                </CardTitle>
                <CardContent>
                  <Body3 color="gray800">
                    이 애플리케이션은 사용자가 쉽고 빠르게 송금 및 이체를 할 수
                    있도록 돕는 것을 목표로 합니다. 이를 통해 복잡한 금융 절차를
                    간소화하고 사용자에게 편리함을 제공합니다. 주요 특징으로는
                    사용 편의성을 극대화한 직관적인 UI/UX, 빠른 송금 속도,
                    저렴한 수수료, 그리고 사용자 맞춤형 알림 서비스 등이
                    있습니다. 이러한 특징들은 사용자에게 최상의 경험을 제공하며
                    경쟁사 대비 차별화된 가치를 제안합니다. 주요 특징으로는 사용
                    편의성을 극대화한 직관적인 UI/UX, 빠른 송금 속도, 저렴한
                    수수료, 그리고 사용자 맞춤형 알림 서비스 등이 있습니다.
                    이러한 특징들은 사용자에게 최상의 경험을 제공하며 경쟁사
                    대비 차별화된 가치를 제안합니다.
                  </Body3>
                </CardContent>
              </Card>
            </DashBoardItem>

            <DashBoardItem>
              <div className="title">
                <H2 color="gray800" align="left">
                  Persona Status
                </H2>

                <TooltipButton onClick={() => setShowTooltip(!showTooltip)}>
                  <Sub3 color="gray500">페르소나 유형 알아보기</Sub3>
                  {showTooltip && (
                    <TooltipContent>
                      <TooltipHeader>
                        페르소나 유형 알아보기
                        <span />
                      </TooltipHeader>

                      <TooltipBody>
                        <div>
                          <div className="title start">
                            <Sub3 color="gray500">비활성 페르소나</Sub3>
                          </div>
                          <Sub3 color="gray700" align="left">
                            프로젝트에 따라 추천된 페르소나지만, 아직 자신의
                            경험이나 의견을 표현할 수 없는 상태
                          </Sub3>
                        </div>

                        <div>
                          <div className="title ing">
                            <Sub3 color="gray500">생성 중</Sub3>
                          </div>
                          <Sub3 color="gray700" align="left">
                            페르소나 생성 요청이 접수되어, 의견을 표현할 수
                            있도록 생성 중인 상태
                          </Sub3>
                        </div>

                        <div>
                          <div className="title complete">
                            <Sub3 color="gray500">활성 페르소나</Sub3>
                          </div>
                          <Sub3 color="gray700" align="left">
                            생성이 완료되어 자신의 경험과 의견을 자유롭게 표현할
                            수 있는 상태
                          </Sub3>
                        </div>
                      </TooltipBody>
                    </TooltipContent>
                  )}
                </TooltipButton>
              </div>

              <PersonaStatusWrap>
                <div>
                  <div className="title">
                    <Body1 color="gray700" align="left">
                      Macro Segment
                      <br />
                      추천 페르소나
                    </Body1>
                    <Body1 color="gray700" align="right">
                      총 15명
                    </Body1>
                  </div>
                  <div className="content">
                    <div ref={macroChartRef}></div>
                    <UlInfo>
                      <li className="start">
                        <Sub3 color="gray500">비활성 페르소나</Sub3>
                        <Sub2 color="gray700">10명</Sub2>
                      </li>
                      <li className="ing">
                        <Sub3 color="gray500">생성 중</Sub3>
                        <Sub2 color="gray700">3명</Sub2>
                      </li>
                      <li className="complete">
                        <Sub3 color="gray500">활성 페르소나</Sub3>
                        <Sub2 color="gray700">2명</Sub2>
                      </li>
                    </UlInfo>
                  </div>
                </div>

                <div>
                  <div className="title">
                    <Body1 color="gray700" align="left">
                      Unique User
                      <br />
                      추천 페르소나
                    </Body1>
                    <Body1 color="gray700" align="right">
                      총 10명
                    </Body1>
                  </div>
                  <div className="content">
                    <div ref={uniqueChartRef}></div>
                    <UlInfo>
                      <li className="start">
                        <Sub3 color="gray500">비활성 페르소나</Sub3>
                        <Sub2 color="gray700">5명</Sub2>
                      </li>
                      <li className="ing">
                        <Sub3 color="gray500">생성 중</Sub3>
                        <Sub2 color="gray700">3명</Sub2>
                      </li>
                      <li className="complete">
                        <Sub3 color="gray500">활성 페르소나</Sub3>
                        <Sub2 color="gray700">2명</Sub2>
                      </li>
                    </UlInfo>
                  </div>
                </div>

                <div>
                  <div className="title">
                    <Body1 color="gray700" align="left">
                      Key Stakeholder
                      <br />
                      추천 페르소나
                    </Body1>
                    <Body1 color="gray700" align="right">
                      총 14명
                    </Body1>
                  </div>
                  <div className="content">
                    <div ref={stakeholderChartRef}></div>
                    <UlInfo>
                      <li className="start">
                        <Sub3 color="gray500">비활성 페르소나</Sub3>
                        <Sub2 color="gray700">1명</Sub2>
                      </li>
                      <li className="ing">
                        <Sub3 color="gray500">생성 중</Sub3>
                        <Sub2 color="gray700">10명</Sub2>
                      </li>
                      <li className="complete">
                        <Sub3 color="gray500">활성 페르소나</Sub3>
                        <Sub2 color="gray700">3명</Sub2>
                      </li>
                    </UlInfo>
                  </div>
                </div>
              </PersonaStatusWrap>

              <PersonaStatusWrap NoData>
                <div>
                  <img src={images.PeopleFillPrimary2} alt="" />
                  <Body2 color="gray500">
                    당신의 프로젝트에 딱 맞는 AI Persona를 지금 확인해보세요
                  </Body2>
                  <Button Medium Outline Fill>
                    <Caption1 color="gray700">AI Persona 확인하기</Caption1>
                  </Button>
                </div>
              </PersonaStatusWrap>
            </DashBoardItem>

            <DashBoardItem>
              <div className="title">
                <H2 color="gray800" align="left">
                  Recent Tool Activities
                </H2>
                <Body3
                  color="gray700"
                  align="right"
                  style={{ marginLeft: "auto" }}
                >
                  최근 작업한 항목 중 5개를 보여드립니다.
                </Body3>
              </div>

              <RecentToolWrap>
                <Table>
                  <colgroup>
                    <col width="20%" />
                    <col />
                    <col width="20%" />
                    <col width="10%" />
                    <col width="10%" />
                  </colgroup>

                  <TableHeader Type1>
                    <tr>
                      <th>
                        <Body1 color="gray700" align="left">
                          리서치 툴 명
                        </Body1>
                      </th>
                      <th>
                        <Body1 color="gray700" align="left">
                          상세 내용
                        </Body1>
                      </th>
                      <th>
                        <Body1 color="gray700" align="left">
                          현황
                        </Body1>
                      </th>
                      <th>
                        <Body1 color="gray700" align="left">
                          진행 일시
                        </Body1>
                      </th>
                      <th>
                        <Body1 color="gray700" align="left">
                          상세보기
                        </Body1>
                      </th>
                    </tr>
                  </TableHeader>

                  <TableBody Type1>
                    <tr>
                      <td>
                        <Body2 color="gray700" align="left">
                          고객 탐색기
                        </Body2>
                      </td>
                      <td>
                        <Body2 color="gray700" align="left">
                          총 8명의 페르소나 시나리오 분석{" "}
                        </Body2>
                      </td>
                      <td>
                        <Body2 color="gray700" align="left">
                          완료
                        </Body2>
                      </td>
                      <td>
                        <Body2 color="gray700" align="left">
                          25.02.19
                        </Body2>
                      </td>
                      <td>
                        <Button Medium Outline Fill>
                          <InputText color="gray700">자세히 보기</InputText>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Body2 color="gray700" align="left">
                          인터뷰
                        </Body2>
                      </td>
                      <td>
                        <Body2 color="gray700" align="left">
                          1명의 페르소나와 “소비자 가치 분석” 인터뷰{" "}
                        </Body2>
                      </td>
                      <td>
                        <Body2 color="gray700" align="left">
                          완료
                        </Body2>
                      </td>
                      <td>
                        <Body2 color="gray700" align="left">
                          25.02.19
                        </Body2>
                      </td>
                      <td>
                        <Button Medium Outline Fill>
                          <InputText color="gray700">자세히 보기</InputText>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Body2 color="gray700" align="left">
                          인터뷰
                        </Body2>
                      </td>
                      <td>
                        <Body2 color="gray700" align="left">
                          1명의 페르소나와 “소비자 가치 분석” 인터뷰{" "}
                        </Body2>
                      </td>
                      <td>
                        <Body2 color="gray700" align="left">
                          완료
                        </Body2>
                      </td>
                      <td>
                        <Body2 color="gray700" align="left">
                          25.02.19
                        </Body2>
                      </td>
                      <td>
                        <Button Medium Outline Fill>
                          <InputText color="gray700">자세히 보기</InputText>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Body2 color="gray700" align="left">
                          고객 탐색기
                        </Body2>
                      </td>
                      <td>
                        <Body2 color="gray700" align="left">
                          총 8명의 페르소나 시나리오 분석{" "}
                        </Body2>
                      </td>
                      <td>
                        <Body2 color="gray700" align="left">
                          완료
                        </Body2>
                      </td>
                      <td>
                        <Body2 color="gray700" align="left">
                          25.02.19
                        </Body2>
                      </td>
                      <td>
                        <Button Medium Outline Fill>
                          <InputText color="gray700">자세히 보기</InputText>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Body2 color="gray700" align="left">
                          고객 탐색기
                        </Body2>
                      </td>
                      <td>
                        <Body2 color="gray700" align="left">
                          총 8명의 페르소나 시나리오 분석{" "}
                        </Body2>
                      </td>
                      <td>
                        <Body2 color="gray700" align="left">
                          완료
                        </Body2>
                      </td>
                      <td>
                        <Body2 color="gray700" align="left">
                          25.02.19
                        </Body2>
                      </td>
                      <td>
                        <Button Medium Outline Fill>
                          <InputText color="gray700">자세히 보기</InputText>
                        </Button>
                      </td>
                    </tr>
                  </TableBody>
                </Table>
              </RecentToolWrap>

              <RecentToolWrap NoData>
                <div>
                  <img src={images.Tools} alt="" />
                  <Body2 color="gray500">
                    AI 기반 리서치, 어디까지 해보셨나요? 다양한 리서치 툴을 지금
                    사용해보세요
                    <br />
                    (AI Persona 확인 후 리서치 툴을 사용하면 더 효과적입니다)
                  </Body2>
                  <Button Medium Outline Fill>
                    <Caption1 color="gray700">리서치 툴 바로가기</Caption1>
                  </Button>
                </div>
              </RecentToolWrap>
            </DashBoardItem>
          </DashBoardWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PageDashBoard;

const DashBoardWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 64px;
  margin: 50px auto;
`;

const DashBoardItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .title {
    display: flex;
    align-items: center;
    gap: 12px;

    button {
      margin-left: auto;
    }
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 24px;
  border-radius: 15px;
  border: 1px solid ${palette.outlineGray};
  background: ${palette.white};
`;

const CardTitle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const TagWrap = styled.div`
  display: flex;
  gap: 8px;
`;

const CardContent = styled.div`
  color: ${palette.gray800};
  text-align: left;

  p + p {
    margin-top: 20px;
  }
`;

const TooltipButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${palette.chatGray};
  cursor: pointer;
  z-index: 1;

  &:before {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    font-size: 0.63rem;
    color: ${palette.gray500};
    border: 1px solid ${palette.gray500};
    content: "!";
  }
`;

const TooltipContent = styled.div`
  position: absolute;
  top: -25px;
  right: -300px;
  width: 290px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  padding: 20px 20px 32px;
  border-radius: 15px;
  background: ${palette.white};
  filter: drop-shadow(0px 4px 30px rgba(0, 0, 0, 0.15));
  animation: fadeIn 0.3s ease-in-out;
  cursor: default;
  z-index: 100;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:before {
    position: absolute;
    top: 30px;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid ${palette.white};
    content: "";
  }
`;

const TooltipHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 300;
  color: ${palette.gray800};
  line-height: 1.5;
  width: 100%;

  span {
    position: relative;
    width: 16px;
    height: 16px;
    display: block;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 16px;
      display: block;
      border-radius: 5px;
      background: ${palette.gray700};
      content: "";
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`;

const TooltipBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    width: 100%;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 12px;

    &:before {
      width: 5px;
      height: 18px;
      border-radius: 1px;
      content: "";
    }

    &.start:before {
      background: ${palette.outlineGray};
    }

    &.ing:before {
      background: #32ade6;
    }

    &.complete:before {
      background: ${palette.primary};
    }
  }

  p {
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${palette.gray700};
    text-align: left;
  }
`;

const PersonaStatusWrap = styled.div`
  display: flex;
  gap: 24px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 24px;
    // max-width: calc(100% / 3);
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  ${(props) =>
    props.NoData &&
    `
    > div {
      align-items: center;
      gap: 8px;
      padding: 44px 24px;

      button {
        margin-top: 4px;
      }
    }
  `}
`;

const RecentToolWrap = styled(PersonaStatusWrap)`
  ${(props) =>
    props.NoData &&
    `
    > div {
      padding: 130px 0 175px;
    }
  `}
`;

const UlInfo = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  li {
    display: flex;
    align-items: center;
    gap: 12px;

    div:last-child {
      margin-left: auto;
    }

    + li {
      padding-top: 6px;
      border-top: 1px solid ${palette.outlineGray};
    }

    &:before {
      width: 5px;
      height: 18px;
      border-radius: 1px;
      content: "";
    }

    &.start:before {
      background: ${palette.outlineGray};
    }

    &.ing:before {
      background: #32ade6;
    }

    &.complete:before {
      background: ${palette.primary};
    }
  }
`;
