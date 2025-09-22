import styled, { css } from "styled-components";
import { palette } from "./Palette";

export const Title = styled.h1`
  font-weight:700;

  p {
    font-size:1.125rem;
    font-weight:400;
    color:${palette.gray};
    margin-top:5px;
  }

  ${(props) =>
    props.H1 &&
    css`
      font-size:2rem;
      margin:30px auto 40px;
    `
  }

  ${(props) =>
    props.H2 &&
    css`
      font-size:1.75rem;
      margin:30px auto;
    `
  }

  ${(props) =>
    props.H3 &&
    css`
      font-size:1.38rem;
      margin-bottom:20px;

      span {
        font-size:0.875rem;
        font-weight:400;
        display:block;
      }
    `
  }

  ${(props) =>
    props.H4 &&
    css`
      font-size:1.25rem;
      margin-bottom:30px;
    `
  }

`;

export const InfoList = styled.div`
  display:flex;
  gap:10px;
  margin-bottom:25px;

  p {
    font-size:0.875rem;
    color:${palette.navy};
    opacity:0.5;
  }

  strong {
    font-size:2rem;
    color:${palette.navy};
  }

  > div + div {
    position:relative;
    margin-left:50px;
    padding-left:50px;

    &:before {
      position:absolute;
      left:0;
      top:50%;
      transform:translateY(-50%);
      width:1px;
      height:80%;
      background:${palette.lineGray};
      content:'';
    }
  }
`;

export const ContentsWrap = styled.div`
  position:relative;
  left:320px;
  width:calc(100% - 350px);
  padding-top:80px;
  display: ${props => (props.Flex ? "flex" : "block")};
  gap: ${props => (props.Flex ? "35px" : "0")};
  overflow:hidden;
`;

export const Contents = styled.div`
  position:relative;
  max-width:1250px;
  text-align:left;
  margin:0 auto;

  ${(props) =>
    props.Flex &&
    css`
      display:flex;
      gap:30px;
      justify-content:space-between;
    `
  }
`;

export const BoxWrap = styled.div`
  padding:30px;
  margin-bottom:100px;
  border-radius:20px;
  border:1px solid ${palette.lineGray};

  ${(props) =>
    props.NoLine &&
    css`
      border:none;
      margin:0 auto;
      padding:0;
    `
  }

  ${(props) =>
    props.Flex &&
    css`
      display:flex;
      gap:30px;
    `
  }
`

export const BorderBox = styled.div`
  flex:1 1 auto;
  padding:30px;
  border-radius:10px;
  border:1px solid ${palette.lineGray};

  h3 {
    display:flex;
    align-items:center;
    gap:10px;
    font-size:1.25rem;
    font-weight:700;
    color:${palette.darkGray};
    margin-bottom:20px;
  }

  h4 {
    display:flex;
    align-items:center;
    gap:10px;
    font-weight:normal;
    margin-bottom:15px;
  }

  p {
    font-size:1.125rem;
  }

  ${(props) =>
    props.NoLine &&
    css`
      padding:0;
      border:none;
    `
  }
`;

export const TabGroup = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
  border-bottom: 1px solid ${palette.lineGray};

  > p {
    position: relative;
    font-size: 1.25rem;
    font-weight:500;
    font-weight: 500;
    color: ${(palette.lineGray)};
    padding-bottom: 12px;
    transition: all 0.5s;
    cursor: pointer;
  
    &:before {
      position: absolute;
      bottom: -1px;
      left: 50%;
      transform: translateX(-50%);
      width:0;
      height: 2px;
      background: ${palette.blue};
      transition: all 0.5s;
      content: "";
    }

    &:hover, &:active, &.on {
      font-weight:700;
      color:${palette.blue};

      &:before {
        width:100%;
      }
    }
  }
`;

export const InforList = styled.dl`
  display: flex;
  align-items: center;
  gap: 40px;

  & + & {
    margin-top: 10px;
  }

  dt {
    font-size:1.125rem;
    line-height:33px;
    display: flex;
    align-items: center;
    gap: 15px;
    min-width: 110px;

    > span {
      flex-shrink: 0;
    }
  }

  dd {font-size:1.125rem;}
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

export const SelectButton = styled.button`
  position: relative;
  width: 100%;
  font-family: Pretendard, Poppins;
  font-size: 1.313rem;
  font-weight: 700;
  text-align: left;
  padding: 20px;
  border: 1px solid ${palette.lineGray};
  border-radius: 15px;
  background: transparent;
  cursor: pointer;

  &:after {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    width: 10px;
    height: 10px;
    border-right: 2px solid ${palette.navy};
    border-bottom: 2px solid ${palette.navy};
    content: "";
  }
`;

