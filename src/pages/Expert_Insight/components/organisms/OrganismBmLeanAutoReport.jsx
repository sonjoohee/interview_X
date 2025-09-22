import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import axios from "axios";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  CONVERSATION_STAGE,
  BM_LEAN_AUTO_REPORT_DATA,
  BM_LEAN_AUTO_REPORT_BUTTON_STATE,
  BM_QUESTION_LIST,
  IS_LOGGED_IN,
  PROJECT_TOTAL_INFO,
  PROJECT_CREATE_INFO,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import Loader from "../atoms/AtomLoader";

import images from "../../../../assets/styles/Images";
import {  InterviewXBmLeanAutoReportRequest } from "../../../../utils/indexedDB";


const OrganismBmLeanAutoReport = () => {
  const { saveConversation } = useSaveConversation();
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [
    mainFeaturesOfBusinessInformation,
    setMainFeaturesOfBusinessInformation,
  ] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    mainCharacteristicOfBusinessInformation,
    setMainCharacteristicOfBusinessInformation,
  ] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [
    businessInformationTargetCustomer,
    setBusinessInformationTargetCustomer,
  ] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);

  const [bmLeanAutoButtonState, setBmLeanAutoButtonState] = useAtom(BM_LEAN_AUTO_REPORT_BUTTON_STATE);
  const [isLoadingIdeaPriority, setIsLoadingIdeaPriority] = useState(false);
  const [bmLeanAutoReportData, setBmLeanAutoReportData] = useAtom(BM_LEAN_AUTO_REPORT_DATA);
  const [bmQuestionList, setbmQuestionList] = useAtom(BM_QUESTION_LIST);

  const [projectTotalInfo, setProjectTotalInfo] = useAtom(PROJECT_TOTAL_INFO);
  const [projectCreateInfo, setProjectCreateInfo] = useAtom(PROJECT_CREATE_INFO);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  useEffect(() => {
    const fetchBmLeanAutoReport = async () => {

      if(bmLeanAutoButtonState) {
        setIsLoading(true);
        setIsLoadingIdeaPriority(true);
        setBmLeanAutoButtonState(0);

        const data = {
          expert_id: "9",
          business_info: projectTotalInfo.projectTitle,
          business_analysis_data: projectCreateInfo,
          bm_question_list: bmQuestionList,
        };

        let response = await InterviewXBmLeanAutoReportRequest(
          data,
          isLoggedIn
        );

        let retryCount = 0;
        const maxRetries = 10;

        while (retryCount < maxRetries && (
          !response || !response.response || typeof response.response !== "object" ||
          !response.response.hasOwnProperty("bm_lean_auto_report") ||
          !Array.isArray(response.response.bm_lean_auto_report) ||
          response.response.bm_lean_auto_report.some(section => 
            !section.hasOwnProperty("section") || 
            !Array.isArray(section.content) || 
            section.content.some(contentItem => 
              !contentItem.hasOwnProperty("title") || 
              !contentItem.hasOwnProperty("description") || 
              !Array.isArray(contentItem.keyword)
            )
          )
        )) {
    
          response = await  InterviewXBmLeanAutoReportRequest (
            data,
            isLoggedIn
          );
          retryCount++;
        }
        if (retryCount === maxRetries) {
          //.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
          // 에러 처리 로직 추가
          throw new Error("Maximum retry attempts reached. Empty response persists.");
        }
         setBmLeanAutoReportData(response.response.bm_lean_auto_report);

        setIsLoading(false);
        setIsLoadingIdeaPriority(false);

        const updatedConversation = [...conversation];
        updatedConversation.push(
          {
            type: "system",
            message:
              `위 내용은 ${titleOfBusinessInfo}의 기본 린캔버스를 작성한 내용입니다.`,
            expertIndex: selectedExpertIndex,
          },
          {
            type: "system",
            message:
              `린 캔버스는 특정 문제 (Problem)을 기반으로 다른 항목들에 영향을 줍니다.\n저와 함께 조금 더 세분화된 린캔버스를 만들어 보아요 🎯`,
            expertIndex: -1,
          },
          { type: `bmLeanAdsContinueButton`}
        );
        setConversationStage(3);
        setConversation(updatedConversation);

        await saveConversation(
          { changingConversation: { conversation: updatedConversation, conversationStage: 3, bmLeanAutoReportData : response.response.bm_lean_auto_report, } }
        );
      }
    };

    fetchBmLeanAutoReport();
  }, [bmLeanAutoButtonState]);

  return (
    <>
      {isLoadingIdeaPriority || bmLeanAutoButtonState ? (
        <BoxWrap style={{maxWidth: "950px", minHeight: "700px", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Loader />
        </BoxWrap>
      ) : (
        <BoxWrap>
          <Overlay isMenuOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />

          <h1>{projectTotalInfo.projectTitle}의 린 캔버스 - 기본형</h1>
          {/* <p>{mainFeaturesOfBusinessInformation[0]}</p> */}
  
          <ModelCanvasWrap>
          <CanvasSection>
            {/* 1번째 항목 */}
            <CanvasList>
              <section>
                <strong>
                  문제
                  <span>
                    <img src={images.IconCanvas10} alt="" />
                  </span>
                </strong>
                {bmLeanAutoReportData[0]?.content?.map((contentItem, contentIndex) => (
                  <div key={contentIndex}>
                    {/* <p>{contentItem?.description}</p> */}
                    <ul>
                      {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                        <li key={keywordIndex}>{keywordItem}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            </CanvasList>

            {/* 6번째와 7번째 항목을 묶은 CanvasList Num2 */}
            <CanvasList Num2>
              {[
                bmLeanAutoReportData?.[3],
                bmLeanAutoReportData?.[8]
              ].map((section, index) => (
                <section>
                  <strong>
                    {index === 0 ? "솔루션" : "핵심 지표"}
                    <span>
                      <img src={images[`IconCanvas${index === 0 ? 11 : 12}`]} alt="" />
                    </span>
                  </strong>
                  {section?.content?.map((contentItem, contentIndex) => (
                    <div key={contentIndex}>
                      {/* <p>{contentItem?.description}</p> */}
                      <ul>
                        {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                          <li key={keywordIndex}>{keywordItem}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              ))}
            </CanvasList>

            {/* 2번째 항목 */}
            <CanvasList>
              <section>
                <strong>
                  가치 제안
                  <span>
                    <img src={images.IconCanvas04} alt="" />
                  </span>
                </strong>
                {bmLeanAutoReportData[2]?.content?.map((contentItem, contentIndex) => (
                  <div key={contentIndex}>
                    {/* <p>{contentItem?.description}</p> */}
                    <ul>
                      {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                        <li key={keywordIndex}>{keywordItem}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            </CanvasList>

            {/* 3번째와 4번째 항목을 묶은 CanvasList Num2 */}
            <CanvasList Num2>
              {bmLeanAutoReportData?.slice(4, 6).map((section, index) => (
                <section key={index + 2}>
                  <strong>
                    {index === 0 ? "경쟁우위" : "채널"}
                    <span>
                      <img src={images[`IconCanvas${index === 0 ? 13 : '06'}`]} alt="" />
                    </span>
                  </strong>
                  {section?.content?.map((contentItem, contentIndex) => (
                    <div key={contentIndex}>
                      {/* <p>{contentItem?.description}</p> */}
                      <ul>
                        {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                          <li key={keywordIndex}>{keywordItem}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              ))}
            </CanvasList>

            {/* 5번째 항목 */}
            <CanvasList>
              <section>
                <strong>
                  고객 세그먼트
                  <span>
                    <img src={images.IconCanvas07} alt="" />
                  </span>
                </strong>
                {bmLeanAutoReportData[1]?.content?.map((contentItem, contentIndex) => (
                  <div key={contentIndex}>
                    {/* <p>{contentItem?.description}</p> */}
                    <ul>
                      {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                        <li key={keywordIndex}>{keywordItem}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            </CanvasList>
          </CanvasSection>

          <CanvasSection>
          {/* 8번째 항목 */}
          <CanvasList>
            <section>
              <strong>
                비용
                <span>
                  <img src={images.IconCanvas08} alt="" />
                </span>
              </strong>
              {bmLeanAutoReportData[7]?.content?.map((contentItem, contentIndex) => (
                <div key={contentIndex}>
                  {/* <p>{contentItem?.description}</p> */}
                  <ul>
                    {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                      <li key={keywordIndex}>{keywordItem}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </CanvasList>

          {/* 9번째 항목 */}
          <CanvasList>
            <section>
              <strong>
                수익
                <span>
                  <img src={images.IconCanvas09} alt="" />
                </span>
              </strong>
              {bmLeanAutoReportData[6]?.content?.map((contentItem, contentIndex) => (
                <div key={contentIndex}>
                  {/* <p>{contentItem?.description}</p> */}
                  <ul>
                    {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                      <li key={keywordIndex}>{keywordItem}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </CanvasList>
        </CanvasSection>
        </ModelCanvasWrap>
        <button onClick={() => toggleMenu()}>
          <img src={images.IconDetailView} alt="" />
            상세 내용 확인하기
        </button>
        {/* <MoleculeReportController
          reportIndex={9}
          sampleData={bmLeanAutoReportData}
        /> */}
          <Sidebar isMenuOpen={isMenuOpen}>
            <div>
              <div className="header">
              <h5>린캔버스 상세 리포트</h5>
              <button className="closePopup" onClick={() => setIsMenuOpen(false)}>닫기</button>
            </div>
            <div className="body">
              {/* <p>{marketingBmReportData[9]?.content?.conclusion}</p> */}
              <ScrollWrap>
                <ListBox>
                  <div>
                    <span><img src={images.IconCanvas10} alt="" /></span>
                    <div>
                      <strong>문제</strong>
                      <p>{bmLeanAutoReportData[0]?.content?.[0]?.description}</p>
                      <p className="tag">
                        {bmLeanAutoReportData[0]?.content?.[0]?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas07} alt="" /></span>
                    <div>
                      <strong>고객 세그먼트</strong>
                      <p>{bmLeanAutoReportData[1]?.content?.[0]?.description}</p>
                      <p className="tag">
                        {bmLeanAutoReportData[1]?.content?.[0]?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas04} alt="" /></span>
                    <div>
                      <strong>가치 제안</strong>
                      <p>{bmLeanAutoReportData[2]?.content?.[0]?.description}</p>
                      <p className="tag">
                        {bmLeanAutoReportData[2]?.content?.[0]?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas11} alt="" /></span>
                    <div>
                      <strong>솔루션</strong>
                      <p>{bmLeanAutoReportData[3]?.content?.[0]?.description}</p>
                      <p className="tag">
                        {bmLeanAutoReportData[3]?.content?.[0]?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas06} alt="" /></span>
                    <div>
                      <strong>채널</strong>
                      <p>{bmLeanAutoReportData[5]?.content?.[0]?.description}</p>
                      <p className="tag">
                        {bmLeanAutoReportData[5]?.content?.[0]?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas09} alt="" /></span>
                    <div>
                      <strong>수익 흐름</strong>
                      <p>{bmLeanAutoReportData[6]?.content?.[0]?.description}</p>
                      <p className="tag">
                        {bmLeanAutoReportData[6]?.content?.[0]?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas08} alt="" /></span>
                    <div>
                      <strong>비용구조</strong>
                      <p>{bmLeanAutoReportData[7]?.content?.[0]?.description}</p>
                      <p className="tag">
                        {bmLeanAutoReportData[7]?.content?.[0]?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas12} alt="" /></span>
                    <div>
                      <strong>핵심지표</strong>
                      <p>{bmLeanAutoReportData[8]?.content?.[0]?.description}</p>
                      <p className="tag">
                        {bmLeanAutoReportData[8]?.content?.[0]?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas13} alt="" /></span>
                    <div>
                      <strong>경쟁우위</strong>
                      <p>{bmLeanAutoReportData[4]?.content?.[0]?.description}</p>
                      <p className="tag">
                        {bmLeanAutoReportData[4]?.content?.[0]?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                </ListBox>
              </ScrollWrap>
            </div>
          </div>
        </Sidebar>
        </BoxWrap>
      )}
    </>
  );
};


export default OrganismBmLeanAutoReport;
const BoxWrap = styled.div`
  max-width:988px;
  // width:100%;
  display:flex;
  flex-direction:column;
  text-align:left;
  padding:20px;
  margin:24px 0 0 50px;
  border-radius:15px;
  border:1px solid ${palette.outlineGray};

  h1 {
    font-size:1.25rem;
    font-weight:400;
    margin-bottom:8px;
  }

  p {
    font-size:0.88rem;
    line-height:1.3;
  }

  button {
    display:flex;
    align-items:center;
    gap:5px;
    font-family: 'Pretendard', 'Poppins';
    font-size:0.75rem;
    color:${palette.gray500};
    padding:6px 0;
    margin-top:5px;
    border:0;
    background:none;
  }
`;

const ModelCanvasWrap = styled.div`
  display:flex;
  flex-direction:column;
  gap:12px;
  margin:24px 0;
`;

const CanvasSection = styled.div`
  display:flex;
  gap:12px;
`;

const CanvasList = styled.div`
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:stretch;
  gap:12px;
  flex:1 1 19%;
  max-height:400px;

  ${props =>
    props.Num2 &&
    css`
      section {
        height:50% !important;
      }
    `
  }

  section {
    height:100%;
    padding:16px;
    border-radius:15px;
    background:${palette.chatGray};
    overflow:hidden;
  }

  strong {
    display:flex;
    align-items:center;
    justify-content:space-between;
    min-height:26px;
    font-size:0.88rem;
    font-weight:500;
    color:${palette.gray800};
    // margin-bottom:16px;
    
    span {
      width:26px;
      height:26px;
      display:flex;
      align-items:center;
      justify-content:center;
      border-radius:100%;
      background:${palette.white};
    }
  }

  div {
    height:calc(100% - 40px);
    overflow-y:auto;
    scrollbar-width:thin;
  }

  p {
    font-size:0.75rem;
    color:${palette.gray800};
    line-height:1.3;

    span {
      display:block;
      font-size:0.63rem;
      margin-top:4px;
    }
  }

  ul {
    margin-top:12px;

    li {
      position:relative;
      font-size:0.75rem;
      line-height:1.3;
      padding-left:18px;

      + li {
        margin-top:5px;
      }

      &:before {
        position:absolute;
        left:8px;
        top:7px;
        width:2px;
        height:2px;
        border-radius:10px;
        background:${palette.gray800};
        content:'';
      }
    }
  }
`;
const ButtonWrap = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
gap: 16px;
// padding-top: 20px;
// border-top: 1px solid ${palette.lineGray};

button {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Pretendard";
  font-size: 0.75rem;
  color: ${palette.gray};
  padding: 4px 8px;
  border-radius: 5px;
  border: 0;
  background: none;
  transition: all 0.5s;

  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }
}

.lineBtn {
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid ${palette.lineGray};
}

> button {
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid ${palette.lineGray};
}

> div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}
`;

const Sidebar = styled.div`
  // position:absolute;
  // top: 0;
  // right: ${({ isMenuOpen }) => (isMenuOpen ? '0' : '-800px')};
  // height: 100%;
  // max-width: 800px;
  // width:100%;

  width: ${({ isMenuOpen }) => (isMenuOpen ? '800px' : '0')};

  background:${palette.white};
  // transform: ${({ isMenuOpen }) => (isMenuOpen ? 'translateX(0)' : 'translateX(200%)')};
  transition: all .5s;
  z-index: 9999;

  visibility: ${({ isMenuOpen }) => (isMenuOpen ? 'visible' : 'hidden')};
  overflow:hidden;
  flex-shrink:0;
  position:fixed;
  top:0;
  right:0;
  height:100vh;

  
  > div {
    display: flex;
    flex-direction: column;
    gap:50px;
    width: 100%;
    // max-width: 800px;
    height: 100%;
    text-align: center;
    // overflow:hidden;
    padding: 32px;
    border-radius: 10px;
    background: ${palette.white};
  }

  .header {
    position:relative;
    display:flex;
    flex-direction: column;
    gap:16px;
    align-items:center;

    h5 {
      width:100%;
      font-size:1.25rem;
      font-weight:600;
      line-height:1.3;
      color:${palette.gray800};
      text-align:left;

      p {
        font-size:1rem;
        font-weight:400;
        line-height:1.5;
        margin-top:16px;
      }
    }
  }

  .closePopup {
    position:absolute;
    top:0;
    right:0;
    width:21px;
    height:21px;
    font-size:0;
    border:0;
    background:none;

    &:before, &:after {
      position:absolute;
      top:50%;
      left:50%;
      width:3px;
      height:21px;
      display:inline-block;
      border-radius:50px;
      background:${palette.gray500};
      content:'';
    }
    &:before {
      transform:translate(-50%, -50%) rotate(45deg);
    }
    &:after {
      transform:translate(-50%, -50%) rotate(-45deg);
    }
  }

  .body {
    height:calc(100% - 80px);
    display: flex;
    flex-direction: column;
    gap:32px;

    p {
      line-height:1.5;
      color:${palette.gray800};
      text-align:left;
    }
  }


  h2 {
    margin-top: 0;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin: 20px 0;
  }
`;

const ScrollWrap = styled.div`
  position:relative;
  flex:1 1 0%;
  overflow-y:auto;

  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${palette.lineGray};
    border-radius: 10px;
  }
`;

const ListBox = styled.div`
  // max-height:525px;
  overflow-y:auto;
  border-radius:10px;
  border:1px solid ${palette.outlineGray};

  > div {
    display:flex;
    gap:8px;
    padding:14px 20px;

    + div {
      border-top:1px solid ${palette.outlineGray};
    }

    span {
      flex-shrink:0;
      font-size:0.88rem;
      line-height:1.5;
    }

    div {
      display:flex;
      flex-direction: column;
      gap:12px;
    }

    strong, p {
      font-size:0.88rem;
      line-height:1.5;
      text-align:left;
    }

    p.tag {
      display:flex;
      align-items:center;
      gap:12px;
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .1);
  opacity: ${({ isMenuOpen }) => (isMenuOpen ? 1 : 0)};
  visibility: ${({ isMenuOpen }) => (isMenuOpen ? 'visible' : 'hidden')};
  transition: all .5s;
  z-index: 800;
`;