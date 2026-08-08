const BUILT_IN_ORDERS = Object.freeze([
  Object.freeze({ uid: "u1", orderId: "O01", member: "Asha", item: "T-Shirt", size: "M", colour: "Navy", quantity: "2" }),
  Object.freeze({ uid: "u2", orderId: "O02", member: "Ben", item: "T-Shirt", size: "L", colour: "Navy", quantity: "1" }),
  Object.freeze({ uid: "u3", orderId: "O03", member: "Chen", item: "T-Shirt", size: "M", colour: "Navy", quantity: "1" }),
  Object.freeze({ uid: "u4", orderId: "O04", member: "Dia", item: "Hoodie", size: "M", colour: "Black", quantity: "2" }),
  Object.freeze({ uid: "u5", orderId: "O05", member: "Eshan", item: "T-Shirt", size: "M", colour: "White", quantity: "3" }),
]);

export function getBuiltInOrders() {
  return BUILT_IN_ORDERS.map((row) => ({ ...row }));
}