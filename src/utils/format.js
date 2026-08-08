/**
 * Formats a numeric amount as Indian Rupees, e.g. 5825 -> "₹5,825".
 *
 * @param {number} amount - The amount in rupees
 * @returns {string} The formatted rupee string
 */
export function formatRupees(amount) {
  return `₹${Number(amount ?? 0).toLocaleString("en-IN")}`;
}
