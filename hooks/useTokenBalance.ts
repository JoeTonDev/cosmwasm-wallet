import { useState, useEffect } from 'react';
import { useChain } from '@cosmos-kit/react';


// import cosmwasm client generated with cosmwasm-ts-codegen
import { Cw20QueryClient, Cw20Client } from '../codegen/Cw20.client';
import { chainName } from '../config';


export function useTokenBalance(contractAddress: string) {
  // Offline signer
  const { getCosmWasmClient, address } = useChain(chainName);
  const [cw20Client, setCw20Client] = useState<Cw20QueryClient | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  //cw20Client
  useEffect(() => {
    getCosmWasmClient().then((cosmWasmClient) => {
      if (!cosmWasmClient) {
        console.error("No CosmWasmClient");
        return;
      }
      const newClient = new Cw20QueryClient(cosmWasmClient, contractAddress);
      setCw20Client(newClient);
    });
  }, [contractAddress, address, getCosmWasmClient]);



  // query and return token balance
  useEffect(() => {
    if (cw20Client && address) {
      cw20Client.balance({ address }).then((res) => setBalance(res.balance));
    }
  });

  return balance ?? undefined;
}
