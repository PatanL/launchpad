import type { TokenDetail } from "@/lib/types";

export const TOKENS: TokenDetail[] = [
  {
    id: "forge",
    name: "Forge",
    symbol: "FRGE",
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

