// OrganismSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/styles/organisms_css/OrganismSidebar.module.css';

const OrganismSidebar = ({ items }) => (
  <aside className={styles.sidebar}>
    <ul>
      {items?.map((item, index) => (
        <li key={index}>
          <Link to={item.link}>{item.name}</Link>
        </li>
      ))}
    </ul>
  </aside>
);

export default OrganismSidebar;
