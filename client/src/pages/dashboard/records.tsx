import { useState } from 'react';
import { useRecords } from '../../context/records-context';
import './records.css';

export const Records = () => {
  const { records } = useRecords();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="records-dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        <span>Breakdown</span>
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
      </div>
      <div className={`records-container ${isOpen ? 'open' : 'closed'}`}>
        {records.map(record => (
          <div key={record.id} className="record-wrapper">
            <div className="record-card">
              <div className="record-header">
                <div className="record-description">
                  <strong>{record.description}</strong>
                  <span className="record-amount">₹ {record.amount.toFixed(2)}</span>
                </div>
              </div>
              <div className="record-footer">
                <span className="record-category">{record.category}</span>
                <span className="record-payment">{record.payment}</span>
                <span className="record-date">
                  {new Date(record.date).toLocaleDateString()}{' '}
                  {new Date(record.date).toLocaleTimeString()}
                </span>
              </div>
            </div>
            <button className="record-delete" onClick={() => handleDelete(record.id)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );

  function handleDelete(id: string | undefined) {
    // Handle delete functionality
  }
};
