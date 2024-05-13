import { http, createConfig } from "wagmi";
import { polygonAmoy, polygonMumbai, polygon } from "wagmi/chains";

export const config = createConfig({
  chains: [ polygon],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [polygon.id]: http(),
  },
});

export const evmNetworks = [
  {
    blockExplorerUrls: ['https://polygonscan.com/'],
    chainId: 137,
    chainName: 'Polygon',
    iconUrls: ['https://app.dynamic.xyz/assets/networks/polygon.svg'],
    name: 'Polygon',
    nativeCurrency: {
      decimals: 18,
      name: 'MATIC',
      symbol: 'MATIC',
    },
    networkId: 137,
    rpcUrls: ['https://polygon-rpc.com'],
    vanityName: 'Polygon',
  }
  ];

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
