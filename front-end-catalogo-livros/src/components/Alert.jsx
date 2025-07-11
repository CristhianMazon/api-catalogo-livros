import React from 'react';
import { useAlert } from '../contexts/AlertContext';

function Alert() {
  const { alert } = useAlert();

  if (!alert.message) {
    return null;
  }

  return (
    <div className={`alert-box ${alert.type}`}>
      {alert.message}
    </div>
  );
}

export default Alert;