
export const ERROR_CODES = Object.freeze({
  INVALID_ORDER: "INVALID_ORDER",
  DUPLICATE_ORDER_ID: "DUPLICATE_ORDER_ID",
  INVALID_QUANTITY: "INVALID_QUANTITY",
  UNKNOWN_VARIANT: "UNKNOWN_VARIANT",
});
export const KEY_SEP = "|";

export const REQUIRED_FIELDS = Object.freeze([
  "orderId",
  "member",
  "item",
  "size",
  "colour",
]);