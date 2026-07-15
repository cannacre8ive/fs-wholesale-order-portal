import type { AccessRequest, Order, Strain } from "@/lib/types";

const tiers = (one: number, five: number, ten: number) => [
  { min: 1, price: one },
  { min: 5, price: five },
  { min: 10, price: ten },
];

export const strains: Strain[] = [
  { id: "gmo", name: "GMO", cross: "Chem D × GSC", breeder: "Mamiko Seeds cut", harvest: "2026-06-10", available: 12, thc: 29.4, aroma: "Roasted garlic and diesel funk over cracked pepper and a savory, oniony depth.", profile: "gas", profileLabel: "Gas / Fuel", color: "#c9a84c", verified: false, tiers: tiers(1400, 1250, 1100) },
  { id: "gorilla-glue", name: "Gorilla Glue #4", cross: "Chem Sis × Sour Dubb × Chocolate Diesel", breeder: "GG Strains lineage", harvest: "2026-06-05", available: 8, thc: 26.8, aroma: "Cracked black pepper and clove over a loud, sticky diesel.", profile: "spicy", profileLabel: "Spicy / Warm", color: "#9e6b4a", verified: false, tiers: tiers(1300, 1175, 1050) },
  { id: "grapefruit-slushie", name: "Grapefruit Slushie", cross: "Grapefruit × Slushie", breeder: "Ideal Cannabis selection", harvest: "2026-06-18", available: 15, thc: 24.1, aroma: "Pink grapefruit and lemon zest, bright and juicy, over a soft sweet base.", profile: "citrus", profileLabel: "Citrus / Bright", color: "#d4a843", verified: false, tiers: tiers(1200, 1075, 950) },
  { id: "strawberry-shortcake", name: "Strawberry Shortcake", cross: "Strawberry × White Cake", breeder: "Ideal Cannabis selection", harvest: "2026-06-20", available: 10, thc: 22.6, aroma: "Ripe strawberry and stone fruit over vanilla cream — candy-sweet and soft.", profile: "fruit", profileLabel: "Fruity / Sweet", color: "#b75f4a", verified: false, tiers: tiers(1150, 1025, 900) },
  { id: "blue-magoo", name: "Blue Magoo", cross: "DJ Short Blueberry × William's Wonder", breeder: "Oregon heirloom cut", harvest: "2026-05-30", available: 5, thc: 20.3, aroma: "Blueberry and lavender with a gentle earthy base.", profile: "floral", profileLabel: "Floral / Soft", color: "#b98bbe", verified: false, tiers: tiers(1250, 1125, 1000) },
  { id: "layer-cake", name: "Layer Cake", cross: "Wedding Cake × GMO", breeder: "House cut · Ideal", harvest: "2026-06-14", available: 9, thc: 25.9, aroma: "Vanilla cake and soft florals over a warm, faintly savory spice.", profile: "dessert", profileLabel: "Dessert / Creamy", color: "#d6b58a", verified: false, tiers: tiers(1300, 1175, 1050) },
  { id: "kush-mints", name: "Kush Mints", cross: "Bubba Kush × Animal Mints", breeder: "Seed Junky Genetics", harvest: "2026-06-22", available: 14, thc: 34.6, aroma: "Lemon oil and lavender up front, green resin and a cool mint-herb lift.", profile: "citrus", profileLabel: "Citrus / Bright", color: "#6aafa0", verified: true, tiers: tiers(1450, 1300, 1150) },
  { id: "tiger-bomb", name: "Tiger Bomb", cross: "Ideal Cannabis selection", breeder: "House cut · Ideal", harvest: "2026-06-08", available: 7, thc: 27.7, aroma: "Bright citrus over a gassy, peppered core — loud and high-definition.", profile: "gas", profileLabel: "Gas / Fuel", color: "#c9a84c", verified: false, tiers: tiers(1350, 1225, 1100) },
  { id: "wedding-cake-gelato", name: "Wedding Cake Gelato", cross: "Wedding Cake × Gelato", breeder: "House cut · Ideal", harvest: "2026-06-16", available: 11, thc: 26.2, aroma: "Sweet cream and vanilla with a soft lavender lift.", profile: "dessert", profileLabel: "Dessert / Creamy", color: "#d6b58a", verified: false, tiers: tiers(1300, 1175, 1050) },
  { id: "frosted-cherry-cookies", name: "Frosted Cherry Cookies", cross: "Cherry Pie × GSC", breeder: "Ideal Cannabis selection", harvest: "2026-06-12", available: 13, thc: 23.8, aroma: "Cherry and sweet dough over a soft spice — fruity, rich, and dessert-leaning.", profile: "fruit", profileLabel: "Fruity / Sweet", color: "#b75f4a", verified: false, tiers: tiers(1200, 1075, 950) },
  { id: "sungrown-harvest", name: "Sungrown Harvest", cross: "Outdoor · sun-grown", breeder: "Field blend · Ideal", harvest: "2026-05-20", available: 40, thc: 18.9, aroma: "Damp earth, dry hop, and fresh-cut wood — grounded and old-school.", profile: "earth", profileLabel: "Earthy / Dank", color: "#6b8e5a", verified: false, tiers: tiers(900, 800, 700) },
];

export const initialOrders: Order[] = [
  { id: "ORD-1003", strainId: "kush-mints", pounds: 5, pricePerPound: 1300, total: 6500, placed: "2026-06-28", delivery: "2026-07-10", status: "Confirmed" },
  { id: "ORD-0998", strainId: "gmo", pounds: 3, pricePerPound: 1400, total: 4200, placed: "2026-06-12", delivery: "2026-06-19", status: "Delivered" },
  { id: "ORD-0991", strainId: "sungrown-harvest", pounds: 10, pricePerPound: 700, total: 7000, placed: "2026-05-26", delivery: "2026-06-02", status: "Delivered" },
];

export const initialRequests: AccessRequest[] = [
  { id: "rq-1", shop: "Good Times Dispensary", city: "Sellwood · Portland", license: "OLCC-050-10248C1", status: "pending" },
  { id: "rq-2", shop: "Urban Farmacy", city: "NE Portland", license: "OLCC-050-11873F4", status: "pending" },
  { id: "rq-3", shop: "Portal 503", city: "SE Portland", license: "OLCC-050-11412A9", status: "approved" },
];

export function priceFor(strain: Strain, pounds: number) {
  return [...strain.tiers].reverse().find((tier) => pounds >= tier.min) ?? strain.tiers[0];
}

export const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
export const shortDate = (value: string) => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
