import React from "react";
import styled from "styled-components";

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
  border: 1px solid #4358ff;
  border-radius: 15px;
  user-select: none;
  gap: 4px;
`;

const TagText = styled.span`
  font-family: "Pretendard", Poppins;

  color: #4358ff;
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

const NetworkIcon = () => (
  <IconWrapper>
    <svg
      width="15"
      height="16"
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.07178 4.10326L4.85334 7.94744L6.84607 2.09082L9.50562 5.13532"
        stroke="#4358FF"
      />
      <path
        d="M4.81641 6.80566C5.42646 6.80566 5.92173 7.30014 5.92188 7.91016C5.92188 8.5203 5.42655 9.01562 4.81641 9.01562C4.20639 9.01548 3.71191 8.52021 3.71191 7.91016C3.71206 7.30023 4.20648 6.80581 4.81641 6.80566Z"
        fill="#0017CC"
      />
      <path
        d="M6.78809 0.984375C7.39814 0.984375 7.89341 1.47885 7.89355 2.08887C7.89355 2.69901 7.39823 3.19434 6.78809 3.19434C6.17807 3.19419 5.68359 2.69892 5.68359 2.08887C5.68374 1.47894 6.17816 0.98452 6.78809 0.984375Z"
        fill="#0017CC"
      />
      <path
        d="M1.10449 3.03223C1.71455 3.03223 2.20982 3.5267 2.20996 4.13672C2.20996 4.74686 1.71463 5.24219 1.10449 5.24219C0.494473 5.24204 0 4.74677 0 4.13672C0.000145297 3.52679 0.494563 3.03237 1.10449 3.03223Z"
        fill="#0017CC"
      />
      <path
        d="M8.99805 3.53418C9.6081 3.53418 10.1034 4.02865 10.1035 4.63867C10.1035 5.24881 9.60819 5.74414 8.99805 5.74414C8.38803 5.744 7.89355 5.24872 7.89355 4.63867C7.8937 4.02874 8.38812 3.53432 8.99805 3.53418Z"
        fill="#0017CC"
      />
    </svg>
  </IconWrapper>
);

const StakeHolderTag = ({ text = "Stakeholder" }) => {
  return (
    <TagContainer>
      <NetworkIcon />
      <TagText>{text}</TagText>
    </TagContainer>
  );
};

export default StakeHolderTag;
