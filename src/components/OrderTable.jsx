// OrderTable.jsx

import React from 'react';
import OrderRow from './OrderRow.jsx';

function OrderTable({ orders, onOrdersChange, onAddOrder }) {
  const handleOrderChange = (updatedOrder) => {
    const updatedOrders = orders.map((order) =>
      order.uid === updatedOrder.uid ? updatedOrder : order
    );
    onOrdersChange(updatedOrders);
  };

  const handleOrderDelete = (uid) => {
    const updatedOrders = orders.filter((order) => order.uid !== uid);
    onOrdersChange(updatedOrders);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Member</th>
            <th>Item</th>
            <th>Size</th>
            <th>Colour</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow
              key={order.uid}
              order={order}
              onChange={handleOrderChange}
              onDelete={handleOrderDelete}
            />
          ))}
        </tbody>
      </table>
      <button className="add-order" onClick={onAddOrder}>
        Add Order
      </button>
    </div>
  );
}

export default OrderTable;