import styled, { css, createGlobalStyle } from "styled-components";
import { palette } from "./Palette";
import { Body1, Body2, Body3 } from "./Typography";
import images from "./Images";
import { Caption2 } from "./Typography";

export const ContentsWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  gap: ${(props) => (props.isMobile ? "20px" : "40px")};
  padding: ${(props) => (props.isMobile ? "20px" : "0 4px 0 0")};
  min-height: 100vh;
  // overflow: ${({ noScroll }) => (noScroll ? "hidden" : "auto")};
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: ${(props) => {
    if (props.row) return `row`;
    else return `column`;
  }};
  // gap: 32px;
  gap: ${(props) => {
    if (props.row) return `16px`;
    else return `32px`;
  }};
  width: 100%;
`;

export const MainContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: ${(props) =>
    props.Wide
      ? "1024px"
      : props.Wide1030
      ? "1030px"
      : props.Wide1240
      ? "1240px"
      : "820px"};
  // max-width: 1024px;
  // min-height: 100vh;
  width: 100%;
  justify-content: flex-start;
  padding: 57px 0 40px;
  margin: 0 auto;
  // padding: ${(props) => (props.isMobile ? "0" : "0 20px")};
`;

export const AnalysisWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 16px;
  margin-top: 44px;
  overflow: visible;
`;

export const MainSection = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${(props) => {
    if (props.Column) return `column`;
    else return `row`;
  }};
  align-items: ${(props) => {
    if (props.Column) return `flex-start`;
    else return `center`;
  }};
  gap: ${(props) => {
    if (props.Column) return `8px`;
    else return `0`;
  }};
  width: 100%;

  h3 {
    font-weight: 500;
    color: ${palette.gray800};
  }

  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 0.88rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray500};

    span {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      color: ${palette.primary};
      cursor: pointer;
    }
  }

  .required {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 4px;
    font-size: 1rem;

    &:after {
      content: "*";
      color: ${palette.red};
    }
  }
`;

export const PopupTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  color: ${palette.gray700};
`;

export const PopupTitle2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  color: ${palette.gray700};
`;

export const PopupContent = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

export const CardWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CustomizePersona = styled.div`
  display: flex;
  flex-direction: ${(props) => {
    if (props.row) return `row`;
    else return `column`;
  }};
  flex-wrap: wrap;
  // flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  margin-top: 14px;
  margin-bottom: 100px;
`;

export const AccordionSection = styled.div`
  width: 100%;
  margin-top: 20px;
  padding-top: 40px;
  border-top: 1px solid ${palette.outlineGray};
`;

export const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1.5;
  color: ${palette.gray800};
  padding: 16px;
  background: ${palette.white};
  cursor: pointer;
`;

export const AccordionIcon = styled.span`
  width: 10px;
  height: 10px;
  border-right: 2px solid ${palette.gray800};
  border-bottom: 2px solid ${palette.gray800};
  transform: ${(props) =>
    props.$isExpanded ? "rotate(225deg)" : "rotate(45deg)"};
  transition: transform 0.5s;
`;

export const AccordionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-height: ${(props) => (props.$isExpanded ? "500px" : "0")};
  margin-top: ${(props) => (props.$isExpanded ? "20px" : "0")};
  padding-bottom: 5px;
  overflow: hidden;
  background: ${palette.white};
  transition: all 0.5s;
`;

export const CustomAccordionIcon = styled.div`
  width: 24px;
  height: 24px;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 8px;
    height: 8px;
    border-right: 2px solid ${palette.gray500};
    border-bottom: 2px solid ${palette.gray500};
    transform: translate(-50%, -50%)
      ${(props) => (props.isOpen ? "rotate(-135deg)" : "rotate(45deg)")};
    transition: transform 0.3s ease;
  }
`;

export const CustomAccordionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => (props.None ? "0" : "16px")};
  // padding: 16px;
  background: ${(props) => (props.None ? "transparent" : palette.chatGray)};
  // background: ${palette.chatGray};
  border-radius: 10px;
  cursor: pointer;
  font-size: ${(props) => (props.None ? "1rem" : "0.875rem")};
  // font-size: 0.875rem;
  color: ${(props) => (props.None ? palette.gray800 : palette.gray700)};
  // color: ${palette.gray700};
  transition: background 0.3s ease;

  &:hover {
    background: ${(props) => (props.None ? "transparent" : palette.gray100)};
    // background: ${palette.gray100};
  }
`;

export const CustomAccordionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: ${(props) => (props.None ? "0" : "20px 16px")};
  // padding: 20px 16px;
  border: 1px solid ${(props) => (props.None ? "none" : props.outlineGray)};
  // border: 1px solid ${palette.outlineGray};
  border-radius: 10px;
  margin-top: 12px;
  background: ${palette.white};
`;

export const TabWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TabButton = styled.button`
  font-family: "Pretendard", "Poppins";
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 4px 16px;
  border-radius: 50px;
  cursor: pointer;

  ${({ isActive }) =>
    isActive
      ? `
    background: rgba(34, 111, 255, 0.1);
    border: 1px solid ${palette.primary};
    color: ${palette.primary};
    font-weight: 500;
  `
      : `
    background: ${palette.chatGray};
    border: 1px solid ${palette.outlineGray};
    color: ${palette.gray500};
    font-weight: 300;
  `}
`;

export const TabButtonType2 = styled(TabButton)`
  flex: 1;
  border: 0;

  ${({ isActive }) =>
    isActive
      ? `
    background: ${palette.white};
    color: ${palette.gray800};
  `
      : `
    background: transparent;
  `}
`;

export const TabWrapType2 = styled(TabWrap)`
  gap: 4px;
  width: 100%;
  padding: 4px;
  border-radius: 20px;
  background: ${palette.chatGray};
`;

export const TabWrapType3 = styled(TabWrap)`
  gap: 16px !important;
  border-bottom: ${(props) =>
    props.Border ? `1px solid ${palette.outlineGray}` : "none"};
`;

export const TabButtonType3 = styled(TabButton)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 1rem;
  padding: 0;
  border-radius: 0;
  border: 0;
  background: transparent;
  transition: all 0.5s;

  &:after {
    height: 3px;
    background: ${palette.gray800};
    content: "";
    transition: all 0.5s;
  }

  ${({ isActive }) =>
    isActive
      ? `
        color: ${palette.gray800};
        font-weight: 500;

        &:after { 
          width: 100%;
        }
      `
      : `
        &:after {
          width: 0;
        }
      `}
`;

export const TabWrapType4 = styled(TabWrap)`
  gap: 16px !important;
`;

export const TabButtonType4Main = styled(TabButton)`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid ${palette.outlineGray};
  cursor: pointer;

  ${({ isActive }) =>
    isActive
      ? `
      background: ${palette.chatGray};
    `
      : `
      background: ${palette.white};
    `}
`;

export const TabButtonType4 = styled(TabButton)`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid ${palette.outlineGray};
  cursor: pointer;

  ${({ active }) =>
    active
      ? `
      color: ${palette.gray700};
      background: ${palette.chatGray};
    `
      : `
      background: ${palette.white};
    `}
`;

export const TabWrapType5 = styled(TabWrap)`
  justify-content: center;
  gap: 0;
`;

export const TabButtonType5 = styled(TabButton)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0;
  border-radius: 0;
  border: 0;
  background: transparent;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  + button {
    padding-left: 80px;

    &:before {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 1px;
      background: ${palette.gray300};
      content: "";
    }

    &:after {
      position: absolute;
      left: 55px;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
      width: 7px;
      height: 7px;
      border-top: 1px solid ${palette.gray300};
      border-right: 1px solid ${palette.gray300};
      content: "";
    }
  }

  span {
    font-size: 1rem;
    font-weight: 400;
    color: ${palette.gray500};
    line-height: 1.55;
    letter-spacing: -0.48px;
    padding: 8px 16px;
    border-radius: 20px;
    background: ${palette.gray200};
  }

  .text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${palette.gray700};

    > * {
      line-height: 1.45;
    }
  }

  ${({ Num3 }) =>
    Num3 &&
    css`
      + button {
        padding-left: 150px;

        &:before {
          left: 40px;
          width: 64px;
        }

        &:after {
          left: 95px;
        }
      }
    `}

  ${({ isActive }) =>
    isActive &&
    css`
      span {
        color: ${palette.gray800};
        background: ${palette.primary};
        color: ${palette.white};
      }

      .text {
        color: ${palette.gray800};
      }
    `}
`;

export const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
  height: ${(props) => (props.Daily ? "175px" : "275px")};
  overflow-y: auto;
`;

export const TabContent5 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => (props.Small ? "16px" : "64px")};
  width: 100%;
  max-width: ${(props) => (props.Small ? "820px" : "100%")};
  margin: 0 auto;
  margin-bottom: 320px;

  .title {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 40px;
    max-width: 820px;
    width: 100%;
    margin: 0 auto;
  }
`;

export const TabContent5Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  padding-bottom: ${(props) => (props.borderBottom ? "40px" : "0")};
  border-bottom: ${(props) =>
    props.borderBottom ? `1px solid ${palette.gray200}` : "none"};

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
`;

export const Status = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px !important;
  min-width: 55px;
  // max-width: 55px;
  // width: 100%;
  font-size: 0.75rem;
  line-height: 1.5;
  color: ${(props) =>
    props.status === "Ing"
      ? palette.primary
      : props.status === "Complete"
      ? palette.green
      : props.status === "Pre"
      ? palette.gray700
      : palette.gray700};
  // margin-left: auto;
  padding: ${(props) =>
    props.status === "Ing"
      ? `2px 8px`
      : props.status === "Complete"
      ? `2px 8px`
      : props.status === "Pre"
      ? `2px 8px`
      : `4px 8px`};
  border-radius: 2px;
  border: ${(props) =>
    props.status === "Ing"
      ? `1px solid ${palette.primary}`
      : props.status === "Complete"
      ? `1px solid ${palette.green}`
      : `1px solid ${palette.outlineGray}`};
  background: ${(props) =>
    props.status === "Ing"
      ? `rgba(34, 111, 255, 0.04)`
      : props.status === "Complete"
      ? palette.white
      : props.status === "Pre"
      ? palette.chatGray
      : palette.white};

  ${(props) =>
    props.status === "Pre" &&
    css`
      &:after {
        flex-shrink: 0;
        content: "준비 중";
      }
    `}

  ${(props) =>
    props.status === "Ing" &&
    css`
      &:after {
        flex-shrink: 0;
        content: "진행 중";
      }
    `}

  ${(props) =>
    props.status === "Complete" &&
    css`
      &:before {
        content: "";
        width: 8px;
        height: 8px;
        background: url(${images.CheckGreen}) center no-repeat;
      }
      &:after {
        flex-shrink: 0;
        content: "완료";
      }
    `}
`;

export const Keyword = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => (props.Ing ? "9px !important" : "4px !important")};
  min-height: 25px;
  font-weight: 400 !important;
  font-size: ${(props) =>
    props.Basic ||
    props.Custom ||
    props.New ||
    props.Keyword ||
    props.None ||
    props.classBasic
      ? "0.75rem"
      : "0.63rem"};
  color: ${(props) =>
    props.Basic
      ? palette.green
      : props.Custom
      ? palette.primary
      : props.Complete
      ? palette.green
      : props.Request
      ? palette.gray500
      : props.classBasic
      ? palette.primary
      : props.New
      ? palette.green
      : props.Ing
      ? palette.primary
      : props.Check
      ? palette.gray700
      : props.UniqueHaker
      ? "#E90102"
      : props.UniqueLead
      ? "#20B1EA"
      : props.UniqueSuper
      ? "#5471AB"
      : props.UniqueEarly
      ? "#8B61D1"
      : props.UniqueInnovator
      ? "#FC6602"
      : props.UniqueCreative
      ? "#6CB42D"
      : props.UniqueNon
      ? "#B1A098"
      : props.UniqueCritic
      ? "#FFBB52"
      : palette.gray500};
  line-height: ${(props) => (props.classBasic || props.New ? "1.5" : "1.2")};
  padding: ${(props) =>
    props.Keyword
      ? "4px 10px"
      : props.None
      ? "0"
      : props.New
      ? "2px 10px"
      : props.Ing
      ? "2px 10px 2px 15px"
      : props.Check
      ? "2px 10px 2px 15px"
      : "4px 8px"};
  border-radius: ${(props) => (props.classBasic ? "5px" : "50px")};
  border: ${(props) =>
    props.Basic
      ? `1px solid rgba(52, 199, 89, 0.10)`
      : props.Custom
      ? `1px solid rgba(34, 111, 255, 0.10)`
      : props.None || props.Keyword || props.classBasic
      ? `none`
      : props.Complete
      ? `1px solid ${palette.green}`
      : props.Request
      ? `1px solid ${palette.outlineGray}`
      : props.Ing
      ? `1px solid rgba(34, 111, 255, 0.50)`
      : props.Check
      ? `1px solid ${palette.gray300}`
      : props.UniqueHaker
      ? `1px solid #E90102`
      : props.UniqueLead
      ? `1px solid #20B1EA`
      : props.UniqueSuper
      ? `1px solid #5471AB`
      : props.UniqueEarly
      ? `1px solid #8B61D1`
      : props.UniqueInnovator
      ? `1px solid #FC6602`
      : props.UniqueCreative
      ? `1px solid #6CB42D`
      : props.UniqueNon
      ? `1px solid #B1A098`
      : props.UniqueCritic
      ? `1px solid #FFBB52`
      : props.Saas
      ? `1px solid ${palette.gray500}`
      : palette.gray200};
  background: ${(props) =>
    props.Basic
      ? `rgba(52, 199, 89, 0.10)`
      : props.Custom
      ? `rgba(34, 111, 255, 0.10)`
      : props.Keyword
      ? palette.chatGray
      : props.classBasic
      ? `#F0F4FF`
      : props.New
      ? `rgba(52, 199, 89, 0.06)`
      : props.Ing
      ? `rgba(34, 111, 255, 0.04)`
      : props.Check
      ? `rgba(185, 185, 185, 0.04)`
      : props.UniqueHaker
      ? `#FEF0F0`
      : props.UniqueLead
      ? `#F2FBFE`
      : props.UniqueSuper
      ? `#F5F7FA`
      : props.UniqueEarly
      ? `#F8F6FD`
      : props.UniqueInnovator
      ? `#FFF6F0`
      : props.UniqueCreative
      ? `#F2FAEB`
      : props.UniqueNon
      ? `#FBFAF9`
      : props.UniqueCritic
      ? `#FFFBF5`
      : palette.white};

  ${(props) =>
    props.Ing &&
    css`
      &:before {
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background: ${palette.primary};
        box-shadow: -4px 0 ${palette.primary}, 4px 0 ${palette.primary};
        content: "";
      }
    `}

  ${(props) =>
    props.Check &&
    css`
      &:before {
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background: ${palette.gray700};
        box-shadow: -4px 0 ${palette.gray700}, 4px 0 ${palette.gray700};
        content: "";
      }
    `}
`;

export const CreditBadge = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 4px;
  max-width: 102px;
  color: ${(props) =>
    props.General
      ? `#FFC300`
      : props.Subscription
      ? `#34C759`
      : props.Event
      ? `#FF5322`
      : palette.gray500};
  padding: 4px 8px;
  border-radius: 5px;
  background: ${(props) =>
    props.General
      ? `#FFF0C0`
      : props.Subscription
      ? `#C7F2D2`
      : props.Event
      ? `#FDEBE7`
      : palette.white};

  span {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${palette.white};
  }
