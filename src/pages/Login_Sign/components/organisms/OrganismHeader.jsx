// src/components/organisms/OrganismHeader.jsx

import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logo.svg';

const OrganismHeader = () => (
  <Header>
    <Logo src={logo} alt="Logo" />
    <Title>My App</Title>
    <Nav>
      <NavList>
        <NavItem><NavLink href="/">Home</NavLink></NavItem>
        <NavItem><NavLink href="/about">About</NavLink></NavItem>
      </NavList>
    </Nav>
  </Header>
);

export default OrganismHeader;

// CSS-in-JS 스타일링
const Header = styled.header`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1rem;
`;

const Logo = styled.img`
  width: 50px;
`;

const Title = styled.h1`
  margin: 0;
`;

const Nav = styled.nav`
  margin-top: 1rem;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const NavItem = styled.li`
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
