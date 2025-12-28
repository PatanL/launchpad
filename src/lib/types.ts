export type TokenStatus = "new" | "trending" | "graduating" | "graduated";

export interface TokenSummary {
  id: string;
  name: string;
  symbol: string;
  image: string;
  creator: string;
  mcap: number;
  vol24h: number;
  price: number;
  supply: number;
  createdAt: string;
  status: TokenStatus;
}

export interface TokenDetail extends TokenSummary {
  description?: string;
}

