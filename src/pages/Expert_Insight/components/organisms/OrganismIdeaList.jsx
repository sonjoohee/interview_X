import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import axios from "axios";
import { Document, Packer, Paragraph, TextRun } from "docx"; // docx 라이브러리 임포트
import * as XLSX from 'xlsx';
import { saveAs } from "file-saver"; // file-saver를 사용하여 파일 저장
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  IDEA_LIST_BUTTON_STATE,
  IDEA_FEATURE_DATA,
  IDEA_REQUIREMENT_DATA,
  IDEA_LIST,
  IDEA_GROUP,
  IDEA_MIRO_STATE,
  CONVERSATION_STAGE,
  CONVERSATION_ID,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import {
  SkeletonTitle,
  SkeletonLine,
  Spacing,
} from "../../../../assets/styles/Skeleton";

import images from "../../../../assets/styles/Images";

const OrganismIdeaList = () => {
  const [conversationId] = useAtom(CONVERSATION_ID);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const { saveConversation } = useSaveConversation();
  const [ideaMiroState, setIdeaMiroState] = useAtom(IDEA_MIRO_STATE);
  const [isModalOpen, setIsModalOpen] = useState({});
  const [ideaFeatureData] = useAtom(IDEA_FEATURE_DATA);
  const [ideaRequirementData] = useAtom(IDEA_REQUIREMENT_DATA);
  const [conversation, setConversation] = useAtom(CONVERSATION);
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

  const [ideaListButtonState, setIdeaListButtonState] = useAtom(IDEA_LIST_BUTTON_STATE);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [isLoadingIdeaList, setIsLoadingIdeaList] = useState(false);
  const [isLoadingIdeaMiro, setIsLoadingIdeaMiro] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("Excel");
  const [selectedLanguage, setSelectedLanguage] = useState("한글");
  const [isPopupOpenDownload, setIsPopupOpenDownload] = useState(false);
  const popupRef = useRef(null); // 팝업 요소를 참조하는 useRef 생성

  const [ideaList, setIdeaList] = useAtom(IDEA_LIST);
  const [ideaGroup, setIdeaGroup] = useAtom(IDEA_GROUP);

  const [loadingDownload, setLoadingDownload] = useState(false);

  const togglePopupDownload = () => {
    setIsPopupOpenDownload(!isPopupOpenDownload);
  };
  
  const axiosConfig = {
    timeout: 100000000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  }
  const handleFormatChange = (format) => {
    setSelectedFormat(format);
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

  const handleDownload = () => {
    setLoadingDownload(true);
    if (selectedFormat === 'Excel') {

    // 데이터 준비
    const requirements = [...new Set(ideaList.map(item => item.report.customer_requirement))];
    const features = [...new Set(ideaList.flatMap(item => item.report.ideas.map(idea => idea.feature)))];
    
    // 2D 배열 생성 (엑셀 시트 데이터)
    const data = [
      ['', ...features], // 첫 번째 행: 빈 셀 + Feature 목록
      ...requirements.map(req => [req]) // 각 행의 첫 번째 열: Customer Requirement
    ];

    // 데이터 채우기
    requirements.forEach((req, reqIndex) => {
      features.forEach((feat, featIndex) => {
        const ideas = ideaList
          .find(item => item.report.customer_requirement === req)?.report.ideas
          .find(idea => idea.feature === feat)?.ideas || [];
        
        const cellContent = ideas.map(idea => `${idea.name}: ${idea.description}`).join('\n\n');
        data[reqIndex + 1][featIndex + 1] = cellContent;
      });
    });

    // 워크북 생성
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);

    // 셀 스타일 설정
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = {c:C, r:R};
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        if (!ws[cell_ref]) continue;
        ws[cell_ref].s = {
          alignment: {wrapText: true, vertical: 'top'},
          font: {name: 'Arial', sz: 11}
        };
      }
    }

    // 열 너비 설정
    const colWidths = [30, ...features.map(() => 30)];
    ws['!cols'] = colWidths.map(wch => ({wch}));

    // 워크시트를 워크북에 추가
    XLSX.utils.book_append_sheet(wb, ws, "Ideas");

    // 엑셀 파일 생성 및 다운로드
    XLSX.writeFile(wb, "idea_matrix.xlsx");

    setTimeout(() => {
      setLoadingDownload(false);
    }, 2000);
  } else if (selectedFormat === 'Word') {
    // Word 문서 생성 로직
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun("아이디어 목록")],
          }),
          // 요구사항과 특징에 따라 아이디어 구조화
          ...ideaList.flatMap(item => [
            new Paragraph({
              children: [new TextRun(`요구사항: ${item.report.customer_requirement}`)],
            }),
            ...item.report.ideas.flatMap(ideaGroup => [
              new Paragraph({
                children: [new TextRun(`특징: ${ideaGroup.feature}`)],
              }),
              ...ideaGroup.ideas.map(idea => 
                new Paragraph({
                  children: [
                    new TextRun(`${idea.name}: `),
                    new TextRun({
                      text: idea.description,
                    })
                  ],
                  bullet: {
                    level: 0
                  }
                })
              ),
              new Paragraph({}) // 빈 줄 추가
            ])
          ])
        ]
      }]
    });
  
    // Word 문서 생성 및 다운로드
    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "idea_list.docx");
      setTimeout(() => {
        setLoadingDownload(false);
      }, 2000);
    });
  };
}

