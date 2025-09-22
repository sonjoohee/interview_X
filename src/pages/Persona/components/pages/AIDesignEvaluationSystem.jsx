// import React, { useState, useRef, useEffect } from "react";
// import { useAtom } from "jotai";
// import * as S from "./styles";
// import * as Stage4S from "./stage4Styles";
// import {
//   // Stage management
//   currentStageAtom,
//   isTransitioningAtom,

//   // Stage 1 data
//   evaluationTypeAtom,
//   subOptionAtom,
//   customInputAtom,
//   isAnalyzingAtom,
//   analysisResultsAtom,
//   quantitativeOptionsAtom,
//   qualitativeOptionsAtom,
//   comparativeOptionsAtom,
//   isStage1CompleteAtom,

//   // Stage 2 data
//   fileAtom,
//   filePreviewAtom,
//   uploadStatusAtom,
//   uploadProgressAtom,
//   designTitleAtom,
//   designTypeAtom,
//   designTypeOptionsAtom,
//   isTypeDropdownOpenAtom,
//   designPurposeAtom,
//   isStage2CompleteAtom,

//   // Modal states
//   showBackConfirmModalAtom,

//   // Stage 3 data
//   isEvaluatingAtom,
//   evaluationProgressAtom,
//   evaluationResultsAtom,
//   evaluationCategoriesAtom,
//   selectedFeedbackCategoryAtom,
//   feedbackRecommendationsAtom,
//   showExportModalAtom,
//   exportFormatAtom,

//   // Stage 4 state
//   selectedMethodologyAtom,
//   methodologiesAtom,
//   showMethodologyDetailModalAtom,
//   activeDetailMethodologyAtom,
//   heuristicPrinciplesAtom,
//   susQuestionsAtom,
//   customMethodologyAtom,
//   isStage4CompleteAtom,
//   showHeuristicDetailsAtom,
//   showSusDetailsAtom,
//   isStage4TransitioningAtom,

//   // Advanced stages atoms
//   stage5GenerationProgressAtom,
//   isStage5GeneratingAtom,
//   stage5EvaluationDesignAtom,
//   showEditItemModalAtom,
//   currentEditingItemAtom,
//   showEditOverviewModalAtom,
//   editingOverviewAtom,
//   showAddItemModalAtom,
//   newItemAtom,
//   suggestedItemsAtom,
//   stage6EvaluationProgressAtom,
//   isStage6EvaluatingAtom,
//   currentEvaluatingItemAtom,
//   completedItemsAtom,
//   showHeatmapDetailModalAtom,
//   showStrengthsDetailModalAtom,
//   showWeaknessesDetailModalAtom,
//   selectedTabAtom,
//   showDetailedResultsAtom,
//   selectedCategoryAtom,
//   stage7ScoresAtom,
//   showAddFeedbackAtom,
//   feedbackTextAtom,
//   isStage5CompleteAtom,
//   isStage6CompleteAtom,
//   isStage7CompleteAtom,
// } from "./atoms";

// const AIDesignEvaluationSystem = () => {
//   // Global state
//   const [currentStage, setCurrentStage] = useAtom(currentStageAtom);
//   const [isTransitioning, setIsTransitioning] = useAtom(isTransitioningAtom);

//   // Stage 1 state
//   const [evaluationType, setEvaluationType] = useAtom(evaluationTypeAtom);
//   const [subOption, setSubOption] = useAtom(subOptionAtom);
//   const [customInput, setCustomInput] = useAtom(customInputAtom);
//   const [isAnalyzing, setIsAnalyzing] = useAtom(isAnalyzingAtom);
//   const [analysisResults, setAnalysisResults] = useAtom(analysisResultsAtom);
//   const [quantitativeOptions] = useAtom(quantitativeOptionsAtom);
//   const [qualitativeOptions] = useAtom(qualitativeOptionsAtom);
//   const [comparativeOptions] = useAtom(comparativeOptionsAtom);
//   const [isStage1Complete] = useAtom(isStage1CompleteAtom);

//   // Stage 2 state
//   const [file, setFile] = useAtom(fileAtom);
//   const [filePreview, setFilePreview] = useAtom(filePreviewAtom);
//   const [uploadStatus, setUploadStatus] = useAtom(uploadStatusAtom);
//   const [uploadProgress, setUploadProgress] = useAtom(uploadProgressAtom);
//   const [designTitle, setDesignTitle] = useAtom(designTitleAtom);
//   const [designType, setDesignType] = useAtom(designTypeAtom);
//   const [designTypeOptions] = useAtom(designTypeOptionsAtom);
//   const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useAtom(
//     isTypeDropdownOpenAtom
//   );
//   const [designPurpose, setDesignPurpose] = useAtom(designPurposeAtom);
//   const [isStage2Complete] = useAtom(isStage2CompleteAtom);

//   // Modal state
//   const [showBackConfirmModal, setShowBackConfirmModal] = useAtom(
//     showBackConfirmModalAtom
//   );

//   // Refs
//   const fileInputRef = useRef(null);
//   const uploadAreaRef = useRef(null);

//   // Stage 3 state
//   const [isEvaluating, setIsEvaluating] = useAtom(isEvaluatingAtom);
//   const [evaluationProgress, setEvaluationProgress] = useAtom(
//     evaluationProgressAtom
//   );
//   const [evaluationResults, setEvaluationResults] = useAtom(
//     evaluationResultsAtom
//   );
//   const [evaluationCategories, setEvaluationCategories] = useAtom(
//     evaluationCategoriesAtom
//   );
//   const [selectedFeedbackCategory, setSelectedFeedbackCategory] = useAtom(
//     selectedFeedbackCategoryAtom
//   );
//   const [feedbackRecommendations, setFeedbackRecommendations] = useAtom(
//     feedbackRecommendationsAtom
//   );
//   const [showExportModal, setShowExportModal] = useAtom(showExportModalAtom);
//   const [exportFormat, setExportFormat] = useAtom(exportFormatAtom);

//   // Stage 4 state
//   const [selectedMethodology, setSelectedMethodology] = useAtom(
//     selectedMethodologyAtom
//   );
//   const [methodologies] = useAtom(methodologiesAtom);
//   const [showMethodologyDetailModal, setShowMethodologyDetailModal] = useAtom(
//     showMethodologyDetailModalAtom
//   );
//   const [activeDetailMethodology, setActiveDetailMethodology] = useAtom(
//     activeDetailMethodologyAtom
//   );
//   const [heuristicPrinciples, setHeuristicPrinciples] = useAtom(
//     heuristicPrinciplesAtom
//   );
//   const [susQuestions, setSusQuestions] = useAtom(susQuestionsAtom);
//   const [customMethodology, setCustomMethodology] = useAtom(
//     customMethodologyAtom
//   );
//   const [isStage4Complete] = useAtom(isStage4CompleteAtom);
//   const [showHeuristicDetails, setShowHeuristicDetails] = useAtom(
//     showHeuristicDetailsAtom
//   );
//   const [showSusDetails, setShowSusDetails] = useAtom(showSusDetailsAtom);
//   const [isStage4Transitioning, setIsStage4Transitioning] = useAtom(
//     isStage4TransitioningAtom
//   );

//   // Stage 5 state
//   const [stage5GenerationProgress, setStage5GenerationProgress] = useAtom(
//     stage5GenerationProgressAtom
//   );
//   const [isStage5Generating, setIsStage5Generating] = useAtom(
//     isStage5GeneratingAtom
//   );
//   const [stage5EvaluationDesign, setStage5EvaluationDesign] = useAtom(
//     stage5EvaluationDesignAtom
//   );
//   const [showEditItemModal, setShowEditItemModal] = useAtom(
//     showEditItemModalAtom
//   );
//   const [currentEditingItem, setCurrentEditingItem] = useAtom(
//     currentEditingItemAtom
//   );
//   const [showEditOverviewModal, setShowEditOverviewModal] = useAtom(
//     showEditOverviewModalAtom
//   );
//   const [editingOverview, setEditingOverview] = useAtom(editingOverviewAtom);
//   const [showAddItemModal, setShowAddItemModal] = useAtom(showAddItemModalAtom);
//   const [newItem, setNewItem] = useAtom(newItemAtom);
//   const [suggestedItems] = useAtom(suggestedItemsAtom);

//   // Stage 6 state
//   const [stage6EvaluationProgress, setStage6EvaluationProgress] = useAtom(
//     stage6EvaluationProgressAtom
//   );
//   const [isStage6Evaluating, setIsStage6Evaluating] = useAtom(
//     isStage6EvaluatingAtom
//   );
//   const [currentEvaluatingItem] = useAtom(currentEvaluatingItemAtom);
//   const [completedItems] = useAtom(completedItemsAtom);
//   const [showHeatmapDetailModal, setShowHeatmapDetailModal] = useAtom(
//     showHeatmapDetailModalAtom
//   );
//   const [showStrengthsDetailModal, setShowStrengthsDetailModal] = useAtom(
//     showStrengthsDetailModalAtom
//   );
//   const [showWeaknessesDetailModal, setShowWeaknessesDetailModal] = useAtom(
//     showWeaknessesDetailModalAtom
//   );
//   const [selectedTab, setSelectedTab] = useAtom(selectedTabAtom);
//   const [showDetailedResults, setShowDetailedResults] = useAtom(
//     showDetailedResultsAtom
//   );
//   const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

//   // Stage 7 state
//   const [stage7Scores, setStage7Scores] = useAtom(stage7ScoresAtom);
//   const [showAddFeedback, setShowAddFeedback] = useAtom(showAddFeedbackAtom);
//   const [feedbackText, setFeedbackText] = useAtom(feedbackTextAtom);

//   // Stage validation
//   const [isStage5Complete] = useAtom(isStage5CompleteAtom);
//   const [isStage6Complete] = useAtom(isStage6CompleteAtom);
//   const [isStage7Complete, setIsStage7Complete] = useAtom(isStage7CompleteAtom);

//   // Local state for sliders
//   const [sliderDragging, setSliderDragging] = useState(false);
//   const [dragStartX, setDragStartX] = useState(0);
//   const [dragStartValue, setDragStartValue] = useState(0);

//   // Stage 4 local state - 이 부분을 컴포넌트 레벨로 이동
//   const [showAllHeuristicPrinciples, setShowAllHeuristicPrinciples] =
//     useState(false);
//   const [showAllSusQuestions, setShowAllSusQuestions] = useState(false);

//   // 평가 옵션 상태
//   const [evaluationOptions, setEvaluationOptions] = useState({
//     usability: true,
//     accessibility: false,
//     aesthetics: true,
//   });

//   // 평가 준비 상태
//   const [isEvaluationReady, setIsEvaluationReady] = useState(true);

//   // 평가 옵션 토글 함수
//   const toggleEvaluationOption = (option) => {
//     setEvaluationOptions({
//       ...evaluationOptions,
//       [option]: !evaluationOptions[option],
//     });
//   };

//   // Function to handle evaluation type selection (Stage 1)
//   const handleEvaluationTypeSelect = (type) => {
//     setEvaluationType(type);
//     setSubOption(null);
//     // Clear analysis results if they exist
//     if (analysisResults) {
//       setAnalysisResults(null);
//     }
//   };

//   // Function to handle sub-option selection (Stage 1)
//   const handleSubOptionSelect = (option) => {
//     setSubOption(option);
//   };

//   // Function to handle analysis button click (Stage 1)
//   const handleAnalyze = () => {
//     if (customInput.trim() === "") return;

//     setIsAnalyzing(true);

//     // Simulate AI analysis with a timeout
//     setTimeout(() => {
//       setIsAnalyzing(false);
//       setAnalysisResults({
//         recommendedType: "quantitative",
//         secondaryRecommendation: "comparative",
//         explanation:
//           "입력하신 내용 분석 결과, 모바일 앱 UI의 사용성 평가를 위한 정량적 평가가 적합합니다. SUS(System Usability Scale) 및 시각적 일관성 검증을 위한 지표 기반 평가를 추천합니다.",
//       });
//       setEvaluationType("quantitative");
//     }, 2000);
//   };

//   // Reset the form (Stage 1)
//   const handleReset = () => {
//     setEvaluationType(null);
//     setSubOption(null);
//     setAnalysisResults(null);
//     setCustomInput("");
//   };

//   // Function to handle file selection (Stage 2)
//   const handleFileSelect = (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;

//     handleFileUpload(selectedFile);
//   };

//   // Function to handle file upload (Stage 2)
//   const handleFileUpload = (selectedFile) => {
//     setFile(selectedFile);
//     setUploadStatus("uploading");

//     // Create a preview URL for the file
//     const previewUrl = URL.createObjectURL(selectedFile);
//     setFilePreview(previewUrl);

//     // Simulate upload progress
//     let progress = 0;
//     const uploadInterval = setInterval(() => {
//       progress += 10;
//       setUploadProgress(progress);

//       if (progress >= 100) {
//         clearInterval(uploadInterval);
//         setUploadStatus("uploaded");

//         // Auto-fill design title if empty
//         if (designTitle === "") {
//           const fileName = selectedFile.name.replace(/\.[^/.]+$/, ""); // Remove file extension
//           setDesignTitle(fileName);
//         }
//       }
//     }, 300);
//   };

