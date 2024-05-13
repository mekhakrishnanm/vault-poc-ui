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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
              </body>
          </DynamicWagmiConnector>
        </Providers>
      </DynamicContextProvider>
    </html>
  );
}
