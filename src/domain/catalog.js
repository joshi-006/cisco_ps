import { CATALOG } from "../data/vendorCatalog.js";
import { KEY_SEP } from "./constants.js";

export function createVariantKey(item, size, colour) {
  const t = (v) => String(v ?? "").trim();
  return `${t(item)}${KEY_SEP}${t(size)}${KEY_SEP}${t(colour)}`;
}

export const vendorIndex = new Map(
  CATALOG.map((variant) => [
    createVariantKey(variant.item, variant.size, variant.colour),
    variant,
  ])
);
export function findVariant(row) {
  return vendorIndex.get(createVariantKey(row.item, row.size, row.colour)) ?? null;
}