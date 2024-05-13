import { http, createConfig } from "wagmi";
import { polygonAmoy, polygonMumbai, polygon } from "wagmi/chains";

export const config = createConfig({
  chains: [polygonAmoy, polygonMumbai, polygon],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [polygonAmoy.id]: http(),
    [polygonMumbai.id]: http(),
    [polygon.id]: http(),
  },
});

export const evmNetworks = [
  {
    blockExplorerUrls: ['https://amoy.polygonscan.com/'],
    chainId: 80_002,
    chainName: 'Polygon Amoy',
    iconUrls: ['https://app.dynamic.xyz/assets/networks/polygon.svg'],
    name: 'Polygon',
    nativeCurrency: {
      decimals: 18,
      name: 'MATIC',
      symbol: 'MATIC',
    },
    networkId: 80_002,
    rpcUrls: ['https://rpc-amoy.polygon.technology'],
    vanityName: 'Amoy',
  },
  {
    blockExplorerUrls: ['https://goerli.etherscan.io/'],
    chainId: 5,
    chainName: 'Ethereum Goerli',
    iconUrls: ['https://app.dynamic.xyz/assets/networks/eth.svg'],
    name: 'Ethereum',
    nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
    },
    networkId: 5,
    rpcUrls: ['https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID'],
    vanityName: 'Goerli',
  },
  ];

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
