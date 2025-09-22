import React, { useEffect, useState } from "react";
import styled, { css, ThemeProvider } from "styled-components";
import theme from "../../../../../assets/styles/Theme";
import { palette } from "../../../../../assets/styles/Palette";
import images from "../../../../../assets/styles/Images";
import { useAtom } from "jotai";
import {
  MARKETING_SELECTED_CUSTOMER,
} from "../../../../AtomStates";


const OrganismMarketingSegmentReport = ({ marketingSegmentReportCount }) => {

  
  const [marketingSelectedCustomer, ] = useAtom(MARKETING_SELECTED_CUSTOMER);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  return (
    <>
    <ThemeProvider theme={theme}>
      <Overlay isMenuOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />

      <SummaryBox>
        <h3>{marketingSelectedCustomer[marketingSegmentReportCount].content.name}에 대한 요약 </h3>
        <UlList Disc>
          <li><strong>특징 :</strong> {marketingSelectedCustomer[marketingSegmentReportCount].content.characteristic.summary}</li>
          <li><strong>시장현황 :</strong> {marketingSelectedCustomer[marketingSegmentReportCount].content.market.summary}</li>
          <li><strong>맞춤형 기능 :</strong> {marketingSelectedCustomer[marketingSegmentReportCount].content.function.summary}</li>
          <li><strong>핵심 경쟁력 :</strong> {marketingSelectedCustomer[marketingSegmentReportCount].content.competence.summary}</li>
        </UlList>
        <button onClick={() => toggleMenu()}>
          <img src={images.IconDetailView} alt="" />
          상세 내용 확인하기
        </button>
      </SummaryBox>

      <Sidebar isMenuOpen={isMenuOpen}>
        <div>
          <div className="header">
            <h5>{marketingSelectedCustomer[marketingSegmentReportCount].content.name} 상세 내용</h5>
            <button className="closePopup" onClick={() => setIsMenuOpen(false)}>닫기</button>
          </div>
          <div className="body">
            <ScrollWrap>
              <ListBox>
                <div>
                  <span>📌</span>
                  <div>
                    <strong>특징 : {marketingSelectedCustomer[marketingSegmentReportCount].content.characteristic.summary}</strong>
                    <p>{marketingSelectedCustomer[marketingSegmentReportCount].content.characteristic.description}</p>
                  </div>
                </div>
                <div>
                  <span>📈</span>
                  <div>
                    <strong>시장 현황 : {marketingSelectedCustomer[marketingSegmentReportCount].content.market.summary}</strong>
                    <p>{marketingSelectedCustomer[marketingSegmentReportCount].content.market.description}</p>
                  </div>
                </div>
                <div>
                  <span>⚙</span>
                  <div>
                    <strong>맞춤형 기능 : {marketingSelectedCustomer[marketingSegmentReportCount].content.function.summary}</strong>
                    <p>{marketingSelectedCustomer[marketingSegmentReportCount].content.function.description}</p>
                  </div>
                </div>
                <div>
                  <span>🔑</span>
                  <div>
                    <strong>핵심 경쟁력 : {marketingSelectedCustomer[marketingSegmentReportCount].content.competence.summary}</strong>
                    <p>{marketingSelectedCustomer[marketingSegmentReportCount].content.competence.description}</p>
                  </div>
                </div>
              </ListBox>
            </ScrollWrap>
          </div>
        </div>
      </Sidebar>
    </ThemeProvider>
    </>
  );
};

export default OrganismMarketingSegmentReport;

const SummaryBox = styled.div`
  display:flex;
  flex-direction:column;
  gap:12px;
  max-width:825px;
  width:fit-content;
  text-align:left;
  padding:20px;
  border-radius:20px;
  background:${palette.chatGray};
  margin:12px 0 0 50px;

  h2 {
    font-size:1.5rem;
    font-weight:600;
    line-height:1.3;
    color:${palette.gray800};

    p {
      font-size:1rem;
      font-weight:300;
      line-height:1.5;
      color:${palette.gray800};
      margin-top:16px;
    }
  }

  h3 {
    font-size:1rem;
    font-weight:500;
    color:${palette.gray800};
    line-height:1.6;
  }

  > span {
    display:flex;
    align-items:center;
    gap:4px;
    font-size:0.75rem;
    color:${palette.gray500};
    margin-top:4px;
  }

  button {
    display:flex;
    align-items:center;
    gap:5px;
    font-family: 'Pretendard', 'Poppins';
    font-size:0.75rem;
    color:${palette.gray500};
    padding:6px 0;
    margin-top:5px;
    border:0;
    background:none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin:12px 0 0;
  }
`;