const handleMiro = async () => {
  try {
    // let newIdeaList = [];
    // let req, feat;
    // let miroUrl;

    // for (let i = 0; i < ideaList.length; i++) {
    //   req = ideaList[i].requirement;

    //   for (let j = 0; j < ideaList[i].report.ideas.length; j++) {
    //     feat = ideaList[i].report.ideas[j].feature;

    //     for (let k = 0; k < ideaList[i].report.ideas[j].ideas.length; k++) {
    //       newIdeaList.push({
    //         requirement: req, 
    //         feature: feat, 
    //         ideas: ideaList[i].report.ideas[j].ideas[k].name
    //       });
    //     }
    //   }
    // }

    // const chunkArray = (array, chunkSize) => {
    //   const chunks = [];
    //   for (let i = 0; i < array.length; i += chunkSize) {
    //     chunks.push(array.slice(i, i + chunkSize));
    //   }
    //   return chunks;
    // };

    // const ideaChunks = chunkArray(newIdeaList, 15);

    // for (const chunk of ideaChunks) {
    //   const data = {
    //     expert_id: "5",
    //     dev_report: chunk,
    //   };

    //   const response = await axios.post(
    //     "https://wishresearch.kr/panels/idea_miro",
    //     data,
    //     axiosConfig
    //   );

    //   setIdeaMiroState(response.data);
    //   miroUrl = response.data;
    // }

    const data = {
      chatGetId: conversationId,
      expert_id: "5",
      business_info: titleOfBusinessInfo,
      business_analysis_data: {
        명칭: titleOfBusinessInfo,
        주요_목적_및_특징: mainFeaturesOfBusinessInformation,
        주요기능: mainCharacteristicOfBusinessInformation,
        목표고객: businessInformationTargetCustomer,
      },
      dev_report: ideaList,
      dev_cluster_report: ideaGroup,
    };

    const response = await axios.post(
      "https://wishresearch.kr/panels/idea_miro",
      data,
      axiosConfig
    );

    setIdeaMiroState(response.data.miro_state);

    setConversationStage(3);

    await saveConversation(
      { changingConversation: { conversationStage: 3, ideaMiroState : response.data.miro_state } }
    );

    // if (typeof miroUrl === 'string' && /^https?:\/\/.+\..+/.test(miroUrl)) {
    //   window.open(miroUrl, '_blank');
    // } else {
    //   console.error("유효하지 않은 URL입니다:", miroUrl);
    // }

  } catch (error) {
   // console.error("Error loading Idea List:", error);
  } finally {
    // 5분 후에 ideaMiroState를 0으로 설정
    setTimeout(() => {
      setIdeaMiroState(0);
    }, 300000);
  }
}

