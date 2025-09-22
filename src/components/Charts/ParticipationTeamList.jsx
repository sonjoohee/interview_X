import React from "react";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";
import { Button } from "../../assets/styles/ButtonStyle";

const ParticipationTeamList = ({ teamName, description, memberCount, toolCount, progress }) => {
  return (
    <Container>
      <ContentContainer>
        <TeamInfoSection>
          <TeamInfoWrapper width="240px">
            <TeamName>{teamName || "팀명"}</TeamName>
            <TeamDescription>{description || "팀 프로젝트에 대한 설명"}</TeamDescription>
          </TeamInfoWrapper>
          <StatsContainer>
            <StatsSection>
              <StatsRow width="80px" height="36px">
                <StatLabel>팀원</StatLabel>
                <StatValue>{memberCount || "8"} 팀</StatValue>
              </StatsRow>
              <Divider />
              <StatsRow width="80px" height="36px">
                <StatLabel>진행 툴 수</StatLabel>
                <StatValue>{toolCount || "10"}개</StatValue>
              </StatsRow>
              <Divider />
              <StatsRow height="36px">
                <ProgressLabelWrapper>
                  <StatLabel>진행율</StatLabel>
                  <ProgressValue>{progress || "00"}%</ProgressValue>
                </ProgressLabelWrapper>
                <ProgressBarContainer>
                  <ProgressBarBackground />
                  <ProgressBarFill progress={progress || 0} />
                </ProgressBarContainer>
              </StatsRow>
            </StatsSection>
          </StatsContainer>
        </TeamInfoSection>
        <ButtonContainer>
          <TeamActivityButton Small Outline nowrap>팀별 활동</TeamActivityButton>
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1030px;
  height: 76px;
  background-color: ${palette.white};
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
  padding: 12px 24px;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 53px;
`;

const TeamInfoSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 180px;
  width: 100%;
`;

const TeamInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  height: 100%;
  width: ${props => props.width || 'auto'};
  min-width: ${props => props.width || 'auto'};
`;

const TeamName = styled.span`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 500;
  font-size: 16px;
  line-height: 1.55;
  letter-spacing: -3%;
  color: ${palette.gray800};
  padding-left: 0;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TeamDescription = styled.span`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 400;
  font-size: 12px;
  line-height: 1.19;
  letter-spacing: -3%;
  color: ${palette.gray500};
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  padding: 8px;
`;

const StatsSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const StatsRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${props => props.height || 'auto'};
  min-height: ${props => props.height || 'auto'};
  gap: 4px;
  width: ${props => props.width || 'auto'};
  min-width: ${props => props.width || 'auto'};
  box-sizing: border-box;
  padding: 2px 0;
`;

const StatLabel = styled.span`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 500;
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: -3%;
  color: ${palette.gray300};
  white-space: nowrap;
  text-align: left;
`;

const StatValue = styled.span`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 500;
  font-size: 14px;
  line-height: 1.2;
  letter-spacing: -3%;
  color: ${palette.gray700};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`;

const Divider = styled.div`
  width: 1px;
  height: 28px;
  background-color: ${palette.outlineGray};
`;

const ProgressLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ProgressValue = styled.span`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 500;
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: -3%;
  color: ${palette.gray700};
`;

const ProgressBarContainer = styled.div`
  position: relative;
  width: 144px;
  height: 6px;
  margin-top: 4px;
`;

const ProgressBarBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${palette.chatGray};
  border-radius: 10px;
`;

const ProgressBarFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.progress}%;
  height: 100%;
  background-color: ${palette.primary};
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TeamActivityButton = styled(Button)`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 500;
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: -3%;
  color: ${palette.gray700};
  background-color: ${palette.chatGray};
  border-radius: 4px;
  padding: 6px 10px;
  border: 1px solid ${palette.outlineGray};
  white-space: nowrap;
  
  &:hover {
    background-color: ${palette.gray50};
  }
`;

export default ParticipationTeamList; 