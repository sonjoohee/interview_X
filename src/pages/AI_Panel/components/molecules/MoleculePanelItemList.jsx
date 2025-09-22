import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import { useAtom } from 'jotai';
import {
  SELECTED_PANELS,
} from "../../../AtomStates";
import timeCode from '../../assets/time-code.json';
import MoleculePanelItemDetail from './MoleculePanelItemDetail';

const MoleculePanelItemList = ({ id, imgSrc, gender, age, job, address, subAddress, comment, tags, onSelect, lifeStyle, consumption, productGroup, 
  target_1, target_2, target_3, target_4, target_5, value_1, value_2, value_3, value_4, value_5,}) => {

  const [selectedPanels, setSelectedPanels] = useAtom(SELECTED_PANELS);

  const [maxBehabioralType, setMaxBehabioralType] = useState("");
  const [maxUtilizationTime, setMaxUtilizationTime] = useState(0);
  const [isDetailsVisible, setDetailsVisible] = useState(false);

  const [isSelected, setSelected] = useState(false);

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

  const handleCloseDetails = () => {
    setDetailsVisible(false);
  };

  // 선택상태 초기화
  useEffect(() => {
    setSelected(selectedPanels.has(id)); 
  }, [selectedPanels, id]);

  // 패널 이미지 선택
  let imgTarget = "";
  let imgAge = age >= 70 ? 60 : Math.floor(parseInt(age) / 10) * 10;
  if(imgAge === 10) imgAge = 20;
  const imgGender = gender === "M" ? "m" : "w";
  imgTarget = imgAge + "s_" + imgGender + "_" + imgSrc + ".jpg";

  return (
    <>
      <PanelItem className={isSelected ? 'selected' : ''} onClick={handlePanelClick}>
        <CheckboxContainer>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handlePanelClick}
          />
        </CheckboxContainer>
        <Image src={`../../../../images/panel/${imgGender}/${imgTarget}`} alt=""/>
        <PanelDetails>
          <DetailHeader>
            <DetailTitle>{gender === "M" ? "남성" : "여성"}({age}세) | {job}</DetailTitle>
            {maxBehabioralType && maxUtilizationTime < 60 && <DetailHighlight>{maxBehabioralType}에 {maxUtilizationTime}분 이상 활용하고 있어요</DetailHighlight>}
            {maxBehabioralType && maxUtilizationTime % 60 === 0 && <DetailHighlight>{maxBehabioralType}에 {maxUtilizationTime / 60}시간 이상 활용하고 있어요</DetailHighlight>}
            {maxBehabioralType && maxUtilizationTime >= 60 && maxUtilizationTime % 60 !== 0 && <DetailHighlight>{maxBehabioralType}에 {Math.floor(maxUtilizationTime / 60)}시간 {maxUtilizationTime % 60}분 이상 활용하고 있어요</DetailHighlight>}
            {!maxBehabioralType && <DetailHighlight>{comment}</DetailHighlight>}
          </DetailHeader>
          <PanelTags>
            {tags.split(',').filter(tag => tag.trim() !== '')?.map((tag, index) => (
              <Tag key={index}>#{tag.trim()}</Tag>
            ))}
          </PanelTags>
        </PanelDetails>
        <PanelMenu onClick={handleDetailsClick}>
          <MenuIcon>⋮</MenuIcon>
        </PanelMenu>
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
          toggleSelection={handlePanelClick}
        />
      )}
    </>
  );
};

const PanelItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px;
  background: ${palette.white};
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease-in-out;
  cursor: pointer;
  margin-bottom: 8px;
  &:hover {
    background: ${palette.lightGray};
  }
  &.selected {
    background: ${palette.blueLight};
    border: 2px solid ${palette.blue};
  }
`;

const CheckboxContainer = styled.div`
  margin-right: 16px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
`;

const PanelDetails = styled.div`
  flex: 1;
`;

const DetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

const DetailTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${palette.black};
`;

const DetailHighlight = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${palette.darkGray};
  margin-top: 4px;
`;

const PanelTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  font-size: 12px;
  color: ${palette.darkGray};
`;

const PanelMenu = styled.div`
  margin-left: auto;
`;

const MenuIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${palette.blue};
  }
`;

export default MoleculePanelItemList;
