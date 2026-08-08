// normalize.test.js

import { describe, it, expect } from 'vitest';
import { normalizeOrder, findBlankField, isValidQuantity } from './normalize.js';

describe('normalizeOrder', () => {
  it('should trim string fields', () => {
    const rawOrder = {
      orderId: '  123  ',
      member: 'John  ',
      item: '  T-Shirt',
      size: 'L',
      colour: 'Blue   ',
      quantity: '  2  ',
    };
    const normalized = normalizeOrder(rawOrder);
    expect(normalized).toEqual({
      orderId: '123',
      member: 'John',
      item: 'T-Shirt',
      size: 'L',
      colour: 'Blue',
      quantityRaw: '2',
    });
  });

  it('should handle missing fields', () => {
    const rawOrder = {
      orderId: '123',
      member: undefined,
      item: null,
      size: 'L',
      colour: 'Blue',
    };
    const normalized = normalizeOrder(rawOrder);
    expect(normalized).toEqual({
      orderId: '123',
      member: '',
      item: '',
      size: 'L',
      colour: 'Blue',
      quantityRaw: '',
    });
  });
});

describe('findBlankField', () => {
  it('should return null if no required fields are blank', () => {
    const order = {
      orderId: '123',
      member: 'John',
      item: 'T-Shirt',
      size: 'L',
      colour: 'Blue',
    };
    expect(findBlankField(order)).toBeNull();
  });

  it('should return the name of the first blank required field', () => {
    const order = {
      orderId: '123',
      member: '',
      item: 'T-Shirt',
      size: '',
      colour: 'Blue',
    };
    expect(findBlankField(order)).toBe('member');
  });
});

describe('isValidQuantity', () => {
  it('should return true for valid positive integer quantities', () => {
    expect(isValidQuantity('1')).toBe(true);
    expect(isValidQuantity('10')).toBe(true);
    expect(isValidQuantity('999')).toBe(true);
  });

  it('should return false for invalid quantities', () => {
    expect(isValidQuantity('')).toBe(false);
    expect(isValidQuantity('0')).toBe(false);
    expect(isValidQuantity('-1')).toBe(false);
    expect(isValidQuantity('1.5')).toBe(false);
    expect(isValidQuantity('abc')).toBe(false);
  });
});