`;

export const Tag = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 4px 12px;
  border-radius: 15px;

  &::before {
    content: "${(props) => {
      switch (props.color) {
        case "Red":
          return "광고, 마케팅";
        case "LavenderMagenta":
          return "교육";
        case "Amethyst":
          return "금융, 보험, 핀테크";
        case "VistaBlue":
          return "게임";
        case "BlueYonder":
          return "모빌리티, 교통";
        case "MidnightBlue":
          return "물류";
        case "ButtonBlue":
          return "부동산, 건설";
        case "CeruleanFrost":
          return "뷰티, 화장품";
        case "MiddleBlueGreen":
          return "AI, 딥테크, 블록체인";
        case "GreenSheen":
          return "소셜미디어, 커뮤니티";
        case "TropicalRainForest":
          return "여행, 레저";
        case "DollarBill":
          return "유아, 출산";
        case "Olivine":
          return "인사, 비즈니스";
        case "ChineseGreen":
          return "제조, 하드웨어";
        case "Jonquil":
          return "커머스";
        case "PastelOrange":
          return "콘텐츠, 예술";
        case "Tangerine":
          return "통신, 보안, 데이터";
        case "Copper":
          return "패션";
        case "Shadow":
          return "푸드, 농업";
        case "Tuscany":
          return "환경, 에너지";
        case "VeryLightTangelo":
          return "홈리빙";
        case "Orange":
          return "헬스케어, 바이오";
        case "CarnationPink":
          return "피트니스, 스포츠";
        case "TurkishRose":
          return "법률";
        case "SuperPink":
          return "펫";
        case "NavyBlue":
          return "기타";
        default:
          return "";
      }
    }}";
  }

  ${({ color }) => {
    switch (color) {
      case "Red":
        return `
          color: #E90102;
          background: rgba(233, 1, 2, 0.06);
        `;
      case "LavenderMagenta":
        return `
          color: #ED7EED;
          background: rgba(237, 126, 237, 0.06);
        `;
      case "Amethyst":
        return `
          color: #8B61D1;
          background: rgba(139, 97, 209, 0.06);
        `;
      case "VistaBlue":
        return `
          color: #8B61D1;
          background: rgba(125, 140, 225, 0.06);
        `;
      case "BlueYonder":
        return `
          color: #8B61D1;
          background: rgba(84, 113, 171, 0.06);
        `;
      case "MidnightBlue":
        return `
          color: #03458F;
          background: rgba(3, 69, 143, 0.06);
        `;
      case "ButtonBlue":
        return `
          color: #20B1EA;
          background: rgba(32, 177, 234, 0.06);
        `;
      case "CeruleanFrost":
        return `
          color: #5E9EBF;
          background: rgba(94, 158, 191, 0.06);
        `;
      case "MiddleBlueGreen":
        return `
          color: #7DCED2;
          background: rgba(125, 206, 210, 0.06);
        `;
      case "GreenSheen":
        return `
          color: #74B49C;
          background: rgba(116, 180, 156, 0.06);
        `;
      case "TropicalRainForest":
        return `
          color: #027355;
          background: rgba(2, 115, 85, 0.06);
        `;
      case "DollarBill":
        return `
          color: #8DC955;
          background: rgba(141, 201, 85, 0.06);
        `;
      case "Olivine":
        return `
          color: #AABC76;
          background: rgba(170, 188, 118, 0.06);
        `;
      case "ChineseGreen":
        return `
          color: #C7D062;
          background: rgba(199, 208, 98, 0.06);
        `;
      case "Jonquil":
        return `
          color: #F7CD17;
          background: rgba(247, 205, 23, 0.06);
        `;
      case "PastelOrange":
        return `
          color: #FFBB52;
          background: rgba(255, 187, 82, 0.06);
        `;
      case "Tangerine":
        return `
          color: #F48D0B;
          background: rgba(244, 141, 11, 0.06);
        `;
      case "Copper":
        return `
          color: #BC742F;
          background: rgba(188, 116, 47, 0.06);
        `;
      case "Shadow":
        return `
          color: #8C725B;
          background: rgba(140, 114, 91, 0.06);
        `;
      case "Tuscany":
        return `
          color: #B1A098;
          background: rgba(177, 160, 152, 0.06);
        `;
      case "VeryLightTangelo":
        return `
          color: #FAAD80;
          background: rgba(250, 173, 128, 0.06);
        `;
      case "Orange":
        return `
          color: #FC6602;
          background: rgba(252, 102, 2, 0.06);
        `;
      case "CarnationPink":
        return `
          color: #FFA8B9;
          background: rgba(255, 168, 185, 0.06);
        `;
      case "TurkishRose":
        return `
          color: #B47489;
          background: rgba(180, 116, 137, 0.06);
        `;
      case "SuperPink":
        return `
          color: #D161AC;
          background: rgba(209, 97, 172, 0.06);
        `;
      case "NavyBlue":
        return `
          color: #020273;
          background: rgba(2, 2, 115, 0.06);
        `;
      default:
        return "display: none;";
    }
  }}
`;

export const ProjectTag = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.42px;
  color: ${palette.gray800};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 8px;
  border-radius: 15px;
  border: 1px solid ${palette.outlineGray};
  background: ${palette.white};

  &:before {
    content: "";
    ${(props) =>
      props.Type &&
      css`
        width: 20px;
        height: 20px;
        background-image: ${(props) => {
          switch (props.Type) {
            case "정보통신 및 기술":
              return `url(${images.ProjectInformation})`;
            case "금융 및 법률":
              return `url(${images.ProjectBanking})`;
            case "제조 및 생산":
              return `url(${images.ProjectProduction})`;
            case "건설 및 인프라":
              return `url(${images.ProjectBuild})`;
            case "의료 및 헬스케어":
              return `url(${images.ProjectMedical})`;
            case "교육 및 공공 서비스":
              return `url(${images.ProjectEducation})`;
            case "소비재 및 라이프스타일":
              return `url(${images.ProjectConsumer})`;
            case "정보통신 및 기술 (IT, 소프트웨어, 커뮤니티, 광고, 마케팅 등)":
              return `url(${images.ProjectInformation})`;
            case "금융 및 법률 (핀테크, 인사, 법률 등)":
              return `url(${images.ProjectBanking})`;
            case "제조 및 생산 (의류, 뷰티, 식음료, 환경/에너지 등)":
              return `url(${images.ProjectProduction})`;
            case "건설 및 인프라 (부동산, 모빌리티, 물류 등)":
              return `url(${images.ProjectBuild})`;
            case "의료 및 헬스케어 (헬스케어, 바이오 등)":
              return `url(${images.ProjectMedical})`;
            case "교육 및 공공 서비스 (교육, 정부 및 공공기관 등)":
              return `url(${images.ProjectEducation})`;
            case "소비재 및 라이프스타일 (커머스, 리빙, 유아, 펫, 여행, 콘텐츠, 게임 등)":
              return `url(${images.ProjectConsumer})`;
            case "기타":
              return `url(${images.ProjectEtc})`;
            default:
              return "none";
          }
        }};
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      `}

    ${(props) =>
      props.Country &&
      css`
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-image: ${(props) => {
          switch (props.Country) {
            case "대한민국":
              return `url(${images.ProjectKorea})`;
            case "미국":
              return `url(${images.ProjectUsa})`;
            case "중국":
              return `url(${images.ProjectChina})`;
            case "일본":
              return `url(${images.ProjectJapan})`;
            case "대만":
              return `url(${images.ProjectTaiwan})`;
            default:
              return "none";
          }
        }};
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      `}
  }

  &::after {
    content: "${(props) => {
      if (props.Business) {
        switch (props.Business) {
          case "B2C":
            return "B2C";
          case "B2B":
            return "B2B";
          case "B2G":
            return "B2G";
          case "B2B2C":
            return "B2B2C";
          case "B2B2B":
            return "B2B2B";
          default:
            return "";
        }
      }

      if (props.Type) {
        switch (props.Type) {
          case "정보통신 및 기술":
            return "정보통신 및 기술";
          case "금융 및 법률":
            return "금융 및 법률";
          case "제조 및 생산":
            return "제조 및 생산";
          case "건설 및 인프라":
            return "건설 및 인프라";
          case "의료 및 헬스케어":
            return "의료 및 헬스케어";
          case "교육 및 공공 서비스":
            return "교육 및 공공 서비스";
          case "소비재 및 라이프스타일":
            return "소비재 및 라이프스타일";
          case "정보통신 및 기술 (IT, 소프트웨어, 커뮤니티, 광고, 마케팅 등)":
            return "정보통신 및 기술";
          case "금융 및 법률 (핀테크, 인사, 법률 등)":
            return "금융 및 법률";
          case "제조 및 생산 (의류, 뷰티, 식음료, 환경/에너지 등)":
            return "제조 및 생산";
          case "건설 및 인프라 (부동산, 모빌리티, 물류 등)":
            return "건설 및 인프라";
          case "의료 및 헬스케어 (헬스케어, 바이오 등)":
            return "의료 및 헬스케어";
          case "교육 및 공공 서비스 (교육, 정부 및 공공기관 등)":
            return "교육 및 공공 서비스";
          case "소비재 및 라이프스타일 (커머스, 리빙, 유아, 펫, 여행, 콘텐츠, 게임 등)":
            return "소비재 및 라이프스타일";
          case "기타":
            return "기타";
          default:
            return "";
        }
      }

      if (props.Country) {
        switch (props.Country) {
          case "대한민국":
            return "대한민국";
          case "미국":
            return "미국";
          case "중국":
            return "중국";
          case "일본":
            return "일본";
          case "대만":
            return "대만";
          default:
            return "";
        }
      }

      return "";
    }}";
  }
`;

export const UniqueTag = styled.span`
  width: auto !important;
  height: auto !important;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.5;
  padding: 4px 12px !important;
  border-radius: 15px !important;

  &::before {
    content: "${(props) => {
      switch (props.color) {
        case "Hacker":
          return "Hacker";
        case "LeadUser":
          return "Lead User";
        case "SuperUser":
          return "Super User";
        case "EarlyAdopter":
          return "Early Adopter";
        case "Innovator":
          return "Innovator";
        case "CreativeAdopter":
          return "Creative Adopter";
        case "NonUser":
          return "Non User";
        case "Critic":
          return "Critic";
        case "Non-User":
          return "Non User";
        case "Lead User":
          return "Lead User";
        case "Super User":
          return "Super User";
        case "Early Adopter":
          return "Early Adopter";
        default:
          return props.color || "";
      }
    }}";
  }

  ${({ color }) => {
    switch (color) {
      case "Hacker":
        return `
          color: #E90102;
          background: #FEF0F0;
        `;
      case "LeadUser":
        return `
          color: #20B1EA;
          background: #F2FBFE;
        `;
      case "Lead User":
        return `
          color: #20B1EA;
          background: #F2FBFE;
        `;
      case "SuperUser":
        return `
          color: #5471AB;
          background: #F5F7FA;
        `;
      case "Super User":
        return `
          color: #5471AB;
          background: #F5F7FA;
        `;
      case "EarlyAdopter":
        return `
          color: #8B61D1;
          background: #F8F6FD;
        `;
      case "Early Adopter":
        return `
          color: #8B61D1;
          background: #F8F6FD;
        `;
      case "Innovator":
        return `
          color: #FC6602;
          background: #FFF6F0;
        `;
      case "CreativeAdopter":
        return `
          color: #6CB42D;
          background: #F2FAEB;
        `;
      case "Creative Adopter":
        return `
          color: #6CB42D;
          background: #F2FAEB;
        `;
      case "NonUser":
        return `
          color: #B1A098;
          background: #FBFAF9;
        `;
      case "Non-User":
        return `
          color: #B1A098;
          background: #FBFAF9;
        `;
      case "Critic":
        return `
          color: #FFBB52;
          background: #FFFBF5;
        `;
      default:
        return `
          color: ${palette.gray500};
          border: 1px solid ${palette.gray500};
          background: ${palette.white};
        `;
    }
  }}
`;

export const CategoryView = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
  background: ${palette.white};

  /* 좌측 그라데이션 */
  &:before {
    content: "";
    position: absolute;
    left: inherit;
    top: inherit;
    width: 25px;
    height: 32px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    pointer-events: none;
    opacity: ${(props) => (props.showLeftGradient ? 1 : 0)};
    transition: opacity 0.2s ease;
    z-index: 1;
  }

  /* 우측 그라데이션 */
  &:after {
    content: "";
    position: absolute;
    right: 170px;
    top: inherit;
    width: 25px;
    height: 32px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    pointer-events: none;
    opacity: ${(props) => (props.showRightGradient ? 1 : 0)};
    transition: opacity 0.2s ease;
    z-index: 1;
  }
`;

export const ChoiceWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  max-width: 640px;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;

  /* 스크롤바 숨기기 */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  /* 마우스 드래그 스크롤 가능하도록 설정 */
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

export const Choice = styled.button`
  position: relative;
  z-index: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: "Pretendard", "poppins";
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.6;
  color: ${palette.gray700};
  padding: 6px 10px;
  border-radius: 5px;
  border: 0;
  background: ${palette.chatGray};
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    &:after {
      opacity: 0.8;
    }
  }

  &:after {
    width: 10px;
    height: 10px;
    background: url(${images.CloseBlack}) center no-repeat;
    content: "";
    flex-shrink: 0;
    opacity: 0.5;
    transition: opacity 0.2s ease;
  }
`;

export const TypeMore = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;

  &:before {
    width: 1px;
    height: 32px;
    background: ${palette.outlineGray};
    content: "";
  }
`;

export const Personnel = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.6;
  color: ${palette.gray700};
  padding: 6px 7px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;

export const MoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex-shrink: 0;
  font-family: "Pretendard", "poppins";
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.5;
  color: ${palette.gray500};
  border: 0;
  background: ${palette.white};
  cursor: pointer;
`;

export const TypeList = styled.div`
  position: absolute;
  top: 55px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 32px;
  max-width: 383px;
  width: 100%;
  padding: 20px 8px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
  background: ${palette.white};
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);

  /* 애니메이션 효과 추가 */
  opacity: 0;
  transform: translateY(-10px);
  animation: slideDown 0.3s ease forwards;

  @keyframes slideDown {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const TypeItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;

  > p {
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.75rem;
    font-weight: 500;
    color: ${palette.gray700};
    line-height: 1.6;
    margin: 0 12px;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      font-size: 0.75rem;
      color: ${palette.gray500};
      border: 1px solid ${palette.outlineGray};
      border-radius: 50%;
      cursor: help;
    }

    div {
      display: none;
      position: absolute;
      top: -65px;
      left: 108px;
      width: 130px;
      text-align: left;
      padding: 8px 12px;
      border-radius: 5px;
      background: ${palette.gray800};
      z-index: 1;

      &:before {
        position: absolute;
        bottom: -10px;
        left: 10px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 5px 0px 5px;
        border-color: ${palette.gray800} transparent transparent transparent;
        content: "";
      }
    }

    span:hover + div {
      display: block;
    }
  }
`;

export const TypeItemList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;

  > li {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;

    > span {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 62px;
      font-size: 0.75rem;
      font-weight: 400;
      line-height: 1.5;
      color: ${palette.gray500};
      margin-left: auto;
      padding: 2px 4px;
      border-radius: 5px;
      background: ${palette.chatGray};
    }
  }
