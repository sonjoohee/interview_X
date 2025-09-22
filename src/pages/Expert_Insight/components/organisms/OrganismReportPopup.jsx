import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import ReactDOM from "react-dom";
import { useAtom } from "jotai";
import * as THREE from "three";

import images from "../../../../assets/styles/Images";
import panelimages from "../../../../assets/styles/PanelImages";
import MoleculeReportController from "../molecules/MoleculeReportController";
import { SELECTED_TAB_COPY } from "../../../AtomStates";

const OrganismReportPopup = ({ report, onClose }) => {
  // const canvasRef = useRef(null);

  // useEffect(() => {
  //   if (canvasRef.current) {
  //     // Scene and camera setup
  //     const scene = new THREE.Scene();
  //     const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  //     const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
  //     renderer.setSize(400, 400);

  //     // Create shoe body (upper part of the shoe)
  //     const upperGeometry = new THREE.BoxGeometry(1, 0.5, 2); // Shoe body shape
  //     const upperMaterial = new THREE.MeshBasicMaterial({ color: 0x999999 });
  //     const shoeUpper = new THREE.Mesh(upperGeometry, upperMaterial);
  //     scene.add(shoeUpper);

  //     // Add mesh for breathability (simulate a mesh-like texture)
  //     const meshGeometry = new THREE.BoxGeometry(1.1, 0.1, 1.8);
  //     const meshMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  //     const meshPart = new THREE.Mesh(meshGeometry, meshMaterial);
  //     meshPart.position.set(0, 0.25, 0);
  //     scene.add(meshPart);

  //     // Create shoe sole (bottom part for grip and support)
  //     const soleGeometry = new THREE.BoxGeometry(1.2, 0.2, 2.1);
  //     const soleMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
  //     const shoeSole = new THREE.Mesh(soleGeometry, soleMaterial);
  //     shoeSole.position.set(0, -0.35, 0);
  //     scene.add(shoeSole);

  //     // Add grip patterns (simple cylinders to simulate tread)
  //     const gripGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 32);
  //     const gripMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  //     for (let i = -0.5; i <= 0.5; i += 0.25) {
  //       for (let j = -1; j <= 1; j += 0.5) {
  //         const grip = new THREE.Mesh(gripGeometry, gripMaterial);
  //         grip.position.set(i, -0.45, j);
  //         grip.rotation.x = Math.PI / 2;
  //         scene.add(grip);
  //       }
  //     }

  //     // Set camera position
  //     camera.position.z = 5;

  //     // Movement logic for the shoe (simulating a walking or running motion)
  //     let soleBendDirection = 1;
  //     const animate = () => {
  //       requestAnimationFrame(animate);

  //       // Rotate the entire shoe slightly for a realistic 3D view
  //       shoeUpper.rotation.y += 0.01;

  //       // Bending the sole slightly to simulate movement
  //       shoeSole.rotation.x += soleBendDirection * 0.005;
  //       if (shoeSole.rotation.x > 0.1 || shoeSole.rotation.x < -0.1) {
  //         soleBendDirection *= -1; // Reverse the direction for a back-and-forth bending effect
  //       }

  //       // Render the scene
  //       renderer.render(scene, camera);
  //     };

  //     animate();

  //     // Clean up the renderer when the component is unmounted
  //     return () => {
  //       renderer.dispose();
  //     };
  //   }
  // }, []);

  if (!report) return null;

  const reportIndex =
    report.reportIndex !== undefined
      ? report.reportIndex
      : report.type === "strategy"
      ? 1
      : 0;
  let reportTypeText;
  {
    reportIndex === 0 && (reportTypeText = "비즈니스 분석");
  }
  {
    reportIndex === 1 && (reportTypeText = "전문가 보고서");
  }
  {
    reportIndex === 2 && (reportTypeText = "추가 보고서");
  }
  {
    reportIndex === 3 && (reportTypeText = "사용자 질문 보고서");
  }
  {
    reportIndex === 4 && (reportTypeText = "추천 타겟 및 예상 인사이트");
  }
  {
    reportIndex === 5 && (reportTypeText = "페르소나별 아이디어 우선순위 선별");
  }
  {
    reportIndex === 6 && (reportTypeText = "마케팅 분석과 개선 솔루션 제안");
  }
  // {
  //   reportIndex === 7 && (reportTypeText = "가격 분석");
  // }
  {
    reportIndex === 8 && (reportTypeText = "사례 조사 보고서");
  }
  {
    reportIndex === 9 && (reportTypeText = "비즈니스 모델 캔버스");
  }
  {
    reportIndex === 10 && (reportTypeText = "맞춤형 조사 설계 보고서");
  }

  return ReactDOM.createPortal(
    <PopupOverlay onClick={onClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <div className="popup-title">
          <popupTitle>
            <popup-h1>{report.title}</popup-h1>
            <popup-p>
              <span>
                <img src={images.IconList} alt="" />
                {reportTypeText}
              </span>
              {/* <span>생성 : {report.date}</span> */}
              <span>
                <img src={images.IconSaveDate} alt="" />
                저장 : {report.date}
              </span>
            </popup-p>
          </popupTitle>

          {(reportIndex === 1 || reportIndex === 4 || reportIndex === 5 || reportIndex === 6 || reportIndex === 8 || reportIndex === 10) && (
            <ExpertThumb>
              <div className="thumb">
                {report.content.expert_id === "1" ? (
                  <img src={panelimages.expert_1} alt="" />
                ) : report.content.expert_id === "2" ? (
                  <img src={panelimages.expert_2} alt="" />
                ) : report.content.expert_id === "3" ? (
                  <img src={panelimages.expert_3} alt="" />
                ) : report.content.expert_id === "4" ? (
                  <img src={panelimages.expert_4} alt="" />
                ) : reportIndex === 5 ? (
                  <img src={panelimages.expert_5} alt="" />
                ) : reportIndex === 6 ? (
                  <img src={panelimages.expert_6} alt="" />
                ) : reportIndex === 7 ?   (
                  <img src={panelimages.expert_7} alt="" />
                ) : reportIndex === 8 ? (
                  <img src={panelimages.expert_8} alt="" />
                ) : reportIndex === 9 ? (
                  <img src={panelimages.expert_9} alt="" />
                ) : (
                  <img src={panelimages.expert_10} alt="" />
                )}
              </div>
              {report.content.expert_id === "1" ? (
                <div className="cont">
                  <strong>제품 전략가</strong>
                  <p>김도원</p>
                </div>
              ) : report.content.expert_id === "2" ? (
                <div className="cont">
                  <strong>마케팅 구루</strong>
                  <p>이지현</p>
                </div>
              ) : report.content.expert_id === "3" ? (
                <div className="cont">
                  <strong>고객 분석 전문가</strong>
                  <p>박서연</p>
                </div>
              ) : report.content.expert_id === "4" ? (
                <div className="cont">
                  <strong>PoC 설계 전문가</strong>
                  <p>장석훈</p>
                </div>
              ) : reportIndex === 5 ? (
                <div className="cont">
                  <strong>아이디어 디벨로퍼</strong>
                  <p>윤재민</p>
                </div>
              ) : reportIndex === 6 ? (
                <div className="cont">
                  <strong>그로스 해커</strong>
                  <p>김세준</p>
                </div>
              ) : reportIndex === 7 ? (
                <div className="cont">
                  <strong>가격 분석 전문가</strong>
                  <p>한준혁</p>
                </div>
              ) : reportIndex === 8 ? (
                <div className="cont">
                  <strong>사례 분석 전문가</strong>
                  <p>이민호</p>
                </div>
              ) : reportIndex === 9 ? (
                <div className="cont">
                  <strong>BM 전문가</strong>
                  <p>김소윤</p>
                </div>
              ) : reportIndex === 10 ? (
                <div className="cont">
                  <strong>조사 설계 전문가</strong>
                  <p>김현우</p>
                </div>
              ) : null}
            </ExpertThumb>
          )}
        </div>

        {reportIndex === 0 && <BizAnalysisSection report={report} />}

        {reportIndex === 1 && <StrategyReportSection report={report} />}

        {reportIndex === 2 && <AdditionalReportSection report={report} />}

        {reportIndex === 3 && <AdditionalReportSection report={report} />}
        {/* reportindex의 경우 사용하는 css가 동일하여 2로 같게 처리하였음 */}
        {reportIndex === 4 && <RecommendedTargetReportSection report={report} />}

        {reportIndex === 5 && <IdeaPriorityReportSection report={report} />}

        {reportIndex === 6 && <GrowthHackerReportSection report={report} />}

        {reportIndex === 8 && <CaseReportSection report={report} />}

        {reportIndex === 10 && <SurveyDesignReportSection report={report} />}

        <CloseButton onClick={onClose}>닫기</CloseButton>
      </PopupContent>
    </PopupOverlay>,
    document.body // 팝업을 document.body 아래에 렌더링
  );
};

export default OrganismReportPopup;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const PopupContent = styled.div`
  position: relative;
  max-width: 1200px;
  width: 100%;
  max-height: 80%;
  display: flex;
  flex-direction: column;
  gap: 44px;
  text-align: left;
  padding: 32px;
  border-radius: 15px;
  background: ${palette.white};
  z-index: 10001;

  .popup-title {
    display: flex;
    // flex-direction: column;
    gap: 12px;
    justify-content: space-between;
    padding: 16px 20px;
    border-radius: 15px;
    border: 1px solid ${palette.lineGray};
    background: ${palette.white};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }

  popupTitle {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  popup-h1 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  popup-p {
    font-size: 0.75rem;
    color: ${palette.gray};
    display: flex;
    align-items: center;
    gap: 20px;

    span {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }
`;

const ExpertThumb = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background: ${palette.chatGray};

  .thumb {
    position: relative;
    width: 32px;
    height: 32px;
    border-radius: 100%;
    overflow: hidden;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .cont {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.75rem;

    strong {
      font-weight: 400;
    }

    p {
      color: ${palette.lightGray};
    }
  }
`;

const SectionTitle = styled.h2`
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const List = styled.ul`
  // padding-left: 20px;
  // margin-bottom: 20px;
`;

const ListItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  padding-left: 10px;

  &:before {
    position: absolute;
    left: 0;
    top: 10px;
    width: 5px;
    height: 1px;
    background: ${palette.darkGray};
    content: "";
  }

  p {
    font-size: 0.875rem;
    color: ${palette.darkGray};
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    // -webkit-line-clamp:3;
    // -webkit-box-orient:vertical;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 0;
  top: -40px;
  font-family: "Pretendard";
  font-size: 1rem;
  color: ${palette.white};
  padding: 5px 26px 5px 0;
  border: 0;
  outline: none;
  background: none;
  cursor: pointer;

  &:before,
  &:after {
    position: absolute;
    top: 50%;
    right: 6px;
    width: 2px;
    height: 18px;
    border-radius: 5px;
    background: ${palette.white};
    content: "";
  }

  &:before {
    transform: translateY(-50%) rotate(45deg);
  }

  &:after {
    transform: translateY(-50%) rotate(-45deg);
  }
`;

const BoxWrap = styled.div`
  padding: ${(props) =>
    props.title === "특징" || props.title === "차별화 요소"
      ? "0"
      : props.isLast
      ? "0"
      : "20px"};

  border-radius: 10px;
  background: ${(props) =>
    props.title === "특징" || props.title === "차별화 요소"
      ? palette.white
      : props.isLast
      ? palette.white
      : palette.chatGray};

  + div {
    margin-top: 12px;
  }

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    color: ${(props) =>
      props.expertIndex === "1"
        ? palette.darkGray // 1번 전문가일 때 글자색 파란색
        : props.expertIndex === "2"
        ? palette.darkGray // 2번 전문가일 때 글자색 빨간색
        : palette.darkGray}; // 3번 전문가일 때 글자색 녹색
  }

  p {
    font-size: 0.875rem;
    color: ${(props) =>
      props.expertIndex === "1"
        ? palette.darkGray
        : props.expertIndex === "2"
        ? palette.darkGray
        : palette.darkGray};
    line-height: 1.5;
  }

  .dashedLine {
    position: relative;
    padding-left: 12px;

    &:before {
      position: absolute;
      left: 0;
      top: 10px;
      width: 5px;
      height: 1px;
      background: ${palette.darkGray};
      content: "";
    }
  }

  /* 마지막 섹션일 경우 title을 숨기고, 내부 텍스트만 보이도록 */
  ${(props) =>
    props.isLast &&
    `
    strong {
      display: none;
    }
  `}
`;

const BizAnalysisSection = ({ report }) => {
  const mainFeatures = report.content.mainFeatures || [];
  const mainCharacter = report.content.mainCharacter || [];
  const mainCustomer = report.content.mainCustomer || [];

  return (
    <>
      <ContentsWrap>
        <h1>{report.title}</h1>
        <BoxWrap>
          <SectionTitle>
            <img src={images.StarChack} alt="" />
            주요 특징
          </SectionTitle>
          <List>
            {mainFeatures?.map((feature, index) => (
              <ListItem key={index}>
                <p>{feature}</p>
              </ListItem>
            ))}
          </List>
        </BoxWrap>
        <BoxWrap>
          <SectionTitle>
            <img src={images.IconSetting} alt="" />
            주요 기능
          </SectionTitle>
          <List>
            {mainCharacter?.map((func, index) => (
              <ListItem key={index}>
                <p>{func}</p>
              </ListItem>
            ))}
          </List>
        </BoxWrap>
        {/* {mainCustomer.length !== 0 &&
          <BoxWrap>
            <SectionTitle>
              <img src={images.IconTarget} alt="" />
              목표 고객
            </SectionTitle>
            <List>
              {mainCustomer?.map((customer, index) => (
                <ListItem key={index}>
                  <p>{customer}</p>
                </ListItem>
              ))}
            </List>
          </BoxWrap>
        } */}
        <MoleculeReportController
          reportIndex={0}
          report={report}
        />
      </ContentsWrap>
    </>
  );
};

const StrategyReportSection = ({ report }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const expertIndex = report.content.expert_id;
  // 탭 제목과 섹션 데이터를 report에서 가져옵니다.
  const tabs = report.content.tabs || [];
  const sections = tabs[selectedTab]?.sections || [];
  const [selectedTabCopy, setSelectedTabCopy] = useAtom(SELECTED_TAB_COPY);

  const handleTabClick = (index) => {
    setSelectedTab(index);
    const expertId = report.content.expert_id;
    setSelectedTabCopy((prevState) => ({
      ...prevState,
      [expertId]: index,
    }));
  };

  return (
    <>
      <AnalysisSection Strategy>
        <TabHeader>
          {tabs &&
            tabs.length > 0 &&
            tabs?.map((tab, index) => (
              <TabButton
                key={index}
                active={selectedTab === index}
                expertIndex={expertIndex} // 전달
                onClick={() => handleTabClick(index)}
              >
                {/* {tab.title} */}
                {expertIndex === "4"
                  ? `${report.content.business_info} : PoC 설계 요약 보고서`
                  : tab.title}
              </TabButton>
            ))}
        </TabHeader>

        {sections?.map((section, index) => (
          <Section
            key={index}
            title={section.title}
            title_text={section.text}
            content={section.content}
            isLast={index === sections.length - 1}
            expertIndex={expertIndex}
            selectedTab={selectedTab}
          />
        ))}
        <MoleculeReportController
          reportIndex={1}
          report={report}
        />
      </AnalysisSection>
    </>
  );
};

// 스타일 컴포넌트들
const ContentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  // gap: 12px;
  padding: 28px;
  border-radius: 15px;
  border: 1px solid ${palette.lineGray};
  overflow-y: auto;

  h1 {
    font-family: Pretendard, Poppins;
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 8px;
  }
`;

const TabHeader = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  font-family: Pretendard, Poppins;
  font-size: 1.25rem;
  font-weight: ${(props) => (props.active ? "500" : "400")};
  color: ${(props) => (props.active ? `${palette.black}` : "rgba(0,0,0,.2)")};
  border: none;
  outline: none;
  border-bottom: ${(props) =>
    props.active ? `1px solid ${palette.black}` : "none"};
  background: ${palette.white};
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    color: ${palette.black};
  }
`;

const SubTitle = styled.strong`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${palette.lightGray} !important;
  margin-bottom: 10px;
`;

const SubTextBox = styled.div`
  background: white;
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 0.85rem;
  color: #666;
`;

const AdditionalReportSection = ({ report }) => {
  // sections 데이터를 report에서 가져옴
  const sections = report.content.sections || [];

  return (
    <AnalysisSection>
      {/* 보고서의 제목과 첫 번째 섹션의 첫 번째 콘텐츠 표시 */}
      {report.title && (
        <TabHeader>
          <TabTitle>{report.title}</TabTitle>
        </TabHeader>
      )}

      {sections?.map((section, index) => (
        <AdditionalSection
          key={index}
          title={section.title}
          content={section.content}
          index={index - 1}
        />
      ))}
      <MoleculeReportController
        reportIndex={2}
        report={report}
      />
    </AnalysisSection>
  );
};

const AdditionalSection = ({ title, content, index }) => {
  // 서브 타이틀이 있는 항목과 없는 항목을 분리
  const subTitleItems = content.filter((item) => item.subTitle);
  const nonSubTitleItems = content.filter((item) => !item.subTitle);

  // subText에서 ':'로 분리하여 subTitle과 text를 따로 처리
  const splitText = (text) => {
    const [subTitle, ...rest] = text.split(":");
    return {
      subTitle: subTitle.trim(), // ':' 앞부분
      text: rest.join(":").trim(), // ':' 뒷부분
    };
  };

  return (
    <AdditionalBoxWrap title={title} isPurpose={title === "목적"}>
      {" "}
      {/* 타이틀이 "목적"인지 확인 */}
      {title && title !== "목적" && (
        <strong>
          {/* 번호 표시 */}
          {index + 1}. {title}
        </strong>
      )}
      {/* nonSubTitleItems는 일반적으로 title과 text만 표시 */}
      {nonSubTitleItems.length > 0 &&
        nonSubTitleItems?.map((item, index) => (
          <div key={index}>
            <p style={{ marginBottom: "10px" }}>{item.text}</p>
            {item.subtext && <SubTextBox>{item.subtext}</SubTextBox>}
          </div>
        ))}
      {/* subTitleItems는 DynamicGrid 스타일을 적용 */}
      <>
        {subTitleItems.map((item, index) => (
          <AdditionalSeparateSection key={index}>
            <strong>
              {/* <strong_title>{`${item.subTitle}`}</strong_title> */}{" "}
              {/* 차후 추가할수도 있음*/}
            </strong>
            <p>
              {item.subTitle} : {item.text}
            </p>

            {/* subText1, subText2, subText3를 한 줄씩 표시 */}
            <div>
              {item.subText1 && (
                <p>
                  {item.subTitle}: {splitText(item.subText1).text}
                </p>
              )}
              {item.subText2 && (
                <p>
                  {item.subTitle}: {splitText(item.subText2).text}
                </p>
              )}
              {item.subText3 && (
                <p>
                  {item.subTitle}: {splitText(item.subText3).text}
                </p>
              )}
            </div>
          </AdditionalSeparateSection>
        ))}
      </>
    </AdditionalBoxWrap>
  );
};

// Section 컴포넌트 - 각 섹션의 제목과 콘텐츠를 표시
const Section = ({
  title,
  title_text,
  content,
  isLast,
  expertIndex,
  selectedTab,
}) => {
  // 서브 타이틀이 있는 항목과 없는 항목을 분리
  const subTitleItems = content.filter((item) => item.subTitle);
  const nonSubTitleItems = content.filter((item) => !item.subTitle);
  const summaryItem = content.find((item) => item.title === "총평");
  const subItems = content.filter((item) => item.subTitle);
  // subText에서 ':'로 분리하여 subTitle과 text를 따로 처리
  const splitText = (text) => {
    const [subTitle, ...rest] = text.split(":");
    return {
      subTitle: subTitle.trim(), // ':' 앞부분
      text: rest.join(":").trim(), // ':' 뒷부분
    };
  };

  // 기존 subTitle과 text를 합쳐 새로운 text 생성

  return (
    <BoxWrap
      expertIndex={expertIndex}
      isLast={isLast}
      selectedTab={selectedTab}
      title={title}
    >
      {/* 4번 전문가 */}
      {expertIndex === "4" ? (
        <>
          {/* content 배열이 존재하는 경우 */}
          <p style={{ marginTop: "15px", marginBottom: "15px" }}>
            {title_text || ""}
          </p>
          {content &&
            content.length > 0 &&
            content.map((item, index) => (
              <SeparateSection key={index}>
                {/* 항목 번호 및 제목 */}
                <strong_title style={{ marginBottom: "15px" }}>
                  <span className="number">{index + 1}</span>{" "}
                  <strong_title>{`목표 : ${item.text}`}</strong_title>{" "}
                </strong_title>
                {/* 항목 내용 */}
                {/* <p style={{ marginTop: "15px", marginBottom: "15px" }}>{item.text}</p> */}

                {/* subContent가 존재하는 경우 */}
                {item.subContent && item.subContent.length > 0 && (
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "15px",
                      borderRadius: "10px",
                    }}
                  >
                    {[
                      "기대하는 유저 행동",
                      "목표 행위",
                      "검증 방법",
                      "핵심 검증 지표",
                      "검증 방법 실행에 필요한 기능",
                      "기술적 구현 수준",
                    ].map((title, subIndex) => (
                      <div key={subIndex} style={{ marginTop: "3px" }}>
                        <p
                          style={{
                            textIndent: "-1em",
                            paddingLeft: "1em",
                            marginBottom: "5px",
                          }}
                        >
                          {subIndex + 1}. {title} :{" "}
                          {item.subContent[subIndex]?.text || ""}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </SeparateSection>
            ))}
        </>
      ) : expertIndex === "3" && selectedTab === 1 ? (
        <>
          <strong>
            <img src={images.Check} alt="" />
            {title}
          </strong>

          {nonSubTitleItems.length > 0 &&
            nonSubTitleItems.map((item, index) => (
              <div key={index}>
                <p>{item.text}</p>
              </div>
            ))}

          {/* subTitleItems는 DynamicGrid 스타일을 적용 */}
          {subTitleItems.length > 0 &&
            subTitleItems.map((item, index) => (
              <div
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  marginTop: "15px",
                  borderRadius: "10px",
                }}
                key={index}
              >
                <SubTitle>{item.subTitle}</SubTitle>
                <p>{item.text}</p>
              </div>
            ))}
        </>
      ) : (
        <>
          {/* title 표시 (특정 타이틀 제외) */}
          {!isLast &&
            title &&
            !(
              title === "주요 차별화 요소" ||
              title === "차별화 전략 제안" ||
              title === "제안 사항" ||
              title === "경쟁 압박 대처 방안" ||
              title === "브랜드 전략분석" ||
              title === "브랜드 아이덴티티" ||
              title === "소비자 인식 관리 방안" ||
              title === "브랜드 신뢰도 구축 방안" ||
              title === "경쟁사 분석 및 차별화 전략" ||
              title === "고객 니즈 및 세분화 분석" ||
              title === "고객 여정 맵핑" ||
              title === "고객 여정 맵핑 터치포인트 단계 최적화 방안" ||
              title === "시장 위치 평가 및 경쟁자 분석" ||
              title === "장기적인 경쟁 우위 전략"
            ) && (
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>
            )}

          {title === "제안 사항" && (
            <>
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>
              {/* subTitle : text 형태로 넘버링 추가하여 출력 */}
              {content.map((item, index) => (
                <div key={index} style={{ marginTop: "3px" }}>
                  {" "}
                  {/* 각 요소에 마진 추가 */}
                  <p>
                    {index + 1}. {item.subTitle} : {item.text}
                  </p>
                </div>
              ))}
            </>
          )}

          {title === "브랜드 전략분석" && (
            <>
              {/* 제목과 총평 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {summaryItem && (
                <p style={{ marginBottom: "15px" }}>{summaryItem.text}</p> // 총평 텍스트를 제목 밑에 표시
              )}

              {/* subTitle : text 형태로 하얀 박스 안에 출력 */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {title === "브랜드 아이덴티티" && (
            <>
              {/* 제목과 총평 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {summaryItem && (
                <p style={{ marginBottom: "15px" }}>{summaryItem.text}</p> // 총평 텍스트를 제목 밑에 표시
              )}

              {/* subTitle : text 형태로 하얀 박스 안에 출력 */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {title === "경쟁사 분석 및 차별화 전략" && (
            <>
              {/* 제목과 총평 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {/* 총평 항목 필터링 */}
              {content
                .filter(
                  (item) => item.title === "경쟁사 분석 및 차별화 전략 설명"
                )
                .map((summaryItem, index) => (
                  <p key={index} style={{ marginBottom: "15px" }}>
                    {summaryItem.text} {/* 총평 텍스트를 제목 밑에 표시 */}
                  </p>
                ))}

              {/* subTitle : text 형태로 하얀 박스 안에 출력 */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {title === "고객 니즈 및 세분화 분석" && (
            <>
              {/* 제목과 총평 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {/* 총평 항목 필터링 */}
              {content
                .filter((item) => item.title === "고객 니즈 분석")
                .map((summaryItem, index) => (
                  <p key={index} style={{ marginBottom: "15px" }}>
                    {summaryItem.text} {/* 총평 텍스트를 제목 밑에 표시 */}
                  </p>
                ))}

              {/* subTitle : text 형태로 하얀 박스 안에 출력 */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {title === "고객 여정 맵핑" && (
            <>
              {/* 제목과 총평 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {/* 총평 항목 필터링 */}
              {content
                .filter((item) => item.title === "고객 여정 맵핑")
                .map((summaryItem, index) => (
                  <p key={index} style={{ marginBottom: "15px" }}>
                    {summaryItem.text} {/* 총평 텍스트를 제목 밑에 표시 */}
                  </p>
                ))}

              {/* subTitle : text 형태로 하얀 박스 안에 출력 */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {title === "브랜드 신뢰도 구축 방안" && (
            <>
              {/* 제목 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {/* subTitle : text 형태로 기본 박스 안에 출력 */}
              {/* <div style={{ padding: '15px', borderRadius: '10px' }}> */}
              <div>
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {title === "소비자 인식 관리 방안" && (
            <>
              {/* 제목 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {/* subTitle : text 형태로 기본 박스 안에 출력 */}
              {/* <div style={{ padding: '15px', borderRadius: '10px' }}> */}
              <div>
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* "시장 위치 평가 및 경쟁자 분석"일 때 별도의 처리 */}
          {title === "시장 위치 평가 및 경쟁자 분석" && (
            <>
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {nonSubTitleItems.length > 0 && <p>{nonSubTitleItems[0].text}</p>}

              <BgStyledSection>
                <div className="flexBox">
                  {subTitleItems.map((item, index) => (
                    <div className="bgWhite" key={index}>
                      <strong className="title">
                        {/* 번호 표시를 위한 span.number */}
                        <span className="number">{index + 1}</span>
                        {item.subTitle}
                      </strong>
                      <ul>
                        {item.subText1 && (
                          <li className="dashedLine">
                            {item.subText1.startsWith("강점:")
                              ? item.subText1
                              : `강점: ${item.subText1}`}
                          </li>
                        )}
                        {item.subText2 && (
                          <li className="dashedLine">
                            {item.subText2.startsWith("약점:")
                              ? item.subText2
                              : `약점: ${item.subText2}`}
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </BgStyledSection>
            </>
          )}

          {(title === "경쟁사 대비 차별화 전략" ||
            title === "시장 내 경쟁 우위 확보 방안" ||
            title === "주요 타겟층 특징" ||
            title === "콘텐츠 및 마케팅 전략") && (
            <>
              {title_text && <p>{title_text}</p>}
              <DoubleGrid columns={2} style={{ padding: "0" }}>
                {" "}
                {/* 2개의 컬럼을 생성하여 가로로 나열 */}
                {content.map((section, sectionIndex) => (
                  <SectionWrapper key={sectionIndex}>
                    {" "}
                    {/* 각 섹션을 감싸는 div */}
                    {/* section.title 출력 */}
                    <SubTitle>{section.title}</SubTitle>
                    {/* subContent를 하나의 DynamicGrid 안에서 출력 */}
                    {section.subContent.map((item, itemIndex) => (
                      <div key={itemIndex} style={{ marginBottom: "0" }}>
                        <p className="dashedLine">
                          {item.subTitle} : {item.text}
                        </p>
                      </div>
                    ))}
                  </SectionWrapper>
                ))}
              </DoubleGrid>
            </>
          )}

          {title === "고객 여정 맵핑 터치포인트 단계 최적화 방안" && (
            <BgStyledSection>
              <h4>
                <img src={images.Check} alt="" />
                {title}
              </h4>

              <div className="flexBox">
                {content.map((item, index) => (
                  <div className="bgWhite" key={index}>
                    <strong className="title">
                      {/* 번호 표시를 위한 span.number */}
                      <span className="number">{index + 1}</span>
                      {item.subTitle}
                    </strong>
                    <p>{item.text}</p> {/* text 필드에서 데이터 출력 */}
                  </div>
                ))}
              </div>
            </BgStyledSection>
          )}

          {/* "특징" 또는 "차별화 요소" 섹션을 처리 */}
          {(title === "특징" || title === "차별화 요소") &&
            subTitleItems.length > 0 && (
              <>
                {subTitleItems.map((item, index) => (
                  <SeparateSection key={index}>
                    <strong>
                      <span className="number">{index + 1}</span>{" "}
                      {/* 번호 추가 */}
                      <strong_title>{`${title} : ${item.subTitle}`}</strong_title>{" "}
                      {/* 이 부분만 bold 처리 */}
                    </strong>
                    <p>{item.text}</p>

                    {/* subContent가 존재하는 경우 */}
                    {item.subContent && item.subContent.length > 0 ? (
                      <NumDynamicGrid columns={2}>
                        {item.subContent[0] && (
                          <div>
                            <SubTitle>{item.subContent[0].subTitle}</SubTitle>
                            <p>{item.subContent[0].text}</p>
                          </div>
                        )}
                        {item.subContent[1] && (
                          <div>
                            <SubTitle>{item.subContent[1].subTitle}</SubTitle>
                            <p>{item.subContent[1].text}</p>
                          </div>
                        )}
                        {item.subContent[2] && (
                          <div>
                            <SubTitle>{item.subContent[2].subTitle}</SubTitle>
                            <p>{item.subContent[2].text}</p>
                          </div>
                        )}
                      </NumDynamicGrid>
                    ) : (
                      // subContent가 없을 경우 아래 섹션 적용
                      <NumDynamicGrid columns={2}>
                        {item.subText1 && (
                          <div>
                            <SubTitle>
                              {splitText(item.subText1).subTitle}
                            </SubTitle>
                            <p>{splitText(item.subText1).text}</p>
                          </div>
                        )}
                        {item.subText2 && (
                          <div>
                            <SubTitle>
                              {splitText(item.subText2).subTitle}
                            </SubTitle>
                            <p>{splitText(item.subText2).text}</p>
                          </div>
                        )}
                        {item.subText3 && (
                          <div>
                            <SubTitle>
                              {splitText(item.subText3).subTitle}
                            </SubTitle>
                            <p>{splitText(item.subText3).text}</p>
                          </div>
                        )}
                      </NumDynamicGrid>
                    )}
                  </SeparateSection>
                ))}
              </>
            )}

          {/* "특징", "차별화 요소", "경쟁 분석"이 아닌 경우 기존 방식대로 처리 */}
          {title !== "특징" &&
            title !== "차별화 요소" &&
            title !== "제안 사항" &&
            title !== "시장 위치 평가 및 경쟁자 분석" &&
            title !== "주요 차별화 요소" &&
            title !== "브랜드 전략분석" &&
            title !== "브랜드 아이덴티티" &&
            title !== "브랜드 신뢰도 구축 방안" &&
            title !== "소비자 인식 관리 방안" &&
            title !== "차별화 전략 제안" &&
            title !== "경쟁사 분석 및 차별화 전략" &&
            title !== "고객 니즈 및 세분화 분석" &&
            title !== "고객 여정 맵핑" &&
            title !== "고객 여정 맵핑 터치포인트 단계 최적화 방안" &&
            title !== "경쟁사 대비 차별화 전략" &&
            title !== "경쟁 압박 대처 방안" &&
            title !== "장기적인 경쟁 우위 전략" && (
              <>
                {/* nonSubTitleItems는 일반적으로 title과 text만 표시 */}
                {nonSubTitleItems.length > 0 &&
                  nonSubTitleItems.map((item, index) => (
                    <div key={index}>
                      <p>{item.text}</p>
                      {item.subText1 && (
                        <SubTextBox>{item.subText1}</SubTextBox>
                      )}
                      {item.subText2 && (
                        <SubTextBox>{item.subText2}</SubTextBox>
                      )}
                      {item.subText3 && (
                        <SubTextBox>{item.subText3}</SubTextBox>
                      )}
                    </div>
                  ))}

                {/* subTitleItems는 DynamicGrid 스타일을 적용 */}
                {subTitleItems.length > 0 && (
                  <DynamicGrid columns={subTitleItems.length}>
                    {subTitleItems.map((item, index) => (
                      <div key={index}>
                        <SubTitle>{item.subTitle}</SubTitle>
                        <p>{item.text}</p>
                        {item.subText1 && (
                          <SubTextBox>{item.subText1}</SubTextBox>
                        )}
                        {item.subText2 && (
                          <SubTextBox>{item.subText2}</SubTextBox>
                        )}
                        {item.subText3 && (
                          <SubTextBox>{item.subText3}</SubTextBox>
                        )}
                      </div>
                    ))}
                  </DynamicGrid>
                )}
              </>
            )}
        </>
      )}
    </BoxWrap>
  );
};

const DynamicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: 12px;
  margin-top: 10px;

  > div {
    padding: 12px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
  }

  p {
    height: 64px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    // -webkit-line-clamp:3;
    // -webkit-box-orient:vertical;
    overflow-y: auto;
  }
`;
const AnalysisSection = styled.div`
  position: relative;
  max-width: 1135px;
  width: 100%;
  text-align: left;
  // margin-top: 25px;
  padding: 28px;
  border-radius: 15px;
  border: 1px solid ${palette.outlineGray};
  max-height: 80vh; /* 최대 높이를 제한하여 스크롤이 작동하도록 설정 */
  overflow-y: auto; /* 스크롤 활성화 */

  h1 {
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 20px;
  }

  > p {
    font-size: 0.875rem;
    line-height: 1.5;
    margin-top: 15px;

    span {
      color: ${palette.red};
    }
  }
`;

const TabTitle = styled.div`
  font-family: "Pretendard";
  font-size: 1.25rem;
  font-weight: 500;
  color: ${palette.black};
  border: none;
  border-bottom: none;
  background: ${palette.white};
  margin-bottom: 10px;
`;

const BgStyledSection = styled.div`
  display: flex;
  flex-direction: column;
  // padding: 20px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0);

  h4 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  .flexBox {
    display: flex;
    gap: 12px;
    margin-top: 12px;

    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px; /* BgBox와 동일하게 설정 */
      padding: 12px; /* BgBox와 동일하게 설정 */
      border-radius: 10px;
      border: 1px solid ${palette.lineGray};
      background-color: ${palette.white}; /* 하얀 배경 */

      .number {
        width: 15px; /* 크기를 BgBox와 동일하게 맞춤 */
        height: 15px;
        font-size: 0.63rem;
        color: ${palette.blue};
        line-height: 15px;
        text-align: center;
        border: 1px solid ${palette.blue};
        background-color: ${palette.white}; /* 번호 배경색 */
      }

      .title {
        color: ${palette.black};
        font-weight: 700;
        margin-bottom: 8px;
        font-size: 0.875rem;
      }

      ul {
        display: flex;
        flex-direction: column;
        gap: 5px;

        li {
          font-size: 0.875rem;
          color: ${palette.darkGray};
          line-height: 1.5;
          padding-left: 13px;

          &:before {
            position: absolute;
            top: 8px;
            left: 0;
            width: 5px;
            height: 1px;
            background: ${palette.black};
            content: "";
          }
        }
      }
    }
  }

  .bgWhite {
    border: 0 !important;

    p {
      height: 64px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      // -webkit-line-clamp:3;
      // -webkit-box-orient:vertical;
      overflow-y: auto;
    }
  }
`;
const AdditionalSeparateSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0; /* 위아래 5px, 좌우 20px */
  border-radius: 10px;
  background: rgba(0, 0, 0, 0);

  h4 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  span.number {
    width: 15px;
    height: 15px;
    font-size: 0.63rem;
    color: ${palette.blue};
    line-height: 15px;
    text-align: center;
    border: 1px solid ${palette.blue};
  }

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
    font-size: 0.875rem;
    font-weight: 400;
    color: ${palette.darkGray};
  }

  strong_title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
    font-weight: 700;
    color: ${palette.darkGray};
  }

  p {
    position: relative;
    font-size: 0.875rem;
    font-weight: 400;
    color: ${palette.darkGray};
    line-height: 1.5;
    padding-left: 13px;
    margin-left: 8px;

    &:before {
      position: absolute;
      top: 8px;
      left: 0;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: ${palette.gray800};
      content: "";
    }
  }

  .flexBox {
    display: flex;
    gap: 12px;
    margin-top: 12px;

    > div {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid ${palette.lineGray};

      p {
        height: 64px;
        overflow: visible;
        // text-overflow: ellipsis;
        display: flex;
        // -webkit-line-clamp: 3;
        // -webkit-box-orient: vertical;
        overflow-y: auto;
      }
    }

    .bgWhite {
      margin-top: 0 !important;
    }
  }

  .bgWhite {
    padding: 15px !important;
    margin-top: 12px;
    border-radius: 10px;
    border: 1px solid ${palette.white} !important;
    background: ${palette.white};

    .title {
      color: ${palette.black};
      font-weight: 700;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 5px;

    li {
      position: relative;
      font-size: 0.875rem;
      color: ${palette.darkGray};
      line-height: 1.5;
      padding-left: 13px;

      &:before {
        position: absolute;
        top: 8px;
        left: 0;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: ${palette.gray800};
        content: "";
      }
    }
  }
`;

const SeparateSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  padding: 20px;
  border-radius: 10px;
  background: ${palette.chatGray};

  + div {
    margin-top: 12px;
  }

  h4 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  span.number {
    width: 15px;
    height: 15px;
    font-size: 0.63rem;
    color: ${palette.blue};
    line-height: 15px;
    text-align: center;
    border: 1px solid ${palette.blue};
  }

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 0;
    font-size: 0.875rem;
    font-weight: 400;
    color: ${palette.darkGray};
  }

  strong_title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
    font-weight: 700;
    color: ${palette.darkGray};
  }

  p {
    font-size: 0.875rem;
    font-weight: 400;
    color: ${palette.darkGray};
    line-height: 1.5;
  }

  .flexBox {
    display: flex;
    gap: 12px;
    margin-top: 12px;

    > div {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid ${palette.lineGray};

      p {
        height: 64px;
        overflow: visible;
        // text-overflow: ellipsis;
        display: flex;
        // -webkit-line-clamp: 3;
        // -webkit-box-orient: vertical;
        overflow-y: auto;
      }
    }

    .bgWhite {
      margin-top: 0 !important;
    }
  }

  .bgWhite {
    padding: 15px !important;
    margin-top: 12px;
    border-radius: 10px;
    border: 1px solid ${palette.white} !important;
    background: ${palette.white};

    .title {
      color: ${palette.black};
      font-weight: 700;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 5px;

    li {
      position: relative;
      font-size: 0.875rem;
      color: ${palette.darkGray};
      line-height: 1.5;
      padding-left: 13px;

      &:before {
        position: absolute;
        top: 8px;
        left: 0;
        width: 5px;
        height: 1px;
        background: ${palette.black};
        content: "";
      }
    }
  }
`;
const NumDynamicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.columns},
    1fr
  ); /* 동적 컬럼 수 설정 */
  gap: 10px;
  margin-top: 10px;

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
    position: relative; /* 번호 표시를 위한 상대적 위치 */

    /* 각 div 내에서 번호를 표시하는 span.number */
    span.number {
      width: 20px;
      height: 20px;
      font-size: 0.75rem;
      color: ${palette.blue};
      line-height: 20px;
      text-align: center;
      border: 1px solid ${palette.blue};
      position: absolute;
      top: -10px;
      left: -10px;
      background-color: ${palette.white}; /* 번호 배경색 */
      border-radius: 50%;
    }
  }

  strong {
    margin-bottom: 10px;
  }

  p {
    height: 64px;
    margin: 0;
    font-size: 0.875rem;
    font-weight: 400;
    color: ${palette.darkGray};
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    // -webkit-line-clamp:3;
    // -webkit-box-orient:vertical;
    overflow-y: auto;
  }
