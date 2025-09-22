import React from 'react';
import { palette } from '../styles/Palette';

const CoinLargeFill = ({ width = "34", height = "32", color = palette.gray500, ...props }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 38 35" 
      fill="none"
      {...props}
    >
      <path 
      fill-rule="evenodd" 
      clip-rule="evenodd" 
      d="M1.71484 17.1612C1.71484 14.8265 7.34325 11.7734 14.2863 11.7734C21.2293 11.7734 26.8577 14.8265 26.8577 17.1612V22.5489C26.8577 24.8836 21.2293 27.9367 14.2863 27.9367C7.34325 27.9367 1.71484 24.8836 1.71484 22.5489V17.1612Z" 
      fill={color} 
      stroke="white" 
      stroke-width="1.79592" 
      stroke-linecap="round" 
      stroke-linejoin="round"
      />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.2863 22.5202C21.2293 22.5202 26.8577 19.636 26.8577 17.1576C26.8577 14.6792 21.2293 11.7734 14.2863 11.7734C7.34325 11.7734 1.71484 14.6774 1.71484 17.1576C1.71484 19.636 7.34325 22.5202 14.2863 22.5202Z" fill={color} stroke="white" stroke-width="1.79592" stroke-linecap="round" stroke-linejoin="round"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.71484 11.7745C1.71484 9.43978 7.34325 6.38672 14.2863 6.38672C21.2293 6.38672 26.8577 9.43978 26.8577 11.7745V17.1622C26.8577 19.4969 21.2293 22.55 14.2863 22.55C7.34325 22.55 1.71484 19.4969 1.71484 17.1622V11.7745Z" fill={color} stroke="white" stroke-width="1.79592" stroke-linecap="round" stroke-linejoin="round"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.2863 17.1335C21.2293 17.1335 26.8577 14.2492 26.8577 11.7709C26.8577 9.29251 21.2293 6.38672 14.2863 6.38672C7.34325 6.38672 1.71484 9.29072 1.71484 11.7709C1.71484 14.2492 7.34325 17.1335 14.2863 17.1335Z" fill={color} stroke="white" stroke-width="1.79592" stroke-linecap="round" stroke-linejoin="round"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.71484 6.38775C1.71484 4.05306 7.34325 1 14.2863 1C21.2293 1 26.8577 4.05306 26.8577 6.38775V11.7755C26.8577 14.1102 21.2293 17.1633 14.2863 17.1633C7.34325 17.1633 1.71484 14.1102 1.71484 11.7755V6.38775Z" fill={color} stroke="white" stroke-width="1.79592" stroke-linecap="round" stroke-linejoin="round"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.2863 11.7468C21.2293 11.7468 26.8577 8.86253 26.8577 6.38416C26.8577 3.9058 21.2293 1 14.2863 1C7.34325 1 1.71484 3.904 1.71484 6.38416C1.71484 8.86253 7.34325 11.7468 14.2863 11.7468Z" fill={color} stroke="white" stroke-width="1.79592" stroke-linecap="round" stroke-linejoin="round"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1426 23.1124C11.1426 20.7777 16.771 17.7246 23.714 17.7246C30.657 17.7246 36.2854 20.7777 36.2854 23.1124V28.5001C36.2854 30.8348 30.657 33.8879 23.714 33.8879C16.771 33.8879 11.1426 30.8348 11.1426 28.5001V23.1124Z" fill={color} stroke="white" stroke-width="1.79592" stroke-linecap="round" stroke-linejoin="round"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M23.714 28.4714C30.657 28.4714 36.2854 25.5871 36.2854 23.1088C36.2854 20.6304 30.657 17.7246 23.714 17.7246C16.771 17.7246 11.1426 20.6286 11.1426 23.1088C11.1426 25.5871 16.771 28.4714 23.714 28.4714Z" fill={color} stroke="white" stroke-width="1.79592" stroke-linecap="round" stroke-linejoin="round"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1426 17.7237C11.1426 15.389 16.771 12.3359 23.714 12.3359C30.657 12.3359 36.2854 15.389 36.2854 17.7237V23.1114C36.2854 25.4461 30.657 28.4992 23.714 28.4992C16.771 28.4992 11.1426 25.4461 11.1426 23.1114V17.7237Z" fill={color} stroke="white" stroke-width="1.79592" stroke-linecap="round" stroke-linejoin="round"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M23.714 23.0827C30.657 23.0827 36.2854 20.1985 36.2854 17.7201C36.2854 15.2417 30.657 12.3359 23.714 12.3359C16.771 12.3359 11.1426 15.2399 11.1426 17.7201C11.1426 20.1985 16.771 23.0827 23.714 23.0827Z" fill={color} stroke="white" stroke-width="1.79592" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
};

export default CoinLargeFill; 