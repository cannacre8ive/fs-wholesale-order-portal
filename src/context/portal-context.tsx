"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { initialOrders, initialRequests, strains } from "@/lib/data";
import type { AccessRequest, AccountMode, Order, OrderStatus, Perspective, Strain, View } from "@/lib/types";

interface PortalContextValue {
  perspective: Perspective;
  accountMode: AccountMode;
  view: View;
  orders: Order[];
  requests: AccessRequest[];
  inventory: Record<string, number>;
  setPerspective: (value: Perspective) => void;
  setAccountMode: (value: AccountMode) => void;
  setView: (value: View) => void;
  placeOrder: (order: Omit<Order, "id" | "placed" | "status">) => Order;
  advanceOrder: (id: string) => void;
  updateInventory: (id: string, amount: number) => void;
  updateRequest: (id: string, status: AccessRequest["status"]) => void;
  resetDemo: () => void;
}

const PortalContext = createContext<PortalContextValue | null>(null);
const storageKey = "flower-spectrum-portal-v1";
const statusFlow: OrderStatus[] = ["Pending", "Confirmed", "Scheduled", "Delivered"];

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [perspective, setPerspectiveState] = useState<Perspective>("buyer");
  const [accountMode, setAccountMode] = useState<AccountMode>("approved");
  const [view, setView] = useState<View>("menu");
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [requests, setRequests] = useState<AccessRequest[]>(initialRequests);
  const [inventory, setInventory] = useState<Record<string, number>>(() => Object.fromEntries(strains.map((strain) => [strain.id, strain.available])));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const hydration = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved) as Pick<PortalContextValue, "orders" | "requests" | "inventory">;
          setOrders(parsed.orders ?? initialOrders);
          setRequests(parsed.requests ?? initialRequests);
          setInventory(parsed.inventory ?? Object.fromEntries(strains.map((strain) => [strain.id, strain.available])));
        }
      } catch { /* Ignore malformed demo state. */ }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(hydration);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(storageKey, JSON.stringify({ orders, requests, inventory }));
  }, [hydrated, inventory, orders, requests]);

  const setPerspective = (value: Perspective) => {
    setPerspectiveState(value);
    setView(value === "buyer" ? "menu" : "orders");
  };

  const placeOrder = (draft: Omit<Order, "id" | "placed" | "status">) => {
    const order: Order = { ...draft, id: `ORD-${1100 + orders.length}`, placed: new Date().toISOString().slice(0, 10), status: "Pending" };
    setOrders((current) => [order, ...current]);
    return order;
  };

  const advanceOrder = (id: string) => setOrders((current) => current.map((order) => {
    if (order.id !== id) return order;
    const next = statusFlow[Math.min(statusFlow.indexOf(order.status) + 1, statusFlow.length - 1)];
    return { ...order, status: next };
  }));

  const resetDemo = () => {
    setOrders(initialOrders);
    setRequests(initialRequests);
    setInventory(Object.fromEntries(strains.map((strain) => [strain.id, strain.available])));
    localStorage.removeItem(storageKey);
  };

  const value: PortalContextValue = {
    perspective, accountMode, view, orders, requests, inventory,
    setPerspective, setAccountMode, setView, placeOrder, advanceOrder,
    updateInventory: (id, amount) => setInventory((current) => ({ ...current, [id]: Math.max(0, amount) })),
    updateRequest: (id, status) => setRequests((current) => current.map((request) => request.id === id ? { ...request, status } : request)),
    resetDemo,
  };

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
}

export function usePortal() {
  const value = useContext(PortalContext);
  if (!value) throw new Error("usePortal must be used within PortalProvider");
  return value;
}

export function strainById(id: string): Strain {
  const strain = strains.find((item) => item.id === id);
  if (!strain) throw new Error(`Unknown strain: ${id}`);
  return strain;
}
