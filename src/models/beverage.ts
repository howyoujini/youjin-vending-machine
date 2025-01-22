export interface Beverage {
  id: string;
  isAvailable: true;
  name: string;
  icon: string;
  price: number;
  stock: number;
}

export const beverages: Beverage[] = [
  {
    id: "cola",
    isAvailable: true,
    name: "Cola",
    icon: "🥤",
    price: 1100,
    stock: 10,
  },
  {
    id: "water",
    isAvailable: true,
    name: "Water",
    icon: "💧",
    price: 600,
    stock: 10,
  },
  {
    id: "coffee",
    isAvailable: true,
    name: "Coffee",
    icon: "☕",
    price: 700,
    stock: 10,
  },
];
