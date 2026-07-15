export type Perspective = "buyer" | "seller";
export type AccountMode = "guest" | "approved";
export type BuyerView = "menu" | "account" | "promo";
export type SellerView = "orders" | "inventory" | "requests";
export type View = BuyerView | SellerView;

export interface PriceTier {
  min: number;
  price: number;
}

export interface Strain {
  id: string;
  name: string;
  cross: string;
  breeder: string;
  harvest: string;
  available: number;
  thc: number;
  aroma: string;
  profile: string;
  profileLabel: string;
  color: string;
  verified: boolean;
  tiers: PriceTier[];
}

export type OrderStatus = "Pending" | "Confirmed" | "Scheduled" | "Delivered";

export interface Order {
  id: string;
  strainId: string;
  pounds: number;
  pricePerPound: number;
  total: number;
  placed: string;
  delivery: string;
  status: OrderStatus;
}

export interface AccessRequest {
  id: string;
  shop: string;
  city: string;
  license: string;
  status: "pending" | "approved" | "declined";
}