`;

export const TypeListItem = styled.li`
  background: ${(props) =>
    props.isSelected ? "rgba(34, 111, 255, 0.04)" : "transparent"};
  border-radius: 8px;
  padding: ${(props) => (props.isSelected ? "1px 12px" : "1px 12px")};
  transition: background-color 0.2s ease;

  /* 체크박스 스타일 수정 */
  input[type="checkbox"] {
    &:checked {
      border-color: ${palette.primary} !important;
      background-color: transparent !important;

      &:before {
        background: transparent !important;
      }
    }

    &:not(:checked) {
      border-color: ${palette.gray300} !important;
      background-color: transparent !important;
    }
  }
`;

export const BottomBar = styled.div`
  position: fixed;
  bottom: 40px;
  width: ${(props) => {
    if (props.W100) return "100%";
    if (props.Wide) return "1024px";
    if (props.Responsive) return "auto";
    return "608px";
  }};
  max-width: ${(props) => {
    if (props.W100) return "816px";
    return "608px";
  }};
  display: flex;
  justify-content: ${(props) =>
    props.Responsive ? "flex-start" : "space-between"};
  align-items: center;
  padding: ${(props) => {
    if (props.Black) return "16px 24px 16px 32px";
    if (props.Responsive) return "12px 12px 12px 24px";
    return "24px 20px";
  }};
  border-radius: ${(props) => {
    if (props.Round) return "50px";
    if (props.Black) return "15px";
    return "10px";
  }};
  border: ${(props) => {
    if (props.Black) return "none";
    if (props.Responsive) return "1px solid ${palette.outlineGray}";
    return "1px solid ${palette.outlineGray}";
  }};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  background: ${(props) => (props.Black ? palette.gray800 : palette.white)};
  z-index: 100;
  cursor: ${(props) => (props.Responsive ? "pointer" : "default")};
  overflow: hidden;

  p {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${(props) =>
      props.Black
        ? palette.white
        : props.Responsive
        ? palette.gray800
        : palette.gray500};

    span {
      font-size: 1rem;
      font-weight: 600;
      color: ${palette.primary};
    }
  }

  ${(props) =>
    props.Responsive &&
    css`
      gap: 12px;
      border: 1px solid ${palette.outlineGray};
      transition: all 0.5s;

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${palette.primary};
        transition: transform 0.3s ease;
        transform: translateX(0);
      }

      .responsive {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        transition: all 0.5s;

        ${Body2} {
          width: auto;
          height: 24px;
          transform: translateX(0);
          transition: all 0.3s ease-in-out;
          opacity: 1;
          overflow: hidden;
        }

        ${Body3} {
          width: 0;
          height: 21px;
          transform: translateX(0);
          transition: all 0.3s ease-in-out;
          opacity: 0;
          overflow: hidden;
        }
      }

      &:hover {
        max-width: 608px;
        width: 100%;

        span {
          transform: translateX(175px);
        }

        ${Body2} {
          width: 0;
          transform: translateX(-30px);
          opacity: 0;
        }

        ${Body3} {
          width: auto;
          transform: translateX(-12px);
          opacity: 1;
        }
      }
    `}
`;

export const PersonaGroup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  // margin-left: 10px;
  padding-right: 6px;
  transform: translateZ(0px);

  > div {
    margin-right: -8px;
    border: 1px solid ${palette.white};
  }

  > span {
    font-size: 0.63rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${palette.gray700};
    margin-left: 15px;
  }
`;

