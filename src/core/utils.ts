import type { Network } from "@concordium/web-sdk";
import { mainnet, testnet } from "./constants";
import type { NetworkConfiguration } from "./types";

export const getNetworkConfiguration = (net: Network): NetworkConfiguration => {
  switch (net) {
    case "Mainnet":
      return mainnet;
    case "Testnet":
      return testnet;
    default:
      throw new Error("Invalid network");
  }
};

// References: https://namespaces.chainagnostic.org/ccd/caip2
export const formatChainId = (genesisHash: string): string => {
  return `ccd:${genesisHash.slice(0, 32)}`;
};
