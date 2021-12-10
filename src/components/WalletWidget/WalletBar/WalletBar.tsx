/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import cn from 'classnames';

import { numberReduction, shortedHash } from 'utils';
import { Dropdown } from 'components/UILib/dropdowns/Dropdown';
import { Icon, Spinner } from 'components/UILib';
import { walletConfigs } from '../config';
import { WalletType } from '../types';
import { NOT_AVAILABLE } from '../../../constants/dataConstants';

import s from './WalletBar.module.scss';

export interface DotsMenuOption {
  name: string;
  handler: () => void;
}

export interface WalletBarProps {
  walletDropdownElement?: React.ReactNode;
  transferElement?: React.ReactNode;
  className?: string;
  isActive: boolean;
  type: WalletType;
  balance: string | null;
  hash?: string;
  isTransferOpened: boolean;
  isSecondaryWalletOpened: boolean;
  showTransfer: (state: boolean) => void;
  showSecondaryWallet: (flag: boolean) => void;
  toggleWallets: () => void;
  dotsMenuOptions?: DotsMenuOption[];
}

const WalletBar: React.FC<WalletBarProps> = ({
  // walletDropdownElement,
  transferElement,
  className,
  balance,
  hash = '',
  type,
  isActive,
  // isTransferOpened,
  // isSecondaryWalletOpened,
  // showTransfer,
  showSecondaryWallet,
  toggleWallets,
  dotsMenuOptions,
}) => {
  const [isDotsMenuOpened, handleDotsMenuOpened] = useState(false);

  const config = walletConfigs[type];

  // const transfer = (
  //   <div className={s.transferContainer}>
  //     <Dropdown
  //       parent={
  //         <div>
  //           <Icon
  //             name="transfer"
  //             className={cn(s.icon, {
  //               [s.active]: isTransferOpened,
  //             })}
  //             onClick={() => {
  //               showTransfer(!isTransferOpened);
  //             }}
  //             onMouseOver={() => {
  //               handleDotsMenuOpened(false);
  //             }}
  //           />
  //         </div>
  //       }
  //       showOnHover
  //       arrow
  //       arrowClassName={s.tooltipArrow}
  //     >
  //       <div className={cn(s.tooltipBody, s.transferTooltip)}>
  //         <span className={s.tooltipText}>Transfer money</span>
  //       </div>
  //     </Dropdown>
  //   </div>
  // );

  const dots = (
    <div className={s.dotsContainer}>
      <Dropdown
        parent={
          <div>
            <Icon
              onClick={(e) => {
                handleDotsMenuOpened(true);

                if (isActive) {
                  showSecondaryWallet(false);
                } else {
                  e.stopPropagation();
                }
              }}
              name="more-vert"
              className={cn(s.icon, {
                [s.active]: isDotsMenuOpened,
              })}
            />
          </div>
        }
        onOpenUpdate={() => handleDotsMenuOpened(!isDotsMenuOpened)}
        isOpen={isDotsMenuOpened}
        arrow
        arrowClassName={s.tooltipArrow}
      >
        <div className={cn(s.tooltipBody, s.dotsMenu)}>
          {dotsMenuOptions?.map((item) => (
            <div
              onClick={item.handler}
              className={s.dotsMenuElement}
              key={item.name}
            >
              {item.name}
            </div>
          ))}
        </div>
      </Dropdown>
    </div>
  );

  // const expandWallet = (
  //   <div className={s.walletsContainer}>
  //     <Dropdown
  //       showOnHover
  //       parent={
  //         <div className={s.walletsButton}>
  //           <Icon
  //             name={isSecondaryWalletOpened ? 'arrow-upward' : 'arrow-downward'}
  //             className={cn(s.icon, {
  //               [s.active]: isSecondaryWalletOpened,
  //             })}
  //             onClick={() => {
  //               showSecondaryWallet(!isSecondaryWalletOpened);
  //             }}
  //             onMouseOver={() => {
  //               handleDotsMenuOpened(false);
  //             }}
  //           />
  //         </div>
  //       }
  //       arrow
  //       arrowClassName={s.tooltipArrow}
  //     >
  //       <div className={cn(s.tooltipBody, s.expandWalletTooltip)}>
  //         <span className={s.tooltipText}>
  //           Reverse
  //           <br />
  //           to Ethereum wallet
  //         </span>
  //       </div>
  //     </Dropdown>
  //     {walletDropdownElement}
  //   </div>
  // );

  function renderBalance() {
    if (balance) {
      if (balance === NOT_AVAILABLE) {
        return <span>{balance}</span>;
      }

      return (
        <>
          <span>{numberReduction(Number(balance))}</span>
          <span>{config.tokenAbbr}</span>
        </>
      );
    }

    return <Spinner className={s.balanceSpinner} />;
  }

  return (
    <div
      className={cn(s.root, className)}
      onClick={() => {
        if (!isActive) {
          toggleWallets();
        }
      }}
    >
      <div className={s.balance}>{renderBalance()}</div>
      <div className={s.verticalLine} />
      <img src={config.logo} alt={config.name} className={s.logo} />
      <div className={s.hash}>{shortedHash(hash)}</div>
      <div className={s.buttonPanel}>
        {/* {isActive && transfer} */}
        {dotsMenuOptions && dots}
        {/* {isActive && expandWallet} */}
      </div>
      {transferElement}
    </div>
  );
};

export default WalletBar;
