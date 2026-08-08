// validate.js

import { ERROR_CODES } from "./constants.js";
import { normalizeOrder, findBlankField, isValidQuantity } from "./normalize.js";
import { findVariant } from "./catalog.js";

/**
 * Validates an array of order rows.
 *
 * Processes rows sequentially and stops at the first encountered error.
 * Validations follow the precedence: blank fields → duplicate order ID → invalid quantity → unknown variant.
 *
 * @param {Object[]} rawOrders - The array of raw order rows
 * @returns {Object|null} An error object `{ code, orderId, tuple? }` if validation fails, or `null` if all rows are valid
 */
export function validateOrders(rawOrders) {
  const seenOrderIds = new Set();

  for (const rawOrder of rawOrders) {
    const order = normalizeOrder(rawOrder);
    const { orderId, item, size, colour, quantityRaw } = order;

    // Check for blank required fields
    const blankField = findBlankField(order);
    if (blankField) {
      return { code: ERROR_CODES.INVALID_ORDER, orderId };
    }

    // Check for duplicate order ID
    if (seenOrderIds.has(orderId)) {
      return { code: ERROR_CODES.DUPLICATE_ORDER_ID, orderId };
    }
    seenOrderIds.add(orderId);

    // Check for invalid quantity
    if (!isValidQuantity(quantityRaw)) {
      return { code: ERROR_CODES.INVALID_QUANTITY, orderId };
    }

    // Check for unknown variant
    if (!findVariant(order)) {
      return { code: ERROR_CODES.UNKNOWN_VARIANT, orderId, tuple: { item, size, colour } };
    }
  }

  return null; // All validations passed
}