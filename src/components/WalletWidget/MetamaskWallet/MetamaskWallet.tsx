import React, { useContext, useEffect } from 'react';

import metamaskLogo from 'images/metamask.svg';
import { Web3Context } from 'components/Web3Provider';
import {
  showNotification,
  hideNotificationByTag,
  NOTIFICATION_TYPES,
} from 'components/UILib';
import { WalletBar, WalletBarProps, DotsMenuOption } from '../WalletBar';
import { WalletType } from '../types';
import { WalletButton } from '../WalletButton';

interface MetamaskWalletProps
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

const MetamaskWallet: React.FC<MetamaskWalletProps> = ({ ...walletProps }) => {
  const metamask = useContext(Web3Context);

  useEffect(() => {
    const tag = 'metamask network';

    hideNotificationByTag(tag);

    if (metamask?.network && metamask?.network !== 1) {
      showNotification({
        type: NOTIFICATION_TYPES.WARNING,
        description:
          'You are on a test network. Please select mainnet in metamask extension',
        lifetime: 10000,
        tag,
      });
    }
  }, [metamask?.network]);

  const dotsMenuOptions: DotsMenuOption[] = [
    {
      name: 'Manage accounts',
      handler: () => {
        metamask?.manageAccounts();
      },
    },
  ];

  if (!metamask) {
    return null;
  }

  if (!metamask.isInstalled) {
    return (
      <WalletButton
        logo={metamaskLogo}
        name="metamask"
        onClick={metamask.getBrowserPlugin}
      >
        Download Metamask extension
      </WalletButton>
    );
  }

  if (metamask.isPending) {
    return (
      <WalletButton logo={metamaskLogo} name="metamask" disabled>
        Metamask connection is pending...
      </WalletButton>
    );
  }

  if (!metamask.isConnected) {
    return (
      <WalletButton
        logo={metamaskLogo}
        name="metamask"
        onClick={metamask.connect}
      >
        Connect Metamask
      </WalletButton>
    );
  }

  return (
    <WalletBar
      type={WalletType.Metamask}
      balance={metamask.tokenAmount}
      hash={metamask.address}
      dotsMenuOptions={dotsMenuOptions}
      {...walletProps}
    />
  );
};

export default MetamaskWallet;
