//대시보드
import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { palette } from "../../assets/styles/Palette";
import OrganismIncNavigation from "../Global/organisms/OrganismIncNavigation";
// import Header from "../../../Design_Page/IncHeader";
import MoleculeHeader from "../Global/molecules/MoleculeHeader";
import MoleculeAccountPopup from "../Login_Sign/components/molecules/MoleculeAccountPopup";
import PopupWrap from "../../assets/styles/Popup";
import { Button } from "../../assets/styles/ButtonStyle";
import {
  ContentsWrap,
  MainContent,
  Tag,
  Table,
  TableHeader,
  TableBody,
} from "../../assets/styles/BusinessAnalysisStyle";
import images from "../../assets/styles/Images";
import {
  H1,
  H2,
  H4,
  Body1,
  Body2,
  Body3,
  Sub1,
  Sub2,
  Sub3,
  Caption1,
  InputText,
} from "../../assets/styles/Typography";

const PageStorageBox = () => {
  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1030>
          <StorageBoxWrap>
            <StorageBoxTitle>
              <H1 color="gray800" align="left">Knowledge Archive</H1>
              <Body3 color="gray700" align="left">해당 서비스를 통해 수집한 리포트들을 한곳에 모아두었어요</Body3>
            </StorageBoxTitle>

            <Table Round>
              <colgroup>
                <col width="20%" />
                <col />
                <col width="20%" />
                <col width="10%" />
                <col width="10%" />
                <col width="5%" />
              </colgroup>

              <TableHeader Type1>
                <tr>
                  <th><Body1 color="gray700" align="left">리포트 이름</Body1></th>
                  <th><Body1 color="gray700" align="left">상세 내용</Body1></th>
                  <th><Body1 color="gray700" align="left">현황</Body1></th>
                  <th><Body1 color="gray700" align="left">진행 일시</Body1></th>
                  <th colSpan={2}><Body1 color="gray700" align="left">상세보기</Body1></th>
                </tr>
              </TableHeader>
              <TableBody>
                <tr>
                  <td><Body2 color="gray700" align="left">고객 탐색기</Body2></td>
                  <td><Body2 color="gray700" align="left">총 8명의 페르소나 시나리오 분석</Body2></td>
                  <td><Body2 color="gray700" align="left">완료</Body2></td>
                  <td><Body2 color="gray700" align="left">25.02.19</Body2></td>
                  <td>
                    <Button Small Outline Fill>
                      <InputText color="gray700">자세히 보기</InputText>
                    </Button>
                  </td>
                  <td><Button View>삭제</Button></td>
                </tr>
              </TableBody>
            </Table>
          </StorageBoxWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PageStorageBox;

const StorageBoxWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 64px;
  margin: 50px auto;
`;

const StorageBoxTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

const DashBoardItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .title {
    display: flex;
    align-items: center;
    gap: 12px;

    button {
      margin-left: auto;
    }
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 24px;
  border-radius: 15px;
  border: 1px solid ${palette.outlineGray};
  background: ${palette.white};
`;

const CardTitle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const TagWrap = styled.div`
  display: flex;
  gap: 8px;
`;

const CardContent = styled.div`
  color: ${palette.gray800};
  text-align: left;

  p + p {
    margin-top: 20px;
  }
`;

const TooltipButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${palette.chatGray};
  cursor: pointer;
  z-index: 1;

  &:before {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    font-size: 0.63rem;
    color: ${palette.gray500};
    border: 1px solid ${palette.gray500};
    content: "!";
  }
`;

const TooltipContent = styled.div`
  position: absolute;
  top: -25px;
  right: -300px;
  width: 290px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  padding: 20px 20px 32px;
  border-radius: 15px;
  background: ${palette.white};
  filter: drop-shadow(0px 4px 30px rgba(0, 0, 0, 0.15));
  animation: fadeIn 0.3s ease-in-out;
  cursor: default;
  z-index: 100;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:before {
    position: absolute;
    top: 30px;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid ${palette.white};
    content: "";
  }
`;

const TooltipHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 300;
  color: ${palette.gray800};
  line-height: 1.5;
  width: 100%;

  span {
    position: relative;
    width: 16px;
    height: 16px;
    display: block;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 16px;
      display: block;
      border-radius: 5px;
      background: ${palette.gray700};
      content: "";
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`;

const TooltipBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    width: 100%;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 12px;

    &:before {
      width: 5px;
      height: 18px;
      border-radius: 1px;
      content: "";
    }

    &.start:before {
      background: ${palette.outlineGray};
    }

    &.ing:before {
      background: #32ade6;
    }

    &.complete:before {
      background: ${palette.primary};
    }
  }

  p {
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${palette.gray700};
    text-align: left;
  }
`;

const PersonaStatusWrap = styled.div`
  display: flex;
  gap: 24px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 24px;
    // max-width: calc(100% / 3);
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  ${(props) =>
    props.NoData &&
    `
    > div {
      align-items: center;
      gap: 8px;
      padding: 44px 24px;

      button {
        margin-top: 4px;
      }
    }
  `}
`;

const RecentToolWrap = styled(PersonaStatusWrap)`
  ${(props) =>
    props.NoData &&
    `
    > div {
      padding: 130px 0 175px;
    }
  `}
`;

const UlInfo = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  li {
    display: flex;
    align-items: center;
    gap: 12px;

    div:last-child {
      margin-left: auto;
    }

    + li {
      padding-top: 6px;
      border-top: 1px solid ${palette.outlineGray};
    }

    &:before {
      width: 5px;
      height: 18px;
      border-radius: 1px;
      content: "";
    }

    &.start:before {
      background: ${palette.outlineGray};
    }

    &.ing:before {
      background: #32ade6;
    }

    &.complete:before {
      background: ${palette.primary};
    }
  }
`;
