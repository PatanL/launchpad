import type { TokenDetail } from "@/lib/types";

export const TOKENS: TokenDetail[] = [
  {
    id: "forge",
    name: "Forge",
    symbol: "FRGE",
    contract: "Fg3R3xBv1rxQ7P2XzJV1CkX2uKqk9s3mKX1q8XyZFRGE",
    image: "/images/boop-coin.png",
    creator: "@foundry",
    mcap: 2_450_000,
    vol24h: 321_000,
    price: 0.042,
    supply: 1_000_000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    status: "trending",
    description: "The mint-green launch token that powers Forge."
  },
  {
    id: "anvil",
    name: "Anvil",
    symbol: "ANVL",
    contract: "Anv1L9rJb92gk5tT7ZvE1dQ4HaQ8Pp2mJ7wAnv1L4X",
    image: "/images/token-sol.png",
    creator: "@smith",
    mcap: 860_000,
    vol24h: 120_000,
    price: 0.011,
    supply: 10_000_000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    status: "new",
  },
  {
    id: "mintglass",
    name: "Mint Glass",
    symbol: "MINT",
    contract: "MinT6La55sQk9PzQ3f8GL4ssC0nTrActXYZ12345",
    image: "/images/brand.png",
    creator: "@glazier",
    mcap: 1_250_000,
    vol24h: 420_000,
    price: 0.19,
    supply: 5_000_000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    status: "graduating",
  },
];

export function getToken(id: string) {
  return TOKENS.find((t) => t.id === id);
}
