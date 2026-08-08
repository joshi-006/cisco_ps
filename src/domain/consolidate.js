// consolidate.js

import { CATALOG } from "../data/vendorCatalog.js";
import { findVariant } from "./catalog.js";

/**
 * Consolidates validated order rows into aggregated units and revenue per variant.
 *
 * @param {Object[]} orders - The array of validated order rows
 * @returns {Object} The consolidated result containing `rows`, `totalUnits`, and `totalRevenue`
 */
export function consolidate(orders) {
  const aggregatedUnits = new Map();

  // Aggregate units per variant
  for (const order of orders) {
    const { item, size, colour, quantity } = order;
    const variant = findVariant({ item, size, colour });
    const variantId = variant.variantId;
    const units = aggregatedUnits.get(variantId) || 0;
    aggregatedUnits.set(variantId, units + Number(quantity));
  }

  // Build result rows in vendor catalog order
  const rows = [];
  let totalUnits = 0;
  let totalRevenue = 0;

  for (const variant of CATALOG) {
    const variantId = variant.variantId;
    const units = aggregatedUnits.get(variantId) || 0;

    if (units > 0) {
      const revenue = units * variant.unitPrice;
      rows.push({ ...variant, units, revenue });
      totalUnits += units;
      totalRevenue += revenue;
    }
  }

  return { rows, totalUnits, totalRevenue };
}