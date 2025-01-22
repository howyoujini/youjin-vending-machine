export interface VendingMachineState {
  id: string;
  displayName: string;
}

export const states: Record<string, VendingMachineState> = {
  onSale: { id: "on-sale", displayName: "On Sale" },
  pending: { id: "pending", displayName: "Pending" },
} as const;