export const Persona = styled.div`
  flex-shrink: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => (props.Round ? "50%" : "0")};
  overflow: ${(props) => (props.Moder ? "initial" : "hidden")};

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${(props) => (props.Round ? "50%" : "0")};
  }

  &:before {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    content: "";
  }

  span {
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    padding: 2px 6px;
    border-radius: 10px;
    background: ${palette.white};
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
  }

  ${(props) => {
    switch (props.size) {
      case "Small":
        return css`
          width: 32px !important;
          min-width: 32px !important;
          height: 32px !important;
        `;
      case "Medium":
        return css`
          width: 44px !important;
          height: 44px !important;
        `;
      case "Large":
        return css`
          width: 48px !important;
          height: 48px !important;
        `;
      default:
        return css`
          width: 32px !important;
          height: 32px !important;
        `;
    }
  }}

  ${(props) => {
    switch (props.color) {
      case "Linen":
        return css`
          background: #fbeae3;
        `;
      case "Isabelline":
        return css`
          background: #f7f4ef;
        `;
      case "BrightGray":
        return css`
          background: #edecea;
        `;
      case "BrightGray2":
        return css`
          background: #eae8eb;
        `;
      case "Platinum":
        return css`
          background: #eddfde;
        `;
      case "Linen2":
        return css`
          background: #fbefe3;
        `;
      case "MistyRose":
        return css`
          background: #fce4e2;
        `;
      case "Linen3":
        return css`
          background: #fbe9e9;
        `;
      case "MistyRose2":
        return css`
          background: #f8e6e6;
        `;
      case "ParrotPink":
        return css`
          background: #ce9c9d;
        `;
      case "PastelPink":
        return css`
          background: #d5a1a3;
        `;
      case "BabyPink":
        return css`
          background: #e9bdbe;
        `;
      case "Linen4":
        return css`
          background: #faf3eb;
        `;
      case "Alabaster":
        return css`
          background: #eaeee0;
        `;
      case "SilverFoil":
        return css`
          background: #b0b0b2;
        `;
      case "Platinum2":
        return css`
          background: #e1e2e4;
        `;
      case "Gainsboro":
        return css`
          background: #dadadc;
        `;
      case "Grullo":
        return css`
          background: #b4a28a;
        `;
      case "AliceBlue":
        return css`
          background: #ecf7fb;
        `;
      case "AzureishWhite":
        return css`
          background: #d9e6ec;
        `;
      case "PastelBlue":
        return css`
          background: #a4c8d6;
        `;
      case "PewterBlue":
        return css`
          background: #7fadbc;
        `;
      case "LightBlue":
        return css`
          background: #aed9ea;
        `;
      case "ColumbiaBlue":
        return css`
          background: #c0d3d9;
        `;
      case "BrightGray3":
        return css`
          background: #efefef;
        `;
      case "WhiteCoffee":
        return css`
          background: #ecdcdc;
        `;
      case "Alabaster":
        return css`
          background: #eee8e8;
        `;
      case "DustStorm":
        return css`
          background: #e9ccc4;
        `;
      case "ChineseWhite":
        return css`
          background: #e7e7db;
        `;
      case "CookiesAndCream":
        return css`
          background: #dfd8aa;
        `;
      case "WhiteChocolate":
        return css`
          background: #f0dfd7;
        `;
      case "Platinum3":
        return css`
          background: #e3e2e0;
        `;
      case "AzureishWhite":
        return css`
          background: #dfe9eb;
        `;
      case "Alabaster2":
        return css`
          background: #f1eee9;
        `;
      case "BlackShadows":
        return css`
          background: #c2b7b1;
        `;
      case "Bone":
        return css`
          background: #e1d7cd;
        `;
      case "Gainsboro":
        return css`
          background: #d7e0e5;
        `;
      case "Crayola":
        return css`
          background: #aeb7c0;
        `;
      case "PaleSilver":
        return css`
          background: #d4c8b8;
        `;
      case "DarkVanilla":
        return css`
          background: #dbbc9d;
        `;
      case "Tan":
        return css`
          background: #cab08b;
        `;
      case "LightSilver":
        return css`
          background: #d7dbda;
        `;
      case "BrightGray4":
        return css`
          background: #e5ecf2;
        `;
      case "AzureishWhite":
        return css`
          background: #d4e2ef;
        `;
      case "LightSteelBlue":
        return css`
          background: #b6c6dd;
        `;
      case "DustStorm":
        return css`
          background: #dec8bb;
        `;
      case "DutchWhite":
        return css`
          background: #f1d5bd;
        `;
      case "Burlywood":
        return css`
          background: #e0b394;
        `;
      default:
        return css`
          background: #fff;
        `;
    }
  }}

  ${(props) => {
    switch (props.icon) {
      case "OrangeLine":
        return css`
          &:before {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='46' height='46' viewBox='0 0 46 46' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M22.7487 2.00147C22.8324 2.00049 22.9161 2 23 2C34.598 2 44 11.402 44 23C44 34.598 34.598 44 23 44C11.402 44 2 34.598 2 23C2 22.9161 2.00049 22.8324 2.00147 22.7487C2.00794 22.1965 1.5655 21.7436 1.01325 21.7371C0.461005 21.7306 0.00807655 22.1731 0.00160801 22.7253C0.000536978 22.8168 0 22.9083 0 23C0 35.7025 10.2975 46 23 46C35.7025 46 46 35.7025 46 23C46 10.2975 35.7025 0 23 0C22.9083 0 22.8168 0.000536978 22.7253 0.00160801C22.1731 0.00807655 21.7306 0.461005 21.7371 1.01325C21.7436 1.5655 22.1965 2.00794 22.7487 2.00147ZM17.8042 2.64747C18.3394 2.51127 18.6629 1.96696 18.5267 1.43174C18.3905 0.896513 17.8462 0.573043 17.311 0.709248C17.1336 0.754393 16.957 0.801599 16.7813 0.850839C16.2495 0.999857 15.9391 1.55177 16.0882 2.08357C16.2372 2.61537 16.7891 2.92568 17.3209 2.77666C17.4812 2.73173 17.6423 2.68866 17.8042 2.64747ZM12.7161 4.6859C13.1974 4.41503 13.368 3.80527 13.0972 3.32398C12.8263 2.84268 12.2165 2.67209 11.7352 2.94296C11.5761 3.03252 11.4182 3.1239 11.2614 3.2171C10.7867 3.49936 10.6307 4.113 10.913 4.58771C11.1952 5.06242 11.8089 5.21843 12.2836 4.93617C12.4267 4.85108 12.5709 4.76765 12.7161 4.6859ZM8.32857 7.97504C8.72369 7.58916 8.73117 6.95604 8.34529 6.56092C7.95942 6.16581 7.3263 6.15832 6.93118 6.5442C6.80067 6.67166 6.67166 6.80066 6.5442 6.93118C6.15832 7.32629 6.16581 7.95941 6.56092 8.34529C6.95604 8.73117 7.58916 8.72368 7.97504 8.32857C8.09148 8.20933 8.20934 8.09148 8.32857 7.97504ZM4.93617 12.2836C5.21843 11.8089 5.06242 11.1952 4.58771 10.913C4.113 10.6307 3.49936 10.7867 3.2171 11.2614C3.12391 11.4182 3.03252 11.5761 2.94296 11.7352C2.67209 12.2165 2.84268 12.8263 3.32398 13.0972C3.80527 13.368 4.41503 13.1974 4.6859 12.7161C4.76765 12.5709 4.85109 12.4267 4.93617 12.2836ZM2.77666 17.3209C2.92568 16.7891 2.61537 16.2372 2.08357 16.0882C1.55177 15.9391 0.999857 16.2495 0.85084 16.7813C0.801599 16.957 0.754393 17.1336 0.709248 17.311C0.573043 17.8462 0.896512 18.3905 1.43174 18.5267C1.96696 18.6629 2.51127 18.3394 2.64747 17.8042C2.68866 17.6423 2.73173 17.4812 2.77666 17.3209Z' fill='%23FF9500'/%3E%3C/svg%3E");
          }
        `;
      case "BlackLine":
        return css`
          &:before {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='46' height='46' viewBox='0 0 46 46' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M22.7487 2.00147C22.8324 2.00049 22.9161 2 23 2C34.598 2 44 11.402 44 23C44 34.598 34.598 44 23 44C11.402 44 2 34.598 2 23C2 22.9161 2.00049 22.8324 2.00147 22.7487C2.00794 22.1965 1.5655 21.7436 1.01325 21.7371C0.461005 21.7306 0.00807655 22.1731 0.00160801 22.7253C0.000536978 22.8168 0 22.9083 0 23C0 35.7025 10.2975 46 23 46C35.7025 46 46 35.7025 46 23C46 10.2975 35.7025 0 23 0C22.9083 0 22.8168 0.000536978 22.7253 0.00160801C22.1731 0.00807655 21.7306 0.461005 21.7371 1.01325C21.7436 1.5655 22.1965 2.00794 22.7487 2.00147ZM17.8042 2.64747C18.3394 2.51127 18.6629 1.96696 18.5267 1.43174C18.3905 0.896513 17.8462 0.573043 17.311 0.709248C17.1336 0.754393 16.957 0.801599 16.7813 0.850839C16.2495 0.999857 15.9391 1.55177 16.0882 2.08357C16.2372 2.61537 16.7891 2.92568 17.3209 2.77666C17.4812 2.73173 17.6423 2.68866 17.8042 2.64747ZM12.7161 4.6859C13.1974 4.41503 13.368 3.80527 13.0972 3.32398C12.8263 2.84268 12.2165 2.67209 11.7352 2.94296C11.5761 3.03252 11.4182 3.1239 11.2614 3.2171C10.7867 3.49936 10.6307 4.113 10.913 4.58771C11.1952 5.06242 11.8089 5.21843 12.2836 4.93617C12.4267 4.85108 12.5709 4.76765 12.7161 4.6859ZM8.32857 7.97504C8.72369 7.58916 8.73117 6.95604 8.34529 6.56092C7.95942 6.16581 7.3263 6.15832 6.93118 6.5442C6.80067 6.67166 6.67166 6.80066 6.5442 6.93118C6.15832 7.32629 6.16581 7.95941 6.56092 8.34529C6.95604 8.73117 7.58916 8.72368 7.97504 8.32857C8.09148 8.20933 8.20934 8.09148 8.32857 7.97504ZM4.93617 12.2836C5.21843 11.8089 5.06242 11.1952 4.58771 10.913C4.113 10.6307 3.49936 10.7867 3.2171 11.2614C3.12391 11.4182 3.03252 11.5761 2.94296 11.7352C2.67209 12.2165 2.84268 12.8263 3.32398 13.0972C3.80527 13.368 4.41503 13.1974 4.6859 12.7161C4.76765 12.5709 4.85109 12.4267 4.93617 12.2836ZM2.77666 17.3209C2.92568 16.7891 2.61537 16.2372 2.08357 16.0882C1.55177 15.9391 0.999857 16.2495 0.85084 16.7813C0.801599 16.957 0.754393 17.1336 0.709248 17.311C0.573043 17.8462 0.896512 18.3905 1.43174 18.5267C1.96696 18.6629 2.51127 18.3394 2.64747 17.8042C2.68866 17.6423 2.73173 17.4812 2.77666 17.3209Z' fill='%23323232'/%3E%3C/svg%3E");
          }
        `;
      case "BlueLine":
        return css`
          &:before {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='46' height='46' viewBox='0 0 46 46' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M22.7487 2.00147C22.8324 2.00049 22.9161 2 23 2C34.598 2 44 11.402 44 23C44 34.598 34.598 44 23 44C11.402 44 2 34.598 2 23C2 22.9161 2.00049 22.8324 2.00147 22.7487C2.00794 22.1965 1.5655 21.7436 1.01325 21.7371C0.461005 21.7306 0.00807655 22.1731 0.00160801 22.7253C0.000536978 22.8168 0 22.9083 0 23C0 35.7025 10.2975 46 23 46C35.7025 46 46 35.7025 46 23C46 10.2975 35.7025 0 23 0C22.9083 0 22.8168 0.000536978 22.7253 0.00160801C22.1731 0.00807655 21.7306 0.461005 21.7371 1.01325C21.7436 1.5655 22.1965 2.00794 22.7487 2.00147ZM17.8042 2.64747C18.3394 2.51127 18.6629 1.96696 18.5267 1.43174C18.3905 0.896513 17.8462 0.573043 17.311 0.709248C17.1336 0.754393 16.957 0.801599 16.7813 0.850839C16.2495 0.999857 15.9391 1.55177 16.0882 2.08357C16.2372 2.61537 16.7891 2.92568 17.3209 2.77666C17.4812 2.73173 17.6423 2.68866 17.8042 2.64747ZM12.7161 4.6859C13.1974 4.41503 13.368 3.80527 13.0972 3.32398C12.8263 2.84268 12.2165 2.67209 11.7352 2.94296C11.5761 3.03252 11.4182 3.1239 11.2614 3.2171C10.7867 3.49936 10.6307 4.113 10.913 4.58771C11.1952 5.06242 11.8089 5.21843 12.2836 4.93617C12.4267 4.85108 12.5709 4.76765 12.7161 4.6859ZM8.32857 7.97504C8.72369 7.58916 8.73117 6.95604 8.34529 6.56092C7.95942 6.16581 7.3263 6.15832 6.93118 6.5442C6.80067 6.67166 6.67166 6.80066 6.5442 6.93118C6.15832 7.32629 6.16581 7.95941 6.56092 8.34529C6.95604 8.73117 7.58916 8.72368 7.97504 8.32857C8.09148 8.20933 8.20934 8.09148 8.32857 7.97504ZM4.93617 12.2836C5.21843 11.8089 5.06242 11.1952 4.58771 10.913C4.113 10.6307 3.49936 10.7867 3.2171 11.2614C3.12391 11.4182 3.03252 11.5761 2.94296 11.7352C2.67209 12.2165 2.84268 12.8263 3.32398 13.0972C3.80527 13.368 4.41503 13.1974 4.6859 12.7161C4.76765 12.5709 4.85109 12.4267 4.93617 12.2836ZM2.77666 17.3209C2.92568 16.7891 2.61537 16.2372 2.08357 16.0882C1.55177 15.9391 0.999857 16.2495 0.85084 16.7813C0.801599 16.957 0.754393 17.1336 0.709248 17.311C0.573043 17.8462 0.896512 18.3905 1.43174 18.5267C1.96696 18.6629 2.51127 18.3394 2.64747 17.8042C2.68866 17.6423 2.73173 17.4812 2.77666 17.3209Z' fill='%23226FFF'/%3E%3C/svg%3E");
          }
        `;
      case "OrangeBottomLikeFill":
        return css`
          &:before {
            bottom: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'%3E%3Cpath d='M8.74992 3.33333C8.97214 3.33333 9.16659 3.41667 9.33325 3.58333C9.49992 3.75 9.58325 3.94444 9.58325 4.16667V5C9.58325 5.04861 9.57811 5.10069 9.56784 5.15625C9.55756 5.21181 9.54186 5.26389 9.52075 5.3125L8.27075 8.25C8.20825 8.38889 8.10409 8.50694 7.95825 8.60417C7.81242 8.70139 7.65964 8.75 7.49992 8.75H4.16658C3.93742 8.75 3.74117 8.66847 3.57784 8.50542C3.4145 8.34236 3.33297 8.14611 3.33325 7.91667V3.67708C3.33325 3.56597 3.35575 3.46 3.40075 3.35917C3.44575 3.25833 3.50659 3.16986 3.58325 3.09375L5.84367 0.84375C5.94783 0.746528 6.07103 0.6875 6.21325 0.666666C6.35547 0.645833 6.4927 0.670138 6.62492 0.739583C6.75714 0.809027 6.85256 0.90625 6.91117 1.03125C6.96978 1.15625 6.982 1.28472 6.94784 1.41667L6.47909 3.33333H8.74992ZM1.66658 8.75C1.43742 8.75 1.24117 8.66833 1.07784 8.505C0.914501 8.34167 0.832973 8.14556 0.833252 7.91667V4.16667C0.833252 3.9375 0.91478 3.74125 1.07784 3.57792C1.24089 3.41458 1.43714 3.33306 1.66658 3.33333C1.89603 3.33361 2.09214 3.41514 2.25492 3.57792C2.4177 3.74069 2.49936 3.93694 2.49992 4.16667V7.91667C2.49992 8.14583 2.41825 8.34194 2.25492 8.505C2.09159 8.66806 1.89547 8.74972 1.66658 8.75Z' fill='white'/%3E%3C/svg%3E")
              center no-repeat #ff9500;
          }
        `;
      case "OrangeBottomLike":
        return css`
          &:before {
            bottom: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'%3E%3Cpath d='M2.91706 8.33333L4.48372 8.725C4.54981 8.74156 4.61768 8.74996 4.68581 8.75H6.35997C6.51476 8.74999 6.66649 8.70688 6.79815 8.62548C6.92981 8.54409 7.0362 8.42763 7.10539 8.28917L8.56372 5.3725C8.62721 5.24545 8.65717 5.10428 8.65076 4.9624C8.64435 4.82052 8.60179 4.68263 8.52711 4.56182C8.45243 4.44101 8.34811 4.34129 8.22406 4.27213C8.1 4.20298 7.96033 4.16667 7.81831 4.16667H5.83331H4.99997M2.91706 8.33333L2.91664 4.58333L4.32997 2.46333C4.49539 2.21542 4.58331 1.92458 4.58331 1.62667C4.58331 1.41875 4.75206 1.25 4.96039 1.25H5.00039C5.2214 1.25 5.43336 1.3378 5.58965 1.49408C5.74593 1.65036 5.83372 1.86232 5.83372 2.08333V4.16667M2.91706 8.33333H2.08331C1.86229 8.33333 1.65033 8.24554 1.49405 8.08926C1.33777 7.93298 1.24997 7.72101 1.24997 7.5V5C1.24997 4.77899 1.33777 4.56702 1.49405 4.41074C1.65033 4.25446 1.86229 4.16667 2.08331 4.16667H3.12497' stroke='white' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
              center no-repeat #ff9500;
          }
        `;
      case "BlackBottomLikeFill":
        return css`
          &:before {
            bottom: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'%3E%3Cpath d='M8.74992 3.33333C8.97214 3.33333 9.16659 3.41667 9.33325 3.58333C9.49992 3.75 9.58325 3.94444 9.58325 4.16667V5C9.58325 5.04861 9.57811 5.10069 9.56784 5.15625C9.55756 5.21181 9.54186 5.26389 9.52075 5.3125L8.27075 8.25C8.20825 8.38889 8.10409 8.50694 7.95825 8.60417C7.81242 8.70139 7.65964 8.75 7.49992 8.75H4.16658C3.93742 8.75 3.74117 8.66847 3.57784 8.50542C3.4145 8.34236 3.33297 8.14611 3.33325 7.91667V3.67708C3.33325 3.56597 3.35575 3.46 3.40075 3.35917C3.44575 3.25833 3.50659 3.16986 3.58325 3.09375L5.84367 0.84375C5.94783 0.746528 6.07103 0.6875 6.21325 0.666666C6.35547 0.645833 6.4927 0.670138 6.62492 0.739583C6.75714 0.809027 6.85256 0.90625 6.91117 1.03125C6.96978 1.15625 6.982 1.28472 6.94784 1.41667L6.47909 3.33333H8.74992ZM1.66658 8.75C1.43742 8.75 1.24117 8.66833 1.07784 8.505C0.914501 8.34167 0.832973 8.14556 0.833252 7.91667V4.16667C0.833252 3.9375 0.91478 3.74125 1.07784 3.57792C1.24089 3.41458 1.43714 3.33306 1.66658 3.33333C1.89603 3.33361 2.09214 3.41514 2.25492 3.57792C2.4177 3.74069 2.49936 3.93694 2.49992 4.16667V7.91667C2.49992 8.14583 2.41825 8.34194 2.25492 8.505C2.09159 8.66806 1.89547 8.74972 1.66658 8.75Z' fill='white'/%3E%3C/svg%3E")
              center no-repeat #323232;
          }
        `;
      case "BlackBottomLike":
        return css`
          &:before {
            bottom: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'%3E%3Cpath d='M2.91706 8.33333L4.48372 8.725C4.54981 8.74156 4.61768 8.74996 4.68581 8.75H6.35997C6.51476 8.74999 6.66649 8.70688 6.79815 8.62548C6.92981 8.54409 7.0362 8.42763 7.10539 8.28917L8.56372 5.3725C8.62721 5.24545 8.65717 5.10428 8.65076 4.9624C8.64435 4.82052 8.60179 4.68263 8.52711 4.56182C8.45243 4.44101 8.34811 4.34129 8.22406 4.27213C8.1 4.20298 7.96033 4.16667 7.81831 4.16667H5.83331H4.99997M2.91706 8.33333L2.91664 4.58333L4.32997 2.46333C4.49539 2.21542 4.58331 1.92458 4.58331 1.62667C4.58331 1.41875 4.75206 1.25 4.96039 1.25H5.00039C5.2214 1.25 5.43336 1.3378 5.58965 1.49408C5.74593 1.65036 5.83372 1.86232 5.83372 2.08333V4.16667M2.91706 8.33333H2.08331C1.86229 8.33333 1.65033 8.24554 1.49405 8.08926C1.33777 7.93298 1.24997 7.72101 1.24997 7.5V5C1.24997 4.77899 1.33777 4.56702 1.49405 4.41074C1.65033 4.25446 1.86229 4.16667 2.08331 4.16667H3.12497' stroke='white' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
              center no-repeat #323232;
          }
        `;
      case "BlueBottomLikeFill":
        return css`
          &:before {
            bottom: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'%3E%3Cpath d='M8.74992 3.33333C8.97214 3.33333 9.16659 3.41667 9.33325 3.58333C9.49992 3.75 9.58325 3.94444 9.58325 4.16667V5C9.58325 5.04861 9.57811 5.10069 9.56784 5.15625C9.55756 5.21181 9.54186 5.26389 9.52075 5.3125L8.27075 8.25C8.20825 8.38889 8.10409 8.50694 7.95825 8.60417C7.81242 8.70139 7.65964 8.75 7.49992 8.75H4.16658C3.93742 8.75 3.74117 8.66847 3.57784 8.50542C3.4145 8.34236 3.33297 8.14611 3.33325 7.91667V3.67708C3.33325 3.56597 3.35575 3.46 3.40075 3.35917C3.44575 3.25833 3.50659 3.16986 3.58325 3.09375L5.84367 0.84375C5.94783 0.746528 6.07103 0.6875 6.21325 0.666666C6.35547 0.645833 6.4927 0.670138 6.62492 0.739583C6.75714 0.809027 6.85256 0.90625 6.91117 1.03125C6.96978 1.15625 6.982 1.28472 6.94784 1.41667L6.47909 3.33333H8.74992ZM1.66658 8.75C1.43742 8.75 1.24117 8.66833 1.07784 8.505C0.914501 8.34167 0.832973 8.14556 0.833252 7.91667V4.16667C0.833252 3.9375 0.91478 3.74125 1.07784 3.57792C1.24089 3.41458 1.43714 3.33306 1.66658 3.33333C1.89603 3.33361 2.09214 3.41514 2.25492 3.57792C2.4177 3.74069 2.49936 3.93694 2.49992 4.16667V7.91667C2.49992 8.14583 2.41825 8.34194 2.25492 8.505C2.09159 8.66806 1.89547 8.74972 1.66658 8.75Z' fill='white'/%3E%3C/svg%3E")
              center no-repeat #226fff;
          }
        `;
      case "BlueBottomLike":
        return css`
          &:before {
            bottom: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'%3E%3Cpath d='M2.91706 8.33333L4.48372 8.725C4.54981 8.74156 4.61768 8.74996 4.68581 8.75H6.35997C6.51476 8.74999 6.66649 8.70688 6.79815 8.62548C6.92981 8.54409 7.0362 8.42763 7.10539 8.28917L8.56372 5.3725C8.62721 5.24545 8.65717 5.10428 8.65076 4.9624C8.64435 4.82052 8.60179 4.68263 8.52711 4.56182C8.45243 4.44101 8.34811 4.34129 8.22406 4.27213C8.1 4.20298 7.96033 4.16667 7.81831 4.16667H5.83331H4.99997M2.91706 8.33333L2.91664 4.58333L4.32997 2.46333C4.49539 2.21542 4.58331 1.92458 4.58331 1.62667C4.58331 1.41875 4.75206 1.25 4.96039 1.25H5.00039C5.2214 1.25 5.43336 1.3378 5.58965 1.49408C5.74593 1.65036 5.83372 1.86232 5.83372 2.08333V4.16667M2.91706 8.33333H2.08331C1.86229 8.33333 1.65033 8.24554 1.49405 8.08926C1.33777 7.93298 1.24997 7.72101 1.24997 7.5V5C1.24997 4.77899 1.33777 4.56702 1.49405 4.41074C1.65033 4.25446 1.86229 4.16667 2.08331 4.16667H3.12497' stroke='white' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
              center no-repeat #226fff;
          }
        `;
      case "OrangeTopCrownFill":
        return css`
          &:before {
            top: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'%3E%3Cpath d='M2.08351 8.33203V7.4987H7.91688V8.33203H2.08351ZM2.08351 6.8737L1.55225 3.52995C1.53836 3.52995 1.52267 3.53175 1.50517 3.53537C1.48767 3.53898 1.47211 3.54064 1.4585 3.54037C1.28489 3.54037 1.13739 3.47953 1.016 3.35787C0.894609 3.2362 0.833775 3.0887 0.833497 2.91537C0.833219 2.74203 0.894053 2.59453 1.016 2.47287C1.13794 2.3512 1.28544 2.29037 1.4585 2.29037C1.63156 2.29037 1.7792 2.3512 1.90142 2.47287C2.02364 2.59453 2.08434 2.74203 2.08351 2.91537C2.08351 2.96398 2.07823 3.00912 2.06767 3.05078C2.05712 3.09245 2.04503 3.13064 2.03142 3.16537L3.33351 3.7487L4.63561 1.96745C4.55922 1.91189 4.49672 1.83898 4.4481 1.7487C4.39949 1.65842 4.37519 1.5612 4.37519 1.45703C4.37519 1.28342 4.43602 1.13578 4.55769 1.01412C4.67936 0.892449 4.82686 0.831754 5.00019 0.832032C5.17353 0.83231 5.32117 0.893143 5.44311 1.01453C5.56506 1.13592 5.62575 1.28342 5.6252 1.45703C5.6252 1.5612 5.60089 1.65842 5.55228 1.7487C5.50367 1.83898 5.44117 1.91189 5.36478 1.96745L6.66687 3.7487L7.96896 3.16537C7.95507 3.13064 7.94285 3.09245 7.93229 3.05078C7.92174 3.00912 7.9166 2.96398 7.91688 2.91537C7.91688 2.74175 7.97771 2.59412 8.09938 2.47245C8.22105 2.35078 8.36855 2.29009 8.54188 2.29037C8.71522 2.29064 8.86286 2.35148 8.9848 2.47287C9.10675 2.59425 9.16744 2.74175 9.16689 2.91537C9.16633 3.08898 9.10564 3.23662 8.9848 3.35828C8.86397 3.47995 8.71633 3.54064 8.54188 3.54037C8.52799 3.54037 8.51244 3.5387 8.49521 3.53537C8.47799 3.53203 8.4623 3.53023 8.44813 3.52995L7.91688 6.8737H2.08351Z' fill='white'/%3E%3C/svg%3E")
              center no-repeat #ff9500;
          }
        `;
      case "OrangeTopCrown":
        return css`
          &:before {
            top: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'%3E%3Cpath d='M2.08351 8.33203V7.4987H7.91688V8.33203H2.08351ZM2.08351 6.8737L1.55225 3.52995C1.53836 3.52995 1.52267 3.53175 1.50517 3.53537C1.48767 3.53898 1.47211 3.54064 1.4585 3.54037C1.28489 3.54037 1.13739 3.47953 1.016 3.35787C0.894609 3.2362 0.833775 3.0887 0.833497 2.91537C0.833219 2.74203 0.894053 2.59453 1.016 2.47287C1.13794 2.3512 1.28544 2.29037 1.4585 2.29037C1.63156 2.29037 1.7792 2.3512 1.90142 2.47287C2.02364 2.59453 2.08434 2.74203 2.08351 2.91537C2.08351 2.96398 2.07823 3.00912 2.06767 3.05078C2.05712 3.09245 2.04503 3.13064 2.03142 3.16537L3.33351 3.7487L4.63561 1.96745C4.55922 1.91189 4.49672 1.83898 4.4481 1.7487C4.39949 1.65842 4.37519 1.5612 4.37519 1.45703C4.37519 1.28342 4.43602 1.13578 4.55769 1.01412C4.67936 0.892449 4.82686 0.831754 5.00019 0.832032C5.17353 0.83231 5.32117 0.893143 5.44311 1.01453C5.56506 1.13592 5.62575 1.28342 5.6252 1.45703C5.6252 1.5612 5.60089 1.65842 5.55228 1.7487C5.50367 1.83898 5.44117 1.91189 5.36478 1.96745L6.66687 3.7487L7.96896 3.16537C7.95507 3.13064 7.94285 3.09245 7.93229 3.05078C7.92174 3.00912 7.9166 2.96398 7.91688 2.91537C7.91688 2.74175 7.97771 2.59412 8.09938 2.47245C8.22105 2.35078 8.36855 2.29009 8.54188 2.29037C8.71522 2.29064 8.86286 2.35148 8.9848 2.47287C9.10675 2.59425 9.16744 2.74175 9.16689 2.91537C9.16633 3.08898 9.10564 3.23662 8.9848 3.35828C8.86397 3.47995 8.71633 3.54064 8.54188 3.54037C8.52799 3.54037 8.51244 3.5387 8.49521 3.53537C8.47799 3.53203 8.4623 3.53023 8.44813 3.52995L7.91688 6.8737H2.08351ZM2.79184 6.04037H7.20854L7.47937 4.30078L6.38562 4.77995L5.00019 2.8737L3.61477 4.77995L2.52101 4.30078L2.79184 6.04037Z' fill='white'/%3E%3C/svg%3E")
              center no-repeat #ff9500;
          }
        `;
      case "BlackTopCrownFill":
        return css`
          &:before {
            top: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'%3E%3Cpath d='M2.08351 8.33203V7.4987H7.91688V8.33203H2.08351ZM2.08351 6.8737L1.55225 3.52995C1.53836 3.52995 1.52267 3.53175 1.50517 3.53537C1.48767 3.53898 1.47211 3.54064 1.4585 3.54037C1.28489 3.54037 1.13739 3.47953 1.016 3.35787C0.894609 3.2362 0.833775 3.0887 0.833497 2.91537C0.833219 2.74203 0.894053 2.59453 1.016 2.47287C1.13794 2.3512 1.28544 2.29037 1.4585 2.29037C1.63156 2.29037 1.7792 2.3512 1.90142 2.47287C2.02364 2.59453 2.08434 2.74203 2.08351 2.91537C2.08351 2.96398 2.07823 3.00912 2.06767 3.05078C2.05712 3.09245 2.04503 3.13064 2.03142 3.16537L3.33351 3.7487L4.63561 1.96745C4.55922 1.91189 4.49672 1.83898 4.4481 1.7487C4.39949 1.65842 4.37519 1.5612 4.37519 1.45703C4.37519 1.28342 4.43602 1.13578 4.55769 1.01412C4.67936 0.892449 4.82686 0.831754 5.00019 0.832032C5.17353 0.83231 5.32117 0.893143 5.44311 1.01453C5.56506 1.13592 5.62575 1.28342 5.6252 1.45703C5.6252 1.5612 5.60089 1.65842 5.55228 1.7487C5.50367 1.83898 5.44117 1.91189 5.36478 1.96745L6.66687 3.7487L7.96896 3.16537C7.95507 3.13064 7.94285 3.09245 7.93229 3.05078C7.92174 3.00912 7.9166 2.96398 7.91688 2.91537C7.91688 2.74175 7.97771 2.59412 8.09938 2.47245C8.22105 2.35078 8.36855 2.29009 8.54188 2.29037C8.71522 2.29064 8.86286 2.35148 8.9848 2.47287C9.10675 2.59425 9.16744 2.74175 9.16689 2.91537C9.16633 3.08898 9.10564 3.23662 8.9848 3.35828C8.86397 3.47995 8.71633 3.54064 8.54188 3.54037C8.52799 3.54037 8.51244 3.5387 8.49521 3.53537C8.47799 3.53203 8.4623 3.53023 8.44813 3.52995L7.91688 6.8737H2.08351Z' fill='white'/%3E%3C/svg%3E")
              center no-repeat #323232;
          }
        `;
      case "BlackTopCrown":
        return css`
          &:before {
            top: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'%3E%3Cpath d='M2.08351 8.33203V7.4987H7.91688V8.33203H2.08351ZM2.08351 6.8737L1.55225 3.52995C1.53836 3.52995 1.52267 3.53175 1.50517 3.53537C1.48767 3.53898 1.47211 3.54064 1.4585 3.54037C1.28489 3.54037 1.13739 3.47953 1.016 3.35787C0.894609 3.2362 0.833775 3.0887 0.833497 2.91537C0.833219 2.74203 0.894053 2.59453 1.016 2.47287C1.13794 2.3512 1.28544 2.29037 1.4585 2.29037C1.63156 2.29037 1.7792 2.3512 1.90142 2.47287C2.02364 2.59453 2.08434 2.74203 2.08351 2.91537C2.08351 2.96398 2.07823 3.00912 2.06767 3.05078C2.05712 3.09245 2.04503 3.13064 2.03142 3.16537L3.33351 3.7487L4.63561 1.96745C4.55922 1.91189 4.49672 1.83898 4.4481 1.7487C4.39949 1.65842 4.37519 1.5612 4.37519 1.45703C4.37519 1.28342 4.43602 1.13578 4.55769 1.01412C4.67936 0.892449 4.82686 0.831754 5.00019 0.832032C5.17353 0.83231 5.32117 0.893143 5.44311 1.01453C5.56506 1.13592 5.62575 1.28342 5.6252 1.45703C5.6252 1.5612 5.60089 1.65842 5.55228 1.7487C5.50367 1.83898 5.44117 1.91189 5.36478 1.96745L6.66687 3.7487L7.96896 3.16537C7.95507 3.13064 7.94285 3.09245 7.93229 3.05078C7.92174 3.00912 7.9166 2.96398 7.91688 2.91537C7.91688 2.74175 7.97771 2.59412 8.09938 2.47245C8.22105 2.35078 8.36855 2.29009 8.54188 2.29037C8.71522 2.29064 8.86286 2.35148 8.9848 2.47287C9.10675 2.59425 9.16744 2.74175 9.16689 2.91537C9.16633 3.08898 9.10564 3.23662 8.9848 3.35828C8.86397 3.47995 8.71633 3.54064 8.54188 3.54037C8.52799 3.54037 8.51244 3.5387 8.49521 3.53537C8.47799 3.53203 8.4623 3.53023 8.44813 3.52995L7.91688 6.8737H2.08351Z' fill='white'/%3E%3C/svg%3E")
              center no-repeat #323232;
          }
        `;
      case "BlueTopCrownFill":
        return css`
          &:before {
            top: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'%3E%3Cpath d='M2.08351 8.33203V7.4987H7.91688V8.33203H2.08351ZM2.08351 6.8737L1.55225 3.52995C1.53836 3.52995 1.52267 3.53175 1.50517 3.53537C1.48767 3.53898 1.47211 3.54064 1.4585 3.54037C1.28489 3.54037 1.13739 3.47953 1.016 3.35787C0.894609 3.2362 0.833775 3.0887 0.833497 2.91537C0.833219 2.74203 0.894053 2.59453 1.016 2.47287C1.13794 2.3512 1.28544 2.29037 1.4585 2.29037C1.63156 2.29037 1.7792 2.3512 1.90142 2.47287C2.02364 2.59453 2.08434 2.74203 2.08351 2.91537C2.08351 2.96398 2.07823 3.00912 2.06767 3.05078C2.05712 3.09245 2.04503 3.13064 2.03142 3.16537L3.33351 3.7487L4.63561 1.96745C4.55922 1.91189 4.49672 1.83898 4.4481 1.7487C4.39949 1.65842 4.37519 1.5612 4.37519 1.45703C4.37519 1.28342 4.43602 1.13578 4.55769 1.01412C4.67936 0.892449 4.82686 0.831754 5.00019 0.832032C5.17353 0.83231 5.32117 0.893143 5.44311 1.01453C5.56506 1.13592 5.62575 1.28342 5.6252 1.45703C5.6252 1.5612 5.60089 1.65842 5.55228 1.7487C5.50367 1.83898 5.44117 1.91189 5.36478 1.96745L6.66687 3.7487L7.96896 3.16537C7.95507 3.13064 7.94285 3.09245 7.93229 3.05078C7.92174 3.00912 7.9166 2.96398 7.91688 2.91537C7.91688 2.74175 7.97771 2.59412 8.09938 2.47245C8.22105 2.35078 8.36855 2.29009 8.54188 2.29037C8.71522 2.29064 8.86286 2.35148 8.9848 2.47287C9.10675 2.59425 9.16744 2.74175 9.16689 2.91537C9.16633 3.08898 9.10564 3.23662 8.9848 3.35828C8.86397 3.47995 8.71633 3.54064 8.54188 3.54037C8.52799 3.54037 8.51244 3.5387 8.49521 3.53537C8.47799 3.53203 8.4623 3.53023 8.44813 3.52995L7.91688 6.8737H2.08351Z' fill='white'/%3E%3C/svg%3E")
              center no-repeat #226fff;
          }
        `;
      case "BlueTopCrown":
        return css`
          &:before {
            top: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'%3E%3Cpath d='M2.08351 8.33203V7.4987H7.91688V8.33203H2.08351ZM2.08351 6.8737L1.55225 3.52995C1.53836 3.52995 1.52267 3.53175 1.50517 3.53537C1.48767 3.53898 1.47211 3.54064 1.4585 3.54037C1.28489 3.54037 1.13739 3.47953 1.016 3.35787C0.894609 3.2362 0.833775 3.0887 0.833497 2.91537C0.833219 2.74203 0.894053 2.59453 1.016 2.47287C1.13794 2.3512 1.28544 2.29037 1.4585 2.29037C1.63156 2.29037 1.7792 2.3512 1.90142 2.47287C2.02364 2.59453 2.08434 2.74203 2.08351 2.91537C2.08351 2.96398 2.07823 3.00912 2.06767 3.05078C2.05712 3.09245 2.04503 3.13064 2.03142 3.16537L3.33351 3.7487L4.63561 1.96745C4.55922 1.91189 4.49672 1.83898 4.4481 1.7487C4.39949 1.65842 4.37519 1.5612 4.37519 1.45703C4.37519 1.28342 4.43602 1.13578 4.55769 1.01412C4.67936 0.892449 4.82686 0.831754 5.00019 0.832032C5.17353 0.83231 5.32117 0.893143 5.44311 1.01453C5.56506 1.13592 5.62575 1.28342 5.6252 1.45703C5.6252 1.5612 5.60089 1.65842 5.55228 1.7487C5.50367 1.83898 5.44117 1.91189 5.36478 1.96745L6.66687 3.7487L7.96896 3.16537C7.95507 3.13064 7.94285 3.09245 7.93229 3.05078C7.92174 3.00912 7.9166 2.96398 7.91688 2.91537C7.91688 2.74175 7.97771 2.59412 8.09938 2.47245C8.22105 2.35078 8.36855 2.29009 8.54188 2.29037C8.71522 2.29064 8.86286 2.35148 8.9848 2.47287C9.10675 2.59425 9.16744 2.74175 9.16689 2.91537C9.16633 3.08898 9.10564 3.23662 8.9848 3.35828C8.86397 3.47995 8.71633 3.54064 8.54188 3.54037C8.52799 3.54037 8.51244 3.5387 8.49521 3.53537C8.47799 3.53203 8.4623 3.53023 8.44813 3.52995L7.91688 6.8737H2.08351Z' fill='white'/%3E%3C/svg%3E")
              center no-repeat #226fff;
          }
        `;
      case "OrangeTopStarFill":
        return css`
          &:before {
            top: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='9' viewBox='0 0 8 9' fill='none'%3E%3Cpath d='M3.60373 1.2196C3.72846 0.835725 4.27154 0.835725 4.39627 1.2196L5.02902 3.16701C5.0848 3.33868 5.24479 3.45492 5.4253 3.45492H7.47291C7.87655 3.45492 8.04437 3.97142 7.71782 4.20867L6.06127 5.41223C5.91523 5.51833 5.85412 5.7064 5.9099 5.87808L6.54265 7.82548C6.66738 8.20936 6.22802 8.52858 5.90147 8.29133L4.24491 7.08777C4.09887 6.98167 3.90113 6.98167 3.75509 7.08777L2.09853 8.29133C1.77198 8.52858 1.33262 8.20936 1.45735 7.82548L2.0901 5.87808C2.14588 5.7064 2.08477 5.51833 1.93873 5.41223L0.282175 4.20867C-0.0443725 3.97142 0.123451 3.45492 0.527086 3.45492H2.5747C2.75521 3.45492 2.9152 3.33868 2.97098 3.16701L3.60373 1.2196Z' fill='white'/%3E%3C/svg%3E")
              center no-repeat #ff9500;
          }
        `;
      case "OrangeTopLeftStarFill":
        return css`
          &:before {
            top: 0;
            left: 0;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M5.02641 1.5398C5.42467 0.732825 6.5754 0.732827 6.97366 1.5398L8.07072 3.76269C8.12344 3.8695 8.22534 3.94354 8.34322 3.96067L10.7963 4.31712C11.6869 4.44653 12.0425 5.54093 11.3981 6.16907L9.62298 7.89935C9.53768 7.98249 9.49875 8.10229 9.51889 8.21969L9.93793 10.6629C10.0901 11.5498 9.1591 12.2262 8.36257 11.8074L6.16845 10.6539C6.06301 10.5985 5.93706 10.5985 5.83162 10.6539L3.63751 11.8074C2.84097 12.2262 1.91002 11.5498 2.06214 10.6629L2.48118 8.21969C2.50132 8.10229 2.46239 7.98249 2.3771 7.89935L0.602018 6.16907C-0.0423914 5.54093 0.313204 4.44653 1.20375 4.31712L3.65685 3.96067C3.77473 3.94354 3.87663 3.8695 3.92935 3.76269L5.02641 1.5398Z' fill='%23FF9500'/%3E%3C/svg%3E")
              center no-repeat #fff5e6;
          }
        `;
      case "OrangeTopStar":
        return css`
          &:before {
            top: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='9' viewBox='0 0 10 9' fill='none'%3E%3Cpath d='M4.60373 1.2196C4.72846 0.835725 5.27154 0.835725 5.39627 1.2196L6.02902 3.16701C6.0848 3.33868 6.24479 3.45492 6.4253 3.45492H8.47291C8.87655 3.45492 9.04437 3.97142 8.71782 4.20867L7.06127 5.41223C6.91523 5.51833 6.85412 5.7064 6.9099 5.87808L7.54265 7.82548C7.66738 8.20936 7.22802 8.52858 6.90147 8.29133L5.24491 7.08777C5.09887 6.98167 4.90113 6.98167 4.75509 7.08777L3.09853 8.29133C2.77198 8.52858 2.33262 8.20936 2.45735 7.82548L3.0901 5.87808C3.14588 5.7064 3.08477 5.51833 2.93873 5.41223L1.28217 4.20867C0.955628 3.97142 1.12345 3.45492 1.52709 3.45492H3.5747C3.75521 3.45492 3.9152 3.33868 3.97098 3.16701L4.60373 1.2196Z' stroke='white'/%3E%3C/svg%3E")
              center no-repeat #ff9500;
          }
        `;
      case "BlackTopStarFill":
        return css`
          &:before {
            top: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='9' viewBox='0 0 8 9' fill='none'%3E%3Cpath d='M3.60373 1.2196C3.72846 0.835725 4.27154 0.835725 4.39627 1.2196L5.02902 3.16701C5.0848 3.33868 5.24479 3.45492 5.4253 3.45492H7.47291C7.87655 3.45492 8.04437 3.97142 7.71782 4.20867L6.06127 5.41223C5.91523 5.51833 5.85412 5.7064 5.9099 5.87808L6.54265 7.82548C6.66738 8.20936 6.22802 8.52858 5.90147 8.29133L4.24491 7.08777C4.09887 6.98167 3.90113 6.98167 3.75509 7.08777L2.09853 8.29133C1.77198 8.52858 1.33262 8.20936 1.45735 7.82548L2.0901 5.87808C2.14588 5.7064 2.08477 5.51833 1.93873 5.41223L0.282175 4.20867C-0.0443725 3.97142 0.123451 3.45492 0.527086 3.45492H2.5747C2.75521 3.45492 2.9152 3.33868 2.97098 3.16701L3.60373 1.2196Z' fill='white'/%3E%3C/svg%3E")
              center no-repeat #323232;
          }
        `;
      case "BlackTopStar":
        return css`
          &:before {
            top: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='9' viewBox='0 0 10 9' fill='none'%3E%3Cpath d='M4.60373 1.2196C4.72846 0.835725 5.27154 0.835725 5.39627 1.2196L6.02902 3.16701C6.0848 3.33868 6.24479 3.45492 6.4253 3.45492H8.47291C8.87655 3.45492 9.04437 3.97142 8.71782 4.20867L7.06127 5.41223C6.91523 5.51833 6.85412 5.7064 6.9099 5.87808L7.54265 7.82548C7.66738 8.20936 7.22802 8.52858 6.90147 8.29133L5.24491 7.08777C5.09887 6.98167 4.90113 6.98167 4.75509 7.08777L3.09853 8.29133C2.77198 8.52858 2.33262 8.20936 2.45735 7.82548L3.0901 5.87808C3.14588 5.7064 3.08477 5.51833 2.93873 5.41223L1.28217 4.20867C0.955628 3.97142 1.12345 3.45492 1.52709 3.45492H3.5747C3.75521 3.45492 3.9152 3.33868 3.97098 3.16701L4.60373 1.2196Z' stroke='white'/%3E%3C/svg%3E")
              center no-repeat #323232;
          }
        `;
      case "BlueTopStarFill":
        return css`
          &:before {
            top: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='9' viewBox='0 0 8 9' fill='none'%3E%3Cpath d='M3.60373 1.2196C3.72846 0.835725 4.27154 0.835725 4.39627 1.2196L5.02902 3.16701C5.0848 3.33868 5.24479 3.45492 5.4253 3.45492H7.47291C7.87655 3.45492 8.04437 3.97142 7.71782 4.20867L6.06127 5.41223C5.91523 5.51833 5.85412 5.7064 5.9099 5.87808L6.54265 7.82548C6.66738 8.20936 6.22802 8.52858 5.90147 8.29133L4.24491 7.08777C4.09887 6.98167 3.90113 6.98167 3.75509 7.08777L2.09853 8.29133C1.77198 8.52858 1.33262 8.20936 1.45735 7.82548L2.0901 5.87808C2.14588 5.7064 2.08477 5.51833 1.93873 5.41223L0.282175 4.20867C-0.0443725 3.97142 0.123451 3.45492 0.527086 3.45492H2.5747C2.75521 3.45492 2.9152 3.33868 2.97098 3.16701L3.60373 1.2196Z' fill='white'/%3E%3C/svg%3E")
              center no-repeat #226fff;
          }
        `;
      case "BlueTopStar":
        return css`
          &:before {
            top: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='9' viewBox='0 0 10 9' fill='none'%3E%3Cpath d='M4.60373 1.2196C4.72846 0.835725 5.27154 0.835725 5.39627 1.2196L6.02902 3.16701C6.0848 3.33868 6.24479 3.45492 6.4253 3.45492H8.47291C8.87655 3.45492 9.04437 3.97142 8.71782 4.20867L7.06127 5.41223C6.91523 5.51833 6.85412 5.7064 6.9099 5.87808L7.54265 7.82548C7.66738 8.20936 7.22802 8.52858 6.90147 8.29133L5.24491 7.08777C5.09887 6.98167 4.90113 6.98167 4.75509 7.08777L3.09853 8.29133C2.77198 8.52858 2.33262 8.20936 2.45735 7.82548L3.0901 5.87808C3.14588 5.7064 3.08477 5.51833 2.93873 5.41223L1.28217 4.20867C0.955628 3.97142 1.12345 3.45492 1.52709 3.45492H3.5747C3.75521 3.45492 3.9152 3.33868 3.97098 3.16701L4.60373 1.2196Z' stroke='white'/%3E%3C/svg%3E")
              center no-repeat #226fff;
          }
        `;
      case "BgStar":
        return css`
          &:before {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 10 9' fill='none'%3E%3Cpath d='M4.60373 1.2196C4.72846 0.835725 5.27154 0.835725 5.39627 1.2196L6.02902 3.16701C6.0848 3.33868 6.24479 3.45492 6.4253 3.45492H8.47291C8.87655 3.45492 9.04437 3.97142 8.71782 4.20867L7.06127 5.41223C6.91523 5.51833 6.85412 5.7064 6.9099 5.87808L7.54265 7.82548C7.66738 8.20936 7.22802 8.52858 6.90147 8.29133L5.24491 7.08777C5.09887 6.98167 4.90113 6.98167 4.75509 7.08777L3.09853 8.29133C2.77198 8.52858 2.33262 8.20936 2.45735 7.82548L3.0901 5.87808C3.14588 5.7064 3.08477 5.51833 2.93873 5.41223L1.28217 4.20867C0.955628 3.97142 1.12345 3.45492 1.52709 3.45492H3.5747C3.75521 3.45492 3.9152 3.33868 3.97098 3.16701L4.60373 1.2196Z' stroke='white'/%3E%3C/svg%3E")
              center no-repeat rgba(34, 111, 255, 0.4);
          }
        `;
      case "LineCrown":
        return css`
          &:before {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 1px solid #fc0;
          }
          &:after {
            position: absolute;
            top: -5px;
            right: 0;
            width: 19px;
            height: 18px;
            background: url(${images.Crown3D}) center no-repeat;
            content: "";
          }
        `;
      case "StarFill":
        return css`
          &:before {
            top: -30px;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='18' viewBox='0 0 44 18' fill='none'%3E%3Cpath d='M21.366 1.95137C21.5655 1.33716 22.4345 1.33716 22.634 1.95137L23.6464 5.06721C23.7357 5.34189 23.9917 5.52786 24.2805 5.52786H27.5567C28.2025 5.52786 28.471 6.35427 27.9485 6.73388L25.298 8.65957C25.0644 8.82933 24.9666 9.13025 25.0558 9.40493L26.0682 12.5208C26.2678 13.135 25.5648 13.6457 25.0423 13.2661L22.3919 11.3404C22.1582 11.1707 21.8418 11.1707 21.6081 11.3404L18.9576 13.2661C18.4352 13.6457 17.7322 13.135 17.9318 12.5208L18.9442 9.40493C19.0334 9.13025 18.9356 8.82933 18.702 8.65957L16.0515 6.73387C15.529 6.35427 15.7975 5.52786 16.4433 5.52786H19.7195C20.0083 5.52786 20.2643 5.34189 20.3536 5.06721L21.366 1.95137Z' fill='%23FFCC00'/%3E%3Cpath d='M5.52447 7.46353C5.67415 7.00287 6.32585 7.00287 6.47553 7.46353L7.23483 9.80041C7.30176 10.0064 7.49374 10.1459 7.71036 10.1459H10.1675C10.6519 10.1459 10.8532 10.7657 10.4614 11.0504L8.47352 12.4947C8.29828 12.622 8.22495 12.8477 8.29188 13.0537L9.05118 15.3906C9.20086 15.8512 8.67362 16.2343 8.28176 15.9496L6.29389 14.5053C6.11865 14.378 5.88135 14.378 5.70611 14.5053L3.71824 15.9496C3.32638 16.2343 2.79914 15.8512 2.94882 15.3906L3.70812 13.0537C3.77505 12.8477 3.70172 12.622 3.52648 12.4947L1.53861 11.0504C1.14675 10.7657 1.34814 10.1459 1.8325 10.1459H4.28964C4.50626 10.1459 4.69824 10.0064 4.76517 9.80041L5.52447 7.46353Z' fill='%23FFCC00'/%3E%3Cpath d='M37.5245 7.46353C37.6741 7.00287 38.3259 7.00287 38.4755 7.46353L39.2348 9.80041C39.3018 10.0064 39.4937 10.1459 39.7104 10.1459H42.1675C42.6519 10.1459 42.8532 10.7657 42.4614 11.0504L40.4735 12.4947C40.2983 12.622 40.2249 12.8477 40.2919 13.0537L41.0512 15.3906C41.2009 15.8512 40.6736 16.2343 40.2818 15.9496L38.2939 14.5053C38.1186 14.378 37.8814 14.378 37.7061 14.5053L35.7182 15.9496C35.3264 16.2343 34.7991 15.8512 34.9488 15.3906L35.7081 13.0537C35.7751 12.8477 35.7017 12.622 35.5265 12.4947L33.5386 11.0504C33.1468 10.7657 33.3481 10.1459 33.8325 10.1459H36.2896C36.5063 10.1459 36.6982 10.0064 36.7652 9.80041L37.5245 7.46353Z' fill='%23FFCC00'/%3E%3C/svg%3E")
              center no-repeat;
          }
        `;
      case "StarFill3D":
        return css`
          &:before {
            top: -30px;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: url(${images.StarFill3D}) center no-repeat;
          }
        `;
      default:
        return css`
          &:before {
          }
        `;
    }
  }}
`;

