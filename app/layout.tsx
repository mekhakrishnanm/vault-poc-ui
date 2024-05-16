import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import {
  DynamicContextProvider,
  EthereumWalletConnectors,
  DynamicWagmiConnector,
} from "../lib/dynamic";


import { Providers } from "./providers";
import { evmNetworks } from "@/lib/wagmi";
import Header from "./header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TradeX - Deposit Your Crypto",
  description: "Deposit your crypto, let experienced traders optimize your portfolio, and earn passive returns.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <DynamicContextProvider
        settings={{
		  environmentId: process.env.DYNAMIC_PROJECT_ID || '',
		  walletConnectors: [EthereumWalletConnectors],
		  overrides: {evmNetworks: evmNetworks}
        }}
      >
        <Providers>
          <DynamicWagmiConnector>
            <body className={inter.className + 'relative h-screen w-screen'}>
              <Header />

              {children}
        <Toaster />
              </body>
          </DynamicWagmiConnector>
        </Providers>
      </DynamicContextProvider>
    </html>
  );
}