export const Options = styled.div`
  position: absolute;
  top: 80%;
  left: 0;
  width: 100%;
  background-color: ${palette.white};
  border: 1px solid ${palette.lineGray};
  border-top: none;
  border-radius: 0 0 15px 15px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  overflow: hidden;
  z-index:1;
`;

export const Option = styled.div`
  font-size:1.125rem;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${palette.lightGray};
  }
`;

export const ReportWrap = styled.div`
  margin:0 auto;
  text-align: ${props => {
    if (props.Error) return 'center';
    else return 'left';
  }};

  > div {
    padding:20px 30px;
    border-radius:10px;
    border:1px solid ${palette.lineGray};
    background:${palette.white};

    + div {margin-top:10px;}
  }

  p {
    font-size:1.5rem;
    color:${palette.gray};
    padding-bottom:20px;
    margin-bottom:20px;
    border-bottom:1px solid ${palette.lineGray};
  }

  input[type=checkbox] + label {
    font-size:1.125rem !important;
    color:${palette.black};
  }
  
  ${(props) =>
    props.Error &&
    css`
      strong {
        font-size:1.25rem;
        display:block;
        margin-bottom:40px;
      }
      p {
        font-size:1rem;
        border-bottom:0;
      }
  `}
`;

export const Popup = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:rgba(0,0,0,.8);
  transition: all .5s;
  z-index:99;

  .textCenter {text-align:center;}

  h1 {
    font-size:1.75rem;
    margin-bottom:40px;

    span {
      display:block;
      font-size:0.875rem;
      color:${palette.blue};
      margin-bottom:5px;
    }
  }

  > div {
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    width:100%;
    max-width:860px;
    text-align:left;
    // overflow:hidden;
    border-radius:10px;
    background:${palette.white};

    > div {
      max-height:60vh;
      padding:30px;
      overflow-y:auto;
    }
  }
  
  .subTitle {
    padding:0;
    border:0;

    + .subTitle {margin-top:60px;}

    .title {
      display:flex;
      align-items:center;
      gap:10px;
      font-size:1.125rem;
      padding-bottom:10px;
      border-bottom:1px solid ${palette.gray};

      span {
        width:22px;
        height:22px;
        font-size:0.875rem;
        line-height:22px;
        display:inline-flex;
        justify-content:center;
        color:${palette.white};
        border-radius:5px;
        background:${palette.blue};
      }
    }

    .desc {
      padding-top:10px;

      p {
        font-size:1rem !important;
        color:${palette.darkGray};
        line-height:1.4;
        padding:0;
        margin:0;
        border:0;

        &.dot {
          position:relative;
          margin-left:16px;
          padding-left:8px;

          &:before {
            position:absolute;
            top:10px;
            left:0;
            width:3px;
            height:3px;
            border-radius:50%;
            background:${palette.darkGray};
            content:'';
          }
        }
      }
    }
  }

  h3 {
    font-size:1.5rem;
    // color:${palette.white};
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:15px 30px;
    border-radius:10px 10px 0 0;
    border-bottom:1px solid ${palette.lineGray};
    // background:${palette.black};

    span {
      position:relative;
      width:40px;
      height:40px;
      cursor:pointer;

      &:before, &:after {
        position:absolute;
        top:50%;
        left:50%;
        width:1px;
        height:100%;
        background:${palette.black};
        content:'';
      }  
      &:before {transform:translate(-50%, -50%) rotate(45deg);}
      &:after {transform:translate(-50%, -50%) rotate(-45deg);}
    }
  }

  h4 {
    font-size:1.5rem;
    font-weight:700;
    display:block;
  }

  ul {
    margin-bottom:40px;
  }

  li {
    display:flex;
    align-items:center;
    gap:10px;

    + li {
      margin-top:10px;
    }

    p, strong {
      font-size:1.25rem;
      font-weight:400;
      color:${palette.black};
      margin:0;
      padding:0;
    }

    strong {
      color:${palette.gray};
    }
  }
  
  ${(props) =>
    props.Error &&
    css`
      > div {
        max-width:500px;
      }
  `}
`;

export const PopupClose = styled.span`
  position:absolute;
  top:-40px;
  right:0;
  width:40px;
  height:40px;
  display:block;
  cursor:pointer;

  &:before, &:after {
    position:absolute;
    top:50%;
    left:50%;
    width:1px;
    height:100%;
    background:${palette.white};
    content:'';
  }

  &:before {transform:translate(-50%, -50%) rotate(45deg);}
  &:after {transform:translate(-50%, -50%) rotate(-45deg);}
`;

export const LoadingWrap = styled.div`
  position:relative;
  text-align:center;
  margin:100px auto;

  strong {
    display:block;
    font-size:2.25rem;
    font-weight:700;
    margin:40px auto 10px;
  }
  span {
    color:${palette.blue};
  }
  p {
    font-size:1.125rem;
    color:${palette.gray};
  }
`;
