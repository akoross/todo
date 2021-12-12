import React from 'react';

const ItemStatusFilter = ({ filter, onFilterChange }) => {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ];

  const buttonItems = buttons.map(({ name, label }) => {
    const isActive = filter === name;
    const clazz = isActive ? 'btn-info' : 'btn-outline-info';
    return (
      <button
        type="button"
        className={`btn ${clazz}`}
        key={name}
        onClick={() => onFilterChange(name)}
      >
        {label}
      </button>
    );
  });

  return <div className="btn-group">{buttonItems}</div>;
};

export default ItemStatusFilter;
