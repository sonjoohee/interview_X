import React from 'react';
import styled from 'styled-components';
import images from '../../../../assets/styles/Images';
import { palette } from '../../../../assets/styles/Palette';

const PageCompletedMail = () => {
  return (
    <>
      <CompletedMailWrap>
        <div>
          <h1><img src={images.Logo} alt="" /></h1>
          <FormBox>
            <span><img src={images.iconMailSuccess} alt="" /></span>
            <strong>인증이 완료되었습니다 !<br />이제 AI Expert와 함께 프로젝트를 시작하세요</strong>
            <div className="btnWrap">
              <button type="button">로그인 하러가기</button>
              <span>원활한 이용을 위해 “PC”에서 서비스를 사용해 주세요</span>
            </div>
          </FormBox>
        </div>
      </CompletedMailWrap>
    </>
  );
};

export default PageCompletedMail;

// CSS-in-JS 스타일링
const CompletedMailWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  background-color: #FAFAFA;

  @media (max-width:480px) {
    background:${palette.white};
  } 
`;

const FormBox = styled.div`
  max-width:600px;
  width:100%;
  display:flex;
  flex-direction: column;
  gap:30px;
  margin:40px auto 0;
  border-radius:15px;
  padding:64px 80px;
  background:${palette.white};

  strong {
    font-size:0.88rem;
    font-weight:700;
    line-height:1.5;
  }

  .btnWrap {
    display:flex;
    flex-direction: column;
    align-items:center;
    gap:6px;

    button {
      min-width:196px;
      font-family: 'Pretendard', 'Poppins';
      font-size:0.88rem;
      font-weight:500;
      color:${palette.white};
      padding:15px 56px;
      border-radius:8px;
      border:0;
      background:${palette.blue};
    }

    span {
      font-size:0.63rem;
      color:${palette.gray500};
    }
  }

  @media (max-width:480px) {
    margin:0 auto;
    padding:64px 2vw;
  } 
`;
