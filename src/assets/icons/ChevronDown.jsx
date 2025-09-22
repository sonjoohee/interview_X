import React from 'react';
import { palette } from '../styles/Palette';

const ChevronDown = ({ width = "45", height = "44", color = palette.gray500, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none"
      {...props}
    >
      <path 
        d="M17 9.58301L11.8176 14.9997L6.63525 9.58301" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronDown; 