export const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0 !important;
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};

  > div {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
    padding: 14px 16px;

    + div {
      border-top: 1px solid ${palette.outlineGray};
    }

    span {
      flex-shrink: 0;

      &.number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        font-size: 0.63rem;
        color: ${palette.white};
        margin-top: 3px;
        border-radius: 2px;
        background: ${palette.primary};
      }
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;

      .tag {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
        width: 100%;
      }

      .ul-list {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;

        li {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 8px;

          &:before {
            content: "•";
            color: ${palette.gray700};
          }
        }
      }
    }
  }
`;

export const UlList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.Spacing ? "20px" : "0")};

  li {
    position: relative;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray700};
    padding-left: 10px;

    &:before {
      position: absolute;
      left: 0;
      top: 10px;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: ${palette.gray700};
      content: "";
    }
  }
`;

export const ListGroup = styled.div`
  display: flex;
  flex-direction: row !important;
  flex-wrap: wrap;
  gap: 20px;

  > div {
    flex: 1 1 48%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 48%;
    padding: 20px;
    border-radius: 15px;
    border: 1px solid ${palette.outlineGray};
  }
`;

export const ListBoxGroup = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.Center ? "center" : "normal")};
  justify-content: ${(props) => (props.Center ? "center" : "normal")};
  gap: ${(props) => (props.Small ? "12px" : "20px")};
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  border: ${(props) =>
    props.NoData
      ? `2px dashed ${palette.outlineGray}`
      : `1px solid ${palette.outlineGray}`};

  > div {
    width: 100%;
  }

  li {
    display: flex;
    align-items: center;

    > div:nth-child(1) {
      min-width: 110px;
      width: 100px;
    }
  }

  ${Body2} {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const CardGroupWrap = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.column || props.ideaGeneration ? "column" : "row"};
  gap: 15px !important;
  flex-wrap: ${(props) => (props.rowW50 ? "nowrap" : "wrap")};
  width: 100%;
  margin-bottom: ${(props) =>
    props.column || props.rowW50 || props.ideaGeneration ? "0" : "140px"};

  > div {
    flex: ${(props) =>
      props.column || props.ideaGeneration
        ? "1"
        : props.rowW50
        ? "1 1 50%"
        : "0 0 calc(24.8% - 10px)"};
    max-width: ${(props) =>
      props.column || props.ideaGeneration
        ? "100%"
        : props.rowW50
        ? "50%"
        : "calc(24.8% - 10px)"};
    width: 100%;
    justify-content: ${(props) =>
      props.column || props.rowW50
        ? "space-between"
        : props.ideaGeneration
        ? "left"
        : "flex-start"};
  }
