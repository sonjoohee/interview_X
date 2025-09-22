import styled, { css } from "styled-components";
import { palette } from "./Palette";

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-family: 'Pretendard', 'Poppins';
  padding: 4px 8px;
  border-radius: 5px;
  border: 0;
  background: ${palette.chatGray};
  box-sizing: border-box;
  transition: all 0.3s ease;

  &:disabled {
    color: ${palette.white};
    cursor: not-allowed;
    background: ${palette.gray300};
  }

  ${props => props.Small && css`
    gap: 4px;
    font-size: 0.75rem;
    line-height: 1.2;
    padding: 6px 10px;
  `}

  ${props => props.Medium && css`
    gap: 4px;
    font-size: 0.75rem;
    line-height: 1.5;
    padding: 6px 12px;
    border-radius: 4px;
  `}

  ${props => props.Large && css`
    gap: 4px;
    font-size: 0.88rem;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 4px;
  `}

  ${props => props.ExLarge && css`
    gap: 8px;
    font-size: 0.88rem;
    line-height: 1.55;
    padding: 8px 12px;
    border-radius: 8px;
  `}

  ${props => props.DbExLarge && css`
    gap: 12px;
    font-size: 0.88rem;
    line-height: 1.55;
    padding: 12px 16px;
    border-radius: 8px;
  `}

  ${props => props.Other && css`
    gap: 12px;
    font-size: 0.88rem;
    line-height: 1.55;
    padding: 8px 24px;
    border-radius: 20px;
    border: 1px solid ${palette.primary};
    background: ${palette.white};
  `}

    ${props => props.Other2 && css`
    gap: 12px;
    font-size: 1rem;
    line-height: 1.55;
    font-weight: 500;
    padding: 12px 24px;
    border-radius: 8px;
    border: 1px solid ${palette.primary};
    background: ${palette.white};
  `}

  ${props => props.W100 && css`
    width: 100%;
  `}

  ${props => props.Round && css`
    border-radius: 70px;
  `}

  ${props => props.Other && props.Fill && css`
    color: ${palette.white};

    &:hover {
      background: rgba(34, 111, 255, 0.2);
    }

    &:disabled {
      color: ${palette.white};
      border: none;
      background: ${palette.gray300};
      cursor: not-allowed;

      &:hover {
        background: ${palette.gray300};
      }
    }
  `}

    ${props => props.Other2 && props.Fill && css`
    color: ${palette.primary};

    &:hover {
      background: rgba(34, 111, 255, 0.2);
    }

    &:disabled {
      color: ${palette.white};
      border: none;
      background: ${palette.gray300};
      cursor: not-allowed;

      &:hover {
        background: ${palette.gray300};
      }
    }
  `}

  ${props => props.PrimaryLightest && props.Fill && css`
    color: ${palette.primary};
    background: ${palette.primaryLightest};

    &:hover {
      background: rgba(34, 111, 255, 0.2);
    }

    &:disabled {
      color: ${palette.gray500};
      background: #ECEFF3;
      cursor: not-allowed;
    }
  `}

  ${props => props.Primary && props.Fill && css`
    color: ${palette.white};
    background: ${palette.primary};

    &:hover {
      border-color: #0B45B1;
      background: #0B45B1;

      // &:disabled {
      //   background: ${palette.primary};
      // }
    }

    // &:disabled {
    //   cursor: not-allowed;
    // }
  `}

  ${props => props.Primary && props.Fill && (props.Large || props.DbExLarge) && css`
    color: ${palette.white};
    background: ${palette.primary};

    &:hover {
      background: #0B45B1;
    }

    &:disabled {
      // color: ${palette.white};
      border: none;
      // border: 1px solid ${palette.gray300};
      // background: ${palette.gray300};

      &:hover {
        background: ${palette.gray300};
      }
    }
  `}

  ${props => props.Primary && !props.Fill && css`
    color: ${palette.primary};
    border: 1px solid ${palette.primary};
    background: ${palette.white};

    &:disabled {
      border: none;
    }

    &:hover {
      background-color: rgba(34, 111, 255, 0.1);
    }
  `}

  ${props => props.Error && css`
    color: ${palette.error};
    border: 1px solid ${palette.error};
    background: ${palette.white};

    &:hover {
      background: rgba(255, 47, 62, 0.10);

      // &:disabled {
      //   background: ${palette.white};
      // }
    }

    // &:disabled {
    //   cursor: not-allowed;
    // }
  `}

  ${props => props.Edit && css`
    color: ${palette.gray500};
    border: 1px solid ${palette.gray500};
    background: ${palette.white};

    &:hover {
      background: ${palette.gray50};

      // &:disabled {
      //   background: ${palette.white};
      // }
    }

    // &:disabled {
    //   color: ${palette.white};
    //   border: none;
    //   // border: 1px solid ${palette.gray300};
    //   background: ${palette.gray300};

    //   &:hover {
    //     background: ${palette.gray300};
    //   }
    // }
  `}

  ${props => props.Outline && css`
    color: ${palette.gray700};
    border: 1px solid ${palette.outlineGray};
    background: ${palette.white};
    padding: ${props.DbExLarge ? '11px 15px' : props.padding};

    &:hover {
      background: ${palette.gray200};
    }
  `}

  ${props => props.Outline && props.Fill && css`
    color: ${palette.gray700};
    border: 1px solid ${palette.outlineGray};
    background: ${palette.chatGray};

    &:hover {
      background: ${palette.chatGray};

      // &:disabled {
      //   background: ${palette.chatGray};
      // }
    }

    // &:disabled {
    //   cursor: not-allowed;
    // }
  `}

  ${props => props.View && css`
    font-weight: 500;
    color: ${palette.gray500};
    border: 0;
    background: ${palette.chatGray};
  `}

  ${props => props.More && css`
    justify-content: flex-start;
    width: 100%;
    font-weight: 500;
    color: ${palette.gray500};
    border: 1px solid ${palette.outlineGray};
    background: ${palette.chatGray};

    &:disabled {
      background: ${palette.chatGray};
    }
  `}

  ${props => props.None && css`
    justify-content: flex-start;
    width: 100%;
    border: 0;
    background: transparent;

    &:disabled {
      background: transparent;
    }
  `}

`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const EditButtonGroup = styled(ButtonGroup)`
  justify-content: end;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: "Pretendard", "Poppins";
  font-size: 0.75rem;
  color: ${palette.primary};
  padding: 4px 8px;
  border: none;
  background: none;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }
`;

