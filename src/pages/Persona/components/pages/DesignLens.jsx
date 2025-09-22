// App.jsx
import React, { useRef, useEffect } from "react";
import { useAtom } from "jotai";
import {
  currentPageAtom,
  uploadedImageAtom,
  imageNameAtom,
  imageSizeAtom,
  analysisOptionsAtom,
  loadingProgressAtom,
  currentAnalysisStepAtom,
  analysisResultAtom,
  pdfGeneratedAtom,
} from "./atoms2";
import {
  GlobalStyle,
  Container,
  Navbar,
  Logo,
  NavLinks,
  NavButton,
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroImage,
  PrimaryButton,
  SecondaryButton,
  SectionTitle,
  ProcessSection,
  ProcessSteps,
  ProcessStep,
  StepCircle,
  StepTitle,
  StepDescription,
  FeaturesSection,
  FeatureCards,
  FeatureCard,
  FeatureTitle,
  FeatureDescription,
  UploadSection,
  UploadContainer,
  UploadArea,
  UploadIcon,
  UploadText,
  UploadInfo,
  FilePreview,
  FileThumbnail,
  FileInfo,
  FileName,
  FileSize,
  AnalysisOptions,
  OptionTitle,
  OptionsList,
  OptionItem,
  OptionCheckbox,
  LoadingSection,
  LoadingCard,
  LoadingTitle,
  LoadingSubtitle,
  ProgressBarContainer,
  ProgressBar,
  LoadingSteps,
  LoadingStep,
  StepIndicator,
  StatusMessage,
  ResultsSection,
  ScoreCard,
  ScoreCircle,
  ScoreInfo,
  ScoreTitle,
  ScoreDescription,
  ActionButtons,
  FeedbackCard,
  CardHeader,
  CardIcon,
  CardTitle,
  CardContent,
  Feedback,
  ImprovementsTitle,
  ImprovementsList,
  ImprovementItem,
  ComparisonSection,
  ComparisonTitle,
  ComparisonGrid,
  ImageContainer,
  ResultActions,
} from "./styles2";

