import React from 'react';
import { palette } from '../../assets/styles/Palette';

const ChevronRight = ({ width = "45", height = "44", color = palette.gray500, ...props }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 15 14" 
      fill="none"
      {...props}
    >
      <path 
        d="M5.60352 3.37305L9.39518 7.00071L5.60352 10.6284" 
        stroke={color} 
        strokeWidth="1.4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronRight; 