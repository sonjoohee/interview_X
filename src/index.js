// index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// import './assets/styles/main.css'; // main.css 추가
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  /* StrictMode 활성화 */
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  /* StrictMode 비활성화 */
  <App />
);
reportWebVitals();
