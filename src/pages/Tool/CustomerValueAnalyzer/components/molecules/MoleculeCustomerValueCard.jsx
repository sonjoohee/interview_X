import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { palette } from "../../../../../assets/styles/Palette";
import { Button } from "../../../../../assets/styles/ButtonStyle";
import {
  ListBoxItem,
  ListText,
  ListTitle,
  ListButton,
  BoxWrap,
  ListBox,
  TextWrap,
  ListGroup,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import {
  CheckBoxButton,
} from "../../../../../assets/styles/InputStyle";
import PopupWrap from "../../../../../assets/styles/Popup";
import {
  H4,
  Body1,
  Body2,
  Sub1,
  Sub2,
  Sub3,
} from "../../../../../assets/styles/Typography";

const MoleculeCustomerValueCard = ({
  title,
  content,
  status, 
  isSelected, 
  onSelect, 
  id, 
  journeyMapData,   
  hideCheckCircle, 
  activeTab, 
  factor, 
  viewType, 
  business, 
  hideButton, 
}) => {


  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);


  //커스터머 저니맵 머메이드
  useEffect(() => {
    if (showDetailPopup && activeTabIndex === 0) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js";
      script.async = true;

      script.onload = async () => {
        try {
          window.mermaid.initialize({
            startOnLoad: true,
            theme: "default",
            securityLevel: "loose",
            logLevel: "error",
            themeVariables: {
              background: "#ffffff",
              primaryColor: "#D6EBFF",
              secondaryColor: "#D7DBFE",
              tertiaryColor: "#E8E4FF",
              journeyHoverColor: "#226FFF20",
            },
          });

          window.mermaid.contentLoaded();
        } catch (error) {
        
        }
      };

      document.body.appendChild(script);
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [showDetailPopup, activeTabIndex]);

 
  const renderButton = () => {
    switch (status) {
      case "waiting":
        return (
          <CustomButton waiting Medium PrimaryLightest Fill disabled $loading>
            대기중
          </CustomButton>
        );
      case "loading":
        return (
          <CustomButton Medium PrimaryLightest Fill disabled $loading>
            호출중
          </CustomButton>
        );
      case "completed":
        return (
          <CustomButton
            Medium
            PrimaryLightest
            Fill
            onClick={() => setShowDetailPopup(true)}
          >
            자세히
          </CustomButton>
        );
      default:
        return (
          <CustomButton waiting Medium PrimaryLightest Fill disabled $loading>
            대기중
          </CustomButton>
        );
    }
  };

  const renderPopup = () => {
    if (activeTab === 3) {
      return (
        <PopupWrap
          Wide1000
          title={
            <>
              <H4 color="gray800" align="left">
                {title}의 {business} - 구매 핵심 요인 분석
              </H4>
            </>
          }
          buttonType="Fill"
          isModal={true}
          showTabs={true}
          activeTab={activeTabIndex}
          onTabChange={(index) => setActiveTabIndex(index)}
          eventState={false}
          customAlertBox={
            <TextWrap>
              <Body2 color="gray800" align="left">
                {factor?.conclusion || "결론이 없습니다."}
              </Body2>
            </TextWrap>
          }
          body={
            <>
              <ListGroup style={{ alignItems: "stretch" }}>
                {factor?.key_buying_factors?.map((factorItem, index) => (
                  <div key={index}>
                    <Body1 color="gray800" align="left">
                      {factorItem.title}
                    </Body1>
                    <Sub3 color="gray800" align="left">
                      {factorItem.reason}
                    </Sub3>
                  </div>
                ))}
              </ListGroup>
            </>
          }
          onClose={() => setShowDetailPopup(false)}
          onCancel={() => setShowDetailPopup(false)}
        />
      );
    } else {
      // 기존 팝업 내용
      return (
        <PopupWrap
          Wide1000
          title={
            <>
              <H4 color="gray800" align="left">
                {title}의 {business} - 고객 여정 분석
              </H4>
            </>
          }
          buttonType="Fill"
          isModal={true}
          showTabs={true}
          tabs={["고객 여정 맵", "여정별 상세 설명"]}
          activeTab={activeTabIndex}
          onTabChange={(index) => setActiveTabIndex(index)}
          eventState={false}
          customAlertBox={
            <TextWrap>
              <Body2 color="gray800" align="left">
                {journeyMapData?.conclusion || "결론이 없습니다."}
              </Body2>
            </TextWrap>
          }
          onClose={() => setShowDetailPopup(false)}
          onCancel={() => setShowDetailPopup(false)}
          body={
            <>
              {activeTabIndex === 0 && (
                <BoxWrap>
                  <ScrollContainer onMouseDown={handleMouseDown}>
                    {journeyMapData?.journey_map_image || (
                      <div
                        className="mermaid"
                        style={{ height: "100%", minWidth: "fit-content" }}
                      >
                        {journeyMapData?.mermaid}
                      </div>
                    )}
                  </ScrollContainer>
                </BoxWrap>
              )}
              {activeTabIndex === 1 && (
                <ListBox>
                  {Object.entries(journeyMapData).map(([key, step], index) => {
                    if (
                      key === "conclusion" ||
                      key.startsWith("section") ||
                      key === "mermaid" ||
                      key === "business" ||
                      key === "target"
                    )
                      return null;
                    return (
                      <div key={index}>
                        <span className="number">{index + 1}</span>
                        <div>
                          <Sub1 color="gray800">{step.title}</Sub1>
                          <Body2 color="gray700" align="left">
                            {step.detail}
                          </Body2>

                          <div className="tag">
                            {step.emotion &&
                              step.emotion.split(",").map((emotion, i) => (
                                <Sub3 key={i} color="gray800">
                                  #{emotion.trim()}
                                </Sub3>
                              ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </ListBox>
              )}
            </>
          }
        />
      );
    }
  };

  const handleMouseDown = (e) => {
    const ele = e.currentTarget;
    const startPos = {
      left: ele.scrollLeft,
      x: e.clientX,
    };

    const handleMouseMove = (e) => {
      const dx = e.clientX - startPos.x;
      ele.scrollLeft = startPos.left - dx;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      {viewType === "list" && (
        <ListBoxItem NoBg selected={isSelected} active={isSelected}>
          {!hideCheckCircle && (
            <div>
              <CheckBoxButton
                id={id}
                name={id}
                checked={isSelected}
                onChange={() => onSelect(id)}
              />
            </div>
          )}
          <ListText>
            <ListTitle>
              <Body1 color={isSelected ? "primary" : "gray800"}>{title}</Body1>
            </ListTitle>

            <Sub2 color="gray500" align="left">
              {content}
            </Sub2>
          </ListText>
          {!hideButton && <ListButton>{renderButton()}</ListButton>}
        </ListBoxItem>
      )}

      {showDetailPopup && renderPopup()}
    </>
  );
};

export default MoleculeCustomerValueCard;

const CustomButton = styled(Button)`
  min-width: 92px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border: ${(props) =>
    props.children === "호출중" ? `1px solid ${palette.outlineGray}` : `0`};

  ${(props) =>
    props.$loading &&
    css`
      position: relative;
      justify-content: ${props.children === "호출중" ? "center" : "center"};
      // border: 1px solid ${palette.outlineGray} !important;
      border: ${props.children === "호출중"
        ? `1px solid ${palette.outlineGray}`
        : `0`};
      background: ${palette.chatGray} !important;
      color: ${palette.gray700} !important;
      opacity: ${(props) => (props.children === "호출중" ? 1 : 0.5)};

      ${props.children === "호출중" &&
      css`
        font-size: 0;
        line-height: 0;
        min-height: 30px;
        border: 1px solid ${palette.primaryLightest} !important;
        background: ${palette.primaryLightest} !important;

        &:after {
          content: "";
          width: 3px;
          height: 3px;
          border-radius: 50%;
          display: block;
          position: relative;
          margin-right: 8px;
          background: ${palette.white};
          box-shadow: -10px 0 ${palette.white}, 10px 0 ${palette.white};
          box-sizing: border-box;
          animation: shadowPulse 2s linear infinite;
        }

        &:before {
          position: absolute;
          left: 0;
          top: 0;
          width: 0;
          height: 100%;
          border-radius: 4px;
          background: ${palette.primary};
          animation: prog 5s linear infinite;
          content: "";
        }

        @keyframes prog {
          to {
            width: 100%;
          }
        }

        @keyframes shadowPulse {
          33% {
            background: ${palette.white};
            box-shadow: -10px 0 ${palette.primary}, 10px 0 ${palette.white};
          }
          66% {
            background: ${palette.primary};
            box-shadow: -10px 0 ${palette.white}, 10px 0 ${palette.white};
          }
          100% {
            background: ${palette.white};
            box-shadow: -10px 0 ${palette.white}, 10px 0 ${palette.primary};
          }
        }
      `}
    `}
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 400px;
  overflow-x: auto;
  overflow-y: hidden;
  cursor: grab;
  user-select: none;

  &:active {
    cursor: grabbing;
  }

  .mermaid {
    height: 100%;
    display: flex;
    align-items: center;
    visibility: hidden;
  }

  svg {
    height: 100%;
    width: auto;
    visibility: visible;
  }
`;

// const ListGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 24px;

//   > div {
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//   }
// `;

// export const DiagramContainer = styled.div`
//   width: 70%;
//   min-width: 600px;
//   min-height: 600px;
//   margin: 20px 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   overflow: visible;
// `;
