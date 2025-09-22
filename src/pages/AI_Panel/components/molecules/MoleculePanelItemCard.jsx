// MoleculePanelItem.jsx
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import MoleculePanelItemDetail from './MoleculePanelItemDetail';
import { useAtom } from 'jotai';
import {
  SELECTED_PANELS,
} from "../../../AtomStates";
import timeCode from '../../assets/time-code.json';

const MoleculePanelItem = ({ id, imgSrc, gender, age, job, address, subAddress, comment, tags, onSelect, lifeStyle, consumption, productGroup, 
  target_1, target_2, target_3, target_4, target_5, value_1, value_2, value_3, value_4, value_5,}) => {
  
  const [selectedPanels, setSelectedPanels] = useAtom(SELECTED_PANELS);

  const [maxBehabioralType, setMaxBehabioralType] = useState("");
  const [maxUtilizationTime, setMaxUtilizationTime] = useState(0);

  const [isSelected, setSelected] = useState(false);
  const [isDetailsVisible, setDetailsVisible] = useState(false);
  
  useEffect(() => {
    setMaxBehabioralType("");
    setMaxUtilizationTime(0);
  },[])

  // 행동타입 검색을 했을 때 최대 시간량 데이터를 찾는 로직
  useEffect(() => {
    if (target_1) {
      const maxTime = Math.max(value_1, value_2, value_3, value_4, value_5);
      setMaxUtilizationTime(maxTime);

      let maxType;
      if (maxTime === value_1) {
        maxType = target_1;
      } else if (maxTime === value_2) {
        maxType = target_2;
      } else if (maxTime === value_3) {
        maxType = target_3;
      } else if (maxTime === value_4) {
        maxType = target_4;
      } else {
        maxType = target_5;
      }
      setMaxBehabioralType(timeCode[maxType]);
    }
  }, [target_1, value_1, value_2, value_3, value_4, value_5, setMaxUtilizationTime, setMaxBehabioralType]);
  
  const handlePanelClick = (e) => {
    if (e.target.tagName === 'BUTTON') {
      return;
    }
    const newSelected = !isSelected;
    setSelected(newSelected);
    onSelect(newSelected, id); 
  };

  const handleDetailsClick = (e) => {
    e.stopPropagation();
    setDetailsVisible(true);
  };

  const handleSelectButtonClick = (e) => {
    e.stopPropagation();
    const newSelected = !isSelected;
    setSelected(newSelected);
    onSelect(newSelected, id); 
  };

  // 선택상태 초기화
  useEffect(() => {
    setSelected(selectedPanels.has(id)); 
  }, [selectedPanels, id]);

  const handleCloseDetails = () => {
    setDetailsVisible(false);
  };

  // 패널 이미지 선택
  let imgTarget = "";
  let imgAge = age >= 70 ? 60 : Math.floor(parseInt(age) / 10) * 10;
  if(imgAge === 10) imgAge = 20;
  const imgGender = gender == "M" ? "m" : "w";
  imgTarget = imgAge + "s_" + imgGender + "_" + imgSrc + ".jpg";

  return (
    <>
      <PanelItem className={isSelected ? 'selected' : ''} onClick={handlePanelClick}>

        <Image src={`../../../../images/panel/${imgGender}/${imgTarget}`} alt=""/>
        
        <span className="panelChk">패널체크</span>
        <Overlay className="overlay">
          <InfoButton onClick={handleDetailsClick}><img src={images.IconView} alt="" />패널정보 상세보기</InfoButton>
          <InfoButton onClick={handleSelectButtonClick}>
            {/* {isSelected ? '✅ 패널 선택됨' : '패널 선택하기'} */}
            {isSelected ? (
              <>
                <img src={images.IconClose} alt="" />
                패널선택 해제
              </>
            ) : (
              <>
                <img src={images.IconCheck} alt="" />
                패널 선택하기
              </>
            )}
          </InfoButton>
        </Overlay>
        <PanelDetails>
          <p>{gender === "M" ? "남성" : "여성"}({age}세) | {job}</p>
          
          {maxBehabioralType && maxUtilizationTime<60 && <><strong>{maxBehabioralType}에 {maxUtilizationTime}분이상 활용하고 있어요</strong><br/><br/></>}
          {maxBehabioralType && maxUtilizationTime%60===0 && <><strong>{maxBehabioralType}에 {maxUtilizationTime/60}시간이상 활용하고 있어요</strong><br/><br/></>}
          {maxBehabioralType && maxUtilizationTime>=60 && maxUtilizationTime%60!==0 && <><strong>{maxBehabioralType}에 {Math.floor(maxUtilizationTime/60)}시간 {maxUtilizationTime%60}분이상 활용하고 있어요</strong><br/><br/></>}
          {!maxBehabioralType && <strong>{comment}</strong>}
          <span>
            {tags.split(',').filter(tags => tags.trim() !== '')?.map((tags, index) => (
              <div key={index}>#{tags.trim()}</div>
            ))}
          </span>
        </PanelDetails>
      </PanelItem>
      {isDetailsVisible && (
        <MoleculePanelItemDetail
          gender={gender}
          age={age}
          job={job}
          address={address} 
          onClose={handleCloseDetails} 
          lifeStyle={lifeStyle} 
          consumption={consumption} 
          productGroup={productGroup} 
          isSelected={isSelected}
          tags={tags}
          toggleSelection={handleSelectButtonClick}
        />
      )}
    </>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const PanelItem = styled.li`
  position: relative;
  max-width: 295px;
  overflow: hidden;
  background: #F4F4F4;
  border-radius: 15px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: border 0.3s ease-in-out;

  > span {
    position:absolute;
    right:15px;
    top:15px;
    width:20px;
    height:20px;
    font-size:0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='19' height='19' viewBox='0 0 19 19' fill='none'%3E%3Cpath d='M18.5149 9.13258C18.5149 11.5195 17.5667 13.8087 15.8789 15.4965C14.191 17.1844 11.9018 18.1326 9.51489 18.1326C7.12794 18.1326 4.83876 17.1844 3.15093 15.4965C1.4631 13.8087 0.514893 11.5195 0.514893 9.13258C0.514893 6.74564 1.4631 4.45645 3.15093 2.76862C4.83876 1.0808 7.12794 0.132584 9.51489 0.132584C11.9018 0.132584 14.191 1.0808 15.8789 2.76862C17.5667 4.45645 18.5149 6.74564 18.5149 9.13258ZM14.0486 5.72383C13.9683 5.64375 13.8726 5.5807 13.7673 5.53845C13.662 5.4962 13.5493 5.47561 13.4359 5.47792C13.3225 5.48023 13.2107 5.50539 13.1072 5.5519C13.0037 5.5984 12.9107 5.6653 12.8336 5.74858L8.92652 10.7267L6.57189 8.37096C6.41195 8.22192 6.20039 8.14078 5.9818 8.14464C5.76322 8.14849 5.55466 8.23704 5.40007 8.39163C5.24548 8.54622 5.15693 8.75478 5.15307 8.97337C5.14921 9.19196 5.23035 9.40351 5.37939 9.56346L8.35614 12.5413C8.43633 12.6214 8.53183 12.6845 8.63692 12.7268C8.74202 12.7691 8.85457 12.7899 8.96786 12.7878C9.08114 12.7857 9.19285 12.7608 9.2963 12.7146C9.39976 12.6684 9.49285 12.6018 9.57002 12.5188L14.061 6.90508C14.2141 6.74589 14.2987 6.53302 14.2966 6.31216C14.2945 6.0913 14.2059 5.88008 14.0498 5.72383H14.0486Z' fill='white'/%3E%3C/svg%3E");
    background-repeat:no-repeat;
    background-size:cover;
    opacity:0.3;
  }

  &.selected {
    border: 2px solid ${palette.blue};
    background:rgba(4,83,244,.06);
    box-shadow:0 4px 15px rgba(0,0,0,.2);

    > span {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='19' height='19' viewBox='0 0 19 19' fill='none'%3E%3Cpath d='M18.5149 9.77127C18.5149 12.1582 17.5667 14.4474 15.8789 16.1352C14.191 17.8231 11.9018 18.7713 9.51489 18.7713C7.12794 18.7713 4.83876 17.8231 3.15093 16.1352C1.4631 14.4474 0.514893 12.1582 0.514893 9.77127C0.514893 7.38432 1.4631 5.09514 3.15093 3.40731C4.83876 1.71948 7.12794 0.771271 9.51489 0.771271C11.9018 0.771271 14.191 1.71948 15.8789 3.40731C17.5667 5.09514 18.5149 7.38432 18.5149 9.77127ZM14.0486 6.36252C13.9683 6.28244 13.8726 6.21939 13.7673 6.17714C13.662 6.13489 13.5493 6.1143 13.4359 6.11661C13.3225 6.11892 13.2107 6.14408 13.1072 6.19059C13.0037 6.23709 12.9107 6.30399 12.8336 6.38727L8.92652 11.3654L6.57189 9.00965C6.41195 8.86061 6.20039 8.77947 5.9818 8.78332C5.76322 8.78718 5.55466 8.87573 5.40007 9.03032C5.24548 9.18491 5.15693 9.39347 5.15307 9.61206C5.14921 9.83065 5.23035 10.0422 5.37939 10.2021L8.35614 13.18C8.43633 13.2601 8.53183 13.3231 8.63692 13.3655C8.74202 13.4078 8.85457 13.4286 8.96786 13.4265C9.08114 13.4244 9.19285 13.3995 9.2963 13.3533C9.39976 13.3071 9.49285 13.2405 9.57002 13.1575L14.061 7.54377C14.2141 7.38458 14.2987 7.17171 14.2966 6.95085C14.2945 6.72999 14.2059 6.51876 14.0498 6.36252H14.0486Z' fill='%230453F4'/%3E%3C/svg%3E");
      opacity:1;
    }
  }

  &:hover .overlay {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: ${palette.white};
  display: flex;
  flex-direction: column;
  padding-top: 40%;
  align-items: center;
  gap:10px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const InfoButton = styled.button`
  display:flex;
  justify-content:center;
  align-items:center;
  gap:5px;
  max-width:170px;
  width:100%;
  font-family: 'Pretendard';
  font-size:0.875rem;
  color: ${palette.white};
  padding: 8px 16px;
  margin:0 auto;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid ${palette.white};
  background:none;
  transition:all .5s;

  &:hover {
    background:rgba(255,255,255,.3);
  }
`;

const PanelDetails = styled.div`
  min-height:200px;
  display:flex;
  flex-direction:column;
  gap:8px;
  padding: 20px;
  text-align: left;

  p {
    font-size: 0.875rem;
    font-weight: 300;
    margin-bottom: 8px;
  }

  strong {
    font-size: 1.25rem;
  }

  span {
    display: flex;
    gap: 8px;
    font-size: 0.875rem;
    color: #999;
    margin-top: auto;
  }
`;

export default MoleculePanelItem;
