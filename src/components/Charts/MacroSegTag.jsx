import React from "react";
import styled from "styled-components";

const PersonIcon = () => (
  <IconWrapper>
    <svg
      width="16"
      height="16"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5791 0.421387C7.10756 0.421595 9.15704 2.47104 9.15723 4.99951C9.15723 7.52814 7.10768 9.5784 4.5791 9.57861C2.05035 9.57861 0 7.52827 0 4.99951C0.000187339 2.47092 2.05046 0.421387 4.5791 0.421387Z"
        fill="#00A67C"
      />
      <path
        d="M4.5791 6.22607C6.01076 6.22607 7.30869 6.79602 8.26074 7.72021C7.42684 8.84696 6.08937 9.57841 4.58008 9.57861C3.07017 9.57861 1.73063 8.84758 0.896484 7.72021C1.84855 6.79564 3.14716 6.22614 4.5791 6.22607Z"
        fill="#148166"
      />
      <circle cx="4.57861" cy="3.99048" r="1.37183" fill="white" />
    </svg>
  </IconWrapper>
);

const MacroSegTag = ({ text = "Macro Seg" }) => {
  return (
    <TagContainer>
      <PersonIcon />
      <TagText>{text}</TagText>
    </TagContainer>
  );
};

export default MacroSegTag;

const TagContainer = styled.div`
  width: auto !important;
  height: auto !important;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.5;
  padding: 4px 12px !important;
  border-radius: 15px !important;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  background-color: transparent;
  border: 1px solid #5b9c8c;
  border-radius: 15px;
  user-select: none;
  gap: 4px;
`;

const TagText = styled.span`
  font-family: "Pretendard", Poppins;

  color: #5b9c8c;
  white-space: nowrap;
`;

const IconWrapper = styled.div`
  display: flex;
  padding-top: 2px;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  position: relative;
`;
