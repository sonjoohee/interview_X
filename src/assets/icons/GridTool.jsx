 import React from 'react';
import { palette } from '../styles/Palette';

const GridTool = ({ width = "8", height = "8", color = palette.gray500, ...props }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 8 8" 
      fill="none"
      {...props}
    >
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.67207 0.265381C0.506385 0.265381 0.37207 0.399695 0.37207 0.565381V3.49736C0.37207 3.66305 0.506385 3.79736 0.67207 3.79736H3.55073C3.54851 3.81208 3.54736 3.82715 3.54736 3.84248V6.77446C3.54736 6.94015 3.68168 7.07446 3.84736 7.07446H6.77935C6.94503 7.07446 7.07935 6.94015 7.07935 6.77446V3.84248C7.07935 3.6768 6.94503 3.54248 6.77935 3.54248H3.90068C3.9029 3.52776 3.90405 3.5127 3.90405 3.49736V0.565381C3.90405 0.399695 3.76974 0.265381 3.60405 0.265381H0.67207Z" fill={color}/>
    </svg>
  );
};

export default GridTool; 