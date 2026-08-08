// ResultTable.jsx

import React from 'react';

function ResultTable({ result }) {
  if (!result || result.rows.length === 0) {
    return <p>No consolidated results available. Please click Consolidate to view the vendor summary.</p>;
  }

  const maxUnits = Math.max(...result.rows.map((row) => row.units));

  return (
    <table>
      <thead>
        <tr>
          <th>Variant ID</th>
          <th>Item</th>
          <th>Size</th>
          <th>Colour</th>
          <th>Units</th>
          <th>Unit Price</th>
          <th>Revenue</th>
          <th>Units Bar</th>
        </tr>
      </thead>
      <tbody>
        {result.rows.map((row) => (
          <tr key={row.variantId}>
            <td>{row.variantId}</td>
            <td>{row.item}</td>
            <td>{row.size}</td>
            <td>{row.colour}</td>
            <td>{row.units}</td>
            <td>{row.unitPrice}</td>
            <td>{row.revenue}</td>
            <td>
              <div className="unit-bar">
                <div
                  className="unit-bar-fill"
                  style={{ width: `${(row.units / maxUnits) * 100}%` }}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResultTable;