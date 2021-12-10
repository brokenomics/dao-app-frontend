import React, { useEffect, useState } from 'react';

import confluxLogo from 'images/conflux.svg';
import { WalletBar, WalletBarProps } from '../WalletBar';
import { WalletType } from '../types';
import { WalletButton } from '../WalletButton';

interface ConfluxWalletProps
  extends Pick<
    WalletBarProps,
    | 'isActive'
    | 'isTransferOpened'
    | 'isSecondaryWalletOpened'
    | 'showTransfer'
    | 'showSecondaryWallet'
    | 'toggleWallets'
  > {
  className?: string;
}

interface Wallet {
  balance: string;
  hash: string;
}

const ConfluxWallet: React.FC<ConfluxWalletProps> = ({ ...walletProps }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const connect = () => {
    setWallet({
      balance: '1000',
      hash: '12345678901234567',
    });
  };

  useEffect(() => {
    connect();
  }, []);

  if (!wallet) {
    return (
      <WalletButton logo={confluxLogo} name="conflux" onClick={connect}>
        Connect ConfluxPortal
      </WalletButton>
    );
  }

  return (
    <WalletBar
      type={WalletType.Conflux}
      balance={wallet.balance}
      hash={wallet.hash}
      {...walletProps}
    />
  );
};

export default ConfluxWallet;
