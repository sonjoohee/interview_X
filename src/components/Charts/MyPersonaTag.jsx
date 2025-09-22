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
  border: 1px solid #222e84;
  border-radius: 15px;
  user-select: none;
  gap: 4px;
`;

const TagText = styled.span`
  font-family: "Pretendard", "Poppins";

  color: #222e84;
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

const PlusIcon = () => (
  <IconWrapper>
    <svg
      width="16"
      height="16"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5791 0.421387C7.10756 0.421595 9.15704 2.47104 9.15723 4.99951C9.15723 7.52814 7.10768 9.5784 4.5791 9.57861C2.05035 9.57861 0 7.52827 0 4.99951C0.000187339 2.47092 2.05046 0.421387 4.5791 0.421387ZM4.5791 2.40576C4.24447 2.40584 3.9718 2.67661 3.97168 3.01123V4.39307H2.58984C2.25542 4.39348 1.98438 4.665 1.98438 4.99951C1.98454 5.33389 2.25552 5.60457 2.58984 5.60498H3.97168V6.98779L3.9834 7.10986C4.03998 7.38576 4.28556 7.59396 4.57812 7.59424C4.87089 7.59421 5.11619 7.38587 5.17285 7.10986L5.18457 6.98779V5.60498H6.56738L6.68848 5.59326C6.96446 5.53666 7.17271 5.29221 7.17285 4.99951C7.17285 4.70668 6.96456 4.46141 6.68848 4.40479L6.56738 4.39307H5.18457V3.01123C5.18445 2.67676 4.91353 2.40608 4.5791 2.40576Z"
        fill="#222E84"
      />
    </svg>
  </IconWrapper>
);

const MyPersonaTag = ({ text = "마이페르소나" }) => {
  return (
    <TagContainer>
      <PlusIcon />
      <TagText>{text}</TagText>
    </TagContainer>
  );
};

export default MyPersonaTag;
