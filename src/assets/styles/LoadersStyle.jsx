// StyledComponents.js
import styled, { keyframes } from 'styled-components';
import { palette } from './Palette'; // palette 임포트

// 애니메이션 정의
const waveAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

// Loading 컴포넌트 스타일
export const Loading = styled.div`
  position: relative;
  width: 13px;
  height: 13px;
  margin: 30px;
  border-radius: 50%;
  background: rgba(34, 111, 255, 0.1);
  border: 1px solid ${palette.primary};

  &:before,
  &:after {
    content: '';
    position: absolute;
    background: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    animation: ${waveAnimation} 3s infinite linear;
  }

  &:after {
    opacity: 0;
    animation: ${waveAnimation} 3s 1.5s infinite linear;
  }
`;

// 나머지 스타일 컴포넌트 정의 (예: PopupBox, ToastPopup 등)
export const PopupBox = styled.div`
  position: fixed;
  top: 0;
  right: 100%;
  transform: translateX(100%);
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
  z-index: 100;
`;

export const ToastPopup = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  transform: ${({ isActive }) => (isActive ? 'translateX(-100%)' : 'translateX(0)')};
  width: 100%;
  max-width: 800px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  padding: 32px;
  border-radius: 15px 0 0 15px;
  background: ${palette.white};
  transition: transform 0.3s ease;
`;

// 나머지 스타일 컴포넌트 (Header, Title 등)도 여기에 추가