`;

const AdditionalBoxWrap = styled.div`
  padding: ${(props) => (props.isPurpose ? "0" : "20px")};
  background: ${(props) =>
    props.isPurpose ? palette.white : palette.chatGray}; /* 흰 배경 적용 */

  font-size: 0.875rem;
  color: ${palette.gray800};
  line-height: 1.5;
  // margin:8px auto 20px;

  &:nth-child(3) {
    border-radius: 10px 10px 0 0;
  }
  &:last-child {
    border-radius: 0 0 10px 10px;
  }
  &:nth-child(n + 3) {
    margin-top: 0;
  }

  + div {
    margin-top: 12px;
  }

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
  }

  // p {
  //   font-size: 0.875rem;
  //   margin-bottom: 10px;
  // }
`;

const DoubleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: 10px;
  margin-top: 10px;
  padding: 12px; /* 가장 큰 div에 padding 적용 */
  border-radius: 10px;

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    // gap: 4px;
    /* 각 개별 div에서는 border를 제거 */
  }

  p {
    margin: 0;
    /* 텍스트가 생략되지 않도록 아래 스타일을 제거 */
    overflow: visible; /* 숨기지 않도록 */
    text-overflow: unset; /* 생략하지 않음 */
    display: block; /* 줄바꿈을 정상적으로 처리 */
  }
`;
const SectionWrapper = styled.div`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${palette.lineGray}; /* 각 section에만 border 적용 */
  margin-bottom: 10px; /* 섹션 간 간격 추가 */

  div {
    margin-bottom: 8px; /* subContent 간의 간격 */
  }
`;
const RecommendedTargetReportSection = ({ report }) => {
  return (
    <AnalysisSection>
      <TabHeader>
        <h1 active={true} style={{ marginBottom: "0" }}>
          PoC 목적별 추천 타겟 및 예상 인사이트
        </h1>
      </TabHeader>

      {report && report.content && report.content.poc_persona && (
        <>
          {report.content.poc_persona.map((item, index) => {
            const persona = item[0]["추천 가상 페르소나"];
            const insight = item[1]["이유 및 예상 인사이트"];
            const goalActionText = item.goalActionText;
            return (
              <SeparateSection key={index}>
                <strong>
                  <span className="number">{index + 1}</span>
                  <strong_title>{`${goalActionText}`}</strong_title>
                </strong>
                <div className="bgWhite">
                  <p
                    style={{
                      textIndent: "-1em",
                      paddingLeft: "1em",
                      marginBottom: "5px",
                    }}
                  >
                    1. 추천 페르소나 : {persona}
                  </p>
                  <p
                    style={{
                      textIndent: "-1em",
                      paddingLeft: "1em",
                      marginTop: "5px",
                    }}
                  >
                    2. 이유 및 예상 인사이트 : {insight}
                  </p>
                </div>
              </SeparateSection>
            );
          })}
        </>
      )}
      <MoleculeReportController
        reportIndex={4}
        report={report}
      />
    </AnalysisSection>
  );
};

