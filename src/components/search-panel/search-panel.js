import React, { useRef } from 'react';
import './search-panel.css';

const SearchPanel = ({ search }) => {
  const termRef = useRef(null);

  const searchChange = () => {
    search(termRef.current.value);
  };

  return (
    <input
      className="search-input"
      placeholder="search"
      ref={termRef}
      onChange={searchChange}
    />
  );
};

export default SearchPanel;