//   // Handle drag events for file upload (Stage 2)
//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (uploadStatus !== "uploading" && uploadStatus !== "uploaded") {
//       setUploadStatus("dragging");
//     }
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (uploadStatus === "dragging") {
//       setUploadStatus("empty");
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (uploadStatus === "uploading" || uploadStatus === "uploaded") return;

//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       const droppedFile = e.dataTransfer.files[0];
//       handleFileUpload(droppedFile);
//     }
//   };

//   // Function to handle file change (Stage 2)
//   const handleFileChange = () => {
//     // Trigger file input click
//     fileInputRef.current.click();
//   };

//   // Function to handle file delete (Stage 2)
//   const handleFileDelete = () => {
//     setFile(null);
//     setFilePreview(null);
//     setUploadStatus("empty");
//     setUploadProgress(0);
//   };

//   // Function to handle next stage button click
//   // Function to handle back button click (Stage 2)
//   const handleBackButton = () => {
//     // Show confirmation modal
//     setShowBackConfirmModal(true);
//   };

//   // Function to handle back confirmation (Stage 2)
//   const handleBackConfirm = () => {
//     setShowBackConfirmModal(false);
//     setIsTransitioning(true);

//     // Simulate transition animation with a timeout
//     setTimeout(() => {
//       setCurrentStage(currentStage - 1);
//       setIsTransitioning(false);

//       // Reset Stage 2 data
//       setFile(null);
//       setFilePreview(null);
//       setUploadStatus("empty");
//       setUploadProgress(0);
//       setDesignTitle("");
//       setDesignType("");
//       setDesignPurpose("");
//     }, 1000);
//   };

//   // Effect to setup drag and drop listeners (Stage 2)
//   useEffect(() => {
//     const uploadArea = uploadAreaRef.current;

//     if (uploadArea && currentStage === 2) {
//       uploadArea.addEventListener("dragover", handleDragOver);
//       uploadArea.addEventListener("dragleave", handleDragLeave);
//       uploadArea.addEventListener("drop", handleDrop);

//       return () => {
//         uploadArea.removeEventListener("dragover", handleDragOver);
//         uploadArea.removeEventListener("dragleave", handleDragLeave);
//         uploadArea.removeEventListener("drop", handleDrop);
//       };
//     }
//   }, [currentStage, uploadStatus]);

//   // Render different stages based on currentStage
//   const renderStage = () => {
//     if (isTransitioning) {
//       return renderTransitionScreen();
//     }

//     switch (currentStage) {
//       case 1:
//         return renderStage1();
//       case 2:
//         return renderStage2();
//       case 3:
//         return renderStage3();
//       case 4:
//         return renderStage4();
//       case 5:
//         return renderStage5Generation();
//       case 6:
//         return renderStage6Evaluation();
//       case 7:
//         return renderStage7Modification();

//       default:
//         return renderStage1();
//     }
//   };

//   // Get options for current evaluation type
//   const getCurrentOptions = () => {
//     switch (evaluationType) {
//       case "quantitative":
//         return quantitativeOptions;
//       case "qualitative":
//         return qualitativeOptions;
//       case "comparative":
//         return comparativeOptions;
//       default:
//         return [];
//     }
//   };

//   // Get title for current evaluation type
//   const getCurrentOptionTitle = () => {
//     switch (evaluationType) {
//       case "quantitative":
//         return "정량적 평가 목적 선택";
//       case "qualitative":
//         return "정성적 평가 방법 선택";
//       case "comparative":
//         return "비교 대상 선택";
//       default:
//         return "";
//     }
//   };

//   // Render Stage 1 content
//   const renderStage1 = () => {
//     return (
//       <S.ContentArea>
//         <S.Title>1단계: 평가 방식 및 목적 선택</S.Title>
//         <S.Subtitle>
//           {analysisResults
//             ? "추천하는 평가 방식을 확인하세요."
//             : "평가하려는 디자인의 평가 방식과 목적을 선택하세요."}
//         </S.Subtitle>

//         {/* Evaluation Type Cards */}
//         <S.EvaluationCards
//           style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 30px" }}
//         >
//           {/* Quantitative Evaluation */}
//           <S.EvaluationCard
//             isSelected={evaluationType === "quantitative"}
//             style={{ flex: 1 }}
//           >
//             <S.CardTitle>정량적 평가</S.CardTitle>
//             <S.CardDescription>수치적 지표로 측정</S.CardDescription>
//             <S.SelectButton
//               isSelected={evaluationType === "quantitative"}
//               onClick={() => handleEvaluationTypeSelect("quantitative")}
//             >
//               <S.SelectionIndicator
//                 isSelected={evaluationType === "quantitative"}
//               >
//                 {evaluationType === "quantitative" && <S.SelectionDot />}
//               </S.SelectionIndicator>
//               {evaluationType === "quantitative"
//                 ? analysisResults
//                   ? "추천됨"
//                   : "선택됨"
//                 : "선택하기"}
//             </S.SelectButton>
//           </S.EvaluationCard>

//           {/* Qualitative Evaluation */}
//           <S.EvaluationCard
//             isSelected={evaluationType === "qualitative"}
//             style={{ flex: 1 }}
//           >
//             <S.CardTitle>정성적 평가</S.CardTitle>
//             <S.CardDescription>정성적 측면 분석</S.CardDescription>
//             <S.SelectButton
//               isSelected={evaluationType === "qualitative"}
//               onClick={() => handleEvaluationTypeSelect("qualitative")}
//             >
//               <S.SelectionIndicator
//                 isSelected={evaluationType === "qualitative"}
//               >
//                 {evaluationType === "qualitative" && <S.SelectionDot />}
//               </S.SelectionIndicator>
//               {evaluationType === "qualitative" ? "선택됨" : "선택하기"}
//             </S.SelectButton>
//           </S.EvaluationCard>

//           {/* Comparative Evaluation */}
//           <S.EvaluationCard
//             isSelected={evaluationType === "comparative"}
//             style={{ flex: 1 }}
//           >
//             <S.CardTitle>비교 평가</S.CardTitle>
//             <S.CardDescription>다른 디자인과 비교</S.CardDescription>
//             <S.SelectButton
//               isSelected={evaluationType === "comparative"}
//               onClick={() => handleEvaluationTypeSelect("comparative")}
//             >
//               <S.SelectionIndicator
//                 isSelected={evaluationType === "comparative"}
//               >
//                 {evaluationType === "comparative" && <S.SelectionDot />}
//               </S.SelectionIndicator>
//               {evaluationType === "comparative"
//                 ? analysisResults &&
//                   analysisResults.secondaryRecommendation === "comparative"
//                   ? "보조 추천"
//                   : "선택됨"
//                 : "선택하기"}
//             </S.SelectButton>
//           </S.EvaluationCard>
//         </S.EvaluationCards>

//         {/* 정량적 평가 목적 선택 */}
//         {evaluationType && !analysisResults && (
//           <S.OptionsContainer
//             style={{ maxWidth: "1000px", margin: "30px auto", padding: "30px" }}
//           >
//             <S.OptionsTitle>{getCurrentOptionTitle()}</S.OptionsTitle>
//             <S.SubOptions
//               style={{ display: "flex", justifyContent: "center", gap: "20px" }}
//             >
//               {getCurrentOptions().map((option, index) => (
//                 <S.SubOption
//                   key={index}
//                   isSelected={subOption === option}
//                   onClick={() => handleSubOptionSelect(option)}
//                   style={{ flex: 1, maxWidth: "300px" }}
//                 >
//                   {option}
//                 </S.SubOption>
//               ))}
//             </S.SubOptions>
//           </S.OptionsContainer>
//         )}

//         {/* 평가 내용 직접 입력 */}
//         {!analysisResults && (
//           <S.CustomInputContainer
//             style={{ maxWidth: "1000px", margin: "30px auto", padding: "30px" }}
//           >
//             <S.CustomInputTitle>평가 내용 직접 입력</S.CustomInputTitle>
//             <S.InputRow>
//               <S.CustomInput
//                 type="text"
//                 value={customInput}
//                 onChange={(e) => setCustomInput(e.target.value)}
//                 placeholder="평가하고자 하는 디자인 목적 및 내용을 입력해주세요. AI가 자동으로 추천합니다."
//               />
//               <S.AnalyzeButton
//                 isAnalyzing={isAnalyzing}
//                 onClick={handleAnalyze}
//                 disabled={isAnalyzing || customInput.trim() === ""}
//               >
//                 {isAnalyzing ? <S.LoadingCircle /> : "분석"}
//               </S.AnalyzeButton>
//             </S.InputRow>
//           </S.CustomInputContainer>
//         )}

//         {/* AI 분석 결과 */}
//         {analysisResults && (
//           <S.AnalysisResultContainer
//             style={{ maxWidth: "1000px", margin: "30px auto", padding: "30px" }}
//           >
//             <S.AnalysisTitle>AI 추천 내용</S.AnalysisTitle>
//             <S.AnalysisText>{analysisResults.explanation}</S.AnalysisText>

//             <S.ResetButton onClick={handleReset}>
//               처음부터 다시 선택하기
//             </S.ResetButton>
//           </S.AnalysisResultContainer>
//         )}

//         {/* 다음 단계 버튼 */}
//         <S.ButtonsContainer
//           style={{ maxWidth: "1000px", margin: "30px auto", padding: "0 30px" }}
//         >
//           <S.StageLabel>1</S.StageLabel>
//           <S.NextButton
//             disabled={!isStage1Complete}
//             onClick={handleNextStage}
//             style={{ marginLeft: "auto" }}
//           >
//             다음 단계
//           </S.NextButton>
//         </S.ButtonsContainer>
//       </S.ContentArea>
//     );
//   };

//   // Render Stage 2 content
//   const renderStage2 = () => {
//     return (
//       <S.ContentArea>
//         <S.ProgressBarContainer>
//           <S.ProgressBar progress={20} />
//         </S.ProgressBarContainer>

//         <S.Title>2단계: 평가 대상 정보 입력 및 이미지 업로드</S.Title>

//         <S.TwoColumnLayout>
//           {/* Upload Area */}
//           <S.UploadArea
//             ref={uploadAreaRef}
//             isDragging={uploadStatus === "dragging"}
//             isUploaded={uploadStatus === "uploaded"}
//           >
//             {uploadStatus === "empty" && (
//               <>
//                 <S.UploadEmptyStateText>
//                   디자인 파일을 여기에 드래그하거나
//                 </S.UploadEmptyStateText>
//                 <S.UploadButton onClick={handleFileChange}>
//                   파일 선택
//                 </S.UploadButton>
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   hidden
//                   accept=".jpg,.jpeg,.png,.pdf,.ai,.psd,.tiff"
//                   onChange={handleFileSelect}
//                 />
//                 <S.UploadEmptyStateText isDragging={false}>
//                   지원 형식: JPG, PNG, PDF, AI, PSD, TIFF
//                 </S.UploadEmptyStateText>
//               </>
//             )}

//             {uploadStatus === "dragging" && (
//               <>
//                 <S.UploadEmptyStateText isDragging={true}>
//                   파일을 여기에 놓으세요
//                 </S.UploadEmptyStateText>
//                 <S.UploadEmptyStateText isDragging={true}>
//                   파일을 놓으면 자동으로 업로드됩니다
//                 </S.UploadEmptyStateText>
//                 <div className="text-5xl font-bold text-blue-500 border-2 border-blue-500 border-dashed w-24 h-24 flex items-center justify-center rounded-lg mt-4">
//                   +
//                 </div>
//               </>
//             )}

//             {uploadStatus === "uploading" && (
//               <>
//                 <div className="text-lg font-bold text-gray-800 mb-4">
//                   파일 업로드 중...
//                 </div>
//                 <S.UploadProgressContainer>
//                   <S.UploadProgressBar progress={uploadProgress} />
//                 </S.UploadProgressContainer>
//                 <div className="text-gray-600 mb-1">AppDesign_v2.1.png</div>
//                 <div className="text-gray-500 text-sm mb-6">
//                   {(file?.size / (1024 * 1024)).toFixed(1)}MB /{" "}
//                   {(file?.size / (1024 * 1024)).toFixed(1)}MB ({uploadProgress}
//                   %)
//                 </div>
//                 <button
//                   className="px-8 py-2 bg-gray-100 text-gray-500 rounded-full"
//                   onClick={handleFileDelete}
//                 >
//                   취소
//                 </button>
//               </>
//             )}

//             {uploadStatus === "uploaded" && (
//               <>
//                 <S.FilePreview src={filePreview} />
//                 <S.FileInfo>
//                   <S.FileName>
//                     {file?.name} ({(file?.size / (1024 * 1024)).toFixed(1)}MB)
//                   </S.FileName>
//                   <div className="flex gap-2 ml-auto">
//                     <S.FileActionButton onClick={handleFileChange}>
//                       변경
//                     </S.FileActionButton>
//                     <S.FileActionButton onClick={handleFileDelete}>
//                       삭제
//                     </S.FileActionButton>
//                   </div>
//                 </S.FileInfo>
//               </>
//             )}
//           </S.UploadArea>

//           {/* Form Container */}
//           <S.FormContainer>
//             <S.FormTitle>평가 대상 정보</S.FormTitle>

//             {/* Design Title */}
//             <S.FormField>
//               <S.FormLabel>디자인 제목</S.FormLabel>
//               <S.FormInput
//                 value={designTitle}
//                 onChange={(e) => setDesignTitle(e.target.value)}
//                 placeholder="디자인 제목을 입력하세요"
//               />
//             </S.FormField>

//             {/* Design Type */}
//             <S.FormField>
//               <S.FormLabel>디자인 유형</S.FormLabel>
//               <S.DropdownContainer>
//                 <S.DropdownInput
//                   isOpen={isTypeDropdownOpen}
//                   onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
//                 >
//                   <S.DropdownText isEmpty={!designType}>
//                     {designType || "디자인 유형을 선택하세요"}
//                   </S.DropdownText>
//                   <S.DropdownArrow isOpen={isTypeDropdownOpen}>
//                     {isTypeDropdownOpen ? "▲" : "▼"}
//                   </S.DropdownArrow>
//                 </S.DropdownInput>

//                 {isTypeDropdownOpen && (
//                   <S.DropdownOptions>
//                     {designTypeOptions.map((option, index) => (
//                       <S.DropdownOption
//                         key={index}
//                         isSelected={option === designType}
//                         onClick={() => {
//                           setDesignType(option);
//                           setIsTypeDropdownOpen(false);
//                         }}
//                       >
//                         {option}
//                       </S.DropdownOption>
//                     ))}
//                   </S.DropdownOptions>
//                 )}
//               </S.DropdownContainer>
//             </S.FormField>

//             {/* Design Purpose */}
//             <S.FormField disabled={isTypeDropdownOpen}>
//               <S.FormLabel>디자인 목적/타겟</S.FormLabel>
//               <S.FormTextarea
//                 value={designPurpose}
//                 onChange={(e) => setDesignPurpose(e.target.value)}
//                 placeholder="디자인의 목적과 타겟 고객을 설명해주세요"
//               />
//             </S.FormField>
//           </S.FormContainer>
//         </S.TwoColumnLayout>

//         {/* Action Buttons */}
//         <S.ButtonsContainer>
//           <S.BackButton onClick={handleBackButton}>이전</S.BackButton>

//           <S.NextButton
//             disabled={!isStage2Complete}
//             onClick={() => {
//               handleNextStage();
//             }}
//           >
//             다음 단계
//           </S.NextButton>

//           <S.StageLabel>2</S.StageLabel>
//         </S.ButtonsContainer>

//         {/* Back confirmation modal */}
//         {showBackConfirmModal && (
//           <S.ModalOverlay>
//             <S.ModalContainer>
//               <S.ModalTitle>이전 단계로 돌아가시겠습니까?</S.ModalTitle>
//               <S.ModalText>현재 입력한 정보는 저장되지 않습니다.</S.ModalText>
//               <S.ModalButtonsContainer>
//                 <S.ModalCancelButton
//                   onClick={() => setShowBackConfirmModal(false)}
//                 >
//                   취소
//                 </S.ModalCancelButton>
//                 <S.ModalConfirmButton onClick={handleBackConfirm}>
//                   이전 단계로
//                 </S.ModalConfirmButton>
//               </S.ModalButtonsContainer>
//             </S.ModalContainer>
//           </S.ModalOverlay>
//         )}
//       </S.ContentArea>
//     );
//   };

//   // 평가 시작 함수
//   const startEvaluation = () => {
//     setIsEvaluating(true);
//     setEvaluationProgress(0);

//     // 평가 진행 시뮬레이션
//     const interval = setInterval(() => {
//       setEvaluationProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           completeEvaluation();
//           return 100;
//         }
//         return prev + 5;
//       });
//     }, 300);
//   };

//   // 평가 완료 함수
//   const completeEvaluation = () => {
//     // 데모용 랜덤 점수 생성
//     const updatedCategories = evaluationCategories.map((category) => {
//       const detailsWithScores = category.details.map((detail) => ({
//         ...detail,
//         score: Math.floor(Math.random() * 40) + 60, // 60-99 사이 랜덤 점수
//       }));

//       // 카테고리 평균 점수 계산
//       const avgScore = Math.floor(
//         detailsWithScores.reduce((sum, detail) => sum + detail.score, 0) /
//           detailsWithScores.length
//       );

//       return {
//         ...category,
//         score: avgScore,
//         details: detailsWithScores,
//       };
//     });

//     setEvaluationCategories(updatedCategories);

//     // 전체 점수 계산
//     const overallScore = Math.floor(
//       updatedCategories.reduce((sum, category) => sum + category.score, 0) /
//         updatedCategories.length
//     );

//     // 피드백 추천 생성
//     const recommendations = [
//       {
//         type: "positive",
//         title: "색상 사용이 효과적입니다",
//         description:
//           "브랜드 색상을 일관되게 적용하여 시각적 정체성을 잘 확립했습니다.",
//       },
//       {
//         type: "improvement",
//         title: "버튼 배치 개선 필요",
//         description:
//           "주요 액션 버튼의 위치와 크기를 더 직관적으로 조정하면 사용성이 향상될 것입니다.",
//       },
//       {
//         type: "negative",
//         title: "텍스트 가독성 문제",
//         description:
//           "일부 영역에서 배경과 텍스트 색상 대비가 부족하여 가독성이 떨어집니다.",
//       },
//     ];

//     setFeedbackRecommendations(recommendations);

//     // 평가 결과 설정
//     setEvaluationResults({
//       overallScore,
//       timestamp: new Date().toISOString(),
//       evaluationType: evaluationType,
//       designTitle: designTitle,
//       designType: designType,
//       // 카테고리별 점수 추가
//       categoryScores: updatedCategories.map((cat) => ({
//         name: cat.name,
//         score: cat.score,
//       })),
//     });

//     setIsEvaluating(false);

//     // 전체 탭이 기본적으로 선택되도록 설정
//     setSelectedFeedbackCategory("all");
//   };

//   // 내보내기 버튼 클릭 처리
//   const handleExport = () => {
//     setShowExportModal(true);
//   };

//   // 내보내기 형식 선택 처리
//   const handleExportFormatSelect = (format) => {
//     setExportFormat(format);
//   };

//   // 내보내기 확인 처리
//   const handleExportConfirm = () => {
//     // 내보내기 프로세스 시뮬레이션
//     setTimeout(() => {
//       setShowExportModal(false);
//       // 성공 메시지 또는 파일 다운로드
//       alert(
//         `평가 결과가 ${exportFormat.toUpperCase()} 형식으로 내보내기 되었습니다.`
//       );
//     }, 1000);
//   };

//   // 컴포넌트 마운트 시 평가 시작
//   useEffect(() => {
//     if (currentStage === 3 && !isEvaluating && !evaluationResults) {
//       startEvaluation();
//     }

//     // 3단계로 진입할 때 전체 탭이 선택되도록 설정
//     if (currentStage === 3) {
//       setSelectedFeedbackCategory("all");
//     }
//   }, [currentStage, isEvaluating, evaluationResults]);

//   // Stage 3 - Evaluation Results
//   const renderStage3 = () => {
//     if (isEvaluating) {
//       return renderEvaluationProgress();
//     }

//     if (evaluationResults) {
//       return renderEvaluationResults();
//     }

//     return renderInitialEvaluation();
//   };

//   // 평가 진행 중 화면 렌더링
//   const renderEvaluationProgress = () => {
//     return (
//       <S.ContentArea>
//         <S.ProgressBarContainer>
//           <S.ProgressBar progress={30} />
//         </S.ProgressBarContainer>

//         <S.Title>3단계: 평가 진행 중</S.Title>
//         <S.Subtitle>
//           AI가 디자인을 평가하고 있습니다. 잠시만 기다려주세요.
//         </S.Subtitle>

//         <S.EvaluationProgressContainer>
//           <S.LoadingDotsContainer>
//             {[0, 1, 2].map((i) => (
//               <S.LoadingDot key={i} index={i} />
//             ))}
//           </S.LoadingDotsContainer>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               marginBottom: "40px",
//             }}
//           >
//             <div style={{ display: "flex", gap: "16px" }}>
//               {[1, 2, 3, 4, 5].map((num) => (
//                 <div
//                   key={num}
//                   style={{
//                     width: "60px",
//                     height: "60px",
//                     borderRadius: "50%",
//                     backgroundColor: evaluationSteps[num - 1]?.isActive
//                       ? "#4f46e5"
//                       : "#e2e8f0",
//                     color: "white",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: "18px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {evaluationSteps[num - 1]?.isCompleted ? "✓" : num}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <S.ProgressPercentage>{evaluationProgress}%</S.ProgressPercentage>
//         </S.EvaluationProgressContainer>
//       </S.ContentArea>
//     );
//   };

//   // 평가 결과 렌더링
//   const renderEvaluationResults = () => {
//     // 평가 결과가 없으면 기본값 설정
//     const results = evaluationResults || {
//       overallScore: 82,
//       summary:
//         "디자인은 전반적으로 우수한 사용성과 심미성을 갖추고 있습니다. 특히 일관된 디자인 시스템과 명확한 시각적 계층 구조가 돋보입니다. 다만, 일부 접근성 측면에서 개선이 필요합니다.",
//       categories: [
//         { id: 1, name: "사용성", score: 82 },
//         { id: 2, name: "접근성", score: 68 },
//         { id: 3, name: "심미성", score: 85 },
//         { id: 4, name: "일관성", score: 80 },
//       ],
//     };

//     // 카테고리 데이터가 없으면 기본값 설정
//     const categories =
//       evaluationCategories.length > 0 && evaluationCategories[0].score > 0
//         ? evaluationCategories
//         : [
//             { id: 1, name: "사용성", score: 82 },
//             { id: 2, name: "시각적 디자인", score: 78 },
//             { id: 3, name: "브랜드 일치성", score: 85 },
//           ];

//     // 피드백 데이터가 없으면 기본값 설정
//     const feedback =
//       feedbackRecommendations.length > 0
//         ? feedbackRecommendations
//         : [
//             {
//               type: "positive",
//               title: "명확한 시각적 계층 구조",
//               description:
//                 "중요한 정보와 액션이 시각적으로 잘 강조되어 있어 사용자가 쉽게 인지할 수 있습니다.",
//             },
//             {
//               type: "positive",
//               title: "일관된 색상 시스템",
//               description:
//                 "브랜드 색상이 일관되게 적용되어 있어 시각적 통일성이 우수합니다.",
//             },
//             {
//               type: "improvement",
//               title: "버튼 크기 최적화",
//               description:
//                 "일부 버튼의 크기가 작아 모바일에서 터치하기 어려울 수 있습니다. 최소 44x44px 크기를 권장합니다.",
//             },
//             {
//               type: "negative",
//               title: "색상 대비 부족",
//               description:
//                 "일부 텍스트와 배경 간의 색상 대비가 WCAG 기준(4.5:1)을 충족하지 못합니다.",
//             },
//           ];

//     return (
//       <S.ContentArea>
//         <S.ProgressBarContainer>
//           <S.ProgressBar progress={30} />
//         </S.ProgressBarContainer>

//         <S.Title>3단계: AI 평가 결과</S.Title>
//         <S.Subtitle>
//           디자인에 대한 AI 평가 결과입니다. 상세 피드백을 확인하세요.
//         </S.Subtitle>

//         <S.EvaluationContainer>
//           {/* Score Overview */}
//           <S.ScoreOverview>
//             <S.ScoreCircle score={results.overallScore}>
//               {results.overallScore}
//             </S.ScoreCircle>
//             <div>
//               <h3
//                 style={{
//                   fontSize: "18px",
//                   fontWeight: "bold",
//                   marginBottom: "4px",
//                 }}
//               >
//                 종합 점수
//               </h3>
//               <p style={{ fontSize: "14px", color: "#64748b" }}>
//                 디자인의 전체적인 품질 평가
//               </p>
//             </div>
//           </S.ScoreOverview>

//           <S.ScoreCategories>
//             {categories.map((category) => (
//               <S.ScoreCategory key={category.id || category.name}>
//                 <S.CategoryLabel>{category.name}</S.CategoryLabel>
//                 <S.CategoryScore>{category.score}</S.CategoryScore>
//                 <S.CategoryBar>
//                   <S.CategoryBarFill width={category.score} />
//                 </S.CategoryBar>
//               </S.ScoreCategory>
//             ))}
//           </S.ScoreCategories>

//           {/* Summary */}
//           <S.SummarySection>
//             <S.SummaryTitle>평가 요약</S.SummaryTitle>
//             <S.SummaryText>
//               {results.summary ||
//                 "디자인은 전반적으로 우수한 사용성과 심미성을 갖추고 있습니다. 특히 일관된 디자인 시스템과 명확한 시각적 계층 구조가 돋보입니다. 다만, 일부 접근성 측면에서 개선이 필요합니다."}
//             </S.SummaryText>
//           </S.SummarySection>

//           {/* Detailed Feedback */}
//           <S.FeedbackSection>
//             <S.FeedbackTitle>상세 피드백</S.FeedbackTitle>
//             <S.FeedbackCategories>
//               <S.FeedbackCategoryButton
//                 isActive={selectedFeedbackCategory === "all"}
//                 onClick={() => setSelectedFeedbackCategory("all")}
//               >
//                 전체
//               </S.FeedbackCategoryButton>
//               <S.FeedbackCategoryButton
//                 isActive={selectedFeedbackCategory === "positive"}
//                 onClick={() => setSelectedFeedbackCategory("positive")}
//               >
//                 긍정적 요소
//               </S.FeedbackCategoryButton>
//               <S.FeedbackCategoryButton
//                 isActive={selectedFeedbackCategory === "improvement"}
//                 onClick={() => setSelectedFeedbackCategory("improvement")}
//               >
//                 개선 사항
//               </S.FeedbackCategoryButton>
//               <S.FeedbackCategoryButton
//                 isActive={selectedFeedbackCategory === "negative"}
//                 onClick={() => setSelectedFeedbackCategory("negative")}
//               >
//                 부정적 요소
//               </S.FeedbackCategoryButton>
//             </S.FeedbackCategories>

//             <S.FeedbackItems>
//               {feedback
//                 .filter(
//                   (item) =>
//                     selectedFeedbackCategory === "all" ||
//                     item.type === selectedFeedbackCategory
//                 )
//                 .map((item, index) => (
//                   <S.FeedbackItem key={index} type={item.type}>
//                     <S.FeedbackItemIcon type={item.type}>
//                       {item.type === "positive"
//                         ? "✓"
//                         : item.type === "improvement"
//                         ? "↗"
//                         : "✕"}
//                     </S.FeedbackItemIcon>
//                     <S.FeedbackItemContent>
//                       <S.FeedbackItemTitle>{item.title}</S.FeedbackItemTitle>
//                       <S.FeedbackItemDescription>
//                         {item.description}
//                       </S.FeedbackItemDescription>
//                     </S.FeedbackItemContent>
//                   </S.FeedbackItem>
//                 ))}
//             </S.FeedbackItems>
//           </S.FeedbackSection>

//           {/* 버튼 컨테이너 스타일 수정 - 다른 단계와 일치시킴 */}
//           <S.ButtonsContainer
//             style={{ maxWidth: "1000px", margin: "30px auto" }}
//           >
//             <S.BackButton onClick={handleBackButton}>이전</S.BackButton>
//             <S.StageLabel>3</S.StageLabel>
//             {/* 결과 내보내기 버튼을 왼쪽에 배치 */}
//             <S.BackButton onClick={handleExport}>결과 내보내기</S.BackButton>
//             {/* 다음 단계 버튼을 가장 오른쪽에 배치 */}
//             <S.NextButton
//               onClick={() => setCurrentStage(4)}
//               style={{ marginLeft: "auto" }}
//             >
//               다음 단계
//             </S.NextButton>
//           </S.ButtonsContainer>
//         </S.EvaluationContainer>
//       </S.ContentArea>
//     );
//   };

//   // 초기 평가 화면 렌더링
//   const renderInitialEvaluation = () => {
//     return (
//       <S.ContentArea>
//         <S.ProgressBarContainer>
//           <S.ProgressBar progress={30} />
//         </S.ProgressBarContainer>

//         <S.Title>3단계: 평가 실행</S.Title>
//         <S.Subtitle>업로드한 디자인에 대한 AI 평가를 시작합니다.</S.Subtitle>

//         <S.EvaluationContainer>
//           <S.DesignPreviewSection>
//             <S.DesignPreviewTitle>평가 대상 디자인</S.DesignPreviewTitle>
//             <S.DesignPreview src={filePreview} />
//             <S.DesignInfo>
//               <S.DesignInfoItem>
//                 <S.DesignInfoLabel>디자인 제목:</S.DesignInfoLabel>
//                 <S.DesignInfoValue>{designTitle}</S.DesignInfoValue>
//               </S.DesignInfoItem>
//               <S.DesignInfoItem>
//                 <S.DesignInfoLabel>디자인 유형:</S.DesignInfoLabel>
//                 <S.DesignInfoValue>{designType}</S.DesignInfoValue>
//               </S.DesignInfoItem>
//               <S.DesignInfoItem>
//                 <S.DesignInfoLabel>디자인 목적:</S.DesignInfoLabel>
//                 <S.DesignInfoValue>{designPurpose}</S.DesignInfoValue>
//               </S.DesignInfoItem>
//             </S.DesignInfo>
//           </S.DesignPreviewSection>

//           <S.EvaluationOptionsSection>
//             <S.EvaluationOptionsTitle>평가 옵션</S.EvaluationOptionsTitle>
//             <S.EvaluationOptions>
//               <S.EvaluationOption>
//                 <S.EvaluationOptionCheckbox
//                   isChecked={evaluationOptions.usability}
//                   onClick={() => toggleEvaluationOption("usability")}
//                 >
//                   {evaluationOptions.usability && "✓"}
//                 </S.EvaluationOptionCheckbox>
//                 <S.EvaluationOptionLabel>사용성 평가</S.EvaluationOptionLabel>
//               </S.EvaluationOption>
//               <S.EvaluationOption>
//                 <S.EvaluationOptionCheckbox
//                   isChecked={evaluationOptions.accessibility}
//                   onClick={() => toggleEvaluationOption("accessibility")}
//                 >
//                   {evaluationOptions.accessibility && "✓"}
//                 </S.EvaluationOptionCheckbox>
//                 <S.EvaluationOptionLabel>접근성 평가</S.EvaluationOptionLabel>
//               </S.EvaluationOption>
//               <S.EvaluationOption>
//                 <S.EvaluationOptionCheckbox
//                   isChecked={evaluationOptions.aesthetics}
//                   onClick={() => toggleEvaluationOption("aesthetics")}
//                 >
//                   {evaluationOptions.aesthetics && "✓"}
//                 </S.EvaluationOptionCheckbox>
//                 <S.EvaluationOptionLabel>심미성 평가</S.EvaluationOptionLabel>
//               </S.EvaluationOption>
//             </S.EvaluationOptions>
//           </S.EvaluationOptionsSection>

//           <S.ActionButtonsContainer>
//             <S.BackButton onClick={handleBackButton}>이전</S.BackButton>
//             <S.ActionButton
//               variant="primary"
//               onClick={handleStartEvaluation}
//               disabled={!isEvaluationReady}
//             >
//               평가 시작
//             </S.ActionButton>
//           </S.ActionButtonsContainer>
//         </S.EvaluationContainer>
//       </S.ContentArea>
//     );
//   };

//   // 방법론 선택 처리
//   const handleMethodologySelect = (methodologyId) => {
//     setSelectedMethodology(methodologyId);

//     // 상세 보기 초기화
//     setShowHeuristicDetails(false);
//     setShowSusDetails(false);
//   };

//   // 사용자 정의 방법론 변경 처리
//   const handleCustomMethodologyChange = (field, value) => {
//     setCustomMethodology({
//       ...customMethodology,
//       [field]: value,
//     });
//   };

//   // 상세 정보 닫기 처리
//   const handleCloseDetails = () => {
//     setShowMethodologyDetailModal(false);
//   };

//   // 상세 정보에서 선택 처리
//   const handleSelectFromDetails = (methodologyId) => {
//     setSelectedMethodology(methodologyId);
//     setShowMethodologyDetailModal(false);

//     // 적절한 상세 설정 화면 표시
//     if (methodologyId === "heuristic") {
//       setShowHeuristicDetails(true);
//     } else if (methodologyId === "sus") {
//       setShowSusDetails(true);
//     }
//   };

//   // 원칙 토글 처리
//   const handleTogglePrinciple = (id) => {
//     setHeuristicPrinciples(
//       heuristicPrinciples.map((principle) =>
//         principle.id === id
//           ? { ...principle, isSelected: !principle.isSelected }
//           : principle
//       )
//     );
//   };

//   // 기본값으로 재설정 처리
//   const handleResetToDefaults = () => {
//     if (selectedMethodology === "heuristic") {
//       // 휴리스틱 원칙 기본값으로 재설정
//       setHeuristicPrinciples([
//         { id: 1, name: "시스템 상태의 가시성", isSelected: true, weight: 20 },
//         {
//           id: 2,
//           name: "시스템과 실제 세계의 일치",
//           isSelected: true,
//           weight: 15,
//         },
//         { id: 3, name: "사용자 제어 및 자유", isSelected: true, weight: 15 },
//         { id: 4, name: "일관성 및 표준", isSelected: true, weight: 20 },
//         { id: 5, name: "오류 방지", isSelected: true, weight: 20 },
//         { id: 6, name: "인식 우선보다 회상", isSelected: false, weight: 10 },
//         {
//           id: 7,
//           name: "사용의 유연성과 효율성",
//           isSelected: false,
//           weight: 10,
//         },
//         {
//           id: 8,
//           name: "심미적이고 미니멀한 디자인",
//           isSelected: false,
//           weight: 10,
//         },
//         { id: 9, name: "오류 인식, 진단, 복구", isSelected: false, weight: 10 },
//         { id: 10, name: "도움말 및 설명서", isSelected: false, weight: 10 },
//       ]);
//     } else if (selectedMethodology === "sus") {
//       // SUS 문항 기본값으로 재설정
//       setSusQuestions([
//         {
//           id: 1,
//           text: "나는 이 핀테크 앱을 자주 사용하고 싶다.",
//           isSelected: true,
//         },
//         { id: 2, text: "이 앱은 불필요하게 복잡하다.", isSelected: true },
//         { id: 3, text: "이 앱은 사용하기 쉽다.", isSelected: true },
//         {
//           id: 4,
//           text: "이 앱을 사용하기 위해서는 기술적인 도움이 필요하다.",
//           isSelected: true,
//         },
//         {
//           id: 5,
//           text: "이 앱의 다양한 기능들이 잘 통합되어 있다.",
//           isSelected: true,
//         },
//         {
//           id: 6,
//           text: "이 앱에는 일관성이 없는 부분이 많다.",
//           isSelected: true,
//         },
//         {
//           id: 7,
//           text: "대부분의 사람들이 이 앱 사용법을 빠르게 배울 것이다.",
//           isSelected: true,
//         },
//         { id: 8, text: "이 앱은 사용하기에 매우 번거롭다.", isSelected: true },
//         {
//           id: 9,
//           text: "나는 이 앱을 사용하면서 자신감을 느꼈다.",
//           isSelected: true,
//         },
//         {
//           id: 10,
//           text: "이 앱을 사용하기 전에 많은 것을 배워야 했다.",
//           isSelected: true,
//         },
//       ]);
//     } else if (selectedMethodology === "custom") {
//       // 사용자 정의 방법론 입력 초기화
//       setCustomMethodology({
//         name: "",
//         description: "",
//         evaluationElements: "",
//       });
//     }
//   };

//   // 질문 토글 처리
//   const handleToggleQuestion = (id) => {
//     setSusQuestions(
//       susQuestions.map((question) =>
//         question.id === id
//           ? { ...question, isSelected: !question.isSelected }
//           : question
//       )
//     );
//   };

//   // 평가 진행 상태
//   const [evaluationSteps, setEvaluationSteps] = useState([
//     { id: 1, text: "디자인 분석", isActive: true, isCompleted: false },
//     { id: 2, text: "사용성 평가", isActive: false, isCompleted: false },
//     { id: 3, text: "접근성 검토", isActive: false, isCompleted: false },
//     { id: 4, text: "심미성 평가", isActive: false, isCompleted: false },
//     { id: 5, text: "결과 종합", isActive: false, isCompleted: false },
//   ]);

//   // 평가 시작 함수
//   const handleStartEvaluation = () => {
//     setIsEvaluating(true);

//     // 평가 진행 상태 초기화
//     setEvaluationProgress(0);
//     setEvaluationSteps([
//       { id: 1, text: "디자인 분석", isActive: true, isCompleted: false },
//       { id: 2, text: "사용성 평가", isActive: false, isCompleted: false },
//       { id: 3, text: "접근성 검토", isActive: false, isCompleted: false },
//       { id: 4, text: "심미성 평가", isActive: false, isCompleted: false },
//       { id: 5, text: "결과 종합", isActive: false, isCompleted: false },
//     ]);

//     // 평가 진행 시뮬레이션
//     const simulateEvaluation = () => {
//       let progress = 0;
//       const interval = setInterval(() => {
//         progress += 5;
//         setEvaluationProgress(progress);

//         // 각 단계 완료 처리
//         if (progress === 20) {
//           updateEvaluationStep(1, true);
//         } else if (progress === 40) {
//           updateEvaluationStep(2, true);
//         } else if (progress === 60) {
//           updateEvaluationStep(3, true);
//         } else if (progress === 80) {
//           updateEvaluationStep(4, true);
//         } else if (progress === 100) {
//           updateEvaluationStep(5, true);
//           clearInterval(interval);

//           // 평가 결과 설정
//           setTimeout(() => {
//             const result = {
//               overallScore: 78,
//               summary:
//                 "핀테크 앱 디자인은 전반적으로 우수한 사용성과 심미성을 갖추고 있습니다. 특히 일관된 디자인 시스템과 명확한 시각적 계층 구조가 돋보입니다. 다만, 일부 접근성 측면에서 개선이 필요합니다.",
//               categories: [
//                 { id: 1, name: "사용성", score: 82 },
//                 { id: 2, name: "접근성", score: 68 },
//                 { id: 3, name: "심미성", score: 85 },
//                 { id: 4, name: "일관성", score: 80 },
//               ],
//               recommendations: [
//                 {
//                   type: "positive",
//                   title: "명확한 시각적 계층 구조",
//                   description:
//                     "중요한 정보와 액션이 시각적으로 잘 강조되어 있어 사용자가 쉽게 인지할 수 있습니다.",
//                 },
//                 {
//                   type: "positive",
//                   title: "일관된 색상 시스템",
//                   description:
//                     "브랜드 색상이 일관되게 적용되어 있어 시각적 통일성이 우수합니다.",
//                 },
//                 {
//                   type: "improvement",
//                   title: "버튼 크기 최적화",
//                   description:
//                     "일부 버튼의 크기가 작아 모바일에서 터치하기 어려울 수 있습니다. 최소 44x44px 크기를 권장합니다.",
//                 },
//                 {
//                   type: "negative",
//                   title: "색상 대비 부족",
//                   description:
//                     "일부 텍스트와 배경 간의 색상 대비가 WCAG 기준(4.5:1)을 충족하지 못합니다.",
//                 },
//               ],
//             };

//             setEvaluationResults(result);

//             // 평가 카테고리 및 피드백 설정
//             setEvaluationCategories([
//               { id: 1, name: "사용성", score: 82 },
//               { id: 2, name: "접근성", score: 68 },
//               { id: 3, name: "심미성", score: 85 },
//               { id: 4, name: "일관성", score: 80 },
//             ]);

//             setFeedbackRecommendations([
//               {
//                 type: "positive",
//                 title: "명확한 시각적 계층 구조",
//                 description:
//                   "중요한 정보와 액션이 시각적으로 잘 강조되어 있어 사용자가 쉽게 인지할 수 있습니다.",
//               },
//               {
//                 type: "positive",
//                 title: "일관된 색상 시스템",
//                 description:
//                   "브랜드 색상이 일관되게 적용되어 있어 시각적 통일성이 우수합니다.",
//               },
//               {
//                 type: "improvement",
//                 title: "버튼 크기 최적화",
//                 description:
//                   "일부 버튼의 크기가 작아 모바일에서 터치하기 어려울 수 있습니다. 최소 44x44px 크기를 권장합니다.",
//               },
//               {
//                 type: "negative",
//                 title: "색상 대비 부족",
//                 description:
//                   "일부 텍스트와 배경 간의 색상 대비가 WCAG 기준(4.5:1)을 충족하지 못합니다.",
//               },
//             ]);

//             setIsEvaluating(false);
//           }, 1000);
//         }
//       }, 300);
//     };

//     simulateEvaluation();
//   };

//   // 평가 단계 업데이트 함수
//   const updateEvaluationStep = (stepId, isCompleted) => {
//     setEvaluationSteps((prevSteps) =>
//       prevSteps.map((step) => {
//         if (step.id === stepId) {
//           return { ...step, isCompleted };
//         } else if (step.id === stepId + 1) {
//           return { ...step, isActive: true };
//         }
//         return step;
//       })
//     );
//   };

//   // Render Stage 4 content
//   const renderStage4 = () => {
//     // Calculate visible heuristic principles
//     const visibleHeuristicPrinciples = showAllHeuristicPrinciples
//       ? heuristicPrinciples
//       : heuristicPrinciples.slice(0, 6);

//     // Calculate visible SUS questions
//     const visibleSusQuestions = showAllSusQuestions
//       ? susQuestions
//       : susQuestions.slice(0, 5);

//     if (isStage4Transitioning) {
//       return renderStage4TransitionScreen();
//     }

//     if (showHeuristicDetails) {
//       return renderHeuristicDetails();
//     }

//     if (showSusDetails) {
//       return renderSusDetails();
//     }

//     if (
//       selectedMethodology === "custom" &&
//       customMethodology.name.trim() !== ""
//     ) {
//       return renderCustomMethodology();
//     }

//     return renderMethodologySelection();

//     // Render methodology selection screen
//     function renderMethodologySelection() {
//       return (
//         <S.ContentArea>
//           <S.ProgressBarContainer>
//             <S.ProgressBar progress={40} />
//           </S.ProgressBarContainer>

//           <S.Title>4단계: AI 평가 방법론 추천</S.Title>
//           <S.Subtitle>
//             {selectedMethodology
//               ? `${
//                   methodologies.find((m) => m.id === selectedMethodology)?.name
//                 } 방법론이 선택되었습니다.`
//               : "평가 대상과 목적에 맞는 평가 방법론을 선택하세요."}
//           </S.Subtitle>

//           {/* AI Recommendation Notice */}
//           <Stage4S.RecommendationNotice>
//             <Stage4S.RecommendationIcon>✓</Stage4S.RecommendationIcon>
//             <Stage4S.RecommendationText>AI 추천:</Stage4S.RecommendationText>
//             <Stage4S.RecommendationText style={{ marginLeft: "10px" }}>
//               핀테크 모바일 앱 UI 디자인을 위해
//             </Stage4S.RecommendationText>
//             <Stage4S.RecommendationText
//               isHighlighted
//               style={{ marginLeft: "10px" }}
//             >
//               휴리스틱 평가 방법론
//             </Stage4S.RecommendationText>
//             <Stage4S.RecommendationText style={{ marginLeft: "10px" }}>
//               을 우선 추천합니다.
//             </Stage4S.RecommendationText>
//           </Stage4S.RecommendationNotice>

//           {/* Methodology Cards */}
//           <Stage4S.MethodologyCardsContainer>
//             {methodologies.map((methodology) => (
//               <Stage4S.MethodologyCard
//                 key={methodology.id}
//                 isSelected={selectedMethodology === methodology.id}
//                 isRecommended={methodology.isRecommended}
//               >
//                 <Stage4S.SelectionIndicator
//                   isSelected={selectedMethodology === methodology.id}
//                 >
//                   {selectedMethodology === methodology.id && (
//                     <Stage4S.SelectionDot />
//                   )}
//                 </Stage4S.SelectionIndicator>

//                 <Stage4S.CardTitle>{methodology.name}</Stage4S.CardTitle>
//                 <Stage4S.CardDescription>
//                   {methodology.description}
//                 </Stage4S.CardDescription>
//                 <Stage4S.CardDetail>{methodology.details}</Stage4S.CardDetail>
//                 <Stage4S.CardPros>장점: {methodology.pros}</Stage4S.CardPros>
//                 <Stage4S.CardCons>단점: {methodology.cons}</Stage4S.CardCons>

//                 {methodology.isRecommended && (
//                   <Stage4S.RecommendBadge>AI 추천</Stage4S.RecommendBadge>
//                 )}

//                 <Stage4S.SelectButton
//                   isSelected={selectedMethodology === methodology.id}
//                   onClick={() => handleMethodologySelect(methodology.id)}
//                 >
//                   {selectedMethodology === methodology.id
//                     ? "선택됨"
//                     : "선택하기"}
//                 </Stage4S.SelectButton>
//               </Stage4S.MethodologyCard>
//             ))}
//           </Stage4S.MethodologyCardsContainer>

//           {/* Custom Method Input */}
//           <Stage4S.CustomMethodContainer
//             isActive={selectedMethodology === "custom"}
//           >
//             <Stage4S.CustomMethodLabel>
//               직접 평가 방법 입력:
//             </Stage4S.CustomMethodLabel>
//             <Stage4S.CustomMethodInput
//               type="text"
//               placeholder="사용자 정의 평가 방법을 입력하세요..."
//               value={customMethodology.name}
//               onChange={(e) => {
//                 handleCustomMethodologyChange("name", e.target.value);
//                 if (e.target.value.trim() !== "") {
//                   setSelectedMethodology("custom");
//                 }
//               }}
//             />
//           </Stage4S.CustomMethodContainer>

//           {/* Action Buttons */}
//           <Stage4S.ButtonsContainer>
//             <Stage4S.BackButton onClick={handleBackButton}>
//               이전
//             </Stage4S.BackButton>

//             <Stage4S.NextButton
//               disabled={!selectedMethodology}
//               onClick={() => {
//                 // If heuristic is selected, show heuristic details
//                 if (selectedMethodology === "heuristic") {
//                   setShowHeuristicDetails(true);
//                 }
//                 // If SUS is selected, show SUS details
//                 else if (selectedMethodology === "sus") {
//                   setShowSusDetails(true);
//                 }
//                 // If custom is selected, proceed to next stage
//                 else if (selectedMethodology === "custom") {
//                   handleNextStage();
//                 }
//                 // Otherwise, proceed to next stage
//                 else {
//                   handleNextStage();
//                 }
//               }}
//             >
//               다음 단계
//             </Stage4S.NextButton>

//             <Stage4S.StageLabel>4</Stage4S.StageLabel>
//           </Stage4S.ButtonsContainer>
//         </S.ContentArea>
//       );
//     }

//     // Render methodology detail modal
//     function renderMethodologyDetailModal() {
//       // Find the active methodology
//       const activeMethodology = methodologies.find(
//         (m) => m.id === activeDetailMethodology
//       );

//       if (!activeMethodology) return null;

//       return (
//         <Stage4S.ModalOverlay>
//           <Stage4S.ModalContainer>
//             <Stage4S.ModalHeader>
//               <Stage4S.ModalTitle>
//                 {activeMethodology.name} 방법론 상세 정보
//               </Stage4S.ModalTitle>
//               <Stage4S.CloseButton onClick={handleCloseDetails}>
//                 ×
//               </Stage4S.CloseButton>
//             </Stage4S.ModalHeader>

//             <Stage4S.ModalContent>
//               {/* Modal content based on active methodology */}
//               {/* ... (Modal content implementation) ... */}
//             </Stage4S.ModalContent>
//           </Stage4S.ModalContainer>
//         </Stage4S.ModalOverlay>
//       );
//     }

//     // Render heuristic principles detailed settings
//     function renderHeuristicDetails() {
//       return (
//         <S.ContentArea>
//           <S.ProgressBarContainer>
//             <S.ProgressBar progress={40} />
//           </S.ProgressBarContainer>

//           <S.Title>4단계: 휴리스틱 평가 세부 설정</S.Title>
//           <S.Subtitle>
//             평가에 사용할 휴리스틱 원칙과 가중치를 설정하세요.
//           </S.Subtitle>

//           {/* Selected Method Info */}
//           <Stage4S.RecommendationNotice
//             style={{ backgroundColor: "#EFF6FF", border: "1px solid #3B82F6" }}
//           >
//             <Stage4S.RecommendationText style={{ fontWeight: "bold" }}>
//               선택된 평가 방법론: 휴리스틱 평가
//             </Stage4S.RecommendationText>
//             <Stage4S.RecommendationText style={{ marginLeft: "10px" }}>
//               Nielsen의 10가지 사용성 원칙을 기반으로 사용성 문제점을 식별하는
//               전문가 평가 방법론
//             </Stage4S.RecommendationText>
//           </Stage4S.RecommendationNotice>

//           {/* Heuristic Principles */}
//           <Stage4S.PrinciplesContainer>
//             <Stage4S.ModalSectionTitle>
//               평가 원칙 선택 및 가중치 설정
//             </Stage4S.ModalSectionTitle>
//             <Stage4S.ModalText style={{ marginBottom: "20px" }}>
//               핀테크 앱 디자인에 중요한 원칙을 선택하고 가중치를 조정하세요.
//               (권장: 최소 5개 이상 선택)
//             </Stage4S.ModalText>

//             {visibleHeuristicPrinciples.map((principle) => (
//               <Stage4S.PrincipleItem key={principle.id}>
//                 <Stage4S.PrincipleCheckbox
//                   isSelected={principle.isSelected}
//                   onClick={() => handleTogglePrinciple(principle.id)}
//                 >
//                   {principle.isSelected && "✓"}
//                 </Stage4S.PrincipleCheckbox>

//                 <Stage4S.PrincipleName isDisabled={!principle.isSelected}>
//                   {principle.id}. {principle.name}
//                 </Stage4S.PrincipleName>

//                 <Stage4S.SliderContainer>
//                   <Stage4S.Slider>
//                     <Stage4S.SliderFill
//                       value={principle.weight}
//                       isDisabled={!principle.isSelected}
//                     />
//                     <Stage4S.SliderThumb
//                       value={principle.weight}
//                       isDisabled={!principle.isSelected}
//                       // For simplicity, using static weights. In a real implementation,
//                       // this would likely have drag functionality or click positioning
//                     />
//                   </Stage4S.Slider>
//                 </Stage4S.SliderContainer>

//                 <Stage4S.WeightValue isDisabled={!principle.isSelected}>
//                   {principle.weight}%
//                 </Stage4S.WeightValue>
//               </Stage4S.PrincipleItem>
//             ))}

//             {!showAllHeuristicPrinciples && (
//               <Stage4S.ShowMoreButton
//                 onClick={() => setShowAllHeuristicPrinciples(true)}
//               >
//                 + 더 보기 (4개)
//               </Stage4S.ShowMoreButton>
//             )}
//           </Stage4S.PrinciplesContainer>

//           {/* Action Buttons */}
//           <Stage4S.ButtonsContainer>
//             <Stage4S.BackButton onClick={() => setShowHeuristicDetails(false)}>
//               이전
//             </Stage4S.BackButton>
//             <Stage4S.ResetButton onClick={handleResetToDefaults}>
//               기본값 복원
//             </Stage4S.ResetButton>
//             <Stage4S.NextButton onClick={handleNextStage}>
//               다음 단계
//             </Stage4S.NextButton>
//             <Stage4S.StageLabel>4</Stage4S.StageLabel>
//           </Stage4S.ButtonsContainer>
//         </S.ContentArea>
//       );
//     }

//     // Render SUS questions detailed settings
//     function renderSusDetails() {
//       return (
//         <S.ContentArea>
//           <S.ProgressBarContainer>
//             <S.ProgressBar progress={40} />
//           </S.ProgressBarContainer>

//           <S.Title>4단계: SUS 평가 세부 설정</S.Title>
//           <S.Subtitle>
//             SUS 평가에 사용할 문항을 확인하고 필요에 따라 수정하세요.
//           </S.Subtitle>

//           {/* Selected Method Info */}
//           <Stage4S.RecommendationNotice
//             style={{ backgroundColor: "#EFF6FF", border: "1px solid #3B82F6" }}
//           >
//             <Stage4S.RecommendationText style={{ fontWeight: "bold" }}>
//               선택된 평가 방법론: SUS 평가
//             </Stage4S.RecommendationText>
//             <Stage4S.RecommendationText style={{ marginLeft: "10px" }}>
//               System Usability Scale(SUS)은 10개 문항을 5점 리커트 척도로
//               평가하여 시스템 사용성을 측정합니다.
//             </Stage4S.RecommendationText>
//           </Stage4S.RecommendationNotice>

//           {/* SUS Questions */}
//           <Stage4S.QuestionsContainer>
//             <Stage4S.ModalSectionTitle>SUS 문항 설정</Stage4S.ModalSectionTitle>
//             <Stage4S.ModalText style={{ marginBottom: "20px" }}>
//               핀테크 앱에 맞게 SUS 평가 문항이 자동 조정되었습니다. 필요시 수정
//               가능합니다.
//             </Stage4S.ModalText>

//             {visibleSusQuestions.map((question) => (
//               <Stage4S.QuestionItem key={question.id}>
//                 <Stage4S.QuestionCheckbox
//                   isSelected={question.isSelected}
//                   onClick={() => handleToggleQuestion(question.id)}
//                 >
//                   {question.isSelected && "✓"}
//                 </Stage4S.QuestionCheckbox>

//                 <Stage4S.QuestionText>
//                   {question.id}. {question.text}
//                 </Stage4S.QuestionText>

//                 <Stage4S.EditButton>✎</Stage4S.EditButton>
//               </Stage4S.QuestionItem>
//             ))}

//             {!showAllSusQuestions && (
//               <Stage4S.ShowMoreButton
//                 onClick={() => setShowAllSusQuestions(true)}
//               >
//                 + 더 보기 (5개)
//               </Stage4S.ShowMoreButton>
//             )}

//             <Stage4S.AddQuestionButton style={{ marginTop: "20px" }}>
//               + 핀테크 특화 문항 추가
//             </Stage4S.AddQuestionButton>
//           </Stage4S.QuestionsContainer>

//           {/* Action Buttons */}
//           <Stage4S.ButtonsContainer>
//             <Stage4S.BackButton onClick={() => setShowSusDetails(false)}>
//               이전
//             </Stage4S.BackButton>
//             <Stage4S.ResetButton onClick={handleResetToDefaults}>
//               표준 문항으로
//             </Stage4S.ResetButton>
//             <Stage4S.NextButton onClick={handleNextStage}>
//               다음 단계
//             </Stage4S.NextButton>
//             <Stage4S.StageLabel>4</Stage4S.StageLabel>
//           </Stage4S.ButtonsContainer>
//         </S.ContentArea>
//       );
//     }

//     // Render custom methodology form
//     function renderCustomMethodology() {
//       return (
//         <S.ContentArea>
//           <S.ProgressBarContainer>
//             <S.ProgressBar progress={40} />
//           </S.ProgressBarContainer>

//           <S.Title>4단계: 사용자 정의 평가 방법론</S.Title>
//           <S.Subtitle>직접 입력한 평가 방법론을 설정하세요.</S.Subtitle>

//           {/* AI Recommendation Notice - Dimmed */}
//           <Stage4S.RecommendationNotice
//             style={{
//               backgroundColor: "#f8fafc",
//               border: "1px solid #e2e8f0",
//               opacity: 0.6,
//             }}
//           >
//             <Stage4S.RecommendationIcon style={{ backgroundColor: "#94a3b8" }}>
//               ✓
//             </Stage4S.RecommendationIcon>
//             <Stage4S.RecommendationText style={{ color: "#94a3b8" }}>
//               AI 추천:
//             </Stage4S.RecommendationText>
//             <Stage4S.RecommendationText
//               style={{ marginLeft: "10px", color: "#94a3b8" }}
//             >
//               핀테크 모바일 앱 UI 디자인을 위해
//             </Stage4S.RecommendationText>
//             <Stage4S.RecommendationText
//               style={{
//                 marginLeft: "10px",
//                 color: "#94a3b8",
//                 fontWeight: "bold",
//               }}
//             >
//               휴리스틱 평가 방법론
//             </Stage4S.RecommendationText>
//             <Stage4S.RecommendationText
//               style={{ marginLeft: "10px", color: "#94a3b8" }}
//             >
//               을 우선 추천합니다.
//             </Stage4S.RecommendationText>
//             <Stage4S.RecommendationText
//               style={{
//                 marginLeft: "auto",
//                 color: "#3B82F6",
//                 cursor: "pointer",
//               }}
//               onClick={() => {
//                 setSelectedMethodology("heuristic");
//                 setShowHeuristicDetails(true);
//               }}
//             >
//               추천 사용
//             </Stage4S.RecommendationText>
//           </Stage4S.RecommendationNotice>

//           {/* Custom Method Form */}
//           <Stage4S.CustomFormContainer>
//             <Stage4S.ModalSectionTitle>
//               사용자 정의 평가 방법론
//             </Stage4S.ModalSectionTitle>

//             <Stage4S.FormField>
//               <Stage4S.FormLabel>방법론 이름</Stage4S.FormLabel>
//               <Stage4S.FormInput
//                 type="text"
//                 value={customMethodology.name}
//                 onChange={(e) =>
//                   handleCustomMethodologyChange("name", e.target.value)
//                 }
//                 placeholder="평가 방법론 이름을 입력하세요"
//               />
//             </Stage4S.FormField>

//             <Stage4S.FormField>
//               <Stage4S.FormLabel>방법론 설명</Stage4S.FormLabel>
//               <Stage4S.FormTextarea
//                 value={customMethodology.description}
//                 onChange={(e) =>
//                   handleCustomMethodologyChange("description", e.target.value)
//                 }
//                 placeholder="평가 방법론의 목적과 접근 방식을 설명해주세요"
//               />
//             </Stage4S.FormField>

//             <Stage4S.FormField>
//               <Stage4S.FormLabel>주요 평가 요소</Stage4S.FormLabel>
//               <Stage4S.FormTextarea
//                 value={customMethodology.evaluationElements}
//                 onChange={(e) =>
//                   handleCustomMethodologyChange(
//                     "evaluationElements",
//                     e.target.value
//                   )
//                 }
//                 placeholder="평가에 사용할 주요 평가 요소를 입력해주세요 (예: 1. 태스크 완료율, 2. 학습 용이성 등)"
//               />
//             </Stage4S.FormField>
//           </Stage4S.CustomFormContainer>

//           {/* Action Buttons */}
//           <Stage4S.ButtonsContainer>
//             <Stage4S.BackButton onClick={() => setSelectedMethodology(null)}>
//               이전
//             </Stage4S.BackButton>
//             <Stage4S.ResetButton onClick={handleResetToDefaults}>
//               초기화
//             </Stage4S.ResetButton>
//             <Stage4S.NextButton
//               disabled={!isStage4Complete}
//               onClick={handleNextStage}
//             >
//               다음 단계
//             </Stage4S.NextButton>
//             <Stage4S.StageLabel>4</Stage4S.StageLabel>
//           </Stage4S.ButtonsContainer>
//         </S.ContentArea>
//       );
//     }

//     // Render transition screen to Stage 5
//     function renderStage4TransitionScreen() {
//       return (
//         <Stage4S.TransitionScreen>
//           <Stage4S.TransitionTitle>5단계로 이동 중...</Stage4S.TransitionTitle>

//           <Stage4S.LoadingDotsContainer>
//             {[0, 1, 2].map((i) => (
//               <Stage4S.LoadingDot key={i} index={i} />
//             ))}
//           </Stage4S.LoadingDotsContainer>

//           <Stage4S.MethodInfo>
//             <Stage4S.MethodInfoTitle>
//               선택된 평가 방법론:{" "}
//               {selectedMethodology === "heuristic"
//                 ? "휴리스틱 평가"
//                 : selectedMethodology === "sus"
//                 ? "SUS 평가"
//                 : selectedMethodology === "semantic"
//                 ? "시맨틱 차이 평가"
//                 : "사용자 정의 평가"}
//             </Stage4S.MethodInfoTitle>

//             {selectedMethodology === "heuristic" && (
//               <Stage4S.MethodInfoText>
//                 사용성 원칙에 따른 전문가 평가 방법론
//               </Stage4S.MethodInfoText>
//             )}

//             {selectedMethodology === "sus" && (
//               <Stage4S.MethodInfoText>
//                 10개 항목의 설문을 통한 정량적 평가
//               </Stage4S.MethodInfoText>
//             )}

//             {selectedMethodology === "semantic" && (
//               <Stage4S.MethodInfoText>
//                 대비되는 형용사 쌍으로 평가
//               </Stage4S.MethodInfoText>
//             )}

//             {selectedMethodology === "custom" && (
//               <Stage4S.MethodInfoText>
//                 {customMethodology.description}
//               </Stage4S.MethodInfoText>
//             )}
//           </Stage4S.MethodInfo>

//           <Stage4S.StageLabelsContainer>
//             <Stage4S.StageIndicator isActive={true} isCurrent={false}>
//               1
//             </Stage4S.StageIndicator>
//             <Stage4S.StageIndicator isActive={true} isCurrent={false}>
//               2
//             </Stage4S.StageIndicator>
//             <Stage4S.StageIndicator isActive={true} isCurrent={false}>
//               3
//             </Stage4S.StageIndicator>
//             <Stage4S.StageIndicator isActive={true} isCurrent={false}>
//               4
//             </Stage4S.StageIndicator>
//             <Stage4S.StageIndicator isActive={true} isCurrent={true}>
//               5
//             </Stage4S.StageIndicator>
//           </Stage4S.StageLabelsContainer>
//         </Stage4S.TransitionScreen>
//       );
//     }
//   };

//   // Effect for auto-completing Stage 5 generation
//   useEffect(() => {
//     if (isStage5Generating && currentStage === 5) {
//       const interval = setInterval(() => {
//         setStage5GenerationProgress((prev) => {
//           if (prev >= 100) {
//             clearInterval(interval);
//             setTimeout(() => {
//               setIsStage5Generating(false);
//             }, 500);
//             return 100;
//           }
//           return prev + 5;
//         });
//       }, 300);

//       return () => clearInterval(interval);
//     }
//   }, [
//     isStage5Generating,
//     currentStage,
//     setStage5GenerationProgress,
//     setIsStage5Generating,
//   ]);

//   // Effect for auto-completing Stage 6 evaluation
//   useEffect(() => {
//     if (isStage6Evaluating && currentStage === 6) {
//       const interval = setInterval(() => {
//         setStage6EvaluationProgress((prev) => {
//           if (prev >= 100) {
//             clearInterval(interval);
//             setTimeout(() => {
//               setIsStage6Evaluating(false);
//             }, 500);
//             return 100;
//           }
//           return prev + 5;
//         });
//       }, 300);

//       return () => clearInterval(interval);
//     }
//   }, [
//     isStage6Evaluating,
//     currentStage,
//     setStage6EvaluationProgress,
//     setIsStage6Evaluating,
//   ]);

//   // Modal mouse event handlers for sliders
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (sliderDragging && currentEditingItem) {
//         const slider = document.getElementById("weightSlider");
//         if (slider) {
//           const rect = slider.getBoundingClientRect();
//           const width = rect.width;
//           const x = e.clientX - rect.left;
//           const percentage = Math.min(100, Math.max(0, (x / width) * 100));

//           // Round to nearest 5
//           const roundedValue = Math.round(percentage / 5) * 5;

//           setCurrentEditingItem({
//             ...currentEditingItem,
//             weight: roundedValue,
//           });
//         }
//       }
//     };

//     const handleMouseUp = () => {
//       setSliderDragging(false);
//     };

//     if (sliderDragging) {
//       window.addEventListener("mousemove", handleMouseMove);
//       window.addEventListener("mouseup", handleMouseUp);
//     }

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [sliderDragging, currentEditingItem, setCurrentEditingItem]);

//   // Adjusted Score slider handlers for Stage 7
//   const handleScoreSliderStart = (index, e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     setDragStartX(e.clientX);
//     setDragStartValue(stage7Scores[index].score);

//     const updatedScores = [...stage7Scores];
//     updatedScores.forEach((score, i) => {
//       updatedScores[i] = { ...score, isAdjusting: i === index };
//     });
//     setStage7Scores(updatedScores);

//     document.addEventListener("mousemove", handleScoreSliderMove);
//     document.addEventListener("mouseup", handleScoreSliderEnd);
//   };

//   const handleScoreSliderMove = (e) => {
//     const activeIndex = stage7Scores.findIndex((score) => score.isAdjusting);
//     if (activeIndex === -1) return;

//     const slider = document.getElementById(`scoreSlider_${activeIndex}`);
//     if (slider) {
//       const rect = slider.getBoundingClientRect();
//       const width = rect.width;
//       const x = e.clientX - rect.left;
//       const percentage = Math.min(100, Math.max(0, (x / width) * 100));

//       // Round to nearest 5
//       const roundedValue = Math.round(percentage / 5) * 5;

//       const updatedScores = [...stage7Scores];
//       updatedScores[activeIndex] = {
//         ...updatedScores[activeIndex],
//         score: roundedValue,
//       };
//       setStage7Scores(updatedScores);
//       setIsStage7Complete(true);
//     }
//   };

//   const handleScoreSliderEnd = () => {
//     const updatedScores = stage7Scores.map((score) => ({
//       ...score,
//       isAdjusting: false,
//     }));
//     setStage7Scores(updatedScores);

//     document.removeEventListener("mousemove", handleScoreSliderMove);
//     document.removeEventListener("mouseup", handleScoreSliderEnd);
//   };

//   // Function to handle editing an item
//   const handleEditItem = (item) => {
//     setCurrentEditingItem({ ...item });
//     setShowEditItemModal(true);
//   };

//   // Function to handle saving an edited item
//   const handleSaveEditedItem = () => {
//     const updatedItems = stage5EvaluationDesign.items.map((item) =>
//       item.id === currentEditingItem.id
//         ? { ...currentEditingItem, isEditing: false }
//         : item
//     );

//     setStage5EvaluationDesign({
//       ...stage5EvaluationDesign,
//       items: updatedItems,
//     });

//     setShowEditItemModal(false);
//     setCurrentEditingItem(null);
//   };

//   // Function to handle editing the overview
//   const handleEditOverview = () => {
//     setEditingOverview(stage5EvaluationDesign.overview);
//     setShowEditOverviewModal(true);
//   };

//   // Function to handle saving an edited overview
//   const handleSaveEditedOverview = () => {
//     setStage5EvaluationDesign({
//       ...stage5EvaluationDesign,
//       overview: editingOverview,
//     });

//     setShowEditOverviewModal(false);
//     setEditingOverview("");
//   };

//   // Function to handle adding a new item
//   const handleAddItem = () => {
//     setNewItem({
//       title: "",
//       description: "",
//       weight: 10,
//       details: "",
//     });
//     setShowAddItemModal(true);
//   };

//   // Function to handle using a suggested item
//   const handleUseSuggestedItem = (suggestedItem) => {
//     setNewItem({
//       ...suggestedItem,
//       details: "",
//     });
//   };

//   // Function to handle saving a new item
//   const handleSaveNewItem = () => {
//     const nextId =
//       Math.max(...stage5EvaluationDesign.items.map((item) => item.id)) + 1;

//     const newItemWithId = {
//       ...newItem,
//       id: nextId,
//       isEditing: false,
//     };

//     setStage5EvaluationDesign({
//       ...stage5EvaluationDesign,
//       items: [...stage5EvaluationDesign.items, newItemWithId],
//     });

//     setShowAddItemModal(false);
//     setNewItem({
//       title: "",
//       description: "",
//       weight: 10,
//       details: "",
//     });
//   };

//   // Function to handle going to next stage
//   const handleNextStage = () => {
//     setIsTransitioning(true);

//     // Simulate transition animation with a timeout
//     setTimeout(() => {
//       setCurrentStage(currentStage + 1);
//       setIsTransitioning(false);
//     }, 2000);
//   };

//   // Function to toggle feedback form in Stage 7
//   const handleToggleFeedback = () => {
//     setShowAddFeedback(!showAddFeedback);
//     if (!showAddFeedback) {
//       setIsStage7Complete(true);
//     }
//   };

//   // Render Stage 5 Generation Screen
//   const renderStage5Generation = () => {
//     return (
//       <S.ContentArea>
//         <S.ProgressBarContainer>
//           <S.ProgressBar progress={50} />
//         </S.ProgressBarContainer>

//         <S.Title>5단계: AI 평가 설계 자동 생성</S.Title>
//         <S.Subtitle>
//           {isStage5Generating
//             ? `핀테크 모바일 앱 UI 디자인에 대한 ${
//                 selectedMethodology === "heuristic" ? "휴리스틱" : "SUS"
//               } 평가 설계를 생성하고 있습니다.`
//             : "AI가 자동으로 생성한 평가 설계를 확인하고 필요한 경우 수정하세요."}
//         </S.Subtitle>

//         {isStage5Generating ? (
//           <>
//             <S.GenerationContainer>
//               <S.GenerationTitle>평가 설계 생성 중...</S.GenerationTitle>

//               <S.ProgressCircleContainer>
//                 <S.ProgressCircle />
//                 <S.ProgressCircleFill />
//                 <S.ProgressText>{stage5GenerationProgress}%</S.ProgressText>
//               </S.ProgressCircleContainer>

//               <S.StatusText>
//                 {stage5GenerationProgress < 50
//                   ? "휴리스틱 평가 항목 생성 중..."
//                   : "평가 가중치 및 세부 지표 최적화 중..."}
//               </S.StatusText>
//             </S.GenerationContainer>

//             <S.MethodInfoContainer>
//               <S.MethodInfoTitle>
//                 선택된 평가 방법론:{" "}
//                 {selectedMethodology === "heuristic"
//                   ? "휴리스틱 평가"
//                   : "SUS 평가"}
//               </S.MethodInfoTitle>
//               <S.MethodInfoText>
//                 {selectedMethodology === "heuristic"
//                   ? "Nielsen의 사용성 원칙을 기반으로 평가 설계를 자동으로 생성합니다."
//                   : "시스템 사용성 척도(SUS)를 기반으로 평가 설계를 자동으로 생성합니다."}
//               </S.MethodInfoText>
//               <S.MethodInfoText>
//                 핀테크 앱 UI에 최적화된 평가 항목과 가중치를 구성 중입니다.
//               </S.MethodInfoText>
//             </S.MethodInfoContainer>

//             <S.ButtonsContainer>
//               <S.BackButton onClick={handleBackButton}>취소</S.BackButton>
//               <S.NextButton disabled={true}>다음 단계</S.NextButton>
//               <S.StageLabel>5</S.StageLabel>
//             </S.ButtonsContainer>
//           </>
//         ) : (
//           <>
//             <S.CardContainer>
//               <S.CardHeader>
//                 <S.CardTitle>평가 설계 개요</S.CardTitle>
//                 <S.SuccessIcon>✓</S.SuccessIcon>
//               </S.CardHeader>

//               <S.CardContent>
//                 <S.EvaluationItem>
//                   <S.ItemContent>
//                     <S.ItemTitle>{stage5EvaluationDesign.overview}</S.ItemTitle>
//                   </S.ItemContent>
//                   <S.EditButton onClick={handleEditOverview}>✎</S.EditButton>
//                 </S.EvaluationItem>
//               </S.CardContent>
//             </S.CardContainer>

//             <S.CardContainer>
//               <S.CardHeader>
//                 <S.CardTitle>평가 항목</S.CardTitle>
//               </S.CardHeader>

//               <S.CardContent>
//                 {stage5EvaluationDesign.items.map((item) => (
//                   <S.EvaluationItem key={item.id} isNew={item.isNew}>
//                     <S.ItemContent>
//                       <S.ItemTitle>
//                         {item.id}. {item.title} ({item.description})
//                       </S.ItemTitle>
//                     </S.ItemContent>
//                     <S.ItemWeight>가중치: {item.weight}%</S.ItemWeight>
//                     <S.EditButton onClick={() => handleEditItem(item)}>
//                       ✎
//                     </S.EditButton>
//                   </S.EvaluationItem>
//                 ))}

//                 <S.AddItemButton onClick={handleAddItem}>
//                   + 항목 추가
//                 </S.AddItemButton>
//               </S.CardContent>
//             </S.CardContainer>

//             <S.ButtonsContainer>
//               <S.BackButton onClick={handleBackButton}>이전</S.BackButton>
//               <S.NextButton
//                 onClick={handleNextStage}
//                 style={{ marginLeft: "auto" }}
//               >
//                 다음 단계
//               </S.NextButton>
//               <S.StageLabel>5</S.StageLabel>
//             </S.ButtonsContainer>
//           </>
//         )}
//       </S.ContentArea>
//     );
//   };

//   // Stage 6: AI Evaluation Process and Results
//   const renderStage6Evaluation = () => {
//     return (
//       <S.ContentArea>
//         <S.ProgressBarContainer>
//           <S.ProgressBar progress={60} />
//         </S.ProgressBarContainer>

//         <S.Title>6단계: AI 평가 진행 및 결과 도출</S.Title>
//         <S.Subtitle>
//           {isStage6Evaluating
//             ? "AI가 설정된 평가 항목에 따라 디자인을 평가하고 있습니다."
//             : "핀테크 모바일 앱 UI 디자인 평가가 완료되었습니다."}
//         </S.Subtitle>

//         {isStage6Evaluating ? (
//           <div style={{ maxWidth: "1000px", margin: "30px auto" }}>
//             <div style={{ textAlign: "center", marginBottom: "20px" }}>
//               <div
//                 style={{
//                   fontSize: "18px",
//                   fontWeight: "bold",
//                   color: "#1e293b",
//                   marginBottom: "20px",
//                 }}
//               >
//                 AI 평가 진행 중...
//               </div>

//               {/* 원형 로딩바 */}
//               <div
//                 style={{
//                   width: "140px",
//                   height: "140px",
//                   position: "relative",
//                   margin: "0 auto 30px",
//                 }}
//               >
//                 <svg width="140" height="140" viewBox="0 0 140 140">
//                   {/* 배경 원 */}
//                   <circle
//                     cx="70"
//                     cy="70"
//                     r="65"
//                     fill="none"
//                     stroke="#e2e8f0"
//                     strokeWidth="8"
//                   />
//                   {/* 진행 원 */}
//                   <circle
//                     cx="70"
//                     cy="70"
//                     r="65"
//                     fill="none"
//                     stroke="#4f46e5"
//                     strokeWidth="8"
//                     strokeDasharray="408"
//                     strokeDashoffset={
//                       408 - (408 * stage6EvaluationProgress) / 100
//                     }
//                     transform="rotate(-90 70 70)"
//                     style={{ transition: "stroke-dashoffset 0.5s ease" }}
//                   />
//                 </svg>
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "50%",
//                     left: "50%",
//                     transform: "translate(-50%, -50%)",
//                     fontSize: "24px",
//                     fontWeight: "bold",
//                     color: "#4f46e5",
//                   }}
//                 >
//                   {stage6EvaluationProgress}%
//                 </div>
//               </div>
//             </div>

//             <S.TwoColumnLayout>
//               <S.Column flex="0.6">
//                 <S.DesignPreviewContainer>
//                   <S.AppPreviewPattern />
//                   <S.AppPreviewButton />
//                   <S.ScanLine />
//                 </S.DesignPreviewContainer>
//               </S.Column>

//               <S.Column flex="0.4">
//                 <S.CurrentItemContainer>
//                   <S.CurrentItemText>
//                     현재 평가 중: {currentEvaluatingItem}
//                   </S.CurrentItemText>
//                   <S.ItemProgressBar>
//                     <S.ItemProgressFill progress={66} />
//                   </S.ItemProgressBar>

//                   <S.EvaluationStatusText>
//                     총 6개 항목 중 {completedItems.length}개 완료 (
//                     {completedItems.join(", ")})
//                   </S.EvaluationStatusText>

//                   <S.EvaluationStatusText>
//                     남은 예상 시간: 약 1분
//                   </S.EvaluationStatusText>
//                 </S.CurrentItemContainer>
//               </S.Column>
//             </S.TwoColumnLayout>
//           </div>
//         ) : showDetailedResults ? (
//           renderDetailedResults()
//         ) : (
//           renderEvaluationResults6()
//         )}

//         <S.ButtonsContainer style={{ maxWidth: "1000px", margin: "30px auto" }}>
//           <S.BackButton onClick={handleBackButton}>
//             {showDetailedResults ? "결과 요약" : "이전"}
//           </S.BackButton>
//           <S.StageLabel active={true}>6</S.StageLabel>

//           {isStage6Evaluating ? (
//             <S.NextButton disabled={true} style={{ marginLeft: "auto" }}>
//               다음 단계
//             </S.NextButton>
//           ) : showDetailedResults ? (
//             <S.NextButton
//               onClick={() => setShowDetailedResults(false)}
//               style={{ marginLeft: "auto" }}
//             >
//               결과 요약
//             </S.NextButton>
//           ) : (
//             <>
//               <S.BackButton onClick={() => setShowDetailedResults(true)}>
//                 세부 보기
//               </S.BackButton>
//               <S.NextButton
//                 onClick={handleNextStage}
//                 style={{ marginLeft: "auto" }}
//               >
//                 다음 단계
//               </S.NextButton>
//             </>
//           )}
//         </S.ButtonsContainer>
//       </S.ContentArea>
//     );
//   };

//   // Render Evaluation Results for Stage 6
//   const renderEvaluationResults6 = () => {
//     return (
//       <>
//         <S.TwoColumnLayout>
//           <S.Column>
//             <S.ScoreCardContainer>
//               <S.ScoreCardTitle>종합 평가 점수</S.ScoreCardTitle>
//               <S.OverallScoreContainer>
//                 <S.OverallScoreText>
//                   {evaluationResults.overallScore}
//                 </S.OverallScoreText>
//                 <S.ScoreBadge>/ 100</S.ScoreBadge>
//               </S.OverallScoreContainer>
//             </S.ScoreCardContainer>
//           </S.Column>

//           <S.Column>
//             <S.ScoreCardContainer>
//               <S.ScoreCardTitle>카테고리별 점수</S.ScoreCardTitle>

//               {evaluationResults.categoryScores.map((category, index) => (
//                 <S.CategoryScoreRow key={index}>
//                   <S.CategoryName>{category.name}</S.CategoryName>
//                   <S.ScoreBar>
//                     <S.ScoreBarFill score={category.score} />
//                   </S.ScoreBar>
//                   <S.ScoreText>{category.score}%</S.ScoreText>
//                 </S.CategoryScoreRow>
//               ))}
//             </S.ScoreCardContainer>
//           </S.Column>
//         </S.TwoColumnLayout>

//         <S.TwoColumnLayout>
//           <S.Column>
//             <S.HeatmapContainer>
//               <S.ScoreCardTitle>UI 요소 평가 히트맵</S.ScoreCardTitle>

//               <S.HeatmapPreview>
//                 <S.AppPreviewPattern />
//                 <S.HeatmapPattern />
//                 <S.HeatmapOverlay />
//               </S.HeatmapPreview>

//               <S.HeatmapLegend>
//                 <S.LegendItem>
//                   <S.LegendColor color="#22C55E" />
//                   <S.LegendText>우수</S.LegendText>
//                 </S.LegendItem>

//                 <S.LegendItem>
//                   <S.LegendColor color="#FBBF24" />
//                   <S.LegendText>개선 필요</S.LegendText>
//                 </S.LegendItem>

//                 <S.LegendItem>
//                   <S.LegendColor color="#EF4444" />
//                   <S.LegendText>문제점</S.LegendText>
//                 </S.LegendItem>

//                 <S.DetailButton onClick={() => setShowHeatmapDetailModal(true)}>
//                   상세 보기
//                 </S.DetailButton>
//               </S.HeatmapLegend>
//             </S.HeatmapContainer>
//           </S.Column>

//           <S.Column>
//             <S.StrengthsWeaknessesContainer>
//               <S.StrengthsWeaknessesHeader>
//                 <S.CardTitle>강점 및 개선점</S.CardTitle>
//               </S.StrengthsWeaknessesHeader>

//               <S.CardContent>
//                 {/* Strengths */}
//                 <S.StrengthItem>
//                   <S.StrengthBullet />
//                   <S.ItemTextContent>
//                     <S.ItemTextTitle>강점</S.ItemTextTitle>
//                     <S.ItemTextDescription>
//                       · 색상 대비가 뛰어나 가독성이 좋음
//                     </S.ItemTextDescription>
//                     <S.ItemTextDescription>
//                       · 일관된 디자인 언어로 학습 용이성 높음
//                     </S.ItemTextDescription>
//                   </S.ItemTextContent>
//                 </S.StrengthItem>

//                 {/* Weaknesses */}
//                 <S.StrengthItem>
//                   <S.WeaknessBullet />
//                   <S.ItemTextContent>
//                     <S.ItemTextTitle>개선점</S.ItemTextTitle>
//                     <S.ItemTextDescription>
//                       · 오류 상태에 대한 피드백 부족
//                     </S.ItemTextDescription>
//                     <S.ItemTextDescription>
//                       · 일부 버튼의 터치 영역이 작음
//                     </S.ItemTextDescription>
//                   </S.ItemTextContent>
//                 </S.StrengthItem>

//                 <S.DetailButton
//                   style={{ display: "block", margin: "16px 0 0 auto" }}
//                   onClick={() => setShowStrengthsDetailModal(true)}
//                 >
//                   상세 보기
//                 </S.DetailButton>
//               </S.CardContent>
//             </S.StrengthsWeaknessesContainer>
//           </S.Column>
//         </S.TwoColumnLayout>
//       </>
//     );
//   };

//   // Render Detailed Results for Stage 6
//   const renderDetailedResults = () => {
//     const categoryDetail = evaluationResults.detailedResults[selectedCategory];

//     return (
//       <>
//         <S.CategoryTabs>
//           {Object.keys(evaluationResults.detailedResults).map((category) => (
//             <S.CategoryTab
//               key={category}
//               active={category === selectedCategory}
//               onClick={() => setSelectedCategory(category)}
//             >
//               {category}
//             </S.CategoryTab>
//           ))}
//         </S.CategoryTabs>

//         <S.TwoColumnLayout>
//           <S.Column flex="0.4">
//             <S.ScoreCardContainer>
//               <S.ScoreCardTitle>평가 점수: {selectedCategory}</S.ScoreCardTitle>
//               <S.OverallScoreText style={{ fontSize: "40px" }}>
//                 {categoryDetail.score}%
//               </S.OverallScoreText>
//             </S.ScoreCardContainer>
//           </S.Column>

//           <S.Column flex="0.6">
//             <S.ScoreCardContainer>
//               <S.ScoreCardTitle>세부 항목 점수</S.ScoreCardTitle>

//               {categoryDetail.subScores.map((item, index) => (
//                 <S.CategoryScoreRow key={index}>
//                   <S.CategoryName>{item.name}</S.CategoryName>
//                   <S.ScoreBar>
//                     <S.ScoreBarFill score={item.score} />
//                   </S.ScoreBar>
//                   <S.ScoreText>{item.score}%</S.ScoreText>
//                 </S.CategoryScoreRow>
//               ))}
//             </S.ScoreCardContainer>
//           </S.Column>
//         </S.TwoColumnLayout>

//         <S.CardContainer>
//           <S.CardHeader>
//             <S.CardTitle>상세 분석</S.CardTitle>
//           </S.CardHeader>

//           <S.CardContent>
//             {categoryDetail.positives.map((item, index) => (
//               <S.DetailRow key={`pos-${index}`} positive>
//                 <S.ItemTextTitle>{item.title}</S.ItemTextTitle>
//                 <S.ItemTextDescription>
//                   {item.description}
//                 </S.ItemTextDescription>
//               </S.DetailRow>
//             ))}

//             {categoryDetail.negatives.map((item, index) => (
//               <S.DetailRow key={`neg-${index}`} negative>
//                 <S.ItemTextTitle>{item.title}</S.ItemTextTitle>
//                 <S.ItemTextDescription>
//                   {item.description}
//                 </S.ItemTextDescription>
//               </S.DetailRow>
//             ))}
//           </S.CardContent>
//         </S.CardContainer>
//       </>
//     );
//   };

//   // 7단계 수정 함수 - 저장 버튼 클릭 시 다음 단계로 넘어가지 않고 완료 메시지 표시
//   const handleStage7Complete = () => {
//     // 저장 완료 메시지 표시
//     alert("평가 결과가 성공적으로 저장되었습니다.");

//     // 완료 상태로 설정
//     setIsStage7Complete(true);
//   };

//   // 모든 atom 값을 초기화하는 함수 수정
//   const resetAllAtoms = () => {
//     // Stage 1 데이터 초기화
//     setEvaluationType(null);
//     setSubOption(null);
//     setCustomInput("");
//     setIsAnalyzing(false);
//     setAnalysisResults(null);

//     // Stage 2 데이터 초기화
//     setFile(null);
//     setFilePreview(null);
//     setUploadStatus("empty");
//     setUploadProgress(0);
//     setDesignTitle("");
//     setDesignType("");
//     setIsTypeDropdownOpen(false);
//     setDesignPurpose("");

//     // Stage 3 데이터 초기화
//     setIsEvaluating(false);
//     setEvaluationProgress(0);
//     setEvaluationResults(null);
//     setSelectedFeedbackCategory("all");
//     setFeedbackRecommendations([]);
//     setShowExportModal(false);
//     setExportFormat("pdf");

//     // Stage 4 데이터 초기화
//     setSelectedMethodology(null);
//     setShowMethodologyDetailModal(false);
//     setActiveDetailMethodology(null);
//     setHeuristicPrinciples([]);
//     setSusQuestions([]);
//     setCustomMethodology({ name: "", description: "", principles: [] });
//     setShowHeuristicDetails(false);
//     setShowSusDetails(false);
//     setIsStage4Transitioning(false);

//     // Stage 5 데이터 초기화
//     setStage5GenerationProgress(0);
//     setIsStage5Generating(false);
//     setStage5EvaluationDesign({
//       overview: "",
//       items: [],
//     });
//     setShowEditItemModal(false);
//     setCurrentEditingItem(null);
//     setShowEditOverviewModal(false);
//     setEditingOverview("");
//     setShowAddItemModal(false);
//     setNewItem({
//       title: "",
//       description: "",
//       weight: 10,
//       details: "",
//     });

//     // Stage 6 데이터 초기화
//     setStage6EvaluationProgress(0);
//     setIsStage6Evaluating(true); // 평가 중 상태로 설정
//     // 오류가 발생한 부분 수정
//     // currentEvaluatingItem과 completedItems는 atom 값이므로 직접 수정하지 않고 상태 설정 함수 사용
//     // setCurrentEvaluatingItem(""); // 이 부분 제거
//     // setCompletedItems([]); // 이 부분 제거
//     setShowHeatmapDetailModal(false);
//     setShowStrengthsDetailModal(false);
//     setShowWeaknessesDetailModal(false);
//     setSelectedTab("strengths");
//     setShowDetailedResults(false);
//     setSelectedCategory("");

//     // Stage 7 데이터 초기화
//     setStage7Scores([]);
//     setShowAddFeedback(false);
//     setFeedbackText("");
//     setIsStage7Complete(false);

//     // 현재 단계를 1로 설정
//     setCurrentStage(1);
//   };

//   // 처음으로 버튼 클릭 핸들러
//   const handleRestart = () => {
//     // 확인 메시지 표시
//     if (
//       window.confirm(
//         "처음부터 다시 시작하시겠습니까? 모든 데이터가 초기화됩니다."
//       )
//     ) {
//       resetAllAtoms();
//     }
//   };

//   // Stage 7: Evaluation Results Modification and Feedback
//   const renderStage7Modification = () => {
//     return (
//       <S.ContentArea>
//         <S.ProgressBarContainer>
//           <S.ProgressBar progress={100} /> {/* 100%로 설정하여 완료 표시 */}
//         </S.ProgressBarContainer>

//         <S.Title>7단계: AI 평가 결과 수정</S.Title>
//         <S.Subtitle>
//           평가 결과를 검토하고 필요시 점수와 피드백을 수정하세요.
//         </S.Subtitle>

//         <S.FormContainer>
//           <S.FormTitle>평가 점수 조정</S.FormTitle>

//           {stage7Scores.map((score, index) => (
//             <S.ScoreSliderRow key={index} active={score.isAdjusting}>
//               <S.ScoreName>{score.name}</S.ScoreName>
//               <S.ScoreSlider id={`scoreSlider_${index}`}>
//                 <S.ScoreSliderFill value={score.score} />
//                 <S.ScoreSliderThumb
//                   value={score.score}
//                   active={score.isAdjusting}
//                   onMouseDown={(e) => handleScoreSliderStart(index, e)}
//                 />
//               </S.ScoreSlider>
//               <S.ScoreValue>{score.score}%</S.ScoreValue>
//             </S.ScoreSliderRow>
//           ))}
//         </S.FormContainer>

//         <S.FeedbackContainer
//           active={showAddFeedback}
//           onClick={!showAddFeedback ? handleToggleFeedback : undefined}
//         >
//           <S.FeedbackTitle active={showAddFeedback}>
//             {showAddFeedback ? "평가 의견 추가" : "+ 평가 의견 추가하기"}
//           </S.FeedbackTitle>

//           {showAddFeedback && (
//             <>
//               <S.FeedbackTextArea
//                 value={feedbackText}
//                 onChange={(e) => setFeedbackText(e.target.value)}
//                 placeholder="평가 결과에 대한 의견이나 추가 피드백을 입력하세요..."
//               />
//               <S.FeedbackNote>
//                 * 추가한 의견은 AI 평가 시스템 개선을 위한 학습 데이터로
//                 활용됩니다.
//               </S.FeedbackNote>
//             </>
//           )}
//         </S.FeedbackContainer>

//         {/* 버튼 컨테이너 수정 - 처음으로 버튼 추가 */}
//         <S.ButtonsContainer style={{ maxWidth: "1000px", margin: "30px auto" }}>
//           <S.BackButton onClick={handleBackButton}>이전</S.BackButton>
//           <S.BackButton onClick={handleRestart} style={{ marginLeft: "16px" }}>
//             처음으로
//           </S.BackButton>
//           <S.StageLabel active={true}>7</S.StageLabel>
//           <S.NextButton
//             onClick={handleStage7Complete}
//             disabled={!isStage7Complete}
//             style={{ marginLeft: "auto" }}
//           >
//             저장
//           </S.NextButton>
//         </S.ButtonsContainer>
//       </S.ContentArea>
//     );
//   };

//   // Render transition screen to next stage
//   const renderTransitionScreen = () => {
//     const nextStage = currentStage + 1;

//     // 박스 내용 결정
//     const getBoxContent = () => {
//       if (currentStage === 5 || currentStage === 6) {
//         return true; // 5단계나 6단계에서는 SummaryContainer가 있으므로 박스 표시
//       }
//       return false; // 다른 단계에서는 박스 숨김
//     };

//     const showBox = getBoxContent();

//     return (
//       <S.TransitionScreen>
//         <S.TransitionTitle>{nextStage}단계로 이동 중...</S.TransitionTitle>

//         <S.LoadingDotsContainer>
//           {[0, 1, 2].map((i) => (
//             <S.LoadingDot key={i} index={i} />
//           ))}
//         </S.LoadingDotsContainer>
//         <S.TransitionInfo>
//           {nextStage === 2 ? (
//             <>
//               <S.TransitionInfoText isTitle={true}>
//                 2단계: 평가 대상 정보 입력 및 이미지 업로드
//               </S.TransitionInfoText>
//               <S.TransitionInfoText>
//                 선택한{" "}
//                 {evaluationType === "quantitative"
//                   ? "정량적 평가"
//                   : evaluationType === "qualitative"
//                   ? "정성적 평가"
//                   : "비교 평가"}
//                 를 위한 평가 대상 정보를 입력합니다.
//               </S.TransitionInfoText>
//             </>
//           ) : (
//             <>
//               <S.TransitionInfoText isTitle={true}>
//                 3단계: 평가 실행 및 결과 확인
//               </S.TransitionInfoText>
//               <S.TransitionInfoText>
//                 디자인 평가 데이터 준비 중...
//               </S.TransitionInfoText>
//               <S.TransitionInfoText>
//                 디자인 파일: {designTitle}
//               </S.TransitionInfoText>
//             </>
//           )}
//         </S.TransitionInfo>

//         {nextStage === 3 && (
//           <div className="my-6">
//             <S.FilePreview
//               src={filePreview}
//               style={{ width: "150px", height: "100px" }}
//             />
//           </div>
//         )}

//         {/* 단계 표시기 */}
//         <S.StageLabelsContainer>
//           {[1, 2, 3, 4, 5, 6, 7].map((stage) => (
//             <S.StageIndicator
//               key={stage}
//               isActive={true}
//               isCurrent={stage === nextStage}
//             >
//               {stage}
//             </S.StageIndicator>
//           ))}
//         </S.StageLabelsContainer>

//         {/* 박스는 내용이 있을 때만 표시 */}
//         {showBox && (
//           <S.SummaryContainer>
//             {currentStage === 5 && (
//               <>
//                 <S.SummaryTitle>
//                   핀테크 모바일 앱 UI 디자인 평가 설계 완료
//                 </S.SummaryTitle>
//                 <S.SummaryText>
//                   총 {stage5EvaluationDesign.items.length}개 평가 항목
//                 </S.SummaryText>
//                 <S.SummaryText>
//                   평가 방법론:{" "}
//                   {selectedMethodology === "heuristic"
//                     ? "휴리스틱 평가"
//                     : "SUS 평가"}
//                 </S.SummaryText>
//               </>
//             )}

//             {currentStage === 6 && (
//               <>
//                 <S.SummaryTitle>
//                   핀테크 모바일 앱 UI 디자인 평가 결과
//                 </S.SummaryTitle>
//                 <S.SummaryText>
//                   종합 점수: {evaluationResults.overallScore}/100
//                 </S.SummaryText>
//                 <S.SummaryText>
//                   주요 개선점: 오류 상태 피드백, 터치 영역 최적화
//                 </S.SummaryText>
//               </>
//             )}
//           </S.SummaryContainer>
//         )}
//       </S.TransitionScreen>
//     );
//   };

//   // Render Edit Item Modal
//   const renderEditItemModal = () => {
//     if (!currentEditingItem) return null;

//     return (
//       <S.ModalOverlay>
//         <S.ModalContainer>
//           <S.ModalHeader>
//             <S.ModalTitle>평가 항목 수정</S.ModalTitle>
//             <S.CloseButton onClick={() => setShowEditItemModal(false)}>
//               ×
//             </S.CloseButton>
//           </S.ModalHeader>

//           <S.ModalContent>
//             <S.ModalFormGroup>
//               <S.ModalLabel>평가 항목 제목</S.ModalLabel>
//               <S.ModalInput
//                 value={currentEditingItem.title}
//                 onChange={(e) =>
//                   setCurrentEditingItem({
//                     ...currentEditingItem,
//                     title: e.target.value,
//                   })
//                 }
//               />
//             </S.ModalFormGroup>

//             <S.ModalFormGroup>
//               <S.ModalLabel>세부 평가 지표</S.ModalLabel>
//               <S.ModalTextArea
//                 value={currentEditingItem.details}
//                 onChange={(e) =>
//                   setCurrentEditingItem({
//                     ...currentEditingItem,
//                     details: e.target.value,
//                   })
//                 }
//                 height="90px"
//               />
//             </S.ModalFormGroup>

//             <S.ModalFormGroup>
//               <S.ModalLabel>가중치</S.ModalLabel>
//               <S.SliderContainer>
//                 <S.Slider id="weightSlider">
//                   <S.SliderFill value={currentEditingItem.weight} />
//                   <S.SliderThumb
//                     value={currentEditingItem.weight}
//                     onMouseDown={(e) => {
//                       setSliderDragging(true);
//                     }}
//                   />
//                 </S.Slider>
//                 <S.SliderValue bold>{currentEditingItem.weight}%</S.SliderValue>
//               </S.SliderContainer>
//             </S.ModalFormGroup>

//             <S.ModalActions>
//               <S.ModalButton onClick={() => setShowEditItemModal(false)}>
//                 취소
//               </S.ModalButton>
//               <S.ModalButton primary onClick={handleSaveEditedItem}>
//                 저장
//               </S.ModalButton>
//             </S.ModalActions>
//           </S.ModalContent>
//         </S.ModalContainer>
//       </S.ModalOverlay>
//     );
//   };

//   // Render Edit Overview Modal
//   const renderEditOverviewModal = () => {
//     return (
//       <S.ModalOverlay>
//         <S.ModalContainer>
//           <S.ModalHeader>
//             <S.ModalTitle>평가 개요 수정</S.ModalTitle>
//             <S.CloseButton onClick={() => setShowEditOverviewModal(false)}>
//               ×
//             </S.CloseButton>
//           </S.ModalHeader>

//           <S.ModalContent>
//             <S.ModalFormGroup>
//               <S.ModalLabel>평가 개요 내용</S.ModalLabel>
//               <S.ModalTextArea
//                 value={editingOverview}
//                 onChange={(e) => setEditingOverview(e.target.value)}
//                 height="100px"
//               />
//             </S.ModalFormGroup>

//             <S.ModalActions>
//               <S.ModalButton onClick={() => setShowEditOverviewModal(false)}>
//                 취소
//               </S.ModalButton>
//               <S.ModalButton primary onClick={handleSaveEditedOverview}>
//                 저장
//               </S.ModalButton>
//             </S.ModalActions>
//           </S.ModalContent>
//         </S.ModalContainer>
//       </S.ModalOverlay>
//     );
//   };

//   // Render Add Item Modal
//   const renderAddItemModal = () => {
//     return (
//       <S.ModalOverlay>
//         <S.ModalContainer>
//           <S.ModalHeader>
//             <S.ModalTitle>새 평가 항목 추가</S.ModalTitle>
//             <S.CloseButton onClick={() => setShowAddItemModal(false)}>
//               ×
//             </S.CloseButton>
//           </S.ModalHeader>

//           <S.ModalContent>
//             <S.ModalFormGroup>
//               <S.ModalLabel>평가 항목 제목</S.ModalLabel>
//               <S.ModalInput
//                 value={newItem.title}
//                 onChange={(e) =>
//                   setNewItem({ ...newItem, title: e.target.value })
//                 }
//                 placeholder="예: 6. 인식 우선보다 회상 (사용자가 정보를 기억하기보다 화면에서 인식할 수 있는가)"
//               />
//             </S.ModalFormGroup>

//             <S.ModalFormGroup>
//               <S.ModalLabel>세부 평가 지표</S.ModalLabel>
//               <S.ModalTextArea
//                 value={newItem.details}
//                 onChange={(e) =>
//                   setNewItem({ ...newItem, details: e.target.value })
//                 }
//                 placeholder="세부 평가 지표를 입력하세요. 예:\n- 핀테크 앱에서 중요 기능이 쉽게 인식 가능한가\n- 사용자가 이전 액션을 기억할 필요 없이 UI가 자연스럽게 안내하는가"
//                 height="90px"
//               />
//             </S.ModalFormGroup>

//             <S.ModalFormGroup>
//               <S.ModalLabel>가중치</S.ModalLabel>
//               <S.SliderContainer>
//                 <S.Slider id="weightSlider">
//                   <S.SliderFill value={newItem.weight} />
//                   <S.SliderThumb
//                     value={newItem.weight}
//                     onMouseDown={(e) => {
//                       setSliderDragging(true);
//                       setCurrentEditingItem(newItem);
//                     }}
//                   />
//                 </S.Slider>
//                 <S.SliderValue bold>{newItem.weight}%</S.SliderValue>
//               </S.SliderContainer>
//             </S.ModalFormGroup>

//             <S.SuggestedItemsContainer>
//               <S.ModalLabel>AI 추천 항목</S.ModalLabel>

//               {suggestedItems.map((item, index) => (
//                 <S.SuggestedItem
//                   key={index}
//                   isActive={item.title === newItem.title}
//                 >
//                   <S.SuggestedItemText isActive={item.title === newItem.title}>
//                     {item.title} ({item.weight}%)
//                   </S.SuggestedItemText>
//                   <S.UseButton onClick={() => handleUseSuggestedItem(item)}>
//                     사용
//                   </S.UseButton>
//                 </S.SuggestedItem>
//               ))}
//             </S.SuggestedItemsContainer>

//             <S.ModalActions>
//               <S.ModalButton onClick={() => setShowAddItemModal(false)}>
//                 취소
//               </S.ModalButton>
//               <S.ModalButton
//                 primary
//                 onClick={handleSaveNewItem}
//                 disabled={!newItem.title}
//               >
//                 추가
//               </S.ModalButton>
//             </S.ModalActions>
//           </S.ModalContent>
//         </S.ModalContainer>
//       </S.ModalOverlay>
//     );
//   };

//   // Render Heatmap Detail Modal
//   const renderHeatmapDetailModal = () => {
//     return (
//       <S.ModalOverlay>
//         <S.ModalContainer width="900px">
//           <S.ModalHeader>
//             <S.ModalTitle>UI 요소 평가 히트맵 상세 분석</S.ModalTitle>
//             <S.CloseButton onClick={() => setShowHeatmapDetailModal(false)}>
//               ×
//             </S.CloseButton>
//           </S.ModalHeader>

//           <S.ModalContent>
//             <S.HeatmapDetailContainer>
//               <S.HeatmapLarge>
//                 <S.AppPreviewPattern />
//                 <S.HeatmapPattern />
//                 <S.HeatmapOverlay />

//                 {/* Annotations */}
//                 <S.AnnotationLine
//                   top={30}
//                   left={40}
//                   width={320}
//                   color="#EF4444"
//                 />
//                 <S.AnnotationText top={28} left={50}>
//                   <S.AnnotationTitle color="#EF4444">
//                     헤더 영역 가시성 문제:
//                   </S.AnnotationTitle>
//                   <S.AnnotationDescription>
//                     현재 상태 표시가 불명확함
//                   </S.AnnotationDescription>
//                 </S.AnnotationText>

//                 <S.AnnotationLine
//                   top={50}
//                   left={40}
//                   width={320}
//                   color="#FBBF24"
//                   angle={20}
//                 />
//                 <S.AnnotationText top={45} left={50}>
//                   <S.AnnotationTitle color="#FBBF24">
//                     컨텐츠 영역 개선 필요:
//                   </S.AnnotationTitle>
//                   <S.AnnotationDescription>
//                     일부 텍스트 크기와 간격 조정 필요
//                   </S.AnnotationDescription>
//                 </S.AnnotationText>

//                 <S.AnnotationLine
//                   top={70}
//                   left={50}
//                   width={320}
//                   color="#22C55E"
//                   angle={-20}
//                 />
//                 <S.AnnotationText top={65} left={60}>
//                   <S.AnnotationTitle color="#22C55E">
//                     버튼 영역 우수:
//                   </S.AnnotationTitle>
//                   <S.AnnotationDescription>
//                     명확한 콜투액션과 적절한 크기
//                   </S.AnnotationDescription>
//                 </S.AnnotationText>
//               </S.HeatmapLarge>

//               <S.HeatmapLegend>
//                 <S.LegendItem>
//                   <S.LegendText>UI 문제 심각도:</S.LegendText>
//                 </S.LegendItem>

//                 <S.LegendItem>
//                   <S.LegendColor color="#22C55E" />
//                   <S.LegendText>우수</S.LegendText>
//                 </S.LegendItem>

//                 <S.LegendItem>
//                   <S.LegendColor color="#FBBF24" />
//                   <S.LegendText>개선 필요</S.LegendText>
//                 </S.LegendItem>

//                 <S.LegendItem>
//                   <S.LegendColor color="#EF4444" />
//                   <S.LegendText>문제점</S.LegendText>
//                 </S.LegendItem>
//               </S.HeatmapLegend>
//             </S.HeatmapDetailContainer>

//             <S.ModalActions>
//               <S.ModalButton onClick={() => setShowHeatmapDetailModal(false)}>
//                 닫기
//               </S.ModalButton>
//             </S.ModalActions>
//           </S.ModalContent>
//         </S.ModalContainer>
//       </S.ModalOverlay>
//     );
//   };

//   // Render Strengths Detail Modal
//   const renderStrengthsDetailModal = () => {
//     return (
//       <S.ModalOverlay>
//         <S.ModalContainer width="900px">
//           <S.ModalHeader>
//             <S.ModalTitle>강점 및 개선점 상세 분석</S.ModalTitle>
//             <S.CloseButton
//               onClick={() => {
//                 setShowStrengthsDetailModal(false);
//                 setShowWeaknessesDetailModal(false);
//               }}
//             >
//               ×
//             </S.CloseButton>
//           </S.ModalHeader>

//           <S.ModalContent>
//             <S.TabsContainer>
//               <S.Tab
//                 active={selectedTab === "strengths"}
//                 onClick={() => {
//                   setSelectedTab("strengths");
//                   setShowStrengthsDetailModal(true);
//                   setShowWeaknessesDetailModal(false);
//                 }}
//               >
//                 강점
//               </S.Tab>

//               <S.Tab
//                 active={selectedTab === "weaknesses"}
//                 negative
//                 onClick={() => {
//                   setSelectedTab("weaknesses");
//                   setShowStrengthsDetailModal(false);
//                   setShowWeaknessesDetailModal(true);
//                 }}
//               >
//                 개선점
//               </S.Tab>
//             </S.TabsContainer>

//             {selectedTab === "strengths" && (
//               <>
//                 {evaluationResults.strengths.map((strength, index) => (
//                   <S.DetailRow key={index} positive>
//                     <S.ItemTextTitle>{strength.title}</S.ItemTextTitle>
//                     <S.ItemTextDescription>
//                       {strength.description}
//                     </S.ItemTextDescription>
//                   </S.DetailRow>
//                 ))}
//               </>
//             )}

//             {selectedTab === "weaknesses" && (
//               <>
//                 {evaluationResults.weaknesses.map((weakness, index) => (
//                   <S.DetailRow key={index} negative>
//                     <S.ItemTextTitle>{weakness.title}</S.ItemTextTitle>
//                     <S.ItemTextDescription>
//                       {weakness.description}
//                     </S.ItemTextDescription>
//                     <S.ImprovementSuggestion>
//                       <S.SuggestionText>
//                         개선 제안: {weakness.suggestion}
//                       </S.SuggestionText>
//                     </S.ImprovementSuggestion>
//                   </S.DetailRow>
//                 ))}
//               </>
//             )}

//             <S.ModalActions>
//               <S.ModalButton
//                 onClick={() => {
//                   setShowStrengthsDetailModal(false);
//                   setShowWeaknessesDetailModal(false);
//                 }}
//               >
//                 닫기
//               </S.ModalButton>
//             </S.ModalActions>
//           </S.ModalContent>
//         </S.ModalContainer>
//       </S.ModalOverlay>
//     );
//   };

//   // Render Back Confirmation Modal
//   const renderBackConfirmModal = () => {
//     return (
//       <S.ModalOverlay>
//         <S.ModalContainer>
//           <S.ModalTitle>이전 단계로 돌아가시겠습니까?</S.ModalTitle>
//           <S.ModalText>현재 입력한 정보는 저장되지 않습니다.</S.ModalText>
//           <S.ModalButtonsContainer>
//             <S.ModalCancelButton onClick={() => setShowBackConfirmModal(false)}>
//               취소
//             </S.ModalCancelButton>
//             <S.ModalConfirmButton onClick={handleBackConfirm}>
//               이전 단계로
//             </S.ModalConfirmButton>
//           </S.ModalButtonsContainer>
//         </S.ModalContainer>
//       </S.ModalOverlay>
//     );
//   };

//   // Get current screen label for footer
//   const getScreenLabel = () => {
//     if (isTransitioning) {
//       return "다음 단계로 전환 중 화면";
//     }

//     if (currentStage === 1) {
//       if (isAnalyzing) {
//         return "직접 입력 후 분석 중 화면";
//       } else if (evaluationType) {
//         return `${
//           evaluationType === "quantitative"
//             ? "정량적 평가"
//             : evaluationType === "qualitative"
//             ? "정성적 평가"
//             : "비교 평가"
//         } 선택 시 화면`;
//       } else if (analysisResults) {
//         return "AI 분석 결과 화면";
//       } else {
//         return "기본 화면 - 아직 선택되지 않음";
//       }
//     } else if (currentStage === 2) {
//       if (showBackConfirmModal) {
//         return "이전 버튼 클릭 시 확인 팝업";
//       } else if (
//         uploadStatus === "uploaded" &&
//         designTitle &&
//         designType &&
//         designPurpose
//       ) {
//         return "모든 정보 입력 완료 상태";
//       } else if (isTypeDropdownOpen) {
//         return "디자인 유형 드롭다운 클릭 상태";
//       } else if (uploadStatus === "uploading") {
//         return "파일 업로드 중 상태";
//       } else if (uploadStatus === "dragging") {
//         return "드래그 오버 상태 - 파일을 드래그하여 올려놓는 중";
//       } else {
//         return "기본 화면 - 아직 입력/업로드 없음";
//       }
//     } else if (currentStage === 3) {
//       if (isEvaluating) {
//         return "평가 진행 중 화면";
//       } else if (evaluationResults) {
//         if (showExportModal) {
//           return "결과 내보내기 모달";
//         } else {
//           return "평가 결과 화면";
//         }
//       }
//     } else if (currentStage === 4) {
//       if (isStage4Transitioning) {
//         return "5단계로 전환 중 화면";
//       } else if (showHeuristicDetails) {
//         return "휴리스틱 평가 세부 설정 화면";
//       } else if (showSusDetails) {
//         return "SUS 평가 세부 설정 화면";
//       } else if (
//         selectedMethodology === "custom" &&
//         customMethodology.name.trim() !== ""
//       ) {
//         return "사용자 정의 평가 방법론 설정 화면";
//       } else {
//         return "평가 방법론 선택 화면";
//       }
//     }

//     return "";
//   };

//   // 로딩 컴포넌트 렌더링
//   const renderLoading = () => {
//     // nextStage 변수 정의 추가
//     const nextStage = currentStage + 1;

//     // 현재 단계에 따라 제목과 부제목 설정
//     const getStageInfo = () => {
//       if (nextStage === 2) {
//         return {
//           title: "2단계로 이동 중...",
//           subtitle: "2단계: 평가 대상 정보 입력 및 이미지 업로드",
//           description: "선택한 정량적 평가를 위한 평가 대상 정보를 입력합니다.",
//           boxContent: null, // 박스에 표시할 내용 없음
//         };
//       } else if (nextStage === 3) {
//         return {
//           title: "3단계로 이동 중...",
//           subtitle: "3단계: 평가 실행 및 결과 확인",
//           description: "디자인 평가 데이터 준비 중...",
//           boxContent: "디자인 파일: banner", // 박스에 표시할 내용
//         };
//       } else {
//         return {
//           title: `${nextStage}단계로 이동 중...`,
//           subtitle: `${nextStage}단계`,
//           description: "다음 단계로 이동 중입니다.",
//           boxContent: null, // 박스에 표시할 내용 없음
//         };
//       }
//     };

//     const stageInfo = getStageInfo();

//     return (
//       <S.ContentArea>
//         <S.ProgressBarContainer>
//           <S.ProgressBar progress={30} />
//         </S.ProgressBarContainer>

//         <S.Title>{stageInfo.title}</S.Title>
//         <S.Subtitle>{stageInfo.subtitle}</S.Subtitle>
//         <div
//           style={{
//             textAlign: "center",
//             marginBottom: "20px",
//             color: "#64748b",
//           }}
//         >
//           {stageInfo.description}
//         </div>

//         {nextStage === 3 && (
//           <div
//             style={{
//               textAlign: "center",
//               marginBottom: "40px",
//               color: "#64748b",
//             }}
//           >
//             디자인 파일: banner
//           </div>
//         )}

//         {nextStage === 3 && (
//           <div className="my-6">
//             <S.FilePreview
//               src={filePreview}
//               style={{ width: "150px", height: "100px", margin: "0 auto" }}
//             />
//           </div>
//         )}

//         {/* 단계 표시기 */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             marginBottom: "40px",
//           }}
//         >
//           <div style={{ display: "flex", gap: "16px" }}>
//             {[1, 2, 3, 4, 5, 6, 7].map((num) => (
//               <div
//                 key={num}
//                 style={{
//                   width: "60px",
//                   height: "60px",
//                   borderRadius: "50%",
//                   backgroundColor:
//                     num < nextStage
//                       ? "#4f46e5"
//                       : num === nextStage
//                       ? "#4f46e5"
//                       : "#e2e8f0",
//                   opacity: num < nextStage ? 0.7 : num === nextStage ? 1 : 0.5,
//                   color: "white",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontSize: "24px",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {num}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* 박스는 내용이 있을 때만 표시 */}
//         {stageInfo.boxContent && (
//           <div
//             style={{
//               width: "100%",
//               height: "60px",
//               border: "1px solid #e2e8f0",
//               borderRadius: "8px",
//               marginBottom: "60px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#64748b",
//             }}
//           >
//             {stageInfo.boxContent}
//           </div>
//         )}

//         <div
//           style={{
//             textAlign: "center",
//             marginTop: "60px",
//             padding: "12px",
//             backgroundColor: "#f1f5f9",
//             borderRadius: "8px",
//             color: "#64748b",
//             fontSize: "14px",
//           }}
//         >
//           다음 단계로 전환 중 화면
//         </div>
//       </S.ContentArea>
//     );
//   };

//   return (
//     <S.Container>
//       <S.Card>
//         <S.Header>
//           <S.HeaderTitle>AI 디자인 평가 시스템</S.HeaderTitle>
//           <S.IconsContainer>
//             <S.IconCircle>i</S.IconCircle>
//             <S.IconCircle>?</S.IconCircle>
//           </S.IconsContainer>
//         </S.Header>

//         {renderStage()}

//         {/* Methodology Detail Modal */}
//         {currentStage === 4 && showMethodologyDetailModal && (
//           <Stage4S.ModalOverlay>
//             <Stage4S.ModalContainer>
//               <Stage4S.ModalHeader>
//                 <Stage4S.ModalTitle>
//                   {
//                     methodologies.find((m) => m.id === activeDetailMethodology)
//                       ?.name
//                   }{" "}
//                   방법론 상세 정보
//                 </Stage4S.ModalTitle>
//                 <Stage4S.CloseButton
//                   onClick={() => setShowMethodologyDetailModal(false)}
//                 >
//                   ×
//                 </Stage4S.CloseButton>
//               </Stage4S.ModalHeader>

//               <Stage4S.ModalContent>
//                 {/* Modal content based on active methodology */}
//                 {/* ... (Modal content implementation) ... */}
//               </Stage4S.ModalContent>
//             </Stage4S.ModalContainer>
//           </Stage4S.ModalOverlay>
//         )}
//       </S.Card>

//       <S.FooterLabel>{getScreenLabel()}</S.FooterLabel>
//     </S.Container>
//   );
// };
// export default AIDesignEvaluationSystem;

import React from "react";
import { useAtom } from "jotai";
import { personaState } from "./personaState";
import {
  Container,
  Header,
  PersonaName,
  PersonaNumber,
  Content,
  LeftColumn,
  ProfileImage,
  QuoteBox,
  QuoteText,
  TagsContainer,
  Tag,
  InfoList,
  InfoItem,
  InfoLabel,
  InfoValue,
  MiddleColumn,
  Section,
  SectionTitle,
  BioText,
  GoalsList,
  GoalItem,
  ScenarioText,
  RightColumn,
  MotivationsSection,
  MotivationItem,
  MotivationLabel,
  ProgressBarContainer,
  ProgressBar,
  PersonalitySection,
  PersonalityItem,
  PersonalityLabel,
  PersonalityScale,
  PersonalityMarker,
  BrandsSection,
  BrandsGrid,
  BrandLogo,
} from "./PersonaStyles";

const AIDesignEvaluationSystem = () => {
  const [persona] = useAtom(personaState);

  return (
    <Container>
      <Header>
        <PersonaName>{persona.name}</PersonaName>
        <PersonaNumber>Persona {persona.personaNumber}</PersonaNumber>
      </Header>

      <Content>
        {/* Left Column */}
        <LeftColumn>
          <ProfileImage src={persona.profileImage} alt={persona.name} />

          <QuoteBox>
            <QuoteText>{persona.quote}</QuoteText>
          </QuoteBox>

          <TagsContainer>
            {persona.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagsContainer>

          <InfoList>
            <InfoItem>
              <InfoLabel>Age:</InfoLabel>
              <InfoValue>{persona.age}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Occupation:</InfoLabel>
              <InfoValue>{persona.occupation}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Family:</InfoLabel>
              <InfoValue>{persona.family}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Location:</InfoLabel>
              <InfoValue>{persona.location}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Archetype:</InfoLabel>
              <InfoValue>{persona.archetype}</InfoValue>
            </InfoItem>
          </InfoList>
        </LeftColumn>

        {/* Middle Column */}
        <MiddleColumn>
          <Section>
            <SectionTitle>Bio</SectionTitle>
            <BioText>{persona.bio}</BioText>
          </Section>

          <Section>
            <SectionTitle>Goals · Interest</SectionTitle>
            <GoalsList>
              {persona.goals.map((goal, index) => (
                <GoalItem key={index}>{goal}</GoalItem>
              ))}
            </GoalsList>
          </Section>

          <Section>
            <SectionTitle>Pain Points · Concerns</SectionTitle>
            <GoalsList>
              {persona.painPoints.map((point, index) => (
                <GoalItem key={index}>{point}</GoalItem>
              ))}
            </GoalsList>
          </Section>

          <Section>
            <SectionTitle>Scenario</SectionTitle>
            <ScenarioText>{persona.scenario}</ScenarioText>
          </Section>
        </MiddleColumn>

        {/* Right Column */}
        <RightColumn>
          <MotivationsSection>
            <SectionTitle>Motivations</SectionTitle>
            {persona.motivations.map((motivation, index) => (
              <MotivationItem key={index}>
                <MotivationLabel>{motivation.label}</MotivationLabel>
                <ProgressBarContainer>
                  <ProgressBar width={`${motivation.value}%`} />
                </ProgressBarContainer>
              </MotivationItem>
            ))}
          </MotivationsSection>

          <PersonalitySection>
            <SectionTitle>Personality</SectionTitle>
            {persona.personality.map((trait, index) => (
              <PersonalityItem key={index}>
                <PersonalityLabel>{trait.left}</PersonalityLabel>
                <PersonalityScale>
                  <PersonalityMarker position={trait.value} />
                </PersonalityScale>
                <PersonalityLabel>{trait.right}</PersonalityLabel>
              </PersonalityItem>
            ))}
          </PersonalitySection>

          <BrandsSection>
            <SectionTitle>Brands</SectionTitle>
            <BrandsGrid>
              {persona.brands.map((brand, index) => (
                <BrandLogo key={index} src={brand.logo} alt={brand.name} />
              ))}
            </BrandsGrid>
          </BrandsSection>
        </RightColumn>
      </Content>
    </Container>
  );
};

export default AIDesignEvaluationSystem;
