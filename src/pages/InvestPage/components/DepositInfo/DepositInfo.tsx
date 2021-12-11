/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import cn from 'classnames';

import Vault from 'components/Vaults';
import SLPVault from 'components/Vaults/SLPVault';
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

const slpVaultClient = new SLPVault();
const slpVaultAddress = process.env.REACT_APP_SLP_VAULT;

export const DepositInfo: React.FC<DepositInfoProps> = (props) => {
  const { className } = props;

  const [deposit, setDeposit] = React.useState('');
  const [userVaultBalance, setUserVaultBalance] = React.useState(0);
  const [vaultBalance, setVaultBalance] = React.useState(0);
  const [approvalPending, setApprovalPending] = React.useState('');
  const [depositPending, setDepositPending] = React.useState('');
  const [apy, setAPY] = React.useState(0);
  const [updateFlag, setUpdateFlag] = React.useState(0);

  // SushiLP states
  const [slpDeposit, setSlpDeposit] = React.useState('');
  const [slpVaultApy, setSlpVaultApy] = React.useState(0);
  const [userSlpVaultBalance, setUserSlpVaultBalance] = React.useState(0);
  const [slpVaultBalance, setSlpVaultBalance] = React.useState(0);
  const [slpTokenBalance, setSlpTokenBalance] = React.useState('');

  const { address, updateTokenBalance, tokenAmount } =
    React.useContext(Web3Context) || {};

  async function getSlpTokenBalance() {
    const balance = address && (await slpVaultClient.getTokenBalance(address));

    if (!balance) {
      setSlpTokenBalance('0.00');
    } else {
      setSlpTokenBalance(balance.toFixed(2));
    }
  }

  async function getSlpApy() {
    const rate = await slpVaultClient.getStrategyAPY();

    setSlpVaultApy(rate);
  }

  async function getUserSlpVaultBalance() {
    const balance =
      address && (await slpVaultClient.getUserVaultBalance(address));

    if (!balance) return;

    setUserSlpVaultBalance(balance);
  }

  async function getSlpVaultBalance() {
    const bal = await slpVaultClient.getVaultBalance();

    setSlpVaultBalance(bal);
  }

  async function onSlpDeposit() {
    const tag = 'Vault Deposit';

    if (!slpDeposit || parseFloat(slpDeposit) <= 0) {
      showNotification({
        type: NOTIFICATION_TYPES.ERROR,
        description: 'Deposit failed, cannot deposit 0',
        lifetime: 5000,
        tag,
      });

      return;
    }

    const allowance =
      address &&
      slpVaultAddress &&
      (await slpVaultClient.getAllowance(address, slpVaultAddress));

    let tx;

    if (parseFloat(allowance) <= 0) {
      setApprovalPending('slpVault');

      tx =
        address &&
        slpVaultAddress &&
        (await slpVaultClient.getApproval(
          slpVaultAddress,
          MAX_INTEGER,
          address,
        ));

      setApprovalPending('');

      if (!tx) return;
    }

    setDepositPending('slpVault');

    tx =
      address &&
      (await slpVaultClient.userDeposit(parseFloat(slpDeposit), address));

    setDepositPending('');

    if (tx) {
      const flag = updateFlag + 1;

      setUpdateFlag(flag);

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

  async function getUserVaultBalance() {
    const balance = address && (await vaultClient.getUserVaultBalance(address));

    if (!balance) return;

    setUserVaultBalance(balance);
  }

  async function getAPY() {
    const rate = await vaultClient.getStrategyAPY();

    setAPY(rate);
  }
  // TODO implement handling of deposit click
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async function onDeposit() {
    const tag = 'Vault Deposit';

    if (!deposit || parseFloat(deposit) <= 0) {
      showNotification({
        type: NOTIFICATION_TYPES.ERROR,
        description: 'Deposit failed, cannot deposit 0',
        lifetime: 5000,
        tag,
      });

      return;
    }

    const allowance =
      address &&
      vaultAddress &&
      (await vaultClient.getAllowance(address, vaultAddress));

    let tx;

    if (parseFloat(allowance) <= 0) {
      setApprovalPending('vault');

      tx =
        address &&
        vaultAddress &&
        (await vaultClient.getApproval(vaultAddress, MAX_INTEGER, address));

      setApprovalPending('');

      if (!tx) return;
    }

    setDepositPending('vault');
    tx =
      address && (await vaultClient.userDeposit(parseFloat(deposit), address));
    setDepositPending('');
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

  async function onSlpMax() {
    const balance = address && (await slpVaultClient.getTokenBalance(address));

    if (balance) {
      setSlpDeposit(balance.toString());
    } else {
      setSlpDeposit('0.00');
    }
  }

  async function getVaultBalance() {
    const bal = await vaultClient.getVaultBalance();

    setVaultBalance(bal);
  }

  useEffect(() => {
    getVaultBalance();
    getAPY();
    getUserVaultBalance();
    getSlpApy();
    getUserSlpVaultBalance();
    getSlpVaultBalance();
    getSlpTokenBalance();
    // eslint-disable-next-line
  }, [updateFlag, address]);

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
        active={approvalPending === 'vault' || depositPending === 'vault'}
        spinner
        className={s.stakingContainer}
        text={
          approvalPending === 'vault'
            ? 'Approval Pending ...'
            : 'Deposit Transaction Pending ...'
        }
      >
        <div className={s.tile}>
          <div className={s.tilePart}>
            <div className={s.currency}>NEWO SINGLE-SIDE</div>
            <div className={s.strategy}>APR</div>
            <div className={s.percentValue}>
              {apy === 0 ? (
                <span>NaN</span>
              ) : (
                <>
                  <span>{apy}</span>
                  <span className={s.percent}>%</span>
                </>
              )}
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

            <div className={s.balances}>
              <div className={s.balance}>
                <span>Your balance: </span>
                <span className={s.balanceValue}> {tokenAmount}</span>
              </div>
              <div className={s.balance}>
                <span>Your deposit:</span>
                <span className={s.balanceValue}> {userVaultBalance}</span>
              </div>
              <div className={s.balance}>
                <span>Total Vault Balance:</span>
                <span className={s.balanceValue}> {vaultBalance}</span>
              </div>
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

      <LoadingOverlay
        active={approvalPending === 'slpVault' || depositPending === 'slpVault'}
        spinner
        className={s.stakingContainer}
        text={
          approvalPending === 'slpVault'
            ? 'Approval Pending ...'
            : 'Deposit Transaction Pending ...'
        }
      >
        <div className={s.tile}>
          <div className={s.tilePart}>
            <div className={s.currency}>SUSHI LP - NEWO/USDC</div>
            <div className={s.strategy}>APR</div>
            <div className={s.percentValue}>
              {slpVaultApy === 0 ? (
                <span>NaN</span>
              ) : (
                <>
                  <span>{slpVaultApy}</span>
                  <span className={s.percent}>%</span>
                </>
              )}
            </div>
          </div>
          <div className={s.tilePart}>
            <TextField
              name="slpDeposit"
              value={slpDeposit}
              onChange={setSlpDeposit}
              label="Deposit amount"
              rightElement={
                <LabelButton
                  onClick={onSlpMax}
                  disabled={!!address === false}
                  className={s.maxButton}
                >
                  MAX
                </LabelButton>
              }
            />

            <div className={s.balances}>
              <div className={s.balance}>
                <span>Your balance: </span>
                <span className={s.balanceValue}> {slpTokenBalance}</span>
              </div>
              <div className={s.balance}>
                <span>Your deposit:</span>
                <span className={s.balanceValue}> {userSlpVaultBalance}</span>
              </div>
              <div className={s.balance}>
                <span>Total Vault Balance:</span>
                <span className={s.balanceValue}> {slpVaultBalance}</span>
              </div>
            </div>

            {address ? (
              <Button
                className={s.depositButton}
                size="md"
                onClick={onSlpDeposit}
                disabled={!!address === false}
              >
                Deposit
              </Button>
            ) : (
              <Button
                className={s.depositButton}
                size="md"
                variant="outline"
                onClick={onSlpDeposit}
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
