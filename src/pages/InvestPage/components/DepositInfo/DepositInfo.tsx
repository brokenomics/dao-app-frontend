/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import cn from 'classnames';

import Vault from 'components/Vaults';
import { Web3Context } from 'components/Web3Provider';
import { showNotification } from 'components/UILib/notifications/notificationUtils';
import LoadingOverlay from 'react-loading-overlay';
import { MAX_INTEGER } from 'ethereumjs-util';
import {
  Button,
  LabelButton,
  TextField,
  NOTIFICATION_TYPES,
} from '../../../../components/UILib';
import s from './DepositInfo.module.scss';

export interface DepositInfoProps {
  className?: string;
}
const vaultClient = new Vault();
const vaultAddress = process.env.REACT_APP_BAL_ODEFI_RP0_Vault;
export const DepositInfo: React.FC<DepositInfoProps> = (props) => {
  const { className } = props;

  const [deposit, setDeposit] = React.useState('');
  const [vaultBalance, setVaultBalance] = React.useState(0);
  const [approvalPending, setApprovalPending] = React.useState(false);
  const [depositPending, setDepositPending] = React.useState(false);
  const [apy, setAPY] = React.useState(0);
  // const [transferPending, setTransferPending] = React.useState(false);
  // const [unlockPending, setUnlockPending] = React.useState(false);
  // const [isPaused, setIsPaused] = React.useState<boolean>();
  // const [governanceAddr, setGovernanceAddr] = React.useState('');
  const [updateFlag, setUpdateFlag] = React.useState(0);
  const { address, updateTokenBalance, tokenAmount } =
    React.useContext(Web3Context) || {};

  async function getAPY() {
    const rate = await vaultClient.getStrategyAPY();

    setAPY(rate);
  }
  // TODO implement handling of deposit click
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async function onDeposit() {
    const tag = 'Vault Deposit';

    const allowance =
      address &&
      vaultAddress &&
      (await vaultClient.getAllowance(address, vaultAddress));

    let tx;

    if (parseFloat(allowance) <= 0) {
      setApprovalPending(true);

      tx =
        address &&
        vaultAddress &&
        (await vaultClient.getApproval(vaultAddress, MAX_INTEGER, address));

      setApprovalPending(false);

      if (!tx) return;
    }

    setDepositPending(true);
    tx = address && (await vaultClient.userDeposit(Number(deposit), address));
    setDepositPending(false);
    // setTransferPending(true);
    // tx = address && (await vaultClient.transferLP(address, Number(deposit)));
    // setTransferPending(false);

    if (tx) {
      const flag = updateFlag + 1;

      setUpdateFlag(flag);

      // hideModal();
      if (updateTokenBalance) await updateTokenBalance();

      showNotification({
        type: NOTIFICATION_TYPES.SUCCESS,
        description: 'Deposit successfully',
        lifetime: 5000,
        tag,
      });
    } else {
      showNotification({
        type: NOTIFICATION_TYPES.ERROR,
        description: 'Deposit failed, please try again later.',
        lifetime: 5000,
        tag,
      });
    }
  }

  // TODO implement handling of max click
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function onMax() {
    if (tokenAmount) setDeposit(tokenAmount);
  }

  async function getVaultBalance() {
    const bal = await vaultClient.getVaultBalance();

    setVaultBalance(bal);
  }

  useEffect(() => {
    getVaultBalance();
    getAPY();
  }, [updateFlag]);

  // async function onUnlock() {
  //   const tag = 'Unlock Vault';

  //   setUnlockPending(true);

  //   const unlockTx = address && (await vaultClient.unPauseVault(address));

  //   setUnlockPending(false);

  //   if (unlockTx) {
  //     // hideModal();
  //     setIsPaused(true);

  //     showNotification({
  //       type: NOTIFICATION_TYPES.SUCCESS,
  //       description: 'Unlocking Vault successfully',
  //       lifetime: 5000,
  //       tag,
  //     });
  //   } else {
  //     showNotification({
  //       type: NOTIFICATION_TYPES.ERROR,
  //       description: 'Unlocking Vault failed, please try again later.',
  //       lifetime: 5000,
  //       tag,
  //     });
  //   }
  // }
  // function renderInfoLine(label: string, value: string | number) {
  //   return (
  //     <div className={s.infoLine}>
  //       <div>{label}:</div>
  //       <div className={s.value}>{value}</div>
  //     </div>
  //   );
  // }

  return (
    <div className={cn(s.root, className)}>
      <LoadingOverlay
        active={approvalPending || depositPending}
        spinner
        className={s.stakingContainer}
        text={
          approvalPending
            ? 'Approval Pending ...'
            : 'Deposit Transaction Pending ...'
        }
      >
        <div className={s.tile}>
          <div className={s.tilePart}>
            <div className={s.currency}>NEWO</div>
            <div className={s.strategy}>APY</div>
            <div className={s.percentValue}>
              <span>{apy}</span>
              <span className={s.percent}>%</span>
            </div>
          </div>
          <div className={s.tilePart}>
            <TextField
              name="deposit"
              value={deposit}
              onChange={setDeposit}
              label="Deposit amount"
              rightElement={
                <LabelButton
                  onClick={onMax}
                  disabled={!!address === false}
                  className={s.maxButton}
                >
                  MAX
                </LabelButton>
              }
            />
            <div className={s.balance}>
              <span>Total Vault Balance:</span>
              <span className={s.balanceValue}> {vaultBalance}</span>
            </div>
            {address ? (
              <Button
                className={s.depositButton}
                size="md"
                onClick={onDeposit}
                disabled={!!address === false}
              >
                Deposit
              </Button>
            ) : (
              <Button
                className={s.depositButton}
                size="md"
                variant="outline"
                onClick={onDeposit}
                disabled
              >
                Deposit
              </Button>
            )}
          </div>
        </div>
      </LoadingOverlay>
      {/* {renderInfoLine('Protocols monitored', 9)}
      {renderInfoLine('Pools involved', 145)}
      {renderInfoLine('Strategies checked', '9,342')} */}
    </div>
  );
};
