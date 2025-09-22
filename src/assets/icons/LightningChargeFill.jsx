import React from 'react';
import { palette } from '../styles/Palette';

const LightningChargeFill = ({ width = "10", height = "11", color = palette.gray500, ...props }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 10 11" 
      fill="none"
      {...props}
    >
      <path 
        fill-rule="evenodd" 
        clip-rule="evenodd" 
        d="M3.69711 6.24239L1.25818 6.24285C0.987414 6.24291 0.855139 5.91255 1.05112 5.72572L6.28971 0.731524C6.48568 0.544689 6.80934 0.692585 6.79637 0.963041L6.61745 4.69153L9.01612 4.63379C9.28681 4.62727 9.42693 4.95437 9.23547 5.14583L4.11762 10.2637C3.92616 10.4551 3.59906 10.315 3.60558 10.0443L3.69711 6.24239Z" 
        fill={color}
      />
    </svg>
  );
};

export default LightningChargeFill; 