// VendorTable.jsx

import React from 'react';
import { CATALOG } from '../data/vendorCatalog.js';

function VendorTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Variant ID</th>
          <th>Item</th>
          <th>Size</th>
          <th>Colour</th>
          <th>Unit Price</th>
        </tr>
      </thead>
      <tbody>
        {CATALOG.map((variant) => (
          <tr key={variant.variantId}>
            <td>{variant.variantId}</td>
            <td>{variant.item}</td>
            <td>{variant.size}</td>
            <td>{variant.colour}</td>
            <td>{variant.unitPrice}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default VendorTable;