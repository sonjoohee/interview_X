//작업관리/ 프로젝트 리스트
import React, { useEffect, useState } from "react";
import "./PagePayment.css"; // CSS 파일 임포트

const PagePayment = () => {
  const [evaluationType, setEvaluationType] = useState(null);
  const [subOption, setSubOption] = useState(null);
  const [customInput, setCustomInput] = useState("");
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);

  // 평가 유형 선택 처리
  const handleEvaluationTypeSelect = (type) => {
    setEvaluationType(type);
    setSubOption(null);
    setAnalysisResults(null);
    setIsNextButtonEnabled(true);
  };

  // 세부 옵션 선택 처리
  const handleSubOptionSelect = (option) => {
    setSubOption(option);
  };

  // 분석 처리
  const handleAnalyze = () => {
    if (customInput.trim() === "") return;

    setIsAnalyzing(true);

    // 분석 시뮬레이션 (실제로는 API 호출 등이 들어갈 수 있음)
    setTimeout(() => {
      setAnalysisResults({
        explanation:
          "입력하신 내용 분석 결과, 모바일 앱 UI의 사용성 평가를 위한 정량적 평가가 적합합니다. SUS(System Usability Scale) 및 시각적 일관성 검증을 위한 지표 기반 평가를 추천합니다.",
        primaryRecommendation: "quantitative",
        secondaryRecommendation: "comparative",
      });
      setIsAnalyzing(false);
      setIsNextButtonEnabled(true);
    }, 1500);
  };

  // 초기화 처리
  const handleReset = () => {
    setEvaluationType(null);
    setSubOption(null);
    setAnalysisResults(null);
    setCustomInput("");
    setIsNextButtonEnabled(false);
  };

  // 다음 단계로 이동
  const handleNextStage = () => {
    if (!isNextButtonEnabled) return;

    setIsTransitioning(true);

    // 다음 단계로 이동 시뮬레이션 (실제로는 라우팅 등이 들어갈 수 있음)
    setTimeout(() => {
      // 다음 단계로 이동 로직
    }, 2000);
  };

  return (
    <div className="evaluation-container">
      <h1>AI 디자인 평가 시스템</h1>

      <div className="evaluation-step">
        <h2>1단계: 평가 방식 및 목적 선택</h2>
        <p>평가하려는 디자인의 평가 방식과 목적을 선택하세요.</p>
      </div>

      <div className="evaluation-options">
        <div
          className={`evaluation-card ${
            evaluationType === "quantitative" ? "selected" : ""
          }`}
          onClick={() => handleEvaluationTypeSelect("quantitative")}
        >
          <h3>정량적 평가</h3>
          <p>수치적 지표로 측정</p>
          <button>
            {evaluationType === "quantitative" ? "선택됨" : "선택하기"}
          </button>
        </div>

        <div
          className={`evaluation-card ${
            evaluationType === "qualitative" ? "selected" : ""
          }`}
          onClick={() => handleEvaluationTypeSelect("qualitative")}
        >
          <h3>정성적 평가</h3>
          <p>정성적 측면 분석</p>
          <button>
            {evaluationType === "qualitative" ? "선택됨" : "선택하기"}
          </button>
        </div>

        <div
          className={`evaluation-card ${
            evaluationType === "comparative" ? "selected" : ""
          }`}
          onClick={() => handleEvaluationTypeSelect("comparative")}
        >
          <h3>비교 평가</h3>
          <p>다른 디자인과 비교</p>
          <button>
            {evaluationType === "comparative" ? "선택됨" : "선택하기"}
          </button>
        </div>
      </div>

      {evaluationType && (
        <div className="sub-options">
          {evaluationType === "quantitative" && (
            <>
              <h3>정량적 평가 목적 선택</h3>
              <div className="option-buttons">
                <button
                  className={subOption === "usability" ? "selected" : ""}
                  onClick={() => handleSubOptionSelect("usability")}
                >
                  사용성 평가
                </button>
                <button
                  className={subOption === "quality" ? "selected" : ""}
                  onClick={() => handleSubOptionSelect("quality")}
                >
                  디자인 품질 평가
                </button>
                <button
                  className={subOption === "brand" ? "selected" : ""}
                  onClick={() => handleSubOptionSelect("brand")}
                >
                  브랜드 일치성 평가
                </button>
              </div>
            </>
          )}

          {evaluationType === "qualitative" && (
            <>
              <h3>정성적 평가 방법 선택</h3>
              <div className="option-buttons">
                <button
                  className={subOption === "interview" ? "selected" : ""}
                  onClick={() => handleSubOptionSelect("interview")}
                >
                  사용자 인터뷰
                </button>
                <button
                  className={subOption === "expert" ? "selected" : ""}
                  onClick={() => handleSubOptionSelect("expert")}
                >
                  전문가 리뷰
                </button>
                <button
                  className={subOption === "observation" ? "selected" : ""}
                  onClick={() => handleSubOptionSelect("observation")}
                >
                  사용자 관찰
                </button>
              </div>
            </>
          )}

          {evaluationType === "comparative" && (
            <>
              <h3>비교 대상 선택</h3>
              <div className="option-buttons">
                <button
                  className={subOption === "competitor" ? "selected" : ""}
                  onClick={() => handleSubOptionSelect("competitor")}
                >
                  경쟁사 제품
                </button>
                <button
                  className={subOption === "previous" ? "selected" : ""}
                  onClick={() => handleSubOptionSelect("previous")}
                >
                  이전 버전
                </button>
                <button
                  className={subOption === "standard" ? "selected" : ""}
                  onClick={() => handleSubOptionSelect("standard")}
                >
                  업계 표준
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {!evaluationType && (
        <div className="direct-input">
          <h3>평가 내용 직접 입력</h3>
          <div className="input-container">
            <input
              type="text"
              placeholder="평가하고자 하는 디자인 목적 및 내용을 입력해주세요. AI가 자동으로 추천합니다."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
            />
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || customInput.trim() === ""}
            >
              {isAnalyzing ? "분석 중..." : "분석"}
            </button>
          </div>
        </div>
      )}

      {analysisResults && (
        <div className="analysis-results">
          <h3>AI 추천 내용</h3>
          <p>{analysisResults.explanation}</p>
        </div>
      )}

      <div className="navigation">
        <button
          className="next-button"
          disabled={!isNextButtonEnabled}
          onClick={handleNextStage}
        >
          다음 단계
        </button>

        <div className="step-indicator">
          <div className="step active">1</div>
          <div className={`step ${isTransitioning ? "active" : ""}`}>2</div>
          <div className="step">3</div>
        </div>
      </div>

      {isTransitioning && (
        <div className="transition-overlay">
          <h2>2단계로 이동 중...</h2>
          <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <p>2단계: 평가 대상 정보 입력 및 이미지 업로드</p>
        </div>
      )}
    </div>
  );
};

export default PagePayment;