const UlList = styled.ul`
display:flex;
flex-direction:column;
// gap:8px;

li {
  position:relative;
  font-weight:300;
  color:${palette.gray800};
  line-height:1.5;
  padding-left:26px;
}

${props =>
  props.Disc &&
  css`
    li {
      &:before {
        position:absolute;
        left:8px;
        top:8px;
        width:3px;
        height:3px;
        display:inline-block;
        border-radius:10px;
        background:${palette.gray800};
        content:'';
      }
    }
  `
}

${props =>
  props.Number &&
  css`
    counter-reset: list-counter;

    li {
      counter-increment: list-counter;

      &:before {
        position:absolute;
        left:0;
        top:0;
        width:18px;
        height:18px;
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:0.69rem;
        font-weight:600;
        text-align:center;
        border-radius:50px;
        border:1px solid ${palette.gray800};
        content:counter(list-counter);
      }
    }
  `
}

strong {
  font-weight:500;
}
`;

const Sidebar = styled.div`
// position:absolute;
// top: 0;
// right: ${({ isMenuOpen }) => (isMenuOpen ? '0' : '-800px')};
// height: 100%;
// max-width: 800px;
// width:100%;

max-width: ${({ isMenuOpen }) => (isMenuOpen ? '800px' : '0')};
width:100%;
background:${palette.white};
// transform: ${({ isMenuOpen }) => (isMenuOpen ? 'translateX(0)' : 'translateX(200%)')};
transition: all .5s;
z-index: 900;

visibility: ${({ isMenuOpen }) => (isMenuOpen ? 'visible' : 'hidden')};
overflow:hidden;
flex-shrink:0;
position:fixed;
top:0;
right:0;
height:100vh;


> div {
  display: flex;
  flex-direction: column;
  gap:50px;
  width: 100%;
  // max-width: 800px;
  height: 100%;
  text-align: center;
  // overflow:hidden;
  padding: 32px;
  border-radius: 10px;
  background: ${palette.white};
}

.header {
  position:relative;
  display:flex;
  flex-direction: column;
  gap:16px;
  align-items:center;

  h5 {
    width:100%;
    font-size:1.25rem;
    font-weight:600;
    line-height:1.3;
    color:${palette.gray800};
    text-align:left;

    p {
      font-size:1rem;
      font-weight:400;
      line-height:1.5;
      margin-top:16px;
    }
  }
}

.closePopup {
  position:absolute;
  top:0;
  right:0;
  width:21px;
  height:21px;
  font-size:0;
  border:0;
  background:none;

  &:before, &:after {
    position:absolute;
    top:50%;
    left:50%;
    width:3px;
    height:21px;
    display:inline-block;
    border-radius:50px;
    background:${palette.gray500};
    content:'';
  }
  &:before {
    transform:translate(-50%, -50%) rotate(45deg);
  }
  &:after {
    transform:translate(-50%, -50%) rotate(-45deg);
  }
}

.body {
  height:calc(100% - 80px);
  display: flex;
  flex-direction: column;
  gap:32px;

  p {
    line-height:1.5;
    color:${palette.gray800};
    text-align:left;
  }
}


h2 {
  margin-top: 0;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 20px 0;
}

@media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
  .header {
    align-items:flex-start;

    h5 {
      width:calc(100% - 35px);
    }
  }
  
  .body {
    overflow:hidden;
  }
}
`;

const ScrollWrap = styled.div`
  position:relative;
  flex:1 1 0%;
  // overflow-y:auto;
  overflow:hidden;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${palette.lineGray};
    border-radius: 10px;
  }

  > div {
    height:100%;
  }
`;

const ListBox = styled.div`
// max-height:525px;
overflow-y:auto;
border-radius:10px;
border:1px solid ${palette.outlineGray};

> div {
  display:flex;
  gap:8px;
  padding:14px 20px;

  + div {
    border-top:1px solid ${palette.outlineGray};
  }

  span {
    flex-shrink:0;
    width:20px;
    font-size:0.88rem;
    line-height:1.5;
  }

  div {
    display:flex;
    flex-direction: column;
    gap:12px;
  }

  strong, p {
    font-size:0.88rem;
    line-height:1.5;
    text-align:left;
  }

  p.tag {
    display:flex;
    align-items:center;
    gap:12px;
  }
}
`;

const Overlay = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
background: rgba(0, 0, 0, .1);
opacity: ${({ isMenuOpen }) => (isMenuOpen ? 1 : 0)};
visibility: ${({ isMenuOpen }) => (isMenuOpen ? 'visible' : 'hidden')};
transition: all .5s;
z-index: 800;
`;