const DesignLens = () => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [uploadedImage, setUploadedImage] = useAtom(uploadedImageAtom);
  const [imageName, setImageName] = useAtom(imageNameAtom);
  const [imageSize, setImageSize] = useAtom(imageSizeAtom);
  const [analysisOptions, setAnalysisOptions] = useAtom(analysisOptionsAtom);
  const [loadingProgress, setLoadingProgress] = useAtom(loadingProgressAtom);
  const [currentAnalysisStep, setCurrentAnalysisStep] = useAtom(
    currentAnalysisStepAtom
  );
  const [analysisResult] = useAtom(analysisResultAtom);
  const [pdfGenerated, setPdfGenerated] = useAtom(pdfGeneratedAtom);

  const fileInputRef = useRef(null);

  useEffect(() => {
    // 로딩 페이지에서만 실행
    if (currentPage === "loading") {
      // 진행바 애니메이션
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setLoadingProgress(progress);

        // 단계별 상태 업데이트
        if (progress < 25) {
          setCurrentAnalysisStep("layout");
        } else if (progress < 50) {
          setCurrentAnalysisStep("colors");
        } else if (progress < 75) {
          setCurrentAnalysisStep("typography");
        } else {
          setCurrentAnalysisStep("accessibility");
        }

        if (progress >= 100) {
          clearInterval(interval);
          setCurrentPage("result");
        }
      }, 750); // 15초 = 100% -> 0.75초마다 5% 증가

      return () => clearInterval(interval);
    }
  }, [currentPage, setLoadingProgress, setCurrentAnalysisStep, setCurrentPage]);

  // 이미지 업로드 처리
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 파일 타입 검사
      if (!file.type.match("image/jpeg") && !file.type.match("image/png")) {
        alert("JPG 또는 PNG 이미지만 업로드 가능합니다.");
        return;
      }

      // 파일 크기 검사 (10MB 제한)
      if (file.size > 10 * 1024 * 1024) {
        alert("10MB 이하의 이미지만 업로드 가능합니다.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setImageName(file.name);
        setImageSize(formatFileSize(file.size));
      };
      reader.readAsDataURL(file);
    }
  };

  // 파일 크기 포맷팅
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  // 분석 옵션 변경 처리
  const handleOptionChange = (option) => {
    setAnalysisOptions({
      ...analysisOptions,
      [option]: !analysisOptions[option],
    });
  };

  // 분석 시작 처리
  const startAnalysis = () => {
    setLoadingProgress(0);
    setCurrentAnalysisStep("layout");
    setCurrentPage("loading");
  };

  // PDF 다운로드 처리
  const handleDownloadPdf = () => {
    // 실제 구현에서는 PDF 생성 및 다운로드 로직 구현
    setPdfGenerated(true);
    alert("PDF가 다운로드되었습니다.");
  };

  // 랜딩 페이지로 돌아가기
  const goToLanding = () => {
    setCurrentPage("landing");
    setUploadedImage(null);
    setImageName("");
    setImageSize("");
    setPdfGenerated(false);
  };

  // 업로드 페이지로 이동
  const goToUpload = () => {
    setCurrentPage("upload");
  };

  // 드래그 앤 드롭 이벤트 처리
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      // 파일 타입 검사
      if (!file.type.match("image/jpeg") && !file.type.match("image/png")) {
        alert("JPG 또는 PNG 이미지만 업로드 가능합니다.");
        return;
      }

      // 파일 크기 검사 (10MB 제한)
      if (file.size > 10 * 1024 * 1024) {
        alert("10MB 이하의 이미지만 업로드 가능합니다.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setImageName(file.name);
        setImageSize(formatFileSize(file.size));
      };
      reader.readAsDataURL(file);
    }
  };

  // 로고 클릭 시 랜딩 페이지로 이동
  const handleLogoClick = () => {
    goToLanding();
  };

  // 현재 분석 단계에 따른 상태 메시지
  const getStatusMessage = () => {
    switch (currentAnalysisStep) {
      case "layout":
        return "레이아웃 구조 분석 중...";
      case "colors":
        return "색상 및 대비 평가 중...";
      case "typography":
        return "타이포그래피 가독성 분석 중...";
      case "accessibility":
        return "접근성 체크 중...";
      default:
        return "디자인 분석 중...";
    }
  };

  // 렌더링 - 랜딩 페이지
  const renderLandingPage = () => (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            이미지 한 장으로 AI의 디자인 피드백을 받아보세요.
          </HeroTitle>
          <HeroSubtitle>
            디자인 리뷰가 필요할 때 빠르게 업로드만 하세요.
          </HeroSubtitle>
          <PrimaryButton onClick={goToUpload}>
            이미지 업로드하고 리뷰받기
          </PrimaryButton>
        </HeroContent>
        <HeroImage>디자인 이미지 예시</HeroImage>
      </HeroSection>

      <ProcessSection>
        <SectionTitle>간단한 사용 방법</SectionTitle>
        <ProcessSteps>
          <ProcessStep>
            <StepCircle>1</StepCircle>
            <StepTitle>디자인 이미지 업로드</StepTitle>
            <StepDescription>
              JPG, PNG 형식의 이미지를 업로드하세요.
            </StepDescription>
          </ProcessStep>
          <ProcessStep>
            <StepCircle>2</StepCircle>
            <StepTitle>AI 분석 진행</StepTitle>
            <StepDescription>
              AI가 자동으로 디자인을 분석합니다.
            </StepDescription>
          </ProcessStep>
          <ProcessStep>
            <StepCircle>3</StepCircle>
            <StepTitle>명확한 리뷰 결과 확인</StepTitle>
            <StepDescription>
              상세한 디자인 피드백을 확인하세요.
            </StepDescription>
          </ProcessStep>
          <ProcessStep>
            <StepCircle>4</StepCircle>
            <StepTitle>리포트 PDF 다운로드</StepTitle>
            <StepDescription>결과를 PDF로 저장하고 공유하세요.</StepDescription>
          </ProcessStep>
        </ProcessSteps>
      </ProcessSection>

      <FeaturesSection>
        <SectionTitle>DesignLens.ai의 장점</SectionTitle>
        <FeatureCards>
          <FeatureCard>
            <FeatureTitle>✅ 빠른 분석 속도</FeatureTitle>
            <FeatureDescription>
              업로드 후 15초 이내에 전문적인 디자인 피드백을 받아보세요.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>✅ 전문가급의 AI 리뷰</FeatureTitle>
            <FeatureDescription>
              색상, 레이아웃, 타이포그래피 등 전문가의 시선으로 분석합니다.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>✅ 모든 디자인 툴 지원</FeatureTitle>
            <FeatureDescription>
              Figma, Adobe XD, Sketch 등 모든 디자인 툴에서 활용 가능합니다.
            </FeatureDescription>
          </FeatureCard>
        </FeatureCards>
      </FeaturesSection>
    </>
  );

  // 렌더링 - 업로드 페이지
  const renderUploadPage = () => (
    <UploadSection>
      <UploadContainer>
        <UploadArea
          onClick={() => fileInputRef.current.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <UploadIcon>+</UploadIcon>
          <UploadText>
            여기에 디자인 이미지를 끌어 놓거나 클릭하여 선택하세요.
          </UploadText>
          <PrimaryButton>파일 선택하기</PrimaryButton>
          <UploadInfo>지원 형식: JPG, PNG (최대 10MB)</UploadInfo>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept=".jpg,.jpeg,.png"
            onChange={handleImageUpload}
          />
        </UploadArea>

        {uploadedImage && (
          <>
            <FilePreview>
              <FileThumbnail>
                <img
                  src={uploadedImage}
                  alt="미리보기"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              </FileThumbnail>
              <FileInfo>
                <FileName>{imageName}</FileName>
                <FileSize>{imageSize}</FileSize>
              </FileInfo>
            </FilePreview>

            <AnalysisOptions>
              <OptionTitle>분석 옵션</OptionTitle>
              <OptionsList>
                <OptionItem>
                  <OptionCheckbox
                    type="checkbox"
                    checked={analysisOptions.layout}
                    onChange={() => handleOptionChange("layout")}
                  />
                  레이아웃
                </OptionItem>
                <OptionItem>
                  <OptionCheckbox
                    type="checkbox"
                    checked={analysisOptions.colors}
                    onChange={() => handleOptionChange("colors")}
                  />
                  색상
                </OptionItem>
                <OptionItem>
                  <OptionCheckbox
                    type="checkbox"
                    checked={analysisOptions.typography}
                    onChange={() => handleOptionChange("typography")}
                  />
                  타이포그래피
                </OptionItem>
                <OptionItem>
                  <OptionCheckbox
                    type="checkbox"
                    checked={analysisOptions.accessibility}
                    onChange={() => handleOptionChange("accessibility")}
                  />
                  접근성
                </OptionItem>
                <OptionItem>
                  <OptionCheckbox
                    type="checkbox"
                    checked={analysisOptions.uxGuidelines}
                    onChange={() => handleOptionChange("uxGuidelines")}
                  />
                  UX 가이드라인
                </OptionItem>
              </OptionsList>
            </AnalysisOptions>

            <PrimaryButton onClick={startAnalysis}>
              AI 디자인 분석 시작하기
            </PrimaryButton>
          </>
        )}
      </UploadContainer>
    </UploadSection>
  );

  // 렌더링 - 로딩 페이지
  const renderLoadingPage = () => (
    <LoadingSection>
      <LoadingCard>
        <LoadingTitle>DesignLens.ai</LoadingTitle>
        <LoadingSubtitle>
          디자인 분석 중입니다. 잠시만 기다려주세요.
        </LoadingSubtitle>

        <ProgressBarContainer>
          <ProgressBar progress={loadingProgress} animated />
        </ProgressBarContainer>

        <LoadingSteps>
          <LoadingStep>
            <StepIndicator active={currentAnalysisStep === "layout"}>
              1
            </StepIndicator>
            <StepTitle>레이아웃</StepTitle>
          </LoadingStep>
          <LoadingStep>
            <StepIndicator active={currentAnalysisStep === "colors"}>
              2
            </StepIndicator>
            <StepTitle>색상</StepTitle>
          </LoadingStep>
          <LoadingStep>
            <StepIndicator active={currentAnalysisStep === "typography"}>
              3
            </StepIndicator>
            <StepTitle>타이포그래피</StepTitle>
          </LoadingStep>
          <LoadingStep>
            <StepIndicator active={currentAnalysisStep === "accessibility"}>
              4
            </StepIndicator>
            <StepTitle>접근성</StepTitle>
          </LoadingStep>
        </LoadingSteps>

        <StatusMessage>{getStatusMessage()}</StatusMessage>
        <LoadingSubtitle>약 15초가 소요됩니다.</LoadingSubtitle>
      </LoadingCard>
    </LoadingSection>
  );

  // 렌더링 - 결과 페이지
  const renderResultPage = () => (
    <ResultsSection>
      <ScoreCard>
        <ScoreCircle>{analysisResult.overallScore}</ScoreCircle>
        <ScoreInfo>
          <ScoreTitle>
            전체 디자인 점수: {analysisResult.overallScore}/100
          </ScoreTitle>
          <ScoreDescription>
            아주 좋습니다! 조금만 더 보완해보세요.
          </ScoreDescription>
        </ScoreInfo>
        <ActionButtons>
          <PrimaryButton onClick={handleDownloadPdf}>
            PDF 다운로드
          </PrimaryButton>
        </ActionButtons>
      </ScoreCard>

      {Object.keys(analysisResult.feedback).map((key) => {
        const feedback = analysisResult.feedback[key];
        if (
          (key === "accessibility" && !analysisOptions.accessibility) ||
          (key === "uxGuidelines" && !analysisOptions.uxGuidelines)
        ) {
          return null;
        }
        return (
          <FeedbackCard key={key}>
            <CardHeader>
              <CardIcon>{feedback.icon}</CardIcon>
              <CardTitle>{feedback.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Feedback>"{feedback.feedback}"</Feedback>
              <ImprovementsTitle>💡 추천 개선 사항:</ImprovementsTitle>
              <ImprovementsList>
                {feedback.improvements.map((improvement, index) => (
                  <ImprovementItem key={index}>{improvement}</ImprovementItem>
                ))}
              </ImprovementsList>
            </CardContent>
          </FeedbackCard>
        );
      })}

      <ComparisonSection>
        <ComparisonTitle>원본 이미지와 개선 제안 비교</ComparisonTitle>
        <ComparisonGrid>
          <ImageContainer>
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="원본 디자인"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              "원본 이미지"
            )}
          </ImageContainer>
          <ImageContainer>AI 개선 제안</ImageContainer>
        </ComparisonGrid>
      </ComparisonSection>

      <ResultActions>
        <PrimaryButton onClick={handleDownloadPdf} disabled={pdfGenerated}>
          {pdfGenerated ? "다운로드 완료" : "PDF 다운로드"}
        </PrimaryButton>
        <SecondaryButton onClick={goToUpload}>
          다른 이미지 분석하기
        </SecondaryButton>
      </ResultActions>
    </ResultsSection>
  );

  // 현재 페이지에 따라 다른 내용 렌더링
  const renderContent = () => {
    switch (currentPage) {
      case "landing":
        return renderLandingPage();
      case "upload":
        return renderUploadPage();
      case "loading":
        return renderLoadingPage();
      case "result":
        return renderResultPage();
      default:
        return renderLandingPage();
    }
  };

  return (
    <>
      <GlobalStyle />
      <Navbar>
        <Logo onClick={handleLogoClick}>DesignLens.ai</Logo>
        <NavLinks>
          {currentPage !== "landing" && (
            <NavButton onClick={goToLanding}>홈으로</NavButton>
          )}
        </NavLinks>
      </Navbar>
      <Container>{renderContent()}</Container>
    </>
  );
};

export default DesignLens;
