import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";

const WriteSelfCard = () => {
  const [inputText, setInputText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);
  const inputRef = useRef(null);
  const cardRef = useRef(null);

  // 메시지를 추가하는 함수
  const addMessage = () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, inputText]);
      setInputText("");
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }
    }
  };

  // Enter 키를 눌렀을 때 메시지 전송
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addMessage();
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // 카드 클릭 시 입력 필드로 포커스
  const handleCardClick = () => {
    if (inputRef.current && !isFocused) {
      inputRef.current.focus();
    }
  };

  // 플레이스홀더 클릭 시 입력 필드로 전환
  const handlePlaceholderClick = (e) => {
    e.stopPropagation();
    setIsFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 새 메시지가 추가될 때마다 스크롤을 최하단으로 이동
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <CardContainer ref={cardRef} onClick={handleCardClick}>
      {messages.length > 0 ? (
        <ChatContainer onClick={(e) => e.stopPropagation()}>
          {messages.map((message, index) => (
            <ChatBubble key={index}>
              {message}
            </ChatBubble>
          ))}
          <div ref={messageEndRef} />
        </ChatContainer>
      ) : null}

      <InputContainer hasText={inputText.length > 0 || messages.length > 0}>
        <CardContent>
          {inputText.length === 0 && !isFocused ? (
            <PlaceholderText onClick={handlePlaceholderClick}>직접 작성</PlaceholderText>
          ) : (
            <InputField
              ref={inputRef}
              value={inputText}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder=""
              autoFocus={isFocused}
            />
          )}
        </CardContent>
        <IconContainer>
          <RegisterButton 
            onClick={(e) => {
              e.stopPropagation();
            }}
            active={inputText.trim() !== ""}
          >
            등록
          </RegisterButton>
        </IconContainer>
      </InputContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 820px;
  height: auto;
  min-height: 56px;
  background-color: ${palette.white};
  border-radius: 10px;
  border: 1px solid #E0E4EB;
  box-sizing: border-box;
  transition: all 0.2s ease;
  overflow: hidden;
  cursor: text;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  padding: 16px 20px;
  gap: 8px;
  cursor: default;
  justify-content: flex-start;
`;

const ChatBubble = styled.div`
  background-color: #F7F8FA;
  border-radius: 8px;
  padding: 12px 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.55;
  color: #323232;
  align-self: flex-start;
  max-width: 80%;
  word-break: break-word;
  display: flex;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 56px;
  padding: 16px 20px;
  border-top: none;
  box-sizing: border-box;
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  height: 24px;
`;

const PlaceholderText = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.55;
  letter-spacing: -0.03em;
  color: #CCCCCC;
  cursor: text;
  width: 100%;
  text-align: left;
  padding: 0;
  display: flex;
  align-items: center;
`;

const InputField = styled.textarea`
  width: 100%;
  font-family: 'Pretendard', Poppins;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.55;
  letter-spacing: -0.03em;
  color: #323232;
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  padding: 0;
  margin: 0;
  height: 24px;
  max-height: 120px;
  overflow-y: hidden;
  display: block;

  &::placeholder {
    color: #CCCCCC;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
`;

const RegisterButton = styled.button`
  font-family: 'Pretendard', Poppins;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.2;
  letter-spacing: -0.03em;
  background-color: ${props => props.active ? "#F0F4FF" : "#F7F8FA"};
  color: ${props => props.active ? palette.primary : "#8C8C8C"};
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: ${props => props.active ? 'pointer' : 'default'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${props => props.active ? "#E6EDFF" : "#F7F8FA"};
  }
`;

export default WriteSelfCard;
