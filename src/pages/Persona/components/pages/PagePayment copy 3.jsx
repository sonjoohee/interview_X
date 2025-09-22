import React, { useState } from "react";
import "./PagePayment.css";

const PagePayment = () => {
  // State management
  const [evaluationType, setEvaluationType] = useState("quantitative"); // 'quantitative', 'qualitative', 'comparative'
  const [subOption, setSubOption] = useState(null);
  const [customInput, setCustomInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Function to handle evaluation type selection
  const handleEvaluationTypeSelect = (type) => {
    setEvaluationType(type);
    setSubOption(null);
    // Clear analysis results if they exist
    if (analysisResults) {
      setAnalysisResults(null);
    }
  };

  // Function to handle sub-option selection
  const handleSubOptionSelect = (option) => {
    setSubOption(option);
  };

  // Function to handle analysis button click
  const handleAnalyze = () => {
    if (customInput.trim() === "") return;

    setIsAnalyzing(true);

    // Simulate AI analysis with a timeout
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResults({
        recommendedType: "quantitative",
        secondaryRecommendation: "comparative",
        explanation:
          "입력하신 내용 분석 결과, 모바일 앱 UI의 사용성 평가를 위한 정량적 평가가 적합합니다. SUS(System Usability Scale) 및 시각적 일관성 검증을 위한 지표 기반 평가를 추천합니다.",
      });
      setEvaluationType("quantitative");
    }, 2000);
  };

  // Function to handle next stage button click
  const handleNextStage = () => {
    setIsTransitioning(true);

    // Simulate transition animation with a timeout
    setTimeout(() => {
      setIsTransitioning(false);
    }, 2000);
  };

  // Check if next button should be enabled
  const isNextButtonEnabled =
    evaluationType !== null || analysisResults !== null;

  // Reset the form
  const handleReset = () => {
    setEvaluationType("quantitative");
    setSubOption(null);
    setAnalysisResults(null);
    setCustomInput("");
  };

  // 선택된 평가 유형에 따른 하위 옵션 렌더링
  const renderSubOptions = () => {
    if (evaluationType === "quantitative") {
      return (
        <div className="sub-options">
          <h3>정량적 평가 목적 선택</h3>
          <div className="option-buttons">
            <button
              className={`option-button ${
                subOption === "usability" ? "selected" : ""
              }`}
              onClick={() => handleSubOptionSelect("usability")}
            >
              사용성 평가
            </button>
            <button
              className={`option-button ${
                subOption === "quality" ? "selected" : ""
              }`}
              onClick={() => handleSubOptionSelect("quality")}
            >
              디자인 품질 평가
            </button>
            <button
              className={`option-button ${
                subOption === "brand" ? "selected" : ""
              }`}
              onClick={() => handleSubOptionSelect("brand")}
            >
              브랜드 일치성 평가
            </button>
          </div>
        </div>
      );
    } else if (evaluationType === "qualitative") {
      return (
        <div className="sub-options">
          <h3>정성적 평가 방법 선택</h3>
          <div className="option-buttons">
            <button
              className={`option-button ${
                subOption === "interview" ? "selected" : ""
              }`}
              onClick={() => handleSubOptionSelect("interview")}
            >
              사용자 인터뷰
            </button>
            <button
              className={`option-button ${
                subOption === "expert" ? "selected" : ""
              }`}
              onClick={() => handleSubOptionSelect("expert")}
            >
              전문가 리뷰
            </button>
            <button
              className={`option-button ${
                subOption === "observation" ? "selected" : ""
              }`}
              onClick={() => handleSubOptionSelect("observation")}
            >
              사용자 관찰
            </button>
          </div>
        </div>
      );
    } else if (evaluationType === "comparative") {
      return (
        <div className="sub-options">
          <h3>비교 대상 선택</h3>
          <div className="option-buttons">
            <button
              className={`option-button ${
                subOption === "competitor" ? "selected" : ""
              }`}
              onClick={() => handleSubOptionSelect("competitor")}
            >
              경쟁사 제품
            </button>
            <button
              className={`option-button ${
                subOption === "previous" ? "selected" : ""
              }`}
              onClick={() => handleSubOptionSelect("previous")}
            >
              이전 버전
            </button>
            <button
              className={`option-button ${
                subOption === "standard" ? "selected" : ""
              }`}
              onClick={() => handleSubOptionSelect("standard")}
            >
              업계 표준
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  // 렌더링 컨텐츠
  const renderContent = () => {
    if (isTransitioning) {
      return (
        <div className="transition-screen">
          {/* 진행 바 */}
          <div className="progress-bar-container">
            <div className="progress-bar-fill"></div>
          </div>

          <div className="transition-content">
            <h2>2단계로 이동 중...</h2>

            <div className="loading-dots">
              <div className="dot dot-1"></div>
              <div className="dot dot-2"></div>
              <div className="dot dot-3"></div>
            </div>

            <div className="transition-info">
              <p>2단계: 평가 대상 정보 입력 및 이미지 업로드</p>
              <p>선택한 정량적 평가를 위한 평가 대상 정보를 입력합니다.</p>
            </div>

            <div className="stage-indicators">
              <div className="stage-indicator completed">1</div>
              <div className="stage-indicator current">2</div>
              <div className="stage-indicator upcoming">3</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="stage-content">
        <h2 className="stage-title">1단계: 평가 방식 및 목적 선택</h2>
        <p className="stage-description">
          평가하려는 디자인의 평가 방식과 목적을 선택하세요.
        </p>

        {/* 평가 유형 카드 */}
        <div className="evaluation-cards">
          {/* 정량적 평가 */}
          <div
            className={`evaluation-card ${
              evaluationType === "quantitative" ? "selected" : ""
            }`}
          >
            <div className="card-content">
              <h3>정량적 평가</h3>
              <p>수치적 지표로 측정</p>
              <button
                className={`select-button ${
                  evaluationType === "quantitative" ? "selected" : ""
                }`}
                onClick={() => handleEvaluationTypeSelect("quantitative")}
              >
                <span className="radio-button">
                  {evaluationType === "quantitative" && (
                    <span className="radio-inner"></span>
                  )}
                </span>
                <span>
                  {evaluationType === "quantitative" ? "선택됨" : "선택하기"}
                </span>
              </button>
            </div>
          </div>

          {/* 정성적 평가 */}
          <div
            className={`evaluation-card ${
              evaluationType === "qualitative" ? "selected" : ""
            }`}
          >
            <div className="card-content">
              <h3>정성적 평가</h3>
              <p>정성적 측면 분석</p>
              <button
                className={`select-button ${
                  evaluationType === "qualitative" ? "selected" : ""
                }`}
                onClick={() => handleEvaluationTypeSelect("qualitative")}
              >
                <span className="radio-button">
                  {evaluationType === "qualitative" && (
                    <span className="radio-inner"></span>
                  )}
                </span>
                <span>
                  {evaluationType === "qualitative" ? "선택됨" : "선택하기"}
                </span>
              </button>
            </div>
          </div>

          {/* 비교 평가 */}
          <div
            className={`evaluation-card ${
              evaluationType === "comparative" ? "selected" : ""
            }`}
          >
            <div className="card-content">
              <h3>비교 평가</h3>
              <p>다른 디자인과 비교</p>
              <button
                className={`select-button ${
                  evaluationType === "comparative" ? "selected" : ""
                }`}
                onClick={() => handleEvaluationTypeSelect("comparative")}
              >
                <span className="radio-button">
                  {evaluationType === "comparative" && (
                    <span className="radio-inner"></span>
                  )}
                </span>
                <span>
                  {evaluationType === "comparative" ? "선택됨" : "선택하기"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 선택된 평가 유형에 따른 하위 옵션 */}
        {renderSubOptions()}

        {/* 직접 입력 */}
        {!analysisResults && (
          <div className="direct-input">
            <h3>평가 내용 직접 입력</h3>
            <div className="input-container">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="평가하고자 하는 디자인 목적 및 내용을 입력해주세요. AI가 자동으로 추천합니다."
                className="custom-input"
              />
              <button
                className={`analyze-button ${isAnalyzing ? "analyzing" : ""}`}
                onClick={handleAnalyze}
                disabled={isAnalyzing || customInput.trim() === ""}
              >
                {isAnalyzing ? (
                  <span className="analyzing-content">
                    <span className="analyzing-spinner"></span>
                    분석 중...
                  </span>
                ) : (
                  "분석"
                )}
              </button>
            </div>
          </div>
        )}

        {/* 분석 결과 */}
        {analysisResults && (
          <div className="analysis-results">
            <h3>AI 추천 내용</h3>
            <p>{analysisResults.explanation}</p>

            {/* 추천 카드 */}
            <div className="recommendation-cards">
              {/* 주요 추천 */}
              <div className="recommendation-card primary">
                <div className="card-content">
                  <h3>정량적 평가</h3>
                  <p>수치적 지표로 측정</p>
                  <button
                    className="recommend-button primary"
                    onClick={() => handleEvaluationTypeSelect("quantitative")}
                  >
                    <span className="radio-button">
                      <span className="radio-inner"></span>
                    </span>
                    <span>추천됨</span>
                  </button>
                </div>
              </div>

              {/* 보조 추천 */}
              <div className="recommendation-card secondary">
                <div className="card-content">
                  <h3>비교 평가</h3>
                  <p>다른 디자인과 비교</p>
                  <button
                    className="recommend-button secondary"
                    onClick={() => handleEvaluationTypeSelect("comparative")}
                  >
                    <span className="radio-button">
                      <span className="radio-inner"></span>
                    </span>
                    <span>보조 추천</span>
                  </button>
                </div>
              </div>

              {/* 비추천 */}
              <div className="recommendation-card not-recommended">
                <div className="card-content">
                  <h3>정성적 평가</h3>
                  <p>정성적 측면 분석</p>
                  <button
                    className="recommend-button"
                    onClick={() => handleEvaluationTypeSelect("qualitative")}
                  >
                    <span className="radio-button"></span>
                    <span>선택하기</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 초기화 버튼 */}
            <div className="reset-container">
              <button className="reset-button" onClick={handleReset}>
                처음부터 다시 선택하기
              </button>
            </div>
          </div>
        )}

        {/* 다음 버튼 및 단계 표시기 */}
        <div className="navigation">
          <button
            className={`next-button ${!isNextButtonEnabled ? "disabled" : ""}`}
            onClick={handleNextStage}
            disabled={!isNextButtonEnabled}
          >
            다음 단계
          </button>

          <div className="step-indicator">
            <div className="step active">1</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="ai-design-evaluation">
      {/* 헤더 */}
      <header className="header">
        <h1>AI 디자인 평가 시스템</h1>
        <div className="header-icons">
          <button className="icon-button">i</button>
          <button className="icon-button">?</button>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="main-content">{renderContent()}</main>

      {/* 푸터 */}
      <footer className="footer">
        <p>
          {isTransitioning
            ? "다음 단계로 전환 중 화면"
            : evaluationType
            ? `${
                evaluationType === "quantitative"
                  ? "정량적 평가"
                  : evaluationType === "qualitative"
                  ? "정성적 평가"
                  : "비교 평가"
              } 선택 시 화면`
            : analysisResults
            ? "AI 분석 결과 화면"
            : "기본 화면 - 아직 선택되지 않음"}
        </p>
      </footer>
    </div>
  );
};

export default PagePayment;