const IdeaPriorityReportSection = ({ report }) => {
  return (
  <Wrap>
  <h1>페르소나별 아이디어 우선순위 선별</h1>

  {report.content.map((persona, index) => (
    <SeparateSection2 key={index}>
      <h3>
        <span className="number">{index + 1}</span>
      페르소나 : {persona.title}
    </h3>
    <p>{persona.content[0].text}</p>
    <div>
      <ol className="list-decimal">
        {persona.content.map((contentItem, index) => (
          contentItem.subTitle && (
            <li key={index}>{contentItem.subTitle} : {contentItem.text}</li>
          )
        ))}
      </ol>
    </div>
    </SeparateSection2>
  ))}

  <MoleculeReportController
    reportIndex={5}
    report={report}
  />
  </Wrap>
  )
}

const Wrap = styled.div`
  max-width:986px;
  width:100%;
  display:flex;
  flex-direction:column;
  padding: 28px;
  margin:24px 0 0 50px;
  border-radius:15px;
  border:1px solid ${palette.lineGray};
  overflow-y: auto;

  h1 {
    font-size:1.25rem;
    font-weight:400;
    text-align:left;
    margin-bottom:20px;
  }

  p {
    font-size:0.88rem;
    font-weight:300;
    color:${palette.black};
    text-align:left;
    margin-bottom:10px;
  }
`;

