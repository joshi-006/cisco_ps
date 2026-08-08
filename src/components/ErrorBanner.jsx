// ErrorBanner.jsx

import React from 'react';
import { ERROR_CODES } from '../domain/constants.js';

function getErrorMessage(error) {
  switch (error.code) {
    case ERROR_CODES.INVALID_ORDER:
      return `Order ${error.orderId} has missing or invalid fields.`;
    case ERROR_CODES.DUPLICATE_ORDER_ID:
      return `Order ${error.orderId} has a duplicate ID.`;
    case ERROR_CODES.INVALID_QUANTITY:
      return `Order ${error.orderId} has an invalid quantity.`;
    case ERROR_CODES.UNKNOWN_VARIANT:
      const { item, size, colour } = error.tuple;
      return `Order ${error.orderId} has an unknown variant: ${item}, ${size}, ${colour}.`;
    default:
      return 'An unknown error occurred.';
  }
}

function ErrorBanner({ error }) {
  if (!error) {
    return null;
  }

  const message = getErrorMessage(error);

  return (
    <div className="error-banner">
      <p>{message}</p>
    </div>
  );
}

export default ErrorBanner;