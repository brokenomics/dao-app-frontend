import React, { useState, useRef } from 'react';

import { useOnClickOutside } from 'hooks';
import { Transfer } from 'components/Transfer';
import { MetamaskWallet } from './MetamaskWallet';
import { ConfluxWallet } from './ConfluxWallet';

import s from './WalletWidget.module.scss';

const METAMASK = 'metamask';
const CONFLUX = 'conflux';

const walletComponentsMap = {
  [METAMASK]: MetamaskWallet,
  [CONFLUX]: ConfluxWallet,
};

const WalletWidget: React.FC = () => {
  const [isShowSecondary, showSecondary] = useState(false);
  const [isShowTransfer, showTransfer] = useState(false);
  const [walletsOrder, setWalletsOrder] = useState<
    Array<typeof METAMASK | typeof CONFLUX>
  >([METAMASK, CONFLUX]);

  const PrimaryWallet = walletComponentsMap[walletsOrder[0]];
  const SecondaryWallet = walletComponentsMap[walletsOrder[1]];

  const secondaryWalletRef = useRef(null);
  const transferRef = useRef(null);
  const widgetRef = useRef(null);

  useOnClickOutside(
    [secondaryWalletRef, widgetRef],
    showSecondary.bind(null, false),
  );
  useOnClickOutside([transferRef, widgetRef], showTransfer.bind(null, false));

  const toggleWallets = () => {
    setWalletsOrder(walletsOrder.reverse());
    showSecondary(false);
  };

  const walletProps = {
    isTransferOpened: isShowTransfer,
    showTransfer: (state: boolean) => {
      showTransfer(state);
      showSecondary(false);
    },
    isSecondaryWalletOpened: isShowSecondary,
    showSecondaryWallet: (state: boolean) => {
      showSecondary(state);
      showTransfer(false);
    },
    toggleWallets,
  };

  const transfer = (
    <div ref={transferRef}>
      <Transfer
        confluxConnected
        metamaskConnected
        metamask={{
          hash: '12345678901234567',
          currency: 'cODT',
        }}
        conflux={{
          hash: '09876543238765432',
          currency: 'NEWO',
        }}
      />
    </div>
  );

  return (
    <div className={s.root} ref={widgetRef}>
      <PrimaryWallet isActive {...walletProps} />
      {isShowSecondary && (
        <div className={s.secondaryWallet} ref={secondaryWalletRef}>
          <SecondaryWallet isActive={false} {...walletProps} />
        </div>
      )}
      {isShowTransfer && transfer}
    </div>
  );
};

export default WalletWidget;
