// Controls.jsx

import React from 'react';

function Controls({ onConsolidate, onReset }) {
  return (
    <div className="controls">
      <button onClick={onConsolidate}>Consolidate</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default Controls;