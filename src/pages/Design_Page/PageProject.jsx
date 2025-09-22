//프로젝트 인사이트
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { palette } from "../../assets/styles/Palette";
import OrganismIncNavigation from "../Global/organisms/OrganismIncNavigation";
// import Header from "../../../Design_Page/IncHeader";
import MoleculeHeader from "../Global/molecules/MoleculeHeader";
import MoleculeAccountPopup from "../Login_Sign/components/molecules/MoleculeAccountPopup";
import PopupWrap from "../../assets/styles/Popup";
import BarChartLikertScale5 from "../../components/Charts/BarChartLikertScale5";
import {
  Button,
} from "../../assets/styles/ButtonStyle";
import {
  ContentsWrap,
  MainContent,
  TabWrapType4,
  TabButtonType4,
} from "../../assets/styles/BusinessAnalysisStyle";
import images from "../../assets/styles/Images";
import {
  H1,
  Body1,
  Body2,
  Body3,
  Sub1,
  Caption1,
} from "../../assets/styles/Typography";

const PageProject = () => {
  const navigate = useNavigate();

  const [isWarningPopupOpen, setIsWarningPopupOpen] = useState(false);

  const handleWarningClose = () => {
    setIsWarningPopupOpen(false);
  };
  const handleWarningContinue = () => {
    setIsWarningPopupOpen(false);
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1240>
          <ProjectWrap>
            <HeaderWrap>
              <div>
                <H1 color="gray800" align="left">Project</H1>
                <Body3 color="gray700" align="left">AI를 활용한 효율적인 프로젝트 인사이트를 관리하세요</Body3>
              </div>

              <Button ExLarge Primary Fill onClick={() => setIsWarningPopupOpen(true)}>
                <Sub1 color="white">새 프로젝트</Sub1>
              </Button>
            </HeaderWrap>

            <ProjectListWrap>
              <TabWrapType4>
                <TabButtonType4>
                  <Caption1 color="gray700">All</Caption1>
                </TabButtonType4>
                <TabButtonType4>
                  <Caption1 color="gray700">AI Person Interview</Caption1>
                </TabButtonType4>
                <TabButtonType4>
                  <Caption1 color="gray700">Research Tool</Caption1>
                </TabButtonType4>
                <TabButtonType4>
                  <Caption1 color="gray700">Business Expert</Caption1>
                </TabButtonType4>
              </TabWrapType4>

              <ProjectList>
                <ProjectItem onClick={() => navigate("#")}>
                  <div className="thumbnail">
                    <img src={images.ProjectThumbnail01} alt="" />
                  </div>
                  <div className="content">
                    <div className="info">
                      <Body1 color="gray800" align="left">전기차 충전소 안내 서비스</Body1>
                      <Body3 color="gray700" align="left">프로젝트에 대한 개요적인 부분을 설명하는 문장을 넣는 공간입니다.</Body3>
                    </div>
                    <div className="date">
                      <Body3 color="gray700" align="left">마지막 업데이트 : 2025년 2월 20일</Body3>
                    </div>
                  </div>
                  <div className="noData">
                    <img src={images.PlusSquareWhite} alt="새 작업" />
                    <Body2 color="primary">새 프로젝트를 시작하세요</Body2>
                  </div>
                </ProjectItem> 

                <ProjectItem onClick={() => navigate("#")}>
                  <div className="thumbnail">
                    <img src={images.ProjectThumbnail02} alt="" />
                  </div>
                  <div className="content">
                    <div className="info">
                      <Body1 color="gray800" align="left">전기차 충전소 안내 서비스</Body1>
                      <Body3 color="gray700" align="left">프로젝트에 대한 개요적인 부분을 설명하는 문장을 넣는 공간입니다.</Body3>
                    </div>
                    <div className="date">
                      <Body3 color="gray700" align="left">마지막 업데이트 : 2025년 2월 20일</Body3>
                    </div>
                  </div>
                  <div className="noData">
                    <img src={images.PlusSquareWhite} alt="새 작업" />
                    <Body2 color="primary">새 프로젝트를 시작하세요</Body2>
                  </div>
                </ProjectItem>

                <ProjectItem NoData onClick={() => navigate("/ProjectCreate")}>
                  <div className="noData">
                    <img src={images.PlusSquareWhite} alt="새 작업" />
                    <Body2 color="primary">새 프로젝트를 시작하세요</Body2>
                  </div>
                </ProjectItem> 
              </ProjectList>
            </ProjectListWrap>
          </ProjectWrap>
        </MainContent>
      </ContentsWrap>
      <BarChartLikertScale5 />
      {isWarningPopupOpen && (
        <PopupWrap
          Warning
          title="새 프로젝트를 시작 하시겠습니까?"
          message="프로젝트 도중 이탈 시 결과값에 문제가 발생할 수 있습니다."
          buttonType="Outline"
          closeText="취소"
          confirmText="시작"
          isModal={false}
          onCancel={handleWarningClose}
          onConfirm={handleWarningContinue}
        />
      )}
    </>
  );
};

export default PageProject;

const ProjectWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 54px;
  margin: 50px auto;
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ProjectListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProjectList = styled.div`
  display: flex;
  gap: 20px;
`;

const ProjectItem = styled.div`
  max-width: 33.33%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 20px;
  background: ${palette.chatGray};
  cursor: pointer;

  .thumbnail {
    width: 100%;
    max-height: 200px;
    height: 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    width: 100%;
    padding: 20px 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .date {
      padding-top: 16px;
      border-top: 1px solid ${palette.outlineGray};
    }
  }

  .noData {
    width: 100%;
    height: 100%;
    display: ${(props) => (props.NoData ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
`;

export const BgBoxItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  width: 100%;
  padding: ${(props) => (props.NoOutline ? "12px" : "8px 12px")};
  border-radius: 10px;
  border: ${(props) =>
    props.NoOutline ? "0" : `1px solid ${palette.outlineGray}`};
  background: ${(props) => (props.white ? palette.white : palette.chatGray)};
`;
