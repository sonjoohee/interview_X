// AtomInput.jsx
import React from 'react';
import styles from '../../../../assets/styles/atoms_css/AtomInput.module.css';

const AtomInput = ({ type, value, onChange, placeholder }) => (
  <input
    className={styles.input}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default AtomInput;
