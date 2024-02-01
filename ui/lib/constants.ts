import { PublicKey } from "@solana/web3.js";

export const CANDY_MACHINE_ADDRESS = new PublicKey("5nLSyfW1YUhSryZdD2cZ8hMxpioWgMF7Ztp9bCjD7enM")
export const COLLECTION_MINT_ADDRESS = new PublicKey("G1qbjtUHKiXbVZziRA6rdFs8LV2wYJagdXtNYayCkhRW")
export const SELLER_PUBLIC_KEY =  new PublicKey("2r473uSgx2LeA1yRbSPumRkuxtvwkKAyL4tMwLDpFvjS")
export const BLOCKCHAIN_RPC_ENDPOINT = "https://devnet.helius-rpc.com/?api-key=be79a4c6-f8c0-4a7c-8acc-6a1f071edf8d"
export const SELLER_PRIVATE_KEY = "5S8usCS6B75ZcEwh8P15P3nmekqvUu1q9NzZft2TZEYdW9ZhysYZGrJ6V2qtY48XgMxdXTLCsE9qsrp3Z6K73qGU";
export const CONNECTION_LINK = "https://api.devnet.solana.com";

type MyHashMap = Record<string, string>;

// Create a hash map
export const MINTED_PUBLIC_KEY_MAP: MyHashMap = {
  "Fire over Ocean": "BXHqDtQgnjPgHPyNA99baZbiq5K91tTvSsDzcZvDvJ7L",
  "Snow": "HvSioULnfCBzkH9HZ7jRJaXvxZmn6nUuGYbDw8sKheSG",
  "RainBow Splash": "3MbpVpda4r2Cn4JDij3HvkXSoxWdpkfKvo2vcnY4Bq9i",
  "Water Splash": "GNH3fjffRLc2AFMhJYMfWu3apTGBb72JgqMSeKJGUX1a",
};