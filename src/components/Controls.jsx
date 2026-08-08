// Controls.jsx

import React from 'react';

function Controls({ onConsolidate, onReset }) {
  return (
    <div className="controls">
      <button onClick={onConsolidate}>Consolidate</button>
      <button onClick={onReset}>Reset</button>
      <button onClick={onClearAll}>Clear All</button>
    </div>
  );
}

export default Controls;