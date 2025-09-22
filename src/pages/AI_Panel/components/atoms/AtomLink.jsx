// src/AI_List_Page/components/atoms/AtomLink.jsx
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AtomLink = ({ to, children, className, ...props }) => (
  <StyledLink to={to} className={className} {...props}>
    {children}
  </StyledLink>
);

export default AtomLink;


const StyledLink = styled(Link)`
  display: inline-block;
  width: 33px;
  height: 33px;
  font-size: 0.875rem;
  color: ${(props) => props.color || "inherit"};
  line-height: 33px;
  margin: 0 2px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.borderColor || "white"};
  transition: all 0.5s;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.bgImage || "none"});

  &:hover {
    border: 1px solid ${(props) => props.hoverBorderColor || props.borderColor || "white"};
  }

  &.now {
    color: ${(props) => props.nowColor || "blue"};
    pointer-events: none;
    background: rgba(4, 83, 244, 0.1);
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.3;
  }
`;