const SeparateSection2 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap:12px;
  margin-top: 12px;
  padding: 20px;
  border-radius: 10px;
  background: ${palette.chatGray};

  h3 {
    display:flex;
    align-items:center;
    gap:12px;
    font-size:1rem;
    font-weight:700;

    span {
      width: 15px;
      height: 15px;
      font-size: 0.63rem;
      color: ${palette.primary};
      line-height: 15px;
      text-align: center;
      border: 1px solid ${palette.primary};
    }
  }

  p {
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray700};
    line-height:1.4;
    text-align:left;
  }

  div {
    padding:16px;
    border-radius:10px;
    background:${palette.white};
  }

  .list-decimal li {
    list-style-type:decimal;
    list-style-position:inside;
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray800};
    line-height:1.5;
    text-align:left;
  }
`;

const GrowthHackerReportSection = ({ report }) => {
  return (
    <Wrap>
      <h1>마케팅 분석과 개선 솔루션 제안</h1>
      <p>{report.content[0].content[0].text} {report.content[0].content[1].text}</p>
      {report.content[1].content.map((item, index) => (
        <SeparateSection3 key={index}>
          <h3>
            <span className="number">{index + 1}</span>
            {item.title}
          </h3>
          <p>{item.text}</p>
          <div>
          <ol className="list-disc">
            {item.subcontent.map((subItem, subIndex) => (
              <li key={subIndex}>
                {subItem.subTitle} : {subItem.text}
              </li>
            ))}
          </ol>
          </div>
        </SeparateSection3>
      ))
      }
      <MoleculeReportController
        reportIndex={6}
        report={report}
      />
    </Wrap>
  );
};

const SeparateSection3 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap:12px;
  margin-top: 12px;
  padding: 20px;
  border-radius: 10px;
  background: ${palette.chatGray};

  h3 {
    display:flex;
    align-items:center;
    gap:12px;
    font-size:1rem;
    font-weight:700;

    span {
      width: 15px;
      height: 15px;
      font-size: 0.63rem;
      color: ${palette.primary};
      line-height: 15px;
      text-align: center;
      border: 1px solid ${palette.primary};
    }
  }

  p {
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray800};
    text-align:left;
  }

  div {
    padding:16px;
    border-radius:10px;
    background:${palette.white};
  }

  .list-disc li {
    list-style-type:disc;
    list-style-position:inside;
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray800};
    line-height:1.5;
    text-align:left;
  }
`;

