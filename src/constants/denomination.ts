export const KRW_DENOMINATIONS = [100, 500, 1000, 5000, 10000] as const;

export type Denomination = (typeof KRW_DENOMINATIONS)[number];
