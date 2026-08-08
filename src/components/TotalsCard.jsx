// TotalsCard.jsx

import React from 'react';
import { formatRupees } from '../utils/format.js';

function TotalsCard({ result }) {
  if (!result) {
    return null;
  }

  const { totalUnits, totalRevenue } = result;

  return (
    <div className="totals-card">
      <h3>Totals</h3>
      <p>Total Units: {totalUnits}</p>
      <p>Total Revenue: {formatRupees(totalRevenue)}</p>
    </div>
  );
}

export default TotalsCard;