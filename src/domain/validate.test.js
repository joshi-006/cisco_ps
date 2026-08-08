// validate.test.js

import { describe, it, expect } from 'vitest';
import { validateOrders } from './validate.js';
import { ERROR_CODES } from './constants.js';

describe('validateOrders', () => {
  it('should return null for valid orders', () => {
    const orders = [
      { orderId: '1', member: 'John', item: 'T-Shirt', size: 'L', colour: 'Navy', quantity: '2' },
      { orderId: '2', member: 'Jane', item: 'Hoodie', size: 'M', colour: 'Black', quantity: '1' },
    ];
    expect(validateOrders(orders)).toBeNull();
  });

  it('should return an error for orders with blank required fields', () => {
    const orders = [
      { orderId: '', member: 'John', item: 'T-Shirt', size: 'L', colour: 'Navy', quantity: '2' },
      { orderId: '2', member: '', item: 'Hoodie', size: 'M', colour: 'Black', quantity: '1' },
    ];
    expect(validateOrders(orders)).toEqual({ code: ERROR_CODES.INVALID_ORDER, orderId: '' });
  });

  it('should return an error for orders with duplicate order IDs', () => {
    const orders = [
      { orderId: '1', member: 'John', item: 'T-Shirt', size: 'L', colour: 'Navy', quantity: '2' },
      { orderId: '1', member: 'Jane', item: 'Hoodie', size: 'M', colour: 'Black', quantity: '1' },
    ];
    expect(validateOrders(orders)).toEqual({ code: ERROR_CODES.DUPLICATE_ORDER_ID, orderId: '1' });
  });

  it('should return an error for orders with invalid quantities', () => {
    const orders = [
      { orderId: '1', member: 'John', item: 'T-Shirt', size: 'L', colour: 'Navy', quantity: '0' },
      { orderId: '2', member: 'Jane', item: 'Hoodie', size: 'M', colour: 'Black', quantity: 'abc' },
    ];
    expect(validateOrders(orders)).toEqual({ code: ERROR_CODES.INVALID_QUANTITY, orderId: '1' });
  });

  it('should return an error for orders with unknown variants', () => {
    const orders = [
      { orderId: '1', member: 'John', item: 'T-Shirt', size: 'L', colour: 'Navy', quantity: '2' },
      { orderId: '2', member: 'Jane', item: 'Jacket', size: 'S', colour: 'Red', quantity: '1' },
    ];
    expect(validateOrders(orders)).toEqual({
      code: ERROR_CODES.UNKNOWN_VARIANT,
      orderId: '2',
      tuple: { item: 'Jacket', size: 'S', colour: 'Red' },
    });
  });

  it('should validate orders based on the defined precedence', () => {
    const orders = [
      { orderId: '1', member: '', item: 'T-Shirt', size: 'L', colour: 'Navy', quantity: '2' },
      { orderId: '2', member: 'Jane', item: 'Hoodie', size: 'M', colour: 'Black', quantity: '0' },
      { orderId: '2', member: 'Bob', item: 'Jacket', size: 'S', colour: 'Red', quantity: '1' },
    ];
    expect(validateOrders(orders)).toEqual({ code: ERROR_CODES.INVALID_ORDER, orderId: '1' });
  });
});
