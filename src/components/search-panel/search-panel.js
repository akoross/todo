import React, { useState } from 'react';
import './search-panel.css';

const SearchPanel = ({ search }) => {
  const [term, setTerm] = useState('');

  const searchChange = (e) => {
    setTerm(e.target.value);
    search(term);
  };

  return (
    <input
      className="search-input"
      placeholder="search"
      value={term}
      onChange={searchChange}
    />
  );
};

export default SearchPanel;
