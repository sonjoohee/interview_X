import React from "react";
import styled, { css } from "styled-components";
import { palette } from "../../../../../assets/styles/Palette";
import { Button } from "../../../../../assets/styles/ButtonStyle";
import {
    ListBoxItem,
    ListText,
    ListTitle,
    ListSubtitle,
    ListButton,
    Badge,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import { 
    CheckBoxButton,
  } from "../../../../../assets/styles/InputStyle";
import {
  Body1,
} from "../../../../../assets/styles/Typography";


const MoleculeIdeaGeneratorCard = ({
  persona,
  isSelected,
  onSelect,
  id,
  onShowDetail,
  disabled,
}) => {
  
  return (
    <>
        <ListBoxItem
          NoBg
          selected={isSelected}
          active={isSelected}
        >
          <div>
            <CheckBoxButton
              id={id}
              name={id}
              checked={isSelected}
              onChange={onSelect}
              disabled={disabled}
            />
          </div>
          <ListText>
            <ListTitle>
              <Body1
                color={isSelected ? "primary" : "gray800"}
              >
                {persona.name}
              </Body1>
            </ListTitle>

            <ListSubtitle>
              {persona.keywords.map((keyword, index) => (
                <Badge Keyword key={index}>#{keyword}</Badge>
              ))}
            </ListSubtitle>
          </ListText>
          <ListButton>
            <CustomButton
              Medium
              PrimaryLightest
              Fill
              onClick={onShowDetail}
            >
              자세히
            </CustomButton>
          </ListButton>
        </ListBoxItem>
    </>
  );
};

export default MoleculeIdeaGeneratorCard;

const CustomButton = styled(Button)`
  min-width: 92px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  ${(props) =>
    props.$loading &&
    css`
      position: relative;
      justify-content: ${props.children === "호출중"
        ? "space-between"
        : "center"};
      border: 1px solid ${palette.outlineGray} !important;
      background: ${palette.chatGray} !important;
      color: ${palette.gray700} !important;
      opacity: 1;

      ${props.children === "호출중" &&
      css`
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