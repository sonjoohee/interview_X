// MoleculePanelItemDetail.jsx
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import { Link } from "react-router-dom";

const MoleculePanelItemDetail = ({ id, imgSrc, gender, age, job, address, subAddress, tags, lifeStyle, consumption, productGroup = '', onClose, isSelected, toggleSelection }) => {
  const [activeTab, setActiveTab] = useState('lifestyle');

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'lifestyle':
        return lifeStyle;
      case 'consumption':
        return consumption;
      case 'productGroup':
        // Split the productGroup string by '^' and map over the resulting array
        return (
          <ProductGroupContainer>
            {productGroup.split('^')?.map((item, index) => (
              <ProductGroupItem key={index}>{item}</ProductGroupItem>
            ))}
          </ProductGroupContainer>
        );
      default:
        return lifeStyle;
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>닫기</CloseButton>
        <Header>
          <ProfileImage>😊</ProfileImage>
          <HeaderText>
            <UserInfo>{gender} ({age}세)</UserInfo>
            <UserDetails>{address} 거주 | {job}</UserDetails>
          </HeaderText>
        </Header>
        <TagsContainer>
          {tags.split(',').filter(tags => tags.trim() !== '')?.map((tags, index) => (
            <Tag key={index}>#{tags.trim()}</Tag>
          ))}
        </TagsContainer>
        <TabMenu>
          <TabButton active={activeTab === 'lifestyle'} onClick={() => setActiveTab('lifestyle')}>라이프스타일</TabButton>
          <TabButton active={activeTab === 'consumption'} onClick={() => setActiveTab('consumption')}>소비성향</TabButton>
          <TabButton active={activeTab === 'productGroup'} onClick={() => setActiveTab('productGroup')}>관심제품군</TabButton>
        </TabMenu>
        <Content>
          {renderContent()}
        </Content>
        <Footer>
          {/* {isSelected ? '패널 선택됨' : '패널 선택'} */}

            {isSelected ? (
              <>
                <ActionButton PanelChk className="active" onClick={toggleSelection}>
                  <span>패널선택</span>
                </ActionButton>
              </>
            ) : (
              <>
                <ActionButton PanelChk onClick={toggleSelection}>
                  <span>패널선택</span>
                </ActionButton>
              </>
            )}
          <div>
            <Link to="">
            {/* <Link to={`/interview/${id}`}> */}
              <ActionButton><img src={images.Interview} alt="" />인터뷰</ActionButton>
            </Link>
            <Link to="/QuickReport">
            {/* <Link to={`/quickreport/${id}`}> */}
              <ActionButton Blue><img src={images.Report} alt="" />퀵 리포트</ActionButton>
            </Link>
          </div>
        </Footer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MoleculePanelItemDetail;

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
  position: relative;
  max-width: 450px;
  width:100%;
  padding: 20px;
  border-radius: 15px;
  background: ${palette.white};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width:20px;
  height:20px;
  font-size:0;
  background: none;
  border: none;
  cursor: pointer;

  &:before, &:after {
    position:absolute;
    left:50%;
    top:50%;
    width:100%;
    height:2px;
    display:block;
    border-radisu:50%;
    background:${palette.gray};
    content:'';
  }

  &:before {
    transform:translate(-50%, -50%) rotate(45deg);
  }
  &:after {
    transform:translate(-50%, -50%) rotate(-45deg);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ddd;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  margin-right: 10px;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  text-align:left;
`;

const UserInfo = styled.div`
  font-size: 1.13rem;
  font-weight: bold;
`;

const UserDetails = styled.div`
  font-size: 0.875rem;
  color: ${palette.black};
`;

const TagsContainer = styled.div`
  margin: 15px 0 0;
  display: flex;
  gap:4px;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  font-size: 0.75rem;
  color: ${palette.gray};
  padding: 4px 8px;
  border-radius: 5px;
  border:1px solid ${palette.lineGray};
  background:none;
`;

const TabMenu = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px auto 15px;
  padding:4px;
  border-radius:20px;
  background:rgba(0,0,0,.05);
`;

const TabButton = styled.button`
  flex: 1 1 0;
  font-family: 'Pretendard';
  font-size: 0.875rem;
  padding: 6px 12px;
  margin-top:0;
  color: ${(props) => (props.active ? `${palette.black}` : `${palette.gray}`)};
  border-radius:20px;
  border:0;
  background: ${(props) => (props.active ? `${palette.white}` : 'none')};
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.active ? '#ffffff' : '#e0e0e0')};
  }
`;

const Content = styled.div`
  min-height:150px;
  max-height:150px;
  font-size: 0.875rem;
  color: ${palette.gray};
  text-align:left;
  line-height: 1.5;
  margin-bottom: 20px;
  overflow-y:auto;
`;

const ProductGroupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ProductGroupItem = styled.div`
  font-size: 0.875rem;
  color: ${palette.gray};
  padding: 5px 12px;
  border-radius: 5px;
  border: 1px solid ${palette.lineGray};
  background-color: ${palette.white};
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  padding-top:20px;
  margin-top:20px;
  border-top:1px solid ${palette.lineGray};

  > div {
    display:flex;
    gap:8px;
  }
`;

const ActionButton = styled.button`
  display:flex;
  justify-content:center;
  gap:8px;
  min-width:100px;
  font-family: 'Pretendard';
  font-size: 0.875rem;
  color: ${props => {
    if (props.Blue) return palette.white;
    else if (props.PanelChk) return palette.gray;
    else return palette.blue;
  }};
  line-height:20px;
  padding: ${props => {
    if (props.PanelChk) return `0 0 0 10px`;
    else return `10px`;
  }};
  margin-top:0;
  border-radius: 5px;
  border: ${props => {
    if (props.PanelChk) return `none`;
    else return `1px solid ${palette.blue}`;
  }};


  background: ${props => {
    if (props.Blue) return palette.blue;
    else if (props.PanelChk) return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='19' viewBox='0 0 18 19' fill='none'%3E%3Cpath d='M18 9.5C18 11.8869 17.0518 14.1761 15.364 15.864C13.6761 17.5518 11.3869 18.5 9 18.5C6.61305 18.5 4.32387 17.5518 2.63604 15.864C0.948212 14.1761 0 11.8869 0 9.5C0 7.11305 0.948212 4.82387 2.63604 3.13604C4.32387 1.44821 6.61305 0.5 9 0.5C11.3869 0.5 13.6761 1.44821 15.364 3.13604C17.0518 4.82387 18 7.11305 18 9.5ZM13.5337 6.09125C13.4534 6.01117 13.3577 5.94812 13.2524 5.90587C13.1471 5.86361 13.0344 5.84303 12.921 5.84534C12.8076 5.84765 12.6958 5.87281 12.5923 5.91931C12.4888 5.96582 12.3958 6.03271 12.3187 6.116L8.41162 11.0941L6.057 8.73837C5.89705 8.58933 5.6855 8.5082 5.46691 8.51205C5.24832 8.51591 5.03976 8.60446 4.88518 8.75905C4.73059 8.91364 4.64204 9.1222 4.63818 9.34079C4.63432 9.55938 4.71546 9.77093 4.8645 9.93088L7.84125 12.9087C7.92144 12.9888 8.01693 13.0519 8.12203 13.0942C8.22713 13.1366 8.33968 13.1573 8.45296 13.1552C8.56625 13.1531 8.67795 13.1282 8.78141 13.082C8.88486 13.0358 8.97795 12.9692 9.05512 12.8863L13.5461 7.2725C13.6992 7.11331 13.7838 6.90043 13.7817 6.67958C13.7796 6.45872 13.691 6.24749 13.5349 6.09125H13.5337Z' fill='black' fill-opacity='0.05'/%3E%3C/svg%3E") left center no-repeat`;
    else return palette.white;
  }};
  cursor: pointer;

  ${props =>
    props.PanelChk &&
    css`
      &.active {
        background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='19' height='19' viewBox='0 0 19 19' fill='none'%3E%3Cpath d='M18.5149 9.77127C18.5149 12.1582 17.5667 14.4474 15.8789 16.1352C14.191 17.8231 11.9018 18.7713 9.51489 18.7713C7.12794 18.7713 4.83876 17.8231 3.15093 16.1352C1.4631 14.4474 0.514893 12.1582 0.514893 9.77127C0.514893 7.38432 1.4631 5.09514 3.15093 3.40731C4.83876 1.71948 7.12794 0.771271 9.51489 0.771271C11.9018 0.771271 14.191 1.71948 15.8789 3.40731C17.5667 5.09514 18.5149 7.38432 18.5149 9.77127ZM14.0486 6.36252C13.9683 6.28244 13.8726 6.21939 13.7673 6.17714C13.662 6.13489 13.5493 6.1143 13.4359 6.11661C13.3225 6.11892 13.2107 6.14408 13.1072 6.19059C13.0037 6.23709 12.9107 6.30399 12.8336 6.38727L8.92652 11.3654L6.57189 9.00965C6.41195 8.86061 6.20039 8.77947 5.9818 8.78332C5.76322 8.78718 5.55466 8.87573 5.40007 9.03032C5.24548 9.18491 5.15693 9.39347 5.15307 9.61206C5.14921 9.83065 5.23035 10.0422 5.37939 10.2021L8.35614 13.18C8.43633 13.2601 8.53183 13.3231 8.63692 13.3655C8.74202 13.4078 8.85457 13.4286 8.96786 13.4265C9.08114 13.4244 9.19285 13.3995 9.2963 13.3533C9.39976 13.3071 9.49285 13.2405 9.57002 13.1575L14.061 7.54377C14.2141 7.38458 14.2987 7.17171 14.2966 6.95085C14.2945 6.72999 14.2059 6.51876 14.0498 6.36252H14.0486Z' fill='%230453F4'/%3E%3C/svg%3E") left center no-repeat;
      }
    `
  };


  &:hover {
    background-color: ${props => {
      if (props.Blue) return palette.blue;
      else return palette.white;
    }};
  }
`;
