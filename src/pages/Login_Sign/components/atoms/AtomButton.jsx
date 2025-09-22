import React from 'react';

const AtomButton = ({ onClick, children, className }) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
);

export default AtomButton;
