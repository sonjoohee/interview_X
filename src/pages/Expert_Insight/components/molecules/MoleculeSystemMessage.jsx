import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../../../assets/styles/Theme";
import { palette } from "../../../../assets/styles/Palette";
import panelimages from "../../../../assets/styles/PanelImages";


const MoleculeSystemMessage = ({ item }) => {
  const [displayedText, setDisplayedText] = useState(""); // 현재까지 타이핑된 텍스트
  const [isTyping, setIsTyping] = useState(true); // 타이핑 중인지 여부
  const message = item.message;
  const selectedExpertIndex = item.expertIndex;
  // console.log(item);

  const isIOSDevice = () => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAppleDevice = navigator.userAgent.includes("Macintosh");
    const isTouchScreen = navigator.maxTouchPoints >= 1; // iOS 13 이상 체크

    return isIOS || (isAppleDevice && isTouchScreen);
  };

  // 모바일 감지 함수 추가
  const isMobileDevice = () => {
    if (isIOSDevice()) {
      return true;
    }
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  };
  // isMobileDevice 상태 추가
  const [isMobile, setIsMobile] = useState(isMobileDevice());

  useEffect(() => {
    // 초기 모바일 상태 설정 및 리사이즈 이벤트 처리
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const messageLines = message.split("\n"); // 메시지를 줄바꿈 기준으로 나눔
    let lineIndex = 0; // 현재 줄 인덱스
    let charIndex = 0; // 현재 글자 인덱스
    let currentText = ""; // 현재까지 출력된 텍스트
    const typingSpeed = 15; // 타이핑 속도 (50ms에 한 글자씩)

    const typeNextChar = () => {
      // 줄이 모두 출력되었는지 확인
      if (lineIndex < messageLines.length) {
        const currentLine = messageLines[lineIndex];

        // 현재 줄에서 모든 글자가 출력되었는지 확인
        if (charIndex < currentLine.length) {
          currentText += currentLine[charIndex]; // 한 글자 추가
          setDisplayedText(currentText); // 화면에 표시할 텍스트 업데이트
          charIndex++; // 다음 글자로 이동
        } else {
          // 현재 줄이 끝났을 때 줄바꿈 추가
          currentText += "\n";
          setDisplayedText(currentText); // 줄바꿈이 포함된 텍스트 업데이트
          lineIndex++; // 다음 줄로 이동
          charIndex = 0; // 글자 인덱스 초기화
        }
      } else {
        // 모든 줄이 출력되었으면 타이핑 종료
        setIsTyping(false);
        clearInterval(typingInterval); // 타이머 정리
      }
    };

    const typingInterval = setInterval(typeNextChar, typingSpeed);

    return () => clearInterval(typingInterval); // 컴포넌트 언마운트 시 타이머 정리
  }, [message]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <SystemMessageContainer
          selectedExpertIndex={selectedExpertIndex}
          isMobile={isMobile}
        >
          {selectedExpertIndex != -1 ? (
            <Thumb>
              <img src={panelimages[`expert_${selectedExpertIndex}`]} alt="" />
            </Thumb>
          ) : (
            <ThumbNone></ThumbNone>
          )}

          <Bubble>
            <TypingEffect isTyping={isTyping}>
              <p>{displayedText}</p>
            </TypingEffect>
          </Bubble>
          {/* <Time>1 min age</Time> */}
        </SystemMessageContainer>
      </ThemeProvider>
    </>
  );
};

export default MoleculeSystemMessage;

const Thumb = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 100px;
  overflow: hidden;
  margin-top: 12px;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;
const ThumbNone = styled.div`
  width: 32px;
  height: 0px;
`;

const SystemMessageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: ${(props) => (props.Myself ? "row-reverse" : "row")};
  gap: 18px;
  // margin-top: ${(props) => (props.isMobile ? "0px" : "12px")};
  margin-top: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: ${(props) => (props.Myself ? "row-reverse" : "column")};
    margin-top: 0;
  }
`;

const Bubble = styled.div`
  font-size: 1rem;
  padding: 14px 20px;
  border-radius: 15px;
  border: 1px solid ${palette.gray200};
  position: relative;
  max-width: 80%;
  width: fit-content;
  display: inline-flex;
  font-weight: 300;
  color: ${palette.gray800};
  line-height: 1.6;
  text-align: left;

  .time {
    position: absolute;
    right: -80px;
    bottom: 1px;
    font-size: 0.75rem;
    color: ${palette.gray500};
  }
`;

// const TypingEffect = styled.div`
//   overflow: hidden;
//   text-align: left;
//   white-space: pre-wrap; /* 줄바꿈을 유지 */
//   display: inline-block;
//   border-right: ${({ isTyping }) =>
//     isTyping ? `2px solid ${palette.lightGray}` : "none"}; /* Cursor effect */
//   animation: ${({ isTyping }) =>
//     isTyping ? "blink-caret 0.75s step-end infinite" : "none"};

//   @keyframes blink-caret {
//     from,
//     to {
//       border-color: transparent;
//     }
//     50% {
//       border-color: ${palette.lightGray};
//     }
//   }
// `;

const TypingEffect = styled.div`
  overflow: hidden;
  text-align: left;
  white-space: pre-wrap; /* 줄바꿈을 유지 */
  display: inline-block;

  @keyframes blink-caret {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: ${palette.lightGray};
    }
  }
`;
