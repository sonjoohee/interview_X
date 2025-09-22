import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import panelimages from "../../../../assets/styles/PanelImages";
import { useAtom } from "jotai";
import { SELECTED_EXPERT_INDEX } from "../../../AtomStates";
import expertsData from "../../assets/experts_info.json";

const OrganismRightSideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);

  const moreProfile = () => {
    setIsOpen(!isOpen);
  };

  // 고정 데이터 활용
  const selectedExpert = expertsData.find(
    (expert) => expert.id === selectedExpertIndex
  );
  if (!selectedExpert) return null;

  // API 데이터 활용
  // const selectedExpert = expertDetailData.results?.find(
  //   (expert) => expert.expertIndex === selectedExpertIndex
  // );
  // if (!selectedExpert) return null;

  // 고정 데이터 활용
  return (
    <>
      <SideBar Right>
        <AIProfileWrap>
          <div>
            <AIProfile>
              <div className="profileInfo">
                <div className="thumb">
                  <img
                    src={panelimages[`expert_${selectedExpertIndex}`]}
                    alt=""
                  />
                </div>
                <div className="name">
                  <strong>{selectedExpert.title}</strong>
                  <ul>
                    <li>이름 : {selectedExpert.name}</li>
                    <li>주요경력 : {selectedExpert.description}</li>
                  </ul>
                </div>
              </div>

              <FieldWrap isOpen={isOpen}>
                <strong>주요 이력</strong>
                <div>
                  <FieldUl isOpen={isOpen}>
                    {selectedExpert.career?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </FieldUl>
                </div>
              </FieldWrap>

              <div className="field">
                <strong>전문분석 분야</strong>

                <div>
                  {selectedExpert.expertise.fields?.map((field, index) => (
                    <React.Fragment key={index}>
                      <strong>
                        {/* <img src={images.ProfessionalValue} alt="" /> */}
                        <img src={field.images} alt={field.category} />
                        {field.category}
                      </strong>
                      <FieldUl isOpen={isOpen}>
                        {field.details?.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </FieldUl>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </AIProfile>

            <button type="button" onClick={moreProfile}>
              {isOpen ? "상세 정보 확인하기" : "접기"}
            </button>

            <p isOpen={isOpen}>본 전문가는 가상으로 제작된 인물입니다.</p>
          </div>
        </AIProfileWrap>
      </SideBar>
    </>
  );
};

// API 데이터 활용
// return (
//   <>
//     <SideBar Right>
//       <AIProfileWrap>
//         <div>
//           <AIProfile>
//             <div className="profileInfo">
//               <div className="thumb">
//                 <img
//                   src={panelimages[`expert_${selectedExpertIndex}`]}
//                   alt=""
//                 />
//               </div>
//               <div className="name">
//                 <strong>{selectedExpert.job}</strong>
//                 <ul>
//                   <li>이름 : Expert {selectedExpert.expertIndex}</li>
//                   <li>주요경력 : {selectedExpert.mainHistory}</li>
//                 </ul>
//               </div>
//             </div>

//             <FieldWrap isOpen={isOpen}>
//               <strong>주요 이력</strong>
//               <div>
//                 <FieldUl isOpen={isOpen}>
//                   <li>{selectedExpert.mainHistory}</li>
//                 </FieldUl>
//               </div>
//             </FieldWrap>

//             <div className="field">
//               <strong>전문분석 분야</strong>

//               <div>
//                 <React.Fragment>
//                   <strong>
//                     {selectedExpert.job}
//                   </strong>
//                   <FieldUl isOpen={isOpen}>
//                     <li>{selectedExpert.coreValue}</li>
//                     <li>{selectedExpert.developmentRoadmap}</li>
//                     <li>{selectedExpert.productPositioning}</li>
//                   </FieldUl>
//                 </React.Fragment>
//               </div>
//             </div>
//           </AIProfile>

//           <button type="button" onClick={moreProfile}>
//             {isOpen ? "상세 정보 확인하기" : "접기"}
//           </button>

//           <p isOpen={isOpen}>본 전문가는 가상으로 제작된 인물입니다.</p>
//         </div>
//       </AIProfileWrap>
//     </SideBar>
//   </>
// );
// };
export default OrganismRightSideBar;

// 기존 styled-components 스타일링 코드 (생략)

const SideBar = styled.div`
  position: sticky;
  top: 40px;
  right: 40px;
  grid-area: toc;
  width: 100%;
  max-width: 240px;
  height: calc(100vh - 200px);
  // height:calc(100vh - 12rem);
  margin-left: ${(props) => {
    // if (props.Right) return `0`;
    if (props.Right) return `20px`;
    else return `-300px`;
  }};
  margin-right: 0;
  // margin-bottom:150px;
  padding: ${(props) => {
    if (props.Right) return `0`;
    else return `40px 28px`;
  }};
  border-radius: 20px;
  border: ${(props) => {
    if (props.Right) return `none`;
    else return `1px solid ${palette.lineGray}`;
  }};
  background: none;

  box-shadow: ${(props) => {
    if (props.Right) return `none`;
    else return `0 4px 10px rgba(0,0,0,.1)`;
  }};

  h3 {
    font-size: 1rem;
    font-weight: 400;
    text-align: left;
    margin-bottom: 20px;
  }

  .logo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    a {
      width: 44px;
      height: 44px;
      font-size: 0;
      background: url(${images.SymbolLogo}) left center no-repeat;
      background-size: auto 100%;
    }

    button {
      position: relative;
      font-size: 0;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 0;
      background: ${palette.white};
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);

      &:before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 7px;
        height: 2px;
        border-radius: 10px;
        background: ${palette.black};
        content: "";
      }

      &:after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        width: 8px;
        height: 8px;
        border-left: 2px solid ${palette.black};
        border-bottom: 2px solid ${palette.black};
        content: "";
      }
    }
  }
`;

const AIProfileWrap = styled.div`
  padding: 24px 20px 20px;
  border-radius: 20px;
  border: 1px solid ${palette.lineGray};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  background: ${palette.white};

  + div {
    margin-top: 28px;
  }

  button {
    position: relative;
    width: 100%;
    font-family: "Pretendard";
    font-size: 0.75rem;
    color: ${palette.gray};
    // text-decoration:underline;
    // padding-right:16px;
    padding: 8px 16px;
    margin-top: 9px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
    background: ${palette.white};

    &:after {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
      width: 8px;
      height: 8px;
      border-top: 2px solid ${palette.black};
      border-right: 2px solid ${palette.black};
      // content:'';
    }
  }

  p {
    font-size: 0.63rem;
    // color: ${palette.gray};
    color:${palette.buttonLineGray};
    margin-top: 8px;
  }
`;

const AIProfile = styled.div`
  display: flex;
  flex-direction: column;

  .profileInfo {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${palette.lineGray};
  }

  .thumb {
    position: relative;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .name {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: left;

    strong {
      font-size: 1rem;
      font-weight: 600;
      color:${palette.gray800};
    }

    li {
      display: flex;
      align-items: center;
      font-size: 0.75rem;
      // color: ${palette.darkGray};
      color:${palette.gray700};

      + li {
        margin-top: 5px;
      }
    }

    p {
      color: ${palette.gray};
      margin-top: 15px;
    }
  }

  .field {
    display: flex;
    flex-direction: column;
    width: 100%;
    // margin:4px auto 0;
    padding-top: 20px;
    // border-top:1px solid ${palette.lineGray};

    > strong {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 1rem;
      font-weight: 400;
      color:${palette.gray800};
      margin-bottom: 15px;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;

      strong {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        font-size: 0.875rem;
        font-weight: 300;
        color:${palette.gray700};
        // color: ${palette.darkGray};
        // padding:8px 16px;
        // border-radius:25px;
        // border:1px solid ${palette.lineGray};
        // background:${palette.white};
      }
    }
  }
`;

const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: ${(props) => (props.isOpen ? "0" : "1000px")};
  // margin: 20px auto 0;
  padding-top: ${(props) => (props.isOpen ? "0" : "20px")};
  overflow: hidden;
  transition: max-height 0.5s ease, padding 0.5s ease;

  strong {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 15px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
`;

const FieldUl = styled.ul`
  width: 100%;
  max-height: ${(props) => (props.isOpen ? "0" : "1000px")};
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  margin-bottom: ${(props) => (props.isOpen ? "0" : "16px")};
  overflow: hidden;
  transition: max-height 0.5s ease, padding 0.5s ease;

  li {
    position: relative;
    font-size: 0.75rem;
    line-height: 1.5;
    text-align: left;
    // color: ${palette.darkGray};
    color:${palette.gray700};
    padding-left: 20px;

    &:before {
      position: absolute;
      left: 0;
      top: 7px;
      width: 3px;
      height: 3px;
      border-radius: 10px;
      background: ${palette.darkGray};
      content: "";
    }
  }
`;