const CaseReportSection = ({ report }) => {
  return (
    <Wrap2>
          <h1>성공적인 기술 혁신 사례 조사 보고서</h1>
          <p>{report.content?.[0]?.text}</p>
          {report.content?.[1]?.content?.map((report, index) => (
            <SeparateSection2 key={index}>
              <h3>
                <span className="number">{index + 1}</span>
                {report.title}
              </h3>
              <p>{report.text}</p>
              <div>
              <ol className="list-decimal">
                {report.subcontent?.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    {subItem.subTitle} : {subItem.text}
                  </li>
                ))}
              </ol>
              </div>
            </SeparateSection2>
          ))
        }
        <p className="conclusion">{report.content?.[2]?.text}</p>

        <MoleculeReportController
          reportIndex={8}
          report={report}
          />
    </Wrap2>
  );
};

const Wrap2 = styled.div`
  max-width:986px;
  width:100%;
  display:flex;
  flex-direction:column;
  padding: 28px;
  margin:24px 0 0 50px;
  border-radius:15px;
  border:1px solid ${palette.lineGray};
  overflow-y: auto;

  h1 {
    font-size:1.25rem;
    font-weight:400;
    text-align:left;
    margin-bottom:20px;
  }

  p {
    font-size:0.88rem;
    font-weight:300;
    color:${palette.black};
    text-align:left;
    margin-bottom:10px;
  }

  .conclusion {
    margin-top: 20px;
  }
`;

