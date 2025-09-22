import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
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
  BUTTON_STATE,
  SURVEY_GUIDELINE_BUTTON_STATE,
  SURVEY_GUIDELINE_REPORT_DATA,
  SURVEY_GOAL_FIXED,
  SURVEY_GUIDELINE_DETAIL_REPORT_DATA,
  CONVERSATION_STAGE,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx"; // docx 라이브러리 임포트
import { saveAs } from "file-saver"; // file-saver를 사용하여 파일 저장

import {
  SkeletonTitle,
  SkeletonLine,
  Spacing,
} from "../../../../assets/styles/Skeleton";

import images from "../../../../assets/styles/Images";
import MoleculeReportController from "../molecules/MoleculeReportController";

const OrganismSurveyGuidelineReport = () => {
  const { saveConversation } = useSaveConversation();
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [isLoadingSurveyGuideline, setIsLoadingSurveyGuideline] = useState(false);
  const [surveyGuidelineButtonState, setSurveyGuidelineButtonState] = useAtom(SURVEY_GUIDELINE_BUTTON_STATE);
  const [surveyGoalFixed, setSurveyGoalFixed] = useAtom(SURVEY_GOAL_FIXED);
  const [surveyGuidelineReportData, setSurveyGuidelineReportData] = useAtom(SURVEY_GUIDELINE_REPORT_DATA);
  const [surveyGuidelineDetailReportData, setSurveyGuidelineDetailReportData] = useAtom(SURVEY_GUIDELINE_DETAIL_REPORT_DATA);

  const [isModalOpen, setIsModalOpen] = useState({});
  const [selectedFormat, setSelectedFormat] = useState("Word");
  const [selectedLanguage, setSelectedLanguage] = useState("한글");
  const popupRef = useRef(null); // 팝업 요소를 참조하는 useRef 생성
  const [loading, setLoading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState(""); // 상태 메시지를 관리

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !event.target.closest(".download-button")
      ) {
        setIsModalOpen({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const [isAutoSaveToggle, setIsAutoSaveToggle] = useState(false); // 팝업이 처음에는 닫힌 상태

  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 }); // 팝업 위치 상태
  const buttonRef = useRef(null); // 버튼 위치를 참조할 ref 생성

  const handleOpenModal = (index, event) => {
    if (isModalOpen[index]) {
      setIsModalOpen({}); // 모달을 다시 클릭하면 닫기
      return;
    }

    setIsModalOpen((prev) => {
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      newState[index] = true; // 현재 index만 true
      return newState;
    });

    const clickedElement = event.currentTarget;

    // 클릭된 요소의 위치와 크기 정보 가져오기
    let top = clickedElement.offsetTop + 30;
    let left = clickedElement.offsetLeft + clickedElement.offsetWidth - 100;

    // 새로운 위치를 설정
    setPopupPosition({ top, left });
  };

  const handleDownloadClick = (index) => {
    if (!selectedLanguage) {
      alert("언어를 선택해주세요");
      return;
    }

    setLoading(true);
    setDownloadStatus("다운로드 중입니다...");

    if (selectedFormat === "PDF") {
      // handleDownload(selectedLanguage, index);
    } else if (selectedFormat === "Word") {
      handleDownloadDocx(selectedLanguage, index);
    }
  };

  const handleDownloadDocx = async (language, index) => {
    setLoading(true); // 로딩 상태 시작
    setDownloadStatus("다운로드 중입니다...");

    // // `strategyReportData`에서 필요한 정보를 직접 가져옴
    // const currentExpertData = strategyReportData[selectedExpertIndex];

    // if (!currentExpertData) {
    //   setLoading(false);
    //   setDownloadStatus("데이터를 찾을 수 없습니다.");
    //   return;
    // }

    // 기존에 저장된 보고서가 있는지 확인
    const existingReport = surveyGuidelineDetailReportData[index];

    let fileName = `설문조사 상세 설계서`; // 기본 파일 이름

    // // 목표 행위 텍스트를 파일 이름으로 설정
    // const content = currentExpertData.tabs[0].sections[0].content[index];
    // if (content && content.subContent) {
    //   content.subContent.forEach((subItem) => {
    //     if (subItem.subTitle === "목표 행위") {
    //       fileName = `${subItem.text} - PoC 수행 계획서`; // "목표 행위" 텍스트를 파일 이름으로 사용
    //     }
    //   });
    // }

    // 이미 저장된 데이터가 있는 경우 해당 데이터를 사용
    if (existingReport && Object.keys(existingReport).length > 0) {
      generateDocx(existingReport, index, fileName); // DOCX 생성 함수 호출
      return;
    }

    // 요청에 필요한 데이터 준비
    const data = {
      expert_id: "10",
      business_info: titleOfBusinessInfo, // DB에서 가져온 titleOfBusinessInfo 사용
      business_analysis_data: {
        명칭: analysisReportData.title,
        주요_목적_및_특징: analysisReportData.mainFeatures,
        주요기능: analysisReportData.mainCharacter,
        목표고객: analysisReportData.mainCustomer,
      },
      survey_guideline_report: surveyGuidelineReportData[`method_${index + 1}`],
    };

    try {
      // API 요청 보내기
      const response = await axios.post(
        "https://wishresearch.kr/panels/survey_guideline_detail_report",
        data
      );

      // 응답으로부터 보고서 내용 가져오기
      const reportContent = response.data.survey_guideline_detail_report; // 실제 응답 구조에 맞춰 수정 필요

      // Atom에 보고서 내용을 저장
      setSurveyGuidelineDetailReportData((prevReport) => ({
        ...prevReport,
        [index]: reportContent,
      }));

      // 저장 후 DOCX 생성 함수 호출
      generateDocx(reportContent, index, fileName);

      await saveConversation(
        { changingConversation: { conversationStage: 3, surveyGuidelineDetailReportData: {
          ...surveyGuidelineDetailReportData,
          [index]: reportContent,
        }, } }
      );
    } catch (error) {
     // console.error("Error fetching report:", error);
      setLoading(false);
      setDownloadStatus("다운로드 실패");
      setTimeout(() => {
        setDownloadStatus("");
      }, 2000);
    }
  };

  // DOCX 파일을 생성하는 함수
  const generateDocx = (content, index, fileName) => {
    try {
      // Word 문서용 전처리
      const cleanedContent = content
        .replace(/##/g, "") // 제목 표시 '##' 제거
        .replace(/\*\*/g, "") // 굵은 글씨 '**' 제거
        .replace(/\*/g, "") // 이탤릭체 '*' 제거
        .replace(/-\s/g, "• ") // 리스트 '-'를 '•'로 변환
        .replace(/<br\/>/g, "\n"); // <br/>을 줄바꿈으로 변환

      // 줄바꿈 기준으로 텍스트 분리
      const contentParagraphs = cleanedContent.split("\n").map((line) => {
        return new Paragraph({
          children: [
            new TextRun({
              text: line,
            }),
          ],
        });
      });

      // 문서 생성을 위한 docx Document 객체 생성
      const doc = new Document({
        sections: [
          {
            children: [
              ...contentParagraphs, // 분리된 각 줄을 Paragraph로 추가
            ],
          },
        ],
      });

      // docx 파일 패킹 및 다운로드
      Packer.toBlob(doc)
        .then((blob) => {
          saveAs(blob, `${fileName}.docx`);
          setDownloadStatus("다운로드 완료");

          // 2초 후 상태 리셋
          setTimeout(() => {
            setLoading(false);
            setDownloadStatus("");
          }, 2000);
        })
        .catch((error) => {
         // console.error("Error generating DOCX:", error);
          setLoading(false);
          setDownloadStatus("다운로드 실패");
          setTimeout(() => {
            setDownloadStatus("");
          }, 2000);
        });
    } catch (error) {
      //console.error("Error generating DOCX:", error);
    }
  };

  // 팝업 외부 클릭 시 닫히도록 처리하는 useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsAutoSaveToggle(false); // 외부 클릭 시 팝업 닫기
      }
    };

    if (isAutoSaveToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAutoSaveToggle]);

  // 데이터를 추출하는 함수 (필요 시 수정)
  const extractTextContent = (data) => {
    let textContent = "";
    if (typeof data === "string") {
      return data + "\n";
    }
    if (Array.isArray(data)) {
      data.forEach((item) => {
        textContent += extractTextContent(item);
      });
    } else if (typeof data === "object" && data !== null) {
      Object.values(data).forEach((value) => {
        textContent += extractTextContent(value);
      });
    }
    return textContent;
  };

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language); // 선택된 언어 상태를 설정
  };

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  useEffect(() => {
    const fetchIdeaList = async () => {

      if(surveyGuidelineButtonState) {
        setIsLoading(true);
        setIsLoadingSurveyGuideline(true);
        setSurveyGuidelineButtonState(0);

        const data = {
          expert_id: "10",
          business_info: titleOfBusinessInfo,
          business_analysis_data: {
            명칭: titleOfBusinessInfo,
            주요_목적_및_특징: mainFeaturesOfBusinessInformation,
            주요기능: mainCharacteristicOfBusinessInformation,
            목표고객: businessInformationTargetCustomer,
          },
          goal_fixed: surveyGoalFixed,
        };

        let response = await axios.post(
          "https://wishresearch.kr/panels/survey_guideline_report",
          data,
          axiosConfig
        );

        let retryCount = 0;
        const maxRetries = 10;

        while (retryCount < maxRetries && (
          !response || 
          !response.data || 
          typeof response.data !== "object" ||
          !response.data.hasOwnProperty("survey_guideline_report") || 
          !Array.isArray(response.data.survey_guideline_report)
          // !response.data.growth_hacker_report[0].hasOwnProperty("content") ||
          // !Array.isArray(response.data.growth_hacker_report[0].content) ||
          // !response.data.growth_hacker_report[0].content[0].hasOwnProperty("text") ||
          // !response.data.growth_hacker_report[0].content[1].hasOwnProperty("text") ||
          // response.data.growth_hacker_report[1].content.some(item => 
          //   !item.hasOwnProperty("title") || 
          //   !item.hasOwnProperty("text") || 
          //   !item.hasOwnProperty("subcontent") || 
          //   !Array.isArray(item.subcontent) || 
          //   item.subcontent.some(contentItem => 
          //     !contentItem.hasOwnProperty("subTitle") || 
          //     !contentItem.hasOwnProperty("text")
          //   )
          // )
        )) 
        {
          response = await axios.post(
            "https://wishresearch.kr/panels/survey_guideline_report",
            data,
            axiosConfig
          );
          retryCount++;
        }
        if (retryCount === maxRetries) {
       //   console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
          // 에러 처리 로직 추가
          throw new Error("Maximum retry attempts reached. Empty response persists.");
        }
        setSurveyGuidelineReportData(response.data.survey_guideline_report[0]);

        setIsLoading(false);
        setIsLoadingSurveyGuideline(false);

        const updatedConversation = [...conversation];
        updatedConversation.push(
          {
            type: "system",
            message:
              "리포트 내용을 보시고 추가로 궁금한 점이 있나요?\n아래 키워드 선택 또는 질문해주시면, 더 많은 인사이트를 제공해 드릴게요! 😊",
            expertIndex: selectedExpertIndex,
          },
          { type: `keyword` }
        );
        setConversationStage(3);
        setConversation(updatedConversation);

        setButtonState({
          ...buttonState,
          surveyEnd: 1,
        });

        await saveConversation(
          { changingConversation: { 
              conversation: updatedConversation, 
              conversationStage: 3, 
              surveyGuidelineReportData: response.data.survey_guideline_report[0],
              buttonState : {
                ...buttonState,
                surveyEnd: 1,
              },
           } }
        );
      }
    };

    fetchIdeaList();
  }, [surveyGuidelineButtonState]);

  return (
    <Wrap>
      {isLoadingSurveyGuideline || surveyGuidelineButtonState ? (
        <>
          <SkeletonTitle className="title-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <Spacing />
          <SkeletonTitle className="title-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <Spacing />
          <SkeletonTitle className="title-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <SkeletonLine className="content-placeholder" />
        </>
      ) : (
        <>
          <h1>맞춤형 조사 설계 보고서</h1>
            <SeparateSection>
              <strong_title>
                <span className="number">1</span>
                {surveyGuidelineReportData.method_1.title}
                <DownloadButton
                  className={`download-button`}
                  ref={buttonRef}
                  onClick={(event) => handleOpenModal(0, event)}
                  disabled={loading}
                  isModalOpen={isModalOpen[0]}
                >
                  {loading ? downloadStatus : "다운로드"}
                </DownloadButton>
              </strong_title>
              <content>
              <ol className="list-disc">
                  <li key="1">
                    조사 목표: {surveyGuidelineReportData.method_1.survey_goal}
                  </li>
                  <li key="2">
                    대상 및 채널: {surveyGuidelineReportData.method_1.survey_target.target_person}, {surveyGuidelineReportData.method_1.channels_and_collection_methods.channels}
                  </li>
                  <li key="3">
                    데이터 수집 및 분석: {surveyGuidelineReportData.method_1.channels_and_collection_methods.collection_methods}
                  </li>
              </ol>
              </content>
              {isModalOpen[0] && (
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
                          </div>
                          {/* <div
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
                )}
            </SeparateSection>
            <SeparateSection>
            <strong_title>
                <span className="number">2</span>
                {surveyGuidelineReportData.method_2.title}
                <DownloadButton
                  className={`download-button`}
                  ref={buttonRef}
                  onClick={(event) => handleOpenModal(1, event)}
                  disabled={loading}
                  isModalOpen={isModalOpen[1]}
                >
                  {loading ? downloadStatus : "다운로드"}
                </DownloadButton>
              </strong_title>
              <content>
              <ol className="list-disc">
                  <li key="1">
                    조사 목표: {surveyGuidelineReportData.method_2.survey_goal}
                  </li>
                  <li key="2">
                    대상 및 채널: {surveyGuidelineReportData.method_2.survey_target.target_person}, {surveyGuidelineReportData.method_2.channels_and_collection_methods.channels}
                  </li>
                  <li key="3">
                    데이터 수집 및 분석: {surveyGuidelineReportData.method_2.channels_and_collection_methods.collection_methods}
                  </li>
              </ol>
              </content>
              {isModalOpen[1] && (
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
                          {/* <div
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
                )}
            </SeparateSection>
            <SeparateSection>
            <strong_title>
                <span className="number">3</span>
                {surveyGuidelineReportData.method_3.title}
                <DownloadButton
                  className={`download-button`}
                  ref={buttonRef}
                  onClick={(event) => handleOpenModal(2, event)}
                  disabled={loading}
                  isModalOpen={isModalOpen[2]}
                >
                  {loading ? downloadStatus : "다운로드"}
                </DownloadButton>
              </strong_title>
              <content>
              <ol className="list-disc">
                  <li key="1">
                    조사 목표: {surveyGuidelineReportData.method_3.survey_goal}
                  </li>
                  <li key="2">
                    대상 및 채널: {surveyGuidelineReportData.method_3.survey_target.target_person}, {surveyGuidelineReportData.method_3.channels_and_collection_methods.channels}
                  </li>
                  <li key="3">
                    데이터 수집 및 분석: {surveyGuidelineReportData.method_3.channels_and_collection_methods.collection_methods}
                  </li>
              </ol>
              </content>
              {isModalOpen[2] && (
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
                          {/* <div
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
                )}
            </SeparateSection>

      <MoleculeReportController
        reportIndex={10}
        sampleData={surveyGuidelineReportData}
        />
      </>
      )}

    </Wrap>
  );
};

export default OrganismSurveyGuidelineReport;

const Wrap = styled.div`
  max-width:986px;
  width:100%;
  display:flex;
  flex-direction:column;
  padding: 28px;
  margin:24px 0 0 44px;
  border-radius:15px;
  border:1px solid ${palette.lineGray};

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

const SeparateSection = styled.div`
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

const DownloadButton = styled.button`
  position: absolute; /* 절대 위치 */
  top: 14px;
  right: 20px; /* 오른쪽 끝으로 배치 */
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: Pretendard, Poppins;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${(props) => (props.isModalOpen ? palette.blue : palette.gray500)};
  padding: 8px 0;
  border: none;
  background: none;
  cursor: pointer;
  z-index: 9;
  transition: all 0.5s;

  &:after {
    width: 16px;
    height: 16px;
    ${(props) =>
      props.isModalOpen
        ? `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.9668 1.91406C5.08247 1.91406 1.93359 5.06293 1.93359 8.94727C1.93359 12.8316 5.08247 15.9805 8.9668 15.9805C12.8511 15.9805 16 12.8316 16 8.94727C16 5.06293 12.8511 1.91406 8.9668 1.91406ZM0.933594 8.94727C0.933594 4.51065 4.53018 0.914062 8.9668 0.914062C13.4034 0.914062 17 4.51065 17 8.94727C17 13.3839 13.4034 16.9805 8.9668 16.9805C4.53018 16.9805 0.933594 13.3839 0.933594 8.94727Z' fill='%230453F4'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.51499 9.30487C6.32573 9.49131 6.32573 9.79807 6.51499 9.98451L8.6359 12.0738C8.81967 12.2548 9.1139 12.2548 9.29767 12.0738L11.4186 9.98451C11.6078 9.79807 11.6078 9.49131 11.4186 9.30487C11.2348 9.12384 10.9406 9.12384 10.7568 9.30487L9.43962 10.6024V6.15919C9.43962 5.88712 9.2187 5.68359 8.96679 5.68359C8.71487 5.68359 8.49395 5.88712 8.49395 6.15919V10.6024L7.17677 9.30487C6.99299 9.12384 6.69877 9.12384 6.51499 9.30487Z' fill='%230453F4'/%3E%3C/svg%3E");`
        : `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.9668 1.91406C5.08247 1.91406 1.93359 5.06293 1.93359 8.94727C1.93359 12.8316 5.08247 15.9805 8.9668 15.9805C12.8511 15.9805 16 12.8316 16 8.94727C16 5.06293 12.8511 1.91406 8.9668 1.91406ZM0.933594 8.94727C0.933594 4.51065 4.53018 0.914062 8.9668 0.914062C13.4034 0.914062 17 4.51065 17 8.94727C17 13.3839 13.4034 16.9805 8.9668 16.9805C4.53018 16.9805 0.933594 13.3839 0.933594 8.94727Z' fill='%238c8c8c'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.51499 9.30487C6.32573 9.49131 6.32573 9.79807 6.51499 9.98451L8.6359 12.0738C8.81967 12.2548 9.1139 12.2548 9.29767 12.0738L11.4186 9.98451C11.6078 9.79807 11.6078 9.49131 11.4186 9.30487C11.2348 9.12384 10.9406 9.12384 10.7568 9.30487L9.43962 10.6024V6.15919C9.43962 5.88712 9.2187 5.68359 8.96679 5.68359C8.71487 5.68359 8.49395 5.88712 8.49395 6.15919V10.6024L7.17677 9.30487C6.99299 9.12384 6.69877 9.12384 6.51499 9.30487Z' fill='%238c8c8c'/%3E%3C/svg%3E");`}
    background-size:cover;
    transition: all 0.5s;
    content: "";
  }

  &:hover {
    color: ${palette.blue};

    &:after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.9668 1.91406C5.08247 1.91406 1.93359 5.06293 1.93359 8.94727C1.93359 12.8316 5.08247 15.9805 8.9668 15.9805C12.8511 15.9805 16 12.8316 16 8.94727C16 5.06293 12.8511 1.91406 8.9668 1.91406ZM0.933594 8.94727C0.933594 4.51065 4.53018 0.914062 8.9668 0.914062C13.4034 0.914062 17 4.51065 17 8.94727C17 13.3839 13.4034 16.9805 8.9668 16.9805C4.53018 16.9805 0.933594 13.3839 0.933594 8.94727Z' fill='%230453F4'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.51499 9.30487C6.32573 9.49131 6.32573 9.79807 6.51499 9.98451L8.6359 12.0738C8.81967 12.2548 9.1139 12.2548 9.29767 12.0738L11.4186 9.98451C11.6078 9.79807 11.6078 9.49131 11.4186 9.30487C11.2348 9.12384 10.9406 9.12384 10.7568 9.30487L9.43962 10.6024V6.15919C9.43962 5.88712 9.2187 5.68359 8.96679 5.68359C8.71487 5.68359 8.49395 5.88712 8.49395 6.15919V10.6024L7.17677 9.30487C6.99299 9.12384 6.69877 9.12384 6.51499 9.30487Z' fill='%230453F4'/%3E%3C/svg%3E");
    }
  }
`;
const DownloadPopup = styled.div`
  position: absolute;
  right: ${(props) => (props.isAutoSaveToggle ? "0" : "-70px")};
  top: 120px;
  max-width: 288px;
  width: 100%;
  max-height: 400px; /* 팝업의 최대 높이를 적절히 설정 */
  padding: ${(props) => (props.isAutoSaveToggle ? "0" : "24px 20px 20px")};
  border-radius: 15px;
  background: ${palette.white};
  box-shadow: 0 4px 28px rgba(0, 0, 0, 0.05);
  visibility: ${(props) => (props.isAutoSaveToggle ? "hidden" : "visible")};
  opacity: ${(props) => (props.isAutoSaveToggle ? "0" : "1")};
  transition: opacity 0.3s ease, visibility 0.3s ease; /* 트랜지션 추가 */
  z-index: 99;

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

  > div {
    display: flex;
    flex-direction: column;
    gap: 16px;
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