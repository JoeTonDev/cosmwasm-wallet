import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { defaultTheme, ChainProvider } from '@cosmos-kit/react';
import { ChakraProvider } from '@chakra-ui/react';
import { wallets as keplrWallets } from '@cosmos-kit/keplr';
import { wallets as cosmostationWallets } from '@cosmos-kit/cosmostation';
import { wallets as leapWallets } from '@cosmos-kit/leap';
import { wallets } from "@cosmos-kit/keplr";

import { SignerOptions } from '@cosmos-kit/core';
import { chains, assets } from 'chain-registry';
import { Chain } from "@chain-registry/types";
import { GasPrice } from "@cosmjs/stargate";

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  const signerOptions: SignerOptions = {
    signingCosmwasm: (chain: Chain) => {
      switch (chain.chain_name) {
        case "cosmwasmtestnet":
          return {
            gasPrice: GasPrice.fromString("0.0025umlga"),
          };
      }
    },
  };

  return (
    <ChakraProvider theme={defaultTheme}>
      <ChainProvider
        chains={chains}
        assetLists={assets}
        wallets={wallets}
        signerOptions={signerOptions}
        endpointOptions={{
          cosmwasmtestnet: {
            rpc: ["https://rpc.malaga-420.cosmwasm.com/"],
            rest: ["https://api.malaga-420.cosmwasm.com/"]
          },
        }}
      >
        <Component {...pageProps} />
      </ChainProvider>
    </ChakraProvider>
  );
}

export default CreateCosmosApp;