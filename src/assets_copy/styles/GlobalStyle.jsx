import { createGlobalStyle } from "styled-components";
import { palette } from "./Palette";

const GlobalStyles = createGlobalStyle`
  // @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  @font-face {
    font-family: 'Poppins';
    font-weight: 400;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Regular.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Regular.eot?#iefix') format('embedded-opentype'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Regular.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Regular.woff') format('woff'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Regular.ttf') format("truetype");
    unicode-range: U+0041-005A, U+0061-007A; //영문, 숫자
} 
  @font-face {
    font-family: 'Poppins';
    font-weight: 600;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-SemiBold.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-SemiBold.eot?#iefix') format('embedded-opentype'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-SemiBold.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-SemiBold.woff') format('woff'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-SemiBold.ttf') format("truetype");
    unicode-range: U+0041-005A, U+0061-007A; //영문, 숫자
} 
@font-face {
    font-family: 'Poppins';
    font-weight: 700;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Bold.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Bold.eot?#iefix') format('embedded-opentype'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Bold.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Bold.woff') format('woff'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Bold.ttf') format("truetype");
    unicode-range: U+0041-005A, U+0061-007A; //영문, 숫자
} 

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
    unicode-range: U+AC00-D7A3, U+0030-0039, U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E, U+201C, U+201D, U+00B7; //국문, 특수문자
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    unicode-range: U+AC00-D7A3, U+0030-0039, U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E, U+201C, U+201D, U+00B7; //국문, 특수문자
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    unicode-range: U+AC00-D7A3, U+0030-0039, U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E, U+201C, U+201D, U+00B7; //국문, 특수문자
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
    unicode-range: U+AC00-D7A3, U+0030-0039, U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E, U+201C, U+201D, U+00B7; //국문, 특수문자
  }
  

  *, *:before, *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-size:16px;
  }

  body {
    width: 100%;
    font-family: Pretendard, Poppins;
    font-weight:400;
    color: ${palette.black};
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
`
export default GlobalStyles;


