import React, { useState } from "react";
import styled from "styled-components";
import { MoleculeBusinessModelDrawer } from "../molecules/MoleculeBusinessModelDrawer";

const PageModelDrawerTest = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedSectionId, setSelectedSectionId] = useState("customerSegments");
  
  // 테스트용 활성화된 섹션들 (빈 상태 테스트를 위해 비움)
  const [enabledSectionIds, setEnabledSectionIds] = useState([
    // "customerSegments",
    // "valueProposition", 
    // "channels",
    // "customerRelationships"
  ]);

  // 테스트용 데이터
  const testData = {
    "customerSegments": {
      title: "고객군",
      items: [
        { title: "개인 고객", body: "개인 사용자를 위한 서비스, 개인 사용자를 위한 서비스, 개인 사용자를 위한 서비스, 개인 사용자를 위한 서비스," },
        { title: "기업 고객", body: "B2B 비즈니스 고객" }
        ,{ title: "강 고객", body: "개인 사용자를 위한 서비스, 개인 사용자를 위한 서비스, 개인 사용자를 위한 서비스, 개인 사용자를 위한 서비스" }
      ]
    },
    "valueProposition": {
      title: "가치 제안",
      items: [
        { title: "편리성", body: "사용하기 쉬운 인터페이스" },
        { title: "효율성", body: "시간 절약 솔루션" }
      ]
    },
    "insights": {
      summary: "핵심 요약입니다. 비즈니스 모델의 주요 특징과 강점을 설명합니다.",
      extended: "확장 인사이트입니다. 더 자세한 분석과 향후 방향성을 제시합니다."
    }
  };

  const handleToggleSection = (sectionId) => {
    setEnabledSectionIds(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <TestContainer>
      <ControlPanel>
        <h2>ModelDrawer 테스트 페이지</h2>
        
        <ControlGroup>
          <label>
            <input 
              type="checkbox" 
              checked={isOpen} 
              onChange={(e) => setIsOpen(e.target.checked)} 
            />
            드로어 열기/닫기
          </label>
        </ControlGroup>

        <ControlGroup>
          <h3>활성화된 섹션들:</h3>
          {[
            "customerSegments",
            "valueProposition", 
            "channels",
            "customerRelationships",
            "revenueStreams",
            "keyResources",
            "keyActivities", 
            "keyPartners",
            "costStructure",
            "insights"
          ].map(sectionId => (
            <label key={sectionId}>
              <input 
                type="checkbox"
                checked={enabledSectionIds.includes(sectionId)}
                onChange={() => handleToggleSection(sectionId)}
              />
              {sectionId}
            </label>
          ))}
        </ControlGroup>

        <ControlGroup>
          <h3>선택된 섹션:</h3>
          <select 
            value={selectedSectionId} 
            onChange={(e) => setSelectedSectionId(e.target.value)}
          >
            {enabledSectionIds.map(sectionId => (
              <option key={sectionId} value={sectionId}>
                {sectionId}
              </option>
            ))}
          </select>
        </ControlGroup>
      </ControlPanel>

      <DrawerTestArea>
        <MoleculeBusinessModelDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          enabledSectionIds={enabledSectionIds}
          selectedSectionId={selectedSectionId}
          onSelectSection={setSelectedSectionId}
          data={testData}
        />
        
        <BackgroundContent>
          <h1>배경 콘텐츠</h1>
          <p>드로어가 오버레이되는 배경 영역입니다.</p>
          <p>드로어의 위치와 크기를 확인할 수 있습니다.</p>
        </BackgroundContent>
      </DrawerTestArea>
    </TestContainer>
  );
};

export default PageModelDrawerTest;

const TestContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: "Pretendard", sans-serif;
`;

const ControlPanel = styled.div`
  width: 300px;
  padding: 20px;
  background: #f5f5f5;
  border-right: 1px solid #ddd;
  overflow-y: auto;

  h2 {
    margin-top: 0;
    color: #333;
  }

  h3 {
    margin: 20px 0 10px 0;
    color: #555;
    font-size: 14px;
  }
`;

const ControlGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 12px;
    color: #666;
    cursor: pointer;

    input[type="checkbox"] {
      margin-right: 8px;
    }
  }

  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

const DrawerTestArea = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const BackgroundContent = styled.div`
  padding: 40px;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  h1 {
    margin-top: 0;
  }

  p {
    line-height: 1.6;
    opacity: 0.9;
  }
`;
