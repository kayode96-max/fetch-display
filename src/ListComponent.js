import React from 'react';

const ListComponent = ({ items, renderItem, emptyMessage = 'No items available', className = '' }) => {
  if (!items || items.length === 0) {
    return <p className="empty-message">{emptyMessage}</p>;
  }
  return (
    <ul className={`list ${className}`}>
      {items.map((item, idx) => (
        <li className="list-item" key={item.id || idx}>{renderItem(item, idx)}</li>
      ))}
    </ul>
  );
};

export default ListComponent;
