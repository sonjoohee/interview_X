import React from "react";
import styled, { css } from "styled-components";
import { palette } from "../../../../../assets/styles/Palette";
import { Button } from "../../../../../assets/styles/ButtonStyle";
import {
  ListBoxItem,
  ListText,
  ListButton,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import { Body1 } from "../../../../../assets/styles/Typography";


const MoleculeIdeaGeneratorCard2 = ({ coreValue, status, onShowDetail }) => {


  const getButtonText = () => {
    switch (status) {
      case "waiting":
        return "대기중";
      case "loading":
        return "호출중";
      case "completed":
        return "30개 아이디어 확인";
      default:
        return "대기중";
    }
  };

  return (
    <ListBoxItem>
      <ListText>
        <Body1 color="gray800">{coreValue}</Body1>
      </ListText>
      <ListButton>
        <CustomButton
          Medium
          PrimaryLightest
          Fill
          onClick={onShowDetail}
          disabled={status === "waiting" || status === "loading"}
          $loading={status === "loading"}
        >
          {getButtonText()}
        </CustomButton>
      </ListButton>
    </ListBoxItem>
  );
};

export default MoleculeIdeaGeneratorCard2;

const CustomButton = styled(Button)`
  min-width: 92px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  ${(props) =>
    props.$loading &&
    css`
      position: relative;
      justify-content: ${props.children === "호출중"
        ? "center"
        : "center"};
      border: 1px solid ${palette.outlineGray} !important;
      background: ${palette.chatGray} !important;
      color: ${palette.gray700} !important;
      opacity: 1;

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
          content: '';
        }

        @keyframes prog {
          to  {
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
