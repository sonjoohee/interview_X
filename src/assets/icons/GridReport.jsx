 import React from 'react';
import { palette } from '../styles/Palette';

const GridReport = ({ width = "8", height = "8", color = palette.gray500, ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 8 8" fill="none" {...props}>
    <rect x="-0.000244141" y="0.830078" width="4.66667" height="4.66667" rx="0.4" fill={color}/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.59977 2.76367C6.82069 2.76367 6.99977 2.94276 6.99977 3.16367V7.43034C6.99977 7.65125 6.82069 7.83034 6.59977 7.83034H2.33311C2.11219 7.83034 1.93311 7.65125 1.93311 7.43034V6.83034C1.93311 6.60942 2.11219 6.43034 2.33311 6.43034H5.39977C5.51023 6.43034 5.59977 6.3408 5.59977 6.23034V3.16367C5.59977 2.94276 5.77886 2.76367 5.99977 2.76367H6.59977Z" fill={color}/>
    </svg>
  );
};

export default GridReport; 