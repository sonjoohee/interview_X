import { createGlobalStyle } from "styled-components";
import { palette } from "./styles/Palette";

const GlobalStyles = createGlobalStyle`
  // @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  // @font-face {
  //   font-family: 'Poppins';
  //   font-weight: 400;
  //   font-style: normal;
  //   src: url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Regular.eot');
  //   src: url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Regular.eot?#iefix') format('embedded-opentype'),
  //       url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Regular.woff2') format('woff2'),
  //       url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Regular.woff') format('woff'),
  //       url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Regular.ttf') format("truetype");
  //   unicode-range: U+0041-005A, U+0061-007A; //영문, 숫자
  // } 
  // @font-face {
  //   font-family: 'Poppins';
  //   font-weight: 600;
  //   font-style: normal;
  //   src: url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-SemiBold.eot');
  //   src: url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-SemiBold.eot?#iefix') format('embedded-opentype'),
  //       url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-SemiBold.woff2') format('woff2'),
  //       url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-SemiBold.woff') format('woff'),
  //       url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-SemiBold.ttf') format("truetype");
  //   unicode-range: U+0041-005A, U+0061-007A; //영문, 숫자
  // } 
  // @font-face {
  //     font-family: 'Poppins';
  //     font-weight: 700;
  //     font-style: normal;
  //     src: url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Bold.eot');
  //     src: url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Bold.eot?#iefix') format('embedded-opentype'),
  //         url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Bold.woff2') format('woff2'),
  //         url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Bold.woff') format('woff'),
  //         url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Bold.ttf') format("truetype");
  //     unicode-range: U+0041-005A, U+0061-007A; //영문, 숫자
  // } 

  
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJfecg.woff2) format('woff2');
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039; //영문, 숫자
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2) format('woff2');
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039; //영문, 숫자
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2) format('woff2');
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039; //영문, 숫자
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
    // unicode-range: U+AC00-D7A3, U+3200-33FF, U+1100-11FF, U+3130-318F, U+0030-0039, U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E, U+201C, U+201D, U+00B7, U+0020-007E;
    unicode-range: U+AC00-D7A3, U+1100-11FF, U+3130-318F, U+3200-33FF, U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    // unicode-range: U+AC00-D7A3, U+3200-33FF, U+1100-11FF, U+3130-318F, U+0030-0039, U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E, U+201C, U+201D, U+00B7, U+0020-007E;
    unicode-range: U+AC00-D7A3, U+1100-11FF, U+3130-318F, U+3200-33FF, U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    // unicode-range: U+AC00-D7A3, U+3200-33FF, U+1100-11FF, U+3130-318F, U+0030-0039, U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E, U+201C, U+201D, U+00B7, U+0020-007E;
    unicode-range: U+AC00-D7A3, U+1100-11FF, U+3130-318F, U+3200-33FF, U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
    // unicode-range: U+AC00-D7A3, U+3200-33FF, U+1100-11FF, U+3130-318F, U+0030-0039, U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E, U+201C, U+201D, U+00B7, U+0020-007E;
    unicode-range: U+AC00-D7A3, U+1100-11FF, U+3130-318F, U+3200-33FF, U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E;
  }

  @font-face {
    font-family: 'Poly';
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    // src: url(https://fonts.gstatic.com/s/poly/v16/MQpV-W6wKNitdLK6qErt.woff2) format('woff2');
    src: url(/MQpV-W6wKNitdLK6qErt.woff2) format('woff2');
    src: url(/MQpV-W6wKNitdLK6qErt.woff) format('woff');
  }

  *, *:before, *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    overflow-y: scroll;
  }

  html, body {
    font-size:16px;
  }

  body {
    width: 100%;
    font-family: Pretendard, Poppins, 'Poly';
    font-weight:400;
    color: ${palette.black};
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${palette.outlineGray};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-button {
    display: none;
  }

  li {
    list-style:none;
  }

  a {
    color: ${palette.black};
    text-decoration:none;
    display:inline-block;
    &:hover {
      transition: all .5s;
    }
  }

  button {
    cursor:pointer;
  }

  select {
    position:relative;
    padding:15px 20px;
    border-radius:10px;
    border:1px solid #d9d9d9;
    outline:0;
    background:transparent;

    &:focus {
      border:1px solid #0453F4;
    }
  }
`;
export default GlobalStyles;
