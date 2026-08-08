// consolidate.test.js

import { describe, it, expect } from 'vitest';
import { consolidate } from './consolidate.js';

describe('consolidate', () => {
  it('should correctly consolidate validated orders', () => {
    const orders = [
      { item: 'T-Shirt', size: 'M', colour: 'Navy', quantity: '2' },
      { item: 'T-Shirt', size: 'L', colour: 'Navy', quantity: '1' },
      { item: 'T-Shirt', size: 'M', colour: 'White', quantity: '3' },
      { item: 'Hoodie', size: 'M', colour: 'Black', quantity: '4' },
    ];
    const result = consolidate(orders);

    expect(result.rows).toEqual([
      { variantId: 'V01', item: 'T-Shirt', size: 'M', colour: 'Navy', unitPrice: 450, units: 2, revenue: 900 },
      { variantId: 'V02', item: 'T-Shirt', size: 'L', colour: 'Navy', unitPrice: 450, units: 1, revenue: 450 },
      { variantId: 'V03', item: 'T-Shirt', size: 'M', colour: 'White', unitPrice: 425, units: 3, revenue: 1275 },
      { variantId: 'V04', item: 'Hoodie', size: 'M', colour: 'Black', unitPrice: 800, units: 4, revenue: 3200 },
    ]);
    expect(result.totalUnits).toBe(10);
    expect(result.totalRevenue).toBe(5825);
  });

  it('should preserve the vendor catalog order in the result rows', () => {
    const orders = [
      { item: 'Hoodie', size: 'M', colour: 'Black', quantity: '1' },
      { item: 'T-Shirt', size: 'M', colour: 'White', quantity: '2' },
      { item: 'T-Shirt', size: 'L', colour: 'Navy', quantity: '3' },
      { item: 'T-Shirt', size: 'M', colour: 'Navy', quantity: '4' },
    ];
    const result = consolidate(orders);

    expect(result.rows.map(row => row.variantId)).toEqual(['V01', 'V02', 'V03', 'V04']);
  });

  it('should calculate revenue using the catalog unitPrice', () => {
    const orders = [
      { item: 'T-Shirt', size: 'M', colour: 'White', quantity: '2' },
      { item: 'Hoodie', size: 'M', colour: 'Black', quantity: '1' },
    ];
    const result = consolidate(orders);

    expect(result.rows).toContainEqual({ variantId: 'V03', item: 'T-Shirt', size: 'M', colour: 'White', unitPrice: 425, units: 2, revenue: 850 });
    expect(result.rows).toContainEqual({ variantId: 'V04', item: 'Hoodie', size: 'M', colour: 'Black', unitPrice: 800, units: 1, revenue: 800 });
  });

  it('should skip variants with zero units in the result rows', () => {
    const orders = [
      { item: 'T-Shirt', size: 'L', colour: 'Navy', quantity: '0' },
      { item: 'Hoodie', size: 'M', colour: 'Black', quantity: '2' },
    ];
    const result = consolidate(orders);

    expect(result.rows).toEqual([
      { variantId: 'V04', item: 'Hoodie', size: 'M', colour: 'Black', unitPrice: 800, units: 2, revenue: 1600 },
    ]);
  });

  it('should return correct totalUnits and totalRevenue', () => {
    const orders = [
      { item: 'T-Shirt', size: 'M', colour: 'Navy', quantity: '3' },
      { item: 'T-Shirt', size: 'L', colour: 'Navy', quantity: '2' },
      { item: 'Hoodie', size: 'M', colour: 'Black', quantity: '1' },
    ];
    const result = consolidate(orders);

    expect(result.totalUnits).toBe(6);
    expect(result.totalRevenue).toBe(3050);
  });

  it('should handle an empty orders array', () => {
    const orders = [];
    const result = consolidate(orders);

    expect(result.rows).toEqual([]);
    expect(result.totalUnits).toBe(0);
    expect(result.totalRevenue).toBe(0);
  });
});