const SurveyDesignReportSection = ({ report }) => {
  return (
    <Wrap>
    <h1>맞춤형 조사 설계 보고서</h1>
      <SeparateSection4>
        <strong_title>
          <span className="number">1</span>
          {report.content.method_1.title}
          {/* <DownloadButton
            className={`download-button`}
            ref={buttonRef}
            onClick={(event) => handleOpenModal(0, event)}
            disabled={loading}
            isModalOpen={isModalOpen[0]}
          >
            {loading ? downloadStatus : "다운로드"}
          </DownloadButton> */}
        </strong_title>
        <content>
        <ol className="list-disc">
            <li key="1">
              조사 목표: {report.content.method_1.survey_goal}
            </li>
            <li key="2">
              대상 및 채널: {report.content.method_1.survey_target.target_person}, {report.content.method_1.channels_and_collection_methods.channels}
            </li>
            <li key="3">
              데이터 수집 및 분석: {report.content.method_1.channels_and_collection_methods.collection_methods}
            </li>
        </ol>
        </content>
        {/* {isModalOpen[0] && (
            <DownloadPopup
              ref={popupRef}
              isAutoSaveToggle={false}
              style={{ top: popupPosition.top, left: popupPosition.left }}
            >
              <span className="close" onClick={(event) => handleOpenModal(0, event)}></span>
              <div>
                <h3>설문조사 상세 설계 다운로드</h3>
                <SelectBoxWrap>
                  <label>포맷 선택 (택1)</label>
                  <SelectBox>
                    <div
                      className={`${
                        selectedFormat === "Word" ? "selected" : ""
                      }`}
                      onClick={() => handleFormatChange("Word")}
                    >
                      {selectedFormat === "Word" ? (
                        <img src={images.ImgWord2} alt="" />
                      ) : (
                        <img src={images.ImgWord} alt="" />
                      )}
                      Word
                  </SelectBox>
                </SelectBoxWrap>
                <SelectBoxWrap>
                  <label>언어 선택 (택1)</label>
                  <SelectBox>
                    <div
                      className={`${
                        selectedLanguage === "한글" ? "selected" : ""
                      }`}
                      onClick={() => handleLanguageChange("한글")}
                    >
                      {selectedLanguage === "한글" ? (
                        <img src={images.ImgKOR2} alt="" />
                      ) : (
                        <img src={images.ImgKOR} alt="" />
                      )}
                      한국어
                    </div>
                    <div
                      className={`${
                        selectedLanguage === "영문" ? "selected" : ""
                      } disabled`}
                      onClick={() => handleLanguageChange("영문")}
                    >
                      {selectedLanguage === "영문" ? (
                        <img src={images.ImgENG2} alt="" />
                      ) : (
                        <img src={images.ImgENG} alt="" />
                      )}
                      영문(준비 중)
                    </div>
                  </SelectBox>
                </SelectBoxWrap>
                <div>
                  <button
                    onClick={() => handleDownloadClick(0)}
                    disabled={loading || !selectedLanguage}
                  >
                    {loading
                      ? downloadStatus
                      : selectedLanguage
                      ? "다운로드"
                      : "언어를 선택해주세요"}
                  </button>
                </div>
              </div>
            </DownloadPopup>
          )} */}
      </SeparateSection4>
      <SeparateSection4>
      <strong_title>
          <span className="number">2</span>
          {report.content.method_2.title}
          {/* <DownloadButton
            className={`download-button`}
            ref={buttonRef}
            onClick={(event) => handleOpenModal(1, event)}
            disabled={loading}
            isModalOpen={isModalOpen[1]}
          >
            {loading ? downloadStatus : "다운로드"}
          </DownloadButton> */}
        </strong_title>
        <content>
        <ol className="list-disc">
            <li key="1">
              조사 목표: {report.content.method_2.survey_goal}
            </li>
            <li key="2">
              대상 및 채널: {report.content.method_2.survey_target.target_person}, {report.content.method_2.channels_and_collection_methods.channels}
            </li>
            <li key="3">
              데이터 수집 및 분석: {report.content.method_2.channels_and_collection_methods.collection_methods}
            </li>
        </ol>
        </content>
        {/* {isModalOpen[1] && (
            <DownloadPopup
              ref={popupRef}
              isAutoSaveToggle={false}
              style={{ top: popupPosition.top, left: popupPosition.left }}
            >
              <span className="close" onClick={(event) => handleOpenModal(1, event)}></span>
              <div>
                <h3>설문조사 상세 설계 다운로드</h3>
                <SelectBoxWrap>
                  <label>포맷 선택 (택1)</label>
                  <SelectBox>
                    <div
                      className={`${
                        selectedFormat === "Word" ? "selected" : ""
                      }`}
                      onClick={() => handleFormatChange("Word")}
                    >
                      {selectedFormat === "Word" ? (
                        <img src={images.ImgWord2} alt="" />
                      ) : (
                        <img src={images.ImgWord} alt="" />
                      )}
                      Word
                    </div>
                    <div
                      className={`${
                        selectedFormat === "PDF" ? "selected" : ""
                      }`}
                      onClick={() => handleFormatChange("PDF")}
                    >
                      {selectedFormat === "PDF" ? (
                        <img src={images.ImgPDF2} alt="" />
                      ) : (
                        <img src={images.ImgPDF} alt="" />
                      )}
                      PDF
                    </div>
                  </SelectBox>
                </SelectBoxWrap>
                <SelectBoxWrap>
                  <label>언어 선택 (택1)</label>
                  <SelectBox>
                    <div
                      className={`${
                        selectedLanguage === "한글" ? "selected" : ""
                      }`}
                      onClick={() => handleLanguageChange("한글")}
                    >
                      {selectedLanguage === "한글" ? (
                        <img src={images.ImgKOR2} alt="" />
                      ) : (
                        <img src={images.ImgKOR} alt="" />
                      )}
                      한국어
                    </div>
                    <div
                      className={`${
                        selectedLanguage === "영문" ? "selected" : ""
                      } disabled`}
                      onClick={() => handleLanguageChange("영문")}
                    >
                      {selectedLanguage === "영문" ? (
                        <img src={images.ImgENG2} alt="" />
                      ) : (
                        <img src={images.ImgENG} alt="" />
                      )}
                      영문(준비 중)
                    </div>
                  </SelectBox>
                </SelectBoxWrap>
                <div>
                  <button
                    onClick={() => handleDownloadClick(1)}
                    disabled={loading || !selectedLanguage}
                  >
                    {loading
                      ? downloadStatus
                      : selectedLanguage
                      ? "다운로드"
                      : "언어를 선택해주세요"}
                  </button>
                </div>
              </div>
            </DownloadPopup>
          )} */}
      </SeparateSection4>
      <SeparateSection4>
      <strong_title>
          <span className="number">3</span>
          {report.content.method_3.title}
          {/* <DownloadButton
            className={`download-button`}
            ref={buttonRef}
            onClick={(event) => handleOpenModal(2, event)}
            disabled={loading}
            isModalOpen={isModalOpen[2]}
          >
            {loading ? downloadStatus : "다운로드"}
          </DownloadButton> */}
        </strong_title>
        <content>
        <ol className="list-disc">
            <li key="1">
              조사 목표: {report.content.method_3.survey_goal}
            </li>
            <li key="2">
              대상 및 채널: {report.content.method_3.survey_target.target_person}, {report.content.method_3.channels_and_collection_methods.channels}
            </li>
            <li key="3">
              데이터 수집 및 분석: {report.content.method_3.channels_and_collection_methods.collection_methods}
            </li>
        </ol>
        </content>
        {/* {isModalOpen[2] && (
            <DownloadPopup
              ref={popupRef}
              isAutoSaveToggle={false}
              style={{ top: popupPosition.top, left: popupPosition.left }}
            >
              <span className="close" onClick={(event) => handleOpenModal(2, event)}></span>
              <div>
                <h3>설문조사 상세 설계 다운로드</h3>
                <SelectBoxWrap>
                  <label>포맷 선택 (택1)</label>
                  <SelectBox>
                    <div
                      className={`${
                        selectedFormat === "Word" ? "selected" : ""
                      }`}
                      onClick={() => handleFormatChange("Word")}
                    >
                      {selectedFormat === "Word" ? (
                        <img src={images.ImgWord2} alt="" />
                      ) : (
                        <img src={images.ImgWord} alt="" />
                      )}
                      Word
                    </div>
                    <div
                      className={`${
                        selectedFormat === "PDF" ? "selected" : ""
                      }`}
                      onClick={() => handleFormatChange("PDF")}
                    >
                      {selectedFormat === "PDF" ? (
                        <img src={images.ImgPDF2} alt="" />
                      ) : (
                        <img src={images.ImgPDF} alt="" />
                      )}
                      PDF
                    </div>
                  </SelectBox>
                </SelectBoxWrap>
                <SelectBoxWrap>
                  <label>언어 선택 (택1)</label>
                  <SelectBox>
                    <div
                      className={`${
                        selectedLanguage === "한글" ? "selected" : ""
                      }`}
                      onClick={() => handleLanguageChange("한글")}
                    >
                      {selectedLanguage === "한글" ? (
                        <img src={images.ImgKOR2} alt="" />
                      ) : (
                        <img src={images.ImgKOR} alt="" />
                      )}
                      한국어
                    </div>
                    <div
                      className={`${
                        selectedLanguage === "영문" ? "selected" : ""
                      } disabled`}
                      onClick={() => handleLanguageChange("영문")}
                    >
                      {selectedLanguage === "영문" ? (
                        <img src={images.ImgENG2} alt="" />
                      ) : (
                        <img src={images.ImgENG} alt="" />
                      )}
                      영문(준비 중)
                    </div>
                  </SelectBox>
                </SelectBoxWrap>
                <div>
                  <button
                    onClick={() => handleDownloadClick(2)}
                    disabled={loading || !selectedLanguage}
                  >
                    {loading
                      ? downloadStatus
                      : selectedLanguage
                      ? "다운로드"
                      : "언어를 선택해주세요"}
                  </button>
                </div>
              </div>
            </DownloadPopup>
          )} */}
      </SeparateSection4>

      <MoleculeReportController
        reportIndex={10}
        report={report}
        />
    </Wrap>
  )
};

const SeparateSection4 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap:12px;
  margin-top: 12px;
  padding: 20px;
  border-radius: 10px;
  background: ${palette.chatGray};

  content {
    padding:16px;
    border-radius:10px;
    background:${palette.white};
  }

  strong_title {
    display: flex;
    align-items: center;
    text-align: left;
    gap: 12px;
    font-size: 1rem;
    font-weight: 700;
    color: ${palette.darkGray};
    word-break: break-word; // 긴 제목이 줄바꿈되도록 설정
    max-width: calc(100% - 90px); // 버튼 영역을 고려한 최대 너비 설정
    padding: 0px;

    span {
      width: 15px;
      height: 15px;
      font-size: 0.63rem;
      color: ${palette.primary};
      line-height: 15px;
      text-align: center;
      border: 1px solid ${palette.primary};
    }
  }

  p {
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray800};
    text-align:left;
  }

  .list-disc li {
    list-style-type:disc;
    list-style-position:inside;
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray800};
    line-height:1.5;
    text-align:left;
  }
`;