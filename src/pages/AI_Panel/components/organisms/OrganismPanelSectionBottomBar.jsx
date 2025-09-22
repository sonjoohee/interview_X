// OrganismPanelSectionBottomBar.jsx
import React from 'react';
import styled from 'styled-components';
import { palette } from '../../../../assets/styles/Palette';
import { Link } from "react-router-dom";
import images from '../../../../assets/styles/Images';

const OrganismPanelSectionBottomBar = ({ onSaveSelection }) => {
  return (
    <BottomBar>
      <SaveButton>
      {/* <SaveButton onClick={onSaveSelection}> */}
        <img src={images.IconDownload} alt="" />선택패널 저장
      </SaveButton>
      <div>
        <LinkButton to="">
          <InterviewIcon></InterviewIcon>인터뷰하기
        </LinkButton>
        <LinkButton to="/QuickReport">
          <ReportIcon></ReportIcon>퀵 리포트
        </LinkButton>
      </div>
    </BottomBar>
  );
};

export default OrganismPanelSectionBottomBar;

const BottomBar = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width:100%;
  max-width:606px;
  color: ${palette.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-radius: 40px;
  background: ${palette.black};
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.2);
  z-index: 1000;

  > div {
    display:flex;
    align-items: center;
    gap:12px;
  }
`;

const SaveButton = styled.button`
  font-family: 'Pretendard';
  font-size: 0.875rem;
  color: white;
  display: flex;
  align-items: center;
  gap:10px;
  margin-top:0;
  padding:0;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    background:none;
  }
`;

const LinkButton = styled(Link)`
  display: flex;
  align-items: center;
  gap:8px;
  font-size: 0.875rem;
  font-weight:500;
  color: ${palette.white};
  padding: 12px 20px;
  border-radius: 50px;
  text-decoration: none;
  border: 1px solid ${palette.white};
  background: rgba(255,255,255,.3);
  cursor: pointer;
`;

const InterviewIcon = styled.span`
  width:20px;
  height:16px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='17' viewBox='0 0 12 17' fill='none'%3E%3Cpath d='M2.96436 3.50006C2.96436 2.7044 3.30018 1.94132 3.89794 1.3787C4.49571 0.816077 5.30645 0.5 6.15182 0.5C6.99719 0.5 7.80793 0.816077 8.4057 1.3787C9.00346 1.94132 9.33928 2.7044 9.33928 3.50006V8.50017C9.33928 9.29584 9.00346 10.0589 8.4057 10.6215C7.80793 11.1842 6.99719 11.5002 6.15182 11.5002C5.30645 11.5002 4.49571 11.1842 3.89794 10.6215C3.30018 10.0589 2.96436 9.29584 2.96436 8.50017V3.50006Z' fill='white'/%3E%3Cpath d='M1.37011 6.99976C1.51101 6.99976 1.64613 7.05244 1.74576 7.14621C1.84538 7.23998 1.90136 7.36716 1.90136 7.49977V8.49979C1.90136 9.56068 2.34912 10.5781 3.14614 11.3283C3.94316 12.0784 5.02415 12.4999 6.15131 12.4999C7.27846 12.4999 8.35946 12.0784 9.15648 11.3283C9.9535 10.5781 10.4013 9.56068 10.4013 8.49979V7.49977C10.4013 7.36716 10.4572 7.23998 10.5569 7.14621C10.6565 7.05244 10.7916 6.99976 10.9325 6.99976C11.0734 6.99976 11.2085 7.05244 11.3081 7.14621C11.4078 7.23998 11.4637 7.36716 11.4637 7.49977V8.49979C11.4638 9.73934 10.9746 10.9347 10.0911 11.854C9.20769 12.7733 7.99293 13.3509 6.68255 13.4749V15.4999H9.87001C10.0109 15.4999 10.146 15.5526 10.2457 15.6464C10.3453 15.7402 10.4013 15.8673 10.4013 15.9999C10.4013 16.1326 10.3453 16.2597 10.2457 16.3535C10.146 16.4473 10.0109 16.5 9.87001 16.5H2.4326C2.2917 16.5 2.15658 16.4473 2.05695 16.3535C1.95733 16.2597 1.90136 16.1326 1.90136 15.9999C1.90136 15.8673 1.95733 15.7402 2.05695 15.6464C2.15658 15.5526 2.2917 15.4999 2.4326 15.4999H5.62006V13.4749C4.30968 13.3509 3.09493 12.7733 2.21147 11.854C1.32802 10.9347 0.838851 9.73934 0.838867 8.49979V7.49977C0.838867 7.36716 0.894837 7.23998 0.994465 7.14621C1.09409 7.05244 1.22922 6.99976 1.37011 6.99976Z' fill='white'/%3E%3C/svg%3E") center no-repeat;
  background-size:auto 100%;
`;

const ReportIcon = styled.span`
  width:20px;
  height:16px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='17' viewBox='0 0 20 17' fill='none'%3E%3Cpath d='M10.8424 2.68697C11.6409 1.8457 13.0182 1.60516 14.6421 1.76878C16.1489 1.92018 17.6983 2.40736 18.7789 2.85913V14.9751C17.658 14.5478 16.2062 14.1302 14.7655 13.9861C13.4297 13.8506 11.984 13.9385 10.8424 14.5869V2.68697ZM10.2319 1.58319C9.0292 0.548997 7.28561 0.395151 5.6983 0.553881C3.84971 0.740695 1.98401 1.37439 0.821621 1.90309C0.714965 1.9516 0.624521 2.02977 0.561085 2.12828C0.497648 2.22679 0.4639 2.34148 0.463867 2.45864V15.8897C0.463895 15.9918 0.489554 16.0923 0.538491 16.182C0.587429 16.2716 0.658082 16.3476 0.743978 16.4029C0.829875 16.4582 0.928269 16.491 1.03015 16.4984C1.13203 16.5058 1.23413 16.4875 1.32712 16.4452C2.40404 15.9568 4.13908 15.3695 5.8204 15.1998C7.5408 15.0264 8.9828 15.306 9.75569 16.2706C9.8129 16.3419 9.88538 16.3995 9.9678 16.439C10.0502 16.4786 10.1405 16.4991 10.2319 16.4991C10.3233 16.4991 10.4135 16.4786 10.496 16.439C10.5784 16.3995 10.6509 16.3419 10.7081 16.2706C11.481 15.306 12.923 15.0264 14.6421 15.1998C16.3247 15.3695 18.0609 15.9568 19.1367 16.4452C19.2296 16.4875 19.3317 16.5058 19.4336 16.4984C19.5355 16.491 19.6339 16.4582 19.7198 16.4029C19.8057 16.3476 19.8763 16.2716 19.9253 16.182C19.9742 16.0923 19.9999 15.9918 19.9999 15.8897V2.45864C19.9999 2.34148 19.9661 2.22679 19.9027 2.12828C19.8392 2.02977 19.7488 1.9516 19.6421 1.90309C18.4798 1.37439 16.6141 0.740695 14.7655 0.553881C13.1782 0.39393 11.4346 0.548997 10.2319 1.58319Z' fill='white'/%3E%3C/svg%3E") center no-repeat;
  background-size:auto 100%;
`;