useEffect(() => {
  const fetchIdeaList = async () => {
    try {
      if(ideaListButtonState) {
        setIsLoading(true);
        setIsLoadingIdeaList(true);

        let responseIdea;
        let finalResponseIdea = {
          "dev_report": []
        }

        let responseGroup;
        let retryCount = 0;
        let maxRetries = 10;

        for (let i = 0; i < ideaRequirementData.length; i++) {
          const data = {
            expert_id: "5",
            business_info: titleOfBusinessInfo,
            business_analysis_data: {
              명칭: titleOfBusinessInfo,
              주요_목적_및_특징: mainFeaturesOfBusinessInformation,
              주요기능: mainCharacteristicOfBusinessInformation,
              목표고객: businessInformationTargetCustomer,
            },
            tabs: [],
            page_index: 1,
            feature_requirements_list: {
              feature: ideaFeatureData,
              requirements: [ideaRequirementData[i]],
            }
          };
  
          responseIdea = await axios.post(
            "https://wishresearch.kr/panels/idea_dev",
            data,
            axiosConfig
          );

          while (retryCount < maxRetries && 
            (!responseIdea || !responseIdea.data || typeof responseIdea.data !== "object" ||
            !responseIdea.data.hasOwnProperty("dev_report") || !Array.isArray(responseIdea.data.dev_report) ||
            responseIdea.data.dev_report.some(item =>
              !item.hasOwnProperty("requirement") ||
              !item.hasOwnProperty("report") ||
              typeof item.report !== "object" ||
              !item.report.hasOwnProperty("customer_requirement") ||
              !item.report.hasOwnProperty("ideas") ||
              !Array.isArray(item.report.ideas) ||
              item.report.ideas.some(idea => 
                !idea.hasOwnProperty("feature") ||
                !Array.isArray(idea.ideas) ||
                idea.ideas.some(subIdea => 
                  !subIdea.hasOwnProperty("name") ||
                  !subIdea.hasOwnProperty("description")
                )
              )
            ))) {
            responseIdea = await axios.post(
              "https://wishresearch.kr/panels/idea_dev",
              data,
              axiosConfig
            );
            retryCount++;
          }
          if (retryCount === maxRetries) {
           // console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
            // 에러 처리 로직 추가
            throw new Error("Maximum retry attempts reached. Empty responseIdea persists.");
          }

          finalResponseIdea.dev_report.push(...responseIdea.data.dev_report);
        }
        setIdeaList(finalResponseIdea.dev_report);

        retryCount = 0;
        maxRetries = 10;

        const data2 = {
          expert_id: "5",
          business_info: titleOfBusinessInfo,
          business_analysis_data: {
            명칭: titleOfBusinessInfo,
            주요_목적_및_특징: mainFeaturesOfBusinessInformation,
            주요기능: mainCharacteristicOfBusinessInformation,
            목표고객: businessInformationTargetCustomer,
          },
          dev_report: finalResponseIdea.dev_report
        };

        responseGroup = await axios.post(
          "https://wishresearch.kr/panels/idea_group",
          data2,
          axiosConfig
        );

        while (retryCount < maxRetries && (
          !responseGroup || !responseGroup.data || typeof responseGroup.data !== "object" ||
          !responseGroup.data.hasOwnProperty("dev_cluster_report") ||
          !responseGroup.data.dev_cluster_report.hasOwnProperty("group_data") ||
          !responseGroup.data.dev_cluster_report.hasOwnProperty("priority_evaluation") ||
          !Array.isArray(responseGroup.data.dev_cluster_report.group_data) ||
          responseGroup.data.dev_cluster_report.group_data.some(item => 
            !item.hasOwnProperty("group") || 
            !item.hasOwnProperty("title") ||
            !item.hasOwnProperty("core_content") || 
            !item.hasOwnProperty("key_features") ||
            !item.hasOwnProperty("total_idea_count") || 
            !item.hasOwnProperty("required_departments")
          ) ||
          !Array.isArray(responseGroup.data.dev_cluster_report.priority_evaluation) ||
          responseGroup.data.dev_cluster_report.priority_evaluation.some(item => 
            !item.hasOwnProperty("group") || 
            !item.hasOwnProperty("criteria") ||
            !item.hasOwnProperty("total_score")
          )
        )) {
          responseGroup = await axios.post(
            "https://wishresearch.kr/panels/idea_group",
            data2,
            axiosConfig
          );
          retryCount++;
        }
        if (retryCount === maxRetries) {
         // console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
          // 에러 처리 로직 추가
          throw new Error("Maximum retry attempts reached. Empty responseGroup persists.");
        }

        setIdeaGroup(responseGroup.data.dev_cluster_report);

        setIsLoading(false);
        setIsLoadingIdeaList(false);
        setIdeaListButtonState(0);

        const updatedConversation = [...conversation];

        updatedConversation.push(
          {
            type: "system",
            message: "많은 아이디어 중에서 무엇을 우선적으로 실행할지 결정할 수 있도록, 우선순위를 확인해드리겠습니다.",
            expertIndex: selectedExpertIndex,
          },
          {
            type: 'ideaPriorityButton',
          },
        );
        setConversation(updatedConversation);

        await saveConversation(
          { changingConversation: { conversation: updatedConversation, conversationStage: 3, ideaList : finalResponseIdea.dev_report, ideaGroup : responseGroup.data.dev_cluster_report, } }
        );
      }
    } catch (error) {
     // console.error("Error loading Idea List:", error);
    }
  };

  fetchIdeaList();
}, [ideaListButtonState]); // useEffect의 끝

  const countIdea = (ideaList) => {
    let nameCount = 0;
    ideaList.forEach(item => {
      item.report.ideas.forEach(idea => {
        nameCount += idea.ideas.length;
      });
    });
    return nameCount;
  }

  return (
    <Wrap>
      {isLoadingIdeaList || ideaListButtonState ? (
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
          <h1>{titleOfBusinessInfo}를 위한 아이디어 리스트</h1>
          <p>총 {countIdea(ideaList)}개의 아이디어를 도출하였으며, 유사한 아이디어들을 묶어 {ideaGroup.group_data.length}개의 그룹으로 나눌 수 있었습니다.</p>

        <IdeaList>
          {ideaGroup.group_data.map((item) => (
            <li key={item.group}>
              <span>{item.group}</span>
              <div>
                <strong>{item.title} ({item.total_idea_count}건)</strong>
                <p>{item.core_content}</p>
                </div>
              </li>
              ))}
        </IdeaList>
        <DownloadButton ideaMiroState={ideaMiroState}>
          <p>
            <img src={images.IconEdit3} alt="" />
            자료 (2건)
          </p>
          <div>
            <button className={'download-button'} onClick={togglePopupDownload}>
              <img src={images.IconDownload2} alt="" />
              <div>
                <strong>전체 아이디어 다운로드</strong>
                <span>1.8 MB · Download</span>
              </div>
            </button>
            <button className="miro-button" onClick={handleMiro}>
              <img src={images.IconDownloadMiro} alt="" />
              <div>
                <strong>{ideaMiroState === 1 ? "워크스페이스 생성 중..." : "Miro에서 협업하기"}</strong>
                <span>{ideaMiroState === 1 ? "약 5분 후에 링크가 메일로 발송됩니다" : "www.miro.com"}</span>
              </div>
            </button>
          </div>
        </DownloadButton>

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
            <h3>아이디어 리스트 다운로드</h3>
            <SelectBoxWrap>
                <label>포맷 선택 (택1)</label>
                <SelectBox>
                  <div
                    className={`${
                      selectedFormat === "Excel" ? "selected" : ""
                    }`}
                    onClick={() => handleFormatChange("Excel")}
                  >
                    {selectedFormat === "Excel" ? (
                      <img src={images.ImgExcel2} alt="" /> //여기 이미지만 엑셀이미지로 바꾸면됨
                    ) : (
                      <img src={images.ImgExcel} alt="" /> //여기 이미지만 엑셀이미지로 바꾸면됨
                    )}
                    Excel
                  </div>
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
              <button onClick={handleDownload} disabled={loadingDownload}>
                {loadingDownload
                  ? "다운로드 중..."
                  : "다운로드"}
              </button>
            </div>
          </div>
        </DownloadPopup>
      )}
      </>
      )}
    </Wrap>
  );
};

