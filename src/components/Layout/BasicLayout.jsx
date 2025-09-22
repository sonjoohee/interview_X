import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import WaitLongLodingBar from '../Charts/WaitLongLodingBar';

/**
 * 기본 레이아웃 컴포넌트
 * @param {Object} props
 * @param {React.ReactNode} props.children - 레이아웃 내부에 렌더링할 컨텐츠
 * @returns {JSX.Element}
 */
const BasicLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 실제 앱에서는 데이터 로딩 등의 상태에 따라 로딩 상태 변경
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <LoadingContainer>
        <WaitLongLodingBar size={200} />
      </LoadingContainer>
    );
  }

  return (
    <LayoutContainer>
      {children}
    </LayoutContainer>
  );
};

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #FAFAFA;
`;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FAFAFA;
`;

export default BasicLayout; 