`;

export const AiPersonaCardGroupWrap = styled(CardGroupWrap)`
  gap: 32px 15px !important;

  .more {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    max-width: 100%;
    margin-top: 24px;

    ${Body3} {
      cursor: pointer;
    }
  }
`;

export const ListBoxItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.FlexStart ? "flex-start" : "space-between"};
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  padding: ${(props) => (props.Small ? "12px 20px" : "24px 20px")};
  border-radius: 10px;
  border: 1px solid
    ${(props) =>
      props.NoBorder
        ? "none"
        : props.active
        ? palette.primary
        : palette.outlineGray};
  background: ${(props) =>
    props.NoBg
      ? palette.white
      : props.active && props.showQuestions
      ? palette.white
      : props.active
      ? `rgba(34, 111, 255, 0.10)`
      : palette.white};
  transition: background 0.2s ease;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  ${(props) =>
    props.FlexStart &&
    `
    justify-content: flex-start !important;
    flex-wrap: nowrap !important;
  `}
`;

export const AiPersonaCardListItem = styled(ListBoxItem)`
  flex-direction: column;
  align-items: flex-start;
  max-width: 24% !important;
  text-align: left;
  padding: 16px;

  .header {
    display: flex;
    flex-direction: column;
    // align-items: flex-start;
    align-items: ${(props) => (props.quickSurvey ? "center" : "flex-start")};
    gap: 12px;
    width: 100%;
    // border-bottom: 1px solid ${palette.outlineGray};
    border-bottom: ${(props) =>
      props.quickSurvey ? "0" : "1px solid ${palette.outlineGray}"};
  }

  .title {
    display: flex;
    flex-direction: column;
    align-items: ${(props) => (props.quickSurvey ? "center" : "flex-start")};
    gap: 4px;

    > div {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 0 6px;
      flex-wrap: wrap;
    }
  }

  .content {
    min-height: 50px;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    padding-top: 5px;
    // padding-top: 20px;
    // border-top: 1px solid ${palette.outlineGray};
  }
`;

export const AiPersonaCardButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  // gap: 12px;
  gap: 15px;
  width: 100%;
  margin-top: auto;

  > div {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }
