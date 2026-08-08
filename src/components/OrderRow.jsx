// OrderRow.jsx

import React from 'react';

function OrderRow({ order, onChange, onDelete }) {
  const handleFieldChange = (field, value) => {
    const updatedOrder = { ...order, [field]: value };
    onChange(updatedOrder);
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          value={order.orderId}
          onChange={(e) => handleFieldChange('orderId', e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={order.member}
          onChange={(e) => handleFieldChange('member', e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={order.item}
          onChange={(e) => handleFieldChange('item', e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={order.size}
          onChange={(e) => handleFieldChange('size', e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={order.colour}
          onChange={(e) => handleFieldChange('colour', e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={order.quantity}
          onChange={(e) => handleFieldChange('quantity', e.target.value)}
        />
      </td>
      <td>
        <button onClick={() => onDelete(order.uid)}>Delete</button>
      </td>
    </tr>
  );
}

export default OrderRow;