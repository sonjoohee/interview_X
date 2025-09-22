//인터뷰룸
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { palette } from "../../../../../assets/styles/Palette";
import images from "../../../../../assets/styles/Images";
import personaImages from "../../../../../assets/styles/PersonaImages";

const OrganismToastPopupKanoOpinions = ({
  isActive,
  onClose,
  title,
  opinions,
}) => {
  const [active, setActive] = useState(isActive);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  const handleClose = () => {
    setActive(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <PopupBox isActive={active}>
        <ToastPopup isActive={active}>
          <Header>
            <Title>
              {title}
              <ColseButton onClick={handleClose} />
            </Title>
            <ul>
              <li>
                <span>
                  <img src={images.PeopleFill} alt="참여 페르소나" />
                  참여 페르소나
                </span>
                <span>{opinions?.length || 0}명</span>
              </li>
            </ul>
          </Header>

          <Contents>
            {opinions && opinions.length > 0 ? (
              opinions.map((opinion, index) => (
                <AnswerItem key={index}>
                  <TypeName>
                    <Thumb>
                      <img
                        src={personaImages[opinion.imageKey]}
                        alt={opinion.persona_name}
                      />
                    </Thumb>
                    <div>
                      {opinion.persona_name}
                      <p>
                        <span>{opinion.gender}</span>
                        <span>
                          {opinion.age?.includes("세")
                            ? opinion.age
                            : `${opinion.age}세`}
                        </span>
                      </p>
                    </div>
                  </TypeName>
                  <TextContainer>
                    <div>
                      #해당 기능이 있다면 얼마나 만족하시나요?
                    </div>
                    <div>
                      {opinion.positive_reason}
                    </div>
                    <div style={{ marginTop: "12px" }}>
                      #해당 기능이 없다면 얼마나 불만족하시나요?
                    </div>
                    <div>
                      {opinion.negative_reason}
                    </div>
                  </TextContainer>
                </AnswerItem>
              ))
            ) : (
              <div>의견이 없습니다.</div>
            )}
          </Contents>
        </ToastPopup>
      </PopupBox>
    </>
  );
};

export default OrganismToastPopupKanoOpinions;

const PopupBox = styled.div`
  position: fixed;
  top: 0;
  right: 100%;
  transform: ${({ isActive }) =>
    isActive ? "translateX(100%)" : "translateX(0)"};
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
  z-index: 101;
  visibility: ${({ isActive }) => (isActive ? "visible" : "hidden")};
`;

const ToastPopup = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  transform: ${({ isActive }) =>
    isActive ? "translateX(0)" : "translateX(100%)"};
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

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  border-bottom: 1px solid ${palette.lineGray};

  ul {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 0.88rem;
    color: ${palette.gray500};
    font-weight: 300;
    line-height: 1.5;
    margin-bottom: 40px;
  }

  li {
    display: flex;
    align-items: center;
    gap: 16px;

    + li {
      margin-left: 20px;
      padding-left: 20px;
      border-left: 1px solid ${palette.lineGray};
    }

    span {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 1.38rem;
  font-weight: 600;
  color: ${palette.gray800};
  line-height: 1.3;
  word-wrap: break-word;
`;

export const ColseButton = styled.button`
  position: relative;
  width: 15px;
  height: 15px;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;

  &:before,
  &:after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 100%;
    border-radius: 10px;
    background-color: ${palette.black};
    content: "";
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding-right: 10px;
  overflow-y: auto;
`;

const AnswerItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  width: 100%;
`;

const TypeName = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${palette.gray800};

  p {
    display: flex;
    align-items: center;
    gap: 6px;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-size: 0.75rem;
      font-weight: 300;
      line-height: 1.3;
      color: ${palette.gray500};

      + span:before {
        display: inline-block;
        width: 1px;
        height: 9px;
        background: ${palette.gray500};
        content: "";
      }
    }
  }
`;

const Thumb = styled.div`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background: ${palette.gray200};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TextContainer = styled.div`
  align-self: flex-start;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${palette.gray800};
  margin-left: 44px;
  padding: 12px;
  border-radius: 0 15px 15px 15px;
  background: rgba(34, 111, 255, 0.06);
  text-align: left;
  width: calc(100% - 44px);
`;