`;

export const PercentBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: ${(props) =>
    props.primary
      ? palette.primary
      : props.green
      ? palette.green
      : palette.gray700};
  border-radius: 50%;
  background: ${(props) =>
    props.primary
      ? "rgba(34, 111, 255, 0.10)"
      : props.green
      ? "rgba(52, 199, 89, 0.10)"
      : palette.gray100};
`;

export const ListBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;

  ${(props) =>
    props.Border &&
    css`
      gap: 4px;

      > div {
        + div {
          border-top: 1px solid ${palette.outlineGray};
        }
      }
    `}
`;

export const ListBoxTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const ListBoxContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding-top: 16px;
  border-top: 1px solid ${palette.gray200};
`;

export const ListBorderItem = styled(ListBoxItem)`
  position: relative;
  padding: 12px 16px;
  border: 0;
  background: ${(props) => (props.selected ? "#EAF0FF" : palette.white)};
  transition: all 0.2s ease;

  ${({ selected, anySelected }) =>
    anySelected &&
    !selected &&
    `
    img, p, span, div {
      opacity: 0.7;
    }
  `}

  + div:before {
    position: absolute;
    top: -8px;
    left: 0;
    width: 100%;
    border-top: 1px solid ${palette.outlineGray};
    content: "";
  }
`;

export const ListText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.Small ? "4px" : "8px")};
`;

export const ListTitle = styled(Body1)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ListSubtitle = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;

  ${(props) =>
    props.TextOverflow &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      // max-height: 102px;
      height: 90px;
      overflow: hidden;
      margin-top: auto;
    `}

  p {
    font-size: 0.75rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray500};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  &:last-child {
  }
`;

export const ListButton = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`;

export const CardListItem = styled(ListBoxItem)`
  flex-direction: column;
  max-width: 262px !important;
  text-align: left;
`;

export const CardText = styled(ListText)`
  height: 230px;
`;

export const CardTitle = styled(ListTitle)`
  flex-direction: column;
  align-items: flex-start;
`;

export const CardButton = styled(ListButton)`
  width: 100%;

  > button {
    flex: 1;
  }
`;

export const ViewType = styled.div`
  display: flex;
  gap: 8px;
  padding: 7px 12px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;

export const TypeButton = styled.button`
  width: 24px;
  height: 24px;
  font-size: 0;
  border: none;
  outline: none;
  background-size: cover;

  ${(props) =>
    props.List &&
    css`
      background: ${(props) =>
        props.active
          ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M7.85962 12H19.5957' stroke='%23226FFF' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M7.52979 6H19.2659' stroke='%23226FFF' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M3.36328 12H3.52981' stroke='%23226FFF' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M3.36279 6H3.52933' stroke='%23226FFF' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M7.85962 18H19.5957' stroke='%23226FFF' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M3.36328 18H3.52981' stroke='%23226FFF' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`
          : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M7.85962 12H19.5957' stroke='%238C8C8C' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M7.52979 6H19.2659' stroke='%238C8C8C' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M3.36328 12H3.52981' stroke='%238C8C8C' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M3.36279 6H3.52933' stroke='%238C8C8C' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M7.85962 18H19.5957' stroke='%238C8C8C' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M3.36328 18H3.52981' stroke='%238C8C8C' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`};
    `}

  ${(props) =>
    props.Card &&
    css`
      background: ${(props) =>
        props.active
          ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Crect x='3.6' y='3.6' width='7.16105' height='7.16105' rx='0.793508' stroke='%23226FFF' stroke-width='1.2'/%3E%3Crect x='13.3546' y='3.6' width='7.16105' height='7.16105' rx='0.793508' stroke='%23226FFF' stroke-width='1.2'/%3E%3Crect x='3.6' y='13.3539' width='7.16105' height='7.16105' rx='0.793508' stroke='%23226FFF' stroke-width='1.2'/%3E%3Crect x='12.5724' y='17.293' width='6.46429' height='6.46429' rx='0.793508' transform='rotate(-45 12.5724 17.293)' stroke='%23226FFF' stroke-width='1.2'/%3E%3C/svg%3E")`
          : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='25' viewBox='0 0 24 25' fill='none'%3E%3Crect x='3.6' y='4.1' width='7.16105' height='7.16105' rx='0.793508' stroke='%238C8C8C' stroke-width='1.2'/%3E%3Crect x='13.3546' y='4.1' width='7.16105' height='7.16105' rx='0.793508' stroke='%238C8C8C' stroke-width='1.2'/%3E%3Crect x='3.6' y='13.8539' width='7.16105' height='7.16105' rx='0.793508' stroke='%238C8C8C' stroke-width='1.2'/%3E%3Crect x='12.5724' y='17.793' width='6.46429' height='6.46429' rx='0.793508' transform='rotate(-45 12.5724 17.793)' stroke='%238C8C8C' stroke-width='1.2'/%3E%3C/svg%3E")`};
    `}
`;

export const BoxWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.NoData ? "column" : "row")};
  align-items: ${(props) =>
    props.Column || props.NoData
      ? "center !important"
      : "flex-start !important"};
  justify-content: ${(props) => (props.NoData ? "center" : "normal")};
  gap: 20px !important;
  height: ${(props) => (props.NoData ? "200px" : "auto")};
  padding: ${(props) =>
    props.Small
      ? `20px 20px`
      : props.NoneV
      ? `20px 0 !important`
      : `20px 24px`};
  border-radius: 15px;
  border: ${(props) =>
    props.NoData
      ? `1px solid ${palette.outlineGray}`
      : props.Border
      ? `1px solid ${palette.outlineGray}`
      : `1px solid ${palette.outlineGray}`};

  ${(props) =>
    props.Hover &&
    css`
      transition: all 0.2s ease-in-out;

      &:hover {
        border-color: ${palette.primary};
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        transform: translateY(-2px);
      }
    `}

  div,
  p,
  strong {
    text-align: left;
  }

  .selectBoxWrap {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;

    > ${Body2} {
      flex-shrink: 0;
      padding-left: 20px;
    }
  }

  ${(props) =>
    props.Column &&
    css`
      flex-direction: column;
      gap: 0 !important;
    `}

  ${(props) =>
    props.Column &&
    props.Small &&
    css`
      gap: 10px !important;
    `}

  ${(props) =>
    props.Column &&
    props.NoneV &&
    css`
      gap: 10px !important;
    `}
`;

export const InterviewPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;

  > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 450px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
    padding: 32px 24px;
    border-radius: 15px;
    background: ${palette.white};
    box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.15);
  }

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 4px;
    width: 100%;

    h4 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      width: 100%;

      .close {
        position: relative;
        width: 16px;
        height: 16px;
        margin-left: auto;
        cursor: pointer;

        &:before,
        &:after {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 2px;
          height: 16px;
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
    }

    .info {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 6px;
      width: 100%;

      div {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 6px;
        font-size: 0.875rem;
        font-weight: 300;
        line-height: 1.5;
        color: ${palette.gray700};

        + div:before {
          content: "";
          display: inline-block;
          width: 1px;
          height: 9px;
          background: ${palette.gray700};
        }
      }

      &.noLine {
        div {
          + div:before {
            display: none;
          }
        }
      }
    }
  }

  .keywords {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    width: 100%;
    flex-wrap: wrap;

    span {
      font-size: 0.875rem;
      font-weight: 300;
      line-height: 1.5;
      color: ${palette.gray700};
      text-align: left;
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid ${palette.outlineGray};
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 18px;
    width: 100%;

    &.type2 {
      gap: 16px;
      padding-top: 16px;
      border-top: 1px solid ${palette.outlineGray};
    }
  }
`;

export const OCEANRangeWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  width: 100%;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
  }

  p {
    flex-shrink: 0;
  }

  ${(props) =>
    props.report &&
    css`
      p {
        flex: 1;

        &:nth-child(1) {
          text-align: left;
        }

        &:nth-child(3) {
          text-align: right;
        }
      }

      input {
        flex: 2;
      }
    `}
`;

export const RangeSlider = styled.input`
  -webkit-appearance: none;
  position: relative;
  width: 100%;
  height: 24px;
  background: transparent;
  outline: none;
  // opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: all 0.2s;

  // 트랙 스타일링
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 1px;
    background: ${palette.outlineGray};
  }

  // 중앙 구분선
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    height: 8px;
    background: ${palette.outlineGray};
  }

  // thumb 스타일링
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: ${(props) => (props.disabled ? "16px" : "24px")};
    height: ${(props) => (props.disabled ? "16px" : "24px")};
    border-radius: 50%;
    background: ${(props) =>
      props.disabled
        ? palette.primary // disabled일 때 gray300으로 변경
        : props.$ignored
        ? palette.gray500
        : palette.primary};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    transition: all 0.2s;

    // 스냅 효과
    &:active {
      transform: translateY(-50%) scale(1.1);
    }
  }

  // Firefox 지원
  &::-moz-range-track {
    width: 100%;
    height: 1px;
    background: ${palette.outlineGray};
  }

  &::-moz-range-thumb {
    width: ${(props) => (props.disabled ? "16px" : "24px")};
    height: ${(props) => (props.disabled ? "16px" : "24px")};
    border: none;
    border-radius: 50%;
    background: ${(props) =>
      props.disabled
        ? palette.primary // disabled일 때 gray300으로 변경
        : props.$ignored
        ? palette.gray500
        : palette.primary};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    transition: all 0.2s;

    &:active {
      transform: scale(1.1);
    }
  }

  // 중앙 구분선 (Firefox)
  &::-moz-range-progress {
    height: 8px;
    background: transparent;

    &::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 2px;
      height: 8px;
      background: ${palette.outlineGray};
    }
  }
`;

export const BoxListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin-top: 16px;
  margin-left: 36px;
  margin-bottom: 12px;
  padding-top: 20px;
  border-top: 1px solid ${palette.outlineGray};

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 12px;
    width: 100%;
  }
`;

export const BgBoxList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
`;

export const BgBoxItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  width: 100%;
  padding: ${(props) =>
    props.NoOutline ? "12px" : props.primaryLightest ? "20px" : "8px 12px"};
  border-radius: ${(props) => (props.primaryLightest ? "15px" : "10px")};
  border: ${(props) =>
    props.NoOutline || props.primaryLightest
      ? "0"
      : `1px solid ${palette.outlineGray}`};
  background: ${(props) =>
    props.white
      ? palette.white
      : props.primaryLightest
      ? "rgba(34, 111, 255, 0.05)"
      : palette.chatGray};
`;

export const ListRowWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 18px;
  width: 100%;
`;

export const ListRowItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;

  ${Body1} {
    flex-shrink: 0;
    max-width: 80px;
    width: 100%;
  }
`;

export const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const TextBox = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;

export const DashboardCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  width: 100%;
  padding: 24px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;

export const DashboardCardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ${Caption2} {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }
`;

export const DashboardAmount = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
`;

export const CreditDashBoardWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;
  padding-top: 20px;
  border-top: 1px solid ${palette.outlineGray};
`;

export const CreditDashBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
`;

export const CreditDashBoardItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${(props) => (props.NoLine ? "4px" : "16px")};
  width: 100%;
  padding: ${(props) => (props.NoLine ? "0" : "24px")};
  border-radius: 10px;
  border: ${(props) =>
    props.NoLine ? "0" : `1px solid ${palette.outlineGray}`};

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;

    &.yellow {
      background: #fff0c0;
    }

    &.green {
      background: #c7f2d2;
    }

    &.red {
      background: #fdebe7;
    }
  }

  ${(props) =>
    props.NoLine &&
    css`
      .icon {
        width: 20px;
        height: 20px;
      }
    `}
`;

export const CreditDashBoardList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
  height: 400px;
  margin-top: 18px;
`;

export const CreditDashBoardListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0 20px;

  p {
    flex-grow: 0.9;
    text-align: left;

    &:nth-child(2) {
      flex-grow: 4;
    }
    &:nth-child(3) {
      flex-grow: 0.8;
    }
    &:nth-child(4) {
      flex-grow: 0.5;
      text-align: right;
    }
  }
`;

export const CreditDashBoardListContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
`;

export const CreditListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
  padding: 12px 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
  }

  > * {
    flex: 1;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:nth-child(2) {
      flex-grow: 3;
    }
    &:nth-child(3) {
      flex-grow: 1;
    }
    &:nth-child(4) {
      flex-grow: 0.5;
      text-align: right;
    }
  }
`;

export const CreditTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: auto;

  div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #ffd54a;
  }
`;

export const ProjectItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
  background-color: ${palette.white};
  z-index: 1;
  transition: box-shadow 0.3s ease-in-out;

  ${({ $isOpen }) =>
    $isOpen &&
    `
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.12);
  `}
`;

export const ProjectInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  max-width: 440px;
  width: 100%;
  font-weight: 400;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;

  p {
    font-size: 0.75rem;
    font-weight: 300;
    color: ${palette.gray500};
  }
`;

export const ViewInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
  font-size: 0.875rem;
  color: ${palette.gray800};

  + div {
    padding-top: 16px;
    border-top: 1px solid ${palette.outlineGray};
  }

  .title {
    flex: 5;
    min-width: 0;
    display: flex;
    align-items: center; // flex-end에서 center로 변경
    justify-content: flex-start;
    gap: 8px;
    font-size: 0.875rem;
    color: ${palette.black};

    span {
      font-size: 0.75rem;
      font-weight: 300;
      color: ${palette.gray500};
    }
  }

  .info {
    flex: 5;
    min-width: 0; // flex-basis 오버플로우 방지
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;

    span {
      display: flex;
      align-items: center;
      gap: 4px;

      img {
        width: 14px;
        height: 14px;
      }
    }

    div {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 7px;
      font-size: 0.875rem;
      font-weight: 300;
      color: ${palette.gray500};
      line-height: 1.5;

      + div:before {
        position: absolute;
        top: 50%;
        left: -16px;
        transform: translateY(-50%);
        width: 1px;
        height: 12px;
        background-color: ${palette.outlineGray};
        content: "";
      }
    }
  }

  .button {
    flex: 2;
    min-width: 0; // flex-basis 오버플로우 방지
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    margin-right: 5px;

    button {
      font-family: "Pretendard", poppins;
      font-size: 0.75rem;
      font-weight: 300;
      padding: 6px 10px;
      border-radius: 6px;

      &.view {
        // color: ${palette.black};
        // border: 1px solid ${palette.outlineGray};
        // background: ${palette.chatGray};
      }

      &.analysis {
        // color: ${palette.primary};
        // border: 1px solid ${palette.primary};
        // background: #e9f1ff;
      }
    }
  }
`;

export const ViewInfoNodata = styled(ViewInfo)`
  justify-content: center;
  padding: 24px 0 16px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      line-height: 1.5;
      color: ${palette.gray500};

      span {
        font-size: 0.875rem;
        font-weight: 300;
        line-height: 1.5;
        color: ${palette.primary};
        padding: 6px 10px;
        border-radius: 6px;
        border: 1px solid ${palette.primary};
        background-color: #e9f1ff;
        cursor: pointer;
      }
    }
  }
`;

export const ToggleBox = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 16px;
  min-width: 240px;
  padding: 24px 20px 20px;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${palette.white};
  box-shadow: 0px 4px 28px 0px rgba(0, 0, 0, 0.05);
  z-index: 100;

  /* 애니메이션 효과 */
  animation: ${(props) => (props.$isClosing ? "slideUp" : "slideDown")} 0.3s
    ease forwards;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
`;

export const ToggleList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  > * {
    width: 100%;
    padding: 0 !important;
    transition: all 0.2s ease;

    &:hover {
      background: ${palette.chatGray};
    }
  }
`;

export const PaymentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 40px;
  width: 100%;
  margin: 50px 0;
`;

export const PaymentCard = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 16px;
  width: 100%;

  button {
    margin-top: auto;
  }
`;

export const PaymentPlan = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  width: 100%;
  padding: 32px 44px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
  background: ${palette.white};
`;

export const PaymentCredit = styled(PaymentPlan)`
  gap: 20px;
  height: 334px;
  padding: 48px 32px 32px;
  cursor: pointer;
  transition: all 0.5s;

  p {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 8px;
    font-size: 2.5rem;
    font-weight: 400;
    color: ${palette.gray700};
    line-height: 1.2;
    letter-spacing: -1.2px;
    transition: all 0.5s;

    span {
      font-size: 0.88rem;
      font-weight: 600;
      color: ${palette.gray700};
      line-height: 1.55;
      letter-spacing: -0.42px;
      margin-bottom: 7px;
      transition: all 0.5s;
    }
  }

  h6 {
    transition: all 0.5s;
  }

  svg {
    height: 32px;
    transition: all 0.5s;
  }

  &:hover {
    border-color: ${palette.primary};
    background: #f0f4ff;

    button {
      color: ${palette.white};
      background: ${palette.primary};
    }

    p,
    span,
    h6 {
      color: ${palette.primary};
    }

    svg {
      path {
        stroke: ${palette.primary}; // hover 시 stroke 색상 변경
        fill: ${palette.primary}; // hover 시 fill 색상 변경
      }
    }
  }
`;

export const PaymentPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: auto;

  button {
    border: 1px solid ${palette.primary};
  }
`;

export const PlanTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
  width: 100%;

  h1 {
    font-size: 4.5rem;
    font-weight: 400;
    color: ${palette.gray800};
    line-height: 1.2;
    letter-spacing: -2.16px;
  }

  .price {
    display: flex;
    gap: 4px;

    &:before {
      align-self: center;
      font-size: 1.5rem;
      font-weight: 600;
      color: ${palette.gray800};
      line-height: 1.3;
      letter-spacing: -0.72px;
      content: "₩";
    }

    &:after {
      align-self: flex-end;
      font-size: 1.25rem;
      font-weight: 400;
      color: ${palette.gray500};
      line-height: 1.2;
      letter-spacing: -0.6px;
      margin-bottom: 15px;
      content: "/월";
    }
  }
`;

export const PlanList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;

  li {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    text-align: left;
  }

  img {
    width: 12px;
    height: 10px;
  }
`;

export const PersonaInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  width: 100%;

  span {
    font-size: 0.88rem;
    color: ${palette.gray500};
    line-height: 1.3;
    letter-spacing: -0.42px;

    + span:before {
      display: inline-block;
      width: 1px;
      height: 9px;
      margin-right: 6px;
      background-color: ${palette.gray500};
      content: "";
    }
  }

  ${(props) =>
    props.None &&
    css`
      span {
        + span:before {
          display: none;
        }
      }
    `}
`;

export const SwitchToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  /* padding-bottom: 6px; */
`;

export const SwitchToggleItem = styled.label`
  position: relative;
  display: inline-block;
  max-width: 60px;
  width: 100%;
  height: 24px;
  padding: 2px;
  border-radius: 50px;
  cursor: pointer;

  input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;

    &:checked + span {
      background-color: ${palette.gray800};

      & + div {
        left: 34px;
        background-color: ${palette.white};
      }
    }
  }

  > span {
    position: relative;
    display: block;
    height: inherit;
    border-radius: inherit;
    background-color: #eff1f5;
    transition: all 0.5s;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.75rem;
      line-height: 1.5;
      letter-spacing: -0.36px;
      color: ${palette.gray800};
    }

    &:before {
      right: 10px;
      content: attr(data-off);
    }

    &:after {
      left: 9px;
      color: ${palette.white};
      content: attr(data-on);
    }
  }
`;

export const SwitchHandle = styled.div`
  position: absolute;
  top: 4px;
  left: 0px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${palette.white};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08) inset;
  transition: all 0.5s;
`;

export const SwitchToggleInput = styled.input`
  display: none;
`;

export const Tooltip = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 14px !important;
  width: 14px !important;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    font-size: 0.63rem;
    color: ${palette.gray500};
    line-height: 14px;
    border-radius: 50%;
    border: 0.5px solid ${palette.outlineGray};
    background-color: ${palette.chatGray};
    cursor: help;
  }

  ${Caption2} {
    position: absolute;
    bottom: 25px;
    left: -7px;
    min-width: 340px;
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease-in-out;
    z-index: 10;

    &:before {
      position: absolute;
      bottom: -10px;
      left: 10px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px 5px 0 5px;
      border-color: ${palette.gray800} transparent transparent transparent;
      content: "";
    }
  }

  &:hover ${Caption2} {
    opacity: 1;
    visibility: visible;
  }
`;

export const PaginationWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 64px;
`;

export const NumbersWrapper = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    a {
      padding: 0 9px;
      border-radius: 2px;
      cursor: pointer;

      &.active,
      &.active > * {
        color: ${palette.primary};
        background: #f0f4ff;
      }
    }
  }
`;

export const ArrowButton = styled.div`
  transform: ${(props) =>
    props.$direction === "left" ? "rotate(180deg)" : "rotate(0)"};
  cursor: pointer;
`;

export const Dots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;

export const Dot = styled.div`
  width: 3px;
  height: 3px;
  background: ${palette.gray300};
  border-radius: 50%;
`;

export const NoData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: ${(props) =>
    props.border ? "90px 0 78px" : props.Small ? "8px 0" : "72px 0"};
  border-radius: ${(props) => (props.border ? "10px" : "0")};
  border: ${(props) =>
    props.border ? `1px solid ${palette.outlineGray}` : "none"};
`;

export const CreditNoData = styled.div`
  padding-top: 16px;
  border-top: 1px solid ${palette.chatGray};
`;

export const ExploreList = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 20px 16px;
  margin-bottom: 200px;
`;

export const ExploreCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  max-width: 192px;
  width: 100%;
  height: 290px;
  padding: 30px;
  border-radius: 20px;
  background: ${palette.chatGray};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s;

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    font-size: 0.75rem;
    font-weight: 500;
    color: ${palette.gray700};
    line-height: 1.55;
    letter-spacing: -0.36px;
    margin-bottom: auto;
  }

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 97px;
    // margin-top: auto;

    img {
      padding: 10px;
    }
  }

  ${Body1} {
    margin-top: auto;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 30px 22px;
    background: rgba(50, 50, 50, 0.9);
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s;

    > span {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;
      font-size: 0.75rem;
      font-weight: 500;
      color: ${palette.white};
      line-height: 1.55;
      letter-spacing: -0.36px;
      padding: 4px 12px;
      border-radius: 5px;
      background: ${palette.primary};
    }

    .text {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: auto;

      i {
        position: relative;
        width: 64px;
        height: 12px;
        margin: 0 auto;

        &:before,
        &:after {
          position: absolute;
          right: 0;
          border-radius: 4px;
          background: ${palette.white};
          content: "";
        }

        &:before {
          bottom: 0;
          width: 100%;
          height: 2px;
        }

        &:after {
          bottom: 5px;
          right: -1px;
          transform: rotate(45deg);
          width: 14px;
          height: 2px;
        }
      }
    }
  }

  .overlayEducation {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 30px 22px;
    background: rgba(50, 50, 50, 0.9);
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s;

    > span {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;
      font-size: 0.75rem;
      font-weight: 500;
      color: ${palette.white};
      line-height: 1.55;
      letter-spacing: -0.36px;
      padding: 4px 12px;
      border-radius: 5px;
      background: ${palette.primary};
    }

    .text {
      display: flex;
      flex-direction: column;
      align-items: center; // 중앙 정렬 추가
      justify-content: center; // 중앙 정렬 추가
      gap: 12px;
      height: 100%; // 높이 100% 추가
      width: 100%; // 너비 100% 추가
      text-align: center; // 텍스트 중앙 정렬 추가
      margin-top: 0; // margin-top: auto 제거하고 0으로 설정

      // ... 기존 코드 유지 ...
    }
  }

  ${Body1} {
    margin-top: 26px;

    em {
      display: none;
    }
  }

  &:hover {
    .overlay {
      opacity: 1;
      visibility: visible;
    }
  }

  ${(props) =>
    props.AiPersona &&
    css`
      .overlay {
        > span {
          background: #af52de;
        }
      }
    `}

  ${(props) =>
    props.Research &&
    css`
      .overlay {
        > span {
          background: ${palette.green};
        }
      }
    `}

    ${(props) =>
    props.Report &&
    css`
      .overlay {
        > span {
          background: #ff9500;
        }
      }
    `}

    ${(props) =>
    props.anything &&
    css`
      .overlay {
        > span {
          background: #226fff;
        }
      }
    `}

  ${(props) =>
    props.Ready &&
    css`
      cursor: not-allowed;
      pointer-events: auto; // 마우스 오버 이벤트 허용

      ${Body1} {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        margin-top: 0;

        em {
          display: block;
          font-size: 0.75rem;
          font-weight: 500;
          font-style: normal;
          color: ${palette.gray500};
          line-height: 1.2;
          letter-spacing: -0.36px;
          padding: 4px 8px;
          border-radius: 50px;
          border: ${(props) =>
            props.children ? `1px solid ${palette.outlineGray}` : "none"};
        }
      }

      .overlay {
        opacity: 0; // 기본적으로는 숨김
        visibility: hidden;
        /* visibility: visible; */
        pointer-events: none; // 오버레이의 클릭 이벤트 차단

        em {
          color: ${palette.white};
        }

        i {
          &:before,
          &:after {
            display: none;
          }
        }
      }

      &:hover .overlay {
        opacity: 1;
        visibility: visible;
      }
    `}
    
    ${(props) =>
    props.ReadyEducation &&
    css`
      cursor: not-allowed;
      pointer-events: none; /* 모든 마우스 이벤트 차단 */
      /* pointer-events: auto; // 마우스 오버 이벤트 허용 */

      ${Body1} {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        margin-top: 0;

        em {
          display: block;
          font-size: 0.75rem;
          font-weight: 500;
          font-style: normal;
          color: ${palette.gray500};
          line-height: 1.2;
          letter-spacing: -0.36px;
          padding: 4px 8px;
          border-radius: 50px;
          border: ${(props) =>
            props.children ? `1px solid ${palette.outlineGray}` : "none"};
        }
      }

      .overlayEducation {
        opacity: 1; // 기본적으로는 숨김
        /* visibility: hidden; */
        visibility: visible;
        pointer-events: none; // 오버레이의 클릭 이벤트 차단

        em {
          color: ${palette.white};
        }

        i {
          &:before,
          &:after {
            display: none;
          }
        }
      }
    `}
`;

export const TextWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const SunburstChart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;

  svg {
    max-width: 100%;
    height: auto;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: ${(props) => (props.Round ? "10px" : "0")};
  overflow: hidden;

  th,
  td {
    padding: 16px 0;
  }
`;

export const TableHeader = styled.thead`
  th {
    padding: 16px 10px;
    word-break: keep-all;
  }

  ${(props) =>
    props.Type1 &&
    css`
      border-radius: 10px 10px 0px 0px;

      th {
        padding: 20px;
        background: ${palette.chatGray};
      }
    `}
`;

export const TableBody = styled.tbody`
  tr {
    border-top: 1px solid ${palette.outlineGray};
  }

  ${(props) =>
    props.Type1 &&
    css`
      td {
        padding: 20px;
      }
    `}

  ${(props) =>
    props.Border &&
    css`
      border-radius: 0 0 10px 10px;
      border: 1px solid ${palette.outlineGray};
      border-top: 0;

      tr {
        border-top: 0;

        + tr {
          border-top: 1px solid ${palette.outlineGray};
        }
      }
    `}
`;

export const StyledDropzone = {
  dropzone: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    width: "100%",
    border: "none",
    // borderWidth: 2,
    // borderColor: palette.outlineGray,
    // borderStyle: 'dashed',
    // borderRadius: 4,
    // padding: '20px',
    // textAlign: 'center'
  },
  inputLabel: {
    position: "relative",
    fontFamily: "Pretendard, Poppins",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    padding: "100px 0",
    borderRadius: "10px",
    border: `2px dashed ${palette.outlineGray}`,
  },
  inputLabelWithFiles: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    fontFamily: "Pretendard, Poppins",
    margin: "0 auto",
    padding: "100px 0",
    borderRadius: "10px",
    border: `2px dashed ${palette.outlineGray}`,
    background: "none",
    order: 1,
  },
  previewContainer: {
    position: "relative",
    width: "100%",
    marginBottom: "16px",
    order: 2,
  },
  preview: {
    position: "relative",
    padding: "12px",
    marginBottom: "0",
    borderRadius: "10px",
    border: `1px solid ${palette.outlineGray}`,
    background: "none",
    overflow: "hidden",
    order: 2,
  },
  submitButtonContainer: {
    width: "100%",
    margin: "0 auto",
    order: 3,
  },
  submitButton: {
    backgroundColor: palette.primary,
    fontFamily: "Pretendard, Poppins",
    color: `${palette.white}`,
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  removeButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    borderRadius: "50%",
    padding: "4px",
    width: "20px",
    height: "20px",
  },
};

export const DropzoneStyles = createGlobalStyle`
  // 드래그 앤 드롭 활성화 스타일 제거
  .dzu-dropzone {
    &.dzu-dropzoneActive {
      background-color: transparent !important;
      border-color: ${palette.outlineGray} !important;
    }
  }

  .dzu-previewContainer {
    position: relative;
    display: flex !important;
    align-items: center;
    justify-content: space-between;
    padding: 12px !important;
    margin-bottom: 8px;
    
    // 기존 이미지 숨기기
    .dzu-previewImage {
      display: none;
    }
    
    // 이미지와 PDF 파일명 스타일 통일
    .dzu-previewFileName {
      display: block;
      font-family: Pretendard, Poppins;
      font-size: 14px;
      color: ${palette.gray700};
      margin-right: auto;
    }

    // 상태 컨테이너 스타일링
    .dzu-previewStatusContainer {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    // 버튼 공통 스타일
    .dzu-previewButton {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 4px;
      margin: 0 auto;
      border: none;
      border-radius: 50%;
      background-color: #FFE8EB;
      color: white;
      cursor: pointer;
      transition: background-color 0.2s ease;

      // SVG 아이콘 스타일링
      svg {
        width: 16px;
        height: 16px;
        
        * {
          stroke: ${palette.red} !important;
          fill: ${palette.red} !important;
        }
      }

      // 추가적인 SVG 스타일 덮어쓰기
      svg path,
      svg line,
      svg polyline {
        stroke: ${palette.red} !important;
        fill: ${palette.red} !important;
      }
    }
  }

  // 프로그레스 바 스타일
  progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    background-color: ${palette.outlineGray};
    appearance: none;
    -webkit-appearance: none;
    opacity: 0.1;
    z-index: -1;

    &::-webkit-progress-bar {
      background-color: ${palette.outlineGray};
    }

    &::-webkit-progress-value {
      background-color: ${palette.primary};
      transition: width 0.3s ease;
    }

    &::-moz-progress-bar {
      background-color: ${palette.primary};
      transition: width 0.3s ease;
    }
  }

  .browse-button {
    padding: 6px 12px;
    font-family: 'Pretendard', 'Poppins';
    font-size: 0.75rem;
    font-weight: 500;
    color: ${palette.gray700};
    border: 1px solid ${palette.outlineGray};
    border-radius: 4px;
    background-color: ${palette.chatGray};
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
`;
