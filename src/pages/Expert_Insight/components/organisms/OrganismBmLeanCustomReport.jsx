import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { palette } from "../../../../assets/styles/Palette";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  BUTTON_STATE,
  BM_LEAN_AUTO_REPORT_DATA,
  BM_LEAN_CUSTOM_REPORT_BUTTON_STATE,
  BM_SELECTED_PROBLEM_OPTIONS,
  BM_LEAN_CUSTOM_REPORT_DATA,
  CONVERSATION_STAGE,
  IS_LOGGED_IN,
  PROJECT_TOTAL_INFO,
  PROJECT_CREATE_INFO,
} from "../../../AtomStates";
import { useSaveConversation } from "../atoms/AtomSaveConversation";
import Loader from "../atoms/AtomLoader";
import images from "../../../../assets/styles/Images";
import {InterviewXBmLeanCustomReportRequest } from "../../../../utils/indexedDB";

const OrganismBmLeanCustomReport = () => {

  const [, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const { saveConversation } = useSaveConversation();
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [, setIsLoading] = useAtom(IS_LOADING);
  const [bmLeanCustomButtonState, setBmLeanCustomButtonState] = useAtom(BM_LEAN_CUSTOM_REPORT_BUTTON_STATE);
  const [bmLeanAutoReportData, ] = useAtom(BM_LEAN_AUTO_REPORT_DATA);
  const [bmLeanCustomReportData, setBmLeanCustomReportData] = useAtom(BM_LEAN_CUSTOM_REPORT_DATA);
  const [bmSelectedProblemOptions, ] = useAtom(BM_SELECTED_PROBLEM_OPTIONS); // 문제 선택 아톰
  const [projectTotalInfo, ] = useAtom(PROJECT_TOTAL_INFO);
  const [projectCreateInfo, ] = useAtom(PROJECT_CREATE_INFO);

  const [isLoadingIdeaPriority, setIsLoadingIdeaPriority] = useState(false);
  const [isModalOpen, ] = useState({});
  const [selectedFormat, ] = useState("Word");
  const [selectedLanguage, setSelectedLanguage] = useState("한글");
  const [isPopupOpenDownload, setIsPopupOpenDownload] = useState(false);
  const popupRef = useRef(null);
  const [loadingDownload, setLoadingDownload] = useState(false);



  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const togglePopupDownload = () => {
    setIsPopupOpenDownload(!isPopupOpenDownload);
  };
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language); // 선택된 언어 상태를 설정
  };
useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !event.target.closest(".download-button")
      ) {
        setIsPopupOpenDownload(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);
  const handleDownloadDocx = async () => {
    setLoadingDownload(true); // 로딩 상태 시작

    let fileName = `Lean Canvas`; // 기본 파일 이름

    // 이미 저장된 데이터가 있는 경우 해당 데이터를 사용
    if (Object.keys(bmLeanCustomReportData).length !== 0) {
      generateDocx(bmLeanCustomReportData, fileName); // DOCX 생성 함수 호출
      return;
    }


    try {
      // Markdown 스타일 제거 (정규식 사용)
      const cleanedContent = bmLeanCustomReportData
        .replace(/##/g, "") 
        .replace(/\*\*/g, "") 
        .replace(/\*/g, "") 
        .replace(/-\s/g, "• ") 
        .replace(/\n/g, "<br/>"); 

      // 저장 후 DOCX 생성 함수 호출
      generateDocx(cleanedContent, fileName);

      await saveConversation(
        { changingConversation: { conversationStage: 3 } }
      );
    } catch (error) {
      // console.error("Error fetching report:", error);
      setLoadingDownload(false);
      setTimeout(() => {
      }, 2000);
    }
  };

  // DOCX 파일을 생성하는 함수
  const generateDocx = (content, fileName) => {
    try {
      // JSON 데이터를 순회하여 섹션별 Paragraph 생성
      const contentParagraphs = content.flatMap((section) => {
        // section 제목
        const sectionTitle = new Paragraph({
          children: [
            new TextRun({
              text: section.section,
              bold: true, // 제목을 굵게 표시
            }),
          ],
        });
  
        // 각 section의 content를 순회하며 제목, 설명, 키워드 처리
        const contentItems = section.content.flatMap((contentItem) => {
          const titleParagraph = new Paragraph({
            children: [
              new TextRun({
                text: contentItem.title,
                bold: true,
              }),
            ],
          });
  
          const descriptionParagraph = new Paragraph({
            children: [
              new TextRun({
                text: contentItem.description,
              }),
            ],
          });
  
          // 키워드를 • 구분 기호와 함께 나열
          const keywordParagraph = new Paragraph({
            children: (contentItem.keyword || []).map((keyword) => {
              return new TextRun({
                text: `• ${keyword} `,
                break: 1, // 각 키워드 이후 줄바꿈
              });
            }),
          });
  
          return [titleParagraph, descriptionParagraph, keywordParagraph];
        });
  
        // section 제목과 그 내용 배열로 반환
        return [sectionTitle, ...contentItems];
      });
  
      // docx 문서 생성
      const doc = new Document({
        sections: [
          {
            children: [...contentParagraphs],
          },
        ],
      });
  
      // docx 파일 패킹 및 다운로드
      Packer.toBlob(doc)
        .then((blob) => {
          saveAs(blob, `${fileName}.docx`);
          setTimeout(() => {
            setLoadingDownload(false);
          }, 2000);
        })
        .catch((error) => {
          // console.error("Error generating DOCX:", error);
          setLoadingDownload(false);
          setTimeout(() => {}, 2000);
        });
    } catch (error) {
      // console.error("Error generating DOCX:", error);
    }
  };
  
  
  
  useEffect(() => {
    const fetchBmLeanCustomReport = async () => {

      if(bmLeanCustomButtonState) {
        setIsLoading(true);
        setIsLoadingIdeaPriority(true);
        setBmLeanCustomButtonState(0);

        const data = {
          expert_id: "9",
          business_info: projectTotalInfo.projectTitle,
          business_analysis_data: projectCreateInfo,
          bm_lean_auto_report: bmLeanAutoReportData,
          selected_bm_lean_problem : bmSelectedProblemOptions.problemOptions
        };

        let response = await InterviewXBmLeanCustomReportRequest(
          data,
          isLoggedIn
        );

        let retryCount = 0;
        const maxRetries = 10;

        while (retryCount < maxRetries && (
          !response || !response.response || typeof response.response !== "object" ||
          !response.response.hasOwnProperty("bm_lean_custom_report") ||
          !Array.isArray(response.response.bm_lean_custom_report) ||
          response.response.bm_lean_custom_report.some(section => 
            !section.hasOwnProperty("section") || 
            !section.hasOwnProperty("content") || 
            !Array.isArray(section.content) || 
            section.content.some(contentItem => 
              !contentItem.hasOwnProperty("title") || 
              !contentItem.hasOwnProperty("description")
            )
          )
        )) 
        {
          response = await InterviewXBmLeanCustomReportRequest(
            data,
            isLoggedIn
          );
          retryCount++;
        }
        if (retryCount === maxRetries) {
        //  console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
          // 에러 처리 로직 추가
          throw new Error("Maximum retry attempts reached. Empty response persists.");
        }
        setBmLeanCustomReportData(response.response.bm_lean_custom_report);

        setIsLoading(false);
        setIsLoadingIdeaPriority(false);

        const updatedConversation = [...conversation];
      
        updatedConversation.push(
          {
            type: "system",
            message: `${bmSelectedProblemOptions.problemOptions}을 기반으로 린캔버스를 세분화하였습니다.`,
            expertIndex: selectedExpertIndex,
          },
          {
            type: "system",
            message: "현재 린 캔버스 세분화는 하나의 문제점만 적용이 가능합니다. ⏳\n앞으로는 여러 문제를 한눈에 비교 할 수 있는 기능도 추가될 예정이니, 기대해 주세요.  ",
            expertIndex: -1,
          },
          {
            type: "system",
            message:
              "이외에 궁금한 점은 대화창에 입력해주시거나, 아래 키워드를 활용하여 추가적인 조언을 받아보세요",
            expertIndex: -1,
          },
          { type: `keyword` }
        );
        setConversationStage(3);
        setConversation(updatedConversation);
        setButtonState({
          ...buttonState,
          bmEnough: 1,
        });

        await saveConversation(
          { changingConversation: { conversation: updatedConversation, conversationStage: 3, buttonState : {...buttonState, bmEnough: 1}, bmLeanCustomReportData : response.response.bm_lean_custom_report, } }
        );
      }
    };

    fetchBmLeanCustomReport();
  }, [bmLeanCustomButtonState]);

  return (
    <>
      {isLoadingIdeaPriority ? (
        <BoxWrap style={{maxWidth: "950px", minHeight: "700px", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Loader />
        </BoxWrap>
      ) : (
        <BoxWrap>
          <Overlay isMenuOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />

          <h1>{projectTotalInfo.projectTitle}의 린 캔버스 - {bmSelectedProblemOptions.problemOptions}</h1>
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
                {bmLeanCustomReportData[0]?.content?.map((contentItem, contentIndex) => (
                  <div key={contentIndex}>
                    {/* {contentIndex === 0 && <p>{contentItem?.description}</p>} */}
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
                bmLeanCustomReportData?.[3],
                bmLeanCustomReportData?.[8]
              ].map((section, index) => (
                <section key={index + 5}>
                  <strong>
                    {index === 0 ? "솔루션" : "핵심 지표"}
                    <span>
                      <img src={images[`IconCanvas${index === 0 ? 11 : 12}`]} alt="" />
                    </span>
                  </strong>
                  {section?.content?.map((contentItem, contentIndex) => (
                    <div key={contentIndex}>
                      {/* {contentIndex === 0 && <p>{contentItem?.description}</p>} */}
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
                {bmLeanCustomReportData[2]?.content?.map((contentItem, contentIndex) => (
                  <div key={contentIndex}>
                    {/* {contentIndex === 0 && <p>{contentItem?.description}</p>} */}
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
              {bmLeanCustomReportData?.slice?.(4, 6).map((section, index) => (
                <section key={index + 2}>
                  <strong>
                    {index === 0 ? "경쟁우위" : "채널"}
                    <span>
                      <img src={images[`IconCanvas${index === 0 ? 13 : '06'}`]} alt="" />
                    </span>
                  </strong>
                  {section?.content?.map((contentItem, contentIndex) => (
                    <div key={contentIndex}>
                      {/* {contentIndex === 0 && <p>{contentItem?.description}</p>} */}
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
                {bmLeanCustomReportData[1]?.content?.map((contentItem, contentIndex) => (
                  <div key={contentIndex}>
                    {/* {contentIndex === 0 && <p>{contentItem?.description}</p>} */}
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
              {bmLeanCustomReportData[7]?.content
              ?.filter(contentItem => contentItem.title === "핵심 메시지")
              ?.map((contentItem, contentIndex) => (
                <div key={contentIndex}>
                  {/* {contentIndex === 0 && <p>{contentItem?.description}</p>} */}
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
              {bmLeanCustomReportData[6]?.content
              ?.filter(contentItem => contentItem.title === "핵심 메시지")
              ?.map((contentItem, contentIndex) => (
                <div key={contentIndex}>
                  {/* {contentIndex === 0 && <p>{contentItem?.description}</p>} */}
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
        {/* <ButtonSectionWrap>
        <DownloadButton onClick={togglePopupDownload} className="download-button">
            <p>
              <img src={images.IconEdit3} alt="" />
              자료 (1건)
            </p>
            <div>
              <button>
                <img src={images.IconDownload2} alt="" />
                <div>
                  <strong>비즈니스 분석 자료</strong>
                  <span>1.8 MB · Download</span>
                </div>
              </button>
            </div>
          </DownloadButton>
            <ButtonWrap>
              <div />
              <div>
                <button type="button">
                  <img src={images.IconCopy} alt="" />
                  복사하기
                </button>
                <button type="button">
                  <img src={images.IconSave} alt="" />
                  저장하기
                </button>
              </div>
            </ButtonWrap>
            </ButtonSectionWrap> */}
          </ModelCanvasWrap>
          <button onClick={() => toggleMenu()}>
            <img src={images.IconDetailView} alt="" />
              상세 내용 확인하기
          </button>
        </BoxWrap>
      )}
      {isPopupOpenDownload && (
        <DownloadPopup
          ref={popupRef}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              togglePopupDownload();
            }
          }}
        >
          <span className="close" onClick={togglePopupDownload}></span>
          <div>
            <h3>비즈니스 분석 자료 다운로드</h3>
            <SelectBoxWrap>
                <label>포맷 선택 (택1)</label>
                <SelectBox>
                  <div
                    className={`${
                      selectedFormat === "Word" ? "selected" : ""
                    }`}
                  >
                    {selectedFormat === "Word" ? (
                      <img src={images.ImgWord2} alt="" />
                    ) : (
                      <img src={images.ImgWord} alt="" />
                    )}
                    Word
                  </div>
                  {/* <div
                    className={`${
                      selectedFormat === "Excel" ? "selected" : ""
                    }`}
                    onClick={() => handleFormatChange("Excel")}
                  >
                    {selectedFormat === "Excel" ? (
                      <img src={images.ImgExcel2} alt="" />
                    ) : (
                      <img src={images.ImgExcel} alt="" />
                    )}
                    Excel
                  </div> */}
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
                onClick={handleDownloadDocx}
                disabled={loadingDownload}
              >
                {loadingDownload
                  ? "다운로드 중..."
                  : "다운로드"}
              </button>
            </div>
          </div>
        </DownloadPopup>
      )}
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
                      <p>{bmLeanCustomReportData[0]?.content?.[0]?.description}</p>
                      <p className="tag">
                        {bmLeanCustomReportData[0]?.content?.[0]?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas07} alt="" /></span>
                    <div>
                      <strong>고객 세그먼트</strong>
                      <p>{bmLeanCustomReportData[1]?.content?.[0]?.description}</p>
                      <p className="tag">
                        {bmLeanCustomReportData[1]?.content?.[0]?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas04} alt="" /></span>
                    <div>
                      <strong>가치 제안</strong>
                      <p>{bmLeanCustomReportData[2]?.content?.[0]?.description}</p>
                      <p className="tag">
                        {bmLeanCustomReportData[2]?.content?.[0]?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas11} alt="" /></span>
                    <div>
                      <strong>솔루션</strong>
                      <p>{bmLeanCustomReportData[3]?.content?.[0]?.description}</p>
                      <p className="tag">
                        {bmLeanCustomReportData[3]?.content?.[0]?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas06} alt="" /></span>
                    <div>
                      <strong>채널</strong>
                      <p>{bmLeanCustomReportData[5]?.content?.[0]?.description}</p>
                      <p className="tag">
                        {bmLeanCustomReportData[5]?.content?.[0]?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas09} alt="" /></span>
                    <div>
                      <strong>수익 흐름</strong>
                      <p>{bmLeanCustomReportData[6]?.content?.[0]?.description}</p>
                      <p className="tag">
                        {bmLeanCustomReportData[6]?.content?.[0]?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas08} alt="" /></span>
                    <div>
                      <strong>비용구조</strong>
                      <p>{bmLeanCustomReportData[7]?.content?.[0]?.description}</p>
                      <p className="tag">
                        {bmLeanCustomReportData[7]?.content?.[0]?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas12} alt="" /></span>
                    <div>
                      <strong>핵심지표</strong>
                      <p>{bmLeanCustomReportData[8]?.content?.[0]?.description}</p>
                      <p className="tag">
                        {bmLeanCustomReportData[8]?.content?.[0]?.keyword.map((keyword, index) => (
                          <span key={index}>#{keyword}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas13} alt="" /></span>
                    <div>
                      <strong>경쟁우위</strong>
                      <p>{bmLeanCustomReportData[4]?.content?.[0]?.description}</p>
                      <p className="tag">
                        {bmLeanCustomReportData[4]?.content?.[0]?.keyword.map((keyword, index) => (
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
    </>
  );
};


export default OrganismBmLeanCustomReport;
const BoxWrap = styled.div`
  position:relative;
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
const DownloadButton = styled.div`
  display:flex;
  flex-direction:column;
  gap:8px;

  p {
    display:flex;
    align-items:center;
    gap:8px;
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray500};
    line-height:22px;
  }

  div {
    display:flex;
    gap:12px;
  }

  button {
    display:flex;
    align-items:center;
    gap:8px;
    padding:6px 8px;
    border-radius:6px;
    border:1px solid ${palette.lineGray};
    background:${palette.white};
    font-family: 'Pretendard';

    div {
      display:flex;
      flex-direction:column;
      gap:4px;
      min-width:160px;
      text-align:left;
    }

    strong {
      font-size:0.63rem;
      font-weight:400;
      color:${palette.gray800};
    }

    span {
      font-size:0.5rem;
      color:${palette.gray500};
    }
  }
`;

const DownloadPopup = styled.div`
  position: absolute;
  bottom:20px;
  max-width: 288px;
  width: 100%;
  max-height: 400px; /* 팝업의 최대 높이를 적절히 설정 */
  overflow-y: auto; /* 내용이 많을 경우 스크롤 가능하게 설정 */
  padding: ${(props) => (props.isAutoSaveToggle ? "0" : "24px 20px 20px")};
  border-radius: 15px;
  background: ${palette.white};
  box-shadow: 0 4px 28px rgba(0, 0, 0, 0.05);
  visibility: ${(props) => (props.isAutoSaveToggle ? "hidden" : "visible")};
  opacity: ${(props) => (props.isAutoSaveToggle ? "0" : "1")};
  transition: opacity 0.3s ease, visibility 0.3s ease; /* 트랜지션 추가 */
  z-index: 99;

  .close {
    position:absolute;
    right:20px;
    top:20px;
    width:12px;
    height:12px;
    cursor:pointer;

    &:before, &:after {
      position:absolute;
      top:50%;
      left:50%;
      width:2px;
      height:100%;
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

  &:before {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0px 20px 12px 20px;
    border-color: transparent transparent ${palette.white} transparent;
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.2));
    // content: "";
    z-index: 0;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align:left;
  }

  h3 {
    font-size: 0.88rem;
    font-weight: 600;
    color: ${palette.gray800};
  }

  label {
    font-size: 0.875rem;
    color: ${palette.gray};
  }

  select {
    margin-left: 10px;
    padding: 5px;
    border-radius: 5px;
  }

  button {
    width: 100%;
    font-family: Pretendard, Poppins;
    font-size: 0.88rem;
    color: ${palette.white};
    margin-top: 16px;
    padding: 15px 0;
    border-radius: 8px;
    border: none;
    background-color: ${palette.blue};
    cursor: pointer;

    &:disabled {
      background-color: ${palette.lineGray};
      cursor: not-allowed;
    }
  }
`;
const ButtonSectionWrap = styled.div`
  display: flex;
  justify-content: space-between; /* 가로로 공간을 균등 배분 */
  align-items: center;
  margin-top: 20px; /* 적절한 간격 추가 */
`;
const SelectBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const SelectBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    min-width: 120px;
    font-size: 0.75rem;
    text-align: center;
    color: ${palette.gray700};
    padding: 13px 0;
    border-radius: 10px;
    border: 1px solid ${palette.gray100};
    cursor: pointer;
    transition: all 0.5s;

    img {
      width: 40px;
      height: 40px;
    }

    &.selected {
      font-weight: 700;
      color: ${palette.gray800};
      border: 1px solid ${palette.blue};
      background: rgba(4, 83, 244, 0.05);
    }
  }
  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .disabled img {
    filter: grayscale(100%);
  }

  .disabled span {
    color: ${palette.gray300};
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