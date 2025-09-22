import React from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";

const MoleculeUserMessage = ({ message }) => {
  const formatMessage = (msg) => {
    const regex = /\*(.*?)\*/g; // *로 감싸진 부분 찾기

    return msg.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line.split(regex).map((part, i) => {
          if (i % 2 === 1) {
            // *로 감싸진 부분일 때
            const updatedPart = part.includes(",") ? part.replace(/,/g, " 및") : part; // 쉼표를 "및"으로 치환
            return (
              <span key={i}>
                <u>{updatedPart}</u>
              </span> // 밑줄 및 강조
            );
          }
          return part;
        })}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <UserMessageContainer>
      <div>
        <p>{formatMessage(message)}</p>
      </div>
      {/* <Time>1 min age</Time> */}
    </UserMessageContainer>
  );
};

export default MoleculeUserMessage;

const Time = styled.span`
  align-self: flex-end;
  font-size: 0.63rem;
  color: ${palette.gray};
`;

const UserMessageContainer = styled.div`
  font-size:1rem;
  display: flex;
  align-items: flex-end;
  flex-direction: row-reverse;
  gap: 18px;
  margin-top: 40px;
  position: relative;

  > div {
    padding: 14px 20px;
    border-radius: 15px;
    background:${palette.primary};

    p {
      color:${palette.white};
      text-align:left;
      line-height: 1.6;
      font-weight:300;
      word-wrap: break-word;
      word-break: break-word;
    }
  }

  &:after {
    position: absolute;
    top: 50%;
    right: -10px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-left-color: #ebf3fe;
    border-right: 0;
    margin-top: -10px;
  }
`;