export default OrganismIdeaList;

const Wrap = styled.div`
  position:relative;
  max-width:756px;
  // width:100%;
  display:flex;
  flex-direction:column;
  padding: 20px;
  margin:24px 0 0 50px;
  border-radius:15px;
  border:1px solid ${palette.outlineGray};

  h1 {
    font-size:1rem;
    font-weight:700;
    text-align:left;
    padding-bottom:8px;
    margin-bottom:16px;
    border-bottom:1px solid ${palette.lineGray};
  }

  p {
    font-size:0.88rem;
    color:${palette.gray500};
    text-align:left;
  }
`;

const IdeaList = styled.ul`
  display:flex;
  flex-direction:column;
  gap:4px;
  margin-top:16px;

  li {
    display:flex;
    gap:8px;
    padding:8px;
    border-radius:12px;
    background:${palette.chatGray};

    > div {
      min-width:0;
      text-align:left;
    }
  }

  span {
    width:27px;
    height:27px;
    font-size:0.88rem;
    color:${palette.gray700};
    line-height:26px;
    text-align:center;
    flex-shrink:0;
    border-radius:100%;
    border:1px solid ${palette.lineGray};
    background:${palette.white};
  }

  div {
    display:flex;
    flex-direction:column;
    gap:4px;

    strong {
      font-size:0.88rem;
      font-weight:normal;
      line-height:27px;
      color:${palette.gray800};
    }

    p {
      font-size:0.63rem;
      color:${palette.gray700};
      line-height:15px;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
  }
`;

const DownloadButton = styled.div`
  display:flex;
  flex-direction:column;
  gap:8px;
  margin-top:20px;

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

  .miro-button {
    cursor: ${(props) => (props.ideaMiroState === 1 ? "default" : "pointer")};
    pointer-events: ${(props) => (props.ideaMiroState === 1 ? "none" : "auto")};
  }
`;

const DownloadPopup = styled.div`
  position: absolute;
  // right: ${(props) => (props.isAutoSaveToggle ? "0" : "-70px")};
  // top: 3100px;
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
