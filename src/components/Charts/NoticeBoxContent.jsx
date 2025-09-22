import React from "react";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";

const NoticeBoxContent = ({ title, date, content }) => {
  return (
    <Container>
      <Header>
        <Title>{title || "알림"}</Title>
        <Date>{date || "2025.04.10"}</Date>
      </Header>
      <ContentArea>
        <ContentText>
          {content || 
            `팀 프로젝트는 다양한 일정과 마일스톤으로
             구성됩니다.
첫 번째 단계는 아이디어 회의로, 3월 1일에
 진행됩니다.
그 후, 3월 15일까지 초기 설계를 완료하고,
4월 1일에는 개발을 시작합니다.
테스트 단계는 5월 15일에 시작되며, 최종 발표는
 6월 30일에 예정되어 있습니다.
각 팀원은 자신의 역할에 따라 일정에 맞춰 작업을
 진행해야 합니다.`}
        </ContentText>
      </ContentArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 330px;
  height: 217px;
  padding: 20px;
  background-color: ${palette.white};
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled.span`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 700;
  font-size: 16px;
  line-height: 1.55;
  letter-spacing: -3%;
  color: ${palette.gray700};
  white-space: nowrap;
`;

const Date = styled.span`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 700;
  font-size: 16px;
  line-height: 1.55;
  letter-spacing: -3%;
  color: ${palette.gray700};
  white-space: nowrap;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  flex-grow: 1;
`;

const ContentText = styled.p`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
  height: 136px;
  letter-spacing: -3%;
  color: ${palette.gray500};
  width: 100%;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`;

export default NoticeBoxContent; 