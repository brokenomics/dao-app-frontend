import Web3 from 'web3';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Contract } from 'web3-eth-contract';

export interface ContextStateType {
  isInstalled: boolean;
  isPending: boolean;
  isConnected: boolean;
  address: string;
  tokenAmount: string | null;
  canClaimOdt: boolean;
  network: number | null;
  isMainnet: boolean;
  web3?: Web3;
  getTokenAmount: () => Promise<number | string>;
}

export interface Web3ContextType extends ContextStateType {
  connect: () => void;
  getBrowserPlugin: () => void;
  getMerkleDistributorInstance: () => Contract | null;
  manageAccounts: () => void;
  updateTokenBalance: () => void;
}

export const Web3Context = React.createContext<Web3ContextType | null>(null);
