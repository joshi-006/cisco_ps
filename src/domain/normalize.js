import { REQUIRED_FIELDS } from "./constants.js";

/**
 * Normalizes one member order row.
 *
 * Trims string values for all fields, and keeps `quantity` as a STRING
 * (to be validated later). Returning a new object preserves immutability.
 *
 * @param {Object} row - The raw order row
 * @returns {Object} The normalized order row
 */
export function normalizeOrder(row) {
  const t = (v) => (v ?? "").trim();
  return {
    orderId: t(row.orderId),
    member: t(row.member),
    item: t(row.item),
    size: t(row.size),
    colour: t(row.colour),
    quantityRaw: t(row.quantity),
  };
}

/**
 * Checks if a normalized order row has any blank required fields.
 *
 * Required fields are defined in the `REQUIRED_FIELDS` constant.
 *
 * @param {Object} row - The normalized order row
 * @returns {string|null} The name of the first blank field, or `null` if none are blank
 */
export function findBlankField(row) {
  return REQUIRED_FIELDS.find((field) => row[field] === "") ?? null;
}

/**
 * Checks if a quantity string represents a valid positive integer.
 *
 * A valid quantity must match the regex `/^\d+$/` (all digits) and be greater than zero.
 * This prevents non-numeric or negative quantities from being considered valid.
 *
 * @param {string} quantityRaw - The raw quantity string
 * @returns {boolean} `true` if valid, `false` otherwise
 */
export function isValidQuantity(quantityRaw) {
  return /^\d+$/.test(quantityRaw) && Number(quantityRaw) > 0;
}
