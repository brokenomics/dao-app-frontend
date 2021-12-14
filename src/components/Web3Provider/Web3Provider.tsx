import React, { useState, useEffect, useCallback, useRef } from 'react';
import Web3 from 'web3';
import MetaMaskOnboarding from '@metamask/onboarding';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AbiItem } from 'web3-utils';
import BigNumber from 'bignumber.js';
import TestERC20 from './TestERC20.json';
import { Web3Context, ContextStateType } from './Web3Context';
import {
  MAIN_TOKEN_ADDRESS,
  VAULT_TOKEN_ADDRESS,
  MERKLE_SMART_CONTRACT_ADDRESS,
} from '../../constants/envVars';
import MerkleDistributor from './MerkleDistributor.json';
import { getAirdropInfo } from '../../utils/airdropUtils';
import { NOT_AVAILABLE } from '../../constants/dataConstants';

const initialState = {
  isInstalled: false,
  isPending: false,
  isConnected: false,
  address: '',
  tokenAmount: null,
  canClaimOdt: false,
  network: null,
  isMainnet: false,
  web3: undefined,
  getTokenAmount: () => Promise.resolve(''),
};

const Web3Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<ContextStateType>(initialState);
  const { isConnected, address } = state;

  const web3 = useRef<Web3>(new Web3(window.ethereum));

  const onMetamaskDisconnect = () => {
    setState((prevState) => ({
      ...initialState,
      isInstalled: prevState.isInstalled,
    }));
  };

  const onMetamaskConnect = (newAddress: string) => {
    setState((prevState) => ({
      ...prevState,
      address: newAddress,
      isConnected: true,
    }));
  };

  const onChainChanged = (chainId: string) => {
    if (!chainId.length) {
      return;
    }

    const chain = parseInt(chainId, 16);
    const isMainnet = chain === 1;

    setState((prevState) => ({
      ...prevState,
      network: chain,
      isMainnet,
    }));
  };

  useEffect(() => {
    if (isConnected) {
      web3.current = new Web3(window.ethereum);
    }
  }, [isConnected]);

  useEffect(() => {
    if (window.ethereum !== undefined) {
      setState((prevState) => ({
        ...prevState,
        isInstalled: true,
      }));

      const { selectedAddress, chainId } = window.ethereum;

      if (selectedAddress) {
        onMetamaskConnect(selectedAddress);
      }

      if (chainId) {
        onChainChanged(chainId);
      }

      window.ethereum.on('connect', async (info: { chainId: string }) => {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });

        onMetamaskConnect(accounts[0]);
        onChainChanged(info.chainId);
      });

      window.ethereum.on('disconnect', onMetamaskDisconnect);

      window.ethereum.on('chainChanged', onChainChanged);

      window.ethereum.on('accountsChanged', (accounts: Array<string>) => {
        if (accounts.length) {
          onMetamaskConnect(accounts[0]);
        } else {
          onMetamaskDisconnect();
        }
      });

      window.ethereum.on('accountsChanged', (accounts: Array<string>) => {
        if (accounts.length) {
          onMetamaskConnect(accounts[0]);
        } else {
          onMetamaskDisconnect();
        }
      });
    }
  }, []);

  function getMerkleDistributorInstance() {
    if (!MERKLE_SMART_CONTRACT_ADDRESS) {
      return null;
    }

    if (!web3.current) {
      return null;
    }

    return new web3.current.eth.Contract(
      MerkleDistributor.abi as Array<AbiItem>,
      MERKLE_SMART_CONTRACT_ADDRESS,
    );
  }

  useEffect(() => {
    async function asyncEffectWrapper() {
      const airdropInfo = getAirdropInfo(address);
      const distributorInstance = getMerkleDistributorInstance();

      if (airdropInfo && distributorInstance) {
        const wasClaimed = await distributorInstance.methods
          .isClaimed(airdropInfo.index)
          .call();

        setState((prevState) => ({
          ...prevState,
          canClaimOdt: !wasClaimed,
        }));
      }
    }

    if (address && address.length) {
      asyncEffectWrapper();
    }
  }, [address]);

  const updateTokenBalance = async () => {
    const { chainId } = window.ethereum;

    const tokenAddress =
      chainId === '0x539' ? VAULT_TOKEN_ADDRESS : MAIN_TOKEN_ADDRESS;

    const tokenInstance = await new web3.current.eth.Contract(
      TestERC20.abi as Array<AbiItem>,
      tokenAddress,
    );

    const balance = new BigNumber(
      await tokenInstance.methods.balanceOf(address).call(),
    );

    setState((prevState) => ({
      ...prevState,
      tokenAmount: balance.shiftedBy(-18).toString(),
    }));
  };

  const getTokenAmount = useCallback(async (): Promise<string> => {
    const { chainId } = window.ethereum;

    const tokenAddress =
      chainId === '0x539' ? VAULT_TOKEN_ADDRESS : MAIN_TOKEN_ADDRESS;

    if (!tokenAddress) {
      return NOT_AVAILABLE;
    }

    try {
      const tokenInstance = await new web3.current.eth.Contract(
        TestERC20.abi as Array<AbiItem>,
        tokenAddress,
      );
      const balance = new BigNumber(
        await tokenInstance.methods.balanceOf(address).call(),
      );

      return balance.shiftedBy(-18).toString();
    } catch (e) {
      return NOT_AVAILABLE;
    }
  }, [address]);

  useEffect(() => {
    async function asyncEffectWrapper() {
      let receivedTokenAmount: ContextStateType['tokenAmount'] = null;

      if (isConnected) {
        receivedTokenAmount = await getTokenAmount();
      }

      setState((prevState) => ({
        ...prevState,
        tokenAmount: receivedTokenAmount,
      }));
    }

    asyncEffectWrapper();
  }, [isConnected, getTokenAmount]);

  const getBrowserPlugin = () => {
    const onboarding = new MetaMaskOnboarding();

    onboarding.startOnboarding();
  };

  const setIsPending = (value: ContextStateType['isPending']) => {
    setState((prevState) => ({
      ...prevState,
      isPending: value,
    }));
  };

  const handleConnect = () => {
    setIsPending(true);
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(() => {
        setIsPending(false);
      })
      .catch(() => {
        setIsPending(false);
      });
  };

  async function manageAccounts() {
    if (isConnected) {
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
    }
  }

  const providerValue = {
    ...state,
    connect: handleConnect,
    getBrowserPlugin,
    getMerkleDistributorInstance,
    manageAccounts,
    updateTokenBalance,
    web3: web3.current,
    getTokenAmount,
  };

  return (
    <Web3Context.Provider value={providerValue}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
