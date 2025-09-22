import React from 'react';
import { palette } from '../styles/Palette';

const Report2 = ({ width = "12", height = "16", color = palette.gray500, ...props }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0.763245 14.666V1.33264H8.42991L11.4299 4.83264V14.666H0.763245Z" stroke={color} stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5.09658 11.6659V9.3326H3.09658V11.6659H5.09658ZM5.09658 11.6659H7.09658M5.09658 11.6659V7.66593H7.09658V11.6659M2.76324 11.6659H9.42991M7.09658 11.6659H9.09658V5.99927H7.09658V11.6659Z" stroke={color} stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
};

export default Report2; 